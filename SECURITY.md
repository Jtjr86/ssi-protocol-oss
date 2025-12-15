# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.3.1   | :white_check_mark: |
| < 0.3.0 | :x:                |

## Reporting a Vulnerability

**DO NOT** open public GitHub issues for security vulnerabilities.

**Please do not report vulnerabilities via public Issues.**

### How to Report

**Please report security vulnerabilities by emailing:** security-ssi-protocol@protonmail.com

You can also use [GitHub Security Advisories](https://github.com/Jtjr86/ssi-protocol-oss/security/advisories/new) to report vulnerabilities privately.

### What to Include

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (optional)

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Varies by severity (critical: 7-14 days, high: 30 days, medium/low: 90 days)

### Disclosure Process

1. **Private disclosure** to maintainers via email or GitHub Security Advisory
2. **Acknowledgment** within 48 hours confirming receipt
3. **Assessment** and severity classification (Critical/High/Medium/Low)
4. **Development** of fix in private fork
5. **90-day embargo** for fixes (coordinated disclosure)
6. **Public security advisory** once patch is released
7. **CVE assignment** for critical/high severity vulnerabilities

We follow responsible disclosure practices and appreciate security researchers who report vulnerabilities privately.

## Security Features

The SSI Protocol includes multiple layers of security:

### Cryptographic Audit Trails
- **Ed25519 signatures** on all decision records (tamper-evident)
- **SHA-256 hash chaining** for immutable decision logs
- **Deterministic serialization** for consistent signature verification

### Multi-Tenant Isolation
- **Tenant ID scoping** on all database queries
- **Row-level security** policies in PostgreSQL
- **API key/JWT authentication** with tenant binding

### Access Control
- **Role-based access control (RBAC)** with 4 roles:
  - Admin: Full control (create policies, manage keys, configure governance)
  - Operator: Execute decisions (call models, create decision records)
  - Auditor: Read-only access to decision records and policies
  - Viewer: Read-only access to summaries and aggregates
- **API key authentication** (bcrypt hashed, prefix-indexed for secure lookup)
- **JWT authentication** (environment-based secrets, configurable expiry)

### Data Integrity
- **Cryptographic hash chains** prevent retroactive modification
- **Signature verification** on all decision record retrievals
- **Immutable append-only logs** (no UPDATE/DELETE operations on decision records)

### Infrastructure Security
- **Environment variable secrets** (never committed to git)
- **Secure key management** (KMS/Key Vault integration recommended for production)
- **Docker container isolation** (multi-stage builds, non-root users)
- **TLS/HTTPS enforcement** (required for production deployments)

## Threat Model

For a comprehensive threat model covering 10 threat classes and 4 adversary models, see:
- **[docs/safety/threat-model.md](docs/safety/threat-model.md)** - Complete threat analysis and mitigation strategies

Key threat classes addressed:
1. **Unauthorized Actions** (RBAC + API keys)
2. **Policy Bypass** (cryptographic signatures + hash chains)
3. **Opaque Decisions** (mandatory decision records)
4. **Escalation Failures** (governance policy enforcement)
5. **Governance Staleness** (policy versioning + audits)
6. **Data Integrity Attacks** (Ed25519 signatures)
7. **Infrastructure Compromise** (multi-tenant isolation)
8. **Insider Threats** (audit trails + RBAC)
9. **Denial of Service** (rate limiting + resource quotas)
10. **Model Extraction** (access controls + monitoring)

## Known Non-Goals

The SSI Protocol **does not** protect against:
- **Compromised signing keys** (if `SIGNING_SEED` is leaked, all signatures can be forged)
- **Database administrator attacks** (DBAs with direct database access can modify records)
- **Model bias or fairness** (protocol records decisions, doesn't validate model quality)
- **Side-channel attacks** (timing, power analysis not in scope for reference implementation)
- **Zero-day vulnerabilities** in dependencies (mitigated through Dependabot, not eliminated)

See the full threat model for detailed residual risks and recommended mitigations.

## Security Best Practices

### For Production Deployments

1. **Key Management**
   - ✅ Use Azure Key Vault, AWS KMS, or HashiCorp Vault for `SIGNING_SEED`
   - ✅ Rotate signing keys every 90 days (maintain key history for verification)
   - ✅ Never commit `.env` files to git
   - ✅ Use separate keys for dev/staging/production environments

2. **Database Security**
   - ✅ Enable PostgreSQL SSL/TLS connections
   - ✅ Use strong database passwords (32+ characters, randomly generated)
   - ✅ Enable row-level security policies
   - ✅ Restrict database network access (firewall rules, VPC/VNet isolation)

3. **Network Security**
   - ✅ Enforce HTTPS/TLS 1.3 for all API endpoints
   - ✅ Use reverse proxy (nginx, Traefik) with rate limiting
   - ✅ Enable CORS restrictions for browser-based clients
   - ✅ Implement IP allowlisting for administrative endpoints

4. **Monitoring & Logging**
   - ✅ Enable audit logging for all API requests
   - ✅ Monitor for signature verification failures
   - ✅ Alert on policy bypass attempts
   - ✅ Track API key usage patterns (detect anomalies)

5. **Dependency Management**
   - ✅ Enable Dependabot security updates
   - ✅ Review dependency changes before merging
   - ✅ Pin dependency versions in production
   - ✅ Run `npm audit` / `pip-audit` in CI/CD pipelines

### For Self-Hosted Deployments

If you're self-hosting the SSI Protocol reference implementation:

1. **Review the [PILOT_README.md](PILOT_README.md)** for secure deployment instructions
2. **Generate your own `SIGNING_SEED`** using: `openssl rand -hex 32`
3. **Never use example seeds from documentation** (replace all `0000...` placeholders)
4. **Configure backups** for PostgreSQL database (decision records are immutable)
5. **Test disaster recovery** (verify signature verification after database restore)

## Security Audits

**Current status**: No formal third-party security audit completed.

**Planned**: Security audit scheduled for Q1 2026 (targeting SOC 2 Type I compliance).

If you're interested in conducting a security audit or penetration test, please contact us at the security email above.

## Bug Bounty Program

**Current status**: No formal bug bounty program.

**Consideration**: We're evaluating bug bounty programs for future implementation. In the meantime, we welcome responsible disclosure and will acknowledge security researchers in release notes (with permission).

## Security Updates

Subscribe to security advisories:
- **GitHub Security Advisories**: [Watch this repository](https://github.com/Jtjr86/ssi-protocol-oss/security/advisories)
- **Release notes**: All security fixes documented in [CHANGELOG.md](CHANGELOG.md)

Critical security updates will be tagged with `[SECURITY]` prefix in commit messages and release notes.

## Contact

- **Security issues**: security-ssi-protocol@protonmail.com
- **General questions**: Open a [GitHub Discussion](https://github.com/Jtjr86/ssi-protocol-oss/discussions)
- **Feature requests**: Open a [GitHub Issue](https://github.com/Jtjr86/ssi-protocol-oss/issues)

---

**Last updated**: December 15, 2025  
**Version**: 0.3.1
