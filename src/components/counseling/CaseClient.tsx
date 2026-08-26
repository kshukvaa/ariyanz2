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
import { Field } from './WizardFields';
import { CaseStep2, CaseStep3 } from './CaseSteps';
import { caseWizard } from '@/data/counseling/wizards';

/* ──────────────────────────────────────────────────────────────
   بررسی پرونده تخصصی.

   Steps 1–3 are drawn by «page 1», «page 2» and «page 3» and are
   built here; the wizard walks between them in place rather than
   on separate routes, which is why the footer takes callbacks.

   Steps 4 (تعیین دامنه و هزینه) and 5 (پرداخت و ارجاع) appear in
   the stepper but have no sheet in the supplied set, so «next» on
   step 3 stops there rather than inventing them.

   The one thing this wizard says that the others do not: the
   price is NOT known up front. That notice is the first thing
   below the stepper, exactly as drawn.
────────────────────────────────────────────────────────────── */

export default function CaseClient() {
  const [step, setStep] = useState(1);

  const agent =
    step === 2 ? caseWizard.step2.agent : step === 3 ? caseWizard.step3.agent : caseWizard.agent;
  const footer =
    step === 2 ? caseWizard.step2.footer : step === 3 ? caseWizard.step3.footer : caseWizard.footer;

  return (
    <CounselWizard
      lead={caseWizard.lead}
      pill={caseWizard.pillOverride}
      steps={caseWizard.steps}
      current={step}
      footer={footer}
      onNext={() => setStep((s) => Math.min(3, s + 1))}
      onBack={() => setStep((s) => Math.max(1, s - 1))}
      headerRail={
        <WizardCard>
          <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
            {caseWizard.fields.title}
            <Icon name={caseWizard.fields.icon} size={14} style={{ backgroundColor: T.violet }} />
          </h2>

          <ul className="mt-3.5 space-y-3">
            {caseWizard.fields.items.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="flex-1 text-right text-[10.5px] font-bold" style={{ color: '#1c8a4e' }}>
                  {f}
                </span>
                <Icon name="lucide:circle-check" size={14} className="shrink-0" style={{ backgroundColor: '#1c8a4e' }} />
              </li>
            ))}
          </ul>

          <button className="mt-4 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
            <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.primary }} />
            {caseWizard.fields.all}
          </button>
        </WizardCard>
      }
      aside={
        step === 1 ? (
          <BenefitsCard
            title={caseWizard.benefits.title}
            icon={caseWizard.benefits.icon}
            items={caseWizard.benefits.items}
            more={caseWizard.benefits.more}
          />
        ) : step === 2 ? (
          <BenefitsCard
            title={caseWizard.process.title}
            icon={caseWizard.process.icon}
            items={caseWizard.process.items}
            more={caseWizard.process.more}
          />
        ) : (
          /* «page 3» shows the process as a numbered rail with the
             current step called out, not as a bullet list. */
          <RailSteps title={caseWizard.process.title} steps={caseWizard.steps} current={step} />
        )
      }
      rail={
        <>
          <AgentPanel
            title={agent.title}
            bubble={agent.bubble}
            chipsTitle={agent.chipsTitle}
            chips={agent.chips}
            placeholder={agent.placeholder}
          />

          {step === 2 ? (
            <WizardCard>
              <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {caseWizard.step2.tips.title}
                <Icon name={caseWizard.step2.tips.icon} size={14} style={{ backgroundColor: T.primary }} />
              </h2>
              <ul className="mt-3.5 space-y-3">
                {caseWizard.step2.tips.items.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="flex-1 text-right text-[10px] leading-6" style={{ color: T.ink }}>
                      {t}
                    </span>
                    <Icon
                      name="lucide:circle-check"
                      size={13}
                      className="shrink-0 mt-1"
                      style={{ backgroundColor: '#1c8a4e' }}
                    />
                  </li>
                ))}
              </ul>
            </WizardCard>
          ) : step === 3 ? (
            <WizardCard>
              <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {caseWizard.step3.security.title}
                <Icon name={caseWizard.step3.security.icon} size={14} style={{ backgroundColor: T.primary }} />
              </h2>
              <p className="mt-3 text-right text-[10px] leading-6" style={{ color: T.ink }}>
                {caseWizard.step3.security.body}
              </p>
              <button className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
                <Icon name="lucide:sparkles" size={12} style={{ backgroundColor: T.primary }} />
                {caseWizard.step3.security.more}
              </button>
            </WizardCard>
          ) : (
            <TrustPanel />
          )}
        </>
      }
    >
      {step === 1 && (
        <>
          <p
            className="flex items-center justify-center gap-2 p-3.5 text-[11px]"
            style={{ borderRadius: R.md, backgroundColor: '#f6f4fe', color: T.ink }}
          >
            {caseWizard.notice}
            <Icon name="lucide:circle-alert" size={14} className="shrink-0" style={{ backgroundColor: T.primary }} />
          </p>

          <WizardCard>
            <StepHeading title={caseWizard.step1.title} icon={caseWizard.step1.icon} />
            <div className="mt-4 space-y-4">
              {caseWizard.step1.fields.map((f) => (
                <Field key={f.label} spec={f} />
              ))}
            </div>

            {/* The three-up row the mockup draws under the description. */}
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {caseWizard.step1.columns.map((c) => (
                <div
                  key={c.label}
                  className="p-4 self-start"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <Field spec={c} />
                </div>
              ))}
            </div>
          </WizardCard>
        </>
      )}

      {step === 2 && <CaseStep2 />}
      {step === 3 && <CaseStep3 />}
    </CounselWizard>
  );
}
