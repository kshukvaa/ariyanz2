'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  wizardHead,
  wizardSteps,
  stepInfo,
  stepPeople,
  stepTests,
  stepRun,
  stepReview,
} from '@/data/orgWizard';
import {
  Stepper,
  SummaryRail,
  NoteCard,
  Label,
  Select,
  Toggle,
  Check,
  Radio,
  StepFooter,
} from './WizardParts';

/* ──────────────────────────────────────────────────────────────
   Create assessment — the five-step wizard.

   State is local and the steps are plain sections rather than
   routes: the mockups treat this as one uninterrupted task with a
   single exit, and a half-filled step is not something worth
   putting a URL on.
────────────────────────────────────────────────────────────── */

export default function CreateAssessmentClient() {
  const [step, setStep] = useState(0);
  const go = (n: number) => setStep(Math.max(0, Math.min(wizardSteps.length - 1, n)));

  return (
    <div className="space-y-5">
      {/* ── Title row ─────────────────────────────────────────── */}
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <Link
          href="/org/assessments"
          className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:x" size={16} style={{ backgroundColor: T.muted }} />
          {wizardHead.exit}
        </Link>

        <div className="text-right">
          <nav className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            {wizardHead.crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <Icon name="lucide:chevron-left" size={12} style={{ backgroundColor: T.muted }} />}
                {c.href ? (
                  <Link href={c.href} className="hover:opacity-70">
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: T.ink }}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <h1 className="mt-1.5 text-[26px] font-extrabold" style={{ color: T.ink }}>
            {wizardHead.title}
          </h1>
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {wizardHead.desc}
          </p>
        </div>
      </div>

      <Stepper current={step} />

      {step === 0 && <StepInfo onNext={() => go(1)} />}
      {step === 1 && <StepPeople onNext={() => go(2)} onBack={() => go(0)} />}
      {step === 2 && <StepTests onNext={() => go(3)} onBack={() => go(1)} />}
      {step === 3 && <StepRun onNext={() => go(4)} onBack={() => go(2)} />}
      {step === 4 && <StepReview onBack={() => go(3)} />}
    </div>
  );
}

/* ── Layout helper: work column + side rail ───────────────────── */

function Split({
  children,
  side,
}: {
  children: React.ReactNode;
  side: React.ReactNode;
}) {
  /* RTL: the first grid column is the rightmost one, so the rail is
     declared first to land between the work column and the nav rail —
     where screens 5–8 put it. */
  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr] items-start">
      <aside className="space-y-4 xl:sticky xl:top-24">{side}</aside>
      <div className="min-w-0 space-y-5">{children}</div>
    </div>
  );
}

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="bg-white p-5 sm:p-6"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <header className="text-right">
        <h2 className="text-[17px] font-extrabold" style={{ color: T.primary }}>
          {title}
        </h2>
        {desc && (
          <p className="mt-1 text-[12px]" style={{ color: T.muted }}>
            {desc}
          </p>
        )}
      </header>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* ── Step 1 ───────────────────────────────────────────────────── */

