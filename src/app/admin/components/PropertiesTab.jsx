// src/app/admin/components/PropertiesTab.jsx
'use client';

import React from 'react';
import { Building2, Edit2, Trash2, Plus, MapPin } from 'lucide-react';
import ModelViewer from '@/components/ModelViewer';

export default function PropertiesTab({
    properties,
    isLoading,
    onOpenAdd,
    onOpenEdit,
    onDeleteProperty
}) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-serif text-3xl font-light text-white">Residences</h1>
                    <p className="text-xs text-white/50 mt-1">
                        Manage your high-end portfolio properties and 3D architectural assets
                    </p>
                </div>

                <button
                    onClick={onOpenAdd}
                    className="px-4 py-2.5 bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center gap-2 hover:bg-[#F4F1EA] transition-colors cursor-pointer"
                >
                    <Plus size={16} />
                    <span>Add Residence</span>
                </button>
            </div>

            {isLoading ? (
                <div className="py-20 text-center text-white/40 text-xs">
                    Loading properties...
                </div>
            ) : properties.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl">
                    <Building2 className="mx-auto h-10 w-10 text-white/20 mb-3" />
                    <p className="text-sm text-white/60">No properties found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="bg-[#12141C] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between"
                        >
                            <div>
                                {/* Pure Native React Three Fiber Viewport */}
                                <div className="h-56 w-full bg-[#0E1017] relative border-b border-white/5 overflow-hidden">
                                    {property.modelUrl ? (
                                        <ModelViewer src={property.modelUrl} height="h-full" />
                                    ) : property.imageUrl ? (
                                        <img
                                            src={property.imageUrl}
                                            alt={property.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                                            <Building2 size={32} className="mb-2" />
                                            <span className="text-[10px] uppercase tracking-widest">
                                                No Preview Available
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Residence Info */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-mono">
                                            {property.category?.replace('-', ' ')}
                                        </span>
                                        <span className="text-sm font-semibold text-[#C5A880]">
                                            {property.price}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-serif text-white font-light">
                                        {property.name}
                                    </h3>

                                    <p className="text-xs text-white/40 flex items-center gap-1.5 mt-1">
                                        <MapPin size={12} className="text-[#C5A880]" />
                                        {property.location}
                                    </p>

                                    <p className="text-xs text-white/60 line-clamp-2 mt-3 font-light leading-relaxed">
                                        {property.description}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="px-5 py-4 border-t border-white/5 bg-[#0B0D12]/40 flex justify-between items-center text-xs">
                                <div className="flex gap-3 text-white/40 text-[11px]">
                                    <span>{property.beds} Beds</span>
                                    <span>•</span>
                                    <span>{property.baths} Baths</span>
                                    <span>•</span>
                                    <span>{property.area}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onOpenEdit(property)}
                                        className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                                        title="Edit"
                                    >
                                        <Edit2 size={15} />
                                    </button>
                                    <button
                                        onClick={() => onDeleteProperty(property.id)}
                                        className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}