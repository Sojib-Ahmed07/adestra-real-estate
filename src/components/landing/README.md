# Landing Components Guide (`src/components/landing`)

This directory contains the modular sections that assemble the flagship landing page experience.

---

## 1. `Navbar.jsx` (Luxury Header)

* **Scroll Reaction:** Tracks `window.scrollY > 30` to toggle between:
  * **Top of page:** Transparent gradient `bg-gradient-to-b from-[#0B0D12]/90 via-[#0B0D12]/40 to-transparent`, `py-6`.
  * **Scrolled:** High-blur glassmorphism `bg-[#0B0D12]/80 backdrop-blur-xl border-b border-[#F4F1EA]/10 shadow-2xl`, `py-3`.
* **Mega Menu Dropdown:** Hovering over "Residences" reveals a floating glass panel with sub-categories (Penthouses, Private Estates, Waterfront) linking directly to `/residences?type=...`.
* **Mobile Drawer:** Fullscreen modal with blur backdrop and quick contact hotline.

---

## 2. `Hero.jsx` (250vh Scrubbed Video Hero)

* **Height & Pinning:** Outer container is `250vh`. Viewport element is `sticky top-0 h-screen overflow-hidden`.
* **Video Background:** High-definition architectural video hosted on Pexels/CDN, configured with `autoPlay`, `muted`, `loop`, `playsInline`.
* **Timeline Mechanics:**
  * Uses GSAP `ScrollTrigger` with `scrub: 1.5`.
  * Multi-scene progression (`scenes` array):
    1. *"A new way to live — Live beautifully."*
    2. *"Architecture with purpose — Made for living."*
    3. *"Find somewhere extraordinary — Find your place."*
  * Uses encapsulated helper functions `sceneIn(scene)` and `sceneOut(scene)` to coordinate:
    * Eyebrow label y-offset (`0.22s`)
    * Heading lines staggered upward (`0.48s`, `stagger: 0.09`)
    * Description paragraph fade (`0.3s`)
    * Action button reveal (`0.28s`)

### Customizing the Hero:
Edit the `scenes` array in `Hero.jsx`:
```javascript
const scenes = [
  {
    eyebrow: 'Your Eyebrow Text',
    lines: ['First Line', 'Second Line'],
    description: 'Description text goes here...',
    button: 'Button Label' // or null
  },
  // ...
];
```

---

## 3. `Introduction.jsx` (Editorial Linen Transition)

* **Visual Contrast:** Seamless background transition to warm French linen (`#E8E4DB`) with dark charcoal typography (`#11120F`).
* **Animations:**
  * **Heading Reveal:** `yPercent: 100 -> 0` masked with `overflow-hidden`.
  * **Image Clip-Path Expansion:** `clipPath: 'inset(12% 12% 12% 12%)' -> inset(0% 0% 0% 0%)` as the user scrolls into view.
  * **Image Parallax:** Inner `<img>` scrolls with `yPercent: -8` for subtle depth.

---

## 4. `ResidencesLanding.jsx` (Curated Property Carousel)

* **Features:**
  * Auto-advance timer using `gsap.delayedCall(3, ...)`. Pauses automatically on user hover.
  * Directional animation logic: Text and images shift up or down depending on next/prev navigation.
  * Active progress bar tracking slide percentage (`${((next + 1) / RESIDENCES.length) * 100}%`).
  * Concurrency guard via `busyRef.current = true` to prevent animation collisions on fast clicks.
* **Data Customization:**
  Edit the `RESIDENCES` array to change properties shown on the landing page:
  ```javascript
  const RESIDENCES = [
    {
      number: '01',
      name: 'Casa Lume',
      location: 'Scottsdale, Arizona',
      type: 'Desert Estate',
      image: 'https://images.unsplash.com/...',
    },
    // ...
  ];
  ```

---

## 5. `VisionSection.jsx` (Studio Perspective)

* **Layout:** Grid with large display statement (`Space is not enough. What matters is what a place makes you feel.`).
* **Key Effects:**
  * Horizontal line growth: `scaleX: 0 -> 1` with `transformOrigin: 'left center'`.
  * Subtle 3-column background architectural grid guidelines (`opacity-[0.035]`).
  * Image scale down from `1.18 -> 1.0` with dynamic inset clipping.

---

## 6. `Footer.jsx` (Luxury Dark Obsidian Footer)

* **Aesthetics:** Deep `#090A0D` background featuring a massive, subtle background watermark text (`FORM`) at `27vw` font size with `text-white/[0.018]`.
* **Features:**
  * Direct inquiry email link (`mailto:...`).
  * Navigation links to internal sections and social media channels.
  * Smooth Back to Top button: triggers `window.scrollTo({ top: 0, behavior: 'smooth' })`.
