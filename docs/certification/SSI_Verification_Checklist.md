# SSI Verification Checklist

**Document Type:** NORMATIVE SPECIFICATION  
**Status:** Draft for Review  
**Version:** 1.0.0 (Public OSS Edition)  
**Date:** December 17, 2025  
**Authority:** SSI Protocol Specification  

> **AUTHORITY BOUNDARY**  
> This specification enables independent verification. Certification, regulatory acceptance,  
> and compliance attestation require formal recognition by the SSI Protocol Authority.  

> **NORMATIVE SPECIFICATION**  
> This document is required for SSI Protocol compliance.  
> All requirements herein are mandatory unless explicitly marked optional.

> **CRITICAL DISTINCTION: VERIFICATION ≠ CERTIFICATION**  
> This document defines **verification procedures** for technical conformance.  
> **Certification, compliance attestation, and trust designation** are governed separately  
> and may require recognition by the SSI Protocol Authority or certified auditors.  
> Successful verification does NOT automatically confer certification or regulatory acceptance.

---

## 1. Introduction

### 1.1. Purpose & Scope

This document defines the normative requirements for verifying compliance with the Sovereign Synthetic Intelligence (SSI) Protocol. It establishes:

- **Required artifacts** that MUST be produced by SSI-conformant implementations
- **Verification procedures** that MUST be followed to assess compliance
- **Pass/fail criteria** that determine conformance levels
- **Tool requirements** for conducting verification

This checklist applies to:
- Third-party auditors evaluating SSI implementations
- Procurement teams requiring SSI compliance in contracts
- Implementers seeking to demonstrate conformance
- Regulators assessing governance transparency

**Out of Scope:**  
This document does NOT define:
- Implementation guidance (see developers documentation)
- Architecture requirements (see protocol specification)
- Operational procedures for deploying SSI systems
- Industry-specific regulatory mappings (see sector-mappings)

### 1.2. Normative Language & Interpretation

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

**Interpretation Rules:**

- **MUST** / **REQUIRED** / **SHALL** — absolute requirement for conformance
- **MUST NOT** / **SHALL NOT** — absolute prohibition
- **SHOULD** / **RECOMMENDED** — strong recommendation; may be ignored only with documented justification
- **SHOULD NOT** — strong recommendation against; may be done only with documented justification
- **MAY** / **OPTIONAL** — truly optional; absence does not affect conformance

**Verification Disputes:**  
In cases of ambiguity or dispute regarding conformance, the authoritative interpretation shall be based on:
1. The literal text of this specification
2. Cross-referenced normative documents (Evidence Bundle Spec, Protocol Specification)
3. Published test vectors (B4)
4. Reference implementation behavior (ssi-verify CLI)

### 1.3. Relationship to SSI Protocol Specification

This checklist is **subordinate to** the SSI Protocol Specification. In the event of conflict:
- Protocol Specification requirements take precedence
- This checklist provides verification procedures for protocol requirements
- Conformance levels (L1/L2/L3) are additive, not substitutive

This document cross-references:
- **RPX Record Schema** (spec/schemas/rpx-record.schema.json)
- **Governance Envelope Schema** (spec/schemas/governance-envelope.schema.json)
- **ssi-verify CLI** (tools/ssi-verify)
- **Test Vectors** (tests/vectors/rpx/)
- **Evidence Bundle Specification** (docs/certification/SSI_Evidence_Bundle_Spec.md)

### 1.4. Document Status & Versioning

**Version History:**

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0   | 2025-12-17 | Initial normative release | SSI Protocol Specification v1.0 |

**Stability Commitment:**  
Normative requirements in this document SHALL NOT be changed in ways that invalidate previously conformant implementations without:
1. Major version increment (e.g., 1.x → 2.0)
2. Published migration guide
3. Minimum 180-day deprecation period

