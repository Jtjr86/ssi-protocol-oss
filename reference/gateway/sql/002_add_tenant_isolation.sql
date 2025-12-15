-- SSI Cloud Track B1: Multi-Tenant Isolation
-- Enforces tenant_id on all RPX entries and chains
-- Preserves Track A+ cryptographic verification (no breaking changes)

-- Step 1: Create tenants table FIRST (before FK constraint)
CREATE TABLE IF NOT EXISTS tenants (
  tenant_id TEXT PRIMARY KEY,
  tenant_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Step 2: Insert default tenant (ensures FK target exists)
-- NOTE: For dev/testing, also run 002a_seed_dev_tenants.sql to add tenant-alpha/beta
INSERT INTO tenants (tenant_id, tenant_name) 
VALUES ('default', 'Default Tenant')
ON CONFLICT (tenant_id) DO NOTHING;

-- Step 3: Backfill existing NULL tenant_id values to 'default'
UPDATE rpx_entries SET tenant_id = 'default' WHERE tenant_id IS NULL;

-- Step 4: Make tenant_id NOT NULL with default value
ALTER TABLE rpx_entries 
  ALTER COLUMN tenant_id SET NOT NULL,
  ALTER COLUMN tenant_id SET DEFAULT 'default';

-- Step 5: Add foreign key constraint (ensures referential integrity)
ALTER TABLE rpx_entries 
  ADD CONSTRAINT fk_tenant 
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id);

-- Step 6: Add composite indexes for tenant-scoped queries
-- (tenant_id, system_id, created_at) - for chain lookups per tenant+system
CREATE INDEX idx_rpx_tenant_system_time 
  ON rpx_entries (tenant_id, system_id, created_at DESC);

-- (tenant_id, system_id, chain_hash) - for tenant-scoped chain verification
CREATE INDEX idx_rpx_tenant_system_chain 
  ON rpx_entries (tenant_id, system_id, chain_hash);

-- (tenant_id, chain_hash) - for fast tenant-scoped chain hash lookups
CREATE INDEX idx_rpx_tenant_chain_hash 
  ON rpx_entries (tenant_id, chain_hash);

-- Step 7: Drop old single-column tenant_id index (superseded by composites)
DROP INDEX IF EXISTS idx_rpx_tenant_id;

-- Step 8: Update verification view to include tenant isolation
DROP VIEW IF EXISTS rpx_chain_verification;
CREATE VIEW rpx_chain_verification AS
SELECT 
  r.rpx_id,
  r.tenant_id,
  r.system_id,
  r.created_at,
  r.entry_hash,
  r.signature,
  r.public_key,
  r.previous_chain_hash,
  r.chain_hash,
  prev.chain_hash as expected_previous_hash,
  -- Chain link check: MUST match within same tenant
  (prev.chain_hash IS NULL OR prev.chain_hash = r.previous_chain_hash) as chain_linked
FROM rpx_entries r
LEFT JOIN rpx_entries prev 
  ON prev.chain_hash = r.previous_chain_hash
  AND prev.tenant_id = r.tenant_id  -- CRITICAL: Tenant boundary enforcement
ORDER BY r.tenant_id, r.system_id, r.created_at ASC;

-- Step 9: Add comments for clarity
COMMENT ON COLUMN rpx_entries.tenant_id IS 
  'Track B: Tenant isolation - each tenant has independent chain(s) per system_id';
COMMENT ON TABLE tenants IS 
  'Track B: Tenant registry for multi-tenant isolation';
COMMENT ON INDEX idx_rpx_tenant_system_time IS 
  'Track B: Optimizes per-tenant chain lookups (previous_chain_hash resolution)';
COMMENT ON INDEX idx_rpx_tenant_system_chain IS 
  'Track B: Optimizes tenant-scoped chain verification queries';

-- Migration complete
-- Existing data preserved (tenant_id = 'default')
-- Track A+ cryptographic verification unchanged
-- Genesis entry per (tenant_id, system_id) will be enforced at application layer
