'use client';

import { motion } from 'framer-motion';
import { contactLinks } from './contact-data';

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {contactLinks.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * i }}
          className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[#edeff2] transition-all hover:-translate-y-0.5 hover:border-[#00e5ff]/40 hover:bg-[#00e5ff]/[0.06]"
        >
          <link.icon size={15} />
          {link.label}
        </motion.a>
      ))}
    </div>
  );
}