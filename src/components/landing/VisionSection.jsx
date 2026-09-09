'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const wordRef = useRef(null);
    const imageRef = useRef(null);
    const lineRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { y: 70, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo(
                wordRef.current,
                { x: 100, autoAlpha: 0 },
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 1.3,
                    delay: 0.15,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo(
                imageRef.current,
                { scale: 1.18, clipPath: 'inset(12% 12% 12% 12%)' },
                {
                    scale: 1,
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.5,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 85%',
                    },
                }
            );

            gsap.fromTo(
                lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: lineRef.current,
                        start: 'top 85%',
                    },
                }
            );

            gsap.fromTo(
                contentRef.current,
                { y: 35, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 85%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#E8E4DB] px-6 py-20 text-[#11120F] md:px-10 md:py-28 lg:px-16 lg:py-32"
        >
            <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
                <div className="absolute left-[20%] top-0 h-full w-px bg-black" />
                <div className="absolute left-[50%] top-0 h-full w-px bg-black" />
                <div className="absolute left-[80%] top-0 h-full w-px bg-black" />
            </div>

            <div className="relative mx-auto max-w-[1500px]">
                <div className="mb-16 flex items-center justify-between md:mb-20">
                    <div className="flex items-center gap-4">
                        <span className="h-px w-10 bg-[#9A8060]" />
                        <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                            The way we see it
                        </span>
                    </div>

                    <span className="text-[9px] tracking-[0.3em] text-black/25">
                        06
                    </span>
                </div>

                <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
                    <div ref={titleRef}>
                        <p className="mb-7 max-w-sm text-[10px] uppercase tracking-[0.3em] text-black/35">
                            Beyond architecture
                        </p>

                        <h2 className="max-w-[1050px] text-[clamp(3.8rem,8vw,9rem)] font-light leading-[0.8] tracking-[-0.07em]">
                            Space is not
                            <br />
                            <span className="text-[#9A8060]">enough.</span>
                        </h2>
                    </div>

                    <div className="lg:pb-3">
                        <p
                            ref={wordRef}
                            className="max-w-sm text-[clamp(1.35rem,2vw,2rem)] font-light leading-[1.15] tracking-[-0.035em] text-black/65"
                        >
                            What matters is what a place makes you
                            <span className="text-[#9A8060]"> feel.</span>
                        </p>
                    </div>
                </div>

                <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-[1.45fr_0.55fr] lg:gap-16">
                    <div
                        ref={imageRef}
                        className="relative h-[360px] overflow-hidden md:h-[480px] lg:h-[540px]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90"
                            alt="Contemporary residence"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/[0.06]" />

                        <div className="absolute bottom-5 left-5 flex items-center gap-3 md:bottom-7 md:left-7">
                            <span className="h-px w-7 bg-white/60" />
                            <span className="text-[8px] uppercase tracking-[0.3em] text-white/70">
                                Form / Light / Atmosphere
                            </span>
                        </div>
                    </div>

                    <div
                        ref={contentRef}
                        className="flex flex-col justify-end opacity-0"
                    >
                        <div className="mb-8">
                            <span className="text-[9px] tracking-[0.25em] text-[#9A8060]">
                                01 — 03
                            </span>
                        </div>

                        <p className="max-w-sm text-sm leading-[1.8] text-black/50 md:text-base">
                            We believe the most memorable residences are not
                            defined by how much they contain, but by how
                            naturally they become part of everyday life.
                        </p>

                        <div
                            ref={lineRef}
                            className="mt-10 h-px origin-left bg-black/15"
                        />

                        <a
                            href="#contact"
                            className="group mt-7 flex items-center justify-between"
                        >
                            <span className="text-[9px] uppercase tracking-[0.3em] text-black/55 transition-colors duration-300 group-hover:text-[#9A8060]">
                                Begin a conversation
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
                </div>
            </div>
        </section>
    );
}