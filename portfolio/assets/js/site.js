/* Shared layout, theme, and page rendering. Content lives in data.js. */
(function () {
  const S = window.SITE, P = window.PROJECTS || [], T = window.TUTORIALS || [], I = window.INVOLVEMENTS || [];
  let io;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Rich content ----------
     inline(): **bold**, *italic*, `code`, [text](url) inside any text string.
     blocks(): renders an array of content blocks (see EDITING-GUIDE.md). */
  const inline = (str = "") => esc(str)
    .replace(/`([^`]+)`/g, "<code class=\"ic\">$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => `<a class="inline-link" href="${u}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`);
  const codeBlock = (code, lang, caption) => `<figure class="code">${lang || caption ? `<figcaption class="code-head"><span>${esc(caption || "")}</span><span>${esc(lang || "")}</span></figcaption>` : ""}<button class="copy" type="button">Copy</button><pre><code>${esc(code)}</code></pre></figure>`;
  function blocks(list = []) {
    return list.map(b => {
      if (typeof b === "string") return `<p>${inline(b)}</p>`;
      switch (b.type) {
        case "text": return `<p>${inline(b.text)}</p>`;
        case "heading": return `<h4 class="block-h">${inline(b.text)}</h4>`;
        case "code": return codeBlock(b.code, b.lang, b.caption);
        case "image": return `<figure class="block-img${b.wide ? " wide" : ""}"><img src="${b.src}" alt="${esc(b.alt || "")}" loading="lazy">${b.caption ? `<figcaption>${inline(b.caption)}</figcaption>` : ""}</figure>`;
        case "callout": return `<aside class="callout callout-${b.tone || "tip"}"><strong>${esc(b.title || ({ tip: "Tip", warning: "Watch out", info: "Note" }[b.tone || "tip"]))}</strong><p>${inline(b.text)}</p></aside>`;
        case "list": { const tag = b.ordered ? "ol" : "ul"; return `<${tag} class="block-list">${b.items.map(i => `<li>${inline(i)}</li>`).join("")}</${tag}>`; }
        case "table": return `<div class="block-table"><table><thead><tr>${b.headers.map(h => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${inline(String(c))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        case "video": return `<div class="block-video"><iframe src="https://www.youtube-nocookie.com/embed/${esc(b.youtube)}" title="${esc(b.title || "Video")}" loading="lazy" allowfullscreen></iframe></div>`;
        case "html": return b.html; // escape hatch: raw HTML you write yourself
        default: return "";
      }
    }).join("");
  }
  const bindCopy = () => document.querySelectorAll(".copy:not([data-bound])").forEach(b => {
    b.dataset.bound = 1;
    b.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(b.parentElement.querySelector("code").textContent); b.textContent = "Copied"; } catch (e) { b.textContent = "Select + copy"; }
      setTimeout(() => (b.textContent = "Copy"), 1600);
    });
  });

  const ICON = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.85a13.9 13.9 0 0 0-.63 1.29 18.4 18.4 0 0 0-5.53 0 13 13 0 0 0-.64-1.29 19.7 19.7 0 0 0-4.93 1.52C.53 9.05-.32 13.6.1 18.1a19.9 19.9 0 0 0 6.04 3.05c.49-.66.92-1.36 1.3-2.1a12.9 12.9 0 0 1-2.04-.98l.5-.39a14.2 14.2 0 0 0 12.2 0l.5.39c-.65.39-1.33.71-2.04.98.38.74.81 1.44 1.3 2.1a19.8 19.8 0 0 0 6.04-3.05c.5-5.2-.84-9.72-3.58-13.73zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
  };
  // Logo monogram drawn as circuit traces: "T" + "S" with via dots
  const LOGO = `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${S.initials} logo"><rect x="2" y="2" width="28" height="28" rx="6"/><path d="M6.5 10h10M11.5 10v11"/><path d="M25.5 10h-6v6h6v6h-6"/><circle cx="11.5" cy="22.5" r="1.5" fill="currentColor"/><circle cx="25.5" cy="10" r="1.5" fill="currentColor"/><circle cx="19.5" cy="22" r="1.5" fill="currentColor"/></svg>`;
  window.__ICON = ICON;

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  let theme = "dark"; // default to the dark navy theme
  root.setAttribute("data-theme", theme);
  function setTheme(t) {
    theme = t; root.setAttribute("data-theme", t);
    const b = $("#theme-btn"); if (b) { b.innerHTML = t === "dark" ? ICON.sun : ICON.moon; b.setAttribute("aria-label", `Switch to ${t === "dark" ? "light" : "dark"} mode`); }
  }

  /* ---------- Header / footer ---------- */
  const page = document.body.dataset.page;
  const NAV = [["index.html", "Home", "home"], ["about.html", "About", "about"], ["projects.html", "Projects", "projects"], ["tutorials.html", "Tutorials", "tutorials"], ["involvements.html", "Involvements", "involvements"]];
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `<a class="skip" href="#main">Skip to content</a>
  <nav class="container nav" aria-label="Primary">
    <a class="brand" href="index.html">${LOGO}<span>${esc(S.name)}</span></a>
    <ul class="nav-links" id="nav-links">
      ${NAV.map(([h, l, k]) => `<li><a href="${h}"${page === k || (page === "tutorial" && k === "tutorials") ? ' aria-current="page"' : ""}>${l}</a></li>`).join("")}
    </ul>
    <div class="nav-tools">
      <button class="icon-btn" id="theme-btn" type="button"></button>
      <button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">${ICON.menu}</button>
    </div>
  </nav>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<div class="container footer-grid">
    <a class="brand" href="index.html">${LOGO}<span>${esc(S.name)}</span></a>
    <p>© ${new Date().getFullYear()} ${esc(S.name)} · ${esc(S.role)} · ${esc(S.location)}</p>
    <div class="footer-socials">
      <a class="icon-btn" href="${S.links.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICON.linkedin}</a>
      <a class="icon-btn" href="${S.links.github}" target="_blank" rel="noopener" aria-label="GitHub">${ICON.github}</a>
      <a class="icon-btn" href="${S.links.discord}" target="_blank" rel="noopener" aria-label="Discord">${ICON.discord}</a>
      <a class="icon-btn" href="mailto:${S.email}" aria-label="Email">${ICON.mail}</a>
    </div></div>`;
  document.body.append(footer);

  setTheme(theme);
  $("#theme-btn").addEventListener("click", () => setTheme(theme === "dark" ? "light" : "dark"));
  $("#menu-btn").addEventListener("click", e => {
    const open = $("#nav-links").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });

  /* ---------- Shared bits ---------- */
  document.querySelectorAll("[data-headshot]").forEach(img => { img.src = S.headshot; img.alt = `Portrait of ${S.name}`; });
  document.querySelectorAll("[data-name]").forEach(el => (el.textContent = S.name));
  document.querySelectorAll("[data-socials]").forEach(el => {
    el.innerHTML = `
      <a class="social" href="${S.links.linkedin}" target="_blank" rel="noopener"><span class="ico">${ICON.linkedin}</span><span>LinkedIn<small>Connect</small></span></a>
      <a class="social" href="${S.links.github}" target="_blank" rel="noopener"><span class="ico">${ICON.github}</span><span>GitHub<small>View code</small></span></a>
      <a class="social" href="${S.links.discord}" target="_blank" rel="noopener"><span class="ico">${ICON.discord}</span><span>Discord<small>@${esc(S.links.discordHandle)}</small></span></a>`;
  });

  const STAGES = ["prototype", "iterating", "workshop-ready"];
  const stageLabel = s => ({ prototype: "Prototype", iterating: "Iterating", "workshop-ready": "Workshop-ready", current: "Current", past: "Past" }[s] || s);
  const badge = s => `<span class="badge badge-${s}">${stageLabel(s)}</span>`;

  const projectCard = p => `
    <article class="card reveal">
      <div class="card-media">${badge(p.status)}<img src="${p.image}" alt="${esc(p.title)}" loading="lazy" width="800" height="600"></div>
      <div class="card-body">
        <div class="meta">${esc(p.date)}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="tags">${p.stack.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
    </article>`;

  const tutCard = t => {
    const lvl = STAGES.indexOf(t.status);
    return `<a class="card tut-card reveal" href="tutorial.html?id=${encodeURIComponent(t.id)}">
      <div class="card-body">
        <div class="tut-top">${badge(t.status)}<span class="version">${esc(t.version)}</span></div>
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.summary)}</p>
        <div class="meta"><span>${esc(t.level)}</span>·<span>${esc(t.duration)}</span>·<span>${t.iterations.length} iteration${t.iterations.length === 1 ? "" : "s"}</span></div>
        <div class="progress" aria-label="Stage ${lvl + 1} of 3">${STAGES.map((_, i) => `<i class="${i <= lvl ? "on" : ""}"></i>`).join("")}</div>
        <div class="tags">${t.tags.map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>
      </div></a>`;
  };

  function filterable(container, items, render, key, options) {
    const bar = $("[data-filters]");
    let active = "all";
    const draw = () => {
      const list = active === "all" ? items : items.filter(i => i[key] === active);
      container.innerHTML = list.length ? list.map(render).join("") : `<p class="muted">Nothing here yet.</p>`;
      observe();
    };
    bar.innerHTML = [["all", "All"], ...options].map(([v, l]) => {
      const n = v === "all" ? items.length : items.filter(i => i[key] === v).length;
      return `<button class="filter" type="button" data-v="${v}" aria-pressed="${v === active}">${l}<span class="count">${n}</span></button>`;
    }).join("");
    bar.addEventListener("click", e => {
      const b = e.target.closest(".filter"); if (!b) return;
      active = b.dataset.v;
      bar.querySelectorAll(".filter").forEach(x => x.setAttribute("aria-pressed", x === b));
      draw();
    });
    draw();
  }

  /* ---------- Pages ---------- */
  if (page === "home") {
    $("[data-tagline]").textContent = S.tagline;
    $("[data-featured]").innerHTML = P.filter(p => p.featured).slice(0, 3).map(projectCard).join("");
    $("[data-home-tuts]").innerHTML = T.slice(0, 3).map(tutCard).join("");
    const set = (k, v) => { const el = $(`[data-stat="${k}"]`); if (el) el.textContent = v; };
    set("projects", P.length);
    set("current", P.filter(p => p.status === "current").length);
    set("tutorials", T.length);
    set("workshops", T.filter(t => t.status === "workshop-ready").length);
    set("orgs", I.length);
  }

  if (page === "projects") {
    const row = p => `
      <article class="project reveal" id="${p.id}">
        <div class="project-media"><img src="${p.image}" alt="${esc(p.title)}" loading="lazy" width="800" height="600"></div>
        <div class="project-body">
          <div class="meta">${badge(p.status)}<span>${esc(p.date)}</span></div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
          <dl class="kv"><dt>Role</dt><dd>${esc(p.role)}</dd></dl>
          <ul>${p.highlights.map(h => `<li>${inline(h)}</li>`).join("")}</ul>
          ${p.content ? `<div class="rich">${blocks(p.content)}</div>` : ""}
          <div class="tags">${p.stack.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          ${p.links.length ? `<div class="btn-row">${p.links.map(l => `<a class="btn" href="${l.url}" target="_blank" rel="noopener">${ICON.github}${esc(l.label)}</a>`).join("")}</div>` : ""}
        </div>
      </article>`;
    filterable($("[data-projects]"), P, row, "status", [["current", "Current"], ["past", "Past"]]);
    bindCopy();
  }

  if (page === "tutorials") {
    const desc = { prototype: "Works on my bench. Rough notes and a first build.", iterating: "Tested with classmates and refined based on where they got stuck.", "workshop-ready": "Timed, kitted, and ready to run for a room of students." };
    $("[data-pipeline]").innerHTML = STAGES.map((s, i) => {
      const n = T.filter(t => t.status === s).length;
      return `<div class="stage"><span class="num">STAGE 0${i + 1}</span><h3>${stageLabel(s)} <b>${n}</b></h3><p>${desc[s]}</p><div class="bar"><i style="width:${T.length ? (n / T.length) * 100 : 0}%"></i></div></div>`;
    }).join("");
    filterable($("[data-tutorials]"), T, tutCard, "status", STAGES.map(s => [s, stageLabel(s)]));
  }

  if (page === "involvements") {
    const abbr = n => n.split(/\s+/).filter(w => /^[A-Z]/.test(w)).map(w => w[0]).join("").slice(0, 4) || n.slice(0, 2);
    const row = o => `
      <article class="org reveal" id="${o.id}">
        <div class="org-logo">${o.logo ? `<img src="${o.logo}" alt="${esc(o.name)} logo" loading="lazy">` : `<span>${esc(o.short || abbr(o.name))}</span>`}</div>
        <div class="org-body">
          <div class="meta">${badge(o.status)}<span>${esc(o.dates)}</span></div>
          <h3>${esc(o.name)}</h3>
          <p class="org-sum">${inline(o.summary)}</p>
          ${o.roles && o.roles.length ? `<ol class="roles">${o.roles.map(r => `<li><b>${esc(r.title)}</b><time>${esc(r.dates)}</time>${r.notes ? `<p>${inline(r.notes)}</p>` : ""}</li>`).join("")}</ol>` : ""}
          ${o.highlights && o.highlights.length ? `<ul class="org-hl">${o.highlights.map(h => `<li>${inline(h)}</li>`).join("")}</ul>` : ""}
          ${o.content ? `<div class="rich">${blocks(o.content)}</div>` : ""}
          <div class="org-foot">
            <div class="tags">${(o.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            ${o.link ? `<a class="link-arrow" href="${o.link}" target="_blank" rel="noopener">Visit organization <span>→</span></a>` : ""}
          </div>
        </div>
      </article>`;
    filterable($("[data-involvements]"), I, row, "status", [["current", "Current"], ["past", "Past"]]);
  }

  if (page === "tutorial") {
    const id = new URLSearchParams(location.search).get("id");
    const t = T.find(x => x.id === id) || T[0];
    if (t) {
      document.title = `${t.title} · ${S.name}`;
      $("[data-t-head]").innerHTML = `
        <a class="link-arrow no-print" href="tutorials.html"><span>←</span> All tutorials</a>
        <div class="meta" style="margin-top:var(--space-6)">${badge(t.status)}<span>${esc(t.version)}</span>·<span>${esc(t.level)}</span>·<span>${esc(t.duration)}</span></div>
        <h1>${esc(t.title)}</h1><p>${esc(t.summary)}</p>
        <div class="btn-row no-print"><button class="btn" type="button" onclick="window.print()">${ICON.print}Print handout</button></div>`;
      $("[data-t-aside]").innerHTML = `
        <div class="panel"><h2>On this page</h2><ul class="toc">
          <li><a href="#objectives">Learning objectives</a></li><li><a href="#steps">Build steps</a></li>
          <li><a href="#workshop">Workshop plan</a></li><li><a href="#iterations">Iteration log</a></li></ul></div>
        <div class="panel"><h2>Materials</h2><ul>${t.materials.map(m => `<li>${esc(m)}</li>`).join("")}</ul></div>`;
      $("[data-t-main]").innerHTML = `
        <h2 id="objectives">Learning objectives</h2>
        <ul class="objectives">${t.objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
        <h2 id="steps">Build steps</h2>
        ${t.steps.map((st, i) => `<div class="step"><span class="step-num">${String(i + 1).padStart(2, "0")}</span><h3>${esc(st.title)}</h3><div class="rich">${st.body ? `<p>${inline(st.body)}</p>` : ""}${st.code ? codeBlock(st.code, st.lang, st.caption) : ""}${blocks(st.content)}</div></div>`).join("")}
        <h2 id="workshop">Workshop plan</h2>
        <div class="workshop-box">
          <dl class="kv"><dt>Audience</dt><dd>${esc(t.workshop.audience)}</dd><dt>Group</dt><dd>${esc(t.workshop.groupSize)}</dd><dt>Format</dt><dd>${esc(t.workshop.format)}</dd></dl>
          <h3 class="label" style="margin-bottom:var(--space-3)">Facilitator notes</h3>
          <ul class="objectives">${t.workshop.facilitatorNotes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>
        </div>
        <h2 id="iterations">Iteration log</h2>
        <ol class="timeline">${t.iterations.map(v => `<li><b>${esc(v.version)}</b><time>${esc(v.date)}</time><p>${esc(v.notes)}</p></li>`).join("")}</ol>`;
      bindCopy();
    }
  }

  bindCopy(); // any static code blocks written directly in HTML

  /* ---------- Reveal on scroll ---------- */
  function observe() {
    if (!("IntersectionObserver" in window)) { document.querySelectorAll(".reveal").forEach(e => e.classList.add("in")); return; }
    io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .08 });
    document.querySelectorAll(".reveal:not(.in)").forEach(e => io.observe(e));
  }
  observe();
})();
