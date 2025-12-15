/*
 * Copyright 2025 Jtjr86
 * SSI Cloud Track A: Ed25519 Signing Service (KMS-swappable abstraction)
 * 
 * SECURITY NOTICE (Track A - Option 1):
 * This implementation uses deterministic Ed25519 keypair derived from SIGNING_SEED env var.
 * 
 * ** DEV/PILOT USE ONLY **
 * For production (Track A - Option 2), replace with AWS KMS, Azure Key Vault, or HSM.
 * The abstraction allows swapping backends without changing rpxClient.ts chain logic.
 */
import crypto from 'crypto';

// Lazy-loaded ES Module (@noble/ed25519 is ESM-only)
// Use Function constructor to prevent TypeScript from transforming dynamic import
let ed: any | null = null;

async function loadEd25519() {
  if (!ed) {
    // Runtime dynamic import - prevents TypeScript from converting to require()
    const importModule = new Function('specifier', 'return import(specifier)');
    ed = await importModule('@noble/ed25519');
    
    // Configure SHA-512 for Node.js (avoids crypto.subtle requirement in Node 18)
    // @ts-ignore
    ed.etc.sha512Sync = (...m: Uint8Array[]) => {
      return new Uint8Array(crypto.createHash('sha512').update(Buffer.concat(m as any)).digest());
    };
  }
  return ed;
}

// Singleton keypair instance
let privateKey: Uint8Array | null = null;
let publicKey: Uint8Array | null = null;

/**
 * Initialize signing keypair from SIGNING_SEED environment variable
 * Uses deterministic derivation for dev/pilot consistency
 */
async function initializeKeypair(): Promise<void> {
  if (privateKey && publicKey) {
    return; // Already initialized
  }

  const edModule = await loadEd25519();

  const seed = process.env.SIGNING_SEED;
  
  if (!seed) {
    throw new Error(
      'SIGNING_SEED environment variable is required for SSI Cloud Track A.\n' +
      'Generate a secure seed with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"\n' +
      '** WARNING: This is DEV/PILOT mode. Production deployments must use KMS/HSM. **'
    );
  }

  if (seed === 'INSECURE_DEV_SEED') {
    console.warn(
      '[cloudSigner] ⚠️  WARNING: Using INSECURE_DEV_SEED for signing keys!\n' +
      'This is ONLY acceptable in local development. Generate a real seed for pilot deployments.'
    );
  }

  // Derive deterministic 32-byte private key from seed
  privateKey = crypto.createHash('sha256')
    .update(seed)
    .digest();

  // Generate Ed25519 public key (use sync version to avoid crypto.subtle)
  publicKey = edModule.getPublicKey(privateKey);

  console.log('[cloudSigner] Ed25519 keypair initialized (deterministic from SIGNING_SEED)');
  console.log(`[cloudSigner] Public key: ${publicKey ? Buffer.from(publicKey).toString('hex').substring(0, 16) : 'unknown'}...`);
}

/**
 * Get the public key as hex string
 * Used for storing with each RPX entry
 */
export async function getPublicKeyHex(): Promise<string> {
  await initializeKeypair();
  if (!publicKey) {
    throw new Error('[cloudSigner] Public key not initialized');
  }
  return Buffer.from(publicKey).toString('hex');
}

/**
 * Sign an entry hash (hex string) and return signature as hex
 * 
 * @param entryHashHex - SHA256 hash of canonical RPX entry (64-char hex)
 * @returns Ed25519 signature (128-char hex)
 */
export async function signHashHex(entryHashHex: string): Promise<string> {
  await initializeKeypair();
  
  const edModule = await loadEd25519();
  
  if (!privateKey) {
    throw new Error('[cloudSigner] Private key not initialized');
  }

  if (!/^[0-9a-f]{64}$/i.test(entryHashHex)) {
    throw new Error(`[cloudSigner] Invalid entry hash format: expected 64-char hex, got ${entryHashHex.length} chars`);
  }

  const hashBytes = Buffer.from(entryHashHex, 'hex');
  const signature = edModule.sign(hashBytes, privateKey);
  
  return Buffer.from(signature).toString('hex');
}

/**
 * Verify a signature against an entry hash
 * 
 * @param entryHashHex - SHA256 hash of canonical entry
 * @param signatureHex - Ed25519 signature to verify
 * @param publicKeyHex - Public key to verify against
 * @returns true if signature is valid
 */
export async function verifyHashHex(
  entryHashHex: string,
  signatureHex: string,
  publicKeyHex: string
): Promise<boolean> {
  try {
    const edModule = await loadEd25519();
    
    if (!/^[0-9a-f]{64}$/i.test(entryHashHex)) {
      console.error(`[cloudSigner] Invalid entry hash format: ${entryHashHex.length} chars`);
      return false;
    }

    if (!/^[0-9a-f]{128}$/i.test(signatureHex)) {
      console.error(`[cloudSigner] Invalid signature format: ${signatureHex.length} chars`);
      return false;
    }

    const hashBytes = Buffer.from(entryHashHex, 'hex');
    const signatureBytes = Buffer.from(signatureHex, 'hex');
    const publicKeyBytes = Buffer.from(publicKeyHex, 'hex');

    const valid = edModule.verify(signatureBytes, hashBytes, publicKeyBytes);
    
    return valid;
  } catch (error) {
    console.error('[cloudSigner] Verification error:', error);
    return false;
  }
}

/**
 * KMS UPGRADE PATH (Track A - Option 2):
 * 
 * Replace the above functions with KMS SDK calls:
 * 
 * AWS KMS Example:
 * ```typescript
 * import { KMSClient, SignCommand, VerifyCommand } from '@aws-sdk/client-kms';
 * 
 * const kms = new KMSClient({ region: process.env.AWS_REGION });
 * 
 * export async function signHashHex(entryHashHex: string): Promise<string> {
 *   const result = await kms.send(new SignCommand({
 *     KeyId: process.env.KMS_KEY_ID,
 *     Message: Buffer.from(entryHashHex, 'hex'),
 *     SigningAlgorithm: 'ECDSA_SHA_256'
 *   }));
 *   return result.Signature.toString('hex');
 * }
 * ```
 * 
 * Chain logic in rpxClient.ts remains unchanged - only swap this file.
 */
