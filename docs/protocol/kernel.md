# SSI Kernel — Architecture & Responsibilities

## 1. Overview

The **SSI Kernel** is the decision and policy-evaluation core of the SSI Protocol.

It sits between:

- upstream AI systems (models, agents, services), and  
- downstream effectors (trading systems, actuators, APIs, etc.),

and ensures every high-impact action passes through **governance envelopes** and **RPX audit trails**.

## 2. Core Responsibilities

- Evaluate incoming requests against **policy envelopes**  
- Compute **advisory / ALLOW / DENY / MODIFY** decisions  
- Attach **reasoning + context** to each decision  
- Emit **RPX records** for durable audit and replay  

## 3. Logical Architecture

```
┌─────────────────────────────────────┐
│  Input Adapters                     │
│  (Normalize requests from various   │
│   AI systems and protocols)         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Policy Evaluation Pipeline         │
│  - Load applicable envelopes        │
│  - Check constraints                │
│  - Evaluate rules                   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Decision Engine                    │
│  - Compute final decision           │
│  - Generate reasoning trace         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  RPX Emission                       │
│  - Package request + decision       │
│  - Write to audit trail             │
└──────────────────────────────────────┘
```

## 4. Interfaces

> This section will define the stable interfaces and data structures used by kernel implementations.

Planned subsections:

- **Request Format** — Standardized input schema
- **Envelope Format** — Policy container structure
- **Decision Format** — Output schema with reasoning
- **Error Semantics** — How failures are handled and reported

## 5. Safety Invariants

At minimum, every kernel implementation must:

- **[INVARIANT-1]** Never execute a high-impact action without policy evaluation
- **[INVARIANT-2]** Always emit an RPX record for auditable actions
- **[INVARIANT-3]** Fail safely when policy cannot be loaded or evaluated
- **[INVARIANT-4]** Preserve request context throughout the decision pipeline

(Additional invariants will be derived from SSI safety canvases.)

## 6. Versioning

The kernel spec is versioned independently but must remain compatible with the RPX and envelope specs.

- **Current version:** `kernel-spec v0.1.0 (draft)`
- **Compatibility:** RPX v0.1.x, Envelope v0.1.x
