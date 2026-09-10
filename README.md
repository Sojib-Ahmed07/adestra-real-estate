# VALOIS Estates & Mansions (Adestra Real Estate)

An ultra-luxury architectural real estate web application blending high-end editorial aesthetics with immersive 3D/WebGL experiences and GSAP-driven scroll choreography.

---

## 🏛️ Quick Project Overview

* **Brand Concept:** High-end architectural studio & luxury residential portfolio (Penthouses, Private Estates, Waterfront Villas).
* **Aesthetics:** Dark obsidian luxury themes (`#0B0D12`, `#090A0D`), Champagne gold accents (`#C5A880`, `#9A8060`), and warm limestone/linen editorial sections (`#E8E4DB`, `#F4F1EA`).
* **Core Technologies:**
  * **Framework:** Next.js 16.3.4 (App Router) + React 19.2.8
  * **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
  * **Motion & Animation:** GSAP 3.15 + `@gsap/react` + `ScrollTrigger`
  * **3D & WebGL:** Three.js 0.186 + `@react-three/fiber` (R3F) + `@react-three/drei`
  * **Smooth Scroll:** Lenis (`lenis` 1.3.26)
  * **Icons:** `lucide-react`

---

## 📁 Repository Structure

```
adestra-real-estate/
├── ARCHITECTURE.md                  # Comprehensive technical & design system manual
├── README.md                        # Project entry point & quick reference
├── package.json                     # Dependencies & scripts
├── public/                          # Static SVG & graphic assets
└── src/
    ├── app/
    │   ├── ROUTING_AND_PAGES.md     # Route-by-route guide, params & page logic
    │   ├── layout.jsx               # Root layout with Geist font loading
    │   ├── globals.css              # Tailwind v4 import & custom CSS variables
    │   ├── page.jsx                 # Landing page assembling modular sections
    │   ├── developments/
    │   │   └── page.jsx             # 3D interactive model scrubbed showcase (320vh)
    │   ├── residences/
    │   │   └── page.jsx             # Filterable catalog + procedural 3D visualizer
    │   ├── about/
    │   │   └── page.jsx             # Studio philosophy & 4 core design principles
    │   ├── journal/
    │   │   └── page.jsx             # Magazine editorial articles with category filters
    │   ├── contact/
    │   │   └── page.jsx             # Private consultation booking & lead inquiry form
    │   └── admin/
    │       ├── README.md            # Planned admin dashboard blueprint
    │       └── page.jsx             # Admin dashboard entry point
    └── components/
        ├── README.md                # Component organization guide
        ├── landing/
        │   ├── README.md            # Detailed landing components & GSAP animation guide
        │   ├── Navbar.jsx           # Dynamic blurred header, mega-dropdown, mobile drawer
        │   ├── Hero.jsx             # Pinned 250vh video hero with 3-scene scrub timeline
        │   ├── Introduction.jsx     # Warm linen parallax image & clip-path reveal
        │   ├── ResidencesLanding.jsx# Curated residence slider with auto-timer & progress
        │   ├── VisionSection.jsx    # Editorial split quote with line growth & image scrub
        │   └── Footer.jsx           # Dark luxury footer with back-to-top & navigation
        └── developments/
            ├── README.md            # 3D WebGL camera choreography & model loading guide
            ├── DevelopmentScene.jsx # Three.js Canvas, lighting, shadows & scroll lerp
            └── DevelopmentModel.jsx # GLTF loader, auto-scaling, material normalization
```

---

## 🎨 Design System & Color Reference

| Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Basalt / Obsidian** | `#0B0D12` / `#090A0D` | Primary dark backgrounds, 3D Canvas backgrounds |
| **Champagne Gold** | `#C5A880` | Primary accent, active tabs, buttons, badge borders |
| **Bronze / Muted Gold** | `#9A8060` | Secondary accent, section eyebrow lines, numbers |
| **Warm Linen / Limestone** | `#E8E4DB` | Editorial contrast sections, card containers |
| **Alabaster White** | `#F4F1EA` | Primary body text on dark backgrounds |
| **Charcoal Ink** | `#11120F` | Body text on linen/light sections |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

### 4. Lint Check
```bash
npm run lint
```

---

## 📖 In-Depth Documentation Links

* [ARCHITECTURE.md](file:///E:/projects/adestra-real-estate/ARCHITECTURE.md) - Deep dive into GSAP conventions, 3D math, and design rules.
* [src/app/ROUTING_AND_PAGES.md](file:///E:/projects/adestra-real-estate/src/app/ROUTING_AND_PAGES.md) - Comprehensive route guide & data specs.
* [src/components/landing/README.md](file:///E:/projects/adestra-real-estate/src/components/landing/README.md) - Breakdown of all landing page components.
* [src/components/developments/README.md](file:///E:/projects/adestra-real-estate/src/components/developments/README.md) - Three.js WebGL and R3F documentation.
* [src/app/admin/README.md](file:///E:/projects/adestra-real-estate/src/app/admin/README.md) - Admin portal roadmap and schema plans.
