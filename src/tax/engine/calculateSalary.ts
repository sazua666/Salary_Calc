import { CalculationInput, CalculationResult, TaxRuleSet, TaxBracket } from "./types";
import { india2026 } from "../datasets/india/2026";
import { usa2026 } from "../datasets/usa/2026";
import { uk2026 } from "../datasets/uk/2026";

function calculateProgressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = bracket.max ? Math.min(taxableIncome, bracket.max) - bracket.min : taxableIncome - bracket.min;
      tax += taxableInBracket * bracket.rate;
    }
  }
  return tax;
}

export function calculateSalary(input: CalculationInput): CalculationResult {
  if (input.country === "india") {
    return calculateIndia(input);
  } else if (input.country === "usa") {
    return calculateUSA(input);
  } else if (input.country === "uk") {
    return calculateUK(input);
  }
  
  throw new Error(`Country ${input.country} is not supported yet.`);
}

function calculateIndia(input: CalculationInput): CalculationResult {
  const rules = india2026;
  const regimeName = input.regime || "new";
  const regime = rules.regimes![regimeName];
  
  // Calculate Gross
  let grossAnnual = input.salary;
  let employerContributions = 0;
  let employeeContributions = 0;

  if (input.components) {
    // If CTC is provided via components
    grossAnnual = input.components.basic || input.salary;
    grossAnnual += (input.components.hra || 0) + (input.components.specialAllowance || 0) + (input.components.bonus || 0);
    employerContributions = input.components.employerPF || 0;
    employeeContributions = input.components.employeePF || 0;
  }

  let taxableIncome = Math.max(0, grossAnnual - regime.standardDeduction);
  
  let incomeTax = calculateProgressiveTax(taxableIncome, regime.incomeTaxBrackets);

  // Rebate (e.g. 87A)
  if (regime.rebates) {
    for (const rebate of regime.rebates) {
      if (taxableIncome <= rebate.threshold) {
        incomeTax = Math.max(0, incomeTax - rebate.amount);
      }
    }
  }

  // Cess
  if (regime.cess) {
    incomeTax += incomeTax * regime.cess;
  }

  const otherDeductions = (input.components?.otherDeductions || 0) + (input.additionalDeductions || 0);
  const totalDeductions = incomeTax + employeeContributions + otherDeductions;
  const netAnnual = grossAnnual - totalDeductions;
  
  return {
    grossAnnual,
    taxableIncome,
    incomeTax,
    socialTaxes: 0,
    employeeContributions,
    employerContributions,
    otherDeductions,
    totalDeductions,
    netAnnual,
    netMonthly: netAnnual / 12,
    effectiveTaxRate: (incomeTax / grossAnnual) * 100,
    breakdown: [
      { id: "gross", name: "Gross Income", amount: grossAnnual, isDeduction: false },
      { id: "tax", name: "Income Tax", amount: incomeTax, isDeduction: true },
      { id: "pf", name: "Employee PF", amount: employeeContributions, isDeduction: true },
      ...(otherDeductions > 0 ? [{ id: "other", name: "Other Payroll Deductions", amount: otherDeductions, isDeduction: true }] : []),
    ],
    metadata: rules.metadata,
    taxYear: rules.taxYear
  };
}

function calculateUSA(input: CalculationInput): CalculationResult {
  const rules = usa2026.federal; // Assuming single state for now
  let taxableIncome = Math.max(0, input.salary - (rules.standardDeduction || 0));
  let incomeTax = calculateProgressiveTax(taxableIncome, rules.incomeTaxBrackets || []);
  
  // FICA (simplified 7.65%)
  const fica = input.salary * 0.0765;

  const otherDeductions = input.additionalDeductions || 0;
  const totalDeductions = incomeTax + fica + otherDeductions;
  const netAnnual = input.salary - totalDeductions;

  return {
    grossAnnual: input.salary,
    taxableIncome,
    incomeTax,
    socialTaxes: fica,
    employeeContributions: 0,
    employerContributions: 0,
    otherDeductions,
    totalDeductions,
    netAnnual,
    netMonthly: netAnnual / 12,
    effectiveTaxRate: (incomeTax / input.salary) * 100,
    breakdown: [
      { id: "gross", name: "Gross Salary", amount: input.salary, isDeduction: false },
      { id: "fed-tax", name: "Federal Income Tax", amount: incomeTax, isDeduction: true },
      { id: "fica", name: "FICA (Social Security & Medicare)", amount: fica, isDeduction: true },
      ...(otherDeductions > 0 ? [{ id: "other", name: "Other Payroll Deductions", amount: otherDeductions, isDeduction: true }] : [])
    ],
    metadata: rules.metadata,
    taxYear: rules.taxYear
  };
}

function calculateUK(input: CalculationInput): CalculationResult {
  const rules = uk2026;
  let taxableIncome = Math.max(0, input.salary - (rules.standardDeduction || 0));
  let incomeTax = calculateProgressiveTax(taxableIncome, rules.incomeTaxBrackets || []);
  
  // National insurance simplified
  let ni = 0;
  if (input.salary > 12570) {
    ni = (Math.min(input.salary, 50270) - 12570) * 0.08 + Math.max(0, input.salary - 50270) * 0.02;
  }

  const otherDeductions = input.additionalDeductions || 0;
  const totalDeductions = incomeTax + ni + otherDeductions;
  const netAnnual = input.salary - totalDeductions;

  return {
    grossAnnual: input.salary,
    taxableIncome,
    incomeTax,
    socialTaxes: ni,
    employeeContributions: 0,
    employerContributions: 0,
    otherDeductions,
    totalDeductions,
    netAnnual,
    netMonthly: netAnnual / 12,
    effectiveTaxRate: (incomeTax / input.salary) * 100,
    breakdown: [
      { id: "gross", name: "Gross Salary", amount: input.salary, isDeduction: false },
      { id: "tax", name: "Income Tax", amount: incomeTax, isDeduction: true },
      { id: "ni", name: "National Insurance", amount: ni, isDeduction: true },
      ...(otherDeductions > 0 ? [{ id: "other", name: "Other Payroll Deductions", amount: otherDeductions, isDeduction: true }] : [])
    ],
    metadata: rules.metadata,
    taxYear: rules.taxYear
  };
}
