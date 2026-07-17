'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { roles } from './roles';

const INTERVAL = 2500;

export default function RotatingRoles() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="
        relative
        inline-block
        min-w-[22ch]
        text-left
        align-middle
        leading-[1.25]
      "
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{
            opacity: 0,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            filter: 'blur(8px)',
          }}
          transition={{
            duration: 0.45,
            ease: 'easeInOut',
          }}
          className="
            absolute left-0 top-0 whitespace-nowrap
            bg-gradient-to-r
            from-cyan-400
            via-cyan-300
            to-fuchsia-500
            bg-clip-text
            text-transparent
            z-20
            leading-[1.25]
            pb-[0.08em]
          "
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>

      {/* Invisible spacer to prevent layout shift */}
      <span
        className="
          invisible
          block
          whitespace-nowrap
          text-inherit
          font-inherit
          leading-[1.25]
        "
      >
        Offensive Security g
      </span>
    </span>
  );
}