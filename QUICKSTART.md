# SSI Kernel v0.2.0 — Quick Start

## First Time Setup

```bash
# Install Kernel dependencies
cd reference/kernel
npm install

# Install Gateway dependencies (if not already done)
cd ../gateway
npm install

# Build both services
cd ../kernel
npm run build

cd ../gateway
npm run build
```

## Running the Stack

### Option 1: Manual (3 terminals)

**Terminal 1 — Kernel:**
```bash
cd reference/kernel
npm start
```

**Terminal 2 — Gateway:**
```bash
cd reference/gateway
KERNEL_URL=http://localhost:5050/v1/evaluate node dist/server.js
```

**Terminal 3 — ASWF Trader:**
```bash
cd aswf_auto_trader/paper_trading
python live_trader.py
```

### Option 2: PowerShell Script (Windows)

See `scripts/start-all.ps1` (coming soon)

### Option 3: Docker Compose

See `docker-compose.yml` (coming soon)

---

## Verifying the Stack

### 1. Check Kernel Health
```bash
curl http://localhost:5050/health
```

Expected: `{"status":"ok","service":"ssi-kernel-ref","version":"0.2.0"}`

### 2. Check Gateway Health
```bash
curl http://localhost:4040/v1/decisions -X POST -H "Content-Type: application/json" -d '{
  "client_id": "test",
  "system_id": "trading-prod",
  "action": {
    "type": "trade.order.place",
    "payload": { "notional": 5000, "open_positions_count": 1 }
  }
}'
```

Expected: `{"success":true,"decision":{"decision":"ALLOW",...}}`

### 3. Watch Logs

All three terminals should show coordinated activity:
- Kernel: `[kernel] evaluating request...`
- Gateway: `[gateway] calling kernel...`
- ASWF: `[SSI] Decision: ALLOW`

---

## Troubleshooting

### Kernel won't start
- Check port 5050 isn't in use: `netstat -ano | findstr :5050`
- Verify `npm install` completed successfully
- Check `reference/kernel/envelopes/` directory exists

### Gateway can't reach Kernel
- Ensure Kernel started first and shows "listening on :5050"
- Verify `KERNEL_URL` environment variable
- Check firewall isn't blocking localhost connections

### ASWF can't reach Gateway
- Ensure Gateway started and shows "listening on :4040"
- Check ASWF config points to correct Gateway URL
- Verify Gateway logs show incoming requests

---

**You now have a real multi-service SSI Protocol stack!** 🎉
