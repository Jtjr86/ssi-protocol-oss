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
import { Target, Eye, Compass, Mail, MapPin, Globe } from "lucide-react";

export const metadata = {
  title: "About SSI - Sovereign Synthetic Intelligence",
  description: "Learn about SSI's mission, vision, and commitment to global AI safety",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">About SSI</h1>
            <p className="text-xl text-white leading-relaxed">
              Developing an open protocol specification for safe, governable autonomous AI systems
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="text-ssi-teal" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To develop and publish an open protocol specification that provides mechanisms operators may use when implementing governance for autonomous AI agents.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="text-ssi-teal" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                A future where autonomous agents enhance human capabilities while operating under robust governance frameworks that enable safety, trust, and beneficial outcomes for all of humanity.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-6">
                <Compass className="text-ssi-teal" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Values</h2>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li><span className="font-semibold">Safety:</span> Above all else</li>
                <li><span className="font-semibold">Neutrality:</span> No single controller</li>
                <li><span className="font-semibold">Transparency:</span> Open governance</li>
                <li><span className="font-semibold">Inclusivity:</span> Global participation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Why SSI Exists</h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              As autonomous AI systems become more capable and prevalent, the need for standardized safety infrastructure becomes critical. Just as the internet required protocols like TCP/IP and HTTPS to function safely at scale, the emerging ecosystem of autonomous agents requires foundational safety and governance protocols.
            </p>

            <p>
              The SSI protocol specification was developed based on the recognition that agent safety cannot be solved by individual organizations or nations acting alone. The challenges of multi-agent coordination, cross-border deployment, and evolving regulatory requirements demand international cooperation and shared infrastructure.
            </p>

            <p>
              The SSI protocol specification is published as an open standard to enable potential shared stewardship by an international community if adoption warrants. This design allows for distributed governance if the protocol achieves widespread adoption.
            </p>

            <p>
              SSI is designed to complement, not replace, existing AI safety frameworks and regulatory requirements. The reference implementation provides pattern examples that operators may adapt when implementing policy requirements across multiple standards.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Organizational Structure</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Protocol Foundation</CardTitle>
                <CardDescription>Potential stewardship structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  A non-profit foundation may be formed in the future if ecosystem adoption warrants shared stewardship of the technical infrastructure, working group coordination, and community support.
                </p>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold mb-1">Potential Responsibilities:</p>
                  <ul className="space-y-1">
                    <li>• Infrastructure maintenance and development</li>
                    <li>• Working group coordination</li>
                    <li>• Documentation and standards liaison</li>
                    <li>• Community support and education</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Stewardship Council (Planned)</CardTitle>
                <CardDescription>Potential community-driven governance model</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  An international stewardship council may emerge to provide strategic direction and oversight if adoption reaches global scale, with the intent that SSI remains neutral, safe, and aligned with international AI safety objectives.
                </p>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold mb-1">Principles:</p>
                  <ul className="space-y-1">
                    <li>• Representative international membership</li>
                    <li>• Diverse regional and sector participation</li>
                    <li>• Transparent decision-making processes</li>
                    <li>• Public accountability mechanisms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Development Phases</h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32">
                <div className="text-2xl font-bold text-ssi-teal">Current</div>
              </div>
              <div className="flex-1 border-l-2 border-ssi-teal pl-6 pb-8">
                <h3 className="font-bold text-xl mb-2">Foundation & Specification</h3>
                <p className="text-gray-700 leading-relaxed">
                  Protocol specification development, core technical documentation, and reference implementation with demonstration architecture.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32">
                <div className="text-2xl font-bold text-ssi-teal">Following Early Adoption</div>
              </div>
              <div className="flex-1 border-l-2 border-ssi-teal pl-6 pb-8">
                <h3 className="font-bold text-xl mb-2">Pilot Deployments & Validation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Upon demonstrated ecosystem demand: SDK package releases and potential community coordination mechanisms.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32">
                <div className="text-2xl font-bold text-ssi-teal">If Adoption Reaches Scale</div>
              </div>
              <div className="flex-1 border-l-2 border-gray-300 pl-6">
                <h3 className="font-bold text-xl mb-2">Ecosystem Emergence</h3>
                <p className="text-gray-700 leading-relaxed">
                  Potential widespread adoption by enterprises, potential regulatory awareness, and emergence of shared governance structures if warranted by global deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="contact">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Get Involved</h2>

          <div className="flex justify-center mb-12">
            <Card className="border-2 border-ssi-teal max-w-md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="text-ssi-teal" size={32} />
                  <div>
                    <CardTitle className="text-2xl">GitHub Repository</CardTitle>
                    <CardDescription>Contribute to the protocol development</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Join the SSI community on GitHub to contribute to protocol development, report issues, or participate in discussions.
                </p>
                <Button asChild className="w-full bg-ssi-navy hover:bg-blue-900">
                  <Link href="https://github.com/Jtjr86/ssi-protocol-oss">View on GitHub</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-300 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">Newsletter Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              Email updates on SSI development, governance decisions, and community events will be available once formal communications infrastructure is established.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Newsletter in development"
                disabled
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-200 text-gray-500"
              />
              <Button disabled className="bg-gray-400">Coming Soon</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
