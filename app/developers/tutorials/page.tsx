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
import { BookOpen, Video, Code, FileCode, Github } from "lucide-react";

export const metadata = {
  title: "Tutorials - SSI Developers",
  description: "Step-by-step guides for common SSI integration patterns and use cases",
};

export default function TutorialsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">Tutorials</h1>
            <p className="text-xl text-white leading-relaxed">
              Learn SSI integration through practical, step-by-step guides
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Getting Started</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="text-ssi-teal" size={28} />
                  <CardTitle className="text-xl">Building Your First SSI Agent</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Complete walkthrough from installation to deploying a governed agent for testing environments</p>
                <div className="flex gap-2 text-xs mb-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Beginner</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">30 min</span>
                </div>
                <Button variant="outline" className="w-full">Start Tutorial</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Code className="text-ssi-teal" size={28} />
                  <CardTitle className="text-xl">Understanding RPX Packets</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Deep dive into Request-Permission-Execution protocol with practical examples</p>
                <div className="flex gap-2 text-xs mb-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Intermediate</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">45 min</span>
                </div>
                <Button variant="outline" className="w-full">Start Tutorial</Button>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-4xl font-bold mb-12 text-center">Domain-Specific Tutorials</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="border-2 hover:border-ssi-teal transition-colors" id="trading-client">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileCode className="text-ssi-teal" size={24} />
                  <CardTitle className="text-lg">Wrapping a Trading System with SSI Governance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">Learn how to add pre-trade governance to algorithmic trading systems with risk controls and audit trails.</p>
                <div className="flex gap-2 text-xs mb-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Intermediate</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">45 min</span>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/docs/developers/tutorials#trading-client">Start Tutorial</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-ssi-teal transition-colors" id="healthcare-client">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Code className="text-ssi-teal" size={24} />
                  <CardTitle className="text-lg">Healthcare AI Medication Safety</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">Implement fail-safe AI governance for clinical decision support systems with HIPAA compliance.</p>
                <div className="flex gap-2 text-xs mb-4">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Advanced</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">60 min</span>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/docs/developers/tutorials#healthcare-client">Start Tutorial</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-ssi-teal transition-colors" id="content-mod-client">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="text-ssi-teal" size={24} />
                  <CardTitle className="text-lg">Content Moderation AI Governance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">Build transparent content moderation with bias detection, appeals process, and multi-stakeholder oversight.</p>
                <div className="flex gap-2 text-xs mb-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Intermediate</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">50 min</span>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/docs/developers/tutorials#content-mod-client">Start Tutorial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-8 border-2 border-ssi-teal mb-16" id="client-template">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Start with the Client Template</h3>
              <p className="text-gray-700 mb-6">New to SSI? Begin with our starter template that provides boilerplate integration code for any domain.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-ssi-teal hover:bg-teal-600">
                  <Link href="https://github.com/Jtjr86/ssi-protocol-oss/tree/main/reference/client-template">
                    <Github className="mr-2" size={16} />
                    Clone Template
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/docs/developers/tutorials#client-template">
                    <BookOpen className="mr-2" size={16} />
                    Read Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-12 text-center">Integration Patterns</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">LangChain Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">Add SSI governance to LangChain agents</p>
                <Button variant="outline" size="sm" className="w-full">View Guide</Button>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Multi-Agent Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">Coordinate multiple agents with shared governance</p>
                <Button variant="outline" size="sm" className="w-full">View Guide</Button>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Custom Governance Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">Create domain-specific policy envelopes</p>
                <Button variant="outline" size="sm" className="w-full">View Guide</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Video className="text-ssi-teal mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-bold mb-6">Video Tutorials</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Watch our video series for visual step-by-step guidance
          </p>
          <Button size="lg" className="bg-ssi-navy hover:bg-blue-900">
            Browse Video Library
          </Button>
        </div>
      </section>
    </div>
  );
}
