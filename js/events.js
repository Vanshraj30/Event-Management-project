/**
 * Eventora - Master Event Dataset
 * Contains 16 comprehensive, realistic sample events across 8 categories.
 */

// Helper to ensure dates are always comfortably in the future so live countdown timers remain active
function getFutureDate(daysAhead) {
  const target = new Date();
  target.setDate(target.getDate() + daysAhead);
  const y = target.getFullYear();
  const m = String(target.getMonth() + 1).padStart(2, '0');
  const d = String(target.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const INITIAL_EVENTS = [
  {
    id: "evt-tech-01",
    title: "NextGen AI & Cloud Summit 2026",
    category: "Technology",
    featured: true,
    price: 149,
    isFree: false,
    date: getFutureDate(6),
    time: "09:00 AM - 05:30 PM",
    venue: "Metropolitan Tech Pavilion, Hall 4",
    city: "San Francisco, CA",
    shortDescription: "Explore breakthrough generative AI architectures, distributed cloud computing, and real-world enterprise deployments with industry leaders.",
    description: "NextGen AI & Cloud Summit 2026 convenes the world's premier AI engineers, cloud architects, and tech innovators. Over 15 visionary keynotes, hands-on architectural breakouts, and direct access to cutting-edge model benchmarks. Dive into multi-modal models, sovereign cloud infrastructures, low-latency edge inference, and enterprise security frameworks.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 250,
    availableSeats: 24,
    organizer: {
      name: "CloudScale Innovations",
      role: "Lead Tech Alliance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      email: "summit@cloudscale.io",
      verified: true
    },
    agenda: [
      { time: "09:00 AM", title: "Keynote: Autonomous Systems at Scale" },
      { time: "11:30 AM", title: "Panel: Edge Intelligence & Low Latency Infrastructure" },
      { time: "02:00 PM", title: "Live Lab: Deploying Multi-Tenant Cloud Clusters" },
      { time: "04:30 PM", title: "Fireside Chat with Lead ML Researchers" }
    ],
    tags: ["Artificial Intelligence", "Cloud Native", "DevOps", "Kubernetes"]
  },
  {
    id: "evt-music-02",
    title: "Neon Horizon Electronic Music Festival",
    category: "Music",
    featured: true,
    price: 89,
    isFree: false,
    date: getFutureDate(9),
    time: "06:00 PM - 02:00 AM",
    venue: "Skyline Waterfront Arena",
    city: "Austin, TX",
    shortDescription: "A multi-stage sensory experience featuring world-renowned electronic DJs, 3D laser mapping, and immersive soundscapes.",
    description: "Get ready for an electrifying night under the open sky! Neon Horizon delivers 8 uninterrupted hours of melodic techno, synthwave, and future bass across three breathtaking outdoor stages. Featuring custom holographic visual stages, world-class acoustic arrays, gourmet night food trucks, and art installations by international light sculptors.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 1200,
    availableSeats: 72,
    organizer: {
      name: "PulseWave Productions",
      role: "Global Live Entertainment",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      email: "hello@pulsewave.live",
      verified: true
    },
    agenda: [
      { time: "06:00 PM", title: "Gates Open & Sunset Ambient Warmup" },
      { time: "08:30 PM", title: "Stage 1: Cybernetic Audio Visual Set" },
      { time: "11:00 PM", title: "Main Stage: Headliner World Tour Live Show" },
      { time: "01:00 AM", title: "Late Night B2B After-Hours Groove" }
    ],
    tags: ["EDM", "Concert", "Nightlife", "Live Visuals"]
  },
  {
    id: "evt-biz-03",
    title: "Global Venture & Startup Expo 2026",
    category: "Business",
    featured: true,
    price: 199,
    isFree: false,
    date: getFutureDate(14),
    time: "08:30 AM - 06:00 PM",
    venue: "Grand Omni Convention Center",
    city: "New York, NY",
    shortDescription: "Connecting 500+ angel investors and venture funds with the next generation of high-growth founders and disruptive seed startups.",
    description: "The Global Venture & Startup Expo is where capital meets breakthrough execution. Featuring a live $1,000,000 pitch competition, private 1-on-1 investor matchmaking lounges, and keynote talks from unicorn founders. Network with over 2,000 corporate executives, venture partners, and visionary creators shaping global commerce, fintech, and deep tech.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 400,
    availableSeats: 12,
    organizer: {
      name: "VentureBridge Capital",
      role: "Global Startup Incubator",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      email: "partner@venturebridge.org",
      verified: true
    },
    agenda: [
      { time: "08:30 AM", title: "Investor Breakfast & State of VC 2026" },
      { time: "10:30 AM", title: "Series A & B Founder Pitch Arena" },
      { time: "01:30 PM", title: "Panel: Scaling from Zero to \$100M ARR" },
      { time: "04:30 PM", title: "Award Ceremony & VIP Closing Mixer" }
    ],
    tags: ["Startup", "Venture Capital", "Fundraising", "Fintech"]
  },
  {
    id: "evt-work-04",
    title: "UI/UX Masterclass: Next-Gen Design Systems",
    category: "Workshops",
    featured: true,
    price: 49,
    isFree: false,
    date: getFutureDate(4),
    time: "10:00 AM - 04:00 PM",
    venue: "Design Lab Studios, Tower 2",
    city: "Seattle, WA",
    shortDescription: "An intensive interactive workshop teaching design tokens, token-driven component architecture, micro-interactions, and accessibility.",
    description: "Level up your product design mastery with this hands-on, 6-hour collaborative workshop. Learn how top product design teams at Stripe, Apple, and Airbnb construct scalable design systems that bridge Figma and production frontend code seamlessly. Participants will walk away with a production-ready design token library and responsive interactive component catalog.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 45,
    availableSeats: 6,
    organizer: {
      name: "Studio Pixel & Vector",
      role: "Design Collective",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      email: "workshops@pixelandvector.design",
      verified: true
    },
    agenda: [
      { time: "10:00 AM", title: "Design Tokens & Cross-Platform Variables" },
      { time: "11:45 AM", title: "Accessible Color Contrast & Micro-Typography" },
      { time: "01:30 PM", title: "Hands-on: Building Fluid Figma Components" },
      { time: "03:15 PM", title: "Design-to-Code Handoff & Live Review" }
    ],
    tags: ["Figma", "UI/UX", "Design Systems", "Web Design"]
  },
  {
    id: "evt-sports-05",
    title: "Metro City 21K Half Marathon & 10K",
    category: "Sports",
    featured: false,
    price: 35,
    isFree: false,
    date: getFutureDate(11),
    time: "06:00 AM - 11:30 AM",
    venue: "Central Civic Park Promenade",
    city: "Chicago, IL",
    shortDescription: "Annual scenic city race through historic bridges and parkways. Chip timed with medals, hydration points, and cheer stations.",
    description: "Lace up your running shoes for the 14th annual Metro City Half Marathon! Welcoming over 3,000 passionate runners from across the nation. The course features flat, fast waterfront paths, stunning skyline vistas, live cheering zones every 2 kilometers, medical support, high-tech RFID chip timing, and a celebratory post-race festival with breakfast treats and finisher medals.",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 300,
    availableSeats: 48,
    organizer: {
      name: "Metro Endurance Athletics",
      role: "Sports Association",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      email: "info@metroathletics.run",
      verified: true
    },
    agenda: [
      { time: "05:30 AM", title: "Bag Drop & Warm-up Stretches" },
      { time: "06:15 AM", title: "Half Marathon (21K) Wave 1 Flag Off" },
      { time: "06:45 AM", title: "10K Challenge Wave 2 Flag Off" },
      { time: "09:30 AM", title: "Finisher Celebrations & Podium Awards" }
    ],
    tags: ["Marathon", "Running", "Fitness", "Outdoors"]
  },
  {
    id: "evt-art-06",
    title: "Luminary Contemporary Art & Light Gala",
    category: "Art & Culture",
    featured: false,
    price: 25,
    isFree: false,
    date: getFutureDate(16),
    time: "05:00 PM - 10:30 PM",
    venue: "Prism Modern Arts Museum",
    city: "San Francisco, CA",
    shortDescription: "An immersive journey through interactive light installations, digital sculptures, and avant-garde acoustic performances.",
    description: "Experience the convergence of technology, contemporary sculpture, and sensory storytelling at the Luminary Art Gala. Featuring works by 24 international artists pushing the frontiers of projection mapping, neon glasswork, and generative algorithmic canvases. Enjoy curator-led gallery tours, artisan hors d'oeuvres, and an exclusive ambient live harp and synth recital.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 180,
    availableSeats: 35,
    organizer: {
      name: "Prism Arts Foundation",
      role: "Museum & Gallery Curator",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      email: "curator@prismmodern.org",
      verified: true
    },
    agenda: [
      { time: "05:00 PM", title: "Private Gallery Viewing & Welcome Cocktails" },
      { time: "06:30 PM", title: "Artist Panel: Generative Aesthetics in 2026" },
      { time: "08:00 PM", title: "Kinetic Light & Sound Performance" },
      { time: "09:30 PM", title: "Curator Q&A and Silent Art Auction" }
    ],
    tags: ["Exhibition", "Modern Art", "Light Show", "Culture"]
  },
  {
    id: "evt-edu-07",
    title: "Global Higher Education & Scholarship Fair",
    category: "Education",
    featured: false,
    price: 0,
    isFree: true,
    date: getFutureDate(21),
    time: "10:00 AM - 05:00 PM",
    venue: "International Exhibition Hall B",
    city: "Boston, MA",
    shortDescription: "Meet admissions deans and scholarship committees from 80+ top universities worldwide. Free resume & essay reviews.",
    description: "Chart your academic future at the nation's premier higher education expo. Connect in person with official admissions representatives from leading universities across the US, UK, Canada, Europe, and Asia. Attend guidance seminars on full-ride scholarships, visa guidelines, GRE/GMAT/IELTS strategy sessions, and receive complimentary one-on-one portfolio evaluations.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 500,
    availableSeats: 142,
    organizer: {
      name: "Apex Global Academic Council",
      role: "Higher Education Network",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      email: "admissions@apexedu.org",
      verified: true
    },
    agenda: [
      { time: "10:00 AM", title: "Keynote: Demystifying Global Admissions in 2027" },
      { time: "11:30 AM", title: "Workshop: Winning International Research Grants" },
      { time: "02:00 PM", title: "Open Booths: University Consultation Tables" },
      { time: "04:00 PM", title: "Student Alumni Panel & Q&A" }
    ],
    tags: ["Education", "Scholarships", "University", "Free"]
  },
  {
    id: "evt-net-08",
    title: "Founders & Angel Investors Networking Mixer",
    category: "Networking",
    featured: false,
    price: 45,
    isFree: false,
    date: getFutureDate(8),
    time: "06:30 PM - 09:30 PM",
    venue: "The Penthouse Rooftop Lounge",
    city: "San Francisco, CA",
    shortDescription: "An exclusive, curated evening of meaningful conversations between tech founders, product builders, and seed angel investors.",
    description: "No boring elevator pitches, just high-caliber networking with high-conviction builders. Held in a scenic panoramic penthouse overlooking the bay, this mixer gathers 120 hand-selected founders who are raising pre-seed and seed rounds, alongside verified active angel syndicates. Enjoy artisan drinks, organic canapés, and our structured speed-networking warm-up.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 90,
    availableSeats: 5,
    organizer: {
      name: "Silicon Network Club",
      role: "Founder Community",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      email: "community@siliconnetwork.club",
      verified: true
    },
    agenda: [
      { time: "06:30 PM", title: "Welcome Drinks & Nametag Badge Matching" },
      { time: "07:15 PM", title: "Structured 5-Minute Speed Intros" },
      { time: "08:15 PM", title: "Open Mingling & Curated Introductions" },
      { time: "09:15 PM", title: "Closing Remarks & Digital Contact Exchange" }
    ],
    tags: ["Networking", "Founders", "Angel Investors", "Tech"]
  },
  {
    id: "evt-tech-09",
    title: "Web3, Zero-Knowledge & Security Forum",
    category: "Technology",
    featured: false,
    price: 99,
    isFree: false,
    date: getFutureDate(25),
    time: "09:30 AM - 05:00 PM",
    venue: "CyberSphere Auditorium, Innovation Hub",
    city: "Denver, CO",
    shortDescription: "Deep dive into zero-knowledge cryptographic proofs, decentralized protocol defense, and modern smart contract auditing.",
    description: "Security is non-negotiable in next-generation decentralized ecosystems. This technical symposium brings together top cryptographers, white-hat security auditors, and core protocol maintainers. Featuring interactive code audits, live exploitation breakdown analyses, and technical deep-dives into zk-SNARKs and post-quantum cryptographic resilience.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 160,
    availableSeats: 41,
    organizer: {
      name: "Protocol Defense Guild",
      role: "Cybersecurity Consortium",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      email: "audit@protocoldefense.org",
      verified: true
    },
    agenda: [
      { time: "09:30 AM", title: "Cryptographic Foundations of ZK Rollups" },
      { time: "11:15 AM", title: "Top Vulnerabilities Found in 2026 Audits" },
      { time: "02:00 PM", title: "Interactive Workshop: Writing Verified Rust Contracts" },
      { time: "04:00 PM", title: "Panel: Post-Quantum Defense Strategies" }
    ],
    tags: ["Web3", "Cybersecurity", "Cryptography", "Coding"]
  },
  {
    id: "evt-music-10",
    title: "Symphony Under The Stars: Cinema Classics",
    category: "Music",
    featured: false,
    price: 45,
    isFree: false,
    date: getFutureDate(28),
    time: "07:30 PM - 10:00 PM",
    venue: "Amphitheater at Green Meadows",
    city: "Los Angeles, CA",
    shortDescription: "A 70-piece philharmonic orchestra performing iconic scores from Hans Zimmer, John Williams, and Ennio Morricone under the night sky.",
    description: "Immerse yourself in cinematic musical splendor as the 70-piece Philharmonic Orchestra performs grand orchestral arrangements of legendary motion picture soundtracks. Hear timeless anthems from Interstellar, Star Wars, Inception, Gladiator, and Jurassic Park accompanied by tasteful visual projections on an 80-foot panoramic outdoor LED display.",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 600,
    availableSeats: 58,
    organizer: {
      name: "Harmony City Philharmonic",
      role: "Orchestral Society",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
      email: "boxoffice@harmonyphilharmonic.org",
      verified: true
    },
    agenda: [
      { time: "06:30 PM", title: "Picnic Lawn Seating Opens" },
      { time: "07:30 PM", title: "Act I: Golden Age of Hollywood & Sci-Fi Epics" },
      { time: "08:45 PM", title: "Intermission & Stargazing Lounge" },
      { time: "09:10 PM", title: "Act II: Hans Zimmer & Modern Film Masterpieces" }
    ],
    tags: ["Classical", "Cinema Score", "Live Orchestra", "Outdoor"]
  },
  {
    id: "evt-biz-11",
    title: "Executive Leadership & ESG Governance Forum",
    category: "Business",
    featured: false,
    price: 250,
    isFree: false,
    date: getFutureDate(31),
    time: "08:30 AM - 04:30 PM",
    venue: "Starlight Financial Center, 30th Floor",
    city: "New York, NY",
    shortDescription: "Strategic governance, resilient supply chains, and actionable sustainable metrics for modern C-suite executives and board directors.",
    description: "Designed exclusively for enterprise directors, chief sustainability officers, and corporate counsels. Explore how progressive organizations are integrating transparent ESG metrics, ethical artificial intelligence oversight, and stakeholder governance into long-term shareholder value creation. Chatham House rules apply for intimate roundtables.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 100,
    availableSeats: 15,
    organizer: {
      name: "Institute for Global Governance",
      role: "Executive Think Tank",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
      email: "executive@globalgovernance.org",
      verified: true
    },
    agenda: [
      { time: "08:30 AM", title: "Executive Welcome & Keynote Address" },
      { time: "10:00 AM", title: "Roundtable: AI Governance in Public Companies" },
      { time: "01:00 PM", title: "Case Studies: Sustainable Supply Chain Decoupling" },
      { time: "03:15 PM", title: "Closing Synthesis & Boardroom Takeaways" }
    ],
    tags: ["Leadership", "ESG", "C-Suite", "Governance"]
  },
  {
    id: "evt-work-12",
    title: "Hands-on Cinematic Photography & Color Grading",
    category: "Workshops",
    featured: false,
    price: 65,
    isFree: false,
    date: getFutureDate(12),
    time: "01:00 PM - 06:00 PM",
    venue: "Lumens Creative Warehouse",
    city: "Portland, OR",
    shortDescription: "Master cinematic lighting set-ups, camera blocking, RAW photography workflows, and professional DaVinci Resolve color grading.",
    description: "Step onto a real professional studio stage and learn how to create rich, emotive cinematic aesthetics. Directed by seasoned film colorists and commercial photographers, this workshop breaks down soft source lighting, contrast ratios, anamorphic framing, and color theory principles. Bring your DSLR, mirrorless camera, or laptop to grade provided ProRes footage in real-time.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 35,
    availableSeats: 3,
    organizer: {
      name: "Cascade Film Collective",
      role: "Visual Storytellers Group",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      email: "contact@cascadefilm.org",
      verified: true
    },
    agenda: [
      { time: "01:00 PM", title: "Theory of Natural Contrast & Dynamic Range" },
      { time: "02:15 PM", title: "Live Studio Shoot: Lighting Dramatic Portraits" },
      { time: "04:00 PM", title: "Hands-on DaVinci Resolve Color Grade Session" },
      { time: "05:30 PM", title: "Portfolio Review & Constructive Critique" }
    ],
    tags: ["Photography", "Filmmaking", "DaVinci Resolve", "Creative"]
  },
  {
    id: "evt-sports-13",
    title: "Urban Street 3x3 Basketball Championship",
    category: "Sports",
    featured: false,
    price: 0,
    isFree: true,
    date: getFutureDate(19),
    time: "11:00 AM - 07:00 PM",
    venue: "Downtown Concrete Court Complex",
    city: "Philadelphia, PA",
    shortDescription: "High-octane urban streetball tournament featuring top regional ballers, dunk contest, DJ battles, and youth clinics.",
    description: "Come feel the rhythm of raw city basketball! 32 registered teams battle for glory in an open FIBA 3x3 format. Featuring high-flying halftime slam dunk contests, live beatmakers spinning classic hip-hop vinyl, food court row with local street eats, and a free morning basketball skills clinic for youth players.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 450,
    availableSeats: 110,
    organizer: {
      name: "HoopCulture City Project",
      role: "Community Sports Foundation",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      email: "courts@hoopculture.org",
      verified: true
    },
    agenda: [
      { time: "11:00 AM", title: "Youth Skills Clinic & Open Warm-ups" },
      { time: "01:00 PM", title: "Tournament Preliminary Rounds" },
      { time: "04:30 PM", title: "Slam Dunk Invitational & DJ Showcase" },
      { time: "05:45 PM", title: "Championship Finals & Trophy Presentation" }
    ],
    tags: ["Basketball", "Tournament", "Free", "Streetball"]
  },
  {
    id: "evt-art-14",
    title: "Heritage Artisan Craft & Culinary Expo",
    category: "Art & Culture",
    featured: false,
    price: 15,
    isFree: false,
    date: getFutureDate(35),
    time: "10:00 AM - 06:00 PM",
    venue: "The Old Market Timber Pavilion",
    city: "San Francisco, CA",
    shortDescription: "Celebrate handcrafted pottery, hand-woven textiles, woodcraft, and heritage gourmet gastronomy from 60+ regional artisans.",
    description: "A feast for the senses honoring ancestral craft traditions and sustainable making. Wander through rows of master ceramicists, leather artisans, glassblowers, and heritage bakers. Ticket includes commemorative tasting glass, 5 gourmet food tasting tokens, live acoustic folk sessions, and live wheel throwing pottery demonstrations.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 350,
    availableSeats: 85,
    organizer: {
      name: "Guild of Traditional Artisans",
      role: "Cultural Preservation Guild",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80",
      email: "info@traditionalartisans.org",
      verified: true
    },
    agenda: [
      { time: "10:00 AM", title: "Market Gates Open & Artisan Demos Begin" },
      { time: "12:30 PM", title: "Farm-to-Table Gastronomy Showcase" },
      { time: "02:30 PM", title: "Masterclass: Heritage Wheel Pottery" },
      { time: "04:30 PM", title: "Acoustic Folk Performance & Evening Social" }
    ],
    tags: ["Crafts", "Gastronomy", "Artisan", "Culture"]
  },
  {
    id: "evt-edu-15",
    title: "Data Science & Practical AI for Everyone",
    category: "Education",
    featured: false,
    price: 0,
    isFree: true,
    date: getFutureDate(42),
    time: "02:00 PM - 06:00 PM",
    venue: "University Community Auditorium",
    city: "Austin, TX",
    shortDescription: "Demystifying statistical learning, Python data pipelines, and machine learning models for beginners and career changers.",
    description: "No advanced math or PhD required! This welcoming, highly practical workshop breaks down data science concepts into clear, visual building blocks. Learn how to clean messy spreadsheets with Python Pandas, build predictive models, understand LLM prompts, and assemble a standout data science portfolio to launch your tech career.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 220,
    availableSeats: 0,
    organizer: {
      name: "OpenData Community Initiative",
      role: "Nonprofit Tech Education",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      email: "learn@opendatainitiative.org",
      verified: true
    },
    agenda: [
      { time: "02:00 PM", title: "The Data Landscape in Plain English" },
      { time: "03:15 PM", title: "Hands-on: Exploring Real Datasets with Python" },
      { time: "04:30 PM", title: "Demystifying Machine Learning & Prompting" },
      { time: "05:30 PM", title: "Career Pathways & Free Learning Roadmap" }
    ],
    tags: ["Data Science", "Python", "Beginners", "Free"]
  },
  {
    id: "evt-net-16",
    title: "Creative Freelancers & Agency Leaders Brunch",
    category: "Networking",
    featured: false,
    price: 30,
    isFree: false,
    date: getFutureDate(48),
    time: "10:30 AM - 01:30 PM",
    venue: "Botanical Glasshouse Bistro",
    city: "Seattle, WA",
    shortDescription: "A relaxed Sunday networking brunch for independent designers, copywriters, developers, and boutique agency directors.",
    description: "Break away from your monitor and connect with fellow independent creatives over mimosas, specialty coffee, and organic pastries in a lush indoor botanical garden. Exchange strategies on client acquisition, value-based pricing, retainer contracts, and collaborate with peers looking to subcontract or build agency alliances.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    totalSeats: 60,
    availableSeats: 8,
    organizer: {
      name: "Independent Minds Collective",
      role: "Creative Network",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      email: "hello@independentminds.co",
      verified: true
    },
    agenda: [
      { time: "10:30 AM", title: "Artisan Coffee Bar & Table Placement" },
      { time: "11:15 AM", title: "Discussion: Pricing Power & Client Retention" },
      { time: "12:15 PM", title: "Subcontracting & Collaborative Deal Board" },
      { time: "01:00 PM", title: "Networking & Portfolio Sharing" }
    ],
    tags: ["Freelance", "Brunch", "Creative", "Networking"]
  }
];

// Helper to retrieve category list with icons and counts
const CATEGORIES = [
  { name: "All", icon: "sparkles", count: INITIAL_EVENTS.length },
  { name: "Technology", icon: "cpu", count: 3 },
  { name: "Music", icon: "music", count: 2 },
  { name: "Business", icon: "briefcase", count: 2 },
  { name: "Workshops", icon: "hammer", count: 2 },
  { name: "Sports", icon: "trophy", count: 2 },
  { name: "Art & Culture", icon: "palette", count: 2 },
  { name: "Education", icon: "graduation-cap", count: 2 },
  { name: "Networking", icon: "users", count: 2 }
];

// Expose globally
window.INITIAL_EVENTS = INITIAL_EVENTS;
window.CATEGORIES = CATEGORIES;
