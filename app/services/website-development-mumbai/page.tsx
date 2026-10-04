import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Code2,
  Database,
  PhoneCall,
  Lock,
  CreditCard,
  TrendingUp,
  MapPin,
  Layers,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Custom Website Development Company in Mumbai & Thane | Next.js Specialists',
  description:
    'Award-winning website development agency in Mumbai & Thane. We engineer sub-second Next.js web applications, e-commerce platforms, and custom portals with zero WordPress bloat and 99+ Lighthouse performance scores.',
  keywords: [
    'Website development company in Mumbai',
    'Web development agency in Thane',
    'Custom React development Mumbai',
    'Next.js developers Mumbai',
    'Responsive e-commerce websites Mumbai',
    'Custom web application development Navi Mumbai',
    'Full stack developers Thane',
    'Bespoke web design Mumbai',
  ],
  alternates: {
    canonical: 'https://ayyuq.in/services/website-development-mumbai',
  },
  openGraph: {
    title: 'Custom Website Development Company in Mumbai & Thane | Ayyuq',
    description:
      'Engineered for extreme speed and conversions. Custom Next.js website development for Mumbai and Thane businesses. Sub-second loads, bespoke designs, zero plugins.',
    url: 'https://ayyuq.in/services/website-development-mumbai',
    siteName: 'Ayyuq Tech Solutions',
    locale: 'en_IN',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'How much does custom website development cost in Mumbai and Thane?',
    answer:
      'Custom website development for modern businesses in Mumbai typically ranges from ₹25,000 for high-performance marketing landing hubs up to ₹1,50,000+ for enterprise-grade web applications with custom database portals, payment integrations (Razorpay, Cashfree), and role-based access. Every project at Ayyuq is custom-quoted based on technical scope with transparent pricing and zero hidden hosting retainers.',
  },
  {
    question: 'Why choose Next.js and custom React over WordPress for a Mumbai business?',
    answer:
      'WordPress sites frequently suffer from slow mobile load times (3–8 seconds), vulnerable third-party plugins, and database bottlenecks. Next.js with React generates server-rendered, static-optimized code delivering sub-1-second load times on Indian mobile 4G/5G networks. This provides superior Google Core Web Vitals rankings, unmatched security (no vulnerable PHP plugins), and significantly higher ad conversion rates.',
  },
  {
    question: 'How fast will my custom website load?',
    answer:
      'We guarantee sub-1-second First Contentful Paint (FCP) and Time to Interactive (TTI) on Indian mobile connections, achieving 95–100 scores on Google PageSpeed Insights. We eliminate unnecessary script bloat, serve responsive WebP/AVIF graphics, and cache global edge assets via Cloudflare.',
  },
  {
    question: 'Do you offer in-person strategy meetings in Mumbai and Thane?',
    answer:
      'Yes. Our core engineering team is based in Thane West, serving businesses across Mumbai, Thane, Navi Mumbai, BKC, Powai, Andheri, and Lower Parel. We provide both direct in-person architectural strategy sessions and remote sprint reviews.',
  },
  {
    question: 'Can you integrate Indian payment gateways like Razorpay, Cashfree, and UPI?',
    answer:
      'Absolutely. We build native server-side integrations for Razorpay, Cashfree, PayU, and instant UPI QR payments with automated webhook reconciliation, GST-compliant invoice generation, and bank-grade SSL encryption.',
  },
];

