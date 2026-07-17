'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function CallToAction() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] px-6 py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.1),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff] before:h-px before:w-4 before:bg-[#00e5ff] before:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
        >
          Contact
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 mt-4 font-display text-4xl font-semibold leading-tight text-[#edeff2] sm:text-5xl"
        >
          Have something worth
          <br />
          <span className="bg-gradient-to-r from-[#00e5ff] to-[#ff2e9a] bg-clip-text text-transparent">
            building or breaking?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-md text-[15.5px] leading-relaxed text-[#a3aab6]"
        >
          Open to full-stack, backend, and AI/ML roles — and always up for a
          conversation about a system worth stress-testing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:you@example.com"
            className="flex items-center gap-2 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#1fefc4] px-7 py-3.5 text-sm font-semibold text-[#050505] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,229,255,0.35)]"
          >
            <Mail size={16} />
            Email me
          </a>
          <a
            href="https://github.com/sj-ms-sudo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-[#edeff2] transition-all hover:-translate-y-0.5 hover:border-[#00e5ff]/40"
          >
            GitHub
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}