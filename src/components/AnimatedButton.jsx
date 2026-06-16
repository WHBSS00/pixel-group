'use client';

export default function AnimatedButton({ text, href = '#', className = '', srText = '' }) {
  return (
    <a className={`animated-link inline-flex rounded-lg bg-white text-[#1A56DB] hover:bg-[#EBF5FF] transition-colors ${className}`} href={href}>
      <div className="flex-1 h-[38px] md:h-[49px] px-6 flex items-center">
        <div className="h-[1.25em] max-h-[1.25em] overflow-hidden whitespace-nowrap text-[14px] md:text-[20px] leading-[1.25em] font-semibold mb-[0.1em]">
          <div className="text">
            <div>
              {text}
              {srText && <span className="sr-only"> {srText}</span>}
            </div>
            <div aria-hidden="true">
              {text}
              {srText && <span className="sr-only"> {srText}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="icon-wrapper h-[38px] md:h-[49px] aspect-[1/1] overflow-hidden flex items-center justify-end rounded-lg">
        <div className="flex gap-3 px-3 icon">
          <span className="size-6">
            <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
              <path d="M 20 12 L 4 12" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 15 17 C 15 17 20 13.318 20 12 C 20 10.682 15 7 15 7" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="size-6">
            <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
              <path d="M 20 12 L 4 12" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 15 17 C 15 17 20 13.318 20 12 C 20 10.682 15 7 15 7" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
