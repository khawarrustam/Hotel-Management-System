/**
 * Add days to a date
 * @param {Date|string} date - The base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with days added
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Subtract days from a date
 * @param {Date|string} date - The base date
 * @param {number} days - Number of days to subtract
 * @returns {Date} New date with days subtracted
 */
export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Calculate the difference in days between two dates
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {number} Number of days between dates
 */
export const daysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Calculate the difference in nights between two dates (for hotel bookings)
 * @param {Date|string} checkIn - Check-in date
 * @param {Date|string} checkOut - Check-out date
 * @returns {number} Number of nights
 */
export const nightsBetween = (checkIn, checkOut) => {
  const nights = daysBetween(checkIn, checkOut);
  return Math.max(0, nights);
};

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  // Set time to beginning of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate < today;
};

/**
 * Check if a date is in the future
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  // Set time to beginning of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate > today;
};

/**
 * Format date for input[type="date"] (YYYY-MM-DD)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  return d.toISOString().split('T')[0];
};

/**
 * Format date for display (e.g., "January 15, 2024")
 * @param {Date|string} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDateForDisplay = (date, options = {}) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return d.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

/**
 * Format date range for display
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {string} Formatted date range string
 */
export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid Date Range';
  }
  
  // If same year and month, show abbreviated format
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    const month = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return `${month} ${start.getDate()}-${end.getDate()}`;
  }
  
  // If same year, show month and day
  if (start.getFullYear() === end.getFullYear()) {
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startStr} - ${endStr}`;
  }
  
  // Different years, show full dates
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startStr} - ${endStr}`;
};

/**
 * Get the start of week (Monday) for a given date
 * @param {Date|string} date - Date to get start of week for
 * @returns {Date} Start of week date
 */
export const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

/**
 * Get the end of week (Sunday) for a given date
 * @param {Date|string} date - Date to get end of week for
 * @returns {Date} End of week date
 */
export const getEndOfWeek = (date) => {
  const startOfWeek = getStartOfWeek(date);
  return addDays(startOfWeek, 6);
};

/**
 * Get the start of month for a given date
 * @param {Date|string} date - Date to get start of month for
 * @returns {Date} Start of month date
 */
export const getStartOfMonth = (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

/**
 * Get the end of month for a given date
 * @param {Date|string} date - Date to get end of month for
 * @returns {Date} End of month date
 */
export const getEndOfMonth = (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
};

/**
 * Check if checkout date is valid (after checkin date)
 * @param {Date|string} checkIn - Check-in date
 * @param {Date|string} checkOut - Check-out date
 * @returns {boolean} True if checkout is after checkin
 */
export const isValidDateRange = (checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  return checkOutDate > checkInDate;
};

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((targetDate - now) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  
  const absSeconds = Math.abs(diffInSeconds);
  
  for (const interval of intervals) {
    const count = Math.floor(absSeconds / interval.seconds);
    if (count >= 1) {
      const suffix = count === 1 ? '' : 's';
      const timeString = `${count} ${interval.label}${suffix}`;
      return diffInSeconds < 0 ? `${timeString} ago` : `in ${timeString}`;
    }
  }
  
  return 'just now';
};
