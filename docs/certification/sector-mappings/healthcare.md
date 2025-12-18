# SSI Protocol: Healthcare Sector Mapping

**Document Type:** NON-NORMATIVE GUIDANCE  
**Status:** Public OSS Edition  
**Version:** 1.0.0  
**Date:** December 17, 2025  
**Sector:** Healthcare  

> **NON-NORMATIVE GUIDANCE**  
> This document provides illustrative examples and context-specific guidance only.  
> It does NOT redefine SSI compliance or introduce additional normative requirements.

> **REGULATORY INTERPRETATION NOTICE**  
> Healthcare and medical device compliance require **SSI Certified Auditor** review  
> and FDA/EMA submission expertise. This mapping does NOT constitute medical device  
> regulatory advice or certification. Contact certification@ssi-protocol.org for  
> formal compliance assessment and regulatory submission support.

---

## 1. Sector Overview

### 1.1. Healthcare Context

The healthcare sector encompasses:
- **Clinical Decision Support:** Diagnosis assistance, treatment recommendations, medication dosing
- **Medical Imaging:** Radiology AI, pathology analysis, cancer detection
- **Patient Triage:** Emergency department prioritization, telemedicine routing
- **Administrative Systems:** Prior authorization, claims processing, fraud detection
- **Personalized Medicine:** Genomic analysis, treatment selection, risk prediction
- **Population Health:** Disease surveillance, outbreak prediction, resource allocation

**AI System Prevalence:**

Healthcare institutions increasingly deploy AI for:
- Diagnostic imaging interpretation (X-ray, CT, MRI, pathology slides)
- Clinical decision support at point of care
- Predictive analytics (sepsis, readmission, deterioration)
- Drug discovery and dosing optimization
- Operational efficiency (staffing, bed management)
- Patient monitoring and alerting

### 1.2. Regulatory Landscape

Key regulations affecting AI governance in healthcare:

| Regulation | Jurisdiction | Scope | AI Governance Impact |
|------------|--------------|-------|---------------------|
| **HIPAA** | US | Protected health information | Access controls, audit trails, breach notification |
| **21 CFR Part 11** | US (FDA) | Electronic records/signatures | Data integrity, audit trails, validation |
| **FDA 510(k)/PMA** | US | Medical device clearance | Software validation, clinical evidence, quality systems |
| **EU MDR** | EU | Medical device regulation | Clinical evaluation, post-market surveillance, UDI |
| **GDPR** | EU | Data protection | Automated decision-making, consent, data portability |
| **HITECH Act** | US | Health IT incentives | Meaningful use, interoperability, security |
| **CLIA** | US | Clinical laboratories | Quality control, proficiency testing, validation |
| **EU AI Act** | EU | High-risk AI systems | Conformity assessment, transparency, human oversight |

### 1.3. Industry Pain Points

**Clinical Validation Challenges:**
- Demonstrating AI safety and efficacy
- Reproducing AI outputs for FDA submissions
- Proving consistency across software versions
- Documenting model training and validation

**Audit Trail Deficiencies:**
- Incomplete records of AI-assisted decisions
- Inability to link decisions to clinical guidelines
- Manual aggregation for regulatory inspections
- Lost audit trails after system migrations

**Patient Safety Concerns:**
- Black box AI with unexplainable outputs
- Undetected model drift affecting accuracy
- Inability to trace wrong decisions to root cause
- No tamper-proof record of AI recommendations

**Regulatory Compliance Gaps:**
- HIPAA audit log requirements not AI-aware
- FDA validation documentation burdensome
- EU MDR post-market surveillance unclear for AI
- No standardized format for AI decision evidence

---

## 2. SSI Protocol Applicability

### 2.1. How SSI Addresses Healthcare Needs

**Clinical Decision Traceability:**
- RPX chains capture AI recommendations with clinical context
- Hash chaining prevents retroactive modification of diagnosis logs
- Governance envelopes link decisions to clinical guidelines
- Evidence Bundles package AI outputs for regulatory review

**FDA Submission Support:**
- Verification reports demonstrate software validation
- Tamper-evident chains prove consistency across testing
- Evidence Bundles suitable for 510(k) appendices
- Reproducible verification by FDA reviewers

