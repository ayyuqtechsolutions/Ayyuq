import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  Database, 
  Server, 
  Cpu, 
  Clock, 
  Lock, 
  Activity,
  ArrowRight
} from 'lucide-react';

export default function ArchitectureToggle({ onEstimateClick }: { onEstimateClick: () => void }) {
  const [activeTab, setActiveTab] = useState<'traditional' | 'ayyuq'>('ayyuq');

  return (
    <div id="system-architecture-section" className="w-full space-y-6">
      
      {/* Section Header & Toggle Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#607345]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5 text-orange-500" />
            <span>HOW WE BUILD VS OTHERS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#D8E8C5] tracking-tight">
            Standard Agency Build vs. Ayyuq Modern Engineering
          </h3>
        </div>

        {/* State Toggle Buttons */}
        <div className="flex items-center p-1 rounded-xl bg-[#0A0D08] border border-[#607345]/30 self-start sm:self-auto shadow-inner">
          <button
            id="toggle-traditional-arch-btn"
            onClick={() => setActiveTab('traditional')}
            className={`px-4 py-2 rounded-lg text-xs font-heading font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'traditional'
                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                : 'text-[#829A5F] hover:text-[#FF7A1A]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Standard Agency</span>
          </button>

          <button
            id="toggle-ayyuq-arch-btn"
            onClick={() => setActiveTab('ayyuq')}
            className={`px-4 py-2 rounded-lg text-xs font-heading font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'ayyuq'
                ? 'bg-orange-600 text-[#0A0D08] font-black shadow-md shadow-orange-950/50'
                : 'text-[#829A5F] hover:text-[#FF7A1A]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Ayyuq Modern Standard</span>
          </button>
        </div>
      </div>

      {/* Comparison Transformation Display */}
      <AnimatePresence mode="wait">
        {activeTab === 'traditional' ? (
          <motion.div
            key="traditional-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl p-6 sm:p-8 bg-[#0A0D08]/90 border border-red-500/20 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <AlertTriangle className="w-48 h-48 text-red-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              {/* Left Column: Diagnostics */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>COMMON PROBLEMS WITH TRADITIONAL AGENCIES</span>
                </div>

                <h4 className="text-xl font-heading font-bold text-red-200">
                  Slow Templates & Fragile Plugins
                </h4>
                <p className="text-sm text-[#9BB17B] leading-relaxed">
                  Off-the-shelf WordPress themes and messy plugins slow down your site, crash during traffic rushes, and are difficult to customize.
                </p>

                {/* 4 Pillars of Traditional failure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
                      <Layers className="w-3.5 h-3.5 text-red-400" />
                      <span>Messy Code</span>
                    </div>
                    <p className="text-[11px] text-[#9BB17B]">Hard to add new features later without breaking existing pages.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
                      <Cpu className="w-3.5 h-3.5 text-red-400" />
                      <span>Bloated Plugins</span>
                    </div>
                    <p className="text-[11px] text-[#9BB17B]">Dozens of third-party plugins that conflict and break on updates.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
                      <Clock className="w-3.5 h-3.5 text-red-400" />
                      <span>Slow Page Load</span>
                    </div>
                    <p className="text-[11px] text-[#9BB17B]">Takes 4 to 6 seconds to open, causing potential customers to leave.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                      <span>Security Risks</span>
                    </div>
                    <p className="text-[11px] text-[#9BB17B]">Outdated plugins leave open doors for spam bots and hackers.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Wireframe Blueprint of legacy structure */}
              <div className="p-5 rounded-xl bg-black/60 border border-red-500/20 font-mono text-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-[#829A5F] flex items-center justify-between text-[11px] border-b border-zinc-800 pb-2">
                    <span>LEGACY_WEBSITE_CHECK</span>
                    <span className="text-red-400 font-semibold">PROBLEMS FOUND</span>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="p-2.5 rounded bg-red-950/30 border border-red-500/30 text-red-300 flex items-center justify-between">
                      <span>Slow Server Speed</span>
                      <span className="text-red-400 font-mono">4+ Sec Delay</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#141A10] border border-[#607345]/25 text-[#9BB17B] flex items-center justify-between">
                      <span>Server Crashes on Traffic Rush</span>
                      <span className="text-orange-400 font-mono">Overloaded</span>
                    </div>
                    <div className="p-2.5 rounded bg-red-950/30 border border-red-500/30 text-red-300 flex items-center justify-between">
                      <span>Basic Security / Spam Vulnerable</span>
                      <span className="text-red-400 font-mono">At Risk</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 text-[11px] text-[#829A5F] flex items-center justify-between">
                  <span>Recommendation: Switch to clean modern build</span>
                  <button
                    onClick={() => setActiveTab('ayyuq')}
                    className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 underline cursor-pointer"
                  >
                    See Ayyuq Way <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ayyuq-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl p-6 sm:p-8 bg-[#0F140D]/90 border border-orange-600/30 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Zap className="w-48 h-48 text-orange-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              
              {/* Left Column: Diagnostics */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span>THE AYYUQ ADVANTAGE • 100% HEALTHY SYSTEM</span>
                </div>

                <h4 className="text-xl font-heading font-bold text-[#D8E8C5]">
                  Built for Speed, Reliability & Easy Growth
                </h4>
                <p className="text-sm text-[#B6CE95] leading-relaxed">
                  We write clean, tailor-made code with high security, instant page loads, and smooth animations that give your customers a five-star experience.
                </p>

                {/* 4 Pillars of Ayyuq Architecture */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#0A0D08]/90 border border-[#607345]/30 space-y-1 shadow-sm">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400">
                      <Zap className="w-3.5 h-3.5 text-orange-500" />
                      <span>Instant Loading</span>
                    </div>
                    <p className="text-[11px] text-[#9BB17B]">Pages open immediately with smooth transitions on all mobile devices.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0D08]/90 border border-[#607345]/30 space-y-1 shadow-sm">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400">
                      <Layers className="w-3.5 h-3.5 text-orange-500" />
                      <span>Clean & Modular Code</span>
                    </div>
                    <p className="text-[11px] text-[#9BB17B]">Well-organized codebase making it super easy to add features anytime.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0D08]/90 border border-[#607345]/30 space-y-1 shadow-sm">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400">
                      <Database className="w-3.5 h-3.5 text-orange-500" />
                      <span>Custom Business Features</span>
                    </div>
                    <p className="text-[11px] text-[#9BB17B]">Tailored exactly to your specific workflows, bookings, and customer portals.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0D08]/90 border border-[#607345]/30 space-y-1 shadow-sm">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A7C286]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#829A5F]" />
                      <span>Top-Tier Data Security</span>
                    </div>
                    <p className="text-[11px] text-[#9BB17B]">Encrypted user passwords, safe online payments, and automated daily backups.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Ayyuq Mesh Inspector */}
              <div className="p-5 rounded-xl bg-[#0A0D08]/95 border border-[#607345]/30 font-mono text-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-[#829A5F] flex items-center justify-between text-[11px] border-b border-[#607345]/20 pb-2">
                    <span className="text-orange-400 font-semibold flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-[#829A5F]" />
                      AYYUQ_CLOUD_VERIFIED
                    </span>
                    <span className="text-[#829A5F] font-bold">100% RELIABLE</span>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="p-2.5 rounded bg-[#141A10] border border-[#607345]/30 text-orange-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F]" />
                        Super Fast Loading
                      </span>
                      <span className="text-[#829A5F] font-mono font-bold">Instant</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#141A10] border border-[#607345]/30 text-orange-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F]" />
                        Safe Database & Cloud Storage
                      </span>
                      <span className="text-[#829A5F] font-mono font-bold">99.99% Uptime</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#141A10] border border-[#607345]/30 text-orange-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#829A5F]" />
                        Encrypted User Login & Data
                      </span>
                      <span className="text-[#829A5F] font-mono font-bold">Fully Secure</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#607345]/20 text-[11px] flex items-center justify-between">
                  <span className="text-[#829A5F]">100% Quality Code Guarantee</span>
                  <button
                    onClick={onEstimateClick}
                    className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs flex items-center gap-1 shadow-md shadow-orange-950/40 cursor-pointer"
                  >
                    Get Estimate <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
