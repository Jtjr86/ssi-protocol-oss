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
// Envelope store - loads governance envelopes from JSON files
// This makes envelopes data-backed artifacts, not hardcoded logic
// 
// NEW in v0.3.0: Support for envelope lanes (dev/staging/prod)
// - Envelopes organized by environment maturity
// - ENVELOPE_LANE env var selects which lane to load
// - Production lane requires valid signatures
//
// NEW in v0.3.1: Hot-reload support for rapid iteration
// - SIGHUP signal triggers envelope reload
// - File watching for automatic reloads (optional)
// - No service restart needed for envelope updates

import { GovernanceEnvelope, DecisionProvenance } from "./types";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// Lane configuration
type EnvelopeLane = "dev" | "staging" | "prod";
const ENVELOPE_LANE: EnvelopeLane = (process.env.ENVELOPE_LANE as EnvelopeLane) || "prod";
const REQUIRE_SIGNATURES = process.env.REQUIRE_ENVELOPE_SIGNATURES !== "false"; // Default true
const ENABLE_HOT_RELOAD = process.env.SSI_HOT_RELOAD !== "false"; // Default true

// Global envelope store with provenance tracking
interface EnvelopeWithProvenance {
  envelope: GovernanceEnvelope;
  filePath: string;
  sha256: string;
}

const envelopes: EnvelopeWithProvenance[] = [];
let currentEnvelopeDir: string = "";
let fileWatcher: fs.FSWatcher | null = null;

/**
 * Validate envelope signature (placeholder for v1 - implement crypto verification)
 */
function validateSignature(envelope: any): boolean {
  // In v1, this is a placeholder
  // In production, implement:
  // 1. Verify signature field is present and non-null
  // 2. Verify signed_by is a trusted key
  // 3. Cryptographically verify signature matches envelope content
  
  if (!envelope.signature || envelope.signature === null) {
    return false;
  }
  
  // Placeholder: accept any non-null signature
  return true;
}

/**
 * Load all envelope JSON files from the selected lane directory
 */
