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
import { Users, MessageSquare, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Community - SSI Protocol",
  description: "Join the SSI Protocol community - discussions, contributions, and events",
};

export default function CommunityPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">Community</h1>
            </div>
            <p className="text-xl text-white leading-relaxed">
              Connect with developers, researchers, and organizations building the future of safe autonomous agents
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Join the Discussion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to connect with the SSI community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <MessageSquare className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Discord Server</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Real-time chat with developers, ask questions, and participate in technical discussions
                </p>
                <Button className="w-full bg-ssi-navy hover:bg-blue-900">
                  Join Discord Server
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Github className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">GitHub Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Technical Q&A, feature requests, and long-form discussions about protocol development
                </p>
                <Button className="w-full bg-ssi-navy hover:bg-blue-900">
                  View Discussions
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Twitter className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">Twitter/X</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Follow @SSIProtocol for announcements, updates, and community highlights
                </p>
                <Button variant="outline" className="w-full">
                  Follow on Twitter
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Linkedin className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-2xl">LinkedIn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Professional network for SSI practitioners, enterprise users, and researchers
                </p>
                <Button variant="outline" className="w-full">
                  Connect on LinkedIn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Contributor Guide</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Code Contributions</h3>
              <p className="text-gray-700 mb-3">
                Contribute to SSI implementations, SDKs, and tools on GitHub. We welcome bug fixes, features, and performance improvements.
              </p>
              <Button asChild variant="outline">
                <Link href="#">Contribution Guidelines</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Documentation</h3>
              <p className="text-gray-700 mb-3">
                Help improve SSI documentation with clarifications, examples, and translations.
              </p>
              <Button asChild variant="outline">
                <Link href="#">Docs Contribution Guide</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-3">Working Groups (Planned)</h3>
              <p className="text-gray-700 mb-3">
                Future structure for contributing to protocol development through GitHub and open technical discussions.
              </p>
              <Button asChild variant="outline">
                <Link href="/developers">Explore Development</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Build the Future Together</h2>
          <p className="text-xl text-white mb-8">
            SSI is built by a global community of developers, researchers, and organizations committed to safe AI
          </p>
          <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
            <Link href="#">
              Get Started Contributing <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
