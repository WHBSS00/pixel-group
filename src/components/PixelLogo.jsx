'use client';

export default function PixelLogo({ className = "h-[45px] md:h-[60px]" }) {
  return (
    <img
      src="/logo-idea.png"
      alt="IDEA Outdoor"
      className={`${className} w-auto object-contain`}
      draggable="false"
    />
  );
}
