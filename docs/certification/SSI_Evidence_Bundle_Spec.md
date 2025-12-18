# SSI Evidence Bundle Specification

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
> This specification defines **evidence bundle structure** and basic completeness criteria.  
> **Formal certification, edge-case interpretation, and acceptance decisions** are governed  
> by the SSI Protocol Authority or SSI Certified Auditors.  
> Compliance with this specification does NOT automatically confer certification or regulatory acceptance.

---

## 1. Introduction

### 1.1. Purpose & Scope

This document defines the normative structure and contents of **SSI Evidence Bundles**—standardized packages of verification artifacts that demonstrate SSI Protocol conformance.

**Objectives:**

Evidence bundles serve to:
- Package decision chains and verification results in portable format
- Enable independent verification by third-party auditors
- Facilitate evidence exchange in procurement and regulatory contexts
- Preserve verification artifacts for long-term audit trails
- Standardize evidence presentation across implementations

**Scope:**

This specification defines:
- Bundle structure (directory layout, file naming)
- Required contents (decision chains, reports, metadata)
- Canonical ordering and format requirements
- Hash relationships and integrity verification
- Completeness criteria for acceptance
- Tamper evidence taxonomy and representation

**Out of Scope:**

This specification does NOT define:
- How to generate decision chains (see SSI Protocol Specification)
- Verification procedures (see SSI_Verification_Checklist.md)
- Procurement requirements (see SSI_RFP_Language_Template.md)
- Transport or storage mechanisms for bundles

### 1.2. Normative Language & Interpretation

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

**Interpretation:**
- **MUST** / **REQUIRED** — Absolute requirement
- **SHOULD** / **RECOMMENDED** — Strong recommendation; deviations require justification
- **MAY** / **OPTIONAL** — Truly optional; absence permitted

### 1.3. Bundle Objectives

A well-formed evidence bundle achieves:

1. **Portability** — Can be transferred between systems without loss of information
2. **Self-Containment** — Includes all artifacts needed for independent verification
3. **Tamper Evidence** — Any modification to bundle contents is detectable
4. **Auditability** — Provides complete audit trail from generation to verification
5. **Longevity** — Remains verifiable years after creation

**Design Principles:**

- Use open formats (JSON, JSONL, Markdown)
- Avoid proprietary encodings or compression
- Maintain human readability where possible
- Enable automated processing by tools
- Support both digital and printed evidence submission

---

## 2. Evidence Bundle Identity & Versioning

### 2.1. Bundle Identifier (UUID)

**Requirement:**

Every evidence bundle MUST have a unique identifier generated at creation time.

**Format:**

Bundle identifiers MUST use UUID v4 (RFC 4122):
```
550e8400-e29b-41d4-a716-446655440000
```

**Properties:**
- 128-bit random value
- Formatted as 8-4-4-4-12 hexadecimal groups
- Lowercase preferred
- Collision probability: negligible for practical purposes

**Generation:**

Bundle IDs SHOULD be generated using:
- Cryptographically secure random number generator
- UUID v4 library in programming language of choice
- No predictable or sequential components

**Uniqueness:**

Bundle IDs MUST be:
- Unique within organization's evidence repository
- Globally unique (statistically guaranteed by UUID v4)
- Never reused, even if bundle is regenerated

**Usage:**

Bundle ID appears in:
- `cover-sheet.json` (required)
- Bundle directory name (recommended)
- Database/registry entries (if applicable)

### 2.2. Creation Timestamp

**Requirement:**

Every evidence bundle MUST record the date and time of creation.

**Format:**

Creation timestamps MUST use ISO 8601 with UTC timezone:
```
2025-12-17T15:30:45Z
```

**Requirements:**
- Full date and time (not just date)
- UTC timezone (Z suffix)
- No fractional seconds (optional but discouraged)
- Sortable lexicographically

**Clock Synchronization:**

Organizations creating evidence bundles SHOULD:
- Use NTP or equivalent for time synchronization
- Document time source (e.g., "synchronized to NIST time servers")
- Note if local clock used (less authoritative)

**Immutability:**

Creation timestamp MUST NOT be:
- Modified after bundle creation
- Set to past or future date intentionally
- Adjusted for timezone display purposes

### 2.3. SSI Specification Version Compatibility

**Requirement:**

Every evidence bundle MUST declare the SSI Protocol Specification version it conforms to.

