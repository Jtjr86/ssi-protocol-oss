/*
 * Copyright 2025 Jtjr86
 *
 * Licensed under the Apache License, Version 2.0 (the \"License\");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an \"AS IS\" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, CheckCircle, Terminal, Code, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Quick Start Guide - SSI Developers",
  description: "Get started with SSI in minutes - from installation to your first governed agent",
};

export default function QuickstartPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">Quick Start Guide</h1>
            </div>
            <p className="text-xl text-white leading-relaxed">
              Get your first SSI-governed autonomous agent running in under 15 minutes
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Prerequisites</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make sure you have these installed before starting
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-2">
              <CardContent className="pt-6">
                <CheckCircle className="text-ssi-teal mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Node.js 18+</h3>
                <p className="text-gray-600 text-sm">Or Python 3.9+ for Python SDK</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6">
                <CheckCircle className="text-ssi-teal mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">API Key</h3>
                <p className="text-gray-600 text-sm">Free developer account at ssi.dev</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6">
                <CheckCircle className="text-ssi-teal mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Terminal</h3>
                <p className="text-gray-600 text-sm">Basic command line familiarity</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Step-by-Step Setup</h2>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-3">Install the SSI SDK</h3>
                  <p className="text-gray-600 mb-4">
                    Choose your preferred language and install the reference SDK:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2 text-gray-700">JavaScript/TypeScript:</p>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm">
                        <pre>npm install @ssi/sdk</pre>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2 text-gray-700">Python:</p>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm">
                        <pre>pip install ssi-sdk</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-3">Run the SSI Reference Gateway</h3>
                  <p className="text-gray-600 mb-4">
                    The reference Gateway implementation is included in this repo. Start it locally:
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm mb-4">
                    <pre>{`cd reference/gateway
npm install
npm run build
node dist/server.js`}</pre>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-sm text-green-900">
                      <strong>✓ Gateway running</strong> on{" "}
                      <code className="bg-green-100 px-2 py-1 rounded">http://localhost:4040</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-3">Send Your First SSI Request</h3>
                  <p className="text-gray-600 mb-4">
                    Test the Gateway with a governed decision request (ALLOW scenario):
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto mb-4">
                    <pre>{`curl -X POST http://localhost:4040/v1/decisions \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "demo-client",
    "system_id": "trading-prod",
    "action": {
      "type": "trade.order.place",
      "payload": { "notional": 5000 }
    }
  }'`}</pre>
                  </div>

                  <p className="text-sm text-gray-700 mb-2 font-semibold">Expected Response:</p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "success": true,
  "decision": {
    "decision": "ALLOW",
    "reason": "Within policy limits.",
    "details": {
      "rules_evaluated": ["RULE-MAX-NOTIONAL-001"],
      "rules_triggered": [],
      "invariants_violated": []
    }
  },
  "rpx_id": "3193b873-f786-4cce-80f8-0b02a86898ed"
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-3">Test Governance Enforcement</h3>
                  <p className="text-gray-600 mb-4">
                    Now try a request that <strong>exceeds the policy limit</strong> (DENY scenario):
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto mb-4">
                    <pre>{`curl -X POST http://localhost:4040/v1/decisions \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "demo-client",
    "system_id": "trading-prod",
    "action": {
      "type": "trade.order.place",
      "payload": { "notional": 15000 }
    }
  }'`}</pre>
                  </div>

                  <p className="text-sm text-gray-700 mb-2 font-semibold">Expected Response:</p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "success": true,
  "decision": {
    "decision": "DENY",
    "reason": "Order notional 15000 exceeds max allowed 10000",
    "details": {
      "rules_evaluated": ["RULE-MAX-NOTIONAL-001"],
      "rules_triggered": ["RULE-MAX-NOTIONAL-001"],
      "invariants_violated": []
    }
  },
  "rpx_id": "e39572cf-c843-4504-b5e5-5b5241deb461"
}`}</pre>
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
                    <p className="text-sm text-amber-900">
                      <strong>Policy in action:</strong> The Gateway's governance envelope includes <code className="bg-amber-100 px-2 py-1 rounded">RULE-MAX-NOTIONAL-001</code> which denies orders over $10,000.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-xl">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-3">Inspect the RPX Audit Trail</h3>
                  <p className="text-gray-600 mb-4">
                    Every decision is logged to an immutable audit trail. View the RPX log:
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto mb-4">
                    <pre>{`# View raw RPX entries
cat reference/gateway/rpx-log.jsonl

# Or use jq for formatted output
cat reference/gateway/rpx-log.jsonl | jq`}</pre>
                  </div>

                  <p className="text-sm text-gray-700 mb-2 font-semibold">Each RPX Entry Contains:</p>
                  <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                    <li><strong>Request details:</strong> client_id, system_id, action type, payload</li>
                    <li><strong>Governance envelope:</strong> rules applied, version, scope</li>
                    <li><strong>Kernel decision:</strong> ALLOW/DENY, reasoning, rules evaluated</li>
                    <li><strong>Audit metadata:</strong> RPX ID, timestamps, cryptographic-style trail</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                    <p className="text-sm text-blue-900">
                      <strong>What you just built:</strong> A complete SSI flow — Request → Envelope → Kernel → Decision → RPX Trail
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Testing & Validation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verify your integration works correctly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <Terminal className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Run Test Suite</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  SSI SDK includes built-in tests to validate your agent configuration:
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm mb-4">
                  <pre>npm run ssi:test</pre>
                </div>
                <p className="text-sm text-gray-600">
                  Tests verify connectivity, credentials, policy loading, and basic RPX flow
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Code className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Sandbox Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Test with sandbox Gateway that simulates governance without side effects:
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm mb-4">
                  <pre>{`gatewayUrl: 'https://sandbox.ssi.dev'`}</pre>
                </div>
                <p className="text-sm text-gray-600">
                  Sandbox uses test policies and doesn't execute actual agent actions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Next Steps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Continue your SSI journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Explore API Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Deep dive into complete API documentation for advanced features
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/developers/api">View API Docs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Follow Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Step-by-step guides for common integration patterns
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/developers/tutorials">View Tutorials</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">Customize Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  Learn to create governance envelopes tailored to your needs
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/protocol/governance-envelopes">Learn About Policies</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Need Help?</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Join our developer community for support and discussion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
              <Link href="#">
                Join Discord <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ssi-navy bg-transparent">
              <Link href="#">
                GitHub Discussions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
