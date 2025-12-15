# Copyright 2025 Jtjr86
#
# Licensed under the Apache License, Version 2.0 (the \"License\");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an \"AS IS\" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Basic usage example of SSI Protocol Python SDK"""

from ssi_protocol import SSIClient

# Initialize client
client = SSIClient(gateway_url="http://localhost:4040")

# Check if Gateway is available
if not client.health_check():
    print("⚠️  SSI Gateway not available - start services first:")
    print("   docker run -p 4040:4040 ssiprotocol/gateway:v0.3.0")
    print("   docker run -p 5050:5050 ssiprotocol/kernel:v0.3.0")
    exit(1)

print("✅ SSI Gateway is available\n")

# Example 1: ALLOW scenario (under 5k limit in v0.2.1)
print("Example 1: Testing 3000 notional (should ALLOW)")
decision = client.evaluate(
    client_id="demo-python-sdk",
    system_id="trading-prod",
    action_type="trade.order.place",
    payload={"notional": 3000, "open_positions_count": 1},
)

print(f"Decision: {decision.decision}")
print(f"Reason: {decision.reason}")
print(f"Rules Evaluated: {decision.rules_evaluated}")
print(f"Rules Triggered: {decision.rules_triggered}")
print(f"RPX ID: {decision.rpx_id}")

if decision.allowed:
    print("✅ Action ALLOWED - would execute trade here\n")
else:
    print(f"❌ Action DENIED: {decision.reason}\n")

# Example 2: DENY scenario (exceeds 5k limit in v0.2.1)
print("Example 2: Testing 7000 notional (should DENY)")
decision = client.evaluate(
    client_id="demo-python-sdk",
    system_id="trading-prod",
    action_type="trade.order.place",
    payload={"notional": 7000, "open_positions_count": 1},
)

print(f"Decision: {decision.decision}")
print(f"Reason: {decision.reason}")
print(f"Rules Triggered: {decision.rules_triggered}")

if decision.denied:
    print(f"❌ Action DENIED - trade blocked by governance\n")

print("=" * 60)
print("✅ SSI Protocol integration working!")
print("=" * 60)
