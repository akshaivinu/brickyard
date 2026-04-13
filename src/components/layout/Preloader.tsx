// components/Preloader.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import "../../app/globals.css";

gsap.registerPlugin(CustomEase);

CustomEase.create("hop", "0.85, 0, 0.15, 1");

export default function Preloader() {

    const counterRef = useRef<HTMLHeadingElement>(null);
    const overlayTextRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<HTMLImageElement[]>([]);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const overlayContainerRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {

        const counter = { val: 0 };

        // ── Read hero image box geometry for final matching ───────────
        const heroBox = document.querySelector(".hero-image-box") as HTMLElement | null;
        const heroRect = heroBox?.getBoundingClientRect();
        const realHeroImg = document.querySelector(".hero-image-box img") as HTMLElement | null;
        const vh = window.innerHeight;
        const vw = window.innerWidth;

        // ── Hide real hero image immediately — preloader owns the handoff ──
        gsap.set(realHeroImg, { opacity: 0, visibility: "hidden" });

        // ── Initial states ────────────────────────────────────────────
        gsap.set(imageRefs.current, {
            opacity: 0,
            y: "50%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });

        // Non-hero images: small portrait tiles (use scaleX instead of width for GPU compositing)
        const nonHeroImages = imageRefs.current.filter((_, i) => i !== 1);

        // Hero image: starts at a narrower base width
        gsap.set(imageRefs.current[1], { width: "20vw" });

        // Set non-hero image wrapper widths once upfront (static, no animation on width yet)
        nonHeroImages.forEach((img) => {
            img.style.width = "10vw";
        });

        // Spread images apart via x-transforms (GPU composited, no layout cost)
        const spreadOffsets = [-15, -5, 5, 15]; // vw units, symmetric around center
        imageRefs.current.forEach((img, i) => {
            gsap.set(img, { x: `${spreadOffsets[i]}vw` });
        });

        // Container: centered via CSS translate, gap stays 0
        gsap.set(imageContainerRef.current, { gap: 0 });

        // ── Single master timeline ────────────────────────────────────
        const tl = gsap.timeline({ delay: 0.5, defaults: { ease: "hop" } });
        const overlayTextTl = gsap.timeline({ delay: 0.75, defaults: { ease: "hop" } });

        // 1. Counter 0 → 100 over 5s
        tl.to(counter, {
            val: 100,
            duration: 5,
            ease: "power2.out",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = `${Math.floor(counter.val)}%`;
                }
            },
        }, 0);

        // 2. Overlay text cycles (one clean sequence)
        overlayTextTl.to(overlayTextRef.current, { y: 0, duration: 0.75 })
            .to(overlayTextRef.current, { y: "-2rem", duration: 0.75, delay: 0.25 })
            .to(overlayTextRef.current, { y: "-4rem", duration: 0.75, delay: 0.25 })
            .to(overlayTextRef.current, { y: "-6rem", duration: 0.75, delay: 0.25 }, 7);

        // 3. Reveal all images one by one (overlaps counter, starts at t=0)
        imageRefs.current.forEach((image, i) => {
            tl.to(image, { opacity: 1, y: 0, duration: 1, stagger: 0.05 }, i * 0.15);
        });

        // Close spacing via x-transforms (GPU composited — no layout thrashing)
        tl.to(imageRefs.current, { x: 0, duration: 1, delay: 0.5, ease: "hop" });

        // 4. Collapse non-hero images: use scaleX instead of width (GPU-composited, no layout reflow)
        tl.to(nonHeroImages, {
            scaleX: 0,
            transformOrigin: "left center",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            stagger: 0.1,
            delay: 0.5,
            ease: "hop",
            onComplete: () => {
                nonHeroImages.forEach((img) => gsap.set(img, { display: "none" }));
            },
        }, 5);

        // 5. Animate preloader image container to match .hero-image-box exactly
        //    Use x/y translate offsets from center instead of left/top (GPU composited)
        if (heroRect) {
            // Hero box center relative to viewport center → pure translate, no layout cost
            const targetX = heroRect.left + heroRect.width / 2 - vw / 2;
            const targetY = heroRect.top + heroRect.height / 2 - vh / 2;

            tl.to(imageContainerRef.current, {
                x: targetX,
                y: targetY,
                duration: 1.2,
                ease: "hop",
                onStart: () => {
                    // Re-measure at animation time in case layout shifted
                    const freshRect = heroBox?.getBoundingClientRect();
                    if (freshRect && imageContainerRef.current) {
                        const freshX = freshRect.left + freshRect.width / 2 - vw / 2;
                        const freshY = freshRect.top + freshRect.height / 2 - vh / 2;
                        gsap.to(imageContainerRef.current, {
                            x: freshX,
                            y: freshY,
                            duration: 1.2,
                            ease: "hop",
                        });
                    }
                },
            }, 6.2);

            tl.to(imageRefs.current[1], {
                width: heroRect.width,
                duration: 1.1,
            }, 5.5);
        }

        // 6. Reveal real hero slightly before overlay finishes sliding
        tl.set(realHeroImg, { opacity: 1, visibility: "visible" }, 7.2);
        tl.to(imageRefs.current[1], { opacity: 0, delay: 3, ease: "back" }, 7.2);

        // 7. Slide ONLY the black overlay upward (aladesign style)
        tl.to(overlayContainerRef.current, {
            y: -vh,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
                if (ref.current) {
                    ref.current.style.pointerEvents = "none";
                    ref.current.style.visibility = "hidden";
                }
            },
        }, 7.0);

    }, []);

    return (
        <div ref={ref} className="preloader fixed inset-0 overflow-hidden z-50">

            {/* Black overlay — text and counter live here */}
            <div ref={overlayContainerRef} className="overlay-container absolute inset-0 bg-black z-0">
                <h1 ref={counterRef} className="absolute right-8 bottom-8 text-white text-6xl font-normal">0%</h1>
                <div className="absolute top-8 left-8 h-8 overflow-hidden">
                    <div ref={overlayTextRef} className="overlay-text flex flex-col translate-y-8 will-change-transform">
                        <p className="text-white h-8 flex items-center text-[1.5rem] uppercase">Structure</p>
                        <p className="text-white h-8 flex items-center text-[1.5rem] uppercase">Designed Identity</p>
                        <p className="text-white h-8 flex items-center text-[1.5rem] uppercase">Welcome</p>
                    </div>
                </div>
            </div>

            {/* Images sit above overlay — GSAP controls all positioning/sizing */}
            {/* Container is centered via CSS so x/y transforms move it to hero position */}
            <div
                ref={imageContainerRef}
                className="hero-images absolute flex justify-center z-10"
                style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", willChange: "transform" }}
            >
                <img
                    ref={(el) => { imageRefs.current[0] = el!; }}
                    src="/assets/elevation.png"
                    className="aspect-5/7 object-cover will-change-transform"
                />
                <img
                    ref={(el) => { imageRefs.current[1] = el!; }}
                    src="/assets/hero.jpg"
                    className="hero-img aspect-3.5/1 object-cover will-change-transform"
                />
                <img
                    ref={(el) => { imageRefs.current[2] = el!; }}
                    src="/assets/interior.png"
                    className="aspect-5/7 object-cover will-change-transform"
                />
                <img
                    ref={(el) => { imageRefs.current[3] = el!; }}
                    src="/assets/walkthrough.png"
                    className="aspect-5/7 object-cover will-change-transform"
                />
            </div>
        </div>
    );
}