"use client";

import dynamic from "next/dynamic";
import {
  SiCss,
  SiJavascript,
  SiTailwindcss,
  SiThreedotjs,
  SiGreensock,
  SiWordpress,
  SiFigma,
  SiGit,
} from "react-icons/si";
import type { SlideRenderProps } from "./ScrollExperience";

const MeshBlob = dynamic(() => import("./CRTmonitor"), { ssr: false });

const STACK = [
  { icon: SiCss, label: "CSS3" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiThreedotjs, label: "Three.js" },
  { icon: SiGreensock, label: "GSAP" },
  { icon: SiWordpress, label: "WordPress" },
  { icon: SiFigma, label: "Figma" },
  { icon: SiGit, label: "Git" },
];

export default function About({ active, beatSignal }: SlideRenderProps) {
  return (
    <div data-slide-content className="grid-bg relative h-full overflow-y-auto px-6 md:px-10 pt-24 pb-16">
      <div className="relative z-10 flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-light">ABOUT</h2>
          <p className="eyebrow mt-2">From concept to launch, I help bring your ideas to life.</p>
        </div>
        <a href="#contact" className="px-5 py-3 border hairline text-sm hover:bg-[var(--surface)] transition-colors">
          Get in touch
        </a>
      </div>

      <div className="relative z-10 grid md:grid-cols-3 border hairline">
        <div className="p-8 border-r hairline flex flex-col justify-between">
          <p className="text-lg md:text-xl leading-relaxed font-light">
            I create websites and digital experiences that combine clean code with thoughtful design.
            From concept to launch, every detail is built with intention.
          </p>
          <div className="grid grid-cols-4 gap-4 mt-10">
            {STACK.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2" title={label}>
                <Icon size={20} style={{ color: "var(--fg-muted)" }} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center border-r hairline min-h-[280px]">
          <MeshBlob amp={0.7} active={active} beatSignal={beatSignal} className="w-56 h-56" />
        </div>

        <div className="relative min-h-[280px] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(120,120,120,0.35), transparent 60%), linear-gradient(160deg, #2a2a2a, #0d0d0d)",
            }}
          />
          <div className="absolute bottom-6 left-6 text-white/80 text-xs tracking-widest uppercase">
            Tim &mdash; Creative Developer
          </div>
        </div>
      </div>
    </div>
  );
}