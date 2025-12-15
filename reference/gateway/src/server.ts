/*
 * Copyright 2025 Jtjr86
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
import 'dotenv/config';
import express from "express";
import { v4 as uuidv4 } from "uuid";
import * as crypto from "crypto";
import { SSIRequest } from "./types";
import { getEnvelopeForRequest } from "./envelopes";
import { evaluateInKernel } from "./kernelClient";
import { writeRPXEntry } from "./rpxClient";
import { jwtAuthMiddleware } from "./auth/jwtAuth";
import { apiKeyAuthMiddleware, AuthContext } from "./auth/apiKeyAuth";
import { requireAuth, requireRole } from "./auth/rbac";

// Global crash guards - make sure we SEE any runtime errors
process.on("uncaughtException", (err) => {
  console.error("[FATAL] Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[FATAL] Unhandled rejection:", reason);
});

const app = express();
app.use(express.json());

// Track B2.2: JWT Authentication Middleware (applied globally, runs first)
// Guardrail 3: JWT before API key (JWT wins if both present)
app.use(jwtAuthMiddleware);

// Track B2.1: API Key Authentication Middleware (applied globally, fallback)
app.use(apiKeyAuthMiddleware);

// Track B2.1: Tenant ID extraction middleware (runs after auth)
// Guardrail 3: API key tenant_id wins over x-tenant-id header
app.use((req, res, next) => {
  const auth = (req as any).auth as AuthContext | undefined;
  if (auth) {
    // API key provided - use tenant from key (prevents header spoofing)
    (req as any).tenant_id = auth.tenant_id;
  } else {
    // No API key - fall back to x-tenant-id header or 'default'
    (req as any).tenant_id = (req.headers['x-tenant-id'] as string) || 'default';
  }
  next();
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ 
    ok: true, 
    service: "ssi-gateway-ref", 
    kernel_url: process.env.KERNEL_URL || "http://localhost:5050/v1/evaluate",
    timestamp: new Date().toISOString()
  });
});

// Track B2.3: Protect /v1/decisions with RBAC (admin only, unless dev mode)
app.post("/v1/decisions", requireAuth, requireRole(['admin']), async (req, res) => {
  console.log("Incoming /v1/decisions request, raw body:", req.body);

  try {
    const body = req.body as Partial<SSIRequest>;

    const ssiRequest: SSIRequest = {
      request_id: body.request_id ?? uuidv4(),
      client_id: body.client_id ?? "unknown-client",
      system_id: body.system_id ?? "test-system",
      timestamp: body.timestamp ?? new Date().toISOString(),
      action: {
        type: body.action?.type ?? "trade.order.place",
        payload: body.action?.payload ?? {}
      },
      context: body.context ?? {
        ip: req.ip,
        user_agent: (req.headers["user-agent"] as string) ?? "",
        labels: {}
      }
    };

    console.log("Normalized SSIRequest:", JSON.stringify(ssiRequest, null, 2));

    // v0.3.0: Kernel loads envelope from its own envelope store
    // Gateway no longer needs to load envelopes - it's just a thin router

    // Track B2.1: Get tenant_id from middleware (API key wins over header)
    const tenantId = (req as any).tenant_id as string;

    // Call external Kernel service (no envelope - Kernel will load it)
    const decision = await evaluateInKernel(ssiRequest, undefined);

    console.log("Kernel Decision:", JSON.stringify(decision, null, 2));

    // Extract envelope from Kernel response for RPX logging
    const envelope = decision.envelope || {
      envelope_id: "unknown",
      name: "Unknown",
      version: "0.0.0",
      scope: { system_id: ssiRequest.system_id, action_type: ssiRequest.action.type },
      rules: []
    };

    // Track B1.2: Pass tenant_id for tenant-scoped chain creation
    const rpxEntry = await writeRPXEntry({
      request: ssiRequest,
      envelope,
      decision
    }, tenantId);

    console.log("RPX Entry written:", rpxEntry.rpx_id);

    return res.status(200).json({
      success: true,
      decision: {
        decision: decision.decision,
        reason: decision.reason,
        details: decision.details,
        provenance: decision.provenance
      },
      rpx_id: rpxEntry.rpx_id
    });
  } catch (err: any) {
    console.error("[gateway] /v1/decisions error:", err?.stack || err);
    
    // Always return a valid response structure, even on kernel failure
    return res.status(502).json({
      success: false,
      decision: {
        decision: "DENY",
        reason: "Gateway error calling kernel",
        details: {
          error: "KERNEL_UNAVAILABLE",
          message: err instanceof Error ? err.message : String(err)
        }
      },
      rpx_id: null
    });
  }
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`ssi-gateway-ref listening on http://localhost:${PORT}`);
  console.log(
    "POST /v1/decisions with { client_id, system_id, action: { type, payload: { notional } } }"
  );
  console.log("GET /v1/audit/verify/:rpx_id - Verify cryptographic signature and chain integrity (Track A)");
  console.log("GET /v1/audit/verify-chain/:rpx_id - Verify chain continuity from entry to genesis (Track A+)");
});

// ============================================================================
// SSI Cloud Track A: Cryptographic Verification Endpoint
// ============================================================================

import { query } from "./db";
import { verifyHashHex } from "./cloudSigner";
const canonicalize = require('canonicalize');

/**
 * Verify cryptographic signature and chain integrity for an RPX entry
 * 
 * Track B2.3: Protected by RBAC (viewer, auditor, or admin)
 * 
 * Returns:
 * - entry_hash_match: Does recomputed hash match stored hash?
 * - signature_valid: Is Ed25519 signature valid?
 * - chain_valid: Does chain_hash link correctly to previous entry?
 * - valid: Overall verification result (all checks must pass)
 */
