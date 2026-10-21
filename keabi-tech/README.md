# Keabi Tech — Personal Portfolio

A premium, dark, glassmorphic developer portfolio built with **HTML5, CSS3 and vanilla JavaScript**. No frameworks, no build step, no CDN, no backend.

## Project structure

```
keabi-tech/
├── index.html                 Main page (all sections)
├── 404.html                   Custom not-found page
├── README.md
├── assets/
│   ├── icons/favicon.svg      Brand mark / favicon
│   ├── images/profile.svg     Original developer illustration (hero)
│   ├── images/projects/       Project thumbnails (SVG, replaceable with PNG/WebP)
│   └── documents/             Put resume.pdf here (optional)
├── css/
│   ├── styles.css             Design tokens, layout, components, light theme
│   ├── animations.css         Keyframes, reveals, reduced-motion overrides
│   └── responsive.css         Breakpoints 320px → 1440px+, print styles
└── js/
    ├── config.js              ★ Your personal details, links, skills, "Now" list
    ├── projects.js            ★ Project data + gallery, search, filters, modal
    ├── app.js                 Config binding, stats, skills, theme toggle
    └── interactions.js        Nav, scroll effects, terminal, copy, contact form
```

## Run locally

Open `index.html` in a browser, or serve the folder (recommended, so every feature behaves like production):

```bash
cd keabi-tech
python -m http.server 8000      # then visit http://localhost:8000
```

## Deploy (static hosting)

Everything uses relative paths, so the site works at a domain root or a subpath.

- **GitHub Pages:** push the folder to a repo, then Settings → Pages → deploy from the main branch.
- **Netlify / Vercel / Cloudflare Pages:** drag and drop the folder, or connect the repo. No build command is needed.
- **Any web server:** copy the folder to the web root.

## Edit your content

All personal content lives in two files:

**`js/config.js`**: name, role, location, university, email, GitHub, Telegram, LinkedIn, availability text, résumé path, the "Now" list, skills, and the hero terminal lines.

- Leave a link as `""` and it is hidden automatically.
- Set `resume: "assets/documents/resume.pdf"` once you have a real file. The button stays hidden until then.
- Set `showStats: false` to hide the hero statistics.

**`js/projects.js`**: the `window.PROJECTS` array.

### Add a project

1. Add an object to `window.PROJECTS` with a unique `id`.
2. Fill in `title`, `category` (Backend / Web / Security / Data), `summary`, `problem`, `features`, `architecture`, `tech`, `status` (`"Concept"`, `"In Progress"` or `"Completed"`), `challenges`, `lessons`.
3. Add a thumbnail at `assets/images/projects/<id>.svg` (or `.webp`/`.png`) and set `thumbnail` to its path. A missing image falls back to a clean placeholder.
4. Set `github` and `demo` only when they exist. Leave them `""` otherwise.

The card, modal and filters update automatically. Nothing else needs to change.

### Update social links

Edit `github`, `telegram`, `telegramHandle`, `linkedin` and `linkedinHandle` in `js/config.js`. The hero, contact section and footer all read from there.

## Contact form (honest fallback)

A static site cannot send email on its own, so the form validates input and then opens the visitor's email client with the message pre-filled. It does not pretend to send. To accept messages on the site itself, connect a form service such as Formspree or Netlify Forms: set the form's `action` attribute and remove the `mailto` logic in `js/interactions.js`. Never put private API keys in frontend JavaScript.

## Content placeholders to replace before launch

| Item | Where | Current value |
|---|---|---|
| Email address | `js/config.js` (`email`, `emailHref`) | `keabi@example.com` (placeholder) |
| GitHub username | `js/config.js` (`github`) | `keabi531`. Verify it is your real profile. |
| Telegram handle | `js/config.js` (`telegram`, `telegramHandle`) | `@keabi_tech`. Verify it. |
| Site URL | `index.html` `og:image` and SEO tags | Update to your real domain |
| Profile illustration | `assets/images/profile.svg` | Generic illustration. Replace with your own photo (`profile.webp`) if you wish. |
| Project thumbnails | `assets/images/projects/` | Generated placeholders. Replace with real screenshots. |
| Résumé | `assets/documents/resume.pdf` | Not included. Add the file and set `resume` in config. |
| Project repos / demos | `js/projects.js` (`github`, `demo`) | Empty. Fill in only real URLs. |
| Project status | `js/projects.js` (`status`) | Set honestly for each project. |

## Testing checklist

**Navigation**
- [ ] Every nav link scrolls to the right section.
- [ ] The active link updates while scrolling.
- [ ] The header gains a blur background after scrolling.
- [ ] On mobile, the menu opens and closes, and closes after a link is chosen or Esc is pressed.

**Theme**
- [ ] The toggle switches dark and light, and the choice persists after reload.
- [ ] Both themes keep text readable.

**Projects**
- [ ] Search filters by title, and the category and technology filters combine correctly.
- [ ] The empty state appears when nothing matches.
- [ ] "View details" opens the modal. Esc, the close button and the backdrop all close it, and focus returns to the trigger.
- [ ] Projects without repos or demos show the "not published yet" note.

**Responsiveness** (test at 320, 480, 768, 1024, 1440 and 1920px)
- [ ] No horizontal scrolling anywhere.
- [ ] Cards, modal and form fit the viewport.
- [ ] Buttons and links are comfortable to tap.

**Accessibility**
- [ ] Tab through the whole page. Focus is always visible.
- [ ] Screen reader labels make sense on icon-only buttons.
- [ ] Form errors are announced and the first invalid field receives focus.
- [ ] Text contrast is adequate in both themes.

**Animations**
- [ ] Sections and cards fade up as they enter the viewport.
- [ ] Content stays visible if JavaScript is disabled.
- [ ] With "Reduce motion" enabled in the OS, animations stop and content shows immediately.

**Other**
- [ ] The copy-email button shows feedback.
- [ ] The back-to-top button appears after scrolling and works.
- [ ] Print preview shows a clean résumé-style layout.
- [ ] `404.html` loads for an unknown path (on hosts that support custom 404 pages).

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses IntersectionObserver, `<dialog>`, CSS custom properties and `color-mix()`.
