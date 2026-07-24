'use client';

import { useEffect, useRef } from 'react';
import SplitGalleryItem from './SplitGalleryItem';
import { worksPageData } from './works-data';
import Link from 'next/link';

/**
 * Infinite vertical scroll: renders 3 copies of the dataset back to back
 * inside a single scrollable panel, and silently jumps scrollTop by one
 * "set height" whenever the user nears either end — so scrolling forever
 * loops without ever visibly resetting. Parallax is handled per-item in
 * SplitGalleryItem, tracked relative to this container.
 */
export default function SplitScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const loopedItems = [...worksPageData, ...worksPageData, ...worksPageData];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // wait a tick for layout (3D canvas, fonts, images) to settle before
    // measuring — otherwise the initial "middle copy" position goes stale
    // the moment anything shifts scrollHeight, and the very first scroll
    // wraps against outdated numbers.
    const raf = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight / 3;
    });

    const handleScroll = () => {
      // ignore the scroll event caused by our own programmatic jump below —
      // otherwise it re-enters this handler and fights itself
      if (isJumping.current) {
        isJumping.current = false;
        return;
      }

      const setHeight = el.scrollHeight / 3;
      if (el.scrollTop < setHeight * 0.5) {
        isJumping.current = true;
        el.scrollTop += setHeight;
      } else if (el.scrollTop > setHeight * 1.5) {
        isJumping.current = true;
        el.scrollTop -= setHeight;
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative bg-[#050505]">
      
      <div ref={containerRef} className="scrollbar-hide h-screen w-full overflow-y-scroll">
        {loopedItems.map((work, i) => (
  <Link
    key={`${work.title}-${i}`}
    href={work.href}
  >
    <SplitGalleryItem
      work={work}
      containerRef={containerRef}
      reversed={i % 2 === 1}
    />
  </Link>
))}
      </div>

      {/* fixed corner hint, not part of scroll loop */}
      <span className="pointer-events-none absolute right-6 top-6 z-10 text-[11px] uppercase tracking-widest text-[#5b6270]">
        Scroll — loops infinitely
      </span>
    </section>
  );
}