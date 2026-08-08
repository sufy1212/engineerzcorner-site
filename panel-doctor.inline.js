(function(){"use strict";
function svgWrap(inner){return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+inner+"</svg>"}

var ICONS={
psu:{
  ok:svgWrap('<rect x="10" y="10" width="44" height="44" rx="5"/><path d="M34,16 L22,36 L32,36 L28,48 L44,26 L34,26 Z" fill="currentColor" stroke="none"/>'),
  fault:svgWrap('<rect x="10" y="10" width="44" height="44" rx="5" stroke="#FF5252"/><path d="M34,16 L22,36 L32,36 L26,48" stroke="#FF5252" stroke-width="2.4"/><path d="M40,30 L48,24 M44,36 L52,32" stroke="#FFC24B" stroke-width="2"/>')
},
plc:{
  ok:svgWrap('<rect x="8" y="10" width="48" height="44" rx="4"/><rect x="14" y="18" width="8" height="6" rx="1" fill="currentColor"/><rect x="26" y="18" width="8" height="6" rx="1" fill="currentColor"/><rect x="38" y="18" width="8" height="6" rx="1" fill="currentColor"/><line x1="14" y1="34" x2="50" y2="34"/><line x1="14" y1="42" x2="50" y2="42"/>'),
  fault:svgWrap('<rect x="8" y="10" width="48" height="44" rx="4" stroke="#FF5252"/><rect x="14" y="18" width="8" height="6" rx="1" fill="#FF5252" stroke="none"/><rect x="26" y="18" width="8" height="6" rx="1" fill="currentColor"/><rect x="38" y="18" width="8" height="6" rx="1" fill="currentColor"/><line x1="14" y1="34" x2="50" y2="34"/><path d="M14,42 L50,42" stroke="#FF5252"/><path d="M4,26 L10,30 L4,34" stroke="#FFC24B" stroke-width="2"/>')
},
io:{
  ok:svgWrap('<rect x="8" y="14" width="48" height="36" rx="4"/><circle cx="18" cy="44" r="3" fill="currentColor"/><circle cx="28" cy="44" r="3" fill="currentColor"/><circle cx="38" cy="44" r="3" fill="currentColor"/><circle cx="48" cy="44" r="3" fill="currentColor"/><line x1="14" y1="24" x2="50" y2="24"/>'),
  fault:svgWrap('<rect x="8" y="14" width="48" height="36" rx="4" stroke="#FF5252"/><circle cx="18" cy="44" r="3" fill="currentColor"/><circle cx="28" cy="44" r="3" fill="#FF5252" stroke="none"/><circle cx="38" cy="44" r="3" fill="currentColor"/><circle cx="48" cy="44" r="3" fill="currentColor"/><line x1="14" y1="24" x2="50" y2="24" stroke="#FF5252"/><path d="M24,34 L28,40 L32,34" stroke="#FFC24B" stroke-width="2"/>')
},
relay:{
  ok:svgWrap('<rect x="12" y="10" width="20" height="26" rx="3"/><line x1="22" y1="16" x2="22" y2="30" stroke-width="2"/><path d="M38,16 L52,16 M38,32 L52,32" stroke-width="2.5"/><path d="M38,16 L48,32" stroke-width="2.5"/>'),
  fault:svgWrap('<rect x="12" y="10" width="20" height="26" rx="3" stroke="#FF5252"/><line x1="22" y1="16" x2="22" y2="30" stroke-width="2" stroke="#FF5252"/><path d="M38,24 L52,24" stroke="#FF5252" stroke-width="3"/><path d="M40,14 L46,20 L40,26" stroke="#FFC24B" stroke-width="2"/>')
},
contactor:{
  ok:svgWrap('<rect x="22" y="6" width="20" height="14" rx="3"/><line x1="14" y1="30" x2="14" y2="52" stroke-width="2.5"/><line x1="32" y1="30" x2="32" y2="52" stroke-width="2.5"/><line x1="50" y1="30" x2="50" y2="52" stroke-width="2.5"/><path d="M10,38 L18,38 M28,38 L36,38 M46,38 L54,38" stroke-width="2.5"/>'),
  fault:svgWrap('<rect x="22" y="6" width="20" height="14" rx="3" stroke="#FF5252"/><line x1="14" y1="30" x2="14" y2="52" stroke-width="2.5"/><path d="M28,30 L36,52" stroke="#FF5252" stroke-width="3"/><line x1="50" y1="30" x2="50" y2="52" stroke-width="2.5"/><path d="M10,38 L18,38 M46,38 L54,38" stroke-width="2.5"/><path d="M40,10 L44,14 L40,18" stroke="#FFC24B" stroke-width="2"/>')
},
vfd:{
  ok:svgWrap('<rect x="8" y="8" width="48" height="48" rx="5"/><path d="M14,34 Q20,20 26,34 T38,34 T50,34" stroke-width="2.4"/>'),
  fault:svgWrap('<rect x="8" y="8" width="48" height="48" rx="5" stroke="#FF5252"/><path d="M14,34 L20,24 L26,40 L32,20 L38,40 L44,28 L50,34" stroke="#FF5252" stroke-width="2.2"/><path d="M44,44 Q48,50 44,54" stroke="#FFC24B" stroke-width="2"/>')
},
sensor:{
  ok:svgWrap('<rect x="10" y="24" width="16" height="16" rx="3"/><path d="M28,32 L54,32" stroke-dasharray="4 4" stroke-width="2"/><path d="M46,26 L54,32 L46,38"/>'),
  fault:svgWrap('<rect x="10" y="24" width="16" height="16" rx="3" stroke="#FF5252"/><path d="M28,32 L38,32" stroke-dasharray="4 4" stroke-width="2" stroke="#FF5252"/><path d="M38,26 L42,32 L38,38 M44,24 L48,32 L44,40" stroke="#FF5252" stroke-width="1.6"/><circle cx="16" cy="20" r="1.6" fill="#FFC24B" stroke="none"/><circle cx="20" cy="22" r="1.2" fill="#FFC24B" stroke="none"/>')
},
estop:{
  ok:svgWrap('<rect x="18" y="42" width="28" height="12" rx="2"/><circle cx="32" cy="28" r="18"/><path d="M22,28 L28,34 M32,20 L32,36 M36,34 L42,28" stroke-width="2"/>'),
  fault:svgWrap('<rect x="18" y="42" width="28" height="12" rx="2" stroke="#FF5252"/><circle cx="32" cy="28" r="18" stroke="#FF5252"/><path d="M32,28 L32,28" stroke-width="2"/><path d="M50,20 L56,16 M52,28 L58,28" stroke="#FFC24B" stroke-width="2"/>')
},
fuse:{
  ok:svgWrap('<line x1="4" y1="32" x2="18" y2="32" stroke-width="2.5"/><rect x="18" y="20" width="28" height="24" rx="8"/><line x1="46" y1="32" x2="60" y2="32" stroke-width="2.5"/><line x1="26" y1="32" x2="38" y2="32" stroke-width="2"/>'),
  fault:svgWrap('<line x1="4" y1="32" x2="18" y2="32" stroke-width="2.5"/><rect x="18" y="20" width="28" height="24" rx="8" stroke="#FF5252"/><line x1="46" y1="32" x2="60" y2="32" stroke-width="2.5"/><path d="M26,32 L30,28 M30,36 L38,28" stroke="#FF5252" stroke-width="2"/><path d="M32,14 L36,20 L28,20 Z" fill="#FFC24B" stroke="none"/>')
},
terminal:{
  ok:svgWrap('<rect x="6" y="22" width="12" height="20" rx="2"/><rect x="20" y="22" width="12" height="20" rx="2"/><rect x="34" y="22" width="12" height="20" rx="2"/><rect x="48" y="22" width="12" height="20" rx="2"/><line x1="12" y1="10" x2="12" y2="22" stroke-width="2"/><line x1="26" y1="10" x2="26" y2="22" stroke-width="2"/><line x1="40" y1="10" x2="40" y2="22" stroke-width="2"/><line x1="54" y1="10" x2="54" y2="22" stroke-width="2"/>'),
  fault:svgWrap('<rect x="6" y="22" width="12" height="20" rx="2"/><rect x="20" y="22" width="12" height="20" rx="2" stroke="#FF5252" fill="#FF5252" opacity=".22"/><rect x="34" y="22" width="12" height="20" rx="2"/><rect x="48" y="22" width="12" height="20" rx="2"/><line x1="12" y1="10" x2="12" y2="22" stroke-width="2"/><path d="M26,10 L20,20" stroke="#FF5252" stroke-width="2"/><line x1="40" y1="10" x2="40" y2="22" stroke-width="2"/><line x1="54" y1="10" x2="54" y2="22" stroke-width="2"/><circle cx="26" cy="16" r="1.6" fill="#FFC24B" stroke="none"/>')
},
hmi:{
  ok:svgWrap('<rect x="8" y="8" width="48" height="40" rx="4"/><line x1="16" y1="18" x2="48" y2="18" stroke-width="2"/><line x1="16" y1="26" x2="40" y2="26" stroke-width="2"/><line x1="16" y1="34" x2="44" y2="34" stroke-width="2"/><circle cx="32" cy="54" r="3"/>'),
  fault:svgWrap('<rect x="8" y="8" width="48" height="40" rx="4" stroke="#FF5252"/><rect x="10" y="10" width="44" height="36" rx="3" fill="#FF5252" opacity=".18" stroke="none"/><path d="M14,12 L50,44 M50,12 L14,44" stroke="#FF5252" stroke-width="1.6"/><circle cx="32" cy="54" r="3"/>')
},
breaker:{
  ok:svgWrap('<rect x="18" y="8" width="28" height="48" rx="5"/><rect x="27" y="16" width="10" height="18" rx="3" fill="currentColor"/><line x1="32" y1="38" x2="32" y2="48" stroke-width="2.5"/>'),
  fault:svgWrap('<rect x="18" y="8" width="28" height="48" rx="5" stroke="#FF5252"/><rect x="27" y="34" width="10" height="18" rx="3" fill="#FF5252" stroke="none"/><line x1="32" y1="16" x2="32" y2="30" stroke-width="2.5" stroke="#FF5252"/><path d="M12,20 L18,24 L12,28" stroke="#FFC24B" stroke-width="2"/>')
},
cable:{
  ok:svgWrap('<circle cx="10" cy="32" r="5"/><path d="M15,32 Q26,18 32,32 T49,32" stroke-width="2.4"/><circle cx="54" cy="32" r="5"/>'),
  fault:svgWrap('<circle cx="10" cy="32" r="5"/><path d="M15,32 Q22,20 27,30" stroke-width="2.4" stroke="#FF5252"/><path d="M27,30 L24,34 L30,36 L27,30" stroke="#FF5252" stroke-width="1.6" fill="#FF5252" opacity=".3"/><path d="M32,32 Q40,44 49,32" stroke-width="2.4"/><circle cx="54" cy="32" r="5"/><path d="M30,22 L34,26 L28,28" stroke="#FFC24B" stroke-width="1.8"/>')
},
encoder:{
  ok:svgWrap('<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="5" fill="currentColor"/><line x1="32" y1="10" x2="32" y2="17" stroke-width="2"/><line x1="32" y1="47" x2="32" y2="54" stroke-width="2"/><line x1="10" y1="32" x2="17" y2="32" stroke-width="2"/><line x1="47" y1="32" x2="54" y2="32" stroke-width="2"/>'),
  fault:svgWrap('<circle cx="32" cy="32" r="22" stroke="#FF5252"/><circle cx="34" cy="34" r="5" fill="#FF5252" stroke="none"/><path d="M32,10 L36,17" stroke="#FF5252" stroke-width="2"/><line x1="32" y1="47" x2="32" y2="54" stroke-width="2"/><line x1="10" y1="32" x2="17" y2="32" stroke-width="2"/><path d="M47,30 L54,34" stroke="#FF5252" stroke-width="2"/><path d="M14,14 L20,20" stroke="#FFC24B" stroke-width="2"/>')
},
solenoid:{
  ok:svgWrap('<path d="M18,8 Q26,14 18,20 Q26,26 18,32" stroke-width="2.2"/><rect x="10" y="6" width="4" height="28" rx="1"/><path d="M8,34 L56,34 L44,52 L20,52 Z"/>'),
  fault:svgWrap('<path d="M18,8 Q26,14 18,20 Q26,26 18,32" stroke-width="2.2" stroke="#FF5252"/><rect x="10" y="6" width="4" height="28" rx="1" stroke="#FF5252"/><path d="M8,34 L56,34 L44,52 L20,52 Z" stroke="#FF5252"/><path d="M26,38 L38,48 M38,38 L26,48" stroke="#FF5252" stroke-width="1.8"/><path d="M42,10 Q48,16 42,20" stroke="#FFC24B" stroke-width="2"/>')
},
timer:{
  ok:svgWrap('<circle cx="32" cy="34" r="20"/><line x1="32" y1="34" x2="32" y2="22" stroke-width="2.4"/><line x1="32" y1="34" x2="41" y2="34" stroke-width="2.4"/><rect x="26" y="8" width="12" height="6" rx="2"/>'),
  fault:svgWrap('<circle cx="32" cy="34" r="20" stroke="#FF5252"/><line x1="32" y1="34" x2="24" y2="44" stroke-width="2.4" stroke="#FF5252"/><line x1="32" y1="34" x2="41" y2="34" stroke-width="2.4"/><rect x="26" y="8" width="12" height="6" rx="2"/><path d="M46,20 L52,16 M48,28 L54,26" stroke="#FFC24B" stroke-width="1.8"/>')
}
};
function iconMarkup(type,faulty){var set=ICONS[type]||ICONS.plc;return faulty&&set.fault?set.fault:set.ok}

var ROUNDS=[
{symptom:"Motor won't start even though the start button is pressed and the pilot light is lit.",slots:[{t:"psu",l:"24V supply"},{t:"relay",l:"Control relay"},{t:"contactor",l:"Motor contactor"}],faultIdx:2,faultLabels:["Contactor coil open, won't pull in","Coil burnt out from overvoltage","Coil winding shorted internally"]},
{symptom:"Output stays energized on the HMI even after the stop command is issued.",slots:[{t:"plc",l:"PLC"},{t:"relay",l:"Output relay"},{t:"contactor",l:"Load contactor"}],faultIdx:1,faultLabels:["Relay contacts welded shut","Contact points fused from arcing","Relay stuck mechanically closed"]},
{symptom:"VFD trips on overcurrent within seconds of every start command.",slots:[{t:"psu",l:"Line supply"},{t:"vfd",l:"VFD"},{t:"contactor",l:"Motor contactor"}],faultIdx:1,faultLabels:["VFD output shorted to ground","Drive IGBT module damaged internally","Motor parameters set for the wrong motor"]},
{symptom:"A single digital input channel reads low no matter what the field switch shows.",slots:[{t:"sensor",l:"Field sensor"},{t:"io",l:"Input module"},{t:"plc",l:"PLC CPU"}],faultIdx:1,faultLabels:["Input channel fried on the I/O card","Card channel fuse blown internally","Optocoupler on that channel failed"]},
{symptom:"Proximity sensor gives a false trigger even with no part in front of it.",slots:[{t:"sensor",l:"Prox sensor"},{t:"cable",l:"Sensor cable"},{t:"io",l:"Input module"}],faultIdx:0,faultLabels:["Sensor face coated in metal dust","Sensor drifted out of adjustment","Sensor housing cracked, moisture inside"]},
{symptom:"Panel loses all 24V control power and every field device drops out at once.",slots:[{t:"breaker",l:"Main breaker"},{t:"fuse",l:"24V fuse"},{t:"psu",l:"24V supply"}],faultIdx:2,faultLabels:["Power supply output collapsed","PSU internal capacitor failed","Supply overheated and shut down"]},
{symptom:"An I/O rack channel keeps tripping its fuse the moment power is restored.",slots:[{t:"psu",l:"Supply"},{t:"fuse",l:"Channel fuse"},{t:"io",l:"I/O module"}],faultIdx:2,faultLabels:["I/O module shorted internally","Card channel damaged from a surge","Module output stage failed"]},
{symptom:"A field signal cuts in and out as the panel door is bumped or jostled.",slots:[{t:"sensor",l:"Sensor"},{t:"terminal",l:"Terminal block"},{t:"plc",l:"PLC"}],faultIdx:1,faultLabels:["Terminal screw backed off, loose wire","Terminal block corroded, poor contact","Wire ferrule crimped wrong, working loose"]},
{symptom:"Operator screen stays black and won't respond to touch at all.",slots:[{t:"psu",l:"HMI supply"},{t:"hmi",l:"HMI panel"}],faultIdx:1,faultLabels:["HMI backlight and digitizer failed","Screen internal power stage failed","Touch controller board failed"]},
{symptom:"Timing sequence runs long and the delay no longer matches the setpoint.",slots:[{t:"plc",l:"PLC"},{t:"timer",l:"Timing relay"},{t:"contactor",l:"Contactor"}],faultIdx:1,faultLabels:["Timer relay drifted out of calibration","Timer's internal clock circuit failed","Timer contacts worn, switching late"]},
{symptom:"Motor position feedback is erratic and the drive faults on encoder loss.",slots:[{t:"encoder",l:"Encoder"},{t:"cable",l:"Encoder cable"},{t:"vfd",l:"VFD"}],faultIdx:0,faultLabels:["Encoder disc cracked, missing counts","Encoder bearing failed, disc wobbling","Encoder LED emitter dying"]},
{symptom:"A solenoid valve won't shift even though the output LED on the card is lit.",slots:[{t:"io",l:"Output module"},{t:"cable",l:"Valve wiring"},{t:"solenoid",l:"Solenoid valve"}],faultIdx:2,faultLabels:["Solenoid coil burnt open","Coil shorted internally, no pull","Valve spool stuck, coil overheating"]},
{symptom:"Breaker for the control panel trips nuisance-fast under completely normal load.",slots:[{t:"psu",l:"Load"},{t:"breaker",l:"Breaker"}],faultIdx:1,faultLabels:["Breaker trip mechanism weakened with age","Thermal element drifted, tripping early","Breaker undersized for the actual load"]},
{symptom:"Field wiring intermittently shorts and trips the output fuse.",slots:[{t:"cable",l:"Field cable"},{t:"terminal",l:"Terminal"},{t:"io",l:"Output module"}],faultIdx:0,faultLabels:["Cable insulation chafed through on a sharp edge","Cable jacket cracked from repeated flexing","Rodent damage exposing the conductors"]},
{symptom:"Contactor chatters loudly and never fully seats when energized.",slots:[{t:"psu",l:"Control supply"},{t:"relay",l:"Control relay"},{t:"contactor",l:"Contactor"}],faultIdx:2,faultLabels:["Contactor coil voltage too low to seat","Coil winding partially shorted","Armature sticking on a worn guide"]},
{symptom:"E-stop won't reset even after the button is pulled back out.",slots:[{t:"estop",l:"E-stop"},{t:"terminal",l:"Safety terminal"},{t:"relay",l:"Safety relay"}],faultIdx:2,faultLabels:["Safety relay contacts stuck, won't reset","Relay coil failed, monitoring circuit open","Feedback loop wiring broken inside the relay"]},
{symptom:"PLC loses its program and retentive data every time power is cycled.",slots:[{t:"psu",l:"24V supply"},{t:"plc",l:"PLC CPU"}],faultIdx:1,faultLabels:["Backup battery dead, memory not held","Battery connector corroded","Memory battery past its service life"]},
{symptom:"VFD overheats and trips within minutes of running at full load.",slots:[{t:"psu",l:"Line supply"},{t:"vfd",l:"VFD"},{t:"cable",l:"Motor cable"}],faultIdx:1,faultLabels:["VFD cooling fan seized, heatsink overheating","Drive fan bearing failed, no airflow","Heatsink fins clogged, drive running hot"]},
{symptom:"An output module drives a load that never actually turns off.",slots:[{t:"plc",l:"PLC logic"},{t:"io",l:"Output module"},{t:"contactor",l:"Contactor"}],faultIdx:1,faultLabels:["Output transistor shorted on that channel","Triac output failed shorted","Output driver stage fused closed"]},
{symptom:"A ground fault trips the feeder every time this panel section is energized.",slots:[{t:"cable",l:"Feeder cable"},{t:"terminal",l:"Terminal block"},{t:"breaker",l:"Breaker"}],faultIdx:1,faultLabels:["Terminal block cracked, arcing to the enclosure","Corrosion bridging the terminal to ground","Moisture ingress at the terminal block"]},
{symptom:"Photoeye sensor won't detect parts even standing right in the beam.",slots:[{t:"psu",l:"Supply"},{t:"sensor",l:"Photoeye"},{t:"io",l:"Input module"}],faultIdx:1,faultLabels:["Photoeye lens caked with dust and oil film","Emitter LED inside the sensor has failed","Sensor misaligned, beam no longer returning"]},
{symptom:"A relay in the control cabinet buzzes constantly even when de-energized.",slots:[{t:"psu",l:"Control supply"},{t:"relay",l:"Relay"}],faultIdx:1,faultLabels:["Relay coil shorted, drawing current always","Contact welded closed, feeding back voltage","Coil insulation broken down internally"]},
{symptom:"The whole panel loses communication and every drive drops off the network at once.",slots:[{t:"plc",l:"PLC"},{t:"cable",l:"Network cable"},{t:"vfd",l:"VFD"}],faultIdx:1,faultLabels:["Network cable connector crushed, open circuit","Cable shield broken, noise killing comms","Termination wiring damaged"]},
{symptom:"A field sensor's cable connector feels loose and the signal drops when tugged.",slots:[{t:"sensor",l:"Sensor"},{t:"cable",l:"Cable connector"},{t:"io",l:"Input module"}],faultIdx:1,faultLabels:["Connector pins backed out of the housing","Cable strain relief failed, pins working loose","Connector corroded, poor pin contact"]},
{symptom:"Solenoid valve stays open and won't de-energize when the output drops.",slots:[{t:"io",l:"Output module"},{t:"solenoid",l:"Solenoid valve"}],faultIdx:1,faultLabels:["Valve spool stuck open mechanically","Return spring broken inside the valve","Debris jamming the spool in the bore"]},
{symptom:"HMI powers up but the screen flickers and resets randomly under load.",slots:[{t:"psu",l:"HMI supply"},{t:"hmi",l:"HMI panel"}],faultIdx:0,faultLabels:["Supply voltage sagging under load","PSU capacitors degraded, unstable output","Supply overheating and browning out"]}
];

function pickFaultLabel(round){return round.faultLabels&&round.faultLabels.length?round.faultLabels[Math.floor(Math.random()*round.faultLabels.length)]:round.faultLabel||"Failed part"}

var startScreen=document.getElementById("startScreen"),gameScreen=document.getElementById("gameScreen"),overScreen=document.getElementById("overScreen"),diagramArea=document.getElementById("diagramArea"),timerFill=document.getElementById("timerFill"),scoreVal=document.getElementById("scoreVal"),comboVal=document.getElementById("comboVal"),roundsVal=document.getElementById("roundsVal"),heartsRow=document.getElementById("heartsRow"),roundTag=document.getElementById("roundTag"),roundSymptom=document.getElementById("roundSymptom"),toast=document.getElementById("toast"),hintBtn=document.getElementById("hintBtn"),deck=[],deckIdx=0,current=null,score=0,lives=3,streak=0,roundsSolved=0,timeLeft=0,timerDur=0,timerHandle=null,hintUsed=!1,difficultyFactor=1,answered=!1;

function shuffle(arr){for(var a=arr.slice(),i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j],a[j]=t}return a}
function getBest(){try{return parseInt(localStorage.getItem("ecrPanelDoctorBest")||"0",10)||0}catch(e){return 0}}
function setBest(v){try{localStorage.setItem("ecrPanelDoctorBest",String(v))}catch(e){}}
document.getElementById("bestVal").textContent=getBest();

function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(function(){toast.classList.remove("show")},1200)}

