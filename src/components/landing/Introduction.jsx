'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
    const root = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = root.current;

            gsap.from('.intro-label', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 45%',
                    scrub: 1,
                },
                y: 30,
                opacity: 0,
                ease: 'power3.out',
            });

            gsap.from('.intro-heading-line', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    end: 'top 35%',
                    scrub: 1.2,
                },
                yPercent: 100,
                opacity: 0,
                stagger: 0.12,
                ease: 'power4.out',
            });

            gsap.from('.intro-copy', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 65%',
                    end: 'top 40%',
                    scrub: 1,
                },
                y: 50,
                opacity: 0,
                ease: 'power3.out',
            });

            gsap.from('.intro-image', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'top 25%',
                    scrub: 1.2,
                },
                clipPath: 'inset(12% 12% 12% 12%)',
                scale: 1.08,
                ease: 'power3.out',
            });

            gsap.to('.intro-image img', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                yPercent: -8,
                ease: 'none',
            });

            gsap.from('.intro-detail', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 55%',
                    end: 'top 25%',
                    scrub: 1,
                },
                y: 35,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.out',
            });

            gsap.from('.intro-number', {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    end: 'top 30%',
                    scrub: 1,
                },
                y: 40,
                opacity: 0,
                ease: 'power3.out',
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={root}
            className="relative overflow-hidden bg-[#E8E4DB] text-[#11120F]"
        >
            <div className="mx-auto max-w-[1600px] px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44 xl:px-24">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                        <div className="intro-label mb-10 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#9A8060]" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#806A50]">
                                The Collection
                            </span>
                        </div>

                        <h2 className="font-serif text-[14vw] font-light leading-[0.82] tracking-[-0.065em] sm:text-[10vw] lg:text-[7.2vw]">
                            <span className="intro-heading-line block overflow-hidden">
                                More than
                            </span>

                            <span className="intro-heading-line block overflow-hidden">
                                a <em className="text-[#9A8060]">residence.</em>
                            </span>
                        </h2>
                    </div>

                    <div className="flex items-end lg:col-span-5">
                        <div className="intro-copy max-w-[430px]">
                            <p className="text-lg font-light leading-8 tracking-tight text-[#11120F]/75 sm:text-xl">
                                The finest homes are not simply places to
                                inhabit. They are expressions of landscape,
                                architecture, and the lives created within
                                them.
                            </p>

                            <p className="mt-7 text-sm font-light leading-7 text-[#11120F]/50">
                                We curate a private collection of exceptional
                                residences where design becomes experience and
                                every detail has a reason to exist.
                            </p>

                            <a
                                href="#residences"
                                className="group mt-9 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#11120F]"
                            >
                                <span>View the collection</span>

                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#11120F]/20 transition-all duration-300 group-hover:bg-[#11120F] group-hover:text-[#E8E4DB]">
                                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-28 sm:mt-36 lg:mt-44">
                    <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
                        <div className="intro-image relative h-[65vh] overflow-hidden bg-[#D5D0C5] lg:col-span-8 lg:h-[78vh]">
                            <img
                                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=90&w=2200&auto=format&fit=crop"
                                alt="Contemporary architectural residence"
                                className="h-[115%] w-full object-cover will-change-transform"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-9 sm:left-9 sm:right-9">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/60">
                                        Featured Architecture
                                    </p>

                                    <p className="mt-2 font-serif text-2xl font-light sm:text-3xl">
                                        Form follows feeling.
                                    </p>
                                </div>

                                <span className="hidden text-[9px] uppercase tracking-[0.3em] text-white/50 sm:block">
                                    01 / 03
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-4 lg:pb-3 lg:pl-8">
                            <div className="intro-number border-t border-[#11120F]/15 pt-5">
                                <p className="font-serif text-[5rem] font-light leading-none tracking-[-0.06em] text-[#9A8060] sm:text-[7rem]">
                                    01
                                </p>

                                <p className="mt-5 max-w-[280px] text-xs font-light leading-6 text-[#11120F]/50">
                                    Architecture selected for its ability to
                                    create atmosphere, not simply admiration.
                                </p>
                            </div>

                            <div className="intro-detail mt-16 flex items-start gap-5 border-t border-[#11120F]/15 pt-5">
                                <span className="mt-1">
                                    <ArrowDown className="h-4 w-4 text-[#9A8060]" />
                                </span>

                                <div>
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em]">
                                        Continue exploring
                                    </p>

                                    <p className="mt-3 max-w-[250px] text-xs leading-6 text-[#11120F]/45">
                                        Discover residences chosen beyond the
                                        ordinary.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}