app.get("/v1/audit/verify/:rpx_id", requireAuth, requireRole(['viewer', 'auditor', 'admin']), async (req, res) => {
  const { rpx_id } = req.params;

  try {
    // Track B: Enforce tenant isolation - users can only verify entries in their own tenant
    const tenantId = (req as any).tenant_id as string;

    // Fetch entry from database (tenant-scoped)
    const result = await query<{
      rpx_id: string;
      created_at: string;
      tenant_id: string;
      entry_hash: string;
      signature: string;
      public_key: string;
      previous_chain_hash: string;
      chain_hash: string;
      canonical_entry: string;
      system_id: string;
    }>(
      'SELECT * FROM rpx_entries WHERE rpx_id = $1 AND tenant_id = $2',
      [rpx_id, tenantId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'RPX_NOT_FOUND',
        message: `No RPX entry found with ID: ${rpx_id}`
      });
    }

    const record = result.rows[0];

    // Skip verification for genesis entry
    if (rpx_id === '00000000-0000-0000-0000-000000000000') {
      return res.json({
        rpx_id,
        valid: true,
        checks: {
          entry_hash_match: true,
          signature_valid: true,
          chain_valid: true,
          note: 'Genesis entry - verification skipped'
        },
        metadata: {
          created_at: record.created_at,
          system_id: record.system_id,
          public_key: record.public_key,
          previous_chain_hash: record.previous_chain_hash,
          chain_hash: record.chain_hash
        }
      });
    }

    // 1. ENTRY HASH VERIFICATION
    // Recompute hash from stored canonical entry
    const recomputedHash = crypto.createHash('sha256')
      .update(record.canonical_entry)
      .digest('hex');

    const entryHashMatch = recomputedHash === record.entry_hash;

    // 2. SIGNATURE VERIFICATION
    // Verify Ed25519 signature against entry hash
    const signatureValid = await verifyHashHex(
      record.entry_hash,
      record.signature,
      record.public_key
    );

    // 3. CHAIN VERIFICATION
    // Recompute chain hash and verify it matches
    const recomputedChainHash = crypto.createHash('sha256')
      .update(record.previous_chain_hash + record.entry_hash + record.signature)
      .digest('hex');

    const chainValid = recomputedChainHash === record.chain_hash;

    // Overall validity requires all checks to pass
    const valid = entryHashMatch && signatureValid && chainValid;

    return res.json({
      rpx_id,
      valid,
      checks: {
        entry_hash_match: entryHashMatch,
        signature_valid: signatureValid,
        chain_valid: chainValid
      },
      metadata: {
        created_at: record.created_at,
        tenant_id: record.tenant_id,
        system_id: record.system_id,
        public_key: record.public_key,
        previous_chain_hash: record.previous_chain_hash,
        chain_hash: record.chain_hash
      },
      // Include mismatch details for debugging
      ...(valid ? {} : {
        debug: {
          expected_hash: record.entry_hash,
          recomputed_hash: recomputedHash,
          expected_chain_hash: record.chain_hash,
          recomputed_chain_hash: recomputedChainHash
        }
      })
    });

  } catch (err: any) {
    console.error('[gateway] /v1/audit/verify error:', err?.stack || err);
    
    return res.status(500).json({
      error: 'VERIFICATION_ERROR',
      message: 'Failed to verify RPX entry',
      details: err instanceof Error ? err.message : String(err)
    });
  }
});

/**
 * GET /v1/audit/verify-chain/:rpx_id
 * 
 * Track A Chain Continuity Verification
 * Track B2.3: Protected by RBAC (auditor or admin only)
 * 
 * Verifies not just the entry itself, but that it's anchored to genesis
 * through an unbroken chain of previous_chain_hash → chain_hash links.
 * 
 * Returns:
 * - valid_entry: boolean (same as /v1/audit/verify)
 * - anchored: boolean (true if chain reaches genesis without breaks)
 * - break_reason: string | null (MISSING_PREVIOUS, MAX_DEPTH_EXCEEDED, etc.)
 * - checked_count: number (how many links verified)
 * - path: string[] (list of rpx_ids checked, max 200)
 */
