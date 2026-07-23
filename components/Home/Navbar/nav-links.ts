export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Works', href: '/works' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Contact', href: '/contact' },
];