# Track B2: Authentication + RBAC Implementation Plan

**Goal:** Secure Gateway endpoints with JWT/API key auth + role-based access control

**Test Exit Criteria:** `auth_rbac_test.ts` must exit 0 (all tests pass)

---

## B2.1: API Key Authentication

### SQL Migration (`003_add_auth_rbac.sql`)

```sql
-- API keys table (hashed for security)
CREATE TABLE IF NOT EXISTS api_keys (
  key_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_hash TEXT NOT NULL UNIQUE,  -- bcrypt hash of api_key
  tenant_id TEXT NOT NULL REFERENCES tenants(tenant_id),
  role TEXT NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  description TEXT
);

CREATE INDEX idx_api_keys_tenant ON api_keys(tenant_id);
CREATE INDEX idx_api_keys_active ON api_keys(is_active, expires_at);

-- Roles table (define available roles)
CREATE TABLE IF NOT EXISTS roles (
  role_name TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  can_write_decisions BOOLEAN NOT NULL DEFAULT false,
  can_read_audit BOOLEAN NOT NULL DEFAULT true,
  can_manage_tenants BOOLEAN NOT NULL DEFAULT false
);

-- Seed default roles
INSERT INTO roles (role_name, description, can_write_decisions, can_read_audit, can_manage_tenants)
VALUES 
  ('viewer', 'Read-only access to audit logs', false, true, false),
  ('auditor', 'Write decisions + read audit logs', true, true, false),
  ('admin', 'Full access including tenant management', true, true, true)
ON CONFLICT (role_name) DO NOTHING;

-- Add FK constraint to api_keys
ALTER TABLE api_keys 
  ADD CONSTRAINT fk_api_key_role 
  FOREIGN KEY (role) REFERENCES roles(role_name);
```

### Middleware Implementation

**File:** `src/auth/apiKeyAuth.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { query } from '../db';

export interface AuthContext {
  tenant_id: string;
  role: string;
  auth_method: 'api_key' | 'jwt' | 'header' | 'default';
}

export async function apiKeyAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    // No API key provided, try next auth method (JWT)
    return next();
  }

  try {
    // Query for matching key_hash
    const result = await query<{
      tenant_id: string;
      role: string;
      is_active: boolean;
      expires_at: string | null;
    }>(
      `SELECT tenant_id, role, is_active, expires_at 
       FROM api_keys 
       WHERE key_hash = $1`,
      [await bcrypt.hash(apiKey, 10)]  // WRONG: Should query first, then verify
    );

    // CORRECT IMPLEMENTATION: Query all active keys, verify hash
    const keys = await query<{
      key_hash: string;
      tenant_id: string;
      role: string;
      expires_at: string | null;
    }>(
      `SELECT key_hash, tenant_id, role, expires_at
       FROM api_keys
       WHERE is_active = true
       AND (expires_at IS NULL OR expires_at > NOW())`
    );

    let matchedKey: typeof keys.rows[0] | null = null;
    for (const key of keys.rows) {
      if (await bcrypt.compare(apiKey, key.key_hash)) {
        matchedKey = key;
        break;
      }
    }

    if (!matchedKey) {
      res.status(401).json({ error: 'INVALID_API_KEY' });
      return;
    }

    // Attach auth context to request
    (req as any).auth = {
      tenant_id: matchedKey.tenant_id,
      role: matchedKey.role,
      auth_method: 'api_key'
    } as AuthContext;

    next();
  } catch (err) {
    console.error('[apiKeyAuth] Error:', err);
    res.status(500).json({ error: 'AUTH_ERROR' });
  }
}
```

### Install Dependencies

```powershell
cd reference/gateway
npm install bcrypt @types/bcrypt
npm install jsonwebtoken @types/jsonwebtoken
```

---

## B2.2: JWT Authentication

**File:** `src/auth/jwtAuth.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthContext } from './apiKeyAuth';

const JWT_SECRET = process.env.JWT_SECRET || 'INSECURE_DEV_SECRET';

export interface JWTPayload {
  tenant_id: string;
  role: string;
  sub: string;  // user_id
  iat: number;
  exp: number;
}

export async function jwtAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    // No JWT provided, try next auth method (x-tenant-id header)
    return next();
  }

  const token = authHeader.substring(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // Attach auth context to request
    (req as any).auth = {
      tenant_id: payload.tenant_id,
      role: payload.role,
      auth_method: 'jwt'
    } as AuthContext;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'INVALID_JWT', message: err.message });
    } else if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'EXPIRED_JWT' });
    } else {
      console.error('[jwtAuth] Error:', err);
      res.status(500).json({ error: 'AUTH_ERROR' });
    }
  }
}
```

---

## B2.3: RBAC Middleware

