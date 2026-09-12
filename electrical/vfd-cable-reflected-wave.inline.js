(function(){
  function num(id){var e=document.getElementById(id);return e?parseFloat(e.value):NaN}
  function el(id){return document.getElementById(id)}
  function fmt(v,d){return isFinite(v)?v.toFixed(d===void 0?2:d):"\u2014"}
  function setText(id,html){var e=el(id);e&&(e.innerHTML=html)}

  var C = 3e8; // speed of light, m/s (engineering approximation)

  function getRiseNs(){
    var sel = el("vclRise");
    if(!sel) return NaN;
    if(sel.value === "__custom__") return num("vclRiseCustom");
    return parseFloat(sel.value);
  }
  function getVelFactor(){
    var sel = el("vclCableType");
    if(!sel) return NaN;
    if(sel.value === "__custom__") return num("vclVelCustom");
    return parseFloat(sel.value);
  }

  function toggleCustomFields(){
    var riseSel = el("vclRise"), velSel = el("vclCableType");
    el("vclRiseCustomWrap").style.display = (riseSel && riseSel.value === "__custom__") ? "" : "none";
    el("vclVelCustomWrap").style.display = (velSel && velSel.value === "__custom__") ? "" : "none";
  }

  function calcVcl(){
    if(!el("vclVll")) return;
    toggleCustomFields();

    var Vll = num("vclVll");
    var riseNs = getRiseNs();
    var velFactor = getVelFactor();
    var Lm = num("vclLen");

    var errs = 0;
    errs += fieldError(el("vclVll"), (isNaN(Vll)||Vll<=0) ? "Must be greater than 0." : null);
    if(el("vclRise").value === "__custom__"){
      errs += fieldError(el("vclRiseCustom"), (isNaN(riseNs)||riseNs<=0) ? "Must be greater than 0." : null);
    }
    if(el("vclCableType").value === "__custom__"){
      errs += fieldError(el("vclVelCustom"), (isNaN(velFactor)||velFactor<=0||velFactor>1) ? "Must be between 0 and 1." : null);
    }
    errs += fieldError(el("vclLen"), (isNaN(Lm)||Lm<=0) ? "Must be greater than 0." : null);

    if(errs > 0){
      updateValidationBanner("vclValidation", errs);
      setText("vclVpeak","0 <small>V</small>");
      setText("vclLcrit","\u2014");
      setText("vclRatio","\u2014");
      setText("vclVbus","\u2014");
      setText("vclMultiple","\u2014");
      setText("vclNema","\u2014");
      return;
    }

    var trS = riseNs * 1e-9;
    var vP = velFactor * C;
    var LcritM = (vP * trS) / 2;
    var ratio = Lm / LcritM;
    var Vbus = 1.41 * Vll;
    var Vpeak = ratio >= 1 ? (2 * Vbus) : (Vbus * (1 + ratio));
    var multiple = Vpeak / Vll;
    var nemaRef = 3.1 * Vll;

    setText("vclVpeak", Math.round(Vpeak) + " <small>V</small>");
    setText("vclLcrit", fmt(LcritM,2) + " m <small>(" + fmt(LcritM*3.28084,1) + " ft)</small>");
    setText("vclRatio", fmt(ratio,2) + "&times;");
    setText("vclVbus", Math.round(Vbus) + " V");
    setText("vclMultiple", fmt(multiple,2) + "&times; V<sub>LL</sub>");
    setText("vclNema", Math.round(nemaRef) + " V" + (Vpeak >= nemaRef ? " \u2014 estimate meets/exceeds this" : ""));

    var banner = el("vclValidation");
    if(ratio >= 1){
      banner.className = "validation-banner bad";
      banner.innerHTML = '<span class="vdot"></span><span>Cable run is at or beyond the critical length (' + fmt(LcritM,1) + ' m) \u2014 full reflected-wave voltage doubling is expected at the motor terminals (\u2248' + fmt(multiple,2) + '\u00d7 rated V_LL). Consider a dV/dt or sine-wave output filter, an inverter-duty motor, or shortening the run.</span>';
    } else if(ratio >= 0.5){
      banner.className = "validation-banner neutral";
      banner.innerHTML = '<span class="vdot"></span><span>Cable run is ' + fmt(ratio*100,0) + '% of the critical length \u2014 peak voltage is rising toward the \u22482\u00d7 bus-voltage plateau. Worth checking against the drive manufacturer\u2019s cable-length table.</span>';
    } else {
      banner.className = "validation-banner ok";
      banner.innerHTML = '<span class="vdot"></span><span>Cable run is well below the critical length \u2014 reflected-wave overvoltage risk is low for this drive/cable combination.</span>';
    }
  }

  ["vclVll","vclRise","vclRiseCustom","vclCableType","vclVelCustom","vclLen"].forEach(function(id){
    var e = el(id);
    if(e){
      e.addEventListener("input", calcVcl);
      e.addEventListener("change", calcVcl);
    }
  });
  calcVcl();
})();
