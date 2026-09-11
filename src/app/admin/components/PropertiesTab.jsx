'use client';

import React from 'react';
import { MapPin, Trash2 } from 'lucide-react';

export default function PropertiesTab({ properties, onDeleteProperty }) {
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((prop) => (
                    <div
                        key={prop.id}
                        className="bg-[#12141C] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group"
                    >
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
                            </div>

                            <div className="p-5">
                                <h3 className="font-serif text-lg font-light text-white mb-1">{prop.name}</h3>
                                <p className="text-xs text-white/50 flex items-center gap-1 mb-2">
                                    <MapPin size={12} className="text-[#C5A880]" /> {prop.location}
                                </p>
                            </div>
                        </div>

                        <div className="px-5 pb-5 pt-2 flex justify-between items-center border-t border-white/5">
                            <button
                                onClick={() => onDeleteProperty(prop.id)}
                                className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}