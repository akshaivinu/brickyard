"use client";

import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-brand-cream selection:bg-brand-charcoal selection:text-brand-cream overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-muted mb-8 block font-medium">
              STUDIO
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-brand-charcoal mb-10 tracking-tight leading-[1.1] max-w-2xl">
              We Translate Architecture Into Immersive Experience.
            </h1>
            <div className="w-16 h-px bg-brand-charcoal/20 mb-10" />
            <p className="font-sans text-brand-muted text-xl max-w-lg leading-relaxed">
              A visualization studio dedicated to precision, light, and material authenticity.
            </p>
          </div>
          <div className="lg:col-span-5 pt-4">
            <div className="relative aspect-16/10 overflow-hidden bg-brand-border/10">
              <Image
                src="/assets/elevation/elevation.png"
                alt="Studio Philosophy"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Approach Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 border-t border-brand-charcoal/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">

          {/* Philosophy Side */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-serif text-brand-charcoal mb-8 tracking-tight">Our Philosophy</h2>
            <div className="space-y-6">
              <p className="font-sans text-brand-muted text-lg leading-relaxed max-w-md">
                At Brickyard Architects, we believe architectural visualization is not decoration — it is interpretation.
              </p>
              <p className="font-sans text-brand-muted text-lg leading-relaxed max-w-md">
                Every project begins with understanding structural intent, context, and spatial narrative.
              </p>
            </div>
          </div>

          {/* Approach Side */}
          <div className="lg:col-span-7 lg:pl-12 lg:border-l border-brand-charcoal/10">
            <h2 className="text-3xl font-serif text-brand-charcoal mb-12 tracking-tight">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <span className="block font-serif text-7xl text-brand-charcoal/5 leading-none -mb-6">01</span>
                <h3 className="text-xl font-serif text-brand-charcoal tracking-tight">Context</h3>
                <p className="font-sans text-brand-muted text-sm leading-relaxed">
                  Understanding architectural vision.
                </p>
              </div>
              <div className="space-y-4">
                <span className="block font-serif text-7xl text-brand-charcoal/5 leading-none -mb-6">02</span>
                <h3 className="text-xl font-serif text-brand-charcoal tracking-tight">Composition</h3>
                <p className="font-sans text-brand-muted text-sm leading-relaxed">
                  Balancing structure, light, and material.
                </p>
              </div>
              <div className="space-y-4">
                <span className="block font-serif text-7xl text-brand-charcoal/5 leading-none -mb-6">03</span>
                <h3 className="text-xl font-serif text-brand-charcoal tracking-tight">Atmosphere</h3>
                <p className="font-sans text-brand-muted text-sm leading-relaxed">
                  Crafting emotional spatial experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 border-t border-brand-charcoal/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">

          {/* Capabilities List */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-serif text-brand-charcoal mb-12 tracking-tight">Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10">
              <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-6 group">
                <span className="font-sans text-lg text-brand-charcoal hover:translate-x-2 transition-transform duration-300">Exterior Visualization</span>
                <div className="w-12 h-px bg-brand-charcoal/10" />
              </div>
              <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-6 group">
                <span className="font-sans text-lg text-brand-charcoal hover:translate-x-2 transition-transform duration-300">Immersive 360 Experiences</span>
                <div className="w-12 h-px bg-brand-charcoal/10" />
              </div>
              <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-6 group">
                <span className="font-sans text-lg text-brand-charcoal hover:translate-x-2 transition-transform duration-300">Interior Visualization</span>
                <div className="w-12 h-px bg-brand-charcoal/10" />
              </div>
              <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-6 group">
                <span className="font-sans text-lg text-brand-charcoal hover:translate-x-2 transition-transform duration-300">Architectural Consultation</span>
                <div className="w-12 h-px bg-brand-charcoal/10" />
              </div>
              <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-6 group">
                <span className="font-sans text-lg text-brand-charcoal hover:translate-x-2 transition-transform duration-300">Cinematic Animation</span>
                <div className="w-12 h-px bg-brand-charcoal/10" />
              </div>
            </div>
          </div>

          {/* CTA Side */}
          <div className="lg:col-span-4 lg:col-start-9 lg:pl-12 lg:border-l border-brand-charcoal/10 flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-10 tracking-tight leading-tight">
              Let's Build Something Meaningful.
            </h3>
            <Link href="/contact" className="group inline-flex items-center gap-4 font-sans text-xs tracking-[0.3em] uppercase text-brand-charcoal border-b border-brand-charcoal pb-4 w-fit hover:gap-6 transition-all duration-300">
              Start a Project <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 px-8 md:px-16 lg:px-24 border-t border-brand-charcoal/10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-brand-muted font-sans text-[10px] tracking-[0.2em] uppercase">
          <p>© 2026 Brickyard Architects</p>
          <div className="flex items-center gap-12">
            <Link href="#" className="hover:text-brand-charcoal transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-colors">Behance</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-colors">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}