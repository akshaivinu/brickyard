"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Hero() {

    return (
        <section className="bg-brand-cream pt-6 pb-6 px-8 md:px-16 h-auto min-h-[80vh] md:min-h-0 md:h-[calc(100vh-104px)] flex flex-col justify-between overflow-hidden gap-12 md:gap-0">
            <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center justify-center md:justify-start grow gap-8 md:gap-0 mt-8 md:mt-0">

                <div className="hero-content flex flex-col items-center w-full">
                    {/* Subtitle with decorative line */}
                    <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
                        <span className="w-12 md:w-20 h-px bg-brand-charcoal/20" />
                        <span className="text-[10px] font-sans tracking-[0.4em] text-brand-charcoal/60 uppercase">
                            Architectural Visualization
                        </span>
                    </div>

                    {/* Main Headline */}
                    <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="text-[10vw] md:text-[6.2vw] font-serif text-brand-charcoal leading-[0.9] tracking-tight text-center mb-6 max-w-6xl  opacity-0">
                        Architecture <br />
                        With <span className="italic font-normal">Precision</span>
                    </motion.h1>

                    {/* Centered CTA */}
                    <Link
                        href="/start"
                        className="inline-flex items-center gap-3 font-sans text-[10px] tracking-widest text-brand-charcoal border-b border-brand-charcoal pb-1.5 transition-preset hover:text-brand-muted hover:border-brand-muted mb-4 md:mb-8 uppercase font-bold"
                    >
                        Start Your Project <span className="text-sm">→</span>
                    </Link>
                </div>

                {/* Hero Image Container */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="hero-image-box w-full relative aspect-video md:aspect-3.5/1 border border-brand-charcoal/5 overflow-hidden">
                    <Image
                        src="/assets/hero.jpg"
                        alt="Modern Architectural Visualization"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </motion.div>
            </div>

            {/* Slider Controls / Pagination */}
            <div className="hero-footer max-w-[1440px] mx-auto w-full flex items-center justify-between mt-auto pt-6 border-t border-brand-charcoal/10">
                <div className="flex items-center gap-6">
                    <span className="text-[10px] font-sans text-brand-charcoal/40 uppercase tracking-[0.3em]">01 / 06</span>
                </div>

                <div className="flex items-center gap-12">
                    <div className="flex items-center">
                        <div className="w-24 h-[1.5px] bg-brand-charcoal/10 relative">
                            <div className="absolute left-0 top-0 h-full bg-brand-charcoal w-1/3" />
                        </div>
                    </div>
                    <span className="text-brand-charcoal text-lg cursor-pointer hover:opacity-50 transition-opacity">→</span>
                </div>
            </div>
        </section>
    );
}
