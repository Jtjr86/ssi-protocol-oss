# SSI Gateway — Reference Implementation

## Overview

The **SSI Gateway** is the HTTP entry point for all SSI requests. It receives actions from AI agents, normalizes them into SSI internal format, routes them to the Kernel for evaluation, and returns decisions.

## Responsibilities

- **Accept HTTP requests** from AI agents (REST API)
- **Normalize requests** to SSI internal schema
- **Route to Kernel** for policy evaluation
- **Return decisions** (ALLOW, DENY, MODIFY, ADVISORY)
- **Forward RPX entries** to RPX engine for audit logging

## Non-Responsibilities

- Does NOT evaluate policies (that's Kernel's job)
- Does NOT store RPX records (that's RPX engine's job)
- Does NOT manage envelopes (Kernel loads those)

## Tech Stack (MVP)

- **Language:** Node.js / TypeScript
- **Framework:** Express or Fastify
- **API:** REST (JSON)
- **Auth:** API key validation (simple for MVP)

## API Endpoints (MVP)

### `POST /v1/permissions/request`

Request permission for an AI action.

**Request:**
```json
{
  "agent_id": "trading-bot-001",
  "action": "trade",
  "parameters": {
    "symbol": "AAPL",
    "quantity": 100,
    "side": "BUY"
  },
  "context": {
    "portfolio_value": 1000000
  }
}
```

**Response:**
```json
{
  "decision": "ALLOW",
  "reasoning": ["Checked MAX-POSITION: 100 <= 500 ✓"],
  "rpx_record_id": "rpx-uuid-001",
  "timestamp": "2025-12-11T10:00:00Z"
}
```

## Data Flow

```
AI Agent → Gateway (normalize) → Kernel (evaluate) → Gateway (return decision)
                                      ↓
                                 RPX Engine (log)
```

## File Structure

```
reference/gateway/
  README.md          # This file
  package.json       # Dependencies
  src/
    index.ts         # Express server
    routes/
      permissions.ts # /v1/permissions/* endpoints
    services/
      kernel-client.ts    # Calls kernel
      rpx-client.ts       # Sends RPX logs
    middleware/
      auth.ts        # API key validation
    types/
      requests.ts    # TypeScript types
```

## Running Locally

```bash
cd reference/gateway

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the Gateway
node dist/server.js
# Server starts on http://localhost:4040
```

## Testing

```bash
# Run the test script (sends ALLOW and DENY scenarios)
.\test-gateway.ps1

# Or manually test with curl:
curl -X POST http://localhost:4040/v1/decisions \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "demo-client",
    "system_id": "trading-prod",
    "action": {
      "type": "trade.order.place",
      "payload": { "notional": 5000 }
    }
  }'
```

## Viewing the RPX Audit Trail

The Gateway logs all decisions to `rpx-log.jsonl`. You can:

```bash
# View raw JSONL
cat rpx-log.jsonl

# Use the built-in viewer for human-readable output
npm run view:rpx
```

Example output:
```
────────────────────────────────────────
RPX ID:      e39572cf-c843-4504-b5e5-5b5241deb461
Created:     2025-12-11T18:36:52.404Z
Client:      betsy-test
System:      trading-prod
Action:      trade.order.place
Decision:    DENY
Reason:      Order notional 15000 exceeds max allowed 10000
Rules Eval:  RULE-MAX-NOTIONAL-001
Rules Hit:   RULE-MAX-NOTIONAL-001
```

## MVP Scope (v0.1.0) ✅ COMPLETE

- ✅ Single endpoint: `POST /v1/decisions`
- ✅ Governance envelope loading (hardcoded max notional rule)
- ✅ Kernel evaluation (embedded, returns ALLOW/DENY)
- ✅ RPX audit trail (JSONL format)
- ✅ Full request/response flow with error handling
- ✅ Test scripts for validation
- ✅ RPX viewer tool for audit inspection

## Stretch Goals (v0.2+)

- Multiple API protocols (gRPC, GraphQL)
- Load balancing across multiple kernels
- Rate limiting
- OpenTelemetry instrumentation

## Status

**Current:** Scaffolded, not yet implemented  
**Next:** Build MVP Express server + single endpoint