**Format:**

Version numbers MUST use Semantic Versioning (semver):
```
1.0.0
```

**Version Components:**
- MAJOR.MINOR.PATCH
- MAJOR: Breaking changes to protocol
- MINOR: Backward-compatible additions
- PATCH: Bug fixes, clarifications

**Compatibility Rules:**

A bundle conforming to version `X.Y.Z` is verifiable by tools supporting:
- Exact version `X.Y.Z`
- Any version `X.Y.*` (same major and minor)
- Higher minor versions in same major (e.g., `X.(Y+1).0`)

**Version Mismatch Handling:**

Verification tools MUST:
- Check bundle version against tool's supported versions
- Warn if minor version mismatch
- Fail if major version mismatch
- Document version compatibility in verification report

### 2.4. Bundle Format Version

**Requirement:**

Evidence bundles MUST declare their format version (independent of SSI Protocol version).

**Format:**

Bundle format versions use semver:
```
1.0.0
```

**Current Version:** 1.0.0 (this specification)

**Version Evolution:**

Bundle format version increments when:
- Required file structure changes (MAJOR)
- New optional fields added (MINOR)
- Documentation clarifications only (PATCH)

**Backward Compatibility:**

Tools MUST support:
- Current format version
- All prior format versions in same major version
- At least one prior major version (grace period)

---

## 3. Bundle Structure

### 3.1. Required File Names

An evidence bundle MUST contain these files with exact names:

**Core Files:**

| File Name | Purpose | Format | Required |
|-----------|---------|--------|----------|
| `chain.jsonl` | RPX decision chain | JSONL | YES |
| `verification-report.json` | Verification results | JSON | YES |
| `cover-sheet.json` | Bundle metadata | JSON | YES |
| `README.md` | Human-readable summary | Markdown | RECOMMENDED |

**Optional Files:**

| File Name | Purpose | Format | Required |
|-----------|---------|--------|----------|
| `metadata.json` | Extended metadata | JSON | OPTIONAL |
| `policy-artifacts/` | Governance policies (L3) | Directory | L3 only |
| `schemas/` | Local schema copies | Directory | OPTIONAL |
| `attachments/` | Supporting docs | Directory | OPTIONAL |

**File Naming Rules:**

- Lowercase preferred
- No spaces or special characters
- Use hyphens for multi-word names
- Extensions MUST match content type (`.json`, `.jsonl`, `.md`)

### 3.2. Directory Layout

**Flat Layout (RECOMMENDED for simple bundles):**

```
evidence-bundle-550e8400/
├── chain.jsonl
├── verification-report.json
├── cover-sheet.json
└── README.md
```

**Nested Layout (for complex bundles with policies):**

```
evidence-bundle-550e8400/
├── chain.jsonl
├── verification-report.json
├── cover-sheet.json
├── README.md
├── metadata.json
├── policy-artifacts/
│   ├── policy-v1.2.3.json
│   └── policy-v1.2.4.json
└── attachments/
    └── implementation-notes.pdf
```

**Directory Naming:**

- Bundle directory SHOULD be named: `evidence-bundle-{UUID}`
- Subdirectories MUST use lowercase with hyphens
- No deep nesting (maximum 2 levels recommended)

**Path References:**

Internal file references (e.g., in `cover-sheet.json`) MUST use:
- Relative paths from bundle root
- Forward slashes (`/`) as path separator
- No parent directory references (`../`)

### 3.3. File Formats (JSONL, JSON, Markdown)

**JSONL Format (chain.jsonl):**

- UTF-8 encoding
- One JSON object per line
- Lines separated by newline (`\n`)
- No blank lines
- No comments
- See Section 5.1 for content requirements

**JSON Format (reports, metadata):**

- UTF-8 encoding
- Valid JSON (RFC 8259)
- Pretty-printed RECOMMENDED (2-space indent)
- No trailing commas
- No comments
- Object keys sorted (for deterministic hashing)

**Markdown Format (README.md):**

- CommonMark specification
- UTF-8 encoding
- Plain text readable
- No HTML embedded (discouraged)
- Include: bundle summary, verification status, key findings

### 3.4. Compression & Packaging (OPTIONAL)

**Allowed Formats:**

