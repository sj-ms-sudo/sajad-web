'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { NavLink } from './nav-links';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-4 top-[68px] z-[99] flex flex-col gap-1 rounded-2xl border border-[#00e5ff]/15 bg-[#08090b]/95 p-5 backdrop-blur-xl md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-white/5 px-2 py-3 text-[15px] text-[#cfd3d9]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={onClose}
            className="mt-2.5 flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#1fefc4] px-4 py-2.5 text-[13px] font-semibold text-[#050505]"
          >
            Get in touch <ArrowUpRight size={15} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}