'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  ExternalLink,
  CheckCircle2,
  X,
  Loader2,
  Upload,
  LogOut
} from 'lucide-react';

import {
  getJournalArticles,
  createJournalArticle,
  updateJournalArticle,
  deleteJournalArticle
} from '@/db/actions/journal';

import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty
} from '@/db/actions/properties';

import { upload3DModel } from '@/lib/uploadModel';

import OverviewTab from './components/OverviewTab';
import PropertiesTab from './components/PropertiesTab';
import JournalTab from './components/JournalTab';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const [properties, setProperties] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeModal, setActiveModal] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedModelFile, setSelectedModelFile] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Architecture',
    year: '2026',
    excerpt: '',
    content: '',
    imageUrl: ''
  });

  const [propertyForm, setPropertyForm] = useState({
    name: '',
    category: 'penthouses',
    location: '',
    price: '',
    area: '',
    description: '',
    beds: 3,
    baths: 3,
    levels: 1,
    imageUrl: '',
    modelUrl: ''
  });

  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      const [blogsRes, propsRes] = await Promise.all([
        getJournalArticles('All', true),
        getProperties('all')
      ]);

      if (isMounted) {
        if (blogsRes.success) setBlogs(blogsRes.data);
        if (propsRes.success) setProperties(propsRes.data);
        setIsBlogsLoading(false);
        setIsPropertiesLoading(false);
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const refreshBlogs = async () => {
    setIsBlogsLoading(true);
    const res = await getJournalArticles('All', true);
    if (res.success) setBlogs(res.data);
    setIsBlogsLoading(false);
  };

  const refreshProperties = async () => {
    setIsPropertiesLoading(true);
    const res = await getProperties('all');
    if (res.success) setProperties(res.data);
    setIsPropertiesLoading(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddProperty = () => {
    setEditingPropertyId(null);
    setSelectedImageFile(null);
    setSelectedModelFile(null);
    setPropertyForm({
      name: '',
      category: 'penthouses',
      location: '',
      price: '',
      area: '',
      description: '',
      beds: 3,
      baths: 3,
      levels: 1,
      imageUrl: '',
      modelUrl: ''
    });
    setActiveModal('add-property');
  };

  const handleOpenEditProperty = (prop) => {
    setEditingPropertyId(prop.id);
    setSelectedImageFile(null);
    setSelectedModelFile(null);
    setPropertyForm({
      name: prop.name || '',
      category: prop.category || 'penthouses',
      location: prop.location || '',
      price: prop.price || '',
      area: prop.area || '',
      description: prop.description || '',
      beds: prop.beds || 0,
      baths: prop.baths || 0,
      levels: prop.levels || 1,
      imageUrl: prop.imageUrl || '',
      modelUrl: prop.modelUrl || ''
    });
    setActiveModal('edit-property');
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = propertyForm.imageUrl;
      let finalModelUrl = propertyForm.modelUrl;

      // Cloudinary Signed Image Upload
      if (selectedImageFile) {
        const timestamp = Math.floor(Date.now() / 1000);
        const paramsToSign = { timestamp };

        // Sign request via server backend route
        const sigRes = await fetch('/api/sign-cloudinary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paramsToSign }),
        });
        const sigData = await sigRes.json();

        if (!sigData.signature) {
          throw new Error('Failed to obtain Cloudinary signature');
        }

        const formData = new FormData();
        formData.append('file', selectedImageFile);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append('timestamp', timestamp);
        formData.append('signature', sigData.signature);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        );
        const cloudData = await res.json();

        if (cloudData.secure_url) {
          finalImageUrl = cloudData.secure_url;
        } else {
          showToast(`Cloudinary Upload Error: ${cloudData.error?.message || 'Upload failed'}`);
          setIsSubmitting(false);
          return;
        }
      }

      // Supabase Direct 3D Model Upload (.glb/.gltf)
      if (selectedModelFile) {
        const uploadRes = await upload3DModel(selectedModelFile);
        if (uploadRes.success) {
          finalModelUrl = uploadRes.url;
        } else {
          showToast(`3D Upload Error: ${uploadRes.error}`);
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        ...propertyForm,
        imageUrl: finalImageUrl,
        modelUrl: finalModelUrl
      };

      if (editingPropertyId) {
        const res = await updateProperty(editingPropertyId, payload);
        if (res.success) {
          showToast('Residence updated successfully');
          await refreshProperties();
          setActiveModal(null);
        } else {
          showToast('Failed to update residence');
        }
      } else {
        const res = await createProperty(payload);
        if (res.success) {
          showToast(`Residence "${res.data.name}" created!`);
          await refreshProperties();
          setActiveModal(null);
        } else {
          showToast('Failed to create residence');
        }
      }
    } catch (err) {
      console.error(err);
      showToast('Error uploading assets');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this residence?')) return;

    const res = await deleteProperty(id);
    if (res.success) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      showToast('Residence deleted');
    } else {
      showToast('Failed to delete residence');
    }
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
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161822] border border-[#C5A880]/50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 size={16} className="text-[#C5A880]" />
          <span className="text-xs tracking-wider">{toastMessage}</span>
        </div>
      )}

      <header className="h-16 border-b border-white/5 bg-[#0B0D12]/95 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C5A880]/60 flex items-center justify-center bg-[#0B0D12]">
            <span className="font-serif italic text-sm text-[#C5A880]">V</span>
          </div>
          <span className="font-serif text-sm tracking-[0.2em] uppercase font-medium">VALOIS</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#C5A880] text-[10px] uppercase tracking-wider text-white/70 hover:text-white transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink size={12} />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut size={12} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-white/5 bg-[#0B0D12] p-4 flex md:flex-col shrink-0">
          <div className="space-y-1.5 w-full flex md:flex-col gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors cursor-pointer ${activeTab === 'overview'
                ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                : 'text-white/60 hover:bg-white/[0.03]'
                }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors cursor-pointer ${activeTab === 'properties'
                ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                : 'text-white/60 hover:bg-white/[0.03]'
                }`}
            >
              <Building2 size={16} />
              <span>Properties</span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs tracking-wider transition-colors cursor-pointer ${activeTab === 'blogs'
                ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                : 'text-white/60 hover:bg-white/[0.03]'
                }`}
            >
              <BookOpen size={16} />
              <span>Journal & Essays</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
          {activeTab === 'overview' && (
            <OverviewTab
              propertyCount={properties.length}
              blogCount={blogs.length}
              isPropertiesLoading={isPropertiesLoading}
              isBlogsLoading={isBlogsLoading}
              onOpenAddProperty={handleOpenAddProperty}
              onOpenAddBlog={handleOpenAddBlog}
            />
          )}

          {activeTab === 'properties' && (
            <PropertiesTab
              properties={properties}
              isLoading={isPropertiesLoading}
              onOpenAdd={handleOpenAddProperty}
              onOpenEdit={handleOpenEditProperty}
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

      {/* Modal: Property Form */}
      {(activeModal === 'add-property' || activeModal === 'edit-property') && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#12141C] border border-[#C5A880]/30 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 relative my-8">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-white/40 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>

            <h2 className="font-serif text-2xl font-light text-white">
              {editingPropertyId ? 'Edit Residence' : 'Add New Residence'}
            </h2>

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
              <input
                required
                type="text"
                placeholder="Residence Name (e.g. Aurelia Sky Residence)"
                value={propertyForm.name}
                onChange={(e) => setPropertyForm({ ...propertyForm, name: e.target.value })}
                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={propertyForm.category}
                  onChange={(e) => setPropertyForm({ ...propertyForm, category: e.target.value })}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="penthouses">Penthouses</option>
                  <option value="private-estates">Private Estates</option>
                  <option value="waterfront">Waterfront</option>
                </select>

                <input
                  required
                  type="text"
                  placeholder="Location (e.g. Gulshan-2, Dhaka)"
                  value={propertyForm.location}
                  onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="Price (e.g. $2.4M)"
                  value={propertyForm.price}
                  onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                />

                <input
                  required
                  type="text"
                  placeholder="Area (e.g. 6,400 sqft)"
                  value={propertyForm.area}
                  onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-white/40 mb-1">Beds</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={propertyForm.beds}
                    onChange={(e) => setPropertyForm({ ...propertyForm, beds: e.target.value })}
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-white/40 mb-1">Baths</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={propertyForm.baths}
                    onChange={(e) => setPropertyForm({ ...propertyForm, baths: e.target.value })}
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-white/40 mb-1">Floors</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={propertyForm.levels}
                    onChange={(e) => setPropertyForm({ ...propertyForm, levels: e.target.value })}
                    className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Cover Image Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider text-[#C5A880]">Cover Image (Cloudinary)</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImageFile(e.target.files[0])}
                    className="w-full text-xs text-white/70 bg-[#0B0D12] border border-white/10 rounded-xl p-2 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#C5A880]/20 file:text-[#C5A880] file:text-xs"
                  />
                </div>
                <input
                  type="url"
                  placeholder="Or enter image URL"
                  value={propertyForm.imageUrl}
                  onChange={(e) => setPropertyForm({ ...propertyForm, imageUrl: e.target.value })}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C5A880] text-[11px]"
                />
              </div>

              {/* 3D Model Asset Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider text-[#C5A880]">3D Model File (.glb, .gltf - Supabase)</label>
                <input
                  type="file"
                  accept=".glb,.gltf"
                  onChange={(e) => setSelectedModelFile(e.target.files[0])}
                  className="w-full text-xs text-white/70 bg-[#0B0D12] border border-white/10 rounded-xl p-2 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#C5A880]/20 file:text-[#C5A880] file:text-xs"
                />
                <input
                  type="text"
                  placeholder="Or enter direct 3D URL (.glb)"
                  value={propertyForm.modelUrl}
                  onChange={(e) => setPropertyForm({ ...propertyForm, modelUrl: e.target.value })}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C5A880] text-[11px]"
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder="Architectural Description"
                value={propertyForm.description}
                onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-white resize-none focus:outline-none focus:border-[#C5A880]"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-white/10 rounded-xl uppercase text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#C5A880] text-[#0B0D12] font-semibold rounded-xl uppercase text-xs flex items-center gap-2 hover:bg-[#F4F1EA] transition-colors cursor-pointer"
                >
                  {isSubmitting && <Loader2 className="animate-spin h-3.5 w-3.5" />}
                  <span>{editingPropertyId ? 'Save Changes' : 'Create Residence'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}