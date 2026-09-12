import { pgTable, serial, text, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

// ==============================================================================
// INQUIRIES & CLIENT LEADS TABLE
// ==============================================================================
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 64 }),
  propertyId: varchar('property_id', { length: 128 }),
  message: text('message'),
  status: varchar('status', { length: 32 }).default('new').notNull(), // 'new', 'in-review', 'contacted', 'archived'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==============================================================================
// PROPERTIES & RESIDENCES TABLE
// ==============================================================================
export const properties = pgTable('properties', {
  id: varchar('id', { length: 128 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 64 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  price: varchar('price', { length: 64 }).notNull(),
  area: varchar('area', { length: 64 }).notNull(),
  description: text('description').notNull(),
  beds: integer('beds').default(0).notNull(),
  baths: integer('baths').default(0).notNull(),
  levels: integer('levels').default(1).notNull(),
  imageUrl: text('image_url'),
  modelUrl: text('model_url'), // <--- ADD THIS FIELD (e.g. "https://sketchfab.com/models/8b31e163cccd4bafbdf186b6d26d283a/embed")
  isFeatured: boolean('is_featured').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==============================================================================
// DEVELOPMENTS TABLE (3D Models & Showcases)
// ==============================================================================
export const developments = pgTable('developments', {
  id: varchar('id', { length: 128 }).primaryKey(), // e.g. '01', 'the-arcline'
  name: varchar('name', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  type: varchar('type', { length: 128 }).notNull(),
  status: varchar('status', { length: 64 }).default('In Development').notNull(),
  modelUrl: text('model_url'), // Remote GLB/GLTF asset URL
  visionTitle: varchar('vision_title', { length: 255 }),
  visionText: text('vision_text'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==============================================================================
// JOURNAL ARTICLES & ESSAYS TABLE
// ==============================================================================
export const journalArticles = pgTable('journal_articles', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 64 }).notNull(), // 'Architecture', 'Materials', 'Perspective', 'Places'
  year: varchar('year', { length: 16 }).notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content'),
  imageUrl: text('image_url'),
  size: varchar('size', { length: 16 }).default('small').notNull(), // 'large', 'small'
  isPublished: boolean('is_published').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
