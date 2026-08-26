'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { Radar, BarGroup, Donut, DonutLegend, Gauge } from '@/components/org/panel/Charts';
import {
  ReportHead,
  ExportPair,
  KpiRow,
  AiBand,
  Panel,
  AskBand,
} from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import {
  assessReportHead,
  assessReportBand,
  assessReportKpis,
  assessReportAi,
  assessReportCompletion,
  assessReportTests,
  assessReportScore,
  assessReportHistogram,
  assessReportRadar,
  assessReportStrengths,
  assessReportGaps,
  assessReportPeopleMap,
  assessReportTeams,
  assessReportTalent,
  assessReportTop,
  assessReportAttention,
  assessReportChanges,
  assessReportActions,
  assessReportTable,
  assessReportAsk,
} from '@/data/orgAssessmentReport';

/* ──────────────────────────────────────────────────────────────
   Assessment result report.

   One completed cycle. It answers "did it run" before "what did
   it find", because a finding drawn from a half-finished cycle is
   worth knowing about before anyone acts on it.
────────────────────────────────────────────────────────────── */

export default function AssessmentReportClient() {
  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={assessReportHead.crumbs}
        title={assessReportHead.title}
        desc={assessReportHead.desc}
        actions={
          <ExportPair extra={{ label: assessReportHead.compare, icon: 'lucide:refresh-cw' }} />
        }
      />

      <div className="flex items-center gap-2.5 justify-end">
        <span
          className="px-3 py-1.5 text-[11px] font-bold"
          style={{ borderRadius: R.pill, backgroundColor: T.tintPurple, color: T.primary }}
        >
          {assessReportHead.period}
        </span>
        <span
          className="px-3 py-1.5 text-[11px] font-bold"
          style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
        >
          {assessReportHead.state}
        </span>
      </div>

      {/* ── Cycle facts ───────────────────────────────────────── */}
      <section
        className="bg-white p-4 flex items-center gap-6 flex-wrap justify-end"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        {assessReportBand.map((b) => (
          <span key={b.k} className="flex items-center gap-2.5">
            <span className="text-right">
              <span className="block text-[10px]" style={{ color: T.muted }}>
                {b.k}
              </span>
              <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                {b.v}
              </span>
            </span>
            <Icon name={b.icon} size={16} style={{ backgroundColor: T.primary }} />
          </span>
        ))}
      </section>

      <KpiRow kpis={assessReportKpis} cols={5} />

      <AiBand title={assessReportAi.title} body={assessReportAi.body} cta={assessReportAi.cta} />

      {/* ── Completion / tests / score ────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={assessReportCompletion.title}>
          <div className="flex items-center gap-3">
            <Donut
              slices={assessReportCompletion.slices}
              size={104}
              thickness={20}
              centre={assessReportCompletion.centre}
              centreSub={assessReportCompletion.centreSub}
            />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={assessReportCompletion.slices} />
            </div>
          </div>

          <ul className="mt-3.5 space-y-1.5">
            {assessReportCompletion.funnel.map((f) => (
              <li key={f.label} className="flex justify-center">
                <span
                  className="flex items-center justify-center gap-2 py-2 text-[10.5px] font-bold text-white"
                  style={{ width: `${f.width}%`, borderRadius: R.sm, backgroundColor: T.violet }}
                >
                  {f.value}
                  <span style={{ opacity: 0.85 }}>{f.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={assessReportTests.title}>
          <div className="grid grid-cols-2 gap-2.5">
            {assessReportTests.cards.map((c) => (
              <div
                key={c.id}
                className="p-3 text-center"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <img src={c.icon} alt="" className="w-9 h-9 object-contain mx-auto" />
                <span className="block mt-1.5 text-[11px] font-extrabold" style={{ color: T.ink }}>
                  {c.label}
                </span>
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {c.runs}
                </span>
                <span className="block mt-0.5 text-[9.5px] font-bold" style={{ color: T.primary }}>
                  {c.note}
                </span>
                <button
                  className="mt-1.5 w-full py-1.5 text-[9.5px] font-bold"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                >
                  {assessReportTests.cta}
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={assessReportScore.title}>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span
              className="px-3 py-2 text-center shrink-0"
              style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
            >
              <span className="block text-[10px]" style={{ color: T.muted }}>
                {assessReportScore.previous.label}
              </span>
              <span className="block text-[14px] font-extrabold" style={{ color: T.ink }}>
                {assessReportScore.previous.value}
              </span>
              <span className="block text-[10px] font-bold" style={{ color: T.successStrong }}>
                {assessReportScore.delta}
              </span>
            </span>

            <Gauge value={assessReportScore.value} max={assessReportScore.max} size={172} />
          </div>

          <p className="mt-2 text-center">
            <span
              className="px-3 py-1.5 text-[10.5px] font-bold"
              style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
            >
              {assessReportScore.level}
            </span>
          </p>

          <div className="mt-3.5">
            <h3 className="text-right text-[11px] font-bold mb-1.5" style={{ color: T.ink }}>
              {assessReportHistogram.title}
            </h3>
            <BarGroup
              categories={assessReportHistogram.categories}
              series={assessReportHistogram.series}
              height={110}
              yTicks={3}
            />
          </div>
        </Panel>
      </div>

      {/* ── Radar / strengths / gaps ──────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1fr_260px_260px]">
        <Panel title={assessReportRadar.title}>
          <ul className="flex items-center justify-end gap-3 mb-1">
            {assessReportRadar.legend.map((l) => (
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
            axes={assessReportRadar.axes}
            series={[
              { name: 'دوره جاری', colour: T.primary, values: assessReportRadar.current },
              { name: 'دوره قبل', colour: T.muted, values: assessReportRadar.previous, dashed: true },
            ]}
            size={252}
            showValues={false}
          />
        </Panel>

        <Panel title={assessReportStrengths.title}>
          <ul className="space-y-2">
            {assessReportStrengths.rows.map((r) => (
              <li
                key={r.n}
                className="flex items-center gap-2.5 p-2.5"
                style={{ borderRadius: R.sm, backgroundColor: T.tintGreen }}
              >
                <span className="text-[12px] font-extrabold" style={{ color: T.successStrong }}>
                  {r.value}
                </span>
                <span className="flex-1 text-right text-[11px]" style={{ color: T.ink }}>
                  {r.label}
                </span>
                <span className="text-[10px]" style={{ color: T.muted }}>
                  {r.n}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={assessReportGaps.title}>
          <ul className="space-y-2">
            {assessReportGaps.rows.map((r) => (
              <li
                key={r.n}
                className="flex items-center gap-2.5 p-2.5"
                style={{ borderRadius: R.sm, backgroundColor: T.tintRed }}
              >
                <span className="text-right shrink-0">
                  <span className="block text-[12px] font-extrabold" style={{ color: T.danger }}>
                    {r.value}
                  </span>
                </span>
                <span className="flex-1 text-right">
                  <span className="block text-[11px]" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }}>
                    {r.note}
                  </span>
                </span>
                <span className="text-[10px]" style={{ color: T.muted }}>
                  {r.n}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* ── People map / teams / talent ───────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={assessReportPeopleMap.title} cta={assessReportPeopleMap.cta}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-right">
              <thead>
                <tr>
                  <th />
                  {assessReportPeopleMap.cols.map((c) => (
                    <th key={c} className="pb-2 px-0.5 text-[8px] font-bold text-center" style={{ color: T.ink }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assessReportPeopleMap.rows.map((r) => (
                  <tr key={r.name}>
                    <td className="pl-2 text-[10px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                      {r.name}
                    </td>
                    {r.cells.map((v, i) => (
                      <td key={i} className="py-1.5 text-center">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ backgroundColor: assessReportPeopleMap.legend[2 - v].colour }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title={assessReportTeams.title} cta={assessReportTeams.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {[
                  assessReportTeams.cols.state,
                  assessReportTeams.cols.change,
                  assessReportTeams.cols.score,
                  assessReportTeams.cols.team,
                  assessReportTeams.cols.rank,
                ].map((c) => (
                  <th key={c} className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assessReportTeams.rows.map((r) => (
                <tr key={r.team} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5">
                    <span
                      className="px-2 py-0.5 text-[9.5px] font-bold"
                      style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.state}
                    </span>
                  </td>
                  <td className="py-2.5">
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
                  <td className="py-2.5 text-[11px] font-extrabold" style={{ color: T.ink }}>
                    {r.score}
                  </td>
                  <td className="py-2.5 text-[10.5px] font-bold" style={{ color: T.ink }}>
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

        <Panel title={assessReportTalent.title} cta={assessReportTalent.cta}>
          <div className="grid grid-cols-3 gap-1.5">
            {assessReportTalent.cells.map((c) => (
              <span
                key={c.label}
                className="p-2 text-center flex flex-col justify-center min-h-[52px]"
                style={{ borderRadius: R.sm, backgroundColor: c.bg }}
              >
                <span className="block text-[7.5px] leading-tight" style={{ color: T.muted }}>
                  {c.label}
                </span>
                <span className="block text-[11px] font-extrabold" style={{ color: T.ink }}>
                  {c.value}
                </span>
              </span>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Top / attention / changes / actions ───────────────── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Panel title={assessReportTop.title} cta={assessReportTop.cta}>
          <ul className="space-y-2">
            {assessReportTop.rows.map((r) => (
              <li key={r.n} className="flex items-center gap-2.5 text-[10.5px]">
                <span className="font-extrabold" style={{ color: T.successStrong }}>
                  {r.value}
                </span>
                <span className="flex-1 text-right truncate" style={{ color: T.ink }}>
                  {r.name}
                </span>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{ backgroundColor: T.tintGreen, color: T.successStrong }}
                >
                  {r.n}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={assessReportAttention.title} cta={assessReportAttention.cta}>
          <ul className="space-y-2">
            {assessReportAttention.rows.map((r) => (
              <li key={r.n} className="flex items-center gap-2.5 text-[10.5px]">
                <span className="font-bold" style={{ color: T.accent }}>
                  {r.note}
                </span>
                <span className="flex-1 text-right truncate" style={{ color: T.ink }}>
                  {r.name}
                </span>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{ backgroundColor: T.tintOrange, color: T.accent }}
                >
                  {r.n}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={assessReportChanges.title} cta={assessReportChanges.cta}>
          <div className="space-y-2">
            {assessReportChanges.groups.map((g) => (
              <div key={g.id} className="p-2.5" style={{ borderRadius: R.sm, backgroundColor: g.bg }}>
                <h3 className="text-right text-[9.5px] font-extrabold" style={{ color: g.fg }}>
                  {g.label}
                </h3>
                <ul className="mt-1 space-y-0.5">
                  {g.rows.map((r) => (
                    <li key={r.label} className="flex items-center justify-between text-[10px]">
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

        <Panel title={assessReportActions.title}>
          <ul className="space-y-2">
            {assessReportActions.cards.map((c) => (
              <li key={c.id} className="p-2.5" style={{ borderRadius: R.sm, backgroundColor: c.bg }}>
                <span className="flex items-center justify-between">
                  <span className="text-[12px] font-extrabold" style={{ color: c.fg }}>
                    {c.value}
                  </span>
                  <span className="text-[10.5px] font-extrabold" style={{ color: T.ink }}>
                    {c.label}
                  </span>
                </span>
                <span className="block mt-0.5 text-right text-[9px]" style={{ color: T.muted }}>
                  {c.note}
                </span>
              </li>
            ))}
          </ul>

          <button
            data-ripple
            className="mt-2.5 w-full py-2.5 text-[10.5px] font-bold text-white"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            {assessReportActions.cta}
          </button>
        </Panel>
      </div>

      {/* ── Participant table ─────────────────────────────────── */}
      <section
        className="bg-white"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="p-4 flex items-center gap-3 flex-wrap">
          <label
            className="flex items-center gap-2.5 px-3.5 py-2.5 min-w-[200px]"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name="lucide:search" size={15} style={{ backgroundColor: T.muted }} />
            <input
              type="search"
              placeholder={assessReportTable.search}
              className="flex-1 min-w-0 bg-transparent text-[12px] outline-none placeholder:text-[#9396b0]"
              style={{ color: T.ink }}
            />
          </label>

          <h2 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {assessReportTable.title}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-right border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#fafafc' }}>
                {[
                  assessReportTable.cols.ops,
                  assessReportTable.cols.state,
                  assessReportTable.cols.done,
                  assessReportTable.cols.change,
                  assessReportTable.cols.score,
                  assessReportTable.cols.team,
                ].map((c) => (
                  <th key={c} className="px-4 py-3 text-[11px] font-bold whitespace-nowrap" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
                <th className="px-4 py-3 text-[11px] font-bold w-full" style={{ color: T.muted }}>
                  {assessReportTable.cols.person}
                </th>
              </tr>
            </thead>
            <tbody>
              {assessReportTable.rows.map((r) => (
                <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="px-4 py-3">
                    <button
                      className="px-3 py-1.5 text-[10.5px] font-bold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                    >
                      {assessReportTable.cta}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold"
                      style={{ borderRadius: R.pill, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.state}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px]" style={{ color: T.ink }}>
                    {r.done}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="flex items-center justify-end gap-0.5 text-[11px] font-bold"
                      style={{ color: r.up ? T.successStrong : T.danger }}
                    >
                      {r.change}
                      <Icon
                        name={r.up ? 'lucide:arrow-up' : 'lucide:trending-down'}
                        size={11}
                        style={{ backgroundColor: r.up ? T.successStrong : T.danger }}
                      />
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {r.score}
                  </td>
                  <td className="px-4 py-3 text-[11px]" style={{ color: T.muted }}>
                    {r.team}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center justify-end gap-2.5">
                      <span className="text-[11.5px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                        {r.name}
                      </span>
                      <img
                        src={`/images/aryaz/avatars/${r.avatar}.png`}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="p-3 flex items-center justify-between gap-3 flex-wrap"
          style={{ borderTop: `1px solid ${T.border}` }}
        >
          <span className="text-[11.5px]" style={{ color: T.muted }}>
            {assessReportTable.showing}
          </span>

          <div className="flex items-center gap-1.5">
            {assessReportTable.pages.map((p, i) => (
              <button
                key={`${p}-${i}`}
                className="w-8 h-8 text-[11.5px] font-bold"
                style={
                  i === 0
                    ? { borderRadius: R.sm, backgroundColor: T.primaryStrong, color: '#fff' }
                    : { borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AskBand
        title={assessReportAsk.title}
        placeholder={assessReportAsk.placeholder}
        chips={assessReportAsk.chips}
      />
    </div>
  );
}
