/*
 * Copyright 2025 Jtjr86
 * SSI Cloud Track A: Cryptographically signed, hash-chained RPX entries
 *
 * Licensed under the Apache License, Version 2.0 (the \"License\");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an \"AS IS\" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import crypto from "crypto";
import { RPXEntry } from "./types";
import { v4 as uuidv4 } from "uuid";
import { query } from "./db";
import { signHashHex, getPublicKeyHex } from "./cloudSigner";

// Use canonicalize for deterministic JSON (RFC 8785)
// This prevents signature breaks from key reordering
const canonicalize = require('canonicalize');

/**
 * Write a cryptographically signed, hash-chained RPX entry to PostgreSQL
 * 
 * Track A implementation:
 * 1. Canonicalize entry data (RFC 8785)
 * 2. Compute entry_hash = SHA256(canonical_entry)
 * 3. Sign entry_hash with Ed25519
 * 4. Compute chain_hash = SHA256(previous_chain_hash + entry_hash + signature)
 * 5. Store in PostgreSQL with verification metadata
 * 
 * Track B: Tenant isolation enforced - each (tenant_id, system_id) maintains separate chain
 */
export async function writeRPXEntry(
  entry: Omit<RPXEntry, "rpx_id" | "created_at" | "hash">,
  tenantId: string = 'default'
): Promise<RPXEntry> {
  const rpxId = uuidv4();
  const createdAt = new Date().toISOString();

  try {
    // 1. Get previous chain hash FOR THIS TENANT + SYSTEM (or genesis)
    // Track B: Each (tenant_id, system_id) pair maintains its own chain from genesis
    const previousResult = await query<{ chain_hash: string }>(
      'SELECT chain_hash FROM rpx_entries WHERE tenant_id = $1 AND system_id = $2 ORDER BY created_at DESC LIMIT 1',
      [tenantId, entry.request.system_id]
    );
    
    const previousChainHash = previousResult.rows[0]?.chain_hash || 
      '0000000000000000000000000000000000000000000000000000000000000000';

    // 2. Canonicalize entry data (deterministic JSON serialization)
    const canonicalEntry = canonicalize({
      rpx_id: rpxId,
      created_at: createdAt,
      request: entry.request,
      decision: entry.decision,
      envelope: entry.envelope,
      previous_chain_hash: previousChainHash
    });

    // 3. Compute entry hash (SHA256 of canonical JSON)
    const entryHash = crypto.createHash('sha256')
      .update(canonicalEntry)
      .digest('hex');

    // 4. Sign entry hash with Ed25519
    const signature = await signHashHex(entryHash);
    const publicKey = await getPublicKeyHex();

    // 5. Compute chain hash (links to previous entry)
    const chainHash = crypto.createHash('sha256')
      .update(previousChainHash + entryHash + signature)
      .digest('hex');

    // 6. Store in PostgreSQL (Track B: tenant_id enforced)
    await query(
      `INSERT INTO rpx_entries (
        rpx_id, created_at, tenant_id, system_id,
        entry_hash, signature, public_key,
        previous_chain_hash, chain_hash,
        canonical_entry, request_json, decision_json, envelope_json
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        rpxId,
        createdAt,
        tenantId, // Track B: Tenant isolation enforced
        entry.request.system_id,
        entryHash,
        signature,
        publicKey,
        previousChainHash,
        chainHash,
        canonicalEntry,
        JSON.stringify(entry.request),
        JSON.stringify(entry.decision),
        JSON.stringify(entry.envelope)
      ]
    );

    console.log('[rpxClient] Signed RPX entry written:', {
      rpx_id: rpxId,
      entry_hash: entryHash.substring(0, 16) + '...',
      chain_hash: chainHash.substring(0, 16) + '...',
      previous_chain_hash: previousChainHash.substring(0, 16) + '...'
    });

    return {
      rpx_id: rpxId,
      created_at: createdAt,
      hash: entryHash, // Maintain compatibility with existing RPXEntry interface
      ...entry
    };

  } catch (err) {
    console.error('[rpxClient] Failed to write signed RPX entry:', err);
    
    // IMPORTANT: DO NOT THROW - we never want logging to bring down SSI
    // Return a minimal entry to maintain Gateway response structure
    return {
      rpx_id: rpxId,
      created_at: createdAt,
      hash: 'error',
      ...entry
    };
  }
}