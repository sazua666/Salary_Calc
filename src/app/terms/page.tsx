import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Use | SalaryCalc",
  description: "Terms for using SalaryCalc.",
};

const sections = [
  {
    title: "Planning tool only",
    body: "SalaryCalc provides illustrative salary and tax estimates for personal planning and educational purposes. It is not tax, legal, financial, payroll, or investment advice.",
  },
  {
    title: "Estimates can differ from payroll",
    body: "Tax rules, deductions, employment benefits, filing status, state or local taxes, and personal circumstances can change an actual payslip. Confirm important decisions with your employer, a tax authority, or a qualified professional.",
  },
  {
    title: "Supported calculations",
    body: "The calculator uses the displayed tax-year assumptions for India, the United States, and the United Kingdom. Country-specific limitations are explained on the Tax Information page.",
  },
  {
    title: "Acceptable use",
    body: "You may use SalaryCalc for lawful personal or professional planning. Do not attempt to disrupt the service, bypass its security measures, or use it in a way that harms other users.",
  },
  {
    title: "Updates and availability",
    body: "We may change, update, or discontinue parts of SalaryCalc at any time. We do not guarantee that the service or tax information will always be available, complete, or error-free.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative py-16 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--secondary)/7%,transparent_70%)]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase block mb-3">Terms of use</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Use SalaryCalc with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">confidence.</span></h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--text-secondary)]">A clear summary of what the calculator is for and how to use its estimates responsibly.</p>
        </section>
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <Card className="p-7 md:p-9 border border-[var(--border-subtle)]">
            <p className="text-xs font-mono text-[var(--text-muted)] mb-8">Effective date: September 16, 2026</p>
            <div className="space-y-8">
              {sections.map((section, index) => <div key={section.title} className={index ? "pt-8 border-t border-[var(--border-subtle)]" : ""}><h2 className="text-lg font-bold mb-2">{section.title}</h2><p className="text-sm leading-relaxed text-[var(--text-secondary)]">{section.body}</p></div>)}
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
