'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import PathStepShell, { StepCard } from './PathStepShell';
import { pathExercise } from '@/data/lms/path-steps';

/* ──────────────────────────────────────────────────────────────
   مرحله مسیر — an exercise step.

   Transcribed as drawn, including the column order that surprised
   me: «از شما چه می‌خواهیم؟» sits to the RIGHT of «سناریو» in the
   source, so the task list is declared first. Reading order is
   therefore task-then-scenario, not the other way round.
────────────────────────────────────────────────────────────── */

export default function PathExerciseClient() {
  return (
    <PathStepShell
      currentStep={pathExercise.mapCurrent}
      guide="exercise"
      levelItems={pathExercise.mapItems}
    >
      <StepCard>
        <p className="text-center">
          <span
            className="inline-block px-3.5 py-1.5 text-[10.5px] font-bold"
            style={{ borderRadius: R.md, backgroundColor: T.tintPurple, color: T.primary }}
          >
            {pathExercise.badge}
          </span>
        </p>

        <h2 className="mt-4 text-center text-[22px] font-extrabold" style={{ color: T.ink }}>
          {pathExercise.title}
        </h2>

        <ul className="mt-4 flex items-center justify-center gap-3 flex-wrap">
          {pathExercise.meta.map((m) => (
            <li
              key={m.label}
              className="flex items-center gap-1.5 px-3.5 py-2 text-[10.5px] font-bold"
              style={{ borderRadius: R.md, backgroundColor: '#f7f7fb', color: T.ink }}
            >
              {m.label}
              <Icon name={m.icon} size={12} style={{ backgroundColor: T.muted }} />
            </li>
          ))}
        </ul>
      </StepCard>

      {/* Task list right, scenario left — as drawn. */}
      <div className="grid gap-4 lg:grid-cols-2 items-start">
        <StepCard>
          <h3 className="flex items-center justify-end gap-2.5 text-[14px] font-extrabold" style={{ color: T.ink }}>
            {pathExercise.ask.title}
            <span
              className="w-8 h-8 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
            >
              <Icon name={pathExercise.ask.icon} size={15} style={{ backgroundColor: T.primary }} />
            </span>
          </h3>

          <p className="mt-3.5 text-right text-[11px] font-bold" style={{ color: T.ink }}>
            {pathExercise.ask.lead}
          </p>

          <ol className="mt-3 space-y-3">
            {pathExercise.ask.items.map((it, i) => (
              <li key={it} className="flex items-center gap-2.5">
                <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
                  {it}
                </span>
                <span
                  className="w-6 h-6 flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ borderRadius: '999px', backgroundColor: T.primary }}
                >
                  {fa(i + 1)}
                </span>
              </li>
            ))}
          </ol>
        </StepCard>

        <StepCard>
          <h3 className="flex items-center justify-end gap-2.5 text-[14px] font-extrabold" style={{ color: T.ink }}>
            {pathExercise.scenario.title}
            <span
              className="w-8 h-8 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
            >
              <Icon name={pathExercise.scenario.icon} size={15} style={{ backgroundColor: T.primary }} />
            </span>
          </h3>

          <p className="mt-3.5 text-right text-[11.5px] leading-8" style={{ color: T.ink }}>
            {pathExercise.scenario.body}
          </p>

          <ul className="mt-4">
            {pathExercise.scenario.rows.map((r, i) => (
              <li
                key={r.label}
                className="flex items-center gap-3 px-3 py-2.5"
                style={{ borderRadius: R.sm, backgroundColor: i % 2 ? '#ffffff' : '#f8f7fd' }}
              >
                <span className="flex-1 text-left text-[11px] font-bold" style={{ color: T.ink }}>
                  {r.value}
                </span>
                <span className="text-[10.5px] shrink-0" style={{ color: T.primary }}>
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </StepCard>
      </div>

      <StepCard>
        <h3 className="text-right text-[14px] font-extrabold" style={{ color: T.ink }}>
          {pathExercise.answer.title}
        </h3>

        <textarea
          rows={7}
          placeholder={pathExercise.answer.placeholder}
          className="mt-3.5 w-full px-4 py-3.5 text-right text-[11.5px] outline-none resize-none placeholder:text-[#9396b0]"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        />

        <button
          className="mt-4 flex items-center gap-2.5 px-9 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: '#1c8a4e' }}
        >
          {pathExercise.answer.submit.label}
          <Icon name={pathExercise.answer.submit.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
        </button>
      </StepCard>
    </PathStepShell>
  );
}
