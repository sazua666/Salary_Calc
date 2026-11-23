"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border-subtle)] transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-[var(--text-primary)]">
            SalaryCalc
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8 font-medium text-sm text-[var(--text-secondary)]">
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

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/salary-calculator" className="hidden lg:block text-sm font-bold bg-[var(--primary)] text-[var(--background)] px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Start Calculating
            </Link>
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--elevated)] transition-colors"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="lg:hidden flex flex-col gap-1 border-t border-[var(--border-subtle)] py-3 font-medium text-sm text-[var(--text-secondary)]">
            <Link href="/salary-calculator" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 hover:bg-[var(--elevated)] hover:text-[var(--primary)] transition-colors">
              Calculator
            </Link>
            <Link href="/countries" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 hover:bg-[var(--elevated)] hover:text-[var(--primary)] transition-colors">
              Countries
            </Link>
            <Link href="/how-it-works" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 hover:bg-[var(--elevated)] hover:text-[var(--primary)] transition-colors">
              How It Works
            </Link>
            <Link href="/salary-calculator" onClick={() => setMenuOpen(false)} className="mt-2 rounded-md bg-[var(--primary)] px-3 py-3 text-center font-bold text-[var(--background)] hover:opacity-90 transition-opacity">
              Start Calculating
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
