'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { Donut, DonutLegend, BarList, BarGroup } from '@/components/org/panel/Charts';
import Ring from '@/components/org/panel/Ring';
import { KpiRow, AiBand, Panel } from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import { GapBar, Quadrant, QuickGrid } from './ProgramShell';
import {
  programActivities,
  programGaps,
  programTimeline,
  programImpact,
  programDocs,
} from '@/data/orgProgram';

/* ──────────────────────────────────────────────────────────────
   The five heavier programme tabs: activities, gaps, timeline,
   effectiveness and documents. Split from ProgramClient purely
   for file size — they share its header and tab state.
────────────────────────────────────────────────────────────── */

export default function ProgramMoreTabs({ tab }: { tab: string }) {
  if (tab === 'activities') return <Activities />;
  if (tab === 'gaps') return <Gaps />;
  if (tab === 'timeline') return <Timeline />;
  if (tab === 'impact') return <Impact />;
  return <Docs />;
}

/* ── فعالیت‌ها ────────────────────────────────────────────── */

function Activities() {
  const a = programActivities;

  return (
    <>
      <KpiRow kpis={a.kpis} cols={6} />
      <AiBand title={a.ai.title} body={a.ai.body} chips={a.ai.chips} />

      <div className="grid gap-4 xl:grid-cols-[1fr_340px] items-start">
        <div className="min-w-0 space-y-4">
          <section className="bg-white" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            <div className="p-4 flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1">
                {a.views.map((v, i) => (
                  <button
                    key={v}
                    className="px-3.5 py-2 text-[11px] font-bold"
                    style={
                      i === 0
                        ? { borderRadius: R.md, border: `1.5px solid ${T.primary}`, color: T.primary }
                        : { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>

              <span className="flex-1" />

              <span className="flex items-center gap-2 text-[11px]" style={{ color: T.ink }}>
                {a.onlyAttention}
                <span className="w-9 h-5 rounded-full relative" style={{ backgroundColor: '#d5d7e3' }}>
                  <span className="absolute top-[3px] right-[3px] w-3.5 h-3.5 rounded-full bg-white" />
                </span>
              </span>
            </div>

            <div className="px-4 pb-3 flex items-center gap-2 flex-wrap justify-end">
              {a.filters.map((f) => (
                <span
                  key={f.id}
                  className="flex items-center gap-1.5 px-3 py-2 text-[10.5px]"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                >
                  <Icon name="lucide:chevron-down" size={11} style={{ backgroundColor: T.muted }} />
                  {f.label}
                </span>
              ))}
            </div>

            <div className="overflow-x-auto" style={{ borderTop: `1px solid ${T.border}` }}>
              <table className="w-full min-w-[860px] text-right border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#fafafc' }}>
                    {[a.cols.deadline, a.cols.impact, a.cols.done, a.cols.people, a.cols.gap, a.cols.source].map((c) => (
                      <th key={c} className="px-3 py-2.5 text-[10px] font-bold whitespace-nowrap" style={{ color: T.muted }}>
                        {c}
                      </th>
                    ))}
                    <th className="px-3 py-2.5 text-[10px] font-bold w-full" style={{ color: T.muted }}>
                      {a.cols.name}
                    </th>
                  </tr>
                </thead>

                {a.phases.map((ph) => (
                  <tbody key={ph.n}>
                    <tr>
                      <td colSpan={7} className="px-3 py-2" style={{ backgroundColor: '#fbfaff' }}>
                        <span className="flex items-center gap-2 justify-end">
                          <span className="text-[9.5px] font-bold" style={{ color: ph.fg }}>
                            {ph.state}
                          </span>
                          <span className="text-[11px] font-extrabold" style={{ color: T.ink }}>
                            {ph.label}
                          </span>
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{ backgroundColor: T.tintPurple, color: T.primary }}
                          >
                            {ph.n}
                          </span>
                        </span>
                      </td>
                    </tr>

                    {ph.rows.map((r) => (
                      <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                        <td className="px-3 py-2.5">
                          <span className="flex items-center justify-end gap-1 text-[9.5px] whitespace-nowrap" style={{ color: T.muted }}>
                            {r.deadline}
                            <Icon
                              name={r.ok ? 'lucide:circle-check' : r.warn ? 'lucide:triangle-alert' : 'lucide:clock'}
                              size={11}
                              style={{ backgroundColor: r.ok ? T.success : r.warn ? T.danger : T.warning }}
                            />
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[10px] font-bold" style={{ color: T.successStrong }}>
                          {r.impact}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="flex items-center gap-1.5">
                            <span className="text-[9.5px] font-bold shrink-0" style={{ color: T.ink }}>
                              {r.done}٪
                            </span>
                            <span className="w-14 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                              <span
                                className="block h-full rounded-full"
                                style={{
                                  width: `${r.done}%`,
                                  backgroundColor: r.done >= 90 ? T.success : r.done >= 60 ? T.warning : '#d5d7e3',
                                }}
                              />
                            </span>
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[10px]" style={{ color: T.ink }}>
                          {r.people}
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className="px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap"
                            style={{ borderRadius: R.sm, backgroundColor: T.tintPurple, color: T.primary }}
                          >
                            {r.gap}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className="px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap"
                            style={{ borderRadius: R.sm, backgroundColor: '#f4f4f8', color: T.muted }}
                          >
                            {r.source}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="flex items-center justify-end gap-2">
                            <span className="text-right">
                              <span className="block text-[11px] font-bold" style={{ color: T.ink }}>
                                {r.name}
                              </span>
                              <span className="block text-[9px]" style={{ color: T.muted }}>
                                {r.kind}
                              </span>
                            </span>
                            <Icon name={r.icon} size={16} style={{ backgroundColor: T.primary }} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>

            <div className="p-3 text-center" style={{ borderTop: `1px solid ${T.border}` }}>
              <button className="inline-flex items-center gap-1.5 text-[11.5px] font-bold" style={{ color: T.primary }}>
                <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.primary }} />
                {a.more}
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <Panel title={a.matrixTitle}>
            <Quadrant
              points={a.matrixPoints}
              labels={a.matrixQuadrants as never}
              axes={a.matrixAxes}
            />
          </Panel>

          <Panel title={a.bySourceTitle}>
            <div className="flex items-center gap-3">
              <Donut slices={a.bySource} size={96} thickness={18} />
              <div className="flex-1 min-w-0">
                <DonutLegend slices={a.bySource} />
              </div>
            </div>
          </Panel>

          <Panel title={a.impactBySourceTitle}>
            <BarList rows={a.impactBySource} max={100} />
          </Panel>
        </div>
      </div>
    </>
  );
}

/* ── نیازها و Gapها ───────────────────────────────────────── */

function Gaps() {
  const g = programGaps;

  return (
    <>
      <KpiRow kpis={g.kpis} cols={5} />
      <AiBand title={g.ai.title} body={g.ai.body} cta={g.ai.cta} />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {g.cards.map((c) => (
          <section
            key={c.id}
            className="bg-white p-4"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <header className="flex items-center gap-2.5">
              {c.warn && <Icon name="lucide:triangle-alert" size={17} style={{ backgroundColor: c.fg }} />}
              <span className="flex-1 text-right">
                <span className="block text-[15px] font-extrabold" style={{ color: c.fg }}>
                  {c.label}
                </span>
                <span className="block text-[10px]" style={{ color: T.muted }}>
                  {c.people}
                </span>
              </span>
              <Icon name="lucide:users-round" size={19} style={{ backgroundColor: c.fg }} />
            </header>

            <div className="mt-3.5 flex items-center justify-between gap-2 text-[10px]" style={{ color: T.muted }}>
              <span>Target</span>
              <span>Current</span>
              <span>Baseline</span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="text-[14px] font-extrabold" style={{ color: T.muted }}>
                {c.target}
              </span>
              <span className="text-[18px] font-extrabold" style={{ color: T.ink }}>
                {c.current}
              </span>
              <span className="text-[14px] font-extrabold" style={{ color: T.muted }}>
                {c.baseline}
              </span>
            </div>

            <span className="mt-2 block h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
              <span className="block h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.barColour }} />
            </span>

            <div className="mt-1.5 flex items-center justify-between text-[10px]">
              <span className="font-bold" style={{ color: c.fg }}>
                {c.delta} بهبود
              </span>
              <span style={{ color: T.muted }}>پوشش {c.coverage}</span>
            </div>

            <p className="mt-3 text-right text-[10px]" style={{ color: T.muted }}>
              {c.activities}
            </p>

            <div className="mt-2 flex items-center gap-1.5 flex-wrap justify-end">
              {c.icons.map((i, k) => (
                <span
                  key={k}
                  className="w-7 h-7 flex items-center justify-center"
                  style={{ borderRadius: R.sm, backgroundColor: '#fafafc' }}
                >
                  <Icon name={i} size={13} style={{ backgroundColor: c.fg }} />
                </span>
              ))}
            </div>

            {c.best && (
              <p
                className="mt-2.5 p-2 text-right text-[10px] font-bold"
                style={{ borderRadius: R.sm, backgroundColor: T.tintGreen, color: T.successStrong }}
              >
                {c.best}: {c.bestValue}
              </p>
            )}

            {c.alert && (
              <div className="mt-2.5 p-3" style={{ borderRadius: R.md, backgroundColor: T.tintOrange }}>
                <h4 className="text-right text-[10.5px] font-extrabold" style={{ color: T.accent }}>
                  {c.alert.title}
                </h4>
                <ul className="mt-1.5 space-y-1">
                  {c.alert.lines.map((l) => (
                    <li key={l} className="text-right text-[9.5px] leading-4" style={{ color: T.ink }}>
                      {l}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-2 w-full py-2 text-[10px] font-bold bg-white"
                  style={{ borderRadius: R.sm, color: T.accent }}
                >
                  {c.alert.cta}
                </button>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={g.matrixTitle}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th />
                {g.matrixCols.map((c) => (
                  <th key={c} className="pb-2 px-1 text-[8.5px] font-bold text-center" style={{ color: T.ink }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.matrixRows.map((r) => (
                <tr key={r.label}>
                  <td className="pl-2 text-[9.5px] whitespace-nowrap" style={{ color: T.ink }}>
                    {r.label}
                  </td>
                  {r.cells.map((v, i) => (
                    <td key={i} className="p-0.5">
                      <span
                        className="block h-6"
                        style={{ borderRadius: 4, backgroundColor: g.coverageLegend[v].colour }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            {g.coverageLegend.map((l) => (
              <li key={l.label} className="flex items-center gap-1 text-[8.5px]" style={{ color: T.ink }}>
                {l.label}
                <span className="w-3 h-2.5" style={{ borderRadius: 2, backgroundColor: l.colour }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={g.peopleGapTitle} cta={g.peopleGapCta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th />
                {g.peopleGapCols.map((c) => (
                  <th key={c} className="pb-2 px-1 text-[8.5px] font-bold text-center" style={{ color: T.ink }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.peopleGapRows.map((r) => (
                <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-1.5">
                    <span className="flex items-center justify-end gap-1.5">
                      <span className="text-[9.5px] whitespace-nowrap" style={{ color: T.ink }}>
                        {r.name}
                      </span>
                      <img
                        src={`/images/aryaz/avatars/${r.avatar}.png`}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                    </span>
                  </td>
                  {r.cells.map((c, i) => (
                    <td key={i} className="py-1.5 text-center text-[10px] font-bold" style={{ color: T.successStrong }}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={g.severityTitle} cta={g.severityCta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {g.severityCols.map((c) => (
                  <th key={c} className="pb-2 text-[8.5px] font-bold text-center" style={{ color: T.ink }}>
                    {c}
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {g.severityRows.map((r) => (
                <tr key={r.label} style={{ borderTop: `1px solid ${T.border}` }}>
                  {r.cells.map((c, i) => (
                    <td key={i} className="py-2 text-center">
                      <span
                        className="px-2 py-0.5 text-[9px] font-bold"
                        style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                      >
                        {c}
                      </span>
                    </td>
                  ))}
                  <td className="py-2 text-right text-[9px]" style={{ color: T.ink }}>
                    {r.label}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={g.closingTitle} cta={g.closingCta}>
          <div className="flex items-center gap-4">
            <Ring pct={g.closing.pct} colour={T.success} size={84} stroke={9} />
            <div className="flex-1 space-y-2">
              {g.closingRows.map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold" style={{ color: r.colour }}>
                      {r.pct}٪
                    </span>
                    <span style={{ color: T.ink }}>{r.label}</span>
                  </div>
                  <span className="mt-1 block h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                    <span className="block h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.colour }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title={g.suggestionsTitle}>
          <ul className="space-y-2">
            {g.suggestions.map((s) => (
              <li key={s.label} className="p-2.5" style={{ borderRadius: R.md, backgroundColor: s.bg }}>
                <span className="flex items-center justify-end gap-1.5 text-[11px] font-extrabold" style={{ color: s.fg }}>
                  {s.label}
                  <Icon name={s.icon} size={13} style={{ backgroundColor: s.fg }} />
                </span>
                <p className="mt-1 text-right text-[9.5px] leading-4" style={{ color: T.ink }}>
                  {s.note}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={g.quickTitle}>
          <QuickGrid rows={g.quick} cols={2} />
        </Panel>
      </div>
    </>
  );
}

/* ── Timeline ─────────────────────────────────────────────── */

function Timeline() {
  const t = programTimeline;

  return (
    <>
      <KpiRow kpis={t.kpis} cols={6} />
      <AiBand title={t.ai.title} body={t.ai.body} chips={t.ai.chips} />

      <div className="grid gap-4 xl:grid-cols-[1fr_320px] items-start">
        <Panel title={t.ganttTitle}>
          <div className="flex items-center gap-1 mb-3 justify-end">
            {t.views.map((v, i) => (
              <button
                key={v}
                className="px-3.5 py-2 text-[10.5px] font-bold"
                style={
                  i === 0
                    ? { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                    : { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }
                }
              >
                {v}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Week header — LTR so time reads forward. */}
              <div className="flex gap-1 mb-2 pr-[150px]" dir="ltr">
                {t.weeks.map((w) => (
                  <span key={w} className="flex-1 text-center text-[9px]" style={{ color: T.muted }}>
                    {w}
                  </span>
                ))}
              </div>

              {t.phases.map((ph) => (
                <div key={ph.label} className="mb-3">
                  <p className="text-right text-[10.5px] font-extrabold mb-1.5" style={{ color: T.ink }}>
                    {ph.label}
                  </p>

                  {ph.rows.map((r) => (
                    <div key={r.label} className="flex items-center gap-2 mb-1.5">
                      <span className="w-[150px] shrink-0 text-right text-[9.5px] truncate" style={{ color: T.muted }}>
                        {r.label}
                      </span>

                      <span className="flex-1 flex gap-1 relative" dir="ltr">
                        {t.weeks.map((_, wi) => (
                          <span key={wi} className="flex-1 h-5 relative">
                            {wi === t.todayWeek && (
                              <span
                                className="absolute inset-y-[-6px] left-0 w-px z-10"
                                style={{ backgroundColor: T.primary }}
                              />
                            )}
                          </span>
                        ))}

                        <span
                          className="absolute inset-y-0 h-5 rounded-full flex items-center justify-center"
                          style={{
                            left: `${(r.start / t.weeks.length) * 100}%`,
                            width: `${(r.span / t.weeks.length) * 100}%`,
                            backgroundColor: r.late ? T.danger : ph.colour,
                          }}
                        >
                          {r.late && (
                            <Icon name="lucide:triangle-alert" size={11} style={{ backgroundColor: '#fff' }} />
                          )}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title={t.upcomingTitle} cta={t.upcomingCta}>
            <ul className="space-y-2.5">
              {t.upcoming.map((u) => (
                <li key={u.label} className="flex items-center gap-2.5">
                  <span
                    className="w-10 py-1.5 text-center shrink-0"
                    style={{ borderRadius: R.sm, backgroundColor: '#fafafc' }}
                  >
                    <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                      {u.day}
                    </span>
                    <span className="block text-[8px]" style={{ color: T.muted }}>
                      {u.month}
                    </span>
                  </span>
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[10.5px] font-bold truncate" style={{ color: T.ink }}>
                      {u.label}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {u.sub}
                      {u.time && ` — ${u.time}`}
                    </span>
                  </span>
                  <Icon name={u.icon} size={15} style={{ backgroundColor: u.fg }} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={t.peopleTimeTitle} cta={t.peopleTimeCta}>
            <div className="flex items-center gap-3">
              <Donut slices={t.peopleTime} size={96} thickness={18} />
              <div className="flex-1 min-w-0">
                <DonutLegend slices={t.peopleTime} />
              </div>
            </div>
          </Panel>

          <Panel title={t.forecastTitle}>
            <ul className="space-y-2">
              {[t.forecast.planned, t.forecast.predicted].map((f) => (
                <li key={f.label} className="flex items-center justify-between text-[10.5px]">
                  <span className="font-bold" style={{ color: T.ink }}>
                    {f.value}
                  </span>
                  <span style={{ color: T.muted }}>{f.label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-2.5 text-center">
              <span
                className="px-3 py-1.5 text-[11px] font-extrabold"
                style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
              >
                {t.forecast.state}
              </span>
            </p>

            <span className="mt-2.5 block h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
              <span
                className="block h-full rounded-full"
                style={{ width: `${t.forecast.pct}%`, backgroundColor: T.success }}
              />
            </span>
            <p className="mt-1 text-center text-[9.5px]" style={{ color: T.muted }}>
              {t.forecast.note}
            </p>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={t.planVsActualTitle}>
          <div className="flex items-center gap-2 mb-2 justify-end text-[9.5px]">
            <span style={{ color: T.successStrong }}>{t.planVsActual.badge.delta}</span>
            <span style={{ color: T.success }}>{t.planVsActual.badge.actual}</span>
            <span style={{ color: T.muted }}>{t.planVsActual.badge.plan}</span>
          </div>
          <BarGroup
            categories={t.planVsActual.labels}
            series={[
              { name: 'Plan', colour: '#d5d7e3', values: t.planVsActual.plan },
              { name: 'Actual', colour: T.success, values: [...t.planVsActual.actual, 0, 0] },
            ]}
            height={150}
          />
        </Panel>

        <Panel title={t.lateTitle}>
          <ul className="space-y-2.5">
            {t.late.map((l) => (
              <li key={l.label} className="p-3" style={{ borderRadius: R.md, backgroundColor: T.tintRed }}>
                <span className="flex items-center justify-between gap-2">
                  <span className="text-[9.5px] font-bold" style={{ color: T.danger }}>
                    {l.delay}
                  </span>
                  <span className="text-[11px] font-extrabold" style={{ color: T.ink }}>
                    {l.label}
                  </span>
                </span>
                <span className="mt-1 flex items-center justify-between text-[9px]" style={{ color: T.muted }}>
                  <span>{l.affected}</span>
                  <span>{l.deadline}</span>
                </span>
                <span className="mt-1.5 block h-1.5 rounded-full overflow-hidden bg-white">
                  <span className="block h-full rounded-full" style={{ width: `${l.pct}%`, backgroundColor: T.danger }} />
                </span>
                <button
                  className="mt-2 w-full py-1.5 text-[10px] font-bold bg-white"
                  style={{ borderRadius: R.sm, color: T.danger }}
                >
                  {t.lateCta}
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={t.depsTitle} cta={t.depsCta}>
          <ol className="space-y-0">
            {t.deps.map((d, i) => (
              <li key={d.label} className="flex items-start gap-2.5">
                <span className="flex flex-col items-center shrink-0">
                  <Icon name={d.icon} size={15} style={{ backgroundColor: d.fg }} />
                  {i < t.deps.length - 1 && (
                    <span className="w-px flex-1 min-h-[16px] my-1" style={{ backgroundColor: T.border }} />
                  )}
                </span>
                <span className="flex-1 pb-2.5 flex items-center justify-between gap-2">
                  <span className="text-[9px]" style={{ color: d.fg }}>
                    {d.state}
                  </span>
                  <span className="text-[10.5px]" style={{ color: T.ink }}>
                    {d.label}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-2 p-2.5" style={{ borderRadius: R.md, backgroundColor: T.tintOrange }}>
            <span className="block text-right text-[10px] font-extrabold" style={{ color: T.accent }}>
              {t.depsWarn.title}
            </span>
            {t.depsWarn.lines.map((l) => (
              <p key={l} className="mt-1 text-right text-[9px] leading-4" style={{ color: T.ink }}>
                {l}
              </p>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

/* ── اثربخشی ──────────────────────────────────────────────── */

function Impact() {
  const m = programImpact;

  return (
    <>
      <KpiRow kpis={m.kpis} cols={6} />
      <AiBand title={m.ai.title} body={m.ai.body} chips={m.ai.chips} cta={m.ai.cta} />

      <Panel title={m.beforeAfterTitle}>
        <div className="grid gap-4 lg:grid-cols-3">
          {m.gaps.map((g) => (
            <div key={g.label} className="p-3.5" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
              <header className="flex items-center gap-2">
                {g.warn && <Icon name="lucide:triangle-alert" size={15} style={{ backgroundColor: T.danger }} />}
                <span className="flex-1 text-right">
                  <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {g.label}
                  </span>
                  <span className="block text-[9.5px]" style={{ color: T.muted }}>
                    {g.people}
                  </span>
                </span>
              </header>

              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[13px] font-extrabold" style={{ color: T.muted }}>
                  {g.target}
                </span>
                <span className="text-[17px] font-extrabold" style={{ color: T.ink }}>
                  {g.current}
                </span>
                <span className="text-[13px] font-extrabold" style={{ color: T.muted }}>
                  {g.baseline}
                </span>
              </div>

              <span className="mt-2 block h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                <span className="block h-full rounded-full" style={{ width: `${g.pct}%`, backgroundColor: g.colour }} />
              </span>

              <div className="mt-1.5 flex items-center justify-between text-[10px]">
                <span className="font-bold" style={{ color: g.colour }}>
                  {g.delta}
                </span>
                <span style={{ color: T.muted }}>{g.closed}</span>
              </div>

              <p className="mt-2 text-right text-[9.5px]" style={{ color: T.muted }}>
                {g.activities}
              </p>
              {g.best && (
                <p className="text-right text-[9.5px] font-bold" style={{ color: T.successStrong }}>
                  {g.best} {g.bestValue}
                </p>
              )}

              {g.alert && (
                <div className="mt-2.5 p-2.5" style={{ borderRadius: R.sm, backgroundColor: T.tintOrange }}>
                  <span className="block text-right text-[10px] font-extrabold" style={{ color: T.accent }}>
                    {g.alert.title}
                  </span>
                  <ul className="mt-1 space-y-0.5">
                    {g.alert.lines.map((l) => (
                      <li key={l} className="text-right text-[9px] leading-4" style={{ color: T.ink }}>
                        {l}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-1.5 w-full py-1.5 text-[9.5px] font-bold bg-white"
                    style={{ borderRadius: R.sm, color: T.accent }}
                  >
                    {g.alert.cta}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={m.interventionTitle} cta={m.interventionCta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {[m.interventionCols.impact, m.interventionCols.improve, m.interventionCols.completion, m.interventionCols.engagement, m.interventionCols.name].map(
                  (c) => (
                    <th key={c} className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                      {c}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {m.interventions.map((r) => (
                <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5">
                    <span className="flex items-center gap-0.5 justify-end">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Icon
                          key={i}
                          name="lucide:star"
                          size={10}
                          style={{ backgroundColor: i < r.stars ? T.warning : '#e4e5ee' }}
                        />
                      ))}
                    </span>
                  </td>
                  <td className="py-2.5 text-[10.5px] font-bold" style={{ color: T.successStrong }}>
                    {r.improve}
                  </td>
                  <td className="py-2.5 text-[10px]" style={{ color: T.ink }}>
                    {r.completion}
                  </td>
                  <td className="py-2.5 text-[10px]" style={{ color: T.ink }}>
                    {r.engagement}
                  </td>
                  <td className="py-2.5 text-[11px] font-bold" style={{ color: T.ink }}>
                    {r.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={m.changeTitle}>
          <ul className="flex items-center justify-end gap-3 mb-2">
            {m.changeLegend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[9.5px]" style={{ color: T.ink }}>
                {l.label}
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.colour }} />
              </li>
            ))}
          </ul>

          <BarGroup
            categories={m.changeGroups.map((g) => g.label)}
            series={[
              { name: 'Baseline', colour: '#d5d7e3', values: m.changeGroups.map((g) => g.values[0]) },
              { name: 'Current', colour: T.violet, values: m.changeGroups.map((g) => g.values[1]) },
              { name: 'Target', colour: T.success, values: m.changeGroups.map((g) => g.values[2]) },
            ]}
            height={170}
            max={90}
            rtl
          />
        </Panel>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={m.peopleImproveTitle} cta={m.peopleImproveCta}>
          <BarList rows={m.peopleImprove} max={100} />
        </Panel>

        <Panel title={m.quadrantTitle}>
          <Quadrant points={m.quadrantPoints} labels={m.quadrantLabels as never} axes={m.quadrantAxes} />
        </Panel>

        <Panel title={m.reassessTitle}>
          <p className="text-right text-[10.5px]" style={{ color: T.ink }}>
            {m.reassess.note}
          </p>
          <p className="text-right text-[9.5px]" style={{ color: T.muted }}>
            {m.reassess.remaining}
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { l: m.reassess.beforeLabel, v: m.reassess.before, c: T.muted },
              { l: m.reassess.afterLabel, v: m.reassess.after, c: T.ink },
              { l: m.reassess.deltaLabel, v: m.reassess.delta, c: T.successStrong },
            ].map((x) => (
              <span key={x.l} className="p-2" style={{ borderRadius: R.sm, backgroundColor: '#fafafc' }}>
                <span className="block text-[9px]" style={{ color: T.muted }}>
                  {x.l}
                </span>
                <span className="block text-[13px] font-extrabold" style={{ color: x.c }}>
                  {x.v}
                </span>
              </span>
            ))}
          </div>

          <button
            className="mt-3 w-full py-2 text-[10.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
          >
            {m.reassess.cta}
          </button>
          <button
            className="mt-1.5 w-full py-2 text-[10.5px] font-bold text-white"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            {m.reassess.remind}
          </button>
        </Panel>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={m.transferTitle}>
          <ul className="space-y-2.5">
            {m.transfer.map((r) => (
              <li key={r.label} className="flex items-center gap-2.5">
                <span className="text-[13px] font-extrabold shrink-0" style={{ color: r.fg }}>
                  {r.value}
                </span>
                <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                  {r.label}
                </span>
                <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={m.funnelTitle}>
          <ul className="space-y-1.5">
            {m.funnel.map((f) => (
              <li key={f.label} className="flex justify-center">
                <span
                  className="flex items-center justify-between gap-2 px-3 py-2 text-[9.5px] font-bold text-white"
                  style={{ width: `${f.width}%`, borderRadius: R.sm, backgroundColor: T.primary }}
                >
                  <span style={{ opacity: 0.9 }}>{f.pct}</span>
                  <span className="flex-1 text-right truncate">{f.label}</span>
                  <span>{f.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={m.byUnitTitle}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {[m.byUnitCols.people, m.byUnitCols.closed, m.byUnitCols.improve, m.byUnitCols.unit].map((c) => (
                  <th key={c} className="pb-2 text-[9px] font-bold" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.byUnit.map((r) => (
                <tr key={r.unit} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5 text-[9.5px]" style={{ color: T.ink }}>
                    {r.people}
                  </td>
                  <td className="py-2.5 text-[10px] font-bold" style={{ color: r.warn ? T.danger : T.ink }}>
                    {r.closed}
                  </td>
                  <td className="py-2.5 text-[10.5px] font-bold" style={{ color: r.warn ? T.danger : T.successStrong }}>
                    {r.improve}
                  </td>
                  <td className="py-2.5 text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {r.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={m.costTitle}>
          <ul className="space-y-2">
            {m.cost.map((c) => (
              <li key={c.label} className="flex items-center justify-between text-[10.5px]">
                <span className="font-bold" style={{ color: T.ink }}>
                  {c.value}
                </span>
                <span style={{ color: T.muted }}>{c.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 pt-3 space-y-2" style={{ borderTop: `1px solid ${T.border}` }}>
            {m.costIndex.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-[10.5px]">
                <span className="font-bold" style={{ color: T.successStrong }}>
                  {c.value}
                </span>
                <span style={{ color: T.muted }}>{c.label}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={m.compareTitle}>
          <div className="grid grid-cols-2 gap-2.5 text-center">
            {[m.compare.this, m.compare.avg].map((c) => (
              <span key={c.label} className="p-3" style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}>
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {c.label}
                </span>
                <span className="block text-[17px] font-extrabold" style={{ color: T.ink }}>
                  {c.value}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-2.5 p-3 text-center" style={{ borderRadius: R.md, backgroundColor: T.tintGreen }}>
            <span className="block text-[9.5px]" style={{ color: T.muted }}>
              {m.compare.rank.label}
            </span>
            <span className="block text-[15px] font-extrabold" style={{ color: T.successStrong }}>
              {m.compare.rank.value}
            </span>
            <span className="block text-[9px]" style={{ color: T.muted }}>
              {m.compare.rank.note}
            </span>
          </div>
        </Panel>

        <Panel title={m.decisionTitle}>
          <QuickGrid rows={m.decision} cols={2} />
          <button
            data-ripple
            className="mt-3 w-full py-2.5 text-[11px] font-bold text-white"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            {m.decisionCta}
          </button>
        </Panel>
      </div>

      <Panel title={m.recTitle}>
        <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-4">
          {m.rec.map((r) => (
            <div key={r.label} className="p-3" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
              <span className="flex items-center justify-end gap-1.5 text-[11px] font-extrabold" style={{ color: r.fg }}>
                {r.label}
                <Icon name={r.icon} size={13} style={{ backgroundColor: r.fg }} />
              </span>
              <p className="mt-1 text-right text-[9.5px] leading-4" style={{ color: T.muted }}>
                {r.note}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

/* ── مستندات ──────────────────────────────────────────────── */

function Docs() {
  const d = programDocs;

  return (
    <>
      <KpiRow kpis={d.kpis} cols={6} />
      <AiBand title={d.ai.title} body={d.ai.body} chips={d.ai.chips} cta={d.ai.cta} />

      <div className="grid gap-4 xl:grid-cols-[1fr_330px] items-start">
        <div className="min-w-0 space-y-4">
          <section className="bg-white" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            <div className="p-4 flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1">
                {d.tabs.map((t, i) => (
                  <button
                    key={t}
                    className="px-4 py-2 text-[11px] font-bold"
                    style={
                      i === 0
                        ? { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                        : { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>

              <span className="flex-1" />

              <label
                className="flex items-center gap-2 px-3 py-2 min-w-[160px]"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <Icon name="lucide:search" size={14} style={{ backgroundColor: T.muted }} />
                <input
                  type="search"
                  placeholder={d.search}
                  className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>
            </div>

            <div className="px-4 pb-3 flex items-center gap-2 flex-wrap justify-end">
              {d.filters.map((f) => (
                <span
                  key={f.id}
                  className="flex items-center gap-1.5 px-3 py-2 text-[10px]"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                >
                  <Icon name="lucide:chevron-down" size={11} style={{ backgroundColor: T.muted }} />
                  {f.label}
                </span>
              ))}
            </div>

            <div className="overflow-x-auto" style={{ borderTop: `1px solid ${T.border}` }}>
              <table className="w-full min-w-[880px] text-right border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#fafafc' }}>
                    {[d.cols.state, d.cols.approver, d.cols.date, d.cols.kind, d.cols.activity, d.cols.person].map((c) => (
                      <th key={c} className="px-3 py-2.5 text-[10px] font-bold whitespace-nowrap" style={{ color: T.muted }}>
                        {c}
                      </th>
                    ))}
                    <th className="px-3 py-2.5 text-[10px] font-bold w-full" style={{ color: T.muted }}>
                      {d.cols.doc}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {d.rows.map((r, i) => (
                    <tr key={`${r.doc}-${i}`} style={{ borderTop: `1px solid ${T.border}` }}>
                      <td className="px-3 py-2.5">
                        <span
                          className="px-2 py-0.5 text-[9px] font-bold whitespace-nowrap"
                          style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                        >
                          {r.state}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[9.5px] whitespace-nowrap" style={{ color: T.muted }}>
                        {r.approver}
                      </td>
                      <td className="px-3 py-2.5 text-[9.5px] whitespace-nowrap" style={{ color: T.muted }}>
                        {r.date}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[9.5px] font-bold" style={{ color: r.kindFg }}>
                          {r.kind}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[10px]" style={{ color: T.ink }}>
                        {r.activity}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="flex items-center justify-end gap-1.5">
                          <span className="text-[10px] whitespace-nowrap" style={{ color: T.ink }}>
                            {r.person}
                          </span>
                          <img
                            src={`/images/aryaz/avatars/${r.avatar}.png`}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="flex items-center justify-end gap-2">
                          <span className="text-[10.5px] font-bold" style={{ color: T.ink }}>
                            {r.doc}
                          </span>
                          <Icon name="lucide:file-text" size={14} style={{ backgroundColor: T.primary }} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 flex items-center justify-between gap-3 flex-wrap" style={{ borderTop: `1px solid ${T.border}` }}>
              <span className="text-[11px]" style={{ color: T.muted }}>
                {d.showing}
              </span>
              <div className="flex items-center gap-1.5">
                {d.pages.map((p, i) => (
                  <button
                    key={`${p}-${i}`}
                    className="w-8 h-8 text-[11px] font-bold"
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
              <span className="text-[11px]" style={{ color: T.muted }}>
                {d.perPage}
              </span>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <Panel title={d.byTypeTitle}>
              <div className="flex items-center gap-3">
                <Donut slices={d.byType} size={104} thickness={20} />
                <div className="flex-1 min-w-0">
                  <DonutLegend slices={d.byType} />
                </div>
              </div>
            </Panel>

            <Panel title={d.timelineTitle}>
              <BarGroup
                categories={d.timelineCategories}
                series={[{ name: 'مستندات', colour: T.violet, values: d.timelineValues }]}
                height={150}
                rtl
              />
            </Panel>
          </div>
        </div>

        <div className="space-y-4">
          <Panel title={d.detailTitle}>
            <div className="flex items-center gap-2.5">
              <span
                className="px-2 py-0.5 text-[9.5px] font-bold shrink-0"
                style={{ borderRadius: R.sm, backgroundColor: T.tintRed, color: T.danger }}
              >
                {d.detail.kind}
              </span>
              <span className="flex-1 text-right">
                <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                  {d.detail.name}
                </span>
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {d.detail.person}
                </span>
              </span>
              <img
                src={`/images/aryaz/avatars/${d.detail.avatar}.png`}
                alt=""
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
            </div>

            <dl className="mt-3 space-y-1.5">
              {d.detail.rows.map((r) => (
                <div key={r.k} className="flex items-center justify-between text-[9.5px]">
                  <dd className="font-bold" style={{ color: T.ink }}>
                    {r.v}
                  </dd>
                  <dt style={{ color: T.muted }}>{r.k}</dt>
                </div>
              ))}
            </dl>

            <div
              className="mt-3 p-3 text-center"
              style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
            >
              <Icon name="lucide:file-text" size={26} style={{ backgroundColor: T.danger, margin: '0 auto' }} />
              <span className="block mt-1.5 text-[10px] font-bold" style={{ color: T.ink }}>
                {d.detail.previewName}
              </span>
            </div>

            <div className="mt-3">
              <span className="block text-right text-[10px] font-extrabold" style={{ color: T.ink }}>
                {d.detail.noteTitle}
              </span>
              <p className="mt-1 text-right text-[9.5px] leading-5" style={{ color: T.muted }}>
                {d.detail.note}
              </p>
            </div>

            <div className="mt-3 p-2.5" style={{ borderRadius: R.md, backgroundColor: T.tintOrange }}>
              <span className="block text-right text-[10px] font-bold" style={{ color: T.accent }}>
                {d.detail.state}
              </span>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-2">
              <button
                className="py-2 text-[10px] font-bold text-white"
                style={{ borderRadius: R.sm, backgroundColor: T.successStrong }}
              >
                {d.detail.actions.approve}
              </button>
              <button
                className="py-2 text-[10px] font-bold"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.accent }}
              >
                {d.detail.actions.fix}
              </button>
              <button
                className="py-2 text-[10px] font-bold"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.danger }}
              >
                {d.detail.actions.reject}
              </button>
            </div>

            <input
              placeholder={d.detail.feedback}
              className="mt-2.5 w-full px-3 py-2.5 text-right text-[10px] outline-none"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            />
            <button
              className="mt-2 w-full py-2 text-[10.5px] font-bold text-white"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              {d.detail.save}
            </button>
          </Panel>

          <Panel title={d.incompleteTitle} cta={d.incompleteCta}>
            <ul className="space-y-2">
              {d.incomplete.map((r, i) => (
                <li key={`${r.name}-${i}`} className="flex items-center gap-2.5">
                  <button
                    className="px-2.5 py-1 text-[9.5px] font-bold shrink-0"
                    style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                  >
                    {d.incompleteAction}
                  </button>
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[10.5px] font-bold truncate" style={{ color: T.ink }}>
                      {r.name}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.danger }}>
                      {r.note}
                    </span>
                  </span>
                  <img
                    src={`/images/aryaz/avatars/${r.avatar}.png`}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={d.evidenceTitle}>
            {[d.evidence.full, d.evidence.partial].map((e, i) => (
              <div
                key={e.label}
                className="p-2.5 mb-2"
                style={{ borderRadius: R.md, backgroundColor: i === 0 ? T.tintGreen : T.tintOrange }}
              >
                <span className="flex items-center justify-between">
                  <span
                    className="text-[13px] font-extrabold"
                    style={{ color: i === 0 ? T.successStrong : T.accent }}
                  >
                    {e.value}
                  </span>
                  <span className="text-[9.5px]" style={{ color: T.ink }}>
                    {e.label}
                  </span>
                </span>
                <span className="block text-right text-[8.5px]" style={{ color: T.muted }}>
                  {e.note}
                </span>
              </div>
            ))}
            <p className="text-right text-[8.5px]" style={{ color: T.muted }}>
              {d.evidence.note}
            </p>
          </Panel>
        </div>
      </div>
    </>
  );
}
