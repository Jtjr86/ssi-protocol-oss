# SSI Protocol: Autonomous Systems Sector Mapping

**Document Type:** NON-NORMATIVE GUIDANCE  
**Status:** Public OSS Edition  
**Version:** 1.0.0  
**Date:** December 17, 2025  
**Sector:** Autonomous Systems  

> **NON-NORMATIVE GUIDANCE**  
> This document provides illustrative examples and context-specific guidance only.  
> It does NOT redefine SSI compliance or introduce additional normative requirements.

> **SAFETY-CRITICAL COMPLIANCE NOTICE**  
> Safety-critical system certification (ISO 26262, DO-178C, NHTSA, etc.) requires  
> **SSI Certified Auditor** review and certification body coordination.  
> This mapping does NOT constitute safety certification or regulatory approval.  
> Contact certification@ssi-protocol.org for formal safety assessment and  
> certification body coordination.

---

## 1. Sector Overview

### 1.1. Autonomous Systems Context

The autonomous systems sector encompasses:
- **Autonomous Vehicles:** Self-driving cars, trucks, delivery robots, drones
- **Industrial Automation:** Manufacturing robots, warehouse automation, AGVs
- **Aerospace:** UAVs (drones), autopilot systems, spacecraft control
- **Maritime:** Autonomous ships, underwater vehicles, port automation
- **Defense:** Unmanned combat vehicles, autonomous targeting, swarm systems
- **Infrastructure:** Smart grid management, traffic control, building automation

**AI System Prevalence:**

Autonomous systems rely on AI for:
- Perception (sensor fusion, object detection, scene understanding)
- Decision-making (path planning, collision avoidance, mission execution)
- Control (actuator commands, stability control, fail-safe activation)
- Monitoring (anomaly detection, predictive maintenance, health diagnostics)
- Coordination (fleet management, swarm intelligence, human-machine teaming)

### 1.2. Regulatory Landscape

Key regulations affecting AI governance in autonomous systems:

| Regulation | Jurisdiction | Scope | AI Governance Impact |
|------------|--------------|-------|---------------------|
| **ISO 26262** | Global | Automotive functional safety | ASIL levels, safety requirements, V&V documentation |
| **NHTSA ADS** | US | Automated driving systems | Crash reporting, performance monitoring, data recording |
| **UN R155/R156** | Global (UNECE) | Cybersecurity & software updates | Audit logs, update traceability, incident response |
| **EU AI Act** | EU | High-risk AI systems | Conformity assessment, risk management, transparency |
| **FAA Part 107/135** | US | Drone operations | Airworthiness, operational safety, accident investigation |
| **EASA CS-LURS** | EU | Light unmanned rotorcraft | Safety assessment, failure modes, software validation |
| **ISO 21448 (SOTIF)** | Global | Safety of intended functionality | Scenario coverage, known limitations, validation |
| **DO-178C** | Global | Airborne software | Design assurance levels, traceability, verification |

### 1.3. Industry Pain Points

**Safety Validation Challenges:**
- Demonstrating safety in infinite edge cases
- Reproducing failures during testing
- Proving absence of software bugs
- Validating ML model robustness

**Regulatory Scrutiny:**
- Crash investigation demands complete audit trails
- Certification bodies require deterministic evidence
- Regulators skeptical of "black box" AI
- Post-market surveillance mandates unclear for AI

**Liability & Insurance:**
- Who is liable when autonomous system fails? (OEM, operator, AI vendor)
- Insurers demand tamper-proof event data recorders
- Litigation requires defensible evidence
- Product recalls triggered by safety incidents

**Operational Trust:**
- Public skepticism of autonomous safety
- Fleet operators need explainable decisions
- Maintenance requires diagnostic transparency
- Emergency responders need decision logs for incidents

---

## 2. SSI Protocol Applicability

### 2.1. How SSI Addresses Autonomous Systems Needs

**Safety-Critical Decision Traceability:**
- RPX chains capture every autonomous decision (perception, planning, control)
- Hash chaining creates tamper-evident "black box" for incident investigation
- Governance envelopes link decisions to safety policies and operating limits
- Evidence Bundles package data for NTSB/NHTSA crash investigations

**Functional Safety Compliance (ISO 26262):**
- L2 continuity proves complete decision timeline (no missing gaps)
- L3 governance demonstrates safety function enforcement
- Verification reports support ASIL-level validation
- Tamper evidence alerts to software corruption

