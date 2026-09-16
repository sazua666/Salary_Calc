export type TaxBracket = {
  min: number;
  max: number | null;
  rate: number;
};

export type DeductionRule = {
  id: string;
  name: string;
  type: "fixed" | "percentage";
  value: number;
  max?: number;
};

export type TaxRuleSet = {
  country: string;
  jurisdiction?: string;
  taxYear: string;
  currency: string;
  
  // E.g. India has Old and New regime
  regimes?: Record<string, {
    incomeTaxBrackets: TaxBracket[];
    standardDeduction: number;
    rebates?: { threshold: number; amount: number }[];
    cess?: number;
    surcharges?: { threshold: number; rate: number }[];
  }>;

  // Single regime systems
  incomeTaxBrackets?: TaxBracket[];
  standardDeduction?: number;
  
  socialContributions?: DeductionRule[];
  employerContributions?: DeductionRule[];
  
  metadata: {
    sourceName: string;
    sourceUrl: string;
    effectiveFrom: string;
    lastReviewed: string;
    rulesVersion: string;
  };
};

export type CalculationInput = {
  country: string;
  jurisdiction?: string;
  taxYear: string;
  salary: number; // Gross or CTC
  regime?: string;
  filingStatus?: string;
  /** Optional annual payroll deductions supplied by the user. */
  additionalDeductions?: number;
  
  // Custom components (India CTC)
  components?: {
    basic?: number;
    hra?: number;
    specialAllowance?: number;
    bonus?: number;
    employerPF?: number;
    employeePF?: number;
    otherDeductions?: number;
  };
};

export type CalculationResult = {
  grossAnnual: number;
  taxableIncome: number;
  incomeTax: number;
  socialTaxes: number;
  employeeContributions: number;
  employerContributions: number;
  otherDeductions: number;
  totalDeductions: number;
  netAnnual: number;
  netMonthly: number;
  effectiveTaxRate: number;
  breakdown: { id: string; name: string; amount: number; isDeduction: boolean }[];
  metadata: TaxRuleSet["metadata"];
  taxYear: string;
};
