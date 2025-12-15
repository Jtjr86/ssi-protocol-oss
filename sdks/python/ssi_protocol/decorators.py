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
"""Decorator pattern for SSI governance - wrap existing functions"""

import functools
import inspect
from typing import Any, Callable, Optional

from .client import SSIClient
from .exceptions import SSIError


def ssi_governed(
    system_id: str,
    action_type: str,
    client_id: Optional[str] = None,
    gateway_url: Optional[str] = None,
    fail_open: bool = False,
    payload_builder: Optional[Callable[[Any], dict]] = None,
) -> Callable:
    """
    Decorator to wrap functions with SSI governance

    Args:
        system_id: SSI system identifier (e.g., "trading-prod")
        action_type: Action type (e.g., "trade.order.place")
        client_id: Client identifier (default: function name)
        gateway_url: SSI Gateway URL (default: http://localhost:4040)
        fail_open: Allow execution when Gateway unavailable (default: False)
        payload_builder: Custom function to build payload from args/kwargs

    Example:
        >>> @ssi_governed(
        ...     system_id="trading-prod",
        ...     action_type="trade.order.place"
        ... )
        ... def place_order(symbol: str, notional: float):
        ...     return execute_trade(symbol, notional)

        >>> # SSI automatically evaluates before executing
        >>> place_order("BTCUSD", 5000)
    """

    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            # Initialize SSI client
            client = SSIClient(gateway_url=gateway_url, fail_open=fail_open)

            # Build payload
            if payload_builder:
                payload = payload_builder(args, kwargs)
            else:
                # Auto-build payload from function signature
                sig = inspect.signature(func)
                bound_args = sig.bind(*args, **kwargs)
                bound_args.apply_defaults()
                payload = dict(bound_args.arguments)

            # Evaluate governance
            decision = client.evaluate(
                client_id=client_id or func.__name__,
                system_id=system_id,
                action_type=action_type,
                payload=payload,
            )

            # Check decision
            if decision.denied:
                raise SSIError(
                    f"SSI governance DENIED action: {decision.reason} "
                    f"(Rules: {', '.join(decision.rules_triggered)})"
                )

            # Execute original function
            return func(*args, **kwargs)

        return wrapper

    return decorator
