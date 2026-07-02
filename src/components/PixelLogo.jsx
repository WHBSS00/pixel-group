'use client';
import { useCompany } from '@/context/CompanyContext';
import { getDirectDriveLink } from '@/utils/drive';

export default function PixelLogo({ className = "h-[45px] md:h-[60px]" }) {
  const { settings } = useCompany();
  const logoSrc = settings?.logo || '/logo-idea.png';
  return (
    <img
      src={getDirectDriveLink(logoSrc)}
      alt="IDEA Outdoor"
      className={`${className} w-auto object-contain`}
      draggable="false"
    />
  );
}
