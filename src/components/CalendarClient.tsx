'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import {
  calendarHero,
  calendarToolbar,
  monthDays,
  startWeekday,
  weekdays,
  monthEvents,
  eventKinds,
  calendarFilters,
  upcomingEvents,
  popularEvents,
  calendarSuggest,
} from '@/data/calendar';

/* ──────────────────────────────────────────────────────────────
   تقویم آریاز.

   A calendar earns its place only if the dates are right, so the
   grid is computed rather than transcribed — see the note in
   data/calendar.ts about the source grid not counting. Events are
   pinned to the days the mockup marks.
────────────────────────────────────────────────────────────── */

export default function CalendarClient() {
  const [view, setView] = useState('calendar');

  /* Leading blanks, then the month's days, padded to whole weeks. */
  const cells: (number | null)[] = [
    ...Array<null>(startWeekday).fill(null),
    ...Array.from({ length: monthDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));

  const eventOn = (day: number) => monthEvents.find((e) => e.day === day);

  return (
    <div style={{ backgroundColor: T.page }}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(160deg, ${T.tintPurple}, #ffffff 70%)` }}>
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-9 grid gap-8 lg:grid-cols-[1fr_34%] items-center">
          <div className="text-center lg:text-right lg:order-1">
            <h1 className="text-[28px] sm:text-[32px] font-extrabold" style={{ color: T.ink }}>
              {calendarHero.title}
            </h1>
            {calendarHero.desc.map((d) => (
              <p key={d} className="mt-1.5 text-[13px] leading-7" style={{ color: T.muted }}>
                {d}
              </p>
            ))}

            <div
              className="mt-6 bg-white grid grid-cols-2 xl:grid-cols-4"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              {calendarHero.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="p-4 flex items-center gap-3 justify-center"
                  style={{ borderRight: i === 0 ? undefined : `1px solid ${T.border}` }}
                >
                  <span className="text-right">
                    <span className="block text-[19px] font-extrabold" style={{ color: T.ink }}>
                      {s.value}
                    </span>
                    <span className="block text-[10px]" style={{ color: T.muted }}>
                      {s.label}
                    </span>
                  </span>
                  <span
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
                  >
                    <Icon name={s.icon} size={18} style={{ backgroundColor: s.fg }} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:order-2 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/aryaz/illustrations/quest-intro-illus.png"
              alt=""
              className="h-[190px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid gap-5 xl:grid-cols-[280px_1fr] items-start">
          {/* ── Filters (right in RTL) ─────────────────────────── */}
          <aside className="space-y-4 xl:order-1 xl:sticky xl:top-6">
            <div className="bg-white p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
              <h2
                className="flex items-center justify-end gap-2 text-[13px] font-extrabold pb-3"
                style={{ color: T.ink, borderBottom: `1px solid ${T.border}` }}
              >
                {calendarFilters.title}
                <Icon name="lucide:funnel" size={16} style={{ backgroundColor: T.primary }} />
              </h2>

              <FilterBlock label={calendarFilters.kinds.label}>
                {calendarFilters.kinds.items.map((k) => (
                  <li key={k.label} className="flex items-center gap-2.5 py-1.5">
                    <Check on={k.on} />
                    <span className="flex-1 text-right text-[11.5px]" style={{ color: k.fg }}>
                      {k.label}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: k.fg }} />
                  </li>
                ))}
              </FilterBlock>

              <FilterBlock label={calendarFilters.field.label}>
                <Select value={calendarFilters.field.value} />
              </FilterBlock>

              <FilterBlock label={calendarFilters.mode.label}>
                {calendarFilters.mode.items.map((m) => (
                  <li key={m.label} className="flex items-center gap-2.5 py-1.5">
                    <Check on={m.on} />
                    <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
                      {m.label}
                    </span>
                  </li>
                ))}
              </FilterBlock>

              <FilterBlock label={calendarFilters.status.label}>
                {calendarFilters.status.items.map((s) => (
                  <li key={s.label} className="flex items-center gap-2.5 py-1.5">
                    <Check on={s.on} />
                    <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
                      {s.label}
                    </span>
                  </li>
                ))}
              </FilterBlock>

              <FilterBlock label={calendarFilters.range.label} last>
                <Select value={calendarFilters.range.value} />
              </FilterBlock>

              <button
                className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold"
                style={{ borderRadius: R.md, backgroundColor: T.tintPurple, color: T.primary }}
              >
                <Icon name="lucide:refresh-cw" size={13} style={{ backgroundColor: T.primary }} />
                {calendarFilters.cta}
              </button>
            </div>

            {/* Popular events */}
            <div className="bg-white p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
              <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
                {popularEvents.title}
                <Icon name="lucide:flame" size={15} style={{ backgroundColor: T.accent }} />
              </h2>

              <ul className="mt-3 space-y-3">
                {popularEvents.items.map((p) => (
                  <li key={p.title} className="flex items-center gap-2.5">
                    <span className="flex-1 text-right min-w-0">
                      <span className="block text-[11px] font-bold leading-5" style={{ color: T.ink }}>
                        {p.title}
                      </span>
                      <span className="block text-[9.5px]" style={{ color: T.muted }}>
                        {p.date}
                      </span>
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" className="w-12 h-10 object-cover shrink-0" style={{ borderRadius: R.sm }} />
                  </li>
                ))}
              </ul>

              <button className="mt-3 flex items-center gap-1.5 text-[11px] font-bold" style={{ color: T.primary }}>
                <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: T.primary }} />
                {popularEvents.cta}
              </button>
            </div>
          </aside>

          {/* ── Calendar + events ──────────────────────────────── */}
          <div className="min-w-0 space-y-5 xl:order-2">
            <div
              className="bg-white p-3 flex items-center gap-3 flex-wrap"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <button
                className="flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-bold order-3"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                <Icon name="lucide:refresh-cw" size={13} style={{ backgroundColor: T.muted }} />
                {calendarToolbar.today}
              </button>

              <span className="flex items-center gap-2 order-2">
                <button aria-label="ماه بعد" className="w-8 h-8 flex items-center justify-center" style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}>
                  <Icon name="lucide:chevron-left" size={14} style={{ backgroundColor: T.muted }} />
                </button>
                <span className="flex items-center gap-2 px-4 py-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {calendarToolbar.month}
                  <Icon name="lucide:calendar" size={14} style={{ backgroundColor: T.primary }} />
                </span>
                <button aria-label="ماه قبل" className="w-8 h-8 flex items-center justify-center" style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}>
                  <Icon name="lucide:chevron-right" size={14} style={{ backgroundColor: T.muted }} />
                </button>
              </span>

              <span className="flex-1" />

              <span className="flex items-center gap-1.5 order-1">
                {calendarToolbar.views.map((v) => {
                  const on = v.id === view;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setView(v.id)}
                      aria-pressed={on}
                      className="flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-bold"
                      style={
                        on
                          ? { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                          : { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }
                      }
                    >
                      <Icon name={v.icon} size={13} style={{ backgroundColor: on ? '#fff' : T.muted }} />
                      {v.label}
                    </button>
                  );
                })}
              </span>

              <span className="text-[11.5px] order-0" style={{ color: T.muted }}>
                {calendarToolbar.viewLabel}
              </span>
            </div>

            {/* Month grid */}
            <div
              className="bg-white overflow-hidden"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <div className="grid grid-cols-7">
                {weekdays.map((w) => (
                  <div
                    key={w}
                    className="py-3 text-center text-[11.5px] font-extrabold"
                    style={{ color: T.ink, borderBottom: `1px solid ${T.border}` }}
                  >
                    {w}
                  </div>
                ))}
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((d, di) => {
                    const ev = d ? eventOn(d) : undefined;
                    const kind = ev ? eventKinds[ev.kind] : null;

                    return (
                      <div
                        key={di}
                        className="min-h-[86px] p-2"
                        style={{
                          borderTop: wi === 0 ? undefined : `1px solid ${T.border}`,
                          borderRight: di === 0 ? undefined : `1px solid ${T.border}`,
                          backgroundColor: ev ? '#fbfaff' : undefined,
                        }}
                      >
                        {d && (
                          <>
                            <span
                              className="block text-right text-[12px] font-bold"
                              style={{ color: ev ? T.primary : T.ink }}
                            >
                              {fa(d)}
                            </span>

                            {ev && kind && (
                              <span
                                className="mt-2 flex items-center gap-1.5 px-2 py-1.5 text-[9.5px] font-bold"
                                style={{ borderRadius: R.sm, backgroundColor: kind.bg, color: kind.fg }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: kind.fg }}
                                />
                                <span className="truncate">{ev.label}</span>
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Upcoming events */}
            <section>
              <header className="flex items-center gap-3 mb-3.5">
                <button className="flex items-center gap-1.5 text-[11.5px] font-bold" style={{ color: T.primary }}>
                  <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: T.primary }} />
                  {upcomingEvents.cta}
                </button>
                <h2 className="flex-1 text-right flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: T.ink }}>
                  {upcomingEvents.title}
                  <Icon name="lucide:calendar-days" size={16} style={{ backgroundColor: T.primary }} />
                </h2>
              </header>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                {upcomingEvents.items.map((e) => {
                  const kind = eventKinds[e.kind];
                  return (
                    <article
                      key={e.id}
                      className="bg-white overflow-hidden flex flex-col"
                      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                    >
                      <div className="relative h-[92px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={e.image} alt="" className="w-full h-full object-cover" />
                        <span
                          className="absolute top-2 right-2 px-2.5 py-1 text-[10px] font-bold text-white"
                          style={{ borderRadius: R.sm, backgroundColor: kind.fg }}
                        >
                          {kind.label}
                        </span>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col">
                        <h3 className="text-center text-[12.5px] font-extrabold leading-5" style={{ color: T.ink }}>
                          {e.title}
                        </h3>

                        <span className="mt-2 flex items-center justify-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={e.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-[10px]" style={{ color: T.muted }}>
                            {e.instructor}
                          </span>
                        </span>

                        <div className="mt-2.5 space-y-1 text-center text-[9.5px]" style={{ color: T.muted }}>
                          <p className="flex items-center justify-center gap-1.5">
                            {e.time && <span>{e.time} |</span>}
                            {e.date}
                            <Icon name="lucide:calendar" size={11} style={{ backgroundColor: T.muted }} />
                          </p>
                          <p>{e.duration}</p>
                        </div>

                        <div className="mt-3 flex-1 flex items-end justify-between gap-2">
                          {e.free ? (
                            <span className="flex items-center gap-1 text-[12px] font-extrabold" style={{ color: T.successStrong }}>
                              رایگان
                              <Icon name="lucide:gift" size={12} style={{ backgroundColor: T.successStrong }} />
                            </span>
                          ) : (
                            <span className="text-[11.5px] font-extrabold" style={{ color: T.danger }}>
                              {e.price}
                            </span>
                          )}

                          <button
                            className="px-4 py-2 text-[11px] font-bold"
                            style={
                              e.free
                                ? { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }
                                : { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                            }
                          >
                            {e.cta}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Suggestions */}
            <section
              className="p-5 grid gap-4 lg:grid-cols-[220px_1fr] items-center"
              style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}
            >
              <div className="flex items-center gap-3 lg:order-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aryaz/illustrations/ai-assistant-avatar.png"
                  alt=""
                  className="w-[64px] h-[64px] object-contain shrink-0"
                />
                <span className="text-right">
                  <span className="flex items-center gap-2 text-[13.5px] font-extrabold" style={{ color: T.primary }}>
                    {calendarSuggest.title}
                    <Icon name="lucide:sparkles" size={15} style={{ backgroundColor: T.primary }} />
                  </span>
                  <span className="block mt-1 text-[10px] leading-5" style={{ color: T.muted }}>
                    {calendarSuggest.desc}
                  </span>
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:order-2">
                {calendarSuggest.items.map((s) => (
                  <div key={s.title} className="bg-white p-3.5" style={{ borderRadius: R.md }}>
                    <h3 className="flex items-center justify-end gap-1.5 text-right text-[11px] font-extrabold leading-5" style={{ color: T.ink }}>
                      {s.title}
                      <Icon name="lucide:sparkles" size={12} style={{ backgroundColor: s.fg }} />
                    </h3>

                    <span className="mt-2 flex items-center gap-2 justify-end">
                      <span className="text-right">
                        <span className="block text-[9.5px]" style={{ color: T.muted }}>
                          {s.instructor}
                        </span>
                        <span className="block text-[9.5px]" style={{ color: T.muted }}>
                          {s.date}
                        </span>
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    </span>

                    <button
                      className="mt-2.5 w-full py-1.5 text-[10.5px] font-bold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                    >
                      {s.cta}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Atoms ────────────────────────────────────────────────────── */

function FilterBlock({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className="py-3" style={{ borderBottom: last ? undefined : `1px solid ${T.border}` }}>
      <span className="block text-right text-[11.5px] font-extrabold mb-1.5" style={{ color: T.primary }}>
        {label}
      </span>
      <ul>{children}</ul>
    </div>
  );
}

function Check({ on }: { on: boolean }) {
  return (
    <span
      className="w-[17px] h-[17px] flex items-center justify-center shrink-0"
      style={{
        borderRadius: 5,
        backgroundColor: on ? T.primaryStrong : '#fff',
        border: on ? undefined : `1.5px solid #cdd0e0`,
      }}
    >
      {on && <Icon name="lucide:check" size={11} className="text-white" />}
    </span>
  );
}

function Select({ value }: { value: string }) {
  return (
    <span
      className="flex items-center gap-2 px-3.5 py-2.5"
      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
    >
      <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
      <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
        {value}
      </span>
    </span>
  );
}
