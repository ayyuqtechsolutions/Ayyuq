import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate cursor glow on devices with fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
        setIsHoveringClickable(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ambient olive & orange ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHoveringClickable ? '70px' : '48px',
          height: isHoveringClickable ? '70px' : '48px',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.28) 0%, rgba(130, 154, 95, 0.15) 50%, transparent 75%)',
          border: isHoveringClickable ? '1px solid rgba(234, 88, 12, 0.8)' : '1px solid rgba(130, 154, 95, 0.45)',
          boxShadow: '0 0 15px rgba(234, 88, 12, 0.25)',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease',
        }}
      />
      {/* Central pinpoint star */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-orange-500"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHoveringClickable ? '6px' : '4px',
          height: isHoveringClickable ? '6px' : '4px',
          boxShadow: '0 0 8px rgba(234, 88, 12, 0.8)',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
    </>
  );
}
