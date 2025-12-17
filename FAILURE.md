# SSI Protocol — Fail-Closed Semantics and Failure Handling

**Version:** 1.0.0-invariant  
**Status:** Constitutional  
**Last Modified:** December 17, 2025  
**Authority:** SSI Protocol Foundation Documents  
**Related:** [SPEC.md](SPEC.md), [DECISIONS.md](DECISIONS.md), [AUDIT.md](AUDIT.md)

---

## Purpose of This Document

This document defines **how SSI Protocol implementations must behave under failure conditions**. It establishes the safety-critical principle that when the system cannot reliably determine whether an action is safe, it must **deny execution by default**.

**Legal Purpose:** Courts and regulators rely on fail-closed semantics to establish that autonomous systems have inherent safety constraints, even during degraded operation.

**Safety Purpose:** Ensures that system failures do not compromise safety—failures result in controlled denial, not uncontrolled execution.

**Implementation Purpose:** Provides explicit requirements for error handling that preserve the invariants defined in [SPEC.md](SPEC.md).

---

## 1. Core Principle: Fail-Closed by Default

**Invariant (from SPEC.md Section 2.2):**

> When SSI cannot determine decision safety, it MUST deny execution.

This is the **foundational safety property** of SSI. It means:

- **Errors favor safety over availability** — Better to halt than to harm
- **Uncertainty is treated as risk** — If we can't verify safety, we assume danger
- **Default is DENY, not ALLOW** — Execution requires positive authorization

**Analogy:** A safety interlock on industrial equipment. If the interlock cannot verify safety (e.g., sensor failure), the machine does not run.

---

## 2. Failure Taxonomy

SSI implementations must handle the following failure classes:

### 2.1 Policy Evaluation Failures

**Failure:** The policy engine encounters an error while evaluating a decision.

**Causes:**
- Policy logic throws an exception
- Required policy rule is missing or malformed
- Policy evaluation times out
- Policy interpreter crashes

**Required Behavior:**
- ✅ Outcome = `DENY`
- ✅ RPX record is created with `denial_reason = "policy_evaluation_error"`
- ✅ Error is logged for operator review
- ❌ Execution is NOT permitted

**Rationale:** Cannot authorize what we cannot evaluate.

---

### 2.2 Context Unavailability

**Failure:** Required decision context is missing, corrupted, or inaccessible.

**Causes:**
- Sensor data unavailable
- Database query fails
- Network partition prevents context retrieval
- Context data is corrupted (checksum mismatch)

**Required Behavior:**
- ✅ Outcome = `DENY`
- ✅ RPX record is created with `denial_reason = "insufficient_context"`
- ✅ Missing context fields are logged
- ❌ Execution is NOT permitted

**Rationale:** Cannot make informed decisions without necessary information.

**Exception:** If policy explicitly allows operation under degraded context (e.g., emergency mode), this must be:
- Explicitly defined in policy
- Logged in RPX record as `degraded_context_mode = true`
- Subject to operator approval

---

### 2.3 Hash Chain Verification Failures

**Failure:** The system cannot verify the integrity of the RPX chain.

**Causes:**
- Previous record's hash does not match claimed value
- Chain has a gap (missing records)
- Storage corruption detected
- Timestamp regression detected

**Required Behavior:**
- ✅ Outcome = `DENY`
- ✅ RPX record is created (if possible) with `denial_reason = "chain_integrity_failure"`
- 🚨 **CRITICAL ALERT** to operator (chain compromise suspected)
- ❌ Further execution is HALTED until integrity is restored

**Rationale:** If audit trail is compromised, system trustworthiness is lost. Safer to halt than to operate without accountability.

**Recovery:** Requires operator intervention to restore chain integrity or re-initialize from verified backup.

---

### 2.4 Operator Authority Verification Failures

**Failure:** The system cannot confirm operator authorization for a required escalation.

**Causes:**
- Operator authentication fails
- Operator authorization token expired
- Operator identity cannot be verified
- Communication with operator authorization service times out

**Required Behavior:**
- ✅ Outcome = `DENY`
- ✅ RPX record is created with `denial_reason = "operator_authority_unverified"`
- ✅ Escalation request is logged but not fulfilled
- ❌ Execution is NOT permitted

**Rationale:** If human authority cannot be confirmed, autonomous execution is not authorized.

---

### 2.5 RPX Record Creation Failures

**Failure:** The system cannot create or persist an RPX record.

