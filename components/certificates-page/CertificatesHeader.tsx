'use client';

import { motion } from 'framer-motion';
import CertificatesBackdrop from './CertificatesBackdrop';

export default function CertificatesHeader() {
  return (
    <header className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#0a1416_0%,#050505_60%)] px-6 pb-24 pt-40">
      <CertificatesBackdrop />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.2)_0%,rgba(5,5,5,0.1)_40%,#050505_100%)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.85)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff] before:h-px before:w-4 before:bg-[#00e5ff] before:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
        >
          Certificates
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-[#edeff2] sm:text-5xl"
        >
          Credentials on
          <br />
          <span className="bg-gradient-to-r from-[#00e5ff] via-[#1fefc4] to-[#ff2e9a] bg-clip-text text-transparent">
            record.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-md text-[15px] leading-relaxed text-[#a3aab6]"
        >
          Pull a drawer open to see the details — issuer, date, and a
          verification link for each one.
        </motion.p>
      </div>
    </header>
  );
}