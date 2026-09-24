'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_VIDEO_URL =
    'https://res.cloudinary.com/da8gaio3l/video/upload/v1789282477/output_qivthk.mp4';

const MOBILE_VIDEO_URL =
    'https://res.cloudinary.com/da8gaio3l/video/upload/v1790233202/From_Klickpin.com-_7_Trending_Clean_Girl_Makeup_Looks_for_Right_Now-pin-id-896216394613598828_online-video-cutter.com_gbacfq.mp4';

const scenes = [
    {
        id: '01',
        eyebrow: 'A new way to live',
        lines: ['Live', 'beautifully.'],
        description:
            'Exceptional residences designed around light, space and the way you want to live.',
        button: 'Explore residences',
        href: '#residences'
    },
    {
        id: '02',
        eyebrow: 'Architecture with purpose',
        lines: ['Made for', 'living.'],
        description:
            'Refined spaces, considered details and an atmosphere that feels unmistakably yours.',
        button: null,
        href: null
    },
    {
        id: '03',
        eyebrow: 'Find somewhere extraordinary',
        lines: ['Find your', 'place.'],
        description:
            'Discover homes created for the moments that matter and the life you want to build.',
        button: 'View properties',
        href: '#properties'
    }
];

export default function HeroSection() {
    const sectionRef = useRef(null);
    const desktopVideoRef = useRef(null);
    const scenesRef = useRef([]);
    const indicatorsRef = useRef([]);
    const scrollIndicatorRef = useRef(null);
    const [isVideoReady, setIsVideoReady] = useState(false);

    useEffect(() => {
        const video = desktopVideoRef.current;
        const section = sectionRef.current;
        if (!section) return;

        // Use gsap.matchMedia to execute ScrollTrigger ONLY on desktop screens
        const mm = gsap.matchMedia();

        mm.add('(min-width: 768px)', () => {
            const initDesktopAnimations = () => {
                if (!video || !video.duration || isNaN(video.duration)) return;

                setIsVideoReady(true);
                video.pause();
                video.currentTime = 0;

                const sceneElements = scenesRef.current;
                const totalDuration = 10;

                sceneElements.forEach((scene, index) => {
                    if (!scene) return;

                    const eyebrow = scene.querySelector('.hero-eyebrow');
                    const lines = scene.querySelectorAll('.hero-line');
                    const description = scene.querySelector('.hero-description');
                    const button = scene.querySelector('.hero-button');

                    gsap.set(scene, { autoAlpha: index === 0 ? 1 : 0 });
                    gsap.set(eyebrow, {
                        opacity: index === 0 ? 1 : 0,
                        y: index === 0 ? 0 : 20
                    });
                    gsap.set(lines, {
                        opacity: index === 0 ? 1 : 0,
                        y: index === 0 ? 0 : 60
                    });
                    gsap.set(description, {
                        opacity: index === 0 ? 1 : 0,
                        y: index === 0 ? 0 : 24
                    });
                    if (button) {
                        gsap.set(button, {
                            opacity: index === 0 ? 1 : 0,
                            y: index === 0 ? 0 : 20
                        });
                    }
                });

                indicatorsRef.current.forEach((ind, idx) => {
                    if (!ind) return;
                    gsap.set(ind, {
                        opacity: idx === 0 ? 1 : 0.35,
                        scale: idx === 0 ? 1.1 : 1
                    });
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1.2,
                        invalidateOnRefresh: true
                    }
                });

                tl.to(
                    video,
                    {
                        currentTime: video.duration,
                        ease: 'none',
                        duration: totalDuration
                    },
                    0
                );

                if (scrollIndicatorRef.current) {
                    tl.to(
                        scrollIndicatorRef.current,
                        {
                            opacity: 0,
                            y: 20,
                            duration: 0.6,
                            ease: 'power2.out'
                        },
                        0
                    );
                }

                // Scene 0 Animations
                const s0 = sceneElements[0];
                if (s0) {
                    const eyebrow = s0.querySelector('.hero-eyebrow');
                    const lines = s0.querySelectorAll('.hero-line');
                    const description = s0.querySelector('.hero-description');
                    const button = s0.querySelector('.hero-button');

                    tl.to(
                        [eyebrow, description, button].filter(Boolean),
                        {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            stagger: 0.05,
                            ease: 'power2.in'
                        },
                        2.0
                    )
                        .to(
                            lines,
                            {
                                opacity: 0,
                                y: -50,
                                duration: 0.5,
                                stagger: 0.06,
                                ease: 'power3.in'
                            },
                            2.05
                        )
                        .to(s0, { autoAlpha: 0, duration: 0.01 }, 2.6);
                }

                // Scene 1 Animations
                const s1 = sceneElements[1];
                if (s1) {
                    const eyebrow = s1.querySelector('.hero-eyebrow');
                    const lines = s1.querySelectorAll('.hero-line');
                    const description = s1.querySelector('.hero-description');

                    tl.to(s1, { autoAlpha: 1, duration: 0.01 }, 2.7)
                        .to(
                            eyebrow,
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                            2.75
                        )
                        .to(
                            lines,
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                stagger: 0.08,
                                ease: 'power3.out'
                            },
                            2.8
                        )
                        .to(
                            description,
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                            2.9
                        );

                    tl.to(
                        [eyebrow, description],
                        {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            stagger: 0.05,
                            ease: 'power2.in'
                        },
                        5.5
                    )
                        .to(
                            lines,
                            {
                                opacity: 0,
                                y: -50,
                                duration: 0.5,
                                stagger: 0.06,
                                ease: 'power3.in'
                            },
                            5.55
                        )
                        .to(s1, { autoAlpha: 0, duration: 0.01 }, 6.1);
                }

                // Scene 2 Animations
                const s2 = sceneElements[2];
                if (s2) {
                    const eyebrow = s2.querySelector('.hero-eyebrow');
                    const lines = s2.querySelectorAll('.hero-line');
                    const description = s2.querySelector('.hero-description');
                    const button = s2.querySelector('.hero-button');

                    tl.to(s2, { autoAlpha: 1, duration: 0.01 }, 6.2)
                        .to(
                            eyebrow,
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                            6.25
                        )
                        .to(
                            lines,
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                stagger: 0.08,
                                ease: 'power3.out'
                            },
                            6.3
                        )
                        .to(
                            description,
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                            6.4
                        );
                    if (button) {
                        tl.to(
                            button,
                            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                            6.45
                        );
                    }
                }

                const ind0 = indicatorsRef.current[0];
                const ind1 = indicatorsRef.current[1];
                const ind2 = indicatorsRef.current[2];

                if (ind0 && ind1) {
                    tl.to(ind0, { opacity: 0.35, scale: 1, duration: 0.4 }, 2.5)
                        .to(ind1, { opacity: 1, scale: 1.1, duration: 0.4 }, 2.6);
                }

                if (ind1 && ind2) {
                    tl.to(ind1, { opacity: 0.35, scale: 1, duration: 0.4 }, 5.9)
                        .to(ind2, { opacity: 1, scale: 1.1, duration: 0.4 }, 6.0);
                }
            };

            if (video) {
                if (video.readyState >= 1) {
                    initDesktopAnimations();
                } else {
                    video.addEventListener('loadedmetadata', initDesktopAnimations);
                }
            }

            return () => {
                if (video) {
                    video.removeEventListener('loadedmetadata', initDesktopAnimations);
                }
            };
        });

        return () => mm.revert();
    }, []);

    const mobileScene = scenes[0];

    return (
        <section
            ref={sectionRef}
            className="relative h-screen md:h-[350vh] w-full bg-[#08090b]"
        >
            {/* MOBILE VIEW (no scrolltrigger, normal looping background video + single text overlay) */}
            <div className="relative h-full w-full overflow-hidden md:hidden flex items-center">
                <video
                    src={MOBILE_VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
                />

                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-black/30 pointer-events-none" />

                <div className="relative z-10 px-6 w-full">
                    <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-[#c5a880]">
                        {mobileScene.eyebrow}
                    </div>

                    <h1 className="font-serif text-[3.2rem] font-light leading-[0.9] tracking-[-0.05em] text-[#f4f1ea]">
                        {mobileScene.lines.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </h1>

                    <p className="mt-5 max-w-[320px] text-[13px] leading-[1.7] text-white/80">
                        {mobileScene.description}
                    </p>

                    {mobileScene.button && (
                        <a
                            href={mobileScene.href || '#'}
                            className="group mt-7 inline-flex items-center gap-3"
                        >
                            <span className="text-[10px] uppercase tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-[#c5a880]">
                                {mobileScene.button}
                            </span>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition-all duration-300 group-hover:border-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#08090b]">
                                <ArrowUpRight
                                    size={14}
                                    strokeWidth={1.2}
                                    className="transition-transform duration-300 group-hover:rotate-45"
                                />
                            </span>
                        </a>
                    )}
                </div>
            </div>

            {/* DESKTOP VIEW (keeps original 350vh pinned GSAP scroll trigger timeline) */}
            <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden">
                <video
                    ref={desktopVideoRef}
                    src={DESKTOP_VIDEO_URL}
                    muted
                    playsInline
                    preload="auto"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 pointer-events-none select-none ${isVideoReady ? 'opacity-100' : 'opacity-0'
                        }`}
                />

                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-black/20 pointer-events-none" />

                <div className="absolute inset-0">
                    {scenes.map((scene, index) => (
                        <div
                            key={scene.id}
                            ref={(element) => {
                                scenesRef.current[index] = element;
                            }}
                            className="absolute inset-0 flex items-center"
                        >
                            <div className="ml-[7vw] w-[86vw] max-w-[760px] md:ml-[8vw]">
                                <div className="hero-eyebrow mb-7 text-[9px] font-medium uppercase tracking-[0.45em] text-[#c5a880] will-change-transform">
                                    {scene.eyebrow}
                                </div>

                                <h1 className="font-serif text-[clamp(4.2rem,9vw,9.5rem)] font-light leading-[0.82] tracking-[-0.075em] text-[#f4f1ea]">
                                    {scene.lines.map((line) => (
                                        <span
                                            key={line}
                                            className="hero-line block will-change-transform"
                                        >
                                            {line}
                                        </span>
                                    ))}
                                </h1>

                                <p className="hero-description mt-8 max-w-[390px] text-[13px] leading-[1.8] text-white/60 will-change-transform">
                                    {scene.description}
                                </p>

                                {scene.button && (
                                    <a
                                        href={scene.href || '#'}
                                        className="hero-button group mt-9 inline-flex items-center gap-4 will-change-transform"
                                    >
                                        <span className="text-[9px] uppercase tracking-[0.3em] text-white transition-colors duration-300 group-hover:text-[#c5a880]">
                                            {scene.button}
                                        </span>

                                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:border-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-[#08090b]">
                                            <ArrowUpRight
                                                size={15}
                                                strokeWidth={1.2}
                                                className="transition-transform duration-500 group-hover:rotate-45"
                                            />
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex pointer-events-none">
                    {scenes.map((scene, idx) => (
                        <div
                            key={scene.id}
                            ref={(element) => {
                                indicatorsRef.current[idx] = element;
                            }}
                            className="flex items-center gap-3 transition-colors duration-300"
                        >
                            <span className="text-[10px] font-mono tracking-widest text-white/70">
                                {scene.id}
                            </span>
                            <div className="h-[2px] w-6 bg-white/40" />
                        </div>
                    ))}
                </div>

                <div
                    ref={scrollIndicatorRef}
                    className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">
                        Scroll to explore
                    </span>
                    <div className="h-7 w-[1px] bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
                </div>

                <div className="pointer-events-none absolute bottom-0 left-0 h-[22vh] w-full bg-gradient-to-t from-[#08090b] to-transparent" />
            </div>
        </section>
    );
}