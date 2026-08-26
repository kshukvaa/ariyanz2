'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import {
  panelTheme,
  dashHead,
  dashStats,
  dashActions,
  dashActiveEvaluations,
  dashTestStatus,
  dashUnits,
  dashActivity,
  dashTrend,
  dashInsights,
  dashResults,
  dashQuickActions,
} from '@/data/orgPanel';

/* ──────────────────────────────────────────────────────────────
   داشبورد ارزیابی سازمان.

   Every figure here is a decision waiting to happen, so the page
   is ordered by how urgent it is: the four counters, then the
   three things needing an answer today, then the running work,
   then the reading of it.

   All four figures are hand-drawn SVG — no chart library — so the
   ring, donut, bars and trend share one visual language.
────────────────────────────────────────────────────────────── */

export default function OrgDashboardClient() {
  return (
    <div className="space-y-5">
      <Head />
      <Stats />
      <Actions />

      {/* RTL: the first child is the right-hand column, so each row is
          written in the order the mockup reads it — right to left. */}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <ActiveEvaluations />
        <TestStatus />
        <Units />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,0.95fr)_minmax(0,0.95fr)_minmax(0,1.25fr)]">
        <Activity />
        <Trend />
        <Insights />
        <ResultsOverview />
      </div>

      <QuickActions />
    </div>
  );
}

/* ── Head ───────────────────────────────────────────────────── */

function Head() {
  return (
    <section className="text-right">
      <h1 className="text-[22px] sm:text-[26px] font-black mb-3" style={{ color: panelTheme.navy }}>
        {dashHead.greeting} <span aria-hidden="true">👋</span>
      </h1>
      <h2 className="text-[17px] font-black mb-2" style={{ color: panelTheme.navy }}>
        {dashHead.title}
      </h2>
      <p className="text-[12.5px] text-gray-500 leading-8">{dashHead.desc}</p>
    </section>
  );
}

/* ── Counters ───────────────────────────────────────────────── */

function Stats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashStats.map((s) => (
        <article
          key={s.id}
          className="bg-white rounded-2xl border p-5 flex items-center gap-4"
          style={{ borderColor: panelTheme.border }}
        >
          {s.ring !== undefined ? (
            <Ring percent={s.ring} label={s.value} />
          ) : (
            <span
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: s.tint }}
            >
              <Icon name={s.icon} size={24} style={{ backgroundColor: s.color }} />
            </span>
          )}

          <span className="flex-1 text-right min-w-0">
            {s.ring === undefined && (
              <span className="block text-[26px] font-black leading-none mb-1.5" style={{ color: panelTheme.navy }}>
                {s.value}
              </span>
            )}
            <span className="block text-[12.5px] font-bold" style={{ color: panelTheme.navy }}>
              {s.label}
            </span>
            <span className="block text-[10.5px] text-gray-400 mt-1">{s.note}</span>
          </span>
        </article>
      ))}
    </section>
  );
}

