import * as Crypto from 'expo-crypto';

/**
 * Hashes a password using SHA256.
 * @param password - The plain text password
 * @returns The hashed password string
 */
export const hashPassword = async (password: string) => {
  const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
  return hash;
};

/**
 * Generates a random UUID (v4) using expo-crypto.
 * This is compatible with Expo/React Native environments.
 * @returns A random UUID string
 */
export const getRandomUUID = (): string => {
  const bytes = Crypto.getRandomBytes(16);
  // Convert bytes to hex and format as UUID v4
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    '4' + hex.substring(13, 16), // version 4
    ((parseInt(hex.substring(16, 18), 16) & 0x3f) | 0x80).toString(16) + hex.substring(18, 20),
    hex.substring(20, 32),
  ].join('-');
};
