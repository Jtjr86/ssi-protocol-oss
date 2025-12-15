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

export default function WorkingGroupsPage() {
  redirect("/developers");
}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="text-ssi-teal" size={32} />
                  <div>
                    <CardTitle className="text-xl">Safety & Security WG</CardTitle>
                    <CardDescription>Core safety mechanisms and threat modeling</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Will develop safety protocols, security specifications, and threat models. Planned to be responsible for Kernel safety engine design and vulnerability response procedures.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-2">Focus Areas:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Policy evaluation algorithms
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Cryptographic integrity mechanisms
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Threat detection and response
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Penetration testing frameworks
                    </li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Charter Upon Formation</Button>
                  <Button size="sm" className="bg-gray-400" disabled>Available Upon Formation</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="text-ssi-teal" size={32} />
                  <div>
                    <CardTitle className="text-xl">Standards Liaison WG</CardTitle>
                    <CardDescription>ISO, IEEE, NIST coordination</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Will maintain relationships with international standards bodies and ensure SSI alignment with emerging AI safety standards.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-2">Focus Areas:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      ISO 42001 compliance mapping
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      NIST RMF implementation guides
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      IEEE ethics standards alignment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Regional regulatory engagement
                    </li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Charter Upon Formation</Button>
                  <Button size="sm" className="bg-gray-400" disabled>Available Upon Formation</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="text-ssi-teal" size={32} />
                  <div>
                    <CardTitle className="text-xl">Governance Policy WG</CardTitle>
                    <CardDescription>Policy frameworks and envelope specs</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Designs governance envelope schemas, policy specification languages, and domain-specific policy templates.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-2">Focus Areas:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Envelope schema evolution
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Industry policy templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Policy testing methodologies
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Context-aware policy systems
                    </li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Charter Upon Formation</Button>
                  <Button size="sm" className="bg-gray-400" disabled>Available Upon Formation</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Code className="text-ssi-teal" size={32} />
                  <div>
                    <CardTitle className="text-xl">Implementation WG</CardTitle>
                    <CardDescription>SDKs, tools, and integration patterns</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Will develop official SDKs, command-line tools, and reference implementations. Planned to maintain developer documentation and integration guides.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-2">Focus Areas:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Python, JavaScript, Rust, Go SDKs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Developer documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Integration patterns & examples
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Testing & certification tools
                    </li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Charter Upon Formation</Button>
                  <Button size="sm" className="bg-gray-400" disabled>Available Upon Formation</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-ssi-teal" size={32} />
                  <div>
                    <CardTitle className="text-xl">Multi-Agent Systems WG</CardTitle>
                    <CardDescription>Agent coordination and communication</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Defines protocols for safe multi-agent coordination, communication standards, and collective governance mechanisms.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-2">Focus Areas:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Agent-to-agent communication
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Coordination primitives
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Conflict resolution protocols
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Shared governance models
                    </li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Charter Upon Formation</Button>
                  <Button size="sm" className="bg-gray-400" disabled>Available Upon Formation</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <GitBranch className="text-ssi-teal" size={32} />
                  <div>
                    <CardTitle className="text-xl">Interoperability WG</CardTitle>
                    <CardDescription>Cross-protocol bridges and adapters</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Will enable SSI integration with existing agent frameworks, develop protocol bridges, and ensure broad ecosystem compatibility.
                </p>
                <div>
                  <p className="font-semibold text-sm mb-2">Focus Areas:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      LangChain/AutoGPT integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      OpenAI Assistants API bridge
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Custom framework adapters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-ssi-teal" />
                      Protocol translation specs
                    </li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Charter Upon Formation</Button>
                  <Button size="sm" className="bg-gray-400" disabled>Available Upon Formation</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Planned Charter & Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How working groups will operate within future SSI governance structure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Structure & Leadership</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Co-Chairs:</span> Each WG has 2-3 co-chairs elected by members
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Open Membership:</span> Anyone can join and participate
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Regular Meetings:</span> Bi-weekly or monthly depending on activity
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Public Archives:</span> Meeting minutes and materials openly accessible
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Deliverables & Output</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Technical Specifications:</span> Detailed protocol specifications
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Implementation Guides:</span> Practical guidance for developers
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">Reference Code:</span> Sample implementations and SDKs
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-ssi-teal flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold">RFCs:</span> Formal proposals for protocol changes
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How to Join</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All working groups welcome new participants
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Review Working Group Charters</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Read the charter for groups that interest you to understand their scope, current projects, and participation expectations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Join Mailing List & Communication Channels</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Subscribe to the working group mailing list and join the dedicated Slack/Discord channel to stay updated on discussions and meetings.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Attend Meetings & Introduce Yourself</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Attend a few meetings to understand the group dynamics. Introduce yourself, share your background, and explain what you're interested in contributing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Start Contributing</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pick up a task from the working group backlog, contribute to discussions, review proposals, or start working on your own contribution with group guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-ssi-navy hover:bg-blue-900">
              <Link href="#">
                View All Working Group Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Shape the Future of AI Safety</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Working groups are where the SSI Protocol is built. Your contributions matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
              <Link href="#">
                Join a Working Group <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ssi-navy bg-transparent">
              <Link href="/governance/rfcs">
                Submit an RFC
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