Evidence bundles MAY be compressed using:
- ZIP (`.zip`) — RECOMMENDED
- TAR + GZIP (`.tar.gz`) — Acceptable
- TAR + BZIP2 (`.tar.bz2`) — Acceptable

**Compression Requirements:**

If compressed:
- Bundle directory structure MUST be preserved
- File names MUST remain unchanged
- No encryption (evidence must be publicly verifiable)
- Archive name SHOULD match bundle ID: `evidence-bundle-{UUID}.zip`

**Uncompressed Preferred:**

For maximum accessibility:
- Uncompressed bundles RECOMMENDED for web submission
- Compressed bundles acceptable for large chains or offline transfer
- Verification tools MUST support both compressed and uncompressed

**Prohibited:**

- Proprietary formats (`.rar`, `.7z`)
- Encrypted archives (`.zip` with password)
- Self-extracting archives
- Split archives

---

## 4. Required Contents

### 4.1. RPX Chain File (chain.jsonl)

**Purpose:**

Contains the complete decision chain being verified.

**Format:**

JSONL (newline-delimited JSON), one record per line.

**Requirements:**

The chain file MUST:
- Include ALL records in chronological order
- Start with genesis record (index 0, `previous_hash` all zeros)
- End with most recent record (head)
- Contain no duplicate records
- Conform to RPX Record Schema

**Minimum Content:**

Each record MUST contain:
```json
{
  "timestamp": "2025-01-01T00:00:00Z",
  "decision_type": "string",
  "outcome": "string",
  "record_hash": "64-char-hex",
  "previous_hash": "64-char-hex",
  "metadata": {}
}
```

**Optional Fields:**

Records MAY include:
- `governance_envelope` (required for L3)
- `context` (decision context)
- Additional metadata fields

**Size Limits:**

- No hard limit on number of records
- Individual records SHOULD be < 1 MB
- Total file size SHOULD be < 100 MB (guidance only)

**Example:**

```jsonl
{"timestamp":"2025-01-01T00:00:00Z","decision_type":"access","outcome":"permit","record_hash":"a3f2...","previous_hash":"0000...0000","metadata":{}}
{"timestamp":"2025-01-01T00:01:00Z","decision_type":"access","outcome":"deny","record_hash":"b8e4...","previous_hash":"a3f2...","metadata":{}}
```

### 4.2. Verification Report (verification-report.json)

**Purpose:**

Contains results of running ssi-verify (or equivalent tool) against the chain.

**Format:**

JSON object with required fields.

**Required Schema:**

```json
{
  "integrity_status": "VALID | INVALID | INCOMPLETE",
  "compliance_level": "L1 | L2 | L3 | NONE",
  "record_count": 0,
  "findings": [],
  "tool": {
    "name": "string",
    "version": "string",
    "hash_spec": "string"
  },
  "chain": {
    "genesis_timestamp": "ISO 8601",
    "head_timestamp": "ISO 8601",
    "genesis_hash": "hex",
    "head_hash": "hex"
  },
  "verification_timestamp": "ISO 8601"
}
```

**Field Descriptions:**

- `integrity_status`: Overall result (VALID/INVALID/INCOMPLETE)
- `compliance_level`: Highest level achieved (L1/L2/L3/NONE)
- `record_count`: Total records in chain
- `findings`: Array of finding objects (see Section 8)
- `tool`: Metadata about verification tool used
- `chain`: Summary info about chain boundaries
- `verification_timestamp`: When verification was performed

**Findings Array:**

Each finding MUST include:
```json
{
  "type": "string",
  "severity": "critical | high | medium | low",
  "record_index": 0,
  "message": "string",
  "details": {}
}
```

**Generation:**

Verification reports MUST be:
- Generated by running verification tool
- Not manually edited after generation
- Timestamped at creation
- Signed/attested if possible (recommended)

### 4.3. Case Cover Sheet (cover-sheet.json)

**Purpose:**

Provides bundle metadata and human-readable summary.

**Required Schema:**

