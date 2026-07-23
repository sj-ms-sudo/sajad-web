export interface WorkDetail {
  title: string;
  tag: string;
  year: string;
  role: string;
  overview: string;
  problem: string;
  solution: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: string[]; // 1–3 entries — layout adapts to the count
}

export const sampleWorkDetail: WorkDetail = {
  title: 'Psyra Booking Engine',
  tag: 'Platform',
  year: '2024',
  role: 'Full-stack development',
  overview:
    'A psychologist booking and payments platform built for real appointment volume — not a demo. Handles slot availability, payments, and expiry logic under concurrent load.',
  problem:
    'Double-bookings and stale slot data were causing real revenue loss — two users could reserve the same slot within milliseconds of each other, and unpaid holds never expired cleanly.',
  solution:
    'Rebuilt slot reservation around atomic MongoDB updates to guarantee a single winner per slot, added Razorpay webhook verification for payment confirmation, and a cron job that silently releases expired unpaid holds every few minutes.',
  stack: ['NestJS', 'MongoDB', 'Razorpay', 'Cron', 'Next.js'],
  liveUrl: '#',
  githubUrl: '#',
  images: ['/work/psyra-1.jpg', '/work/psyra-2.jpg', '/work/psyra-3.jpg'],
};