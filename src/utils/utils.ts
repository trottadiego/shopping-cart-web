export const formatCurrency = (
  amount: number,
  locale: string = "es-AR",
  currency: string = "ARS"
): string => {
  return amount.toLocaleString(locale, { style: "currency", currency });
};