app.get("/v1/audit/verify-chain/:rpx_id", requireAuth, requireRole(['auditor', 'admin']), async (req, res) => {
  const { rpx_id } = req.params;
  const GENESIS_ID = '00000000-0000-0000-0000-000000000000';
  const MAX_DEPTH = 200; // Performance limit

  try {
    // Track B: Enforce tenant isolation - users can only verify chains in their own tenant
    const tenantId = (req as any).tenant_id as string;

    // Step 1: Verify the entry itself (same as /v1/audit/verify) - tenant-scoped
    const entryResult = await query<{
      rpx_id: string;
      created_at: string;
      tenant_id: string;
      entry_hash: string;
      signature: string;
      public_key: string;
      previous_chain_hash: string;
      chain_hash: string;
      canonical_entry: string;
      system_id: string;
    }>(
      'SELECT * FROM rpx_entries WHERE rpx_id = $1 AND tenant_id = $2',
      [rpx_id, tenantId]
    );

    if (entryResult.rows.length === 0) {
      return res.status(404).json({
        error: 'RPX_NOT_FOUND',
        message: `No RPX entry found with ID: ${rpx_id}`
      });
    }

    const record = entryResult.rows[0];

    // Verify entry integrity (hash + signature)
    const recomputedHash = crypto.createHash('sha256')
      .update(record.canonical_entry)
      .digest('hex');
    const entryHashMatch = recomputedHash === record.entry_hash;

    const signatureValid = await verifyHashHex(
      record.entry_hash,
      record.signature,
      record.public_key
    );

    const recomputedChainHash = crypto.createHash('sha256')
      .update(record.previous_chain_hash + record.entry_hash + record.signature)
      .digest('hex');
    const chainValid = recomputedChainHash === record.chain_hash;

    const validEntry = entryHashMatch && signatureValid && chainValid;

    // Step 2: Walk chain backwards to genesis
    const path: string[] = [rpx_id];
    let currentPreviousHash = record.previous_chain_hash;
    let checkedCount = 1;
    let anchored = false;
    let breakReason: string | null = null;

    // Special case: if this IS genesis, it's anchored by definition
    if (rpx_id === GENESIS_ID) {
      anchored = true;
    } else {
      // Walk backwards
      while (checkedCount < MAX_DEPTH) {
        // Check if we've reached genesis (all zeros)
        if (currentPreviousHash === '0000000000000000000000000000000000000000000000000000000000000000') {
          anchored = true;
          break;
        }

        // Find the entry whose chain_hash matches our current previous_chain_hash
        // Track B: Enforce tenant isolation - chain walking stays within tenant boundary
        const previousResult = await query<{
          rpx_id: string;
          tenant_id: string;
          chain_hash: string;
          previous_chain_hash: string;
        }>(
          'SELECT rpx_id, tenant_id, chain_hash, previous_chain_hash FROM rpx_entries WHERE chain_hash = $1 AND tenant_id = $2',
          [currentPreviousHash, tenantId]
        );

        if (previousResult.rows.length === 0) {
          breakReason = 'MISSING_PREVIOUS';
          break;
        }

        const previousEntry = previousResult.rows[0];
        
        // Track B1.3: CRITICAL - Fail if chain crosses tenant boundary
        if (previousEntry.tenant_id !== tenantId) {
          breakReason = 'TENANT_MISMATCH';
          break;
        }
        
        // Verify the link matches
        if (previousEntry.chain_hash !== currentPreviousHash) {
          breakReason = 'PREVIOUS_MISMATCH';
          break;
        }

        // Add to path and continue
        path.push(previousEntry.rpx_id);
        currentPreviousHash = previousEntry.previous_chain_hash;
        checkedCount++;

        // Check if we reached genesis
        if (previousEntry.rpx_id === GENESIS_ID) {
          anchored = true;
          break;
        }
      }

      // If we hit max depth without reaching genesis
      if (checkedCount >= MAX_DEPTH && !anchored) {
        breakReason = 'MAX_DEPTH_EXCEEDED';
      }
    }

    return res.json({
      rpx_id,
      valid_entry: validEntry,
      anchored,
      break_reason: breakReason,
      checked_count: checkedCount,
      path,
      entry_checks: {
        entry_hash_match: entryHashMatch,
        signature_valid: signatureValid,
        chain_valid: chainValid
      },
      metadata: {
        created_at: record.created_at,
        tenant_id: record.tenant_id,
        system_id: record.system_id,
        public_key: record.public_key,
        previous_chain_hash: record.previous_chain_hash,
        chain_hash: record.chain_hash
      }
    });

  } catch (err: any) {
    console.error('[gateway] /v1/audit/verify-chain error:', err?.stack || err);
    
    return res.status(500).json({
      error: 'CHAIN_VERIFICATION_ERROR',
      message: 'Failed to verify chain continuity',
      details: err instanceof Error ? err.message : String(err)
    });
  }
});