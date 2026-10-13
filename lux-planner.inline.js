(function(){"use strict";
var $=function(i){return document.getElementById(i)};
var KEY="ecrLuxPlannerStars";
var LEVELS=[
 {name:"Open-plan office",W:5,L:6,h:2.15,phi:3600,target:500,uo:0.6,note:"EN 12464-1 office: 500 lux, Uo 0.60"},
 {name:"Reception",W:4,L:5,h:2.15,phi:3600,target:300,uo:0.6,note:"Reception desk: 300 lux, Uo 0.60"},
 {name:"Corridor",W:2,L:12,h:1.9,phi:1800,target:100,uo:0.4,note:"Corridor: 100 lux, Uo 0.40"},
 {name:"Classroom",W:7,L:8,h:2.15,phi:3600,target:500,uo:0.6,note:"Teaching space: 500 lux, Uo 0.60"},
 {name:"Warehouse bay",W:10,L:16,h:5.5,phi:12000,target:200,uo:0.4,note:"Storage: 200 lux, Uo 0.40"}
];
var MF=0.8,REFL=1.2,SNAP=0.25,RES=0.2,BORDER=0.5,EFFICACY=100;
function loadStars(){try{var a=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(a)?a:[]}catch(e){return[]}}
function saveStars(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
var stars=loadStars();
function starStr(n){n=n||0;return "\u2605".repeat(n)+"\u2606".repeat(3-n)}

/* Direct light from Lambertian point sources: E = (phi/pi) * h^2 / d^4, times MF and a reflection allowance */
function calc(lv,pts){
 var nx=Math.round(lv.L/RES),ny=Math.round(lv.W/RES),cells=new Float32Array(nx*ny),k=MF*REFL*lv.phi/Math.PI,h2=lv.h*lv.h,sum=0,n=0,mn=1e9;
 for(var i=0;i<nx;i++){var x=(i+.5)*RES;
  for(var j=0;j<ny;j++){var y=(j+.5)*RES,e=0;
   for(var p=0;p<pts.length;p++){var dx=x-pts[p][0],dy=y-pts[p][1],d2=dx*dx+dy*dy+h2;e+=h2/(d2*d2)}
   e*=k;cells[i*ny+j]=e;
   if(x>=BORDER&&x<=lv.L-BORDER&&y>=BORDER&&y<=lv.W-BORDER){sum+=e;n++;if(e<mn)mn=e}
  }}
 var avg=n?sum/n:0;return {cells:cells,nx:nx,ny:ny,avg:avg,min:n?mn:0,uo:avg?mn/avg:0};
}
function snap(v){return Math.round(v/SNAP)*SNAP}
function gridPts(lv,gx,gy){var a=[];for(var i=0;i<gx;i++)for(var j=0;j<gy;j++)a.push([snap((i+.5)*lv.L/gx),snap((j+.5)*lv.W/gy)]);return a}
function meets(lv,r){return r.avg>=lv.target&&r.uo>=lv.uo}
function solvePar(lv){
 for(var c=1;c<=80;c++){
  for(var gx=1;gx<=c;gx++){if(c%gx)continue;var gy=c/gx;
   if(gx>14||gy>14)continue;
   if(meets(lv,calc(lv,gridPts(lv,gx,gy))))return c;
  }}
 return 40;
}
var lv=null,idx=0,pts=[],par=0,maxN=0,res=null,cv,ctx,sc,ox,oy,cw,ch,checked=false;
function show(id){["startScreen","gameScreen"].forEach(function(x){$(x).classList.toggle("hidden",x!==id)})}
function renderLevels(){
 var h="",tot=0;
 LEVELS.forEach(function(l,i){var s=stars[i]||0;tot+=s;
  h+='<button class="lp-level" data-i="'+i+'"><div><b>'+(i+1)+". "+l.name+'</b><span class="s">'+l.W+" \u00D7 "+l.L+" m \u00B7 "+l.note+'</span></div><span class="lp-stars">'+starStr(s)+'</span></button>'});
 $("levels").innerHTML=h;$("starTotal").innerHTML="Stars: <b>"+tot+" / "+LEVELS.length*3+"</b>";
 var b=document.querySelectorAll(".lp-level");for(var i=0;i<b.length;i++)b[i].addEventListener("click",function(){openLevel(parseInt(this.getAttribute("data-i"),10))});
}
function openLevel(i){
 idx=i;lv=LEVELS[i];pts=[];checked=false;par=solvePar(lv);maxN=Math.min(80,par+8);
 $("lvTitle").textContent=lv.name;
 $("lvSpec").innerHTML="Room "+lv.L+" \u00D7 "+lv.W+" m \u00B7 height above work plane "+lv.h+" m \u00B7 fitting "+lv.phi+" lm";
 $("lvGoal").innerHTML="Target <b>"+lv.target+" lux</b> average with Uo \u2265 <b>"+lv.uo+"</b>";
 $("fb").className="lp-fb hidden";$("nextBtn").classList.add("hidden");$("checkBtn").classList.remove("hidden");
 show("gameScreen");setup();update();
}
function setup(){
 cv=$("cv");ctx=cv.getContext("2d");
 var dpr=window.devicePixelRatio||1;cw=cv.parentNode.clientWidth||320;
 sc=cw/lv.L;var rh=lv.W*sc;ch=Math.max(rh+16,120);oy=(ch-rh)/2;ox=0;
 cv.style.height=ch+"px";cv.width=Math.round(cw*dpr);cv.height=Math.round(ch*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
}
function colour(e){var t=Math.min(e/(lv.target*1.6),1);var hue=225-210*t;return "hsl("+hue.toFixed(0)+",70%,"+(18+30*t).toFixed(0)+"%)"}
function draw(){
 ctx.clearRect(0,0,cw,ch);
 var cs=RES*sc+0.6;
 for(var i=0;i<res.nx;i++)for(var j=0;j<res.ny;j++){ctx.fillStyle=colour(res.cells[i*res.ny+j]);ctx.fillRect(ox+i*RES*sc,oy+j*RES*sc,cs,cs)}
 ctx.strokeStyle="rgba(255,255,255,.55)";ctx.setLineDash([4,4]);ctx.strokeRect(ox+BORDER*sc,oy+BORDER*sc,(lv.L-2*BORDER)*sc,(lv.W-2*BORDER)*sc);ctx.setLineDash([]);
 ctx.strokeStyle="#fff";ctx.lineWidth=2;ctx.strokeRect(ox,oy,lv.L*sc,lv.W*sc);
 var s=Math.max(8,Math.min(0.6*sc,22));
 pts.forEach(function(p){var x=ox+p[0]*sc,y=oy+p[1]*sc;ctx.fillStyle="#fff";ctx.fillRect(x-s/2,y-s/2,s,s);ctx.strokeStyle="#0b1226";ctx.lineWidth=1.5;ctx.strokeRect(x-s/2,y-s/2,s,s)});
}
function stat(id,val,ok){var e=$(id);e.classList.remove("ok","bad");if(ok===true)e.classList.add("ok");if(ok===false)e.classList.add("bad");e.querySelector("b").textContent=val}
function update(){
 res=calc(lv,pts);draw();
 stat("stAvg",Math.round(res.avg)+" lx",pts.length?res.avg>=lv.target:null);
 stat("stUo",res.uo.toFixed(2),pts.length?res.uo>=lv.uo:null);
 stat("stN",pts.length+" / "+maxN,null);
 stat("stW",(pts.length*lv.phi/EFFICACY/(lv.L*lv.W)).toFixed(1)+" W/m\u00B2",null);
}
function tap(ev){
 if(checked)return;
 var r=cv.getBoundingClientRect(),cx=(ev.clientX-r.left)*(cw/r.width),cy=(ev.clientY-r.top)*(ch/r.height);
 var x=(cx-ox)/sc,y=(cy-oy)/sc;
 if(x<0||y<0||x>lv.L||y>lv.W)return;
 for(var i=0;i<pts.length;i++){if(Math.abs(pts[i][0]-x)<0.45&&Math.abs(pts[i][1]-y)<0.45){pts.splice(i,1);update();return}}
 if(pts.length>=maxN){toast("Maximum "+maxN+" fittings for this room");return}
 pts.push([Math.min(lv.L-SNAP,Math.max(SNAP,snap(x))),Math.min(lv.W-SNAP,Math.max(SNAP,snap(y)))]);update();
}
var tt;function toast(m){var t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("show")},1500)}
function check(){
 if(!pts.length){toast("Place some fittings first");return}
 var okAvg=res.avg>=lv.target,okUo=res.uo>=lv.uo,n=0,msg,cls;
 if(okAvg&&okUo){n=pts.length<=par?3:2}else if(okAvg){n=1}
 var head=n===3?"Three stars":n===2?"Passed":n===1?"Average met, uniformity failed":"Too dark";
 var lines=[];
 lines.push("Average "+Math.round(res.avg)+" lux against a "+lv.target+" lux target ("+(okAvg?"ok":"low")+"). Uo = "+res.min.toFixed(0)+" / "+res.avg.toFixed(0)+" = "+res.uo.toFixed(2)+" against "+lv.uo+" ("+(okUo?"ok":"low")+"). Measured inside a 0.5 m border, as the task area is.");
 if(!okAvg)lines.push("Add fittings or move them closer together.");
 else if(!okUo)lines.push("Uo is the minimum divided by the average. Spread the fittings evenly and avoid big gaps; a symmetrical grid works best.");
 else if(n===2)lines.push("A uniform grid can do it with "+par+" fittings; you used "+pts.length+".");
 else lines.push("A uniform grid needs "+par+" fittings, and you matched or beat that.");
 $("fb").className="lp-fb "+(n>=2?"ok":"bad");$("fb").innerHTML='<b class="v">'+head+" \u2014 "+starStr(n)+"</b>"+lines.join(" ");
 if(n>(stars[idx]||0)){stars[idx]=n;saveStars(stars)}
 checked=true;$("checkBtn").classList.add("hidden");$("nextBtn").textContent=n>=2?(idx<LEVELS.length-1?"Next room":"Back to rooms"):"Try again";$("nextBtn").classList.remove("hidden");
 $("nextBtn").setAttribute("data-pass",n>=2?"1":"0");
}
$("cv").addEventListener("pointerdown",function(e){e.preventDefault();tap(e)});
$("checkBtn").addEventListener("click",check);
$("clearBtn").addEventListener("click",function(){if(checked)return;pts=[];update()});
$("undoBtn").addEventListener("click",function(){if(checked)return;pts.pop();update()});
$("nextBtn").addEventListener("click",function(){
 var pass=this.getAttribute("data-pass")==="1";
 if(!pass){openLevel(idx);return}
 if(idx<LEVELS.length-1)openLevel(idx+1);else{renderLevels();show("startScreen")}
});
$("menuBtn").addEventListener("click",function(){renderLevels();show("startScreen")});
window.addEventListener("resize",function(){if(lv&&!$("gameScreen").classList.contains("hidden")){setup();draw()}});
renderLevels();
})();
