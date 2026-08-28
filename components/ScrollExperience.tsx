"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import gsap from "gsap";

export type SlideRenderProps = {
  /** true while this slide is the current one, or the one being entered */
  active: boolean;
  /** true only while this slide is mid-entrance */
  entering: boolean;
  /** increments each time this slide is the one being left — drives the blob "beat" */
  beatSignal: number;
};

export type Section = {
  id: string;
  label: string;
  render: (props: SlideRenderProps) => ReactNode;
};

type ScrollCtx = {
  activeIndex: number;
  sections: { id: string; label: string }[];
  goTo: (target: number | string) => void;
};

const ScrollExperienceContext = createContext<ScrollCtx | null>(null);

export function useScrollExperience() {
  const ctx = useContext(ScrollExperienceContext);
  if (!ctx) {
    throw new Error("useScrollExperience must be used inside <ScrollExperience>");
  }
  return ctx;
}

// timing of one section-to-section transition, in seconds
const BEAT = 0.28; // the blob reacts first
const EXIT = 0.42; // current content fades/slides out
const GAP = 0.06;
const ENTER = 0.5; // next content fades/slides in and settles ("snaps")

export default function ScrollExperience({
  sections,
  header,
}: {
  sections: Section[];
  header?: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [beatSignals, setBeatSignals] = useState<number[]>(() => sections.map(() => 0));

  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollAreaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lockRef = useRef(false);
  const activeIndexRef = useRef(0);
  const touchStartY = useRef<number | null>(null);
  // Separate from lockRef (which only covers the animation itself).
  // Trackpads fire a long tail of "wheel" events during momentum/inertial
  // scrolling that can easily outlast the ~1.2s transition — if we only
  // gate on lockRef, leftover ticks from the SAME physical swipe land
  // after the animation lock has released and fire a second (or third)
  // transition. wheelCooldownRef stays engaged for a short quiet period
  // after the LAST wheel tick, not just for the animation's duration, so
  // one swipe reliably advances exactly one section.
  const wheelCooldownRef = useRef(false);
  const wheelQuietTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // cached layout metrics, refreshed on resize/section-change — never read
  // scrollHeight/clientHeight inside the wheel handler itself (that forces
  // a synchronous reflow on every single wheel tick, which is what was
  // actually causing the hang)
  const metricsRef = useRef<{ scrollable: boolean; clientHeight: number; scrollHeight: number }[]>(
    sections.map(() => ({ scrollable: false, clientHeight: 0, scrollHeight: 0 }))
  );

  function measure() {
    scrollAreaRefs.current.forEach((el, i) => {
      if (!el) return;
      metricsRef.current[i] = {
        scrollable: el.scrollHeight > el.clientHeight + 4,
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
      };
    });
  }

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // this experience owns scrolling — lock native page scroll
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  // formalize initial panel visibility (panel 0 starts visible via className already)
  useEffect(() => {
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        autoAlpha: i === 0 ? 1 : 0,
        pointerEvents: i === 0 ? "auto" : "none",
        zIndex: i === 0 ? 10 : 0,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goTo(target: number | string) {
    const nextIndex =
      typeof target === "number" ? target : sections.findIndex((s) => s.id === target);
    const current = activeIndexRef.current;

    if (lockRef.current) return;
    if (nextIndex < 0 || nextIndex >= sections.length || nextIndex === current) return;

    const dir = nextIndex > current ? 1 : -1;
    const currentPanel = panelRefs.current[current];
    const nextPanel = panelRefs.current[nextIndex];
    if (!currentPanel || !nextPanel) return;

    lockRef.current = true;
    setPendingIndex(nextIndex);
    setTransitioning(true);
    // trigger the "blob beat" on the section we're leaving
    setBeatSignals((prev) => {
      const copy = [...prev];
      copy[current] += 1;
      return copy;
    });

    gsap.set(nextPanel, { zIndex: 20, autoAlpha: 0, pointerEvents: "none" });
    gsap.set(currentPanel, { zIndex: 10 });

    const currentContent = currentPanel.querySelectorAll("[data-slide-content]");
    const nextContent = nextPanel.querySelectorAll("[data-slide-content]");

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(currentPanel, { autoAlpha: 0, pointerEvents: "none", zIndex: 0 });
        gsap.set(nextPanel, { zIndex: 10, pointerEvents: "auto", autoAlpha: 1 });
        setActiveIndex(nextIndex);
        setPendingIndex(null);
        setTransitioning(false);
        lockRef.current = false;
        measure(); // content can change between sections, so re-cache heights
      },
    });

    // 1. pause so the blob's reaction registers before anything moves
    tl.to({}, { duration: BEAT });
    // 2. current section fades/slides out
    tl.to(currentContent, { autoAlpha: 0, y: -dir * 32, duration: EXIT, stagger: 0.02 }, ">");
    // 3. next section fades/slides in and snaps to place
    tl.set(nextPanel, { autoAlpha: 1, pointerEvents: "auto" }, `>-${GAP}`);
    tl.fromTo(
      nextContent,
      { autoAlpha: 0, y: dir * 40 },
      { autoAlpha: 1, y: 0, duration: ENTER, stagger: 0.04, ease: "power3.out" },
      "<"
    );
  }

  // How long to wait after the most recent wheel tick, with no further
  // ticks arriving, before another section change is allowed. Re-armed on
  // every qualifying tick, so it only expires once momentum scrolling has
  // actually stopped — no fixed guess about how long a swipe "should" take.
  const WHEEL_QUIET_MS = 220;

  useEffect(() => {
    function armWheelCooldown() {
      wheelCooldownRef.current = true;
      if (wheelQuietTimerRef.current) clearTimeout(wheelQuietTimerRef.current);
      wheelQuietTimerRef.current = setTimeout(() => {
        wheelCooldownRef.current = false;
      }, WHEEL_QUIET_MS);
    }

    function withinInternalScroll(dir: number) {
      const area = scrollAreaRefs.current[activeIndexRef.current];
      const metrics = metricsRef.current[activeIndexRef.current];
      if (!area || !metrics || !metrics.scrollable) return false;
      // only scrollTop is read live here — height/scrollHeight come from
      // the cached metrics, so this never forces a synchronous reflow
      const atTop = area.scrollTop <= 1;
      const atBottom = area.scrollTop + metrics.clientHeight >= metrics.scrollHeight - 1;
      return (dir > 0 && !atBottom) || (dir < 0 && !atTop);
    }

    function onWheel(e: WheelEvent) {
      const dir = e.deltaY > 0 ? 1 : -1;
      if (withinInternalScroll(dir)) return; // let the section scroll internally first
      e.preventDefault();
      if (lockRef.current || wheelCooldownRef.current) {
        // Still part of the same swipe's momentum tail — swallow it, but
        // keep extending the cooldown so a long fling doesn't sneak a
        // second transition in right as it tapers off.
        armWheelCooldown();
        return;
      }
      armWheelCooldown();
      goTo(activeIndexRef.current + dir);
    }

    function onKey(e: KeyboardEvent) {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        goTo(activeIndexRef.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(activeIndexRef.current - 1);
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }
    function onTouchMove(e: TouchEvent) {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(delta) < 48) return;
      const dir = delta > 0 ? 1 : -1;
      if (withinInternalScroll(dir)) return;
      touchStartY.current = null;
      goTo(activeIndexRef.current + dir);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (wheelQuietTimerRef.current) clearTimeout(wheelQuietTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ctxValue = useMemo<ScrollCtx>(
    () => ({
      activeIndex,
      sections: sections.map((s) => ({ id: s.id, label: s.label })),
      goTo,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, sections]
  );

  return (
    <ScrollExperienceContext.Provider value={ctxValue}>
      {header}
      <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden">
        {sections.map((section, i) => (
          <div
            key={section.id}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className={
              i === 0
                ? "absolute inset-0 h-full w-full"
                : "absolute inset-0 h-full w-full invisible opacity-0"
            }
          >
            <div
              ref={(el) => {
                scrollAreaRefs.current[i] = el;
              }}
              className="h-full w-full overflow-y-auto no-scrollbar"
            >
              {section.render({
                active: i === activeIndex || i === pendingIndex,
                entering: transitioning && i === pendingIndex,
                beatSignal: beatSignals[i],
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((section, i) => (
          <button
            key={section.id}
            aria-label={`Go to ${section.label}`}
            onClick={() => goTo(i)}
            className="w-2 h-2 rounded-full cursor-pointer transition-transform"
            style={{
              background: i === activeIndex ? "var(--accent)" : "var(--fg-faint)",
              transform: i === activeIndex ? "scale(1.5)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </ScrollExperienceContext.Provider>
  );
}