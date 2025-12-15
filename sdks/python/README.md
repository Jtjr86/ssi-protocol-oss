# SSI Protocol - Python SDK

[![PyPI version](https://badge.fury.io/py/ssi-protocol.svg)](https://badge.fury.io/py/ssi-protocol)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Reference Python SDK for the [SSI Protocol](https://ssi-protocol.org) - Constitutional AI Governance.

## Installation

```bash
pip install ssi-protocol
```

## Quick Start

### 1. Start SSI Services

```bash
# Using Docker
docker run -d -p 5050:5050 ssiprotocol/kernel:v0.3.0
docker run -d -p 4040:4040 ssiprotocol/gateway:v0.3.0

# Or using local services
cd reference/kernel && npm start &
cd reference/gateway && npm start &
```

### 2. Wrap Your Application

```python
from ssi_protocol import SSIClient

# Initialize client
client = SSIClient(gateway_url="http://localhost:4040")

# Make governed decision
decision = client.evaluate(
    client_id="my-trading-bot",
    system_id="trading-prod",
    action_type="trade.order.place",
    payload={"notional": 5000, "open_positions_count": 1}
)

if decision.allowed:
    print(f"✅ ALLOW: {decision.reason}")
    # Execute the action
else:
    print(f"❌ DENY: {decision.reason}")
    # Block the action
```

### 3. Using the Decorator Pattern

```python
from ssi_protocol import ssi_governed

@ssi_governed(
    system_id="trading-prod",
    action_type="trade.order.place"
)
def place_order(symbol: str, notional: float, direction: str):
    """Place a trading order - automatically governed by SSI"""
    # Your trading logic here
    return execute_trade(symbol, notional, direction)

# SSI automatically checks governance before executing
result = place_order("BTCUSD", 5000, "LONG")
```

## Features

- ✅ **Simple API** - Integrate in minutes with minimal code changes
- ✅ **Decorator Pattern** - Wrap existing functions with `@ssi_governed`
- ✅ **Type Safety** - Full type hints for IDE autocomplete
- ✅ **Async Support** - `async/await` compatible client
- ✅ **Error Handling** - Graceful degradation when Gateway unavailable
- ✅ **Audit Trail** - Automatic RPX logging for compliance

## Examples

See [`examples/`](examples/) directory for:
- Trading system integration
- Healthcare AI governance
- Content moderation
- Multi-agent orchestration

## Documentation

Full documentation available at [ssi-protocol.org/developers](https://ssi-protocol.org/developers)

## License

Apache 2.0 - See [LICENSE](../../LICENSE)
