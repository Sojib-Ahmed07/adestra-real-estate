'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, MapPin, Loader2, Building2, Box, Image as ImageIcon } from 'lucide-react';
import LuxuryNavbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { getProperties } from '@/db/actions/properties';

/**
 * Extracts a valid Sketchfab embed URL whether the admin inputs a direct URL or a raw <iframe> code snippet.
 */
function extractSketchfabEmbedUrl(rawInput) {
  if (!rawInput) return null;

  // Extract 'src' value if the input contains an HTML <iframe> snippet
  const srcMatch = rawInput.match(/src=["']([^"']+)["']/i);
  let url = srcMatch ? srcMatch[1] : rawInput.trim();

  // Standardize regular Sketchfab page links into embed-ready links
  if (url.includes('sketchfab.com/3d-models/')) {
    const parts = url.split('/');
    const modelId = parts[parts.length - 1] || parts[parts.length - 2];
    url = `https://sketchfab.com/models/${modelId}/embed`;
  } else if (url.includes('sketchfab.com/models/') && !url.endsWith('/embed')) {
    url = `${url.replace(/\/$/, '')}/embed`;
  }

  return url;
}

function ResidencesContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';

  const [activeTab, setActiveTab] = useState(initialType);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewMode, setViewMode] = useState('image'); // 'image' | '3d'

  useEffect(() => {
    let isMounted = true;

    async function loadProperties() {
      setIsLoading(true);
      const res = await getProperties('all');
      if (isMounted && res.success) {
        setProperties(res.data);
        if (res.data.length > 0) {
          const matched = res.data.find((p) => p.category === initialType);
          const initialSelected = matched || res.data[0];
          setSelectedProperty(initialSelected);

          // Default to 3D mode if a model URL exists
          if (initialSelected?.modelUrl) {
            setViewMode('3d');
          }
        }
      }
      if (isMounted) setIsLoading(false);
    }

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, [initialType]);

  const filteredProperties =
    activeTab === 'all'
      ? properties
      : properties.filter((p) => p.category === activeTab);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const firstMatch =
      tab === 'all'
        ? properties[0]
        : properties.find((p) => p.category === tab);
    if (firstMatch) {
      setSelectedProperty(firstMatch);
      setViewMode(firstMatch.modelUrl ? '3d' : 'image');
    }
  };

  const handleSelectProperty = (prop) => {
    setSelectedProperty(prop);
    if (prop.modelUrl) {
      setViewMode('3d');
    } else {
      setViewMode('image');
    }
  };

  const embedUrl = selectedProperty ? extractSketchfabEmbedUrl(selectedProperty.modelUrl) : null;

  return (
    <main className="bg-[#0B0D12] min-h-screen text-[#F4F1EA] pt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {isLoading ? (
          <div className="py-32 flex flex-col items-center justify-center text-[#C5A880] space-y-4">
            <Loader2 className="animate-spin h-10 w-10" />
            <span className="text-xs uppercase tracking-widest text-white/50">
              Loading Residences Database...
            </span>
          </div>
        ) : properties.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-white/10 rounded-2xl">
            <Building2 className="mx-auto h-12 w-12 text-[#C5A880]/40 mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">
              No Residences Listed Yet
            </h3>
            <p className="text-xs text-white/40">
              Check back soon or visit the admin portal to add properties.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Pane: Controls & List */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C5A880]" />
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                    Exclusive Collection
                  </span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight leading-none mb-8">
                  Explore Our <span className="italic text-[#C5A880]">Residences</span>
                </h1>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {['all', 'penthouses', 'private-estates', 'waterfront'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all duration-300 rounded-full ${activeTab === tab
                          ? 'bg-[#C5A880] text-[#0B0D12] border-[#C5A880]'
                          : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                        }`}
                    >
                      {tab.replace('-', ' ')}
                    </button>
                  ))}
                </div>

                {/* Property List */}
                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredProperties.map((prop) => (
                    <div
                      key={prop.id}
                      onClick={() => handleSelectProperty(prop)}
                      className={`p-5 rounded-xl border transition-all duration-500 cursor-pointer flex justify-between items-center group ${selectedProperty?.id === prop.id
                          ? 'bg-[#161820] border-[#C5A880]/60 shadow-[0_4px_30px_rgba(197,168,128,0.1)]'
                          : 'border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                        }`}
                    >
                      <div>
                        <span className="text-[9px] text-[#C5A880] uppercase tracking-widest font-mono">
                          {prop.category.replace('-', ' ')}
                        </span>
                        <h3 className="text-lg font-light tracking-tight mt-1 group-hover:text-[#C5A880] transition-colors duration-300">
                          {prop.name}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-white/40 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} className="text-[#C5A880]" /> {prop.location}
                          </span>
                          <span>•</span>
                          <span>{prop.area}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-md font-semibold text-[#C5A880]">
                          {prop.price}
                        </span>
                        <span className="block text-[8px] text-white/30 uppercase mt-1 tracking-widest">
                          Select to View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Blueprint Specs */}
              {selectedProperty && (
                <div className="mt-8 pt-6 border-t border-white/5">
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-white/35 mb-4">
                    Architectural Blueprint
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <span className="block text-[8px] uppercase tracking-wider text-white/40">
                        Bedrooms
                      </span>
                      <span className="text-lg font-light text-[#C5A880]">
                        {selectedProperty.beds} Beds
                      </span>
                    </div>
                    <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <span className="block text-[8px] uppercase tracking-wider text-white/40">
                        Bathrooms
                      </span>
                      <span className="text-lg font-light text-[#C5A880]">
                        {selectedProperty.baths} Baths
                      </span>
                    </div>
                    <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <span className="block text-[8px] uppercase tracking-wider text-white/40">
                        Storeys
                      </span>
                      <span className="text-lg font-light text-[#C5A880]">
                        {selectedProperty.levels} Floors
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Pane: 3D Model / Property Image & Details */}
            {selectedProperty && (
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="relative h-[480px] w-full bg-[#0E1017] rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                  {/* Viewport Mode Toggles */}
                  <div className="absolute top-4 right-4 z-10 flex gap-1 bg-[#0B0D12]/80 backdrop-blur-md p-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => setViewMode('image')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-wider transition-all ${viewMode === 'image'
                          ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                          : 'text-white/60 hover:text-white'
                        }`}
                    >
                      <ImageIcon size={12} />
                      Photo
                    </button>
                    {embedUrl && (
                      <button
                        onClick={() => setViewMode('3d')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-wider transition-all ${viewMode === '3d'
                            ? 'bg-[#C5A880] text-[#0B0D12] font-semibold'
                            : 'text-white/60 hover:text-white'
                          }`}
                      >
                        <Box size={12} />
                        3D View
                      </button>
                    )}
                  </div>

                  {/* Render 3D Embed or Fallback Image */}
                  {viewMode === '3d' && embedUrl ? (
                    <iframe
                      title={`${selectedProperty.name} 3D Model`}
                      src={embedUrl}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      xr-spatial-tracking="true"
                      execution-while-out-of-viewport="true"
                      execution-while-not-rendered="true"
                      web-share="true"
                      allowFullScreen
                    />
                  ) : selectedProperty.imageUrl ? (
                    <img
                      src={selectedProperty.imageUrl}
                      alt={selectedProperty.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                      <Building2 className="h-16 w-16 mb-2" />
                      <span className="text-xs uppercase tracking-widest">
                        No Preview Available
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-[#141620] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start border-b border-white/5 pb-5 mb-5">
                      <div>
                        <h2 className="text-2xl font-serif font-light tracking-tight text-white mb-2">
                          {selectedProperty.name}
                        </h2>
                        <p className="text-xs text-[#C5A880] uppercase tracking-[0.2em] flex items-center gap-1.5">
                          <MapPin size={12} /> {selectedProperty.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">
                          Purchase Value
                        </span>
                        <span className="text-2xl font-serif text-[#C5A880] font-light">
                          {selectedProperty.price}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-light leading-relaxed text-white/60 mb-6">
                      {selectedProperty.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                    <div className="flex gap-6 text-xs text-white/40 font-light">
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-0.5">
                          Total Area
                        </span>
                        <span className="text-white font-medium">
                          {selectedProperty.area}
                        </span>
                      </div>
                      <div className="h-8 w-px bg-white/5" />
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-0.5">
                          Design Style
                        </span>
                        <span className="text-white font-medium">
                          Modernist restraint
                        </span>
                      </div>
                    </div>

                    <a
                      href={`/contact?property=${selectedProperty.id}`}
                      className="inline-flex items-center justify-center gap-3 bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-[0.2em] px-6 py-4 rounded-xl transition-all duration-300 hover:bg-[#F4F1EA] shadow-xl shadow-[#C5A880]/5"
                    >
                      Inquire About Property
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function ResidencesPage() {
  return (
    <>
      <LuxuryNavbar />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center text-white/50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-t-2 border-[#C5A880] rounded-full animate-spin mx-auto" />
              <span className="text-xs uppercase tracking-widest">
                Loading Portfolio...
              </span>
            </div>
          </div>
        }
      >
        <ResidencesContent />
      </Suspense>
      <Footer />
    </>
  );
}