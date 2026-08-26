'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Radar, Donut, DonutLegend, LineTrend, Gauge } from '@/components/org/panel/Charts';
import {
  ReportHead,
  FilterStrip,
  KpiRow,
  Panel,
  AskBand,
} from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import {
  resultsHead,
  resultsFilters,
  resultsKpis,
  resultsInsights,
  resultsTestBreakdown,
  resultsMyReports,
  resultsRecent,
  resultsAsk,
} from '@/data/orgResults';
/* Shared with the comprehensive report on purpose — these panels
   show the same organisation-level figures, and importing them
   keeps the two screens from drifting apart. */
import {
  overviewScore,
  overviewTrend,
  overviewRadar,
  overviewTalent,
  overviewDistribution,
  overviewUnits,
} from '@/data/orgOverview';

/* ──────────────────────────────────────────────────────────────
   Results landing.

   The section's front door: the same organisation-level picture
   the comprehensive report opens with, plus the routes out — to a
   custom report, to the saved ones, or to asking Aryaz directly.
────────────────────────────────────────────────────────────── */

export default function ResultsClient() {
  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={resultsHead.crumbs}
        title={resultsHead.title}
        desc={resultsHead.desc}
        actions={
          <>
            <button
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:download" size={16} style={{ backgroundColor: T.muted }} />
              {resultsHead.download}
            </button>

            <Link
              href={resultsHead.build.href}
              data-ripple
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:plus" size={16} className="text-white" />
              {resultsHead.build.label}
            </Link>
          </>
        }
      />

      <FilterStrip filters={resultsFilters} />

      <KpiRow kpis={resultsKpis} cols={5} />

      {/* ── One-line findings ─────────────────────────────────── */}
      <section
        className="p-4 flex items-center gap-3 flex-wrap"
        style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}
      >
        <button
          data-ripple
          className="flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-bold text-white shrink-0"
          style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
        >
          <Icon name="lucide:sparkles" size={14} className="text-white" />
          {resultsInsights.cta}
        </button>

        <div className="flex-1 flex items-center gap-2.5 flex-wrap justify-end">
          {resultsInsights.chips.map((c) => (
            <span
              key={c.label}
              className="flex items-center gap-2 px-3 py-2 bg-white"
              style={{ borderRadius: R.md }}
            >
              <span className="text-right">
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {c.label}
                </span>
                <span className="block text-[11px] font-bold" style={{ color: c.fg }}>
                  {c.value}
                </span>
              </span>
              <Icon name={c.icon} size={14} style={{ backgroundColor: c.fg }} />
            </span>
          ))}
        </div>
      </section>

      {/* ── Trend + gauge ─────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={overviewTrend.title}>
          <LineTrend
            points={overviewTrend.points}
            labels={overviewTrend.labels}
            min={58}
            max={82}
            height={170}
          />
        </Panel>

        <Panel title={overviewScore.title}>
          <div className="flex items-center gap-5 justify-center flex-wrap">
            <div className="flex flex-col gap-2">
              {overviewScore.periods.map((p) => (
                <span
                  key={p.label}
                  className="px-3 py-2 text-center"
                  style={{ borderRadius: R.md, backgroundColor: p.bg }}
                >
                  <span className="block text-[10px]" style={{ color: T.muted }}>
                    {p.label}
                  </span>
                  <span className="block text-[14px] font-extrabold" style={{ color: p.fg }}>
                    {p.value}
                  </span>
                </span>
              ))}
            </div>

            <Gauge value={overviewScore.value} max={overviewScore.max} size={190} />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2.5">
            <span
              className="px-3 py-1.5 text-[11px] font-bold"
              style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
            >
              {overviewScore.level}
            </span>
            <span
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold"
              style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
            >
              {overviewScore.delta}
              <Icon name="lucide:arrow-up" size={11} style={{ backgroundColor: T.successStrong }} />
            </span>
          </div>
        </Panel>
      </div>

      {/* ── Competency map + unit performance ─────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={overviewRadar.title}>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[190px]">
              <Radar
                axes={overviewRadar.axes}
                series={[{ name: 'سازمان', colour: T.primary, values: overviewRadar.values }]}
                size={238}
              />
            </div>

            <div className="w-[164px] space-y-2.5 shrink-0">
              <div className="p-3" style={{ borderRadius: R.md, backgroundColor: T.tintGreen }}>
                <h3 className="text-right text-[10.5px] font-extrabold" style={{ color: T.successStrong }}>
                  {overviewRadar.strengthsTitle}
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {overviewRadar.strengths.map((s) => (
                    <li key={s.label} className="flex items-center gap-1.5 text-[10.5px]">
                      <span className="font-extrabold" style={{ color: T.ink }}>
                        {s.value}
                      </span>
                      <span className="flex-1 text-right" style={{ color: T.ink }}>
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3" style={{ borderRadius: R.md, backgroundColor: T.tintRed }}>
                <h3 className="text-right text-[10.5px] font-extrabold" style={{ color: T.danger }}>
                  {overviewRadar.gapsTitle}
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {overviewRadar.gaps.map((g) => (
                    <li key={g.label} className="flex items-center gap-1.5 text-[10.5px]">
                      <span className="font-extrabold" style={{ color: T.ink }}>
                        {g.value}
                      </span>
                      <span className="flex-1 text-right" style={{ color: T.ink }}>
                        {g.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title={overviewUnits.title} cta={overviewUnits.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {[
                  overviewUnits.cols.state,
                  overviewUnits.cols.done,
                  overviewUnits.cols.change,
                  overviewUnits.cols.score,
                  overviewUnits.cols.unit,
                  overviewUnits.cols.rank,
                ].map((c) => (
                  <th key={c} className="pb-2 text-[10px] font-bold" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {overviewUnits.rows.map((r) => (
                <tr key={r.unit} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5">
                    <span
                      className="px-2 py-0.5 text-[9.5px] font-bold"
                      style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.state}
                    </span>
                  </td>
                  <td className="py-2.5 text-[10.5px]" style={{ color: T.ink }}>
                    {r.done}
                  </td>
                  <td className="py-2.5">
                    <span
                      className="flex items-center justify-end gap-0.5 text-[10.5px] font-bold"
                      style={{ color: r.up ? T.successStrong : T.danger }}
                    >
                      {r.change}
                      <Icon
                        name={r.up ? 'lucide:arrow-up' : 'lucide:trending-down'}
                        size={10}
                        style={{ backgroundColor: r.up ? T.successStrong : T.danger }}
                      />
                    </span>
                  </td>
                  <td className="py-2.5 text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {r.score}
                  </td>
                  <td className="py-2.5 text-[11px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                    {r.unit}
                  </td>
                  <td className="py-2.5 text-[10px]" style={{ color: T.muted }}>
                    {r.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      {/* ── Distribution / talent / tests ─────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={overviewDistribution.title}>
          <div className="flex items-center gap-3">
            <Donut slices={overviewDistribution.slices} size={104} thickness={20} />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={overviewDistribution.slices} />
            </div>
          </div>

          <div className="mt-3 p-3" style={{ borderRadius: R.md, backgroundColor: T.tintRed }}>
            <h3 className="flex items-center justify-end gap-1.5 text-[11.5px] font-extrabold" style={{ color: T.danger }}>
              {overviewDistribution.alert.title}
              <Icon name="lucide:circle-alert" size={13} style={{ backgroundColor: T.danger }} />
            </h3>
            <Link
              href={overviewDistribution.alert.href}
              className="mt-2 block w-full py-2 text-center text-[11px] font-bold bg-white"
              style={{ borderRadius: R.sm, color: T.danger }}
            >
              {overviewDistribution.alert.cta}
            </Link>
          </div>
        </Panel>

        <Panel title={overviewTalent.title}>
          <div className="flex gap-2.5">
            <div className="flex flex-col justify-around shrink-0 text-[10px]" style={{ color: T.muted }}>
              {overviewTalent.yLabels.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>

            <div className="flex-1">
              <div className="space-y-2">
                {overviewTalent.rows.map((row, ri) => (
                  <div key={ri} className="grid grid-cols-2 gap-2">
                    {row.map((c, ci) => (
                      <span
                        key={ci}
                        className="h-[46px] flex items-center justify-center text-[12px] font-extrabold"
                        style={{ borderRadius: R.md, backgroundColor: c.bg, color: T.ink }}
                      >
                        {c.value}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px]" style={{ color: T.muted }}>
                {overviewTalent.xLabels.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel title={resultsTestBreakdown.title} cta={resultsTestBreakdown.cta}>
          <ul className="space-y-2.5">
            {resultsTestBreakdown.rows.map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-2.5 p-2.5"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <button className="text-[9.5px] font-bold shrink-0" style={{ color: T.primary }}>
                  {resultsTestBreakdown.view}
                </button>
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[11px] font-bold truncate" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block text-[9.5px]" style={{ color: T.muted }}>
                    {r.note}
                    {r.delta && (
                      <span className="font-bold" style={{ color: T.successStrong }}>
                        {' '}
                        {r.delta}
                      </span>
                    )}
                  </span>
                </span>
                <span className="text-[10px] shrink-0" style={{ color: T.muted }}>
                  {r.people}
                </span>
                <img src={r.icon} alt="" className="w-8 h-8 object-contain shrink-0" />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* ── My reports ────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <Link
            href={resultsMyReports.all.href}
            className="flex items-center gap-1.5 text-[12px] font-bold"
            style={{ color: T.primary }}
          >
            <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: T.primary }} />
            {resultsMyReports.all.label}
          </Link>

          <h2 className="text-[14px] font-extrabold" style={{ color: T.ink }}>
            {resultsMyReports.title}
          </h2>
        </div>

        <div className="grid gap-3.5 grid-cols-2 xl:grid-cols-4">
          {resultsMyReports.cards.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="bg-white p-4 flex items-center gap-3 transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <span className="flex-1 text-right min-w-0">
                <span className="block text-[12px] font-extrabold truncate" style={{ color: T.ink }}>
                  {c.label}
                </span>
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {c.format}
                </span>
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {c.note}
                </span>
              </span>
              <span
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
              >
                <Icon name="lucide:file-text" size={18} style={{ backgroundColor: T.primary }} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent + ask ──────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={resultsRecent.title} cta={resultsRecent.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {[
                  resultsRecent.cols.ops,
                  resultsRecent.cols.type,
                  resultsRecent.cols.date,
                  resultsRecent.cols.author,
                  resultsRecent.cols.name,
                ].map((c) => (
                  <th key={c} className="pb-2 text-[10px] font-bold" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultsRecent.rows.map((r) => (
                <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5">
                    <span className="flex items-center gap-1">
                      <Icon name="lucide:ellipsis" size={14} style={{ backgroundColor: T.muted }} />
                      <Icon name="lucide:download" size={14} style={{ backgroundColor: T.primary }} />
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span
                      className="px-2 py-0.5 text-[9.5px] font-bold"
                      style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className="py-2.5 text-[9.5px] whitespace-nowrap" style={{ color: T.muted }}>
                    {r.date}
                  </td>
                  <td className="py-2.5 text-[10.5px]" style={{ color: T.ink }}>
                    {r.author}
                  </td>
                  <td className="py-2.5 text-[11px] font-bold" style={{ color: T.ink }}>
                    {r.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <div>
          <AskBand
            title={resultsAsk.title}
            placeholder={resultsAsk.placeholder}
            chips={resultsAsk.chips}
          />
        </div>
      </div>
    </div>
  );
}
