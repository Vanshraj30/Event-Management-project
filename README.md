# Eventora – Discover. Experience. Connect.

> **Modern, premium-grade, fully responsive event discovery and registration platform.**  
> Built with semantic HTML5, modern CSS3 (Custom Properties & Glassmorphism), and modular ES6+ JavaScript.

---

## 🌟 Overview

**Eventora** is an event management and discovery platform designed to connect people with memorable experiences. From international technology summits and open-air electronic music festivals to startup investment expos and hands-on creative masterclasses, Eventora offers a digital event experience.

The platform includes real-time seat availability tracking, live event countdown timers, rich category filtering, multi-field registration validation, persistent storage via LocalStorage, and digital printable passes.

---

## 🚀 Key Features

### 1. 🧭 Navigation & Visual Identity
- **Sophisticated Default Dark Theme** (`#0B0D12` / `#131722`) with violet (`#A78BFA`) and sky-cyan (`#38BDF8`) accents.
- **Instant Light / Dark Mode Toggle** with smooth CSS transitions and automatic `LocalStorage` preference persistence.
- **Glassmorphic Sticky Header** with blur effects and active scroll-spy navigation.
- **Responsive Mobile Drawer Menu** with smooth touch navigation and accessible controls.
- **Dynamic Registrations Badge Counter** on the navbar updating in real time.

### 2. ⚡ Hero Experience
- Bold typographic hierarchy: *"Discover Experiences That Matter."*
- **Floating Interactive Preview Cards** with attendee avatar stacks and live trending status.
- Key platform metrics bar: 500+ Events Hosted, 45K+ Attendees, 99.4% Positive Rating, and 8 Event Categories.
- Dual entry CTAs: **Explore Events** and **Host an Event** (opens interactive partner submission dialog).

### 3. ✨ Curated Featured Events
- Highlighted large event cards with high-resolution photography.
- **Live Countdown Timer Badges** updating every second until the event date.
- Category badges, date, venue, ticket admission pricing, and quick booking triggers.

### 4. 🔍 Explore & Search Directory
- **16 Comprehensive Realistic Events** spanning 8 official categories:
  1. *Technology* (AI, Cloud Native, Cybersecurity, Web3)
  2. *Music* (Electronic Festivals, Philharmonic Orchestras)
  3. *Business* (Venture Capital, Startup Expos, ESG Leadership)
  4. *Workshops* (Design Systems, Filmmaking & Color Grading)
  5. *Sports* (Half Marathons, 3x3 Streetball Championships)
  6. *Art & Culture* (Modern Art Galas, Heritage Artisan Markets)
  7. *Education* (Global Scholarship Fairs, Practical AI Seminars)
  8. *Networking* (Founders & Angels Mixers, Freelancer Brunches)
- **Interactive Category Filter Bar** with category icons and event counts.
- **Real-Time Search Bar** filtering by title, description, venue, city, or tags.
- **Multi-parameter Filtering & Sorting:**
  - Date: All, Upcoming, This Weekend, This Month
  - Price: All, Free Only, Paid Only
  - Sorting: Soonest Date, Latest Date, Price (Low to High), Price (High to Low), Popularity
- **Empty States** with one-click filter reset.

### 5. 📋 Dynamic Event Details Modal
- Full cover hero banner with overlay and category tags.
- Detailed synopsis, schedule timeline (agenda breakdown), and verified organizer card.
- **High-Impact 4-Slot Countdown Timer** (Days, Hours, Minutes, Seconds).
- **Live Seat Availability Meter** with visual capacity percentage bar.
- Direct **"Book Your Pass"** action pre-filling registration.

### 6. 🎟️ Registration & Ticket Management System
- **Comprehensive JavaScript Validation:**
  - Full Name validation (minimum length check)
  - RFC-compliant email validation
  - International/Standard phone number format validation
  - Event selection & seat availability checks
  - **Duplicate Registration Prevention:** Disallows registering twice for the same event with the same email address.
  - **Past Event Prevention:** Validates event dates against current date.
