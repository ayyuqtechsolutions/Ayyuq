import React from 'react';

interface AyyuqLogoProps {
  variant?: 'full' | 'icon' | 'lockup' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showText?: boolean;
  theme?: 'dark' | 'light' | 'auto';
}

export default function AyyuqLogo({
  variant = 'lockup',
  size = 'md',
  className = '',
  showText = true,
  theme = 'auto',
}: AyyuqLogoProps) {
  // Dimensions based on size
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
    xl: 'w-16 h-16',
    hero: 'w-20 h-20 sm:w-24 sm:h-24',
  }[size];

  const textSize = {
    sm: { title: 'text-xs tracking-[0.2em]', subtitle: 'text-[7.5px] tracking-wider' },
    md: { title: 'text-sm sm:text-base tracking-[0.22em]', subtitle: 'text-[8.5px] sm:text-[9.5px] tracking-wider' },
    lg: { title: 'text-lg sm:text-xl tracking-[0.25em]', subtitle: 'text-xs tracking-widest' },
    xl: { title: 'text-2xl sm:text-3xl tracking-[0.3em]', subtitle: 'text-xs sm:text-sm tracking-widest' },
    hero: { title: 'text-3xl sm:text-4xl tracking-[0.3em]', subtitle: 'text-sm sm:text-base tracking-widest' },
  }[size];

  // Colors:
  // Primary Copper / Terracotta from user's official logo
  const copperColor = '#B2501E';
  
  // Right Monogram Stroke color: in dark theme #D8E8C5 or #FFFFFF, in light mode #161B24
  const darkStrokeColor = theme === 'light' ? '#161B24' : '#D8E8C5';

  // SVG Icon Mark Component - Exact geometry from official logo
  const LogoMark = ({ markClass = '' }: { markClass?: string }) => (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${markClass} shrink-0`}
      aria-label="Ayyuq Tech Solutions Official Logo"
    >
      {/* 1. Left Diagonal Copper/Rust Slash */}
      <path
        d="M 26 88 L 66 28"
        stroke={copperColor}
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* 2. Right Geometric Monogram Stroke */}
      <path
        d="M 70 42 L 54 66 L 82 66 L 96 88 L 48 88"
        stroke={darkStrokeColor}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. 4-Point Celestial Star in Crook */}
      <path
        d="M 84 42 Q 84 52 94 52 Q 84 52 84 62 Q 84 52 74 52 Q 84 52 84 42 Z"
        fill={copperColor}
      />
    </svg>
  );

  // Variant: Icon Only
  if (variant === 'icon' || !showText) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LogoMark markClass={iconDimensions} />
      </div>
    );
  }

  // Variant: Full Vertical (Badge/Stacked matching original business card / poster lockup)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        <div className="relative group p-3 rounded-2xl bg-[#141A10] border border-[#B2501E]/30 shadow-2xl backdrop-blur-md">
          <LogoMark markClass={iconDimensions} />
        </div>
        <div className="space-y-1">
          <div className={`font-heading font-extrabold text-[#D8E8C5] uppercase ${textSize.title}`}>
            AYYUQ
          </div>
          <div className="flex items-center justify-center gap-2 text-[#9BB17B]">
            <span className="w-5 h-[1.5px] bg-[#B2501E] rounded-full" />
            <span className={`font-sans uppercase font-medium text-[#B6CE95] ${textSize.subtitle}`}>
              Tech Solutions
            </span>
            <span className="w-5 h-[1.5px] bg-[#B2501E] rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Variant: Badge (Encapsulated in glossy container)
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#141A10] backdrop-blur-md border border-[#607345]/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${className}`}>
        <LogoMark markClass={iconDimensions} />
        <div className="flex flex-col text-left">
          <span className={`font-heading font-extrabold text-[#D8E8C5] uppercase leading-tight ${textSize.title}`}>
            AYYUQ
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2.5 h-[1.5px] bg-[#B2501E]" />
            <span className={`font-sans text-[#B2501E] font-medium tracking-wider uppercase ${textSize.subtitle}`}>
              Tech Solutions
            </span>
            <span className="w-2.5 h-[1.5px] bg-[#B2501E]" />
          </div>
        </div>
      </div>
    );
  }

  // Default Variant: Lockup (Horizontal Side-by-Side)
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <LogoMark markClass={iconDimensions} />
      <div className="flex flex-col justify-center text-left">
        <span className={`font-heading font-black text-[#D8E8C5] uppercase leading-none ${textSize.title}`}>
          AYYUQ
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-3 h-[1.5px] bg-[#B2501E] shrink-0" />
          <span className={`font-sans font-medium text-[#9BB17B] uppercase ${textSize.subtitle}`}>
            Tech Solutions
          </span>
          <span className="w-3 h-[1.5px] bg-[#B2501E] shrink-0" />
        </div>
      </div>
    </div>
  );
}