function renderHearts(){
  var html="";
  for(var i=0;i<3;i++){
    var lost=i>=lives;
    html+='<svg class="pd-heart" viewBox="0 0 24 24"><path fill="'+(lost?"rgba(255,255,255,.12)":"#38BDF8")+'" d="M12 21s-7.5-4.6-10-9.3C.4 8.6 2 5 5.6 5c2 0 3.4 1 4.4 2.4C11 6 12.4 5 14.4 5 18 5 19.6 8.6 22 11.7 19.5 16.4 12 21 12 21z"/></svg>';
  }
  heartsRow.innerHTML=html;
}
function updateHud(){
  scoreVal.textContent=score;
  comboVal.textContent="\xD7"+(1+Math.min(2,Math.floor(streak/3))*.5).toFixed(1).replace(".0","");
  roundsVal.textContent=roundsSolved;
  renderHearts();
}

function startRun(){
  score=0;lives=3;streak=0;roundsSolved=0;difficultyFactor=1;
  deck=shuffle(ROUNDS);deckIdx=0;
  startScreen.classList.add("hidden");overScreen.classList.add("hidden");gameScreen.classList.remove("hidden");
  updateHud();nextRound();
}

function nextRound(){
  if(deckIdx>=deck.length){deck=shuffle(ROUNDS);deckIdx=0;difficultyFactor*=.92}
  current=deck[deckIdx++];
  current.faultLabel=pickFaultLabel(current);
  answered=!1;hintUsed=!1;hintBtn.disabled=!1;hintBtn.style.opacity=1;
  roundTag.textContent="Symptom";roundSymptom.textContent=current.symptom;
  diagramArea.innerHTML="";
  current.slots.forEach(function(slot,i){
    if(i>0){var wire=document.createElement("div");wire.className="pd-wire";diagramArea.appendChild(wire)}
    var col=document.createElement("div");col.className="pd-slot";
    var btn=document.createElement("button");
    btn.className="pd-icon-btn";
    btn.innerHTML=iconMarkup(slot.t,!1);
    btn.addEventListener("click",function(){onIconTap(btn,i)});
    col.appendChild(btn);
    var lbl=document.createElement("div");lbl.className="pd-slot-label";lbl.textContent=slot.l;col.appendChild(lbl);
    diagramArea.appendChild(col);
  });
  timerDur=Math.max(10,current.slots.length*4.5)*difficultyFactor;
  timeLeft=timerDur;
  timerHandle&&clearInterval(timerHandle);
  timerHandle=setInterval(tick,100);
  updateHud();
}

