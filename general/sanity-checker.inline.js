(function(){
  // Each preset: canonical unit is what range[] is expressed in.
  // units: { label: factorToCanonical }
  var PRESETS = [
    {
      id: 'stress-steel', group: 'Structural', label: 'Bending/axial stress — structural steel',
      canonical: 'MPa', range: [10, 250],
      note: 'Typical working stress in mild/structural steel members. Mild steel yields around 250 MPa, so values well above that are usually a units mix-up, not a valid design stress.',
      units: { 'MPa': 1, 'kPa': 0.001, 'Pa': 0.000001, 'N/mm²': 1, 'psi': 0.00689476, 'ksi': 6.89476 }
    },
    {
      id: 'strength-concrete', group: 'Structural', label: 'Compressive strength — concrete',
      canonical: 'MPa', range: [15, 80],
      note: 'Covers common structural concrete grades (roughly M15–M80 / equivalent). Ultra-high-performance mixes can exceed this, but check the number twice first.',
      units: { 'MPa': 1, 'kPa': 0.001, 'psi': 0.00689476, 'ksi': 6.89476 }
    },
    {
      id: 'torque-bolt', group: 'Structural', label: 'Bolted joint tightening torque (M8–M24 range)',
      canonical: 'N·m', range: [5, 500],
      note: 'Rough band for common structural/machine bolts from M8 up to M24. Always use the actual torque spec for the bolt grade and application — this only flags an implausible order of magnitude.',
      units: { 'N·m': 1, 'kN·m': 1000, 'lb-ft': 1.35582, 'lb-in': 0.112985 }
    },
    {
      id: 'pressure-hydraulic', group: 'Mechanical/Process', label: 'Water/hydraulic system pressure',
      canonical: 'bar', range: [1, 25],
      note: 'Typical range for building water services and light hydraulic circuits. Heavy industrial hydraulics can run far higher — this preset is aimed at everyday plumbing/process pressure, not high-pressure hydraulic power packs.',
      units: { 'bar': 1, 'kPa': 0.01, 'MPa': 10, 'psi': 0.0689476, 'atm': 1.01325 }
    },
    {
      id: 'pressure-air', group: 'Mechanical/Process', label: 'Compressed air system pressure',
      canonical: 'bar', range: [3, 10],
      note: 'Typical working range for shop/plant compressed air systems.',
      units: { 'bar': 1, 'kPa': 0.01, 'MPa': 10, 'psi': 0.0689476 }
    },
    {
      id: 'pump-head', group: 'Mechanical/Process', label: 'Centrifugal pump head',
      canonical: 'm', range: [5, 150],
      note: 'Typical duty head for common industrial/building-services pumps. High-rise or multistage booster pumps can exceed this.',
      units: { 'm': 1, 'ft': 0.3048, 'kPa (of water)': 0.101972, 'bar (of water)': 10.1972 }
    },
    {
      id: 'duct-pressure', group: 'HVAC', label: 'Duct/fan static pressure',
      canonical: 'Pa', range: [100, 2500],
      note: 'Typical total static pressure for ducted air distribution systems, small residential up to larger commercial AHUs.',
      units: { 'Pa': 1, 'kPa': 1000, 'in. w.g.': 249.089, 'mm w.g.': 9.80665 }
    },
    {
      id: 'chw-temp', group: 'HVAC', label: 'Chilled water supply temperature',
      canonical: '°C', range: [4, 10],
      note: 'Typical chilled-water supply temperature for comfort cooling systems. Process cooling can run colder — this preset targets standard building HVAC.',
      units: { '°C': 1 }
    },
    {
      id: 'voltage-lv', group: 'Electrical', label: 'Low-voltage distribution voltage',
      canonical: 'V', range: [110, 690],
      note: 'Covers common single/three-phase LV distribution voltages worldwide (110–690 V class). Anything far outside this on an LV system usually points to a decimal or unit slip.',
      units: { 'V': 1, 'kV': 1000, 'mV': 0.001 }
    },
    {
      id: 'voltage-mv', group: 'Electrical', label: 'Medium-voltage distribution voltage',
      canonical: 'kV', range: [3.3, 33],
      note: 'Typical MV distribution class (3.3–33 kV). Transmission-level voltages run much higher and are outside this preset.',
      units: { 'kV': 1, 'V': 0.001, 'MV': 1000 }
    },
    {
      id: 'motor-current', group: 'Electrical', label: 'Motor full-load current — small/medium industrial motor',
      canonical: 'A', range: [1, 200],
      note: 'Rough band for common LV industrial motors (roughly 0.5–100 kW class). Large motors or MV drives will read higher.',
      units: { 'A': 1, 'mA': 0.001, 'kA': 1000 }
    },
    {
      id: 'cable-ampacity', group: 'Electrical', label: 'LV feeder cable ampacity (current rating)',
      canonical: 'A', range: [10, 400],
      note: 'Typical current-carrying capacity range for common LV building/industrial feeder cables before derating.',
      units: { 'A': 1, 'kA': 1000 }
    },
    {
      id: 'pv-string-voltage', group: 'Solar', label: 'PV string open-circuit voltage (Voc)',
      canonical: 'V', range: [300, 1000],
      note: 'Typical string Voc range for common residential/commercial rooftop PV strings feeding a standard inverter.',
      units: { 'V': 1, 'kV': 1000 }
    },
    {
      id: 'motor-speed', group: 'Mechanical/Process', label: 'AC induction motor synchronous speed',
      canonical: 'rpm', range: [750, 3000],
      note: 'Covers standard 2-pole through 8-pole induction motors at 50/60 Hz. Slower geared/pole-count motors fall outside this band.',
      units: { 'rpm': 1, 'rad/s': 9.5493 }
    }
  ];

  var SLIP_FACTORS = [
    { f: 1000, label: '×1000 (e.g. you may have entered N instead of kN, or Pa instead of kPa)' },
    { f: 0.001, label: '÷1000 (e.g. you may have entered kN instead of N, or kPa instead of Pa)' },
    { f: 1000000, label: '×1,000,000 (e.g. Pa instead of MPa)' },
    { f: 0.000001, label: '÷1,000,000 (e.g. MPa instead of Pa)' },
    { f: 10, label: '×10' },
    { f: 0.1, label: '÷10' },
    { f: 6.89476, label: '×6.89 (psi read as if it were kPa)' },
    { f: 0.145038, label: '÷6.89 (kPa read as if it were psi)' }
  ];

  function el(id){ return document.getElementById(id); }
  function fmt(n){
    if(!isFinite(n)) return '—';
    var abs = Math.abs(n);
    var d = abs !== 0 && abs < 1 ? 4 : (abs < 100 ? 2 : 0);
    return n.toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits:d});
  }

  var typeSel = el('scType');
  var unitSel = el('scUnit');
  var valueInput = el('scValue');

  if(!typeSel) return;

  var groups = {};
  PRESETS.forEach(function(p){
    if(!groups[p.group]) groups[p.group] = [];
    groups[p.group].push(p);
  });
  Object.keys(groups).forEach(function(g){
    var og = document.createElement('optgroup');
    og.label = g;
    groups[g].forEach(function(p){
      var opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.label;
      og.appendChild(opt);
    });
    typeSel.appendChild(og);
  });

  function currentPreset(){
    var id = typeSel.value;
    for(var i=0;i<PRESETS.length;i++){ if(PRESETS[i].id === id) return PRESETS[i]; }
    return PRESETS[0];
  }

  function populateUnits(preset){
    unitSel.innerHTML = '';
    Object.keys(preset.units).forEach(function(u){
      var opt = document.createElement('option');
      opt.value = u;
      opt.textContent = u;
      if(u === preset.canonical) opt.selected = true;
      unitSel.appendChild(opt);
    });
  }

  function setBanner(state, text){
    var b = el('scBanner');
    b.className = 'status-banner ' + state;
    el('scBannerText').textContent = text;
  }

  function evaluate(){
    var preset = currentPreset();
    el('scTypeHint').textContent = preset.note;
    el('scRangeNote').innerHTML = '<b>Typical range:</b> ' + fmt(preset.range[0]) + '–' + fmt(preset.range[1]) + ' ' + preset.canonical + ' (' + preset.group + ')';

    var raw = parseFloat(valueInput.value);
    var unit = unitSel.value;
    var factor = preset.units[unit];

    if(isNaN(raw) || factor === undefined){
      el('scConverted').textContent = '—';
      setBanner('neutral', 'Enter a value to check it.');
      el('scSuggestion').textContent = '';
      return;
    }

    var converted = raw * factor;
    el('scConverted').textContent = fmt(converted) + ' ' + preset.canonical;

    var lo = preset.range[0], hi = preset.range[1];
    if(converted >= lo && converted <= hi){
      setBanner('ok', 'Looks reasonable — within the typical range for ' + preset.label.toLowerCase() + '.');
      el('scSuggestion').textContent = '';
      return;
    }

    // Out of range — look for a plausible unit-slip that would land it in range.
    var match = null;
    for(var i=0;i<SLIP_FACTORS.length;i++){
      var candidate = converted * SLIP_FACTORS[i].f;
      if(candidate >= lo && candidate <= hi){ match = SLIP_FACTORS[i]; break; }
    }

    var severity = (converted > hi * 50 || (converted > 0 && converted < lo / 50)) ? 'bad' : 'bad';
    setBanner(severity, 'Outside the typical range — worth double-checking before you trust this number.');

    if(match){
      el('scSuggestion').innerHTML = 'Possible cause: a <b>' + match.label + '</b> unit slip. If that\'s what happened, the intended value would land back in the typical range.';
    } else {
      el('scSuggestion').innerHTML = 'No obvious unit-slip explains this — it may be a genuine outlier for this context, a different scenario entirely, or an unrelated data-entry error. Worth a second look either way.';
    }
  }

  typeSel.addEventListener('change', function(){
    populateUnits(currentPreset());
    evaluate();
  });
  unitSel.addEventListener('change', evaluate);
  valueInput.addEventListener('input', evaluate);

  populateUnits(currentPreset());
  evaluate();
})();
