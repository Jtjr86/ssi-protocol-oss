# SSI Protocol: Financial Services Sector Mapping

**Document Type:** NON-NORMATIVE GUIDANCE  
**Status:** Public OSS Edition  
**Version:** 1.0.0  
**Date:** December 17, 2025  
**Sector:** Financial Services  

> **NON-NORMATIVE GUIDANCE**  
> This document provides illustrative examples and context-specific guidance only.  
> It does NOT redefine SSI compliance or introduce additional normative requirements.

> **REGULATORY INTERPRETATION NOTICE**  
> Regulatory compliance determinations require **SSI Certified Auditor** review  
> and may vary by jurisdiction, regulator interpretation, and specific use case.  
> This mapping does NOT constitute legal or compliance advice.  
> Contact certification@ssi-protocol.org for formal compliance assessment.

---

## 1. Sector Overview

### 1.1. Financial Services Context

The financial services sector encompasses:
- **Banking & Payments:** Credit decisions, fraud detection, account management
- **Trading & Capital Markets:** Algorithmic trading, order routing, risk management
- **Insurance:** Underwriting, claims processing, fraud detection
- **Wealth Management:** Portfolio optimization, robo-advisory, asset allocation
- **Compliance & AML:** Transaction monitoring, sanctions screening, KYC verification

**AI System Prevalence:**

Financial institutions increasingly deploy AI for:
- High-frequency trading and market making
- Credit scoring and loan origination
- Fraud detection and anomaly identification
- Regulatory compliance automation
- Customer service and chatbots
- Risk modeling and stress testing

### 1.2. Regulatory Landscape

Key regulations affecting AI governance in finance:

| Regulation | Jurisdiction | Scope | AI Governance Impact |
|------------|--------------|-------|---------------------|
| **SOX** (Sarbanes-Oxley) | US | Public companies | Internal controls, audit trails for financial reporting |
| **PCI-DSS** | Global | Payment card industry | Data protection, access controls, audit logging |
| **MiFID II** | EU | Investment services | Algorithmic trading oversight, best execution records |
| **GDPR** | EU | Data protection | Automated decision-making transparency, right to explanation |
| **Dodd-Frank** | US | Financial stability | Risk management, stress testing documentation |
| **Basel III/IV** | Global | Banking capital | Model risk management, validation requirements |
| **CCPA/CPRA** | California | Consumer privacy | Automated decision disclosures |
| **EU AI Act** | EU | High-risk AI systems | Conformity assessment, record-keeping, transparency |

### 1.3. Industry Pain Points

**Audit Trail Gaps:**
- Legacy systems with incomplete decision logging
- Fragmented audit trails across multiple platforms
- Manual aggregation of evidence for exams
- Inability to prove decision integrity post-facto

**Regulatory Examination Challenges:**
- Examiners demanding reproducible evidence
- Multi-year retention requirements (often 7+ years)
- Cross-border data transfer restrictions
- Third-party vendor audit requirements

**Model Risk Management:**
- Validating AI model outputs
- Demonstrating governance over model changes
- Proving no unauthorized modifications
- Linking decisions to approved policies

---

## 2. SSI Protocol Applicability

### 2.1. How SSI Addresses Financial Sector Needs

**Tamper-Evident Audit Trails:**
- RPX chains provide cryptographically verifiable decision logs
- Hash chaining prevents retroactive modification
- Genesis-to-head continuity proves completeness
- Evidence Bundles packaged for regulator submission

**Governance Transparency (L3):**
- Policy envelopes link decisions to governing rules
- Credit policy versioning captured in chain
- Trading algorithm governance documented
- Compliance rule binding provable

**Third-Party Verification:**
- ssi-verify tool enables independent auditor validation
- No vendor lock-in or proprietary tools required
- Reproducible verification by examiners
- Evidence admissible in regulatory proceedings

**Long-Term Retention:**
- JSONL format stable and human-readable
- No database dependencies for archival
- Verification possible years after creation
- Migration-friendly for technology changes

### 2.2. Recommended Conformance Levels by Use Case

