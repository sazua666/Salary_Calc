import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Tax Information | SalaryCalc",
  description: "A plain-language overview of the tax assumptions used by SalaryCalc for India, the USA, and the UK.",
};

const countries = [
  { flag: "🇮🇳", name: "India", year: "FY 2026–27", source: "Income Tax Department", href: "https://incometaxindia.gov.in", facts: ["Choose the New or Old regime in the calculator.", "Standard deduction: ₹75,000 (New) or ₹50,000 (Old).", "The estimate includes income-tax cess and shows employee PF only when supplied as a custom deduction."], note: "The Old Regime estimate does not model personal exemptions such as HRA, 80C, LTA, or home-loan interest." },
  { flag: "🇺🇸", name: "United States", year: "Tax year 2026", source: "Internal Revenue Service", href: "https://www.irs.gov", facts: ["Federal income-tax brackets for a single filer are used.", "A $15,000 standard deduction is applied.", "FICA is estimated at 7.65% of annual salary."], note: "State, city, filing-status, health-insurance, retirement-plan, and wage-cap rules are not included." },
  { flag: "🇬🇧", name: "United Kingdom", year: "Tax year 2026–27", source: "HM Revenue & Customs", href: "https://www.gov.uk", facts: ["A £12,570 personal allowance is applied.", "Income tax is calculated progressively across basic, higher, and additional rates.", "Class 1 employee National Insurance is estimated."], note: "The calculator does not model pension salary sacrifice, student loans, Scottish rates, or allowance tapering." },
];

export default function TaxInformationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative py-16 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--secondary)/7%,transparent_70%)]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase block mb-3">Tax information</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">The rules behind your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">estimate.</span></h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--text-secondary)]">A transparent overview of what SalaryCalc includes, which tax year it uses, and where to check the official rules.</p>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card key={country.name} className="p-6 border border-[var(--border-subtle)] flex flex-col">
              <div className="flex items-center gap-3 mb-5"><span className="text-3xl">{country.flag}</span><div><h2 className="text-xl font-bold">{country.name}</h2><p className="text-xs font-mono text-[var(--primary)] mt-0.5">{country.year}</p></div></div>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)] flex-1">
                {country.facts.map((fact) => <li key={fact} className="flex gap-2"><span className="text-[var(--primary)]">✓</span><span>{fact}</span></li>)}
              </ul>
              <div className="mt-6 p-3 rounded-lg bg-[var(--elevated)]/60 border border-[var(--border-subtle)] text-xs leading-relaxed text-[var(--text-muted)]"><strong className="text-[var(--text-secondary)]">Not included: </strong>{country.note}</div>
              <a href={country.href} target="_blank" rel="noreferrer" className="mt-5 text-sm font-bold text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">Visit {country.source} ↗</a>
            </Card>
          ))}
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <Card className="p-7 md:p-8 border border-[var(--border-subtle)]">
            <h2 className="text-2xl font-bold mb-3">How to use these estimates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-[var(--text-secondary)]">
              <p><span className="font-mono text-[var(--primary)] font-bold">01</span><br /><strong className="text-[var(--text-primary)] block mt-1">Start with gross pay</strong>Enter your annual CTC or salary before tax.</p>
              <p><span className="font-mono text-[var(--primary)] font-bold">02</span><br /><strong className="text-[var(--text-primary)] block mt-1">Add your context</strong>Use the full calculator to include annual bonus and any known payroll deductions.</p>
              <p><span className="font-mono text-[var(--primary)] font-bold">03</span><br /><strong className="text-[var(--text-primary)] block mt-1">Confirm with payroll</strong>Use the result for planning; payroll or a qualified adviser can confirm your exact outcome.</p>
            </div>
          </Card>
        </section>

        <section className="px-4 pb-8 text-center">
          <Link href="/salary-calculator" className="inline-block px-7 py-3 rounded-md bg-[var(--primary)] text-[var(--background)] text-sm font-bold hover:opacity-90 transition-opacity">Open the full calculator</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