**File:** `src/auth/rbac.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import { query } from '../db';
import { AuthContext } from './apiKeyAuth';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = (req as any).auth as AuthContext | undefined;

  // Allow insecure dev mode (backward compatibility)
  const insecureDevMode = process.env.ENABLE_INSECURE_DEV === 'true';

  if (!auth && !insecureDevMode) {
    res.status(401).json({ error: 'AUTHENTICATION_REQUIRED' });
    return;
  }

  next();
}

export function requireRole(...allowedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const auth = (req as any).auth as AuthContext | undefined;

    if (!auth) {
      // ENABLE_INSECURE_DEV bypasses role checks (dev only)
      if (process.env.ENABLE_INSECURE_DEV === 'true') {
        return next();
      }
      res.status(401).json({ error: 'AUTHENTICATION_REQUIRED' });
      return;
    }

    // Check if user's role is in allowed list
    if (!allowedRoles.includes(auth.role)) {
      res.status(403).json({ 
        error: 'FORBIDDEN', 
        message: `Role '${auth.role}' not allowed. Required: ${allowedRoles.join(', ')}` 
      });
      return;
    }

    // Verify role permissions from database
    const result = await query<{
      can_write_decisions: boolean;
      can_read_audit: boolean;
    }>(
      'SELECT can_write_decisions, can_read_audit FROM roles WHERE role_name = $1',
      [auth.role]
    );

    if (result.rows.length === 0) {
      res.status(403).json({ error: 'INVALID_ROLE' });
      return;
    }

    next();
  };
}
```

---

## B2.4: Server Wiring

**File:** `src/server.ts` (UPDATE)

```typescript
import { apiKeyAuthMiddleware } from './auth/apiKeyAuth';
import { jwtAuthMiddleware } from './auth/jwtAuth';
import { requireAuth, requireRole } from './auth/rbac';

// Apply auth middleware BEFORE routes (order matters: JWT > API key > header)
app.use(jwtAuthMiddleware);
app.use(apiKeyAuthMiddleware);

// Extract tenant_id from auth context OR fallback to header/default
app.use((req, res, next) => {
  const auth = (req as any).auth as AuthContext | undefined;
  
  if (auth) {
    // Use authenticated tenant_id
    (req as any).tenant_id = auth.tenant_id;
  } else {
    // Fallback: x-tenant-id header or 'default'
    (req as any).tenant_id = (req.headers['x-tenant-id'] as string) || 'default';
    (req as any).auth = {
      tenant_id: (req as any).tenant_id,
      role: 'viewer',  // Default role for unauthenticated
      auth_method: 'header'
    } as AuthContext;
  }
  
  next();
});

// Protected routes
app.post('/v1/decisions', requireAuth, requireRole('auditor', 'admin'), async (req, res) => {
  const tenantId = (req as any).tenant_id;
  // ... existing logic
});

app.get('/v1/audit/verify/:rpx_id', requireRole('viewer', 'auditor', 'admin'), async (req, res) => {
  // ... existing logic
});

app.get('/v1/audit/verify-chain/:rpx_id', requireRole('viewer', 'auditor', 'admin'), async (req, res) => {
  // ... existing logic
});
```

---

## B2.5: Test Suite

**File:** `scripts/auth_rbac_test.ts`

```typescript
import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const GATEWAY_URL = 'http://localhost:4040';
const JWT_SECRET = process.env.JWT_SECRET || 'INSECURE_DEV_SECRET';

// Test 1: Unauthenticated request without ENABLE_INSECURE_DEV
// Test 2: Valid API key allows write
// Test 3: Invalid API key rejected
// Test 4: Valid JWT allows write
// Test 5: Expired JWT rejected
// Test 6: Viewer role can read audit, cannot write
// Test 7: Auditor role can write + read
// Test 8: Cross-tenant access forbidden (tenant-alpha cannot read tenant-beta)

async function main() {
  // ... full test implementation
}

main().then(() => {
  console.log('✅ ALL TESTS PASSED - EXIT 0');
  process.exit(0);
}).catch((err) => {
  console.error('❌ TEST FAILED:', err);
  process.exit(1);
});
```

---

## Implementation Checklist

- [ ] Install dependencies: `bcrypt`, `jsonwebtoken`
- [ ] Create migration: `003_add_auth_rbac.sql`
- [ ] Apply migration to local DB
- [ ] Implement: `src/auth/apiKeyAuth.ts`
- [ ] Implement: `src/auth/jwtAuth.ts`
- [ ] Implement: `src/auth/rbac.ts`
- [ ] Update: `src/server.ts` (auth middleware + protected routes)
- [ ] Rebuild Gateway: `npm run build`
- [ ] Create test: `scripts/auth_rbac_test.ts`
- [ ] Run test: `npx ts-node scripts/auth_rbac_test.ts` → EXIT 0
- [ ] Commit: "feat(cloud): Track B2 - auth + RBAC"
- [ ] Update: `CLAIM_GATES_TRACK_B.md` (mark B2 unlocked)

---

## Environment Variables

```bash
# Required for production
JWT_SECRET=<256-bit-random-hex>  # openssl rand -hex 32
ENABLE_INSECURE_DEV=false        # Set to 'true' only in local dev

# Database (existing)
DATABASE_URL=postgres://ssi_user:ssi_password@localhost:5432/ssi_cloud
SIGNING_SEED=<existing-seed>
PORT=4040
KERNEL_URL=http://localhost:5050/v1/evaluate
```

---

**Next Step:** Start with B2.1 (API key auth) as it's simpler than JWT and immediately useful for service-to-service auth.
