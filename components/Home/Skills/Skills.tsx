'use client';

import { motion } from 'framer-motion';
import { skillsData } from './skills-data';

export default function Skills() {
  return (
    <section id="skills" className="border-y border-white/[0.06] bg-[#070707] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff] before:h-px before:w-4 before:bg-[#00e5ff] before:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
        >
          Toolkit
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 mt-4 font-display text-3xl font-semibold text-[#edeff2] sm:text-4xl"
        >
          What I build with
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#8fe9ff]">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-[#cfd3d9] transition-colors hover:border-[#00e5ff]/35 hover:text-[#edeff2]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}