import React, { useState } from 'react';
import { PageId } from '../../types';
import AyyuqLogo from '../ui/AyyuqLogo';
import { 
  Radio, 
  Mail, 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  Terminal,
  Copy,
  Check,
  Phone,
  Instagram,
  MessageCircle,
  ExternalLink,
  MapPin,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  sanitizeInput, 
  containsMaliciousPayload, 
  isValidEmail, 
  isValidPhone, 
  checkRateLimit, 
  isHoneypotTriggered 
} from '../../utils/security';

interface TransmissionPageProps {
  onNavigate: (page: PageId) => void;
}

export default function TransmissionPage({ onNavigate: _onNavigate }: TransmissionPageProps) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [requireNDA, setRequireNDA] = useState(false);
  
  // Security Honeypot & Anti-Bot Traps
  const [honeypotTrap, setHoneypotTrap] = useState('');
  const [securityError, setSecurityError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransmitted, setIsTransmitted] = useState(false);
  const [transmissionHash, setTransmissionHash] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);

    // 1. Anti-Bot Honeypot Defense: Scrapers auto-fill hidden input fields
    if (isHoneypotTriggered(honeypotTrap)) {
      // Silently spoof success to neutralize bot probing
      setIsTransmitted(true);
      return;
    }

    // 2. Anti-Brute-Force & Denial-of-Service (DoS) Rate Limiter
    const rateCheck = checkRateLimit('contact-transmission-form', 4, 60000, 60000);
    if (!rateCheck.allowed) {
      setSecurityError(rateCheck.errorMessage || 'Too many submissions. Please wait.');
      return;
    }

    // 3. Malicious Script & SQL Injection Protection (XSS / Injection Shield)
    const rawInputs = [fullName, workEmail, companyName, phone, projectBrief];
    if (rawInputs.some((val) => containsMaliciousPayload(val))) {
      setSecurityError('Security Warning: Potential script injection or malicious signature detected and blocked.');
      return;
    }

    // 4. Input Length & Format Validation (DoS / Buffer overflow protection)
    if (!isValidEmail(workEmail)) {
      setSecurityError('Please enter a valid business email address.');
      return;
    }
    if (phone && !isValidPhone(phone)) {
      setSecurityError('Please enter a valid phone or WhatsApp number.');
      return;
    }

    // 5. Sanitize all user inputs before processing
    const cleanName = sanitizeInput(fullName, 100);
    const cleanEmail = sanitizeInput(workEmail, 150);
    const cleanCompany = sanitizeInput(companyName, 120);
    const cleanPhone = sanitizeInput(phone, 30);
    const cleanBrief = sanitizeInput(projectBrief, 2500);

    if (!cleanName || !cleanEmail || !cleanCompany || !cleanBrief) {
      setSecurityError('All required fields must be filled with valid text.');
      return;
    }

    setIsSubmitting(true);
    const hash = `AYQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setTransmissionHash(hash);

    const emailSubject = `Project Inquiry [${hash}]: ${cleanName} - ${cleanCompany}`;
    const emailBody = `Hi Ayyuq Tech Solutions,

I am reaching out regarding a new project requirement:

• Reference ID: ${hash}
• Full Name: ${cleanName}
• Email: ${cleanEmail}
• Phone / WhatsApp: ${cleanPhone || 'Not provided'}
• Company / Organization: ${cleanCompany}
• Requires NDA: ${requireNDA ? 'Yes' : 'No'}

Project Requirements & Details:
${cleanBrief}

