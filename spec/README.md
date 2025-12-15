# SSI Protocol Specification

This directory contains the formal specification for the SSI Protocol, including JSON schemas and conformance test vectors.

## Contents

### JSON Schemas (`schemas/`)

Machine-readable contracts that define the protocol's data formats:

- **`envelope.schema.json`** - Governance envelope structure
  - Required: `id`, `name`, `version`, `rules`
  - Rules must have: `id`, `condition`, `action` (ALLOW/DENY)
  - Versions must be semver: `x.y.z`

- **`request.schema.json`** - Decision request format
  - Required: `client_id`, `system_id`, `action`
  - Action must have: `type`, `payload`
  - Optional: `context` for metadata

- **`decision.schema.json`** - Decision response format
  - Required: `success`, `decision`
  - Decision must have: `decision` (ALLOW/DENY), `reason`
  - Includes: `rules_evaluated`, `rules_triggered`, `envelope`, `rpx_id`

- **`rpx.schema.json`** - RPX audit entry format
  - Required: `rpx_id`, `timestamp`, `client_id`, `system_id`, `action`, `decision`, `hash`
  - Hash must be SHA256 (64 hex chars)
  - Tamper-evident: hash covers request + envelope_id + decision

## Usage

### Validate Envelope

```bash
# Using ssictl
ssictl lint reference/kernel/envelopes/trading-safety.v0.2.1.json

# Using ajv-cli
npm install -g ajv-cli
ajv validate -s spec/schemas/envelope.schema.json -d reference/kernel/envelopes/*.json
```

### Validate Request/Response

```typescript
import Ajv from 'ajv';
import requestSchema from './spec/schemas/request.schema.json';

const ajv = new Ajv();
const validate = ajv.compile(requestSchema);

const request = {
  client_id: 'my-app',
  system_id: 'trading-prod',
  action: {
    type: 'trade.order.place',
    payload: { notional: 3000 }
  }
};

if (validate(request)) {
  // Valid request
} else {
  console.error(validate.errors);
}
```

## Conformance Testing

See `../tests/conformance/` for test vectors that validate Gateway + Kernel implementations against these schemas.

## Schema Versioning

Schemas follow the protocol version:

- v0.3.0 - Current (envelope versioning, RPX hashing)
- v0.2.0 - External Kernel service
- v0.1.0 - Initial monolith Gateway

Breaking changes require major version bump.

## Contributing

When modifying schemas:

1. Update the relevant `.schema.json` file
2. Update conformance test vectors if needed
3. Run conformance tests to verify compatibility
4. Update SDK examples to match new schema
5. Increment protocol version if breaking change

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines.
