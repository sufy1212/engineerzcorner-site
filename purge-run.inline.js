(function(){"use strict";
var $=function(i){return document.getElementById(i)};
var KEY="ecrPurgeRunStars",C0=20.9;
var LEVELS=[
 {name:"Small reactor",V:5,Q:60,tmax:30,loc:10,mon:true,eta:1,pr:1,note:"Well-mixed vessel, continuous oxygen analyser."},
 {name:"Process tank",V:50,Q:100,tmax:60,loc:12,mon:false,eta:1,pr:1,note:"No continuous oxygen monitoring, so the larger margin applies."},
 {name:"Vessel with internals",V:10,Q:60,tmax:60,loc:5,mon:true,eta:0.5,pr:5,note:"Baffles cut the flow-through mixing factor to 0.5. The vessel is rated to 5 bar abs, so pressure-swing purging is allowed."},
 {name:"Dead-leg vessel",V:20,Q:60,tmax:45,loc:9.5,mon:false,eta:0.7,pr:1,note:"Dead legs give a mixing factor of 0.7, so a purge takes longer than the ideal formula says."},
 {name:"Large storage tank",V:200,Q:300,tmax:90,loc:11,mon:true,eta:0.8,pr:1,note:"Big atmospheric tank, mixing factor 0.8."}
];
function loadStars(){try{var a=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(a)?a:[]}catch(e){return[]}}
function saveStars(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
var stars=loadStars();
function starStr(n){n=n||0;return "\u2605".repeat(n)+"\u2606".repeat(3-n)}
function target(l){var loc=l.loc;if(l.mon)return loc>=5?loc-2:0.6*loc;return loc>=5?0.6*loc:0.4*loc}
function ruleText(l){var t=target(l);return l.mon?(l.loc>=5?"LOC "+l.loc+"% minus 2 points":"60% of LOC "+l.loc+"%"):(l.loc>=5?"60% of LOC "+l.loc+"%":"40% of LOC "+l.loc+"%")}
/* minimum nitrogen over the allowed methods */
function best(l){
 var Ct=target(l),N=Math.log(C0/Ct),res=null;
 var gd=l.V*N/l.eta,td=gd/l.Q*60;
 if(td<=l.tmax)res={gas:gd,how:"dilution"};
 for(var P=2;P<=l.pr;P++){var n=Math.ceil(Math.log(C0/Ct)/Math.log(P)-1e-9),g=n*(P-1)*l.V,t=n*((P-1)*l.V/l.Q*60+3);
  if(t<=l.tmax&&(!res||g<res.gas))res={gas:g,how:"pressure swing "+P+" bar, "+n+" cycles"}}
 return res;
}
var lv=null,idx=0,method="dil",cv,ctx,cw=340,ch=250,anim=null,lastDraw=null;
function show(id){["startScreen","gameScreen"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
function renderLevels(){
 var h="",tot=0;
 LEVELS.forEach(function(l,i){var s=stars[i]||0;tot+=s;
  h+='<button class="pr-level" data-i="'+i+'"><div><b>'+(i+1)+". "+l.name+'</b><span class="s">'+l.V+" m\u00B3 \u00B7 LOC "+l.loc+"% \u00B7 target "+(Math.round(target(l)*10)/10)+"% O\u2082</span></div><span class=\"pr-stars\">"+starStr(s)+"</span></button>"});
 $("levels").innerHTML=h;$("starTotal").innerHTML="Stars: <b>"+tot+" / "+LEVELS.length*3+"</b>";
 var b=document.querySelectorAll(".pr-level");for(var i=0;i<b.length;i++)b[i].addEventListener("click",function(){openLevel(parseInt(this.getAttribute("data-i"),10))});
}
function openLevel(i){
 idx=i;lv=LEVELS[i];method="dil";
 $("lvTitle").textContent=lv.name;$("lvNote").textContent=lv.note;
 $("brief").innerHTML='<div>Volume<b>'+lv.V+' m\u00B3</b></div><div>Max N\u2082 flow<b>'+lv.Q+' m\u00B3/h</b></div><div>Time limit<b>'+lv.tmax+' min</b></div><div>Target O\u2082<b>'+(Math.round(target(lv)*10)/10)+'%</b></div>';
 $("ruleLine").textContent="Target = "+ruleText(lv)+" ("+(lv.mon?"continuous monitoring":"no continuous monitoring")+"). Flow-through mixing factor "+lv.eta+".";
 var q=$("qIn");q.min=5;q.max=lv.Q;q.step=5;q.value=Math.round(lv.Q/2/5)*5;
 var t=$("tIn");t.min=1;t.max=lv.tmax;t.step=1;t.value=Math.round(lv.tmax/3);
 var p=$("pIn");p.min=2;p.max=Math.max(2,lv.pr);p.step=1;p.value=2;
 var n=$("nIn");n.min=1;n.max=8;n.step=1;n.value=3;
 $("btnPress").disabled=lv.pr<2;
 $("res").className="pr-fb hidden";$("nextBtn").classList.add("hidden");$("runBtn").classList.remove("hidden");$("runBtn").disabled=false;
 lastDraw=null;setMethod("dil");show("gameScreen");setup();preview();draw(null);
}
function setMethod(m){
 method=m;$("btnDil").classList.toggle("on",m==="dil");$("btnPress").classList.toggle("on",m==="pre");
 $("dilCtl").classList.toggle("hidden",m!=="dil");$("preCtl").classList.toggle("hidden",m!=="pre");preview();
}
function plan(){
 if(method==="dil"){var Q=+$("qIn").value,t=+$("tIn").value;return {Q:Q,t:t,gas:Q*t/60,T:t}}
 var P=+$("pIn").value,n=+$("nIn").value;return {P:P,n:n,gas:n*(P-1)*lv.V,T:n*((P-1)*lv.V/lv.Q*60+3)}
}
function preview(){
 if(!lv)return;var p=plan();
 if(method==="dil"){$("qVal").textContent=p.Q+" m\u00B3/h";$("tVal").textContent=p.t+" min";}
 else{$("pVal").textContent=p.P+" bar abs";$("nVal").textContent=p.n;}
 $("prev").textContent="Nitrogen used: "+(Math.round(p.gas*10)/10)+" m\u00B3 \u00B7 time: "+(Math.round(p.T*10)/10)+" min";
}
/* build a concentration curve [{t,c}] for the plan */
function curve(p,eta){
 var pts=[],i;
 if(method==="dil"){for(i=0;i<=120;i++){var t=p.t*i/120;pts.push({t:t,c:C0*Math.exp(-eta*p.Q*(t/60)/lv.V)})}}
 else{var c=C0,tt=0,tp=(p.P-1)*lv.V/lv.Q*60;
  for(var k=0;k<p.n;k++){for(i=0;i<=30;i++){var f=i/30,pr=1+(p.P-1)*f;pts.push({t:tt+tp*f,c:c/pr})}
   c=c/p.P;tt+=tp;pts.push({t:tt+3,c:c});tt+=3}}
 return pts;
}
function finalC(p){return method==="dil"?C0*Math.exp(-lv.eta*p.Q*(p.t/60)/lv.V):C0*Math.pow(1/p.P,p.n)}
function setup(){
 cv=$("cv");ctx=cv.getContext("2d");var dpr=window.devicePixelRatio||1;cw=cv.parentNode.clientWidth||340;ch=250;
 cv.style.height=ch+"px";cv.width=Math.round(cw*dpr);cv.height=Math.round(ch*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
}
function colorFor(c){var t=Math.max(0,Math.min(1,1-c/C0));return "rgb("+Math.round(235-(235-34)*t)+","+Math.round(240-(240-130)*t)+","+Math.round(245-(245-238)*t*0.9)+")"}
function draw(frac,pts,idealPts,p){
 ctx.clearRect(0,0,cw,ch);
 var cNow=C0,T=1,i;
 if(pts){T=pts[pts.length-1].t||1;var upto=frac*T;for(i=0;i<pts.length&&pts[i].t<=upto;i++)cNow=pts[i].c}
 // vessel strip
 var vx=14,vy=10,vw=cw-28,vh=54;
 ctx.fillStyle="#0b1226";ctx.fillRect(0,0,cw,ch);
 ctx.fillStyle=colorFor(cNow);ctx.strokeStyle="#9fb4cc";ctx.lineWidth=2;
 ctx.beginPath();ctx.moveTo(vx+16,vy);ctx.lineTo(vx+vw-16,vy);ctx.quadraticCurveTo(vx+vw,vy,vx+vw,vy+16);ctx.lineTo(vx+vw,vy+vh-16);ctx.quadraticCurveTo(vx+vw,vy+vh,vx+vw-16,vy+vh);ctx.lineTo(vx+16,vy+vh);ctx.quadraticCurveTo(vx,vy+vh,vx,vy+vh-16);ctx.lineTo(vx,vy+16);ctx.quadraticCurveTo(vx,vy,vx+16,vy);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle="#0b1226";ctx.font="700 15px monospace";ctx.textAlign="center";ctx.fillText("O\u2082 "+cNow.toFixed(1)+"%",vx+vw/2,vy+vh/2+5);
 // chart
 var gx=40,gy=84,gw=cw-54,gh=ch-84-26;
 ctx.fillStyle="#0e1730";ctx.fillRect(gx,gy,gw,gh);ctx.strokeStyle="#2b3a5c";ctx.lineWidth=1;ctx.strokeRect(gx,gy,gw,gh);
 var ymax=22,Tx=pts?pts[pts.length-1].t:lv.tmax; if(!pts)Tx=lv.tmax;
 var X=function(t){return gx+gw*t/Tx},Y=function(c){return gy+gh*(1-c/ymax)};
 ctx.font="10px monospace";ctx.textAlign="right";ctx.fillStyle="#8fa3c2";
 [0,5,10,15,20].forEach(function(v){ctx.fillText(v,gx-4,Y(v)+3);ctx.strokeStyle="#1b2744";ctx.beginPath();ctx.moveTo(gx,Y(v));ctx.lineTo(gx+gw,Y(v));ctx.stroke()});
 ctx.textAlign="center";ctx.fillText("minutes",gx+gw/2,ch-4);ctx.fillText("0",gx,ch-14);ctx.fillText(Math.round(Tx),gx+gw,ch-14);
 // LOC and target lines
 ctx.setLineDash([5,4]);ctx.lineWidth=1.5;ctx.strokeStyle="#f0475c";ctx.beginPath();ctx.moveTo(gx,Y(lv.loc));ctx.lineTo(gx+gw,Y(lv.loc));ctx.stroke();
 ctx.strokeStyle="#22d97a";var tg=target(lv);ctx.beginPath();ctx.moveTo(gx,Y(tg));ctx.lineTo(gx+gw,Y(tg));ctx.stroke();ctx.setLineDash([]);
 ctx.textAlign="left";ctx.fillStyle="#f0475c";ctx.fillText("LOC "+lv.loc+"%",gx+4,Y(lv.loc)-3);ctx.fillStyle="#22d97a";ctx.fillText("target "+(Math.round(tg*10)/10)+"%",gx+4,Y(tg)+11);
 if(pts){
  if(idealPts&&lv.eta<1&&method==="dil"){ctx.strokeStyle="#6b7a99";ctx.setLineDash([2,3]);ctx.beginPath();idealPts.forEach(function(q,j){j?ctx.lineTo(X(q.t),Y(q.c)):ctx.moveTo(X(q.t),Y(q.c))});ctx.stroke();ctx.setLineDash([])}
  var upto2=frac*T;ctx.strokeStyle="#22D3EE";ctx.lineWidth=2.5;ctx.beginPath();var started=false;
  for(i=0;i<pts.length;i++){if(pts[i].t>upto2)break;started?ctx.lineTo(X(pts[i].t),Y(pts[i].c)):(ctx.moveTo(X(pts[i].t),Y(pts[i].c)),started=true)}ctx.stroke();
 }
}
function run(){
 if(!lv)return;var p=plan();$("runBtn").disabled=true;
 var pts=curve(p,lv.eta),ideal=method==="dil"?curve(p,1):null;
 var t0=null,dur=3200;
 function step(ts){if(t0===null)t0=ts;var f=Math.min(1,(ts-t0)/dur);lastDraw=[f,pts,ideal,p];draw(f,pts,ideal,p);if(f<1)anim=requestAnimationFrame(step);else finish(p)}
 anim=requestAnimationFrame(step);
}
function finish(p){
 var Ct=target(lv),fc=finalC(p),okO=fc<=Ct+1e-9,okT=p.T<=lv.tmax+1e-9,okP=method==="dil"||p.P<=lv.pr;
 var b=best(lv),n=0,msg=[];
 msg.push("Final oxygen "+fc.toFixed(2)+"% against a target of "+(Math.round(Ct*10)/10)+"% ("+(okO?"reached":"not reached")+"). Time "+(Math.round(p.T*10)/10)+" min of "+lv.tmax+" ("+(okT?"ok":"too long")+"). Nitrogen used "+(Math.round(p.gas*10)/10)+" m\u00B3.");
 if(okO&&okT&&okP){var r=p.gas/b.gas;n=r<=1.2?3:r<=1.6?2:1;
  msg.push(n===3?"Within 20% of the least nitrogen possible ("+(Math.round(b.gas*10)/10)+" m\u00B3 by "+b.how+").":"The least nitrogen possible here is about "+(Math.round(b.gas*10)/10)+" m\u00B3 ("+b.how+").")}
 else{
  if(!okO&&method==="dil"){var need=lv.V*Math.log(C0/Ct)/lv.eta;msg.push("Dilution needs N = ln("+C0+"/"+(Math.round(Ct*10)/10)+") = "+Math.log(C0/Ct).toFixed(2)+" turnovers, and with a mixing factor of "+lv.eta+" that means about "+(Math.round(need*10)/10)+" m\u00B3 of nitrogen.")}
  if(!okO&&method==="pre"){msg.push("Each cycle divides the oxygen by "+p.P+". You need at least "+Math.ceil(Math.log(C0/Ct)/Math.log(p.P)-1e-9)+" cycles at "+p.P+" bar abs.")}
  if(!okT)msg.push("Too slow: raise the flow or use fewer, cheaper cycles.");
 }
 var head=n===3?"Three stars":n===2?"Purged safely":n===1?"Purged, but wasteful":"Not safe to open";
 $("res").className="pr-fb "+(n>0?"ok":"bad");$("res").innerHTML='<b class="v">'+head+" \u2014 "+starStr(n)+"</b>"+msg.join(" ");
 if(n>(stars[idx]||0)){stars[idx]=n;saveStars(stars)}
 $("runBtn").classList.add("hidden");$("nextBtn").textContent=n>0?(idx<LEVELS.length-1?"Next vessel":"Back to vessels"):"Try again";$("nextBtn").setAttribute("data-pass",n>0?"1":"0");$("nextBtn").classList.remove("hidden");
}
["qIn","tIn","pIn","nIn"].forEach(function(id){$(id).addEventListener("input",preview)});
$("btnDil").addEventListener("click",function(){setMethod("dil")});
$("btnPress").addEventListener("click",function(){if(!this.disabled)setMethod("pre")});
$("runBtn").addEventListener("click",run);
$("nextBtn").addEventListener("click",function(){var pass=this.getAttribute("data-pass")==="1";cancelAnimationFrame(anim);if(!pass){openLevel(idx);return}if(idx<LEVELS.length-1)openLevel(idx+1);else{renderLevels();show("startScreen")}});
$("menuBtn").addEventListener("click",function(){cancelAnimationFrame(anim);renderLevels();show("startScreen")});
window.addEventListener("resize",function(){if(lv&&!$("gameScreen").classList.contains("hidden")){setup();if(lastDraw)draw.apply(null,lastDraw);else draw(null)}});
renderLevels();
window.__purge={LEVELS:LEVELS,target:target,best:best};
})();
