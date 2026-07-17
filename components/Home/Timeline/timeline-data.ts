export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  description: string;
}

export const timelineData: TimelineItem[] = [
  {
    period: '2024 — Present',
    title: 'Software Developer',
    org: 'Psyra & Associated Ventures',
    description:
      'Full-stack development under the founding team, plus mentoring junior interns across the stack.',
  },
  {
    period: '2023 — Present',
    title: 'Developer',
    org: 'Onverse Digital Academy',
    description:
      'Building a digital marketing institution in Nadapuram, Kerala — from curriculum to the Next.js site itself.',
  },
  {
    period: '2022 — 2023',
    title: 'Full-Stack Intern',
    org: 'Psyra & Fedgix Agency',
    description:
      'Next.js, NestJS, and Flutter across client sites; first production exposure to shipping under real deadlines.',
  },
  {
    period: '2020 — Present',
    title: 'B.Tech, Computer Science',
    org: 'College of Engineering Munnar',
    description:
      'IEEE Xtreme Global Top 1000. ISC2 CC & Google Cybersecurity certified alongside coursework.',
  },
];