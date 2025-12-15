# SSI Cloud Track B: Claim Gates (Evidence-Locked)

**Status:** Cloud-only features (does NOT modify core SSI Protocol)

## Track B1: Multi-Tenant Isolation ✅ UNLOCKED

**Claim:** "Multi-tenant audit chain isolation (tenant-scoped chain anchoring)"

**Evidence:**
- ✅ Schema migration: `002_add_tenant_isolation.sql` enforces `tenant_id NOT NULL`
- ✅ Foreign key constraint: Caught missing tenants (tenant-alpha/beta) at INSERT time
- ✅ Composite indexes: `(tenant_id, system_id, created_at/chain_hash)` for scoped queries
- ✅ Chain verification: `TENANT_MISMATCH` break reason prevents cross-tenant chaining
- ✅ Per-tenant genesis: Separate chain roots for each `(tenant_id, system_id)` pair
- ✅ Test suite: `tenant_isolation_test.ts` - **EXIT 0** (all 5 tests passed)

**Scope:**
- Tenant isolation enforced in **Gateway + audit verification endpoints**
- Protocol kernel remains tenant-agnostic (evaluates envelopes, no tenant context)
- Backwards compatible: `x-tenant-id` header defaults to `'default'` when omitted

**Test Coverage:**
1. Create entries for tenant-alpha and tenant-beta (same system_id)
2. Verify tenant-alpha chain is anchored and isolated
3. Verify tenant-beta chain is anchored and isolated
4. Database-level isolation (no cross-tenant chain links)
5. Default tenant backwards compatibility (no header required)

**Commit:** `b545e39` - feat(cloud): Track B1 - tenant isolation

---

## Track B2: Authentication + RBAC ⏳ IN PROGRESS

### Track B2.1: API Key Authentication ✅ UNLOCKED

**Claim:** "API key authentication with tenant-scoped enforcement"

**Evidence:**
- ✅ Schema migration: `003_add_api_key_auth.sql` creates `api_keys` table with `key_prefix` for fast lookup
- ✅ Indexed lookup: Query by `key_prefix` (O(1)) before bcrypt.compare (Guardrail 2 - no full-table scan)
- ✅ Tenant override: API key `tenant_id` wins over `x-tenant-id` header (Guardrail 3 - prevents spoofing)
- ✅ Per-route auth: `/v1/decisions` protected (not global lockdown), allows `ENABLE_INSECURE_DEV` bypass (Guardrail 4)
- ✅ Dev seed safety: Plaintext keys only in SQL comments, marked "DO NOT USE IN PRODUCTION" (Guardrail 1)
- ✅ Test suite: `auth_api_key_test.ts` - **EXIT 0** (all 5 tests passed)
- ✅ No regression: `tenant_isolation_test.ts` - **EXIT 0** (B1 tests still passing)

**Scope:**
- API key auth via `x-api-key` header
- Role attached to request: `req.auth.role` (viewer, auditor, admin)
- Tenant identity from API key: `req.auth.tenant_id` (cannot be spoofed via header)
- Auth method tracked: `req.auth.auth_method = 'api_key'`

**Test Coverage:**
1. Valid API key (auditor) allows write
2. Invalid API key rejected with 401
3. Dev mode allows unauthenticated write (backwards compat)
4. Viewer API key allows audit read
5. API key tenant overrides x-tenant-id header

**Commit:** `dd48bbf` - feat(cloud): Track B2.1 - API key auth (tenant-scoped, test-gated)

---

### Track B2.2: JWT Authentication ✅ UNLOCKED

**Claim:** "JWT authentication with tenant-scoped claims"

**Evidence:**
- ✅ JWT middleware: `jwtAuth.ts` with jwt.verify() and proper error handling (Guardrail 2)
- ✅ Precedence enforced: JWT before API key (JWT wins if both present) (Guardrail 3)
- ✅ Error handling: TOKEN_EXPIRED, INVALID_TOKEN, MALFORMED_TOKEN, INVALID_TOKEN_CLAIMS, INVALID_ROLE
- ✅ Claims validation: tenant_id, role, sub all required (Guardrail 4)
- ✅ Role whitelist: Only 'viewer', 'auditor', 'admin' allowed
- ✅ Secret management: JWT_SECRET from process.env (Guardrail 1)
- ✅ Test suite: `jwt_auth_test.ts` - **EXIT 0** (all 5 tests passed) (Guardrail 5 - real jwt.sign())
- ✅ No regression: `auth_api_key_test.ts` + `tenant_isolation_test.ts` - **EXIT 0**

