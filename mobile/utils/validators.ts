// mobile/utils/validators.ts
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): string | null {
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value || value.trim() === "") return `${fieldName} is required`;
  return null;
}
