'use client';

import { motion } from 'framer-motion';
import ContactBackdrop from './ContactBackdrop';
import ContactForm from './Contactform';
import SocialLinks from './SocialLinks';

export default function ContactPanel() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#0a1416_0%,#050505_60%)] px-6 py-32">
      <ContactBackdrop />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.85)]" />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff] before:h-px before:w-4 before:bg-[#00e5ff] before:shadow-[0_0_24px_rgba(0,229,255,0.35)]"
        >
          Contact
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display text-4xl font-semibold leading-tight text-[#edeff2] sm:text-5xl"
        >
          Let&apos;s build
          <br />
          <span className="bg-gradient-to-r from-[#00e5ff] via-[#1fefc4] to-[#ff2e9a] bg-clip-text text-transparent">
            something worth shipping.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-sm text-[15px] leading-relaxed text-[#a3aab6]"
        >
          Open to full-stack, backend, and AI/ML roles — reach out directly or
          use the form below.
        </motion.p>

        <div className="mt-10">
          <ContactForm />
        </div>

        <div className="mt-10">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}