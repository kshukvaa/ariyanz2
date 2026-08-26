'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import CounselWizard, {
  WizardCard,
  StepHeading,
  AgentPanel,
  BenefitsCard,
  TrustPanel,
} from './CounselWizard';
import { Field } from './WizardFields';
import { inPerson } from '@/data/counseling/wizards';

/* ──────────────────────────────────────────────────────────────
   جلسه حضوری — step 1 of 4.

   Only step 1 is drawn in «In-person consultation .png», and it
   is a big one: where, how long, how many people, which day,
   which hour. The stepper still shows all four stages because
   that is what the mockup shows.
────────────────────────────────────────────────────────────── */

export default function InPersonClient() {
  const [place, setPlace] = useState('org');
  const [duration, setDuration] = useState(0);
  const [attendee, setAttendee] = useState(1);
  const [day, setDay] = useState(inPerson.date.selected);
  const [slot, setSlot] = useState(inPerson.time.selected);

  const d = inPerson.date;
  const leading = d.startWeekday;
  const cells: (number | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: d.days }, (_, i) => i + 1),
  ];

  return (
    <CounselWizard
      lead={inPerson.lead}
      steps={inPerson.steps}
      current={1}
      footer={inPerson.footer}
      headerRail={
        <WizardCard>
          <h2 className="flex items-center justify-end gap-2 text-[12px] font-extrabold" style={{ color: T.ink }}>
            {inPerson.status.title}
            <Icon name="lucide:sparkles" size={13} style={{ backgroundColor: T.violet }} />
          </h2>
          <ul className="mt-3 space-y-2.5">
            {inPerson.status.rows.map((r) => (
              <li key={r.label} className="flex items-center gap-2">
                {r.ok ? (
                  <>
                    <span className="flex-1 text-right text-[10.5px] font-bold" style={{ color: '#1c8a4e' }}>
                      {r.label}
                    </span>
                    <Icon name="lucide:circle-check" size={13} className="shrink-0" style={{ backgroundColor: '#1c8a4e' }} />
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-left text-[10.5px] font-bold" style={{ color: T.ink }}>
                      {r.value}
                    </span>
                    <span className="text-[10px]" style={{ color: T.muted }}>
                      {r.label}
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </WizardCard>
      }
      aside={
        <BenefitsCard
          title={inPerson.benefits.title}
          icon={inPerson.benefits.icon}
          items={inPerson.benefits.items}
        />
      }
      rail={
        <>
          <AgentPanel
            title={inPerson.agent.title}
            bubble={inPerson.agent.bubble}
            chips={inPerson.agent.chips}
            placeholder={inPerson.agent.placeholder}
          />
          <TrustPanel />
        </>
      }
    >
      {/* ── 1. Location ──────────────────────────────────────── */}
      <WizardCard>
        <StepHeading title={inPerson.places.title} icon={inPerson.places.icon} />

        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {inPerson.places.items.map((p) => {
            const on = p.id === place;
            return (
              <li key={p.id}>
                <button
                  onClick={() => setPlace(p.id)}
                  aria-pressed={on}
                  className="relative w-full h-full p-4 text-center bg-white transition-shadow"
                  style={{
                    borderRadius: R.md,
                    border: `1.5px solid ${on ? T.primary : T.border}`,
                    boxShadow: on ? `0 0 0 3px ${T.primary}14` : undefined,
                  }}
                >
                  <Icon name={p.icon} size={24} style={{ backgroundColor: T.primary }} />
                  <span className="mt-2.5 block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                    {p.title}
                  </span>
                  <span className="mt-1.5 block text-[10px] leading-5" style={{ color: T.muted }}>
                    {p.desc}
                  </span>
                  {p.free && (
                    <span className="mt-2 flex items-center justify-center gap-1.5 text-[9.5px] font-bold" style={{ color: '#1c8a4e' }}>
                      {p.free}
                      <Icon name="lucide:circle-check" size={11} style={{ backgroundColor: '#1c8a4e' }} />
                    </span>
                  )}
                  {on && (
                    <span
                      className="absolute bottom-3 left-3 w-6 h-6 flex items-center justify-center"
                      style={{ borderRadius: '999px', backgroundColor: T.primary }}
                    >
                      <Icon name="lucide:check" size={13} style={{ backgroundColor: '#ffffff' }} />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Address, shown for the org option as drawn. */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {inPerson.address.selects.map((s) => (
            <Field key={s.label} spec={{ label: s.label, kind: 'select', placeholder: s.value }} />
          ))}
        </div>

        <div className="mt-3">
          <Field
            spec={{
              label: inPerson.address.field.label,
              required: inPerson.address.field.required,
              value: inPerson.address.field.value,
            }}
          />
        </div>

        <div className="mt-4 p-4 flex items-center gap-4 flex-wrap" style={{ borderRadius: R.md, backgroundColor: '#f6f4fe' }}>
          <span className="text-[14px] font-extrabold shrink-0 order-3" style={{ color: T.primary }}>
            {inPerson.address.fee.value}
          </span>
          <span className="flex-1 min-w-[200px] text-right order-2">
            <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
              {inPerson.address.fee.label}
            </span>
            <span className="mt-1 flex items-center justify-end gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
              {inPerson.address.fee.note}
              <Icon name="lucide:circle-alert" size={11} style={{ backgroundColor: T.muted }} />
            </span>
          </span>
          <span
            className="w-10 h-10 flex items-center justify-center shrink-0 order-1 bg-white"
            style={{ borderRadius: R.md }}
          >
            <Icon name={inPerson.address.fee.icon} size={18} style={{ backgroundColor: T.primary }} />
          </span>
        </div>
      </WizardCard>

      {/* ── 2. Duration ──────────────────────────────────────── */}
      <WizardCard>
        <StepHeading title={inPerson.durations.title} icon="lucide:clock" />

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {inPerson.durations.items.map((it, i) => {
            const on = i === duration;
            return (
              <li key={it.label}>
                <button
                  onClick={() => setDuration(i)}
                  aria-pressed={on}
                  className="relative w-full p-4 text-center bg-white"
                  style={{
                    borderRadius: R.md,
                    border: `1.5px solid ${on ? T.primary : T.border}`,
                    boxShadow: on ? `0 0 0 3px ${T.primary}14` : undefined,
                  }}
                >
                  <span className="flex items-center justify-center gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {it.label}
                    <Icon name="lucide:clock" size={15} style={{ backgroundColor: on ? T.primary : T.muted }} />
                  </span>
                  <span className="mt-2 block text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {it.price}
                  </span>
                  <span className="mt-1.5 block text-[10px]" style={{ color: T.muted }}>
                    {it.note}
                  </span>
                  {on && (
                    <span
                      className="absolute bottom-3 left-3 w-6 h-6 flex items-center justify-center"
                      style={{ borderRadius: '999px', backgroundColor: T.primary }}
                    >
                      <Icon name="lucide:check" size={13} style={{ backgroundColor: '#ffffff' }} />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </WizardCard>

      {/* ── 3/4/5: attendees · date · time ───────────────────── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr_260px] items-start">
        {/* Attendees declared first → right. */}
        <WizardCard>
          <StepHeading title={inPerson.attendees.title} icon={inPerson.attendees.icon} />

          <ul className="mt-4 grid grid-cols-2 gap-2.5">
            {inPerson.attendees.items.map((a, i) => {
              const on = i === attendee;
              return (
                <li key={a.label}>
                  <button
                    onClick={() => setAttendee(i)}
                    aria-pressed={on}
                    className="w-full h-full p-3 text-center bg-white"
                    style={{
                      borderRadius: R.md,
                      border: `1.5px solid ${on ? T.primary : T.border}`,
                    }}
                  >
                    <span className="block text-[12px] font-extrabold" style={{ color: on ? T.primary : T.ink }}>
                      {a.label}
                    </span>
                    <span className="mt-1 block text-[9px] leading-4" style={{ color: T.muted }}>
                      {a.note}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p
            className="mt-3.5 flex items-start justify-end gap-2 p-3 text-right text-[9.5px] leading-5"
            style={{ borderRadius: R.md, backgroundColor: '#f6f4fe', color: T.muted }}
          >
            {inPerson.attendees.note}
            <Icon name="lucide:circle-alert" size={12} className="mt-0.5 shrink-0" style={{ backgroundColor: T.primary }} />
          </p>
        </WizardCard>

        <WizardCard>
          <StepHeading title={inPerson.date.title} icon={inPerson.date.icon} />

          <p className="mt-4 flex items-center justify-center gap-4">
            <button aria-label="ماه قبل">
              <Icon name="lucide:chevron-right" size={14} style={{ backgroundColor: T.muted }} />
            </button>
            <span className="text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {d.month}
            </span>
            <button aria-label="ماه بعد">
              <Icon name="lucide:chevron-left" size={14} style={{ backgroundColor: T.muted }} />
            </button>
          </p>

          <div className="mt-3 grid grid-cols-7 gap-1 text-center">
            {d.weekdays.map((w) => (
              <span key={w} className="py-1.5 text-[10px] font-bold" style={{ color: T.muted }}>
                {w}
              </span>
            ))}

            {cells.map((n, i) => {
              if (n === null) return <span key={`e${i}`} />;
              const available = d.available.includes(n);
              const on = n === day;
              return (
                <button
                  key={n}
                  onClick={() => available && setDay(n)}
                  disabled={!available}
                  aria-pressed={on}
                  className="relative py-1.5 text-[11px] font-bold"
                  style={{
                    borderRadius: '999px',
                    backgroundColor: on ? T.primary : 'transparent',
                    color: on ? '#ffffff' : available ? T.ink : '#c9cbd8',
                  }}
                >
                  {fa(n)}
                  {available && !on && (
                    <span
                      className="absolute bottom-0.5 inset-x-0 mx-auto w-1 h-1 rounded-full"
                      style={{ backgroundColor: '#1c8a4e' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <ul className="mt-3.5 flex items-center justify-center gap-4 flex-wrap">
            {d.legend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
                {l.label}
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: l.ok ? '#1c8a4e' : '#c9cbd8' }}
                />
              </li>
            ))}
          </ul>
        </WizardCard>

        <WizardCard>
          <StepHeading title={inPerson.time.title} icon={inPerson.time.icon} />

          <ul className="mt-4 space-y-2.5">
            {inPerson.time.slots.map((s) => {
              const on = s === slot;
              return (
                <li key={s}>
                  <button
                    onClick={() => setSlot(s)}
                    aria-pressed={on}
                    className="w-full flex items-center gap-2.5 px-4 py-3 bg-white"
                    style={{
                      borderRadius: R.md,
                      border: `1.5px solid ${on ? T.primary : T.border}`,
                    }}
                  >
                    {on ? (
                      <span
                        className="w-5 h-5 flex items-center justify-center shrink-0"
                        style={{ borderRadius: '999px', backgroundColor: T.primary }}
                      >
                        <Icon name="lucide:check" size={11} style={{ backgroundColor: '#ffffff' }} />
                      </span>
                    ) : (
                      <span className="w-5 shrink-0" />
                    )}
                    <span className="flex-1 text-center text-[12px] font-extrabold" style={{ color: on ? T.primary : T.ink }}>
                      {s}
                    </span>
                    <Icon name="lucide:clock" size={14} className="shrink-0" style={{ backgroundColor: T.muted }} />
                  </button>
                </li>
              );
            })}
          </ul>
        </WizardCard>
      </div>
    </CounselWizard>
  );
}
