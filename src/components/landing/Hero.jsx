'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROPERTIES = [
    {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=90&w=2200&auto=format&fit=crop',
        type: 'Private Residence',
        location: 'Los Angeles, California',
        description: 'A refined architectural residence shaped by natural light, quiet proportions, and complete privacy.',
    },
    {
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=90&w=2200&auto=format&fit=crop',
        type: 'Coastal Estate',
        location: 'Malibu, California',
        description: 'An exceptional coastal retreat where sculptural architecture meets the endless Pacific horizon.',
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=2200&auto=format&fit=crop',
        type: 'Architectural Residence',
        location: 'Palm Springs, California',
        description: 'A considered composition of stone, glass, and open space immersed in the surrounding desert.',
    },
];

export default function HeroSection() {
    const root = useRef(null);
    const imageFrame = useRef(null);
    const heroContent = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = root.current;
            const frame = imageFrame.current;
            const content = heroContent.current;

            const images = gsap.utils.toArray('.property-image');
            const propertyInfo = gsap.utils.toArray('.property-info');

            if (!section || !frame || !content || images.length !== 3) return;

            gsap.set(images, {
                opacity: 0,
                scale: 1.08,
            });

            gsap.set(images[0], {
                opacity: 1,
                scale: 1,
            });

            gsap.set(propertyInfo, {
                opacity: 0,
                y: 40,
            });

            const intro = gsap.timeline();

            intro
                .from('.hero-eyebrow', {
                    y: 25,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                })
                .from(
                    '.hero-line',
                    {
                        yPercent: 110,
                        opacity: 0,
                        duration: 1.1,
                        stagger: 0.1,
                        ease: 'power4.out',
                    },
                    '-=0.55'
                )
                .from(
                    '.hero-description',
                    {
                        y: 25,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.7'
                )
                .from(
                    '.hero-button',
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.5'
                )
                .fromTo(
                    frame,
                    {
                        clipPath: 'inset(0 100% 0 0)',
                    },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        duration: 1.4,
                        ease: 'power4.inOut',
                    },
                    '-=1.1'
                );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                },
            });

            tl.to(
                content,
                {
                    y: -120,
                    opacity: 0,
                    duration: 0.18,
                    ease: 'power2.inOut',
                },
                0.02
            );

            tl.to(
                frame,
                {
                    top: '3%',
                    right: '0%',
                    width: '100%',
                    height: '94%',
                    borderRadius: 0,
                    duration: 0.28,
                    ease: 'power3.inOut',
                },
                0.08
            );

            tl.to(
                images[0],
                {
                    scale: 1.04,
                    duration: 0.22,
                    ease: 'none',
                },
                0
            );

            tl.to(
                images[0],
                {
                    opacity: 0,
                    scale: 1.08,
                    duration: 0.08,
                    ease: 'power2.inOut',
                },
                0.27
            );

            tl.fromTo(
                images[1],
                {
                    opacity: 0,
                    scale: 1.1,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.12,
                    ease: 'power3.out',
                },
                0.29
            );

            tl.to(
                images[1],
                {
                    scale: 1.045,
                    duration: 0.22,
                    ease: 'none',
                },
                0.41
            );

            tl.fromTo(
                propertyInfo[0],
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.1,
                    ease: 'power3.out',
                },
                0.34
            );

            tl.to(
                propertyInfo[0],
                {
                    opacity: 0,
                    y: -30,
                    duration: 0.08,
                    ease: 'power2.in',
                },
                0.52
            );

            tl.to(
                images[1],
                {
                    opacity: 0,
                    scale: 1.08,
                    duration: 0.08,
                    ease: 'power2.inOut',
                },
                0.54
            );

            tl.fromTo(
                images[2],
                {
                    opacity: 0,
                    scale: 1.1,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.13,
                    ease: 'power3.out',
                },
                0.56
            );

            tl.to(
                images[2],
                {
                    scale: 1.04,
                    duration: 0.27,
                    ease: 'none',
                },
                0.69
            );

            tl.fromTo(
                propertyInfo[1],
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.1,
                    ease: 'power3.out',
                },
                0.61
            );

            tl.to(
                propertyInfo[1],
                {
                    opacity: 0,
                    y: -30,
                    duration: 0.1,
                    ease: 'power2.in',
                },
                0.88
            );

            tl.to(
                frame,
                {
                    scale: 0.985,
                    duration: 0.12,
                    ease: 'power2.out',
                },
                0.88
            );
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={root}
            className="relative h-[450vh] w-full bg-[#090A0D] text-[#F4F1EA]"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#090A0D]" />

                <div className="absolute left-[35%] top-[25%] h-[55vh] w-[45vw] rounded-full bg-[#C5A880]/[0.045] blur-[150px]" />

                <div
                    ref={imageFrame}
                    className="absolute right-[4vw] top-[10vh] z-[2] h-[82vh] w-[58vw] overflow-hidden rounded-[3px] bg-[#141518] will-change-transform"
                >
                    {PROPERTIES.map((property, index) => (
                        <img
                            key={property.image}
                            src={property.image}
                            alt={property.type}
                            className={`property-image absolute inset-0 h-full w-full object-cover ${index === 0 ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    ))}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,transparent_25%,rgba(0,0,0,0.3)_100%)]" />

                    <div className="pointer-events-none absolute bottom-8 left-8 z-20 sm:bottom-10 sm:left-10">
                        {PROPERTIES.slice(1).map((property) => (
                            <div
                                key={property.location}
                                className="property-info absolute bottom-0 left-0 w-[min(75vw,420px)]"
                            >
                                <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#C5A880]">
                                    {property.type}
                                </p>

                                <h2 className="mt-3 font-serif text-3xl font-light leading-none text-white sm:text-4xl">
                                    {property.location}
                                </h2>

                                <p className="mt-4 max-w-[380px] text-xs font-light leading-6 tracking-wide text-white/65 sm:text-sm">
                                    {property.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    ref={heroContent}
                    className="relative z-10 flex h-full items-center"
                >
                    <div className="w-full px-6 pt-24 sm:px-10 lg:px-16 xl:px-24">
                        <div className="max-w-[640px]">
                            <div className="hero-eyebrow mb-7 flex items-center gap-4">
                                <span className="h-px w-10 bg-[#C5A880]" />

                                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A880]">
                                    Private Real Estate
                                </span>
                            </div>

                            <h1 className="overflow-hidden font-serif text-[16vw] font-light leading-[0.82] tracking-[-0.065em] sm:text-[12vw] lg:text-[8.2vw] xl:text-[7.5vw]">
                                <span className="hero-line block">
                                    Homes
                                </span>

                                <span className="hero-line block">
                                    <span className="italic text-[#C5A880]">
                                        beyond
                                    </span>
                                </span>

                                <span className="hero-line block">
                                    ordinary.
                                </span>
                            </h1>

                            <p className="hero-description mt-9 max-w-[420px] text-sm font-light leading-7 tracking-wide text-[#F4F1EA]/55 sm:text-[15px]">
                                Exceptional residences and architectural
                                landmarks selected for those who expect more
                                from where they live.
                            </p>

                            <div className="mt-9">
                                <a
                                    href="#residences"
                                    className="hero-button group inline-flex items-center gap-4 rounded-full bg-[#C5A880] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#090A0D] transition-all duration-500 hover:bg-[#F4F1EA]"
                                >
                                    <span>Explore residences</span>

                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#090A0D]/10">
                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}