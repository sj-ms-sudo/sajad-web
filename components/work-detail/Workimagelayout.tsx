'use client';

import WorkImageTile from './Workimagetile';

export default function WorkImageLayout({ images }: { images: string[] }) {
  const count = images.length;

  // 1 image — single full-width hero tile
  if (count === 1) {
    return (
      <div className="mx-auto max-w-5xl px-6">
        <WorkImageTile src={images[0]} className="aspect-[16/9] w-full" />
      </div>
    );
  }

  // 2 images — even side-by-side split
  if (count === 2) {
    return (
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-6 sm:grid-cols-2">
        {images.map((src, i) => (
          <WorkImageTile key={i} src={src} className="aspect-[4/3] w-full" />
        ))}
      </div>
    );
  }

  // 3 images — one large + two stacked (bento), reads as the primary shot + supporting detail
  if (count === 3) {
    return (
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-6 sm:grid-cols-[1.4fr_1fr]">
        <WorkImageTile src={images[0]} className="aspect-[4/5] w-full sm:aspect-auto sm:h-full" />
        <div className="grid grid-rows-2 gap-5">
          <WorkImageTile src={images[1]} className="aspect-[4/3] w-full sm:aspect-auto sm:h-full" />
          <WorkImageTile src={images[2]} className="aspect-[4/3] w-full sm:aspect-auto sm:h-full" />
        </div>
      </div>
    );
  }

  // 4+ images — falls back to a simple wrapping grid rather than breaking
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <WorkImageTile key={i} src={src} className="aspect-[4/3] w-full" />
      ))}
    </div>
  );
}