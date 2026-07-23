'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks } from './nav-links';
import MobileMenu from './MobileMenu';
import Logo3D from '../logo/logo3d';
import LogoMark from '../logo/logomark';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-500 ${
          scrolled
            ? 'border-[#00e5ff]/15 bg-[#050505]/75 backdrop-blur-xl shadow-[0_1px_24px_rgba(0,229,255,0.06)]'
            : 'border-transparent bg-transparent'
        }`}
      >
        
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/">
          <LogoMark/>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-[13px] font-medium uppercase tracking-wide text-[#a8afba] transition-colors hover:text-[#edeff2]"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#00e5ff] to-[#ff2e9a] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#1fefc4] px-4.5 py-2 text-[13px] font-semibold text-[#050505] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,229,255,0.35)] md:flex"
            >
              Get in touch
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="rounded-lg border border-white/10 p-2 text-[#edeff2] md:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}