# Track B1 → B2 Handoff: Ready for Authentication

## ✅ B1 Complete (Committed: b545e39)

**What's Live:**
- ✅ Tenant isolation enforced in database (FK constraints)
- ✅ Separate chain genesis per `(tenant_id, system_id)`
- ✅ Composite indexes for tenant-scoped queries
- ✅ TENANT_MISMATCH break reason in chain verification
- ✅ 5 comprehensive tests (EXIT 0)

**Evidence Locked:**
```
Claim: "Multi-tenant audit chain isolation (tenant-scoped chain anchoring)"
Test: tenant_isolation_test.ts → EXIT 0
Commit: b545e39
```

**Clean Separation:**
- ✅ Prod migration: `002_add_tenant_isolation.sql` (seeds only `'default'`)
- ✅ Dev seed: `002a_seed_dev_tenants.sql` (adds `tenant-alpha/beta` for tests)
- ✅ Documentation: `CLAIM_GATES_TRACK_B.md` + `sql/README.md`

---

## 🎯 B2 Ready to Start

**Strategy:** API keys first (simpler), then JWT, then RBAC gates

**Why This Order:**
1. **API keys** = immediate service-to-service auth (no user management needed)
2. **JWT** = human users + dashboard (requires user identity story)
3. **RBAC** = endpoint protection once identity exists

**Implementation Guide:**
- 📋 Full plan: `TRACK_B2_PLAN.md`
- 🎯 Success criteria: `auth_rbac_test.ts` → EXIT 0
- 🔒 Unlocks: "JWT and API key authentication with tenant binding"

---

## Current System State

**Services Running:**
- Kernel: `localhost:5050` (external PowerShell window)
- Gateway: `localhost:4040` (external PowerShell window)
- Postgres: `localhost:5432` (docker compose)

**Database Schema:**
```
tenants (tenant_id PK, tenant_name, is_active)
  └── default ✅
  └── tenant-alpha ✅ (dev only)
  └── tenant-beta ✅ (dev only)

rpx_entries (rpx_id, tenant_id FK, system_id, chain_hash, ...)
  └── composite indexes: (tenant_id, system_id, created_at/chain_hash)
```

**Auth Status:**
- Current: `x-tenant-id` header OR default to `'default'`
- Next: JWT > API key > x-tenant-id > default

---

## Copilot Prompt for B2 Start

Use this prompt in Copilot Chat inside `reference/gateway`:

```
Track B2: Authentication + tenant binding (Cloud-only)

Context:
- Track B1 complete: tenant isolation enforced via tenant_id + system_id scoping
- Current tenant source: x-tenant-id header (backwards-compatible default)
- Test tenants exist: tenant-alpha, tenant-beta (dev only)

Goal (API key auth first):
1. Create SQL migration 003_add_auth_rbac.sql:
   - api_keys table (key_id, key_hash bcrypt, tenant_id FK, role, expires_at, is_active)
   - roles table (role_name PK, can_write_decisions, can_read_audit, can_manage_tenants)
   - Seed roles: viewer (read-only), auditor (write+read), admin (full)
   - Add FK: api_keys.role → roles.role_name
   - Add FK: api_keys.tenant_id → tenants.tenant_id
   - Add indexes: idx_api_keys_tenant, idx_api_keys_active

2. Implement src/auth/apiKeyAuth.ts:
   - Extract x-api-key header
   - Query active API keys from database
   - Verify key with bcrypt.compare (iterate keys, check hash match)
   - Attach auth context: { tenant_id, role, auth_method: 'api_key' }
   - Return 401 if invalid key

3. Install dependencies:
   - npm install bcrypt @types/bcrypt
   - npm install jsonwebtoken @types/jsonwebtoken (prep for B2.2)

4. Apply migration:
   - docker compose exec -T postgres psql -U ssi_user -d ssi_cloud -f 003_add_auth_rbac.sql

5. Create dev seed script 003a_seed_dev_api_keys.sql:
   - Generate bcrypt hashes for test keys
   - Insert API keys for tenant-alpha (auditor role) and tenant-beta (viewer role)
   - Print plaintext keys to console (for test suite)

Output files:
- sql/003_add_auth_rbac.sql (prod migration)
- sql/003a_seed_dev_api_keys.sql (dev seed)
- src/auth/apiKeyAuth.ts (middleware)
- package.json (updated deps)

Next step after this: Wire apiKeyAuth into server.ts + implement JWT middleware.
```

---

## Test Sequence for B2

After implementation:

```powershell
# 1. Rebuild Gateway
npm run build

# 2. Restart Gateway (external PowerShell window)
# Ctrl+C to stop current Gateway
# Re-run: npm start

# 3. Run test suite
npx ts-node scripts/auth_rbac_test.ts

# Expected: EXIT 0 (all auth tests pass)
```

---

## Deployment Notes

**Prod Strategy:**
- API keys stored as bcrypt hashes (never plaintext)
- JWT secret: 256-bit random hex (`openssl rand -hex 32`)
- Disable dev mode: `ENABLE_INSECURE_DEV=false`
- Require auth for `/v1/decisions` (no default tenant writes)

**Dev Strategy:**
- Seed test API keys in `003a_seed_dev_api_keys.sql`
- Allow `x-tenant-id` header: `ENABLE_INSECURE_DEV=true`
- Use plaintext test keys in test suite

---

## Files Ready for Review

Before starting B2, check these artifacts:

1. ✅ `CLAIM_GATES_TRACK_B.md` - Claim language + evidence standard
2. ✅ `TRACK_B2_PLAN.md` - Full implementation checklist
3. ✅ `sql/README.md` - Migration + seeding philosophy
4. ✅ `sql/002a_seed_dev_tenants.sql` - Dev tenant seed (clean)

**Question for Review:**
- Is the "API key first, JWT second" strategy correct for your use case?
- Should viewer role have NO write access (current plan) or limited write?
- Do you want self-service tenant signup (future) or admin-only tenant creation?

---

**Next Action:** Start B2.1 (API key auth) using the Copilot prompt above. 🚀
