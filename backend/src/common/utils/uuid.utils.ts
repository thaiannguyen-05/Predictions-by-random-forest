/**
 * Utility functions for UUID validation
 * @module UuidUtils
 */

/**
 * Regular expression pattern for validating UUID v1-5 format
 */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Kiểm tra xem một string có phải là UUID hợp lệ không
 * @param value - Giá trị cần kiểm tra
 * @returns true nếu value là UUID hợp lệ, false nếu không
 * @example
 * isUUID('550e8400-e29b-41d4-a716-446655440000') // true
 * isUUID('not-a-uuid') // false
 */
export function isUUID(value: string): boolean {
  return UUID_REGEX.test(value);
}
