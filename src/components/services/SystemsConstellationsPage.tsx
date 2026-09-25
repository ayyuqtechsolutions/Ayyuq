import { PageId } from '../../types';
import ConstellationGrid from './ConstellationGrid';
import { 
  Cpu, 
  Lock, 
  Scale, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface SystemsConstellationsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectSystemForScope?: (systemTitle: string) => void;
}

export default function SystemsConstellationsPage({ onNavigate: _onNavigate, onSelectSystemForScope: _onSelectSystemForScope }: SystemsConstellationsPageProps) {
  return (
    <div id="systems-constellations-page" className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* PAGE HEADER */}
        <section className="text-center max-w-4xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs sm:text-sm font-mono tracking-wider"
          >
            <Cpu className="w-4 h-4 text-orange-500" />
            <span>OUR SERVICES & SOLUTIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#D8E8C5] tracking-tight leading-tight"
          >
            Built for Smooth Growth & <br />
            <span className="text-orange-500 font-black">
              Fast Performance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#9BB17B] max-w-2xl mx-auto leading-relaxed"
          >
            We do not use slow, bloated templates. We build modern websites, mobile apps, and custom software that handle thousands of daily customers smoothly.
          </motion.p>
        </section>

        {/* SERVICES OFFERED GRID */}
        <section className="space-y-4">
          <ConstellationGrid />
        </section>

        {/* THE PIONEER STANDARD (3-Card Breakdown) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold">
              OUR QUALITY PROMISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#D8E8C5] tracking-tight">
              The Ayyuq Standard
            </h2>
            <p className="text-xs sm:text-sm text-[#9BB17B]">
              Three essential guarantees we deliver for every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Clean, Bug-Free Code */}
            <div className="p-8 rounded-3xl bg-[#0F140D]/80 border border-[#607345]/30 hover:border-orange-500/50 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-600/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider font-semibold">Guarantee 01</span>
                <h3 className="text-xl font-heading font-bold text-[#D8E8C5]">Clean, Bug-Free Code</h3>
              </div>
              <p className="text-sm text-[#9BB17B] leading-relaxed">
                Written with clean, modern standards so your software is easy to update and runs smoothly for years without unexpected crashes.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-[#B6CE95]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F] shrink-0" />
                  <span>Strict Testing Before Every Release</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F] shrink-0" />
                  <span>Modular Code That is Easy to Maintain</span>
                </li>
              </ul>
            </div>

            {/* Card 2: High-Level Security */}
            <div className="p-8 rounded-3xl bg-[#141A10] border border-orange-600/40 hover:border-orange-500 transition-all space-y-4 group shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-300 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider font-semibold">Guarantee 02</span>
                <h3 className="text-xl font-heading font-bold text-[#D8E8C5]">High Security & Privacy</h3>
              </div>
              <p className="text-sm text-[#B6CE95] leading-relaxed">
                Secure user accounts, OTP authentication, and 256-bit encryption ensuring your customer data and payments are always safe.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-[#D8E8C5]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F] shrink-0" />
                  <span>Secure User Logins & Staff Roles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F] shrink-0" />
                  <span>Encrypted Data & Payment Protection</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Handles High Traffic */}
            <div className="p-8 rounded-3xl bg-[#0F140D]/80 border border-[#607345]/30 hover:border-orange-500/50 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-[#607345]/20 border border-[#607345]/40 flex items-center justify-center text-[#829A5F] group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#829A5F] uppercase tracking-wider font-semibold">Guarantee 03</span>
                <h3 className="text-xl font-heading font-bold text-[#D8E8C5]">Built for Heavy Traffic</h3>
              </div>
              <p className="text-sm text-[#9BB17B] leading-relaxed">
                Cloud servers that automatically scale up so your website and apps never slow down or crash even during big sale festivals and product launches.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-[#B6CE95]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F] shrink-0" />
                  <span>Fast Cloud Servers in India & Worldwide</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F] shrink-0" />
                  <span>99.99% Uptime Guarantee</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
