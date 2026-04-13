"use client";

import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-cream selection:bg-brand-charcoal selection:text-brand-cream overflow-hidden">
      <Navbar />

      {/* Header Section */}
      <section className="pt-24 pb-16 px-8 md:px-16 text-center">
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-muted mb-8 block font-medium">
          C O N T A C T
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-brand-charcoal mb-8 tracking-tight leading-tight max-w-4xl mx-auto">
          Let's Start Something Meaningful.
        </h1>
        <p className="font-sans text-brand-muted text-lg max-w-xl mx-auto leading-relaxed">
          Tell us about your project, timeline, and vision.<br />
          We'll respond within 24 hours.
        </p>
      </section>

      {/* Hero Image Section */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-[1440px] mx-auto aspect-21/9 relative overflow-hidden">
          <Image
            src="/assets/interior/interior_1.png"
            alt="Consultation Room"
            fill
            className="object-cover transition-transform duration-1000"
            priority
          />
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-24 px-8 md:px-16 bg-white/30">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">

          {/* Form Side */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-16">Start a Project</h2>

            <form className="space-y-12">
              <div className="space-y-2 border-b border-brand-charcoal/10 pb-4 focus-within:border-brand-charcoal transition-colors">
                <label className="font-sans text-[10px] tracking-widest uppercase text-brand-muted">Full Name</label>
                <input
                  type="text"
                  placeholder="Your preferred name"
                  className="w-full bg-transparent border-none outline-none font-sans text-lg text-brand-charcoal placeholder:text-brand-muted/30 py-2"
                />
              </div>

              <div className="space-y-2 border-b border-brand-charcoal/10 pb-4 focus-within:border-brand-charcoal transition-colors">
                <label className="font-sans text-[10px] tracking-widest uppercase text-brand-muted">Email</label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full bg-transparent border-none outline-none font-sans text-lg text-brand-charcoal placeholder:text-brand-muted/30 py-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-2 border-b border-brand-charcoal/10 pb-4 focus-within:border-brand-charcoal transition-colors relative group">
                  <label className="font-sans text-[10px] tracking-widest uppercase text-brand-muted">Project Type</label>
                  <select className="w-full bg-transparent border-none outline-none font-sans text-lg text-brand-charcoal appearance-none py-2 cursor-pointer">
                    <option>Select</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Hospitality</option>
                  </select>
                  <span className="absolute right-0 bottom-6 text-brand-muted/50 group-hover:text-brand-charcoal transition-colors pointer-events-none text-xs">▼</span>
                </div>

                <div className="space-y-2 border-b border-brand-charcoal/10 pb-4 focus-within:border-brand-charcoal transition-colors relative group">
                  <label className="font-sans text-[10px] tracking-widest uppercase text-brand-muted">Budget Range</label>
                  <select className="w-full bg-transparent border-none outline-none font-sans text-lg text-brand-charcoal appearance-none py-2 cursor-pointer">
                    <option>Select</option>
                    <option>$5k - $15k</option>
                    <option>$15k - $50k</option>
                    <option>$50k+</option>
                  </select>
                  <span className="absolute right-0 bottom-6 text-brand-muted/50 group-hover:text-brand-charcoal transition-colors pointer-events-none text-xs">▼</span>
                </div>

                <div className="space-y-2 border-b border-brand-charcoal/10 pb-4 focus-within:border-brand-charcoal transition-colors relative group">
                  <label className="font-sans text-[10px] tracking-widest uppercase text-brand-muted">Timeline</label>
                  <select className="w-full bg-transparent border-none outline-none font-sans text-lg text-brand-charcoal appearance-none py-2 cursor-pointer">
                    <option>Select</option>
                    <option>ASAP</option>
                    <option>1-3 Months</option>
                    <option>6 Months+</option>
                  </select>
                  <span className="absolute right-0 bottom-6 text-brand-muted/50 group-hover:text-brand-charcoal transition-colors pointer-events-none text-xs">▼</span>
                </div>
              </div>

              <div className="space-y-2 border-b border-brand-charcoal/10 pb-4 focus-within:border-brand-charcoal transition-colors">
                <label className="font-sans text-[10px] tracking-widest uppercase text-brand-muted">Project Description</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-transparent border-none outline-none font-sans text-lg text-brand-charcoal placeholder:text-brand-muted/30 py-2 resize-none"
                />
              </div>

              <button type="button" className="flex items-center gap-4 font-sans text-xs tracking-[0.3em] uppercase text-brand-charcoal border-b border-brand-charcoal pb-4 pt-8 hover:translate-x-2 transition-transform duration-300">
                Submit Project Inquiry <MoveRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Studio Side */}
          <div className="lg:col-span-4 lg:col-start-9 md:pl-16 lg:border-l border-brand-border/40 space-y-20">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal">Studio</h2>
              <div className="space-y-6">
                <p className="font-sans text-lg text-brand-charcoal">
                  Brickyard Architects<br />
                  Times Square Tower, New York, NY
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-widest uppercase text-brand-muted">Email</span>
                <p className="font-sans text-lg text-brand-charcoal border-b border-brand-border pb-4">
                  contact@brickyardarchitects.com
                </p>
              </div>

              <p className="font-sans text-lg text-brand-charcoal">
                +1 (212) 555-1234
              </p>

              <div className="flex flex-col gap-6 pt-8 font-sans text-lg text-brand-charcoal">
                <Link href="#" className="hover:text-brand-muted transition-colors">Instagram</Link>
                <Link href="#" className="hover:text-brand-muted transition-colors">Behance</Link>
                <Link href="#" className="hover:text-brand-muted transition-colors">Linkedin</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 px-8 md:px-16 border-t border-brand-border/20">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60">
            © 2026 Brickyard Architects
          </p>

          <div className="flex items-center gap-12 font-sans text-[10px] tracking-[0.15em] uppercase text-brand-muted">
            <Link href="#" className="hover:text-brand-charcoal transition-preset">Instagram</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-preset">Behance</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-preset">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}