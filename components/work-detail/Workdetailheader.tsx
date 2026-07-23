'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { WorkDetail } from './work-detail-data';

export default function WorkDetailHeader({ work }: { work: WorkDetail }) {
  return (
    <header className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#0a1416_0%,#050505_60%)] px-6 pb-16 pt-32">
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.85)]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.a
          href="/works"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-[#a3aab6] transition-colors hover:text-[#00e5ff]"
        >
          <ArrowLeft size={14} />
          Back to work
        </motion.a>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block rounded-full border border-[#00e5ff]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.2)]"
        >
          {work.tag}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display text-4xl font-semibold leading-tight text-[#edeff2] sm:text-5xl"
        >
          {work.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#5b6270]"
        >
          <span>{work.year}</span>
          <span>{work.role}</span>
        </motion.div>
      </div>
    </header>
  );
}