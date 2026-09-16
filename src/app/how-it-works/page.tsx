import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — SalaryCalc",
  description: "Understand how SalaryCalc calculates your take-home pay, taxes, and deductions using official tax rules.",
};

const STEPS = [
  {
    number: "01",
    title: "Choose Your Country",
    subtitle: "India · USA · UK",
    description:
      "Select where you work. Each country has its own tax system. SalaryCalc loads the correct government-sourced rules automatically — tax year, brackets, allowances, and contributions.",
    detail: "The tax year data is versioned. You always know which year's rules are in use.",
    icon: "🌍",
    color: "var(--primary)",
  },
  {
    number: "02",
    title: "Enter Your Salary or CTC",
    subtitle: "Type it or drag the slider",
    description:
      "Enter your gross annual salary, or for India, your Cost to Company (CTC). You can type the exact number or use the slider for quick exploration. The result updates instantly as you type.",
    detail: "CTC ≠ take-home. SalaryCalc separates employer costs, employee deductions, and actual cash compensation.",
    icon: "✏️",
    color: "var(--secondary)",
  },
  {
    number: "03",
    title: "Select Tax Options",
    subtitle: "Regime · Filing Status · Contributions",
    description:
      "For India, choose between the New and Old tax regime. For the USA, your filing status affects your standard deduction and brackets. Each option changes the calculation immediately.",
    detail: "SalaryCalc never assumes — it reflects exactly what you select.",
    icon: "⚙️",
    color: "var(--tertiary)",
  },
  {
    number: "04",
    title: "See Your Take-Home",
    subtitle: "Annual · Monthly · Breakdown",
    description:
      "Instantly see your net annual and monthly take-home. Every deduction is listed — income tax, social contributions, employee PF. Click any row to understand what it is and why.",
    detail: "The effective tax rate and total deductions are calculated from your actual inputs — never from averages.",
    icon: "📊",
    color: "var(--primary)",
  },
];

const FAQS = [
  {
    q: "Is SalaryCalc accurate?",
    a: "SalaryCalc uses official government-sourced tax brackets, deductions, and contribution rules. Results are estimates for planning purposes — actual payroll may vary based on employer-specific configurations, benefits, and local surcharges.",
  },
  {
    q: "What is CTC and why is it not the same as take-home?",
    a: "CTC (Cost to Company) includes everything your employer spends on you — salary, employer PF, gratuity, insurance, and other benefits. Many of these are costs the employer bears and never directly reach your bank account. Your take-home is only the cash after all deductions.",
  },
  {
    q: "What is the New vs Old tax regime in India?",
    a: "India introduced the New Tax Regime with lower slab rates but fewer deductions. The Old Tax Regime has higher slab rates but allows deductions under 80C, HRA, LTA, and more. The New Regime is now the default as of FY 2023-24.",
  },
  {
    q: "Does SalaryCalc store my salary data?",
    a: "No. All calculations happen locally in your browser. SalaryCalc does not send your salary or personal financial data to any server. The live visitor count is completely anonymous.",
  },
  {
    q: "How often is tax data updated?",
    a: "Tax data is updated after each official budget or fiscal year change. Every dataset includes a 'last reviewed' date and links directly to the official government source.",
  },
  {
    q: "Why does SalaryCalc not show state taxes for the USA?",
    a: "Federal taxes are currently supported for the USA. State-level taxes (California, New York, Texas, etc.) are being added. The architecture already supports per-state datasets.",
  },
];

