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
import { Field, Dropzone, SummaryRows, PayPanel } from './WizardFields';
import { ask } from '@/data/counseling/wizards';

/* ──────────────────────────────────────────────────────────────
   ارسال سؤال تخصصی — all four steps.

   The distinctive one: step 3 is not a form but Aryaz reading the
   question back and saying what is still missing. That check-list
   is the point of the wizard, so it renders as a verdict list
   rather than as more inputs.
────────────────────────────────────────────────────────────── */

export default function AskClient() {
  const [step, setStep] = useState(1);

  const agent =
    step === 1 ? ask.step1.agent : step === 2 ? ask.step2.agent : step === 3 ? ask.step3.agent : ask.step4.agent;

  return (
    <CounselWizard
      lead={ask.lead}
      steps={ask.steps}
      current={step}
      footer={ask.footer}
      headerRail={<RailSteps title={ask.railTitle} steps={ask.steps} current={step} />}
      aside={<BenefitsCard title={ask.benefits.title} icon={ask.benefits.icon} items={ask.benefits.items} />}
      rail={
        <>
          <AgentPanel title={agent.title} bubble={agent.bubble} chips={agent.chips} />
          <TrustPanel />
        </>
      }
    >
      <nav className="flex items-center gap-2 flex-wrap justify-end">
        {ask.steps.map((s, i) => (
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

      <p
        className="flex items-center justify-center gap-2 p-3.5 text-[11px]"
        style={{ borderRadius: R.md, backgroundColor: '#f6f4fe', color: T.ink }}
      >
        {ask.banner}
        <Icon name="lucide:circle-alert" size={14} className="shrink-0" style={{ backgroundColor: T.primary }} />
      </p>

      {step === 1 && (
        <WizardCard>
          <StepHeading title={ask.step1.title} icon={ask.step1.icon} />
          <div className="mt-4 space-y-4">
            {ask.step1.fields.map((f) => (
              <Field key={f.label} spec={f} />
            ))}
          </div>
        </WizardCard>
      )}

      {step === 2 && (
        <WizardCard>
          <StepHeading title={ask.step2.title} icon={ask.step2.icon} />

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px] items-start">
            {/* Fields declared first → right. */}
            <div className="space-y-4">
              {ask.step2.fields.map((f) => (
                <Field key={f.label} spec={f} />
              ))}
            </div>

            <Dropzone
              title={ask.step2.drop.title}
              hint={ask.step2.drop.hint}
              formats={ask.step2.drop.formats}
              limit={ask.step2.drop.limit}
            />
          </div>
        </WizardCard>
      )}

      {step === 3 && (
        <WizardCard>
          <StepHeading title={ask.step3.title} icon={ask.step3.icon} />

          <p className="mt-3 text-right text-[11.5px] leading-8" style={{ color: T.ink }}>
            {ask.step3.body}
          </p>

          <ul className="mt-4 space-y-2.5">
            {ask.step3.checks.map((c) => (
              <li
                key={c.label}
                className="flex items-center gap-2.5 px-4 py-3.5"
                style={{
                  borderRadius: R.md,
                  backgroundColor: c.ok ? '#f1faf5' : '#fdf6ec',
                  border: `1px solid ${c.ok ? '#cfead9' : '#f6e2c4'}`,
                }}
              >
                <span className="flex-1 text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
                  {c.label}
                </span>
                <Icon
                  name={c.ok ? 'lucide:circle-check' : 'lucide:triangle-alert'}
                  size={16}
                  className="shrink-0"
                  style={{ backgroundColor: c.ok ? '#1c8a4e' : T.warning }}
                />
              </li>
            ))}
          </ul>
        </WizardCard>
      )}

      {step === 4 && (
        <>
          <WizardCard>
            <StepHeading title={ask.step4.summaryTitle} icon={ask.step4.icon} />
            <div className="mt-3">
              <SummaryRows rows={ask.step4.rows} />
            </div>
          </WizardCard>

          <WizardCard>
            <PayPanel
              title={ask.step4.payTitle}
              rows={ask.step4.payRows}
              total={ask.step4.payTotal}
              action={ask.step4.pay}
            />
          </WizardCard>
        </>
      )}
    </CounselWizard>
  );
}
