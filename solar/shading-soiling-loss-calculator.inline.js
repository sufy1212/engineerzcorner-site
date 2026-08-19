(function(){
  function el(id){ return document.getElementById(id); }
  function val(id){ var e=el(id); return e?e.value:null; }
  function num(id){ var e=el(id); return e?parseFloat(e.value):NaN; }
  function setText(id, html){ var e=el(id); if(e) e.innerHTML=html; }
  function pct(v){ return isFinite(v) ? (v*100).toFixed(1) : "0"; }
  function money(v){ return isFinite(v) ? "$"+v.toLocaleString(void 0,{maximumFractionDigits:0}) : "$0"; }

  var SHADING_BASE = { none:0.02, light:0.07, moderate:0.15, heavy:0.28 };
  var SHADING_TIME_MULT = { morning:0.75, midday:1.15, afternoon:0.8, allday:1.0 };
  var SOILING_BASE = { clean:0.01, suburban:0.03, dusty:0.07, industrial:0.12 };
  var CLEANING_MULT = { never:1.0, annual:0.75, quarterly:0.5, monthly:0.25 };

  function calc(){
    var shadingKey=val("ssShading"), timeKey=val("ssShadingTime"),
        envKey=val("ssEnv"), cleanKey=val("ssCleaning");

    var shadingLoss = Math.min(0.45, SHADING_BASE[shadingKey] * SHADING_TIME_MULT[timeKey]);
    var soilingLoss = SOILING_BASE[envKey] * CLEANING_MULT[cleanKey];

    setText("ssShadingLoss", pct(shadingLoss) + "<small>%</small>");
    setText("ssSoilingLoss", pct(soilingLoss) + "<small>%</small>");

    var combined = 1 - (1 - shadingLoss) * (1 - soilingLoss);
    setText("ssCombined", pct(combined) + "<small>%</small>");

    var prod = num("ssProd"), rate = num("ssRate");
    if(isFinite(prod) && prod > 0){
      var kwhLost = prod * combined;
      setText("ssKwhLost", kwhLost.toLocaleString(void 0,{maximumFractionDigits:0}) + "<small> kWh/yr</small>");
      if(isFinite(rate) && rate > 0){
        setText("ssValueLost", money(kwhLost * rate) + "<small>/yr</small>");
      } else {
        setText("ssValueLost", "$0<small>/yr</small>");
      }
    } else {
      setText("ssKwhLost", "0<small> kWh/yr</small>");
      setText("ssValueLost", "$0<small>/yr</small>");
    }

    var note = "Combined loss of " + pct(combined) + "% comes from a " + pct(shadingLoss) + "% shading loss and a " +
      pct(soilingLoss) + "% soiling loss stacking multiplicatively. ";
    if(cleanKey === "never" && (envKey === "dusty" || envKey === "industrial")){
      note += "A cleaning schedule would meaningfully cut the soiling share of that loss.";
    } else if(shadingLoss > 0.15){
      note += "Shading is the larger contributor here — trimming or removing the obstruction would help more than cleaning.";
    } else {
      note += "Both factors are relatively modest at these settings.";
    }
    setText("ssNote", note);
  }

  ["ssShading","ssShadingTime","ssEnv","ssCleaning"].forEach(function(id){
    var e = el(id);
    if(e) e.addEventListener("change", calc);
  });
  ["ssProd","ssRate"].forEach(function(id){
    var e = el(id);
    if(e){ e.addEventListener("input", calc); e.addEventListener("change", calc); }
  });
  calc();
})();
