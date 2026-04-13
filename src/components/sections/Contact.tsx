"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import CustomEase from "gsap/CustomEase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create("hop", "0.85, 0, 0.15, 1");
}

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let split: SplitType | null = null;
        const ctx = gsap.context(() => {
            // Split heading for cinematic reveal
            if (headingRef.current) {
                split = new SplitType(headingRef.current, { types: "chars,lines" });

                gsap.set(split.chars, { opacity: 0, y: 50 });

                gsap.to(split.chars, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.02,
                    ease: "hop",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            }

            // Animate the rest of the left content
            if (contentRef.current) {
                const children = contentRef.current.children;
                gsap.fromTo(children,
                    { x: -40, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "hop",
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Animate the image container
            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    { x: 40, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "hop",
                        scrollTrigger: {
                            trigger: imageRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        // Refresh ScrollTrigger to ensure correct positions after DOM modification
        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
            if (split) split.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="h-auto min-h-0 md:min-h-[80vh] flex flex-col md:flex-row border-t border-brand-border bg-brand-cream px-[2.5%] md:px-16 pb-12 md:pb-0">
            <div
                ref={contentRef}
                className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center"
            >
                <h2
                    ref={headingRef}
                    className="text-4xl md:text-6xl font-serif text-brand-charcoal leading-tight mb-8"
                >
                    Let’s Bring <br />
                    Your Architecture <br />
                    To Life.
                </h2>

                <p className="font-sans text-brand-muted text-lg mb-12 max-w-md">
                    Collaborate with a studio that values precision and architectural clarity.
                </p>

                <Link
                    href="/start"
                    className="group inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase border-b border-brand-charcoal pb-1 transition-preset hover:text-brand-muted hover:border-brand-muted w-fit"
                >
                    Start Your Project
                    <span className="transition-preset group-hover:translate-x-1">→</span>
                </Link>
            </div>

            <div
                ref={imageRef}
                className="w-full md:w-1/2 relative min-h-[400px]"
            >
                <Image
                    src="/assets/random.jpg"
                    alt="Architectural Render"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>
        </section>
    );
}
