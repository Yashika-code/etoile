// Generates sample front-facing portraits in public/portraits/ for instant 1-click try-on demo
const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'portraits');

const model1Svg = `
<svg width="800" height="1000" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="studioLighting" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#2D2825"/>
      <stop offset="60%" stop-color="#1B1716"/>
      <stop offset="100%" stop-color="#0E0C0B"/>
    </radialGradient>
    <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EED5C2"/>
      <stop offset="50%" stop-color="#E2C2AB"/>
      <stop offset="100%" stop-color="#CCA28B"/>
    </linearGradient>
    <linearGradient id="shadowSkin" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B68972" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#B68972" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2C1D18"/>
      <stop offset="50%" stop-color="#1E1410"/>
      <stop offset="100%" stop-color="#110A08"/>
    </linearGradient>
    <linearGradient id="hairHigh" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#452F27"/>
      <stop offset="50%" stop-color="#6E4A3F"/>
      <stop offset="100%" stop-color="#3D2922"/>
    </linearGradient>
    <linearGradient id="lipGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#C25D67"/>
      <stop offset="60%" stop-color="#9C3A44"/>
      <stop offset="100%" stop-color="#73232C"/>
    </linearGradient>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
  </defs>

  <rect width="800" height="1000" fill="url(#studioLighting)"/>

  <!-- Shoulders & Décolletage -->
  <path d="M120,1000 C150,780 250,720 400,720 C550,720 650,780 680,1000 Z" fill="url(#skinGrad)"/>
  
  <!-- Subtle silk dress neckline -->
  <path d="M120,1000 C240,840 560,840 680,1000 Z" fill="#0D0B0A"/>
  <path d="M260,890 C340,940 460,940 540,890" stroke="#C5A880" stroke-width="2" fill="none" opacity="0.6"/>

  <!-- Neck -->
  <path d="M340,560 L340,740 C340,750 460,750 460,740 L460,560 Z" fill="url(#skinGrad)"/>
  <path d="M340,580 C370,620 430,620 460,580 L460,650 C420,680 380,680 340,650 Z" fill="#B68972" opacity="0.3"/>

  <!-- Left Ear (viewer's left side: x ~ 230 to 260, y ~ 420 to 510) -->
  <path d="M255,420 C225,440 225,505 255,525 C265,510 265,435 255,420 Z" fill="url(#skinGrad)"/>
  <path d="M252,435 C238,450 238,495 252,505" stroke="#B68972" stroke-width="4" stroke-linecap="round" fill="none"/>
  <!-- Left Earlobe anchor target: x ~ 248, y ~ 515 -->
  <circle cx="248" cy="515" r="7" fill="#CCA28B"/>

  <!-- Right Ear (viewer's right side: x ~ 540 to 575, y ~ 420 to 510) -->
  <path d="M545,420 C575,440 575,505 545,525 C535,510 535,435 545,420 Z" fill="url(#skinGrad)"/>
  <path d="M548,435 C562,450 562,495 548,505" stroke="#B68972" stroke-width="4" stroke-linecap="round" fill="none"/>
  <!-- Right Earlobe anchor target: x ~ 552, y ~ 515 -->
  <circle cx="552" cy="515" r="7" fill="#CCA28B"/>

  <!-- Face Contour -->
  <path d="M255,410 C250,260 550,260 545,410 C545,530 500,640 400,640 C300,640 255,530 255,410 Z" fill="url(#skinGrad)"/>

  <!-- Cheek shading -->
  <ellipse cx="295" cy="485" rx="35" ry="50" fill="url(#shadowSkin)"/>
  <ellipse cx="505" cy="485" rx="35" ry="50" fill="url(#shadowSkin)" transform="scale(-1 1) translate(-1010 0)"/>

  <!-- Subtle blush -->
  <ellipse cx="320" cy="480" rx="36" ry="22" fill="#E17B79" opacity="0.18" filter="url(#soft)"/>
  <ellipse cx="480" cy="480" rx="36" ry="22" fill="#E17B79" opacity="0.18" filter="url(#soft)"/>

  <!-- Hair - Clean editorial updo that exposes the ears for jewelry try-on -->
  <path d="M260,370 C240,240 320,130 400,130 C480,130 560,240 540,370 C510,240 290,240 260,370 Z" fill="url(#hairGrad)"/>
  <path d="M300,180 C360,150 440,150 500,180 C460,165 340,165 300,180 Z" fill="url(#hairHigh)" opacity="0.5"/>
  <!-- High bun silhouette -->
  <ellipse cx="400" cy="150" rx="90" ry="70" fill="url(#hairGrad)"/>
  <ellipse cx="400" cy="135" rx="75" ry="50" fill="url(#hairHigh)" opacity="0.4"/>

  <!-- Left Eyebrow -->
  <path d="M310,380 C335,372 360,374 378,382" stroke="#2A1B16" stroke-width="6" stroke-linecap="round" fill="none"/>
  <!-- Right Eyebrow -->
  <path d="M422,382 C440,374 465,372 490,380" stroke="#2A1B16" stroke-width="6" stroke-linecap="round" fill="none"/>

  <!-- Left Eye -->
  <g transform="translate(345, 415)">
    <path d="M-30,0 C-15,-14 15,-14 30,0 C15,12 -15,12 -30,0 Z" fill="#FFFFFF"/>
    <circle cx="0" cy="0" r="13" fill="#3D2920"/>
    <circle cx="0" cy="0" r="6" fill="#150E0C"/>
    <circle cx="-3" cy="-3" r="3" fill="#FFFFFF"/>
    <path d="M-32,0 C-16,-16 16,-16 32,0" stroke="#150E0C" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <!-- Lashes -->
    <line x1="20" y1="-8" x2="28" y2="-16" stroke="#150E0C" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <!-- Right Eye -->
  <g transform="translate(455, 415)">
    <path d="M-30,0 C-15,-14 15,-14 30,0 C15,12 -15,12 -30,0 Z" fill="#FFFFFF"/>
    <circle cx="0" cy="0" r="13" fill="#3D2920"/>
    <circle cx="0" cy="0" r="6" fill="#150E0C"/>
    <circle cx="-3" cy="-3" r="3" fill="#FFFFFF"/>
    <path d="M-32,0 C-16,-16 16,-16 32,0" stroke="#150E0C" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <line x1="20" y1="-8" x2="28" y2="-16" stroke="#150E0C" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <!-- Nose -->
  <path d="M400,410 L395,490 C388,495 412,495 405,490 Z" fill="#CCA28B" opacity="0.4"/>
  <path d="M388,490 C394,498 406,498 412,490" stroke="#B68972" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="384" cy="488" r="3" fill="#9C6B55" opacity="0.4"/>
  <circle cx="416" cy="488" r="3" fill="#9C6B55" opacity="0.4"/>

  <!-- Lips -->
  <g transform="translate(400, 550)">
    <!-- Upper lip cupid's bow -->
    <path d="M-40,0 C-20,-12 -5,-8 0,-5 C5,-8 20,-12 40,0 C20,6 -20,6 -40,0 Z" fill="url(#lipGrad)"/>
    <!-- Lower lip -->
    <path d="M-38,0 C-25,18 25,18 38,0 C20,3 -20,3 -38,0 Z" fill="url(#lipGrad)"/>
    <!-- Lip shine -->
    <ellipse cx="0" cy="7" rx="14" ry="4" fill="#FFFFFF" fill-opacity="0.35"/>
  </g>

  <!-- Chin highlight -->
  <ellipse cx="400" cy="615" rx="20" ry="10" fill="#FFFFFF" opacity="0.12"/>
</svg>
`;

fs.writeFileSync(path.join(dir, 'editorial-model.svg'), model1Svg.trim(), 'utf8');
console.log('Sample model portrait created at public/portraits/editorial-model.svg');
