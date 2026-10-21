/**
 * Keabi Tech — Projects Data Model
 * Data-driven architecture for projects, filterable and configurable.
 */

export const PROJECTS_DATA = [
  {
    id: "devsafe-vault",
    title: "DevSafe Vault",
    tagline: "Secure file protection & workspace management",
    category: "security",
    status: "Completed",
    featured: true,
    thumbnail: "/assets/images/projects/devsafe_vault.png",
    fallbackThumbnail: "assets/images/projects/devsafe_vault.png",
    technologies: ["Python", "Flask", "Cryptography", "SQLite", "PBKDF2"],
    shortDescription: "A secure personal vault for storing sensitive files with password-based AES encryption and a safe recovery-focused trash workflow.",
    fullDescription: "DevSafe Vault addresses the risk of storing sensitive developer credentials, API tokens, and private configuration files on local drives. Built with a defense-in-depth approach, files are encrypted at rest using AES-256 via Python's Cryptography library with key derivation handled by PBKDF2-HMAC-SHA256.",
    problemSolved: "Plaintext storage of environment files, keys, and private workspace documents leads to credential leaks and accidental deletion. DevSafe Vault provides encrypted storage with two-stage deletion safeguards.",
    architecture: {
      type: "Service Architecture",
      diagram: `
+------------------+         HTTP / HTTPS          +----------------------+
|  Web Client UI   | <===========================> | Flask API Controller |
+------------------+                               +----------------------+
                                                               ||
                                                AES-256 / PBKDF2 Key Derivation
                                                               ||
                                                   +----------------------+
                                                   | Cryptography Engine  |
                                                   +----------------------+
                                                               ||
                                                   +----------------------+
                                                   | Encrypted Vault & DB |
                                                   +----------------------+`,
      points: [
        "Zero-knowledge architecture: Plaintext passwords never hit the disk.",
        "Chunked file stream processing to encrypt large files with minimal RAM consumption.",
        "Soft-delete quarantine buffer preventing irreversible deletion mistakes."
      ]
    },
    keyFeatures: [
      "Client-authenticated AES-256-GCM file encryption",
      "Dynamic key derivation using 600,000 PBKDF2 iterations",
      "Two-tier recovery trash bin with configurable retention",
      "Audit trail logging file access, modifications, and decryptions",
      "Session auto-lock after 15 minutes of inactivity"
    ],
    challenges: "Handling memory overhead during the encryption of large archive files without writing decrypted data back to temporary disk cache. Solved using Python's generator streams and buffer piping.",
    githubUrl: "https://github.com/keabi531/devsafe-vault",
    liveDemoUrl: null // Honest: set to null or demo url when deployed
  },
  {
    id: "school-management",
    title: "School Management System",
    tagline: "Comprehensive institutional administration platform",
    category: "fullstack",
    status: "Completed",
    featured: true,
    thumbnail: "/assets/images/projects/school_management.png",
    fallbackThumbnail: "assets/images/projects/school_management.png",
    technologies: ["Django", "PostgreSQL", "HTML5", "CSS3", "JavaScript"],
    shortDescription: "A complete school management system with students, attendance, exams, results, chat, notifications, and administrative reporting.",
    fullDescription: "Designed for academic departments to streamline operations from enrollment to graduation. Implemented with role-based access control (Admins, Teachers, Students, Parents), automated grade computation, real-time timetable alerts, and relational integrity via PostgreSQL.",
    problemSolved: "Manual record-keeping, fragmented paper attendance records, and delayed report card generation. Centralizes school data in a secure, relational database with granular permissions.",
    architecture: {
      type: "MVC / MVT Django Architecture",
      diagram: `
[ Client Browser ] ---> [ Nginx Reverse Proxy ] ---> [ Gunicorn WSGI ]
                                                            |
                                                   [ Django MVT Core ]
                                                     /             \\
                                       [ Template Views ]     [ ORM Models ]
                                                                     |
                                                             [ PostgreSQL DB ]`,
      points: [
        "Custom Django authentication backend supporting multiple user personas.",
        "PostgreSQL indexes on student IDs, course terms, and exam dates for sub-50ms queries.",
        "Signals-based notification pipeline when attendance falls below 75% threshold."
      ]
    },
    keyFeatures: [
      "Role-Based Access Control (RBAC) with 4 distinct permission levels",
      "Attendance tracking with visual heatmaps and monthly percentage reporting",
      "Exam grading engine with customizable GPA weight calculations",
      "Parent portal for viewing verified grade reports and tuition clearance",
      "Export capabilities to PDF report cards and Excel summaries"
    ],
    challenges: "Preventing race conditions during bulk grade submissions by multiple teachers during exam week. Solved by wrapping transactions in `transaction.atomic()` with row-level locking.",
    githubUrl: "https://github.com/keabi531/school-management-system",
    liveDemoUrl: null
  },
  {
    id: "local-file-transfer",
    title: "Local File Transfer",
    tagline: "High-speed zero-cloud LAN file sharing",
    category: "backend",
    status: "Completed",
    featured: true,
    thumbnail: "/assets/images/projects/local_file_transfer.svg",
    fallbackThumbnail: "assets/images/projects/local_file_transfer.svg",
    technologies: ["Python", "Flask", "JavaScript", "Sockets", "QR Generator"],
    shortDescription: "Transfer files between a computer and mobile phone over a local Wi-Fi network with instant QR-code pairing and authenticated sessions.",
    fullDescription: "Solves the friction of emailing files to oneself or uploading sensitive files to third-party cloud servers. Runs an ad-hoc local server on the host machine, displays a pairing QR code with a one-time session token, and transfers files directly peer-to-peer across the local subnet at maximum Wi-Fi bandwidth.",
    problemSolved: "Slow cloud uploads, privacy exposure, and mobile-to-desktop transfer friction when internet bandwidth is limited or unavailable.",
    architecture: {
      type: "Direct Local Subnet P2P",
      diagram: `
+-------------------+                          +-------------------+
| Desktop Host (PC) | <--- Local Wi-Fi Subnet ---> | Mobile Browser    |
| Flask HTTP Server |      (No Internet Needed)    | (Scanned QR Token)|
+-------------------+                          +-------------------+
          |                                              |
     [ Local Disk ] <======= Chunked Multipart Stream ===+`,
      points: [
        "Detects active local IPv4 interface automatically via socket lookup.",
        "Generates dynamic QR codes embedding temporary authorization nonces.",
        "Streams files directly to disk via HTTP chunked transfer without memory spikes."
      ]
    },
    keyFeatures: [
      "Zero internet connection required — operates entirely on local Wi-Fi router",
      "Camera QR scan to open paired upload/download dashboard in mobile browser",
      "Batch multi-file queuing with live progress bar and transfer speed metrics",
      "Auto-expiring session credentials to prevent unauthorized LAN guests from snooping",
      "Lightweight footprint: under 30MB resident memory on the host computer"
    ],
    challenges: "Cross-platform network interface discovery across Windows, Linux, and macOS without relying on external DNS. Solved by binding to `0.0.0.0` and discovering the host's LAN subnet gateway.",
    githubUrl: "https://github.com/keabi531/local-file-transfer",
    liveDemoUrl: null
  },
  {
    id: "flask-website-builder",
    title: "Flask Website Builder",
    tagline: "Visual component layout editor with static code exporter",
    category: "fullstack",
    status: "Completed",
    featured: true,
    thumbnail: "/assets/images/projects/website_builder.png",
    fallbackThumbnail: "assets/images/projects/website_builder.png",
    technologies: ["Flask", "Python", "JavaScript", "HTML5", "CSS3"],
    shortDescription: "A configurable website-building tool with modular components, live visual canvas preview, and clean export to clean HTML/CSS/JS bundles.",
    fullDescription: "Built to empower students and beginners to construct clean responsive web pages visually without bloated page-builder code. The backend compiles the component tree and generates semantic, human-readable HTML and modular CSS ready for static hosting.",
    problemSolved: "Most website builders produce heavily bloated code with thousands of unnecessary DIVs and scripts. This tool generates clean, minified, production-grade markup.",
    architecture: {
      type: "AST & Component Compiler",
      diagram: `
[ Browser Drag & Drop Canvas ] ---> [ JSON Component Tree Schema ]
                                                |
                                      POST /api/export/site
                                                |
                                      [ Python Jinja2 Engine ]
                                                |
                                   [ Zip Archive Generator ]
                                                |
                                      [ Downloadable Bundle ]`,
      points: [
        "Component state stored in structured JSON schema.",
        "Python backend validates component nesting and sanitizes raw input to prevent XSS.",
        "Generates responsive CSS tokens on the fly without heavy client runtime."
      ]
    },
    keyFeatures: [
      "Drag-and-drop structural blocks (Navbar, Hero, Grid, Features, Contact)",
      "Real-time live preview with viewport switching (Mobile, Tablet, Desktop)",
      "Instant ZIP download with semantic index.html, styles.css, and assets",
      "Dark / Light theme preset generator",
      "No external CDN dependencies in the exported output"
    ],
    challenges: "Sanitizing user-provided inline HTML attributes while preserving CSS layout flexibility. Solved by creating an allowlist parser for safe layout tags and styles.",
    githubUrl: "https://github.com/keabi531/flask-website-builder",
    liveDemoUrl: null
  },
  {
    id: "amu-finance-dashboard",
    title: "AMU Finance Dashboard",
    tagline: "Student budgeting, expense analytics & allowance tracker",
    category: "backend",
    status: "In Progress",
    featured: true,
    thumbnail: "/assets/images/projects/finance_dashboard.png",
    fallbackThumbnail: "assets/images/projects/finance_dashboard.png",
    technologies: ["Django", "PostgreSQL", "Chart.js", "Python", "REST API"],
    shortDescription: "A personal finance tracking dashboard for university students with spending analytics, budget alerts, and category breakdowns.",
    fullDescription: "Tailored to the financial realities of university life at Arba Minch University. Tracks meal expenses, academic supplies, stipend deposits, and monthly savings goals, presenting insights through clean data visualizations and proactive budget threshold warnings.",
    problemSolved: "University students frequently run out of budget mid-semester due to lack of visibility into recurring discretionary expenses and academic printing costs.",
    architecture: {
      type: "RESTful Service + Analytics Aggregator",
      diagram: `
+-------------------+             REST API              +--------------------+
| Responsive Client | <===============================> | Django REST API    |
+-------------------+                                   +--------------------+
          |                                                       |
 [ Interactive Charts ]                                    [ PostgreSQL ORM ]
                                                                  |
                                                      [ Aggregation Queries ]
                                                      (SUM, GROUP BY, DOW)`,
      points: [
        "PostgreSQL date truncation (`date_trunc`) for fast monthly and weekly rollups.",
        "Local browser cache for offline ledger recording with background sync.",
        "Custom budget health score algorithm based on remaining days in semester."
      ]
    },
    keyFeatures: [
      "Categorized expense logging with custom tags (Food, Books, Dorm, Travel)",
      "Interactive breakdown charts showing daily burn rate and category proportions",
      "Configurable semester budget caps with threshold visual notifications",
      "Monthly balance trend forecasting based on historical spend rate",
      "CSV ledger export for personal archiving"
    ],
    challenges: "Optimizing SQL aggregation queries across multiple academic semesters to render analytics charts without noticeable UI latency. Resolved using database indexes and query prefetching.",
    githubUrl: "https://github.com/keabi531/amu-finance-dashboard",
    liveDemoUrl: null
  },
  {
    id: "otp-email-auth",
    title: "OTP Email Authentication",
    tagline: "Secure one-time verification & passwordless workflow",
    category: "security",
    status: "Completed",
    featured: true,
    thumbnail: "/assets/images/projects/otp_auth.png",
    fallbackThumbnail: "assets/images/projects/otp_auth.png",
    technologies: ["Python", "Flask", "SMTP", "HMAC", "Rate Limiter"],
    shortDescription: "A standalone authentication microservice exploring cryptographically secure one-time passcode delivery, rate limiting, and session verification.",
    fullDescription: "An in-depth security project designed to master passwordless authentication flows and mitigate credential stuffing. Generates time-sensitive, single-use 6-digit codes hashed with HMAC-SHA256, enforces token expiry, and applies sliding-window IP rate limiting to stop brute-force attacks.",
    problemSolved: "Passwords are frequently reused and compromised. OTP email authentication provides a frictionless, high-security barrier for critical verification actions.",
    architecture: {
      type: "Auth Token Life-Cycle",
      diagram: `
[ User Enters Email ] ---> [ Rate Limiter (Token Bucket) ]
                                    |
                           [ Generate 6-Digit OTP ]
                                    |
                         [ Hash with Salt (HMAC) ] ---> [ Store in Redis/Cache (5m TTL) ]
                                    |
                         [ Dispatch SMTP Email ]
                                    |
[ User Submits OTP ] ----> [ Compare Cryptographic Hashes ] ---> [ Issue Session Token ]`,
      points: [
        "Passcodes never stored in plaintext — only HMAC digests with short 5-minute TTL.",
        "Timing-attack safe comparison using `hmac.compare_digest`.",
        "Strict 3-attempt limit before invalidating the token and triggering a cool-down."
      ]
    },
    keyFeatures: [
      "Cryptographically secure pseudo-random number generator (`secrets` module)",
      "5-minute expiration countdown with automatic purge",
      "Constant-time string comparison to prevent timing side-channel exploits",
      "IP and email address throttling (maximum 3 requests per 10 minutes)",
      "HTML email delivery template with clean anti-phishing advisory"
    ],
    challenges: "Preventing timing attacks during code comparison. Solved by utilizing Python's `secrets.compare_digest` and adding randomized artificial jitter to uniform response latency.",
    githubUrl: "https://github.com/keabi531/otp-email-auth",
    liveDemoUrl: null
  }
];

