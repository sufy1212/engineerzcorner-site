(function(){
  function el(id){ return document.getElementById(id); }
  function val(id){ var e=el(id); return e?e.value:null; }

  var LABELS={ gridtie:"Grid-Tie System", hybrid:"Hybrid System (Grid-Tie + Battery Backup)", offgrid:"Off-Grid System" };

  function calc(){
    var grid=val("gtGrid"), freq=val("gtOutageFreq"), dur=val("gtOutageDuration"),
        backup=val("gtBackup"), netm=val("gtNetMetering"), priority=val("gtPriority");

    var reasons=[];

    if(grid==="no"){
      renderResult("offgrid", "No utility grid is available at the site, so an off-grid system is the only option — the questions above beyond this point shape how much battery autonomy to design for, not which architecture to use.");
      return;
    }

    var score={ gridtie:2, hybrid:0, offgrid:0 };

    if(freq==="rare"){ score.gridtie+=2; reasons.push("outages are rare"); }
    else if(freq==="occasional"){ score.hybrid+=2; reasons.push("outages happen occasionally"); }
    else if(freq==="frequent"){ score.hybrid+=3; reasons.push("outages are frequent"); }

    if(dur==="short"){ score.gridtie+=1; }
    else if(dur==="medium"){ score.hybrid+=2; reasons.push("outages tend to run several hours"); }
    else if(dur==="long"){ score.hybrid+=3; score.offgrid+=1; reasons.push("outages can run over a day"); }

    if(backup==="none"){ score.gridtie+=3; reasons.push("no backup power is needed"); }
    else if(backup==="partial"){ score.hybrid+=3; reasons.push("critical loads need to stay powered"); }
    else if(backup==="whole"){ score.hybrid+=2; score.offgrid+=1; reasons.push("whole-site backup is wanted"); }

    if(netm==="yes"){ score.gridtie+=2; reasons.push("net metering is available and worthwhile"); }
    else if(netm==="no"){ score.hybrid+=1; score.offgrid+=1; }

    if(priority==="cost"){ score.gridtie+=2; reasons.push("lowest upfront cost is the priority"); }
    else if(priority==="resilience"){ score.hybrid+=2; score.offgrid+=1; reasons.push("energy independence is the priority"); }
    else if(priority==="balanced"){ score.hybrid+=1; }

    var best="gridtie";
    if(score.hybrid>score[best]) best="hybrid";
    if(score.offgrid>score[best]) best="offgrid";
    // grid is available, so off-grid only wins on an extreme resilience/backup combination — otherwise treat as hybrid
    if(best==="offgrid" && grid==="yes") best="hybrid";

    var reasonText = reasons.length
      ? "Based on your answers — " + reasons.slice(0,3).join(", ") + " — a " + LABELS[best].toLowerCase() + " is the closest fit."
      : "A " + LABELS[best].toLowerCase() + " fits your answers.";

    renderResult(best, reasonText);
  }

  function renderResult(type, reasonText){
    var banner=el("gtBanner"), text=el("gtBannerText"), reason=el("gtReason");
    banner.className="status-banner ok";
    text.textContent="Recommended: " + LABELS[type];
    reason.textContent=reasonText;
  }

  ["gtGrid","gtOutageFreq","gtOutageDuration","gtBackup","gtNetMetering","gtPriority"].forEach(function(id){
    var e=el(id);
    if(e) e.addEventListener("change", calc);
  });
  calc();
})();
