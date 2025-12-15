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
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service - SSI Protocol",
  description: "Terms of Service for using the SSI Protocol and related services",
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">Terms of Service</h1>
            </div>
            <p className="text-xl text-white/90">
              Last updated: December 11, 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Sovereign Synthetic Intelligence (SSI) Protocol services, APIs, documentation, and related infrastructure (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Services.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            SSI provides a global safety protocol for autonomous AI agents, including:
          </p>
          <ul>
            <li>SSI Gateway for agent registration and routing</li>
            <li>SSI Kernel for policy evaluation and governance</li>
            <li>RPX Protocol specifications and implementations</li>
            <li>Developer tools, SDKs, and documentation</li>
            <li>Community forums and support resources</li>
          </ul>

          <h2>3. User Accounts and API Keys</h2>
          <p>
            You are responsible for maintaining the confidentiality of your API keys and account credentials. You agree to notify SSI immediately of any unauthorized use of your account. SSI is not liable for any loss or damage arising from your failure to protect your credentials.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>
            You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:
          </p>
          <ul>
            <li>Attempt to circumvent or disable safety mechanisms or governance policies</li>
            <li>Use the Services in a manner that violates applicable laws or regulations</li>
            <li>Interfere with or disrupt the Services or servers connected to the Services</li>
            <li>Attempt to gain unauthorized access to any portion of the Services</li>
            <li>Use the Services to develop weapons or systems intended to cause harm</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            The SSI Protocol specifications are open and available under the terms specified in our licensing page. The SSI name, logo, and related marks are trademarks of the SSI Protocol Foundation. Our code implementations are open source under Apache 2.0 license unless otherwise specified.
          </p>

          <h2>6. Privacy and Data</h2>
          <p>
            Your use of the Services is also governed by our Privacy Policy. We collect and process data as described in the Privacy Policy to provide and improve the Services.
          </p>

          <h2>7. Service Availability</h2>
          <p>
            We strive to provide reliable Services but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of the Services at any time with reasonable notice.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, SSI Protocol Foundation and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless SSI Protocol Foundation from any claims, damages, losses, liabilities, and expenses arising from your use of the Services or violation of these Terms.
          </p>

          <h2>10. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of material changes through the Services or via email. Continued use of the Services after changes constitutes acceptance of the modified Terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by international arbitration rules and the laws of Switzerland, without regard to conflict of law provisions.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions about these Terms, please contact us at <a href="mailto:legal@ssi.dev" className="text-ssi-navy hover:text-ssi-teal">legal@ssi.dev</a>
          </p>
        </div>
      </section>
    </div>
  );
}
