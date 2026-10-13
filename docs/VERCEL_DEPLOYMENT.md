# Deploying ÉTOILE & CO. on Vercel

Step-by-step guide to deploying this virtual jewelry try-on application to Vercel.

---

## 1. Quick One-Click Import

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub account and find the repository:
   ```
   Yashika-code/etoile
   ```
4. Click **"Import"**.

---

## 2. Recommended Build & Project Settings

Vercel will automatically detect **Next.js**. Verify that the settings match:

- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node.js Version**: `18.x` or `20.x` or `22.x` (Recommended: Node 20 or 22)

---

## 3. Environment Variables

> [!NOTE]
> **No environment variables are required.**  
> The MVP processes 100% of facial landmarks and canvas try-on rendering locally in the client's browser using self-hosted WebAssembly (`/public/mediapipe/`). There are no paid AI APIs, databases, or secret keys needed to run this application.

---

## 4. WebAssembly & Edge Optimization (`vercel.json`)

We have pre-configured [`vercel.json`](./vercel.json) in the repository root to ensure maximum speed and compatibility on Vercel's global edge network:

1. **WebAssembly & Task Models Caching**:
   - `public/mediapipe/wasm/` and `public/mediapipe/models/` are served with immutable long-term edge caching (`max-age=31536000`), ensuring rapid loads on repeat customer visits.
2. **Cross-Origin Isolation**:
   - Configures `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers for SIMD / WebAssembly threading acceleration when supported by the browser.
3. **Clean URLs**:
   - Direct pretty URLs (`/collection`, `/try-on`, `/appointment`).

---

## 5. Post-Deployment Verification Checklist

Once your deployment finishes (typically within 45–60 seconds):

- [ ] Visit the generated `*.vercel.app` URL.
- [ ] **Homepage**: Verify luxury typography, hero section, and wordmark.
- [ ] **Try-On Studio (`/try-on`)**:
  - Test **"Try with Studio Editorial Model"** to confirm WebAssembly landmark detection loads from the Vercel CDN.
  - Test switching between earrings (Emerald Drops, Diamond Studs, Pearl Hoops, etc.).
  - Test dragging the split slider before/after.
  - Test **"Download Look"** to verify canvas export works on production HTTPS.
- [ ] **Webcam Check**:
  - HTTPS is mandatory for browser camera access (`getUserMedia`). Vercel provides free automatic SSL certificates, ensuring the live webcam try-on works securely on both desktop and mobile devices.
- [ ] **Salon Booking (`/appointment`)**:
  - Test filling out a private viewing appointment request and confirm the local confirmation card appears.
