'use client';

import type { ReactNode } from 'react';

interface MarqueeRowProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  gap?: number;
}

export default function MarqueeRow({
  children,
  speed = 32,
  direction = 'left',
  gap = 20,
}: MarqueeRowProps) {
  return (
    <div className="mask-fade-x w-full overflow-hidden">
      <div
        className="flex w-max animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          gap: `${gap}px`,
        }}
      >
        <div className="flex flex-shrink-0 items-stretch" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex flex-shrink-0 items-stretch" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}