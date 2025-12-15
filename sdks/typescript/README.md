# SSI Protocol - TypeScript/JavaScript SDK

[![npm version](https://badge.fury.io/js/%40ssi-protocol%2Fclient.svg)](https://www.npmjs.com/package/@ssi-protocol/client)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Reference TypeScript/JavaScript SDK for the [SSI Protocol](https://ssi-protocol.org) - Constitutional AI Governance.

## Installation

```bash
npm install @ssi-protocol/client
# or
yarn add @ssi-protocol/client
```

## Quick Start

### 1. Start SSI Services

```bash
# Using Docker
docker run -d -p 5050:5050 ssiprotocol/kernel:v0.3.0
docker run -d -p 4040:4040 ssiprotocol/gateway:v0.3.0
```

### 2. Basic Usage (TypeScript/JavaScript)

```typescript
import { SSIClient } from '@ssi-protocol/client';

// Initialize client
const client = new SSIClient({
  gatewayUrl: 'http://localhost:4040'
});

// Evaluate governance
const decision = await client.evaluate({
  clientId: 'my-trading-bot',
  systemId: 'trading-prod',
  action: {
    type: 'trade.order.place',
    payload: { notional: 5000, open_positions_count: 1 }
  }
});

if (decision.allowed) {
  console.log('✅ ALLOW:', decision.reason);
  // Execute the action
} else {
  console.log('❌ DENY:', decision.reason);
  // Block the action
}
```

### 3. Express.js Middleware

```typescript
import express from 'express';
import { ssiMiddleware } from '@ssi-protocol/client/middleware';

const app = express();

// Add SSI governance middleware
app.use(ssiMiddleware({
  systemId: 'trading-prod',
  gatewayUrl: 'http://localhost:4040'
}));

// Routes are automatically governed
app.post('/api/trade', async (req, res) => {
  // If SSI denies, this handler won't execute
  const result = await executeTrade(req.body);
  res.json(result);
});
```

## Features

- ✅ **TypeScript First** - Full type definitions included
- ✅ **Async/Await** - Modern promise-based API
- ✅ **Express Middleware** - Drop-in governance for web apps
- ✅ **Error Handling** - Graceful degradation options
- ✅ **Zero Dependencies** - Uses native `fetch` (Node 18+)
- ✅ **Audit Trail** - Automatic RPX logging

## API Reference

### `SSIClient`

```typescript
interface SSIClientOptions {
  gatewayUrl?: string;      // Default: http://localhost:4040
  timeout?: number;         // Default: 5000ms
  failOpen?: boolean;       // Default: false
}

class SSIClient {
  constructor(options?: SSIClientOptions);
  
  async evaluate(request: SSIRequest): Promise<SSIDecision>;
  async healthCheck(): Promise<boolean>;
}
```

### `SSIDecision`

```typescript
interface SSIDecision {
  decision: 'ALLOW' | 'DENY';
  reason: string;
  rulesEvaluated: string[];
  rulesTriggered: string[];
  rpxId?: string;
  allowed: boolean;  // Convenience property
  denied: boolean;   // Convenience property
}
```

## Examples

See [`examples/`](examples/) directory for:
- Basic client usage
- Express middleware integration
- Error handling patterns
- Custom governance policies

## Documentation

Full documentation at [ssi-protocol.org/developers](https://ssi-protocol.org/developers)

## License

Apache 2.0 - See [LICENSE](../../LICENSE)