| Use Case | Recommended Level | Rationale |
|----------|-------------------|-----------|
| Credit Decisions (Consumer) | **L3** | ECOA/Reg B require explainability; governance binding critical |
| Algorithmic Trading | **L2** | MiFID II requires audit trail; governance optional if pre-approved |
| Fraud Detection | **L2** | Need continuity for investigation; governance less critical |
| AML Transaction Monitoring | **L3** | Regulators demand policy-linkage; BSA/AML compliance |
| Payment Authorization | **L1** | High-volume; integrity sufficient; continuity nice-to-have |
| Robo-Advisory | **L3** | Fiduciary duty; must prove advice followed policy |
| Risk Scoring (Internal) | **L1** | Internal use; integrity verification adequate |
| Regulatory Reporting | **L3** | SOX/accuracy requirements; governance binding essential |

---

## 3. Regulatory Mapping

### 3.1. Sarbanes-Oxley (SOX) Compliance

**SOX Section 302/404 Requirements:**
- Internal controls over financial reporting (ICFR)
- Management certification of accuracy
- Audit trail for material transactions
- Prevention of unauthorized changes

**SSI Protocol Contribution:**

| SOX Requirement | SSI Mapping | Implementation |
|-----------------|-------------|----------------|
| **Audit Trail Integrity** | L1 Conformance | Hash verification proves no post-facto changes to decision logs |
| **Completeness of Records** | L2 Conformance | Unbroken chain from genesis proves no missing decisions |
| **Policy Binding** | L3 Conformance | Governance envelopes prove decisions followed approved controls |
| **Evidence Retention** | Evidence Bundles | 7-year archival in verifiable format |
| **Independent Verification** | ssi-verify tool | External auditors can verify without vendor access |

**Example: Revenue Recognition AI**

If AI determines revenue recognition timing:
- Each decision logged as RPX record (product, amount, timing)
- Chain proves no retroactive adjustments
- Governance envelope links to GAAP policy
- Evidence Bundle submitted to external auditors
- L3 conformance demonstrates ICFR effectiveness

### 3.2. PCI-DSS (Payment Card Industry Data Security Standard)

**PCI-DSS Requirements 10.x (Logging & Monitoring):**
- Track all access to cardholder data
- Log user activities and security events
- Retain audit trail for at least one year
- Protect log data from tampering

**SSI Protocol Contribution:**

| PCI-DSS Req | SSI Mapping | Implementation |
|-------------|-------------|----------------|
| **10.2 Automated Audit Trails** | L1/L2 | RPX records capture access control decisions |
| **10.3 Record Details** | RPX Schema | Timestamp, user ID, decision type, outcome |
| **10.5 Protect Audit Trail** | Hash Chaining | Tamper-evidence via cryptographic linkage |
| **10.7 Retention** | Evidence Bundles | 1-year minimum, verifiable throughout |

**Example: Card Authorization AI**

