# Architecture & Technical Decision Record (TDR)

**Project:** ÉTOILE & CO. — AI-Powered Virtual Jewelry Try-On Studio  
**Author:** Senior Full-Stack & Computer Vision Engineer  
**Context:** DevX Technologies Case Study (MVP Production Prototype)  

---

## 1. Architectural Paradigm: Client-Side Computer Vision vs. Server-Side Generative Inpainting

### Selected Approach: Client-Side WebAssembly & HTML5 Canvas Compositing
In building a luxury jewelry try-on experience, we chose client-side computer vision leveraging **Google MediaPipe Tasks Vision (Face Landmarker)** compiled to WebAssembly running over GPU/WebGL/CPU pipelines in the customer's browser, coupled with high-DPI HTML Canvas overlay rendering.

### Comparison Matrix

| Evaluation Dimension | Client-Side Vision (Our Selection) | Server-Side Generative Diffusion / Inpainting |
| :--- | :--- | :--- |
| **Privacy & Trust** | **Absolute (Zero user image transmission)**. Portraits never leave the device. | **High Risk**. User portraits must be uploaded to remote cloud GPUs and stored or cached. |
| **Real-Time Latency** | **Instantaneous (< 80ms redrawing)** upon switching products or adjusting sliders. | **High (3–12 seconds per product switch)**. Unusable for browsing multiple creations. |
| **Infrastructure Cost** | **$0 compute cost per try-on**. Runs entirely on client hardware. | **Prohibitive ($0.02 - $0.06 per generation)** on A100/H100 cloud instances. |
| **Product Fidelity** | **100% exact jewel geometry**. Preserves carat scale, facets, hallmark metal finishes. | **Hallucinatory**. Generative inpainting distorts gemstone facets, colors, and cuts. |
| **Offline / Edge Readiness**| Functions offline once assets are cached. Compatible with static edge CDNs. | Dependent on backend availability and cloud GPU queuing. |

---

## 2. Anatomical Placement & The Earlobe Visibility Dilemma

### Computer Vision Reality
Standard face alignment models (including MediaPipe Face Landmarker with 468 landmarks) map canonical facial contours: jawline, eyes, nose, lips, forehead, and cheek boundaries. 

> [!IMPORTANT]
> **Facial landmarks do not guarantee that the actual fleshy earlobes are visible or unobstructed.** Earlobes may be covered by voluminous hairstyles, obscured by headwear, or hidden due to profile angles.

### Mathematical Anchor Calculation Engine
Rather than relying on ungrounded claims, our engine uses rigorous anthropometric geometry:
1. **Tragus & Cheek Reference Points**: Landmark index `234` (viewer's left tragus/cheek boundary) and `454` (viewer's right tragus/cheek boundary).
2. **Mandibular Jaw Angles**: Landmarks `132` (left angle of mandible) and `361` (right angle of mandible).
3. **Head Roll & Yaw Estimation**: The roll angle ($\theta$) is derived from the outer eye corners (`33` and `263`) using $\theta = \operatorname{atan2}(\Delta y, \Delta x)$. Yaw is evaluated by computing the nose tip (`1`) horizontal deviation from the mid-intercanthal axis.
4. **Vector Projection**: The earlobe anchor is projected downward along the jaw vector:
   $$\text{Lobe}_y = \text{Tragus}_y + 0.055 \cdot \text{FaceHeight} + \sin(\theta) \cdot 0.015 \cdot \text{FaceWidth}$$
   $$\text{Lobe}_x = \text{Tragus}_x \mp \cos(\theta) \cdot 0.015 \cdot \text{FaceWidth}$$
5. **Interactive Fine-Tuning Fallback**: Because hair texture and unique ear anatomy vary, we provide instant micro-adjustment sliders (horizontal $\pm 40\text{px}$, vertical $\pm 40\text{px}$, scale $70\% - 140\%$, rotation $\pm 25^\circ$) and independent left/right ear visibility toggles.

---

## 3. Image Processing & Rendering Pipeline

1. **Input Ingestion**:
   - Device File Upload (`<input type="file">` supporting JPEG, PNG, WebP with client-side file size $\le 12\text{MB}$ validation).
   - Live Webcam Feed (`navigator.mediaDevices.getUserMedia` with video mirroring and clean track termination upon photo capture).
   - One-Click Studio Model (Editorial front-facing updo portrait for instant preview).
2. **Local Detection**:
   - The selected image is piped directly into `FaceLandmarker.detect()`.
   - If no face is detected, a helpful recovery dialogue guides the user to a front-facing image, and an aesthetic golden-ratio geometric fallback is applied so the experience never breaks.
3. **Canvas Compositing**:
   - The original portrait is painted at native resolution onto an offscreen/onscreen HTML Canvas.
   - For each ear, an alpha-blended drop shadow is cast onto the jawline to ground the jewelry realistically.
   - The vector/transparent PNG overlay is translated to the computed ear anchor, rotated according to head tilt, scaled proportionally to face width, and drawn with sub-pixel anti-aliasing.
4. **Before/After Comparison**:
   - Interactive draggable split slider and side-by-side mode allowing buyers to inspect their look with zero lag.
5. **Lossless Export**:
   - The full composited canvas is exported directly to high-resolution PNG using standard browser data URLs.

---

## 4. Product Context Preservation & CRM Integration Path

Throughout the customer journey:
- Selecting an earring in the Try-On studio immediately updates the URL parameters (`?product=[id]`).
- Switching earrings updates canvas compositing without re-running facial landmark detection or reloading the user's portrait.
- Clicking **"Book Salon"** or **"Inquire with Concierge"** carries the product ID, specifications, and session reference ID into the `/appointment` booking view.
- In production, the generated `TryOnSession` object and `requestId` will dispatch an encrypted payload to the boutique's Salesforce/HubSpot Luxury CRM webhook or WhatsApp Business API.

---

## 5. Expansion Roadmap for Other Jewelry Categories

The modular anchor architecture is built to support multi-category luxury virtual try-on:

| Category | Anatomical Landmark Reference | Projection Strategy |
| :--- | :--- | :--- |
| **Necklaces & Chokers** | Suprasternal notch (`152` chin to neck midpoint) | Catena spline curve fitted between clavicle reference points. |
| **Tiara & Hairpieces** | Forehead glabella (`10`) and hairline contour | Convex hull wrap anchored at upper cranial curve. |
| **Rings** | MediaPipe Hands Vision (MCP, PIP, DIP finger joints) | 3D bounding cylinder oriented along the proximal phalanx. |
| **Bracelets** | MediaPipe Hands Wrist Landmark (`0`) | Elliptical bracelet band wrapped around the carpal axis. |
