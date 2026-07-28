// ==================== PROJECT MANAGEMENT TOOLS ====================
(function(){
  function num(id){ var e = document.getElementById(id); return e ? parseFloat(e.value) : NaN; }
  function el(id){ return document.getElementById(id); }
  function fmt(v, d){ if(!isFinite(v)) return '—'; return v.toFixed(d===undefined?2:d); }
  function setText(id, html){ var e = el(id); if(e) e.innerHTML = html; }
  function makeRemoveBtn(){
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'removeBtn'; btn.title = 'Remove'; btn.setAttribute('aria-label','Remove');
    btn.textContent = '✕';
    return btn;
  }

  // ==================== PM.01 RACI MATRIX ====================
  var raciMembersList = [];
  function raciBuildHeader(members){
    var head = el('raciHeadRow');
    if(!head) return;
    head.innerHTML = '';
    var th0 = document.createElement('th'); th0.textContent = 'Task / Deliverable'; head.appendChild(th0);
    members.forEach(function(m){
      var th = document.createElement('th'); th.textContent = m; head.appendChild(th);
    });
    var thRm = document.createElement('th'); head.appendChild(thRm);
  }
  function raciMakeRow(taskText, members){
    var tr = document.createElement('tr');
    var tdTask = document.createElement('td');
    var taskInput = document.createElement('input');
    taskInput.type = 'text'; taskInput.value = taskText || '';
    taskInput.placeholder = 'Task or deliverable';
    tdTask.appendChild(taskInput);
    tr.appendChild(tdTask);

    members.forEach(function(){
      var td = document.createElement('td');
      var sel = document.createElement('select');
      ['-','R','A','C','I'].forEach(function(opt){
        var o = document.createElement('option'); o.value = opt;
        o.textContent = opt==='-' ? '—' : opt;
        sel.appendChild(o);
      });
      sel.addEventListener('change', raciValidate);
      td.appendChild(sel);
      tr.appendChild(td);
    });

    var tdRm = document.createElement('td'); tdRm.className = 'pm-rm';
    var rmBtn = makeRemoveBtn();
    rmBtn.addEventListener('click', function(){ tr.remove(); raciValidate(); });
    tdRm.appendChild(rmBtn);
    tr.appendChild(tdRm);
    return tr;
  }
  function raciValidate(){
    var rows = el('raciTbody') ? el('raciTbody').querySelectorAll('tr') : [];
    var badRows = 0;
    rows.forEach(function(tr){
      var selects = tr.querySelectorAll('select');
      var aCount = 0;
      selects.forEach(function(s){ if(s.value==='A') aCount++; });
      if(aCount !== 1) badRows++;
    });
    var banner = el('raciValidation');
    if(!banner) return;
    if(rows.length===0){
      banner.className = 'validation-banner neutral';
      banner.innerHTML = '<span class="vdot"></span><span>Add a task to get started.</span>';
    } else if(badRows>0){
      banner.className = 'validation-banner bad';
      banner.innerHTML = '<span class="vdot"></span><span>' + badRows + ' of ' + rows.length + ' task(s) don\u2019t have exactly one Accountable (A) — check for zero or more than one.</span>';
    } else {
      banner.className = 'validation-banner ok';
      banner.innerHTML = '<span class="vdot"></span><span>Every task has exactly one Accountable owner.</span>';
    }
  }
  function raciRebuild(){
    var raw = (el('raciMembers').value || '').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
    if(raw.length===0) raw = ['Member 1'];
    raciMembersList = raw;
    raciBuildHeader(raciMembersList);
    var existingTasks = [];
    el('raciTbody').querySelectorAll('tr').forEach(function(tr){
      var t = tr.querySelector('input[type="text"]');
      if(t && t.value.trim()) existingTasks.push(t.value.trim());
    });
    el('raciTbody').innerHTML = '';
    if(existingTasks.length===0) existingTasks = ['Example task'];
    existingTasks.forEach(function(t){
      el('raciTbody').appendChild(raciMakeRow(t, raciMembersList));
    });
    raciValidate();
  }
  if(el('raciBuildBtn')){
    el('raciBuildBtn').addEventListener('click', raciRebuild);
    el('raciAddRowBtn').addEventListener('click', function(){
      el('raciTbody').appendChild(raciMakeRow('', raciMembersList));
      raciValidate();
    });
    raciRebuild();
  }

  // ==================== PM.02 RISK REGISTER ====================
  var PROB_LABELS = {1:'Low',2:'Medium',3:'High'};
  function riskRecompute(tr){
    var prob = parseInt(tr.querySelector('.riskProb').value, 10);
    var impact = parseInt(tr.querySelector('.riskImpact').value, 10);
    var score = prob * impact;
    var priority = score<=3 ? 'low' : (score<=6 ? 'medium' : 'high');
    tr.querySelector('.riskScore').textContent = score;
    var badge = tr.querySelector('.riskPriority');
    badge.className = 'pm-badge ' + priority + ' riskPriority';
    badge.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
    tr.dataset.priority = priority;
    riskUpdateSummary();
  }
  function riskUpdateSummary(){
    var rows = el('riskTbody') ? el('riskTbody').querySelectorAll('tr') : [];
    var high = 0;
    rows.forEach(function(tr){ if(tr.dataset.priority==='high') high++; });
    setText('riskHighCount', high);
  }
  function riskMakeRow(desc, prob, impact, owner){
    var tr = document.createElement('tr');

    var tdDesc = document.createElement('td');
    var descInput = document.createElement('input'); descInput.type = 'text'; descInput.value = desc || ''; descInput.placeholder = 'Describe the risk';
    tdDesc.appendChild(descInput); tr.appendChild(tdDesc);

    var tdProb = document.createElement('td');
    var probSel = document.createElement('select'); probSel.className = 'riskProb';
    [1,2,3].forEach(function(v){ var o = document.createElement('option'); o.value=v; o.textContent=PROB_LABELS[v]; if(v===(prob||2)) o.selected=true; probSel.appendChild(o); });
    probSel.addEventListener('change', function(){ riskRecompute(tr); });
    tdProb.appendChild(probSel); tr.appendChild(tdProb);

    var tdImpact = document.createElement('td');
    var impactSel = document.createElement('select'); impactSel.className = 'riskImpact';
    [1,2,3].forEach(function(v){ var o = document.createElement('option'); o.value=v; o.textContent=PROB_LABELS[v]; if(v===(impact||2)) o.selected=true; impactSel.appendChild(o); });
    impactSel.addEventListener('change', function(){ riskRecompute(tr); });
    tdImpact.appendChild(impactSel); tr.appendChild(tdImpact);

    var tdScore = document.createElement('td'); tdScore.className = 'riskScore'; tdScore.style.fontFamily='var(--font-mono)'; tdScore.style.fontWeight='700';
    tr.appendChild(tdScore);

    var tdPriority = document.createElement('td');
    var badge = document.createElement('span'); badge.className = 'pm-badge riskPriority';
    tdPriority.appendChild(badge); tr.appendChild(tdPriority);

    var tdOwner = document.createElement('td');
    var ownerInput = document.createElement('input'); ownerInput.type = 'text'; ownerInput.value = owner || ''; ownerInput.placeholder = 'Owner';
    tdOwner.appendChild(ownerInput); tr.appendChild(tdOwner);

    var tdRm = document.createElement('td'); tdRm.className = 'pm-rm';
    var rmBtn = makeRemoveBtn();
    rmBtn.addEventListener('click', function(){ tr.remove(); riskUpdateSummary(); });
    tdRm.appendChild(rmBtn); tr.appendChild(tdRm);

    return tr;
  }
  if(el('riskTbody')){
    el('riskTbody').appendChild(riskMakeRow('Key material delivery delayed', 2, 3, ''));
    el('riskTbody').appendChild(riskMakeRow('Scope creep from client change requests', 3, 2, ''));
    el('riskTbody').querySelectorAll('tr').forEach(riskRecompute);
    el('riskAddBtn').addEventListener('click', function(){
      var tr = riskMakeRow('', 2, 2, '');
      el('riskTbody').appendChild(tr);
      riskRecompute(tr);
    });
  }

  // ==================== PM.03 TASK TRACKER ====================
  function todayISO(){
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function taskRecompute(tr){
    var due = tr.querySelector('.taskDue').value;
    var status = tr.querySelector('.taskStatus').value;
    var overdue = due && status!=='Done' && due < todayISO();
    tr.classList.toggle('pm-overdue', !!overdue);
    tr.dataset.status = status;
    tr.dataset.overdue = overdue ? '1' : '0';
    taskUpdateSummary();
  }
  function taskUpdateSummary(){
    var rows = el('taskTbody') ? el('taskTbody').querySelectorAll('tr') : [];
    var open=0, overdue=0, done=0;
    rows.forEach(function(tr){
      if(tr.dataset.status==='Done') done++; else open++;
      if(tr.dataset.overdue==='1') overdue++;
    });
    setText('taskOpenCount', open);
    setText('taskOverdueCount', overdue);
    setText('taskDoneCount', done);
    setText('taskTotalCount', rows.length);
  }
  function taskMakeRow(taskText, owner, due, status){
    var tr = document.createElement('tr');

    var tdTask = document.createElement('td');
    var taskInput = document.createElement('input'); taskInput.type='text'; taskInput.value = taskText||''; taskInput.placeholder='Task';
    tdTask.appendChild(taskInput); tr.appendChild(tdTask);

    var tdOwner = document.createElement('td');
    var ownerInput = document.createElement('input'); ownerInput.type='text'; ownerInput.value = owner||''; ownerInput.placeholder='Owner';
    tdOwner.appendChild(ownerInput); tr.appendChild(tdOwner);

    var tdDue = document.createElement('td');
    var dueInput = document.createElement('input'); dueInput.type='date'; dueInput.className='taskDue'; if(due) dueInput.value = due;
    dueInput.addEventListener('change', function(){ taskRecompute(tr); });
    tdDue.appendChild(dueInput); tr.appendChild(tdDue);

    var tdStatus = document.createElement('td');
    var statusSel = document.createElement('select'); statusSel.className='taskStatus';
    ['Not started','In progress','Done'].forEach(function(s){ var o=document.createElement('option'); o.value=s; o.textContent=s; if(s===(status||'Not started')) o.selected=true; statusSel.appendChild(o); });
    statusSel.addEventListener('change', function(){ taskRecompute(tr); });
    tdStatus.appendChild(statusSel); tr.appendChild(tdStatus);

    var tdRm = document.createElement('td'); tdRm.className='pm-rm';
    var rmBtn = makeRemoveBtn();
    rmBtn.addEventListener('click', function(){ tr.remove(); taskUpdateSummary(); });
    tdRm.appendChild(rmBtn); tr.appendChild(tdRm);

    return tr;
  }
  if(el('taskTbody')){
    var t1 = taskMakeRow('Submit permit application', '', '', 'In progress');
    var t2 = taskMakeRow('Confirm equipment delivery date', '', '', 'Not started');
    el('taskTbody').appendChild(t1);
    el('taskTbody').appendChild(t2);
    el('taskTbody').querySelectorAll('tr').forEach(taskRecompute);
    el('taskAddBtn').addEventListener('click', function(){
      var tr = taskMakeRow('', '', '', 'Not started');
      el('taskTbody').appendChild(tr);
      taskRecompute(tr);
    });
  }

  // ==================== PM.10 PUNCH LIST / SNAG TRACKER ====================
  function punchRecompute(tr){
    var status = tr.querySelector('.punchStatus').value;
    var priority = tr.querySelector('.punchPriority').value;
    tr.dataset.status = status;
    tr.dataset.priority = priority;
    tr.classList.toggle('pm-overdue', status !== 'Closed' && priority === 'Critical');
    punchUpdateSummary();
  }
  function punchUpdateSummary(){
    var rows = el('punchTbody') ? el('punchTbody').querySelectorAll('tr') : [];
    var open=0, closed=0, critical=0;
    rows.forEach(function(tr){
      if(tr.dataset.status==='Closed') closed++; else open++;
      if(tr.dataset.status!=='Closed' && tr.dataset.priority==='Critical') critical++;
    });
    setText('punchOpenCount', open);
    setText('punchCriticalCount', critical);
    setText('punchClosedCount', closed);
    setText('punchTotalCount', rows.length);
  }
  function punchMakeRow(item, location, trade, priority, status){
    var tr = document.createElement('tr');

    var tdItem = document.createElement('td');
    var itemInput = document.createElement('input'); itemInput.type='text'; itemInput.value=item||''; itemInput.placeholder='e.g. Cracked tile, Level 2 corridor';
    tdItem.appendChild(itemInput); tr.appendChild(tdItem);

    var tdLoc = document.createElement('td');
    var locInput = document.createElement('input'); locInput.type='text'; locInput.value=location||''; locInput.placeholder='Location';
    tdLoc.appendChild(locInput); tr.appendChild(tdLoc);

    var tdTrade = document.createElement('td');
    var tradeInput = document.createElement('input'); tradeInput.type='text'; tradeInput.value=trade||''; tradeInput.placeholder='Trade';
    tdTrade.appendChild(tradeInput); tr.appendChild(tdTrade);

    var tdPriority = document.createElement('td');
    var prioritySel = document.createElement('select'); prioritySel.className='punchPriority';
    ['Low','Medium','High','Critical'].forEach(function(p){ var o=document.createElement('option'); o.value=p; o.textContent=p; if(p===(priority||'Medium')) o.selected=true; prioritySel.appendChild(o); });
    prioritySel.addEventListener('change', function(){ punchRecompute(tr); });
    tdPriority.appendChild(prioritySel); tr.appendChild(tdPriority);

    var tdStatus = document.createElement('td');
    var statusSel = document.createElement('select'); statusSel.className='punchStatus';
    ['Open','In progress','Closed'].forEach(function(s){ var o=document.createElement('option'); o.value=s; o.textContent=s; if(s===(status||'Open')) o.selected=true; statusSel.appendChild(o); });
    statusSel.addEventListener('change', function(){ punchRecompute(tr); });
    tdStatus.appendChild(statusSel); tr.appendChild(tdStatus);

    var tdRm = document.createElement('td'); tdRm.className='pm-rm';
    var rmBtn = makeRemoveBtn();
    rmBtn.addEventListener('click', function(){ tr.remove(); punchUpdateSummary(); });
    tdRm.appendChild(rmBtn); tr.appendChild(tdRm);

    return tr;
  }
  if(el('punchTbody')){
    var p1 = punchMakeRow('Paint touch-up needed', 'Lobby, north wall', 'Painting', 'Low', 'Open');
    var p2 = punchMakeRow('Fire door not closing fully', 'Stairwell B, L3', 'Doors/Hardware', 'Critical', 'Open');
    el('punchTbody').appendChild(p1);
    el('punchTbody').appendChild(p2);
    el('punchTbody').querySelectorAll('tr').forEach(punchRecompute);
    el('punchAddBtn').addEventListener('click', function(){
      var tr = punchMakeRow('', '', '', 'Medium', 'Open');
      el('punchTbody').appendChild(tr);
      punchRecompute(tr);
    });

    el('punchGenBtn').addEventListener('click', function(){
      var rows = el('punchTbody').querySelectorAll('tr');
      var out = [];
      out.push('Punch List / Snag Report — ' + todayISO());
      out.push('');
      var groups = {'Critical':[], 'High':[], 'Medium':[], 'Low':[]};
      rows.forEach(function(tr){
        var inputs = tr.querySelectorAll('input');
        var item = inputs[0].value.trim();
        if(!item) return;
        var location = inputs[1].value.trim();
        var trade = inputs[2].value.trim();
        var priority = tr.querySelector('.punchPriority').value;
        var status = tr.querySelector('.punchStatus').value;
        var line = '- [' + (status==='Closed' ? 'x' : ' ') + '] ' + item + (location ? ' — ' + location : '') + (trade ? ' (' + trade + ')' : '') + ' — ' + status;
        groups[priority].push(line);
      });
      ['Critical','High','Medium','Low'].forEach(function(p){
        if(groups[p].length){
          out.push(p + ':');
          out = out.concat(groups[p]);
          out.push('');
        }
      });
      if(out.length===2) out.push('(no items)');
      el('punchOutput').value = out.join('\n');
    });

    el('punchCopyBtn').addEventListener('click', function(){
      var out = el('punchOutput');
      var statusEl = el('punchCopyStatus');
      if(!out.value){ statusEl.textContent = 'Generate the summary first.'; return; }
      out.select();
      navigator.clipboard.writeText(out.value).then(function(){
        statusEl.textContent = 'Copied to clipboard.';
      }).catch(function(){
        statusEl.textContent = "Couldn't auto-copy — the text is selected, use Ctrl/Cmd+C.";
      });
    });
  }

  // ==================== PM.11 PERMIT TO WORK / LOTO CHECKLIST ====================
  var PERMIT_CHECKS = [
    'Work area barricaded / signage posted',
    'Required PPE identified and available',
    'Isolation points identified and locked out',
    'Zero-energy state verified (try-before-you-touch)',
    'Gas test / atmosphere check complete (if applicable)',
    'Emergency procedure and nearest exit briefed to crew',
    'Fire extinguisher / spill kit available (if applicable)',
    'Adjacent work / simultaneous operations checked for conflicts',
    'Permit displayed at work location',
    'Crew briefed and understands scope of work'
  ];
  function permMakeIsoRow(point, method, lockedBy, verified){
    var tr = document.createElement('tr');

    var tdPoint = document.createElement('td');
    var pointInput = document.createElement('input'); pointInput.type='text'; pointInput.value=point||''; pointInput.placeholder='e.g. MCC-2 breaker Q4';
    tdPoint.appendChild(pointInput); tr.appendChild(tdPoint);

    var tdMethod = document.createElement('td');
    var methodInput = document.createElement('input'); methodInput.type='text'; methodInput.value=method||''; methodInput.placeholder='e.g. Padlock + tag';
    tdMethod.appendChild(methodInput); tr.appendChild(tdMethod);

    var tdLocked = document.createElement('td');
    var lockedInput = document.createElement('input'); lockedInput.type='text'; lockedInput.value=lockedBy||''; lockedInput.placeholder='Name';
    tdLocked.appendChild(lockedInput); tr.appendChild(tdLocked);

    var tdVerified = document.createElement('td'); tdVerified.style.textAlign='center';
    var verifiedInput = document.createElement('input'); verifiedInput.type='checkbox'; verifiedInput.checked = !!verified;
    tdVerified.appendChild(verifiedInput); tr.appendChild(tdVerified);

    var tdRm = document.createElement('td'); tdRm.className='pm-rm';
    var rmBtn = makeRemoveBtn();
    rmBtn.addEventListener('click', function(){ tr.remove(); });
    tdRm.appendChild(rmBtn); tr.appendChild(tdRm);

    return tr;
  }
  if(el('permIsoTbody')){
    el('permIsoTbody').appendChild(permMakeIsoRow('', '', '', false));
    el('permIsoAddBtn').addEventListener('click', function(){
      el('permIsoTbody').appendChild(permMakeIsoRow('', '', '', false));
    });

    var checklistEl = el('permChecklist');
    PERMIT_CHECKS.forEach(function(text, i){
      var row = document.createElement('div'); row.className='permit-check-item';
      var cb = document.createElement('input'); cb.type='checkbox'; cb.id='permCheck'+i; cb.className='permCheckbox';
      var lbl = document.createElement('label'); lbl.setAttribute('for', 'permCheck'+i); lbl.textContent = text;
      row.appendChild(cb); row.appendChild(lbl);
      checklistEl.appendChild(row);
    });

    if(el('permDate') && !el('permDate').value) el('permDate').value = todayISO();

    el('permGenBtn').addEventListener('click', function(){
      var work = el('permWork').value.trim() || '(work description not entered)';
      var type = el('permType').value;
      var location = el('permLocation').value.trim();
      var date = el('permDate').value || todayISO();
      var issuedBy = el('permIssuedBy').value.trim();
      var receivedBy = el('permReceivedBy').value.trim();

      var out = [];
      out.push(type + ' — Permit Record');
      out.push('Date: ' + date);
      out.push('Work: ' + work);
      if(location) out.push('Location: ' + location);
      if(issuedBy) out.push('Issued by: ' + issuedBy);
      if(receivedBy) out.push('Received by: ' + receivedBy);
      out.push('');

      out.push('Isolation / LOTO Points:');
      var isoRows = el('permIsoTbody').querySelectorAll('tr');
      var anyIso = false;
      isoRows.forEach(function(tr){
        var inputs = tr.querySelectorAll('input[type="text"]');
        var point = inputs[0].value.trim();
        if(!point) return;
        anyIso = true;
        var method = inputs[1].value.trim();
        var lockedBy = inputs[2].value.trim();
        var verified = tr.querySelector('input[type="checkbox"]').checked;
        out.push('- ' + point + (method ? ' — ' + method : '') + (lockedBy ? ' — locked by ' + lockedBy : '') + ' — ' + (verified ? 'VERIFIED' : 'not verified'));
      });
      if(!anyIso) out.push('(none listed)');
      out.push('');

      out.push('Pre-Work Safety Checks:');
      document.querySelectorAll('.permCheckbox').forEach(function(cb, i){
        out.push('[' + (cb.checked ? 'x' : ' ') + '] ' + PERMIT_CHECKS[i]);
      });
      out.push('');
      out.push('Signatures: Issued by ______________________   Received by ______________________');

      el('permOutput').value = out.join('\n');
    });

    el('permCopyBtn').addEventListener('click', function(){
      var out = el('permOutput');
      var statusEl = el('permCopyStatus');
      if(!out.value){ statusEl.textContent = 'Generate the summary first.'; return; }
      out.select();
      navigator.clipboard.writeText(out.value).then(function(){
        statusEl.textContent = 'Copied to clipboard.';
      }).catch(function(){
        statusEl.textContent = "Couldn't auto-copy — the text is selected, use Ctrl/Cmd+C.";
      });
    });
  }

  // ==================== PM.04 MEETING MINUTES ====================
  function minMakeActionRow(action, owner, due){
    var tr = document.createElement('tr');
    var tdA = document.createElement('td');
    var aInput = document.createElement('input'); aInput.type='text'; aInput.value=action||''; aInput.placeholder='Action item';
    tdA.appendChild(aInput); tr.appendChild(tdA);

    var tdO = document.createElement('td');
    var oInput = document.createElement('input'); oInput.type='text'; oInput.value=owner||''; oInput.placeholder='Owner';
    tdO.appendChild(oInput); tr.appendChild(tdO);

    var tdD = document.createElement('td');
    var dInput = document.createElement('input'); dInput.type='date'; if(due) dInput.value=due;
    tdD.appendChild(dInput); tr.appendChild(tdD);

    var tdRm = document.createElement('td'); tdRm.className='pm-rm';
    var rmBtn = makeRemoveBtn();
    rmBtn.addEventListener('click', function(){ tr.remove(); });
    tdRm.appendChild(rmBtn); tr.appendChild(tdRm);

    return tr;
  }
  if(el('minActionTbody')){
    el('minActionTbody').appendChild(minMakeActionRow('', '', ''));
    el('minAddActionBtn').addEventListener('click', function(){
      el('minActionTbody').appendChild(minMakeActionRow('', '', ''));
    });
    if(el('minDate') && !el('minDate').value) el('minDate').value = todayISO();

    el('minGenBtn').addEventListener('click', function(){
      var title = el('minTitle').value.trim() || 'Meeting';
      var date = el('minDate').value || todayISO();
      var attendees = el('minAttendees').value.trim();
      var notes = el('minNotes').value.trim();
      var actionRows = el('minActionTbody').querySelectorAll('tr');
      var anyAction = false;
      var out2 = [];
      out2.push(title);
      out2.push('Date: ' + date);
      if(attendees) out2.push('Attendees: ' + attendees);
      out2.push('');
      if(notes){ out2.push('Discussion:'); out2.push(notes); out2.push(''); }
      out2.push('Action Items:');
      actionRows.forEach(function(tr){
        var inputs = tr.querySelectorAll('input');
        var a = inputs[0].value.trim(), o = inputs[1].value.trim(), d = inputs[2].value;
        if(!a) return;
        anyAction = true;
        out2.push('- [ ] ' + a + (o ? ' (' + o + ')' : '') + (d ? ' — due ' + d : ''));
      });
      if(!anyAction) out2.push('(none)');
      el('minOutput').value = out2.join('\n');
    });

    el('minCopyBtn').addEventListener('click', function(){
      var out = el('minOutput');
      var statusEl = el('minCopyStatus');
      if(!out.value){ statusEl.textContent = 'Generate the summary first.'; return; }
      out.select();
      navigator.clipboard.writeText(out.value).then(function(){
        statusEl.textContent = 'Copied to clipboard.';
      }).catch(function(){
        statusEl.textContent = "Couldn't auto-copy — the text is selected, use Ctrl/Cmd+C.";
      });
    });
  }

  // ==================== PM.05 EARNED VALUE MANAGEMENT ====================
  function calcEvm(){
    if(!el('evmPV')) return;
    var PV = num('evmPV'), EV = num('evmEV'), AC = num('evmAC'), BAC = num('evmBAC');
    var errs = 0;
    errs += fieldError(el('evmPV'), (isNaN(PV) || PV<0) ? 'Must be 0 or greater.' : null);
    errs += fieldError(el('evmEV'), (isNaN(EV) || EV<0) ? 'Must be 0 or greater.' : null);
    errs += fieldError(el('evmAC'), (isNaN(AC) || AC<=0) ? 'Must be greater than 0.' : null);
    errs += fieldError(el('evmBAC'), (isNaN(BAC) || BAC<=0) ? 'Must be greater than 0.' : null);

    if(errs>0){ updateValidationBanner('evmValidation', errs); return; }

    var CPI = EV/AC;
    var SPI = PV>0 ? EV/PV : NaN;
    var CV = EV-AC;
    var SV = EV-PV;
    var EAC = CPI>0 ? BAC/CPI : NaN;
    var ETC = EAC-AC;
    var VAC = BAC-EAC;
    var pctComplete = (EV/BAC)*100;

    setText('evmEAC', fmt(EAC,0));
    setText('evmCPI', fmt(CPI,2));
    setText('evmSPI', isNaN(SPI) ? '—' : fmt(SPI,2));
    setText('evmCV', (CV>=0?'+':'') + fmt(CV,0));
    setText('evmSV', (SV>=0?'+':'') + fmt(SV,0));
    setText('evmETC', fmt(ETC,0));
    setText('evmVAC', (VAC>=0?'+':'') + fmt(VAC,0));
    setText('evmPctComplete', fmt(pctComplete,1) + '%');

    var costEl = el('evmCostStatus');
    if(CPI < 0.95){
      costEl.className = 'status-banner bad';
      costEl.innerHTML = '<span class="status-dot"></span><span>Over budget — CPI ' + fmt(CPI,2) + ' means work is costing more than planned.</span>';
    } else if(CPI > 1.05){
      costEl.className = 'status-banner ok';
      costEl.innerHTML = '<span class="status-dot"></span><span>Under budget — CPI ' + fmt(CPI,2) + '.</span>';
    } else {
      costEl.className = 'status-banner ok';
      costEl.innerHTML = '<span class="status-dot"></span><span>On budget — CPI ' + fmt(CPI,2) + ' is close to 1.0.</span>';
    }

    var schedEl = el('evmSchedStatus');
    if(isNaN(SPI)){
      schedEl.className = 'status-banner neutral';
      schedEl.innerHTML = '<span class="status-dot"></span><span>Enter a Planned Value above 0 to see schedule status.</span>';
    } else if(SPI < 0.95){
      schedEl.className = 'status-banner bad';
      schedEl.innerHTML = '<span class="status-dot"></span><span>Behind schedule — SPI ' + fmt(SPI,2) + ' means less work is done than planned by now.</span>';
    } else if(SPI > 1.05){
      schedEl.className = 'status-banner ok';
      schedEl.innerHTML = '<span class="status-dot"></span><span>Ahead of schedule — SPI ' + fmt(SPI,2) + '.</span>';
    } else {
      schedEl.className = 'status-banner ok';
      schedEl.innerHTML = '<span class="status-dot"></span><span>On schedule — SPI ' + fmt(SPI,2) + ' is close to 1.0.</span>';
    }

    updateValidationBanner('evmValidation', 0);
  }
  ['evmPV','evmEV','evmAC','evmBAC'].forEach(function(id){
    var e = el(id); if(e){ e.addEventListener('input', calcEvm); e.addEventListener('change', calcEvm); }
  });
  calcEvm();

  // ==================== PM.06 TEAM DIRECTORY ====================
  function teamMakeRow(name, role, email, phone){
    var tr = document.createElement('tr');
    var tdN = document.createElement('td');
    var nInput = document.createElement('input'); nInput.type='text'; nInput.value=name||''; nInput.placeholder='Name';
    tdN.appendChild(nInput); tr.appendChild(tdN);

    var tdR = document.createElement('td');
    var rInput = document.createElement('input'); rInput.type='text'; rInput.value=role||''; rInput.placeholder='Role';
    tdR.appendChild(rInput); tr.appendChild(tdR);

    var tdE = document.createElement('td');
    var eInput = document.createElement('input'); eInput.type='email'; eInput.value=email||''; eInput.placeholder='name@example.com';
    tdE.appendChild(eInput); tr.appendChild(tdE);

    var tdP = document.createElement('td');
    var pInput = document.createElement('input'); pInput.type='tel'; pInput.value=phone||''; pInput.placeholder='Phone';
    tdP.appendChild(pInput); tr.appendChild(tdP);

    var tdRm = document.createElement('td'); tdRm.className='pm-rm';
    var rmBtn = makeRemoveBtn();
    rmBtn.addEventListener('click', function(){ tr.remove(); });
    tdRm.appendChild(rmBtn); tr.appendChild(tdRm);

    return tr;
  }
  if(el('teamTbody')){
    el('teamTbody').appendChild(teamMakeRow('', 'Project Manager', '', ''));
    el('teamTbody').appendChild(teamMakeRow('', 'Site Engineer', '', ''));
    el('teamAddBtn').addEventListener('click', function(){
      el('teamTbody').appendChild(teamMakeRow('', '', '', ''));
    });
  }

})();
