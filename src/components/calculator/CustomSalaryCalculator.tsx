"use client";

import { useMemo, useState } from "react";
import { calculateSalary } from "@/tax/engine/calculateSalary";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const COUNTRY_CONFIG = {
  india: { name: "India", flag: "🇮🇳", currency: "INR", locale: "en-IN", symbol: "₹", salary: 2400000, bonus: 0, deductions: 0 },
  usa: { name: "USA", flag: "🇺🇸", currency: "USD", locale: "en-US", symbol: "$", salary: 120000, bonus: 0, deductions: 0 },
  uk: { name: "UK", flag: "🇬🇧", currency: "GBP", locale: "en-GB", symbol: "£", salary: 80000, bonus: 0, deductions: 0 },
} as const;

type Country = keyof typeof COUNTRY_CONFIG;
type Field = "salary" | "bonus" | "deductions";

function numberFrom(value: string) {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

export function CustomSalaryCalculator() {
  const [country, setCountry] = useState<Country>("india");
  const [regime, setRegime] = useState("new");
  const [paySchedule, setPaySchedule] = useState<"monthly" | "biweekly">("monthly");
  const [values, setValues] = useState({ salary: 2400000, bonus: 0, deductions: 0 });
  const cfg = COUNTRY_CONFIG[country];

  const updateField = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: numberFrom(value) }));
  };

  const chooseCountry = (nextCountry: Country) => {
    const next = COUNTRY_CONFIG[nextCountry];
    setCountry(nextCountry);
    setValues({ salary: next.salary, bonus: next.bonus, deductions: next.deductions });
  };

  const result = useMemo(
    () => calculateSalary({
      country,
      taxYear: "2026",
      salary: values.salary + values.bonus,
      regime,
      additionalDeductions: values.deductions,
    }),
    [country, regime, values],
  );

  const format = (amount: number) => new Intl.NumberFormat(cfg.locale, {
    style: "currency", currency: cfg.currency, maximumFractionDigits: 0,
  }).format(amount);
  const periods = paySchedule === "monthly" ? 12 : 26;
  const periodLabel = paySchedule === "monthly" ? "month" : "two weeks";
  const takeHomePercent = result.grossAnnual ? Math.round((result.netAnnual / result.grossAnnual) * 100) : 0;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7 p-6 md:p-8 border border-[var(--border-subtle)]">
          <div className="flex items-start justify-between gap-4 mb-7">
            <div>
              <h2 className="text-2xl font-bold">Build your calculation</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Adjust the numbers that matter to your pay package.</p>
            </div>
            <span className="shrink-0 text-xs font-mono font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-1 rounded-full">TAX YEAR 2026</span>
          </div>

          <section className="mb-7">
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Where do you pay tax?</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(COUNTRY_CONFIG) as Country[]).map((option) => (
                <Button key={option} type="button" variant={country === option ? "default" : "outline"} onClick={() => chooseCountry(option)}>
                  {COUNTRY_CONFIG[option].flag} {COUNTRY_CONFIG[option].name}
                </Button>
              ))}
            </div>
          </section>

          {country === "india" && (
            <section className="mb-7">
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Indian tax regime</label>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant={regime === "new" ? "default" : "outline"} onClick={() => setRegime("new")}>New regime</Button>
                <Button type="button" variant={regime === "old" ? "default" : "outline"} onClick={() => setRegime("old")}>Old regime</Button>
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                {regime === "new" ? "Includes the ₹75,000 standard deduction." : "Includes the ₹50,000 standard deduction; personal exemptions are not modelled."}
              </p>
            </section>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MoneyInput label={country === "india" ? "Annual CTC" : "Annual base salary"} hint="Before tax" symbol={cfg.symbol} value={values.salary} onChange={(value) => updateField("salary", value)} />
            <MoneyInput label="Variable pay / bonus" hint="Annual taxable income" symbol={cfg.symbol} value={values.bonus} onChange={(value) => updateField("bonus", value)} />
            <MoneyInput label="Other payroll deductions" hint="Insurance, retirement, etc." symbol={cfg.symbol} value={values.deductions} onChange={(value) => updateField("deductions", value)} />
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Display take-home by</label>
              <select value={paySchedule} onChange={(event) => setPaySchedule(event.target.value as "monthly" | "biweekly")} className="w-full min-h-12 px-3 bg-[var(--elevated)] border border-[var(--border-subtle)] rounded-lg text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50">
                <option value="monthly">Monthly pay</option>
                <option value="biweekly">Biweekly pay</option>
              </select>
            </div>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-4">
            Bonus is treated as taxable income. Other payroll deductions are subtracted after the tax estimate; they do not change taxable income in this calculator.
          </p>
        </Card>

        <Card className="lg:col-span-5 p-6 md:p-8 border border-[var(--border-subtle)] bg-[var(--elevated)]/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Your estimated take-home</span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] text-xs font-bold">LIVE</span>
            </div>
            <p className="font-mono text-4xl md:text-5xl font-extrabold mt-4 tracking-tight">{format(result.netAnnual)}</p>
            <p className="text-sm text-[var(--primary)] font-mono font-bold mt-2">{format(result.netAnnual / periods)} <span className="text-[var(--text-muted)] font-normal">per {periodLabel}</span></p>

            <div className="my-7 h-2 rounded-full overflow-hidden bg-[var(--border-subtle)] flex">
              <div className="bg-[var(--primary)] transition-all" style={{ width: `${takeHomePercent}%` }} />
              <div className="bg-[var(--critical)] transition-all" style={{ width: `${100 - takeHomePercent}%` }} />
            </div>
            <div className="space-y-3 text-sm font-mono">
              <Breakdown label="Base salary" amount={values.salary} format={format} />
              {values.bonus > 0 && <Breakdown label="Variable pay / bonus" amount={values.bonus} format={format} />}
              {result.breakdown.filter((line) => line.isDeduction).map((line) => <Breakdown key={line.id} label={line.name} amount={line.amount} format={format} deduction />)}
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Effective income-tax rate</span>
            <span className="font-mono font-bold">{result.effectiveTaxRate.toFixed(1)}%</span>
          </div>
        </Card>
      </div>

      <Card className="p-5 md:p-6 border border-[var(--border-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold">Based on {result.metadata.sourceName} rules</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{country === "usa" ? "Federal taxes only; state and local taxes are not included." : "Tax estimates are for planning only and may differ from your payroll."}</p>
        </div>
        <a href={result.metadata.sourceUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--secondary)] hover:text-[var(--primary)] transition-colors whitespace-nowrap">View source ↗</a>
      </Card>
    </div>
  );
}

function MoneyInput({ label, hint, symbol, value, onChange }: { label: string; hint: string; symbol: string; value: number; onChange: (value: string) => void }) {
  return <div><label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">{label}</label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-[var(--primary)]">{symbol}</span><input type="text" inputMode="decimal" value={value.toLocaleString("en-US")} onChange={(event) => onChange(event.target.value)} className="w-full min-h-12 pl-8 pr-3 bg-[var(--elevated)] border border-[var(--border-subtle)] rounded-lg font-mono text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50" /></div><p className="text-xs text-[var(--text-muted)] mt-1.5">{hint}</p></div>;
}

function Breakdown({ label, amount, format, deduction = false }: { label: string; amount: number; format: (amount: number) => string; deduction?: boolean }) {
  return <div className="flex justify-between gap-4"><span className="text-[var(--text-secondary)]">{label}</span><span className={deduction ? "text-[var(--warning)]" : "text-[var(--text-primary)]"}>{deduction ? "−" : ""}{format(amount)}</span></div>;
}
