export interface Certificate {
  index: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  tag: string;
  verifyUrl: string;
}

export const certificatesData: Certificate[] = [
  {
    index: '01',
    title: 'Certified in Cybersecurity (CC)',
    issuer: 'ISC2',
    date: '2024',
    credentialId: 'ISC2-CC-XXXXXX',
    tag: 'Security',
    verifyUrl: '#',
  },
  {
    index: '02',
    title: 'Google Cybersecurity Certificate',
    issuer: 'Google / Coursera',
    date: '2023',
    credentialId: 'GC-XXXXXXXX',
    tag: 'Security',
    verifyUrl: '#',
  },
  {
    index: '03',
    title: 'IEEE Xtreme — Global Top 1000',
    issuer: 'IEEE',
    date: '2023',
    credentialId: 'IEEEX-RANK-XXX',
    tag: 'Competitive',
    verifyUrl: '#',
  },
];