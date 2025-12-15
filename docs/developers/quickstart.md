# SSI Developer Quickstart

This guide walks you through:

1. Understanding SSI concepts
2. Setting up a development environment
3. Running a simple SSI-governed AI agent
4. Inspecting the RPX audit trail

## 1. Prerequisites

- Node.js 18+ or Python 3.10+
- Git
- Basic understanding of AI agents and APIs

## 2. Core Concepts

Before diving in, understand these key SSI components:

- **SSI Gateway:** Entry point for AI requests
- **SSI Kernel:** Policy evaluation engine
- **Governance Envelope:** Policy container for your AI
- **RPX Trail:** Audit log of all decisions

## 3. Installation

### Option A: Node.js SDK

```bash
npm install @ssi-protocol/sdk
```

### Option B: Python SDK

```bash
pip install ssi-protocol-sdk
```

## 4. Hello SSI — Your First Governed Agent

### Step 1: Create a Simple Agent

```typescript
// agent.ts
import { SSIAgent } from '@ssi-protocol/sdk';

const agent = new SSIAgent({
  agentId: 'my-first-agent',
  gatewayUrl: 'http://localhost:8080',
  apiKey: process.env.SSI_API_KEY
});

async function makeDecision() {
  const request = {
    action: 'trade',
    parameters: {
      symbol: 'AAPL',
      quantity: 100,
      side: 'BUY'
    }
  };
  
  const decision = await agent.requestPermission(request);
  
  if (decision.allowed) {
    console.log('Trade approved:', decision.reasoning);
    // Execute trade
  } else {
    console.log('Trade denied:', decision.reasoning);
  }
}

makeDecision();
```

### Step 2: Define a Governance Envelope

```yaml
# policy.yaml
envelope_id: "my-first-envelope"
version: "0.1.0"
applies_to:
  agents: ["my-first-agent"]
  
policies:
  constitutional:
    - rule_id: "MAX-POSITION"
      description: "Never exceed 500 shares per trade"
      condition: "quantity <= 500"
      violation_action: "DENY"
```

### Step 3: Run the SSI Reference Gateway

The SSI Gateway reference implementation is included in this repo under `reference/gateway`.

```bash
cd reference/gateway
npm install
npm run build
node dist/server.js
```

The Gateway will start on `http://localhost:4040`.

### Step 4: Send Your First SSI Request

In a second terminal, test the Gateway with a governed decision:

```bash
# ALLOW scenario - order under 10k limit
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

Expected response:
```json
{
  "success": true,
  "decision": {
    "decision": "ALLOW",
    "reason": "Within policy limits.",
    "details": {
      "rules_evaluated": ["RULE-MAX-NOTIONAL-001"],
      "rules_triggered": [],
      "invariants_violated": []
    }
  },
  "rpx_id": "..."
}
```

Now try a DENY scenario:

```bash
# DENY scenario - order exceeds 10k limit
curl -X POST http://localhost:4040/v1/decisions \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "demo-client",
    "system_id": "trading-prod",
    "action": {
      "type": "trade.order.place",
      "payload": { "notional": 15000 }
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "decision": {
    "decision": "DENY",
    "reason": "Order notional 15000 exceeds max allowed 10000",
    "details": {
      "rules_evaluated": ["RULE-MAX-NOTIONAL-001"],
      "rules_triggered": ["RULE-MAX-NOTIONAL-001"],
      "invariants_violated": []
    }
  },
  "rpx_id": "..."
}
```

### Step 5: Inspect the RPX Audit Trail

All decisions are logged to `reference/gateway/rpx-log.jsonl` in RPX format:

```bash
# View the audit trail (human-readable)
cd reference/gateway
npm run view:rpx

# Or view raw JSON
cat rpx-log.jsonl | jq
```

Each entry contains:
- Complete request details (client, system, action, payload)
- Governance envelope used (rules, version, scope)
- Kernel decision (ALLOW/DENY, reasoning, rules evaluated)
- Cryptographic-style audit metadata (RPX ID, timestamp)

### Step 6: Log Trade Outcomes (Post-Execution)

After trades execute, log them to SSI for post-execution governance and audit:

```bash
curl -X POST http://localhost:4040/trade/outcomes/log \
  -H "Content-Type: application/json" \
  -d '{
    "trade_id": "TRADE_001",
    "symbol": "BTCUSD",
    "direction": "LONG",
    "entry_price": 42000.0,
    "exit_price": 42500.0,
    "quantity": 0.1,
    "cost_basis": 4200.0,
    "gross_pnl": 50.0,
    "fees": 1.5,
    "net_pnl": 48.5,
    "entry_time": "2025-12-11T10:00:00Z",
    "exit_time": "2025-12-11T10:30:00Z"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Trade outcome logged successfully",
  "rpx_id": "e39572cf-c843-4504-b5e5-5b5241deb461",
  "stored_location": "kernel"
}
```

The Gateway will:
- Calculate missing fields (`exit_reason`, `pnl_percent`) if not provided
- Forward to Kernel or save locally (resilient fallback)
- Generate RPX audit entry for compliance

**Use case:** Trading systems send all closed trades to SSI for:
- Risk governance (max loss limits, drawdown monitoring)
- Regulatory compliance (MiFID II, SEC reporting)
- Anomaly detection (unusual win rates, strategy drift)

## 5. What's Happening?

When you POST to `/v1/decisions`:

1. **Gateway receives** your SSI request with action details
2. **Envelope loaded** — governance rules for your system/action type
3. **Kernel evaluates** — applies policy logic (e.g., max notional check)
4. **Decision returned** — ALLOW/DENY with reasoning and rule details
5. **RPX entry written** — immutable audit trail with full context
6. **Your system acts** — proceed with action or halt based on decision

This is the **complete SSI flow** in action:

```
Client Request → Gateway → Envelope → Kernel → Decision → RPX Trail
```

## 6. What You Just Built

✅ **Real SSI Gateway** — Running reference implementation (v0.1.0)  
✅ **Governance Enforcement** — Max notional rule applied automatically  
✅ **Audit Trail** — Every decision logged in RPX format  
✅ **Production-Ready Pattern** — Request → Envelope → Kernel → RPX

## 6. Next Steps

- **Advanced Policies:** Learn about escalation, MODIFY decisions, and multi-envelope scenarios
- **Production Deployment:** Deploy SSI Gateway and Kernel to your infrastructure
- **Custom Integrations:** Build adapters for your AI framework
- **Monitoring:** Set up dashboards for policy compliance and decision metrics

## 7. Resources

- **API Reference:** `/docs/developers/api.md`
- **Tutorials:** `/docs/developers/tutorials.md`
- **Example Envelopes:** `github.com/ssi-protocol/examples`
- **Community:** Discord, GitHub Discussions

## 8. Troubleshooting

**"Connection refused"**  
→ Make sure SSI Gateway is running on port 8080

**"Envelope not found"**  
→ Upload your envelope with `ssi-cli envelope upload`

**"Invalid API key"**  
→ Check your `.env` file has correct `SSI_API_KEY`
