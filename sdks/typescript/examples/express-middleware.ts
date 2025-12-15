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
 * Express middleware example
 */

import express from 'express';
import { ssiMiddleware } from '../src/middleware';

const app = express();
app.use(express.json());

// Add SSI governance middleware
app.use(
  ssiMiddleware({
    systemId: 'trading-prod',
    gatewayUrl: 'http://localhost:4040',
    // Optional: customize how action types are extracted
    actionTypeExtractor: (req) => {
      // Map routes to action types
      if (req.path === '/api/trade') return 'trade.order.place';
      return `${req.method.toLowerCase()}.${req.path}`;
    },
  })
);

// Routes are automatically governed by SSI
app.post('/api/trade', async (req, res) => {
  // This handler only executes if SSI allows the action
  console.log('✅ Trade request approved by SSI');
  
  // Access the decision if needed
  const decision = (req as any).ssiDecision;
  console.log('RPX ID:', decision.rpxId);
  
  // Execute the trade
  const result = {
    order_id: 'ORD123',
    status: 'filled',
    symbol: req.body.symbol,
    notional: req.body.notional,
  };
  
  res.json(result);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Trading API running on http://localhost:${PORT}`);
  console.log('   All routes are governed by SSI Protocol');
  console.log('\nTest with:');
  console.log(`  curl -X POST http://localhost:${PORT}/api/trade \\`);
  console.log(`    -H "Content-Type: application/json" \\`);
  console.log(`    -d '{"symbol":"BTCUSD","notional":3000,"open_positions_count":1}'`);
});
