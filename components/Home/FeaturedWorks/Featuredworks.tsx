'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from '../shared/TiltCard';
import { worksData } from './works-data';
import Image from 'next/image';

export default function FeaturedWorks() {
  return (
    <section id="work" className="bg-[#050505] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff] before:h-px before:w-4 before:bg-[#00e5ff] before:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
        >
          Selected work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 mt-4 font-display text-3xl font-semibold text-[#edeff2] sm:text-4xl"
        >
          Things I&apos;ve built and broken
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {worksData.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard as="a" href={work.href} className="flex h-full flex-col p-7">
                {/* IMG placeholder — swap for <Image src={work.image} .../> when you have real screenshots */}
                <div className="relative mb-6 h-36 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

                <div className="mb-5 flex items-center justify-between">
                  <span className="font-display text-[13px] text-[#5b6270]">{work.index}</span>
                  <span className="rounded-full border border-[#00e5ff]/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#00e5ff]">
                    {work.tag}
                  </span>
                </div>

                <h3 className="mb-2.5 font-display text-[1.3rem] font-semibold text-[#edeff2]">
                  {work.title}
                </h3>
                <p className="mb-5 text-[13.5px] leading-relaxed text-[#a3aab6]">
                  {work.description}
                </p>

                <div className="mb-6 mt-auto flex flex-wrap gap-2">
                  {work.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-[#a3aab6]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#edeff2]">
                  View project
                  <ArrowUpRight size={16} className="text-[#00e5ff]" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}