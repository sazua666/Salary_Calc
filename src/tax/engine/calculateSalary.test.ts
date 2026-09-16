import { calculateSalary } from "./calculateSalary";
import { CalculationInput } from "./types";

describe("Tax Engine", () => {
  it("should calculate India new regime correctly", () => {
    const input: CalculationInput = {
      country: "india",
      taxYear: "2026-27",
      salary: 1500000,
      regime: "new"
    };
    
    const result = calculateSalary(input);
    expect(result.grossAnnual).toBe(1500000);
    expect(result.taxableIncome).toBe(1425000); // 15L - 75k SD
    // Tax calculation:
    // 0-4L = 0
    // 4L-8L (4L) @ 5% = 20000
    // 8L-12L (4L) @ 10% = 40000
    // 12L-14.25L (2.25L) @ 15% = 33750
    // Base Tax = 93750
    // Cess (4%) = 3750
    // Total Tax = 97500
    expect(result.incomeTax).toBe(97500);
  });

  it("should calculate USA federal tax correctly", () => {
    const input: CalculationInput = {
      country: "usa",
      taxYear: "2026",
      salary: 100000,
    };
    
    const result = calculateSalary(input);
    expect(result.grossAnnual).toBe(100000);
    expect(result.taxableIncome).toBe(85000); // 100k - 15k SD
    // Tax calculation:
    // 0-11600 (11600) @ 10% = 1160
    // 11600-47150 (35550) @ 12% = 4266
    // 47150-85000 (37850) @ 22% = 8327
    // Total Tax = 13753
    expect(result.incomeTax).toBe(13753);
    // FICA = 100000 * 7.65% = 7650
    expect(result.socialTaxes).toBe(7650);
  });
});
