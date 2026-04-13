export function isPrime(n: bigint): boolean {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}

export function powerMod(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2n; // integer division for bigint
    base = (base * base) % modulus;
  }
  return result;
}

export function getPrimeFactors(n: bigint): bigint[] {
  const factors: bigint[] = [];
  while (n % 2n === 0n) {
    factors.push(2n);
    n = n / 2n;
  }
  for (let i = 3n; i * i <= n; i += 2n) {
    while (n % i === 0n) {
      factors.push(i);
      n = n / i;
    }
  }
  if (n > 2n) {
    factors.push(n);
  }
  // Remove duplicates
  return Array.from(new Set(factors));
}

export function isPrimitiveRoot(g: bigint, p: bigint): boolean {
  if (g <= 1n || g >= p) return false;
  const phi = p - 1n;
  const factors = getPrimeFactors(phi);
  for (const factor of factors) {
    if (powerMod(g, phi / factor, p) === 1n) {
      return false;
    }
  }
  return true;
}

export function findPrimitiveRoots(p: bigint, maxRoots: number = 10): bigint[] {
  const roots: bigint[] = [];
  if (!isPrime(p)) return roots;
  
  const phi = p - 1n;
  const factors = getPrimeFactors(phi);
  for (let r = 2n; r < p; r++) {
    let isRoot = true;
    for (const factor of factors) {
      if (powerMod(r, phi / factor, p) === 1n) {
        isRoot = false;
        break;
      }
    }
    if (isRoot) {
      roots.push(r);
      if (roots.length >= maxRoots) {
        break;
      }
    }
  }
  return roots;
}

// --- RSA Specific Utils ---

export function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export function modInverse(e: bigint, phi: bigint): bigint | null {
  let [old_r, r] = [e, phi];
  let [old_s, s] = [1n, 0n];
  let [old_t, t] = [0n, 1n];

  while (r !== 0n) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
    [old_t, t] = [t, old_t - quotient * t];
  }

  if (old_r > 1n) return null; // No inverse if gcd is not 1

  if (old_s < 0n) {
    old_s += phi;
  }
  
  return old_s;
}

export function generatePrime(min: bigint, max: bigint): bigint {
  // A naive random prime generator for educational purposes
  const range = Number(max - min);
  let attempts = 0;
  while (attempts < 1000) {
    const randomOffset = BigInt(Math.floor(Math.random() * range));
    let candidate = min + randomOffset;
    if (candidate % 2n === 0n) candidate += 1n; // Make it odd
    
    if (isPrime(candidate)) return candidate;
    attempts++;
  }
  return min; // Fallback
}

export function textToBigInt(text: string): bigint {
  let hex = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i).toString(16);
    hex += charCode.padStart(2, '0');
  }
  return BigInt('0x' + (hex || '0'));
}

export function bigIntToText(n: bigint): string {
  let hex = n.toString(16);
  if (hex.length % 2 !== 0) hex = '0' + hex;
  let text = '';
  for (let i = 0; i < hex.length; i += 2) {
    const charCode = parseInt(hex.substring(i, i + 2), 16);
    if (charCode) text += String.fromCharCode(charCode);
  }
  return text;
}
