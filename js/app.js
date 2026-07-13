/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Himalaya College of Science & Technology
 * Core Application Script (Vanilla JS with JSDoc compiler annotations)
 * Provides dynamic styling, transitions, interactive elements, state management, and form submissions.
 */

/* Retrieve global datasets from window mapped by data.js - accessed directly from global scope */

// ==========================================
// 1. APPLICATION STATE
// ==========================================

/** @type {number} */
let currentTestimonialIndex = 0;

/** @type {number|null} */
let testimonialTimer = null;

/** @type {string} */
let currentGalleryCategory = 'all';

/** @type {string} */
let activeFeaturesTab = 'strengths';

/** @type {string} */
let activeProgramsFilter = 'all';

/** @type {string} */
let activeProgramsSearch = '';

/** @type {string} */
let selectedProgramForApply = '';

/** @type {Object[]} */
let clientApplications = [];

// Persistent local application storage loading
try {
  const saved = localStorage.getItem('hcst_applications');
  if (saved) {
    clientApplications = JSON.parse(saved);
  }
} catch (e) {
  console.error('Failed to parse hcst_applications from storage', e);
}

// ==========================================
// 2. HELPER UTILITY FOR SVG ICONS
// ==========================================

/**
 * Generates SVG markup for design icons.
 * @param {string} iconName - Name of the requested icon.
 * @returns {string} SVG HTML markup.
 */
