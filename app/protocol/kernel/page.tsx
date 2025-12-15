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
import { Shield, CheckCircle, Lock, Database, Zap, GitBranch, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "SSI Kernel - Protocol Enforcement Engine",
  description: "Pre-execution policy evaluation engine for autonomous agent action requests",
};

export default function KernelPage() {
  return (
    <div className="bg-white">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="text-lg font-bold text-yellow-900 mb-1">Reference Implementation - Non-Operational</h3>
              <p className="text-yellow-800 leading-relaxed">
                This page describes a <strong>reference implementation</strong> validated in controlled environments (e.g., ASWF auto-trader shadow mode). No SLA, certification, compliance guarantee, or regulatory validation currently exists. Performance metrics and security claims are <strong>design targets</strong>, not operational commitments.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">SSI Kernel</h1>
            </div>
            <p className="text-xl text-white leading-relaxed mb-4">
              Protocol enforcement engine providing pre-execution policy evaluation and advisory feedback for autonomous agent action requests.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              The Kernel evaluates proposed agent actions against loaded governance envelopes before execution, returning PERMIT, DENY, or ADVISORY decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Architecture Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A multi-layered safety system designed for high-performance policy evaluation
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
              <strong>Kernel v0.2.0 is an external service</strong> with JSON envelopes, not hardcoded logic.
              <br />
              Validated in live trading environment (ASWF auto-trader) in shadow mode.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Lock className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Policy Evaluation Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Synchronous evaluation of agent actions against loaded governance envelopes using deterministic rule processing (low-latency design target, unvalidated).
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Database className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Envelope Authoring Flexibility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Policy authors can reference any framework (NIST RMF, ISO 42001, EU AI Act) when designing governance envelopes. Kernel evaluates against loaded envelope logic, not hardcoded compliance rules.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <GitBranch className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Deterministic Rule Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Rule-based policy evaluation that processes loaded governance envelopes sequentially for deterministic safety decisions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Zap className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Pre-Execution Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Evaluates proposed agent actions before execution against loaded governance policies, returning permit/deny/advisory decisions with detailed reasoning.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <AlertTriangle className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Violation Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Automated detection of policy violations with configurable response actions including blocking, logging, and alert escalation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Database className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Audit Trail Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Append-only decision logs with hash-based identifiers (reference uses SHA256), supporting offline analysis and forensic review.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Policy Evaluation Process</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Request Reception</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The Kernel receives an RPX (Request-Permission-Execution) packet from the Gateway containing the proposed action, context metadata, and agent identity.
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
                  <h3 className="font-bold text-lg mb-2">Envelope Loading</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Relevant governance envelopes are identified based on agent type, action category, domain context, and jurisdiction. Multiple envelopes may apply hierarchically.
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
                  <h3 className="font-bold text-lg mb-2">Policy-Defined Constraint Checking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The action is evaluated against constraints defined in loaded governance envelopes: numeric limits, capability permissions, and custom policy rules. Checks are processed sequentially.
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
                  <h3 className="font-bold text-lg mb-2">Decision Generation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Based on evaluation results, the Kernel generates a decision: PERMIT (with execution token), DENY (with explanation), or ADVISORY (permitted with warnings). Each decision includes detailed reasoning.
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
                  <h3 className="font-bold text-lg mb-2">Audit & Response</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The decision, along with full evaluation context, is logged to the append-only decision log. The response is returned to the agent via the Gateway with execution instructions or denial explanation.
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
            <h2 className="text-4xl font-bold mb-4">Envelope-Based Policy Evaluation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible architecture allowing policy authors to reference any framework or standard
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Framework-Agnostic Design</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Governance envelope authors can reference any framework when designing policies. The Kernel evaluates against <strong>loaded envelope logic</strong>, not hardcoded compliance rules:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">NIST AI RMF:</span> Authors may design envelopes inspired by risk management functions
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">ISO 42001:</span> Authors may structure envelopes around AI management controls
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">EU AI Act:</span> Authors may reference high-risk system requirements in envelope design
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Custom Standards:</span> Authors may create domain-specific policy structures
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Policy Evaluation Capabilities</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                For each action request, the Kernel evaluates against loaded governance envelopes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Rule Evaluation:</span> Processes envelope logic to determine action permissibility
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Decision Logging:</span> Creates append-only log of evaluation results with hash-based identifiers
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Violation Detection:</span> Flags actions that fail envelope policy checks
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Advisory Feedback:</span> Provides detailed reasoning for permit/deny/advisory decisions
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
            <h2 className="text-4xl font-bold mb-4">Reference Implementation Characteristics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Design targets validated in controlled environments (e.g., ASWF auto-trader shadow mode)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Performance Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Synchronous evaluation (design characteristic)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Sequential decision processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Multi-instance deployment pattern</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Validated in shadow mode deployments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Deployment Flexibility</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Cloud-hosted or on-premises capable</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Docker/Kubernetes compatible</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Operator-deployed infrastructure (single-instance reference)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Rolling update support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Security Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Optional transport encryption (implementation-defined)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Optional audit log signing (reference implementation)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Optional access control (implementation-defined)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full"></div>
                    <span>Open-source security review enabled</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Learn More About SSI Kernel</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Dive deeper into Kernel architecture and integration patterns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
              <Link href="/developers/api">
                API Documentation <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ssi-navy bg-transparent">
              <Link href="/protocol">
                Full Protocol Architecture
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
