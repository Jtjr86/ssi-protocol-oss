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

export default function RFCsPage() {
  redirect("/developers");
}

export default function RFCsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">Planned RFC Process</h1>
            <p className="text-xl text-white leading-relaxed">
              Future community-driven proposal system for evolving the SSI Protocol through transparent review and consensus
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-yellow-700 mb-2">—</div>
              <p className="text-gray-700 font-semibold">Draft RFCs</p>
              <p className="text-sm text-gray-600">Process being established</p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">—</div>
              <p className="text-gray-700 font-semibold">In Review</p>
              <p className="text-sm text-gray-600">System in development</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-700 mb-2">—</div>
              <p className="text-gray-700 font-semibold">Accepted</p>
              <p className="text-sm text-gray-600">Framework being designed</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-gray-700 mb-2">—</div>
              <p className="text-gray-700 font-semibold">Withdrawn</p>
              <p className="text-sm text-gray-600">Procedures to be defined</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Planned RFC System</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Future system for community review and protocol evolution proposals
            </p>
            <Button size="lg" className="bg-gray-400" disabled>
              Available Upon System Launch
            </Button>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-12 text-center mb-16">
            <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-2xl font-bold mb-3">RFC System In Development</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              The RFC process framework has been designed and documented. The system will become operational once the governance structures (Working Groups and Standards & Ethics Review Board) are formed.
            </p>
            <p className="text-sm text-gray-500">
              Community members interested in contributing to protocol evolution can prepare proposals using the template below, ready for submission when the system launches.
            </p>
          </div>

          <div className="space-y-4 mb-16 hidden">{/* Hidden example RFCs */}
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">RFC-042</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">In Review</span>
                    </div>
                    <CardTitle className="text-xl mb-2">Multi-Agent Coordination Protocol Extension</CardTitle>
                    <CardDescription>
                      Proposed extensions to RPX for direct agent-to-agent communication with governance oversight
                    </CardDescription>
                  </div>
                  <Clock className="text-gray-400 flex-shrink-0 ml-4" size={24} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Author</p>
                    <p className="font-semibold">Dr. Sarah Chen</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Working Group</p>
                    <p className="font-semibold">Multi-Agent Systems</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Comment Period Ends</p>
                    <p className="font-semibold">Jan 15, 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Comments</p>
                    <p className="font-semibold">23</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Read RFC</Button>
                  <Button variant="outline" size="sm">Add Comment</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">RFC-041</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">In Review</span>
                    </div>
                    <CardTitle className="text-xl mb-2">Quantum-Safe Signature Schemes</CardTitle>
                    <CardDescription>
                      Migration path to post-quantum cryptographic signatures for RPX packets
                    </CardDescription>
                  </div>
                  <Clock className="text-gray-400 flex-shrink-0 ml-4" size={24} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Author</p>
                    <p className="font-semibold">Prof. James Liu</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Working Group</p>
                    <p className="font-semibold">Safety & Security</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Comment Period Ends</p>
                    <p className="font-semibold">Jan 22, 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Comments</p>
                    <p className="font-semibold">17</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Read RFC</Button>
                  <Button variant="outline" size="sm">Add Comment</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">RFC-040</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">Accepted</span>
                    </div>
                    <CardTitle className="text-xl mb-2">Enhanced Audit Trail Compression</CardTitle>
                    <CardDescription>
                      Improved compression algorithms for long-term audit log storage
                    </CardDescription>
                  </div>
                  <CheckCircle className="text-green-500 flex-shrink-0 ml-4" size={24} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Author</p>
                    <p className="font-semibold">Maria Garcia</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Working Group</p>
                    <p className="font-semibold">Implementation</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Accepted</p>
                    <p className="font-semibold">Dec 10, 2024</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Implementation</p>
                    <p className="font-semibold">Q2 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Read RFC</Button>
              </CardContent>
            </Card>
          </div>{/* End hidden example RFCs */}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">RFC Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial idea to protocol implementation
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Draft & Pre-Submission Review</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Author develops RFC draft with problem statement, proposed solution, impact analysis, and implementation considerations. Optional pre-submission review with relevant working group for feedback.
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="bg-gray-100 px-2 py-1 rounded">Timeline: 2-4 weeks</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Status: Draft</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Public Comment Period</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    RFC is published for 30-day public comment period. Community members review and provide feedback via comments. Author may revise RFC based on substantive feedback.
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Timeline: 30 days minimum</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Status: In Review</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Working Group Evaluation</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Appropriate working group performs technical review, considering community feedback. WG makes recommendation: accept, revise, or decline. Recommendation includes technical justification.
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded">Timeline: 2-3 weeks</span>
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded">Status: WG Review</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-navy text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">SERB Decision</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Standards & Ethics Review Board reviews WG recommendation and makes final decision. Decision is published with rationale. If accepted, RFC moves to implementation queue.
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="bg-gray-100 px-2 py-1 rounded">Timeline: 1-2 weeks</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Status: Accepted</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Implementation & Deployment</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Accepted RFCs are scheduled for implementation by core team or community contributors. Implementation is tracked publicly. Once implemented and tested, changes are deployed according to version release schedule.
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Timeline: Varies by scope</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Status: Implemented</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">RFC Template</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Required sections for RFC submissions
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200 font-mono text-sm">
            <div className="space-y-4">
              <div>
                <p className="font-bold text-base mb-2"># RFC-NNN: [Title]</p>
                <p className="text-gray-600">Clear, descriptive title (50 chars max)</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">## Metadata</p>
                <p className="text-gray-600">Author, Working Group, Date, Status</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">## Abstract</p>
                <p className="text-gray-600">3-5 sentence summary of the proposal</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">## Problem Statement</p>
                <p className="text-gray-600">What problem does this RFC solve?</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">## Proposed Solution</p>
                <p className="text-gray-600">Detailed technical specification</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">## Impact Analysis</p>
                <p className="text-gray-600">Backward compatibility, performance, security</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">## Implementation Considerations</p>
                <p className="text-gray-600">Testing strategy, rollout plan, migration path</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">## Alternatives Considered</p>
                <p className="text-gray-600">Why other approaches were rejected</p>
              </div>
              <div>
                <p className="font-bold text-base mb-2">## References</p>
                <p className="text-gray-600">Related RFCs, standards, research papers</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" className="bg-ssi-navy hover:bg-blue-900">
              Download RFC Template
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Have an Idea?</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            The RFC process is open to everyone. Your proposal could shape the future of autonomous agent safety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
              <Link href="#">
                Submit an RFC <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ssi-navy bg-transparent">
              <Link href="/governance/working-groups">
                Join a Working Group
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
