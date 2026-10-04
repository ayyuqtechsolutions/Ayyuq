import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  FileCode, 
  Zap, 
  Clock, 
  Layers, 
  Lock, 
  UserCheck, 
  CreditCard, 
  ArrowRight, 
  MessageCircle, 
  Sparkles,
  PhoneCall,
  CheckCircle2,
  X
} from 'lucide-react';
import { PageId } from '../../types';

interface FAQItem {
  id: string;
  category: 'ownership' | 'tech' | 'timeline' | 'support';
  question: string;
  shortAnswer: string;
  fullAnswer: string[];
  keyAssurances: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'ip-ownership',
    category: 'ownership',
    question: 'Do we own 100% of the source code, repositories, and intellectual property?',
    shortAnswer: 'Yes. You receive unconditional, full ownership of all source code, git repositories, architecture documentation, and deployment infrastructure upon final delivery.',
    fullAnswer: [
      'Upon project completion and milestone settlement, 100% of all intellectual property rights are formally transferred to your company. We provide clean Git repository transfers, Dockerfiles, cloud environment configs, and architecture documentation.',
      'We never use proprietary closed-source agency frameworks that trap you into recurring licensing fees or hold your code hostage. You have full freedom to host anywhere, self-manage, or hand off to your internal engineering team in the future.',
      'Prior to kicking off work, we execute a mutual Non-Disclosure Agreement (NDA) and formal IP assignment agreement to legally safeguard your proprietary data, business logic, and trade secrets.'
    ],
    keyAssurances: [
      '100% Complete IP Transfer',
      'Mutual NDA Executed Upfront',
      'Zero Proprietary Vendor Lock-in',
      'Full Git Repository & Docs Handover'
    ],
    icon: FileCode
  },
  {
    id: 'custom-vs-templates',
    category: 'tech',
    question: 'Why should we invest in custom-engineered code over WordPress, Webflow, or Shopify templates?',
    shortAnswer: 'Commercial templates carry hidden long-term debt: sluggish 3–5s load times, security vulnerabilities from outdated plugins, and inflexible workflows that break as you scale.',
    fullAnswer: [
      'Off-the-shelf templates and site builders are burdened by bloated scripts, excessive third-party dependencies, and ongoing monthly plugin subscription costs. A 2-second delay in page load time can reduce conversion rates by up to 40% on high-ticket services.',
      'Ayyuq builds tailor-made digital engines using modern Next.js, React, TypeScript, and serverless edge databases. This guarantees sub-second page rendering, near-perfect 95+ Google Lighthouse scores, and zero plugin rot.',
      'Most importantly, custom architecture molds to your exact business logic, CRM flows, and inventory pipelines instead of forcing your operations to conform to a generic template box.'
    ],
    keyAssurances: [
      'Sub-Second Global Page Speeds',
      'Zero Vulnerable Third-Party Plugins',
      'Custom Business Logic Architecture',
      '95+ Google Lighthouse Core Web Vitals'
    ],
    icon: Zap
  },
  {
    id: 'security-compliance',
    category: 'support',
    question: 'How do you safeguard client data privacy, transactions, and enterprise-grade security?',
    shortAnswer: 'Security is architected at the foundational layer—not patched on after launch—adhering to OWASP Top 10 standards and zero-trust data protection principles.',
    fullAnswer: [
      'Every web application and API we deploy enforces strict end-to-end SSL/TLS encryption, parameterized database queries to eliminate SQL/NoSQL injection, and isolated cloud secret management.',
      'For platforms with authentication, we engineer granular Role-Based Access Control (RBAC), multi-factor authentication (MFA), and secure session tokenization to prevent unauthorized administrative escalation.',
      'Customer payment integrations (Stripe, Razorpay, Lemon Squeezy) utilize secure hosted tokenization so sensitive card details never touch your server, maintaining strict PCI-DSS compliance.'
    ],
    keyAssurances: [
      'OWASP Top 10 Hardened Codebase',
      'Role-Based Access Control (RBAC)',
      'PCI-DSS Compliant Payment Handling',
      'Isolated Secret & API Key Management'
    ],
    icon: Lock
  },
  {
    id: 'delivery-timeline',
    category: 'timeline',
    question: 'What does the delivery sprint process look like, and how do we monitor progress?',
    shortAnswer: 'We work in rapid, transparent milestone sprints: 2 to 4 weeks for MVPs and commercial platforms, and 4 to 8 weeks for complex full-stack web and mobile systems.',
    fullAnswer: [
      'Before writing the first line of code, we deliver an interactive Scope & Architecture Blueprint outlining exact features, technical specs, and milestone release dates. No vague promises or shifting goalposts.',
      'Throughout the build, you receive a private, live staging preview URL updated after each milestone sprint. You can test real features in real time on your actual devices as they are finished.',
      'You are never kept in the dark: we provide weekly recorded video walkthroughs, clear milestone sign-offs, and a direct communication channel via WhatsApp or Slack with lead engineer Hussain Tinwala.'
    ],
    keyAssurances: [
      '2–6 Weeks Rapid Sprint Delivery',
      'Live Password-Protected Staging URL',
      'Weekly Video Walkthrough Demos',
      'Direct WhatsApp / Slack Access'
    ],
    icon: Clock
  },
  {
    id: 'api-integrations',
    category: 'tech',
    question: 'Can our new software integrate with our existing ERPs, CRMs, internal databases, or legacy systems?',
    shortAnswer: 'Yes. We build clean, modular API interfaces and webhook event listeners that synchronize seamlessly with your existing commercial or custom backend systems.',
    fullAnswer: [
      'Whether your business relies on Salesforce, HubSpot, SAP, Zoho, custom PostgreSQL databases, or proprietary internal systems, we build resilient integration pipelines with automated retry logic and data validation.',
      'We eliminate double-entry friction by engineering real-time webhooks that automatically update your CRM when leads convert, reconcile inventory when orders process, and sync financial transactions directly with your accounting software.',
      'If you have legacy software, we can build modern API proxy layers that keep your existing core database intact while delivering a blistering fast, modern frontend interface for your users.'
    ],
    keyAssurances: [
      'Bi-Directional Automated Webhooks',
      'Salesforce, HubSpot & SAP Compatibility',
      'Zero-Downtime Migration Architecture',
      'Custom REST & GraphQL Endpoints'
    ],
    icon: Layers
  },
  {
    id: 'post-launch-sla',
    category: 'support',
    question: 'What happens after launch? Do you provide warranty support and ongoing maintenance SLAs?',
    shortAnswer: 'Every deployment includes a complimentary 30-day post-launch warranty, plus dedicated Tech Support SLA tiers starting at ₹4,000/mo ($49/mo) for continuous monitoring.',
    fullAnswer: [
      'We stand behind everything we build. For the first 30 days after public release, any software bugs, configuration issues, or performance regressions are resolved promptly at zero additional cost.',
      'Beyond launch warranty, we provide ongoing Tech Support & Infrastructure Maintenance SLAs. Our tiers include 24/7 server health monitoring, automated cloud database backups, routine security dependency patching, and guaranteed response turnaround times.',
      'You can also book ad-hoc feature sprints or retain engineering bandwidth as your business scales and demands new capabilities.'
    ],
    keyAssurances: [
      '30-Day Complimentary Bug Warranty',
      'Dedicated Tech Support from ₹4,000/mo',
      'Automated Database & Asset Backups',
      'Guaranteed SLA Turnaround Times'
    ],
    icon: ShieldCheck
  },
  {
    id: 'who-builds',
    category: 'ownership',
    question: 'Who specifically engineers our software? Will our account be delegated to junior contractors?',
    shortAnswer: 'Every architecture decision, database schema, and line of code is personally crafted by founder and lead engineer Hussain Tinwala. Zero agency delegation.',
    fullAnswer: [
      'Traditional digital agencies operate on an inflated partner-sales model: a charismatic senior director pitches your project, and once the contract is signed, the actual build is passed off to junior contractors or unvetted overseas interns.',
      'At Ayyuq, you work directly with Hussain Tinwala from day one through post-launch deployment. You get high-caliber technical expertise, rapid architectural decision-making, and senior craftmanship with zero bureaucratic telephone games.',
      'This direct structure eliminates agency overhead, ensuring that 100% of your budget translates into high-performance, bulletproof code.'
    ],
    keyAssurances: [
      'Direct Senior Engineering by Hussain',
      'Zero Junior Outsourcing or Handoffs',
      'Direct Technical Accountability',
      'No Bureaucratic Agency Overhead'
    ],
    icon: UserCheck
  },
  {
    id: 'pricing-contracts',
    category: 'timeline',
    question: 'How are contracts structured and what are your payment terms for custom engagements?',
    shortAnswer: 'We operate on transparent, milestone-based fixed contracts. You know the exact deliverables, milestone criteria, and final price before any work begins.',
    fullAnswer: [
      'We believe in zero billing surprises. We do not do ambiguous open-ended hourly billing that runs over budget. Every engagement is governed by a detailed Statement of Work (SOW) defining clear acceptance criteria for each phase.',
      'Standard custom projects are structured in phased milestones: an initial deposit to reserve engineering bandwidth, progress milestone releases validated on your private staging environment, and final deployment sign-off.',
      'Invoicing is seamless across domestic and international accounts, accepting direct bank wire (NEFT/RTGS), UPI, Stripe, and international wire transfers with GST compliant invoicing.'
    ],
    keyAssurances: [
      'Fixed-Price Transparent Milestone Scope',
      'Zero Unplanned Overages or Hourly Surprises',
      'Accepts INR (GST Compliant) & USD Invoicing',
      'Milestone Verification on Live Staging'
    ],
    icon: CreditCard
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Queries' },
  { id: 'ownership', label: 'Code & IP Ownership' },
  { id: 'tech', label: 'Tech Stack & Speed' },
  { id: 'timeline', label: 'Timelines & Delivery' },
  { id: 'support', label: 'Security & Maintenance' }
] as const;