**Patient Safety Enhancement:**
- L2 continuity proves no missing decisions in patient timeline
- L3 governance links AI outputs to approved protocols
- Tamper evidence alerts to potential data corruption
- Audit trail survives system migrations and upgrades

**HIPAA Compliance:**
- RPX records satisfy access logging requirements (§164.308)
- Hash integrity meets data integrity standards (§164.312)
- Evidence Bundles facilitate breach investigations
- PHI redaction possible (use patient IDs, not names)

### 2.2. Recommended Conformance Levels by Use Case

| Use Case | Recommended Level | Rationale |
|----------|-------------------|-----------|
| Diagnostic Imaging AI | **L3** | FDA requires validation; governance links to radiology protocols |
| Clinical Decision Support | **L3** | Patient safety critical; must prove guideline adherence |
| Sepsis Prediction | **L3** | Life-threatening; requires policy-based alerting |
| Drug Dosing Calculation | **L3** | Medication errors deadly; governance to formulary/protocols |
| Prior Authorization | **L2** | Administrative; continuity prevents denial disputes |
| Appointment Scheduling | **L1** | Low risk; integrity sufficient |
| Medical Transcription | **L1** | Documentation aid; not clinical decision |
| Fraud Detection (Claims) | **L2** | Compliance; continuity for audit defense |
| Patient Triage (ED) | **L3** | Safety critical; triage protocols must be enforced |
| Genomic Risk Scoring | **L3** | Precision medicine; link to validated risk models |

---

## 3. Regulatory Mapping

### 3.1. HIPAA (Health Insurance Portability and Accountability Act)

**§164.308(a)(1)(ii)(D) — Information System Activity Review:**
- Covered entities must review audit logs regularly
- Access to PHI must be logged and monitored
- Audit trails must detect security incidents

**SSI Protocol Contribution:**

| HIPAA Requirement | SSI Mapping | Implementation |
|-------------------|-------------|----------------|
| **Access Logging** | L1 Conformance | RPX records capture AI system access to PHI |
| **Audit Trail Integrity** | Hash Chaining | Tamper-evident logs prevent post-breach modification |
| **Activity Review** | Evidence Bundles | Monthly bundles enable systematic review |
| **Incident Detection** | Tamper Evidence | Broken links/hash mismatches alert to tampering |

**§164.312(c)(1) — Integrity Controls:**
- Implement policies to protect ePHI from improper alteration
- Ensure ePHI is not improperly modified or destroyed

**SSI Protocol Contribution:**

| HIPAA Requirement | SSI Mapping | Implementation |
|-------------------|-------------|----------------|
| **Data Integrity** | SHA-256 Hashing | Cryptographic proof of no alteration |
| **Destruction Detection** | L2 Continuity | Chain breaks reveal missing records |

**Example: Radiology AI Access Logging**

If AI reads patient imaging:
- Each image access logged as RPX record (patient ID, study, AI model, timestamp)
- PHI redacted from chain (use MRN hash, not patient name)
- Hash chain proves no deletion of access logs
- Evidence Bundle submitted during HIPAA audit
- L1/L2 conformance demonstrates §164.308 compliance

### 3.2. FDA 21 CFR Part 11 (Electronic Records and Signatures)

**§11.10(a) — Validation of Systems:**
- Systems must be validated to ensure accuracy, reliability, and consistent intended performance

**SSI Protocol Contribution:**

| 21 CFR Part 11 Req | SSI Mapping | Implementation |
|--------------------|-------------|----------------|
| **System Validation** | ssi-verify | Independent tool validates chain integrity |
| **Consistent Performance** | L2 Continuity | Unbroken chain proves no unexplained gaps |
| **Audit Trail** | RPX Records | Complete decision history for validation |

**§11.10(e) — Audit Trail:**
- Maintain secure, computer-generated, time-stamped audit trail
- Independently record date/time of operator entries and actions
- Record sequence of steps cannot be obscured

**SSI Protocol Contribution:**

