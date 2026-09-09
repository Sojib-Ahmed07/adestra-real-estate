'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DevelopmentScene from '@/components/developments/DevelopmentScene';

gsap.registerPlugin(ScrollTrigger);

const DEVELOPMENTS = [
    {
        id: '01',
        name: 'The Arcline',
        location: 'Gulshan, Dhaka',
        type: 'Private Residences',
        status: 'In Development',
        model: 'https://cdn.3dassets.dev/assets/13688/v1/model.glb',
    },
];

export default function DevelopmentsPage() {
    const pageRef = useRef(null);
    const progressRef = useRef(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const trigger = ScrollTrigger.create({
                trigger: '[data-development-scroll]',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: self => {
                    progressRef.current = self.progress;
                },
            });

            gsap.from('[data-intro]', {
                y: 35,
                autoAlpha: 0,
                duration: 1,
                stagger: 0.08,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '[data-development-intro]',
                    start: 'top 80%',
                },
            });

            return () => trigger.kill();
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const development = DEVELOPMENTS[0];

    return (
        <main ref={pageRef} className="bg-[#090A0D] text-[#F4F1EA]">
            <section data-development-scroll className="relative h-[320vh]">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <DevelopmentScene model={development.model} progressRef={progressRef} />

                    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_45%,transparent_20%,rgba(9,10,13,.18)_70%,rgba(9,10,13,.72)_100%)]" />

                    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between px-6 pt-7 md:px-10 lg:px-16">
                        <div data-intro className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#C5A880]" />
                            <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                                Developments
                            </span>
                        </div>

                        <div data-intro className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                            01 / 01
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-8 md:px-10 md:pb-10 lg:px-16">
                        <div className="mx-auto flex max-w-[1500px] items-end justify-between gap-8">
                            <div>
                                <p data-intro className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">
                                    {development.location}
                                </p>

                                <h1 data-intro className="max-w-4xl text-[clamp(4rem,10vw,10rem)] font-light leading-[0.78] tracking-[-0.07em]">
                                    {development.name}
                                </h1>

                                <div data-intro className="mt-6 flex items-center gap-6 text-[9px] uppercase tracking-[0.25em] text-white/45">
                                    <span>{development.type}</span>
                                    <span className="h-1 w-1 rounded-full bg-[#C5A880]" />
                                    <span>{development.status}</span>
                                </div>
                            </div>

                            <div className="hidden shrink-0 items-center gap-3 pb-2 md:flex">
                                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                                    Scroll to explore
                                </span>
                                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
                                    <ArrowDown size={14} strokeWidth={1.2} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-white/10">
                        <div
                            className="h-full origin-left bg-[#C5A880]"
                            style={{
                                transform: 'scaleX(var(--development-progress, 0))',
                            }}
                        />
                    </div>
                </div>
            </section>

            <section
                data-development-intro
                className="relative overflow-hidden bg-[#E8E4DB] px-6 py-24 text-[#11120F] md:px-10 md:py-32 lg:px-16"
            >
                <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-2 md:gap-20">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#9A8060]" />
                            <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                                The vision
                            </span>
                        </div>

                        <h2 className="max-w-3xl text-[clamp(3rem,6vw,6.5rem)] font-light leading-[0.85] tracking-[-0.06em]">
                            Architecture
                            <br />
                            with presence.
                        </h2>
                    </div>

                    <div className="flex flex-col justify-end">
                        <p className="max-w-xl text-base leading-[1.8] text-[#11120F]/60 md:text-lg">
                            The Arcline is imagined as a private collection of residences
                            shaped by light, proportion and the character of its surroundings.
                            Every detail is considered to make the architecture feel quiet,
                            precise and enduring.
                        </p>

                        <a
                            href="#contact"
                            className="group mt-10 flex w-fit items-center gap-4 border-b border-[#11120F]/20 pb-3 text-[10px] uppercase tracking-[0.3em]"
                        >
                            Discuss the development
                            <ArrowUpRight
                                size={15}
                                strokeWidth={1.2}
                                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}