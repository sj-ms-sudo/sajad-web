import type { LucideIcon } from 'lucide-react';
import {  Mail } from 'lucide-react';
import { FaGithub,FaLinkedin } from 'react-icons/fa';

export interface ContactLink {
  label: string;
  href: string;
  icon: any;
}

export const contactLinks: ContactLink[] = [
  { label: 'Email', href: 'mailto:you@example.com', icon: Mail },
  { label: 'GitHub', href: 'https://github.com/sj-ms-sudo', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle', icon: FaLinkedin },
];