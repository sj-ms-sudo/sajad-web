export interface WorkDetail {
  title: string;
  slug:string;
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

export const workDetails: WorkDetail[] = [
  {
    title: 'Psyra Psychologist Portal',
    tag: 'Platform',
    slug: 'psyra-psychologist-portal',
    year: '2026',
    role: 'Full-stack development — availability system, auth, payments, dashboard UI',
    overview:
      'A scheduling and booking subsystem for Psyra, a psychologist/wellness platform. Gives psychologists a dedicated portal to manage their own appointment availability, while client-side bookings and Razorpay payments reliably reserve the correct time slot.',
    problem:
      'Coordinating live availability across many independent psychologists while accepting real-time payments creates real risk of double-booking, stale availability data, and payment/booking state drifting out of sync — especially since payment webhooks can arrive out of order or more than once.',
    solution:
      'Modeled availability as a 24-slot-per-day document per psychologist with a strict state machine (unavailable → free → locked → booked → expired), enforced by cron jobs and a 30-minute auto-release on stale locks. Built OTP-over-email authentication with short-lived JWT access + refresh tokens. Wired Razorpay payments through HMAC-verified, idempotent webhook handling that flips the correct slot to booked on success, with non-blocking email and Meta Conversions API side effects so a notification failure can never fail the payment flow. Built the internal Next.js dashboard — time-slot grid, bulk action toolbar, and a date-range modal for multi-day scheduling.',
    stack: [
      'NestJS',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Razorpay',
      'Next.js',
      'React 19',
      'Tailwind CSS',
      'Radix UI',
      '@nestjs/schedule',
    ],
    liveUrl: 'https://psyra.in/psychologists',
    githubUrl: 'https://github.com/Sahal-Palayat/psyra-web',
    images: [
      '/works/psyra-dashboard.jpg',
      '/works/psyra-admin-availability.jpg',
      '/works/psyra-booking-flow.jpg',
      '/works/psyra-public-listing.jpg',
    ],
  },
];

export function getWorkBySlug(slug: string): WorkDetail | undefined {
  return workDetails.find((w) => w.slug === slug);
}