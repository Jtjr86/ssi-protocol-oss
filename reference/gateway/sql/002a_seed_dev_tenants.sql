-- SSI Cloud Track B1: Dev-Only Tenant Seeding
-- Run AFTER 002_add_tenant_isolation.sql in local/dev environments only
-- DO NOT run in pilot/production (tenants should be created via admin API)

-- Seed test tenants for B1.4 test suite
INSERT INTO tenants (tenant_id, tenant_name)
VALUES 
  ('tenant-alpha', 'Tenant Alpha (Test)'),
  ('tenant-beta', 'Tenant Beta (Test)')
ON CONFLICT (tenant_id) DO NOTHING;

-- Confirm seeding
SELECT tenant_id, tenant_name, is_active 
FROM tenants 
ORDER BY created_at;
