# Sovereign Synthetic Intelligence (SSI) Protocol

> **Cryptographic audit trails for AI systems** — Production-ready governance infrastructure with tamper-evident decision logging, multi-tenant isolation, and role-based access control.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-26%2F26%20passing-success)](tests/)
[![Version](https://img.shields.io/badge/version-0.3.1-blue)](CHANGELOG.md)

---

## 🎯 What is SSI Protocol?

SSI Protocol provides **cryptographic audit trails** for AI systems, ensuring every decision is:

- ✅ **Tamper-evident** (SHA-256 hash chains + Ed25519 signatures)
- ✅ **Verifiable** (independent auditors can validate integrity)
- ✅ **Isolated** (multi-tenant architecture prevents cross-contamination)
- ✅ **Policy-governed** (advisory policy evaluation with audit trails)

**Use Cases:**
- AI decision logging (content moderation, trading systems, healthcare diagnostics)
- Regulatory compliance (audit trails for AI-generated decisions)
- Multi-tenant SaaS (isolated audit trails per customer)

---

## 🚀 Quick Start (1 Hour)

### Prerequisites
- Docker Desktop (or Docker Engine + Docker Compose)
- Node.js 18+
- 5 GB disk space

### 1. Clone and Configure

```bash
git clone https://github.com/Jtjr86/ssi-protocol-oss.git
cd ssi-protocol-oss

# Generate cryptographic signing seed
cd reference/gateway
cp .env.example .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Edit `.env` and replace `SIGNING_SEED` with your generated value.

⚠️ **SECURITY:** Never commit your `.env` file. It contains cryptographic secrets.

### 2. Start Services

```bash
cd ../..
docker-compose -f docker/docker-compose.yml up -d
```

**Services:**
- **Gateway** (port 4040): API server for decision logging
- **Kernel** (port 5050): Policy evaluation service
- **PostgreSQL** (port 5432): Audit trail database

### 3. Record Your First Decision

```bash
curl -X POST http://localhost:4040/v1/decisions \
  -H "Content-Type: application/json" \
  -H "x-api-key: ssi_test_admin_key_alpha_2024" \
  -d '{
    "client_id": "trader-alice",
    "system_id": "trading-prod",
    "action": {
      "type": "trade.order.place",
      "payload": {"symbol": "AAPL", "qty": 10, "price": 150, "notional": 1500}
    }
  }'
```

**Expected response:**
```json
{
  "success": true,
  "decision": {
    "decision": "ALLOW",
    "reason": "Within policy limits."
  },
  "rpx_id": "5e1a87f9-2922-4874-8ec7-5bf06f6d614d"
}
```

### 4. Verify Integrity

```bash
curl http://localhost:4040/v1/audit/verify-chain/5e1a87f9... \
  -H "x-api-key: ssi_test_auditor_key_alpha_2024"
```

**What you just did:**
1. ✅ Recorded a decision with cryptographic proof
2. ✅ Evaluated it against governance policy
3. ✅ Verified the audit trail is tamper-evident

**Next:** Follow [`PILOT_README.md`](PILOT_README.md) for the complete 1-hour pilot guide (tamper detection, multi-tenant isolation, RBAC testing).

---

## 📚 Documentation

- **[Pilot Deployment Guide](PILOT_README.md)** — 1-hour hands-on deployment
- **[Quick Start](QUICKSTART.md)** — 5-minute overview
- **[Protocol Specification](spec/README.md)** — Technical details
- **[Why SSI?](docs/WHY_SSI.md)** — Problem/solution narrative
- **[Claim Matrix](docs/CLAIM_MATRIX.md)** — What we can/cannot claim
- **[Contributing](CONTRIBUTING.md)** — How to contribute

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Your Application                      │
│  (Trading Bot, Content Mod, Healthcare AI, etc.)        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │      SSI Gateway (API)       │
        │  - Decision logging          │
        │  - Hash chain management     │
        │  - Ed25519 signing           │
        │  - Multi-tenant isolation    │
        └──────┬───────────────┬───────┘
               │               │
               ▼               ▼
    ┌──────────────┐   ┌──────────────┐
    │  SSI Kernel  │   │  PostgreSQL  │
    │  - Policy    │   │  - Audit     │
    │    eval      │   │    trail     │
    └──────────────┘   │  - Tenant    │
                       │    data      │
                       └──────────────┘
```

**Components:**

| Component | Purpose | Tech Stack |
|-----------|---------|------------|
| **Gateway** | API server for decision logging | Node.js, Express, Ed25519 |
| **Kernel** | Policy evaluation engine | Node.js, JSON schemas |
| **PostgreSQL** | Tamper-evident audit database | PostgreSQL 15+, JSONB |
| **SDKs** | Client libraries | TypeScript, Python |

---

## 🧪 Testing

Run the full test suite:

```bash
npm install
npm test
```

**Expected output:**
```
✅ hash_chain_test.ts (5/5 tests passed)
✅ tenant_isolation_test.ts (5/5 tests passed)
✅ auth_api_key_test.ts (5/5 tests passed)
✅ jwt_auth_test.ts (5/5 tests passed)
✅ rbac_test.ts (6/6 tests passed)

Total: 26/26 tests passed
```

**What's tested:**
- SHA-256 hash chain integrity
- Ed25519 signature validation
- Multi-tenant isolation (no cross-tenant leakage)
- API key authentication + RBAC
- JWT authentication (optional)

---

## 🔐 Security Model

### Cryptographic Guarantees

1. **Tamper Detection:** Every decision is hashed (SHA-256) and chained to the previous entry. Any modification breaks the chain.

2. **Non-Repudiation:** Each entry is signed with Ed25519. Signatures prove authenticity.

3. **Tenant Isolation:** Database queries enforce `tenant_id` filtering. No cross-tenant data access.

4. **Role-Based Access Control (RBAC):**
   - **Viewer:** Verify individual decisions
   - **Auditor:** Verify chains (chain traversal)
   - **Admin:** Write new decisions

### Threat Model

**SSI Protocol protects against:**
- ✅ Database tampering (hash chain breaks)
- ✅ Unauthorized access (API key + RBAC)
- ✅ Cross-tenant leakage (tenant isolation)

**SSI Protocol does NOT protect against:**
- ❌ Compromised signing keys (use KMS for production)
- ❌ Insider threats with database admin access
- ❌ Deleted records (use backups + replication)

See [CLAIM_MATRIX.md](docs/CLAIM_MATRIX.md) for detailed security analysis.

---

## 🌐 Production Deployment

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SIGNING_SEED` | Yes | Ed25519 seed (32-byte hex) — Use KMS in production! |
| `PORT` | No | Gateway port (default: 4040) |
| `KERNEL_URL` | Yes | Kernel endpoint (e.g., http://kernel:5050) |

⚠️ **Production Security:**
- **NEVER use the placeholder `SIGNING_SEED`** from `.env.example`
- Migrate to **AWS KMS**, **Azure Key Vault**, or **Google Cloud KMS**
- Use managed PostgreSQL (AWS RDS, Azure Database, Google Cloud SQL)
- Enable TLS/HTTPS for all endpoints
- Rotate API keys quarterly

### Cloud Deployment

**AWS:**
```bash
# Provision RDS PostgreSQL
aws rds create-db-instance \
  --db-instance-identifier ssi-protocol \
  --engine postgres \
  --engine-version 15.4 \
  --db-instance-class db.t3.medium

# Deploy Gateway (ECS, EKS, or Lambda)
# See docs/deployment/aws.md (coming soon)
```

**Azure:**
```bash
# Provision Azure Database for PostgreSQL
az postgres server create \
  --resource-group ssi-protocol-rg \
  --name ssi-protocol

# Deploy Gateway (Azure Container Instances or AKS)
# See docs/deployment/azure.md (coming soon)
```

---

## 🛣️ Roadmap

### ✅ Completed (v0.3.1)
- SHA-256 hash chains + Ed25519 signatures
- Multi-tenant isolation
- API key + JWT authentication
- RBAC (viewer, auditor, admin)
- 26/26 tests passing

### 🚧 In Progress (v0.4.0)
- Per-tenant signing keys (B3)
- Export tools (CSV, JSON, Parquet)
- Advanced query API (time ranges, filtering)

### 🔮 Future (v0.5.0+)
- Zero-knowledge proofs (selective disclosure)
- Distributed ledger integration (Hyperledger, Ethereum)
- Real-time alerting (webhooks, email)

See [GitHub Issues](https://github.com/Jtjr86/ssi-protocol-oss/issues) for detailed roadmap.

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- 🐛 Bug reports and fixes
- 📚 Documentation improvements
- ✨ Feature requests and implementations
- 🧪 Test coverage expansion
- 🌍 Language translations

---

## 📄 License

This project is licensed under the **Apache License 2.0** — see [LICENSE](LICENSE) for details.

**Key terms:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ⚠️ Must include NOTICE file in distributions
- ⚠️ Changes must be documented

---

## 🆘 Support

- **Issues:** [github.com/Jtjr86/ssi-protocol-oss/issues](https://github.com/Jtjr86/ssi-protocol-oss/issues)
- **Discussions:** [github.com/Jtjr86/ssi-protocol-oss/discussions](https://github.com/Jtjr86/ssi-protocol-oss/discussions)
- **Documentation:** [docs/](docs/)

---

## 🙏 Acknowledgments

Built with:
- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Ed25519 (tweetnacl)](https://tweetnacl.js.org/)
- [Docker](https://www.docker.com/)
- [Next.js](https://nextjs.org/) (website)

Inspired by:
- [RFC 8785](https://tools.ietf.org/html/rfc8785) (Canonical JSON)
- [Hyperledger Fabric](https://www.hyperledger.org/use/fabric) (blockchain audit trails)
- [Trillian](https://github.com/google/trillian) (transparent logs)

---

**Ready to build tamper-evident audit trails for your AI system?**  
Start with the [Pilot Deployment Guide](PILOT_README.md) (1 hour).
