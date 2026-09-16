import { TaxRuleSet } from "../../engine/types";

export const usa2026: { federal: TaxRuleSet } = {
  federal: {
    country: "usa",
    taxYear: "2026",
    currency: "USD",
    standardDeduction: 15000,
    incomeTaxBrackets: [
      { min: 0, max: 11600, rate: 0.1 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: null, rate: 0.37 }
    ],
    metadata: {
      sourceName: "IRS",
      sourceUrl: "https://irs.gov",
      effectiveFrom: "2026-01-01",
      lastReviewed: "2026-09-16",
      rulesVersion: "2026.1"
    }
  }
};
