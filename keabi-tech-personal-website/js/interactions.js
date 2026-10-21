/**
 * Keabi Tech — Interactions & Modal Systems
 * Handles project modals, search/filtering, toast alerts, copy-to-clipboard, and form validation.
 */

import { PROJECTS_DATA } from './projects.js';

let lastFocusedElement = null;

export function initInteractions() {
  initProjectModals();
  initProjectFiltersAndSearch();
  initCopyActions();
  initContactForm();
  initResumeModal();
}

/**
 * Toast Notification System
 */
export function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  const iconSvg = type === 'success' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6a00" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`;

  toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/**
 * Project Details Modal
 */
function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalContainer = document.getElementById('project-modal-container');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !modalContainer) return;

  // Open modal on click of any project card trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-id]');
    if (trigger && !e.target.closest('a')) {
      const projectId = trigger.getAttribute('data-project-id');
      const project = PROJECTS_DATA.find(p => p.id === projectId);
      if (project) {
        lastFocusedElement = trigger;
        openProjectModal(project);
      }
    }
  });

  // Close actions
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

export function openProjectModal(project) {
  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-dynamic-content');
  if (!modalOverlay || !modalBody) return;

  const techBadges = project.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');
  const keyFeaturesList = project.keyFeatures.map(f => `<li>${escapeHtml(f)}</li>`).join('');
  
  const githubLink = project.githubUrl 
    ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
         Repository Code
       </a>`
    : `<span class="btn btn-secondary btn-sm" style="opacity:0.6; cursor:not-allowed;" title="Private academic work / local repository">Private Repository</span>`;

  const liveDemoLink = project.liveDemoUrl
    ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Preview &rarr;</a>`
    : `<span class="btn btn-secondary btn-sm" style="opacity:0.6; cursor:not-allowed;" title="Local desktop / intranet service">Local / Self-Hosted Service</span>`;

  modalBody.innerHTML = `
    <div class="modal-header-meta">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <span class="project-status-tag ${project.status.toLowerCase().replace(' ', '-')}">${escapeHtml(project.status)}</span>
        <span class="section-tag" style="margin:0;">SYSTEM SPEC</span>
      </div>
      <h2 class="modal-title">${escapeHtml(project.title)}</h2>
      <p class="modal-tagline">${escapeHtml(project.tagline)}</p>
    </div>

    <div class="project-tags" style="margin-bottom: 1.5rem;">
      ${techBadges}
    </div>

    <h3 class="modal-section-title">Problem Statement</h3>
    <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary);">${escapeHtml(project.problemSolved)}</p>

    <h3 class="modal-section-title">Overview & Engineering Implementation</h3>
    <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary);">${escapeHtml(project.fullDescription)}</p>

    <h3 class="modal-section-title">System Architecture (${escapeHtml(project.architecture.type)})</h3>
    <pre class="modal-ascii-arch"><code>${escapeHtml(project.architecture.diagram)}</code></pre>
    <ul style="padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-top: 0.5rem;">
      ${project.architecture.points.map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}
    </ul>

    <h3 class="modal-section-title">Key Technical Capabilities</h3>
    <ul style="padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
      ${keyFeaturesList}
    </ul>

    <h3 class="modal-section-title">Engineering Challenge & Lesson Learned</h3>
    <p style="font-size: 0.9rem; line-height: 1.65; color: var(--text-secondary); background: var(--bg-secondary); padding: 0.85rem 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-primary);">
      ${escapeHtml(project.challenges)}
    </p>

    <div style="display:flex; align-items:center; gap:1rem; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
      ${githubLink}
      ${liveDemoLink}
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Set accessibility focus
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

export function closeProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay) return;
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/**
 * Filter & Search for Projects
 */
function initProjectFiltersAndSearch() {
  const searchInput = document.getElementById('project-search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let activeFilter = 'all';
  let activeQuery = '';

  function filterProjects() {
    const cards = document.querySelectorAll('.project-card[data-category]');
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
      const snippet = (card.querySelector('.project-snippet')?.textContent || '').toLowerCase();
      const tags = (card.querySelector('.project-tags')?.textContent || '').toLowerCase();

      const matchesFilter = (activeFilter === 'all') || (category === activeFilter);
      const matchesSearch = !activeQuery || 
        title.includes(activeQuery) || 
        snippet.includes(activeQuery) || 
        tags.includes(activeQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const emptyNotice = document.getElementById('projects-empty-state');
    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeQuery = e.target.value.trim().toLowerCase();
      filterProjects();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      filterProjects();
    });
  });
}

/**
 * Copy to Clipboard System
 */
function initCopyActions() {
  document.querySelectorAll('[data-copy-text]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy-text');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`, 'success');
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        showToast(`Copied to clipboard: ${text}`, 'success');
      });
    });
  });
}

/**
 * Contact Form with Honest Static Handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'Project Inquiry from Keabi Tech';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('Please fill in your name, email, and message.', 'info');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'info');
      return;
    }

    // Construct mailto link fallback
    const mailtoUrl = `mailto:keabzendbekele8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Keabi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    showToast('Opening your email client to dispatch the message...', 'success');
    
    // Attempt window.location mailto
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);

    form.reset();
  });
}

/**
 * Resume Modal / Document viewer
 */
function initResumeModal() {
  const resumeBtn = document.getElementById('download-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('resume-modal-close');

  if (!resumeBtn || !resumeModal) return;

  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
