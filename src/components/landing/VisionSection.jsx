'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
    const sectionRef = useRef(null);
    const statementRef = useRef(null);
    const lineRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                statementRef.current,
                {
                    y: 80,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo(
                lineRef.current,
                {
                    scaleX: 0,
                    transformOrigin: 'left center',
                },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                    },
                }
            );

            gsap.fromTo(
                ctaRef.current,
                {
                    y: 40,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    delay: 0.25,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 55%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#090A0D] px-6 py-24 text-[#F4F1EA] md:px-10 md:py-32 lg:px-16 lg:py-36"
        >
            <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
                <div className="absolute left-[20%] top-0 h-full w-px bg-white" />
                <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
                <div className="absolute left-[80%] top-0 h-full w-px bg-white" />
            </div>

            <div className="relative mx-auto max-w-[1500px]">
                <div className="mb-16 flex items-center justify-between md:mb-24">
                    <div className="flex items-center gap-4">
                        <span className="h-px w-10 bg-[#C5A880]" />
                        <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                            Our philosophy
                        </span>
                    </div>

                    <span className="text-[9px] tracking-[0.3em] text-white/30">
                        06
                    </span>
                </div>

                <div
                    ref={statementRef}
                    className="max-w-[1250px] opacity-0"
                >
                    <h2 className="text-[clamp(3.4rem,8.5vw,9.5rem)] font-light leading-[0.84] tracking-[-0.065em]">
                        Architecture
                        <br />
                        should be{' '}
                        <span className="text-[#C5A880]">felt.</span>
                    </h2>
                </div>

                <div
                    ref={lineRef}
                    className="mt-16 h-px w-full bg-white/15 md:mt-24"
                />

                <div
                    ref={ctaRef}
                    className="mt-8 flex flex-col gap-8 opacity-0 md:mt-10 md:flex-row md:items-end md:justify-between"
                >
                    <div className="max-w-md">
                        <p className="text-sm font-light leading-relaxed text-white/50 md:text-base">
                            We create residences that exist beyond trends,
                            shaped by place, proportion, material and the way
                            people experience space.
                        </p>
                    </div>

                    <a
                        href="#contact"
                        className="group flex items-center gap-5"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 transition-colors duration-500 group-hover:text-[#C5A880]">
                            Begin a conversation
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
    );
}