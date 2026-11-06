/**
 * Eventora - Registration & Ticket Management System
 * Handles:
 * - Form validation (Email, Phone, Name, Seats, Duplicate registration check)
 * - Booking submission & unique ID generation
 * - Digital E-Ticket modal rendering & print/download
 * - My Registrations list rendering & dynamic cancellation with seat restoration
 * - Live ticket price calculator
 */

const RegistrationManager = {
  activeCancelId: null,

  init() {
    this.bindEvents();
    this.renderRegistrations();
    this.updateNavbarBadge();
  },

  bindEvents() {
    // Form submission
    const form = document.getElementById("registration-form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    // Dynamic ticket count change calculation
    const ticketSelect = document.getElementById("reg-tickets");
    const eventSelect = document.getElementById("reg-event-select");

    if (ticketSelect) {
      ticketSelect.addEventListener("change", () => this.updatePriceCalculation());
    }
    if (eventSelect) {
      eventSelect.addEventListener("change", () => {
        this.updateAvailableSeatsIndicator();
        this.updatePriceCalculation();
      });
    }

    // Clear input validation errors on input
    ["reg-fullname", "reg-email", "reg-phone"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          this.clearFieldError(id);
        });
      }
    });

    // Cancel modal confirmation button
    const confirmCancelBtn = document.getElementById("confirm-cancel-btn");
    if (confirmCancelBtn) {
      confirmCancelBtn.addEventListener("click", () => this.executeCancellation());
    }

    // Cancel modal dismissal
    const dismissCancelBtn = document.getElementById("dismiss-cancel-btn");
    if (dismissCancelBtn) {
      dismissCancelBtn.addEventListener("click", () => this.closeCancelModal());
    }

    // Digital ticket print button
    const printTicketBtn = document.getElementById("print-ticket-btn");
    if (printTicketBtn) {
      printTicketBtn.addEventListener("click", () => {
        window.print();
      });
    }
  },

  // Open registration modal with pre-selected event
  openForEvent(eventId) {
    const event = window.INITIAL_EVENTS.find(e => e.id === eventId);
    if (!event) return;

    const available = StorageManager.getAvailableSeats(event.id, event.availableSeats);
    if (available <= 0) {
      Toast.show(`"${event.title}" is currently Sold Out.`, "warning");
      return;
    }

    const select = document.getElementById("reg-event-select");
    if (select) {
      select.value = event.id;
    }

    this.updateAvailableSeatsIndicator();
    this.updatePriceCalculation();

    // Show modal
    ModalManager.open("registration-modal");
  },

  updateAvailableSeatsIndicator() {
    const select = document.getElementById("reg-event-select");
    const indicator = document.getElementById("reg-seats-indicator");
    const ticketSelect = document.getElementById("reg-tickets");
    if (!select || !indicator) return;

    const eventId = select.value;
    const event = window.INITIAL_EVENTS.find(e => e.id === eventId);
    if (!event) {
      indicator.textContent = "";
      return;
    }

    const available = StorageManager.getAvailableSeats(event.id, event.availableSeats);
    if (available <= 0) {
      indicator.innerHTML = `<span class="badge badge-soldout"><i data-lucide="alert-circle"></i> Sold Out</span>`;
      if (ticketSelect) ticketSelect.disabled = true;
    } else if (available <= 10) {
      indicator.innerHTML = `<span class="badge badge-urgent"><i data-lucide="zap"></i> Hurry! Only ${available} seats left</span>`;
      if (ticketSelect) {
        ticketSelect.disabled = false;
        this.populateTicketOptions(Math.min(available, 5));
      }
    } else {
      indicator.innerHTML = `<span class="badge badge-success"><i data-lucide="check-circle-2"></i> ${available} seats available</span>`;
      if (ticketSelect) {
        ticketSelect.disabled = false;
        this.populateTicketOptions(Math.min(available, 5));
      }
    if (window.renderIcons) window.renderIcons();
    else if (window.lucide) window.lucide.createIcons();
  },

  populateTicketOptions(max) {
    const ticketSelect = document.getElementById("reg-tickets");
    if (!ticketSelect) return;
    const currentVal = parseInt(ticketSelect.value) || 1;
    ticketSelect.innerHTML = "";
    for (let i = 1; i <= max; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${i} ${i === 1 ? "Ticket" : "Tickets"}`;
      ticketSelect.appendChild(opt);
    }
    ticketSelect.value = Math.min(currentVal, max);
  },

  updatePriceCalculation() {
    const select = document.getElementById("reg-event-select");
    const ticketSelect = document.getElementById("reg-tickets");
    const summaryEl = document.getElementById("reg-price-summary");
    if (!select || !summaryEl) return;

    const event = window.INITIAL_EVENTS.find(e => e.id === select.value);
    if (!event) {
      summaryEl.innerHTML = "";
      return;
    }

    const qty = ticketSelect ? parseInt(ticketSelect.value) || 1 : 1;
    const isFree = event.price === 0;
    const total = event.price * qty;

    summaryEl.innerHTML = `
      <div class="summary-line">
        <span>Ticket Price</span>
        <span>${isFree ? '<strong class="text-free">FREE</strong>' : `\$${event.price} × ${qty}`}</span>
      </div>
      <div class="summary-line total">
        <span>Total Payable</span>
        <span class="total-amount">${isFree ? '<span class="text-free font-bold">Free Access</span>' : `\$${total}`}</span>
      </div>
    `;
  },

  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim().toLowerCase());
  },

  validatePhone(phone) {
    // Allows 7 to 15 digits, optional leading +, parentheses, hyphens and spaces
    const clean = phone.replace(/[\s\-\(\)\.]/g, "");
    return clean.length >= 8 && clean.length <= 16 && /^\+?[0-9]+$/.test(clean);
  },

  setFieldError(id, message) {
    const field = document.getElementById(id);
    const errorEl = document.getElementById(`${id}-error`);
    if (field) field.classList.add("input-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
    }
  },

  clearFieldError(id) {
    const field = document.getElementById(id);
    const errorEl = document.getElementById(`${id}-error`);
    if (field) field.classList.remove("input-error");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("visible");
    }
  },

  clearAllErrors() {
    ["reg-fullname", "reg-email", "reg-phone", "reg-event-select"].forEach(id => {
      this.clearFieldError(id);
    });
  },

  handleFormSubmit(e) {
    e.preventDefault();
    this.clearAllErrors();

    const fullNameInput = document.getElementById("reg-fullname");
    const emailInput = document.getElementById("reg-email");
    const phoneInput = document.getElementById("reg-phone");
    const eventSelect = document.getElementById("reg-event-select");
    const ticketsInput = document.getElementById("reg-tickets");
    const notesInput = document.getElementById("reg-notes");

    const fullName = fullNameInput ? fullNameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const eventId = eventSelect ? eventSelect.value : "";
    const tickets = ticketsInput ? parseInt(ticketsInput.value) || 1 : 1;
    const notes = notesInput ? notesInput.value.trim() : "";

    let hasError = false;

    // Full name validation
    if (!fullName || fullName.length < 3) {
      this.setFieldError("reg-fullname", "Please enter your full name (at least 3 characters).");
      hasError = true;
    }

    // Email validation
    if (!email) {
      this.setFieldError("reg-email", "Email address is required.");
      hasError = true;
    } else if (!this.validateEmail(email)) {
      this.setFieldError("reg-email", "Please provide a valid email address (e.g. name@domain.com).");
      hasError = true;
    }

    // Phone validation
    if (!phone) {
      this.setFieldError("reg-phone", "Contact phone number is required.");
      hasError = true;
    } else if (!this.validatePhone(phone)) {
      this.setFieldError("reg-phone", "Please provide a valid phone number (8-15 digits).");
      hasError = true;
    }

    // Event selection validation
    if (!eventId) {
      this.setFieldError("reg-event-select", "Please select an event to attend.");
      hasError = true;
    }

    if (hasError) {
      Toast.show("Please fix the highlighted errors before submitting.", "error");
      return;
    }

    const event = window.INITIAL_EVENTS.find(ev => ev.id === eventId);
    if (!event) {
      Toast.show("Selected event does not exist.", "error");
      return;
    }

    // Prevent registration for past events
    const eventDate = new Date(`${event.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      Toast.show("This event has already concluded and is closed for registration.", "error");
      return;
    }

    // Check available seats
    const currentAvailable = StorageManager.getAvailableSeats(event.id, event.availableSeats);
    if (currentAvailable <= 0) {
      Toast.show("Sorry, this event is completely sold out!", "error");
      return;
    }

    if (tickets > currentAvailable) {
      Toast.show(`Only ${currentAvailable} seat(s) remaining for this event. Please adjust ticket quantity.`, "error");
      return;
    }

    // Prevent duplicate registrations with same email for the same event
    if (StorageManager.isAlreadyRegistered(eventId, email)) {
      this.setFieldError("reg-email", "You have already registered for this event with this email address.");
      Toast.show("A registration for this event already exists under this email.", "warning");
      return;
    }

    // Generate unique Registration ID
    const randomHex = Math.floor(10000 + Math.random() * 90000);
    const regId = `EVT-2026-${randomHex}`;

    const registrationRecord = {
      id: regId,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      venue: event.venue,
      city: event.city,
      category: event.category,
      image: event.image,
      price: event.price,
      tickets: tickets,
      totalPrice: event.price * tickets,
      fullName: fullName,
      email: email,
      phone: phone,
      notes: notes,
      registeredAt: new Date().toISOString(),
      status: "Confirmed"
    };

    // Save registration & decrement seats
    StorageManager.addRegistration(registrationRecord);

    // Reset form
    document.getElementById("registration-form").reset();
    ModalManager.close("registration-modal");

    // Show digital ticket modal
    this.renderDigitalTicket(registrationRecord);
    ModalManager.open("ticket-modal");

    // Refresh UI components
    this.renderRegistrations();
    this.updateNavbarBadge();
    if (window.App) {
      window.App.renderEvents();
      window.App.renderFeatured();
    }

    Toast.show(`Registration confirmed! ID: ${regId}`, "success");
  },

  renderDigitalTicket(reg) {
    const container = document.getElementById("ticket-render-target");
    if (!container) return;

    const formattedDate = new Date(reg.eventDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    container.innerHTML = `
      <div class="digital-ticket">
        <div class="ticket-header">
          <div class="ticket-badge">Official Event Pass</div>
          <div class="ticket-status-pill confirmed">● ${reg.status}</div>
        </div>

        <div class="ticket-body">
          <div class="ticket-event-info">
            <span class="ticket-category-tag">${reg.category}</span>
            <h3 class="ticket-title">${reg.eventTitle}</h3>
            <p class="ticket-venue"><i data-lucide="map-pin"></i> ${reg.venue}, ${reg.city}</p>
            <p class="ticket-time"><i data-lucide="calendar"></i> ${formattedDate} | ${reg.eventTime}</p>
          </div>

          <div class="ticket-divider">
            <div class="notch notch-left"></div>
            <div class="dashed-line"></div>
            <div class="notch notch-right"></div>
          </div>

          <div class="ticket-details-grid">
            <div class="detail-cell">
              <span class="label">Attendee</span>
              <span class="val font-semibold">${reg.fullName}</span>
            </div>
            <div class="detail-cell">
              <span class="label">Passes</span>
              <span class="val font-semibold">${reg.tickets} ${reg.tickets > 1 ? "Tickets" : "Ticket"}</span>
            </div>
            <div class="detail-cell">
              <span class="label">Pass Reference</span>
              <span class="val font-mono">${reg.id}</span>
            </div>
            <div class="detail-cell">
              <span class="label">Amount</span>
              <span class="val font-semibold">${reg.totalPrice === 0 ? "Free Entry" : `\$${reg.totalPrice}`}</span>
            </div>
          </div>

          <div class="ticket-barcode-section">
            <div class="barcode-graphic">
              <!-- SVG Realistic Barcode Simulation -->
              <svg width="240" height="48" viewBox="0 0 240 48" class="barcode-svg" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="3" height="48" fill="currentColor"/>
                <rect x="6" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="12" y="0" width="4" height="48" fill="currentColor"/>
                <rect x="20" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="26" y="0" width="6" height="48" fill="currentColor"/>
                <rect x="36" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="42" y="0" width="4" height="48" fill="currentColor"/>
                <rect x="50" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="56" y="0" width="5" height="48" fill="currentColor"/>
                <rect x="65" y="0" width="3" height="48" fill="currentColor"/>
                <rect x="72" y="0" width="4" height="48" fill="currentColor"/>
                <rect x="80" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="86" y="0" width="6" height="48" fill="currentColor"/>
                <rect x="96" y="0" width="3" height="48" fill="currentColor"/>
                <rect x="103" y="0" width="5" height="48" fill="currentColor"/>
                <rect x="112" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="118" y="0" width="4" height="48" fill="currentColor"/>
                <rect x="126" y="0" width="6" height="48" fill="currentColor"/>
                <rect x="136" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="142" y="0" width="4" height="48" fill="currentColor"/>
                <rect x="150" y="0" width="5" height="48" fill="currentColor"/>
                <rect x="159" y="0" width="3" height="48" fill="currentColor"/>
                <rect x="166" y="0" width="4" height="48" fill="currentColor"/>
                <rect x="174" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="180" y="0" width="6" height="48" fill="currentColor"/>
                <rect x="190" y="0" width="3" height="48" fill="currentColor"/>
                <rect x="197" y="0" width="5" height="48" fill="currentColor"/>
                <rect x="206" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="212" y="0" width="4" height="48" fill="currentColor"/>
                <rect x="220" y="0" width="6" height="48" fill="currentColor"/>
                <rect x="230" y="0" width="2" height="48" fill="currentColor"/>
                <rect x="236" y="0" width="4" height="48" fill="currentColor"/>
              </svg>
            </div>
            <div class="barcode-number">${reg.id}</div>
          </div>
        </div>
      </div>
    `;

    if (window.renderIcons) window.renderIcons();
    else if (window.lucide) window.lucide.createIcons();
  },

  renderRegistrations() {
    const container = document.getElementById("registrations-list");
    const emptyState = document.getElementById("registrations-empty");
    if (!container) return;

    const registrations = StorageManager.getRegistrations();

    if (registrations.length === 0) {
      container.style.display = "none";
      if (emptyState) emptyState.style.display = "flex";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    container.style.display = "grid";
    container.innerHTML = "";

    registrations.forEach(reg => {
      const card = document.createElement("div");
      card.className = "registration-card";

      const formattedDate = new Date(reg.eventDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      card.innerHTML = `
        <div class="reg-card-image">
          <img src="${reg.image}" alt="${reg.eventTitle}" loading="lazy">
          <span class="reg-category-badge">${reg.category}</span>
        </div>
        <div class="reg-card-content">
          <div class="reg-card-top">
            <span class="reg-id-badge" title="Click to copy ID" onclick="RegistrationManager.copyRegId('${reg.id}')">
              <i data-lucide="hash"></i> ${reg.id}
            </span>
            <span class="status-pill confirmed">● Confirmed</span>
          </div>

          <h3 class="reg-title">${reg.eventTitle}</h3>

          <div class="reg-meta-list">
            <div class="reg-meta-item">
              <i data-lucide="calendar"></i>
              <span>${formattedDate} &bull; ${reg.eventTime}</span>
            </div>
            <div class="reg-meta-item">
              <i data-lucide="map-pin"></i>
              <span>${reg.venue}, ${reg.city}</span>
            </div>
            <div class="reg-meta-item">
              <i data-lucide="ticket"></i>
              <span>${reg.tickets} ${reg.tickets > 1 ? "Tickets" : "Ticket"} &bull; ${reg.totalPrice === 0 ? "Free" : `\$${reg.totalPrice}`}</span>
            </div>
            <div class="reg-meta-item">
              <i data-lucide="user"></i>
              <span>${reg.fullName} (${reg.email})</span>
            </div>
          </div>

          <div class="reg-card-actions">
            <button class="btn btn-outline btn-sm" onclick="RegistrationManager.viewTicket('${reg.id}')">
              <i data-lucide="qr-code"></i> View E-Ticket
            </button>
            <button class="btn btn-danger-ghost btn-sm" onclick="RegistrationManager.promptCancel('${reg.id}')">
              <i data-lucide="x-circle"></i> Cancel
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    if (window.renderIcons) window.renderIcons();
    else if (window.lucide) window.lucide.createIcons();
  },

  viewTicket(regId) {
    const registrations = StorageManager.getRegistrations();
    const reg = registrations.find(r => r.id === regId);
    if (!reg) return;

    this.renderDigitalTicket(reg);
    ModalManager.open("ticket-modal");
  },

  promptCancel(regId) {
    const registrations = StorageManager.getRegistrations();
    const reg = registrations.find(r => r.id === regId);
    if (!reg) return;

    this.activeCancelId = regId;
    const cancelInfo = document.getElementById("cancel-event-info");
    if (cancelInfo) {
      cancelInfo.innerHTML = `
        <strong>${reg.eventTitle}</strong><br>
        <span class="text-muted">Registration ID: ${reg.id} &bull; ${reg.tickets} ticket(s)</span>
      `;
    }
    ModalManager.open("cancel-confirm-modal");
  },

  closeCancelModal() {
    this.activeCancelId = null;
    ModalManager.close("cancel-confirm-modal");
  },

  executeCancellation() {
    if (!this.activeCancelId) return;

    const removed = StorageManager.cancelRegistration(this.activeCancelId);
    this.closeCancelModal();

    if (removed) {
      Toast.show(`Registration ${removed.id} has been successfully cancelled. Seats were restored.`, "info");
      this.renderRegistrations();
      this.updateNavbarBadge();
      if (window.App) {
        window.App.renderEvents();
        window.App.renderFeatured();
      }
    }
  },

  updateNavbarBadge() {
    const badge = document.getElementById("nav-reg-count");
    if (!badge) return;
    const count = StorageManager.getRegistrations().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  },

  copyRegId(id) {
    navigator.clipboard.writeText(id).then(() => {
      Toast.show(`Copied registration ID: ${id}`, "info");
    }).catch(() => {
      Toast.show(`ID: ${id}`, "info");
    });
  }
};

window.RegistrationManager = RegistrationManager;