function StepInfo({ onNext }: { onNext: () => void }) {
  const s = stepInfo;
  const [state, setState] = useState('draft');

  return (
    <Split
      side={
        <>
          <div
            className="bg-white p-5"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <div className="flex items-center justify-end gap-2">
              <h2 className="text-[14px] font-extrabold" style={{ color: T.primary }}>
                {s.guide.title}
              </h2>
              <Icon name="lucide:lightbulb" size={17} style={{ backgroundColor: T.primary }} />
            </div>
            <p className="mt-1 text-right text-[12px] font-bold" style={{ color: T.ink }}>
              {s.guide.lead}
            </p>

            <span
              className="mt-4 flex items-center justify-center py-5"
              style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
            >
              <img src={s.guide.art} alt="" className="h-[104px] w-auto object-contain" />
            </span>

            <ul className="mt-4 space-y-2.5">
              {s.guide.tips.map((t) => (
                <li
                  key={t.t}
                  className="flex items-start gap-3 p-3"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <span className="flex-1 text-right">
                    <span className="block text-[12px] font-bold" style={{ color: T.ink }}>
                      {t.t}
                    </span>
                    <span className="block mt-0.5 text-[10.5px] leading-5" style={{ color: T.muted }}>
                      {t.d}
                    </span>
                  </span>
                  <span
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
                  >
                    <Icon name={t.icon} size={17} style={{ backgroundColor: T.primary }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4" style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}>
            <div className="flex items-start gap-3">
              <span className="flex-1 text-right">
                <span className="block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {s.guide.support.t}
                </span>
                <span className="block mt-1 text-[11px] leading-5" style={{ color: T.muted }}>
                  {s.guide.support.d}
                </span>
              </span>
              <span
                className="w-9 h-9 flex items-center justify-center shrink-0 bg-white"
                style={{ borderRadius: R.sm }}
              >
                <Icon name="lucide:headphones" size={17} style={{ backgroundColor: T.primary }} />
              </span>
            </div>
            <button
              className="mt-3 flex items-center gap-1.5 text-[11.5px] font-bold"
              style={{ color: T.primary }}
            >
              <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: T.primary }} />
              {s.guide.support.a}
            </button>
          </div>
        </>
      }
    >
      <Card title={s.title} desc={s.desc}>
        <div className="space-y-5">
          <label className="block">
            <Label required={s.name.required}>{s.name.label}</Label>
            <span className="relative block mt-2">
              <input
                placeholder={s.name.placeholder}
                className="w-full px-4 py-3 text-right text-[12.5px] outline-none placeholder:text-[#9396b0] focus:border-[#4b30ce]"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10.5px]" style={{ color: T.muted }}>
                {s.name.max}
              </span>
            </span>
          </label>

          <label className="block">
            <Label>{s.about.label}</Label>
            <span className="relative block mt-2">
              <textarea
                rows={4}
                placeholder={s.about.placeholder}
                className="w-full px-4 py-3 text-right text-[12.5px] outline-none resize-none placeholder:text-[#9396b0] focus:border-[#4b30ce]"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              />
              <span className="absolute left-4 bottom-3 text-[10.5px]" style={{ color: T.muted }}>
                {s.about.max}
              </span>
            </span>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <Label required>{s.type.label}</Label>
              <Select value={s.type.value} />
            </label>
            <label className="block">
              <Label required>{s.goal.label}</Label>
              <Select value={s.goal.value} />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label>{s.state.label}</Label>
              <div className="mt-2 grid grid-cols-2 gap-2.5">
                {s.state.options.map((o) => {
                  const on = o.id === state;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setState(o.id)}
                      className="flex items-center gap-2.5 px-4 py-3 text-[12.5px] font-semibold transition-colors"
                      style={{
                        borderRadius: R.md,
                        border: `1.5px solid ${on ? T.primary : T.border}`,
                        color: T.ink,
                      }}
                    >
                      <Radio on={on} />
                      <span className="flex-1 text-right">{o.label}</span>
                      <Icon
                        name={o.id === 'draft' ? 'lucide:file-text' : 'lucide:calendar'}
                        size={15}
                        style={{ backgroundColor: on ? T.primary : T.muted }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block">
              <Label>{s.period.label}</Label>
              <Select value={s.period.value} />
            </label>
          </div>

          <div
            className="flex items-center gap-3 p-3.5 flex-wrap"
            style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
          >
            <button
              className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold bg-white"
              style={{ borderRadius: R.sm, border: `1px solid #d8d2fb`, color: T.primary }}
            >
              <Icon name="lucide:package-open" size={15} style={{ backgroundColor: T.primary }} />
              {s.tip.action}
            </button>
            <p className="flex-1 text-right text-[12px] font-semibold min-w-[200px]" style={{ color: T.ink }}>
              {s.tip.text}
            </p>
            <Icon name="lucide:sparkles" size={18} style={{ backgroundColor: T.primary }} />
          </div>

          <div>
            <Label>{s.owner.label}</Label>
            <span
              className="flex items-center gap-3 px-4 py-2.5 mt-2"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <Icon name="lucide:chevron-down" size={15} style={{ backgroundColor: T.muted }} />
              <span className="flex-1 text-right">
                <span className="block text-[12.5px] font-bold" style={{ color: T.ink }}>
                  {s.owner.name}
                </span>
                <span className="block text-[10.5px]" style={{ color: T.muted }}>
                  {s.owner.role}
                </span>
              </span>
              <img src={s.owner.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
            </span>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:chevron-down" size={15} style={{ backgroundColor: T.muted }} />
            {s.advanced}
            <Icon name="lucide:settings" size={15} style={{ backgroundColor: T.muted }} />
          </button>

          <div
            className="flex items-center gap-3 flex-wrap justify-end pt-5"
            style={{ borderTop: `1px solid ${T.border}` }}
          >
            <button
              className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold"
              style={{ borderRadius: R.md, border: `1.5px solid ${T.successStrong}`, color: T.successStrong }}
            >
              <Icon name="lucide:save" size={16} style={{ backgroundColor: T.successStrong }} />
              {s.saveDraft}
            </button>

            <button
              onClick={onNext}
              data-ripple
              className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              {s.next}
              <Icon name="lucide:arrow-left" size={16} className="text-white" />
            </button>
          </div>
        </div>
      </Card>
    </Split>
  );
}

/* ── Step 2 ───────────────────────────────────────────────────── */

function StepPeople({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const s = stepPeople;
  const [mode, setMode] = useState('group');
  const [picked, setPicked] = useState(() => new Set(s.rows.filter((r) => r.on).map((r) => r.id)));

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      <Split
        side={
          <>
            <SummaryRail current={1} />
            <NoteCard title={s.note.title} text={s.note.text} />
          </>
        }
      >
        <Card title={s.title} desc={s.desc}>
          <div className="flex items-center gap-2.5 justify-end">
            {s.modes.map((m) => {
              const on = m.id === mode;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold transition-colors"
                  style={
                    on
                      ? { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                      : { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }
                  }
                >
                  <Icon
                    name={m.icon}
                    size={16}
                    style={{ backgroundColor: on ? '#fff' : T.muted }}
                  />
                  {m.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2.5 flex-wrap">
            <label
              className="flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[200px]"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <Icon name="lucide:search" size={16} style={{ backgroundColor: T.muted }} />
              <input
                placeholder={s.filters[0].value}
                className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
                style={{ color: T.ink }}
              />
            </label>

            {s.filters.slice(1).map((f) => (
              <span key={f.id} className="min-w-[150px]">
                <span className="block text-[10.5px] text-right" style={{ color: T.muted }}>
                  {f.label}
                </span>
                <Select value={f.value} />
              </span>
            ))}

            <button
              className="flex items-center gap-2 px-3.5 py-2.5 text-[12.5px] font-bold self-end"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
            >
              <Icon name="lucide:funnel" size={15} style={{ backgroundColor: T.primary }} />
              {s.clear}
            </button>
          </div>

          <div className="mt-4 overflow-x-auto" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
            <table className="w-full min-w-[520px] text-right border-collapse">
              <thead>
                <tr style={{ backgroundColor: '#fafafc' }}>
                  <Th>{s.cols.ops}</Th>
                  <Th>{s.cols.count}</Th>
                  <Th className="w-full">{s.cols.name}</Th>
                  <Th className="w-12" />
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => {
                  const on = picked.has(r.id);
                  return (
                    <tr key={r.id} style={{ borderTop: `1px solid ${T.border}` }}>
                      <Td>
                        <button
                          className="px-4 py-2 text-[11.5px] font-bold"
                          style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                        >
                          {s.detail}
                        </button>
                      </Td>
                      <Td>
                        <span className="text-[12.5px] font-bold" style={{ color: T.ink }}>
                          {r.count}
                        </span>
                      </Td>
                      <Td>
                        <span className="flex items-center justify-end gap-2.5">
                          <span className="text-[12.5px] font-bold" style={{ color: T.ink }}>
                            {r.label}
                          </span>
                          <Icon name={r.icon} size={17} style={{ backgroundColor: T.primary }} />
                        </span>
                      </Td>
                      <Td>
                        <button onClick={() => toggle(r.id)} aria-pressed={on} aria-label={r.label}>
                          <Check on={on} />
                        </button>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div
              className="flex items-center justify-center gap-2 py-3.5"
              style={{ backgroundColor: T.tintPurple, borderTop: `1px solid ${T.border}` }}
            >
              <span className="text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {s.total.value}
              </span>
              <span className="text-[12.5px]" style={{ color: T.muted }}>
                {s.total.label}
              </span>
              <Icon name="lucide:users-round" size={16} style={{ backgroundColor: T.primary }} />
            </div>
          </div>
        </Card>
      </Split>

      <StepFooter next={s.next} back={s.back} onNext={onNext} onBack={onBack} />
    </>
  );
}

/* ── Step 3 ───────────────────────────────────────────────────── */

function StepTests({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const s = stepTests;
  const [tab, setTab] = useState('picked');
  const [picked, setPicked] = useState(() => new Set(s.rows.filter((r) => r.on).map((r) => r.id)));

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      <Split
        side={
          <>
            <SummaryRail current={2} />

            <div
              className="bg-white p-5"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <h3 className="text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                {s.side.title}
              </h3>
              <dl className="mt-3 space-y-2.5">
                {s.side.rows.map((r) => (
                  <div key={r.k} className="flex items-center justify-between gap-3">
                    <dd className="text-[12px] font-bold" style={{ color: T.primary }}>
                      {r.v}
                    </dd>
                    <dt className="text-[11.5px]" style={{ color: T.muted }}>
                      {r.k}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <NoteCard title={s.note.title} text={s.note.text} />
          </>
        }
      >
        <Card title={s.title} desc={s.desc}>
          <div className="flex items-center gap-2.5 flex-wrap">
            <label
              className="flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[200px]"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <Icon name="lucide:search" size={16} style={{ backgroundColor: T.muted }} />
              <input
                placeholder="جستجو در آزمون‌ها..."
                className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
                style={{ color: T.ink }}
              />
            </label>

            {s.filters.map((f) => (
              <span key={f.id} className="min-w-[140px]">
                <span className="block text-[10.5px] text-right" style={{ color: T.muted }}>
                  {f.label}
                </span>
                <Select value={f.value} />
              </span>
            ))}

            <button
              className="flex items-center gap-2 px-3.5 py-2.5 text-[12.5px] font-bold self-end"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
            >
              <Icon name="lucide:funnel" size={15} style={{ backgroundColor: T.primary }} />
              {s.clear}
            </button>
          </div>

          <div className="mt-5 flex items-center gap-6 justify-end" style={{ borderBottom: `1px solid ${T.border}` }}>
            {s.tabs.map((t) => {
              const on = t.id === tab;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative pb-3 text-[12.5px]"
                  style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
                >
                  {t.label}
                  {on && (
                    <span
                      className="absolute -bottom-px inset-x-0 h-[2.5px] rounded-full"
                      style={{ backgroundColor: T.primary }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 overflow-x-auto" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
            <table className="w-full min-w-[720px] text-right border-collapse">
              <thead>
                <tr style={{ backgroundColor: '#fafafc' }}>
                  <Th className="w-12" />
                  <Th>{s.cols.ops}</Th>
                  <Th>{s.cols.time}</Th>
                  <Th>{s.cols.kind}</Th>
                  <Th>{s.cols.cat}</Th>
                  <Th className="w-full">{s.cols.name}</Th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => {
                  const on = picked.has(r.id);
                  return (
                    <tr key={r.id} style={{ borderTop: `1px solid ${T.border}` }}>
                      <Td>
                        <button onClick={() => toggle(r.id)} aria-pressed={on} aria-label={r.title}>
                          <Check on={on} />
                        </button>
                      </Td>
                      <Td>
                        <Icon name="lucide:ellipsis" size={16} style={{ backgroundColor: T.muted }} />
                      </Td>
                      <Td>
                        <span className="text-[12px] whitespace-nowrap" style={{ color: T.ink }}>
                          {r.time}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-[12px]" style={{ color: T.ink }}>
                          {r.kind}
                        </span>
                      </Td>
                      <Td>
                        <span
                          className="inline-block px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap"
                          style={{ borderRadius: R.pill, backgroundColor: r.catBg, color: r.catFg }}
                        >
                          {r.cat}
                        </span>
                      </Td>
                      <Td>
                        <span className="flex items-center justify-end gap-3">
                          <span className="text-right">
                            <span className="block text-[12.5px] font-bold" style={{ color: T.ink }}>
                              {r.title}
                            </span>
                            <span className="block text-[10.5px]" style={{ color: T.muted }}>
                              {r.desc}
                            </span>
                          </span>
                          <img src={r.icon} alt="" className="w-10 h-10 object-contain shrink-0" />
                        </span>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div
              className="flex items-center gap-3 p-4"
              style={{ backgroundColor: T.tintPurple, borderTop: `1px solid ${T.border}` }}
            >
              <span className="flex-1 text-right">
                <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
                  {s.picked.title}
                </span>
                <span className="block text-[11px]" style={{ color: T.muted }}>
                  {s.picked.sub}
                </span>
              </span>
              <span
                className="w-10 h-10 flex items-center justify-center bg-white shrink-0"
                style={{ borderRadius: R.sm }}
              >
                <Icon name="lucide:clipboard-check" size={19} style={{ backgroundColor: T.primary }} />
              </span>
            </div>
          </div>
        </Card>
      </Split>

      <StepFooter next={s.next} back={s.back} onNext={onNext} onBack={onBack} />
    </>
  );
}

/* ── Step 4 ───────────────────────────────────────────────────── */

function StepRun({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const s = stepRun;

  return (
    <>
      <Split
        side={
          <>
            <SummaryRail current={3} />

            <div
              className="bg-white p-5"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <h3 className="text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                {s.key.title}
              </h3>
              <dl className="mt-3 space-y-3">
                {s.key.rows.map((r) => (
                  <div key={r.k} className="flex items-center justify-between gap-3">
                    <dd className="text-[12px] font-bold" style={{ color: T.ink }}>
                      {r.v}
                    </dd>
                    <dt className="flex items-center gap-2 text-[11.5px]" style={{ color: T.muted }}>
                      {r.k}
                      <Icon name={r.icon} size={15} style={{ backgroundColor: T.primary }} />
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </>
        }
      >
        <Card title={s.title} desc={s.desc}>
          <div className="p-4" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
            <Label required={s.window.required}>{s.window.label}</Label>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {[s.window.start, s.window.end].map((d) => (
                <div key={d.label}>
                  <span className="block text-[11px] text-right" style={{ color: T.muted }}>
                    {d.label}
                  </span>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className="flex items-center gap-2 px-3 py-2.5 shrink-0"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                    >
                      <span className="text-[12px] font-bold" style={{ color: T.ink }}>
                        {d.time}
                      </span>
                      <Icon name="lucide:clock" size={14} style={{ backgroundColor: T.muted }} />
                    </span>
                    <span
                      className="flex items-center gap-2 px-3 py-2.5 flex-1"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                    >
                      <span className="flex-1 text-right text-[12px] font-bold" style={{ color: T.ink }}>
                        {d.date}
                      </span>
                      <Icon name="lucide:calendar" size={14} style={{ backgroundColor: T.muted }} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 flex items-center justify-end gap-2 text-[11px]" style={{ color: T.muted }}>
              {s.window.hint}
              <Icon name="lucide:circle-alert" size={14} style={{ backgroundColor: T.muted }} />
            </p>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {/* Rules */}
            <div className="p-4" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
              <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {s.rules.title}
              </h3>
              <ul className="mt-3 space-y-3.5">
                {s.rules.items.map((r) => (
                  <li key={r.id} className="flex items-start gap-3">
                    <Toggle on={r.on} />
                    <span className="flex-1 text-right">
                      <span className="block text-[12px] font-bold" style={{ color: T.ink }}>
                        {r.t}
                      </span>
                      <span className="block mt-0.5 text-[10.5px] leading-5" style={{ color: T.muted }}>
                        {r.d}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Run options */}
            <div className="p-4" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
              <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {s.options.title}
              </h3>

              {[s.options.order, s.options.access].map((grp) => (
                <div key={grp.label} className="mt-3">
                  <span className="block text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
                    {grp.label}
                  </span>
                  <ul className="mt-2 space-y-2.5">
                    {grp.items.map((o) => (
                      <li key={o.id} className="flex items-start gap-2.5">
                        <Radio on={o.on} />
                        <span className="flex-1 text-right">
                          <span className="block text-[11.5px]" style={{ color: T.ink }}>
                            {o.t}
                          </span>
                          {o.d && (
                            <span className="block mt-0.5 text-[10px] leading-5" style={{ color: T.muted }}>
                              {o.d}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mt-3">
                <span className="block text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
                  {s.options.notify.label}
                </span>
                <ul className="mt-2 space-y-2.5">
                  {s.options.notify.items.map((o) => (
                    <li key={o.id} className="flex items-center gap-2.5">
                      <Check on={o.on} />
                      <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
                        {o.t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Privacy */}
            <div className="p-4" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
              <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {s.privacy.title}
              </h3>

              <label className="block mt-3">
                <span className="block text-right text-[11px]" style={{ color: T.muted }}>
                  {s.privacy.names.label}
                </span>
                <Select value={s.privacy.names.value} />
              </label>

              <label className="block mt-3">
                <span className="block text-right text-[11px]" style={{ color: T.muted }}>
                  {s.privacy.results.label}
                </span>
                <Select value={s.privacy.results.value} />
              </label>

              <div className="mt-3 p-3" style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}>
                <span className="flex items-center justify-end gap-2 text-[11.5px] font-extrabold" style={{ color: T.primary }}>
                  {s.privacy.confidential.t}
                  <Icon name="lucide:lock-keyhole" size={14} style={{ backgroundColor: T.primary }} />
                </span>
                <p className="mt-1.5 text-right text-[10.5px] leading-5" style={{ color: T.ink }}>
                  {s.privacy.confidential.d}
                </p>
              </div>

              <div className="mt-2.5 p-3" style={{ borderRadius: R.sm, backgroundColor: '#f4f4f8' }}>
                <span className="flex items-center justify-end gap-2 text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                  {s.privacy.note.t}
                  <Icon name="lucide:circle-alert" size={14} style={{ backgroundColor: T.muted }} />
                </span>
                <p className="mt-1.5 text-right text-[10.5px] leading-5" style={{ color: T.muted }}>
                  {s.privacy.note.d}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </Split>

      <StepFooter next={s.next} back={s.back} onNext={onNext} onBack={onBack} />
    </>
  );
}

/* ── Step 5 ───────────────────────────────────────────────────── */

function StepReview({ onBack }: { onBack: () => void }) {
  const s = stepReview;

  return (
    <>
      <Split
        side={
          <>
            <SummaryRail current={4} title={s.summaryTitle} />

            <div
              className="bg-white p-5"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <h3 className="text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                {s.after.title}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {s.after.items.map((a) => (
                  <li key={a.t} className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
                    >
                      <Icon name={a.icon} size={16} style={{ backgroundColor: T.primary }} />
                    </span>
                    <span className="flex-1 text-right text-[11.5px] font-semibold" style={{ color: T.ink }}>
                      {a.t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        }
      >
        <div
          className="flex items-center gap-3 p-4"
          style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}
        >
          <p className="flex-1 text-right text-[12px] leading-6 font-semibold" style={{ color: T.ink }}>
            {s.banner}
          </p>
          <Icon name="lucide:shield-check" size={20} style={{ backgroundColor: T.primary }} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {s.cards.map((c) => (
            <section
              key={c.id}
              className="bg-white p-4 flex flex-col"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <header className="flex items-start gap-3">
                <button
                  className="px-3 py-1.5 text-[11px] font-bold shrink-0"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                >
                  {s.edit}
                </button>
                <h3 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
                  {c.title}
                </h3>
                <span
                  className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: c.bg }}
                >
                  <Icon name={c.icon} size={17} style={{ backgroundColor: c.fg }} />
                </span>
              </header>

              <dl className="mt-3.5 space-y-2.5 flex-1">
                {c.rows?.map((r) => (
                  <div key={r.k} className="text-right">
                    <dt className="flex items-center justify-end gap-1.5 text-[11px] font-bold" style={{ color: T.ink }}>
                      {r.k}
                      <Icon name="lucide:check" size={12} style={{ backgroundColor: T.success }} />
                    </dt>
                    {r.v && (
                      <dd className="mt-0.5 text-[11px] leading-5" style={{ color: T.muted }}>
                        {r.v}
                      </dd>
                    )}
                  </div>
                ))}

                {c.list?.map((l) => (
                  <div key={l.t} className="flex items-center gap-2 justify-end">
                    <span
                      className="px-2.5 py-1 text-[10.5px] font-bold shrink-0"
                      style={{ borderRadius: R.sm, backgroundColor: T.tintGreen, color: T.successStrong }}
                    >
                      {l.time}
                    </span>
                    <span className="flex-1 text-right text-[11px]" style={{ color: T.ink }}>
                      {l.t}
                    </span>
                    <Icon name="lucide:check" size={13} style={{ backgroundColor: T.success }} />
                  </div>
                ))}
              </dl>

              {c.total && (
                <div
                  className="mt-3 pt-3 flex items-center justify-between"
                  style={{ borderTop: `1px solid ${T.border}` }}
                >
                  <span className="text-[13px] font-extrabold" style={{ color: T.primary }}>
                    {c.total}
                  </span>
                  <span className="text-[11px]" style={{ color: T.muted }}>
                    {c.totalLabel}
                  </span>
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section
            className="bg-white p-5"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <header className="flex items-center gap-2.5">
              <Icon name="lucide:mail" size={19} style={{ backgroundColor: T.primary }} />
              <h3 className="flex-1 text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                {s.mail.title}
              </h3>
            </header>

            <div className="mt-3.5 space-y-2 text-right">
              {s.mail.body.map((l) => (
                <p key={l} className="text-[11.5px] leading-6" style={{ color: T.ink }}>
                  {l}
                </p>
              ))}
            </div>

            <div className="mt-4 text-right space-y-0.5">
              {s.mail.sign.map((l) => (
                <p key={l} className="text-[11px]" style={{ color: T.muted }}>
                  {l}
                </p>
              ))}
            </div>
          </section>

          <section
            className="p-5"
            style={{ borderRadius: R.lg, backgroundColor: '#fafafc', border: `1px solid ${T.border}` }}
          >
            <header className="flex items-center gap-2.5">
              <Icon name="lucide:lightbulb" size={19} style={{ backgroundColor: T.accent }} />
              <h3 className="flex-1 text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                {s.checks.title}
              </h3>
            </header>

            <ul className="mt-3.5 space-y-3">
              {s.checks.items.map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
                    {c}
                  </span>
                  <Icon name="lucide:circle-check" size={16} style={{ backgroundColor: T.success }} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Split>

      <div className="flex items-center gap-3 flex-wrap justify-between pt-1">
        <button
          className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:bookmark" size={16} style={{ backgroundColor: T.muted }} />
          {s.saveDraft}
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:arrow-right" size={16} style={{ backgroundColor: T.muted }} />
            {s.back}
          </button>

          <span className="text-right">
            <button
              data-ripple
              className="flex items-center gap-2.5 px-7 py-3.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:rocket" size={17} className="text-white" />
              {s.publish}
            </button>
            <span className="mt-1.5 flex items-center justify-end gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
              {s.footnote}
              <Icon name="lucide:circle-alert" size={12} style={{ backgroundColor: T.muted }} />
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

/* ── Table atoms ──────────────────────────────────────────────── */

function Th({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-4 py-3 text-[11.5px] font-bold whitespace-nowrap ${className}`}
      style={{ color: T.muted }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3.5 align-middle">{children}</td>;
}
