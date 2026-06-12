'use client';

export default function MarqueeRow({ images, duration = '40s', reverse = false }) {
  return (
    <div className="flex w-full overflow-hidden select-none" style={{ transform: 'translateZ(0)' }}>
      <div
        className="flex shrink-0 flex-nowrap items-center will-change-transform h-12 md:h-14"
        style={{
          animation: `marquee ${duration} linear infinite ${reverse ? 'reverse' : 'normal'}`,
          transform: 'translateZ(0)',
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            className="mx-6 inline-block h-full w-auto md:mx-12 transition-opacity pointer-events-none select-none"
            src={img.src}
            alt={img.alt}
            draggable="false"
            loading="eager"
            decoding="async"
            style={{ transform: 'translateZ(0)' }}
          />
        ))}
      </div>
      <div
        className="flex shrink-0 flex-nowrap items-center will-change-transform h-12 md:h-14"
        aria-hidden="true"
        style={{
          animation: `marquee ${duration} linear infinite ${reverse ? 'reverse' : 'normal'}`,
          transform: 'translateZ(0)',
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            className="mx-6 inline-block h-full w-auto md:mx-12 transition-opacity pointer-events-none select-none"
            src={img.src}
            alt={img.alt}
            draggable="false"
            loading="eager"
            decoding="async"
            style={{ transform: 'translateZ(0)' }}
          />
        ))}
      </div>
    </div>
  );
}
