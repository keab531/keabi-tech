/* ==========================================================================
   PROJECT DATA + GALLERY RENDERING
   status: "Concept" | "In Progress" | "Completed"
   github / demo: "" when unavailable. Never invent URLs.
   ========================================================================== */
window.PROJECTS = [
  {
    id: "devsafe-vault", title: "DevSafe Vault", category: "Security", featured: true,
    summary: "Personal file protection and workspace management with password-based access.",
    problem: "Personal files often sit in plain folders with no access control, and accidental deletions are hard to undo.",
    features: ["Password-based access to the workspace", "Encrypted file storage", "Safe file operations", "Recovery-focused trash workflow"],
    architecture: "Flask serves the interface. A crypto layer encrypts files before they reach disk, and a trash manager keeps deleted items recoverable.",
    tech: ["Python", "Flask", "cryptography"], status: "In Progress",
    challenges: "Deriving keys safely and making deletes reversible without leaving plaintext copies behind.",
    lessons: "Security is mostly about defaults: the safe path should be the easy path.",
    thumbnail: "assets/images/projects/devsafe-vault.svg", github: "", demo: "",
  },
  {
    id: "school-management", title: "School Management System", category: "Backend", featured: true,
    summary: "Student records, attendance, examinations, results and communication in one system.",
    problem: "Schools track students, attendance and results across disconnected spreadsheets, which causes errors and slow reporting.",
    features: ["Student and staff records", "Attendance tracking", "Examinations and results", "Messaging and notifications"],
    architecture: "A Django project with PostgreSQL for relational data, role-based views, and server-rendered HTML with lightweight JavaScript.",
    tech: ["Django", "PostgreSQL", "HTML", "CSS", "JavaScript"], status: "In Progress",
    challenges: "Designing a schema that stays clean as attendance, grades and messaging grow together.",
    lessons: "Good relational modelling pays off long before the UI is finished.",
    thumbnail: "assets/images/projects/school-management.svg", github: "", demo: "",
  },
  {
    id: "local-file-transfer", title: "Local File Transfer", category: "Web", featured: true,
    summary: "Transfer files between a computer and a phone over the local network.",
    problem: "Moving a file to a phone usually means cables, cloud uploads or email, even when both devices share the same Wi-Fi.",
    features: ["QR-code based connection", "Authenticated sessions", "Upload and download from the browser"],
    architecture: "A small Flask server on the local network. The QR code carries a short-lived session token the phone uses to authenticate.",
    tech: ["Python", "Flask", "JavaScript"], status: "Concept",
    challenges: "Keeping sessions secure on a shared network while keeping the connection flow simple.",
    lessons: "Short-lived tokens reduce risk far more than long-lived ones.",
    thumbnail: "assets/images/projects/local-file-transfer.svg", github: "", demo: "",
  },
  {
    id: "flask-website-builder", title: "Flask Website Builder", category: "Web", featured: true,
    summary: "A configurable website builder with reusable components and exportable frontend files.",
    problem: "Simple sites repeat the same layout and markup every time.",
    features: ["Reusable component blocks", "Live configuration of content and style", "Export to plain HTML, CSS and JavaScript"],
    architecture: "Flask manages projects and components. The builder UI writes a JSON layout that is compiled into static files on export.",
    tech: ["Flask", "JavaScript", "HTML", "CSS"], status: "Concept",
    challenges: "A component model simple enough to edit, yet flexible enough to export cleanly.",
    lessons: "A clear data format makes every other feature easier.",
    thumbnail: "assets/images/projects/flask-website-builder.svg", github: "", demo: "",
  },
  {
    id: "amu-finance-dashboard", title: "AMU Finance Dashboard", category: "Data", featured: false,
    summary: "A personal budgeting and expense-tracking dashboard concept with charts.",
    problem: "Students often lose track of small recurring expenses across the month.",
    features: ["Expense entry and categories", "Monthly charts and summaries", "Data stored locally in the browser"],
    architecture: "A static dashboard in vanilla JavaScript, with data persisted to local storage and rendered into charts.",
    tech: ["JavaScript", "Charts", "Local storage"], status: "Concept",
    challenges: "Keeping calculations accurate while the data model is still changing.",
    lessons: "Separate the data layer from the rendering layer early.",
    thumbnail: "assets/images/projects/amu-finance-dashboard.svg", github: "", demo: "",
  },
  {
    id: "otp-email-auth", title: "OTP Email Authentication", category: "Security", featured: false,
    summary: "A learning project on one-time verification codes and secure account workflows.",
    problem: "Passwords alone are weak. One-time codes add a second check, but they must expire and be rate-limited.",
    features: ["Generate and email one-time codes", "Code expiry and attempt limits", "Account verification flow"],
    architecture: "A Flask app that issues hashed, time-limited codes and sends them through an email service.",
    tech: ["Python", "Flask", "Email"], status: "In Progress",
    challenges: "Preventing brute-force attempts without locking out legitimate users.",
    lessons: "Never store OTP codes in plain text.",
    thumbnail: "assets/images/projects/otp-email-auth.svg", github: "", demo: "",
  },
];

