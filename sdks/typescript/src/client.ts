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
/**
 * SSI Protocol TypeScript SDK - Main Client
 */

import fetch from 'node-fetch';

export interface SSIClientOptions {
  /** Gateway URL (default: http://localhost:4040) */
  gatewayUrl?: string;
  /** Request timeout in milliseconds (default: 5000) */
  timeout?: number;
  /** Allow actions when Gateway unavailable (default: false) */
  failOpen?: boolean;
}

export interface SSIAction {
  type: string;
  payload: Record<string, unknown>;
}

export interface SSIRequest {
  clientId: string;
  systemId: string;
  action: SSIAction;
  context?: Record<string, unknown>;
}

export interface SSIDecision {
  decision: 'ALLOW' | 'DENY';
  reason: string;
  rulesEvaluated: string[];
  rulesTriggered: string[];
  rpxId?: string;
}

export interface SSIDecisionResponse extends SSIDecision {
  allowed: boolean;
  denied: boolean;
}

export class SSIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SSIError';
  }
}

export class SSIGatewayError extends SSIError {
  constructor(message: string) {
    super(message);
    this.name = 'SSIGatewayError';
  }
}

/**
 * SSI Protocol Client
 * 
 * Communicates with SSI Gateway to evaluate actions against governance policies.
 * 
 * @example
 * ```typescript
 * const client = new SSIClient();
 * const decision = await client.evaluate({
 *   clientId: 'my-app',
 *   systemId: 'trading-prod',
 *   action: {
 *     type: 'trade.order.place',
 *     payload: { notional: 5000 }
 *   }
 * });
 * 
 * if (decision.allowed) {
 *   // Execute action
 * }
 * ```
 */
export class SSIClient {
  private gatewayUrl: string;
  private timeout: number;
  private failOpen: boolean;

  constructor(options: SSIClientOptions = {}) {
    this.gatewayUrl = options.gatewayUrl || process.env.SSI_GATEWAY_URL || 'http://localhost:4040';
    this.timeout = options.timeout || 5000;
    this.failOpen = options.failOpen || false;
  }

  /**
   * Evaluate an action against SSI governance policies
   * 
   * @param request - SSI request containing action details
   * @returns Promise resolving to decision with allowed/denied properties
   * @throws SSIGatewayError if Gateway unreachable and failOpen=false
   */
  async evaluate(request: SSIRequest): Promise<SSIDecisionResponse> {
    const url = `${this.gatewayUrl}/v1/decisions`;

    const requestBody = {
      client_id: request.clientId,
      system_id: request.systemId,
      action: request.action,
      context: request.context,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new SSIGatewayError(`Gateway returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json() as any;

      if (!data.success) {
        throw new SSIError(`Kernel evaluation failed: ${data.error}`);
      }

      const decision: SSIDecision = {
        decision: data.decision.decision,
        reason: data.decision.reason,
        rulesEvaluated: data.decision.details?.rules_evaluated || [],
        rulesTriggered: data.decision.details?.rules_triggered || [],
        rpxId: data.rpx_id,
      };

      return {
        ...decision,
        allowed: decision.decision === 'ALLOW',
        denied: decision.decision === 'DENY',
      };

    } catch (error) {
      if (this.failOpen) {
        // Fail open: allow action when Gateway unavailable
        return {
          decision: 'ALLOW',
          reason: `Gateway unavailable (fail-open mode): ${error}`,
          rulesEvaluated: [],
          rulesTriggered: [],
          allowed: true,
          denied: false,
        };
      } else {
        throw new SSIGatewayError(`Failed to reach SSI Gateway: ${error}`);
      }
    }
  }

  /**
   * Check if SSI Gateway is reachable
   * 
   * @returns Promise resolving to true if Gateway is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.gatewayUrl}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000),
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
