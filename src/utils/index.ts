import crypto from "crypto";
import bcrypt from "bcryptjs";

/**
 * Function to generate token to reset password
 * @param {Number} length
 */
export function generateToken(length = 20): string {
  const token = crypto.randomBytes(length);
  return token.toString("hex");
}

export function setHashSync(password: string, length = 10): string {
  const encrypted_password = bcrypt.hashSync(password, length);
  return encrypted_password;
}

export function compareSync(password1: string, password2: string) {
  return bcrypt.compareSync(password1, password2);
}

// export function applyDiscount(amount: number, discount: number): number {
//   return amount * (1 - discount);
// }

// export function updatePriceInstallments(amount, rate) {
//   return Math.floor(parseFloat(amount * (1 + rate)).toFixed(2) * 100);
// }

export const yearFromNow = (): Date => new Date(new Date().setFullYear(new Date().getFullYear() + 1));
