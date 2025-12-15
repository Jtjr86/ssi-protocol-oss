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
export type DecisionType = "ALLOW" | "DENY";

export interface SSIAction {
  type: string;
  payload: Record<string, unknown>;
}

export interface SSIContext {
  ip?: string;
  user_agent?: string;
  labels?: Record<string, string>;
}

export interface SSIRequest {
  request_id: string;
  client_id: string;
  system_id: string;
  timestamp: string; // RFC3339
  action: SSIAction;
  context?: SSIContext;
}

export type MaxNotionalRule = {
  id: string;
  description: string;
  max_notional: number;
};

export type MaxOpenPositionsRule = {
  id: string;
  description: string;
  max_open_positions: number;
};

export type GovernanceRule = MaxNotionalRule | MaxOpenPositionsRule;

export interface GovernanceEnvelope {
  envelope_id: string;
  name: string;
  version: string;
  scope: {
    system_id: string;
    action_type: string;
  };
  rules: GovernanceRule[];
}

export interface KernelDecisionDetails {
  rules_evaluated: string[];
  rules_triggered: string[];
  invariants_violated: string[];
}

export interface DecisionProvenance {
  lane: string;
  envelope_id: string;
  envelope_version: string;
  envelope_sha256: string;
  source_file: string;
  kernel_instance: string;
}

export interface KernelDecision {
  request_id: string;
  decision_id: string;
  decision: DecisionType;
  reason: string;
  details: KernelDecisionDetails;
  timestamp: string;
  envelope?: GovernanceEnvelope;  // v0.3.0: Kernel returns which envelope was used
  provenance?: DecisionProvenance; // v0.3.1: Verifiable decision receipt
}

export interface RPXEntry {
  rpx_id: string;
  request: SSIRequest;
  envelope: GovernanceEnvelope;
  decision: KernelDecision;
  created_at: string;
  hash: string; // sha256 hash of request + envelope_id + decision for tamper-evident audit
}