- **Dynamic Price Calculator:** Automatically calculates subtotal and total based on ticket quantity.
- **Dynamic Seat Deductions:** Decrements available seats in state and LocalStorage.
- **Digital Boarding Pass / E-Ticket Modal:**
  - Realistic perforated ticket layout with punch-out notches.
  - Unique Reference ID (e.g. `EVT-2026-48291`).
  - SVG Barcode simulation.
  - **Print / Save Pass Support** (`window.print()` with custom print stylesheets).

### 7. 📂 My Registrations Section
- Dedicated view of all confirmed bookings.
- Displays event thumbnail, reference ID (one-click copy to clipboard), date, venue, ticket count, and status.
- **Reopen Digital Ticket** anytime with one click.
- **Cancel Registration with Confirmation Modal:**
  - Safely confirms intent before cancelling.
  - Automatically restores available seat counts back to the event pool.
  - Shows an attractive empty state when all bookings are cleared.

### 8. 🛠️ Bonus Polish & Developer Experience
- **Interactive Host an Event Inquiry Modal:** Submits and persists partner proposals.
- **Toast Notification Engine:** Animated notifications for info, success, warning, and error states.
- **Floating Back to Top Button:** Smooth scroll with threshold awareness.
- **Offline-Resilient Icon Engine:** Built-in SVG fallbacks ensuring icons render smoothly even in offline environments.

---

## 💻 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessible attributes, and modals |
| **CSS3** | Modern custom properties, Flexbox, CSS Grid, Glassmorphism, animations |
| **JavaScript (ES6+)** | Modular application controllers, event listeners, dynamic DOM manipulation |
| **LocalStorage** | Persistent bookings, theme preferences, seat counters, and inquiries |
| **Google Fonts** | *Plus Jakarta Sans* & *Space Grotesk* typography |
| **Lucide Icons** | Modern icon set with inline SVG fallback system |

---

## 📁 Project Structure

```
eventora/
├── index.html              # Main HTML5 application file with all sections & modals
├── css/
│   └── style.css           # Design system, themes (dark/light), components & responsive queries
├── js/
│   ├── events.js           # Comprehensive 16-event dataset across 8 categories
│   ├── storage.js          # LocalStorage manager (registrations, seats, theme, bookmarks)
│   ├── registration.js     # Form validation, booking engine, ticket renderer & cancellations
│   └── main.js             # App controller, filters, countdown timers, modals & toasts
├── assets/
│   └── icons/              # Local asset directory
├── .gitignore              # Standard git exclusion rules
└── README.md               # Documentation & setup guide
```

---

## 🚀 Running Locally

Because Eventora uses modern web standards with no heavy backend requirements, it can be run in seconds using any of the methods below:

### Option 1: Direct Browser Launch
Simply double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, Safari, or Firefox:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Option 2: Using Node.js
If you have Node.js installed, you can use `npx serve`:
```bash
npx serve .
```
Then visit `http://localhost:3000` in your browser.

### Option 3: Using Python
If you have Python installed, launch a lightweight HTTP server:
```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

### Option 4: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deployment Instructions

Eventora is 100% static and client-side, making it immediately deployable to any modern web hosting service.

### Deploying to GitHub Pages
1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Eventora event management platform"
   ```
2. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/eventora.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, select **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**.
   - Click **Save**. Your site will be live at `https://<your-username>.github.io/eventora/`.

### Deploying to Vercel
1. Install Vercel CLI (`npm i -g vercel`) or log in to [vercel.com](https://vercel.com).
2. Run `vercel` in the project root:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy in seconds.

### Deploying to Netlify
1. Drag and drop the `event-management` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Your site is instantly live with a custom HTTPS URL.

---

## 📱 Responsive Testing & Accessibility

Eventora is designed for seamless operation across all device viewports:
- **Desktop & Widescreen (1200px+):** Full multi-column layout, detailed cards, floating hero elements.
- **Laptops & Tablets (768px – 1024px):** Adaptive 2-column grids, optimized hero preview.
- **Mobile Phones (320px – 480px):** Single-column stacked cards, full-width touch targets, slide-out mobile drawer, touch-friendly modals.

---

## 📄 License & Credits

- Designed & Developed for **Eventora Platform**.
- Typography: Google Fonts ([Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)).
- Icons: [Lucide Icons](https://lucide.dev/).
- Photography: Curated high-resolution photography from [Unsplash](https://unsplash.com/).
