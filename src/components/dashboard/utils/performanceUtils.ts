
import { formatCurrency } from '@/lib/utils';

/**
 * Calculate percentage change between current and previous values
 */
export const getPercentChange = (current: number, previous: number): string => {
  if (previous === 0) return "+100%"; // Avoid division by zero
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? '+' : ''}${change.toFixed(0)}%`;
};

// Re-export formatCurrency for backward compatibility
export { formatCurrency };
