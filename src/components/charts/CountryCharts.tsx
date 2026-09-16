"use client";

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";

// ─── Historical Data ──────────────────────────────────────────────────────────

export const incomeGrowthData = [
  { year: "2018", india: 8260, usa: 55700, uk: 36600 },
  { year: "2019", india: 8840, usa: 57700, uk: 38000 },
  { year: "2020", india: 6600, usa: 53600, uk: 36200 },
  { year: "2021", india: 7940, usa: 59200, uk: 37800 },
  { year: "2022", india: 9090, usa: 61900, uk: 40700 },
  { year: "2023", india: 9950, usa: 63800, uk: 43300 },
  { year: "2024", india: 10750, usa: 66000, uk: 45600 },
  { year: "2025", india: 11640, usa: 68800, uk: 47900 },
];

export const taxBurdenData = [
  { year: "2018", india: 21, usa: 28, uk: 33 },
  { year: "2019", india: 21, usa: 27, uk: 33 },
  { year: "2020", india: 20, usa: 24, uk: 31 },
  { year: "2021", india: 19, usa: 25, uk: 32 },
  { year: "2022", india: 18, usa: 26, uk: 34 },
  { year: "2023", india: 18, usa: 27, uk: 35 },
  { year: "2024", india: 17, usa: 27, uk: 35 },
  { year: "2025", india: 16, usa: 27, uk: 36 },
];

export const salaryVsTakeHomeData = [
  { bracket: "₹6L", india_gross: 600000, india_take: 540000 },
  { bracket: "₹12L", india_gross: 1200000, india_take: 1013880 },
  { bracket: "₹18L", india_gross: 1800000, india_take: 1476000 },
  { bracket: "₹24L", india_gross: 2400000, india_take: 1920000 },
  { bracket: "₹36L", india_gross: 3600000, india_take: 2754000 },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label, unit = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--elevated)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 shadow-xl text-sm font-mono">
        <p className="text-[var(--text-muted)] mb-2 font-bold">{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex justify-between gap-6 items-center">
            <span style={{ color: p.color }} className="font-semibold">{p.name}</span>
            <span className="text-[var(--text-primary)]">{typeof p.value === "number" ? `${unit}${p.value.toLocaleString()}` : p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Chart Components ─────────────────────────────────────────────────────────

export function IncomeGrowthChart() {
  return (
    <div>
      <h3 className="text-base font-bold mb-1 text-[var(--text-primary)]">Median Annual Income (USD PPP)</h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">Historical median income comparison across India, USA, and UK — adjusted for purchasing power parity.</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={incomeGrowthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis dataKey="year" tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }} />
          <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip unit="$" />} />
          <Legend wrapperStyle={{ fontSize: "12px", fontFamily: "JetBrains Mono, monospace" }} />
          <Line type="monotone" dataKey="india" name="India" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="usa"   name="USA"   stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="uk"    name="UK"    stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TaxBurdenChart() {
  return (
    <div>
      <h3 className="text-base font-bold mb-1 text-[var(--text-primary)]">Effective Tax Burden (%) — Average Earner</h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">Percentage of gross income paid in income tax + social contributions for a median earner. Sources: OECD Taxing Wages.</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={taxBurdenData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis dataKey="year" tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }} />
          <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }} tickFormatter={(v) => `${v}%`} domain={[0, 45]} />
          <Tooltip content={<CustomTooltip unit="" />} />
          <Legend wrapperStyle={{ fontSize: "12px", fontFamily: "JetBrains Mono, monospace" }} />
          <Bar dataKey="india" name="India" fill="#10B981" radius={[4,4,0,0]} />
          <Bar dataKey="usa"   name="USA"   fill="#06B6D4" radius={[4,4,0,0]} />
          <Bar dataKey="uk"    name="UK"    fill="#3B82F6" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
