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
  Menu, 
  X, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY < 60;
      setIsAtTop(atTop);
      if (!atTop && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Live Indian Standard Time (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIstTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'command-center', label: 'Home', icon: Sparkles },
    { id: 'systems', label: 'Services', icon: Cpu },
    { id: 'orbit', label: 'Our Work', icon: Briefcase },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'launch-pad', label: 'Price Estimator', icon: Calculator },
    { id: 'transmission', label: 'Contact Us', icon: Mail },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isAtTop
          ? 'translate-y-0 opacity-100 pointer-events-auto py-4 bg-[#0A0D08]/95 backdrop-blur-lg border-b-2 border-[#607345]/40 shadow-xl shadow-black/80'
          : '-translate-y-full opacity-0 pointer-events-none py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('command-center')}
            className="flex items-center group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded-xl p-1 cursor-pointer transition-transform hover:scale-[1.03]"
          >
            <AyyuqLogo variant="lockup" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-7 lg:gap-9 text-[13px] uppercase tracking-[0.16em] font-bold text-[#B6CE95]">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'text-orange-400 font-extrabold border-b-[3px] border-orange-500 pb-1'
                      : 'text-[#B6CE95] hover:text-orange-400 font-bold'
                  }`}
                >
                  <span className="font-heading">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions with Indian Time */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141A10] border border-[#607345]/50 text-[#D8E8C5] text-xs font-mono font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#829A5F] animate-pulse" />
              <span className="text-orange-400 font-black">IST:</span>
              <span>{istTime || '10:00:00 AM'}</span>
            </div>

            <button
              id="header-scope-cta-btn"
              onClick={() => handleNavClick('launch-pad')}
              className="px-5 py-2.5 border-2 border-orange-500 bg-orange-600/20 text-orange-400 text-xs uppercase tracking-wider font-black hover:bg-orange-500 hover:text-[#0A0D08] cursor-pointer transition-all rounded-xl flex items-center gap-2 shadow-lg shadow-orange-950/40"
            >
              <span>Get Estimate</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              id="header-mobile-scope-btn"
              onClick={() => handleNavClick('launch-pad')}
              className="px-3.5 py-2 border-2 border-orange-500 bg-orange-600/20 text-orange-400 text-xs uppercase tracking-wider font-black hover:bg-orange-500 hover:text-[#0A0D08] rounded-xl"
            >
              Estimate
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#141A10] border border-[#607345]/40 text-[#D8E8C5] hover:text-orange-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#0A0D08]/98 backdrop-blur-2xl border-2 border-[#607345]/40 shadow-2xl shadow-black space-y-3"
          >
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#141A10] border border-[#607345]/40 text-xs font-mono font-bold text-[#D8E8C5]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#829A5F]" />
                India (IST, UTC+5:30)
              </span>
              <span className="text-orange-400 font-black">{istTime}</span>
            </div>

            <div className="pt-1 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-orange-600 text-[#0A0D08] font-black border border-orange-500 shadow-md shadow-orange-950/50'
                        : 'text-[#D8E8C5] hover:bg-[#607345]/20 hover:text-orange-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 stroke-[2.5] ${isActive ? 'text-[#0A0D08]' : 'text-orange-500'}`} />
                      <span className="font-heading tracking-wide uppercase text-xs">{item.label}</span>
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#0A0D08]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#607345]/30">
              <button
                id="mobile-nav-briefing-btn"
                onClick={() => handleNavClick('transmission')}
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/60"
              >
                <Mail className="w-4 h-4 stroke-[2.5]" />
                <span>Contact Us Directly</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
