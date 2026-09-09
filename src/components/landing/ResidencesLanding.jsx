'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const RESIDENCES = [
    {
        number: '01',
        name: 'Casa Lume',
        location: 'Scottsdale, Arizona',
        type: 'Desert Estate',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=90',
    },
    {
        number: '02',
        name: 'Villa Nera',
        location: 'Lake Como, Italy',
        type: 'Private Villa',
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=90',
    },
    {
        number: '03',
        name: 'Maison Arco',
        location: 'Capri, Italy',
        type: 'Coastal Residence',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=90',
    },
    {
        number: '04',
        name: 'Casa Forma',
        location: 'Tulum, Mexico',
        type: 'Tropical Residence',
        image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=90',
    },
];

export default function ResidenceSlider() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const locationRef = useRef(null);
    const typeRef = useRef(null);
    const numberRef = useRef(null);
    const progressRef = useRef(null);
    const indexRef = useRef(0);
    const timerRef = useRef(null);
    const busyRef = useRef(false);
    const [active, setActive] = useState(0);

    const stopAuto = () => {
        if (timerRef.current) {
            timerRef.current.kill();
            timerRef.current = null;
        }
    };

    const startAuto = () => {
        stopAuto();
        timerRef.current = gsap.delayedCall(3, () => {
            changeSlide(indexRef.current + 1, 1);
        });
    };

    const changeSlide = (target, direction = 1) => {
        if (busyRef.current) return;

        const next = (target + RESIDENCES.length) % RESIDENCES.length;
        const current = indexRef.current;

        if (next === current) return;

        const data = RESIDENCES[next];

        busyRef.current = true;
        stopAuto();

        const image = imageRef.current;
        const title = titleRef.current;
        const location = locationRef.current;
        const type = typeRef.current;
        const number = numberRef.current;

        gsap.killTweensOf([
            image,
            title,
            location,
            type,
            number,
            progressRef.current,
        ]);

        const tl = gsap.timeline({
            onComplete: () => {
                indexRef.current = next;
                setActive(next);
                busyRef.current = false;
                startAuto();
            },
        });

        tl.to(
            [title, location, type, number],
            {
                y: direction > 0 ? -18 : 18,
                autoAlpha: 0,
                duration: 0.32,
                stagger: 0.02,
                ease: 'power2.in',
            },
            0
        );

        tl.to(
            image,
            {
                scale: 1.06,
                autoAlpha: 0,
                duration: 0.42,
                ease: 'power2.in',
                onComplete: () => {
                    image.src = data.image;
                    title.textContent = data.name;
                    location.textContent = data.location;
                    type.textContent = data.type;
                    number.textContent = data.number;
                },
            },
            0.08
        );

        tl.fromTo(
            image,
            {
                scale: 1.08,
                autoAlpha: 0,
            },
            {
                scale: 1,
                autoAlpha: 1,
                duration: 0.75,
                ease: 'power3.out',
            },
            0.45
        );

        tl.fromTo(
            [title, location, type, number],
            {
                y: direction > 0 ? 18 : -18,
                autoAlpha: 0,
            },
            {
                y: 0,
                autoAlpha: 1,
                duration: 0.55,
                stagger: 0.035,
                ease: 'power3.out',
            },
            0.55
        );

        tl.to(
            progressRef.current,
            {
                width: `${((next + 1) / RESIDENCES.length) * 100}%`,
                duration: 0.6,
                ease: 'power2.out',
            },
            0.45
        );
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(imageRef.current, {
                autoAlpha: 1,
                scale: 1,
            });

            gsap.set(
                [
                    titleRef.current,
                    locationRef.current,
                    typeRef.current,
                    numberRef.current,
                ],
                {
                    autoAlpha: 1,
                    y: 0,
                }
            );

            gsap.from('[data-heading]', {
                y: 25,
                autoAlpha: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            gsap.from('[data-slider]', {
                y: 35,
                autoAlpha: 0,
                duration: 0.9,
                delay: 0.1,
                ease: 'power3.out',
            });

            startAuto();
        }, sectionRef);

        return () => {
            stopAuto();
            ctx.revert();
        };
    }, []);

    const current = RESIDENCES[active];

    return (
        <section
            ref={sectionRef}
            className="bg-[#E8E4DB] px-6 py-16 text-[#11120F] md:px-10 md:py-20 lg:px-16 lg:py-24"
        >
            <div className="mx-auto max-w-[1500px]">
                <div
                    data-heading
                    className="mb-8 flex items-end justify-between md:mb-10"
                >
                    <div>
                        <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#9A8060]">
                            The collection
                        </p>
                        <h2 className="text-[clamp(2.8rem,5vw,5.5rem)] font-light leading-[0.88] tracking-[-0.055em]">
                            Selected residences.
                        </h2>
                    </div>

                    <div className="hidden text-right md:block">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
                            Private collection
                        </p>
                        <p className="mt-1 text-xs text-black/50">
                            Architecture / Living
                        </p>
                    </div>
                </div>

                <div
                    data-slider
                    className="grid h-[520px] grid-cols-1 gap-6 md:grid-cols-[210px_1fr] lg:grid-cols-[250px_1fr]"
                >
                    <div className="hidden flex-col justify-between md:flex">
                        <div className="pt-2">
                            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-black/35">
                                Explore
                            </p>

                            <div className="relative">
                                <div className="absolute bottom-3 left-[3px] top-3 w-px bg-black/10" />

                                {RESIDENCES.map((residence, index) => (
                                    <button
                                        key={residence.number}
                                        onClick={() =>
                                            changeSlide(
                                                index,
                                                index > active ? 1 : -1
                                            )
                                        }
                                        className="relative z-10 flex w-full items-center gap-4 py-3 text-left"
                                    >
                                        <span
                                            className={`h-[7px] w-[7px] shrink-0 rounded-full border transition-all duration-500 ${active === index
                                                    ? 'scale-150 border-[#9A8060] bg-[#9A8060]'
                                                    : 'border-black/30 bg-[#E8E4DB]'
                                                }`}
                                        />

                                        <span
                                            className={`text-sm transition-all duration-500 ${active === index
                                                    ? 'translate-x-1 text-[#11120F]'
                                                    : 'text-black/35'
                                                }`}
                                        >
                                            {residence.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-black/10 pt-4">
                            <p className="text-[9px] uppercase tracking-[0.25em] text-black/35">
                                Location
                            </p>
                            <p className="mt-2 text-xs">{current.location}</p>
                        </div>
                    </div>

                    <div
                        className="relative h-full overflow-hidden bg-black"
                        onMouseEnter={stopAuto}
                        onMouseLeave={startAuto}
                    >
                        <img
                            ref={imageRef}
                            src={current.image}
                            alt={current.name}
                            draggable="false"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" />

                        <div className="absolute left-5 right-5 top-5 flex items-start justify-between md:left-7 md:right-7 md:top-7">
                            <span
                                ref={numberRef}
                                className="text-[10px] tracking-[0.3em] text-white/75"
                            >
                                {current.number}
                            </span>

                            <span
                                ref={typeRef}
                                className="text-[9px] uppercase tracking-[0.28em] text-white/65"
                            >
                                {current.type}
                            </span>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                            <div className="mb-3 flex items-center gap-3">
                                <span className="h-px w-7 bg-[#C5A880]" />

                                <span
                                    ref={locationRef}
                                    className="text-[9px] uppercase tracking-[0.25em] text-white/70"
                                >
                                    {current.location}
                                </span>
                            </div>

                            <div className="flex items-end justify-between gap-5">
                                <h3
                                    ref={titleRef}
                                    className="text-[clamp(2.5rem,5vw,5.5rem)] font-light leading-[0.85] tracking-[-0.055em] text-white"
                                >
                                    {current.name}
                                </h3>

                                <button
                                    type="button"
                                    className="group hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-[#11120F] md:flex"
                                >
                                    <ArrowUpRight
                                        size={17}
                                        strokeWidth={1.2}
                                        className="transition-transform duration-500 group-hover:rotate-45"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-5">
                    <button
                        type="button"
                        onClick={() => changeSlide(active - 1, -1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 transition-colors duration-300 hover:border-[#9A8060]"
                    >
                        <ArrowLeft size={15} strokeWidth={1.2} />
                    </button>

                    <button
                        type="button"
                        onClick={() => changeSlide(active + 1, 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 transition-colors duration-300 hover:border-[#9A8060]"
                    >
                        <ArrowRight size={15} strokeWidth={1.2} />
                    </button>

                    <div className="relative h-px flex-1 overflow-hidden bg-black/10">
                        <div
                            ref={progressRef}
                            className="absolute left-0 top-0 h-full w-[25%] bg-[#9A8060]"
                        />
                    </div>

                    <span className="text-[9px] tracking-[0.25em] text-black/40">
                        {String(active + 1).padStart(2, '0')} /{' '}
                        {String(RESIDENCES.length).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    );
}