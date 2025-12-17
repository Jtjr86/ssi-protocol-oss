# SSI Protocol — Audit and Verification Procedures

**Version:** 1.0.0-invariant  
**Status:** Constitutional  
**Last Modified:** December 17, 2025  
**Authority:** SSI Protocol Foundation Documents  
**Related:** [SPEC.md](SPEC.md), [DECISIONS.md](DECISIONS.md)

---

## Purpose of This Document

This document defines **how to verify the integrity and authenticity** of SSI Protocol decision records (RPX). It provides the procedures that auditors, regulators, courts, and third parties use to independently validate that:

1. Decision records have not been tampered with
2. The hash chain is cryptographically sound
3. Context was captured at decision time, not retroactively
4. Records are admissible as evidence

**Legal Purpose:** Establishes forensic procedures for courtroom evidence and regulatory audits.

**Implementation Purpose:** Defines verification algorithms that any party can execute independently, without access to the SSI runtime.

---

## 1. Core Verification Principle

**Invariant:** Any party with access to RPX records can independently verify their integrity without trusting the system that produced them.

This is achieved through:
- **Cryptographic hash chains** — Each record links to the previous via hash
- **Self-contained context** — Records include all necessary verification data
- **Deterministic verification** — Same inputs always produce same verification result
- **No secrets required** — Verification does not require private keys or privileged access

**Trust Model:** You trust mathematics, not the operator.

---

## 2. RPX Record Structure

Every RPX record MUST contain the following fields for verification purposes:

### 2.1 Required Fields

| Field | Type | Purpose |
|-------|------|---------|
| `record_id` | String (UUID v4) | Unique identifier for this record |
| `timestamp` | String (ISO 8601 UTC) | When decision was made |
| `previous_hash` | String (hex SHA-256) | Hash of previous record in chain |
| `decision_type` | String | Type of decision (see DECISIONS.md) |
| `agent_id` | String | Identifier of deciding agent |
| `outcome` | Enum: ALLOW, DENY, ESCALATE | Decision result |
| `context_hash` | String (hex SHA-256) | Hash of decision context snapshot |
| `policy_version` | String (semver) | Policy ruleset version used |
| `record_hash` | String (hex SHA-256) | Hash of this record's canonical form |

### 2.2 Optional Fields

| Field | Type | Purpose |
|-------|------|---------|
| `operator_id` | String | Human operator (if ESCALATE) |
| `denial_reason` | String | Why action was denied |
| `escalation_reason` | String | Why escalation was required |
| `context_snapshot` | Object | Full decision context (may be stored separately) |
| `metadata` | Object | Implementation-specific additional data |

### 2.3 Genesis Record

The **first record** in any chain is a **genesis record** with special properties:

- `previous_hash` = `0000000000000000000000000000000000000000000000000000000000000000` (64 zeros)
- `timestamp` = Chain initialization time
- `outcome` = N/A (not a decision, just initialization)
- `record_hash` = Hash of genesis record canonical form

**Genesis records establish the starting point for verification.**

---

## 3. Hash Chain Mechanics

### 3.1 Canonical Record Form

Before hashing, records MUST be serialized into a **canonical form**:

1. Extract fields in **alphabetical order** by field name
2. Serialize as JSON with:
   - No whitespace between tokens
   - Consistent UTF-8 encoding
   - Sorted object keys
   - No trailing commas
