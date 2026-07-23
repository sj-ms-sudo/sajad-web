export interface MilestoneItem {
  type: 'milestone';
  year: string;
  title: string;
  description: string;
  href?: string;
}

export interface StatItem {
  type: 'stat';
  value: number;
  suffix?: string;
  label: string;
}

export type AchievementItem = MilestoneItem | StatItem;

export const milestoneRow: MilestoneItem[] = [
  {
    type: 'milestone',
    year: '2023',
    title: 'IEEE Xtreme — Global Top 1000',
    description: 'Ranked in the global top 1000 out of thousands of competing teams.',
  },
  {
    type: 'milestone',
    year: '2024',
    title: 'ISC2 CC — exam passed',
    description: 'Passed the Certified in Cybersecurity exam; certificate pending annual membership fee.',
  },
  {
    type: 'milestone',
    year: '2024',
    title: 'LeetCode — Knight badge',
    description: 'Consistent problem-solving across arrays, DP, and graph problems.',
    href: '#',
  },
  {
    type: 'milestone',
    year: '2023',
    title: 'HackerRank — 5★ Problem Solving',
    description: 'Five-star rating in Problem Solving, verified on public profile.',
    href: '#',
  },
  {
    type: 'milestone',
    year: '2024',
    title: 'PicoCTF — Rank in top tier',
    description: 'Solved binary exploitation, crypto, and web challenges under time pressure.',
    href: '#',
  },
  {
    type: 'milestone',
    year: '2024',
    title: 'PortSwigger Web Security Academy',
    description: 'Cleared Apprentice and Practitioner-level labs across multiple vulnerability classes.',
    href: '#',
  },
];

export const statRow: StatItem[] = [
  { type: 'stat', value: 4, suffix: '+', label: 'Years building' },
  { type: 'stat', value: 12, suffix: '+', label: 'Projects shipped' },
  { type: 'stat', value: 1000, label: 'IEEE Xtreme global rank' },
  { type: 'stat', value: 0, suffix: '%ile', label: 'GATE CS percentile' },
  { type: 'stat', value: 6, suffix: '+', label: 'Stacks worked across' },
];