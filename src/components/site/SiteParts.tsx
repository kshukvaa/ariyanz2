'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the marketing pages (about, contact, FAQ,
   legal, collaborate, careers, news).

   These sheets use the site's navy/orange chrome rather than the
   purple panel palette, so they build on Tailwind utilities and
   NAVY rather than the panelTokens used inside /org and /advisor.
────────────────────────────────────────────────────────────── */

export const NAVY = '#16305B';
export const ORANGE = '#F26A21';

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center justify-end gap-1.5 flex-wrap text-[11px] text-gray-400">
      {items.map((c, i) => (
        <React.Fragment key={c.label}>
          {i > 0 && <span>›</span>}
          {c.href ? (
            <Link href={c.href} className="hover:text-orange-500 transition-colors">
              {c.label}
            </Link>
          ) : (
            <span className="font-bold" style={{ color: NAVY }}>
              {c.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function PageHero({
  title,
  desc,
  art,
  updated,
  search,
  children,
}: {
  title: string;
  desc: string;
  art?: string;
  updated?: string;
  search?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f9ff] to-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center gap-8 flex-wrap">
          {art && (
            <img src={art} alt="" className="w-[210px] max-w-full object-contain shrink-0 order-2 mx-auto" />
          )}

          <div className="flex-1 min-w-[260px] text-center order-1">
            <h1 className="text-[28px] sm:text-[36px] font-black leading-[1.35]" style={{ color: NAVY }}>
              {title}
            </h1>
            <p className="mt-3 text-[13px] sm:text-[14px] leading-8 text-gray-500 max-w-[640px] mx-auto">
              {desc}
            </p>

            {updated && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[11.5px] font-bold text-gray-500 shadow-sm">
                {updated}
                <Icon name="lucide:calendar" size={13} style={{ backgroundColor: ORANGE }} />
              </p>
            )}

            {search && (
              <label className="mt-5 flex items-center gap-2.5 rounded-2xl bg-white px-5 py-3.5 shadow-sm max-w-[560px] mx-auto">
                <Icon name="lucide:search" size={17} style={{ backgroundColor: '#9aa3b8' }} />
                <input
                  placeholder={search}
                  className="flex-1 min-w-0 bg-transparent text-right text-[12.5px] outline-none placeholder:text-gray-400"
                  style={{ color: NAVY }}
                />
              </label>
            )}

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Section({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`max-w-[1200px] mx-auto px-4 sm:px-6 py-8 ${className}`}>
      {title && (
        <div className="flex items-center justify-center gap-3 mb-7">
          <span className="h-[3px] w-8 rounded-full bg-orange-400" />
          <h2 className="text-[20px] sm:text-[26px] font-black" style={{ color: NAVY }}>
            {title}
          </h2>
          <span className="h-[3px] w-8 rounded-full bg-orange-400" />
        </div>
      )}
      {children}
    </section>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,.04)] ${className}`}>
      {children}
    </div>
  );
}

/* Collapsible row used by the FAQ and both legal pages. */
export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { title: string; body?: string; bullets?: string[]; icon?: string }[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => {
        const on = i === open;
        return (
          <li key={it.title} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            <button
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-right"
            >
              <Icon
                name={on ? 'lucide:minus' : 'lucide:plus'}
                size={15}
                className="shrink-0 order-3"
                style={{ backgroundColor: ORANGE }}
              />
              <span className="flex-1 text-[12.5px] sm:text-[13.5px] font-bold order-2" style={{ color: NAVY }}>
                {it.title}
              </span>
              {it.icon && (
                <Icon name={it.icon} size={17} className="shrink-0 order-1" style={{ backgroundColor: '#9aa3b8' }} />
              )}
            </button>

            {on && (it.body || it.bullets) && (
              <div className="px-4 sm:px-5 pb-5 text-right">
                {it.body && <p className="text-[11.5px] leading-8 text-gray-500">{it.body}</p>}
                {it.bullets && (
                  <ul className="mt-3 space-y-2">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                        <span className="flex-1 text-[11.5px] leading-7 text-gray-500">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* The orange/navy call-to-action pair that closes most sheets. */
export function CtaRow({ items }: { items: { title: string; desc: string; cta: string; href: string; tone: 'orange' | 'navy' | 'light'; icon: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((c) => {
        const orange = c.tone === 'orange';
        const navy = c.tone === 'navy';
        return (
          <div
            key={c.title}
            className="rounded-2xl p-5 flex items-center gap-4"
            style={{
              backgroundColor: orange ? '#FDF1E6' : navy ? NAVY : '#F4F6FD',
            }}
          >
            <span className="flex-1 text-right">
              <span className="block text-[13px] font-black" style={{ color: navy ? '#ffffff' : NAVY }}>
                {c.title}
              </span>
              <span className={`mt-1.5 block text-[11px] leading-6 ${navy ? 'text-white/70' : 'text-gray-500'}`}>
                {c.desc}
              </span>
              <Link
                href={c.href}
                className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[11.5px] font-bold text-white"
                style={{ backgroundColor: orange ? ORANGE : navy ? ORANGE : NAVY }}
              >
                <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: '#ffffff' }} />
                {c.cta}
              </Link>
            </span>
            <span
              className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: navy ? 'rgba(255,255,255,.12)' : '#ffffff' }}
            >
              <Icon name={c.icon} size={24} style={{ backgroundColor: navy ? '#ffffff' : ORANGE }} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
