# Claim Matrix: What We Can (and Cannot) Say

**Version:** 0.3.1  
**Last Updated:** December 14, 2025  
**Purpose:** Internal truth table for sales, marketing, legal, and compliance

---

## How to Use This Document

This matrix defines the **boundary between proof and promise**.

- **PROVEN**: Backed by passing tests (EXIT 0) and committed code
- **PLANNED**: Specified but not yet implemented
- **FORBIDDEN**: Actively disproven or architecturally impossible

### Rules:
1. **Never claim PLANNED as PROVEN** (even if "almost done")
2. **Never ignore FORBIDDEN** (even if customers ask for it)
3. **Update this doc before any external claim** (blog, sales deck, pitch)

---

## 🟢 PROVEN Claims (Test-Locked Evidence)

These claims are **mathematically defensible**. You can say these in legal docs, compliance reviews, or customer contracts.

### Core Cryptography (Track A/A+)

| **Claim** | **Evidence** | **Test File** | **Exit Code** |
|---|---|---|---|
| "Every decision is linked to the previous one via SHA-256 hash chain" | `hash_chain_test.ts` | `testHashChainIntegrity` | EXIT 0 |
| "Tampering with a decision breaks the chain and is detectable" | `hash_chain_test.ts` | `testImpossibleToBreakChainIntegrity` | EXIT 0 |
| "Every decision is signed with Ed25519 digital signature" | `hash_chain_test.ts` | `testSignatureVerification` | EXIT 0 |
| "Chain verification detects missing or reordered records" | `hash_chain_test.ts` | `testChainVerification` | EXIT 0 |
| "Genesis blocks anchor each tenant's audit trail cryptographically" | `hash_chain_test.ts` | `testGenesisBlock` | EXIT 0 |

**Forbidden Inverse**:
- ❌ "Audit trails can be modified without detection" → **Disproven by `testImpossibleToBreakChainIntegrity`**

---

### Multi-Tenant Isolation (Track B1)

| **Claim** | **Evidence** | **Test File** | **Exit Code** |
|---|---|---|---|
| "Tenants cannot access each other's audit trails" | `tenant_isolation_test.ts` | `testTenantIsolation` | EXIT 0 |
| "Each tenant has a cryptographically isolated chain" | `tenant_isolation_test.ts` | `testTenantSpecificChains` | EXIT 0 |
| "Cross-tenant hash pollution is impossible" | `tenant_isolation_test.ts` | `testNoHashLeakage` | EXIT 0 |
| "Tenant context is enforced at the database and API layer" | `tenant_isolation_test.ts` | `testTenantContextEnforcement` | EXIT 0 |
| "Default tenant fallback works for dev/test environments" | `tenant_isolation_test.ts` | `testDefaultTenant` | EXIT 0 |

**Forbidden Inverse**:
- ❌ "Multi-tenancy is enforced by application logic only" → **Disproven by database-level isolation**

---

### API Key Authentication (Track B2.1)

| **Claim** | **Evidence** | **Test File** | **Exit Code** |
|---|---|---|---|
| "API keys are bcrypt-hashed (never stored in plaintext)" | `auth_api_key_test.ts` | `testAPIKeyHashedStorage` | EXIT 0 |
| "API keys are prefix-indexed for fast lookup without hash collision" | `auth_api_key_test.ts` | `testPrefixIndexing` | EXIT 0 |
| "API keys are tenant-scoped (cannot be reused across tenants)" | `auth_api_key_test.ts` | `testTenantScopedKeys` | EXIT 0 |
| "Invalid API keys return 401 Unauthorized" | `auth_api_key_test.ts` | `testInvalidAPIKey` | EXIT 0 |
| "API key authentication bypasses JWT requirement" | `auth_api_key_test.ts` | `testAPIKeyBypassesJWT` | EXIT 0 |

**Forbidden Inverse**:
- ❌ "Plaintext API keys are supported for ease of use" → **Disproven by bcrypt enforcement**

---

### JWT Authentication (Track B2.2)

