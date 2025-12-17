# SSI Protocol — Sovereign Synthetic Intelligence

**A constitutional standard for autonomous agent accountability**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0--invariant-blue)](SPEC.md)
[![Constitutional](https://img.shields.io/badge/status-constitutional-success)](COMPLIANCE.md)

---

## What SSI Protocol Is

The **Sovereign Synthetic Intelligence (SSI) Protocol** defines the minimum constitutional guarantees required for autonomous systems operating in high-stakes environments.

SSI provides:

- **Decision authorization** — Agents request permission before executing consequential actions
- **Cryptographic provenance** — Every decision produces an immutable, hash-chained audit record (RPX)
- **Fail-closed semantics** — When safety cannot be determined, execution is denied by default
- **Human authority** — Operators retain veto power over all autonomous decisions

**SSI is NOT:**
- An execution runtime (agents run elsewhere)
- A machine learning model (agents use their own inference)
- A certification authority (operators define policies)
- A product (it is a protocol specification)

---

## Who SSI Protocol Is For

### Regulators
SSI provides auditable standards for autonomous system accountability, supporting:
- EU AI Act high-risk AI transparency requirements
- GDPR right to explanation for automated decisions
- Financial regulations (MiFID II, Dodd-Frank)
- Medical device regulations (IEC 62304, FDA SaMD)

### Enterprises
SSI enables defensible autonomous systems deployments:
- **Autonomous vehicles** — Pre-action authorization, post-incident forensics
- **Healthcare AI** — Decision accountability, malpractice protection
- **Financial systems** — Regulatory compliance, audit trails
- **Industrial automation** — Safety interlocks, certification substrate

### Implementers
SSI defines testable, verifiable requirements for compliant systems:
- 3-level certification framework (Basic, Verified, Safety-Critical)
- Open-source reference implementations
- Compliance test suites

---

## Constitutional Documents

SSI is governed by **five constitutional documents** that define immutable guarantees:

| Document | Purpose |
|----------|---------|
| **[SPEC.md](SPEC.md)** | Core invariants (what must always hold) |
| **[DECISIONS.md](DECISIONS.md)** | Decision ontology (what qualifies as a decision) |
| **[AUDIT.md](AUDIT.md)** | Verification procedures (how compliance is proven) |
| **[FAILURE.md](FAILURE.md)** | Fail-closed semantics (how safety is preserved under failure) |
| **[COMPLIANCE.md](COMPLIANCE.md)** | Certification framework (how implementations are audited) |

These documents are **intentionally stable**. Changes require RFC process and multi-stakeholder review.

---

## Core Principles

### 1. Fail-Closed by Default

When SSI cannot determine decision safety, it **denies execution**.

```python
# Correct: Fail-closed
try:
    outcome = evaluate_policy(action, context)
except Exception:
    outcome = DENY  # Safe default
```

### 2. Every Decision Has a Record

Any action governed by SSI produces an **RPX (Reflective Provenance Extension)** record:

- Cryptographic hash of decision context
- Timestamp (ISO 8601, UTC)
- Decision outcome (`ALLOW`, `DENY`, `ESCALATE`)
- Hash-chained to previous record (tamper-evident)

### 3. Human Authority is Preserved

SSI provides operator override mechanisms:

- Pre-approval workflows (`ESCALATE` outcome)
- Post-hoc veto authority
- Policy boundaries defined by operators

Agents cannot self-authorize beyond policy limits.

### 4. Verification is Independent

Any party can verify RPX integrity without trusting the system:

- Cryptographic hash chains (SHA-256 minimum)
- No proprietary verification required
- Tamper detection (modification, deletion, reordering)

---

## Compliance Levels

SSI defines three certification levels:

### Level 1: Basic Compliance
**Self-certification, general-purpose systems**
- Timeline: 1-4 weeks
- Cost: Free
- Use: Enterprise automation, recommendation systems

### Level 2: Verified Compliance
**Third-party audit, high-stakes systems**
- Timeline: 2-8 weeks
- Cost: $5,000 - $50,000
- Use: Financial trading, healthcare, critical infrastructure

### Level 3: Safety-Critical Compliance
**Formal certification, life-safety systems**
- Timeline: 6-18 months
- Cost: $100,000+
- Use: Autonomous vehicles, medical devices, aerospace

See [COMPLIANCE.md](COMPLIANCE.md) for full certification framework.

---

## Reference Implementations

SSI Protocol maintainers provide **canonical reference implementations**:

### SSI Kernel
Decision evaluation engine with policy-based authorization.

**Location:** [`reference/kernel/`](reference/kernel/)

### SSI Gateway
RPX record management, hash chain verification, and audit interfaces.

**Location:** [`reference/gateway/`](reference/gateway/)

### DeAlgo
**DeAlgo is the reference governance implementation authored by the creators of the SSI Protocol.**

DeAlgo demonstrates advanced governance patterns including reflection-first decision processing, survival-aware gating, and human authority escalation workflows.

**Location:** See [DeAlgo Lite](https://github.com/Jtjr86/ssi-protocol-existing/tree/main/reference) for public lab environment.

---

## Quick Start

### 1. Understand the Constitutional Framework

Read the five constitutional documents in order:

1. [SPEC.md](SPEC.md) — Understand core invariants
2. [DECISIONS.md](DECISIONS.md) — Learn what constitutes a decision
3. [AUDIT.md](AUDIT.md) — See how verification works
4. [FAILURE.md](FAILURE.md) — Understand fail-closed semantics
5. [COMPLIANCE.md](COMPLIANCE.md) — Review certification requirements

### 2. Run Reference Implementation

```bash
# Clone repository
git clone https://github.com/Jtjr86/ssi-protocol-oss.git
cd ssi-protocol-oss

# Start SSI Gateway and Kernel
cd reference/gateway
npm install
npm start

# In another terminal
cd reference/kernel
npm install
npm start
```

### 3. Make Your First Decision

```bash
# Submit decision request
curl -X POST http://localhost:4041/api/decisions \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "test-agent-001",
    "decision_type": "EXAMPLE_ACTION",
    "context": {
      "description": "Test decision for SSI evaluation"
    }
  }'

# Response includes RPX record with hash chain
{
  "outcome": "ALLOW",
  "record_id": "550e8400-e29b-41d4-a716-446655440000",
  "record_hash": "7b3e4f2a...",
  "previous_hash": "a2f9c1d5...",
  "timestamp": "2025-12-17T14:32:11Z"
}
```

### 4. Verify Hash Chain

```bash
# Verify chain integrity
npm run verify-chain

# Output:
# ✓ Genesis record valid
# ✓ Chain continuity verified (47 records)
# ✓ No hash mismatches detected
# ✓ Timestamps monotonic
# ✓ Chain integrity: VALID
```

---

## Documentation

### For Developers

- [Implementation Guide](docs/developers/implementation-guide.md) — Build SSI-compliant systems
- [API Reference](docs/developers/api-reference.md) — RPX record format, endpoints
- [Testing Guide](docs/developers/testing.md) — Compliance test suite

### For Operators

- [Policy Authoring Guide](docs/operators/policy-guide.md) — Define decision rules
- [Deployment Guide](docs/operators/deployment.md) — Production setup
- [Failure Recovery](docs/operators/failure-recovery.md) — Handle degraded states

### For Regulators

- [Compliance Overview](COMPLIANCE.md) — Certification framework
- [Audit Procedures](AUDIT.md) — Verification methods
- [Legal Framework](docs/legal/framework.md) — Liability and evidence admissibility

---

## Use Cases

### Autonomous Vehicles

**SSI provides:**
- Pre-decision authorization (lane change, braking, acceleration)
- Cryptographic decision logs for post-incident analysis
- Fail-closed safety (if authorization fails, vehicle halts)

**Regulatory Alignment:** ISO 26262 (automotive safety)

---

### Healthcare AI

**SSI provides:**
- Decision provenance for treatment recommendations
- Auditability for malpractice review
- Human escalation for high-stakes decisions

**Regulatory Alignment:** IEC 62304 (medical device software), FDA SaMD

---

### Financial Trading

**SSI provides:**
- Audit trails for algorithmic trading decisions
- Fail-closed risk management (deny execution on policy violation)
- Compliance reporting for regulators

**Regulatory Alignment:** MiFID II, Dodd-Frank, SEC requirements

---

### Industrial Automation

**SSI provides:**
- Safety interlocks for robotic systems
- Operator override mechanisms
- Certification substrate for industrial safety standards

**Regulatory Alignment:** IEC 61508 (functional safety)

---

## Governance

SSI Protocol is governed by immutable constitutional invariants. Changes require:

- **RFC Process** — Public proposal and review
- **Multi-stakeholder approval** — Developers, regulators, operators
- **Backward compatibility** — Invariants cannot be weakened
- **Transition periods** — 12-24 months for ecosystem adaptation

See [Governance Framework](docs/governance/framework.md) for details.

---

## Roadmap

### Current: v1.0.0-invariant (Constitutional Foundation)

✅ Core invariants defined (SPEC.md)  
✅ Decision ontology established (DECISIONS.md)  
✅ Verification procedures documented (AUDIT.md)  
✅ Fail-closed semantics formalized (FAILURE.md)  
✅ Certification framework published (COMPLIANCE.md)

### Next: v1.1.0 (Compliance Tooling)

- [ ] Compliance test suite (automated verification)
- [ ] CLI verification tool (`ssi-verify`)
- [ ] Reference policy examples
- [ ] Auditor certification program

### Future: v2.0.0 (Ecosystem Expansion)

- [ ] SSI Explorer (public audit trail viewer)
- [ ] Multi-language SDKs (Python, Java, Rust)
- [ ] Distributed ledger integration (optional)
- [ ] ISO/IEC standards alignment

**Philosophy:** SSI evolves slowly. Stability is a feature, not a bug.

---

## Security

### Reporting Vulnerabilities

**DO NOT** open public GitHub issues for security vulnerabilities.

Instead:
- Email: security@ssi-protocol.org (to be established)
- PGP Key: [Available here](docs/security/pgp-key.asc)

We will acknowledge receipt within 48 hours and provide a fix timeline.

### Security Model

SSI's security guarantees:

✅ **Tamper-evident** — Hash chains detect modification, deletion, reordering  
✅ **Cryptographically verifiable** — SHA-256 minimum (FIPS 180-4)  
✅ **Fail-closed** — Errors deny execution (never fail-open)  
✅ **Context-bound** — Decisions cannot be evaluated against future context

SSI does **NOT** guarantee:
- ❌ Correctness of decisions (policy logic is operator-defined)
- ❌ Availability (fail-closed may halt execution)
- ❌ Confidentiality of decision data (use encryption separately)

See [SECURITY.md](SECURITY.md) for full disclosure policy.

---

## Contributing

SSI Protocol is open source (Apache 2.0) but **constitutionally governed**.

### How to Contribute

1. **Implementation Improvements** — Submit PRs for reference implementations
2. **Documentation** — Clarify guides, add examples
3. **Tooling** — Build compliance test suites, verification tools
4. **Translations** — Translate constitutional docs (maintain technical accuracy)

### What Requires RFC Process

- Changes to constitutional documents (SPEC, DECISIONS, AUDIT, FAILURE, COMPLIANCE)
- New compliance levels or certification requirements
- Breaking changes to RPX record format

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## License

**Protocol Specification:** Apache License 2.0 (constitutional documents)  
**Reference Implementations:** Apache License 2.0 (code)

See [LICENSE](LICENSE) and [NOTICE](NOTICE) for full terms.

---

## Contact

**General Inquiries:** [GitHub Discussions](https://github.com/Jtjr86/ssi-protocol-oss/discussions)  
**Compliance Questions:** compliance@ssi-protocol.org (to be established)  
**Security Issues:** security@ssi-protocol.org (to be established)  
**Governance:** governance@ssi-protocol.org (to be established)

---

## Acknowledgments

SSI Protocol builds on decades of distributed systems research:

- Cryptographic hash chains (Merkle trees, blockchain)
- Fail-safe design principles (safety-critical systems engineering)
- Audit logging standards (PCI-DSS, HIPAA)
- Policy-based access control (XACML, RBAC)

We are grateful to the researchers and practitioners who established these foundations.

---

**SSI Protocol is infrastructure for accountable autonomy. It defines the minimum guarantees that enable trust in autonomous systems.**

**Version:** 1.0.0-invariant  
**Status:** Constitutional  
**Last Updated:** December 17, 2025
