'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkImageShowcaseProps {
  images: string[];
  alt: string;
  autoRotateMs?: number; // 0 disables auto-rotate
}

export default function WorkImageShowcase({
  images,
  alt,
  autoRotateMs = 5000,
}: WorkImageShowcaseProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || autoRotateMs <= 0 || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, autoRotateMs);
    return () => clearInterval(id);
  }, [images.length, autoRotateMs, paused]);

  if (images.length === 0) return null;

  return (
    <div
      className="bg-black mx-auto max-w-5xl px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* framed hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[#00e5ff]/15 bg-[#0a0d10] shadow-[0_0_60px_-15px_rgba(0,229,255,0.15)]">
        {/* fake chrome bar — gives white screenshots somewhere to "sit" */}
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#0d1114] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>

        <div className="relative aspect-[16/9] w-full bg-[#0a0d10]">
          <AnimatePresence mode="wait">
            <motion.div
              key={images[active]}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 960px"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* thumbnail rail */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-all ${
                active === i
                  ? 'border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.35)]'
                  : 'border-white/10 opacity-50 hover:opacity-80'
              }`}
            >
              <Image src={src} alt="" fill className="object-cover object-top" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}