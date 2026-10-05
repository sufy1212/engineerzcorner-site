/* Creator credit: byline, footer credit, Person schema, Share/Cite button.
   EDIT ONLY THE CONFIG BELOW. While `name` is empty this script does nothing. */
(function () {
  var CREATOR = {
    name: "Syed Sufyanuddin",                 // e.g. "Your Full Name"
    jobTitle: "Senior Electrical Engineer",             // e.g. "Electrical Engineer"
    bio: "I love learning every part of engineering and helping other engineers, which is why I created Engineerz CorneR: free, practical tools and notes for engineers and students.",                  // 2-3 sentences: your background and why you built the site
    photo: "",                // optional, e.g. "/assets/me.jpg"
    linkedin: "https://www.linkedin.com/in/syed-sufyanuddin-b106a762",             // e.g. "https://www.linkedin.com/in/yourname"
    github: "",               // optional
    youtube: "",              // optional
    extraProfiles: []         // optional extra URLs
  };
  if (!CREATOR.name) return;

  var SITE = "Engineerz CorneR";
  var ORIGIN = "https://www.engineerzcorner.com";
  var path = location.pathname.replace(/index\.html$/, "");
  var isHome = path === "/" || path === "";
  var aboutUrl = ORIGIN + "/about";

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in (attrs || {})) e.setAttribute(k, attrs[k]);
    if (html) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  var sameAs = [CREATOR.linkedin, CREATOR.github, CREATOR.youtube].concat(CREATOR.extraProfiles).filter(Boolean);

  function init() {
    // 1) Person schema (sitewide) so search engines tie the site to the creator's name
    var person = { "@context": "https://schema.org", "@type": "Person", "name": CREATOR.name, "url": aboutUrl, "sameAs": sameAs };
    if (CREATOR.jobTitle) person.jobTitle = CREATOR.jobTitle;
    person.owns = { "@type": "WebSite", "name": SITE, "url": ORIGIN + "/" };
    var ld = el("script", { type: "application/ld+json" });
    ld.textContent = JSON.stringify(person);
    document.head.appendChild(ld);

    // 2) Footer credit
    var links = [];
    if (CREATOR.linkedin) links.push('<a href="' + esc(CREATOR.linkedin) + '" rel="me noopener" target="_blank">LinkedIn</a>');
    if (CREATOR.github) links.push('<a href="' + esc(CREATOR.github) + '" rel="me noopener" target="_blank">GitHub</a>');
    var credit = el("div", { class: "ec-creator-credit" },
      'Built by <a href="' + aboutUrl + '" rel="author">' + esc(CREATOR.name) + '</a>' +
      (links.length ? ' &middot; ' + links.join(' &middot; ') : ''));
    var footer = document.querySelector("footer.site-footer") || document.querySelector("footer");
    if (footer) footer.appendChild(credit); else document.body.appendChild(credit);

    // 3) Byline + 4) Share/Cite button under the page title (not on the homepage)
    if (!isHome) {
      var h1 = document.querySelector("main h1, article h1, h1");
      if (h1 && !document.querySelector(".ec-byline")) {
        var bar = el("div", { class: "ec-byline" },
          '<span>By <a href="' + aboutUrl + '" rel="author">' + esc(CREATOR.name) + '</a></span>' +
          '<button type="button" class="ec-share" aria-label="Share or cite this page">Share / Cite</button>');
        h1.insertAdjacentElement("afterend", bar);
        var btn = bar.querySelector(".ec-share");
        btn.addEventListener("click", function () {
          var title = document.title.replace(/\s*[—|-]\s*Engineerz.*$/i, "");
          var url = location.origin + location.pathname;
          var cite = title + " — " + SITE + ", by " + CREATOR.name + ". " + url;
          if (navigator.share) {
            navigator.share({ title: title, text: title + " — by " + CREATOR.name, url: url }).catch(function () {});
            return;
          }
          var done = function () { btn.textContent = "Copied!"; setTimeout(function () { btn.textContent = "Share / Cite"; }, 1800); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(cite).then(done, function () { window.prompt("Copy this citation:", cite); });
          else window.prompt("Copy this citation:", cite);
        });
      }
    }


    // 5) "About the creator" section on the About page
    if (/^\/about\/?$|^\/about\.html$/.test(location.pathname) && CREATOR.bio && !document.querySelector(".ec-about-creator")) {
      var sec = el("section", { class: "ec-about-creator" },
        (CREATOR.photo ? '<img src="' + esc(CREATOR.photo) + '" alt="' + esc(CREATOR.name) + '" width="96" height="96">' : '') +
        '<div><h2>About the creator</h2><p><strong>' + esc(CREATOR.name) + '</strong>' + (CREATOR.jobTitle ? ' &mdash; ' + esc(CREATOR.jobTitle) : '') + '</p><p>' + esc(CREATOR.bio) + '</p>' +
        (links.length ? '<p>' + links.join(' &middot; ') + '</p>' : '') + '</div>');
      var h2 = document.querySelector("main h2, article h2, h2");
      if (h2) h2.parentNode.insertBefore(sec, h2); else document.body.appendChild(sec);
    }

    // Minimal styles using the site's CSS variables (with fallbacks)
    var st = el("style");
    st.textContent =
      ".ec-byline{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:6px 0 16px;font-size:.9rem;color:var(--ink-dim,#666)}" +
      ".ec-byline a,.ec-creator-credit a{color:var(--blue,#2b6cb0);text-decoration:none}" +
      ".ec-byline a:hover,.ec-creator-credit a:hover{text-decoration:underline}" +
      ".ec-share{font:inherit;font-size:.82rem;cursor:pointer;padding:4px 12px;border-radius:999px;border:1px solid var(--line,#ccc);background:transparent;color:var(--ink,#222)}" +
      ".ec-share:hover{border-color:var(--blue,#2b6cb0);color:var(--blue,#2b6cb0)}" +
      ".ec-about-creator{display:flex;gap:18px;align-items:flex-start;margin:20px 0;padding:18px;border:1px solid var(--line,#ccc);border-radius:12px}.ec-about-creator img{border-radius:50%;object-fit:cover;flex:none}.ec-about-creator h2{margin:0 0 6px}.ec-about-creator p{margin:4px 0}" +
      ".ec-creator-credit{margin-top:8px;font-size:.85rem;color:var(--ink-dim,#666);text-align:center}";
    document.head.appendChild(st);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
