'use client';

import WorkImageTile from './Workimagetile';

// Deterministic "scattered" pattern — tuned by hand so it always looks
// intentional, never actually random. Cycles if more images are given.
const PATTERN = [
  { col: 'sm:col-span-4', rotate: '-rotate-1', translate: 'sm:translate-y-2', z: 'z-20' },
  { col: 'sm:col-span-2', rotate: 'rotate-2', translate: 'sm:-translate-y-3', z: 'z-10' },
  { col: 'sm:col-span-3', rotate: 'rotate-1', translate: 'sm:translate-y-6', z: 'z-10' },
  { col: 'sm:col-span-3', rotate: '-rotate-2', translate: 'sm:-translate-y-2', z: 'z-10' },
  { col: 'sm:col-span-2', rotate: '-rotate-1', translate: 'sm:translate-y-4', z: 'z-10' },
  { col: 'sm:col-span-4', rotate: 'rotate-1', translate: 'sm:-translate-y-4', z: 'z-10' },
];

export default function WorkImageLayout({
  images,
  alt = '',
}: {
  images: string[];
  alt?: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className="bg-[#050914] mx-auto max-w-5xl px-6 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-10">
        {images.map((src, i) => {
          const p = PATTERN[i % PATTERN.length];
          return (
            <div
              key={src}
              className={`${p.col} ${p.z} ${p.translate} transition-transform duration-500`}
            >
              <WorkImageTile
                src={src}
                alt={alt}
                className={`aspect-[4/3] w-full ${p.rotate} transition-transform duration-500 hover:!rotate-0 hover:scale-[1.03] hover:z-30`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}