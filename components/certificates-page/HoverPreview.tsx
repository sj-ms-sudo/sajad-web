'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

interface HoverPreviewProps {
  activeIndex: string | null;
  x: number;
  y: number;
}

export default function HoverPreview({ activeIndex, x, y }: HoverPreviewProps) {
  const rawX = useMotionValue(x);
  const rawY = useMotionValue(y);
  const springX = useSpring(rawX, { stiffness: 260, damping: 32, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 32, mass: 0.6 });

  useEffect(() => {
    rawX.set(x);
    rawY.set(y);
  }, [x, y, rawX, rawY]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
      <AnimatePresence>
        {activeIndex && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: springX, top: springY }}
            className="absolute flex h-44 w-64 -translate-x-1/2 -translate-y-[110%] items-center justify-center overflow-hidden rounded-xl border border-[#00e5ff]/30 bg-[#0a0c0f] shadow-[0_0_40px_rgba(0,229,255,0.15)]"
          >
            {/* placeholder — swap for <Image src={cert.image} .../> */}
            <span className="text-xs uppercase tracking-widest text-[#5b6270]">Certificate</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}