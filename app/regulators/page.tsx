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
import { Scale, FileText, Shield, Globe, CheckCircle, Download, BookOpen } from "lucide-react";

export const metadata = {
  title: "For Regulators - SSI",
  description: "Infrastructure-level governance protocol for regulatory review and standards evaluation",
};

export default function RegulatorsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">For Regulators</h1>
            <p className="text-xl text-white leading-relaxed">
              Understanding SSI's role in global AI safety governance and regulatory compliance
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Executive Summary</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                The Sovereign Synthetic Intelligence (SSI) Protocol is an infrastructure-level governance protocol designed to support safety, transparency, and accountability in autonomous AI systems.
              </p>
              <p className="mb-4">
                SSI functions as governance infrastructure, similar to how HTTPS provides security for web communications. It provides mechanisms for autonomous agents to operate within operator-defined safety boundaries, support implementation of applicable regulations, and generate auditable records of all actions.
              </p>
              <p>
                SSI is designed as an open protocol with architecture that complements existing regulatory frameworks and provides technical mechanisms for enforcing policy requirements.
              </p>
            </div>
          </div>

          <div className="bg-ssi-teal/10 border-2 border-ssi-teal rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold mb-4">Key Regulatory Capabilities</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Pre-Execution Policy Validation</h4>
                  <p className="text-gray-700">Evaluation of agent action requests against safety policies before execution</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Complete Audit Trail</h4>
                  <p className="text-gray-700">Append-only decision logs with hash-based identifiers (reference uses SHA256) for all agent actions and governance decisions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Standards Alignment</h4>
                  <p className="text-gray-700">Architectural alignment with principles found in NIST RMF, EU AI Act, ISO 42001, and other frameworks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Policy Violation Response</h4>
                  <p className="text-gray-700">Pre-execution denial of unsafe actions with detailed logging and operator alerts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Standards & Framework Alignment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SSI is designed to facilitate compliance with major AI safety standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">NIST AI RMF</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="text-sm mb-3">
                  National Institute of Standards and Technology AI Risk Management Framework - SSI reference implementation demonstrates patterns relevant to RMF governance principles
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">EU AI Act</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="text-sm mb-3">
                  European Union Artificial Intelligence Act - SSI reference implementation includes mechanisms relevant to transparency and accountability requirements
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">ISO 42001</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="text-sm mb-3">
                  International standard for AI management systems - SSI reference implementation demonstrates patterns relevant to ISO management principles
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">OECD Principles</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="text-sm mb-3">
                  OECD AI Principles for responsible stewardship - SSI reference implementation demonstrates patterns relevant to responsible AI practices
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SSI specifications and implementation details are openly available for regulatory review
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <FileText className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Protocol Specification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 min-h-[4.5rem]">
                  Technical documentation of SSI protocol architecture, safety mechanisms, and governance model.
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/docs" target="_blank" rel="noopener noreferrer">
                    <BookOpen className="mr-2" size={16} />
                    View Documentation
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Shield className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Reference Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 min-h-[4.5rem]">
                  Open-source implementation for evaluating SSI safety mechanisms and policy enforcement.
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="https://github.com/Jtjr86/ssi-protocol-oss" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Scale className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Safety Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 min-h-[4.5rem]">
                  Reference safety patterns and verification mechanisms for autonomous agent governance.
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/safety">
                    Read Safety Docs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="text-ssi-teal mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-bold mb-6 text-white">International Compatibility</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            The protocol is designed for operator adoption within diverse regulatory contexts. SSI protocol provides mechanisms operators can use when implementing governance requirements.
          </p>
          <Button size="lg" asChild className="bg-ssi-teal hover:bg-teal-600 text-white">
            <Link href="https://github.com/Jtjr86/ssi-protocol-oss" target="_blank" rel="noopener noreferrer">
              Explore Protocol on GitHub
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