**Change Process:**  
Proposed changes to normative requirements MUST be:
1. Published as RFC (Request for Comments) in rfcs/ directory
2. Subject to public review period (minimum 30 days)
3. Approved by SSI Protocol governance process

---

## 2. Conformance Levels

SSI Protocol compliance is assessed at three hierarchical levels. Higher levels subsume all requirements of lower levels.

### 2.1. Level 1 (L1): Integrity Verification

**Definition:**  
An implementation achieves **Level 1 Conformance** if and only if it produces decision chains where every record's integrity can be cryptographically verified.

**Requirements:**

An implementation MUST:
1. Generate decision records conforming to RPX Record Schema
2. Compute canonical record hashes using SHA-256
3. Embed `record_hash` in each record matching computed hash
4. Include `previous_hash` linking to prior record (except genesis)
5. Produce JSONL-formatted decision chains

**Verification Criteria:**

L1 conformance is verified by:
- Running `ssi-verify --level L1 <chain.jsonl>`
- Ensuring zero hash mismatches across all records
- Confirming schema validity for all records
- Validating genesis record has `previous_hash: "0000...0000"`

**Pass Condition:**  
`integrity_status: "VALID"` in verification report with zero findings of type `hash-mismatch` or `schema-invalid`.

**Fail Conditions:**
- Any record with `hash-mismatch` finding
- Any record failing schema validation
- Missing `record_hash` or `previous_hash` fields
- Hash algorithm other than SHA-256

### 2.2. Level 2 (L2): Continuity Verification

**Definition:**  
An implementation achieves **Level 2 Conformance** if it meets L1 requirements AND produces decision chains with unbroken cryptographic continuity from genesis to head.

**Additional Requirements (beyond L1):**

An implementation MUST:
1. Maintain strict chronological ordering (monotonic timestamps)
2. Ensure each record's `previous_hash` exactly matches prior record's `record_hash`
3. Prevent record deletion, reordering, or insertion
4. Preserve complete chain history without gaps

**Verification Criteria:**

L2 conformance is verified by:
- Running `ssi-verify --level L2 <chain.jsonl>`
- Confirming zero broken links in hash chain
- Validating timestamp monotonicity (non-decreasing)
- Ensuring no missing sequence positions

**Pass Condition:**  
`integrity_status: "VALID"` AND `compliance_level: "L2"` in verification report with zero findings of type `broken-link` or `timestamp-violation`.

**Fail Conditions:**
- Any finding of type `broken-link` (hash chain discontinuity)
- Any finding of type `timestamp-violation` (non-monotonic timestamps)
- Missing records in sequence
- Reordered records detected

**Distinction from L1:**  
L1 allows valid individual records in any order. L2 requires valid records in cryptographically enforced order with no gaps.

### 2.3. Level 3 (L3): Governance Verification

**Definition:**  
An implementation achieves **Level 3 Conformance** if it meets L1 and L2 requirements AND embeds governance policy envelopes that are cryptographically bound to decision outcomes.

**Additional Requirements (beyond L1/L2):**

An implementation MUST:
1. Embed `governance_envelope` in records where policy was active
2. Ensure governance envelopes conform to Governance Envelope Schema
3. Include `policy_hash` linking decision to specific policy version
4. Demonstrate policy→decision causality in envelope metadata

**Verification Criteria:**

L3 conformance is verified by:
- Running `ssi-verify --level L3 <chain.jsonl>`
- Validating governance envelope schema conformance
- Confirming `policy_hash` matches declared policy artifact
- Ensuring governance metadata completeness

**Pass Condition:**  
`integrity_status: "VALID"` AND `compliance_level: "L3"` in verification report with zero governance-related findings.

**Fail Conditions:**
- Missing governance envelopes in policy-governed decisions
- Invalid governance envelope schema
- `policy_hash` mismatch with policy artifact
- Incomplete governance metadata

**Distinction from L2:**  
L2 proves "what happened" in tamper-proof form. L3 proves "why it happened" by linking decisions to governing policies.