**Causes:**
- Storage system unavailable
- Disk full
- Database write fails
- File system read-only

**Required Behavior:**
- ✅ Outcome = `DENY` (decision is made but not recorded)
- 🚨 **CRITICAL ALERT** to operator (audit trail compromise)
- ❌ Execution is NOT permitted
- ⚠️ System enters **degraded mode** (halts all decisions until storage is restored)

**Rationale:** If decisions cannot be recorded, accountability is lost. System must halt to preserve audit integrity.

**Recovery:** Requires operator intervention to restore storage capacity or repair storage system.

---

### 2.6 Timeout Failures

**Failure:** Decision evaluation exceeds maximum allowed time.

**Causes:**
- Policy evaluation is too complex
- Context retrieval is slow (network latency)
- System is overloaded (resource contention)
- Infinite loop in policy logic

**Required Behavior:**
- ✅ Outcome = `DENY`
- ✅ RPX record is created with `denial_reason = "evaluation_timeout"`
- ✅ Timeout duration is logged
- ❌ Execution is NOT permitted

**Rationale:** Timely decisions are critical for safety. If evaluation takes too long, assume danger and halt.

**Configuration:** Implementers MUST define maximum evaluation time (e.g., 5 seconds for safety-critical systems, 30 seconds for non-critical).

---

### 2.7 System Resource Exhaustion

**Failure:** The system runs out of critical resources (memory, CPU, disk).

**Causes:**
- Memory leak in policy engine
- CPU saturation from excessive decision load
- Disk space exhausted (cannot write RPX records)

**Required Behavior:**
- ✅ Outcome = `DENY` for all pending decisions
- 🚨 **CRITICAL ALERT** to operator
- ⚠️ System enters **emergency halt mode**
- ❌ No further execution permitted until resources are restored

**Rationale:** Resource exhaustion indicates system instability. Halting prevents cascading failures.

**Recovery:** Requires operator intervention to free resources or restart system.

---

## 3. Failure Handling Procedures

### 3.1 Error Detection

Implementations MUST actively detect failures:

1. **Exception Handling:** All policy evaluation code wrapped in try/catch
2. **Timeout Enforcement:** Evaluation time limited by watchdog timer
3. **Resource Monitoring:** CPU, memory, disk usage tracked
4. **Health Checks:** Periodic verification of storage, network, dependencies

**Anti-Pattern:** Allowing unhandled exceptions to propagate without fail-closed response.

---

### 3.2 Error Response

Upon detecting a failure:

1. **Immediate Action:** Set outcome = `DENY`
2. **Record Creation:** Create RPX record (if possible) with failure details
3. **Operator Notification:** Alert operator to failure condition
4. **Prevent Execution:** Ensure agent does not execute the proposed action

**Pseudocode:**

```python
def evaluate_decision(agent_id, proposed_action, context):
    try:
        # Validate context
        if not validate_context(context):
            return deny(reason="insufficient_context")
        
        # Evaluate policy
        outcome = policy_engine.evaluate(proposed_action, context)
        
        # Create RPX record
        rpx_record = create_rpx_record(agent_id, proposed_action, context, outcome)
        
        # Persist record
        if not persist_rpx_record(rpx_record):
            alert_operator("RPX record persistence failed")
            return deny(reason="rpx_creation_failure")
        
        return outcome
    
    except PolicyEvaluationError as e:
        log_error(e)
        alert_operator(f"Policy evaluation failed: {e}")
        return deny(reason="policy_evaluation_error")
    
    except TimeoutError as e:
        log_error(e)
        return deny(reason="evaluation_timeout")
    
    except Exception as e:
        log_error(e)
        alert_operator(f"Unexpected failure: {e}")
        return deny(reason="unknown_error")
```

---

### 3.3 Error Logging

All failures MUST be logged with:

- Timestamp (ISO 8601 UTC)
- Failure type (policy error, context unavailable, timeout, etc.)
- Stack trace or error details (for debugging)
- Affected decision (agent, action, context summary)
- Outcome (always `DENY`)

**Purpose:** Enables post-incident analysis and system improvement.

---

### 3.4 Operator Escalation

Critical failures require operator intervention:

**CRITICAL Failures (immediate escalation):**
- Hash chain integrity failure
- RPX record creation failure
- System resource exhaustion

**WARNING Failures (logged, operator notified):**
- Policy evaluation errors
- Context unavailability
- Timeout failures

