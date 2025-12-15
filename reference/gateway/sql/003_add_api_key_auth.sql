-- Track B2.1: API Key Authentication
-- Production migration (safe to run in any environment)

-- Create api_keys table for tenant-scoped API key authentication
CREATE TABLE IF NOT EXISTS api_keys (
  key_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  tenant_id TEXT NOT NULL REFERENCES tenants(tenant_id),
  role TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast key_prefix lookup (Guardrail 2: avoid full-table bcrypt scan)
CREATE INDEX IF NOT EXISTS idx_api_keys_prefix_active 
  ON api_keys(key_prefix, is_active, expires_at);

-- Index for tenant-scoped queries
CREATE INDEX IF NOT EXISTS idx_api_keys_tenant 
  ON api_keys(tenant_id);

-- Verify schema
COMMENT ON TABLE api_keys IS 'API keys for tenant-scoped authentication (Track B2.1)';
COMMENT ON COLUMN api_keys.key_prefix IS 'First 12 chars of API key for indexed lookup';
COMMENT ON COLUMN api_keys.key_hash IS 'bcrypt hash of full API key';
COMMENT ON COLUMN api_keys.tenant_id IS 'Tenant this key belongs to';
COMMENT ON COLUMN api_keys.role IS 'Role for RBAC (viewer, auditor, admin)';
