'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Radar, BarGroup } from '@/components/org/panel/Charts';
import { T, R } from '@/data/panelTokens';
import {
  compareHead,
  comparePeriods,
  compareKpis,
  compareDimensions,
  compareRadar,
  compareDistribution,
  compareChanges,
  compareInsight,
} from '@/data/orgCompare';

/* ──────────────────────────────────────────────────────────────
   Period comparison.

   Two runs of one assessment, set against each other. The page
   answers three questions in order — did it move, where did it
   move, and which way — so the KPI strip comes first, the shape
   comparison second, and the signed per-dimension table last.
────────────────────────────────────────────────────────────── */

export default function CompareClient() {
  return (
    <div className="space-y-5">
      {/* ── Title row ─────────────────────────────────────────── */}
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <Link
          href="/org/assessments"
          className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:arrow-right" size={16} style={{ backgroundColor: T.muted }} />
          {compareHead.back}
        </Link>

        <div className="text-right">
          <nav className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            {compareHead.crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {i > 0 && (
                  <Icon name="lucide:chevron-left" size={12} style={{ backgroundColor: T.muted }} />
                )}
                {c.href ? (
                  <Link href={c.href} className="hover:opacity-70">
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: T.ink }}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="mt-1.5 flex items-center justify-end gap-2.5">
            <h1 className="text-[24px] font-extrabold" style={{ color: T.ink }}>
              {compareHead.title}
            </h1>
            <Icon
              name="lucide:chart-no-axes-combined"
              size={23}
              style={{ backgroundColor: T.primary }}
            />
          </div>
        </div>
      </div>

      {/* ── Period pair ───────────────────────────────────────── */}
      <section
        className="bg-white p-5"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <header className="text-center">
          <h2 className="text-[18px] font-extrabold" style={{ color: T.ink }}>
            {compareHead.assessment}
          </h2>
          <p className="mt-1 text-[12px]" style={{ color: T.muted }}>
            {compareHead.desc}
          </p>
        </header>

        <div className="mt-4 flex items-stretch gap-4 flex-wrap justify-center">
          <PeriodCard p={comparePeriods.previous} />

          <span className="flex items-center shrink-0">
            <span
              className="w-11 h-11 rounded-full flex items-center justify-center text-[12px] font-extrabold"
              style={{ backgroundColor: '#f4f4f8', color: T.muted }}
            >
              {comparePeriods.vs}
            </span>
          </span>

          <PeriodCard p={comparePeriods.current} />
        </div>

        <div className="mt-4 flex items-center gap-2.5 justify-center flex-wrap">
          <button
            className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:funnel" size={15} style={{ backgroundColor: T.muted }} />
            {compareHead.filters}
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:download" size={15} style={{ backgroundColor: T.muted }} />
            {compareHead.download}
          </button>
        </div>
      </section>

      {/* ── KPI strip ─────────────────────────────────────────── */}
      <div
        className="bg-white grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        {compareKpis.map((k, i) => (
          <div
            key={k.id}
            className="p-4 flex items-center gap-3"
            style={{
              borderRight: i === 0 ? undefined : `1px solid ${T.border}`,
            }}
          >
            <span
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: k.bg }}
            >
              <Icon name={k.icon} size={20} style={{ backgroundColor: k.fg }} />
            </span>

            <span className="flex-1 text-right min-w-0">
              <span className="block text-[11px]" style={{ color: T.muted }}>
                {k.label}
              </span>
              <span className="block text-[19px] font-extrabold leading-tight" style={{ color: T.ink }}>
                {k.value}
              </span>
              <span className="block text-[10px]" style={{ color: T.muted }}>
                {k.against}
              </span>
              <span
                className="mt-1 flex items-center justify-end gap-1 text-[10.5px] font-bold"
                style={{ color: k.up ? T.successStrong : T.danger }}
              >
                ({k.pct})
                <Icon
                  name={k.up ? 'lucide:arrow-up' : 'lucide:trending-down'}
                  size={11}
                  style={{ backgroundColor: k.up ? T.successStrong : T.danger }}
                />
                {k.delta}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* ── Three panels ──────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={compareRadar.title} cta={compareRadar.cta}>
          <Legend series={compareRadar.series} />
          <Radar axes={compareDimensions} series={compareRadar.series} size={252} showValues={false} />
        </Panel>

        <Panel title={compareDistribution.title} cta={compareDistribution.cta}>
          <Legend series={compareDistribution.series} />
          <BarGroup
            categories={compareDistribution.categories}
            series={compareDistribution.series}
            height={190}
            axis={compareDistribution.axis}
          />
        </Panel>

        <Panel title={compareChanges.title} cta={compareChanges.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th className="pb-2 text-[10.5px] font-bold" style={{ color: T.muted }}>
                  {compareChanges.cols.delta}
                </th>
                <th className="pb-2 text-[10.5px] font-bold" style={{ color: T.muted }}>
                  {compareChanges.cols.dim}
                </th>
              </tr>
            </thead>
            <tbody>
              {compareChanges.rows.map((r) => (
                <tr key={r.label} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5">
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold"
                      style={{
                        borderRadius: R.sm,
                        backgroundColor: r.up ? T.tintGreen : T.tintRed,
                        color: r.up ? T.successStrong : T.danger,
                      }}
                    >
                      <Icon
                        name={r.up ? 'lucide:arrow-up' : 'lucide:trending-down'}
                        size={11}
                        style={{ backgroundColor: r.up ? T.successStrong : T.danger }}
                      />
                      {r.delta}
                    </span>
                  </td>
                  <td className="py-2.5 text-[11.5px]" style={{ color: T.ink }}>
                    {r.label}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      {/* ── Insight ───────────────────────────────────────────── */}
      <section
        className="flex items-start gap-4 p-5 flex-wrap"
        style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}
      >
        <div className="flex-1 min-w-[240px] text-right space-y-1.5">
          {compareInsight.lines.map((l) => (
            <p key={l} className="text-[12.5px] leading-7" style={{ color: T.ink }}>
              {highlight(l, compareInsight.highlight)}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <h2 className="text-[14px] font-extrabold" style={{ color: T.primary }}>
            {compareInsight.title}
          </h2>
          <Icon name="lucide:sparkles" size={21} style={{ backgroundColor: T.primary }} />
        </div>
      </section>
    </div>
  );
}

/* ── Pieces ───────────────────────────────────────────────────── */

function PeriodCard({
  p,
}: {
  p: { badge: string; name: string; range: string; people: string; fg: string; bg: string };
}) {
  return (
    <div
      className="flex-1 min-w-[240px] max-w-[420px] p-4 text-center"
      style={{ borderRadius: R.md, backgroundColor: p.bg, border: `1px solid ${p.bg}` }}
    >
      <span className="text-[11px] font-bold" style={{ color: p.fg }}>
        {p.badge}
      </span>

      <div className="mt-2 flex items-center justify-center gap-2">
        <h3 className="text-[18px] font-extrabold" style={{ color: T.ink }}>
          {p.name}
        </h3>
        <Icon name="lucide:calendar-check" size={19} style={{ backgroundColor: p.fg }} />
      </div>

      <p className="mt-1.5 flex items-center justify-center gap-1.5 text-[11px]" style={{ color: T.muted }}>
        {p.range}
        <Icon name="lucide:calendar" size={12} style={{ backgroundColor: T.muted }} />
      </p>

      <p className="mt-1 text-[11px]" style={{ color: T.muted }}>
        {p.people}
      </p>
    </div>
  );
}

function Panel({
  title,
  cta,
  children,
}: {
  title: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="bg-white p-4 flex flex-col"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <h2 className="text-right text-[13px] font-extrabold mb-3" style={{ color: T.ink }}>
        {title}
      </h2>

      <div className="flex-1">{children}</div>

      <button
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
      >
        <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: T.primary }} />
        {cta}
      </button>
    </section>
  );
}

function Legend({ series }: { series: { name: string; colour: string; dashed?: boolean }[] }) {
  return (
    <ul className="flex items-center justify-end gap-4 mb-2">
      {series.map((s) => (
        <li key={s.name} className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
          {s.name}
          <span
            className="w-4 h-0 shrink-0"
            style={{
              borderTop: `${s.dashed ? '2px dashed' : '3px solid'} ${s.colour}`,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

/* Bolds the few phrases the insight is actually about, so the
   sentence can be skimmed without reading it end to end. */
function highlight(text: string, terms: string[]) {
  const parts = text.split(new RegExp(`(${terms.join('|')})`, 'g'));
  return parts.map((p, i) =>
    terms.includes(p) ? (
      <strong key={i} style={{ color: T.primary, fontWeight: 800 }}>
        {p}
      </strong>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    )
  );
}
