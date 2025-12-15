-- SSI Cloud Track A: Tamper-Evident Audit Trail
-- Creates PostgreSQL table for cryptographically signed, hash-chained RPX entries

CREATE TABLE IF NOT EXISTS rpx_entries (
  -- Core identifiers
  rpx_id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Multi-tenancy (Track B readiness)
  tenant_id TEXT, -- NULL for Track A; enforced in Track B
  system_id TEXT NOT NULL,
  
  -- Cryptographic fields (Track A)
  entry_hash TEXT NOT NULL, -- SHA256 of canonical_entry
  signature TEXT NOT NULL, -- Ed25519 signature of entry_hash
  public_key TEXT NOT NULL, -- Public key for signature verification
  previous_chain_hash TEXT NOT NULL, -- Links to previous entry
  chain_hash TEXT NOT NULL UNIQUE, -- SHA256(prev_hash + entry_hash + sig)
  
  -- Decision data (queryable)
  canonical_entry TEXT NOT NULL, -- RFC 8785 canonical JSON (for re-hashing)
  request_json JSONB NOT NULL,
  decision_json JSONB NOT NULL,
  envelope_json JSONB NOT NULL,
  
  -- Query optimization indexes
  CONSTRAINT unique_chain_hash UNIQUE (chain_hash)
);

-- Performance indexes
CREATE INDEX idx_rpx_created_at ON rpx_entries (created_at DESC);
CREATE INDEX idx_rpx_system_id ON rpx_entries (system_id, created_at DESC);
CREATE INDEX idx_rpx_tenant_id ON rpx_entries (tenant_id, created_at DESC); -- Track B ready
CREATE INDEX idx_rpx_chain_link ON rpx_entries (previous_chain_hash, chain_hash);
CREATE INDEX idx_rpx_chain_hash_lookup ON rpx_entries (chain_hash); -- Track A+ chain verification

-- Genesis entry (chain anchor)
-- All chains start from this zero-hash entry
INSERT INTO rpx_entries (
  rpx_id, 
  created_at, 
  tenant_id,
  system_id,
  entry_hash, 
  signature, 
  public_key,
  previous_chain_hash, 
  chain_hash,
  canonical_entry,
  request_json,
  decision_json,
  envelope_json
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '2025-12-14T00:00:00Z',
  NULL,
  'genesis',
  '0000000000000000000000000000000000000000000000000000000000000000',
  'genesis_signature',
  'genesis_public_key',
  '0000000000000000000000000000000000000000000000000000000000000000',
  '0000000000000000000000000000000000000000000000000000000000000000',
  '{"genesis": true}',
  '{}'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb
) ON CONFLICT (rpx_id) DO NOTHING;

-- Verification view (simplified query for chain validation)
CREATE OR REPLACE VIEW rpx_chain_verification AS
SELECT 
  r.rpx_id,
  r.created_at,
  r.entry_hash,
  r.signature,
  r.public_key,
  r.previous_chain_hash,
  r.chain_hash,
  prev.chain_hash as expected_previous_hash,
  (prev.chain_hash IS NULL OR prev.chain_hash = r.previous_chain_hash) as chain_linked
FROM rpx_entries r
LEFT JOIN rpx_entries prev ON prev.chain_hash = r.previous_chain_hash
ORDER BY r.created_at ASC;

COMMENT ON TABLE rpx_entries IS 'SSI Cloud: Cryptographically signed, hash-chained decision records (Track A)';
COMMENT ON COLUMN rpx_entries.entry_hash IS 'SHA256 hash of canonical_entry (deterministic)';
COMMENT ON COLUMN rpx_entries.signature IS 'Ed25519 signature of entry_hash';
COMMENT ON COLUMN rpx_entries.chain_hash IS 'SHA256(previous_chain_hash + entry_hash + signature) - enforces chain ordering';
COMMENT ON COLUMN rpx_entries.canonical_entry IS 'RFC 8785 canonical JSON - used for hash verification';
