import { useState, useEffect } from 'react';
import { PageId } from '../../types';
import AyyuqLogo from './AyyuqLogo';
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Clock, 
  Phone, 
  Instagram, 
  MessageCircle, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="main-footer" className="relative border-t border-[#607345]/20 bg-[#070A05] overflow-hidden">
      {/* Global Launch Pad Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-[#0F140D] p-8 sm:p-12 border border-orange-600/30 shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>START YOUR PROJECT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#D8E8C5] tracking-tight">
                Build fast, modern websites & custom software with us.
              </h2>
              <p className="text-sm sm:text-base text-[#9BB17B]">
                Get an immediate price estimate in Indian Rupees (₹) and project timeline in under 60 seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              <button
                id="footer-launch-estimator-btn"
                onClick={() => {
                  onNavigate('launch-pad');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-orange-950/50 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Price Estimator (₹ INR)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="footer-direct-transmission-btn"
                onClick={() => {
                  onNavigate('transmission');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#141A10] hover:bg-[#1C2516] text-[#D8E8C5] hover:text-orange-400 font-heading font-semibold text-sm border border-[#607345]/40 transition-all text-center cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mt-16 pt-12 border-t border-[#607345]/20">
          
          {/* Col 1: Brand & Origin (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => {
                onNavigate('command-center');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer"
            >
              <AyyuqLogo variant="lockup" size="lg" />
            </button>
            <p className="text-xs sm:text-sm text-[#9BB17B] leading-relaxed max-w-sm">
              Derived from <span className="text-orange-400 font-medium">Al-Ayyuq</span>—the pioneer guide star. We build high-speed websites, mobile apps, and custom business management software designed for long-term growth.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#829A5F] pt-1">
              <span className="w-2 h-2 rounded-full bg-[#829A5F]" />
              <span className="text-[#829A5F] font-semibold">Available for New Projects</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-semibold text-xs tracking-wider text-[#D8E8C5] uppercase font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#829A5F]">
              <li>
                <button
                  onClick={() => {
                    onNavigate('command-center');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('systems');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('orbit');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Our Work & Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('team');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Team & Founder
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('launch-pad');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Price Estimator (INR ₹)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('transmission');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-semibold text-xs tracking-wider text-[#D8E8C5] uppercase font-mono">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#829A5F]">
              <a
                href="mailto:ayyuqtechsolutions@gmail.com"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors font-medium break-all"
              >
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>ayyuqtechsolutions@gmail.com</span>
              </a>

              <a
                href="tel:+919867069971"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 9867069971</span>
              </a>

              <a
                href="https://www.instagram.com/ayyuqtechsolutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors font-medium"
              >
                <Instagram className="w-4 h-4 text-orange-500 shrink-0" />
                <span>@ayyuqtechsolutions</span>
              </a>

              <div className="pt-1">
                <a
                  href="https://wa.me/919867069971?text=Hi%20Ayyuq%20Tech%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs uppercase tracking-wider shadow-md shadow-orange-950/40 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Google Map (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-semibold text-xs tracking-wider text-[#D8E8C5] uppercase font-mono flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Base Location</span>
              </h4>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Anand+Koliwada+Mumbra+400612"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
              >
                <span>View Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-2 rounded-2xl bg-[#0A0D08] border border-[#607345]/30 space-y-2">
              <div className="overflow-hidden rounded-xl border border-[#607345]/20 h-32 relative">
                <iframe
                  title="Ayyuq Tech Solutions Location - Anand Koliwada Mumbra"
                  src="https://maps.google.com/maps?q=Anand%20Koliwada,%20Mumbra,%20Thane%20400612&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 filter brightness-90 contrast-105"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="px-1.5 py-1 text-left">
                <div className="text-xs font-semibold text-[#D8E8C5] flex items-center gap-1.5">
                  <span>Anand Koliwada, Mumbra</span>
                </div>
                <div className="text-[11px] font-mono text-[#829A5F]">
                  Thane, Maharashtra - 400612
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sleek Interface Telemetry Bar */}
        <div className="mt-16 pt-8 border-t border-[#607345]/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div>
            <div className="text-[10px] text-[#607345] uppercase tracking-widest font-bold">LIVE TIME (IST)</div>
            <div className="text-xl font-bold font-mono tracking-tighter text-orange-400">{istTime || '10:00 AM'}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#607345] uppercase tracking-widest font-bold">CURRENCY</div>
            <div className="text-xl font-bold font-mono tracking-tighter text-[#D8E8C5]">₹ <span className="text-orange-500">INR</span></div>
          </div>
          <div className="flex items-center gap-2 text-[#829A5F]">
            <span className="w-2 h-2 bg-[#829A5F] rounded-full" />
            <span className="text-[10px] uppercase tracking-widest font-bold">ALL SYSTEMS HEALTHY</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#607345]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#607345]">
          <p>© {currentYear} AYYUQ TECH SOLUTIONS. BUILT FOR THE NEXT.</p>
          <div className="flex items-center gap-4 text-[#607345]">
            <span className="hover:text-[#D8E8C5] cursor-pointer">100% Code Ownership</span>
            <span>•</span>
            <span className="hover:text-[#D8E8C5] cursor-pointer">Safe & Encrypted</span>
            <span>•</span>
            <span className="hover:text-[#D8E8C5] cursor-pointer">Direct Founder Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
