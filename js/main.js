/**
 * Eventora - Main Application Controller
 * Manages:
 * - Application lifecycle & initializations
 * - Toast notification system
 * - Modal management with keyboard accessibility
 * - Event filtering, searching, sorting, and rendering
 * - Featured events showcase
 * - Live countdown timers for upcoming events
 * - Event details modal with full agenda and seat progress
 * - Host an Event interactive modal
 * - Dark / Light theme toggle
 * - Sticky navigation, mobile drawer, scroll spy, back to top
 */

// --- OFFLINE-RESILIENT ICON RENDERER ---
const ICON_SVGS = {
  "sparkles": '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
  "sun": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  "moon": '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  "menu": '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  "compass": '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  "calendar": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  "clock": '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  "heart": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  "search": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "ticket": '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/>',
  "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "check": '<path d="M20 6 9 17l-5-5"/>',
  "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  "check-circle-2": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "chevron-up": '<path d="m18 15-6-6-6 6"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  "alert-triangle": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  "alert-circle": '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  "plus-circle": '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  "calendar-plus": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/>',
  "calendar-x-2": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m14 14-4 4"/><path d="m10 14 4 4"/>',
  "home": '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  "flame": '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  "grid": '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  "info": '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  "printer": '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
  "search-x": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/>',
  "qr-code": '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
  "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  "mail": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  "hash": '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
  "twitter": '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
  "linkedin": '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  "instagram": '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  "github": '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  "send": '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  "list-ordered": '<line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
  "cpu": '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  "music": '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  "briefcase": '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  "hammer": '<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 3.26-1.57-1.57a2.12 2.12 0 0 0-3 0l-5.6 5.6 4.57 4.57 5.6-5.6a2.12 2.12 0 0 0 0-3Z"/>',
  "trophy": '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  "palette": '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  "graduation-cap": '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  "zap": '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  "x-circle": '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'
};

function renderIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    try {
      window.lucide.createIcons();
      return;
    } catch (e) {
      console.warn("Lucide createIcons threw, falling back to SVG renderer", e);
    }
  }

  // Pure SVG Fallback
  document.querySelectorAll("i[data-lucide]").forEach(el => {
    const iconName = el.getAttribute("data-lucide");
    const svgInner = ICON_SVGS[iconName];
    if (svgInner) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.setAttribute("class", `lucide lucide-${iconName}`);
      svg.innerHTML = svgInner;
      el.parentNode.replaceChild(svg, el);
    }
  });
}

window.renderIcons = renderIcons;

// --- TOAST NOTIFICATION SYSTEM ---
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById("toast-container");
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    }
  },

  show(message, type = "info", duration = 3500) {
    if (!this.container) this.init();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    if (type === "error") iconName = "alert-triangle";
    if (type === "warning") iconName = "alert-circle";

    toast.innerHTML = `
      <div class="toast-icon">
        <i data-lucide="${iconName}"></i>
      </div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Dismiss toast">&times;</button>
    `;

    this.container.appendChild(toast);
    renderIcons();

    // Trigger enter transition
    requestAnimationFrame(() => {
      toast.classList.add("visible");
    });

    const closeBtn = toast.querySelector(".toast-close");
    let removeTimeout = null;

    const removeToast = () => {
      if (removeTimeout) clearTimeout(removeTimeout);
      toast.classList.remove("visible");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    };

    closeBtn.addEventListener("click", removeToast);
    removeTimeout = setTimeout(removeToast, duration);
  }
};

window.Toast = Toast;

// --- MODAL MANAGER ---
const ModalManager = {
  openModals: [],

  init() {
    // Backdrop click handling
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          this.close(backdrop.id);
        }
      });
    });

    // Close button handling
    document.querySelectorAll("[data-close-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-close-modal");
        this.close(modalId);
      });
    });

    // Keyboard ESC dismissal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.openModals.length > 0) {
        const lastModal = this.openModals[this.openModals.length - 1];
        this.close(lastModal);
      }
    });
  },

  open(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (!this.openModals.includes(modalId)) {
      this.openModals.push(modalId);
    }

    renderIcons();
  },

  close(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    this.openModals = this.openModals.filter(id => id !== modalId);
    if (this.openModals.length === 0) {
      document.body.classList.remove("modal-open");
    }
  },

  closeAll() {
    this.openModals.forEach(id => this.close(id));
  }
};

