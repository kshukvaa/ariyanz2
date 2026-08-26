'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR, fa, faPrice, courseBadges } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the LMS.

   Three shells run through these pages — a catalogue, a course
   detail with a purchase rail, and a classroom — but they share a
   grammar: the index always sits on the right, the work on the
   left, and orange only ever means "buy".

   RTL note that cost me repeatedly elsewhere in this codebase:
   the FIRST declared grid column lands on the RIGHT. Every rail
   below is therefore declared before the content it accompanies.
────────────────────────────────────────────────────────────── */

/* ── Navy hero band ───────────────────────────────────────────── */

export function LmsHero({
  title,
  desc,
  features,
  image,
}: {
  title: string;
  desc: string[];
  features?: { label: string; sub?: string; icon: string }[];
  image?: string;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ borderRadius: LR.lg, background: `linear-gradient(120deg, ${L.navyDeep}, ${L.navy})` }}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_44%] items-center p-6 sm:p-8">
        <div className="text-center lg:text-right lg:order-1">
          <h1 className="text-[26px] sm:text-[31px] font-extrabold text-white leading-tight">
            {title}
          </h1>

          <div className="mt-3 space-y-1">
            {desc.map((d) => (
              <p key={d} className="text-[12.5px] leading-7" style={{ color: 'rgba(255,255,255,.78)' }}>
                {d}
              </p>
            ))}
          </div>

          {features && (
            <ul className="mt-6 flex items-start gap-6 flex-wrap justify-center lg:justify-end">
              {features.map((f) => (
                <li key={f.label} className="flex flex-col items-center gap-2 w-[104px] text-center">
                  <Icon name={f.icon} size={24} style={{ backgroundColor: '#ffffff' }} />
                  <span className="text-[10.5px] font-bold leading-4 text-white">{f.label}</span>
                  {f.sub && (
                    <span className="text-[9.5px] leading-3" style={{ color: 'rgba(255,255,255,.6)' }}>
                      {f.sub}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:order-2">
          {image ? (
            <img src={image} alt="" className="w-full h-[210px] object-cover" style={{ borderRadius: LR.md }} />
          ) : (
            <span
              className="block w-full h-[210px]"
              style={{ borderRadius: LR.md, background: 'rgba(255,255,255,.06)' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Course card ──────────────────────────────────────────────── */

export interface Course {
  id: string;
  title: string;
  instructor: string;
  avatar?: string;
  image?: string;
  level: string;
  hours: string;
  badge?: keyof typeof courseBadges;
  /** Omit price and set `free` for a free course. */
  price?: number;
  wasPrice?: number;
  discount?: string;
  free?: boolean;
  cta: string;
  href: string;
}

export function CourseCard({ course: c }: { course: Course }) {
  const badge = c.badge ? courseBadges[c.badge] : null;

  return (
    <article
      className="bg-white overflow-hidden flex flex-col"
      style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
    >
      <div className="relative h-[104px]" style={{ backgroundColor: L.blueSoft }}>
        {c.image && <img src={c.image} alt="" className="w-full h-full object-cover" />}

        {badge && (
          <span
            className="absolute top-2 right-2 px-2.5 py-1 text-[10px] font-bold"
            style={{ borderRadius: LR.sm, backgroundColor: badge.bg, color: badge.fg }}
          >
            {badge.label}
          </span>
        )}

        <button
          aria-label="ذخیره دوره"
          className="absolute top-2 left-2 w-7 h-7 flex items-center justify-center bg-white/90"
          style={{ borderRadius: LR.sm }}
        >
          <Icon name="lucide:bookmark" size={14} style={{ backgroundColor: L.navy }} />
        </button>
      </div>

      <div className="p-3.5 flex-1 flex flex-col">
        <h3 className="text-center text-[13px] font-extrabold leading-5" style={{ color: L.navy }}>
          {c.title}
        </h3>

        <div className="mt-2.5 flex items-center justify-center gap-2">
          {c.avatar && <img src={c.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />}
          <span className="text-[10.5px]" style={{ color: L.muted }}>
            مدرس: {c.instructor}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-center gap-3 text-[10px]" style={{ color: L.muted }}>
          <span className="flex items-center gap-1">
            <Icon name="lucide:clock" size={11} style={{ backgroundColor: L.muted }} />
            {c.hours}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="lucide:gauge" size={11} style={{ backgroundColor: L.muted }} />
            {c.level}
          </span>
        </div>

        <div className="mt-3 flex-1 flex items-end justify-center">
          {c.free ? (
            <span className="text-[15px] font-extrabold" style={{ color: L.orange }}>
              رایگان
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {c.discount && (
                <span
                  className="px-2 py-1 text-[10px] font-bold text-white text-center leading-3"
                  style={{ borderRadius: LR.sm, backgroundColor: L.red }}
                >
                  {c.discount}
                  <span className="block">تخفیف</span>
                </span>
              )}
              <span className="text-center">
                {c.wasPrice && (
                  <span className="block text-[10px] line-through" style={{ color: L.muted }}>
                    {faPrice(c.wasPrice)} تومان
                  </span>
                )}
                <span className="block text-[13px] font-extrabold" style={{ color: L.navy }}>
                  {faPrice(c.price ?? 0)} تومان
                </span>
              </span>
            </span>
          )}
        </div>

        <Link
          href={c.href}
          className="mt-3 flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: LR.md, backgroundColor: L.navy }}
        >
          {c.cta}
          <Icon name="lucide:arrow-left" size={13} className="text-white" />
        </Link>
      </div>
    </article>
  );
}

/* ── Filter rail ──────────────────────────────────────────────── */

export interface FilterGroup {
  id: string;
  label: string;
  items: { label: string; count?: string; icon?: string; dot?: string }[];
}

export function FilterRail({
  title,
  groups,
  search,
}: {
  title: string;
  groups: FilterGroup[];
  search?: { title: string; placeholder: string };
}) {
  return (
    <aside className="space-y-4 xl:order-1 xl:sticky xl:top-6">
      <div className="bg-white" style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}>
        <h2
          className="flex items-center justify-end gap-2 p-4 text-[13px] font-extrabold"
          style={{ color: L.navy, borderBottom: `1px solid ${L.border}` }}
        >
          {title}
          <Icon name="lucide:funnel" size={16} style={{ backgroundColor: L.blue }} />
        </h2>

        {groups.map((g) => (
          <div key={g.id} style={{ borderBottom: `1px solid ${L.border}` }}>
            <div className="flex items-center gap-2 px-4 py-3">
              <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: L.muted }} />
              <span className="flex-1 text-right text-[12px] font-extrabold" style={{ color: L.navy }}>
                {g.label}
              </span>
            </div>

            <ul className="pb-3">
              {g.items.map((i) => (
                <li key={i.label}>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2 transition-colors hover:bg-gray-50">
                    {i.icon ? (
                      <Icon name={i.icon} size={15} style={{ backgroundColor: L.orange }} />
                    ) : (
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: i.dot ?? L.blue }}
                      />
                    )}
                    <span className="flex-1 text-right text-[11px]" style={{ color: L.ink }}>
                      {i.label}
                      {i.count && <span style={{ color: L.muted }}> ({i.count})</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {search && (
        <div className="bg-white p-4" style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}>
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
            {search.title}
          </h3>
          <label
            className="mt-3 flex items-center gap-2.5 px-3.5 py-2.5"
            style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
          >
            <Icon name="lucide:search" size={15} style={{ backgroundColor: L.muted }} />
            <input
              placeholder={search.placeholder}
              className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
              style={{ color: L.ink }}
            />
          </label>
        </div>
      )}
    </aside>
  );
}

/* ── Tab bar ──────────────────────────────────────────────────── */

export function TabBar({
  tabs,
  active,
  onPick,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onPick?: (id: string) => void;
}) {
  return (
    <div
      className="bg-white px-2 overflow-x-auto"
      style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
    >
      <div className="flex items-center gap-1 min-w-max justify-end">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => onPick?.(t.id)}
              aria-pressed={on}
              className="relative px-5 py-3.5 text-[12.5px] whitespace-nowrap transition-colors"
              style={{ color: on ? L.blue : L.muted, fontWeight: on ? 800 : 600 }}
            >
              {t.label}
              {on && (
                <span
                  className="absolute bottom-0 inset-x-3 h-[3px] rounded-t-full"
                  style={{ backgroundColor: L.blue }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Generic titled panel ─────────────────────────────────────── */

export function LmsPanel({
  title,
  cta,
  children,
  className = '',
}: {
  title?: string;
  cta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
    >
      {(title || cta) && (
        <header className="flex items-center gap-3 mb-4">
          {cta && (
            <button className="text-[11px] font-bold" style={{ color: L.blue }}>
              {cta}
            </button>
          )}
          {title && (
            <h2 className="flex-1 text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

/* ── The Aryaz agent card ─────────────────────────────────────── */

export function LmsAgentCard({
  title,
  desc,
  chips,
  placeholder,
}: {
  title: string;
  desc: string;
  chips: string[];
  placeholder: string;
}) {
  return (
    <section className="p-5" style={{ borderRadius: LR.lg, backgroundColor: L.violetSoft }}>
      <div className="flex items-start gap-4 flex-wrap">
        <img
          src="/images/aryaz/illustrations/ai-assistant-avatar.png"
          alt=""
          className="w-[72px] h-[72px] object-contain shrink-0"
        />
        <div className="flex-1 min-w-[220px] text-right">
          <h3 className="text-[14px] font-extrabold" style={{ color: L.violet }}>
            {title}
          </h3>
          <p className="mt-1 text-[11.5px] leading-6" style={{ color: L.muted }}>
            {desc}
          </p>
        </div>
      </div>

      <div className="mt-3.5 flex items-center gap-2 flex-wrap justify-end">
        {chips.map((c) => (
          <button
            key={c}
            className="flex items-center gap-1.5 px-3.5 py-2 text-[10.5px] font-semibold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: LR.md, color: L.ink }}
          >
            {c}
            <Icon name="lucide:sparkles" size={11} style={{ backgroundColor: L.violet }} />
          </button>
        ))}
      </div>

      <label className="mt-3 flex items-center gap-2.5 px-4 py-3 bg-white" style={{ borderRadius: LR.md }}>
        <button
          aria-label="ارسال"
          className="w-8 h-8 flex items-center justify-center shrink-0"
          style={{ borderRadius: LR.sm, backgroundColor: L.violet }}
        >
          <Icon name="lucide:send" size={14} className="text-white" />
        </button>
        <input
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-[12px] outline-none placeholder:text-[#9396b0]"
          style={{ color: L.ink }}
        />
      </label>
    </section>
  );
}

/* ── Progress ring ────────────────────────────────────────────── */

export function Ring({
  pct,
  size = 96,
  stroke = 10,
  colour = L.blue,
  caption,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  colour?: string;
  caption?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <span
      className="relative inline-flex flex-col items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="absolute inset-0 -rotate-90 scale-x-[-1]">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={L.border} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colour}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
        />
      </svg>
      <span className="relative text-[17px] font-extrabold" style={{ color: L.navy }}>
        {fa(pct)}%
      </span>
      {caption && (
        <span className="relative text-[9px]" style={{ color: L.muted }}>
          {caption}
        </span>
      )}
    </span>
  );
}
