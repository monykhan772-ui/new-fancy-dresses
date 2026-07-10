export function sanitizeInput(input: string): string {
  if (!input) return '';
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<iframe|<embed|<object/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  const textarea = document.createElement('textarea');
  textarea.innerHTML = sanitized;
  return textarea.value.trim();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
}

export function isValidPincode(pincode: string): boolean {
  return /^[0-9]{6}$/.test(pincode.replace(/\D/g, ''));
}

export function isValidName(name: string): boolean {
  return /^[a-zA-Z\s]{2,50}$/.test(name);
}

export function isValidAddress(address: string): boolean {
  return /^[a-zA-Z0-9\s,.-]{10,200}$/.test(address);
}

export function encodeBase64(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    return '';
  }
}

export function decodeBase64(str: string): string {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    return '';
  }
}
