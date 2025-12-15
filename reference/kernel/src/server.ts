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
// SSI Kernel HTTP Server
// Exposes POST /v1/evaluate endpoint for policy evaluation

import express from "express";
import { evaluate } from "./evaluator";
import { GovernanceEnvelope, SSIRequest, KernelDecision } from "./types";
import { findEnvelope, reloadEnvelopesManual } from "./envelopes-store";

const app = express();
app.use(express.json());

/**
 * POST /v1/evaluate
 * 
 * Evaluate an SSI request against a governance envelope
 * 
 * Request body:
 *   { request: SSIRequest, envelope?: GovernanceEnvelope }
 * 
 * If envelope is omitted, looks it up from the envelope store
 * 
 * Response:
 *   { success: true, decision: KernelDecision }
 */
app.post("/v1/evaluate", (req, res) => {
  try {
    const body = req.body as {
      request: SSIRequest;
      envelope?: GovernanceEnvelope;
    };

    const ssiRequest = body.request;
    let envelope = body.envelope;
    let provenance;

    if (!envelope) {
      const result = findEnvelope(ssiRequest.system_id, ssiRequest.action.type);
      if (result) {
        envelope = result.envelope;
        provenance = result.provenance;
      }
    }

    if (!envelope) {
      return res.status(404).json({
        success: false,
        error: "envelope_not_found",
        message: "No envelope found for system/action"
      });
    }

    console.log(`[kernel] evaluating request ${ssiRequest.request_id} against envelope ${envelope.envelope_id}`);

    const decision: KernelDecision = evaluate(ssiRequest, envelope, provenance);

    console.log(`[kernel] decision: ${decision.decision} (${decision.reason})`);

    res.json({ success: true, decision });
  } catch (err) {
    console.error("[kernel] error evaluating request:", err);
    res.status(500).json({
      success: false,
      error: "kernel_evaluation_failed",
      message: err instanceof Error ? err.message : "unknown error"
    });
  }
});

/**
 * GET /health
 * Health check endpoint
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "ssi-kernel-ref", version: "0.2.0" });
});

/**
 * POST /reload
 * Hot-reload envelopes from disk
 */
app.post("/reload", (req, res) => {
  try {
    console.log(`[kernel] 🔄 Manual reload requested via API`);
    reloadEnvelopesManual();
    res.json({ success: true, message: "Envelopes reloaded successfully" });
  } catch (err) {
    console.error("[kernel] Error during manual reload:", err);
    res.status(500).json({ 
      success: false, 
      error: "reload_failed",
      message: err instanceof Error ? err.message : "unknown error"
    });
  }
});

const port = process.env.KERNEL_PORT || 5050;
app.listen(port, () => {
  console.log(`[kernel] ssi-kernel-ref v0.2.0 listening on http://localhost:${port}`);
  console.log(`[kernel] evaluate endpoint: POST http://localhost:${port}/v1/evaluate`);
});
