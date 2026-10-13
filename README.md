# ÉTOILE & CO. — AI-Powered Virtual Jewelry Try-On Studio

**DevX Technologies Case Study: Production-Minded Virtual Try-On MVP**  
*Haute Joaillerie Digital Boutique with Client-Side Face Landmark Detection, Vector Anatomical Earlobe Projection, Click-to-Pin Direct Placement & Real-Time Canvas Compositing.*

---

## 1. Executive Summary & Product Vision

**ÉTOILE & CO.** is a luxury digital jewelry boutique engineered for high jewelry clients seeking to envision exclusive earrings on their own portrait before booking a private salon consultation or commissioning bespoke creations.

Key design and architectural pillars:
- **Aesthetic Refinement**: Warm ivory (`#FAF8F5`), champagne gold (`#C5A880`), deep charcoal (`#1A1A1A`), Cormorant Garamond serif headings, and generous editorial whitespace.
- **Client-Side Computer Vision**: On-device face landmark detection via Google MediaPipe Tasks Vision (`FaceLandmarker` compiled to WebAssembly/WebGL).
- **Private & Zero-Storage Architecture**: 100% of image processing occurs in volatile client browser memory. Customer portraits are never uploaded to remote servers or third parties.
- **End-to-End Customer Journey**: From homepage to collection browsing, product specifications, real-time virtual try-on with an interactive before/after split slider, instant product switching, and private salon booking.

---

## 2. Core Implemented Features

### A. Boutique Homepage (`/`)
- Brand wordmark: **ÉTOILE & CO. Haute Joaillerie • Genève**.
- Editorial hero section with primary and secondary CTAs.
- 3-step explanation of the virtual fitting room experience.
- Curated collection preview featuring signature creations.
- Privacy guarantee pill: Client-side browser processing with zero image storage.

### B. Jewelry Catalog (`/collection`)
- Curated collection of 6 high-jewelry creations with realistic pricing (in INR), metal karat, and natural stone specifications:
  1. **Emerald Celeste Drop Earrings** (18K Yellow Gold & Zambian Emeralds, ₹3,85,000)
  2. **Diamond Solitaire Studs** (950 Platinum & VVS2 D-Colour Diamonds, ₹5,20,000)
  3. **Akoya Pearl Hoop Earrings** (18K Rose Gold & Japanese Akoya Pearls, ₹2,45,000)
  4. **Royal Sapphire Chandelier Earrings** (18K White Gold & Ceylon Blue Sapphires, ₹7,60,000)
  5. **Aurelia 18K Sculpted Hoops** (18K Solid Yellow Gold, ₹1,85,000)
  6. **Scarlet Marquise Ruby Drop Earrings** (18K Rose Gold & Burmese Rubies, ₹4,90,000)
- Filtering by category (Drop Earrings, Studs, Hoops, Chandelier) and price sorting (Low to High, High to Low).

### C. Product Detail Page (`/product/[slug]`)
- Editorial high-resolution jewelry gallery.
- Detailed gemstone cuts, carats, precious metals, and dimensions.
- Direct **"Experience Virtual Try-On"** action that preserves selected product state.
- **"Book Showroom Appointment"** and **"Inquire with Concierge"** options.
- Complementary creations recommendations.

### D. Virtual Try-On Studio (`/try-on`)
- **Three Input Methods**:
  1. Device file upload (JPEG, PNG, WebP) with size and format validation.
  2. Live webcam capture with user permission request, video flip/mirroring, and stream teardown.
  3. One-click studio editorial model portrait for immediate demonstration.
- **Computer Vision Pipeline**:
  - Dynamically initializes `@mediapipe/tasks-vision` Face Landmarker using self-hosted local WebAssembly and model weights in `/public/mediapipe/`.
  - Derives earlobe piercing points from tragus landmarks (`234` / `454`), jaw angles (`132` / `361`), and head roll tilt.
  - Proportional sizing relative to detected face scale (diamond studs calibrated to 12% face width; drop earrings to 22%).
- **Interactive Click-to-Pin Direct Placement**:
  - Click **"Pin Left Ear"** or **"Pin Right Ear"** and tap directly on the portrait to snap the earring to that exact pixel.
  - Single-click on the canvas automatically maps to the nearest ear.
- **Canvas Rendering Engine**:
  - High-DPI canvas overlay with realistic skin drop-shadows.
  - Aspect ratio and transparency preserved at full native resolution.
- **Seamless Product Switching**:
  - Switch earrings instantly from the carousel without re-uploading the portrait.
