(function(){
function el(id){return document.getElementById(id)}
function setText(id,txt){var e=el(id);e&&(e.textContent=txt)}

function splitWords(str){
  return String(str||"")
    .replace(/([a-z0-9])([A-Z])/g,"$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2")
    .replace(/[_\-]+/g," ")
    .replace(/[^a-zA-Z0-9]+/g," ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function cap(w){return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()}
function low(w){return w.toLowerCase()}

function toUpper(words,raw){return raw.toUpperCase()}
function toLower(words,raw){return raw.toLowerCase()}
function toTitle(words){return words.map(cap).join(" ")}
function toSentence(raw){
  var t=raw.toLowerCase().trim();
  if(!t)return "";
  t=t.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g,function(m){return m.toUpperCase()});
  return t;
}
function toCamel(words){
  if(!words.length)return "";
  return low(words[0])+words.slice(1).map(cap).join("");
}
function toPascal(words){return words.map(cap).join("")}
function toSnake(words){return words.map(low).join("_")}
function toKebab(words){return words.map(low).join("-")}
function toConstant(words){return words.map(function(w){return w.toUpperCase()}).join("_")}

function countWordsChars(raw){
  var trimmed=raw.trim();
  var words=trimmed?trimmed.split(/\s+/).length:0;
  var chars=raw.length;
  return words+" word"+(words===1?"":"s")+" \u00B7 "+chars+" character"+(chars===1?"":"s");
}

function update(){
  var input=el("tcInput");
  if(!input)return;
  var raw=input.value;
  var words=splitWords(raw);

  setText("tcUpper",raw?toUpper(words,raw):"\u2014");
  setText("tcLower",raw?toLower(words,raw):"\u2014");
  setText("tcTitle",words.length?toTitle(words):"\u2014");
  setText("tcSentence",raw?toSentence(raw):"\u2014");
  setText("tcCamel",words.length?toCamel(words):"\u2014");
  setText("tcPascal",words.length?toPascal(words):"\u2014");
  setText("tcSnake",words.length?toSnake(words):"\u2014");
  setText("tcKebab",words.length?toKebab(words):"\u2014");
  setText("tcConstant",words.length?toConstant(words):"\u2014");
  setText("tcCounts",countWordsChars(raw));
  setText("tcCopyStatus","\u00A0");
}

function copyValue(targetId){
  var target=el(targetId);
  if(!target)return;
  var txt=target.textContent;
  if(!txt||txt==="\u2014")return;
  function done(){setText("tcCopyStatus","Copied "+targetId.replace("tc","")+".")}
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(done).catch(function(){});
  } else {
    var ta=document.createElement("textarea");
    ta.value=txt;
    document.body.appendChild(ta);
    ta.select();
    try{document.execCommand("copy");done()}catch(e){}
    document.body.removeChild(ta);
  }
}

var input=el("tcInput");
input&&input.addEventListener("input",update);

document.querySelectorAll(".pm-copy-btn[data-copy]").forEach(function(btn){
  btn.addEventListener("click",function(){copyValue(btn.getAttribute("data-copy"))});
});

update();
})();
