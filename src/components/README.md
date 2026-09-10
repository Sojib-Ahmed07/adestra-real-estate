# Components Directory Overview (`src/components`)

This directory houses all reusable UI components, animation wrappers, and 3D scenes.

---

## Directory Organization

```
src/components/
├── landing/            # Landing page sections & navigation
│   ├── Navbar.jsx      # Sticky header with blurred backdrop & mega menu
│   ├── Hero.jsx        # Pinned 250vh video background with scrubbed typography
│   ├── Introduction.jsx# Warm cream section with clip-path reveal & parallax
│   ├── ResidencesLanding.jsx # Selected residences slider with automated timers
│   ├── VisionSection.jsx# Architectural perspective with line reveals
│   ├── Footer.jsx      # Obsidian footer with links and back-to-top button
│   └── README.md       # Detailed guide to landing animations & customizing components
└── developments/       # 3D WebGL and Three.js components
    ├── DevelopmentScene.jsx # R3F Canvas container, lights, shadows & camera math
    ├── DevelopmentModel.jsx # Dynamic GLTF loader, auto-scaling & materials
    └── README.md       # Detailed guide to 3D math, lighting, and model setup
```

---

## Component Engineering Guidelines

1. **Client vs. Server Components:**
   * Components using GSAP, Three.js, event listeners, or React state (`useState`, `useEffect`, `useRef`) must declare `'use client';` at the very top.
2. **Animation Cleanup:**
   * Always encapsulate GSAP tweens and ScrollTriggers inside `gsap.context()` to prevent memory leaks and duplicate tweens on hot-reloads.
3. **Asset Handling:**
   * High-resolution imagery uses Unsplash architectural photography with specific dimensions and quality parameters (`auto=format&fit=crop&q=90`).
   * For video assets, ensure `autoPlay`, `muted`, `loop`, `playsInline`, and `preload="auto"` are applied for smooth cross-browser mobile playback.