```json
{
  "bundle_id": "UUID-v4",
  "bundle_format_version": "1.0.0",
  "ssi_spec_version": "1.0.0",
  "created_timestamp": "ISO 8601",
  "created_by": {
    "organization": "string",
    "contact": "email or URL",
    "role": "implementer | auditor | vendor"
  },
  "chain_summary": {
    "record_count": 0,
    "time_span": {
      "start": "ISO 8601",
      "end": "ISO 8601"
    },
    "decision_types": ["array", "of", "types"]
  },
  "verification_summary": {
    "status": "VALID | INVALID | INCOMPLETE",
    "level": "L1 | L2 | L3 | NONE",
    "finding_count": 0,
    "verified_by": "tool name and version"
  },
  "files_included": [
    "chain.jsonl",
    "verification-report.json",
    "README.md"
  ],
  "purpose": "audit | procurement | demonstration | testing",
  "notes": "Optional human-readable notes"
}
```

**Field Requirements:**

All fields are REQUIRED except:
- `notes` (OPTIONAL)
- `created_by.role` (OPTIONAL)

**Purpose Values:**

Valid purpose declarations:
- `audit`: Third-party compliance audit
- `procurement`: RFP submission or contract deliverable
- `demonstration`: Reference example or proof-of-concept
- `testing`: Internal validation or QA
- `regulatory`: Regulatory submission or filing

### 4.4. Metadata File (metadata.json)

**Purpose:**

Extended metadata beyond cover sheet (OPTIONAL).

**When to Include:**

Metadata file SHOULD be included when:
- Chain has complex provenance
- Multiple verification runs performed
- Additional context needed for interpretation
- Regulatory requirements demand extra documentation

**Suggested Schema:**

```json
{
  "system_info": {
    "implementation": "string",
    "version": "string",
    "deployment": "string"
  },
  "provenance": {
    "data_source": "string",
    "collection_period": {
      "start": "ISO 8601",
      "end": "ISO 8601"
    },
    "chain_generation": {
      "tool": "string",
      "timestamp": "ISO 8601"
    }
  },
  "verification_history": [
    {
      "timestamp": "ISO 8601",
      "tool": "string",
      "result": "VALID | INVALID | INCOMPLETE"
    }
  ],
  "custom_fields": {}
}
```

**Extensibility:**

Organizations MAY add custom fields under `custom_fields` object without violating conformance.

---

## 5. Canonical Ordering

### 5.1. Record Ordering in chain.jsonl

**Primary Requirement:**

Records in `chain.jsonl` MUST be ordered chronologically by timestamp, from earliest (genesis) to latest (head).

**Ordering Rules:**

1. **Genesis First:** Record with `previous_hash` of all zeros MUST be first
2. **Timestamp Ascending:** Each record's timestamp MUST be ≥ prior record's timestamp
3. **Hash Chain Order:** Each record's `previous_hash` MUST match prior record's `record_hash`
4. **No Gaps:** Records MUST be contiguous (no missing sequence numbers if present)

**Same-Timestamp Records:**

If multiple records have identical timestamps:
- Order by `record_hash` (lexicographic, lowercase hex)
- Maintain deterministic ordering for reproducibility
- Verification tools MUST preserve this order

**Prohibited:**

- Reverse chronological order
- Random ordering
- Grouping by decision type
- Any non-chronological arrangement

**Verification:**

Tools MUST verify:
- First record is genesis
- Timestamps non-decreasing
- Hash chain continuous
- No reordering detected

### 5.2. Field Ordering in JSON Objects

**Requirement:**

For deterministic hashing and reproducibility, JSON object fields SHOULD be ordered consistently.

**Recommended Order (RPX Records):**

```json
{
  "timestamp": "...",
  "decision_type": "...",
  "outcome": "...",
  "record_hash": "...",
  "previous_hash": "...",
  "metadata": {},
  "governance_envelope": {}
}
```

**Alphabetic Ordering:**

When no semantic ordering applies:
- Sort keys alphabetically (case-sensitive, ASCII order)
- Apply recursively to nested objects
- Maintains consistency across implementations

**Verification Report Ordering:**

```json
{
  "chain": {...},
  "compliance_level": "...",
  "findings": [...],
  "integrity_status": "...",
  "record_count": 0,
  "tool": {...},
  "verification_timestamp": "..."
}
```

**Canonicalization:**

Tools generating evidence bundles SHOULD:
- Canonicalize JSON before writing
- Use consistent serialization library
- Preserve field order across bundle files

### 5.3. Timestamp Monotonicity Requirements

**Strict Monotonicity:**

Timestamps in decision chains MUST be non-decreasing:
```
T₀ ≤ T₁ ≤ T₂ ≤ ... ≤ Tₙ
```

**Enforcement:**

