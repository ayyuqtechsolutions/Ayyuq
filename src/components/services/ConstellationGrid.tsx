import { 
  Globe, 
  Monitor, 
  Building2, 
  Boxes, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceBlock {
  id: string;
  number: string;
  title: string;
  description: string;
  coreStack: string[];
  icon: any;
  highlightTag: string;
}

const servicesList: ServiceBlock[] = [
  {
    id: 'service-1',
    number: '01',
    title: 'Websites & Mobile Apps',
    description: 'High-speed, responsive websites and cross-platform smartphone applications engineered with instant load times, intuitive UI/UX, and unified iOS & Android support.',
    coreStack: ['Next.js', 'React.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'Fast REST APIs'],
    icon: Globe,
    highlightTag: 'Instant Speed & Cross-Platform',
  },
  {
    id: 'service-2',
    number: '02',
    title: 'Custom Desktop Software',
    description: 'High-performance native and cross-platform desktop applications for Windows, macOS, and Linux featuring hardware optimization, offline execution, and local database reliability.',
    coreStack: ['Electron.js', 'C# / .NET', 'Python', 'SQLite', 'Tauri', 'Native OS APIs'],
    icon: Monitor,
    highlightTag: 'Windows, macOS & Linux',
  },
  {
    id: 'service-3',
    number: '03',
    title: 'Enterprise ERPs & CRMs',
    description: 'Custom management systems tailored to your exact business workflow—unifying staff coordination, customer pipelines, automated GST billing, and live analytical reporting.',
    coreStack: ['Custom Dashboards', 'Workflow Automation', 'PostgreSQL', 'Role-Based Access', 'Automated Invoices', 'Live Reports'],
    icon: Building2,
    highlightTag: 'End-to-End Workflow Control',
  },
  {
    id: 'service-4',
    number: '04',
    title: 'Inventory & Business Systems',
    description: 'End-to-end stock control, supply chain tracking, barcode/QR management, multi-warehouse synchronization, and POS systems eliminating manual spreadsheet errors.',
    coreStack: ['Real-Time Sync', 'Barcode / QR Scanner', 'Low-Stock Alerts', 'Warehouse Analytics', 'POS Systems', 'Automated Audits'],
    icon: Boxes,
    highlightTag: 'Zero Stock Discrepancies',
  },
  {
    id: 'service-5',
    number: '05',
    title: 'SEO, Digital Marketing & Graphic Design',
    description: 'Data-driven search engine ranking, targeted digital ad campaigns, brand identity design, conversion optimization, and high-impact creative visual assets.',
    coreStack: ['Technical SEO', 'Google Analytics 4', 'Meta & Google Ads', 'Brand Identity', 'UI/UX Prototyping', 'Vector Graphics'],
    icon: TrendingUp,
    highlightTag: 'Organic Growth & Visual Identity',
  },
  {
    id: 'service-6',
    number: '06',
    title: 'Dedicated Tech Support & Maintenance',
    description: 'Proactive 24/7 server health monitoring, regular security audits, automated cloud backups, rapid bug fixes, and guaranteed SLA technical assistance.',
    coreStack: ['24/7 Monitoring', 'Automated Backups', 'Security Audits', 'Cloud Scaling', 'Performance Tuning', 'SLA Guarantee'],
    icon: ShieldCheck,
    highlightTag: '99.99% Uptime & Fast Support',
  },
];

export default function ConstellationGrid() {
  return (
    <div id="services-offered-section" className="space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>CAPABILITIES & EXPERTISE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#D8E8C5] tracking-tight">
          Services Offered
        </h2>
        <p className="text-sm sm:text-base text-[#9BB17B] max-w-2xl mx-auto leading-relaxed">
          Robust, production-grade digital solutions engineered to scale seamlessly with your business operations.
        </p>
      </div>

      {/* 2 Square Blocks Per Row Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {servicesList.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className="p-7 sm:p-9 rounded-3xl bg-[#0F140D] border-2 border-[#607345]/30 hover:border-orange-500/60 hover:bg-[#141A10] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-black/70 relative overflow-hidden"
            >
              {/* Background ambient accent */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-600/5 group-hover:bg-orange-600/10 rounded-full blur-2xl transition-all pointer-events-none" />

              {/* Top Block: Number, Icon, Highlight Tag */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#141A10] border-2 border-[#607345]/40 group-hover:border-orange-500/60 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-all shadow-md">
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] group-hover:text-orange-400 group-hover:border-orange-500/40 transition-colors font-bold">
                      {service.highlightTag}
                    </span>
                    <span className="text-xl font-mono font-extrabold text-[#607345] group-hover:text-orange-500 transition-colors">
                      {service.number}
                    </span>
                  </div>
                </div>

                {/* Title and Description */}
                <div className="space-y-2.5">
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#D8E8C5] group-hover:text-[#FF7A1A] transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#9BB17B] leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Core Stack Footer */}
              <div className="pt-6 mt-6 border-t-2 border-[#607345]/20 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#829A5F] uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-orange-500 stroke-[2.5]" />
                  <span>Core Stack:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.coreStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#0A0D08] border border-[#607345]/40 text-xs font-mono text-[#D8E8C5] group-hover:border-orange-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
