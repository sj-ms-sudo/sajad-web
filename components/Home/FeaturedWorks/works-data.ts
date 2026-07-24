export interface WorkItem {
  index: string;
  tag: string;
  slug:string;
  title: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
}

export const worksData: WorkItem[] = [
  {
    index: '01',
    slug: 'psyra-psychologist-portal',
    tag: 'Platform',
    title: 'Psyra Psychologist Portal',
    description:
      'Psychologist scheduling & booking system with OTP auth, a 24-slot daily availability grid, and Razorpay webhook-driven payment-to-slot booking.',
    stack: ['NestJS', 'MongoDB', 'Next.js', 'Razorpay'],
    href: '/works/psyra-psychologist-portal',
    image: '/works/psyra-dashboard.jpg',
  },
  {
    index: '02',
    tag: 'Desktop',
    slug: 'psyra-psychologist-portal',
    title: 'face_cluster',
    description:
      'Tauri v2 desktop app for visual face clustering — InsightFace, FAISS, DBSCAN under a React front end with a FastAPI sidecar.',
    stack: ['React', 'FastAPI', 'Tauri', 'FAISS'],
    href: '#',
    image: '/work/face-cluster.jpg',
  },
  {
    index: '03',
    tag: 'Marketing',
    title: 'Onverse Digital Academy',
    slug: 'psyra-psychologist-portal',
    description:
      'Full SSR marketing site with JSON-LD structured data, generated sitemap/robots, and a component system for a digital marketing institution.',
    stack: ['Next.js', 'Framer Motion', 'SEO'],
    href: '#',
    image: '/work/onverse.jpg',
  },
  {
    index: '04',
    tag: 'Security',
    title: 'Vulnerable Service + Exploit Chain',
    slug: 'psyra-psychologist-portal',
    description:
      'A deliberately vulnerable C++ network service, built to document a full exploit chain from enumeration through privilege escalation.',
    stack: ['C++', 'Linux', 'GDB', 'pwntools'],
    href: '#',
    image: '/work/exploit-chain.jpg',
  },
  {
    index: '05',
    tag: 'Infra',
    title: 'Retail Ops Stack',
    slug: 'psyra-psychologist-portal',
    description:
      'Pickup request flow, Google Sheets integration, and an authenticated admin panel over MongoDB/Mongoose with AWS S3.',
    stack: ['Next.js', 'Mongoose', 'AWS S3'],
    href: '#',
    image: '/work/four-colours.jpg',
  },
  {
    index: '06',
    tag: 'Monitoring',
    title: 'SSH Sentinel',
    slug: 'psyra-psychologist-portal',
    description:
      'A lightweight SSH security monitor — watchdog-driven log tailing with Flask and instant Telegram alerting.',
    stack: ['Python', 'Flask', 'Telegram API'],
    href: '#',
    image: '/work/ssh-sentinel.jpg',
  },
];