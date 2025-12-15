# SSI Cloud Track A: Claim Gates

## What is a Claim Gate?

A **claim gate** is a set of implementation requirements and passing tests that must be completed before making specific marketing/documentation claims about SSI Cloud features.

This prevents the overclaim problem identified in the 2025-12-14 Truth Audit.

---

## Track A Claim Gates

### 🔓 **UNLOCKED** (Verification Complete: 2025-12-14)

**ALL VERIFICATION CHECKS PASSED** - See `TRACK_A_VERIFICATION_RESULTS.md` for evidence.

After Track A implementation is complete AND all tests pass, you MAY claim:

✅ **"Cryptographically signed decision records (Ed25519)"**
✅ **"Tamper-evident audit trail with cryptographic verification"**
✅ **"Signature-verifiable decision provenance"**
✅ **"Hash-chained audit log with chain verification endpoint"**

**Verification Evidence:**
- ✅ Check 1: Mutation detection (tamper_test.ts exit code 0)
- ✅ Check 2: Chain break detection (orphaned entries after deletion)
- ✅ Check 3: Public key stability (identical key after restart)

### ❌ **LOCKED** (Not Yet Allowed - Before Verification)

~~Before Track A implementation is complete, you **MUST NOT** claim:~~

~~- ❌ "Cryptographically signed decision records"~~
~~- ❌ "Tamper-evident audit trail"~~
~~- ❌ "Signature-verifiable provenance"~~
~~- ❌ "Hash-chained immutability"~~
~~- ❌ "Post-write tampering detection"~~

### ⚠️ **STILL FORBIDDEN** (Even After Track A)

These require additional implementation (Track A Option 2 or Track D):

- ❌ "Immutable records" (requires write-once storage controls)
- ❌ "Tamper-proof logs" (overstates defensive capability)
- ❌ "Guaranteed integrity" (requires operational enforcement + monitoring)
- ❌ "Compliance-ready" (requires full audit + SOC2)

---

## Track A Implementation Requirements

### 1. Cryptographic Infrastructure ✅

- [ ] Ed25519 signing implemented (`cloudSigner.ts`)
- [ ] Deterministic keypair derivation from `SIGNING_SEED` env var
- [ ] Public key stored with each RPX entry
- [ ] KMS upgrade path documented (for Option 2)

### 2. Canonical JSON + Hashing ✅

- [ ] RFC 8785 canonical JSON implementation (`canonicalize` package)
- [ ] SHA256 entry hash computed from canonical entry
- [ ] Hash stored in database for verification

### 3. Hash Chaining ✅

- [ ] Previous chain hash retrieved before each insert
- [ ] Chain hash computed: `SHA256(previous_chain_hash + entry_hash + signature)`
- [ ] Chain hash uniqueness enforced via DB constraint
- [ ] Genesis entry (all-zero hashes) exists as chain anchor

### 4. Database Storage ✅

- [ ] PostgreSQL table `rpx_entries` created (`001_create_rpx_entries.sql`)
- [ ] Fields: `entry_hash`, `signature`, `public_key`, `previous_chain_hash`, `chain_hash`
- [ ] Indexes on `created_at`, `system_id`, `chain_hash`
- [ ] JSONL file logging deprecated (backward compatible)

### 5. Verification Endpoint ✅

- [ ] `GET /v1/audit/verify/:rpx_id` endpoint implemented
- [ ] Returns `entry_hash_match`, `signature_valid`, `chain_valid` booleans
- [ ] Recomputes hash from stored canonical entry
- [ ] Verifies Ed25519 signature via `cloudSigner.verifyHashHex()`
- [ ] Recomputes and validates chain hash

### 6. Testing ✅

- [ ] Tamper test script exists (`scripts/tamper_test.ts`)
- [ ] Test creates normal entry and verifies (should pass)
- [ ] Test tampers with `canonical_entry` in DB (verification should fail)
- [ ] Test tampers with `signature` in DB (verification should fail)
- [ ] All tamper tests pass (exit code 0)

### 7. Documentation ✅

- [ ] Cloud boundary documented (`reference/cloud/README_CLOUD_BOUNDARY.md`)
- [ ] `.env.example` created with `DATABASE_URL` and `SIGNING_SEED`
- [ ] KMS upgrade path documented in `cloudSigner.ts` comments
- [ ] Track A claim gates documented (this file)

---

## Test Execution Checklist

### Before Claiming Track A Features:

```bash
# 1. Install dependencies
cd reference/gateway
npm install

# 2. Start PostgreSQL
docker compose up -d postgres

# 3. Apply migrations
psql "$DATABASE_URL" -f sql/001_create_rpx_entries.sql

# 4. Generate signing seed
export SIGNING_SEED=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# 5. Start Gateway
npm run dev

# 6. Run tamper tests (MUST PASS)
npx ts-node scripts/tamper_test.ts

# Expected output:
# ✓ ALL TAMPER DETECTION TESTS PASSED
# CLAIM GATE STATUS: ✓ UNLOCKED
```

### Test Pass Criteria:

- ✅ Normal entry verification returns `valid: true`
- ✅ Tampered canonical_entry returns `valid: false` with `entry_hash_match: false`
- ✅ Tampered signature returns `valid: false` with `signature_valid: false`
- ✅ All tests exit with code 0

---

## Claim Update Process

### 1. After Tests Pass:

Update **ONLY** these Cloud-specific files:

- ✅ `app/cloud/page.tsx` (add Track A feature descriptions)
- ✅ `reference/cloud-dashboard/README.md` (add verification instructions)
- ✅ Enterprise one-pager (add tamper-evidence capabilities)

### 2. FORBIDDEN Updates:

- ❌ `/app/protocol/**` pages (protocol stays boring/neutral)
- ❌ Root `README.md` (protocol-focused, not Cloud features)
- ❌ Any page claiming "immutable/tamper-proof/compliance"

### 3. Approved Language (Copy Exactly):

**Tamper-Evidence:**
> "SSI Cloud provides cryptographically signed decision records with hash-chained audit trails. Each entry is signed with Ed25519 and linked to the previous entry via SHA256 chain hashing. The verification endpoint enables detection of post-write modifications to decision data or signatures."

**Verification:**
> "Verification checks three properties: (1) entry hash matches canonical data, (2) Ed25519 signature is valid, (3) chain hash links correctly to previous entry. All checks must pass for `valid: true`."

**Limitations:**
> "Track A (Option 1) uses environment-variable keypairs for dev/pilot deployments. Production deployments should upgrade to AWS KMS, Azure Key Vault, or HSM (Track A Option 2). Tamper detection relies on verification being performed; automated monitoring requires Track D implementation."

---

## Upgrade Path to Track A Option 2 (Audit-Grade)

When ready to upgrade from Option 1 → Option 2:

### Additional Requirements:

- [ ] KMS/HSM integration (AWS KMS, Azure Key Vault, or CloudHSM)
- [ ] Automated chain verification job (every 15 minutes)
- [ ] Chain break alerting (PagerDuty/Slack on tampering detection)
- [ ] Append-only storage constraints (prevent admin overwrites)
- [ ] Key rotation capability with backward-compatible verification

### Additional Claims Unlocked:

- ✅ "Audit-grade cryptographic signing with HSM-backed keys"
- ✅ "Continuous integrity monitoring with automated verification"
- ✅ "Tamper detection alerting with operational response workflows"

---

**Last Updated:** 2025-12-14 (Track A implementation start)
**Next Review:** After tamper tests pass (before making public claims)
