"use client";

import { useEffect, useRef, useState } from "react";
import { HiArrowTopRightOnSquare, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import gsap from "gsap";
import type { SlideRenderProps } from "./ScrollExperience";
import OrbitIndicator from "./OrbitIndicator";

type Project = {
  name: string;
  tag: string;
  year?: string;
  role?: string;
  gradient: string;
  accent: string;
  headline: string;
  body: string;
  stack: string[];
  video?: string;
  videoMobile?: string;
  liveUrl?: string;
  githubUrl?: string;
  desktopOnly?: boolean;
};

const PROJECTS: Project[] = [
  {
    name: "Sahal & Co",
    tag: "Creative Performance Agency",
    year: "2026",
    role: "Design & project lead — build executed with interns",
    gradient: "linear-gradient(135deg,#0a0a0a,#1c1a16 50%,#3a3226)",
    accent: "#3b82f6",
    headline: "Stories that sell. Ads that scale.",
    body: "Marketing site for a creative performance agency bridging cinematic production and performance advertising. Editorial, restrained layout built around a moody environmental hero shot, with distinct CTAs for booking, portfolio, and reel — directed the design and build, executed with a small team of interns.",
    stack: ["Next.js", "GSAP", "Tailwind CSS"],
    video: "/projects/sahal-and-co-desktop.mp4",
    videoMobile: "/projects/sahal-and-co-mobile.mp4",
  },
  {
    name: "Psyra Psychologist Portal",
    tag: "Platform",
    year: "2026",
    role: "Full-stack — availability system, auth, payments, dashboard",
    gradient: "linear-gradient(135deg,#0d0d12,#1a1a2e 45%,#5b21b6)",
    accent: "#c084fc",
    headline: "Booking that can't double-book",
    body: "Scheduling and payments subsystem for a psychologist/wellness platform. Availability runs as a strict state machine per psychologist — unavailable → free → locked → booked → expired — with a 30-minute auto-release on stale locks. Razorpay webhooks are HMAC-verified and idempotent, so out-of-order or duplicate deliveries can never double-charge or desync a slot's state. Includes OTP-over-email auth with short-lived JWTs, and the internal Next.js dashboard for managing multi-day availability.",
    stack: ["NestJS", "MongoDB", "JWT", "Razorpay", "Next.js", "React 19", "Tailwind CSS"],
    liveUrl: "https://psyra.in/psychologists",
    githubUrl: "https://github.com/Sahal-Palayat/psyra-web",
  },
  {
    name: "arithma finance",
    tag: "Financial Services",
    gradient: "linear-gradient(135deg,#031225,#0b2447 50%,#1d4ed8)",
    accent: "#60a5fa",
    headline: "Simple, trusted, modern",
    body: "Platform for a financial services partner focused on clarity and trust. Componentized layout system with animated data panels and a bilingual content structure.",
    stack: ["Next.js", "Framer Motion", "Sanity"],
    video: "/projects/arithma-desktop.mp4",
    videoMobile: "/projects/arithma-mobile.mp4",
  },
  {
    name: "north & pine",
    tag: "Hospitality Brand",
    gradient: "linear-gradient(135deg,#1a1206,#3a2a12 50%,#b45309)",
    accent: "#fbbf24",
    headline: "Warm, tactile, considered",
    body: "Brand site for a boutique hospitality group. Editorial layout, custom booking widget, and a photography-led homepage with subtle parallax.",
    stack: ["Webflow", "GSAP", "Shopify"],
    video: "/projects/north-pine-desktop.mp4",
    videoMobile: "/projects/north-pine-mobile.mp4",
  },
];

const BEAT = 0.22;
const EXIT = 0.36;
const ENTER = 0.46;

export default function SelectedWork({ active, beatSignal }: SlideRenderProps) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [localBeat, setLocalBeat] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lockRef = useRef(false);
  const indexRef = useRef(0);
  const touchStartY = useRef<number | null>(null);
  // Same issue as ScrollExperience's section wheel handler: momentum-scroll
  // ticks from one swipe can keep arriving after lockRef releases and fire
  // an extra project change. This cooldown re-arms on every tick and only
  // clears once the ticks actually stop for a short beat.
  const wheelCooldownRef = useRef(false);
  const wheelQuietTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const WHEEL_QUIET_MS = 220;

  const project = PROJECTS[index];

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (active && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [active, index]);

  function goToProject(next: number, dir: number) {
    if (lockRef.current) return;
    if (next < 0 || next >= PROJECTS.length) return;
    const stage = stageRef.current;
    if (!stage) return;

    lockRef.current = true;
    setLocalBeat((b) => b + 1);

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        setTimeout(() => {
          lockRef.current = false;
        }, 120);
      },
    });

    tl.to({}, { duration: BEAT });
    tl.to(stage, { autoAlpha: 0, y: -dir * 28, duration: EXIT }, ">");
    tl.call(() => setIndex(next));
    tl.set(stage, { y: dir * 36 });
    tl.to(stage, { autoAlpha: 1, y: 0, duration: ENTER, ease: "power3.out" });
  }

  // Attached on window with capture:true so this always runs BEFORE
  // ScrollExperience's own window-level (bubble-phase) wheel listener,
  // regardless of DOM nesting or registration order. Only lets the event
  // fall through to ScrollExperience (which advances the page section)
  // when we're already at the first/last project.
  useEffect(() => {
    if (!active) return;

    function armWheelCooldown() {
      wheelCooldownRef.current = true;
      if (wheelQuietTimerRef.current) clearTimeout(wheelQuietTimerRef.current);
      wheelQuietTimerRef.current = setTimeout(() => {
        wheelCooldownRef.current = false;
      }, WHEEL_QUIET_MS);
    }

    function onWheel(e: WheelEvent) {
      const dir = e.deltaY > 0 ? 1 : -1;
      const atBoundary =
        (dir > 0 && indexRef.current === PROJECTS.length - 1) ||
        (dir < 0 && indexRef.current === 0);
      if (atBoundary) return; // let ScrollExperience handle section change
      e.preventDefault();
      e.stopImmediatePropagation();
      if (lockRef.current || wheelCooldownRef.current) {
        // Still the same swipe's momentum tail — swallow it and keep
        // extending the cooldown rather than letting a second project
        // change sneak in as the fling tapers off.
        armWheelCooldown();
        return;
      }
      armWheelCooldown();
      goToProject(indexRef.current + dir, dir);
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }
    function onTouchMove(e: TouchEvent) {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(delta) < 48) return;
      const dir = delta > 0 ? 1 : -1;
      const atBoundary =
        (dir > 0 && indexRef.current === PROJECTS.length - 1) ||
        (dir < 0 && indexRef.current === 0);
      if (atBoundary) return;
      touchStartY.current = null;
      if (lockRef.current) {
        e.stopImmediatePropagation();
        return;
      }
      e.stopImmediatePropagation();
      goToProject(indexRef.current + dir, dir);
    }

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      if (wheelQuietTimerRef.current) clearTimeout(wheelQuietTimerRef.current);
      wheelCooldownRef.current = false;
    };
  }, [active]);

  return (
    <div ref={rootRef} data-slide-content className="grid-bg relative h-full flex flex-col overflow-hidden">
      <div className="px-6 md:px-10 pt-24 pb-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-light">SELECTED WORK</h2>
            <p className="eyebrow mt-2">A curated collection of web development projects</p>
          </div>
          <a href="#contact" className="px-5 py-3 border hairline text-sm hover:bg-[var(--surface)] transition-colors">
            Start a Project
          </a>
        </div>
      </div>

      <div ref={stageRef} className="relative z-10 flex-1 min-h-0 px-6 md:px-10 flex items-center">
        <div className="w-full grid md:grid-cols-[auto_1fr_auto_320px] gap-6 items-stretch">
          <div className="hidden md:flex items-center justify-center w-40">
            <OrbitIndicator
              total={PROJECTS.length}
              index={index}
              active={active}
              beatSignal={beatSignal + localBeat}
            />
          </div>

          <div className="border hairline overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b hairline">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--fg-faint)" }} />
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--fg-faint)" }} />
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--fg-faint)" }} />
            </div>
            <div className="relative aspect-video">
              <div className="absolute inset-0" style={{ background: project.gradient }} />

              {project.video && (
                <video
                  key={index}
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  {project.videoMobile && <source src={project.videoMobile} media="(max-width: 767px)" />}
                  <source src={project.video} />
                </video>
              )}

              {project.video ? (
                <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] tracking-widest uppercase" style={{ background: "rgba(0,0,0,0.55)", color: project.accent }}>
                  {project.tag}
                </div>
              ) : (
                <div
                  className="absolute inset-0 flex flex-col justify-center px-8"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)" }}
                >
                  <div className="text-xs tracking-widest uppercase mb-3" style={{ color: project.accent }}>
                    {project.tag}
                  </div>
                  <div className="text-2xl md:text-4xl font-medium text-white leading-tight max-w-sm">
                    {project.headline}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block w-40 border hairline overflow-hidden self-stretch">
            <div className="relative h-full">
              <div className="absolute inset-0" style={{ background: project.gradient }} />
              <div
                className="absolute inset-0 flex flex-col justify-center px-4"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)" }}
              >
                <div className="text-[9px] tracking-widest uppercase mb-2" style={{ color: project.accent }}>
                  {project.tag}
                </div>
                <div className="text-sm font-medium text-white leading-tight">{project.headline}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 border hairline">
            <div>
              {project.role && (
                <div className="dev-label mb-2" style={{ opacity: 0.7 }}>
                  {project.year ? `${project.year} — ` : ""}{project.role}
                </div>
              )}
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                {project.body}
              </p>
            </div>
            <div className="flex gap-3 mt-6 flex-wrap">
              {project.stack.map((s) => (
                <span key={s} className="eyebrow px-2 py-1 border hairline">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t hairline">
        <button
          onClick={() => goToProject(index - 1, -1)}
          aria-label="Previous project"
          className="p-4 hover:bg-[var(--surface)] transition-colors cursor-pointer disabled:opacity-30"
          disabled={index === 0}
        >
          <HiChevronLeft size={18} />
        </button>

        {project.liveUrl && !(project.desktopOnly && isMobile) ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live project"
            className="p-4 hover:bg-[var(--surface)] transition-colors"
          >
            <HiArrowTopRightOnSquare size={16} />
          </a>
        ) : (
          <span
            className="p-4 opacity-30"
            title={project.desktopOnly && isMobile ? "Best viewed on desktop" : undefined}
          >
            <HiArrowTopRightOnSquare size={16} />
          </span>
        )}

        <div className="text-sm tracking-wide">{project.name}</div>

        <button
          onClick={() => goToProject(index + 1, 1)}
          aria-label="Next project"
          className="p-4 hover:bg-[var(--surface)] transition-colors cursor-pointer disabled:opacity-30"
          disabled={index === PROJECTS.length - 1}
        >
          <HiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}