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
import { GitBranch, FileText, Globe, CheckCircle, Link as LinkIcon } from "lucide-react";

export const metadata = {
  title: "Standards - SSI",
  description: "SSI standards harmonization and international liaison work",
};

export default function StandardsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">Standards Harmonization</h1>
            <p className="text-xl text-white leading-relaxed">
              SSI reference implementation demonstrates patterns relevant to global AI safety standards
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Standards Strategy</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              SSI reference implementation demonstrates patterns relevant to existing AI safety standards. The architecture provides examples of interoperability and technical mechanisms that operators may adapt.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              If adoption reaches significant scale, participation in standards bodies and liaison relationships may emerge to ensure the protocol evolves in alignment with international consensus on AI safety.
            </p>
          </div>

          <div className="bg-ssi-teal/10 border-2 border-ssi-teal rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Core Principles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Interoperability First</h4>
                  <p className="text-gray-700">SSI reference implementation demonstrates pattern examples relevant to multiple standards contexts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1 text-gray-700">Standards Engagement Capability</h4>
                  <p className="text-gray-600">If ecosystem adoption warrants, the protocol architecture enables participation in ISO, IEEE, NIST, and regional standards development</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Mapping & Documentation</h4>
                  <p className="text-gray-700">Example documentation showing patterns that may be relevant to standards contexts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Evolution Approach</h4>
                  <p className="text-gray-700">Regular review and updates as standards evolve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Standards Reference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reference implementation demonstrates patterns relevant to major standards organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">ISO/IEC JTC 1/SC 42</CardTitle>
                  <LinkIcon className="text-ssi-teal" size={20} />
                </div>
                <CardDescription>International Organization for Standardization - AI Committee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  SSI reference implementation demonstrates patterns relevant to ISO/IEC JTC 1/SC 42 standards, including ISO 42001 AI management systems and related AI governance frameworks.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-1">Relevant Standards:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ISO/IEC 42001 - AI Management System</li>
                    <li>• ISO/IEC 23894 - Risk Management</li>
                    <li>• ISO/IEC 38507 - AI Governance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">IEEE Standards Association</CardTitle>
                  <LinkIcon className="text-ssi-teal" size={20} />
                </div>
                <CardDescription>Institute of Electrical and Electronics Engineers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  SSI reference implementation demonstrates patterns relevant to IEEE standards for autonomous systems, ethics, and AI safety.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-1">Relevant Standards:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• IEEE 7000 - Systems Design Ethics</li>
                    <li>• IEEE 7001 - Transparency</li>
                    <li>• IEEE P2863 - Organizational Governance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">NIST AI Risk Management</CardTitle>
                  <LinkIcon className="text-ssi-teal" size={20} />
                </div>
                <CardDescription>National Institute of Standards and Technology</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  SSI reference implementation demonstrates patterns relevant to NIST AI Risk Management Framework principles and practices.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-1">Framework Reference:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• NIST AI RMF Core Functions</li>
                    <li>• Trustworthiness Characteristics</li>
                    <li>• Risk Management Process</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">EU AI Act</CardTitle>
                  <LinkIcon className="text-ssi-teal" size={20} />
                </div>
                <CardDescription>European Union Artificial Intelligence Regulation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 text-sm leading-relaxed">
                  SSI reference implementation demonstrates patterns relevant to EU AI Act requirements for high-risk AI systems.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-1">Example Patterns:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Risk management systems</li>
                    <li>• Logging and traceability</li>
                    <li>• Human oversight mechanisms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Standards Mapping Examples</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Illustrative documentation showing patterns that may be relevant to operators implementing standards frameworks
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-700">SSI & ISO 42001: Technical Mapping</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Example: Pattern documentation showing SSI components that may be relevant to ISO 42001 AI management systems
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">ISO 42001</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Technical Specification</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-700">SSI & NIST AI RMF: Implementation Guide</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Example: Pattern documentation showing SSI features that may be relevant to NIST AI Risk Management Framework
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">NIST</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Implementation Guide</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-700">EU AI Act Compliance via SSI</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Example: SSI governance patterns that may be relevant to EU AI Act requirements for high-risk systems
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">EU AI Act</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Pattern Examples</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="text-ssi-teal mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-bold mb-6 text-white">Standards Collaboration</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            The protocol is designed for interoperability with existing standards frameworks. Organizations interested in AI governance infrastructure can explore SSI on GitHub.
          </p>
          <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white text-lg px-8">
            <Link href="https://github.com/Jtjr86/ssi-protocol">View Project on GitHub</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
