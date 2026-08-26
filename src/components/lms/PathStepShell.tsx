'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import { PATH_BAR, pathStepChrome, pathMap, pathGuide } from '@/data/lms/path-steps';

/* ──────────────────────────────────────────────────────────────
   The frame the two path-step screens share.

   Not the classroom shell: a course lesson gets a flat curriculum
   list, a path step gets a «نقشه مسیر» that groups steps under
   LEVELS and locks what you have not reached. The lock is the
   point — a path is ordered, a course syllabus is not.

   RTL: the map rail is on the RIGHT, the Aryaz companion on the
   LEFT. Map declared first, companion last.
────────────────────────────────────────────────────────────── */

export function StepCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

function MapMark({ state }: { state: 'done' | 'current' | 'todo' | 'locked' }) {
  if (state === 'done') {
    return (
      <span
        className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
        style={{ borderRadius: '999px', backgroundColor: '#1c8a4e' }}
      >
        <Icon name="lucide:check" size={10} style={{ backgroundColor: '#ffffff' }} />
      </span>
    );
  }
  if (state === 'current') {
    return (
      <span
        className="w-[18px] h-[18px] shrink-0"
        style={{ borderRadius: '999px', border: `3px solid ${T.primary}` }}
      />
    );
  }
  if (state === 'todo') {
    return (
      <span
        className="w-[18px] h-[18px] shrink-0"
        style={{ borderRadius: '999px', border: `2px solid #d9d9e6` }}
      />
    );
  }
  return <Icon name="lucide:lock" size={13} className="shrink-0" style={{ backgroundColor: '#c9cbd8' }} />;
}