**Regulatory Certification Support:**
- Evidence Bundles suitable for FAA/EASA submissions
- ssi-verify enables independent certification body verification
- Governance envelopes document software versions and safety constraints
- Reproducible verification for type certification

**Post-Incident Investigation:**
- Unbroken decision chain from minutes before incident
- Prove AI recommendations vs human overrides
- Link decisions to sensor data provenance
- Demonstrate adherence to safety protocols

### 2.2. Recommended Conformance Levels by Use Case

| Use Case | Recommended Level | Rationale |
|----------|-------------------|-----------|
| Autonomous Driving (L4/L5) | **L3** | Safety-critical; must prove policy adherence (speed limits, traffic rules) |
| ADAS (L2) | **L2** | Driver assistance; continuity proves system state, governance optional |
| Delivery Drones | **L3** | Airspace safety; link to flight envelope and no-fly zones |
| Warehouse Robots (AGV) | **L2** | Controlled environment; continuity for collision investigation |
| Manufacturing Robots | **L1** | Fenced operations; integrity for diagnostics |
| Autopilot (Aviation) | **L3** | Life-critical; FAA requires policy enforcement proof |
| Autonomous Ships | **L3** | Maritime safety; COLREGS compliance demonstration |
| Smart Grid Control | **L2** | Infrastructure; continuity for blackout analysis |
| Defense UAV | **L3** | Rules of engagement; must prove targeting policy compliance |
| Swarm Robotics | **L2** | Coordination; continuity proves no rogue agents |

---

## 3. Regulatory Mapping

### 3.1. ISO 26262 (Automotive Functional Safety)

**Part 4: Product Development — Software Level:**
- Software safety requirements (ASIL decomposition)
- Software architectural design
- Software unit/integration testing
- Verification and validation

**SSI Protocol Contribution:**

| ISO 26262 Requirement | SSI Mapping | Implementation |
|-----------------------|-------------|----------------|
| **Traceability** | L2 Continuity | Link decisions to safety requirements |
| **Verification Evidence** | Evidence Bundles | Package V&V results for assessor review |
| **Configuration Management** | Governance Envelopes | Software version captured at runtime |
| **Audit Trail** | RPX Records | Complete decision history for analysis |

**ASIL Levels & Conformance:**
- **ASIL A/B:** L1 conformance acceptable (lower risk)
- **ASIL C:** L2 conformance recommended
- **ASIL D:** L3 conformance required (highest integrity)

**Example: ASIL D Emergency Braking**

Autonomous emergency braking (AEB) system:
- Hazard: Collision with pedestrian (ASIL D)
- Safety goal: Prevent collision or mitigate impact
- Safety function: Emergency brake activation

**SSI Implementation:**
- Each brake decision logged (sensor data, threat assessment, activation)
- Governance envelope references safety function spec (ISO 26262 Part 3)
- Hash chain proves no missed activations
- Evidence Bundle submitted to certification body

### 3.2. NHTSA Automated Driving Systems (ADS) Standing General Order

**Crash Reporting (SGO 2021-01):**
- Report crashes involving ADS within 1 day (injury/fatality)
- Provide ADS operational data before/during/after crash
- Ongoing reporting for serious crashes

**SSI Protocol Contribution:**

| NHTSA Requirement | SSI Mapping | Implementation |
|-------------------|-------------|----------------|
| **Event Data Recorder** | RPX Chain | Continuous logging of ADS decisions |
| **Pre-Crash Timeline** | L2 Continuity | 30 seconds before crash preserved |
| **System State** | Metadata Fields | ADS mode, sensor status, driver engagement |
| **Tamper-Proof** | Hash Chaining | Prevents post-crash data manipulation |

**Example: Level 4 Robotaxi Crash**

Robotaxi collides with cyclist:
- NHTSA requires crash report within 24 hours
- Evidence Bundle contains:
  - RPX chain: 60 seconds pre-crash + 10 seconds post-crash
  - Perception decisions (object detection, classification, tracking)
  - Planning decisions (path selection, speed, braking)
  - Control decisions (steering, throttle, brake commands)
- Governance envelope shows software version active during crash
- ssi-verify proves data integrity (no post-crash alteration)

**Benefit:**
- NHTSA investigator independently verifies Evidence Bundle
- Manufacturer proves ADS followed safety policy
- Timeline reconstruction for root cause analysis

