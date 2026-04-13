// Web Crypto API utilities — browser equivalent of Node.js crypto module
// Based on: https://github.com/platzi/curso-criptografia

export function bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

// --- HASH ---
// Equivalent to: crypto.createHash(algorithm).update(data).digest(encoding)
export async function hashData(
  algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512',
  text: string
): Promise<string> {
  const encoded = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest(algorithm, encoded);
  return bufferToHex(buffer);
}

// --- HMAC ---
// Equivalent to: crypto.createHmac(algorithm, key).update(data).digest(encoding)
export async function hmacData(
  algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512',
  key: string,
  text: string
): Promise<string> {
  const keyBuffer = new TextEncoder().encode(key);
  const dataBuffer = new TextEncoder().encode(text);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: { name: algorithm } },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
  return bufferToHex(signature);
}

// --- AES-GCM (Symmetric Encryption) ---
// Equivalent to: cipher/decipher using scryptSync + AES-CBC
// Uses PBKDF2 (Web Crypto equiv. of scrypt) + AES-GCM (authenticated)
async function deriveAesKey(
  password: string,
  salt: string,
  bits: 128 | 192 | 256
): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const saltBuffer = new TextEncoder().encode(salt);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBuffer, iterations: 100_000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: bits },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function aesEncrypt(
  password: string,
  salt: string,
  plaintext: string,
  bits: 128 | 192 | 256
): Promise<{ iv: string; ciphertext: string }> {
  const key = await deriveAesKey(password, salt, bits);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  return {
    iv: bufferToHex(iv),
    ciphertext: bufferToHex(encrypted),
  };
}

export async function aesDecrypt(
  password: string,
  salt: string,
  ivHex: string,
  ciphertextHex: string,
  bits: 128 | 192 | 256
): Promise<string> {
  const key = await deriveAesKey(password, salt, bits);
  const iv = hexToBuffer(ivHex);
  const ciphertext = hexToBuffer(ciphertextHex);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
    key,
    ciphertext.buffer as ArrayBuffer
  );

  return new TextDecoder().decode(decrypted);
}

// --- PRNG ---
// Equivalent to: crypto.randomBytes / crypto.randomInt / crypto.randomUUID
export function randomBytes(size: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return bufferToHex(bytes);
}

export function randomInt(min: number, max: number): number {
  const range = max - min;
  const bytes = crypto.getRandomValues(new Uint32Array(1));
  return min + (bytes[0] % range);
}

export function randomUUID(): string {
  return crypto.randomUUID();
}

// --- RSA Digital Signatures ---
// Equivalent to: keypair + sign + verify using RSA-SHA256
export async function generateRsaKeyPair(
  modulusLength: 2048 | 3072 | 4096
): Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }> {
  return crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: 'SHA-256' },
    },
    true,
    ['sign', 'verify']
  ) as Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }>;
}

export async function exportPublicKeyPem(key: CryptoKey): Promise<string> {
  const spki = await crypto.subtle.exportKey('spki', key);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(spki)));
  const lines = base64.match(/.{1,64}/g)?.join('\n') ?? base64;
  return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----`;
}

export async function rsaSign(privateKey: CryptoKey, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, data);
  return bufferToHex(signature);
}

export async function rsaVerify(
  publicKey: CryptoKey,
  text: string,
  signatureHex: string
): Promise<boolean> {
  const data = new TextEncoder().encode(text);
  const signature = hexToBuffer(signatureHex);
  return crypto.subtle.verify('RSASSA-PKCS1-v1_5', publicKey, signature.buffer as ArrayBuffer, data);
}
