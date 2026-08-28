"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { SlideRenderProps } from "./ScrollExperience";

const MeshBlob = dynamic(() => import("./CRTmonitor"), { ssr: false });

export default function Hero({ active, beatSignal }: SlideRenderProps) {
  const [hover, setHover] = useState(false);

    return (
    <div data-slide-content className="grid-bg relative h-full pt-24 overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="flex flex-col justify-between p-6 md:p-10 border-r hairline">
          <div className="eyebrow">[ 01 ] ROLE — SOFTWARE ENGINEER</div>
          <div className="text-3xl md:text-5xl font-light leading-tight" style={{ color: "var(--fg-faint)" }}>
            ENGINEERING
            AT THE EDGE
            <br />
            OF WHAT'S
            UNDERSTOOD
          </div>
          <div className="space-y-1.5">
            <div className="metadata-row"><span>CONTACT</span><span>mashoodsajad@gmail.com</span></div>
            <div className="metadata-row"><span>PHONE</span><span>+91 85906 42470</span></div>
          </div>
        </div>

        <div
          className="relative flex items-center justify-center border-r hairline min-h-[320px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="corner-bracket tl" />
            <div className="corner-bracket tr" />
            <div className="corner-bracket bl" />
            <div className="corner-bracket br" />

            <MeshBlob
              amp={hover ? 0.85 : 0.45}
              active={active}
              beatSignal={beatSignal}
              className="w-full h-full"
            />

            <div
              className={`dev-label blink-cursor absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-300 ${
                hover ? "opacity-75" : "opacity-0"
              }`}
            >
              ENTITY.STATUS: {hover ? "ALERT" : "OBSERVING"}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 md:p-10 text-right items-end">
          <div className="eyebrow">[ 02 ] LOCATION — KERALA, INDIA</div>
          <div className="text-3xl md:text-5xl font-light leading-tight" style={{ color: "var(--fg-faint)" }}>
            WEB DEV,
            COMPUTER VISION,
            <br />
            AI SYSTEMS,
            SECURITY
          </div>
          <div className="eyebrow">[ 04 ] STATUS — AVAILABLE FOR WORK</div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full opacity-40" style={{ background: "var(--fg-muted)" }} />
    </div>
  );
}