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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Lock, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Safety & Threat Model - SSI Protocol",
  description: "Comprehensive safety architecture and threat modeling for autonomous agents",
};

export default function SafetyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">Safety & Threat Model</h1>
            </div>
            <p className="text-xl text-white leading-relaxed">
              Comprehensive safety architecture designed to prevent, detect, and mitigate risks in autonomous agent systems
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Safety Architecture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-layered defense ensuring safe autonomous agent operation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <Lock className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Prevention Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Proactive measures that stop unsafe actions before execution</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Policy-based action validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Capability restrictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Resource limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Input validation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <AlertTriangle className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Violation Detection Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Pre-execution detection of policy violations</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Policy constraint validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Rule violation identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Offline decision log analysis (example tool)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Operator-defined alert mechanisms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Response Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Pre-execution blocking of policy violations with detailed explanations</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Action termination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Agent suspension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Escalation protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Rollback mechanisms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <FileText className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Audit Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Comprehensive logging for forensics and review</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Append-only decision logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>SHA256-based identifiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Decision reasoning capture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Offline analysis support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Threat Model</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Unauthorized Actions</h3>
              <p className="text-gray-700 mb-3">Agents attempting actions outside their authorized capabilities</p>
              <p className="text-sm text-gray-600"><strong>Mitigation:</strong> Capability-based permissions with default-deny policy enforcement</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Policy Circumvention</h3>
              <p className="text-gray-700 mb-3">Attempts to bypass or exploit governance mechanisms</p>
              <p className="text-sm text-gray-600"><strong>Mitigation:</strong> Pre-execution policy validation and comprehensive decision logging</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Data Exfiltration</h3>
              <p className="text-gray-700 mb-3">Unauthorized access or transmission of sensitive data</p>
              <p className="text-sm text-gray-600"><strong>Mitigation:</strong> Data sensitivity classification, egress controls, and audit logging</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Adversarial Agents</h3>
              <p className="text-gray-700 mb-3">Malicious agents masquerading as legitimate participants</p>
              <p className="text-sm text-gray-600"><strong>Mitigation:</strong> Operator-defined identity verification and policy-based constraint validation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Security Audits & Disclosures</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            We conduct regular security audits and maintain a responsible disclosure program
          </p>
          <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
            <Link href="#">
              Report Security Issue <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