export default function WebsiteDevelopmentMumbaiPage() {
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <main className="min-h-screen bg-[#070A05] text-[#FAFAFA] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* 1. HERO SECTION */}
          <header className="text-center max-w-4xl mx-auto space-y-6 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141A10] border border-[#3A4D39] text-[#829A5F] text-xs sm:text-sm font-mono tracking-wider font-semibold">
              <MapPin className="w-4 h-4 text-[#D95D39]" />
              <span>MUMBAI & THANE METROPOLITAN REGION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAFAFA] tracking-tight leading-tight">
              Custom Website Development Company in{' '}
              <span className="text-[#D95D39] block sm:inline">Mumbai & Thane</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#9BB17B] max-w-3xl mx-auto leading-relaxed">
              We engineer sub-second loading web applications with Next.js and React.
              No bloated WordPress themes. Zero plugin vulnerabilities. Just pure,
              ultra-fast custom code built to dominate Google search and convert high-ticket clients.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="https://wa.me/919867069971?text=Hi%20Ayyuq,%20I%20am%20looking%20for%20a%20custom%20website%20development%20quote%20in%20Mumbai."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D95D39] hover:bg-[#ea580c] text-[#070A05] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#D95D39]/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Book 1-on-1 Strategy Call</span>
              </a>

              <Link
                href="/#estimator"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#141A10] hover:bg-[#1E281D] border border-[#3A4D39] text-[#FAFAFA] font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
              >
                <span>Get 60-Second Estimate</span>
                <ArrowRight className="w-4 h-4 text-[#D95D39]" />
              </Link>
            </div>

            {/* Performance Metric Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 text-left">
              <div className="p-4 rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40">
                <div className="text-2xl sm:text-3xl font-black text-[#D95D39] font-mono">&lt; 500ms</div>
                <div className="text-xs text-[#9BB17B] font-medium mt-1">Average Page Load Speed</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40">
                <div className="text-2xl sm:text-3xl font-black text-[#829A5F] font-mono">100/100</div>
                <div className="text-xs text-[#9BB17B] font-medium mt-1">Google Core Web Vitals</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40">
                <div className="text-2xl sm:text-3xl font-black text-[#FAFAFA] font-mono">0%</div>
                <div className="text-xs text-[#9BB17B] font-medium mt-1">WordPress / Template Bloat</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40">
                <div className="text-2xl sm:text-3xl font-black text-[#D95D39] font-mono">24/7</div>
                <div className="text-xs text-[#9BB17B] font-medium mt-1">Local Mumbai & Thane Support</div>
              </div>
            </div>
          </header>

          {/* 2. LOCALIZED SEO COPY & INDUSTRY EXPERTISE */}
          <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
                Why Mumbai’s Fastest Growing Companies Choose Custom Next.js Architecture
              </h2>
              <p className="text-sm sm:text-base text-[#9BB17B]">
                In competitive markets across Bandra Kurla Complex (BKC), Andheri, Powai, Lower Parel, and Thane, speed equals revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <article className="p-6 sm:p-8 rounded-3xl bg-[#0F140D] border border-[#3A4D39]/50 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#141A10] border border-[#3A4D39] flex items-center justify-center text-[#D95D39]">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#FAFAFA]">
                  Bespoke Web Development Agency in Mumbai
                </h3>
                <p className="text-sm text-[#B6CE95] leading-relaxed">
                  Most web design agencies in Mumbai sell recycled WordPress templates that load dozens of unnecessary CSS and JavaScript libraries. At Ayyuq Tech Solutions, our engineering team builds tailored software from scratch using Next.js App Router, TypeScript, and modern headless architecture. Every line of code serves your business objective, driving conversion rates and keeping your brand memorable.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#9BB17B] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#829A5F] flex-shrink-0" />
                    <span>Single-Page Application (SPA) fluid responsiveness</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#829A5F] flex-shrink-0" />
                    <span>Dynamic Server-Side Rendering (SSR) for instant indexing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#829A5F] flex-shrink-0" />
                    <span>Zero plugin dependency vulnerabilities</span>
                  </li>
                </ul>
              </article>

              <article className="p-6 sm:p-8 rounded-3xl bg-[#0F140D] border border-[#3A4D39]/50 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#141A10] border border-[#3A4D39] flex items-center justify-center text-[#829A5F]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#FAFAFA]">
                  Responsive E-Commerce & Custom React Portals
                </h3>
                <p className="text-sm text-[#B6CE95] leading-relaxed">
                  Whether you are scaling a direct-to-consumer brand in Navi Mumbai or launching a B2B distribution system in Thane Industrial Area, we build lightning-fast web storefronts and private client dashboards. Integrate seamless one-click checkout, automated inventory tracking, and localized Indian logistics APIs with zero transaction lag.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#9BB17B] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#829A5F] flex-shrink-0" />
                    <span>Frictionless mobile checkout for 4G/5G smartphone shoppers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#829A5F] flex-shrink-0" />
                    <span>Custom inventory synchronization & billing automation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#829A5F] flex-shrink-0" />
                    <span>Direct WhatsApp marketing & automated order alerts</span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* 3. FEATURE GRID: TECHNICAL ADVANTAGES */}
          <section className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A10] border border-[#3A4D39] text-[#829A5F] text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#D95D39]" />
                <span>ARCHITECTURAL ADVANTAGES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
                Engineered for Performance, Scalability & Security
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40 space-y-3 hover:border-[#D95D39]/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#141A10] border border-[#3A4D39] flex items-center justify-center text-[#D95D39]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#FAFAFA]">Instant Speed</h3>
                <p className="text-xs text-[#9BB17B] leading-relaxed">
                  Sub-second loading times powered by Next.js Server Components, asset minification, and automatic image conversion into AVIF/WebP formats.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40 space-y-3 hover:border-[#D95D39]/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#141A10] border border-[#3A4D39] flex items-center justify-center text-[#829A5F]">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#FAFAFA]">Custom Admin Portals</h3>
                <p className="text-xs text-[#9BB17B] leading-relaxed">
                  Intuitive, bespoke administration panels that give your operational team full control over leads, content, pricing, and client records.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40 space-y-3 hover:border-[#D95D39]/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#141A10] border border-[#3A4D39] flex items-center justify-center text-[#D95D39]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#FAFAFA]">Payment Gateways</h3>
                <p className="text-xs text-[#9BB17B] leading-relaxed">
                  Native integrations for Razorpay, Cashfree, Stripe, and UPI QR codes with instant webhook confirmation and automated invoicing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40 space-y-3 hover:border-[#D95D39]/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#141A10] border border-[#3A4D39] flex items-center justify-center text-[#829A5F]">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#FAFAFA]">Cloudflare Security</h3>
                <p className="text-xs text-[#9BB17B] leading-relaxed">
                  Enterprise SSL, anti-DDoS mitigation, automated daily database backups, and strict HTTP Content Security Policy out of the box.
                </p>
              </div>
            </div>
          </section>

          {/* 4. FAQ ACCORDION SECTION (Google Rich Snippets) */}
          <section className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
                Frequently Asked Questions about Website Development in Mumbai
              </h2>
              <p className="text-sm text-[#9BB17B]">
                Everything you need to know about timelines, costs, and technology.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl bg-[#0F140D] border border-[#3A4D39]/40 p-5 open:border-[#D95D39]/60 transition-colors cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-bold text-[#FAFAFA] text-base list-none select-none">
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#D95D39] transition-transform duration-200 group-open:rotate-180 flex-shrink-0" />
                  </summary>
                  <p className="mt-4 text-sm text-[#B6CE95] leading-relaxed border-t border-[#3A4D39]/30 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* 5. HIGH-CONVERSION CTA */}
          <section className="rounded-3xl bg-gradient-to-br from-[#141A10] to-[#0A0D08] border border-[#3A4D39] p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E281D] border border-[#3A4D39] text-[#829A5F] text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D95D39]" />
              <span>DIRECT FOUNDER ENGAGEMENT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFAFA] tracking-tight">
              Ready to Build Your Mumbai or Thane Web Application?
            </h2>

            <p className="text-base text-[#9BB17B] max-w-2xl mx-auto leading-relaxed">
              Skip agency middlemen. Speak directly with Hussain Tinwala, Founder and Principal Software Architect at Ayyuq Tech Solutions. We scope your project in 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/919867069971?text=Hi%20Hussain,%20I%20would%20like%20to%20consult%20on%20a%20website%20development%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D95D39] hover:bg-[#ea580c] text-[#070A05] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#D95D39]/20 transition-transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Message on WhatsApp (+91 9867069971)</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0F140D] hover:bg-[#1E281D] border border-[#3A4D39] text-[#FAFAFA] font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
              >
                <span>Send Official Project Brief</span>
                <ArrowRight className="w-4 h-4 text-[#D95D39]" />
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#829A5F] font-mono">
              <span>📍 Office: Thane West, Maharashtra</span>
              <span>⚡ 24-Hour Scope Turnaround</span>
              <span>🛡️ Mutual Non-Disclosure Agreement (NDA)</span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