| 21 CFR Part 11 Req | SSI Mapping | Implementation |
|--------------------|-------------|----------------|
| **Time-Stamped** | ISO 8601 Timestamps | Every RPX record has precise timestamp |
| **Secure** | Hash Chaining | Cryptographic security prevents alteration |
| **Sequence Recording** | Chronological Ordering | Monotonic timestamps prove order of events |
| **Cannot Be Obscured** | Tamper Evidence | Any modification detected via hash mismatch |

**§11.50 — Signature Manifestations:**
- Signed records must contain information associated with signing (who, when, meaning)

**SSI Protocol Contribution:**

L3 governance envelopes can capture:
- **Who:** Approving physician/clinical team
- **When:** Policy effective date in envelope
- **Meaning:** Link to clinical guideline or protocol

**Example: Clinical Trial AI Decision**

If AI determines trial eligibility:
- Eligibility decision logged (patient ID, trial, outcome, rationale)
- Governance envelope references trial protocol version
- Hash chain proves no post-facto changes to eligibility
- Evidence Bundle submitted to FDA with 510(k)
- Demonstrates 21 CFR Part 11 compliance

### 3.3. FDA Medical Device Regulation (510(k), PMA)

**Software as Medical Device (SaMD):**
- FDA requires validation of software correctness
- Clinical evidence of safety and effectiveness
- Design controls and quality system (21 CFR 820)

**SSI Protocol Contribution:**

| FDA Requirement | SSI Mapping | Implementation |
|-----------------|-------------|----------------|
| **Software Validation** | Verification Reports | ssi-verify demonstrates deterministic behavior |
| **Version Control** | Governance Envelopes | Policy hash captures software version at decision time |
| **Clinical Evidence** | Evidence Bundles | Package AI outputs from clinical validation |
| **Traceability** | L2 Continuity | Prove complete test coverage (no missing cases) |

**Example: CAD (Computer-Aided Detection) for Mammography**

510(k) submission for breast cancer detection AI:

**Clinical Validation Study:**
- AI analyzes 10,000 mammograms (IRB-approved study)
- Each analysis logged as RPX record (image ID, finding, confidence)
- Governance envelope references CAD algorithm version
- Hash chain proves no selective reporting (all 10,000 present)
- Evidence Bundle submitted as 510(k) appendix

**FDA Benefit:**
- Reviewer independently verifies using ssi-verify
- Confirms 10,000 contiguous records (no cherry-picking)
- Governance envelope proves consistent algorithm version
- Tamper evidence assures data integrity

**Post-Market Surveillance (21 CFR 822):**
- Medical device tracking for high-risk devices
- Reporting of device malfunctions

**SSI Protocol Contribution:**
- Ongoing Evidence Bundles capture post-market performance
- Tamper-evident logs for adverse event investigations
- Link malfunctions to software versions via governance envelopes

### 3.4. EU Medical Device Regulation (MDR 2017/745)

**Annex XIV — Clinical Evaluation:**
- Demonstrate conformity with safety and performance requirements
- Clinical evidence throughout device lifecycle
- Post-market clinical follow-up (PMCF)

**SSI Protocol Contribution:**

| MDR Requirement | SSI Mapping | Implementation |
|-----------------|-------------|----------------|
| **Clinical Evidence** | Evidence Bundles | AI decision logs from clinical studies |
| **Lifecycle Evidence** | Ongoing Chains | Continuous logging post-market |
| **PMCF** | Monthly Bundles | Track real-world performance |
| **Traceability (UDI)** | Governance Envelope | Software version as device identifier |

**Example: AI-Powered Insulin Pump**

Class IIb medical device under MDR:
- Pump adjusts insulin dosing based on AI predictions
- Each dosing decision logged (glucose level, dose, rationale)
- Governance envelope references dosing algorithm version + UDI
- Evidence Bundles submitted for clinical evaluation report
- L3 conformance demonstrates safety protocol adherence

### 3.5. EU AI Act (High-Risk AI in Healthcare)

**Annex III — High-Risk AI Systems:**
- AI used in medical devices (per MDR/IVDR)
- AI for critical infrastructure (healthcare facilities)

**Article 9 — Risk Management System:**
- Identify foreseeable risks
- Estimate and evaluate risks
- Eliminate or reduce risks

**SSI Protocol Contribution:**