Verification tools MUST:
- Check timestamp ordering during verification
- Emit `timestamp-violation` finding if ordering violated
- Downgrade conformance level if violations detected

**Clock Skew Tolerance:**

Implementations SHOULD:
- Synchronize clocks via NTP
- Document maximum acceptable clock skew (e.g., ±1 second)
- Reject records with timestamps too far in past/future

**Future Timestamps:**

Records with timestamps in the future (relative to verification time):
- MAY be flagged as suspicious
- Do NOT automatically invalidate chain
- SHOULD be documented in verification report

---

## 6. Hash Relationships

### 6.1. Record-to-Record Hash Chaining

**Mechanism:**

Each record (except genesis) links to its predecessor via `previous_hash` field.

**Chain Integrity:**

For valid chain:
```
Record[i].previous_hash === Hash(Record[i-1])
```

Where `Hash()` computes SHA-256 of canonical record (with `record_hash` removed).

**Genesis Record:**

First record MUST have:
```json
{
  "previous_hash": "0000000000000000000000000000000000000000000000000000000000000000"
}
```

**Verification:**

Tools MUST verify:
1. Genesis has all-zero `previous_hash`
2. Every subsequent record's `previous_hash` matches prior record's `record_hash`
3. No broken links in chain

**Break Detection:**

If `Record[i].previous_hash ≠ Hash(Record[i-1])`:
- Emit finding: `type: "broken-link"`, `severity: "high"`
- Set `integrity_status: "INVALID"`
- Continue checking to find all breaks

### 6.2. Bundle Integrity Hash

**Purpose:**

Evidence bundles MAY include a top-level hash covering all files for tamper detection.

**Computation:**

Bundle integrity hash is computed as:
```
SHA-256(
  Hash(chain.jsonl) ||
  Hash(verification-report.json) ||
  Hash(cover-sheet.json) ||
  Hash(README.md)
)
```

Where `||` is concatenation and files are hashed in lexicographic order.

**Storage:**

Bundle hash SHOULD be stored in:
- `cover-sheet.json` under `bundle_integrity_hash` field
- Separate `INTEGRITY.txt` file in bundle root
- External registry or database

**Verification:**

To verify bundle integrity:
1. Recompute hash of each file
2. Concatenate in lexicographic order
3. Hash the concatenation
4. Compare to claimed bundle hash

**Optional:**

Bundle integrity hash is OPTIONAL but RECOMMENDED for:
- High-assurance contexts
- Long-term archival
- Regulatory submissions

### 6.3. Hash Algorithm Specification (SHA-256)

**Required Algorithm:** SHA-256 (FIPS 180-4)

**Properties:**
- Output: 256 bits (32 bytes)
- Encoding: Lowercase hexadecimal (64 characters)
- Collision resistance: ~2^128 operations
- Preimage resistance: ~2^256 operations

**Canonical Representation:**

```
a3f2b891c4d5e6f78901234567890abcdef1234567890abcdef1234567890abc
```

**Prohibited:**
- Uppercase hex
- Base64 encoding
- Raw binary
- Truncated hashes

**Implementation:**

Use standard library implementations:
- Node.js: `crypto.createHash('sha256')`
- Python: `hashlib.sha256()`
- Java: `MessageDigest.getInstance("SHA-256")`

**No Custom Implementations:**

Do NOT implement SHA-256 from scratch. Use vetted libraries.

### 6.4. Hash Verification Procedure

**Step-by-Step:**

1. **Load Record**
   - Parse JSON record from chain.jsonl

2. **Extract Claimed Hash**
   - Save `record_hash` value
   - Remove `record_hash` field from record

3. **Canonicalize**
   - Serialize remaining fields (sorted keys, compact)
   - Result: canonical JSON string

4. **Compute Hash**
   - SHA-256(canonical string)
   - Convert to lowercase hex

5. **Compare**
   - Computed hash === claimed hash?
   - If match: PASS
   - If mismatch: FAIL (emit finding)

**Determinism:**

Hash computation MUST be deterministic:
- Same record → same hash (always)
- Independent of language, platform, tool
- No randomness or timestamps in hash input

**Test Vectors:**

Reference implementation MUST pass B4 test vectors demonstrating:
- Valid hash computation
- Hash mismatch detection
- Edge cases (empty fields, Unicode, etc.)

---

## 7. Completeness Criteria

