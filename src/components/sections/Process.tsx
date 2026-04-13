"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create("hop", "0.85, 0, 0.15, 1");
}

const steps = [
    {
        number: "00",
        description: "How We Bring Architecture to Life.",
        images: [
            "/assets/process.png",
            "/assets/elevation/elevation_1.png",
            "/assets/interior/interior_1.png",
            "/assets/elevation/elevation_2.png",
        ],
    },
    {
        number: "01",
        description: "We understand your vision, context.",
        images: [
            "/assets/elevation/elevation_1.png",
            "/assets/elevation/elevation_3.png",
            "/assets/elevation/elevation_5.png",
            "/assets/elevation/elevation_7.png",
        ],
    },
    {
        number: "02",
        description: "We refine composition, lighting, and atmosphere.",
        images: [
            "/assets/interior/interior_1.png",
            "/assets/interior/interior_3.png",
            "/assets/interior/interior_5.png",
            "/assets/interior/interior_7.png",
        ],
    },
    {
        number: "03",
        description: "High-fidelity renders and animations are produced.",
        images: [
            "/assets/elevation/elevation_4.png",
            "/assets/elevation/elevation_6.png",
            "/assets/interior/interior_2.png",
            "/assets/interior/interior_4.png",
        ],
    },
    {
        number: "04",
        description: "We collaborate closely to perfect every detail.",
        images: [
            "/assets/interior/interior_6.png",
            "/assets/interior/interior_8.png",
            "/assets/elevation/elevation_8.png",
            "/assets/elevation/elevation_9.png",
        ],
    },
];

export default function Process() {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timelinesRef = useRef<gsap.core.Timeline[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- 1. Hover Timelines ---
        timelinesRef.current = itemRefs.current.map((item) => {
            if (!item) return gsap.timeline({ paused: true });

            const text = item.querySelector(".process-text");
            const images = item.querySelectorAll(".process-preview-img");

            const tl = gsap.timeline({
                paused: true,
                defaults: { ease: "hop", duration: 0.45 }
            });

            // Text slides up and fades
            tl.to(text, {
                y: "-100%",
                opacity: 0,
            }, 0);

            // Images slide up from 100% (or fixed offset) to 0
            tl.fromTo(images,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.04,
                }, 0.05);

            return tl;
        });

        // --- 2. Scroll Reveal Animation (Left to Right, Always Repeats) ---
        const items = itemRefs.current.filter(Boolean);
        if (items.length > 0) {
            gsap.fromTo(items,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "hop",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }

        return () => {
            timelinesRef.current.forEach((tl) => tl.kill());
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    const handleMouseEnter = (index: number) => timelinesRef.current[index]?.play();
    const handleMouseLeave = (index: number) => timelinesRef.current[index]?.reverse();

    return (
        <section className="relative pt-4 pb-12 md:pt-8 md:pb-32 bg-brand-cream overflow-hidden">
            <div className="mx-auto px-8 md:px-16">
                <div className="text-start mb-8 md:mb-16">
                    <span className="text-[10px] tracking-widest font-sans text-brand-muted uppercase mb-4 block">
                        Process
                    </span>
                </div>

                <div
                    ref={containerRef}
                    className="flex flex-col border-t border-brand-border/30"
                >
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            ref={(el) => { itemRefs.current[index] = el; }}
                            className="process-item relative border-b border-brand-border/30 overflow-hidden h-[60px] md:h-[100px]"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            {/* Description text: centered vertically */}
                            <div className="process-text absolute inset-0 flex items-center will-change-transform">
                                <p className="font-sans text-brand-muted text-sm md:text-7xl lg:text-6xl uppercase leading-none select-none tracking-tighter">
                                    {step.description}
                                </p>
                            </div>

                            {/* Image Row: also centered vertically, smaller sizes */}
                            <div className="process-preview absolute inset-0 flex items-center gap-3 pointer-events-none">
                                {step.images.map((src, i) => (
                                    <div
                                        key={i}
                                        className="process-preview-img relative w-20 md:w-32 lg:w-40 h-12 md:h-18 lg:h-24 overflow-hidden will-change-transform opacity-0"
                                    >
                                        <Image
                                            src={src}
                                            alt={`Process ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 80px, 160px"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