**Scope:**
- JWT auth via `Authorization: Bearer <token>` header
- Token payload: { sub, tenant_id, role, exp, iat }
- Signature verification with jwt.verify() (not decode())
- Auth method tracked: `req.auth.auth_method = 'jwt'`
- Fallthrough pattern: If no JWT, try API key; if no API key, use x-tenant-id header

**Test Coverage:**
1. Valid JWT (future expiry) → 200 OK with authenticated decision
2. Expired JWT (past expiry) → 401 TOKEN_EXPIRED
3. Invalid signature (wrong secret) → 401 INVALID_TOKEN
4. Missing JWT + valid API key → 200 OK (API key fallback works)
5. JWT with tenant-alpha + header tenant-beta → uses tenant-alpha (JWT wins)

**Guardrails Enforced:**
1. JWT_SECRET from environment variable (no hardcoded secrets)
2. jwt.verify() with TokenExpiredError/JsonWebTokenError handling (not decode())
3. JWT middleware before API key middleware (precedence)
4. Required claims validated: tenant_id, role, sub; role in allowed list
5. Test suite uses real jwt.sign() with actual secret (not mocks)

**Safe to Claim:**
- ✅ "JWT authentication with tenant-scoped claims"
- ✅ "Stateless authentication with signature verification"
- ✅ "Token expiry enforcement (401 TOKEN_EXPIRED)"
- ✅ "Auth method precedence: JWT > API key > header fallback"

**NOT Safe to Claim:**
- ❌ "User management" (out of scope - JWT payload externally issued)
- ❌ "Session management" (JWT is stateless, no session storage)

**Commit:** `239c602` - feat(cloud): Track B2.2 - JWT auth (stateless, test-gated)

---

### Track B2.3: RBAC Middleware ✅ UNLOCKED

**Claim:** "Role-based access control with tenant-scoped permissions"

**Evidence:**
- ✅ RBAC middleware: `rbac.ts` with `requireAuth` and `requireRole` functions (Guardrails 2, 3)
- ✅ Protected endpoints: POST /v1/decisions (admin only), GET /v1/audit/verify-chain (auditor+), GET /v1/audit/verify (viewer+)
- ✅ Dev mode bypass: `ENABLE_INSECURE_DEV === 'true'` allows unauthenticated (Guardrail 1)
- ✅ Correct HTTP status codes: 401 for missing auth, 403 for insufficient permissions (Guardrail 4)
- ✅ Explicit role lists: No wildcards, only explicit arrays like `['admin']`, `['auditor', 'admin']` (Guardrail 3)
- ✅ Test suite: `rbac_test.ts` - **EXIT 0** (all 6 tests passed) (Guardrail 5 - real JWT/API keys)
- ✅ No regression: `jwt_auth_test.ts` + `auth_api_key_test.ts` + `tenant_isolation_test.ts` - **EXIT 0**

**Scope:**
- Role enforcement on protected routes (viewer < auditor < admin hierarchy)
- Per-endpoint role requirements (not global lockdown)
- Dev mode bypass for backwards compatibility (testing/development)
- Role comes from JWT claims or API key database row

**Test Coverage:**
1. Viewer cannot POST /v1/decisions → 403 INSUFFICIENT_PERMISSIONS
2. Admin can POST /v1/decisions → 200 OK with decision
3. Viewer can GET /v1/audit/verify → 200 OK (lowest privilege audit access)
4. Viewer cannot GET /v1/audit/verify-chain → 403 INSUFFICIENT_PERMISSIONS
5. Auditor can GET /v1/audit/verify-chain → 200 OK (chain verification privilege)
6. Dev mode allows unauthenticated write (backwards compat)

**Guardrails Enforced:**
1. Dev mode bypass ONLY for `ENABLE_INSECURE_DEV === 'true'` (exact match)
2. Role check AFTER auth check (`requireAuth` before `requireRole` in route definitions)
3. Explicit role lists (no wildcards like `'*'` or empty arrays)
4. 403 for insufficient permissions (not 401), 401 for missing/invalid auth
5. Test suite uses real `jwt.sign()` and seeded API keys (no mocks)

**Safe to Claim:**
- ✅ "Role-based access control with tenant-scoped permissions"
- ✅ "Least-privilege enforcement (viewer < auditor < admin)"
- ✅ "Protected audit endpoints (verify-chain requires auditor+)"
- ✅ "Admin-only decision writes (unless dev mode enabled)"

**NOT Safe to Claim:**
- ❌ "Dynamic role assignment" (roles stored in JWT/API key, not managed by Gateway)
- ❌ "Role hierarchy inheritance" (no nested roles, flat allow lists only)
- ❌ "Per-tenant role customization" (roles are global, not tenant-specific)