(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const grid = $("#projects-grid");
  if (!grid) return;

  const searchInput = $("#project-search");
  const categoryBar = $("#project-categories");
  const techSelect = $("#tech-filter");
  const emptyState = $("#projects-empty");
  const cardTpl = $("#project-card-template");
  const dialog = $("#project-modal");
  const modalBody = $("#project-modal-body");
  const state = { query: "", category: "all", tech: "all" };

  const STATUS_CLASS = { "Concept": "status-concept", "In Progress": "status-progress", "Completed": "status-done" };

  /* Build filter controls from data */
  const categories = [...new Set(window.PROJECTS.map((p) => p.category))];
  const techs = [...new Set(window.PROJECTS.flatMap((p) => p.tech))].sort();

  function makeChip(value, label, active) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (active ? " is-active" : "");
    b.dataset.category = value;
    b.setAttribute("aria-pressed", String(active));
    b.textContent = label;
    return b;
  }
  categoryBar.appendChild(makeChip("all", "All", true));
  categories.forEach((c) => categoryBar.appendChild(makeChip(c, c, false)));
  techs.forEach((t) => {
    const o = document.createElement("option");
    o.value = t; o.textContent = t;
    techSelect.appendChild(o);
  });

  /* Card rendering from a single template */
  function renderCard(p, index) {
    const node = cardTpl.content.firstElementChild.cloneNode(true);
    node.dataset.id = p.id;
    node.style.setProperty("--stagger", index);
    if (p.featured) node.classList.add("is-featured");
    const img = $("[data-field=thumbnail]", node);
    img.src = p.thumbnail;
    img.alt = `${p.title} project preview`;
    img.onerror = () => { img.removeAttribute("src"); img.parentElement.classList.add("no-thumb"); };
    $("[data-field=category]", node).textContent = p.category;
    const status = $("[data-field=status]", node);
    status.textContent = p.status;
    status.classList.add(STATUS_CLASS[p.status] || "status-concept");
    $("[data-field=title]", node).textContent = p.title;
    $("[data-field=summary]", node).textContent = p.summary;
    const tags = $("[data-field=tags]", node);
    p.tech.slice(0, 4).forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      tags.appendChild(li);
    });
    const btn = $("[data-open]", node);
    btn.dataset.open = p.id;
    btn.setAttribute("aria-label", `View details for ${p.title}`);
    return node;
  }

  function applyFilters() {
    const q = state.query.trim().toLowerCase();
    let visible = 0;
    $$cards().forEach((card) => {
      const p = window.PROJECTS.find((x) => x.id === card.dataset.id);
      const matchesQuery = !q || p.title.toLowerCase().includes(q);
      const matchesCat = state.category === "all" || p.category === state.category;
      const matchesTech = state.tech === "all" || p.tech.includes(state.tech);
      const show = matchesQuery && matchesCat && matchesTech;
      card.hidden = !show;
      if (show) visible++;
    });
    emptyState.hidden = visible > 0;
    $("#project-count").textContent = `${visible} of ${window.PROJECTS.length} shown`;
  }
  function $$cards() { return Array.from(grid.querySelectorAll(".project-card")); }

  /* Modal (native <dialog>: focus trap and Escape handled by the browser) */
  function openModal(id) {
    const p = window.PROJECTS.find((x) => x.id === id);
    if (!p) return;
    modalBody.innerHTML = "";
    const h = document.createElement("h3");
    h.id = "project-modal-title";
    h.textContent = p.title;
    const meta = document.createElement("p");
    meta.className = "modal-meta";
    meta.innerHTML = `<span class="pill">${p.category}</span> <span class="pill ${STATUS_CLASS[p.status]}">${p.status}</span>`;
    modalBody.append(h, meta);
    addSection("Overview", p.summary);
    addSection("Problem", p.problem);
    addList("Key features", p.features);
    addSection("Architecture & workflow", p.architecture);
    addTags("Technologies", p.tech);
    addSection("Challenges & lessons", `${p.challenges} ${p.lessons}`);
    addLinks(p);
    dialog.showModal();
    dialog.querySelector(".modal-close").focus();
  }
  function addSection(title, text) {
    const s = document.createElement("section");
    s.innerHTML = `<h4></h4><p></p>`;
    s.querySelector("h4").textContent = title;
    s.querySelector("p").textContent = text;
    modalBody.appendChild(s);
  }
  function addList(title, items) {
    const s = document.createElement("section");
    s.innerHTML = `<h4></h4><ul class="check-list"></ul>`;
    s.querySelector("h4").textContent = title;
    const ul = s.querySelector("ul");
    items.forEach((i) => { const li = document.createElement("li"); li.textContent = i; ul.appendChild(li); });
    modalBody.appendChild(s);
  }
  function addTags(title, items) {
    const s = document.createElement("section");
    s.innerHTML = `<h4></h4><ul class="tags"></ul>`;
    s.querySelector("h4").textContent = title;
    const ul = s.querySelector("ul");
    items.forEach((i) => { const li = document.createElement("li"); li.textContent = i; ul.appendChild(li); });
    modalBody.appendChild(s);
  }
  function addLinks(p) {
    const s = document.createElement("section");
    s.className = "modal-links";
    const links = [];
    if (p.github) links.push(`<a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener noreferrer">Source code</a>`);
    if (p.demo) links.push(`<a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live demo</a>`);
    s.innerHTML = links.length
      ? links.join("")
      : `<p class="muted">Source code and live demo are not published yet.</p>`;
    modalBody.appendChild(s);
  }

  /* Event delegation */
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (btn) openModal(btn.dataset.open);
  });
  searchInput.addEventListener("input", (e) => { state.query = e.target.value; applyFilters(); });
  categoryBar.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-category]");
    if (!b) return;
    state.category = b.dataset.category;
    categoryBar.querySelectorAll("button").forEach((x) => {
      const on = x === b;
      x.classList.toggle("is-active", on);
      x.setAttribute("aria-pressed", String(on));
    });
    applyFilters();
  });
  techSelect.addEventListener("change", (e) => { state.tech = e.target.value; applyFilters(); });
  dialog.addEventListener("click", (e) => { if (e.target === dialog || e.target.closest(".modal-close")) dialog.close(); });

  /* Initial render */
  window.PROJECTS.forEach((p, i) => grid.appendChild(renderCard(p, i)));
  applyFilters();
})();
