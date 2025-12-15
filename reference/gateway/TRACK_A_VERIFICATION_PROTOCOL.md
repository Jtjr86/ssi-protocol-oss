# Track A Verification Protocol

**Date:** 2025-12-14  
**Purpose:** Validate cryptographic tamper-evidence before claim unlock  
**Status:** 🟡 PENDING EXECUTION  

---

## Critical Validation Framework

Before ANY claim updates are permitted, all three checks below must pass with documented evidence.

---

## ✅ Check 1: Signature Failure on Mutation

**Hypothesis:** Modifying any byte of `canonical_entry` breaks cryptographic verification

### Test Procedure:

```bash
# 1. Start environment
cd reference/gateway
docker compose up -d postgres
npm run dev

# 2. Generate test decision
cd ../client-trader
node dist/ssi-client-enforced.js

# 3. Verify normal record (should pass)
curl http://localhost:4040/v1/audit/verify/<RPX_ID>
# Expected: { "valid": true, "checks": { "entry_hash_match": true, "signature_valid": true, "chain_valid": true } }

# 4. Tamper with canonical_entry in DB
psql "$DATABASE_URL" -c "UPDATE rpx_entries SET canonical_entry = '{}' WHERE rpx_id = '<RPX_ID>'"

# 5. Verify tampered record (should fail)
curl http://localhost:4040/v1/audit/verify/<RPX_ID>
# Expected: { "valid": false, "checks": { "entry_hash_match": false, "signature_valid": false } }
```

### Pass Criteria:

- ✅ `valid: false`
- ✅ `entry_hash_match: false` (hash no longer matches modified data)
- ✅ `signature_valid: false` (signature now invalid for new hash)

### Evidence Required:

- Screenshot or JSON output showing `valid: false` after tampering
- Postgres query showing modified `canonical_entry` value
- API response confirming all three checks failed

---

## ✅ Check 2: Chain Break Detection

**Hypothesis:** Deleting/reordering records breaks chain integrity for ALL subsequent records

### Test Procedure:

```bash
# 1. Create 5+ chained decisions
for i in {1..5}; do
  cd reference/client-trader
  node dist/ssi-client-enforced.js
  sleep 2
done

# 2. Verify all records pass (baseline)
psql "$DATABASE_URL" -c "SELECT rpx_id, created_at FROM rpx_entries ORDER BY created_at;"
# For each rpx_id: curl http://localhost:4040/v1/audit/verify/<RPX_ID>
# Expected: All return valid=true

# 3. Delete middle record (e.g., record 3 of 5)
psql "$DATABASE_URL" -c "DELETE FROM rpx_entries WHERE rpx_id = '<MIDDLE_RPX_ID>'"

# 4. Verify chain break propagates
# Record 4: curl http://localhost:4040/v1/audit/verify/<RECORD_4_RPX_ID>
# Expected: valid=false, chain_valid=false (previous_chain_hash no longer exists)

# Record 5: curl http://localhost:4040/v1/audit/verify/<RECORD_5_RPX_ID>
# Expected: valid=false, chain_valid=false (cascading failure)
```

### Pass Criteria:

- ✅ Records BEFORE deletion remain valid
- ✅ Record AFTER deletion fails with `chain_valid: false`
- ✅ ALL subsequent records fail (proves global chain integrity)

### Alternative Test (Hash Swap):

```bash
# Instead of deletion, swap previous_chain_hash values between two records
psql "$DATABASE_URL" -c "
  UPDATE rpx_entries 
  SET previous_chain_hash = (SELECT previous_chain_hash FROM rpx_entries WHERE rpx_id = '<OTHER_RPX_ID>') 
  WHERE rpx_id = '<TARGET_RPX_ID>'
"

# Verify: Both records fail chain_valid check
```

### Evidence Required:

- List of all RPX IDs with timestamps (before deletion)
- Postgres DELETE/UPDATE statement showing chain break
- API responses showing cascading failure for all downstream records

---

## ✅ Check 3: Public Key Stability

**Hypothesis:** Public key is deterministic across Gateway restarts (same seed → same key)

### Test Procedure:

```bash
# 1. Start Gateway and capture public key
cd reference/gateway
npm run dev

# Extract public key from any signed entry:
psql "$DATABASE_URL" -c "SELECT public_key FROM rpx_entries WHERE rpx_id != '00000000-0000-0000-0000-000000000000' LIMIT 1;"
# Save as PUBLIC_KEY_1

# 2. Create decision and verify
cd ../client-trader
node dist/ssi-client-enforced.js
# Save RPX_ID_1
curl http://localhost:4040/v1/audit/verify/<RPX_ID_1>
# Expected: valid=true

# 3. Stop Gateway
# Ctrl+C in Gateway terminal

# 4. Restart Gateway (same SIGNING_SEED in .env)
cd reference/gateway
npm run dev

# 5. Extract public key again
psql "$DATABASE_URL" -c "SELECT public_key FROM rpx_entries ORDER BY created_at DESC LIMIT 1;"
# Save as PUBLIC_KEY_2

# 6. Verify old record still validates
curl http://localhost:4040/v1/audit/verify/<RPX_ID_1>
# Expected: valid=true (proves key stability)

# 7. Compare keys
echo "Key 1: $PUBLIC_KEY_1"
echo "Key 2: $PUBLIC_KEY_2"
# Expected: IDENTICAL
```

