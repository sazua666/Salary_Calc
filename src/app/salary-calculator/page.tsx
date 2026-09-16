import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomSalaryCalculator } from "@/components/calculator/CustomSalaryCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator — Calculate Your Take-Home Pay | SalaryCalc",
  description: "Enter your salary or CTC and instantly see your take-home pay, taxes, and deductions for India, USA, and UK.",
};

export default function SalaryCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4">
        {/* Page header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--secondary)] uppercase mb-3 block">
            Global Salary Calculator
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            What Do You Actually{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
              Take Home?
            </span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Tailor income, variable pay, and payroll deductions to see a take-home estimate built around your situation.
          </p>
        </div>

        <CustomSalaryCalculator />
      </main>
      <Footer />
    </div>
  );
}
