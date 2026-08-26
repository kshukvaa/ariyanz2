'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import {
  Panel,
  PanelHead,
  TextField,
  SelectField,
  MiniSelect,
  SearchField,
  Check,
  Radio,
  Toggle,
  NoteCard,
  Label,
} from '@/components/org/panel/Field';
import {
  wizardHead,
  wizardSteps,
  wizardSummaryTitle,
  wizardNoteTitle,
  step1,
  step1Guide,
  step2,
  step3,
  step4,
  step5,
} from '@/data/orgAssessmentWizard';

/* ──────────────────────────────────────────────────────────────
   Create assessment — a five-step walkthrough.

   The rail across the top is the map; the column beside the work
   is the same map vertically, showing what is done and what is
   still owed. Step one swaps that column for a guide, because at
   that point there is no progress to summarise yet — which is
   exactly how the mockups treat it.
────────────────────────────────────────────────────────────── */

export default function AssessmentWizardClient() {
  const [step, setStep] = useState(0);
  const last = wizardSteps.length - 1;

  return (
    <div className="space-y-5">
      {/* ── Head ──────────────────────────────────────────────── */}
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <Link
          href="/org/assessments"
          className="flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:x" size={15} style={{ backgroundColor: T.muted }} />
          {wizardHead.exit}
        </Link>

        <div className="text-right">
          <nav className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            {wizardHead.crumb.map((c, i) => (
              <React.Fragment key={c.href}>
                {i > 0 && <Icon name="lucide:chevron-left" size={13} style={{ backgroundColor: T.muted }} />}
                <Link href={c.href} className="hover:opacity-70">
                  {c.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
          <h1 className="mt-1 text-[26px] font-extrabold" style={{ color: T.ink }}>
            {wizardHead.title}
          </h1>
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {step === last ? step5.lead : wizardHead.desc}
          </p>
        </div>
      </div>

      {/* ── Step rail ─────────────────────────────────────────── */}
      <Panel className="p-6">
        <ol className="flex items-start gap-2">
          {wizardSteps.map((s, i) => {
            const done = i < step;
            const on = i === step;
            return (
              <li key={s.id} className="flex-1 min-w-0 relative">
                {i < wizardSteps.length - 1 && (
                  /* The connector sits behind the discs and stops short of
                     them, so it reads as a track rather than a strikethrough.
                     RTL puts the next step to the LEFT, so the segment hangs
                     off this item's left side — inset-inline keeps that true
                     without hard-coding a direction. */
                  <span
                    className="absolute top-[19px] h-[2px]"
                    style={{
                      insetInlineStart: 'calc(50% + 22px)',
                      insetInlineEnd: 'calc(-50% + 22px)',
                      backgroundColor: done ? T.success : T.border,
                    }}
                  />
                )}

                <button
                  onClick={() => setStep(i)}
                  className="relative w-full flex flex-col items-center gap-2 text-center"
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-extrabold shrink-0"
                    style={
                      done
                        ? { backgroundColor: T.success, color: '#fff' }
                        : on
                          ? { backgroundColor: T.primaryStrong, color: '#fff' }
                          : { backgroundColor: '#fff', color: T.muted, border: `2px solid ${T.border}` }
                    }
                  >
                    {done ? <Icon name="lucide:check" size={17} className="text-white" /> : s.n}
                  </span>
                  <span className="min-w-0">
                    <span
                      className="block text-[12.5px] font-extrabold truncate"
                      style={{ color: on || done ? T.ink : T.muted }}
                    >
                      {s.label}
                    </span>
                    <span className="block text-[10.5px] truncate" style={{ color: T.muted }}>
                      {s.hint}
                    </span>
                  </span>
                  {on && (
                    <span
                      className="absolute -bottom-[25px] inset-x-4 h-[3px] rounded-full"
                      style={{ backgroundColor: T.primaryStrong }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </Panel>

      {/* ── Body ──────────────────────────────────────────────── */}
      {step === 0 ? (
        /* Step one puts the work on the right and the guide on the
           left; every later step swaps in the progress summary. */
        <div className="grid gap-4 lg:grid-cols-[1fr_340px] items-start">
          <Step1 />
          <Guide />
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr] items-start">
          <Summary step={step} />
          <div className="min-w-0">
            {step === 1 && <Step2 />}
            {step === 2 && <Step3 />}
            {step === 3 && <Step4 />}
            {step === 4 && <Step5 />}
          </div>
        </div>
      )}

      {/* ── Footer ────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap justify-between">
        <button
          className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:bookmark" size={16} style={{ backgroundColor: T.muted }} />
          {step === last ? step5.saveDraft : wizardHead.draft}
        </button>

        <div className="flex items-center gap-2.5">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:arrow-right" size={16} style={{ backgroundColor: T.muted }} />
              {wizardHead.back}: {wizardSteps[step - 1].label}
            </button>
          )}

          <button
            onClick={() => step < last && setStep(step + 1)}
            data-ripple
            className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{
              borderRadius: R.md,
              backgroundColor: step === last ? T.primaryStrong : T.primaryStrong,
            }}
          >
            <Icon
              name={step === last ? 'lucide:rocket' : 'lucide:arrow-left'}
              size={16}
              className="text-white"
            />
            {step === last ? step5.publish : wizardSteps[step + 1].next}
          </button>
        </div>
      </div>

      {step === last && (
        <p className="flex items-center justify-center gap-1.5 text-[11px]" style={{ color: T.muted }}>
          <Icon name="lucide:circle-alert" size={13} style={{ backgroundColor: T.muted }} />
          {step5.foot}
        </p>
      )}
    </div>
  );
}

/* ══ Sidebars ═══════════════════════════════════════════════════ */

function Summary({ step }: { step: number }) {
  const last = wizardSteps.length - 1;

  return (
    <div className="space-y-4">
      <Panel className="p-5">
        <h2 className="text-right text-[14px] font-extrabold" style={{ color: T.ink }}>
          {step === last ? step5.summaryTitle : wizardSummaryTitle}
        </h2>

        <ol className="mt-4 space-y-1">
          {wizardSteps.map((s, i) => {
            const done = i < step;
            const on = i === step;
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
                        ? { backgroundColor: T.primaryStrong, color: '#fff' }
                        : { backgroundColor: '#fff', color: T.muted, border: `1.5px solid ${T.border}` }
                  }
                >
                  {done ? <Icon name="lucide:check" size={15} style={{ backgroundColor: T.successStrong }} /> : s.n}
                </span>
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[12.5px] font-bold truncate" style={{ color: T.ink }}>
                    {s.label}
                  </span>
                  <span className="block text-[10.5px]" style={{ color: on ? T.primary : T.muted }}>
                    {done ? 'تکمیل شده' : on ? 'در حال انجام' : 'در انتظار'}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </Panel>

      {step === 2 && (
        <Panel className="p-5">
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {step3.yourPick.title}
          </h3>
          <dl className="mt-3 space-y-2.5">
            {step3.yourPick.rows.map((r) => (
              <div key={r.k} className="flex items-center justify-between text-[11.5px]">
                <dd className="font-bold" style={{ color: T.ink }}>{r.v}</dd>
                <dt style={{ color: T.muted }}>{r.k}</dt>
              </div>
            ))}
          </dl>
        </Panel>
      )}

      {step === 3 && (
        <Panel className="p-5">
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {step4.key.title}
          </h3>
          <dl className="mt-3 space-y-3">
            {step4.key.rows.map((r) => (
              <div key={r.k} className="flex items-center justify-between gap-2 text-[11.5px]">
                <dd className="font-bold" style={{ color: T.ink }}>{r.v}</dd>
                <dt className="flex items-center gap-2" style={{ color: T.muted }}>
                  {r.k}
                  <Icon name={r.icon} size={15} style={{ backgroundColor: T.muted }} />
                </dt>
              </div>
            ))}
          </dl>
        </Panel>
      )}

      {step === 4 && (
        <Panel className="p-5">
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {step5.after.title}
          </h3>
          <ul className="mt-3 space-y-2.5">
            {step5.after.items.map((a) => (
              <li key={a.label} className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
                >
                  <Icon name={a.icon} size={15} style={{ backgroundColor: T.primary }} />
                </span>
                <span className="flex-1 text-right text-[11.5px] font-semibold" style={{ color: T.ink }}>
                  {a.label}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {(step === 1 || step === 2) && (
        <NoteCard title={wizardNoteTitle}>
          {step === 1 ? step2.note : step3.note}
        </NoteCard>
      )}
    </div>
  );
}

function Guide() {
  return (
    <div className="space-y-3">
      <div className="p-5 text-center" style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}>
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-[14px] font-extrabold" style={{ color: T.primary }}>
            {step1Guide.title}
          </h2>
          <Icon name="lucide:lightbulb" size={17} style={{ backgroundColor: T.primary }} />
        </div>
        <p className="mt-1.5 text-[12px] font-semibold" style={{ color: T.ink }}>
          {step1Guide.lead}
        </p>
        <img src={step1Guide.art} alt="" className="mt-3 w-full max-w-[230px] mx-auto" />
      </div>

      {step1Guide.notes.map((n) => (
        <div
          key={n.title}
          className="flex items-start gap-3 bg-white p-3.5"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <div className="flex-1 text-right">
            <h3 className="text-[12px] font-extrabold" style={{ color: T.ink }}>
              {n.title}
            </h3>
            <p className="mt-1 text-[10.5px] leading-5" style={{ color: T.muted }}>
              {n.desc}
            </p>
          </div>
          <span
            className="w-9 h-9 flex items-center justify-center shrink-0"
            style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
          >
            <Icon name={n.icon} size={17} style={{ backgroundColor: T.primary }} />
          </span>
        </div>
      ))}

      <div className="p-4" style={{ borderRadius: R.lg, backgroundColor: T.tintBlue }}>
        <div className="flex items-start gap-3">
          <div className="flex-1 text-right">
            <h3 className="text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {step1Guide.support.title}
            </h3>
            <p className="mt-1 text-[10.5px] leading-5" style={{ color: T.muted }}>
              {step1Guide.support.desc}
            </p>
            <button
              className="mt-2 flex items-center gap-1.5 text-[11.5px] font-bold"
              style={{ color: T.infoStrong }}
            >
              {step1Guide.support.action}
              <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: T.infoStrong }} />
            </button>
          </div>
          <span
            className="w-10 h-10 flex items-center justify-center shrink-0 bg-white"
            style={{ borderRadius: R.sm }}
          >
            <Icon name="lucide:headphones" size={18} style={{ backgroundColor: T.infoStrong }} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══ Steps ══════════════════════════════════════════════════════ */

function Step1() {
  return (
    <Panel>
      <PanelHead title={step1.title} desc={step1.desc} icon="lucide:clipboard-check" />

      <div className="px-5 pb-5 space-y-4">
        <TextField
          label={step1.name.label}
          placeholder={step1.name.placeholder}
          counter={step1.name.counter}
          required
        />
        <TextField
          label={step1.about.label}
          placeholder={step1.about.placeholder}
          counter={step1.about.counter}
          rows={4}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label={step1.type.label} value={step1.type.value} required />
          <SelectField label={step1.goal.label} value={step1.goal.value} required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{step1.state.label}</Label>
            <div className="flex items-center gap-2.5">
              {step1.state.options.map((o, i) => (
                <button
                  key={o.id}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-[12.5px] font-bold"
                  style={{
                    borderRadius: R.md,
                    border: `1px solid ${i === 0 ? T.primaryStrong : T.border}`,
                    color: T.ink,
                    backgroundColor: '#fff',
                  }}
                >
                  {i === 0 && <Radio on />}
                  {o.label}
                  {i !== 0 && <Icon name={o.icon} size={15} style={{ backgroundColor: T.muted }} />}
                </button>
              ))}
            </div>
          </div>

          <SelectField label={step1.period.label} value={step1.period.value} icon="lucide:calendar" />
        </div>

        {/* The one nudge on this step, and the only tinted strip — it
            offers a shortcut that skips most of the remaining work. */}
        <div
          className="flex items-center gap-3 p-3.5 flex-wrap"
          style={{ borderRadius: R.md, backgroundColor: T.tintBlue }}
        >
          <button
            className="flex items-center gap-2 bg-white px-4 py-2.5 text-[12px] font-bold"
            style={{ borderRadius: R.sm, border: `1px solid #cfe0fb`, color: T.infoStrong }}
          >
            <Icon name="lucide:package-open" size={15} style={{ backgroundColor: T.infoStrong }} />
            {step1.hint.action}
          </button>
          <p className="flex-1 text-right text-[12px] font-semibold min-w-[200px]" style={{ color: T.ink }}>
            {step1.hint.text}
          </p>
          <Icon name="lucide:sparkles" size={18} style={{ backgroundColor: T.violet }} />
        </div>

        <div className="space-y-2">
          <Label>{step1.owner.label}</Label>
          <span
            className="flex items-center gap-3 bg-white px-4 py-2.5"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name="lucide:chevron-down" size={15} style={{ backgroundColor: T.muted }} />
            <span className="flex-1 text-right leading-tight">
              <span className="block text-[12.5px] font-bold" style={{ color: T.ink }}>
                {step1.owner.name}
              </span>
              <span className="block text-[10.5px]" style={{ color: T.muted }}>
                {step1.owner.role}
              </span>
            </span>
            <img src={step1.owner.avatar} alt="" className="w-9 h-9 rounded-lg object-cover" />
          </span>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold mr-auto"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
          {step1.advanced}
          <Icon name="lucide:settings" size={15} style={{ backgroundColor: T.muted }} />
        </button>
      </div>
    </Panel>
  );
}

function Step2() {
  return (
    <Panel>
      <PanelHead title={step2.title} desc={step2.desc} />

      <div className="px-5 pb-5 space-y-4">
        <div className="flex items-center gap-2.5 justify-center flex-wrap">
          {step2.modes.map((m, i) => (
            <button
              key={m.id}
              className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold"
              style={
                i === 0
                  ? { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                  : { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink, backgroundColor: '#fff' }
              }
            >
              <Icon
                name={m.icon}
                size={16}
                style={{ backgroundColor: i === 0 ? '#fff' : T.muted }}
              />
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <SearchField placeholder="جستجو در گروه‌ها و واحدها..." />
          <MiniSelect label="موقعیت شغلی" />
          <MiniSelect label="همه واحدها" hint="واحد سازمانی" />
          <MiniSelect label="همه" hint="وضعیت" />
          <button
            className="flex items-center gap-2 px-3.5 py-2.5 text-[12px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
          >
            <Icon name="lucide:funnel" size={14} style={{ backgroundColor: T.primary }} />
            پاک کردن فیلترها
          </button>
        </div>

        <div style={{ borderRadius: R.md, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
          <table className="w-full text-right">
            <thead>
              <tr style={{ backgroundColor: '#fbfbfd' }}>
                {step2.columns.map((c, i) => (
                  <th
                    key={c}
                    className="px-4 py-3 text-[11.5px] font-bold"
                    style={{ color: T.muted, textAlign: i === 0 ? 'right' : i === 1 ? 'center' : 'left' }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {step2.rows.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2.5">
                      <Check on={r.on} />
                      <Icon name={r.icon} size={17} style={{ backgroundColor: T.primary }} />
                      <span className="text-[12.5px] font-bold" style={{ color: T.ink }}>
                        {r.label}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-[12px] font-semibold" style={{ color: T.ink }}>
                    {r.count}
                  </td>
                  <td className="px-4 py-3 text-left">
                    <button
                      className="px-4 py-2 text-[11.5px] font-bold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                    >
                      جزئیات
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="flex items-center justify-center gap-2 py-3.5"
            style={{ backgroundColor: T.tintPurple }}
          >
            <span className="text-[12.5px] font-bold" style={{ color: T.ink }}>
              {step2.total.label}
            </span>
            <span className="text-[12.5px] font-extrabold" style={{ color: T.primary }}>
              {step2.total.value}
            </span>
            <Icon name="lucide:users-round" size={16} style={{ backgroundColor: T.primary }} />
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Step3() {
  return (
    <Panel>
      <PanelHead title={step3.title} desc={step3.desc} />

      <div className="px-5 pb-5 space-y-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <SearchField placeholder="جستجو در آزمون‌ها..." />
          <MiniSelect label="فارسی" hint="زبان" />
          <MiniSelect label="همه انواع" hint="نوع ابزار" />
          <MiniSelect label="همه دسته‌ها" hint="دسته‌بندی" />
          <button
            className="flex items-center gap-2 px-3.5 py-2.5 text-[12px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
          >
            <Icon name="lucide:funnel" size={14} style={{ backgroundColor: T.primary }} />
            پاک کردن فیلترها
          </button>
        </div>

        <div className="flex items-center" style={{ borderBottom: `1px solid ${T.border}` }}>
          {step3.tabs.map((t, i) => (
            <button
              key={t.id}
              className="relative flex-1 py-3 text-[12.5px]"
              style={{ color: i === 1 ? T.primary : T.muted, fontWeight: i === 1 ? 800 : 600 }}
            >
              {t.label}
              {i === 1 && (
                <span
                  className="absolute -bottom-px inset-x-0 h-[2.5px] rounded-full"
                  style={{ backgroundColor: T.primary }}
                />
              )}
            </button>
          ))}
        </div>

        <div style={{ borderRadius: R.md, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
          <table className="w-full text-right">
            <thead>
              <tr style={{ backgroundColor: '#fbfbfd' }}>
                {step3.columns.map((c, i) => (
                  <th
                    key={c}
                    className="px-4 py-3 text-[11.5px] font-bold whitespace-nowrap"
                    style={{ color: T.muted, textAlign: i === 0 ? 'right' : i === 4 ? 'left' : 'center' }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {step3.rows.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3">
                      <img src={r.icon} alt="" className="w-10 h-10 object-contain shrink-0" />
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-extrabold truncate" style={{ color: T.ink }}>
                          {r.title}
                        </span>
                        <span className="block text-[10.5px] truncate" style={{ color: T.muted }}>
                          {r.desc}
                        </span>
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="inline-block px-2.5 py-1 text-[10.5px] font-bold whitespace-nowrap"
                      style={{ borderRadius: R.pill, backgroundColor: r.catBg, color: r.catFg }}
                    >
                      {r.cat}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-[11.5px]" style={{ color: T.ink }}>
                    {r.kind}
                  </td>
                  <td className="px-4 py-3 text-center text-[11.5px]" style={{ color: T.ink }}>
                    {r.time}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2 justify-start">
                      <Check on={r.on} />
                      <button
                        aria-label="عملیات"
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                      >
                        <Icon name="lucide:ellipsis" size={15} style={{ backgroundColor: T.muted }} />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="flex items-center gap-3 px-4 py-3.5"
            style={{ backgroundColor: T.tintPurple }}
          >
            <span
              className="w-10 h-10 flex items-center justify-center shrink-0 bg-white"
              style={{ borderRadius: R.sm }}
            >
              <Icon name="lucide:clipboard-check" size={18} style={{ backgroundColor: T.primary }} />
            </span>
            <span className="flex-1 text-right">
              <span className="block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {step3.picked.count} {step3.picked.label}
              </span>
              <span className="block text-[10.5px]" style={{ color: T.muted }}>
                {step3.picked.time}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Step4() {
  return (
    <div className="space-y-4">
      <Panel>
        <PanelHead title={step4.title} desc={step4.desc} />

        <div className="px-5 pb-5">
          <div className="p-4" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
            <Label required>{step4.window.label}</Label>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {[step4.window.start, step4.window.end].map((w) => (
                <div key={w.label} className="space-y-1.5">
                  <span className="block text-right text-[11px]" style={{ color: T.muted }}>
                    {w.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="flex items-center gap-2 px-3 py-2.5 text-[12px] font-semibold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                    >
                      {w.time}
                      <Icon name="lucide:clock" size={14} style={{ backgroundColor: T.muted }} />
                    </span>
                    <span
                      className="flex-1 flex items-center gap-2 px-3 py-2.5 text-[12px] font-semibold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                    >
                      <span className="flex-1 text-right">{w.date}</span>
                      <Icon name="lucide:calendar" size={14} style={{ backgroundColor: T.muted }} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 flex items-center justify-end gap-1.5 text-[11px]" style={{ color: T.muted }}>
              {step4.window.note}
              <Icon name="lucide:circle-alert" size={13} style={{ backgroundColor: T.muted }} />
            </p>
          </div>
        </div>
      </Panel>

      {/* Three across only from xl: below that the rail and the summary
          have already taken most of the width, and the columns would be
          too narrow to hold their labels on one line. */}
      <div className="grid gap-4 xl:grid-cols-3 items-start">
        {/* Privacy first in DOM so it lands on the right, matching the
            mockup's ordering of these three columns. */}
        <Panel className="p-5">
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {step4.privacy.title}
          </h3>

          <div className="mt-4 space-y-3.5">
            <div className="space-y-1.5">
              <span className="block text-right text-[11.5px]" style={{ color: T.muted }}>
                {step4.privacy.nameLabel}
              </span>
              <span
                className="flex items-center gap-2 px-3.5 py-2.5"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
              >
                <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
                <span className="flex-1 text-right text-[12px] font-semibold" style={{ color: T.ink }}>
                  {step4.privacy.nameValue}
                </span>
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="block text-right text-[11.5px]" style={{ color: T.muted }}>
                {step4.privacy.resultLabel}
              </span>
              <span
                className="flex items-center gap-2 px-3.5 py-2.5"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
              >
                <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
                <span className="flex-1 text-right text-[12px] font-semibold" style={{ color: T.ink }}>
                  {step4.privacy.resultValue}
                </span>
              </span>
            </div>

            <NoteCard
              title={step4.privacy.confidential.title}
              icon="lucide:lock-keyhole"
              tint={T.tintPurple}
              fg={T.primary}
            >
              {step4.privacy.confidential.desc}
            </NoteCard>

            <NoteCard title="نکته" icon="lucide:circle-alert" tint="#f7f7fb" fg={T.ink}>
              {step4.privacy.note}
            </NoteCard>
          </div>
        </Panel>

        <Panel className="p-5">
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {step4.options.title}
          </h3>

          <div className="mt-4 space-y-4">
            <div>
              <span className="block text-right text-[12px] font-bold" style={{ color: T.ink }}>
                {step4.options.orderTitle}
              </span>
              <div className="mt-2 space-y-2">
                {step4.options.order.map((o) => (
                  <label key={o.id} className="flex items-start gap-2.5">
                    <span className="flex-1 text-right">
                      <span className="block text-[11.5px] font-semibold" style={{ color: T.ink }}>
                        {o.label}
                      </span>
                      {o.desc && (
                        <span className="block text-[10px]" style={{ color: T.muted }}>
                          {o.desc}
                        </span>
                      )}
                    </span>
                    <Radio on={o.on} />
                  </label>
                ))}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${T.border}` }} className="pt-3.5">
              <span className="block text-right text-[12px] font-bold" style={{ color: T.ink }}>
                {step4.options.accessTitle}
              </span>
              <div className="mt-2 space-y-2">
                {step4.options.access.map((o) => (
                  <label key={o.id} className="flex items-start gap-2.5">
                    <span className="flex-1 text-right">
                      <span className="block text-[11.5px] font-semibold" style={{ color: T.ink }}>
                        {o.label}
                      </span>
                      <span className="block text-[10px]" style={{ color: T.muted }}>
                        {o.desc}
                      </span>
                    </span>
                    <Radio on={o.on} />
                  </label>
                ))}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${T.border}` }} className="pt-3.5">
              <span className="block text-right text-[12px] font-bold" style={{ color: T.ink }}>
                {step4.options.remindTitle}
              </span>
              <div className="mt-2 space-y-2">
                {step4.options.remind.map((o) => (
                  <label key={o.id} className="flex items-center gap-2.5">
                    <span className="flex-1 text-right text-[11.5px] font-semibold" style={{ color: T.ink }}>
                      {o.label}
                    </span>
                    <Check on={o.on} />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {step4.rules.title}
          </h3>

          <div className="mt-4 space-y-4">
            {step4.rules.items.map((r) => (
              <div key={r.id} className="flex items-start gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[12px] font-bold" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block mt-0.5 text-[10.5px] leading-5" style={{ color: T.muted }}>
                    {r.desc}
                  </span>
                </span>
                <Toggle on={r.on} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Step5() {
  return (
    <div className="space-y-4">
      <div
        className="flex items-center gap-3 p-4"
        style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}
      >
        <p className="flex-1 text-right text-[12px] font-semibold leading-6" style={{ color: T.ink }}>
          {step5.banner}
        </p>
        <Icon name="lucide:shield-check" size={20} style={{ backgroundColor: T.primary }} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 items-start">
        {step5.panels.map((p) => (
          <Panel key={p.id} className="p-4">
            <div className="flex items-center gap-2.5">
              <button
                className="px-3 py-1.5 text-[11px] font-bold"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
              >
                {step5.edit}
              </button>
              <h3 className="flex-1 text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {p.title}
              </h3>
              <span
                className="w-9 h-9 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.sm, backgroundColor: p.bg }}
              >
                <Icon name={p.icon} size={17} style={{ backgroundColor: p.fg }} />
              </span>
            </div>

            <dl className="mt-3.5 space-y-2.5">
              {'rows' in p &&
                p.rows?.map((r) => (
                  <div key={r.k} className="text-right">
                    <dt className="flex items-center justify-end gap-1.5 text-[11px] font-bold" style={{ color: T.ink }}>
                      {r.k}
                      <Icon name="lucide:check" size={12} style={{ backgroundColor: T.success }} />
                    </dt>
                    <dd className="mt-0.5 text-[11px] leading-5" style={{ color: T.muted }}>
                      {r.v}
                    </dd>
                  </div>
                ))}

              {'tests' in p &&
                p.tests?.map((t) => (
                  <div key={t.label} className="flex items-center gap-2">
                    <span
                      className="px-2 py-1 text-[10px] font-bold whitespace-nowrap"
                      style={{ borderRadius: R.sm, backgroundColor: T.tintGreen, color: T.successStrong }}
                    >
                      {t.time}
                    </span>
                    <span className="flex-1 text-right text-[11px] font-semibold" style={{ color: T.ink }}>
                      {t.label}
                    </span>
                    <Icon name="lucide:check" size={13} style={{ backgroundColor: T.success }} />
                  </div>
                ))}
            </dl>

            {'total' in p && p.total && (
              <div
                className="mt-3 pt-3 flex items-center justify-between"
                style={{ borderTop: `1px solid ${T.border}` }}
              >
                <span className="text-[12.5px] font-extrabold" style={{ color: T.primary }}>
                  {p.total.v}
                </span>
                <span className="text-[11.5px] font-bold" style={{ color: T.ink }}>
                  {p.total.k}
                </span>
              </div>
            )}
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 items-start">
        <Panel className="p-5">
          <div className="flex items-center gap-2.5">
            <h3 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
              {step5.preview.title}
            </h3>
            <Icon name="lucide:mail" size={18} style={{ backgroundColor: T.muted }} />
          </div>

          <div className="mt-3.5 space-y-1.5 text-right">
            {step5.preview.body.map((line) => (
              <p key={line} className="text-[11.5px] leading-6" style={{ color: T.ink }}>
                {line}
              </p>
            ))}
            <div className="pt-2 space-y-0.5">
              {step5.preview.sign.map((line) => (
                <p key={line} className="text-[11px]" style={{ color: T.muted }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="flex items-center gap-2.5">
            <h3 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
              {step5.checks.title}
            </h3>
            <Icon name="lucide:lightbulb" size={18} style={{ backgroundColor: T.accent }} />
          </div>

          <ul className="mt-3.5 space-y-3">
            {step5.checks.items.map((c) => (
              <li key={c} className="flex items-center gap-2.5">
                <span className="flex-1 text-right text-[11.5px] font-semibold" style={{ color: T.ink }}>
                  {c}
                </span>
                <Icon name="lucide:circle-check" size={16} style={{ backgroundColor: T.success }} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
