/* ==========================================================================
   INTERACTIONS: navigation, scroll effects, terminal, contact, back-to-top
   Content stays visible without JS: reveal effects only apply when
   <html> has the "js" class (set by an inline script in <head>).
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const toggle = $("#menu-toggle");
    const menu = $("#primary-menu");
    if (!toggle || !menu) return;
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Header blur on scroll + scroll progress + back-to-top ---------- */
  function initScrollChrome() {
    const header = $("#site-header");
    const progress = $("#scroll-progress");
    const toTop = $("#back-to-top");
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header?.classList.toggle("is-scrolled", y > 10);
      if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (toTop) toTop.classList.toggle("is-visible", y > 600);
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Active section highlighting (IntersectionObserver) ---------- */
  function initActiveNav() {
    const links = $$("#primary-menu a[href^='#']");
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const sections = Array.from(map.keys()).map((id) => document.getElementById(id)).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => {
          const on = a.getAttribute("href") === `#${en.target.id}`;
          a.classList.toggle("is-active", on);
          on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Restrained parallax for decorative elements ---------- */
  function initParallax() {
    if (reduceMotion) return;
    const layers = $$("[data-parallax]");
    if (!layers.length) return;
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        layers.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.1;
          el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Hero terminal typing effect ---------- */
  function initTerminal() {
    const out = $("#terminal-output");
    const lines = (window.SITE_CONFIG && window.SITE_CONFIG.terminal) || [];
    if (!out || !lines.length) return;
    if (reduceMotion) {
      out.textContent = lines.join("\n");
      return;
    }
    let i = 0, c = 0, text = "";
    const tick = () => {
      if (i >= lines.length) { out.textContent = text + "▋"; return; }
      const line = lines[i];
      if (c <= line.length) {
        out.textContent = text + line.slice(0, c) + "▋";
        c++;
        setTimeout(tick, line.startsWith("$") ? 45 : 18);
      } else {
        text += line + "\n";
        i++; c = 0;
        setTimeout(tick, 350);
      }
    };
    tick();
  }

  /* ---------- Copy email with feedback ---------- */
  function initCopyEmail() {
    const btn = $("#copy-email");
    const status = $("#copy-status");
    if (!btn) return;
    const email = (window.SITE_CONFIG && window.SITE_CONFIG.email) || "";
    btn.addEventListener("click", async () => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(email);
        ok = true;
      } catch (_) {
        // Fallback for older browsers or non-secure contexts
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
        ta.remove();
      }
      status.textContent = ok ? "Email copied to clipboard." : "Copy failed. Select the address manually.";
      setTimeout(() => { status.textContent = ""; }, 2500);
    });
  }

  /* ---------- Contact form: validation + honest mailto fallback ---------- */
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const rules = {
      name: (v) => (v.trim().length < 2 ? "Please enter your name (at least 2 characters)." : ""),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address."),
      subject: (v) => (v.trim().length < 3 ? "Please add a short subject." : ""),
      message: (v) => (v.trim().length < 10 ? "Message should be at least 10 characters." : ""),
    };
    const feedback = $("#form-feedback");

    const validateField = (field) => {
      const err = rules[field.name](field.value);
      const errEl = document.getElementById(`${field.name}-error`);
      field.setAttribute("aria-invalid", String(!!err));
      errEl.textContent = err;
      return !err;
    };

    form.addEventListener("input", (e) => {
      if (e.target.name in rules && e.target.getAttribute("aria-invalid") === "true") validateField(e.target);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = Object.keys(rules).map((k) => form.elements[k]);
      const results = fields.map(validateField);
      if (results.includes(false)) {
        feedback.className = "form-feedback is-error";
        feedback.textContent = "Please fix the highlighted fields.";
        fields.find((f) => f.getAttribute("aria-invalid") === "true").focus();
        return;
      }
      const cfg = window.SITE_CONFIG || {};
      const data = Object.fromEntries(new FormData(form).entries());
      const body = `From: ${data.name} <${data.email}>\n\n${data.message}`;
      const href = `mailto:${cfg.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
      feedback.className = "form-feedback is-info";
      feedback.textContent = "This site has no server, so your email app should open with your message ready to send. If nothing happens, email me directly at the address above.";
      form.reset();
      fields.forEach((f) => f.setAttribute("aria-invalid", "false"));
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initScrollChrome();
    initActiveNav();
    initReveal();
    initParallax();
    initTerminal();
    initCopyEmail();
    initContactForm();
  });
})();
