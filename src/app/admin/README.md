# Admin Portal Manual (`src/app/admin`)

This directory houses the administrative dashboard for the **VALOIS Estates & Mansions** web platform.

---

## 📌 Simplified & Focused Architecture

* **Path:** `src/app/admin/page.jsx`
* **Route:** `/admin`
* **Scope:** 
  * Focused exclusively on **Property Management (with 3D assets)** and **Journal / Blog Publishing**.
  * No payment gateways, pricing calculations, or client inquiry/contact management (contact form submissions will route directly via EmailJS).

---

## 🎯 Active Modules

### 1. Overview
* Clean summary displaying total active residences and published blog posts.
* Quick action buttons to immediately upload a property or write a new blog post.
* Recent properties quick view.

### 2. Properties & 3D Assets Management
* **List View:** Shows all listed residences with cover image, category, location, price display, bedrooms, bathrooms, floors, and total area.
* **3D Asset Indicator:** Clearly badges whether a property has an attached custom `.glb`/`.gltf` asset or uses procedural 3D luxury geometry.
* **Actions:**
  * Preview live on `/residences?type=...`
  * Delete property.
* **"Upload Property & 3D Asset" Modal Form:**
  * Fields: Name, Category (`penthouses`, `private-estates`, `waterfront`), Location, Price Display, Area (sqft), Beds, Baths, Floors, 3D Model Asset URL (`.glb`), Cover Image URL, and Architectural Description.

### 3. Blog & Journal Publishing
* **List View:** Manage published articles with category tag, year, title, excerpt, and cover photo.
* **Actions:**
  * Preview live on `/journal`
  * Delete blog post.
* **"Write New Blog Post" Modal Form:**
  * Fields: Article Title, Category (`Architecture`, `Materials`, `Perspective`, `Places`), Year, Cover Image URL, Excerpt, and Full Article Content.
