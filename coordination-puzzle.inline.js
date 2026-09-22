(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   *  Model: IEC inverse-time relay curves                               *
   *  t = TMS * k / ((I / Is)^a - 1), floored at a minimum operate time *
   * ------------------------------------------------------------------ */
  var CURVES = {
    SI: { k: 0.14, a: 0.02, name: "Standard Inverse" },
    VI: { k: 13.5, a: 1, name: "Very Inverse" },
    EI: { k: 80, a: 2, name: "Extremely Inverse" }
  };
  var T_MIN = 0.03;          // shortest operate time modelled (s)
  var TMS_MIN = 0.05, TMS_MAX = 1.0, TMS_STEP = 0.01;
  var LOAD_MARGIN = 1.1;     // pickup must be at least 1.1 x load current
  var CABLE_MARGIN = 0.9;    // relay must clear before 90% of the cable damage time
  var START_MARGIN = 1.15;   // relay must ride through the motor start with 15% spare
  var STORE_KEY = "ecrCoordPuzzleBest";

  var LOADS = [
    { n: "Pump motor feeder", m: true },
    { n: "Chiller compressor feeder", m: true },
    { n: "AHU fan motor feeder", m: true },
    { n: "Conveyor drive feeder", m: true },
    { n: "Workshop sub-board", m: false },
    { n: "Lighting & small power DB", m: false },
    { n: "Server room UPS input", m: false },
    { n: "Kitchen distribution board", m: false }
  ];

  // Share of the setting grid that is a valid answer, per level: [min, max].
  var BANDS = { 1: [0.06, 0.6], 2: [0.03, 0.3], 3: [0.02, 0.18], 4: [0.012, 0.1], 5: [0.008, 0.06], 6: [0.005, 0.04] };

  function tOp(type, I, Is, tms) {
    if (!(I > Is * 1.001)) return Infinity;
    var c = CURVES[type];
    var t = tms * c.k / (Math.pow(I / Is, c.a) - 1);
    return t < T_MIN ? T_MIN : t;
  }
  function tDamage(K2S2, I) { return K2S2 / (I * I); }
  function logSpace(a, b, n) {
    var out = [], la = Math.log(a), lb = Math.log(b);
    for (var i = 0; i < n; i++) out.push(Math.exp(la + (lb - la) * i / (n - 1)));
    return out;
  }
  function snap(v, step) { return Math.round(v / step) * step; }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function niceIs(v) { return v < 100 ? Math.round(v) : Math.round(v / 5) * 5; }
  function round2(v) { return Math.round(v * 100) / 100; }
  function fmtA(I) { return I >= 1000 ? (Math.round(I / 100) / 10) + " kA" : Math.round(I) + " A"; }
  function fmtT(t) { return !isFinite(t) ? "never" : (t >= 100 ? Math.round(t) : t >= 10 ? t.toFixed(1) : t.toFixed(2)) + " s"; }

  /* Pre-compute everything that does not depend on the player's settings. */
  function prepare(sc) {
    var upType = sc.up.type;
    sc.selI = sc.If > sc.up.Is * 1.05 ? logSpace(sc.up.Is * 1.05, sc.If, 60) : [];
    sc.selUp = sc.selI.map(function (I) { return tOp(upType, I, sc.up.Is, sc.up.tms); });
    if (sc.K2S2) {
      var lo = Math.max(sc.Iz, Math.sqrt(sc.K2S2 / 5));   // damage curve only used where it clears in <= 5 s
      sc.cableI = sc.If > lo ? logSpace(lo, sc.If, 40) : [sc.If];
      sc.cableLim = sc.cableI.map(function (I) { return CABLE_MARGIN * tDamage(sc.K2S2, I); });
    } else { sc.cableI = []; sc.cableLim = []; }
    return sc;
  }

  /* Full evaluation used by the game: every goal with a margin and a message. */
  function evaluate(sc, set) {
    var down = sc.downType, r = {};
    var loadLo = LOAD_MARGIN * sc.IL;
    var loadOk = set.Is >= loadLo - 1e-9 && set.Is <= sc.Iz + 1e-9;
    r.load = {
      ok: loadOk,
      margin: Math.min(set.Is / loadLo - 1, sc.Iz / set.Is - 1),
      text: set.Is < loadLo - 1e-9 ? "Pickup is below " + fmtA(loadLo) + " (1.1 × load): the relay would trip on normal current."
        : set.Is > sc.Iz + 1e-9 ? "Pickup is above the cable rating (" + sc.Iz + " A): an overload would never be cleared."
        : "Pickup " + fmtA(set.Is) + " sits between " + fmtA(loadLo) + " and " + sc.Iz + " A."
    };

    if (sc.motor) {
      var need = START_MARGIN * sc.motor.t;
      var tm = tOp(down, sc.motor.I, set.Is, set.tms);
      var mOk = tm >= need - 1e-9;
      r.motor = {
        ok: mOk,
        margin: isFinite(tm) ? tm / need - 1 : 1,
        text: mOk ? "Rides through the start: trips in " + fmtT(tm) + " at " + fmtA(sc.motor.I) + " (start lasts " + sc.motor.t + " s)."
          : "Trips in " + fmtT(tm) + " at " + fmtA(sc.motor.I) + ", before the " + sc.motor.t + " s motor start ends."
      };
    }

    if (sc.K2S2) {
      var worst = Infinity, worstI = sc.cableI[0];
      for (var i = 0; i < sc.cableI.length; i++) {
        var td = tOp(down, sc.cableI[i], set.Is, set.tms);
        var ratio = isFinite(td) ? sc.cableLim[i] / td : 0;
        if (ratio < worst) { worst = ratio; worstI = sc.cableI[i]; }
      }
      var cOk = worst >= 1 - 1e-9;
      r.cable = {
        ok: cOk,
        margin: worst - 1,
        text: cOk ? "Clears every fault inside the cable's damage limit."
          : "Too slow at " + fmtA(worstI) + ": the cable would be damaged before the relay trips."
      };
    }

    var minM = Infinity, minI = null, blind = false;
    for (var j = 0; j < sc.selI.length; j++) {
      var tdj = tOp(down, sc.selI[j], set.Is, set.tms);
      var m = isFinite(tdj) ? sc.selUp[j] - tdj - sc.cti : -1e9;
      if (m < minM) { minM = m; minI = sc.selI[j]; blind = !isFinite(tdj); }
    }
    if (minI === null) { minM = sc.cti; }
    var sOk = minM >= -1e-9;
    r.sel = {
      ok: sOk,
      margin: minM / sc.cti,
      text: sOk ? "Downstream trips first with at least " + Math.max(0, minM + sc.cti).toFixed(2) + " s to spare over the upstream relay."
        : blind ? "Downstream never operates at " + fmtA(minI) + " while the upstream relay does."
        : "At " + fmtA(minI) + " the gap to the upstream relay is only " + Math.max(0, minM + sc.cti).toFixed(2) + " s (need " + sc.cti.toFixed(1) + " s)."
    };

    r.allOk = r.load.ok && r.sel.ok && (!r.motor || r.motor.ok) && (!r.cable || r.cable.ok);
    r.score = Math.min(Math.min(1, r.load.margin), Math.min(1, r.sel.margin), r.motor ? Math.min(1, r.motor.margin) : 1, r.cable ? Math.min(1, r.cable.margin) : 1);
    return r;
  }

  /* Cheap pass/fail check with early exit, used while scanning the setting grid. */
  function feasible(sc, Is, tms) {
    var down = sc.downType;
    if (Is < LOAD_MARGIN * sc.IL - 1e-9 || Is > sc.Iz + 1e-9) return false;
    if (sc.motor && tOp(down, sc.motor.I, Is, tms) < START_MARGIN * sc.motor.t - 1e-9) return false;
    for (var i = 0; i < sc.cableI.length; i++) {
      var td = tOp(down, sc.cableI[i], Is, tms);
      if (!(td <= sc.cableLim[i] + 1e-9)) return false;
    }
    for (var j = 0; j < sc.selI.length; j++) {
      var tdj = tOp(down, sc.selI[j], Is, tms);
      if (!(sc.selUp[j] - tdj >= sc.cti - 1e-9)) return false;
    }
    return true;
  }

  function solve(sc) {
    var isVals = [], seen = {};
    logSpace(sc.IsMin, sc.IsMax, 40).forEach(function (v) { var n = niceIs(v); if (!seen[n]) { seen[n] = 1; isVals.push(n); } });
    var tmsVals = [];
    for (var v = TMS_MIN; v <= TMS_MAX + 1e-9; v += 0.02) tmsVals.push(round2(v));
    var count = 0, best = null, bestScore = -Infinity, isSet = {}, tmsSet = {};
    for (var a = 0; a < isVals.length; a++) {
      for (var b = 0; b < tmsVals.length; b++) {
        if (!feasible(sc, isVals[a], tmsVals[b])) continue;
        count++; isSet[isVals[a]] = 1; tmsSet[tmsVals[b]] = 1;
        var e = evaluate(sc, { Is: isVals[a], tms: tmsVals[b] });
        if (e.score > bestScore) { bestScore = e.score; best = { Is: isVals[a], tms: tmsVals[b] }; }
      }
    }
    return {
      count: count,
      fraction: count / (isVals.length * tmsVals.length),
      best: best,
      distinctIs: Object.keys(isSet).length,
      distinctTms: Object.keys(tmsSet).length
    };
  }

  function buildScenario(level) {
    var load = pick(LOADS);
    var IL = pick([32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400]);
    var Iz = snap(IL * rand(1.25, 1.7), 5);
    var types = ["SI", "VI", "EI"];
    var downType = level <= 2 ? "SI" : pick(level <= 3 ? ["SI", "VI"] : types);
    var upType = level <= 4 ? downType : pick(types);
    var If = snap(rand(4000, 30000), 100);
    var IsUp = snap(Iz * rand(1.7, 2.8), 5);
    if (If < IsUp * 6) return null;
    var cti = level <= 2 ? 0.2 : (level <= 4 ? 0.3 : 0.4);
    var c = CURVES[upType];
    var tmsUp = rand(cti + 0.35, cti + 1.3) * (Math.pow(If / IsUp, c.a) - 1) / c.k;
    tmsUp = Math.min(1, Math.max(0.1, snap(tmsUp, 0.05)));
    var K2S2 = level >= 2 ? rand(0.35, 1.2) * If * If : null;
    var motor = null;
    if (level >= 3 && load.m && Math.random() < 0.65) {
      var Ist = snap(IL * rand(4.5, 6.5), 5);
      if (Ist < If * 0.6) motor = { I: Ist, t: snap(rand(2.5, 8), 0.5) };
    }
    return prepare({
      level: level, title: load.n, IL: IL, Iz: Iz, If: If, cti: cti, downType: downType,
      up: { type: upType, Is: IsUp, tms: tmsUp }, K2S2: K2S2, motor: motor,
      IsMin: Math.round(IL * 0.6), IsMax: Math.round(Iz * 1.5)
    });
  }

  // A hand-checked scenario used only if random generation somehow fails.
  function fallbackScenario() {
    return prepare({
      level: 1, title: "Workshop sub-board", IL: 80, Iz: 100, If: 10000, cti: 0.2, downType: "SI",
      up: { type: "SI", Is: 200, tms: 0.4 }, K2S2: null, motor: null, IsMin: 48, IsMax: 150
    });
  }

  function genScenario(level) {
    var lvl = Math.max(1, Math.min(6, level));
    var band = BANDS[lvl], loose = null;
    for (var tries = 0; tries < 400; tries++) {
      var sc = buildScenario(lvl);
      if (!sc) continue;
      var sol = solve(sc);
      if (sol.count === 0 || sol.distinctIs < 2 || sol.distinctTms < 2) continue;
      sc.solution = sol;
      if (sol.fraction >= band[0] && sol.fraction <= band[1] && sol.distinctIs >= 3 && sol.distinctTms >= 3) return sc;
      if (!loose) loose = sc;
    }
    if (loose) return loose;
    var fb = fallbackScenario();
    fb.solution = solve(fb);
    return fb;
  }

  window.CoordPuzzle = { CURVES: CURVES, tOp: tOp, evaluate: evaluate, feasible: feasible, solve: solve, genScenario: genScenario, fallbackScenario: fallbackScenario, prepare: prepare, BANDS: BANDS };

  /* ------------------------------------------------------------------ *
   *  UI                                                                 *
   * ------------------------------------------------------------------ */
  if (typeof document === "undefined") return; // engine-only load (tests)
  function $(id) { return document.getElementById(id); }
  var startScreen = $("startScreen"), gameScreen = $("gameScreen"), overScreen = $("overScreen");
  if (!startScreen) return; // engine-only load (tests)

  var toast = $("toast"), chartHost = $("chartHost");
  var state = { score: 0, lives: 3, streak: 0, round: 0, cleared: 0, playing: false };
  var sc = null, set = { Is: 0, tms: 0.5 }, timeLeft = 0, timeTotal = 0, timerHandle = null;
  var failedThisRound = false, hintUsed = false, advanceHandle = null, toastHandle = null;
  var chart = null; // geometry + element refs for the current chart

  function getBest() { try { return parseInt(localStorage.getItem(STORE_KEY) || "0", 10) || 0; } catch (e) { return 0; } }
  function setBest(v) { try { localStorage.setItem(STORE_KEY, String(v)); } catch (e) { /* storage unavailable */ } }
  $("bestChip").innerHTML = "Best score: <b>" + getBest() + "</b>";

  function showToast(msg, ms) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastHandle);
    toastHandle = setTimeout(function () { toast.classList.remove("show"); }, ms || 1800);
  }

  function renderHearts() {
    var html = "";
    for (var i = 0; i < 3; i++) {
      var lost = i >= state.lives;
      html += '<svg class="cp-heart" viewBox="0 0 24 24" aria-hidden="true"><path fill="' + (lost ? "rgba(255,255,255,.12)" : "#F0475C") + '" d="M12 21s-7.5-4.6-10-9.3C.4 8.6 2 5 5.6 5c2 0 3.4 1 4.4 2.4C11 6 12.4 5 14.4 5 18 5 19.6 8.6 22 11.7 19.5 16.4 12 21 12 21z"/></svg>';
    }
    $("heartsRow").innerHTML = html;
    $("heartsRow").setAttribute("aria-label", state.lives + " lives left");
  }
  function multiplier() { return 1 + Math.min(3, state.streak) * 0.5; }
  function updateHud() {
    $("scoreVal").textContent = state.score;
    $("comboVal").textContent = "\u00D7" + multiplier().toString();
    $("roundVal").textContent = state.round;
    renderHearts();
  }

  /* ---- chart ------------------------------------------------------- */
  var NS = "http://www.w3.org/2000/svg";
  function buildChart() {
    var W = 560, H = 380, M = { l: 58, r: 14, t: 12, b: 40 };
    var PW = W - M.l - M.r, PH = H - M.t - M.b;
    var xMin = sc.IL * 0.5, xMax = sc.If * 2;
    var lx0 = Math.log10(xMin), lx1 = Math.log10(xMax), ly0 = -2, ly1 = 3;
    function X(I) { return M.l + PW * (Math.log10(I) - lx0) / (lx1 - lx0); }
    function Y(t) { return M.t + PH * (1 - (Math.log10(t) - ly0) / (ly1 - ly0)); }
    var g = "";
    // grid + tick labels
    for (var p = Math.floor(lx0); p <= Math.ceil(lx1); p++) {
      [1, 2, 5].forEach(function (m, idx) {
        var v = m * Math.pow(10, p);
        if (v < xMin || v > xMax) return;
        var x = X(v);
        g += '<line class="grid" x1="' + x + '" y1="' + M.t + '" x2="' + x + '" y2="' + (M.t + PH) + '"/>';
        if (idx === 0) g += '<text class="tick" x="' + x + '" y="' + (H - 20) + '" text-anchor="middle">' + (v >= 1000 ? (v / 1000) + "k" : v) + '</text>';
      });
    }
    for (var q = ly0; q <= ly1; q++) {
      var yy = Y(Math.pow(10, q));
      g += '<line class="grid" x1="' + M.l + '" y1="' + yy + '" x2="' + (M.l + PW) + '" y2="' + yy + '"/>';
      g += '<text class="tick" x="' + (M.l - 8) + '" y="' + (yy + 4) + '" text-anchor="end">' + (q === 3 ? "1k" : Math.pow(10, q)) + '</text>';
    }
    g += '<line class="axis" x1="' + M.l + '" y1="' + M.t + '" x2="' + M.l + '" y2="' + (M.t + PH) + '"/><line class="axis" x1="' + M.l + '" y1="' + (M.t + PH) + '" x2="' + (M.l + PW) + '" y2="' + (M.t + PH) + '"/>';
    g += '<text class="axis-title" x="' + (M.l + PW / 2) + '" y="' + (H - 3) + '" text-anchor="middle">CURRENT (A)</text>';
    g += '<text class="axis-title" transform="translate(13 ' + (M.t + PH / 2) + ') rotate(-90)" text-anchor="middle">TIME (s)</text>';

    var clip = '<clipPath id="cpClip"><rect x="' + M.l + '" y="' + M.t + '" width="' + PW + '" height="' + PH + '"/></clipPath>';
    var body = "";
    // pickup window (1.1 x load .. cable rating)
    var bx0 = X(LOAD_MARGIN * sc.IL), bx1 = X(sc.Iz);
    body += '<rect class="band" x="' + bx0 + '" y="' + M.t + '" width="' + Math.max(2, bx1 - bx0) + '" height="' + PH + '"/>';
    body += '<line x1="' + bx0 + '" y1="' + M.t + '" x2="' + bx0 + '" y2="' + (M.t + PH) + '" stroke="#22D97A" stroke-width="1.5" stroke-dasharray="3 4"/>';
    body += '<line x1="' + bx1 + '" y1="' + M.t + '" x2="' + bx1 + '" y2="' + (M.t + PH) + '" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3 4"/>';
    // max fault
    body += '<line x1="' + X(sc.If) + '" y1="' + M.t + '" x2="' + X(sc.If) + '" y2="' + (M.t + PH) + '" stroke="#F0475C" stroke-width="1.8" stroke-dasharray="7 5" opacity=".8"/>';
    // upstream curve
    body += '<path class="curve-up" d="' + curvePath(sc.up.type, sc.up.Is, sc.up.tms, 0) + '"/>';
    // cable damage limit (0.9 x k2s2 / i2), only where it clears in <= 5 s
    if (sc.K2S2) body += '<path class="curve-cable" d="' + cablePath() + '"/>';
    // motor start marker (drawn at the required ride-through point)
    if (sc.motor) {
      var mx = X(sc.motor.I), my = Y(START_MARGIN * sc.motor.t);
      body += '<polygon points="' + mx + ',' + (my - 8) + ' ' + (mx + 8) + ',' + my + ' ' + mx + ',' + (my + 8) + ' ' + (mx - 8) + ',' + my + '" fill="#F59E0B" stroke="#03150b" stroke-width="1.5"/>';
      body += '<text class="lbl" x="' + (mx + 12) + '" y="' + (my + 4) + '" fill="#F59E0B">motor start</text>';
    }
    // dynamic layer (player curve)
    body += '<path class="curve-cti" id="cpCti" d=""/><path class="curve-down" id="cpDown" d=""/>';
    body += '<path class="hit" id="cpHit" d=""/>';
    var labels = '<text class="lbl" x="' + (X(sc.If) - 6) + '" y="' + (M.t + 14) + '" text-anchor="end" fill="#F0475C">max fault</text>';
    if (bx1 - bx0 > 46) labels += '<text class="lbl" x="' + ((bx0 + bx1) / 2) + '" y="' + (M.t + PH - 8) + '" text-anchor="middle" fill="#22D97A">pickup window</text>';

    chartHost.innerHTML =
      '<svg id="cpSvg" class="cp-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Time-current chart: your relay curve against the upstream relay and the cable damage limit">' +
      '<defs>' + clip + '</defs>' + g + '<g clip-path="url(#cpClip)">' + body + '</g>' + labels +
      '<circle class="handle-ring" id="cpRing" r="17" cx="0" cy="0"/><circle class="handle" id="cpHandle" r="9" cx="0" cy="0"/></svg>';

    chart = { W: W, H: H, M: M, PW: PW, PH: PH, X: X, Y: Y, xMin: xMin, xMax: xMax, ppdx: PW / (lx1 - lx0), ppdy: PH / (ly1 - ly0),
      svg: $("cpSvg"), down: $("cpDown"), cti: $("cpCti"), hit: $("cpHit"), handle: $("cpHandle"), ring: $("cpRing") };
    attachDrag();

    function curvePath(type, Is, tms, offset) {
      if (Is * 1.02 >= xMax) return "";
      var arr = logSpace(Is * 1.02, xMax, 150), d = "";
      for (var i = 0; i < arr.length; i++) {
        var t = tOp(type, arr[i], Is, tms) + offset;
        if (!isFinite(t)) continue;
        d += (d ? "L" : "M") + X(arr[i]).toFixed(1) + " " + Y(Math.min(1e6, t)).toFixed(1);
      }
      return d;
    }
    function cablePath() {
      var lo = Math.max(xMin, Math.sqrt(CABLE_MARGIN * sc.K2S2 / 5));
      if (lo >= xMax) return "";
      var arr = logSpace(lo, xMax, 80), d = "";
      for (var i = 0; i < arr.length; i++) d += (i ? "L" : "M") + X(arr[i]).toFixed(1) + " " + Y(CABLE_MARGIN * tDamage(sc.K2S2, arr[i])).toFixed(1);
      return d;
    }
    chart.curvePath = curvePath;
  }

  function drawPlayerCurve() {
    var d = chart.curvePath(sc.downType, set.Is, set.tms, 0);
    chart.down.setAttribute("d", d);
    chart.hit.setAttribute("d", d);
    chart.cti.setAttribute("d", chart.curvePath(sc.downType, set.Is, set.tms, sc.cti));
    // handle rides on the curve so dragging feels like grabbing it
    var Ih = Math.min(set.Is * 3, chart.xMax * 0.85);
    var th = tOp(sc.downType, Ih, set.Is, set.tms);
    var hx = chart.X(Ih), hy = Math.max(chart.M.t + 6, Math.min(chart.M.t + chart.PH - 6, chart.Y(th)));
    chart.handle.setAttribute("cx", hx); chart.handle.setAttribute("cy", hy);
    chart.ring.setAttribute("cx", hx); chart.ring.setAttribute("cy", hy);
  }

  function attachDrag() {
    var drag = null;
    function svgPoint(e) {
      var pt = chart.svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(chart.svg.getScreenCTM().inverse());
    }
    function down(e) {
      if (!state.playing) return;
      e.preventDefault();
      var p = svgPoint(e);
      drag = { x: p.x, y: p.y, Is: set.Is, tms: set.tms, id: e.pointerId, el: e.currentTarget };
      try { drag.el.setPointerCapture(e.pointerId); } catch (err) { /* older browsers */ }
      chart.svg.classList.add("dragging");
    }
    function move(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var p = svgPoint(e);
      var Is = drag.Is * Math.pow(10, (p.x - drag.x) / chart.ppdx);
      var tms = drag.tms * Math.pow(10, (drag.y - p.y) / chart.ppdy);
      setSettings(Is, tms, true);
    }
    function up(e) {
      if (!drag || e.pointerId !== drag.id) return;
      try { drag.el.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      drag = null; chart.svg.classList.remove("dragging");
    }
    [chart.hit, chart.handle, chart.ring].forEach(function (el) {
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
    });
  }

  /* ---- settings / goals ------------------------------------------- */
  function isToPos(Is) { return Math.round(1000 * Math.log(Is / sc.IsMin) / Math.log(sc.IsMax / sc.IsMin)); }
  function posToIs(pos) { return niceIs(sc.IsMin * Math.pow(sc.IsMax / sc.IsMin, pos / 1000)); }

  function setSettings(Is, tms, fromDrag) {
    set.Is = Math.min(sc.IsMax, Math.max(sc.IsMin, niceIs(Is)));
    set.tms = Math.min(TMS_MAX, Math.max(TMS_MIN, round2(tms)));
    $("valIs").textContent = fmtA(set.Is);
    $("valTms").textContent = set.tms.toFixed(2);
    $("sliderIs").value = isToPos(set.Is);
    $("sliderTms").value = Math.round(set.tms * 100);
    drawPlayerCurve();
    renderGoals();
  }

  function renderGoals() {
    var r = evaluate(sc, set);
    var rows = [
      ["Carries the load, protects the cable", r.load],
      sc.motor ? ["Rides through the motor start", r.motor] : null,
      sc.K2S2 ? ["Cable survives the fault", r.cable] : null,
      ["Trips before the upstream relay", r.sel]
    ].filter(Boolean);
    $("goalsList").innerHTML = rows.map(function (row) {
      return '<li class="cp-goal ' + (row[1].ok ? "ok" : "bad") + '"><span class="ic" aria-hidden="true">' + (row[1].ok ? "\u2713" : "\u2715") + '</span><span><b>' + row[0] + '</b><span class="txt">' + row[1].text + '</span></span></li>';
    }).join("");
    return r;
  }

  /* ---- rounds ------------------------------------------------------ */
  function levelFor(round) { return Math.min(6, 1 + Math.floor((round - 1) / 2)); }

  function startRun() {
    clearTimeout(advanceHandle);
    state.score = 0; state.lives = 3; state.streak = 0; state.round = 0; state.cleared = 0; state.playing = false;
    startScreen.classList.add("hidden"); overScreen.classList.add("hidden"); gameScreen.classList.remove("hidden");
    nextRound();
  }

  function nextRound() {
    state.round++;
    sc = genScenario(levelFor(state.round));
    failedThisRound = false; hintUsed = false; state.playing = true;
    $("roundTag").textContent = "Level " + sc.level + " \u00B7 Round " + state.round;
    $("roundTitle").textContent = sc.title + " \u2014 " + sc.IL + " A";
    $("roundSub").textContent = "Set the downstream relay (" + CURVES[sc.downType].name + ") so it clears a fault before the upstream relay.";
    var facts = [
      ["Load", sc.IL + " A"], ["Cable rating", sc.Iz + " A"], ["Max fault", fmtA(sc.If)],
      ["Upstream", CURVES[sc.up.type].name.split(" ")[0] + " \u00B7 " + sc.up.Is + " A \u00B7 TMS " + sc.up.tms.toFixed(2)],
      ["Grading margin", sc.cti.toFixed(1) + " s"]
    ];
    if (sc.motor) facts.push(["Motor start", fmtA(sc.motor.I) + " for " + sc.motor.t + " s"]);
    $("factsRow").innerHTML = facts.map(function (f) { return '<span class="cp-fact">' + f[0] + ' <b>' + f[1] + '</b></span>'; }).join("");

    $("sliderIs").min = 0; $("sliderIs").max = 1000; $("sliderIs").step = 1;
    $("sliderTms").min = Math.round(TMS_MIN * 100); $("sliderTms").max = Math.round(TMS_MAX * 100); $("sliderTms").step = 1;
    buildChart();
    // start from settings that are not already a valid answer
    var starts = [{ Is: posToIs(500), tms: 0.5 }, { Is: sc.IsMax, tms: 1 }, { Is: sc.IsMin, tms: 0.1 }, { Is: posToIs(250), tms: 0.9 }];
    var init = starts[0];
    for (var i = 0; i < starts.length; i++) { init = starts[i]; if (!evaluate(sc, init).allOk) break; }
    setSettings(init.Is, init.tms, false);

    $("hintBtn").disabled = false; $("lockBtn").disabled = false;
    timeTotal = Math.max(45, 80 - 5 * (sc.level - 1)); timeLeft = timeTotal;
    clearInterval(timerHandle); timerHandle = setInterval(tick, 100);
    updateHud(); tick(true);
  }

  function tick(silent) {
    if (silent !== true) timeLeft -= 0.1;
    var pct = Math.max(0, timeLeft / timeTotal * 100);
    $("timerFill").style.width = pct + "%";
    $("timerFill").classList.toggle("warn", pct < 25);
    if (timeLeft <= 0 && state.playing) {
      state.playing = false; clearInterval(timerHandle);
      $("lockBtn").disabled = true; $("hintBtn").disabled = true;
      if (loseLife("Time\u2019s up \u2014 the feeder tripped on the wrong relay.")) return;
      advanceHandle = setTimeout(nextRound, 1500);
    }
  }

  function loseLife(msg) {
    state.lives--; state.streak = 0; updateHud();
    if (state.lives <= 0) { endRun(); return true; }
    showToast(msg, 2400);
    return false;
  }

  function lockIn() {
    if (!state.playing) return;
    var r = evaluate(sc, set);
    if (r.allOk) {
      state.playing = false; clearInterval(timerHandle);
      $("lockBtn").disabled = true; $("hintBtn").disabled = true;
      var base = 100 + 40 * sc.level, bonus = Math.ceil(Math.max(0, timeLeft)) * 3;
      var clean = !failedThisRound && !hintUsed;
      if (clean) state.streak++; else state.streak = 0;
      var pts = Math.round((base + bonus) * (clean ? multiplier() : 1));
      state.score += pts; state.cleared++;
      updateHud();
      showToast("\u2713 Coordinated! +" + pts + (clean && state.streak > 1 ? "  (combo \u00D7" + multiplier() + ")" : ""), 1500);
      advanceHandle = setTimeout(nextRound, 1600);
      return;
    }
    failedThisRound = true;
    var bad = [];
    if (!r.load.ok) bad.push("pickup"); if (r.motor && !r.motor.ok) bad.push("motor start"); if (r.cable && !r.cable.ok) bad.push("cable limit"); if (!r.sel.ok) bad.push("grading margin");
    $("gameCard").classList.remove("cp-shake"); void $("gameCard").offsetWidth; $("gameCard").classList.add("cp-shake");
    loseLife("Not coordinated yet \u2014 check the " + bad.join(", ") + ".");
  }

  function useHint() {
    if (!state.playing || hintUsed || !sc.solution || !sc.solution.best) return;
    hintUsed = true; $("hintBtn").disabled = true;
    state.score = Math.max(0, state.score - 150); state.streak = 0; updateHud();
    setSettings(sc.solution.best.Is, sc.solution.best.tms, false);
    showToast("Hint used (\u2212150). One valid setting is loaded \u2014 lock it in.", 2200);
  }

  function endRun() {
    state.playing = false; clearInterval(timerHandle); clearTimeout(advanceHandle);
    gameScreen.classList.add("hidden"); overScreen.classList.remove("hidden");
    var best = getBest();
    if (state.score > best) { best = state.score; setBest(best); }
    $("finalScore").textContent = state.score;
    $("finalRounds").textContent = state.cleared;
    $("finalBest").textContent = best;
    $("bestChip").innerHTML = "Best score: <b>" + best + "</b>";
  }

  $("sliderIs").addEventListener("input", function () { if (state.playing) setSettings(posToIs(parseInt(this.value, 10)), set.tms, false); });
  $("sliderTms").addEventListener("input", function () { if (state.playing) setSettings(set.Is, parseInt(this.value, 10) / 100, false); });
  $("lockBtn").addEventListener("click", lockIn);
  $("hintBtn").addEventListener("click", useHint);
  $("startBtn").addEventListener("click", startRun);
  $("againBtn").addEventListener("click", startRun);
  $("backBtn").addEventListener("click", function () { window.location.href = "games"; });
})();
