/* ==========================================================================
   APP: config binding, stats, skills, "Now" list, theme, footer year
   ========================================================================== */
(function () {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Bind config values to the DOM ---------- */
  function bindConfig() {
    $$("[data-bind],[data-bind-href]").forEach((el) => {
      const isHref = el.hasAttribute("data-bind-href");
      const key = isHref ? el.dataset.bindHref : el.dataset.bind;
      const value = cfg[key] || "";
      if (isHref) el.setAttribute("href", value);
      else el.textContent = value;
      if (el.hasAttribute("data-hide-empty") && !value) el.hidden = true;
    });
    document.title = `${cfg.brand} · ${cfg.name}`;
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute("content", `${cfg.name} (${cfg.nickname}), ${cfg.role}. Backend development, system design and useful digital products.`);
    const year = $("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
    const avail = $("[data-availability-text]");
    if (avail && cfg.availability) avail.textContent = cfg.availability.text;
    $$("[data-hide-if-no-availability]").forEach((el) => { if (!cfg.availability?.show) el.hidden = true; });
    const resume = $("[data-resume]");
    if (resume) {
      if (cfg.resume) resume.setAttribute("href", cfg.resume);
      else resume.hidden = true;
    }
  }

  /* ---------- Stats derived from real data ---------- */
  function renderStats() {
    const stats = $("#hero-stats");
    if (!stats) return;
    if (!cfg.showStats) { stats.hidden = true; return; }
    const projectCount = (window.PROJECTS || []).length;
    const techCount = (cfg.skills || []).reduce((n, g) => n + g.items.length, 0);
    const set = (k, v) => { const el = $(`[data-stat="${k}"]`); if (el) el.textContent = v; };
    set("projects", projectCount);
    set("tech", techCount + "+");
  }

  /* ---------- Skills with category filter ---------- */
  function renderSkills() {
    const grid = $("#skills-grid");
    const filters = $("#skill-filters");
    if (!grid || !filters) return;
    const cardTpl = $("#skill-card-template");

    const makeBtn = (id, label, active) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (active ? " is-active" : "");
      b.dataset.filter = id;
      b.setAttribute("aria-pressed", String(active));
      b.textContent = label;
      return b;
    };
    filters.appendChild(makeBtn("all", "All", true));
    (cfg.skills || []).forEach((g) => filters.appendChild(makeBtn(g.id, g.label, false)));

    (cfg.skills || []).forEach((group, gi) => {
      const card = cardTpl.content.firstElementChild.cloneNode(true);
      card.dataset.group = group.id;
      card.style.setProperty("--stagger", gi);
      $("[data-skill-title]", card).textContent = group.label;
      const list = $("[data-skill-list]", card);
      group.items.forEach((item) => {
        const li = document.createElement("li");
        li.className = "skill-item";
        li.textContent = item.name;
        if (item.status) {
          const s = document.createElement("span");
          s.className = "skill-status";
          s.textContent = item.status;
          li.appendChild(s);
        }
        list.appendChild(li);
      });
      grid.appendChild(card);
    });

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      const f = btn.dataset.filter;
      $$("button", filters).forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      $$(".skill-card", grid).forEach((c) => {
        c.hidden = !(f === "all" || c.dataset.group === f);
      });
    });
  }

  /* ---------- "Now" list from config ---------- */
  function renderNow() {
    const list = $(".now-list");
    if (!list || !cfg.now) return;
    cfg.now.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "now-item glass reveal";
      li.style.setProperty("--stagger", i);
      const h = document.createElement("h3");
      h.textContent = item.title;
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent = item.text;
      li.append(h, p);
      list.appendChild(li);
    });
  }

  /* ---------- Theme toggle (dark default, persisted) ---------- */
  function initTheme() {
    const btn = $("#theme-toggle");
    const apply = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      if (btn) {
        const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
        btn.setAttribute("aria-label", label);
        btn.setAttribute("title", label);
      }
    };
    apply(document.documentElement.getAttribute("data-theme") || "dark");
    btn?.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem("keabi-theme", next); } catch (_) { /* storage unavailable */ }
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    bindConfig();
    renderStats();
    renderSkills();
    renderNow();
    initTheme();
  });
})();
