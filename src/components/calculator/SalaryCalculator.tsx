"use client";

import { useState } from "react";
import { calculateSalary } from "@/tax/engine/calculateSalary";
import { CalculationInput, CalculationResult } from "@/tax/engine/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CURRENCY_MAP: Record<string, string> = {
  india: "₹",
  usa: "$",
  uk: "£",
};

export function SalaryCalculator() {
  const [country, setCountry] = useState("india");
  const [salary, setSalary] = useState(2400000);
  const [regime, setRegime] = useState("new"); // for India

  const input: CalculationInput = {
    country,
    taxYear: "2026",
    salary,
    regime,
  };

  const result: CalculationResult = calculateSalary(input);
  const currency = CURRENCY_MAP[country] || "";

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: country === 'india' ? 'INR' : country === 'usa' ? 'USD' : 'GBP',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl mx-auto">
      {/* LEFT: Inputs */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <Card className="bg-[var(--card)] p-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Calculate Your Take-Home</h3>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Country</label>
              <div className="flex gap-2">
                <Button 
                  variant={country === "india" ? "default" : "outline"}
                  onClick={() => { setCountry("india"); setSalary(2400000); }}
                >
                  India
                </Button>
                <Button 
                  variant={country === "usa" ? "default" : "outline"}
                  onClick={() => { setCountry("usa"); setSalary(120000); }}
                >
                  USA
                </Button>
                <Button 
                  variant={country === "uk" ? "default" : "outline"}
                  onClick={() => { setCountry("uk"); setSalary(80000); }}
                >
                  UK
                </Button>
              </div>
            </div>

            {country === "india" && (
              <div>
                <label className="block text-sm font-semibold mb-2">Tax Regime</label>
                <div className="flex gap-2">
                  <Button 
                    variant={regime === "new" ? "default" : "outline"}
                    onClick={() => setRegime("new")}
                  >
                    New Regime
                  </Button>
                  <Button 
                    variant={regime === "old" ? "default" : "outline"}
                    onClick={() => setRegime("old")}
                  >
                    Old Regime
                  </Button>
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold">Annual Gross / CTC</label>
                <span className="font-mono text-[var(--primary)] font-bold text-lg">{formatCurrency(salary)}</span>
              </div>
              <input
                type="range"
                min={country === "india" ? 300000 : 20000}
                max={country === "india" ? 10000000 : 500000}
                step={country === "india" ? 100000 : 5000}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full accent-[var(--primary)] h-2 bg-[var(--elevated)] rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* RIGHT: Results */}
      <div className="lg:col-span-5">
        <Card className="bg-[var(--elevated)]/50 p-6 shadow-xl border-[var(--border-subtle)] h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold tracking-wider text-[var(--text-secondary)] uppercase">Estimated Take-Home</span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold animate-pulse">LIVE</span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-mono font-bold text-[var(--text-primary)]">
                {formatCurrency(result.netAnnual)}
              </span>
              <span className="text-sm text-[var(--text-muted)] font-mono">/ YR</span>
            </div>

            <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-[var(--border-subtle)]">
              <span className="text-3xl font-mono font-bold text-[var(--primary)]">
                {formatCurrency(result.netMonthly)}
              </span>
              <span className="text-sm text-[var(--text-muted)] font-mono">/ MO</span>
            </div>

            <div className="space-y-3">
              {result.breakdown.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm font-mono">
                  <span className={item.isDeduction ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)] font-bold"}>
                    {item.name}
                  </span>
                  <span className={item.isDeduction ? "text-[var(--warning)]" : "text-[var(--primary)] font-bold"}>
                    {item.isDeduction ? "-" : ""}{formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center text-sm">
              <span className="text-[var(--text-secondary)]">Effective Tax Rate:</span>
              <span className="font-mono font-bold text-[var(--text-primary)]">{result.effectiveTaxRate.toFixed(1)}%</span>
            </div>
          </div>

          <div className="mt-8 text-xs text-[var(--text-muted)] flex justify-between">
            <span>Tax Year: {result.taxYear || '2026'}</span>
            <span>Source: <a href={result.metadata.sourceUrl} className="underline hover:text-[var(--primary)]">{result.metadata.sourceName}</a></span>
          </div>
        </Card>
      </div>
    </div>
  );
}
