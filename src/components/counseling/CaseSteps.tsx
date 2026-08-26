'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { WizardCard, StepHeading } from './CounselWizard';
import { Field } from './WizardFields';
import { caseWizard } from '@/data/counseling/wizards';

/* ──────────────────────────────────────────────────────────────
   Case wizard steps 2 and 3 — «page 2» and «page 3».

   Step 2 collects; step 3 reports. Neither is a plain form, so
   both get their own primitives here rather than being bent into
   the shared Field list: an event table with per-row actions, a
   tabbed document library, a readiness dial and a checklist that
   distinguishes «present» from «still missing».
────────────────────────────────────────────────────────────── */

function GroupHeading({ title, icon }: { title: string; icon: string }) {
  return (
    <h3 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
      {title}
      <Icon name={icon} size={14} style={{ backgroundColor: T.primary }} />
    </h3>
  );
}

/* ── Step 2 ───────────────────────────────────────────────────── */

const FILE_TONE: Record<string, { bg: string; fg: string; label: string }> = {
  pdf: { bg: '#fdecec', fg: '#d93636', label: 'PDF' },
  xls: { bg: '#e8f7ec', fg: '#1c8a4e', label: 'XLS' },
};

export function CaseStep2() {
  const s = caseWizard.step2;
  const [tab, setTab] = useState(s.docs.tabs[0]);

  return (
    <WizardCard>
      <StepHeading title={s.title} icon={s.icon} />

      {/* 1. Base information. */}
      <div className="mt-5">
        <GroupHeading title={s.basics.title} icon={s.basics.icon} />
        <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {s.basics.fields.map((f) => (
            <Field key={f.label} spec={f} />
          ))}
        </div>
      </div>

      {/* 2. Case events. */}
      <div className="mt-6">
        <GroupHeading title={s.events.title} icon={s.events.icon} />

        <div className="mt-3.5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-right border-collapse">
            <thead>
              <tr>
                {s.events.columns.map((c) => (
                  <th
                    key={c}
                    className="px-3 py-2.5 text-[10px] font-bold whitespace-nowrap"
                    style={{ color: T.muted, borderBottom: `1px solid ${T.border}` }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.events.rows.map((r) => (
                <tr key={r.n}>
                  <td className="px-3 py-3 text-[10.5px]" style={{ color: T.muted, borderBottom: `1px solid ${T.border}` }}>
                    {r.n}
                  </td>
                  <td className="px-3 py-3 text-[10.5px] whitespace-nowrap" style={{ color: T.ink, borderBottom: `1px solid ${T.border}` }}>
                    {r.date}
                  </td>
                  <td className="px-3 py-3 text-[11px] font-bold" style={{ color: T.ink, borderBottom: `1px solid ${T.border}` }}>
                    {r.title}
                  </td>
                  <td className="px-3 py-3 text-[10px] leading-5" style={{ color: T.muted, borderBottom: `1px solid ${T.border}` }}>
                    {r.desc}
                  </td>
                  <td className="px-3 py-3 text-[10px] font-bold whitespace-nowrap" style={{ color: T.ink, borderBottom: `1px solid ${T.border}` }}>
                    {r.doc}
                  </td>
                  <td className="px-3 py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
                    <span className="flex items-center gap-2">
                      <button aria-label={`حذف ${r.title}`}>
                        <Icon name="lucide:trash-2" size={13} style={{ backgroundColor: T.danger }} />
                      </button>
                      <button aria-label={`پیوست ${r.title}`}>
                        <Icon name="lucide:paperclip" size={13} style={{ backgroundColor: T.primary }} />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="mt-3.5 mx-auto flex items-center gap-1.5 px-6 py-2.5 text-[11px] font-bold"
          style={{ borderRadius: R.md, border: `1px dashed ${T.primary}`, color: T.primary }}
        >
          <Icon name="lucide:plus" size={12} style={{ backgroundColor: T.primary }} />
          {s.events.add}
        </button>
      </div>

      {/* 3. Documents. */}
      <div className="mt-6">
        <GroupHeading title={s.docs.title} icon={s.docs.icon} />

        <div className="mt-3.5 flex items-center justify-between gap-3 flex-wrap">
          <span className="text-[9.5px]" style={{ color: T.muted }}>
            {s.docs.limit}
          </span>
          <ul className="flex items-center gap-1.5 flex-wrap">
            {s.docs.tabs.map((t) => {
              const on = t === tab;
              return (
                <li key={t}>
                  <button
                    onClick={() => setTab(t)}
                    aria-pressed={on}
                    className="px-3 py-1.5 text-[10px] font-bold"
                    style={{
                      borderRadius: R.pill,
                      backgroundColor: on ? T.primary : '#f5f4fb',
                      color: on ? '#ffffff' : T.ink,
                    }}
                  >
                    {t}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1fr_300px] items-start">
          {/* File list declared first → right. */}
          <ul className="space-y-2.5 order-1">
            {s.docs.files
              .filter((f) => tab === s.docs.tabs[0] || f.cat === tab)
              .map((f) => {
                const tone = FILE_TONE[f.type] ?? FILE_TONE.pdf;
                return (
                  <li
                    key={f.name}
                    className="flex items-center gap-3 p-2.5"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                  >
                    <span
                      className="w-8 h-9 flex items-center justify-center text-[8px] font-extrabold shrink-0"
                      style={{ borderRadius: R.sm, backgroundColor: tone.bg, color: tone.fg }}
                    >
                      {tone.label}
                    </span>
                    <span className="flex-1 min-w-0 text-right">
                      <span className="block text-[11px] font-bold truncate" style={{ color: T.ink }}>
                        {f.name}
                      </span>
                      <span className="block text-[9px]" style={{ color: T.muted }} dir="ltr">
                        {f.size}
                      </span>
                    </span>
                    <span
                      className="px-2.5 py-1 text-[9px] font-bold shrink-0"
                      style={{ borderRadius: R.pill, backgroundColor: '#f5f4fb', color: T.ink }}
                    >
                      {f.cat}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <button aria-label={`مشاهده ${f.name}`}>
                        <Icon name="lucide:eye" size={13} style={{ backgroundColor: T.muted }} />
                      </button>
                      <button aria-label={`پیوست ${f.name}`}>
                        <Icon name="lucide:paperclip" size={13} style={{ backgroundColor: T.primary }} />
                      </button>
                      <button aria-label={`حذف ${f.name}`}>
                        <Icon name="lucide:trash-2" size={13} style={{ backgroundColor: T.danger }} />
                      </button>
                    </span>
                  </li>
                );
              })}

            <li className="pt-1 text-center">
              <button className="inline-flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
                <Icon name="lucide:folder-open" size={12} style={{ backgroundColor: T.primary }} />
                {s.docs.all}
              </button>
            </li>
          </ul>

          {/* Dropzone declared last → left. */}
          <div
            className="order-2 p-6 text-center"
            style={{ borderRadius: R.md, border: `1.5px dashed #c9c3ea`, backgroundColor: '#fcfbff' }}
          >
            <Icon name="lucide:upload-cloud" size={30} style={{ backgroundColor: T.primary }} />
            <p className="mt-2.5 text-[11.5px] font-extrabold" style={{ color: T.ink }}>
              {s.docs.drop.title}
            </p>
            <button className="mt-1 text-[10.5px] font-bold" style={{ color: T.primary }}>
              {s.docs.drop.cta}
            </button>
            <p className="mt-3 text-[9px]" style={{ color: T.muted }}>
              {s.docs.drop.note}
            </p>
            <p className="mt-1 text-[9px]" style={{ color: T.muted }} dir="ltr">
              {s.docs.drop.types}
            </p>
          </div>
        </div>
      </div>
    </WizardCard>
  );
}

/* ── Step 3 ───────────────────────────────────────────────────── */

function Dial({ score, note }: { score: number; note: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="text-center shrink-0">
      <div className="relative w-[92px] h-[92px] mx-auto">
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#eceaf6" strokeWidth="7" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="#1c8a4e"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * c} ${c}`}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-[19px] font-extrabold"
          style={{ color: '#1c8a4e' }}
        >
          {`${score.toLocaleString('fa-IR')}٪`}
        </span>
      </div>
      <p className="mt-2 text-[10px] font-bold leading-5" style={{ color: '#1c8a4e' }}>
        {note}
      </p>
    </div>
  );
}

export function CaseStep3() {
  const s = caseWizard.step3;
  const [brief, setBrief] = useState(s.brief.tabs[0]);

  return (
    <>
      {/* Summary + readiness. */}
      <WizardCard>
        <GroupHeading title={s.summary.title} icon={s.summary.icon} />
        <div className="mt-4 flex items-center gap-6 flex-wrap">
          <ul className="flex-1 min-w-[260px] grid gap-4 sm:grid-cols-3">
            {s.summary.rows.map((r) => (
              <li key={r.label} className="text-right">
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {r.label}
                </span>
                <span className="mt-1 block text-[11.5px] font-extrabold leading-6" style={{ color: T.ink }}>
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
          <Dial score={s.summary.score} note={s.summary.scoreNote} />
        </div>
      </WizardCard>

      <div className="grid gap-4 lg:grid-cols-2 items-start">
        {/* Checklist declared first → right. */}
        <WizardCard>
          <GroupHeading title={s.checklist.title} icon={s.checklist.icon} />
          <ul className="mt-3.5 space-y-2.5">
            {s.checklist.items.map((i) => (
              <li key={i.label} className="flex items-center gap-2.5">
                {!i.ok && i.cta && (
                  <button
                    className="px-2.5 py-1 text-[9.5px] font-bold shrink-0"
                    style={{ borderRadius: R.sm, border: `1px solid ${T.primary}`, color: T.primary }}
                  >
                    {i.cta}
                  </button>
                )}
                <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                  {i.label}
                </span>
                <Icon
                  name={i.ok ? 'lucide:circle-check' : 'lucide:triangle-alert'}
                  size={14}
                  className="shrink-0"
                  style={{ backgroundColor: i.ok ? '#1c8a4e' : T.warning }}
                />
              </li>
            ))}
          </ul>
        </WizardCard>

        {/* Case brief. */}
        <WizardCard>
          <GroupHeading title={s.brief.title} icon={s.brief.icon} />

          <ul className="mt-3.5 flex items-center gap-1.5">
            {s.brief.tabs.map((t) => {
              const on = t === brief;
              return (
                <li key={t} className="flex-1">
                  <button
                    onClick={() => setBrief(t)}
                    aria-pressed={on}
                    className="w-full py-2 text-[10.5px] font-bold"
                    style={{
                      borderRadius: R.md,
                      backgroundColor: on ? T.primary : '#f5f4fb',
                      color: on ? '#ffffff' : T.ink,
                    }}
                  >
                    {t}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-3.5 text-right text-[10.5px] leading-7" style={{ color: T.ink }}>
            {s.brief.body}
          </p>
          <p className="mt-2.5 text-right text-[10.5px] leading-7" style={{ color: T.ink }}>
            {s.brief.body2}
          </p>

          <button className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
            <Icon name="lucide:eye" size={12} style={{ backgroundColor: T.primary }} />
            {s.brief.all}
          </button>
        </WizardCard>

        {/* Scope. */}
        <WizardCard>
          <GroupHeading title={s.scope.title} icon={s.scope.icon} />

          <p className="mt-3.5 text-center text-[9.5px]" style={{ color: T.muted }}>
            {s.scope.kindLabel}
          </p>
          <p
            className="mt-1.5 py-2.5 text-center text-[11.5px] font-extrabold"
            style={{ borderRadius: R.md, backgroundColor: '#f6f4fe', color: T.primary }}
          >
            {s.scope.kind}
          </p>

          <ul className="mt-3.5 grid grid-cols-2 gap-2.5">
            {s.scope.chips.map((c) => (
              <li
                key={c.label}
                className="px-3 py-2 text-center"
                style={{ borderRadius: R.sm, backgroundColor: T.tintOrange }}
              >
                <span className="block text-[9px]" style={{ color: T.muted }}>
                  {c.label}
                </span>
                <span className="mt-0.5 block text-[10.5px] font-extrabold" style={{ color: T.ink }}>
                  {c.value}
                </span>
              </li>
            ))}
          </ul>

          <p
            className="mt-3.5 flex items-center justify-center gap-2 p-2.5 text-[9.5px] text-center"
            style={{ borderRadius: R.sm, backgroundColor: '#f6f4fe', color: T.ink }}
          >
            {s.scope.note}
            <Icon name="lucide:circle-alert" size={12} className="shrink-0" style={{ backgroundColor: T.primary }} />
          </p>
        </WizardCard>

        {/* Issues. */}
        <WizardCard>
          <GroupHeading title={s.issues.title} icon={s.issues.icon} />

          <ul className="mt-3.5 space-y-2.5">
            {s.issues.items.map((i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-3"
                style={{ borderRadius: R.md, backgroundColor: '#fff8f1' }}
              >
                <button
                  className="px-3 py-1.5 text-[9.5px] font-bold shrink-0"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.accent}`, color: T.accent }}
                >
                  {s.issues.cta}
                </button>
                <span className="flex-1 text-right text-[10px] leading-6" style={{ color: T.ink }}>
                  {i}
                </span>
                <Icon name="lucide:triangle-alert" size={14} className="shrink-0" style={{ backgroundColor: T.warning }} />
              </li>
            ))}
          </ul>

          <button className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
            <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: T.primary }} />
            {s.issues.all}
          </button>
        </WizardCard>
      </div>
    </>
  );
}
