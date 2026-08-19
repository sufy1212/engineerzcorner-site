(function(){
  var input = document.getElementById('ggSearch');
  var clearBtn = document.getElementById('ggClear');
  var countEl = document.getElementById('ggCount');
  var emptyEl = document.getElementById('ggEmpty');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.gg-chip'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('table.reftable tr[data-disc]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('.reftable-section'));
  var totalTerms = rows.length;
  var activeDisc = 'all';

  function apply(){
    var q = (input.value || '').trim().toLowerCase();
    clearBtn.style.display = q ? 'flex' : 'none';
    var visible = 0;

    rows.forEach(function(row){
      var disc = row.getAttribute('data-disc');
      var text = row.textContent.toLowerCase();
      var discMatch = activeDisc === 'all' || disc === activeDisc;
      var textMatch = !q || text.indexOf(q) !== -1;
      var show = discMatch && textMatch;
      row.classList.toggle('gg-row-hide', !show);
      if(show) visible++;
    });

    sections.forEach(function(sec){
      var anyVisible = sec.querySelectorAll('tr[data-disc]:not(.gg-row-hide)').length > 0;
      sec.classList.toggle('gg-section-hide', !anyVisible);
    });

    countEl.textContent = visible + ' of ' + totalTerms + ' terms';
    emptyEl.classList.toggle('gg-show', visible === 0);
  }

  input.addEventListener('input', apply);
  clearBtn.addEventListener('click', function(){
    input.value = '';
    apply();
    input.focus();
  });

  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      activeDisc = chip.getAttribute('data-disc');
      apply();
    });
  });

  apply();
})();
