# SSI Protocol Integrity Guidelines

## 🛡️ **Purpose**

These guidelines ensure that **all public claims accurately reflect actual implementation** and prevent over-claiming, speculation, or misrepresentation of protocol capabilities.

---

## 🚨 **CRITICAL RULE: CODE IS SINGLE SOURCE OF TRUTH**

**If it's not implemented in code, it cannot be claimed as implemented.**

### What This Means:
- ✅ **Describe what exists**: Current working implementation only
- ❌ **Don't claim what's planned**: Future roadmap items presented as current
- ❌ **Don't imply automation**: When human approval is required
- ❌ **Don't oversell capabilities**: Beyond what code actually does

---

## 🎯 **APPROVED LANGUAGE PATTERNS**

### ✅ **ACCURATE: Human-Approved Automation**
- "Automated policy **proposal generation** with human approval"
- "Policy feedback engine that **suggests** changes for review"
- "**Human-supervised** closed-loop governance"
- "Automated analysis with **approval workflow**"

### ❌ **OVER-CLAIMING: Fully Autonomous**
- ~~"Self-evolving AI governance protocol"~~
- ~~"Automatically evolves policies in real-time"~~
- ~~"Truly autonomous governance protocol"~~
- ~~"Automated intelligence continuously learns"~~

### ✅ **ACCURATE: Protocol vs Runtime Separation**
- "SSI Protocol specification with reference runtime implementation"
- "Protocol defines interfaces; runtime provides working example"
- "Reference implementation demonstrates protocol capabilities"

### ❌ **CONFUSING: Protocol/Runtime Blur**
- ~~"SSI Protocol automatically does X"~~ (when only runtime does X)
- ~~Protocol claims that describe runtime-specific features~~

---

## 📋 **MANDATORY CHECKS BEFORE PUBLICATION**

### 1. **Capability Verification Checklist**

For every public claim, verify:
- [ ] **Code Implementation**: Feature exists in working code
- [ ] **Human Approval**: Acknowledge where human intervention is required
- [ ] **Scope Accuracy**: Distinguish protocol specification vs runtime implementation
- [ ] **Timeline Accuracy**: Present tense only for implemented features

### 2. **Language Audit Questions**

Before publishing any content, ask:
1. **"Can a user reproduce this claim by running our code?"**
2. **"Does this require human approval that we're not mentioning?"**
3. **"Are we describing the protocol or just our reference implementation?"**
4. **"Would a regulator consider this claim misleading?"**

If any answer is problematic, revise the language.

### 3. **Prohibited Words/Phrases**

**🚫 BANNED unless factually accurate:**
- "Self-evolving" (system requires human approval)
- "Autonomous" (system has human approval gates) 
- "Automatically evolves policies" (evolution requires approval)
- "Real-time policy evolution" (approval workflow prevents real-time)
- "Truly autonomous governance" (has mandatory approval gates)

**✅ PREFERRED alternatives:**
- "Human-supervised policy evolution"
- "Automated proposal generation with approval workflow"
- "Policy feedback system with governance oversight"
- "Closed-loop governance with human approval gates"

---

## 🔍 **SPECIFIC IMPLEMENTATION FACTS**

### Current Policy Feedback System
**✅ WHAT IT DOES:**
- Analyzes RPX logs for decision patterns
- Generates policy change proposals automatically
- Provides CLI workflow for human review and approval
- Updates envelopes after human approval
- Triggers system reload after changes

**❌ WHAT IT DOESN'T DO:**
- Make policy changes without human approval
- Evolve policies in real-time without intervention
- Operate fully autonomously
- Learn or adapt using machine learning

### Decision Provenance System  
**✅ WHAT IT DOES:**
- Tracks every decision with cryptographic hashes
- Provides complete audit trail from request to decision
- Links decisions to specific envelope versions
- Enables replay and verification of decision logic

**❌ WHAT IT DOESN'T DO:**
- Automatically improve decision quality over time
- Learn from past decisions to make better future decisions
- Evolve decision logic based on outcomes

---

## 🧪 **COMPLIANCE TESTING PROCEDURE**

### Regular Integrity Audits

**Monthly Requirement**: Run this audit prompt in VS Code:

