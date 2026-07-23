'use client';

import { useRef, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { WorkEntry } from './works-data';

interface SplitGalleryItemProps {
  work: WorkEntry;
  containerRef: RefObject<HTMLDivElement>;
  reversed?: boolean;
}

export default function SplitGalleryItem({ work, containerRef, reversed = false }: SplitGalleryItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  // image drifts slower than scroll (classic parallax)
  const imageY = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);
  // title/index column drifts opposite + fades in around center — creates the
  // "offset" interleaved feel from the reference site
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], ['12%', '0%', '-12%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.2, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);

  return (
    <div
      ref={itemRef}
      className={`relative flex h-screen w-full flex-shrink-0 ${reversed ? 'flex-row-reverse' : ''}`}
    >
      {/* image */}
      <div
        className={`relative w-1/2 overflow-hidden border-white/[0.06] ${
          reversed ? 'border-l' : 'border-r'
        }`}
      >
        <motion.div
          style={{ y: imageY, scale }}
          className="absolute inset-[-10%] flex items-center justify-center bg-gradient-to-br from-white/[0.05] to-transparent text-xs uppercase tracking-widest text-[#5b6270]"
        >
          IMG
        </motion.div>
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_30px_rgba(0,0,0,0.6)]" />
      </div>

      {/* index + title */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="flex w-1/2 flex-col items-start justify-center gap-4 px-12"
      >
        <span className="font-display text-sm text-[#5b6270]">{work.index}</span>
        <span className="rounded-full border border-[#00e5ff]/50 bg-[#00e5ff]/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#00e5ff] shadow-[0_0_18px_rgba(0,229,255,0.25)] [text-shadow:0_0_10px_rgba(0,229,255,0.6)]">
          {work.tag}
        </span>
        <h3 className="font-display text-3xl font-semibold leading-tight text-[#edeff2] sm:text-4xl">
          {work.title}
        </h3>
        <p className="max-w-sm text-[13.5px] leading-relaxed text-[#a3aab6]">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {work.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-[#a3aab6]"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}