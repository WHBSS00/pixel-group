'use client';
import Image from 'next/image';

export default function MarqueeRow({ images, duration = '40s', reverse = false }) {
  const doubledImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden" style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
      <div className="flex justify-start" style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
        {Array.from({ length: 3 }).map((_, colIdx) => (
          <div
            key={colIdx}
            className="flex h-12 shrink-0 animate-marquee motion-safe:animate-marquee flex-nowrap items-center will-change-transform md:h-14"
            aria-hidden="true"
            style={{
              animationName: 'marquee',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDuration: duration,
              animationDirection: reverse ? 'reverse' : 'normal',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
            }}
          >
            {doubledImages.map((img, i) => (
              <div key={i} className="relative h-10 w-24 md:h-12 md:w-32 mx-4 md:mx-8 transition-opacity pointer-events-none select-none shrink-0">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  className="object-contain"
                  draggable="false"
                  loading="eager"
                  style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
