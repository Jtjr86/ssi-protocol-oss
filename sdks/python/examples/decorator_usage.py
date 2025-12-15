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
"""Decorator pattern example - wrap existing trading functions"""

from ssi_protocol import ssi_governed


@ssi_governed(
    system_id="trading-prod",
    action_type="trade.order.place"
)
def place_order(symbol: str, notional: float, direction: str, open_positions_count: int = 0):
    """
    Place a trading order - automatically governed by SSI
    
    SSI will evaluate this action BEFORE execution and block if policy violated.
    """
    print(f"🚀 Executing trade: {direction} {symbol} ${notional}")
    # Your actual trading logic here
    return {"order_id": "ORD123", "status": "filled"}


if __name__ == "__main__":
    print("SSI Decorator Pattern Example\n")
    
    # Example 1: ALLOW (under 5k limit)
    print("Test 1: 3000 notional (should execute)")
    try:
        result = place_order("BTCUSD", 3000, "LONG", open_positions_count=1)
        print(f"✅ Trade executed: {result}\n")
    except Exception as e:
        print(f"❌ Trade blocked: {e}\n")
    
    # Example 2: DENY (exceeds 5k limit)
    print("Test 2: 7000 notional (should be blocked)")
    try:
        result = place_order("ETHUSD", 7000, "LONG", open_positions_count=1)
        print(f"✅ Trade executed: {result}\n")
    except Exception as e:
        print(f"❌ Trade blocked: {e}\n")
    
    print("=" * 60)
    print("Decorator pattern prevents policy violations at function level!")
    print("=" * 60)