export const SKILLS_DATA = [
  {
    category: "Languages",
    icon: "code",
    skills: [
      { name: "Python", status: "Primary / Advanced", level: "core", icon: "python" },
      { name: "JavaScript", status: "Intermediate", level: "core", icon: "javascript" },
      { name: "Java", status: "Academic / Solid", level: "academic", icon: "java" },
      { name: "C++", status: "Curious / Exploring", level: "exploring", icon: "cpp" },
      { name: "Go", status: "Curious / Exploring", level: "exploring", icon: "go" }
    ]
  },
  {
    category: "Web Development",
    icon: "globe",
    skills: [
      { name: "HTML5", status: "Proficient", level: "core", icon: "html" },
      { name: "CSS3", status: "Responsive / Modern", level: "core", icon: "css" },
      { name: "Django", status: "Backend Framework", level: "core", icon: "django" },
      { name: "Flask", status: "Microservices / APIs", level: "core", icon: "flask" },
      { name: "React", status: "Learning / Frontend", level: "learning", icon: "react" }
    ]
  },
  {
    category: "Databases",
    icon: "database",
    skills: [
      { name: "PostgreSQL", status: "Relational / Primary", level: "core", icon: "postgres" },
      { name: "MySQL", status: "Relational / Queries", level: "core", icon: "mysql" },
      { name: "SQLAlchemy", status: "Python ORM", level: "core", icon: "sqlalchemy" },
      { name: "Microsoft Access", status: "Academic Foundation", level: "academic", icon: "access" }
    ]
  },
  {
    category: "Tools & Others",
    icon: "tool",
    skills: [
      { name: "Git & GitHub", status: "Version Control / CI", level: "core", icon: "git" },
      { name: "VS Code", status: "Primary IDE", level: "core", icon: "vscode" },
      { name: "Linux", status: "Terminal / Bash Basic", level: "core", icon: "linux" },
      { name: "Docker", status: "Containers (Learning)", level: "learning", icon: "docker" },
      { name: "Figma", status: "UI Prototyping Basic", level: "basic", icon: "figma" }
    ]
  }
];

export const JOURNEY_MILESTONES = [
  {
    year: "Current Focus",
    title: "Backend Architecture & Distributed Systems",
    description: "Deepening knowledge in Python concurrency (asyncio), database indexing & query optimization with PostgreSQL EXPLAIN, REST API scalability, and caching strategies."
  },
  {
    year: "Arba Minch University (AMU)",
    title: "Software Engineering Degree Program",
    description: "Studying core computer science fundamentals: Data Structures & Algorithms, Object-Oriented Software Design, Operating Systems, Database Management Systems, and Computer Networks."
  },
  {
    year: "Hands-on Practical Building",
    title: "Production-Focused Projects",
    description: "Built DevSafe Vault for encryption, AMU School Management System with Django, and P2P local file distribution. Focus on clean code, SOLID principles, and defensive engineering."
  },
  {
    year: "The Spark",
    title: "Hello World in Python",
    description: "Fell in love with the elegance of Python. Progressed from basic automation scripts to building full-featured web applications and microservices."
  }
];