/** The completion tile shows its number inside the ring it fills. */
function Ring({ percent, label }: { percent: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16 shrink-0" role="img" aria-label={label}>
      <circle cx="32" cy="32" r={r} fill="none" stroke="#EDEFF7" strokeWidth="7" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke={panelTheme.violet}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${(percent / 100) * c} ${c}`}
        transform="rotate(-90 32 32)"
      />
      <text x="32" y="36" textAnchor="middle" fontSize="14" fontWeight="900" fill={panelTheme.navy}>
        {label}
      </text>
    </svg>
  );
}

/* ── Needs your attention ───────────────────────────────────── */

function Actions() {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-center justify-between mb-4">
        <Link
          href="#"
          className="text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: panelTheme.violet }}
        >
          مشاهده همه
        </Link>
        <h2 className="text-[14.5px] font-black" style={{ color: panelTheme.navy }}>
          نیازمند اقدام شما
        </h2>
      </div>

      <ul className="grid gap-4 lg:grid-cols-3">
        {dashActions.map((a) => (
          <li
            key={a.id}
            className="rounded-xl border p-4 flex items-center gap-4"
            style={{ borderColor: panelTheme.border, backgroundColor: '#FBFBFE' }}
          >
            <span
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: a.tint }}
            >
              <Icon name={a.icon} size={20} style={{ backgroundColor: a.color }} />
            </span>

            <span className="flex-1 text-right min-w-0">
              <span className="block text-[12px] leading-7 mb-2" style={{ color: panelTheme.ink }}>
                {a.text}
              </span>
              <Link
                href={a.href}
                className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[11px] font-bold transition-colors hover:border-violet-300"
                style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
              >
                {a.cta}
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Active evaluations ─────────────────────────────────────── */

function ActiveEvaluations() {
  return (
    <section
      id="evaluations"
      className="bg-white rounded-2xl border p-5 scroll-mt-24"
      style={{ borderColor: panelTheme.border }}
    >
      <div className="flex items-center justify-between mb-4">
        <Link
          href="#"
          className="text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: panelTheme.violet }}
        >
          مشاهده همه
        </Link>
        <h2 className="text-[14.5px] font-black" style={{ color: panelTheme.navy }}>
          ارزیابی‌های فعال
        </h2>
      </div>

      <ul className="space-y-4">
        {dashActiveEvaluations.map((e) => (
          <li key={e.id} className="flex items-start gap-3">
            <span
              className="w-11 h-11 rounded-full flex flex-col items-center justify-center shrink-0 text-[9.5px] font-bold"
              style={{ backgroundColor: e.tint, color: e.color }}
            >
              <Icon name="lucide:users-round" size={15} style={{ backgroundColor: e.color }} />
              <span className="mt-0.5">{e.people}</span>
            </span>

            <span className="flex-1 min-w-0 text-right">
              <span className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10.5px] text-gray-400">{e.deadline}</span>
                <span className="text-[12.5px] font-bold truncate" style={{ color: panelTheme.navy }}>
                  {e.title}
                </span>
              </span>

              <span className="flex items-center gap-2 mb-1.5">
                <span className="text-[12px] font-black shrink-0" style={{ color: panelTheme.navy }}>
                  {toPersian(e.percent)}%
                </span>
                <span className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${e.percent}%`, backgroundColor: e.color }}
                  />
                </span>
              </span>

              <span className="flex items-center justify-end gap-2 text-[10px] text-gray-400">
                <span>{toPersian(e.notStarted)} شروع نکرده</span>
                <span className="text-gray-200">|</span>
                <span>{toPersian(e.doing)} در حال انجام</span>
                <span className="text-gray-200">|</span>
                <span>{toPersian(e.done)} تکمیل شده</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Test status donut ──────────────────────────────────────── */

