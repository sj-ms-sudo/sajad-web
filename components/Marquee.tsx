"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { SlideRenderProps } from "./ScrollExperience";

export default function Marquee({ active }: SlideRenderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !trackRef.current) return;
    const tween = gsap.fromTo(
      trackRef.current,
      { x: 0 },
      { x: -60, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 }
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  const letters = "VANLENT".split("");

  return (
    <div
      data-slide-content
      className="grid-bg relative h-full pt-24 flex items-center justify-between overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="corner-bracket tl" style={{ top: "40%", left: "36%" }} />
      <div className="corner-bracket tr" style={{ top: "40%", right: "36%" }} />
      <div className="corner-bracket bl" style={{ bottom: "40%", left: "36%" }} />
      <div className="corner-bracket br" style={{ bottom: "40%", right: "36%" }} />

      <div
        ref={trackRef}
        className="relative z-10 w-full flex justify-between px-6 md:px-16 text-3xl md:text-5xl font-light tracking-widest"
        style={{ color: "var(--fg-faint)" }}
      >
        {letters.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </div>
  );
}