| AI Act Requirement | SSI Mapping | Implementation |
|--------------------|-------------|----------------|
| **Risk Documentation** | Governance Envelopes | Link decisions to risk mitigation protocols |
| **Traceability** | L2 Continuity | Unbroken record enables incident investigation |
| **Post-Market Monitoring** | Evidence Bundles | Ongoing conformance verification |
| **Human Oversight** | Metadata Fields | Capture clinician review/override in metadata |

**Article 12 — Record-Keeping:**
- Automatic logging of events during AI system operation
- Enable traceability of system functioning

**SSI Protocol Contribution:**
- RPX records satisfy automatic logging requirement
- L2 conformance ensures traceability
- ssi-verify enables independent verification (conformity assessment)

**Example: AI Sepsis Early Warning System**

High-risk AI under EU AI Act:
- AI monitors patients for sepsis risk continuously
- Each risk score logged (patient ID, vitals, risk level, alert triggered)
- Governance envelope references sepsis protocol (SIRS criteria)
- Clinician response captured in metadata (acknowledged, escalated, dismissed)
- L3 conformance demonstrates Article 9 & 12 compliance

---

## 4. Use Cases

### 4.1. Diagnostic Imaging AI (Radiology)

**Scenario:**  
Hospital deploys AI to detect lung nodules on chest X-rays. Radiologists review AI findings before finalizing reports.

**SSI Implementation:**

