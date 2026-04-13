"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const elements = section.querySelectorAll<HTMLElement>(".fade-text");
        const splitInstances: SplitType[] = [];
        const triggers: ScrollTrigger[] = [];

        elements.forEach((element) => {
            const text = new SplitType(element, { types: "chars" });
            splitInstances.push(text);

            const isMobile = window.innerWidth < 768;
            const scrollConfig: ScrollTrigger.Vars = isMobile
                ? {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
                : {
                    trigger: element,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 0.5,
                    toggleActions: "play play reverse reverse",
                };

            const anim = gsap.fromTo(
                text.chars,
                { opacity: 0.15 },
                {
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.02,
                    scrollTrigger: scrollConfig,
                }
            );

            if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
        });

        ScrollTrigger.refresh(true);

        return () => {
            triggers.forEach((st) => st.kill());
            splitInstances.forEach((s) => s.revert());
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-8 md:py-16 px-[2.5%] md:px-16 border-t border-brand-border">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex items-center gap-4 mb-8 md:mb-16">
                    <span className="text-[10px] tracking-[0.3em] font-sans text-brand-muted uppercase">What We Do</span>
                </div>
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="fade-text text-3xl md:text-7xl font-serif font-bold text-brand-charcoal leading-[1.2] mb-4 md:mb-8">
                        We translate architectural intent into immersive visual narratives.
                    </h2>
                    <p className="fade-text font-sans text-brand-muted text-lg md:text-xl max-w-3xl">
                        From early concept massing to final marketing visuals, we collaborate with architects and developers to bring unbuilt spaces into compelling reality.
                    </p>
                </div>
            </div>
        </section>
    );
}
