'use client';

import { motion } from 'framer-motion';
import { timelineData } from './timeline-data';

export default function Timeline() {
  return (
    <section id="timeline" className="bg-[#050505] px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff] before:h-px before:w-4 before:bg-[#00e5ff] before:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
        >
          Trajectory
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 mt-4 font-display text-3xl font-semibold text-[#edeff2] sm:text-4xl"
        >
          How I got here
        </motion.h2>

        <div className="relative pl-8">
          <span className="absolute left-1 top-1.5 bottom-1.5 w-px bg-gradient-to-b from-[#00e5ff]/35 to-transparent" />

          {timelineData.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_10px_2px_rgba(0,229,255,0.6)]" />
              <span className="text-xs font-semibold uppercase tracking-wide text-[#00e5ff]">
                {item.period}
              </span>
              <h3 className="mb-0.5 mt-2 font-display text-xl font-semibold text-[#edeff2]">
                {item.title}
              </h3>
              <span className="text-[13px] text-[#5b6270]">{item.org}</span>
              <p className="mt-2.5 max-w-[500px] text-sm leading-relaxed text-[#a3aab6]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}