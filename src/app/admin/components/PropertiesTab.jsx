'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Trash2, Plus, Edit2, Loader2, Eye } from 'lucide-react';

export default function PropertiesTab({
    properties,
    isLoading,
    onOpenAdd,
    onOpenEdit,
    onDeleteProperty
}) {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/5 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-[#C5A880]">
                        <span className="h-px w-6 bg-[#C5A880]" />
                        <span className="text-[8px] uppercase tracking-[0.3em]">Portfolio & 3D Assets</span>
                    </div>
                    <h1 className="font-serif text-3xl font-light tracking-tight">Properties & 3D Assets</h1>
                </div>

                <button
                    onClick={onOpenAdd}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA] transition-colors"
                >
                    <Plus size={15} />
                    <span>Create Residence</span>
                </button>
            </div>

            {isLoading ? (
                <div className="py-20 flex justify-center items-center text-[#C5A880]">
                    <Loader2 className="animate-spin h-8 w-8" />
                </div>
            ) : properties.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl">
                    <p className="text-sm text-white/40 mb-4">No residences found in the database.</p>
                    <button
                        onClick={onOpenAdd}
                        className="px-4 py-2 bg-[#C5A880] text-[#0B0D12] rounded-xl text-xs font-semibold"
                    >
                        Create First Residence
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {properties.map((prop) => (
                        <div
                            key={prop.id}
                            className="bg-[#12141C] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group"
                        >
                            <div>
                                <div className="relative h-44 w-full overflow-hidden bg-black">
                                    {prop.imageUrl ? (
                                        <img
                                            src={prop.imageUrl}
                                            alt={prop.name}
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-white/20 text-xs">
                                            No Image Available
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 bg-[#0B0D12]/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-[#C5A880] border border-white/10">
                                        {prop.category}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-serif text-lg font-light text-white">{prop.name}</h3>
                                        <span className="text-sm font-semibold text-[#C5A880]">{prop.price}</span>
                                    </div>
                                    <p className="text-xs text-white/50 flex items-center gap-1 mb-3">
                                        <MapPin size={12} className="text-[#C5A880]" /> {prop.location}
                                    </p>
                                    <div className="flex gap-3 text-[10px] text-white/40 font-mono border-t border-white/5 pt-3">
                                        <span>{prop.beds} Beds</span>
                                        <span>•</span>
                                        <span>{prop.baths} Baths</span>
                                        <span>•</span>
                                        <span>{prop.levels} Floors</span>
                                        <span>•</span>
                                        <span>{prop.area}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-5 pb-5 pt-2 flex justify-between items-center border-t border-white/5">
                                <Link
                                    href={`/residences?type=${prop.category}`}
                                    target="_blank"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white/70 hover:text-white transition-colors"
                                >
                                    <Eye size={13} />
                                    <span>Preview</span>
                                </Link>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onOpenEdit(prop)}
                                        className="p-2 text-white/50 hover:text-[#C5A880] hover:bg-white/5 rounded-lg transition-colors"
                                        title="Edit Residence"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => onDeleteProperty(prop.id)}
                                        className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete Residence"
                                    >
                                        <Trash2 size={14} />
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