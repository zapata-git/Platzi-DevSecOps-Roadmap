import { powerMod } from "./mathUtils";

/**
 * Calculates the public key: A = g^a mod p  OR  B = g^b mod p
 * @param privateKey The participant's private key (a or b)
 * @param g The generator algorithm parameter
 * @param p The prime modulus algorithm parameter
 * @returns The calculated public key
 */
export function generatePublicKey(privateKey: bigint, g: bigint, p: bigint): bigint {
  return powerMod(g, privateKey, p);
}

/**
 * Calculates the shared secret: s = B^a mod p  OR  s = A^b mod p
 * @param otherPublicKey The other participant's public key (A or B)
 * @param myPrivateKey The participant's own private key (a or b)
 * @param p The prime modulus algorithm parameter
 * @returns The calculated shared secret
 */
export function generateSharedSecret(otherPublicKey: bigint, myPrivateKey: bigint, p: bigint): bigint {
  return powerMod(otherPublicKey, myPrivateKey, p);
}
