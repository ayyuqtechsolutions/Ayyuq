import React, { useState } from 'react';
import { PageId } from '../../types';
import AyyuqLogo from '../ui/AyyuqLogo';
import founderPhoto from '../../assets/images/me.jpeg';
import { 
  Sparkles, 
  Code2, 
  Zap, 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle, 
  Linkedin, 
  Instagram, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Copy, 
  Check, 
  ExternalLink,
  Terminal,
  Compass,
  Star,
  Clock, 
  X,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  sanitizeInput, 
  containsMaliciousPayload, 
  checkRateLimit, 
  isHoneypotTriggered 
} from '../../utils/security';

interface TeamPageProps {
  onNavigate?: (page: PageId) => void;
}

export default function TeamPage({ onNavigate }: TeamPageProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phoneOrEmail: '',
    projectScope: 'Website / Web App',
    briefMessage: '',
  });
  const [honeypotCode, setHoneypotCode] = useState('');
  const [bookingSecurityError, setBookingSecurityError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('tinwala075@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleBookCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSecurityError(null);

    // 1. Honeypot check for bots/scrapers
    if (isHoneypotTriggered(honeypotCode)) {
      setStrategyModalOpen(false);
      return;
    }

    // 2. Anti-Brute-Force & Rate Limiting (max 3 submissions / min)
    const rateCheck = checkRateLimit('strategy-call-booking', 3, 60000, 60000);
    if (!rateCheck.allowed) {
      setBookingSecurityError(rateCheck.errorMessage || 'Too many booking attempts. Please wait.');
      return;
    }

    // 3. Malicious Script & XSS / SQL Injection Check
    const rawInputs = [bookingFormData.name, bookingFormData.phoneOrEmail, bookingFormData.briefMessage];
    if (rawInputs.some((val) => containsMaliciousPayload(val))) {
      setBookingSecurityError('Security Warning: Script injection or malicious payload detected and blocked.');
      return;
    }

    // 4. Sanitize inputs
    const cleanName = sanitizeInput(bookingFormData.name, 100);
    const cleanContact = sanitizeInput(bookingFormData.phoneOrEmail, 100);
    const cleanScope = sanitizeInput(bookingFormData.projectScope, 100);
    const cleanBrief = sanitizeInput(bookingFormData.briefMessage, 1000);

    if (!cleanName || !cleanContact) {
      setBookingSecurityError('Please provide your name and contact details.');
      return;
    }

    setIsSubmitting(true);
    const message = `Hi Hussain! I would like to book a 1-on-1 strategy call with you.%0A%0A*Name:* ${encodeURIComponent(cleanName)}%0A*Contact:* ${encodeURIComponent(cleanContact)}%0A*Project Type:* ${encodeURIComponent(cleanScope)}%0A*Brief:* ${encodeURIComponent(cleanBrief || 'Strategy session discussion')}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStrategyModalOpen(false);
      window.open(`https://wa.me/919867069971?text=${message}`, '_blank');
    }, 600);
  };

  return (
    <div id="team-founder-page" className="relative pt-24 sm:pt-28 pb-20 overflow-hidden">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-[#607345]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Breadcrumb / Section Header Indicator */}
        <div className="flex items-center justify-between border-b border-[#607345]/30 pb-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A10] border border-[#607345]/50 text-[#829A5F] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>LEADERSHIP & ENGINEERING COMMAND</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#829A5F]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#D8E8C5] font-semibold">DIRECT FOUNDER AVAILABILITY</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: THE HERO SECTION (PERSONAL & AUTHORITATIVE)                     */}
        {/* ========================================================================= */}
        <section id="founder-hero-section" className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: High-Resolution Photo with Sleek Frame */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group">
                
                {/* Glow Backdrop */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-orange-600/40 via-amber-500/20 to-[#607345]/40 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
                
                {/* Image Container Card */}
                <div className="relative rounded-3xl overflow-hidden bg-[#0A0D08] border-2 border-orange-500/40 shadow-2xl">
                  
                  {/* Photo with responsive aspect ratio */}
                  <div className="aspect-square sm:aspect-[4/5] lg:aspect-square w-full overflow-hidden bg-[#0E130B] relative">
                    <img 
                      src={founderPhoto} 
                      alt="Hussain Tinwala - Founder & Lead Software Engineer at Ayyuq Tech Solutions"
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for subtle text contrast at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A05] via-transparent to-transparent opacity-80" />

                    {/* In-Image Corner Brand Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0D08]/90 backdrop-blur-md border border-[#607345]/50 text-xs font-mono font-bold text-[#D8E8C5] shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <span>FOUNDER & ARCHITECT</span>
                    </div>

                    {/* Location Badge bottom-right */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A0D08]/90 backdrop-blur-md border border-[#607345]/50 text-xs font-mono text-[#D8E8C5]">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      <span>Thane / Mumbai, IN</span>
                    </div>
                  </div>

                  {/* Photo Footer Bar with Technical Signature */}
                  <div className="p-4 sm:p-5 bg-[#0F140D] border-t border-[#607345]/40 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-heading font-black text-[#D8E8C5] tracking-tight">Hussain Tinwala</div>
                      <div className="text-[11px] font-mono text-orange-400 font-semibold">Founder & Lead Software Engineer</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a 
                        href="https://www.linkedin.com/company/ayyuqtechsolutions" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="LinkedIn"
                        className="p-2 rounded-xl bg-[#141A10] border border-[#607345]/50 text-[#D8E8C5] hover:text-orange-400 hover:border-orange-500 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://www.instagram.com/ayyuqtechsolutions" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="Instagram"
                        className="p-2 rounded-xl bg-[#141A10] border border-[#607345]/50 text-[#D8E8C5] hover:text-orange-400 hover:border-orange-500 transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Right Column: Hero Information, Headline & Badges */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              
              {/* Category Eyebrow / Indicator */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-orange-600/15 border border-orange-500/40 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-orange-500" />
                <span>Executive Profile</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-[#D8E8C5] tracking-tight leading-[1.1]">
                Meet the founder
              </h1>

              {/* Exact Requested Name & Role */}
              <div className="p-4 rounded-2xl bg-[#0F140D] border-l-4 border-l-orange-500 border border-[#607345]/40 space-y-1">
                <div className="text-xl sm:text-2xl font-heading font-extrabold text-[#D8E8C5] tracking-tight">
                  Hussain Tinwala
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-orange-400 flex items-center gap-2">
                  <span>Founder & Lead Software Engineer</span>
                </div>
              </div>

              {/* Short Bio Statement */}
              <p className="text-base sm:text-lg text-[#B6CE95] leading-relaxed font-sans">
                I am a full-stack engineer and software architect dedicated to eliminating bloated, sluggish software. Every system engineered at <strong className="text-orange-400 font-bold">Ayyuq Tech Solutions</strong> is custom-coded from the ground up for maximum speed, bulletproof security, and intuitive business operation.
              </p>

              {/* Quick Stats/Badges Required by User */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Badge 1: 100% Custom Code Guarantee */}
                <div className="p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/40 hover:border-orange-500/50 transition-colors space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                    <Code2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">Standard</div>
                    <div className="text-sm font-heading font-extrabold text-[#D8E8C5] leading-snug">
                      100% Custom Code Guarantee
                    </div>
                  </div>
                  <p className="text-[11px] text-[#829A5F] leading-tight">
                    Zero sluggish templates or fragile site builders. Pure bespoke code.
                  </p>
                </div>

                {/* Badge 2: Zero-Lag Architecture Specialist */}
                <div className="p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/40 hover:border-orange-500/50 transition-colors space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                    <Zap className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">Performance</div>
                    <div className="text-sm font-heading font-extrabold text-[#D8E8C5] leading-snug">
                      Zero-Lag Architecture Specialist
                    </div>
                  </div>
                  <p className="text-[11px] text-[#829A5F] leading-tight">
                    Sub-second response times, optimal caching, and smooth 60fps UX.
                  </p>
                </div>

                {/* Badge 3: Based in Mumbai / Thane, India */}
                <div className="p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/40 hover:border-orange-500/50 transition-colors space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                    <MapPin className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">HQ Base</div>
                    <div className="text-sm font-heading font-extrabold text-[#D8E8C5] leading-snug">
                      Based in Mumbai / Thane, India
                    </div>
                  </div>
                  <p className="text-[11px] text-[#829A5F] leading-tight">
                    IST timezone convenience with global deployment standards.
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <button
                  id="hero-book-call-btn"
                  onClick={() => setStrategyModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-950/60 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Calendar className="w-4 h-4 stroke-[2.5]" />
                  <span>Book a 1-on-1 Strategy Call</span>
                </button>

                <a
                  href="https://wa.me/919867069971?text=Hi%20Hussain%2C%20I%20came%20across%20Ayyuq%20Tech%20Solutions%20and%20would%20love%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-[#141A10] hover:bg-[#1A2215] text-[#D8E8C5] hover:text-orange-400 font-heading font-bold text-xs uppercase tracking-wider border border-[#607345]/50 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: +91 9867069971</span>
                </a>
              </div>

            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* SECTION 2: THE ORIGIN STORY: HOW "AYYUQ" WAS BORN                          */}
        {/* ========================================================================= */}
        <section id="ayyuq-origin-story-section" className="mb-20 sm:mb-28 pt-12 border-t border-[#607345]/30">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A10] border border-orange-500/40 text-orange-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5 text-orange-500" />
              <span>THE PHILOSOPHY BEHIND THE NAME</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#D8E8C5] tracking-tight">
              The Origin Story: How &ldquo;Ayyuq&rdquo; Was Born
            </h2>

            <p className="text-base sm:text-lg text-[#9BB17B]">
              A brand built on ancient astronomical navigation and relentless engineering clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* The Astronomical Inspiration (6 cols) */}
            <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-[#0A0D08] border-2 border-[#607345]/40 hover:border-orange-500/40 transition-all shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Star className="w-6 h-6 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-bold">
                    Celestial Heritage
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#D8E8C5] tracking-tight">
                    The Astronomical Inspiration
                  </h3>
                </div>

                <p className="text-base text-[#D8E8C5] leading-relaxed font-sans">
                  In classical Arabic celestial navigation, <strong className="text-orange-400 font-extrabold">Al-Ayyuq</strong> (astronomically known as Capella in the constellation Auriga) holds historic significance as the <em className="text-orange-300 font-semibold not-italic">&ldquo;Pioneer Guide Star.&rdquo;</em>
                </p>

                <p className="text-sm text-[#9BB17B] leading-relaxed">
                  When ancient explorers, navigators, and caravans crossed featureless, pitch-black deserts and turbulent open seas, Al-Ayyuq was the first luminous beacon to rise above the horizon. It provided the singular, unwavering point of orientation that travelers trusted with their survival.
                </p>
              </div>

              {/* Star Card Metric Footer */}
              <div className="p-4 rounded-2xl bg-[#0F140D] border border-[#607345]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AyyuqLogo variant="icon" size="sm" />
                  <div className="text-xs font-mono text-[#D8E8C5] font-bold">Al-Ayyuq • The Guiding Beacon</div>
                </div>
                <div className="text-xs font-mono text-orange-400 font-bold">Magnitude 0.08</div>
              </div>
            </div>

            {/* The Business Mission (6 cols) */}
            <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-[#0F140D] border-2 border-orange-500/40 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              
              {/* Subtle watermarked logo in backdrop */}
              <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                <AyyuqLogo variant="icon" size="lg" />
              </div>

              <div className="space-y-5 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-orange-600/30 border border-orange-500/60 flex items-center justify-center text-orange-400">
                  <Sparkles className="w-6 h-6 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-bold">
                    Software Philosophy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#D8E8C5] tracking-tight">
                    The Business Mission
                  </h3>
                </div>

                {/* Exact User Requested Mission Statement in Blockquote */}
                <div className="p-6 rounded-2xl bg-[#0A0D08] border-l-4 border-l-orange-500 border border-[#607345]/30">
                  <p className="text-base sm:text-lg font-heading font-bold text-[#D8E8C5] italic leading-relaxed">
                    &ldquo;Instead of bloated development, slow loading times, and messy agency handoffs, I founded Ayyuq Tech Solutions to be the guiding star for businesses—delivering clean, fast, and bulletproof software that works smoothly from Day 1.&rdquo;
                  </p>
                  <div className="mt-3 text-right text-xs font-mono text-orange-400 font-bold">
                    — Hussain Tinwala, Founder
                  </div>
                </div>

                <p className="text-sm text-[#9BB17B] leading-relaxed">
                  Too many business owners are burned by agencies that outsource to interns, deploy spaghetti code, and disappear when maintenance is needed. At Ayyuq, we stand for single-point engineering accountability, direct collaboration, and software that delivers measurable ROI.
                </p>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#607345]/30 text-center relative z-10">
                <div className="p-2.5 rounded-xl bg-[#141A10] border border-[#607345]/40">
                  <div className="text-xs font-mono font-black text-orange-400">01</div>
                  <div className="text-[11px] font-heading font-bold text-[#D8E8C5]">Clean Code</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#141A10] border border-[#607345]/40">
                  <div className="text-xs font-mono font-black text-orange-400">02</div>
                  <div className="text-[11px] font-heading font-bold text-[#D8E8C5]">High Speed</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#141A10] border border-[#607345]/40">
                  <div className="text-xs font-mono font-black text-orange-400">03</div>
                  <div className="text-[11px] font-heading font-bold text-[#D8E8C5]">Bulletproof</div>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ========================================================================= */}
        {/* SECTION 3: FOUNDER DIRECT CONTACT CARD (HIGH-CONVERSION CTA)               */}
        {/* ========================================================================= */}
        <section id="founder-direct-contact-card" className="pt-8">
          
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-b from-[#0F140D] to-[#070A05] border-2 border-orange-500/50 shadow-2xl overflow-hidden">
            
            {/* Top Accent Light Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Direct Outreach Info & Value Prop */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A10] border border-orange-500/40 text-orange-400 text-xs font-mono font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>DIRECT LINE TO THE FOUNDER</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#D8E8C5] tracking-tight leading-tight">
                  Have an ambitious project? Let&rsquo;s engineer it right.
                </h2>

                <p className="text-base text-[#B6CE95] leading-relaxed max-w-xl">
                  Skip the agency account managers, sales reps, and endless meetings. Connect with me directly to review your system requirements, get transparent pricing, and chart out your launch.
                </p>

                {/* Direct Channels Contact List */}
                <div className="space-y-3.5 pt-2">
                  
                  {/* Direct Email with One-Click Copy */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/50 hover:border-orange-500/50 transition-colors gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
                        <Mail className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-[#829A5F] uppercase font-semibold">Direct Email</div>
                        <a 
                          href="mailto:tinwala075@gmail.com" 
                          className="text-sm sm:text-base font-heading font-extrabold text-[#D8E8C5] hover:text-orange-400 transition-colors"
                        >
                          tinwala075@gmail.com
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyEmail}
                      className="px-3.5 py-2 rounded-xl bg-[#141A10] hover:bg-[#1C2516] border border-[#607345]/40 text-xs font-mono font-bold text-[#D8E8C5] hover:text-orange-400 flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct Phone / WhatsApp */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/50 hover:border-orange-500/50 transition-colors gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                        <Phone className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-[#829A5F] uppercase font-semibold">Direct Phone / WhatsApp</div>
                        <a 
                          href="tel:+919867069971" 
                          className="text-sm sm:text-base font-heading font-extrabold text-[#D8E8C5] hover:text-orange-400 transition-colors"
                        >
                          +91 9867069971
                        </a>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/919867069971?text=Hi%20Hussain%2C%20I%20would%20like%20to%20discuss%20a%20software%20project%20with%20Ayyuq."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#0A0D08] text-xs font-heading font-black uppercase tracking-wider flex items-center gap-2 shadow-md shadow-emerald-950/40 transition-all self-start sm:self-auto"
                    >
                      <MessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  {/* Social Links Bar */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs font-mono text-[#829A5F] font-semibold uppercase">
                      Official Founder Channels
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://www.linkedin.com/company/ayyuqtechsolutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141A10] border border-[#607345]/40 text-xs font-heading font-bold text-[#D8E8C5] hover:text-orange-400 hover:border-orange-500 transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-orange-400" />
                        <span>LinkedIn Profile</span>
                        <ExternalLink className="w-3 h-3 text-[#829A5F]" />
                      </a>

                      <a
                        href="https://www.instagram.com/ayyuqtechsolutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141A10] border border-[#607345]/40 text-xs font-heading font-bold text-[#D8E8C5] hover:text-orange-400 hover:border-orange-500 transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5 text-orange-400" />
                        <span>@ayyuqtechsolutions</span>
                        <ExternalLink className="w-3 h-3 text-[#829A5F]" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column: High-Conversion CTA Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl p-6 sm:p-8 bg-[#0A0D08] border-2 border-orange-500/50 shadow-2xl space-y-6 text-center">
                  
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-600/20 border-2 border-orange-500/50 flex items-center justify-center text-orange-400 shadow-lg shadow-orange-950/50">
                    <Calendar className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-black text-[#D8E8C5] tracking-tight">
                      Ready to build?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9BB17B]">
                      Book a dedicated 30-minute technical roadmap call. We will review your vision, architecture needs, and budget timeline.
                    </p>
                  </div>

                  {/* Guaranteed Benefits */}
                  <div className="text-left space-y-2.5 p-4 rounded-2xl bg-[#0F140D] border border-[#607345]/40 text-xs text-[#D8E8C5]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Zero sales pressure • Direct engineer insight</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Immediate INR (₹) or USD ($) estimate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>Technical feasibility & stack recommendation</span>
                    </div>
                  </div>

                  {/* High-Conversion Primary CTA Button */}
                  <button
                    id="founder-cta-booking-btn"
                    onClick={() => setStrategyModalOpen(true)}
                    className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-orange-950/70 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Book a 1-on-1 Strategy Call with Hussain</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div className="text-[11px] font-mono text-[#829A5F]">
                    Response time usually within 2 hours • IST Hours
                  </div>

                </div>
              </div>

            </div>

          </div>

        </section>

      </div>

      {/* Strategy Call Booking Modal */}
      <AnimatePresence>
        {strategyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStrategyModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0A0D08] border-2 border-orange-500/60 p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#607345]/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/40">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-black text-[#D8E8C5]">
                      1-on-1 Strategy Call
                    </h3>
                    <p className="text-xs font-mono text-orange-400">Direct with Hussain Tinwala</p>
                  </div>
                </div>

                <button
                  onClick={() => setStrategyModalOpen(false)}
                  className="p-2 rounded-xl bg-[#141A10] text-[#D8E8C5] hover:text-orange-400 border border-[#607345]/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Security Alert Banner */}
              {bookingSecurityError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-300">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{bookingSecurityError}</span>
                </div>
              )}

              <form onSubmit={handleBookCallSubmit} className="space-y-4">
                {/* Honeypot field for bot/scraper protection */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="team-security-hp">Leave this empty</label>
                  <input
                    id="team-security-hp"
                    type="text"
                    value={honeypotCode}
                    onChange={(e) => setHoneypotCode(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[#D8E8C5] mb-1.5 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={bookingFormData.name}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141A10] border border-[#607345]/50 text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#D8E8C5] mb-1.5 uppercase">
                    Your WhatsApp Number or Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210 or name@company.com"
                    value={bookingFormData.phoneOrEmail}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, phoneOrEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141A10] border border-[#607345]/50 text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#D8E8C5] mb-1.5 uppercase">
                    Project Type
                  </label>
                  <select
                    value={bookingFormData.projectScope}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, projectScope: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141A10] border border-[#607345]/50 text-[#D8E8C5] focus:outline-none focus:border-orange-500 text-sm font-sans"
                  >
                    <option value="Website / Web App">Custom Website / Web Application</option>
                    <option value="Mobile App (iOS / Android)">Mobile Application (iOS & Android)</option>
                    <option value="Custom ERP / CRM System">Custom ERP / CRM System</option>
                    <option value="E-Commerce / Inventory Platform">E-Commerce & Inventory Management</option>
                    <option value="Architecture Consultation">System Architecture & Code Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#D8E8C5] mb-1.5 uppercase">
                    Brief Requirements or Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell me a bit about what you are looking to build..."
                    value={bookingFormData.briefMessage}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, briefMessage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141A10] border border-[#607345]/50 text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 text-sm font-sans resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/60 transition-all cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Opening WhatsApp...' : 'Confirm & Chat Directly on WhatsApp'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center">
                  <a
                    href="mailto:tinwala075@gmail.com?subject=1-on-1%20Strategy%20Call%20Inquiry"
                    className="text-xs font-mono text-[#829A5F] hover:text-orange-400 transition-colors"
                  >
                    Prefer email? Click to send an email to tinwala075@gmail.com
                  </a>
                </div>
              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
