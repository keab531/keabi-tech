/* ==========================================================================
   SITE CONFIGURATION
   Edit this file to update your details, links and skills.
   Leave a value as "" to hide it automatically (links, résumé, etc.).
   ========================================================================== */
window.SITE_CONFIG = {
  brand: "Keabi Tech",
  name: "Keabzend Bekele Kolcha",
  nickname: "Keabi",
  tagline: "Ideas → Production",
  role: "Software Engineering Student",
  location: "Wolaita Sodo, Ethiopia",
  university: "Arba Minch University (AMU)",
  department: "Software Engineering",
  birthday: "Oct 1",

  email: "keabi@example.com",
  emailHref: "mailto:keabi@example.com",
  github: "https://github.com/keabi531",
  telegram: "https://t.me/keabi_tech",
  telegramHandle: "@keabi_tech",
  linkedin: "",
  linkedinHandle: "",

  availability: { show: true, text: "Open to learning opportunities" },

  // Set a real file path (e.g. "assets/documents/resume.pdf") to show the button
  resume: "",

  // Stats are derived from real data (projects and skills). Set false to hide.
  showStats: true,

  now: [
    { title: "Backend engineering", text: "Designing REST APIs and clean service layers with Flask and Django." },
    { title: "Secure file management", text: "Encryption, authenticated sessions and safe recovery workflows." },
    { title: "Database design", text: "Modelling relational schemas in PostgreSQL and MySQL." },
    { title: "Networking fundamentals", text: "How clients, servers and local networks exchange data." },
  ],

  skills: [
    { id: "languages", label: "Languages", items: [
      { name: "Python" }, { name: "JavaScript" }, { name: "Java" },
      { name: "C++", status: "Exploring" }, { name: "Go", status: "Exploring" },
    ]},
    { id: "web", label: "Web Development", items: [
      { name: "HTML5" }, { name: "CSS3" }, { name: "Django" }, { name: "Flask" },
      { name: "React", status: "Learning" },
    ]},
    { id: "data", label: "Databases & Data", items: [
      { name: "PostgreSQL" }, { name: "MySQL" }, { name: "SQLAlchemy" }, { name: "Microsoft Access" },
    ]},
    { id: "tools", label: "Tools & Engineering", items: [
      { name: "Git & GitHub" }, { name: "VS Code" }, { name: "Linux fundamentals" },
      { name: "Software architecture" }, { name: "API development" }, { name: "Security fundamentals" },
    ]},
  ],

  // Lines typed out in the hero terminal
  terminal: [
    "$ whoami",
    "keabi",
    "$ cat focus.txt",
    "backend · system design · security",
    "$ python ideas_to_production.py",
    "✔ shipped: learning, building, iterating",
  ],
};
