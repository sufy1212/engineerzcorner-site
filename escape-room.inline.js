(function () {
  "use strict";

  function svg(inner) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + inner + "</svg>";
  }

  var ICONS = {
    reactor: svg('<path d="M12 2 2 20h20L12 2z"/><path d="M12 9v5"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>'),
    flood: svg('<path d="M12 3s7 7.5 7 12.5a7 7 0 0 1-14 0C5 10.5 12 3 12 3z"/>'),
    chiller: svg('<path d="M12 2v20M4.9 6.9l14.2 10.2M19.1 6.9 4.9 17.1"/><path d="M8 4l4 3 4-3M8 20l4-3 4 3M2.5 9.5l4 2.5-4 2.5M21.5 9.5l-4 2.5 4 2.5"/>'),
    substation: svg('<path d="M13 2 4 14h7l-1 8 10-12h-7l1-8z"/>')
  };

  var LOCK_CLOSED = svg('<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>');
  var LOCK_OPEN = svg('<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.4-2"/>');

  // ---------- Scenario content ----------
  var SCENARIOS = [
    {
      id: "reactor",
      title: "Reactor Control Room",
      tagline: "Reactor control room, alarm panel flashing",
      brief: "The board is screaming and half the readouts don't make sense. Answer each panel correctly to reset it and move to the next door.",
      color: "#FF5252",
      icon: "reactor",
      timeBudget: 240,
      pool: [
        { q: "The level transmitter's 4-20mA loop suddenly reads 0.00 mA instead of dropping toward 4mA. What's the most likely cause?", options: ["The vessel is completely empty (0% level)", "A wire break or loss of loop power", "The transmitter is over-ranged high", "Normal reading during startup"], correct: 1, note: "0mA never occurs on a healthy live-zero loop — 4mA is 0%, so 0mA means the loop itself is dead." },
        { q: "A control loop settles into a steady, constant-amplitude oscillation no matter how the tuning is adjusted. What's the classic cause?", options: ["Proportional gain set too low", "Integral time set too long", "Valve stiction / mechanical deadband", "Correct tuning for a noisy process"], correct: 2, note: "A limit cycle that won't respond to re-tuning usually points to valve stiction, not the PID constants." },
        { q: "High-high alarm setpoints should sit ___ the high alarm setpoint, with a deadband between them.", options: ["Below it", "Further from normal (above it)", "Exactly equal to it", "At a random offset"], correct: 1, note: "High-high needs to be further from normal than the high alarm, with a deadband gap so both don't chatter together." },
        { q: "Cold junction compensation fails on a Type K thermocouple loop. What happens to the readout?", options: ["It shifts by roughly the cold-junction temperature error", "It reads exactly zero", "It reads perfectly fine, no effect", "The signal inverts sign"], correct: 0, note: "Without CJC, the reading is offset by whatever temperature the reference junction actually sits at." },
        { q: "Two field devices on the same RS-485 Modbus RTU bus are wired with the same slave address. What happens?", options: ["The master automatically renegotiates addresses", "Bus speed increases", "Responses collide and both come back garbled", "Nothing — addresses don't matter on RS-485"], correct: 2, note: "Duplicate slave addresses on one bus means both devices answer the same poll — the responses collide." },
        { q: "A PT100 RTD reads a resistance below 100Ω. What does that tell you about the process temperature?", options: ["It's above 0°C", "It's below 0°C", "The RTD has failed open", "Resistance doesn't relate to temperature on an RTD"], correct: 1, note: "PT100 = 100Ω at 0°C, and resistance rises with temperature — so a reading below 100Ω means it's colder than 0°C." },
        { q: "A pressure transmitter is scaled 4-20mA = 0-150 psi. The panel meter reads 12.00 mA. What's the actual pressure?", options: ["50 psi", "60 psi", "75 psi", "100 psi"], correct: 2, note: "12mA is (12-4)/16 = 50% of span, and 50% of 150 psi is 75 psi." },
        { q: "A 24VDC relay coil is rated for 40mA. The PLC digital output driving it is rated for 500mA per point. Is this a safe pairing?", options: ["No — the coil draws far too much current for the output", "Yes — 40mA is well within the output's 500mA rating", "Only if a second output is paralleled in", "It depends on the relay's coil voltage tolerance"], correct: 1, note: "40mA is a small fraction of a 500mA-rated output — plenty of headroom." }
      ]
    },
    {
      id: "flood",
      title: "Flooding Pipe Gallery",
      tagline: "Underground pipe gallery, water rising around your boots",
      brief: "Every valve wheel and gauge down here is a puzzle standing between you and dry ground. Get each one right before the water gets any higher.",
      color: "#3B82F6",
      icon: "flood",
      timeBudget: 240,
      pool: [
        { q: "A pump starts crackling and its flow keeps dropping. What should you check first?", options: ["Discharge pressure gauge reading", "NPSH available versus NPSH required at the suction", "Motor nameplate voltage", "Impeller paint condition"], correct: 1, note: "Crackling/rattling with falling flow is the textbook sign of cavitation — check suction-side NPSH first." },
        { q: "A 50 m straight steel pipe run heats from 20°C to 80°C. Using α ≈ 12×10⁻⁶ /°C for steel, roughly how much does it grow in length?", options: ["About 3.6 mm", "About 36 mm", "About 360 mm", "About 0.36 mm"], correct: 1, note: "ΔL = L·α·ΔT = 50,000mm × 12×10⁻⁶ × 60°C ≈ 36 mm — that's why long runs need expansion loops or joints." },
        { q: "Flow velocity through a turbulent pipe run is doubled. What happens to the frictional head loss?", options: ["It roughly doubles", "It stays about the same", "It roughly quadruples", "It's cut in half"], correct: 2, note: "Turbulent friction loss scales with velocity squared, so doubling velocity roughly quadruples the head loss." },
        { q: "A centrifugal pump's speed is cut in half. Per the pump affinity laws, what happens to flow, head, and power?", options: ["Flow halves, head quarters, power drops to 1/8", "All three simply halve", "Flow halves, head halves, power stays the same", "Nothing changes except flow"], correct: 0, note: "Affinity laws: flow ∝ speed, head ∝ speed², power ∝ speed³ — so half speed means 1/2 flow, 1/4 head, 1/8 power." },
        { q: "A control valve is badly oversized for its service and runs mostly near-closed. What's the main operating risk?", options: ["It will use noticeably less electricity", "Poor controllability and accelerated seat/plug erosion", "The pipe will run cooler", "No real downside beyond upfront cost"], correct: 1, note: "Running an oversized valve nearly shut gives poor control resolution and hammers the seat and plug with high-velocity throttling." },
        { q: "A flat belt is visibly slipping under load and the driven pulley is running slow. What's the first thing to try?", options: ["Replace the motor with a bigger one", "Increase belt tension within the rated range", "Reduce the pulley diameter", "Add more lubricant to the belt"], correct: 1, note: "Slipping under load is almost always a tension problem first — check and correct tension before changing hardware." },
        { q: "The same torque wrench setting is applied to a bolt with a well-lubricated thread instead of a dry one. What happens to actual clamping force?", options: ["It drops significantly", "It stays exactly the same", "It rises significantly — risking overload", "Lubrication has no effect on preload"], correct: 2, note: "Torque mostly overcomes friction. Lubrication cuts friction, so more of the same torque converts into clamping force — often too much." },
        { q: "A check valve gets installed backwards in a pipeline. What's the most likely result?", options: ["No noticeable effect at all", "Flow is blocked and the pump deadheads", "The valve will simply pass flow in both directions", "Pipe pressure rating automatically increases"], correct: 1, note: "A reversed check valve blocks forward flow entirely — the pump ends up running against a closed valve." }
      ]
    },
    {
      id: "chiller",
      title: "Chiller Plant Freeze Alarm",
      tagline: "Mechanical room, frost creeping across the chiller lines",
      brief: "Frost is forming somewhere it shouldn't and the freeze alarm won't stop. Clear each system check to shut the alarm down and get out.",
      color: "#00E5C7",
      icon: "chiller",
      timeBudget: 240,
      pool: [
        { q: "An evaporator coil is icing up even though the room temperature reads normal. What's the most common cause?", options: ["Thermostat set too high", "Low refrigerant charge or restricted airflow across the coil", "Outdoor temperature is too warm", "Compressor oil level is too high"], correct: 1, note: "Low charge or blocked airflow drops evaporator temperature below freezing, icing the coil even with a normal room reading." },
        { q: "A TXV-controlled system is running unusually low superheat at the evaporator outlet. What does that usually indicate?", options: ["The TXV is starving the coil of refrigerant", "The TXV is overfeeding — risking liquid slugging back to the compressor", "The compressor is oversized", "Superheat has no relation to TXV behavior"], correct: 1, note: "Low superheat means too much refrigerant is boiling off late or not at all — classic sign of an overfeeding, stuck-open TXV." },
        { q: "Duct airflow (CFM) is held constant while duct velocity is increased. What must happen to the duct's cross-sectional area?", options: ["It must increase", "It must decrease", "It stays the same", "Area and velocity aren't related"], correct: 1, note: "CFM = velocity × area, so with airflow fixed, higher velocity requires smaller cross-sectional area." },
        { q: "During a hard freeze warning, an AHU's outside-air damper is found stuck fully open. What's the main risk?", options: ["Higher humidity only, nothing structural", "Coil freeze-up from too much cold outside air", "Increased fan noise only", "No real risk in winter operation"], correct: 1, note: "A stuck-open OA damper in freezing weather can drop coil temperature enough to freeze standing water in the coil and crack it." },
        { q: "Subcooling at the condenser outlet is running higher than normal. What does that typically point to?", options: ["Refrigerant undercharge", "System overcharge or a restriction downstream", "A dirty air filter only", "Nothing — high subcooling is always fine"], correct: 1, note: "Excess subcooling usually means there's more liquid backed up in the condenser than normal — overcharge or a downstream restriction." },
        { q: "A VFD-driven supply fan is slowed to 50% speed. Per the fan affinity laws, roughly what happens to its power draw?", options: ["Drops to about 50%", "Drops to about 25%", "Drops to about 12.5%", "Stays the same"], correct: 2, note: "Fan power scales with the cube of speed, so 50% speed is roughly 0.5³ = 12.5% of full power." },
        { q: "New duct branches were added after a renovation without resizing or changing the fan. Design static pressure is now higher than before. What happens to airflow?", options: ["Airflow increases automatically", "The fan moves less air at the new, higher-resistance operating point", "Airflow is completely unaffected", "The fan motor automatically speeds up to compensate"], correct: 1, note: "A fixed-speed fan's operating point shifts along its curve — added resistance without a speed change means less delivered airflow." },
        { q: "A zone thermostat's deadband is set far too tight. What's the main consequence?", options: ["More stable temperature control", "Rapid short-cycling of the compressor", "Lower energy use overall", "No measurable effect"], correct: 1, note: "A too-tight deadband makes the compressor start and stop far more often than it should — short-cycling wears equipment fast." }
      ]
    },
    {
      id: "substation",
      title: "Substation Blackout",
      tagline: "Outdoor substation yard, breakers tripped, half the lights dead",
      brief: "Something upstream faulted and took half the yard with it. Work through the protection and sizing checks to get the lights back and the gate unlocked.",
      color: "#FFC24B",
      icon: "substation",
      timeBudget: 240,
      pool: [
        { q: "A distribution transformer runs continuously loaded above its nameplate kVA rating. What's the main long-term risk?", options: ["Slightly lower output voltage, nothing else", "Overheating and accelerated insulation aging", "Automatic self-derating with no downside", "Improved efficiency at higher load"], correct: 1, note: "Sustained overload drives winding temperatures up, which accelerates insulation breakdown and shortens transformer life." },
        { q: "Both an upstream breaker and the downstream feeder breaker trip together for the same downstream fault. What does that tell you?", options: ["The system is perfectly coordinated", "Protection coordination/selectivity has failed", "This is expected, normal behavior", "The fault was unusually small"], correct: 1, note: "Proper coordination means the downstream breaker clears the fault alone while the upstream one waits — both tripping together is a coordination failure." },
        { q: "A busbar's cross-sectional area is doubled while carrying the same current. What happens to current density?", options: ["It roughly doubles", "It stays the same", "It roughly halves", "Current density isn't related to bar area"], correct: 2, note: "Current density is current divided by area, so doubling the area roughly halves the density — reducing I²R heating." },
        { q: "A solar PV array's real-world output is consistently below its nameplate STC rating even in strong sun. Is that abnormal?", options: ["Yes, it means the panels are defective", "No — temperature, soiling, wiring, and inverter losses normally derate output below STC", "Yes, it means the inverter is oversized", "No, STC ratings already include all real-world losses"], correct: 1, note: "STC ratings are measured under lab conditions; real installations always lose some output to temperature, soiling, wiring, and conversion losses." },
        { q: "Short-circuit / fault current calculations at a substation are used primarily to size what?", options: ["Cable color coding", "Breaker and protective device interrupting capacity", "Transformer oil volume", "Grounding grid paint spec"], correct: 1, note: "Fault studies determine the worst-case current a breaker must be able to safely interrupt — that sets its required rating." },
        { q: "A generator's AVR (automatic voltage regulator) fails and terminal voltage sags under load. What system should you check?", options: ["The governor / prime mover speed control", "The excitation system controlled by the AVR", "The cooling water pump", "The fuel injection timing"], correct: 1, note: "The AVR controls excitation and therefore output voltage — the governor controls speed/frequency, a separate control loop." },
        { q: "For a standard across-the-line motor start, inrush current is typically about how many times the full-load running current?", options: ["About 1–2×", "About 6–8×", "About 15–20×", "It equals full-load current"], correct: 1, note: "Direct-on-line starting typically pulls roughly 6–8× full-load current for a brief moment at startup." },
        { q: "Which fault type generally produces the highest fault current magnitude in most power systems?", options: ["Single line-to-ground fault", "Line-to-line fault", "Three-phase bolted fault", "High-impedance arcing fault"], correct: 2, note: "A three-phase bolted fault is the classic worst case used to set maximum interrupting duty for protective devices." }
      ]
    }
  ];

  var WRONG_PENALTY = 20;
  var HINT_PENALTY = 15;
  var DOOR_COUNT = 5;

  // ---------- DOM refs ----------
  var startScreen = document.getElementById("startScreen");
  var gameScreen = document.getElementById("gameScreen");
  var winScreen = document.getElementById("winScreen");
  var loseScreen = document.getElementById("loseScreen");
  var scenarioGrid = document.getElementById("scenarioGrid");
  var clockVal = document.getElementById("clockVal");
  var missVal = document.getElementById("missVal");
  var doorsRow = document.getElementById("doorsRow");
  var timerFill = document.getElementById("timerFill");
  var briefBox = document.getElementById("briefBox");
  var doorTag = document.getElementById("doorTag");
  var questionText = document.getElementById("questionText");
  var optionsArea = document.getElementById("optionsArea");
  var hintBtn = document.getElementById("hintBtn");
  var bestVal = document.getElementById("bestVal");
  var toast = document.getElementById("toast");

  var scenario = null, run = null, timerHandle = null;

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function getBest(id) {
    try { var v = localStorage.getItem("ecrEscapeBest_" + id); return v ? parseInt(v, 10) : null; } catch (e) { return null; }
  }
  function setBest(id, sec) {
    try { localStorage.setItem("ecrEscapeBest_" + id, String(Math.round(sec))); } catch (e) {}
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function showToast(msg, bad) {
    toast.textContent = msg;
    toast.classList.toggle("bad", !!bad);
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 1400);
  }

  // ---------- Scenario picker ----------
  function renderScenarioGrid() {
    scenarioGrid.innerHTML = "";
    SCENARIOS.forEach(function (s) {
      var best = getBest(s.id);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "er-scenario-card";
      btn.style.setProperty("--scen-c", s.color);
      btn.innerHTML =
        '<span class="er-scenario-icon">' + ICONS[s.icon] + '</span>' +
        '<span class="er-scenario-body">' +
          '<h4>' + s.title + '</h4>' +
          '<p>' + s.tagline + '</p>' +
          '<span class="er-scenario-meta">' +
            '<span class="er-scenario-chip">' + fmtTime(s.timeBudget) + ' clock</span>' +
            '<span class="er-scenario-chip">5 doors</span>' +
            (best ? '<span class="er-scenario-chip">Best ' + fmtTime(best) + '</span>' : '') +
          '</span>' +
        '</span>';
      btn.addEventListener("click", function () { startRun(s); });
      scenarioGrid.appendChild(btn);
    });
  }

  // ---------- Run lifecycle ----------
  function startRun(s) {
    scenario = s;
    var picked = shuffle(s.pool).slice(0, DOOR_COUNT);
    run = {
      doors: picked.map(function (q) {
        var order = shuffle(q.options.map(function (opt, i) { return i; }));
        return {
          q: q.q,
          note: q.note,
          options: order.map(function (i) { return q.options[i]; }),
          correctIdx: order.indexOf(q.correct)
        };
      }),
      doorIdx: 0,
      timeLeft: s.timeBudget,
      misses: 0,
      hints: 0,
      hintUsedThisDoor: false,
      eliminated: []
    };
    startScreen.classList.add("hidden");
    winScreen.classList.add("hidden");
    loseScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    var best = getBest(s.id);
    bestVal.textContent = best ? fmtTime(best) : "--:--";
    briefBox.innerHTML = "<b>" + s.tagline + ".</b> " + s.brief;
    renderDoors();
    renderDoor();
    timerHandle && clearInterval(timerHandle);
    timerHandle = setInterval(tick, 100);
  }

  function renderDoors() {
    doorsRow.innerHTML = "";
    for (var i = 0; i < DOOR_COUNT; i++) {
      var d = document.createElement("span");
      d.className = "er-door" + (i < run.doorIdx ? " open" : i === run.doorIdx ? " current" : "");
      d.innerHTML = i < run.doorIdx ? LOCK_OPEN : LOCK_CLOSED;
      doorsRow.appendChild(d);
    }
  }

  function renderDoor() {
    var d = run.doors[run.doorIdx];
    run.hintUsedThisDoor = false;
    hintBtn.disabled = false;
    hintBtn.style.opacity = 1;
    hintBtn.textContent = "🔍 Eliminate one (−15s)";
    doorTag.textContent = "Door " + (run.doorIdx + 1) + " of " + DOOR_COUNT;
    questionText.textContent = d.q;
    optionsArea.innerHTML = "";
    var letters = ["A", "B", "C", "D"];
    d.options.forEach(function (opt, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "er-opt";
      b.innerHTML = '<span class="er-opt-letter">' + letters[i] + '</span><span>' + opt + '</span>';
      b.addEventListener("click", function () { onAnswer(i, b); });
      optionsArea.appendChild(b);
    });
  }

  function tick() {
    run.timeLeft -= 0.1;
    var pct = Math.max(0, (run.timeLeft / scenario.timeBudget) * 100);
    timerFill.style.width = pct + "%";
    var warn = run.timeLeft < scenario.timeBudget * 0.25;
    timerFill.classList.toggle("warn", warn);
    clockVal.classList.toggle("warn", warn);
    clockVal.textContent = fmtTime(run.timeLeft);
    missVal.textContent = run.misses;
    if (run.timeLeft <= 0) {
      clearInterval(timerHandle);
      endRun(false);
    }
  }

  function onAnswer(i, btn) {
    var d = run.doors[run.doorIdx];
    if (i === d.correctIdx) {
      btn.classList.add("correct");
      showToast(d.note || "Door unlocked.");
      setTimeout(function () {
        run.doorIdx++;
        if (run.doorIdx >= DOOR_COUNT) {
          clearInterval(timerHandle);
          endRun(true);
        } else {
          renderDoors();
          renderDoor();
        }
      }, 900);
      // disable the row immediately so a fast double-click can't register twice
      Array.prototype.forEach.call(optionsArea.querySelectorAll(".er-opt"), function (b) { b.style.pointerEvents = "none"; });
    } else {
      btn.classList.add("wrong");
      run.misses++;
      run.timeLeft = Math.max(0, run.timeLeft - WRONG_PENALTY);
      showToast("Wrong lever — " + WRONG_PENALTY + "s penalty.", true);
      setTimeout(function () { btn.classList.remove("wrong"); }, 400);
    }
  }

  hintBtn.addEventListener("click", function () {
    if (run.hintUsedThisDoor) return;
    run.hintUsedThisDoor = true;
    run.hints++;
    hintBtn.disabled = true;
    hintBtn.style.opacity = 0.5;
    run.timeLeft = Math.max(0, run.timeLeft - HINT_PENALTY);
    var d = run.doors[run.doorIdx];
    var opts = optionsArea.querySelectorAll(".er-opt");
    var wrongIdxs = [];
    opts.forEach(function (b, i) { if (i !== d.correctIdx) wrongIdxs.push(i); });
    var kill = wrongIdxs[Math.floor(Math.random() * wrongIdxs.length)];
    opts[kill].classList.add("eliminated");
    showToast("One wrong lever eliminated.");
  });

  function endRun(won) {
    gameScreen.classList.add("hidden");
    if (won) {
      var timeUsed = scenario.timeBudget - run.timeLeft;
      var best = getBest(scenario.id);
      if (best === null || timeUsed < best) { setBest(scenario.id, timeUsed); best = timeUsed; }
      document.getElementById("winTime").textContent = fmtTime(timeUsed);
      document.getElementById("winMisses").textContent = run.misses;
      document.getElementById("winHints").textContent = run.hints;
      document.getElementById("winBest").textContent = fmtTime(best);
      winScreen.classList.remove("hidden");
    } else {
      document.getElementById("loseSub").textContent = "Time ran out at door " + (run.doorIdx + 1) + " of " + DOOR_COUNT + " in the " + scenario.title + ".";
      document.getElementById("loseMisses").textContent = run.misses;
      document.getElementById("loseHints").textContent = run.hints;
      loseScreen.classList.remove("hidden");
    }
  }

  function backToScenarios() {
    winScreen.classList.add("hidden");
    loseScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    renderScenarioGrid();
  }

  document.getElementById("againBtnWin").addEventListener("click", function () { startRun(scenario); });
  document.getElementById("againBtnLose").addEventListener("click", function () { startRun(scenario); });
  document.getElementById("backBtnWin").addEventListener("click", backToScenarios);
  document.getElementById("backBtnLose").addEventListener("click", backToScenarios);

  renderScenarioGrid();
})();
