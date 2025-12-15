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
import { Download, Terminal, Package, FileCode, Github } from "lucide-react";

export const metadata = {
  title: "Downloads & SDKs - SSI Protocol",
  description: "Download SSI SDKs, CLI tools, and developer resources",
};

export default function DownloadsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Download className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">Downloads & SDKs</h1>
            </div>
            <p className="text-xl text-white leading-relaxed">
              Reference SDKs, command-line tools, and development resources for SSI Protocol
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Language SDKs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-ssi-teal" size={32} />
                  <CardTitle className="text-2xl">Python SDK</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Latest version: 1.0.0</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                    pip install ssi-sdk
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="https://github.com">
                      <Github className="mr-2" size={16} />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/developers/api">Documentation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-ssi-teal" size={32} />
                  <CardTitle className="text-2xl">JavaScript SDK</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Latest version: 1.0.0</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                    npm install @ssi/sdk
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="https://github.com">
                      <Github className="mr-2" size={16} />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/developers/api">Documentation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-ssi-teal" size={32} />
                  <CardTitle className="text-2xl">Rust SDK</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Latest version: 1.0.0</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                    cargo add ssi-sdk
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="https://github.com">
                      <Github className="mr-2" size={16} />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/developers/api">Documentation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-ssi-teal" size={32} />
                  <CardTitle className="text-2xl">Go SDK</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Latest version: 1.0.0</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                    go get ssi.dev/sdk
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="https://github.com">
                      <Github className="mr-2" size={16} />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/developers/api">Documentation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">CLI Tools</h2>
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="text-ssi-teal" size={32} />
                <CardTitle className="text-2xl">SSI CLI</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Command-line tool for agent management, policy testing, and SSI infrastructure interaction
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm mb-4">
                <pre>npm install -g @ssi/cli</pre>
              </div>
              <Button asChild variant="outline">
                <Link href="#">View CLI Documentation</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Docker Images</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <FileCode className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">SSI Gateway</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm mb-4">
                  docker pull ssi/gateway:latest
                </div>
                <Button variant="outline" className="w-full">
                  Deployment Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <FileCode className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">SSI Kernel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm mb-4">
                  docker pull ssi/kernel:latest
                </div>
                <Button variant="outline" className="w-full">
                  Deployment Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Need Help Getting Started?</h2>
          <p className="text-xl text-white mb-8">
            Follow our quick start guide for step-by-step installation and setup
          </p>
          <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
            <Link href="/developers/quickstart">
              View Quick Start Guide
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
