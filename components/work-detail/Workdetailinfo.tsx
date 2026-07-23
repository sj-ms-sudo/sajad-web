'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import type { WorkDetail } from './work-detail-data';

export default function WorkDetailInfo({ work }: { work: WorkDetail }) {
  return (
    <section className="bg-[#050505] px-6 py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">
              Overview
            </h2>
            <p className="text-[15px] leading-relaxed text-[#a3aab6]">{work.overview}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10"
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">
              The problem
            </h2>
            <p className="text-[15px] leading-relaxed text-[#a3aab6]">{work.problem}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">
              The solution
            </h2>
            <p className="text-[15px] leading-relaxed text-[#a3aab6]">{work.solution}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="h-fit rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
        >
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#8fe9ff]">
            Stack
          </h3>
          <div className="mb-8 flex flex-wrap gap-2">
            {work.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-[#cfd3d9]"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {work.liveUrl && (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#1fefc4] px-5 py-2.5 text-sm font-semibold text-[#050505] transition-transform hover:-translate-y-0.5"
              >
                View live
                <ArrowUpRight size={15} />
              </a>
            )}
            {work.githubUrl && (
              <a
                href={work.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-[#edeff2] transition-all hover:-translate-y-0.5 hover:border-[#00e5ff]/40"
              >
                <FaGithub size={15} />
                Source
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}