```
You are a senior protocol engineer and standards auditor. Perform a consistency and integrity audit of this repository to ensure that recent documentation, messaging, navigation, and positioning changes accurately reflect what the codebase actually implements today.

HARD CONSTRAINTS:
1. Do NOT invent new features, claims, or capabilities
2. Do NOT add or suggest internal modules, algorithms, or undisclosed mechanisms  
3. Do NOT change protocol semantics
4. Do NOT rewrite language unless there is a factual mismatch
5. Treat the codebase as the single source of truth

Check for alignment between:
- Protocol claims ↔ actual protocol code
- Runtime claims ↔ actual reference runtime behavior  
- Governance descriptions ↔ actual enforcement + envelope handling
- Auditability claims ↔ actual audit trail generation
- "Self-evolving" descriptions ↔ what is concretely implemented vs aspirational

Return ONLY: Alignment Report (table format), Risk Flags (factual only), Verdict (aligned/mostly aligned/misaligned)
```

### Pre-Publication Checklist

Before any public content release:
- [ ] Run integrity audit prompt
- [ ] Review all capability claims against code
- [ ] Verify no over-claiming in marketing language
- [ ] Confirm protocol vs runtime boundaries are clear
- [ ] Test that claims can be reproduced by users

---

## 🎖️ **AUTHORITY POSITIONING GUIDELINES**

### ✅ **LEGITIMATE AUTHORITY CLAIMS**
- "First protocol-deterministic framework for SSI operations"
- "Complete operational implementation with decision provenance"
- "Standards-ready protocol with comprehensive documentation"
- "Working multi-service architecture with audit capabilities"

### ✅ **TECHNICAL LEADERSHIP CLAIMS**
- "Operational determinism with cryptographic validation"
- "Complete decision provenance implementation"
- "Multi-service architecture with protocol boundaries"
- "Standards body submission-ready documentation"

### ❌ **AVOID UNSUBSTANTIATED CLAIMS**
- Claims about AI capabilities beyond policy evaluation
- Autonomous behavior claims when human approval required
- Learning/intelligence claims for rule-based systems
- Real-time evolution claims when approval workflows exist

---

## 🛡️ **VIOLATION RESPONSE PROTOCOL**

### If Over-Claiming is Discovered:

1. **IMMEDIATE ACTION** (within 24 hours):
   - Identify all instances of problematic language
   - Create corrective edits maintaining factual accuracy
   - Update public-facing materials
   - Document the correction in commit messages

2. **ROOT CAUSE ANALYSIS**:
   - Determine how over-claiming occurred
   - Update this guidelines document if needed
   - Add specific language patterns to prohibited list
   - Implement additional review checkpoints

3. **PREVENTION MEASURES**:
   - Require integrity audit before major releases
   - Add automated checks for prohibited language patterns
   - Establish peer review for all public claims
   - Regular training on accuracy requirements

---

## 📚 **EXAMPLES: BEFORE/AFTER CORRECTIONS**

### Example 1: Automation Claims

**❌ BEFORE:**
> "SSI v0.3.1 introduces the breakthrough self-evolving governance system. The automated intelligence continuously learns from real-world AI behavior, evolving policies in real-time."

**✅ AFTER:**  
> "SSI v0.3.1 introduces comprehensive policy feedback capabilities. The system analyzes decision patterns and generates policy change proposals that require human approval before implementation."

### Example 2: Autonomy Claims

**❌ BEFORE:**
> "Experience the world's first closed-loop governance system with automated policy evolution."

**✅ AFTER:**
> "Experience comprehensive closed-loop governance with automated policy analysis and human-supervised evolution workflow."

### Example 3: Real-Time Claims

**❌ BEFORE:**
> "Policies evolve in real-time while maintaining cryptographic integrity."

**✅ AFTER:**
> "Policy changes are applied through controlled workflow with cryptographic integrity validation and approval gates."

---

## 🎯 **SUCCESS METRICS**

### Integrity Maintenance Goals:
- **Zero factual misstatements** in public materials
- **100% reproducible claims** by users running code
- **Clear separation** between protocol and implementation claims  
- **Accurate representation** of human approval requirements
- **Consistent messaging** across all channels and documents

### Regular Assessment:
- Monthly integrity audits with documented results
- User feedback collection on claim accuracy
- Standards body review feedback incorporation
- Legal review for regulatory compliance claims

---

## 🚀 **ENFORCEMENT**

**This document is MANDATORY for all:**
- Public website content
- Documentation updates  
- Marketing materials
- Standards body submissions
- Conference presentations
- Blog posts and social media
- README and repository documentation

**No exceptions.** Protocol credibility depends on factual accuracy.

---

**Document Version**: 1.0  
**Effective Date**: December 12, 2025  
**Next Review**: January 12, 2026  
**Owner**: SSI Protocol Development Team  
**Authority**: Technical accuracy and regulatory compliance requirements