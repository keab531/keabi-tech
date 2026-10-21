/**
 * Keabi Tech — Main Application Engine
 * Brand: Ideas → Production
 * Initializes theme, navigation, dynamic rendering, and scroll observers.
 */

import { PROJECTS_DATA, SKILLS_DATA, JOURNEY_MILESTONES } from './projects.js';
import { initInteractions } from './interactions.js';
import { initTerminal } from './terminal.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProjectCards();
  initNavigation();
  initScrollEffects();
  initInteractions();
  initTerminal();
  initDynamicYear();
});

/**
 * Theme Management (Dark Mode Default + Light Mode + localStorage)
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const root = document.documentElement;
  
  // Default to dark theme as required
  const savedTheme = localStorage.getItem('keabi-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('keabi-theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  root.setAttribute('data-theme', theme);

  if (themeToggleBtn) {
    // Sun icon for dark mode (click to switch to light), Moon icon for light mode (click to switch to dark)
    if (theme === 'dark') {
      themeToggleBtn.innerHTML = `
        <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Light Theme');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Light Theme');
    } else {
      themeToggleBtn.innerHTML = `
        <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Theme');
    }
  }
}

/**
 * Render Project Cards from Structured Data
 */
function renderProjectCards() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const cardsHtml = PROJECTS_DATA.map(project => {
    const techBadges = project.technologies.slice(0, 3).map(tech => 
      `<span class="tech-tag">${escapeHtml(tech)}</span>`
    ).join('');

    const statusClass = project.status.toLowerCase().replace(' ', '-');

    return `
      <article class="project-card fade-up-element" data-category="${escapeHtml(project.category)}" data-project-id="${escapeHtml(project.id)}">
        <div class="project-thumb-box">
          <img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.title)} Preview" class="project-thumb-img" loading="lazy" onerror="this.onerror=null;this.src='${escapeHtml(project.fallbackThumbnail)}';">
          <span class="project-status-tag ${statusClass}">${escapeHtml(project.status)}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <div class="project-tags">
            ${techBadges}
          </div>
          <p class="project-snippet">${escapeHtml(project.shortDescription)}</p>
          <div class="project-card-footer">
            <button type="button" class="project-action-link" aria-label="View technical specifications for ${escapeHtml(project.title)}">
              View Project <span>&rarr;</span>
            </button>
            <div class="project-ext-links">
              ${project.githubUrl ? `
                <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="icon-btn-subtle" title="View GitHub Code" aria-label="GitHub Repository">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Append the "+ More Projects..." card from the mockup design
  const moreCardHtml = `
    <article class="more-projects-card fade-up-element">
      <div class="more-icon-plus">+</div>
      <h3 class="more-title">More Projects...</h3>
      <p class="more-sub">More backend systems and experiments coming soon!</p>
      <span class="more-badge">Stay tuned!</span>
    </article>
  `;

  grid.innerHTML = cardsHtml + moreCardHtml;
}

/**
 * Navigation & Header Logic
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen 
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
      });
    });
  }

  // Active section tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/**
 * Scroll Progress, Back-to-Top, and Fade-Up Reveals
 */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Fade-up Reveal Observer
  const fadeElements = document.querySelectorAll('.fade-up-element');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  fadeElements.forEach(el => revealObserver.observe(el));
}

/**
 * Dynamic Copyright Year
 */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
