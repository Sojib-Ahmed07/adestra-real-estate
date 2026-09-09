'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JOURNAL = [
    {
        id: 1,
        category: 'Architecture',
        year: '2026',
        title: 'The quiet power of natural light',
        excerpt: 'How orientation, shadow and proportion transform the atmosphere of a residence.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90',
        size: 'large',
    },
    {
        id: 2,
        category: 'Materials',
        year: '2026',
        title: 'Why material matters',
        excerpt: 'Stone, timber and metal become more beautiful when allowed to age.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90',
        size: 'small',
    },
    {
        id: 3,
        category: 'Perspective',
        year: '2025',
        title: 'Designing for slower living',
        excerpt: 'A considered approach to spaces that encourage pause, presence and connection.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90',
        size: 'small',
    },
    {
        id: 4,
        category: 'Architecture',
        year: '2025',
        title: 'The relationship between inside and out',
        excerpt: 'When architecture dissolves the boundary between home and landscape.',
        image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=90',
        size: 'small',
    },
    {
        id: 5,
        category: 'Places',
        year: '2025',
        title: 'A sense of place',
        excerpt: 'Every meaningful project begins by listening to its surroundings.',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=90',
        size: 'small',
    },
    {
        id: 6,
        category: 'Perspective',
        year: '2024',
        title: 'In praise of restraint',
        excerpt: 'Why removing the unnecessary can reveal what matters most.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90',
        size: 'small',
    },
];

const FILTERS = ['All', 'Architecture', 'Materials', 'Perspective', 'Places'];

