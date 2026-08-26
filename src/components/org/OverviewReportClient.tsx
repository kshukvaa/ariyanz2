'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Radar, Donut, DonutLegend, LineTrend, Gauge } from '@/components/org/panel/Charts';
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
  overviewHead,
  overviewFilters,
  overviewKpis,
  overviewAi,
  overviewScore,
  overviewTrend,
  overviewHeatmap,
  overviewRadar,
  overviewTalent,
  overviewDistribution,
  overviewUnits,
  overviewCapital,
  overviewChanges,
  overviewTests,
  overviewAsk,
} from '@/data/orgOverview';

/* ──────────────────────────────────────────────────────────────
   Comprehensive organisation report.

   Reads top to bottom as an argument: how many were measured, how
   they scored, where the score sits historically, which
   competencies carry it, which units carry those, who the people
   are, and what changed. Nothing here is a control — the whole
   page is a finding.
────────────────────────────────────────────────────────────── */

export default function OverviewReportClient() {
  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={overviewHead.crumbs}
        title={overviewHead.title}
        desc={overviewHead.desc}
        actions={<ExportPair />}
      />

      <div className="flex items-end gap-2.5 flex-wrap">
        <div className="flex-1 min-w-[280px]">
          <FilterStrip filters={overviewFilters} />
        </div>

        <button
          data-ripple
          className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
        >
          <Icon name="lucide:refresh-cw" size={15} className="text-white" />
          {overviewHead.refresh}
        </button>
      </div>

      <KpiRow kpis={overviewKpis} cols={5} />

      <AiBand
        title={overviewAi.title}
        body={overviewAi.body}
        chips={overviewAi.chips}
        cta={overviewAi.cta}
      />

      {/* ── Score + trend ─────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
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

            <Gauge value={overviewScore.value} max={overviewScore.max} size={196} />
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

        <Panel
          title={overviewTrend.title}
          action={
            <span
              className="px-3 py-1.5 text-[10.5px] font-bold shrink-0"
              style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
            >
              {overviewTrend.badge}
            </span>
          }
        >
          <LineTrend
            points={overviewTrend.points}
            labels={overviewTrend.labels}
            min={58}
            max={82}
            height={170}
          />
        </Panel>
      </div>

      {/* ── Heatmap + radar ───────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={overviewHeatmap.title}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-right">
              <thead>
                <tr>
                  <th />
                  {overviewHeatmap.cols.map((c) => (
                    <th
                      key={c}
                      className="pb-2 px-1 text-[9px] font-bold text-center"
                      style={{ color: T.ink }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {overviewHeatmap.rows.map((r) => (
                  <tr key={r.unit}>
                    <td className="pl-2 text-[10.5px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                      {r.unit}
                    </td>
                    {r.cells.map((v, i) => (
                      <td key={i} className="p-0.5">
                        <span
                          className="block h-8"
                          style={{
                            borderRadius: 5,
                            backgroundColor: overviewHeatmap.legend[2 - v].colour,
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-3 flex items-center justify-center gap-4">
            {overviewHeatmap.legend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[10px]" style={{ color: T.ink }}>
                {l.label}
                <span className="w-4 h-3" style={{ borderRadius: 3, backgroundColor: l.colour }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={overviewRadar.title}>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[190px]">
              <Radar
                axes={overviewRadar.axes}
                series={[{ name: 'سازمان', colour: T.primary, values: overviewRadar.values }]}
                size={244}
              />
            </div>

            <div className="w-[168px] space-y-2.5 shrink-0">
              <div className="p-3" style={{ borderRadius: R.md, backgroundColor: T.tintGreen }}>
                <h3 className="flex items-center justify-end gap-1.5 text-[11px] font-extrabold" style={{ color: T.successStrong }}>
                  {overviewRadar.strengthsTitle}
                  <Icon name="lucide:plus" size={12} style={{ backgroundColor: T.successStrong }} />
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
                      <span style={{ color: T.muted }}>{s.n}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3" style={{ borderRadius: R.md, backgroundColor: T.tintRed }}>
                <h3 className="flex items-center justify-end gap-1.5 text-[11px] font-extrabold" style={{ color: T.danger }}>
                  {overviewRadar.gapsTitle}
                  <Icon name="lucide:target" size={12} style={{ backgroundColor: T.danger }} />
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
      </div>

      {/* ── Talent / distribution / units ─────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
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
                        className="h-[52px] flex items-center justify-center text-[13px] font-extrabold"
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
              <p className="mt-1 text-center text-[10.5px] font-bold" style={{ color: T.primary }}>
                {overviewTalent.xAxis}
              </p>
            </div>
          </div>
        </Panel>

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
            <ul className="mt-2 space-y-1">
              {overviewDistribution.alert.lines.map((l) => (
                <li key={l} className="text-right text-[10px]" style={{ color: T.ink }}>
                  {l}
                </li>
              ))}
            </ul>
            <Link
              href={overviewDistribution.alert.href}
              className="mt-2.5 block w-full py-2 text-center text-[11px] font-bold bg-white"
              style={{ borderRadius: R.sm, color: T.danger }}
            >
              {overviewDistribution.alert.cta}
            </Link>
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
                  <th key={c} className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {overviewUnits.rows.map((r) => (
                <tr key={r.unit} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2">
                    <span
                      className="px-2 py-0.5 text-[9.5px] font-bold"
                      style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.state}
                    </span>
                  </td>
                  <td className="py-2 text-[10px]" style={{ color: T.ink }}>
                    {r.done}
                  </td>
                  <td className="py-2">
                    <span
                      className="flex items-center justify-end gap-0.5 text-[10px] font-bold"
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
                  <td className="py-2 text-[10px] font-bold" style={{ color: T.ink }}>
                    {r.score}
                  </td>
                  <td className="py-2 text-[10.5px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                    {r.unit}
                  </td>
                  <td className="py-2 text-[10px]" style={{ color: T.muted }}>
                    {r.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      {/* ── Capital / changes / tests ─────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={overviewCapital.title}>
          <ul className="space-y-2.5">
            {overviewCapital.rows.map((r) => (
              <li
                key={r.label}
                className="flex items-center gap-3 p-3"
                style={{ borderRadius: R.md, backgroundColor: r.bg }}
              >
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block text-[13px] font-extrabold" style={{ color: r.fg }}>
                    {r.value}
                    <span className="text-[9.5px] font-semibold mr-1.5" style={{ color: T.muted }}>
                      {r.note}
                    </span>
                  </span>
                  <button className="mt-0.5 text-[10px] font-bold" style={{ color: T.primary }}>
                    {r.cta}
                  </button>
                </span>
                <Icon name={r.icon} size={19} style={{ backgroundColor: r.fg }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={overviewChanges.title} cta={overviewChanges.cta}>
          <div className="space-y-2.5">
            {overviewChanges.groups.map((g) => (
              <div key={g.id} className="p-3" style={{ borderRadius: R.md, backgroundColor: g.bg }}>
                <h3 className="flex items-center justify-end gap-1.5 text-[11px] font-extrabold" style={{ color: g.fg }}>
                  {g.label}
                  <Icon name={g.icon} size={12} style={{ backgroundColor: g.fg }} />
                </h3>
                <ul className="mt-1.5 space-y-1">
                  {g.rows.map((r) => (
                    <li key={r.label} className="flex items-center justify-between text-[10.5px]">
                      <span className="font-bold" style={{ color: g.fg }}>
                        {r.value}
                      </span>
                      <span style={{ color: T.ink }}>{r.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={overviewTests.title}>
          <div className="grid grid-cols-2 gap-2.5">
            {overviewTests.cards.map((c) => (
              <div
                key={c.id}
                className="p-3 text-center"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <img src={c.icon} alt="" className="w-9 h-9 object-contain mx-auto" />
                <span className="block mt-1.5 text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                  {c.label}
                </span>
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {c.runs}
                </span>
                <span className="block mt-0.5 text-[10px] font-bold" style={{ color: T.ink }}>
                  {c.note}
                </span>
                {c.extra && (
                  <span className="block text-[9.5px] font-bold" style={{ color: T.successStrong }}>
                    {c.extra}
                  </span>
                )}
                <button
                  className="mt-2 w-full py-1.5 text-[10px] font-bold"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                >
                  {overviewTests.cta}
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <AskBand
        title={overviewAsk.title}
        placeholder={overviewAsk.placeholder}
        chips={overviewAsk.chips}
      />
    </div>
  );
}