| **Claim** | **Evidence** | **Test File** | **Exit Code** |
|---|---|---|---|
| "JWT signatures are verified before granting access (RS256/ES256)" | `jwt_auth_test.ts` | `testJWTSignatureVerification` | EXIT 0 |
| "Expired JWTs are rejected automatically" | `jwt_auth_test.ts` | `testExpiredJWT` | EXIT 0 |
| "JWT claims include user role for RBAC enforcement" | `jwt_auth_test.ts` | `testJWTRoleClaims` | EXIT 0 |
| "JWTs override API key authentication when both are present" | `jwt_auth_test.ts` | `testJWTPrecedence` | EXIT 0 |
| "Unsigned or malformed JWTs return 401 Unauthorized" | `jwt_auth_test.ts` | `testMalformedJWT` | EXIT 0 |

**Forbidden Inverse**:
- ❌ "Unsigned tokens work if role claim is present" → **Disproven by signature verification**

---

### Role-Based Access Control (Track B2.3)

| **Claim** | **Evidence** | **Test File** | **Exit Code** |
|---|---|---|---|
| "Viewers can verify decisions but cannot write new ones" | `rbac_test.ts` | `testViewerDeniedWrite` | EXIT 0 |
| "Auditors can verify chain integrity but cannot write decisions" | `rbac_test.ts` | `testAuditorAllowedChainVerification` | EXIT 0 |
| "Admins can write decisions and perform all operations" | `rbac_test.ts` | `testAdminAllowedWrite` | EXIT 0 |
| "Insufficient permissions return 403 Forbidden (not 401)" | `rbac_test.ts` | `testViewerDeniedChainVerification` | EXIT 0 |
| "Role hierarchy is enforced: viewer < auditor < admin" | `rbac_test.ts` | All tests | EXIT 0 |
| "Dev mode bypass allows unauthenticated access (dev only)" | `rbac_test.ts` | `testDevModeBypass` | EXIT 0 |

**Forbidden Inverse**:
- ❌ "All authenticated users can write decisions" → **Disproven by `testViewerDeniedWrite`**

---

### Integration & Regression

| **Claim** | **Evidence** | **Test File** | **Exit Code** |
|---|---|---|---|
| "All 26 tests pass with zero regressions" | All test files | `npm test` | EXIT 0 |
| "New features do not break existing security guarantees" | Regression suite | All tests | EXIT 0 |

---

## 🟡 PLANNED Claims (Specified, Not Yet Built)

These claims are **roadmapped** but not yet proven. You can say "we're building this" but **not** "this works today".

### Track B3: Per-Tenant Signing Keys

| **Claim** | **Status** | **ETA** | **Risk** |
|---|---|---|---|
| "Tenants can bring their own Ed25519 signing keys" | Specified | TBD | Low (crypto primitives ready) |
| "SSI Protocol cannot forge signatures on behalf of tenants" | Specified | TBD | Low (key isolation model defined) |
| "Tenants can rotate keys without breaking chain integrity" | Specified | TBD | Medium (backward compatibility) |

**Safe phrasing**:
- ✅ "We're building per-tenant signing keys in Track B3"
- ❌ "Tenants can bring their own keys today"

---

### Track C: Archival & Long-Term Storage

| **Claim** | **Status** | **ETA** | **Risk** |
|---|---|---|---|
| "Audit trails can be archived to IPFS for immutable storage" | Proposed | TBD | Medium (IPFS integration complexity) |
| "Archived chains can be verified independently of the Gateway" | Proposed | TBD | Low (verification logic exists) |

**Safe phrasing**:
- ✅ "We're exploring IPFS archival for regulatory retention"
- ❌ "We integrate with IPFS for cold storage"

---

### Track D: Real-Time Anomaly Detection

| **Claim** | **Status** | **ETA** | **Risk** |
|---|---|---|---|
| "SSI Protocol detects chain breaks in real-time" | Proposed | TBD | High (requires streaming architecture) |
| "Alerts fire automatically on integrity violations" | Proposed | TBD | Medium (alerting infrastructure needed) |

**Safe phrasing**:
- ✅ "We're considering real-time monitoring in future releases"
- ❌ "We provide real-time anomaly detection"

---

## 🔴 FORBIDDEN Claims (Disproven or Impossible)

These claims are **actively false**. Never say these, even if customers ask for them.

### Security Guarantees We Do NOT Provide

