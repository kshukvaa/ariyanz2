'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Radar, LineTrend, BarList } from '@/components/org/panel/Charts';
import Ring from '@/components/org/panel/Ring';
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
  personHead,
  personProfile,
  personKpis,
  personAi,
  personCompare,
  personTrend,
  personRadar,
  personTests,
  personChanges,
  personHistory,
  personReadiness,
  personPlan,
  personSuggestions,
  personNote,
  personAsk,
} from '@/data/orgPersonReport';

/* ──────────────────────────────────────────────────────────────
   Individual report.

   Built for the conversation a manager has before a promotion:
   standing first, then what carries the person, then what is
   holding them back, and only then what to do — so the plan at
   the bottom reads as a conclusion rather than a suggestion out
   of nowhere.
────────────────────────────────────────────────────────────── */

export default function PersonReportClient() {
  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={personHead.crumbs}
        title={personHead.title}
        desc={personHead.desc}
        actions={<ExportPair />}
      />

      {/* ── Profile + KPIs ────────────────────────────────────── */}
      <section
        className="bg-white p-5 flex items-start gap-5 flex-wrap"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        {/* The person leads on the right, scores trail on the left. */}
        <div className="order-2 flex-1 grid gap-3.5 grid-cols-2 xl:grid-cols-5 min-w-[280px]">
          {personKpis.map((k) => (
            <div key={k.id} className="text-center">
              <span className="block text-[20px] font-extrabold" style={{ color: T.ink }}>
                {k.value}
              </span>
              <span className="block text-[11px]" style={{ color: T.muted }}>
                {k.label}
              </span>
              <span
                className="mt-0.5 flex items-center justify-center gap-1 text-[10.5px] font-bold"
                style={{ color: T.successStrong }}
              >
                {k.sub}
                <Icon name="lucide:arrow-up" size={10} style={{ backgroundColor: T.successStrong }} />
              </span>
            </div>
          ))}
        </div>

        <div className="order-1 flex items-start gap-3.5 shrink-0">
          <div className="text-right">
            <h2 className="text-[18px] font-extrabold" style={{ color: T.ink }}>
              {personProfile.name}
            </h2>
            <p className="text-[12px]" style={{ color: T.muted }}>
              {personProfile.role}
            </p>

            <dl className="mt-2 space-y-0.5">
              {personProfile.facts.map((f) => (
                <div key={f.k} className="flex items-center justify-end gap-1.5 text-[10.5px]">
                  <dd className="font-bold" style={{ color: T.ink }}>
                    {f.v}
                  </dd>
                  <dt style={{ color: T.muted }}>{f.k}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-2 flex items-center justify-end gap-2">
              {personProfile.chips.map((c) => (
                <span
                  key={c.label}
                  className="px-2.5 py-1 text-[10.5px] font-bold"
                  style={{ borderRadius: R.pill, backgroundColor: c.bg, color: c.fg }}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>

          <img
            src={personProfile.avatar}
            alt=""
            className="w-[76px] h-[76px] rounded-full object-cover shrink-0"
          />
        </div>
      </section>

      <AiBand
        title={personAi.title}
        body={personAi.body}
        chips={personAi.chips}
        cta={personAi.cta}
      />

      {/* ── Comparison + trend ────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={personCompare.title}>
          <BarList rows={personCompare.rows} max={100} />

          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            {personCompare.ranks.map((r) => (
              <span
                key={r.label}
                className="flex items-center gap-2.5 p-3"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <span className="flex-1 text-right">
                  <span className="block text-[10px]" style={{ color: T.muted }}>
                    {r.label}
                  </span>
                  <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {r.value}
                  </span>
                </span>
                <Icon name={r.icon} size={17} style={{ backgroundColor: T.primary }} />
              </span>
            ))}
          </div>
        </Panel>

        <Panel title={personTrend.title}>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <LineTrend
                points={personTrend.points}
                labels={personTrend.labels}
                min={62}
                max={96}
                height={160}
              />
            </div>

            <div
              className="w-[132px] shrink-0 p-3 text-center"
              style={{ borderRadius: R.md, backgroundColor: T.tintGreen }}
            >
              <span className="block text-[11px] font-bold" style={{ color: T.ink }}>
                {personTrend.summaryTitle}
              </span>
              <Icon
                name="lucide:trending-up"
                size={22}
                style={{ backgroundColor: T.successStrong, margin: '8px auto' }}
              />
              <span className="block text-[19px] font-extrabold" style={{ color: T.successStrong }}>
                {personTrend.delta}
              </span>
              <span className="block text-[10px]" style={{ color: T.muted }}>
                {personTrend.deltaNote}
              </span>
              <span
                className="mt-2 block py-1.5 text-[10px] font-bold bg-white"
                style={{ borderRadius: R.sm, color: T.successStrong }}
              >
                {personTrend.badge}
              </span>
            </div>
          </div>
        </Panel>
      </div>

      {/* ── Competency profile + tests ────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={personRadar.title}>
          <ul className="flex items-center justify-end gap-4 mb-2">
            {personRadar.legend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[10px]" style={{ color: T.ink }}>
                {l.label}
                <span
                  className="w-4 h-0"
                  style={{ borderTop: `${l.dashed ? '2px dashed' : '3px solid'} ${l.colour}` }}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <Radar
                axes={personRadar.axes}
                series={[
                  { name: 'سارا کریمی', colour: T.primary, values: personRadar.self },
                  { name: 'میانگین همتایان', colour: T.muted, values: personRadar.average, dashed: true },
                ]}
                size={240}
                showValues={false}
              />
            </div>

            <div className="w-[160px] space-y-2.5 shrink-0">
              <RankBox
                title={personRadar.strengthsTitle}
                rows={personRadar.strengths}
                fg={T.successStrong}
                bg={T.tintGreen}
              />
              <RankBox
                title={personRadar.gapsTitle}
                rows={personRadar.gaps}
                fg={T.accent}
                bg={T.tintOrange}
              />
            </div>
          </div>
        </Panel>

        <Panel title={personTests.title}>
          <div className="grid grid-cols-2 gap-3">
            {personTests.cards.map((c) => (
              <div
                key={c.id}
                className="p-3.5 text-center"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <img src={c.icon} alt="" className="w-10 h-10 object-contain mx-auto" />
                <span className="block mt-1.5 text-[11.5px] font-bold" style={{ color: T.muted }}>
                  {c.label}
                </span>
                <span className="block mt-0.5 text-[17px] font-extrabold" style={{ color: T.ink }}>
                  {c.value}
                </span>
                {c.note && (
                  <span
                    className="flex items-center justify-center gap-1 text-[10px] font-bold"
                    style={{ color: c.up ? T.successStrong : T.muted }}
                  >
                    {c.note}
                    {c.up && (
                      <Icon name="lucide:arrow-up" size={10} style={{ backgroundColor: T.successStrong }} />
                    )}
                  </span>
                )}
                <span className="block mt-1 text-[9px]" style={{ color: T.muted }}>
                  {c.date}
                </span>
                <button
                  className="mt-2 w-full py-1.5 text-[10.5px] font-bold"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                >
                  {personTests.cta}
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Changes + history ─────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={personChanges.title}>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {personChanges.groups.map((g) => (
              <div key={g.id} className="p-3" style={{ borderRadius: R.md, backgroundColor: g.bg }}>
                <h3 className="text-center text-[10.5px] font-extrabold" style={{ color: g.fg }}>
                  {g.label}
                </h3>
                <ul className="mt-2 space-y-1.5">
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

        <Panel title={personHistory.title}>
          <ol className="space-y-0">
            {personHistory.rows.map((r, i) => (
              <li key={r.period} className="flex items-start gap-3">
                {/* The rail: a dot per entry, joined by a line except at the end. */}
                <span className="flex flex-col items-center shrink-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full mt-2.5"
                    style={{ backgroundColor: r.on ? T.primary : '#d5d7e3' }}
                  />
                  {i < personHistory.rows.length - 1 && (
                    <span className="w-px flex-1 min-h-[34px]" style={{ backgroundColor: T.border }} />
                  )}
                </span>

                <span className="flex-1 pb-3 flex items-center gap-3 flex-wrap">
                  <button
                    className="px-3 py-1.5 text-[10px] font-bold shrink-0"
                    style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                  >
                    {personHistory.cta}
                  </button>

                  <span className="flex-1 text-right min-w-[140px]">
                    <span className="block text-[11.5px] font-bold" style={{ color: T.ink }}>
                      {r.name}
                    </span>
                    <span className="block text-[10px]" style={{ color: T.muted }}>
                      {r.score}
                    </span>
                  </span>

                  <span
                    className="text-[10.5px] font-bold shrink-0"
                    style={{ color: r.on ? T.primary : T.muted }}
                  >
                    {r.period}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      {/* ── Readiness + plan ──────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={personReadiness.title}>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-center shrink-0">
              <Ring pct={personReadiness.pct} colour={T.primary} size={92} stroke={9} />
              <span className="block mt-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
                {personReadiness.level}
              </span>
            </div>

            <div className="flex-1 min-w-[180px]">
              <p className="text-right text-[11.5px] font-bold mb-2" style={{ color: T.ink }}>
                {personReadiness.role}
              </p>
              <ul className="space-y-2">
                {personReadiness.bars.map((b) => (
                  <li key={b.label} className="flex items-center gap-2.5">
                    <span className="w-9 text-[10px] font-bold shrink-0" style={{ color: T.ink }}>
                      {b.pct}
                    </span>
                    <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                      <span
                        className="block h-full rounded-full"
                        style={{ width: `${b.value}%`, backgroundColor: T.success }}
                      />
                    </span>
                    <span className="w-24 text-right text-[10.5px] shrink-0" style={{ color: T.muted }}>
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-3.5 p-3" style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}>
            <h3 className="text-right text-[11px] font-extrabold" style={{ color: T.ink }}>
              {personReadiness.gapsTitle}
            </h3>
            <ul className="mt-1.5 space-y-1">
              {personReadiness.gaps.map((g) => (
                <li key={g.label} className="flex items-center justify-end gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
                  {g.label}
                  <span style={{ color: T.muted }}>{g.n}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title={personPlan.title}>
          <ul className="space-y-2.5">
            {personPlan.rows.map((r) => (
              <li
                key={r.n}
                className="flex items-center gap-3 p-3"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <span className="flex-1 text-right">
                  <span className="block text-[11.5px] font-bold" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block text-[10px]" style={{ color: T.muted }}>
                    {r.meta}
                  </span>
                </span>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0"
                  style={{ backgroundColor: T.tintPurple, color: T.primary }}
                >
                  {r.n}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={personPlan.cta.href}
            className="mt-3 flex items-center gap-3 p-3.5"
            style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
          >
            <Icon name="lucide:arrow-left" size={16} style={{ backgroundColor: T.primary }} />
            <span className="flex-1 text-right">
              <span className="block text-[12px] font-extrabold" style={{ color: T.primary }}>
                {personPlan.cta.title}
              </span>
              <span className="block text-[10px]" style={{ color: T.muted }}>
                {personPlan.cta.sub}
              </span>
            </span>
            <Icon name="lucide:rocket" size={18} style={{ backgroundColor: T.primary }} />
          </Link>
        </Panel>
      </div>

      {/* ── Suggestions + note ────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Panel title={personSuggestions.title}>
          <div className="grid gap-3 grid-cols-2 xl:grid-cols-4">
            {personSuggestions.cards.map((c) => (
              <div
                key={c.id}
                className="p-3.5 text-center"
                style={{ borderRadius: R.md, backgroundColor: c.bg }}
              >
                <Icon name={c.icon} size={20} style={{ backgroundColor: c.fg, margin: '0 auto' }} />
                <span className="block mt-1.5 text-[9.5px]" style={{ color: c.fg }}>
                  {c.kind}
                </span>
                <span className="block text-[11.5px] font-extrabold leading-4" style={{ color: T.ink }}>
                  {c.label}
                </span>
                {c.sub && (
                  <span className="block mt-0.5 text-[9px]" style={{ color: T.muted }}>
                    {c.sub}
                  </span>
                )}
                <button
                  className="mt-2 w-full py-1.5 text-[10px] font-bold bg-white"
                  style={{ borderRadius: R.sm, color: c.fg }}
                >
                  {c.cta}
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={personNote.title}>
          <p
            className="p-3.5 text-right text-[11.5px] leading-6"
            style={{ borderRadius: R.md, backgroundColor: '#fafafc', color: T.ink }}
          >
            {personNote.body}
          </p>
          <p className="mt-2 text-left text-[10px]" style={{ color: T.muted }}>
            {personNote.author}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {personNote.actions.map((a) => (
              <button
                key={a.label}
                className="flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-bold"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                <Icon name={a.icon} size={13} style={{ backgroundColor: T.primary }} />
                {a.label}
              </button>
            ))}
          </div>
        </Panel>
      </div>

      <AskBand
        title={personAsk.title}
        placeholder={personAsk.placeholder}
        chips={personAsk.chips}
      />
    </div>
  );
}

function RankBox({
  title,
  rows,
  fg,
  bg,
}: {
  title: string;
  rows: { n: string; label: string; value: string }[];
  fg: string;
  bg: string;
}) {
  return (
    <div className="p-3" style={{ borderRadius: R.md, backgroundColor: bg }}>
      <h3 className="text-right text-[10.5px] font-extrabold" style={{ color: fg }}>
        {title}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-1.5 text-[10.5px]">
            <span className="font-extrabold" style={{ color: T.ink }}>
              {r.value}
            </span>
            <span className="flex-1 text-right" style={{ color: T.ink }}>
              {r.label}
            </span>
            <span style={{ color: T.muted }}>{r.n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
