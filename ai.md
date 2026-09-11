db/schema.js
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
  id: varchar('id', { length: 128 }).primaryKey(), // e.g. 'lume-penthouse'
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 64 }).notNull(), // 'penthouses', 'private-estates', 'waterfront'
  location: varchar('location', { length: 255 }).notNull(),
  price: varchar('price', { length: 64 }).notNull(),
  area: varchar('area', { length: 64 }).notNull(),
  description: text('description').notNull(),
  beds: integer('beds').default(0).notNull(),
  baths: integer('baths').default(0).notNull(),
  levels: integer('levels').default(1).notNull(),
  imageUrl: text('image_url'),
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

db/actions/journal.js
'use server';

import { db, journalArticles } from '@/db';
import { eq, and, desc } from 'drizzle-orm';

/**
 * Fetch all published journal articles, optionally filtered by category.
 */
export async function getJournalArticles(category = 'All') {
    try {
        const conditions = [eq(journalArticles.isPublished, true)];

        if (category && category !== 'All') {
            conditions.push(eq(journalArticles.category, category));
        }

        const data = await db
            .select()
            .from(journalArticles)
            .where(and(...conditions))
            .orderBy(desc(journalArticles.createdAt));

        return { success: true, data };
    } catch (error) {
        console.error('Failed to fetch journal articles:', error);
        return { success: false, data: [] };
    }
}

/**
 * Fetch a single published journal article by its unique slug.
 */
export async function getArticleBySlug(slug) {
    try {
        if (!slug) {
            return { success: false, data: null, error: 'Slug is required' };
        }

        const data = await db
            .select()
            .from(journalArticles)
            .where(
                and(
                    eq(journalArticles.slug, slug),
                    eq(journalArticles.isPublished, true)
                )
            )
            .limit(1);

        if (!data.length) {
            return { success: false, data: null };
        }

        return { success: true, data: data[0] };
    } catch (error) {
        console.error(`Failed to fetch article with slug "${slug}":`, error);
        return { success: false, data: null };
    }
}

admin/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,  
  Building2,
  BookOpen,
  Plus,
  Trash2,
  ExternalLink,
  MapPin,
  Box,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Eye,
  FileText
} from 'lucide-react';

// ==============================================================================
// INITIAL SEED DATA
// ==============================================================================
const INITIAL_PROPERTIES = [
  {
    id: 'lume-penthouse',
    name: 'Aurelia Sky Residence',
    category: 'penthouses',
    location: 'Gulshan-2, Dhaka',
    price: '$2.4M',
    area: '6,400 sqft',
    beds: 5,
    baths: 6,
    levels: 3,
    modelUrl: 'https://cdn.3dassets.dev/assets/13688/v1/model.glb',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90',
    description: 'An elevated penthouse marvel with private glass elevators, infinite-edge skypool, and custom Italian marble finishes.'
  },
  {
    id: 'vanguard-penthouse',
    name: 'The Crown Penthouse',
    category: 'penthouses',
    location: 'Banani, Dhaka',
    price: '$1.9M',
    area: '5,200 sqft',
    beds: 4,
    baths: 5,
    levels: 2,
    modelUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90',
    description: 'Featuring 360-degree panoramic skyline views, a private sky lounge, and double-height volume spaces.'
  },
  {
    id: 'nera-estate',
    name: 'The Obsidian Pavilion',
    category: 'private-estates',
    location: 'Purbachal Sector 4, Dhaka',
    price: '$3.8M',
    area: '12,500 sqft',
    beds: 6,
    baths: 8,
    levels: 2,
    modelUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90',
    description: 'Secluded luxury villa enclosed in lush nature. Sculpted with dark textured granite and linear water runways.'
  },
  {
    id: 'arco-waterfront',
    name: 'Maison du Lac',
    category: 'waterfront',
    location: 'Lake Crescent, Gulshan',
    price: '$5.1M',
    area: '10,200 sqft',
    beds: 5,
    baths: 7,
    levels: 3,
    modelUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90',
    description: 'An exceptional waterfront architectural masterpiece overlooking the serene lake waters.'
  }
];