| **Forbidden Claim** | **Why It's False** | **What to Say Instead** |
|---|---|---|
| "We prevent AI models from making bad decisions" | SSI logs decisions, doesn't intervene | "We provide tamper-proof audit trails of AI decisions" |
| "We encrypt audit trails end-to-end" | Records are hashed, not encrypted | "We provide cryptographic integrity, not confidentiality" |
| "We're fully compliant with SOC 2/HIPAA/GDPR" | Compliance requires org-level controls | "We provide cryptographic building blocks for compliance" |
| "We store audit trails on a blockchain" | We use hash chains, not distributed consensus | "We use hash chains (like Git) for cryptographic integrity" |
| "Deleted records are unrecoverable" | Deletion leaves gaps, doesn't erase data | "Deletion attempts leave cryptographic evidence" |

---

### Architectural Limits (By Design)

| **Forbidden Claim** | **Why It's False** | **What to Say Instead** |
|---|---|---|
| "We support unlimited throughput" | PostgreSQL has write limits | "We support 10k decisions/sec per tenant (scalable with sharding)" |
| "We never require trust in the operator" | Genesis keys are operator-controlled (until B3) | "We minimize trust requirements (cryptographic verification vs blind trust)" |
| "We're a drop-in replacement for CloudTrail/Splunk" | We're a cryptographic layer, not a full logging stack | "We augment existing logs with cryptographic verification" |
| "We support proof-of-work consensus" | We deliberately avoid blockchain overhead | "We use signed hash chains for efficiency" |

---

### Competitive Claims We Cannot Make

| **Forbidden Claim** | **Why It's False** | **What to Say Instead** |
|---|---|---|
| "We're the only audit trail solution" | Many logging tools exist | "We're the only multi-tenant cryptographic audit solution with 100% test coverage" |
| "We're cheaper than CloudTrail" | No pricing model yet | "We eliminate trust dependencies that CloudTrail requires" |
| "We're faster than X" | No benchmarks yet | "We're designed for <10ms write latency (verification TBD)" |

---

## 📋 Pre-Flight Checklist (Before Making Any Claim)

Before you say anything publicly (blog, pitch, contract, demo), check:

- [ ] **Is this claim in the PROVEN section?** → Safe to say
- [ ] **Is this claim in the PLANNED section?** → Say "we're building" (not "it works")
- [ ] **Is this claim in the FORBIDDEN section?** → Never say it
- [ ] **Is this claim not in the matrix?** → Add it first, get evidence, then decide

---

## 🧠 Claim Safety Examples

### ✅ Safe Claims (Can Use in Contracts)

- "SSI Protocol provides cryptographically verifiable audit trails for AI decisions"
- "Every decision is linked via SHA-256 hash chain and signed with Ed25519"
- "Tampering with records is detectable through chain verification"
- "Multi-tenant isolation is enforced at the database and API layer"
- "Role-based access control limits write permissions to admin users"

### ⚠️ Risky Claims (Technically True but Misleading)

- "We make AI systems compliant" → **Say instead**: "We provide cryptographic tools for compliance programs"
- "We prevent fraud" → **Say instead**: "We detect tampering with audit trails"
- "We're production-ready" → **Say instead**: "We have 26 passing tests; pilots can evaluate production-readiness"

### ❌ False Claims (Never Say)

- "We're SOC 2 certified" → **We're not** (individual orgs get certified, not tools)
- "We replace your existing logging" → **We don't** (we augment it)
- "We're on a blockchain" → **We're not** (we use hash chains without consensus)

---

## 🔄 Maintenance Rules

1. **Update this doc before any external claim** (marketing, sales, legal)
2. **When a test passes, move claim from PLANNED → PROVEN**
3. **When a test fails, move claim from PROVEN → PLANNED** (or fix the bug)
4. **Never delete FORBIDDEN claims** (they protect future decisions)

---

## 🚨 Emergency Override (Founder Discretion)

If a customer asks for a PLANNED feature and you want to build it *now*:

1. Create `[TRACK]_COPILOT_PROMPT.md` with specification
2. Create `[TRACK]_PREFLIGHT_CHECKLIST.md` with security guardrails
3. Write tests first, then implementation
4. Get all tests to EXIT 0
5. Move claim from PLANNED → PROVEN
6. Update this matrix with evidence

**Do NOT skip steps 3–5**, even if the customer is waiting.

---

**End of Document**

*This matrix is your long-term shield.*  
*Protect it like you protect the private keys.*
