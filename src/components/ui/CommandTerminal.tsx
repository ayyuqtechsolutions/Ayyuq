import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { 
  sanitizeInput, 
  containsMaliciousPayload, 
  checkRateLimit 
} from '../../utils/security';

interface TerminalLine {
  id: string;
  type: 'system' | 'info' | 'success' | 'orange' | 'input' | 'output';
  text: string;
  time: string;
}

export default function CommandTerminal({ onNavigate }: { onNavigate?: (pageId: any) => void }) {
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const getIstTimeString = () => {
    return new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'AYYUQ TECH SOLUTIONS [SYSTEM READY]', time: 'IST 00:00:01' },
    { id: '2', type: 'info', text: 'Connecting to fast Indian & global servers...', time: 'IST 00:00:02' },
    { id: '3', type: 'orange', text: '> Ayyuq Core Engine: ONLINE (Active)', time: 'IST 00:00:03' },
    { id: '4', type: 'success', text: '> Page Loading Speed: Instant (Super Fast)', time: 'IST 00:00:04' },
    { id: '5', type: 'info', text: '> Security Check: All Customer Data Encrypted', time: 'IST 00:00:05' },
    { id: '6', type: 'orange', text: '> Status: Ready to build your project', time: 'IST 00:00:06' },
  ]);

  const terminalContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll internal terminal container only (does not scroll window)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [lines]);

  // Periodic ambient live updates
  useEffect(() => {
    const ambientUpdates = [
      '> Live Check: 100% servers active across all regions.',
      '> Memory Usage: Lightweight and highly optimized.',
      '> Server Health: Zero errors reported. All pages loading fast.',
      '> Security Guard: Real-time firewall active & protecting data.',
      '> Database Status: Fast response time with zero delays.',
    ];

    let index = 0;
    const interval = setInterval(() => {
      const timeStr = `IST ${getIstTimeString()}`;
      setLines((prev) => {
        if (prev.length > 25) {
          return [
            ...prev.slice(5),
            {
              id: Math.random().toString(),
              type: 'info',
              text: ambientUpdates[index % ambientUpdates.length],
              time: timeStr,
            },
          ];
        }
        return [
          ...prev,
          {
            id: Math.random().toString(),
            type: 'info',
            text: ambientUpdates[index % ambientUpdates.length],
            time: timeStr,
          },
        ];
      });
      index++;
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawVal = inputVal.trim();
    if (!rawVal) return;

    const timeStr = `IST ${getIstTimeString()}`;

    // Rate limiting (max 10 terminal commands in 15 seconds to prevent browser DoS)
    const rateCheck = checkRateLimit('terminal-command-exec', 10, 15000, 15000);
    if (!rateCheck.allowed) {
      setLines((prev) => [
        ...prev,
        { id: Math.random().toString(), type: 'input', text: `$ ${rawVal}`, time: timeStr },
        { id: Math.random().toString(), type: 'orange', text: `[RATE LIMIT]: Command velocity throttled to mitigate DoS. Wait ${rateCheck.retryAfterSeconds}s.`, time: timeStr },
      ]);
      setInputVal('');
      return;
    }

    // Malicious script & injection filter
    if (containsMaliciousPayload(rawVal)) {
      setLines((prev) => [
        ...prev,
        { id: Math.random().toString(), type: 'input', text: `$ ${sanitizeInput(rawVal, 40)}`, time: timeStr },
        { id: Math.random().toString(), type: 'orange', text: '[SECURITY FIREWALL]: Malicious script or injection syntax detected and neutralized.', time: timeStr },
      ]);
      setInputVal('');
      return;
    }

    const cleanInput = sanitizeInput(rawVal, 100);
    const cmd = cleanInput.toLowerCase();

    const newLines: TerminalLine[] = [
      ...lines,
      { id: Math.random().toString(), type: 'input', text: `$ ${cleanInput}`, time: timeStr },
    ];

    if (cmd === 'help') {
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: 'Available commands: status, services, pricing, estimate, work, contact, clear',
        time: timeStr,
      });
    } else if (cmd === 'status') {
      newLines.push({
        id: Math.random().toString(),
        type: 'orange',
        text: 'STATUS: ALL SYSTEMS HEALTHY • 100% UPTIME • READY FOR NEW CLIENTS',
        time: timeStr,
      });
    } else if (cmd === 'services') {
      newLines.push({
        id: Math.random().toString(),
        type: 'info',
        text: 'SERVICES: 1. Modern Websites & Web Apps  2. Mobile Apps (iOS & Android)  3. Custom Business ERP/CRM  4. Cloud Backend',
        time: timeStr,
      });
    } else if (cmd === 'pricing' || cmd === 'price') {
      newLines.push({
        id: Math.random().toString(),
        type: 'orange',
        text: 'PRICING IN INR (₹): Starter from ₹45,000 | Growth Apps from ₹1,20,000 | Custom ERP from ₹2,50,000',
        time: timeStr,
      });
    } else if (cmd === 'estimate' || cmd === 'quote') {
      newLines.push({
        id: Math.random().toString(),
        type: 'orange',
        text: 'Opening Price Estimator in INR (₹)...',
        time: timeStr,
      });
      if (onNavigate) onNavigate('launch-pad');
    } else if (cmd === 'work' || cmd === 'deployments' || cmd === 'portfolio') {
      newLines.push({
        id: Math.random().toString(),
        type: 'info',
        text: 'Opening Our Work & Case Studies...',
        time: timeStr,
      });
      if (onNavigate) onNavigate('orbit');
    } else if (cmd === 'contact') {
      newLines.push({
        id: Math.random().toString(),
        type: 'orange',
        text: 'Contact: ayyuqtechsolutions@gmail.com | Operating in Indian Standard Time (IST)',
        time: timeStr,
      });
    } else if (cmd === 'clear') {
      setLines([
        { id: '1', type: 'system', text: 'Terminal cleared. Ayyuq Core Active.', time: timeStr },
      ]);
      setInputVal('');
      return;
    } else {
      newLines.push({
        id: Math.random().toString(),
        type: 'output',
        text: `Command not recognized: '${cmd}'. Type 'help' for available commands.`,
        time: timeStr,
      });
    }

    setLines(newLines);
    setInputVal('');
  };

  const handleCopyLogs = () => {
    const textToCopy = lines.map((l) => `[${l.time}] ${l.text}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    const timeStr = `IST ${getIstTimeString()}`;
    setLines([
      { id: '1', type: 'system', text: 'AYYUQ TECH SOLUTIONS [RESET]', time: timeStr },
      { id: '2', type: 'orange', text: '> Ayyuq Core Engine: ONLINE', time: timeStr },
      { id: '3', type: 'success', text: '> Page Loading: Instant (Fast Response)', time: timeStr },
      { id: '4', type: 'orange', text: '> Status: Ready for Next Client Build', time: timeStr },
    ]);
  };

  return (
    <div
      id="live-command-line-terminal"
      className="w-full rounded-xl overflow-hidden bg-[#0A0D08]/90 border border-[#607345]/30 backdrop-blur-md shadow-2xl shadow-black font-mono text-xs"
    >
      {/* Sleek Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141A10] border-b border-[#607345]/25">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/60 inline-block" />
            <span className="w-2 h-2 rounded-full bg-orange-500/60 inline-block" />
            <span className="w-2 h-2 rounded-full bg-[#829A5F] inline-block" />
          </div>
          <div className="h-3 w-[1px] bg-[#607345]/30 mx-1" />
          <span className="text-[10px] text-[#829A5F] font-mono tracking-widest uppercase">
            COMMAND_TERMINAL_v1.0.4
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLogs}
            className="p-1 rounded hover:bg-[#607345]/20 text-[#829A5F] hover:text-[#FF7A1A] transition-colors"
            title="Copy logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#829A5F]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded hover:bg-[#607345]/20 text-[#829A5F] hover:text-[#FF7A1A] transition-colors"
            title="Restart terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Content Stream */}
      <div 
        ref={terminalContainerRef}
        className="p-4 sm:p-5 bg-black/50 max-h-72 overflow-y-auto space-y-2 selection:bg-orange-600/40 selection:text-orange-100"
      >
        {lines.map((line) => {
          let textColor = 'text-[#9BB17B]';
          if (line.type === 'system') textColor = 'text-[#829A5F] font-bold';
          if (line.type === 'orange') textColor = 'text-orange-500 font-semibold';
          if (line.type === 'success') textColor = 'text-[#829A5F] font-semibold';
          if (line.type === 'input') textColor = 'text-orange-400';
          if (line.type === 'output') textColor = 'text-[#B6CE95] pl-4';

          return (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-start gap-2.5 font-mono leading-relaxed text-[12px]"
            >
              <span className="text-[#607345] select-none text-[10px] pt-0.5">{line.time}</span>
              <span className={textColor}>{line.text}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Command Input */}
      <form onSubmit={handleCommand} className="flex items-center px-4 py-2.5 bg-[#0A0D08] border-t border-[#607345]/20">
        <span className="text-orange-500 font-bold mr-2 select-none">&gt;</span>
        <input
          type="text"
          id="terminal-cli-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'help', 'status', 'estimate', or 'pricing'..."
          className="flex-1 bg-transparent text-[#D8E8C5] placeholder-[#607345] focus:outline-none font-mono text-xs"
        />
        <button
          type="submit"
          className="p-1 rounded bg-orange-600/15 hover:bg-orange-600/30 text-orange-400 transition-colors ml-2 cursor-pointer"
          aria-label="Execute command"
        >
          <Play className="w-3 h-3 fill-current" />
        </button>
      </form>
    </div>
  );
}
