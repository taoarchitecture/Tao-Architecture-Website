/**
 * Returns the configured JWT secret, or null if it isn't set. There is
 * intentionally no hardcoded fallback — signing or verifying tokens with a
 * known default string would let anyone forge an admin session.
 */
export function getJwtSecret(): string | null {
  return process.env.JWT_SECRET || null;
}