- **Decision Types:**
  - `imaging-analysis` (nodule detected/not detected)
  - `radiologist-review` (concur/disagree with AI)
  - `final-diagnosis` (reporting decision)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T09:45:32Z",
  "decision_type": "imaging-analysis",
  "outcome": "nodule_detected",
  "record_hash": "5e4d3c...",
  "previous_hash": "4d3c2b...",
  "metadata": {
    "patient_id_hash": "SHA256(MRN-123456)",
    "study_id": "STUDY-2025-061509",
    "modality": "chest_xray",
    "finding": "3mm_nodule_right_upper_lobe",
    "confidence": 0.87,
    "model_version": "lung-nodule-detector-v2.1"
  },
  "governance_envelope": {
    "policy_name": "Radiology AI Assistance Protocol",
    "policy_hash": "7f6e5d...",
    "guideline": "ACR Appropriateness Criteria",
    "policy_effective_date": "2025-01-01"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity ensures AI finding not altered post-radiologist review
  - Continuity proves complete imaging study sequence
  - Governance links AI to radiology protocols

- **Regulatory Benefit:**
  - FDA 510(k): Evidence Bundle demonstrates clinical validation
  - HIPAA: Access to imaging logged, tamper-evident
  - EU MDR: Clinical evaluation evidence for CE marking
  - Malpractice defense: Prove AI recommendation provided, radiologist reviewed

**Challenges:**
- **PHI Sensitivity:** Patient names, DOB in DICOM metadata
  - Solution: Use hashed MRN, redact names from chain
- **Image Storage:** X-rays not in chain (too large)
  - Solution: Store image hash in metadata, link to PACS
- **Performance:** Real-time analysis (sub-second)
  - Solution: Async logging, don't block radiology workflow

### 4.2. Clinical Decision Support (Sepsis Prediction)

**Scenario:**  
ICU uses AI to predict sepsis onset 6 hours in advance. Alerts trigger nurse evaluation and potential physician escalation.

**SSI Implementation:**

- **Decision Types:**
  - `sepsis-risk-calculation` (risk score computed)
  - `sepsis-alert-triggered` (threshold exceeded)
  - `clinician-response` (acknowledged, escalated, dismissed)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T14:22:18Z",
  "decision_type": "sepsis-alert-triggered",
  "outcome": "alert_high_risk",
  "record_hash": "9e8d7c...",
  "previous_hash": "8d7c6b...",
  "metadata": {
    "patient_id_hash": "SHA256(MRN-789012)",
    "encounter_id": "ENC-2025-061514",
    "risk_score": 0.78,
    "risk_factors": ["elevated_lactate", "hypotension", "tachycardia"],
    "alert_level": "high",
    "time_to_predicted_onset_hours": 4.5
  },
  "governance_envelope": {
    "policy_name": "Sepsis Early Detection Protocol v3.2",
    "policy_hash": "6c5b4a...",
    "clinical_guideline": "Surviving Sepsis Campaign 2021",
    "alert_threshold": 0.70,
    "policy_effective_date": "2025-04-01"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves risk scores not inflated/deflated after outcome known
  - Continuity proves all alerts logged (no selective reporting)
  - Governance links alerts to Surviving Sepsis Campaign guidelines

- **Regulatory Benefit:**
  - FDA: Software validation for 510(k) (if marketed as device)
  - Joint Commission: Demonstrate adherence to sepsis protocols
  - Malpractice: Prove alert fired, clinician response documented
  - Quality improvement: Analyze alert accuracy, clinician compliance

**Challenges:**
- **Real-Time Alerts:** Must not delay clinical workflow
  - Solution: Async logging after alert sent to EMR
- **False Positives:** High false positive rates
  - Solution: Capture clinician dismissal reason in metadata
- **Outcome Tracking:** Did patient develop sepsis?
  - Solution: Separate record type for `sepsis-diagnosis-confirmed`

### 4.3. Medication Dosing AI

**Scenario:**  
Pharmacy uses AI to calculate chemotherapy doses based on patient weight, BSA, renal function, and drug interactions.

**SSI Implementation:**

- **Decision Types:**
  - `dose-calculation` (recommended dose)
  - `pharmacist-review` (approved, modified, rejected)
  - `physician-authorization` (ordered, not ordered)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T10:15:45Z",
  "decision_type": "dose-calculation",
  "outcome": "dose_recommended",
  "record_hash": "3d2c1b...",
  "previous_hash": "2c1b0a...",
  "metadata": {
    "patient_id_hash": "SHA256(MRN-345678)",
    "medication": "doxorubicin",
    "recommended_dose_mg": 75,
    "calculation_basis": {
      "bsa_m2": 1.8,
      "dose_per_m2": 50,
      "renal_adjustment": "none",
      "interaction_warnings": []
    },
    "formulary_version": "v2025.1"
  },
  "governance_envelope": {
    "policy_name": "Oncology Dosing Protocol",
    "policy_hash": "4e3d2c...",
    "formulary": "Hospital Formulary 2025",
    "policy_effective_date": "2025-01-15"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves dose not changed after pharmacist review
  - Continuity proves complete dosing history for patient
  - Governance links dose to hospital formulary and protocols

- **Regulatory Benefit:**
  - Joint Commission: Medication safety standards
  - FDA 21 CFR Part 11: If dose recorded in ePrescribing system
  - Malpractice: Prove dose calculation followed protocol
  - Quality assurance: Audit pharmacist overrides

**Challenges:**
- **Medication Errors:** Dosing mistakes can be fatal
  - Solution: L3 conformance mandatory, governance envelope required
- **Pharmacist Override:** Human may modify dose
  - Solution: Log override in separate record with justification
- **Formulary Updates:** Dosing guidelines change
  - Solution: Governance envelope captures formulary version

### 4.4. Prior Authorization AI

**Scenario:**  
Insurance company uses AI to approve/deny prior authorization requests for medical procedures.

**SSI Implementation:**

- **Decision Types:**
  - `prior-auth-evaluation` (approved, denied, refer-to-medical-director)
  - `medical-director-review` (overturn, uphold)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T11:30:22Z",
  "decision_type": "prior-auth-evaluation",
  "outcome": "approved",
  "record_hash": "7c6b5a...",
  "previous_hash": "6b5a49...",
  "metadata": {
    "request_id": "PA-2025-061511",
    "procedure_code": "CPT-99285",
    "diagnosis_code": "ICD10-I21.9",
    "approval_rationale": ["meets_medical_necessity", "in_network_provider"],
    "denial_risk_score": 0.12
  },
  "governance_envelope": {
    "policy_name": "Medical Necessity Criteria v5.3",
    "policy_hash": "5d4c3b...",
    "regulatory_basis": ["CMS NCD", "LCD Policy XYZ"],
    "policy_effective_date": "2025-03-01"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves decision not changed after member appeal
  - Continuity proves complete prior auth history
  - Governance links decision to medical necessity criteria

- **Regulatory Benefit:**
  - CMS: Demonstrate compliance with coverage policies
  - State regulators: Transparency in utilization management
  - Appeals: Prove original decision rationale
  - ERISA: Defendable claim denials

**Challenges:**
- **Member Appeals:** Decisions disputed frequently
  - Solution: Evidence Bundle export for appeals process
- **Policy Changes:** Coverage criteria evolve
  - Solution: Governance envelope captures policy version at decision time
- **Audit Volume:** Millions of prior auths annually
  - Solution: Daily chain partitioning, monthly bundles

---

## 5. Compliance Benefits

### 5.1. FDA Submission Efficiency

**Traditional 510(k) Software Validation:**
- Create validation protocol
- Execute test cases
- Document results in spreadsheets
- Compile into submission package
- FDA reviewer manually checks consistency

**With SSI Protocol:**
- AI generates RPX records during validation testing
- Hash chain proves all test cases executed (no selective reporting)
- Evidence Bundle = validation package
- FDA reviewer runs ssi-verify (independent verification)
- Submission time reduced 50-70%

**Example:**
CAD software 510(k) validation:
- 5,000 test images analyzed
- Traditional: 200 hours (manual documentation)
- SSI: 50 hours (automated chain generation + verification)
- **Efficiency Gain:** 75%

### 5.2. Clinical Trial Data Integrity

**21 CFR Part 11 Compliance:**
- Trial protocol amendments tracked in governance envelopes
- Patient enrollment decisions tamper-evident
- Adverse events logged with integrity proof
- Data lock proven via hash chain

**ICH GCP (Good Clinical Practice):**
- Source data verification simplified
- Audit trail for monitoring visits
- CAPA (Corrective Action) tracking

**Example:**
Phase III trial for AI diagnostic:
- 1,000 patients enrolled
- AI diagnoses logged in RPX chain
- Gold standard (pathology) results also logged
- Hash chain proves no post-hoc exclusions
- Evidence Bundle submitted to FDA with NDA/BLA

### 5.3. Malpractice Risk Mitigation

**Defensive Medicine:**
- Prove AI recommendation was provided to clinician
- Document clinician review/override decision
- Establish timeline of clinical events
- Demonstrate adherence to standard of care

**Example:**
Missed cancer diagnosis lawsuit:
- AI flagged suspicious lesion on mammogram
- Radiologist dismissed finding (false positive history)
- Patient develops cancer 2 years later
- Evidence Bundle proves:
  1. AI alert fired (timestamp, confidence score)
  2. Radiologist reviewed finding (dismissal logged)
  3. Decision followed radiology protocol (governance envelope)
- Malpractice carrier: Reduced settlement (defensible decision)

### 5.4. Post-Market Surveillance

**FDA MAUDE Reporting:**
- Medical device adverse event reporting
- Link device malfunction to software version
- Prove no data corruption during incident

**EU MDR Post-Market Clinical Follow-Up:**
- Ongoing Evidence Bundles track real-world performance
- Detect model drift (accuracy decline over time)
- Governance envelope version changes trigger safety review

**Example:**
Radiology AI false negative rate increases:
- Monthly Evidence Bundles reveal accuracy drop
- Hash chain timestamps when degradation started
- Governance envelope identifies software update as trigger
- Manufacturer issues safety notice, rolls back version

---

## 6. Implementation Guidance

### 6.1. Decision Type Taxonomy (Healthcare)

Recommended `decision_type` values for healthcare AI systems:

| Category | Decision Types | L1 | L2 | L3 |
|----------|----------------|----|----|-----|
| **Diagnostics** | `imaging-analysis`, `pathology-review`, `lab-interpretation` | ✓ | ✓ | ✓ |
| **Treatment** | `treatment-recommendation`, `drug-dosing`, `therapy-selection` | ✓ | ✓ | ✓ |
| **Monitoring** | `sepsis-alert`, `deterioration-warning`, `vital-sign-alarm` | ✓ | ✓ | ✓ |
| **Triage** | `ed-triage`, `appointment-priority`, `bed-assignment` | ✓ | ✓ | - |
| **Administrative** | `prior-auth`, `claims-review`, `coding-suggestion` | ✓ | ✓ | ✓ |
| **Genomics** | `genetic-risk-score`, `pharmacogenomic-guidance` | ✓ | ✓ | ✓ |
| **Population** | `outbreak-prediction`, `resource-allocation` | ✓ | - | - |

**Legend:**
- ✓ = Recommended for this conformance level
- - = Optional or not applicable

### 6.2. PHI Redaction Strategies

**DO NOT include in RPX chain:**
- Patient names, addresses, phone numbers
- Social Security Numbers
- Medical record numbers (use hashed MRN)
- Dates of birth (use age or year only)
- Detailed clinical notes (use summaries/codes)

**DO include in RPX chain:**
- Hashed patient identifiers (SHA-256 of MRN)
- Encounter/study IDs (non-PHI references)
- Coded diagnoses (ICD-10)
- Quantitative scores (risk scores, lab values - if de-identified)
- AI model outputs (findings, recommendations)

**Example:**
```json
"metadata": {
  "patient_id_hash": "a3f2e1d0c9b8...",  // ✓ SHA-256(MRN)
  "encounter_id": "ENC-2025-061514",      // ✓ Non-PHI reference
  "age_years": 67,                        // ✓ Age (not DOB)
  "diagnosis_code": "ICD10-I21.9",        // ✓ Coded
  "finding": "anterior_mi_suspected",     // ✓ Clinical finding
  // ❌ "patient_name": "Jane Doe"        // NEVER
  // ❌ "mrn": "MRN-123456"               // NEVER
  // ❌ "dob": "1958-03-15"               // NEVER
}
```

**Re-Identification Risk:**
- Small patient populations may be re-identifiable
- Solution: Additional de-identification for research datasets
- HIPAA Safe Harbor: Remove all 18 identifiers
- Evidence Bundles for clinical use: Hashed IDs acceptable

### 6.3. Clinical Guideline Versioning

**Challenge:**
Clinical guidelines update frequently (annually or more):
- Surviving Sepsis Campaign
- NCCN Cancer Treatment Guidelines
- AHA/ACC Cardiovascular Guidelines

**Solution:**
Governance envelope captures guideline version at decision time:

```json
"governance_envelope": {
  "policy_name": "Sepsis Early Detection Protocol v3.2",
  "policy_hash": "6c5b4a...",
  "clinical_guideline": "Surviving Sepsis Campaign 2021",
  "guideline_effective_date": "2021-10-01",
  "policy_effective_date": "2025-04-01"
}
```

**Benefits:**
- Prove decision followed guideline active at that time
- Detect when guideline update triggered behavior change
- Audit compliance with guideline adoption timelines

### 6.4. Metadata Field Recommendations

**Clinical Context (De-Identified):**
```json
"metadata": {
  "clinical_scenario": "emergency_department_chest_pain",
  "acuity_level": "ESI_2",
  "vital_signs": {
    "heart_rate_bpm": 110,
    "blood_pressure_mmhg": "140/90",
    "spo2_percent": 95
  },
  "lab_values": {
    "troponin_ng_ml": 0.8,
    "lactate_mmol_l": 2.1
  }
}
```

**AI Model Metadata:**
```json
"metadata": {
  "model_name": "sepsis-predictor-lstm",
  "model_version": "v2.3.1",
  "training_date": "2024-12-01",
  "validation_auc": 0.89,
  "confidence_score": 0.78
}
```

**Clinician Interaction:**
```json
"metadata": {
  "presented_to_clinician": true,
  "clinician_action": "escalated_to_physician",
  "override": false,
  "time_to_response_seconds": 45
}
```

### 6.5. Retention & Archival Strategy

**Regulatory Minimums:**
- HIPAA: 6 years from creation or last use
- FDA device records: Device lifetime + 2 years
- Clinical trial data: 2 years post-marketing approval (FDA)
- EU MDR: 15 years after last device placed on market

**Recommended Approach:**
1. **Per-Patient Chains:** Partition by patient encounter (manageable size)
2. **Monthly Aggregation:** Combine encounter chains into facility-level bundles
3. **Annual Archival:** Move to WORM storage after 1 year
4. **Verification Checkpoint:** Run ssi-verify before archival
5. **Format Stability:** JSONL (human-readable, survives tech changes)

**Storage Calculation (Hospital):**
- 500-bed hospital
- 10,000 AI decisions/day (imaging, alerts, dosing)
- Average record: 800 bytes (clinical metadata richer)
- 10,000 × 800 bytes = 8 MB/day
- 30 days = 240 MB/month
- 12 months = 2.9 GB/year
- 15 years (MDR) = ~44 GB (compresses to ~8-10 GB)

---

## 7. Integration Patterns

### 7.1. EMR/EHR Integration

**HL7 FHIR Integration:**
```
AI Clinical Decision Support
    ↓
FHIR API (read patient data)
    ↓
AI generates recommendation
    ↓
SSI Logger (RPX record)
    ↓
FHIR API (write back to EMR)
```

**Advantages:**
- Standard healthcare interoperability
- AI recommendations visible in EMR
- RPX chain independent of EMR vendor

**Challenges:**
- EMR audit logs separate from SSI chains
- Solution: Cross-reference EMR event ID in RPX metadata

### 7.2. PACS Integration (Imaging)

**DICOM Workflow:**
```
PACS (Picture Archiving System)
    ↓
DICOM image sent to AI
    ↓
AI analyzes image
    ↓
SSI Logger (RPX record with finding)
    ↓
DICOM SR (Structured Report) back to PACS
```

**RPX Metadata:**
```json
"metadata": {
  "dicom_study_uid": "1.2.840.113619.2.55...",
  "dicom_series_uid": "1.2.840.113619.2.55...",
  "image_hash_sha256": "9f8e7d6c...",
  "finding": "lung_nodule_detected",
  "pacs_archive_location": "server3/2025/06/15"
}
```

**Benefits:**
- Link RPX records to PACS images via UID
- Prove AI analyzed specific image version
- Tamper detection if image altered post-analysis

### 7.3. Cloud vs On-Premise (HIPAA Considerations)

**Cloud Deployment (AWS, Azure, GCP):**
- Use HIPAA-compliant cloud services (BAA required)
- Encrypt chains at rest and in transit
- Evidence Bundles in HIPAA-eligible storage (S3 with encryption)
- Pros: Scalability, disaster recovery, cost
- Cons: Data residency concerns, BAA complexity

**On-Premise Deployment:**
- Store chains on hospital file servers
- Evidence Bundles on tape backup or SAN
- Pros: Full control, no cloud BAA needed
- Cons: Capital expense, limited DR

**Hybrid (Recommended):**
- Log decisions on-premise (PHI stays local)
- De-identify chains for cloud archival
- Evidence Bundles encrypted before cloud upload
- Verification performed locally before transfer

---

## 8. Cross-References

### 8.1. Normative Documents

This guidance references the following **NORMATIVE** specifications:

- **SSI_Verification_Checklist.md** — Conformance levels (L1/L2/L3), verification procedures
- **SSI_Evidence_Bundle_Spec.md** — Bundle structure, file formats, hash relationships
- **SSI_RFP_Language_Template.md** — Procurement requirements for vendors

**Reminder:** This sector mapping does NOT modify or extend normative requirements. All conformance criteria remain as defined in normative documents.

### 8.2. Related Guidance (Non-Normative)

- **finance.md** — Financial services sector mapping (SOX, PCI-DSS, MiFID II)
- **autonomous-systems.md** — Autonomous systems mapping (ISO 26262, NHTSA)
- **developers/** — Implementation guides for SSI Protocol
- **protocol/** — Technical specification for RPX format

### 8.3. External Standards

- **HIPAA:** Health Insurance Portability and Accountability Act (45 CFR Parts 160, 164)
- **21 CFR Part 11:** FDA Electronic Records and Signatures
- **EU MDR:** Medical Device Regulation (EU) 2017/745
- **EU AI Act:** Regulation on Artificial Intelligence (AI Act) 2024
- **HL7 FHIR:** Fast Healthcare Interoperability Resources
- **DICOM:** Digital Imaging and Communications in Medicine

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
