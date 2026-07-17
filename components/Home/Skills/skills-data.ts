export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillsData: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['NestJS', 'Node.js', 'Python', 'FastAPI', 'REST APIs'],
  },
  {
    category: 'Data & Infra',
    items: ['MongoDB', 'Mongoose', 'AWS S3', 'MongoDB Atlas', 'Vercel'],
  },
  {
    category: 'Security',
    items: ['Web Exploitation', 'Network Enumeration', 'AD Attacks', 'Binary Exploitation', 'Cloud Security'],
  },
  {
    category: 'Systems',
    items: ['C++', 'Linux', 'GDB', 'pwntools', 'Bash'],
  },
  {
    category: 'Certifications',
    items: ['ISC2 CC', 'Google Cybersecurity', 'IEEE Xtreme Global Top 1000'],
  },
];