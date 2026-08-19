(function(){
  function el(id){ return document.getElementById(id); }
  function val(id){ var e=el(id); return e?e.value:null; }

  var LABELS = {
    gate:"Gate Valve", globe:"Globe Valve", ball:"Ball Valve", butterfly:"Butterfly Valve",
    check:"Check Valve", plug:"Plug Valve", needle:"Needle Valve", diaphragm:"Diaphragm Valve",
    relief:"Pressure Relief Valve (PRV/PSV)"
  };

  var POOLS = {
    isolation: ["ball","gate","butterfly","plug"],
    throttling: ["globe","needle","butterfly","diaphragm"],
    diverting: ["plug","ball"]
  };

  var FLUID_SCORES = {
    isolation:   { clean:{ball:2,gate:1,butterfly:1}, slurry:{gate:2,plug:1,butterfly:-1,ball:-2}, gas:{ball:2,butterfly:2}, steam:{gate:2,ball:1}, corrosive:{plug:2,ball:1} },
    throttling:  { clean:{globe:2,butterfly:1}, slurry:{diaphragm:3,globe:-2,needle:-2}, gas:{globe:2,butterfly:2}, steam:{globe:3}, corrosive:{diaphragm:2} },
    diverting:   { clean:{ball:2,plug:1}, slurry:{plug:2,ball:-1}, gas:{ball:1,plug:1}, steam:{plug:2}, corrosive:{plug:2} }
  };

  var PRIORITY_SCORES = {
    isolation:   { tight_shutoff:{ball:3,gate:1,plug:1}, precise_throttle:{butterfly:1}, low_dp:{butterfly:3,ball:1}, compact:{butterfly:3,ball:2}, cost:{gate:2,ball:2,butterfly:2,plug:1} },
    throttling:  { tight_shutoff:{globe:1}, precise_throttle:{globe:3,needle:3}, low_dp:{butterfly:3}, compact:{butterfly:2,needle:2}, cost:{butterfly:2,globe:1} },
    diverting:   { tight_shutoff:{ball:2,plug:2}, precise_throttle:{plug:1}, low_dp:{ball:1}, compact:{ball:2}, cost:{ball:1,plug:1} }
  };

  var FLUID_TEXT = { clean:"a clean liquid", slurry:"a liquid with solids or slurry", gas:"gas or vapor", steam:"steam", corrosive:"a corrosive/chemical fluid" };
  var PRIORITY_TEXT = { tight_shutoff:"tight, bubble-tight shutoff", precise_throttle:"precise throttling control", low_dp:"a low pressure drop", compact:"a compact, lightweight valve", cost:"cost and simplicity" };

  function calc(){
    var func = val("vsFunction"), fluid = val("vsFluid"), priority = val("vsPriority");

    if(func === "relief"){
      render("relief", "Pressure relief is a safety function — a spring-loaded or pilot-operated relief valve is the standard answer regardless of fluid or priority, sized to API 520/521 for the actual overpressure scenario.");
      return;
    }
    if(func === "backflow"){
      render("check", "Preventing backflow is what a check valve is for — swing or lift style for clean service, ball or duckbill check if solids are present. No other valve type serves this function directly.");
      return;
    }

    var pool = POOLS[func] || POOLS.isolation;
    var scores = {};
    pool.forEach(function(v){ scores[v] = 0; });

    var fs = (FLUID_SCORES[func] || {})[fluid] || {};
    var ps = (PRIORITY_SCORES[func] || {})[priority] || {};
    pool.forEach(function(v){
      scores[v] += (fs[v] || 0);
      scores[v] += (ps[v] || 0);
    });

    var best = pool[0];
    pool.forEach(function(v){ if(scores[v] > scores[best]) best = v; });

    var funcText = func === "isolation" ? "on/off isolation" : (func === "throttling" ? "throttling / flow control" : "diverting or multi-port mixing");
    var reason = "For " + funcText + " with " + FLUID_TEXT[fluid] + ", prioritizing " + PRIORITY_TEXT[priority] + ", a " + LABELS[best].toLowerCase() + " is the closest fit among the common options for this job.";

    render(best, reason);
  }

  function render(key, reasonText){
    var banner = el("vsBanner"), text = el("vsBannerText"), reason = el("vsReason");
    banner.className = "status-banner ok";
    text.textContent = "Recommended: " + LABELS[key];
    reason.textContent = reasonText;
  }

  ["vsFunction","vsFluid","vsPriority"].forEach(function(id){
    var e = el(id);
    if(e) e.addEventListener("change", calc);
  });
  calc();
})();
