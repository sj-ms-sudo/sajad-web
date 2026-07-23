'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { Sparkles, Trophy } from 'lucide-react';
import type { AchievementItem } from './achievements-data';

interface AchievementCardProps {
  item: AchievementItem;
}

function useCountUp(target: number, active: boolean, duration = 1.3) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, target, duration]);
  return value;
}

export default function AchievementCard({ item }: AchievementCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  if (item.type === 'stat') {
    const count = useCountUp(item.value, inView);
    return (
      <div
        ref={ref}
        className="flex w-52 flex-shrink-0 flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
      >
        <Sparkles size={16} className="text-[#00e5ff]" />
        <div>
          <div className="mt-4 bg-gradient-to-r from-[#00e5ff] to-[#1fefc4] bg-clip-text font-display text-3xl font-semibold text-transparent">
            {count}
            {item.suffix ?? ''}
          </div>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[#a3aab6]">{item.label}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex w-72 flex-shrink-0 flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-[#00e5ff]/30"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#00e5ff]/25 bg-[#00e5ff]/[0.06] text-[#00e5ff]">
          <Trophy size={15} strokeWidth={1.8} />
        </span>
        <span className="text-[11px] text-[#5b6270]">{item.year}</span>
      </div>
      <div className="mt-5">
        <h3 className="font-display text-[1.02rem] font-semibold leading-snug text-[#edeff2]">
          {item.href ? (
            <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-[#00e5ff]">
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#a3aab6]">{item.description}</p>
      </div>
    </div>
  );
}