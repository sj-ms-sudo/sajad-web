export interface WorkEntry {
  index: string;
  year: string;
  tag: string;
  title: string;
  role: string;
  description: string;
  stack: string[];
  href: string;
  image?: string;
}

export const worksPageData: WorkEntry[] = [
  {
    index: '01',
    year: '2024',
    tag: 'Platform',
    title: 'Psyra Booking Engine',
    role: 'Full-stack development',
    description:
      'Psychologist booking & payments system with Razorpay webhooks, atomic slot locking, and a cron-based expiry job to keep availability honest under load.',
    stack: ['NestJS', 'MongoDB', 'Razorpay', 'Cron'],
    href: '#',
    image: '/work/psyra.jpg',
  },
  {
    index: '02',
    year: '2024',
    tag: 'Desktop',
    title: 'face_cluster',
    role: 'Solo build',
    description:
      'Tauri v2 desktop app for visual face clustering — InsightFace, FAISS, DBSCAN under a React front end with a FastAPI sidecar. Evolving toward YOLOv8 + CLIP search.',
    stack: ['React', 'FastAPI', 'Tauri', 'FAISS'],
    href: '#',
    image: '/work/face-cluster.jpg',
  },
  {
    index: '03',
    year: '2023',
    tag: 'Marketing',
    title: 'Onverse Digital Academy',
    role: 'Founder & builder',
    description:
      'Full SSR marketing site with JSON-LD structured data, generated sitemap/robots, and a component system for a digital marketing institution in Kerala.',
    stack: ['Next.js', 'Framer Motion', 'SEO'],
    href: '#',
    image: '/work/onverse.jpg',
  },
  {
    index: '04',
    year: '2024',
    tag: 'Security',
    title: 'Vulnerable Service + Exploit Chain',
    role: 'Research project',
    description:
      'A deliberately vulnerable C++ network service, built to document a full exploit chain from enumeration through privilege escalation.',
    stack: ['C++', 'Linux', 'GDB', 'pwntools'],
    href: '#',
    image: '/work/exploit-chain.jpg',
  },
  {
    index: '05',
    year: '2023',
    tag: 'Infra',
    title: 'Retail Ops Stack',
    role: 'Full-stack development',
    description:
      'Pickup request flow, Google Sheets integration, and an authenticated admin panel over MongoDB/Mongoose with AWS S3 for a Bur Dubai repair shop.',
    stack: ['Next.js', 'Mongoose', 'AWS S3'],
    href: '#',
    image: '/work/four-colours.jpg',
  },
  {
    index: '06',
    year: '2022',
    tag: 'Monitoring',
    title: 'SSH Sentinel',
    role: 'Solo build',
    description:
      'A lightweight SSH security monitor — watchdog-driven log tailing with Flask and instant Telegram alerting on suspicious access patterns.',
    stack: ['Python', 'Flask', 'Telegram API'],
    href: '#',
    image: '/work/ssh-sentinel.jpg',
  },
];