function TestStatus() {
  const size = 190;
  const r = 66;
  const stroke = 26;
  const c = 2 * Math.PI * r;

  /* Each arc starts where the previous one ended, so the offsets are
     summed up front rather than accumulated while rendering. */
  const arcs = dashTestStatus.slices.map((s, i) => ({
    ...s,
    length: (s.percent / 100) * c,
    offset: (dashTestStatus.slices.slice(0, i).reduce((n, p) => n + p.percent, 0) / 100) * c,
  }));

  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      <h2 className="text-[14.5px] font-black mb-4 text-right" style={{ color: panelTheme.navy }}>
        {dashTestStatus.title}
      </h2>

      <div className="flex items-center gap-4">
        <ul className="space-y-2.5 shrink-0">
          {dashTestStatus.slices.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-[11px] text-gray-500 flex-1">{s.label}</span>
              <span className="text-[11px] font-bold tabular-nums" style={{ color: panelTheme.navy }}>
                {toPersian(s.percent)}٪
              </span>
            </li>
          ))}
        </ul>

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="flex-1 max-w-[190px]"
          role="img"
          aria-label={`${dashTestStatus.centre.value} ${dashTestStatus.centre.label}`}
        >
          {arcs.map((s) => (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${s.length} ${c - s.length}`}
              strokeDashoffset={-s.offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          ))}
          <text
            x={size / 2}
            y={size / 2 - 2}
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fill={panelTheme.navy}
          >
            {dashTestStatus.centre.value}
          </text>
          <text x={size / 2} y={size / 2 + 18} textAnchor="middle" fontSize="11" fill="#8B93A8">
            {dashTestStatus.centre.label}
          </text>
        </svg>
      </div>

      <p
        className="text-[11px] text-gray-500 text-center mt-4 pt-3 border-t"
        style={{ borderColor: panelTheme.border }}
      >
        {dashTestStatus.total}
      </p>
    </section>
  );
}

/* ── Completion by unit ─────────────────────────────────────── */

function Units() {
  const max = 100;

  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-center justify-between gap-3 mb-6">
        <span
          className="relative flex items-center gap-2 rounded-xl border px-3.5 py-2"
          style={{ borderColor: panelTheme.border }}
        >
          <Icon name="lucide:chevron-down" size={14} className="text-gray-400" />
          <select
            aria-label={dashUnits.selectLabel}
            className="bg-transparent text-[11.5px] font-bold focus:outline-none appearance-none cursor-pointer"
            style={{ color: panelTheme.navy }}
          >
            <option>{dashUnits.selectLabel}</option>
          </select>
        </span>

        <h2 className="text-[14.5px] font-black" style={{ color: panelTheme.navy }}>
          {dashUnits.title}
        </h2>
      </div>

      {/* Bars run bottom-up; heights are the percentages themselves. */}
      <ul className="flex items-end justify-between gap-3 h-[190px]">
        {dashUnits.bars.map((b) => (
          <li key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
            <span className="text-[12px] font-black mb-2" style={{ color: panelTheme.navy }}>
              {toPersian(b.percent)}%
            </span>
            <span
              className="w-full max-w-[34px] rounded-t-lg"
              style={{ height: `${(b.percent / max) * 100}%`, backgroundColor: '#8B6EF3' }}
            />
            <span className="text-[10.5px] text-gray-500 mt-2 text-center leading-5">{b.label}</span>
          </li>
        ))}
      </ul>

      <div className="text-center mt-4 pt-3 border-t" style={{ borderColor: panelTheme.border }}>
        <Link
          href="/org/employees"
          className="text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: panelTheme.violet }}
        >
          {dashUnits.cta}
        </Link>
      </div>
    </section>
  );
}

/* ── Latest activity ────────────────────────────────────────── */

function Activity() {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-center justify-between mb-4">
        <Link
          href="#"
          className="text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: panelTheme.violet }}
        >
          مشاهده همه
        </Link>
        <h2 className="text-[14.5px] font-black" style={{ color: panelTheme.navy }}>
          آخرین فعالیت‌ها
        </h2>
      </div>

      <ul className="space-y-4">
        {dashActivity.map((a) => (
          <li key={a.id} className="flex items-start gap-2">
            <span className="text-[10px] text-gray-400 shrink-0 pt-1 w-[42px] text-left" dir="ltr">
              {a.when}
            </span>
            <span className="flex-1 text-[11.5px] leading-7 text-right" style={{ color: panelTheme.ink }}>
              {a.text}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
              style={{ backgroundColor: a.color }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Trend ──────────────────────────────────────────────────── */

function Trend() {
  const w = 300;
  const h = 170;
  const padX = 26;
  const padY = 18;
  const months = dashTrend.months;

  const px = (i: number) => padX + (i * (w - padX * 2)) / (months.length - 1);
  const py = (v: number) => padY + ((100 - v) / 100) * (h - padY * 2);

  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <span
          className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-[11px] font-bold"
          style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
        >
          <Icon name="lucide:chevron-down" size={13} className="text-gray-400" />
          <span>{dashTrend.rangeLabel}</span>
        </span>

        <h2 className="text-[14.5px] font-black" style={{ color: panelTheme.navy }}>
          {dashTrend.title}
        </h2>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={dashTrend.title}>
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={padX} y1={py(g)} x2={w - padX} y2={py(g)} stroke="#EEF0F7" />
            <text x={w - padX + 4} y={py(g) + 3} fontSize="8" fill="#9AA3B8">
              {toPersian(g)}٪
            </text>
          </g>
        ))}

        {dashTrend.series.map((s) => (
          <g key={s.id}>
            <polyline
              points={s.values.map((v, i) => `${px(i)},${py(v)}`).join(' ')}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {s.values.map((v, i) => (
              <circle key={i} cx={px(i)} cy={py(v)} r="2.6" fill={s.color} />
            ))}
          </g>
        ))}

        {months.map((m, i) => (
          <text key={m} x={px(i)} y={h - 3} textAnchor="middle" fontSize="8" fill="#8B93A8">
            {m}
          </text>
        ))}
      </svg>

      <ul className="flex items-center justify-center gap-5 mt-2">
        {dashTrend.series.map((s) => (
          <li key={s.id} className="flex items-center gap-1.5 text-[10.5px] text-gray-500">
            <span className="w-4 h-[2px] rounded-full" style={{ backgroundColor: s.color }} />
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Insights ───────────────────────────────────────────────── */

function Insights() {
  return (
    <section className="bg-white rounded-2xl border p-5 flex flex-col" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-center justify-between mb-4">
        <Link
          href={dashInsights.href}
          className="text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: panelTheme.violet }}
        >
          مشاهده همه
        </Link>
        <h2 className="text-[14.5px] font-black" style={{ color: panelTheme.navy }}>
          {dashInsights.title}
        </h2>
      </div>

      <ul className="space-y-3 mb-4">
        {dashInsights.items.map((it) => (
          <li
            key={it.text}
            className="flex items-start gap-3 rounded-xl p-3"
            style={{ backgroundColor: '#FBFBFE' }}
          >
            <span className="flex-1 text-[11px] leading-7 text-right" style={{ color: panelTheme.ink }}>
              {it.text}
            </span>
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white"
              style={{ border: `1px solid ${panelTheme.border}` }}
            >
              <Icon name={it.icon} size={16} style={{ backgroundColor: it.color }} />
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={dashInsights.href}
        className="group mt-auto flex items-center justify-center gap-2 text-[12px] font-bold"
        style={{ color: panelTheme.violet }}
      >
        <Icon name="lucide:message-circle" size={15} style={{ backgroundColor: panelTheme.violet }} />
        <span>{dashInsights.cta}</span>
        <Icon
          name="lucide:arrow-left"
          size={13}
          className="transition-transform group-hover:-translate-x-1"
        />
      </Link>
    </section>
  );
}

/* ── Results overview ───────────────────────────────────────── */

function ResultsOverview() {
  return (
    <section
      id="results"
      className="bg-white rounded-2xl border p-5 flex flex-col scroll-mt-24"
      style={{ borderColor: panelTheme.border }}
    >
      <h2 className="text-[14.5px] font-black mb-4 text-right" style={{ color: panelTheme.navy }}>
        {dashResults.title}
      </h2>

      <div className="grid grid-cols-3 gap-2.5">
        {dashResults.columns.map((c) => (
          <div
            key={c.title}
            className="rounded-xl border p-2.5 min-w-0"
            style={{ borderColor: panelTheme.border }}
          >
            <h3 className="flex items-center gap-1.5 text-[10.5px] font-black mb-3 leading-5" style={{ color: c.color }}>
              <Icon name={c.icon} size={14} style={{ backgroundColor: c.color }} />
              <span>{c.title}</span>
            </h3>
            <ul className="space-y-2">
              {c.items.map((i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-[10.5px] leading-6" style={{ color: panelTheme.ink }}>
                    {i}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div
          className="rounded-xl border p-2.5 min-w-0 text-center flex flex-col justify-center"
          style={{ borderColor: panelTheme.border }}
        >
          <h3
            className="flex items-center justify-center gap-1.5 text-[10.5px] font-black mb-2 leading-5"
            style={{ color: dashResults.gap.color }}
          >
            <Icon name={dashResults.gap.icon} size={14} style={{ backgroundColor: dashResults.gap.color }} />
            <span>{dashResults.gap.title}</span>
          </h3>
          <p className="text-[10.5px] text-gray-500 mb-1">{dashResults.gap.skill}</p>
          <p className="text-[22px] font-black leading-none" style={{ color: panelTheme.navy }}>
            {dashResults.gap.value}
          </p>
          <p className="text-[10px] text-gray-400 mt-1">{dashResults.gap.note}</p>
        </div>
      </div>

      <div className="text-center mt-auto pt-4">
        <Link
          href={dashResults.href}
          className="text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: panelTheme.violet }}
        >
          {dashResults.cta}
        </Link>
      </div>
    </section>
  );
}

/* ── Quick actions ──────────────────────────────────────────── */

function QuickActions() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashQuickActions.map((a) => (
        <Link
          key={a.id}
          href={a.href}
          className="group bg-white rounded-2xl border p-5 flex items-center gap-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{ borderColor: panelTheme.border }}
        >
          {/* RTL: the tile anchors the right, the arrow closes on the left. */}
          <span
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: a.tint }}
          >
            <Icon name={a.icon} size={22} style={{ backgroundColor: a.color }} />
          </span>

          <span className="flex-1 text-right min-w-0">
            <span className="block text-[13.5px] font-black mb-1" style={{ color: panelTheme.navy }}>
              {a.title}
            </span>
            <span className="block text-[10.5px] text-gray-500">{a.desc}</span>
          </span>

          <Icon
            name="lucide:arrow-left"
            size={16}
            className="text-gray-300 shrink-0 transition-transform group-hover:-translate-x-1"
          />
        </Link>
      ))}
    </section>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
