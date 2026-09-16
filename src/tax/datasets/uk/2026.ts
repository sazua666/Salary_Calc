import { TaxRuleSet } from "../../engine/types";

export const uk2026: TaxRuleSet = {
  country: "uk",
  taxYear: "2026-27",
  currency: "GBP",
  standardDeduction: 12570,
  incomeTaxBrackets: [
    { min: 0, max: 37700, rate: 0.2 },
    { min: 37700, max: 125140, rate: 0.4 },
    { min: 125140, max: null, rate: 0.45 }
  ],
  metadata: {
    sourceName: "HMRC",
    sourceUrl: "https://gov.uk",
    effectiveFrom: "2026-04-06",
    lastReviewed: "2026-09-16",
    rulesVersion: "2026.1"
  }
};
