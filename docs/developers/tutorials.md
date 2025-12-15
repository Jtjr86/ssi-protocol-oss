# SSI Tutorials

## Overview

Step-by-step guides for common SSI integration scenarios.

---

## Tutorial 1: Wrapping a Trading System with SSI Governance

**Goal:** Integrate SSI Gateway into a trading system for pre-trade governance enforcement.

**What you'll learn:**
- How trading clients call SSI Gateway before executing orders
- ALLOW vs DENY decision handling
- Audit trail integration for regulatory compliance
- Production deployment patterns

### Background

Before SSI, a naive trading system might look like this:

```typescript
// ❌ NO GOVERNANCE - Direct execution
async function placeOrder(order: TradeOrder) {
  // Generate order
  const result = await broker.submit(order);
  return result;
}
```

**Problem:** No oversight, no audit trail, no policy enforcement.

### After SSI: Governance-First Architecture

```typescript
// ✅ WITH SSI GOVERNANCE - Check before execution
async function placeOrder(order: TradeOrder) {
  // 1. Request governance decision from SSI Gateway
  const decision = await ssiGateway.requestDecision({
    action: 'trade.order.place',
    payload: { symbol: order.symbol, notional: order.notional }
  });
  
  // 2. Execute ONLY if approved
  if (decision.decision === 'ALLOW') {
    const result = await broker.submit(order);
    // Store RPX ID for audit correlation
    await db.saveAuditId(order.id, decision.rpx_id);
    return result;
  } else {
    // 3. Block and log if denied
    console.log(`Trade blocked: ${decision.reason}`);
    await db.logBlockedTrade(order, decision.rpx_id);
    throw new Error(`Governance denial: ${decision.reason}`);
  }
}
```

### Running the Reference Implementation

We've included a complete reference trading client in this repository:

```bash
# 1. Start the SSI Gateway (in one terminal)
cd reference/gateway
npm install
npm run build
node dist/server.js

# 2. Run the trading client (in another terminal)
cd reference/client-trader
npm install
npm run build
npm start
```

### Example Output

```
╔══════════════════════════════════════════════════════════╗
║   SSI Trading Client Reference Implementation            ║
║   Demonstrates governance-first order execution          ║
╚══════════════════════════════════════════════════════════╝

SSI Gateway: http://localhost:4040
Client ID:   trading-client-demo
System ID:   trading-prod

============================================================
[CLIENT] Proposed Trade: BUY ETHUSD, notional=$5,000
[SSI]    Decision: ALLOW
         Reason: Within policy limits.
[TRADE] ✓ EXECUTED: BUY ETHUSD
        RPX Audit ID: 9d5479f1-6d2b-4ef7-b5fb-f8bf18f76be8

============================================================
[CLIENT] Proposed Trade: SELL ETHUSD, notional=$15,000
[SSI]    Decision: DENY
         Reason: Order notional 15000 exceeds max allowed 10000
[TRADE] ✗ BLOCKED: SELL ETHUSD
        RPX Audit ID: 6b20f466-38aa-4bea-b833-f2dd1cecd482
```

### Key Integration Points

#### 1. Request Format

Send governance requests to `POST /v1/decisions`:

```json
{
  "client_id": "trading-client-demo",
  "system_id": "trading-prod",
  "action": {
    "type": "trade.order.place",
    "payload": {
      "symbol": "ETHUSD",
      "side": "BUY",
      "notional": 5000
    }
  }
}
```

#### 2. Decision Response

Gateway returns ALLOW/DENY with reasoning:

```json
{
  "success": true,
  "decision": {
    "decision": "ALLOW",
    "reason": "Within policy limits.",
    "details": {
      "rules_evaluated": ["RULE-MAX-NOTIONAL-001"],
      "rules_triggered": [],
      "invariants_violated": []
    }
  },
  "rpx_id": "9d5479f1-6d2b-4ef7-b5fb-f8bf18f76be8"
}
```

#### 3. Audit Trail Storage

Store the RPX ID with your trade record:

```typescript
await tradeDatabase.insert({
  order_id: generateOrderId(),
  symbol: order.symbol,
  notional: order.notional,
  executed_at: new Date(),
  ssi_rpx_id: decision.rpx_id,  // ← Audit correlation
  ssi_decision: decision.decision
});
```

### Viewing the Audit Trail

All decisions are logged in the Gateway's `rpx-log.jsonl`:

```bash
cd reference/gateway
npm run view:rpx
```

Output shows complete decision history:

```
────────────────────────────────────────
RPX ID:      6b20f466-38aa-4bea-b833-f2dd1cecd482
Created:     2025-12-11T19:15:18.585Z
Client:      trading-client-demo
System:      trading-prod
Action:      trade.order.place
Decision:    DENY
Reason:      Order notional 15000 exceeds max allowed 10000
Rules Eval:  RULE-MAX-NOTIONAL-001
Rules Hit:   RULE-MAX-NOTIONAL-001
```

### Production Deployment Considerations

When deploying to production:

1. **High Availability:**
   - Run multiple Gateway instances behind a load balancer
   - Use health checks: `GET /health`

