import { useEffect, useRef } from 'react';

interface DashParticle {
  x: number;
  y: number;
  baseAngle: number;
  orbitRadiusRatio: number;
  angularSpeed: number;
  length: number;
  thickness: number;
  color: string;
  alpha: number;
  driftX: number;
  driftY: number;
  isOrbital: boolean;
}

const COLORS = ['#4285F4', '#EA4335', '#A142F4', '#5F6368'];

export function OrbitalParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;

    const pointer = {
      targetX: width * 0.5,
      targetY: height * 0.4,
      x: width * 0.5,
      y: height * 0.4,
      active: false,
    };

    let particles: DashParticle[] = [];

    const createParticles = () => {
      const isMobile = width < 640;
      const orbitalCount = isMobile ? 85 : 155;
      const ambientCount = isMobile ? 35 : 65;

      const orbital: DashParticle[] = Array.from({ length: orbitalCount }, (_, i) => {
        const angle = (i / orbitalCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
        return {
          x: 0,
          y: 0,
          baseAngle: angle,
          orbitRadiusRatio: 0.62 + Math.random() * 0.68,
          angularSpeed: (0.0005 + Math.random() * 0.0009) * (i % 2 === 0 ? 1 : 0.8),
          length: 5 + Math.random() * 8,
          thickness: 1.5 + Math.random() * 1.1,
          color: COLORS[i % COLORS.length],
          alpha: 0.45 + Math.random() * 0.4,
          driftX: (Math.random() - 0.5) * 14,
          driftY: (Math.random() - 0.5) * 14,
          isOrbital: true,
        };
      });

      const ambient: DashParticle[] = Array.from({ length: ambientCount }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        baseAngle: Math.random() * Math.PI * 2,
        orbitRadiusRatio: 1,
        angularSpeed: (Math.random() - 0.5) * 0.006,
        length: 4 + Math.random() * 6,
        thickness: 1.3 + Math.random() * 0.9,
        color: COLORS[(i + 1) % COLORS.length],
        alpha: 0.18 + Math.random() * 0.2,
        driftX: (Math.random() - 0.5) * 0.25,
        driftY: (Math.random() - 0.5) * 0.25,
        isOrbital: false,
      }));

      particles = [...orbital, ...ambient];
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    let tick = 0;

    const render = () => {
      tick += 1;

      if (pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.08;
        pointer.y += (pointer.targetY - pointer.y) * 0.08;
      } else {
        pointer.x += (width * 0.5 - pointer.x) * 0.03;
        pointer.y += (height * 0.36 - pointer.y) * 0.03;
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      const scrollY = window.scrollY || 0;
      // Orbital hero ring fades smoothly as user scrolls past hero, leaving ambient particles active
      const heroOpacityFactor = Math.max(0.14, 1 - scrollY / 900);

      // Ring center shifts gently toward cursor
      const cx = width * 0.5 + (pointer.x - width * 0.5) * 0.08;
      const cy = height * 0.34 - Math.min(scrollY * 0.22, 180) + (pointer.y - height * 0.4) * 0.06;
      const rxBase = Math.min(width * 0.44, 540);
      const ryBase = Math.min(height * 0.36, 300);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isOrbital) {
          if (!prefersReducedMotion) {
            p.baseAngle += p.angularSpeed;
          }

          const wobble = Math.sin(tick * 0.015 + i) * 6;
          let px = cx + Math.cos(p.baseAngle) * (rxBase * p.orbitRadiusRatio + wobble) + p.driftX;
          let py = cy + Math.sin(p.baseAngle) * (ryBase * p.orbitRadiusRatio + wobble * 0.6) + p.driftY;

          let drawAngle = p.baseAngle + Math.PI / 2;

          // Dynamic cursor swirl/attraction
          if (!prefersReducedMotion && pointer.active) {
            const dx = pointer.x - px;
            const dy = pointer.y - py;
            const dist = Math.hypot(dx, dy);
            if (dist < 220 && dist > 1) {
              const pull = (1 - dist / 220) * 26;
              // Gentle tangential swirl + inward pull
              px += (dx / dist) * pull * 0.55 - (dy / dist) * pull * 0.45;
              py += (dy / dist) * pull * 0.55 + (dx / dist) * pull * 0.45;
              drawAngle = Math.atan2(dy, dx) + 0.45;
            }
          }

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(drawAngle);
          ctx.globalAlpha = p.alpha * heroOpacityFactor;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.thickness;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-p.length * 0.5, 0);
          ctx.lineTo(p.length * 0.5, 0);
          ctx.stroke();
          ctx.restore();
        } else {
          if (!prefersReducedMotion) {
            p.x += p.driftX;
            p.y += p.driftY;
            p.baseAngle += p.angularSpeed;

            if (p.x < -20) p.x = width + 20;
            if (p.x > width + 20) p.x = -20;
            if (p.y < -20) p.y = height + 20;
            if (p.y > height + 20) p.y = -20;
          }

          let ax = p.x;
          let ay = p.y;
          let angle = p.baseAngle;

          if (!prefersReducedMotion && pointer.active) {
            const dx = pointer.x - ax;
            const dy = pointer.y - ay;
            const dist = Math.hypot(dx, dy);
            if (dist < 180 && dist > 1) {
              const pull = (1 - dist / 180) * 16;
              ax += (dx / dist) * pull * 0.5;
              ay += (dy / dist) * pull * 0.5;
              angle = Math.atan2(dy, dx);
            }
          }

          ctx.save();
          ctx.translate(ax, ay);
          ctx.rotate(angle);
          ctx.globalAlpha = p.alpha;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.thickness;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-p.length * 0.5, 0);
          ctx.lineTo(p.length * 0.5, 0);
          ctx.stroke();
          ctx.restore();
        }
      }

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    render();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}