### 2.4. Level Determination Logic

**Automatic Level Assignment:**

The verification tool SHALL determine conformance level as follows:

```
IF (all L1 criteria pass):
  IF (all L2 criteria pass):
    IF (all L3 criteria pass):
      LEVEL = L3
    ELSE:
      LEVEL = L2
  ELSE:
    LEVEL = L1
ELSE:
  LEVEL = NONE (non-conformant)
```

**Partial Conformance:**  
There is no such thing as "partial L2" or "partial L3" conformance. An implementation either meets all requirements for a level or it does not.

**Downgrade Conditions:**  
A previously conformant implementation loses conformance if:
- New records violate level requirements
- Chain tampering is detected
- Schema violations are introduced
- Verification tool detects integrity regression

---

## 3. Required Artifacts

### 3.1. RPX Decision Chain (JSONL format)

**Definition:**  
A text file containing newline-delimited JSON records, each representing one decision event in chronological order.

**File Requirements:**

The decision chain file MUST:
- Use `.jsonl` file extension
- Contain UTF-8 encoded text
- Have exactly one JSON object per line
- Terminate each record with newline (`\n`)
- Maintain records in chronological order

**Record Requirements:**

Each record MUST conform to:
- **Schema:** `spec/schemas/rpx-record.schema.json`
- **Required Fields:**
  - `timestamp` (ISO 8601 format)
  - `decision_type` (string)
  - `outcome` (string)
  - `record_hash` (64-character hex SHA-256)
  - `previous_hash` (64-character hex SHA-256, or all-zeros for genesis)
- **Optional Fields:**
  - `governance_envelope` (object, required for L3)
  - `metadata` (object)
  - `context` (object)

**Example:**
```jsonl
{"timestamp":"2025-01-01T00:00:00Z","decision_type":"access-control","outcome":"permit","record_hash":"a3f2...","previous_hash":"0000...","metadata":{}}
{"timestamp":"2025-01-01T00:01:00Z","decision_type":"access-control","outcome":"deny","record_hash":"b8e4...","previous_hash":"a3f2...","metadata":{}}
```

### 3.2. Verification Report (JSON format)

**Definition:**  
A structured JSON document produced by running `ssi-verify` against a decision chain, containing verification results, findings, and conformance assessment.

**File Requirements:**

The verification report MUST:
- Be valid JSON (RFC 8259)
- Use `.json` file extension
- Be human-readable (pretty-printed recommended)

**Required Fields:**

```json
{
  "integrity_status": "VALID | INVALID | INCOMPLETE",
  "compliance_level": "L1 | L2 | L3 | NONE",
  "record_count": <integer>,
  "findings": [<finding objects>],
  "tool": {
    "name": "ssi-verify",
    "version": "<semver>",
    "hash_spec": "SHA-256"
  },
  "chain": {
    "genesis_timestamp": "<ISO 8601>",
    "head_timestamp": "<ISO 8601>",
    "genesis_hash": "<hex>",
    "head_hash": "<hex>"
  }
}
```

**Findings Format:**

Each finding object MUST contain:
```json
{
  "type": "hash-mismatch | broken-link | timestamp-violation | schema-invalid | ...",
  "severity": "critical | high | medium | low",
  "record_index": <integer>,
  "message": "<human-readable description>",
  "details": {<type-specific data>}
}
```

**Generation:**  
Verification reports MUST be produced by running:
```bash
ssi-verify --input <chain.jsonl> --output <verification-report.json> --level <L1|L2|L3>
```

### 3.3. Chain Proof Bundle (optional for L2/L3)

**Definition:**  
An optional package containing the decision chain, verification report, and supporting metadata for evidence preservation.

**When Required:**
- RECOMMENDED for L2/L3 conformance demonstrations
- REQUIRED when submitting evidence for audits or procurement
- OPTIONAL for L1-only verification

**Contents:**

