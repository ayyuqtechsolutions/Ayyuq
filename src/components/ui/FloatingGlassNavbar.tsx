import React, { useState, useEffect } from 'react';
import { PageId } from '../../types';
import AyyuqLogo from './AyyuqLogo';
import { 
  Sparkles, 
  Cpu, 
  Briefcase, 
  Users,
  Calculator, 
  Mail, 
  ArrowUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingGlassNavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export default function FloatingGlassNavbar({ currentPage, onNavigate }: FloatingGlassNavbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Appear as soon as user scrolls down past the top threshold (60px)
      if (window.scrollY > 60) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'command-center', label: 'Home', icon: Sparkles },
    { id: 'systems', label: 'Services', icon: Cpu },
    { id: 'orbit', label: 'Our Work', icon: Briefcase },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'launch-pad', label: 'Estimator', icon: Calculator },
    { id: 'transmission', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          id="floating-glass-navbar"
          aria-label="Quick navigation"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-4 sm:right-6 lg:right-8 z-40 flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-[#0A0D08]/95 backdrop-blur-2xl border-2 border-[#607345]/50 shadow-[0_16px_50px_rgba(0,0,0,0.95)] ring-1 ring-[#607345]/30"
        >
          {/* Quick Branding / Indicator Pill */}
          <button
            onClick={scrollToTop}
            title="Scroll to top"
            className="hidden sm:flex items-center gap-2 pl-2.5 pr-3 py-1.5 text-xs font-mono font-black text-orange-400 border-r-2 border-[#607345]/40 select-none hover:opacity-80 transition-opacity cursor-pointer"
          >
            <AyyuqLogo variant="icon" size="sm" />
            <span className="tracking-wider uppercase font-heading text-xs font-black text-[#D8E8C5]">Ayyuq</span>
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <div key={item.id} className="relative">
                  <button
                    id={`floating-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setHoveredTab(item.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    aria-label={item.label}
                    className={`relative p-2.5 sm:px-3.5 sm:py-2 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-orange-600 text-[#0A0D08] font-black shadow-md shadow-orange-950/60 border border-orange-500'
                        : 'text-[#D8E8C5] hover:text-orange-400 hover:bg-[#607345]/25 font-bold'
                    }`}
                  >
                    <Icon className={`w-4 h-4 stroke-[2.5] ${isActive ? 'text-[#0A0D08]' : 'text-orange-500'}`} />
                    <span className="text-xs font-heading hidden md:inline-block font-extrabold uppercase tracking-wide">
                      {item.label}
                    </span>
                  </button>

                  {/* Tooltip on hover for small screens where text is hidden */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="md:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-[#141A10] backdrop-blur-md border border-[#607345]/50 text-orange-400 text-xs font-heading font-extrabold whitespace-nowrap shadow-xl pointer-events-none z-50 uppercase tracking-wider"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Scroll to Top Divider & Button */}
          <div className="pl-1.5 border-l-2 border-[#607345]/40 flex items-center">
            <button
              id="floating-scroll-top-btn"
              onClick={scrollToTop}
              title="Back to Top"
              aria-label="Scroll back to top"
              className="p-2 sm:p-2 rounded-xl text-[#D8E8C5] hover:text-orange-400 hover:bg-[#607345]/25 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </motion.nav>
      )}
    </AnimatePresence>
  );
}
