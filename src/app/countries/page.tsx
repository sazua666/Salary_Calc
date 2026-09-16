import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { IncomeGrowthChart, TaxBurdenChart } from "@/components/charts/CountryCharts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countries — Supported Tax Jurisdictions | SalaryCalc",
  description: "SalaryCalc supports India, USA, and UK salary and tax calculations with official government-sourced rules.",
};

const COUNTRIES = [
  {
    flag: "🇮🇳",
    name: "India",
    currency: "₹ INR",
    taxYear: "2026–27",
    source: "Income Tax Department",
    sourceUrl: "https://incometaxindia.gov.in",
    href: "/salary-calculator",
    defaultSalary: "₹24,00,000 CTC",
    keyFacts: [
      "Two regimes: New & Old tax regime",
      "Progressive slabs up to 30%",
      "Standard deduction of ₹75,000 (New) / ₹50,000 (Old)",
      "Section 87A rebate up to ₹60,000",
      "4% Health & Education Cess",
    ],
    color: "var(--primary)",
    highlight: "New regime: Zero tax up to ₹12L income after rebate.",
  },
  {
    flag: "🇺🇸",
    name: "United States",
    currency: "$ USD",
    taxYear: "2026",
    source: "IRS",
    sourceUrl: "https://irs.gov",
    href: "/salary-calculator",
    defaultSalary: "$120,000",
    keyFacts: [
      "7 federal tax brackets (10%–37%)",
      "Standard deduction of $15,000",
      "FICA: Social Security (6.2%) + Medicare (1.45%)",
      "Additional Medicare tax (0.9%) above $200K",
      "State income tax varies by state",
    ],
    color: "var(--secondary)",
    highlight: "Federal + FICA together determine your paycheck.",
  },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    currency: "£ GBP",
    taxYear: "2026–27",
    source: "HMRC",
    sourceUrl: "https://gov.uk/income-tax",
    href: "/salary-calculator",
    defaultSalary: "£80,000",
    keyFacts: [
      "Personal Allowance: £12,570 (tax-free)",
      "Basic rate 20% (£12,571–£50,270)",
      "Higher rate 40% (£50,271–£125,140)",
      "Additional rate 45% above £125,140",
      "National Insurance (Class 1) employee contributions",
    ],
    color: "var(--tertiary)",
    highlight: "Allowance tapers to zero above £125,140.",
  },
];

const COMING_SOON = [
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇪🇸", name: "Spain" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
];

export default function CountriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* HERO */}
        <section className="relative py-16 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--primary)/6%,transparent_70%)]" />
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase mb-3 block">Supported Countries</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Global Tax,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
              Locally Understood.
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Every country has its own tax system. SalaryCalc uses official government-sourced rules — not estimates — to show you what you keep.
          </p>
        </section>

        {/* COUNTRY CARDS */}
        <section className="px-4 pb-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUNTRIES.map((c) => (
              <Card key={c.name} className="p-6 flex flex-col gap-4 border border-[var(--border-subtle)] hover:border-[var(--primary)]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{c.flag}</span>
                    <div>
                      <h2 className="text-xl font-bold">{c.name}</h2>
                      <span className="text-xs font-mono text-[var(--text-muted)]">{c.currency}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
                    Live
                  </span>
                </div>

                <div className="bg-[var(--elevated)]/60 rounded-lg p-3 text-xs font-mono border border-[var(--border-subtle)]">
                  <div className="flex justify-between mb-1">
                    <span className="text-[var(--text-muted)]">Tax Year</span>
                    <span className="text-[var(--text-primary)] font-bold">{c.taxYear}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[var(--text-muted)]">Example</span>
                    <span className="text-[var(--primary)] font-bold">{c.defaultSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Source</span>
                    <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--secondary)] underline hover:text-[var(--primary)]">
                      {c.source} ↗
                    </a>
                  </div>
                </div>

                <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
                  {c.keyFacts.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-[var(--primary)] mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-xs text-[var(--text-muted)] bg-[var(--elevated)]/40 border border-[var(--border-subtle)] rounded-md p-2 italic">
                  {c.highlight}
                </div>

                <Link
                  href={c.href}
                  className="mt-auto block text-center py-2.5 rounded-md bg-[var(--primary)] text-[var(--background)] font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Calculate for {c.name} →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* DATA VISUALIZATIONS */}
        <section className="px-4 pb-16 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase mb-3 block">Historical Data</span>
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">Income & Tax Trends</h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm">
              How median incomes and effective tax burdens have changed over the years across India, USA, and UK.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border border-[var(--border-subtle)]">
              <IncomeGrowthChart />
            </Card>
            <Card className="p-6 border border-[var(--border-subtle)]">
              <TaxBurdenChart />
            </Card>
          </div>

          <div className="mt-4 text-center text-xs text-[var(--text-muted)]">
            Data sources: World Bank, OECD Taxing Wages, Office for National Statistics (ONS), US BLS.
            Income figures are in USD PPP for cross-country comparability. Historical effective rates are approximations for a single earner at the median income.
          </div>
        </section>

        {/* COMING SOON */}
        <section className="px-4 pb-20 max-w-6xl mx-auto">
          <Card className="p-8 border border-[var(--border-subtle)] text-center">
            <h3 className="text-xl font-bold mb-2">More Countries Coming Soon</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              We are actively adding more jurisdictions. Each new country uses official government tax rules — never invented figures.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {COMING_SOON.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] bg-[var(--elevated)]/40"
                >
                  <span>{c.flag}</span><span>{c.name}</span>
                  <span className="text-xs text-[var(--text-muted)] font-mono ml-1">Soon</span>
                </span>
              ))}
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
