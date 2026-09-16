import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | SalaryCalc",
  description: "Learn how SalaryCalc handles your information.",
};

const sections = [
  {
    title: "Your salary stays on your device",
    body: "Salary calculations are performed in your browser. The salary, bonus, deductions, and calculator choices you enter are not sent to or stored on a SalaryCalc server.",
  },
  {
    title: "Anonymous visitor count",
    body: "The footer's live visitor count uses a temporary connection identifier to count active sessions. It is not intended to identify you and is removed when the connection ends.",
  },
  {
    title: "Information we do not collect",
    body: "SalaryCalc does not ask for an account, name, email address, bank details, tax identification number, or payment information.",
  },
  {
    title: "External websites",
    body: "Links to tax authorities and other external websites are provided for reference. Their privacy practices are governed by their own policies, not this one.",
  },
  {
    title: "Changes to this policy",
    body: "If this policy changes, the updated version will be published on this page with a revised effective date.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative py-16 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--primary)/7%,transparent_70%)]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase block mb-3">Privacy</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Your information, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">kept simple.</span></h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--text-secondary)]">SalaryCalc is designed to help you plan without asking you to hand over personal financial information.</p>
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
