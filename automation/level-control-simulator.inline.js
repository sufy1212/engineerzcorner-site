(function(){
  "use strict";

  // ---- DOM refs ----
  var $ = function(id){ return document.getElementById(id); };
  var liquid = $('lcsLiquid'), spLine = $('lcsSpLine'), hhLine = $('lcsHHLine'), llLine = $('lcsLLLine'), spTxt = $('lcsSpTxt');
  var valveInGate = $('lcsValveInGate'), valveOutGate = $('lcsValveOutGate'), valveInPctTxt = $('lcsValveInPct');
  var inFlow1 = $('lcsInFlow1'), inFlow2 = $('lcsInFlow2'), outFlow1 = $('lcsOutFlow1'), outFlow2 = $('lcsOutFlow2');
  var pvTxt = $('lcsPvTxt'), outTxt = $('lcsOutTxt'), lampRun = $('lcsLampRun');
  var hhLamp = $('lcsHHLamp'), llLamp = $('lcsLLLamp');
  var clockTxt = $('lcsClock');
  var playBtn = $('lcsPlayBtn'), resetBtn = $('lcsResetBtn'), kickBtn = $('lcsKickBtn'), speedInput = $('lcsSpeed');

  var spInput = $('lcsSp'), kpInput = $('lcsKp'), kiInput = $('lcsKi'), kdInput = $('lcsKd'), qoutInput = $('lcsQout'), kickSizeInput = $('lcsKickSize');
  var spVal = $('lcsSpVal'), kpVal = $('lcsKpVal'), kiVal = $('lcsKiVal'), kdVal = $('lcsKdVal'), qoutVal = $('lcsQoutVal'), kickSizeVal = $('lcsKickVal');
  var hhInput = $('lcsHH'), llInput = $('lcsLL');

  var statPv = $('lcsStatPv'), statErr = $('lcsStatErr'), statOut = $('lcsStatOut'), statBand = $('lcsStatBand');
  var banner = $('lcsBanner'), bannerText = $('lcsBannerText');

  var K_IN = 16;   // %level/s at full-open inlet valve
  var K_OUT = 16;  // %level/s at full-open outlet valve
  var VALVE_LAG = 0.30; // per-tick approach fraction toward target
  var KICK_DURATION = 9; // simulated seconds

  // ---- state ----
  var level = 0, integral = 0, prevError = 0;
  var valveInPos = 0, valveOutPos = 0;
  var t = 0, bandTime = 0;
  var running = false, timer = null;
  var kickActive = false, kickTimer = 0;

  function readSliders(){
    return {
      sp: parseFloat(spInput.value),
      kp: parseFloat(kpInput.value),
      ki: parseFloat(kiInput.value),
      kd: parseFloat(kdInput.value),
      qout: parseFloat(qoutInput.value),
      kickSize: parseFloat(kickSizeInput.value),
      hh: parseFloat(hhInput.value),
      ll: parseFloat(llInput.value)
    };
  }

  function syncLabels(){
    spVal.textContent = spInput.value + ' %';
    kpVal.textContent = parseFloat(kpInput.value).toFixed(1);
    kiVal.textContent = parseFloat(kiInput.value).toFixed(2);
    kdVal.textContent = parseFloat(kdInput.value).toFixed(1);
    qoutVal.textContent = qoutInput.value + ' %valve';
    kickSizeVal.textContent = '+' + kickSizeInput.value + ' %valve';
  }
  [spInput,kpInput,kiInput,kdInput,qoutInput,kickSizeInput].forEach(function(el){
    el.addEventListener('input', syncLabels);
  });
  syncLabels();

  function clamp(v,lo,hi){ return Math.max(lo, Math.min(hi, v)); }

  function tick(dt){
    var s = readSliders();

    // --- PID ---
    var error = s.sp - level;
    var rawI = integral + error * dt;
    var deriv = (error - prevError) / dt;
    var rawOut = s.kp * error + s.ki * rawI + s.kd * deriv;
    var out = clamp(rawOut, 0, 100);
    // simple anti-windup: only commit integral growth if not driving further into saturation
    if (!((out === 100 && error > 0) || (out === 0 && error < 0))) {
      integral = rawI;
    }
    prevError = error;

    // --- disturbance kick ---
    if (kickActive) {
      kickTimer -= dt;
      if (kickTimer <= 0) { kickActive = false; }
    }
    var outletTarget = kickActive ? Math.min(100, s.qout + s.kickSize) : s.qout;

    // --- valve travel lag ---
    valveInPos += (out - valveInPos) * VALVE_LAG;
    valveOutPos += (outletTarget - valveOutPos) * VALVE_LAG;

    // --- tank mass balance ---
    var inflow = (valveInPos/100) * K_IN;
    var outflow = (valveOutPos/100) * K_OUT;
    level = clamp(level + (inflow - outflow) * dt, 0, 100);

    t += dt;
    if (Math.abs(s.sp - level) <= 3) { bandTime += dt; }

    render(s, error, inflow, outflow);
  }

  function render(s, error, inflow, outflow){
    // liquid fill (local tank coords: 0..160 tall, liquid area y 3..157)
    var h = (level/100) * 154;
    liquid.setAttribute('y', (157 - h).toFixed(1));
    liquid.setAttribute('height', h.toFixed(1));

    var spY = (160 - (s.sp/100)*160).toFixed(1);
    spLine.setAttribute('y1', spY); spLine.setAttribute('y2', spY);
    spTxt.setAttribute('y', (parseFloat(spY)+4).toFixed(1));

    var hhY = (160 - (s.hh/100)*160).toFixed(1);
    hhLine.setAttribute('y1', hhY); hhLine.setAttribute('y2', hhY);
    var llY = (160 - (s.ll/100)*160).toFixed(1);
    llLine.setAttribute('y1', llY); llLine.setAttribute('y2', llY);

    // valve gates: closed = vertical (blocking), open = horizontal (aligned with flow)
    var inAngle = 90 - (valveInPos/100)*90;
    var outAngle = 90 - (valveOutPos/100)*90;
    valveInGate.setAttribute('transform', 'rotate(' + inAngle.toFixed(1) + ')');
    valveOutGate.setAttribute('transform', 'rotate(' + outAngle.toFixed(1) + ')');
    valveInPctTxt.textContent = Math.round(valveInPos) + '%';

    [inFlow1, inFlow2].forEach(function(el){ el.classList.toggle('on', running && inflow > 0.6); });
    [outFlow1, outFlow2].forEach(function(el){ el.classList.toggle('on', running && outflow > 0.6); });

    pvTxt.textContent = 'PV ' + level.toFixed(1) + '%';
    outTxt.textContent = 'OUT ' + Math.round(valveInPos) + '%';
    lampRun.classList.toggle('on', running);
    clockTxt.textContent = 't = ' + t.toFixed(1) + ' s';

    var hh = running && level >= s.hh;
    var ll = running && level <= s.ll;
    hhLamp.classList.toggle('on', hh);
    llLamp.classList.toggle('on', ll);

    statPv.textContent = level.toFixed(1) + ' %';
    statErr.textContent = (error >= 0 ? '+' : '') + error.toFixed(1) + ' %';
    statOut.textContent = Math.round(valveInPos) + ' %';
    statBand.textContent = bandTime.toFixed(1) + ' s';

    if (!running) {
      banner.className = 'status-banner neutral';
      bannerText.textContent = t === 0 ? 'Press Start — the loop begins from an empty tank.' : 'Paused.';
    } else if (hh || ll) {
      banner.className = 'status-banner bad';
      bannerText.textContent = hh ? 'HIGH-HIGH level alarm — LAH-101 tripped.' : 'LOW-LOW level alarm — LAL-101 tripped.';
    } else if (Math.abs(error) <= 3) {
      banner.className = 'status-banner ok';
      bannerText.textContent = 'At setpoint, within band.';
    } else {
      banner.className = 'status-banner neutral';
      bannerText.textContent = kickActive ? 'Disturbance active — controller recovering.' : 'Controller adjusting toward setpoint.';
    }
  }

  function loop(){
    var speed = parseFloat(speedInput.value) || 1;
    var dt = 0.3 * speed;
    tick(dt);
  }

  function setRunning(r){
    running = r;
    playBtn.textContent = running ? '\u23F8 Pause' : '\u25B6 Start';
    playBtn.classList.toggle('running', running);
    if (running) {
      if (timer) clearInterval(timer);
      timer = setInterval(loop, 150);
    } else if (timer) {
      clearInterval(timer);
      timer = null;
    }
    render(readSliders(), 0, 0, 0);
  }

  function reset(){
    level = 0; integral = 0; prevError = 0;
    valveInPos = 0; valveOutPos = 0;
    t = 0; bandTime = 0;
    kickActive = false; kickTimer = 0;
    setRunning(false);
  }

  playBtn.addEventListener('click', function(){ setRunning(!running); });
  resetBtn.addEventListener('click', reset);
  kickBtn.addEventListener('click', function(){
    kickActive = true;
    kickTimer = KICK_DURATION;
  });

  // reduced-motion: still fully functional, just relies on CSS media query to drop decorative animation
  render(readSliders(), 0, 0, 0);
})();
