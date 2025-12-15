# SSI API Reference

## Overview

The SSI API provides programmatic access to:

- **Agent Registration:** Register AI agents with the SSI system
- **Permission Requests:** Request policy evaluation for actions
- **Envelope Management:** Upload, update, and query governance envelopes
- **Audit Trails:** Query and replay RPX records

## Base URL

```
Production: https://api.ssi-protocol.org/v1
Development: http://localhost:8080/v1
```

## Authentication

All API requests require authentication via API key:

```http
Authorization: Bearer YOUR_API_KEY
```

---

## Endpoints

### 1. Agent Registration

#### POST `/agents`

Register a new agent with SSI.

**Request:**
```json
{
  "agent_id": "trading-bot-001",
  "name": "High-Frequency Trading Bot",
  "description": "Autonomous trading agent for equities",
  "owner": "organization-id",
  "envelope_ids": ["envelope-uuid-1", "envelope-uuid-2"]
}
```

**Response:**
```json
{
  "agent_id": "trading-bot-001",
  "created_at": "2025-12-11T10:00:00Z",
  "status": "active"
}
```

---

### 2. Permission Requests

#### POST `/permissions/request`

Request permission for an action.

**Request:**
```json
{
  "agent_id": "trading-bot-001",
  "action": "trade",
  "parameters": {
    "symbol": "AAPL",
    "quantity": 100,
    "side": "BUY",
    "price": 150.00
  },
  "context": {
    "portfolio_value": 1000000,
    "current_positions": {}
  }
}
```

**Response:**
```json
{
  "decision": "ALLOW",
  "reasoning": [
    "Checked MAX-POSITION constraint: 100 <= 500 ✓",
    "Checked PORTFOLIO-LIMIT: total_exposure < max ✓"
  ],
  "rpx_record_id": "rpx-uuid-001",
  "constraints": {},
  "timestamp": "2025-12-11T10:01:00Z"
}
```

**Decision Types:**
- `ALLOW`: Action permitted
- `DENY`: Action forbidden
- `MODIFY`: Action permitted with changes (see `constraints`)
- `ADVISORY`: Proceed with caution (warning attached)

---

### 3. Envelope Management

#### POST `/envelopes`

Upload a new governance envelope.

**Request:**
```yaml
# Content-Type: application/x-yaml

envelope_id: "trading-limits-v1"
version: "1.0.0"
applies_to:
  agents: ["trading-bot-001"]
policies:
  constitutional:
    - rule_id: "MAX-POSITION"
      condition: "quantity <= 500"
      violation_action: "DENY"
```

**Response:**
```json
{
  "envelope_id": "trading-limits-v1",
  "version": "1.0.0",
  "status": "active",
  "uploaded_at": "2025-12-11T10:00:00Z"
}
```

#### GET `/envelopes/{envelope_id}`

Retrieve an envelope by ID.

#### GET `/envelopes?agent_id={agent_id}`

List all envelopes applicable to an agent.

---

### 4. RPX Audit Trail

#### GET `/rpx/records?agent_id={agent_id}&limit=100`

Query RPX records.

**Query Parameters:**
- `agent_id`: Filter by agent
- `start_time`: ISO-8601 timestamp
- `end_time`: ISO-8601 timestamp
- `decision`: Filter by decision type (ALLOW, DENY, etc.)
- `limit`: Max records to return (default: 100)

**Response:**
```json
{
  "records": [
    {
      "rpx_record_id": "rpx-uuid-001",
      "agent_id": "trading-bot-001",
      "timestamp": "2025-12-11T10:01:00Z",
      "decision": "ALLOW",
      "action": "trade"
    }
  ],
  "total": 1,
  "has_more": false
}
```

#### GET `/rpx/records/{record_id}`

Retrieve full RPX record with reasoning and execution details.

---

### 5. Trade Outcome Logging

#### POST `/trade/outcomes/log`

Log completed trade outcomes for post-execution governance audit and compliance.

**Use Case:** Trading systems send closed trades to SSI Gateway for:
- Risk governance (max loss limits, drawdown monitoring)
- Regulatory compliance (MiFID II, SEC transaction reporting)
- Anomaly detection (strategy drift, unusual win rates)
- Immutable audit trail (RPX records for all trades)

**Request:**
```json
{
  "trade_id": "TRADE_20251211_001",
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
  "exit_time": "2025-12-11T10:30:00Z",
  "exit_reason": "TP_HIT",
  "pnl_percent": 1.15
}
```

**Optional Fields (Gateway will calculate if not provided):**
- `exit_reason` — Gateway determines from price levels (TP hit, SL hit, manual, timeout)
- `pnl_percent` — Gateway calculates as `(net_pnl / cost_basis) * 100`

**Response (Success):**
```json
{
  "success": true,
  "message": "Trade outcome logged successfully",
  "rpx_id": "e39572cf-c843-4504-b5e5-5b5241deb461",
  "stored_location": "kernel"
}
```

**Response (Fallback to Local Storage):**
```json
{
  "success": true,
  "message": "Trade outcome logged successfully",
  "rpx_id": "e39572cf-c843-4504-b5e5-5b5241deb461",
  "stored_location": "local_vault",
  "note": "Kernel unavailable - trade saved locally for later processing"
}
```

**Resilient Behavior:**
1. Gateway attempts to forward trade to Kernel service
2. If Kernel is unavailable, saves to local vault (`gateway_vaults/pending_trades/`)
3. Always generates RPX audit ID (no trades lost)

**Integration Example (Python):**
```python
import requests

def log_trade_to_ssi(trade):
    """Send closed trade to SSI Gateway for governance audit"""
    response = requests.post(
        "http://localhost:4040/trade/outcomes/log",
        json={
            "trade_id": trade.id,
            "symbol": trade.symbol,
            "direction": "LONG" if trade.is_long else "SHORT",
            "entry_price": trade.entry_price,
            "exit_price": trade.exit_price,
            "quantity": trade.quantity,
            "cost_basis": trade.cost_basis,
            "gross_pnl": trade.gross_pnl,
            "fees": trade.total_fees,
            "net_pnl": trade.net_pnl,
            "entry_time": trade.entry_time.isoformat(),
            "exit_time": trade.exit_time.isoformat(),
            # Optional - let Gateway calculate:
            # "exit_reason": "TRAILING_STOP",
            # "pnl_percent": 1.15,
        },
        headers={"Content-Type": "application/json"}
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"✓ Trade logged: RPX {result['rpx_id']}")
        return result["rpx_id"]
    else:
        raise Exception(f"SSI logging failed: {response.text}")
```

**Error Responses:**

| Code | Meaning |
|------|---------|
| 400 | Bad Request — Missing required fields or invalid format |
| 500 | Internal Server Error — Gateway processing failed |

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request — Invalid parameters |
| 401 | Unauthorized — Invalid API key |
| 403 | Forbidden — Insufficient permissions |
| 404 | Not Found — Resource doesn't exist |
| 429 | Too Many Requests — Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limits

- **Free tier:** 100 requests/minute
- **Standard tier:** 1,000 requests/minute
- **Enterprise tier:** Custom limits

---

## SDKs

Official SDKs available for:
- **Node.js:** `npm install @ssi-protocol/sdk`
- **Python:** `pip install ssi-protocol-sdk`
- **.NET:** `dotnet add package SSI.Protocol.SDK`
- **Go:** `go get github.com/ssi-protocol/go-sdk`

See language-specific docs for detailed usage.
