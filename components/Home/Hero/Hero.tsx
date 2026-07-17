'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import HeroParticles from './HeroParticles';
import TypedRoles from './TypedRoles';
import TerminalCard from './TerminalCard';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center bg-[radial-gradient(ellipse_at_50%_0%,#0d1114_0%,#050505_60%)]"
    >
      <HeroParticles />

      {/* fog + vignette layers */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.7)_0%,rgba(5,5,5,0.1)_35%,rgba(5,5,5,0.3)_65%,#050505_100%)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.85)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:pt-0">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#00e5ff]/25 bg-[#00e5ff]/[0.07] px-3.5 py-1.5 text-[12.5px] font-medium uppercase tracking-wide text-[#8fe9ff]"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e5ff] shadow-[0_0_8px_2px_rgba(0,229,255,0.8)]" />
            Kannur, Kerala
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[2.4rem] font-semibold leading-[1.08] tracking-tight text-[#edeff2] sm:text-[3.4rem] lg:text-[3.8rem]"
          >
            Sajad Mashood A
            <br />
            <TypedRoles />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-[520px] text-[15.5px] leading-relaxed text-[#a3aab6]"
          >
            I build production software by day and break vulnerable systems by night.

            Full-stack engineer focused on AI, backend architecture and offensive security. 
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="flex items-center gap-2 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#1fefc4] px-6 py-3 text-sm font-semibold text-[#050505] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,229,255,0.35)]"
            >
              View my work
              <ArrowRight size={16} />
            </a>
            <a
              href="/resume.pdf"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-[#edeff2] transition-all hover:-translate-y-0.5 hover:border-[#00e5ff]/40 hover:bg-[#00e5ff]/[0.06]"
            >
              <FileDown size={16} />
              Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <TerminalCard />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-widest text-[#5b6270]"
      >
        <span className="h-7 w-px animate-scroll-line bg-gradient-to-b from-[#00e5ff] to-transparent" />
        Scroll
      </motion.div>
    </section>
  );
}