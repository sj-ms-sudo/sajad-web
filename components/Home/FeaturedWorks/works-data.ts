export interface WorkItem {
  index: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
  image?: string;
}

export const worksData: WorkItem[] = [
  {
    index: '01',
    tag: 'Platform',
    title: 'Psyra Booking Engine',
    description:
      'Psychologist booking & payments system with Razorpay webhooks, atomic slot locking, and a cron-based expiry job.',
    stack: ['NestJS', 'MongoDB', 'Razorpay', 'Cron'],
    href: '#',
    image: '/work/psyra.jpg',
  },
  {
    index: '02',
    tag: 'Desktop',
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
    description:
      'A lightweight SSH security monitor — watchdog-driven log tailing with Flask and instant Telegram alerting.',
    stack: ['Python', 'Flask', 'Telegram API'],
    href: '#',
    image: '/work/ssh-sentinel.jpg',
  },
];