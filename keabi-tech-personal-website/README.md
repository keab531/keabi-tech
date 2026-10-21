# Keabi Tech — Personal Portfolio Website
> **Tagline:** Ideas → Production  
> **Portfolio of:** Keabzend (Keabi) Bekele Kolcha  
> **Discipline:** Software Engineering Student & Aspiring Backend Engineer  
> **Institution:** Arba Minch University (AMU), Ethiopia  

---

## 1. Project Overview

**Keabi Tech** is a production-grade personal portfolio website crafted for Keabzend (Keabi). Built with a developer-first dark cinematic aesthetic, vivid burnt orange (`#FF6A00`) accents, responsive glassmorphic cards, and an interactive Python terminal & system architecture explorer.

### Key Highlights
- **100% Vanilla Web Standards:** Pure HTML5, CSS3, and modern ES6+ JavaScript modules.
- **Zero Heavy Framework Bloat:** Ultra-fast page load times, no runtime overhead.
- **Developer Terminal Simulator:** Interactive in-browser shell allowing visitors to inspect system architecture, run simulated microservice health checks (`curl /api/ping`), and view engineering philosophies.
- **Data-Driven Architecture:** All projects, skills, and timeline milestones are decoupled into `js/projects.js` for effortless maintenance and additions.
- **Dark & Light Mode:** Seamless toggle with user preference persistent via `localStorage` (defaults to dark).
- **Responsive Across All Viewports:** Pixel-perfect across small phones (320px), tablets (768px), laptops (1024px), and ultra-wide displays (1440px+).
- **Accessible & SEO Ready:** Semantic heading hierarchy, focus traps, ARIA roles, Schema.org Person JSON-LD, OpenGraph tags, and Twitter Cards.

---

## 2. Directory Structure

```text
keabi-tech/
├── index.html                   # Master semantic HTML5 document
├── 404.html                     # Branded developer 404 error page
├── README.md                    # Setup, customization & testing documentation
├── metadata.json                # Project identity & description metadata
├── assets/
│   ├── images/
│   │   ├── hero_portrait.png    # Cropped authentic portrait with orange glow
│   │   ├── mountains_banner.png # Dusk mountain banner for CTA
│   │   └── projects/            # Real project preview screenshots
│   │       ├── devsafe_vault.png
│   │       ├── school_management.png
│   │       ├── local_file_transfer.svg
│   │       ├── website_builder.png
│   │       ├── finance_dashboard.png
│   │       └── otp_auth.png
│   └── icons/
│       └── favicon.svg          # Custom </> brand mark
├── css/
│   ├── styles.css               # Core CSS variables, typography, layouts, cards
│   ├── responsive.css           # Fluid media queries & print styles
│   └── animations.css           # Keyframe glows, fade-ups, and reduced-motion
└── js/
    ├── app.js                   # Main controller (theme, navigation, observers)
    ├── projects.js              # Centralized data model for projects & skills
    ├── interactions.js          # Modal dialogs, search/filter, toasts, clipboard
    └── terminal.js              # Interactive Python developer shell interpreter
```

---

## 3. Local Setup & Deployment

### Run Locally with Vite
```bash
# 1. Install local dependencies
npm install

# 2. Start the local development server (runs on port 3000)
npm run dev

# 3. Build optimized static output
npm run build
```

### Static Hosting Deployment
Because this site uses pure standard HTML, CSS, and JavaScript, it can be deployed to any static host without configuration:
- **GitHub Pages:** Push to the `main` or `gh-pages` branch.
- **Vercel / Netlify / Cloudflare Pages:** Connect your GitHub repository. Build command: `npm run build` with output directory `dist` (or deploy directly as raw static files).
- **Apache / Nginx / Caddy:** Copy all files to your webroot (`/var/www/html/`).

---

## 4. Content Placeholders & Personalization Guide

Below is the list of fields you can update as your career and projects evolve:

| File | Variable / Location | Current Value | Notes |
|---|---|---|---|
| `js/projects.js` | `PROJECTS_DATA[].githubUrl` | `https://github.com/keabi531/...` | Add real GitHub repository URLs as you push code |
| `js/projects.js` | `PROJECTS_DATA[].liveDemoUrl` | `null` | Change to your deployment URL (e.g. `https://devsafe.keabi.tech`) |
| `index.html` & `js/projects.js` | Contact Email | `keabzendbekele8@gmail.com` | Your direct inbox |
| `index.html` | Telegram Link | `https://t.me/keabi_tech` | Your Telegram channel or handle |
| `index.html` | Academic Target | `4.00 GPA Target` | Update as graduation approaches |
| `assets/images/hero_portrait.png` | Avatar Portrait | Extracted from reference | Replace with your latest high-res photograph if desired |

---

## 5. How to Add a New Project

To add a project to your portfolio, open `js/projects.js` and add an object to the `PROJECTS_DATA` array:

```javascript
{
  id: "my-new-microservice",
  title: "Distributed Task Queue",
  tagline: "High-throughput asynchronous worker engine",
  category: "backend", // Options: "backend", "fullstack", "security"
  status: "In Progress", // "Completed", "In Progress", or "Concept"
  featured: true,
  thumbnail: "/assets/images/projects/task_queue.png",
  fallbackThumbnail: "assets/images/projects/task_queue.png",
  technologies: ["Python", "Redis", "Celery", "PostgreSQL"],
  shortDescription: "A distributed job scheduler with priority queueing and exponential backoff retries.",
  fullDescription: "Detailed breakdown of the system...",
  problemSolved: "Preventing thread starvation during high peak traffic loads.",
  architecture: {
    type: "Worker Architecture",
    diagram: "+----------+    Redis Queue    +-----------+\n| Producer | ================> | Consumers |\n+----------+",
    points: ["Sub-millisecond latency", "Dead-letter queue handling"]
  },
  keyFeatures: ["Zero-loss worker restart", "Prometheus metrics"],
  challenges: "Managing state during worker failover.",
  githubUrl: "https://github.com/keabi531/task-queue",
  liveDemoUrl: null
}
```
The cards, search filter, and interactive modal dialog will automatically render the new entry!

---

## 6. Verification & Testing Checklist

- [x] **Navigation & Smooth Scrolling:** Clicking Home, About, Skills, Projects, Terminal, Journey, or Contact smoothly moves the viewport and updates the URL hash.
- [x] **Active Section Highlighting:** As you scroll, the top navigation links update their active orange indicator using `IntersectionObserver`.
- [x] **Dark / Light Theme Toggle:** Switching themes works instantly, switches the sun/moon icon, and remembers the preference across page refreshes via `localStorage`.
- [x] **Project Search & Category Filtering:** Searching "Python" or "Vault" instantly filters the grid. Category pills toggle between Backend, Fullstack, and Security.
- [x] **Project Details Modal:** Clicking any project card opens a focused modal with ASCII architecture diagrams, problem statements, and key capabilities. Closes on `Escape`, click outside, or close button.
- [x] **Interactive Python Terminal:** Execute commands like `cat about.py`, `arch devsafe`, `curl /api/ping`, or `system_info` via text or quick chips.
- [x] **Contact Form & Direct Actions:** Copy Email button copies `keabzendbekele8@gmail.com` with a toast alert. Form triggers a clean `mailto:` fallback without fake backend claims.
- [x] **Responsive Mobile Layout:** Collapses cleanly into a responsive mobile menu on viewports under 768px with full touch accessibility.
- [x] **Reduced Motion Support:** All transforms, keyframes, and animations gracefully switch to static instant renders if `prefers-reduced-motion: reduce` is detected in the operating system.
