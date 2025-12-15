# SSI RPX Engine — Reference Implementation

## Overview

The **RPX Engine** is responsible for receiving, storing, and serving audit trail records in the RPX (Request-Permission-Execution) format.

## Responsibilities

- **Receive RPX entries** from Kernel or Gateway
- **Store entries** in append-only, immutable storage
- **Sign entries** with cryptographic signatures
- **Serve queries** for audit trail retrieval
- **Verify integrity** of stored records

## Non-Responsibilities

- Does NOT evaluate policies (Kernel does that)
- Does NOT route requests (Gateway does that)
- Does NOT generate RPX entries (Kernel does that)

## Tech Stack (MVP)

- **Language:** Python or Go (for simplicity + storage integration)
- **Storage:** JSON files (append-only) or SQLite (MVP), PostgreSQL (production)
- **API:** HTTP REST for queries
- **Signatures:** ECDSA or Ed25519 (cryptographic library)

## RPX Record Schema

```json
{
  "rpx_version": "0.1.0",
  "record_id": "uuid-v4",
  "timestamp": "ISO-8601",
  "agent_id": "trading-bot-001",
  "request": {
    "action": "trade",
    "parameters": {},
    "context": {}
  },
  "permission": {
    "decision": "ALLOW",
    "reasoning": ["step1", "step2"],
    "policy_refs": ["envelope-id-1"]
  },
  "execution": {
    "status": "SUCCESS",
    "result": {}
  },
  "signature": "cryptographic-signature"
}
```

## API Endpoints (MVP)

### `POST /v1/rpx/records`

Store a new RPX record.

**Request:**
```json
{
  "record": { /* RPX entry from Kernel */ }
}
```

**Response:**
```json
{
  "record_id": "rpx-uuid-001",
  "stored_at": "2025-12-11T10:00:00Z"
}
```

### `GET /v1/rpx/records?agent_id=<id>`

Query RPX records by agent.

**Response:**
```json
{
  "records": [
    { "record_id": "rpx-uuid-001", "timestamp": "...", "decision": "ALLOW" }
  ],
  "total": 1
}
```

### `GET /v1/rpx/records/<record_id>`

Retrieve a full RPX record by ID.

## File Structure

```
reference/rpx/
  README.md          # This file
  requirements.txt   # Python deps (or go.mod)
  src/
    main.py          # Flask/FastAPI server (or main.go)
    storage/
      writer.py      # Append-only storage
      reader.py      # Query interface
    crypto/
      signer.py      # Sign RPX entries
      verifier.py    # Verify signatures
    api/
      routes.py      # REST endpoints
  data/
    rpx_records.jsonl  # Append-only log file (MVP)
```

## Running Locally

```bash
cd reference/rpx
pip install -r requirements.txt
python src/main.py
# or: go run src/main.go
# Server starts on http://localhost:8081
```

## Storage Options

### MVP (v0.1.0)
- **JSON Lines file** (`.jsonl`) — one record per line, append-only
- Simple, auditable, no database needed

### Production (v1.0+)
- **PostgreSQL** with append-only table + indexes
- **Blockchain** or distributed ledger for tamper-evidence
- **S3 + Merkle trees** for scalability

## MVP Scope (v0.1.0)

- ✅ Store RPX entries in JSON Lines file
- ✅ Sign entries with ECDSA
- ✅ Query by agent_id
- ✅ Retrieve by record_id
- ✅ Basic integrity check (signature verification)

## Stretch Goals (v0.2+)

- Merkle tree for batch integrity
- Blockchain backend integration
- Advanced queries (time range, decision type, policy refs)
- Real-time streaming of audit events
- Compliance export (CSV, PDF reports)

## Status

**Current:** Scaffolded, not yet implemented  
**Next:** Build MVP storage + signature logic
