"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Work", href: "/work" },
    { name: "Studio", href: "/studio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className={`w-full bg-brand-cream z-50 pt-8 pb-4 px-8 md:px-16 ${className}`}>
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="font-serif text-3xl tracking-tight text-brand-charcoal z-50"
        >
          <span className="font-bold">
            Brickyard
          </span>
        </Link>

        {/* Navigation & CTA */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-4 lg:gap-0">
          <nav className="hidden lg:flex items-center gap-12 font-sans text-[10px] uppercase tracking-[0.3em] text-brand-charcoal">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${isActive ? "text-brand-charcoal font-bold" : "text-brand-charcoal/60 hover:text-brand-charcoal"} transition-colors`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Vertical Separator - Hidden on Tablets/Mobile */}
          <div className="hidden lg:block w-px h-3 bg-brand-charcoal/20 mx-10" />

          <div className="flex items-center w-full justify-between gap-8">
            {/* CTA */}
            <Link
              href="/start"
              className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-brand-charcoal hover:opacity-70 transition-opacity"
            >
              START <span className="text-sm">→</span>
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex flex-col gap-1.5 z-50 group p-2"
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-px bg-brand-charcoal transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <div className={`w-6 h-px bg-brand-charcoal transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <div className={`w-6 h-px bg-brand-charcoal transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 bg-brand-cream z-40 flex flex-col items-center justify-center p-8 lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8 font-serif text-4xl text-brand-charcoal uppercase tracking-widest text-center mt-20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:italic transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-16 w-full max-w-xs h-px bg-brand-charcoal/10" />
            <div className="mt-8 flex gap-8 font-sans text-[10px] uppercase tracking-[0.3em] text-brand-charcoal/40">
              <Link href="#" onClick={() => setIsOpen(false)}>Instagram</Link>
              <Link href="#" onClick={() => setIsOpen(false)}>LinkedIn</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
