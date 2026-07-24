'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface WorkImageTileProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function WorkImageTile({ src, alt = '', className = '' }: WorkImageTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 22 });
  const springY = useSpring(y, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

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

  return (
    <motion.div
  ref={ref}
  onMouseMove={handleMove}
  onMouseLeave={handleLeave}
  style={{ rotateX, rotateY, transformPerspective: 900 }}
  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] [transform-style:preserve-3d] ${className}`}
>
  <Image
    src={src}
    alt={alt}
    fill
    className="object-cover object-top"
    sizes="(max-width: 768px) 100vw, 33vw"
  />
  <div className="pointer-events-none absolute inset-0 border border-[#00e5ff]/10 transition-colors duration-300 group-hover:border-[#00e5ff]/40" />
  <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[0_0_40px_rgba(0,229,255,0.25)] transition-opacity duration-300 group-hover:opacity-100" />
</motion.div>
  );
}