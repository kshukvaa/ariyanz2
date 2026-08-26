'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { wizardExpert, wizardTrust, wizardHelp } from '@/data/counseling/wizards';

/* ──────────────────────────────────────────────────────────────
   The frame the four counselling wizards share.

   RTL: the first declared grid column lands on the RIGHT, so the
   agent rail is declared first and the benefits card last — which
   is how all four mockups place them.

   The stepper runs right-to-left too: step ۱ is the rightmost
   dot. Rendering it in DOM order under `direction: rtl` gives
   that for free, but it is easy to "fix" into being wrong, hence
   this note.
────────────────────────────────────────────────────────────── */

export function WizardCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

export function StepHeading({ title, icon }: { title: string; icon: string }) {
  return (
    <h2 className="flex items-center justify-end gap-2.5 text-[14px] font-extrabold" style={{ color: T.ink }}>
      {title}
      <span
        className="w-8 h-8 flex items-center justify-center shrink-0"
        style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
      >
        <Icon name={icon} size={15} style={{ backgroundColor: T.primary }} />
      </span>
    </h2>
  );
}

/* ── Expert header ────────────────────────────────────────────── */

function ExpertHeader({
  lead,
  pill,
  aside,
  headerRail,
}: {
  lead: string;
  pill?: string;
  aside: React.ReactNode;
  headerRail: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[250px_1fr_250px] items-start">
      {/* Header rail declared first → right. */}
      <div className="order-1">{headerRail}</div>

      <div className="order-2 flex items-center gap-6 flex-wrap justify-center">
        <div className="relative shrink-0 order-1">
          <img
            src={wizardExpert.avatar}
            alt=""
            className="w-[130px] h-[150px] object-cover"
            style={{ borderRadius: R.lg }}
          />
          <span
            className="absolute -bottom-2 inset-x-0 mx-auto w-max px-3 py-1.5 text-[9.5px] font-bold text-white whitespace-nowrap"
            style={{ borderRadius: R.pill, backgroundColor: '#1c8a4e' }}
          >
            {pill ?? wizardExpert.pill}
          </span>
        </div>

        <div className="flex-1 min-w-[220px] text-center order-2">
          <p className="text-[12px]" style={{ color: T.primary }}>
            {lead}
          </p>
          <h1 className="mt-1.5 flex items-center justify-center gap-2.5 text-[26px] font-extrabold" style={{ color: T.ink }}>
            {wizardExpert.name}
            <Icon name="lucide:badge-check" size={20} style={{ backgroundColor: T.primary }} />
          </h1>
          <p className="mt-1.5 text-[13px]" style={{ color: T.ink }}>
            {wizardExpert.title}
          </p>

          <ul className="mt-4 flex items-start justify-center gap-8 flex-wrap">
            {wizardExpert.stats.map((s, i) => (
              <li
                key={s.label}
                className="px-5 text-center"
                style={{ borderInlineEnd: i < wizardExpert.stats.length - 1 ? `1px solid ${T.border}` : undefined }}
              >
                <span className="flex items-center justify-center gap-1.5 text-[17px] font-extrabold" style={{ color: T.ink }}>
                  {s.value}
                  {s.star && <Icon name="lucide:star" size={15} style={{ backgroundColor: '#f5a524' }} />}
                </span>
                <span className="mt-1 block text-[10px]" style={{ color: T.muted }}>
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="order-3">{aside}</div>
    </div>
  );
}

/* ── Horizontal stepper ───────────────────────────────────────── */

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-start justify-between gap-1 overflow-x-auto pb-1">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = n < current;
        const on = n === current;
        return (
          <li key={s} className="flex items-center gap-1 flex-1 min-w-[110px]">
            {i > 0 && (
              <span
                className="flex-1 h-[2px] mt-[-22px]"
                style={{ backgroundColor: n <= current ? T.primary : T.border }}
              />
            )}
            <span className="text-center shrink-0">
              <span
                className="mx-auto w-8 h-8 flex items-center justify-center text-[12px] font-bold"
                style={{
                  borderRadius: '999px',
                  backgroundColor: on || done ? T.primary : '#e6e6ee',
                  color: on || done ? '#ffffff' : T.muted,
                }}
              >
                {done ? <Icon name="lucide:check" size={14} style={{ backgroundColor: '#ffffff' }} /> : '۱۲۳۴'[i]}
              </span>
              <span
                className="mt-2 block text-[10.5px] whitespace-nowrap"
                style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
              >
                {s}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Vertical stepper (rail variant) ──────────────────────────── */

export function RailSteps({ title, steps, current }: { title: string; steps: string[]; current: number }) {
  return (
    <WizardCard>
      <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
        {title}
        <Icon name="lucide:sparkles" size={14} style={{ backgroundColor: T.violet }} />
      </h2>

      <ol className="mt-3.5 space-y-0">
        {steps.map((s, i, all) => {
          const n = i + 1;
          const done = n < current;
          const on = n === current;
          return (
            <li key={s} className="flex items-start gap-2.5">
              <span className="flex flex-col items-center shrink-0">
                <span
                  className="w-6 h-6 flex items-center justify-center text-[10px] font-bold"
                  style={{
                    borderRadius: '999px',
                    backgroundColor: done ? '#1c8a4e' : on ? T.primary : '#ececf3',
                    color: done || on ? '#ffffff' : T.muted,
                  }}
                >
                  {done ? <Icon name="lucide:check" size={11} style={{ backgroundColor: '#ffffff' }} /> : '۱۲۳۴'[i]}
                </span>
                {i < all.length - 1 && (
                  <span className="w-[2px] h-6" style={{ backgroundColor: done ? '#1c8a4e' : T.border }} />
                )}
              </span>

              <span
                className="flex-1 text-right text-[11.5px] -mt-0.5 pb-2"
                style={{ color: on ? T.primary : done ? '#1c8a4e' : T.muted, fontWeight: on ? 800 : 600 }}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>
    </WizardCard>
  );
}

/* ── Agent panel ──────────────────────────────────────────────── */

export function AgentPanel({
  title,
  bubble,
  chips,
  placeholder = 'سوال خود را بنویسید.',
}: {
  title: string;
  bubble: string;
  chips: string[];
  placeholder?: string;
}) {
  return (
    <section className="p-4" style={{ borderRadius: R.lg, backgroundColor: '#f6f4fe' }}>
      <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
        {title}
        <Icon name="lucide:sparkles" size={14} style={{ backgroundColor: T.violet }} />
      </h2>

      <div className="mt-3.5 flex items-start gap-2">
        <p
          className="flex-1 p-3 text-right text-[10.5px] leading-6 bg-white"
          style={{ borderRadius: R.md, color: T.ink }}
        >
          {bubble}
        </p>
        <img
          src="/images/aryaz/illustrations/ai-assistant-avatar.png"
          alt=""
          className="w-16 h-16 object-contain shrink-0"
        />
      </div>

      <ul className="mt-3 space-y-2">
        {chips.map((c) => (
          <li key={c}>
            <button
              className="w-full flex items-center gap-2 px-3.5 py-2.5 text-right bg-white transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md }}
            >
              <span className="flex-1 text-[10.5px] font-bold" style={{ color: T.ink }}>
                {c}
              </span>
              <Icon name="lucide:message-circle" size={13} className="shrink-0" style={{ backgroundColor: T.primary }} />
            </button>
          </li>
        ))}
      </ul>

      <label className="mt-3 flex items-center gap-2.5 px-3 py-2.5 bg-white" style={{ borderRadius: R.md }}>
        <button
          aria-label="ارسال"
          className="w-9 h-9 flex items-center justify-center shrink-0"
          style={{ borderRadius: R.sm, backgroundColor: T.primary }}
        >
          <Icon name="lucide:send" size={14} style={{ backgroundColor: '#ffffff' }} />
        </button>
        <input
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
          style={{ color: T.ink }}
        />
      </label>
    </section>
  );
}

/* ── Benefits card ────────────────────────────────────────────── */

export function BenefitsCard({
  title,
  icon,
  items,
  more,
}: {
  title: string;
  icon: string;
  items: string[];
  more?: string;
}) {
  return (
    <WizardCard>
      <h2 className="flex items-center justify-end gap-2.5 text-[13px] font-extrabold" style={{ color: T.ink }}>
        {title}
        <span
          className="w-10 h-10 flex items-center justify-center shrink-0"
          style={{ borderRadius: '999px', backgroundColor: T.tintPurple }}
        >
          <Icon name={icon} size={18} style={{ backgroundColor: T.primary }} />
        </span>
      </h2>

      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2.5">
            <span className="flex-1 text-right text-[11px] font-bold" style={{ color: T.ink }}>
              {it}
            </span>
            <Icon name="lucide:circle-check" size={15} className="shrink-0" style={{ backgroundColor: T.primary }} />
          </li>
        ))}
      </ul>

      {more && (
        <button className="mt-4 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
          <Icon name="lucide:circle-alert" size={12} style={{ backgroundColor: T.primary }} />
          {more}
        </button>
      )}
    </WizardCard>
  );
}

/* ── Trust + help (rail foot) ─────────────────────────────────── */

export function TrustPanel() {
  return (
    <>
      <WizardCard>
        <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
          {wizardTrust.title}
          <Icon name={wizardTrust.icon} size={15} style={{ backgroundColor: T.primary }} />
        </h2>

        <ul className="mt-3.5 space-y-3">
          {wizardTrust.items.map((it) => (
            <li key={it.label} className="flex items-start gap-2.5">
              <span className="flex-1 text-right text-[10.5px] font-bold leading-6" style={{ color: T.ink }}>
                {it.label}
              </span>
              <Icon name={it.icon} size={14} className="mt-0.5 shrink-0" style={{ backgroundColor: T.primary }} />
            </li>
          ))}
        </ul>
      </WizardCard>

      <WizardCard>
        <div className="flex items-start gap-3">
          <div className="flex-1 text-right min-w-0">
            <h2 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
              {wizardHelp.title}
            </h2>
            <p className="mt-2 text-[10.5px] leading-6" style={{ color: T.muted }}>
              {wizardHelp.desc}
            </p>
            <p className="mt-2.5 flex items-center justify-end gap-1.5 text-[11.5px] font-bold" style={{ color: T.ink }} dir="ltr">
              {wizardHelp.phone}
              <Icon name="lucide:phone" size={13} style={{ backgroundColor: T.primary }} />
            </p>
          </div>
          <Icon name={wizardHelp.icon} size={34} className="shrink-0" style={{ backgroundColor: T.primary }} />
        </div>
      </WizardCard>
    </>
  );
}

/* ── The shell ────────────────────────────────────────────────── */

export default function CounselWizard({
  lead,
  pill,
  steps,
  current,
  aside,
  headerRail,
  rail,
  footer,
  children,
}: {
  lead: string;
  pill?: string;
  steps: string[];
  current: number;
  aside: React.ReactNode;
  headerRail: React.ReactNode;
  rail: React.ReactNode;
  footer: {
    next: { label: string; icon: string };
    back: { label: string; icon: string; href: string };
  };
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: '#fbfbfe' }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        <WizardCard>
          <ExpertHeader lead={lead} pill={pill} aside={aside} headerRail={headerRail} />
        </WizardCard>

        <div className="grid gap-5 xl:grid-cols-[300px_1fr] items-start">
          {/* Rail declared first → right. */}
          <div className="space-y-4 xl:sticky xl:top-4">{rail}</div>

          <main className="min-w-0 space-y-5">
            <div className="px-2">
              <Stepper steps={steps} current={current} />
            </div>

            {children}

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <button
                className="flex items-center gap-2 px-10 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: T.primary }}
              >
                {footer.next.label}
                <Icon name={footer.next.icon} size={14} style={{ backgroundColor: '#ffffff' }} />
              </button>

              <Link
                href={footer.back.href}
                className="flex items-center gap-2 px-7 py-3.5 text-[12px] font-bold bg-white"
                style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                {footer.back.label}
                <Icon name={footer.back.icon} size={14} style={{ backgroundColor: T.primary }} />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
