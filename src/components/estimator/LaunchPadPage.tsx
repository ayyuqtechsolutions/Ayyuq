import { PageId } from '../../types';
import ScopeEstimator from './ScopeEstimator';
import { 
  Calculator
} from 'lucide-react';
import { motion } from 'motion/react';

interface LaunchPadPageProps {
  onNavigate?: (page: PageId) => void;
  selectedSystemType?: string;
}

export default function LaunchPadPage({ selectedSystemType }: LaunchPadPageProps) {
  return (
    <div id="launch-pad-page" className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* PAGE HEADER */}
        <section className="text-center max-w-4xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs sm:text-sm font-mono tracking-wider font-semibold"
          >
            <Calculator className="w-4 h-4 text-orange-500" />
            <span>INSTANT PROJECT COST ESTIMATOR</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#D8E8C5] tracking-tight leading-tight"
          >
            Calculate Project Cost & <br />
            <span className="text-orange-500 font-black">
              Delivery Timeline.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#9BB17B] max-w-2xl mx-auto leading-relaxed"
          >
            Select your project features, scale, and requirements below to get an instant, transparent price estimate in ₹ INR.
          </motion.p>
        </section>

        {/* INTERACTIVE SCOPE ESTIMATOR */}
        <section className="space-y-6">
          <ScopeEstimator
            initialSystemType={selectedSystemType}
          />
        </section>

      </div>
    </div>
  );
}