A chain proof bundle SHOULD contain:
- `chain.jsonl` (decision chain)
- `verification-report.json` (verification results)
- `cover-sheet.json` (metadata about bundle)
- `README.md` (human-readable summary)

**Format:**  
See **SSI_Evidence_Bundle_Spec.md** (normative) for complete bundle structure requirements.

### 3.4. Artifact Completeness Matrix

The following matrix defines minimum required artifacts for each conformance level:

| Artifact | L1 | L2 | L3 |
|----------|----|----|-----|
| RPX Decision Chain (.jsonl) | REQUIRED | REQUIRED | REQUIRED |
| Verification Report (.json) | REQUIRED | REQUIRED | REQUIRED |
| Chain Proof Bundle | RECOMMENDED | RECOMMENDED | REQUIRED |
| Governance Policy Files | N/A | N/A | REQUIRED |
| Schema Validation Report | OPTIONAL | OPTIONAL | OPTIONAL |

**Missing Artifacts:**  
Verification SHALL NOT proceed if required artifacts are missing. The verification tool MUST emit an error and exit with non-zero status code.

---

## 4. Verification Procedure

### 4.1. Pre-Verification Checklist

Before beginning verification, the auditor or verification tool MUST confirm:

- [ ] All required artifacts present and accessible
- [ ] File formats correct (`.jsonl`, `.json`)
- [ ] Files readable and not corrupted
- [ ] ssi-verify tool version meets minimum requirements (Section 6.1)
- [ ] Target conformance level clearly specified (L1, L2, or L3)
- [ ] No external dependencies required for verification

**Pre-Verification Failures:**  
If any checklist item fails, verification MUST NOT proceed. A pre-verification failure report SHOULD be generated documenting the missing or invalid prerequisites.

### 4.2. Artifact Validation

**Step 1: File Format Validation**

The verification tool MUST:
1. Parse decision chain as JSONL (reject if invalid)
2. Validate each record is well-formed JSON
3. Confirm no duplicate records (by record_hash)
4. Verify chronological ordering by timestamp

**Step 2: Schema Validation**

For each record, the tool MUST:
1. Load RPX Record Schema (spec/schemas/rpx-record.schema.json)
2. Validate record against schema
3. Record any schema violations as findings (type: `schema-invalid`, severity: `critical`)
4. Fail immediately if genesis record invalid

**Step 3: Required Field Validation**

The tool MUST verify presence of:
- `timestamp` (non-empty, valid ISO 8601)
- `decision_type` (non-empty string)
- `outcome` (non-empty string)
- `record_hash` (64-char hex, matches /^[0-9a-f]{64}$/)
- `previous_hash` (64-char hex, or 64 zeros for genesis)

### 4.3. Hash Computation & Comparison

**Canonical Hash Computation:**

For each record, the verification tool MUST:

1. **Extract Canonical Record Content**
   - Remove `record_hash` field from record
   - Serialize remaining fields in deterministic order (sorted keys)
   - Use compact JSON representation (no whitespace)

2. **Compute SHA-256 Hash**
   - Hash the canonical JSON string
   - Convert to lowercase hexadecimal string (64 characters)

3. **Compare Hashes**
   - Compare computed hash to claimed `record_hash`
   - If mismatch: emit finding (type: `hash-mismatch`, severity: `critical`)
   - If match: record passes L1 integrity check

**Example Hash Computation:**

```javascript
// Original record
{
  "timestamp": "2025-01-01T00:00:00Z",
  "decision_type": "access",
  "outcome": "permit",
  "record_hash": "a3f2b891c...",
  "previous_hash": "0000000000..."
}

// Canonical form (record_hash removed, sorted keys, compact)
{"decision_type":"access","outcome":"permit","previous_hash":"0000000000...","timestamp":"2025-01-01T00:00:00Z"}

// SHA-256 hash must match record_hash
```

**Hash Mismatch Handling:**

