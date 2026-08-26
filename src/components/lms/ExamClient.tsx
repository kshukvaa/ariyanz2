'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { L, LR, fa } from '@/data/lmsTokens';
import ClassroomCrumbs from './ClassroomCrumbs';
import {
  examCrumbs,
  examHead,
  examStatus,
  examProgress,
  examLegend,
  examQuestion,
  examBrief,
  examInfo,
  examHelp,
  examSuggest,
} from '@/data/lms/exam';

/* ──────────────────────────────────────────────────────────────
   آزمون فصل.

   Three columns. RTL declares right first, so: exam status and
   the question map on the right, the question itself in the
   middle, the rules and settings on the left — which is how the
   mockup lays it out.
────────────────────────────────────────────────────────────── */

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
    >
      {children}
    </section>
  );
}

export default function ExamClient() {
  const [picked, setPicked] = useState(
    examQuestion.options.findIndex((o) => o.selected),
  );

  return (
    <div style={{ backgroundColor: L.page }}>
      <ClassroomCrumbs crumbs={examCrumbs.items} back={examCrumbs.back} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5 space-y-4">
        {/* ── Exam header ────────────────────────────────────── */}
        <div className="grid gap-4 xl:grid-cols-[300px_1fr] items-start">
          {/* Status rail declared first → right. */}
          <Card>
            <h2 className="text-center text-[13px] font-extrabold" style={{ color: L.navy }}>
              {examStatus.title}
            </h2>

            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-[26px] font-extrabold" style={{ color: L.orange }}>
                {examStatus.remaining}
              </span>
              <span
                className="w-11 h-11 flex items-center justify-center shrink-0"
                style={{ borderRadius: '999px', backgroundColor: L.orangeSoft }}
              >
                <Icon name="lucide:clock" size={20} style={{ backgroundColor: L.orange }} />
              </span>
            </div>
            <p className="mt-1 text-center text-[10.5px]" style={{ color: L.muted }}>
              {examStatus.remainingLabel}
            </p>

            <span className="mt-4 block h-2 rounded-full" style={{ backgroundColor: L.border }}>
              <span
                className="block h-2 rounded-full"
                style={{ width: `${examStatus.barPct}%`, backgroundColor: L.navy }}
              />
            </span>
          </Card>

          <Card>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="flex-1 min-w-[220px] text-right text-[17px] font-extrabold" style={{ color: L.navy }}>
                {examHead.title}
              </h1>
              <span
                className="w-14 h-14 flex items-center justify-center shrink-0"
                style={{ borderRadius: '999px', backgroundColor: L.blueSoft }}
              >
                <Icon name={examHead.icon} size={24} style={{ backgroundColor: L.blue }} />
              </span>
            </div>

            <ul className="mt-4 flex items-start justify-end gap-6 flex-wrap">
              {examHead.meta.map((m, i) => (
                <li key={`${m.label}-${i}`} className="text-right">
                  <span className="flex items-center justify-end gap-1.5 text-[10px]" style={{ color: L.muted }}>
                    {m.label}
                    <Icon name={m.icon} size={12} style={{ backgroundColor: L.muted }} />
                  </span>
                  <span className="mt-1 block text-[11px] font-bold" style={{ color: L.navy }}>
                    {m.value}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* ── Body: map | question | rules ───────────────────── */}
        <div className="grid gap-4 xl:grid-cols-[240px_1fr_280px] items-start">
          {/* Question map (right). */}
          <Card>
            <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
              {examLegend.title}
            </h2>

            <ul className="mt-3.5 space-y-2.5">
              {examLegend.items.map((it) => (
                <li key={it.label} className="flex items-center gap-2">
                  <span className="flex-1 text-right text-[10.5px]" style={{ color: L.muted }}>
                    {it.count} {it.label}
                  </span>
                  {it.kind === 'flag' ? (
                    <Icon name="lucide:flag" size={12} style={{ backgroundColor: it.fg }} />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: it.fg }} />
                  )}
                </li>
              ))}
            </ul>

            <ul className="mt-4 grid grid-cols-5 gap-2">
              {Array.from({ length: examLegend.total }, (_, i) => i + 1).map((n) => {
                const answered = examLegend.answered.includes(n);
                const current = examLegend.current === n;
                const flagged = examLegend.flagged.includes(n);
                return (
                  <li key={n} className="relative">
                    <button
                      className="w-full aspect-square flex items-center justify-center text-[11px] font-bold"
                      style={{
                        borderRadius: '999px',
                        backgroundColor: current ? L.blue : answered ? L.greenSoft : '#f2f3f8',
                        color: current ? '#ffffff' : answered ? L.green : L.navy,
                      }}
                    >
                      {answered && !current ? (
                        <Icon name="lucide:check" size={12} style={{ backgroundColor: L.green }} />
                      ) : (
                        fa(n)
                      )}
                    </button>
                    {flagged && (
                      <span
                        className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: L.red, border: '1.5px solid #ffffff' }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <button
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[12px] font-bold"
              style={{ borderRadius: LR.md, border: `1px solid ${L.red}`, color: L.red }}
            >
              {examLegend.finish.label}
              <Icon name={examLegend.finish.icon} size={14} style={{ backgroundColor: L.red }} />
            </button>
          </Card>

          {/* Question (centre). */}
          <div className="min-w-0 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: L.muted }}>
                {examProgress.label}
                <Icon name="lucide:circle-play" size={12} style={{ backgroundColor: L.muted }} />
              </span>
              <h2 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {examProgress.title}
              </h2>
            </div>
            <span className="block h-2.5 rounded-full" style={{ backgroundColor: L.border }}>
              <span
                className="block h-2.5 rounded-full"
                style={{ width: `${examProgress.pct}%`, backgroundColor: L.blue }}
              />
            </span>

            <Card>
              <span
                className="inline-block px-3.5 py-1.5 text-[10.5px] font-bold"
                style={{ borderRadius: LR.sm, backgroundColor: L.blueSoft, color: L.blue }}
              >
                {examQuestion.chip}
              </span>

              <h3 className="mt-4 text-right text-[17px] font-extrabold" style={{ color: L.navy }}>
                {examQuestion.title}
              </h3>

              <p className="mt-3 flex items-start justify-end gap-1.5 text-right text-[11px] leading-6" style={{ color: L.muted }}>
                {examQuestion.hint}
                <Icon name="lucide:circle-play" size={12} className="mt-1 shrink-0" style={{ backgroundColor: L.muted }} />
              </p>

              <ul className="mt-4 space-y-2.5">
                {examQuestion.options.map((o, i) => {
                  const on = i === picked;
                  return (
                    <li key={o.label}>
                      <button
                        onClick={() => setPicked(i)}
                        aria-pressed={on}
                        className="w-full flex items-center gap-3 px-4 py-4 text-right transition-colors"
                        style={{
                          borderRadius: LR.md,
                          border: `1.5px solid ${on ? L.blue : L.border}`,
                          backgroundColor: on ? L.blueTint : '#ffffff',
                        }}
                      >
                        <span className="flex-1 text-[12px] font-bold" style={{ color: L.navy }}>
                          {o.label}
                        </span>
                        <span
                          className="w-5 h-5 flex items-center justify-center shrink-0"
                          style={{
                            borderRadius: '999px',
                            backgroundColor: on ? L.blue : '#ffffff',
                            border: `2px solid ${on ? L.blue : '#d5d7e3'}`,
                          }}
                        >
                          {on && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[11px] font-bold"
                style={{ borderRadius: LR.md, backgroundColor: '#f4f5f9', color: L.muted }}
              >
                {examQuestion.report.label}
                <Icon name={examQuestion.report.icon} size={13} style={{ backgroundColor: L.muted }} />
              </button>
            </Card>

            {/* Next is the primary and sits at the RTL start. */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <button
                className="flex items-center gap-2 px-8 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: LR.md, backgroundColor: L.blue }}
              >
                {examQuestion.next.label}
                <Icon name={examQuestion.next.icon} size={14} style={{ backgroundColor: '#ffffff' }} />
              </button>

              <button
                className="flex items-center gap-2 px-8 py-3.5 text-[12.5px] font-bold bg-white"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blue}`, color: L.blue }}
              >
                {examQuestion.prev.label}
                <Icon name={examQuestion.prev.icon} size={14} style={{ backgroundColor: L.blue }} />
              </button>
            </div>
          </div>

          {/* Rules and settings (left). */}
          <div className="space-y-4">
            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {examBrief.title}
              </h2>

              <ul className="mt-3.5 space-y-3">
                {examBrief.items.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="flex-1 text-right text-[11px] font-bold leading-6" style={{ color: L.navy }}>
                      {b}
                    </span>
                    <Icon
                      name="lucide:circle-check"
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ backgroundColor: L.green }}
                    />
                  </li>
                ))}
              </ul>

              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: LR.md, backgroundColor: L.orange }}
              >
                {examBrief.start.label}
                <Icon name={examBrief.start.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
              </button>
            </Card>

            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {examInfo.title}
              </h2>

              <ul className="mt-3.5 space-y-3.5">
                {examInfo.rows.map((r) => (
                  <li key={r.label} className="flex items-start gap-2.5">
                    <span className="flex-1 text-right min-w-0">
                      <span
                        className="flex items-center justify-end gap-1.5 text-[11px] font-bold"
                        style={{ color: L.navy }}
                      >
                        {r.label}
                        {r.ok && (
                          <Icon name="lucide:circle-check" size={12} style={{ backgroundColor: L.green }} />
                        )}
                      </span>
                      {r.value && (
                        <span className="mt-0.5 block text-[10px]" style={{ color: L.muted }}>
                          {r.value}
                        </span>
                      )}
                    </span>
                    <Icon name={r.icon} size={15} className="shrink-0" style={{ backgroundColor: L.muted }} />
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {examHelp.title}
              </h2>
              <p className="mt-2.5 text-right text-[10.5px] leading-6" style={{ color: L.muted }}>
                {examHelp.desc}
              </p>

              <div className="mt-3.5 space-y-2.5">
                {examHelp.actions.map((a) => (
                  <button
                    key={a.label}
                    className="w-full flex items-center justify-center gap-2 py-3 text-[11.5px] font-bold"
                    style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
                  >
                    {a.label}
                    <Icon name={a.icon} size={14} style={{ backgroundColor: L.blue }} />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* ── Suggestions ────────────────────────────────────── */}
        <section className="p-5" style={{ borderRadius: LR.lg, backgroundColor: '#fdf8ee' }}>
          <h2 className="flex items-center justify-end gap-2 text-[15px] font-extrabold" style={{ color: L.navy }}>
            {examSuggest.title}
            <Icon name={examSuggest.icon} size={16} style={{ backgroundColor: L.amber }} />
          </h2>
          <p className="mt-1 flex items-center justify-end gap-1.5 text-[10.5px]" style={{ color: L.muted }}>
            {examSuggest.desc}
            <Icon name="lucide:sparkles" size={11} style={{ backgroundColor: L.violet }} />
          </p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {examSuggest.items.map((s) => (
              <li key={s.title} className="bg-white p-4" style={{ borderRadius: LR.md }}>
                <div className="flex items-start gap-2.5">
                  <h3 className="flex-1 text-right text-[12px] font-extrabold" style={{ color: L.navy }}>
                    {s.title}
                  </h3>
                  <span
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ borderRadius: LR.sm, backgroundColor: s.bg }}
                  >
                    <Icon name={s.icon} size={17} style={{ backgroundColor: s.fg }} />
                  </span>
                </div>

                <p className="mt-2 text-right text-[10px] leading-5" style={{ color: L.muted }}>
                  {s.desc}
                </p>

                <button
                  className="mt-3 w-full py-2.5 text-[10.5px] font-bold"
                  style={{ borderRadius: LR.sm, border: `1px solid ${s.fg}66`, color: s.fg }}
                >
                  {s.cta}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
