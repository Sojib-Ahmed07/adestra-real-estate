'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RESIDENCES = [
    {
        number: '01',
        name: 'The Glass House',
        location: 'Westlake, California',
        type: 'Private Residence',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=2400&auto=format&fit=crop',
        description: 'A quiet architectural composition shaped around light, landscape and uninterrupted views.',
    },
    {
        number: '02',
        name: 'Casa Aurelia',
        location: 'Palm Springs, California',
        type: 'Desert Estate',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=90&w=2400&auto=format&fit=crop',
        description: 'A sculptural retreat where natural materials meet expansive desert horizons.',
    },
    {
        number: '03',
        name: 'Villa No. 8',
        location: 'Malibu, California',
        type: 'Ocean Residence',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=90&w=2400&auto=format&fit=crop',
        description: 'An elevated coastal residence designed around openness, privacy and the Pacific.',
    },
];

export default function ResidencesLanding() {
    const root = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = root.current;

            gsap.from('.res-hero-image', {
                scale: 1.18,
                opacity: 0,
                duration: 1.8,
                ease: 'power3.out',
            });

            gsap.from('.res-hero-content > *', {
                y: 70,
                opacity: 0,
                duration: 1.2,
                stagger: 0.12,
                delay: 0.25,
                ease: 'power4.out',
            });

            gsap.from('.res-intro-title', {
                scrollTrigger: {
                    trigger: '.res-intro',
                    start: 'top 75%',
                    end: 'top 35%',
                    scrub: 1.2,
                },
                yPercent: 100,
                opacity: 0,
                ease: 'power4.out',
            });

            gsap.from('.res-intro-copy', {
                scrollTrigger: {
                    trigger: '.res-intro',
                    start: 'top 70%',
                    end: 'top 40%',
                    scrub: 1.2,
                },
                y: 60,
                opacity: 0,
                ease: 'power3.out',
            });

            gsap.utils.toArray('.residence-item').forEach((item) => {
                const image = item.querySelector('.residence-image');
                const inner = item.querySelector('.residence-image img');
                const content = item.querySelector('.residence-content');

                gsap.from(image, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        end: 'top 35%',
                        scrub: 1.2,
                    },
                    clipPath: 'inset(14% 10% 14% 10%)',
                    scale: 1.08,
                    ease: 'power3.out',
                });

                gsap.to(inner, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                    yPercent: -8,
                    scale: 1.05,
                    ease: 'none',
                });

                gsap.from(content.children, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 65%',
                        end: 'top 35%',
                        scrub: 1,
                    },
                    y: 45,
                    opacity: 0,
                    stagger: 0.08,
                    ease: 'power3.out',
                });
            });

            gsap.to('.res-final-image img', {
                scrollTrigger: {
                    trigger: '.res-final',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
                scale: 1.12,
                yPercent: -5,
                ease: 'none',
            });

            gsap.from('.res-final-content > *', {
                scrollTrigger: {
                    trigger: '.res-final',
                    start: 'top 70%',
                    end: 'top 35%',
                    scrub: 1,
                },
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={root} className="overflow-hidden bg-[#090A0D] text-[#F4F1EA]">
            <section className="relative h-screen min-h-[700px] overflow-hidden">
                <div className="res-hero-image absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=90&w=2600&auto=format&fit=crop"
                        alt="Luxury architectural residence"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-black/20" />
                </div>

                <div className="res-hero-content absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20 xl:px-24">
                    <div className="mb-8 flex items-center gap-4">
                        <span className="h-px w-10 bg-[#C5A880]" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C5A880]">
                            The Residences
                        </span>
                    </div>

                    <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
                        <h1 className="max-w-[1000px] font-serif text-[18vw] font-light leading-[0.76] tracking-[-0.07em] sm:text-[14vw] lg:text-[10.5vw]">
                            Exceptional
                            <br />
                            <em className="text-[#C5A880]">by nature.</em>
                        </h1>

                        <div className="max-w-[310px] lg:mb-2">
                            <p className="text-sm font-light leading-7 text-white/65">
                                A private collection of residences defined by
                                architecture, setting and an uncompromising
                                sense of place.
                            </p>

                            <a
                                href="#collection"
                                className="group mt-7 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em]"
                            >
                                <span>Explore collection</span>
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:bg-[#F4F1EA] group-hover:text-[#090A0D]">
                                    <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="res-intro bg-[#E8E4DB] text-[#11120F]" id="collection">
                <div className="mx-auto max-w-[1600px] px-6 py-32 sm:px-10 sm:py-40 lg:px-16 lg:py-52 xl:px-24">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
                        <div className="lg:col-span-8">
                            <div className="mb-10 flex items-center gap-4">
                                <span className="h-px w-10 bg-[#9A8060]" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#806A50]">
                                    A considered collection
                                </span>
                            </div>

                            <div className="overflow-hidden">
                                <h2 className="res-intro-title max-w-[900px] font-serif text-[13vw] font-light leading-[0.82] tracking-[-0.065em] sm:text-[10vw] lg:text-[7.5vw]">
                                    Places with
                                    <br />
                                    <em className="text-[#9A8060]">presence.</em>
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-end lg:col-span-4">
                            <p className="res-intro-copy max-w-[390px] text-base font-light leading-8 text-[#11120F]/60 sm:text-lg">
                                We believe a remarkable residence should feel
                                inevitable within its landscape. Every property
                                is selected for its character, architecture and
                                ability to become something deeply personal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#E8E4DB] pb-32 text-[#11120F] sm:pb-40 lg:pb-52">
                <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-24">
                    {RESIDENCES.map((residence, index) => (
                        <article
                            key={residence.number}
                            className={`residence-item border-t border-[#11120F]/15 py-16 sm:py-24 lg:py-32 ${index % 2 === 1 ? 'lg:pl-[8vw]' : ''
                                }`}
                        >
                            <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
                                <div className="residence-image relative h-[68vh] min-h-[520px] overflow-hidden lg:col-span-8 lg:h-[78vh]">
                                    <img
                                        src={residence.image}
                                        alt={residence.name}
                                        className="h-[115%] w-full object-cover will-change-transform"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                                    <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-9 sm:left-9 sm:right-9">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-3 w-3 text-[#C5A880]" />
                                            <span className="text-[9px] uppercase tracking-[0.28em]">
                                                {residence.location}
                                            </span>
                                        </div>

                                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                                            {residence.number}
                                        </span>
                                    </div>
                                </div>

                                <div className="residence-content lg:col-span-4 lg:pb-3 lg:pl-8">
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#9A8060]">
                                        {residence.type}
                                    </p>

                                    <h3 className="mt-5 font-serif text-5xl font-light leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-[5vw]">
                                        {residence.name}
                                    </h3>

                                    <p className="mt-8 max-w-[330px] text-sm font-light leading-7 text-[#11120F]/55">
                                        {residence.description}
                                    </p>

                                    <a
                                        href="#"
                                        className="group mt-9 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em]"
                                    >
                                        <span>Discover residence</span>
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#11120F]/20 transition-all duration-500 group-hover:bg-[#11120F] group-hover:text-[#E8E4DB]">
                                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="res-final relative h-[85vh] min-h-[650px] overflow-hidden">
                <div className="res-final-image absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=90&w=2600&auto=format&fit=crop"
                        alt="Luxury modern home at dusk"
                        className="h-full w-full object-cover will-change-transform"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
                </div>

                <div className="res-final-content absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20 xl:px-24">
                    <div className="max-w-[850px]">
                        <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C5A880]">
                            Find your place
                        </p>

                        <h2 className="font-serif text-[15vw] font-light leading-[0.8] tracking-[-0.07em] sm:text-[11vw] lg:text-[8vw]">
                            Your next
                            <br />
                            <em className="text-[#C5A880]">chapter.</em>
                        </h2>

                        <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-center">
                            <p className="max-w-[350px] text-sm font-light leading-7 text-white/60">
                                Begin a private conversation about a residence
                                selected around the way you want to live.
                            </p>

                            <a
                                href="#"
                                className="group inline-flex w-fit items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em]"
                            >
                                <span>Begin a conversation</span>
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:bg-white group-hover:text-[#090A0D]">
                                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}