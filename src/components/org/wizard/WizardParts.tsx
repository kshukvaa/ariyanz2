'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { wizardSteps, wizardNav, type WizardStep } from '@/data/orgWizard';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the create-assessment wizard.

   The stepper and the summary rail say the same thing in two
   registers — one horizontal and glanceable, one vertical and
   detailed — so both read from `wizardSteps` and neither can
   drift out of step with the other.
────────────────────────────────────────────────────────────── */

/* ── The full-width progress card ─────────────────────────────── */

export function Stepper({
  current,
  steps = wizardSteps,
}: {
  current: number;
  /** Defaults to the assessment wizard; the report builder passes its own four. */
  steps?: WizardStep[];
}) {
  return (
    <div
      className="bg-white p-5 overflow-x-auto"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <ol className="flex items-start min-w-max">
        {steps.map((s, i) => {
          const done = i < current;
          const on = i === current;

          return (
            <li key={s.id} className="flex items-start">
              <div className="flex flex-col items-center gap-2.5 w-[168px] relative">
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[12.5px] font-extrabold shrink-0"
                  style={
                    done
                      ? { backgroundColor: T.success, color: '#fff' }
                      : on
                        ? { backgroundColor: '#fff', color: T.primary, border: `2.5px solid ${T.primary}` }
                        : { backgroundColor: '#fff', color: T.muted, border: `1.5px solid ${T.border}` }
                  }
                >
                  {done ? <Icon name="lucide:check" size={18} className="text-white" /> : s.n}
                </span>

                <span className="text-center px-2">
                  <span
                    className="block text-[12.5px]"
                    style={{ color: on ? T.primary : done ? T.ink : T.muted, fontWeight: on ? 800 : 700 }}
                  >
                    {s.label}
                  </span>
                  <span className="block mt-0.5 text-[10.5px]" style={{ color: T.muted }}>
                    {s.desc}
                  </span>
                </span>

                {on && (
                  <span
                    className="absolute -bottom-5 inset-x-6 h-[3px] rounded-full"
                    style={{ backgroundColor: T.primary }}
                  />
                )}
              </div>

              {i < steps.length - 1 && (
                <span
                  className="h-[2px] w-10 mt-5 shrink-0"
                  style={{ backgroundColor: done ? T.success : T.border }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── The vertical summary in the side rail ────────────────────── */

export function SummaryRail({
  current,
  title,
  steps = wizardSteps,
}: {
  current: number;
  title?: string;
  steps?: WizardStep[];
}) {
  return (
    <div
      className="bg-white p-5"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <h2 className="text-right text-[14px] font-extrabold" style={{ color: T.ink }}>
        {title ?? wizardNav.summaryTitle}
      </h2>

      <ol className="mt-4 space-y-1">
        {steps.map((s, i) => {
          const done = i < current;
          const on = i === current;

          return (
            <li
              key={s.id}
              className="flex items-center gap-3 px-3 py-2.5"
              style={{
                borderRadius: R.md,
                backgroundColor: on ? T.tintPurple : 'transparent',
              }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0"
                style={
                  done
                    ? { backgroundColor: T.tintGreen, color: T.successStrong }
                    : on
                      ? { backgroundColor: T.primary, color: '#fff' }
                      : { backgroundColor: '#f4f4f8', color: T.muted }
                }
              >
                {done ? <Icon name="lucide:check" size={15} style={{ backgroundColor: T.successStrong }} /> : s.n}
              </span>

              <span className="flex-1 text-right min-w-0">
                <span
                  className="block text-[12.5px] font-bold truncate"
                  style={{ color: on ? T.primary : T.ink }}
                >
                  {s.label}
                </span>
                <span className="block text-[10.5px]" style={{ color: T.muted }}>
                  {done ? wizardNav.statusDone : on ? wizardNav.statusDoing : wizardNav.statusWait}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── A tinted advisory block ──────────────────────────────────── */

export function NoteCard({
  title,
  text,
  tone = 'purple',
  icon = 'lucide:circle-alert',
}: {
  title: string;
  text: string;
  tone?: 'purple' | 'orange' | 'green';
  icon?: string;
}) {
  const tones = {
    purple: { bg: T.tintPurple, fg: T.primary },
    orange: { bg: T.tintOrange, fg: T.accent },
    green: { bg: T.tintGreen, fg: T.successStrong },
  }[tone];

  return (
    <div className="p-4" style={{ borderRadius: R.lg, backgroundColor: tones.bg }}>
      <div className="flex items-center justify-end gap-2">
        <h3 className="text-[12.5px] font-extrabold" style={{ color: tones.fg }}>
          {title}
        </h3>
        <Icon name={icon} size={16} style={{ backgroundColor: tones.fg }} />
      </div>
      <p className="mt-2 text-right text-[11.5px] leading-6" style={{ color: T.ink }}>
        {text}
      </p>
    </div>
  );
}

/* ── Form primitives ──────────────────────────────────────────── */

export function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="flex items-center justify-end gap-1 text-[12.5px] font-bold" style={{ color: T.ink }}>
      {required && <span style={{ color: T.danger }}>*</span>}
      {children}
    </span>
  );
}

export function Select({ value }: { value: string }) {
  return (
    <span
      className="flex items-center gap-2 px-4 py-3 mt-2 cursor-pointer"
      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
    >
      <Icon name="lucide:chevron-down" size={15} style={{ backgroundColor: T.muted }} />
      <span className="flex-1 text-right text-[12.5px] font-semibold" style={{ color: T.ink }}>
        {value}
      </span>
    </span>
  );
}

export function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className="w-[38px] h-[21px] rounded-full shrink-0 relative transition-colors"
      style={{ backgroundColor: on ? T.primary : '#d5d7e3' }}
    >
      <span
        className="absolute top-[3px] w-[15px] h-[15px] rounded-full bg-white transition-all"
        style={on ? { right: 3 } : { right: 20 }}
      />
    </span>
  );
}

export function Check({ on }: { on: boolean }) {
  return (
    <span
      className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
      style={{
        borderRadius: 5,
        backgroundColor: on ? T.primaryStrong : '#fff',
        border: on ? undefined : `1.5px solid #cdd0e0`,
      }}
    >
      {on && <Icon name="lucide:check" size={12} className="text-white" />}
    </span>
  );
}

export function Radio({ on }: { on: boolean }) {
  return (
    <span
      className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
      style={{ border: `1.5px solid ${on ? T.primary : '#cdd0e0'}` }}
    >
      {on && (
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: T.primary }} />
      )}
    </span>
  );
}

/* ── The bar pinned under every step ──────────────────────────── */

export function StepFooter({
  next,
  back,
  draft = wizardNav.draft,
  onNext,
  onBack,
  nextTone = T.primaryStrong,
  nextIcon = 'lucide:arrow-left',
}: {
  next: string;
  back?: string;
  draft?: string;
  onNext?: () => void;
  onBack?: () => void;
  nextTone?: string;
  nextIcon?: string;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap justify-between pt-1">
      <button
        className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
      >
        <Icon name="lucide:bookmark" size={16} style={{ backgroundColor: T.muted }} />
        {draft}
      </button>

      <div className="flex items-center gap-3 flex-wrap">
        {back && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:arrow-right" size={16} style={{ backgroundColor: T.muted }} />
            {back}
          </button>
        )}

        <button
          onClick={onNext}
          data-ripple
          className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: nextTone }}
        >
          {next}
          <Icon name={nextIcon} size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
