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
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - SSI Protocol",
  description: "How SSI Protocol collects, uses, and protects your data",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">Privacy Policy</h1>
            </div>
            <p className="text-xl text-white/90">
              Last updated: December 11, 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <h2>1. Introduction</h2>
          <p>
            The SSI Protocol Foundation ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard information when you use our Services.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>Account Information</h3>
          <ul>
            <li>Email address</li>
            <li>Organization name (if applicable)</li>
            <li>API key usage and authentication data</li>
          </ul>

          <h3>Technical Data</h3>
          <ul>
            <li>Agent registration metadata (agent types, capabilities, versions)</li>
            <li>RPX packet metadata (action types, timestamps, outcomes)</li>
            <li>API usage statistics and performance metrics</li>
            <li>IP addresses and connection information</li>
          </ul>

          <h3>Audit Trail Data</h3>
          <ul>
            <li>Governance decisions and policy evaluations</li>
            <li>Agent action logs (as required for safety and compliance)</li>
            <li>Security event logs</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use collected information for:
          </p>
          <ul>
            <li>Providing and maintaining the Services</li>
            <li>Ensuring safety and compliance through governance mechanisms</li>
            <li>Improving protocol performance and reliability</li>
            <li>Detecting and preventing security threats</li>
            <li>Communicating with you about the Services</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain data as follows:
          </p>
          <ul>
            <li><strong>Audit trails:</strong> 7 years (for compliance purposes)</li>
            <li><strong>Account data:</strong> Duration of account plus 90 days</li>
            <li><strong>Technical logs:</strong> 90 days unless required for investigations</li>
          </ul>

          <h2>5. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal data. We may share data with:
          </p>
          <ul>
            <li><strong>Service providers:</strong> Third parties who assist in operating the Services</li>
            <li><strong>Legal authorities:</strong> When required by law or to protect rights and safety</li>
            <li><strong>Research partners:</strong> Aggregated, anonymized data for AI safety research</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We implement industry-standard security measures including:
          </p>
          <ul>
            <li>End-to-end encryption for data in transit</li>
            <li>Encryption at rest for sensitive data</li>
            <li>Regular security audits and penetration testing</li>
            <li>Access controls and authentication mechanisms</li>
          </ul>

          <h2>7. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, contact us at <a href="mailto:privacy@ssi.dev" className="text-ssi-navy hover:text-ssi-teal">privacy@ssi.dev</a>
          </p>

          <h2>8. International Data Transfers</h2>
          <p>
            SSI operates globally. Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our Services are not directed to individuals under 18. We do not knowingly collect personal data from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of material changes via email or through the Services.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            For privacy-related questions or concerns, contact our Data Protection Officer at <a href="mailto:privacy@ssi.dev" className="text-ssi-navy hover:text-ssi-teal">privacy@ssi.dev</a>
          </p>
        </div>
      </section>
    </div>
  );
}
