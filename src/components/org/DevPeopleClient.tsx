'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { KpiRow, AiBand, Panel, AskBand, ReportHead } from '@/components/org/panel/ReportShell';
import { Quadrant } from '@/components/org/program/ProgramShell';
import Ring from '@/components/org/panel/Ring';
import { T, R } from '@/data/panelTokens';
import {
  devPeopleHead,
  devPeopleKpis,
  devPeopleAi,
  devPeopleFilters,
  devPeopleCards,
  devPeopleMatrix,
  devPeopleAttention,
  devPeopleReady,
  devPeopleCoverage,
  devPeopleSuggest,
  devPeopleAsk,
} from '@/data/orgDevPeople';

/* ──────────────────────────────────────────────────────────────
   People in development.

   Person-first rather than programme-first: the same population
   the programme tabs describe, but sliced by individual, so a
   manager can find one name without knowing which programme it
   sits in.
────────────────────────────────────────────────────────────── */

export default function DevPeopleClient() {
  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={devPeopleHead.crumbs}
        title={devPeopleHead.title}
        desc={devPeopleHead.desc}
        icon="lucide:users-round"
        actions={
          <>
            <button
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1.5px solid ${T.primary}`, color: T.primary }}
            >
              <Icon name="lucide:sparkles" size={16} style={{ backgroundColor: T.primary }} />
              {devPeopleHead.suggest}
            </button>

            <button
              data-ripple
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:user-round-plus" size={16} className="text-white" />
              {devPeopleHead.add}
            </button>
          </>
        }
      />

      <KpiRow kpis={devPeopleKpis} cols={5} />

      <AiBand
        title={devPeopleAi.title}
        body={devPeopleAi.body}
        chips={devPeopleAi.chips}
        cta={devPeopleAi.cta}
      />

      {/* ── Search + filters ──────────────────────────────────── */}
      <div
        className="bg-white p-3 flex items-center gap-2.5 flex-wrap"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <label
          className="flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[200px]"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:search" size={15} style={{ backgroundColor: T.muted }} />
          <input
            type="search"
            placeholder={devPeopleHead.search}
            className="flex-1 min-w-0 bg-transparent text-[12px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </label>

        {devPeopleFilters.map((f) => (
          <span key={f.id} className="min-w-[130px]">
            <span className="block text-[9.5px] text-right" style={{ color: T.muted }}>
              {f.label}
            </span>
            <span
              className="flex items-center gap-2 px-3 py-2 mt-1"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.muted }} />
              <span className="flex-1 text-right text-[11px]" style={{ color: T.ink }}>
                {f.value}
              </span>
            </span>
          </span>
        ))}
      </div>

      {/* ── Person cards + matrix ─────────────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_360px] items-start">
        <div className="grid gap-4 md:grid-cols-2 min-w-0">
          {devPeopleCards.map((c) => (
            <article
              key={c.id}
              className="bg-white p-4"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <header className="flex items-start gap-3">
                <span
                  className="px-2.5 py-1 text-[10px] font-bold shrink-0"
                  style={{ borderRadius: R.pill, backgroundColor: c.stateBg, color: c.stateFg }}
                >
                  {c.state}
                </span>
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[13px] font-extrabold truncate" style={{ color: T.ink }}>
                    {c.name}
                  </span>
                  <span className="block text-[10px]" style={{ color: T.muted }}>
                    {c.role}
                  </span>
                </span>
                <img
                  src={`/images/aryaz/avatars/${c.avatar}.png`}
                  alt=""
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                />
              </header>

              <div className="mt-3 flex items-center gap-2.5">
                <span className="text-[11px] font-bold shrink-0" style={{ color: T.ink }}>
                  {c.pct}٪
                </span>
                <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${c.pct}%`,
                      backgroundColor: c.pct >= 70 ? T.success : c.pct >= 40 ? T.warning : T.danger,
                    }}
                  />
                </span>
                <span className="text-[9.5px] shrink-0" style={{ color: T.muted }}>
                  پیشرفت برنامه
                </span>
              </div>

              <div className="mt-3">
                <span className="block text-right text-[9.5px] mb-1.5" style={{ color: T.muted }}>
                  Gapهای اصلی
                </span>
                <span className="flex items-center gap-1.5 flex-wrap justify-end">
                  {c.gaps.map((g) => (
                    <span
                      key={g}
                      className="px-2.5 py-1 text-[10px] font-semibold"
                      style={{ borderRadius: R.pill, backgroundColor: T.tintPurple, color: T.primary }}
                    >
                      {g}
                    </span>
                  ))}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 text-[10.5px]">
                <span className="font-bold" style={{ color: T.successStrong }}>
                  {c.delta}
                </span>
                <span style={{ color: T.muted }}>
                  {c.from} ← {c.to}
                </span>
                <span style={{ color: T.muted }}>تغییر</span>
              </div>

              <button
                className="mt-3 w-full py-2.5 text-[11.5px] font-bold"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
              >
                {c.cta}
              </button>
            </article>
          ))}
        </div>

        <div className="space-y-4">
          <Panel title={devPeopleMatrix.title} cta={devPeopleMatrix.cta}>
            <Quadrant
              points={devPeopleMatrix.points}
              labels={devPeopleMatrix.quadrants}
              axes={devPeopleMatrix.axes}
              height={200}
            />

            <ul className="mt-3 flex items-center justify-center gap-2.5 flex-wrap">
              {devPeopleMatrix.legend.map((l) => (
                <li key={l.label} className="flex items-center gap-1.5 text-[9px]" style={{ color: T.ink }}>
                  {l.label}
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.colour }} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={devPeopleAttention.title} cta={devPeopleAttention.cta}>
            <ul className="space-y-2.5">
              {devPeopleAttention.rows.map((r) => (
                <li
                  key={r.name}
                  className="flex items-start gap-2.5 p-2.5"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <button
                    className="px-2.5 py-1 text-[9.5px] font-bold shrink-0"
                    style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                  >
                    {devPeopleAttention.action}
                  </button>
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[10.5px] font-bold truncate" style={{ color: T.ink }}>
                      {r.name}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {r.role}
                    </span>
                    <span className="mt-1 flex items-center gap-1 flex-wrap justify-end">
                      {r.notes.map((n) => (
                        <span
                          key={n}
                          className="px-1.5 py-0.5 text-[8.5px]"
                          style={{ borderRadius: R.sm, backgroundColor: T.tintRed, color: T.danger }}
                        >
                          {n}
                        </span>
                      ))}
                    </span>
                  </span>
                  <img
                    src={`/images/aryaz/avatars/${r.avatar}.png`}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      {/* ── Ready / coverage / suggestions ────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={devPeopleReady.title} cta={devPeopleReady.cta}>
          <ul className="space-y-2.5">
            {devPeopleReady.rows.map((r) => (
              <li key={r.name} className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold shrink-0" style={{ color: r.fg }}>
                  {r.note}
                </span>
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[11px] font-bold truncate" style={{ color: T.ink }}>
                    {r.name}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }}>
                    {r.role}
                  </span>
                </span>
                <img
                  src={`/images/aryaz/avatars/${r.avatar}.png`}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={devPeopleCoverage.title} cta={devPeopleCoverage.cta}>
          <ul className="space-y-2.5">
            {devPeopleCoverage.rows.map((r) => (
              <li key={r.unit}>
                <div className="flex items-center justify-between text-[10.5px]">
                  <span style={{ color: T.muted }}>{r.without}</span>
                  <span className="font-bold" style={{ color: T.ink }}>
                    {r.unit}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold shrink-0" style={{ color: r.colour }}>
                    {r.pct}٪
                  </span>
                  <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${r.pct}%`, backgroundColor: r.colour }}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={devPeopleSuggest.title} cta={devPeopleSuggest.cta}>
          <ul className="space-y-2.5">
            {devPeopleSuggest.rows.map((r) => (
              <li key={r.label} className="p-3" style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}>
                <span className="flex items-start gap-2">
                  <span className="flex-1 text-right text-[10.5px] font-bold leading-4" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
                </span>
                <p className="mt-1 text-right text-[9px] leading-4" style={{ color: T.muted }}>
                  {r.note}
                </p>
                <button
                  className="mt-2 w-full py-1.5 text-[10px] font-bold bg-white"
                  style={{ borderRadius: R.sm, color: r.fg }}
                >
                  {r.action}
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <AskBand
        title={devPeopleAsk.title}
        placeholder={devPeopleAsk.placeholder}
        chips={devPeopleAsk.chips}
      />
    </div>
  );
}