If AI assists in fraud detection during authorization:
- Each authorization decision logged (card #, amount, risk score, outcome)
- PHI/PCI data redacted from chain (use transaction ID reference)
- Hash chain proves no tampering with fraud verdicts
- Evidence Bundle demonstrates control effectiveness to QSA (Qualified Security Assessor)
- L2 conformance sufficient (governance not required for binary fraud checks)

### 3.3. MiFID II (Markets in Financial Instruments Directive)

**Article 17: Algorithmic Trading Requirements:**
- Maintain audit trail of algorithmic decision logic
- Record order flow and modifications
- Demonstrate compliance with best execution
- Retain records for 5 years

**SSI Protocol Contribution:**

| MiFID II Requirement | SSI Mapping | Implementation |
|----------------------|-------------|----------------|
| **Algo Trading Audit Trail** | L2 Conformance | Unbroken chain of order routing decisions |
| **Order Flow Records** | RPX Records | Decision type: order-routing, risk-limit, best-execution |
| **Time Sequencing** | Timestamp Monotonicity | Proves order of events (critical for dispute resolution) |
| **5-Year Retention** | Evidence Bundles | Archival in stable format |
| **Regulator Access** | ssi-verify | FCA/ESMA can independently verify |

**Example: Algorithmic Order Router**

If AI routes orders across venues:
- Each routing decision logged (symbol, quantity, venue, timing, rationale)
- Hash chain proves no retroactive justification
- Timestamps prove microsecond-level sequencing
- Evidence Bundle submitted during ESMA inspection
- L2 conformance (or L3 if governance policy mandates best execution logic)

### 3.4. GDPR Article 22 (Automated Decision-Making)

**Right to Explanation & Transparency:**
- Data subjects have right to explanation of automated decisions
- Meaningful information about logic involved
- Safeguards for significant decisions (credit, employment, etc.)

**SSI Protocol Contribution:**

| GDPR Requirement | SSI Mapping | Implementation |
|------------------|-------------|----------------|
| **Decision Transparency** | RPX Metadata | Capture explanation/rationale in metadata field |
| **Logic Documentation** | L3 Governance Envelope | Link decision to policy defining logic |
| **Audit Trail** | L2 Conformance | Prove decision occurred as claimed |
| **Right of Access** | Evidence Bundles | Export individual's decision history on request |

**Example: Credit Scoring AI**

If AI makes credit decisions:
- Decision logged with outcome, score, factors (metadata)
- Governance envelope links to credit policy version
- Consumer can request Evidence Bundle for their decisions
- L3 conformance enables "right to explanation" compliance
- Hash chain proves no post-dispute modification

### 3.5. EU AI Act (High-Risk AI Systems)

**Article 12: Record-Keeping Requirements:**
- Automatic recording of events during system lifetime
- Enable traceability of system functioning
- Compliance with transparency obligations
- Facilitate post-market monitoring

**SSI Protocol Contribution:**

| EU AI Act Requirement | SSI Mapping | Implementation |
|----------------------|-------------|----------------|
| **Automatic Logging** | RPX Generation | Real-time decision recording |
| **Traceability** | L2 Conformance | Unbroken chain enables full trace |
| **Transparency** | L3 Governance | Policy linkage demonstrates governance |
| **Post-Market Monitoring** | Evidence Bundles | Ongoing conformance verification |
| **Conformity Assessment** | ssi-verify | Third-party verification of compliance |

**Example: Loan Underwriting AI (High-Risk per Annex III)**

If AI makes creditworthiness assessments:
- Each underwriting decision logged with borrower ID, outcome, rationale
- Governance envelope references underwriting policy + regulatory requirements
- Evidence Bundle submitted to notified body for conformity assessment
- L3 conformance required for high-risk classification
- Verification demonstrates Article 12 compliance

---

## 4. Use Cases

### 4.1. Algorithmic Trading System

**Scenario:**  
Investment bank deploys AI for high-frequency market making in equities. System generates thousands of quote updates and trade decisions per second.

**SSI Implementation:**

- **Decision Types:**
  - `quote-update` (bid/ask price adjustments)
  - `order-execution` (trade fills)
  - `risk-limit-check` (position size validation)
  - `market-making-pause` (halt trading on anomaly)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T14:32:18.472Z",
  "decision_type": "order-execution",
  "outcome": "executed",
  "record_hash": "7f3a2b...",
  "previous_hash": "6e2c1d...",
  "metadata": {
    "symbol": "AAPL",
    "quantity": 100,
    "price": 185.50,
    "venue": "NYSE",
    "latency_ms": 2.3
  }
}
```

- **Conformance Level:** L2 (Continuity)
  - Integrity ensures no hash tampering
  - Continuity proves complete trade history
  - Governance optional (trading algorithm pre-approved, not policy-driven per decision)

- **Regulatory Benefit:**
  - MiFID II compliance: complete audit trail
  - Best execution documentation
  - Dispute resolution: prove order sequence
  - Regulator inspection: export Evidence Bundle for exam

**Challenges:**
- **Volume:** Millions of records per day
  - Solution: Partition chains by trading day, bundle monthly
- **Performance:** Real-time logging overhead
  - Solution: Async hash computation, batched writes
- **Storage:** Long-term retention (5 years MiFID II)
  - Solution: Compress Evidence Bundles, archive to cold storage

### 4.2. Credit Decision System

**Scenario:**  
Retail bank uses AI to approve/deny personal loan applications. Decisions must comply with Equal Credit Opportunity Act (ECOA) and be explainable.

**SSI Implementation:**

- **Decision Types:**
  - `credit-application` (approve/deny/refer)
  - `credit-line-adjustment` (increase/decrease)
  - `adverse-action` (denial with reason codes)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T10:23:45Z",
  "decision_type": "credit-application",
  "outcome": "approved",
  "record_hash": "8d4f3c...",
  "previous_hash": "7c3e2b...",
  "metadata": {
    "application_id": "APP-2025-061545",
    "loan_amount": 25000,
    "credit_score": 720,
    "debt_to_income": 0.32,
    "approval_factors": ["income_verified", "low_dti", "credit_history"]
  },
  "governance_envelope": {
    "policy_name": "Consumer Lending Policy v2.3",
    "policy_hash": "9e5d4f...",
    "policy_effective_date": "2025-01-01",
    "compliance_frameworks": ["ECOA", "Reg B", "FCRA"]
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves decision recorded accurately
  - Continuity proves complete application history
  - Governance links each decision to credit policy version

- **Regulatory Benefit:**
  - ECOA compliance: explainable decisions
  - Reg B: adverse action documentation
  - UDAAP: demonstrate fair lending
  - SOX: if material to financials, controls documented
  - GDPR Article 22: right to explanation satisfied

**Challenges:**
- **PII Sensitivity:** Chain contains borrower data
  - Solution: Redact PII in archived chains, use application IDs
- **Policy Changes:** Credit policy evolves quarterly
  - Solution: Governance envelope captures policy version at decision time
- **Audit Requests:** Consumer disputes requiring evidence
  - Solution: Filter Evidence Bundle to single applicant, export

### 4.3. AML Transaction Monitoring

**Scenario:**  
Bank uses AI to flag suspicious transactions for AML/KYC review. Regulators require proof that monitoring system operated correctly.

**SSI Implementation:**

- **Decision Types:**
  - `transaction-screening` (flagged/cleared)
  - `sanctions-check` (hit/no-hit)
  - `sar-filing-decision` (file/no-file SAR)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T08:15:30Z",
  "decision_type": "transaction-screening",
  "outcome": "flagged",
  "record_hash": "6b4e3d...",
  "previous_hash": "5a3d2c...",
  "metadata": {
    "transaction_id": "TXN-9876543",
    "amount_usd": 15000,
    "origin_country": "US",
    "destination_country": "CY",
    "risk_score": 87,
    "risk_factors": ["high_risk_jurisdiction", "structured_amount", "new_beneficiary"]
  },
  "governance_envelope": {
    "policy_name": "AML Monitoring Rules v4.1",
    "policy_hash": "3f2e1d...",
    "regulatory_basis": ["BSA", "FinCEN Guidelines", "OFAC"],
    "policy_effective_date": "2025-03-01"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves no tampering with risk scores
  - Continuity proves complete transaction history
  - Governance proves decisions followed AML policy

- **Regulatory Benefit:**
  - BSA/AML compliance: documented monitoring
  - FinCEN exam: export Evidence Bundle for lookback
  - Policy versioning: prove rules active at transaction time
  - Audit trail: defend against failure-to-file allegations

**Challenges:**
- **Real-Time Performance:** Transactions screened in milliseconds
  - Solution: Async logging, don't block transaction flow
- **Sensitive Data:** Transaction details confidential
  - Solution: Hash sensitive fields, store references not raw data
- **Volume:** Millions of transactions daily
  - Solution: Daily chain partitioning, monthly Evidence Bundles

### 4.4. Robo-Advisory Platform

**Scenario:**  
Wealth management firm offers robo-advisor for retail investors. Must demonstrate fiduciary duty and suitability.

**SSI Implementation:**

- **Decision Types:**
  - `portfolio-rebalance` (buy/sell recommendations)
  - `asset-allocation` (risk profile adjustments)
  - `tax-loss-harvesting` (tax optimization trades)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T06:00:00Z",
  "decision_type": "portfolio-rebalance",
  "outcome": "recommended",
  "record_hash": "4c3b2a...",
  "previous_hash": "3b2a19...",
  "metadata": {
    "account_id": "ACCT-123456",
    "recommendation": "sell_100_shares_VTI_buy_50_shares_BND",
    "rationale": "portfolio_drift_exceeded_threshold",
    "client_risk_tolerance": "moderate",
    "target_allocation": {"stocks": 60, "bonds": 40}
  },
  "governance_envelope": {
    "policy_name": "Investment Advisory Policy v1.5",
    "policy_hash": "2d1c0b...",
    "fiduciary_standard": "Investment Advisers Act 1940",
    "policy_effective_date": "2025-01-15"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves recommendations not altered post-facto
  - Continuity proves complete advisory history
  - Governance proves advice followed fiduciary policy

- **Regulatory Benefit:**
  - SEC compliance: demonstrate fiduciary duty
  - Suitability documentation (FINRA)
  - Client dispute resolution: prove advice given
  - Audit trail: defend against unsuitable recommendation claims

**Challenges:**
- **Client Privacy:** Portfolio data sensitive
  - Solution: Encrypt Evidence Bundles, redact for non-client parties
- **Policy Evolution:** Advisory policy updates with market conditions
  - Solution: Governance envelope captures policy version per decision
- **Long-Term Retention:** Clients may dispute years later
  - Solution: 7-year Evidence Bundle archival

---

## 5. Compliance Benefits

### 5.1. Regulatory Examination Readiness

**Traditional Approach:**
- Examiner requests 6 months of credit decisions
- IT team scrambles to query databases
- Export CSVs from multiple systems
- Manual aggregation and reconciliation
- No integrity proof, examiner questions completeness

**With SSI Protocol:**
- Evidence Bundle pre-generated monthly
- Single ZIP file contains complete chain + verification
- ssi-verify demonstrates integrity and continuity
- Examiner can independently verify (no vendor access needed)
- Submission complete in hours, not weeks

**Time Savings:**
- Traditional: 40-80 hours (IT + compliance staff)
- SSI: 2-4 hours (export bundle, verify, submit)
- **Efficiency Gain:** 90-95%

### 5.2. Model Risk Management

**SR 11-7 Compliance (Federal Reserve Model Risk Management):**
- Effective challenge and validation
- Ongoing monitoring and testing
- Governance and controls

**SSI Contribution:**
- **Model Validation:** Evidence Bundles demonstrate model outputs
- **Challenger Access:** Independent validators use ssi-verify
- **Change Control:** Governance envelope version changes indicate model updates
- **Audit Trail:** Prove no unauthorized modifications

**Example:**
Credit scoring model updated from v2.2 → v2.3:
- Governance envelope `policy_hash` changes in chain
- Timestamp marks exact switchover
- Before/after decisions traceable
- Validator can confirm change followed approval process

### 5.3. Third-Party Vendor Management

**Risk:**
- Banks rely on AI vendors for credit, fraud, compliance
- Vendor black box: cannot verify decision integrity
- Regulatory responsibility remains with bank

**SSI Solution:**
- Require vendors to deliver SSI-conformant systems
- Evidence Bundles as contract deliverable
- Bank independently verifies using ssi-verify
- No vendor lock-in for verification

**RFP Language:**
- Use **SSI_RFP_Language_Template.md Section 8.1** (Financial Services Addendum)
- Require L2 minimum (L3 for governance-critical systems)
- Mandate quarterly Evidence Bundle submissions
- Include verification SLA in contract

### 5.4. Cross-Border Data Transfers

**Challenge:**
- GDPR restricts EU personal data transfers to US
- Standard Contractual Clauses (SCCs) require safeguards
- Regulators demand evidence of data protection

**SSI Benefit:**
- Evidence Bundles can be verified locally (no cloud transfer needed)
- Hash chains prove data integrity during transit
- Governance envelopes demonstrate policy compliance
- Verification reproducible in EU using open-source tool

**Example:**
EU subsidiary makes credit decisions, sends Evidence Bundle to US parent:
- Chain contains hashed customer IDs (no PII)
- Verification performed in EU before transfer
- US receives verified bundle (integrity proven)
- Satisfies GDPR Article 32 (security of processing)

---

## 6. Implementation Guidance

### 6.1. Decision Type Taxonomy (Financial Services)

Recommended `decision_type` values for financial AI systems:

| Category | Decision Types | L1 | L2 | L3 |
|----------|----------------|----|----|-----|
| **Credit** | `credit-application`, `credit-line-adjustment`, `adverse-action` | ✓ | ✓ | ✓ |
| **Trading** | `order-routing`, `quote-update`, `risk-limit`, `market-making` | ✓ | ✓ | - |
| **Fraud** | `transaction-screening`, `fraud-score`, `account-freeze` | ✓ | ✓ | - |
| **AML/KYC** | `sanctions-check`, `kyc-verification`, `sar-filing-decision` | ✓ | ✓ | ✓ |
| **Payments** | `payment-authorization`, `chargeback-review` | ✓ | - | - |
| **Advisory** | `portfolio-rebalance`, `asset-allocation`, `tax-optimization` | ✓ | ✓ | ✓ |
| **Risk** | `credit-risk-score`, `market-risk-calc`, `operational-risk` | ✓ | - | - |

**Legend:**
- ✓ = Recommended for this conformance level
- - = Optional or not applicable

### 6.2. Timestamp Precision Requirements

**MiFID II Algorithmic Trading:**
- Microsecond precision required
- ISO 8601 with fractional seconds: `2025-06-15T14:32:18.472635Z`

**SOX Financial Reporting:**
- Second precision sufficient
- ISO 8601 standard: `2025-06-15T14:32:18Z`

**Credit Decisions (ECOA):**
- Minute precision acceptable
- ISO 8601: `2025-06-15T14:32:00Z`

**Recommendation:**  
Use highest precision available from source system. Verification does not require specific precision, only monotonicity.

### 6.3. Metadata Field Recommendations

**Sensitive Data Handling:**

DO NOT include in metadata:
- Full names, SSNs, account numbers (use IDs/hashes)
- Credit card numbers (use last 4 digits or token)
- Detailed transaction descriptions (use categories)

DO include in metadata:
- Application/transaction IDs (non-PII references)
- Quantitative scores (credit score, risk rating)
- Decision factors (reason codes, contributing variables)
- System identifiers (model version, node ID)

**Example:**
```json
"metadata": {
  "application_id": "APP-2025-061545",  // ✓ Non-PII reference
  "credit_score": 720,                   // ✓ Quantitative factor
  "approval_factors": ["income_verified", "low_dti"],  // ✓ Explainability
  "model_version": "v2.3"                // ✓ Audit trail
  // ❌ "applicant_name": "John Doe"     // NEVER include PII
  // ❌ "ssn": "123-45-6789"             // NEVER include PII
}
```

### 6.4. Retention & Archival Strategy

**Regulatory Minimums:**
- SOX: 7 years
- MiFID II: 5 years
- PCI-DSS: 1 year
- FCRA (credit): 25 months

**Recommended Approach:**
1. **Daily Chain Generation:** Partition by calendar day for manageability
2. **Monthly Evidence Bundles:** Aggregate daily chains into monthly bundles
3. **Annual Archival:** Move to cold storage after 1 year
4. **Verification Checkpoint:** Run ssi-verify before archival (confirm integrity)
5. **Format Stability:** Keep JSONL (human-readable, migration-friendly)

**Storage Calculation:**
- Average record: 500 bytes (compact JSON)
- 10,000 decisions/day = 5 MB/day
- 30 days = 150 MB/month
- 12 months = 1.8 GB/year
- 7 years = ~13 GB (compresses to ~2-3 GB)

### 6.5. Performance Considerations

**High-Frequency Trading (HFT) Systems:**
- **Challenge:** Cannot afford millisecond-level logging latency
- **Solution:** 
  - Async hash computation (queue records, hash in background)
  - Batched disk writes (buffer 1000 records, flush periodically)
  - Delayed chain finalization (finalize chain end-of-day)
  - Accept eventual consistency for verification

**Real-Time Payment Authorization:**
- **Challenge:** 50-100ms authorization window
- **Solution:**
  - Log decision AFTER authorization response sent
  - Use in-memory queue, persist async
  - Hash computation off critical path

**Credit Decisioning (Batch):**
- **Challenge:** Thousands of applications overnight
- **Solution:**
  - Synchronous logging acceptable (not latency-sensitive)
  - Compute hashes inline
  - Finalize chain at batch completion

---

## 7. Integration Patterns

### 7.1. Greenfield Implementation (New System)

**Architecture:**
```
AI Decision Engine
    ↓