const INITIAL_BLOGS = [
  {
    id: 1,
    title: 'The quiet power of natural light',
    category: 'Architecture',
    year: '2026',
    excerpt: 'How orientation, shadow and proportion transform the atmosphere of a residence.',
    content: 'Light is not merely illumination; it is the silent sculpturing agent of luxury architecture...',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90'
  },
  {
    id: 2,
    title: 'Why material matters',
    category: 'Materials',
    year: '2026',
    excerpt: 'Stone, timber and metal become more beautiful when allowed to age.',
    content: 'Natural materials possess memory. When subjected to the patina of time, limestone deepens and teak warms...',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90'
  },
  {
    id: 3,
    title: 'Designing for slower living',
    category: 'Perspective',
    year: '2025',
    excerpt: 'A considered approach to spaces that encourage pause, presence and connection.',
    content: 'In an accelerating world, the home should serve as an architectural anchor against the noise...',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90'
  }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'properties' | 'blogs'

  // Data States
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);

  // Modals
  const [activeModal, setActiveModal] = useState(null); // 'add-property' | 'add-blog'
  const [toastMessage, setToastMessage] = useState(null);

  // Property Form State
  const [propertyForm, setPropertyForm] = useState({
    name: '',
    category: 'penthouses',
    location: '',
    price: '',
    area: '',
    beds: 4,
    baths: 4,
    levels: 2,
    modelUrl: '',
    imageUrl: '',
    description: ''
  });

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Architecture',
    year: '2026',
    excerpt: '',
    content: '',
    imageUrl: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add Property
  const handleAddProperty = (e) => {
    e.preventDefault();
    const newId = propertyForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `prop-${Date.now()}`;
    const newProp = {
      ...propertyForm,
      id: newId,
      imageUrl: propertyForm.imageUrl || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90'
    };
    setProperties([newProp, ...properties]);
    setActiveModal(null);
    setPropertyForm({
      name: '',
      category: 'penthouses',
      location: '',
      price: '',
      area: '',
      beds: 4,
      baths: 4,
      levels: 2,
      modelUrl: '',
      imageUrl: '',
      description: ''
    });
    showToast(`Property "${newProp.name}" added successfully`);
  };

  const handleDeleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    showToast('Property deleted');
  };

  // Add Blog
  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      ...blogForm,
      id: Date.now(),
      imageUrl: blogForm.imageUrl || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90'
    };
    setBlogs([newBlog, ...blogs]);
    setActiveModal(null);
    setBlogForm({
      title: '',
      category: 'Architecture',
      year: '2026',
      excerpt: '',
      content: '',
      imageUrl: ''
    });
    showToast(`Blog "${newBlog.title}" published`);
  };

  const handleDeleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    showToast('Blog post deleted');
  };

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F1EA] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#090A0D]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161822] border border-[#C5A880]/50 text-[#F4F1EA] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 size={16} className="text-[#C5A880]" />
          <span className="text-xs tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-[#0B0D12]/95 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-[#C5A880]/60 flex items-center justify-center bg-[#0B0D12]">
              <span className="font-serif italic text-sm text-[#C5A880]">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm tracking-[0.2em] uppercase font-medium">VALOIS</span>
              <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#C5A880]">Studio Admin</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#C5A880] text-[10px] uppercase tracking-wider text-white/70 hover:text-white transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Simple Sidebar */}
        <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-white/5 bg-[#0B0D12] p-4 flex md:flex-col justify-between shrink-0">
          <div className="space-y-1.5 w-full flex md:flex-col overflow-x-auto gap-1">
            <p className="hidden md:block px-3 py-2 text-[8px] uppercase tracking-[0.3em] text-white/30">
              Content Management
            </p>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                  : 'text-white/60 hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors shrink-0 ${
                activeTab === 'properties'
                  ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                  : 'text-white/60 hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              <Building2 size={16} />
              <span>Properties & 3D Assets</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors shrink-0 ${
                activeTab === 'blogs'
                  ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                  : 'text-white/60 hover:bg-white/[0.03] hover:text-white'
              }`}
            >
              <BookOpen size={16} />
              <span>Blog & Articles</span>
            </button>
          </div>

          <div className="hidden md:block pt-6 border-t border-white/5">
            <p className="text-[9px] text-white/40 leading-relaxed">
              Upload properties with 3D models and publish blog essays directly to your live website.
            </p>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
          
          {/* ================================================================= */}
          {/* 1. OVERVIEW */}
          {/* ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/5 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#C5A880]">
                    <span className="h-px w-6 bg-[#C5A880]" />
                    <span className="text-[8px] uppercase tracking-[0.3em]">Studio Control</span>
                  </div>
                  <h1 className="font-serif text-3xl font-light tracking-tight">Dashboard Overview</h1>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveModal('add-property')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA] transition-colors"
                  >
                    <Plus size={14} />
                    <span>Upload Property</span>
                  </button>
                  <button
                    onClick={() => setActiveModal('add-blog')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-wider transition-colors"
                  >
                    <Plus size={14} />
                    <span>Write Blog</span>
                  </button>
                </div>
              </div>

              {/* Simple Count Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#12141C] border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Listed Residences</span>
                    <div className="font-serif text-4xl font-light text-white">{properties.length}</div>
                    <span className="text-xs text-[#C5A880] mt-1 block">Active on /residences</span>
                  </div>
                  <div className="p-3 bg-[#C5A880]/10 text-[#C5A880] rounded-xl">
                    <Building2 size={24} />
                  </div>
                </div>

                <div className="bg-[#12141C] border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Blog Articles</span>
                    <div className="font-serif text-4xl font-light text-white">{blogs.length}</div>
                    <span className="text-xs text-[#C5A880] mt-1 block">Published on /journal</span>
                  </div>
                  <div className="p-3 bg-white/5 text-white/70 rounded-xl">
                    <BookOpen size={24} />
                  </div>
                </div>
              </div>

              {/* Recent Properties Quick View */}
              <div className="bg-[#12141C] border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-serif text-lg font-light">Latest Properties</h3>
                  <button
                    onClick={() => setActiveTab('properties')}
                    className="text-xs text-[#C5A880] hover:underline uppercase tracking-wider"
                  >
                    Manage All
                  </button>
                </div>
                <div className="divide-y divide-white/5">
                  {properties.slice(0, 3).map((p) => (
                    <div key={p.id} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-medium text-white block">{p.name}</span>
                        <span className="text-[10px] text-white/40">{p.location} • {p.category}</span>
                      </div>
                      <span className="font-mono text-[#C5A880]">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 2. PROPERTIES & 3D ASSETS */}
          {/* ================================================================= */}
          {activeTab === 'properties' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/5 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#C5A880]">
                    <span className="h-px w-6 bg-[#C5A880]" />
                    <span className="text-[8px] uppercase tracking-[0.3em]">Portfolio & 3D Models</span>
                  </div>
                  <h1 className="font-serif text-3xl font-light tracking-tight">Properties & 3D Assets</h1>
                </div>

                <button
                  onClick={() => setActiveModal('add-property')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA] transition-colors"
                >
                  <Plus size={15} />
                  <span>Upload Property</span>
                </button>
              </div>

              {/* Grid of Properties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((prop) => (
                  <div key={prop.id} className="bg-[#12141C] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-black">
                        <img
                          src={prop.imageUrl}
                          alt={prop.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#0B0D12]/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-[#C5A880] border border-white/10">
                          {prop.category}
                        </div>
                        <div className="absolute top-3 right-3 bg-[#0B0D12]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-serif text-white">
                          {prop.price}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-serif text-lg font-light text-white mb-1">{prop.name}</h3>
                        <p className="text-xs text-white/50 flex items-center gap-1 mb-2">
                          <MapPin size={12} className="text-[#C5A880]" /> {prop.location}
                        </p>
                        <p className="text-xs font-light text-white/40 line-clamp-2 mb-3">
                          {prop.description}
                        </p>

                        <div className="flex gap-4 text-[10px] text-white/50 font-mono py-2 border-t border-white/5">
                          <span>{prop.beds} Beds</span>
                          <span>•</span>
                          <span>{prop.baths} Baths</span>
                          <span>•</span>
                          <span>{prop.levels} Floors</span>
                          <span>•</span>
                          <span>{prop.area}</span>
                        </div>

                        {prop.modelUrl ? (
                          <div className="mt-3 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-[10px] text-emerald-400">
                            <Box size={13} />
                            <span className="truncate">3D Model Attached (.glb)</span>
                          </div>
                        ) : (
                          <div className="mt-3 p-2 bg-white/[0.02] border border-white/5 rounded-lg flex items-center gap-2 text-[10px] text-white/40">
                            <Box size={13} />
                            <span>Procedural 3D Geometry</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex justify-between items-center border-t border-white/5">
                      <Link
                        href={`/residences?type=${prop.category}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:underline"
                      >
                        <Eye size={13} />
                        <span>Preview on Site</span>
                      </Link>

                      <button
                        onClick={() => handleDeleteProperty(prop.id)}
                        className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 3. BLOG & ARTICLES */}
          {/* ================================================================= */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/5 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#C5A880]">
                    <span className="h-px w-6 bg-[#C5A880]" />
                    <span className="text-[8px] uppercase tracking-[0.3em]">Journal Publishing</span>
                  </div>
                  <h1 className="font-serif text-3xl font-light tracking-tight">Blog & Articles</h1>
                </div>

                <button
                  onClick={() => setActiveModal('add-blog')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA] transition-colors"
                >
                  <Plus size={15} />
                  <span>Write Blog Post</span>
                </button>
              </div>

              <div className="space-y-4">
                {blogs.map((b) => (
                  <div key={b.id} className="bg-[#12141C] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div className="flex items-start gap-4">
                      {b.imageUrl && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 hidden sm:block">
                          <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-mono">{b.category}</span>
                          <span className="text-[9px] text-white/30 font-mono">{b.year}</span>
                        </div>
                        <h3 className="font-serif text-xl font-light text-white mb-2">{b.title}</h3>
                        <p className="text-xs text-white/50 leading-relaxed max-w-xl">{b.excerpt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href="/journal"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white/70 hover:text-white transition-colors"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </Link>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================================================================= */}
      {/* MODAL: ADD PROPERTY (WITH 3D ASSETS) */}
      {/* ================================================================= */}
      {activeModal === 'add-property' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#12141C] border border-[#C5A880]/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 relative my-8 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-white/40 hover:text-white"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-[8px] uppercase tracking-widest text-[#C5A880] block mb-1">New Listing</span>
              <h2 className="font-serif text-2xl font-light text-white">Upload Property & 3D Asset</h2>
            </div>

            <form onSubmit={handleAddProperty} className="space-y-4 text-xs font-light">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Property Name *</label>
                  <input
                    required
                    type="text"
                    value={propertyForm.name}
                    onChange={(e) => setPropertyForm({ ...propertyForm, name: e.target.value })}
                    placeholder="e.g. Aurelia Sky Residence"
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Category *</label>
                  <select
                    value={propertyForm.category}
                    onChange={(e) => setPropertyForm({ ...propertyForm, category: e.target.value })}
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="penthouses">Penthouses</option>
                    <option value="private-estates">Private Estates</option>
                    <option value="waterfront">Waterfront</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Location *</label>
                  <input
                    required
                    type="text"
                    value={propertyForm.location}
                    onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                    placeholder="Gulshan-2, Dhaka"
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Price Display *</label>
                  <input
                    required
                    type="text"
                    value={propertyForm.price}
                    onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                    placeholder="$2.4M"
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Area *</label>
                  <input
                    required
                    type="text"
                    value={propertyForm.area}
                    onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
                    placeholder="6,400 sqft"
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Beds</label>
                  <input
                    type="number"
                    min="1"
                    value={propertyForm.beds}
                    onChange={(e) => setPropertyForm({ ...propertyForm, beds: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Baths</label>
                  <input
                    type="number"
                    min="1"
                    value={propertyForm.baths}
                    onChange={(e) => setPropertyForm({ ...propertyForm, baths: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Floors</label>
                  <input
                    type="number"
                    min="1"
                    value={propertyForm.levels}
                    onChange={(e) => setPropertyForm({ ...propertyForm, levels: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">
                  3D Model Asset URL (.glb / .gltf) - (Optional)
                </label>
                <input
                  type="url"
                  value={propertyForm.modelUrl}
                  onChange={(e) => setPropertyForm({ ...propertyForm, modelUrl: e.target.value })}
                  placeholder="https://cdn.example.com/assets/model.glb"
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                />
                <span className="text-[9px] text-white/30 mt-1 block">
                  Leave empty to use procedural high-luxury 3D architecture automatically.
                </span>
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Cover Image URL</label>
                <input
                  type="url"
                  value={propertyForm.imageUrl}
                  onChange={(e) => setPropertyForm({ ...propertyForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={propertyForm.description}
                  onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                  placeholder="Atmosphere, Italian marble, light orientation, private amenities..."
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA]"
                >
                  Upload Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: WRITE BLOG */}
      {/* ================================================================= */}
      {activeModal === 'add-blog' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#12141C] border border-[#C5A880]/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 relative my-8 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-white/40 hover:text-white"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-[8px] uppercase tracking-widest text-[#C5A880] block mb-1">Journal Entry</span>
              <h2 className="font-serif text-2xl font-light text-white">Write New Blog Post</h2>
            </div>

            <form onSubmit={handleAddBlog} className="space-y-4 text-xs font-light">
              <div>
                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Article Title *</label>
                <input
                  required
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. In praise of architectural restraint"
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Category *</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Architecture">Architecture</option>
                    <option value="Materials">Materials</option>
                    <option value="Perspective">Perspective</option>
                    <option value="Places">Places</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Year *</label>
                  <input
                    required
                    type="text"
                    value={blogForm.year}
                    onChange={(e) => setBlogForm({ ...blogForm, year: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Cover Image URL</label>
                <input
                  type="url"
                  value={blogForm.imageUrl}
                  onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Excerpt / Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="Brief 1-2 sentence preview..."
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>

              <div>
                <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-1.5">Article Content *</label>
                <textarea
                  required
                  rows={4}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Full text of the essay or article..."
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA]"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

