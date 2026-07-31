// Engineerz Corner — injects styled left/right side widgets, with icons,
// and keeps them pinned just below whatever header/nav is visible as you scroll.
(function(){
  var ICONS = {
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
    cog: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    snow: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="4" y1="7" x2="20" y2="17"/><line x1="4" y1="17" x2="20" y2="7"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="1"/><line x1="9" y1="2" x2="9" y2="6"/><line x1="15" y1="2" x2="15" y2="6"/><line x1="9" y1="18" x2="9" y2="22"/><line x1="15" y1="18" x2="15" y2="22"/><line x1="2" y1="9" x2="6" y2="9"/><line x1="2" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="22" y2="9"/><line x1="18" y1="15" x2="22" y2="15"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="9" y1="14" x2="9" y2="14"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="15" y1="10" x2="15" y2="10"/><line x1="15" y1="14" x2="15" y2="14"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 0 0 5.4-5.4l-3.14 3.14-2.83-2.83z"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="1.5"/><path d="M9 4V2h6v2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="1.5"/><path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3H20a1.5 1.5 0 0 1 1.5 1.5V15a1.5 1.5 0 0 1-1.5 1.5H18"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>'
  };

  var exploreLinks = [
    ["Electrical", "/electrical/index.html", "bolt"],
    ["Mechanical", "/mechanical/index.html", "cog"],
    ["HVAC", "/hvac/index.html", "snow"],
    ["Automation", "/automation/index.html", "cpu"],
    ["Civil", "/civil/index.html", "building"],
    ["General Tools", "/general/index.html", "wrench"],
    ["Project Management", "/pm/index.html", "clipboard"]
  ];

  var popularLinks = [
    ["Latest Posts", "/posts/index.html", "doc"],
    ["Notes & Study Guides", "/notes/index.html", "book"],
    ["Flashcards", "/flashcards.html", "cards"],
    ["Quickfire (game)", "/quickfire.html", "cards"],
    ["Technical Games", "/games.html", "cards"],
    ["About Engineerz Corner", "/about.html", "info"]
  ];

  var tips = [
    "1 HP equals roughly 746 watts \u2014 handy when sizing motors from nameplate kW.",
    "A 3% voltage drop is the common design limit for branch circuits, 5% for the full feeder-to-load run.",
    "NPSH available must exceed NPSH required with margin \u2014 running too close invites pump cavitation.",
    "Copper's resistance rises about 0.4% per \u00b0C \u2014 derate ampacity for hot enclosures.",
    "For ducted air, doubling velocity roughly quadruples the friction loss \u2014 keep runs generously sized.",
    "Bolt preload, not thread friction, does most of the work resisting joint separation.",
    "PID derivative action reacts to rate of change \u2014 it's the term most often disabled on noisy signals."
  ];

  var DAILY_QUIZ = [
    {q:"A motor's nameplate says 1 HP. Roughly how many watts is that?", opts:["100 W","350 W","746 W","1500 W"], a:2, note:"1 HP \u2248 746 W \u2014 the classic conversion for sizing motors from nameplate ratings."},
    {q:"What's the typical max voltage drop limit for a branch circuit?", opts:["1%","3%","10%","15%"], a:1, note:"3% is the common limit for branch circuits (5% for the full feeder-to-load run)."},
    {q:"Running a pump with too little NPSH margin risks what?", opts:["Overheating","Cavitation","Overvoltage","Corrosion"], a:1, note:"NPSH available must exceed NPSH required with margin, or you invite cavitation."},
    {q:"In a control loop, what does the derivative term respond to?", opts:["Steady-state error","Rate of change","Total accumulated error","Setpoint value"], a:1, note:"Derivative action reacts to rate of change \u2014 often disabled on noisy signals."},
    {q:"Doubling air velocity in a duct roughly does what to friction loss?", opts:["Doubles it","Halves it","Quadruples it","No effect"], a:2, note:"Friction loss scales with velocity squared \u2014 doubling velocity roughly quadruples it."},
    {q:"What mainly resists a bolted joint from separating under load?", opts:["Thread friction","Bolt preload","Nut hardness","Washer size"], a:1, note:"Preload \u2014 the clamping tension in the bolt \u2014 does most of the work, not thread friction."},
    {q:"Copper's electrical resistance as temperature rises does what?", opts:["Decreases","Stays flat","Increases \u2248 0.4%/\u00b0C","Increases \u2248 4%/\u00b0C"], a:2, note:"Roughly 0.4% per \u00b0C \u2014 a reason to derate ampacity in hot enclosures."},
    {q:"Which unit is a measure of reactive power?", opts:["kW","kVA","kVAR","kWh"], a:2, note:"kVAR is reactive power; kW is real power, kVA is apparent power."}
  ];

  var FLASH_TERMS = [
    {t:"NPSH", d:"Net Positive Suction Head \u2014 the pressure margin available above a fluid's vapor pressure at the pump suction, preventing cavitation."},
    {t:"THD", d:"Total Harmonic Distortion \u2014 a measure of how much a waveform deviates from a pure sine due to harmonic content."},
    {t:"Cv", d:"Flow coefficient of a control valve \u2014 the flow rate (US gpm of water) that produces a 1 psi pressure drop across the valve."},
    {t:"RACI", d:"Responsible, Accountable, Consulted, Informed \u2014 a matrix used to clarify roles on project tasks."},
    {t:"EVM", d:"Earned Value Management \u2014 a project control method comparing planned, earned, and actual cost/schedule performance."},
    {t:"ANSI 50/51", d:"Protective relay device numbers for instantaneous (50) and time-delayed (51) overcurrent protection."},
    {t:"Cavitation", d:"Formation and collapse of vapor bubbles in a liquid due to local pressure dropping below vapor pressure \u2014 damages pump impellers."},
    {t:"Nut Factor (K)", d:"An empirical constant relating applied bolt torque to achieved clamping preload, accounting for friction."},
    {t:"COP", d:"Coefficient of Performance \u2014 ratio of useful heating/cooling output to work input for a heat pump or chiller."},
    {t:"Busbar Withstand", d:"A busbar's ability to survive the thermal and electrodynamic (mechanical) stresses of a short-circuit fault current."}
  ];

  function todayKey(){ return new Date().toISOString().slice(0,10); }
  function seededIndex(len){
    var day = Math.floor(Date.now() / 86400000);
    return day % len;
  }

  function buildQuizCard(){
    var c = cardShell("Daily Challenge", "60-Second Quiz");
    var item = DAILY_QUIZ[seededIndex(DAILY_QUIZ.length)];
    var answeredKey = "ec_quiz_" + todayKey();

    var qEl = el("p", "ec-quiz-q", item.q);
    var optWrap = el("div", "ec-quiz-opts");
    var noteEl = el("p", "ec-quiz-note", item.note);
    noteEl.style.display = "none";
    var streakEl = el("div", "ec-quiz-streak");

    function renderStreak(){
      var streak = 0;
      try { streak = parseInt(localStorage.getItem("ec_quiz_streak") || "0", 10); } catch(e){}
      streakEl.textContent = streak > 0 ? ("\uD83D\uDD25 " + streak + "-day streak") : "Answer today to start a streak";
    }

    function lockIn(pickedIdx, btns){
      btns.forEach(function(b, i){
        b.disabled = true;
        if (i === item.a) b.classList.add("ec-quiz-opt--correct");
        else if (i === pickedIdx) b.classList.add("ec-quiz-opt--wrong");
      });
      noteEl.style.display = "block";
      try {
        var lastDate = localStorage.getItem("ec_quiz_last");
        var streak = parseInt(localStorage.getItem("ec_quiz_streak") || "0", 10);
        var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
        streak = (lastDate === yesterday) ? streak + 1 : 1;
        localStorage.setItem("ec_quiz_streak", String(streak));
        localStorage.setItem("ec_quiz_last", todayKey());
        localStorage.setItem(answeredKey, String(pickedIdx));
      } catch(e){}
      renderStreak();
    }

    var already = null;
    try { already = localStorage.getItem(answeredKey); } catch(e){}

    var btns = item.opts.map(function(optText, i){
      var b = el("button", "ec-quiz-opt", optText);
      b.type = "button";
      b.addEventListener("click", function(){ lockIn(i, btns); });
      optWrap.appendChild(b);
      return b;
    });

    if (already !== null){
      lockIn(parseInt(already, 10), btns);
    } else {
      renderStreak();
    }

    c.body.appendChild(qEl);
    c.body.appendChild(optWrap);
    c.body.appendChild(noteEl);
    c.body.appendChild(streakEl);
    return c.card;
  }

  function buildFlashcardCard(){
    var c = cardShell("Around The Site", "Flashcard Flip");
    var idx = Math.floor(Math.random() * FLASH_TERMS.length);
    var flipped = false;

    var face = el("div", "ec-flip-face");
    var termEl = el("div", "ec-flip-term");
    var hintEl = el("div", "ec-flip-hint", "Tap to reveal");
    face.appendChild(termEl);
    face.appendChild(hintEl);

    var actions = el("div", "ec-flip-actions");
    var shuffleBtn = el("button", "ec-flip-btn", "Shuffle");
    shuffleBtn.type = "button";
    var moreLink = el("a", "ec-flip-btn ec-flip-btn--link", "All flashcards \u2192");
    moreLink.href = "/flashcards.html";

    function render(){
      var item = FLASH_TERMS[idx];
      if (flipped){
        termEl.textContent = item.d;
        termEl.className = "ec-flip-def";
        hintEl.textContent = "Tap for term";
      } else {
        termEl.textContent = item.t;
        termEl.className = "ec-flip-term";
        hintEl.textContent = "Tap to reveal";
      }
    }

    face.addEventListener("click", function(){
      flipped = !flipped;
      render();
    });
    shuffleBtn.addEventListener("click", function(e){
      e.stopPropagation();
      var next = idx;
      while (next === idx) next = Math.floor(Math.random() * FLASH_TERMS.length);
      idx = next;
      flipped = false;
      render();
    });

    actions.appendChild(shuffleBtn);
    actions.appendChild(moreLink);

    render();
    c.body.appendChild(face);
    c.body.appendChild(actions);
    return c.card;
  }

  function el(tag, className, text){
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function cardShell(eyebrow, title){
    var card = el("div", "ec-card");
    var head = el("div", "ec-card__head");
    head.appendChild(el("div", "ec-card__eyebrow", eyebrow));
    head.appendChild(el("div", "ec-card__title", title));
    card.appendChild(head);
    var body = el("div", "ec-card__body");
    card.appendChild(body);
    return {card: card, body: body};
  }

  function buildLinkList(items){
    var ul = el("ul", "ec-list");
    items.forEach(function(item){
      var li = document.createElement("li");
      var a = el("a", null);
      a.href = item[1];
      var iconSpan = document.createElement("span");
      iconSpan.innerHTML = ICONS[item[2]] || "";
      a.appendChild(iconSpan);
      a.appendChild(document.createTextNode(item[0]));
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }

  function buildNavCard(){
    var c = cardShell("Site Map", "Explore Disciplines");
    c.body.appendChild(buildLinkList(exploreLinks));
    return c.card;
  }

  function buildPopularCard(){
    var c = cardShell("Around The Site", "Popular");
    c.body.appendChild(buildLinkList(popularLinks));
    return c.card;
  }

  function buildTipCard(){
    var c = cardShell("Daily Tip", "Engineering Fact");
    var p = el("p", "ec-tip", tips[Math.floor(Math.random() * tips.length)]);
    c.body.appendChild(p);
    return c.card;
  }

  var units = {
    Length: {mm: 1, cm: 10, m: 1000, "in": 25.4, ft: 304.8},
    Pressure: {kPa: 1, bar: 100, psi: 6.89476, MPa: 1000},
    Torque: {"N\u00b7m": 1, "lb\u00b7ft": 1.35582, "kg\u00b7cm": 0.0980665}
  };

  function buildConvertCard(){
    var c = cardShell("Quick Convert", "Unit Converter");

    var catSelect = el("select", "ec-convert-cat");
    Object.keys(units).forEach(function(cat){
      var o = el("option", null, cat);
      o.value = cat;
      catSelect.appendChild(o);
    });

    var row1 = el("div", "ec-convert-row");
    var input = el("input");
    input.type = "number";
    input.value = "1";
    var fromSelect = el("select");
    row1.appendChild(input);
    row1.appendChild(fromSelect);

    var row2 = el("div", "ec-convert-row");
    var arrow = el("div", null, "\u2193");
    arrow.style.cssText = "flex:1;text-align:center;color:var(--ink-faint,#8D91AA);font-size:12px;";
    var toSelect = el("select");
    row2.appendChild(arrow);
    row2.appendChild(toSelect);

    var out = el("div", "ec-convert-out", "\u2014");

    function populateUnitSelects(){
      var cat = catSelect.value;
      [fromSelect, toSelect].forEach(function(sel, idx){
        sel.innerHTML = "";
        Object.keys(units[cat]).forEach(function(u){
          var o = el("option", null, u);
          o.value = u;
          sel.appendChild(o);
        });
        sel.selectedIndex = idx === 1 ? 1 : 0;
      });
      calc();
    }

    function calc(){
      var cat = catSelect.value;
      var val = parseFloat(input.value);
      if (isNaN(val)) { out.textContent = "\u2014"; return; }
      var base = val * units[cat][fromSelect.value];
      var result = base / units[cat][toSelect.value];
      out.textContent = (Math.round(result * 10000) / 10000) + " " + toSelect.value;
    }

    catSelect.addEventListener("change", populateUnitSelects);
    [input, fromSelect, toSelect].forEach(function(elm){
      elm.addEventListener("input", calc);
      elm.addEventListener("change", calc);
    });

    c.body.appendChild(catSelect);
    c.body.appendChild(row1);
    c.body.appendChild(row2);
    var spacer = el("div"); spacer.style.height = "8px";
    c.body.appendChild(spacer);
    c.body.appendChild(out);

    populateUnitSelects();
    return c.card;
  }

  // ---- keep the rails pinned just below whatever header/nav AND hero banner
  // is on screen. The site uses a different hero class per template (.chero,
  // .cal-hero, .fc-hero, .hero-band, .nt-hero, .pagehero, .qz-hero, ...), so
  // rather than hardcoding each one (which breaks the moment a new page adds
  // a new hero class), match any element whose class contains "hero" — this
  // works automatically across every current and future page template. ----
  var HEADER_SELECTORS = ["nav", ".topbar", ".masthead", ".masthead-inner", "[class*='hero']"];
  var GAP = 24;
  var MIN_TOP = 16;

  function computeHeaderBottom(){
    var maxBottom = 0;
    HEADER_SELECTORS.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(elm){
        var r = elm.getBoundingClientRect();
        // r.top < 400 anchors this to elements that START near the top of
        // the page (the nav/hero at the very top), not some unrelated
        // "*-hero-*" element further down the page. The hero itself can be
        // arbitrarily TALL — that's fine, we still want its full r.bottom.
        if (r.top < 400 && r.bottom > maxBottom) maxBottom = r.bottom;
      });
    });
    return maxBottom;
  }

  var leftSide, rightSide;

  // Sets the top position ONCE, based on where the header currently ends
  // (scrollY at load, normally 0). Since .ec-side is position:absolute (not
  // fixed), after this it scrolls naturally with the rest of the page and
  // will never re-appear over the header — it just moves up and down with
  // everything else.
  function placeBelowHeader(){
    var top = Math.max(MIN_TOP, computeHeaderBottom() + window.scrollY + GAP);
    if (leftSide) leftSide.style.top = top + "px";
    if (rightSide) rightSide.style.top = top + "px";
  }

  document.addEventListener("DOMContentLoaded", function(){
    if (document.querySelector(".ec-side")) return; // avoid double-inject

    leftSide = el("aside", "ec-side ec-side--left");
    leftSide.appendChild(buildNavCard());
    leftSide.appendChild(buildFlashcardCard());

    rightSide = el("aside", "ec-side ec-side--right");
    rightSide.appendChild(buildQuizCard());
    rightSide.appendChild(buildTipCard());
    rightSide.appendChild(buildConvertCard());
    rightSide.appendChild(buildPopularCard());

    document.body.appendChild(leftSide);
    document.body.appendChild(rightSide);

    placeBelowHeader();
    // recompute after full load (webfonts can shift header height after
    // DOMContentLoaded), and on resize — not on scroll, since absolute
    // positioning already scrolls with the page on its own
    window.addEventListener("load", placeBelowHeader);
    window.addEventListener("resize", placeBelowHeader);

    // ---- keep watching the header/hero/ad-slot elements themselves, since
    // any of them can change height AFTER the above fires (AdSense iframes
    // filling in async, webfonts swapping late) — a one-time measurement
    // goes stale the moment that happens and the rails end up overlapping
    // content that shifted underneath them. ResizeObserver on the actual
    // elements (not document.body) means it only recomputes when something
    // that affects header/hero height genuinely changes, so it can't loop
    // against the rails' own position. ----
    if (window.ResizeObserver) {
      var reflowQueued = false;
      var ro = new ResizeObserver(function(){
        if (reflowQueued) return;
        reflowQueued = true;
        requestAnimationFrame(function(){ reflowQueued = false; placeBelowHeader(); });
      });
      var watched = [];
      HEADER_SELECTORS.forEach(function(sel){
        document.querySelectorAll(sel).forEach(function(elm){ watched.push(elm); });
      });
      document.querySelectorAll("[class*='ad-slot']").forEach(function(elm){ watched.push(elm); });
      watched.forEach(function(elm){ ro.observe(elm); });
    } else {
      // fallback for older browsers without ResizeObserver: a few staggered
      // re-checks catch most late-loading ads/fonts without an observer
      [400, 1000, 2000, 3500].forEach(function(t){ setTimeout(placeBelowHeader, t); });
    }
  });
})();
