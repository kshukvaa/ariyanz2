'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { Donut, DonutLegend, BarList, BarGroup } from '@/components/org/panel/Charts';
import Ring from '@/components/org/panel/Ring';
import { KpiRow, AiBand, Panel } from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import { ProgramHeader, GapBar, Quadrant, QuickGrid } from './ProgramShell';
import ProgramMoreTabs from './ProgramMoreTabs';
import { programOverview, programPeople } from '@/data/orgProgram';

/* ──────────────────────────────────────────────────────────────
   Development programme detail.

   Seven tabs over one programme. Tab state is local rather than
   routed: these are views of the same object, and none of them is
   a place you would want to link someone to independently of the
   programme itself.
────────────────────────────────────────────────────────────── */

export default function ProgramClient() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="space-y-5">
      <ProgramHeader tab={tab} onTab={setTab} />

      {tab === 'overview' && <Overview />}
      {tab === 'people' && <People />}
      {['activities', 'gaps', 'timeline', 'impact', 'docs'].includes(tab) && (
        <ProgramMoreTabs tab={tab} />
      )}
    </div>
  );
}

/* ── Tab: نمای کلی ────────────────────────────────────────── */

function Overview() {
  const o = programOverview;

  return (
    <>
      <KpiRow kpis={o.kpis} cols={6} />

      <AiBand title={o.ai.title} body={o.ai.body} chips={o.ai.chips} cta={o.ai.cta} />

      <div className="grid gap-4 xl:grid-cols-[320px_1fr] items-start">
        {/* RTL: first column is rightmost — the path rail sits there. */}
        <div className="space-y-4">
          <Panel title={o.pathTitle} cta={o.pathCta}>
            <ol className="space-y-3">
              {o.path.map((p) => (
                <li key={p.n}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[9.5px] font-bold" style={{ color: p.fg }}>
                      {p.state}
                    </span>
                    <span className="flex-1 text-right text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                      {p.label}
                    </span>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[9.5px] font-bold shrink-0"
                      style={{ backgroundColor: T.tintPurple, color: T.primary }}
                    >
                      {p.n}
                    </span>
                  </div>

                  <ul className="mt-1.5 pr-8 space-y-1.5">
                    {p.rows.map((r) => (
                      <li key={r.label} className="flex items-center gap-2 text-[10px]">
                        {r.pct !== undefined ? (
                          <span className="w-8 font-bold shrink-0" style={{ color: T.accent }}>
                            {r.pct}٪
                          </span>
                        ) : (
                          <Icon
                            name={r.on ? 'lucide:circle-check' : 'lucide:circle-dot'}
                            size={12}
                            style={{ backgroundColor: r.on ? T.success : '#d5d7e3' }}
                          />
                        )}
                        <span className="flex-1 text-right truncate" style={{ color: T.ink }}>
                          {r.label}
                        </span>
                        <span
                          className="px-1.5 py-0.5 text-[8.5px] shrink-0"
                          style={{ borderRadius: R.sm, backgroundColor: '#f4f4f8', color: T.muted }}
                        >
                          {r.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title={o.needTitle}>
            <ul className="space-y-2">
              {o.need.map((n) => (
                <li
                  key={n.label}
                  className="flex items-center gap-2.5 p-2.5"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <button
                    className="px-2.5 py-1 text-[9.5px] font-bold shrink-0"
                    style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                  >
                    {n.cta}
                  </button>
                  <span className="flex-1 text-right text-[10px] leading-4" style={{ color: T.ink }}>
                    {n.label}
                  </span>
                  <Icon name="lucide:triangle-alert" size={14} style={{ backgroundColor: n.fg }} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="space-y-4 min-w-0">
          <div className="grid gap-4 md:grid-cols-3">
            <Panel title={o.statusTitle} cta={o.statusCta}>
              <div className="flex items-center gap-3">
                <Donut slices={o.statusSlices} size={98} thickness={19} />
                <div className="flex-1 min-w-0">
                  <DonutLegend slices={o.statusSlices} />
                </div>
              </div>
            </Panel>

            <Panel title={o.behindTitle} cta={o.behindCta}>
              <ul className="space-y-2.5">
                {o.behind.map((b) => (
                  <li key={b.name} className="flex items-center gap-2.5">
                    <span className="w-8 text-[10px] font-bold shrink-0" style={{ color: T.accent }}>
                      {b.pct}٪
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${b.pct}%`, backgroundColor: T.accent }}
                        />
                      </span>
                      <span className="block mt-1 text-right text-[9px]" style={{ color: T.muted }}>
                        {b.note}
                      </span>
                    </span>
                    <span className="text-right shrink-0">
                      <span className="block text-[10.5px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                        {b.name}
                      </span>
                    </span>
                    <img
                      src={`/images/aryaz/avatars/${b.avatar}.png`}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title={o.nextTitle}>
              <div
                className="p-3.5 text-center"
                style={{ borderRadius: R.md, backgroundColor: T.tintOrange }}
              >
                <Icon name="lucide:users-round" size={22} style={{ backgroundColor: T.accent, margin: '0 auto' }} />
                <span className="block mt-2 text-[12px] font-extrabold" style={{ color: T.ink }}>
                  {o.next.label}
                </span>
                <span className="block text-[10px]" style={{ color: T.muted }}>
                  {o.next.people}
                </span>
              </div>
            </Panel>
          </div>

          <Panel title={o.gapProgressTitle}>
            <div className="space-y-4">
              {o.gapProgress.map((g) => (
                <GapBar
                  key={g.label}
                  label={g.label}
                  baseline={g.baseline}
                  current={g.current}
                  target={g.target}
                  delta={g.delta}
                  pct={((g.current - g.baseline) / (g.target - g.baseline)) * 100}
                  colour={g.colour}
                  warn={g.warn}
                  legend={o.gapLegend}
                />
              ))}
            </div>
          </Panel>

          <div className="grid gap-4 md:grid-cols-2">
            <Panel title={o.activityTitle} cta={o.activityCta}>
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr>
                    {[o.activityCols.impact, o.activityCols.satisfaction, o.activityCols.done, o.activityCols.name].map(
                      (c) => (
                        <th key={c} className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                          {c}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {o.activityRows.map((r) => (
                    <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                      <td className="py-2.5 text-[11px] font-extrabold" style={{ color: T.successStrong }}>
                        {r.impact}
                      </td>
                      <td className="py-2.5 text-[10px]" style={{ color: T.ink }}>
                        {r.satisfaction}
                      </td>
                      <td className="py-2.5 text-[10px] font-bold" style={{ color: T.ink }}>
                        {r.done}
                      </td>
                      <td className="py-2.5 text-[10.5px]" style={{ color: T.ink }}>
                        {r.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>

            <Panel title={o.timelineTitle} cta={o.timelineCta}>
              <ol className="space-y-0">
                {o.timelineRows.map((r, i) => (
                  <li key={r.label} className="flex items-start gap-3">
                    <span className="flex flex-col items-center shrink-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full mt-1.5"
                        style={{
                          backgroundColor: r.on ? T.success : r.current ? T.accent : '#d5d7e3',
                        }}
                      />
                      {i < o.timelineRows.length - 1 && (
                        <span className="w-px flex-1 min-h-[22px]" style={{ backgroundColor: T.border }} />
                      )}
                    </span>
                    <span className="flex-1 pb-2.5 flex items-center justify-between gap-2">
                      <span className="text-[9.5px]" style={{ color: T.muted }}>
                        {r.date}
                      </span>
                      <span
                        className="text-[10.5px]"
                        style={{ color: T.ink, fontWeight: r.current ? 800 : 500 }}
                      >
                        {r.label}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Panel>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Panel title={o.impactTitle}>
              <div className="flex items-center justify-between gap-2 text-[10px]" style={{ color: T.muted }}>
                <span>هدف نهایی</span>
                <span>امتیاز فعلی</span>
                <span>Baseline</span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-[15px] font-extrabold" style={{ color: T.successStrong }}>
                  {o.impact.target}
                </span>
                <span className="text-[19px] font-extrabold" style={{ color: T.ink }}>
                  {o.impact.current}
                </span>
                <span className="text-[15px] font-extrabold" style={{ color: T.muted }}>
                  {o.impact.baseline}
                </span>
              </div>

              <span className="mt-2 block h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${o.impact.pct}%`, backgroundColor: T.success }}
                />
              </span>

              <p className="mt-2.5 text-right text-[9.5px] leading-4" style={{ color: T.muted }}>
                {o.impact.note}
              </p>
              <button className="mt-1.5 text-[10px] font-bold" style={{ color: T.primary }}>
                {o.impact.cta}
              </button>
            </Panel>

            <Panel title={o.resourceTitle}>
              <div className="flex items-center gap-3">
                <Donut slices={o.resourceSlices} size={90} thickness={17} />
                <div className="flex-1 min-w-0">
                  <DonutLegend slices={o.resourceSlices} />
                </div>
              </div>

              <div className="mt-3 p-2.5" style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}>
                <span className="block text-right text-[9.5px]" style={{ color: T.muted }}>
                  {o.topResourceTitle}
                </span>
                <span className="block text-right text-[10.5px] font-bold" style={{ color: T.ink }}>
                  {o.topResource.label}
                </span>
                <span className="mt-1 flex items-center justify-end gap-2 text-[9px]" style={{ color: T.muted }}>
                  <span>رضایت {o.topResource.satisfaction}</span>
                  <span>تکمیل {o.topResource.done}</span>
                </span>
              </div>
            </Panel>

            <Panel title={o.quickTitle}>
              <QuickGrid rows={o.quick} cols={2} />
            </Panel>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Tab: افراد ───────────────────────────────────────────── */

function People() {
  const p = programPeople;

  return (
    <>
      <KpiRow kpis={p.kpis} cols={5} />

      <section
        className="bg-white p-4 flex items-center gap-4 flex-wrap"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <Ring pct={p.progressValue} colour={T.primary} size={58} stroke={6} />
        <span className="text-[12px] font-bold" style={{ color: T.ink }}>
          {p.progressLabel}
        </span>
        <span className="flex-1" />
        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          {p.filters.map((f) => (
            <span
              key={f.id}
              className="flex items-center gap-2 px-3 py-2 text-[11px]"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.muted }} />
              {f.value}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-right border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#fafafc' }}>
                {[p.cols.ops, p.cols.state, p.cols.improve, p.cols.last, p.cols.progress, p.cols.gaps].map((c) => (
                  <th key={c} className="px-4 py-3 text-[11px] font-bold whitespace-nowrap" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
                <th className="px-4 py-3 text-[11px] font-bold w-full" style={{ color: T.muted }}>
                  {p.cols.person}
                </th>
              </tr>
            </thead>
            <tbody>
              {p.rows.map((r) => (
                <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="px-4 py-3">
                    <Icon name="lucide:ellipsis" size={15} style={{ backgroundColor: T.muted }} />
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold whitespace-nowrap"
                      style={{ borderRadius: R.pill, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.state}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center justify-end gap-1.5 text-[10.5px]">
                      <span className="font-bold" style={{ color: T.successStrong }}>
                        {r.delta}
                      </span>
                      <span style={{ color: T.muted }}>
                        {r.from} ← {r.to}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[10.5px] whitespace-nowrap" style={{ color: T.muted }}>
                    {r.last}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className="text-[10.5px] font-bold shrink-0" style={{ color: T.ink }}>
                        {r.pct}٪
                      </span>
                      <span className="w-20 h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${r.pct}%`,
                            backgroundColor: r.pct >= 70 ? T.success : r.pct >= 45 ? T.warning : T.danger,
                          }}
                        />
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center justify-end gap-1.5 flex-wrap">
                      {r.gaps.map((g) => (
                        <span
                          key={g}
                          className="px-2 py-0.5 text-[9.5px] font-semibold whitespace-nowrap"
                          style={{ borderRadius: R.sm, backgroundColor: T.tintPurple, color: T.primary }}
                        >
                          {g}
                        </span>
                      ))}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center justify-end gap-2.5">
                      <span className="text-right">
                        <span className="block text-[11.5px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                          {r.name}
                        </span>
                        <span className="block text-[9.5px]" style={{ color: T.muted }}>
                          {r.role}
                        </span>
                      </span>
                      <img
                        src={`/images/aryaz/avatars/${r.avatar}.png`}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={p.mapTitle} cta={p.mapCta}>
          <div className="flex items-center gap-3">
            <Donut slices={programOverview.statusSlices} size={104} thickness={20} />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={programOverview.statusSlices} />
            </div>
          </div>
        </Panel>

        <Panel title={p.groupTitle} cta={p.groupCta}>
          <QuickGrid rows={p.group} cols={2} />
        </Panel>
      </div>
    </>
  );
}
