'use client';

import React from 'react';
import Icon from '@/components/Icon';
import {
  Radar,
  LineTrend,
  BarList,
  BarGroup,
  Donut,
  DonutLegend,
  Gauge,
} from '@/components/org/panel/Charts';
import {
  ReportHead,
  ExportPair,
  FilterStrip,
  KpiRow,
  AiBand,
  Panel,
  AskBand,
} from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import {
  testReportHead,
  testReportFilters,
  testSpec,
  testReportKpis,
  testReportAi,
  testParticipation,
  testFunnel,
  testDistribution,
  testAverage,
  testDimensions,
  testTeams,
  testHeatmap,
  testLevels,
  testTop,
  testNeeds,
  testTrend,
  testExports,
  testCorrelation,
  testSuggestions,
  testReportAsk,
} from '@/data/orgTestReport';

/* ──────────────────────────────────────────────────────────────
   Test report.

   One instrument across one population. The five dimensions are
   the spine — they appear as a radar, as five cards, and as the
   columns of the team heatmap, always in the same order, so
   moving between the three costs no re-reading.
────────────────────────────────────────────────────────────── */

export default function TestReportClient() {
  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={testReportHead.crumbs}
        title={testReportHead.title}
        desc={testReportHead.desc}
        icon="lucide:brain"
        actions={
          <ExportPair extra={{ label: testReportHead.compare, icon: 'lucide:refresh-cw' }} />
        }
      />

      <FilterStrip filters={testReportFilters} reset="بازنشانی فیلترها" />

      {/* ── Instrument spec ───────────────────────────────────── */}
      <section
        className="bg-white p-4 flex items-center gap-5 flex-wrap"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="flex-1 flex items-center gap-6 flex-wrap justify-end order-2">
          {testSpec.rows.map((r) => (
            <span key={r.k} className="text-right">
              <span className="block text-[10px]" style={{ color: T.muted }}>
                {r.k}
              </span>
              <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                {r.v}
              </span>
            </span>
          ))}
        </div>

        <h2 className="flex items-center gap-2 text-[13px] font-extrabold shrink-0 order-1" style={{ color: T.ink }}>
          {testSpec.title}
          <Icon name="lucide:circle-alert" size={16} style={{ backgroundColor: T.primary }} />
        </h2>
      </section>

      <KpiRow kpis={testReportKpis} cols={6} />

      <AiBand
        title={testReportAi.title}
        body={testReportAi.body}
        chips={testReportAi.chips}
        cta={testReportAi.cta}
      />

      {/* ── Participation / funnel / distribution / average ───── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Panel title={testParticipation.title}>
          <div className="flex items-center gap-3">
            <Donut
              slices={testParticipation.slices}
              size={100}
              thickness={19}
              centre={testParticipation.centre}
              centreSub={testParticipation.centreSub}
            />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={testParticipation.slices} />
            </div>
          </div>
        </Panel>

        <Panel title={testFunnel.title}>
          <ul className="space-y-2">
            {testFunnel.rows.map((r) => (
              <li key={r.label} className="flex justify-center">
                <span
                  className="flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold text-white"
                  style={{
                    width: `${r.width}%`,
                    borderRadius: R.sm,
                    backgroundColor: T.primary,
                  }}
                >
                  {r.value}
                  <span style={{ opacity: 0.85 }}>{r.label}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-[11px] font-extrabold" style={{ color: T.successStrong }}>
            {testFunnel.note}
          </p>
        </Panel>

        <Panel title={testDistribution.title}>
          <p className="text-right text-[9.5px] mb-1" style={{ color: T.primary }}>
            {testDistribution.benchmark}
          </p>
          <BarGroup
            categories={testDistribution.categories}
            series={testDistribution.series}
            height={150}
          />
        </Panel>

        <Panel title={testAverage.title}>
          <div className="flex flex-col items-center">
            <Gauge value={testAverage.value} max={testAverage.max} size={168} />
            <span
              className="mt-2 px-3 py-1.5 text-[10.5px] font-bold"
              style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
            >
              {testAverage.level}
            </span>
          </div>

          <ul className="mt-3 space-y-1.5">
            {testAverage.refs.map((r) => (
              <li key={r.label} className="flex items-center justify-between text-[10.5px]">
                <span className="font-bold" style={{ color: T.ink }}>
                  {r.value}
                </span>
                <span style={{ color: T.muted }}>{r.label}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* ── Dimension radar + cards ───────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <Panel title={testDimensions.radarTitle}>
          <ul className="flex items-center justify-end gap-3 mb-1">
            {testDimensions.legend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[9.5px]" style={{ color: T.ink }}>
                {l.label}
                <span
                  className="w-4 h-0"
                  style={{ borderTop: `${l.dashed ? '2px dashed' : '3px solid'} ${l.colour}` }}
                />
              </li>
            ))}
          </ul>

          <Radar
            axes={testDimensions.axes}
            series={[
              { name: 'دوره جاری', colour: T.primary, values: testDimensions.current },
              { name: 'دوره قبل', colour: T.muted, values: testDimensions.previous, dashed: true },
            ]}
            size={250}
          />
        </Panel>

        <Panel title={testDimensions.cardsTitle}>
          <div className="grid gap-3 grid-cols-2 xl:grid-cols-5">
            {testDimensions.cards.map((c) => (
              <div
                key={c.id}
                className="p-3.5 text-center"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <Icon name={c.icon} size={19} style={{ backgroundColor: c.fg, margin: '0 auto' }} />
                <span className="block mt-1.5 text-[11px] font-bold" style={{ color: T.muted }}>
                  {c.label}
                </span>
                <span className="block text-[18px] font-extrabold" style={{ color: T.ink }}>
                  {c.value}
                  <span className="text-[9.5px] font-semibold" style={{ color: T.muted }}>
                    {' '}
                    {testDimensions.scale}
                  </span>
                </span>

                <span
                  className="flex items-center justify-center gap-1 text-[10px] font-bold"
                  style={{ color: c.up ? T.successStrong : T.danger }}
                >
                  {c.delta}
                  <Icon
                    name={c.up ? 'lucide:arrow-up' : 'lucide:trending-down'}
                    size={10}
                    style={{ backgroundColor: c.up ? T.successStrong : T.danger }}
                  />
                </span>
                <span className="block text-[8.5px]" style={{ color: T.muted }}>
                  {testDimensions.deltaNote}
                </span>

                <span
                  className="mt-1.5 block py-1 text-[9.5px] font-bold"
                  style={{ borderRadius: R.sm, backgroundColor: c.bg, color: c.fg }}
                >
                  {c.level}
                </span>

                <button
                  className="mt-1.5 w-full py-1.5 text-[9.5px] font-bold"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                >
                  {testDimensions.cta}
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Teams / heatmap / levels ──────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={testTeams.title}>
          <ul className="space-y-2.5">
            {testTeams.rows.map((r) => (
              <li key={r.label} className="flex items-center gap-2.5">
                <span
                  className="w-10 flex items-center gap-0.5 text-[10px] font-bold shrink-0"
                  style={{ color: r.up ? T.successStrong : T.danger }}
                >
                  {r.note}
                  <Icon
                    name={r.up ? 'lucide:arrow-up' : 'lucide:trending-down'}
                    size={10}
                    style={{ backgroundColor: r.up ? T.successStrong : T.danger }}
                  />
                </span>
                <span className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${r.value}%`, backgroundColor: r.colour }}
                  />
                </span>
                <span className="w-20 text-right text-[10.5px] shrink-0" style={{ color: T.ink }}>
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={testHeatmap.title}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[340px] border-collapse text-right">
              <thead>
                <tr>
                  <th />
                  {testHeatmap.cols.map((c) => (
                    <th key={c} className="pb-2 px-0.5 text-[8.5px] font-bold text-center" style={{ color: T.ink }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {testHeatmap.rows.map((r) => (
                  <tr key={r.team}>
                    <td className="pl-2 text-[10.5px] font-bold" style={{ color: T.ink }}>
                      {r.team}
                    </td>
                    {r.cells.map((v, i) => (
                      <td key={i} className="py-1.5 text-center">
                        <span
                          className="inline-block w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: testHeatmap.legend[2 - v].colour }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-3 flex items-center justify-center gap-3 flex-wrap">
            {testHeatmap.legend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[9px]" style={{ color: T.ink }}>
                {l.label}
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.colour }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={testLevels.title}>
          <div className="flex items-center gap-3">
            <Donut slices={testLevels.slices} size={100} thickness={19} />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={testLevels.slices} />
            </div>
          </div>

          <p className="mt-3 text-center text-[10.5px] font-bold" style={{ color: T.danger }}>
            {testLevels.note}
          </p>
          <button
            className="mt-2 w-full py-2 text-[10.5px] font-bold"
            style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
          >
            {testLevels.cta}
          </button>
        </Panel>
      </div>

      {/* ── Top / needs / trend / exports ─────────────────────── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Panel title={testTop.title} cta={testTop.cta}>
          <ul className="space-y-2">
            {testTop.rows.map((r) => (
              <li key={r.n} className="flex items-center gap-2.5 text-[10.5px]">
                <span className="font-extrabold" style={{ color: T.primary }}>
                  {r.value}
                </span>
                <span className="flex-1 text-right truncate" style={{ color: T.ink }}>
                  {r.name}
                </span>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{ backgroundColor: T.tintPurple, color: T.primary }}
                >
                  {r.n}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={testNeeds.title} cta={testNeeds.cta}>
          <ul className="space-y-2.5">
            {testNeeds.rows.map((r) => (
              <li
                key={r}
                className="flex items-center gap-2 p-2.5 text-[10.5px]"
                style={{ borderRadius: R.sm, backgroundColor: '#fafafc', color: T.ink }}
              >
                <span className="flex-1 text-right">{r}</span>
                <Icon name="lucide:triangle-alert" size={13} style={{ backgroundColor: T.accent }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={testTrend.title}>
          <LineTrend
            points={testTrend.points}
            labels={testTrend.labels}
            min={62}
            max={84}
            height={150}
          />
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-[13px] font-extrabold" style={{ color: T.successStrong }}>
              {testTrend.delta}
            </span>
            <span className="text-[10px]" style={{ color: T.muted }}>
              {testTrend.note}
            </span>
          </div>
        </Panel>

        <Panel title={testExports.title}>
          <div className="grid grid-cols-2 gap-2.5">
            {testExports.cards.map((c) => (
              <button
                key={c.id}
                className="p-3 text-center"
                style={{ borderRadius: R.md, backgroundColor: c.bg }}
              >
                <Icon name={c.icon} size={19} style={{ backgroundColor: c.fg, margin: '0 auto' }} />
                <span className="block mt-1.5 text-[10px] font-bold" style={{ color: T.ink }}>
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Correlation + suggestions ─────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={testCorrelation.title}>
          <ul className="space-y-2.5">
            {testCorrelation.rows.map((r) => (
              <li
                key={r.label}
                className="flex items-center gap-2.5 p-3"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <span
                  className="px-2.5 py-1 text-[9.5px] font-bold shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                >
                  {r.strength}
                </span>
                <span className="text-[11px] font-extrabold shrink-0" style={{ color: T.primary }}>
                  {r.r}
                </span>
                <span className="flex-1 text-right text-[11px]" style={{ color: T.ink }}>
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-right text-[9.5px]" style={{ color: T.muted }}>
            {testCorrelation.note}
          </p>
        </Panel>

        <Panel title={testSuggestions.title}>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {testSuggestions.cards.map((c) => (
              <div key={c.n} className="p-3" style={{ borderRadius: R.md, backgroundColor: c.bg }}>
                <span className="block text-[9.5px] font-extrabold" style={{ color: c.fg }}>
                  {c.n}
                </span>
                <span className="block mt-1 text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                  {c.label}
                </span>
                <span className="block text-[10px] font-bold" style={{ color: c.fg }}>
                  {c.sub}
                </span>
                <span className="block mt-1 text-[9px] leading-4" style={{ color: T.muted }}>
                  {c.note}
                </span>
                <button
                  className="mt-2 w-full py-1.5 text-[9.5px] font-bold bg-white"
                  style={{ borderRadius: R.sm, color: c.fg }}
                >
                  {testSuggestions.detail}
                </button>
              </div>
            ))}
          </div>

          <button
            data-ripple
            className="mt-3 w-full py-2.5 text-[12px] font-bold text-white"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            {testSuggestions.cta}
          </button>
        </Panel>
      </div>

      <AskBand
        title={testReportAsk.title}
        placeholder={testReportAsk.placeholder}
        chips={testReportAsk.chips}
      />
    </div>
  );
}
