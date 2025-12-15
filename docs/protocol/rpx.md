# RPX — Request-Permission-Execution Format

## 1. Overview

**RPX (Request-Permission-Execution)** is the audit trail format used by SSI to create replayable, tamper-evident records of AI decisions.

Every high-impact action in an SSI-governed system generates an RPX record containing:

- The **request** (what the AI wanted to do)
- The **permission decision** (what the kernel allowed/denied)
- The **execution result** (what actually happened)
- The **reasoning trace** (why the decision was made)

## 2. Design Goals

- **Replayability** — Reconstruct exactly what happened and why
- **Tamper-Evidence** — Detect any modifications to the audit trail
- **Completeness** — Capture all context needed for oversight
- **Efficiency** — Minimal storage and transmission overhead

## 3. Schema

```json
{
  "rpx_version": "0.1.0",
  "record_id": "uuid-v4",
  "timestamp": "ISO-8601",
  "agent_id": "identifier",
  "request": {
    "action_type": "string",
    "parameters": {},
    "context": {}
  },
  "permission": {
    "decision": "ALLOW | DENY | MODIFY | ADVISORY",
    "reasoning": ["step1", "step2", "..."],
    "policy_refs": ["envelope-id-1", "..."],
    "constraints": {}
  },
  "execution": {
    "status": "SUCCESS | FAILURE | SKIPPED",
    "result": {},
    "errors": []
  },
  "metadata": {
    "kernel_version": "string",
    "gateway_id": "string",
    "session_id": "string"
  },
  "signature": "cryptographic-signature"
}
```

## 4. Lifecycle

1. **Request Received** — Gateway creates RPX record with request details
2. **Permission Evaluated** — Kernel adds decision + reasoning
3. **Execution Completed** — Result and status appended
4. **Record Signed** — Cryptographic signature applied
5. **Trail Written** — Record persisted to audit store

## 5. Storage & Retrieval

RPX records should be stored in:
- **Immutable storage** (append-only logs, blockchain, etc.)
- **Indexed for queries** (by agent, time, decision type, etc.)
- **Accessible for audit** (authorized parties can replay decisions)

## 6. Security Properties

- **Integrity:** Signatures prevent tampering
- **Non-repudiation:** Agents cannot deny actions
- **Auditability:** Full trace available for review
- **Privacy:** Sensitive context can be redacted with hash references

## 7. Versioning

- **Current version:** `rpx-spec v0.1.0 (draft)`
- **Compatibility:** Forward-compatible within v0.1.x
