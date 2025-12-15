-- Track B2.1: API Key Authentication - Dev Seed
-- ⚠️ DO NOT RUN IN PRODUCTION - DO NOT EXECUTE IN CI/PROD PIPELINES ⚠️
-- This file seeds test API keys for local development and testing only

-- Plaintext test keys for reference (DO NOT USE IN PRODUCTION):
-- Key 1 (tenant-alpha, admin role):    ssi_test_admin_key_alpha_2024
-- Key 2 (tenant-alpha, auditor role):  ssi_test_auditor_key_alpha_2024
-- Key 3 (tenant-beta, viewer role):    ssi_test_viewer_key_beta_2024

-- Insert test API keys (hashes generated with bcrypt cost 10)
INSERT INTO api_keys (key_prefix, key_hash, tenant_id, role, description, expires_at)
VALUES 
  -- Test key 1: admin for tenant-alpha (Track B2.3: POST /v1/decisions requires admin)
  (
    'ssi_test_adm',  -- First 12 chars of ssi_test_admin_key_alpha_2024
    '$2b$10$U.jQY/X5g3/Mh08NpvPPguOHU2281WEOsAPFKw.pvinGpXH4f7kC.',
    'tenant-alpha',
    'admin',
    'Test API key for tenant-alpha with admin role (DEV ONLY)',
    '2026-12-14 00:00:00+00'  -- Expires in 2 years
  ),
  -- Test key 2: auditor for tenant-alpha
  (
    'ssi_test_aud',  -- First 12 chars of ssi_test_auditor_key_alpha_2024
    '$2b$10$Bc04nKw8PGs9ttQqzr76MOYxzKcOdQ.9v9joI2NQrn34PtidHHox.',
    'tenant-alpha',
    'auditor',
    'Test API key for tenant-alpha with auditor role (DEV ONLY)',
    '2026-12-14 00:00:00+00'  -- Expires in 2 years
  ),
  -- Test key 3: viewer for tenant-beta
  (
    'ssi_test_vie',  -- First 12 chars of ssi_test_viewer_key_beta_2024
    '$2b$10$XGu8N8gg4iKlLelTfRKW6.Eb4/I7EW24RD5dKg6NEUGFfrS2scuRy',
    'tenant-beta',
    'viewer',
    'Test API key for tenant-beta with viewer role (DEV ONLY)',
    '2026-12-14 00:00:00+00'  -- Expires in 2 years
  )
ON CONFLICT DO NOTHING;

-- Verify seeded keys
SELECT key_prefix, tenant_id, role, is_active, expires_at, description
FROM api_keys
ORDER BY created_at DESC;
