# Routing & Pages Guide (`src/app`)

This document explains every page route in the Next.js App Router, detailing its purpose, query parameters, state management, and how to safely edit and extend each view.

---

## Route Overview Map

| Route | File Path | Client/Server | Key Features |
| :--- | :--- | :--- | :--- |
| **`/`** | `src/app/page.jsx` | Server (renders client parts) | Landing page: Navbar, Hero (250vh video scrub), Intro, Slider, Vision, Footer |
| **`/developments`** | `src/app/developments/page.jsx` | Client (`'use client'`) | 320vh scroll-scrubbed 3D model viewer with dynamic camera interpolation |
| **`/residences`** | `src/app/residences/page.jsx` | Client (`'use client'`) | Interactive catalog + live R3F 3D procedural building viewer + OrbitControls |
| **`/about`** | `src/app/about/page.jsx` | Client (`'use client'`) | Studio philosophy & 4-principle architectural manifesto |
| **`/journal`** | `src/app/journal/page.jsx` | Client (`'use client'`) | Magazine editorial feed with interactive category filters |
| **`/contact`** | `src/app/contact/page.jsx` | Client (`'use client'`) | Concierge consultation form with pre-populated property inquiry sync |
| **`/admin`** | `src/app/admin/page.jsx` | Client / Server | Admin dashboard portal (Planned/In Development) |

---

## Route Deep Dives

### 1. Landing Page (`/` - `src/app/page.jsx`)
* **Role:** Primary portal welcoming visitors, setting the luxury tone and architectural prestige.
* **Component Pipeline:**
  1. `<LuxuryNavbar />`
  2. `<HeroSection />`
  3. `<Introduction />`
  4. `<RecipientSection />` (`ResidencesLanding.jsx`)
  5. `<VisionSection />`
  6. `<Footer />`
* **Customization:**
  * To change the section order or add a new section, simply re-arrange the component list inside `Home()` in `src/app/page.jsx`.

---

### 2. Developments Page (`/developments` - `src/app/developments/page.jsx`)
* **Role:** Interactive showcase for flagship architectural developments (e.g. "The Arcline").
* **Scroll Mechanics:**
  * Container height is `320vh` (`data-development-scroll`).
  * Pinned viewport contains `<DevelopmentScene model={development.model} progressRef={progressRef} />`.
  * `progressRef.current` tracks scroll completion `0.0 -> 1.0` and passes it to the R3F render loop.
* **Data Schema:**
  ```javascript
  const DEVELOPMENTS = [
    {
      id: '01',
      name: 'The Arcline',
      location: 'Gulshan, Dhaka',
      type: 'Private Residences',
      status: 'In Development',
      model: 'https://cdn.3dassets.dev/assets/13688/v1/model.glb', // GLTF/GLB asset
    },
  ];
  ```
* **How to Add a Development:** Add an entry to the `DEVELOPMENTS` array. If multiple developments are supported, add a switcher/tabs to update the active item.

---

### 3. Residences Page (`/residences` - `src/app/residences/page.jsx`)
* **Role:** Complete inventory of residences (penthouses, private estates, waterfront properties).
* **URL Search Params:**
  * `?type=penthouses`
  * `?type=private-estates`
  * `?type=waterfront`
  * `?type=all`
* **Features:**
  * Dual-column layout (5-column list & technical specs, 7-column interactive 3D WebGL viewport).
  * 3D procedural generator (`ArchitecturalModel`) automatically switches structure based on `category`.
  * Allows free user exploration via Three.js `OrbitControls` (pan disabled, angle clamped).
* **Data Schema:**
  ```javascript
  {
    id: 'lume-penthouse',
    name: 'Aurelia Sky Residence',
    category: 'penthouses', // 'penthouses' | 'private-estates' | 'waterfront'
    location: 'Gulshan-2, Dhaka',
    price: '$2.4M',
    area: '6,400 sqft',
    description: '...',
    specs: { beds: 5, baths: 6, levels: 3 }
  }
  ```

---

### 4. About Page (`/about` - `src/app/about/page.jsx`)
* **Role:** Studio pedigree, architectural manifesto, and core values.
* **Sections:**
  * Hero statement with staggered reveal.
  * Studio story (*"Architecture with a quieter ambition"*).
  * High-res imagery showcase.
  * Philosophy section (*"Less noise. More meaning."*).
  * Four Core Principles (*Place, Proportion, Material, Experience*).
  * Closing conversation CTA.

---

### 5. Journal Page (`/journal` - `src/app/journal/page.jsx`)
* **Role:** Editorial magazine containing architecture essays, design critiques, and material studies.
* **State & Filtering:**
  * `filter` state: `'All' | 'Architecture' | 'Materials' | 'Perspective' | 'Places'`.
  * Dynamic filtering re-triggers GSAP entrance animation safely with `[filter]` dependency in `useEffect`.
* **Data Schema:**
  ```javascript
  {
    id: 1,
    category: 'Architecture',
    year: '2026',
    title: 'The quiet power of natural light',
    excerpt: 'How orientation, shadow and proportion transform the atmosphere...',
    image: 'https://images.unsplash.com/...',
    size: 'large' | 'small'
  }
  ```

---

### 6. Contact Page (`/contact` - `src/app/contact/page.jsx`)
* **Role:** Private consultation booking and client lead capture.
* **URL Search Params:**
  * `?property=lume-penthouse` -> Automatically pre-selects "Aurelia Sky Residence (Penthouse)" in the property dropdown.
* **Form Fields:** Full Name, Email, Phone Number, Property of Interest, Custom Requirements.
* **Form Feedback:** Displays a high-end success confirmation screen with a "Send Another Message" option.

---

### 7. Admin Portal (`/admin` - `src/app/admin/page.jsx`)
* **Status:** Initialized in git commit `0aec2ac`, currently pending implementation.
* See [**`src/app/admin/README.md`**](file:///E:/projects/adestra-real-estate/src/app/admin/README.md) for full roadmap, proposed schema, and features.
