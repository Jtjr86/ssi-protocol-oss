# SSI Protocol — Invariant Core Specification

**Version:** 1.0.0-invariant  
**Status:** Constitutional  
**Last Modified:** December 17, 2025  
**Authority:** SSI Protocol Foundation Documents

---

## Purpose of This Document

This specification defines the **immutable guarantees** of the Sovereign Synthetic Intelligence (SSI) Protocol. These are not features—they are **constitutional invariants** that:

- Courts may rely upon in legal proceedings
- Regulators may reference in compliance frameworks  
- Enterprises may anchor safety certifications to
- Implementers must preserve across all versions

**If a behavior is defined in this document, it MUST NOT change.**  
**If a behavior is not defined here, it is implementation-dependent.**

---

## 1. What SSI Is

SSI is a **permission and provenance protocol** for autonomous agent decisions.

It provides:
- **Decision authorization** — agents request permission before executing consequential actions
- **Cryptographic provenance** — every decision produces an immutable, hash-chained audit record
- **Fail-closed semantics** — when SSI cannot determine safety, execution is denied by default
- **Human escalation** — operators retain veto authority over all autonomous decisions

**SSI is NOT:**
- An execution runtime (agents run elsewhere)
- A machine learning model (agents use their own inference)
- A certification authority (operators define policies)
- A guarantee of correctness (it guarantees *legibility*, not *rightness*)

---

## 2. Core Invariants

These guarantees are **permanent and non-negotiable**:

### 2.1 Every Decision Has a Record

**Invariant:** Any action governed by SSI MUST produce a Reflective Provenance Extension (RPX) record.

- The record MUST include a cryptographic hash of the decision context
- The record MUST include a timestamp (ISO 8601 format, UTC)
- The record MUST include the decision outcome (`ALLOW`, `DENY`, `ESCALATE`)
- The record MUST be append-only (no deletions, no modifications)

**Verification:** Any party with access to the RPX log can cryptographically verify chain integrity.

---

### 2.2 Fail-Closed by Default

**Invariant:** When SSI cannot determine decision safety, it MUST deny execution.

Denial occurs when:
- Policy evaluation encounters an error
- Required context is missing or corrupted
- Hash chain verification fails
- Operator authority cannot be confirmed

**Verification:** Implementers must demonstrate that runtime errors result in `DENY`, never `ALLOW`.

---

### 2.3 Human Authority is Preserved

**Invariant:** SSI MUST provide a mechanism for human operators to override or escalate decisions.

- Operators may define policies that require pre-approval
- Operators may veto decisions post-hoc (with audit trail)
- Escalation workflows MUST be logged in RPX records
- Agent autonomy is conditional on operator-defined boundaries

**Verification:** Implementations must expose operator controls; agents cannot self-authorize beyond policy limits.

---

### 2.4 Hash Chain Integrity is Verifiable

**Invariant:** RPX records MUST form a cryptographically linked chain.

- Each record includes the hash of the previous record
- Genesis records (first in chain) reference a known initialization hash
- Any tampering with prior records invalidates subsequent hashes
- Verification is independent of the SSI runtime (any party can validate)

**Hash Function:** SHA-256 (minimum standard; implementations may use stronger)

**Verification:** Third parties can verify chain integrity without access to the execution environment.

---

### 2.5 Decisions Are Context-Bound

**Invariant:** SSI records MUST capture the decision context at the moment of evaluation.

Context includes:
- Agent identifier (who is deciding)
- Decision type (what action is being authorized)
- Relevant state snapshot (what the agent knew at decision time)
- Policy version (which rules governed the decision)

**Anti-Pattern:** Decisions MUST NOT be evaluated against future context. A decision record represents *what was known then*, not *what is known now*.

**Verification:** RPX records include sufficient context to reconstruct decision rationale.

---

## 3. Compliance Definition

A system is **SSI-compliant** if and only if:

