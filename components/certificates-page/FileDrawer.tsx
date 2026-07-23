'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FolderClosed, ChevronDown, ExternalLink } from 'lucide-react';
import type { Certificate } from './certificates-data';

interface FileDrawerProps {
  cert: Certificate;
}

export default function FileDrawer({ cert }: FileDrawerProps) {
  const [open, setOpen] = useState(false);

  const rotateX = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const glow = useTransform(springRotateX, [-4, 4], [0, 1]);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(relY * -6);
  };
  const handleLeave = () => rotateX.set(0);

  return (
    <div className="border-b border-white/[0.07]">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: springRotateX, transformPerspective: 800 }}
        className="group relative flex w-full items-center justify-between gap-4 px-2 py-6 text-left [transform-style:preserve-3d] sm:px-4"
      >
        <motion.span
          className="pointer-events-none absolute inset-0 bg-[#00e5ff]/[0.03]"
          style={{ opacity: glow }}
        />

        <div className="relative z-10 flex items-center gap-4 sm:gap-5">
          <span className="font-display text-sm text-[#5b6270]">{cert.index}</span>
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
              open
                ? 'border-[#00e5ff]/50 bg-[#00e5ff]/[0.08] text-[#00e5ff]'
                : 'border-white/10 bg-white/[0.03] text-[#a3aab6]'
            }`}
          >
            <FolderClosed size={17} strokeWidth={1.8} />
          </span>
          <div>
            <h3 className="font-display text-base font-semibold text-[#edeff2] sm:text-lg">
              {cert.title}
            </h3>
            <span className="text-[12.5px] text-[#5b6270]">{cert.issuer}</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <span className="hidden rounded-full border border-[#00e5ff]/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.2)] sm:inline-block">
            {cert.tag}
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={18} className="text-[#5b6270]" />
          </motion.span>
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 border-t border-[#00e5ff]/10 bg-[#00e5ff]/[0.02] px-2 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-4">
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                <div>
                  <span className="block text-[10.5px] uppercase tracking-wide text-[#5b6270]">Issued</span>
                  <span className="text-sm text-[#cfd3d9]">{cert.date}</span>
                </div>
                <div>
                  <span className="block text-[10.5px] uppercase tracking-wide text-[#5b6270]">
                    Credential ID
                  </span>
                  <span className="font-mono text-sm text-[#cfd3d9]">{cert.credentialId}</span>
                </div>
              </div>
              <a
                href={cert.verifyUrl}
                className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#00e5ff]/40 px-4 py-2 text-[12.5px] font-semibold text-[#00e5ff] transition-colors hover:bg-[#00e5ff]/[0.08]"
              >
                Verify
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}