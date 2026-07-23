'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from '../Home/shared/TiltCard';
import type { WorkEntry } from './works-data';

interface WorkRowProps {
  work: WorkEntry;
  reversed?: boolean;
}

export default function WorkRow({ work, reversed = false }: WorkRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div
      ref={ref}
      className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16 ${
        reversed ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* image placeholder, swap for <Image src={work.image} .../> */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <TiltCard glowColor="255,77,46" className="aspect-[4/3]">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-[-6%] flex items-center justify-center bg-gradient-to-br from-white/[0.05] to-transparent text-xs uppercase tracking-widest text-[#5b6270]"
          >
            IMG
          </motion.div>
          <div className="pointer-events-none absolute inset-0 border border-[#ff4d2e]/15" />
        </TiltCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="font-display text-sm text-[#5b6270]">{work.index}</span>
          <span className="text-sm text-[#5b6270]">{work.year}</span>
          <span className="rounded-full border border-[#ff4d2e]/35 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#ff4d2e]">
            {work.tag}
          </span>
        </div>

        <h2 className="mb-2 font-display text-2xl font-semibold text-[#edeff2] sm:text-3xl">
          {work.title}
        </h2>
        <p className="mb-4 text-[13px] font-medium text-[#a3aab6]">{work.role}</p>
        <p className="mb-6 max-w-md text-[14.5px] leading-relaxed text-[#a3aab6]">
          {work.description}
        </p>

        <div className="mb-7 flex flex-wrap gap-2">
          {work.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11.5px] text-[#a3aab6]"
            >
              {s}
            </span>
          ))}
        </div>

        <a
          href={work.href}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#edeff2] transition-colors hover:text-[#ff4d2e]"
        >
          View project
          <ArrowUpRight size={16} />
        </a>
      </motion.div>
    </div>
  );
}