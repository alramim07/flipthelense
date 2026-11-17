// Disposable email domains blocklist
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
  'sharklasers.com', 'yopmail.com', 'trashmail.com', 'getairmail.com',
  'dispostable.com', 'throwawaymail.com', 'temp-mail.org', 'fakeinbox.com'
]);

// Strict RFC 5322 Compliant Email Regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates whether an email is structurally valid and not from a known temporary spam provider
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email address is required.' };
  }

  const cleanEmail = email.trim().toLowerCase();

  if (cleanEmail.length > 254) {
    return { valid: false, error: 'Email address exceeds maximum allowed length.' };
  }

  if (!EMAIL_REGEX.test(cleanEmail)) {
    return { valid: false, error: 'Please enter a valid email address (e.g. name@company.com).' };
  }

  const domain = cleanEmail.split('@')[1];
  if (!domain || !domain.includes('.')) {
    return { valid: false, error: 'Email domain is invalid.' };
  }

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { valid: false, error: 'Disposable or temporary email addresses are not permitted.' };
  }

  return { valid: true, cleanEmail };
}

/**
 * Sanitize strings to strip out potential HTML/Script tags before persistence
 */
export function sanitizeText(input, maxLength = 2000) {
  if (!input || typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Strip direct angle brackets to neutralize HTML/XSS injection
}
