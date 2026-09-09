'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('[data-footer-item]', {
                y: 35,
                autoAlpha: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 75%',
                },
            });

            gsap.from('[data-footer-line]', {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 1.2,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 80%',
                },
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            id="contact"
            className="relative overflow-hidden bg-[#090A0D] px-6 pt-20 text-[#F4F1EA] md:px-10 md:pt-28 lg:px-16 lg:pt-32"
        >
            <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[27vw] font-light leading-none tracking-[-0.08em] text-white/[0.018]">
                FORM
            </div>

            <div className="relative mx-auto max-w-[1500px]">
                <div
                    data-footer-item
                    className="mb-5 flex items-center gap-4"
                >
                    <span className="h-px w-10 bg-[#C5A880]" />
                    <span className="text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                        Start a project
                    </span>
                </div>

                <div
                    data-footer-item
                    className="flex flex-col justify-between gap-10 md:flex-row md:items-end"
                >
                    <h2 className="max-w-5xl text-[clamp(4rem,10vw,10.5rem)] font-light leading-[0.78] tracking-[-0.07em]">
                        Let&apos;s
                        <br />
                        create<span className="text-[#C5A880]">.</span>
                    </h2>

                    <a
                        href="mailto:hello@example.com"
                        className="group mb-2 flex shrink-0 items-center gap-4 md:mb-3"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors duration-500 group-hover:text-[#C5A880]">
                            Get in touch
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

                <div
                    data-footer-line
                    className="mt-20 h-px w-full bg-white/10 md:mt-28"
                />

                <div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-4 md:gap-8 md:py-16">
                    <div data-footer-item className="md:col-span-2">
                        <div className="text-xl font-medium tracking-[-0.04em]">
                            ATELIER<span className="text-[#C5A880]">.</span>
                        </div>

                        <p className="mt-5 max-w-xs text-xs leading-relaxed text-white/40">
                            Creating considered spaces where architecture,
                            landscape and life exist in balance.
                        </p>
                    </div>

                    <div data-footer-item>
                        <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#9A8060]">
                            Explore
                        </p>

                        <nav className="flex flex-col items-start gap-3">
                            <a
                                href="#about"
                                className="text-xs text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                About
                            </a>
                            <a
                                href="#residences"
                                className="text-xs text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                Residences
                            </a>
                            <a
                                href="#philosophy"
                                className="text-xs text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                Philosophy
                            </a>
                            <a
                                href="#contact"
                                className="text-xs text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                Contact
                            </a>
                        </nav>
                    </div>

                    <div data-footer-item>
                        <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#9A8060]">
                            Connect
                        </p>

                        <nav className="flex flex-col items-start gap-3">
                            <a
                                href="#"
                                className="text-xs text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                Instagram
                            </a>
                            <a
                                href="#"
                                className="text-xs text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                Pinterest
                            </a>
                            <a
                                href="mailto:hello@example.com"
                                className="text-xs text-white/55 transition-colors duration-300 hover:text-white"
                            >
                                Email
                            </a>
                        </nav>
                    </div>
                </div>

                <div
                    data-footer-line
                    className="h-px w-full bg-white/10"
                />

                <div
                    data-footer-item
                    className="flex flex-col justify-between gap-5 py-6 text-[9px] uppercase tracking-[0.2em] text-white/30 md:flex-row md:items-center"
                >
                    <span>© 2026 Atelier. All rights reserved.</span>

                    <div className="flex items-center gap-6">
                        <span>Dhaka — Bangladesh</span>
                        <button
                            type="button"
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                })
                            }
                            className="group flex items-center gap-2 text-white/40 transition-colors duration-300 hover:text-white"
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
            </div>
        </footer>
    );
}