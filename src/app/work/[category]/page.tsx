"use client";

import React, { use } from 'react';
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveRight, ArrowUp, Play } from "lucide-react";

const CATEGORY_DATA: Record<string, { title: string; subtitle: string; description: string }> = {
  "elevation": {
    title: "ELEVATION",
    subtitle: "Exterior Architectural Visualization",
    description: "Realistic exterior renderings focused on light, material, structure, and environmental storytelling."
  },
  "interior": {
    title: "INTERIOR",
    subtitle: "Atmospheric Interior Visualization",
    description: "Immersive interior renderings designed to translate spatial emotion, materiality, and lighting."
  },
  "walkthrough": {
    title: "WALKTHROUGH",
    subtitle: "Cinematic 3D Animation",
    description: "Engaging 3D animations that bring architectural concepts to life with movement and cinematic direction."
  },
  "360-experience": {
    title: "360 EXPERIENCE",
    subtitle: "Interactive Panoramas",
    description: "Interactive 360-degree visualizations providing complete spatial immersion and exploration."
  },
  "consultation": {
    title: "CONSULTATION",
    subtitle: "Strategic Visual Advisory",
    description: "Expert guidance on visual direction, presentation strategy, and architectural communication."
  }
};

const CATEGORY_PROJECTS: Record<string, any[]> = {
  "elevation": Array.from({ length: 4 }, (_, i) => {
    // We only have 4 valid elevation images left: elevation.png (mapped to index 0), 18, 19, 20
    const imageSuffix = i === 0 ? "" : (i + 17); // Maps 0 to "", 1 to 18, 2 to 19, 3 to 20
    const imagePath = `/assets/elevation/elevation${imageSuffix ? `_${imageSuffix}` : ""}.png`;

    return {
      id: i + 1,
      slug: `elevation-project-${i + 1}`,
      title: `Elevation Project ${i + 1}`,
      location: "Various Locations",
      image: imagePath,
      size: i % 3 === 0 ? "large" : (i % 3 === 1 ? "small" : "medium")
    };
  }),
  "interior": Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    slug: `interior-project-${i + 1}`,
    title: `Interior Project ${i + 1}`,
    location: "Various Locations",
    image: `/assets/interior/interior_${i + 1}.png`,
    size: i % 3 === 0 ? "large" : (i % 3 === 1 ? "small" : "medium")
  })),
  "walkthrough": Array.from({ length: 2 }, (_, i) => ({
    id: i + 1,
    slug: `walkthrough-project-${i + 1}`,
    title: `Walkthrough Project ${i + 1}`,
    location: "Coming Soon",
    image: `/assets/walkthrough/walkthrough_${i + 1}.png`,
    size: "large"
  })),
  "360-experience": Array.from({ length: 1 }, (_, i) => ({
    id: i + 1,
    slug: `360-project-${i + 1}`,
    title: `360 Experience ${i + 1}`,
    location: "Coming Soon",
    image: `/assets/360-experience/360_${i + 1}.png`,
    size: "large"
  })),
  "consultation": Array.from({ length: 1 }, (_, i) => ({
    id: 1,
    slug: "consultation-project-1",
    title: "Consultation 1",
    location: "Coming Soon",
    image: "/assets/consultation.png",
    size: "large"
  }))
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.category;
  const category = CATEGORY_DATA[categoryId] || CATEGORY_DATA["elevation"];
  const projects = CATEGORY_PROJECTS[categoryId] || CATEGORY_PROJECTS["elevation"];

  return (
    <main className="min-h-screen bg-brand-cream selection:bg-brand-charcoal selection:text-brand-cream overflow-hidden">
      <Navbar />

      {/* Header Section */}
      <section className="pt-28 pb-16 px-8 md:px-16 border-b border-brand-border/40">
        <div className="max-w-[1440px] mx-auto">
          <nav className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-12">
            <Link href="/work" className="hover:text-brand-charcoal transition-colors">Work</Link>
            <span>/</span>
            <span className="text-brand-charcoal/40 font-medium">{categoryId.replace('-', ' ')}</span>
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <h1 className="text-6xl md:text-8xl font-serif text-brand-charcoal mb-4 tracking-tight uppercase">
                {category.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-serif text-brand-muted/80 max-w-xl">
                {category.subtitle}
              </h2>
            </div>

            <p className="font-sans text-brand-muted text-sm md:text-base leading-relaxed max-w-[320px] md:pt-4 text-left md:text-right md:ml-auto">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Actions */}
      <section className="px-8 md:px-16 py-8 border-b border-brand-border/40">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <div className="flex gap-8 md:gap-12 font-sans text-[10px] tracking-[0.3em] uppercase text-brand-muted">
            <button className="text-brand-charcoal border-b border-brand-charcoal pb-1 transition-colors">Latest</button>
            {/* <button className="hover:text-brand-charcoal transition-colors pb-1">Residential</button>
            <button className="hover:text-brand-charcoal transition-colors pb-1">Commercial</button>
            <button className="hover:text-brand-charcoal transition-colors pb-1">Competition</button> */}
          </div>

          <Link href="/work" className="hidden md:flex items-center gap-3 font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted hover:text-brand-charcoal transition-colors group">
            All Projects
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-8 md:px-16 lg:px-24 py-16 md:py-24 bg-brand-cream">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-16 md:gap-y-24">

            {projects.map((project, index) => {
              // Robust pattern for a 12-column grid:
              // Row 1: [8] [4] (Items index 0, 1)
              // Row 2: [4] [8] (Items index 2, 3)
              // This repeats every 4 items and ensures perfect height matching.
              const isEvenRow = Math.floor(index / 2) % 2 === 0;
              const isFirstInRow = index % 2 === 0;

              let gridClasses = "";
              let aspectClasses = "";

              if (isEvenRow) {
                gridClasses = isFirstInRow ? "md:col-span-8" : "md:col-span-4";
                aspectClasses = isFirstInRow ? "aspect-[2.1/1]" : "aspect-[1/1]";
              } else {
                gridClasses = isFirstInRow ? "md:col-span-4" : "md:col-span-8";
                aspectClasses = isFirstInRow ? "aspect-[1/1]" : "aspect-[2.1/1]";
              }

              return (
                <Link key={project.id} href={`/work/${categoryId}/${project.slug}`} className={`${gridClasses} group cursor-pointer`}>
                  <div className={`${aspectClasses} relative overflow-hidden mb-6 bg-brand-border/10`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback image if the specific file doesn't exist yet
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/hero.png";
                      }}
                    />
                    {categoryId === "walkthrough" && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                          <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-brand-charcoal mb-1">{project.title}</h3>
                  <p className="text-brand-muted text-xs md:text-sm font-sans tracking-wide">{project.location}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="px-8 md:px-16 py-24 border-t border-brand-border/40 bg-brand-border/5">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h4 className="text-3xl md:text-5xl font-serif text-brand-charcoal mb-4">
              Have a project in mind?
            </h4>
            <p className="font-sans text-brand-muted text-lg">
              Let's create something exceptional.
            </p>
          </div>
          <Link href="/contact" className="flex items-center gap-4 font-sans text-xs tracking-[0.3em] uppercase text-brand-charcoal group border-b border-brand-charcoal pb-4">
            Start Your Project
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-16 border-t border-brand-border/40">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60">
            © 2026 Brickyard Architects
          </p>

          <div className="flex items-center gap-12 font-sans text-[10px] tracking-[0.15em] uppercase text-brand-muted">
            <Link href="#" className="hover:text-brand-charcoal transition-preset">Instagram</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-preset">Behance</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-preset">LinkedIn</Link>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-4 group md:ml-auto"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-muted">Top</span>
            <div className="p-3 border border-brand-border rounded-full hover:bg-brand-charcoal hover:text-white transition-preset">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </footer>
    </main>
  );
}