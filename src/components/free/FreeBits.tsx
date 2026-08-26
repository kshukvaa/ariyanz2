import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { freeTheme, tones, type Tone, type FreeVideo } from '@/data/free';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the three "رایگان اما کاربردی" pages.
   Server-safe: nothing here holds state.
────────────────────────────────────────────────────────────── */

/** Breadcrumb — home icon on the far right, slash separators. */
export function Crumbs({ trail }: { trail: { label: string; href: string }[] }) {
  return (
    /* RTL: the first crumb lands on the right, so no justify override. */
    <nav className="flex items-center gap-2 text-[12px] flex-wrap">
      {trail.map((c, i) => (
        <React.Fragment key={c.href + c.label}>
          {i > 0 && <span className="text-gray-300">/</span>}
          <Link
            href={c.href}
            className={`flex items-center gap-1.5 transition-colors hover:text-orange-500 max-w-[42vw] sm:max-w-none truncate ${
              i === trail.length - 1 ? 'text-gray-500' : 'font-semibold'
            }`}
            style={i === trail.length - 1 ? undefined : { color: freeTheme.blue }}
          >
            {i === 0 && <Icon name="lucide:house" size={15} className="shrink-0" />}
            <span className="truncate">{c.label}</span>
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}

/** Centred section heading flanked by the orange diamonds from the mockup. */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center justify-center gap-3 text-[19px] sm:text-[22px] font-black mb-8">
      <Diamond />
      <span style={{ color: freeTheme.navy }}>{children}</span>
      <Diamond />
    </h2>
  );
}

function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="w-[7px] h-[7px] rotate-45 shrink-0"
      style={{ backgroundColor: freeTheme.orange }}
    />
  );
}

/** Left-pointing arrow link used on every card footer (RTL "forward"). */
export function GoLink({
  label,
  href,
  color = freeTheme.blue,
  className = '',
}: {
  label: string;
  href: string;
  color?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[12.5px] font-bold transition-colors ${className}`}
      style={{ color }}
    >
      <span>{label}</span>
      <Icon
        name="lucide:arrow-left"
        size={14}
        className="transition-transform group-hover:-translate-x-1"
      />
    </Link>
  );
}

/** Five stars, filled to `value` (halves round up to a half-filled star). */
export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, value - i + 1));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Icon name="lucide:star" size={size} className="absolute inset-0 text-gray-200" />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Icon
                  name="lucide:star"
                  size={size}
                  style={{ backgroundColor: freeTheme.orange }}
                />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

/** Video card — the listing grid and the related rail use the same tile. */
export function VideoCard({ video, className = '' }: { video: FreeVideo; className?: string }) {
  const tone = tones[video.tone];
  return (
    <Link
      href={`/videos/${video.id}`}
      data-tilt
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60 ${className}`}
      style={{ borderColor: freeTheme.border }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumb}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Bottom-left, matching the mockup — and deliberately opaque so it
            covers the duration baked into the placeholder thumbnails. */}
        <span className="absolute bottom-2 left-2 bg-black text-white text-[11.5px] font-medium px-2.5 py-1 rounded-lg tabular-nums">
          {video.duration}
        </span>
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25">
          <span className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center">
            <Icon name="lucide:play" size={18} style={{ backgroundColor: freeTheme.orange }} />
          </span>
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-[13.5px] font-bold leading-7 text-center mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors"
          style={{ color: freeTheme.navy }}
        >
          {video.title}
        </h3>

        <div className="flex items-center justify-between mb-3 mt-auto">
          <span
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
            style={{ color: tone.text, backgroundColor: tone.bg }}
          >
            {video.topic}
          </span>
          <span className="flex items-center gap-1 text-[11.5px] text-gray-400">
            <Icon name="lucide:eye" size={13} />
            <span dir="ltr">{video.views}</span>
          </span>
        </div>

        <span
          className="flex items-center justify-center gap-2 text-[12px] font-bold pt-3 border-t"
          style={{ color: freeTheme.navy, borderColor: freeTheme.border }}
        >
          <span>مشاهده ویدئو</span>
          <Icon
            name="lucide:arrow-left"
            size={14}
            className="transition-transform group-hover:-translate-x-1"
            style={{ backgroundColor: freeTheme.orange }}
          />
        </span>
      </div>
    </Link>
  );
}

/** Panel wrapper — the white rounded card every section sits in. */
export function Panel({
  children,
  className = '',
  tone,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      className={`rounded-2xl border ${className}`}
      style={{
        borderColor: tone ? tones[tone].ring : freeTheme.border,
        backgroundColor: tone ? tones[tone].soft : '#fff',
      }}
    >
      {children}
    </div>
  );
}