1. ✅ It produces RPX records for all governed decisions
2. ✅ It implements fail-closed semantics (errors → deny)
3. ✅ It preserves human escalation pathways
4. ✅ It maintains hash chain integrity
5. ✅ It captures decision context in records

**Non-compliance examples:**
- ❌ Logging decisions after execution (post-hoc audit trails are not SSI)
- ❌ Allowing execution when policy evaluation fails
- ❌ Modifying or deleting prior RPX records
- ❌ Removing operator override capabilities
- ❌ Evaluating decisions without capturing context

---

## 4. What This Specification Does NOT Define

The following are **implementation-dependent** and NOT covered by invariants:

- **Decision logic:** How policies evaluate context (custom per deployment)
- **Storage mechanism:** Where RPX records are persisted (database, filesystem, ledger)
- **Performance:** How fast decisions are evaluated
- **Scale:** How many decisions per second are supported
- **User interface:** How operators interact with the system
- **Integration patterns:** How agents connect to SSI infrastructure

These are intentionally left to implementers to optimize for their use cases.

---

## 5. Versioning and Evolution

### Backward Compatibility

Once published, invariants in this specification **CANNOT be weakened**.

Future versions may:
- ✅ Add new optional fields to RPX records
- ✅ Introduce additional verification mechanisms
- ✅ Strengthen cryptographic requirements (e.g., SHA-256 → SHA-512)

Future versions MAY NOT:
- ❌ Remove required fields from RPX records
- ❌ Weaken fail-closed semantics
- ❌ Eliminate human override mechanisms
- ❌ Break hash chain verification

### Version Identifier

All SSI-compliant implementations MUST report their supported specification version.

Format: `SSI/1.0` (protocol/version)

---

## 6. Legal and Regulatory Anchoring

This specification is designed to serve as a **reference point** for:

- **Courtroom evidence:** RPX records are structured for forensic analysis
- **Regulatory compliance:** Auditors can verify SSI guarantees independently
- **Safety certification:** Standards bodies can assess conformance
- **Liability frameworks:** Decision provenance supports accountability

**Critical:** SSI does not eliminate operational risk. It provides **legibility** into autonomous decision-making, enabling human oversight and post-incident analysis.

---

## 7. Reference Implementations

The SSI Protocol maintainers provide **canonical reference implementations**:

- **SSI Kernel** — Decision evaluation engine
- **SSI Gateway** — RPX record management and verification
- **DeAlgo** — Governance-aware implementation by protocol authors

These implementations are **interpretations of this specification**. They are not the specification itself. Independent implementations are permitted and encouraged, provided they uphold the invariants defined herein.

---

## 8. Governance

This specification is maintained under the SSI Protocol governance framework.

Changes to invariants require:
- Public RFC process
- Multi-stakeholder review (developers, regulators, operators)
- Formal approval by SSI Protocol maintainers

**Acceptance Criteria:** Proposed changes must preserve or strengthen safety, auditability, and human authority.

---

## 9. Contact and Compliance

**Specification Inquiries:** [GitHub Discussions](https://github.com/Jtjr86/ssi-protocol-oss/discussions)  
**Compliance Certification:** See [COMPLIANCE.md](COMPLIANCE.md) (to be published)  
**Security Disclosures:** [SECURITY.md](SECURITY.md)

---

**This specification represents the constitutional foundation of SSI. All implementations, tooling, and governance must preserve these invariants.**

---

## Appendix A: Terminology

- **Agent:** An autonomous or semi-autonomous system making decisions
- **Decision:** A proposed action requiring authorization
- **RPX (Reflective Provenance Extension):** Cryptographic audit record format
- **Operator:** Human or organizational authority defining policies
- **Fail-Closed:** Default denial when safety cannot be determined
- **Hash Chain:** Cryptographically linked sequence of records
- **Invariant:** Guarantee that must never change across versions

---

**End of SSI Protocol Invariant Core Specification**