If ANY record has hash mismatch:
- Verification MUST fail
- `integrity_status` MUST be set to `INVALID`
- Finding MUST include: record index, expected hash, actual hash
- Verification MAY continue to find additional issues, but final status remains `INVALID`

### 4.4. Continuity Verification

**Required for:** L2, L3  
**Optional for:** L1

**Link Chain Validation:**

For each record (starting at index 1), the tool MUST:

1. **Retrieve Prior Record**
   - Get record at index `i-1`
   - Extract its `record_hash`

2. **Compare Hash Link**
   - Current record's `previous_hash` MUST exactly match prior record's `record_hash`
   - If mismatch: emit finding (type: `broken-link`, severity: `high`)

3. **Genesis Record Special Case**
   - First record (index 0) MUST have `previous_hash: "0000000000000000000000000000000000000000000000000000000000000000"`
   - Any other value is invalid

**Timestamp Monotonicity:**

For each record (starting at index 1), the tool MUST:

1. **Compare Timestamps**
   - Current timestamp MUST be ≥ prior timestamp
   - Strictly increasing timestamps RECOMMENDED
   - Equal timestamps ALLOWED (same-second decisions)

2. **Timestamp Regression Detection**
   - If current timestamp < prior timestamp: emit finding (type: `timestamp-violation`, severity: `high`)

**Continuity Pass Condition:**

Continuity verification passes if and only if:
- Zero `broken-link` findings
- Zero `timestamp-violation` findings
- All records form unbroken chain from genesis to head

### 4.5. Schema Conformance

**Schema Validation Requirements:**

The verification tool MUST validate:

1. **RPX Record Schema** (all levels)
   - Load schema from: `spec/schemas/rpx-record.schema.json`
   - Validate every record against schema
   - Fail on first schema violation (critical error)

2. **Governance Envelope Schema** (L3 only)
   - Load schema from: `spec/schemas/governance-envelope.schema.json`
   - Validate `governance_envelope` field if present
   - Emit finding if envelope present but invalid (type: `schema-invalid`, severity: `critical`)

**Schema Version Compatibility:**

- Verification MUST use schema version matching chain's declared SSI protocol version
- Schema downgrades are NOT PERMITTED
- Schema upgrades MUST maintain backward compatibility

**Schema Violation Handling:**

Any schema violation is a **critical failure**:
- Verification MUST fail immediately
- `integrity_status` MUST be `INVALID`
- Finding MUST include: field path, validation error, schema rule violated

### 4.6. Verification Report Generation

**Report Structure:**

The verification tool MUST produce a report containing:

1. **Status Fields**
   - `integrity_status`: VALID | INVALID | INCOMPLETE
   - `compliance_level`: L1 | L2 | L3 | NONE
   - `record_count`: total records processed

2. **Findings Array**
   - All detected issues (hash mismatches, broken links, etc.)
   - Sorted by: severity (critical→low), then record_index
   - Empty array if no findings

3. **Tool Metadata**
   - Tool name, version, hash specification used
   - Verification timestamp
   - Command-line arguments used

4. **Chain Metadata**
   - Genesis timestamp, hash
   - Head timestamp, hash
   - Total records, time span

**Report Format:**

MUST be valid JSON. SHOULD be pretty-printed for human readability.

**Report Output:**

The tool MUST support:
- Writing report to file: `--output <file.json>`
- Writing to stdout: `--output -`
- Suppressing output: `--quiet` (exit code only)

**Exit Codes:**

The verification tool MUST use these exit codes:
- `0`: Verification passed (VALID)
- `1`: Verification failed (INVALID)
- `2`: Verification incomplete (missing data or errors)
- `3`: Tool error (invalid arguments, missing files, etc.)

---

## 5. Pass/Fail Criteria

### 5.1. L1 Pass Conditions

An implementation passes L1 verification if and only if:

