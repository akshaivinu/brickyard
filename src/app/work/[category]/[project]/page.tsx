"use client";

import React, { use } from 'react';
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MoveRight, ArrowUp, Plus } from "lucide-react";

interface Project {
    title: string;
    location: string;
    year: string;
    services: string;
    client: string;
    scope: string;
    timeline: string;
    area: string;
    category: string;
    overview: string;
    quote: string;
    details: {
        client: string;
        location: string;
        scope: string;
        timeline: string;
        tools: string;
    };
    images: {
        hero: string;
        gallery: string[];
    };
    nextProject: { title: string; slug: string };
    prevProject: { title: string; slug: string };
    currentNum: string;
    totalNum: string;
}

const PROJECT_DATA: Record<string, Project> = {
    "horizon-villa": {
        title: "Horizon Villa",
        location: "Malibu, California",
        year: "2023",
        services: "Exterior & Interior Visualization",
        client: "Private",
        scope: "Full Visualization",
        timeline: "16 Weeks",
        area: "8,500 Sq. Ft.",
        category: "Residence",
        overview: "The Horizon Villa explores the harmony between modern structure and natural surroundings. Perched above the Pacific, the design emphasizes openness, light, and material authenticity.",
        quote: "Light became the defining architectural material.",
        details: {
            client: "Private",
            location: "Malibu California",
            scope: "Elevation, Interior, Landscape",
            timeline: "16 Weeks",
            tools: "3ds Max, Corona, V-Ray, Photoshop"
        },
        images: {
            hero: "/assets/elevation.png",
            gallery: [
                "/assets/interior.png",
                "/assets/elevation.png",
                "/assets/interior.png",
                "/assets/interior.png",
                "/assets/elevation.png",
                "/assets/elevation.png",
            ]
        },
        nextProject: { title: "Overlook Mansion", slug: "overlook-mansion" },
        prevProject: { title: "Everwood Residence", slug: "everwood-residence" },
        currentNum: "01",
        totalNum: "06"
    }
};

