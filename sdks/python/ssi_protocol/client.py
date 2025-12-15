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
"""SSI Protocol Client - Main HTTP client for Gateway communication"""

import os
from typing import Any, Dict, Optional
from dataclasses import dataclass
import requests

from .exceptions import SSIGatewayError, SSIKernelError


@dataclass
class SSIDecision:
    """Represents a governance decision from SSI Kernel"""

    decision: str  # "ALLOW" or "DENY"
    reason: str
    rules_evaluated: list[str]
    rules_triggered: list[str]
    rpx_id: Optional[str] = None

    @property
    def allowed(self) -> bool:
        """Returns True if decision is ALLOW"""
        return self.decision == "ALLOW"

    @property
    def denied(self) -> bool:
        """Returns True if decision is DENY"""
        return self.decision == "DENY"


class SSIClient:
    """
    SSI Protocol HTTP Client

    Communicates with SSI Gateway to evaluate actions against governance policies.

    Example:
        >>> client = SSIClient()
        >>> decision = client.evaluate(
        ...     client_id="my-app",
        ...     system_id="trading-prod",
        ...     action_type="trade.order.place",
        ...     payload={"notional": 5000}
        ... )
        >>> if decision.allowed:
        ...     execute_action()
    """

    def __init__(
        self,
        gateway_url: Optional[str] = None,
        timeout: int = 5,
        fail_open: bool = False,
    ):
        """
        Initialize SSI Client

        Args:
            gateway_url: URL of SSI Gateway (default: http://localhost:4040)
            timeout: HTTP request timeout in seconds (default: 5)
            fail_open: If True, allow actions when Gateway unavailable (default: False)
        """
        self.gateway_url = gateway_url or os.getenv(
            "SSI_GATEWAY_URL", "http://localhost:4040"
        )
        self.timeout = timeout
        self.fail_open = fail_open

    def evaluate(
        self,
        client_id: str,
        system_id: str,
        action_type: str,
        payload: Dict[str, Any],
        context: Optional[Dict[str, Any]] = None,
    ) -> SSIDecision:
        """
        Evaluate an action against SSI governance policies

        Args:
            client_id: Identifier for the client application
            system_id: System identifier (e.g., "trading-prod")
            action_type: Type of action (e.g., "trade.order.place")
            payload: Action payload (e.g., {"notional": 5000})
            context: Optional context metadata

        Returns:
            SSIDecision object with decision details

        Raises:
            SSIGatewayError: If Gateway request fails and fail_open=False
        """
        url = f"{self.gateway_url}/v1/decisions"

        request_body = {
            "client_id": client_id,
            "system_id": system_id,
            "action": {"type": action_type, "payload": payload},
        }

        if context:
            request_body["context"] = context

        try:
            response = requests.post(
                url, json=request_body, timeout=self.timeout, headers={"Content-Type": "application/json"}
            )
            response.raise_for_status()

            data = response.json()

            if not data.get("success"):
                raise SSIKernelError(f"Kernel evaluation failed: {data.get('error')}")

            decision_data = data["decision"]

            return SSIDecision(
                decision=decision_data["decision"],
                reason=decision_data["reason"],
                rules_evaluated=decision_data.get("details", {}).get("rules_evaluated", []),
                rules_triggered=decision_data.get("details", {}).get("rules_triggered", []),
                rpx_id=data.get("rpx_id"),
            )

        except requests.RequestException as e:
            if self.fail_open:
                # Fail open: allow action when Gateway unavailable
                return SSIDecision(
                    decision="ALLOW",
                    reason=f"Gateway unavailable (fail-open mode): {str(e)}",
                    rules_evaluated=[],
                    rules_triggered=[],
                )
            else:
                raise SSIGatewayError(f"Failed to reach SSI Gateway: {str(e)}") from e

    def health_check(self) -> bool:
        """
        Check if SSI Gateway is reachable

        Returns:
            True if Gateway is healthy, False otherwise
        """
        try:
            response = requests.get(f"{self.gateway_url}/health", timeout=2)
            return response.status_code == 200
        except requests.RequestException:
            return False
