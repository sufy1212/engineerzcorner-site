try {
function fieldError(inputEl, message){
var wrap = inputEl.closest('.field') || inputEl.closest('.parentField');
if(!wrap) return false;
var err = wrap.querySelector('.field-error');
if(message){
wrap.classList.add('has-error');
if(!err){ err = document.createElement('div'); err.className='field-error'; wrap.appendChild(err); }
err.textContent = '⚠ ' + message;
return true;
} else {
wrap.classList.remove('has-error');
if(err) err.remove();
return false;
}
}
function updateValidationBanner(bannerId, errorCount){
var el = document.getElementById(bannerId);
if(!el) return;
if(errorCount===0){
el.className='validation-banner ok';
el.innerHTML='<span class="vdot"></span><span>All inputs valid — calculation below is trustworthy.</span>';
} else {
el.className='validation-banner bad';
el.innerHTML='<span class="vdot"></span><span>'+errorCount+' input issue'+(errorCount>1?'s':'')+' found — see highlighted field'+(errorCount>1?'s':'')+' below for what to change.</span>';
}
}
} catch(e) { console.error("app.js module #0 error:", e); }
try {
var NOTES_HTML = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Electrical Learning Notes \u2014 Theory &amp; Reference</title>\n<link rel=\"icon\" type=\"image/svg+xml\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='5' fill='%230A1930'/%3E%3Cpath d='M17 5 8 18h6l-2 9 11-14h-7z' fill='%235FD3E3'/%3E%3C/svg%3E\">\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n<style>\n  :root{\n    --navy:#0A1930; --navy-2:#122845; --navy-3:#18325A;\n    --grid-line: rgba(95,211,227,.08);\n    --cyan:#5FD3E3; --cyan-dim:#3E8C97;\n    --vellum:#F6F1E4; --vellum-2:#EFE8D4; --vellum-line:#DCD2B4;\n    --ink:#241F14; --ink-dim:#6B6250; --ink-faint:#9A9078;\n    --paper-text:#D9E4F2; --paper-text-dim:#8FA3C2;\n    --fault:#D65B4A;\n    --font-display:\"Space Grotesk\",-apple-system,sans-serif;\n    --font-body:\"Source Serif 4\",Georgia,serif;\n    --font-mono:\"IBM Plex Mono\",\"Cascadia Mono\",ui-monospace,monospace;\n  }\n  *{box-sizing:border-box;}\n  html{scroll-behavior:smooth;}\n  html,body{margin:0;background:var(--navy);color:var(--paper-text);font-family:var(--font-body);}\n  body{\n    background-image:\n      linear-gradient(var(--grid-line) 1px, transparent 1px),\n      linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);\n    background-size: 34px 34px;\n    background-color:var(--navy);\n  }\n  ::selection{background:rgba(95,211,227,.28);}\n  a{color:var(--cyan);}\n  .wrap{max-width:960px;margin:0 auto;padding:0 20px;}\n\n  :focus-visible{outline:2px solid var(--cyan); outline-offset:2px;}\n\n  /* ===== topbar ===== */\n  .topbar{position:sticky;top:0;z-index:40;background:rgba(10,25,48,.92);backdrop-filter:blur(6px);border-bottom:1px solid rgba(95,211,227,.18);}\n  .topbar-inner{max-width:960px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}\n  .brand{display:flex;align-items:center;gap:9px;font-family:var(--font-display);font-weight:700;font-size:15px;letter-spacing:.02em;color:#F3EEDD;text-decoration:none;}\n  .brand .bolt{color:var(--cyan);font-size:18px;}\n  .searchbox{position:relative;flex:none;width:min(280px,60vw);}\n  .searchbox input{\n    width:100%;background:var(--navy-2);border:1px solid rgba(95,211,227,.22);border-radius:5px;\n    color:var(--paper-text);font-family:var(--font-mono);font-size:12.5px;padding:9px 12px 9px 30px;outline:none;\n  }\n  .searchbox input::placeholder{color:var(--paper-text-dim);}\n  .searchbox input:focus{border-color:var(--cyan);}\n  .searchbox svg{position:absolute;left:9px;top:50%;transform:translateY(-50%);width:14px;height:14px;color:var(--paper-text-dim);pointer-events:none;}\n\n  /* ===== hero ===== */\n  .hero{padding:56px 0 8px;}\n  .eyebrow{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--cyan);margin-bottom:14px;}\n  h1{font-family:var(--font-display);font-size:clamp(28px,5vw,44px);line-height:1.12;font-weight:700;color:#F6F1E4;margin:0 0 16px;letter-spacing:-.01em;max-width:16ch;}\n  .hero-sub{font-family:var(--font-body);font-size:16px;line-height:1.65;color:var(--paper-text-dim);max-width:56ch;margin:0 0 22px;}\n  .hero-meta{display:flex;gap:22px;flex-wrap:wrap;padding-top:18px;border-top:1px solid rgba(95,211,227,.16);}\n  .hero-meta .m{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);}\n  .hero-meta .m b{display:block;color:#F6F1E4;font-size:19px;font-family:var(--font-display);font-weight:600;margin-bottom:2px;}\n\n  /* ===== filter board (single-line diagram) ===== */\n  .board{margin:44px 0 6px;}\n  .board-label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper-text-dim);margin-bottom:18px;}\n  .board-label b{color:var(--cyan);font-weight:600;}\n  .sld{background:var(--navy-2);border:1px solid rgba(95,211,227,.16);border-radius:8px;padding:26px 22px 20px;overflow-x:auto;}\n  .busbar-row{position:relative;height:2px;background:linear-gradient(90deg, transparent, var(--cyan-dim) 4%, var(--cyan-dim) 96%, transparent);margin:0 6px 0;min-width:640px;}\n  .breakers{display:flex;min-width:640px;padding-top:0;}\n  .breaker-btn{\n    flex:1;min-width:64px;background:none;border:none;cursor:pointer;padding:0 4px 4px;\n    display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--paper-text-dim);\n  }\n  .drop{width:2px;height:16px;background:var(--cyan-dim);}\n  .switch{\n    width:15px;height:30px;border:2px solid var(--cyan-dim);border-radius:2px;position:relative;background:var(--navy);\n    display:flex;align-items:center;justify-content:center;transition:border-color .15s ease, box-shadow .15s ease;\n  }\n  .switch .contact{width:2px;height:20px;background:var(--cyan-dim);transform-origin:top center;transition:transform .18s ease, background .18s ease;}\n  .breaker-btn[aria-pressed=\"true\"] .switch{border-color:var(--cyan);box-shadow:0 0 10px rgba(95,211,227,.45);}\n  .breaker-btn[aria-pressed=\"true\"] .switch .contact{background:var(--cyan);transform:rotate(0deg);}\n  .breaker-btn[aria-pressed=\"false\"] .switch .contact{transform:rotate(22deg);}\n  .breaker-btn.is-all[aria-pressed=\"true\"] .switch{border-color:#F6C15E;box-shadow:0 0 10px rgba(246,193,94,.45);}\n  .breaker-btn.is-all[aria-pressed=\"true\"] .switch .contact{background:#F6C15E;}\n  .breaker-name{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.03em;text-transform:uppercase;text-align:center;line-height:1.35;}\n  .breaker-count{font-family:var(--font-mono);font-size:9px;color:var(--paper-text-dim);opacity:.8;}\n  .breaker-btn:hover .breaker-name{color:#F6F1E4;}\n  .breaker-btn:hover .switch{border-color:var(--cyan);}\n\n  /* ===== results meta ===== */\n  .results-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:26px 0 6px;font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);flex-wrap:wrap;}\n  .results-meta .clear{background:none;border:1px solid rgba(95,211,227,.3);color:var(--cyan);border-radius:4px;padding:5px 10px;cursor:pointer;font-family:var(--font-mono);font-size:10.5px;}\n  .results-meta .clear:hover{background:rgba(95,211,227,.1);}\n\n  /* ===== category sections ===== */\n  .catsection{margin-top:38px;}\n  .catsection-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}\n  .catdot{width:9px;height:9px;border-radius:50%;flex:none;}\n  .catsection-head h2{font-family:var(--font-display);font-size:15px;font-weight:600;color:#F6F1E4;margin:0;letter-spacing:.01em;}\n  .catsection-head .catcount{font-family:var(--font-mono);font-size:10.5px;color:var(--paper-text-dim);}\n\n  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;}\n\n  .note-card{\n    background:var(--vellum);border-radius:6px;border-left:4px solid var(--cyan);\n    box-shadow:0 2px 10px rgba(0,0,0,.22);overflow:hidden;\n  }\n  .note-head{\n    width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:14px 15px 12px;\n    display:flex;flex-direction:column;gap:8px;font-family:inherit;color:inherit;\n  }\n  .note-toprow{display:flex;justify-content:space-between;align-items:center;gap:8px;}\n  .note-tag{font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;}\n  .note-time{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);white-space:nowrap;}\n  .note-title{font-family:var(--font-display);font-size:14.5px;font-weight:600;color:var(--ink);line-height:1.35;margin:0;}\n  .note-summary{font-family:var(--font-body);font-size:12.5px;color:var(--ink-dim);line-height:1.55;margin:0;}\n  .note-toggle-hint{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);display:flex;align-items:center;gap:5px;margin-top:2px;}\n  .note-toggle-hint svg{width:9px;height:9px;transition:transform .15s ease;}\n  .note-card.open .note-toggle-hint svg{transform:rotate(180deg);}\n  .note-body{max-height:0;overflow:hidden;transition:max-height .28s ease;}\n  .note-card.open .note-body{max-height:900px;}\n  .note-body-inner{padding:0 15px 16px;border-top:1px solid var(--vellum-line);margin-top:2px;}\n  .note-body-inner p{font-family:var(--font-body);font-size:13px;line-height:1.7;color:var(--ink);margin:12px 0 0;}\n  .note-body-inner p:first-child{margin-top:14px;}\n\n  @media (prefers-reduced-motion: reduce){\n    html{scroll-behavior:auto;}\n    .note-body, .switch .contact, .note-card.open .note-toggle-hint svg{transition:none;}\n  }\n\n  .empty-state{\n    grid-column:1/-1;font-family:var(--font-mono);font-size:12px;color:var(--paper-text-dim);\n    border:1px dashed rgba(95,211,227,.25);border-radius:6px;padding:26px;text-align:center;\n  }\n\n  footer{margin:70px 0 40px;padding-top:22px;border-top:1px solid rgba(95,211,227,.16);}\n  .foot-note{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);line-height:1.7;max-width:64ch;}\n  .foot-mark{font-family:var(--font-mono);font-size:10px;color:var(--cyan-dim);margin-top:16px;}\n\n  @media (max-width:560px){\n    .breaker-btn{min-width:52px;}\n    .breaker-name{font-size:8.5px;}\n    .sld{padding:20px 14px 16px;}\n  }\n</style>\n</head>\n<body>\n\n<div class=\"topbar\">\n  <div class=\"topbar-inner\">\n    <a class=\"brand\" href=\"#top\"><span class=\"bolt\">\u26a1</span> ELECTRICAL LEARNING NOTES</a>\n    <div class=\"searchbox\">\n      <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"7\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n      <input type=\"text\" id=\"searchInput\" placeholder=\"Search notes\u2026\" autocomplete=\"off\">\n    </div>\n  </div>\n</div>\n\n<div class=\"wrap\" id=\"top\">\n  <div class=\"hero\">\n    <div class=\"eyebrow\">Personal reference \u00b7 theory only</div>\n    <h1>Notes on how electricity actually works.</h1>\n    <p class=\"hero-sub\">A running set of short, plain-language write-ups on core electrical engineering concepts \u2014 how things work and why, not how to size them. There are no calculators or design tools on this page, and nothing here is invented: every note covers established, textbook-level electrical theory.</p>\n    <div class=\"hero-meta\">\n      <div class=\"m\"><b id=\"metaNoteCount\">0</b>notes</div>\n      <div class=\"m\"><b id=\"metaCatCount\">0</b>subjects</div>\n      <div class=\"m\"><b>0</b>calculators</div>\n    </div>\n  </div>\n\n  <div class=\"board\">\n    <div class=\"board-label\">Filter by subject \u2014 <b>close a breaker</b> to energize that feeder</div>\n    <div class=\"sld\">\n      <div class=\"busbar-row\"></div>\n      <div class=\"breakers\" id=\"breakerRow\"></div>\n    </div>\n  </div>\n\n  <div class=\"results-meta\">\n    <span id=\"resultsCount\"></span>\n    <button class=\"clear\" id=\"clearFilters\" type=\"button\">Reset filters</button>\n  </div>\n\n  <main id=\"noteSections\"></main>\n\n  <footer>\n    <p class=\"foot-note\">These are summary explanations written for learning and quick reference \u2014 they're deliberately simplified and aren't a substitute for the current edition of the relevant standard (IEC 60364, BS 7671, NEC/NFPA 70, IEC 60479, NFPA 70E, etc.) or for a qualified engineer's judgement on a real installation. No content on this page is generated per-visit or personalized \u2014 what you read is what's written into the page.</p>\n    <div class=\"foot-mark\">\u2014 end of feeder \u2014</div>\n  </footer>\n</div>\n\n<script>\n(function(){\n\n  var DATA = [{\"id\": \"fundamentals\", \"label\": \"Fundamentals\", \"color\": \"#5FD3E3\", \"notes\": [{\"title\": \"Ohm's Law and the V\\u2013I\\u2013R Relationship\", \"summary\": \"The most-used identity in electrical work, and where it stops applying.\", \"body\": [\"Ohm's Law describes the relationship between voltage, current and resistance in a conductor: V = I \\u00d7 R. Double the voltage across a fixed resistance and the current doubles with it; double the resistance and the current halves.\", \"It's the single most-used identity in electrical work, but it only holds cleanly for \\u201cohmic\\u201d materials \\u2014 metals and resistors at roughly constant temperature \\u2014 where current and voltage stay proportional. Semiconductors, arcs, and heated filaments all bend this straight-line relationship, which is exactly why Ohm's Law is a starting point for analysis, not the end of it.\"]}, {\"title\": \"AC vs DC: Why the Grid Runs on Alternating Current\", \"summary\": \"A 19th-century argument that decided how power still moves today.\", \"body\": [\"Direct current (DC) flows one way, the way a battery delivers it. Alternating current (AC) reverses direction periodically \\u2014 50 or 60 times a second on most grids.\", \"The grid settled on AC in the \\u201cWar of Currents\\u201d of the 1880s\\u201390s largely because transformers let AC voltage be stepped up for efficient long-distance transmission and back down for safe local use, something DC of that era couldn't do economically. Modern power electronics have since made high-voltage DC transmission practical for specific long-distance and undersea links, but AC remains the default for generation and distribution worldwide.\"]}, {\"title\": \"Real, Reactive and Apparent Power\", \"summary\": \"Why a motor is rated in kVA even though it only does kW of useful work.\", \"body\": [\"Not all the power flowing through an AC circuit does useful work. Real power (P, in kW) is what actually turns into heat, light, or motion. Reactive power (Q, in kVAR) is power that inductors and capacitors borrow from the supply and hand back every cycle, needed to build magnetic and electric fields but never converted into useful output.\", \"Apparent power (S, in kVA) is what the supply actually has to deliver, and the three form a right triangle: S\\u00b2 = P\\u00b2 + Q\\u00b2. A motor or transformer is rated in kVA precisely because it has to carry both parts, useful or not.\"]}, {\"title\": \"Power Factor: What It Means and Why It's Penalized\", \"summary\": \"The ratio that decides how much current a supply wastes moving no real power.\", \"body\": [\"Power factor is the ratio of real power to apparent power (cos \\u03c6) \\u2014 a measure of how much of the current a supply delivers is actually doing useful work. A motor-heavy site with poor power factor draws more current than its real power output would suggest, which means thicker cables, bigger transformers, and higher losses for the same useful work.\", \"Utilities often penalize industrial consumers with low power factor for exactly this reason, and the standard fix is a capacitor bank sized to offset the site's inductive reactive power, bringing the ratio closer to 1.\"]}, {\"title\": \"Kirchhoff's Laws: The Bookkeeping Rules Behind Every Circuit\", \"summary\": \"Two simple conservation rules that every circuit, however complex, has to obey.\", \"body\": [\"Kirchhoff's Current Law says that the total current flowing into any junction in a circuit must equal the total current flowing out \\u2014 charge can't pile up or vanish at a node. Kirchhoff's Voltage Law says that the sum of voltage rises and drops around any closed loop in a circuit must equal zero \\u2014 energy gained from a source has to be exactly accounted for by energy lost across the loop's components.\", \"Together these two rules are really just conservation of charge and conservation of energy, restated for circuits, and they're the foundation underneath every systematic circuit analysis technique \\u2014 mesh analysis and nodal analysis are both just organized ways of writing out Kirchhoff's equations for a whole network and solving them simultaneously rather than component by component.\"]}, {\"title\": \"Series vs Parallel Circuits: Why the Two Behave So Differently\", \"summary\": \"The same three resistors, wired two different ways, produce completely different circuit behavior.\", \"body\": [\"In a series circuit, components are connected end to end so the same current flows through each one, and the individual voltage drops add up to the total supply voltage \\u2014 total resistance simply adds. In a parallel circuit, components share the same two nodes, so they each see the full supply voltage, and it's the currents through each branch that add up to the total current drawn from the supply.\", \"This difference in behavior is why household wiring is parallel, not series: each outlet gets the full mains voltage independent of what's plugged into any other outlet, and one device failing open doesn't cut power to the rest of the circuit \\u2014 a decisively practical advantage over the old series-wired Christmas-light problem, where one failed bulb could darken the whole string.\"]}, {\"title\": \"Capacitance and Inductance: Storing Energy in Two Different Fields\", \"summary\": \"Two components that both store energy, but in opposite kinds of field and opposite reaction to change.\", \"body\": [\"A capacitor stores energy in an electric field between two conductive plates separated by an insulator, and it resists sudden changes in voltage \\u2014 current has to flow to charge or discharge it, so its voltage can't jump instantaneously. An inductor stores energy in a magnetic field created by current flowing through a coil, and it resists sudden changes in current instead \\u2014 its voltage will spike to whatever is needed to keep current changing only gradually.\", \"This opposite behavior is exactly why the two are used for different jobs: capacitors smooth voltage ripple and provide bursts of current on demand, while inductors smooth current flow and are the working principle behind transformers, motors, and any device that relies on a changing magnetic field to do useful work.\"]}, {\"title\": \"Impedance: Resistance's More Complicated Cousin in AC Circuits\", \"summary\": \"Why AC circuit analysis needs a number that resistance alone can't capture.\", \"body\": [\"In a DC circuit, resistance alone fully describes how a component opposes current. In an AC circuit, capacitors and inductors also oppose current, but in a way that depends on frequency and shifts the timing between voltage and current rather than simply reducing their magnitude together \\u2014 this frequency-dependent, phase-shifting opposition is called reactance.\", \"Impedance combines resistance and reactance into a single complex quantity that fully describes how a component or circuit behaves under AC, magnitude and phase both \\u2014 and it's why AC circuit analysis uses complex numbers rather than simple arithmetic, since phase relationships between voltage and current genuinely matter for calculating real power, reactive power, and how components interact at a given frequency.\"]}, {\"title\": \"Resonance: When a Circuit's Reactances Cancel Each Other Out\", \"summary\": \"A specific frequency where inductive and capacitive effects exactly offset one another.\", \"body\": [\"An inductor's reactance rises with frequency while a capacitor's reactance falls with frequency, so in a circuit containing both, there's exactly one frequency where the two reactances are equal in magnitude and cancel each other out \\u2014 this is the resonant frequency, and at that point the circuit's impedance is at a minimum (in a series circuit) or maximum (in a parallel circuit), behaving almost purely resistively.\", \"Resonance shows up constructively in tuned radio circuits, filters, and induction heating, where it's deliberately exploited \\u2014 but it can also show up unwanted in power systems, where capacitor banks installed for power factor correction can resonate with the system's own inductance at a harmonic frequency and amplify voltage or current distortion well beyond what either component would produce alone.\"]}, {\"title\": \"RMS Voltage and Current: Why AC Ratings Aren't the Peak Value\", \"summary\": \"The number on an AC nameplate isn't the highest voltage the waveform ever reaches.\", \"body\": [\"An AC sine wave's instantaneous voltage constantly changes, reaching a peak, falling through zero, and reaching an equal negative peak every cycle \\u2014 quoting that peak value wouldn't usefully describe how much real work the supply can do, since the waveform spends very little time near its peak. RMS (root mean square) instead gives the equivalent steady DC value that would deliver the same average power into a resistive load.\", \"That's why standard mains voltages like 230V or 120V are RMS figures, not peak \\u2014 the actual peak voltage of a 230V RMS supply is about 325V. Confusing the two is a common source of error when selecting components rated for peak voltage, such as rectifier diodes or capacitors in a power supply, which have to handle the true peak, not just the quoted RMS figure.\"]}]}, {\"id\": \"power-systems\", \"label\": \"Power Systems\", \"color\": \"#E2934E\", \"notes\": [{\"title\": \"From Power Station to Wall Socket\", \"summary\": \"The stages a unit of electricity passes through before it reaches you.\", \"body\": [\"Electricity generated at a power station starts at a moderate voltage \\u2014 typically a few kV up to around 20-odd kV at the generator terminals. A step-up transformer raises this for transmission, often into the hundreds of kV, because it's far cheaper to move power at high voltage over long distances.\", \"Substations along the way step the voltage back down in stages \\u2014 first to a medium-voltage distribution level, then again at a local transformer near the point of use \\u2014 until it finally reaches a home or building at standard low voltage, single- or three-phase, ready to plug into.\"]}, {\"title\": \"Why We Transmit Power at High Voltage\", \"summary\": \"The trade the entire grid is built around: voltage for current.\", \"body\": [\"For a fixed amount of power, raising the voltage lowers the current needed to deliver it. Since resistive losses in a conductor rise with the square of current \\u2014 not voltage \\u2014 stepping up voltage before transmission is one of the most effective ways to cut losses and use thinner, cheaper conductors over long distances.\", \"That's the entire reason transmission lines run at such high voltages while the equipment at either end \\u2014 generators and household appliances \\u2014 operates at far lower ones: the grid trades voltage for lower current wherever distance makes that trade worthwhile.\"]}, {\"title\": \"Single-Phase vs Three-Phase Supplies\", \"summary\": \"Why industrial motors run smoother than anything in a house.\", \"body\": [\"A three-phase supply is really three AC voltages, each offset from the others by 120\\u00b0, delivered together on the same set of conductors. Because the three waveforms peak at different moments, their combined instantaneous power stays constant rather than pulsing to zero twice a cycle the way single-phase power does.\", \"That's why three-phase motors run smoother and why industrial and commercial installations are almost always three-phase. Single-phase supply, common for individual homes, is simply one of those three phases \\u2014 plus neutral \\u2014 tapped off the same three-phase distribution network.\"]}, {\"title\": \"Why the World Never Agreed on One Voltage or Frequency\", \"summary\": \"There's no physics behind 230V/50Hz vs 120V/60Hz \\u2014 just history.\", \"body\": [\"There's no physical law dictating 230V/50Hz versus 120V/60Hz \\u2014 it's mostly an accident of early engineering choices that later became too expensive to unwind. Edison's original low-voltage DC lighting systems influenced early US voltage levels, and 60Hz emerged from early Westinghouse generator designs; European systems, standardized slightly later with fewer legacy low-voltage installations to protect, settled on higher voltage for better efficiency.\", \"Once millions of appliances, transformers and wiring rules were built around a given standard, switching became more disruptive than living with two systems \\u2014 which is roughly why the divide persists today, and why travel adaptors exist.\"]}, {\"title\": \"Load Flow: Figuring Out Where the Power Actually Goes\", \"summary\": \"A network with multiple sources and paths doesn't distribute power arbitrarily \\u2014 it settles according to physical law.\", \"body\": [\"In a network with more than one source or more than one path between a source and a load, power doesn't split evenly or arbitrarily between the available routes \\u2014 it distributes itself according to the relative impedance of each path, in much the same way current splits between parallel resistors, but complicated by the fact that most real networks are meshed, have multiple voltage levels, and carry AC power with both real and reactive components.\", \"Load flow (or power flow) studies solve this distribution mathematically for a given network and loading condition, showing voltages, currents and power flows throughout the system \\u2014 essential for planning a network's capacity, identifying overloaded lines or transformers, and checking that voltages across the network stay within acceptable limits under both normal and contingency conditions.\"]}, {\"title\": \"Grid Frequency: Why 50Hz or 60Hz Has to Stay Almost Exactly Constant\", \"summary\": \"A single number, held remarkably steady, that reveals whether generation and demand are actually in balance.\", \"body\": [\"A power grid's frequency is set by the rotational speed of its synchronous generators, and it only stays constant when generation and demand are in balance \\u2014 if demand exceeds generation, generators slow slightly and frequency dips; if generation exceeds demand, generators speed up and frequency rises. This makes frequency a real-time signal of the grid's overall supply-demand balance, visible everywhere on an interconnected grid simultaneously.\", \"Grid operators hold frequency within a very tight band \\u2014 a fraction of a percent \\u2014 because many devices, from clocks that once used mains frequency for timekeeping to industrial processes and protection relays, depend on it staying close to nominal. Frequency response services, where certain generators or batteries automatically adjust output as frequency drifts, exist specifically to correct small imbalances before they grow large enough to threaten stability.\"]}, {\"title\": \"Synchronization: Why You Can't Just Connect Two AC Sources Together\", \"summary\": \"Paralleling a generator onto a live grid takes more than matching voltage.\", \"body\": [\"Connecting two AC sources together \\u2014 a standby generator to the grid, or two sections of a network being closed together \\u2014 requires more than matching voltage magnitude. Their frequencies have to match closely, their voltage waveforms have to be in phase (peaking at the same instant), and for three-phase sources, the phase sequence has to match too.\", \"Closing the connection with any of these mismatched can cause a sudden, large circulating current as the two sources effectively fight each other to reconcile the difference \\u2014 potentially damaging the generator, its prime mover, or nearby equipment. Automatic synchronizing relays exist specifically to check all these conditions are met before permitting a breaker to close, which is why generator paralleling isn't simply a matter of throwing a switch once both sources are running.\"]}, {\"title\": \"Interconnected vs Islanded Grids\", \"summary\": \"Most power systems share the load with their neighbors \\u2014 but not always by choice.\", \"body\": [\"An interconnected grid links multiple regions or utility areas together through transmission lines, allowing power to flow between them, sharing reserve generation capacity and improving overall reliability \\u2014 if one area loses a generator, neighboring areas can help supply the shortfall almost instantly through the existing interconnection, rather than that area alone having to cope.\", \"An islanded (or isolated) grid operates independently, without a live connection to a larger network \\u2014 either permanently, as with many remote or island communities, or temporarily, when a fault or planned action separates part of an interconnected grid from the rest. Islanded operation is inherently more fragile: with far less total generation and inertia available, frequency and voltage can swing much further and much faster in response to the same disturbance than they would on a large interconnected system.\"]}, {\"title\": \"Voltage Regulation: Keeping Supply Voltage Within Bounds as Load Changes\", \"summary\": \"A distribution network's voltage doesn't stay fixed on its own \\u2014 it has to be actively managed.\", \"body\": [\"As load on a distribution feeder changes throughout the day, voltage at the far end of the feeder tends to sag under heavy load (due to voltage drop across line impedance) and rise under light load, unless something actively corrects it. Left unmanaged, customers at the far end of a long feeder could see voltage swing outside acceptable limits over the course of a normal day.\", \"Voltage regulation equipment \\u2014 on-load tap changers on transformers, dedicated line voltage regulators, and increasingly, inverter-based control from distributed solar and storage \\u2014 automatically adjusts the effective transformation ratio to hold voltage within its allowed band as load and generation conditions shift. Getting this wrong doesn't just risk equipment operating outside its rated range \\u2014 it degrades performance, from dimmer lighting to motors running hotter than they should at reduced voltage.\"]}, {\"title\": \"Why Renewable Generation Complicates Grid Stability\", \"summary\": \"Spinning generators offered the grid something that inverter-based renewables don't naturally provide.\", \"body\": [\"Traditional generators \\u2014 coal, gas, hydro, nuclear \\u2014 are large spinning masses directly coupled to the grid's frequency, and that physical rotation stores kinetic energy that naturally resists sudden frequency changes, a property called inertia. Solar panels and, in most configurations, wind turbines connect to the grid through power electronics rather than a directly coupled spinning mass, so they don't inherently provide that same natural inertial response.\", \"As renewable generation makes up a larger share of a grid's total generation, that loss of natural inertia can make the grid more sensitive to sudden imbalances, requiring new approaches \\u2014 synthetic inertia from inverter control algorithms, fast-acting battery storage, or simply retaining enough conventional generation online \\u2014 to maintain the stability that inertia used to provide almost as a side effect of how the older generation fleet was built.\"]}]}, {\"id\": \"protection\", \"label\": \"Protection & Switchgear\", \"color\": \"#C1662B\", \"notes\": [{\"title\": \"Discrimination (Selectivity): Letting Only One Device Trip\", \"summary\": \"Why a fault in one socket shouldn't black out the whole building.\", \"body\": [\"When a fault occurs anywhere in a network, you generally want only the protective device closest to it to trip \\u2014 not the whole building going dark because of a fault in one socket outlet. This is called discrimination, or selectivity, and it's achieved by grading protective devices so that downstream devices operate faster than the ones upstream of them for the same fault.\", \"Get the grading wrong, and either the wrong device trips first (nuisance outages) or two devices trip together (unnecessary loss of supply) \\u2014 which is why coordinating protection through a network, not just sizing each device in isolation, matters.\"]}, {\"title\": \"How an RCD Detects a Fault You Can't See\", \"summary\": \"It isn't watching for high current at all \\u2014 it's watching for imbalance.\", \"body\": [\"A residual current device compares the current flowing out to a circuit on the line conductor against the current returning on the neutral. In a healthy circuit, they're equal \\u2014 whatever goes out comes back.\", \"If some current is leaking to earth instead, through a person or damaged insulation, the two no longer match, and that imbalance is what an RCD's internal current transformer detects. Cross a small threshold \\u2014 commonly 30mA for protection against electric shock \\u2014 and the device trips in milliseconds, fast enough in many cases to prevent a dangerous shock from becoming a fatal one.\"]}, {\"title\": \"Fuses vs Circuit Breakers: Two Different Philosophies\", \"summary\": \"One sacrifices itself. The other resets and does it again.\", \"body\": [\"A fuse and a circuit breaker do the same basic job \\u2014 interrupt current when it's too high \\u2014 through very different philosophies. A fuse is a sacrificial element: a metal strip sized to melt at a defined current, breaking the circuit once and needing physical replacement afterward.\", \"A circuit breaker is a mechanical switch with a thermal and/or magnetic trip mechanism that can be reset and reused after tripping. Fuses tend to react faster to very high fault currents and remain common for that reason, while breakers offer the convenience of resetting and, in modern electronic versions, far more adjustable tripping characteristics.\"]}, {\"title\": \"Overcurrent Protection: The Simplest Protection Principle There Is\", \"summary\": \"Most protection, however it's implemented, comes back to one basic idea: too much current for too long is a problem.\", \"body\": [\"Overcurrent protection interrupts a circuit when current exceeds a set threshold for longer than a set time, on the basic premise that sustained excessive current \\u2014 whether from an overload or a short circuit \\u2014 causes damaging heat in conductors and equipment. The relationship between how much current and how long it's allowed to flow is deliberately inverse: a small overload is tolerated for a fairly long time, while a severe fault is cleared almost instantly.\", \"This inverse-time characteristic is what a time-current curve actually plots, and it's the basis for coordinating multiple overcurrent devices in a network \\u2014 a downstream device's curve is set to operate faster than the upstream device's curve for the same fault current, ensuring the closest device to a fault clears it before the upstream device has to act at all.\"]}, {\"title\": \"Differential Protection: Comparing What Goes In Against What Comes Out\", \"summary\": \"One of the fastest and most selective forms of protection, built on a deceptively simple comparison.\", \"body\": [\"Differential protection compares the current entering a protected zone \\u2014 a transformer, a busbar, a length of cable \\u2014 against the current leaving it. In healthy operation, under Kirchhoff's Current Law, the two should be equal (accounting for any known transformation ratio). If a fault occurs inside the protected zone, that balance is broken, and the resulting difference current is what trips the protection.\", \"Because differential protection only responds to faults genuinely inside its own zone, it's inherently selective and doesn't need to be time-graded against other protection elsewhere in the network the way overcurrent protection does \\u2014 which lets it operate very fast, often within one or two cycles, making it a preferred choice for protecting expensive, critical equipment like large transformers and generators where speed limits fault damage.\"]}, {\"title\": \"Earth Fault vs Phase Fault Protection\", \"summary\": \"Not every fault looks the same to a protection relay, so not every fault is detected the same way.\", \"body\": [\"A phase fault \\u2014 a short circuit between two or more live conductors \\u2014 typically produces a large fault current that standard overcurrent protection is well suited to detect. An earth fault \\u2014 where a live conductor makes contact with earth or an earthed metal part \\u2014 can produce a much smaller fault current, especially on systems with high-impedance earthing, potentially too small for standard phase overcurrent protection to reliably detect.\", \"Earth fault protection is therefore usually implemented separately, often using a specific earth fault relay that measures residual current (the imbalance between phase currents that indicates current is leaking to earth rather than returning through the expected conductors) with a much more sensitive threshold than phase overcurrent protection uses \\u2014 letting a system detect and clear a dangerous earth fault long before it would ever be large enough to trip ordinary phase protection.\"]}, {\"title\": \"Directional Protection: Knowing Not Just That a Fault Occurred, but Which Way\", \"summary\": \"In a meshed network, detecting a fault isn't enough \\u2014 you also need to know which direction it's coming from.\", \"body\": [\"In a simple radial network, fault current only ever flows one way \\u2014 from source to fault \\u2014 so a relay only needs to detect that current exceeds a threshold. In a meshed or interconnected network, current can flow to a given point from more than one direction, and a relay that only measures magnitude can't tell whether a fault it's seeing is actually within its own protected zone or is being fed from the opposite direction by another part of the network.\", \"Directional protection adds a comparison of current phase against a reference voltage to determine which way the fault current is actually flowing, letting a relay respond only to faults in the direction it's actually responsible for \\u2014 a capability that's essential wherever a network has multiple possible fault-current paths and simple non-directional overcurrent protection alone would risk maloperating or failing to coordinate correctly.\"]}, {\"title\": \"Auto-Reclosing: Why Some Breakers Try Again Before Giving Up\", \"summary\": \"Many overhead line faults are temporary \\u2014 auto-reclosing is built around exploiting that fact.\", \"body\": [\"A large share of faults on overhead distribution and transmission lines are transient \\u2014 caused by lightning, wind-blown debris briefly bridging conductors, or a tree branch swinging into a line and then away \\u2014 and clear on their own the instant the arc is de-energized. A permanent fault, by contrast, persists because the underlying cause (a broken conductor, a failed insulator) doesn't go away just because the circuit was interrupted.\", \"Auto-reclosing exploits this distinction: after a protective device trips, the breaker automatically closes again after a short delay to see whether the fault has cleared itself. If it has, supply is restored automatically without any manual intervention; if the fault is still present, the breaker trips again, sometimes after a couple of further reclose attempts, before locking out and requiring manual investigation \\u2014 a strategy that measurably improves reliability on overhead networks precisely because so many of their faults are transient rather than permanent.\"]}, {\"title\": \"Under-Voltage and Over-Voltage Protection\", \"summary\": \"Protection isn't only about too much current \\u2014 voltage straying too far outside its normal range is its own hazard.\", \"body\": [\"Under-voltage protection trips equipment when supply voltage falls too low for too long, protecting motors from stalling or overheating at reduced voltage, and protecting sensitive electronic loads from misoperating on an inadequate supply. Over-voltage protection does the reverse, tripping when voltage rises too high, protecting insulation and equipment from stresses beyond their design rating.\", \"Both are especially important around switching events and disturbances \\u2014 a sudden loss of load can cause voltage to spike upward, while a heavy fault elsewhere on the network can drag voltage down across a wide area \\u2014 and under/over-voltage relays are often set with an intentional time delay, so brief, harmless voltage dips or swells during normal switching don't cause unnecessary trips, while genuinely sustained excursions still get cleared.\"]}, {\"title\": \"Protection Relay Testing and Why It Can't Just Be Assumed to Work\", \"summary\": \"A protection system that's never actually tested is a protection system whose reliability is simply unknown.\", \"body\": [\"Protection relays sit largely idle under normal operating conditions, only called on to act during the rare event of an actual fault \\u2014 which is exactly why testing matters so much: a relay with a wiring error, a wrong setting, or a failed component can look completely normal on the panel for years while being unable to actually clear a fault when one finally occurs.\", \"Commissioning tests verify a relay's settings, wiring, and current/voltage transformer connections are all correct before a system is first energized, and periodic maintenance testing thereafter re-verifies that settings haven't drifted and the relay still operates correctly \\u2014 often by injecting simulated fault current and voltage signals into the relay and confirming it trips at the expected threshold and time, rather than simply trusting that a device configured correctly once will stay that way indefinitely.\"]}]}, {\"id\": \"cables\", \"label\": \"Cables & Wiring\", \"color\": \"#4FA88F\", \"notes\": [{\"title\": \"What's Actually Inside a Power Cable\", \"summary\": \"A cable is built in layers, and each layer has one job.\", \"body\": [\"A power cable is built in layers, each with its own job. At the centre is the conductor \\u2014 copper or aluminium \\u2014 sized for current-carrying capacity. Around it, insulation keeps the conductor electrically separate from everything else.\", \"Bedding and any armouring (typically steel wire or tape) come next, giving the cable mechanical protection against impact, crushing, or rodents, especially where it's buried or exposed. An outer sheath, often PVC or a similar polymer, seals the whole assembly against moisture and the environment. Higher-voltage cables add extra layers still \\u2014 conductor and insulation screens \\u2014 to control the electric field within the cable.\"]}, {\"title\": \"PVC, XLPE and EPR: Common Cable Insulation Types\", \"summary\": \"No insulation is universally \\u201cbetter\\u201d \\u2014 each survives a different job.\", \"body\": [\"PVC is the everyday choice for low-voltage cables \\u2014 cheap, flexible, and adequate for typical building wiring, though it has a comparatively modest maximum operating temperature. XLPE (cross-linked polyethylene) tolerates significantly higher temperatures for the same size conductor, which is why it dominates medium- and high-voltage cable and higher-capacity LV installations.\", \"EPR (ethylene propylene rubber) trades some of XLPE's thermal performance for flexibility and resilience, making it common in cables that get flexed or handled often \\u2014 mining equipment, ships, portable industrial gear. The choice depends on the temperature, flexibility and environment the cable has to survive, not on one insulation being categorically superior.\"]}, {\"title\": \"Why Cables Get Derated\", \"summary\": \"A cable's rated capacity assumes conditions your installation may not match.\", \"body\": [\"A cable's rated current-carrying capacity assumes a specific set of installation conditions, and real installations rarely match those exactly. Higher ambient temperature than the rating assumes reduces how much heat the cable can safely shed, so its allowable current has to come down.\", \"Bundling cables together means they all warm each other, so grouped cables carry less current each than the same cable run alone. The installation method matters too \\u2014 a cable in free air sheds heat far more easily than the same cable buried in the ground or enclosed in conduit. Each of these factors has a correction figure applied to the base rating in cable sizing tables \\u2014 a sizing exercise, and deliberately not something this page gets into.\"]}, {\"title\": \"Ampacity: A Cable's Real Current Limit Isn't a Fixed Number\", \"summary\": \"The current a cable can safely carry depends on far more than just its cross-sectional area.\", \"body\": [\"A cable's ampacity \\u2014 its safe continuous current-carrying capacity \\u2014 is fundamentally limited by heat: current flowing through a conductor generates I\\u00b2R heating, and that heat has to be dissipated fast enough to keep the conductor and its insulation below a maximum safe operating temperature. A thicker conductor has lower resistance and generates less heat for the same current, which is the basic reason larger cables carry more current.\", \"But cross-sectional area alone doesn't determine ampacity \\u2014 how effectively the cable can shed that heat to its surroundings matters just as much, which is why cable ratings are always published alongside a specific set of assumed installation conditions (ambient temperature, grouping, installation method), and why the same physical cable can have several different published ampacity figures depending on how it's actually installed.\"]}, {\"title\": \"Skin Effect: Why Large Conductors Don't Carry Current Evenly\", \"summary\": \"At AC, current crowds toward a conductor's surface, making the middle of a large cable almost redundant.\", \"body\": [\"At DC, current distributes evenly across a conductor's entire cross-section. At AC, the conductor's own changing magnetic field induces effects that push current toward the outer surface, a phenomenon called skin effect, and it grows more pronounced as frequency rises and as conductor size increases.\", \"For ordinary conductors at 50/60Hz, skin effect is fairly minor for typical cable sizes but becomes significant for very large conductors, effectively wasting some of the conductor's central cross-section that carries little current relative to its share of the total area. This is one of several reasons very high-current conductors are often built from several smaller stranded or bundled conductors instead of one large solid one \\u2014 spreading the same total copper across more surface area uses it more efficiently under AC.\"]}, {\"title\": \"Why Cable Screens and Armour Are Earthed the Way They Are\", \"summary\": \"A cable's metallic layers need a deliberate, specific earthing arrangement \\u2014 not just 'connected to earth somewhere.'\", \"body\": [\"Medium- and high-voltage cables often include a metallic screen around the insulation, primarily to contain the electric field within the cable and provide a controlled return path for fault current, plus armour for mechanical protection. How these metallic layers are earthed \\u2014 bonded solidly at both cable ends, or only at one end with the other end left open through a surge voltage limiter \\u2014 is a deliberate design decision, not an afterthought.\", \"Solid bonding at both ends is simplest but allows circulating current to flow in the screen whenever the cable carries load current, adding extra heating and reducing the cable's effective ampacity \\u2014 sometimes significantly on long, high-current runs. Single-point bonding avoids that circulating current but leaves a voltage that can appear on the screen at the open end during a fault, which is why single-point bonded systems need their own protection against that induced voltage.\"]}, {\"title\": \"Voltage Drop: Why a Cable Sized for Current Alone Can Still Be Wrong\", \"summary\": \"Ampacity and voltage drop are two separate checks, and a cable has to pass both, not just one.\", \"body\": [\"A cable sized purely for ampacity \\u2014 able to carry the design current without overheating \\u2014 can still fail a different requirement entirely: keeping voltage drop along its length within acceptable limits. Every metre of conductor has some resistance and reactance, and current flowing through that impedance causes a voltage drop that grows with both cable length and current.\", \"On long cable runs especially, voltage drop rather than ampacity often becomes the governing factor in sizing \\u2014 a cable technically large enough to carry the current without overheating might still need to be sized up further just to keep the voltage delivered at the far end within the percentage limits standards specify, since equipment fed with insufficient voltage can misoperate, run inefficiently, or fail to start at all.\"]}, {\"title\": \"Cable Joints and Terminations: Where Most Cable Failures Actually Happen\", \"summary\": \"The cable itself is rarely the weak point \\u2014 the connections at either end usually are.\", \"body\": [\"A length of properly manufactured cable is a remarkably reliable, homogeneous product, engineered and tested as a continuous whole. Joints and terminations, by contrast, are made in the field, by hand, under real-world conditions \\u2014 and statistically, they're where a disproportionate share of cable system failures actually originate, from poor workmanship, contamination, or a termination not properly rated for the cable's voltage class.\", \"This is exactly why joint and termination work on medium- and high-voltage cables is treated as a specialized skill with its own training and certification, and why termination kits are matched precisely to cable type, size and voltage rather than treated as generic hardware \\u2014 a mismatched or poorly executed termination can leave a stress concentration in the electric field at exactly the point most likely to eventually break down.\"]}, {\"title\": \"Cable Faults: How Locating One Actually Works\", \"summary\": \"Finding a fault buried in a kilometre of underground cable is its own specialized discipline.\", \"body\": [\"Once a cable fault is confirmed to exist, pinpointing its exact physical location \\u2014 especially on a buried or otherwise inaccessible run \\u2014 is a distinct technical challenge from detecting the fault in the first place. Time-domain reflectometry sends a pulse down the cable and measures how long it takes for a reflection to return from the fault, using the cable's known propagation velocity to calculate distance.\", \"For high-resistance faults that don't reflect a pulse clearly, a thumper (surge generator) can be used to convert the fault into an audible or detectable disturbance at the surface, letting a technician walk the cable route with a listening device to zero in on the exact point. Locating a fault precisely before excavating isn't just convenience \\u2014 digging up the wrong section of a buried run wastes time and money and risks damaging an otherwise healthy cable.\"]}, {\"title\": \"Why Aluminium Conductors Aren't Simply a Cheaper Substitute for Copper\", \"summary\": \"Aluminium and copper conductors aren't interchangeable one-for-one \\u2014 the differences run deeper than just conductivity.\", \"body\": [\"Aluminium conducts electricity less well than copper by volume \\u2014 roughly 60% of copper's conductivity \\u2014 so an aluminium conductor needs a larger cross-section than copper to carry the same current, though aluminium's much lower density means it can still end up lighter overall for the same ampacity. This trade-off is why aluminium is common in overhead lines, where weight savings matter enormously, and less common in tight spaces where every millimetre of conduit fill counts.\", \"Aluminium also forms a tenacious oxide layer that's both an electrical insulator and mechanically hard, meaning aluminium terminations need specific preparation (wire brushing, oxide-inhibiting compound) and torque values that differ from copper \\u2014 improperly terminated aluminium connections have a well-documented history of loosening over time and overheating, which is a workmanship and connector-selection issue much more than a fundamental flaw in the material itself.\"]}]}, {\"id\": \"machines\", \"label\": \"Machines\", \"color\": \"#6E93C7\", \"notes\": [{\"title\": \"How a Transformer Moves Power Without Moving Parts\", \"summary\": \"No contact, no motion \\u2014 just a shared magnetic field.\", \"body\": [\"A transformer moves electrical power from one circuit to another with no physical contact between them and no moving parts at all. Two windings share a common iron core; alternating current in the primary winding creates a changing magnetic flux in the core, and that changing flux induces a voltage in the secondary winding purely through mutual induction.\", \"The voltage ratio between the two windings follows their turns ratio directly. This dependence on a changing flux is also why transformers only work with AC \\u2014 feed one steady DC and, after a brief initial transient, nothing more gets induced in the secondary at all.\"]}, {\"title\": \"How an Induction Motor Creates Rotation From a Rotating Field\", \"summary\": \"The rotor can never quite catch the field chasing it \\u2014 and that's the point.\", \"body\": [\"An induction motor's stator winding, fed from a three-phase supply, produces a magnetic field that rotates around the motor at a speed set by the supply frequency and the number of poles wound into the stator. That rotating field sweeps past the conductors in the rotor and induces a current in them, exactly as a transformer induces current in its secondary.\", \"The induced current in the rotor creates its own magnetic field, and the interaction between the two fields produces the torque that spins the rotor. The rotor can never quite catch up to the stator's field \\u2014 it always trails slightly, a difference called \\u201cslip\\u201d \\u2014 because it's that very difference in speed that induces the current driving it in the first place.\"]}, {\"title\": \"Synchronous vs Induction Motors: Two Different Ways to Turn a Rotating Field Into Torque\", \"summary\": \"Both motor types use a rotating magnetic field, but they lock onto it in fundamentally different ways.\", \"body\": [\"An induction motor's rotor has no direct electrical connection to a supply \\u2014 current is induced in it by the stator's rotating field, and that induction only happens because the rotor runs slightly slower than the field itself (slip), which is exactly what generates the changing flux needed to induce current in the first place. A synchronous motor's rotor instead carries its own field, either from permanent magnets or a separately excited winding, and locks onto the stator's rotating field exactly, running at precisely synchronous speed with zero slip.\", \"That zero-slip behavior gives synchronous motors precise, load-independent speed and the ability to run at a leading power factor (useful for power factor correction on a site), but they generally need more complex starting arrangements than the simple, robust induction motor, which is why induction motors remain the default choice for the vast majority of general industrial and commercial applications.\"]}, {\"title\": \"Motor Starting Methods: Why You Can't Always Just Switch One On\", \"summary\": \"A motor's inrush current at startup can be several times its running current \\u2014 and that has consequences.\", \"body\": [\"An induction motor started directly across the line draws a large inrush current, often five to eight times its full-load running current, because at standstill the rotor presents very little impedance to the stator's field \\u2014 that current only falls back to normal running levels once the motor is up to speed. For small motors this is rarely a problem, but for large motors, that inrush can cause an unacceptable voltage dip on the supply, affecting other connected equipment.\", \"Reduced-voltage starting methods \\u2014 star-delta starting, autotransformer starters, soft starters, and variable frequency drives \\u2014 all work by limiting the voltage (and therefore the current and starting torque) applied to the motor during the acceleration period, trading off starting torque against reduced inrush current and gentler mechanical starting, with the right method depending on the specific motor, load, and how sensitive the supply is to the resulting voltage dip.\"]}, {\"title\": \"Motor Insulation Classes: What the Letter on the Nameplate Actually Means\", \"summary\": \"A motor's insulation class sets the maximum temperature its winding insulation is designed to survive.\", \"body\": [\"Motor insulation is rated into classes \\u2014 commonly B, F, and H \\u2014 each defined by the maximum continuous temperature the insulation system is designed to withstand without accelerated degradation: roughly 130\\u00b0C for Class B, 155\\u00b0C for Class F, and 180\\u00b0C for Class H, measured as the total of ambient temperature plus the winding's own temperature rise under load.\", \"A motor is often designed with a margin between its insulation class limit and its actual expected operating temperature rise \\u2014 a Class F insulated motor operated within Class B temperature rise limits, for instance, gains extra thermal margin that translates into a longer expected insulation life, since insulation life broadly follows an exponential relationship with operating temperature: every roughly 10\\u00b0C of sustained overtemperature can cut expected insulation life significantly.\"]}, {\"title\": \"Why Motors Are Rated by Duty Cycle, Not Just Power\", \"summary\": \"A motor's power rating alone doesn't say whether it's meant to run continuously or in short bursts.\", \"body\": [\"A motor's nameplate power rating is tied to a specific duty cycle classification (S1 through S9 under IEC standards), describing the pattern of loading and rest the rating actually applies to. S1 (continuous duty) means the motor can run at its rated power indefinitely; other classes describe intermittent duty, short-time duty, or duty with specific load and rest periods \\u2014 a motor rated for S1 at a given power can typically be run harder for a genuinely short period, while a motor rated for short-time duty at that same power would overheat if actually run continuously at it.\", \"Applying a motor to a duty cycle it wasn't rated for \\u2014 using an intermittent-duty motor in a continuous application, for instance \\u2014 is a common and costly selection mistake, since the nameplate power figure alone, without checking the duty class it's tied to, doesn't tell the whole story of what the motor can actually sustain.\"]}, {\"title\": \"Generators: Turning Mechanical Rotation Into Electrical Power\", \"summary\": \"A generator is fundamentally the same machine as a motor, just running the energy conversion in reverse.\", \"body\": [\"A generator converts mechanical rotational energy into electrical energy through electromagnetic induction \\u2014 spinning a conductor (or a magnetic field) relative to the other induces a voltage, exactly the reverse process of a motor converting electrical energy into mechanical rotation. In fact, many machines are physically capable of running as either a motor or a generator depending on whether mechanical or electrical energy is being put in.\", \"Standby and emergency generators are typically synchronous machines, chosen because their output voltage and frequency are directly tied to rotational speed and field excitation, giving precise, controllable output independent of load \\u2014 unlike an induction generator, which needs an external reactive power source to establish its magnetic field and can't easily operate disconnected from a larger grid on its own.\"]}, {\"title\": \"Motor Efficiency Classes: IE1 Through IE4 and What They Actually Change\", \"summary\": \"A more efficient motor isn't just cheaper to run \\u2014 the efficiency comes from specific, identifiable design changes.\", \"body\": [\"IEC 60034-30 defines standardized efficiency classes for induction motors \\u2014 IE1 (standard efficiency) through IE4 (super premium efficiency) and beyond \\u2014 based on measured losses at rated load. Moving up an efficiency class isn't free: it typically comes from using more copper in the windings (lowering resistive losses), better-quality steel laminations (lowering iron losses), and tighter manufacturing tolerances (lowering friction and windage losses), all of which add cost and sometimes size to the motor.\", \"For a motor running many hours a year, the extra upfront cost of a higher efficiency class is often recovered through energy savings well within the motor's service life, which is why many jurisdictions now mandate minimum efficiency classes for newly installed motors above a certain power threshold \\u2014 treating motor efficiency as a genuine energy policy lever, not just an optional upgrade for the cost-conscious buyer.\"]}, {\"title\": \"Why Motors Are Derated for Altitude and Ambient Temperature\", \"summary\": \"A motor's rated power assumes specific standard conditions \\u2014 deviate from them and the rating no longer fully applies.\", \"body\": [\"A motor's nameplate power rating is established under standard reference conditions, typically an ambient temperature around 40\\u00b0C and an altitude near sea level. At higher ambient temperatures, the motor has less thermal margin to dissipate its own losses before reaching its insulation's temperature limit, so its safe continuous output has to be reduced \\u2014 derated \\u2014 to compensate.\", \"At high altitude, air is less dense, which reduces the cooling effectiveness of a motor's fan and forced-air cooling system for the same design, requiring a similar derating even if ambient temperature itself is unchanged. Both effects are why motor selection for unusual environments \\u2014 a hot industrial process area, or a site at significant elevation \\u2014 checks the manufacturer's specific derating tables rather than assuming the standard nameplate rating simply applies everywhere.\"]}, {\"title\": \"Motor Bearing Currents: An Electrical Problem That Shows Up as a Mechanical Failure\", \"summary\": \"Modern variable frequency drives can create a stray current path that quietly destroys motor bearings.\", \"body\": [\"The fast switching in a variable frequency drive's output creates high-frequency voltage components that can induce a small voltage on the motor shaft itself, relative to the frame \\u2014 if that shaft voltage is high enough, it can discharge through the bearing's lubricating film as tiny electrical discharges rather than flowing through the intended electrical path. Over time, these repeated micro-discharges pit and erode the bearing races, a failure mode called electrical discharge machining damage.\", \"Because the resulting bearing failure looks mechanically like ordinary wear or fatigue, the electrical root cause is easy to miss unless it's specifically suspected \\u2014 which is why VFD-driven motors above certain power levels are increasingly fitted with shaft grounding rings or insulated bearings specifically to interrupt this stray current path, treating it as a foreseeable consequence of drive-based speed control rather than a rare or unusual failure mode.\"]}]}, {\"id\": \"earthing\", \"label\": \"Earthing & Bonding\", \"color\": \"#B7A339\", \"notes\": [{\"title\": \"TN, TT and IT: The Three Earthing System Families\", \"summary\": \"How the supply's earth and your equipment's metal are \\u2014 or aren't \\u2014 connected.\", \"body\": [\"Earthing systems describe how a supply's earth point and an installation's exposed metal parts are connected, and IEC standards group them into three families. In a TN system, the supply is earthed at the source, and the installation's exposed metal is connected back to that same earth via a protective conductor \\u2014 the most common arrangement in most countries' urban networks.\", \"In a TT system, the supply is earthed at the source too, but the installation uses its own independent local earth electrode instead of relying on the supply's earth connection. In an IT system, the source is either unearthed or earthed through a high impedance, so a single fault to earth doesn't immediately force a trip \\u2014 valued in settings like hospitals or ships, where continuity of supply through a first fault matters more than instant disconnection.\"]}, {\"title\": \"Why We Earth an Installation At All\", \"summary\": \"It's not tradition \\u2014 it's what lets protection work and keeps touch voltage low.\", \"body\": [\"Earthing gives fault current somewhere low-impedance to go, which is what allows protective devices to detect a fault quickly and clear it. Just as importantly, it keeps the exposed metal parts of an installation \\u2014 enclosures, conduit, machine frames \\u2014 close to earth potential during a fault, limiting the voltage a person could be exposed to by touching them.\", \"Without a proper earth connection, a fault to a metal enclosure could leave that enclosure live indefinitely, with nothing forcing the circuit to trip and nothing keeping its potential safely close to the ground someone is standing on.\"]}, {\"title\": \"Earth Electrode Resistance: Why 'Earthed' Isn't a Yes-or-No Property\", \"summary\": \"Every earth connection has a measurable resistance to the general mass of earth \\u2014 and that number matters.\", \"body\": [\"An earth electrode doesn't connect to some idealized, zero-resistance 'ground' \\u2014 it connects to the actual soil around it, which has its own resistivity, and the electrode-to-earth connection has a real, measurable resistance that depends on the electrode's size, shape, depth, and the soil conditions surrounding it. Lower soil resistivity (wetter, more conductive soil) generally gives lower electrode resistance for the same electrode.\", \"This resistance value matters directly for protection: it sets a limit on how much fault current can actually flow to earth through that electrode, and in turn on how quickly a protective device can detect and clear an earth fault. Sites with poor natural soil conditions \\u2014 very dry, sandy, or rocky ground \\u2014 often need larger or multiple interconnected electrodes, or added measures like conductive backfill, specifically to bring earth resistance down to an acceptable value.\"]}, {\"title\": \"Touch Voltage and Step Voltage: Two Different Ways a Fault Can Reach a Person\", \"summary\": \"The danger from an earth fault isn't confined to whatever is directly touched \\u2014 the ground around it becomes hazardous too.\", \"body\": [\"Touch voltage is the potential difference a person could experience between a faulted piece of equipment they're touching and the ground they're standing on \\u2014 it's what earthing and bonding are primarily designed to limit. Step voltage is different: during a significant earth fault, current spreading out through the soil creates a voltage gradient across the ground itself, meaning a person simply standing near the fault, with one foot closer to it than the other, can experience a dangerous voltage between their two feet without touching anything at all.\", \"Substations and other sites with potentially large earth fault currents are specifically designed with earthing grids and surface treatments (like a layer of crushed rock) intended to control both touch and step voltage within safe limits \\u2014 a design consideration that goes well beyond simply 'having an earth connection' and treats the ground itself as part of the electrical system that has to be engineered.\"]}, {\"title\": \"Equipotential Bonding: Making Sure Nearby Metal Doesn't Sit at a Different Potential\", \"summary\": \"Bonding isn't primarily about connecting to earth \\u2014 it's about keeping accessible metal parts at the same potential as each other.\", \"body\": [\"Equipotential bonding connects together the extraneous conductive parts within a building or installation \\u2014 water pipes, gas pipes, structural steel, and similar \\u2014 so that under normal or fault conditions, they're all held at, or very close to, the same electrical potential as each other. The goal isn't primarily to send current somewhere specific; it's to eliminate the voltage difference that would otherwise exist between two pieces of metal a person could touch simultaneously.\", \"Without bonding, a fault current flowing through one metal system (say, a faulted appliance connected to a water pipe) could raise that pipe's potential relative to another unconnected metal part nearby, creating a genuine shock hazard for anyone bridging the two \\u2014 which is exactly the scenario main equipotential bonding is installed specifically to prevent, independent of and in addition to the protective earthing that clears the fault itself.\"]}, {\"title\": \"Why Neutral and Earth Are Bonded at One Point Only\", \"summary\": \"The neutral-earth bond is deliberately made in exactly one place \\u2014 and that placement matters enormously.\", \"body\": [\"In most low-voltage systems, the neutral conductor is connected to earth at a single, defined point, typically at the main supply transformer or the main incoming distribution point of an installation \\u2014 this single bond is what gives the neutral conductor its reference to earth potential and is what makes earth fault protection using neutral/earth imbalance possible at all.\", \"Bonding neutral to earth at more than one point creates parallel paths for neutral current to return through earth as well as through the neutral conductor itself, which can cause circulating currents, interfere with earth fault protection's ability to correctly detect genuine faults, and in some configurations create genuinely hazardous touch voltages on earthed equipment during normal operation \\u2014 which is exactly why the single-point bonding rule is treated as a firm requirement in wiring regulations rather than a preference.\"]}, {\"title\": \"Functional Earthing vs Protective Earthing\", \"summary\": \"Not every earth connection in a system exists to protect people \\u2014 some exist purely to make the equipment work correctly.\", \"body\": [\"Protective earthing exists specifically for safety \\u2014 connecting exposed metal parts to earth so that a fault drives enough current to operate protection quickly, and so touch voltage stays within safe limits. Functional earthing serves an entirely different purpose: some electronic and communications equipment needs an earth reference purely for correct technical operation \\u2014 noise reduction, signal reference, or surge protection \\u2014 independent of any safety requirement.\", \"The two purposes can call for genuinely different earthing arrangements, and equipment specifications sometimes distinguish clean or functional earth connections from the general protective earth specifically to avoid noise or interference from the protective earthing system, even though both ultimately connect back to the same overall earthing system in a properly designed installation.\"]}, {\"title\": \"Earth Fault Loop Impedance: Why It's Checked, Not Just Assumed\", \"summary\": \"A protective device can only clear a fault fast enough if the full fault-current path actually allows enough current to flow.\", \"body\": [\"For a protective device to clear an earth fault within its required time, enough fault current has to actually flow \\u2014 and how much current flows depends on the total impedance of the entire fault loop: from the source, through the live conductor to the point of the fault, through the earth fault path (protective conductor and earthing), and back to the source. This total is the earth fault loop impedance, and it has to be low enough that a fault produces sufficient current to trip the protective device within its rated operating time.\", \"This is exactly why loop impedance is measured as part of electrical installation testing rather than simply assumed adequate from cable and earthing sizes on paper \\u2014 a loop impedance too high for the protective device installed means a genuine earth fault might not trip fast enough (or at all), leaving faulted equipment live and dangerous for longer than the protection scheme was ever intended to allow.\"]}]}, {\"id\": \"safety\", \"label\": \"Safety\", \"color\": \"#D65B4A\", \"notes\": [{\"title\": \"What Actually Makes Electric Shock Dangerous\", \"summary\": \"It's current through the body, not voltage, that decides the outcome.\", \"body\": [\"It's current through the body, not voltage on its own, that determines how dangerous an electric shock is \\u2014 which is why a small static shock at thousands of volts can be harmless while much lower voltages have killed people, depending on the path and resistance involved.\", \"The path matters enormously: current crossing the chest, hand to hand or hand to foot, risks passing through the heart, while a shock confined to one limb is generally far less dangerous. Duration matters too \\u2014 the longer current flows, the greater the risk. Currents well under what would cause a burn can still be enough to disrupt the heart's own electrical rhythm, which is the real hazard behind most electrocution fatalities, not thermal injury.\"]}, {\"title\": \"Arc Flash: What It Is and Why It's Feared\", \"summary\": \"A fault that jumps through air instead of metal \\u2014 and that's what makes it violent.\", \"body\": [\"An arc flash is a sudden, violent release of energy when a fault causes current to jump through the air, ionizing it into a conductive arc. Rather than a more familiar bolted short circuit, the fault current in an arc flash flows through air, which resists it far more than a direct metal-to-metal fault would \\u2014 and that resistance is exactly what generates the intense heat, blinding light, and pressure wave that make arc flash so dangerous.\", \"Temperatures at the arc can briefly exceed those on the surface of the sun. How much energy reaches a worker depends heavily on the fault current available, how long protection takes to clear it, and how far the worker is standing from the event \\u2014 all factors electrical designers deliberately try to minimize.\"]}, {\"title\": \"Why Electrical PPE Is Rated, Not Just \\u201cInsulated\\u201d\", \"summary\": \"Wearing something rated isn't the same as wearing something rated for this job.\", \"body\": [\"Electrical PPE isn't a binary \\u201cinsulated or not\\u201d \\u2014 gloves, sleeves and clothing are rated for specific voltage classes or specific levels of arc-flash energy, and using the wrong rating for the job leaves a worker exposed despite appearing protected.\", \"Voltage-rated gloves, for instance, are tested and classed for a maximum working voltage, and reaching for a lower class than the job requires defeats the point of wearing them at all. Arc-rated clothing is similarly rated by how much incident energy it can withstand before it would ignite or transfer damaging heat through to the wearer. Matching PPE to the actual hazard present \\u2014 not just wearing \\u201csomething rated\\u201d \\u2014 is the entire basis of how these ratings are meant to be used.\"]}, {\"title\": \"Working Distance: Why Standing Farther Back Is a Real Layer of Protection\", \"summary\": \"Distance from an electrical hazard isn't just common sense \\u2014 it's a quantifiable, deliberately calculated protective measure.\", \"body\": [\"Both shock hazard and arc flash hazard fall off sharply with distance \\u2014 the further a person is from a live conductor or a potential arc source, the lower their exposure, following relationships that arc-flash studies and shock-hazard boundaries calculate explicitly rather than leave to intuition. This is why standards define specific approach boundaries \\u2014 limited, restricted, and prohibited distances from exposed live parts \\u2014 each requiring a different, escalating level of qualification and protective equipment to cross.\", \"Working distance also factors directly into PPE selection: arc-flash incident energy calculations are always tied to a specific assumed working distance, which is why PPE rated for a task at the standard working distance may not be adequate if the actual task genuinely requires working closer to the hazard than that calculation assumed.\"]}, {\"title\": \"Why Voltage-Rated Tools Aren't Optional Extras\", \"summary\": \"A tool that looks identical to its uninsulated counterpart can be the entire difference between a routine task and a shock.\", \"body\": [\"Insulated, voltage-rated hand tools are manufactured and tested to prevent current from passing through the tool body to the person holding it, up to a specific rated voltage \\u2014 this is a distinct property from a tool simply having a plastic or rubber-coated handle for grip, which offers no verified electrical protection at all. Using an ordinary tool with a comfortable grip on live equipment, mistaking it for adequate insulation, is a genuinely common and dangerous error.\", \"Voltage-rated tools are tested and marked with their rated voltage and are periodically re-tested or retired as their insulation ages or is damaged, since insulation that looks intact can still have lost its dielectric integrity through nicks, contamination, or age \\u2014 which is why relying on a tool's appearance alone, without checking its rating and condition, defeats the entire point of using rated tools in the first place.\"]}, {\"title\": \"Isolation and Proving Dead: Why 'Switched Off' Isn't the Same as 'Safe to Touch'\", \"summary\": \"The step between de-energizing a circuit and actually confirming it's dead is where a lot of accidents happen.\", \"body\": [\"Isolating a circuit \\u2014 opening the switch or breaker that supplies it \\u2014 removes the intended source of supply, but it doesn't by itself prove the circuit is actually dead. Wiring errors, back-feeds from another source, stored energy in capacitors, or induced voltage from adjacent live conductors can all leave a nominally isolated circuit still live or capable of becoming live.\", \"Proving dead means directly testing the actual conductors to be worked on with a voltage tester \\u2014 one that's itself been proven to work correctly immediately before and after the test \\u2014 rather than simply trusting that the isolation was effective. Skipping this step and working on a circuit believed dead purely because it was switched off, without directly verifying it, is a well-documented cause of otherwise avoidable electrical accidents.\"]}, {\"title\": \"Static Electricity: An Electrical Hazard With No Wiring Involved At All\", \"summary\": \"Not every electrical hazard comes from a power source \\u2014 friction and separation alone can generate dangerous voltage.\", \"body\": [\"Static electricity builds up when two materials in contact are separated, leaving one with a surplus of electrons and the other a deficit \\u2014 friction between materials (fluid flowing through a pipe, a conveyor belt, someone walking across a carpet) is a common way this charge separation happens, and the resulting voltage can reach many thousands of volts even though almost no current or stored energy is actually involved.\", \"In most everyday contexts static discharge is simply a minor shock or annoyance, but in the presence of flammable vapors, dusts, or gases, a static discharge carries more than enough energy to serve as an ignition source \\u2014 which is exactly why fuel transfer, powder handling, and other operations involving flammable materials use specific bonding and grounding procedures designed purely to prevent static charge from accumulating in the first place, not to protect against a conventional electrical supply at all.\"]}, {\"title\": \"Why Electrical Fires Behave Differently and Need a Different Response\", \"summary\": \"An electrical fire changes the entire calculus of how it's safely fought.\", \"body\": [\"A fire involving energized electrical equipment introduces a hazard that an ordinary fire doesn't: using water or a conductive extinguishing agent on live equipment risks the extinguishing stream itself becoming a path for current back to the person holding it, potentially turning a firefighting action into an electrocution hazard. This is exactly why electrical fires are classified separately (Class C in some systems) and specifically call for non-conductive extinguishing agents like CO2 or dry chemical.\", \"The first genuine priority with any fire involving electrical equipment, where it's safe and possible to do so, is actually de-energizing the equipment before or while fighting the fire \\u2014 once equipment is confirmed de-energized, it can generally be treated as an ordinary fire of whatever material is actually burning, but that de-energization step is what changes the entire response compared to a fire with no electrical involvement at all.\"]}, {\"title\": \"Permit-to-Work Systems: Formalizing What Otherwise Relies on Memory\", \"summary\": \"A written permit exists specifically to remove reliance on someone simply remembering every precaution correctly.\", \"body\": [\"A permit-to-work system formally documents the specific hazards of a task, the precautions required before work starts, who has authorized the work, and confirmation that isolations and other safety measures are actually in place \\u2014 turning a set of safety requirements that would otherwise depend on individual memory and judgement into an explicit, checked, and recorded process.\", \"For electrical work specifically, a permit typically records exactly which equipment has been isolated, how it's been proven dead, and what earthing or other safety measures are in place, with the permit only closed out once work is complete and the equipment is confirmed safe to re-energize \\u2014 the formality isn't bureaucratic overhead for its own sake, it exists because high-consequence, infrequent tasks are exactly where relying purely on memory and informal communication is most likely to eventually fail.\"]}]}, {\"id\": \"standards\", \"label\": \"Standards & Codes\", \"color\": \"#8B7FB8\", \"notes\": [{\"title\": \"IEC, NEC and BS 7671: Three Traditions, One Purpose\", \"summary\": \"Three rulebooks that solve the same problem in different vocabularies.\", \"body\": [\"Most of the world's electrical installation rules trace back to one of a few major traditions. The IEC's 60364 series underpins wiring regulations across much of Europe, Asia, Africa and Australasia, often adopted directly or adapted into national codes. The US instead uses the NEC (NFPA 70), developed independently and structured quite differently, alongside its own voltage conventions.\", \"The UK's BS 7671 (the IET Wiring Regulations) is harmonized with the IEC/CENELEC framework but retains its own numbering and specific national requirements. All three exist for the same underlying purpose \\u2014 protection against shock, fire, and thermal damage \\u2014 but differ enough in terminology, voltage assumptions, and specific requirements that a design compliant with one isn't automatically compliant with another.\"]}, {\"title\": \"Why Standards Have Editions and Amendments, Not Just One Fixed Version\", \"summary\": \"An electrical standard isn't a static document \\u2014 it's periodically revised as understanding and technology evolve.\", \"body\": [\"Electrical standards are periodically reviewed and revised as new technology emerges, incidents reveal gaps in existing requirements, or better engineering understanding develops \\u2014 which is why a standard like IEC 60364 or the NEC is published in specific numbered editions, each potentially changing requirements from the one before it, rather than being a single unchanging document.\", \"This is exactly why specifying which edition of a standard a design complies with matters as much as citing the standard by name at all \\u2014 a design that was fully compliant under one edition may not automatically be compliant under a later one if requirements changed, which is also why many jurisdictions specify a transition period allowing designs already underway to be completed under the edition that was current when the design began.\"]}, {\"title\": \"Product Standards vs Installation Standards: Two Different Kinds of Compliance\", \"summary\": \"A component being certified and an installation being compliant are two separate claims, not one.\", \"body\": [\"A product standard (governing, say, a circuit breaker or a cable) sets requirements the manufactured product itself has to meet and be tested against \\u2014 verified through independent certification, often shown by a mark like UL, CE, or a national certification body's logo on the product itself. An installation standard (like IEC 60364, the NEC, or BS 7671) instead governs how compliant products are actually selected, combined, and installed together into a working electrical system.\", \"Using fully certified, compliant components doesn't automatically produce a compliant installation \\u2014 a correctly certified breaker installed in a way that violates the installation standard's requirements (wrong enclosure rating for the environment, inadequate clearances, incorrect cable sizing for the application) still results in a non-compliant installation, even though every individual component passed its own product certification.\"]}, {\"title\": \"Type Testing vs Routine Testing: Two Different Reasons to Test the Same Equipment\", \"summary\": \"Not every test on a piece of equipment is checking for the same thing.\", \"body\": [\"Type testing is performed once on a representative sample of a new equipment design to verify the design itself meets the relevant standard's performance requirements \\u2014 short-circuit withstand, temperature rise, dielectric strength \\u2014 and is typically destructive or at least stresses the sample well beyond normal service conditions. Once a design passes type testing, it doesn't need to be repeated for every unit manufactured to that same design.\", \"Routine testing, by contrast, is performed on every individual unit as it's manufactured, checking for workmanship defects or component faults specific to that unit \\u2014 insulation resistance, functional operation, visual inspection \\u2014 without stressing the unit anywhere near its design limits. The distinction matters because a design can be perfectly type-tested and still ship a defective individual unit if routine testing is skipped or inadequate, which is exactly the gap routine testing exists to close.\"]}, {\"title\": \"Why Different Countries' Electrical Standards Sometimes Conflict\", \"summary\": \"A design compliant in one country isn't automatically compliant somewhere else, even for identical equipment.\", \"body\": [\"Different national and regional standards bodies sometimes make genuinely different technical choices for the same underlying safety objective \\u2014 different assumed touch-voltage limits, different disconnection time requirements, different approaches to earthing system topology \\u2014 reflecting differences in historical practice, local grid characteristics, or simply different expert committees reaching different conclusions from the same underlying physics.\", \"This is why equipment and designs intended for international projects are checked against the specific standards actually in force at the destination, rather than assuming a design compliant with one major standard (IEC-based, say) will automatically satisfy another (NEC-based) \\u2014 the underlying engineering may be sound either way, but formal compliance is checked against the specific standard that legally applies in that jurisdiction, not against whichever standard the designer happens to be most familiar with.\"]}, {\"title\": \"Deemed-to-Satisfy Provisions vs Performance-Based Design\", \"summary\": \"Standards generally offer two different roads to the same destination: a prescribed recipe, or proving the outcome directly.\", \"body\": [\"A deemed-to-satisfy provision gives a specific, prescriptive method or set of values that, if followed exactly, is automatically accepted as meeting a standard's underlying safety objective \\u2014 cable sizing tables are a good example, offering a designer a straightforward lookup rather than requiring them to calculate thermal behavior from first principles every time.\", \"Performance-based (or alternative) design instead allows a designer to demonstrate, through calculation, testing, or other evidence, that a genuinely different approach achieves an equivalent (or better) safety outcome than the prescriptive method would have \\u2014 offering flexibility for situations the prescriptive tables don't neatly cover, at the cost of needing to build and justify that equivalence explicitly rather than simply pointing to a table entry.\"]}, {\"title\": \"Why Standards Reference Other Standards Instead of Repeating Content\", \"summary\": \"Reading one electrical standard properly often means reading several others it points to as well.\", \"body\": [\"Rather than each standard independently redefining every underlying concept it relies on, standards routinely reference other standards by name and edition for specific requirements \\u2014 an installation standard might reference a separate product standard for the exact test requirements a circuit breaker has to meet, rather than restating those requirements itself.\", \"This cross-referencing keeps each standard focused on its own specific scope and avoids duplicated, potentially inconsistent requirements scattered across multiple documents \\u2014 but it also means genuinely understanding a design's full compliance picture often means tracing through several linked standards, not just the one document most directly associated with the task at hand.\"]}]}, {\"id\": \"renewables\", \"label\": \"Renewables & Storage\", \"color\": \"#6FAE5C\", \"notes\": [{\"title\": \"How a Photovoltaic Cell Turns Light Into Electricity\", \"summary\": \"A semiconductor junction doing the same job in every solar panel on earth.\", \"body\": [\"A photovoltaic cell is essentially a large-area semiconductor junction, most commonly silicon, engineered so that photons striking it can knock electrons loose and set up a voltage across the cell \\u2014 the photovoltaic effect.\", \"Individual cells produce a small DC voltage each, so cells are wired together in series and parallel within a panel, and panels are combined into arrays, to reach the voltage and current a system needs. Because a solar array's raw output is DC and most grids and appliances run on AC, the array's output has to pass through an inverter before it can be used for anything beyond charging a battery directly.\"]}, {\"title\": \"Why Batteries Need an Inverter to Power Your Home\", \"summary\": \"Batteries only speak DC. Almost everything else speaks AC.\", \"body\": [\"Batteries store and deliver direct current, but the electricity grid and almost everything plugged into it runs on alternating current, so getting power in or out of a battery system almost always involves power electronics doing the conversion.\", \"An inverter turns the battery's DC into AC to power household loads or feed the grid; a charger or rectifier does the reverse, turning incoming AC into the DC a battery can actually store. This conversion step is also where a lot of the intelligence in a modern battery system lives \\u2014 managing charge rates, protecting the battery's chemistry, and synchronizing with the grid's voltage and frequency when needed.\"]}, {\"title\": \"Grid-Tied vs Off-Grid Solar Systems: Two Fundamentally Different Design Problems\", \"summary\": \"Whether a solar system connects to the grid changes almost everything else about how it's designed.\", \"body\": [\"A grid-tied solar system feeds power into the existing grid alongside the site's normal supply, using the grid itself as an effectively unlimited place to send excess generation and draw extra power when the array isn't producing enough \\u2014 this is why grid-tied systems are usually simpler and cheaper for a given array size, since they don't need to store energy for later use themselves.\", \"An off-grid system has no such backup and has to be self-sufficient, meaning it needs battery storage sized to cover the site's needs through periods of low generation, plus a charge controller to manage charging safely, and typically a larger array than an equivalent grid-tied system to ensure enough generation on cloudy days \\u2014 the fundamental design problem shifts from 'optimize economics against the grid' to 'guarantee reliability without one.'\"]}, {\"title\": \"Maximum Power Point Tracking: Getting the Most Out of a Solar Panel\", \"summary\": \"A solar panel's output voltage and current trade off against each other \\u2014 MPPT finds the sweet spot.\", \"body\": [\"A photovoltaic panel's output power isn't fixed at a single operating point \\u2014 for a given light level, its voltage and current trade off against each other along a curve, and there's one specific combination, the maximum power point, where the product of voltage and current (and therefore power) is highest. That optimal point shifts continuously as sunlight intensity and panel temperature change throughout the day.\", \"A maximum power point tracking (MPPT) charge controller or inverter continuously adjusts the electrical load it presents to the panel to keep it operating at that shifting optimal point, rather than at a fixed voltage that would only be optimal under one specific condition \\u2014 extracting meaningfully more usable energy over a day than a simpler, non-tracking controller would from the identical physical array.\"]}, {\"title\": \"Anti-Islanding: Why Grid-Tied Inverters Have to Shut Down During a Grid Outage\", \"summary\": \"A grid-tied solar system that kept feeding power into a downed line would be a serious hazard to utility workers.\", \"body\": [\"During a grid outage, utility line crews expect a de-energized line to actually be de-energized before they work on it. If a grid-tied solar inverter kept exporting power into that same line during the outage \\u2014 inadvertently creating a localized, unintentional 'island' of live power on what the utility believes is a dead circuit \\u2014 it would create a genuine and serious shock hazard for crews working on what they assume is a safe, isolated line.\", \"Anti-islanding protection is a mandatory function built into grid-tied inverters specifically to detect grid loss and disconnect the inverter's own output within a defined, short time, preventing exactly that scenario \\u2014 it's one of the reasons a home solar system doesn't continue providing power during a grid outage unless it's specifically designed with battery backup and dedicated islanding-capable transfer equipment layered on top of the basic grid-tied inverter.\"]}, {\"title\": \"Battery Chemistries: Why Lithium-Ion Isn't the Only Option, Even Today\", \"summary\": \"Different battery chemistries trade energy density, cost, safety and lifespan against each other in different proportions.\", \"body\": [\"Lead-acid batteries are the oldest rechargeable chemistry still in wide use, valued for low upfront cost and a long track record, but limited by lower energy density, shorter cycle life, and the need to avoid deep discharge to preserve that already-limited lifespan. Lithium-ion chemistries (various specific formulations, including lithium iron phosphate, common in stationary storage) offer much higher energy density, longer cycle life, and tolerance for deeper discharge, generally at a higher upfront cost per unit of stored energy, though that gap has narrowed substantially.\", \"Lithium iron phosphate specifically has become popular for stationary storage over other lithium chemistries partly because of its better thermal stability and lower fire risk compared to some other lithium formulations, illustrating that even within 'lithium-ion' as a broad category, the specific chemistry chosen reflects a deliberate trade-off between energy density, cost, cycle life and safety rather than one chemistry simply being universally best.\"]}, {\"title\": \"State of Charge vs State of Health: Two Different Battery Measurements\", \"summary\": \"How full a battery is right now, and how much capacity it still has at all, are two separate questions.\", \"body\": [\"State of charge describes how much energy a battery currently holds relative to its own present maximum capacity, expressed as a percentage \\u2014 it's the number that changes moment to moment as a battery charges and discharges, and it's what a simple fuel-gauge display typically shows.\", \"State of health instead describes how much of the battery's original, as-new capacity remains available at all, since batteries gradually lose maximum capacity through repeated charge cycles, age, and thermal stress \\u2014 a battery at 100% state of charge but 70% state of health is genuinely full, but that 'full' now represents meaningfully less usable energy than it did when the battery was new, which is exactly why long-term battery system monitoring tracks both figures rather than state of charge alone.\"]}, {\"title\": \"Wind Turbine Basics: Converting Moving Air Into Electricity\", \"summary\": \"A wind turbine's blades aren't just spinning in the wind \\u2014 they're deliberately shaped to extract energy from it efficiently.\", \"body\": [\"A wind turbine's blades are airfoil-shaped, similar in principle to an aircraft wing, generating lift as wind flows across them and converting that aerodynamic force into rotational torque on the main shaft. That rotation drives a generator, either directly (in a direct-drive design) or through a gearbox that steps up the relatively slow blade rotation to the higher speed most generators are designed to run at efficiently.\", \"There's a hard physical ceiling on how much of the wind's kinetic energy any turbine can extract \\u2014 the Betz limit, roughly 59% \\u2014 because a turbine that extracted all the wind's energy would have to stop the air completely, which would simply block more wind from arriving behind it; real turbines, accounting for additional mechanical and electrical losses, typically achieve noticeably less than that theoretical ceiling in practice.\"]}]}, {\"id\": \"power-electronics\", \"label\": \"Power Electronics\", \"color\": \"#E0785A\", \"notes\": [{\"title\": \"Rectifiers: Turning AC Into DC\", \"summary\": \"The most basic power electronic conversion, and the building block for almost everything downstream of it.\", \"body\": [\"A rectifier converts alternating current into direct current, most simply using diodes that only allow current to flow one direction \\u2014 a half-wave rectifier passes only one half of each AC cycle, while a full-wave (bridge) rectifier redirects both halves of the cycle to flow the same direction, producing a smoother, more usable output with less wasted energy.\", \"The raw output of even a full-wave rectifier still pulses at twice the AC supply frequency rather than being genuinely steady DC, which is why practical rectifier circuits almost always add a smoothing (filter) capacitor afterward, and often further regulation circuitry, to deliver the clean, stable DC voltage most electronic loads actually require.\"]}, {\"title\": \"Inverters: Turning DC Back Into AC\", \"summary\": \"The reverse of a rectifier, and the technology that makes solar panels and batteries usable on an AC grid.\", \"body\": [\"An inverter converts direct current into alternating current by rapidly switching DC through a series of solid-state switches (transistors, typically IGBTs or MOSFETs) in a specific sequence that synthesizes an AC waveform at the output \\u2014 early inverters produced a rough square wave, while modern ones use pulse-width modulation, switching very rapidly and varying the pulse widths to synthesize an output that closely approximates a smooth sine wave.\", \"Inverters are the essential link between DC sources \\u2014 solar panels, batteries, fuel cells \\u2014 and an AC grid or AC loads, and their switching frequency and control strategy directly affect output waveform quality, efficiency, and how much high-frequency electrical noise they inject back into the systems they're connected to.\"]}, {\"title\": \"Variable Frequency Drives: Controlling Motor Speed Electronically\", \"summary\": \"How a VFD changes an induction motor's speed without changing the motor itself.\", \"body\": [\"An induction motor's synchronous speed is set directly by the frequency of its AC supply \\u2014 a variable frequency drive exploits this by first rectifying incoming AC to DC, then using an inverter stage to synthesize a new AC output at whatever frequency (and matching voltage) is needed to run the motor at a chosen speed, rather than the motor being locked to the fixed frequency of the incoming utility supply.\", \"Beyond simple speed control, VFDs also allow controlled, gentle acceleration and deceleration instead of the abrupt inrush of an across-the-line start, and \\u2014 combined with the fan-law relationship where power scales with the cube of speed for fans and pumps \\u2014 often deliver substantial energy savings on variable-load applications that previously ran at full speed with mechanical throttling to reduce output.\"]}, {\"title\": \"Harmonics: The Distortion Power Electronics Introduce Into a Clean Sine Wave\", \"summary\": \"Switching power electronics don't just convert power \\u2014 they leave a distorted signature on the waveform behind them.\", \"body\": [\"An ideal AC supply is a pure sine wave at one single frequency. Non-linear loads \\u2014 rectifiers, VFDs, and other switching power electronics \\u2014 draw current in a way that isn't a clean sine wave, and that distorted current can be mathematically broken down into the fundamental frequency plus a series of harmonics, additional sine waves at integer multiples of the fundamental frequency, superimposed on top of it.\", \"These harmonics don't do useful work, but they do cause real problems: extra heating in transformers and motors, interference with sensitive electronic equipment, and in severe cases, resonance with power factor correction capacitors that can amplify the distortion further. Harmonic filters \\u2014 passive tuned filters or active filters that inject a cancelling waveform \\u2014 exist specifically to reduce harmonic content back toward acceptable limits on sites with significant non-linear loading.\"]}, {\"title\": \"Switch-Mode Power Supplies: Why Modern Electronics Don't Use Heavy Transformers Anymore\", \"summary\": \"The technology behind why a modern phone charger is a fraction of the size and weight of an old one.\", \"body\": [\"A linear power supply steps down AC voltage using a large, heavy mains-frequency transformer, then rectifies and regulates it \\u2014 simple and quiet electrically, but inherently large, heavy, and relatively inefficient, since excess voltage in a linear regulator is simply dissipated as wasted heat. A switch-mode power supply instead rectifies incoming AC to DC first, then uses a much smaller, high-frequency transformer, switching the DC on and off rapidly (tens of kilohertz or more) to step voltage up or down far more efficiently.\", \"Because transformer size and weight scale inversely with operating frequency, switching at a much higher frequency than the AC mains lets the transformer shrink dramatically compared to a linear supply's mains-frequency unit \\u2014 which is exactly why nearly all modern chargers, laptop power bricks and similar devices are small, light, and warm rather than large, heavy and hot, despite delivering comparable power.\"]}, {\"title\": \"Power Semiconductor Switches: IGBTs, MOSFETs and Thyristors\", \"summary\": \"Three different solid-state switching devices, each suited to a different combination of voltage, current and switching speed.\", \"body\": [\"MOSFETs switch very fast and are efficient at lower voltages, making them common in switch-mode power supplies and lower-power motor drives. IGBTs combine features of MOSFETs and older bipolar transistors, handling higher voltages and currents than a typical MOSFET while still switching reasonably fast, which is why they dominate medium-to-high power inverters and VFDs.\", \"Thyristors (including SCRs) can handle very high voltages and currents but, once triggered on, can only be turned off by the circuit's own current reaching zero (in an AC circuit) or by additional commutation circuitry \\u2014 a limitation that makes them less flexible for fast switching but well suited to high-power applications like HVDC transmission and large motor soft-starters, where their specific switching behavior isn't a drawback.\"]}, {\"title\": \"Why Power Electronics Need Such Aggressive Cooling\", \"summary\": \"A power semiconductor switch that's 98% efficient still has to dissipate a surprising amount of heat.\", \"body\": [\"Even a highly efficient power electronic converter \\u2014 95-98% efficient isn't unusual for a well-designed one \\u2014 still dissipates the remaining few percent of the power it handles as heat, concentrated in a very small physical volume of semiconductor material. For a converter handling tens or hundreds of kilowatts, that 'small' percentage loss can still amount to a genuinely large heat load that has to be removed to keep the semiconductor junctions below their maximum rated temperature.\", \"This is exactly why large power electronic equipment relies on substantial heatsinks, forced-air cooling, or in high-power applications, liquid cooling \\u2014 semiconductor junction temperature has a direct, well-characterized relationship to both switching losses and expected device lifetime, so inadequate cooling doesn't just risk an immediate overheat trip, it can silently shorten the equipment's service life even while appearing to operate normally.\"]}, {\"title\": \"Soft Starters vs VFDs: Two Different Ways to Tame Motor Starting\", \"summary\": \"Both reduce starting stress on a motor, but only one of them can also control running speed.\", \"body\": [\"A soft starter uses power electronics to gradually ramp up the voltage applied to a motor during starting, reducing inrush current and mechanical shock compared to an across-the-line start \\u2014 but once the motor is up to full speed, a soft starter typically bypasses itself with a contactor, and the motor then runs directly on the fixed-frequency utility supply exactly as if it had started normally.\", \"A VFD does everything a soft starter does for starting, but continues controlling the motor's supply frequency (and therefore speed) throughout its entire running period, not just during startup \\u2014 which is why a soft starter is a simpler, cheaper choice for applications that just need gentle starting and then constant full speed, while a VFD is the right choice wherever the application benefits from adjustable running speed, not just a gentle start.\"]}]}, {\"id\": \"instrumentation-testing\", \"label\": \"Instrumentation & Testing\", \"color\": \"#5FA88F\", \"notes\": [{\"title\": \"Current Transformers: Measuring Current You Can't Safely Touch Directly\", \"summary\": \"How protection and metering equipment measures hundreds or thousands of amps without being connected to that current directly.\", \"body\": [\"A current transformer (CT) uses the same electromagnetic induction principle as a power transformer, but for a different purpose: a primary conductor carrying the full system current passes through (or as a single turn around) the CT core, and the CT's secondary winding produces a proportionally scaled-down current \\u2014 commonly standardized to 1A or 5A secondary \\u2014 safe and convenient to connect to protection relays and meters, however large the actual primary current is.\", \"A critical and often-cited safety rule follows directly from how CTs work: a CT's secondary must never be left open-circuited while the primary is carrying current, because with no secondary current flowing to oppose it, the primary current instead drives the CT's magnetic flux to extreme levels, which can induce a dangerously high voltage across the open secondary terminals \\u2014 CT secondaries are specifically short-circuited before any secondary-side work is performed for exactly this reason.\"]}, {\"title\": \"Voltage Transformers: Scaling Down High Voltage for Safe Measurement\", \"summary\": \"The voltage-measurement counterpart to a current transformer, with its own distinct failure mode to guard against.\", \"body\": [\"A voltage transformer (VT, sometimes called a potential transformer) works like a small power transformer specifically designed for measurement accuracy rather than power transfer, stepping a high system voltage down to a standardized, safe secondary voltage \\u2014 commonly 110V or 120V \\u2014 for connection to meters and protection relays without those instruments ever being exposed to full system voltage.\", \"Unlike a CT, a VT's secondary should never be short-circuited while energized \\u2014 doing so drives very high current through the VT's low secondary impedance, which can rapidly overheat and damage the winding, essentially the mirror-image failure mode of leaving a CT secondary open. This opposite handling rule for the two device types is a common and important distinction in electrical testing safety training.\"]}, {\"title\": \"Insulation Resistance Testing: What a Megger Actually Checks\", \"summary\": \"A simple test with a specific, well-defined purpose: finding degraded insulation before it fails in service.\", \"body\": [\"An insulation resistance test applies a DC test voltage \\u2014 commonly 500V or 1000V for low-voltage equipment \\u2014 between a conductor and earth (or between separate conductors) and measures the resulting leakage current, expressed as a resistance value, typically in megohms. Healthy insulation presents a very high resistance to this test voltage; insulation that's been degraded by moisture, contamination, or age presents a measurably lower resistance, showing up clearly before it necessarily causes an outright fault.\", \"This is why insulation resistance testing is a standard part of both installation commissioning and ongoing preventive maintenance \\u2014 it catches insulation degradation while it's still a slowly developing problem, well before it would otherwise progress to an actual insulation breakdown and fault, at a point where a designer or maintainer still has time to intervene rather than react.\"]}, {\"title\": \"Power Quality: Why 'the Voltage Is There' Isn't the Whole Story\", \"summary\": \"A supply can technically be present and still be causing real problems for connected equipment.\", \"body\": [\"Power quality covers a range of ways a supply can deviate from an ideal, perfectly steady sinusoidal voltage at rated magnitude and frequency \\u2014 harmonics, voltage sags and swells, flicker (rapid, repeated voltage fluctuation, often visible as light flicker), and transient voltage spikes all fall under the umbrella of power quality issues, distinct from simply having power present or absent.\", \"Poor power quality doesn't necessarily trip protection or cause an obvious outage, but it can still cause real, sometimes costly problems \\u2014 nuisance equipment trips, shortened equipment life from added electrical stress, data errors in sensitive electronics, or visible flicker that's disruptive even though voltage never actually left its nominal range \\u2014 which is why power quality monitoring and analysis is treated as a distinct discipline from ordinary fault-finding, looking for problems that a simple 'is the power on' check would never reveal.\"]}, {\"title\": \"Thermal Imaging as an Electrical Maintenance Tool\", \"summary\": \"A loose or degraded connection almost always announces itself as heat before it announces itself as a failure.\", \"body\": [\"A loose electrical connection, a corroded contact, or an overloaded conductor all tend to show up as localized heating well before they progress to an outright failure \\u2014 resistance at a poor connection converts more energy to heat for the same current than a good connection would, and that extra heat is detectable well before insulation actually breaks down or a connection actually fails.\", \"Thermal (infrared) imaging lets a technician scan energized equipment \\u2014 panelboards, connections, breakers, cable terminations \\u2014 from a safe distance and immediately spot abnormal hot spots that indicate a developing problem, without needing to power down or physically touch anything. This makes it one of the more effective non-invasive predictive maintenance tools in electrical work specifically because so many electrical failures genuinely do give a thermal warning sign before they actually happen.\"]}, {\"title\": \"Why Test Instrument Categories (CAT Ratings) Matter\", \"summary\": \"Not every multimeter is safe to use everywhere in an electrical system, even if it reads the right numbers.\", \"body\": [\"Test instruments are rated into measurement categories (CAT I through CAT IV) that describe how much transient overvoltage the instrument is designed to withstand without failing dangerously \\u2014 reflecting the fact that different points in an electrical system have very different potential for large, brief overvoltage transients, from switching events or lightning-induced surges, with points closer to the service entrance and utility connection exposed to larger potential transients than points further downstream.\", \"Using an instrument rated for a lower category than the point it's actually being used at \\u2014 a CAT II meter on a CAT IV service entrance, for instance \\u2014 risks the instrument itself failing violently under a transient it wasn't designed to survive, which is exactly why CAT ratings are checked against the specific location being tested, not treated as a generic quality indicator where a higher number is simply always better regardless of context.\"]}, {\"title\": \"Commissioning Tests: Verifying an Installation Before It's Energized\", \"summary\": \"The last checkpoint before an installation is trusted with real power for the first time.\", \"body\": [\"Commissioning tests on a new electrical installation verify that it was actually built the way it was designed and that it's safe to energize \\u2014 insulation resistance, earth continuity and loop impedance, polarity checks, functional testing of protection devices, and confirmation that the installation matches its design drawings, all performed before the installation is put into live service for the first time.\", \"These tests exist specifically to catch installation errors \\u2014 a wiring mistake, an incorrectly rated component, a missed connection \\u2014 that might not be visible on inspection alone but would show up clearly in a properly conducted electrical test, catching problems while the installation is still de-energized and any correction is straightforward, rather than discovering them later once the installation is already live and in service.\"]}, {\"title\": \"Why Calibration Matters for Test and Protection Equipment\", \"summary\": \"A measuring instrument that's drifted out of calibration can give a confidently wrong answer.\", \"body\": [\"Every measuring instrument \\u2014 a multimeter, a protection relay's internal measurement circuitry, a power quality analyzer \\u2014 can drift out of true calibration over time due to component aging, temperature effects, or mechanical wear, meaning it reports a value that's confidently displayed but subtly (or not so subtly) wrong compared to the actual physical quantity being measured.\", \"Regular calibration against a known, traceable reference standard catches this drift before it leads to a bad decision \\u2014 a protection relay that's drifted to trip at the wrong current threshold, or a test meter that reads insulation resistance incorrectly, can each individually look completely normal in use while quietly giving readings that no longer reflect reality, which is exactly the gap periodic calibration exists to close.\"]}]}, {\"id\": \"lighting\", \"label\": \"Lighting\", \"color\": \"#C79A3E\", \"notes\": [{\"title\": \"Lumens, Lux and Candela: Three Different Ways to Quantify Light\", \"summary\": \"Light output, light falling on a surface, and light in a specific direction are three genuinely different measurements.\", \"body\": [\"Lumens measure the total quantity of visible light a source emits in all directions \\u2014 it's a property of the source itself, independent of where or how that light actually lands. Lux measures illuminance, the amount of that light actually falling on a given surface area, which depends on the source's lumen output but also on distance, direction, and any reflectors or optics shaping the light.\", \"Candela measures luminous intensity in a specific direction, useful for characterizing how a source's light is distributed rather than just its total output \\u2014 a spotlight and a bare bulb can have identical total lumen output while having very different candela values in their primary beam direction, since the spotlight concentrates its light into a narrower cone rather than spreading it in all directions equally.\"]}, {\"title\": \"Why LED Lighting Uses So Much Less Power for the Same Light Output\", \"summary\": \"LEDs don't just improve on older technology incrementally \\u2014 they convert electricity to light through a fundamentally different mechanism.\", \"body\": [\"Incandescent bulbs produce light as a byproduct of heating a filament until it glows \\u2014 most of the electrical energy input becomes heat, with only a small fraction actually converted to visible light, making incandescent lighting inherently inefficient by its basic operating principle. Fluorescent lighting improves on this by exciting a gas to produce ultraviolet light that a phosphor coating then converts to visible light, but still loses meaningful energy in that conversion process.\", \"LEDs instead produce light directly through electroluminescence \\u2014 electrons recombining across a semiconductor junction release energy directly as photons, without needing to first generate heat or ultraviolet light as an intermediate step \\u2014 which is the fundamental reason LEDs convert a much larger share of input electrical energy directly into visible light, translating into dramatically lower power draw for equivalent light output compared to older technologies.\"]}, {\"title\": \"Color Temperature: Why 'White Light' Isn't All the Same\", \"summary\": \"A single number that describes whether white light reads as warm and cozy or cool and clinical.\", \"body\": [\"Correlated color temperature, measured in kelvin, describes where a light source's color falls along a scale from warm (lower kelvin, more amber/orange, like early incandescent bulbs around 2700K) to cool (higher kelvin, more blue-white, like overcast daylight around 6500K) \\u2014 the name comes from comparing the light's color to what a theoretical heated black body would emit at that same temperature.\", \"Color temperature has a real effect on perceived atmosphere and even alertness \\u2014 warmer light is generally associated with relaxed, residential settings, while cooler light is more common in task-oriented spaces like offices or retail, and lighting designers deliberately select color temperature as a design parameter in its own right, not simply picking whatever a given lamp happens to produce.\"]}, {\"title\": \"Color Rendering Index: Measuring How Accurately a Light Source Reveals True Colors\", \"summary\": \"Two light sources can have identical color temperature and still make colors look noticeably different.\", \"body\": [\"Color rendering index (CRI) measures how accurately a light source reveals the true colors of objects compared to a reference source (natural daylight or an ideal black-body radiator) at the same color temperature, scored on a scale up to 100. A high-CRI source makes colors appear close to how they'd look under natural light; a low-CRI source can distort colors even while producing light that appears, to the eye, similarly 'white.'\", \"This matters in settings where accurate color perception genuinely counts \\u2014 retail display, art galleries, medical examination, printing and photography \\u2014 where a low-CRI light source can technically satisfy an illuminance requirement while still making colors look subtly or significantly wrong, which is exactly why lighting specifications for such spaces call out a minimum CRI requirement separately from simple light quantity.\"]}, {\"title\": \"Emergency Lighting: Why It's a Separate System, Not Just a Backup Switch\", \"summary\": \"Emergency lighting has its own specific requirements that go well beyond simply having some light available during a power cut.\", \"body\": [\"Emergency lighting is specifically designed to illuminate escape routes and safety-critical areas during a power failure, and it's governed by requirements distinct from ordinary lighting \\u2014 minimum illuminance levels along escape paths, maximum time to reach that illuminance after a power failure, and minimum duration the lighting has to be sustained, typically powered by dedicated batteries either built into individual luminaires or from a central battery system.\", \"Because emergency lighting only has to actually work during the rare event of a genuine power failure, regular testing is mandatory precisely because a failed emergency light can otherwise go unnoticed indefinitely under normal conditions \\u2014 a burnt-out emergency fitting looks identical to a working one until the one moment it's actually needed, which is exactly the failure mode scheduled testing exists to catch in advance.\"]}, {\"title\": \"Why Lighting Design Isn't Just About Reaching a Target Lux Level\", \"summary\": \"A space that meets its illuminance target on paper can still be a genuinely poor lighting design.\", \"body\": [\"Meeting a minimum average illuminance requirement is only one part of good lighting design \\u2014 uniformity (avoiding excessive contrast between brightly and dimly lit areas of the same space), glare control (avoiding light sources positioned or angled so they cause discomfort or reduce visibility), and appropriate color temperature and rendering all affect how usable and comfortable a space actually is, independent of whether the average lux figure technically meets a code minimum.\", \"This is why lighting design software models more than a single average lux value across a room \\u2014 modern lighting calculations typically produce illuminance grids, glare ratings, and uniformity ratios together, because a design that hits its target average while leaving harsh shadows, glare, or uneven pools of light can technically comply with a numeric minimum while still failing the space's actual occupants.\"]}]}];\n\n  var totalNotes = DATA.reduce(function(sum, cat){ return sum + cat.notes.length; }, 0);\n  document.getElementById('metaNoteCount').textContent = totalNotes;\n  document.getElementById('metaCatCount').textContent = DATA.length;\n\n  function wordCount(paras){\n    return paras.join(' ').trim().split(/\\s+/).length;\n  }\n  function readTime(paras){\n    var words = wordCount(paras);\n    var mins = Math.max(1, Math.round(words / 200));\n    return mins + ' min read';\n  }\n\n  var activeCategory = 'all';\n  var searchTerm = '';\n\n  // ---- build breaker row ----\n  var breakerRow = document.getElementById('breakerRow');\n  function makeBreaker(id, label, count, isAll){\n    var btn = document.createElement('button');\n    btn.type = 'button';\n    btn.className = 'breaker-btn' + (isAll ? ' is-all' : '');\n    btn.setAttribute('aria-pressed', String(id === activeCategory));\n    btn.dataset.cat = id;\n\n    var drop = document.createElement('div'); drop.className = 'drop';\n    var sw = document.createElement('div'); sw.className = 'switch';\n    var contact = document.createElement('div'); contact.className = 'contact';\n    sw.appendChild(contact);\n    var name = document.createElement('div'); name.className = 'breaker-name'; name.textContent = label;\n    var cnt = document.createElement('div'); cnt.className = 'breaker-count'; cnt.textContent = count + (count===1?' note':' notes');\n\n    btn.appendChild(drop); btn.appendChild(sw); btn.appendChild(name); btn.appendChild(cnt);\n    btn.addEventListener('click', function(){\n      activeCategory = id;\n      render();\n    });\n    return btn;\n  }\n  function renderBreakers(){\n    breakerRow.innerHTML = '';\n    breakerRow.appendChild(makeBreaker('all', 'All Subjects', totalNotes, true));\n    DATA.forEach(function(cat){\n      breakerRow.appendChild(makeBreaker(cat.id, cat.label, cat.notes.length, false));\n    });\n  }\n\n  // ---- build note card ----\n  function makeCard(cat, note){\n    var card = document.createElement('div');\n    card.className = 'note-card';\n    card.style.borderLeftColor = cat.color;\n\n    var head = document.createElement('button');\n    head.type = 'button';\n    head.className = 'note-head';\n    head.setAttribute('aria-expanded', 'false');\n\n    var top = document.createElement('div'); top.className = 'note-toprow';\n    var tag = document.createElement('span'); tag.className = 'note-tag'; tag.textContent = cat.label; tag.style.color = cat.color;\n    var time = document.createElement('span'); time.className = 'note-time'; time.textContent = readTime(note.body);\n    top.appendChild(tag); top.appendChild(time);\n\n    var title = document.createElement('h3'); title.className = 'note-title'; title.textContent = note.title;\n    var summary = document.createElement('p'); summary.className = 'note-summary'; summary.textContent = note.summary;\n\n    var hint = document.createElement('div'); hint.className = 'note-toggle-hint';\n    hint.innerHTML = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>';\n    var hintText = document.createTextNode('Read note');\n    hint.appendChild(hintText);\n\n    head.appendChild(top); head.appendChild(title); head.appendChild(summary); head.appendChild(hint);\n\n    var body = document.createElement('div'); body.className = 'note-body';\n    var bodyInner = document.createElement('div'); bodyInner.className = 'note-body-inner';\n    note.body.forEach(function(paraText){\n      var p = document.createElement('p');\n      p.textContent = paraText;\n      bodyInner.appendChild(p);\n    });\n    body.appendChild(bodyInner);\n\n    head.addEventListener('click', function(){\n      var isOpen = card.classList.toggle('open');\n      head.setAttribute('aria-expanded', String(isOpen));\n      hint.replaceChild(document.createTextNode(isOpen ? 'Collapse' : 'Read note'), hint.lastChild);\n    });\n\n    card.appendChild(head);\n    card.appendChild(body);\n    return card;\n  }\n\n  function matchesSearch(note){\n    if(!searchTerm) return true;\n    var haystack = (note.title + ' ' + note.summary + ' ' + note.body.join(' ')).toLowerCase();\n    return haystack.indexOf(searchTerm) !== -1;\n  }\n\n  function render(){\n    // update breaker pressed states\n    Array.prototype.forEach.call(breakerRow.children, function(btn){\n      btn.setAttribute('aria-pressed', String(btn.dataset.cat === activeCategory));\n    });\n\n    var sectionsEl = document.getElementById('noteSections');\n    sectionsEl.innerHTML = '';\n    var shown = 0;\n\n    var catsToShow = DATA.filter(function(cat){ return activeCategory === 'all' || activeCategory === cat.id; });\n\n    catsToShow.forEach(function(cat){\n      var visibleNotes = cat.notes.filter(matchesSearch);\n      if(visibleNotes.length === 0) return;\n      shown += visibleNotes.length;\n\n      var section = document.createElement('section');\n      section.className = 'catsection';\n\n      var head = document.createElement('div'); head.className = 'catsection-head';\n      var dot = document.createElement('span'); dot.className = 'catdot'; dot.style.background = cat.color;\n      var h2 = document.createElement('h2'); h2.textContent = cat.label;\n      var count = document.createElement('span'); count.className = 'catcount'; count.textContent = visibleNotes.length + (visibleNotes.length===1?' note':' notes');\n      head.appendChild(dot); head.appendChild(h2); head.appendChild(count);\n\n      var grid = document.createElement('div'); grid.className = 'grid';\n      visibleNotes.forEach(function(note){ grid.appendChild(makeCard(cat, note)); });\n\n      section.appendChild(head);\n      section.appendChild(grid);\n      sectionsEl.appendChild(section);\n    });\n\n    if(shown === 0){\n      var empty = document.createElement('div');\n      empty.className = 'empty-state';\n      empty.textContent = 'No notes match that search. Try a different term, or reset filters below.';\n      sectionsEl.appendChild(empty);\n    }\n\n    document.getElementById('resultsCount').textContent = 'Showing ' + shown + ' of ' + totalNotes + ' notes';\n  }\n\n  document.getElementById('searchInput').addEventListener('input', function(e){\n    searchTerm = e.target.value.trim().toLowerCase();\n    render();\n  });\n  document.getElementById('clearFilters').addEventListener('click', function(){\n    activeCategory = 'all';\n    searchTerm = '';\n    document.getElementById('searchInput').value = '';\n    render();\n  });\n\n  renderBreakers();\n  render();\n})();\n<\/script>\n\n</body>\n</html>\n";
} catch(e) { console.error("app.js module #1 error:", e); }
try {
(function(){
var catSelect = document.getElementById('noteCatSelect');
var newCatWrap = document.getElementById('noteNewCatWrap');
catSelect.addEventListener('change', function(){
newCatWrap.style.display = (this.value === '__new__') ? '' : 'none';
});
function jsEscape(s){
    return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');

  }



  document.getElementById('noteGenBtn').addEventListener('click', function(){

    var title = document.getElementById('noteTitle').value.trim();

    var summary = document.getElementById('noteSummary').value.trim();

    var bodyLines = document.getElementById('noteBody').value.split('\n').map(function(l){return l.trim();}).filter(Boolean);

    var cat = catSelect.value;

    var newCat = document.getElementById('noteNewCat').value.trim();



    var out = document.getElementById('noteOutput');

    if(!title || !summary || bodyLines.length===0){

      out.value = 'Fill in title, summary, and at least one body paragraph first.';

      return;

    }



    var noteObj = '        {\n          title:"'+jsEscape(title)+'",\n          summary:"'+jsEscape(summary)+'",\n          body:[\n'

      + bodyLines.map(function(l){ return '            "'+jsEscape(l)+'"'; }).join(',\n')

      + '\n          ]\n        }';



    if(cat === '__new__' && newCat){

      var slug = newCat.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

      out.value = '// New subject block — add this as a new entry in the DATA array (top level, alongside "fundamentals" etc.):\n'

+ '    {\n      id:\''+slug+'\', label:\''+jsEscape(newCat)+'\', color:\'#5FD3E3\',\n      notes:[\n'+noteObj+'\n      ]\n    }';
} else {
out.value = '// Paste this inside the "'+cat+'" subject\'s notes:[ ... ] array, as a new item:\n' + noteObj + ',';
}
});
document.getElementById('noteCopyBtn').addEventListener('click', function(){
var out = document.getElementById('noteOutput');
var statusEl = document.getElementById('noteCopyStatus');
if(!out.value){ statusEl.textContent = 'Generate the code first.'; return; }
out.select();
navigator.clipboard.writeText(out.value).then(function(){
statusEl.textContent = 'Copied — paste it into the DATA array in the Notes page source.';
}).catch(function(){
statusEl.textContent = 'Couldn\'t auto-copy — the text is selected, use Ctrl/Cmd+C.';
});
});
var frame = document.getElementById('notesFrame');
frame.srcdoc = NOTES_HTML;
})();
} catch(e) { console.error("app.js module #2 error:", e); }
try {
var MECH_NOTES_HTML = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Mechanical Learning Notes \u2014 Theory &amp; Reference</title>\n<link rel=\"icon\" type=\"image/svg+xml\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='5' fill='%231E2226'/%3E%3Ccircle cx='16' cy='16' r='7' fill='none' stroke='%23D68A4C' stroke-width='2.4'/%3E%3Ccircle cx='16' cy='16' r='2.4' fill='%23D68A4C'/%3E%3C/svg%3E\">\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n<style>\n  :root{\n    --iron:#1E2226; --iron-2:#282D32; --iron-3:#333A40;\n    --grid-line: rgba(214,138,76,.07);\n    --copper:#D68A4C; --copper-dim:#8C5C30;\n    --vellum:#F6F1E4; --vellum-2:#EFE8D4; --vellum-line:#DCD2B4;\n    --ink:#241F14; --ink-dim:#6B6250; --ink-faint:#9A9078;\n    --paper-text:#E4DED0; --paper-text-dim:#A29A88;\n    --fault:#B23A2E;\n    --font-display:\"Oswald\",\"Arial Narrow\",-apple-system,sans-serif;\n    --font-body:\"Source Serif 4\",Georgia,serif;\n    --font-mono:\"IBM Plex Mono\",\"Cascadia Mono\",ui-monospace,monospace;\n  }\n  *{box-sizing:border-box;}\n  html{scroll-behavior:smooth;}\n  html,body{margin:0;background:var(--iron);color:var(--paper-text);font-family:var(--font-body);}\n  body{\n    background-image:\n      repeating-linear-gradient(45deg, var(--grid-line) 0px, var(--grid-line) 1px, transparent 1px, transparent 16px),\n      repeating-linear-gradient(-45deg, var(--grid-line) 0px, var(--grid-line) 1px, transparent 1px, transparent 16px);\n    background-color:var(--iron);\n  }\n  ::selection{background:rgba(214,138,76,.28);}\n  a{color:var(--copper);}\n  .wrap{max-width:960px;margin:0 auto;padding:0 20px;}\n\n  :focus-visible{outline:2px solid var(--copper); outline-offset:2px;}\n\n  /* ===== topbar ===== */\n  .topbar{position:sticky;top:0;z-index:40;background:rgba(30,34,38,.92);backdrop-filter:blur(6px);border-bottom:1px solid rgba(214,138,76,.20);}\n  .topbar-inner{max-width:960px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}\n  .brand{display:flex;align-items:center;gap:9px;font-family:var(--font-display);font-weight:700;font-size:15px;letter-spacing:.02em;color:#F3EEDD;text-decoration:none;text-transform:uppercase;}\n  .brand .gear{color:var(--copper);font-size:16px;}\n  .searchbox{position:relative;flex:none;width:min(280px,60vw);}\n  .searchbox input{\n    width:100%;background:var(--iron-2);border:1px solid rgba(214,138,76,.24);border-radius:5px;\n    color:var(--paper-text);font-family:var(--font-mono);font-size:12.5px;padding:9px 12px 9px 30px;outline:none;\n  }\n  .searchbox input::placeholder{color:var(--paper-text-dim);}\n  .searchbox input:focus{border-color:var(--copper);}\n  .searchbox svg{position:absolute;left:9px;top:50%;transform:translateY(-50%);width:14px;height:14px;color:var(--paper-text-dim);pointer-events:none;}\n\n  /* ===== hero ===== */\n  .hero{padding:56px 0 8px;}\n  .eyebrow{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--copper);margin-bottom:14px;}\n  h1{font-family:var(--font-display);font-size:clamp(28px,5vw,44px);line-height:1.12;font-weight:600;color:#F6F1E4;margin:0 0 16px;letter-spacing:0;max-width:17ch;text-transform:uppercase;}\n  .hero-sub{font-family:var(--font-body);font-size:16px;line-height:1.65;color:var(--paper-text-dim);max-width:56ch;margin:0 0 22px;}\n  .hero-meta{display:flex;gap:22px;flex-wrap:wrap;padding-top:18px;border-top:1px solid rgba(214,138,76,.18);}\n  .hero-meta .m{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);}\n  .hero-meta .m b{display:block;color:#F6F1E4;font-size:19px;font-family:var(--font-display);font-weight:600;margin-bottom:2px;}\n\n  /* ===== filter board (gear-train diagram) ===== */\n  .board{margin:44px 0 6px;}\n  .board-label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper-text-dim);margin-bottom:18px;}\n  .board-label b{color:var(--copper);font-weight:600;}\n  .sld{background:var(--iron-2);border:1px solid rgba(214,138,76,.18);border-radius:8px;padding:22px 22px 18px;overflow-x:auto;}\n  .shaft-row{position:relative;height:2px;background:linear-gradient(90deg, transparent, var(--copper-dim) 4%, var(--copper-dim) 96%, transparent);margin:0 6px 0;min-width:640px;}\n  .cogs{display:flex;min-width:640px;padding-top:0;}\n  .cog-btn{\n    flex:1;min-width:64px;background:none;border:none;cursor:pointer;padding:0 4px 4px;\n    display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--paper-text-dim);\n  }\n  .drop{width:2px;height:16px;background:var(--copper-dim);}\n  .cog{\n    width:26px;height:26px;border:2px solid var(--copper-dim);border-radius:50%;position:relative;background:var(--iron);\n    display:flex;align-items:center;justify-content:center;transition:border-color .15s ease, box-shadow .15s ease, transform .3s ease;\n  }\n  .cog::before{content:'';position:absolute;inset:-4px;border-radius:50%;border:2px dashed transparent;}\n  .cog .hub{width:6px;height:6px;border-radius:50%;background:var(--copper-dim);transition:background .18s ease;}\n  .cog-btn[aria-pressed=\"true\"] .cog{border-color:var(--copper);box-shadow:0 0 10px rgba(214,138,76,.45);transform:rotate(35deg);}\n  .cog-btn[aria-pressed=\"true\"] .cog .hub{background:var(--copper);}\n  .cog-btn.is-all[aria-pressed=\"true\"] .cog{border-color:#E8C27C;box-shadow:0 0 10px rgba(232,194,124,.45);}\n  .cog-btn.is-all[aria-pressed=\"true\"] .cog .hub{background:#E8C27C;}\n  .cog-name{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.03em;text-transform:uppercase;text-align:center;line-height:1.35;}\n  .cog-count{font-family:var(--font-mono);font-size:9px;color:var(--paper-text-dim);opacity:.8;}\n  .cog-btn:hover .cog-name{color:#F6F1E4;}\n  .cog-btn:hover .cog{border-color:var(--copper);}\n\n  /* ===== results meta ===== */\n  .results-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:26px 0 6px;font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);flex-wrap:wrap;}\n  .results-meta .clear{background:none;border:1px solid rgba(214,138,76,.32);color:var(--copper);border-radius:4px;padding:5px 10px;cursor:pointer;font-family:var(--font-mono);font-size:10.5px;}\n  .results-meta .clear:hover{background:rgba(214,138,76,.1);}\n\n  /* ===== category sections ===== */\n  .catsection{margin-top:38px;}\n  .catsection-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}\n  .catdot{width:9px;height:9px;border-radius:50%;flex:none;}\n  .catsection-head h2{font-family:var(--font-display);font-size:15px;font-weight:600;color:#F6F1E4;margin:0;letter-spacing:.01em;text-transform:uppercase;}\n  .catsection-head .catcount{font-family:var(--font-mono);font-size:10.5px;color:var(--paper-text-dim);}\n\n  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;}\n\n  .note-card{\n    background:var(--vellum);border-radius:6px;border-left:4px solid var(--copper);\n    box-shadow:0 2px 10px rgba(0,0,0,.26);overflow:hidden;\n  }\n  .note-head{\n    width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:14px 15px 12px;\n    display:flex;flex-direction:column;gap:8px;font-family:inherit;color:inherit;\n  }\n  .note-toprow{display:flex;justify-content:space-between;align-items:center;gap:8px;}\n  .note-tag{font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;}\n  .note-time{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);white-space:nowrap;}\n  .note-title{font-family:var(--font-display);font-size:14.5px;font-weight:600;color:var(--ink);line-height:1.35;margin:0;}\n  .note-summary{font-family:var(--font-body);font-size:12.5px;color:var(--ink-dim);line-height:1.55;margin:0;}\n  .note-toggle-hint{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);display:flex;align-items:center;gap:5px;margin-top:2px;}\n  .note-toggle-hint svg{width:9px;height:9px;transition:transform .15s ease;}\n  .note-card.open .note-toggle-hint svg{transform:rotate(180deg);}\n  .note-body{max-height:0;overflow:hidden;transition:max-height .28s ease;}\n  .note-card.open .note-body{max-height:900px;}\n  .note-body-inner{padding:0 15px 16px;border-top:1px solid var(--vellum-line);margin-top:2px;}\n  .note-body-inner p{font-family:var(--font-body);font-size:13px;line-height:1.7;color:var(--ink);margin:12px 0 0;}\n  .note-body-inner p:first-child{margin-top:14px;}\n\n  @media (prefers-reduced-motion: reduce){\n    html{scroll-behavior:auto;}\n    .note-body, .cog, .note-card.open .note-toggle-hint svg{transition:none;}\n  }\n\n  .empty-state{\n    grid-column:1/-1;font-family:var(--font-mono);font-size:12px;color:var(--paper-text-dim);\n    border:1px dashed rgba(214,138,76,.28);border-radius:6px;padding:26px;text-align:center;\n  }\n\n  footer{margin:70px 0 40px;padding-top:22px;border-top:1px solid rgba(214,138,76,.18);}\n  .foot-note{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);line-height:1.7;max-width:64ch;}\n  .foot-mark{font-family:var(--font-mono);font-size:10px;color:var(--copper-dim);margin-top:16px;}\n\n  @media (max-width:560px){\n    .cog-btn{min-width:52px;}\n    .cog-name{font-size:8.5px;}\n    .sld{padding:18px 14px 14px;}\n  }\n</style>\n</head>\n<body>\n\n<div class=\"topbar\">\n  <div class=\"topbar-inner\">\n    <a class=\"brand\" href=\"#top\"><span class=\"gear\">\u2699</span> MECHANICAL LEARNING NOTES</a>\n    <div class=\"searchbox\">\n      <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"7\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n      <input type=\"text\" id=\"searchInput\" placeholder=\"Search notes\u2026\" autocomplete=\"off\">\n    </div>\n  </div>\n</div>\n\n<div class=\"wrap\" id=\"top\">\n  <div class=\"hero\">\n    <div class=\"eyebrow\">Personal reference \u00b7 theory only</div>\n    <h1>Notes on how machines actually work.</h1>\n    <p class=\"hero-sub\">A running set of short, plain-language write-ups on core mechanical engineering concepts \u2014 how things work and why, not how to size them. There are no calculators or design tools on this page, and nothing here is invented: every note covers established, textbook-level mechanical theory.</p>\n    <div class=\"hero-meta\">\n      <div class=\"m\"><b id=\"metaNoteCount\">0</b>notes</div>\n      <div class=\"m\"><b id=\"metaCatCount\">0</b>subjects</div>\n      <div class=\"m\"><b>0</b>calculators</div>\n    </div>\n  </div>\n\n  <div class=\"board\">\n    <div class=\"board-label\">Filter by subject \u2014 <b>engage a gear</b> to select that subject</div>\n    <div class=\"sld\">\n      <div class=\"shaft-row\"></div>\n      <div class=\"cogs\" id=\"cogRow\"></div>\n    </div>\n  </div>\n\n  <div class=\"results-meta\">\n    <span id=\"resultsCount\"></span>\n    <button class=\"clear\" id=\"clearFilters\" type=\"button\">Reset filters</button>\n  </div>\n\n  <main id=\"noteSections\"></main>\n\n  <footer>\n    <p class=\"foot-note\">These are summary explanations written for learning and quick reference \u2014 they're deliberately simplified and aren't a substitute for the current edition of the relevant standard (ASME, ISO, API, etc.) or for a qualified engineer's judgement on a real installation. No content on this page is generated per-visit or personalized \u2014 what you read is what's written into the page.</p>\n    <div class=\"foot-mark\">\u2014 end of drive train \u2014</div>\n  </footer>\n</div>\n\n<script>\n(function(){\n\n  var DATA = [{\"id\": \"fundamentals\", \"label\": \"Fundamentals\", \"color\": \"#C1662B\", \"notes\": [{\"title\": \"Stress, Strain and the Elastic Modulus\", \"summary\": \"The two numbers every mechanical calculation eventually comes back to.\", \"body\": [\"Stress is force divided by the area it acts over (\u03c3 = F/A), and strain is how much a material deforms relative to its original size (\u03b5 = \u0394L/L). Neither one alone tells you much about a material \u2014 it's the relationship between them that matters.\", \"For most engineering materials at low stress, that relationship is a straight line, and its slope is the elastic modulus (Young's modulus, E): \u03c3 = E\u00b7\u03b5. A stiffer material \u2014 steel versus rubber, for instance \u2014 simply has a steeper line, meaning it takes more stress to produce the same strain. This straight-line region is also where deformation is fully recoverable; unload the part and it springs back to its original shape.\"]}, {\"title\": \"Newton's Laws in Mechanical Design\", \"summary\": \"Three 17th-century statements that still size every shaft and support today.\", \"body\": [\"Newton's three laws underpin essentially all of classical mechanical design. The first \u2014 a body stays at rest or in uniform motion unless acted on by a net force \u2014 is why a stationary machine needs no net force to stay put, but why an unbalanced rotating part will vibrate itself apart over time.\", \"The second law, F = ma, is the workhorse: it's what lets a designer connect a required acceleration (starting a conveyor, stopping a flywheel) to the force or torque a motor or brake actually has to deliver. The third law \u2014 every action has an equal and opposite reaction \u2014 is why a foundation has to resist the same force a machine exerts on it, and why bolted joints and foundations are sized for more than just the static weight sitting on them.\"]}, {\"title\": \"Work, Energy and Power: The Basic Bookkeeping\", \"summary\": \"Three related quantities that get mixed up constantly \u2014 and shouldn't be.\", \"body\": [\"Work is force applied over a distance (W = F\u00b7d), and it's measured in the same units as energy, because doing work on something is exactly how energy gets transferred into or out of it. Lifting a weight, compressing a spring, and accelerating a mass are all just different ways of doing work.\", \"Power is the rate at which that work happens \u2014 energy per unit time (P = W/t) \u2014 which is why two machines can do the identical amount of work and need very different motor sizes, if one has to do it in a tenth of the time. Confusing energy (kWh, Joules) with power (kW, Watts) is one of the most common unit mistakes in mechanical estimating, precisely because the two are related but not interchangeable.\"]}, {\"title\": \"Free Body Diagrams and Why Every Analysis Starts With One\", \"summary\": \"The habit that turns a confusing structure into a solvable one.\", \"body\": [\"A free body diagram isolates a single component or point and draws every external force and moment acting on it \u2014 gravity, applied loads, reactions from supports or connected parts \u2014 with the rest of the system stripped away. It sounds almost too simple to matter, but skipping it is the single most common source of sign errors and missed loads in a hand calculation.\", \"Once every force is drawn, the analysis is just applying equilibrium: the sum of forces in each direction and the sum of moments about any point must equal zero for a body at rest. Complex assemblies are solved by working through a chain of free body diagrams, one component at a time, so a mistake stays isolated instead of propagating invisibly through the whole calculation.\"]}]}, {\"id\": \"fluids\", \"label\": \"Fluid Mechanics\", \"color\": \"#3D6B63\", \"notes\": [{\"title\": \"Bernoulli's Equation and Its Limits\", \"summary\": \"One of the most useful equations in fluid mechanics \u2014 and one of the most misapplied.\", \"body\": [\"Bernoulli's equation says that along a streamline, the sum of pressure energy, kinetic energy and potential energy per unit volume stays constant: p + \u00bd\u03c1v\u00b2 + \u03c1gh = constant. It's why fluid speeds up where a pipe narrows and why pressure drops where velocity rises \u2014 the same total energy is just redistributed between the terms.\", \"The catch is that the simple form assumes no friction and no energy added or removed by a pump or fitting, which is never quite true in a real pipe run. Real calculations use an extended version with a head-loss term added specifically to account for friction and fittings \u2014 Bernoulli gives the ideal baseline, and head loss is the correction that makes it match reality.\"]}, {\"title\": \"Laminar vs Turbulent Flow: What Reynolds Number Tells You\", \"summary\": \"A single dimensionless number that predicts whether flow will be smooth or chaotic.\", \"body\": [\"The Reynolds number (Re = \u03c1vD/\u03bc) compares inertial forces to viscous forces in a flow. At low Reynolds numbers, viscosity dominates and fluid moves in smooth, parallel layers \u2014 laminar flow. At high Reynolds numbers, inertia wins out and the flow becomes chaotic and mixing, full of eddies \u2014 turbulent flow.\", \"In a typical pipe, flow is laminar below roughly Re \u2248 2300 and turbulent above roughly Re \u2248 4000, with a messy transitional zone in between. The distinction matters enormously for design because the two regimes follow different friction-factor relationships, and turbulent flow \u2014 the far more common case in real piping systems \u2014 loses noticeably more energy to friction for the same average velocity.\"]}, {\"title\": \"Why Pumps Cavitate\", \"summary\": \"The vapor bubbles that form for a moment and take a pump apart over time.\", \"body\": [\"Cavitation happens when local pressure inside a pump \u2014 typically at the impeller eye, where velocity is highest and pressure lowest \u2014 drops below the fluid's vapor pressure at that temperature. The liquid flashes into vapor bubbles, which then collapse violently a moment later as they move into a higher-pressure region.\", \"Each collapsing bubble releases a tiny, intense shockwave against the nearest metal surface, and millions of these over time pit and erode the impeller \u2014 alongside noise, vibration, and a drop in pump performance. It's why NPSH available at the pump suction always has to exceed NPSH required by a margin: cavitation is a pressure problem at the suction side, not a discharge problem, and no amount of downstream pressure fixes it.\"]}, {\"title\": \"Head Loss: Friction, Fittings and Why Pipes Aren't Free\", \"summary\": \"Every metre of pipe and every bend costs energy \u2014 this is how that cost is counted.\", \"body\": [\"As fluid moves through a pipe, friction against the pipe wall converts some of its mechanical energy into heat, which shows up as a pressure (or \u201chead\u201d) loss along the run. This friction loss scales with pipe length, roughly with the square of velocity, and depends on pipe roughness \u2014 rougher pipe means more turbulence right at the wall and more loss for the same flow.\", \"Bends, valves, tees and other fittings add further \u201cminor\u201d losses on top of the straight-pipe friction loss, and despite the name, minor losses in a fitting-heavy system can rival or exceed the friction loss in the straight runs. A pump has to be sized to overcome the total of both \u2014 static lift plus every friction and fitting loss in the system \u2014 which is why a pump selected only for static head routinely underperforms once it's actually installed.\"]}]}, {\"id\": \"thermo-hvac\", \"label\": \"Thermodynamics & HVAC\", \"color\": \"#B23A2E\", \"notes\": [{\"title\": \"The First Law of Thermodynamics in Plain Terms\", \"summary\": \"Energy can move and change form, but the books always have to balance.\", \"body\": [\"The first law of thermodynamics is really just conservation of energy applied to heat and work: the change in a system's internal energy equals the heat added to it minus the work it does on its surroundings (\u0394U = Q \u2212 W). Energy isn't created or destroyed inside the system, only converted between forms or moved across its boundary.\", \"This is the accounting rule behind everything from an engine cycle to a simple heat exchanger \u2014 whatever energy goes in as fuel, electricity or heat has to come out as useful work, waste heat, or a change in stored energy, with nothing left unaccounted for. Every efficiency figure quoted for mechanical equipment is really just a statement of how that balance splits between useful output and losses.\"]}, {\"title\": \"How a Refrigeration Cycle Moves Heat Uphill\", \"summary\": \"Heat doesn't want to flow from cold to hot \u2014 the cycle forces it to, at a cost.\", \"body\": [\"A vapor-compression refrigeration cycle moves heat from a colder space to a warmer one, which doesn't happen on its own \u2014 the second law of thermodynamics says heat naturally flows the other way. The cycle gets around this by doing work on the refrigerant: a compressor raises its pressure and temperature, it rejects heat to the warm side in the condenser, expands back down through a valve, and absorbs heat from the cold side in the evaporator as it evaporates.\", \"The refrigerant is deliberately chosen so it evaporates and condenses at useful temperatures for the pressures involved, changing phase at both the hot and cold ends of the cycle, since phase change moves far more heat per kilogram than simply heating or cooling a fluid. Every air conditioner, chiller and heat pump runs on some variation of this same basic cycle.\"]}, {\"title\": \"Sensible vs Latent Heat\", \"summary\": \"Why some cooling loads change a temperature and others change nothing but humidity.\", \"body\": [\"Sensible heat is energy that changes a substance's temperature without changing its phase \u2014 warming air from 24\u00b0C to 30\u00b0C, for instance. Latent heat is energy absorbed or released during a phase change, at constant temperature \u2014 water evaporating into humid air, or condensing back out of it, without the air's dry-bulb temperature itself changing at that instant.\", \"An air conditioning load is really the sum of both: the sensible load from equipment, lighting and people that raises air temperature, plus the latent load from moisture that has to be condensed out to control humidity. Sizing cooling equipment on sensible load alone is a common oversizing-or-undersizing mistake, especially in humid climates where the latent portion of the total load can be substantial.\"]}, {\"title\": \"Why Air Changes Per Hour Isn't the Whole Ventilation Story\", \"summary\": \"A single number that tells you how often the air turns over, not whether it's actually clean.\", \"body\": [\"Air changes per hour (ACH) describes how many times a room's full air volume is theoretically replaced with fresh or filtered air in an hour, and it's a common quick sizing metric for ventilation and exhaust systems. A higher ACH generally means faster dilution of contaminants, heat, or humidity.\", \"What ACH doesn't capture is how well that air actually mixes \u2014 a poorly placed supply and return can let fresh air short-circuit straight from inlet to outlet while stagnant pockets sit unventilated elsewhere in the room, even at a high nominal ACH. That's why real ventilation design pairs an ACH target with diffuser placement and airflow patterns, rather than treating the ACH number alone as proof the space is well ventilated.\"]}]}, {\"id\": \"machine-design\", \"label\": \"Machine Design & Power Transmission\", \"color\": \"#6E93C7\", \"notes\": [{\"title\": \"Why Bearings Fail: The Basics of Fatigue Life\", \"summary\": \"A bearing rarely breaks all at once \u2014 it wears out from millions of tiny repeated loads.\", \"body\": [\"Rolling-element bearings don't typically fail from a single overload; they fail from fatigue, as the rolling elements repeatedly stress the same small patches of raceway surface millions of times over the bearing's life. Eventually, subsurface cracks form and propagate to the surface as spalling, and the bearing's running noise and vibration rise sharply as this happens.\", \"Because fatigue is a statistical, cumulative process, bearing life is normally quoted as an L10 life \u2014 the number of revolutions or hours by which 90% of a batch of identical bearings are still expected to survive, not a guarantee for any individual bearing. Life scales strongly with load: even a modest increase in applied load shortens the expected fatigue life by a disproportionately larger amount, which is why correct load calculation matters more to bearing selection than almost any other single input.\"]}, {\"title\": \"Gears vs Belts vs Chains: Choosing a Power Transmission Method\", \"summary\": \"Three ways to move rotation and torque from one shaft to another \u2014 each with a different trade-off.\", \"body\": [\"Gears mesh directly, tooth to tooth, giving precise, slip-free speed ratios and the ability to carry very high torque in a compact space, at the cost of requiring accurate shaft alignment and, usually, lubrication. Chains carry high torque over longer center distances without slipping, tolerating a bit more misalignment than gears, but need lubrication and stretch slightly as they wear.\", \"Belts are the quietest and most tolerant of misalignment, and (aside from timing belts) inherently allow a small amount of slip that can protect a machine from shock loads \u2014 but they carry less torque for a given size and eventually need retensioning as they age. Which one wins depends on the torque involved, the center distance needed, tolerance for slip, and how much maintenance access the installation allows.\"]}, {\"title\": \"Factor of Safety: What It Actually Buys You\", \"summary\": \"A single number meant to absorb every uncertainty a designer can't fully calculate.\", \"body\": [\"A factor of safety is the ratio between a material or component's failure load and the load it's actually expected to see in service \u2014 a factor of safety of 4 means the part is designed to withstand four times its expected working load before failing. It exists because no calculation perfectly captures real conditions: material properties vary between batches, actual loads include shocks and vibration a static calculation misses, and manufacturing introduces small imperfections.\", \"Higher factors of safety are chosen where failure consequences are severe (lifting equipment, pressure vessels, structural supports) or where loading is poorly known, while lower factors are acceptable where loads are well characterized and failure is inconvenient rather than dangerous. It's a deliberately conservative buffer, not a precise prediction \u2014 doubling a factor of safety doesn't mean a part will literally last twice as long.\"]}, {\"title\": \"Torque, Speed and Power: The Rotating Machine Triangle\", \"summary\": \"The three quantities every motor, pump and gearbox selection has to reconcile.\", \"body\": [\"For any rotating shaft, power, torque and rotational speed are locked together by a single relationship: P = T\u00d7\u03c9 (or, in common units, kW = T[Nm]\u00d7N[RPM]/9550). Fix any two and the third is determined \u2014 which is exactly why a gearbox that trades speed for torque can't also increase power output; it can only shift the balance between the two.\", \"This is also why a motor's nameplate speed matters as much as its power rating: the same kW motor delivers far more torque at low RPM than at high RPM, and machinery like conveyors or mixers that need high starting torque at low speed is generally paired with either a low-speed motor or a reduction gearbox rather than driven directly at motor speed.\"]}]}, {\"id\": \"materials\", \"label\": \"Materials\", \"color\": \"#8B7FB8\", \"notes\": [{\"title\": \"Reading a Stress-Strain Curve\", \"summary\": \"One graph that tells you almost everything about how a material will behave under load.\", \"body\": [\"A stress-strain curve, generated by pulling a standard test specimen until it breaks, starts with a straight elastic region where the material returns to its original shape if unloaded. Beyond the yield point, the material enters the plastic region, deforming permanently even after the load is removed \u2014 this is the boundary most structural designs are deliberately kept below.\", \"Past yield, the curve typically keeps rising to an ultimate tensile strength as the material work-hardens, then falls off as the specimen necks down and finally fractures. The shape of the whole curve \u2014 how far it stretches before breaking, how sharply it drops after the peak \u2014 is what separates a ductile material, which gives visible warning before failing, from a brittle one, which can fracture with little or no prior deformation.\"]}, {\"title\": \"Why Metals Fatigue Even Below Their Yield Strength\", \"summary\": \"A load too small to bend a part once can still break it after enough cycles.\", \"body\": [\"Fatigue failure happens under repeated or cyclic loading, at stress levels far below what would cause immediate yielding or fracture in a single application. Microscopic cracks initiate at a stress concentration \u2014 a sharp corner, a surface scratch, a void in the material \u2014 and grow a tiny amount with every load cycle until the remaining cross-section can no longer carry the load and fails suddenly.\", \"Many steels show a fatigue (or endurance) limit: a stress level below which the material can theoretically sustain an unlimited number of cycles without failing. Many other metals, aluminium alloys among them, don't show a true endurance limit at all \u2014 their fatigue strength keeps declining with more cycles no matter how low the stress, which is exactly why fatigue life, not just static strength, has to be checked explicitly for any part subject to repeated loading.\"]}, {\"title\": \"Corrosion: The Electrochemistry Hiding in Rust\", \"summary\": \"Rust isn't just metal wearing out \u2014 it's a tiny battery running in reverse.\", \"body\": [\"Most corrosion is an electrochemical process: at an anodic site on a metal surface, atoms give up electrons and dissolve into solution as ions, while at a cathodic site elsewhere on the same surface, those electrons are consumed in a separate reaction, commonly involving oxygen and water. The metal, the electrolyte (moisture) and the electron flow between anode and cathode together form a tiny corrosion cell \u2014 essentially a short-circuited battery, slowly consuming the metal.\", \"This is why two dissimilar metals in electrical contact, in the presence of moisture, corrode faster than either would alone \u2014 galvanic corrosion \u2014 with the more \u201cnoble\u201d metal protected at the expense of the more reactive one. It's also the principle behind sacrificial anodes and cathodic protection: attaching a more reactive metal deliberately gives the corrosion cell a preferred anode to consume instead of the structure being protected.\"]}, {\"title\": \"Choosing Between Steel, Aluminium and Stainless: What Actually Matters\", \"summary\": \"There's no single \u201cbest\u201d structural metal \u2014 only the one that fits the constraints in front of you.\", \"body\": [\"Carbon steel is the default structural choice for good reason: high strength and stiffness per unit cost, widely available, and easy to weld and fabricate \u2014 its main weakness is that it corrodes readily without a protective coating. Aluminium weighs roughly a third as much as steel for a given volume and resists corrosion far better on its own, but it's noticeably less stiff for the same cross-section and typically costs more.\", \"Stainless steel adds chromium to form a thin, self-healing oxide layer that resists corrosion far better than plain carbon steel, at a real cost premium and generally lower strength-to-cost than plain steel. The right choice usually comes down to weighing strength-to-weight, corrosion environment, fabrication method, and budget against each other \u2014 not picking whichever material sounds the most advanced.\"]}]}, {\"id\": \"rotating-equipment\", \"label\": \"Rotating Equipment & Pumps\", \"color\": \"#4FA88F\", \"notes\": [{\"title\": \"Centrifugal vs Positive Displacement Pumps\", \"summary\": \"Two fundamentally different ways to move a fluid \u2014 and very different behavior when things go wrong.\", \"body\": [\"A centrifugal pump uses a spinning impeller to accelerate fluid outward and convert that velocity into pressure, and its flow rate depends heavily on the pressure it's working against \u2014 flow drops as system pressure (head) rises. It's simple, handles varying flow well, and is the default choice for most general liquid transfer.\", \"A positive displacement pump instead traps a fixed volume of fluid and physically pushes it through with each cycle \u2014 gear, screw, diaphragm and piston pumps all work this way \u2014 delivering a nearly constant flow rate regardless of pressure, up to the limit of the driver. That constant-flow behavior is exactly why positive displacement pumps need a pressure-relief path: unlike a centrifugal pump, a blocked outlet doesn't just reduce flow, it keeps building pressure until something gives way.\"]}, {\"title\": \"Why Pump Curves Slope Downward\", \"summary\": \"The graph that tells you a centrifugal pump can't just deliver whatever flow you ask for.\", \"body\": [\"A centrifugal pump's performance curve plots the head it can develop against the flow rate passing through it, and that curve slopes downward: at shutoff (zero flow) the pump develops its maximum head, and head falls as flow increases. This happens because the impeller has a fixed amount of energy to add to the fluid, and pushing more flow through the same impeller geometry means more of that energy is lost to internal friction and turbulence rather than converted to useful head.\", \"A pump doesn't operate wherever you'd like on that curve \u2014 it settles at the single point where its head-flow curve crosses the system's own head-loss curve, called the operating point. That's why simply picking a pump rated for a desired flow isn't enough; the system curve it will actually be paired with has to be calculated too, or the real operating point can land somewhere the pump performs poorly or not at all.\"]}, {\"title\": \"Motor and Pump Coupling: Why Alignment Matters\", \"summary\": \"A few tenths of a millimetre of misalignment is enough to wreck a bearing.\", \"body\": [\"When a motor and a pump (or any two rotating machines) are connected by a coupling, their shafts need to be aligned within a tight tolerance \u2014 both parallel offset and angular misalignment matter. Even misalignment too small to see with the naked eye forces the coupling and both machines' bearings to absorb cyclic side-loads they weren't designed for, every single revolution.\", \"Left uncorrected, that repeated side-loading accelerates bearing fatigue, increases vibration and seal wear, and can eventually crack the shaft itself \u2014 failures that often get misdiagnosed as a bad bearing or a bad pump when the real root cause was a coupling alignment that was never checked or drifted after installation. Laser alignment tools have made checking this fast enough that it's now standard practice on any coupled rotating equipment, not just critical machinery.\"]}, {\"title\": \"Vibration as an Early Warning System\", \"summary\": \"A healthy machine has a vibration signature \u2014 and so does almost every way it can fail.\", \"body\": [\"Every piece of rotating machinery vibrates to some degree even when healthy, and that vibration has a characteristic pattern tied to its rotating speed and construction. Specific problems change that pattern in specific, recognizable ways: imbalance shows up as vibration at once-per-revolution frequency, misalignment often shows at twice that frequency, and a damaged bearing produces vibration at frequencies tied to its specific geometry \u2014 ball, race and cage.\", \"This is the basis of vibration-based condition monitoring: by tracking how a machine's vibration spectrum changes over time, developing problems can often be identified and scheduled for repair weeks or months before they'd otherwise cause an unplanned failure. It turns maintenance from a fixed schedule or a reaction to breakdowns into something closer to reading symptoms before they become a diagnosis.\"]}]}, {\"id\": \"standards\", \"label\": \"Standards & Codes\", \"color\": \"#E2934E\", \"notes\": [{\"title\": \"ASME, ISO and API: Who Writes the Rules for Mechanical Equipment\", \"summary\": \"Three overlapping rulebooks that most mechanical equipment ends up governed by.\", \"body\": [\"ASME (the American Society of Mechanical Engineers) publishes some of the most widely referenced mechanical codes worldwide, including the Boiler and Pressure Vessel Code and the B31 series covering piping \u2014 these are treated as legally binding requirements in many jurisdictions, not just voluntary guidance. ISO produces internationally harmonized standards across a huge range of mechanical topics, from general tolerancing (ISO 286) to specific equipment classes, aiming for one standard usable across many countries at once.\", \"API (the American Petroleum Institute) focuses specifically on oil and gas equipment \u2014 pumps, valves, tanks, pressure vessels built to the demands of that industry. In practice, a single piece of mechanical equipment is often built to satisfy several of these at once \u2014 an ASME pressure vessel built to API materials requirements and inspected under a jurisdiction's own regulations layered on top.\"]}, {\"title\": \"Piping Classes and Why Pipe Isn't \u201cJust a Pipe\u201d\", \"summary\": \"The same nominal pipe size can mean several very different wall thicknesses.\", \"body\": [\"A pipe's nominal size (like \u201c4 inch\u201d) describes roughly its bore, not its wall thickness \u2014 that's set separately by its schedule (Schedule 40, Schedule 80, and so on), which determines how much pressure and mechanical stress the pipe can actually withstand. Two pipes with the same nominal size but different schedules have noticeably different outside diameters and very different pressure ratings.\", \"A piping class in an engineering specification bundles together the pipe schedule, material, fitting type and rating appropriate for a specific service and pressure/temperature range, so that anyone selecting components for that service picks compatible parts without having to re-derive the requirements from scratch each time. Mixing pipe or fittings from the wrong class into a system is a common and serious error precisely because it can look correct at a glance while being rated for entirely different conditions.\"]}]}, {\"id\": \"maintenance\", \"label\": \"Maintenance & Reliability\", \"color\": \"#B7A339\", \"notes\": [{\"title\": \"Preventive vs Predictive Maintenance\", \"summary\": \"Fixing things on a schedule versus fixing them when the data says they actually need it.\", \"body\": [\"Preventive maintenance replaces or services a component at fixed intervals \u2014 time-based or run-hours-based \u2014 regardless of its actual condition, on the theory that most failures follow a roughly predictable pattern. It's simple to plan and budget for, but it inevitably wastes some useful life on parts replaced early, and it can still miss failures that don't follow the assumed schedule.\", \"Predictive maintenance instead monitors a component's actual condition \u2014 through vibration analysis, oil analysis, thermal imaging, and similar techniques \u2014 and schedules work based on real evidence that something is degrading, not a calendar. It generally gets more useful life out of equipment and catches developing problems preventive schedules would miss, at the cost of needing monitoring equipment, data, and the expertise to interpret it correctly.\"]}, {\"title\": \"Lubrication: The Cheapest Insurance a Machine Has\", \"summary\": \"Most mechanical wear is really a lubrication failure with a delay.\", \"body\": [\"Lubricant's main job is separating two moving metal surfaces with a thin film so they never make direct metal-to-metal contact, which is what most wear and friction actually come from. Beyond reducing friction, lubricant also carries heat away from the contact area and helps flush out wear debris and contaminants before they can act like an abrasive.\", \"A striking share of premature bearing and gear failures trace back to a lubrication problem \u2014 wrong lubricant grade, contamination (often water or dirt ingress), or simply running low or degraded \u2014 rather than a design or material defect in the component itself. That's exactly why lubrication is one of the highest-value, lowest-cost items on most maintenance schedules: getting it right prevents failures that would otherwise look, superficially, like unrelated mechanical problems.\"]}, {\"title\": \"The Bathtub Curve and Why Equipment Fails When It Does\", \"summary\": \"A famous shape that describes failure rate over a machine's whole life, not just when it breaks.\", \"body\": [\"Plot a population of components' failure rate against time and it often traces a bathtub shape: a high initial failure rate from manufacturing defects and installation errors (infancy failures), dropping to a long, low, roughly constant failure rate during normal service (useful life), then rising again as wear-out mechanisms \u2014 fatigue, corrosion, general degradation \u2014 accumulate toward end of life.\", \"This shape is exactly why commissioning and initial run-in periods matter so much \u2014 they're specifically there to catch infancy failures before a machine is relied on in production \u2014 and why maintenance strategies shift over a machine's life: little intervention needed during the flat middle section, then increasing attention as age-related wear-out approaches. Reliability engineering is largely about recognizing which part of that curve a given piece of equipment is currently on.\"]}]}, {\"id\": \"safety\", \"label\": \"Safety\", \"color\": \"#D65B4A\", \"notes\": [{\"title\": \"Lockout-Tagout: Isolating Stored Energy, Not Just Switching Off\", \"summary\": \"A machine that's \u201coff\u201d can still move, drop or discharge unless every energy source feeding it is actually locked out.\", \"body\": [\"Lockout-tagout controls hazardous energy during maintenance by physically isolating every source feeding a machine \u2014 electrical, but also stored mechanical energy in springs, a raised or suspended load, pressurized hydraulics or pneumatics, and residual heat \u2014 and locking each isolation point so it can't be re-energized while someone is working on the equipment.\", \"The tag matters almost as much as the lock: it identifies who applied the lockout and why, so nobody assumes a machine is safe to restart just because the immediate hazard looks gone. Most lockout-related injuries trace back to a source of stored energy nobody accounted for, not a failure of the lock itself \u2014 a spring-loaded mechanism, a suspended load, or residual pressure still in a line is exactly why a full energy-source inventory has to precede any lockout, not just isolating the obvious main switch.\"]}, {\"title\": \"Machine Guarding: What a Guard Is Actually Preventing\", \"summary\": \"A guard isn't there to slow work down \u2014 it's there to keep a hazard out of reach while it's still capable of causing injury.\", \"body\": [\"Machine guarding exists to keep a person's body, clothing or tools out of a machine's point of operation, or out of the path of moving parts such as belts, gears or rotating shafts, while those parts are capable of causing injury. The type of guard is chosen for the specific hazard \u2014 a fixed barrier for a consistently dangerous zone, an interlocked guard that stops the machine the instant it's opened, or a presence-sensing device where an opening is too large to fully enclose.\", \"Removing or defeating a guard to work faster is one of the most common root causes of serious machine injuries, precisely because doing so restores full access to a hazard the guard was specifically installed to block \u2014 the machine doesn't become any less dangerous just because the guard is gone, only more reachable.\"]}, {\"title\": \"Pressure Vessels and Why They're Regulated So Tightly\", \"summary\": \"A vessel under pressure stores energy the same way a compressed spring does \u2014 except it can release all of it at once.\", \"body\": [\"A pressure vessel holds its contents above atmospheric pressure, and that pressure is stored energy \u2014 if the vessel fails suddenly rather than through a controlled release, that energy can release explosively, propelling fragments and a pressure wave well beyond the vessel itself. That's why pressure vessel design, fabrication and inspection are governed by strict codes, the ASME Boiler and Pressure Vessel Code among them, rather than left to general structural judgement.\", \"Relief devices \u2014 safety valves or rupture discs \u2014 are a mandatory part of that protection, sized to vent excess pressure before it exceeds the vessel's rated limit, and deliberately kept independent of any other control system so they still function if everything else fails. Routine inspection matters just as much as the original design, since corrosion, fatigue or a degraded relief device can quietly erode a margin that was perfectly adequate when the vessel was new.\"]}]}];\n\n  var totalNotes = DATA.reduce(function(sum, cat){ return sum + cat.notes.length; }, 0);\n  document.getElementById('metaNoteCount').textContent = totalNotes;\n  document.getElementById('metaCatCount').textContent = DATA.length;\n\n  function wordCount(paras){\n    return paras.join(' ').trim().split(/\\s+/).length;\n  }\n  function readTime(paras){\n    var words = wordCount(paras);\n    var mins = Math.max(1, Math.round(words / 200));\n    return mins + ' min read';\n  }\n\n  var activeCategory = 'all';\n  var searchTerm = '';\n\n  // ---- build cog row ----\n  var cogRow = document.getElementById('cogRow');\n  function makeCog(id, label, count, isAll){\n    var btn = document.createElement('button');\n    btn.type = 'button';\n    btn.className = 'cog-btn' + (isAll ? ' is-all' : '');\n    btn.setAttribute('aria-pressed', String(id === activeCategory));\n    btn.dataset.cat = id;\n\n    var drop = document.createElement('div'); drop.className = 'drop';\n    var cog = document.createElement('div'); cog.className = 'cog';\n    var hub = document.createElement('div'); hub.className = 'hub';\n    cog.appendChild(hub);\n    var name = document.createElement('div'); name.className = 'cog-name'; name.textContent = label;\n    var cnt = document.createElement('div'); cnt.className = 'cog-count'; cnt.textContent = count + (count===1?' note':' notes');\n\n    btn.appendChild(drop); btn.appendChild(cog); btn.appendChild(name); btn.appendChild(cnt);\n    btn.addEventListener('click', function(){\n      activeCategory = id;\n      render();\n    });\n    return btn;\n  }\n  function renderCogs(){\n    cogRow.innerHTML = '';\n    cogRow.appendChild(makeCog('all', 'All Subjects', totalNotes, true));\n    DATA.forEach(function(cat){\n      cogRow.appendChild(makeCog(cat.id, cat.label, cat.notes.length, false));\n    });\n  }\n\n  // ---- build note card ----\n  function makeCard(cat, note){\n    var card = document.createElement('div');\n    card.className = 'note-card';\n    card.style.borderLeftColor = cat.color;\n\n    var head = document.createElement('button');\n    head.type = 'button';\n    head.className = 'note-head';\n    head.setAttribute('aria-expanded', 'false');\n\n    var top = document.createElement('div'); top.className = 'note-toprow';\n    var tag = document.createElement('span'); tag.className = 'note-tag'; tag.textContent = cat.label; tag.style.color = cat.color;\n    var time = document.createElement('span'); time.className = 'note-time'; time.textContent = readTime(note.body);\n    top.appendChild(tag); top.appendChild(time);\n\n    var title = document.createElement('h3'); title.className = 'note-title'; title.textContent = note.title;\n    var summary = document.createElement('p'); summary.className = 'note-summary'; summary.textContent = note.summary;\n\n    var hint = document.createElement('div'); hint.className = 'note-toggle-hint';\n    hint.innerHTML = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>';\n    var hintText = document.createTextNode('Read note');\n    hint.appendChild(hintText);\n\n    head.appendChild(top); head.appendChild(title); head.appendChild(summary); head.appendChild(hint);\n\n    var body = document.createElement('div'); body.className = 'note-body';\n    var bodyInner = document.createElement('div'); bodyInner.className = 'note-body-inner';\n    note.body.forEach(function(paraText){\n      var p = document.createElement('p');\n      p.textContent = paraText;\n      bodyInner.appendChild(p);\n    });\n    body.appendChild(bodyInner);\n\n    head.addEventListener('click', function(){\n      var isOpen = card.classList.toggle('open');\n      head.setAttribute('aria-expanded', String(isOpen));\n      hint.replaceChild(document.createTextNode(isOpen ? 'Collapse' : 'Read note'), hint.lastChild);\n    });\n\n    card.appendChild(head);\n    card.appendChild(body);\n    return card;\n  }\n\n  function matchesSearch(note){\n    if(!searchTerm) return true;\n    var haystack = (note.title + ' ' + note.summary + ' ' + note.body.join(' ')).toLowerCase();\n    return haystack.indexOf(searchTerm) !== -1;\n  }\n\n  function render(){\n    // update cog pressed states\n    Array.prototype.forEach.call(cogRow.children, function(btn){\n      btn.setAttribute('aria-pressed', String(btn.dataset.cat === activeCategory));\n    });\n\n    var sectionsEl = document.getElementById('noteSections');\n    sectionsEl.innerHTML = '';\n    var shown = 0;\n\n    var catsToShow = DATA.filter(function(cat){ return activeCategory === 'all' || activeCategory === cat.id; });\n\n    catsToShow.forEach(function(cat){\n      var visibleNotes = cat.notes.filter(matchesSearch);\n      if(visibleNotes.length === 0) return;\n      shown += visibleNotes.length;\n\n      var section = document.createElement('section');\n      section.className = 'catsection';\n\n      var head = document.createElement('div'); head.className = 'catsection-head';\n      var dot = document.createElement('span'); dot.className = 'catdot'; dot.style.background = cat.color;\n      var h2 = document.createElement('h2'); h2.textContent = cat.label;\n      var count = document.createElement('span'); count.className = 'catcount'; count.textContent = visibleNotes.length + (visibleNotes.length===1?' note':' notes');\n      head.appendChild(dot); head.appendChild(h2); head.appendChild(count);\n\n      var grid = document.createElement('div'); grid.className = 'grid';\n      visibleNotes.forEach(function(note){ grid.appendChild(makeCard(cat, note)); });\n\n      section.appendChild(head);\n      section.appendChild(grid);\n      sectionsEl.appendChild(section);\n    });\n\n    if(shown === 0){\n      var empty = document.createElement('div');\n      empty.className = 'empty-state';\n      empty.textContent = 'No notes match that search. Try a different term, or reset filters below.';\n      sectionsEl.appendChild(empty);\n    }\n\n    document.getElementById('resultsCount').textContent = 'Showing ' + shown + ' of ' + totalNotes + ' notes';\n  }\n\n  document.getElementById('searchInput').addEventListener('input', function(e){\n    searchTerm = e.target.value.trim().toLowerCase();\n    render();\n  });\n  document.getElementById('clearFilters').addEventListener('click', function(){\n    activeCategory = 'all';\n    searchTerm = '';\n    document.getElementById('searchInput').value = '';\n    render();\n  });\n\n  renderCogs();\n  render();\n})();\n<\/script>\n\n</body>\n</html>\n";
} catch(e) { console.error("app.js module #3 error:", e); }
try {
document.addEventListener('DOMContentLoaded', function(){
var catSelect = document.getElementById('mechNoteCatSelect');
var newCatWrap = document.getElementById('mechNoteNewCatWrap');
if(!catSelect) return;
catSelect.addEventListener('change', function(){
newCatWrap.style.display = (this.value === '__new__') ? '' : 'none';
});
function jsEscape(s){
    return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');

  }



  document.getElementById('mechNoteGenBtn').addEventListener('click', function(){

    var title = document.getElementById('mechNoteTitle').value.trim();

    var summary = document.getElementById('mechNoteSummary').value.trim();

    var bodyLines = document.getElementById('mechNoteBody').value.split('\n').map(function(l){return l.trim();}).filter(Boolean);

    var cat = catSelect.value;

    var newCat = document.getElementById('mechNoteNewCat').value.trim();



    var out = document.getElementById('mechNoteOutput');

    if(!title || !summary || bodyLines.length===0){

      out.value = 'Fill in title, summary, and at least one body paragraph first.';

      return;

    }



    var noteObj = '        {\n          title:"'+jsEscape(title)+'",\n          summary:"'+jsEscape(summary)+'",\n          body:[\n'

      + bodyLines.map(function(l){ return '            "'+jsEscape(l)+'"'; }).join(',\n')

      + '\n          ]\n        }';



    if(cat === '__new__' && newCat){

      var slug = newCat.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

      out.value = '// New subject block — add this as a new entry in the DATA array (top level, alongside "fundamentals" etc.):\n'

+ '    {\n      id:\''+slug+'\', label:\''+jsEscape(newCat)+'\', color:\'#D68A4C\',\n      notes:[\n'+noteObj+'\n      ]\n    }';
} else {
out.value = '// Paste this inside the "'+cat+'" subject\'s notes:[ ... ] array, as a new item:\n' + noteObj + ',';
}
});
document.getElementById('mechNoteCopyBtn').addEventListener('click', function(){
var out = document.getElementById('mechNoteOutput');
var statusEl = document.getElementById('mechNoteCopyStatus');
if(!out.value){ statusEl.textContent = 'Generate the code first.'; return; }
out.select();
navigator.clipboard.writeText(out.value).then(function(){
statusEl.textContent = 'Copied — paste it into the DATA array in the Notes page source.';
}).catch(function(){
statusEl.textContent = "Couldn't auto-copy — the text is selected, use Ctrl/Cmd+C.";
});
});
var mechFrame = document.getElementById('mechNotesFrame');
if(mechFrame) mechFrame.srcdoc = MECH_NOTES_HTML;
});
} catch(e) { console.error("app.js module #4 error:", e); }
try {
var HVAC_NOTES_HTML = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>HVAC Learning Notes \u2014 Theory &amp; Reference</title>\n<link rel=\"icon\" type=\"image/svg+xml\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='5' fill='%231B2530'/%3E%3Crect x='7' y='14' width='18' height='4' rx='1' fill='none' stroke='%235AA9D6' stroke-width='2'/%3E%3Cline x1='9' y1='16' x2='23' y2='16' stroke='%235AA9D6' stroke-width='2'/%3E%3C/svg%3E\">\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n<style>\n  :root{\n    --steel:#1B2530; --steel-2:#243244; --steel-3:#2F4058;\n    --grid-line: rgba(90,169,214,.08);\n    --sky:#5AA9D6; --sky-dim:#3A7CA5;\n    --vellum:#F6F1E4; --vellum-2:#EFE8D4; --vellum-line:#DCD2B4;\n    --ink:#241F14; --ink-dim:#6B6250; --ink-faint:#9A9078;\n    --paper-text:#DCE6EE; --paper-text-dim:#8FA0B0;\n    --fault:#D6704A;\n    --font-display:\"Archivo\",-apple-system,sans-serif;\n    --font-body:\"Source Serif 4\",Georgia,serif;\n    --font-mono:\"IBM Plex Mono\",\"Cascadia Mono\",ui-monospace,monospace;\n  }\n  *{box-sizing:border-box;}\n  html{scroll-behavior:smooth;}\n  html,body{margin:0;background:var(--steel);color:var(--paper-text);font-family:var(--font-body);}\n  body{\n    background-image:\n      linear-gradient(var(--grid-line) 1px, transparent 1px),\n      linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);\n    background-size: 30px 30px;\n    background-color:var(--steel);\n  }\n  ::selection{background:rgba(90,169,214,.28);}\n  a{color:var(--sky);}\n  .wrap{max-width:960px;margin:0 auto;padding:0 20px;}\n\n  :focus-visible{outline:2px solid var(--sky); outline-offset:2px;}\n\n  /* ===== topbar ===== */\n  .topbar{position:sticky;top:0;z-index:40;background:rgba(27,37,48,.92);backdrop-filter:blur(6px);border-bottom:1px solid rgba(90,169,214,.20);}\n  .topbar-inner{max-width:960px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}\n  .brand{display:flex;align-items:center;gap:9px;font-family:var(--font-display);font-weight:700;font-size:15px;letter-spacing:.02em;color:#F3EEDD;text-decoration:none;}\n  .brand .snow{color:var(--sky);font-size:16px;}\n  .searchbox{position:relative;flex:none;width:min(280px,60vw);}\n  .searchbox input{\n    width:100%;background:var(--steel-2);border:1px solid rgba(90,169,214,.24);border-radius:5px;\n    color:var(--paper-text);font-family:var(--font-mono);font-size:12.5px;padding:9px 12px 9px 30px;outline:none;\n  }\n  .searchbox input::placeholder{color:var(--paper-text-dim);}\n  .searchbox input:focus{border-color:var(--sky);}\n  .searchbox svg{position:absolute;left:9px;top:50%;transform:translateY(-50%);width:14px;height:14px;color:var(--paper-text-dim);pointer-events:none;}\n\n  /* ===== hero ===== */\n  .hero{padding:56px 0 8px;}\n  .eyebrow{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--sky);margin-bottom:14px;}\n  h1{font-family:var(--font-display);font-size:clamp(28px,5vw,44px);line-height:1.14;font-weight:700;color:#F6F1E4;margin:0 0 16px;letter-spacing:-.01em;max-width:16ch;}\n  .hero-sub{font-family:var(--font-body);font-size:16px;line-height:1.65;color:var(--paper-text-dim);max-width:56ch;margin:0 0 22px;}\n  .hero-meta{display:flex;gap:22px;flex-wrap:wrap;padding-top:18px;border-top:1px solid rgba(90,169,214,.16);}\n  .hero-meta .m{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);}\n  .hero-meta .m b{display:block;color:#F6F1E4;font-size:19px;font-family:var(--font-display);font-weight:600;margin-bottom:2px;}\n\n  /* ===== filter board (damper-row diagram) ===== */\n  .board{margin:44px 0 6px;}\n  .board-label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper-text-dim);margin-bottom:18px;}\n  .board-label b{color:var(--sky);font-weight:600;}\n  .sld{background:var(--steel-2);border:1px solid rgba(90,169,214,.18);border-radius:8px;padding:24px 22px 18px;overflow-x:auto;}\n  .duct-row{position:relative;height:10px;border-top:2px solid var(--sky-dim);border-bottom:2px solid var(--sky-dim);margin:0 6px 0;min-width:640px;}\n  .dampers{display:flex;min-width:640px;padding-top:0;}\n  .damper-btn{\n    flex:1;min-width:64px;background:none;border:none;cursor:pointer;padding:0 4px 4px;\n    display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--paper-text-dim);\n  }\n  .drop{width:2px;height:16px;background:var(--sky-dim);}\n  .damper{\n    width:28px;height:16px;border:2px solid var(--sky-dim);border-radius:2px;position:relative;background:var(--steel);\n    display:flex;align-items:center;justify-content:center;overflow:hidden;\n    transition:border-color .15s ease, box-shadow .15s ease;\n  }\n  .damper .blade{width:100%;height:2px;background:var(--sky-dim);transform-origin:center center;transition:transform .22s ease, background .18s ease;}\n  .damper-btn[aria-pressed=\"true\"] .damper{border-color:var(--sky);box-shadow:0 0 10px rgba(90,169,214,.45);}\n  .damper-btn[aria-pressed=\"true\"] .damper .blade{background:var(--sky);transform:rotate(58deg) scaleX(.7);}\n  .damper-btn[aria-pressed=\"false\"] .damper .blade{transform:rotate(0deg);}\n  .damper-btn.is-all[aria-pressed=\"true\"] .damper{border-color:#8FD0E8;box-shadow:0 0 10px rgba(143,208,232,.45);}\n  .damper-btn.is-all[aria-pressed=\"true\"] .damper .blade{background:#8FD0E8;}\n  .damper-name{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.03em;text-transform:uppercase;text-align:center;line-height:1.35;}\n  .damper-count{font-family:var(--font-mono);font-size:9px;color:var(--paper-text-dim);opacity:.8;}\n  .damper-btn:hover .damper-name{color:#F6F1E4;}\n  .damper-btn:hover .damper{border-color:var(--sky);}\n\n  /* ===== results meta ===== */\n  .results-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:26px 0 6px;font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);flex-wrap:wrap;}\n  .results-meta .clear{background:none;border:1px solid rgba(90,169,214,.3);color:var(--sky);border-radius:4px;padding:5px 10px;cursor:pointer;font-family:var(--font-mono);font-size:10.5px;}\n  .results-meta .clear:hover{background:rgba(90,169,214,.1);}\n\n  /* ===== category sections ===== */\n  .catsection{margin-top:38px;}\n  .catsection-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}\n  .catdot{width:9px;height:9px;border-radius:50%;flex:none;}\n  .catsection-head h2{font-family:var(--font-display);font-size:15px;font-weight:600;color:#F6F1E4;margin:0;letter-spacing:.01em;}\n  .catsection-head .catcount{font-family:var(--font-mono);font-size:10.5px;color:var(--paper-text-dim);}\n\n  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;}\n\n  .note-card{\n    background:var(--vellum);border-radius:6px;border-left:4px solid var(--sky);\n    box-shadow:0 2px 10px rgba(0,0,0,.22);overflow:hidden;\n  }\n  .note-head{\n    width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:14px 15px 12px;\n    display:flex;flex-direction:column;gap:8px;font-family:inherit;color:inherit;\n  }\n  .note-toprow{display:flex;justify-content:space-between;align-items:center;gap:8px;}\n  .note-tag{font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;}\n  .note-time{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);white-space:nowrap;}\n  .note-title{font-family:var(--font-display);font-size:14.5px;font-weight:600;color:var(--ink);line-height:1.35;margin:0;}\n  .note-summary{font-family:var(--font-body);font-size:12.5px;color:var(--ink-dim);line-height:1.55;margin:0;}\n  .note-toggle-hint{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);display:flex;align-items:center;gap:5px;margin-top:2px;}\n  .note-toggle-hint svg{width:9px;height:9px;transition:transform .15s ease;}\n  .note-card.open .note-toggle-hint svg{transform:rotate(180deg);}\n  .note-body{max-height:0;overflow:hidden;transition:max-height .28s ease;}\n  .note-card.open .note-body{max-height:900px;}\n  .note-body-inner{padding:0 15px 16px;border-top:1px solid var(--vellum-line);margin-top:2px;}\n  .note-body-inner p{font-family:var(--font-body);font-size:13px;line-height:1.7;color:var(--ink);margin:12px 0 0;}\n  .note-body-inner p:first-child{margin-top:14px;}\n\n  @media (prefers-reduced-motion: reduce){\n    html{scroll-behavior:auto;}\n    .note-body, .damper .blade, .note-card.open .note-toggle-hint svg{transition:none;}\n  }\n\n  .empty-state{\n    grid-column:1/-1;font-family:var(--font-mono);font-size:12px;color:var(--paper-text-dim);\n    border:1px dashed rgba(90,169,214,.25);border-radius:6px;padding:26px;text-align:center;\n  }\n\n  footer{margin:70px 0 40px;padding-top:22px;border-top:1px solid rgba(90,169,214,.16);}\n  .foot-note{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);line-height:1.7;max-width:64ch;}\n  .foot-mark{font-family:var(--font-mono);font-size:10px;color:var(--sky-dim);margin-top:16px;}\n\n  @media (max-width:560px){\n    .damper-btn{min-width:52px;}\n    .damper-name{font-size:8.5px;}\n    .sld{padding:20px 14px 16px;}\n  }\n</style>\n</head>\n<body>\n\n<div class=\"topbar\">\n  <div class=\"topbar-inner\">\n    <a class=\"brand\" href=\"#top\"><span class=\"snow\">\u2744</span> HVAC LEARNING NOTES</a>\n    <div class=\"searchbox\">\n      <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"7\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n      <input type=\"text\" id=\"searchInput\" placeholder=\"Search notes\u2026\" autocomplete=\"off\">\n    </div>\n  </div>\n</div>\n\n<div class=\"wrap\" id=\"top\">\n  <div class=\"hero\">\n    <div class=\"eyebrow\">Personal reference \u00b7 theory only</div>\n    <h1>Notes on how HVAC systems actually work.</h1>\n    <p class=\"hero-sub\">A running set of short, plain-language write-ups on core heating, ventilation and air-conditioning concepts \u2014 how things work and why, not how to size them. There are no calculators or design tools on this page, and nothing here is invented: every note covers established, textbook-level HVAC theory.</p>\n    <div class=\"hero-meta\">\n      <div class=\"m\"><b id=\"metaNoteCount\">0</b>notes</div>\n      <div class=\"m\"><b id=\"metaCatCount\">0</b>subjects</div>\n      <div class=\"m\"><b>0</b>calculators</div>\n    </div>\n  </div>\n\n  <div class=\"board\">\n    <div class=\"board-label\">Filter by subject \u2014 <b>open a damper</b> to select that subject</div>\n    <div class=\"sld\">\n      <div class=\"duct-row\"></div>\n      <div class=\"dampers\" id=\"damperRow\"></div>\n    </div>\n  </div>\n\n  <div class=\"results-meta\">\n    <span id=\"resultsCount\"></span>\n    <button class=\"clear\" id=\"clearFilters\" type=\"button\">Reset filters</button>\n  </div>\n\n  <main id=\"noteSections\"></main>\n\n  <footer>\n    <p class=\"foot-note\">These are summary explanations written for learning and quick reference \u2014 they're deliberately simplified and aren't a substitute for the current edition of the relevant standard (ASHRAE 62.1, ASHRAE 90.1, ASHRAE 15, local mechanical/energy codes, etc.) or for a qualified engineer's judgement on a real installation. No content on this page is generated per-visit or personalized \u2014 what you read is what's written into the page.</p>\n    <div class=\"foot-mark\">\u2014 end of duct run \u2014</div>\n  </footer>\n</div>\n\n<script>\n(function(){\n\n  var DATA = [\n    {\n      id:'psychrometrics', label:'Psychrometrics', color:'#5AA9D6',\n      notes:[\n        {\n          title:\"Dry-Bulb, Wet-Bulb and Dew Point: Three Ways to Read Air\",\n          summary:\"One thermometer alone can't tell you how humid the air actually is.\",\n          body:[\n            \"Dry-bulb temperature is the plain air temperature an ordinary thermometer reads. Wet-bulb temperature is what a thermometer reads with its bulb wrapped in a wet wick and exposed to moving air \u2014 evaporation cools the wick, and how much cooling happens depends on how much moisture the surrounding air can still absorb. In dry air, evaporation is rapid and wet-bulb reads well below dry-bulb; in saturated air, no more moisture can evaporate and the two readings converge.\",\n            \"Dew point is the temperature at which the air's actual moisture content would just start to condense if the air were cooled with nothing added or removed. All three describe the same parcel of air from a different angle, and together \u2014 usually alongside a third property like relative humidity \u2014 they're enough to fully place that air's condition on a psychrometric chart.\"\n          ]\n        },\n        {\n          title:\"Relative Humidity vs Humidity Ratio: Two Different Numbers\",\n          summary:\"One changes with temperature alone; the other only changes when moisture is added or removed.\",\n          body:[\n            \"Relative humidity (RH) is the ratio of moisture actually in the air to the maximum it could hold at that specific temperature, expressed as a percentage. Because warmer air can hold more moisture, RH changes automatically whenever temperature changes, even if the actual water content of the air hasn't moved at all \u2014 heating a parcel of air lowers its RH without adding or removing a single gram of water.\",\n            \"Humidity ratio (also called moisture content, typically in grams of water per kilogram of dry air) instead measures the actual mass of water vapor mixed into the air, independent of temperature. It only changes when moisture is genuinely added or removed \u2014 by a humidifier, a cooling coil condensing water out, or fresh air mixing in \u2014 which is exactly why load calculations and coil selection work from humidity ratio rather than from RH.\"\n          ]\n        },\n        {\n          title:\"Reading a Psychrometric Chart\",\n          summary:\"A single chart that shows every state moist air can be in, and every process that moves it there.\",\n          body:[\n            \"A psychrometric chart plots dry-bulb temperature along the bottom and humidity ratio up the side, with curved lines of constant relative humidity sweeping across it \u2014 the topmost curve, at 100% RH, is the saturation line, where air is holding all the moisture it physically can at that temperature. Any point on the chart fully describes one state of moist air, and reading across from that point to the chart's edges gives properties like wet-bulb temperature, dew point and enthalpy without further calculation.\",\n            \"The real value of the chart is following processes as straight lines across it: heating a coil moves a point horizontally right at constant moisture content, cooling and dehumidifying moves it down and to the left as the air's path crosses the saturation curve, and mixing two airstreams lands on the straight line connecting their two starting points. Most HVAC equipment selection \u2014 a cooling coil's split between sensible and latent removal, for instance \u2014 is really just tracing one of these paths on the chart.\"\n          ]\n        }\n      ]\n    },\n    {\n      id:'ductwork', label:'Air Distribution & Ductwork', color:'#4FA88F',\n      notes:[\n        {\n          title:\"Static, Velocity and Total Pressure in a Duct System\",\n          summary:\"A fan doesn't just push air \u2014 it has to overcome two different kinds of resistance at once.\",\n          body:[\n            \"Static pressure is the outward push against a duct's walls, the pressure that drives air through fittings, filters and coils and is lost to friction along the way. Velocity pressure is the pressure associated with the air actually moving at a given speed, and it converts back and forth with static pressure as a duct narrows or widens \u2014 a smaller duct trades some static pressure for higher velocity pressure, which is why a poorly transitioned duct can lose more pressure at a fitting than a long straight run.\",\n            \"Total pressure is simply the sum of the two, and it's total pressure that steadily falls in the direction of airflow as friction and fittings consume it \u2014 a fan exists specifically to add total pressure back into the system. A fan is selected against the total static pressure the whole duct run, its fittings, and any equipment in the airstream (coils, filters, dampers) adds up to at the design airflow, not against any single component in isolation.\"\n          ]\n        },\n        {\n          title:\"Why Duct Systems Are Balanced, Not Just Sized\",\n          summary:\"Correctly sized ductwork can still deliver the wrong airflow to every single outlet.\",\n          body:[\n            \"Sizing a duct sets its cross-section for an acceptable velocity and pressure drop, but it doesn't by itself guarantee any particular branch gets the airflow it was designed for \u2014 air, like any fluid, takes the path of least resistance, and branches closer to the fan or with straighter runs tend to get more flow than their design share unless something forces the split. That's the job of balancing: adjusting dampers throughout the system, branch by branch, until measured airflow at each outlet matches the design intent.\",\n            \"Balancing is normally done after installation with a flow hood or pitot-tube traverse, working from the index run (the branch with the least available pressure) outward, since throttling a damper only ever adds resistance \u2014 it can bring an over-supplied branch down to match the worst one, but it can never push more air through a branch than the fan and duct system can deliver to it.\"\n          ]\n        },\n        {\n          title:\"Diffusers, Grilles and Throw: Getting Air Where It's Needed\",\n          summary:\"How air leaves a duct outlet matters as much as how much of it there is.\",\n          body:[\n            \"A diffuser or grille's job isn't just to let air out \u2014 its geometry shapes how that air spreads into the room. Throw is the distance a jet of supply air travels before its velocity drops to a specified low value (often around 15 to 20 metres per minute), and it has to be matched to the room: too short a throw and air dumps straight down near the outlet, too long and it slams into a far wall or an occupant before it's mixed with room air and lost its chill or draft.\",\n            \"Diffuser selection is really a balance between throw, spread pattern, noise (which rises sharply with outlet velocity) and the pressure drop the diffuser itself adds to the system \u2014 a diffuser sized purely for airflow without checking throw and noise can deliver the correct volume of air while still leaving the room drafty, stuffy in the corners, or audibly noisy.\"\n          ]\n        }\n      ]\n    },\n    {\n      id:'equipment', label:'Heating & Cooling Equipment', color:'#C1662B',\n      notes:[\n        {\n          title:\"Chillers: Vapor-Compression vs Absorption\",\n          summary:\"Almost every chiller cools water the same way \u2014 except the small minority that use heat instead of a compressor to do it.\",\n          body:[\n            \"A vapor-compression chiller runs the same refrigeration cycle as any air conditioner, just scaled up and arranged to cool a stream of water (or a water-glycol mix) instead of air directly \u2014 an electrically driven compressor raises refrigerant pressure, it rejects heat at the condenser, expands, and absorbs heat from the chilled-water loop at the evaporator. That chilled water is then piped out to cooling coils in air handling units throughout a building, which is what lets one central chiller plant serve many separate air-side systems.\",\n            \"An absorption chiller reaches the same end result \u2014 chilled water out \u2014 through an entirely different mechanism: rather than a mechanical compressor, it uses a heat source (steam, hot water, or a gas burner) together with a chemical absorbent pair (commonly lithium bromide and water) to drive the refrigeration cycle. Absorption chillers trade higher capital cost and lower efficiency for the ability to run on waste heat or cheap thermal energy instead of electricity, which is why they show up mainly where a large, otherwise-wasted heat source is already available on site.\"\n          ]\n        },\n        {\n          title:\"Air Handling Units: What's Actually Inside the Box\",\n          summary:\"An AHU is really several separate pieces of equipment sharing one casing and one airstream.\",\n          body:[\n            \"An air handling unit (AHU) is a casing that houses, in sequence, the components needed to condition and move air: a mixing section that blends return air with outside air, filters to protect the coils and improve indoor air quality, a cooling coil and often a separate heating coil, and a supply fan to push the conditioned air out into the ductwork. Some units add a heat-recovery section, humidifier, or sound attenuator depending on the application.\",\n            \"Air moves through each section in a fixed order, and that order matters: filters are placed upstream of coils specifically to keep the coil's fins clean (a fouled coil loses both airflow and heat-transfer capacity), and the fan is placed downstream of the coils in a typical draw-through arrangement so it pulls air evenly across the coil face rather than blowing unevenly into it. Rooftop units and packaged units bundle the same basic sections \u2014 plus, often, the refrigeration equipment itself \u2014 into a single outdoor-rated enclosure.\"\n          ]\n        },\n        {\n          title:\"VRF Systems: Many Indoor Units, One Refrigerant Loop\",\n          summary:\"Variable refrigerant flow pushes the whole refrigeration cycle out to where the air actually needs conditioning.\",\n          body:[\n            \"A variable refrigerant flow (VRF) system connects one or a few outdoor condensing units directly to many indoor fan-coil units through refrigerant piping, rather than distributing chilled water or conditioned air through ducts from a central plant. Each indoor unit has its own electronic expansion valve, letting the system deliver a different amount of cooling or heating to each zone independently by metering how much refrigerant flows to that unit at any moment.\",\n            \"Because refrigerant carries far more heat per unit of pipe cross-section than air or even water, VRF piping runs are far smaller than equivalent ductwork, which is a major reason VRF is popular in renovations and buildings with limited space for ductwork. Heat-recovery VRF variants take this further, letting some indoor units heat while others simultaneously cool, moving the rejected heat from the cooling zones directly to the heating zones instead of discarding it outdoors.\"\n          ]\n        },\n        {\n          title:\"Boilers and Hydronic Heating: Moving Heat With Water Instead of Air\",\n          summary:\"Water carries far more heat per unit volume than air \u2014 which is exactly why hydronic systems exist.\",\n          body:[\n            \"A hydronic heating system uses a boiler to heat water (or a water-glycol mix), then circulates that hot water through piping to terminal units \u2014 radiators, baseboard convectors, fan-coil units, or embedded radiant floor loops \u2014 that release the heat into each space. Because water holds vastly more heat per unit volume than air for a given temperature rise, hydronic distribution piping can be far smaller than the ductwork an equivalent air-based system would need, at the cost of needing pumps, piping, and freeze protection instead of fans and ducts.\",\n            \"Boilers themselves range from simple atmospheric gas-fired units to high-efficiency condensing boilers, which recover additional heat by cooling flue gases enough to condense the water vapor in them \u2014 a trick that only works if the return water is cool enough to accept that extra heat, which is why condensing boiler efficiency depends heavily on the temperatures the rest of the hydronic system is designed around.\"\n          ]\n        }\n      ]\n    },\n    {\n      id:'controls', label:'Controls & BMS', color:'#8B7FB8',\n      notes:[\n        {\n          title:\"Open-Loop vs Closed-Loop Control in HVAC\",\n          summary:\"The difference between guessing at a setting and actually checking whether it worked.\",\n          body:[\n            \"An open-loop control simply applies a fixed action without checking the result \u2014 running a fan at a set speed on a timer regardless of the temperature it's actually achieving is open-loop control. It's simple and cheap, but it can't correct itself if conditions change: a fixed heating output that was right on a mild day will overheat a room on a milder one and underheat it on a colder one.\",\n            \"A closed-loop (feedback) control instead measures the actual result \u2014 room temperature, for instance \u2014 and continuously adjusts its output to close the gap between that measurement and a setpoint. Nearly all HVAC comfort control is closed-loop for exactly this reason: a thermostat doesn't just turn heating on for a fixed time, it watches the measured temperature and keeps adjusting until the space actually reaches and holds the setpoint, compensating automatically for weather, occupancy, and solar gain that an open-loop system would have no way to detect.\"\n          ]\n        },\n        {\n          title:\"What a BMS Actually Does\",\n          summary:\"A building management system isn't one control loop \u2014 it's the layer that coordinates all of them together.\",\n          body:[\n            \"A building management system (BMS, sometimes BAS) ties together the individual control loops running throughout a building's mechanical systems \u2014 AHU discharge temperature, chiller staging, VAV box airflow, boiler sequencing \u2014 into one monitored, schedulable, and centrally adjustable system. Each piece of equipment typically still has its own local controller doing the fast, moment-to-moment control loop; the BMS sits above that layer, setting schedules and setpoints, watching for alarms, and letting operators see and adjust the whole building from one interface instead of walking to each piece of equipment individually.\",\n            \"Beyond convenience, a BMS is also where genuine energy savings get captured at the building level \u2014 night setback schedules, demand-based ventilation, chiller sequencing that runs the most efficient combination of equipment for the current load, and trend logging that lets an operator spot equipment running longer or harder than it should, often long before anyone would otherwise notice a problem.\"\n          ]\n        },\n        {\n          title:\"Economizers: Using Outside Air Instead of Mechanical Cooling\",\n          summary:\"Sometimes the outside air is already cold enough to do the cooling coil's job for free.\",\n          body:[\n            \"An economizer is a control strategy \u2014 usually a set of dampers and a controller \u2014 that brings in extra outside air to cool a building whenever outdoor conditions are favorable enough to reduce or eliminate the need for mechanical cooling. Instead of drawing the usual minimum ventilation air and recirculating the rest, the dampers open further, sometimes to 100% outside air, whenever doing so is cheaper than running the chiller or compressor to achieve the same effect.\",\n            \"A dry-bulb economizer switches on this extra outside air purely based on outdoor temperature; an enthalpy economizer instead compares the total heat content (temperature and humidity together) of outside air against return air, since cool but very humid outside air can actually take more energy to condition than warmer, drier return air. Economizers are one of the most effective single energy-saving strategies for buildings in mild climates, precisely because they let ordinary weather do work the mechanical cooling system would otherwise have to do at a real energy cost.\"\n          ]\n        }\n      ]\n    },\n    {\n      id:'iaq', label:'Ventilation & Indoor Air Quality', color:'#6E93C7',\n      notes:[\n        {\n          title:\"Why Ventilation Standards Specify Outside Air, Not Just Total Airflow\",\n          summary:\"Recirculating a lot of air isn't the same as diluting what's building up inside it.\",\n          body:[\n            \"Total supply airflow to a room and the fresh outside-air component of that airflow measure two different things. A space can have plenty of total air moving through it \u2014 enough for comfortable temperature control \u2014 while still recirculating the same stale, contaminant-laden air over and over if very little of that supply is actually fresh outside air. Ventilation standards like ASHRAE 62.1 therefore specify minimum outside-air rates directly, not just total airflow, because it's the outside-air fraction that actually dilutes CO2, odors, and other indoor-generated contaminants.\",\n            \"This is also why demand-controlled ventilation, which uses CO2 sensors to modulate outside-air intake based on actual occupancy, works: CO2 concentration is used as a practical proxy for how well a space's ventilation is currently diluting occupant-generated contaminants, letting a system bring in more outside air only when it's actually needed rather than running a fixed rate regardless of how many people are in the room.\"\n          ]\n        },\n        {\n          title:\"Filtration Ratings: What MERV Actually Measures\",\n          summary:\"A single number that tells you how well a filter catches particles of a specific, fairly small size.\",\n          body:[\n            \"MERV (Minimum Efficiency Reporting Value) rates air filters by how effectively they capture particles across a range of sizes, with the rating driven specifically by performance in the hardest-to-catch size range the standard tests \u2014 particles too large to be dodged easily by airflow, but too small to be reliably intercepted by a filter's fibers, roughly in the range of 0.3 to 3 microns. A higher MERV rating means better capture efficiency in that range, at the cost of higher airflow resistance, which is why swapping to a much higher-MERV filter without checking the fan and system can starve airflow or overload the fan motor.\",\n            \"MERV isn't the only filtration scale in use \u2014 HEPA filters, rated by a different standard entirely, capture an even higher percentage of very fine particles and are used where that level of filtration is specifically required, such as certain healthcare or cleanroom spaces \u2014 but for typical commercial and residential HVAC filtration, MERV is the number most equipment, ductwork, and design guidance is built around.\"\n          ]\n        },\n        {\n          title:\"Positive vs Negative Building Pressure\",\n          summary:\"Whether a building leaks air out or draws it in says a lot about what's happening at every door and window.\",\n          body:[\n            \"A building is positively pressurized when slightly more air is supplied to it than is exhausted or otherwise leaves, so the small excess pushes outward through any gaps, door openings, and intentional relief paths \u2014 this is generally the goal for most commercial buildings, since it keeps unfiltered, unconditioned outside air (and along with it, dust, humidity, and insects) from being drawn in uncontrolled through the envelope. Negative pressure is the reverse: more air leaves than is supplied, so outside air gets pulled in through any available opening.\",\n            \"Negative pressure is sometimes deliberately created and useful \u2014 an isolation room or a kitchen with heavy exhaust needs negative pressure specifically to keep odors, smoke, or contaminants from migrating out into surrounding spaces \u2014 but an unintentionally negative building, from an exhaust system that isn't matched by enough outside-air makeup, commonly shows up as doors that are hard to open, whistling gaps, and uncontrolled infiltration that both wastes energy and undermines filtration and humidity control.\"\n          ]\n        }\n      ]\n    },\n    {\n      id:'energy', label:'Energy & Efficiency', color:'#B7A339',\n      notes:[\n        {\n          title:\"SEER, EER and COP: Three Efficiency Metrics, Three Test Conditions\",\n          summary:\"Different numbers, testing different things, and not directly interchangeable.\",\n          body:[\n            \"COP (coefficient of performance) is the most fundamental of the three: the ratio of useful heating or cooling output to the energy input required to produce it, measured at one specific set of operating conditions. EER (energy efficiency ratio) is a similar ratio \u2014 cooling output in Btu/h divided by power input in watts \u2014 but measured under a single standardized full-load test condition, making it a snapshot of performance at one operating point rather than across a season.\",\n            \"SEER (seasonal energy efficiency ratio) instead averages performance across a full range of outdoor temperatures and part-load conditions meant to represent a typical cooling season, which is why a unit's SEER is usually noticeably higher than its EER at peak conditions \u2014 SEER credits the efficiency gains a modern variable-speed unit achieves at partial load, which a single full-load EER test can't capture at all. Comparing equipment on the wrong metric, or comparing a SEER rating directly against a COP figure, produces a misleading picture of efficiency even when both numbers are individually accurate.\"\n          ]\n        },\n        {\n          title:\"Why Variable-Speed Drives Save More Than Just Fan Energy\",\n          summary:\"Fan power scales with the cube of speed, which makes small speed reductions disproportionately valuable.\",\n          body:[\n            \"A fan or pump's power draw scales roughly with the cube of its speed (or flow) for a fixed system \u2014 halving the speed cuts required power to roughly an eighth of its full-speed value, not half. A variable-speed drive (VSD or VFD) that lets a fan slow down to match actual demand, instead of running at full speed and throttling with a damper or valve, therefore captures energy savings that grow disproportionately fast as load drops below full design conditions.\",\n            \"This cube-law relationship is also why VSDs pay back fastest on systems that spend most of their operating hours at partial load \u2014 a fan sized for a rare peak condition but usually running at 60\u201370% of that peak sees the largest share of its runtime in the steepest part of the power-versus-speed curve, which is exactly where a VSD's savings are largest relative to a fixed-speed, damper-throttled alternative.\"\n          ]\n        },\n        {\n          title:\"Heat Recovery Ventilation: Reclaiming Energy From Exhaust Air\",\n          summary:\"Bringing in fresh air always costs energy to condition \u2014 heat recovery claws some of that cost back.\",\n          body:[\n            \"Every unit of outside air brought in for ventilation has to be heated or cooled to match the space it's entering, which is a real and often substantial energy cost, especially in climates with large gaps between outdoor and indoor conditions. A heat (or energy) recovery ventilator places the incoming outside airstream and the outgoing exhaust airstream on either side of a heat exchanger, letting the exhaust air \u2014 which is already at or near room condition \u2014 pre-condition the incoming outside air before it ever reaches the main heating or cooling coil.\",\n            \"Sensible heat recovery exchangers transfer temperature only; energy recovery (enthalpy) exchangers transfer both temperature and moisture between the two airstreams, which is particularly valuable in humid climates where dehumidifying incoming outside air is a large part of the total cooling load. Either way, the exhaust air that would otherwise simply be thrown away is instead put to work reducing the load the rest of the system has to handle.\"\n          ]\n        }\n      ]\n    },\n    {\n      id:'standards', label:'Standards & Codes', color:'#E2934E',\n      notes:[\n        {\n          title:\"ASHRAE 62.1 and Ventilation Rate Requirements\",\n          summary:\"The standard most outside-air ventilation rates in commercial buildings ultimately trace back to.\",\n          body:[\n            \"ASHRAE Standard 62.1, Ventilation for Acceptable Indoor Air Quality, sets minimum outside-air ventilation rates for commercial and institutional buildings, typically expressed as a combination of a rate per person and a rate per unit floor area, varying by space type \u2014 an office, a classroom, and a gym have different assumed occupant densities and different pollutant sources, so the standard sets different minimums for each. It also defines the Ventilation Rate Procedure, the standard's prescriptive method for calculating minimum outside-air requirements for a given space and occupancy.\",\n            \"Many national and local mechanical codes adopt ASHRAE 62.1's requirements directly or with local amendments, which is why it functions as a de facto minimum ventilation baseline across much of the design industry even where it isn't the literal legally adopted code text \u2014 a design that fails to meet 62.1 rates without justification is, in practice, treated as under-ventilated by almost any reviewing authority.\"\n          ]\n        },\n        {\n          title:\"ASHRAE 90.1 and Where Energy Codes Come From\",\n          summary:\"The efficiency baseline that most building energy codes are written against, directly or indirectly.\",\n          body:[\n            \"ASHRAE Standard 90.1, Energy Standard for Buildings Except Low-Rise Residential Buildings, sets minimum energy-efficiency requirements covering a building's envelope, lighting, and mechanical systems together \u2014 insulation levels, equipment efficiency minimums, duct and pipe insulation, and control requirements like economizers and demand-controlled ventilation above certain thresholds all trace back to provisions in this standard.\",\n            \"Like 62.1, many jurisdictions' energy codes are built directly on top of 90.1, either adopting it wholesale or amending specific sections to be more stringent for local climate or policy reasons, which makes 90.1 the practical reference point for what counts as a minimally code-compliant building's energy performance, even in places where the locally enacted code carries a different name.\"\n          ]\n        }\n      ]\n    },\n    {\n      id:'safety', label:'Safety', color:'#D65B4A',\n      notes:[\n        {\n          title:\"Refrigerant Safety Classifications: A/B and 1/2/3\",\n          summary:\"A two-part code that tells you how toxic a refrigerant is and how easily it burns.\",\n          body:[\n            \"Refrigerants are classified under a two-character system: a letter for toxicity and a number for flammability. Class A refrigerants show low toxicity at normal exposure levels; Class B refrigerants show evidence of toxicity at lower concentrations, requiring more caution around leaks and confined spaces. On the flammability side, Class 1 refrigerants don't propagate flame at all under standard test conditions, Class 2 (and the lower-flammability subclass 2L) ignite but burn relatively slowly with a lower heat of combustion, and Class 3 refrigerants are highly flammable.\",\n            \"A refrigerant labeled A1, for instance, is both low-toxicity and non-flammable, while an A2L refrigerant \u2014 increasingly common as the industry shifts toward lower-global-warming-potential refrigerants \u2014 is low-toxicity but mildly flammable, which brings additional requirements around leak detection, ventilation, and equipment design that A1 refrigerants didn't need. Knowing a refrigerant's classification is the starting point for the ventilation, quantity limits, and equipment room requirements that apply to the system using it.\"\n          ]\n        },\n        {\n          title:\"Legionella Risk in Cooling Towers\",\n          summary:\"Warm, stagnant water and a fine mist are exactly the conditions Legionella bacteria thrive in.\",\n          body:[\n            \"Cooling towers reject heat by evaporating a portion of their circulating water into the atmosphere, and in doing so they generate a fine mist \u2014 exactly the mechanism by which Legionella bacteria, if present in the water, can become airborne and be inhaled, potentially causing Legionnaires' disease. The warm water temperatures typical of a cooling tower's operating range sit squarely within the range where Legionella multiplies most readily, which is what makes towers a recognized risk point rather than an unusual one.\",\n            \"Managing that risk centers on water treatment (biocides and regular disinfection), keeping the tower and its basin clean of the scale and biofilm that shelter bacteria from treatment, and maintaining a documented water management plan with regular testing \u2014 particularly after any period the tower has sat idle, since stagnant water significantly raises the risk before the system is brought back into active service.\"\n          ]\n        },\n        {\n          title:\"Confined Space Hazards in HVAC Mechanical Rooms\",\n          summary:\"Not every mechanical room is a confined space \u2014 but the ones that are demand a different level of caution entirely.\",\n          body:[\n            \"A confined space is broadly defined as an area large enough to enter and work in, with limited entry or exit, that isn't designed for continuous occupancy \u2014 some HVAC equipment rooms, pits, tanks, and duct interiors meet this definition, and a subset are further classified as permit-required confined spaces if they can contain a hazardous atmosphere, engulfment risk, or other serious hazard. Refrigerant leaks are a specific and relevant risk in enclosed mechanical spaces: many refrigerants are heavier than air and can displace oxygen in a confined area without any obvious smell or visible sign.\",\n            \"Entering a permit-required confined space calls for atmospheric testing before entry, continuous monitoring, ventilation, and a trained attendant outside the space at minimum \u2014 treating every mechanical room the same as an open, freely ventilated workspace is exactly the assumption that confined-space procedures exist to override, since the hazard often isn't obvious from a doorway glance.\"\n          ]\n        }\n      ]\n    }\n  ];\n\n  var totalNotes = DATA.reduce(function(sum, cat){ return sum + cat.notes.length; }, 0);\n  document.getElementById('metaNoteCount').textContent = totalNotes;\n  document.getElementById('metaCatCount').textContent = DATA.length;\n\n  function wordCount(paras){\n    return paras.join(' ').trim().split(/\\s+/).length;\n  }\n  function readTime(paras){\n    var words = wordCount(paras);\n    var mins = Math.max(1, Math.round(words / 200));\n    return mins + ' min read';\n  }\n\n  var activeCategory = 'all';\n  var searchTerm = '';\n\n  // ---- build damper row ----\n  var damperRow = document.getElementById('damperRow');\n  function makeDamper(id, label, count, isAll){\n    var btn = document.createElement('button');\n    btn.type = 'button';\n    btn.className = 'damper-btn' + (isAll ? ' is-all' : '');\n    btn.setAttribute('aria-pressed', String(id === activeCategory));\n    btn.dataset.cat = id;\n\n    var drop = document.createElement('div'); drop.className = 'drop';\n    var dm = document.createElement('div'); dm.className = 'damper';\n    var blade = document.createElement('div'); blade.className = 'blade';\n    dm.appendChild(blade);\n    var name = document.createElement('div'); name.className = 'damper-name'; name.textContent = label;\n    var cnt = document.createElement('div'); cnt.className = 'damper-count'; cnt.textContent = count + (count===1?' note':' notes');\n\n    btn.appendChild(drop); btn.appendChild(dm); btn.appendChild(name); btn.appendChild(cnt);\n    btn.addEventListener('click', function(){\n      activeCategory = id;\n      render();\n    });\n    return btn;\n  }\n  function renderDampers(){\n    damperRow.innerHTML = '';\n    damperRow.appendChild(makeDamper('all', 'All Subjects', totalNotes, true));\n    DATA.forEach(function(cat){\n      damperRow.appendChild(makeDamper(cat.id, cat.label, cat.notes.length, false));\n    });\n  }\n\n  // ---- build note card ----\n  function makeCard(cat, note){\n    var card = document.createElement('div');\n    card.className = 'note-card';\n    card.style.borderLeftColor = cat.color;\n\n    var head = document.createElement('button');\n    head.type = 'button';\n    head.className = 'note-head';\n    head.setAttribute('aria-expanded', 'false');\n\n    var top = document.createElement('div'); top.className = 'note-toprow';\n    var tag = document.createElement('span'); tag.className = 'note-tag'; tag.textContent = cat.label; tag.style.color = cat.color;\n    var time = document.createElement('span'); time.className = 'note-time'; time.textContent = readTime(note.body);\n    top.appendChild(tag); top.appendChild(time);\n\n    var title = document.createElement('h3'); title.className = 'note-title'; title.textContent = note.title;\n    var summary = document.createElement('p'); summary.className = 'note-summary'; summary.textContent = note.summary;\n\n    var hint = document.createElement('div'); hint.className = 'note-toggle-hint';\n    hint.innerHTML = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>';\n    var hintText = document.createTextNode('Read note');\n    hint.appendChild(hintText);\n\n    head.appendChild(top); head.appendChild(title); head.appendChild(summary); head.appendChild(hint);\n\n    var body = document.createElement('div'); body.className = 'note-body';\n    var bodyInner = document.createElement('div'); bodyInner.className = 'note-body-inner';\n    note.body.forEach(function(paraText){\n      var p = document.createElement('p');\n      p.textContent = paraText;\n      bodyInner.appendChild(p);\n    });\n    body.appendChild(bodyInner);\n\n    head.addEventListener('click', function(){\n      var isOpen = card.classList.toggle('open');\n      head.setAttribute('aria-expanded', String(isOpen));\n      hint.replaceChild(document.createTextNode(isOpen ? 'Collapse' : 'Read note'), hint.lastChild);\n    });\n\n    card.appendChild(head);\n    card.appendChild(body);\n    return card;\n  }\n\n  function matchesSearch(note){\n    if(!searchTerm) return true;\n    var haystack = (note.title + ' ' + note.summary + ' ' + note.body.join(' ')).toLowerCase();\n    return haystack.indexOf(searchTerm) !== -1;\n  }\n\n  function render(){\n    // update damper pressed states\n    Array.prototype.forEach.call(damperRow.children, function(btn){\n      btn.setAttribute('aria-pressed', String(btn.dataset.cat === activeCategory));\n    });\n\n    var sectionsEl = document.getElementById('noteSections');\n    sectionsEl.innerHTML = '';\n    var shown = 0;\n\n    var catsToShow = DATA.filter(function(cat){ return activeCategory === 'all' || activeCategory === cat.id; });\n\n    catsToShow.forEach(function(cat){\n      var visibleNotes = cat.notes.filter(matchesSearch);\n      if(visibleNotes.length === 0) return;\n      shown += visibleNotes.length;\n\n      var section = document.createElement('section');\n      section.className = 'catsection';\n\n      var head = document.createElement('div'); head.className = 'catsection-head';\n      var dot = document.createElement('span'); dot.className = 'catdot'; dot.style.background = cat.color;\n      var h2 = document.createElement('h2'); h2.textContent = cat.label;\n      var count = document.createElement('span'); count.className = 'catcount'; count.textContent = visibleNotes.length + (visibleNotes.length===1?' note':' notes');\n      head.appendChild(dot); head.appendChild(h2); head.appendChild(count);\n\n      var grid = document.createElement('div'); grid.className = 'grid';\n      visibleNotes.forEach(function(note){ grid.appendChild(makeCard(cat, note)); });\n\n      section.appendChild(head);\n      section.appendChild(grid);\n      sectionsEl.appendChild(section);\n    });\n\n    if(shown === 0){\n      var empty = document.createElement('div');\n      empty.className = 'empty-state';\n      empty.textContent = 'No notes match that search. Try a different term, or reset filters below.';\n      sectionsEl.appendChild(empty);\n    }\n\n    document.getElementById('resultsCount').textContent = 'Showing ' + shown + ' of ' + totalNotes + ' notes';\n  }\n\n  document.getElementById('searchInput').addEventListener('input', function(e){\n    searchTerm = e.target.value.trim().toLowerCase();\n    render();\n  });\n  document.getElementById('clearFilters').addEventListener('click', function(){\n    activeCategory = 'all';\n    searchTerm = '';\n    document.getElementById('searchInput').value = '';\n    render();\n  });\n\n  renderDampers();\n  render();\n})();\n<\/script>\n\n</body>\n</html>\n";
} catch(e) { console.error("app.js module #5 error:", e); }
try {
document.addEventListener('DOMContentLoaded', function(){
var catSelect = document.getElementById('hvacNoteCatSelect');
var newCatWrap = document.getElementById('hvacNoteNewCatWrap');
if(!catSelect) return;
catSelect.addEventListener('change', function(){
newCatWrap.style.display = (this.value === '__new__') ? '' : 'none';
});
function jsEscape(s){
    return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');

  }



  document.getElementById('hvacNoteGenBtn').addEventListener('click', function(){

    var title = document.getElementById('hvacNoteTitle').value.trim();

    var summary = document.getElementById('hvacNoteSummary').value.trim();

    var bodyLines = document.getElementById('hvacNoteBody').value.split('\n').map(function(l){return l.trim();}).filter(Boolean);

    var cat = catSelect.value;

    var newCat = document.getElementById('hvacNoteNewCat').value.trim();



    var out = document.getElementById('hvacNoteOutput');

    if(!title || !summary || bodyLines.length===0){

      out.value = 'Fill in title, summary, and at least one body paragraph first.';

      return;

    }



    var noteObj = '        {\n          title:"'+jsEscape(title)+'",\n          summary:"'+jsEscape(summary)+'",\n          body:[\n'

      + bodyLines.map(function(l){ return '            "'+jsEscape(l)+'"'; }).join(',\n')

      + '\n          ]\n        }';



    if(cat === '__new__' && newCat){

      var slug = newCat.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

      out.value = '// New subject block — add this as a new entry in the DATA array (top level, alongside "psychrometrics" etc.):\n'

+ '    {\n      id:\''+slug+'\', label:\''+jsEscape(newCat)+'\', color:\'#5AA9D6\',\n      notes:[\n'+noteObj+'\n      ]\n    }';
} else {
out.value = '// Paste this inside the "'+cat+'" subject\'s notes:[ ... ] array, as a new item:\n' + noteObj + ',';
}
});
document.getElementById('hvacNoteCopyBtn').addEventListener('click', function(){
var out = document.getElementById('hvacNoteOutput');
var statusEl = document.getElementById('hvacNoteCopyStatus');
if(!out.value){ statusEl.textContent = 'Generate the code first.'; return; }
out.select();
navigator.clipboard.writeText(out.value).then(function(){
statusEl.textContent = 'Copied — paste it into the DATA array in the Notes page source.';
}).catch(function(){
statusEl.textContent = "Couldn't auto-copy — the text is selected, use Ctrl/Cmd+C.";
});
});
var hvacFrame = document.getElementById('hvacNotesFrame');
if(hvacFrame) hvacFrame.srcdoc = HVAC_NOTES_HTML;
});
} catch(e) { console.error("app.js module #6 error:", e); }
try {
var AUTO_NOTES_HTML = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Automation Learning Notes \u2014 Theory &amp; Reference</title>\n<link rel=\"icon\" type=\"image/svg+xml\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='5' fill='%230F1512'/%3E%3Crect x='9' y='9' width='14' height='14' rx='2' fill='none' stroke='%234FD68C' stroke-width='2'/%3E%3Ccircle cx='16' cy='16' r='2.6' fill='%234FD68C'/%3E%3C/svg%3E\">\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n<style>\n  :root{\n    --panel:#0F1512; --panel-2:#161F1B; --panel-3:#1E2A24;\n    --grid-line: rgba(79,214,140,.07);\n    --led:#4FD68C; --led-dim:#2E7A56;\n    --vellum:#F6F1E4; --vellum-2:#EFE8D4; --vellum-line:#DCD2B4;\n    --ink:#241F14; --ink-dim:#6B6250; --ink-faint:#9A9078;\n    --paper-text:#D6E4DC; --paper-text-dim:#8CA599;\n    --fault:#D6704A;\n    --font-display:\"Chakra Petch\",-apple-system,sans-serif;\n    --font-body:\"Source Serif 4\",Georgia,serif;\n    --font-mono:\"IBM Plex Mono\",\"Cascadia Mono\",ui-monospace,monospace;\n  }\n  *{box-sizing:border-box;}\n  html{scroll-behavior:smooth;}\n  html,body{margin:0;background:var(--panel);color:var(--paper-text);font-family:var(--font-body);}\n  body{\n    background-image:\n      linear-gradient(var(--grid-line) 1px, transparent 1px),\n      linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);\n    background-size: 24px 24px;\n    background-color:var(--panel);\n  }\n  ::selection{background:rgba(79,214,140,.28);}\n  a{color:var(--led);}\n  .wrap{max-width:960px;margin:0 auto;padding:0 20px;}\n\n  :focus-visible{outline:2px solid var(--led); outline-offset:2px;}\n\n  /* ===== topbar ===== */\n  .topbar{position:sticky;top:0;z-index:40;background:rgba(15,21,18,.92);backdrop-filter:blur(6px);border-bottom:1px solid rgba(79,214,140,.20);}\n  .topbar-inner{max-width:960px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}\n  .brand{display:flex;align-items:center;gap:9px;font-family:var(--font-display);font-weight:700;font-size:15px;letter-spacing:.03em;color:#EAF3EC;text-decoration:none;text-transform:uppercase;}\n  .brand .dot{color:var(--led);font-size:14px;}\n  .searchbox{position:relative;flex:none;width:min(280px,60vw);}\n  .searchbox input{\n    width:100%;background:var(--panel-2);border:1px solid rgba(79,214,140,.24);border-radius:5px;\n    color:var(--paper-text);font-family:var(--font-mono);font-size:12.5px;padding:9px 12px 9px 30px;outline:none;\n  }\n  .searchbox input::placeholder{color:var(--paper-text-dim);}\n  .searchbox input:focus{border-color:var(--led);}\n  .searchbox svg{position:absolute;left:9px;top:50%;transform:translateY(-50%);width:14px;height:14px;color:var(--paper-text-dim);pointer-events:none;}\n\n  /* ===== hero ===== */\n  .hero{padding:56px 0 8px;}\n  .eyebrow{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--led);margin-bottom:14px;}\n  h1{font-family:var(--font-display);font-size:clamp(28px,5vw,44px);line-height:1.14;font-weight:700;color:#EAF3EC;margin:0 0 16px;letter-spacing:-.01em;max-width:17ch;text-transform:uppercase;}\n  .hero-sub{font-family:var(--font-body);font-size:16px;line-height:1.65;color:var(--paper-text-dim);max-width:56ch;margin:0 0 22px;}\n  .hero-meta{display:flex;gap:22px;flex-wrap:wrap;padding-top:18px;border-top:1px solid rgba(79,214,140,.16);}\n  .hero-meta .m{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);}\n  .hero-meta .m b{display:block;color:#EAF3EC;font-size:19px;font-family:var(--font-display);font-weight:600;margin-bottom:2px;}\n\n  /* ===== filter board (I/O indicator rack) ===== */\n  .board{margin:44px 0 6px;}\n  .board-label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper-text-dim);margin-bottom:18px;}\n  .board-label b{color:var(--led);font-weight:600;}\n  .sld{background:var(--panel-2);border:1px solid rgba(79,214,140,.18);border-radius:8px;padding:22px 22px 18px;overflow-x:auto;}\n  .bus-row{position:relative;height:2px;background:linear-gradient(90deg, transparent, var(--led-dim) 4%, var(--led-dim) 96%, transparent);margin:0 6px 0;min-width:640px;}\n  .relays{display:flex;min-width:640px;padding-top:0;}\n  .relay-btn{\n    flex:1;min-width:64px;background:none;border:none;cursor:pointer;padding:0 4px 4px;\n    display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--paper-text-dim);\n  }\n  .drop{width:2px;height:16px;background:var(--led-dim);}\n  .relay{\n    width:22px;height:22px;border:2px solid var(--led-dim);border-radius:4px;position:relative;background:var(--panel);\n    display:flex;align-items:center;justify-content:center;transition:border-color .15s ease, box-shadow .15s ease;\n  }\n  .relay .lamp{width:8px;height:8px;border-radius:50%;background:var(--led-dim);transition:background .18s ease, box-shadow .18s ease;}\n  .relay-btn[aria-pressed=\"true\"] .relay{border-color:var(--led);box-shadow:0 0 10px rgba(79,214,140,.45);}\n  .relay-btn[aria-pressed=\"true\"] .relay .lamp{background:var(--led);box-shadow:0 0 6px rgba(79,214,140,.9);}\n  .relay-btn.is-all[aria-pressed=\"true\"] .relay{border-color:#A8EFC7;box-shadow:0 0 10px rgba(168,239,199,.45);}\n  .relay-btn.is-all[aria-pressed=\"true\"] .relay .lamp{background:#A8EFC7;}\n  .relay-name{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.03em;text-transform:uppercase;text-align:center;line-height:1.35;}\n  .relay-count{font-family:var(--font-mono);font-size:9px;color:var(--paper-text-dim);opacity:.8;}\n  .relay-btn:hover .relay-name{color:#EAF3EC;}\n  .relay-btn:hover .relay{border-color:var(--led);}\n\n  /* ===== results meta ===== */\n  .results-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:26px 0 6px;font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);flex-wrap:wrap;}\n  .results-meta .clear{background:none;border:1px solid rgba(79,214,140,.32);color:var(--led);border-radius:4px;padding:5px 10px;cursor:pointer;font-family:var(--font-mono);font-size:10.5px;}\n  .results-meta .clear:hover{background:rgba(79,214,140,.1);}\n\n  /* ===== category sections ===== */\n  .catsection{margin-top:38px;}\n  .catsection-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}\n  .catdot{width:9px;height:9px;border-radius:50%;flex:none;}\n  .catsection-head h2{font-family:var(--font-display);font-size:15px;font-weight:600;color:#EAF3EC;margin:0;letter-spacing:.01em;text-transform:uppercase;}\n  .catsection-head .catcount{font-family:var(--font-mono);font-size:10.5px;color:var(--paper-text-dim);}\n\n  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;}\n\n  .note-card{\n    background:var(--vellum);border-radius:6px;border-left:4px solid var(--led);\n    box-shadow:0 2px 10px rgba(0,0,0,.30);overflow:hidden;\n  }\n  .note-head{\n    width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:14px 15px 12px;\n    display:flex;flex-direction:column;gap:8px;font-family:inherit;color:inherit;\n  }\n  .note-toprow{display:flex;justify-content:space-between;align-items:center;gap:8px;}\n  .note-tag{font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;}\n  .note-time{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);white-space:nowrap;}\n  .note-title{font-family:var(--font-display);font-size:14.5px;font-weight:600;color:var(--ink);line-height:1.35;margin:0;}\n  .note-summary{font-family:var(--font-body);font-size:12.5px;color:var(--ink-dim);line-height:1.55;margin:0;}\n  .note-toggle-hint{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);display:flex;align-items:center;gap:5px;margin-top:2px;}\n  .note-toggle-hint svg{width:9px;height:9px;transition:transform .15s ease;}\n  .note-card.open .note-toggle-hint svg{transform:rotate(180deg);}\n  .note-body{max-height:0;overflow:hidden;transition:max-height .28s ease;}\n  .note-card.open .note-body{max-height:900px;}\n  .note-body-inner{padding:0 15px 16px;border-top:1px solid var(--vellum-line);margin-top:2px;}\n  .note-body-inner p{font-family:var(--font-body);font-size:13px;line-height:1.7;color:var(--ink);margin:12px 0 0;}\n  .note-body-inner p:first-child{margin-top:14px;}\n\n  @media (prefers-reduced-motion: reduce){\n    html{scroll-behavior:auto;}\n    .note-body, .relay, .note-card.open .note-toggle-hint svg{transition:none;}\n  }\n\n  .empty-state{\n    grid-column:1/-1;font-family:var(--font-mono);font-size:12px;color:var(--paper-text-dim);\n    border:1px dashed rgba(79,214,140,.28);border-radius:6px;padding:26px;text-align:center;\n  }\n\n  footer{margin:70px 0 40px;padding-top:22px;border-top:1px solid rgba(79,214,140,.18);}\n  .foot-note{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);line-height:1.7;max-width:64ch;}\n  .foot-mark{font-family:var(--font-mono);font-size:10px;color:var(--led-dim);margin-top:16px;}\n\n  @media (max-width:560px){\n    .relay-btn{min-width:52px;}\n    .relay-name{font-size:8.5px;}\n    .sld{padding:18px 14px 14px;}\n  }\n</style>\n</head>\n<body>\n\n<div class=\"topbar\">\n  <div class=\"topbar-inner\">\n    <a class=\"brand\" href=\"#top\"><span class=\"dot\">\u25cf</span> AUTOMATION LEARNING NOTES</a>\n    <div class=\"searchbox\">\n      <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"7\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n      <input type=\"text\" id=\"searchInput\" placeholder=\"Search notes\u2026\" autocomplete=\"off\">\n    </div>\n  </div>\n</div>\n\n<div class=\"wrap\" id=\"top\">\n  <div class=\"hero\">\n    <div class=\"eyebrow\">Personal reference \u00b7 theory only</div>\n    <h1>Notes on how control systems actually work.</h1>\n    <p class=\"hero-sub\">A running set of short, plain-language write-ups on core instrumentation, controls and automation concepts \u2014 how things work and why, not how to configure them. There are no calculators or design tools on this page, and nothing here is invented: every note covers established, textbook-level automation theory.</p>\n    <div class=\"hero-meta\">\n      <div class=\"m\"><b id=\"metaNoteCount\">0</b>notes</div>\n      <div class=\"m\"><b id=\"metaCatCount\">0</b>subjects</div>\n      <div class=\"m\"><b>0</b>calculators</div>\n    </div>\n  </div>\n\n  <div class=\"board\">\n    <div class=\"board-label\">Filter by subject \u2014 <b>energize a relay</b> to select that subject</div>\n    <div class=\"sld\">\n      <div class=\"bus-row\"></div>\n      <div class=\"relays\" id=\"relayRow\"></div>\n    </div>\n  </div>\n\n  <div class=\"results-meta\">\n    <span id=\"resultsCount\"></span>\n    <button class=\"clear\" id=\"clearFilters\" type=\"button\">Reset filters</button>\n  </div>\n\n  <main id=\"noteSections\"></main>\n\n  <footer>\n    <p class=\"foot-note\">These are summary explanations written for learning and quick reference \u2014 they're deliberately simplified and aren't a substitute for the current edition of the relevant standard (ISA, IEC, local electrical/process safety codes, etc.) or for a qualified engineer's judgement on a real installation. No content on this page is generated per-visit or personalized \u2014 what you read is what's written into the page.</p>\n    <div class=\"foot-mark\">\u2014 end of scan cycle \u2014</div>\n  </footer>\n</div>\n\n<script>\n(function(){\n\n  var DATA = [{\"id\": \"control-theory\", \"label\": \"Control Theory & Loops\", \"color\": \"#4FD68C\", \"notes\": [{\"title\": \"Open-Loop vs Closed-Loop Control\", \"summary\": \"The difference between commanding an output and actually checking whether it worked.\", \"body\": [\"An open-loop control applies a fixed action without ever checking the result \u2014 running a conveyor motor at a set speed regardless of actual belt speed is open-loop. It's simple and cheap, but it can't correct itself: any disturbance (load, friction, supply voltage) that the original calculation didn't account for just goes uncorrected.\", \"A closed-loop (feedback) control instead measures the actual process variable and continuously adjusts its output to close the gap against a setpoint. Almost all industrial process control is closed-loop for exactly this reason \u2014 a flow controller doesn't just open a valve to a calculated position, it watches the measured flow and keeps trimming the valve until the process actually reaches and holds the setpoint, compensating automatically for disturbances an open-loop calculation could never have predicted.\"]}, {\"title\": \"PID Control: What Each Term Actually Does\", \"summary\": \"Three separate correction strategies, added together, each fixing a different kind of error.\", \"body\": [\"The proportional (P) term reacts to the current error, producing an output correction sized directly to how far the process is from setpoint right now \u2014 more error, bigger correction. On its own, though, proportional control settles at a stable offset below setpoint under steady load, called droop or offset, because it needs some ongoing error to keep producing a non-zero output.\", \"The integral (I) term fixes exactly that problem by accumulating error over time and steadily increasing its correction as long as any error persists, eventually driving steady-state error to zero \u2014 at the cost of being slower to respond and prone to overshoot if it's too aggressive. The derivative (D) term reacts to how fast the error is changing, adding a correction that anticipates where the process is heading and helps dampen overshoot, though it's also the term most sensitive to measurement noise. Tuning a PID loop is really about balancing these three tendencies against each other for the specific process being controlled.\"]}, {\"title\": \"Why Control Loops Oscillate: Understanding Loop Tuning\", \"summary\": \"Too much correction can be worse than too little.\", \"body\": [\"A control loop tuned too aggressively \u2014 gains set too high \u2014 tends to overcorrect: it pushes past the setpoint, then has to correct back the other way, then overshoots again, producing a sustained oscillation instead of settling. A loop tuned too conservatively is stable but sluggish, taking far longer than necessary to recover from a disturbance or reach a new setpoint.\", \"Tuning methods like Ziegler-Nichols exist to find a workable middle ground systematically rather than by trial and error alone \u2014 typically by characterizing how the process responds to a step change (its process gain, time constant and dead time) and calculating starting gains from that response. Dead time is particularly important: the longer the delay between a control action and its visible effect on the process, the more conservative the tuning has to be, since the controller is effectively reacting to information that's already out of date by the time it arrives.\"]}]}, {\"id\": \"instrumentation\", \"label\": \"Signals & Instrumentation\", \"color\": \"#E2B93B\", \"notes\": [{\"title\": \"4-20mA Current Loops: Why Current, Not Voltage\", \"summary\": \"The industry standard analog signal was chosen specifically to survive long wire runs and noisy plants.\", \"body\": [\"A current signal stays the same value everywhere along a series circuit, regardless of wire resistance or length, because current in a series loop is identical at every point \u2014 a voltage signal, by contrast, drops along the wire due to resistance, so the value read at the far end depends on cable length and gauge. This is exactly why 4-20mA became the standard for field instrumentation: a transmitter hundreds of metres from its receiving instrument delivers the same signal a nearby one would, something a voltage signal can't reliably do without extra compensation.\", \"Current loops are also inherently less susceptible to electrical noise than voltage signals, since induced noise tends to appear as a voltage that a current-sensing receiver largely rejects. The trade-off is that current loops need a complete series circuit and a loop power supply, and troubleshooting them requires breaking into the loop to measure current directly, rather than simply probing across two points the way a voltage signal allows.\"]}, {\"title\": \"Transmitters vs Transducers: What's the Difference\", \"summary\": \"Two terms often used loosely that actually describe two different jobs.\", \"body\": [\"A transducer converts one form of energy or signal into another \u2014 a pressure transducer converts mechanical pressure into an electrical signal, a thermocouple converts temperature into a small voltage. The term is broad and covers the basic sensing element itself, often producing a raw, low-level, or non-standardized signal.\", \"A transmitter takes that sensed value and conditions it into a standardized signal \u2014 typically 4-20mA, a digital fieldbus signal, or a specific voltage range \u2014 suitable for transmission over distance to a control system. In practice, a transmitter usually contains a transducer or sensing element internally, plus the electronics to amplify, linearize, and standardize its output; calling a complete field instrument a \u201ctransducer\u201d isn't always wrong, but \u201ctransmitter\u201d is the more precise term for a device whose whole purpose is delivering a standardized signal back to the control system.\"]}, {\"title\": \"Live Zero and Why 4mA, Not 0mA\", \"summary\": \"Starting the signal range above zero turns \u201cno signal\u201d into a detectable fault instead of a plausible reading.\", \"body\": [\"A 4-20mA loop deliberately starts its range at 4mA rather than 0mA, so the bottom of the measured range (say, 0\u00b0C or 0 bar) still corresponds to a real, nonzero current. This is called live zero, and it means a broken wire, a disconnected transmitter, or a loop power failure produces 0mA \u2014 a value the receiving instrument can immediately recognize as invalid, distinct from a genuine low reading at the bottom of the range.\", \"Without live zero, a wire break would read identically to a legitimate zero-value measurement, and a control system would have no way to distinguish \u201cthe tank is genuinely empty\u201d from \u201cthe level transmitter's wire fell off\u201d \u2014 a distinction that matters enormously for safety-relevant measurements. This is also why most control systems flag any reading below roughly 3.5-4mA as a fault condition rather than a valid process value.\"]}]}, {\"id\": \"plc-logic\", \"label\": \"PLC & Logic\", \"color\": \"#6E93C7\", \"notes\": [{\"title\": \"The PLC Scan Cycle: Input, Logic, Output, Repeat\", \"summary\": \"A PLC isn't running your logic continuously \u2014 it's running it in a tight, repeating loop.\", \"body\": [\"A programmable logic controller executes its program in a repeating scan cycle: it first reads all its physical inputs into an internal memory table, then executes the entire user logic program using that snapshot of input values (not the live, possibly-changing physical inputs), and finally writes the resulting output values out to the physical outputs all at once. Only after all three steps complete does the cycle repeat, typically many times per second.\", \"This structure is exactly why a PLC's scan time matters: an input that changes and changes back faster than one scan cycle can be missed entirely, since the logic only ever sees the input value that was latched at the start of that particular scan. It's also why PLC logic reliably avoids certain race conditions that can plague code executing asynchronously \u2014 within a single scan, every rung of logic sees a consistent, unchanging picture of all inputs, no matter how many rungs reference the same input.\"]}, {\"title\": \"Ladder Logic: Why Automation Still Speaks in Relays\", \"summary\": \"A programming language deliberately designed to look like the hardware it replaced.\", \"body\": [\"Ladder logic represents a control program as a series of horizontal \u201crungs,\u201d each containing a combination of contacts (conditions) that, when satisfied, energize a coil (an output) \u2014 visually and conceptually mirroring the relay-based control panels ladder logic was designed to replace. This wasn't an accident: when PLCs were first introduced, ladder logic let electricians and technicians already fluent in reading relay schematics transition to programmable control without learning a fundamentally new representation.\", \"That legacy is exactly why ladder logic remains dominant in industrial control decades later, even though more conventional programming languages are also available on modern PLCs \u2014 it maps directly onto the physical wiring diagrams maintenance staff already use for troubleshooting, and a rung of contacts and a coil is often easier to trace on a live system with a meter in hand than an equivalent block of structured text would be.\"]}, {\"title\": \"Discrete vs Analog I/O\", \"summary\": \"Two fundamentally different kinds of information a control system has to handle side by side.\", \"body\": [\"Discrete (or digital) I/O carries a simple on/off state \u2014 a limit switch, a motor run status, a start pushbutton \u2014 represented internally as a single bit that's either 1 or 0. Analog I/O instead carries a continuously variable value across a range, such as a 4-20mA signal representing tank level or temperature, and requires an analog-to-digital converter on input (or digital-to-analog on output) to translate between the physical signal and the numeric value the PLC's logic actually works with.\", \"A control system's I/O count and mix \u2014 how many discrete points versus how many analog channels \u2014 is set largely by what the process actually needs to sense and actuate, and getting this wrong at the design stage is expensive to fix later: discrete-only I/O can't represent a continuously varying process value, while provisioning analog channels for what turn out to be simple on/off signals wastes cost and I/O card space that could have gone to genuinely analog points.\"]}]}, {\"id\": \"networks\", \"label\": \"Networks & Communication\", \"color\": \"#B08CD6\", \"notes\": [{\"title\": \"Fieldbus vs Point-to-Point Wiring\", \"summary\": \"One wire carrying many signals instead of one wire per signal.\", \"body\": [\"Traditional point-to-point (or \u201chome run\u201d) wiring runs a dedicated pair of wires from every single field device back to the control system, which is straightforward to understand and troubleshoot but scales poorly \u2014 wiring, conduit and I/O card costs grow linearly with every additional instrument. A fieldbus instead lets many devices share a single communication cable, each device digitally addressing its own data onto that shared bus rather than needing its own dedicated wire run.\", \"The trade-off is complexity: a fieldbus network needs its own configuration, addressing, and diagnostic tools, and a fault on the shared bus can potentially affect multiple devices at once rather than just one, unlike a point-to-point wiring fault that's isolated to a single instrument. Fieldbus adoption has grown steadily anyway, because the wiring and installation savings on projects with large instrument counts routinely outweigh the added complexity, especially over longer cable runs or in retrofit projects where pulling new home-run wiring is expensive or physically difficult.\"]}, {\"title\": \"Modbus: The Protocol That Wouldn't Die\", \"summary\": \"A communication protocol from 1979 that's still one of the most common in industrial automation today.\", \"body\": [\"Modbus defines a simple request-response messaging structure for reading and writing data between a controlling device (a master or client) and field devices (slaves or servers) \u2014 organized around basic data types like coils (single-bit outputs), discrete inputs, and registers (16-bit values) that map cleanly onto common PLC and instrument data. Its simplicity is exactly what's kept it relevant: the protocol is straightforward enough that implementing Modbus support in even fairly simple, inexpensive devices is easy and cheap.\", \"Modbus exists in two common physical forms \u2014 Modbus RTU over a serial RS-485 connection, and Modbus TCP over standard Ethernet \u2014 which is part of why it's remained so widely supported even as newer, more capable protocols have emerged: it's simple enough to bridge into almost any newer system, and a huge installed base of existing equipment already speaks it, making it a de facto lowest-common-denominator standard for connecting equipment from different manufacturers and different eras.\"]}, {\"title\": \"Determinism in Industrial Networks\", \"summary\": \"Why some control networks guarantee exactly when data arrives, and why that guarantee matters.\", \"body\": [\"A deterministic network guarantees that data will arrive within a known, bounded time \u2014 not just eventually, but within a predictable window every single cycle. Standard office Ethernet, by contrast, is inherently non-deterministic: if two devices try to transmit at the same moment, a collision can occur and the data has to be retransmitted, introducing variable delay that's unpredictable in the worst case.\", \"For most industrial data \u2014 alarms, trend logging, operator displays \u2014 that variability doesn't matter much. But for a fast motion-control loop synchronizing multiple axes, even a few milliseconds of unpredictable delay can throw the whole system out of sync, which is exactly why real-time industrial Ethernet variants (EtherCAT, PROFINET IRT, and similar) were developed \u2014 they modify standard Ethernet's timing behavior specifically to guarantee the deterministic, bounded delivery time that motion control and other fast, tightly coordinated processes actually require.\"]}]}, {\"id\": \"final-control\", \"label\": \"Valves & Final Control Elements\", \"color\": \"#5AA9D6\", \"notes\": [{\"title\": \"Control Valve Characteristics: Linear, Equal Percentage and Quick Opening\", \"summary\": \"How a valve's flow changes as it opens isn't the same shape for every valve, on purpose.\", \"body\": [\"A valve's inherent characteristic describes the relationship between valve travel (how far open it is) and the flow it passes, at a constant pressure drop. A linear characteristic produces flow directly proportional to travel \u2014 open it halfway, get half the flow. A quick-opening characteristic delivers most of its flow capacity in the first part of travel, useful for on/off-style applications where full flow needs to be reached quickly.\", \"An equal-percentage characteristic instead produces flow that changes by an equal percentage for equal increments of travel \u2014 small changes near the closed position produce small flow changes, while the same size change near full open produces a much larger flow change. This is deliberately chosen for many process control applications because it tends to compensate for a system where available pressure drop across the valve changes with flow, keeping the valve's effective control response more consistent across its whole operating range than a linear valve would achieve in the same system.\"]}, {\"title\": \"Actuators: Pneumatic, Electric and Hydraulic Trade-offs\", \"summary\": \"Three ways to turn a control signal into physical valve movement, each suited to a different situation.\", \"body\": [\"Pneumatic actuators use compressed air against a diaphragm or piston to move a valve, offering fast response, simple fail-safe behavior (a spring can return the valve to a safe position if air pressure is lost), and inherent safety in hazardous atmospheres since there's no electrical spark risk at the actuator itself \u2014 the trade-off is needing a compressed air supply and, generally, somewhat lower positioning precision than electric actuation.\", \"Electric actuators use a motor to drive the valve stem, offering precise positioning and eliminating the need for a compressed air system, but generally responding more slowly than pneumatics and needing a defined behavior on power loss to be engineered in deliberately (since there's no natural spring-return-on-air-loss equivalent). Hydraulic actuators deliver the highest force output of the three, making them the choice for large valves or high-thrust applications, at the cost of needing a hydraulic power unit and being generally the most complex and maintenance-intensive of the three options.\"]}, {\"title\": \"Valve Positioners: Closing the Loop on the Valve Itself\", \"summary\": \"The control loop that makes sure the valve actually went where it was told to go.\", \"body\": [\"A control signal sent to a valve actuator is a command for a target position, but friction, packing drag, and process forces acting on the valve can all cause the actual valve position to differ from that commanded value, especially as the valve ages or the packing tightens. A positioner is a dedicated feedback device mounted on the valve that measures actual stem position and adjusts the air (or electric) signal to the actuator until measured position matches the commanded signal \u2014 essentially its own small, fast control loop wrapped around the valve.\", \"Without a positioner, a valve is relying purely on open-loop actuator force to reach and hold a position, which drifts more and more as mechanical wear accumulates. With one, the main process control loop can trust that a given output signal reliably produces the same physical valve position every time, which matters enormously for control loop stability \u2014 an inconsistent valve response is one of the most common hidden causes of a process loop that seems impossible to tune well.\"]}]}, {\"id\": \"safety-interlocks\", \"label\": \"Safety & Interlocks\", \"color\": \"#D65B4A\", \"notes\": [{\"title\": \"Safety Instrumented Systems: A Layer Separate From Regular Control\", \"summary\": \"The system that steps in specifically when the normal control system has already failed to prevent a hazard.\", \"body\": [\"A safety instrumented system (SIS) is a dedicated layer of sensors, logic solvers, and final elements built and maintained separately from the basic process control system (BPCS), with the specific job of detecting a hazardous condition and driving the process to a safe state \u2014 shutting down a reactor, closing an emergency isolation valve \u2014 independent of whether the regular control system is functioning correctly. The separation is deliberate: if the SIS shared the same hardware and logic as everyday control, a fault that took down normal control could simultaneously disable the safety function meant to catch exactly that kind of failure.\", \"SIS design is governed by standards like IEC 61511, which define Safety Integrity Levels (SIL) \u2014 a measure of how reliably a safety function has to perform based on the severity and likelihood of the hazard it protects against. A higher SIL rating demands more rigorous design, more redundancy, and more frequent proof testing, which is why not every safety function in a plant is held to the same standard \u2014 the required rigor scales directly with the consequences of that specific function failing.\"]}, {\"title\": \"Fail-Safe Design: Deciding What a Valve Does When Power Is Lost\", \"summary\": \"Every actuated device needs an intentional answer to \u201cwhat happens if the signal just disappears.\u201d\", \"body\": [\"Fail-safe design means deliberately choosing what a device does in the absence of its control signal or power supply, rather than leaving that behavior to chance. A fail-closed valve is spring-loaded or otherwise designed to close automatically if it loses air or electrical signal, appropriate where an open valve on signal loss would be dangerous \u2014 feeding fuel to a burner, for instance. A fail-open valve does the reverse, appropriate where closing on signal loss would itself create the hazard, such as a cooling water valve that needs to stay open to prevent overheating.\", \"The correct choice isn't universal \u2014 it depends entirely on which failure mode is safer for that specific application \u2014 which is why fail-safe position is a deliberate specification decision made during process hazard analysis, not a default setting applied uniformly across every valve in a plant. Getting it backwards on even a single critical valve can turn a simple power outage into the exact hazardous event the safety system was meant to prevent.\"]}, {\"title\": \"Emergency Stops and the Categories Behind Them\", \"summary\": \"Not all emergency stops behave the same way once they're pressed.\", \"body\": [\"An emergency stop is meant to bring hazardous motion to a halt as quickly and reliably as possible, but how it actually removes power is standardized into stop categories. Category 0 removes power to the machine's actuators immediately and uncontrolled \u2014 an instant, uncontrolled stop, appropriate where stopping as fast as physically possible matters more than a controlled deceleration. Category 1 instead maintains power just long enough to bring the machine to a controlled stop (following a deceleration profile) before removing power, useful where an uncontrolled stop could itself create a hazard, such as an overhung load in an uncontrolled free-fall.\", \"A third category, Category 2, brings the machine to a controlled stop but leaves power available afterward rather than removing it \u2014 generally not used for emergency stop functions specifically, since leaving power present after an emergency stop is usually considered unsafe, but relevant to ordinary stop functions elsewhere in a machine's control scheme. Choosing the right stop category for a given hazard is a deliberate risk-assessment decision, not an arbitrary wiring choice.\"]}]}, {\"id\": \"standards\", \"label\": \"Standards & Practices\", \"color\": \"#B7A339\", \"notes\": [{\"title\": \"P&ID Symbols and ISA Tag Numbers\", \"summary\": \"A standardized shorthand that lets any trained engineer read any plant's process drawings.\", \"body\": [\"A Piping and Instrumentation Diagram (P&ID) uses a standardized set of symbols, largely defined by ISA-5.1, to represent instruments, valves, and control functions without needing a legend re-explained on every drawing \u2014 a circle represents a field-mounted instrument, a circle inside a square represents a shared-display instrument, and specific line styles distinguish process piping from electrical signal lines from pneumatic signal lines.\", \"Each instrument also carries a tag number built from standardized letter codes describing its function \u2014 the first letter identifies the measured variable (F for flow, T for temperature, P for pressure, L for level) and subsequent letters describe the instrument's function (I for indicator, C for controller, T for transmitter, V for valve). A tag like \u201cFIC-101\u201d reads directly as a flow indicating controller, loop number 101, without needing any further explanation \u2014 which is exactly the point of the standard, letting engineers unfamiliar with a specific plant still read its drawings correctly on sight.\"]}, {\"title\": \"IEC 61131-3: The Five Languages of PLC Programming\", \"summary\": \"One standard that keeps PLC programming portable across manufacturers, at least in principle.\", \"body\": [\"IEC 61131-3 defines five standardized programming languages for programmable controllers: Ladder Diagram (the relay-style rungs common in North American practice), Function Block Diagram (graphical blocks wired together, common in European process control), Structured Text (a Pascal-like textual language suited to complex math and logic), Instruction List (a low-level, assembly-like textual language, now largely deprecated), and Sequential Function Chart (a state-based language suited to representing sequential batch or startup/shutdown processes).\", \"The standard doesn't mandate any one language \u2014 it defines all five so that different tasks within the same project can use whichever language fits best, and so that engineers trained on the standard aren't locked into one manufacturer's proprietary programming approach. In practice, full portability between different PLC vendors' implementations is still imperfect, since vendors extend the standard with their own proprietary functions and hardware-specific instructions, but the shared language structure still means an engineer's programming skill transfers far more readily between platforms than it would without the standard.\"]}]}];\n\n  var totalNotes = DATA.reduce(function(sum, cat){ return sum + cat.notes.length; }, 0);\n  document.getElementById('metaNoteCount').textContent = totalNotes;\n  document.getElementById('metaCatCount').textContent = DATA.length;\n\n  function wordCount(paras){\n    return paras.join(' ').trim().split(/\\s+/).length;\n  }\n  function readTime(paras){\n    var words = wordCount(paras);\n    var mins = Math.max(1, Math.round(words / 200));\n    return mins + ' min read';\n  }\n\n  var activeCategory = 'all';\n  var searchTerm = '';\n\n  // ---- build relay row ----\n  var relayRow = document.getElementById('relayRow');\n  function makeRelay(id, label, count, isAll){\n    var btn = document.createElement('button');\n    btn.type = 'button';\n    btn.className = 'relay-btn' + (isAll ? ' is-all' : '');\n    btn.setAttribute('aria-pressed', String(id === activeCategory));\n    btn.dataset.cat = id;\n\n    var drop = document.createElement('div'); drop.className = 'drop';\n    var rl = document.createElement('div'); rl.className = 'relay';\n    var lamp = document.createElement('div'); lamp.className = 'lamp';\n    rl.appendChild(lamp);\n    var name = document.createElement('div'); name.className = 'relay-name'; name.textContent = label;\n    var cnt = document.createElement('div'); cnt.className = 'relay-count'; cnt.textContent = count + (count===1?' note':' notes');\n\n    btn.appendChild(drop); btn.appendChild(rl); btn.appendChild(name); btn.appendChild(cnt);\n    btn.addEventListener('click', function(){\n      activeCategory = id;\n      render();\n    });\n    return btn;\n  }\n  function renderRelays(){\n    relayRow.innerHTML = '';\n    relayRow.appendChild(makeRelay('all', 'All Subjects', totalNotes, true));\n    DATA.forEach(function(cat){\n      relayRow.appendChild(makeRelay(cat.id, cat.label, cat.notes.length, false));\n    });\n  }\n\n  // ---- build note card ----\n  function makeCard(cat, note){\n    var card = document.createElement('div');\n    card.className = 'note-card';\n    card.style.borderLeftColor = cat.color;\n\n    var head = document.createElement('button');\n    head.type = 'button';\n    head.className = 'note-head';\n    head.setAttribute('aria-expanded', 'false');\n\n    var top = document.createElement('div'); top.className = 'note-toprow';\n    var tag = document.createElement('span'); tag.className = 'note-tag'; tag.textContent = cat.label; tag.style.color = cat.color;\n    var time = document.createElement('span'); time.className = 'note-time'; time.textContent = readTime(note.body);\n    top.appendChild(tag); top.appendChild(time);\n\n    var title = document.createElement('h3'); title.className = 'note-title'; title.textContent = note.title;\n    var summary = document.createElement('p'); summary.className = 'note-summary'; summary.textContent = note.summary;\n\n    var hint = document.createElement('div'); hint.className = 'note-toggle-hint';\n    hint.innerHTML = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>';\n    var hintText = document.createTextNode('Read note');\n    hint.appendChild(hintText);\n\n    head.appendChild(top); head.appendChild(title); head.appendChild(summary); head.appendChild(hint);\n\n    var body = document.createElement('div'); body.className = 'note-body';\n    var bodyInner = document.createElement('div'); bodyInner.className = 'note-body-inner';\n    note.body.forEach(function(paraText){\n      var p = document.createElement('p');\n      p.textContent = paraText;\n      bodyInner.appendChild(p);\n    });\n    body.appendChild(bodyInner);\n\n    head.addEventListener('click', function(){\n      var isOpen = card.classList.toggle('open');\n      head.setAttribute('aria-expanded', String(isOpen));\n      hint.replaceChild(document.createTextNode(isOpen ? 'Collapse' : 'Read note'), hint.lastChild);\n    });\n\n    card.appendChild(head);\n    card.appendChild(body);\n    return card;\n  }\n\n  function matchesSearch(note){\n    if(!searchTerm) return true;\n    var haystack = (note.title + ' ' + note.summary + ' ' + note.body.join(' ')).toLowerCase();\n    return haystack.indexOf(searchTerm) !== -1;\n  }\n\n  function render(){\n    // update relay pressed states\n    Array.prototype.forEach.call(relayRow.children, function(btn){\n      btn.setAttribute('aria-pressed', String(btn.dataset.cat === activeCategory));\n    });\n\n    var sectionsEl = document.getElementById('noteSections');\n    sectionsEl.innerHTML = '';\n    var shown = 0;\n\n    var catsToShow = DATA.filter(function(cat){ return activeCategory === 'all' || activeCategory === cat.id; });\n\n    catsToShow.forEach(function(cat){\n      var visibleNotes = cat.notes.filter(matchesSearch);\n      if(visibleNotes.length === 0) return;\n      shown += visibleNotes.length;\n\n      var section = document.createElement('section');\n      section.className = 'catsection';\n\n      var head = document.createElement('div'); head.className = 'catsection-head';\n      var dot = document.createElement('span'); dot.className = 'catdot'; dot.style.background = cat.color;\n      var h2 = document.createElement('h2'); h2.textContent = cat.label;\n      var count = document.createElement('span'); count.className = 'catcount'; count.textContent = visibleNotes.length + (visibleNotes.length===1?' note':' notes');\n      head.appendChild(dot); head.appendChild(h2); head.appendChild(count);\n\n      var grid = document.createElement('div'); grid.className = 'grid';\n      visibleNotes.forEach(function(note){ grid.appendChild(makeCard(cat, note)); });\n\n      section.appendChild(head);\n      section.appendChild(grid);\n      sectionsEl.appendChild(section);\n    });\n\n    if(shown === 0){\n      var empty = document.createElement('div');\n      empty.className = 'empty-state';\n      empty.textContent = 'No notes match that search. Try a different term, or reset filters below.';\n      sectionsEl.appendChild(empty);\n    }\n\n    document.getElementById('resultsCount').textContent = 'Showing ' + shown + ' of ' + totalNotes + ' notes';\n  }\n\n  document.getElementById('searchInput').addEventListener('input', function(e){\n    searchTerm = e.target.value.trim().toLowerCase();\n    render();\n  });\n  document.getElementById('clearFilters').addEventListener('click', function(){\n    activeCategory = 'all';\n    searchTerm = '';\n    document.getElementById('searchInput').value = '';\n    render();\n  });\n\n  renderRelays();\n  render();\n})();\n<\/script>\n\n</body>\n</html>\n";
} catch(e) { console.error("app.js module #7 error:", e); }
try {
document.addEventListener('DOMContentLoaded', function(){
var catSelect = document.getElementById('autoNoteCatSelect');
var newCatWrap = document.getElementById('autoNoteNewCatWrap');
if(!catSelect) return;
catSelect.addEventListener('change', function(){
newCatWrap.style.display = (this.value === '__new__') ? '' : 'none';
});
function jsEscape(s){
    return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');

  }



  document.getElementById('autoNoteGenBtn').addEventListener('click', function(){

    var title = document.getElementById('autoNoteTitle').value.trim();

    var summary = document.getElementById('autoNoteSummary').value.trim();

    var bodyLines = document.getElementById('autoNoteBody').value.split('\n').map(function(l){return l.trim();}).filter(Boolean);

    var cat = catSelect.value;

    var newCat = document.getElementById('autoNoteNewCat').value.trim();



    var out = document.getElementById('autoNoteOutput');

    if(!title || !summary || bodyLines.length===0){

      out.value = 'Fill in title, summary, and at least one body paragraph first.';

      return;

    }



    var noteObj = '        {\n          title:"'+jsEscape(title)+'",\n          summary:"'+jsEscape(summary)+'",\n          body:[\n'

      + bodyLines.map(function(l){ return '            "'+jsEscape(l)+'"'; }).join(',\n')

      + '\n          ]\n        }';



    if(cat === '__new__' && newCat){

      var slug = newCat.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

      out.value = '// New subject block — add this as a new entry in the DATA array (top level, alongside "control-theory" etc.):\n'

+ '    {\n      id:\''+slug+'\', label:\''+jsEscape(newCat)+'\', color:\'#4FD68C\',\n      notes:[\n'+noteObj+'\n      ]\n    }';
} else {
out.value = '// Paste this inside the "'+cat+'" subject\'s notes:[ ... ] array, as a new item:\n' + noteObj + ',';
}
});
document.getElementById('autoNoteCopyBtn').addEventListener('click', function(){
var out = document.getElementById('autoNoteOutput');
var statusEl = document.getElementById('autoNoteCopyStatus');
if(!out.value){ statusEl.textContent = 'Generate the code first.'; return; }
out.select();
navigator.clipboard.writeText(out.value).then(function(){
statusEl.textContent = 'Copied — paste it into the DATA array in the Notes page source.';
}).catch(function(){
statusEl.textContent = "Couldn't auto-copy — the text is selected, use Ctrl/Cmd+C.";
});
});
var autoFrame = document.getElementById('autoNotesFrame');
if(autoFrame) autoFrame.srcdoc = AUTO_NOTES_HTML;
});
} catch(e) { console.error("app.js module #8 error:", e); }
try {
(function(){
var STD_BUSBAR_SIZES = [
[12,3],[15,3],[20,3],[20,5],[25,5],[30,5],[40,5],[40,10],[50,5],[50,10],
[60,6],[60,10],[80,6],[80,10],[100,8],[100,10],[120,10],[160,10]
];
function fmt(n,d){ if(!isFinite(n)) return (0).toFixed(d===undefined?2:d); return n.toFixed(d===undefined?2:d); }
var ENCLOSURE_DENSITY = { MS:7850, SS316:8000 };
function nextStandardBar(csaReq){
for(var i=0;i<STD_BUSBAR_SIZES.length;i++){
var w=STD_BUSBAR_SIZES[i][0], t=STD_BUSBAR_SIZES[i][1];
if(w*t>=csaReq) return {w:w,t:t,area:w*t};
}
var last = STD_BUSBAR_SIZES[STD_BUSBAR_SIZES.length-1];
return {w:last[0],t:last[1],area:last[0]*last[1]};
}
var chosenBar = {w:0,t:0,area:0};
function calcBusbarRating(){
var errCount = 0;
var inEl = document.getElementById('bzIn'), barsEl = document.getElementById('bzBars'), densEl = document.getElementById('bzDensity');
var In = parseFloat(inEl.value), bars = parseFloat(barsEl.value), density = parseFloat(densEl.value);
if(!(In>0)) errCount += fieldError(inEl,'Rated current must be greater than 0 A.')?1:0; else fieldError(inEl,null);
if(!(bars>0) || bars!==Math.round(bars)) errCount += fieldError(barsEl,'Bars per phase must be a whole number, 1 or more.')?1:0; else fieldError(barsEl,null);
if(!(density>0)) errCount += fieldError(densEl,'Current density must be greater than 0 A/mm².')?1:0; else fieldError(densEl,null);
var InSafe = In>0?In:0.0001, barsSafe = (bars>0&&bars===Math.round(bars))?bars:1, densSafe = density>0?density:1.2;
var csaReq = InSafe/densSafe;
var csaPerBar = csaReq/barsSafe;
chosenBar = nextStandardBar(csaPerBar);
document.getElementById('bzCsaReq').innerHTML = fmt(csaReq,1)+' <small>mm²</small>';
document.getElementById('bzStdSize').innerHTML = chosenBar.w+' × '+chosenBar.t+' <small>mm</small>';
var totalArea = chosenBar.area*barsSafe;
var actualDensity = InSafe/totalArea;
document.getElementById('bzCsaNote').textContent = barsSafe+' × '+chosenBar.w+'×'+chosenBar.t+'mm gives '+fmt(totalArea,0)+' mm² total ('+fmt(chosenBar.area,0)+' mm²/bar) — actual density '+fmt(actualDensity,2)+' A/mm².';
return errCount;
}
function calcScWithstand(){
var errCount = 0;
var ikEl = document.getElementById('bzIk'), tEl = document.getElementById('bzTime'), matEl = document.getElementById('bzMaterial'), ipEl = document.getElementById('bzIp');
var ik = parseFloat(ikEl.value), t = parseFloat(tEl.value), k = parseFloat(matEl.value), ip = parseFloat(ipEl.value);
if(!(ik>0)) errCount += fieldError(ikEl,'Enter Ik\'\' greater than 0 kA — check the Short Circuit tab.')?1:0; else fieldError(ikEl,null);
if(!(t>0)) errCount += fieldError(tEl,'Fault duration must be greater than 0 s.')?1:0; else fieldError(tEl,null);
if(!(ip>0)) errCount += fieldError(ipEl,'Enter peak fault current greater than 0 kA — check the Short Circuit tab.')?1:0; else fieldError(ipEl,null);
var ikSafe = ik>0?ik:0.0001, tSafe = t>0?t:1, kSafe = k>0?k:143, ipSafe = ip>0?ip:0.0001;
var thermalMin = (ikSafe*1000*Math.sqrt(tSafe))/kSafe;
document.getElementById('bzThermalMin').innerHTML = fmt(thermalMin,1)+' <small>mm²</small>';
var actualArea = chosenBar.area * (parseFloat(document.getElementById('bzBars').value)||1);
var thermalEl = document.getElementById('bzThermalNote');
if(actualArea>0){
if(actualArea>=thermalMin){
thermalEl.innerHTML = '<b style="color:var(--green,#2e7d32);">PASS</b> — chosen busbar ('+fmt(actualArea,0)+' mm²) exceeds the '+fmt(thermalMin,1)+' mm² thermal minimum, '+fmt((actualArea/thermalMin-1)*100,0)+'% margin.';
} else {
thermalEl.innerHTML = '<b style="color:var(--red,#c62828);">FAIL</b> — chosen busbar ('+fmt(actualArea,0)+' mm²) is below the '+fmt(thermalMin,1)+' mm² thermal minimum. Increase bars per phase, busbar size, or current density in Step 1.';
}
}
var spacingEl = document.getElementById('bzSpacing'), spanEl = document.getElementById('bzSpan'), bracketEl = document.getElementById('bzBracketRating');
var spacing = parseFloat(spacingEl.value), span = parseFloat(spanEl.value), bracket = parseFloat(bracketEl.value);
if(!(spacing>0)) errCount += fieldError(spacingEl,'Phase spacing must be greater than 0 mm.')?1:0; else fieldError(spacingEl,null);
if(!(span>0)) errCount += fieldError(spanEl,'Support span must be greater than 0 mm.')?1:0; else fieldError(spanEl,null);
if(!(bracket>0)) errCount += fieldError(bracketEl,'Enter the support bracket\'s rated withstand force greater than 0 N.')?1:0; else fieldError(bracketEl,null);
var spacingSafe=spacing>0?spacing/1000:0.1, spanSafe=span>0?span/1000:0.4, bracketSafe=bracket>0?bracket:0;
var ipAmps = ipSafe*1000;
var force = 2e-7*Math.pow(ipAmps,2)/spacingSafe*spanSafe;
document.getElementById('bzForce').innerHTML = fmt(force,1)+' <small>N</small>';
var forceEl = document.getElementById('bzForceNote');
if(bracketSafe>0){
if(bracketSafe>=force){
forceEl.innerHTML = '<b style="color:var(--green,#2e7d32);">PASS</b> — bracket rated '+fmt(bracketSafe,0)+' N exceeds the '+fmt(force,1)+' N calculated force, '+fmt((bracketSafe/force-1)*100,0)+'% margin.';
} else {
forceEl.innerHTML = '<b style="color:var(--red,#c62828);">FAIL</b> — calculated force '+fmt(force,1)+' N exceeds the '+fmt(bracketSafe,0)+' N bracket rating. Reduce support span, increase phase spacing, or use a stronger bracket.';
}
}
return errCount;
}
function calcEnclosure(){
var errCount = 0;
var eqEl = document.getElementById('bzEqWidth'), bbEl = document.getElementById('bzBbChamber'), cabEl = document.getElementById('bzCableChamber'),
hEl = document.getElementById('bzHeight'), dEl = document.getElementById('bzDepth'), plinthEl = document.getElementById('bzPlinth');
var eq = parseFloat(eqEl.value), bb = parseFloat(bbEl.value), cab = parseFloat(cabEl.value),
h = parseFloat(hEl.value), d = parseFloat(dEl.value), plinth = parseFloat(plinthEl.value);
if(!(eq>0)) errCount += fieldError(eqEl,'Equipment width must be greater than 0 mm.')?1:0; else fieldError(eqEl,null);
if(isNaN(bb)||bb<0) errCount += fieldError(bbEl,'Busbar chamber width can\'t be negative.')?1:0; else fieldError(bbEl,null);
if(isNaN(cab)||cab<0) errCount += fieldError(cabEl,'Cable chamber width can\'t be negative.')?1:0; else fieldError(cabEl,null);
if(!(h>0)) errCount += fieldError(hEl,'Height must be greater than 0 mm.')?1:0; else fieldError(hEl,null);
if(!(d>0)) errCount += fieldError(dEl,'Depth must be greater than 0 mm.')?1:0; else fieldError(dEl,null);
if(isNaN(plinth)||plinth<0) errCount += fieldError(plinthEl,'Plinth height can\'t be negative.')?1:0; else fieldError(plinthEl,null);
var eqSafe=eq>0?eq:0, bbSafe=bb>=0?bb:0, cabSafe=cab>=0?cab:0, hSafe=h>0?h:2000, dSafe=d>0?d:600, plinthSafe=plinth>=0?plinth:0;
var totalW = eqSafe+bbSafe+cabSafe;
var totalH = hSafe+plinthSafe;
document.getElementById('bzEnclSize').textContent = fmt(totalW,0)+' × '+fmt(totalH,0)+' × '+fmt(dSafe,0)+' mm (W × H × D)';
var ipNotes = {
IP42: 'Standard for a clean indoor electrical room with restricted access.',
IP54: 'For plant rooms or workshops with dust/light water spray exposure.',
IP65: 'For outdoor or washdown areas — check gasket/gland detailing and drainage, not just the panel rating.'
};
document.getElementById('bzIpHint').textContent = ipNotes[document.getElementById('bzIpRating').value] || '';
var W=totalW/1000, H=totalH/1000, D=dSafe/1000;
var areaM2 = 2*(W*H) + 2*(D*H) + (W*D);
var thicknessEl = document.getElementById('bzSheetThickness');
var thickness = parseFloat(thicknessEl.value);
if(!(thickness>0)) errCount += fieldError(thicknessEl,'Sheet thickness must be greater than 0 mm.')?1:0; else fieldError(thicknessEl,null);
var thicknessSafe = thickness>0 ? thickness : 2;
var enclosureMat = document.getElementById('bzEnclosureMat').value;
var enclosureDensity = ENCLOSURE_DENSITY[enclosureMat] || 7850;
var enclosureWeightKg = areaM2 * (thicknessSafe/1000) * enclosureDensity;
document.getElementById('bzEnclWeight').innerHTML = fmt(enclosureWeightKg,1)+' <small>kg</small>';
var heatEl = document.getElementById('bzHeatW'), factorEl = document.getElementById('bzAreaFactor'), htcEl = document.getElementById('bzHtc'), dtEl = document.getElementById('bzDeltaT');
var heat = parseFloat(heatEl.value), factor = parseFloat(factorEl.value), htc = parseFloat(htcEl.value), dt = parseFloat(dtEl.value);
if(isNaN(heat)||heat<0) errCount += fieldError(heatEl,'Heat load can\'t be negative.')?1:0; else fieldError(heatEl,null);
if(!(factor>0 && factor<=1)) errCount += fieldError(factorEl,'Area factor must be between 0 and 1.')?1:0; else fieldError(factorEl,null);
if(!(htc>0)) errCount += fieldError(htcEl,'Heat transfer coefficient must be greater than 0.')?1:0; else fieldError(htcEl,null);
if(!(dt>0)) errCount += fieldError(dtEl,'Allowable temperature rise must be greater than 0 K.')?1:0; else fieldError(dtEl,null);
var heatSafe=heat>=0?heat:0, factorSafe=(factor>0&&factor<=1)?factor:0.7, htcSafe=htc>0?htc:5.5, dtSafe=dt>0?dt:30;
var areaEff = areaM2*factorSafe;
var maxHeat = areaEff*htcSafe*dtSafe;
document.getElementById('bzAreaEff').innerHTML = fmt(areaEff,2)+' <small>m²</small>';
document.getElementById('bzMaxHeat').innerHTML = fmt(maxHeat,0)+' <small>W</small>';
var heatNoteEl = document.getElementById('bzHeatNote');
if(heatSafe<=maxHeat){
heatNoteEl.innerHTML = '<b style="color:var(--green,#2e7d32);">PASS</b> — natural convection handles '+fmt(maxHeat,0)+' W against a '+fmt(heatSafe,0)+' W internal load, '+fmt((maxHeat/Math.max(heatSafe,0.0001)-1)*100,0)+'% margin.';
} else {
heatNoteEl.innerHTML = '<b style="color:var(--red,#c62828);">FAIL</b> — '+fmt(heatSafe,0)+' W internal load exceeds the '+fmt(maxHeat,0)+' W natural-convection limit. Add ventilation louvres/fans, a heat exchanger, or reduce internal losses (larger cable/busbar CSA, lower-loss breakers).';
}
return errCount;
}
function calcAllBz(){
var e1 = calcBusbarRating();
var e2 = calcScWithstand();
var e3 = calcEnclosure();
updateValidationBanner('bzValidation', e1+e2+e3);
}
['bzIn','bzBars','bzDensity','bzIk','bzTime','bzMaterial','bzIp','bzSpacing','bzSpan','bzBracketRating',
'bzEqWidth','bzBbChamber','bzCableChamber','bzHeight','bzDepth','bzPlinth','bzEnclosureMat','bzSheetThickness','bzIpRating',
'bzHeatW','bzAreaFactor','bzHtc','bzDeltaT'].forEach(function(id){
var el = document.getElementById(id);
el.addEventListener('input', calcAllBz);
el.addEventListener('change', calcAllBz);
});
calcAllBz();
})();
} catch(e) { console.error("app.js module #9 error:", e); }
try {
(function(){
var STD_TX_KVA = [100,160,200,250,315,400,500,630,800,1000,1250,1600,2000,2500,3150];
var STD_GEN_KVA = [20,30,50,65,82,100,125,150,175,200,250,320,400,500,625,750,800,1000,1250,1500,2000,2500,3000];
function nextStandard(list, val){
for(var i=0;i<list.length;i++){ if(list[i]>=val) return list[i]; }
return list[list.length-1];
}
function fmt(n,d){ if(!isFinite(n)) return (0).toFixed(d===undefined?2:d); return n.toFixed(d===undefined?2:d); }
function calcTr(){
var errCount = 0;
var loadEl = document.getElementById('trLoadKw'), pfEl = document.getElementById('trPf'),
demandEl = document.getElementById('trDemandPct'), growthEl = document.getElementById('trGrowthPct');
var load = parseFloat(loadEl.value), pf = parseFloat(pfEl.value),
demandPct = parseFloat(demandEl.value), growthPct = parseFloat(growthEl.value);
if(!(load>0)) errCount += fieldError(loadEl,'Enter total connected load greater than 0 kW.')?1:0; else fieldError(loadEl,null);
if(!(pf>0 && pf<=1)) errCount += fieldError(pfEl,'Power factor must be between 0 and 1.')?1:0; else fieldError(pfEl,null);
if(!(demandPct>0 && demandPct<=150)) errCount += fieldError(demandEl,'Demand factor should be a realistic percentage, usually 50–100%.')?1:0; else fieldError(demandEl,null);
if(isNaN(growthPct) || growthPct<0) errCount += fieldError(growthEl,'Growth margin can\'t be negative.')?1:0; else fieldError(growthEl,null);
var loadSafe = load>0?load:0.0001, pfSafe = (pf>0&&pf<=1)?pf:0.85;
var demandSafe = (demandPct>0)?demandPct:100, growthSafe = (growthPct>=0)?growthPct:0;
var mdKva = (loadSafe*(demandSafe/100))/pfSafe;
var reqKva = mdKva*(1+growthSafe/100);
var stdKva = nextStandard(STD_TX_KVA, reqKva);
document.getElementById('trMdKva').innerHTML = fmt(mdKva,1)+' <small>kVA</small>';
document.getElementById('trReqKva').innerHTML = fmt(reqKva,1)+' <small>kVA</small>';
document.getElementById('trStdKva').innerHTML = fmt(stdKva,0)+' <small>kVA</small>';
var loadingDay1 = stdKva>0 ? (mdKva/stdKva*100) : 0;
var loadingFull = stdKva>0 ? (reqKva/stdKva*100) : 0;
document.getElementById('trLoadingNote').textContent = 'On a '+fmt(stdKva,0)+' kVA transformer: '+fmt(loadingDay1,0)+'% loaded today, '+fmt(loadingFull,0)+'% loaded once the growth margin is used up.';
updateValidationBanner('trValidation', errCount + (window.__trGenErr||0));
window.__trTxErr = errCount;
return errCount;
}
function calcGen(){
var errCount = 0;
var loadEl = document.getElementById('genLoadKw'), pfEl = document.getElementById('genPf'),
spareEl = document.getElementById('genSparePct'), xdEl = document.getElementById('genXdPrime'),
motorEl = document.getElementById('genMotorKw'), multEl = document.getElementById('genStartMult'),
ratedPfEl = document.getElementById('genRatedPf'), dipEl = document.getElementById('genDipPct');
var load = parseFloat(loadEl.value), pf = parseFloat(pfEl.value), sparePct = parseFloat(spareEl.value),
xdPrime = parseFloat(xdEl.value), motorKw = parseFloat(motorEl.value), startMult = parseFloat(multEl.value),
motorRatedPf = parseFloat(ratedPfEl.value), dipPct = parseFloat(dipEl.value);
if(!(load>0)) errCount += fieldError(loadEl,'Enter essential/standby load greater than 0 kW.')?1:0; else fieldError(loadEl,null);
if(!(pf>0 && pf<=1)) errCount += fieldError(pfEl,'Power factor must be between 0 and 1.')?1:0; else fieldError(pfEl,null);
if(isNaN(sparePct) || sparePct<0) errCount += fieldError(spareEl,'Spare margin can\'t be negative.')?1:0; else fieldError(spareEl,null);
if(!(xdPrime>0)) errCount += fieldError(xdEl,'Xd\' must be greater than 0% — ask your generator supplier if unknown, 25% is typical.')?1:0; else fieldError(xdEl,null);
if(!(motorKw>=0)) errCount += fieldError(motorEl,'Motor rating can\'t be negative — enter 0 if there\'s no significant motor load.')?1:0; else fieldError(motorEl,null);
if(!(startMult>0)) errCount += fieldError(multEl,'Starting multiplier must be greater than 0 — try 6 for DOL if unsure.')?1:0; else fieldError(multEl,null);
if(!(motorRatedPf>0 && motorRatedPf<=1)) errCount += fieldError(ratedPfEl,'Rated power factor must be between 0 and 1 — try 0.85 if unsure.')?1:0; else fieldError(ratedPfEl,null);
if(!(dipPct>0 && dipPct<=100)) errCount += fieldError(dipEl,'Allowable voltage dip must be a realistic percentage — 10–20% is typical.')?1:0; else fieldError(dipEl,null);
var loadSafe = load>0?load:0.0001, pfSafe=(pf>0&&pf<=1)?pf:0.8, spareSafe=(sparePct>=0)?sparePct:0;
var xdSafe = xdPrime>0?xdPrime:25, motorSafe = motorKw>=0?motorKw:0, multSafe = startMult>0?startMult:6;
var ratedPfSafe = (motorRatedPf>0&&motorRatedPf<=1)?motorRatedPf:0.85, dipSafe = (dipPct>0)?dipPct:15;
var runKva = (loadSafe/pfSafe)*(1+spareSafe/100);
var motorRatedKva = motorSafe/ratedPfSafe;
var motorStartKva = motorRatedKva*multSafe;
var startKva = motorSafe>0 ? (motorStartKva*xdSafe/dipSafe) : 0;
var stdKva = nextStandard(STD_GEN_KVA, Math.max(runKva, startKva));
document.getElementById('genRunKva').innerHTML = fmt(runKva,1)+' <small>kVA</small>';
document.getElementById('genStartKva').innerHTML = fmt(startKva,1)+' <small>kVA</small>';
document.getElementById('genStdKva').innerHTML = fmt(stdKva,0)+' <small>kVA</small>';
var governs = startKva>runKva ? 'motor-starting voltage dip' : 'running load';
document.getElementById('genGoverningNote').textContent = 'The '+governs+' requirement governs this selection. Recommended: '+fmt(stdKva,0)+' kVA — verify against the manufacturer\'s sizing software before ordering, especially for large single motors.';
window.__trGenErr = errCount;
updateValidationBanner('trValidation', errCount + (window.__trTxErr||0));
return errCount;
}
['trLoadKw','trPf','trDemandPct','trGrowthPct'].forEach(function(id){
var el = document.getElementById(id);
el.addEventListener('input', calcTr);
el.addEventListener('change', calcTr);
});
['genLoadKw','genPf','genSparePct','genXdPrime','genMotorKw','genStartMult','genRatedPf','genDipPct'].forEach(function(id){
var el = document.getElementById(id);
el.addEventListener('input', calcGen);
el.addEventListener('change', calcGen);
});
calcTr();
calcGen();
})();
} catch(e) { console.error("app.js module #10 error:", e); }
try {
(function(){
var dbSeq = 0;
var dbList = document.getElementById('dbList');
var lastNodeId = 'main';
function currentNodeOptions(excludeId){
var opts = [{id:'main', name:'Main LV Panel'}];
dbList.querySelectorAll('.db-card').forEach(function(c){
if(c.dataset.id !== excludeId){
opts.push({id:c.dataset.id, name:c.querySelector('.dbName').value || ('DB-'+c.dataset.id)});
}
});
return opts;
}
function refreshAllParentDropdowns(){
dbList.querySelectorAll('.db-card').forEach(function(c){
var sel = c.querySelector('.dbParent');
var current = sel.value;
var opts = currentNodeOptions(c.dataset.id);
var validIds = opts.map(function(o){return o.id;});
sel.innerHTML = opts.map(function(o){return '<option value="'+o.id+'">'+o.name+'</option>';}).join('');
sel.value = validIds.indexOf(current) !== -1 ? current : 'main';
});
}
function makeCard(){
dbSeq++;
var id = String(dbSeq);
var card = document.createElement('div');
card.className = 'db-card';
card.dataset.id = id;
card.innerHTML =
'<div class="db-card-head">'+
'<input type="text" class="dbName" value="DB-'+id+'">'+
'<button type="button" class="removeBtn" title="Remove" aria-label="Remove">✕</button>'+
'</div>'+
'<div class="parentField">'+
'<label>Feeds from</label>'+
'<select class="dbParent"></select>'+
'</div>'+
'<div class="row2">'+
'<div class="field"><label>Cable length <span class="unit">m</span></label><input type="number" class="dbLen" value="30" step="1"></div>'+
'<div class="field"><label>Cross-section <span class="unit">mm²</span></label><input type="number" class="dbCsa" value="50" step="1"></div>'+
'<div class="field"><label>Material</label><select class="dbMat"><option value="0.0175">Copper (Cu)</option><option value="0.0283">Aluminium (Al)</option></select></div>'+
'<div class="field"><label>Insulation</label><select class="dbIns"><option value="90">XLPE (90°C)</option><option value="70">PVC (70°C)</option></select></div>'+
'<div class="field"><label>Breaker Icu <span class="unit">kA</span></label><input type="number" class="dbIcu" value="25" step="1"></div>'+
'<div class="field"><label>Breaker model/type <span class="unit">optional</span></label><input type="text" class="dbModel" value="" placeholder="e.g. 3VA2116-7HL32-0AA0"></div>'+
'</div>'+
'<div class="hint" style="margin-bottom:10px;">Insulation type only matters when Step 2\'s voltage factor is set to c=0.95 (minimum fault) — cable resistance is then corrected up to operating temperature, per IEC 60909.</div>'+
'<details><summary>Advanced: parallel runs / reactance</summary>'+
'<div class="adv-grid">'+
'<div class="field"><label>Parallel runs</label><input type="number" class="dbPar" value="1" step="1" min="1"></div>'+
'<div class="field"><label>Reactance <span class="unit">Ω/km</span></label><input type="number" class="dbX" value="0.08" step="0.01"></div>'+
'</div>'+
'</details>'+
'<div style="border:1px solid #F3D8A0;background:#FFF8EC;border-radius:6px;padding:11px 13px;margin-top:10px;">'+
'<div style="font-family:var(--font-display);font-weight:700;font-size:12.5px;color:var(--amber-deep);margin-bottom:8px;">MOTOR LOAD AT THIS BOARD (optional)</div>'+
'<div class="adv-grid">'+
'<div class="field"><label>Total motor rated current, In <span class="unit">A</span></label><input type="number" class="dbMotorIn" value="0" step="1"></div>'+
'<div class="field"><label>Starting current ratio, ILR/In</label><input type="number" class="dbMotorRatio" value="6" step="0.5"></div>'+
'</div>'+
'<div class="hint">Adds the motors\' locked-rotor contribution to Ik&apos;&apos; at THIS board only (arithmetic sum, per IEC 60909 combined-source practice). Leave In = 0 if no motors here. Motor back-feed into upstream boards is not modelled — use a full study (SIMARIS/ETAP) if that matters for your case.</div>'+
'</div>'+
'<div class="stat-grid">'+
'<div class="stat"><div class="slabel">Ik&apos;&apos; at this board</div><div class="sval amber dbOutIk">0.00 kA</div></div>'+
'<div class="stat"><div class="slabel">ip peak</div><div class="sval dbOutIp">0.00 kA</div></div>'+
'</div>'+
'<div class="status-banner neutral dbBrkStatus"><span class="status-dot"></span><span>Breaker check</span></div>';
dbList.appendChild(card);
var parentSel = card.querySelector('.dbParent');
refreshAllParentDropdowns();
parentSel.value = lastNodeId;
lastNodeId = id;
card.querySelector('.removeBtn').addEventListener('click', function(){
card.remove();
refreshAllParentDropdowns();
calcAll();
});
card.querySelectorAll('input,select').forEach(function(el){
el.addEventListener('input', function(){
if(el.classList.contains('dbName')) refreshAllParentDropdowns();
calcAll();
});
el.addEventListener('change', calcAll);
});
calcAll();
}
document.getElementById('addDbBtn').addEventListener('click', makeCard);
document.querySelectorAll('input[name=srcMode]').forEach(function(r){
r.addEventListener('change', function(){
var mode = document.querySelector('input[name=srcMode]:checked').value;
document.getElementById('fldSsc').style.display = (mode==='ssc') ? '' : 'none';
document.getElementById('fldIkSrc').style.display = (mode==='ik') ? '' : 'none';
calcAll();
});
});
['Ssc','IkSrc','UnHV','srcXR','trSr','trUkr','trPk','UnLV','cFactor'].forEach(function(id){
var el = document.getElementById(id);
el.addEventListener('input', calcAll);
el.addEventListener('change', calcAll);
});
function fmt(n,d){ if(!isFinite(n)) return (0).toFixed(d===undefined?2:d); return n.toFixed(d===undefined?2:d); }
function calcIk(Rk,Xk,c,UnLV){
var Zk = Math.sqrt(Rk*Rk+Xk*Xk);
var RX = Xk!==0 ? (Rk/Xk) : 0;
var IkA = (c*UnLV)/(Math.sqrt(3)*Zk);
var IkkA = IkA/1000;
var kappa = 1.02+0.98*Math.exp(-3*RX);
var ip = kappa*Math.sqrt(2)*IkkA;
return {IkkA:IkkA, ip:ip};
}
function calcAll(){
var errCount = 0;
var mode = document.querySelector('input[name=srcMode]:checked').value;
var UnHVel = document.getElementById('UnHV'), UnLVel = document.getElementById('UnLV');
var srcXRel = document.getElementById('srcXR');
var UnHV = parseFloat(UnHVel.value) || 0;
var UnLV = parseFloat(UnLVel.value) || 0;
var c = parseFloat(document.getElementById('cFactor').value) || 1.0;
var srcXR = parseFloat(srcXRel.value) || 10;
if(UnHV<=0) errCount += fieldError(UnHVel,'Must be greater than 0 kV — enter your incoming HV/MV voltage.')?1:0; else fieldError(UnHVel,null);
if(UnLV<=0) errCount += fieldError(UnLVel,'Must be greater than 0 V — 400 is typical for LV.')?1:0; else fieldError(UnLVel,null);
if(parseFloat(srcXRel.value)<=0 || isNaN(parseFloat(srcXRel.value))) errCount += fieldError(srcXRel,'X/R ratio must be greater than 0 — try 10 if unsure.')?1:0; else fieldError(srcXRel,null);
var ZqHV;
if(mode==='ssc'){
var Sscel = document.getElementById('Ssc');
var SscVal = parseFloat(Sscel.value);
if(!(SscVal>0)) errCount += fieldError(Sscel,'Enter a fault level greater than 0 MVA — check your utility fault level letter.')?1:0; else fieldError(Sscel,null);
var Ssc = SscVal>0 ? SscVal : 0.0001;
ZqHV = (c*Math.pow(UnHV,2))/Ssc;
} else {
var IkSrcel = document.getElementById('IkSrc');
var IkSrcVal = parseFloat(IkSrcel.value);
if(!(IkSrcVal>0)) errCount += fieldError(IkSrcel,'Enter a value greater than 0 kA.')?1:0; else fieldError(IkSrcel,null);
var IkSrc = IkSrcVal>0 ? IkSrcVal : 0.0001;
ZqHV = (c*UnHV)/(Math.sqrt(3)*IkSrc);
}
var ratio2 = Math.pow(UnLV/1000,2)/Math.pow(UnHV,2);
var ZqLV = ZqHV*ratio2;
var Xq = ZqLV/Math.sqrt(1+1/Math.pow(srcXR,2));
var Rq = Xq/srcXR;
var trSrel = document.getElementById('trSr'), trUkrel = document.getElementById('trUkr'), trPkel = document.getElementById('trPk');
var trSrVal = parseFloat(trSrel.value), trUkrVal = parseFloat(trUkrel.value), trPkVal = parseFloat(trPkel.value);
if(!(trSrVal>0)) errCount += fieldError(trSrel,'Enter transformer rated power greater than 0 kVA.')?1:0; else fieldError(trSrel,null);
if(!(trUkrVal>0)) errCount += fieldError(trUkrel,'Enter impedance voltage greater than 0% — check the nameplate.')?1:0; else fieldError(trUkrel,null);
if(isNaN(trPkVal) || trPkVal<0) errCount += fieldError(trPkel,'Copper loss can\'t be negative.')?1:0;
var Sr = (trSrVal>0 ? trSrVal : 0.0001)*1000;
var ukr = trUkrVal>0 ? trUkrVal : 0;
var Pk = (trPkVal>0 ? trPkVal : 0)*1000;
var Zt = (ukr/100)*Math.pow(UnLV,2)/Sr;
var Rt = Pk*Math.pow(UnLV,2)/Math.pow(Sr,2);
if(Rt>Zt && Zt>0){
errCount += fieldError(trPkel,'Too high for this ukr/Sr — Rt would exceed total Zt. Recheck Pk, or increase ukr%/Sr.')?1:0;
} else if(trPkVal>=0){
fieldError(trPkel,null);
}
var Xt = Math.sqrt(Math.max(Zt*Zt-Rt*Rt,0));
var mainR = Rq+Rt, mainX = Xq+Xt;
var mainIk = calcIk(mainR,mainX,c,UnLV);
document.getElementById('mainIk').innerHTML = fmt(mainIk.IkkA,2)+' <small>kA</small>';
var isMinFault = (c === 0.95);
var nodes = {};
dbList.querySelectorAll('.db-card').forEach(function(card){
var id = card.dataset.id;
var lenEl = card.querySelector('.dbLen'), csaEl = card.querySelector('.dbCsa'),
parEl = card.querySelector('.dbPar'), xEl = card.querySelector('.dbX'),
motorInEl = card.querySelector('.dbMotorIn'), motorRatioEl = card.querySelector('.dbMotorRatio');
var rho = parseFloat(card.querySelector('.dbMat').value)||0.0175;
var len = parseFloat(lenEl.value), csa = parseFloat(csaEl.value),
par = parseFloat(parEl.value), xkm = parseFloat(xEl.value);
var thetaE = parseFloat(card.querySelector('.dbIns').value)||90;
if(isNaN(len) || len<0) errCount += fieldError(lenEl,'Cable length can\'t be negative.')?1:0; else fieldError(lenEl,null);
if(!(csa>0)) errCount += fieldError(csaEl,'Cross-section must be greater than 0 mm².')?1:0; else fieldError(csaEl,null);
if(isNaN(par) || par<1) errCount += fieldError(parEl,'Must be at least 1 parallel run.')?1:0; else fieldError(parEl,null);
if(isNaN(xkm) || xkm<0) errCount += fieldError(xEl,'Can\'t be negative — use 0 if unknown.')?1:0; else fieldError(xEl,null);
var parSafe = (par>=1) ? par : 1;
var Rc = (rho*(len>0?len:0)/(csa>0?csa:1))/parSafe;
if(isMinFault){ Rc = Rc * (1 + 0.004*(thetaE - 20)); }
var Xc = (xkm>0?xkm:0)*((len>0?len:0)/1000)/parSafe;
var motorIn = parseFloat(motorInEl.value);
var motorRatio = parseFloat(motorRatioEl.value);
if(isNaN(motorIn) || motorIn<0) errCount += fieldError(motorInEl,'Can\'t be negative — use 0 if no motors here.')?1:0; else fieldError(motorInEl,null);
if(motorIn>0 && !(motorRatio>0)) errCount += fieldError(motorRatioEl,'Must be greater than 0 when a motor current is entered — try 6.')?1:0; else fieldError(motorRatioEl,null);
var motorInSafe = motorIn>0 ? motorIn : 0;
var motorRatioSafe = motorRatio>0 ? motorRatio : 6;
var motorIkA = (motorInSafe>0) ? (motorInSafe*motorRatioSafe)/1000 : 0;
var motorIp = motorIkA>0 ? 1.8*Math.sqrt(2)*motorIkA : 0;
nodes[id] = {
parentId: card.querySelector('.dbParent').value,
localR: Rc, localX: Xc,
motorIkA: motorIkA, motorIp: motorIp,
name: card.querySelector('.dbName').value || ('DB-'+id),
card: card, children: []
};
});
Object.keys(nodes).forEach(function(id){
var parentSel = nodes[id].card.querySelector('.dbParent');
var seen = [id], cur = nodes[id].parentId, looped = false;
var hops = 0;
while(cur !== 'main' && nodes[cur] && hops<60){
if(seen.indexOf(cur)!==-1){ looped = true; break; }
seen.push(cur); cur = nodes[cur].parentId; hops++;
}
if(looped){ errCount += fieldError(parentSel,'This board\'s feed path loops back to itself — choose a different upstream board.')?1:0; }
else { fieldError(parentSel,null); }
});
function getCumulative(id, visited){
if(id==='main' || !nodes[id]) return {R:mainR, X:mainX};
if(visited.indexOf(id) !== -1) return {R:mainR, X:mainX};
visited.push(id);
var n = nodes[id];
var pc = getCumulative(n.parentId, visited);
return {R:pc.R+n.localR, X:pc.X+n.localX};
}
Object.keys(nodes).forEach(function(id){
var cum = getCumulative(id, []);
var res = calcIk(cum.R, cum.X, c, UnLV);
var totalIk = res.IkkA + nodes[id].motorIkA;
var totalIp = res.ip + nodes[id].motorIp;
var card = nodes[id].card;
var motorNote = nodes[id].motorIkA>0 ? (' <span style="color:var(--text-faint);font-size:10px;">(incl. '+fmt(nodes[id].motorIkA,2)+' kA motor)</span>') : '';
card.querySelector('.dbOutIk').innerHTML = fmt(totalIk,2)+' kA'+motorNote;
card.querySelector('.dbOutIp').textContent = fmt(totalIp,2)+' kA';
nodes[id].ik = totalIk; nodes[id].ip = totalIp;
var icu = parseFloat(card.querySelector('.dbIcu').value);
var icuEl = card.querySelector('.dbIcu');
var modelVal = card.querySelector('.dbModel').value.trim();
var modelTag = modelVal ? ('<b>'+modelVal+'</b> — ') : '';
var banner = card.querySelector('.dbBrkStatus');
if(!icu || icu<=0){
banner.className='status-banner neutral dbBrkStatus';
banner.innerHTML='<span class="status-dot"></span><span>'+modelTag+'Enter Icu to check adequacy.</span>';
fieldError(icuEl,null);
} else if(icu>=totalIk){
banner.className='status-banner ok dbBrkStatus';
banner.innerHTML='<span class="status-dot"></span><span>'+modelTag+'Icu '+fmt(icu,1)+' kA ≥ Ik&apos;&apos; '+fmt(totalIk,2)+' kA — OK</span>';
fieldError(icuEl,null);
} else {
banner.className='status-banner bad dbBrkStatus';
banner.innerHTML='<span class="status-dot"></span><span>'+modelTag+'Icu '+fmt(icu,1)+' kA &lt; Ik&apos;&apos; '+fmt(totalIk,2)+' kA — under-rated</span>';
errCount += fieldError(icuEl,'Under-rated for this fault level ('+fmt(totalIk,2)+' kA here) — pick a breaker with Icu ≥ '+fmt(totalIk,2)+' kA, or reduce upstream fault current.')?1:0;
}
nodes[id].model = modelVal;
var pid = nodes[id].parentId;
if(pid==='main'){
rootChildren.push(id);
} else if(nodes[pid]){
nodes[pid].children.push(id);
} else {
rootChildren.push(id);
}
});
renderTree(nodes, rootChildren, mainIk);
updateValidationBanner('scValidation', errCount);
}
var rootChildren;
var _origCalcAll = calcAll;
calcAll = function(){ rootChildren = []; _origCalcAll(); };
function renderTree(nodes, rootChildren, mainIk){
var el = document.getElementById('treeVisual');
var rows = [];
rows.push({depth:0, name:'Main LV Panel', ik:mainIk.IkkA, ip:mainIk.ip, isLeaf:rootChildren.length===0});
function walk(id, depth){
var n = nodes[id];
var isLeaf = n.children.length===0;
rows.push({depth:depth, name:n.name, model:n.model, ik:n.ik, ip:n.ip, isLeaf:isLeaf});
n.children.forEach(function(cid){ walk(cid, depth+1); });
}
rootChildren.forEach(function(id){ walk(id, 1); });
el.innerHTML = rows.map(function(r){
var indent = r.depth>0 ? ('&nbsp;&nbsp;'.repeat(r.depth-1)+'└─ ') : '';
var modelSpan = r.model ? (' <span style="color:var(--text-faint);font-weight:400;font-size:10.5px;">('+r.model+')</span>') : '';
return '<div class="tree-row">'+
'<span class="tree-branch">'+indent+'</span>'+
'<span class="tree-name'+(r.isLeaf?' leaf-last':'')+'">'+r.name+modelSpan+(r.isLeaf?' (end of line)':'')+'</span>'+
'<span class="tree-ik">'+fmt(r.ik,2)+' kA</span>'+
'<span class="tree-ip">ip '+fmt(r.ip,2)+' kA</span>'+
'</div>';
}).join('');
}
makeCard();
})();
} catch(e) { console.error("app.js module #12 error:", e); }
try {
(function(){
var vdSeq = 0;
var vdList = document.getElementById('vdList');
var vdLastNodeId = 'main';
function vdNodeOptions(excludeId){
var opts = [{id:'main', name:'Main LV Panel'}];
vdList.querySelectorAll('.db-card').forEach(function(c){
if(c.dataset.id !== excludeId){
opts.push({id:c.dataset.id, name:c.querySelector('.dbName').value || ('Board-'+c.dataset.id)});
}
});
return opts;
}
function vdRefreshParents(){
vdList.querySelectorAll('.db-card').forEach(function(c){
var sel = c.querySelector('.dbParent');
var current = sel.value;
var opts = vdNodeOptions(c.dataset.id);
var validIds = opts.map(function(o){return o.id;});
sel.innerHTML = opts.map(function(o){return '<option value="'+o.id+'">'+o.name+'</option>';}).join('');
sel.value = validIds.indexOf(current) !== -1 ? current : 'main';
});
}
function vdMakeCard(){
vdSeq++;
var id = String(vdSeq);
var card = document.createElement('div');
card.className = 'db-card';
card.dataset.id = id;
card.innerHTML =
'<div class="db-card-head">'+
'<input type="text" class="dbName" value="Board-'+id+'">'+
'<button type="button" class="removeBtn" title="Remove" aria-label="Remove">✕</button>'+
'</div>'+
'<div class="parentField">'+
'<label>Feeds from</label>'+
'<select class="dbParent"></select>'+
'</div>'+
'<div class="row2">'+
'<div class="field"><label>Cable length <span class="unit">m</span></label><input type="number" class="dbLen" value="30" step="1"></div>'+
'<div class="field"><label>Cross-section <span class="unit">mm²</span></label><input type="number" class="dbCsa" value="25" step="1"></div>'+
'<div class="field"><label>Material</label><select class="dbMat"><option value="0.0175">Copper (Cu)</option><option value="0.0283">Aluminium (Al)</option></select></div>'+
'<div class="field"><label>Reactance <span class="unit">Ω/km</span></label><input type="number" class="dbX" value="0.08" step="0.01"></div>'+
'</div>'+
'<div class="row2">'+
'<div class="field"><label>Parallel runs</label><input type="number" class="dbPar" value="1" step="1" min="1"></div>'+
'<div class="field"><label>Power factor, cosφ</label><input type="number" class="dbPf" value="0.85" step="0.01" min="0.1" max="1"></div>'+
'</div>'+
'<div class="radiorow">'+
'<label><input type="radio" name="vdMode'+id+'" class="dbModeI" value="amps" checked> Enter current (A)</label>'+
'<label><input type="radio" name="vdMode'+id+'" class="dbModeI" value="kw"> Enter load (kW)</label>'+
'</div>'+
'<div class="row2">'+
'<div class="field dbFldAmps"><label>Design current, I <span class="unit">A</span></label><input type="number" class="dbAmps" value="50" step="1"></div>'+
'<div class="field dbFldKw" style="display:none;"><label>Load <span class="unit">kW</span></label><input type="number" class="dbKw" value="30" step="1"></div>'+
'</div>'+
'<div class="stat-grid">'+
'<div class="stat"><div class="slabel">Drop, this run</div><div class="sval dbOutDropV">0.00 V</div></div>'+
'<div class="stat"><div class="slabel">Cumulative drop</div><div class="sval amber dbOutDropPct">0.00 %</div></div>'+
'</div>'+
'<div class="status-banner neutral dbVdStatus"><span class="status-dot"></span><span>Voltage drop check</span></div>';
vdList.appendChild(card);
var parentSel = card.querySelector('.dbParent');
vdRefreshParents();
parentSel.value = vdLastNodeId;
vdLastNodeId = id;
card.querySelectorAll('input[name=vdMode'+id+']').forEach(function(r){
r.addEventListener('change', function(){
var mode = card.querySelector('input[name=vdMode'+id+']:checked').value;
card.querySelector('.dbFldAmps').style.display = (mode==='amps') ? '' : 'none';
card.querySelector('.dbFldKw').style.display = (mode==='kw') ? '' : 'none';
vdCalcAll();
});
});
card.querySelector('.removeBtn').addEventListener('click', function(){
card.remove(); vdRefreshParents(); vdCalcAll();
});
card.querySelectorAll('input,select').forEach(function(el){
el.addEventListener('input', function(){
if(el.classList.contains('dbName')) vdRefreshParents();
vdCalcAll();
});
el.addEventListener('change', vdCalcAll);
});
vdCalcAll();
}
document.getElementById('vdAddBtn').addEventListener('click', vdMakeCard);
['vdUn','vdSystem','vdLimit'].forEach(function(id){
var el = document.getElementById(id);
el.addEventListener('input', vdCalcAll);
el.addEventListener('change', vdCalcAll);
});
function fmt(n,d){ if(!isFinite(n)) return (0).toFixed(d===undefined?2:d); return n.toFixed(d===undefined?2:d); }
function vdCalcAll(){
var errCount = 0;
var vdUnEl = document.getElementById('vdUn'), vdLimitEl = document.getElementById('vdLimit');
var UnVal = parseFloat(vdUnEl.value), limitVal = parseFloat(vdLimitEl.value);
var sys = document.getElementById('vdSystem').value;
if(!(UnVal>0)) errCount += fieldError(vdUnEl,'System voltage must be greater than 0 V — 400 is typical for LV.')?1:0; else fieldError(vdUnEl,null);
if(!(limitVal>0)) errCount += fieldError(vdLimitEl,'Allowable limit must be greater than 0% — try 5% if unsure.')?1:0; else fieldError(vdLimitEl,null);
var Un = UnVal>0 ? UnVal : 400;
var limit = limitVal>0 ? limitVal : 5;
var nodes = {};
vdList.querySelectorAll('.db-card').forEach(function(card){
var id = card.dataset.id;
var lenEl = card.querySelector('.dbLen'), csaEl = card.querySelector('.dbCsa'),
parEl = card.querySelector('.dbPar'), xEl = card.querySelector('.dbX'),
pfEl = card.querySelector('.dbPf'), ampsEl = card.querySelector('.dbAmps'),
kwEl = card.querySelector('.dbKw');
var rho = parseFloat(card.querySelector('.dbMat').value)||0.0175;
var len = parseFloat(lenEl.value), csa = parseFloat(csaEl.value),
par = parseFloat(parEl.value), xkm = parseFloat(xEl.value),
pfRaw = parseFloat(pfEl.value);
if(isNaN(len) || len<0) errCount += fieldError(lenEl,'Cable length can\'t be negative.')?1:0; else fieldError(lenEl,null);
if(!(csa>0)) errCount += fieldError(csaEl,'Cross-section must be greater than 0 mm².')?1:0; else fieldError(csaEl,null);
if(isNaN(par) || par<1) errCount += fieldError(parEl,'Must be at least 1 parallel run.')?1:0; else fieldError(parEl,null);
if(isNaN(xkm) || xkm<0) errCount += fieldError(xEl,'Can\'t be negative — use 0 if unknown.')?1:0; else fieldError(xEl,null);
if(isNaN(pfRaw) || pfRaw<0.1 || pfRaw>1) errCount += fieldError(pfEl,'Power factor must be between 0.1 and 1 — typical value is 0.8–0.95.')?1:0; else fieldError(pfEl,null);
var mode = card.querySelector('input[name=vdMode'+id+']:checked').value;
if(mode==='amps'){
var ampsVal = parseFloat(ampsEl.value);
if(isNaN(ampsVal) || ampsVal<0) errCount += fieldError(ampsEl,'Load current can\'t be negative.')?1:0; else fieldError(ampsEl,null);
fieldError(kwEl,null);
} else {
var kwVal = parseFloat(kwEl.value);
if(isNaN(kwVal) || kwVal<0) errCount += fieldError(kwEl,'Load can\'t be negative.')?1:0; else fieldError(kwEl,null);
fieldError(ampsEl,null);
}
var parSafe = par>=1 ? par : 1;
var csaSafe = csa>0 ? csa : 1;
var lenSafe = len>0 ? len : 0;
var xkmSafe = xkm>0 ? xkm : 0;
var pf = (!isNaN(pfRaw) && pfRaw>=0.1 && pfRaw<=1) ? pfRaw : 0.85;
var sinphi = Math.sqrt(Math.max(1-pf*pf,0));
var R = (rho*lenSafe/csaSafe)/parSafe;
var X = (xkmSafe*(lenSafe/1000))/parSafe;
var I;
if(mode==='amps'){
var av = parseFloat(ampsEl.value);
I = (av>0) ? av : 0;
} else {
var kv = parseFloat(kwEl.value);
var kwSafe = kv>0 ? kv : 0;
I = (sys==='3ph') ? (kwSafe*1000)/(Math.sqrt(3)*Un*pf) : (kwSafe*1000)/(Un*pf);
}
nodes[id] = {
parentId: card.querySelector('.dbParent').value,
R: R, X: X,
ownIp: I*pf, ownIq: I*sinphi,
lenHadBasicError: (isNaN(len) || len<0),
name: card.querySelector('.dbName').value || ('Board-'+id),
card: card, children: []
};
});
Object.keys(nodes).forEach(function(id){
var parentSel = nodes[id].card.querySelector('.dbParent');
var seen = [id], cur = nodes[id].parentId, looped = false;
var hops = 0;
while(cur !== 'main' && nodes[cur] && hops<60){
if(seen.indexOf(cur)!==-1){ looped = true; break; }
seen.push(cur); cur = nodes[cur].parentId; hops++;
}
if(looped){ errCount += fieldError(parentSel,'This board\'s feed path loops back to itself — choose a different upstream board.')?1:0; }
else { fieldError(parentSel,null); }
});
var rootChildren = [];
Object.keys(nodes).forEach(function(id){
var pid = nodes[id].parentId;
if(pid==='main' || !nodes[pid]){ rootChildren.push(id); }
else { nodes[pid].children.push(id); }
});
function subtreeIpIq(id, visited){
if(visited.indexOf(id)!==-1) return {Ip:0,Iq:0};
visited.push(id);
var n = nodes[id];
var Ip = n.ownIp, Iq = n.ownIq;
n.children.forEach(function(cid){
var c = subtreeIpIq(cid, visited);
Ip += c.Ip; Iq += c.Iq;
});
return {Ip:Ip, Iq:Iq};
}
Object.keys(nodes).forEach(function(id){
var st = subtreeIpIq(id, []);
var dropV = (sys==='3ph') ? Math.sqrt(3)*(nodes[id].R*st.Ip + nodes[id].X*st.Iq)
: 2*(nodes[id].R*st.Ip + nodes[id].X*st.Iq);
nodes[id].dropV = dropV;
nodes[id].dropPct = (dropV/Un)*100;
});
function getCumPct(id, visited){
if(id==='main' || !nodes[id]) return 0;
if(visited.indexOf(id) !== -1) return 0;
visited.push(id);
var n = nodes[id];
return getCumPct(n.parentId, visited) + n.dropPct;
}
Object.keys(nodes).forEach(function(id){
var cumPct = getCumPct(id, []);
var card = nodes[id].card;
card.querySelector('.dbOutDropV').textContent = fmt(nodes[id].dropV,2)+' V';
card.querySelector('.dbOutDropPct').textContent = fmt(cumPct,2)+' %';
nodes[id].cumPct = cumPct;
var banner = card.querySelector('.dbVdStatus');
var lenElForErr = card.querySelector('.dbLen');
if(cumPct<=limit){
banner.className='status-banner ok dbVdStatus';
banner.innerHTML='<span class="status-dot"></span><span>'+fmt(cumPct,2)+'% ≤ '+fmt(limit,1)+'% limit — OK ('+fmt(Un*(1-cumPct/100),0)+' V at board)</span>';
if(!nodes[id].lenHadBasicError) fieldError(lenElForErr,null);
} else {
banner.className='status-banner bad dbVdStatus';
banner.innerHTML='<span class="status-dot"></span><span>'+fmt(cumPct,2)+'% exceeds '+fmt(limit,1)+'% limit ('+fmt(Un*(1-cumPct/100),0)+' V at board)</span>';
if(!nodes[id].lenHadBasicError){
errCount += fieldError(lenElForErr,'Voltage drop here is '+fmt(cumPct,2)+'%, over your '+fmt(limit,1)+'% limit — shorten this run, increase cross-section, or reduce load on this board.')?1:0;
} else {
errCount += 1;
}
}
});
vdRenderTree(nodes, rootChildren, limit);
updateValidationBanner('vdValidation', errCount);
}
function vdRenderTree(nodes, rootChildren, limit){
var el = document.getElementById('vdTreeVisual');
var rows = [];
rows.push({depth:0, name:'Main LV Panel', pct:0, over:false, isLeaf:rootChildren.length===0});
function walk(id, depth){
var n = nodes[id];
var isLeaf = n.children.length===0;
rows.push({depth:depth, name:n.name, pct:n.cumPct, over:n.cumPct>limit, isLeaf:isLeaf});
n.children.forEach(function(cid){ walk(cid, depth+1); });
}
rootChildren.forEach(function(id){ walk(id, 1); });
el.innerHTML = rows.map(function(r){
var indent = r.depth>0 ? ('&nbsp;&nbsp;'.repeat(r.depth-1)+'└─ ') : '';
var pctColor = r.over ? 'style="color:var(--red);"' : 'style="color:var(--amber);"';
return '<div class="tree-row">'+
'<span class="tree-branch">'+indent+'</span>'+
'<span class="tree-name'+(r.isLeaf?' leaf-last':'')+'">'+r.name+(r.isLeaf?' (end of line)':'')+'</span>'+
'<span class="tree-ik" '+pctColor+'>'+fmt(r.pct,2)+' %</span>'+
'</div>';
}).join('');
}
vdMakeCard();
})();
} catch(e) { console.error("app.js module #13 error:", e); }
try {
(function(){
var selSeq = 0;
var selList = document.getElementById('selList');
var COLORS = ['#3D6B63','#C1662B','#3D7A4F','#B23A2E','#6B4A8A','#1C7A7A','#9C5A2E','#8C6D46'];
function selNodeOptions(excludeId){
var opts = [{id:'main', name: document.getElementById('selMainName').value || 'Main Breaker'}];
selList.querySelectorAll('.db-card').forEach(function(c){
if(c.dataset.id !== excludeId){
opts.push({id:c.dataset.id, name:c.querySelector('.dbName').value || ('Breaker-'+c.dataset.id)});
}
});
return opts;
}
function selRefreshParents(){
selList.querySelectorAll('.db-card').forEach(function(c){
var sel = c.querySelector('.dbParent');
var current = sel.value;
var opts = selNodeOptions(c.dataset.id);
var validIds = opts.map(function(o){return o.id;});
sel.innerHTML = opts.map(function(o){return '<option value="'+o.id+'">'+o.name+'</option>';}).join('');
sel.value = validIds.indexOf(current) !== -1 ? current : 'main';
});
}
function fmt(n,d){ if(!isFinite(n)) return (0).toFixed(d===undefined?2:d); return n.toFixed(d===undefined?2:d); }
var selLastId = 'main';
function makeSelCard(){
selSeq++;
var id = String(selSeq);
var card = document.createElement('div');
card.className = 'db-card';
card.dataset.id = id;
card.innerHTML =
'<div class="db-card-head">'+
'<input type="text" class="dbName" value="Breaker-'+id+'">'+
'<button type="button" class="removeBtn" title="Remove" aria-label="Remove">✕</button>'+
'</div>'+
'<div class="parentField"><label>Feeds from</label><select class="dbParent"></select></div>'+
'<div class="field"><label>Model/type <span class="unit">optional</span></label><input type="text" class="selModel" value="" placeholder="e.g. 3VA2116-7HL32-0AA0"></div>'+
'<div class="row2">'+
'<div class="field"><label>Rated current, In <span class="unit">A</span></label><input type="number" class="selIn" value="400" step="10"></div>'+
'<div class="field"><label>LT pickup, Ir <span class="unit">×In</span></label><input type="number" class="selIr" value="1.0" step="0.05"></div>'+
'<div class="field"><label>LT delay, tr <span class="unit">s</span></label><input type="number" class="selTr" value="6" step="0.5"></div>'+
'<div class="field"><label>ST pickup, Isd <span class="unit">×Ir</span></label><input type="number" class="selIsd" value="6" step="0.5"></div>'+
'<div class="field"><label>ST delay, tsd <span class="unit">s</span></label><input type="number" class="selTsd" value="0.2" step="0.05"></div>'+
'<div class="field"><label>Fault current here <span class="unit">kA</span></label><input type="number" class="selFault" value="10" step="0.5"></div>'+
'</div>'+
'<div class="radiorow"><label><input type="checkbox" class="selIiOn" checked> Instantaneous (Ii) enabled</label></div>'+
'<div class="field selIiField"><label>Inst. pickup, Ii <span class="unit">×In</span></label><input type="number" class="selIi" value="10" step="0.5"></div>'+
'<div class="hint">Check the Short Circuit tab for the Ik&apos;&apos; value at this board — that\'s your fault current here.</div>';
selList.appendChild(card);
var parentSel = card.querySelector('.dbParent');
selRefreshParents();
parentSel.value = selLastId;
selLastId = id;
card.querySelector('.removeBtn').addEventListener('click', function(){
card.remove(); selRefreshParents(); selCalcAll();
});
var iiOn = card.querySelector('.selIiOn'), iiField = card.querySelector('.selIiField');
iiOn.addEventListener('change', function(){ iiField.style.display = iiOn.checked ? '' : 'none'; selCalcAll(); });
card.querySelectorAll('input,select').forEach(function(el){
el.addEventListener('input', function(){
if(el.classList.contains('dbName')) selRefreshParents();
selCalcAll();
});
el.addEventListener('change', selCalcAll);
});
selCalcAll();
}
document.getElementById('selAddBtn').addEventListener('click', makeSelCard);
document.getElementById('selMainIiOn').addEventListener('change', function(){
document.getElementById('selMainIiFields').style.display = this.checked ? '' : 'none';
selCalcAll();
});
['selMainName','selMainModel','selMainIn','selMainIr','selMainTr','selMainIsd','selMainTsd','selMainIi','selMainFault','selMargin'].forEach(function(id){
var el = document.getElementById(id);
el.addEventListener('input', selCalcAll);
el.addEventListener('change', selCalcAll);
});
function tripTime(I_kA, In, Ir, tr, Isd, tsd, iiOn, Ii){
var I = I_kA*1000;
var IrA = Ir*In, IsdA = Isd*IrA, IiA = iiOn ? Ii*In : Infinity;
if(I < IrA) return Infinity;
if(iiOn && I >= IiA) return 0.02;
if(I >= IsdA) return tsd;
return tr*Math.pow(IrA/I,2);
}
function selCalcAll(){
var errCount = 0;
var mainNameEl = document.getElementById('selMainName');
var mainInEl = document.getElementById('selMainIn'), mainIrEl = document.getElementById('selMainIr'),
mainTrEl = document.getElementById('selMainTr'), mainIsdEl = document.getElementById('selMainIsd'),
mainTsdEl = document.getElementById('selMainTsd'), mainIiEl = document.getElementById('selMainIi'),
mainFaultEl = document.getElementById('selMainFault'), marginEl = document.getElementById('selMargin');
var mainIiOn = document.getElementById('selMainIiOn').checked;
var mainIn = parseFloat(mainInEl.value), mainIr = parseFloat(mainIrEl.value), mainTr = parseFloat(mainTrEl.value),
mainIsd = parseFloat(mainIsdEl.value), mainTsd = parseFloat(mainTsdEl.value), mainIi = parseFloat(mainIiEl.value),
mainFault = parseFloat(mainFaultEl.value), margin = parseFloat(marginEl.value);
if(!(mainIn>0)) errCount += fieldError(mainInEl,'Rated current must be greater than 0 A.')?1:0; else fieldError(mainInEl,null);
if(!(mainIr>0 && mainIr<=1.5)) errCount += fieldError(mainIrEl,'Ir is usually 0.4–1.0×In — check your ETU setting.')?1:0; else fieldError(mainIrEl,null);
if(!(mainTr>0)) errCount += fieldError(mainTrEl,'LT delay must be greater than 0 s.')?1:0; else fieldError(mainTrEl,null);
if(!(mainIsd>1)) errCount += fieldError(mainIsdEl,'Isd must be greater than 1×Ir, or the LT and ST zones overlap.')?1:0; else fieldError(mainIsdEl,null);
if(!(mainTsd>0)) errCount += fieldError(mainTsdEl,'ST delay must be greater than 0 s.')?1:0; else fieldError(mainTsdEl,null);
if(mainIiOn && !(mainIi*mainIn > mainIsd*mainIr*mainIn)) errCount += fieldError(mainIiEl,'Ii must correspond to a higher current than Isd — increase Ii or lower Isd.')?1:0; else fieldError(mainIiEl,null);
if(!(mainFault>0)) errCount += fieldError(mainFaultEl,'Enter the fault current at this point — see the Short Circuit tab.')?1:0; else fieldError(mainFaultEl,null);
if(!(margin>0)) errCount += fieldError(marginEl,'Minimum margin must be greater than 0 ms — 100 ms is typical.')?1:0; else fieldError(marginEl,null);
var mainInSafe=mainIn>0?mainIn:400, mainIrSafe=mainIr>0?mainIr:1, mainTrSafe=mainTr>0?mainTr:6,
mainIsdSafe=mainIsd>1?mainIsd:6, mainTsdSafe=mainTsd>0?mainTsd:0.3, mainIiSafe=mainIi>0?mainIi:10,
marginSafe=(margin>0?margin:100)/1000;
var breakers = {
main: {name: mainNameEl.value||'Main Breaker', model: document.getElementById('selMainModel').value.trim(), In:mainInSafe, Ir:mainIrSafe, tr:mainTrSafe, Isd:mainIsdSafe, tsd:mainTsdSafe, iiOn:mainIiOn, Ii:mainIiSafe, fault: mainFault>0?mainFault:1, parentId:null}
};
selList.querySelectorAll('.db-card').forEach(function(card){
var id = card.dataset.id;
var inEl=card.querySelector('.selIn'), irEl=card.querySelector('.selIr'), trEl=card.querySelector('.selTr'),
isdEl=card.querySelector('.selIsd'), tsdEl=card.querySelector('.selTsd'), iiEl=card.querySelector('.selIi'),
faultEl=card.querySelector('.selFault'), parentSel=card.querySelector('.dbParent');
var iiOn = card.querySelector('.selIiOn').checked;
var Iv=parseFloat(inEl.value), Irv=parseFloat(irEl.value), Trv=parseFloat(trEl.value),
Isdv=parseFloat(isdEl.value), Tsdv=parseFloat(tsdEl.value), Iiv=parseFloat(iiEl.value), Fv=parseFloat(faultEl.value);
if(!(Iv>0)) errCount += fieldError(inEl,'Rated current must be greater than 0 A.')?1:0; else fieldError(inEl,null);
if(!(Irv>0 && Irv<=1.5)) errCount += fieldError(irEl,'Ir is usually 0.4–1.0×In.')?1:0; else fieldError(irEl,null);
if(!(Trv>0)) errCount += fieldError(trEl,'LT delay must be greater than 0 s.')?1:0; else fieldError(trEl,null);
if(!(Isdv>1)) errCount += fieldError(isdEl,'Isd must be greater than 1×Ir.')?1:0; else fieldError(isdEl,null);
if(!(Tsdv>0)) errCount += fieldError(tsdEl,'ST delay must be greater than 0 s.')?1:0; else fieldError(tsdEl,null);
if(iiOn && !(Iiv*Iv > Isdv*Irv*Iv)) errCount += fieldError(iiEl,'Ii must correspond to a higher current than Isd.')?1:0; else fieldError(iiEl,null);
if(!(Fv>0)) errCount += fieldError(faultEl,'Enter the fault current at this board — see the Short Circuit tab.')?1:0; else fieldError(faultEl,null);
var InSafe=Iv>0?Iv:400, IrSafe=Irv>0?Irv:1, TrSafe=Trv>0?Trv:6, IsdSafe=Isdv>1?Isdv:6, TsdSafe=Tsdv>0?Tsdv:0.2, IiSafe=Iiv>0?Iiv:10, FSafe=Fv>0?Fv:1;
if(Fv>0 && FSafe < IrSafe*InSafe/1000){
errCount += fieldError(faultEl,'Fault current here ('+fmt(FSafe,2)+' kA) is below this breaker\'s own LT pickup ('+fmt(IrSafe*InSafe/1000,2)+' kA) — it won\'t trip. Check Ir or the fault value.')?1:0;
}
breakers[id] = {name: card.querySelector('.dbName').value||('Breaker-'+id), model: card.querySelector('.selModel').value.trim(), In:InSafe, Ir:IrSafe, tr:TrSafe, Isd:IsdSafe, tsd:TsdSafe, iiOn:iiOn, Ii:IiSafe, fault:FSafe, parentId:parentSel.value, card:card};
});
Object.keys(breakers).forEach(function(id){
if(id==='main') return;
var seen=[id], cur=breakers[id].parentId, looped=false, hops=0;
while(cur!=='main' && breakers[cur] && hops<60){
if(seen.indexOf(cur)!==-1){ looped=true; break; }
seen.push(cur); cur=breakers[cur].parentId; hops++;
}
var parentSel = breakers[id].card.querySelector('.dbParent');
if(looped){ errCount += fieldError(parentSel,'This breaker\'s feed path loops back to itself — choose a different upstream breaker.')?1:0; }
else { fieldError(parentSel,null); }
});
var breakerOrder = ['main'].concat(Array.prototype.map.call(selList.querySelectorAll('.db-card'), function(c){return c.dataset.id;}));
renderChart(breakers, breakerOrder);
renderCoordination(breakers, marginSafe, breakerOrder);
updateValidationBanner('selValidation', errCount);
}
function renderChart(breakers, order){
var svg = document.getElementById('tccSvg');
var W=640,H=420, mL=52, mR=14, mT=14, mB=40;
var plotW=W-mL-mR, plotH=H-mT-mB;
var xMin=0.1, xMax=100, yMin=0.01, yMax=100;
Object.keys(breakers).forEach(function(id){
var b=breakers[id];
var iiKA = b.iiOn ? (b.Ii*b.In/1000) : 0;
xMax = Math.max(xMax, b.fault*1.3, iiKA*1.3);
});
function xPix(kA){ kA=Math.max(Math.min(kA,xMax),xMin); return mL + (Math.log10(kA)-Math.log10(xMin))/(Math.log10(xMax)-Math.log10(xMin))*plotW; }
function yPix(s){ s=Math.max(Math.min(s,yMax),yMin); return mT + (1-(Math.log10(s)-Math.log10(yMin))/(Math.log10(yMax)-Math.log10(yMin)))*plotH; }
var parts = [];
var xDecades=[], v=xMin; while(v<=xMax*1.0001){ xDecades.push(v); v*=10; }
var yDecades=[0.01,0.1,1,10,100];
xDecades.forEach(function(dv){
var px=xPix(dv);
parts.push('<line x1="'+px+'" y1="'+mT+'" x2="'+px+'" y2="'+(mT+plotH)+'" stroke="#E6DFC9" stroke-width="1"/>');
parts.push('<text x="'+px+'" y="'+(mT+plotH+16)+'" font-size="9.5" fill="#948C74" text-anchor="middle" font-family="monospace">'+(dv<1?dv:dv)+'</text>');
});
yDecades.forEach(function(dv){
var py=yPix(dv);
parts.push('<line x1="'+mL+'" y1="'+py+'" x2="'+(mL+plotW)+'" y2="'+py+'" stroke="#E6DFC9" stroke-width="1"/>');
parts.push('<text x="'+(mL-6)+'" y="'+(py+3)+'" font-size="9.5" fill="#948C74" text-anchor="end" font-family="monospace">'+dv+'</text>');
});
parts.push('<text x="'+(mL+plotW/2)+'" y="'+(H-4)+'" font-size="10.5" fill="#5B5546" text-anchor="middle" font-family="monospace">Current (kA)</text>');
parts.push('<text x="12" y="'+(mT+plotH/2)+'" font-size="10.5" fill="#5B5546" text-anchor="middle" font-family="monospace" transform="rotate(-90,12,'+(mT+plotH/2)+')">Time (s)</text>');
parts.push('<rect x="'+mL+'" y="'+mT+'" width="'+plotW+'" height="'+plotH+'" fill="none" stroke="#D8CFB4" stroke-width="1.2"/>');
var legend = [];
var ci = 0;
order.forEach(function(id){
var b = breakers[id];
if(!b) return;
var color = COLORS[ci % COLORS.length]; ci++;
var IrKA = b.Ir*b.In/1000, IsdKA = b.Isd*IrKA, IiKA = b.iiOn ? (b.Ii*b.In/1000) : xMax*2;
var pts = [];
var steps = 24;
for(var i=0;i<=steps;i++){
var x = IrKA*1.01 * Math.pow(IsdKA/(IrKA*1.01), i/steps);
var t = b.tr*Math.pow(IrKA/x,2);
pts.push([x,t]);
}
pts.push([IsdKA, b.tsd]);
pts.push([Math.min(IiKA,xMax), b.tsd]);
if(b.iiOn && IiKA<=xMax){
pts.push([IiKA, 0.015]);
pts.push([xMax, 0.015]);
}
var pathPts = pts.map(function(p){ return xPix(p[0])+','+yPix(p[1]); }).join(' ');
var titleTag = b.model ? ('<title>'+b.name+' — '+b.model+'</title>') : ('<title>'+b.name+'</title>');
parts.push('<polyline points="'+pathPts+'" fill="none" stroke="'+color+'" stroke-width="2.2" stroke-linejoin="round">'+titleTag+'</polyline>');
legend.push({name:b.name, model:b.model, color:color});
});
svg.innerHTML = parts.join('');
var legendEl = document.getElementById('tccLegend');
legendEl.innerHTML = legend.map(function(l){
var modelSpan = l.model ? (' <span style="color:var(--text-faint);">('+l.model+')</span>') : '';
return '<div class="tcc-legend-item"><span class="tcc-swatch" style="background:'+l.color+'"></span>'+l.name+modelSpan+'</div>';
}).join('');
}
function renderCoordination(breakers, marginSafe, order){
var el = document.getElementById('coordResults');
var rows = [];
order.forEach(function(id){
if(id==='main') return;
var b = breakers[id];
if(!b) return;
var parent = breakers[b.parentId] || breakers.main;
var I = b.fault;
var tDown = tripTime(I, b.In, b.Ir, b.tr, b.Isd, b.tsd, b.iiOn, b.Ii);
var tUp = tripTime(I, parent.In, parent.Ir, parent.tr, parent.Isd, parent.tsd, parent.iiOn, parent.Ii);
var upIiKA = parent.iiOn ? (parent.Ii*parent.In/1000) : Infinity;
var lostToInst = I >= upIiKA;
var marginS = tUp - tDown;
var ok = !lostToInst && isFinite(tDown) && marginS >= marginSafe;
var msg;
if(!isFinite(tDown)){
msg = 'Fault current below this breaker\'s pickup — won\'t trip';
} else if(lostToInst){
msg = 'Selectivity lost — ' + fmt(I,2) + ' kA ≥ ' + parent.name + '\'s Ii (' + fmt(upIiKA,2) + ' kA), both trip instantaneously';
} else {
msg = fmt(marginS*1000,0) + ' ms margin (need ≥ ' + fmt(marginSafe*1000,0) + ' ms)';
}
var bLabel = b.name + (b.model ? ' ('+b.model+')' : '');
var parentLabel = parent.name + (parent.model ? ' ('+parent.model+')' : '');
rows.push('<div class="coord-line"><span>'+bLabel+' vs. '+parentLabel+' at '+fmt(I,2)+' kA</span><span class="coord-margin '+(ok?'ok':'bad')+'">'+msg+'</span></div>');
});
el.innerHTML = rows.length ? rows.join('') : '<div class="hint">Add a downstream breaker to see coordination results.</div>';
}
makeSelCard();
})();
} catch(e) { console.error("app.js module #14 error:", e); }
try {
(function(){
var csSeq = 0;
var csList = document.getElementById('csList');
var csLastId = 'main';
function csNodeOptions(excludeId){
var opts = [{id:'main', name:'(top level)'}];
csList.querySelectorAll('.db-card').forEach(function(c){
if(c.dataset.id !== excludeId){
opts.push({id:c.dataset.id, name:c.querySelector('.dbName').value || ('Cable-'+c.dataset.id)});
}
});
return opts;
}
function csRefreshParents(){
csList.querySelectorAll('.db-card').forEach(function(c){
var sel = c.querySelector('.dbParent');
var current = sel.value;
var opts = csNodeOptions(c.dataset.id);
var validIds = opts.map(function(o){return o.id;});
sel.innerHTML = opts.map(function(o){return '<option value="'+o.id+'">'+o.name+'</option>';}).join('');
sel.value = validIds.indexOf(current) !== -1 ? current : 'main';
});
}
function fmt(n,d){ if(!isFinite(n)) return (0).toFixed(d===undefined?2:d); return n.toFixed(d===undefined?2:d); }
function makeCsCard(){
csSeq++;
var id = String(csSeq);
var card = document.createElement('div');
card.className = 'db-card';
card.dataset.id = id;
card.innerHTML =
'<div class="db-card-head">'+
'<input type="text" class="dbName" value="Cable-'+id+'">'+
'<button type="button" class="removeBtn" title="Remove" aria-label="Remove">✕</button>'+
'</div>'+
'<div class="parentField"><label>Feeds from</label><select class="dbParent"></select></div>'+
'<div class="row2">'+
'<div class="field"><label>Design load current, Ib <span class="unit">A</span></label><input type="number" class="csIb" value="100" step="5"></div>'+
'<div class="field"><label>Base ampacity, Iz0 <span class="unit">A</span></label><input type="number" class="csIz0" value="134" step="1"></div>'+
'<div class="field"><label>Cross-section, S <span class="unit">mm²</span></label><input type="number" class="csS" value="50" step="1"></div>'+
'<div class="field"><label>Grouping factor, Cg</label><input type="number" class="csCg" value="1.0" step="0.05"></div>'+
'<div class="field"><label>Material</label><select class="csMat"><option value="Cu">Copper (Cu)</option><option value="Al">Aluminium (Al)</option></select></div>'+
'<div class="field"><label>Insulation</label><select class="csIns"><option value="XLPE">XLPE (90°C)</option><option value="PVC">PVC (70°C)</option></select></div>'+
'<div class="field"><label>Fault current here, Ik&apos;&apos; <span class="unit">kA</span></label><input type="number" class="csFault" value="10" step="0.5"></div>'+
'<div class="field"><label>Disconnection time, t <span class="unit">s</span></label><input type="number" class="csTime" value="0.4" step="0.05"></div>'+
'</div>'+
'<div class="hint">Iz0 from your cable datasheet/IEC table for this size + install method. Ik&apos;&apos; and t — check the Short Circuit and Selectivity tabs for this board.</div>';
csList.appendChild(card);
var parentSel = card.querySelector('.dbParent');
csRefreshParents();
parentSel.value = csLastId;
csLastId = id;
card.querySelector('.removeBtn').addEventListener('click', function(){
card.remove(); csRefreshParents(); csCalcAll();
});
card.querySelectorAll('input,select').forEach(function(el){
el.addEventListener('input', function(){
if(el.classList.contains('dbName')) csRefreshParents();
csCalcAll();
});
el.addEventListener('change', csCalcAll);
});
csCalcAll();
}
document.getElementById('csAddBtn').addEventListener('click', makeCsCard);
['csAmbient','csAmbientRef'].forEach(function(id){
var el = document.getElementById(id);
el.addEventListener('input', csCalcAll);
el.addEventListener('change', csCalcAll);
});
function csCalcAll(){
var errCount = 0;
var ambEl = document.getElementById('csAmbient'), ambRefEl = document.getElementById('csAmbientRef');
var amb = parseFloat(ambEl.value), ambRef = parseFloat(ambRefEl.value);
if(isNaN(amb)) errCount += fieldError(ambEl,'Enter the actual ambient temperature.')?1:0; else fieldError(ambEl,null);
if(isNaN(ambRef) || ambRef<0) errCount += fieldError(ambRefEl,'Enter a valid reference ambient temperature.')?1:0; else fieldError(ambRefEl,null);
var ambSafe = isNaN(amb)?40:amb, ambRefSafe = (isNaN(ambRef)||ambRef<0)?30:ambRef;
var rows = [];
csList.querySelectorAll('.db-card').forEach(function(card){
var ibEl=card.querySelector('.csIb'), iz0El=card.querySelector('.csIz0'), sEl=card.querySelector('.csS'),
cgEl=card.querySelector('.csCg'), matEl=card.querySelector('.csMat'), insEl=card.querySelector('.csIns'),
faultEl=card.querySelector('.csFault'), timeEl=card.querySelector('.csTime');
var ib=parseFloat(ibEl.value), iz0=parseFloat(iz0El.value), s=parseFloat(sEl.value),
cg=parseFloat(cgEl.value), fault=parseFloat(faultEl.value), t=parseFloat(timeEl.value);
var mat=matEl.value, ins=insEl.value;
var thetaP = ins==='XLPE' ? 90 : 70;
if(!(ib>0)) errCount += fieldError(ibEl,'Design load current must be greater than 0 A.')?1:0; else fieldError(ibEl,null);
if(!(iz0>0)) errCount += fieldError(iz0El,'Base ampacity must be greater than 0 A — check your cable datasheet/IEC table.')?1:0; else fieldError(iz0El,null);
if(!(s>0)) errCount += fieldError(sEl,'Cross-section must be greater than 0 mm².')?1:0; else fieldError(sEl,null);
if(!(cg>0 && cg<=1.5)) errCount += fieldError(cgEl,'Grouping factor is usually 0.4–1.0 — check your grouping table.')?1:0; else fieldError(cgEl,null);
if(!(fault>0)) errCount += fieldError(faultEl,'Enter the fault current at this cable — check the Short Circuit tab.')?1:0; else fieldError(faultEl,null);
if(!(t>0)) errCount += fieldError(timeEl,'Disconnection time must be greater than 0 s — check the breaker\'s trip time on the Selectivity tab.')?1:0; else fieldError(timeEl,null);
if(ambSafe >= thetaP) errCount += fieldError(insEl,'Ambient ('+fmt(ambSafe,0)+'°C) is at or above this insulation\'s max conductor temp ('+thetaP+'°C) — use XLPE, or check the ambient value in Step 1.')?1:0; else fieldError(insEl,null);
var ibSafe=ib>0?ib:0, iz0Safe=iz0>0?iz0:1, sSafe=s>0?s:1, cgSafe=(cg>0&&cg<=1.5)?cg:1,
faultSafe=fault>0?fault:0, tSafe=t>0?t:0.001;
var ampacityValid = ambSafe < thetaP;
var Ca = ampacityValid ? Math.sqrt(Math.max((thetaP-ambSafe)/(thetaP-ambRefSafe),0)) : 0;
var Iz = iz0Safe * Ca * cgSafe;
var ampacityOK = ampacityValid && Iz >= ibSafe;
var k = mat==='Cu' ? (ins==='XLPE'?143:115) : (ins==='XLPE'?94:76);
var Sreq = (faultSafe*1000*Math.sqrt(tSafe))/k;
var thermalOK = sSafe >= Sreq;
if(ampacityValid && !ampacityOK){
errCount += fieldError(iz0El,'Corrected ampacity is only '+fmt(Iz,1)+' A, below your '+fmt(ibSafe,1)+' A load — increase cross-section, reduce grouping, or check derating.')?1:0;
}
if(!thermalOK){
errCount += fieldError(sEl,'Cross-section too small for the fault — needs at least '+fmt(Sreq,1)+' mm² to survive '+fmt(faultSafe,2)+' kA for '+fmt(tSafe,2)+' s. Increase cross-section or reduce disconnection time.')?1:0;
}
rows.push({
name: card.querySelector('.dbName').value || 'Cable',
Iz:Iz, Ib:ibSafe, ampacityOK:ampacityOK, ampacityValid:ampacityValid,
Sreq:Sreq, S:sSafe, thermalOK:thermalOK
});
});
renderCsResults(rows);
updateValidationBanner('csValidation', errCount);
}
function renderCsResults(rows){
var el = document.getElementById('csResults');
if(rows.length===0){ el.innerHTML = '<div class="hint">Add a cable to see results.</div>'; return; }
el.innerHTML = rows.map(function(r){
var ampMsg = !r.ampacityValid ? 'ambient too high for this insulation' : (fmt(r.Iz,1)+' A '+(r.ampacityOK?'≥':'<')+' '+fmt(r.Ib,1)+' A '+(r.ampacityOK?'OK':'— insufficient'));
var thermMsg = fmt(r.S,0)+' mm² '+(r.thermalOK?'≥':'<')+' '+fmt(r.Sreq,1)+' mm² required'+(r.thermalOK?' — OK':' — insufficient');
return '<div class="coord-line"><span>'+r.name+' — ampacity</span><span class="coord-margin '+(r.ampacityOK?'ok':'bad')+'">'+ampMsg+'</span></div>'+
'<div class="coord-line"><span>'+r.name+' — thermal withstand</span><span class="coord-margin '+(r.thermalOK?'ok':'bad')+'">'+thermMsg+'</span></div>';
}).join('');
}
makeCsCard();
})();
} catch(e) { console.error("app.js module #15 error:", e); }
try {
(function(){
var estOutSeq = 0;
var estOutList = document.getElementById('estOutList');
var COPPER_DENSITY = 8.96;
var WAY_WIDTH_DEFAULTS = { MCB:90, RCBO:90, MCCB:150, ACB:800 };
var RATE_PLACEHOLDER_DEFAULTS = { MCB:50, RCBO:80, MCCB:300, ACB:2000 };
function fmt(n,d){ if(!isFinite(n)) return (0).toFixed(d===undefined?2:d); return n.toFixed(d===undefined?2:d); }
function makeOutGroup(){
estOutSeq++;
var id = String(estOutSeq);
var row = document.createElement('div');
row.className = 'db-card';
row.dataset.id = id;
row.innerHTML =
'<div class="db-card-head">'+
'<input type="text" class="estOutDesc" value="Outgoing-'+id+'" placeholder="Description">'+
'<button type="button" class="removeBtn" title="Remove" aria-label="Remove">✕</button>'+
'</div>'+
'<div class="row2">'+
'<div class="field"><label>Breaker type</label><select class="estOutType"><option value="MCB">MCB</option><option value="RCBO">RCBO</option><option value="MCCB">MCCB</option><option value="ACB">ACB</option></select></div>'+
'<div class="field"><label>Rated current, In <span class="unit">A</span></label><input type="number" class="estOutIn" value="32" step="1"></div>'+
'<div class="field"><label>Quantity (ways)</label><input type="number" class="estOutQty" value="1" step="1"></div>'+
'<div class="field"><label>Unit rate <span class="unit">USD/breaker, placeholder</span></label><input type="number" class="estOutRate" value="50" step="10"></div>'+
'</div>'+
'<div class="hint">Way width for the enclosure calc auto-derives from breaker type. Rate is a placeholder — edit for a real figure.</div>';
estOutList.appendChild(row);
var typeSel = row.querySelector('.estOutType');
var rateEl = row.querySelector('.estOutRate');
typeSel.addEventListener('change', function(){
rateEl.value = RATE_PLACEHOLDER_DEFAULTS[typeSel.value] || 50;
estCalcAll();
});
row.querySelector('.removeBtn').addEventListener('click', function(){ row.remove(); estCalcAll(); });
row.querySelectorAll('input,select').forEach(function(el){
el.addEventListener('input', estCalcAll);
el.addEventListener('change', estCalcAll);
});
estCalcAll();
}
document.getElementById('estOutAddBtn').addEventListener('click', makeOutGroup);
var watchIds = ['estIncomerIn','estIncomerType','estPoles','estIncomerWidth','estDensity','estBbLen','estBbChamber',
'estCableChamber','estHeight','estDepth','estSheetThickness','estEnclosureMat','estCurrency','estFxRate','estRateIncomer','estRateCopper','estRateEnclosure',
'estAccessories','estLabourPct','estContingency','estOverhead'];
watchIds.forEach(function(id){
var el = document.getElementById(id);
el.addEventListener('input', estCalcAll);
el.addEventListener('change', estCalcAll);
});
var ENCLOSURE_RATE_DEFAULTS = { MS:6, SS316:25 };
var ENCLOSURE_DENSITY = { MS:7850, SS316:8000 };
document.getElementById('estEnclosureMat').addEventListener('change', function(){
document.getElementById('estRateEnclosure').value = ENCLOSURE_RATE_DEFAULTS[this.value] || 6;
estCalcAll();
});
document.getElementById('estCurrency').addEventListener('change', function(){
document.getElementById('estRateEnclosureUnit').textContent = (document.getElementById('estCurrency').value)+'/kg';
});
document.getElementById('estRateEnclosureUnit').textContent = document.getElementById('estCurrency').value+'/kg';
var FX_TO_USD = { USD:1, SAR:3.75, AED:3.6725, INR:83 };
document.getElementById('estCurrency').addEventListener('change', function(){
document.getElementById('estFxRate').value = FX_TO_USD[this.value] || 1;
estCalcAll();
fetchLiveFx();
});
function fetchLiveFx(){
var cur = document.getElementById('estCurrency').value;
var statusEl = document.getElementById('fxStatus');
if(cur === 'USD'){
document.getElementById('estFxRate').value = 1;
statusEl.textContent = 'USD base — always 1.00.';
estCalcAll();
return;
}
statusEl.textContent = 'Fetching…';
fetch('https://open.er-api.com/v6/latest/USD')
.then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
.then(function(data){
if(data.result !== 'success' || !data.rates || !data.rates[cur]) throw new Error('No rate for '+cur);
document.getElementById('estFxRate').value = data.rates[cur];
var updated = data.time_last_update_utc || '';
statusEl.textContent = 'Live: 1 USD = '+fmt(data.rates[cur],4)+' '+cur+' (source updated '+updated+')';
estCalcAll();
})
.catch(function(err){
statusEl.textContent = 'Live fetch failed ('+err.message+') — using placeholder peg. Edit manually if needed.';
});
}
document.getElementById('fxFetchBtn').addEventListener('click', fetchLiveFx);
fetchLiveFx();
var copperKeyEl = document.getElementById('copperApiKey');
copperKeyEl.value = localStorage.getItem('lvtoolkit_copperApiKey') || '';
copperKeyEl.addEventListener('change', function(){
localStorage.setItem('lvtoolkit_copperApiKey', copperKeyEl.value.trim());
});
document.getElementById('copperFetchBtn').addEventListener('click', function(){
var statusEl = document.getElementById('copperStatus');
var key = copperKeyEl.value.trim();
if(!key){
statusEl.textContent = 'No API key entered — see LIVE COPPER PRICE panel in Advanced above.';
return;
}
statusEl.textContent = 'Fetching…';
fetch('https://api.api-ninjas.com/v1/commodityprice?name=copper', { headers: { 'X-Api-Key': key } })
.then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
.then(function(data){
if(!data.price) throw new Error('no price in response');
var usdPerKg = data.price * 2.20462;
document.getElementById('estRateCopper').value = usdPerKg.toFixed(2);
var when = data.updated ? new Date(data.updated*1000).toLocaleString() : 'just now';
statusEl.textContent = 'Live: '+fmt(usdPerKg,2)+' USD/kg raw copper metal ('+data.exchange+', '+when+'). Assembled busbar is more — this is metal cost only.';
estCalcAll();
})
.catch(function(err){
statusEl.textContent = 'Live fetch failed ('+err.message+'). Check your key, or edit the rate manually.';
});
});
function estCalcAll(){
var errCount = 0;
var inEl = document.getElementById('estIncomerIn');
var incomerType = document.getElementById('estIncomerType').value;
var bars = parseFloat(document.getElementById('estPoles').value);
var incWidthEl = document.getElementById('estIncomerWidth');
var densityEl = document.getElementById('estDensity');
var bbLenEl = document.getElementById('estBbLen');
var bbChamberEl = document.getElementById('estBbChamber');
var cableChamberEl = document.getElementById('estCableChamber');
var heightEl = document.getElementById('estHeight');
var depthEl = document.getElementById('estDepth');
var incomerIn = parseFloat(inEl.value);
var incWidth = parseFloat(incWidthEl.value);
var density = parseFloat(densityEl.value);
var bbLen = parseFloat(bbLenEl.value);
var bbChamber = parseFloat(bbChamberEl.value);
var cableChamber = parseFloat(cableChamberEl.value);
var height = parseFloat(heightEl.value);
var depth = parseFloat(depthEl.value);
if(!(incomerIn>0)) errCount += fieldError(inEl,'Incomer rated current must be greater than 0 A.')?1:0; else fieldError(inEl,null);
if(!(incWidth>0)) errCount += fieldError(incWidthEl,'Way width must be greater than 0 mm.')?1:0; else fieldError(incWidthEl,null);
if(!(density>0)) errCount += fieldError(densityEl,'Current density must be greater than 0 A/mm².')?1:0; else fieldError(densityEl,null);
fieldError(bbLenEl,null);
if(!(bbChamber>0)) errCount += fieldError(bbChamberEl,'Busbar chamber width must be greater than 0 mm.')?1:0; else fieldError(bbChamberEl,null);
if(!(cableChamber>0)) errCount += fieldError(cableChamberEl,'Cable chamber width must be greater than 0 mm.')?1:0; else fieldError(cableChamberEl,null);
if(!(height>0)) errCount += fieldError(heightEl,'Panel height must be greater than 0 mm.')?1:0; else fieldError(heightEl,null);
if(!(depth>0)) errCount += fieldError(depthEl,'Panel depth must be greater than 0 mm.')?1:0; else fieldError(depthEl,null);
var incomerInSafe=incomerIn>0?incomerIn:0, incWidthSafe=incWidth>0?incWidth:0, densitySafe=density>0?density:1.2,
bbLenSafe=bbLen>0?bbLen:0, bbChamberSafe=bbChamber>0?bbChamber:0, cableChamberSafe=cableChamber>0?cableChamber:0,
heightSafe=height>0?height:0, depthSafe=depth>0?depth:0;
var outGroups = [];
var totalOutWidth = 0, totalOutCurrent = 0;
estOutList.querySelectorAll('.db-card').forEach(function(card){
var descEl=card.querySelector('.estOutDesc'), typeEl=card.querySelector('.estOutType'),
inEl2=card.querySelector('.estOutIn'), qtyEl=card.querySelector('.estOutQty'), rateEl=card.querySelector('.estOutRate');
var In=parseFloat(inEl2.value), qty=parseFloat(qtyEl.value), rate=parseFloat(rateEl.value);
var width = WAY_WIDTH_DEFAULTS[typeEl.value] || 90;
if(!(In>0)) errCount += fieldError(inEl2,'Rated current must be greater than 0 A.')?1:0; else fieldError(inEl2,null);
if(!(qty>0)) errCount += fieldError(qtyEl,'Quantity must be greater than 0.')?1:0; else fieldError(qtyEl,null);
if(isNaN(rate) || rate<=0) errCount += fieldError(rateEl,'Add a unit rate to include this group in the cost accurately.')?1:0; else fieldError(rateEl,null);
var InSafe=In>0?In:0, qtySafe=qty>0?qty:0, widthSafe=width, rateSafe=(!isNaN(rate)&&rate>0)?rate:0;
totalOutWidth += widthSafe*qtySafe;
totalOutCurrent += InSafe*qtySafe;
outGroups.push({desc:descEl.value||('Outgoing-'+card.dataset.id), type:typeEl.value, In:InSafe, qty:qtySafe, rate:rateSafe, lineCost:qtySafe*rateSafe});
});
var busbarCsa = incomerInSafe / densitySafe;
var totalWidthPreview = incWidthSafe + totalOutWidth + bbChamberSafe + cableChamberSafe;
var bbLenAuto = totalWidthPreview;
var bbLenSafeFinal = bbLenSafe>0 ? bbLenSafe : bbLenAuto;
var busbarVolumeCm3 = (busbarCsa * bbLenSafeFinal * bars) / 1000;
var busbarWeightKg = (busbarVolumeCm3 * COPPER_DENSITY) / 1000;
var totalWidth = totalWidthPreview;
var W=totalWidth/1000, H=heightSafe/1000, D=depthSafe/1000;
var enclosureAreaM2 = 2*(W*H) + 2*(D*H) + (W*D);
var thicknessEl = document.getElementById('estSheetThickness');
var thickness = parseFloat(thicknessEl.value);
if(!(thickness>0)) errCount += fieldError(thicknessEl,'Sheet thickness must be greater than 0 mm.')?1:0; else fieldError(thicknessEl,null);
var thicknessSafe = thickness>0 ? thickness : 2;
var enclosureMat = document.getElementById('estEnclosureMat').value;
var enclosureDensity = ENCLOSURE_DENSITY[enclosureMat] || 7850;
var enclosureWeightKg = enclosureAreaM2 * (thicknessSafe/1000) * enclosureDensity;
var totalWeightKg = busbarWeightKg + enclosureWeightKg;
document.getElementById('estTotalWeight').innerHTML = fmt(totalWeightKg,1)+' <small>kg</small>';
var boqEl = document.getElementById('estBoq');
var boqRows = '';
boqRows += '<div class="tree-row"><span class="tree-name">Incomer — 1 × '+incomerType+' '+fmt(incomerInSafe,0)+'A</span><span class="tree-ip">way '+fmt(incWidthSafe,0)+' mm</span></div>';
outGroups.forEach(function(g){
boqRows += '<div class="tree-row"><span class="tree-name">'+g.desc+' — '+fmt(g.qty,0)+' × '+g.type+' '+fmt(g.In,0)+'A</span><span class="tree-ip">'+fmt(g.qty*g.In,0)+' A total</span></div>';
});
boqRows += '<div class="tree-row"><span class="tree-name">Busbar</span><span class="tree-ik">'+fmt(busbarCsa,1)+' mm²/bar × '+bars+' bars, '+fmt(busbarWeightKg,2)+' kg Cu</span></div>';
boqRows += '<div class="tree-row"><span class="tree-name">Enclosure (calculated)</span><span class="tree-ik">'+fmt(totalWidth,0)+' × '+fmt(heightSafe,0)+' × '+fmt(depthSafe,0)+' mm</span></div>';
boqRows += '<div class="tree-row"><span class="tree-name">Enclosure sheet metal (approx.)</span><span class="tree-ip">~'+fmt(enclosureAreaM2,2)+' m² × '+fmt(thicknessSafe,1)+' mm '+(enclosureMat==='SS316'?'SS316':'MS')+' ≈ '+fmt(enclosureWeightKg,1)+' kg</span></div>';
boqRows += '<div class="tree-row"><span class="tree-name">Total outgoing connected current</span><span class="tree-ip">'+fmt(totalOutCurrent,0)+' A (before diversity)</span></div>';
boqEl.innerHTML = boqRows;
var curEl = document.getElementById('estCurrency');
var rateIncomerEl = document.getElementById('estRateIncomer');
var rateCopperEl = document.getElementById('estRateCopper');
var rateEnclosureEl = document.getElementById('estRateEnclosure');
var accessoriesEl = document.getElementById('estAccessories');
var labourPctEl = document.getElementById('estLabourPct');
var contEl = document.getElementById('estContingency');
var ohEl = document.getElementById('estOverhead');
var cur = curEl.value.trim() || 'USD';
var rateIncomer = parseFloat(rateIncomerEl.value)||0;
var rateCopper = parseFloat(rateCopperEl.value)||0;
var rateEnclosure = parseFloat(rateEnclosureEl.value)||0;
var accessories = parseFloat(accessoriesEl.value)||0;
var labourPct = parseFloat(labourPctEl.value);
var cont = parseFloat(contEl.value), oh = parseFloat(ohEl.value);
if(isNaN(labourPct) || labourPct<0) errCount += fieldError(labourPctEl,'Labour % can\'t be negative.')?1:0; else fieldError(labourPctEl,null);
if(isNaN(cont) || cont<0) errCount += fieldError(contEl,'Contingency can\'t be negative.')?1:0; else fieldError(contEl,null);
if(isNaN(oh) || oh<0) errCount += fieldError(ohEl,'Overhead/margin can\'t be negative.')?1:0; else fieldError(ohEl,null);
var labourPctSafe=(!isNaN(labourPct)&&labourPct>=0)?labourPct:0;
var contSafe=(!isNaN(cont)&&cont>=0)?cont:0, ohSafe=(!isNaN(oh)&&oh>=0)?oh:0;
if(rateIncomer<=0) errCount += fieldError(rateIncomerEl,'Add an incomer breaker rate to include it in the total.')?1:0; else fieldError(rateIncomerEl,null);
if(rateCopper<=0) errCount += fieldError(rateCopperEl,'Add a copper busbar rate to include it in the total.')?1:0; else fieldError(rateCopperEl,null);
if(rateEnclosure<=0) errCount += fieldError(rateEnclosureEl,'Add an enclosure rate to include it in the total.')?1:0; else fieldError(rateEnclosureEl,null);
var fxEl = document.getElementById('estFxRate');
var fx = parseFloat(fxEl.value);
if(isNaN(fx) || fx<=0) errCount += fieldError(fxEl,'Exchange rate must be greater than 0.')?1:0; else fieldError(fxEl,null);
var fxSafe = (!isNaN(fx)&&fx>0) ? fx : 1;
var incomerCost = rateIncomer>0 ? rateIncomer : 0;
var copperCost = rateCopper>0 ? busbarWeightKg*rateCopper : 0;
var enclosureCostNative = rateEnclosure>0 ? enclosureWeightKg*rateEnclosure : 0;
var enclosureCost = fxSafe>0 ? enclosureCostNative/fxSafe : 0;
var outgoingCost = outGroups.reduce(function(s,g){ return s+g.lineCost; }, 0);
var materialsSubtotal = incomerCost + copperCost + enclosureCost + outgoingCost + accessories;
var labourAmt = materialsSubtotal * (labourPctSafe/100);
var subtotal = materialsSubtotal + labourAmt;
var contAmt = subtotal * (contSafe/100);
var ohAmt = (subtotal+contAmt) * (ohSafe/100);
var grandTotal = subtotal + contAmt + ohAmt;
document.getElementById('estGrandTotal').innerHTML = fmt(grandTotal*fxSafe,2)+' <small id="estCurrencyLabel">'+cur+'</small>';
var bd = document.getElementById('estBreakdown');
var rows = '';
rows += '<div class="tree-row"><span class="tree-name">Incomer breaker</span><span class="tree-ik">'+fmt(incomerCost*fxSafe,2)+' '+cur+'</span></div>';
rows += '<div class="tree-row"><span class="tree-name">Outgoing breakers</span><span class="tree-ik">'+fmt(outgoingCost*fxSafe,2)+' '+cur+'</span></div>';
rows += '<div class="tree-row"><span class="tree-name">Copper busbar</span><span class="tree-ik">'+fmt(copperCost*fxSafe,2)+' '+cur+'</span></div>';
rows += '<div class="tree-row"><span class="tree-name">Enclosure</span><span class="tree-ik">'+fmt(enclosureCost*fxSafe,2)+' '+cur+'</span></div>';
rows += '<div class="tree-row"><span class="tree-name">Accessories &amp; misc.</span><span class="tree-ik">'+fmt(accessories*fxSafe,2)+' '+cur+'</span></div>';
rows += '<div class="tree-row"><span class="tree-name">Materials subtotal</span><span class="tree-ik">'+fmt(materialsSubtotal*fxSafe,2)+' '+cur+'</span></div>';
rows += '<div class="tree-row"><span class="tree-name">Labour / assembly ('+fmt(labourPctSafe,1)+'%)</span><span class="tree-ip">+'+fmt(labourAmt*fxSafe,2)+' '+cur+'</span></div>';
rows += '<div class="tree-row"><span class="tree-name">Contingency ('+fmt(contSafe,1)+'%)</span><span class="tree-ip">+'+fmt(contAmt*fxSafe,2)+' '+cur+'</span></div>';
rows += '<div class="tree-row"><span class="tree-name">Overhead / margin ('+fmt(ohSafe,1)+'%)</span><span class="tree-ip">+'+fmt(ohAmt*fxSafe,2)+' '+cur+'</span></div>';
bd.innerHTML = rows;
updateValidationBanner('estValidation', errCount);
}
makeOutGroup();
makeOutGroup();
})();
} catch(e) { console.error("app.js module #16 error:", e); }
try {
(function(){
var TOOLS = [
{key:'sc',  page:'page-sc',  list:'dbList',     addBtn:'addDbBtn',     name:'short-circuit'},
{key:'vd',  page:'page-vd',  list:'vdList',     addBtn:'vdAddBtn',     name:'voltage-drop'},
{key:'sel', page:'page-sel', list:'selList',    addBtn:'selAddBtn',    name:'selectivity'},
{key:'cs',  page:'page-cs',  list:'csList',     addBtn:'csAddBtn',     name:'cable-sizing'},
{key:'est', page:'page-est', list:'estOutList', addBtn:'estOutAddBtn', name:'panel-estimate'},
{key:'tr',  page:'page-tr',  list:'trsizeList', addBtn:'trsizeAddBtn', name:'tx-genset-sizing'},
{key:'bz',  page:'page-bz',  list:'bzList',      addBtn:'bzAddBtn',     name:'busbar-enclosure-sizing'}
];
function showToast(msg){
var t = document.getElementById('appToast');
if(!t){
t=document.createElement('div'); t.id='appToast';
t.setAttribute('role','status'); t.setAttribute('aria-live','polite');
document.body.appendChild(t);
}
t.textContent = msg;
t.className='show';
clearTimeout(showToast._h);
showToast._h = setTimeout(function(){ t.className=''; }, 2600);
}
function fallbackCopy(text){
var ta=document.createElement('textarea');
ta.value=text; ta.style.position='fixed'; ta.style.opacity='0';
document.body.appendChild(ta); ta.focus(); ta.select();
try{ document.execCommand('copy'); }catch(e){}
document.body.removeChild(ta);
}
function copyToClipboard(text){
if(navigator.clipboard && window.isSecureContext){
navigator.clipboard.writeText(text).catch(function(){ fallbackCopy(text); });
} else { fallbackCopy(text); }
}
function b64Encode(str){
return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(m,p1){ return String.fromCharCode('0x'+p1); }));
}
function b64Decode(str){
return decodeURIComponent(Array.prototype.map.call(atob(str), function(c){
return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));
}
function getFieldValue(el){
if(el.type==='checkbox') return el.checked;
if(el.type==='radio') return el.checked ? el.value : undefined;
return el.value;
}
function setFieldValue(el, val){
if(el.type==='checkbox'){ el.checked = !!val; }
else if(el.type==='radio'){ el.checked = (el.value === val); }
else { el.value = val; }
}
function fireEvents(el){
el.dispatchEvent(new Event('input', {bubbles:true}));
el.dispatchEvent(new Event('change', {bubbles:true}));
}
function serializeStatic(pageEl){
var out = {};
pageEl.querySelectorAll('input[id], select[id]').forEach(function(el){
if(el.closest('.db-card')) return;
var v = getFieldValue(el);
if(v!==undefined) out['id:'+el.id]=v;
});
pageEl.querySelectorAll('input[type=radio][name]:not([id])').forEach(function(el){
if(el.closest('.db-card')) return;
if(el.checked) out['name:'+el.name] = el.value;
});
return out;
}
function applyStatic(pageEl, data){
Object.keys(data||{}).forEach(function(k){
var val = data[k];
if(k.indexOf('id:')===0){
var el = document.getElementById(k.slice(3));
if(el){ setFieldValue(el, val); fireEvents(el); }
} else if(k.indexOf('name:')===0){
var name = k.slice(5);
var els = pageEl.querySelectorAll('input[name="'+name+'"]');
var last=null;
els.forEach(function(el){ el.checked = (el.value===val); last=el; });
if(last) fireEvents(last);
}
});
}
function serializeCard(card){
var out = {};
card.querySelectorAll('input, select').forEach(function(el){
var cls = Array.prototype.find.call(el.classList, function(c){ return c!=='removeBtn'; });
if(!cls) return;
var v = getFieldValue(el);
if(v!==undefined) out[cls]=v;
});
out.__id = card.dataset.id;
return out;
}
function applyCard(card, data, idMap){
Object.keys(data||{}).forEach(function(cls){
if(cls==='__id') return;
var val = data[cls];
if(cls==='dbParent' && idMap){
val = (val==='main') ? 'main' : (idMap[val] || val);
}
card.querySelectorAll('.'+cls).forEach(function(el){ setFieldValue(el, val); });
});
card.querySelectorAll('input, select').forEach(fireEvents);
}
function buildPayload(cfg){
var pageEl = document.getElementById(cfg.page);
var listEl = document.getElementById(cfg.list);
var cards = listEl ? Array.prototype.slice.call(listEl.querySelectorAll(':scope > .db-card')) : [];
return {
tool: cfg.name,
savedAt: new Date().toISOString(),
static: serializeStatic(pageEl),
cards: cards.map(serializeCard)
};
}
function applyPayload(cfg, payload){
var pageEl = document.getElementById(cfg.page);
var listEl = document.getElementById(cfg.list);
var addBtn = document.getElementById(cfg.addBtn);
if(!pageEl || !listEl || !addBtn) return;
Array.prototype.slice.call(listEl.querySelectorAll(':scope > .db-card')).forEach(function(c){
var rm = c.querySelector('.removeBtn');
if(rm) rm.click(); else c.remove();
});
var wantedCards = payload.cards || [];
for(var i=0;i<wantedCards.length;i++){ addBtn.click(); }
applyStatic(pageEl, payload.static || {});
var newCards = Array.prototype.slice.call(listEl.querySelectorAll(':scope > .db-card'));
var idMap = {};
newCards.forEach(function(card, idx){
var oldId = wantedCards[idx] && wantedCards[idx].__id;
if(oldId) idMap[oldId] = card.dataset.id;
});
newCards.forEach(function(card, idx){
applyCard(card, wantedCards[idx] || {}, idMap);
});
showToast('Loaded ' + cfg.name.replace('-', ' ') + ' — ' + wantedCards.length + ' card(s) restored.');
}
function downloadJSON(obj, filename){
var blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
var url = URL.createObjectURL(blob);
var a = document.createElement('a');
a.href = url; a.download = filename;
document.body.appendChild(a); a.click(); a.remove();
setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
}
function exportTool(cfg){
downloadJSON(buildPayload(cfg), cfg.name + '-project.json');
showToast('Downloaded ' + cfg.name + '-project.json');
}
function importTool(cfg, file){
var reader = new FileReader();
reader.onload = function(){
try{
var payload = JSON.parse(reader.result);
applyPayload(cfg, payload);
}catch(e){
showToast('Could not read that file — is it a project file exported from this sheet?');
}
};
reader.readAsText(file);
}
function copyShareLink(cfg){
var payload = buildPayload(cfg);
var encoded = b64Encode(JSON.stringify(payload));
var url = location.origin + location.pathname + '?d=' + encoded + '#' + cfg.key;
copyToClipboard(url);
showToast('Share link copied — opening it loads this sheet with these exact numbers.');
}
document.querySelectorAll('.sheet-actions').forEach(function(bar){
var key = bar.dataset.tool;
var cfg = TOOLS.filter(function(t){ return t.key===key; })[0];
if(!cfg) return;
var fileInput = bar.querySelector('.importFileInput');
bar.querySelector('.actExport').addEventListener('click', function(){ exportTool(cfg); });
bar.querySelector('.actImport').addEventListener('click', function(){ fileInput.click(); });
fileInput.addEventListener('change', function(){
if(fileInput.files[0]) importTool(cfg, fileInput.files[0]);
fileInput.value = '';
});
bar.querySelector('.actPrint').addEventListener('click', function(){ window.print(); });
bar.querySelector('.actShare').addEventListener('click', function(){ copyShareLink(cfg); });
});
(function(){
var params = new URLSearchParams(location.search);
var d = params.get('d');
if(!d) return;
try{
var payload = JSON.parse(b64Decode(d));
var cfg = TOOLS.filter(function(t){ return t.name===payload.tool; })[0];
if(cfg) setTimeout(function(){ applyPayload(cfg, payload); }, 0);
}catch(e){  }
})();
document.addEventListener('click', function(e){
var el = e.target.closest('.sval, .rval, .tree-ik, #mainIk');
if(!el) return;
var text = el.textContent.trim();
var num = (text.match(/-?[\d.]+/) || [''])[0];
if(!num) return;
copyToClipboard(num);
showToast('Copied ' + num + ' — paste it into a field on another sheet.');
});
var themeBtn = document.getElementById('themeToggleBtn');
if(themeBtn){
themeBtn.addEventListener('click', function(){
var isDark = document.documentElement.getAttribute('data-theme')==='dark';
document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
themeBtn.textContent = isDark ? '☾ Dark mode' : '☀ Light mode';
});
}
var titleEl = document.querySelector('.masthead h1');
var subEl = document.querySelector('.masthead-sub');
var logoImg = document.getElementById('mastheadLogo');
var editBtn = document.getElementById('editHeaderBtn');
var logoInput = document.getElementById('logoFileInput');
var saveHeaderBtn = document.getElementById('saveHeaderBtn');
var loadHeaderBtn = document.getElementById('loadHeaderBtn');
var headerFileInput = document.getElementById('headerFileInput');
if(editBtn){
editBtn.addEventListener('click', function(){
var editing = titleEl.getAttribute('contenteditable')==='true';
if(editing){
titleEl.removeAttribute('contenteditable');
subEl.removeAttribute('contenteditable');
editBtn.textContent = '✎ Edit header';
logoInput.style.display = 'none';
} else {
titleEl.setAttribute('contenteditable','true');
subEl.setAttribute('contenteditable','true');
editBtn.textContent = '✓ Done editing';
logoInput.style.display = '';
showToast('Click the title or subtitle to rename them, or choose a logo file.');
}
});
}
if(logoInput){
logoInput.addEventListener('change', function(){
var f = logoInput.files[0]; if(!f) return;
var reader = new FileReader();
reader.onload = function(){
logoImg.src = reader.result;
logoImg.style.display = '';
};
reader.readAsDataURL(f);
});
}
if(saveHeaderBtn){
saveHeaderBtn.addEventListener('click', function(){
downloadJSON({
title: titleEl.textContent,
sub: subEl.textContent,
logo: logoImg.src && logoImg.style.display!=='none' ? logoImg.src : null
}, 'site-header.json');
showToast('Downloaded site-header.json');
});
}
if(loadHeaderBtn){
loadHeaderBtn.addEventListener('click', function(){ headerFileInput.click(); });
headerFileInput.addEventListener('change', function(){
var f = headerFileInput.files[0]; if(!f){ return; }
var reader = new FileReader();
reader.onload = function(){
try{
var data = JSON.parse(reader.result);
if(data.title) titleEl.textContent = data.title;
if(data.sub) subEl.textContent = data.sub;
if(data.logo){ logoImg.src = data.logo; logoImg.style.display=''; }
showToast('Header loaded.');
}catch(e){ showToast('Could not read that header file.'); }
};
reader.readAsText(f);
headerFileInput.value = '';
});
}
function mm2ToAwg(a){
var d = Math.sqrt(4*a/Math.PI);
return 36 - 39*Math.log(d/0.127)/Math.log(92);
}
function attachUnitHints(root){
(root||document).querySelectorAll('input.dbCsa, input.csS').forEach(function(el){
if(el.dataset.hintOn) return;
el.dataset.hintOn = '1';
var field = el.closest('.field');
if(!field) return;
var hint = document.createElement('div');
hint.className = 'unit-hint';
field.appendChild(hint);
function upd(){
var v = parseFloat(el.value);
hint.textContent = (isFinite(v) && v>0) ? ('≈ AWG ' + mm2ToAwg(v).toFixed(1)) : '';
}
el.addEventListener('input', upd);
upd();
});
(root||document).querySelectorAll('input.dbLen').forEach(function(el){
if(el.dataset.hintOn) return;
el.dataset.hintOn = '1';
var field = el.closest('.field');
if(!field) return;
var hint = document.createElement('div');
hint.className = 'unit-hint';
field.appendChild(hint);
function upd(){
var v = parseFloat(el.value);
hint.textContent = (isFinite(v) && v>0) ? ('≈ ' + (v*3.28084).toFixed(1) + ' ft') : '';
}
el.addEventListener('input', upd);
upd();
});
}
var EMPTY_IDS = {dbList:'dbListEmpty', vdList:'vdListEmpty', selList:'selListEmpty', csList:'csListEmpty', estOutList:'estOutListEmpty'};
function updateEmptyState(listId){
var listEl = document.getElementById(listId);
var emptyEl = document.getElementById(EMPTY_IDS[listId]);
if(!listEl || !emptyEl) return;
emptyEl.style.display = listEl.children.length ? 'none' : 'flex';
}
function updateAllEmptyStates(){
Object.keys(EMPTY_IDS).forEach(updateEmptyState);
}
updateAllEmptyStates();
attachUnitHints(document);
var hintObserver = new MutationObserver(function(muts){
muts.forEach(function(m){
m.addedNodes && m.addedNodes.forEach(function(n){
if(n.nodeType===1) attachUnitHints(n.matches && n.matches('.db-card') ? n.parentNode : n);
});
if(m.target && m.target.id && EMPTY_IDS[m.target.id]) updateEmptyState(m.target.id);
});
});
TOOLS.forEach(function(t){
var listEl = document.getElementById(t.list);
if(listEl) hintObserver.observe(listEl, {childList:true});
});
})();
} catch(e) { console.error("app.js module #17 error:", e); }
try {
(function(){
function num(id){ var el = document.getElementById(id); return el ? parseFloat(el.value) : NaN; }
function el(id){ return document.getElementById(id); }
function fmt(v, d){ if(!isFinite(v)) return '—'; return v.toFixed(d===undefined?2:d); }
function setText(id, html){ var e = el(id); if(e) e.innerHTML = html; }
function calcPipeFlow(){
if(!el('pfQ')) return;
var Q = num('pfQ'), D = num('pfD'), L = num('pfL'), eps = parseFloat(el('pfMat').value);
var dz = num('pfDz'), K = num('pfK'), nu = num('pfNu') * 1e-6, rho = num('pfRho');
var errs = 0;
errs += fieldError(el('pfQ'), (isNaN(Q) || Q<=0) ? 'Flow rate must be greater than 0.' : null);
errs += fieldError(el('pfD'), (isNaN(D) || D<=0) ? 'Diameter must be greater than 0.' : null);
errs += fieldError(el('pfL'), (isNaN(L) || L<=0) ? 'Length must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('pfValidation', errs); return; }
var Dm = D/1000;
var Qm3s = Q/1000;
var A = Math.PI * Dm * Dm / 4;
var v = Qm3s / A;
var Re = v * Dm / nu;
var relRough = (eps/1000) / Dm;
var f;
var regime;
if(Re < 2300){ f = 64/Re; regime = 'Laminar'; }
else if(Re < 4000){ f = 0.25/Math.pow(Math.log((relRough/3.7) + (5.74/Math.pow(Re,0.9)))/Math.LN10, 2); regime = 'Transitional'; }
else { f = 0.25/Math.pow(Math.log((relRough/3.7) + (5.74/Math.pow(Re,0.9)))/Math.LN10, 2); regime = 'Turbulent'; }
var hf = f * (L/Dm) * (v*v) / (2*9.81);
var hMinor = K * (v*v) / (2*9.81);
var hFriction = hf + hMinor;
var hTotal = hFriction + dz;
var dpPa = rho * 9.81 * hFriction;
setText('pfHf', fmt(hFriction,3) + ' <small>m</small>');
setText('pfV', fmt(v,2) + ' m/s');
setText('pfRe', Math.round(Re).toLocaleString());
setText('pfRegime', regime);
setText('pfF', fmt(f,4));
setText('pfHtotal', fmt(hTotal,3) + ' m');
setText('pfDp', fmt(dpPa/1000,2) + ' kPa <small>(' + fmt(dpPa/1e5,3) + ' bar)</small>');
var banner = el('pfValidation');
if(v > 3.0){
banner.className = 'validation-banner bad';
banner.innerHTML = '<span class="vdot"></span><span>Velocity is ' + fmt(v,2) + ' m/s — above the usual 2–3 m/s guideline for water pipes (erosion / noise risk). Consider a larger diameter.</span>';
} else {
updateValidationBanner('pfValidation', 0);
}
}
['pfQ','pfD','pfL','pfMat','pfDz','pfK','pfNu','pfRho'].forEach(function(id){
var e = el(id); if(e) e.addEventListener('input', calcPipeFlow); if(e) e.addEventListener('change', calcPipeFlow);
});
calcPipeFlow();
var MOTOR_STD_KW = [0.18,0.25,0.37,0.55,0.75,1.1,1.5,2.2,3,4,5.5,7.5,11,15,18.5,22,30,37,45,55,75,90,110,132,160,200,250,315];
function calcPump(){
if(!el('ppQ')) return;
var Q = num('ppQ'), H = num('ppH'), eta = num('ppEta'), etaM = num('ppEtaM'), rho = num('ppRho');
var npshA = num('ppNpshA'), npshR = num('ppNpshR');
var errs = 0;
errs += fieldError(el('ppQ'), (isNaN(Q) || Q<=0) ? 'Flow rate must be greater than 0.' : null);
errs += fieldError(el('ppH'), (isNaN(H) || H<=0) ? 'Head must be greater than 0.' : null);
errs += fieldError(el('ppEta'), (isNaN(eta) || eta<=0 || eta>100) ? 'Efficiency must be between 0 and 100%.' : null);
errs += fieldError(el('ppEtaM'), (isNaN(etaM) || etaM<=0 || etaM>100) ? 'Efficiency must be between 0 and 100%.' : null);
if(errs>0){ updateValidationBanner('ppValidation', errs); return; }
var Qm3s = Q/1000;
var Ph = (rho * 9.81 * Qm3s * H) / 1000;
var Ps = Ph / (eta/100);
var Pm = Ps / (etaM/100);
var stdMotor = MOTOR_STD_KW.find(function(k){ return k >= Pm; }) || MOTOR_STD_KW[MOTOR_STD_KW.length-1];
setText('ppMotorStd', fmt(stdMotor,2) + ' <small>kW</small>');
setText('ppPh', fmt(Ph,2) + ' kW');
setText('ppPs', fmt(Ps,2) + ' kW');
setText('ppPm', fmt(Pm,2) + ' kW');
var margin = npshA - npshR;
setText('ppNpshMargin', fmt(margin,2) + ' m');
var st = el('ppNpshStatus');
if(isNaN(margin)){
st.className = 'status-banner neutral';
st.innerHTML = '<span class="status-dot"></span><span>Enter NPSH values above.</span>';
} else if(margin < 0.5){
st.className = 'status-banner bad';
st.innerHTML = '<span class="status-dot"></span><span>Margin only ' + fmt(margin,2) + ' m — cavitation risk. Raise NPSH available (shorter/wider suction line, higher supply level) or pick a pump with lower NPSHr.</span>';
} else if(margin < 1.0){
st.className = 'status-banner neutral';
st.innerHTML = '<span class="status-dot"></span><span>Margin ' + fmt(margin,2) + ' m — workable but tight. 1.0 m+ is a more comfortable margin.</span>';
} else {
st.className = 'status-banner ok';
st.innerHTML = '<span class="status-dot"></span><span>Margin ' + fmt(margin,2) + ' m — comfortable NPSH margin.</span>';
}
updateValidationBanner('ppValidation', 0);
}
['ppQ','ppH','ppEta','ppEtaM','ppRho','ppNpshA','ppNpshR'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcPump); e.addEventListener('change', calcPump); }
});
calcPump();
function calcHvac(){
if(!el('hvVel')) return;
var mode = (document.querySelector('input[name="hvMode"]:checked') || {}).value || 'ach';
el('hvFldAch').style.display = mode==='ach' ? '' : 'none';
el('hvFldDirect').style.display = mode==='direct' ? '' : 'none';
var vel = num('hvVel'), rectH = num('hvRectH');
var errs = 0;
var Qls;
if(mode === 'ach'){
var L = num('hvL'), W = num('hvW'), H = num('hvH'), ach = num('hvACH');
errs += fieldError(el('hvL'), (isNaN(L) || L<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('hvW'), (isNaN(W) || W<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('hvH'), (isNaN(H) || H<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('hvACH'), (isNaN(ach) || ach<=0) ? 'Must be greater than 0.' : null);
var vol = L*W*H;
Qls = (vol * ach) * 1000 / 3600;
} else {
var Qd = num('hvQdirect');
errs += fieldError(el('hvQdirect'), (isNaN(Qd) || Qd<=0) ? 'Must be greater than 0.' : null);
Qls = Qd;
}
errs += fieldError(el('hvVel'), (isNaN(vel) || vel<=0) ? 'Velocity must be greater than 0.' : null);
errs += fieldError(el('hvRectH'), (isNaN(rectH) || rectH<=0) ? 'Height must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('hvValidation', errs); return; }
var Qm3s = Qls/1000;
var Qm3h = Qls*3.6;
var Qcfm = Qls*2.11888;
var area = Qm3s / vel;
var Dcirc = Math.sqrt(4*area/Math.PI) * 1000;
var rectW = (area*1e6) / rectH;
setText('hvDcirc', Math.round(Dcirc) + ' <small>mm</small>');
setText('hvQLs', fmt(Qls,0) + ' L/s');
setText('hvQm3h', fmt(Qm3h,0) + ' m³/h');
setText('hvQcfm', fmt(Qcfm,0) + ' CFM');
setText('hvArea', fmt(area,3) + ' m²');
setText('hvRect', Math.round(rectH) + ' × ' + Math.round(rectW) + ' mm');
updateValidationBanner('hvValidation', 0);
}
['hvL','hvW','hvH','hvACH','hvQdirect','hvVel','hvRectH'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcHvac); e.addEventListener('change', calcHvac); }
});
document.querySelectorAll('input[name="hvMode"]').forEach(function(r){ r.addEventListener('change', calcHvac); });
calcHvac();
function calcHvacDuct(){
if(!el('hdVel')) return;
var mode = (document.querySelector('input[name="hdMode"]:checked') || {}).value || 'ach';
el('hdFldAch').style.display = mode==='ach' ? '' : 'none';
el('hdFldDirect').style.display = mode==='direct' ? '' : 'none';
var vel = num('hdVel'), rectH = num('hdRectH');
var errs = 0;
var Qls;
if(mode === 'ach'){
var L = num('hdL'), W = num('hdW'), H = num('hdH'), ach = num('hdACH');
errs += fieldError(el('hdL'), (isNaN(L) || L<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('hdW'), (isNaN(W) || W<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('hdH'), (isNaN(H) || H<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('hdACH'), (isNaN(ach) || ach<=0) ? 'Must be greater than 0.' : null);
var vol = L*W*H;
Qls = (vol * ach) * 1000 / 3600;
} else {
var Qd = num('hdQdirect');
errs += fieldError(el('hdQdirect'), (isNaN(Qd) || Qd<=0) ? 'Must be greater than 0.' : null);
Qls = Qd;
}
errs += fieldError(el('hdVel'), (isNaN(vel) || vel<=0) ? 'Velocity must be greater than 0.' : null);
errs += fieldError(el('hdRectH'), (isNaN(rectH) || rectH<=0) ? 'Height must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('hdValidation', errs); return; }
var Qm3s = Qls/1000;
var Qm3h = Qls*3.6;
var Qcfm = Qls*2.11888;
var area = Qm3s / vel;
var Dcirc = Math.sqrt(4*area/Math.PI) * 1000;
var rectW = (area*1e6) / rectH;
setText('hdDcirc', Math.round(Dcirc) + ' <small>mm</small>');
setText('hdQLs', fmt(Qls,0) + ' L/s');
setText('hdQm3h', fmt(Qm3h,0) + ' m³/h');
setText('hdQcfm', fmt(Qcfm,0) + ' CFM');
setText('hdArea', fmt(area,3) + ' m²');
setText('hdRect', Math.round(rectH) + ' × ' + Math.round(rectW) + ' mm');
updateValidationBanner('hdValidation', 0);
}
['hdL','hdW','hdH','hdACH','hdQdirect','hdVel','hdRectH'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcHvacDuct); e.addEventListener('change', calcHvacDuct); }
});
document.querySelectorAll('input[name="hdMode"]').forEach(function(r){ r.addEventListener('change', calcHvacDuct); });
calcHvacDuct();
function calcCoolingLoad(){
if(!el('clQls')) return;
var Qls = num('clQls'), dt = num('clDt'), dw = num('clDw'), rho = num('clRho');
var errs = 0;
errs += fieldError(el('clQls'), (isNaN(Qls) || Qls<=0) ? 'Airflow must be greater than 0.' : null);
errs += fieldError(el('clDt'), (isNaN(dt) || dt<0) ? 'Temperature drop can\'t be negative.' : null);
errs += fieldError(el('clDw'), (isNaN(dw) || dw<0) ? 'Humidity ratio drop can\'t be negative.' : null);
errs += fieldError(el('clRho'), (isNaN(rho) || rho<=0) ? 'Air density must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('clValidation', errs); return; }
var Qm3s = Qls/1000;
var qSensible = 1.005 * rho * Qm3s * dt;
var qLatent = 2501 * rho * Qm3s * dw / 1000;
var qTotal = qSensible + qLatent;
var shr = qTotal>0 ? qSensible/qTotal : 0;
var tons = qTotal / 3.517;
setText('clTotal', fmt(qTotal,2) + ' <small>kW</small>');
setText('clSensible', fmt(qSensible,2) + ' kW');
setText('clLatent', fmt(qLatent,2) + ' kW');
setText('clShr', fmt(shr,2));
setText('clTons', fmt(tons,2) + ' TR');
updateValidationBanner('clValidation', 0);
}
['clQls','clDt','clDw','clRho'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcCoolingLoad); e.addEventListener('change', calcCoolingLoad); }
});
calcCoolingLoad();
function calcChiller(){
if(!el('chQcool')) return;
var qCool = num('chQcool'), cop = num('chCop'), hLatent = num('chLatentHeat');
var errs = 0;
errs += fieldError(el('chQcool'), (isNaN(qCool) || qCool<=0) ? 'Cooling duty must be greater than 0.' : null);
errs += fieldError(el('chCop'), (isNaN(cop) || cop<=0) ? 'COP must be greater than 0.' : null);
errs += fieldError(el('chLatentHeat'), (isNaN(hLatent) || hLatent<=0) ? 'Latent heat must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('chValidation', errs); return; }
var pCompressor = qCool / cop;
var qReject = qCool + pCompressor;
var tons = qCool / 3.517;
var mflow = (qCool / hLatent) * 3600;
setText('chPower', fmt(pCompressor,2) + ' <small>kW</small>');
setText('chReject', fmt(qReject,2) + ' kW');
setText('chTons', fmt(tons,2) + ' TR');
setText('chMflow', fmt(mflow,1) + ' kg/h');
updateValidationBanner('chValidation', 0);
}
['chQcool','chCop','chLatentHeat'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcChiller); e.addEventListener('change', calcChiller); }
});
calcChiller();
function calcHeat(){
if(!el('thWm2')) return;
var mode = (document.querySelector('input[name="thMode"]:checked') || {}).value || 'airflow';
el('thFldAirflow').style.display = mode==='airflow' ? '' : 'none';
el('thFldQuick').style.display = mode==='quick' ? '' : 'none';
var errs = 0;
var kw;
if(mode === 'airflow'){
var Q = num('thQ'), dt = num('thDt');
errs += fieldError(el('thQ'), (isNaN(Q) || Q<=0) ? 'Airflow must be greater than 0.' : null);
errs += fieldError(el('thDt'), (isNaN(dt) || dt<=0) ? 'ΔT must be greater than 0.' : null);
kw = (1.2 * Q * dt) / 1000;
} else {
var area = num('thArea'), wm2 = num('thWm2');
errs += fieldError(el('thArea'), (isNaN(area) || area<=0) ? 'Area must be greater than 0.' : null);
errs += fieldError(el('thWm2'), (isNaN(wm2) || wm2<=0) ? 'Load intensity must be greater than 0.' : null);
kw = (area * wm2) / 1000;
}
if(errs>0){ updateValidationBanner('thValidation', errs); return; }
setText('thKw', fmt(kw,2) + ' <small>kW</small>');
setText('thBtu', Math.round(kw*3412.14).toLocaleString() + ' BTU/h');
setText('thTons', fmt(kw*0.28434,2) + ' TR');
updateValidationBanner('thValidation', 0);
}
['thQ','thDt','thArea','thWm2'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcHeat); e.addEventListener('change', calcHeat); }
});
document.querySelectorAll('input[name="thMode"]').forEach(function(r){ r.addEventListener('change', calcHeat); });
calcHeat();
function calcBelt(){
if(!el('blD1')) return;
var D1 = num('blD1'), N1 = num('blN1'), D2 = num('blD2'), P = num('blP');
var beltMax = parseFloat(el('blType').value);
var errs = 0;
errs += fieldError(el('blD1'), (isNaN(D1) || D1<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('blN1'), (isNaN(N1) || N1<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('blD2'), (isNaN(D2) || D2<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('blP'), (isNaN(P) || P<=0) ? 'Must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('blValidation', errs); return; }
var N2 = N1 * D1 / D2;
var ratio = D2 / D1;
var vBelt = (Math.PI * (D1/1000) * N1) / 60;
var T1 = 9550 * P / N1;
var T2 = 9550 * P / N2;
setText('blN2', fmt(N2,0) + ' <small>RPM</small>');
setText('blRatio', fmt(ratio,2) + ' : 1');
setText('blVbelt', fmt(vBelt,2) + ' m/s');
setText('blT1', fmt(T1,1) + ' Nm');
setText('blT2', fmt(T2,1) + ' Nm');
if(vBelt > beltMax){
var b = el('blValidation');
b.className = 'validation-banner bad';
b.innerHTML = '<span class="vdot"></span><span>Belt speed ' + fmt(vBelt,1) + ' m/s exceeds the typical limit (' + beltMax + ' m/s) for the selected belt type — reconsider the pulley sizes or belt type.</span>';
} else {
updateValidationBanner('blValidation', 0);
}
}
['blD1','blN1','blD2','blP','blType'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcBelt); e.addEventListener('change', calcBelt); }
});
calcBelt();
function asRawRange(){
var sel = el('asSignal').value;
if(sel === '__custom__'){
return [num('asRawLo'), num('asRawHi')];
}
var parts = sel.split(',');
return [parseFloat(parts[0]), parseFloat(parts[1])];
}
function calcSignalScale(){
if(!el('asSignal')) return;
el('asCustomWrap').style.display = (el('asSignal').value === '__custom__') ? '' : 'none';
var range = asRawRange();
var rawLo = range[0], rawHi = range[1];
var euLo = num('asEuLo'), euHi = num('asEuHi');
var unit = (el('asEuUnit').value || '').trim();
var rawIn = num('asRawIn'), euIn = num('asEuIn');
var errs = 0;
errs += fieldError(el('asEuLo'), isNaN(euLo) ? 'Required.' : null);
errs += fieldError(el('asEuHi'), (isNaN(euHi) || euHi===euLo) ? 'Must differ from the low value.' : null);
if(el('asSignal').value === '__custom__'){
errs += fieldError(el('asRawHi'), (isNaN(rawLo) || isNaN(rawHi) || rawHi===rawLo) ? 'Raw range must be two different numbers.' : null);
}
errs += fieldError(el('asRawIn'), isNaN(rawIn) ? 'Required.' : null);
errs += fieldError(el('asEuIn'), isNaN(euIn) ? 'Required.' : null);
if(errs>0){ updateValidationBanner('asValidation', errs); return; }
var euOut = euLo + (rawIn - rawLo)/(rawHi - rawLo) * (euHi - euLo);
var rawOut = rawLo + (euIn - euLo)/(euHi - euLo) * (rawHi - rawLo);
setText('asEuOut', fmt(euOut,2) + (unit ? ' ' + unit : ''));
setText('asRawOut', fmt(rawOut,3));
var banner = el('asValidation');
if(rawIn < Math.min(rawLo,rawHi) - 1e-9 || rawIn > Math.max(rawLo,rawHi) + 1e-9){
banner.className = 'validation-banner bad';
banner.innerHTML = '<span class="vdot"></span><span>Raw reading is outside the configured ' + rawLo + '–' + rawHi + ' range — check for a sensor fault or an out-of-range process value.</span>';
} else {
updateValidationBanner('asValidation', 0);
}
}
['asSignal','asRawLo','asRawHi','asEuLo','asEuHi','asEuUnit','asRawIn','asEuIn'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcSignalScale); e.addEventListener('change', calcSignalScale); }
});
calcSignalScale();
function calcPidTuning(){
if(!el('pidK')) return;
var K = num('pidK'), tau = num('pidTau'), L = num('pidL');
var type = (document.querySelector('input[name="pidType"]:checked') || {}).value || 'PID';
var errs = 0;
errs += fieldError(el('pidK'), (isNaN(K) || K===0) ? 'Process gain must not be 0.' : null);
errs += fieldError(el('pidTau'), (isNaN(tau) || tau<=0) ? 'Time constant must be greater than 0.' : null);
errs += fieldError(el('pidL'), (isNaN(L) || L<=0) ? 'Dead time must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('pidValidation', errs); return; }
var Kp, Ti, Td;
if(type === 'P'){
Kp = tau/(K*L); Ti = NaN; Td = NaN;
} else if(type === 'PI'){
Kp = 0.9*tau/(K*L); Ti = L/0.3; Td = NaN;
} else {
Kp = 1.2*tau/(K*L); Ti = 2*L; Td = 0.5*L;
}
Kp = Math.abs(Kp);
setText('pidKp', fmt(Kp,3));
setText('pidTi', isNaN(Ti) ? '— (not used)' : fmt(Ti,2) + ' s');
setText('pidTd', isNaN(Td) ? '— (not used)' : fmt(Td,2) + ' s');
setText('pidKi', isNaN(Ti) ? '—' : fmt(Kp/Ti,4) + ' /s');
setText('pidKd', isNaN(Td) ? '—' : fmt(Kp*Td,3) + ' s');
updateValidationBanner('pidValidation', 0);
}
['pidK','pidTau','pidL'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcPidTuning); e.addEventListener('change', calcPidTuning); }
});
document.querySelectorAll('input[name="pidType"]').forEach(function(r){ r.addEventListener('change', calcPidTuning); });
calcPidTuning();
function calcValveSizing(){
if(!el('cvQ')) return;
var Q = num('cvQ'), dP = num('cvDp'), sg = num('cvSg');
var errs = 0;
errs += fieldError(el('cvQ'), (isNaN(Q) || Q<=0) ? 'Flow rate must be greater than 0.' : null);
errs += fieldError(el('cvDp'), (isNaN(dP) || dP<=0) ? 'Pressure drop must be greater than 0.' : null);
errs += fieldError(el('cvSg'), (isNaN(sg) || sg<=0) ? 'Specific gravity must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('cvValidation', errs); return; }
var Kv = Q * Math.sqrt(sg/dP);
var Cv = Kv * 1.156;
setText('cvKv', fmt(Kv,2));
setText('cvCv', fmt(Cv,2));
updateValidationBanner('cvValidation', 0);
}
['cvQ','cvDp','cvSg'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcValveSizing); e.addEventListener('change', calcValveSizing); }
});
calcValveSizing();
function calcLevelRanging(){
if(!el('lvRho')) return;
var rho = num('lvRho'), H = num('lvH');
var errs = 0;
errs += fieldError(el('lvRho'), (isNaN(rho) || rho<=0) ? 'Density must be greater than 0.' : null);
errs += fieldError(el('lvH'), (isNaN(H) || H<=0) ? 'Level span must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('lvValidation', errs); return; }
var pPa = rho * 9.81 * H;
var pKpa = pPa/1000;
var pMbar = pKpa*10;
var pInh2o = pKpa*4.0147;
setText('lvKpa', fmt(pKpa,2) + ' <small>kPa</small>');
setText('lvMbar', fmt(pMbar,1) + ' mbar');
setText('lvInh2o', fmt(pInh2o,2) + ' inH₂O');
setText('lv20ma', '100% level, ' + fmt(pKpa,2) + ' kPa');
updateValidationBanner('lvValidation', 0);
}
['lvRho','lvH'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcLevelRanging); e.addEventListener('change', calcLevelRanging); }
});
calcLevelRanging();
function calcVfdScaling(){
if(!el('vfFrated')) return;
var fRated = num('vfFrated'), nRated = num('vfNrated'), poles = num('vfPoles'), fTarget = num('vfFtarget');
var errs = 0;
errs += fieldError(el('vfFrated'), (isNaN(fRated) || fRated<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('vfNrated'), (isNaN(nRated) || nRated<=0) ? 'Must be greater than 0.' : null);
errs += fieldError(el('vfPoles'), (isNaN(poles) || poles<=0 || (poles%2)!==0) ? 'Must be a positive even number.' : null);
errs += fieldError(el('vfFtarget'), (isNaN(fTarget) || fTarget<=0) ? 'Must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('vfValidation', errs); return; }
var nsRated = 120*fRated/poles;
var slipRated = nsRated - nRated;
var nsTarget = 120*fTarget/poles;
var nTarget = nsTarget - slipRated;
setText('vfNout', Math.round(nTarget) + ' <small>RPM</small>');
setText('vfNsRated', Math.round(nsRated) + ' RPM');
setText('vfSlipRated', fmt(slipRated,1) + ' RPM');
setText('vfNsTarget', Math.round(nsTarget) + ' RPM');
setText('vfPct', fmt((fTarget/fRated)*100,1) + '%');
var banner = el('vfValidation');
if(slipRated < 0){
banner.className = 'validation-banner bad';
banner.innerHTML = '<span class="vdot"></span><span>Rated speed is above synchronous speed for this pole count — check the pole count and nameplate speed.</span>';
} else {
updateValidationBanner('vfValidation', 0);
}
}
['vfFrated','vfNrated','vfPoles','vfFtarget'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcVfdScaling); e.addEventListener('change', calcVfdScaling); }
});
calcVfdScaling();
})();
} catch(e) { console.error("app.js module #19 error:", e); }
try {
var CIVIL_NOTES_HTML = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Civil Learning Notes \u2014 Theory & Reference</title>\n<link rel=\"icon\" type=\"image/svg+xml\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='5' fill='%23262320'/%3E%3Cpath d='M6 24h20M8 24V13l8-6 8 6v11' fill='none' stroke='%23C9A24B' stroke-width='2'/%3E%3C/svg%3E\">\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap\" rel=\"stylesheet\">\n<style>\n  :root{\n    --base:#262320; --base-2:#302C27; --base-3:#3A352F;\n    --grid-line: rgba(201,162,75,.08);\n    --accent:#C9A24B; --accent-dim:#8C7233;\n    --vellum:#F6F1E4; --vellum-2:#EFE8D4; --vellum-line:#DCD2B4;\n    --ink:#241F14; --ink-dim:#6B6250; --ink-faint:#9A9078;\n    --paper-text:#E6DECB; --paper-text-dim:#A79E88;\n    --font-display:\"Oswald\",\"Arial Narrow\",-apple-system,sans-serif;\n    --font-body:\"Source Serif 4\",Georgia,serif;\n    --font-mono:\"IBM Plex Mono\",\"Cascadia Mono\",ui-monospace,monospace;\n  }\n  *{box-sizing:border-box;}\n  html{scroll-behavior:smooth;}\n  html,body{margin:0;background:var(--base);color:var(--paper-text);font-family:var(--font-body);}\n  body{\n    background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);\n    background-size: 28px 28px;\n    background-color:var(--base);\n  }\n  ::selection{background:rgba(201,162,75,.28);}\n  a{color:var(--accent);}\n  .wrap{max-width:960px;margin:0 auto;padding:0 20px;}\n  :focus-visible{outline:2px solid var(--accent); outline-offset:2px;}\n\n  .topbar{position:sticky;top:0;z-index:40;background:rgba(38,35,32,.92);backdrop-filter:blur(6px);border-bottom:1px solid rgba(201,162,75,.20);}\n  .topbar-inner{max-width:960px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}\n  .brand{display:flex;align-items:center;gap:9px;font-family:var(--font-display);font-weight:700;font-size:15px;letter-spacing:.02em;color:#F3EEDD;text-decoration:none;text-transform:uppercase;}\n  .brand .mark{color:var(--accent);font-size:16px;}\n  .searchbox{position:relative;flex:none;width:min(280px,60vw);}\n  .searchbox input{width:100%;background:var(--base-2);border:1px solid rgba(201,162,75,.20);border-radius:5px;color:var(--paper-text);font-family:var(--font-mono);font-size:12.5px;padding:9px 12px 9px 30px;outline:none;}\n  .searchbox input::placeholder{color:var(--paper-text-dim);}\n  .searchbox input:focus{border-color:var(--accent);}\n  .searchbox svg{position:absolute;left:9px;top:50%;transform:translateY(-50%);width:14px;height:14px;color:var(--paper-text-dim);pointer-events:none;}\n\n  .hero{padding:56px 0 8px;}\n  .eyebrow{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:14px;}\n  h1{font-family:var(--font-display);font-size:clamp(28px,5vw,42px);line-height:1.14;font-weight:700;color:#F6F1E4;margin:0 0 16px;letter-spacing:0;max-width:18ch;}\n  .hero-sub{font-family:var(--font-body);font-size:16px;line-height:1.65;color:var(--paper-text-dim);max-width:56ch;margin:0 0 22px;}\n  .hero-meta{display:flex;gap:22px;flex-wrap:wrap;padding-top:18px;border-top:1px solid rgba(201,162,75,.20);}\n  .hero-meta .m{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);}\n  .hero-meta .m b{display:block;color:#F6F1E4;font-size:19px;font-family:var(--font-display);font-weight:600;margin-bottom:2px;}\n\n  .board{margin:40px 0 6px;}\n  .board-label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--paper-text-dim);margin-bottom:14px;}\n  .board-label b{color:var(--accent);font-weight:600;}\n  .pillrow{display:flex;flex-wrap:wrap;gap:8px;}\n  .pill{\n    font-family:var(--font-mono);font-size:11px;letter-spacing:.02em;text-transform:uppercase;\n    background:var(--base-2);border:1px solid rgba(201,162,75,.20);color:var(--paper-text-dim);\n    border-radius:20px;padding:7px 14px;cursor:pointer;transition:all .15s;\n  }\n  .pill:hover{border-color:var(--accent);color:#F6F1E4;}\n  .pill[aria-pressed=\"true\"]{background:var(--accent);border-color:var(--accent);color:#1a1a1a;font-weight:600;}\n  .pill.is-all[aria-pressed=\"true\"]{background:#F6F1E4;border-color:#F6F1E4;}\n\n  .results-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:26px 0 6px;font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);flex-wrap:wrap;}\n  .results-meta .clear{background:none;border:1px solid rgba(201,162,75,.20);color:var(--accent);border-radius:4px;padding:5px 10px;cursor:pointer;font-family:var(--font-mono);font-size:10.5px;}\n  .results-meta .clear:hover{background:rgba(201,162,75,.1);}\n\n  .catsection{margin-top:36px;}\n  .catsection-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}\n  .catdot{width:9px;height:9px;border-radius:50%;flex:none;}\n  .catsection-head h2{font-family:var(--font-display);font-size:15px;font-weight:600;color:#F6F1E4;margin:0;letter-spacing:.01em;text-transform:uppercase;}\n  .catsection-head .catcount{font-family:var(--font-mono);font-size:10.5px;color:var(--paper-text-dim);}\n\n  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;}\n\n  .note-card{background:var(--vellum);border-radius:6px;border-left:4px solid var(--accent);box-shadow:0 2px 10px rgba(0,0,0,.24);overflow:hidden;}\n  .note-head{width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:14px 15px 12px;display:flex;flex-direction:column;gap:8px;font-family:inherit;color:inherit;}\n  .note-toprow{display:flex;justify-content:space-between;align-items:center;gap:8px;}\n  .note-tag{font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;}\n  .note-time{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);white-space:nowrap;}\n  .note-title{font-family:var(--font-display);font-size:14.5px;font-weight:600;color:var(--ink);line-height:1.35;margin:0;}\n  .note-summary{font-family:var(--font-body);font-size:12.5px;color:var(--ink-dim);line-height:1.55;margin:0;}\n  .note-toggle-hint{font-family:var(--font-mono);font-size:9.5px;color:var(--ink-faint);display:flex;align-items:center;gap:5px;margin-top:2px;}\n  .note-toggle-hint svg{width:9px;height:9px;transition:transform .15s ease;}\n  .note-card.open .note-toggle-hint svg{transform:rotate(180deg);}\n  .note-body{max-height:0;overflow:hidden;transition:max-height .28s ease;}\n  .note-card.open .note-body{max-height:900px;}\n  .note-body-inner{padding:0 15px 16px;border-top:1px solid var(--vellum-line);margin-top:2px;}\n  .note-body-inner p{font-family:var(--font-body);font-size:13px;line-height:1.7;color:var(--ink);margin:12px 0 0;}\n  .note-body-inner p:first-child{margin-top:14px;}\n\n  @media (prefers-reduced-motion: reduce){ html{scroll-behavior:auto;} .note-body, .note-card.open .note-toggle-hint svg{transition:none;} }\n\n  .empty-state{grid-column:1/-1;font-family:var(--font-mono);font-size:12px;color:var(--paper-text-dim);border:1px dashed rgba(201,162,75,.20);border-radius:6px;padding:26px;text-align:center;}\n\n  footer{margin:70px 0 40px;padding-top:22px;border-top:1px solid rgba(201,162,75,.20);}\n  .foot-note{font-family:var(--font-mono);font-size:11px;color:var(--paper-text-dim);line-height:1.7;max-width:64ch;}\n  .foot-mark{font-family:var(--font-mono);font-size:10px;color:var(--accent-dim);margin-top:16px;}\n</style>\n</head>\n<body>\n\n<div class=\"topbar\">\n  <div class=\"topbar-inner\">\n    <a class=\"brand\" href=\"#top\"><span class=\"mark\">\u25b3</span> CIVIL LEARNING NOTES</a>\n    <div class=\"searchbox\">\n      <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"7\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n      <input type=\"text\" id=\"searchInput\" placeholder=\"Search notes\u2026\" autocomplete=\"off\">\n    </div>\n  </div>\n</div>\n\n<div class=\"wrap\" id=\"top\">\n  <div class=\"hero\">\n    <div class=\"eyebrow\">Personal reference \u00b7 theory only</div>\n    <h1>Notes on how structures actually stand up.</h1>\n    <p class=\"hero-sub\">A running set of short, plain-language write-ups on core civil and structural engineering concepts \u2014 how loads move through a structure and why, not how to size one. There are no calculators or design tools on this page, and nothing here is invented: every note covers established, textbook-level civil engineering theory.</p>\n    <div class=\"hero-meta\">\n      <div class=\"m\"><b id=\"metaNoteCount\">0</b>notes</div>\n      <div class=\"m\"><b id=\"metaCatCount\">0</b>subjects</div>\n      <div class=\"m\"><b>0</b>calculators</div>\n    </div>\n  </div>\n\n  <div class=\"board\">\n    <div class=\"board-label\">Filter by subject \u2014 <b>select a pill</b> to narrow the list</div>\n    <div class=\"pillrow\" id=\"pillRow\"></div>\n  </div>\n\n  <div class=\"results-meta\">\n    <span id=\"resultsCount\"></span>\n    <button class=\"clear\" id=\"clearFilters\" type=\"button\">Reset filters</button>\n  </div>\n\n  <main id=\"noteSections\"></main>\n\n  <footer>\n    <p class=\"foot-note\">These are summary explanations written for learning and quick reference \u2014 they're deliberately simplified and aren't a substitute for the current edition of the relevant code (ACI 318, Eurocode 2/3/7, AISC 360, local building codes, etc.) or for a qualified structural/geotechnical engineer's judgement on a real project. No content on this page is generated per-visit or personalized \u2014 what you read is what's written into the page.</p>\n    <div class=\"foot-mark\">\u2014 end of foundation \u2014</div>\n  </footer>\n</div>\n\n<script>\n(function(){\n\n  var DATA = [{\"id\": \"structural\", \"label\": \"Structural Fundamentals\", \"color\": \"#C9A24B\", \"notes\": [{\"title\": \"How Loads Actually Travel Through a Building\", \"summary\": \"Every structure is really just a chain of load paths from roof to soil.\", \"body\": [\"Every load applied to a building \\u2014 its own weight, people, furniture, wind, snow \\u2014 has to travel through a continuous path of structural elements until it finally reaches the ground. A roof load goes into rafters or trusses, those into beams, beams into columns or walls, and columns or walls into footings, which finally spread it into the soil.\", \"This idea of a continuous load path is the single most useful mental model in structural engineering: a structure fails not because any one member was universally weak, but because somewhere along that chain, one link couldn't carry what arrived at it. Tracing the load path is usually the first step in understanding why a structural element is sized the way it is, or why a renovation that removes one wall can be far more consequential than it looks.\"]}, {\"title\": \"Dead Load vs Live Load vs Environmental Load\", \"summary\": \"Three categories of load, each estimated a completely different way.\", \"body\": [\"Dead load is the permanent, unchanging weight of the structure itself and anything permanently attached to it \\u2014 the concrete slab, the steel frame, finishes, fixed partitions. It's calculated directly from material densities and geometry, and it's present for the life of the structure at essentially the same magnitude.\", \"Live load is the variable load from occupancy and use \\u2014 people, furniture, stored goods, vehicles \\u2014 and it's not calculated from first principles but taken from code-specified minimum values based on the space's use (an office floor and a storage warehouse have very different live load allowances). Environmental loads \\u2014 wind, snow, seismic, thermal \\u2014 are different again, derived from statistical analysis of local climate and site data over a long return period, which is why they vary so much by location and why a structure's design load combination almost always considers dead, live and environmental loads acting together, not in isolation.\"]}, {\"title\": \"Tension, Compression, Bending and Shear\", \"summary\": \"Four ways a structural member can be asked to resist force \\u2014 and each one fails differently.\", \"body\": [\"A member in pure tension is being pulled apart, and it fails by the material simply reaching its tensile strength and pulling apart or yielding \\u2014 a cable or a tie rod is the clearest example. Compression is the opposite, a member being squeezed, and short, stocky compression members fail by crushing while slender ones fail by buckling \\u2014 suddenly bowing sideways well before the material itself is crushed.\", \"Bending combines tension and compression in the same member: a beam under load stretches on one face and compresses on the other, with a neutral axis in between carrying neither. Shear is different still \\u2014 it's the tendency for one part of a member to slide past the adjacent part, and it's usually highest near supports on a loaded beam, which is exactly why beams are often reinforced or thickened near their supports rather than uniformly along their length.\"]}, {\"title\": \"Factor of Safety and Load Combinations\", \"summary\": \"Why a structural calculation is never just 'does it hold the load'.\", \"body\": [\"Structural design doesn't simply check whether a member can carry its actual expected load \\u2014 it deliberately checks against loads inflated by load factors (typically 1.2 to 1.6 depending on load type) and member capacities reduced by resistance factors, building in margin on both sides of the calculation at once. This dual margin absorbs uncertainty in material properties, construction tolerances, and the load estimates themselves.\", \"Because different load types rarely all peak simultaneously \\u2014 full snow load and full seismic load hitting at the same instant is vanishingly unlikely \\u2014 codes specify load combinations that pair different loads at different factored magnitudes (like 1.2\\u00d7dead + 1.6\\u00d7live, or 1.2\\u00d7dead + 1.0\\u00d7live + 1.0\\u00d7seismic) and require the structure to be checked against every combination, with the worst case governing the final design.\"]}]}, {\"id\": \"concrete\", \"label\": \"Concrete & Masonry\", \"color\": \"#8C7233\", \"notes\": [{\"title\": \"Why Concrete Needs Reinforcement\", \"summary\": \"Concrete is excellent in compression and almost useless in tension \\u2014 steel fixes exactly that gap.\", \"body\": [\"Plain concrete is strong in compression but very weak in tension \\u2014 its tensile strength is typically only about a tenth of its compressive strength, and it cracks at fairly low tensile stress. A concrete beam loaded from above develops tension on its underside, which means unreinforced concrete would crack and fail there at a small fraction of the load it could otherwise carry in pure compression.\", \"Steel reinforcing bars are placed specifically in the zones expected to see tension, so the concrete handles compression and the steel handles tension \\u2014 each material doing the job it's actually good at. This is why reinforcement placement matters as much as reinforcement quantity: bars placed on the wrong face of a bending member do almost nothing useful, since they're sitting in the compression zone instead of the tension zone that actually needs them.\"]}, {\"title\": \"Curing: Why Concrete Needs Time and Moisture, Not Just Time\", \"summary\": \"Concrete doesn't dry to gain strength \\u2014 it reacts chemically, and that reaction needs water.\", \"body\": [\"Concrete gains strength through hydration, a chemical reaction between cement and water that continues for weeks after placement, not through simple drying. In fact, letting fresh concrete dry out too early starves that reaction of the water it needs and permanently reduces the strength the concrete would otherwise reach.\", \"That's why curing \\u2014 keeping concrete moist (or at least sealed against moisture loss) for a period after placement, commonly around seven days for a substantial share of ultimate strength \\u2014 is treated as a distinct and critical step, not an afterthought. Concrete that isn't cured properly can look identical to properly cured concrete while being noticeably weaker and more prone to surface cracking and durability problems later.\"]}, {\"title\": \"Why Masonry Walls Need Lateral Support\", \"summary\": \"A masonry wall is strong standing straight up and surprisingly weak pushed sideways.\", \"body\": [\"Masonry \\u2014 brick or block, typically laid up with mortar \\u2014 is very strong in compression, which is why it works well as a wall carrying vertical load straight down through its own thickness. It's far weaker resisting loads perpendicular to its face, like wind pressure or seismic shaking, because that kind of loading puts the mortar joints into tension, which unreinforced masonry resists poorly.\", \"This is why masonry walls, especially tall or slender ones, need lateral support at reasonable intervals \\u2014 from floor and roof diaphragms, pilasters, or steel reinforcement embedded in the wall \\u2014 to keep that sideways load from simply toppling the wall like a stack of unglued blocks. A wall that's perfectly adequate carrying roof load down to the foundation can still fail under a wind load its designer didn't specifically check for.\"]}]}, {\"id\": \"geotech\", \"label\": \"Geotechnical & Foundations\", \"color\": \"#6E93C7\", \"notes\": [{\"title\": \"Why Foundations Are Sized on Bearing Pressure, Not Just Load\", \"summary\": \"The same load spread over more area is a completely different problem for the soil underneath.\", \"body\": [\"Soil has a limited bearing capacity \\u2014 a maximum pressure it can sustain before it deforms excessively or fails in shear \\u2014 and that capacity depends heavily on soil type, density, moisture content and depth. A footing isn't sized simply to hold up a given load; it's sized so that the load, spread over the footing's contact area with the soil, produces a bearing pressure the soil can actually tolerate.\", \"This is exactly why a heavier building on weak soil needs a much larger footing (or a deep foundation like piles) than the same load on strong bedrock \\u2014 the load itself hasn't changed, but the soil's ability to accept pressure per unit area has. Allowable bearing pressure is normally established through a geotechnical investigation of the actual site, not assumed generically, because it can vary enormously between soil types and even across one site.\"]}, {\"title\": \"Settlement: The Failure Mode That Doesn't Look Like Failure\", \"summary\": \"A foundation can carry its design load perfectly and still cause real damage by sinking unevenly.\", \"body\": [\"Settlement is the gradual downward movement of a foundation as the soil beneath it compresses under load, and some settlement is essentially unavoidable \\u2014 soil isn't rigid. The real design concern usually isn't total settlement, which a structure can often tolerate if it happens uniformly, but differential settlement: one part of a foundation settling more than another, which twists and distorts the structure above it.\", \"Differential settlement is what actually cracks walls, jams doors, and tilts floors, often well before any bearing-capacity failure would occur \\u2014 which is why foundation design checks both bearing capacity (can the soil hold the pressure) and settlement (will the foundation sink unevenly enough to damage the structure) as two separate, both-necessary checks.\"]}, {\"title\": \"Shallow vs Deep Foundations: Why Sometimes You Skip the Soil Near the Surface Entirely\", \"summary\": \"When the ground right under a building isn't good enough, foundations reach past it instead.\", \"body\": [\"A shallow foundation \\u2014 a spread footing or a raft/mat slab \\u2014 transfers load into the soil relatively close to the ground surface, which works well when that near-surface soil is strong and stable enough to carry the load directly. It's the simpler, cheaper option wherever it's viable.\", \"A deep foundation \\u2014 piles or caissons \\u2014 instead carries load down past weak near-surface soil to reach stronger bearing material at depth, either by bearing directly on that stronger layer (end bearing) or by relying on friction along the pile's length through the soil it passes through (skin friction), or some combination of both. The choice between shallow and deep foundations is driven almost entirely by what a geotechnical investigation finds beneath the specific site \\u2014 the same building could reasonably use either, depending only on what's actually in the ground.\"]}, {\"title\": \"Angle of Repose and Why Excavations Cave In\", \"summary\": \"Loose soil can only hold a slope so steep before gravity simply wins.\", \"body\": [\"The angle of repose is the steepest angle a granular material can maintain in a stable pile or slope without sliding, and it depends on the material's internal friction \\u2014 coarse, angular material like crushed rock holds a steeper stable angle than fine, rounded material like loose sand. Cut a slope steeper than a soil's stable angle and it will eventually slump or slide to reach one, sometimes suddenly and without warning.\", \"This is the basic reason unsupported excavation trenches collapse, and why trench safety requirements mandate sloping, benching, or shoring past certain depths \\u2014 an excavation that looks stable when first dug can lose stability later as vibration, added surface load, or water infiltration reduces the soil's effective friction, which is exactly why trench safety rules apply for the whole time workers are exposed, not just at the moment of digging.\"]}]}, {\"id\": \"materials-construction\", \"label\": \"Materials & Construction\", \"color\": \"#4FA88F\", \"notes\": [{\"title\": \"Why Steel and Concrete Work Well Together\", \"summary\": \"A coincidence of physics that makes reinforced concrete possible at all.\", \"body\": [\"Reinforced concrete only works as a composite material because steel and concrete happen to expand and contract with temperature at almost exactly the same rate \\u2014 their thermal expansion coefficients are a close match. If they didn't match, temperature swings would cause the steel and surrounding concrete to expand by different amounts, cracking the concrete or breaking the bond between the two materials over repeated thermal cycles.\", \"That close thermal match, combined with concrete's naturally alkaline environment that helps passivate (protect) embedded steel from corrosion, is what allows steel bars to be embedded directly in concrete and rely on both materials staying bonded together and behaving predictably for decades \\u2014 a coincidence of chemistry and physics that reinforced concrete construction depends on entirely.\"]}, {\"title\": \"Why Rebar Corrosion Is a Structural Problem, Not Just Cosmetic\", \"summary\": \"Rusting steel doesn't just weaken itself \\u2014 it physically breaks the concrete around it.\", \"body\": [\"When embedded reinforcing steel corrodes, the rust it forms occupies significantly more volume than the original steel \\u2014 often several times more. That expansion generates enormous internal pressure inside the concrete surrounding the bar, which cracks and eventually spalls (breaks away) the concrete cover protecting it, long before the bar itself has lost much of its actual load-carrying cross-section.\", \"This is why corrosion damage in reinforced concrete tends to show up first as cracking and spalling near the surface rather than as an invisible internal weakening \\u2014 and why adequate concrete cover over reinforcement, and control of chloride exposure (from deicing salts or marine environments) that accelerates corrosion, are treated as critical durability requirements, not just workmanship details.\"]}, {\"title\": \"Formwork: The Temporary Structure That Shapes the Permanent One\", \"summary\": \"Before concrete can be a structure, something else has to be a structure first \\u2014 to hold the wet concrete in shape.\", \"body\": [\"Formwork is the temporary mold \\u2014 typically plywood, engineered panels, or steel forms braced and supported \\u2014 that holds fresh, wet concrete in the correct shape and position until it gains enough strength to support itself. Fresh concrete behaves essentially as a heavy fluid, exerting real lateral pressure on the formwork that increases with pour height and pour rate.\", \"Formwork has to be engineered as a genuine temporary structure in its own right, strong and stiff enough to resist that fluid pressure without bulging, leaking or collapsing \\u2014 a surprising share of concrete construction failures and injuries trace back to inadequate formwork design or premature formwork removal, not a flaw in the concrete mix or the permanent structural design itself.\"]}]}, {\"id\": \"standards\", \"label\": \"Codes & Standards\", \"color\": \"#B7A339\", \"notes\": [{\"title\": \"Building Codes vs Design Standards: Two Different Kinds of Document\", \"summary\": \"One tells you what's legally required; the other tells you how to actually calculate it.\", \"body\": [\"A building code (like the International Building Code, or a national equivalent) is the legally adopted document a jurisdiction enforces, setting minimum requirements for safety, accessibility, fire protection and structural adequacy \\u2014 it's law, or has the force of law, once adopted locally. Design standards (ACI 318 for concrete, AISC 360 for steel, ASCE 7 for loads) are technical documents, developed by engineering societies, that specify exactly how to calculate loads and design members to meet the code's requirements.\", \"Building codes typically reference these design standards by name and edition rather than repeating all their technical content directly \\u2014 which is why a structural calculation package cites both the governing building code and the specific design standard editions used, since the same code edition might reference different standard editions depending on when it was locally adopted.\"]}, {\"title\": \"Why Structural Drawings Get Independently Reviewed\", \"summary\": \"A second set of eyes on a calculation that, if wrong, doesn't announce itself until it's too late.\", \"body\": [\"Structural plan review and, on many projects, independent peer review exist because structural errors are unusually dangerous in a specific way: a beam sized slightly too small, or a load path with a hidden gap, can look entirely normal \\u2014 pass a casual glance, even function fine for years \\u2014 right up until the specific load combination that exposes the error actually occurs. There's often no visible warning sign along the way.\", \"Independent review catches transcription errors, missed load cases, and modeling mistakes that the original designer, having built the same mental model of the structure repeatedly, may simply not notice in their own work \\u2014 the value of a second reviewer is precisely that they come to the drawings without that same set of assumptions already in their head.\"]}]}];\n\n  var totalNotes = DATA.reduce(function(sum, cat){ return sum + cat.notes.length; }, 0);\n  document.getElementById('metaNoteCount').textContent = totalNotes;\n  document.getElementById('metaCatCount').textContent = DATA.length;\n\n  function wordCount(paras){ return paras.join(' ').trim().split(/\\s+/).length; }\n  function readTime(paras){ var words = wordCount(paras); var mins = Math.max(1, Math.round(words / 200)); return mins + ' min read'; }\n\n  var activeCategory = 'all';\n  var searchTerm = '';\n\n  var pillRow = document.getElementById('pillRow');\n  function makePill(id, label, count, isAll){\n    var btn = document.createElement('button');\n    btn.type = 'button';\n    btn.className = 'pill' + (isAll ? ' is-all' : '');\n    btn.setAttribute('aria-pressed', String(id === activeCategory));\n    btn.dataset.cat = id;\n    btn.textContent = label + ' (' + count + ')';\n    btn.addEventListener('click', function(){ activeCategory = id; render(); });\n    return btn;\n  }\n  function renderPills(){\n    pillRow.innerHTML = '';\n    pillRow.appendChild(makePill('all', 'All Subjects', totalNotes, true));\n    DATA.forEach(function(cat){ pillRow.appendChild(makePill(cat.id, cat.label, cat.notes.length, false)); });\n  }\n\n  function makeCard(cat, note){\n    var card = document.createElement('div');\n    card.className = 'note-card';\n    card.style.borderLeftColor = cat.color;\n\n    var head = document.createElement('button');\n    head.type = 'button';\n    head.className = 'note-head';\n    head.setAttribute('aria-expanded', 'false');\n\n    var top = document.createElement('div'); top.className = 'note-toprow';\n    var tag = document.createElement('span'); tag.className = 'note-tag'; tag.textContent = cat.label; tag.style.color = cat.color;\n    var time = document.createElement('span'); time.className = 'note-time'; time.textContent = readTime(note.body);\n    top.appendChild(tag); top.appendChild(time);\n\n    var title = document.createElement('h3'); title.className = 'note-title'; title.textContent = note.title;\n    var summary = document.createElement('p'); summary.className = 'note-summary'; summary.textContent = note.summary;\n\n    var hint = document.createElement('div'); hint.className = 'note-toggle-hint';\n    hint.innerHTML = '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>';\n    var hintText = document.createTextNode('Read note');\n    hint.appendChild(hintText);\n\n    head.appendChild(top); head.appendChild(title); head.appendChild(summary); head.appendChild(hint);\n\n    var body = document.createElement('div'); body.className = 'note-body';\n    var bodyInner = document.createElement('div'); bodyInner.className = 'note-body-inner';\n    note.body.forEach(function(paraText){ var p = document.createElement('p'); p.textContent = paraText; bodyInner.appendChild(p); });\n    body.appendChild(bodyInner);\n\n    head.addEventListener('click', function(){\n      var isOpen = card.classList.toggle('open');\n      head.setAttribute('aria-expanded', String(isOpen));\n      hint.replaceChild(document.createTextNode(isOpen ? 'Collapse' : 'Read note'), hint.lastChild);\n    });\n\n    card.appendChild(head);\n    card.appendChild(body);\n    return card;\n  }\n\n  function matchesSearch(note){\n    if(!searchTerm) return true;\n    var haystack = (note.title + ' ' + note.summary + ' ' + note.body.join(' ')).toLowerCase();\n    return haystack.indexOf(searchTerm) !== -1;\n  }\n\n  function render(){\n    Array.prototype.forEach.call(pillRow.children, function(btn){\n      btn.setAttribute('aria-pressed', String(btn.dataset.cat === activeCategory));\n    });\n\n    var sectionsEl = document.getElementById('noteSections');\n    sectionsEl.innerHTML = '';\n    var shown = 0;\n\n    var catsToShow = DATA.filter(function(cat){ return activeCategory === 'all' || activeCategory === cat.id; });\n\n    catsToShow.forEach(function(cat){\n      var visibleNotes = cat.notes.filter(matchesSearch);\n      if(visibleNotes.length === 0) return;\n      shown += visibleNotes.length;\n\n      var section = document.createElement('section');\n      section.className = 'catsection';\n\n      var head = document.createElement('div'); head.className = 'catsection-head';\n      var dot = document.createElement('span'); dot.className = 'catdot'; dot.style.background = cat.color;\n      var h2 = document.createElement('h2'); h2.textContent = cat.label;\n      var count = document.createElement('span'); count.className = 'catcount'; count.textContent = visibleNotes.length + (visibleNotes.length===1?' note':' notes');\n      head.appendChild(dot); head.appendChild(h2); head.appendChild(count);\n\n      var grid = document.createElement('div'); grid.className = 'grid';\n      visibleNotes.forEach(function(note){ grid.appendChild(makeCard(cat, note)); });\n\n      section.appendChild(head);\n      section.appendChild(grid);\n      sectionsEl.appendChild(section);\n    });\n\n    if(shown === 0){\n      var empty = document.createElement('div');\n      empty.className = 'empty-state';\n      empty.textContent = 'No notes match that search. Try a different term, or reset filters below.';\n      sectionsEl.appendChild(empty);\n    }\n\n    document.getElementById('resultsCount').textContent = 'Showing ' + shown + ' of ' + totalNotes + ' notes';\n  }\n\n  document.getElementById('searchInput').addEventListener('input', function(e){\n    searchTerm = e.target.value.trim().toLowerCase();\n    render();\n  });\n  document.getElementById('clearFilters').addEventListener('click', function(){\n    activeCategory = 'all';\n    searchTerm = '';\n    document.getElementById('searchInput').value = '';\n    render();\n  });\n\n  renderPills();\n  render();\n})();\n<\/script>\n\n</body>\n</html>\n";
} catch(e) { console.error("app.js module #20 error:", e); }
try {
(function(){
function num(id){ var el = document.getElementById(id); return el ? parseFloat(el.value) : NaN; }
function el(id){ return document.getElementById(id); }
function fmt(v, d){ if(!isFinite(v)) return '—'; return v.toFixed(d===undefined?2:d); }
function setText(id, html){ var e = el(id); if(e) e.innerHTML = html; }
function calcBeam(){
if(!el('cvbSpan')) return;
var L = num('cvbSpan'), type = el('cvbType').value, w = num('cvbW'), limitRatio = num('cvbLimit');
var Z = num('cvbZ'), I = num('cvbI'), E = num('cvbE'), allow = num('cvbAllow');
var errs = 0;
errs += fieldError(el('cvbSpan'), (isNaN(L) || L<=0) ? 'Span must be greater than 0.' : null);
errs += fieldError(el('cvbW'), (isNaN(w) || w<=0) ? 'Load must be greater than 0.' : null);
errs += fieldError(el('cvbZ'), (isNaN(Z) || Z<=0) ? 'Section modulus must be greater than 0.' : null);
errs += fieldError(el('cvbI'), (isNaN(I) || I<=0) ? 'Moment of inertia must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('cvBeamValidation', errs); return; }
var Lmm = L*1000, Zmm3 = Z*1000, Imm4 = I*1e4, Empa = E*1000;
var M, defl;
if(type==='udl'){
M = w*L*L/8;
var wNmm = w;
defl = (5*wNmm*Math.pow(Lmm,4)) / (384*Empa*Imm4);
} else {
var Pn = w*1000;
M = w*L/4;
defl = (Pn*Math.pow(Lmm,3)) / (48*Empa*Imm4);
}
var Mnmm = M*1e6;
var sigma = Mnmm/Zmm3;
var util = sigma/allow;
var deflLimitMm = Lmm/limitRatio;
setText('cvbM', fmt(M,2)+' <small>kNm</small>');
setText('cvbSigma', fmt(sigma,1)+' MPa');
setText('cvbUtil', fmt(util*100,0)+'%');
setText('cvbDefl', fmt(defl,2)+' mm');
setText('cvbDeflLimit', fmt(deflLimitMm,1)+' mm <small>(L/'+limitRatio+')</small>');
var bad = (util>1) || (defl>deflLimitMm);
var banner = el('cvBeamValidation');
if(bad){
banner.className = 'validation-banner bad';
var msgs=[];
if(util>1) msgs.push('bending stress exceeds allowable ('+fmt(util*100,0)+'%)');
if(defl>deflLimitMm) msgs.push('deflection exceeds the L/'+limitRatio+' limit');
banner.innerHTML = '<span class="vdot"></span><span>Fails: '+msgs.join(' and ')+'.</span>';
} else {
updateValidationBanner('cvBeamValidation', 0);
}
}
['cvbSpan','cvbType','cvbW','cvbLimit','cvbZ','cvbI','cvbE','cvbAllow'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcBeam); e.addEventListener('change', calcBeam); }
});
calcBeam();
function calcColumn(){
if(!el('cvcLe')) return;
var Le = num('cvcLe'), N = num('cvcN'), I = num('cvcI'), A = num('cvcA'), E = num('cvcE'), fos = num('cvcFos');
var errs = 0;
errs += fieldError(el('cvcLe'), (isNaN(Le) || Le<=0) ? 'Effective length must be greater than 0.' : null);
errs += fieldError(el('cvcI'), (isNaN(I) || I<=0) ? 'Moment of inertia must be greater than 0.' : null);
errs += fieldError(el('cvcA'), (isNaN(A) || A<=0) ? 'Area must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('cvColValidation', errs); return; }
var Lemm = Le*1000, Imm4 = I*1e4, Amm2 = A*100, Empa = E*1000;
var Pcr = (Math.PI*Math.PI*Empa*Imm4) / (Lemm*Lemm);
var PcrKn = Pcr/1000;
var r = Math.sqrt(I/A)*10;
var rcm = Math.sqrt(I/A);
var slend = (Le*1000) / (rcm*10);
var allowKn = PcrKn/fos;
var util = N/allowKn;
setText('cvcAllow', fmt(allowKn,1)+' <small>kN</small>');
setText('cvcPcr', fmt(PcrKn,1)+' kN');
setText('cvcR', fmt(rcm*10,1)+' mm');
setText('cvcSlend', fmt(slend,0));
setText('cvcUtil', fmt(util*100,0)+'%');
var banner = el('cvColValidation');
if(util>1){
banner.className='validation-banner bad';
banner.innerHTML = '<span class="vdot"></span><span>Applied load exceeds allowable capacity ('+fmt(util*100,0)+'% utilized).</span>';
} else if(slend>200){
banner.className='validation-banner bad';
banner.innerHTML = '<span class="vdot"></span><span>Slenderness ratio '+fmt(slend,0)+' is impractically high (&gt;200) — reconsider the section or bracing.</span>';
} else {
updateValidationBanner('cvColValidation', 0);
}
}
['cvcLe','cvcN','cvcI','cvcA','cvcE','cvcFos'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcColumn); e.addEventListener('change', calcColumn); }
});
calcColumn();
function calcFooting(){
if(!el('cvfN')) return;
var N = num('cvfN'), qa = num('cvfQa'), swPct = num('cvfSw'), roundMm = num('cvfRound');
var errs = 0;
errs += fieldError(el('cvfN'), (isNaN(N) || N<=0) ? 'Load must be greater than 0.' : null);
errs += fieldError(el('cvfQa'), (isNaN(qa) || qa<=0) ? 'Allowable bearing pressure must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('cvFtgValidation', errs); return; }
var totalLoad = N*(1+swPct/100);
var reqArea = totalLoad/qa;
var sideM = Math.sqrt(reqArea);
var roundM = (roundMm>0?roundMm:50)/1000;
var sideRounded = Math.ceil(sideM/roundM)*roundM;
var actualArea = sideRounded*sideRounded;
var actualQ = totalLoad/actualArea;
var util = actualQ/qa;
setText('cvfSize', fmt(sideRounded,2)+' <small>m × '+fmt(sideRounded,2)+' m</small>');
setText('cvfArea', fmt(reqArea,2)+' m²');
setText('cvfTotalLoad', fmt(totalLoad,1)+' kN');
setText('cvfActualQ', fmt(actualQ,1)+' kPa');
setText('cvfUtil', fmt(util*100,0)+'%');
updateValidationBanner('cvFtgValidation', 0);
}
['cvfN','cvfQa','cvfSw','cvfRound'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcFooting); e.addEventListener('change', calcFooting); }
});
calcFooting();
function calcWall(){
if(!el('cvwH')) return;
var H = num('cvwH'), gamma = num('cvwGamma'), phiDeg = num('cvwPhi'), B = num('cvwB'), W = num('cvwW'), mu = num('cvwMu');
var fosOtReq = num('cvwFosOt'), fosSlReq = num('cvwFosSl');
var errs = 0;
errs += fieldError(el('cvwH'), (isNaN(H) || H<=0) ? 'Height must be greater than 0.' : null);
errs += fieldError(el('cvwB'), (isNaN(B) || B<=0) ? 'Base width must be greater than 0.' : null);
errs += fieldError(el('cvwW'), (isNaN(W) || W<=0) ? 'Wall weight must be greater than 0.' : null);
if(errs>0){ updateValidationBanner('cvWallValidation', errs); return; }
var phi = phiDeg*Math.PI/180;
var Ka = (1-Math.sin(phi))/(1+Math.sin(phi));
var Pa = 0.5*Ka*gamma*H*H;
var Mo = Pa*(H/3);
var Mr = W*(B/2);
var fosOt = Mr/Mo;
var fosSl = (mu*W)/Pa;
setText('cvwPa', fmt(Pa,2)+' <small>kN/m</small>');
setText('cvwKa', fmt(Ka,3));
setText('cvwFosOtResult', fmt(fosOt,2)+' <small>(need ≥'+fmt(fosOtReq,1)+')</small>');
setText('cvwFosSlResult', fmt(fosSl,2)+' <small>(need ≥'+fmt(fosSlReq,1)+')</small>');
var otOk = fosOt>=fosOtReq, slOk = fosSl>=fosSlReq;
setText('cvwStatus', (otOk&&slOk) ? 'PASS' : 'FAIL');
var banner = el('cvWallValidation');
if(!otOk || !slOk){
banner.className='validation-banner bad';
var msgs=[];
if(!otOk) msgs.push('overturning FOS '+fmt(fosOt,2)+' is below the required '+fmt(fosOtReq,1));
if(!slOk) msgs.push('sliding FOS '+fmt(fosSl,2)+' is below the required '+fmt(fosSlReq,1));
banner.innerHTML = '<span class="vdot"></span><span>Fails: '+msgs.join(' and ')+'.</span>';
} else {
updateValidationBanner('cvWallValidation', 0);
}
}
['cvwH','cvwGamma','cvwPhi','cvwB','cvwW','cvwMu','cvwFosOt','cvwFosSl'].forEach(function(id){
var e = el(id); if(e){ e.addEventListener('input', calcWall); e.addEventListener('change', calcWall); }
});
calcWall();
var civFrame = document.getElementById('civNotesFrame');
if(civFrame) civFrame.srcdoc = CIVIL_NOTES_HTML;
})();
} catch(e) { console.error("app.js module #21 error:", e); }
try {
document.addEventListener('DOMContentLoaded', function(){
var catSelect = document.getElementById('civNoteCatSelect');
var newCatWrap = document.getElementById('civNoteNewCatWrap');
if(!catSelect) return;
catSelect.addEventListener('change', function(){
newCatWrap.style.display = (this.value === '__new__') ? '' : 'none';
});
function jsEscape(s){
    return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"');

  }



  document.getElementById('civNoteGenBtn').addEventListener('click', function(){

    var title = document.getElementById('civNoteTitle').value.trim();

    var summary = document.getElementById('civNoteSummary').value.trim();

    var bodyLines = document.getElementById('civNoteBody').value.split('\n').map(function(l){return l.trim();}).filter(Boolean);

    var cat = catSelect.value;

    var newCat = document.getElementById('civNoteNewCat').value.trim();



    var out = document.getElementById('civNoteOutput');

    if(!title || !summary || bodyLines.length===0){

      out.value = 'Fill in title, summary, and at least one body paragraph first.';

      return;

    }



    var noteObj = '        {\n          title:"'+jsEscape(title)+'",\n          summary:"'+jsEscape(summary)+'",\n          body:[\n'

      + bodyLines.map(function(l){ return '            "'+jsEscape(l)+'"'; }).join(',\n')

      + '\n          ]\n        }';



    if(cat === '__new__' && newCat){

      var slug = newCat.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

      out.value = '// New subject block — add this as a new entry in the DATA array (top level, alongside "structural" etc.):\n'

+ '    {\n      id:\''+slug+'\', label:\''+jsEscape(newCat)+'\', color:\'#C9A24B\',\n      notes:[\n'+noteObj+'\n      ]\n    }';
} else {
out.value = '// Paste this inside the "'+cat+'" subject\'s notes:[ ... ] array, as a new item:\n' + noteObj + ',';
}
});
document.getElementById('civNoteCopyBtn').addEventListener('click', function(){
var out = document.getElementById('civNoteOutput');
var statusEl = document.getElementById('civNoteCopyStatus');
if(!out.value){ statusEl.textContent = 'Generate the code first.'; return; }
out.select();
navigator.clipboard.writeText(out.value).then(function(){
statusEl.textContent = 'Copied — paste it into the DATA array in the Notes page source.';
}).catch(function(){
statusEl.textContent = "Couldn't auto-copy — the text is selected, use Ctrl/Cmd+C.";
});
});
});
} catch(e) { console.error("app.js module #22 error:", e); }
try {
(function(){
function num(id){ var el = document.getElementById(id); return el ? parseFloat(el.value) : NaN; }
function el(id){ return document.getElementById(id); }
function fmt(v, d){ if(!isFinite(v)) return '—'; return v.toFixed(d===undefined?2:d); }
function setText(id, html){ var e = el(id); if(e) e.innerHTML = html; }
var CATS = {
length:{label:'Length', units:[['mm','Millimetre (mm)'],['cm','Centimetre (cm)'],['m','Metre (m)'],['km','Kilometre (km)'],['in','Inch (in)'],['ft','Foot (ft)'],['yd','Yard (yd)'],['mi','Mile (mi)']],
factors:{mm:0.001,cm:0.01,m:1,km:1000,in:0.0254,ft:0.3048,yd:0.9144,mi:1609.344}},
mass:{label:'Mass', units:[['g','Gram (g)'],['kg','Kilogram (kg)'],['t','Tonne (t)'],['oz','Ounce (oz)'],['lb','Pound (lb)'],['ust','US ton (short)'],['lt','Long ton']],
factors:{g:0.001,kg:1,t:1000,oz:0.0283495231,lb:0.45359237,ust:907.18474,lt:1016.0469088}},
area:{label:'Area', units:[['mm2','mm²'],['cm2','cm²'],['m2','m²'],['ha','Hectare'],['km2','km²'],['in2','in²'],['ft2','ft²'],['acre','Acre'],['mi2','mi²']],
factors:{mm2:1e-6,cm2:1e-4,m2:1,ha:10000,km2:1e6,in2:0.00064516,ft2:0.09290304,acre:4046.8564224,mi2:2589988.110336}},
volume:{label:'Volume', units:[['ml','Millilitre (mL)'],['l','Litre (L)'],['m3','m³'],['in3','in³'],['ft3','ft³'],['usgal','US gallon'],['ukgal','UK (imperial) gallon']],
factors:{ml:0.001,l:1,m3:1000,in3:0.0163871,ft3:28.316846592,usgal:3.785411784,ukgal:4.54609}},
pressure:{label:'Pressure', units:[['pa','Pascal (Pa)'],['kpa','Kilopascal (kPa)'],['mpa','Megapascal (MPa)'],['bar','Bar'],['psi','psi'],['atm','Atmosphere (atm)'],['mmhg','mmHg']],
factors:{pa:1,kpa:1000,mpa:1e6,bar:1e5,psi:6894.757293168,atm:101325,mmhg:133.322387415}},
temperature:{label:'Temperature', units:[['c','Celsius (°C)'],['f','Fahrenheit (°F)'],['k','Kelvin (K)']], special:true},
force:{label:'Force', units:[['n','Newton (N)'],['kn','Kilonewton (kN)'],['lbf','Pound-force (lbf)'],['kgf','Kilogram-force (kgf)']],
factors:{n:1,kn:1000,lbf:4.4482216153,kgf:9.80665}},
torque:{label:'Torque', units:[['nm','Newton-metre (N·m)'],['knm','Kilonewton-metre (kN·m)'],['lbfft','Pound-force foot (lbf·ft)'],['lbfin','Pound-force inch (lbf·in)']],
factors:{nm:1,knm:1000,lbfft:1.3558179483,lbfin:0.1129848290}},
energy:{label:'Energy', units:[['j','Joule (J)'],['kj','Kilojoule (kJ)'],['kwh','Kilowatt-hour (kWh)'],['btu','BTU'],['cal','Calorie (cal)'],['kcal','Kilocalorie (kcal)']],
factors:{j:1,kj:1000,kwh:3600000,btu:1055.05585262,cal:4.184,kcal:4184}},
power:{label:'Power', units:[['w','Watt (W)'],['kw','Kilowatt (kW)'],['mw','Megawatt (MW)'],['hp','Horsepower, mechanical (hp)'],['btuh','BTU/h']],
factors:{w:1,kw:1000,mw:1e6,hp:745.6998715823,btuh:0.29307107}},
speed:{label:'Speed', units:[['ms','Metres/second (m/s)'],['kmh','Kilometres/hour (km/h)'],['mph','Miles/hour (mph)'],['fts','Feet/second (ft/s)'],['knot','Knot']],
factors:{ms:1,kmh:0.277777778,mph:0.44704,fts:0.3048,knot:0.514444444}}
};
var CAT_ORDER = ['length','mass','area','volume','pressure','temperature','force','torque','energy','power','speed'];
function tempToC(v, unit){
if(unit==='c') return v;
if(unit==='f') return (v-32)*5/9;
return v - 273.15;
}
function tempFromC(c, unit){
if(unit==='c') return c;
if(unit==='f') return c*9/5+32;
return c + 273.15;
}
function populateUnitConverter(){
var catSel = el('ucCat');
if(!catSel) return;
catSel.innerHTML = '';
CAT_ORDER.forEach(function(key){
var o = document.createElement('option');
o.value = key; o.textContent = CATS[key].label;
catSel.appendChild(o);
});
catSel.addEventListener('change', function(){ populateUnitSelects(); convertUnits(); });
populateUnitSelects();
['ucFromVal','ucFromUnit','ucToUnit'].forEach(function(id){
el(id).addEventListener('input', convertUnits);
el(id).addEventListener('change', convertUnits);
});
convertUnits();
}
function populateUnitSelects(){
var cat = CATS[el('ucCat').value];
var fromSel = el('ucFromUnit'), toSel = el('ucToUnit');
fromSel.innerHTML = ''; toSel.innerHTML = '';
cat.units.forEach(function(pair, i){
var o1 = document.createElement('option'); o1.value = pair[0]; o1.textContent = pair[1];
var o2 = document.createElement('option'); o2.value = pair[0]; o2.textContent = pair[1];
fromSel.appendChild(o1); toSel.appendChild(o2);
});
fromSel.selectedIndex = 0;
toSel.selectedIndex = cat.units.length > 1 ? 1 : 0;
}
function convertUnits(){
var catKey = el('ucCat').value;
var cat = CATS[catKey];
var v = num('ucFromVal');
var fromU = el('ucFromUnit').value, toU = el('ucToUnit').value;
if(isNaN(v)){ setText('ucResult', '—'); return; }
var result;
if(cat.special){
result = tempFromC(tempToC(v, fromU), toU);
} else {
var base = v * cat.factors[fromU];
result = base / cat.factors[toU];
}
var toLabel = cat.units.filter(function(u){ return u[0]===toU; })[0];
setText('ucResult', fmt(result, Math.abs(result) < 1 ? 6 : 4) + ' <small>' + (toLabel?toLabel[0]:toU) + '</small>');
}
populateUnitConverter();
var LANGS = [['es','Spanish'],['fr','French'],['pt','Portuguese'],['de','German'],['pl','Polish']];
var TERMS = [
{en:'Stop', es:'Alto / Pare', fr:'Arrêt / Stop', pt:'Pare', de:'Stopp / Halt', pl:'Stop'},
{en:'Danger', es:'Peligro', fr:'Danger', pt:'Perigo', de:'Gefahr', pl:'Niebezpieczeństwo'},
{en:'Warning', es:'Advertencia', fr:'Avertissement', pt:'Aviso', de:'Warnung', pl:'Ostrzeżenie'},
{en:'Caution', es:'Precaución', fr:'Attention', pt:'Cuidado', de:'Vorsicht', pl:'Uwaga'},
{en:'High voltage', es:'Alto voltaje', fr:'Haute tension', pt:'Alta tensão', de:'Hochspannung', pl:'Wysokie napięcie'},
{en:'Hard hat', es:'Casco de seguridad', fr:'Casque de sécurité', pt:'Capacete de segurança', de:'Schutzhelm', pl:'Kask ochronny'},
{en:'Safety glasses', es:'Gafas de seguridad', fr:'Lunettes de sécurité', pt:'Óculos de segurança', de:'Schutzbrille', pl:'Okulary ochronne'},
{en:'Safety vest', es:'Chaleco de seguridad', fr:'Gilet de sécurité', pt:'Colete de segurança', de:'Warnweste', pl:'Kamizelka odblaskowa'},
{en:'Gloves', es:'Guantes', fr:'Gants', pt:'Luvas', de:'Handschuhe', pl:'Rękawice'},
{en:'Ear protection', es:'Protección auditiva', fr:'Protection auditive', pt:'Proteção auricular', de:'Gehörschutz', pl:'Ochrona słuchu'},
{en:'Harness', es:'Arnés', fr:'Harnais', pt:'Arnês', de:'Sicherheitsgurt', pl:'Uprząż bezpieczeństwa'},
{en:'Wet floor', es:'Piso mojado', fr:'Sol mouillé', pt:'Piso molhado', de:'Nasser Boden', pl:'Mokra podłoga'},
{en:'No entry', es:'No entrar', fr:'Entrée interdite', pt:'Entrada proibida', de:'Kein Zutritt', pl:'Wstęp wzbroniony'},
{en:'Authorized personnel only', es:'Solo personal autorizado', fr:'Personnel autorisé seulement', pt:'Somente pessoal autorizado', de:'Nur autorisiertes Personal', pl:'Tylko dla upoważnionego personelu'},
{en:'Emergency exit', es:'Salida de emergencia', fr:'Sortie de secours', pt:'Saída de emergência', de:'Notausgang', pl:'Wyjście awaryjne'},
{en:'Fire', es:'Incendio / Fuego', fr:'Feu / Incendie', pt:'Incêndio / Fogo', de:'Feuer', pl:'Pożar / Ogień'},
{en:'Fire extinguisher', es:'Extintor de incendios', fr:'Extincteur', pt:'Extintor de incêndio', de:'Feuerlöscher', pl:'Gaśnica'},
{en:'First aid', es:'Primeros auxilios', fr:'Premiers secours', pt:'Primeiros socorros', de:'Erste Hilfe', pl:'Pierwsza pomoc'},
{en:'Emergency', es:'Emergencia', fr:'Urgence', pt:'Emergência', de:'Notfall', pl:'Nagły wypadek'},
{en:'Injured', es:'Herido', fr:'Blessé', pt:'Ferido', de:'Verletzt', pl:'Ranny'},
{en:'Hospital', es:'Hospital', fr:'Hôpital', pt:'Hospital', de:'Krankenhaus', pl:'Szpital'},
{en:'Lockout/Tagout', es:'Bloqueo y etiquetado', fr:'Verrouillage/étiquetage', pt:'Bloqueio e etiquetagem', de:'Verriegelung und Kennzeichnung', pl:'Blokada i oznakowanie'},
{en:'Confined space', es:'Espacio confinado', fr:'Espace confiné', pt:'Espaço confinado', de:'Enger Raum', pl:'Przestrzeń zamknięta'},
{en:'Trench', es:'Zanja', fr:'Tranchée', pt:'Vala', de:'Graben', pl:'Wykop'},
{en:'Scaffolding', es:'Andamio', fr:'Échafaudage', pt:'Andaime', de:'Gerüst', pl:'Rusztowanie'},
{en:'Crane', es:'Grúa', fr:'Grue', pt:'Guindaste', de:'Kran', pl:'Dźwig'},
{en:'Forklift', es:'Montacargas', fr:'Chariot élévateur', pt:'Empilhadeira', de:'Gabelstapler', pl:'Wózek widłowy'},
{en:'Excavation', es:'Excavación', fr:'Excavation', pt:'Escavação', de:'Aushub', pl:'Wykop'},
{en:'Overhead hazard', es:'Peligro aéreo', fr:'Danger aérien', pt:'Perigo aéreo', de:'Gefahr von oben', pl:'Zagrożenie z góry'},
{en:'Keep clear', es:'Manténgase alejado', fr:'Restez à l\u2019écart', pt:'Mantenha-se afastado', de:'Bereich freihalten', pl:'Zachować odległość'},
{en:'Do you understand?', es:'¿Entiende?', fr:'Comprenez-vous ?', pt:'Você entende?', de:'Verstehen Sie?', pl:'Czy rozumiesz?'},
{en:'Yes', es:'Sí', fr:'Oui', pt:'Sim', de:'Ja', pl:'Tak'},
{en:'No', es:'No', fr:'Non', pt:'Não', de:'Nein', pl:'Nie'}
];
function langLabel(code){
var m = LANGS.filter(function(l){ return l[0]===code; })[0];
return m ? m[1] : code;
}
function renderTranslator(){
var listEl = el('pbList');
if(!listEl) return;
var term = (el('pbSearch').value || '').trim().toLowerCase();
var langChoice = el('pbLang').value;
var shown = TERMS.filter(function(t){
if(!term) return true;
if(t.en.toLowerCase().indexOf(term)!==-1) return true;
return LANGS.some(function(l){ return (t[l[0]]||'').toLowerCase().indexOf(term)!==-1; });
});
listEl.innerHTML = '';
shown.forEach(function(t){
var row = document.createElement('div');
row.style.cssText = 'padding:12px 0;border-bottom:1px solid var(--line);';
var enLine = document.createElement('div');
enLine.textContent = t.en;
enLine.style.cssText = 'font-family:var(--font-body);font-weight:600;color:var(--ink);margin-bottom:6px;';
row.appendChild(enLine);
var langsToShow = langChoice==='all' ? LANGS : LANGS.filter(function(l){ return l[0]===langChoice; });
if(langChoice==='all'){
var grid = document.createElement('div');
grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:6px 16px;';
langsToShow.forEach(function(l){
var cell = document.createElement('div');
cell.style.cssText = 'font-family:var(--font-mono);font-size:12px;color:var(--ink-dim);';
cell.innerHTML = '<span style="text-transform:uppercase;letter-spacing:.04em;font-size:9.5px;color:var(--ink-faint);">'+l[1]+'</span><br>'+t[l[0]];
grid.appendChild(cell);
});
row.appendChild(grid);
} else {
var big = document.createElement('div');
big.style.cssText = 'font-family:var(--font-body);font-size:16px;color:var(--blue);';
big.textContent = t[langChoice];
row.appendChild(big);
}
listEl.appendChild(row);
});
setText('pbCount', shown.length + ' of ' + TERMS.length + ' terms shown' + (langChoice!=='all' ? ' — translated to ' + langLabel(langChoice) + '.' : ', all languages.'));
}
if(el('pbSearch')){
el('pbSearch').addEventListener('input', renderTranslator);
el('pbLang').addEventListener('change', renderTranslator);
renderTranslator();
}
function parseDateInput(id){
var v = el(id).value;
if(!v) return null;
var d = new Date(v + 'T00:00:00');
return isNaN(d.getTime()) ? null : d;
}
var WEEKDAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function formatDate(d){
return WEEKDAY_NAMES[d.getDay()] + ', ' + MONTH_NAMES[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}
function calcDateAdd(){
var start = parseDateInput('dcStartDate');
var days = num('dcDays');
if(!start || isNaN(days)){ setText('dcResultDate','—'); return; }
var result = new Date(start.getTime());
result.setDate(result.getDate() + Math.round(days));
setText('dcResultDate', formatDate(result));
}
function calcDateBetween(){
var a = parseDateInput('dcDateA'), b = parseDateInput('dcDateB');
if(!a || !b){ setText('dcTotalDays','—'); setText('dcWeeks','—'); setText('dcWeekdays','—'); return; }
var start = a < b ? a : b, end = a < b ? b : a;
var totalDays = Math.round((end - start) / 86400000);
var weeks = Math.floor(totalDays / 7), remDays = totalDays % 7;
var weekdayCount = 0;
var d = new Date(start.getTime());
for(var i=0;i<totalDays;i++){
d.setDate(d.getDate()+1);
var wd = d.getDay();
if(wd!==0 && wd!==6) weekdayCount++;
}
setText('dcTotalDays', totalDays + ' <small>days</small>');
setText('dcWeeks', weeks + ' wk ' + remDays + ' d');
setText('dcWeekdays', weekdayCount + ' days');
}
['dcStartDate','dcDays'].forEach(function(id){ var e=el(id); if(e){ e.addEventListener('input',calcDateAdd); e.addEventListener('change',calcDateAdd); } });
['dcDateA','dcDateB'].forEach(function(id){ var e=el(id); if(e){ e.addEventListener('input',calcDateBetween); e.addEventListener('change',calcDateBetween); } });
if(el('dcStartDate')){
var today = new Date();
var iso = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
el('dcStartDate').value = iso;
el('dcDateA').value = iso;
var later = new Date(today.getTime()); later.setDate(later.getDate()+14);
el('dcDateB').value = later.getFullYear() + '-' + String(later.getMonth()+1).padStart(2,'0') + '-' + String(later.getDate()).padStart(2,'0');
calcDateAdd();
calcDateBetween();
}
function calcMarkupMargin(){
if(!el('mmCost')) return;
var cost = num('mmCost'), sell = num('mmSell');
if(isNaN(cost) || isNaN(sell) || cost<=0){
setText('mmMarkup','—'); setText('mmMargin','—'); setText('mmProfit','—');
return;
}
var profit = sell - cost;
var markup = (profit/cost)*100;
var margin = sell!==0 ? (profit/sell)*100 : NaN;
setText('mmMarkup', fmt(markup,1) + '<small>%</small>');
setText('mmMargin', fmt(margin,1) + '%');
setText('mmProfit', fmt(profit,2));
}
['mmCost','mmSell'].forEach(function(id){ var e=el(id); if(e){ e.addEventListener('input',calcMarkupMargin); e.addEventListener('change',calcMarkupMargin); } });
calcMarkupMargin();
function calcPctChange(){
if(!el('pcOld')) return;
var o = num('pcOld'), n = num('pcNew');
if(isNaN(o) || isNaN(n) || o===0){ setText('pcChange','—'); return; }
var pct = ((n-o)/Math.abs(o))*100;
setText('pcChange', (pct>=0?'+':'') + fmt(pct,1) + '<small>%</small>');
}
['pcOld','pcNew'].forEach(function(id){ var e=el(id); if(e){ e.addEventListener('input',calcPctChange); e.addEventListener('change',calcPctChange); } });
calcPctChange();
function gcd(a,b){ return b ? gcd(b, a % b) : a; }
function calcFracToDecimal(){
if(!el('frFeet')) return;
var feet = num('frFeet'), inches = num('frInches'), frac = parseFloat(el('frFraction').value);
if(isNaN(feet) || isNaN(inches)){ setText('frDecFeet','—'); setText('frDecInches','—'); setText('frMm','—'); return; }
var totalInches = feet*12 + inches + frac;
var decFeet = totalInches/12;
var mm = totalInches * 25.4;
setText('frDecFeet', fmt(decFeet,4) + ' <small>ft</small>');
setText('frDecInches', fmt(totalInches,4) + ' in');
setText('frMm', fmt(mm,1) + ' mm');
}
['frFeet','frInches','frFraction'].forEach(function(id){ var e=el(id); if(e){ e.addEventListener('input',calcFracToDecimal); e.addEventListener('change',calcFracToDecimal); } });
calcFracToDecimal();
function calcDecimalToFrac(){
if(!el('frDecIn')) return;
var decIn = num('frDecIn');
if(isNaN(decIn)){ setText('frNearest','—'); return; }
var sign = decIn < 0 ? -1 : 1;
var absIn = Math.abs(decIn);
var sixteenths = Math.round(absIn * 16);
var feet = Math.floor(sixteenths / (16*12));
var remAfterFeet = sixteenths - feet*16*12;
var wholeInches = Math.floor(remAfterFeet / 16);
var frac16 = remAfterFeet % 16;
var fracStr = '';
if(frac16 > 0){
var g = gcd(frac16, 16);
fracStr = ' ' + (frac16/g) + '/' + (16/g);
}
var out = (sign<0 ? '-' : '');
if(feet > 0) out += feet + "' ";
out += wholeInches + fracStr + '"';
setText('frNearest', out);
}
if(el('frDecIn')){ el('frDecIn').addEventListener('input', calcDecimalToFrac); el('frDecIn').addEventListener('change', calcDecimalToFrac); calcDecimalToFrac(); }
var BASE_RE = {2:/^[01]+$/, 8:/^[0-7]+$/, 10:/^[0-9]+$/, 16:/^[0-9a-fA-F]+$/};
function fromBase(str, base){
if(!str) return NaN;
if(!BASE_RE[base].test(str)) return NaN;
return parseInt(str, base);
}
function updateBases(sourceId, sourceBase){
var str = el(sourceId).value.trim();
var val = fromBase(str, sourceBase);
var hint = el('nbHint');
if(isNaN(val)){
hint.textContent = 'Invalid characters for that base — check the value.';
hint.style.color = 'var(--red)';
return;
}
hint.textContent = 'Type in any field — the other three update to match.';
hint.style.color = '';
if(sourceId!=='nbDec') el('nbDec').value = val.toString(10);
if(sourceId!=='nbHex') el('nbHex').value = val.toString(16).toUpperCase();
if(sourceId!=='nbBin') el('nbBin').value = val.toString(2);
if(sourceId!=='nbOct') el('nbOct').value = val.toString(8);
}
if(el('nbDec')){
el('nbDec').addEventListener('input', function(){ updateBases('nbDec',10); });
el('nbHex').addEventListener('input', function(){ updateBases('nbHex',16); });
el('nbBin').addEventListener('input', function(){ updateBases('nbBin',2); });
el('nbOct').addEventListener('input', function(){ updateBases('nbOct',8); });
}
})();
} catch(e) { console.error("app.js module #23 error:", e); }
