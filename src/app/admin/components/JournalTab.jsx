'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Trash2, Eye, Edit2, Loader2 } from 'lucide-react';

export default function JournalTab({
    blogs,
    isLoading,
    onOpenAdd,
    onOpenEdit,
    onDelete
}) {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-white/5 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-[#C5A880]">
                        <span className="h-px w-6 bg-[#C5A880]" />
                        <span className="text-[8px] uppercase tracking-[0.3em]">Drizzle ORM Engine</span>
                    </div>
                    <h1 className="font-serif text-3xl font-light tracking-tight">Journal & Articles</h1>
                </div>

                <button
                    onClick={onOpenAdd}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4F1EA] transition-colors"
                >
                    <Plus size={15} />
                    <span>Create Article</span>
                </button>
            </div>

            {isLoading ? (
                <div className="py-20 flex justify-center items-center text-[#C5A880]">
                    <Loader2 className="animate-spin h-8 w-8" />
                </div>
            ) : blogs.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl">
                    <p className="text-sm text-white/40 mb-4">No articles found in the database.</p>
                    <button
                        onClick={onOpenAdd}
                        className="px-4 py-2 bg-[#C5A880] text-[#0B0D12] rounded-xl text-xs font-semibold"
                    >
                        Create First Article
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {blogs.map((b) => (
                        <div
                            key={b.id}
                            className="bg-[#12141C] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between md:items-center gap-6"
                        >
                            <div className="flex items-start gap-4">
                                {b.imageUrl && (
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 hidden sm:block">
                                        <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-mono">
                                            {b.category}
                                        </span>
                                        <span className="text-[9px] text-white/30 font-mono">{b.year}</span>
                                        <span className="text-[9px] text-white/20 font-mono">/journal/{b.slug}</span>
                                    </div>
                                    <h3 className="font-serif text-xl font-light text-white mb-2">{b.title}</h3>
                                    <p className="text-xs text-white/50 leading-relaxed max-w-xl">{b.excerpt}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <Link
                                    href={`/journal/${b.slug}`}
                                    target="_blank"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white/70 hover:text-white transition-colors"
                                >
                                    <Eye size={13} />
                                    <span>View</span>
                                </Link>

                                <button
                                    onClick={() => onOpenEdit(b)}
                                    className="p-2 text-white/50 hover:text-[#C5A880] hover:bg-white/5 rounded-lg transition-colors"
                                    title="Edit Article"
                                >
                                    <Edit2 size={14} />
                                </button>

                                <button
                                    onClick={() => onDelete(b.id)}
                                    className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Delete Post"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}