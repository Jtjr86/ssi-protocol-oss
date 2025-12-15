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
// Pure policy evaluation logic
// This is the core of the Kernel - stateless, deterministic evaluation

import { GovernanceEnvelope, KernelDecision, SSIRequest, DecisionProvenance } from "./types";
import { v4 as uuidv4 } from "uuid";

/**
 * Evaluate an SSI request against a governance envelope
 * Returns a structured decision with full reasoning trace and provenance
 */
export function evaluate(req: SSIRequest, envelope: GovernanceEnvelope, provenance?: DecisionProvenance): KernelDecision {
  const now = new Date().toISOString();

  const rulesEvaluated: string[] = [];
  const rulesTriggered: string[] = [];
  const invariantsViolated: string[] = [];

  const actionType = req.action.type;
  const payload = req.action.payload as { notional?: number; open_positions_count?: number };
  const notional = typeof payload.notional === "number" ? payload.notional : 0;
  const openPositions = typeof payload.open_positions_count === "number" ? payload.open_positions_count : 0;

  const denyReasons: string[] = [];

  // Evaluate each rule in the envelope
  for (const rule of envelope.rules) {
    rulesEvaluated.push(rule.id);

    // Max notional rule
    if ("max_notional" in rule && actionType === "trade.order.place") {
      if (notional > rule.max_notional) {
        rulesTriggered.push(rule.id);
        denyReasons.push(`Order notional ${notional} exceeds max allowed ${rule.max_notional}`);
      }
    }

    // Max open positions rule
    if ("max_open_positions" in rule && actionType === "trade.order.place") {
      if (openPositions >= rule.max_open_positions) {
        rulesTriggered.push(rule.id);
        denyReasons.push(
          `Open positions ${openPositions} exceeds or meets limit ${rule.max_open_positions}`
        );
      }
    }
  }

  // v0.3.1: Ensure provenance is always present, never undefined
  const finalProvenance: DecisionProvenance = provenance || {
    lane: process.env.ENVELOPE_LANE || "unknown",
    envelope_id: envelope?.envelope_id || "unknown",
    envelope_version: envelope?.version || "unknown", 
    envelope_sha256: "unknown",
    source_file: "unknown",
    kernel_instance: `kernel-${Date.now()}`
  };

  const baseDecision: Omit<KernelDecision, "decision" | "reason"> = {
    request_id: req.request_id,
    decision_id: uuidv4(),
    timestamp: now,
    details: {
      rules_evaluated: rulesEvaluated,
      rules_triggered: rulesTriggered,
      invariants_violated: invariantsViolated
    },
    envelope,  // v0.3.0: Return which envelope was used
    provenance: finalProvenance // v0.3.1: Return decision provenance for operational determinism
  };

  // Return DENY if any rules were violated
  if (denyReasons.length > 0) {
    return {
      ...baseDecision,
      decision: "DENY",
      reason: denyReasons.join(" | ")
    };
  }

  // Otherwise ALLOW
  return {
    ...baseDecision,
    decision: "ALLOW",
    reason: "Within policy limits."
  };
}
