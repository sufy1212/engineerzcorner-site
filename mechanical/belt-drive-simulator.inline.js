(function(){
  "use strict";
  var $ = function(id){ return document.getElementById(id); };

  var driverG = $('bdsDriver'), drivenG = $('bdsDriven');
  var driverRim = $('bdsDriverRim'), drivenRim = $('bdsDrivenRim');
  var driverSpokes = $('bdsDriverSpokes'), drivenSpokes = $('bdsDrivenSpokes');
  var beltTop = $('bdsBeltTop'), beltBot = $('bdsBeltBot');
  var n1Txt = $('bdsN1Txt'), n2Txt = $('bdsN2Txt');
  var slipLamp = $('bdsSlipLamp');
  var playBtn = $('bdsPlayBtn'), resetBtn = $('bdsResetBtn'), crossedBox = $('bdsCrossed');

  var d1Input = $('bdsD1'), d2Input = $('bdsD2'), n1Input = $('bdsN1'), loadInput = $('bdsLoad'), capInput = $('bdsCap');
  var d1Val = $('bdsD1Val'), d2Val = $('bdsD2Val'), n1Val = $('bdsN1Val'), loadVal = $('bdsLoadVal'), capVal = $('bdsCapVal');

  var statRatio = $('bdsStatRatio'), statIdeal = $('bdsStatIdeal'), statActual = $('bdsStatActual'), statBeltSpeed = $('bdsStatBeltSpeed');
  var banner = $('bdsBanner'), bannerText = $('bdsBannerText');

  var CX1 = 150, CX2 = 420, CY = 160;
  var DEFAULTS = { d1: 150, d2: 100, n1: 300, load: 20, cap: 70 };
  var running = false;

  function clamp(v,lo,hi){ return Math.max(lo, Math.min(hi, v)); }
  function scaleR(d){ return clamp(d/6, 16, 55); }

  function setSpokes(group, r){
    var lines = group.querySelectorAll('line');
    var angles = [-90, 30, 150]; // degrees, matches original drawing
    var len = r * 0.84;
    for (var i=0;i<lines.length;i++){
      var rad = angles[i] * Math.PI/180;
      lines[i].setAttribute('x2', (len*Math.cos(rad)).toFixed(1));
      lines[i].setAttribute('y2', (len*Math.sin(rad)).toFixed(1));
    }
  }

  function update(){
    var d1 = parseFloat(d1Input.value), d2 = parseFloat(d2Input.value);
    var n1 = parseFloat(n1Input.value), load = parseFloat(loadInput.value), cap = parseFloat(capInput.value);
    var crossed = crossedBox.checked;

    d1Val.textContent = d1 + ' mm';
    d2Val.textContent = d2 + ' mm';
    n1Val.textContent = n1 + ' RPM';
    loadVal.textContent = load + ' Nm';
    capVal.textContent = cap + ' Nm';

    var r1 = scaleR(d1), r2 = scaleR(d2);
    driverRim.setAttribute('r', r1);
    drivenRim.setAttribute('r', r2);
    setSpokes(driverSpokes, r1);
    setSpokes(drivenSpokes, r2);

    if (crossed) {
      beltTop.setAttribute('x1', CX1); beltTop.setAttribute('y1', CY - r1);
      beltTop.setAttribute('x2', CX2); beltTop.setAttribute('y2', CY + r2);
      beltBot.setAttribute('x1', CX1); beltBot.setAttribute('y1', CY + r1);
      beltBot.setAttribute('x2', CX2); beltBot.setAttribute('y2', CY - r2);
    } else {
      beltTop.setAttribute('x1', CX1); beltTop.setAttribute('y1', CY - r1);
      beltTop.setAttribute('x2', CX2); beltTop.setAttribute('y2', CY - r2);
      beltBot.setAttribute('x1', CX1); beltBot.setAttribute('y1', CY + r1);
      beltBot.setAttribute('x2', CX2); beltBot.setAttribute('y2', CY + r2);
    }

    var idealN2 = d2 > 0 ? n1 * (d1/d2) : 0;
    var slipping = load > cap && cap > 0;
    var slipFrac = slipping ? clamp((load-cap)/cap, 0, 1) : 0;
    var actualN2 = idealN2 * (1 - slipFrac*0.6);

    var beltSpeed = Math.PI * d1 * n1 / 60 / 1000; // m/s

    n1Txt.textContent = Math.round(n1) + ' RPM';
    n2Txt.textContent = Math.round(actualN2) + ' RPM';
    statRatio.textContent = (d1/Math.max(d2,1)).toFixed(2) + ' : 1';
    statIdeal.textContent = Math.round(idealN2) + ' RPM';
    statActual.textContent = Math.round(actualN2) + ' RPM';
    statBeltSpeed.textContent = beltSpeed.toFixed(2) + ' m/s';

    slipLamp.classList.toggle('on', running && slipping);

    // spin animation durations, scaled for on-screen visibility
    var dur1 = n1 > 0 ? clamp(60/(n1/8), 0.2, 8) : 0;
    var dur2 = actualN2 > 0 ? clamp(60/(Math.abs(actualN2)/8), 0.2, 8) : 0;
    driverG.style.animationDuration = dur1 + 's';
    drivenG.style.animationDuration = dur2 + 's';
    driverG.classList.toggle('spin', running && n1 > 0);
    drivenG.classList.toggle('spin', running && actualN2 !== 0);
    drivenG.classList.toggle('rev', crossed);
    drivenG.classList.toggle('slipping', running && slipping);
    [beltTop, beltBot].forEach(function(el){ el.classList.toggle('on', running && n1 > 0); });

    if (!running) {
      banner.className = 'status-banner neutral';
      bannerText.textContent = 'Press Start to spin up the drive.';
    } else if (slipping) {
      banner.className = 'status-banner bad';
      bannerText.textContent = 'Belt slipping — load (' + load + ' Nm) exceeds belt capacity (' + cap + ' Nm).';
    } else {
      banner.className = 'status-banner ok';
      bannerText.textContent = 'Running clean — driven pulley tracking the ideal ratio.';
    }
  }

  [d1Input, d2Input, n1Input, loadInput, capInput, crossedBox].forEach(function(el){
    el.addEventListener('input', update);
  });

  playBtn.addEventListener('click', function(){
    running = !running;
    playBtn.textContent = running ? '\u23F8 Pause' : '\u25B6 Start';
    playBtn.classList.toggle('running', running);
    update();
  });

  resetBtn.addEventListener('click', function(){
    d1Input.value = DEFAULTS.d1; d2Input.value = DEFAULTS.d2; n1Input.value = DEFAULTS.n1;
    loadInput.value = DEFAULTS.load; capInput.value = DEFAULTS.cap; crossedBox.checked = false;
    running = false;
    playBtn.textContent = '\u25B6 Start';
    playBtn.classList.remove('running');
    update();
  });

  update();
})();
