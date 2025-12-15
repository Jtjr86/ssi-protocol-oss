# Environment Variables for Local Development

**Location:** `reference/gateway/.env`

**Purpose:** Configure Gateway for local dev without hardcoding values in PowerShell session.

---

## Recommended `.env` File (Local Dev)

```bash
# Database connection
DATABASE_URL=postgres://ssi_user:ssi_password@localhost:5432/ssi_cloud

# Signing key (INSECURE - dev only)
SIGNING_SEED=INSECURE_DEV_SEED

# Gateway port
PORT=4040

# Kernel endpoint
KERNEL_URL=http://localhost:5050/v1/evaluate

# Dev mode (allows unauthenticated writes for backwards compat testing)
ENABLE_INSECURE_DEV=true

# JWT secret (Track B2.2 - use openssl rand -hex 32 for production)
JWT_SECRET=dev_secret_key_256_bit_minimum_length_required_here_1234567890
```

---

## Using `.env` in Gateway

**Install dotenv (if not already installed):**
```powershell
npm install dotenv
```

**Load in server.ts (add at top):**
```typescript
import 'dotenv/config';  // Must be first import
```

Gateway will automatically load `.env` on startup.

---

## Production Environment Variables

**Required for pilot/prod:**
```bash
DATABASE_URL=<managed-postgres-connection-string>
SIGNING_SEED=<256-bit-random-hex>  # openssl rand -hex 32
PORT=4040
KERNEL_URL=<kernel-endpoint>
ENABLE_INSECURE_DEV=false  # ⚠️ CRITICAL: Never true in prod
JWT_SECRET=<256-bit-random-hex>    # openssl rand -hex 32 (Track B2.2)
```

**Security:**
- Never commit `.env` to git (add to `.gitignore`)
- Use secret manager in production (Azure Key Vault, AWS Secrets Manager, etc.)
- Rotate `SIGNING_SEED` and `JWT_SECRET` regularly

---

## `.gitignore` Entry (Already Present)

Verify `.env` is in `.gitignore`:
```
.env
.env.local
.env.*.local
```

---

## PowerShell Alternative (If Not Using `.env`)

Set env vars in Gateway's PowerShell window **before** `npm start`:

```powershell
cd c:\Users\betsy\ssi-protocol-existing\reference\gateway

$env:DATABASE_URL='postgres://ssi_user:ssi_password@localhost:5432/ssi_cloud'
$env:SIGNING_SEED='INSECURE_DEV_SEED'
$env:PORT='4040'
$env:KERNEL_URL='http://localhost:5050/v1/evaluate'
$env:ENABLE_INSECURE_DEV='true'
$env:JWT_SECRET='dev_secret_key_256_bit_minimum_length_required_here_1234567890'

npm start
```

**Note:** These only persist for that PowerShell session. Use `.env` for convenience.
