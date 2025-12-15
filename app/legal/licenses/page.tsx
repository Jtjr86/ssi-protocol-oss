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
import { FileCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Licenses - SSI Protocol",
  description: "Open source licenses for SSI Protocol software and documentation",
};

export default function LicensesPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <FileCode className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">Open Source Licenses</h1>
            </div>
            <p className="text-xl text-white/90">
              SSI Protocol is committed to open standards and open source software
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Protocol Specifications</h2>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Creative Commons Attribution 4.0 (CC BY 4.0)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  All SSI Protocol specifications, including RPX Protocol, Governance Envelope schemas, and technical documentation are licensed under CC BY 4.0.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  You are free to share and adapt the specifications for any purpose, including commercially, as long as you provide appropriate attribution.
                </p>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm">
                  <p className="mb-2">Attribution example:</p>
                  <p className="text-gray-700">"This implementation follows the SSI Protocol specification (https://ssi.dev) licensed under CC BY 4.0"</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Software Implementations</h2>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Apache License 2.0</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  All reference SSI software implementations including SDKs, Gateway, Kernel, and related tools are licensed under Apache 2.0.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Apache 2.0 is a permissive license that allows commercial use, modification, distribution, and private use, while providing an express grant of patent rights.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Commercial use allowed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Modification and distribution permitted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Patent grant included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>License and copyright notice required</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Third-Party Dependencies</h2>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Open Source Attribution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  SSI software uses various open source libraries and frameworks. We are grateful to the open source community and comply with all license requirements.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  For a complete list of dependencies and their licenses in each project:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Python SDK: View <code>LICENSE-THIRD-PARTY</code> file in repository</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>JavaScript SDK: View <code>NOTICE</code> file in repository</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Gateway/Kernel: See documentation for complete attribution</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-6">Trademark Usage</h2>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">SSI Protocol Trademarks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "SSI," "Sovereign Synthetic Intelligence," and the SSI logo are trademarks of the SSI Protocol Foundation. Use of these marks requires permission.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  You may use these marks to:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Indicate that your software implements the SSI Protocol</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Refer to the SSI project in articles or documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-ssi-teal rounded-full mt-2"></div>
                    <span>Link to ssi.dev in connection with implementation discussions</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-sm">
                  For commercial use of SSI marks in product names or marketing materials, contact <a href="mailto:trademarks@ssi.dev" className="text-ssi-navy hover:text-ssi-teal">trademarks@ssi.dev</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
