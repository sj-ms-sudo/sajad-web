export interface FocusItem {
  icon: 'shield' | 'search' | 'academy' | 'cpu';
  tag: string;
  title: string;
  description: string;
}

export const focusItems: FocusItem[] = [
  {
    icon: 'academy',
    tag: 'Algorithms',
    title: 'LeetCode & DSA',
    description:
      'Practicing data structures and algorithms daily, with a focus on problem-solving patterns and interview preparation.',
  },
  {
    icon: 'shield',
    tag: 'Security',
    title: 'Capture The Flag (CTFs)',
    description:
      'Solving CTF challenges across web, binary exploitation, reverse engineering, and cryptography to strengthen offensive security skills.',
  },
  {
    icon: 'search',
    tag: 'Web Security',
    title: 'PortSwigger Web Security Academy',
    description:
      'Working through hands-on labs covering authentication flaws, XSS, SQL injection, SSRF, deserialization, and advanced web exploitation.',
  },
  {
    icon: 'cpu',
    tag: 'Systems',
    title: 'Raw Packet Sniffer in C',
    description:
      'Building a Linux raw socket packet sniffer from scratch to deepen understanding of Ethernet, IP, TCP/UDP, and low-level networking.',
  },
];