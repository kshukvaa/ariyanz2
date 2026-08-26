'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import CounselWizard, {
  WizardCard,
  StepHeading,
  AgentPanel,
  BenefitsCard,
  TrustPanel,
} from './CounselWizard';
import { Field } from './WizardFields';
import { caseWizard } from '@/data/counseling/wizards';

/* ──────────────────────────────────────────────────────────────
   بررسی پرونده تخصصی — step 1 of 4.

   The case flow's source is 36 sheets; «page 1» is the entry and
   is what this route renders. The remaining sheets are the later
   steps and their many sub-states — a separate body of work, not
   a missing detail of this page.

   The one thing this wizard says that the others do not: the
   price is NOT known up front. That notice is the first thing
   below the stepper, exactly as drawn.
────────────────────────────────────────────────────────────── */

export default function CaseClient() {
  return (
    <CounselWizard
      lead={caseWizard.lead}
      pill={caseWizard.pillOverride}
      steps={caseWizard.steps}
      current={1}
      footer={caseWizard.footer}
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
        <BenefitsCard
          title={caseWizard.benefits.title}
          icon={caseWizard.benefits.icon}
          items={caseWizard.benefits.items}
          more={caseWizard.benefits.more}
        />
      }
      rail={
        <>
          <AgentPanel
            title={caseWizard.agent.title}
            bubble={caseWizard.agent.bubble}
            chipsTitle={caseWizard.agent.chipsTitle}
            chips={caseWizard.agent.chips}
            placeholder={caseWizard.agent.placeholder}
          />
          <TrustPanel />
        </>
      }
    >
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
    </CounselWizard>
  );
}
