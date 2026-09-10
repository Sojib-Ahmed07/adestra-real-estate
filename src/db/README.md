# Database Layer (Drizzle ORM + Neon PostgreSQL)

This directory contains the database client configuration and schema definitions for the **VALOIS Estates & Mansions** platform using **Drizzle ORM** and **Neon Serverless PostgreSQL**.

---

## 📁 Directory Structure

```
src/db/
├── index.js      # Safe lazy client initialization with @neondatabase/serverless & Drizzle
├── schema.js     # PostgreSQL tables (inquiries, properties, developments, journalArticles)
└── README.md     # This manual
```

---

## 🚀 Quick Setup & Workflow

### 1. Configure Environment
Paste your Neon PostgreSQL connection string into `.env.local`:
```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint-pooler].neon.tech/neondb?sslmode=require"
```

### 2. Push Schema to Neon (Direct Sync)
To instantly sync your tables to your Neon cloud database without tracking migration files:
```bash
npm run db:push
```

### 3. Generate & Apply Migrations (Versioned Migrations)
To generate SQL migration files inside the `/drizzle` folder and execute them:
```bash
npm run db:generate
npm run db:migrate
```

### 4. Launch Drizzle Studio (Visual Database GUI)
Browse and edit your Neon tables visually in your browser:
```bash
npm run db:studio
```

---

## 🗄️ Schema Summary (`src/db/schema.js`)

1. **`inquiries`**: Client consultation requests submitted via `/contact`.
   * Columns: `id`, `name`, `email`, `phone`, `property_id`, `message`, `status`, `created_at`, `updated_at`.
2. **`properties`**: Real estate listings displayed on `/residences`.
   * Columns: `id`, `name`, `category` (`penthouses` \| `private-estates` \| `waterfront`), `location`, `price`, `area`, `description`, `beds`, `baths`, `levels`, `image_url`, `is_featured`, timestamps.
3. **`developments`**: 3D architectural showcases featured on `/developments`.
   * Columns: `id`, `name`, `location`, `type`, `status`, `model_url`, `vision_title`, `vision_text`, timestamps.
4. **`journalArticles`**: Editorial magazine articles featured on `/journal`.
   * Columns: `id`, `slug`, `title`, `category`, `year`, `excerpt`, `content`, `image_url`, `size`, `is_published`, timestamps.

---

## 💻 Querying the Database in Next.js

Import `db` and the schema directly into your Server Components, Server Actions, or Route Handlers:

```javascript
import { db, inquiries, properties } from '@/db';
import { eq, desc } from 'drizzle-orm';

// Fetch all properties
export async function getProperties() {
  return await db.select().from(properties);
}

// Insert a contact inquiry
export async function createInquiry(data) {
  return await db.insert(inquiries).values({
    name: data.name,
    email: data.email,
    phone: data.phone,
    propertyId: data.property,
    message: data.message,
  }).returning();
}
```
