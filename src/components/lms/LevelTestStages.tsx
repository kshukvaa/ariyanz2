'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import LevelTestShell, { TestCard, StageNav } from './LevelTestShell';
import {
  stageAbout,
  stageExperience,
  stageKnowledge,
  stageAnalysis,
  stageResult,
} from '@/data/lms/level-test';

/* ──────────────────────────────────────────────────────────────
   The five stage panels. Each is a route of its own so it can be
   linked and shared, but they all sit inside the same shell.
────────────────────────────────────────────────────────────── */

/* ══════ Stage 1 · شناخت شما ═════════════════════════════════ */

export function AboutStage() {
  return (
    <LevelTestShell
      step={0}
      rail={
        <>
          <TestCard>
            <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {stageAbout.aboutPath.title}
              <Icon name={stageAbout.aboutPath.icon} size={14} style={{ backgroundColor: T.primary }} />
            </h2>

            <p className="mt-3 text-right text-[10.5px] leading-7" style={{ color: T.muted }}>
              {stageAbout.aboutPath.desc}
            </p>

            <ul className="mt-4 space-y-3">
              {stageAbout.aboutPath.rows.map((r) => (
                <li key={r.label} className="flex items-center gap-2.5">
                  <span className="text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {r.value}
                  </span>
                  <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span
                    className="w-8 h-8 flex items-center justify-center shrink-0"
                    style={{ borderRadius: R.sm, backgroundColor: `${r.fg}14` }}
                  >
                    <Icon name={r.icon} size={14} style={{ backgroundColor: r.fg }} />
                  </span>
                </li>
              ))}
            </ul>
          </TestCard>

          <TestCard>
            <div className="flex items-start gap-3">
              <div className="flex-1 text-right min-w-0">
                <h2 className="text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {stageAbout.support.title}
                </h2>
                <p className="mt-2 text-[10px] leading-6" style={{ color: T.muted }}>
                  {stageAbout.support.desc}
                </p>
              </div>
              <Icon name={stageAbout.support.icon} size={26} className="shrink-0" style={{ backgroundColor: T.primary }} />
            </div>

            <button
              className="mt-3.5 w-full py-2.5 text-[11.5px] font-bold"
              style={{ borderRadius: R.md, backgroundColor: T.tintPurple, color: T.primary }}
            >
              {stageAbout.support.cta}
            </button>
          </TestCard>
        </>
      }
    >
      <TestCard className="text-center">
        <p className="text-[11.5px]" style={{ color: T.muted }}>
          {stageAbout.eyebrow}
        </p>
        <h2 className="mt-3 text-[24px] font-extrabold" style={{ color: T.ink }}>
          {stageAbout.title}
        </h2>
        <p className="mt-3 text-[11.5px] leading-7" style={{ color: T.muted }}>
          {stageAbout.desc.map((d) => (
            <React.Fragment key={d}>
              {d}
              <br />
            </React.Fragment>
          ))}
        </p>

        <img src={stageAbout.art} alt="" className="mt-5 mx-auto w-full max-w-[280px] object-contain" />

        <ul className="mt-5 flex items-center justify-center gap-3 flex-wrap">
          {stageAbout.chips.map((c) => (
            <li
              key={c.label}
              className="flex items-center gap-2 px-4 py-2.5 text-[10.5px] font-bold"
              style={{ borderRadius: R.md, backgroundColor: '#faf9ff', color: T.ink }}
            >
              {c.label}
              <Icon name={c.icon} size={13} style={{ backgroundColor: T.primary }} />
            </li>
          ))}
        </ul>

        <Link
          href="/level-test/experience"
          className="mt-6 mx-auto max-w-[420px] flex items-center justify-center gap-2 py-3.5 text-[13px] font-extrabold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: T.primary }}
        >
          {stageAbout.start.label}
          <Icon name={stageAbout.start.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
        </Link>

        <button className="mt-3 text-[11.5px] font-bold" style={{ color: T.primary }}>
          {stageAbout.later}
        </button>
      </TestCard>

      <TestCard>
        <h2 className="flex items-center justify-center gap-2.5 text-[14px] font-extrabold" style={{ color: T.ink }}>
          {stageAbout.how.title}
          <Icon name={stageAbout.how.icon} size={16} style={{ backgroundColor: T.violet }} />
        </h2>

        <ol className="mt-5 flex items-start justify-between gap-2 overflow-x-auto pb-1">
          {stageAbout.how.steps.map((s, i) => (
            <li key={s.label} className="flex items-start gap-2 shrink-0">
              {i > 0 && (
                <Icon name="lucide:arrow-left" size={14} className="mt-5" style={{ backgroundColor: T.border }} />
              )}
              <span className="w-[124px] text-center">
                <span
                  className="mx-auto w-11 h-11 flex items-center justify-center"
                  style={{ borderRadius: '999px', backgroundColor: T.tintPurple }}
                >
                  <Icon name={s.icon} size={18} style={{ backgroundColor: T.primary }} />
                </span>
                <span className="mt-2.5 block text-[11px] font-extrabold" style={{ color: T.ink }}>
                  {s.label}
                </span>
                <span className="mt-1.5 block text-[9px] leading-5" style={{ color: T.muted }}>
                  {s.desc}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </TestCard>
    </LevelTestShell>
  );
}

/* ══════ Stage 2 · ارزیابی تجربه ═════════════════════════════ */

export function ExperienceStage() {
  const [pick, setPick] = useState(stageExperience.options.findIndex((o) => o.selected));

  return (
    <LevelTestShell step={1}>
      <TestCard>
        <p className="text-center text-[11.5px]" style={{ color: T.muted }}>
          {stageExperience.eyebrow}
        </p>

        <h2 className="mt-3 flex items-center justify-center gap-2.5 text-[19px] font-extrabold" style={{ color: T.ink }}>
          {stageExperience.question}
          <Icon name={stageExperience.icon} size={20} style={{ backgroundColor: T.primary }} />
        </h2>

        <ul className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {stageExperience.options.map((o, i) => {
            const on = i === pick;
            return (
              <li key={o.label}>
                <button
                  onClick={() => setPick(i)}
                  aria-pressed={on}
                  className="w-full h-full p-4 text-center bg-white"
                  style={{
                    borderRadius: R.md,
                    border: `1.5px solid ${on ? T.primary : T.border}`,
                    boxShadow: on ? `0 0 0 3px ${T.primary}14` : undefined,
                  }}
                >
                  <span
                    className="mx-auto w-6 h-6 flex items-center justify-center"
                    style={{
                      borderRadius: '999px',
                      border: `2px solid ${on ? T.primary : '#d9d9e6'}`,
                    }}
                  >
                    {on && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: T.primary }} />}
                  </span>

                  <span
                    className="mt-3 block text-[12.5px] font-extrabold"
                    style={{ color: on ? T.primary : T.ink }}
                  >
                    {o.label}
                  </span>
                  <span className="mt-1.5 block text-[9.5px] leading-5" style={{ color: T.muted }}>
                    {o.note}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </TestCard>

      <StageNav
        next={stageExperience.next}
        prev={stageExperience.prev}
        nextHref="/level-test/knowledge"
        prevHref="/level-test"
      />
    </LevelTestShell>
  );
}

/* ══════ Stage 3 · ارزیابی دانش ══════════════════════════════ */

export function KnowledgeStage() {
  const [pick, setPick] = useState(stageKnowledge.options.findIndex((o) => o.selected));

  return (
    <LevelTestShell step={2}>
      <TestCard>
        <p className="text-center text-[11.5px]" style={{ color: T.muted }}>
          {stageKnowledge.eyebrow}
        </p>

        <h2 className="mt-3 flex items-center justify-center gap-2.5 text-[17px] font-extrabold" style={{ color: T.ink }}>
          {stageKnowledge.counter}
          <Icon name={stageKnowledge.icon} size={18} style={{ backgroundColor: T.primary }} />
        </h2>

        <div className="mt-5 p-4" style={{ borderRadius: R.md, backgroundColor: '#faf9ff' }}>
          <span className="block text-right text-[11px] font-extrabold" style={{ color: T.ink }}>
            {stageKnowledge.scenarioLabel}
          </span>
          <p className="mt-2 text-right text-[12px] leading-8" style={{ color: T.ink }}>
            {stageKnowledge.scenario}
          </p>
        </div>

        <ul className="mt-5 space-y-2.5">
          {stageKnowledge.options.map((o, i) => {
            const on = i === pick;
            return (
              <li key={o.label}>
                <button
                  onClick={() => setPick(i)}
                  aria-pressed={on}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-right bg-white"
                  style={{
                    borderRadius: R.md,
                    border: `1.5px solid ${on ? T.primary : T.border}`,
                    boxShadow: on ? `0 0 0 3px ${T.primary}14` : undefined,
                  }}
                >
                  <span className="flex-1 text-[11.5px] font-bold" style={{ color: on ? T.primary : T.ink }}>
                    {o.label}
                  </span>
                  <span
                    className="w-5 h-5 flex items-center justify-center shrink-0"
                    style={{ borderRadius: '999px', border: `2px solid ${on ? T.primary : '#d9d9e6'}` }}
                  >
                    {on && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: T.primary }} />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </TestCard>

      <StageNav
        next={stageKnowledge.next}
        prev={stageKnowledge.prev}
        nextHref="/level-test/analysis"
        prevHref="/level-test/experience"
      />
    </LevelTestShell>
  );
}

/* ══════ Stage 4 · تحلیل آریاز ═══════════════════════════════ */

export function AnalysisStage() {
  const size = 150;
  const stroke = 13;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <LevelTestShell step={3}>
      <TestCard className="text-center">
        <p className="text-[11.5px]" style={{ color: T.muted }}>
          {stageAnalysis.eyebrow}
        </p>

        <h2 className="mt-3 flex items-center justify-center gap-2.5 text-[22px] font-extrabold" style={{ color: T.ink }}>
          {stageAnalysis.title}
          <Icon name={stageAnalysis.icon} size={22} style={{ backgroundColor: T.violet }} />
        </h2>

        <p className="mt-3 mx-auto max-w-[560px] text-[11.5px] leading-8" style={{ color: T.muted }}>
          {stageAnalysis.desc}
        </p>

        <span className="mt-6 relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="absolute inset-0 -rotate-90 scale-x-[-1]">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={stroke} />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={T.infoStrong}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - stageAnalysis.pct / 100)}
            />
          </svg>
          <span className="relative text-[26px] font-extrabold" style={{ color: T.ink }}>
            {fa(stageAnalysis.pct)}%
          </span>
        </span>

        <ul className="mt-6 mx-auto max-w-[460px] space-y-3">
          {stageAnalysis.checks.map((ch) => (
            <li key={ch.label} className="flex items-center gap-2.5">
              <span className="flex-1 text-right text-[11.5px] font-bold" style={{ color: ch.done ? T.ink : T.muted }}>
                {ch.label}
              </span>
              {ch.done ? (
                <span
                  className="w-6 h-6 flex items-center justify-center shrink-0"
                  style={{ borderRadius: '999px', backgroundColor: '#1c8a4e' }}
                >
                  <Icon name="lucide:check" size={12} style={{ backgroundColor: '#ffffff' }} />
                </span>
              ) : (
                <span
                  className="w-6 h-6 shrink-0"
                  style={{ borderRadius: '999px', border: `2px solid ${T.border}` }}
                />
              )}
            </li>
          ))}
        </ul>
      </TestCard>
    </LevelTestShell>
  );
}

/* ══════ Stage 5 · پیشنهاد نقطه شروع ═════════════════════════ */

function Donut({ items }: { items: { label: string; pct: number; fg: string }[] }) {
  const size = 130;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = items.reduce((s, i) => s + i.pct, 0);

  /* Cumulative offsets derived up front rather than accumulated
     during the map — reassigning a closure variable mid-render
     trips react-hooks/immutability and is genuinely fragile. */
  const arcs = items.map((it, i) => {
    const before = items.slice(0, i).reduce((s, p) => s + p.pct, 0) / total;
    return { ...it, dash: (c * it.pct) / total, offset: -c * before };
  });

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 scale-x-[-1]">
        {arcs.map((a) => (
          <circle
            key={a.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={a.fg}
            strokeWidth={stroke}
            strokeDasharray={`${a.dash} ${c - a.dash}`}
            strokeDashoffset={a.offset}
          />
        ))}
      </svg>
    </span>
  );
}

export function ResultStage() {
  return (
    <LevelTestShell
      step={4}
      rail={
        <>
          <TestCard>
            <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {stageResult.info.title}
              <Icon name={stageResult.info.icon} size={14} style={{ backgroundColor: T.primary }} />
            </h2>

            <ul className="mt-3.5 space-y-3">
              {stageResult.info.rows.map((r) => (
                <li key={r.label}>
                  <span className="block text-right text-[10px]" style={{ color: T.muted }}>
                    {r.label}
                  </span>
                  <span className="mt-0.5 block text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
                    {r.value}
                  </span>
                </li>
              ))}
            </ul>
          </TestCard>

          <TestCard>
            <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {stageResult.areas.title}
              <Icon name={stageResult.areas.icon} size={14} style={{ backgroundColor: T.primary }} />
            </h2>

            <div className="mt-4 flex items-center gap-4">
              <ul className="flex-1 space-y-2.5 order-1">
                {stageResult.areas.items.map((a) => (
                  <li key={a.label} className="flex items-center gap-2">
                    <span className="text-[10px] font-bold" style={{ color: a.fg }}>
                      {a.value}
                    </span>
                    <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                      {a.label}
                    </span>
                  </li>
                ))}
              </ul>

              <span className="order-2 shrink-0">
                <Donut items={stageResult.areas.items} />
              </span>
            </div>
          </TestCard>
        </>
      }
    >
      <TestCard>
        <p className="text-center text-[11.5px]" style={{ color: T.muted }}>
          {stageResult.eyebrow}
        </p>

        <h2 className="mt-3 flex items-center justify-center gap-2.5 text-[21px] font-extrabold" style={{ color: T.ink }}>
          {stageResult.title}
          <Icon name={stageResult.icon} size={22} style={{ backgroundColor: T.primary }} />
        </h2>

        <p className="mt-3 text-center text-[11.5px] leading-7" style={{ color: T.muted }}>
          {stageResult.desc}
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr] items-start">
          {/* Ladder declared first → right. */}
          <ol className="space-y-2.5">
            {stageResult.levels.map((l) => {
              const passed = l.state === 'passed';
              const start = l.state === 'start';
              return (
                <li
                  key={l.n}
                  className="flex items-center gap-3 p-3.5"
                  style={{
                    borderRadius: R.md,
                    backgroundColor: passed ? '#f1faf5' : start ? '#f6f4fe' : '#fbfbfe',
                    border: `1.5px solid ${passed ? '#bfe6d0' : start ? T.primary : T.border}`,
                  }}
                >
                  <span className="shrink-0 order-3 text-left">
                    {l.badge && (
                      <span
                        className="flex items-center gap-1.5 text-[10px] font-bold whitespace-nowrap"
                        style={{ color: passed ? '#1c8a4e' : T.primary }}
                      >
                        {l.badge}
                        <Icon
                          name={passed ? 'lucide:circle-check' : 'lucide:sparkles'}
                          size={13}
                          style={{ backgroundColor: passed ? '#1c8a4e' : T.primary }}
                        />
                      </span>
                    )}
                    {l.pill && (
                      <span
                        className="mt-1.5 inline-block px-2.5 py-1 text-[9px] font-bold"
                        style={{
                          borderRadius: R.sm,
                          backgroundColor: passed ? '#dff3e8' : T.tintPurple,
                          color: passed ? '#1c8a4e' : T.primary,
                        }}
                      >
                        {l.pill}
                      </span>
                    )}
                  </span>

                  <span className="flex-1 text-right order-2 min-w-0">
                    <span className="block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                      {l.title}
                    </span>
                    <span className="mt-0.5 block text-[10px]" style={{ color: T.muted }}>
                      {l.desc}
                    </span>
                  </span>

                  <span
                    className="w-10 h-10 flex items-center justify-center shrink-0 order-1 text-[14px] font-extrabold"
                    style={{
                      borderRadius: '999px',
                      backgroundColor: passed ? '#dff3e8' : start ? T.primary : '#f0f0f6',
                      color: passed ? '#1c8a4e' : start ? '#ffffff' : T.muted,
                    }}
                  >
                    {l.n}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="p-4" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
            <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
              {stageResult.why.title}
            </h3>
            <p className="mt-2.5 text-right text-[11px] leading-7" style={{ color: T.muted }}>
              {stageResult.why.body}
            </p>

            <ul className="mt-3 space-y-2.5">
              {stageResult.why.gaps.map((g) => (
                <li key={g} className="flex items-center gap-2.5 justify-end">
                  <span className="text-[11px] font-bold" style={{ color: T.ink }}>
                    {g}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: T.accent }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/learning-paths/v2/hiring"
            className="flex items-center gap-2 px-9 py-3.5 text-[13px] font-extrabold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primary }}
          >
            {stageResult.primary.label}
            <Icon name={stageResult.primary.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
          </Link>

          <Link
            href="/learning-paths/v2/hiring"
            className="flex items-center gap-2 px-7 py-3.5 text-[12px] font-bold bg-white"
            style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
          >
            {stageResult.secondary.label}
            <Icon name={stageResult.secondary.icon} size={14} style={{ backgroundColor: T.primary }} />
          </Link>
        </div>
      </TestCard>
    </LevelTestShell>
  );
}
