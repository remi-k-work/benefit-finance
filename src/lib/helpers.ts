/* eslint-disable @typescript-eslint/no-explicit-any */

// Get a robohash avatar url for a user
export function getUserAvatarUrl(sessionId?: string) {
  return `https://robohash.org/${sessionId ?? getRandomSeed()}.png?set=set${sessionId ? (hashStringToNumber(sessionId) % 5) + 1 : getRandomInt(1, 5)}`;
}

// Get the initials from a name
export function getInitialsFromName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Add a delay for a certain time in milliseconds
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Deep equality helper function to compare objects
export function isDeepEqual(a: any, b: any) {
  // Fast path: referential and primitive equality
  if (a === b) return true;

  // Handle null and non-objects
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;

  // Plain objects (including class instances)
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Quick length check
  if (keysA.length !== keysB.length) return false;

  // Avoid repeated `keysB.includes()` calls → create a Set for O(1) lookups
  const keysBSet = new Set(keysB);

  for (const key of keysA) {
    if (!keysBSet.has(key)) return false;
    if (!isDeepEqual(a[key], b[key])) return false;
  }

  return true;
}

// Generate a random integer between min and max (inclusive)
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random 3-character alphanumeric seed (A–Z, 0–9)
function getRandomSeed(length = 3) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) result += chars.charAt(getRandomInt(0, chars.length - 1));

  return result;
}

// Simple deterministic hash -> number
function hashStringToNumber(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit int
  }

  return Math.abs(hash);
}
