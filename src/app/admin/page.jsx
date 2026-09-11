'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  X,
  Loader2
} from 'lucide-react';

import {
  getJournalArticles,
  createJournalArticle,
  updateJournalArticle,
  deleteJournalArticle
} from '@/db/actions/journal';

import OverviewTab from './components/OverviewTab';
import PropertiesTab from './components/PropertiesTab';
import JournalTab from './components/JournalTab';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Clean empty state with zero dummy data
  const [properties, setProperties] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeModal, setActiveModal] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Architecture',
    year: '2026',
    excerpt: '',
    content: '',
    imageUrl: ''
  });

  // Fixed useEffect lifecycle (avoids synchronous setState call warning)
  useEffect(() => {
    let isMounted = true;

    async function loadInitialBlogs() {
      const res = await getJournalArticles('All', true);
      if (isMounted) {
        if (res.success) {
          setBlogs(res.data);
        }
        setIsBlogsLoading(false);
      }
    }

    loadInitialBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Imperative re-fetcher for CRUD mutations
  const refreshBlogs = async () => {
    setIsBlogsLoading(true);
    const res = await getJournalArticles('All', true);
    if (res.success) {
      setBlogs(res.data);
    }
    setIsBlogsLoading(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast('Property deleted');
  };

  const handleOpenAddBlog = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: '',
      category: 'Architecture',
      year: new Date().getFullYear().toString(),
      excerpt: '',
      content: '',
      imageUrl: ''
    });
    setActiveModal('add-blog');
  };

  const handleOpenEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title || '',
      category: blog.category || 'Architecture',
      year: blog.year || new Date().getFullYear().toString(),
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      imageUrl: blog.imageUrl || ''
    });
    setActiveModal('edit-blog');
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingBlogId) {
      const res = await updateJournalArticle(editingBlogId, blogForm);
      if (res.success) {
        showToast('Article updated successfully');
        await refreshBlogs();
        setActiveModal(null);
      } else {
        showToast('Failed to update article');
      }
    } else {
      const res = await createJournalArticle(blogForm);
      if (res.success) {
        showToast(`Article "${res.data.title}" published!`);
        await refreshBlogs();
        setActiveModal(null);
      } else {
        showToast('Failed to create article');
      }
    }

    setIsSubmitting(false);
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    const res = await deleteJournalArticle(id);
    if (res.success) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      showToast('Article deleted');
    } else {
      showToast('Failed to delete article');
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0D] text-[#F4F1EA] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161822] border border-[#C5A880]/50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 size={16} className="text-[#C5A880]" />
          <span className="text-xs tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-[#0B0D12]/95 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C5A880]/60 flex items-center justify-center bg-[#0B0D12]">
            <span className="font-serif italic text-sm text-[#C5A880]">V</span>
          </div>
          <span className="font-serif text-sm tracking-[0.2em] uppercase font-medium">VALOIS</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#C5A880] text-[10px] uppercase tracking-wider text-white/70 hover:text-white transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink size={12} />
        </Link>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-white/5 bg-[#0B0D12] p-4 flex md:flex-col shrink-0">
          <div className="space-y-1.5 w-full flex md:flex-col gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors ${activeTab === 'overview'
                  ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                  : 'text-white/60 hover:bg-white/[0.03]'
                }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors ${activeTab === 'properties'
                  ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                  : 'text-white/60 hover:bg-white/[0.03]'
                }`}
            >
              <Building2 size={16} />
              <span>Properties</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors ${activeTab === 'blogs'
                  ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                  : 'text-white/60 hover:bg-white/[0.03]'
                }`}
            >
              <BookOpen size={16} />
              <span>Journal & Essays</span>
            </button>
          </div>
        </aside>

        {/* Tab Components */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
          {activeTab === 'overview' && (
            <OverviewTab
              propertyCount={properties.length}
              blogCount={blogs.length}
              isBlogsLoading={isBlogsLoading}
              onOpenAddBlog={handleOpenAddBlog}
            />
          )}

          {activeTab === 'properties' && (
            <PropertiesTab
              properties={properties}
              onDeleteProperty={handleDeleteProperty}
            />
          )}

          {activeTab === 'blogs' && (
            <JournalTab
              blogs={blogs}
              isLoading={isBlogsLoading}
              onOpenAdd={handleOpenAddBlog}
              onOpenEdit={handleOpenEditBlog}
              onDelete={handleDeleteBlog}
            />
          )}
        </main>
      </div>

      {/* Modal: Article Form */}
      {(activeModal === 'add-blog' || activeModal === 'edit-blog') && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12141C] border border-[#C5A880]/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 relative my-8">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-white/40 hover:text-white"
            >
              <X size={18} />
            </button>

            <h2 className="font-serif text-2xl font-light text-white">
              {editingBlogId ? 'Edit Article' : 'Write New Article'}
            </h2>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <input
                required
                type="text"
                placeholder="Title"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Architecture">Architecture</option>
                  <option value="Materials">Materials</option>
                  <option value="Perspective">Perspective</option>
                  <option value="Places">Places</option>
                </select>

                <input
                  required
                  type="text"
                  placeholder="Year"
                  value={blogForm.year}
                  onChange={(e) => setBlogForm({ ...blogForm, year: e.target.value })}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <input
                type="url"
                placeholder="Cover Image URL"
                value={blogForm.imageUrl}
                onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
              />

              <textarea
                required
                rows={2}
                placeholder="Excerpt"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white resize-none focus:outline-none focus:border-[#C5A880]"
              />

              <textarea
                required
                rows={4}
                placeholder="Content"
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white resize-none focus:outline-none focus:border-[#C5A880]"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-white/10 rounded-xl uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#C5A880] text-[#0B0D12] font-semibold rounded-xl uppercase text-xs flex items-center gap-2 hover:bg-[#F4F1EA] transition-colors"
                >
                  {isSubmitting && <Loader2 className="animate-spin h-3.5 w-3.5" />}
                  <span>{editingBlogId ? 'Save Changes' : 'Publish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}