### 7.1. Minimum Required Files

A bundle is INCOMPLETE if it lacks:

- `chain.jsonl` — Decision chain
- `verification-report.json` — Verification results
- `cover-sheet.json` — Bundle metadata

**All three are REQUIRED.** Absence of any file renders bundle invalid for conformance assessment.

**Optional Files:**

Missing optional files does NOT make bundle incomplete:
- `README.md` — Recommended but not required
- `metadata.json` — Optional
- Policy artifacts — Required only for L3

### 7.2. Genesis Record Requirements

**Genesis Record MUST:**

1. **Be First Record**
   - Index 0 in chain.jsonl
   - First line of file

2. **Have All-Zero Previous Hash**
   ```json
   "previous_hash": "0000000000000000000000000000000000000000000000000000000000000000"
   ```

3. **Be Valid Record**
   - Conforms to RPX Record Schema
   - Has valid `record_hash`
   - Has required fields (`timestamp`, `decision_type`, `outcome`)

**Genesis Validation:**

Tools MUST verify:
- Genesis is present
- Genesis has correct `previous_hash`
- Genesis hash is valid

**Missing or Invalid Genesis:**

If genesis record is missing or invalid:
- Bundle is INCOMPLETE
- Verification MUST fail
- `integrity_status: "INCOMPLETE"`

### 7.3. Chain Continuity Requirements

**Continuity Defined:**

A chain has continuity if:
- Every record (except genesis) links to prior record via `previous_hash`
- No broken links
- No missing records
- No reordered records

**Verification:**

For i = 1 to n-1:
```
IF Record[i].previous_hash ≠ Record[i-1].record_hash:
  FAIL (broken link at index i)
```

**Partial Chains:**

Partial chains (subset of full history) are PERMITTED if:
- Genesis record is synthetic (documents subset start)
- Cover sheet declares chain is partial
- Verification report notes incompleteness

**Incomplete Chains:**

If chain has gaps or breaks:
- `integrity_status: "INCOMPLETE"`
- `compliance_level: "NONE"` (cannot achieve L2 without continuity)
- Findings list all breaks

### 7.4. Incomplete Bundle Handling

**Causes of Incompleteness:**

Bundle is INCOMPLETE due to:
- Missing required files
- Invalid genesis record
- Broken hash chain
- Missing policy artifacts (for L3)
- Corrupted files

**Verification Behavior:**

When bundle is incomplete:
- Verification tool MUST emit clear error
- `integrity_status: "INCOMPLETE"`
- Exit code 2 (incomplete)
- Do NOT grant any conformance level

**Remediation:**

Implementer MUST:
- Provide missing artifacts
- Fix corrupted files
- Regenerate bundle with correct structure
- Re-submit for verification

**Partial Acceptance:**

Incomplete bundles MAY be accepted for:
- Debugging purposes
- Partial demonstrations
- Works-in-progress

But MUST NOT be accepted for:
- Conformance certification
- Procurement deliverables
- Regulatory submissions

---

## 8. Tamper Evidence Taxonomy

### 8.1. Evidence Types

**Standard Finding Types:**

| Type | Description | Severity | L1 | L2 | L3 |
|------|-------------|----------|----|----|-----|
| `hash-mismatch` | Record hash ≠ computed hash | critical | ✓ | ✓ | ✓ |
| `broken-link` | previous_hash ≠ prior record_hash | high | — | ✓ | ✓ |
| `timestamp-violation` | Timestamp not monotonic | high | — | ✓ | ✓ |
| `schema-invalid` | Record fails schema validation | critical | ✓ | ✓ | ✓ |
| `missing-field` | Required field absent | critical | ✓ | ✓ | ✓ |
| `invalid-genesis` | Genesis record malformed | critical | ✓ | ✓ | ✓ |
| `policy-mismatch` | Policy hash doesn't match artifact | high | — | — | ✓ |
| `governance-invalid` | Governance envelope schema violation | high | — | — | ✓ |

**Custom Types:**

Verification tools MAY define additional finding types prefixed with tool name:
- `ssi-verify:custom-check`
- Prevents namespace collisions

### 8.2. Severity Levels

**Severity Classification:**

