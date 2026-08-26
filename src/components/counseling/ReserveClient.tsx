'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import CounselWizard, {
  WizardCard,
  StepHeading,
  AgentPanel,
  BenefitsCard,
  RailSteps,
  TrustPanel,
} from './CounselWizard';
import { Field, SummaryRows, PayPanel } from './WizardFields';
import { reserve } from '@/data/counseling/wizards';

/* ──────────────────────────────────────────────────────────────
   رزرو جلسه آنلاین — all four steps.

   The reserve wizard is the one family member with every step
   drawn (files 1, 2, 3 and «5», which is step 4 — see the header
   of wizards.ts). So it is built as a real four-step flow rather
   than a single panel, and the stepper actually moves.
────────────────────────────────────────────────────────────── */

export default function ReserveClient() {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(
    reserve.step1.durations.findIndex((d) => d.selected),
  );

  const agent =
    step === 1
      ? reserve.step1.agent
      : step === 2
        ? reserve.step2.agent
        : step === 3
          ? reserve.step3.agent
          : reserve.step4.agent;

  return (
    <CounselWizard
      lead={reserve.lead}
      steps={reserve.steps}
      current={step}
      footer={reserve.footer}
      headerRail={<RailSteps title={reserve.railTitle} steps={reserve.steps} current={step} />}
      aside={
        <BenefitsCard
          title={reserve.benefits.title}
          icon={reserve.benefits.icon}
          items={reserve.benefits.items}
        />
      }
      rail={
        <>
          <AgentPanel title={agent.title} bubble={agent.bubble} chips={agent.chips} />
          <TrustPanel />
        </>
      }
    >
      {/* Step switcher — the mockups are separate sheets; this is
          how a visitor moves between them. */}
      <nav className="flex items-center gap-2 flex-wrap justify-end">
        {reserve.steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i + 1)}
            aria-pressed={step === i + 1}
            className="px-3.5 py-2 text-[10.5px] font-bold"
            style={{
              borderRadius: R.pill,
              backgroundColor: step === i + 1 ? T.primary : '#ffffff',
              color: step === i + 1 ? '#ffffff' : T.muted,
              border: `1px solid ${step === i + 1 ? T.primary : T.border}`,
            }}
          >
            {s}
          </button>
        ))}
      </nav>

      {step === 1 && (
        <WizardCard>
          <StepHeading title={reserve.step1.title} icon={reserve.step1.icon} />

          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {reserve.step1.durations.map((d, i) => {
              const on = i === duration;
              return (
                <li key={d.label} className="relative">
                  {d.badge && (
                    <span
                      className="absolute -top-2 left-3 z-10 px-2.5 py-1 text-[9px] font-bold text-white"
                      style={{ borderRadius: R.sm, backgroundColor: T.primary }}
                    >
                      {d.badge}
                    </span>
                  )}
                  <button
                    onClick={() => setDuration(i)}
                    aria-pressed={on}
                    className="w-full h-full p-5 text-center bg-white"
                    style={{
                      borderRadius: R.md,
                      border: `1.5px solid ${on ? T.primary : T.border}`,
                      boxShadow: on ? `0 0 0 3px ${T.primary}14` : undefined,
                    }}
                  >
                    <span className="flex items-center justify-center gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
                      {d.label}
                      <Icon name="lucide:clock" size={15} style={{ backgroundColor: on ? T.primary : T.muted }} />
                    </span>
                    <span className="mt-2.5 block text-[13px] font-extrabold" style={{ color: T.ink }}>
                      {d.price}
                    </span>
                    <span className="mt-1.5 block text-[10px]" style={{ color: T.primary }}>
                      {d.note}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </WizardCard>
      )}

      {step === 2 && (
        <WizardCard>
          <StepHeading title={reserve.step2.title} icon={reserve.step2.icon} />
          <div className="mt-4 space-y-4">
            {reserve.step2.fields.map((f) => (
              <Field key={f.label} spec={f} />
            ))}
          </div>
        </WizardCard>
      )}

      {step === 3 && (
        <>
          <WizardCard>
            <div className="grid gap-4 lg:grid-cols-[1fr_260px] items-start">
              {/* Summary declared first → right. */}
              <div>
                <StepHeading title={reserve.step3.summary.title} icon="lucide:calendar" />
                <div className="mt-3">
                  <SummaryRows rows={reserve.step3.summary.rows} />
                </div>
              </div>

              <div className="space-y-2.5">
                {reserve.step3.summary.edits.map((e) => (
                  <button
                    key={e.label}
                    className="w-full flex items-center justify-center gap-2 py-3 text-[11px] font-bold bg-white"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
                  >
                    {e.label}
                    <Icon name={e.icon} size={13} style={{ backgroundColor: T.primary }} />
                  </button>
                ))}
              </div>
            </div>
          </WizardCard>

          <WizardCard>
            <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: T.ink }}>
              {reserve.step3.brief.title}
              <Icon name={reserve.step3.brief.icon} size={16} style={{ backgroundColor: T.violet }} />
            </h2>

            <p className="mt-3 text-right text-[11.5px] leading-8" style={{ color: T.ink }}>
              {reserve.step3.brief.body}
            </p>

            <div className="mt-4 p-4" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
              <h3 className="text-right text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                {reserve.step3.brief.goalsTitle}
              </h3>
              <ul className="mt-3 flex items-start justify-between gap-2 flex-wrap">
                {reserve.step3.brief.goals.map((g) => (
                  <li key={g.label} className="flex-1 min-w-[110px] text-center">
                    <span
                      className="mx-auto w-11 h-11 flex items-center justify-center"
                      style={{ borderRadius: '999px', backgroundColor: T.tintPurple }}
                    >
                      <Icon name={g.icon} size={19} style={{ backgroundColor: T.primary }} />
                    </span>
                    <span className="mt-2 block text-[10px] font-bold leading-5" style={{ color: T.ink }}>
                      {g.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </WizardCard>

          <WizardCard>
            <StepHeading title={reserve.step3.docsTitle} icon="lucide:paperclip" />
            <ul className="mt-4 space-y-2.5">
              {reserve.step3.docs.map((doc) => (
                <li
                  key={doc}
                  className="flex items-center gap-2.5 px-4 py-3"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <span className="flex-1 text-right text-[11px] font-bold" style={{ color: T.ink }}>
                    {doc}
                  </span>
                  <Icon name="lucide:file-text" size={15} className="shrink-0" style={{ backgroundColor: T.primary }} />
                </li>
              ))}
            </ul>
          </WizardCard>
        </>
      )}

      {step === 4 && (
        <>
          <WizardCard>
            <StepHeading title={reserve.step4.title} icon={reserve.step4.icon} />

            <ul className="mt-4 grid sm:grid-cols-3 lg:grid-cols-5">
              {reserve.step4.cells.map((c, i) => (
                <li
                  key={c.label}
                  className="px-4 py-3 text-center"
                  style={{ borderInlineEnd: i < reserve.step4.cells.length - 1 ? `1px solid ${T.border}` : undefined }}
                >
                  <span className="flex items-center justify-center gap-1.5 text-[10px]" style={{ color: T.muted }}>
                    {c.label}
                    <Icon name={c.icon} size={12} style={{ backgroundColor: T.primary }} />
                  </span>
                  <span className="mt-1.5 block text-[11.5px] font-extrabold leading-6" style={{ color: T.ink }}>
                    {c.value}
                  </span>
                </li>
              ))}
            </ul>
          </WizardCard>

          <WizardCard>
            <PayPanel
              title={reserve.step4.payTitle}
              rows={reserve.step4.payRows}
              total={reserve.step4.payTotal}
              action={reserve.step4.pay}
            />
          </WizardCard>
        </>
      )}
    </CounselWizard>
  );
}
