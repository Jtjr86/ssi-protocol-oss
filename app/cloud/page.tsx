/*
 * Copyright 2025 Jtjr86
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Shield, BarChart3, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "SSI Cloud - Managed AI Governance Infrastructure",
  description: "Planned managed deployment option for the SSI Protocol reference runtime",
};

export default function CloudPage() {
  return (
    <div className="bg-white">
      {/* Status Notice */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4">
        <div className="flex items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-green-800">
            <strong>PILOT PROGRAM OPEN:</strong> SSI Cloud reference runtime (Gateway + Kernel) is <strong>production-ready for pilot deployments</strong>. We're seeking 5 technical evaluators to validate the 1-hour deployment guide. <Link href="#pilot-program" className="underline font-semibold">Join the pilot program →</Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              SSI Cloud
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-white/90 leading-relaxed">
              Production-Ready Cryptographic Audit Trail for AI Decisions
            </p>
            <p className="text-lg mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ed25519 signatures + SHA-256 chaining + RBAC + multi-tenant isolation. Docker-based deployment validated in pilot. Now seeking external evaluators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-ssi-teal hover:bg-teal-600 text-white border-0 text-lg px-8 py-6"
              >
                <Link href="#pilot-program">
                  Join Pilot Program <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6"
              >
                <Link href="/protocol">
                  View Protocol Spec
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is SSI Cloud */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planned Managed Deployment</h2>
            <p className="text-xl text-gray-600">
              SSI Cloud is a planned managed hosting option for the open SSI Protocol reference runtime. Intended to simplify deployment for teams that prefer not to self-host Gateway and Kernel infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Managed Gateway */}
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Server className="text-ssi-teal" size={24} />
                </div>
                <CardTitle className="text-xl">Managed Gateway</CardTitle>
                <CardDescription>
                  Planned hosted deployment of the Gateway reference implementation (request normalization, RPX audit logging, Kernel routing)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>API key authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>JWT-based RBAC (viewer/auditor/admin)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Multi-tenant isolation (26/26 tests passing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Docker deployment ready</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Managed Kernel */}
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-ssi-teal" size={24} />
                </div>
                <CardTitle className="text-xl">Managed Kernel</CardTitle>
                <CardDescription>
                  Planned hosted deployment of the Kernel reference implementation (policy evaluation engine)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Reference runtime: stateless policy evaluation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Reference runtime: hot-reload envelope updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Reference runtime: version-aware envelopes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Intended: customer isolation model (TBD)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Audit & Reporting */}
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="text-ssi-teal" size={24} />
                </div>
                <CardTitle className="text-xl">Audit & Reporting</CardTitle>
                <CardDescription>
                  Planned UI tools for exploring decision logs and envelope versions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Reference runtime: RPX JSONL audit logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Intended: web-based log viewer (TBD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Intended: envelope management UI (TBD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                    <span>Intended: export/reporting tools (TBD)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Protocol-First */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-ssi-navy p-6 rounded-r-lg">
            <h3 className="text-xl font-bold mb-3 text-ssi-navy">Protocol-First Approach</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              SSI Cloud is a planned managed service implementation of the open SSI Protocol. The protocol specification and reference runtime remain fully open source under Apache 2.0. Organizations can choose to:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-ssi-teal font-bold">•</span>
                <span>Self-host the reference runtime (Gateway + Kernel) from the open repository</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ssi-teal font-bold">•</span>
                <span>Implement the protocol specification in their own infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ssi-teal font-bold">•</span>
                <span>Use SSI Cloud's managed hosting when/if it becomes available</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              The protocol remains vendor-neutral and implementation-agnostic. SSI Cloud is one potential deployment option, not a requirement.
            </p>
          </div>
        </div>
      </section>

      {/* Pilot Program */}
      <section id="pilot-program" className="py-20 bg-gradient-to-br from-ssi-navy to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-white">Join the Pilot Program</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              We're seeking 5 technical evaluators to validate our production deployment guide
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">What You'll Do</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                    <span>Follow 1-hour Docker deployment guide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                    <span>Validate cryptographic claims (tamper detection, chain integrity)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                    <span>Provide feedback on friction points</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                    <span>15-minute debrief call</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">What's Validated</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <span>Ed25519 signatures + SHA-256 chaining</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <span>Tamper detection (cryptographic verification)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <span>Multi-tenant isolation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <span>RBAC enforcement (viewer/auditor/admin)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Ideal for:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/5 rounded p-3">
                  <strong className="text-ssi-teal">AI Compliance Engineers</strong>
                  <p className="text-white/80 mt-1">Solving audit trail requirements</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <strong className="text-ssi-teal">MLOps Leads</strong>
                  <p className="text-white/80 mt-1">Model governance infrastructure</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <strong className="text-ssi-teal">Security Engineers</strong>
                  <p className="text-white/80 mt-1">Cryptographic guarantees</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                asChild
                size="lg"
                className="bg-ssi-teal hover:bg-teal-600 text-white text-lg px-8 py-6"
              >
                <Link href="https://github.com/Jtjr86/ssi-protocol-oss/blob/main/PILOT_README.md" target="_blank">
                  View Deployment Guide <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <p className="text-sm text-white/70 mt-4">
                Or reach out via <a href="https://github.com/Jtjr86/ssi-protocol-oss/issues" className="underline" target="_blank" rel="noopener noreferrer">GitHub Issues</a> to discuss
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Self-Hosting Alternative */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Prefer Self-Hosting?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The SSI Protocol reference runtime is fully open source. Deploy Gateway and Kernel on your own infrastructure today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Reference Runtime</CardTitle>
                <CardDescription>
                  Complete working implementation available on GitHub
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                  <span>Gateway + Kernel source code</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                  <span>Docker deployment examples</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                  <span>Full deployment documentation</span>
                </div>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/developers">
                    View Implementation Guide
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Protocol Specification</CardTitle>
                <CardDescription>
                  Implement SSI in your own stack
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                  <span>Complete protocol schemas (JSON)</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                  <span>Behavioral specifications</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-0.5" size={16} />
                  <span>Language-agnostic design</span>
                </div>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/protocol">
                    View Protocol Spec
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
