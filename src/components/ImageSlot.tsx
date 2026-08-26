import React from 'react';
import Icon from '@/components/Icon';
import { slotImages } from '@/data/slotImages';

/* ──────────────────────────────────────────────────────────────
   ImageSlot — a named placeholder for artwork.
   Artwork is resolved from `slotImages` by id (or passed in
   directly as `src`); ids with no artwork yet render as a
   labelled dashed placeholder.
────────────────────────────────────────────────────────────── */

interface ImageSlotProps {
  /** Stable slot id, e.g. "ar-hero-2" */
  id: string;
  /** Persian description of the artwork this slot expects */
  label?: string;
  src?: string;
  fit?: 'cover' | 'contain';
  className?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/3]" */
  ratio?: string;
  icon?: string;
  rounded?: string;
}

export default function ImageSlot({
  id,
  label,
  src,
  fit,
  className = '',
  ratio = 'aspect-[4/3]',
  icon = 'lucide:layout-dashboard',
  rounded = 'rounded-2xl',
}: ImageSlotProps) {
  const art = slotImages[id];
  const source = src ?? art?.src;
  const objectFit = fit ?? art?.fit ?? 'cover';

  if (source) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={source}
        alt={label || id}
        data-slot={id}
        loading="lazy"
        className={`${ratio} ${rounded} w-full ${
          objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'
        } ${className}`}
      />
    );
  }

  return (
    <div
      data-slot={id}
      title={label || id}
      className={`ar-slot ${ratio} ${rounded} ${className} w-full flex flex-col items-center justify-center gap-2 p-3 text-center`}
    >
      <Icon name={icon} size={22} className="text-gray-300" />
      {label && (
        <span className="text-[10px] leading-5 text-gray-400 line-clamp-2 max-w-[90%]">{label}</span>
      )}
      <span className="text-[9px] font-mono text-gray-300 tracking-tight" dir="ltr">
        {id}
      </span>
    </div>
  );
}
