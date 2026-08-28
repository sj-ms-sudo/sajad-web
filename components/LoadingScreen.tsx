"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline({ onComplete: onFinish });

    tl.fromTo(
      trackRef.current,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
    tl.to(
      counter,
      {
        value: 100,
        duration: 1.1,
        ease: "power1.inOut",
        onUpdate: () => setPercent(Math.round(counter.value)),
      },
      "<0.1"
    );
    tl.to({}, { duration: 0.3 }); // hold on 100%
    tl.to(rootRef.current, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const letters = "SAJAD".split("");

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 grid-bg flex flex-col items-center justify-center select-none"
      style={{ background: "var(--bg)" }}
      aria-hidden="true"
    >
      <div className="corner-bracket tl" style={{ top: "38%", left: "34%" }} />
      <div className="corner-bracket tr" style={{ top: "38%", right: "34%" }} />
      <div className="corner-bracket bl" style={{ bottom: "38%", left: "34%" }} />
      <div className="corner-bracket br" style={{ bottom: "38%", right: "34%" }} />

      <div ref={trackRef} className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex gap-3 md:gap-6 text-3xl md:text-5xl font-light tracking-widest">
          {letters.map((l, i) => (
            <span key={i} style={{ color: "var(--fg-faint)" }}>
              {l}
            </span>
          ))}
        </div>
        <div className="eyebrow tabular-nums">{percent}%</div>
      </div>
    </div>
  );
}