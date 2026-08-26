import React from 'react';

/* ──────────────────────────────────────────────────────────────
   Icon — CSS-mask span backed by LOCAL SVG files (no external API).
   Colour comes from `background-color`, so any icon recolours
   freely via `color`/`style`. No icon font, no JS library.
   Icons are stored at /public/icons/{set}-{name}.svg.
────────────────────────────────────────────────────────────── */

interface IconProps {
  /**
   * Iconify id — e.g. "lucide:star", "mdi:linkedin", "ic:baseline-whatsapp" —
   * or a path to a local SVG under /public, e.g. "/icons/toolbox.svg".
   */
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, size = 20, className = '', style }: IconProps) {
  const url = name.startsWith('/')
    ? name
    : `/icons/${name.replace(':', '-')}.svg`;

  /* The shared .ar-icon rule stretches masks to 100% 100%, which is
     right for the SVG set (all square, no intrinsic size) but wrong
     for the bitmap glyphs lifted from the mockups — those carry real
     pixel dimensions and are rarely square, so stretching them to a
     square box skews the artwork. Fit those to the box instead. */
  const bitmap = /\.(png|webp|jpe?g)$/i.test(url);

  return (
    <span
      aria-hidden="true"
      className={`ar-icon ${className}`}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url("${url}")`,
        maskImage: `url("${url}")`,
        ...(bitmap && {
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }),
        ...style,
      }}
    />
  );
}
