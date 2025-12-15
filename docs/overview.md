# SSI Protocol — Overview

## What is SSI?

**Sovereign Synthetic Intelligence (SSI)** is an open protocol for governing AI systems with constitutional safety, transparent audit trails, and multi-party oversight.

SSI provides infrastructure for:

- **Governance Envelopes** — Wrapping AI systems in policy-aware containers
- **SSI Gateway** — Routing high-impact decisions through policy evaluation
- **SSI Kernel** — Core decision engine with constitutional constraints
- **RPX (Request-Permission-Execution)** — Replayable audit trails for all AI actions

## Architecture

SSI is designed as a layered protocol:

```
┌─────────────────────────────────────┐
│   AI Systems (Models, Agents)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   SSI Gateway (Policy Router)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   SSI Kernel (Decision Engine)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   RPX Trail (Audit Log)              │
└──────────────────────────────────────┘
```

## Core Principles

1. **Constitutional Safety** — AI actions are evaluated against explicit governance rules
2. **Transparency** — All decisions are auditable with full context
3. **Multi-Party Oversight** — Governance involves founders, institutions, and regulators
4. **Open Standard** — Protocol is open, extensible, and implementation-agnostic

## Use Cases

- Autonomous trading systems with regulatory compliance
- AI agents managing critical infrastructure
- Multi-agent systems requiring coordination and oversight
- Any AI deployment requiring transparent governance

## Getting Started

- **Protocol Specs** → See `/docs/protocol/`
- **Governance Model** → See `/docs/governance/`
- **Developer Guide** → See `/docs/developers/`
- **Safety Architecture** → See `/docs/safety/`
