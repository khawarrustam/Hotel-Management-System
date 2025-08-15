/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation with customizable criteria
 * @param {string} password - Password to validate
 * @param {object} criteria - Validation criteria
 * @returns {object} Validation result with isValid and errors
 */
export const validatePassword = (password, criteria = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = criteria;

  const errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Phone number validation (US format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const isValidPhone = (phone) => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's 10 digits (US format) or 11 digits (with country code)
  return cleanPhone.length === 10 || (cleanPhone.length === 11 && cleanPhone[0] === '1');
};

/**
 * Format phone number to US format
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  
  if (cleanPhone.length === 11 && cleanPhone[0] === '1') {
    return `+1 (${cleanPhone.slice(1, 4)}) ${cleanPhone.slice(4, 7)}-${cleanPhone.slice(7)}`;
  }
  
  return phone; // Return original if can't format
};

/**
 * Name validation (alphabetic characters and common punctuation)
 * @param {string} name - Name to validate
 * @returns {boolean} True if name is valid
 */
export const isValidName = (name) => {
  // Allow letters, spaces, hyphens, apostrophes, and periods
  const nameRegex = /^[a-zA-Z\s\-'.]+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
};

/**
 * Credit card number validation using Luhn algorithm
 * @param {string} cardNumber - Credit card number to validate
 * @returns {boolean} True if card number is valid
 */
export const isValidCreditCard = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  // Check if it contains only digits and has reasonable length
  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Get credit card type from number
 * @param {string} cardNumber - Credit card number
 * @returns {string} Card type (visa, mastercard, amex, discover, etc.)
 */
export const getCreditCardType = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  // Visa
  if (/^4/.test(cleanNumber)) {
    return 'visa';
  }
  
  // Mastercard
  if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
    return 'mastercard';
  }
  
  // American Express
  if (/^3[47]/.test(cleanNumber)) {
    return 'amex';
  }
  
  // Discover
  if (/^6(?:011|5)/.test(cleanNumber)) {
    return 'discover';
  }
  
  return 'unknown';
};

/**
 * CVV validation based on card type
 * @param {string} cvv - CVV to validate
 * @param {string} cardType - Type of credit card
 * @returns {boolean} True if CVV is valid
 */
export const isValidCVV = (cvv, cardType = 'unknown') => {
  const cleanCVV = cvv.replace(/\D/g, '');
  
  if (cardType === 'amex') {
    return cleanCVV.length === 4;
  }
  
  return cleanCVV.length === 3;
};

/**
 * Zip code validation (US format)
 * @param {string} zipCode - Zip code to validate
 * @returns {boolean} True if zip code is valid
 */
export const isValidZipCode = (zipCode) => {
  // US zip code: 5 digits or 5+4 format
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

/**
 * Date validation for date strings
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if date is valid
 */
export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Check if date is within a specific range
 * @param {string|Date} date - Date to check
 * @param {string|Date} minDate - Minimum allowed date
 * @param {string|Date} maxDate - Maximum allowed date
 * @returns {boolean} True if date is within range
 */
export const isDateInRange = (date, minDate, maxDate) => {
  const checkDate = new Date(date);
  const min = new Date(minDate);
  const max = new Date(maxDate);
  
  return checkDate >= min && checkDate <= max;
};

/**
 * URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Required field validation
 * @param {any} value - Value to validate
 * @returns {boolean} True if value is not empty
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  return value !== null && value !== undefined;
};

/**
 * Minimum length validation
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum required length
 * @returns {boolean} True if value meets minimum length
 */
export const hasMinLength = (value, minLength) => {
  return typeof value === 'string' && value.length >= minLength;
};

/**
 * Maximum length validation
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} True if value doesn't exceed maximum length
 */
export const hasMaxLength = (value, maxLength) => {
  return typeof value === 'string' && value.length <= maxLength;
};

/**
 * Numeric validation
 * @param {any} value - Value to validate
 * @returns {boolean} True if value is a valid number
 */
export const isNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

/**
 * Range validation for numbers
 * @param {number} value - Value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean} True if value is within range
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};
