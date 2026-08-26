'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import type { EventTicket } from '@/data/lms/events';

/* ──────────────────────────────────────────────────────────────
   The frame the workshop and webinar pages share.

   RTL: the ticket rail is on the RIGHT in both mockups, so it is
   declared first; the media column (photo or player) is last and
   lands on the left.
────────────────────────────────────────────────────────────── */

export function EventCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
    >
      {children}
    </section>
  );
}

export default function EventPage({
  crumbs,
  badge,
  title,
  subtitle,
  desc,
  instructorLabel,
  instructor,
  avatar,
  meta,
  tabs,
  about,
  ticket,
  group,
  guarantee,
  media,
}: {
  crumbs: { label: string; href?: string }[];
  badge: { label: string; dot?: boolean; outline?: boolean };
  title: string;
  subtitle?: string;
  desc: string;
  instructorLabel: string;
  instructor: string;
  avatar: string;
  meta: { label: string; value: string; icon: string }[];
  tabs: { id: string; label: string; icon: string }[];
  about: string[];
  ticket: EventTicket;
  group: {
    title: string;
    forWho: string;
    minimum: string;
    discount: string;
    cta: string;
    icon: string;
  };
  guarantee: string;
  media: React.ReactNode;
}) {
  const [tab, setTab] = useState(tabs[0].id);

  return (
    <div style={{ backgroundColor: L.page }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5">
        <nav className="flex items-center justify-end gap-1.5 flex-wrap text-[10.5px]">
          {crumbs.map((c, i) => (
            <React.Fragment key={c.label}>
              {i > 0 && <span style={{ color: L.muted }}>›</span>}
              {c.href ? (
                <Link href={c.href} style={{ color: L.muted }}>
                  {c.label}
                </Link>
              ) : (
                <span style={{ color: L.navy }}>{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="mt-4 grid gap-5 xl:grid-cols-[320px_1fr] items-start">
          {/* ── Ticket rail (right) ──────────────────────────── */}
          <aside className="space-y-4 xl:sticky xl:top-4">
            <EventCard>
              <h2 className="text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
                {ticket.title}
              </h2>

              <div className="mt-4 p-4" style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}>
                <span className="block text-right text-[12.5px] font-bold" style={{ color: L.navy }}>
                  {ticket.name}
                </span>
                <p className="mt-2 flex items-baseline justify-end gap-1.5">
                  <span className="text-[10.5px]" style={{ color: L.muted }}>
                    {ticket.currency}
                  </span>
                  <span className="text-[22px] font-extrabold" style={{ color: L.navy }}>
                    {ticket.price}
                  </span>
                </p>

                <ul className="mt-4 space-y-2.5">
                  {ticket.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <span className="flex-1 text-right text-[11px] font-bold" style={{ color: L.navy }}>
                        {p}
                      </span>
                      <Icon name="lucide:circle-check" size={15} className="shrink-0" style={{ backgroundColor: L.green }} />
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: LR.md, backgroundColor: L.orange }}
              >
                {ticket.buy.label}
                <Icon name={ticket.buy.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
              </button>
            </EventCard>

            <EventCard>
              <div className="flex items-start gap-3">
                <div className="flex-1 text-right min-w-0">
                  <h2 className="text-[13px] font-extrabold" style={{ color: L.navy }}>
                    {group.title}
                  </h2>
                  <span className="mt-1.5 block text-[10.5px]" style={{ color: L.muted }}>
                    {group.forWho}
                  </span>
                  <span className="mt-1 block text-[10.5px] font-bold" style={{ color: L.navy }}>
                    {group.minimum}
                  </span>
                  <span
                    className="mt-2 inline-block px-2.5 py-1 text-[9.5px] font-bold"
                    style={{ borderRadius: LR.sm, backgroundColor: L.greenSoft, color: L.green }}
                  >
                    {group.discount}
                  </span>
                </div>

                <span
                  className="w-12 h-12 flex items-center justify-center shrink-0"
                  style={{ borderRadius: LR.md, backgroundColor: L.page }}
                >
                  <Icon name={group.icon} size={22} style={{ backgroundColor: L.navy }} />
                </span>
              </div>

              <button
                className="mt-4 w-full py-3.5 text-[12px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: LR.md, backgroundColor: L.blue }}
              >
                {group.cta}
              </button>
            </EventCard>

            <p className="flex items-start justify-end gap-2 text-right text-[10.5px] leading-6" style={{ color: L.navy }}>
              {guarantee}
              <Icon name="lucide:circle-check" size={14} className="mt-0.5 shrink-0" style={{ backgroundColor: L.green }} />
            </p>
          </aside>

          {/* ── Main ─────────────────────────────────────────── */}
          <main className="min-w-0 space-y-5">
            <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,420px)] items-center">
              {/* Copy declared first → right of the media. */}
              <div className="text-right order-1">
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] font-bold"
                  style={
                    badge.outline
                      ? { borderRadius: LR.pill, border: `1px solid ${L.blue}`, color: L.blue }
                      : { borderRadius: LR.pill, backgroundColor: L.blueSoft, color: L.blue }
                  }
                >
                  {badge.label}
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: badge.dot ? L.green : L.blue }}
                  />
                </span>

                <h1 className="mt-4 text-[26px] sm:text-[30px] font-extrabold leading-[1.5]" style={{ color: L.navy }}>
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1.5 text-[17px] font-extrabold" style={{ color: L.navy }}>
                    {subtitle}
                  </p>
                )}

                <p className="mt-4 text-[12px] leading-7" style={{ color: L.muted }}>
                  {desc}
                </p>

                <p className="mt-4 flex items-center justify-end gap-2.5">
                  <span className="text-[12px] font-bold" style={{ color: L.navy }}>
                    {instructorLabel} {instructor}
                  </span>
                  <img src={avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                </p>

                <ul className="mt-5 space-y-3">
                  {meta.map((m) => (
                    <li key={m.label} className="flex items-center gap-2.5 justify-end">
                      <span className="text-[11.5px]" style={{ color: L.navy }}>
                        <span style={{ color: L.muted }}>{m.label} </span>
                        <span className="font-bold">{m.value}</span>
                      </span>
                      <Icon name={m.icon} size={15} className="shrink-0" style={{ backgroundColor: L.blue }} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-2">{media}</div>
            </div>

            {/* Tabs. */}
            <div
              className="bg-white px-2 overflow-x-auto"
              style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
            >
              <div className="flex items-center gap-1 min-w-max justify-end">
                {tabs.map((t) => {
                  const on = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="relative flex items-center gap-2 px-5 py-4 text-[12px] whitespace-nowrap"
                      style={{ color: on ? L.blue : L.navy, fontWeight: on ? 800 : 600 }}
                    >
                      {t.label}
                      <Icon name={t.icon} size={14} style={{ backgroundColor: on ? L.blue : L.navy }} />
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

            <EventCard>
              {about.map((p) => (
                <p key={p.slice(0, 20)} className="mb-4 last:mb-0 text-right text-[12.5px] leading-9" style={{ color: L.navy }}>
                  {p}
                </p>
              ))}
            </EventCard>
          </main>
        </div>
      </div>
    </div>
  );
}
