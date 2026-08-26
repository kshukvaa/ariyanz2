'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Radar, LineTrend, BarList, Donut, DonutLegend } from '@/components/org/panel/Charts';
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
  unitHead,
  unitFilters,
  unitBand,
  unitKpis,
  unitAi,
  unitRank,
  unitTrend,
  unitRadar,
  unitTeamMap,
  unitTeams,
  unitLevels,
  unitAttention,
  unitTalent,
  unitPeople,
  unitTests,
  unitAsk,
} from '@/data/orgUnitReport';

/* ──────────────────────────────────────────────────────────────
   Unit report.

   The same questions as the organisation report, asked one level
   down — which is why it opens by placing the unit against its
   peers rather than in isolation. A unit score means nothing
   without the six it sits among.
────────────────────────────────────────────────────────────── */

export default function UnitReportClient() {
  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={unitHead.crumbs}
        title={unitHead.title}
        desc={unitHead.desc}
        actions={<ExportPair />}
      />

      <FilterStrip filters={unitFilters} reset="بازنشانی" />

      {/* ── Unit band ─────────────────────────────────────────── */}
      <section
        className="bg-white p-4 flex items-center gap-5 flex-wrap"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <span className="flex items-center gap-2 shrink-0 order-3">
          <span className="text-[12.5px] font-extrabold" style={{ color: T.ink }}>
            {unitBand.runs.value}
          </span>
          <span className="text-[11px]" style={{ color: T.muted }}>
            {unitBand.runs.label}
          </span>
        </span>

        <span className="flex-1 min-w-[180px] order-2">
          <span className="flex items-center justify-between text-[11px]">
            <span className="font-extrabold" style={{ color: T.successStrong }}>
              {unitBand.rate.value}
            </span>
            <span style={{ color: T.muted }}>{unitBand.rate.label}</span>
          </span>
          <span className="mt-1.5 block h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
            <span
              className="block h-full rounded-full"
              style={{ width: `${unitBand.rate.pct}%`, backgroundColor: T.success }}
            />
          </span>
        </span>

        {unitBand.facts.map((f) => (
          <span key={f.k} className="flex items-center gap-2 shrink-0 order-2">
            <span className="text-[12px] font-extrabold" style={{ color: T.ink }}>
              {f.v}
            </span>
            <span className="text-[11px]" style={{ color: T.muted }}>
              {f.k}
            </span>
            <Icon name={f.icon} size={15} style={{ backgroundColor: T.primary }} />
          </span>
        ))}

        <span className="flex items-center gap-3 shrink-0 order-1">
          <span className="text-right">
            <span className="block text-[15px] font-extrabold" style={{ color: T.ink }}>
              {unitBand.name}
            </span>
            <span className="block text-[10.5px]" style={{ color: T.muted }}>
              {unitBand.manager.k}{' '}
              <span className="font-bold" style={{ color: T.ink }}>
                {unitBand.manager.v}
              </span>
            </span>
          </span>
          <span
            className="w-11 h-11 flex items-center justify-center"
            style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
          >
            <Icon name="lucide:users-round" size={21} style={{ backgroundColor: T.primary }} />
          </span>
        </span>
      </section>

      <KpiRow kpis={unitKpis} cols={5} />

      <AiBand title={unitAi.title} body={unitAi.body} chips={unitAi.chips} cta={unitAi.cta} />

      {/* ── Rank / trend / radar ──────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={unitRank.title}>
          <BarList rows={unitRank.rows} max={100} />
          <p className="mt-3 text-right text-[10px]" style={{ color: T.muted }}>
            {unitRank.note}
          </p>
        </Panel>

        <Panel title={unitTrend.title}>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <LineTrend
                points={unitTrend.points}
                labels={unitTrend.labels}
                min={60}
                max={90}
                height={160}
              />
            </div>

            <div className="w-[112px] shrink-0 space-y-2">
              <span
                className="block p-2.5 text-center"
                style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
              >
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {unitTrend.changeLabel}
                </span>
                <span
                  className="flex items-center justify-center gap-1 text-[15px] font-extrabold"
                  style={{ color: T.successStrong }}
                >
                  {unitTrend.change}
                  <Icon name="lucide:arrow-up" size={12} style={{ backgroundColor: T.successStrong }} />
                </span>
              </span>

              <span
                className="block p-2.5 text-center"
                style={{ borderRadius: R.md, backgroundColor: T.tintGreen }}
              >
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {unitTrend.trendLabel}
                </span>
                <span className="block text-[11.5px] font-extrabold" style={{ color: T.successStrong }}>
                  {unitTrend.trend}
                </span>
              </span>
            </div>
          </div>
        </Panel>

        <Panel title={unitRadar.title}>
          <ul className="flex items-center justify-end gap-3 mb-1">
            {unitRadar.legend.map((l) => (
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
            axes={unitRadar.axes}
            series={[
              { name: 'واحد فروش', colour: T.primary, values: unitRadar.unit },
              { name: 'میانگین سازمان', colour: T.muted, values: unitRadar.org, dashed: true },
            ]}
            size={232}
            showValues={false}
          />
        </Panel>
      </div>

      {/* ── Team map + team table ─────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={unitTeamMap.title}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[380px] border-collapse text-right">
              <thead>
                <tr>
                  <th />
                  {unitTeamMap.cols.map((c) => (
                    <th key={c} className="pb-2 px-1 text-[9px] font-bold text-center" style={{ color: T.ink }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {unitTeamMap.rows.map((r, ri) => (
                  <tr key={`${r.team}-${ri}`}>
                    <td className="pl-2 text-[10.5px] font-bold" style={{ color: T.ink }}>
                      {r.team}
                    </td>
                    {r.cells.map((v, i) => (
                      <td key={i} className="py-1.5 text-center">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ backgroundColor: unitTeamMap.legend[2 - v].colour }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-3 flex items-center justify-center gap-4">
            {unitTeamMap.legend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[10px]" style={{ color: T.ink }}>
                {l.label}
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.colour }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={unitTeams.title} cta={unitTeams.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {[
                  unitTeams.cols.state,
                  unitTeams.cols.done,
                  unitTeams.cols.change,
                  unitTeams.cols.people,
                  unitTeams.cols.team,
                  unitTeams.cols.rank,
                ].map((c) => (
                  <th key={c} className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {unitTeams.rows.map((r, i) => (
                <tr key={`${r.team}-${i}`} style={{ borderTop: `1px solid ${T.border}` }}>
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
                  <td className="py-2.5 text-[10.5px]" style={{ color: T.ink }}>
                    {r.people}
                  </td>
                  <td className="py-2.5 text-[11px] font-bold" style={{ color: T.ink }}>
                    {r.team}
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

      {/* ── Five summary panels ───────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
        <Panel title={unitLevels.title}>
          <Donut slices={unitLevels.slices} size={100} thickness={19} />
          <div className="mt-2.5">
            <DonutLegend slices={unitLevels.slices} />
          </div>
        </Panel>

        <Panel title={unitAttention.title}>
          <div className="text-center">
            <Icon name="lucide:user-round" size={26} style={{ backgroundColor: T.accent, margin: '0 auto' }} />
            <span className="block mt-2 text-[21px] font-extrabold" style={{ color: T.ink }}>
              {unitAttention.value}
            </span>
          </div>
          <ul className="mt-2.5 space-y-1">
            {unitAttention.lines.map((l) => (
              <li key={l} className="flex items-center justify-end gap-1.5 text-[10px]" style={{ color: T.muted }}>
                {l}
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: T.accent }} />
              </li>
            ))}
          </ul>
          <Link
            href={unitAttention.href}
            className="mt-3 block w-full py-2 text-center text-[10.5px] font-bold"
            style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
          >
            {unitAttention.cta}
          </Link>
        </Panel>

        <Panel title={unitTalent.title} cta={unitTalent.cta}>
          <div className="grid grid-cols-3 gap-1">
            {unitTalent.cells.map((c) => (
              <span
                key={c.label}
                className="p-1.5 text-center flex flex-col justify-center min-h-[46px]"
                style={{ borderRadius: R.sm, backgroundColor: c.bg }}
              >
                <span className="block text-[7.5px] leading-tight" style={{ color: T.muted }}>
                  {c.label}
                </span>
                <span className="block text-[10px] font-extrabold" style={{ color: T.ink }}>
                  {c.value}
                </span>
              </span>
            ))}
          </div>
        </Panel>

        <Panel title={unitPeople.title} cta={unitPeople.cta}>
          <ul className="space-y-2.5">
            {unitPeople.groups.map((g) => (
              <li key={g.label} className="flex items-center gap-2.5">
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[9.5px]" style={{ color: g.fg }}>
                    {g.label}
                  </span>
                  <span className="block text-[11px] font-bold truncate" style={{ color: T.ink }}>
                    {g.name}
                  </span>
                  {g.score && (
                    <span className="block text-[9.5px]" style={{ color: T.muted }}>
                      {g.score}
                    </span>
                  )}
                </span>
                {g.avatar ? (
                   
                  <img
                    src={`/images/aryaz/avatars/${g.avatar}.png`}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <Icon name={g.icon} size={19} style={{ backgroundColor: g.fg }} />
                )}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={unitTests.title} cta={unitTests.cta}>
          <ul className="space-y-2.5">
            {unitTests.rows.map((r) => (
              <li key={r.label} className="flex items-center gap-2.5">
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[11px] font-bold truncate" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block text-[9.5px]" style={{ color: T.muted }}>
                    {r.note}
                  </span>
                </span>
                <span className="text-[12px] font-extrabold shrink-0" style={{ color: T.primary }}>
                  {r.value}
                </span>
                <img src={r.icon} alt="" className="w-7 h-7 object-contain shrink-0" />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <AskBand title={unitAsk.title} placeholder={unitAsk.placeholder} chips={unitAsk.chips} />
    </div>
  );
}