1. ✅ All records conform to RPX Record Schema
2. ✅ Zero findings of type `hash-mismatch`
3. ✅ Zero findings of type `schema-invalid`
4. ✅ All `record_hash` fields present and valid (64-char hex)
5. ✅ All `previous_hash` fields present and valid
6. ✅ Genesis record has `previous_hash` of all zeros

**L1 Pass Report:**
```json
{
  "integrity_status": "VALID",
  "compliance_level": "L1",
  "findings": []
}
```

### 5.2. L2 Pass Conditions

An implementation passes L2 verification if and only if:

1. ✅ All L1 pass conditions met (prerequisite)
2. ✅ Zero findings of type `broken-link`
3. ✅ Zero findings of type `timestamp-violation`
4. ✅ Timestamps monotonically non-decreasing
5. ✅ Hash chain continuous from genesis to head

**L2 Pass Report:**
```json
{
  "integrity_status": "VALID",
  "compliance_level": "L2",
  "findings": []
}
```

### 5.3. L3 Pass Conditions

An implementation passes L3 verification if and only if:

1. ✅ All L1 and L2 pass conditions met (prerequisite)
2. ✅ Governance envelopes present where required
3. ✅ All governance envelopes conform to schema
4. ✅ Policy hashes match referenced policy artifacts
5. ✅ Governance metadata complete and valid

**L3 Pass Report:**
```json
{
  "integrity_status": "VALID",
  "compliance_level": "L3",
  "findings": []
}
```

### 5.4. Automatic Failure Conditions

Verification MUST automatically fail (regardless of level) if:

1. **Critical Schema Violation**
   - Any record fails RPX Record Schema validation
   - Severity: CRITICAL

2. **Hash Mismatch**
   - Any record's computed hash ≠ claimed `record_hash`
   - Severity: CRITICAL

3. **Missing Required Fields**
   - Any record lacks `timestamp`, `decision_type`, `outcome`, `record_hash`, or `previous_hash`
   - Severity: CRITICAL

4. **Invalid Genesis Record**
   - First record has non-zero `previous_hash`
   - Severity: CRITICAL

5. **Malformed JSONL**
   - File is not valid newline-delimited JSON
   - Severity: CRITICAL

6. **File Corruption**
   - File is unreadable, truncated, or contains binary data
   - Severity: CRITICAL

**Automatic Failure Report:**
```json
{
  "integrity_status": "INVALID",
  "compliance_level": "NONE",
  "findings": [
    {
      "type": "hash-mismatch",
      "severity": "critical",
      "record_index": 42,
      "message": "Record hash mismatch detected",
      "details": {
        "expected": "a3f2b891c...",
        "actual": "b8e4c723d..."
      }
    }
  ]
}
```

### 5.5. Inconclusive Results Handling

Verification is INCONCLUSIVE if:

1. **Missing Data**
   - Required artifacts not provided
   - Chain terminates unexpectedly

2. **External Dependencies Unavailable**
   - Governance policy files missing (L3)
   - Schema files inaccessible

3. **Tool Errors**
   - Verification tool crashes
   - Insufficient permissions to read files

**Inconclusive Report:**
```json
{
  "integrity_status": "INCOMPLETE",
  "compliance_level": "NONE",
  "findings": [
    {
      "type": "missing-artifact",
      "severity": "high",
      "message": "Governance policy file not found",
      "details": {
        "policy_hash": "c4d5e6f7...",
        "expected_file": "policies/v1.2.3.json"
      }
    }
  ]
}
```

**Handling:**
- Implementer MUST provide missing artifacts
- Re-run verification after correcting deficiencies
- Inconclusive results DO NOT grant conformance

---

## 6. Tool Requirements

### 6.1. ssi-verify Minimum Version

**Required Tool:** `ssi-verify` CLI  
**Minimum Version:** 1.0.0  
**Repository:** https://github.com/Jtjr86/ssi-protocol-oss/tools/ssi-verify

**Version Check:**
```bash
ssi-verify --version
# Must output: ssi-verify 1.0.0 or higher
```

