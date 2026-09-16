"use client";

import { useState } from "react";
import { calculateSalary } from "@/tax/engine/calculateSalary";
import { CalculationInput } from "@/tax/engine/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const COUNTRY_CONFIG: Record<string, {
  currency: string;
  locale: string;
  isoCode: string;
  defaultSalary: number;
  min: number;
  max: number;
  step: number;
  label: string;
}> = {
  india: { currency: "INR", locale: "en-IN", isoCode: "INR", defaultSalary: 2400000, min: 300000, max: 10000000, step: 100000, label: "Annual CTC (₹)" },
  usa:   { currency: "USD", locale: "en-US", isoCode: "USD", defaultSalary: 120000,  min: 20000,  max: 1000000,  step: 5000,   label: "Annual Salary ($)" },
  uk:    { currency: "GBP", locale: "en-GB", isoCode: "GBP", defaultSalary: 80000,   min: 10000,  max: 500000,   step: 1000,   label: "Annual Salary (£)" },
};

export function FullSalaryCalculator({ defaultCountry = "india" }: { defaultCountry?: string }) {
  const [country, setCountry] = useState(defaultCountry);
  const [salary, setSalary] = useState(COUNTRY_CONFIG[defaultCountry].defaultSalary);
  const [regime, setRegime] = useState("new");
  const [manualSalary, setManualSalary] = useState("");

  const cfg = COUNTRY_CONFIG[country];

  const handleCountryChange = (c: string) => {
    setCountry(c);
    setSalary(COUNTRY_CONFIG[c].defaultSalary);
    setManualSalary("");
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setManualSalary(raw);
    const val = parseInt(raw, 10);
    if (!isNaN(val) && val >= cfg.min && val <= cfg.max) setSalary(val);
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat(cfg.locale, { style: "currency", currency: cfg.isoCode, maximumFractionDigits: 0 }).format(val);

  const input: CalculationInput = { country, taxYear: "2026", salary, regime };
  const result = calculateSalary(input);

  const totalForBar = result.grossAnnual;
  const netPct   = Math.round((result.netAnnual / totalForBar) * 100);
  const taxPct   = Math.round((result.incomeTax / totalForBar) * 100);
  const socialPct = Math.round((result.socialTaxes / totalForBar) * 100);
  const contribPct = Math.round((result.employeeContributions / totalForBar) * 100);
  const otherPct = 100 - netPct - taxPct - socialPct - contribPct;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">

      {/* MAIN CALCULATOR CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT — INPUTS */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <Card className="p-6 border border-[var(--border-subtle)]">
            <h2 className="text-2xl font-bold mb-6">Calculate Your Take-Home Pay</h2>

            {/* Country */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Country</label>
              <div className="flex flex-wrap gap-2">
                {["india","usa","uk"].map((c) => (
                  <Button key={c} variant={country === c ? "default" : "outline"} onClick={() => handleCountryChange(c)}>
                    {c === "india" ? "🇮🇳 India" : c === "usa" ? "🇺🇸 USA" : "🇬🇧 UK"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tax Regime (India only) */}
            {country === "india" && (
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Tax Regime</label>
                <div className="flex gap-2">
                  <Button variant={regime === "new" ? "default" : "outline"} onClick={() => setRegime("new")}>New Regime</Button>
                  <Button variant={regime === "old" ? "default" : "outline"} onClick={() => setRegime("old")}>Old Regime</Button>
                </div>
                {regime === "new" && (
                  <p className="mt-2 text-xs text-[var(--text-muted)]">New regime offers lower slab rates with no major deductions (₹75,000 standard deduction).</p>
                )}
                {regime === "old" && (
                  <p className="mt-2 text-xs text-[var(--text-muted)]">Old regime allows exemptions like HRA, 80C, and other deductions (₹50,000 standard deduction).</p>
                )}
              </div>
            )}

            {/* Salary Manual Input */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">{cfg.label}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-[var(--primary)] text-lg">
                  {cfg.isoCode === "INR" ? "₹" : cfg.isoCode === "USD" ? "$" : "£"}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={manualSalary !== "" ? manualSalary : salary.toString()}
                  onChange={handleManualInput}
                  onFocus={() => setManualSalary(salary.toString())}
                  onBlur={() => setManualSalary("")}
                  placeholder={salary.toString()}
                  className="w-full bg-[var(--elevated)] border border-[var(--border-subtle)] rounded-lg pl-10 pr-4 py-3 font-mono text-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-colors"
                />
              </div>
            </div>

            {/* Slider */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-[var(--text-muted)] font-mono mb-2">
                <span>{formatCurrency(cfg.min)}</span>
                <span className="text-[var(--primary)] font-bold">{formatCurrency(salary)}</span>
                <span>{formatCurrency(cfg.max)}</span>
              </div>
              <input
                type="range"
                min={cfg.min} max={cfg.max} step={cfg.step} value={salary}
                onChange={(e) => { setSalary(Number(e.target.value)); setManualSalary(""); }}
                className="w-full accent-[var(--primary)] cursor-pointer"
              />
            </div>
          </Card>
        </div>

        {/* RIGHT — RESULTS */}
        <div className="lg:col-span-5">
          <Card className="p-6 h-full flex flex-col justify-between bg-[var(--elevated)]/40 border border-[var(--border-subtle)]">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Estimated Take-Home</span>
                <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold">LIVE</span>
              </div>

              <div className="mt-3 mb-1">
                <span className="text-4xl md:text-5xl font-mono font-extrabold text-[var(--text-primary)]">
                  {formatCurrency(result.netAnnual)}
                </span>
                <span className="text-sm text-[var(--text-muted)] font-mono ml-2">/ yr</span>
              </div>
              <div className="mb-6 pb-5 border-b border-[var(--border-subtle)]">
                <span className="text-2xl font-mono font-bold text-[var(--primary)]">{formatCurrency(result.netMonthly)}</span>
                <span className="text-xs text-[var(--text-muted)] font-mono ml-2">/ mo</span>
              </div>

              {/* Breakdown rows */}
              <div className="space-y-2 text-sm font-mono">
                {result.breakdown.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className={item.isDeduction ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)] font-bold"}>
                      {item.name}
                    </span>
                    <span className={item.isDeduction ? "text-[var(--warning)]" : "text-[var(--primary)] font-bold"}>
                      {item.isDeduction ? "−" : ""}{formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center text-sm">
                <span className="text-[var(--text-secondary)]">Effective Tax Rate</span>
                <span className="font-mono font-bold text-[var(--text-primary)]">{result.effectiveTaxRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-[var(--text-secondary)]">Total Deductions</span>
                <span className="font-mono font-bold text-[var(--warning)]">{formatCurrency(result.totalDeductions)}</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-[var(--text-muted)] flex justify-between">
              <span>Tax Year: <strong>{result.taxYear}</strong></span>
              <a href={result.metadata.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--primary)]">
                {result.metadata.sourceName} ↗
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* SALARY WATERFALL */}
      <Card className="p-6 border border-[var(--border-subtle)]">
        <h3 className="text-lg font-bold mb-1">Where Does Your Salary Go?</h3>
        <p className="text-sm text-[var(--text-muted)] mb-5">Proportional breakdown of your gross income</p>
        <div className="flex h-10 rounded-lg overflow-hidden gap-0.5 mb-4">
          {netPct > 0    && <div style={{ width: `${netPct}%`     }} className="bg-[var(--primary)] flex items-center justify-center text-xs font-bold text-white transition-all" title={`Take-home ${netPct}%`} />}
          {taxPct > 0    && <div style={{ width: `${taxPct}%`     }} className="bg-[var(--critical)] flex items-center justify-center text-xs font-bold text-white transition-all" title={`Income Tax ${taxPct}%`} />}
          {socialPct > 0 && <div style={{ width: `${socialPct}%`  }} className="bg-[var(--secondary)] flex items-center justify-center text-xs font-bold text-white transition-all" title={`Social ${socialPct}%`} />}
          {contribPct > 0 && <div style={{ width: `${contribPct}%` }} className="bg-[var(--warning)] flex items-center justify-center text-xs font-bold text-white transition-all" title={`Contributions ${contribPct}%`} />}
          {otherPct > 0  && <div style={{ width: `${Math.max(otherPct,0)}%` }} className="bg-[var(--text-muted)]/40 transition-all" title={`Other ${otherPct}%`} />}
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[var(--primary)] inline-block" /><span className="text-[var(--text-secondary)]">Take-home {netPct}%</span></span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[var(--critical)] inline-block" /><span className="text-[var(--text-secondary)]">Income Tax {taxPct}%</span></span>
          {socialPct > 0  && <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[var(--secondary)] inline-block" /><span className="text-[var(--text-secondary)]">Social Tax {socialPct}%</span></span>}
          {contribPct > 0 && <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[var(--warning)] inline-block" /><span className="text-[var(--text-secondary)]">Contributions {contribPct}%</span></span>}
        </div>
      </Card>

      <p className="text-center text-xs text-[var(--text-muted)] pb-4">
        Salary calculations are estimates for informational and planning purposes only. Actual taxes may vary.
      </p>
    </div>
  );
}