| Severity | Impact | Conformance Effect |
|----------|--------|-------------------|
| **critical** | Chain integrity violated | Automatic failure (INVALID) |
| **high** | Continuity or governance broken | Downgrade level (L3→L2, L2→L1) |
| **medium** | Best practice violation | Warning (no level change) |
| **low** | Minor issue or recommendation | Informational only |

**Critical Findings:**

ANY critical finding results in:
- `integrity_status: "INVALID"`
- `compliance_level: "NONE"`
- Immediate verification failure

**High Findings:**

High findings may allow:
- L1 conformance (if hash integrity preserved)
- But prevent L2/L3 conformance

**Medium/Low Findings:**

Do NOT affect conformance level but:
- SHOULD be documented in verification report
- MAY be addressed to improve implementation quality

### 8.3. Finding Format Specification

**Required Fields:**

Every finding MUST include:

```json
{
  "type": "string",
  "severity": "critical | high | medium | low",
  "record_index": 0,
  "message": "Human-readable description",
  "details": {}
}
```

**Field Descriptions:**

- `type`: Finding type from taxonomy (Section 8.1)
- `severity`: Impact level (Section 8.2)
- `record_index`: Zero-based index of affected record (or -1 for chain-level findings)
- `message`: Clear, actionable description of issue
- `details`: Type-specific metadata (expected vs actual, etc.)

**Example Findings:**

```json
{
  "type": "hash-mismatch",
  "severity": "critical",
  "record_index": 42,
  "message": "Record hash does not match computed hash",
  "details": {
    "claimed_hash": "a3f2b891c4d5e6f7...",
    "computed_hash": "b8e4c723d1a9f8e2..."
  }
}
```

```json
{
  "type": "broken-link",
  "severity": "high",
  "record_index": 15,
  "message": "Hash chain link broken between records 14 and 15",
  "details": {
    "expected_previous_hash": "c9d7e8f1a2b3c4d5...",
    "actual_previous_hash": "d1e2f3a4b5c6d7e8..."
  }
}
```

### 8.4. Evidence Aggregation Rules

**Multiple Findings:**

Verification reports MAY contain multiple findings for same record.

**Aggregation:**

When presenting findings:
- Group by type (all hash-mismatch together)
- Sort by severity (critical → low)
- Then by record_index (ascending)

**Summary Counts:**

Verification reports SHOULD include:
```json
{
  "finding_summary": {
    "critical": 2,
    "high": 5,
    "medium": 1,
    "low": 0,
    "total": 8
  }
}
```

**Deduplication:**

Tools SHOULD NOT emit duplicate findings for same issue.

**Chain-Level Findings:**

Some findings affect entire chain (not specific record):
- Use `record_index: -1`
- Examples: "Missing genesis record", "File corrupted"

---

## 9. Schema References

### 9.1. RPX Record Schema

**Location:** `spec/schemas/rpx-record.schema.json`  
**Status:** NORMATIVE  
**Purpose:** Defines valid structure of decision records

**Key Requirements:**

- JSON Schema Draft 2020-12
- Required fields: `timestamp`, `decision_type`, `outcome`, `record_hash`, `previous_hash`
- Optional fields: `metadata`, `governance_envelope`, `context`

**Validation:**

Records MUST be validated against schema during:
- Record generation (by implementer)
- Bundle creation (by evidence tool)
- Verification (by ssi-verify)

### 9.2. Governance Envelope Schema

**Location:** `spec/schemas/governance-envelope.schema.json`  
**Status:** NORMATIVE  
**Purpose:** Defines structure of governance metadata in L3 records

**When Required:**

Governance envelopes MUST be present in records where:
- Decision was governed by policy
- L3 conformance claimed
- Policy binding needs to be demonstrated

### 9.3. Cover Sheet Schema

**Location:** Not yet formalized (this specification defines structure)  
**Status:** NORMATIVE  
**Purpose:** Defines structure of `cover-sheet.json`

**Schema:**

See Section 4.3 for complete structure.

### 9.4. Schema Versioning

**Schema Evolution:**

Schemas evolve independently from this specification:
- Bundle format version: 1.0.0
- RPX Record Schema version: may be 1.x, 2.x, etc.
- Governance Envelope Schema version: independent

**Compatibility:**

Bundles MUST declare:
- Bundle format version (this spec)
- SSI protocol version (determines which schemas apply)
- Tool MUST load schemas matching declared version

**Version Mismatch:**

If schema version incompatible:
- Verification MUST fail
- Clear error message required
- Suggest updating tool or regenerating bundle

