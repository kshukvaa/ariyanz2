'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { Donut, DonutLegend } from '@/components/org/panel/Charts';
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
  talentHead,
  talentFilters,
  talentKpis,
  talentAi,
  talentMatrix,
  talentMatrixMeta,
  talentByUnit,
  talentSuccession,
  talentShift,
  talentDistribution,
  talentKeyRoles,
  talentSuggestions,
  talentActions,
  talentRisk,
  talentAsk,
} from '@/data/orgTalent';

/* ──────────────────────────────────────────────────────────────
   Talent matrix.

   The nine-box is the page — everything else explains or acts on
   it. Performance runs along the bottom and potential up the
   side, which puts the strategic corner at top-left in an RTL
   grid, where the eye lands last and lingers.
────────────────────────────────────────────────────────────── */

export default function TalentMatrixClient() {
  const [tab, setTab] = useState(talentHead.tabs[0]);

  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={talentHead.crumbs}
        title={talentHead.title}
        desc={talentHead.desc}
        icon="lucide:layout-grid"
        actions={<ExportPair extra={{ label: talentHead.model, icon: 'lucide:settings' }} />}
      />

      {/* Scope tabs */}
      <div
        className="bg-white px-2 inline-flex"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        {talentHead.tabs.map((t) => {
          const on = t === tab;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={on}
              className="relative px-6 py-3 text-[12.5px] transition-colors"
              style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
            >
              {t}
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

      <FilterStrip filters={talentFilters} />

      <KpiRow kpis={talentKpis} cols={5} />

      <AiBand
        title={talentAi.title}
        body={talentAi.body}
        chips={talentAi.chips}
        cta={talentAi.cta}
      />

      {/* ── Matrix + side panels ──────────────────────────────── */}
      {/* Screen 21 gives the matrix the left-hand track and stacks the
          two summaries on the right. RTL fills the first track first,
          so the 360px column is declared as order-1. */}
      <div className="grid gap-4 xl:grid-cols-[360px_1fr] items-start">
        <Panel title={talentMatrixMeta.title} className="xl:order-2">
          <div className="flex gap-3">
            {/* Potential axis — RTL puts it on the right, declared first. */}
            <div className="flex flex-col justify-between shrink-0 py-1">
              <span
                className="text-[10px] font-bold mb-1"
                style={{ color: T.primary }}
              >
                {talentMatrixMeta.yAxis}
              </span>
              {talentMatrixMeta.yLabels.map((l) => (
                <span
                  key={l}
                  className="flex-1 flex items-center text-[10.5px]"
                  style={{ color: T.muted }}
                >
                  {l}
                </span>
              ))}
            </div>

            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-3 gap-2.5">
                {talentMatrix.map((c) => (
                  <div
                    key={c.label}
                    className="p-3 text-center flex flex-col justify-center min-h-[94px]"
                    style={{ borderRadius: R.md, backgroundColor: c.bg }}
                  >
                    <span className="block text-[11px] font-extrabold leading-4" style={{ color: c.fg }}>
                      {c.label}
                    </span>
                    <span className="block mt-1.5 text-[12px] font-extrabold" style={{ color: T.ink }}>
                      {c.count} <span style={{ color: T.muted, fontWeight: 600 }}>| {c.pct}</span>
                    </span>
                    <span className="block mt-0.5 text-[10px]" style={{ color: T.muted }}>
                      {c.avg}
                    </span>
                  </div>
                ))}
              </div>

              {/* Performance axis */}
              <div className="mt-2 grid grid-cols-3 gap-2.5">
                {talentMatrixMeta.xLabels.map((l) => (
                  <span key={l} className="text-center text-[10.5px]" style={{ color: T.muted }}>
                    {l}
                  </span>
                ))}
              </div>

              <div className="mt-1.5 flex items-center justify-between">
                <span
                  className="px-2.5 py-1 text-[10px]"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.muted }}
                >
                  {talentMatrixMeta.note}
                </span>
                <span className="text-[10.5px] font-bold" style={{ color: T.primary }}>
                  {talentMatrixMeta.xAxis} ←
                </span>
              </div>
            </div>
          </div>
        </Panel>

        <div className="space-y-4 xl:order-1">
          <Panel title={talentByUnit.title}>
            <ul className="flex items-center justify-end gap-2.5 flex-wrap mb-3">
              {talentByUnit.legend.map((l) => (
                <li key={l.label} className="flex items-center gap-1.5 text-[9.5px]" style={{ color: T.ink }}>
                  {l.label}
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.colour }} />
                </li>
              ))}
            </ul>

            <ul className="space-y-2.5">
              {talentByUnit.rows.map((r) => {
                const total = r.parts.reduce((a, b) => a + b, 0);
                return (
                  <li key={r.unit} className="flex items-center gap-2.5">
                    <span className="w-6 text-[10.5px] font-bold shrink-0" style={{ color: T.ink }}>
                      {r.total}
                    </span>
                    <span className="flex-1 flex h-4 overflow-hidden" style={{ borderRadius: R.sm }}>
                      {r.parts.map((p, i) => (
                        <span
                          key={i}
                          className="flex items-center justify-center text-[8px] font-bold text-white"
                          style={{
                            width: `${(p / total) * 100}%`,
                            backgroundColor: talentByUnit.legend[i].colour,
                          }}
                        >
                          {p > 4 ? p : ''}
                        </span>
                      ))}
                    </span>
                    <span className="w-16 text-right text-[10.5px] shrink-0" style={{ color: T.ink }}>
                      {r.unit}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title={talentSuccession.title}>
            <ul className="space-y-2.5">
              {talentSuccession.rows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-3 p-3"
                  style={{ borderRadius: R.md, backgroundColor: r.bg }}
                >
                  <span className="text-right shrink-0">
                    <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
                      {r.value}
                    </span>
                    <span className="block text-[10px] font-bold" style={{ color: r.fg }}>
                      {r.pct}
                    </span>
                  </span>
                  <span className="flex-1 text-right text-[11px] font-semibold" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      {/* ── Shift / distribution / key roles ──────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={talentShift.title} cta={talentShift.cta}>
          <div className="flex items-center gap-3">
            {[talentShift.after, talentShift.before].map((g, gi) => (
              <React.Fragment key={g.label}>
                <div className="flex-1">
                  <span className="block text-center text-[10.5px] font-bold mb-1.5" style={{ color: T.muted }}>
                    {g.label}
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {g.cells.map((c, i) => (
                      <span
                        key={i}
                        className="h-9 flex items-center justify-center text-[11px] font-bold"
                        style={{
                          borderRadius: R.sm,
                          backgroundColor: talentMatrix[i].bg,
                          color: T.ink,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {gi === 0 && (
                  <Icon name="lucide:arrow-left" size={16} style={{ backgroundColor: T.muted }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </Panel>

        <Panel title={talentDistribution.title}>
          <div className="flex items-center gap-4">
            <Donut
              slices={talentDistribution.slices}
              size={116}
              thickness={22}
              centre={talentDistribution.centre}
              centreSub={talentDistribution.centreSub}
            />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={talentDistribution.slices} />
            </div>
          </div>
        </Panel>

        <Panel title={talentKeyRoles.title} cta={talentKeyRoles.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentKeyRoles.cols.ready}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentKeyRoles.cols.next}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentKeyRoles.cols.now}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentKeyRoles.cols.role}
                </th>
              </tr>
            </thead>
            <tbody>
              {talentKeyRoles.rows.map((r) => (
                <tr key={r.role} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2">
                    <span
                      className="px-2 py-0.5 text-[9.5px] font-bold"
                      style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.ready}
                    </span>
                  </td>
                  <td className="py-2">
                    <Person name={r.next} avatar={r.nextAvatar} />
                  </td>
                  <td className="py-2">
                    <Person name={r.now} avatar={r.nowAvatar} />
                  </td>
                  <td className="py-2 text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {r.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      {/* ── Suggestions / actions / risk ──────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={talentSuggestions.title}>
          <ul className="space-y-2.5">
            {talentSuggestions.cards.map((c) => (
              <li
                key={c.id}
                className="p-3 text-center"
                style={{ borderRadius: R.md, backgroundColor: c.bg }}
              >
                <span className="block text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                  {c.label}
                </span>
                <span className="block text-[9.5px]" style={{ color: c.fg }}>
                  {c.sub}
                </span>
                <span className="block mt-1.5 text-[16px] font-extrabold" style={{ color: T.ink }}>
                  {c.value}
                </span>
                <button
                  className="mt-2 w-full py-2 text-[10.5px] font-bold bg-white"
                  style={{ borderRadius: R.sm, color: c.fg }}
                >
                  {c.action}
                </button>
              </li>
            ))}
          </ul>

          <button
            data-ripple
            className="mt-3 w-full py-2.5 text-[12px] font-bold text-white"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            {talentSuggestions.cta}
          </button>
        </Panel>

        <Panel title={talentActions.title} cta={talentActions.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentActions.cols.state}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentActions.cols.date}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentActions.cols.owner}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentActions.cols.action}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentActions.cols.person}
                </th>
              </tr>
            </thead>
            <tbody>
              {talentActions.rows.map((r) => (
                <tr key={r.person} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2">
                    <span
                      className="px-2 py-0.5 text-[9.5px] font-bold whitespace-nowrap"
                      style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.state}
                    </span>
                  </td>
                  <td className="py-2 text-[9.5px] whitespace-nowrap" style={{ color: T.muted }}>
                    {r.date}
                  </td>
                  <td className="py-2 text-[10px]" style={{ color: T.ink }}>
                    {r.owner}
                  </td>
                  <td className="py-2 text-[10px]" style={{ color: T.ink }}>
                    {r.action}
                  </td>
                  <td className="py-2 text-[10.5px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                    {r.person}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={talentRisk.title} cta={talentRisk.cta}>
          <p className="text-right text-[10px] mb-2" style={{ color: T.muted }}>
            {talentRisk.note}
          </p>

          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentRisk.cols.level}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentRisk.cols.role}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {talentRisk.cols.unit}
                </th>
              </tr>
            </thead>
            <tbody>
              {talentRisk.rows.map((r) => (
                <tr key={r.role} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5">
                    <span
                      className="px-2.5 py-1 text-[9.5px] font-bold"
                      style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                    >
                      {r.level}
                    </span>
                  </td>
                  <td className="py-2.5 text-[10.5px]" style={{ color: T.ink }}>
                    {r.role}
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

      <AskBand
        title={talentAsk.title}
        placeholder={talentAsk.placeholder}
        chips={talentAsk.chips}
      />
    </div>
  );
}

function Person({ name, avatar }: { name: string; avatar: string }) {
  return (
    <span className="flex items-center justify-end gap-1.5">
      <span className="text-[10px] whitespace-nowrap" style={{ color: T.ink }}>
        {name}
      </span>
      <img
        src={`/images/aryaz/avatars/${avatar}.png`}
        alt=""
        className="w-6 h-6 rounded-full object-cover shrink-0"
      />
    </span>
  );
}
