"use client";

import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, ArrowUp, MoveUpRight } from "lucide-react";

const categories = [
  {
    title: "Elevation",
    slug: "elevation",
    description: "Exterior architectural visualization focused on light, material, and structure.",
    image: "/assets/elevation.png",
    link: "/work/elevation",
    reverse: false,
  },
  {
    title: "Interior",
    slug: "interior",
    description: "Atmospheric interior renders that translate spatial emotion.",
    image: "/assets/interior.png",
    link: "/work/interior",
    reverse: true,
  },
  {
    title: "Walkthrough",
    slug: "walkthrough",
    description: "Cinematic 3D animation bringing projects into motion.",
    image: "/assets/walkthrough.png",
    link: "/work/walkthrough",
    reverse: false,
    special: "play",
  },
  {
    title: "360 Experience",
    slug: "360-experience",
    description: "Interactive panoramic visualization for spatial immersion.",
    image: "/assets/360.png",
    link: "/work/360-experience",
    reverse: true,
    special: "360",
  },
  {
    title: "Architectural Consultation",
    slug: "consultation",
    description: "Strategic visual direction and presentation advisory.",
    image: "/assets/consultation.png",
    link: "/work/consultation",
    reverse: false,
  }
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-brand-cream selection:bg-brand-charcoal selection:text-brand-cream overflow-hidden">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-24 px-8 md:px-16 border-b border-brand-border/40">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col">
            <h1 className="text-7xl md:text-9xl font-serif text-brand-charcoal mb-4 tracking-tighter">
              WORK
            </h1>
            <h2 className="text-2xl md:text-4xl font-serif text-brand-muted/90 max-w-2xl mb-6">
              Architectural Visualization Across Disciplines
            </h2>
            <div className="w-16 h-px bg-brand-charcoal/30" />
          </div>

          <div className="flex items-start gap-8 md:pt-4">
            <div className="w-px h-20 bg-brand-border hidden md:block" />
            <p className="font-sans text-brand-muted text-sm md:text-base leading-relaxed max-w-[280px]">
              Explore our selected projects across five core categories of architectural visualization.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-brand-cream">
        <div className="max-w-[1440px] mx-auto">
          {categories.map((cat, idx) => (
            <div
              key={cat.title}
              className={`flex flex-col md:flex-row ${cat.reverse ? 'md:flex-row-reverse' : ''} border-b border-brand-border/40 last:border-b-0`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 aspect-video md:aspect-21/9 relative overflow-hidden group">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Special Overlays */}
                {cat.special === "play" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-2xl">
                      <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}

                {cat.special === "360" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-white font-serif text-3xl tracking-widest drop-shadow-lg">
                        360°
                      </span>
                      <div className="w-12 h-px bg-white/60 rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center items-start bg-brand-cream/50">
                <h3 className="text-3xl md:text-5xl font-serif text-brand-charcoal mb-4">
                  {cat.title}
                </h3>
                <div className="w-10 h-px bg-brand-charcoal/20 mb-8" />
                <p className="font-sans text-brand-muted text-base md:text-lg leading-relaxed max-w-sm mb-10">
                  {cat.description}
                </p>
                <Link
                  href={cat.link}
                  className="flex items-center gap-3 font-sans text-xs tracking-[0.3em] uppercase text-brand-charcoal hover:text-brand-muted transition-colors group font-medium"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="relative h-[30vh] md:h-[50vh] overflow-hidden group">
        <Image
          src="/assets/heroShort.png"
          alt="CTA Background"
          fill
          className="object-cover transition-transform duration-2000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-charcoal/40 group-hover:bg-brand-charcoal/50 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <div className="max-w-[1440px] w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <h4 className="text-white text-3xl md:text-5xl font-serif text-center md:text-left drop-shadow-xl">
              Ready to bring your vision to life?
            </h4>
            <Link
              href="/contact"
              className="bg-brand-charcoal text-white px-10 py-5 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-brand-charcoal transition-preset flex items-center gap-3 backdrop-blur-md"
            >
              Start Your Project
              <MoveUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-12 px-8 md:px-16 border-t border-brand-border/40">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60">
            © 2026 Brickyard Architects — All Rights Reserved
          </p>

          <div className="flex items-center gap-12 font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted">
            <Link href="#" className="hover:text-brand-charcoal transition-preset">Instagram</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-preset">Behance</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-preset">LinkedIn</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 border border-brand-border rounded-full hover:bg-brand-charcoal hover:text-white transition-preset"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}