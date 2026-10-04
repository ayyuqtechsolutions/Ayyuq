import React, { useState } from 'react';
import { BookingDetails } from '../../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  User, 
  Mail, 
  Building2, 
  Send,
  ShieldCheck,
  ShieldAlert,
  Download
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  sanitizeInput, 
  containsMaliciousPayload, 
  isValidEmail, 
  checkRateLimit, 
  isHoneypotTriggered 
} from '../../utils/security';

interface BookingCalendarProps {
  attachedManifest?: string;
  budgetRange?: string;
}

export default function BookingCalendar({ attachedManifest, budgetRange }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-25');
  const [selectedSlot, setSelectedSlot] = useState<string>('14:00 (2:00 PM EST)');
  const [timezone, setTimezone] = useState<string>('America/New_York (EST)');
  const [fullName, setFullName] = useState<string>('');
  const [workEmail, setWorkEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [projectGoals, setProjectGoals] = useState<string>('');
  const [honeypotField, setHoneypotField] = useState<string>('');
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  // Sample upcoming available days (Mon-Fri)
  const availableDates = [
    { date: '2026-08-25', day: 'Tue', dayNum: '25', month: 'Aug' },
    { date: '2026-08-26', day: 'Wed', dayNum: '26', month: 'Aug' },
    { date: '2026-08-27', day: 'Thu', dayNum: '27', month: 'Aug' },
    { date: '2026-08-28', day: 'Fri', dayNum: '28', month: 'Aug' },
    { date: '2026-08-31', day: 'Mon', dayNum: '31', month: 'Aug' },
    { date: '2026-09-01', day: 'Tue', dayNum: '01', month: 'Sep' },
  ];

  const timeSlots = [
    '09:00 (9:00 AM)',
    '11:00 (11:00 AM)',
    '14:00 (2:00 PM)',
    '16:30 (4:30 PM)',
    '18:00 (6:00 PM)',
  ];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMessage(null);

    // 1. Honeypot check for automated bots / scrapers
    if (isHoneypotTriggered(honeypotField)) {
      setIsConfirmed(true);
      setBookingRef(`AYQ-BR-${Math.floor(100000 + Math.random() * 900000)}`);
      return;
    }

    // 2. Anti-Brute-Force & Rate Limiter (max 3 submissions / min)
    const rateCheck = checkRateLimit('calendar-booking-session', 3, 60000, 60000);
    if (!rateCheck.allowed) {
      setSecurityMessage(rateCheck.errorMessage || 'Too many booking attempts. Please pause.');
      return;
    }

    // 3. Malicious Script & Injection Filter
    const fieldsToInspect = [fullName, workEmail, companyName, projectGoals];
    if (fieldsToInspect.some((val) => containsMaliciousPayload(val))) {
      setSecurityMessage('Security Alert: Malicious script or query syntax detected and blocked.');
      return;
    }

    // 4. Email validation
    if (!isValidEmail(workEmail)) {
      setSecurityMessage('Please enter a valid work email address.');
      return;
    }

    // 5. Sanitize text
    const cleanName = sanitizeInput(fullName, 100);
    const cleanEmail = sanitizeInput(workEmail, 150);
    const cleanCompany = sanitizeInput(companyName, 120);

    if (!cleanName || !cleanEmail || !cleanCompany) {
      setSecurityMessage('All required fields must contain valid information.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
      setBookingRef(`AYQ-BR-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1000);
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-[#0F140D] border border-orange-600/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-[#141A10] border border-[#607345] flex items-center justify-center mx-auto text-[#829A5F]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A10] text-[#829A5F] text-xs font-mono border border-[#607345]/40 font-semibold">
            <span>TRANSMISSION CONFIRMED • PROTOCOL ARMED</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#D8E8C5]">
            Architecture Briefing Scheduled
          </h3>
          <p className="text-sm text-[#B6CE95] max-w-md mx-auto">
            We have reserved your slot with an Ayyuq Principal Systems Architect. A calendar invitation has been transmitted to <strong className="text-orange-400">{workEmail}</strong>.
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#0A0D08] border border-[#607345]/30 text-left font-mono text-xs space-y-2.5">
          <div className="flex items-center justify-between text-[#829A5F] border-b border-[#607345]/20 pb-2">
            <span>Reference ID:</span>
            <span className="text-orange-400 font-bold">{bookingRef}</span>
          </div>
          <div className="flex items-center justify-between text-[#829A5F]">
            <span>Scheduled Date:</span>
            <span className="text-[#D8E8C5] font-semibold">{selectedDate}</span>
          </div>
          <div className="flex items-center justify-between text-[#829A5F]">
            <span>Time Window:</span>
            <span className="text-[#D8E8C5] font-semibold">{selectedSlot}</span>
          </div>
          <div className="flex items-center justify-between text-[#829A5F]">
            <span>Timezone:</span>
            <span className="text-[#D8E8C5]">{timezone}</span>
          </div>
          <div className="flex items-center justify-between text-[#829A5F] pt-2 border-t border-[#607345]/20">
            <span>Manifest Status:</span>
            <span className="text-[#829A5F] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Attached & Pre-Analyzed
            </span>
          </div>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => setIsConfirmed(false)}
            className="px-6 py-2.5 rounded-xl bg-[#141A10] border border-[#607345]/30 text-[#829A5F] hover:text-[#FF7A1A] text-xs font-mono cursor-pointer"
          >
            Schedule Another Slot
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div id="booking-calendar-module" className="rounded-3xl bg-[#0F140D] border border-orange-600/30 p-6 sm:p-10 space-y-8 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#607345]/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs font-mono font-semibold mb-2">
            <CalendarIcon className="w-3.5 h-3.5 text-orange-500" />
            <span>EXECUTIVE BRIEFING CALENDAR</span>
          </div>
          <h3 className="text-2xl font-heading font-bold text-[#D8E8C5] tracking-tight">
            Schedule Systems Briefing
          </h3>
          <p className="text-xs sm:text-sm text-[#9BB17B] mt-1">
            Direct 30-minute private technical discussion with our Principal Engineering team.
          </p>
        </div>

        {/* Attached Manifest Badge Indicator */}
        {attachedManifest ? (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs font-mono font-semibold">
            <FileText className="w-4 h-4 text-orange-500" />
            <span>Scope Manifest Attached</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0D08] border border-[#607345]/30 text-[#829A5F] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Direct Architecture Review</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Date & Slot Picker */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Select Day */}
          <div className="space-y-3">
            <label className="block text-xs font-mono text-[#D8E8C5] uppercase tracking-wider font-semibold">
              1. Select Briefing Date:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {availableDates.map((item) => {
                const isSelected = selectedDate === item.date;
                return (
                  <button
                    type="button"
                    key={item.date}
                    onClick={() => setSelectedDate(item.date)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600 text-[#0A0D08] font-black shadow-md shadow-orange-950/40'
                        : 'bg-[#0A0D08] border border-[#607345]/30 hover:border-orange-500/50 text-[#829A5F]'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase opacity-75">{item.month}</span>
                    <span className="text-lg font-heading font-extrabold">{item.dayNum}</span>
                    <span className="text-[10px] font-mono">{item.day}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Slot */}
          <div className="space-y-3">
            <label className="block text-xs font-mono text-[#D8E8C5] uppercase tracking-wider font-semibold">
              2. Select Time Window:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-orange-600 text-[#0A0D08] font-black shadow-md shadow-orange-950/40'
                        : 'bg-[#0A0D08] border border-[#607345]/30 hover:border-orange-500/50 text-[#829A5F]'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timezone selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#829A5F]">Timezone Coordinator:</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-xl bg-[#0A0D08] border border-[#607345]/30 p-3 text-xs text-[#D8E8C5] focus:outline-none focus:border-orange-500 font-mono"
            >
              <option value="America/New_York (EST)">America/New York (UTC-5 / EST)</option>
              <option value="America/Los_Angeles (PST)">America/Los Angeles (UTC-8 / PST)</option>
              <option value="Europe/London (GMT)">Europe/London (UTC+0 / GMT)</option>
              <option value="Asia/Kolkata (IST)">Asia/Kolkata (UTC+5:30 / IST)</option>
              <option value="Asia/Dubai (GST)">Asia/Dubai (UTC+4 / GST)</option>
              <option value="Asia/Singapore (SGT)">Asia/Singapore (UTC+8 / SGT)</option>
            </select>
          </div>

        </div>

        {/* Right Column: High-Ticket Attendee Details */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-[#0A0D08] border border-[#607345]/30">
          <span className="text-xs font-mono text-orange-400 uppercase tracking-wider block font-semibold">
            3. Attendee & Company Credentials:
          </span>

          {/* Invisible Honeypot Anti-Bot Field */}
          <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
            <label htmlFor="calendar-security-hp">Leave blank</label>
            <input
              id="calendar-security-hp"
              type="text"
              value={honeypotField}
              onChange={(e) => setHoneypotField(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Security Alert Banner */}
          {securityMessage && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-300">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{securityMessage}</span>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-[#829A5F] mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#607345] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Harrison"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#141A10] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#829A5F] mb-1">Work Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#607345] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="alex@enterprise.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#141A10] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#829A5F] mb-1">Company / Organization *</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#607345] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Apex Global Corp"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#141A10] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#829A5F] mb-1">Primary Objective for Call</label>
              <textarea
                value={projectGoals}
                onChange={(e) => setProjectGoals(e.target.value)}
                rows={2}
                placeholder="Review architecture feasibility, timeline commitments, budget allocation..."
                className="w-full p-2.5 rounded-xl bg-[#141A10] border border-[#607345]/30 text-xs text-[#D8E8C5] placeholder-[#607345] focus:outline-none focus:border-orange-500 font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-[#0A0D08] font-heading font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-950/50 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Transmitting Booking Protocol...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Briefing Slot</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#829A5F] pt-1">
            <ShieldCheck className="w-3 h-3 text-[#829A5F]" />
            <span>Strict NDA Enforced • Direct with Engineering Leads</span>
          </div>

        </div>

      </form>
    </div>
  );
}
