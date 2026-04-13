import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cream selection:bg-brand-charcoal selection:text-brand-cream overflow-hidden">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Services />
      <Process />
      <Contact />
      <footer className="py-12 md:py-24 px-8 md:px-16 bg-brand-cream border-t border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <span className="font-serif text-3xl tracking-tight text-brand-charcoal">Brickyard Architects</span>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted max-w-xs leading-relaxed">
              Architectural visualization studio specializing in high-end renders.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 mt-8 md:mt-0">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted">
              <Link href="#" className="hover:text-brand-charcoal transition-preset">Instagram</Link>
              <Link href="#" className="hover:text-brand-charcoal transition-preset">LinkedIn</Link>
              <Link href="#" className="hover:text-brand-charcoal transition-preset">Twitter</Link>
            </div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 text-center md:text-right">
              © 2026 Brickyard Architects. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