window.ModalManager = ModalManager;

// --- MAIN APPLICATION LOGIC ---
const App = {
  // Current Filter State
  filters: {
    search: "",
    category: "All",
    dateFilter: "all",
    priceFilter: "all",
    sortBy: "date-asc"
  },

  activeCountdownInterval: null,
  activeDetailEvent: null,

  init() {
    Toast.init();
    ModalManager.init();
    this.initTheme();
    this.initNavbar();
    this.initCategoryFilters();
    this.initFilterControls();
    this.initHostModal();
    this.initNewsletter();
    this.initBackToTop();
    this.populateEventSelect();

    this.renderFeatured();
    this.renderEvents();

    if (window.RegistrationManager) {
      window.RegistrationManager.init();
    }

    this.startGlobalCountdown();
    renderIcons();
  },

  // --- THEME MANAGEMENT ---
  initTheme() {
    const saved = StorageManager.getTheme();
    this.applyTheme(saved);

    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    toggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const target = current === "dark" ? "light" : "dark";
        this.applyTheme(target);
        StorageManager.setTheme(target);
        Toast.show(`Switched to ${target} mode`, "info", 2000);
      });
    });
  },

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icons = document.querySelectorAll(".theme-icon");
    icons.forEach(icon => {
      icon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    });
    renderIcons();
  },

  // --- NAVBAR & MOBILE DRAWER ---
  initNavbar() {
    const header = document.querySelector(".site-header");
    const mobileBtn = document.getElementById("mobile-menu-toggle");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    const navLinks = document.querySelectorAll(".nav-link");

    // Sticky shadow on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      this.updateScrollSpy();
    });

    // Mobile menu toggle
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = mobileDrawer.classList.toggle("open");
        mobileBtn.setAttribute("aria-expanded", isOpen);
        document.body.classList.toggle("mobile-menu-active", isOpen);
        const icon = mobileBtn.querySelector("i");
        if (icon) {
          icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
          renderIcons();
        }
      });

      // Close mobile drawer on link click
      mobileDrawer.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          mobileDrawer.classList.remove("open");
          document.body.classList.remove("mobile-menu-active");
          const icon = mobileBtn.querySelector("i");
          if (icon) {
            icon.setAttribute("data-lucide", "menu");
            renderIcons();
          }
        });
      });
    }

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#" || targetId.length <= 1) return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  },

  updateScrollSpy() {
    const sections = ["hero", "featured", "explore", "about", "registrations"];
    const scrollPos = window.scrollY + 140;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop;
      const height = el.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll(`.nav-link[href="#${id}"]`).forEach(link => {
          document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        });
      }
    });
  },

  // --- BACK TO TOP ---
  initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  },

  // --- CATEGORIES BAR ---
  initCategoryFilters() {
    const container = document.getElementById("category-chips-list");
    if (!container || !window.CATEGORIES) return;

    container.innerHTML = "";

    window.CATEGORIES.forEach(cat => {
      const chip = document.createElement("button");
      chip.className = `category-chip ${this.filters.category === cat.name ? "active" : ""}`;
      chip.setAttribute("data-category", cat.name);
      chip.innerHTML = `
        <i data-lucide="${cat.icon}"></i>
        <span>${cat.name}</span>
        <span class="chip-count">${cat.count}</span>
      `;

      chip.addEventListener("click", () => {
        this.setCategory(cat.name);
      });

      container.appendChild(chip);
    });

    renderIcons();
  },

  setCategory(catName) {
    this.filters.category = catName;

    // Update chips visual state
    document.querySelectorAll(".category-chip").forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-category") === catName);
    });

    this.renderEvents();
  },

  // --- FILTER CONTROLS ---
  initFilterControls() {
    const searchInput = document.getElementById("events-search-input");
    const dateSelect = document.getElementById("filter-date");
    const priceSelect = document.getElementById("filter-price");
    const sortSelect = document.getElementById("sort-events");
    const clearBtn = document.getElementById("clear-filters-btn");
    const resetEmptyBtn = document.getElementById("reset-empty-filters-btn");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.filters.search = e.target.value.trim().toLowerCase();
        this.renderEvents();
      });
    }

    if (dateSelect) {
      dateSelect.addEventListener("change", (e) => {
        this.filters.dateFilter = e.target.value;
        this.renderEvents();
      });
    }

    if (priceSelect) {
      priceSelect.addEventListener("change", (e) => {
        this.filters.priceFilter = e.target.value;
        this.renderEvents();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.filters.sortBy = e.target.value;
        this.renderEvents();
      });
    }

    const resetFilters = () => {
      this.filters = {
        search: "",
        category: "All",
        dateFilter: "all",
        priceFilter: "all",
        sortBy: "date-asc"
      };

      if (searchInput) searchInput.value = "";
      if (dateSelect) dateSelect.value = "all";
      if (priceSelect) priceSelect.value = "all";
      if (sortSelect) sortSelect.value = "date-asc";

      document.querySelectorAll(".category-chip").forEach(chip => {
        chip.classList.toggle("active", chip.getAttribute("data-category") === "All");
      });

      this.renderEvents();
      Toast.show("All filters cleared", "info", 1800);
    };

    if (clearBtn) clearBtn.addEventListener("click", resetFilters);
    if (resetEmptyBtn) resetEmptyBtn.addEventListener("click", resetFilters);
  },

  populateEventSelect() {
    const select = document.getElementById("reg-event-select");
    if (!select || !window.INITIAL_EVENTS) return;

    select.innerHTML = `<option value="" disabled selected>Choose an event...</option>`;
    window.INITIAL_EVENTS.forEach(ev => {
      const opt = document.createElement("option");
      opt.value = ev.id;
      const isFree = ev.price === 0;
      opt.textContent = `${ev.title} (${isFree ? "Free" : `\$${ev.price}`})`;
      select.appendChild(opt);
    });
  },

  // --- FILTER & SORT EVENTS LOGIC ---
  getFilteredEvents() {
    let list = [...window.INITIAL_EVENTS];

    // Search filter (title, description, venue, tags)
    if (this.filters.search) {
      const query = this.filters.search;
      list = list.filter(ev => {
        const inTitle = ev.title.toLowerCase().includes(query);
        const inDesc = ev.description.toLowerCase().includes(query);
        const inVenue = `${ev.venue} ${ev.city}`.toLowerCase().includes(query);
        const inTags = ev.tags && ev.tags.some(t => t.toLowerCase().includes(query));
        return inTitle || inDesc || inVenue || inTags;
      });
    }

    // Category filter
    if (this.filters.category && this.filters.category !== "All") {
      list = list.filter(ev => ev.category === this.filters.category);
    }

    // Price filter
    if (this.filters.priceFilter === "free") {
      list = list.filter(ev => ev.price === 0);
    } else if (this.filters.priceFilter === "paid") {
      list = list.filter(ev => ev.price > 0);
    }

    // Date filter
    const now = new Date();
    if (this.filters.dateFilter === "weekend") {
      list = list.filter(ev => {
        const evDate = new Date(`${ev.date}T00:00:00`);
        const day = evDate.getDay();
        return day === 0 || day === 6; // Sunday or Saturday
      });
    } else if (this.filters.dateFilter === "month") {
      list = list.filter(ev => {
        const evDate = new Date(`${ev.date}T00:00:00`);
        return evDate.getMonth() === now.getMonth() && evDate.getFullYear() === now.getFullYear();
      });
    } else if (this.filters.dateFilter === "upcoming") {
      list = list.filter(ev => new Date(`${ev.date}T23:59:59`) >= now);
    }

    // Sorting
    list.sort((a, b) => {
      const dateA = new Date(`${a.date}T00:00:00`).getTime();
      const dateB = new Date(`${b.date}T00:00:00`).getTime();

      switch (this.filters.sortBy) {
        case "date-asc":
          return dateA - dateB;
        case "date-desc":
          return dateB - dateA;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "popular":
          // Compare percentage of filled seats
          const filledA = (a.totalSeats - StorageManager.getAvailableSeats(a.id, a.availableSeats)) / a.totalSeats;
          const filledB = (b.totalSeats - StorageManager.getAvailableSeats(b.id, b.availableSeats)) / b.totalSeats;
          return filledB - filledA;
        default:
          return 0;
      }
    });

    return list;
  },

  // --- RENDER FEATURED EVENTS ---
  renderFeatured() {
    const container = document.getElementById("featured-events-grid");
    if (!container || !window.INITIAL_EVENTS) return;

    const featured = window.INITIAL_EVENTS.filter(ev => ev.featured);
    container.innerHTML = "";

    featured.forEach(ev => {
      const available = StorageManager.getAvailableSeats(ev.id, ev.availableSeats);
      const isSoldOut = available <= 0;
      const isFav = StorageManager.isFavorite(ev.id);

      const formattedDate = new Date(ev.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      const card = document.createElement("article");
      card.className = "featured-card";
      card.setAttribute("data-event-id", ev.id);

      card.innerHTML = `
        <div class="featured-image-wrapper">
          <img src="${ev.image}" alt="${ev.title}" loading="lazy">
          <div class="featured-overlay"></div>
          <div class="card-top-badges">
            <span class="badge badge-category">${ev.category}</span>
            <button class="favorite-btn ${isFav ? "active" : ""}" title="Save Event" onclick="App.toggleFav('${ev.id}', event)">
              <i data-lucide="heart"></i>
            </button>
          </div>
          <div class="featured-countdown-badge" data-countdown-date="${ev.date}">
            <i data-lucide="clock"></i>
            <span class="countdown-text">Calculating...</span>
          </div>
        </div>

        <div class="featured-content">
          <div class="event-meta-row">
            <span class="event-date"><i data-lucide="calendar"></i> ${formattedDate}</span>
            <span class="event-venue"><i data-lucide="map-pin"></i> ${ev.city}</span>
          </div>

          <h3 class="featured-title">${ev.title}</h3>
          <p class="featured-description">${ev.shortDescription}</p>

          <div class="featured-footer">
            <div class="price-and-seats">
              <span class="event-price">${ev.price === 0 ? '<span class="text-free">FREE</span>' : `\$${ev.price}`}</span>
              <span class="seats-left-pill ${isSoldOut ? "sold-out" : available <= 10 ? "urgent" : ""}">
                ${isSoldOut ? "Sold Out" : `${available} seats left`}
              </span>
            </div>
            <div class="card-action-group">
              <button class="btn btn-outline btn-sm" onclick="App.openEventDetails('${ev.id}')">
                Details
              </button>
              <button class="btn btn-primary btn-sm" ${isSoldOut ? "disabled" : ""} onclick="RegistrationManager.openForEvent('${ev.id}')">
                ${isSoldOut ? "Sold Out" : "Register"}
              </button>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    renderIcons();
  },

  // --- RENDER ALL EXPLORE EVENTS ---
  renderEvents() {
    const grid = document.getElementById("events-grid");
    const emptyState = document.getElementById("events-empty-state");
    const countBadge = document.getElementById("results-count-text");
    if (!grid || !window.INITIAL_EVENTS) return;

    const events = this.getFilteredEvents();

    if (countBadge) {
      countBadge.textContent = `Showing ${events.length} ${events.length === 1 ? "event" : "events"}`;
    }

    if (events.length === 0) {
      grid.style.display = "none";
      if (emptyState) emptyState.style.display = "flex";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    grid.style.display = "grid";
    grid.innerHTML = "";

    events.forEach(ev => {
      const available = StorageManager.getAvailableSeats(ev.id, ev.availableSeats);
      const isSoldOut = available <= 0;
      const isFav = StorageManager.isFavorite(ev.id);

      const formattedDate = new Date(ev.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      const card = document.createElement("article");
      card.className = `event-card ${isSoldOut ? "card-sold-out" : ""}`;
      card.setAttribute("data-event-id", ev.id);

      // Seat availability badge style
      let seatBadge = `<span class="seat-badge normal"><i data-lucide="users"></i> ${available} seats</span>`;
      if (isSoldOut) {
        seatBadge = `<span class="seat-badge soldout"><i data-lucide="ban"></i> Sold Out</span>`;
      } else if (available <= 8) {
        seatBadge = `<span class="seat-badge urgent"><i data-lucide="flame"></i> Only ${available} left!</span>`;
      }

      card.innerHTML = `
        <div class="event-card-media">
          <img src="${ev.image}" alt="${ev.title}" loading="lazy">
          <div class="card-media-tags">
            <span class="badge badge-category">${ev.category}</span>
            ${seatBadge}
          </div>
          <button class="favorite-btn ${isFav ? "active" : ""}" title="Save Event" onclick="App.toggleFav('${ev.id}', event)">
            <i data-lucide="heart"></i>
          </button>
        </div>

        <div class="event-card-body">
          <div class="event-meta-line">
            <span><i data-lucide="calendar"></i> ${formattedDate}</span>
            <span><i data-lucide="map-pin"></i> ${ev.city}</span>
          </div>

          <h3 class="event-card-title">${ev.title}</h3>
          <p class="event-card-snippet">${ev.shortDescription}</p>

          <div class="event-organizer-row">
            <img class="org-avatar" src="${ev.organizer.avatar}" alt="${ev.organizer.name}">
            <div class="org-info">
              <span class="org-name">${ev.organizer.name}</span>
              <span class="org-role">${ev.organizer.role}</span>
            </div>
          </div>

          <div class="event-card-divider"></div>

          <div class="event-card-footer">
            <div class="event-price-box">
              <span class="price-label">Admission</span>
              <span class="price-val">${ev.price === 0 ? '<strong class="text-free">FREE</strong>' : `\$${ev.price}`}</span>
            </div>

            <div class="event-card-btns">
              <button class="btn btn-outline btn-sm" onclick="App.openEventDetails('${ev.id}')">
                Details
              </button>
              <button class="btn btn-primary btn-sm" ${isSoldOut ? "disabled" : ""} onclick="RegistrationManager.openForEvent('${ev.id}')">
                ${isSoldOut ? "Sold Out" : "Register"}
              </button>
            </div>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    renderIcons();
  },

  // --- FAVORITE / BOOKMARK TOGGLE ---
  toggleFav(eventId, e) {
    if (e) e.stopPropagation();
    const isNowFav = StorageManager.toggleFavorite(eventId);
    const ev = window.INITIAL_EVENTS.find(item => item.id === eventId);
    const title = ev ? ev.title : "Event";

    Toast.show(
      isNowFav ? `Added "${title}" to your favorites.` : `Removed from favorites.`,
      "info",
      2000
    );

    // Update active classes on both grids
    document.querySelectorAll(`article[data-event-id="${eventId}"] .favorite-btn`).forEach(btn => {
      btn.classList.toggle("active", isNowFav);
    });
  },

  // --- EVENT DETAILS MODAL ---
  openEventDetails(eventId) {
    const event = window.INITIAL_EVENTS.find(ev => ev.id === eventId);
    if (!event) return;

    this.activeDetailEvent = event;
    const available = StorageManager.getAvailableSeats(event.id, event.availableSeats);
    const isSoldOut = available <= 0;
    const isFav = StorageManager.isFavorite(event.id);
    const percentSeatsOccupied = Math.min(100, Math.round(((event.totalSeats - available) / event.totalSeats) * 100));

    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const target = document.getElementById("event-details-render-target");
    if (!target) return;

    // Build agenda HTML
    let agendaHtml = "";
    if (event.agenda && event.agenda.length > 0) {
      agendaHtml = `
        <div class="details-section-box">
          <h4 class="details-section-heading"><i data-lucide="list-ordered"></i> Event Schedule & Agenda</h4>
          <div class="agenda-timeline">
            ${event.agenda.map(item => `
              <div class="agenda-item">
                <span class="agenda-time">${item.time}</span>
                <span class="agenda-text">${item.title}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // Build tags HTML
    const tagsHtml = event.tags ? event.tags.map(t => `<span class="event-tag">#${t}</span>`).join("") : "";

    target.innerHTML = `
      <div class="event-details-content">
        <div class="details-hero-banner" style="background-image: url('${event.image}')">
          <div class="details-hero-overlay"></div>
          <div class="details-hero-header">
            <span class="badge badge-category">${event.category}</span>
            <button class="favorite-btn ${isFav ? "active" : ""}" title="Save Event" onclick="App.toggleFav('${event.id}', event)">
              <i data-lucide="heart"></i>
            </button>
          </div>
          <div class="details-hero-title-area">
            <h2 class="details-title">${event.title}</h2>
          </div>
        </div>

        <div class="details-body-grid">
          <!-- Left Column: Details & Agenda -->
          <div class="details-main-col">
            <div class="details-section-box">
              <h4 class="details-section-heading"><i data-lucide="info"></i> About This Event</h4>
              <p class="details-long-desc">${event.description}</p>
              <div class="details-tags-wrap">${tagsHtml}</div>
            </div>

            ${agendaHtml}

            <div class="details-section-box organizer-box">
              <h4 class="details-section-heading"><i data-lucide="shield-check"></i> Organized By</h4>
              <div class="organizer-full-profile">
                <img class="org-big-avatar" src="${event.organizer.avatar}" alt="${event.organizer.name}">
                <div class="org-full-info">
                  <div class="org-name-verified">
                    <h5>${event.organizer.name}</h5>
                    <span class="verified-badge"><i data-lucide="check"></i> Verified Partner</span>
                  </div>
                  <p class="org-role-text">${event.organizer.role}</p>
                  <p class="org-contact-email"><i data-lucide="mail"></i> ${event.organizer.email}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Registration Card & Countdown -->
          <div class="details-sidebar-col">
            <!-- Live Countdown Box -->
            <div class="sidebar-box countdown-box">
              <div class="countdown-title">
                <i data-lucide="clock"></i> Live Event Countdown
              </div>
              <div class="modal-countdown-timer" id="modal-countdown-display" data-countdown-date="${event.date}">
                <div class="countdown-slot">
                  <span class="cd-number cd-days">00</span>
                  <span class="cd-label">Days</span>
                </div>
                <div class="countdown-slot">
                  <span class="cd-number cd-hours">00</span>
                  <span class="cd-label">Hours</span>
                </div>
                <div class="countdown-slot">
                  <span class="cd-number cd-mins">00</span>
                  <span class="cd-label">Mins</span>
                </div>
                <div class="countdown-slot">
                  <span class="cd-number cd-secs">00</span>
                  <span class="cd-label">Secs</span>
                </div>
              </div>
            </div>

            <!-- Booking Card -->
            <div class="sidebar-box booking-meta-box">
              <div class="sidebar-price-row">
                <span class="sidebar-price-label">Ticket Admission</span>
                <span class="sidebar-price-val">${event.price === 0 ? '<strong class="text-free">FREE</strong>' : `\$${event.price}`}</span>
              </div>

              <div class="sidebar-seat-status">
                <div class="seat-progress-labels">
                  <span>Capacity Filled</span>
                  <span><strong>${percentSeatsOccupied}%</strong> (${available} available)</span>
                </div>
                <div class="seat-progress-bar">
                  <div class="seat-progress-fill" style="width: ${percentSeatsOccupied}%"></div>
                </div>
              </div>

              <div class="details-meta-list">
                <div class="meta-item">
                  <i data-lucide="calendar"></i>
                  <div>
                    <span class="meta-title">Date</span>
                    <span class="meta-val">${formattedDate}</span>
                  </div>
                </div>
                <div class="meta-item">
                  <i data-lucide="clock"></i>
                  <div>
                    <span class="meta-title">Time</span>
                    <span class="meta-val">${event.time}</span>
                  </div>
                </div>
                <div class="meta-item">
                  <i data-lucide="map-pin"></i>
                  <div>
                    <span class="meta-title">Location</span>
                    <span class="meta-val">${event.venue}, ${event.city}</span>
                  </div>
                </div>
              </div>

              <div class="sidebar-cta-wrap">
                <button class="btn btn-primary btn-block btn-lg" ${isSoldOut ? "disabled" : ""} onclick="ModalManager.close('event-details-modal'); RegistrationManager.openForEvent('${event.id}');">
                  <i data-lucide="ticket"></i> ${isSoldOut ? "Sold Out" : "Book Your Pass"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    renderIcons();
    this.updateModalCountdown(event.date);
    ModalManager.open("event-details-modal");
  },

  // --- COUNTDOWN TIMERS ENGINE ---
  startGlobalCountdown() {
    if (this.activeCountdownInterval) clearInterval(this.activeCountdownInterval);

    const updateAll = () => {
      // 1. Featured cards countdowns
      document.querySelectorAll(".featured-countdown-badge").forEach(badge => {
        const dateStr = badge.getAttribute("data-countdown-date");
        if (!dateStr) return;
        const diff = new Date(`${dateStr}T09:00:00`).getTime() - Date.now();
        const textSpan = badge.querySelector(".countdown-text");
        if (!textSpan) return;

        if (diff <= 0) {
          textSpan.textContent = "Event in progress!";
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);

        textSpan.textContent = `${days}d ${hours}h ${mins}m to go`;
      });

      // 2. Details modal countdown if open
      if (this.activeDetailEvent) {
        this.updateModalCountdown(this.activeDetailEvent.date);
      }
    };

    updateAll();
    this.activeCountdownInterval = setInterval(updateAll, 1000);
  },

  updateModalCountdown(dateStr) {
    const display = document.getElementById("modal-countdown-display");
    if (!display) return;

    const diff = new Date(`${dateStr}T09:00:00`).getTime() - Date.now();
    const daysEl = display.querySelector(".cd-days");
    const hoursEl = display.querySelector(".cd-hours");
    const minsEl = display.querySelector(".cd-mins");
    const secsEl = display.querySelector(".cd-secs");

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minsEl) minsEl.textContent = "00";
      if (secsEl) secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(mins).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(secs).padStart(2, "0");
  },

  // --- HOST AN EVENT MODAL & FORM ---
  initHostModal() {
    const hostBtns = document.querySelectorAll(".host-event-trigger");
    hostBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        ModalManager.open("host-event-modal");
      });
    });

    const hostForm = document.getElementById("host-event-form");
    if (hostForm) {
      hostForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("host-event-title")?.value.trim();
        const category = document.getElementById("host-event-category")?.value;
        const name = document.getElementById("host-org-name")?.value.trim();
        const email = document.getElementById("host-org-email")?.value.trim();
        const desc = document.getElementById("host-event-desc")?.value.trim();

        if (!title || !name || !email || !RegistrationManager.validateEmail(email)) {
          Toast.show("Please fill out all required fields with a valid email.", "error");
          return;
        }

        const inquiry = {
          id: `HOST-${Date.now()}`,
          title,
          category,
          organizer: name,
          email,
          description: desc,
          submittedAt: new Date().toISOString()
        };

        StorageManager.saveHostInquiry(inquiry);
        hostForm.reset();
        ModalManager.close("host-event-modal");
        Toast.show("Event partnership application submitted! Our team will reach out within 24 hours.", "success", 4500);
      });
    }
  },

  // --- NEWSLETTER FORM ---
  initNewsletter() {
    const form = document.getElementById("newsletter-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("newsletter-email");
      if (!input) return;
      const email = input.value.trim();

      if (!RegistrationManager.validateEmail(email)) {
        Toast.show("Please enter a valid email address.", "warning");
        return;
      }

      input.value = "";
      Toast.show("Thank you for subscribing to Eventora updates!", "success");
    });
  }
};

window.App = App;

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
