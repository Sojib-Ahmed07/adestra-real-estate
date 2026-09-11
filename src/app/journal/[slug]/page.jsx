'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ArrowDown, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getArticleBySlug } from '@/db/actions/journal';

gsap.registerPlugin(ScrollTrigger);

export default function JournalSlugPage() {
    const params = useParams();
    const slug = params?.slug;
    const pageRef = useRef(null);

    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchArticle() {
            if (!slug) return;
            setIsLoading(true);
            const res = await getArticleBySlug(slug);

            if (isMounted) {
                if (res.success && res.data) {
                    setArticle(res.data);
                } else {
                    setArticle(null);
                }
                setIsLoading(false);
            }
        }

        fetchArticle();

        return () => {
            isMounted = false;
        };
    }, [slug]);

    useEffect(() => {
        if (isLoading || !article) return;

        const ctx = gsap.context(() => {
            gsap.from('[data-hero]', {
                y: 60,
                autoAlpha: 0,
                duration: 1.1,
                stagger: 0.12,
                ease: 'power4.out',
            });

            gsap.utils.toArray('[data-reveal]').forEach((item) => {
                gsap.from(item, {
                    y: 40,
                    autoAlpha: 0,
                    duration: 0.9,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 86%',
                    },
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, [article, isLoading]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#090A0D]">
                <Loader2 className="h-8 w-8 animate-spin text-[#C5A880]" />
            </div>
        );
    }

    if (!article) {
        notFound();
    }

    return (
        <main
            ref={pageRef}
            className="overflow-hidden bg-[#E8E4DB] text-[#11120F]"
        >
            {/* Dark Editorial Hero Header */}
            <section className="relative flex min-h-[60vh] flex-col justify-between overflow-hidden bg-[#090A0D] px-6 pb-16 pt-28 text-[#F4F1EA] md:min-h-[68vh] md:px-10 md:pb-20 lg:px-16 lg:pb-24">
                <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
                    <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
                    <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
                    <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
                </div>

                <div className="relative mx-auto w-full max-w-[1500px]">
                    <div data-hero className="mb-10">
                        <Link
                            href="/journal"
                            className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-[#9A8060] transition-colors hover:text-[#C5A880]"
                        >
                            <ArrowLeft size={13} />
                            <span>Back to Journal</span>
                        </Link>
                    </div>

                    <div data-hero className="mb-6 flex items-center gap-4">
                        <span className="h-px w-10 bg-[#C5A880]" />
                        <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                            {article.category} • {article.year}
                        </span>
                    </div>

                    <h1
                        data-hero
                        className="max-w-[1200px] text-[clamp(2.8rem,7vw,7.5rem)] font-light leading-[0.88] tracking-[-0.06em]"
                    >
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <div
                            data-hero
                            className="mt-10 flex max-w-2xl items-start gap-5"
                        >
                            <span className="mt-2.5 h-px w-8 shrink-0 bg-white/30" />
                            <p className="text-base font-light leading-relaxed text-white/50 md:text-lg">
                                {article.excerpt}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Cover Image Block */}
            {article.imageUrl && (
                <section className="px-6 -mt-10 md:-mt-16 md:px-10 lg:px-16">
                    <div className="mx-auto max-w-[1500px]">
                        <div
                            data-reveal
                            className="relative h-[50vh] min-h-[380px] w-full overflow-hidden bg-[#DCD7CC] md:h-[650px]"
                        >
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/[0.04]" />
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content Body */}
            <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28">
                <div className="mx-auto max-w-[900px]">
                    <div data-reveal className="space-y-8 text-base font-light leading-[1.85] text-black/70 md:text-lg">
                        {article.content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Footer Section */}
            <section className="bg-[#C5A880] px-6 py-20 text-[#11120F] md:px-10 md:py-28 lg:px-16">
                <div className="mx-auto flex max-w-[1500px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <div data-reveal>
                        <p className="mb-5 text-[9px] uppercase tracking-[0.35em] text-black/45">
                            Stay curious
                        </p>

                        <h2 className="max-w-4xl text-[clamp(3rem,6vw,6.5rem)] font-light leading-[0.84] tracking-[-0.06em]">
                            More ideas,
                            <br />
                            occasionally.
                        </h2>
                    </div>

                    <Link href="/journal" data-reveal className="group flex items-center gap-5">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-black/60">
                            Explore all entries
                        </span>

                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/20 transition-all duration-500 group-hover:bg-[#11120F] group-hover:text-[#F4F1EA]">
                            <ArrowUpRight
                                size={18}
                                strokeWidth={1.2}
                                className="transition-transform duration-500 group-hover:rotate-45"
                            />
                        </span>
                    </Link>
                </div>
            </section>

            <div className="bg-[#090A0D] px-6 py-6 text-[#F4F1EA] md:px-10 lg:px-16">
                <div className="mx-auto flex max-w-[1500px] items-center justify-between text-[9px] uppercase tracking-[0.25em] text-white/30">
                    <span>Journal / {article.year || new Date().getFullYear()}</span>

                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-2 transition-colors duration-300 hover:text-white"
                    >
                        Back to top
                        <ArrowDown
                            size={12}
                            strokeWidth={1.2}
                            className="rotate-180 transition-transform duration-300 group-hover:-translate-y-1"
                        />
                    </button>
                </div>
            </div>
        </main>
    );
}