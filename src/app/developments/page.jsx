'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowUpRight, Sparkles, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   1. INTERACTIVE 3D PROCEDURAL ARCHITECTURAL CANVAS
========================================================= */
function DynamicDevelopment3D({ progress, activeStage }) {
    const groupRef = useRef();
    const coreRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;

        // Smooth rotation based on scroll progress and time delta
        const targetRotationY = progress * Math.PI * 2.5 + state.clock.getElapsedTime() * 0.08;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            targetRotationY,
            0.05
        );

        // Smooth elevation change based on active stage
        const targetY = activeStage === 2 ? 0.3 : activeStage === 1 ? -0.2 : -0.5;
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

        // Subtle structural pulsing effect on the core
        if (coreRef.current) {
            coreRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.03;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <group ref={groupRef} position={[0, -0.5, 0]} scale={[1.1, 1.1, 1.1]}>
                {/* Monolithic Concrete Core */}
                <mesh ref={coreRef} castShadow receiveShadow position={[0, 1.8, 0]}>
                    <boxGeometry args={[1.6, 3.8, 1.6]} />
                    <meshStandardMaterial color="#14161f" roughness={0.25} metalness={0.85} />
                </mesh>

                {/* Sky Terraces & Dynamic Cantilevers */}
                {[0.6, 1.4, 2.2, 3.0].map((y, i) => (
                    <group key={i} position={[0, y, 0]}>
                        {/* Brass Slab Edge */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[2.2, 0.08, 2.2]} />
                            <meshStandardMaterial color="#c5a880" roughness={0.2} metalness={0.9} />
                        </mesh>
                        {/* High-Gloss Tinted Glass Enclosure */}
                        <mesh position={[i % 2 === 0 ? 0.1 : -0.1, -0.35, 0]}>
                            <boxGeometry args={[2.1, 0.65, 2.1]} />
                            <meshPhysicalMaterial
                                color={i % 2 === 0 ? '#38586c' : '#2d3342'}
                                transmission={0.7}
                                opacity={0.6}
                                transparent
                                roughness={0.1}
                                thickness={0.8}
                                clearcoat={1}
                            />
                        </mesh>
                    </group>
                ))}

                {/* Structural Crown Accent */}
                <mesh position={[0, 3.85, 0]} castShadow>
                    <boxGeometry args={[2.3, 0.15, 2.3]} />
                    <meshStandardMaterial color="#c5a880" roughness={0.1} metalness={0.95} />
                </mesh>

                {/* Ground Reflective Base Deck */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                    <planeGeometry args={[6, 6]} />
                    <meshStandardMaterial color="#0b0d12" roughness={0.4} metalness={0.6} />
                </mesh>
            </group>
        </Float>
    );
}

/* =========================================================
   2. DATA DEFINITIONS
========================================================= */
const DEVELOPMENT_METRICS = [
    { label: 'Vertical Levels', value: '38', sub: 'Storeys of distinction' },
    { label: 'Total Footprint', value: '1.4M', sub: 'Square feet engineered' },
    { label: 'Completion Target', value: 'Q4 2027', sub: 'Under active construction' },
    { label: 'Sustainability Rating', value: 'LEED Platinum', sub: 'Zero-carbon framework' },
];

const STAGES = [
    {
        stage: '01',
        category: 'FOUNDATION & CONTEXT',
        title: 'AN URBAN LANDMARK REDEFINED.',
        description:
            'Engineered at the intersection of architectural restraint and structural daring. A monolithic icon sculpted to maximize natural daylighting, natural wind funnels, and private sky garden integration.',
        features: ['Automated Dynamic Glass Facade', 'Biophilic Double-Height Atriums', 'Subterranean Valet Matrix'],
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    },
    {
        stage: '02',
        category: 'FACADE ENGINEERING',
        title: 'STRUCTURE BECOMES IDENTITY.',
        description:
            'Featuring custom structural steel exoskeletons, double-skin high-thermal glass, and precision-milled brushed bronze louvers that automatically pivot with the sun’s daily trajectory.',
        features: ['Smart Sun-Tracking Louvers', 'Ultra-Low Emissivity Glazing', 'Acoustic Sound Barrier Tech'],
        img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    },
    {
        stage: '03',
        category: 'THE SKY EXPERIENCE',
        title: 'ARCHITECTURE IN MOTION.',
        description:
            'Terminating in cascading triplex penthouses with cantilevered heated infinity sky pools, private helipad landing access, and uninterrupted 360-degree panoramic horizons.',
        features: ['Cantilevered Sky Pools', 'Private High-Speed Elevators', '24/7 Dedicated Concierge'],
        img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop',
    },
];

