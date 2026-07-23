'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import CertRow from './CertRow';
import HoverPreview from './HoverPreview';
import { certificatesData } from './certificates-data';

export default function CertificatesCabinet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="bg-[#050505] px-6 pb-32">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative mx-auto max-w-4xl rounded-2xl border border-white/[0.08] bg-white/[0.015]"
      >
        <HoverPreview activeIndex={active} x={pos.x} y={pos.y} />

        {certificatesData.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <CertRow
              cert={cert}
              active={active === cert.index}
              onEnter={() => setActive(cert.index)}
              onLeave={() => setActive(null)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}