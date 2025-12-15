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
import { Network, Server, Shield, Zap, Globe, CheckCircle, ArrowRight, Cloud, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "SSI Gateway - Reference Routing Component",
  description: "Reference implementation for routing RPX requests from agents to Kernel for pre-execution evaluation",
};

export default function GatewayPage() {
  return (
    <div className="bg-white">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="text-lg font-bold text-yellow-900 mb-1">Reference Implementation - Operator-Deployed</h3>
              <p className="text-yellow-800 leading-relaxed">
                This page describes a <strong>reference gateway implementation</strong> validated in controlled environments. SSI does not operate managed infrastructure, identity authority, compliance system, or availability guarantees. All deployment characteristics are <strong>operator-defined</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Network className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">SSI Gateway</h1>
            </div>
            <p className="text-xl text-white leading-relaxed mb-4">
              A reference routing component that forwards RPX requests from autonomous agents to an SSI Kernel for pre-execution policy evaluation.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              The Gateway handles agent connections, protocol normalization, and request routing to Kernel instances based on operator-defined deployment topology.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Architecture Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reference implementation for operator-managed gateway deployments
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-ssi-teal rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-4 text-center">Runtime Topology (v0.2.0)</h3>
            <pre className="bg-white p-6 rounded-lg text-sm overflow-x-auto border border-gray-200">
              <code>{`ASWF / Client → Gateway (:4040) → Kernel (:5050) → Decision → RPX
                     ↑
                JSON Envelopes
                (trading-safety.v0.2.0.json)`}</code>
            </pre>
            <p className="text-gray-700 mt-4 text-center">
              <strong>Gateway v0.2.0 is a thin router</strong> that calls external Kernel service via HTTP.
              <br />
              Validated in live trading environment (ASWF auto-trader) in shadow mode.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Shield className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Agent Connection Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Processes agent connection requests with operator-defined authentication, session management, and metadata tracking for RPX request routing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Server className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Request Routing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Routes RPX packets to Kernel instances based on operator-configured strategies: geographic proximity, load distribution, or custom policy rules.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Zap className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Protocol Translation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Normalizes diverse agent protocols into standard RPX format, enabling interoperability across different agent frameworks and communication standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Globe className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Request Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Reference implementation is single-instance. Operators may add load balancing, health checking, and failover mechanisms appropriate to their production deployment requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Shield className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Authentication & Authorization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Operator-defined authentication patterns (not included in reference implementation). Production deployments should implement access control appropriate to their security requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Cloud className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Deployment Flexibility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Reference implementation is single-instance. Operators may deploy across regions based on their latency, data residency, and redundancy requirements.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Agent Connection Process</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Initial Connection</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Agent initiates connection to gateway endpoint. Reference implementation uses HTTP. Operators should deploy TLS for production environments.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Credential Validation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Reference implementation does not include authentication. Operators should implement credential validation (API keys, certificates, or tokens) appropriate to their security requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Capability Declaration</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Agent declares capabilities (intended actions) and constraints. Gateway may validate declarations against operator-defined agent type policies.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Session Tracking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Gateway creates session context for the agent with operator-defined identifier format. This identifier is included in RPX requests for audit trail correlation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Connection Establishment</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Gateway provides endpoint information for RPX packet submission. Connection may be WebSocket, long-polling, or HTTP-based depending on operator deployment configuration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Routing & Distribution Patterns</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Example routing strategies operators may implement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Routing Strategy Examples</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Operators may configure routing strategies based on deployment requirements:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Geographic Routing:</span> Route to nearest Kernel based on agent location (operator-defined proximity rules)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Load-Based Routing:</span> Distribute requests based on Kernel instance load metrics
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Affinity Routing:</span> Maintain session affinity for stateful agent interactions
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Policy-Based Routing:</span> Route based on operator-defined policy requirements
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Reliability Pattern Examples</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Operators may implement reliability mechanisms appropriate to their environment:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Health Checking:</span> Monitor Kernel instance availability and route around failures
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Circuit Breaking:</span> Isolate unhealthy instances to prevent cascading failures
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Request Retry:</span> Implement retry with backoff for transient failures
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Graceful Degradation:</span> Design fallback behaviors for infrastructure issues
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Example Deployment Patterns</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common deployment topologies operators may choose
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Cloud className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Cloud-Hosted Pattern</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-base leading-relaxed">
                  Operator deploys gateway on cloud infrastructure (AWS, Azure, GCP) with operator-managed load balancing and instance configuration.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Operator-defined scaling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Cloud infrastructure integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Geographic distribution
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Operator-managed updates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Server className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Hybrid Deployment Pattern</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-base leading-relaxed">
                  Operator deploys gateway within private network while connecting to external or internal Kernel instances.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Network boundary control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Traffic filtering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Custom integration points
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Flexible topology
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Shield className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">On-Premises Pattern</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-base leading-relaxed">
                  Operator deploys complete gateway and kernel stack within private infrastructure for maximum control and data isolation.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Full operator control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Air-gap capable
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Custom infrastructure integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Data residency control
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Gateway Implementation Resources</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Reference code and deployment examples for gateway implementations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
              <Link href="/developers/quickstart">
                Quick Start Guide <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ssi-navy bg-transparent">
              <Link href="/developers/api">
                API Documentation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