interface CommandCenterFAQProps {
  onNavigate: (page: PageId) => void;
}

export default function CommandCenterFAQ({ onNavigate }: CommandCenterFAQProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('ip-ownership');

  const filteredItems = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch = 
        item.question.toLowerCase().includes(query) ||
        item.shortAnswer.toLowerCase().includes(query) ||
        item.fullAnswer.some(p => p.toLowerCase().includes(query)) ||
        item.keyAssurances.some(k => k.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      id="frequently-asked-questions"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-[#607345]/20 bg-[#0A0D08] overflow-hidden"
    >
      {/* Ambient Glassmorphism Backlight and Glow Orbs */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-600/10 via-[#607345]/15 to-transparent blur-[140px] pointer-events-none rounded-full" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-20 right-10 w-[450px] h-[300px] bg-orange-700/5 blur-[120px] pointer-events-none rounded-full" 
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A10]/90 border border-[#607345]/40 text-[#829A5F] text-xs font-mono tracking-wider backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-bold text-[11px] uppercase tracking-widest text-[#B6CE95]">
              Executive Transparency & Assurance
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#D8E8C5] tracking-tight leading-tight">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>

          <p className="text-base sm:text-lg text-[#B6CE95] leading-relaxed max-w-2xl mx-auto">
            Clear, authoritative answers to the common questions high-ticket clients and business leaders ask before initiating a custom build.
          </p>
        </div>

        {/* Glassmorphic Filter & Live Search Toolbar */}
        <div className="relative rounded-2xl p-4 sm:p-5 bg-[#0F140D]/70 border border-[#607345]/30 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] space-y-4">
          
          {/* Search Bar with Glass Glow */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#829A5F]" />
            <input
              type="text"
              maxLength={120}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.slice(0, 120))}
              placeholder="Search high-ticket queries (e.g., source code ownership, tech stack, SLA, payment terms)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#0A0D08]/80 border border-[#607345]/30 text-sm text-[#D8E8C5] placeholder-[#829A5F]/60 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/50 transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#829A5F] hover:text-[#D8E8C5] transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? FAQ_DATA.length 
                : FAQ_DATA.filter((item) => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold tracking-wide whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-orange-600 text-[#0A0D08] font-black shadow-md shadow-orange-950/40'
                      : 'text-[#829A5F] hover:text-[#D8E8C5] hover:bg-[#141A10]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-[#0A0D08]/30 text-[#0A0D08]' : 'bg-[#0A0D08]/60 text-[#829A5F]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List with Glassmorphism Panels */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-[#0F140D]/50 border border-[#607345]/20 backdrop-blur-md space-y-3">
              <HelpCircle className="w-10 h-10 text-[#829A5F]/50 mx-auto" />
              <div className="text-sm font-semibold text-[#D8E8C5]">No matching answers found</div>
              <p className="text-xs text-[#829A5F] max-w-sm mx-auto">
                Try searching with different keywords or reset your filter to view all questions.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 px-4 py-2 rounded-lg bg-[#141A10] border border-[#607345]/40 text-xs text-orange-400 hover:text-orange-300 font-semibold"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isExpanded = expandedId === item.id;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xl ${
                    isExpanded
                      ? 'bg-[#0F140D]/90 border-orange-500/50 shadow-[0_12px_40px_rgba(249,115,22,0.12)]'
                      : 'bg-[#0F140D]/65 hover:bg-[#0F140D]/85 border-[#607345]/30 hover:border-[#607345]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {/* Subtle Top Glass Rim Reflection Highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                  {/* Header / Question Accordion Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-2xl"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <div className={`p-2.5 rounded-xl border transition-all shrink-0 mt-0.5 ${
                        isExpanded
                          ? 'bg-orange-600/10 border-orange-500/40 text-orange-400'
                          : 'bg-[#141A10] border-[#607345]/30 text-[#829A5F] group-hover:text-orange-400 group-hover:border-orange-500/30'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#829A5F]">
                          <span className="text-orange-500 font-bold tabular-nums">0{index + 1}.</span>
                          <span className="uppercase tracking-wider">
                            {item.category === 'ownership' && 'Intellectual Property & Ownership'}
                            {item.category === 'tech' && 'Custom Engineering & Performance'}
                            {item.category === 'timeline' && 'Delivery Sprints & Contracts'}
                            {item.category === 'support' && 'Security, Privacy & Maintenance'}
                          </span>
                        </div>
                        <h3 className={`text-base sm:text-lg font-heading font-bold transition-colors ${
                          isExpanded ? 'text-white' : 'text-[#D8E8C5] group-hover:text-white'
                        }`}>
                          {item.question}
                        </h3>
                        {!isExpanded && (
                          <p className="text-xs sm:text-sm text-[#829A5F] line-clamp-1">
                            {item.shortAnswer}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`p-2 rounded-xl transition-all duration-300 shrink-0 ${
                      isExpanded 
                        ? 'bg-orange-600 text-[#0A0D08] rotate-180' 
                        : 'bg-[#141A10] text-[#829A5F] group-hover:text-white group-hover:bg-[#1A2215]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expandable Glass Content Body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#607345]/20 space-y-5">
                          
                          {/* Editorial Prose Paragraphs */}
                          <div className="space-y-3 text-sm sm:text-[15px] text-[#B6CE95] leading-relaxed">
                            {item.fullAnswer.map((para, pIdx) => (
                              <p key={pIdx}>{para}</p>
                            ))}
                          </div>

                          {/* Key Assurance Verification Markers */}
                          <div className="pt-2">
                            <div className="text-[11px] font-mono text-[#829A5F] uppercase tracking-wider font-bold mb-2.5">
                              Key Executive Assurances:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.keyAssurances.map((assurance, aIdx) => (
                                <div 
                                  key={aIdx}
                                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141A10]/70 border border-[#607345]/25 text-xs text-[#D8E8C5]"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                                  <span className="font-medium">{assurance}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* High-Converting Glass CTA Card for Custom Inquiries */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#141A10]/95 via-[#0F140D]/90 to-[#0A0D08]/95 border border-orange-600/35 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-600/15 rounded-full blur-[80px] pointer-events-none" 
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-bold tracking-wider uppercase">Direct Founder Access</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#D8E8C5] tracking-tight">
                Have a Specific Technical Question or Custom Scope?
              </h3>
              <p className="text-sm text-[#B6CE95] leading-relaxed">
                Skip the agency bureaucracy. Speak directly with lead engineer Hussain Tinwala to evaluate feasibility, receive architectural guidance, or review custom SLA requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('team')}
                className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
              >
                <span>Meet Hussain</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('launch-pad')}
                className="px-5 py-3 rounded-xl bg-[#141A10] hover:bg-[#1A2215] text-[#D8E8C5] border border-[#607345]/40 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Calculate Exact Price</span>
              </button>

              <a
                href="https://wa.me/919867069971?text=Hi%20Hussain%2C%20I%20reviewed%20your%20FAQ%20and%20have%20a%20specific%20question%20about%20a%20custom%20software%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-[#141A10] hover:bg-[#1A2215] text-green-400 border border-green-500/30 font-heading font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
