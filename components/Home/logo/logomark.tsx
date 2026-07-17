'use client';

import Logo3D from './logo3d';

interface LogoMarkProps {
  size?: number;
  autoRotate?: boolean;
  className?: string;
}

/**
 * Concept 1, in 3D: a slowly rotating cyan wireframe shell with "SJ" held
 * in the negative space at its center. White + cyan only — no magenta.
 *
 * Usage:
 *   <LogoMark size={40} />                 // navbar
 *   <LogoMark size={120} autoRotate />      // loading screen
 */
export default function LogoMark({ size = 40, autoRotate = true, className = '' }: LogoMarkProps) {
  const letterSize = size * 0.34;

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-label="SJ logo"
      role="img"
    >
      <Logo3D autoRotate={autoRotate} />

      <span
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display font-semibold text-[#f5f5f5]"
        style={{
          fontSize: letterSize,
          letterSpacing: '-0.02em',
          textShadow: '0 0 10px rgba(25,240,255,0.55), 0 0 2px rgba(245,245,245,0.4)',
        }}
      >
        SJ
      </span>
    </div>
  );
}