**Installation:**
```bash
npm install -g @ssi-protocol/ssi-verify
```

**Alternative Tools:**

Third-party verification tools MAY be used if and only if:
1. They produce reports conforming to this specification
2. They pass all B4 test vectors with identical results to ssi-verify
3. They are publicly auditable (source available)
4. They declare conformance to this checklist version

**Tool Certification:**

Verification tools SHOULD undergo certification by:
1. Running against all B4 test vectors
2. Producing identical findings to reference implementation
3. Passing schema validation for output reports
4. Publishing conformance declaration

### 6.2. Hash Specification (SHA-256)

**Required Algorithm:** SHA-256 (FIPS 180-4)  
**Alternative Algorithms:** NOT PERMITTED  

**Hash Properties:**
- Output: 256-bit (32-byte) digest
- Encoding: Lowercase hexadecimal (64 characters)
- Collision Resistance: Cryptographically secure
- Availability: Standard library in all major languages

**Canonical Representation:**
```
a3f2b891c4d5e6f78901234567890abcdef1234567890abcdef1234567890abc
```

**Invalid Representations:**
- Uppercase hex (REJECTED)
- Base64 encoding (REJECTED)
- Raw binary (REJECTED)
- Truncated hash (REJECTED)

**Hash Algorithm Upgrade Path:**

If SHA-256 is deprecated or compromised:
1. New hash algorithm MUST be specified via RFC process
2. Specification version MUST increment (e.g., 1.0 → 2.0)
3. Backward compatibility MUST be maintained for existing chains
4. Migration period MUST be at least 365 days

### 6.3. JSONL Parser Requirements

