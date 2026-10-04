import { useState, useMemo } from 'react';
import { EstimatorState, ServiceTypeOptionId, CurrencyMode } from '../../types';
import { 
  Globe, 
  Smartphone,
  Monitor, 
  Building2, 
  Boxes, 
  TrendingUp, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Copy, 
  ArrowRight, 
  ArrowLeft, 
  MessageCircle,
  Terminal,
  Clock,
  DollarSign,
  Coins
} from 'lucide-react';
import { motion } from 'motion/react';
import { sanitizeInput } from '../../utils/security';

interface ScopeEstimatorProps {
  onManifestGenerated?: (manifestText: string, budgetRange: string) => void;
  initialSystemType?: string;
}

// 1 USD = ~85 INR conversion rate
const USD_RATE = 85;

export default function ScopeEstimator({ onManifestGenerated: _onManifestGenerated, initialSystemType }: ScopeEstimatorProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currency, setCurrency] = useState<CurrencyMode>('INR');
  const [copied, setCopied] = useState(false);

  // Map any passed initialSystemType to one of our service types
  const getInitialService = (): ServiceTypeOptionId => {
    if (!initialSystemType) return 'websites';
    const lower = initialSystemType.toLowerCase();
    if (lower.includes('mobile') || lower.includes('app')) return 'mobile-apps';
    if (lower.includes('desktop') || lower.includes('software')) return 'custom-desktop-software';
    if (lower.includes('erp') || lower.includes('crm')) return 'enterprise-erps-crms';
    if (lower.includes('inventory') || lower.includes('stock') || lower.includes('pos')) return 'inventory-business-systems';
    if (lower.includes('seo') || lower.includes('marketing') || lower.includes('graphic')) return 'seo-digital-marketing-design';
    if (lower.includes('support') || lower.includes('maintenance')) return 'tech-support-maintenance';
    return 'websites';
  };

  const [state, setState] = useState<EstimatorState>({
    systemType: getInitialService(),
    selectedScaleId: 'scale-starter',
    additionalNotes: '',
  });

  // Services offered
  const serviceOfferings: {
    id: ServiceTypeOptionId;
    number: string;
    title: string;
    subtitle: string;
    icon: any;
    description: string;
    coreStack: string[];
    highlightTag: string;
    scales: {
      id: string;
      title: string;
      subtitle: string;
      desc: string;
      priceINR: string;
      priceUSD: string;
      inrMin: number;
      inrMax?: number;
      isMonthly?: boolean;
      isCustom?: boolean;
      deliveryTimeline: string;
    }[];
  }[] = [
    {
      id: 'websites',
      number: '01',
      title: 'Websites & Web Apps',
      subtitle: 'High-Speed, SEO-Optimized',
      icon: Globe,
      description: 'Modern, high-performance websites engineered with instant load times, custom UI/UX design, mobile responsiveness, and SEO architecture.',
      coreStack: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Fast Hosting', 'SEO Best Practices'],
      highlightTag: 'Starting from ₹15,000 / $175',
      scales: [
        {
          id: 'web-starter',
          title: 'Starter MVP',
          subtitle: 'Essential Business Website',
          desc: 'High-converting multi-page business website with contact forms, mobile responsiveness, and rapid 2-week delivery.',
          priceINR: '₹15,000',
          priceUSD: '$176 USD',
          inrMin: 15000,
          deliveryTimeline: '1 – 2 Weeks',
        },
        {
          id: 'web-growth',
          title: 'Growth Package',
          subtitle: 'Expanding Business & E-Commerce',
          desc: 'Dynamic web platform, catalog / e-commerce features, payment gateway integration, and enhanced animations.',
          priceINR: '₹25,000',
          priceUSD: '$294 USD',
          inrMin: 25000,
          deliveryTimeline: '2 – 3 Weeks',
        },
        {
          id: 'web-enterprise',
          title: 'Complete Custom & Enterprise',
          subtitle: 'Full-Scale Custom Architecture',
          desc: 'Comprehensive custom web portal, user accounts, custom dashboards, database backend, and dedicated support.',
          priceINR: '₹50,000',
          priceUSD: '$588 USD',
          inrMin: 50000,
          deliveryTimeline: '3 – 5 Weeks',
        },
      ],
    },
    {
      id: 'mobile-apps',
      number: '02',
      title: 'Mobile Applications',
      subtitle: 'iOS & Android Native Experience',
      icon: Smartphone,
      description: 'Cross-platform smartphone applications crafted with seamless UX, smooth animations, push notifications, and unified Android & iOS support.',
      coreStack: ['React Native', 'Flutter', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'App Store & Play Store'],
      highlightTag: 'Starting from ₹30,000 / $350',
      scales: [
        {
          id: 'app-starter',
          title: 'Starter MVP App',
          subtitle: 'Core Mobile Experience',
          desc: 'Clean Android & iOS app with essential screens, user onboarding, push notifications, and fast deployment.',
          priceINR: '₹30,000',
          priceUSD: '$353 USD',
          inrMin: 30000,
          deliveryTimeline: '2 – 3 Weeks',
        },
        {
          id: 'app-growth',
          title: 'Growth Mobile Package',
          subtitle: 'Advanced Features & User Flows',
          desc: 'In-app purchases/payments, location/maps, real-time database sync, and high-conversion UI design.',
          priceINR: '₹50,000',
          priceUSD: '$588 USD',
          inrMin: 50000,
          deliveryTimeline: '3 – 4 Weeks',
        },
        {
          id: 'app-custom',
          title: 'Custom Complete Enterprise App',
          subtitle: 'Full Ecosystem & Store Launch',
          desc: 'Complex workflows, custom admin panel, automated notifications, end-to-end testing, and Play Store/App Store submission.',
          priceINR: '₹80,000',
          priceUSD: '$941 USD',
          inrMin: 80000,
          deliveryTimeline: '4 – 6 Weeks',
        },
      ],
    },
    {
      id: 'custom-desktop-software',
      number: '03',
      title: 'Custom Desktop Software',
      subtitle: 'Windows, macOS & Linux',
      icon: Monitor,
      description: 'High-performance native and cross-platform desktop applications featuring hardware optimization, offline execution, and local database reliability.',
      coreStack: ['Electron.js', 'C# / .NET', 'Python', 'SQLite', 'Tauri', 'Native OS APIs'],
      highlightTag: 'Starting from ₹50,000 / $585',
      scales: [
        {
          id: 'desktop-starter',
          title: 'Starter MVP Software',
          subtitle: 'Single OS Utility / Tool',
          desc: 'Core desktop utility, offline local database storage, automated reports, and clean dashboard interface.',
          priceINR: '₹50,000',
          priceUSD: '$588 USD',
          inrMin: 50000,
          deliveryTimeline: '3 – 4 Weeks',
        },
        {
          id: 'desktop-growth',
          title: 'Growth Package Software',
          subtitle: 'Cross-Platform Windows/Mac',
          desc: 'Hardware integrations, barcode/printer communication, automated data synchronization, and multi-user networking.',
          priceINR: '₹75,000',
          priceUSD: '$882 USD',
          inrMin: 75000,
          deliveryTimeline: '4 – 6 Weeks',
        },
        {
          id: 'desktop-enterprise',
          title: 'Enterprise Custom Software',
          subtitle: 'High-Volume Enterprise Suite',
          desc: 'High-throughput data processing, advanced cryptographic security, customized OS level integrations, and full source code.',
          priceINR: '₹1,00,000',
          priceUSD: '$1,176 USD',
          inrMin: 100000,
          deliveryTimeline: '6 – 8 Weeks',
        },
      ],
    },
    {
      id: 'enterprise-erps-crms',
      number: '04',
      title: 'Enterprise ERPs & CRMs',
      subtitle: 'End-to-End Workflow Control',
      icon: Building2,
      description: 'Custom management systems tailored to your exact business workflow—unifying staff coordination, customer pipelines, automated GST billing, and live analytical reporting.',
      coreStack: ['Custom Dashboards', 'Workflow Automation', 'PostgreSQL', 'Role-Based Access', 'Automated Invoices', 'Live Reports'],
      highlightTag: 'From ₹1,000/mo ($12/mo)',
      scales: [
        {
          id: 'crm-monthly',
          title: 'CRM System (Customer Pipeline)',
          subtitle: 'Lead Tracking & Client Management',
          desc: 'Customer database, automated WhatsApp/email follow-ups, sales pipeline Kanban boards, and staff activity tracking.',
          priceINR: '₹1,000 – ₹5,000 / month',
          priceUSD: '$12 – $60 / month',
          inrMin: 1000,
          inrMax: 5000,
          isMonthly: true,
          deliveryTimeline: '1 – 2 Weeks Setup',
        },
        {
          id: 'erp-monthly',
          title: 'ERP Management System',
          subtitle: 'End-to-End Business Operations',
          desc: 'Automated GST invoices, employee attendance/payroll, multi-department coordination, and real-time executive dashboard.',
          priceINR: '₹3,000 – ₹10,000 / month',
          priceUSD: '$35 – $118 / month',
          inrMin: 3000,
          inrMax: 10000,
          isMonthly: true,
          deliveryTimeline: '2 – 3 Weeks Setup',
        },
        {
          id: 'erp-crm-suite',
          title: 'Complete Custom ERP + CRM Suite',
          subtitle: 'Enterprise Dedicated Deployment',
          desc: 'Fully tailored workflows with dedicated cloud server instance, zero user caps, custom integrations, and SLA guarantees.',
          priceINR: '₹10,000+ / month (or One-Time)',
          priceUSD: '$118+ / month',
          inrMin: 10000,
          isMonthly: true,
          deliveryTimeline: '3 – 4 Weeks Setup',
        },
      ],
    },
    {
      id: 'inventory-business-systems',
      number: '05',
      title: 'Inventory & Business Systems',
      subtitle: 'Zero Stock Discrepancies',
      icon: Boxes,
      description: 'End-to-end stock control, supply chain tracking, barcode/QR management, multi-warehouse synchronization, and POS systems eliminating manual spreadsheet errors.',
      coreStack: ['Real-Time Sync', 'Barcode / QR Scanner', 'Low-Stock Alerts', 'Warehouse Analytics', 'POS Systems', 'Automated Audits'],
      highlightTag: 'From ₹5,000/mo ($60/mo)',
      scales: [
        {
          id: 'inventory-standard',
          title: 'Standard Inventory & POS System',
          subtitle: 'Single or Multi-Store Stock Management',
          desc: 'Live stock tracking, barcode/QR generation & scanning, low-stock instant alerts, vendor ordering, and fast point-of-sale terminal.',
          priceINR: '₹5,000 – ₹10,000 / month',
          priceUSD: '$60 – $118 / month',
          inrMin: 5000,
          inrMax: 10000,
          isMonthly: true,
          deliveryTimeline: '1 – 2 Weeks Setup',
        },
        {
          id: 'inventory-enterprise',
          title: 'Multi-Warehouse Enterprise Suite',
          subtitle: 'High Volume Supply Chain',
          desc: 'Multi-branch sync across cities, automated distributor invoicing, batch expiry tracking, and ERP integration.',
          priceINR: '₹12,000+ / month',
          priceUSD: '$140+ / month',
          inrMin: 12000,
          isMonthly: true,
          deliveryTimeline: '2 – 3 Weeks Setup',
        },
      ],
    },
    {
      id: 'seo-digital-marketing-design',
      number: '06',
      title: 'SEO, Digital Marketing & Graphic Design',
      subtitle: 'Organic Growth & Visual Identity',
      icon: TrendingUp,
      description: 'Data-driven search engine ranking, targeted digital ad campaigns, brand identity design, conversion optimization, and high-impact creative visual assets.',
      coreStack: ['Technical SEO', 'Google Analytics 4', 'Meta & Google Ads', 'Brand Identity', 'UI/UX Prototyping', 'Vector Graphics'],
      highlightTag: 'From ₹5,000/mo ($60/mo)',
      scales: [
        {
          id: 'seo-plan',
          title: 'Targeted SEO Optimization',
          subtitle: 'Google 1st Page Ranking Strategy',
          desc: 'Keyword research, on-page optimization, technical SEO audit, high-quality backlink building, and monthly Google Analytics ranking reports.',
          priceINR: '₹5,000 / month',
          priceUSD: '$60 / month',
          inrMin: 5000,
          isMonthly: true,
          deliveryTimeline: 'Ongoing Monthly Campaign',
        },
        {
          id: 'marketing-plan',
          title: 'Digital Marketing & Paid Ads',
          subtitle: 'Google Ads & Meta (Instagram/Facebook)',
          desc: 'High-ROI paid ad setup, audience targeting, conversion funnel tracking, creative ad copies, and daily budget optimization.',
          priceINR: '₹5,000 – ₹8,000 / month',
          priceUSD: '$60 – $94 / month',
          inrMin: 5000,
          inrMax: 8000,
          isMonthly: true,
          deliveryTimeline: 'Ongoing Monthly Campaign',
        },
        {
          id: 'graphic-plan',
          title: 'Graphic Design & Visual Branding',
          subtitle: 'Custom Logos, Social Media & UI/UX',
          desc: 'Brand identity packages, social media creative templates, product banners, brochure design, and Figma prototypes.',
          priceINR: 'Custom Quote (Depends on requirements)',
          priceUSD: 'Custom Quote (Scope dependent)',
          inrMin: 0,
          isCustom: true,
          deliveryTimeline: '3 – 7 Days Per Asset Batch',
        },
      ],
    },
    {
      id: 'tech-support-maintenance',
      number: '07',
      title: 'Dedicated Tech Support & Maintenance',
      subtitle: '99.99% Uptime & Fast Support',
      icon: ShieldCheck,
      description: 'Proactive 24/7 server health monitoring, regular security audits, automated cloud backups, rapid bug fixes, and guaranteed SLA technical assistance.',
      coreStack: ['24/7 Monitoring', 'Automated Backups', 'Security Audits', 'Cloud Scaling', 'Performance Tuning', 'SLA Guarantee'],
      highlightTag: 'From ₹2,000/mo ($25/mo)',
      scales: [
        {
          id: 'support-basic',
          title: 'Basic Support & Server Monitoring',
          subtitle: 'Continuous Uptime & Protection',
          desc: '24/7 uptime monitoring, weekly security backups, SSL maintenance, minor text/content updates, and rapid error patches.',
          priceINR: '₹2,000 – ₹3,000 / month',
          priceUSD: '$24 – $35 / month',
          inrMin: 2000,
          inrMax: 3000,
          isMonthly: true,
          deliveryTimeline: 'Immediate Active Coverage',
        },
        {
          id: 'support-high',
          title: 'High-Level Maintenance & Dedicated Support',
          subtitle: 'Priority SLA & Active Engineering',
          desc: 'Priority dedicated developer assistance, regular feature enhancements, database tuning, security penetration scans, and 1-hour critical response time.',
          priceINR: '₹4,000 – ₹5,000 / month',
          priceUSD: '$47 – $60 / month',
          inrMin: 4000,
          inrMax: 5000,
          isMonthly: true,
          deliveryTimeline: 'Immediate Active Coverage',
        },
      ],
    },
  ];

  // Currently selected service
  const currentService = useMemo(() => {
    return serviceOfferings.find((s) => s.id === state.systemType) || serviceOfferings[0];
  }, [state.systemType]);

  // Selected scale option
  const currentScale = useMemo(() => {
    const found = currentService.scales.find((sc) => sc.id === state.selectedScaleId);
    return found || currentService.scales[0];
  }, [currentService, state.selectedScaleId]);

  // Select service and auto-select its first scale
  const handleSelectService = (serviceId: ServiceTypeOptionId) => {
    const service = serviceOfferings.find((s) => s.id === serviceId);
    setState((prev) => ({
      ...prev,
      systemType: serviceId,
      selectedScaleId: service ? service.scales[0].id : 'scale-starter',
    }));
  };

  // Calculations for Manifest & Summary
  const calculatedEstimate = useMemo(() => {
    const activePriceString = currency === 'INR' ? currentScale.priceINR : currentScale.priceUSD;

    const manifestText = `
==================================================
        AYYUQ TECH SOLUTIONS • ESTIMATE MANIFEST
==================================================
[CURRENCY MODE]
• Selected Currency: ${currency === 'INR' ? 'Indian Rupee (₹ INR)' : 'US Dollar ($ USD)'} (1 USD ≈ ₹${USD_RATE} INR)

[SERVICE SELECTED]
• Service:           ${currentService.number}. ${currentService.title.toUpperCase()}
• Subtitle:          ${currentService.subtitle}
• Core Technologies: ${currentService.coreStack.join(', ')}

[PACKAGE & PRICING]
• Package Tier:      ${currentScale.title} (${currentScale.subtitle})
• Pricing:           ${activePriceString}
• Estimated Timeline:${currentScale.deliveryTimeline}

[DETAILS & SCOPE]
• Scope Summary:     ${currentScale.desc}
• Code Ownership:    100% Full Source Code & Database Ownership
• Support Window:    Indian Standard Time (IST) Direct Technical Support

[CLIENT NOTES]
${state.additionalNotes || 'Standard modern project package specification'}
==================================================
`;

    return {
      serviceTitle: currentService.title,
      serviceSubtitle: currentService.subtitle,
      serviceStack: currentService.coreStack,
      scaleTitle: currentScale.title,
      scaleSubtitle: currentScale.subtitle,
      priceString: activePriceString,
      timeline: currentScale.deliveryTimeline,
      manifestText,
    };
  }, [currency, currentService, currentScale, state.additionalNotes]);

  const copyManifest = () => {
    navigator.clipboard.writeText(calculatedEstimate.manifestText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="interactive-scope-cost-estimator" className="space-y-6">
      
      {/* TOP BAR: CURRENCY SWITCHER & PROGRESS STEPS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#0A0D08] border border-[#607345]/30">
        
        {/* 3 Step Navigation Pills */}
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto text-xs font-mono">
          {[
            { num: 1, label: '1. Service Type' },
            { num: 2, label: '2. Project Scale' },
            { num: 3, label: '3. Summary & Cost' },
          ].map((step) => {
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-[#0A0D08] font-black shadow-md shadow-orange-950/40'
                    : isDone
                    ? 'bg-[#141A10] text-orange-400 border border-[#607345]/30 font-semibold'
                    : 'text-[#829A5F] hover:text-[#D8E8C5]'
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border border-current">
                  {isDone ? <Check className="w-3 h-3" /> : step.num}
                </span>
                <span className="font-heading font-bold text-[11px] sm:text-xs">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* PROMINENT CURRENCY TOGGLE BUTTON */}
        <div className="flex items-center gap-2 bg-[#141A10] p-1.5 rounded-xl border border-[#607345]/40 w-full md:w-auto justify-center">
          <span className="text-[11px] font-mono text-[#829A5F] font-bold pl-2 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-orange-500" />
            Currency:
          </span>
          <div className="flex rounded-lg overflow-hidden border border-[#607345]/40 bg-[#0A0D08]">
            <button
              id="currency-toggle-inr"
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1 text-xs font-mono font-black flex items-center gap-1 transition-all cursor-pointer ${
                currency === 'INR'
                  ? 'bg-orange-600 text-[#0A0D08] shadow-md'
                  : 'text-[#829A5F] hover:text-[#D8E8C5]'
              }`}
            >
              <span>₹ INR</span>
            </button>
            <button
              id="currency-toggle-usd"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-mono font-black flex items-center gap-1 transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-orange-600 text-[#0A0D08] shadow-md'
                  : 'text-[#829A5F] hover:text-[#D8E8C5]'
              }`}
            >
              <DollarSign className="w-3 h-3" />
              <span>USD ($)</span>
            </button>
          </div>
          <span className="text-[10px] font-mono text-[#607345] hidden lg:inline pr-1">
            (1 USD ≈ ₹{USD_RATE})
          </span>
        </div>

      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="rounded-3xl bg-[#0F140D] border border-orange-600/30 p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        
        {/* STEP 1: SELECT SERVICE TYPE */}
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold">
                STEP 01 OF 03 • SERVICE TYPE
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#D8E8C5]">
                Select Your Required Service
              </h3>
              <p className="text-sm text-[#9BB17B]">
                Choose the primary service you want to estimate. Click to select, then customize the scale and package.
              </p>
            </div>

            {/* Grid of Service Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {serviceOfferings.map((service) => {
                const isSelected = state.systemType === service.id;
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    id={`select-service-${service.id}`}
                    onClick={() => handleSelectService(service.id)}
                    className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 space-y-4 flex flex-col justify-between group relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#141A10] border-2 border-orange-500 shadow-2xl shadow-orange-950/50 scale-[1.01]'
                        : 'bg-[#0A0D08]/90 border-2 border-[#607345]/30 hover:border-orange-500/60 hover:bg-[#141A10]'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top bar: Icon, Service # & Check */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-orange-600 text-[#0A0D08] shadow-md' 
                              : 'bg-[#141A10] text-orange-400 border border-[#607345]/40 group-hover:border-orange-500/50'
                          }`}>
                            <Icon className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <span className="text-xs font-mono font-extrabold text-[#607345] group-hover:text-orange-500 transition-colors">
                            {service.number}
                          </span>
                        </div>

                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-orange-500 bg-orange-600 text-[#0A0D08]' : 'border-[#607345]/40'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1">
                        <h4 className="text-lg sm:text-xl font-heading font-extrabold text-[#D8E8C5] group-hover:text-orange-400 transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-xs text-[#9BB17B] leading-relaxed line-clamp-3 font-sans">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Pricing Tag & Next Step Pill */}
                    <div className="pt-3 border-t border-[#607345]/20 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-orange-400">
                        {currency === 'INR'
                          ? service.scales[0].priceINR.includes('/ month')
                            ? service.scales[0].priceINR
                            : `From ${service.scales[0].priceINR}`
                          : service.scales[0].priceUSD.includes('/ month')
                            ? service.scales[0].priceUSD
                            : `From ${service.scales[0].priceUSD}`
                        }
                      </span>
                      <span className="text-[10px] font-mono text-[#829A5F] group-hover:text-[#D8E8C5]">
                        {service.scales.length} tiers
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs tracking-wider uppercase flex items-center gap-2 shadow-md shadow-orange-950/40 cursor-pointer"
              >
                <span>Continue to Project Scale</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SELECT PROJECT SCALE & PACKAGE */}
        {currentStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold">
                STEP 02 OF 03 • PROJECT SCALE & TIER
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#D8E8C5]">
                  Select Package for {currentService.title}
                </h3>
                <span className="text-xs font-mono font-bold text-[#829A5F] bg-[#141A10] px-3 py-1 rounded-lg border border-[#607345]/30">
                  Showing in {currency === 'INR' ? '₹ INR' : '$ USD'}
                </span>
              </div>
              <p className="text-sm text-[#9BB17B]">
                Pick the tier that matches your business requirements, timeline, and features.
              </p>
            </div>

            {/* Dynamic Package Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentService.scales.map((scale) => {
                const isSelected = state.selectedScaleId === scale.id;
                const activePrice = currency === 'INR' ? scale.priceINR : scale.priceUSD;

                return (
                  <div
                    key={scale.id}
                    id={`select-scale-${scale.id}`}
                    onClick={() => setState((p) => ({ ...p, selectedScaleId: scale.id }))}
                    className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 space-y-4 flex flex-col justify-between group relative ${
                      isSelected
                        ? 'bg-[#141A10] border-2 border-orange-500 shadow-2xl shadow-orange-950/50 scale-[1.02]'
                        : 'bg-[#0A0D08]/90 border-2 border-[#607345]/30 hover:border-orange-500/60 hover:bg-[#141A10]'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#141A10] text-[#829A5F] border border-[#607345]/40 font-bold uppercase tracking-wider">
                          {scale.subtitle}
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-orange-500 bg-orange-600 text-[#0A0D08]' : 'border-[#607345]/40'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <h4 className="text-xl font-heading font-extrabold text-[#D8E8C5] group-hover:text-orange-400 transition-colors">
                        {scale.title}
                      </h4>

                      <p className="text-xs text-[#9BB17B] leading-relaxed font-sans">
                        {scale.desc}
                      </p>
                    </div>

                    {/* Price and Timeline */}
                    <div className="pt-4 border-t border-[#607345]/20 space-y-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-[#829A5F] uppercase tracking-wider block">Estimated Price</span>
                        <div className="text-2xl font-heading font-black text-orange-400">
                          {activePrice}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#829A5F] pt-1">
                        <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{scale.deliveryTimeline}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Optional Notes */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-mono text-[#D8E8C5] uppercase font-semibold">
                Project Notes / Specific Needs (Optional):
              </label>
              <input
                type="text"
                maxLength={300}
                value={state.additionalNotes}
                onChange={(e) => setState((p) => ({ ...p, additionalNotes: sanitizeInput(e.target.value.slice(0, 300), 300) }))}
                placeholder="e.g. Need quick launch, WhatsApp integration, special branding assets..."
                className="w-full rounded-xl bg-[#0A0D08] border border-[#607345]/30 p-3 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl bg-[#141A10] border border-[#607345]/30 text-[#829A5F] text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:text-orange-400"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Services</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs tracking-wider uppercase flex items-center gap-2 shadow-md shadow-orange-950/40 cursor-pointer"
              >
                <span>View Summary & Cost Breakdown</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: SUMMARY & MANIFEST OUTPUT */}
        {currentStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs font-mono font-semibold">
                <Check className="w-3.5 h-3.5 text-orange-500" />
                <span>ESTIMATE READY • TRANSPARENT PRICING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#D8E8C5]">
                Your Project Cost Summary
              </h3>
              <p className="text-sm text-[#9BB17B]">
                Review the calculated quote below. You can toggle between ₹ INR and $ USD or message us directly on WhatsApp to get started.
              </p>
            </div>

            {/* Quick Metrics Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#0A0D08] border border-orange-600/40 space-y-1 text-center sm:text-left shadow-lg">
                <div className="text-xs font-mono text-[#829A5F] uppercase flex items-center justify-between">
                  <span>Price ({currency})</span>
                  <span className="text-[10px] text-orange-500 font-bold">Guaranteed</span>
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-orange-400">
                  {calculatedEstimate.priceString}
                </div>
                <div className="text-[10px] font-mono text-[#829A5F]">
                  {currency === 'INR' ? `≈ $${Math.round(currentScale.inrMin / USD_RATE)} USD` : `≈ ₹${(currentScale.inrMin).toLocaleString('en-IN')} INR`}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0A0D08] border border-[#607345]/30 space-y-1 text-center sm:text-left shadow-lg">
                <div className="text-xs font-mono text-[#829A5F] uppercase">Selected Service & Plan</div>
                <div className="text-lg sm:text-xl font-heading font-extrabold text-[#D8E8C5] truncate">
                  {calculatedEstimate.scaleTitle}
                </div>
                <div className="text-[10px] font-mono text-orange-400">{calculatedEstimate.serviceTitle}</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0A0D08] border border-[#607345]/30 space-y-1 text-center sm:text-left shadow-lg">
                <div className="text-xs font-mono text-[#829A5F] uppercase">Estimated Timeline</div>
                <div className="text-lg sm:text-xl font-heading font-extrabold text-[#D8E8C5]">
                  {calculatedEstimate.timeline}
                </div>
                <div className="text-[10px] font-mono text-[#829A5F]">Milestone-based delivery</div>
              </div>

            </div>

            {/* Manifest Codebox */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0A0D08] border border-orange-600/30 p-4 sm:p-6 font-mono text-xs text-[#D8E8C5]">
              <div className="flex items-center justify-between border-b border-[#607345]/20 pb-3 mb-3 text-[#829A5F]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-500" />
                  <span className="text-[#D8E8C5]">ayyuq-project-estimate.txt</span>
                </div>
                <button
                  onClick={copyManifest}
                  className="px-3 py-1 rounded bg-[#141A10] hover:bg-[#1C2516] border border-[#607345]/30 text-[#D8E8C5] flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#829A5F]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Estimate'}</span>
                </button>
              </div>

              <pre className="overflow-x-auto whitespace-pre leading-relaxed text-[#D8E8C5] selection:bg-orange-600/30">
                {calculatedEstimate.manifestText}
              </pre>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#141A10] border border-[#607345]/30 text-[#829A5F] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:text-orange-400"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Adjust Scale & Plan</span>
              </button>

              <a
                id="manifest-whatsapp-btn"
                href={`https://wa.me/919867069971?text=${encodeURIComponent(`Hi Ayyuq Tech Solutions, here is my project estimate:\n\n${calculatedEstimate.manifestText}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-950/50 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                <span>Send & Discuss on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
}