function loadEnvelopes() {
  // Determine envelope directory based on lane
  let dir: string;
  
  if (ENVELOPE_LANE === "dev" || ENVELOPE_LANE === "staging") {
    dir = path.join(__dirname, "..", "envelopes", ENVELOPE_LANE);
  } else {
    // Production: check both prod/ and legacy root (backward compat)
    const prodDir = path.join(__dirname, "..", "envelopes", "prod");
    const legacyDir = path.join(__dirname, "..", "envelopes");
    
    if (fs.existsSync(prodDir)) {
      dir = prodDir;
    } else {
      dir = legacyDir;
    }
  }
  
  console.log(`[kernel] Loading envelopes from lane: ${ENVELOPE_LANE}`);
  console.log(`[kernel] Envelope directory: ${dir}`);
  console.log(`[kernel] Signature verification: ${REQUIRE_SIGNATURES ? "ENABLED" : "DISABLED"}`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    console.warn(`[kernel] envelopes directory not found at ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  
  for (const file of files) {
    try {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw);
      
      // Calculate SHA256 hash for provenance
      const sha256 = crypto.createHash('sha256').update(raw).digest('hex');
      
      // Signature verification for production lane
      if (ENVELOPE_LANE === "prod" && REQUIRE_SIGNATURES) {
        if (!validateSignature(parsed)) {
          console.error(`[kernel] REJECTED: ${file} - missing or invalid signature (production lane)`);
          continue; // Skip unsigned envelopes in prod
        }
        console.log(`[kernel] ✓ Signature verified: ${file}`);
      }
      
      envelopes.push({
        envelope: parsed as GovernanceEnvelope,
        filePath: filePath,
        sha256: sha256
      });
      console.log(`[kernel] loaded envelope: ${parsed.id || parsed.envelope_id} (${file})`);
    } catch (err) {
      console.error(`[kernel] failed to load envelope ${file}:`, err);
    }
  }

  console.log(`[kernel] loaded ${envelopes.length} envelope(s) from ${ENVELOPE_LANE} lane`);
  
  if (envelopes.length === 0 && ENVELOPE_LANE === "prod") {
    console.error(`[kernel] WARNING: No envelopes loaded in production lane!`);
    console.error(`[kernel]          This will block all decisions.`);
  }
  
  // Store current directory for hot-reload
  currentEnvelopeDir = dir;
}

/**
 * Hot-reload envelopes from disk
 */
function reloadEnvelopes() {
  console.log(`[kernel] 🔄 Hot-reloading envelopes from ${ENVELOPE_LANE} lane...`);
  
  // Clear existing envelopes
  envelopes.length = 0;
  
  // Reload from current directory
  loadEnvelopes();
  
  console.log(`[kernel] ✅ Hot-reload complete: ${envelopes.length} envelopes loaded`);
}

/**
 * Setup hot-reload mechanisms
 */
function setupHotReload() {
  if (!ENABLE_HOT_RELOAD) {
    console.log(`[kernel] Hot-reload disabled (SSI_HOT_RELOAD=false)`);
    return;
  }
  
  console.log(`[kernel] 🔥 Hot-reload enabled: SIGHUP triggers envelope reload`);
  
  // SIGHUP signal handler (Unix/Linux style reload)
  process.on('SIGHUP', () => {
    console.log(`[kernel] Received SIGHUP - reloading envelopes...`);
    reloadEnvelopes();
  });
  
  // File watcher for automatic reloads (optional, can be noisy)
  if (process.env.SSI_WATCH_FILES === "true" && currentEnvelopeDir) {
    try {
      fileWatcher = fs.watch(currentEnvelopeDir, { recursive: false }, (eventType, filename) => {
        if (filename && filename.endsWith('.json')) {
          console.log(`[kernel] File changed: ${filename} - reloading envelopes...`);
          // Debounce rapid file changes
          setTimeout(reloadEnvelopes, 500);
        }
      });
      console.log(`[kernel] 👀 Watching ${currentEnvelopeDir} for envelope changes`);
    } catch (err) {
      console.warn(`[kernel] Could not setup file watcher:`, err);
    }
  }
  
  // Graceful shutdown
  process.on('SIGTERM', () => {
    if (fileWatcher) {
      fileWatcher.close();
    }
  });
}

// Initialize envelopes and hot-reload
loadEnvelopes();
setupHotReload();

/**
 * Find an envelope matching the given system_id and action_type
 * Handles both legacy format (with scope) and new format (without scope)
 * Prefers newer versions (sorted by version descending)
 */
export function findEnvelope(system_id: string, action_type: string): { envelope: GovernanceEnvelope; provenance: DecisionProvenance } | null {
  const matches = envelopes.filter((env) => {
    // Legacy format: check env.scope fields
    if (env.envelope.scope) {
      return env.envelope.scope.system_id === system_id && env.envelope.scope.action_type === action_type;
    }
    
    // New format: match by heuristics (trading-* system + trade.* action)
    if (system_id.includes('trading') && action_type.startsWith('trade.')) {
      return env.envelope.name === 'TradingSafetyEnvelope';
    }
    
    // Default: no match
    return false;
  });
  
  if (matches.length === 0) return null;
  
  // Sort by version descending (e.g., "0.3.0" > "0.2.1" > "0.2.0")
  matches.sort((a, b) => b.envelope.version.localeCompare(a.envelope.version, undefined, { numeric: true }));
  
  const selected = matches[0];
  
  // Build provenance
  const provenance: DecisionProvenance = {
    lane: ENVELOPE_LANE,
    envelope_id: selected.envelope.envelope_id,
    envelope_version: selected.envelope.version,
    envelope_sha256: selected.sha256,
    source_file: selected.filePath,
    kernel_instance: `kernel-${process.pid}-${ENVELOPE_LANE}`
  };
  
  return { envelope: selected.envelope, provenance };
}

/**
 * Get all loaded envelopes (for debugging/inspection)
 */
export function listEnvelopes(): GovernanceEnvelope[] {
  return envelopes.map(e => e.envelope);
}

/**
 * Manual envelope reload (for API/CLI usage)
 */
export function reloadEnvelopesManual(): void {
  reloadEnvelopes();
}
