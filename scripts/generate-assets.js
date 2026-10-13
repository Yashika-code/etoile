// Generates realistic ultra-high-resolution SVG product artwork and transparent PNG-equivalent SVG overlays
const fs = require('fs');
const path = require('path');

const jewelryDir = path.join(process.cwd(), 'public', 'jewelry');
const overlaysDir = path.join(process.cwd(), 'public', 'overlays');

const products = [
  {
    id: 'emerald-celeste-drops',
    name: 'Emerald Celeste Drop Earrings',
    generateCatalogSvg: () => `
<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FDFBF7"/>
      <stop offset="100%" stop-color="#EFEAE1"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F7E7CE"/>
      <stop offset="25%" stop-color="#C5A880"/>
      <stop offset="50%" stop-color="#E5C89E"/>
      <stop offset="75%" stop-color="#9A7B4F"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="35%" stop-color="#047857"/>
      <stop offset="70%" stop-color="#064E3B"/>
      <stop offset="100%" stop-color="#022C22"/>
    </linearGradient>
    <linearGradient id="facetHighlight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6EE7B7" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#047857" stop-opacity="0.1"/>
    </linearGradient>
    <filter id="luxuryShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#1A1A1A" flood-opacity="0.12"/>
    </filter>
    <filter id="gemGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#bgGlow)"/>
  
  <!-- Subtle architectural pedestal shadow -->
  <ellipse cx="400" cy="710" rx="260" ry="24" fill="#000000" fill-opacity="0.06"/>
  <ellipse cx="400" cy="705" rx="180" ry="14" fill="#000000" fill-opacity="0.08"/>

  <g filter="url(#luxuryShadow)">
    <!-- LEFT EARRING -->
    <g transform="translate(290, 160)">
      <!-- Stud base -->
      <circle cx="0" cy="0" r="14" fill="url(#goldGrad)"/>
      <circle cx="0" cy="0" r="8" fill="#FFFFFF" fill-opacity="0.9"/>
      <circle cx="0" cy="0" r="4" fill="#E0F2FE"/>

      <!-- Delicate gold link chain -->
      <path d="M0,14 L0,70" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="42" r="5" fill="url(#goldGrad)"/>
      <circle cx="0" cy="42" r="2.5" fill="#FFFFFF"/>

      <!-- Diamond halo connector -->
      <circle cx="0" cy="80" r="12" fill="url(#goldGrad)"/>
      <circle cx="0" cy="80" r="8" fill="#F8FAFC"/>
      <circle cx="0" cy="80" r="4" fill="#38BDF8"/>

      <!-- Emerald Cut main gem setting -->
      <!-- Gold bezel rim -->
      <rect x="-38" y="105" width="76" height="130" rx="14" fill="url(#goldGrad)"/>
      <!-- Emerald Stone Body -->
      <rect x="-32" y="111" width="64" height="118" rx="10" fill="url(#emeraldGrad)"/>
      
      <!-- Emerald Facets -->
      <polygon points="-32,111 -18,125 18,125 32,111" fill="url(#facetHighlight)"/>
      <polygon points="32,111 18,125 18,215 32,229" fill="#047857" fill-opacity="0.6"/>
      <polygon points="32,229 18,215 -18,215 -32,229" fill="#022C22" fill-opacity="0.9"/>
      <polygon points="-32,229 -18,215 -18,125 -32,111" fill="#059669" fill-opacity="0.5"/>
      <!-- Inner table facet -->
      <rect x="-18" y="125" width="36" height="90" rx="4" fill="#047857" fill-opacity="0.85"/>
      <line x1="-12" y1="135" x2="12" y2="135" stroke="#A7F3D0" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      <polygon points="-12,135 12,135 6,190 -10,185" fill="#34D399" fill-opacity="0.25"/>

      <!-- Small diamond drop at bottom -->
      <path d="M0,235 L0,250" stroke="url(#goldGrad)" stroke-width="3"/>
      <polygon points="0,250 8,262 0,274 -8,262" fill="url(#goldGrad)"/>
      <polygon points="0,253 5,262 0,270 -5,262" fill="#FFFFFF"/>
    </g>

    <!-- RIGHT EARRING -->
    <g transform="translate(510, 160)">
      <!-- Stud base -->
      <circle cx="0" cy="0" r="14" fill="url(#goldGrad)"/>
      <circle cx="0" cy="0" r="8" fill="#FFFFFF" fill-opacity="0.9"/>
      <circle cx="0" cy="0" r="4" fill="#E0F2FE"/>

      <!-- Delicate gold link chain -->
      <path d="M0,14 L0,70" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="42" r="5" fill="url(#goldGrad)"/>
      <circle cx="0" cy="42" r="2.5" fill="#FFFFFF"/>

      <!-- Diamond halo connector -->
      <circle cx="0" cy="80" r="12" fill="url(#goldGrad)"/>
      <circle cx="0" cy="80" r="8" fill="#F8FAFC"/>
      <circle cx="0" cy="80" r="4" fill="#38BDF8"/>

      <!-- Emerald Cut main gem setting -->
      <rect x="-38" y="105" width="76" height="130" rx="14" fill="url(#goldGrad)"/>
      <rect x="-32" y="111" width="64" height="118" rx="10" fill="url(#emeraldGrad)"/>
      
      <!-- Facets -->
      <polygon points="-32,111 -18,125 18,125 32,111" fill="url(#facetHighlight)"/>
      <polygon points="32,111 18,125 18,215 32,229" fill="#047857" fill-opacity="0.6"/>
      <polygon points="32,229 18,215 -18,215 -32,229" fill="#022C22" fill-opacity="0.9"/>
      <polygon points="-32,229 -18,215 -18,125 -32,111" fill="#059669" fill-opacity="0.5"/>
      <rect x="-18" y="125" width="36" height="90" rx="4" fill="#047857" fill-opacity="0.85"/>
      <line x1="-12" y1="135" x2="12" y2="135" stroke="#A7F3D0" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      <polygon points="-12,135 12,135 6,190 -10,185" fill="#34D399" fill-opacity="0.25"/>

      <!-- Bottom accent -->
      <path d="M0,235 L0,250" stroke="url(#goldGrad)" stroke-width="3"/>
      <polygon points="0,250 8,262 0,274 -8,262" fill="url(#goldGrad)"/>
      <polygon points="0,253 5,262 0,270 -5,262" fill="#FFFFFF"/>
    </g>
  </g>
</svg>
`,
    generateOverlaySvg: () => `
<svg width="240" height="340" viewBox="0 0 240 340" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldG_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FBF3E8"/>
      <stop offset="30%" stop-color="#D9B788"/>
      <stop offset="70%" stop-color="#9C7948"/>
      <stop offset="100%" stop-color="#C5A880"/>
    </linearGradient>
    <linearGradient id="emG_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="40%" stop-color="#047857"/>
      <stop offset="85%" stop-color="#064E3B"/>
      <stop offset="100%" stop-color="#022C22"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <g filter="url(#softGlow)" transform="translate(120, 20)">
    <!-- Top stud (Ear anchor pivot is ~ 120, 20) -->
    <circle cx="0" cy="0" r="10" fill="url(#goldG_ov)"/>
    <circle cx="0" cy="0" r="5" fill="#FFFFFF" fill-opacity="0.95"/>

    <path d="M0,10 L0,50" stroke="url(#goldG_ov)" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="0" cy="30" r="4" fill="url(#goldG_ov)"/>
    <circle cx="0" cy="30" r="2" fill="#FFFFFF"/>

    <!-- Halo -->
    <circle cx="0" cy="60" r="10" fill="url(#goldG_ov)"/>
    <circle cx="0" cy="60" r="6" fill="#FFFFFF"/>
    <circle cx="0" cy="60" r="3" fill="#BAE6FD"/>

    <!-- Emerald bezel & stone -->
    <rect x="-30" y="80" width="60" height="106" rx="12" fill="url(#goldG_ov)"/>
    <rect x="-24" y="86" width="48" height="94" rx="8" fill="url(#emG_ov)"/>
    
    <!-- Facet lines -->
    <polygon points="-24,86 -12,98 12,98 24,86" fill="#6EE7B7" fill-opacity="0.75"/>
    <polygon points="24,86 12,98 12,168 24,180" fill="#047857" fill-opacity="0.5"/>
    <polygon points="24,180 12,168 -12,168 -24,180" fill="#022C22" fill-opacity="0.9"/>
    <polygon points="-24,180 -12,168 -12,98 -24,86" fill="#059669" fill-opacity="0.5"/>
    <rect x="-12" y="98" width="24" height="70" rx="3" fill="#047857" fill-opacity="0.9"/>
    <line x1="-8" y1="108" x2="8" y2="108" stroke="#D1FAE5" stroke-width="2" stroke-linecap="round"/>

    <!-- Drop finial -->
    <path d="M0,186 L0,202" stroke="url(#goldG_ov)" stroke-width="3"/>
    <polygon points="0,202 7,214 0,226 -7,214" fill="url(#goldG_ov)"/>
    <polygon points="0,205 4,214 0,222 -4,214" fill="#FFFFFF"/>
  </g>
</svg>
`
  },
  {
    id: 'solitaire-brilliant-studs',
    name: 'Diamond Solitaire Studs',
    generateCatalogSvg: () => `
<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="studBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FCFCFC"/>
      <stop offset="100%" stop-color="#ECE7DF"/>
    </radialGradient>
    <linearGradient id="platGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="#E2E8F0"/>
      <stop offset="70%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
    <radialGradient id="diaGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#F0F9FF"/>
      <stop offset="80%" stop-color="#BAE6FD"/>
      <stop offset="100%" stop-color="#7DD3FC"/>
    </radialGradient>
    <filter id="studShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#studBg)"/>
  <ellipse cx="400" cy="580" rx="220" ry="20" fill="#000" fill-opacity="0.07"/>

  <g filter="url(#studShadow)">
    <!-- LEFT STUD -->
    <g transform="translate(300, 360)">
      <!-- 6 Platinum prongs -->
      <circle cx="0" cy="0" r="66" fill="url(#platGrad)"/>
      <circle cx="0" cy="0" r="56" fill="url(#diaGlow)"/>
      
      <!-- Facet cuts -->
      <polygon points="0,-56 26,-26 0,0 -26,-26" fill="#FFFFFF" fill-opacity="0.95"/>
      <polygon points="26,-26 56,0 26,26 0,0" fill="#E0F2FE" fill-opacity="0.7"/>
      <polygon points="0,0 26,26 0,56 -26,26" fill="#BAE6FD" fill-opacity="0.6"/>
      <polygon points="-26,-26 0,0 -26,26 -56,0" fill="#F8FAFC" fill-opacity="0.85"/>
      <!-- Inner brilliant star -->
      <polygon points="0,-40 12,-12 40,0 12,12 0,40 -12,12 -40,0 -12,-12" fill="#FFFFFF" fill-opacity="0.98"/>
      
      <!-- Prongs -->
      <circle cx="0" cy="-62" r="7" fill="url(#platGrad)"/>
      <circle cx="54" cy="-31" r="7" fill="url(#platGrad)"/>
      <circle cx="54" cy="31" r="7" fill="url(#platGrad)"/>
      <circle cx="0" cy="62" r="7" fill="url(#platGrad)"/>
      <circle cx="-54" cy="31" r="7" fill="url(#platGrad)"/>
      <circle cx="-54" cy="-31" r="7" fill="url(#platGrad)"/>
    </g>

    <!-- RIGHT STUD -->
    <g transform="translate(500, 360)">
      <circle cx="0" cy="0" r="66" fill="url(#platGrad)"/>
      <circle cx="0" cy="0" r="56" fill="url(#diaGlow)"/>
      <polygon points="0,-56 26,-26 0,0 -26,-26" fill="#FFFFFF" fill-opacity="0.95"/>
      <polygon points="26,-26 56,0 26,26 0,0" fill="#E0F2FE" fill-opacity="0.7"/>
      <polygon points="0,0 26,26 0,56 -26,26" fill="#BAE6FD" fill-opacity="0.6"/>
      <polygon points="-26,-26 0,0 -26,26 -56,0" fill="#F8FAFC" fill-opacity="0.85"/>
      <polygon points="0,-40 12,-12 40,0 12,12 0,40 -12,12 -40,0 -12,-12" fill="#FFFFFF" fill-opacity="0.98"/>
      
      <circle cx="0" cy="-62" r="7" fill="url(#platGrad)"/>
      <circle cx="54" cy="-31" r="7" fill="url(#platGrad)"/>
      <circle cx="54" cy="31" r="7" fill="url(#platGrad)"/>
      <circle cx="0" cy="62" r="7" fill="url(#platGrad)"/>
      <circle cx="-54" cy="31" r="7" fill="url(#platGrad)"/>
      <circle cx="-54" cy="-31" r="7" fill="url(#platGrad)"/>
    </g>
  </g>
</svg>
`,
    generateOverlaySvg: () => `
<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="plat_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <radialGradient id="dia_ov" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F0F9FF"/>
      <stop offset="85%" stop-color="#BAE6FD"/>
      <stop offset="100%" stop-color="#60A5FA"/>
    </radialGradient>
    <filter id="studDrop" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>
  <g filter="url(#studDrop)" transform="translate(90, 90)">
    <circle cx="0" cy="0" r="40" fill="url(#plat_ov)"/>
    <circle cx="0" cy="0" r="33" fill="url(#dia_ov)"/>
    
    <polygon points="0,-33 16,-16 0,0 -16,-16" fill="#FFFFFF" fill-opacity="0.95"/>
    <polygon points="16,-16 33,0 16,16 0,0" fill="#E0F2FE" fill-opacity="0.75"/>
    <polygon points="0,0 16,16 0,33 -16,16" fill="#93C5FD" fill-opacity="0.6"/>
    <polygon points="-16,-16 0,0 -16,16 -33,0" fill="#F8FAFC" fill-opacity="0.85"/>
    <polygon points="0,-24 8,-8 24,0 8,8 0,24 -8,8 -24,0 -8,-8" fill="#FFFFFF" fill-opacity="0.98"/>

    <!-- 6 Prongs -->
    <circle cx="0" cy="-37" r="4.5" fill="url(#plat_ov)"/>
    <circle cx="32" cy="-18" r="4.5" fill="url(#plat_ov)"/>
    <circle cx="32" cy="18" r="4.5" fill="url(#plat_ov)"/>
    <circle cx="0" cy="37" r="4.5" fill="url(#plat_ov)"/>
    <circle cx="-32" cy="18" r="4.5" fill="url(#plat_ov)"/>
    <circle cx="-32" cy="-18" r="4.5" fill="url(#plat_ov)"/>
  </g>
</svg>
`
  },
  {
    id: 'lumiere-pearl-hoops',
    name: 'Akoya Pearl Hoop Earrings',
    generateCatalogSvg: () => `
<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="pBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FAF8F5"/>
      <stop offset="100%" stop-color="#EBE3D7"/>
    </radialGradient>
    <linearGradient id="roseGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE4D6"/>
      <stop offset="40%" stop-color="#E8A598"/>
      <stop offset="70%" stop-color="#C27D6F"/>
      <stop offset="100%" stop-color="#F5B7B1"/>
    </linearGradient>
    <radialGradient id="pearlShine" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="45%" stop-color="#FFFDF7"/>
      <stop offset="75%" stop-color="#F3E9E0"/>
      <stop offset="90%" stop-color="#DEC8B8"/>
      <stop offset="100%" stop-color="#B89B88"/>
    </radialGradient>
    <filter id="pShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#1A1A1A" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#pBg)"/>
  <ellipse cx="400" cy="700" rx="260" ry="22" fill="#000" fill-opacity="0.06"/>

  <g filter="url(#pShadow)">
    <!-- LEFT HOOP -->
    <g transform="translate(290, 180)">
      <!-- Golden Hoop -->
      <circle cx="0" cy="110" r="100" stroke="url(#roseGold)" stroke-width="14" fill="none"/>
      <!-- Pave diamonds along arc -->
      <circle cx="-60" cy="170" r="4" fill="#FFFFFF"/>
      <circle cx="-40" cy="190" r="4" fill="#FFFFFF"/>
      <circle cx="-15" cy="204" r="4" fill="#FFFFFF"/>
      <circle cx="15" cy="204" r="4" fill="#FFFFFF"/>
      <circle cx="40" cy="190" r="4" fill="#FFFFFF"/>
      <circle cx="60" cy="170" r="4" fill="#FFFFFF"/>

      <!-- Top post -->
      <circle cx="0" cy="10" r="10" fill="url(#roseGold)"/>
      <circle cx="0" cy="10" r="5" fill="#FFFFFF"/>

      <!-- Floating Akoya Pearl inside center -->
      <circle cx="0" cy="110" r="44" fill="url(#pearlShine)"/>
      <circle cx="-14" cy="96" r="14" fill="#FFFFFF" fill-opacity="0.7" filter="blur(2px)"/>
    </g>

    <!-- RIGHT HOOP -->
    <g transform="translate(510, 180)">
      <circle cx="0" cy="110" r="100" stroke="url(#roseGold)" stroke-width="14" fill="none"/>
      <circle cx="-60" cy="170" r="4" fill="#FFFFFF"/>
      <circle cx="-40" cy="190" r="4" fill="#FFFFFF"/>
      <circle cx="-15" cy="204" r="4" fill="#FFFFFF"/>
      <circle cx="15" cy="204" r="4" fill="#FFFFFF"/>
      <circle cx="40" cy="190" r="4" fill="#FFFFFF"/>
      <circle cx="60" cy="170" r="4" fill="#FFFFFF"/>

      <circle cx="0" cy="10" r="10" fill="url(#roseGold)"/>
      <circle cx="0" cy="10" r="5" fill="#FFFFFF"/>

      <circle cx="0" cy="110" r="44" fill="url(#pearlShine)"/>
      <circle cx="-14" cy="96" r="14" fill="#FFFFFF" fill-opacity="0.7" filter="blur(2px)"/>
    </g>
  </g>
</svg>
`,
    generateOverlaySvg: () => `
<svg width="240" height="280" viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rg_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE6D9"/>
      <stop offset="40%" stop-color="#E8A598"/>
      <stop offset="80%" stop-color="#C27D6F"/>
      <stop offset="100%" stop-color="#F5B7B1"/>
    </linearGradient>
    <radialGradient id="prl_ov" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#FFFDF7"/>
      <stop offset="70%" stop-color="#F3E9E0"/>
      <stop offset="90%" stop-color="#DFC9BA"/>
      <stop offset="100%" stop-color="#B89B88"/>
    </radialGradient>
    <filter id="hoopDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <g filter="url(#hoopDrop)" transform="translate(120, 20)">
    <!-- Top anchor clasp -->
    <circle cx="0" cy="0" r="7" fill="url(#rg_ov)"/>
    <circle cx="0" cy="0" r="3" fill="#FFFFFF"/>

    <!-- Hoop ring -->
    <circle cx="0" cy="80" r="74" stroke="url(#rg_ov)" stroke-width="10" fill="none"/>
    <circle cx="-42" cy="126" r="3" fill="#FFFFFF"/>
    <circle cx="-25" cy="142" r="3" fill="#FFFFFF"/>
    <circle cx="0" cy="148" r="3.5" fill="#FFFFFF"/>
    <circle cx="25" cy="142" r="3" fill="#FFFFFF"/>
    <circle cx="42" cy="126" r="3" fill="#FFFFFF"/>

    <!-- Pearl suspended in center -->
    <circle cx="0" cy="80" r="32" fill="url(#prl_ov)"/>
    <circle cx="-10" cy="70" r="9" fill="#FFFFFF" fill-opacity="0.8"/>
  </g>
</svg>
`
  },
  {
    id: 'sapphire-sovereign-chandelier',
    name: 'Royal Sapphire Chandelier Earrings',
    generateCatalogSvg: () => `
<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FBF9F5"/>
      <stop offset="100%" stop-color="#E7E2D9"/>
    </radialGradient>
    <linearGradient id="whiteGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="#E2E8F0"/>
      <stop offset="70%" stop-color="#CBD5E1"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="sapphireGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="30%" stop-color="#1D4ED8"/>
      <stop offset="70%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <filter id="chShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="20" stdDeviation="26" flood-color="#000" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#sBg)"/>
  <ellipse cx="400" cy="720" rx="270" ry="24" fill="#000" fill-opacity="0.06"/>

  <g filter="url(#chShadow)">
    <!-- LEFT CHANDELIER -->
    <g transform="translate(290, 130)">
      <!-- Top post -->
      <circle cx="0" cy="0" r="16" fill="url(#whiteGold)"/>
      <circle cx="0" cy="0" r="11" fill="url(#sapphireGrad)"/>
      <circle cx="-3" cy="-3" r="3" fill="#FFFFFF"/>

      <!-- Filigree Chandelier tiers -->
      <path d="M0,16 L-40,65 L40,65 Z" fill="none" stroke="url(#whiteGold)" stroke-width="4"/>
      <circle cx="-40" cy="65" r="7" fill="url(#whiteGold)"/>
      <circle cx="0" cy="65" r="9" fill="url(#sapphireGrad)"/>
      <circle cx="40" cy="65" r="7" fill="url(#whiteGold)"/>

      <!-- Lower Tier arcs -->
      <path d="M-60,130 C-30,90 30,90 60,130" stroke="url(#whiteGold)" stroke-width="4" fill="none"/>
      
      <!-- Hanging Sapphire Drops -->
      <!-- Left drop -->
      <line x1="-50" y1="130" x2="-50" y2="175" stroke="url(#whiteGold)" stroke-width="3"/>
      <path d="M-50,175 C-62,205 -38,205 -50,175 Z" fill="url(#sapphireGrad)"/>
      <circle cx="-50" cy="195" r="3" fill="#93C5FD"/>

      <!-- Center Large Teardrop -->
      <line x1="0" y1="130" x2="0" y2="160" stroke="url(#whiteGold)" stroke-width="3"/>
      <path d="M0,160 C-22,230 22,230 0,160 Z" fill="url(#sapphireGrad)"/>
      <circle cx="0" cy="195" r="6" fill="#60A5FA"/>
      <circle cx="-4" cy="185" r="3" fill="#FFFFFF"/>

      <!-- Right drop -->
      <line x1="50" y1="130" x2="50" y2="175" stroke="url(#whiteGold)" stroke-width="3"/>
      <path d="M50,175 C38,205 62,205 50,175 Z" fill="url(#sapphireGrad)"/>
      <circle cx="50" cy="195" r="3" fill="#93C5FD"/>

      <!-- Pave diamond points -->
      <circle cx="-25" cy="100" r="3" fill="#FFFFFF"/>
      <circle cx="25" cy="100" r="3" fill="#FFFFFF"/>
      <circle cx="0" cy="100" r="4" fill="#FFFFFF"/>
    </g>

    <!-- RIGHT CHANDELIER -->
    <g transform="translate(510, 130)">
      <circle cx="0" cy="0" r="16" fill="url(#whiteGold)"/>
      <circle cx="0" cy="0" r="11" fill="url(#sapphireGrad)"/>
      <circle cx="-3" cy="-3" r="3" fill="#FFFFFF"/>

      <path d="M0,16 L-40,65 L40,65 Z" fill="none" stroke="url(#whiteGold)" stroke-width="4"/>
      <circle cx="-40" cy="65" r="7" fill="url(#whiteGold)"/>
      <circle cx="0" cy="65" r="9" fill="url(#sapphireGrad)"/>
      <circle cx="40" cy="65" r="7" fill="url(#whiteGold)"/>

      <path d="M-60,130 C-30,90 30,90 60,130" stroke="url(#whiteGold)" stroke-width="4" fill="none"/>
      
      <line x1="-50" y1="130" x2="-50" y2="175" stroke="url(#whiteGold)" stroke-width="3"/>
      <path d="M-50,175 C-62,205 -38,205 -50,175 Z" fill="url(#sapphireGrad)"/>
      <circle cx="-50" cy="195" r="3" fill="#93C5FD"/>

      <line x1="0" y1="130" x2="0" y2="160" stroke="url(#whiteGold)" stroke-width="3"/>
      <path d="M0,160 C-22,230 22,230 0,160 Z" fill="url(#sapphireGrad)"/>
      <circle cx="0" cy="195" r="6" fill="#60A5FA"/>
      <circle cx="-4" cy="185" r="3" fill="#FFFFFF"/>

      <line x1="50" y1="130" x2="50" y2="175" stroke="url(#whiteGold)" stroke-width="3"/>
      <path d="M50,175 C38,205 62,205 50,175 Z" fill="url(#sapphireGrad)"/>
      <circle cx="50" cy="195" r="3" fill="#93C5FD"/>

      <circle cx="-25" cy="100" r="3" fill="#FFFFFF"/>
      <circle cx="25" cy="100" r="3" fill="#FFFFFF"/>
      <circle cx="0" cy="100" r="4" fill="#FFFFFF"/>
    </g>
  </g>
</svg>
`,
    generateOverlaySvg: () => `
<svg width="260" height="340" viewBox="0 0 260 340" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wg_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="sap_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="30%" stop-color="#1D4ED8"/>
      <stop offset="70%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <filter id="chDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.32"/>
    </filter>
  </defs>
  <g filter="url(#chDrop)" transform="translate(130, 20)">
    <!-- Top Anchor -->
    <circle cx="0" cy="0" r="12" fill="url(#wg_ov)"/>
    <circle cx="0" cy="0" r="8" fill="url(#sap_ov)"/>
    <circle cx="-2" cy="-2" r="2.5" fill="#FFFFFF"/>

    <!-- Filigree Body -->
    <path d="M0,12 L-32,50 L32,50 Z" fill="none" stroke="url(#wg_ov)" stroke-width="3"/>
    <circle cx="-32" cy="50" r="5" fill="url(#wg_ov)"/>
    <circle cx="0" cy="50" r="7" fill="url(#sap_ov)"/>
    <circle cx="32" cy="50" r="5" fill="url(#wg_ov)"/>

    <path d="M-48,96 C-24,70 24,70 48,96" stroke="url(#wg_ov)" stroke-width="3.5" fill="none"/>
    
    <!-- 3 Drops -->
    <line x1="-38" y1="96" x2="-38" y2="130" stroke="url(#wg_ov)" stroke-width="2.5"/>
    <path d="M-38,130 C-47,155 -29,155 -38,130 Z" fill="url(#sap_ov)"/>

    <line x1="0" y1="96" x2="0" y2="120" stroke="url(#wg_ov)" stroke-width="2.5"/>
    <path d="M0,120 C-18,175 18,175 0,120 Z" fill="url(#sap_ov)"/>
    <circle cx="-3" cy="142" r="3" fill="#FFFFFF"/>

    <line x1="38" y1="96" x2="38" y2="130" stroke="url(#wg_ov)" stroke-width="2.5"/>
    <path d="M38,130 C29,155 47,155 38,130 Z" fill="url(#sap_ov)"/>

    <circle cx="0" cy="74" r="3" fill="#FFFFFF"/>
    <circle cx="-20" cy="74" r="2.5" fill="#FFFFFF"/>
    <circle cx="20" cy="74" r="2.5" fill="#FFFFFF"/>
  </g>
</svg>
`
  },
  {
    id: 'aurelia-sculpted-hoops',
    name: 'Aurelia 18K Sculpted Hoops',
    generateCatalogSvg: () => `
<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="auBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FCFAF7"/>
      <stop offset="100%" stop-color="#EEE6DA"/>
    </radialGradient>
    <linearGradient id="sculptGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF3DC"/>
      <stop offset="25%" stop-color="#F2D093"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="75%" stop-color="#AA8232"/>
      <stop offset="100%" stop-color="#EAC06E"/>
    </linearGradient>
    <filter id="auShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#auBg)"/>
  <ellipse cx="400" cy="690" rx="260" ry="22" fill="#000" fill-opacity="0.06"/>

  <g filter="url(#auShadow)">
    <!-- LEFT SCULPTED HOOP -->
    <g transform="translate(290, 200)">
      <path d="M-10,20 C-60,70 -60,170 0,220 C60,170 60,70 10,20" 
            stroke="url(#sculptGold)" stroke-width="26" stroke-linecap="round" fill="none"/>
      <!-- Inner rib facet -->
      <path d="M-5,35 C-45,80 -45,160 0,205 C45,160 45,80 5,35" 
            stroke="#FFF5E5" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.8"/>
      <!-- Clasp pin -->
      <circle cx="0" cy="20" r="10" fill="url(#sculptGold)"/>
      <circle cx="0" cy="20" r="4" fill="#FFFFFF"/>
    </g>

    <!-- RIGHT SCULPTED HOOP -->
    <g transform="translate(510, 200)">
      <path d="M-10,20 C-60,70 -60,170 0,220 C60,170 60,70 10,20" 
            stroke="url(#sculptGold)" stroke-width="26" stroke-linecap="round" fill="none"/>
      <path d="M-5,35 C-45,80 -45,160 0,205 C45,160 45,80 5,35" 
            stroke="#FFF5E5" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.8"/>
      <circle cx="0" cy="20" r="10" fill="url(#sculptGold)"/>
      <circle cx="0" cy="20" r="4" fill="#FFFFFF"/>
    </g>
  </g>
</svg>
`,
    generateOverlaySvg: () => `
<svg width="220" height="260" viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="au_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF3DC"/>
      <stop offset="25%" stop-color="#F2D093"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="75%" stop-color="#AA8232"/>
      <stop offset="100%" stop-color="#EAC06E"/>
    </linearGradient>
    <filter id="auDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.32"/>
    </filter>
  </defs>
  <g filter="url(#auDrop)" transform="translate(110, 20)">
    <!-- Clasp anchor at 110, 20 -->
    <circle cx="0" cy="0" r="7" fill="url(#au_ov)"/>
    
    <path d="M-6,10 C-46,50 -46,140 0,180 C46,140 46,50 6,10" 
          stroke="url(#au_ov)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <path d="M-3,22 C-32,58 -32,130 0,166 C32,130 32,58 3,22" 
          stroke="#FFFDF8" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8"/>
  </g>
</svg>
`
  },
  {
    id: 'ruby-scarlet-teardrops',
    name: 'Scarlet Marquise Ruby Drop Earrings',
    generateCatalogSvg: () => `
<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="rBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FCF9F7"/>
      <stop offset="100%" stop-color="#EBE2DA"/>
    </radialGradient>
    <linearGradient id="roseG2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFEBE5"/>
      <stop offset="40%" stop-color="#E5AA9C"/>
      <stop offset="80%" stop-color="#B87364"/>
      <stop offset="100%" stop-color="#EFA899"/>
    </linearGradient>
    <linearGradient id="rubyGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="30%" stop-color="#BE123C"/>
      <stop offset="70%" stop-color="#881337"/>
      <stop offset="100%" stop-color="#4C0519"/>
    </linearGradient>
    <filter id="rShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#rBg)"/>
  <ellipse cx="400" cy="710" rx="260" ry="22" fill="#000" fill-opacity="0.06"/>

  <g filter="url(#rShadow)">
    <!-- LEFT RUBY -->
    <g transform="translate(290, 160)">
      <circle cx="0" cy="0" r="14" fill="url(#roseG2)"/>
      <circle cx="0" cy="0" r="9" fill="url(#rubyGrad)"/>
      <circle cx="-3" cy="-3" r="2.5" fill="#FFFFFF"/>

      <line x1="0" y1="14" x2="0" y2="60" stroke="url(#roseG2)" stroke-width="4"/>
      <circle cx="0" cy="38" r="4" fill="#FFFFFF"/>

      <!-- Marquise halo -->
      <path d="M0,60 C-36,120 -36,170 0,230 C36,170 36,120 0,60 Z" fill="url(#roseG2)"/>
      <!-- Inner Ruby Marquise -->
      <path d="M0,70 C-28,124 -28,166 0,220 C28,166 28,124 0,70 Z" fill="url(#rubyGrad)"/>
      
      <!-- Highlights -->
      <line x1="0" y1="80" x2="0" y2="210" stroke="#FDA4AF" stroke-width="3" opacity="0.6"/>
      <ellipse cx="-8" cy="135" rx="5" ry="22" fill="#FFFFFF" fill-opacity="0.4" transform="rotate(-10 -8 135)"/>
    </g>

    <!-- RIGHT RUBY -->
    <g transform="translate(510, 160)">
      <circle cx="0" cy="0" r="14" fill="url(#roseG2)"/>
      <circle cx="0" cy="0" r="9" fill="url(#rubyGrad)"/>
      <circle cx="-3" cy="-3" r="2.5" fill="#FFFFFF"/>

      <line x1="0" y1="14" x2="0" y2="60" stroke="url(#roseG2)" stroke-width="4"/>
      <circle cx="0" cy="38" r="4" fill="#FFFFFF"/>

      <path d="M0,60 C-36,120 -36,170 0,230 C36,170 36,120 0,60 Z" fill="url(#roseG2)"/>
      <path d="M0,70 C-28,124 -28,166 0,220 C28,166 28,124 0,70 Z" fill="url(#rubyGrad)"/>
      
      <line x1="0" y1="80" x2="0" y2="210" stroke="#FDA4AF" stroke-width="3" opacity="0.6"/>
      <ellipse cx="-8" cy="135" rx="5" ry="22" fill="#FFFFFF" fill-opacity="0.4" transform="rotate(-10 -8 135)"/>
    </g>
  </g>
</svg>
`,
    generateOverlaySvg: () => `
<svg width="220" height="320" viewBox="0 0 220 320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="roseG_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFEBE5"/>
      <stop offset="40%" stop-color="#E5AA9C"/>
      <stop offset="80%" stop-color="#B87364"/>
      <stop offset="100%" stop-color="#EFA899"/>
    </linearGradient>
    <linearGradient id="rubyG_ov" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="30%" stop-color="#BE123C"/>
      <stop offset="70%" stop-color="#881337"/>
      <stop offset="100%" stop-color="#4C0519"/>
    </linearGradient>
    <filter id="rubyDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.32"/>
    </filter>
  </defs>
  <g filter="url(#rubyDrop)" transform="translate(110, 20)">
    <circle cx="0" cy="0" r="10" fill="url(#roseG_ov)"/>
    <circle cx="0" cy="0" r="6" fill="url(#rubyG_ov)"/>
    <circle cx="-2" cy="-2" r="2" fill="#FFFFFF"/>

    <line x1="0" y1="10" x2="0" y2="44" stroke="url(#roseG_ov)" stroke-width="3"/>
    <circle cx="0" cy="28" r="3" fill="#FFFFFF"/>

    <path d="M0,44 C-28,90 -28,135 0,180 C28,135 28,90 0,44 Z" fill="url(#roseG_ov)"/>
    <path d="M0,52 C-22,94 -22,130 0,172 C22,130 22,94 0,52 Z" fill="url(#rubyG_ov)"/>
    
    <line x1="0" y1="60" x2="0" y2="164" stroke="#FDA4AF" stroke-width="2.5" opacity="0.6"/>
    <ellipse cx="-6" cy="105" rx="4" ry="16" fill="#FFFFFF" fill-opacity="0.45" transform="rotate(-8 -6 105)"/>
  </g>
</svg>
`
  }
];

// Write catalog SVGs and overlay SVGs
for (const p of products) {
  const catPath = path.join(jewelryDir, `${p.id}.svg`);
  fs.writeFileSync(catPath, p.generateCatalogSvg().trim(), 'utf8');
  console.log(`Saved catalog image: ${catPath}`);

  const overPath = path.join(overlaysDir, `${p.id}.svg`);
  fs.writeFileSync(overPath, p.generateOverlaySvg().trim(), 'utf8');
  console.log(`Saved overlay asset: ${overPath}`);
}

console.log('All jewelry product graphics generated successfully!');
