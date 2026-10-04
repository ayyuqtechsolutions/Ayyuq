import { Globe, ExternalLink, Code2, Sparkles, KeyRound, Info } from 'lucide-react';
import { motion } from 'motion/react';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  liveLink: string;
  imageSrc: string;
  credentialsNote?: string;
  note?: string;
}

interface ProjectCardProps {
  key?: string;
  project: ProjectItem;
  index: number;
}

export default function CaseStudyCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="rounded-3xl bg-[#0F140D] border-2 border-[#607345]/30 hover:border-orange-500/60 hover:bg-[#141A10] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-black/80 relative overflow-hidden"
    >
      {/* Ambient glow accent */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-600/5 group-hover:bg-orange-600/10 rounded-full blur-2xl transition-all pointer-events-none" />

      {/* Project Visual Image Showcase */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-[#0A0D08] border-b-2 border-[#607345]/25">
        <img
          src={project.imageSrc}
          alt={`Ayyuq ${project.title} - ${project.subtitle} Dashboard`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F140D] via-transparent to-transparent opacity-80" />
        
        {/* Floating Badges over Image */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0D08]/90 backdrop-blur-md border border-[#607345]/50 text-orange-400 text-xs font-mono font-bold tracking-wide shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>{project.subtitle}</span>
          </div>
          <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-[#0A0D08]/90 backdrop-blur-md border border-[#607345]/40 text-[#D8E8C5] shadow-lg">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
        
        <div className="space-y-3">
          {/* Title & Description */}
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#D8E8C5] group-hover:text-[#FF7A1A] transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-[#9BB17B] leading-relaxed font-sans">
            {project.description}
          </p>

          {/* Technologies Used */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#829A5F] uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5 text-orange-500 stroke-[2.5]" />
              <span>Technologies Used:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-[#0A0D08] border border-[#607345]/40 text-xs font-mono font-medium text-[#D8E8C5] group-hover:border-orange-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Live Demo Link Button & Optional Credentials Note */}
        <div className="pt-6 mt-6 border-t-2 border-[#607345]/20 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600/15 hover:bg-orange-600 border border-orange-500/50 hover:border-orange-500 text-orange-400 hover:text-[#0A0D08] text-xs font-heading font-black tracking-wider uppercase transition-all shadow-md group/btn cursor-pointer"
            >
              <Globe className="w-4 h-4 text-orange-400 group-hover/btn:text-[#0A0D08] transition-colors" />
              <span>Live Project Preview</span>
              <ExternalLink className="w-3.5 h-3.5 text-orange-400 group-hover/btn:text-[#0A0D08] transition-colors" />
            </a>

            {project.credentialsNote ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070A05] border border-[#607345]/50 text-[11px] font-mono text-[#D8E8C5]">
                <KeyRound className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>
                  <strong className="text-orange-400 font-semibold">Demo Login:</strong> {project.credentialsNote}
                </span>
              </div>
            ) : project.note ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070A05] border border-orange-500/40 text-[11px] font-mono text-[#D8E8C5]">
                <Info className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>
                  <strong className="text-orange-400 font-semibold">Note:</strong> {project.note}
                </span>
              </div>
            ) : (
              <span className="text-[11px] font-mono text-[#829A5F] hidden sm:inline-block">
                Production Verified
              </span>
            )}
          </div>
        </div>

      </div>

    </motion.div>
  );
}
