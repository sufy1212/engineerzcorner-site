/* Engineerz CorneR — universal "Share result" button
   Usage: ecShareSetup(buttonEl, function(){ return {title, text, url}; });
   Tries the native OS share sheet first (navigator.share). If unavailable
   (most desktop browsers), shows a small popover with WhatsApp / X /
   LinkedIn / Copy link options instead. */
(function () {
  function closeExistingPopovers() {
    document.querySelectorAll(".ecs-pop").forEach(function (p) {
      p.remove();
    });
  }

  function positionPopover(pop, anchor) {
    var r = anchor.getBoundingClientRect();
    pop.style.position = "fixed";
    var top = r.bottom + 8;
    if (top + 210 > window.innerHeight) top = Math.max(8, r.top - 8 - 210);
    pop.style.top = top + "px";
    var left = Math.min(window.innerWidth - 208, Math.max(8, r.left));
    pop.style.left = left + "px";
  }

  function fallbackCopy(str) {
    var ta = document.createElement("textarea");
    ta.value = str;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function showPopover(anchor, data) {
    closeExistingPopovers();
    var text = data.text || "";
    var url = data.url || location.href;
    var shareStr = (text + " " + url).trim();

    var pop = document.createElement("div");
    pop.className = "ecs-pop";
    pop.innerHTML =
      '<a class="ecs-pop-item" target="_blank" rel="noopener" href="https://wa.me/?text=' +
      encodeURIComponent(shareStr) +
      '"><span class="ecs-pop-ic">💬</span>WhatsApp</a>' +
      '<a class="ecs-pop-item" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(text) +
      "&url=" +
      encodeURIComponent(url) +
      '"><span class="ecs-pop-ic">𝕏</span>X</a>' +
      '<a class="ecs-pop-item" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=' +
      encodeURIComponent(url) +
      '"><span class="ecs-pop-ic">in</span>LinkedIn</a>' +
      '<button type="button" class="ecs-pop-item ecs-copy-btn"><span class="ecs-pop-ic">🔗</span>Copy link</button>';

    document.body.appendChild(pop);
    positionPopover(pop, anchor);

    pop.querySelector(".ecs-copy-btn").addEventListener("click", function () {
      var btn = this;
      var done = function () {
        btn.innerHTML = '<span class="ecs-pop-ic">✅</span>Copied!';
        setTimeout(function () {
          pop.remove();
        }, 700);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareStr).then(done).catch(function () {
          fallbackCopy(shareStr);
          done();
        });
      } else {
        fallbackCopy(shareStr);
        done();
      }
    });

    setTimeout(function () {
      document.addEventListener("click", function outside(e) {
        if (!pop.contains(e.target) && e.target !== anchor) {
          pop.remove();
          document.removeEventListener("click", outside);
        }
      });
    }, 0);
  }

  window.ecShareSetup = function (btn, getData) {
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var data = typeof getData === "function" ? getData() : getData;
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else {
        showPopover(btn, data);
      }
    });
  };
})();
