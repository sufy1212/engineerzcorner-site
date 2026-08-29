(function(){
"use strict";

var SYMBOL_SETS = {
  automation: { label: "P&ID / Automation", items: [
    { name: "Control Valve with Actuator", icon: "<path d=\"M4 15l16 6M20 15L4 21\"></path><rect x=\"8\" y=\"3\" width=\"8\" height=\"7\" rx=\"1\"></rect><path d=\"M12 10v5\"></path>" },
    { name: "Pressure Transmitter", icon: "<circle cx=\"12\" cy=\"9\" r=\"6\"></circle><path d=\"M12 15v6\"></path><text x=\"12\" y=\"12\" text-anchor=\"middle\" font-size=\"6\" font-family=\"monospace\" stroke=\"none\" fill=\"currentColor\">PT</text>" },
    { name: "Check Valve", icon: "<path d=\"M4 12h16\"></path><path d=\"M9 7l6 5-6 5z\" fill=\"none\"></path>" },
    { name: "Relief/Safety Valve (PSV)", icon: "<path d=\"M8 20h8l-4-16z\"></path><path d=\"M12 4v-2\"></path>" },
    { name: "Electric Signal Line", icon: "<path d=\"M2 12h20\" stroke-dasharray=\"4 2\"></path>" },
    { name: "HMI/Operator Station", icon: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"12\" rx=\"1\"></rect><path d=\"M9 21h6M12 17v4\"></path>" }
  ]},
  process: { label: "Process", items: [
    { name: "Vertical Vessel", icon: "<rect x=\"7\" y=\"3\" width=\"10\" height=\"18\" rx=\"4\"></rect>" },
    { name: "Centrifugal Pump", icon: "<circle cx=\"12\" cy=\"12\" r=\"7\"></circle><path d=\"M12 5v3M19 12h-3M12 19v-3M5 12h3\"></path>" },
    { name: "Shell-and-Tube Exchanger", icon: "<rect x=\"3\" y=\"9\" width=\"18\" height=\"6\" rx=\"3\"></rect><line x1=\"7\" y1=\"9\" x2=\"7\" y2=\"15\"></line><line x1=\"17\" y1=\"9\" x2=\"17\" y2=\"15\"></line>" },
    { name: "Distillation Column", icon: "<rect x=\"8\" y=\"2\" width=\"8\" height=\"20\" rx=\"2\"></rect><line x1=\"8\" y1=\"7\" x2=\"16\" y2=\"7\"></line><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line><line x1=\"8\" y1=\"17\" x2=\"16\" y2=\"17\"></line>" },
    { name: "Flare Stack", icon: "<path d=\"M12 21V6\" ></path><path d=\"M9 6c0-3 1-5 3-5s3 2 3 5\" ></path><path d=\"M8 3c0 1 1 2 2 1M16 3c0 1-1 2-2 1\"></path>" },
    { name: "Restriction Orifice", icon: "<path d=\"M2 12h6M16 12h6\"></path><path d=\"M8 4v16M16 4v16\" fill=\"none\"></path>" }
  ]},
  mechanical: { label: "Mechanical", items: [
    { name: "Gearbox", icon: "<rect x=\"4\" y=\"6\" width=\"16\" height=\"12\" rx=\"2\"></rect><circle cx=\"9\" cy=\"12\" r=\"3\"></circle><circle cx=\"15\" cy=\"12\" r=\"3\"></circle>" },
    { name: "Coupling", icon: "<rect x=\"2\" y=\"9\" width=\"7\" height=\"6\"></rect><rect x=\"15\" y=\"9\" width=\"7\" height=\"6\"></rect><path d=\"M9 12h6\"></path>" },
    { name: "Bearing", icon: "<circle cx=\"12\" cy=\"12\" r=\"8\"></circle><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>" },
    { name: "Cooling Tower", icon: "<path d=\"M6 20V8l6-4 6 4v12\"></path><path d=\"M6 14h12\"></path>" },
    { name: "Rotameter", icon: "<path d=\"M9 20V4l6 16V4\"></path>" },
    { name: "Turbine", icon: "<path d=\"M12 2v20\"></path><path d=\"M6 6l12 12M18 6L6 18\"></path>" }
  ]},
  hvac: { label: "HVAC", items: [
    { name: "Air Handling Unit", icon: "<rect x=\"3\" y=\"7\" width=\"18\" height=\"10\" rx=\"1\"></rect><path d=\"M3 12h18\"></path>" },
    { name: "VAV Box", icon: "<rect x=\"4\" y=\"7\" width=\"16\" height=\"10\" rx=\"1\"></rect><path d=\"M9 7v10\"></path>" },
    { name: "Cooling Coil", icon: "<path d=\"M4 8c2 0 2 8 4 8s2-8 4-8 2 8 4 8 2-8 4-8\"></path>" },
    { name: "Fire Damper", icon: "<rect x=\"4\" y=\"9\" width=\"16\" height=\"6\" rx=\"1\"></rect><path d=\"M8 9v6M12 9v6M16 9v6\"></path><text x=\"12\" y=\"6\" text-anchor=\"middle\" font-size=\"6\" font-family=\"monospace\" stroke=\"none\" fill=\"currentColor\">FD</text>" },
    { name: "Chiller", icon: "<rect x=\"3\" y=\"7\" width=\"18\" height=\"10\" rx=\"1\"></rect><path d=\"M8 7v10M16 7v10\"></path>" },
    { name: "Louver", icon: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\"></rect><path d=\"M4 8h16M4 12h16M4 16h16\"></path>" }
  ]},
  civil: { label: "Civil", items: [
    { name: "Footing", icon: "<path d=\"M4 18h16M6 18v-4h12v4\"></path><rect x=\"9\" y=\"6\" width=\"6\" height=\"8\"></rect>" },
    { name: "Truss", icon: "<path d=\"M2 18h20\"></path><path d=\"M2 18l5-12 5 12 5-12 5 12\"></path>" },
    { name: "Manhole", icon: "<circle cx=\"12\" cy=\"12\" r=\"8\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle>" },
    { name: "North Arrow", icon: "<path d=\"M12 3v14M12 3l-4 6M12 3l4 6\"></path><text x=\"12\" y=\"22\" text-anchor=\"middle\" font-size=\"7\" font-family=\"monospace\" stroke=\"none\" fill=\"currentColor\">N</text>" },
    { name: "Retaining Wall", icon: "<path d=\"M4 20h6V4H8L4 20z\"></path><path d=\"M10 20h10\"></path>" },
    { name: "Fire Hydrant", icon: "<circle cx=\"12\" cy=\"10\" r=\"4\"></circle><path d=\"M12 14v6\"></path><path d=\"M8 12l-2 2M16 12l2 2\"></path>" }
  ]},
  solar: { label: "Solar", items: [
    { name: "PV Module / Panel", icon: "<rect x=\"4\" y=\"5\" width=\"16\" height=\"14\" rx=\"1\"></rect><path d=\"M4 10h16M4 14h16M9.3 5v14M14.7 5v14\"></path>" },
    { name: "String Inverter", icon: "<rect x=\"5\" y=\"4\" width=\"14\" height=\"16\" rx=\"1\"></rect><path d=\"M8 12h2l1.5-4 2 8 1.5-4h1\"></path>" },
    { name: "Combiner Box", icon: "<rect x=\"5\" y=\"5\" width=\"14\" height=\"14\" rx=\"1\"></rect><path d=\"M9 9v6M12 9v6M15 9v6\"></path><path d=\"M12 19v3\"></path>" },
    { name: "MC4 Connector", icon: "<circle cx=\"9\" cy=\"12\" r=\"3\"></circle><circle cx=\"15\" cy=\"12\" r=\"3\" fill=\"none\"></circle><path d=\"M12 12h0\"></path>" },
    { name: "Battery Bank", icon: "<rect x=\"4\" y=\"8\" width=\"14\" height=\"10\" rx=\"1\"></rect><path d=\"M18 11v4\"></path><path d=\"M8 8V6M13 8V6\"></path>" },
    { name: "Rapid Shutdown Device", icon: "<circle cx=\"12\" cy=\"12\" r=\"9\" fill=\"none\"></circle><path d=\"M12 5v6\"></path><path d=\"M8 9a6 6 0 1 0 8 0\"></path>" }
  ]}
};

var CATS = ["automation","process","mechanical","hvac","civil","solar"];

function svgWrap(inner){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+inner+'</svg>';
}

function shuffle(arr){
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

function bestKey(cat){ return 'ecrSymbolMatchBest_' + cat; }
function getBest(cat){
  try {
    var v = localStorage.getItem(bestKey(cat));
    return v ? JSON.parse(v) : null;
  } catch(e){ return null; }
}
function setBest(cat, moves, seconds){
  try {
    var cur = getBest(cat);
    if (!cur || seconds < cur.seconds || (seconds === cur.seconds && moves < cur.moves)) {
      localStorage.setItem(bestKey(cat), JSON.stringify({moves:moves, seconds:seconds}));
      return true;
    }
  } catch(e){}
  return false;
}
function fmtTime(s){
  var m = Math.floor(s / 60), sec = s % 60;
  return m + ":" + (sec < 10 ? "0" : "") + sec;
}
function fmtBest(b){
  return b ? (fmtTime(b.seconds) + " / " + b.moves + "mv") : "—";
}

var startScreen = document.getElementById('startScreen');
var gameScreen = document.getElementById('gameScreen');
var overScreen = document.getElementById('overScreen');
var catGrid = document.getElementById('catGrid');
var board = document.getElementById('board');
var movesVal = document.getElementById('movesVal');
var timeVal = document.getElementById('timeVal');
var pairsLeft = document.getElementById('pairsLeft');
var setTag = document.getElementById('setTag');
var bestVal = document.getElementById('bestVal');
var finalTime = document.getElementById('finalTime');
var finalMoves = document.getElementById('finalMoves');
var finalBest = document.getElementById('finalBest');
var toast = document.getElementById('toast');

var state = {
  cat: null,
  tiles: [],
  flipped: [],
  matchedCount: 0,
  totalPairs: 0,
  moves: 0,
  seconds: 0,
  timer: null,
  locked: false
};

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(function(){ toast.classList.remove('show'); }, 1400);
}

function buildCatGrid(){
  var html = '';
  CATS.forEach(function(c){
    var set = SYMBOL_SETS[c];
    var b = getBest(c);
    html += '<button class="sm2-cat-btn" data-cat="'+c+'">'+set.label+'<small>'+(b ? fmtBest(b) : set.items.length+' symbols') + '</small></button>';
  });
  html += '<button class="sm2-cat-btn mixed" data-cat="mixed">Mixed — all disciplines<small>'+(function(){var b=getBest('mixed'); return b?fmtBest(b):'8 pairs, random pull';})()+'</small></button>';
  catGrid.innerHTML = html;
  var btns = catGrid.querySelectorAll('.sm2-cat-btn');
  for (var i=0;i<btns.length;i++){
    btns[i].addEventListener('click', function(){ startGame(this.getAttribute('data-cat')); });
  }
  bestVal.textContent = fmtBest(getBest('mixed'));
}

function pickPairs(cat){
  var pairs = [];
  if (cat === 'mixed') {
    var pool = [];
    CATS.forEach(function(c){
      SYMBOL_SETS[c].items.forEach(function(item){
        pool.push({ key: c+':'+item.name, name: item.name, icon: item.icon, cat: c });
      });
    });
    shuffle(pool);
    pairs = pool.slice(0, 8);
  } else {
    SYMBOL_SETS[cat].items.forEach(function(item){
      pairs.push({ key: cat+':'+item.name, name: item.name, icon: item.icon, cat: cat });
    });
  }
  return pairs;
}

function startGame(cat){
  state.cat = cat;
  var pairs = pickPairs(cat);
  state.totalPairs = pairs.length;
  state.matchedCount = 0;
  state.moves = 0;
  state.seconds = 0;
  state.flipped = [];
  state.locked = false;

  var cards = [];
  pairs.forEach(function(p, idx){
    cards.push({ pairKey: p.key, kind: 'icon', name: p.name, icon: p.icon, id: 'i'+idx });
    cards.push({ pairKey: p.key, kind: 'label', name: p.name, icon: p.icon, id: 'l'+idx });
  });
  shuffle(cards);
  state.tiles = cards;

  var cols = cards.length > 12 ? 4 : 3;
  board.style.gridTemplateColumns = 'repeat('+cols+', 1fr)';

  board.innerHTML = cards.map(function(c, i){
    var backContent = c.kind === 'icon'
      ? '<div class="sm2-face-back is-icon" data-idx="'+i+'">'+svgWrap(c.icon)+'</div>'
      : '<div class="sm2-face-back is-label" data-idx="'+i+'"><span>'+c.name+'</span></div>';
    return '<div class="sm2-tile" data-idx="'+i+'">'+
      '<div class="sm2-tile-inner">'+
        '<div class="sm2-face sm2-face-front"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4"></path></svg></div>'+
        backContent +
      '</div></div>';
  }).join('');

  var tileEls = board.querySelectorAll('.sm2-tile');
  for (var i=0;i<tileEls.length;i++){
    tileEls[i].addEventListener('click', onTileClick);
  }

  setTag.textContent = cat === 'mixed' ? 'Mixed' : SYMBOL_SETS[cat].label;
  movesVal.textContent = '0';
  timeVal.textContent = '0:00';
  pairsLeft.textContent = '0 / ' + state.totalPairs + ' pairs';

  clearInterval(state.timer);
  state.timer = setInterval(function(){
    state.seconds++;
    timeVal.textContent = fmtTime(state.seconds);
  }, 1000);

  startScreen.classList.add('hidden');
  overScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
}

function onTileClick(){
  if (state.locked) return;
  var idx = parseInt(this.getAttribute('data-idx'), 10);
  if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
  if (state.flipped.length >= 2) return;

  this.classList.add('flipped');
  state.flipped.push({ el: this, idx: idx });

  if (state.flipped.length === 2) {
    state.moves++;
    movesVal.textContent = state.moves;
    var a = state.flipped[0], b = state.flipped[1];
    var cardA = state.tiles[a.idx], cardB = state.tiles[b.idx];

    if (cardA.pairKey === cardB.pairKey && cardA.kind !== cardB.kind) {
      state.locked = true;
      setTimeout(function(){
        a.el.classList.add('matched');
        b.el.classList.add('matched');
        state.matchedCount++;
        pairsLeft.textContent = state.matchedCount + ' / ' + state.totalPairs + ' pairs';
        state.flipped = [];
        state.locked = false;
        if (state.matchedCount === state.totalPairs) {
          endGame();
        }
      }, 260);
    } else {
      state.locked = true;
      a.el.classList.add('wrong');
      b.el.classList.add('wrong');
      showToast('Not a match — try again');
      setTimeout(function(){
        a.el.classList.remove('flipped','wrong');
        b.el.classList.remove('flipped','wrong');
        state.flipped = [];
        state.locked = false;
      }, 750);
    }
  }
}

function endGame(){
  clearInterval(state.timer);
  var isBest = setBest(state.cat, state.moves, state.seconds);
  finalTime.textContent = fmtTime(state.seconds);
  finalMoves.textContent = state.moves;
  finalBest.textContent = fmtBest(getBest(state.cat)) + (isBest ? ' 🏆 new best' : '');
  setTimeout(function(){
    gameScreen.classList.add('hidden');
    overScreen.classList.remove('hidden');
  }, 500);
}

document.getElementById('restartBtn').addEventListener('click', function(){
  if (state.cat) startGame(state.cat);
});
document.getElementById('againBtn').addEventListener('click', function(){
  buildCatGrid();
  overScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});
document.getElementById('backBtn').addEventListener('click', function(){
  buildCatGrid();
  overScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});

buildCatGrid();

})();
