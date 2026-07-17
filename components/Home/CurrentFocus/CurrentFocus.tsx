'use client';

import { motion } from 'framer-motion';
import { ShieldHalf, ScanSearch, GraduationCap, Cpu, type LucideIcon } from 'lucide-react';
import TiltCard from '../shared/TiltCard';
import { focusItems, type FocusItem } from './focus-items';

const ICONS: Record<FocusItem['icon'], LucideIcon> = {
  shield: ShieldHalf,
  search: ScanSearch,
  academy: GraduationCap,
  cpu: Cpu,
};

export default function CurrentFocus() {
  return (
    <section id="focus" className="bg-[#050505] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff] before:h-px before:w-4 before:bg-[#00e5ff] before:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
        >
          Right now
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 mt-4 font-display text-3xl font-semibold text-[#edeff2] sm:text-4xl"
        >
          What I'm heads-down on
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusItems.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="h-full p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#00e5ff]/25 bg-[#00e5ff]/[0.06] text-[#00e5ff]">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <span className="rounded-full border border-[#00e5ff]/25 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-[#00e5ff]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-[1.05rem] font-semibold text-[#edeff2]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#a3aab6]">{item.description}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}