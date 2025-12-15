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
import { ArrowRight, Shield, Network, BookOpen, Building2, Scale, GraduationCap, CheckCircle, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AlertTriangle className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-yellow-800">
            <strong>STATUS NOTICE:</strong> SSI is an open protocol specification with a reference runtime implementation. It does not operate a governance authority, certification body, compliance service, or regulatory function. All execution, enforcement, and responsibility remain with system operators and implementers.
          </p>
        </div>
      </div>
      <section className="relative bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              SSI Protocol Specification
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white leading-relaxed">
              Open Protocol for AI System Governance
            </p>
            <p className="text-lg mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              An open protocol specification for AI system governance with example policy workflow capabilities. Includes a reference runtime implementation for demonstration and experimentation. Designed for interoperability and independent implementation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-ssi-teal hover:bg-teal-600 text-white border-0 text-lg px-8 py-6"
              >
                <Link href="/protocol">
                  View Protocol Spec <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6"
              >
                <Link href="/developers">
                  Try Reference Runtime
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <Link href="/regulators" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
                <Scale size={18} />
                For Regulatory Review Context
              </Link>
              <Link href="/developers" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
                <Building2 size={18} />
                For Developers
              </Link>
              <Link href="/research" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
                <GraduationCap size={18} />
                For Researchers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Reference Runtime Demonstration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The reference implementation demonstrates protocol capabilities including offline decision log analysis and policy workflow patterns
            </p>
          </div>

          <div className="bg-gradient-to-r from-ssi-navy/5 to-ssi-teal/5 rounded-2xl p-8 border border-ssi-teal/20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Protocol Workflow Demonstration</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-ssi-teal mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold">Post-Decision Analysis (Offline)</h4>
                      <p className="text-gray-600">Decision logs are analyzed after execution to inform potential policy adjustments. Analysis does not influence live execution.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-ssi-teal mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold">Pattern Analysis Example</h4>
                      <p className="text-gray-600">Policy feedback tool demonstrates pattern detection from decision logs and generates example policy suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-ssi-teal mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold">Policy Workflow Example</h4>
                      <p className="text-gray-600">Operator review → Policy envelope update → Reload on restart or controlled deployment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-ssi-teal mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold">Event Logging Format</h4>
                    <p className="text-gray-600">Hash-based decision identifiers with append-only log format (reference uses SHA256)</p>
                  </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    className="bg-ssi-teal hover:bg-teal-600 text-white"
                  >
                    <Link href="/developers/quickstart">
                      Try the Demo <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-ssi-navy/5 rounded-xl p-6 border border-ssi-navy/20">
                <h4 className="font-mono text-sm font-semibold mb-4 text-ssi-navy">60-Second Demo Commands</h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-gray-600"># 1. Start emulator</div>
                  <div className="bg-black text-green-400 p-2 rounded">node tools/emulator/dist/index.js</div>
                  
                  <div className="text-gray-600 mt-4"># 2. Generate decisions</div>
                  <div className="bg-black text-green-400 p-2 rounded">node reference/client-trader/dist/ssi-client-enforced.js</div>
                  
                  <div className="text-gray-600 mt-4"># 3. Analyze & approve</div>
                  <div className="bg-black text-green-400 p-2 rounded">node tools/policy-feedback/dist/cli.js approve PROPOSAL-X</div>
                  
                  <div className="text-gray-600 mt-4"># 4. Verify behavior changed</div>
                  <div className="bg-black text-green-400 p-2 rounded">node test-trade-after-policy-update.js</div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  ✅ Demonstration workflow: Generate decisions → Analyze logs → Review suggestions → Update policy → Restart with new configuration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">SSI Runtime - Reference Implementation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A reference implementation demonstrating protocol capabilities - featuring example policy workflow patterns built on open SSI Protocol standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-ssi-teal" size={24} />
                </div>
                <CardTitle className="text-xl">Policy Workflow Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Demonstrates example policy workflow patterns including offline log analysis and operator-supervised policy updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Network className="text-ssi-teal" size={24} />
                </div>
                <CardTitle className="text-xl">Pre-Execution Policy Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Synchronous policy evaluation pattern before action execution, with permit/deny/advisory decisions based on loaded governance envelopes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="text-ssi-teal" size={24} />
                </div>
                <CardTitle className="text-xl">Protocol Specification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Vendor-independent specification with JSON schemas, conformance tests, and defined message formats for potential AI governance interoperability.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="text-ssi-teal" size={24} />
                </div>
                <CardTitle className="text-xl">Decision Audit Logging</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Append-only log format with hash-based identifiers (reference uses SHA256) and operator-controlled policy update mechanisms.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-2 border-ssi-navy text-ssi-navy hover:bg-ssi-navy hover:text-white">
              <Link href="/protocol">
                View Protocol Specification <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Policy Workflow Demonstration</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The reference implementation demonstrates policy workflow capabilities built on open protocol standards. The system provides examples of offline decision log analysis and policy suggestion workflows with operator approval patterns, maintaining hash-based audit logging.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Example Analysis Workflow</h3>
                    <p className="text-gray-600">Offline log analysis demonstrates pattern detection capabilities for example policy adjustments.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Policy Suggestion Examples</h3>
                    <p className="text-gray-600">Example heuristic-based policy suggestions (implementation-specific patterns) with operator oversight workflow.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Policy Update Workflow</h3>
                    <p className="text-gray-600">Operator-controlled policy updates with integrity verification and controlled deployment mechanisms.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button asChild className="bg-ssi-navy hover:bg-blue-900">
                  <Link href="/protocol/governance-envelopes">
                    Learn About Governance Envelopes <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Demonstration Capabilities</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">Example Policy Workflow:</span> Open protocol demonstrating offline decision analysis and operator-supervised policy update patterns</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">Post-Decision Pattern Detection:</span> Offline analysis examples demonstrating how decision logs can inform potential policy adjustments</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">Controlled Policy Updates:</span> Operator-initiated policy deployment with restart or controlled reload mechanisms</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">Hash-Based Logging:</span> Example append-only decision log format with hash-based identifiers (reference uses SHA256)</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-ssi-teal rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700"><span className="font-semibold">Example Safety Patterns:</span> Demonstration of operator-defined fail-safe mechanisms for testing</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Protocol Demonstration Resources</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              SSI v0.3.1 reference implementation demonstrates policy workflow capabilities with offline analysis patterns and operator-supervised governance examples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/20 text-white flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Developers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <p className="text-white/80 min-h-[3.5rem]">
                    Explore example policy workflow patterns demonstrating offline decision analysis and operator-supervised policy updates.
                  </p>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      Policy Feedback Demo CLI
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      Example governance workflow
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      60-second demonstration cycle
                    </li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-white text-ssi-navy hover:bg-gray-100 border-0">
                  <Link href="/developers" className="block w-full">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/20 text-white flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Integration Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <p className="text-white/80 min-h-[3.5rem]">
                    Reference materials demonstrating operator-controlled policy deployment with integrity verification patterns.
                  </p>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      Example safety workflow patterns
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      Offline conformance checking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      Hash-based event logging (reference uses SHA256)
                    </li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-white text-ssi-navy hover:bg-gray-100 border-0">
                  <Link href="/developers" className="block w-full">Implementation Patterns</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/20 text-white flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Regulatory Review Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <p className="text-white/80 min-h-[3.5rem]">
                    Protocol specification materials demonstrating example policy workflow capabilities and offline decision analysis patterns.
                  </p>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      Offline policy analysis examples
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      Example conformance patterns
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-ssi-teal" />
                      Governance workflow transparency
                    </li>
                  </ul>
                </div>
                <Button asChild className="w-full bg-white text-ssi-navy hover:bg-gray-100 border-0">
                  <Link href="/regulators" className="block w-full">View Resources</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Open Protocol Demonstration</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            SSI v0.3.1 demonstrates policy workflow capabilities through an open protocol specification with reference implementation. The system provides examples of offline decision analysis and operator-supervised policy updates, maintaining hash-based audit logging and transparency patterns.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-4xl font-bold text-ssi-teal mb-2">Operator-Supervised</div>
              <p className="text-gray-600">Example policy workflow patterns with offline analysis of decision logs and operator approval mechanisms</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-ssi-teal mb-2">Controlled Updates</div>
              <p className="text-gray-600">Demonstration of operator-initiated policy deployment with restart or controlled reload mechanisms</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-ssi-teal mb-2">Audit Logging</div>
              <p className="text-gray-600">Hash-identified records (reference uses SHA256) with append-only format and operator-defined safety workflow patterns</p>
            </div>
          </div>

          <Button asChild size="lg" className="bg-ssi-navy hover:bg-blue-900 text-lg px-8">
            <Link href="/about">
              Learn More About Our Mission <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
