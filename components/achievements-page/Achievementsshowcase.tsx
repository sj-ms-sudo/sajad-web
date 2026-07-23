'use client';

import MarqueeRow from './MarqueeRow';
import AchievementCard from './AchievementCard';
import { milestoneRow, statRow } from './achievements-data';

export default function AchievementsShowcase() {
  return (
    <section className="flex flex-col gap-6 bg-[#050505] py-24">
      <MarqueeRow speed={38} direction="left">
        {milestoneRow.map((item) => (
          <AchievementCard key={item.title} item={item} />
        ))}
      </MarqueeRow>

      <MarqueeRow speed={30} direction="right">
        {statRow.map((item) => (
          <AchievementCard key={item.label} item={item} />
        ))}
      </MarqueeRow>
    </section>
  );
}