--------------------------------------------------
Sent from Ayyuq Tech Solutions Contact Portal`;

    // Attempt to copy clean brief to clipboard automatically for convenient user pasting
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(emailBody).catch(() => {});
    }

    // Direct invocation without exposing high-volume query params when possible
    const mailtoUrl = `mailto:ayyuqtechsolutions@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Safely dispatch via hidden anchor or window location
    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.click();
    } catch {
      window.location.href = mailtoUrl;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsTransmitted(true);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayyuqtechsolutions@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="transmission-page" className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* PAGE HEADER */}
        <section className="text-center max-w-4xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 w-fit mx-auto"
          >
            <div className="p-2.5 rounded-2xl bg-[#0A0D08] border border-orange-600/40 shadow-xl">
              <AyyuqLogo variant="icon" size="md" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs sm:text-sm font-mono tracking-wider font-semibold">
              <Radio className="w-4 h-4 text-orange-500" />
              <span>CONTACT US DIRECTLY</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#D8E8C5] tracking-tight leading-tight"
          >
            Start Your Project <br />
            <span className="text-orange-500 font-black">
              With Ayyuq.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#9BB17B] max-w-2xl mx-auto leading-relaxed"
          >
            Connect directly with us. We review every project requirement and reply within 24 hours in Indian Standard Time (IST).
          </motion.p>
        </section>

        {/* MAIN TRANSMISSION SECTION: FORM & DIRECT NODES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0F140D] border border-orange-600/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
              {isTransmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#141A10] border border-[#607345] flex items-center justify-center mx-auto text-[#829A5F]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#829A5F] uppercase tracking-widest block font-semibold">
                      INQUIRY PREPARED & DISPATCHED
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#D8E8C5]">
                      Thank You for Contacting Us
                    </h3>
                    <p className="text-sm text-[#B6CE95] max-w-md mx-auto">
                      Your inquiry details have been routed to <strong className="text-orange-400">ayyuqtechsolutions@gmail.com</strong>. We will review your brief and reply within 24 hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/30 font-mono text-xs text-left max-w-md mx-auto space-y-2">
                    <div className="flex items-center justify-between text-[#829A5F] border-b border-[#607345]/20 pb-2">
                      <span>Reference ID:</span>
                      <span className="text-orange-400 font-bold">{transmissionHash}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#829A5F]">
                      <span>Recipient:</span>
                      <span className="text-orange-400">ayyuqtechsolutions@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-between text-[#829A5F]">
                      <span>Client:</span>
                      <span className="text-[#D8E8C5]">{fullName} ({companyName})</span>
                    </div>
                    <div className="flex items-center justify-between text-[#829A5F]">
                      <span>Response Guarantee:</span>
                      <span className="text-[#829A5F] font-semibold">&lt; 24 Hours (IST)</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsTransmitted(false);
                        setProjectBrief('');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#141A10] border border-[#607345]/30 text-[#829A5F] hover:text-orange-400 text-xs font-mono cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                    <a
                      href={`https://wa.me/919867069971?text=${encodeURIComponent(`Hi Ayyuq Tech Solutions, I just submitted project inquiry [${transmissionHash}] for ${companyName}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] text-xs font-heading font-black uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Follow-up on WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Invisible Honeypot Anti-Bot Field (Hidden from real users, traps automated scrapers) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="transmission-website-hp">Leave this field blank</label>
                    <input
                      id="transmission-website-hp"
                      type="text"
                      name="website_verification_code"
                      value={honeypotTrap}
                      onChange={(e) => setHoneypotTrap(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Security Alert Banner */}
                  {securityError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-red-300 text-xs font-sans leading-relaxed"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <strong className="font-semibold block text-red-200">Security Gateway Defense:</strong>
                        <span>{securityError}</span>
                      </div>
                    </motion.div>
                  )}

                  <div className="border-b border-[#607345]/20 pb-4">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#D8E8C5]">
                      Tell Us About Your Project
                    </h3>
                    <p className="text-xs text-[#9BB17B] mt-1">
                      Your details will be delivered directly to our leadership team at ayyuqtechsolutions@gmail.com.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono text-[#D8E8C5] mb-1.5 font-semibold">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#607345] absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0A0D08] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
                        />
                      </div>
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-xs font-mono text-[#D8E8C5] mb-1.5 font-semibold">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#607345] absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="rahul@company.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0A0D08] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-mono text-[#D8E8C5] mb-1.5 font-semibold">
                        Company / Organization *
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-[#607345] absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Apex Retail Pvt Ltd"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0A0D08] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-mono text-[#D8E8C5] mb-1.5 font-semibold">
                        Phone / WhatsApp (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#607345] absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0A0D08] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Project Brief */}
                  <div>
                    <label className="block text-xs font-mono text-[#D8E8C5] mb-1.5 font-semibold">
                      Project Details & Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      placeholder="Tell us what you want to build (website, mobile app, desktop software, ERP/CRM, inventory system, SEO, support), key features needed, or timeline requirements..."
                      className="w-full p-3.5 rounded-xl bg-[#0A0D08] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans leading-relaxed"
                    />
                  </div>

                  {/* NDA Checkbox */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0A0D08] border border-[#607345]/20">
                    <input
                      type="checkbox"
                      id="nda-checkbox"
                      checked={requireNDA}
                      onChange={(e) => setRequireNDA(e.target.checked)}
                      className="w-4 h-4 rounded bg-[#0A0D08] border-[#607345] text-orange-500 focus:ring-orange-400 cursor-pointer"
                    />
                    <label htmlFor="nda-checkbox" className="text-xs text-[#B6CE95] cursor-pointer">
                      We require a Non-Disclosure Agreement (NDA) before sharing detailed company data.
                    </label>
                  </div>

                  {/* Action Button */}
                  <button
                    id="send-transmission-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-950/50 transition-all cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <span>Preparing Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] font-mono text-center text-[#829A5F]">
                    Inquiries are sent directly to <span className="text-orange-400">ayyuqtechsolutions@gmail.com</span>
                  </p>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Direct Contact Cards & Status */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channel Card */}
            <div className="rounded-3xl bg-[#0F140D] border border-orange-600/30 p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-[#607345]/20 pb-4">
                <span className="text-xs font-mono text-orange-400 uppercase tracking-widest font-semibold">
                  DIRECT CONTACT
                </span>
                <span className="text-[11px] font-mono text-[#829A5F] font-semibold">ONLINE</span>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-[#0A0D08] border border-orange-600/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#829A5F] uppercase font-bold">Direct Email:</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-xs font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#829A5F]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href="mailto:ayyuqtechsolutions@gmail.com"
                  className="font-heading font-bold text-sm sm:text-base text-[#D8E8C5] hover:text-orange-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>ayyuqtechsolutions@gmail.com</span>
                </a>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/30 space-y-1">
                <span className="text-[11px] font-mono text-[#829A5F] uppercase font-bold">Direct Phone:</span>
                <a
                  href="tel:+919867069971"
                  className="font-heading font-bold text-sm sm:text-base text-[#D8E8C5] hover:text-orange-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>+91 9867069971</span>
                </a>
              </div>

              {/* Base Location & Map Card */}
              <div className="p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#829A5F] uppercase font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Base Location:</span>
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Anand+Koliwada+Mumbra+400612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="font-heading font-semibold text-xs sm:text-sm text-[#D8E8C5]">
                  Anand Koliwada, Mumbra, Thane - 400612, Maharashtra, India
                </div>

                <div className="overflow-hidden rounded-xl border border-[#607345]/20 h-28 relative">
                  <iframe
                    title="Ayyuq Location - Anand Koliwada Mumbra"
                    src="https://maps.google.com/maps?q=Anand%20Koliwada,%20Mumbra,%20Thane%20400612&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    className="w-full h-full border-0 filter brightness-90 contrast-105"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Instagram Card */}
              <div className="p-4 rounded-2xl bg-[#0A0D08] border border-[#607345]/30 space-y-1">
                <span className="text-[11px] font-mono text-[#829A5F] uppercase font-bold">Instagram:</span>
                <a
                  href="https://www.instagram.com/ayyuqtechsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading font-bold text-sm sm:text-base text-[#D8E8C5] hover:text-orange-400 transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>ayyuqtechsolutions</span>
                </a>
              </div>

              {/* WhatsApp Quick Chat Button */}
              <div>
                <a
                  href="https://wa.me/919867069971?text=Hi%20Ayyuq%20Tech%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-lg shadow-orange-950/50 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 stroke-[2.5]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Status Indicator */}
              <div className="p-4 rounded-2xl bg-[#141A10] border border-[#607345]/40 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#829A5F] shrink-0" />
                <div className="text-xs font-mono">
                  <div className="text-[#829A5F] font-bold">🟢 Support Active</div>
                  <div className="text-[#B6CE95]">Replies within 24 Hours (IST)</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
