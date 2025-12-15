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
 * Express middleware for SSI Protocol governance
 */

import { Request, Response, NextFunction } from 'express';
import { SSIClient, SSIClientOptions } from './client';

export interface SSIMiddlewareOptions extends SSIClientOptions {
  /** System ID for this application */
  systemId: string;
  /** Function to extract action type from request (default: uses route path) */
  actionTypeExtractor?: (req: Request) => string;
  /** Function to extract payload from request (default: uses req.body) */
  payloadExtractor?: (req: Request) => Record<string, unknown>;
  /** Function to extract client ID from request (default: uses IP) */
  clientIdExtractor?: (req: Request) => string;
}

/**
 * Express middleware that enforces SSI governance on routes
 * 
 * @example
 * ```typescript
 * import { ssiMiddleware } from '@ssi-protocol/client/middleware';
 * 
 * app.use(ssiMiddleware({
 *   systemId: 'trading-prod',
 *   gatewayUrl: 'http://localhost:4040'
 * }));
 * 
 * // All routes are now governed
 * app.post('/api/trade', async (req, res) => {
 *   // Only executes if SSI allows
 *   const result = await executeTrade(req.body);
 *   res.json(result);
 * });
 * ```
 */
export function ssiMiddleware(options: SSIMiddlewareOptions) {
  const client = new SSIClient({
    gatewayUrl: options.gatewayUrl,
    timeout: options.timeout,
    failOpen: options.failOpen,
  });

  const actionTypeExtractor = options.actionTypeExtractor || ((req: Request) => {
    return `${req.method.toLowerCase()}.${req.path.replace(/\//g, '.')}`;
  });

  const payloadExtractor = options.payloadExtractor || ((req: Request) => req.body || {});

  const clientIdExtractor = options.clientIdExtractor || ((req: Request) => {
    return req.ip || 'unknown';
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decision = await client.evaluate({
        clientId: clientIdExtractor(req),
        systemId: options.systemId,
        action: {
          type: actionTypeExtractor(req),
          payload: payloadExtractor(req),
        },
        context: {
          ip: req.ip,
          user_agent: req.headers['user-agent'],
          path: req.path,
          method: req.method,
        },
      });

      // Attach decision to request for downstream handlers
      (req as any).ssiDecision = decision;

      if (decision.denied) {
        return res.status(403).json({
          error: 'SSI_GOVERNANCE_DENIED',
          message: decision.reason,
          rules_triggered: decision.rulesTriggered,
          rpx_id: decision.rpxId,
        });
      }

      next();
    } catch (error) {
      // If failOpen is true, SSIClient will return ALLOW on errors
      // If failOpen is false, we'll get an error here
      console.error('SSI middleware error:', error);
      
      if (options.failOpen) {
        next();
      } else {
        res.status(503).json({
          error: 'SSI_GATEWAY_UNAVAILABLE',
          message: 'Governance service temporarily unavailable',
        });
      }
    }
  };
}
