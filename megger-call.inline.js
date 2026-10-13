(function(){"use strict";
var $=function(i){return document.getElementById(i)};
var BEST_KEY="ecrMeggerCallBest";
function getBest(){try{return parseInt(localStorage.getItem(BEST_KEY)||"0",10)||0}catch(e){return 0}}
function setBest(v){try{localStorage.setItem(BEST_KEY,String(v))}catch(e){}}

/* Rules (see the Insulation Resistance Testing post) */
function kt(T){return Math.pow(0.5,(40-T)/10)}
function fmt(x){return String(parseFloat((x>=100?x.toFixed(0):x>=10?x.toFixed(1):x.toFixed(2))))}

/* LV: min value by circuit voltage class. Test at 250 V on a 230 V circuit (e.g. SPD cannot be removed) still needs 1 MΩ. */
var LV=[
 {eq:"230 V final circuit",cls:"up to 500 V",tv:500,r:0.7},
 {eq:"230 V final circuit",cls:"up to 500 V",tv:500,r:45},
 {eq:"24 V SELV lighting circuit",cls:"SELV",tv:250,r:0.6},
 {eq:"24 V SELV lighting circuit",cls:"SELV",tv:250,r:0.3},
 {eq:"230 V circuit, SPD cannot be removed",cls:"up to 500 V",tv:250,r:0.8},
 {eq:"690 V motor feeder",cls:"above 500 V",tv:1000,r:1.2},
 {eq:"690 V motor feeder",cls:"above 500 V",tv:1000,r:0.9},
 {eq:"400 V three-phase sub-main",cls:"up to 500 V",tv:500,r:1.8},
 {eq:"12 V PELV control circuit",cls:"PELV",tv:250,r:0.4}
];
function lvMin(s){return s.cls==="SELV"||s.cls==="PELV"?(s.tv===250?0.5:1):1}
function lvVerdict(s){
 var m=lvMin(s),pass=s.r>=m,why;
 if(s.cls==="up to 500 V"&&s.tv===250)why="A 230 V circuit tested at a reduced 250 V still has to reach 1 M\u03A9. The 0.5 M\u03A9 limit belongs to SELV/PELV circuits only.";
 else if(s.cls==="SELV"||s.cls==="PELV")why="SELV/PELV circuits are tested at 250 V DC and must reach at least 0.5 M\u03A9.";
 else if(s.cls==="above 500 V")why="Circuits above 500 V are tested at 1000 V DC and must reach at least 1 M\u03A9.";
 else why="Circuits up to 500 V are tested at 500 V DC and must reach at least 1 M\u03A9.";
 return {pass:pass,text:(pass?"Reading "+s.r+" M\u03A9 meets the "+m+" M\u03A9 minimum. ":"Reading "+s.r+" M\u03A9 is below the "+m+" M\u03A9 minimum. ")+why};
}
/* Motors: IR corrected to 40 C and PI. random 5 MΩ, form-wound 100 MΩ, older/field kV+1 MΩ. PI >= 2.0 (class B/F/H) or 1.5 (class A) */
var MOT=[
 {eq:"415 V motor, random-wound",w:"random",kv:.415,cls:"F",T:28,r1:60,r10:150},
 {eq:"415 V motor, random-wound",w:"random",kv:.415,cls:"F",T:28,r1:60,r10:66},
 {eq:"415 V motor, random-wound",w:"random",kv:.415,cls:"F",T:52,r1:8,r10:24},
 {eq:"415 V motor, random-wound",w:"random",kv:.415,cls:"F",T:15,r1:18,r10:43},
 {eq:"6.6 kV motor, older winding",w:"old",kv:6.6,cls:"B",T:40,r1:6.5,r10:15},
 {eq:"6.6 kV motor, older winding",w:"old",kv:6.6,cls:"B",T:40,r1:9,r10:22},
 {eq:"6.6 kV motor, modern form-wound",w:"form",kv:6.6,cls:"F",T:40,r1:85,r10:230},
 {eq:"11 kV generator, modern form-wound",w:"form",kv:11,cls:"F",T:40,r1:250,r10:700},
 {eq:"415 V motor, old class A winding",w:"random",kv:.415,cls:"A",T:30,r1:30,r10:48},
 {eq:"415 V motor, old class A winding",w:"random",kv:.415,cls:"A",T:30,r1:30,r10:39},
 {eq:"415 V pump motor, random-wound",w:"random",kv:.415,cls:"B",T:35,r1:25,r10:23},
 {eq:"3.3 kV motor, modern form-wound",w:"form",kv:3.3,cls:"F",T:55,r1:40,r10:100}
];
var WLAB={random:"random-wound",form:"form-wound",old:"older / field winding"};
function motMin(s){return s.w==="random"?5:s.w==="form"?100:s.kv+1}
function motVerdict(s){
 var k=kt(s.T),r40=k*s.r1,m=motMin(s),pi=s.r10/s.r1,pim=s.cls==="A"?1.5:2.0;
 var irOk=r40>=m,piOk=pi>=pim,pass=irOk&&piOk;
 var t="Kt = 0.5^((40\u2212"+s.T+")/10) = "+k.toFixed(2)+", so R40 = "+fmt(r40)+" M\u03A9 against a "+fmt(m)+" M\u03A9 minimum ("+(irOk?"ok":"low")+"). PI = "+s.r10+" / "+s.r1+" = "+pi.toFixed(2)+" against a "+pim.toFixed(1)+" minimum for class "+s.cls+" ("+(piOk?"ok":"low")+").";
 return {pass:pass,text:t};
}
var DECK=[];
LV.forEach(function(s){DECK.push({kind:"lv",s:s,v:lvVerdict(s),time:18})});
MOT.forEach(function(s){DECK.push({kind:"mot",s:s,v:motVerdict(s),time:35})});

function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}

var toast=$("toast"),deck=[],idx=0,score=0,combo=1,lives=3,answered=0,correct=0,cur=null,tLeft=0,tTotal=0,timer=null,locked=false;
function showToast(m){toast.textContent=m;toast.classList.add("show");setTimeout(function(){toast.classList.remove("show")},1400)}
function show(id){["startScreen","gameScreen","overScreen"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
function hearts(){var h="";for(var i=0;i<3;i++)h+=i<lives?"\u2764\uFE0F":"\uD83E\uDD0D";$("heartsRow").innerHTML=h}
function row(k,v){return '<div class="mg-spec-row"><span>'+k+'</span><b>'+v+'</b></div>'}
function render(){
 var d=cur,s=d.s,rows="";
 $("bankTag").textContent=d.kind==="lv"?"LV installation test":"Motor / generator test";
 $("bankTitle").textContent=s.eq;
 if(d.kind==="lv"){
  $("bankCap").innerHTML="Circuit class: <b>"+s.cls+"</b>";
  rows=row("Test voltage",s.tv+" V DC")+row("Reading",s.r+" M\u03A9");
  $("reading").textContent=s.r+" M\u03A9";
 }else{
  $("bankCap").innerHTML="Winding: <b>"+WLAB[s.w]+"</b> &middot; class <b>"+s.cls+"</b>";
  rows=row("Winding temperature",s.T+" \u00B0C")+row("R at 1 min",s.r1+" M\u03A9")+row("R at 10 min",s.r10+" M\u03A9");
  $("reading").textContent="R1 "+s.r1+" / R10 "+s.r10;
 }
 $("spec").innerHTML=rows;
 $("itemQueue").textContent="Test "+(answered+1);
 $("fb").className="mg-fb hidden";$("nextBtn").classList.add("hidden");
 $("passBtn").disabled=false;$("failBtn").disabled=false;
 $("scoreVal").textContent=score;$("comboVal").textContent="\u00D7"+combo;hearts();
 tTotal=tLeft=cur.time;locked=false;tick();
 clearInterval(timer);timer=setInterval(function(){tLeft-=0.1;tick();if(tLeft<=0){clearInterval(timer);answer(null)}},100);
}
function tick(){$("itemTimerFill").style.width=Math.max(0,tLeft/tTotal*100)+"%"}
function nextQ(){
 if(idx>=deck.length){deck=shuffle(DECK.slice());idx=0}
 cur=deck[idx++];render();
}
function answer(choice){
 if(locked)return;locked=true;clearInterval(timer);
 var right=choice!==null&&(choice===cur.v.pass);
 answered++;
 var fb=$("fb");
 fb.classList.remove("hidden");
 var verdict=cur.v.pass?"PASS":"FAIL";
 if(right){
  correct++;var bonus=Math.round(50*Math.max(0,tLeft)/tTotal);
  score+=(100+bonus)*combo;combo=Math.min(5,combo+1);
  fb.className="mg-fb ok";fb.innerHTML='<b class="v">Correct \u2014 '+verdict+'</b>'+cur.v.text;
 }else{
  lives--;combo=1;
  fb.className="mg-fb bad";fb.innerHTML='<b class="v">'+(choice===null?"Time up":"Not quite")+' \u2014 this is a '+verdict+'</b>'+cur.v.text;
 }
 $("scoreVal").textContent=score;$("comboVal").textContent="\u00D7"+combo;hearts();
 $("passBtn").disabled=true;$("failBtn").disabled=true;
 $("nextBtn").textContent=lives<=0?"See result":"Next test";$("nextBtn").classList.remove("hidden");
}
function over(){
 var best=getBest(),nb=score>best;if(nb){best=score;setBest(best)}
 $("finalScore").textContent=score;$("finalRounds").textContent=correct+" / "+answered;$("finalBest").textContent=best;
 $("bestChip").innerHTML="Best score: <b>"+best+"</b>";
 $("newBest").classList.toggle("hidden",!nb);show("overScreen");
}
function start(){deck=shuffle(DECK.slice());idx=0;score=0;combo=1;lives=3;answered=0;correct=0;show("gameScreen");nextQ()}
$("bestChip").innerHTML="Best score: <b>"+getBest()+"</b>";
$("startBtn").addEventListener("click",start);
$("againBtn").addEventListener("click",start);
$("backBtn").addEventListener("click",function(){location.href="games"});
$("passBtn").addEventListener("click",function(){answer(true)});
$("failBtn").addEventListener("click",function(){answer(false)});
$("nextBtn").addEventListener("click",function(){if(lives<=0)over();else nextQ()});
})();
