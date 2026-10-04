import { useRef } from 'react';
import { PageId } from '../../types';
import StarCanvas from '../ui/StarCanvas';
import ArchitectureToggle from './ArchitectureToggle';
import OriginNarrative from './OriginNarrative';
import CommandCenterFAQ from './CommandCenterFAQ';
import AyyuqLogo from '../ui/AyyuqLogo';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Orbit, 
  Rocket, 
  ShieldCheck, 
  Layers, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';

interface CommandCenterPageProps {
  onNavigate: (page: PageId) => void;
}

export default function CommandCenterPage({ onNavigate }: CommandCenterPageProps) {
  const archRef = useRef<HTMLDivElement | null>(null);

  const scrollToArch = () => {
    archRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="command-center-page" className="relative min-h-screen">
      
      {/* HERO SECTION WITH INTERACTIVE PIONEER STAR CANVAS */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden">
        
        {/* Star Canvas */}
        <StarCanvas />

        {/* Ambient Radial Gradient Overlays */}
        <div className="absolute inset-0 cosmic-radial-glow pointer-events-none -z-10" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-700/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 pointer-events-auto">
          
          {/* Sleek Pioneer Star Badge with Official Logo */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3 w-fit mx-auto"
          >
            <div className="p-3 rounded-2xl bg-[#0A0D08]/90 border border-orange-600/30 backdrop-blur-md">
              <AyyuqLogo variant="icon" size="lg" />
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#141A10] border border-[#607345]/40 rounded-full text-[10px] font-mono font-bold text-[#829A5F] tracking-[0.25em] uppercase">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span>AL-AYYUQ • THE PIONEER STAR</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold font-heading tracking-tighter leading-[0.95] text-[#D8E8C5]"
          >
            Ayyuq — <br className="hidden sm:inline" />
            <span className="text-orange-500">
              Built for the Next.
            </span>
          </motion.h1>

          {/* Subheadline with Simple, Clear Words */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#B6CE95] text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            We build fast, modern websites, mobile apps, and custom software that help your business grow smoothly with clean, reliable code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              id="hero-launch-scope-cta-btn"
              onClick={() => onNavigate('launch-pad')}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-black px-8 py-4 uppercase tracking-wider text-xs transition-all shadow-lg shadow-orange-950/40 flex items-center justify-center gap-3 cursor-pointer rounded-xl"
            >
              <span>Calculate Price & Time</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-view-arch-cta-btn"
              onClick={scrollToArch}
              className="w-full sm:w-auto bg-[#141A10] border border-[#607345]/40 hover:bg-[#1A2215] text-[#D8E8C5] font-bold px-8 py-4 uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 rounded-xl"
            >
              <Cpu className="w-4 h-4 text-[#829A5F]" />
              <span>How We Build</span>
            </button>
          </motion.div>

          {/* Quick interactive hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-6 flex items-center justify-center gap-2 text-xs font-mono text-[#9BB17B]"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Interactive Sky Active • Drag your mouse to interact with stars</span>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#829A5F] opacity-75 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold">DISCOVER</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-orange-500" />
        </div>

      </section>

      {/* METRICS & HIGH-TICKET STATS TICKER */}
      <section className="relative border-y border-[#607345]/20 bg-[#0A0D08]/90 py-8 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="font-heading font-bold text-2xl sm:text-3xl text-[#D8E8C5] tracking-tighter">
              99.99<span className="text-orange-500">%</span>
            </div>
            <div className="text-[10px] font-mono text-[#829A5F] uppercase tracking-widest font-bold">Always Online & Reliable</div>
          </div>
          <div className="space-y-1">
            <div className="font-heading font-bold text-2xl sm:text-3xl text-[#D8E8C5] tracking-tighter">
              Instant<span className="text-orange-500"> Speed</span>
            </div>
            <div className="text-[10px] font-mono text-[#829A5F] uppercase tracking-widest font-bold">Fast Page Loading</div>
          </div>
          <div className="space-y-1">
            <div className="font-heading font-bold text-2xl sm:text-3xl text-[#D8E8C5] tracking-tighter">
              10<span className="text-orange-500">x</span>
            </div>
            <div className="text-[10px] font-mono text-[#829A5F] uppercase tracking-widest font-bold">Faster User Experience</div>
          </div>
          <div className="space-y-1">
            <div className="font-heading font-bold text-2xl sm:text-3xl text-orange-500 tracking-tighter">
              100% Clean
            </div>
            <div className="text-[10px] font-mono text-[#829A5F] uppercase tracking-widest font-bold">Bug-Free Code Quality</div>
          </div>
        </div>
      </section>

      {/* ORIGIN NARRATIVE SECTION */}
      <OriginNarrative onNavigate={onNavigate} />

      {/* INTERACTIVE SYSTEM ARCHITECTURE TOGGLE */}
      <section ref={archRef} className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#607345]/20 bg-[#0A0D08]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Architecture Toggle */}
          <ArchitectureToggle onEstimateClick={() => onNavigate('launch-pad')} />

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (GLASS-MORPHISM) */}
      <CommandCenterFAQ onNavigate={onNavigate} />

    </div>
  );
}
