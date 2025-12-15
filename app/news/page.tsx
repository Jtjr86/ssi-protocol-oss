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
import { Calendar, ArrowRight, Bell } from "lucide-react";

export const metadata = {
  title: "News & Updates - SSI Protocol",
  description: "Latest announcements, roadmap, and launch information for SSI Protocol",
};

export default function NewsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">News & Updates</h1>
            <p className="text-xl text-white leading-relaxed">
              Latest announcements, roadmap updates, and community news
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Recent Announcements</h2>
          <div className="space-y-6">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="text-ssi-teal" size={20} />
                      <span className="text-sm text-gray-600">December 10, 2024</span>
                    </div>
                    <CardTitle className="text-2xl mb-2">SSI Protocol v1.0 Launch</CardTitle>
                    <p className="text-gray-600">
                      We're excited to announce the publication of SSI Protocol v1.0 specification, an open protocol for autonomous agent governance.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline">Read More</Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-ssi-teal" size={20} />
                  <span className="text-sm text-gray-600">November 28, 2024</span>
                </div>
                <CardTitle className="text-2xl mb-2">Reference Implementation Enhancements</CardTitle>
                <p className="text-gray-600">
                  Updated Gateway and Kernel implementations with improved performance and developer tooling
                </p>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href="/developers">View Updates</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-ssi-teal" size={20} />
                  <span className="text-sm text-gray-600">November 15, 2024</span>
                </div>
                <CardTitle className="text-2xl mb-2">Documentation Expansion</CardTitle>
                <p className="text-gray-600">
                  Comprehensive technical documentation and implementation guides now available
                </p>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href="/developers">Read Docs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Product Roadmap</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="font-bold text-xl">Q4 2024 - Foundation Release</h3>
              </div>
              <ul className="space-y-2 text-gray-700 ml-6">
                <li>• Core protocol specifications (RPX v1.0)</li>
                <li>• Gateway and Kernel reference implementations</li>
                <li>• Python and JavaScript SDKs</li>
                <li>• Developer documentation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="font-bold text-xl">Q1-Q2 2025 - Ecosystem Growth</h3>
              </div>
              <ul className="space-y-2 text-gray-700 ml-6">
                <li>• Additional language SDKs (Rust, Go)</li>
                <li>• Policy template library</li>
                <li>• Performance optimizations</li>
                <li>• Enhanced developer tooling</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <h3 className="font-bold text-xl">Q3-Q4 2025 - Advanced Features</h3>
              </div>
              <ul className="space-y-2 text-gray-700 ml-6">
                <li>• Multi-agent coordination protocols</li>
                <li>• Enhanced compliance frameworks</li>
                <li>• Performance optimizations</li>
                <li>• Global adoption initiatives</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Bell className="text-ssi-teal mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-bold mb-6 text-white">Stay Informed</h2>
          <p className="text-xl text-white mb-8">
            Subscribe to receive SSI Protocol updates, announcements, and community news
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-ssi-teal hover:bg-teal-600 text-white">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