2. **Fail-Safe Behavior:**
   ```typescript
   try {
     const decision = await ssiGateway.requestDecision(order);
     // ... process decision
   } catch (error) {
     // Gateway unreachable - fail closed (block) for compliance
     console.error("SSI Gateway unavailable - blocking trade");
     throw new Error("Governance check failed - trade cannot proceed");
   }
   ```

3. **Performance:**
   - Gateway decision latency: <10ms typical
   - Cache policy decisions for high-frequency trading (with TTL)
   - Monitor decision throughput and latency

4. **Monitoring:**
   - Alert on high denial rates (potential policy misconfiguration)
   - Track Gateway availability (99.99% SLA recommended)
   - Monitor RPX log growth for disk management

### Reference Code

Full implementation: [`reference/client-trader/`](../../reference/client-trader/)

Key files:
- `src/index.ts` — Main client logic with SSI integration
- `README.md` — Setup and configuration guide

---

## Tutorial 2: Healthcare AI Medication Safety

**Goal:** Integrate SSI governance into medical AI systems for safe medication dosing.

**What you'll learn:**
- Safety-critical decision patterns
- HIPAA compliance audit trails
- Fail-safe behavior (fail closed when Gateway unavailable)
- Physician alert integration

### Background

Medical AI systems that recommend medication dosages need **governance-first architecture** to prevent dosing errors, drug interactions, and patient harm.

**Before SSI:**
```typescript
// ❌ NO SAFETY CHECKS - Direct prescription
async function prescribeMedication(recommendation: MedicationRecommendation) {
  await pharmacySystem.submit(recommendation);
  return { status: 'prescribed' };
}
```

**Problem:** No dosage validation, no audit trail, no malpractice protection.

### After SSI: Safety-First Architecture

```typescript
// ✅ WITH SSI GOVERNANCE - Check before prescribing
async function prescribeMedication(recommendation: MedicationRecommendation) {
  // 1. Request governance decision
  const decision = await ssiGateway.requestDecision({
    action: 'healthcare.medication.prescribe',
    payload: {
      patient_weight_kg: recommendation.patientWeight,
      medication: recommendation.medicationName,
      dosage_mg: recommendation.dosageMg,
    }
  });
  
  // 2. Execute ONLY if approved
  if (decision.decision === 'ALLOW') {
    await pharmacySystem.submit(recommendation);
    await ehrSystem.recordPrescription(recommendation.patientId, decision.rpx_id);
    return { status: 'prescribed', auditId: decision.rpx_id };
  } else {
    // 3. Block and alert physician
    await alertSystem.notifyPhysician({
      patientId: recommendation.patientId,
      reason: decision.reason,
      auditId: decision.rpx_id,
    });
    throw new Error(`Prescription blocked: ${decision.reason}`);
  }
}
```

### Running the Reference Implementation

```bash
# 1. Start SSI Gateway
cd reference/gateway
npm install && npm run build
node dist/server.js

# 2. Run healthcare client
cd reference/client-healthcare
npm install && npm run build
npm start
```

### Key Integration Points

#### Fail-Safe Behavior

**Critical:** If SSI Gateway is unavailable, **fail closed** (block prescription):

```typescript
try {
  const decision = await requestMedicationApproval(recommendation);
  // ... process decision
} catch (error) {
  // Gateway unreachable - BLOCK for patient safety
  console.error('SSI Gateway unavailable - BLOCKING prescription');
  await alertSystem.criticalAlert('SSI Gateway down - manual review required');
  throw new Error('Cannot prescribe without governance approval');
}
```

#### HIPAA Compliance

Store RPX audit ID with every prescription for compliance:

```typescript
await ehrSystem.recordPrescription({
  patientId: recommendation.patientId,
  medication: recommendation.medicationName,
  dosageMg: recommendation.dosageMg,
  ssiAuditId: decision.rpx_id, // ← Required for audit trail
  prescribedAt: new Date(),
});
```

### Production Considerations

- **High Availability:** Load-balanced Gateway cluster (99.99% uptime)
- **Latency:** <50ms decision time (critical for emergency room)
- **Audit Retention:** 6+ years for HIPAA compliance
- **mTLS Authentication:** Required for production deployments

### Reference Code

Full implementation: [`reference/client-healthcare/`](../../reference/client-healthcare/)

---

## Tutorial 3: Content Moderation AI Governance

**Goal:** Build transparent AI content moderation with bias detection and appeal processes.

**What you'll learn:**
- High-volume decision patterns (1000s/sec)
- Bias detection and prevention
- Transparency for user appeals
- False positive rate limiting

### Background

Social media platforms need AI content moderation, but must prevent bias and provide transparency for appeals.

**Before SSI:**
```typescript
// ❌ NO OVERSIGHT - AI directly removes content
async function moderateContent(content: Content) {
  const aiDecision = mlModel.analyze(content);
  if (aiDecision.safetyScore < 30) {
    await contentDatabase.remove(content.id);
    await notifyUser(content.userId, 'Content removed');
  }
}
```

**Problem:** No transparency, no appeals, potential bias, no audit trail.

### After SSI: Transparency-First Architecture

