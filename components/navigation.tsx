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
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNav = [
    {
      label: "Protocol",
      items: [
        { label: "Specification Overview", href: "/protocol" },
        { label: "Message Formats", href: "/protocol/rpx" },
        { label: "Governance Envelopes", href: "/protocol/governance-envelopes" },
      ],
    },
    {
      label: "Reference Runtime",
      items: [
        { label: "SSI Kernel", href: "/protocol/kernel" },
        { label: "SSI Gateway", href: "/protocol/gateway" },
        { label: "Implementation Guide", href: "/developers" },
      ],
    },
    { label: "Developers", href: "/developers" },
    { label: "Explorer", href: "/explorer" },
    { label: "Regulators", href: "/regulators" },
    { label: "Research", href: "/research" },
    { label: "Standards", href: "/standards" },
    { label: "SSI Cloud", href: "/cloud" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="font-bold text-2xl text-ssi-navy">SSI Protocol</div>
            <div className="hidden sm:block text-sm text-gray-600 border-l pl-3 border-gray-300">
              Open Standard for AI Governance
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {mainNav.map((item) =>
              "items" in item && item.items ? (
                <div key={item.label} className="relative group">
                  <button className="text-sm font-medium text-gray-700 hover:text-ssi-navy transition-colors">
                    {item.label}
                  </button>
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ssi-navy transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-ssi-navy transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {mainNav.map((item) =>
              "items" in item && item.items ? (
                <div key={item.label}>
                  <div className="font-medium text-gray-900 mb-2">
                    {item.label}
                  </div>
                  <div className="pl-4 space-y-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block text-sm text-gray-600 hover:text-ssi-navy"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-gray-700 hover:text-ssi-navy font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