3. Exclude `record_hash` field (it's the output, not input)

**Example Canonical Form:**

```json
{"agent_id":"agent-001","context_hash":"a3f2...","decision_type":"TRADE_EXECUTION","outcome":"ALLOW","policy_version":"1.2.0","previous_hash":"7b3e...","record_id":"550e8400-e29b-41d4-a716-446655440000","timestamp":"2025-12-17T14:32:11Z"}
```

### 3.2 Hash Computation

```
record_hash = SHA256(canonical_record_bytes)
```

**Implementation Note:** Use standard SHA-256 (FIPS 180-4). Stronger hashes (SHA-512, SHA3-256) are permitted but SHA-256 is the minimum.

### 3.3 Chain Linking

Each record's `previous_hash` field MUST equal the `record_hash` of the chronologically prior record.

```
Record[N].previous_hash == Record[N-1].record_hash
```

**Visual Representation:**

```
┌─────────────────┐
│ Genesis Record  │
│ prev: 0000...   │
│ hash: 7b3e...   │◄──┐
└─────────────────┘   │
                      │
┌─────────────────┐   │
│ Record 1        │   │
│ prev: 7b3e...   │───┘
│ hash: a2f9...   │◄──┐
└─────────────────┘   │
                      │
┌─────────────────┐   │
│ Record 2        │   │
│ prev: a2f9...   │───┘
│ hash: c5d1...   │◄──┐
└─────────────────┘   │
                      │
         ...          ...
```

---

## 4. Verification Procedures

### 4.1 Single Record Verification

**Purpose:** Verify one record's internal consistency.

**Procedure:**

1. Obtain record `R`
2. Extract `R.record_hash` (claimed hash)
3. Construct canonical form of `R` (excluding `record_hash`)
4. Compute `computed_hash = SHA256(canonical_form)`
5. Compare: `computed_hash == R.record_hash`

**Result:**
- ✅ **VALID** if hashes match
- ❌ **INVALID** if hashes don't match (record was tampered with)

**Pseudocode:**

```python
def verify_record(record):
    claimed_hash = record['record_hash']
    canonical = canonicalize(record, exclude=['record_hash'])
    computed_hash = sha256(canonical)
    return computed_hash == claimed_hash
```

---

### 4.2 Chain Continuity Verification

**Purpose:** Verify that a sequence of records forms an unbroken chain.

**Procedure:**

1. Obtain records `R[0]` through `R[N]` in chronological order
2. Verify `R[0]` is a valid genesis record:
   - `R[0].previous_hash == "0000..."`
   - `verify_record(R[0]) == True`
3. For each subsequent record `R[i]` (i > 0):
   - Verify `R[i].previous_hash == R[i-1].record_hash`
   - Verify `verify_record(R[i]) == True`
4. Verify timestamps are monotonically increasing:
   - `R[i].timestamp >= R[i-1].timestamp`

**Result:**
- ✅ **VALID CHAIN** if all checks pass
- ❌ **BROKEN CHAIN** if any link fails

**Failure Modes:**
- Missing record (gap in chain)
- Hash mismatch (tampering detected)
- Timestamp regression (temporal anomaly)

**Pseudocode:**

```python
def verify_chain(records):
    # Check genesis
    if records[0]['previous_hash'] != '0' * 64:
        return False, "Invalid genesis"
    
    # Check each link
    for i in range(len(records)):
        # Verify record integrity
        if not verify_record(records[i]):
            return False, f"Record {i} hash invalid"
        
        # Verify chain link (except genesis)
        if i > 0:
            if records[i]['previous_hash'] != records[i-1]['record_hash']:
                return False, f"Chain broken at record {i}"
            if records[i]['timestamp'] < records[i-1]['timestamp']:
                return False, f"Timestamp regression at record {i}"
    
    return True, "Chain valid"
```

---

### 4.3 Context Integrity Verification

**Purpose:** Verify that decision context has not been altered.

**Procedure:**

1. Obtain record `R` with `context_hash`
2. Obtain corresponding `context_snapshot` (may be stored separately)
3. Compute `computed_context_hash = SHA256(canonical_context)`
4. Compare: `computed_context_hash == R.context_hash`

**Result:**
- ✅ **VALID** if hashes match (context is authentic)
- ❌ **INVALID** if hashes don't match (context was altered)

**Note:** If context is too large to store in RPX records, it may be stored separately. The hash in the RPX record serves as a cryptographic commitment to the original context.

---

### 4.4 Temporal Bounds Verification

**Purpose:** Verify that records were created within plausible time windows.

**Procedure:**

1. For each record `R`:
   - Verify `R.timestamp` is within reasonable bounds of wall clock time (if known)
   - Verify `R.timestamp` precedes known execution time (if available)
   - Verify `R.timestamp` is after previous record (monotonicity)

**Common Failure:**
- Record created *after* execution (retroactive logging, not SSI-compliant)

**Forensic Use:** In courtroom scenarios, compare RPX timestamps to external evidence (server logs, witness testimony) to prove decisions were made before execution.

---

## 5. Forensic Analysis Procedures

### 5.1 Post-Incident Investigation

**Scenario:** An adverse event occurred. Investigators need to determine what the agent decided and why.

**Procedure:**

1. **Locate relevant RPX record** by timestamp or decision type
2. **Verify record integrity** using single record verification
3. **Verify chain integrity** from genesis to target record
4. **Extract decision context** using context hash
5. **Analyze decision rationale**:
   - What was the agent's input state?
   - Which policy version was active?
   - What was the outcome (ALLOW/DENY/ESCALATE)?
6. **Cross-reference with execution logs** to confirm action matched decision

**Output:** Timeline of decision-making with cryptographic proof of authenticity.

---

### 5.2 Compliance Audit

**Scenario:** Regulator audits whether an autonomous system is operating within legal bounds.

**Procedure:**

1. **Request RPX records** for audit period (e.g., last 90 days)
2. **Verify chain integrity** across entire period
3. **Sample verification**:
   - Random sample of records (e.g., 100 records)
   - Verify each record's hash
   - Check policy compliance (were DENY outcomes honored?)
4. **Pattern analysis**:
   - Frequency of ESCALATE outcomes (human oversight engaged?)
   - Denial rates (is system overly permissive?)
   - Policy version changes (were updates logged?)
5. **Exception review**:
   - Any broken chain links? (tampering)
   - Any retroactive records? (timestamp anomalies)

**Output:** Compliance report with cryptographic attestation.

---

### 5.3 Liability Attribution

**Scenario:** Legal dispute over who is responsible for an autonomous decision.

**Procedure:**

1. **Establish decision authority**:
   - Was decision made by agent (autonomous)?
   - Was decision escalated to operator (human authority)?
   - Was operator override logged?
2. **Verify decision was authorized**:
   - Outcome was ALLOW (not DENY bypassed)
   - Policy version was active and approved
3. **Verify execution matched decision**:
   - Cross-reference RPX record with execution logs
   - Confirm no unauthorized deviation
4. **Determine liability**:
   - If agent decided autonomously within policy → operator liability (policy was inadequate)
   - If operator escalated and approved → operator liability (human override)
   - If execution deviated from ALLOW/DENY → executor liability (system defect)

**Output:** Attribution chain with cryptographic evidence.

---

## 6. Verification Tools and Interfaces

### 6.1 Command-Line Verification Tool

SSI reference implementations MUST provide a CLI tool for verification:

```bash
ssi-verify --chain <path_to_rpx_log>

# Output:
# ✓ Genesis record valid
# ✓ Chain continuity verified (1,234 records)
# ✓ No hash mismatches detected
# ✓ Timestamps monotonic
# ✓ Chain integrity: VALID
```

**Exit Codes:**
- `0` = Valid chain
- `1` = Broken chain
- `2` = Invalid genesis
- `3` = Timestamp anomaly

---

### 6.2 Programmatic Verification API

Implementations SHOULD provide verification libraries:

**Python Example:**

```python
from ssi_audit import verify_chain, verify_record

records = load_rpx_records('audit.log')
is_valid, message = verify_chain(records)

if is_valid:
    print("Chain verified successfully")
else:
    print(f"Verification failed: {message}")
```

**JavaScript Example:**

```javascript
const { verifyChain } = require('ssi-audit');

const records = loadRPXRecords('audit.log');
const { valid, message } = verifyChain(records);

if (valid) {
  console.log("Chain verified successfully");
} else {
  console.error(`Verification failed: ${message}`);
}
```

---

### 6.3 Web-Based Verification Interface

For non-technical auditors, implementations MAY provide web UI:

**Upload RPX Log → Verify Chain → Display Results**

- Chain status (valid/invalid)
- Record count
- Time span
- Failure points (if any)
- Export verification report (PDF)

---

## 7. Tamper Detection

### 7.1 Modification Detection

**If an attacker modifies a record:**

1. Record's `record_hash` no longer matches its content
2. Verification detects hash mismatch
3. Chain is flagged as **INVALID**

**Example:**
```
Original Record:
  outcome: "DENY"
  record_hash: "a3f2..."

Tampered Record (changed outcome):
  outcome: "ALLOW"
  record_hash: "a3f2..."  (hash unchanged)

Verification:
  computed_hash = SHA256(canonical_form) = "b7e1..."
  claimed_hash = "a3f2..."
  Result: MISMATCH → INVALID
```

---

### 7.2 Deletion Detection

**If an attacker deletes a record:**

1. Chain continuity breaks
2. Next record's `previous_hash` doesn't match prior record
3. Chain is flagged as **BROKEN**

**Example:**
```
Before Deletion:
  Record[10].hash = "a3f2..."
  Record[11].previous_hash = "a3f2..."
  Record[11].hash = "c5d1..."
  Record[12].previous_hash = "c5d1..."

After Deleting Record[11]:
  Record[10].hash = "a3f2..."
  Record[12].previous_hash = "c5d1..." (no matching prior record)
  
Verification:
  Record[12].previous_hash != Record[10].hash
  Result: BROKEN CHAIN
```

---

### 7.3 Insertion Detection

**If an attacker inserts a fraudulent record:**

1. New record must link to existing chain
2. Either:
   - New record's `previous_hash` doesn't match any existing record → detected
   - Next record's `previous_hash` must be updated → breaks chain → detected

**Implication:** Cannot insert records without breaking chain integrity.

---

### 7.4 Reordering Detection

**If an attacker reorders records:**

1. Timestamps are no longer monotonic
2. Hash chain links are scrambled
3. Chain verification fails

**Temporal Integrity:** Monotonic timestamps prevent reordering attacks.

---

## 8. Evidence Admissibility Standards

For RPX records to be admissible in legal proceedings:

### 8.1 Chain of Custody

1. **Prove records were preserved** from creation to audit
2. **Demonstrate hash chain integrity** (no tampering)
3. **Show timestamps predate execution** (pre-decision logging)

**Legal Standard:** "Business records exception" + cryptographic proof of authenticity.

---

### 8.2 Expert Witness Testimony

Courts may require expert testimony to:

1. Explain hash chain verification procedure
2. Demonstrate independent verification (live in court)
3. Attest to cryptographic soundness

**Expert Qualifications:** Cryptography, distributed systems, or forensic computer science background.

---

### 8.3 Verification Report Format

**Recommended Structure:**

```
SSI AUDIT VERIFICATION REPORT

Audit Scope: [time range]
Records Analyzed: [count]
Verification Date: [ISO timestamp]
Verifier: [name/organization]

INTEGRITY CHECKS:
✓ Genesis record valid
✓ Chain continuity: PASS (0 broken links)
✓ Hash verification: PASS (0 mismatches)
✓ Timestamp monotonicity: PASS

FINDINGS:
- Total decisions: [count]
- ALLOW outcomes: [count] ([percentage]%)
- DENY outcomes: [count] ([percentage]%)
- ESCALATE outcomes: [count] ([percentage]%)

ANOMALIES:
[None detected / List specific issues]

CONCLUSION:
Chain integrity is [VERIFIED / COMPROMISED]

Cryptographic Attestation:
[SHA-256 hash of this report]

Verifier Signature:
[Digital signature or notarization]
```

---

## 9. Multi-Party Verification

### 9.1 Independent Auditors

**Scenario:** Multiple parties need to agree on chain validity.

**Procedure:**

1. Each party independently obtains RPX records
2. Each party runs verification procedure
3. Each party computes chain hash (final record's `record_hash`)
4. Parties compare chain hashes

**Result:**
- If all hashes match → **CONSENSUS** (chain is authentic)
- If hashes differ → **DISPUTE** (someone has altered records)

**Byzantine Fault Tolerance:** If majority of auditors agree, minority is rejected.

---

### 9.2 Distributed Verification

**Scenario:** RPX records are distributed across multiple nodes (e.g., blockchain-style).

**Procedure:**

1. Each node maintains copy of chain
2. New records are broadcast to all nodes
3. Nodes independently verify new records before accepting
4. Consensus protocol ensures majority agreement

**SSI does not mandate distributed storage**, but supports it via hash chain properties.

---

## 10. Performance Considerations

### 10.1 Verification Complexity

- **Single record verification:** O(1) — constant time
- **Chain verification (N records):** O(N) — linear time
- **Sample verification (K random records):** O(K) — linear in sample size

**Implication:** Even large chains (millions of records) can be verified efficiently via sampling.

---

### 10.2 Incremental Verification

**Optimization:** Instead of re-verifying entire chain, verify only new records.

**Procedure:**

1. Maintain "last verified record hash"
2. When new records arrive, verify:
   - First new record's `previous_hash` matches last verified hash
   - All new records form valid chain
3. Update "last verified record hash"

**Benefit:** Constant-time verification of new records (amortized).

---

## 11. Failure Modes and Mitigation

### 11.1 Hash Collision (Theoretical)

**Risk:** Two different inputs produce same SHA-256 hash.

**Probability:** ~2^-256 (astronomically unlikely)

**Mitigation:** Use SHA-256 minimum; upgrade to SHA-512 if SHA-256 is broken.

---

### 11.2 Clock Skew

**Risk:** System clocks are not synchronized, leading to timestamp anomalies.

**Mitigation:**
- Use UTC timestamps
- Allow small timestamp tolerances (e.g., ±60 seconds)
- Flag large discrepancies for manual review

---

### 11.3 Storage Corruption

**Risk:** Bit flips or disk errors corrupt RPX records.

**Detection:** Hash verification detects corruption (mismatched hashes)

**Mitigation:** Store redundant copies; use error-correcting codes.

---

## 12. Relationship to Other Documents

**SPEC.md** defines: "Hash chain integrity is verifiable"  
**AUDIT.md** (this doc) defines: "Here's how to verify it"

**DECISIONS.md** defines: "What is a decision"  
**AUDIT.md** assumes: Decisions are recorded per DECISIONS.md

**FAILURE.md** (coming) will define: How verification holds under system failures  
**COMPLIANCE.md** (coming) will define: Certification requires passing these audits

---

## 13. Implementation Requirements

All SSI-compliant implementations MUST:

1. ✅ Provide verification tools (CLI, API, or library)
2. ✅ Use SHA-256 (or stronger) for hash computation
3. ✅ Produce records in canonical form
4. ✅ Support chain export for third-party verification
5. ✅ Document verification procedures in implementation docs

Implementations SHOULD:

- Provide web-based verification UI for non-technical users
- Support incremental verification
- Include sample verification code in documentation

---

## 14. Governance

This document is maintained under the SSI Protocol governance framework.

Changes require:
- Demonstrated cryptographic or forensic need
- Backward compatibility (existing chains remain verifiable)
- Security review (no weakening of verification guarantees)

**Acceptance Criteria:** Proposed changes must maintain or strengthen tamper-detection capabilities.

---

## 15. Contact

**Cryptographic Questions:** [GitHub Discussions](https://github.com/Jtjr86/ssi-protocol-oss/discussions)  
**Forensic Analysis Support:** Engage certified SSI auditors  
**Tool Bugs:** [GitHub Issues](https://github.com/Jtjr86/ssi-protocol-oss/issues)

---

**This document establishes the verification procedures that enable independent audits of SSI decision records. Cryptographic integrity is the foundation of trust.**

---

## Appendix A: SHA-256 Reference

**Algorithm:** FIPS 180-4 Secure Hash Standard  
**Output Size:** 256 bits (32 bytes, 64 hex characters)  
**Collision Resistance:** ~2^128 operations (infeasible)  

**Example:**
```
Input:  "Hello, SSI"
SHA-256: 5d41402abc4b2a76b9719d911017c592
```

---

## Appendix B: Canonical JSON Serialization

**Rules:**
1. Keys in alphabetical order
2. No whitespace between tokens
3. UTF-8 encoding
4. Strings double-quoted
5. Numbers without leading zeros
6. Booleans as `true`/`false`
7. Null as `null`

**Example:**
```json
{"a":1,"b":"test","c":true}
```

---

**End of SSI Protocol Audit and Verification Procedures**
