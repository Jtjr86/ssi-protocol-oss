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
import { GraduationCap, BookOpen, Award, Users, FileText, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Research & Academia - SSI",
  description: "Research enablement and academic use cases for SSI Protocol - open specifications for studying autonomous agent governance and safety",
};

export default function ResearchPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">Research & Academia</h1>
            <p className="text-xl text-white leading-relaxed">
              Open specifications enabling research on autonomous agent governance, safety verification, and multi-agent coordination
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Research Enablement</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Open specifications for studying autonomous agent safety, governance mechanisms, and policy enforcement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Award className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Research Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  SSI provides open specifications for studying autonomous agent safety, governance mechanisms, and policy enforcement. Researchers can independently analyze protocol behavior and verify safety properties.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <BookOpen className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Educational Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  SSI can be integrated into computer science, AI safety, and governance courses. Open-source implementation and documentation enable educators to develop teaching materials independently.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Users className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Academic Collaboration Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Students can contribute to SSI development through open-source participation, capstone projects, and research studies. The protocol is designed for academic exploration.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Research Priority Areas</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <Lightbulb className="text-ssi-teal flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Safety Verification Methods</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Formal methods for verifying agent behavior, verification approaches for policy conformance, and testing methodologies for multi-agent systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <Lightbulb className="text-ssi-teal flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Governance Framework Design</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Policy specification languages, governance envelope composition, and adaptive policy systems that respond to changing contexts.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <Lightbulb className="text-ssi-teal flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Multi-Agent Coordination</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Safe coordination protocols, conflict resolution mechanisms, and distributed consensus for agent collectives under shared governance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <Lightbulb className="text-ssi-teal flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Explainability & Transparency</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Methods for making agent decision-making interpretable, audit trail analysis, and communicating governance decisions to stakeholders.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <Lightbulb className="text-ssi-teal flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Performance & Scalability</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Analyzing governance overhead, distributed kernel architectures, and policy evaluation approaches for large-scale deployments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Open Research Infrastructure</h2>

          <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200 text-center">
            <p className="text-gray-600 mb-6 leading-relaxed">
              SSI specifications are openly available for academic study. Researchers can independently analyze protocol behavior, implement experimental variants, and publish findings without coordination overhead. The architecture is designed for reproducible research and verification.
            </p>
            <Button size="lg" asChild>
              <Link href="https://github.com/Jtjr86/ssi-protocol" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="text-ssi-teal mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-bold mb-6 text-white">Academic Exploration</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Students and researchers can explore SSI through the open-source implementation. The protocol provides a research substrate for studying autonomous agent governance and safety properties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-ssi-teal hover:bg-teal-600 text-white">
              <Link href="https://github.com/Jtjr86/ssi-protocol" target="_blank" rel="noopener noreferrer">
                Explore Repository
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-ssi-navy bg-transparent">
              <Link href="https://github.com/Jtjr86/ssi-protocol/tree/main/docs" target="_blank" rel="noopener noreferrer">
                Read Documentation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