- **Interactive Before/After Comparison**:
  - Draggable split-comparison slider with real-time responsive scrubbing.
  - Alternative side-by-side or try-on-only views.
- **Precision Fine-Tuning Controls**:
  - Independent left and right ear horizontal/vertical adjustment sliders ($\pm 120\text{px}$).
  - Scale multiplier ($40\% - 160\%$) and rotation ($\pm 40^\circ$).
  - Individual left/right earring visibility toggles.
- **High-Resolution Export**:
  - Download composite canvas output directly to local PNG file.

### E. Private Salon & Concierge Appointment (`/appointment`)
- Connected directly to the customer's selected piece and try-on session ID.
- Fields: Full name, email, phone/WhatsApp, salon objective, preferred date, time, and custom craft notes.
- Explicit consent confirmation.
- Clear confirmation state with reference tracking ID.

---

## 3. Technology Stack

- **Framework**: Next.js 16 (App Router with partial prerendering & Suspense)
- **Language**: TypeScript (Strict type checking, 0 errors)
- **Styling**: Tailwind CSS & Vanilla CSS design system
- **Computer Vision**: `@mediapipe/tasks-vision` (WebAssembly/WebGL client execution with local asset hosting)
- **Rendering**: HTML5 2D Canvas with alpha blending and dynamic drop shadows
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond (editorial serif) & Plus Jakarta Sans

---

## 4. Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node v22.19.0)
- npm 9+

### Setup Commands
```bash
# 1. Clone repository and navigate to folder
cd jwellery

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your modern browser.

### Quality Verification Commands
```bash
# Type check TypeScript codebase
npx tsc --noEmit

# Run production build
npm run build

# Start production server
npm start
```

---

## 5. Project Architecture

```
jwellery/
├── docs/
│   └── ARCHITECTURE.md          # In-depth architectural trade-offs & vision decisions
├── public/
│   ├── jewelry/                 # High-resolution catalog product graphics
│   ├── overlays/                # Transparent jewelry overlay assets for canvas
│   ├── portraits/               # Editorial sample portrait for 1-click try-on
│   └── mediapipe/               # Self-hosted WebAssembly binaries and model weights
│       ├── wasm/
│       └── models/
├── src/
│   ├── app/
│   │   ├── appointment/         # Salon appointment & concierge booking
│   │   ├── collection/          # Filterable catalog collection page
│   │   ├── product/[slug]/      # Dedicated product specification pages
│   │   ├── try-on/              # Core Virtual Try-On Studio (MediaPipe + Canvas)
│   │   ├── globals.css          # Design system tokens and luxury styling
│   │   ├── layout.tsx           # Global typography & shell wrapper
│   │   └── page.tsx             # Boutique homepage
│   ├── components/
│   │   ├── Navbar.tsx           # Luxury header with navigation and CTA
│   │   ├── Footer.tsx           # Footer with zero-storage privacy guarantees
│   │   └── ProductCard.tsx      # Curated jewelry card with direct try-on link
│   ├── data/
│   │   └── products.ts          # Strongly typed catalog database & INR formatting
│   ├── lib/
│   │   ├── canvasRenderer.ts    # High-DPI canvas overlay & shadow compositing engine
│   │   ├── faceDetection.ts     # MediaPipe client-side landmarker & ear anchor engine
│   │   └── imageValidation.ts   # Client-side file validation and readers
│   └── types/
│       └── index.ts             # Domain models (Product, TryOnSession, Customer)
└── scripts/
    ├── generate-assets.js       # Script generating custom luxury jewelry SVGs
    └── generate-portraits.js    # Script generating sample editorial model
```

---

## 6. Privacy & Trust Architecture

1. **Zero Cloud Upload**: Customer portraits remain exclusively in volatile browser RAM.
2. **Resource Clean-up**: Video streams and canvas object URLs are immediately stopped and dereferenced upon unmount or photo clearance.
3. **Transparent Disclaimers**: Every preview prominently displays the approximation disclaimer:  
   *"AI Visualization — This preview is an approximation and does not guarantee exact physical fit, scale, lighting, or final appearance."*

---

## 7. Deployment Instructions (Vercel)

This application is ready for zero-configuration deployment to Vercel:

1. Push this repository to GitHub or GitLab.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Framework Preset: **Next.js**.
4. Build Command: `npm run build`.
5. Output Directory: `.next`.
6. Click **Deploy**.

---

## 8. License & Disclaimer

Designed and developed for the **DevX Technologies** interview case study. All product records, pricing, and salon bookings are illustrative demonstrations.
