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
import { redirect } from "next/navigation";

export default function StandardsBodyPage() {
  redirect("/standards");
}

export default function StandardsBodyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">Planned Standards & Ethics Review Board</h1>
            <p className="text-xl text-white leading-relaxed mb-4">
              The planned SERB will provide independent technical oversight, standards alignment, and ethical review for the SSI Protocol.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              To be composed of experts from academia, industry, and civil society, the SERB will ensure SSI evolves in alignment with global AI safety objectives.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Planned Organizational Structure</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Independent body planned to operate under a potential SSI Stewardship Council if formed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-4">Composition</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>12 voting members</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>4 academic representatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>4 industry representatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>2 civil society representatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>2 standards body liaisons</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-4">Terms & Rotation</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>3-year terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>Staggered rotation (4 members/year)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>Maximum 2 consecutive terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>Rotating chair (annual)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>Open nomination process</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-4">Independence</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>No vendor affiliation restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>Conflict of interest disclosure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>Recusal procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>Public voting records</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <span>Transparent decision-making</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Planned Responsibilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Core functions that will support technical excellence and ethical alignment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <FileText className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Technical Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  Review and approve all protocol specifications, major version updates, and architectural changes:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Evaluate technical soundness of proposals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Assess security and safety implications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Verify backward compatibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Recommend revisions or approval</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Globe className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Standards Liaison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  Maintain relationships with international standards organizations:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>ISO/IEC JTC 1/SC 42 coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>IEEE Standards Association participation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>NIST AI framework alignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Regional regulatory engagement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CheckCircle className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Ethics Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  Evaluate ethical implications of protocol features and governance policies:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Assess fairness and bias considerations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Review transparency mechanisms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Evaluate human oversight provisions</span>
                  </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                      <span>Support value alignment</span>
                    </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Users className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Community Guidance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700 leading-relaxed">
                  Provide guidance to working groups and community contributors:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Establish best practices and guidelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Resolve technical disputes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Mentor RFC authors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Facilitate consensus building</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Planned Meeting Schedule</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Planned regular meetings with public participation and transparency
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-ssi-teal" size={32} />
                <h3 className="text-2xl font-bold">Regular Meetings</h3>
              </div>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold text-lg mb-1">Monthly Technical Reviews</p>
                  <p className="text-gray-600 text-sm">First Thursday of each month, 14:00 UTC</p>
                  <p className="text-gray-600 text-sm">Public observation available</p>
                </li>
                <li>
                  <p className="font-semibold text-lg mb-1">Quarterly Strategic Sessions</p>
                  <p className="text-gray-600 text-sm">Second week of quarter-starting months</p>
                  <p className="text-gray-600 text-sm">Open comment period included</p>
                </li>
                <li>
                  <p className="font-semibold text-lg mb-1">Annual Standards Summit</p>
                  <p className="text-gray-600 text-sm">September, location rotates globally</p>
                  <p className="text-gray-600 text-sm">In-person and remote participation</p>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-ssi-teal" size={32} />
                <h3 className="text-2xl font-bold">Meeting Records</h3>
              </div>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold text-lg mb-1">Public Minutes</p>
                  <p className="text-gray-600 text-sm">Published within 7 days of each meeting</p>
                  <p className="text-gray-600 text-sm">Available in searchable archive</p>
                </li>
                <li>
                  <p className="font-semibold text-lg mb-1">Voting Records</p>
                  <p className="text-gray-600 text-sm">All votes recorded with member positions</p>
                  <p className="text-gray-600 text-sm">Dissenting opinions documented</p>
                </li>
                <li>
                  <p className="font-semibold text-lg mb-1">Decision Rationales</p>
                  <p className="text-gray-600 text-sm">Written explanations for major decisions</p>
                  <p className="text-gray-600 text-sm">Technical justifications provided</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How to Participate</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple pathways for community engagement with the SERB
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Observe Meetings</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Planned monthly technical review meetings will be open to public observation upon SERB formation.
              </p>
              <Button variant="outline" disabled>Available Upon SERB Formation</Button>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Submit Comments</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Public input will be accepted on proposals under review during designated comment periods upon SERB formation.
              </p>
              <Button variant="outline" disabled>Available Upon Formation</Button>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Nominate Members</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Participate in the annual nomination process for SERB membership. Self-nominations and community nominations welcome.
              </p>
              <Button variant="outline">Nomination Guidelines</Button>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Join Working Groups</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Contribute to the technical work that the SERB reviews by joining relevant working groups and participating in RFC development.
              </p>
              <Button asChild variant="outline">
                <Link href="/governance/working-groups">Explore Working Groups</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Planned Initial Priorities</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            The SERB will initially focus on several strategic initiatives upon formation
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-white">AI Act Compliance Framework</h3>
              <p className="text-white/90 text-sm">Developing detailed guidance for EU AI Act compliance through SSI</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-white">Multi-Agent Coordination Standard</h3>
              <p className="text-white/90 text-sm">Defining protocols for safe agent-to-agent communication</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-white">Quantum-Safe Cryptography</h3>
              <p className="text-white/90 text-sm">Preparing for post-quantum signature schemes</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-white">Governance Envelope Templates</h3>
              <p className="text-white/90 text-sm">Creating industry-specific policy templates</p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
            <Link href="/governance">
              Learn More About SSI Governance <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