function getIconSvg(iconName) {
  switch (iconName) {
    case 'users':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
    case 'building':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" x2="15" y1="22" y2="22"/><line x1="9" x2="15" y1="16" y2="16"/><line x1="9" x2="15" y1="12" y2="12"/><line x1="9" x2="15" y1="8" y2="8"/></svg>`;
    case 'file-text':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`;
    case 'globe':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    case 'key':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6"/></svg>`;
    case 'medal':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/><path d="M12 15V8"/></svg>`;
    case 'laptop':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/><line x1="12" x2="12" y1="17" y2="20"/></svg>`;
    case 'cpu':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>`;
    case 'book':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
    case 'trophy':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a4.99 4.99 0 0 0-5 5v5a5 5 0 0 0 10 0V7a4.99 4.99 0 0 0-5-5z"/></svg>`;
    case 'heart':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    case 'leaf':
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 0 8a5.95 5.95 0 0 1-5.1 3.75"/><path d="M17.4 6.2c.2.2.4.5.3.7A10.87 10.87 0 0 1 12 11.5"/></svg>`;
    default:
      return `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

// ==========================================
// 3. PAGE INITIALIZATION ENTRYPOINT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  renderFeaturedTabs();
  renderAcademicsExplorer();
  initAdmissionsSuite();
  initTestimonialCarousel();
  renderCollegeGallery();
  renderFaqSection();
  initContactForms();
  initStatsIntersectionObserver();
  initGlobalModals();
  updateCurrentYear();
});

/**
 * Updates the footer copy symbol copyright to current real year.
 */
function updateCurrentYear() {
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear().toString();
  }
}

// ==========================================
// 4. NAVIGATION & SCROLL TRACKING MODULE
// ==========================================
function initNavbarScroll() {
  const header = document.getElementById('main-header');
  const scrollProg = document.getElementById('scroll-progress');
  const scrollBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    const sTop = window.scrollY;
    
    // Dynamic background scroll threshold blurring and header py alignment
    if (header) {
      if (sTop > 20) {
        header.classList.remove('py-6', 'border-transparent');
        header.classList.add('bg-black/90', 'backdrop-blur-md', 'py-4', 'border-white/5');
      } else {
        header.classList.add('py-6', 'border-transparent');
        header.classList.remove('bg-black/90', 'backdrop-blur-md', 'py-4', 'border-white/5');
      }
    }

    // Scroll active timeline top indicator
    if (scrollProg) {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? (sTop / docHeight) * 100 : 0;
      scrollProg.style.width = `${pct}%`;
    }

    // Highlighting active section navbar link
    const sections = ['home', 'about', 'why-choose-us', 'courses', 'admissions', 'leadership', 'gallery', 'faq', 'contact'];
    let activeId = 'home';
    const scrollPos = sTop + 140;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const h = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + h) {
          activeId = id;
        }
      }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('text-[#C5A059]');
        link.classList.remove('text-slate-400');
      } else {
        link.classList.remove('text-[#C5A059]');
        link.classList.add('text-slate-400');
      }
    });
  });

  // Scroll to top button action
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (toggleBtn && drawer && iconOpen && iconClose) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = !drawer.classList.contains('translate-x-full');
      if (isOpen) {
        drawer.classList.add('translate-x-full');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      } else {
        drawer.classList.remove('translate-x-full');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
      }
    });

    // Close mobile drawer on any navigation selection
    const mobileLinks = drawer.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.add('translate-x-full');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });
  }
}

// ==========================================
// 5. CORE VALUES & CAMPUS FACILITIES MODULE
// ==========================================
function renderFeaturedTabs() {
  const gridContainer = document.getElementById('features-grid');
  const btnStrengths = document.getElementById('tab-btn-strengths');
  const btnFacilities = document.getElementById('tab-btn-facilities');

  const coreStrengths = [
    { title: 'World-Class Faculty', icon: 'users', desc: 'Highly qualified and experienced educators with advanced degrees and research expertise dedicated to mentoring students.' },
    { title: 'Modern Infrastructure', icon: 'building', desc: 'Smart classrooms, advanced science and computer complexes, and spacious research halls built for interactive studies.' },
    { title: 'Diverse Programs', icon: 'file-text', desc: 'Comprehensive courses ranging from Intermediate (FSc/ICS) to specialized Bachelor & Diploma programs.' },
    { title: 'Global Standards', icon: 'globe', desc: 'Modernized curriculum conforming to international criteria, encouraging research projects and field internships.' },
    { title: 'Career Guidance', icon: 'key', desc: 'Focused career workshops, CV reviews, and strategic university bridging partnerships for advanced professional progress.' },
    { title: 'Proven Success Record', icon: 'medal', desc: 'Exemplary 99% average student examination clearance rates, with alumni pursuing science globally.' }
  ];

  const advancedFacilities = [
    { title: 'LMS Digital Platform', icon: 'laptop', desc: 'Unified, always-on Digital Learning Management System featuring virtual class materials and lecture records 24/7.' },
    { title: 'High-Tech Labs', icon: 'cpu', desc: 'Fully equipped biochemistry, modern physics, and computing labs containing advanced simulation software tools.' },
    { title: 'Spacious Library Access', icon: 'book', desc: 'Spanning thousands of physical reference directories, scientific journals, and online digital libraries.' },
    { title: 'Co-Curricular Clubs', icon: 'trophy', desc: 'Annual physical sports, inter-college debates, science expos, and cultural circles building teamwork.' },
    { title: 'Comprehensive Welfare Hub', icon: 'heart', desc: 'Personalized mental counseling cycles, immediate physical first aid support, and tuition assistance pathways.' },
    { title: 'Green Eco-Campus', icon: 'leaf', desc: 'Solar powered backup, advanced waste division programs, and a beautiful gardenscape encouraging bio-sustainability.' }
  ];

  const list = activeFeaturesTab === 'strengths' ? coreStrengths : advancedFacilities;

  if (gridContainer) {
    gridContainer.innerHTML = '';
    list.forEach((feat, idx) => {
      const card = document.createElement('div');
      card.className = "p-8 bg-[#0A0A0A] rounded-none border border-white/5 hover:border-gold/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col h-full group opacity-0 translate-y-4";
      card.style.animation = `fadeInUp 0.4s ease-out ${idx * 0.05}s forwards`;
      
      card.innerHTML = `
        <div class="p-3.5 bg-white/[0.03] border border-white/10 rounded-none w-fit mb-6 group-hover:bg-gold group-hover:text-black transition-all duration-300 animate-pulse-none">
          ${getIconSvg(feat.icon)}
        </div>
        <h3 class="text-base font-semibold uppercase tracking-wide text-white mb-3 group-hover:text-gold transition-colors">
          ${feat.title}
        </h3>
        <p class="text-slate-400 text-sm leading-relaxed font-light flex-grow">
          ${feat.desc}
        </p>
      `;
      gridContainer.appendChild(card);
    });
  }

  // Bind Switch Tab interactions
  if (btnStrengths && btnFacilities) {
    btnStrengths.onclick = () => {
      if (activeFeaturesTab !== 'strengths') {
        activeFeaturesTab = 'strengths';
        btnStrengths.className = "feat-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.15em] uppercase transition-all bg-gold text-black shadow-lg";
        btnFacilities.className = "feat-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.15em] uppercase transition-all text-slate-400 hover:text-white";
        renderFeaturedTabs();
      }
    };

    btnFacilities.onclick = () => {
      if (activeFeaturesTab !== 'facilities') {
        activeFeaturesTab = 'facilities';
        btnFacilities.className = "feat-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.15em] uppercase transition-all bg-gold text-black shadow-lg";
        btnStrengths.className = "feat-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.15em] uppercase transition-all text-slate-400 hover:text-white";
        renderFeaturedTabs();
      }
    };
  }
}

// ==========================================
// 6. ACADEMICS SEARCH & FILTER EXPLORER
// ==========================================
function renderAcademicsExplorer() {
  const container = document.getElementById('programs-grid');
  const fallback = document.getElementById('empty-search-fallback');
  const searchInput = document.getElementById('program-search');
  const resetBtn = document.getElementById('reset-search-btn');

  const list = [
    ...COURSES.map(c => Object.assign({}, c, { type: 'intermediate' })),
    ...PROGRAMS.map(p => Object.assign({}, p, { type: 'degree' }))
  ];

  // Search filtering algorithm
  const filtered = list.filter(item => {
    const matchesFilter = activeProgramsFilter === 'all' || item.type === activeProgramsFilter;
    const matchesKeyword = item.title.toLowerCase().includes(activeProgramsSearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(activeProgramsSearch.toLowerCase());
    return matchesFilter && matchesKeyword;
  });

  if (container && fallback) {
    container.innerHTML = '';
    if (filtered.length === 0) {
      container.classList.add('hidden');
      fallback.classList.remove('hidden');
    } else {
      container.classList.remove('hidden');
      fallback.classList.add('hidden');

      filtered.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = "p-6 sm:p-8 bg-[#0A0A0A] rounded-none border border-white/5 hover:border-gold/30 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between group opacity-0 translate-y-4";
        div.style.animation = `fadeInUp 0.5s ease-out ${idx * 0.04}s forwards`;

        const tagLabel = item.type === 'intermediate' ? 'Intermediate Prep' : 'Degree & Diploma';

        div.innerHTML = `
          <div>
            <span class="inline-block px-2.5 py-1 bg-white/[0.02] border border-white/10 rounded-none text-[8.5px] font-bold uppercase tracking-widest text-gold mb-5">
              ${tagLabel}
            </span>
            <h3 class="text-lg sm:text-xl font-light text-white font-serif leading-none mb-3 group-hover:text-gold transition-colors duration-200">${item.title}</h3>
            <p class="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">${item.description}</p>
          </div>

          <div class="pt-5 border-t border-white/5 flex items-center justify-between mt-auto">
            <span class="text-[10px] font-mono uppercase tracking-wider text-slate-500">${item.duration}</span>
            <button class="view-item-specs px-4 py-2 bg-white/[0.02] border border-white/10 hover:border-gold text-[9px] font-bold uppercase tracking-wider text-slate-300 hover:text-gold transition-all duration-300 cursor-pointer" data-id="${item.id}" data-type="${item.type}">
              View Specs
            </button>
          </div>
        `;
        container.appendChild(div);
      });

      // Bind dynamic specifications modals
      const specBtns = container.querySelectorAll('.view-item-specs');
      specBtns.forEach(btn => {
        btn.onclick = (e) => {
          const target = e.currentTarget;
          const id = target.getAttribute('data-id');
          const type = target.getAttribute('data-type');
          if (id && type) {
            triggerSpecsModal(id, type);
          }
        };
      });
    }
  }

  // Bind academic category triggers
  const filterBtns = document.querySelectorAll('.prog-filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = (e) => {
      const testBtn = e.currentTarget;
      filterBtns.forEach(b => {
        b.className = "prog-filter-btn px-5 py-2.5 rounded-none text-xs font-bold tracking-[0.15em] uppercase transition-all text-slate-400 hover:text-white hover:bg-white/[0.02] w-full sm:w-auto cursor-pointer";
      });
      testBtn.className = "prog-filter-btn px-5 py-2.5 rounded-none text-xs font-bold tracking-[0.15em] uppercase transition-all bg-gold text-black shadow-lg w-full sm:w-auto cursor-pointer";
      activeProgramsFilter = testBtn.getAttribute('data-filter') || 'all';
      renderAcademicsExplorer();
    };
  });

  // Live input tracker
  if (searchInput) {
    searchInput.oninput = (e) => {
      activeProgramsSearch = e.target.value;
      renderAcademicsExplorer();
    };
  }

  // Live input reset
  if (resetBtn && searchInput) {
    resetBtn.onclick = () => {
      searchInput.value = '';
      activeProgramsSearch = '';
      activeProgramsFilter = 'all';
      filterBtns.forEach((b, i) => {
        if (i === 0) {
          b.className = "prog-filter-btn px-5 py-2.5 rounded-none text-xs font-bold tracking-[0.15em] uppercase transition-all bg-gold text-black shadow-lg w-full sm:w-auto cursor-pointer";
        } else {
          b.className = "prog-filter-btn px-5 py-2.5 rounded-none text-xs font-bold tracking-[0.15em] uppercase transition-all text-slate-400 hover:text-white hover:bg-white/[0.02] w-full sm:w-auto cursor-pointer";
        }
      });
      renderAcademicsExplorer();
    };
  }
}

/**
 * Specs details dialog renderer
 * @param {string} id 
 * @param {string} type 
 */
function triggerSpecsModal(id, type) {
  const modal = document.getElementById('detail-modal');
  const level = document.getElementById('modal-level');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-description');
  const duration = document.getElementById('modal-duration');
  const criteria = document.getElementById('modal-criteria');
  const list = document.getElementById('modal-features-list');
  const applyBtn = document.getElementById('modal-apply-btn');
  const listHeader = document.getElementById('modal-features-header');

  if (!modal) return;

  if (type === 'intermediate') {
    const item = COURSES.find(c => c.id === id);
    if (item && level && title && desc && duration && criteria && list && applyBtn && listHeader) {
      level.textContent = 'Intermediate Course Prep';
      title.textContent = item.title;
      desc.textContent = item.description;
      duration.textContent = item.duration;
      criteria.textContent = item.eligibility;
      listHeader.textContent = 'Discipline Syllabus & Training Features';

      list.innerHTML = '';
      item.features.forEach(feat => {
        const li = document.createElement('li');
        li.className = "flex items-start gap-2.5 text-xs sm:text-sm text-slate-400";
        li.innerHTML = `
          <svg class="h-4 w-4 text-gold shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          <span>${feat}</span>
        `;
        list.appendChild(li);
      });

      selectedProgramForApply = item.title;
      modal.classList.remove('hidden');
    }
  } else {
    const item = PROGRAMS.find(p => p.id === id);
    if (item && level && title && desc && duration && criteria && list && applyBtn && listHeader) {
      level.textContent = 'Professional Degree Program';
      title.textContent = item.title;
      desc.textContent = item.details || item.description;
      duration.textContent = item.duration;
      criteria.textContent = item.requirements;
      listHeader.textContent = 'Target Employment & Career Pathways';

      list.innerHTML = '';
      item.careers.forEach(career => {
        const li = document.createElement('li');
        li.className = "flex items-start gap-2.5 text-xs sm:text-sm text-slate-400";
        li.innerHTML = `
          <svg class="h-4 w-4 text-gold shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          <span class="font-semibold text-slate-200">${career}</span>
        `;
        list.appendChild(li);
      });

      selectedProgramForApply = item.title;
      modal.classList.remove('hidden');
    }
  }
}

function initGlobalModals() {
  const modal = document.getElementById('detail-modal');
  const overlay = document.getElementById('detail-modal-overlay');
  const closeBtn = document.getElementById('close-modal-btn');
  const closeSecBtn = document.getElementById('modal-close-secondary-btn');
  const applyBtn = document.getElementById('modal-apply-btn');

  function dismiss() {
    if (modal) modal.classList.add('hidden');
  }

  if (overlay) overlay.onclick = dismiss;
  if (closeBtn) closeBtn.onclick = dismiss;
  if (closeSecBtn) closeSecBtn.onclick = dismiss;

  if (applyBtn) {
    applyBtn.onclick = () => {
      dismiss();
      const applyTab = document.getElementById('portal-tab-apply');
      const trackTab = document.getElementById('portal-tab-track');
      const applyForm = document.getElementById('apply-portal-form');
      const trackSect = document.getElementById('track-portal-container');
      const progSelect = document.getElementById('student-program-select');

      // Swap viewports to register suite
      if (applyTab && trackTab && applyForm && trackSect) {
        applyTab.className = "portal-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase transition-all bg-gold text-black shadow-lg cursor-pointer";
        trackTab.className = "portal-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase transition-all text-slate-400 hover:text-white cursor-pointer";
        applyForm.classList.remove('hidden');
        trackSect.classList.add('hidden');
      }

      // Automatically configure selector options
      if (progSelect && selectedProgramForApply) {
        progSelect.value = selectedProgramForApply;
      }

      // Scroll view smoothly down to anchor
      const admEl = document.getElementById('admissions');
      if (admEl) {
        admEl.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }
}

// ==========================================
// 7. ONLINE ADMISSION PORTAL MODULE
// ==========================================
function initAdmissionsSuite() {
  const applyTab = document.getElementById('portal-tab-apply');
  const trackTab = document.getElementById('portal-tab-track');
  const formSection = document.getElementById('apply-portal-form');
  const trackSection = document.getElementById('track-portal-container');
  const countBadge = document.getElementById('apps-badge-count');
  const alertPanel = document.getElementById('portal-alert');

  /**
   * Helper warning alerts
   * @param {string} text 
   * @param {string} type 
   */
  function triggerSuiteAlert(text, type) {
    if (!alertPanel) return;
    alertPanel.className = ""; // clear
    alertPanel.innerHTML = "";

    const successStyle = "p-4 bg-white/[0.01] border border-gold/30 text-gold rounded-none text-xs tracking-wide font-medium mb-6 flex items-start gap-2.5";
    const errorStyle = "p-4 bg-[#140b0b] border border-rose-950 text-rose-400 rounded-none text-xs tracking-wide font-medium mb-6 flex items-start gap-2.5";

    alertPanel.className = type === 'success' ? successStyle : errorStyle;

    const iconSvg = type === 'success' 
      ? `<svg class="h-4 w-4 shrink-0 mt-0.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`
      : `<svg class="h-4 w-4 shrink-0 mt-0.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;

    alertPanel.innerHTML = `
      ${iconSvg}
      <span>${text}</span>
    `;
    alertPanel.classList.remove('hidden');
    alertPanel.classList.add('flex');
    alertPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderSubmissionsBadge() {
    if (countBadge) {
      countBadge.textContent = clientApplications.length.toString();
    }
  }

  renderSubmissionsBadge();

  // Tab button toggling mechanisms
  if (applyTab && trackTab && formSection && trackSection) {
    applyTab.onclick = () => {
      applyTab.className = "portal-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase transition-all bg-gold text-black shadow-lg cursor-pointer";
      trackTab.className = "portal-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase transition-all text-slate-400 hover:text-white cursor-pointer";
      formSection.classList.remove('hidden');
      trackSection.classList.add('hidden');
      if (alertPanel) alertPanel.classList.add('hidden');
    };

    trackTab.onclick = () => {
      trackTab.className = "portal-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase transition-all bg-gold text-black shadow-lg cursor-pointer";
      applyTab.className = "portal-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase transition-all text-slate-400 hover:text-white cursor-pointer";
      formSection.classList.add('hidden');
      trackSection.classList.remove('hidden');
      if (alertPanel) alertPanel.classList.add('hidden');
      renderRecentSubmissionsList();
    };
  }

  // Capture admissions suite submission
  const applyFormEl = document.getElementById('apply-portal-form');
  if (applyFormEl) {
    applyFormEl.onsubmit = (e) => {
      e.preventDefault();

      const nameInp = document.getElementById('student-name-input');
      const fatherInp = document.getElementById('father-name-input');
      const emailInp = document.getElementById('student-email-input');
      const phoneInp = document.getElementById('student-phone-input');
      const progSelect = document.getElementById('student-program-select');
      const sessSelect = document.getElementById('student-session-select');
      const cityInp = document.getElementById('student-city-input');
      const qualInp = document.getElementById('student-qualification-input');
      const msgInp = document.getElementById('student-message-input');

      // Validation
      if (!nameInp.value.trim() || !fatherInp.value.trim() || !emailInp.value.trim() || !phoneInp.value.trim() || !progSelect.value || !sessSelect.value || !cityInp.value.trim() || !qualInp.value.trim()) {
        triggerSuiteAlert('Please fill out all required academic fields.', 'error');
        return;
      }

      const applicationNumber = `HCST-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp = {
        id: Math.random().toString(36).substring(2, 11),
        applicationNumber,
        name: nameInp.value.trim(),
        fatherName: fatherInp.value.trim(),
        email: emailInp.value.trim(),
        phone: phoneInp.value.trim(),
        program: progSelect.value,
        session: sessSelect.value,
        city: cityInp.value.trim(),
        qualification: qualInp.value.trim(),
        message: msgInp.value.trim() || undefined,
        status: 'Under Review',
        submittedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // pre-pend
      clientApplications = [newApp].concat(clientApplications);
      try {
        localStorage.setItem('hcst_applications', JSON.stringify(clientApplications));
      } catch (err) {
        console.error('Failed to save application to device', err);
      }

      applyFormEl.reset();
      renderSubmissionsBadge();

      // Show alerts and swap tab focus
      triggerSuiteAlert(`Application submitted successfully! Tracking Number: ${applicationNumber}`, 'success');

      if (applyTab && trackTab && formSection && trackSection) {
        trackTab.className = "portal-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase transition-all bg-gold text-black shadow-lg cursor-pointer";
        applyTab.className = "portal-tab-btn flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold tracking-[0.1em] uppercase transition-all text-slate-400 hover:text-white cursor-pointer";
        formSection.classList.add('hidden');
        trackSection.classList.remove('hidden');
      }

      // Pre-fill tracked variables
      const trackInput = document.getElementById('track-id-input');
      if (trackInput) {
        trackInput.value = applicationNumber;
      }
      triggerSearchTracking(applicationNumber);
    };
  }

  // Tracker forms
  const trackFormEl = document.getElementById('track-id-form');
  if (trackFormEl) {
    trackFormEl.onsubmit = (e) => {
      e.preventDefault();
      const trackInp = document.getElementById('track-id-input');
      if (trackInp) {
        triggerSearchTracking(trackInp.value.trim());
      }
    };
  }

  /**
   * Search and highlight tracking timelines
   * @param {string} code 
   */
  function triggerSearchTracking(code) {
    const singleLayout = document.getElementById('single-app-tracking-layout');
    const recentLayout = document.getElementById('recent-submissions-card-flow');

    if (!singleLayout || !recentLayout) return;

    if (alertPanel) alertPanel.classList.add('hidden');

    const match = clientApplications.find(
      app => app.applicationNumber.toLowerCase().trim() === code.toLowerCase().trim()
    );

    if (match) {
      const respCode = document.getElementById('track-resp-code');
      const respStatus = document.getElementById('track-resp-status');
      const respName = document.getElementById('track-resp-name');
      const respProg = document.getElementById('track-resp-prog');
      const respSess = document.getElementById('track-resp-sess');
      const respDate = document.getElementById('track-resp-date');

      if (respCode) respCode.textContent = match.applicationNumber;
      if (respName) respName.textContent = match.name;
      if (respProg) respProg.textContent = match.program;
      if (respSess) respSess.textContent = match.session;
      if (respDate) respDate.textContent = match.submittedAt;

      // Status visual highlight styling
      if (respStatus) {
        respStatus.textContent = match.status;
        respStatus.className = "px-3 py-1.5 border rounded-none text-[10px] font-bold uppercase tracking-wider leading-none";

        switch (match.status) {
          case 'Under Review':
            respStatus.classList.add('bg-amber-100', 'text-amber-800', 'dark:bg-amber-950/20', 'dark:text-amber-400', 'border-amber-200');
            break;
          case 'Document Verification':
            respStatus.classList.add('bg-blue-100', 'text-blue-800', 'dark:bg-blue-950/20', 'dark:text-sky-400', 'border-blue-200');
            break;
          case 'Accepted':
            respStatus.classList.add('bg-emerald-100', 'text-emerald-800', 'dark:bg-emerald-950/20', 'dark:text-emerald-400', 'border-emerald-200');
            break;
          default:
            respStatus.classList.add('bg-rose-100', 'text-rose-800', 'dark:bg-rose-950/20', 'dark:text-rose-400', 'border-rose-200');
            break;
        }
      }

      // update dynamic timeline dots
      const step2 = document.getElementById('tracker-step-2');
      const header2 = document.getElementById('tracker-header-2');
      const step3 = document.getElementById('tracker-step-3');
      const header3 = document.getElementById('tracker-header-3');
      const step4 = document.getElementById('tracker-step-4');
      const header4 = document.getElementById('tracker-header-4');

      // reset defaults
      if (step2) step2.className = "absolute left-[-25px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-[#0A0A0A] border-white/10";
      if (header2) header2.className = "font-semibold text-slate-500";
      if (step3) step3.className = "absolute left-[-25px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-[#0A0A0A] border-white/10";
      if (header3) header3.className = "font-semibold text-slate-500";
      if (step4) step4.className = "absolute left-[-25px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-[#0A0A0A] border-white/10";
      if (header4) header4.className = "font-semibold text-slate-500";

      if (match.status !== 'Under Review') {
        if (step2) step2.className = "absolute left-[-25px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-gold border-gold";
        if (header2) header2.className = "font-semibold text-slate-200";
      }

      if (match.status === 'Accepted') {
        if (step3) step3.className = "absolute left-[-25px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-gold border-gold";
        if (header3) header3.className = "font-semibold text-slate-200";
        if (step4) step4.className = "absolute left-[-25px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-gold border-gold";
        if (header4) header4.className = "font-semibold text-slate-200";
      }

      singleLayout.classList.remove('hidden');
      recentLayout.classList.add('hidden');
    } else {
      singleLayout.classList.add('hidden');
      recentLayout.classList.remove('hidden');
      triggerSuiteAlert('No application found with that tracking code. Check spelling and try again.', 'error');
    }
  }

  function renderRecentSubmissionsList() {
    const listContainer = document.getElementById('submission-items-list');
    const recentBlock = document.getElementById('recent-submissions-card-flow');
    const singleLayout = document.getElementById('single-app-tracking-layout');

    if (!listContainer || !recentBlock || !singleLayout) return;

    if (clientApplications.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-10 text-slate-500 text-sm font-light">
          No submissions logged on this device. Use the "Apply" tab to register.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = '';
    clientApplications.forEach(app => {
      const row = document.createElement('div');
      row.className = "p-4 bg-white/[0.015] rounded-none border border-white/5 hover:border-gold/30 transition-all flex items-center justify-between gap-4";
      row.innerHTML = `
        <div>
          <div class="text-[10px] font-bold text-gold font-mono">${app.applicationNumber}</div>
          <div class="text-sm font-semibold text-white mt-0.5">${app.program}</div>
          <div class="text-[10px] text-slate-500 mt-0.5">${app.submittedAt}</div>
        </div>
        <button class="track-item-inspect-btn px-3.5 py-1.5 rounded-none bg-white/[0.02] border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none cursor-pointer" data-code="${app.applicationNumber}">
          View Live
        </button>
      `;
      listContainer.appendChild(row);
    });

    // bind visual selection
    const inspectBtns = listContainer.querySelectorAll('.track-item-inspect-btn');
    inspectBtns.forEach(btn => {
      btn.onclick = (e) => {
        const target = e.currentTarget;
        const code = target.getAttribute('data-code');
        if (code) {
          const trackInput = document.getElementById('track-id-input');
          if (trackInput) trackInput.value = code;
          triggerSearchTracking(code);
        }
      };
    });
  }
}

// ==========================================
// 8. TESTIMONIALS SLIDER MODULE
// ==========================================
function initTestimonialCarousel() {
  const contentBox = document.getElementById('testimonial-slide-content');
  const starBox = document.getElementById('testimonial-stars');
  const quoteEl = document.getElementById('testimonial-quote');
  const authorEl = document.getElementById('testimonial-author');
  const roleEl = document.getElementById('testimonial-role');

  const prevBtn = document.getElementById('testimonial-prev-btn');
  const nextBtn = document.getElementById('testimonial-next-btn');
  const dotsContainer = document.getElementById('testimonial-dots-container');

  function updateSlide() {
    const data = TESTIMONIALS[currentTestimonialIndex];
    if (!data) return;

    if (contentBox) {
      contentBox.style.opacity = '0';
      contentBox.style.transform = 'scale(0.98)';
    }

    setTimeout(() => {
      // dynamic ratings
      if (starBox) {
        starBox.innerHTML = '';
        for (let i = 0; i < 5; i++) {
          const span = document.createElement('span');
          const isFilled = i < data.rating;
          span.innerHTML = `<svg class="h-4 w-4 ${isFilled ? 'fill-gold text-gold' : 'text-white/10'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
          starBox.appendChild(span);
        }
      }

      if (quoteEl) quoteEl.textContent = `"${data.text}"`;
      if (authorEl) authorEl.textContent = data.author;
      if (roleEl) roleEl.textContent = data.role;

      // sync indicators
      if (dotsContainer) {
        const dotItems = dotsContainer.querySelectorAll('button');
        dotItems.forEach((dot, idx) => {
          if (idx === currentTestimonialIndex) {
            dot.className = "h-1 cursor-pointer focus:outline-none transition-all w-6 bg-gold";
          } else {
            dot.className = "h-1 cursor-pointer focus:outline-none transition-all w-2 bg-white/20 hover:bg-white/40";
          }
        });
      }

      if (contentBox) {
        contentBox.style.opacity = '1';
        contentBox.style.transform = 'scale(1)';
      }
    }, 250);
  }

  function renderIndicatorDots() {
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      TESTIMONIALS.forEach((_, idx) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', `Testimonial slide indicator ${idx + 1}`);
        if (idx === currentTestimonialIndex) {
          btn.className = "h-1 cursor-pointer focus:outline-none transition-all w-6 bg-gold";
        } else {
          btn.className = "h-1 cursor-pointer focus:outline-none transition-all w-2 bg-white/20 hover:bg-white/40";
        }
        btn.onclick = () => {
          stopTimer();
          currentTestimonialIndex = idx;
          updateSlide();
          startTimer();
        };
        dotsContainer.appendChild(btn);
      });
    }
  }

  function advanceNext() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % TESTIMONIALS.length;
    updateSlide();
  }

  function advancePrev() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    updateSlide();
  }

  function startTimer() {
    testimonialTimer = window.setInterval(advanceNext, 6000);
  }

  function stopTimer() {
    if (testimonialTimer) {
      clearInterval(testimonialTimer);
      testimonialTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      stopTimer();
      advancePrev();
      startTimer();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      stopTimer();
      advanceNext();
      startTimer();
    };
  }

  // Hover pauses loop
  const outerBox = document.getElementById('testimonial-box');
  if (outerBox) {
    outerBox.onmouseenter = stopTimer;
    outerBox.onmouseleave = startTimer;
  }

  renderIndicatorDots();
  updateSlide();
  startTimer();
}

// ==========================================
// 9. HIGH-QUALITY LIGHTBOX PHOTO VIEWER
// ==========================================
let activeLightboxIndex = 0;
/** @type {Object[]} */
let lightboxFilteredList = [];

function renderCollegeGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const filtered = GALLERY_IMAGES.filter(img => {
    return currentGalleryCategory === 'all' || img.category === currentGalleryCategory;
  });

  lightboxFilteredList = filtered;

  container.innerHTML = '';
  filtered.forEach((img, idx) => {
    const card = document.createElement('div');
    card.className = "group relative bg-[#0A0A0A] rounded-none overflow-hidden border border-white/5 cursor-pointer shadow-md hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 opacity-0 scale-95";
    card.style.animation = `fadeInScale 0.4s ease-out ${idx * 0.04}s forwards`;
    
    card.innerHTML = `
      <div class="relative aspect-video w-full overflow-hidden bg-[#111]">
        <img
          src="${img.url}"
          alt="${img.title}"
          class="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      </div>
      <div class="p-4 relative">
        <span class="inline-block px-1.5 py-0.5 bg-white/[0.04] border border-white/10 rounded-none text-[8px] font-bold uppercase tracking-widest text-gold mb-2">
          ${img.category}
        </span>
        <h4 class="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-gold transition-colors truncate font-sans">${img.title}</h4>
      </div>
    `;

    card.onclick = () => {
      triggerLightboxZoom(idx);
    };

    container.appendChild(card);
  });

  // Bind galleries filters
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = (e) => {
      const fBtn = e.currentTarget;
      filterBtns.forEach(b => {
        b.className = "gallery-filter-btn px-5 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer focus:outline-none bg-white/[0.01] text-slate-400 border border-white/5 hover:bg-white/[0.03] hover:text-white";
      });
      fBtn.className = "gallery-filter-btn px-5 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer focus:outline-none bg-gold text-black shadow-lg";
      currentGalleryCategory = fBtn.getAttribute('data-category') || 'all';
      renderCollegeGallery();
    };
  });
}

/**
 * Zoom lightbox images
 * @param {number} index 
 */
function triggerLightboxZoom(index) {
  activeLightboxIndex = index;
  const modal = document.getElementById('gallery-lightbox');
  const imgEl = document.getElementById('lightbox-image');
  const captionEl = document.getElementById('lightbox-caption-title');
  const countEl = document.getElementById('lightbox-caption-count');
  const headingEl = document.getElementById('lightbox-caption-heading');

  if (!modal || !imgEl || !captionEl || !countEl || !headingEl) return;

  const item = lightboxFilteredList[activeLightboxIndex];
  if (item) {
    imgEl.style.opacity = '0';
    imgEl.style.transform = 'scale(0.97)';

    setTimeout(() => {
      imgEl.src = item.url;
      imgEl.alt = item.title;
      headingEl.textContent = item.id.toUpperCase();
      captionEl.textContent = item.title;
      countEl.innerHTML = `Category: ${item.category.toUpperCase()} &bull; Image ${activeLightboxIndex + 1} of ${lightboxFilteredList.length}`;
      
      imgEl.style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    }, 150);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Bind Keyboard arrows navigation
    document.onkeydown = handleLightboxKeys;
  }
}

/**
 * Handle lightbox keyboard navigation
 * @param {KeyboardEvent} e 
 */
function handleLightboxKeys(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    lightboxNext();
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    lightboxPrev();
  }
}

function lightboxNext() {
  if (lightboxFilteredList.length === 0) return;
  activeLightboxIndex = (activeLightboxIndex + 1) % lightboxFilteredList.length;
  triggerLightboxZoom(activeLightboxIndex);
}

function lightboxPrev() {
  if (lightboxFilteredList.length === 0) return;
  activeLightboxIndex = (activeLightboxIndex - 1 + lightboxFilteredList.length) % lightboxFilteredList.length;
  triggerLightboxZoom(activeLightboxIndex);
}

function closeLightbox() {
  const modal = document.getElementById('gallery-lightbox');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    document.onkeydown = null;
  }
}

// Binds background overlays
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('lightbox-overlay');
  const closeBtn = document.getElementById('close-lightbox-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (overlay) overlay.onclick = closeLightbox;
  if (closeBtn) closeBtn.onclick = closeLightbox;
  if (prevBtn) prevBtn.onclick = lightboxPrev;
  if (nextBtn) nextBtn.onclick = lightboxNext;
});

// ==========================================
// 10. COLLAPSIBLE ACCORDION SUPPORT MODULE
// ==========================================
function renderFaqSection() {
  const container = document.getElementById('faq-accordion-list');
  if (!container) return;

  container.innerHTML = '';
  FAQS.forEach((faq) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = "border border-white/5 bg-[#0A0A0A] rounded-none overflow-hidden transition-all duration-300";

    itemDiv.innerHTML = `
      <button class="faq-header-trigger w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group">
        <span class="text-slate-200 font-medium text-xs sm:text-sm tracking-wide group-hover:text-gold transition-colors font-serif leading-snug">${faq.question}</span>
        <span class="p-1 px-1.5 ml-4 bg-white/[0.02] border border-white/10 group-hover:border-gold/30 text-slate-400 group-hover:text-gold rounded-none transition-all duration-300 transform">
          <svg class="h-3 w-3 transform transition-transform duration-300 faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </span>
      </button>
      <div class="faq-expand-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
        <div class="p-6 pt-0 border-t border-white/5 text-slate-400 text-xs sm:text-sm leading-relaxed font-light font-sans">
          ${faq.answer}
        </div>
      </div>
    `;

    const trigger = itemDiv.querySelector('.faq-header-trigger');
    const content = itemDiv.querySelector('.faq-expand-content');
    const chevron = itemDiv.querySelector('.faq-chevron');

    if (trigger && content) {
      trigger.onclick = () => {
        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

        // reset default states (accordion modes)
        const allContents = container.querySelectorAll('.faq-expand-content');
        const allChevrons = container.querySelectorAll('.faq-chevron');
        const allWrappers = container.querySelectorAll('#faq-accordion-list > div');

        allContents.forEach(c => c.style.maxHeight = '0px');
        allChevrons.forEach(ch => ch.classList.remove('rotate-180'));
        allWrappers.forEach(wr => wr.className = "border border-white/5 bg-[#0A0A0A] rounded-none overflow-hidden transition-all duration-300");

        if (!isOpen) {
          content.style.maxHeight = `${content.scrollHeight}px`;
          if (chevron) chevron.classList.add('rotate-180');
          itemDiv.className = "border border-gold/30 bg-white/[0.01] rounded-none overflow-hidden transition-all duration-300";
        }
      };
    }

    container.appendChild(itemDiv);
  });
}

// ==========================================
// 11. COUNTER GRAPHICAL TICKERS MODULE
// ==========================================
function initStatsIntersectionObserver() {
  const cards = document.querySelectorAll('.stat-card');
  if (cards.length === 0) return;

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const targetVal = parseInt(card.getAttribute('data-target') || '0', 10);
        const spanValue = card.querySelector('.count-value');
        if (spanValue) {
          animateCount(spanValue, targetVal);
        }
        self.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}

/**
 * Graphical counters ticker ease helper
 * @param {Element} elem 
 * @param {number} targetVal 
 */
function animateCount(elem, targetVal) {
  let startValue = 0;
  const durationMs = 1500;
  const frameMs = 1000 / 60;
  const totalFrames = Math.round(durationMs / frameMs);
  let frame = 0;

  const timer = window.setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    // quadratic ease-out helper
    const easeProgress = progress * (2 - progress);
    const currValue = Math.round(startValue + (targetVal - startValue) * easeProgress);
    
    elem.textContent = currValue.toString();

    if (frame >= totalFrames) {
      elem.textContent = targetVal.toString();
      clearInterval(timer);
    }
  }, frameMs);
}

// ==========================================
// 12. INSTANT CONTACT & QUERY INQUIRIES
// ==========================================
function initContactForms() {
  const form = document.getElementById('footer-inquiry-form');
  const alertPanel = document.getElementById('footer-alert');

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('footer-name-input').value.trim();
      const emailVal = document.getElementById('footer-email-input').value.trim();
      const msgVal = document.getElementById('footer-msg-input').value.trim();

      if (!nameVal || !emailVal || !msgVal) return;

      if (alertPanel) {
        alertPanel.className = "p-4 bg-white/[0.01] border border-gold/30 text-gold rounded-none text-xs tracking-wide font-medium mb-6 flex items-start gap-2.5 animate-pulse";
        
        alertPanel.innerHTML = `
          <svg class="h-4 w-4 shrink-0 mt-0.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          <span>Thank you ${nameVal}! Your inquiry has been sent directly to Himalaya College Administration. We will contact you back on ${emailVal} shortly.</span>
        `;
        alertPanel.classList.remove('hidden');
        alertPanel.classList.add('flex');
        
        form.reset();
        
        setTimeout(() => {
          alertPanel.classList.remove('animate-pulse');
        }, 3000);
      }
    };
  }
}