### Pass Criteria:

- ✅ Public key is identical before and after restart
- ✅ Previously signed records still verify as valid
- ✅ New records use same public key (proves deterministic derivation)

### Failure Scenario (MUST FIX):

If public key changes after restart:

- ❌ SIGNING_SEED is not being read correctly
- ❌ Random key generation is happening (CRITICAL BUG)
- ❌ All previous records become unverifiable
- ❌ **CLAIM UNLOCK BLOCKED UNTIL FIXED**

### Evidence Required:

- Public key value from first Gateway run
- Public key value from second Gateway run
- API response showing old record still verifies after restart
- Confirmation that both keys match exactly

---

## Automated Test Script

For convenience, create `scripts/verify_track_a.sh`:

```bash
#!/bin/bash
set -e

echo "🔐 TRACK A VERIFICATION SUITE"
echo "=============================="

# Check 1: Mutation Detection
echo ""
echo "✅ Check 1: Signature Failure on Mutation"
npx ts-node scripts/tamper_test.ts
if [ $? -eq 0 ]; then
  echo "✅ PASS: Mutation detection working"
else
  echo "❌ FAIL: Tamper test did not pass"
  exit 1
fi

# Check 2: Chain Break Detection
echo ""
echo "✅ Check 2: Chain Break Detection"
# (Manual verification required - automated in Track A+)
echo "⚠️  MANUAL: Delete middle record and verify cascading failure"

# Check 3: Public Key Stability
echo ""
echo "✅ Check 3: Public Key Stability"
KEY_BEFORE=$(psql "$DATABASE_URL" -t -c "SELECT public_key FROM rpx_entries WHERE rpx_id != '00000000-0000-0000-0000-000000000000' LIMIT 1;")
echo "Public key: $KEY_BEFORE"
echo "⚠️  MANUAL: Restart Gateway and verify key remains identical"

echo ""
echo "=============================="
echo "🎯 CLAIM UNLOCK STATUS: Pending manual verification of Checks 2 & 3"
```

---

## Verification Results Template

After running all checks, document results in `TRACK_A_VERIFICATION_RESULTS.md`:

```markdown
# Track A Verification Results

**Date:** 2025-12-14  
**Operator:** [Your Name]  
**Environment:** Local Dev (Docker Compose)  

---

## Check 1: Signature Failure on Mutation

- **Status:** ✅ PASS / ❌ FAIL  
- **Evidence:** [Link to screenshot / JSON output]  
- **Notes:** [Any observations]

---

## Check 2: Chain Break Detection

- **Status:** ✅ PASS / ❌ FAIL  
- **Records Tested:** [List RPX IDs]  
- **Evidence:** [API responses showing cascading failure]  
- **Notes:** [Any observations]

---

## Check 3: Public Key Stability

- **Status:** ✅ PASS / ❌ FAIL  
- **Public Key (Run 1):** [hex value]  
- **Public Key (Run 2):** [hex value]  
- **Match:** ✅ YES / ❌ NO  
- **Evidence:** [API response showing old record still verifies]

---

## FINAL VERDICT

- **All Checks Passed:** ✅ YES / ❌ NO  
- **Claim Unlock:** ✅ APPROVED / ❌ BLOCKED  
- **Blocking Issues:** [List any failures]  

---

**Signature:** [Your Name]  
**Timestamp:** [ISO 8601]  
```

---

## Claim Unlock Approval

**IF AND ONLY IF** all three checks pass:

1. Update `CLAIM_GATES_TRACK_A.md` status to **🔓 UNLOCKED**
2. Update `app/cloud/page.tsx` with approved language (CLOUD ONLY)
3. Update `reference/cloud-dashboard/README.md` with verification instructions
4. Commit with message: `feat(cloud): unlock Track A cryptographic claims [claim-gate-passed]`

**IF ANY CHECK FAILS:**

1. Document failure in `TRACK_A_VERIFICATION_RESULTS.md`
2. Create GitHub issue with failure details
3. **DO NOT UPDATE ANY CLAIM LANGUAGE**
4. Fix issue and re-run all three checks

---

**Next Step:** Execute verification sequence and document results.

🫡 Standing by for verification execution.
