
/**
 * Formats a currency value according to French locale
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Calculate percentage change between current and previous values
 */
export const getPercentChange = (current: number, previous: number): string => {
  if (previous === 0) return "+100%"; // Avoid division by zero
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? '+' : ''}${change.toFixed(0)}%`;
};
