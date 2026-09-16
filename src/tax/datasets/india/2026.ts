import { TaxRuleSet } from "../../engine/types";

export const india2026: TaxRuleSet = {
  country: "india",
  taxYear: "2026-27",
  currency: "INR",
  regimes: {
    new: {
      standardDeduction: 75000,
      incomeTaxBrackets: [
        { min: 0, max: 400000, rate: 0 },
        { min: 400000, max: 800000, rate: 0.05 },
        { min: 800000, max: 1200000, rate: 0.1 },
        { min: 1200000, max: 1600000, rate: 0.15 },
        { min: 1600000, max: 2000000, rate: 0.2 },
        { min: 2000000, max: 2400000, rate: 0.25 },
        { min: 2400000, max: null, rate: 0.3 }
      ],
      rebates: [{ threshold: 1200000, amount: 60000 }],
      cess: 0.04
    },
    old: {
      standardDeduction: 50000,
      incomeTaxBrackets: [
        { min: 0, max: 250000, rate: 0 },
        { min: 250000, max: 500000, rate: 0.05 },
        { min: 500000, max: 1000000, rate: 0.2 },
        { min: 1000000, max: null, rate: 0.3 }
      ],
      rebates: [{ threshold: 500000, amount: 12500 }],
      cess: 0.04
    }
  },
  metadata: {
    sourceName: "Income Tax Department",
    sourceUrl: "https://incometaxindia.gov.in",
    effectiveFrom: "2026-04-01",
    lastReviewed: "2026-09-16",
    rulesVersion: "2026.1"
  }
};
