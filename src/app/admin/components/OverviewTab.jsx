'use client';

import React from 'react';
import { Building2, BookOpen, Plus } from 'lucide-react';

export default function OverviewTab({
    propertyCount,
    blogCount,
    isBlogsLoading,
    onOpenAddBlog
}) {
    return (
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
                        onClick={onOpenAddBlog}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA] transition-colors"
                    >
                        <Plus size={14} />
                        <span>Write Essay</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#12141C] border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                    <div>
                        <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">
                            Listed Residences
                        </span>
                        <div className="font-serif text-4xl font-light text-white">{propertyCount}</div>
                        <span className="text-xs text-[#C5A880] mt-1 block">Active Portfolio</span>
                    </div>
                    <div className="p-3 bg-[#C5A880]/10 text-[#C5A880] rounded-xl">
                        <Building2 size={24} />
                    </div>
                </div>

                <div className="bg-[#12141C] border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                    <div>
                        <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">
                            Live Journal Entries
                        </span>
                        <div className="font-serif text-4xl font-light text-white">
                            {isBlogsLoading ? '...' : blogCount}
                        </div>
                        <span className="text-xs text-[#C5A880] mt-1 block">Connected to Database</span>
                    </div>
                    <div className="p-3 bg-white/5 text-white/70 rounded-xl">
                        <BookOpen size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
}