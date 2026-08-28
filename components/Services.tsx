"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import type { SlideRenderProps } from "./ScrollExperience";

const MeshBlob = dynamic(() => import("./CRTmonitor"), { ssr: false });

const SERVICES = [
  {
    line1: "web",
    line2: "development",
    body: "Digital products with a premium presence — from concept to launch, built to perform and leave an impression.",
  },
  {
    line1: "motion",
    line2: "design",
    body: "Motion as storytelling: transitions and micro-animations that bring rhythm, tension, and presence.",
  },
  {
    line1: "brand",
    line2: "identity",
    body: "Visual systems that carry a consistent voice across every touchpoint, from the first pixel to the last.",
  },
  {
    line1: "3d &",
    line2: "webgl",
    body: "Real-time 3D and shader work that turns a static page into something worth exploring.",
  },
  {
    line1: "seo &",
    line2: "performance",
    body: "Fast, accessible, and built to be found — performance budgets treated as a feature, not an afterthought.",
  },
  {
    line1: "ongoing",
    line2: "support",
    body: "Websites are never really finished. Iterative improvements, monitoring, and content updates over time.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Tim has been one of the best collaborative experiences so far. Besides his great communication skills and professionalism, he is someone who is willing to think with you and help you achieve the best results. We are beyond satisfied with our website!",
    name: "Mowgli",
    role: "Founder — Water To Sustain",
  },
  {
    quote:
      "I am very satisfied with Tim's all-round service. He not only executes the assignment, but actively thinks along and provides expert advice. I'm very happy with the delivered website, and just as happy with how we went through the process together beforehand.",
    name: "Daniël de Graaf",
    role: "Co-founder — Arithma",
  },
  {
    quote:
      "Clear communication from day one, and the end result exceeded what we briefed. Our new site loads instantly and finally feels like us.",
    name: "Priya Nair",
    role: "Marketing Lead — North & Pine",
  },
];

export default function Services({ active, beatSignal }: SlideRenderProps) {
  const [svcIndex, setSvcIndex] = useState(0);
  const [testIndex, setTestIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setSvcIndex((i) => (i + 1) % SERVICES.length), 4500);
    return () => clearInterval(t);
  }, [active]);

  const service = SERVICES[svcIndex];
  const testimonial = TESTIMONIALS[testIndex];

  const nextTest = () => setTestIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prevTest = () => setTestIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div data-slide-content className="grid-bg relative h-full overflow-y-auto px-6 md:px-10 pt-24 pb-16">
      <div className="relative z-10 flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="eyebrow mb-2">Code, performance, and design working together. Without compromise.</p>
          <h2 className="text-2xl md:text-4xl font-light tracking-wide" style={{ color: "var(--fg-faint)" }}>
            RELIABLE <span style={{ color: "var(--fg)" }}>CREATIVE</span> VERSATILE
          </h2>
        </div>
        <a href="#contact" className="px-5 py-3 border hairline text-sm hover:bg-[var(--surface)] transition-colors">
          Get in touch
        </a>
      </div>

      <div className="relative z-10 grid md:grid-cols-[220px_1fr_1fr_260px] border-t border-l hairline">
        <div className="flex md:flex-col gap-2 p-6 border-r border-b hairline">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSvcIndex(i)}
              aria-label={`Service ${i + 1}`}
              className="w-3 h-3 transition-colors cursor-pointer"
              style={{ background: i === svcIndex ? "var(--fg)" : "var(--fg-faint)" }}
            />
          ))}
        </div>

        <div className="p-6 border-r border-b hairline flex flex-col justify-center min-h-[220px]">
          <div className="text-3xl md:text-4xl font-light" style={{ color: "var(--fg-muted)" }}>
            {service.line1}
          </div>
          <div className="inline-block text-3xl md:text-4xl font-medium px-2" style={{ background: "var(--surface-strong)" }}>
            {service.line2}
          </div>
          <p className="mt-6 text-sm leading-relaxed max-w-xs" style={{ color: "var(--fg-muted)" }}>
            {service.body}
          </p>
        </div>

        <div className="grid grid-cols-2 border-r border-b hairline">
          <div className="p-6 border-r border-b hairline flex flex-col justify-center">
            <div className="text-2xl font-light">23+</div>
            <div className="eyebrow mt-1">Projects Delivered</div>
          </div>
          <div className="p-6 border-b hairline flex flex-col justify-center">
            <div className="text-2xl font-light">13+</div>
            <div className="eyebrow mt-1">Years Experience</div>
          </div>
          <div className="p-6 border-r hairline flex flex-col justify-center">
            <div className="text-2xl font-light">56%</div>
            <div className="eyebrow mt-1">Repeat Clients</div>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="text-2xl font-light">100%</div>
            <div className="eyebrow mt-1">Remote Friendly</div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center border-b hairline min-h-[220px]">
          <MeshBlob amp={0.6} active={active} beatSignal={beatSignal} className="w-40 h-40" />
        </div>
      </div>

      <div className="relative z-10 grid md:grid-cols-[80px_1fr] border-l border-r border-b hairline">
        <div className="flex md:flex-col hairline border-b md:border-b-0 md:border-r">
          <button onClick={prevTest} className="flex-1 flex items-center justify-center p-4 border-r md:border-r-0 md:border-b hairline hover:bg-[var(--surface)] transition-colors cursor-pointer" aria-label="Previous testimonial">
            <HiChevronLeft size={16} />
          </button>
          <button onClick={nextTest} className="flex-1 flex items-center justify-center p-4 hover:bg-[var(--surface)] transition-colors cursor-pointer" aria-label="Next testimonial">
            <HiChevronRight size={16} />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <p className="italic text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: "var(--fg-muted)" }}>
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="mt-4 text-sm">
            <span className="font-medium">{testimonial.name}</span>
            <span style={{ color: "var(--fg-muted)" }}> &middot; {testimonial.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}