export default function ProjectPage({ params }: { params: Promise<{ category: string; project: string }> }) {
    const resolvedParams = use(params);
    const projectSlug = resolvedParams.project;
    const project = PROJECT_DATA[projectSlug] || PROJECT_DATA["horizon-villa"];

    return (
        <main className="min-h-screen bg-brand-cream selection:bg-brand-charcoal selection:text-brand-cream overflow-hidden">
            <Navbar />

            {/* Header Section */}
            <section className="pt-28 pb-12 px-8 md:px-16 lg:px-24">
                <div className="max-w-[1440px] mx-auto border-b border-brand-border/40 pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                        <div>
                            <h1 className="text-6xl md:text-8xl font-serif text-brand-charcoal mb-6 tracking-tight">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 font-sans text-xs tracking-[0.2em] uppercase text-brand-muted">
                                <span className="text-brand-charcoal font-medium">{project.location}</span>
                                <span className="w-1 h-1 rounded-full bg-brand-border" />
                                <span>{project.year}</span>
                                <span className="w-1 h-1 rounded-full bg-brand-border" />
                                <span>{project.services}</span>
                            </div>
                        </div>

                        <div className="flex gap-12 md:gap-16">
                            <div className="flex flex-col gap-2">
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60">Client</span>
                                <span className="font-serif text-brand-charcoal">{project.client}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60">Scope</span>
                                <span className="font-serif text-brand-charcoal">{project.scope}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60">Timeline</span>
                                <span className="font-serif text-brand-charcoal">{project.timeline}</span>
                            </div>
                            <Link href="/contact" className="hidden md:flex items-center gap-2 bg-brand-charcoal text-brand-cream px-6 py-3 rounded-sm font-sans text-[10px] tracking-[0.15em] uppercase hover:bg-brand-charcoal/90 transition-colors">
                                Start Project <Plus className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="aspect-[21/9] relative overflow-hidden group">
                        <Image
                            src={project.images.hero}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 px-8 md:px-16 lg:px-24">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-6">
                        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-muted mb-8 block">Project Overview</span>
                        <p className="font-sans text-brand-muted text-lg leading-relaxed max-w-xl">
                            {project.overview.split('modern').map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && <strong className="text-brand-charcoal font-medium">modern</strong>}
                                </span>
                            ))}
                        </p>
                    </div>

                    <div className="md:col-span-5 md:col-start-8 grid grid-cols-3 gap-8 md:pt-16 border-t md:border-t-0 md:border-l border-brand-border/40 md:pl-12">
                        <div>
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 mb-2 block">Area</span>
                            <span className="font-sans text-brand-charcoal font-medium">{project.area}</span>
                        </div>
                        <div>
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 mb-2 block">Location</span>
                            <span className="font-sans text-brand-charcoal font-medium">{project.details.location}</span>
                        </div>
                        <div>
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 mb-2 block">Category</span>
                            <span className="font-sans text-brand-charcoal font-medium">{project.category}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section - Precision Aligned Row */}
            <section className="py-16 px-8 md:px-16 lg:px-24">
                <div className="max-w-[1440px] mx-auto flex flex-col gap-8">
                    {/* Row 1: Large Feature & Deep Detail */}
                    <div className="flex flex-col md:flex-row md:h-[600px] gap-8">
                        <div className="flex-8 relative overflow-hidden bg-brand-border/10">
                            <Image src={project.images.gallery[0] || "/assets/elevation.png"} alt="Primary View" fill className="object-cover" />
                        </div>
                        <div className="flex-4 relative overflow-hidden bg-brand-border/10">
                            <Image src={project.images.gallery[3] || "/assets/interior.png"} alt="Portrait View" fill className="object-cover" />
                        </div>
                    </div>

                    {/* Row 2: The Multi-Perspective Mix (Matches the user's screenshot requirement) */}
                    <div className="flex flex-col md:flex-row md:h-[700px] gap-8">
                        {/* Quote & Small Detail */}
                        <div className="flex-4 flex flex-col gap-8">
                            <div className="flex-grow flex flex-col justify-center border-l-2 border-brand-charcoal pl-8 bg-brand-border/5 px-8">
                                <blockquote className="text-3xl md:text-4xl font-serif text-brand-charcoal italic mb-6 leading-tight">
                                    "{project.quote}"
                                </blockquote>
                                <div className="flex items-center gap-4 text-brand-muted font-sans text-[10px] tracking-[0.3em] uppercase">
                                    <div className="w-8 h-px bg-brand-border" />
                                    Narrative
                                </div>
                            </div>
                            <div className="flex-[1.5] relative overflow-hidden">
                                <Image src={project.images.gallery[1] || "/assets/elevation.png"} alt="Context View" fill className="object-cover" />
                            </div>
                        </div>

                        {/* Tall Vertical In the Middle */}
                        <div className="flex-3 relative overflow-hidden">
                            <Image src={project.images.gallery[2] || "/assets/interior.png"} alt="Vertical Feature" fill className="object-cover" />
                        </div>

                        {/* Double Stack on Right */}
                        <div className="flex-5 flex flex-col gap-8">
                            <div className="flex-1 relative overflow-hidden">
                                <Image src={project.images.gallery[4] || "/assets/elevation.png"} alt="Detail Top" fill className="object-cover" />
                            </div>
                            <div className="flex-1 relative overflow-hidden">
                                <Image src={project.images.gallery[5] || "/assets/elevation.png"} alt="Detail Bottom" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Details Table */}
            <section className="py-24 px-8 md:px-16 lg:px-24 border-t border-brand-border/40">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
                    <div>
                        <h4 className="text-3xl font-serif text-brand-charcoal mb-12 flex items-center gap-6">
                            Project Details <div className="h-px bg-brand-border/40 flex-grow" />
                        </h4>
                        <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                            <div>
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 mb-2 block">Client</span>
                                <span className="font-sans text-brand-charcoal text-sm">{project.details.client}</span>
                            </div>
                            <div>
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 mb-2 block">Location</span>
                                <span className="font-sans text-brand-charcoal text-sm">{project.details.location}</span>
                            </div>
                            <div>
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 mb-2 block">Scope</span>
                                <span className="font-sans text-brand-charcoal text-sm">{project.details.scope}</span>
                            </div>
                            <div>
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 mb-2 block">Timeline</span>
                                <span className="font-sans text-brand-charcoal text-sm">{project.details.timeline}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-muted/60 mb-2 block">Tools</span>
                                <span className="font-sans text-brand-charcoal text-sm">{project.details.tools}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                        <div className="aspect-square bg-brand-border/10 border border-brand-border/40 relative overflow-hidden grayscale hover:grayscale-0 transition-all">
                            <Image src="/assets/interior.png" alt="Detail 1" fill className="object-cover opacity-60" />
                        </div>
                        <div className="aspect-square bg-brand-border/10 border border-brand-border/40 relative overflow-hidden grayscale hover:grayscale-0 transition-all">
                            <Image src="/assets/elevation.png" alt="Detail 2" fill className="object-cover opacity-60" />
                        </div>
                        <div className="aspect-square bg-brand-border/10 border border-brand-border/40 relative overflow-hidden grayscale hover:grayscale-0 transition-all">
                            <Image src="/assets/interior.png" alt="Detail 3" fill className="object-cover opacity-60" />
                        </div>
                        <div className="aspect-square bg-brand-border/10 border border-brand-border/40 relative overflow-hidden grayscale hover:grayscale-0 transition-all">
                            <Image src="/assets/elevation.png" alt="Detail 4" fill className="object-cover opacity-60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation & CTA */}
            <section className="border-t border-brand-border/40">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 py-16">
                    <div className="flex justify-between items-center mb-24">
                        <Link href={`/work/${resolvedParams.category}/${project.prevProject.slug}`} className="group flex flex-col items-start gap-4">
                            <div className="flex items-center gap-2 text-brand-muted font-sans text-[10px] tracking-[0.2em] uppercase group-hover:text-brand-charcoal transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Previous Project
                            </div>
                            <span className="text-xl md:text-2xl font-serif text-brand-charcoal/60 group-hover:text-brand-charcoal transition-colors">{project.prevProject.title}</span>
                        </Link>

                        <div className="flex items-center gap-12 font-sans text-xs tracking-[0.4em] text-brand-muted font-medium">
                            <div className="w-24 h-px bg-brand-border/40" />
                            {project.currentNum} / {project.totalNum}
                            <div className="w-24 h-px bg-brand-border/40" />
                        </div>

                        <Link href={`/work/${resolvedParams.category}/${project.nextProject.slug}`} className="group flex flex-col items-end gap-4 text-right">
                            <div className="flex items-center gap-2 text-brand-muted font-sans text-[10px] tracking-[0.2em] uppercase group-hover:text-brand-charcoal transition-colors">
                                Next Project <ArrowRight className="w-4 h-4" />
                            </div>
                            <span className="text-xl md:text-2xl font-serif text-brand-charcoal/60 group-hover:text-brand-charcoal transition-colors">{project.nextProject.title}</span>
                        </Link>
                    </div>

                    <div className="bg-brand-charcoal/5 rounded-sm p-12 md:p-20 flex flex-col md:flex-row justify-between items-center gap-12 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-1/3 h-full grayscale opacity-10 group-hover:scale-110 transition-transform duration-1000">
                            <Image src="/assets/elevation.png" alt="CTA BG" fill className="object-cover" />
                        </div>
                        <h4 className="text-3xl md:text-5xl font-serif text-brand-charcoal relative z-10">
                            Ready to bring your vision to life?
                        </h4>
                        <Link href="/contact" className="bg-brand-charcoal text-brand-cream px-10 py-5 rounded-sm font-sans text-[10px] tracking-[0.3em] uppercase hover:bg-brand-charcoal/90 transition-all flex items-center gap-4 relative z-10 group/btn">
                            Start Your Project
                            <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-12 px-8 md:px-16 lg:px-24 border-t border-brand-border/40">
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
