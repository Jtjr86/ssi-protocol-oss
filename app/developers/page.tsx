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
import { Code, Book, Rocket, Github, Terminal, Package, FileCode, PlayCircle } from "lucide-react";

export const metadata = {
  title: "Developers - SSI",
  description: "Developer resources, SDKs, and documentation for integrating SSI into your autonomous agent systems",
};

export default function DevelopersPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">Protocol Implementation Guide</h1>
            <p className="text-xl text-white leading-relaxed mb-8">
              Build SSI Protocol-compliant systems or deploy the reference runtime implementation
            </p>
            <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
              <Link href="https://github.com/Jtjr86/ssi-protocol-oss">
                <Github className="mr-2" size={20} />
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Code className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Quick Start</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Get up and running with SSI in minutes using our starter templates and examples.
                </CardDescription>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/developers/quickstart">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Book className="text-ssi-teal mb-4" size={32} />
                <CardTitle>API Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Complete API documentation for SSI Gateway, Kernel, and RPX protocol.
                </CardDescription>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/developers/api">View Docs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Rocket className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Step-by-step guides for common integration patterns and use cases.
                </CardDescription>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/developers/tutorials">Browse Tutorials</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">SDK Libraries</h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Reference SDK implementations available in repository (not yet published to package registries)
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
              <Card className="border-2 border-ssi-teal hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Terminal className="text-ssi-teal mb-4" size={32} />
                  <CardTitle className="text-xl">Python SDK</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-4">
                    # Clone repo and install locally<br />
                    cd sdks/python && pip install -e .
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li>• Client library with decorator support</li>
                    <li>• Compatible with Python 3.8+</li>
                    <li>• Type hints included</li>
                    <li>• Not yet published to PyPI</li>
                  </ul>
                  <Button asChild className="w-full bg-ssi-navy hover:bg-blue-900">
                    <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/sdks/python">View Code</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-ssi-teal hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Terminal className="text-ssi-teal mb-4" size={32} />
                  <CardTitle className="text-xl">TypeScript/Node.js SDK</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-4">
                    # Clone repo and install locally<br />
                    cd sdks/typescript && npm install
                  </div>
                  <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li>• Express middleware included</li>
                    <li>• TypeScript definitions</li>
                    <li>• Node.js 16+ compatible</li>
                    <li>• Not yet published to npm</li>
                  </ul>
                  <Button asChild className="w-full bg-ssi-navy hover:bg-blue-900">
                    <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/sdks/typescript">View Code</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="max-w-4xl mx-auto border-2 border-gray-300">
              <CardHeader>
                <Package className="text-gray-400 mb-2" size={24} />
                <CardTitle className="text-lg text-gray-700">Docker Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                  # Build from repo<br />
                  cd docker && docker-compose build
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Docker build files included in repo. Build locally with docker-compose. (Not yet published to Docker Hub)
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/docker">Docker Docs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
            <h2 className="text-3xl font-bold mb-6">5-Minute Quick Start</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-ssi-navy">1. Start SSI Services</h3>
                <div className="bg-ssi-navy text-white p-4 rounded-lg font-mono text-sm mb-4">
                  <pre>{`# Build from repository
cd docker
docker-compose build
docker-compose up -d

# Verify running
curl http://localhost:4040/health
curl http://localhost:5050/health`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-ssi-navy">2. Install SDK</h3>
                <div className="bg-ssi-navy text-white p-4 rounded-lg font-mono text-sm mb-4">
                  <pre>{`# Python (from repository)
cd sdks/python && pip install -e .

# OR Node.js/TypeScript (from repository)
cd sdks/typescript && npm install

# Note: Packages not yet published to
# PyPI or npm registries`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-ssi-navy">3. Write Code (Python)</h3>
                <div className="bg-ssi-navy text-white p-4 rounded-lg font-mono text-sm">
                  <pre>{`from ssi_protocol import SSIClient

client = SSIClient()

decision = client.evaluate(
  client_id="my-app",
  system_id="trading-prod",
  action_type="trade.order.place",
  payload={"notional": 3000}
)

if decision.allowed:
  # Execute action
  print("✅ ALLOW:", decision.reason)
else:
  # Block action
  print("❌ DENY:", decision.reason)`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-ssi-navy">4. View Audit Trail</h3>
                <div className="bg-ssi-navy text-white p-4 rounded-lg font-mono text-sm">
                  <pre>{`# View audit trail (JSON Lines format)
cat reference/gateway/rpx-log.jsonl

# Each line is a JSON object with:
# - rpx_id: Unique audit ID
# - decision: ALLOW/DENY
# - envelope: Policy version applied
# - hash: Hash-based integrity
# - timestamp: When decision made

# Full audit trail stored in:
# reference/gateway/rpx-log.jsonl`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-center">Reference Implementation</h2>
          <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Reference Gateway implementation demonstrating integration patterns
          </p>

          <Card className="border-2 border-ssi-teal bg-gradient-to-br from-teal-50 to-blue-50">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <PlayCircle className="text-ssi-teal" size={32} />
                <CardTitle className="text-2xl">SSI Gateway Reference (Node/TypeScript)</CardTitle>
              </div>
              <CardDescription className="text-base">
                Reference implementation included in this repository — start in 3 commands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">Features:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Endpoint:</strong> <code className="bg-white px-2 py-0.5 rounded text-sm">POST /v1/decisions</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Implements:</strong> Request → Envelope → Kernel → RPX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Policy:</strong> Max notional enforcement (ALLOW/DENY)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Audit Trail:</strong> Append-only RPX log in JSONL format</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">Quick Start:</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm">
                    <pre>{`cd reference/gateway
npm install
npm run build
node dist/server.js`}</pre>
                  </div>
                  <div className="mt-3 bg-gray-50 border-2 border-gray-300 rounded p-3">
                    <p className="text-sm text-gray-700">
                      <strong>Reference Status:</strong> v0.1.0 — Demo implementation
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button asChild className="bg-ssi-teal hover:bg-teal-600">
                  <Link href="/developers/quickstart">
                    <Terminal className="mr-2" size={16} />
                    Run Locally
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/reference/gateway">
                    <Github className="mr-2" size={16} />
                    View Source
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-center">Reference Clients</h2>
          <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Reference implementations demonstrating SSI integration across different domains
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileCode className="text-ssi-teal" size={28} />
                  <CardTitle className="text-xl">Trading Client</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Demonstrates pre-trade governance using the SSI Gateway for algorithmic trading systems.
                </CardDescription>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Max notional enforcement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Risk-based approvals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Append-only audit log</span>
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/reference/client-trader">
                      View Source
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-ssi-teal hover:bg-teal-600">
                    <Link href="/developers/tutorials#trading-client">
                      Read Tutorial
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-ssi-teal" size={28} />
                  <CardTitle className="text-xl">Healthcare Client</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Medication dosage safety with fail-closed behavior and audit trails for clinical AI systems.
                </CardDescription>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>HIPAA-relevant pattern examples</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Fail-safe defaults</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Clinical decision support</span>
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/reference/client-healthcare">
                      View Source
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-ssi-teal hover:bg-teal-600">
                    <Link href="/developers/tutorials#healthcare-client">
                      Read Tutorial
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Code className="text-ssi-teal" size={28} />
                  <CardTitle className="text-xl">Content Moderation Client</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  High-volume AI content moderation with transparent appeals and RPX-backed decisions.
                </CardDescription>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Bias detection & appeals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Transparent decisions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Multi-stakeholder oversight</span>
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/reference/client-content-mod">
                      View Source
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-ssi-teal hover:bg-teal-600">
                    <Link href="/developers/tutorials#content-mod-client">
                      Read Tutorial
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Rocket className="text-ssi-teal" size={28} />
                  <CardTitle className="text-xl">Client Template</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Starter integration for any domain: trading, robotics, autonomy, safety systems, and more.
                </CardDescription>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Boilerplate SSI integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Customizable policies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Complete documentation</span>
                  </li>
                </ul>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/reference/client-template">
                      View Source
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-ssi-teal hover:bg-teal-600">
                    <Link href="/developers/tutorials#client-template">
                      Read Tutorial
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Planned Starter Templates</h2>
          <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Template repositories in development for common SSI integration patterns
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-gray-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-gray-400" size={28} />
                  <CardTitle className="text-xl text-gray-700">Multi-Agent System</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Planned starter kit for building coordinated multi-agent systems with SSI safety governance.
                </CardDescription>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>Agent coordination patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>Shared governance policies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>Communication protocols</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-400" disabled>
                  <Github className="mr-2" size={16} />
                  In Development
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileCode className="text-gray-400" size={28} />
                  <CardTitle className="text-xl text-gray-700">LLM Agent Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Planned template for wrapping LLM-based agents with SSI safety governance and compliance validation.
                </CardDescription>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>OpenAI, Anthropic integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>Safety boundary enforcement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>Prompt injection protection</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-400" disabled>
                  <Github className="mr-2" size={16} />
                  In Development
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <PlayCircle className="text-gray-400" size={28} />
                  <CardTitle className="text-xl text-gray-700">Sandbox Environment</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Planned isolated testing environment for experimenting with SSI features and policy configurations.
                </CardDescription>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>Pre-configured test scenarios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>Policy testing utilities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span>Simulation tools</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-400" disabled>
                  <Github className="mr-2" size={16} />
                  In Development
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Explore and Contribute</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Contribute to the protocol development through GitHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-ssi-navy hover:bg-gray-100">
              <Link href="https://github.com/Jtjr86/ssi-protocol-oss">
                <Github className="mr-2" size={20} />
                GitHub Repository
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
