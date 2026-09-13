(function(){
  function el(id){ return document.getElementById(id); }
  function num(v){ var n = parseFloat(v); return isNaN(n) ? 0 : n; }
  function fmt(n,d){ if(!isFinite(n)) return '0'; return n.toLocaleString('en-US',{minimumFractionDigits:d===undefined?0:d,maximumFractionDigits:d===undefined?0:d}); }

  var rowSeq = 0;

  var PANEL_TYPES = {
    '3p208': { label: '3-Phase 4-Wire, 208Y/120V', phases: 3, vll: 208, vln: 120, phaseOpts: ['A','B','C','AB','BC','CA','ABC'] },
    '3p480': { label: '3-Phase 4-Wire, 480Y/277V', phases: 3, vll: 480, vln: 277, phaseOpts: ['A','B','C','AB','BC','CA','ABC'] },
    '3p240d': { label: '3-Phase 3-Wire, 240V Delta', phases: 3, vll: 240, vln: 138.6, phaseOpts: ['A','B','C','AB','BC','CA','ABC'] },
    '1p240': { label: '1-Phase 3-Wire, 120/240V (split-phase)', phases: 1, vll: 240, vln: 120, phaseOpts: ['A','B','AB'] }
  };

  function legsFor(phaseStr){
    // returns array of legs ('A','B','C') this circuit's load is split across
    return phaseStr.split('');
  }

  function addRow(ckt, desc, breaker, phase, load){
    rowSeq++;
    var id = 'psbRow' + rowSeq;
    var tbody = el('psbTbody');
    var tr = document.createElement('tr');
    tr.id = id;
    var type = PANEL_TYPES[el('psbType').value];
    var opts = type.phaseOpts.map(function(p){
      return '<option value="'+p+'"'+(p===phase?' selected':'')+'>'+p+'</option>';
    }).join('');
    tr.innerHTML =
      '<td><input type="text" class="psb-ckt" value="'+(ckt||'')+'" style="width:50px;"></td>'+
      '<td><input type="text" class="psb-desc" value="'+(desc||'')+'" style="width:100%;"></td>'+
      '<td><input type="number" class="psb-breaker" value="'+(breaker!==undefined?breaker:20)+'" min="0" step="1" style="width:70px;"></td>'+
      '<td><select class="psb-phase">'+opts+'</select></td>'+
      '<td><input type="number" class="psb-load" value="'+(load!==undefined?load:0)+'" min="0" step="10" style="width:90px;"></td>'+
      '<td><button type="button" class="pm-rm" aria-label="Remove circuit">&times;</button></td>';
    tbody.appendChild(tr);

    tr.querySelectorAll('input,select').forEach(function(inp){
      inp.addEventListener('input', calc);
      inp.addEventListener('change', calc);
    });
    tr.querySelector('.pm-rm').addEventListener('click', function(){
      tr.remove();
      calc();
    });
  }

  function refreshPhaseOptions(){
    var type = PANEL_TYPES[el('psbType').value];
    document.querySelectorAll('#psbTbody tr').forEach(function(tr){
      var sel = tr.querySelector('.psb-phase');
      var current = sel.value;
      var opts = type.phaseOpts.map(function(p){
        return '<option value="'+p+'"'+(p===current?' selected':'')+'>'+p+'</option>';
      }).join('');
      sel.innerHTML = opts;
      if(sel.value !== current){ /* fell back to first option because current no longer valid */ }
    });
  }

  function calc(){
    if(!el('psbTbody')) return;
    var type = PANEL_TYPES[el('psbType').value];
    var mainA = num(el('psbMain').value);

    var totals = { A: 0, B: 0, C: 0 };
    var totalVA = 0;

    document.querySelectorAll('#psbTbody tr').forEach(function(tr){
      var loadVA = num(tr.querySelector('.psb-load').value);
      var phase = tr.querySelector('.psb-phase').value;
      var legs = legsFor(phase);
      var perLeg = legs.length ? loadVA / legs.length : 0;
      legs.forEach(function(leg){
        if(totals.hasOwnProperty(leg)) totals[leg] += perLeg;
      });
      totalVA += loadVA;
    });

    var activePhases = type.phases === 1 ? ['A','B'] : ['A','B','C'];
    var vals = activePhases.map(function(p){ return totals[p]; });
    var maxP = Math.max.apply(null, vals);
    var minP = Math.min.apply(null, vals);
    var avgP = vals.reduce(function(a,b){return a+b;},0) / vals.length;
    var imbalance = avgP > 0 ? ((maxP - minP) / avgP) * 100 : 0;

    var totalAmps;
    if(type.phases === 3){
      totalAmps = totalVA / (Math.sqrt(3) * type.vll);
    } else {
      totalAmps = maxP / 120; // worst-case leg on a split-phase panel
    }
    var loadingPct = mainA > 0 ? (totalAmps / mainA) * 100 : 0;

    el('psbTotalVA').innerHTML = fmt(totalVA,0) + ' <small>VA</small>';
    el('psbPhaseA').textContent = fmt(totals.A,0) + ' VA';
    el('psbPhaseB').textContent = fmt(totals.B,0) + ' VA';
    if(type.phases === 3){
      el('psbPhaseC').textContent = fmt(totals.C,0) + ' VA';
      el('psbPhaseC').parentElement.style.display = '';
    } else {
      el('psbPhaseC').textContent = 'n/a (1-phase)';
    }
    el('psbImbalance').textContent = fmt(imbalance,1) + '%';
    el('psbTotalAmps').textContent = fmt(totalAmps,1) + ' A';
    el('psbLoading').textContent = fmt(loadingPct,1) + '%';

    var banner = el('psbValidation');
    if(mainA <= 0){
      banner.className = 'validation-banner bad';
      banner.innerHTML = '<span class="vdot"></span><span>Enter the main breaker/bus rating to check panel loading.</span>';
    } else if(loadingPct >= 100){
      banner.className = 'validation-banner bad';
      banner.innerHTML = '<span class="vdot"></span><span>Connected load exceeds the main rating ('+fmt(loadingPct,0)+'%) — this schedule will not fit on this panel as configured.</span>';
    } else if(imbalance > 10){
      banner.className = 'validation-banner neutral';
      banner.innerHTML = '<span class="vdot"></span><span>Phase imbalance is '+fmt(imbalance,1)+'% — consider moving a circuit or two to rebalance the phases.</span>';
    } else {
      banner.className = 'validation-banner ok';
      banner.innerHTML = '<span class="vdot"></span><span>Connected load is '+fmt(loadingPct,0)+'% of the main rating with phases reasonably balanced.</span>';
    }
  }

  function generateText(){
    var type = PANEL_TYPES[el('psbType').value];
    var name = el('psbName').value || 'PANEL';
    var mainA = el('psbMain').value;
    var lines = [];
    lines.push(name);
    lines.push(type.label + '  |  Main/Bus: ' + mainA + 'A');
    lines.push('');
    lines.push('CKT  DESCRIPTION                  BKR(A)  PHASE  LOAD(VA)');
    lines.push('---  ---------------------------  ------  -----  --------');
    document.querySelectorAll('#psbTbody tr').forEach(function(tr){
      var ckt = tr.querySelector('.psb-ckt').value || '-';
      var desc = tr.querySelector('.psb-desc').value || '';
      var bkr = tr.querySelector('.psb-breaker').value || '0';
      var ph = tr.querySelector('.psb-phase').value;
      var ld = tr.querySelector('.psb-load').value || '0';
      lines.push(
        (ckt+'').padEnd(5) + (desc+'').slice(0,27).padEnd(29) + (bkr+'').padEnd(8) + (ph+'').padEnd(7) + ld
      );
    });
    lines.push('');
    lines.push('Total connected load: ' + el('psbTotalVA').textContent.replace(/<[^>]+>/g,''));
    lines.push('Phase A: ' + el('psbPhaseA').textContent + '   Phase B: ' + el('psbPhaseB').textContent + '   Phase C: ' + el('psbPhaseC').textContent);
    lines.push('Phase imbalance: ' + el('psbImbalance').textContent + '   Est. total current: ' + el('psbTotalAmps').textContent + '   Panel loading: ' + el('psbLoading').textContent);
    el('psbOutput').value = lines.join('\n');
  }

  el('psbAddBtn').addEventListener('click', function(){ addRow('', '', 20, 'A', 0); calc(); });
  el('psbType').addEventListener('change', function(){ refreshPhaseOptions(); calc(); });
  el('psbMain').addEventListener('input', calc);
  el('psbGenBtn').addEventListener('click', generateText);
  el('psbCopyBtn').addEventListener('click', function(){
    var ta = el('psbOutput');
    if(!ta.value){ generateText(); }
    ta.select();
    try {
      document.execCommand('copy');
      el('psbCopyStatus').textContent = 'Copied!';
    } catch(e){
      el('psbCopyStatus').textContent = 'Select the text and copy manually.';
    }
    setTimeout(function(){ el('psbCopyStatus').textContent = ''; }, 2500);
  });

  // seed with a few starter rows
  addRow('1', 'Lighting - Office Area', 20, 'A', 1200);
  addRow('2', 'Receptacles - Office Area', 20, 'B', 1500);
  addRow('3', 'HVAC Unit', 30, 'ABC', 6000);
  addRow('4', '', 20, 'C', 0);
  calc();
})();