const HOW_TAX_WORKS = [
  {
    flag: "🇮🇳",
    country: "India",
    steps: [
      "Start with gross salary / CTC",
      "Subtract standard deduction (₹75,000 New / ₹50,000 Old)",
      "Apply progressive tax slabs (0% → 30%)",
      "Apply Section 87A rebate if applicable",
      "Add 4% Health & Education Cess",
      "Subtract Employee PF (12% of Basic, capped at ₹15,000/mo)",
    ],
  },
  {
    flag: "🇺🇸",
    country: "USA",
    steps: [
      "Start with gross salary",
      "Subtract standard deduction ($15,000 for single filers)",
      "Apply progressive federal tax brackets (10% → 37%)",
      "Add Social Security (6.2%) and Medicare (1.45%) — FICA",
      "Additional Medicare surtax (0.9%) above $200K",
      "State income tax is applied on top (varies by state)",
    ],
  },
  {
    flag: "🇬🇧",
    country: "UK",
    steps: [
      "Start with gross salary",
      "Personal Allowance is tax-free (£12,570)",
      "Basic rate: 20% on £12,571–£50,270",
      "Higher rate: 40% on £50,271–£125,140",
      "Additional rate: 45% above £125,140",
      "National Insurance (Class 1) on top of income tax",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* HERO */}
        <section className="relative py-16 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--secondary)/6%,transparent_70%)]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase mb-3 block">How It Works</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Salary Calculations,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
              Clearly Explained.
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            No black boxes. No flat-rate guesses. Every number SalaryCalc shows is derived step by step from official government tax rules.
          </p>
        </section>

        {/* 4-STEP FLOW */}
        <section className="px-4 pb-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((step) => (
              <Card key={step.number} className="p-6 border border-[var(--border-subtle)] hover:border-[var(--primary)]/30 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm text-[var(--background)] shrink-0" style={{ background: step.color }}>
                    {step.number}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{step.title}</h2>
                    <p className="text-xs font-mono text-[var(--text-muted)]">{step.subtitle}</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] text-sm mb-3 leading-relaxed">{step.description}</p>
                <div className="text-xs text-[var(--text-muted)] bg-[var(--elevated)]/50 border border-[var(--border-subtle)] rounded-md px-3 py-2 italic">
                  {step.detail}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* HOW TAX IS CALCULATED PER COUNTRY */}
        <section className="px-4 pb-16 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase mb-3 block">Country Methodology</span>
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">How Tax Is Calculated</h2>
            <p className="text-[var(--text-secondary)] text-sm max-w-xl mx-auto">
              SalaryCalc never uses a flat tax rate. Each jurisdiction is calculated bracket-by-bracket, contribution-by-contribution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_TAX_WORKS.map((c) => (
              <Card key={c.country} className="p-6 border border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">{c.flag}</span>
                  <h3 className="text-lg font-bold">{c.country}</h3>
                </div>
                <ol className="space-y-2">
                  {c.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="font-mono font-bold text-[var(--primary)] text-xs mt-0.5 shrink-0">{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </section>

        {/* CTC EXPLAINER */}
        <section className="px-4 pb-16 max-w-4xl mx-auto">
          <Card className="p-8 border border-[var(--border-subtle)]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">What Happens Between CTC and Your Bank Account?</h2>
              <p className="text-[var(--text-secondary)] text-sm">For Indian professionals — the four stages of your compensation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "1", label: "Gross CTC", icon: "📋", desc: "Everything your employer spends on you — salary, PF, gratuity, benefits." },
                { step: "2", label: "Taxable Income", icon: "🧮", desc: "CTC minus standard deduction and eligible exemptions (HRA, LTA in Old regime)." },
                { step: "3", label: "Tax & Contributions", icon: "🏛️", desc: "Income tax (progressive) + Employee PF + Cess + any other deductions." },
                { step: "4", label: "Net Salary", icon: "🏦", desc: "The actual amount credited to your bank account every month." },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg bg-[var(--elevated)]/40 border border-[var(--border-subtle)]">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="font-mono text-xs font-bold text-[var(--primary)]">STEP {item.step}</div>
                  <div className="font-bold text-sm">{item.label}</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="px-4 pb-16 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase mb-3 block">FAQ</span>
            <h2 className="text-3xl font-extrabold tracking-tight">Common Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <Card key={faq.q} className="p-5 border border-[var(--border-subtle)]">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-20 max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to See Your Take-Home?</h2>
          <p className="text-[var(--text-secondary)] mb-6">Enter your salary and get a full breakdown in seconds.</p>
          <Link
            href="/salary-calculator"
            className="inline-block px-8 py-3 bg-[var(--primary)] text-[var(--background)] font-bold rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            Start Calculating →
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