export default function PathStepShell({
  currentStep,
  guide,
  levelItems,
  children,
}: {
  /* label of the step to mark as current in the level-2 list */
  currentStep: string;
  guide: 'lesson' | 'exercise';
  /* Optional override for the open level's item list. The exercise
     sheet draws a different one from the lesson sheet. */
  levelItems?: { label: string; state: 'done' | 'current' | 'todo' | 'locked' }[];
  children: React.ReactNode;
}) {
  const chips = guide === 'lesson' ? pathGuide.lessonChips : pathGuide.exerciseChips;
  const chipsTitle = guide === 'lesson' ? pathGuide.lessonChipsTitle : pathGuide.exerciseChipsTitle;
  const bubble = guide === 'lesson' ? pathGuide.lessonBubble : pathGuide.exerciseBubble;

  return (
    <div style={{ backgroundColor: T.page }}>
      {/* Page bar. The mockup's logo/search/user row is dropped —
          the real site header carries those. */}
      <div style={{ backgroundColor: PATH_BAR }}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
          <span className="flex-1 min-w-[160px] text-center text-[12.5px] font-bold text-white">
            {pathStepChrome.pathTitle}
          </span>
          <Link
            href={pathStepChrome.back.href}
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-white shrink-0"
            style={{ borderRadius: R.md, border: '1px solid rgba(255,255,255,.25)' }}
          >
            <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: '#ffffff' }} />
            {pathStepChrome.back.label}
          </Link>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-4 xl:grid-cols-[280px_1fr_280px] items-start">
          {/* ── Path map (right) ──────────────────────────── */}
          <aside className="space-y-4 order-1 xl:sticky xl:top-4">
            <StepCard>
              <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
                {pathMap.title}
                <Icon name={pathMap.icon} size={15} style={{ backgroundColor: T.primary }} />
              </h2>

              <div className="mt-4 space-y-2.5">
                {pathMap.levels.map((lv) => (
                  <div
                    key={lv.label}
                    className="p-3"
                    style={{
                      borderRadius: R.md,
                      border: `1px solid ${lv.statusTone === 'current' ? `${T.primary}44` : T.border}`,
                      backgroundColor: lv.statusTone === 'current' ? '#faf9ff' : '#ffffff',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {lv.statusTone === 'locked' ? (
                        <Icon name="lucide:lock" size={12} style={{ backgroundColor: '#c9cbd8' }} />
                      ) : (
                        <Icon
                          name={lv.open ? 'lucide:chevron-up' : 'lucide:chevron-down'}
                          size={12}
                          style={{ backgroundColor: T.muted }}
                        />
                      )}

                      {lv.status && (
                        <span
                          className="text-[9.5px] font-bold shrink-0"
                          style={{ color: lv.statusTone === 'done' ? '#1c8a4e' : T.primary }}
                        >
                          {lv.status}
                        </span>
                      )}

                      <h3
                        className="flex-1 text-right text-[11px] font-extrabold"
                        style={{ color: lv.statusTone === 'locked' ? T.muted : T.ink }}
                      >
                        {lv.label}
                      </h3>
                    </div>

                    {lv.open && (levelItems ?? lv.items).length > 0 && (
                      <ul className="mt-3 space-y-2.5">
                        {(levelItems ?? lv.items).map((it) => {
                          const on = it.label === currentStep;
                          return (
                            <li
                              key={it.label}
                              className="flex items-center gap-2.5 px-2 py-1.5"
                              style={{
                                borderRadius: R.sm,
                                backgroundColor: on ? '#f2effd' : 'transparent',
                                borderInlineStart: on ? `2px solid ${T.primary}` : undefined,
                              }}
                            >
                              <span className="flex-1 text-right text-[10.5px]" style={{
                                color: on ? T.primary : it.state === 'locked' ? T.muted : T.ink,
                                fontWeight: on ? 800 : 600,
                              }}>
                                {it.label}
                              </span>
                              <MapMark state={on ? 'current' : it.state} />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </StepCard>

            <StepCard>
              <h2 className="text-center text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {pathMap.summary.title}
              </h2>

              <ul className="mt-4 flex items-start justify-around">
                {[
                  { v: pathMap.summary.pct, l: pathMap.summary.pctLabel, fg: T.primary },
                  { v: pathMap.summary.done, l: pathMap.summary.doneLabel, fg: T.ink },
                  { v: pathMap.summary.total, l: pathMap.summary.totalLabel, fg: T.ink },
                ].map((s) => (
                  <li key={s.l} className="text-center">
                    <span className="block text-[15px] font-extrabold" style={{ color: s.fg }}>
                      {s.v}
                    </span>
                    <span className="mt-0.5 block text-[9px]" style={{ color: T.muted }}>
                      {s.l}
                    </span>
                  </li>
                ))}
              </ul>

              <span className="mt-4 block h-2 rounded-full" style={{ backgroundColor: T.border }}>
                <span
                  className="block h-2 rounded-full"
                  style={{ width: `${pathMap.summary.bar}%`, backgroundColor: T.primary }}
                />
              </span>
            </StepCard>
          </aside>

          {/* ── Centre ────────────────────────────────────── */}
          <main className="min-w-0 space-y-4 order-2">
            <StepCard>
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href={pathStepChrome.back.href}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold shrink-0 order-3"
                  style={{ borderRadius: R.md, border: `1px solid ${T.primary}44`, color: T.primary }}
                >
                  <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: T.primary }} />
                  {pathStepChrome.back.label}
                </Link>

                <div className="flex-1 min-w-[200px] text-center order-2">
                  <h1 className="text-[19px] font-extrabold" style={{ color: T.ink }}>
                    {pathStepChrome.pathTitle}
                  </h1>
                  <span
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold"
                    style={{ borderRadius: R.pill, backgroundColor: T.tintPurple, color: T.primary }}
                  >
                    {pathStepChrome.levelPill}
                    <Icon name="lucide:zap" size={11} style={{ backgroundColor: T.primary }} />
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0 order-1">
                  <span className="text-right">
                    <span className="block text-[11px] font-bold" style={{ color: T.ink }}>
                      {pathStepChrome.progressLabel}
                    </span>
                    <span className="mt-0.5 block text-[9.5px]" style={{ color: T.muted }}>
                      {pathStepChrome.progressNote}
                    </span>
                  </span>

                  <span className="relative inline-flex items-center justify-center" style={{ width: 66, height: 66 }}>
                    <svg width={66} height={66} className="absolute inset-0 -rotate-90 scale-x-[-1]">
                      <circle cx={33} cy={33} r={28} fill="none" stroke={T.border} strokeWidth={7} />
                      <circle
                        cx={33}
                        cy={33}
                        r={28}
                        fill="none"
                        stroke={T.primary}
                        strokeWidth={7}
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 * (1 - pathStepChrome.progressPct / 100)}
                      />
                    </svg>
                    <span className="relative text-[13px] font-extrabold" style={{ color: T.ink }}>
                      {fa(pathStepChrome.progressPct)}%
                    </span>
                  </span>
                </div>
              </div>

              <nav className="mt-4 pt-3.5 flex items-center justify-center gap-2 text-[10.5px]" style={{ borderTop: `1px solid ${T.border}`, color: T.muted }}>
                {pathStepChrome.crumb.map((c, i) => (
                  <React.Fragment key={c}>
                    {i > 0 && <span>›</span>}
                    <span>{c}</span>
                  </React.Fragment>
                ))}
              </nav>
            </StepCard>

            {children}
          </main>

          {/* ── Aryaz companion (left) ────────────────────── */}
          <aside className="order-3 xl:sticky xl:top-4">
            <StepCard>
              <div className="flex items-start gap-2">
                <button aria-label="بستن" className="shrink-0 order-2">
                  <Icon name="lucide:x" size={14} style={{ backgroundColor: T.muted }} />
                </button>
                <h2 className="flex-1 text-right text-[12.5px] font-extrabold order-1" style={{ color: T.ink }}>
                  {pathGuide.title}
                </h2>
              </div>

              <img
                src="/images/aryaz/illustrations/ai-assistant-avatar.png"
                alt=""
                className="mt-3 mx-auto w-24 h-24 object-contain"
              />

              <p
                className="mt-3 p-3 text-center text-[10.5px] leading-7"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                {bubble}
              </p>

              <h3 className="mt-5 text-center text-[11.5px] font-extrabold" style={{ color: T.primary }}>
                {chipsTitle}
              </h3>

              <ul className="mt-3 space-y-2.5">
                {chips.map((c) => (
                  <li key={c.label}>
                    <button
                      className="w-full flex items-center gap-2.5 px-3.5 py-3 text-right transition-colors hover:bg-gray-50"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <span className="flex-1 text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {c.label}
                      </span>
                      <Icon name={c.icon} size={14} className="shrink-0" style={{ backgroundColor: T.primary }} />
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
                  style={{ borderRadius: R.sm, backgroundColor: T.primary }}
                >
                  <Icon name="lucide:send" size={14} style={{ backgroundColor: '#ffffff' }} />
                </button>
                <input
                  placeholder={pathGuide.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>

              <p className="mt-3 text-center text-[9px] leading-5" style={{ color: T.muted }}>
                {pathGuide.disclaimer.map((d) => (
                  <React.Fragment key={d}>
                    {d}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </StepCard>
          </aside>
        </div>
      </div>
    </div>
  );
}
