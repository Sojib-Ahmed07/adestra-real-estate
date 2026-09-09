'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
    {
        number: '01',
        title: 'Place',
        text: 'Every project begins with its surroundings. We study the landscape, light, climate and character of a place before defining what belongs there.',
    },
    {
        number: '02',
        title: 'Proportion',
        text: 'We believe restraint creates permanence. Every line, opening and volume is considered to create spaces that feel balanced rather than excessive.',
    },
    {
        number: '03',
        title: 'Material',
        text: 'Natural materials bring depth that cannot be replicated. Stone, timber, glass and metal are selected for how they age, weather and interact with light.',
    },
    {
        number: '04',
        title: 'Experience',
        text: 'Architecture is ultimately about living. We design for movement, quiet moments, gatherings, views and the rituals that make a residence feel like home.',
    },
];

export default function AboutPage() {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('[data-hero-item]', {
                y: 60,
                autoAlpha: 0,
                duration: 1.1,
                stagger: 0.1,
                ease: 'power4.out',
            });

            gsap.utils.toArray('[data-reveal]').forEach(element => {
                gsap.from(element, {
                    y: 55,
                    autoAlpha: 0,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 82%',
                    },
                });
            });

            gsap.utils.toArray('[data-line]').forEach(line => {
                gsap.from(line, {
                    scaleX: 0,
                    transformOrigin: 'left center',
                    duration: 1.1,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: line,
                        start: 'top 85%',
                    },
                });
            });

            gsap.utils.toArray('[data-image]').forEach(image => {
                gsap.fromTo(
                    image,
                    {
                        scale: 1.12,
                    },
                    {
                        scale: 1,
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: image,
                            start: 'top 85%',
                        },
                    }
                );
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={pageRef} className="overflow-hidden bg-[#E8E4DB] text-[#11120F]">
            <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-[#090A0D] px-6 pb-16 text-[#F4F1EA] md:min-h-[82vh] md:px-10 md:pb-20 lg:px-16 lg:pb-24">
                <div className="absolute inset-0 opacity-[0.035]">
                    <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
                    <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
                    <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
                </div>

                <div className="relative mx-auto w-full max-w-[1500px]">
                    <div
                        data-hero-item
                        className="mb-6 flex items-center gap-4"
                    >
                        <span className="h-px w-10 bg-[#C5A880]" />
                        <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                            About the studio
                        </span>
                    </div>

                    <h1
                        data-hero-item
                        className="max-w-[1250px] text-[clamp(4rem,10vw,11rem)] font-light leading-[0.8] tracking-[-0.07em]"
                    >
                        We create
                        <br />
                        <span className="text-[#C5A880]">places</span> to
                        belong.
                    </h1>

                    <div
                        data-hero-item
                        className="mt-10 flex max-w-xl items-start gap-5 md:ml-[25%] md:mt-12"
                    >
                        <span className="mt-2 h-px w-8 shrink-0 bg-white/30" />
                        <p className="text-sm font-light leading-relaxed text-white/50 md:text-base">
                            An independent architecture and development studio
                            focused on creating considered residential spaces
                            with lasting character.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-36">
                <div className="mx-auto max-w-[1500px]">
                    <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
                        <div data-reveal>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-[#9A8060]" />
                                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A8060]">
                                    Who we are
                                </span>
                            </div>
                        </div>

                        <div data-reveal>
                            <h2 className="max-w-5xl text-[clamp(2.8rem,5.5vw,6rem)] font-light leading-[0.88] tracking-[-0.055em]">
                                Architecture with a
                                <span className="text-[#9A8060]">
                                    {' '}
                                    quieter
                                </span>{' '}
                                ambition.
                            </h2>

                            <div className="mt-10 grid gap-8 text-sm leading-relaxed text-black/55 md:grid-cols-2 md:gap-12">
                                <p>
                                    We are a multidisciplinary studio working
                                    across architecture, interiors and
                                    residential development. Our work is
                                    defined by clarity, materiality and a deep
                                    respect for context.
                                </p>

                                <p>
                                    Rather than following a particular style,
                                    we allow each project to develop its own
                                    identity. The result is architecture that
                                    feels contemporary today while remaining
                                    relevant tomorrow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20 md:px-10 md:pb-28 lg:px-16 lg:pb-36">
                <div className="mx-auto max-w-[1500px]">
                    <div
                        data-image
                        className="relative h-[55vh] min-h-[420px] overflow-hidden md:h-[65vh]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=3000&q=90"
                            alt="Contemporary architecture"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/10" />

                        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                            <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                                Architecture / Context / Light
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#090A0D] px-6 py-20 text-[#F4F1EA] md:px-10 md:py-28 lg:px-16 lg:py-36">
                <div className="mx-auto max-w-[1500px]">
                    <div className="grid gap-16 md:grid-cols-[0.6fr_1.4fr] md:gap-20">
                        <div data-reveal>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-[#C5A880]" />
                                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A8060]">
                                    Our philosophy
                                </span>
                            </div>
                        </div>

                        <div data-reveal>
                            <h2 className="max-w-5xl text-[clamp(3rem,6vw,7rem)] font-light leading-[0.84] tracking-[-0.06em]">
                                Less noise.
                                <br />
                                More <span className="text-[#C5A880]">meaning.</span>
                            </h2>

                            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-white/45 md:mt-14 md:text-base">
                                We are interested in the spaces between
                                architecture and life. The morning light
                                entering a room. The texture of a wall beneath
                                your hand. A courtyard becoming part of a
                                daily ritual. These details are small, but they
                                define how a place is remembered.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-36">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-14 flex items-end justify-between md:mb-20">
                        <div data-reveal>
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-8 bg-[#9A8060]" />
                                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A8060]">
                                    How we work
                                </span>
                            </div>

                            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-light leading-[0.85] tracking-[-0.06em]">
                                Four principles.
                            </h2>
                        </div>

                        <span className="hidden text-[9px] uppercase tracking-[0.3em] text-black/30 md:block">
                            01 — 04
                        </span>
                    </div>

                    <div className="border-t border-black/10">
                        {PRINCIPLES.map((principle, index) => (
                            <div
                                key={principle.number}
                                data-reveal
                                className="grid gap-6 border-b border-black/10 py-8 md:grid-cols-[80px_0.7fr_1.3fr] md:items-start md:py-10 lg:grid-cols-[100px_0.8fr_1.2fr]"
                            >
                                <span className="text-[9px] tracking-[0.25em] text-[#9A8060]">
                                    {principle.number}
                                </span>

                                <h3 className="text-2xl font-light tracking-[-0.03em] md:text-3xl lg:text-4xl">
                                    {principle.title}
                                </h3>

                                <p className="max-w-xl text-sm leading-relaxed text-black/50">
                                    {principle.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#090A0D] px-6 py-24 text-[#F4F1EA] md:px-10 md:py-32 lg:px-16 lg:py-40">
                <div className="mx-auto max-w-[1500px]">
                    <div data-reveal>
                        <p className="mb-6 text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                            A considered approach
                        </p>

                        <h2 className="max-w-[1200px] text-[clamp(3.5rem,8vw,9rem)] font-light leading-[0.82] tracking-[-0.065em]">
                            We don&apos;t just
                            <br />
                            build <span className="text-[#C5A880]">spaces.</span>
                        </h2>
                    </div>

                    <div
                        data-line
                        className="mt-14 h-px w-full bg-white/10 md:mt-20"
                    />

                    <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <p
                            data-reveal
                            className="max-w-md text-sm leading-relaxed text-white/45 md:text-base"
                        >
                            We create environments that become part of the
                            lives lived inside them.
                        </p>

                        <a
                            data-reveal
                            href="/contact"
                            className="group flex items-center gap-4"
                        >
                            <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 group-hover:text-[#C5A880]">
                                Start a conversation
                            </span>

                            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#090A0D]">
                                <ArrowUpRight
                                    size={18}
                                    strokeWidth={1.2}
                                    className="transition-transform duration-500 group-hover:rotate-45"
                                />
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}