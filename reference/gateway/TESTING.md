# Testing the SSI Gateway MVP

## Starting the Server

```bash
cd reference/gateway
npm install
npm run dev
```

The server should start on `http://localhost:4040`.

## Test Cases

### Test 1: ALLOW Decision (Below Limit)

**Request:**
```bash
curl -X POST http://localhost:4040/v1/decisions \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "demo-client",
    "system_id": "demo-system",
    "action": {
      "type": "trade.order.place",
      "payload": {
        "notional": 5000
      }
    }
  }'
```

**Expected Response:**
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
  "rpx_id": "<uuid>"
}
```

### Test 2: DENY Decision (Above Limit)

**Request:**
```bash
curl -X POST http://localhost:4040/v1/decisions \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "demo-client",
    "system_id": "demo-system",
    "action": {
      "type": "trade.order.place",
      "payload": {
        "notional": 20000
      }
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "decision": {
    "decision": "DENY",
    "reason": "Order notional 20000 exceeds max allowed 10000",
    "details": {
      "rules_evaluated": ["RULE-MAX-NOTIONAL-001"],
      "rules_triggered": ["RULE-MAX-NOTIONAL-001"],
      "invariants_violated": []
    }
  },
  "rpx_id": "<uuid>"
}
```

## PowerShell Testing (Windows)

### Test ALLOW:
```powershell
$body = '{"client_id":"demo-client","system_id":"demo-system","action":{"type":"trade.order.place","payload":{"notional":5000}}}'
Invoke-WebRequest -Uri http://localhost:4040/v1/decisions -Method POST -Body $body -ContentType 'application/json' | Select-Object -ExpandProperty Content
```

### Test DENY:
```powershell
$body = '{"client_id":"demo-client","system_id":"demo-system","action":{"type":"trade.order.place","payload":{"notional":20000}}}'
Invoke-WebRequest -Uri http://localhost:4040/v1/decisions -Method POST -Body $body -ContentType 'application/json' | Select-Object -ExpandProperty Content
```

## Verify RPX Trail

After running tests, check the audit log:

```bash
cat rpx-log.jsonl
```

Each line is a complete RPX entry with:
- Request details
- Envelope applied
- Decision + reasoning
- Timestamps and IDs

## Success Criteria

✅ Server starts without errors  
✅ ALLOW decision when notional ≤ 10,000  
✅ DENY decision when notional > 10,000  
✅ RPX entries written to `rpx-log.jsonl`  
✅ Each RPX entry has valid UUID and timestamp  
