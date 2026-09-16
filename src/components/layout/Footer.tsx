"use client";

import Link from "next/link";
import { LiveVisitorCount } from "./LiveVisitorCount";
import { LiveDateTime } from "./LiveDateTime";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--card)] border-t border-[var(--border-subtle)] mt-20 pt-12 pb-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand & Tagline */}
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">SalaryCalc</h2>
            <p className="text-[var(--text-secondary)] mb-1">Know your gross salary.</p>
            <p className="text-[var(--text-secondary)] mb-1">Understand every deduction.</p>
            <p className="text-[var(--text-secondary)]">See what actually reaches your bank.</p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <Link href="/salary-calculator" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Calculator</Link>
            <Link href="/countries" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Countries</Link>
            <Link href="/tax-information" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Tax Information</Link>
            <Link href="/how-it-works" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">How It Works</Link>
            <Link href="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">Privacy - Terms</Link>
          </div>

          {/* Live Data */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <LiveVisitorCount />
            <LiveDateTime />
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-sm text-[var(--text-muted)]">
            <p>© 2026 SalaryCalc. All rights reserved.</p>
            <p>Created by Subhojit Sarkar.</p>
          </div>
          <div className="text-sm text-[var(--text-muted)] max-w-xl text-left md:text-right">
            Disclaimer: Salary calculations are estimates for informational and planning purposes only. Actual taxes, deductions, payroll calculations and employer benefits may vary.
          </div>
        </div>
      </div>
    </footer>
  );
}