### 3.3. UN Regulation No. 155 (Cybersecurity & Software Updates)

**Cyber Security Management System (CSMS):**
- Monitor, detect, respond to cybersecurity incidents
- Maintain audit logs of security events
- Secure software update processes

**SSI Protocol Contribution:**

| UN R155 Requirement | SSI Mapping | Implementation |
|---------------------|-------------|----------------|
| **Audit Logging** | RPX Records | Security-relevant decisions logged |
| **Tamper Detection** | Hash Chaining | Detect unauthorized modifications |
| **Software Update Traceability** | Governance Envelopes | Version changes tracked |
| **Incident Response** | Evidence Bundles | Package evidence for forensics |

**Example: Over-the-Air (OTA) Software Update**

Manufacturer deploys OTA update to autonomous vehicle fleet:
- Pre-update: governance envelope shows version v2.1.3
- Update logged as decision record (timestamp, new version, update hash)
- Post-update: governance envelope shows version v2.2.0
- Hash chain proves no intermediate tampering
- Evidence Bundle demonstrates update integrity

**Cybersecurity Incident:**
If vehicle hacked:
- RPX chain captures anomalous decisions (e.g., unexpected route deviation)
- Tamper evidence (broken hash links) alerts to intrusion
- Forensic analysis using Evidence Bundle
- Report to type approval authority per UN R155

### 3.4. EU AI Act (High-Risk AI Systems — Annex III)

**High-Risk AI in Safety Components:**
- AI systems intended as safety components of products
- Subject to third-party conformity assessment
- Products covered: vehicles, aircraft, machinery (per existing EU regulations)

**Article 9 — Risk Management System:**
- Identify and analyze foreseeable risks
- Estimate and evaluate risks arising from intended use and foreseeable misuse
- Evaluate risks based on post-market data

**SSI Protocol Contribution:**

| AI Act Requirement | SSI Mapping | Implementation |
|--------------------|-------------|----------------|
| **Risk Identification** | Governance Envelopes | Link decisions to risk mitigations |
| **Post-Market Monitoring** | Ongoing Chains | Continuous Evidence Bundles post-deployment |
| **Traceability** | L2 Continuity | Complete operating history |
| **Human Oversight** | Metadata Fields | Capture human intervention/override |

**Article 12 — Record-Keeping:**
- Automatically log events throughout AI system lifetime
- Enable traceability of system functioning

**SSI Protocol Contribution:**
- RPX records satisfy automatic logging requirement (Article 12.1)
- L2 conformance ensures traceability (Article 12.2)
- Evidence Bundles facilitate post-market surveillance (Article 61)

**Example: Autonomous Forklift (Machinery Directive + AI Act)**

Industrial autonomous forklift (high-risk AI):
- AI handles path planning in warehouse with humans present
- Each navigation decision logged (obstacles, path, speed)
- Governance envelope references safety zone policy (keep 2m from humans)
- Evidence Bundle submitted to notified body for CE marking
- L3 conformance demonstrates Article 9 & 12 compliance

### 3.5. DO-178C (Airborne Software Safety)

**Software Levels & Design Assurance:**
- Level A (catastrophic): Highest rigor
- Level B (hazardous): High rigor
- Level C (major): Medium rigor
- Level D (minor): Low rigor
- Level E (no effect): No requirements

**SSI Protocol Contribution:**

| DO-178C Objective | SSI Mapping | Implementation |
|-------------------|-------------|----------------|
| **Traceability** | L2 Continuity | Link code to requirements to decisions |
| **Verification** | ssi-verify | Independent verification of outputs |
| **Configuration Control** | Governance Envelopes | Software version/build captured |
| **Structural Coverage** | Evidence Bundles | Package test results for DER review |

**Example: UAV Autopilot (DAL A)**

Unmanned aerial vehicle autopilot (catastrophic failure = DAL A):
- Flight control decisions logged (altitude, heading, speed commands)
- Governance envelope references flight control law specification
- Hash chain proves no uncommanded inputs during testing
- Evidence Bundle submitted to FAA DER (Designated Engineering Representative)
- L3 conformance demonstrates DO-178C Section 6 (verification) compliance

---

## 4. Use Cases

### 4.1. Autonomous Vehicle (Level 4 Urban Driving)

**Scenario:**  
Robotaxi operates in urban environment without human driver. Must handle pedestrians, cyclists, traffic signals, construction zones.

