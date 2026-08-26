'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Donut, DonutLegend, BarList } from '@/components/org/panel/Charts';
import Ring from '@/components/org/panel/Ring';
import {
  ReportHead,
  FilterStrip,
  KpiRow,
  AiBand,
  Panel,
  AskBand,
} from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import {
  devHead,
  devKpis,
  devTabs,
  devFilters,
  devAi,
  devAttention,
  devCalendar,
  devPrograms,
  devStatus,
  devCoverage,
  devGapCoverage,
  devNewProgram,
  devSuggestions,
  devAsk,
} from '@/data/orgDevelopment';

/* ──────────────────────────────────────────────────────────────
   Development programmes.

   The index for the section. Programmes that are behind get their
   own panel above the grid rather than a badge inside it — a late
   programme is the thing you came here to find, and it should not
   need looking for.
────────────────────────────────────────────────────────────── */

export default function DevelopmentClient() {
  const [tab, setTab] = useState('all');

  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={devHead.crumbs}
        title={devHead.title}
        desc={devHead.desc}
        icon="lucide:graduation-cap"
        actions={
          <>
            <button
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1.5px solid ${T.primary}`, color: T.primary }}
            >
              <Icon name="lucide:sparkles" size={16} style={{ backgroundColor: T.primary }} />
              {devHead.withAi}
            </button>

            <Link
              href={devHead.create.href}
              data-ripple
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:plus" size={16} className="text-white" />
              {devHead.create.label}
            </Link>
          </>
        }
      />

      <KpiRow kpis={devKpis} cols={5} />

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div
        className="bg-white px-2 overflow-x-auto"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-1 min-w-max">
          {devTabs.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={on}
                className="relative flex items-center gap-2 px-5 py-4 text-[12.5px] whitespace-nowrap transition-colors"
                style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
              >
                {t.label}
                <span
                  className="px-1.5 py-0.5 text-[10px] font-bold"
                  style={{
                    borderRadius: R.sm,
                    backgroundColor: on ? T.tintPurple : T.border,
                    color: on ? T.primary : T.muted,
                  }}
                >
                  {t.count}
                </span>
                {on && (
                  <span
                    className="absolute bottom-0 inset-x-3 h-[3px] rounded-t-full"
                    style={{ backgroundColor: T.primary }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-end gap-2.5 flex-wrap">
        <label
          className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white min-w-[200px]"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:search" size={15} style={{ backgroundColor: T.muted }} />
          <input
            type="search"
            placeholder={devHead.search}
            className="flex-1 min-w-0 bg-transparent text-[12px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </label>

        <div className="flex-1 min-w-[280px]">
          <FilterStrip filters={devFilters} reset={devHead.more} />
        </div>
      </div>

      {/* ── Analysis / attention / calendar ───────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AiBand title={devAi.title} body={devAi.body} chips={devAi.chips} cta={devAi.cta} />
        </div>

        <Panel title={devAttention.title} cta={devAttention.cta}>
          <ul className="space-y-2.5">
            {devAttention.rows.map((r) => (
              <li
                key={r.id}
                className="p-3"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <div className="flex items-center gap-2.5">
                  <Icon name="lucide:ellipsis" size={15} style={{ backgroundColor: T.muted }} />
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[11.5px] font-bold truncate" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <span className="block text-[9.5px]" style={{ color: T.muted }}>
                      {r.people}
                    </span>
                  </span>
                  <Icon name="lucide:triangle-alert" size={15} style={{ backgroundColor: r.colour }} />
                </div>

                <div className="mt-2 flex items-center gap-2.5">
                  <span className="text-[10px] shrink-0" style={{ color: T.muted }}>
                    {r.note}
                  </span>
                  <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${r.pct}%`, backgroundColor: r.colour }}
                    />
                  </span>
                  <span className="text-[10px] font-bold shrink-0" style={{ color: r.colour }}>
                    {r.pct}٪
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={devCalendar.title} cta={devCalendar.cta}>
          <ul className="space-y-2.5">
            {devCalendar.rows.map((r) => (
              <li key={r.label} className="flex items-center gap-3">
                <span
                  className="w-11 py-1.5 text-center shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: '#fafafc' }}
                >
                  <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {r.day}
                  </span>
                  <span className="block text-[8.5px]" style={{ color: T.muted }}>
                    {r.month}
                  </span>
                </span>
                <span className="flex-1 text-right text-[11px] font-semibold" style={{ color: T.ink }}>
                  {r.label}
                </span>
                <Icon name={r.icon} size={16} style={{ backgroundColor: r.fg }} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* ── Programme grid + rails ────────────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_320px] items-start">
        <div className="min-w-0">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {devPrograms.map((p) => (
              <article
                key={p.id}
                className="bg-white p-4 flex flex-col"
                style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
              >
                <header className="flex items-start gap-2.5">
                  <span
                    className="px-2.5 py-1 text-[10px] font-bold shrink-0"
                    style={{ borderRadius: R.pill, backgroundColor: p.stateBg, color: p.stateFg }}
                  >
                    {p.state}
                  </span>
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[13.5px] font-extrabold truncate" style={{ color: T.ink }}>
                      {p.title}
                    </span>
                    <span className="block text-[10px]" style={{ color: T.muted }}>
                      {p.desc}
                    </span>
                  </span>
                </header>

                <div className="mt-3.5 flex items-center gap-3.5">
                  <Ring pct={p.pct} colour={T.primary} size={62} stroke={6} />

                  <dl className="flex-1 space-y-1 text-right">
                    <Fact icon="lucide:users-round" value={p.people} />
                    <Fact icon="lucide:calendar" label="شروع:" value={p.start} />
                    <Fact icon="lucide:flag" label="پایان:" value={p.end} />
                  </dl>
                </div>

                <p className="mt-1.5 text-right text-[10px] font-bold" style={{ color: T.successStrong }}>
                  {p.delta} اثربخشی
                </p>

                <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
                  <p className="text-right text-[10.5px] font-bold mb-1.5" style={{ color: T.ink }}>
                    {p.doneLabel}
                  </p>
                  <ul className="space-y-1.5">
                    {p.done.map((d) => (
                      <li key={d.label} className="flex items-center gap-2 text-[10px]" style={{ color: T.muted }}>
                        <span className="flex-1 text-right">{d.label}</span>
                        <Icon
                          name={d.on ? 'lucide:circle-check' : 'lucide:clock'}
                          size={12}
                          style={{ backgroundColor: d.on ? T.success : T.warning }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    aria-label="عملیات"
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                  >
                    <Icon name="lucide:ellipsis" size={15} style={{ backgroundColor: T.muted }} />
                  </button>
                  <Link
                    href={`/org/development/${p.id}`}
                    className="flex-1 py-2.5 text-center text-[11.5px] font-bold"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
                  >
                    {p.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Panel title={devStatus.title}>
            <div className="flex items-center gap-3">
              <Donut
                slices={devStatus.slices}
                size={106}
                thickness={20}
                centre={devStatus.centre}
                centreSub={devStatus.centreSub}
              />
              <div className="flex-1 min-w-0">
                <DonutLegend slices={devStatus.slices} />
              </div>
            </div>
          </Panel>

          <Panel title={devCoverage.title} cta={devCoverage.cta}>
            <BarList rows={devCoverage.rows} max={100} />
          </Panel>

          <AskBand title={devAsk.title} placeholder={devAsk.placeholder} chips={devAsk.chips} />
        </div>
      </div>

      {/* ── Gaps / new / suggestions ──────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={devGapCoverage.title} cta={devGapCoverage.cta}>
          <ul className="space-y-3">
            {devGapCoverage.rows.map((r) => (
              <li key={r.label}>
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="font-bold" style={{ color: r.colour }}>
                    {r.pct}٪
                  </span>
                  <span className="font-bold" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                </div>
                <span className="mt-1.5 block h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${r.pct}%`, backgroundColor: r.colour }}
                  />
                </span>
                <div className="mt-1 flex items-center justify-between text-[9px]" style={{ color: T.muted }}>
                  <span>{r.total}</span>
                  <span>{r.people}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={devNewProgram.title}>
          <ul className="space-y-2.5">
            {devNewProgram.options.map((o) => (
              <li key={o.id}>
                <Link
                  href="/org/development/new"
                  className="flex items-center gap-3 p-3 transition-colors hover:bg-gray-50"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                      {o.label}
                    </span>
                    <span className="block text-[9.5px] leading-4" style={{ color: T.muted }}>
                      {o.desc}
                    </span>
                  </span>
                  <span
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ borderRadius: R.sm, backgroundColor: o.bg }}
                  >
                    <Icon name={o.icon} size={16} style={{ backgroundColor: o.fg }} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={devSuggestions.title} cta={devSuggestions.cta}>
          <ul className="space-y-2.5">
            {devSuggestions.rows.map((r) => (
              <li
                key={r.label}
                className="flex items-start gap-2.5 p-2.5"
                style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
              >
                <span className="flex-1 text-right text-[10.5px] leading-5" style={{ color: T.ink }}>
                  {r.label}
                </span>
                <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: string; label?: string; value: string }) {
  return (
    <div className="flex items-center justify-end gap-1.5 text-[10px]" style={{ color: T.ink }}>
      <span className="font-bold">{value}</span>
      {label && <span style={{ color: T.muted }}>{label}</span>}
      <Icon name={icon} size={12} style={{ backgroundColor: T.muted }} />
    </div>
  );
}
