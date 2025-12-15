# SSI Kernel — Reference Implementation v0.2.0

## Overview

The **SSI Kernel** is the **external policy evaluation service** that evaluates AI requests against governance envelopes and returns structured decisions (ALLOW, DENY).

**Key architectural shift in v0.2.0:**
- Gateway is now a **thin router**
- Kernel is a **separate HTTP service**
- Envelopes are **data-backed JSON artifacts**, not hardcoded logic
- Real network boundary proves protocol separation

## Responsibilities

- **Load governance envelopes** from JSON files in `envelopes/`
- **Evaluate requests** against envelope policies (pure, stateless)
- **Compute decisions** with full reasoning traces
- **Return structured decisions** to Gateway via HTTP
- Gateway handles RPX writing (Kernel stays pure)

## Non-Responsibilities

- Does NOT receive client traffic directly (Gateway routes)
- Does NOT store RPX records (Gateway's RPX client does that)
- Does NOT manage agent registration or authentication

## Tech Stack (v0.2.0)

- **Language:** TypeScript/Node.js
- **API:** HTTP REST (`POST /v1/evaluate`)
- **Config:** JSON envelopes loaded from `envelopes/` at startup
- **State:** Stateless (pure evaluation function)
- **Port:** Default 5050 (configurable via `KERNEL_PORT`)

## Decision Types (v0.2.0)

| Decision | Meaning | Status |
|----------|---------|--------|
| **ALLOW** | Action permitted as-is | ✅ Implemented |
| **DENY** | Action forbidden | ✅ Implemented |
| **MODIFY** | Action permitted with constraints | 🔜 Future |
| **ADVISORY** | Proceed with caution (warning) | 🔜 Future |

*v0.2.0 implements ALLOW/DENY for trading safety use case*

## Evaluation Flow (v0.2.0)

```
1. Gateway calls POST /v1/evaluate with { request, envelope }
2. Kernel extracts action type and payload
3. For each rule in envelope:
   - Check if rule applies to action type
   - Evaluate constraint (e.g., notional <= max_notional)
   - Track which rules were evaluated vs. triggered
4. Aggregate violations
5. Return DENY if any violations, otherwise ALLOW
6. Include full reasoning trace in decision.details
```

**Key insight:** Kernel is a **pure function** — same inputs = same outputs, no side effects.

## API Specification

### `POST /v1/evaluate`

**Request:**
```json
{
  "request": {
    "request_id": "req-123",
    "client_id": "aswf-trader",
    "system_id": "trading-prod",
    "timestamp": "2025-12-11T10:30:00Z",
    "action": {
      "type": "trade.order.place",
      "payload": {
        "notional": 8000,
        "open_positions_count": 2
      }
    }
  },
  "envelope": {
    "envelope_id": "trading-safety-v0-2-0",
    "version": "0.2.0",
    "scope": {
      "system_id": "trading-prod",
      "action_type": "trade.order.place"
    },
    "rules": [
      {
        "id": "RULE-MAX-NOTIONAL-001",
        "description": "DENY orders with notional > 10_000",
        "max_notional": 10000
      }
    ]
  }
}
```

**Response (ALLOW):**
```json
{
  "success": true,
  "decision": {
    "request_id": "req-123",
    "decision_id": "dec-456",
    "decision": "ALLOW",
    "reason": "Within policy limits.",
    "timestamp": "2025-12-11T10:30:01Z",
    "details": {
      "rules_evaluated": ["RULE-MAX-NOTIONAL-001"],
      "rules_triggered": [],
      "invariants_violated": []
    }
  }
}
```

**Response (DENY):**
```json
{
  "success": true,
  "decision": {
    "request_id": "req-123",
    "decision_id": "dec-789",
    "decision": "DENY",
    "reason": "Order notional 15000 exceeds max allowed 10000",
    "timestamp": "2025-12-11T10:30:01Z",
    "details": {
      "rules_evaluated": ["RULE-MAX-NOTIONAL-001"],
      "rules_triggered": ["RULE-MAX-NOTIONAL-001"],
      "invariants_violated": []
    }
  }
}
```

### `GET /health`

**Response:**
```json
{
  "status": "ok",
  "service": "ssi-kernel-ref",
  "version": "0.2.0"
}
```

## File Structure (v0.2.0)

```
reference/kernel/
  package.json                          # Node/TypeScript dependencies
  tsconfig.json                         # TypeScript config
  README.md                             # This file
  
  src/
    server.ts                           # HTTP server (Express)
    evaluator.ts                        # Pure policy evaluation logic
    types.ts                            # Shared type definitions
    envelopes-store.ts                  # Envelope loader from JSON
  
  envelopes/
    trading-safety.v0.2.0.json          # Trading safety envelope
    # Add more domain envelopes here
  
  dist/                                 # Compiled JavaScript (gitignored)
```

## Running the Kernel Service

### 1. Install Dependencies

```bash
cd reference/kernel
npm install
```

### 2. Build

```bash
npm run build
```

### 3. Start the Kernel

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

**Output:**
```
[kernel] loaded envelope: trading-safety-v0-2-0 (trading-safety.v0.2.0.json)
[kernel] loaded 1 envelope(s)
[kernel] ssi-kernel-ref v0.2.0 listening on http://localhost:5050
[kernel] evaluate endpoint: POST http://localhost:5050/v1/evaluate
```

### 4. Test the Kernel Independently

```bash
curl -X POST http://localhost:5050/v1/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "request": {
      "request_id": "test-1",
      "client_id": "test-client",
      "system_id": "trading-prod",
      "timestamp": "2025-12-11T10:00:00Z",
      "action": {
        "type": "trade.order.place",
        "payload": { "notional": 5000, "open_positions_count": 1 }
      }
    },
    "envelope": {
      "envelope_id": "trading-safety-v0-2-0",
      "version": "0.2.0",
      "scope": { "system_id": "trading-prod", "action_type": "trade.order.place" },
      "rules": [
        { "id": "RULE-MAX-NOTIONAL-001", "description": "Max 10k", "max_notional": 10000 }
      ]
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "decision": {
    "request_id": "test-1",
    "decision_id": "dec-abc123",
    "decision": "ALLOW",
    "reason": "Within policy limits.",
    ...
  }
}
```

## Running the Full Stack (Gateway + Kernel + ASWF)

To run the complete SSI Protocol with external Kernel service:

### Terminal 1: Start Kernel

```bash
cd reference/kernel
npm install
npm run build
npm start
```

**Wait for:** `[kernel] ssi-kernel-ref v0.2.0 listening on http://localhost:5050`

### Terminal 2: Start Gateway

```bash
cd reference/gateway
npm run build
KERNEL_URL=http://localhost:5050/v1/evaluate node dist/server.js
```

**Wait for:** `ssi-gateway-ref listening on http://localhost:4040`

### Terminal 3: Start ASWF Trading System

```bash
cd aswf_auto_trader/paper_trading
python live_trader.py
```

**What happens:**
1. ASWF generates trading signals
2. Calls Gateway at `http://localhost:4040/v1/decisions`
3. Gateway forwards to Kernel at `http://localhost:5050/v1/evaluate`
4. Kernel evaluates against `trading-safety.v0.2.0.json`
5. Returns ALLOW/DENY decision
6. Gateway writes RPX audit entry
7. ASWF executes or blocks trade based on decision

### Observing the Flow

Watch all three terminals to see the full protocol in action:

**Kernel logs:**
```
[kernel] evaluating request req-123 against envelope trading-safety-v0-2-0
[kernel] decision: ALLOW (Within policy limits.)
```

**Gateway logs:**
```
[gateway] calling kernel at http://localhost:5050/v1/evaluate
[gateway] kernel returned: ALLOW
Kernel Decision: { "decision": "ALLOW", "reason": "Within policy limits." }
RPX Entry written: rpx-abc-def-123
```

**ASWF logs:**
```
[SSI] Decision: ALLOW | Reason: Within policy limits.
[TRADE] Executing order: BUY 10 shares at $150.00
```

## Architecture Diagram (v0.2.0)

```
┌─────────────────┐
│  ASWF Trader    │
│  (Python)       │
└────────┬────────┘
         │ HTTP POST /v1/decisions
         ▼
┌─────────────────┐
│  SSI Gateway    │ ← Thin router
│  (Node/TS)      │ ← Loads envelopes
│  :4040          │ ← Writes RPX
└────────┬────────┘
         │ HTTP POST /v1/evaluate
         ▼
┌─────────────────┐
│  SSI Kernel     │ ← Pure evaluator
│  (Node/TS)      │ ← Loads envelopes/*.json
│  :5050          │ ← Stateless
└─────────────────┘
```

**Key separation of concerns:**
- **Gateway**: Routing, envelope loading, RPX audit writing
- **Kernel**: Pure policy evaluation (no I/O, no state)
- **Envelopes**: JSON artifacts (versionable, signable)

---

## Status & Roadmap

### ✅ v0.2.0 — Implemented

- External HTTP service architecture
- Pure evaluation function (`evaluator.ts`)
- Data-backed envelopes (JSON, not code)
- Trading safety rules (max notional, max positions)
- Real network boundary (Gateway → Kernel)
- Multi-service startup proven
- ASWF integration working end-to-end

### 🔜 v0.3.0 — Planned

- Envelope versioning and signature verification
- Dynamic envelope reloading (watch file changes)
- Additional rule types (rate limiting, risk scoring)
- Kernel metrics and observability
- gRPC option for higher performance

### 🔮 Future

- Policy DSL for custom rule definition
- Multi-envelope composition
- Formal verification of policy logic
- Escalation queue for human-in-the-loop
- Distributed Kernel for high availability

---

## Development Notes

### Adding New Rules

1. Update `GovernanceRule` type in `src/types.ts`
2. Add rule evaluation logic in `src/evaluator.ts`
3. Create envelope JSON in `envelopes/` directory
4. Test with curl or via Gateway integration

### Adding New Domains

1. Create new envelope JSON (e.g., `healthcare-safety.v0.2.0.json`)
2. Define domain-specific rules
3. No code changes needed — envelopes are data

### Type Safety

Types are shared between Gateway and Kernel. Keep them in sync:
- Gateway: `reference/gateway/src/types.ts`
- Kernel: `reference/kernel/src/types.ts`

Future: Extract to `@ssi/types` shared package.

---

**SSI Kernel v0.2.0** — Real protocol, real separation, real governance. 🚀
