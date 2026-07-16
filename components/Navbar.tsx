"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight,Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { NAV_LINKS } from "./nav-links";
import MobileMenu from "./Mobilemenu";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={scrolled ? "scrolled" : "top"}
        variants={{
          top: { backgroundColor: "rgba(10,14,23,0)", borderColor: "rgba(255,255,255,0)" },
          scrolled: { backgroundColor: "rgba(10,14,23,0.72)", borderColor: "rgba(255,255,255,0.08)" },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-xl"
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:h-24 md:px-10"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="SJ — home"
            className="flex items-baseline gap-[2px] rounded-sm font-mono text-xl font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5A0]/70"
          >
            <span>SJ</span>
            <span
              aria-hidden="true"
              className="ml-[2px] h-[1.05em] w-[2px] translate-y-[1px] bg-[#00E5A0] motion-safe:animate-blink"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-1 text-sm uppercase tracking-wide transition-colors duration-300 focus-visible:outline-none ${
                      active ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#00E5A0] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                        active ? "scale-x-100" : ""
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop right cluster */}
          <div className="hidden items-center gap-5 md:flex">
            <a
              href="https://github.com/sj-ms-sudo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-white/65 transition-colors duration-300 hover:text-[#00E5A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5A0]/70 rounded-sm"
            >
              <FaGithub size={19} strokeWidth={1.75} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:border-[#00E5A0] hover:text-[#00E5A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5A0]/70"
            >
              Resume
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5A0]/70 rounded-sm"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}