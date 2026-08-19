(function(){
  function el(id){ return document.getElementById(id); }
  function val(id){ var e=el(id); return e?e.value:null; }

  var CATEGORIES = {
    temperature: {
      labelA: "Approximate temperature range",
      optionsA: [["low","Below 200°C"],["mid","200–600°C"],["high","Above 600°C"]],
      labelB: "Accuracy requirement",
      optionsB: [["standard","Standard process accuracy"],["high","High accuracy / repeatability"]],
      resolve: function(a,b){
        if(a==="high") return ["tc_hi", "Above 600°C is beyond what an RTD or base-metal thermocouple can reliably survive — a Type R/S/B thermocouple is the standard choice."];
        if(a==="low") return b==="high" ? ["rtd","Below 200°C with high accuracy called for, an RTD (PT100) gives the best stability and repeatability."] : ["thermistor","Below 200°C with standard accuracy, a thermistor is the cheapest, most sensitive option for this range."];
        return b==="high" ? ["rtd","200–600°C with high accuracy called for, a high-temperature RTD (PT100) still outperforms a thermocouple on stability."] : ["tc_k","200–600°C with standard accuracy, a Type K thermocouple is the rugged, cost-effective default."];
      },
      table: [
        {name:"RTD (PT100)", best:"Low-to-moderate temperature, high accuracy and stability", limit:"More expensive; slower response than a thermocouple"},
        {name:"Thermocouple (Type K)", best:"Wide range, rugged, general-purpose mid-to-high temperature", limit:"Less accurate and less stable long-term than an RTD"},
        {name:"Thermocouple (Type R/S/B)", best:"Very high temperature service", limit:"Expensive; lower accuracy at low temperatures"},
        {name:"Thermistor", best:"Low temperature, high sensitivity, low cost", limit:"Narrow range and non-linear response"}
      ]
    },
    pressure: {
      labelA: "Pressure range",
      optionsA: [["vacuum","Vacuum / low (< 10 bar)"],["medium","Medium (10–100 bar)"],["high","High (> 100 bar)"]],
      labelB: "Fluid condition",
      optionsB: [["clean","Clean process fluid"],["corrosive","Corrosive, viscous or particulate-laden"]],
      resolve: function(a,b){
        if(b==="corrosive") return ["pt_diaphragm","With a corrosive, viscous or particulate-laden fluid, a diaphragm seal isolates the sensing element from direct contact regardless of pressure range."];
        return ["pt_std","For a clean process fluid, a standard strain-gauge or piezoresistive pressure transmitter covers this pressure range without a seal."];
      },
      table: [
        {name:"Pressure Transmitter (strain-gauge/piezoresistive)", best:"Clean process fluids across most pressure ranges", limit:"Sensing element is in direct contact with the process"},
        {name:"Diaphragm-Seal Pressure Transmitter", best:"Corrosive, viscous or particulate-laden fluids", limit:"Fill-fluid temperature limits and added response lag"}
      ]
    },
    level: {
      labelA: "Measurement type",
      optionsA: [["continuous","Continuous level"],["point","Point level (high/low switch)"]],
      labelB: "Fluid / vessel condition",
      optionsB: [["clean_open","Clean liquid, open/vented tank"],["clean_closed","Clean liquid, closed/pressurized tank"],["slurry","Solids, slurry or high dust"],["turbulent","Turbulent, foaming or vapor-filled"],["interface","Interface between two liquids"]],
      resolve: function(a,b){
        if(a==="point") return ["float_switch","A point-level measurement (just a high/low alarm or pump control) is exactly what a float or vibrating fork switch is built for — no need for a continuous transmitter."];
        if(b==="slurry" || b==="interface") return ["gwr_lvl", (b==="slurry"?"Solids or high dust":"A liquid/liquid interface")+" is a good match for guided wave radar — the contact probe handles it far better than a non-contact technology."];
        if(b==="turbulent") return ["dp_lvl","A turbulent, foaming or vapor-filled vessel is exactly the case where a differential pressure transmitter's simplicity is an advantage over line-of-sight technologies."];
        if(b==="clean_closed") return ["radar_lvl","A closed or pressurized tank with a clean liquid suits non-contact radar — it isn't affected by the internal pressure the way some other technologies are."];
        return ["ultrasonic_lvl","A clean liquid in an open or vented tank with a calm surface is the classic case for a non-contact ultrasonic level transmitter."];
      },
      table: [
        {name:"Ultrasonic Level Transmitter", best:"Open/vented tanks, clean liquid, calm surface", limit:"Affected by vapor, foam and turbulence"},
        {name:"Radar Level Transmitter (Non-Contact)", best:"Closed/pressurized tanks, clean liquid", limit:"Higher cost than ultrasonic for simple applications"},
        {name:"Guided Wave Radar", best:"Solids, slurries, foam, liquid/liquid interfaces", limit:"Probe can foul or coat in some services"},
        {name:"Differential Pressure (DP) Transmitter", best:"Turbulent, foaming or vapor-filled vessels", limit:"Needs density compensation; wet-leg/dry-leg setup"},
        {name:"Float / Vibrating Fork Switch", best:"Simple point-level alarm or pump control", limit:"Point measurement only, not continuous"}
      ]
    },
    flow: {
      labelA: "Fluid type",
      optionsA: [["clean","Clean liquid"],["slurry","Dirty liquid / slurry"],["gas_steam","Gas or steam"]],
      labelB: "Accuracy requirement",
      optionsB: [["standard","Standard process accuracy"],["high","High accuracy / custody transfer"]],
      resolve: function(a,b){
        if(a==="slurry") return ["mag_flow","A dirty liquid or slurry is the classic case for a magnetic flow meter — no obstruction in the flow path to foul or erode, as long as the fluid is conductive."];
        if(a==="gas_steam") return b==="high" ? ["ultrasonic_flow","High-accuracy gas or steam measurement is best served by ultrasonic or Coriolis technology, both non-intrusive and highly repeatable."] : ["orifice_flow","Standard-accuracy gas or steam flow is well covered by an orifice plate or vortex meter — simple, well-understood and inexpensive."];
        return b==="high" ? ["coriolis_flow","High-accuracy clean-liquid measurement, especially for custody transfer, is what Coriolis meters are built for — they measure mass flow directly."] : ["orifice_flow","Standard-accuracy clean-liquid flow is a straightforward fit for an orifice plate or vortex meter."];
      },
      table: [
        {name:"Orifice Plate / Vortex Meter", best:"Standard-accuracy liquid, gas or steam flow", limit:"Permanent pressure loss; orifice needs periodic inspection"},
        {name:"Coriolis Flow Meter", best:"Highest accuracy; direct mass flow measurement", limit:"Higher cost; size/weight can be a constraint on large lines"},
        {name:"Magnetic Flow Meter (Magmeter)", best:"Dirty liquids and slurries, no obstruction", limit:"Requires a conductive fluid — won't work on gas or hydrocarbons"},
        {name:"Ultrasonic / Coriolis Flow Meter", best:"High-accuracy, non-intrusive gas or steam measurement", limit:"Higher cost than orifice/vortex; installation care needed"}
      ]
    }
  };

  function populateSelect(select, options){
    select.innerHTML = "";
    options.forEach(function(o){
      var opt = document.createElement("option");
      opt.value = o[0];
      opt.textContent = o[1];
      select.appendChild(opt);
    });
  }

  function renderTable(rows){
    var body = el("isCmpBody");
    body.innerHTML = "";
    rows.forEach(function(r){
      var tr = document.createElement("tr");
      var td1 = document.createElement("td"); td1.textContent = r.name;
      var td2 = document.createElement("td"); td2.textContent = r.best;
      var td3 = document.createElement("td"); td3.textContent = r.limit;
      tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
      body.appendChild(tr);
    });
  }

  function setupCategory(){
    var cat = CATEGORIES[val("isType")];
    el("isLabelA").textContent = cat.labelA;
    el("isLabelB").textContent = cat.labelB;
    populateSelect(el("isFieldA"), cat.optionsA);
    populateSelect(el("isFieldB"), cat.optionsB);
    renderTable(cat.table);
    calc();
  }

  function calc(){
    var cat = CATEGORIES[val("isType")];
    var result = cat.resolve(val("isFieldA"), val("isFieldB"));
    var key = result[0], reasonText = result[1];
    var name = null;
    cat.table.forEach(function(r){ /* no-op, names resolved below */ });
    var NAME_MAP = {
      rtd:"RTD (PT100)", thermistor:"Thermistor", tc_k:"Thermocouple (Type K)", tc_hi:"Thermocouple (Type R/S/B)",
      pt_std:"Pressure Transmitter (strain-gauge/piezoresistive)", pt_diaphragm:"Diaphragm-Seal Pressure Transmitter",
      float_switch:"Float / Vibrating Fork Level Switch", ultrasonic_lvl:"Ultrasonic Level Transmitter",
      radar_lvl:"Radar Level Transmitter (Non-Contact)", gwr_lvl:"Guided Wave Radar Level Transmitter",
      dp_lvl:"Differential Pressure (DP) Level Transmitter", orifice_flow:"Orifice Plate / Vortex Flow Meter",
      coriolis_flow:"Coriolis Flow Meter", mag_flow:"Magnetic Flow Meter (Magmeter)", ultrasonic_flow:"Ultrasonic / Coriolis Flow Meter"
    };
    name = NAME_MAP[key] || key;
    el("isBannerText").textContent = "Recommended: " + name;
    el("isReason").textContent = reasonText;
  }

  el("isType").addEventListener("change", setupCategory);
  el("isFieldA").addEventListener("change", calc);
  el("isFieldB").addEventListener("change", calc);

  setupCategory();
})();
