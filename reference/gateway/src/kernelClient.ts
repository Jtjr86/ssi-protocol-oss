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
// SSI Gateway ? Kernel HTTP Client
// Calls external Kernel service for policy evaluation

import type { GovernanceEnvelope, KernelDecision, SSIRequest } from "./types";
import http from "http";

const KERNEL_URL = process.env.KERNEL_URL || "http://localhost:5050/v1/evaluate";

/**
 * Evaluate a request by calling the external Kernel service
 * 
 * @param req - The SSI request to evaluate
 * @param envelope - Optional governance envelope (if omitted, Kernel loads from its store)
 * @returns Promise resolving to the Kernel's decision
 */
export async function evaluateInKernel(
  req: SSIRequest,
  envelope?: GovernanceEnvelope
): Promise<KernelDecision> {
  const payload = JSON.stringify({ request: req, envelope });

  return new Promise<KernelDecision>((resolve, reject) => {
    const url = new URL(KERNEL_URL);

    const options: http.RequestOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload)
      }
    };

    console.log(`[gateway] calling kernel at ${KERNEL_URL}`);

    const request = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (!parsed.success) {
            return reject(new Error("kernel_error: " + (parsed.error || "unknown")));
          }
          console.log(`[gateway] kernel returned: ${parsed.decision.decision}`);
          resolve(parsed.decision as KernelDecision);
        } catch (e) {
          reject(e);
        }
      });
    });

    request.on("error", (err) => {
      console.error("[gateway] kernel request failed:", err);
      reject(err);
    });

    request.write(payload);
    request.end();
  });
}
