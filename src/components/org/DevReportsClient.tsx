'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { Donut, DonutLegend, BarList, BarGroup } from '@/components/org/panel/Charts';
import { KpiRow, Panel } from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import {
  devReportsHead,
  devReportsKpis,
  devReportsAi,
  devReportsTrend,
  devReportsUnits,
  devReportsCompetencies,
  devReportsReadiness,
  devReportsInterventions,
  devReportsInvestment,
  devReportsCompletion,
  devReportsQuick,
  devReportsSuggest,
} from '@/data/orgDevAdmin';

/* ──────────────────────────────────────────────────────────────
   Development reports.

   The module's annual view: what was spent, who moved, which
   interventions actually shifted a score. It closes on three
   management decisions rather than a chart, because that is what
   the whole page is evidence for.
────────────────────────────────────────────────────────────── */

export default function DevReportsClient() {
  return (
    <div className="space-y-5">
      {/* ── Title + scope ─────────────────────────────────────── */}
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <div className="flex items-center gap-2.5 flex-wrap">
          {devReportsHead.filters.map((f) => (
            <span
              key={f.id}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-white text-[11.5px] font-semibold"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
              {f.value}
            </span>
          ))}

          <button
            className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:download" size={15} style={{ backgroundColor: T.muted }} />
            {devReportsHead.export}
          </button>
        </div>

        <div className="text-right">
          <h1 className="text-[24px] font-extrabold" style={{ color: T.ink }}>
            {devReportsHead.title}
          </h1>
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {devReportsHead.desc}
          </p>
        </div>
      </div>

      {/* ── KPIs + analysis ───────────────────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_340px] items-start">
        <div className="min-w-0">
          <KpiRow kpis={devReportsKpis} cols={4} />
        </div>

        <section className="p-4" style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}>
          <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.primary }}>
            {devReportsAi.title}
            <Icon name="lucide:sparkles" size={15} style={{ backgroundColor: T.primary }} />
          </h2>
          <p className="mt-0.5 text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {devReportsAi.subtitle}
          </p>
          <p className="mt-1.5 text-right text-[10.5px] leading-5" style={{ color: T.muted }}>
            {devReportsAi.body[0]}
          </p>

          <ul className="mt-3 space-y-2">
            {devReportsAi.rows.map((r) => (
              <li
                key={r.label}
                className="flex items-center gap-2.5 p-2.5 bg-white"
                style={{ borderRadius: R.md }}
              >
                <span className="text-right shrink-0">
                  <span className="block text-[11px] font-extrabold" style={{ color: T.ink }}>
                    {r.value}
                  </span>
                  <span className="block text-[9px]" style={{ color: r.fg }}>
                    {r.sub}
                  </span>
                </span>
                <span className="flex-1 text-right text-[10px]" style={{ color: r.fg }}>
                  {r.label}
                </span>
                <Icon name={r.icon} size={16} style={{ backgroundColor: r.fg }} />
              </li>
            ))}
          </ul>

          <button
            className="mt-3 w-full py-2.5 text-[11.5px] font-bold bg-white"
            style={{ borderRadius: R.md, color: T.primary }}
          >
            {devReportsAi.cta}
          </button>
        </section>
      </div>

      {/* ── Trend + units ─────────────────────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_400px] items-start">
        <Panel title={devReportsTrend.title}>
          <div className="flex items-center gap-2.5 mb-3 flex-wrap justify-end">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:chevron-down" size={11} style={{ backgroundColor: T.muted }} />
              {devReportsTrend.period}
            </span>

            {devReportsTrend.legend.map((l) => (
              <span key={l.label} className="flex items-center gap-1.5 text-[9.5px]" style={{ color: T.ink }}>
                {l.label}
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.colour }} />
              </span>
            ))}
          </div>

          <BarGroup
            categories={devReportsTrend.labels}
            series={devReportsTrend.series}
            height={230}
            max={120}
          />
        </Panel>

        <Panel title={devReportsUnits.title} cta={devReportsUnits.cta}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[340px] text-right border-collapse">
              <thead>
                <tr>
                  {[
                    devReportsUnits.cols.impact,
                    devReportsUnits.cols.closure,
                    devReportsUnits.cols.progress,
                    devReportsUnits.cols.inpath,
                    devReportsUnits.cols.unit,
                  ].map((c) => (
                    <th key={c} className="pb-2 text-[9px] font-bold whitespace-nowrap" style={{ color: T.muted }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devReportsUnits.rows.map((r) => (
                  <tr key={r.unit} style={{ borderTop: `1px solid ${T.border}` }}>
                    <td className="py-2.5">
                      <span
                        className="px-2 py-0.5 text-[9px] font-bold"
                        style={{
                          borderRadius: R.sm,
                          backgroundColor: r.good ? T.tintGreen : T.tintOrange,
                          color: r.good ? T.successStrong : T.accent,
                        }}
                      >
                        {r.impact}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span
                        className="flex items-center justify-end gap-1 text-[10px] font-bold"
                        style={{ color: r.good ? T.successStrong : T.accent }}
                      >
                        {r.closure}
                        <Icon
                          name={r.good ? 'lucide:arrow-up' : 'lucide:trending-down'}
                          size={9}
                          style={{ backgroundColor: r.good ? T.successStrong : T.accent }}
                        />
                      </span>
                    </td>
                    <td className="py-2.5 text-[10px]" style={{ color: T.ink }}>
                      {r.progress}
                    </td>
                    <td className="py-2.5 text-[10px]" style={{ color: T.muted }}>
                      {r.inpath}
                    </td>
                    <td className="py-2.5 text-[10.5px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                      {r.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* ── Competencies / readiness ──────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={devReportsCompetencies.title} cta={devReportsCompetencies.cta}>
          <BarList rows={devReportsCompetencies.rows} max={130} />
        </Panel>

        <Panel title={devReportsReadiness.title} cta={devReportsReadiness.cta}>
          <div className="flex items-center gap-4">
            <Donut slices={devReportsReadiness.slices} size={128} thickness={24} />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={devReportsReadiness.slices} />
            </div>
          </div>
        </Panel>
      </div>

      {/* ── Interventions / investment / completion ───────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={devReportsInterventions.title} cta={devReportsInterventions.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {[devReportsInterventions.cols.improve, devReportsInterventions.cols.count, devReportsInterventions.cols.name].map(
                  (c) => (
                    <th key={c} className="pb-2 text-[9px] font-bold" style={{ color: T.muted }}>
                      {c}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {devReportsInterventions.rows.map((r) => (
                <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5 text-[10.5px] font-bold" style={{ color: T.successStrong }}>
                    {r.improve}
                  </td>
                  <td className="py-2.5 text-[10px]" style={{ color: T.muted }}>
                    {r.count}
                  </td>
                  <td className="py-2.5">
                    <span className="flex items-center justify-end gap-2">
                      <span
                        className="px-2 py-0.5 text-[8.5px] font-bold whitespace-nowrap"
                        style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                      >
                        {r.level}
                      </span>
                      <span className="text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {r.name}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={devReportsInvestment.title} cta={devReportsInvestment.cta}>
          <ul className="flex items-center justify-end gap-3 mb-2">
            {devReportsInvestment.legend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[9px]" style={{ color: T.ink }}>
                {l.label}
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.colour }} />
              </li>
            ))}
          </ul>

          <BarGroup
            categories={devReportsInvestment.labels}
            series={[
              { name: 'هزینه', colour: T.violet, values: devReportsInvestment.cost },
              { name: 'ساعت', colour: T.success, values: devReportsInvestment.hours },
            ]}
            height={170}
          />
        </Panel>

        <Panel title={devReportsCompletion.title} cta={devReportsCompletion.cta}>
          <div className="flex items-center gap-3">
            <Donut
              slices={devReportsCompletion.slices}
              size={110}
              thickness={21}
              centre={devReportsCompletion.centre}
              centreSub={devReportsCompletion.centreSub}
            />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={devReportsCompletion.slices} />
            </div>
          </div>
        </Panel>
      </div>

      {/* ── Quick links + suggestions ─────────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[300px_1fr] items-start">
        <Panel title={devReportsQuick.title}>
          <ul className="space-y-2">
            {devReportsQuick.rows.map((r) => (
              <li
                key={r.label}
                className="flex items-center gap-2.5 p-2.5 transition-colors hover:bg-gray-50"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <Icon name="lucide:chevron-left" size={13} style={{ backgroundColor: T.muted }} />
                <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                  {r.label}
                </span>
                <Icon name={r.icon} size={15} style={{ backgroundColor: T.primary }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={devReportsSuggest.title}>
          <div className="grid gap-3 md:grid-cols-3">
            {devReportsSuggest.rows.map((r) => (
              <div key={r.n} className="p-3.5" style={{ borderRadius: R.md, backgroundColor: r.bg }}>
                <span className="flex items-center justify-between">
                  <Icon name={r.icon} size={18} style={{ backgroundColor: r.fg }} />
                  <span className="text-[9.5px] font-bold" style={{ color: r.fg }}>
                    {r.n}
                  </span>
                </span>
                <p className="mt-2 text-right text-[11px] font-bold leading-5" style={{ color: T.ink }}>
                  {r.label}
                </p>
                <p className="mt-1 text-right text-[9px] leading-4" style={{ color: T.muted }}>
                  {r.note}
                </p>
                <button
                  className="mt-2.5 w-full py-2 text-[10px] font-bold bg-white"
                  style={{ borderRadius: R.sm, color: r.fg }}
                >
                  {r.cta}
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
