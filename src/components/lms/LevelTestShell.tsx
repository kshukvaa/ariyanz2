'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import {
  LEVEL_TEST_BAR,
  levelTestChrome,
  levelTestPath,
  stages,
  stageProgress,
  stageProgressNote,
  railTitles,
  guides,
  guidePlaceholder,
  guideFoot,
} from '@/data/lms/level-test';

/* ──────────────────────────────────────────────────────────────
   The shell all five level-test stages share.

   RTL: the progress rail is on the RIGHT in every sheet, so it is
   declared first; the Aryaz guide is on the LEFT and declared
   last. Same as the learning-path pages, opposite of the course
   and counselling ones — worth stating because it is exactly the
   kind of thing that reads as "fixed" when inverted.

   The horizontal tracker also runs right-to-left: stage ۱ is the
   rightmost node.
────────────────────────────────────────────────────────────── */

export function TestCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

function Ring({ pct, size = 120 }: { pct: number; size?: number }) {
  const stroke = 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90 scale-x-[-1]">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={T.primary}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
        />
      </svg>
      <span className="relative text-[22px] font-extrabold" style={{ color: T.ink }}>
        {fa(pct)}%
      </span>
    </span>
  );
}

/* ── Horizontal stage tracker ─────────────────────────────────── */

function Tracker({ current }: { current: number }) {
  const stateLabel = (i: number) =>
    i < current ? 'تکمیل شد' : i === current ? 'در حال انجام' : 'به زودی';

  return (
    <TestCard>
      <ol className="flex items-start justify-between gap-1 overflow-x-auto pb-1">
        {stages.map((s, i) => {
          const done = i < current;
          const on = i === current;
          return (
            <li key={s.id} className="flex items-center gap-1 flex-1 min-w-[120px]">
              {i > 0 && (
                <span
                  className="flex-1 h-[2px] mt-[-30px]"
                  style={{ backgroundColor: i <= current ? (done ? '#a9dcc0' : T.primary) : T.border }}
                />
              )}

              <span className="text-center shrink-0">
                <span
                  className="mx-auto w-11 h-11 flex items-center justify-center"
                  style={{
                    borderRadius: '999px',
                    backgroundColor: done ? '#e7f6ee' : on ? T.primary : '#f4f4f8',
                    border: `1px solid ${done ? '#bfe6d0' : on ? T.primary : T.border}`,
                  }}
                >
                  {done ? (
                    <Icon name="lucide:check" size={17} style={{ backgroundColor: '#1c8a4e' }} />
                  ) : (
                    <Icon
                      name={s.icon}
                      size={17}
                      style={{ backgroundColor: on ? '#ffffff' : T.muted }}
                    />
                  )}
                </span>

                <span
                  className="mt-2.5 block text-[10.5px] font-bold whitespace-nowrap"
                  style={{ color: on ? T.primary : done ? T.ink : T.muted }}
                >
                  {s.label}
                </span>
                <span
                  className="mt-1 block text-[9.5px] whitespace-nowrap"
                  style={{ color: done ? '#1c8a4e' : on ? T.primary : T.muted }}
                >
                  {stateLabel(i)}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </TestCard>
  );
}

/* ── The shell ────────────────────────────────────────────────── */

export default function LevelTestShell({
  step,
  rail,
  children,
}: {
  /* zero-based stage index */
  step: number;
  rail?: React.ReactNode;
  children: React.ReactNode;
}) {
  const guide = guides[step];

  return (
    <div style={{ backgroundColor: T.page }}>
      {/* Page bar. The mockup's own logo/user/bell row is dropped —
          the real site header carries those. */}
      <div style={{ backgroundColor: LEVEL_TEST_BAR }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-4 flex-wrap">
          <span className="flex-1 min-w-[180px] text-center text-[13.5px] font-extrabold text-white">
            {levelTestChrome.title}
          </span>

          <Link
            href={levelTestChrome.back.href}
            className="flex items-center gap-2 px-4 py-2 text-[11.5px] font-bold text-white shrink-0"
            style={{ borderRadius: R.md, border: '1px solid rgba(255,255,255,.25)' }}
          >
            <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: '#ffffff' }} />
            {levelTestChrome.back.label}
          </Link>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-4 xl:grid-cols-[280px_1fr_280px] items-start">
          {/* ── Progress rail (right) ─────────────────────────── */}
          <aside className="space-y-4 order-1 xl:sticky xl:top-4">
            <TestCard>
              <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {step === 4 ? railTitles.statusResult : railTitles.status}
                <Icon name="lucide:chart-column-big" size={14} style={{ backgroundColor: T.primary }} />
              </h2>

              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="text-right">
                  <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {railTitles.progress}
                  </span>
                  <span className="mt-1 block text-[10px]" style={{ color: T.muted }}>
                    {stageProgressNote[step]}
                  </span>
                </span>
                <Ring pct={stageProgress[step]} size={110} />
              </div>
            </TestCard>

            <TestCard>
              <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {railTitles.steps}
                <Icon name="lucide:list-checks" size={14} style={{ backgroundColor: T.primary }} />
              </h2>

              <ol className="mt-4 space-y-0">
                {stages.map((s, i, all) => {
                  const done = i < step;
                  const on = i === step;
                  return (
                    <li key={s.id}>
                      <Link
                        href={`/level-test${s.slug ? `/${s.slug}` : ''}`}
                        className="flex items-start gap-2.5"
                      >
                        <span className="flex flex-col items-center shrink-0">
                          <span
                            className="w-7 h-7 flex items-center justify-center text-[11px] font-bold"
                            style={{
                              borderRadius: '999px',
                              backgroundColor: done ? '#1c8a4e' : on ? T.primary : '#ececf3',
                              color: done || on ? '#ffffff' : T.muted,
                            }}
                          >
                            {done ? (
                              <Icon name="lucide:check" size={13} style={{ backgroundColor: '#ffffff' }} />
                            ) : (
                              fa(i + 1)
                            )}
                          </span>
                          {i < all.length - 1 && (
                            <span className="w-[2px] h-7" style={{ backgroundColor: done ? '#bfe6d0' : T.border }} />
                          )}
                        </span>

                        <span
                          className="flex-1 text-right text-[11.5px] pb-3"
                          style={{
                            color: on ? T.primary : done ? '#1c8a4e' : T.muted,
                            fontWeight: on ? 800 : 600,
                          }}
                        >
                          {s.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </TestCard>

            {rail}
          </aside>

          {/* ── Centre ───────────────────────────────────────── */}
          <main className="min-w-0 space-y-4 order-2">
            <TestCard>
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={levelTestPath.view.href}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold shrink-0 order-3"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
                >
                  {levelTestPath.view.label}
                  <Icon name={levelTestPath.view.icon} size={13} style={{ backgroundColor: T.primary }} />
                </Link>

                <div className="flex-1 min-w-[220px] text-center order-2">
                  <h1 className="flex items-center justify-center gap-2.5 text-[22px] font-extrabold" style={{ color: T.ink }}>
                    {levelTestPath.title}
                    <Icon name={levelTestPath.icon} size={20} style={{ backgroundColor: T.primary }} />
                  </h1>
                  <p className="mt-2 text-[11.5px]" style={{ color: T.muted }}>
                    {step === 2 ? levelTestPath.descKnowledge : levelTestPath.desc}
                  </p>
                </div>
              </div>
            </TestCard>

            <Tracker current={step} />

            {children}
          </main>

          {/* ── Aryaz guide (left) ───────────────────────────── */}
          <aside className="order-3 xl:sticky xl:top-4">
            <TestCard>
              <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {guide.title}
                <Icon name="lucide:sparkles" size={14} style={{ backgroundColor: T.violet }} />
              </h2>

              <p className="mt-1.5 flex items-center justify-end gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
                {guide.status}
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#22c55e' }} />
              </p>

              <img
                src="/images/aryaz/illustrations/ai-assistant-avatar.png"
                alt=""
                className="mt-3 mx-auto w-28 h-28 object-contain"
              />

              <p
                className="mt-3 p-3.5 text-center text-[10.5px] leading-7"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                {guide.bubble}
              </p>

              <h3 className="mt-5 text-center text-[11.5px] font-extrabold" style={{ color: T.primary }}>
                {guide.faqTitle}
              </h3>

              <ul className="mt-3 space-y-2.5">
                {guide.faq.map((q) => (
                  <li key={q}>
                    <button
                      className="w-full flex items-center gap-2.5 px-3.5 py-3 text-right transition-colors hover:bg-gray-50"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <span className="flex-1 text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {q}
                      </span>
                      <Icon name="lucide:circle-help" size={14} className="shrink-0" style={{ backgroundColor: T.primary }} />
                    </button>
                  </li>
                ))}
              </ul>

              <label
                className="mt-4 flex items-center gap-2.5 px-3 py-2.5"
                style={{ borderRadius: R.pill, border: `1px solid ${T.border}` }}
              >
                <button
                  aria-label="ارسال"
                  className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ borderRadius: '999px', backgroundColor: T.primary }}
                >
                  <Icon name="lucide:send" size={14} style={{ backgroundColor: '#ffffff' }} />
                </button>
                <input
                  placeholder={guidePlaceholder}
                  className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>

              <p className="mt-2.5 text-center text-[9.5px]" style={{ color: T.muted }}>
                {guideFoot}
              </p>
            </TestCard>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ── Shared footer nav for the question stages ────────────────── */

export function StageNav({
  next,
  prev,
  nextHref,
  prevHref,
}: {
  next: { label: string; icon: string };
  prev: { label: string; icon: string };
  nextHref: string;
  prevHref: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <Link
        href={nextHref}
        className="flex items-center gap-2 px-10 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
        style={{ borderRadius: R.md, backgroundColor: T.primary }}
      >
        {next.label}
        <Icon name={next.icon} size={14} style={{ backgroundColor: '#ffffff' }} />
      </Link>

      <Link
        href={prevHref}
        className="flex items-center gap-2 px-7 py-3.5 text-[12px] font-bold bg-white"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
      >
        {prev.label}
        <Icon name={prev.icon} size={14} style={{ backgroundColor: T.primary }} />
      </Link>
    </div>
  );
}