**Escalation Channels:**
- Dashboard alerts (visual indicators)
- Email/SMS notifications (configurable)
- System logs (centralized monitoring)
- Emergency stop mechanisms (hardware interlocks for safety-critical systems)

---

## 4. Degraded Operation Modes

### 4.1 Normal Operation

**State:** All systems functional.

**Behavior:**
- Decisions evaluated normally
- RPX records created successfully
- Hash chain integrity maintained

**Outcome:** `ALLOW`, `DENY`, or `ESCALATE` based on policy.

---

### 4.2 Degraded Context Mode

**State:** Some context data is unavailable, but policy allows operation.

**Trigger:**
- Non-critical sensors offline
- Optional context fields missing

**Behavior:**
- Policy evaluation continues with reduced context
- RPX record includes `degraded_context_mode = true`
- Operator is notified (warning, not critical)

**Outcome:** Policy may still `ALLOW` if degraded operation is explicitly permitted.

**Example:** Autonomous vehicle operates in "limp mode" when non-critical sensors fail (reduced speed, manual override available).

---

### 4.3 Emergency Halt Mode

**State:** Critical system failure detected.

**Trigger:**
- RPX record creation failure
- Hash chain integrity failure
- System resource exhaustion

**Behavior:**
- **ALL decisions denied** (outcome = `DENY`)
- No execution permitted
- System awaits operator intervention

**Recovery:**
- Operator investigates root cause
- Operator restores system integrity (storage, chain verification, resources)
- Operator manually clears emergency halt flag
- System resumes normal operation

**Rationale:** Safety trumps availability. Better to halt than to operate without accountability.

---

## 5. Fail-Closed Implementation Requirements

All SSI-compliant implementations MUST:

### 5.1 Default Deny Behavior

```python
# CORRECT: Fail-closed
try:
    outcome = evaluate_policy(action, context)
except Exception:
    outcome = DENY  # Safe default
```

```python
# INCORRECT: Fail-open (DANGEROUS)
try:
    outcome = evaluate_policy(action, context)
except Exception:
    outcome = ALLOW  # NEVER DO THIS
```

---

### 5.2 Explicit Error Handling

All failure modes listed in Section 2 MUST have explicit error handlers.

**Anti-Pattern:** Generic catch-all exception handler without fail-closed response.

---

### 5.3 Timeout Enforcement

All policy evaluation MUST have maximum time limits.

**Example:**

```python
def evaluate_with_timeout(policy, action, context, max_seconds=5):
    with timeout(max_seconds):
        return policy.evaluate(action, context)
    # If timeout occurs, exception is raised → fail-closed
```

---

### 5.4 RPX Record Failure Handling

If RPX record cannot be created:

```python
if not persist_rpx_record(record):
    # MUST deny execution
    # MUST alert operator
    # MUST enter emergency halt mode if persistence is critical
    return DENY
```

---

### 5.5 Health Check Integration

Implementations SHOULD provide health check endpoints:

```http
GET /health

Response:
{
  "status": "healthy" | "degraded" | "emergency_halt",
  "rpx_chain_status": "valid" | "compromised",
  "storage_status": "available" | "unavailable",
  "policy_engine_status": "operational" | "error"
}
```

---

## 6. Testing Requirements

### 6.1 Failure Injection Testing

Implementations MUST be tested under simulated failures:

**Required Tests:**

1. **Policy Evaluation Failure:** Inject exception in policy engine → verify `DENY`
2. **Context Unavailability:** Disconnect context source → verify `DENY`
3. **Hash Chain Corruption:** Tamper with prior record → verify `DENY` + emergency halt
4. **Timeout:** Force policy evaluation to hang → verify timeout → verify `DENY`
5. **Storage Failure:** Simulate disk full → verify `DENY` + emergency halt
6. **Operator Auth Failure:** Simulate auth service down → verify `DENY`

**Acceptance Criteria:** All tests must result in `DENY` outcome with proper logging.

---

### 6.2 Chaos Engineering

Implementations SHOULD undergo chaos testing:

- Random component failures
- Network partitions
- Resource exhaustion
- Concurrent failure scenarios

**Verification:** System always fails closed, never fails open.

---

### 6.3 Certification Testing

Safety-critical implementations (automotive, medical, industrial) MUST undergo third-party certification:

- Formal verification of fail-closed properties
- Fault tree analysis
- Failure mode and effects analysis (FMEA)
- Independent testing by accredited lab

