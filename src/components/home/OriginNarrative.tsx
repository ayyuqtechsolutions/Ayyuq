import { Sparkles, ArrowUpRight } from 'lucide-react';
import { PageId } from '../../types';
import AyyuqLogo from '../ui/AyyuqLogo';

export default function OriginNarrative({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <section id="origin-narrative-section" className="relative py-16 sm:py-24 border-t border-[#607345]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>THE ASTRONOMICAL ORIGIN</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#D8E8C5] tracking-tight leading-tight">
              The Guiding Star That Leads the Way.
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl font-medium text-[#D8E8C5] leading-relaxed">
              In ancient astronomy, <span className="text-orange-500 font-bold">Al-Ayyuq</span> is the pioneer star—the first bright star to rise in the night sky, guiding travelers and explorers forward.
            </p>

            <p className="text-base sm:text-lg md:text-xl font-medium text-[#B6CE95] leading-relaxed">
              We built <strong className="text-orange-400 font-bold">Ayyuq Tech Solutions</strong> with this same purpose. Instead of slow development and complicated systems, we give businesses fast, clean, and reliable websites, mobile apps, and custom software that work smoothly from day one.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                id="origin-explore-systems-btn"
                onClick={() => onNavigate('systems')}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
              >
                <span>View Our Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                id="origin-view-deployments-btn"
                onClick={() => onNavigate('orbit')}
                className="px-5 py-2.5 rounded-xl bg-[#141A10] hover:bg-[#1A2215] text-[#D8E8C5] font-heading font-semibold text-xs tracking-wider uppercase border border-[#607345]/40 transition-all cursor-pointer"
              >
                View Our Work
              </button>
            </div>
          </div>

          {/* Right Column: High Status Star Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-[#0F140D]/90 border border-orange-600/30 overflow-hidden space-y-6 shadow-2xl">
              
              {/* Celestial Graphic Ring with Official Logo */}
              <div className="flex items-center justify-between border-b border-[#607345]/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-[#0A0D08] border border-orange-600/30 flex items-center justify-center">
                    <AyyuqLogo variant="icon" size="sm" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#D8E8C5]">
                      OUR CORE VALUES
                    </h3>
                    <p className="text-[11px] font-mono text-[#829A5F]">Quality • Speed • Transparency</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#829A5F] uppercase tracking-widest font-semibold">EST. 2026</span>
              </div>

              {/* 3 Core Axioms */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#0A0D08]/80 border border-[#607345]/20 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-heading font-semibold text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>01. Modern & Future-Ready</span>
                  </div>
                  <p className="text-xs text-[#9BB17B] pl-3.5">
                    We build using the latest, proven web and mobile technologies so your software never gets outdated quickly.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0D08]/80 border border-[#607345]/20 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-heading font-semibold text-[#A7C286]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#829A5F]" />
                    <span>02. Clean & Bug-Free Code</span>
                  </div>
                  <p className="text-xs text-[#9BB17B] pl-3.5">
                    Every screen and feature is carefully tested. No slow loading, no messy plugins, and zero headaches.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0D08]/80 border border-[#607345]/20 space-y-1">
                  <div className="flex items-center gap-2 text-sm font-heading font-semibold text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>03. Full ownership 100%</span>
                  </div>
                  <p className="text-xs text-[#9BB17B] pl-3.5">
                    You get full source code ownership, complete database access, and total control over your business platform.
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="pt-2 border-t border-[#607345]/20 flex items-center justify-between text-xs font-mono text-[#829A5F]">
                <span className="italic text-[#B6CE95]">"Built for the Next."</span>
                <span className="text-orange-500 font-bold">Ayyuq Promise</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