---

## 10. Appendix A: Example Bundles

### 10.1. Valid Bundle (L1)

**Directory Structure:**
```
evidence-bundle-550e8400/
├── chain.jsonl
├── verification-report.json
├── cover-sheet.json
└── README.md
```

**chain.jsonl (excerpt):**
```jsonl
{"timestamp":"2025-01-01T00:00:00Z","decision_type":"access","outcome":"permit","record_hash":"a3f2b891c4d5e6f78901234567890abcdef1234567890abcdef1234567890abc","previous_hash":"0000000000000000000000000000000000000000000000000000000000000000","metadata":{}}
{"timestamp":"2025-01-01T00:01:00Z","decision_type":"access","outcome":"deny","record_hash":"b8e4c723d1a9f8e2567890abcdef1234567890abcdef1234567890abcdef1234","previous_hash":"a3f2b891c4d5e6f78901234567890abcdef1234567890abcdef1234567890abc","metadata":{}}
```

**verification-report.json:**
```json
{
  "integrity_status": "VALID",
  "compliance_level": "L1",
  "record_count": 2,
  "findings": [],
  "tool": {
    "name": "ssi-verify",
    "version": "1.0.0",
    "hash_spec": "SHA-256"
  },
  "chain": {
    "genesis_timestamp": "2025-01-01T00:00:00Z",
    "head_timestamp": "2025-01-01T00:01:00Z",
    "genesis_hash": "a3f2b891c4d5e6f78901234567890abcdef1234567890abcdef1234567890abc",
    "head_hash": "b8e4c723d1a9f8e2567890abcdef1234567890abcdef1234567890abcdef1234"
  },
  "verification_timestamp": "2025-12-17T15:30:00Z"
}
```

**cover-sheet.json:**
```json
{
  "bundle_id": "550e8400-e29b-41d4-a716-446655440000",
  "bundle_format_version": "1.0.0",
  "ssi_spec_version": "1.0.0",
  "created_timestamp": "2025-12-17T15:30:00Z",
  "created_by": {
    "organization": "Example Corp",
    "contact": "compliance@example.com",
    "role": "implementer"
  },
  "chain_summary": {
    "record_count": 2,
    "time_span": {
      "start": "2025-01-01T00:00:00Z",
      "end": "2025-01-01T00:01:00Z"
    },
    "decision_types": ["access"]
  },
  "verification_summary": {
    "status": "VALID",
    "level": "L1",
    "finding_count": 0,
    "verified_by": "ssi-verify 1.0.0"
  },
  "files_included": [
    "chain.jsonl",
    "verification-report.json",
    "cover-sheet.json",
    "README.md"
  ],
  "purpose": "demonstration"
}
```

### 10.2. Invalid Bundle (tampered)

**Scenario:** Record #1 hash modified after generation (tampering)

**verification-report.json:**
```json
{
  "integrity_status": "INVALID",
  "compliance_level": "NONE",
  "record_count": 2,
  "findings": [
    {
      "type": "hash-mismatch",
      "severity": "critical",
      "record_index": 1,
      "message": "Record hash does not match computed hash - tampering detected",
      "details": {
        "claimed_hash": "MODIFIED_HASH_VALUE_HERE",
        "computed_hash": "b8e4c723d1a9f8e2567890abcdef1234567890abcdef1234567890abcdef1234"
      }
    }
  ],
  "tool": {
    "name": "ssi-verify",
    "version": "1.0.0",
    "hash_spec": "SHA-256"
  },
  "chain": {
    "genesis_timestamp": "2025-01-01T00:00:00Z",
    "head_timestamp": "2025-01-01T00:01:00Z",
    "genesis_hash": "a3f2b891c4d5e6f78901234567890abcdef1234567890abcdef1234567890abc",
    "head_hash": "MODIFIED_HASH_VALUE_HERE"
  },
  "verification_timestamp": "2025-12-17T15:30:00Z"
}
```

### 10.3. Incomplete Bundle

**Scenario:** Missing `cover-sheet.json`

**Error:**
```
Verification failed: Incomplete evidence bundle
Missing required file: cover-sheet.json

Bundle MUST contain:
  - chain.jsonl
  - verification-report.json
  - cover-sheet.json (MISSING)

Cannot proceed with verification.
Exit code: 2
```

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
