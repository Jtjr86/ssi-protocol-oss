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
 * Basic usage example of SSI Protocol TypeScript SDK
 */

import { SSIClient } from '../src/client';

async function main() {
  // Initialize client
  const client = new SSIClient({
    gatewayUrl: 'http://localhost:4040',
  });

  // Check if Gateway is available
  const isHealthy = await client.healthCheck();
  if (!isHealthy) {
    console.log('⚠️  SSI Gateway not available - start services first:');
    console.log('   docker run -p 4040:4040 ssiprotocol/gateway:v0.3.0');
    console.log('   docker run -p 5050:5050 ssiprotocol/kernel:v0.3.0');
    process.exit(1);
  }

  console.log('✅ SSI Gateway is available\n');

  // Example 1: ALLOW scenario (under 5k limit in v0.2.1)
  console.log('Example 1: Testing 3000 notional (should ALLOW)');
  const decision1 = await client.evaluate({
    clientId: 'demo-typescript-sdk',
    systemId: 'trading-prod',
    action: {
      type: 'trade.order.place',
      payload: { notional: 3000, open_positions_count: 1 },
    },
  });

  console.log(`Decision: ${decision1.decision}`);
  console.log(`Reason: ${decision1.reason}`);
  console.log(`Rules Evaluated: ${decision1.rulesEvaluated.join(', ')}`);
  console.log(`RPX ID: ${decision1.rpxId}`);

  if (decision1.allowed) {
    console.log('✅ Action ALLOWED - would execute trade here\n');
  } else {
    console.log(`❌ Action DENIED: ${decision1.reason}\n`);
  }

  // Example 2: DENY scenario (exceeds 5k limit in v0.2.1)
  console.log('Example 2: Testing 7000 notional (should DENY)');
  const decision2 = await client.evaluate({
    clientId: 'demo-typescript-sdk',
    systemId: 'trading-prod',
    action: {
      type: 'trade.order.place',
      payload: { notional: 7000, open_positions_count: 1 },
    },
  });

  console.log(`Decision: ${decision2.decision}`);
  console.log(`Reason: ${decision2.reason}`);
  console.log(`Rules Triggered: ${decision2.rulesTriggered.join(', ')}`);

  if (decision2.denied) {
    console.log('❌ Action DENIED - trade blocked by governance\n');
  }

  console.log('='.repeat(60));
  console.log('✅ SSI Protocol integration working!');
  console.log('='.repeat(60));
}

main().catch(console.error);