SSI Logger (RPX record generation)
    ↓
Hash Chain Builder
    ↓
JSONL Persistence (append-only)
    ↓
Evidence Bundle Exporter
```

**Steps:**
1. Instrument AI decision points to emit events
2. Map events to RPX schema (timestamp, decision_type, outcome)
3. Compute canonical hash (SHA-256)
4. Append to JSONL chain file
5. Periodic verification (daily via ssi-verify)
6. Monthly Evidence Bundle generation

**Benefits:**
- Clean integration (no legacy constraints)
- Real-time hash computation
- Optimal performance (designed for SSI)

### 7.2. Brownfield Retrofit (Existing System)

**Architecture:**
```
Legacy AI System
    ↓
Event Stream (Kafka, SQS, etc.)
    ↓
SSI Adapter (translate to RPX)
    ↓
Hash Chain Builder
    ↓
JSONL Persistence
```

**Steps:**
1. Identify decision output events in legacy system
2. Deploy event capture (database triggers, message bus subscription)
3. Build adapter to translate events → RPX records
4. Compute hashes and persist JSONL
5. Parallel run (legacy + SSI) for validation
6. Cutover to SSI as source of truth

**Challenges:**
- Timestamp precision (legacy may lack microseconds)
- Metadata richness (legacy may not capture all factors)
- Retroactive chaining (cannot recreate historical hashes)

**Solution:**
- Accept timestamp precision available
- Enrich metadata via lookups where possible
- Start SSI chain from go-forward date (no historical chain)

### 7.3. Multi-System Aggregation

**Scenario:**  
Bank has separate systems for credit, fraud, AML, each generating decisions.

**Options:**

**Option A: Federated Chains**
- Each system maintains its own RPX chain
- Separate Evidence Bundles per system
- Examiner receives multiple bundles

**Option B: Unified Chain**
- Central SSI aggregator consumes events from all systems
- Single RPX chain with diverse decision_types
- One Evidence Bundle for entire bank

**Recommendation:**  
Option A (Federated) for:
- Loose coupling (systems independent)
- Performance (parallel logging)
- Compliance scope (different retention requirements)

Option B (Unified) for:
- Cross-system correlation (detect patterns)
- Simplified audit (one bundle to submit)
- Centralized governance

### 7.4. Cloud vs On-Premise Deployment

**Cloud Deployment (AWS, Azure, GCP):**
- Store JSONL in object storage (S3, Blob, Cloud Storage)
- Use serverless for hash computation (Lambda, Functions)
- Evidence Bundles in cold storage (Glacier, Archive)
- Pros: Scalability, cost-effective long-term storage
- Cons: Data residency concerns (GDPR, China Cybersecurity Law)

**On-Premise Deployment:**
- Store JSONL in on-prem file system or NAS
- Hash computation on dedicated servers
- Evidence Bundles on tape backup or disk array
- Pros: Data sovereignty, regulatory certainty
- Cons: Capital expense, scaling complexity

**Hybrid:**
- Log decisions on-prem (data residency)
- Replicate Evidence Bundles to cloud (disaster recovery)
- Verify locally before cloud upload (integrity proven)

---

## 8. Cross-References

### 8.1. Normative Documents

This guidance references the following **NORMATIVE** specifications:

- **SSI_Verification_Checklist.md** — Conformance levels (L1/L2/L3), verification procedures
- **SSI_Evidence_Bundle_Spec.md** — Bundle structure, file formats, hash relationships
- **SSI_RFP_Language_Template.md** — Procurement requirements for vendors

**Reminder:** This sector mapping does NOT modify or extend normative requirements. All conformance criteria remain as defined in normative documents.

### 8.2. Related Guidance (Non-Normative)

- **healthcare.md** — Healthcare sector mapping (HIPAA, FDA 21 CFR Part 11)
- **autonomous-systems.md** — Autonomous systems mapping (ISO 26262, NHTSA)
- **developers/** — Implementation guides for SSI Protocol
- **protocol/** — Technical specification for RPX format

### 8.3. External Standards

- **SOX:** Sarbanes-Oxley Act of 2002, Sections 302, 404
- **PCI-DSS:** Payment Card Industry Data Security Standard v4.0
- **MiFID II:** Markets in Financial Instruments Directive 2014/65/EU
- **GDPR:** General Data Protection Regulation (EU) 2016/679
- **Basel Committee:** Model Risk Management Principles (SR 11-7)
- **EU AI Act:** Regulation on Artificial Intelligence (AI Act) 2024

---

## Revision History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2025-12-17 | 1.0.0 | SSI Protocol Team | Initial non-normative guidance |

---

## License

Copyright 2025 Jtjr86

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

---

**END OF DOCUMENT**