export default function JournalPage() {
    const pageRef = useRef(null);
    const [filter, setFilter] = useState('All');

    const filteredJournal = filter === 'All'
        ? JOURNAL
        : JOURNAL.filter(item => item.category === filter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('[data-hero]', {
                y: 70,
                autoAlpha: 0,
                duration: 1.1,
                stagger: 0.12,
                ease: 'power4.out',
            });

            gsap.utils.toArray('[data-reveal]').forEach(item => {
                gsap.from(item, {
                    y: 50,
                    autoAlpha: 0,
                    duration: 0.9,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 86%',
                    },
                });
            });

            gsap.utils.toArray('[data-image]').forEach(image => {
                gsap.fromTo(
                    image,
                    { scale: 1.12 },
                    {
                        scale: 1,
                        duration: 1.4,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: image,
                            start: 'top 90%',
                        },
                    }
                );
            });
        }, pageRef);

        return () => ctx.revert();
    }, [filter]);

    return (
        <main
            ref={pageRef}
            className="overflow-hidden bg-[#E8E4DB] text-[#11120F]"
        >
            <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-[#090A0D] px-6 pb-16 text-[#F4F1EA] md:min-h-[76vh] md:px-10 md:pb-20 lg:px-16 lg:pb-24">
                <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
                    <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
                    <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
                    <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
                </div>

                <div className="relative mx-auto w-full max-w-[1500px]">
                    <div data-hero className="mb-6 flex items-center gap-4">
                        <span className="h-px w-10 bg-[#C5A880]" />
                        <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                            Journal
                        </span>
                    </div>

                    <h1
                        data-hero
                        className="max-w-[1200px] text-[clamp(5rem,12vw,13rem)] font-light leading-[0.76] tracking-[-0.08em]"
                    >
                        Thoughts
                        <br />
                        on <span className="text-[#C5A880]">place.</span>
                    </h1>

                    <div
                        data-hero
                        className="mt-10 flex max-w-xl items-start gap-5 md:ml-[25%]"
                    >
                        <span className="mt-2 h-px w-8 shrink-0 bg-white/30" />
                        <p className="text-sm font-light leading-relaxed text-white/45 md:text-base">
                            Ideas, observations and stories from our work,
                            our surroundings and the spaces that inspire us.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
                        <div data-reveal>
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#9A8060]" />
                                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A8060]">
                                    Featured
                                </span>
                            </div>

                            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-light leading-[0.84] tracking-[-0.06em]">
                                The latest
                                <br />
                                thinking.
                            </h2>
                        </div>

                        <span className="text-[9px] uppercase tracking-[0.3em] text-black/30">
                            Issue 01 / 2026
                        </span>
                    </div>

                    <article
                        data-reveal
                        className="group grid overflow-hidden bg-[#DCD7CC] md:grid-cols-[1.35fr_0.65fr]"
                    >
                        <div
                            data-image
                            className="relative h-[55vh] min-h-[400px] overflow-hidden md:h-[600px]"
                        >
                            <img
                                src={JOURNAL[0].image}
                                alt={JOURNAL[0].title}
                                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                            />

                            <div className="absolute inset-0 bg-black/[0.06]" />

                            <div className="absolute left-6 top-6 md:left-8 md:top-8">
                                <span className="text-[9px] uppercase tracking-[0.3em] text-white/70">
                                    {JOURNAL[0].category}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
                            <div>
                                <div className="mb-10 flex items-center justify-between">
                                    <span className="text-[9px] tracking-[0.25em] text-black/35">
                                        01
                                    </span>
                                    <span className="text-[9px] tracking-[0.25em] text-black/35">
                                        {JOURNAL[0].year}
                                    </span>
                                </div>

                                <h3 className="max-w-lg text-[clamp(2.2rem,4vw,4.5rem)] font-light leading-[0.9] tracking-[-0.055em]">
                                    {JOURNAL[0].title}
                                </h3>

                                <p className="mt-8 max-w-md text-sm leading-[1.8] text-black/50">
                                    {JOURNAL[0].excerpt}
                                </p>
                            </div>

                            <a
                                href="#"
                                className="mt-12 flex items-center justify-between border-t border-black/10 pt-6"
                            >
                                <span className="text-[9px] uppercase tracking-[0.3em] text-black/55 transition-colors duration-300 group-hover:text-[#9A8060]">
                                    Read article
                                </span>

                                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-all duration-500 group-hover:border-[#9A8060] group-hover:bg-[#9A8060] group-hover:text-[#F4F1EA]">
                                    <ArrowUpRight
                                        size={17}
                                        strokeWidth={1.2}
                                        className="transition-transform duration-500 group-hover:rotate-45"
                                    />
                                </span>
                            </a>
                        </div>
                    </article>
                </div>
            </section>

            <section className="border-t border-black/10 px-6 py-16 md:px-10 lg:px-16">
                <div className="mx-auto max-w-[1500px]">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-8 bg-[#9A8060]" />
                            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A8060]">
                                Explore the journal
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {FILTERS.map(item => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setFilter(item)}
                                    className={`border px-5 py-3 text-[9px] uppercase tracking-[0.25em] transition-all duration-300 ${filter === item
                                            ? 'border-[#11120F] bg-[#11120F] text-[#F4F1EA]'
                                            : 'border-black/15 text-black/45 hover:border-black/40 hover:text-black'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-24 md:px-10 md:pb-32 lg:px-16 lg:pb-36">
                <div className="mx-auto max-w-[1500px]">
                    <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                        {filteredJournal.slice(1).map((article, index) => (
                            <article
                                key={article.id}
                                data-reveal
                                className="group"
                            >
                                <div
                                    data-image
                                    className="relative mb-7 h-[360px] overflow-hidden bg-[#DCD7CC] md:h-[420px]"
                                >
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                                    />

                                    <div className="absolute inset-0 bg-black/[0.04]" />

                                    <div className="absolute left-5 top-5 flex items-center gap-3">
                                        <span className="h-px w-6 bg-white/60" />
                                        <span className="text-[8px] uppercase tracking-[0.3em] text-white/70">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <div className="mb-4 flex items-center gap-4">
                                            <span className="text-[9px] tracking-[0.2em] text-[#9A8060]">
                                                0{index + 2}
                                            </span>
                                            <span className="text-[9px] tracking-[0.2em] text-black/30">
                                                {article.year}
                                            </span>
                                        </div>

                                        <h3 className="max-w-sm text-[clamp(1.8rem,2.5vw,2.5rem)] font-light leading-[0.95] tracking-[-0.045em]">
                                            {article.title}
                                        </h3>

                                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-black/45">
                                            {article.excerpt}
                                        </p>
                                    </div>

                                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 transition-all duration-500 group-hover:border-[#9A8060] group-hover:bg-[#9A8060] group-hover:text-[#F4F1EA]">
                                        <ArrowUpRight
                                            size={15}
                                            strokeWidth={1.2}
                                            className="transition-transform duration-500 group-hover:rotate-45"
                                        />
                                    </span>
                                </div>

                                <a
                                    href="#"
                                    className="mt-7 block border-t border-black/10 pt-5 text-[9px] uppercase tracking-[0.3em] text-black/35 transition-colors duration-300 group-hover:text-[#9A8060]"
                                >
                                    Read article
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

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

                    <a
                        href="#"
                        data-reveal
                        className="group flex items-center gap-5"
                    >
                        <span className="text-[9px] uppercase tracking-[0.3em] text-black/60">
                            Follow our journal
                        </span>

                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/20 transition-all duration-500 group-hover:bg-[#11120F] group-hover:text-[#F4F1EA]">
                            <ArrowUpRight
                                size={18}
                                strokeWidth={1.2}
                                className="transition-transform duration-500 group-hover:rotate-45"
                            />
                        </span>
                    </a>
                </div>
            </section>

            <div className="bg-[#090A0D] px-6 py-6 text-[#F4F1EA] md:px-10 lg:px-16">
                <div className="mx-auto flex max-w-[1500px] items-center justify-between text-[9px] uppercase tracking-[0.25em] text-white/30">
                    <span>Journal / 2026</span>

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