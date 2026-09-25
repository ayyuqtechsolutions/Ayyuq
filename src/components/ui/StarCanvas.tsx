import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  isPioneer?: boolean;
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isDown: false,
      radius: 180,
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initStars();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const starColors = [
      'rgba(234, 88, 12, ',  // Dark Orange
      'rgba(130, 154, 95, ', // Olive Green
      'rgba(216, 232, 197, ', // Light Olive Tint
      'rgba(194, 65, 12, ',  // Deep Orange
    ];

    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 8000), 140);

      // Pioneer Leader Star (Al-Ayyuq) - larger, brighter, dark orange core with olive halo
      stars.push({
        x: width * 0.72,
        y: height * 0.28,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 4.5,
        baseRadius: 4.5,
        alpha: 1.0,
        twinkleSpeed: 0.02,
        twinklePhase: 0,
        color: 'rgba(234, 88, 12, ',
        isPioneer: true,
      });

      for (let i = 0; i < count; i++) {
        const isThemeColored = Math.random() > 0.5;
        const color = isThemeColored ? starColors[Math.floor(Math.random() * 2)] : starColors[2 + Math.floor(Math.random() * 2)];
        const r = Math.random() * 1.8 + 0.6;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: r,
          baseRadius: r,
          alpha: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: color,
        });
      }
    };

    initStars();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const onMouseDown = () => {
      mouse.isDown = true;
      mouse.radius = 240;
    };

    const onMouseUp = () => {
      mouse.isDown = false;
      mouse.radius = 180;
    };

    const onMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Draw faint background radial glow
      const grad = ctx.createRadialGradient(width / 2, height / 3, 50, width / 2, height / 2, width * 0.7);
      grad.addColorStop(0, 'rgba(194, 65, 12, 0.05)');
      grad.addColorStop(0.4, 'rgba(96, 115, 69, 0.04)');
      grad.addColorStop(0.8, 'rgba(10, 13, 8, 0.2)');
      grad.addColorStop(1, 'rgba(10, 13, 8, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update and connect stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Movement
        star.x += star.vx;
        star.y += star.vy;

        // Wrap boundaries
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Twinkle
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = star.alpha + Math.sin(star.twinklePhase) * 0.25;
        const clampedAlpha = Math.max(0.15, Math.min(1, currentAlpha));

        // Gravitational pull towards mouse
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * (mouse.isDown ? 2.5 : 1.2);
          star.x += (dx / dist) * force;
          star.y += (dy / dist) * force;

          // Connect star to mouse with dark orange/olive lines
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouse.x, mouse.y);
          const lineAlpha = (1 - dist / mouse.radius) * 0.45;
          ctx.strokeStyle = `rgba(234, 88, 12, ${lineAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Inter-star constellation links
        for (let j = i + 1; j < stars.length; j++) {
          const other = stars[j];
          const cdx = star.x - other.x;
          const cdy = star.y - other.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 110) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(other.x, other.y);
            const lineAlpha = (1 - cdist / 110) * 0.18;
            ctx.strokeStyle = `rgba(130, 154, 95, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Render Star Node
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.isPioneer ? star.radius : star.radius * (0.8 + 0.3 * Math.sin(star.twinklePhase)), 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${clampedAlpha})`;
        ctx.fill();

        // Pioneer Star Extra Aura
        if (star.isPioneer) {
          // Inner glow
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(234, 88, 12, 0.2)';
          ctx.fill();

          // Outer halo
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 6.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(130, 154, 95, 0.1)';
          ctx.fill();

          // Label
          ctx.font = '600 11px "Outfit", sans-serif';
          ctx.fillStyle = 'rgba(249, 115, 22, 0.95)';
          ctx.fillText('AL-AYYUQ (α Capella)', star.x + 14, star.y + 4);
        }
      }

      // Draw mouse cursor pulse on canvas
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(234, 88, 12, 0.7)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(130, 154, 95, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="pioneer-star-canvas"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair opacity-85 z-0"
    />
  );
}
