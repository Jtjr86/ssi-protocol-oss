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
import { Building2, Rocket, Award, Users, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Ecosystem & Partners - SSI Protocol",
  description: "Organizations and projects building with SSI Protocol",
};

export default function EcosystemPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white">Ecosystem & Partners</h1>
            <p className="text-xl text-white leading-relaxed">
              Organizations deploying SSI for safe, governable autonomous agent systems
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Implementation Examples</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use cases for SSI Protocol deployment across different sectors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardHeader>
                <Building2 className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Production Deployments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Organizations deploying SSI for agent systems in finance, healthcare, and manufacturing through the open protocol</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/developers">Implementation Guide</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Rocket className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Startup Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">AI-first startups building governed agent platforms on SSI infrastructure</p>
                <Button variant="outline" className="w-full">View Partners</Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Users className="text-ssi-teal mb-4" size={32} />
                <CardTitle>Research Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Universities studying autonomous agent safety using SSI as research infrastructure</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/research">Explore Research</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="text-ssi-teal mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-bold mb-6">Powered by SSI</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Organizations using SSI Protocol to support safe autonomous agent deployment
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-2">Open Protocol</h3>
              <p className="text-gray-600">Available for independent deployment</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-xl mb-2">Global Standard</h3>
              <p className="text-gray-600">Designed for international adoption</p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-ssi-navy hover:bg-blue-900">
            <Link href="/developers">
              Explore Implementation <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