function tick(){
  if(!answered){
    timeLeft-=.1;
    var pct=Math.max(0,timeLeft/timerDur*100);
    timerFill.style.width=pct+"%";
    timerFill.classList.toggle("warn",pct<30);
    if(timeLeft<=0){clearInterval(timerHandle);resolveRound(!1,!0)}
  }
}

function onIconTap(btn,idx){if(!answered)resolveRound(idx===current.faultIdx,!1,btn)}

function resolveRound(correct,timedOut,btnClicked){
  answered=!0;clearInterval(timerHandle);
  var allBtns=diagramArea.querySelectorAll(".pd-icon-btn"),faultBtn=allBtns[current.faultIdx];
  faultBtn.innerHTML=iconMarkup(current.slots[current.faultIdx].t,!0);
  if(correct){
    streak++;
    var mult=1+Math.min(2,Math.floor(streak/3))*.5,bonus=Math.round((40+timeLeft*8)*mult);
    score+=bonus;roundsSolved++;
    faultBtn.classList.add("correct");
    showToast("Found it: "+current.faultLabel+"  +"+bonus);
    updateHud();
    setTimeout(nextRound,1000);
  }else{
    streak=0;lives--;
    btnClicked&&btnClicked.classList.add("wrong-pick");
    faultBtn.classList.add("correct");
    showToast((timedOut?"Too slow \u2014 ":"Not quite \u2014 ")+"it was: "+current.faultLabel);
    updateHud();
    if(lives<=0)setTimeout(endRun,1100);else setTimeout(nextRound,1300);
  }
}

hintBtn.addEventListener("click",function(){
  if(hintUsed||answered)return;
  hintUsed=!0;hintBtn.disabled=!0;hintBtn.style.opacity=.5;
  score=Math.max(0,score-50);updateHud();
  var allBtns=diagramArea.querySelectorAll(".pd-icon-btn"),faultBtn=allBtns[current.faultIdx];
  faultBtn.style.borderColor="#FFC24B";faultBtn.style.boxShadow="0 0 0 2px #FFC24B inset";
  showToast('Hint: look closely at "'+current.slots[current.faultIdx].l+'"');
});

function endRun(){
  timerHandle&&clearInterval(timerHandle);
  gameScreen.classList.add("hidden");overScreen.classList.remove("hidden");
  var best=getBest();
  if(score>best){best=score;setBest(best)}
  document.getElementById("finalScore").textContent=score;
  document.getElementById("finalRounds").textContent=roundsSolved;
  document.getElementById("finalBest").textContent=best;
  document.getElementById("bestVal").textContent=best;
}

document.getElementById("startBtn").addEventListener("click",startRun);
document.getElementById("againBtn").addEventListener("click",startRun);
document.getElementById("backBtn").addEventListener("click",function(){window.location.href="games.html"});
})();
