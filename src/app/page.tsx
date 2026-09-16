import { FullSalaryCalculator } from "@/components/calculator/FullSalaryCalculator";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative w-full pt-20 pb-16 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[var(--primary)]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 flex flex-col items-center text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase mb-4">
              Global Salary Calculator
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              Your CTC Isn't Your<br className="hidden md:block" /> Take-Home.
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mb-6">
              See What You Actually Keep.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Calculate your after-tax salary, deductions, contributions, and monthly take-home pay across India, the US, and the UK.
            </p>
          </div>

          {/* MAIN CALCULATOR */}
          <div className="px-4">
            <FullSalaryCalculator />
          </div>
        </section>

        {/* ── TRUST CARDS ── */}
        <section className="px-4 py-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🏛️",
                title: "Official Tax Rules",
                desc: "Every calculation uses government-sourced tax brackets, rates, and thresholds. No estimates, no blogs.",
              },
              {
                icon: "🔍",
                title: "Transparent Breakdown",
                desc: "Every deduction is itemised. You see income tax, social contributions, and employee PF as separate lines.",
              },
              {
                icon: "📅",
                title: "Tax-Year Aware",
                desc: "SalaryCalc knows which tax year's rules are active. You always see the correct, dated source.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 border border-[var(--border-subtle)] flex flex-col gap-3">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-bold text-base">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-[var(--text-muted)] mt-6">
            Salary calculations are estimates for informational and planning purposes only. Actual taxes, deductions, and payroll may vary.
          </p>
        </section>

        {/* ── QUICK LINKS ── */}
        <section className="px-4 pb-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Explore More</h2>
            <p className="text-[var(--text-secondary)] text-sm">Dive deeper into country tax systems or learn how the calculator works.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link href="/countries">
              <Card className="p-6 border border-[var(--border-subtle)] hover:border-[var(--primary)]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🌍</span>
                  <h3 className="font-bold text-lg">Countries & Tax Systems</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Compare income growth and tax burdens across India, USA, and UK. See historical data and key tax facts.
                </p>
                <p className="text-xs text-[var(--primary)] font-bold mt-3 font-mono">View Countries →</p>
              </Card>
            </Link>
            <Link href="/how-it-works">
              <Card className="p-6 border border-[var(--border-subtle)] hover:border-[var(--secondary)]/40 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📖</span>
                  <h3 className="font-bold text-lg">How It Works</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Understand progressive tax brackets, the difference between CTC and take-home, and every step of the calculation.
                </p>
                <p className="text-xs text-[var(--secondary)] font-bold mt-3 font-mono">Learn More →</p>
              </Card>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
