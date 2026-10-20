(function(){
  "use strict";
  var $=function(i){return document.getElementById(i)};
  if(!$("dcWorkWeek"))return;
  var WEEKS={ "satsun":[0,6], "frisat":[5,6], "sunonly":[0] };
  var NAMES=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  function parseDate(v){if(!v)return null;var d=new Date(v+"T00:00:00");return isNaN(d.getTime())?null:d}
  function key(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
  function fmt(d){return NAMES[d.getDay()]+", "+MONTHS[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()}
  function holidays(){
    var raw=$("dcHolidays").value.split(/[\s,;]+/).filter(Boolean),set={},ok=0,bad=[];
    raw.forEach(function(t){
      if(/^\d{4}-\d{2}-\d{2}$/.test(t)&&parseDate(t)){if(!set[t]){set[t]=1;ok++}}else bad.push(t);
    });
    var msg=ok+" holiday"+(ok===1?"":"s")+" recognised";
    if(bad.length)msg+=". Not recognised (use YYYY-MM-DD): "+bad.slice(0,5).join(", ")+(bad.length>5?"\u2026":"");
    $("dcHolidayNote").textContent=msg;
    return set;
  }
  function isWorking(d,off,hol){return off.indexOf(d.getDay())<0&&!hol[key(d)]}
  function weekText(off){var w=[];for(var i=0;i<7;i++)if(off.indexOf(i)<0)w.push(NAMES[i].slice(0,3));return w.join(", ")}
  function update(){
    var off=WEEKS[$("dcWorkWeek").value]||WEEKS.satsun,hol=holidays();
    $("dcWeekNote").textContent="Working days: "+weekText(off)+". Non-working days: "+off.map(function(i){return NAMES[i]}).join(", ")+" and the holidays below.";
    // business-day add
    var start=parseDate($("dcStartDate").value),n=Math.round(parseFloat($("dcDays").value));
    if(!start||isNaN(n)){$("dcBizResult").textContent="\u2014"}
    else if(n===0){$("dcBizResult").textContent=fmt(start)}
    else{
      var step=n>0?1:-1,left=Math.abs(n),d=new Date(start.getTime()),guard=0;
      while(left>0&&guard<200000){d.setDate(d.getDate()+step);guard++;if(isWorking(d,off,hol))left--}
      $("dcBizResult").textContent=fmt(d);
    }
    // working days between A and B (days after the earlier date up to and including the later one)
    var a=parseDate($("dcDateA").value),b=parseDate($("dcDateB").value);
    if(!a||!b){$("dcWorkdays").textContent="\u2014"}
    else{
      var s=a<b?a:b,e=a<b?b:a,total=Math.round((e-s)/864e5),c=0,x=new Date(s.getTime());
      for(var i=0;i<total;i++){x.setDate(x.getDate()+1);if(isWorking(x,off,hol))c++}
      $("dcWorkdays").textContent=c+" days";
    }
  }
  ["dcWorkWeek","dcHolidays","dcStartDate","dcDays","dcDateA","dcDateB"].forEach(function(id){
    var e=$(id);e.addEventListener("input",update);e.addEventListener("change",update);
  });
  update();
})();
