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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Layers, Shield, FileText, CheckCircle, Code, ArrowRight, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Governance Envelopes - Policy Containers",
  description: "Structured policy containers defining boundaries and constraints for autonomous agents",
};

export default function GovernanceEnvelopesPage() {
  return (
    <div className="bg-white">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AlertTriangle className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-yellow-800">
            <strong>Policy Format Specification:</strong> Governance Envelopes define a structured format for expressing policies. They do not constitute regulatory requirements, certification standards, or enforcement mechanisms. Policy interpretation and enforcement are implementation-defined.
          </p>
        </div>
      </div>
      <section className="bg-gradient-to-br from-ssi-navy to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="text-ssi-teal" size={48} />
              <h1 className="text-5xl font-bold text-white">Governance Envelopes</h1>
            </div>
            <p className="text-xl text-white leading-relaxed mb-4">
              Structured policy containers that define boundaries, permissions, and safety constraints for autonomous agent operations.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              Envelopes enable flexible, composable governance that can adapt to different contexts, jurisdictions, and operational requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Policy Container Structure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hierarchical, composable policies that define what agents can and cannot do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Shield className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Safety Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Core safety rules that cannot be violated regardless of context. Defines prohibited actions, resource limits, and fundamental boundaries for agent behavior.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <CheckCircle className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Capability Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Explicit list of actions the agent is authorized to perform. Uses capability-based security model where permissions must be explicitly granted.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <FileText className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Framework Mapping References</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Optional references to regulatory frameworks and industry standards (NIST RMF, ISO 42001, EU AI Act). These are metadata fields for operator use and do not imply conformance validation by SSI.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Layers className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Contextual Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Dynamic policies that change based on context such as time of day, user consent, data sensitivity, or operational mode. Enables adaptive governance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <Scale className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Ethical Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Principles and values that guide agent decision-making beyond binary permit/deny. Includes fairness criteria, transparency requirements, and human oversight triggers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <FileText className="text-ssi-teal mb-4" size={32} />
                <CardTitle className="text-xl">Audit & Logging</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Operator-defined specifications for logging policies, retention periods, and reporting formats. These define the envelope's audit preferences; actual logging is implementation-defined.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Hierarchical Composition</h2>

          <div className="space-y-6 mb-12">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-navy text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Base Layer: Universal Safety</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Foundation policies in the envelope format specification. Defines absolute prohibitions (e.g., no unauthorized data deletion), resource limits, and core safety mechanisms. Protocol specification defines this layer as non-overridable.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-navy text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Domain Layer: Industry-Specific Rules</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Policies specific to domains like healthcare, finance, or manufacturing. References sector-specific frameworks (HIPAA, SOX, etc.) and industry practices. Applied based on operator-defined domain classification.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-navy text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Organization Layer: Enterprise Policies</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Custom policies defined by the deploying organization. Reflects internal governance requirements, risk appetite, and operational procedures. Organizations can be more restrictive than domain policies but not less.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ssi-navy text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Agent Layer: Instance-Specific Configuration</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Fine-grained policies for individual agents or agent groups. Includes specific capability grants, resource allocations, and contextual rules. Must comply with all higher-layer policies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h4 className="font-bold text-lg mb-2">Policy Resolution</h4>
            <p className="text-gray-700 leading-relaxed">
              When multiple layers specify conflicting rules, the protocol specifies that the most restrictive policy takes precedence. If no explicit permission exists at any layer, the protocol default is deny-by-default. Actual enforcement is implementation-defined.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Example Policies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-world governance envelope configurations for common scenarios
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Healthcare Data Agent</CardTitle>
                <CardDescription>HIPAA-referenced patient data access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto font-mono mb-4">
                  <pre>{`{
  "envelope_id": "healthcare-phi-access-v1",
  "domain": "healthcare",
  "framework_references": ["HIPAA", "ISO 27001"],
  "safety_constraints": {
    "prohibited_actions": [
      "data.delete",
      "data.export_unencrypted"
    ],
    "data_sensitivity": "PHI"
  },
  "capabilities": {
    "allowed": [
      "data.read",
      "data.analyze",
      "report.generate"
    ],
    "conditions": {
      "user_consent": "required",
      "purpose_limitation": true,
      "audit_logging": "comprehensive"
    }
  },
  "contextual_rules": {
    "access_hours": "business_hours_only",
    "mfa_required": true,
    "break_glass": {
      "enabled": true,
      "requires": "medical_emergency"
    }
  }
}`}</pre>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    HIPAA framework reference fields
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Patient consent field specifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Emergency access pattern example
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-ssi-teal transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Financial Trading Agent</CardTitle>
                <CardDescription>Regulated algorithmic trading operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto font-mono mb-4">
                  <pre>{`{
  "envelope_id": "finance-trading-v1",
  "domain": "finance",
  "framework_references": ["SOX", "MiFID II", "SEC"],
  "safety_constraints": {
    "max_transaction_value": 1000000,
    "max_daily_volume": 10000000,
    "prohibited_actions": [
      "trade.manipulation",
      "data.front_run"
    ]
  },
  "capabilities": {
    "allowed": [
      "market.read",
      "trade.execute",
      "portfolio.analyze"
    ],
    "rate_limits": {
      "trades_per_second": 10,
      "api_calls_per_minute": 100
    }
  },
  "contextual_rules": {
    "trading_hours": "market_open_only",
    "circuit_breakers": {
      "max_loss_percent": 5,
      "cool_down_minutes": 30
    },
    "human_approval": {
      "threshold": 500000,
      "timeout": "5m"
    }
  }
}`}</pre>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Transaction limits & circuit breakers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Framework reference metadata fields
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-ssi-teal" />
                    Human approval for large trades
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Creating Custom Envelopes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Design governance policies tailored to your specific requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="text-ssi-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Define Requirements</h3>
              <p className="text-gray-600 leading-relaxed">
                Identify your safety, compliance, and operational requirements. Consider regulatory obligations, risk tolerance, and business objectives.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-ssi-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Draft Policy</h3>
              <p className="text-gray-600 leading-relaxed">
                Use the envelope schema to express requirements as machine-readable policies. Reference existing templates for common scenarios.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-ssi-teal/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="text-ssi-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Test & Deploy</h3>
              <p className="text-gray-600 leading-relaxed">
                Validate policies in sandbox environment, test edge cases, then deploy to production with version control and rollback capability.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-ssi-navy hover:bg-blue-900">
              <Link href="/developers/api">
                View Envelope Schema Documentation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ssi-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Build Safe Agent Systems</h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Start defining governance policies for your autonomous agents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ssi-teal hover:bg-teal-600 text-white">
              <Link href="/developers/quickstart">
                Quick Start Guide <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ssi-navy bg-transparent">
              <Link href="/protocol">
                Protocol Overview
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
