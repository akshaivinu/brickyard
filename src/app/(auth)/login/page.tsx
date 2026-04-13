"use client";

import Image from "next/image";
import Link from "next/link";
import { loginAction } from "@/lib/auth-actions";
import { useActionState } from "react";

export default function LoginPage() {
  const action = async (_state: { error?: string } | undefined, formData: FormData): Promise<{ error?: string } | undefined> => {
    await loginAction(formData);
    return undefined;
  };
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-cream selection:bg-brand-charcoal selection:text-brand-cream">
      {/* Left: Background Image */}
      <div className="relative hidden lg:block h-full">
        <Image
          src="/assets/login.png"
          alt="Architectural visualization"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-charcoal/5" />
      </div>

      {/* Right: Login Form Area */}
      <div className="flex flex-col h-full bg-[#fcfaf7] relative px-8 py-12 md:px-24 md:py-16">
        {/* Back Button */}
        <div className="absolute top-12 left-8 md:left-12">
          <Link
            href="/"
            className="flex items-center gap-2 font-sans text-[10px] tracking-[0.4em] uppercase text-brand-charcoal hover:opacity-100 opacity-50 transition-opacity font-bold"
          >
            <span className="text-sm">←</span> Back
          </Link>
        </div>

        {/* Branding */}
        <div className="absolute top-12 right-12 text-right">
          <Link href="/" className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-charcoal font-bold opacity-80">
            Brickyard Architects
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-16">
            <h1 className="text-5xl font-serif text-brand-charcoal mb-4 tracking-tight">
              Client Portal
            </h1>
            <p className="font-sans text-brand-muted text-lg">
              Access your project dashboard.
            </p>
          </div>

          <form action={formAction} className="space-y-10">
            {state?.error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm font-sans border border-red-100 rounded-sm">
                {state.error === "invalid_credentials" ? "Invalid email or password." : "Something went wrong. Please try again."}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="font-sans text-[10px] tracking-widest uppercase text-brand-muted ml-0.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-brand-charcoal/5 border border-brand-charcoal/5 rounded-sm px-6 py-5 font-sans text-brand-charcoal outline-none focus:bg-white focus:border-brand-charcoal/10 transition-all placeholder:text-brand-muted/30"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="font-sans text-[10px] tracking-widest uppercase text-brand-muted ml-0.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-brand-charcoal/5 border border-brand-charcoal/5 rounded-sm px-6 py-5 font-sans text-brand-charcoal outline-none focus:bg-white focus:border-brand-charcoal/10 transition-all placeholder:text-brand-muted/30"
                placeholder="********"
              />
            </div>

            <div className="pt-4 border-b border-brand-charcoal/10 pb-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-between font-sans text-xs tracking-[0.4em] uppercase text-brand-charcoal hover:translate-x-1 transition-transform disabled:opacity-50"
              >
                {isPending ? "Logging in..." : "Sign In"}
                <span className="text-xl">→</span>
              </button>
            </div>

            <div className="text-center pt-8">
              <Link
                href="/forgot-password"
                className="font-sans text-[11px] tracking-widest uppercase text-brand-muted hover:text-brand-charcoal transition-colors"
              >
                Forgot password
              </Link>
            </div>
          </form>
        </div>

        {/* Footer info (matches mockup style) */}
        <div className="mt-auto pt-12 flex justify-between items-center text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted/40">
          <p>© 2026 Brickyard Architects</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-brand-charcoal transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-brand-charcoal transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
