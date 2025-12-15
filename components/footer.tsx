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
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Protocol",
      links: [
        { label: "Architecture", href: "/protocol" },
        { label: "Kernel", href: "/protocol/kernel" },
        { label: "Gateway", href: "/protocol/gateway" },
        { label: "Documentation", href: "/developers" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Developers", href: "/developers" },
        { label: "Research", href: "/research" },
        { label: "Standards", href: "/standards" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "About SSI", href: "/about" },
        { label: "For Regulators", href: "/regulators" },
        { label: "Contact", href: "/about#contact" },
        { label: "GitHub", href: "https://github.com" },
      ],
    },
  ];

  return (
    <footer className="bg-ssi-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="font-bold text-2xl mb-4">SSI</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A global safety protocol for autonomous AI systems.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com"
                className="text-gray-300 hover:text-ssi-teal transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-300 hover:text-ssi-teal transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-300 hover:text-ssi-teal transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 text-sm hover:text-ssi-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Sovereign Synthetic Intelligence Protocol. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/legal/terms"
                className="text-gray-400 text-sm hover:text-ssi-teal transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/legal/privacy"
                className="text-gray-400 text-sm hover:text-ssi-teal transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/legal/licenses"
                className="text-gray-400 text-sm hover:text-ssi-teal transition-colors"
              >
                Licenses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
