(function(){"use strict";
var $=function(i){return document.getElementById(i)};
var KEY="ecrTuneTankStars",SP=55,START=20,BASE=30,KICK=35,KT=60,KD=9,TEND=120,DT=0.05;
var LEVELS=[
 {name:"Default tank",Kf:16,tau:1.0,note:"A medium tank: the valves move 16 %level per second at full open.",
  specs:[{id:"over",label:"Start-up overshoot",lim:3,unit:"pts",cmp:"le"},{id:"settle",label:"Settles within \u00B12 points",lim:12,unit:"s",cmp:"le"},{id:"dip",label:"Dip after the draw-off at 60 s",lim:6,unit:"pts",cmp:"le"}]},
 {name:"Small fast tank",Kf:40,tau:1.0,note:"A small tank: the same valve move changes the level 2.5 times faster.",
  specs:[{id:"over",label:"Start-up overshoot",lim:5,unit:"pts",cmp:"le"},{id:"settle",label:"Settles within \u00B12 points",lim:12,unit:"s",cmp:"le"},{id:"dip",label:"Dip after the draw-off",lim:9,unit:"pts",cmp:"le"}]},
 {name:"Large slow tank",Kf:5,tau:1.5,note:"A big tank with slow valves. Gains that worked on the default tank will not work here.",
  specs:[{id:"over",label:"Start-up overshoot",lim:3,unit:"pts",cmp:"le"},{id:"settle",label:"Settles within \u00B12 points",lim:20,unit:"s",cmp:"le"},{id:"dip",label:"Dip after the draw-off",lim:5,unit:"pts",cmp:"le"}]},
 {name:"Surge tank (averaging)",Kf:16,tau:1.0,note:"This tank protects the upstream plant. Keep the inlet valve calm while the level stays in its band.",
  specs:[{id:"over",label:"Start-up overshoot",lim:10,unit:"pts",cmp:"le"},{id:"dip",label:"Dip after the draw-off (level stays above 35%)",lim:20,unit:"pts",cmp:"le"},{id:"rate",label:"Fastest inlet valve move during the draw-off",lim:8,unit:"%/s",cmp:"le"}]}
];
function loadStars(){try{var a=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(a)?a:[]}catch(e){return[]}}
function saveStars(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
var stars=loadStars();
function starStr(n){n=n||0;return "\u2605".repeat(n)+"\u2606".repeat(3-n)}
/* plant: level changes by (inlet - outlet) * Kf/100 per second; valves follow with first-order lag tau; PI with simple clamping anti-windup */
function simulate(lv,kp,ki){
 var level=START,vi=BASE,vo=BASE,integ=0,n=Math.round(TEND/DT),L=new Float32Array(n),U=new Float32Array(n),O=new Float32Array(n);
 for(var i=0;i<n;i++){
  var t=i*DT,err=SP-level,raw=integ+err*DT,u=kp*err+ki*raw,o=Math.max(0,Math.min(100,u));
  if(!((o===100&&err>0)||(o===0&&err<0)))integ=raw;
  var tgt=(t>=KT&&t<KT+KD)?Math.min(100,BASE+KICK):BASE;
  vi+=(o-vi)*DT/lv.tau;vo+=(tgt-vo)*DT/lv.tau;
  level=Math.max(0,Math.min(100,level+(vi/100*lv.Kf-vo/100*lv.Kf)*DT));
  L[i]=level;U[i]=vi;O[i]=vo;
 }
 return {L:L,U:U,O:O,n:n};
}
function metrics(r){
 var k60=Math.round(KT/DT),k110=Math.round(110/DT),i,over=0,last=-1,mn=1e9,rate=0;
 for(i=0;i<k60;i++){if(r.L[i]-SP>over)over=r.L[i]-SP;if(Math.abs(r.L[i]-SP)>2)last=i}
 var settle=last<k60-1?(last+1)*DT:Infinity;
 for(i=k60;i<k110;i++){if(r.L[i]<mn)mn=r.L[i];if(i>k60){var d=Math.abs(r.U[i]-r.U[i-1])/DT;if(d>rate)rate=d}}
 return {over:over,settle:settle,dip:SP-mn,rate:rate};
}
var lv=null,idx=0,cv,ctx,cw=340,ch=270,anim=null,lastDraw=null;
function show(id){["startScreen","gameScreen"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
function renderLevels(){
 var h="",tot=0;
 LEVELS.forEach(function(l,i){var s=stars[i]||0;tot+=s;
  h+='<button class="tt-level" data-i="'+i+'"><div><b>'+(i+1)+". "+l.name+'</b><span class="s">Valve gain '+l.Kf+" %/s \u00B7 "+l.specs.length+" specs</span></div><span class=\"tt-stars\">"+starStr(s)+"</span></button>"});
 $("levels").innerHTML=h;$("starTotal").innerHTML="Stars: <b>"+tot+" / "+LEVELS.length*3+"</b>";
 var b=document.querySelectorAll(".tt-level");for(var i=0;i<b.length;i++)b[i].addEventListener("click",function(){openLevel(parseInt(this.getAttribute("data-i"),10))});
}
function openLevel(i){
 idx=i;lv=LEVELS[i];lastDraw=null;
 $("lvTitle").textContent=lv.name;$("lvNote").textContent=lv.note;
 var sp="";lv.specs.forEach(function(s){sp+='<div class="tt-spec" id="spec_'+s.id+'"><span>'+s.label+' \u2264 '+s.lim+' '+s.unit+'</span><b id="val_'+s.id+'">\u2014</b></div>'});
 $("specs").innerHTML=sp;
 var K=lv.Kf/100;$("hint").innerHTML="Plant gain K = "+K.toFixed(2)+" %level/s per %valve. With u = Kp\u00B7e + Ki\u00B7\u222Be, damping \u03B6 \u2248 (Kp/2)\u00B7\u221A(K/Ki), so Ki \u2264 K\u00B7Kp\u00B2/4 avoids overshoot. P-only leaves an offset of demand/Kp.";
 $("kpIn").value=lv.Kf===16&&i===0?4:(i===2?4:2);$("kiIn").value=0.3;
 $("res").className="tt-fb hidden";$("nextBtn").classList.add("hidden");$("runBtn").classList.remove("hidden");$("runBtn").disabled=false;
 show("gameScreen");setup();preview();draw(null);
}
function preview(){$("kpVal").textContent=(+$("kpIn").value).toFixed(1);$("kiVal").textContent=(+$("kiIn").value).toFixed(2)}
function setup(){
 cv=$("cv");ctx=cv.getContext("2d");var dpr=window.devicePixelRatio||1;cw=cv.parentNode.clientWidth||340;ch=270;
 cv.style.height=ch+"px";cv.width=Math.round(cw*dpr);cv.height=Math.round(ch*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
}
function draw(frac,r){
 ctx.fillStyle="#0b1226";ctx.fillRect(0,0,cw,ch);
 var tx=10,ty=14,tw=50,th=ch-40;
 var k=r?Math.max(0,Math.min(r.n-1,Math.floor(frac*(r.n-1)))):0;
 var level=r?r.L[k]:START,vi=r?r.U[k]:BASE,vo=r?r.O[k]:BASE;
 // tank
 ctx.fillStyle="#22D3EE";ctx.globalAlpha=0.75;var fh=th*level/100;ctx.fillRect(tx,ty+th-fh,tw,fh);ctx.globalAlpha=1;
 ctx.strokeStyle="#cfe0f5";ctx.lineWidth=2;ctx.strokeRect(tx,ty,tw,th);
 ctx.setLineDash([4,3]);ctx.strokeStyle="#22d97a";ctx.beginPath();var sy=ty+th*(1-SP/100);ctx.moveTo(tx-4,sy);ctx.lineTo(tx+tw+4,sy);ctx.stroke();ctx.setLineDash([]);
 ctx.fillStyle="#cfe0f5";ctx.font="700 11px monospace";ctx.textAlign="center";ctx.fillText(level.toFixed(0)+"%",tx+tw/2,ty+th+14);
 // inlet / outlet arrows scaled by valve position
 ctx.fillStyle="#F97316";var aw=2+vi/100*10;ctx.fillRect(tx+tw/2-aw/2,ty-10,aw,10);
 ctx.fillStyle="#9fb4cc";var ow=2+vo/100*10;ctx.fillRect(tx+tw,ty+th-ow-4,10,ow);
 // chart
 var gx=84,gy=14,gw=cw-gx-10,gh=ch-40;
 ctx.fillStyle="#0e1730";ctx.fillRect(gx,gy,gw,gh);ctx.strokeStyle="#2b3a5c";ctx.lineWidth=1;ctx.strokeRect(gx,gy,gw,gh);
 var X=function(t){return gx+gw*t/TEND},Y=function(v){return gy+gh*(1-v/100)};
 ctx.font="10px monospace";ctx.fillStyle="#8fa3c2";ctx.textAlign="right";
 [0,25,50,75,100].forEach(function(v){ctx.fillText(v,gx-4,Y(v)+3);ctx.strokeStyle="#1b2744";ctx.beginPath();ctx.moveTo(gx,Y(v));ctx.lineTo(gx+gw,Y(v));ctx.stroke()});
 ctx.textAlign="center";ctx.fillText("seconds",gx+gw/2,ch-4);ctx.fillText("0",gx,ch-18);ctx.fillText(TEND,gx+gw,ch-18);
 ctx.fillStyle="rgba(240,71,92,.14)";ctx.fillRect(X(KT),gy,X(KT+KD)-X(KT),gh);
 ctx.fillStyle="#f0475c";ctx.textAlign="left";ctx.fillText("draw-off",X(KT)+2,gy+11);
 ctx.fillStyle="rgba(34,217,122,.12)";ctx.fillRect(gx,Y(SP+2),gw,Y(SP-2)-Y(SP+2));
 ctx.setLineDash([5,4]);ctx.strokeStyle="#22d97a";ctx.beginPath();ctx.moveTo(gx,Y(SP));ctx.lineTo(gx+gw,Y(SP));ctx.stroke();ctx.setLineDash([]);
 if(r){
  var m=Math.floor(frac*(r.n-1)),step=Math.max(1,Math.floor(r.n/360)),i;
  ctx.strokeStyle="#F97316";ctx.lineWidth=1.5;ctx.beginPath();for(i=0;i<=m;i+=step){var xx=X(i*DT);i?ctx.lineTo(xx,Y(r.U[i])):ctx.moveTo(xx,Y(r.U[i]))}ctx.stroke();
  ctx.strokeStyle="#22D3EE";ctx.lineWidth=2.5;ctx.beginPath();for(i=0;i<=m;i+=step){var x2=X(i*DT);i?ctx.lineTo(x2,Y(r.L[i])):ctx.moveTo(x2,Y(r.L[i]))}ctx.stroke();
 }
 ctx.fillStyle="#22D3EE";ctx.textAlign="left";ctx.fillText("level",gx+4,gy+gh-18);ctx.fillStyle="#F97316";ctx.fillText("inlet valve",gx+44,gy+gh-18);
}
function run(){
 var kp=+$("kpIn").value,ki=+$("kiIn").value;$("runBtn").disabled=true;
 var r=simulate(lv,kp,ki),m=metrics(r),t0=null,dur=6000;
 function step(ts){if(t0===null)t0=ts;var f=Math.min(1,(ts-t0)/dur);lastDraw=[f,r];draw(f,r);if(f<1)anim=requestAnimationFrame(step);else finish(m,kp,ki)}
 anim=requestAnimationFrame(step);
}
function finish(m,kp,ki){
 var met=0;
 lv.specs.forEach(function(s){
  var v=m[s.id],ok=v<=s.lim+1e-9;if(ok)met++;
  var txt=v===Infinity?"never":(s.id==="settle"?v.toFixed(1)+" s":s.id==="rate"?v.toFixed(1)+" %/s":v.toFixed(1)+" pts");
  $("val_"+s.id).textContent=txt;$("spec_"+s.id).className="tt-spec "+(ok?"ok":"bad");
 });
 var n=met,head=n===3?"All specs met":n===2?"Passed":n===1?"One spec met":"No specs met";
 var tips=[];
 if(m.over>lv.specs[0].lim&&m.over<1e9&&lv.specs[0].id==="over")tips.push("Overshoot: ring-down means too little damping. Raise Kp or lower Ki.");
 if(m.settle===Infinity&&lv.specs.some(function(s){return s.id==="settle"}))tips.push("Never settled: with Ki near zero the P-only offset stays, and with large Ki the level keeps ringing.");
 if(m.dip>lv.specs.filter(function(s){return s.id==="dip"})[0].lim)tips.push("A deeper dip means a weaker Kp: the controller reacts too late to the draw-off.");
 if(lv.specs.some(function(s){return s.id==="rate"})&&m.rate>8)tips.push("The inlet valve moved too fast: averaging control wants a lower Kp.");
 $("res").className="tt-fb "+(n>=2?"ok":"bad");$("res").innerHTML='<b class="v">'+head+" \u2014 "+starStr(n)+"</b>Kp = "+kp.toFixed(1)+", Ki = "+ki.toFixed(2)+". "+tips.join(" ");
 if(n>(stars[idx]||0)){stars[idx]=n;saveStars(stars)}
 $("runBtn").classList.add("hidden");$("nextBtn").textContent=n>=2?(idx<LEVELS.length-1?"Next tank":"Back to tanks"):"Retune";$("nextBtn").setAttribute("data-pass",n>=2?"1":"0");$("nextBtn").classList.remove("hidden");
}
["kpIn","kiIn"].forEach(function(id){$(id).addEventListener("input",preview)});
$("runBtn").addEventListener("click",run);
$("nextBtn").addEventListener("click",function(){var pass=this.getAttribute("data-pass")==="1";cancelAnimationFrame(anim);
 if(!pass){$("res").className="tt-fb hidden";lv.specs.forEach(function(s){$("val_"+s.id).textContent="\u2014";$("spec_"+s.id).className="tt-spec"});this.classList.add("hidden");$("runBtn").classList.remove("hidden");$("runBtn").disabled=false;draw(null);lastDraw=null;return}
 if(idx<LEVELS.length-1)openLevel(idx+1);else{renderLevels();show("startScreen")}});
$("menuBtn").addEventListener("click",function(){cancelAnimationFrame(anim);renderLevels();show("startScreen")});
window.addEventListener("resize",function(){if(lv&&!$("gameScreen").classList.contains("hidden")){setup();if(lastDraw)draw.apply(null,lastDraw);else draw(null)}});
renderLevels();
window.__tt={LEVELS:LEVELS,simulate:simulate,metrics:metrics};
})();