```typescript
// ✅ WITH SSI GOVERNANCE - Reviewable, appealable decisions
async function moderateContent(content: Content) {
  // 1. AI analyzes content
  const aiDecision = mlModel.analyze(content);
  
  // 2. Request governance approval
  const decision = await ssiGateway.requestDecision({
    action: 'content.moderation.action',
    payload: {
      content_id: content.id,
      ai_safety_score: aiDecision.safetyScore,
      detected_categories: aiDecision.categories,
      proposed_action: aiDecision.proposedAction,
    }
  });
  
  // 3. Execute if approved, else escalate to human review
  if (decision.decision === 'ALLOW') {
    await executeModeration(content, aiDecision, decision.rpx_id);
  } else {
    // Governance blocked AI decision - send to human moderators
    await moderationQueue.escalateToHuman({
      content: content,
      reason: decision.reason,
      auditId: decision.rpx_id,
    });
  }
}
```

### Running the Reference Implementation

```bash
# 1. Start SSI Gateway
cd reference/gateway
npm install && npm run build
node dist/server.js

# 2. Run content moderation client
cd reference/client-content-mod
npm install && npm run build
npm start
```

### Key Integration Points

#### Bias Prevention

Governance ensures AI doesn't have excessive false positives:

```typescript
// In SSI Gateway governance envelope
{
  "rule_id": "RULE-CONTENT-BIAS-001",
  "description": "Prevent bias - limit automated removals",
  "condition": "proposed_action === 'remove' && ai_safety_score > 20",
  "action": "DENY - Require human review to prevent false positive"
}
```

#### Appeal Process

Users can appeal moderation decisions with full transparency:

```typescript
async function handleAppeal(appealRequest: {
  userId: string;
  rpxId: string; // ← Audit ID from notification
}) {
  // Fetch original decision from RPX log
  const originalDecision = await rpxClient.getDecision(appealRequest.rpxId);
  
  // Show user:
  // - What AI detected
  // - Why it was removed
  // - Which governance rules triggered
  
  await appealQueue.addAppeal({
    userId: appealRequest.userId,
    originalDecision: originalDecision,
    rpxAuditTrail: appealRequest.rpxId,
  });
}
```

#### High-Volume Performance

Process thousands of moderation decisions per second:

```typescript
// Async processing for high volume
async function processContentAsync(content: Content) {
  await contentQueue.add(content);
  return { status: 'pending' };
}

// Background worker processes governance decisions
async function moderationWorker() {
  while (true) {
    const content = await contentQueue.pop();
    const decision = await requestModerationApproval(content);
    
    if (decision.decision.decision === 'ALLOW') {
      await publishContent(content);
    } else {
      await queueForHumanReview(content);
    }
  }
}
```

### Production Considerations

- **Throughput:** 10,000+ decisions/second
- **Latency:** <100ms for good UX
- **False Positive Rate:** <10% across all categories
- **Gateway Availability:** 99.99% uptime SLA
- **Appeal SLA:** <24 hours for user appeals

### Reference Code

Full implementation: [`reference/client-content-mod/`](../../reference/client-content-mod/)

---

## Tutorial 4: Multi-Agent Coordination

**Goal:** Build a system where multiple agents collaborate under shared governance.

**What you'll learn:**
- Multi-envelope policies
- Agent-to-agent permissions
- Conflict resolution
- Coordinated RPX trails

[Full Tutorial →](#tutorial-4-details)

---

## Tutorial 5: Regulatory Compliance for AI

**Goal:** Configure SSI to meet regulatory requirements (e.g., financial services).

**What you'll learn:**
- Mapping regulations to governance envelopes
- Audit trail export for regulators
- Compliance dashboards
- Emergency circuit breakers

[Full Tutorial →](#tutorial-3-details)

---

## Tutorial 4: Custom Policy Languages

**Goal:** Extend SSI with domain-specific policy expressions.

**What you'll learn:**
- Policy DSL design
- Kernel plugin architecture
- Validation and testing
- Publishing custom envelopes

[Full Tutorial →](#tutorial-4-details)

---

## Tutorial 5: Production Deployment

**Goal:** Deploy SSI Gateway and Kernel to production infrastructure.

**What you'll learn:**
- High-availability architecture
- Load balancing and failover
- Monitoring and alerting
- Security hardening

[Full Tutorial →](#tutorial-5-details)

---

## Coming Soon

- Tutorial 6: Federated SSI for Multi-Organization Systems
- Tutorial 7: Integrating with Existing AI Platforms (Langchain, AutoGPT, etc.)
- Tutorial 8: Building Safety Monitors with SSI
- Tutorial 9: Privacy-Preserving Governance with Encrypted Envelopes
- Tutorial 10: SSI for Robotics and Physical AI Systems

---

## Contributing Tutorials

Have a great SSI use case? We welcome community tutorials!

1. Write your tutorial in Markdown
2. Submit via GitHub PR to `/docs/developers/tutorials/`
3. Include code samples and diagrams
4. Working Group will review and publish

---

## Tutorial Support

Questions about tutorials? Ask in:
- **Discord:** #tutorials channel
- **GitHub Discussions:** Q&A section
- **Office Hours:** Monthly community calls
