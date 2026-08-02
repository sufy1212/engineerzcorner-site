(function(){
  var FALLBACK_ITEMS=[
    {t:"MPPT vs PWM Solar Charge Controllers: What Actually Changes",u:"posts/mppt-vs-pwm-solar-charge-controllers",d:"2026-07-31"},
    {t:"Solar Panel Derating: Why Nameplate Wattage Isn't What You Get",u:"posts/solar-panel-derating-factors-explained",d:"2026-07-31"},
    {t:"Flame Retardant vs Flame Resistant Cables: Know the Difference",u:"posts/flame-retardant-vs-flame-resistant-cables",d:"2026-07-30"}
  ];
  var MAX_ITEMS=8, NEW_DAYS=14;

  function fmtDate(d){
    var dt=new Date(d+"T00:00:00");
    if(isNaN(dt.getTime()))return "";
    return dt.toLocaleDateString("en-US",{month:"short",day:"numeric"});
  }

  function render(items){
    var track=document.getElementById("wnTickerTrack");
    if(!track)return;
    var now=new Date();
    items=items.slice().sort(function(a,b){return new Date(b.d)-new Date(a.d);}).slice(0,MAX_ITEMS);
    if(!items.length){items=FALLBACK_ITEMS;}

    function buildRun(){
      var frag=document.createDocumentFragment();
      items.forEach(function(item){
        var ageDays=(now-new Date(item.d+"T00:00:00"))/864e5;
        var a=document.createElement("a");
        a.className="wn-ticker-item";
        a.href=item.u;
        var badge=ageDays<=NEW_DAYS?"<b>NEW</b> ":"";
        var date=fmtDate(item.d);
        a.innerHTML=badge+item.t+(date?' <span style="color:#6b6e96">— '+date+'</span>':"");
        frag.appendChild(a);
        var sep=document.createElement("span");
        sep.className="wn-ticker-sep";
        sep.textContent="\u25C6";
        frag.appendChild(sep);
      });
      return frag;
    }

    // build the run twice back-to-back so translate(-50%) loops seamlessly
    track.appendChild(buildRun());
    track.appendChild(buildRun());
  }

  function build(){
    fetch("assets/recent.json",{cache:"no-store"}).then(function(r){
      if(!r.ok)throw 0;
      return r.json();
    }).then(function(items){
      render(items && items.length ? items : FALLBACK_ITEMS);
    }).catch(function(){
      render(FALLBACK_ITEMS);
    });
  }

  document.addEventListener("DOMContentLoaded", build);
})();
