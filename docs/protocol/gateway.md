# SSI Gateway — Policy Router & Request Orchestration

## 1. Overview

The **SSI Gateway** is the entry point for all AI requests in an SSI-governed system.

It acts as a:
- **Policy-aware router** — directing requests to appropriate kernel instances
- **Request normalizer** — translating diverse AI protocols into SSI format
- **Load balancer** — distributing evaluation across kernel infrastructure
- **Monitoring point** — collecting metrics and health data

## 2. Core Responsibilities

- Accept requests from AI systems in various formats
- Normalize requests to SSI internal schema
- Route to appropriate kernel(s) based on policy scope
- Aggregate and return decisions to calling systems
- Monitor throughput, latency, and error rates

## 3. Architecture

```
┌─────────────────────────────────────┐
│  Protocol Adapters                  │
│  (HTTP, gRPC, WebSocket, etc.)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Request Normalization              │
│  - Parse & validate                 │
│  - Extract context                  │
│  - Enrich with metadata             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Routing & Orchestration            │
│  - Select kernel(s)                 │
│  - Parallel evaluation (if needed)  │
│  - Aggregate results                │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Response Formatting                │
│  - Convert to caller's format       │
│  - Attach decision + reasoning      │
└──────────────────────────────────────┘
```

## 4. Deployment Patterns

### Single-Kernel Gateway
Simple deployments with one kernel instance behind the gateway.

### Multi-Kernel Gateway
High-availability deployments with multiple kernel instances for redundancy and load distribution.

### Federated Gateway
Distributed deployments where different policy domains have separate gateways.

## 5. Integration Points

- **API Protocols:** REST, gRPC, GraphQL
- **Authentication:** OAuth 2.0, API keys, mTLS
- **Observability:** OpenTelemetry, Prometheus metrics
- **Service Mesh:** Istio, Linkerd compatible

## 6. Versioning

- **Current version:** `gateway-spec v0.1.0 (draft)`
- **API compatibility:** Semantic versioning for breaking changes
