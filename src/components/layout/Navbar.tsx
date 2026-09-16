"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border-subtle)] transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl tracking-tight text-[var(--text-primary)]">
            SalaryCalc
          </Link>
        </div>

        {/* CENTER (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[var(--text-secondary)]">
          <Link href="/salary-calculator" className="hover:text-[var(--primary)] transition-colors">
            Calculator
          </Link>
          <Link href="/countries" className="hover:text-[var(--primary)] transition-colors">
            Countries
          </Link>
          <Link href="/how-it-works" className="hover:text-[var(--primary)] transition-colors">
            How It Works
          </Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-4">
            <Link href="/salary-calculator" className="text-sm font-bold bg-[var(--primary)] text-[var(--background)] px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Start Calculating
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
