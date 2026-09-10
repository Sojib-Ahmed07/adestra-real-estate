'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL =
    'https://videos.pexels.com/video-files/30670725/13125568_1920_1080_30fps.mp4';

const scenes = [
    {
        eyebrow: 'A new way to live',
        lines: ['Live', 'beautifully.'],
        description:
            'Exceptional residences designed around light, space and the way you want to live.',
        button: 'Explore residences'
    },
    {
        eyebrow: 'Architecture with purpose',
        lines: ['Made for', 'living.'],
        description:
            'Refined spaces, considered details and an atmosphere that feels unmistakably yours.',
        button: null
    },
    {
        eyebrow: 'Find somewhere extraordinary',
        lines: ['Find your', 'place.'],
        description:
            'Discover homes created for the moments that matter and the life you want to build.',
        button: 'View properties'
    }
];

export default function HeroSection() {
    const section = useRef(null);
    const video = useRef(null);
    const scenesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sceneElements = scenesRef.current;

            sceneElements.forEach((scene, index) => {
                if (!scene) return;

                const eyebrow = scene.querySelector('.hero-eyebrow');
                const lines = scene.querySelectorAll('.hero-line');
                const description = scene.querySelector('.hero-description');
                const button = scene.querySelector('.hero-button');

                gsap.set(scene, {
                    autoAlpha: index === 0 ? 1 : 0
                });

                gsap.set(eyebrow, {
                    opacity: index === 0 ? 1 : 0,
                    y: index === 0 ? 0 : 18
                });

                gsap.set(lines, {
                    opacity: index === 0 ? 1 : 0,
                    y: index === 0 ? 0 : 70
                });

                gsap.set(description, {
                    opacity: index === 0 ? 1 : 0,
                    y: index === 0 ? 0 : 20
                });

                if (button) {
                    gsap.set(button, {
                        opacity: index === 0 ? 1 : 0,
                        y: index === 0 ? 0 : 18
                    });
                }
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                    invalidateOnRefresh: true
                }
            });

            const sceneIn = (scene) => {
                const eyebrow = scene.querySelector('.hero-eyebrow');
                const lines = scene.querySelectorAll('.hero-line');
                const description = scene.querySelector('.hero-description');
                const button = scene.querySelector('.hero-button');

                timeline
                    .to(
                        scene,
                        {
                            autoAlpha: 1,
                            duration: 0.01
                        },
                        '>'
                    )
                    .to(
                        eyebrow,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.22,
                            ease: 'power2.out'
                        },
                        '<'
                    )
                    .to(
                        lines,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.48,
                            stagger: 0.09,
                            ease: 'power3.out'
                        },
                        '<0.05'
                    )
                    .to(
                        description,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        },
                        '<0.2'
                    );

                if (button) {
                    timeline.to(
                        button,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.28,
                            ease: 'power2.out'
                        },
                        '<0.06'
                    );
                }

                timeline.to({}, { duration: 0.7 });
            };

            const sceneOut = (scene) => {
                const eyebrow = scene.querySelector('.hero-eyebrow');
                const lines = scene.querySelectorAll('.hero-line');
                const description = scene.querySelector('.hero-description');
                const button = scene.querySelector('.hero-button');

                if (button) {
                    timeline.to(
                        button,
                        {
                            opacity: 0,
                            y: -18,
                            duration: 0.16,
                            ease: 'power2.inOut'
                        },
                        '>'
                    );
                }

                timeline
                    .to(
                        description,
                        {
                            opacity: 0,
                            y: -22,
                            duration: 0.2,
                            ease: 'power2.inOut'
                        },
                        '<0.04'
                    )
                    .to(
                        eyebrow,
                        {
                            opacity: 0,
                            y: -16,
                            duration: 0.18,
                            ease: 'power2.inOut'
                        },
                        '<0.05'
                    )
                    .to(
                        lines,
                        {
                            opacity: 0,
                            y: -55,
                            duration: 0.35,
                            stagger: 0.05,
                            ease: 'power3.inOut'
                        },
                        '<0.02'
                    )
                    .to(
                        scene,
                        {
                            autoAlpha: 0,
                            duration: 0.01
                        },
                        '>'
                    );

                timeline.to({}, { duration: 0.22 });
            };

            sceneIn(sceneElements[0]);
            sceneOut(sceneElements[0]);

            sceneIn(sceneElements[1]);
            sceneOut(sceneElements[1]);

            sceneIn(sceneElements[2]);

            timeline.to({}, { duration: 0.55 });

            if (video.current) {
                const play = () => {
                    const promise = video.current.play();

                    if (promise) {
                        promise.catch(() => { });
                    }
                };

                video.current.addEventListener('loadeddata', play);
                play();

                return () => {
                    video.current?.removeEventListener('loadeddata', play);
                };
            }

            ScrollTrigger.refresh();
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={section}
            className="relative h-[250vh] w-full bg-[#08090b]"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <video
                    ref={video}
                    src={VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/15" />

                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

                <div className="absolute inset-0">
                    {scenes.map((scene, index) => (
                        <div
                            key={scene.eyebrow}
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
                                        href="#properties"
                                        className="hero-button group mt-9 inline-flex items-center gap-4 will-change-transform"
                                    >
                                        <span className="text-[9px] uppercase tracking-[0.3em] text-white">
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

                <div className="pointer-events-none absolute bottom-0 left-0 h-[22vh] w-full bg-gradient-to-t from-[#08090b] to-transparent" />
            </div>
        </section>
    );
}