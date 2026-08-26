'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { LineTrend, BarGroup } from '@/components/org/panel/Charts';
import { ReportHead, FilterStrip, Panel } from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import {
  aiHead,
  aiFilters,
  aiSources,
  aiQuestion,
  aiAnswer,
  aiRecent,
  aiSaved,
  aiSuggestions,
  aiExports,
  aiNext,
  aiAccess,
  aiComposer,
} from '@/data/orgAiAnalysis';

/* ──────────────────────────────────────────────────────────────
   Smart analysis.

   A worked answer rather than a chat log: the question at the
   top, the evidence beneath it — deltas, a trend, a comparison —
   then what the data actually says separated from what is only a
   hypothesis. The distinction is the point, so the two lists sit
   side by side and the speculative one is labelled.
────────────────────────────────────────────────────────────── */

export default function AiAnalysisClient() {
  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={aiHead.crumbs}
        title={aiHead.title}
        desc={aiHead.desc}
        icon="lucide:sparkles"
        actions={
          <>
            <button
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:history" size={16} style={{ backgroundColor: T.muted }} />
              {aiHead.history}
            </button>

            <button
              data-ripple
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:plus" size={16} className="text-white" />
              {aiHead.newChat}
            </button>
          </>
        }
      />

      <FilterStrip filters={aiFilters} reset="تنظیم منابع" />

      <div className="flex items-center gap-2.5 flex-wrap justify-end">
        {aiSources.chips.map((c) => (
          <span
            key={c}
            className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold bg-white"
            style={{ borderRadius: R.pill, border: `1px solid ${T.border}`, color: T.ink }}
          >
            {c}
            <Icon name="lucide:users-round" size={13} style={{ backgroundColor: T.accent }} />
          </span>
        ))}
        <span className="text-[11.5px] font-bold" style={{ color: T.ink }}>
          {aiSources.label}
        </span>
      </div>

      {/* ── The conversation ──────────────────────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[260px_1fr_260px] items-start">
        {/* RTL: first column is rightmost — recent chats sit there. */}
        <div className="space-y-4 xl:order-1">
          <Panel title={aiRecent.title} cta={aiRecent.cta}>
            <ul className="space-y-2">
              {aiRecent.rows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-2.5 p-2.5"
                  style={{
                    borderRadius: R.md,
                    backgroundColor: r.on ? T.tintPurple : 'transparent',
                    border: `1px solid ${r.on ? '#d8d2fb' : T.border}`,
                  }}
                >
                  <Icon name="lucide:chevron-left" size={13} style={{ backgroundColor: T.muted }} />
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[10.5px] font-bold leading-4" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {r.date}
                    </span>
                  </span>
                  <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={aiSaved.title} cta={aiSaved.cta}>
            <ul className="space-y-2">
              {aiSaved.rows.map((r) => (
                <li
                  key={r.label}
                  className="p-2.5"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <span className="block text-right text-[10px] leading-4" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block text-right text-[9px] mt-0.5" style={{ color: T.muted }}>
                    {r.date}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* The answer */}
        <div className="space-y-4 min-w-0 xl:order-2">
          <div className="flex items-start gap-3 justify-end">
            <span
              className="px-4 py-3 text-right text-[12.5px] font-semibold max-w-[560px]"
              style={{ borderRadius: R.lg, backgroundColor: T.tintPurple, color: T.ink }}
            >
              {aiQuestion}
            </span>
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#f4f4f8' }}
            >
              <Icon name="lucide:user-round" size={17} style={{ backgroundColor: T.muted }} />
            </span>
          </div>

          <section
            className="bg-white p-5"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <header className="flex items-center gap-2.5 justify-end">
              <span className="text-right">
                <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
                  {aiAnswer.brand}
                </span>
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {aiAnswer.tagline}
                </span>
              </span>
              <Icon name="lucide:sparkles" size={19} style={{ backgroundColor: T.primary }} />
            </header>

            <p className="mt-3.5 text-right text-[13px] font-bold leading-7" style={{ color: T.ink }}>
              {aiAnswer.lead}
            </p>
            <p className="mt-1.5 text-right text-[12px] leading-7" style={{ color: T.muted }}>
              {aiAnswer.sub}
            </p>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                className="px-3 py-1.5 text-[10px] font-bold"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
              >
                {aiAnswer.metricsLabel}
              </button>
            </div>

            <div className="mt-2.5 grid gap-2.5 grid-cols-2 md:grid-cols-5">
              {aiAnswer.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 text-center"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <Icon name={m.icon} size={17} style={{ backgroundColor: m.fg, margin: '0 auto' }} />
                  <span className="block mt-1.5 text-[10px] font-bold" style={{ color: T.ink }}>
                    {m.label}
                  </span>
                  <span
                    className="mt-1 flex items-center justify-center gap-1 text-[12px] font-extrabold"
                    style={{ color: T.ink }}
                  >
                    {m.from}
                    <Icon name="lucide:arrow-left" size={11} style={{ backgroundColor: T.muted }} />
                    {m.to}
                  </span>
                  <span
                    className="flex items-center justify-center gap-0.5 text-[9.5px] font-bold"
                    style={{ color: T.danger }}
                  >
                    {m.delta}
                    <Icon name="lucide:trending-down" size={9} style={{ backgroundColor: T.danger }} />
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              <div className="p-3" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
                <h3 className="text-right text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                  {aiAnswer.trendTitle}
                </h3>
                <p className="text-right text-[9.5px] mb-1" style={{ color: T.muted }}>
                  {aiAnswer.trendSub}
                </p>
                <LineTrend
                  points={aiAnswer.trendPoints}
                  labels={aiAnswer.trendLabels}
                  min={52}
                  max={82}
                  height={150}
                />
              </div>

              <div className="p-3" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
                <h3 className="text-right text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                  {aiAnswer.barTitle}
                </h3>
                <p className="text-right text-[9.5px] mb-1" style={{ color: T.muted }}>
                  {aiAnswer.barSub}
                </p>
                <BarGroup
                  categories={aiAnswer.barCategories}
                  series={[{ name: 'امتیاز', colour: T.primaryStrong, values: aiAnswer.barValues }]}
                  height={150}
                  rtl
                />
              </div>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              <div className="p-3.5" style={{ borderRadius: R.md, backgroundColor: T.tintGreen }}>
                <h3 className="flex items-center justify-end gap-1.5 text-[11.5px] font-extrabold" style={{ color: T.successStrong }}>
                  {aiAnswer.findingsTitle}
                  <Icon name="lucide:circle-check" size={14} style={{ backgroundColor: T.successStrong }} />
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {aiAnswer.findings.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
                      <span className="flex-1 text-right">{f}</span>
                      <Icon name="lucide:check" size={11} style={{ backgroundColor: T.successStrong }} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5" style={{ borderRadius: R.md, backgroundColor: T.tintOrange }}>
                <h3 className="flex items-center justify-between text-[11.5px] font-extrabold" style={{ color: T.accent }}>
                  <span
                    className="px-2 py-0.5 text-[9px] font-bold bg-white"
                    style={{ borderRadius: R.sm, color: T.accent }}
                  >
                    {aiAnswer.hypothesesBadge}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {aiAnswer.hypothesesTitle}
                    <Icon name="lucide:lightbulb" size={14} style={{ backgroundColor: T.accent }} />
                  </span>
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {aiAnswer.hypotheses.map((h) => (
                    <li key={h} className="flex items-start gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
                      <span className="flex-1 text-right">{h}</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: T.accent }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-right text-[11.5px] font-extrabold mb-2" style={{ color: T.ink }}>
                {aiAnswer.moreTitle}
              </h3>
              <div className="flex items-center gap-2.5 flex-wrap justify-end">
                {aiAnswer.more.map((m) => (
                  <button
                    key={m.label}
                    className="flex items-center gap-2 px-3 py-2.5 text-[10px] font-semibold"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                  >
                    {m.label}
                    <Icon name={m.icon} size={13} style={{ backgroundColor: T.primary }} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Composer */}
          <label
            className="flex items-center gap-2.5 p-3 bg-white"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <button
              aria-label="ارسال"
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:send" size={16} className="text-white" />
            </button>

            <input
              placeholder={aiComposer.placeholder}
              className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: T.ink }}
            />

            <button
              className="flex items-center gap-1.5 px-3 py-2 text-[10.5px] font-semibold shrink-0"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.muted }} />
              {aiComposer.context}
            </button>

            <button
              aria-label="افزودن"
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
            >
              <Icon name="lucide:plus" size={16} style={{ backgroundColor: T.primary }} />
            </button>
          </label>
        </div>

        {/* Actions rail */}
        <div className="space-y-4 xl:order-3">
          <Panel title={aiSuggestions.title}>
            <ul className="space-y-2">
              {aiSuggestions.rows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-2.5 p-2.5"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <Icon name="lucide:chevron-left" size={13} style={{ backgroundColor: T.muted }} />
                  <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={aiExports.title}>
            <ul className="space-y-2">
              {aiExports.rows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-2.5 p-2.5"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <Icon name="lucide:chevron-left" size={13} style={{ backgroundColor: T.muted }} />
                  <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={aiNext.title}>
            <ul className="space-y-2">
              {aiNext.rows.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-2 p-2.5"
                  style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
                >
                  <Icon name="lucide:plus" size={12} style={{ backgroundColor: T.primary }} />
                  <span className="flex-1 text-right text-[10px] leading-4" style={{ color: T.ink }}>
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={aiAccess.title}>
            <p className="text-right text-[10.5px] font-bold" style={{ color: T.ink }}>
              {aiAccess.level}
            </p>
            <p className="mt-1 text-right text-[9.5px] leading-4" style={{ color: T.muted }}>
              {aiAccess.note}
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
