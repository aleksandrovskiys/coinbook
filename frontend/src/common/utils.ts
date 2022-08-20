import { defaultLocale } from "src/common/constants";

export function getCurrencySymbol(currency: string | undefined): string {
  if (!currency) return "";

  return (0)
    .toLocaleString(defaultLocale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}
