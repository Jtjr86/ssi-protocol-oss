# SSI Gateway: SQL Migrations

## Migration Strategy

**Prod migrations** (required for all environments):
- `001_create_rpx_entries.sql` - Core RPX audit log schema
- `002_add_tenant_isolation.sql` - Tenant isolation (seeds only `'default'` tenant)
- `003_add_auth_rbac.sql` - Auth + RBAC (future)
- `004_add_tenant_keys.sql` - Per-tenant signing keys (future)

**Dev-only seeds** (local/testing only):
- `002a_seed_dev_tenants.sql` - Add tenant-alpha, tenant-beta for B1.4 tests
- `003a_seed_dev_api_keys.sql` - Add test API keys for B2.1 tests (⚠️ **DO NOT RUN IN PRODUCTION - DO NOT EXECUTE IN CI/PROD PIPELINES**)

## Running Migrations

### Local Dev (Docker Compose)

```powershell
# Run prod migrations
docker compose exec -T postgres psql -U ssi_user -d ssi_cloud -f - < sql/001_create_rpx_entries.sql
docker compose exec -T postgres psql -U ssi_user -d ssi_cloud -f - < sql/002_add_tenant_isolation.sql

# Run dev seeds
Get-Content sql/002a_seed_dev_tenants.sql | docker compose exec -T postgres psql -U ssi_user -d ssi_cloud
```

### Pilot/Production

```bash
# Connect to managed Postgres instance
psql $DATABASE_URL

# Run prod migrations only (NO dev seeds)
\i 001_create_rpx_entries.sql
\i 002_add_tenant_isolation.sql

# Add tenants via admin API (future: B2.3)
# DO NOT manually seed tenant-alpha/beta in prod
```

## Tenant Seeding Philosophy

**Production:** Only `'default'` tenant seeded in migration. All other tenants created via:
1. Admin API (future: B2.3 tenant management)
2. Self-service signup (future: Cloud dashboard)
3. Manual SQL by ops team (discouraged, use API)

**Dev/Testing:** Seed `tenant-alpha` and `tenant-beta` for test suite consistency.
- Allows `tenant_isolation_test.ts` to run without setup
- Clearly marked as "Test" in tenant names
- Can be dropped/recreated safely

## Schema Ownership

All migrations owned by **Gateway** (Cloud-only feature).
- Kernel has NO tenant awareness (evaluates envelopes only)
- Protocol spec has NO tenant concept (SSI purity preserved)
- Cloud layer adds multi-tenancy for audit log isolation

## Rollback Strategy

Not implemented yet. For now:
1. Backup before migration: `pg_dump ssi_cloud > backup.sql`
2. Manual rollback if needed: `psql ssi_cloud < backup.sql`
3. Future: Add `DOWN` migrations for automated rollback

## Idempotency

All migrations use:
- `CREATE TABLE IF NOT EXISTS`
- `ON CONFLICT DO NOTHING` for inserts
- `DROP INDEX IF EXISTS` before recreates

Safe to re-run migrations multiple times.
