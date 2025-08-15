/**
 * Format currency with locale-specific formatting
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale code (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format currency with abbreviated notation for large numbers
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Abbreviated currency string
 */
export const formatCurrencyCompact = (amount, currency = 'USD') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
};

/**
 * Format currency without decimals for whole numbers
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrencyWhole = (amount, currency = 'USD') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0';
  }

  const isWholeNumber = amount % 1 === 0;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Parse currency string back to number
 * @param {string} currencyString - Currency string to parse
 * @returns {number} Parsed number or 0 if invalid
 */
export const parseCurrency = (currencyString) => {
  if (typeof currencyString !== 'string') {
    return 0;
  }

  // Remove currency symbols and spaces, keep only numbers and decimal point
  const cleanString = currencyString.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleanString);
  
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculate percentage and format as currency
 * @param {number} amount - Base amount
 * @param {number} percentage - Percentage to calculate (e.g., 15 for 15%)
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const calculatePercentageAsCurrency = (amount, percentage, currency = 'USD') => {
  const percentageAmount = (amount * percentage) / 100;
  return formatCurrency(percentageAmount, currency);
};

/**
 * Add or subtract amounts and format as currency
 * @param {number} baseAmount - Base amount
 * @param {number} changeAmount - Amount to add (positive) or subtract (negative)
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const calculateTotal = (baseAmount, changeAmount, currency = 'USD') => {
  const total = baseAmount + changeAmount;
  return formatCurrency(total, currency);
};

/**
 * Format a range of currency values
 * @param {number} min - Minimum amount
 * @param {number} max - Maximum amount
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency range string
 */
export const formatCurrencyRange = (min, max, currency = 'USD') => {
  if (min === max) {
    return formatCurrency(min, currency);
  }
  
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
};
