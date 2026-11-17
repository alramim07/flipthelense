# FlipTheLense — Cinematic Filmmaking & Video Editing Studio Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN%20(React%2019%20%2B%20Node%20%2B%20Express%20%2B%20MongoDB)-yellow.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Bundler-Vite%208-646CFF.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com)
[![Security Hardened](https://img.shields.io/badge/Security-Helmet%20%7C%20RateLimit%20%7C%20JWT%20%7C%20Honeypot-green.svg)](#security--architecture)

**FlipTheLense** is an enterprise-grade, high-performance web application designed for high-end cinematic video production, commercial color grading, narrative film editing, and creative agency services. Featuring full Elementor-style dynamic visual builders for every public page, automated social media reels embed resolution, real-time visitor session analytics, client inquiries management, and multi-tier project showcases.

---

## 🌟 Key Capabilities & Highlights

- **Dynamic Page Builders:** Full custom CMS page builders for **Home (`/`)**, **About Us (`/about`)**, **Portfolio (`/portfolio`)**, and **Contact Us (`/contact`)** with instant visual preview and live database synchronization.
- **Smart Multi-Platform Reels & Shorts:** Interactive vertical gallery supporting **YouTube, Instagram Reels, TikTok, Facebook Watch, and Pinterest**. Features automated platform detection, high-resolution thumbnail resolution, and viral engagement metric overlays (Views 👁️, Likes ❤️, Comments 💬, Shares ↗️).
- **Elementor-Grade Videen Portfolio Architecture:** Pixel-perfect responsive filmmaker portfolio with filterable project categories, responsive video modals, and SEO-optimized clean URLs (`/:slug`).
- **Single Project Showcase & Fiverr-Style Gig Experience:** Dedicated single project route with rich media galleries, 3-tier interactive pricing (Basic / Standard / Premium), verified client review carousels, and user feedback submission.
- **Integrated Visitor Analytics Tracker:** Privacy-friendly, non-intrusive unique session tracker with device categorization (Desktop / Tablet / Mobile), referrer attribution, screen resolution analytics, and top-performing page metrics.
- **Enterprise Security Hardened:** Built-in Helmet HTTP security headers, tiered rate-limiting against brute-force and DDoS, strict file upload MIME type validation, invisible honeypot anti-spam shields, and RFC 5322 email verification with disposable email domain blocking.
- **Hybrid Data Persistence:** Seamless dual-driver data architecture running on **MongoDB Atlas (Mongoose ORM)** with automatic local persistent JSON storage fallback to guarantee 100% server uptime even during cloud connectivity interruptions.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, React Router DOM v7, Vite 8 |
| **Styling & Design** | Tailwind CSS 4, Custom Animations, Brand Typography (`Oswald`, `Raleway`) |
| **Icons & Media** | Lucide React, Custom Official SVG Brand Logos (YouTube, Instagram, TikTok, Facebook, Pinterest) |
| **Backend Framework** | Node.js (v20+ / v22+), Express.js (ES Modules) |
| **Database & ODM** | MongoDB Atlas Cloud, Mongoose 8.9+, Local Atomic Persistent Store |
| **Security & Utilities** | Helmet, Express Rate Limit, JSON Web Tokens (JWT), Bcrypt.js, Multer |

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (Version 18.x, 20.x, or 22.x LTS recommended)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (Optional: Local fallback runs automatically without Atlas setup)

---

### 2. Installation & Setup

Clone the repository and install dependencies for both `server` and `client`:

```bash
# Clone the repository
git clone https://github.com/alramim07/flipthelense.git
cd flipthelense

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

### 3. Environment Variables Configuration

In `server/.env`, configure your environment variables:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String (Optional: Server automatically uses local fallback if empty)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/flipthelense?retryWrites=true&w=majority

# JWT Authentication Secret
JWT_SECRET=flipthelense_super_secret_jwt_key_2026

# Allowed CORS Origins (Comma-separated)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5000,http://127.0.0.1:5173
```

---

### 4. Running the Development Servers

#### Start the Backend API Server:
```bash
cd server
npm run dev
# Server will launch on http://localhost:5000
```

#### Start the Frontend Client:
```bash
cd client
npm run dev
# Application will launch on http://localhost:5173
```

---

## 🗺️ Application Routes Architecture

### Public Routes:
- `/` — **Homepage:** Hero showcase, 8-card staggered multi-platform reels gallery, filmmaker story, 10-preset interactive editing process highway, brand collaborations, and client testimonials.
- `/about` — **About Us / Resume:** Hero banner, signature quote statement, filmmaker skills progress, 4 production specialties, career timeline, gear arsenal, and dual-action bottom CTA.
- `/portfolio` — **Portfolio Showcase:** Hero filmmaker composition with statistics, dynamic category filter tabs (Commercials, Weddings, Music Videos, Documentaries), responsive video preview modal, and cinematic background CTA banner.
- `/:slug` — **Dynamic Single Project Page:** Dedicated SEO-friendly project showcase with media gallery, client details, 3-tier pricing matrix, and interactive client reviews.
- `/contact` — **Contact Us:** Studio details, Google Map embed, inquiry intake form with anti-spam honeypot, and bottom promotional banner.

### Administrative Portal Routes (`/admin`):
- `/admin` or `/admin/login` — Secure administrative authentication with signed JWT tokens.
- `/admin/dashboard` — Live Web Analytics, Traffic Charts, and System Health.
- `/admin/portfolio` — Project CRUD manager and Elementor-style visual project builder.
- `/admin/categories` — Dynamic portfolio category taxonomy manager with automatic slug synchronization.
- `/admin/reviews` — Client review moderation center (Approve, Reject, Pending, Custom entry).
- `/admin/inquiries` — Customer inquiries and booking leads CRM.
- `/admin/settings` — Global website branding, dynamic logo & favicon manager, navigation menu builder, header CTA customizer, and 7-card footer customizer.
- `/admin/pages/home-builder` — Visual section-to-section builder for the Home Page.
- `/admin/pages/about-builder` — Visual section-to-section builder for the About Us Page.
- `/admin/pages/portfolio-builder` — Visual section-to-section builder for the Portfolio Page.
- `/admin/pages/contact-builder` — Visual section-to-section builder for the Contact Us Page.

---

## 🛡️ Security & Architecture

1. **Anti-DDoS & Rate Limiting (`express-rate-limit`):**
   - General API limiter: 1,000 requests per 15-minute window per IP.
   - Strict sensitive limiter: 50 requests per 15-minute window on file uploads, inquiries, and authentication endpoints.
2. **HTTP Hardening (`helmet`):**
   - Prevents clickjacking (`X-Frame-Options: SAMEORIGIN`), disables MIME-type sniffing (`X-Content-Type-Options: nosniff`), and configures secure cross-origin resource sharing for video embeds.
3. **Strict File Upload Filtering:**
   - Multi-stage Multer verification enforcing an allowed image whitelist (`.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`, `.gif`) and MIME type inspection.
4. **Anti-Spam & Form Protection:**
   - RFC 5322 compliant email regex validation.
   - Disposable & temporary email domain blacklisting (`tempmail.com`, `mailinator.com`, etc.).
   - Invisible honeypot bot trap to filter out automated submission scripts.
5. **Payload Limiting & Sanitization:**
   - Express JSON parser restricted to 2MB to prevent payload exhaustion attacks.
   - Server-side input sanitization stripping dangerous angle brackets and injection payloads.
6. **Live Health & Uptime Diagnostics:**
   - Real-time `/health` endpoint returning system uptime, heap memory usage, and database connection status.

---

## 📁 Repository Structure

```
flipthelense/
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── public/                 # Static branding assets and images
│   ├── src/
│   │   ├── assets/             # Vector icons and core graphics
│   │   ├── components/         # Reusable UI components (Navbar, Footer, Modals)
│   │   │   ├── common/         # VideoModal, Toasts
│   │   │   └── home/           # HeroSection, ReelsSection, AboutSection, etc.
│   │   ├── context/            # SettingsContext (Global dynamic CMS provider)
│   │   ├── pages/              # Main routes and Admin Page Builders
│   │   │   ├── Home.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── ServiceDetail.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── HomePageBuilder.jsx
│   │   │   ├── AboutPageBuilder.jsx
│   │   │   ├── PortfolioPageBuilder.jsx
│   │   │   └── ContactPageBuilder.jsx
│   │   ├── App.jsx             # Main routing table & visitor tracker
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API Application (Node.js + Express)
│   ├── data/                   # Persistent local JSON data fallback
│   │   └── local_db.json
│   ├── uploads/                # Dynamic user uploaded images & logos
│   ├── src/
│   │   ├── middleware/         # Authentication & Authorization middlewares
│   │   │   └── auth.js
│   │   ├── models/             # Mongoose schemas (Portfolio, Inquiry, Settings, etc.)
│   │   ├── routes/             # RESTful API route definitions
│   │   │   └── api.js
│   │   ├── store/              # Atomic JSON store persistence layer
│   │   ├── utils/              # Email & input validators
│   │   │   └── validator.js
│   │   ├── seedData.js         # Default initial database seed
│   │   └── server.js           # Server bootstrap & security middlewares
│   └── package.json
│
└── README.md                   # Project documentation
```

---

## 💳 Payment Gateway Architecture & Multi-Provider Settings

The platform features an enterprise-grade payment settings management hub situated inside **Admin Dashboard > Website Settings > Payment Gateways**. Administrators can independently configure and toggle between global and domestic payment providers:

| Provider | Type | Supported Channels & Features | Configuration Parameters |
| :--- | :--- | :--- | :--- |
| **Stripe** | Global Cards & Wallets | Visa, Mastercard, Amex, Apple Pay, Google Pay | Publishable Key (`pk_...`), Secret Key (`sk_...`), Webhook Secret (`whsec_...`), Default Currency (USD, EUR, GBP, AUD, BDT), Test/Live Mode toggle |
| **FastSpring** | Merchant of Record (MoR) | International Invoicing, Global VAT/GST Compliance, Wire Transfers | Storefront Identifier, API Username, API Password, Webhook HMAC Verification Key, Sandbox/Live toggle |
| **bKash** | Bangladesh MFS | Instant Direct Tokenized Checkout (PGW API v1.2.0) | App Key, App Secret, API Username, API Password, Merchant Wallet Number, Execute Callback Listener |
| **Nagad** | Bangladesh Post MFS | RSA 2048-bit Encrypted Checkout | Merchant ID, Merchant RSA Private Key, PGW Public Key, Verify Callback Listener, Sandbox/Production toggle |
| **Rocket** | DBBL Mobile Banking | Direct Biller & Terminal Gateway | Biller ID, Merchant/Terminal ID, Sub-Account ID, API Hash Secret, IPN Callback Listener |

All sensitive keys are secured with UI mask/reveal toggles, persistent database state synchronization, and one-click clipboard webhooks.

---

## 🚢 Production Deployment

### Building the Client:
```bash
cd client
npm run build
```
The compiled, minified production assets will be output to `client/dist`.

### Running in Production:
```bash
cd server
NODE_ENV=production node src/server.js
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author & Maintainer
**FlipTheLense Creative Studio**  
- **Lead Developer & Editor:** Parvej Mosharrof Pollob  
- **Email:** flipthelense@gmail.com  
- **Repository:** [https://github.com/alramim07/flipthelense](https://github.com/alramim07/flipthelense)