---

## 7. Failure Recovery Procedures

### 7.1 Routine Error Recovery

**For transient failures (policy errors, timeouts):**

1. Operator reviews error logs
2. Operator identifies root cause (policy bug, resource issue)
3. Operator fixes issue (update policy, scale resources)
4. System resumes normal operation automatically

**No operator intervention required for individual denials** — fail-closed is working as designed.

---

### 7.2 Chain Integrity Recovery

**For hash chain compromise:**

1. **HALT all operations immediately**
2. Operator investigates:
   - Was there an attack? (tampering)
   - Was there corruption? (storage failure)
   - Was there a bug? (implementation error)
3. If attack: Forensic analysis, security remediation
4. If corruption: Restore from verified backup
5. If bug: Fix implementation, re-validate chain
6. Operator manually verifies chain integrity
7. Operator clears emergency halt flag
8. System resumes operation

**Chain integrity failure is a CRITICAL security event.**

---

### 7.3 Storage Recovery

**For RPX record creation failure:**

1. **HALT all operations immediately**
2. Operator frees storage space or repairs storage system
3. Operator verifies storage is writable
4. Operator manually creates test RPX record
5. Operator verifies test record is retrievable
6. Operator clears emergency halt flag
7. System resumes operation

**Audit trail integrity is non-negotiable.**

---

## 8. Graceful Degradation vs. Fail-Closed

**Key Distinction:**

- **Graceful Degradation:** System continues operating with reduced functionality (e.g., lower performance, fewer features)
- **Fail-Closed:** System halts to prevent unsafe operation

**SSI allows graceful degradation ONLY if:**

1. Degraded operation is explicitly defined in policy
2. Degraded state is logged in RPX records
3. Operator is notified
4. Safety is not compromised

**SSI requires fail-closed when:**

1. Audit trail is compromised (cannot record decisions)
2. Chain integrity is lost (cannot verify history)
3. Critical context is unavailable (cannot make informed decision)
4. Policy cannot be evaluated (cannot determine safety)

**Example:**

- ✅ Graceful: Autonomous vehicle reduces speed due to fog (degraded perception, policy allows slow operation)
- ❌ Fail-Closed: Autonomous vehicle halts if brakes fail (critical safety system lost)

---

## 9. Fail-Closed vs. Fail-Safe

**Terminology Clarification:**

