"use client";

import { useState } from "react";
import { useTheme } from "@/app/theme-context";
import { useScrollExperience } from "./ScrollExperience";
import { HiOutlineMoon, HiOutlineSun, HiOutlineTranslate } from "react-icons/hi";
import { HiOutlineBars2, HiXMark } from "react-icons/hi2";

const NAV_IDS = ["work", "about", "services", "contact"];
const NAV_LABELS: Record<string, string> = {
  work: "Work",
  about: "About",
  services: "Services",
  contact: "Contact",
};

export default function Header() {
  const { theme, toggle } = useTheme();
  const { goTo } = useScrollExperience();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "NL">("EN");

  function nav(id: string) {
    setMenuOpen(false);
    goTo(id);
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-stretch justify-between border-b hairline"
        style={{ background: "var(--bg)" }}
      >
        <button
          onClick={() => nav("hero")}
          className="flex items-center px-6 py-5 border-r hairline text-lg tracking-wide select-none cursor-pointer"
        >
          <span style={{ color: "var(--accent)" }}>S</span>
          <span style={{ color: "var(--fg)" }}>J</span>
        </button>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex items-center justify-center w-16 border-r hairline text-xs tracking-widest hover:bg-[var(--surface)] transition-colors cursor-pointer"
          style={{ color: "var(--fg-muted)" }}
        >
          {menuOpen ? <HiXMark size={16} /> : <HiOutlineBars2 size={18}/>}
        </button>

        <div className="flex-1" />

        {/* <button
          onClick={() => setLang((l) => (l === "EN" ? "NL" : "EN"))}
          aria-label="Toggle language"
          className="flex items-center gap-1.5 px-5 border-l hairline text-xs hover:bg-[var(--surface)] transition-colors cursor-pointer"
          style={{ color: "var(--fg-muted)" }}
        >
          <HiOutlineTranslate size={14} />
          <span>{lang}</span>
        </button> */}

        <button
          onClick={toggle}
          aria-label="Toggle color theme"
          className="flex items-center justify-center w-16 border-l hairline text-xs tracking-widest hover:bg-[var(--surface)] transition-colors cursor-pointer"
          style={{ color: "var(--fg-muted)" }}
        >
          {theme === "light" ? <HiOutlineSun size={24}/> : <HiOutlineMoon size={24}/>}
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "var(--bg)" }}
      >
        {NAV_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => nav(id)}
            className="text-4xl md:text-6xl font-light tracking-tight hover:text-[var(--accent)] transition-colors cursor-pointer"
            style={{
              transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <span className="eyebrow mr-4 align-super">0{i + 1}</span>
            {NAV_LABELS[id]}
          </button>
        ))}
      </div>
    </>
  );
}