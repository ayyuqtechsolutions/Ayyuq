import { useState } from 'react';
import { 
  Layers, 
  Database, 
  Cloud, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Check, 
  Terminal 
} from 'lucide-react';
import { motion } from 'motion/react';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend-db' | 'mobile-cloud' | 'security';
  description: string;
  badge: string;
  rating: string;
}

const techItems: TechItem[] = [
  // Frontend
  { name: 'Next.js & React', category: 'frontend', description: 'Fast modern web framework with smooth page transitions', badge: 'Instant Loading', rating: 'Top Tier' },
  { name: 'TypeScript', category: 'frontend', description: 'Clean, strongly typed code that prevents unexpected errors', badge: 'Bug Prevention', rating: 'Top Tier' },
  { name: 'Tailwind CSS', category: 'frontend', description: 'Modern styling system for clean, responsive interfaces', badge: 'Responsive UI', rating: 'Top Tier' },
  { name: 'Framer Motion', category: 'frontend', description: 'Smooth, natural animations and seamless transitions', badge: 'Silky Smooth', rating: 'Top Tier' },
  { name: 'Modern UI Components', category: 'frontend', description: 'Accessible and beautiful design system tailored for your brand', badge: 'Clean Design', rating: 'Top Tier' },

  // Backend & DB
  { name: 'Node.js & Python', category: 'backend-db', description: 'Fast and reliable backend services for your business logic', badge: 'High Capacity', rating: 'Top Tier' },
  { name: 'PostgreSQL Database', category: 'backend-db', description: 'Safe, battle-tested database storing all business records', badge: 'Safe & Reliable', rating: 'Top Tier' },
  { name: 'Redis Fast Cache', category: 'backend-db', description: 'Lightning-fast memory storage for immediate data loading', badge: 'Fast Data', rating: 'Top Tier' },
  { name: 'REST & GraphQL APIs', category: 'backend-db', description: 'Standardized APIs connecting web, mobile, and third-party tools', badge: 'Easy Integration', rating: 'Top Tier' },
  { name: 'Automated Backups', category: 'backend-db', description: 'Daily automatic database copies to ensure zero data loss', badge: 'Zero Data Loss', rating: 'Top Tier' },

  // Mobile & Cloud
  { name: 'React Native & Expo', category: 'mobile-cloud', description: 'Native apps for both iPhone and Android from a single codebase', badge: 'iOS & Android', rating: 'Top Tier' },
  { name: 'AWS & Cloud Hosting', category: 'mobile-cloud', description: 'Secure cloud hosting with 99.99% uptime guarantee', badge: 'Always Online', rating: 'Top Tier' },
  { name: 'Docker Containers', category: 'mobile-cloud', description: 'Isolated software containers for reliable, crash-free deployments', badge: 'Crash-Proof', rating: 'Top Tier' },
  { name: 'Global CDN Delivery', category: 'mobile-cloud', description: 'Fast content delivery across India and worldwide locations', badge: 'India & Global', rating: 'Top Tier' },
  { name: 'Cloudflare Security', category: 'mobile-cloud', description: 'Protection against malicious attacks and fake bot traffic', badge: 'Bot Protection', rating: 'Top Tier' },

  // Security
  { name: 'User Roles & Logins', category: 'security', description: 'Secure passwords, OTP logins, and admin vs staff access permissions', badge: 'Safe Access', rating: 'Top Tier' },
  { name: 'Encrypted Connections (SSL)', category: 'security', description: 'High-grade 256-bit encryption for all payments and user details', badge: '256-bit SSL', rating: 'Top Tier' },
  { name: 'Automated Code Scans', category: 'security', description: 'Automated testing and vulnerability scans before every release', badge: 'Pre-Tested', rating: 'Top Tier' },
];

export default function TechStackMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend-db' | 'mobile-cloud' | 'security'>('all');

  const filteredItems = selectedCategory === 'all' 
    ? techItems 
    : techItems.filter(item => item.category === selectedCategory);

  return (
    <div id="tech-stack-matrix-section" className="space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#607345]/20 pb-4">
        <div>
          <span className="text-xs font-mono text-orange-400 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-orange-500" />
            ENGINEERING SPECIFICATION
          </span>
          <h3 className="text-2xl font-heading font-bold text-[#D8E8C5] mt-1">
            Production-Tested Tech Matrix
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#0A0D08] border border-[#607345]/30 text-xs">
          {[
            { id: 'all', label: 'All Stacks' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend-db', label: 'Backend & DB' },
            { id: 'mobile-cloud', label: 'Mobile & Cloud' },
            { id: 'security', label: 'Security' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg font-heading font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-[#0A0D08] font-black shadow-md shadow-orange-950/40'
                  : 'text-[#829A5F] hover:text-[#FF7A1A] hover:bg-[#141A10]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tech Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: idx * 0.02 }}
            className="p-4 rounded-xl bg-[#0A0D08]/90 border border-[#607345]/25 hover:border-orange-500/50 hover:bg-[#141A10] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-[#D8E8C5] group-hover:text-orange-400 transition-colors">
                {item.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-600/15 text-orange-400 border border-orange-600/30 font-mono">
                {item.badge}
              </span>
            </div>

            <p className="text-xs text-[#9BB17B] leading-relaxed">
              {item.description}
            </p>

            <div className="pt-2 border-t border-[#607345]/20 flex items-center justify-between text-[10px] font-mono text-[#607345]">
              <span className="uppercase text-[#829A5F]">{item.category.replace('-', ' ')}</span>
              <span className="text-[#829A5F] font-semibold flex items-center gap-1">
                <Check className="w-3 h-3 text-[#829A5F]" />
                {item.rating} Production Grade
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
