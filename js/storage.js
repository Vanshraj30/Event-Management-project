/**
 * Eventora - Storage & State Management
 * Handles LocalStorage persistence for:
 * - Registrations
 * - Seat availability overrides
 * - Bookmarked / Favorited events
 * - Dark / Light theme preference
 * - Host an Event partner submissions
 */

const STORAGE_KEYS = {
  REGISTRATIONS: "eventora_registrations",
  SEATS: "eventora_seats",
  FAVORITES: "eventora_favorites",
  THEME: "eventora_theme",
  HOST_INQUIRIES: "eventora_host_inquiries"
};

// Seed an initial registration for realistic first-time display
const DEFAULT_REGISTRATIONS = [
  {
    id: "EVT-2026-48291",
    eventId: "evt-tech-01",
    eventTitle: "NextGen AI & Cloud Summit 2026",
    eventDate: "2026-11-18",
    eventTime: "09:00 AM - 05:30 PM",
    venue: "Metropolitan Tech Pavilion, Hall 4",
    city: "San Francisco, CA",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    price: 149,
    tickets: 1,
    totalPrice: 149,
    fullName: "Jordan Lee",
    email: "jordan.lee@example.com",
    phone: "+1 (555) 382-9102",
    notes: "Interested in the autonomous systems keynote.",
    registeredAt: "2026-11-04T10:15:00.000Z",
    status: "Confirmed"
  }
];

const StorageManager = {
  // --- THEME ---
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // --- SEAT MANAGEMENT ---
  getSeatsMap() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEATS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse seats from localStorage", e);
    }
    // Initialize from INITIAL_EVENTS
    const map = {};
    if (window.INITIAL_EVENTS) {
      window.INITIAL_EVENTS.forEach(ev => {
        map[ev.id] = ev.availableSeats;
      });
    }
    this.saveSeatsMap(map);
    return map;
  },

  saveSeatsMap(map) {
    localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(map));
  },

  getAvailableSeats(eventId, fallbackTotal) {
    const map = this.getSeatsMap();
    if (map[eventId] !== undefined) {
      return map[eventId];
    }
    return fallbackTotal || 0;
  },

  updateAvailableSeats(eventId, deltaSeats) {
    const map = this.getSeatsMap();
    const current = map[eventId] !== undefined ? map[eventId] : 0;
    const updated = Math.max(0, current + deltaSeats);
    map[eventId] = updated;
    this.saveSeatsMap(map);
    return updated;
  },

  // --- REGISTRATIONS ---
  getRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Failed to parse registrations from localStorage", e);
    }
    // Seed initial demo registration if never set
    if (window.INITIAL_EVENTS && DEFAULT_REGISTRATIONS.length > 0) {
      const ev = window.INITIAL_EVENTS.find(e => e.id === DEFAULT_REGISTRATIONS[0].eventId);
      if (ev) {
        DEFAULT_REGISTRATIONS[0].eventDate = ev.date;
      }
    }
    this.saveRegistrations(DEFAULT_REGISTRATIONS);
    return [...DEFAULT_REGISTRATIONS];
  },

  saveRegistrations(regs) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(regs));
  },

  addRegistration(registrationData) {
    const registrations = this.getRegistrations();
    registrations.unshift(registrationData);
    this.saveRegistrations(registrations);
    // Deduct seats
    this.updateAvailableSeats(registrationData.eventId, -registrationData.tickets);
    return registrationData;
  },

  cancelRegistration(registrationId) {
    const registrations = this.getRegistrations();
    const targetIndex = registrations.findIndex(r => r.id === registrationId);
    if (targetIndex === -1) return null;

    const removed = registrations[targetIndex];
    registrations.splice(targetIndex, 1);
    this.saveRegistrations(registrations);

    // Restore seats
    if (removed.eventId && removed.tickets) {
      this.updateAvailableSeats(removed.eventId, removed.tickets);
    }
    return removed;
  },

  isAlreadyRegistered(eventId, email) {
    const registrations = this.getRegistrations();
    const cleanEmail = email.trim().toLowerCase();
    return registrations.some(
      r => r.eventId === eventId && r.email.trim().toLowerCase() === cleanEmail
    );
  },

  // --- FAVORITES / BOOKMARKS ---
  getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse favorites", e);
    }
    return [];
  },

  toggleFavorite(eventId) {
    const favs = this.getFavorites();
    const idx = favs.indexOf(eventId);
    let isFav = false;
    if (idx === -1) {
      favs.push(eventId);
      isFav = true;
    } else {
      favs.splice(idx, 1);
      isFav = false;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    return isFav;
  },

  isFavorite(eventId) {
    const favs = this.getFavorites();
    return favs.includes(eventId);
  },

  // --- HOST INQUIRIES ---
  saveHostInquiry(inquiry) {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.HOST_INQUIRIES) || "[]");
      existing.unshift(inquiry);
      localStorage.setItem(STORAGE_KEYS.HOST_INQUIRIES, JSON.stringify(existing));
    } catch (e) {
      console.error("Failed to save host inquiry", e);
    }
  }
};

window.StorageManager = StorageManager;
