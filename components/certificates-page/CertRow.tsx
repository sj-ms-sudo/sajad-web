'use client';

import { ExternalLink } from 'lucide-react';
import type { Certificate } from './certificates-data';

interface CertRowProps {
  cert: Certificate;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

export default function CertRow({ cert, active, onEnter, onLeave }: CertRowProps) {
  return (
    <a
      href={cert.verifyUrl}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`grid grid-cols-2 items-center gap-4 border-b border-white/[0.07] px-2 py-6 transition-colors sm:grid-cols-4 sm:px-4 ${
        active ? 'bg-[#00e5ff]/[0.03]' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="font-display text-sm text-[#5b6270]">{cert.index}</span>
        <h3
          className={`font-display text-base font-semibold transition-colors sm:text-lg ${
            active ? 'text-[#00e5ff]' : 'text-[#edeff2]'
          }`}
        >
          {cert.title}
        </h3>
      </div>

      <span className="hidden text-[13px] uppercase tracking-wide text-[#5b6270] sm:block">
        {cert.issuer}
      </span>

      <span className="hidden rounded-full border border-white/10 px-2.5 py-1 text-center text-[11px] font-semibold uppercase tracking-wide text-[#a3aab6] sm:inline-block sm:w-fit">
        {cert.tag}
      </span>

      <div className="flex items-center justify-end gap-3 text-right">
        <span className="text-[13px] text-[#5b6270]">{cert.date}</span>
        <ExternalLink
          size={14}
          className={`transition-colors ${active ? 'text-[#00e5ff]' : 'text-[#5b6270]'}`}
        />
      </div>
    </a>
  );
}