- **Fail-Closed:** Deny execution on failure (SSI's approach)
- **Fail-Safe:** Enter a safe state on failure (broader concept)

**SSI's fail-closed is a form of fail-safe:**

- Safe state = "no execution"
- Unsafe state = "unverified execution"

**For some systems, fail-safe may require action:**

- **Example:** Industrial robot's fail-safe = retract arm to safe position (requires motion)
- **SSI's role:** Authorize the fail-safe action (e.g., `action = "retract_arm"` → `ALLOW`)

**SSI governs decisions, not execution.** If fail-safe requires action, that action is a decision subject to SSI.

---

## 10. Relationship to Other Documents

**SPEC.md Section 2.2** defines: "Fail-closed by default"  
**FAILURE.md** (this doc) defines: Specific failure modes and handling procedures

**DECISIONS.md** defines: What is a decision  
**FAILURE.md** assumes: Failures occur during decision evaluation

**AUDIT.md** defines: How to verify integrity  
**FAILURE.md** defines: What happens when verification fails

**COMPLIANCE.md** (coming) will require: Passing fail-closed tests for certification

---

## 11. Implementation Checklist

All SSI-compliant implementations MUST demonstrate:

- [ ] Default outcome is `DENY` (not `ALLOW` or `null`)
- [ ] All failure modes in Section 2 have explicit handlers
- [ ] Policy evaluation has timeout enforcement
- [ ] RPX creation failure triggers emergency halt
- [ ] Hash chain verification failure triggers emergency halt
- [ ] Operator alerts are sent for critical failures
- [ ] Failure injection tests pass (all failures → `DENY`)
- [ ] Health check endpoint reports system status
- [ ] Emergency halt mode is implemented
- [ ] Recovery procedures are documented

**Certification:** Safety-critical implementations must provide test evidence for all checkboxes.

---

## 12. Common Anti-Patterns (DO NOT DO)

### ❌ Fail-Open on Error

```python
# DANGEROUS
try:
    outcome = evaluate_policy(action, context)
except:
    outcome = ALLOW  # Assumes safety when unsure
```

**Why Wrong:** Failures could indicate attacks, corrupted data, or bugs. Allowing execution is unsafe.

---

### ❌ Silent Failure

```python
# DANGEROUS
try:
    outcome = evaluate_policy(action, context)
except:
    pass  # No logging, no alert, no denial
```

**Why Wrong:** Operator is unaware of failures. System appears functional but is compromised.

---

### ❌ Infinite Retry

```python
# DANGEROUS
while True:
    try:
        outcome = evaluate_policy(action, context)
        break
    except:
        time.sleep(1)  # Keep retrying forever
```

**Why Wrong:** If failure is persistent (e.g., policy bug), system hangs. Should fail-closed immediately.

---

### ❌ Unlogged Denial

```python
# DANGEROUS
except Exception:
    return DENY  # Correct outcome, but no RPX record or log
```

**Why Wrong:** Denials should be auditable. Operator cannot diagnose issues without logs.

---

## 13. Safety-Critical System Additions

For automotive, medical, industrial, or aerospace systems, additional requirements:

### 13.1 Hardware Interlocks

**Requirement:** Physical fail-safe mechanisms independent of software.

**Example:** Autonomous vehicle emergency brake (mechanical override).

**SSI's Role:** Software-level fail-closed complements hardware interlocks (defense in depth).

---

### 13.2 Watchdog Timers

**Requirement:** External watchdog monitors SSI runtime. If SSI hangs, watchdog triggers emergency halt.

**Integration:** SSI must periodically signal watchdog ("heartbeat"). Missing heartbeat → emergency stop.

---

### 13.3 Redundant Verification

**Requirement:** Critical decisions verified by independent secondary system.

**Example:** Autonomous vehicle's collision avoidance verified by separate safety controller.

**SSI's Role:** Primary decision authority; secondary system can veto but not override `DENY`.

---

### 13.4 Formal Verification

**Requirement:** Safety-critical implementations should undergo formal verification of fail-closed properties.

**Techniques:**
- Model checking (verify all states lead to fail-closed)
- Theorem proving (prove fail-closed invariant holds)
- Static analysis (detect fail-open code paths)

---

## 14. Governance

This document is maintained under the SSI Protocol governance framework.

Changes require:
- Safety analysis (does change weaken fail-closed guarantees?)
- Backward compatibility (existing fail-closed behavior preserved)
- Testing evidence (failure injection tests updated)

**Acceptance Criteria:** Proposed changes must maintain or strengthen fail-closed semantics.

---

## 15. Contact

**Safety Questions:** [GitHub Discussions](https://github.com/Jtjr86/ssi-protocol-oss/discussions)  
**Failure Reports:** [GitHub Issues](https://github.com/Jtjr86/ssi-protocol-oss/issues) (security vulnerabilities via private disclosure)  
**Certification Guidance:** Engage accredited safety certification bodies (e.g., TÜV, UL)

---

**This document establishes the fail-closed semantics that preserve safety under failure. When in doubt, halt—do not harm.**

---

## Appendix A: Failure Decision Tree

```
┌─────────────────────────────────┐
│ Decision Evaluation Attempted   │
└────────────┬────────────────────┘
             │
             ▼
    ┌────────────────┐
    │ Can retrieve   │
    │ context?       │──NO──► DENY (insufficient_context)
    └────────┬───────┘
             │ YES
             ▼
    ┌────────────────┐
    │ Can evaluate   │
    │ policy?        │──NO──► DENY (policy_evaluation_error)
    └────────┬───────┘
             │ YES
             ▼
    ┌────────────────┐
    │ Evaluation     │
    │ timeout?       │──YES─► DENY (evaluation_timeout)
    └────────┬───────┘
             │ NO
             ▼
    ┌────────────────┐
    │ Can create     │
    │ RPX record?    │──NO──► DENY + HALT (rpx_creation_failure)
    └────────┬───────┘
             │ YES
             ▼
    ┌────────────────┐
    │ Chain          │
    │ integrity OK?  │──NO──► DENY + HALT (chain_integrity_failure)
    └────────┬───────┘
             │ YES
             ▼
    ┌────────────────────┐
    │ Policy Evaluation  │
    │ Result:            │
    │ ALLOW/DENY/ESCALATE│
    └────────────────────┘
```

---

**End of SSI Protocol Fail-Closed Semantics and Failure Handling**