**Commit:** `fa221b0` - feat(cloud): Track B2.3 - RBAC middleware (role-based access control)

---

## Track B3: Per-Tenant Signing Keys ⏳ NEXT

**Claim:** "Role-based access control with tenant-scoped permissions"

**Requirements:**
- [ ] Roles table: Define permissions (can_write_decisions, can_read_audit, can_manage_tenants)
- [ ] RBAC middleware: `requireAuth`, `requireRole('auditor')` guards
- [ ] Protect `/v1/decisions`: Requires `auditor` or `admin` role
- [ ] Protect `/v1/audit/*`: Requires `viewer`, `auditor`, or `admin` role
- [ ] Test suite: `rbac_test.ts` - **EXIT 0** required

**Evidence Required:**
- SQL migration: `004_add_rbac_roles.sql` (roles table)
- RBAC middleware: `src/auth/rbac.ts`
- Updated: `src/server.ts` (role enforcement on protected routes)
- Test results: Viewer cannot write (403), auditor can write, cross-tenant denied (403)

**Status:** Blocked by B2.2 (needs JWT auth first for full precedence chain)

---

## Track B3: Per-Tenant Signing Keys ⏳ PENDING

**Claim:** "Per-tenant cryptographic signing keys (Ed25519)"

**Requirements:**
- [ ] Schema: `tenant_keys` table (tenant_id → public_key)
- [ ] Signing: Replace global `cloudSigner` with per-tenant key lookup
- [ ] Verification: Validate signatures against tenant-specific public keys
- [ ] Test suite: `tenant_keys_test.ts` - **EXIT 0** required

**Evidence Required:**
- SQL migration: `004_add_tenant_keys.sql`
- Updated: `src/cloudSigner.ts` (tenant-scoped key derivation)
- Test results: Cross-tenant signature validation fails

**Status:** Blocked by B2 (needs tenant identity enforcement first)

---

## Claim Language Guidelines (Cloud Pages Only)

## Claim Language Guidelines (Cloud Pages Only)

### ✅ Safe to claim (after B2.1):
- "Multi-tenant audit chain isolation (tenant-scoped chain anchoring)"
- "Tenant-scoped chain verification (anchored vs orphaned per tenant)"
- "Separate genesis roots per (tenant_id, system_id) pair"
- **"API key authentication with tenant-scoped enforcement"** ← NEW (B2.1)
- **"Tenant identity derived from API key (header spoofing prevented)"** ← NEW (B2.1)
- **"Role value attached to requests (RBAC enforcement comes in B2.3)"** ← NEW (B2.1)

### ❌ Avoid claiming (until B2.2/B2.3 complete):
- "JWT authentication" (Track B2.2 - not started yet)
- "Role-based access control (RBAC)" (Track B2.3 - roles not enforced yet)
- "Enterprise authentication" (requires operational evidence)

### ✅ Safe to claim (after B2):
- "JWT and API key authentication with tenant binding"
- "Role-based access control (viewer, auditor, admin roles)"
- "Authenticated tenant enforcement for decision logging"

### ✅ Safe to claim (after B3):
- "Per-tenant Ed25519 signing keys"
- "Cryptographic proof of tenant-specific signatures"

### ❌ Avoid claiming (until operational evidence):
- "Full tenant security" (requires monitoring, key rotation, breach response)
- "Enterprise-grade isolation" (requires compliance audits, SLAs, incident response)
- "Production-ready multi-tenancy" (requires load testing, failover, DR)

---

## Testing Evidence Standard

Each Track B unlock requires:
1. ✅ **EXIT 0** from test suite (no failures, no skips)
2. ✅ **Failure modes tested** (invalid creds, missing tenants, cross-tenant access)
3. ✅ **Backwards compatibility** (existing default tenant still works)
4. ✅ **Database constraints enforced** (FK violations caught at write time)

---

## Deployment Strategy

**Dev/Local:**
- Use seeded test tenants: `tenant-alpha`, `tenant-beta`
- Allow `x-tenant-id` header without auth (ENABLE_INSECURE_DEV=true)

**Pilot/Prod:**
- Require JWT or API key for all `/v1/decisions` writes
- Seed only `'default'` tenant in migration
- Add tenants via admin API (future: B2.3 tenant management)

---

**Last Updated:** 2025-12-14  
**Current Milestone:** Track B2.1 ✅ COMPLETE (API key auth - EXIT 0)  
**Next Milestone:** Track B2.2 (JWT auth) - Target: Next session
