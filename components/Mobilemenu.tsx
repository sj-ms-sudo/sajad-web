"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {FaGithub} from "react-icons/fa";
import {NAV_LINKS} from "./nav-links";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string | null;
}

const panelVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={panelVariants}
          className="fixed inset-0 z-40 flex flex-col bg-[#0A0E17]/97 pt-24 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <motion.li key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`block py-3 font-mono text-3xl tracking-tight transition-colors duration-300 ${
                      active ? "text-[#00E5A0]" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between border-t border-white/10 px-8 py-6"
          >
            <a
              href="https://github.com/sj-ms-sudo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-white/70 transition-colors duration-300 hover:text-[#00E5A0]"
            >
              <FaGithub size={22} strokeWidth={1.75} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:border-[#00E5A0] hover:text-[#00E5A0]"
            >
              Resume
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}