/* =========================================================
   3. MAIN DEVELOPMENT PAGE COMPONENT
========================================================= */
export default function DevelopmentPage() {
    const mainRef = useRef(null);
    const pinSectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeStage, setActiveStage] = useState(0);
    const [view3D, setView3D] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero typography entrance
            gsap.from('[data-hero-el]', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.12,
                ease: 'power4.out',
            });

            // Pinned Section & Interactive Multi-Stage Scrub Timeline
            const slides = gsap.utils.toArray('.stage-slide');
            const bgImages = gsap.utils.toArray('.stage-bg-img');

            // Set initial state for slides 2 & 3
            slides.forEach((slide, i) => {
                if (i !== 0) {
                    gsap.set(slide, { autoAlpha: 0, y: 40 });
                    gsap.set(bgImages[i], { autoAlpha: 0, scale: 1.1 });
                }
            });

            const pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinSectionRef.current,
                    start: 'top top',
                    end: '+=300%',
                    pin: true,
                    scrub: 0.7,
                    onUpdate: (self) => {
                        setScrollProgress(self.progress);
                        if (self.progress < 0.33) setActiveStage(0);
                        else if (self.progress < 0.66) setActiveStage(1);
                        else setActiveStage(2);
                    },
                },
            });

            // Transition: Stage 0 -> Stage 1
            pinTl
                .to(slides[0], { autoAlpha: 0, y: -40, duration: 1 }, '+=0.5')
                .to(bgImages[0], { autoAlpha: 0, scale: 1.05, duration: 1 }, '<')
                .to(slides[1], { autoAlpha: 1, y: 0, duration: 1 }, '<0.2')
                .to(bgImages[1], { autoAlpha: 1, scale: 1, duration: 1 }, '<');

            // Transition: Stage 1 -> Stage 2
            pinTl
                .to(slides[1], { autoAlpha: 0, y: -40, duration: 1 }, '+=0.5')
                .to(bgImages[1], { autoAlpha: 0, scale: 1.05, duration: 1 }, '<')
                .to(slides[2], { autoAlpha: 1, y: 0, duration: 1 }, '<0.2')
                .to(bgImages[2], { autoAlpha: 1, scale: 1, duration: 1 }, '<');

            // Generic reveal animations on scroll
            gsap.utils.toArray('[data-reveal]').forEach((el) => {
                gsap.from(el, {
                    y: 45,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    },
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="bg-[#090A0D] text-[#F4F1EA] selection:bg-[#C5A880] selection:text-[#090A0D]">
            {/* HERO SECTION */}
            <section className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-16 pt-32 px-6 md:px-12 lg:px-16">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        alt="Flagship Development"
                        fill
                        priority
                        className="object-cover object-center brightness-75 scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/60 to-black/40" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#090A0D_90%)]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-7xl">
                    <div data-hero-el className="mb-6 flex items-center gap-3">
                        <span className="h-px w-10 bg-[#C5A880]" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                            Flagship Development 01 — Sector 4
                        </span>
                    </div>

                    <h1
                        data-hero-el
                        className="font-serif text-[clamp(3.2rem,8.5vw,8.5rem)] font-light leading-[0.88] tracking-[-0.05em] text-[#F4F1EA]"
                    >
                        THE <span className="italic text-[#C5A880]">ARCLINE</span>
                        <br />
                        TOWER.
                    </h1>

                    <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-12 md:items-end">
                        <p data-hero-el className="max-w-xl text-sm font-light leading-relaxed text-white/60 md:col-span-7 md:text-base">
                            A high-density commercial and residential landmark engineered around spatial fluidity, double-skin louver facades, and zero-carbon environmental systems.
                        </p>

                        <div data-hero-el className="flex items-center justify-start gap-4 md:col-span-5 md:justify-end">
                            <button
                                onClick={() => setView3D(!view3D)}
                                className="group relative inline-flex items-center gap-3 rounded-full border border-[#C5A880]/40 bg-[#12141C]/80 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C5A880] backdrop-blur-md transition-all duration-500 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-[#090A0D]"
                            >
                                <Sparkles size={14} className="animate-spin-slow" />
                                <span>{view3D ? 'Hide 3D Model' : 'Inspect 3D Structural Model'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 right-6 z-10 hidden md:block">
                    <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">
                        <span>Scroll To Explore</span>
                        <div className="h-8 w-px bg-white/20 relative overflow-hidden">
                            <div className="absolute top-0 h-1/2 w-full bg-[#C5A880] animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERACTIVE 3D MODEL CANVAS */}
            {view3D && (
                <div className="relative border-y border-[#C5A880]/30 bg-[#0B0D12] px-6 py-12 transition-all duration-500">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">
                                    Live Spatial Renderer
                                </span>
                                <h3 className="font-serif text-2xl font-light text-white">Interactive Architectural Axis</h3>
                            </div>
                            <button
                                onClick={() => setView3D(false)}
                                className="rounded-full border border-white/10 px-4 py-2 text-[9px] uppercase tracking-widest text-white/50 hover:border-white/30 hover:text-white"
                            >
                                Close Canvas ✕
                            </button>
                        </div>

                        <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#060709]">
                            <Canvas camera={{ position: [6, 4, 6], fov: 40 }} gl={{ antialias: true }} shadows>
                                <ambientLight intensity={0.8} />
                                <directionalLight position={[10, 15, 10]} intensity={2} castShadow color="#fffaf0" />
                                <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#c5a880" />
                                <Suspense
                                    fallback={
                                        <Html center className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                                            Loading 3D Geometry...
                                        </Html>
                                    }
                                >
                                    <DynamicDevelopment3D progress={scrollProgress} activeStage={activeStage} />
                                    <Environment preset="city" />
                                    <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={8} blur={2} far={4} />
                                </Suspense>
                            </Canvas>
                            <div className="absolute bottom-4 left-4 z-10 pointer-events-none rounded-xl border border-white/10 bg-[#090A0D]/80 backdrop-blur-md px-4 py-2 text-[9px] font-mono text-white/50">
                                Drag to Orbit • Scroll to Scrub Layers
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* METRICS GRID */}
            <section className="border-t border-white/10 bg-[#0B0D12] px-6 py-20 md:px-12 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
                        {DEVELOPMENT_METRICS.map((item, idx) => (
                            <div key={idx} data-reveal className="border-l border-[#C5A880]/30 pl-6">
                                <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-[#C5A880]">
                                    {item.label}
                                </span>
                                <div className="mt-2 font-serif text-3xl font-light text-white md:text-5xl">
                                    {item.value}
                                </div>
                                <span className="mt-1 block text-xs font-light text-white/40">
                                    {item.sub}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PINNED MULTI-STAGE SCROLL SHOWCASE */}
            <section ref={pinSectionRef} className="relative h-screen overflow-hidden bg-[#090A0D]">
                <div className="absolute inset-0 z-0">
                    {STAGES.map((item) => (
                        <div key={item.stage} className="stage-bg-img absolute inset-0 transition-all duration-700">
                            <Image src={item.img} alt={item.title} fill className="object-cover object-center" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D] via-[#090A0D]/85 to-transparent md:w-3/4" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    ))}
                </div>

                <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-16">
                    <div className="mx-auto w-full max-w-7xl">
                        <div className="relative max-w-2xl">
                            {STAGES.map((item, idx) => (
                                <div
                                    key={item.stage}
                                    className={`stage-slide ${idx === 0 ? 'relative' : 'absolute top-0 left-0 w-full'
                                        } flex flex-col justify-center`}
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="font-mono text-xs text-[#C5A880]">{item.stage}</span>
                                        <span className="h-px w-8 bg-[#C5A880]/50" />
                                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
                                            {item.category}
                                        </span>
                                    </div>

                                    <h2 className="font-serif text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                                        {item.title}
                                    </h2>

                                    <p className="mt-6 text-sm font-light leading-relaxed text-white/70 md:text-base">
                                        {item.description}
                                    </p>

                                    <div className="mt-8 space-y-2.5 border-t border-white/10 pt-6">
                                        {item.features.map((feat, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-3 text-xs font-light text-white/80">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#C5A880]">
                                                    <Check size={11} />
                                                </span>
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 right-6 z-20 flex gap-2 md:right-16">
                    {STAGES.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 transition-all duration-500 rounded-full ${activeStage === i ? 'w-12 bg-[#C5A880]' : 'w-3 bg-white/20'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* EDITORIAL GALLERY SECTION */}
            <section className="border-t border-white/10 bg-[#0E1017] px-6 py-28 md:px-12 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <div data-reveal className="max-w-2xl">
                        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                            Architectural Precision
                        </span>
                        <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-white md:text-5xl">
                            Form follows <span className="italic text-[#C5A880]">intention.</span>
                        </h2>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2">
                        <div data-reveal className="group relative h-[480px] overflow-hidden rounded-2xl border border-white/10 bg-[#12141C]">
                            <Image
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                                alt="Exterior Facade"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880]">
                                    01 // EXTERIOR ENCLOSURE
                                </span>
                                <h3 className="mt-2 font-serif text-2xl font-light text-white">
                                    Double-Skin Kinetic Facade
                                </h3>
                                <p className="mt-2 text-xs font-light leading-relaxed text-white/50">
                                    High-performance louver modules providing micro-climate regulation and dynamic daylight control throughout all seasons.
                                </p>
                            </div>
                        </div>

                        <div data-reveal className="group relative h-[480px] overflow-hidden rounded-2xl border border-white/10 bg-[#12141C]">
                            <Image
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                                alt="Sky Penthouse Sanctuary"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-8 left-8 right-8">
                                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880]">
                                    02 // INTERIOR VOLUME
                                </span>
                                <h3 className="mt-2 font-serif text-2xl font-light text-white">
                                    Sky Sanctuary Interiors
                                </h3>
                                <p className="mt-2 text-xs font-light leading-relaxed text-white/50">
                                    Seamlessly harmonizing exposed architectural concrete with warm minimalist travertine and smoked oak finishes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INQUIRY CTA SECTION */}
            <section className="relative border-t border-white/10 bg-[#060709] px-6 py-32 md:px-12 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <div data-reveal className="max-w-3xl">
                        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                            Private Acquisition
                        </span>
                        <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-white md:text-7xl">
                            Request structural <br />
                            <span className="italic text-[#C5A880]">dossier & blueprints.</span>
                        </h2>
                        <p className="mt-8 max-w-xl text-sm font-light leading-relaxed text-white/50 md:text-base">
                            Access confidential floor plan matrixes, engineering schedules, and register for private atelier consultations.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href="/contact?property=lume-penthouse"
                                className="inline-flex items-center gap-3 rounded-full bg-[#C5A880] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#090A0D] transition-all duration-300 hover:bg-[#F4F1EA]"
                            >
                                <span>Schedule Consultation</span>
                                <ArrowUpRight size={15} />
                            </Link>

                            <Link
                                href="/residences"
                                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                            >
                                <span>Browse Residences</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}