**SSI Implementation:**

- **Decision Types:**
  - `perception-detection` (object detected)
  - `perception-classification` (object type identified)
  - `planning-route-selection` (route chosen)
  - `planning-speed-decision` (target speed set)
  - `control-brake-command` (brake actuation)
  - `control-steering-command` (steering angle)
  - `safety-intervention` (emergency stop, minimal risk condition)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T14:32:18.472Z",
  "decision_type": "safety-intervention",
  "outcome": "emergency_brake_activated",
  "record_hash": "8f7e6d...",
  "previous_hash": "7e6d5c...",
  "metadata": {
    "trigger": "pedestrian_in_path",
    "time_to_collision_ms": 850,
    "vehicle_speed_mps": 11.2,
    "deceleration_mpss": 6.5,
    "sensor_fusion": {
      "lidar_detections": 3,
      "camera_detections": 2,
      "radar_detections": 1
    },
    "location_lat_lon": "37.7749,-122.4194"
  },
  "governance_envelope": {
    "policy_name": "Emergency Braking Safety Function v3.1",
    "policy_hash": "9g8f7e...",
    "safety_standard": "ISO 26262 ASIL D",
    "minimum_ttc_threshold_ms": 1000,
    "software_version": "autonomy-stack-v2.5.3",
    "policy_effective_date": "2025-04-01"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves no post-crash falsification
  - Continuity proves complete pre-crash timeline
  - Governance links emergency brake to ISO 26262 safety requirement

- **Regulatory Benefit:**
  - NHTSA crash reporting: Evidence Bundle ready within 24 hours
  - Litigation defense: Prove vehicle followed safety policy
  - Insurance claim: Tamper-proof event reconstruction
  - Product improvement: Analyze near-miss events across fleet

**Challenges:**
- **Data Volume:** 10-100 decisions per second
  - Solution: Filter to safety-critical decisions only (not every sensor reading)
- **Real-Time Performance:** Cannot delay control loop
  - Solution: Async logging, buffer to disk in background
- **Storage:** 30-day retention × 10 decisions/sec × 60*60*24 = 25M records
  - Solution: Daily chain partitioning, compress older chains

### 4.2. Delivery Drone (Urban Package Delivery)

**Scenario:**  
Autonomous drone delivers packages in urban airspace. Must avoid buildings, aircraft, people, and respect no-fly zones.

**SSI Implementation:**

- **Decision Types:**
  - `flight-plan-approval` (route validated pre-flight)
  - `airspace-clearance` (ATC/UTM authorization)
  - `obstacle-avoidance` (dynamic reroute)
  - `no-fly-zone-enforcement` (prevent entry to restricted airspace)
  - `emergency-landing` (fail-safe activation)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T10:22:45.123Z",
  "decision_type": "no-fly-zone-enforcement",
  "outcome": "route_adjusted",
  "record_hash": "5d4c3b...",
  "previous_hash": "4c3b2a...",
  "metadata": {
    "current_location": "37.7849,-122.4094,150m_agl",
    "restricted_zone": "SFO_airport_class_bravo",
    "distance_to_boundary_m": 450,
    "avoidance_action": "altitude_decrease_to_100m",
    "utm_clearance_id": "UTM-2025-061510"
  },
  "governance_envelope": {
    "policy_name": "Airspace Compliance Rules v2.0",
    "policy_hash": "3e2d1c...",
    "regulatory_basis": ["FAA Part 107", "LAANC"],
    "no_fly_zones_database_version": "v2025.06",
    "software_version": "flight-control-v1.8.2",
    "policy_effective_date": "2025-05-01"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves no post-violation falsification
  - Continuity proves complete flight log
  - Governance demonstrates no-fly zone enforcement

- **Regulatory Benefit:**
  - FAA Part 107: Demonstrate airspace compliance
  - Incident investigation: Prove drone followed regulations
  - Liability: Defend against unauthorized airspace entry claims
  - Insurance: Verify policy adherence for coverage

**Challenges:**
- **Connectivity:** Drones may lose cellular/satellite link
  - Solution: Local chain logging, sync to cloud post-flight
- **Weight/Power:** Limited payload for compute
  - Solution: Lightweight logging (minimal metadata)
- **Fleet Management:** Thousands of drones
  - Solution: Centralized Evidence Bundle aggregation

### 4.3. Industrial Robot (Collaborative Manufacturing)

**Scenario:**  
Collaborative robot (cobot) works alongside humans on assembly line. Must detect human proximity and enforce safety zones.

**SSI Implementation:**

- **Decision Types:**
  - `human-detection` (person detected in workspace)
  - `safety-zone-enforcement` (slow/stop based on proximity)
  - `task-execution` (pick, place, assemble operations)
  - `fault-detection` (anomaly in motion/sensors)
  - `emergency-stop` (E-stop triggered)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T08:15:32.891Z",
  "decision_type": "safety-zone-enforcement",
  "outcome": "speed_reduced",
  "record_hash": "7e6d5c...",
  "previous_hash": "6d5c4b...",
  "metadata": {
    "human_distance_cm": 85,
    "safety_zone": "collaborative_zone_1",
    "speed_before_mps": 0.5,
    "speed_after_mps": 0.1,
    "sensor_type": "lidar_3d",
    "task_paused": false
  },
  "governance_envelope": {
    "policy_name": "Cobot Safety Protocol ISO/TS 15066",
    "policy_hash": "4f3e2d...",
    "safety_standard": "ISO 10218-1, ISO/TS 15066",
    "minimum_separation_cm": 100,
    "software_version": "cobot-control-v3.2.1",
    "policy_effective_date": "2025-02-01"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves safety decisions not overridden
  - Continuity proves continuous monitoring
  - Governance links to ISO 10218-1 safety requirements

- **Regulatory Benefit:**
  - OSHA compliance: Demonstrate worker safety
  - CE marking (EU Machinery Directive): Safety function validation
  - Accident investigation: Prove robot followed safety protocol
  - Product liability: Defend against injury claims

**Challenges:**
- **Deterministic Real-Time:** Safety-rated control loops (< 10ms cycle time)
  - Solution: Log safety decisions async (don't block control)
- **Safety Certification:** TÜV/UL require deterministic behavior
  - Solution: L3 governance proves policy enforcement

### 4.4. Autonomous Ship (Container Vessel)

**Scenario:**  
Autonomous container ship navigates ocean routes. Must follow COLREGS (collision regulations), weather routing, port entry protocols.

**SSI Implementation:**

- **Decision Types:**
  - `colregs-compliance` (right-of-way decisions)
  - `collision-avoidance` (course/speed adjustments)
  - `weather-routing` (route optimization for storms)
  - `port-entry` (docking maneuvers)
  - `emergency-maneuver` (man-overboard, mechanical failure)

- **RPX Record Example:**
```json
{
  "timestamp": "2025-06-15T22:45:18.000Z",
  "decision_type": "colregs-compliance",
  "outcome": "starboard_turn",
  "record_hash": "6c5b4a...",
  "previous_hash": "5b4a39...",
  "metadata": {
    "situation": "crossing_situation_rule_15",
    "other_vessel_ais": "IMO-9876543",
    "bearing_degrees": 315,
    "distance_nm": 2.1,
    "cpa_nm": 0.3,
    "tcpa_minutes": 8,
    "action": "alter_course_starboard_20_degrees"
  },
  "governance_envelope": {
    "policy_name": "COLREGS Navigation Rules",
    "policy_hash": "7d6c5b...",
    "regulatory_basis": ["COLREGS Rule 15", "IMO MASS Code"],
    "software_version": "navigation-ai-v4.1.0",
    "policy_effective_date": "2025-01-01"
  }
}
```

- **Conformance Level:** L3 (Governance)
  - Integrity proves navigation decisions accurate
  - Continuity proves complete voyage log
  - Governance demonstrates COLREGS compliance

- **Regulatory Benefit:**
  - IMO MASS (Maritime Autonomous Surface Ships): Regulatory approval
  - Flag state compliance: Demonstrate safe navigation
  - Accident investigation: Prove adherence to rules of the road
  - Insurance: Verify compliance for coverage

**Challenges:**
- **Satellite Connectivity:** Intermittent at sea
  - Solution: Onboard chain storage, sync at port
- **Long Voyages:** 30-day trans-ocean crossings
  - Solution: Daily chain partitioning, compress to save storage
- **Maritime Standards:** Paper-based traditions
  - Solution: Evidence Bundles printed for port authority inspections

---

## 5. Compliance Benefits

### 5.1. Crash Investigation Efficiency

**Traditional NTSB/NHTSA Investigation:**
- Request data from manufacturer
- Wait weeks for proprietary data extraction
- Manufacturer provides custom format
- Investigator cannot independently verify integrity

**With SSI Protocol:**
- Evidence Bundle extracted immediately post-crash
- Standard format (JSONL) readable by investigators
- ssi-verify proves data integrity (no tampering)
- Timeline reconstruction in hours, not weeks

**Example:**
Autonomous vehicle fatality:
- Traditional: 6-12 months to preliminary report
- SSI: Preliminary findings in 2-4 weeks
- **Efficiency Gain:** 70-80%

### 5.2. Fleet-Wide Safety Monitoring

**Challenge:**
Autonomous fleet operators need to detect safety issues across thousands of vehicles before crashes occur.

**SSI Solution:**
- Aggregate Evidence Bundles from entire fleet (weekly)
- Analyze tamper evidence patterns (hash mismatches, broken links)
- Detect anomalies (e.g., emergency braking rate spike)
- Identify software version correlations (new version → more interventions)

**Example:**
Robotaxi fleet (1,000 vehicles):
- Weekly Evidence Bundle aggregation
- Analysis reveals v2.5.2 has 3× emergency brake rate vs v2.5.1
- Root cause: Perception false positives
- Rollback to v2.5.1, issue software fix
- Prevented potential crashes

### 5.3. Insurance & Liability

**Product Liability Defense:**
- Prove autonomous system followed safety policy
- Demonstrate adherence to design specifications
- Show no software defects caused incident

**Example:**
Delivery drone crashes into building:
- Plaintiff: Drone manufacturer liable for faulty software
- Defense: Evidence Bundle shows drone detected obstacle, attempted avoidance per policy
- Governance envelope proves safety function active
- Hash chain proves no software malfunction
- Outcome: Liability shifted to operator (maintenance failure)

**Insurance Premiums:**
- Insurers offer discounts for SSI-conformant fleets
- Tamper-proof event logs reduce fraud
- Faster claims processing (Evidence Bundle as proof)

### 5.4. Certification & Type Approval

**FAA/EASA Type Certification:**
- Demonstrate software validation per DO-178C
- Prove traceability from requirements to code to test
- Package evidence for certification authority review

**SSI Contribution:**
- Evidence Bundles contain V&V test results
- Governance envelopes link tests to requirements
- ssi-verify enables DER independent verification

**Example:**
UAV autopilot certification (DAL B):
- 10,000 test flights logged in RPX chains
- Each test case mapped to requirement (governance envelope)
- Hash chain proves no selective test reporting
- Evidence Bundle submitted to FAA
- Certification approved 40% faster than traditional

---

## 6. Implementation Guidance

### 6.1. Decision Type Taxonomy (Autonomous Systems)

Recommended `decision_type` values for autonomous systems:

| Category | Decision Types | L1 | L2 | L3 |
|----------|----------------|----|----|-----|
| **Perception** | `object-detection`, `classification`, `tracking`, `sensor-fusion` | ✓ | ✓ | - |
| **Planning** | `route-selection`, `speed-decision`, `lane-change`, `overtake` | ✓ | ✓ | ✓ |
| **Control** | `steering-command`, `brake-command`, `throttle-command` | ✓ | ✓ | - |
| **Safety** | `emergency-brake`, `minimal-risk-condition`, `fail-safe-activation` | ✓ | ✓ | ✓ |
| **Navigation** | `waypoint-reached`, `obstacle-avoidance`, `airspace-clearance` | ✓ | ✓ | ✓ |
| **Compliance** | `speed-limit-enforcement`, `no-fly-zone`, `colregs-compliance` | ✓ | ✓ | ✓ |
| **Diagnostics** | `fault-detection`, `health-monitoring`, `sensor-degradation` | ✓ | - | - |

**Legend:**
- ✓ = Recommended for this conformance level
- - = Optional or not applicable

### 6.2. Sensor Data Integration

**Challenge:**
Autonomous systems generate massive sensor data (lidar, camera, radar). Cannot store in RPX chain.

**Solution:**
Store sensor data hashes, not raw data:

```json
"metadata": {
  "sensor_snapshot": {
    "lidar_point_cloud_hash": "SHA256(lidar.pcd)",
    "camera_front_hash": "SHA256(front.jpg)",
    "radar_tracks_hash": "SHA256(radar.json)",
    "sensor_data_location": "s3://fleet-data/2025/06/15/vehicle-123/14-32-18/"
  },
  "perception_output": {
    "objects_detected": 12,
    "pedestrians": 3,
    "vehicles": 9
  }
}
```

**Benefits:**
- RPX chain remains manageable size
- Link to external sensor archive via hash
- Prove sensor data not altered (hash mismatch detection)

### 6.3. Fail-Safe & Redundancy

**Safety-Critical Systems:**
Must handle SSI logger failure without compromising safety:

**Architecture:**
```
Primary Control Loop (safety-critical)
    ↓
Independent SSI Logger (non-safety-critical)
    ↓
Async JSONL persistence
```

**Failure Modes:**
- Logger crash: Control loop continues, gap in chain
- Disk full: Control loop continues, logging paused
- Hash computation error: Log record anyway (flag for review)

**Detection:**
- L2 continuity verification detects gaps post-mission
- Tamper evidence (broken link) alerts to logger failure
- Recovery: Restart logger, continue chain with gap marker

### 6.4. Edge vs Cloud Logging

**Edge Logging (On-Vehicle):**
- Advantages: No network dependency, real-time, low latency
- Disadvantages: Limited storage, single point of failure
- Use for: Real-time decisions, safety-critical operations

**Cloud Logging (Telemetry):**
- Advantages: Unlimited storage, fleet-wide analysis, backup
- Disadvantages: Network latency, connectivity gaps, bandwidth
- Use for: Post-mission analysis, fleet aggregation

**Recommended Hybrid:**
1. Log all decisions on-vehicle (primary chain)
2. Stream subset to cloud (safety events, errors)
3. Upload full Evidence Bundle post-mission (daily/weekly)
4. Verify on-vehicle chain before upload

### 6.5. Human-in-the-Loop Decisions

**Supervised Autonomy:**
When human operator overrides AI:

```json
{
  "decision_type": "planning-route-selection",
  "outcome": "human_override",
  "metadata": {
    "ai_recommendation": "left_turn",
    "human_decision": "right_turn",
    "override_reason": "construction_zone_ahead",
    "operator_id": "PILOT-456"
  }
}
```

**Benefits:**
- Distinguish AI decisions from human overrides
- Analyze when humans trust/distrust AI
- Improve AI by learning from operator corrections

---

## 7. Integration Patterns

### 7.1. Automotive (AUTOSAR Adaptive Platform)

**Architecture:**
```
AUTOSAR Adaptive Platform
    ↓
Autonomous Driving Stack (perception, planning, control)
    ↓
SSI Logger Service (ARA::COM interface)
    ↓
Persistent Storage (SOME/IP, DDS)
```

**Integration:**
- SSI logger as AUTOSAR Adaptive Application
- Subscribe to decision events via ARA::COM
- Persist chains to automotive-grade flash

### 7.2. Aerospace (ROS 2 / PX4 Autopilot)

**Architecture:**
```
ROS 2 Nodes (perception, planning, control)
    ↓
SSI Logger Node (ROS 2 subscriber)
    ↓
JSONL Writer
    ↓
Flight Data Recorder Storage
```

**Integration:**
- SSI logger as ROS 2 node
- Subscribe to decision topics
- Tamper-evident FDR (flight data recorder)

### 7.3. Maritime (IEC 61162 NMEA 2000)

**Architecture:**
```
Navigation Sensors (GPS, AIS, radar)
    ↓
NMEA 2000 Network
    ↓
Autonomous Navigation Controller
    ↓
SSI Logger (NMEA sentence parser)
    ↓
Voyage Data Recorder (VDR)
```

**Integration:**
- Parse NMEA sentences for navigation decisions
- Map to RPX decision types
- Store in VDR (IMO requirement)

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
- **healthcare.md** — Healthcare sector mapping (HIPAA, FDA 21 CFR Part 11)
- **developers/** — Implementation guides for SSI Protocol
- **protocol/** — Technical specification for RPX format

### 8.3. External Standards

- **ISO 26262:** Road vehicles — Functional safety
- **ISO 21448 (SOTIF):** Road vehicles — Safety of the intended functionality
- **UN R155/R156:** Cybersecurity and software update management systems
- **DO-178C:** Software Considerations in Airborne Systems and Equipment Certification
- **ISO 10218-1:** Robots and robotic devices — Safety requirements for industrial robots
- **COLREGS:** International Regulations for Preventing Collisions at Sea

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