**Format Specification:** JSON Lines (https://jsonlines.org/)

**Parser Requirements:**

The verification tool's JSONL parser MUST:
1. Accept UTF-8 encoded text
2. Treat each line as independent JSON object
3. Reject lines with invalid JSON
4. Preserve field order (for deterministic hashing)
5. Handle escaped characters correctly
6. Support Unicode characters

**Line Termination:**
- MUST accept `\n` (LF)
- SHOULD accept `\r\n` (CRLF)
- MUST NOT require trailing newline on final record

**Error Handling:**

Parser MUST report:
- Line number of parse error
- JSON syntax error details
- Byte offset if possible

### 6.4. Tool Verification & Trust

**Verification Tool Integrity:**

Organizations relying on verification results SHOULD:

1. **Verify Tool Provenance**
   - Download from official repository only
   - Verify package signature (npm, GPG, etc.)
   - Check tool's own hash against published value

2. **Run Test Vectors**
   - Execute tool against B4 test vectors
   - Confirm output matches expected results
   - Verify error detection works correctly

3. **Independent Verification**
   - Use multiple verification tools if possible
   - Compare results for consistency
   - Investigate any discrepancies

**Tool Audit Trail:**

Verification reports SHOULD include:
- Tool version and hash
- Timestamp of verification run
- Command-line arguments used
- Environment information (OS, runtime version)

**Trust Model:**

This specification does NOT:
- Certify any specific verification tool as authoritative
- Guarantee security of third-party tools
- Provide warranty for verification results

Auditors and implementers bear responsibility for:
- Selecting trustworthy verification tools
- Validating tool behavior against test vectors
- Maintaining verification audit trail

---

## 7. Verification Procedures & Independence (OPTIONAL)

This section provides non-binding recommendations for conducting independent verification.

### 7.1. Recommended Technical Background

**Suggested Qualifications:**

Personnel conducting SSI conformance verification SHOULD have:

- **Cryptography Fundamentals**
  - Understanding of hash functions, collision resistance, pre-image resistance
  - Familiarity with SHA-256 properties and limitations
  - Basic knowledge of digital signatures (not required for L1/L2)

- **Data Structures**
  - Understanding of hash chains, Merkle trees, append-only logs
  - Familiarity with JSONL format and JSON schema validation
  - Experience with log file analysis

- **Software Engineering**
  - Ability to read and execute command-line tools
  - Understanding of file formats, character encodings (UTF-8)
  - Basic scripting or automation skills

**NOT Required:**
- Blockchain expertise
- Distributed systems knowledge
- AI/ML background
- Domain-specific expertise (medical, finance, etc.)

### 7.2. SSI Protocol Familiarity

**Recommended Preparation:**

Before conducting verification, personnel SHOULD:

1. **Read Core Documentation**
   - SSI Protocol Specification (docs/protocol/)
   - RPX Record Schema (spec/schemas/rpx-record.schema.json)
   - This Verification Checklist

2. **Practice with Test Vectors**
   - Run ssi-verify against B4 test vectors
   - Understand difference between VALID, INVALID, INCOMPLETE
   - Review example findings in test vector outputs

3. **Complete Sample Verification**
   - Verify at least one L1, L2, and L3 chain
   - Generate verification reports
   - Document findings and interpretations

### 7.3. Third-Party Verification & Certification

**SSI Certified Auditors:**

For procurement, regulatory submissions, or formal compliance attestation:
- Verification MAY require recognition by **SSI Protocol Authority** or designated certification bodies
- SSI Certified Auditor Program provides formal qualification and recognition
- Contact: certification@ssi-protocol.org or visit /certification for details

**Independence Requirements:**

For independent verification, personnel SHOULD:

1. **Avoid Conflicts of Interest**
   - Not employed by organization being verified
   - No financial stake in verification outcome
   - Disclose any potential conflicts

2. **Maintain Objectivity**
   - Base findings solely on technical evidence
   - Apply same standards consistently
   - Document all decisions and interpretations

3. **Preserve Audit Trail**
   - Retain all artifacts used in verification
   - Document verification procedure followed
   - Archive verification reports

**Internal Verification:**

Organizations MAY conduct internal verification for:
- Development/testing purposes
- Pre-submission validation
- Continuous compliance monitoring

Internal verification results SHOULD NOT be submitted as evidence of formal conformance in procurement or regulatory contexts without independent third-party certification.

---

## 8. Appendix A: Cross-References

### 8.1. Link to Evidence Bundle Spec (Doc 2)

**Document:** SSI_Evidence_Bundle_Spec.md  
**Location:** docs/certification/SSI_Evidence_Bundle_Spec.md  
**Status:** NORMATIVE  

**Relevant Sections:**
- Bundle Structure (Section 3)
- Required Contents (Section 4)
- Tamper Evidence Taxonomy (Section 8)

**When to Consult:**
- Packaging verification artifacts for submission
- Understanding evidence bundle requirements
- Defining tamper evidence types

### 8.2. Link to RFP Template (Doc 3)

**Document:** SSI_RFP_Language_Template.md  
**Location:** docs/certification/SSI_RFP_Language_Template.md  
**Status:** NORMATIVE  

**Relevant Sections:**
- Mandatory Requirements (Section 3)
- Deliverable Specifications (Section 6)
- Acceptance Criteria (Section 7)

**When to Consult:**
- Drafting procurement requirements
- Defining contract deliverables
- Establishing acceptance criteria

### 8.3. Link to Schema Definitions (B2)

**Documents:**
- RPX Record Schema: spec/schemas/rpx-record.schema.json
- Governance Envelope Schema: spec/schemas/governance-envelope.schema.json

**Status:** NORMATIVE  

**When to Consult:**
- Validating record structure
- Understanding required/optional fields
- Implementing record generation

**Schema Versioning:**

Schemas are versioned independently from this checklist. Verification MUST use schema version matching chain's declared SSI protocol version.

---

## Revision History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2025-12-17 | 1.0.0 | SSI Protocol Team | Initial normative release |

---

## License

Copyright 2025 Jtjr86

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

---

**END OF DOCUMENT**
