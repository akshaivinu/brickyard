"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const smallServices = [
    { id: "01", title: "Interior", image: "/assets/interior.png" },
    { id: "02", title: "Walkthrough", image: "/assets/walkthrough.png" },
    { id: "03", title: "360", image: "/assets/360.png" },
    { id: "04", title: "Consultation", image: "/assets/consultation.png" },
];

export default function Services() {
    const elevationRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        // Collect all reveal wrappers (elevation + small services)
        const wrappers: HTMLDivElement[] = [];
        if (elevationRef.current) wrappers.push(elevationRef.current);
        wrappers.push(...imageRefs.current.filter(Boolean));

        const triggers: ScrollTrigger[] = [];

        wrappers.forEach((wrapper) => {
            const img = wrapper.querySelector("img");
            if (!img) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 75%",
                    end: "+=180",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            });

            tl.fromTo(
                wrapper,
                { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
                { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", ease: "none" }
            ).fromTo(
                img,
                { scale: 1.5 },
                { scale: 1, ease: "none" },
                0
            );

            if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
        });

        ScrollTrigger.refresh(true);

        return () => {
            triggers.forEach((st) => st.kill());
        };
    }, []);

    return (
        <section className="pt-4 pb-12 md:pt-8 md:pb-32 px-[2.5%] md:px-16 bg-brand-cream">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex items-center gap-4 mb-8 md:mb-16">
                    <span className="text-[10px] tracking-widest font-sans text-brand-muted uppercase">Services</span>
                    <div className="h-px grow bg-brand-border" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
                    {/* Main Service - Elevation */}
                    <div className="flex flex-col group">
                        <div
                            ref={elevationRef}
                            className="tca-reveal-image relative aspect-[1.27/1] overflow-hidden mb-8"
                        >
                            <Image
                                src="/assets/elevation/elevation.png"
                                alt="Elevation Service"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-preset group-hover:scale-105 origin-left"
                            />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4 uppercase tracking-wider">Elevation</h3>
                        <p className="font-sans text-brand-muted text-lg mb-8">Stunning exterior renderings</p>
                        <Link
                            href="/work"
                            className="group/link inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase transition-preset border-b border-transparent hover:border-brand-charcoal pb-1 w-fit"
                        >
                            View Projects
                            <span className="transition-preset group-hover/link:translate-x-1">→</span>
                        </Link>
                    </div>

                    {/* Smaller Services Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                        {smallServices.map((service, i) => (
                            <div
                                key={service.id}
                                className="group relative flex flex-col"
                            >
                                <div
                                    ref={(el) => { if (el) imageRefs.current[i] = el; }}
                                    className="tca-reveal-image relative aspect-4/3 overflow-hidden mb-6"
                                >
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-preset group-hover:scale-110 grayscale group-hover:grayscale-0 origin-left"
                                    />
                                </div>
                                <div className="border-b border-brand-border pb-2 group-hover:border-brand-charcoal transition-preset">
                                    <h4 className="text-xl md:text-2xl font-serif text-brand-charcoal">{service.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
