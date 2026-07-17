'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  as?: 'div' | 'a';
  href?: string;
}

/**
 * Generic mouse-driven 3D tilt wrapper with a radial glow that tracks the cursor.
 * Wrap any card content: <TiltCard>{...}</TiltCard>
 */
export default function TiltCard({
  children,
  className = '',
  glowColor = '0,229,255',
  as = 'div',
  href,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(${glowColor},0.16), transparent 55%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      href={as === 'a' ? href : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.03] backdrop-blur-md transition-colors duration-300 hover:border-[#00e5ff]/35 [transform-style:preserve-3d] ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: glowBackground }} />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}