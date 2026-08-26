'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Ring from '@/components/org/panel/Ring';
import { Panel } from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import { Stepper, Label, Select, Toggle, Check, Radio } from './WizardParts';
import {
  devWizardHead,
  devWizardSteps,
  devWizardSummary,
  devStepDefine,
  devStepPeople,
  devStepDesign,
  devStepSchedule,
  devStepPublish,
} from '@/data/orgDevWizard';

/* ──────────────────────────────────────────────────────────────
   Create development programme.

   Five steps: define it, choose who and which gaps, design the
   interventions, schedule and assign them, then set how success
   will be measured before publishing.

   Step 1's screen is missing from the delivered archive; its
   fields are reconstructed from the summary rail the other four
   steps display, so nothing here is invented outright.
────────────────────────────────────────────────────────────── */

export default function DevWizardClient() {
  const [step, setStep] = useState(0);
  const go = (n: number) => setStep(Math.max(0, Math.min(devWizardSteps.length - 1, n)));

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <Link
          href="/org/development"
          className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:x" size={16} style={{ backgroundColor: T.muted }} />
          انصراف
        </Link>

        <div className="text-right">
          <nav className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            {devWizardHead.crumbs.map((c, i) => (
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

          <div className="mt-1.5 flex items-center justify-end gap-2.5">
            <h1 className="text-[25px] font-extrabold" style={{ color: T.ink }}>
              {devWizardHead.title}
            </h1>
            <Icon name="lucide:clipboard-pen" size={23} style={{ backgroundColor: T.primary }} />
          </div>
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {devWizardHead.desc}
          </p>
        </div>
      </div>

      <Stepper current={step} steps={devWizardSteps} />

      <div className="grid gap-5 xl:grid-cols-[280px_1fr] items-start">
        {/* RTL: first column is rightmost — the summary rail sits there. */}
        <SummaryRail current={step} />

        <div className="min-w-0 space-y-5">
          {step === 0 && <Define onNext={() => go(1)} />}
          {step === 1 && <People onNext={() => go(2)} onBack={() => go(0)} />}
          {step === 2 && <Design onNext={() => go(3)} onBack={() => go(1)} />}
          {step === 3 && <Schedule onNext={() => go(4)} onBack={() => go(2)} />}
          {step === 4 && <Publish onBack={() => go(3)} />}
        </div>
      </div>
    </div>
  );
}

/* ── The rail ─────────────────────────────────────────────────── */

function SummaryRail({ current }: { current: number }) {
  const s = devWizardSummary;

  return (
    <aside className="space-y-4 xl:sticky xl:top-24">
      <div className="bg-white p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
        <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
          {s.title}
          <Icon name="lucide:clipboard-list" size={16} style={{ backgroundColor: T.primary }} />
        </h2>

        <dl className="mt-3.5 space-y-3">
          {s.rows.map((r) => (
            <div key={r.k} className="text-right">
              <dt className="flex items-center justify-end gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
                {r.k}
                <Icon name={r.icon} size={12} style={{ backgroundColor: T.muted }} />
              </dt>
              <dd className="mt-0.5 text-[11px] font-bold leading-4" style={{ color: T.ink }}>
                {r.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
        <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
          {s.stagesTitle}
        </h3>

        <ol className="mt-3 space-y-1">
          {devWizardSteps.map((st, i) => {
            const done = i < current;
            const on = i === current;
            return (
              <li
                key={st.id}
                className="flex items-center gap-2.5 px-2.5 py-2"
                style={{ borderRadius: R.md, backgroundColor: on ? T.tintPurple : 'transparent' }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[9.5px] font-bold shrink-0"
                  style={
                    done
                      ? { backgroundColor: T.tintGreen, color: T.successStrong }
                      : on
                        ? { backgroundColor: T.primary, color: '#fff' }
                        : { backgroundColor: '#f4f4f8', color: T.muted }
                  }
                >
                  {done ? <Icon name="lucide:check" size={12} style={{ backgroundColor: T.successStrong }} /> : i + 1}
                </span>
                <span
                  className="flex-1 text-right text-[11px]"
                  style={{ color: on ? T.primary : T.ink, fontWeight: on ? 800 : 500 }}
                >
                  {st.label}
                </span>
              </li>
            );
          })}
        </ol>

        <p
          className="mt-3 p-2.5 text-right text-[9.5px] leading-4"
          style={{ borderRadius: R.md, backgroundColor: T.tintPurple, color: T.ink }}
        >
          {s.note}
        </p>
      </div>
    </aside>
  );
}

/* ── Shared ───────────────────────────────────────────────────── */

function Head({ title, desc }: { title: string; desc: string }) {
  return (
    <header className="text-right">
      <h2 className="flex items-center justify-end gap-2 text-[17px] font-extrabold" style={{ color: T.primary }}>
        {title}
        <Icon name="lucide:sparkles" size={19} style={{ backgroundColor: T.primary }} />
      </h2>
      <p className="mt-1 text-[12px]" style={{ color: T.muted }}>
        {desc}
      </p>
    </header>
  );
}

function Band({ rows, ring }: { rows: { k: string; v: string; icon: string }[]; ring?: number }) {
  return (
    <section
      className="bg-white p-4 flex items-center gap-5 flex-wrap"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {ring !== undefined && (
        <span className="flex items-center gap-2.5 shrink-0">
          <Ring pct={ring} colour={T.primary} size={52} stroke={5} />
        </span>
      )}

      <div className="flex-1 flex items-center gap-5 flex-wrap justify-end">
        {rows.map((r) => (
          <span key={r.k} className="flex items-center gap-2.5">
            <span className="text-right">
              <span className="block text-[9.5px]" style={{ color: T.muted }}>
                {r.k}
              </span>
              <span className="block text-[11.5px] font-bold" style={{ color: T.ink }}>
                {r.v}
              </span>
            </span>
            <Icon name={r.icon} size={15} style={{ backgroundColor: T.primary }} />
          </span>
        ))}
      </div>
    </section>
  );
}

function Nav({
  next,
  onNext,
  onBack,
  last,
}: {
  next: string;
  onNext?: () => void;
  onBack?: () => void;
  last?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap justify-between">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
      >
        <Icon name="lucide:arrow-right" size={16} style={{ backgroundColor: T.muted }} />
        {devWizardHead.back}
      </button>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:bookmark" size={16} style={{ backgroundColor: T.muted }} />
          {devWizardHead.draft}
        </button>

        <button
          onClick={onNext}
          data-ripple
          className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
        >
          {next}
          <Icon name={last ? 'lucide:send' : 'lucide:arrow-left'} size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}

/* ── Step 1 ───────────────────────────────────────────────────── */

function Define({ onNext }: { onNext: () => void }) {
  const s = devStepDefine;
  const [source, setSource] = useState('gaps');

  return (
    <>
      <section className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
        <Head title={s.title} desc={s.desc} />

        <div className="mt-5 space-y-5">
          <label className="block">
            <Label required={s.name.required}>{s.name.label}</Label>
            <input
              placeholder={s.name.placeholder}
              className="w-full mt-2 px-4 py-3 text-right text-[12.5px] outline-none placeholder:text-[#9396b0]"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            />
          </label>

          <div>
            <Label>{s.source.label}</Label>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {s.source.options.map((o) => {
                const on = o.id === source;
                return (
                  <button
                    key={o.id}
                    onClick={() => setSource(o.id)}
                    aria-pressed={on}
                    className="p-3.5 text-right transition-colors"
                    style={{
                      borderRadius: R.md,
                      border: `1.5px solid ${on ? T.primary : T.border}`,
                      backgroundColor: on ? '#fbfaff' : '#fff',
                    }}
                  >
                    <span className="flex items-center justify-between">
                      <Radio on={on} />
                      <span
                        className="w-9 h-9 flex items-center justify-center"
                        style={{ borderRadius: R.sm, backgroundColor: o.bg }}
                      >
                        <Icon name={o.icon} size={17} style={{ backgroundColor: o.fg }} />
                      </span>
                    </span>
                    <span className="block mt-2 text-[12px] font-extrabold" style={{ color: T.ink }}>
                      {o.label}
                    </span>
                    <span className="block mt-0.5 text-[9.5px] leading-4" style={{ color: T.muted }}>
                      {o.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <Label>{s.kind.label}</Label>
              <Select value={s.kind.value} />
            </label>
            <label className="block">
              <Label>{s.period.label}</Label>
              <Select value={s.period.value} />
            </label>
            <label className="block">
              <Label>{s.goal.label}</Label>
              <Select value={s.goal.value} />
            </label>
            <label className="block">
              <Label>{s.owner.label}</Label>
              <Select value={s.owner.value} />
            </label>
          </div>
        </div>
      </section>

      <Nav next={s.next} onNext={onNext} />
    </>
  );
}

/* ── Step 2 ───────────────────────────────────────────────────── */

function People({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const s = devStepPeople;
  const [mode, setMode] = useState('smart');

  return (
    <>
      <section className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
        <Head title={s.title} desc={s.desc} />

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {s.modes.map((m) => {
            const on = m.id === mode;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                aria-pressed={on}
                className="p-3.5 text-right transition-colors"
                style={{
                  borderRadius: R.md,
                  border: `1.5px solid ${on ? T.primary : T.border}`,
                  backgroundColor: on ? '#fbfaff' : '#fff',
                }}
              >
                <span className="flex items-center justify-between">
                  <Icon name={m.icon} size={18} style={{ backgroundColor: on ? T.primary : T.muted }} />
                  <span className="text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {m.label}
                  </span>
                </span>
                <span className="block mt-1 text-[9.5px]" style={{ color: T.muted }}>
                  {m.desc}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 grid-cols-2 xl:grid-cols-5">
          {s.groups.map((g) => (
            <div
              key={g.id}
              className="p-3.5 text-center"
              style={{
                borderRadius: R.md,
                border: `1.5px solid ${g.on ? T.primary : T.border}`,
                backgroundColor: g.on ? '#fbfaff' : '#fff',
              }}
            >
              <span className="flex justify-end">
                <Check on={!!g.on} />
              </span>
              <span className="block text-[17px] font-extrabold" style={{ color: T.ink }}>
                {g.label}
              </span>
              <span className="block text-[9.5px] leading-4" style={{ color: T.muted }}>
                {g.sub}
              </span>
              <button
                className="mt-2 w-full py-1.5 text-[10px] font-bold"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
              >
                {g.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <button className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: T.danger }}>
              <Icon name="lucide:trash-2" size={13} style={{ backgroundColor: T.danger }} />
              {s.clear}
            </button>
            <h3 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
              {s.selectedTitle}
            </h3>
          </div>

          <div className="overflow-x-auto" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
            <table className="w-full min-w-[640px] text-right border-collapse">
              <thead>
                <tr style={{ backgroundColor: '#fafafc' }}>
                  {[s.cols.state, s.cols.score, s.cols.gaps, s.cols.unit, s.cols.role, s.cols.person].map((c) => (
                    <th key={c} className="px-3 py-2.5 text-[10px] font-bold whitespace-nowrap" style={{ color: T.muted }}>
                      {c}
                    </th>
                  ))}
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.name} style={{ borderTop: `1px solid ${T.border}` }}>
                    <td className="px-3 py-2.5">
                      <span
                        className="px-2 py-0.5 text-[9.5px] font-bold whitespace-nowrap"
                        style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                      >
                        {r.state}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] font-bold" style={{ color: T.ink }}>
                      {r.score}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="flex items-center justify-end gap-1 flex-wrap">
                        {r.gaps.map((g) => (
                          <span
                            key={g}
                            className="px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap"
                            style={{ borderRadius: R.sm, backgroundColor: T.tintPurple, color: T.primary }}
                          >
                            {g}
                          </span>
                        ))}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-[10px]" style={{ color: T.ink }}>
                      {r.unit}
                    </td>
                    <td className="px-3 py-2.5 text-[10px]" style={{ color: T.muted }}>
                      {r.role}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="flex items-center justify-end gap-2">
                        <span className="text-[11px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                          {r.name}
                        </span>
                        <img
                          src={`/images/aryaz/avatars/${r.avatar}.png`}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                        />
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <Check on />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={s.needsTitle}>
          <ul className="space-y-3">
            {s.needs.map((n) => (
              <li key={n.label} className="flex items-center gap-3">
                <span className="w-24 shrink-0">
                  <span className="block h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${n.gap}%`, backgroundColor: n.colour }}
                    />
                  </span>
                </span>
                <span className="text-[10.5px] shrink-0 w-8 text-center" style={{ color: T.muted }}>
                  {n.benchmark}
                </span>
                <span className="text-[10.5px] shrink-0 w-8 text-center font-bold" style={{ color: T.ink }}>
                  {n.current}
                </span>
                <span className="text-[9.5px] shrink-0 w-12" style={{ color: T.muted }}>
                  {n.people}
                </span>
                <span className="flex-1 flex items-center justify-end gap-2">
                  <span className="text-[11px] font-bold" style={{ color: T.ink }}>
                    {n.label}
                  </span>
                  <Icon name={n.icon} size={15} style={{ backgroundColor: n.colour }} />
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={s.mapTitle}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th />
                {s.mapCols.map((c) => (
                  <th key={c} className="pb-2 px-1 text-[9px] font-bold text-center" style={{ color: T.ink }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.mapRows.map((r) => (
                <tr key={r.name}>
                  <td className="py-1.5">
                    <span className="flex items-center justify-end gap-1.5">
                      <span className="text-[9.5px] whitespace-nowrap" style={{ color: T.ink }}>
                        {r.name}
                      </span>
                      <img
                        src={`/images/aryaz/avatars/${r.avatar}.png`}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                    </span>
                  </td>
                  {r.cells.map((v, i) => (
                    <td key={i} className="p-1">
                      <span
                        className="block h-7"
                        style={{ borderRadius: 5, backgroundColor: s.mapLegend[v].colour, opacity: 0.35 }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="mt-3 flex items-center justify-center gap-3">
            {s.mapLegend.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5 text-[9.5px]" style={{ color: T.ink }}>
                {l.label}
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.colour, opacity: 0.35 }} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Nav next={s.next} onNext={onNext} onBack={onBack} />
    </>
  );
}

/* ── Step 3 ───────────────────────────────────────────────────── */

function Design({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const s = devStepDesign;

  return (
    <>
      <Band rows={s.bandRows} />

      <section className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
        <Head title={s.title} desc={s.desc} />
      </section>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr_240px] items-start">
        <Panel title={s.libraryTitle}>
          <label
            className="flex items-center gap-2 px-3 py-2 mb-2.5"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name="lucide:search" size={14} style={{ backgroundColor: T.muted }} />
            <input
              type="search"
              placeholder={s.librarySearch}
              className="flex-1 min-w-0 bg-transparent text-[10.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: T.ink }}
            />
          </label>

          <div className="flex items-center gap-1.5 flex-wrap justify-end mb-3">
            {s.libraryFilters.map((f, i) => (
              <span
                key={f}
                className="px-2.5 py-1 text-[9.5px] font-semibold"
                style={
                  i === 0
                    ? { borderRadius: R.pill, backgroundColor: T.primaryStrong, color: '#fff' }
                    : { borderRadius: R.pill, border: `1px solid ${T.border}`, color: T.ink }
                }
              >
                {f}
              </span>
            ))}
          </div>

          <ul className="space-y-2">
            {s.library.map((l) => (
              <li
                key={l.id}
                className="flex items-center gap-2.5 p-2.5"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <button
                  className="px-2.5 py-1 text-[9.5px] font-bold shrink-0"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                >
                  {s.libraryAdd}
                </button>
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[8.5px]" style={{ color: T.muted }}>
                    {l.kind}
                  </span>
                  <span className="block text-[10.5px] font-bold leading-4" style={{ color: T.ink }}>
                    {l.label}
                  </span>
                  <span className="block text-[8.5px]" style={{ color: T.muted }}>
                    {l.note}
                  </span>
                </span>
                <span
                  className="w-8 h-8 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: l.bg }}
                >
                  <Icon name={l.icon} size={15} style={{ backgroundColor: l.fg }} />
                </span>
              </li>
            ))}
          </ul>

          <button className="mt-3 w-full text-[10.5px] font-bold" style={{ color: T.primary }}>
            {s.libraryAll}
          </button>
        </Panel>

        <Panel title={s.planTitle}>
          <div className="flex items-center gap-2 mb-3 justify-end">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:table" size={12} style={{ backgroundColor: T.muted }} />
              {s.planTable}
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
            >
              <Icon name="lucide:plus" size={12} style={{ backgroundColor: T.primary }} />
              {s.planAdd}
            </button>
          </div>

          <ol className="space-y-3">
            {s.phases.map((p) => (
              <li key={p.n}>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[9.5px]" style={{ color: T.muted }}>
                    {p.week}
                  </span>
                  <span className="flex-1 text-right text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                    {p.label}
                  </span>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9.5px] font-bold shrink-0 text-white"
                    style={{ backgroundColor: T.primary }}
                  >
                    {p.n}
                  </span>
                </div>

                <div className="grid gap-2 sm:grid-cols-3 pr-8">
                  {p.rows.map((r) => (
                    <div
                      key={r.label}
                      className="p-2.5"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <span className="flex items-center justify-between">
                        <Icon name="lucide:ellipsis" size={13} style={{ backgroundColor: T.muted }} />
                        <span
                          className="w-7 h-7 flex items-center justify-center"
                          style={{ borderRadius: R.sm, backgroundColor: r.bg }}
                        >
                          <Icon name={r.icon} size={13} style={{ backgroundColor: r.fg }} />
                        </span>
                      </span>
                      <span className="block mt-1.5 text-right text-[8.5px]" style={{ color: T.muted }}>
                        {r.kind}
                      </span>
                      <span className="block text-right text-[10px] font-bold leading-4" style={{ color: T.ink }}>
                        {r.label}
                      </span>
                      <span className="block text-right text-[8.5px]" style={{ color: T.muted }}>
                        {r.note}
                      </span>
                    </div>
                  ))}

                  <button
                    className="flex flex-col items-center justify-center gap-1 p-2.5 text-[9.5px] font-bold"
                    style={{ borderRadius: R.md, border: `1.5px dashed #cdd0e0`, color: T.primary }}
                  >
                    <Icon name="lucide:plus" size={14} style={{ backgroundColor: T.primary }} />
                    {s.addAction}
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <button
            data-ripple
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold text-white"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:sparkles" size={14} className="text-white" />
            {s.aiCta}
          </button>
        </Panel>

        <div className="space-y-4">
          <Panel title={s.resourcesTitle}>
            <ul className="space-y-2">
              {s.resources.map((r) => (
                <li key={r.label} className="flex items-center justify-between text-[10.5px]">
                  <span className="font-bold" style={{ color: r.colour }}>
                    {r.value}
                  </span>
                  <span style={{ color: T.ink }}>{r.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-3 text-center" style={{ borderTop: `1px solid ${T.border}` }}>
              <span className="block text-[9.5px]" style={{ color: T.muted }}>
                {s.durationTitle}
              </span>
              <span className="block text-[15px] font-extrabold" style={{ color: T.ink }}>
                {s.duration}
              </span>
            </div>
          </Panel>

          <Panel title={s.coverageTitle}>
            <div className="flex justify-center mb-3">
              <Ring pct={s.coverageRing} colour={T.primary} size={72} stroke={7} />
            </div>

            <ul className="space-y-2.5">
              {s.coverage.map((c) => (
                <li key={c.label}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold" style={{ color: c.colour }}>
                      {c.pct}٪
                    </span>
                    <span style={{ color: T.ink }}>{c.label}</span>
                  </div>
                  <span className="mt-1 block h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                    <span className="block h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.colour }} />
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="mt-3 p-2.5 text-right text-[9px] leading-4"
              style={{ borderRadius: R.sm, backgroundColor: T.tintOrange, color: T.ink }}
            >
              {s.coverageNote}
            </p>
          </Panel>
        </div>
      </div>

      <Nav next={s.next} onNext={onNext} onBack={onBack} />
    </>
  );
}

/* ── Step 4 ───────────────────────────────────────────────────── */

function Schedule({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const s = devStepSchedule;

  return (
    <>
      <Band rows={s.bandRows} ring={s.ringPct} />

      <section className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
        <Head title={s.title} desc={s.desc} />
      </section>

      <div className="grid gap-4 xl:grid-cols-[1fr_300px] items-start">
        <div className="space-y-4 min-w-0">
          <Panel title={s.mapTitle}>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 mb-3 text-[10px] font-bold mr-auto"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
            >
              <Icon name="lucide:plus" size={12} style={{ backgroundColor: T.primary }} />
              {s.mapAdd}
            </button>

            <ol className="space-y-2.5">
              {s.weeks.map((w) => (
                <li key={w.label} className="flex items-start gap-3">
                  <span
                    className="w-24 shrink-0 p-2 text-center"
                    style={{
                      borderRadius: R.md,
                      backgroundColor: w.on ? T.tintPurple : '#fafafc',
                    }}
                  >
                    <span className="block text-[10.5px] font-extrabold" style={{ color: w.on ? T.primary : T.ink }}>
                      {w.label}
                    </span>
                    <span className="block text-[8.5px]" style={{ color: T.muted }}>
                      {w.range}
                    </span>
                  </span>

                  <span className="flex-1 grid gap-2 sm:grid-cols-2">
                    {w.rows.map((r) => (
                      <span
                        key={r.label}
                        className="flex items-center gap-2 p-2.5"
                        style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                      >
                        <span className="flex-1 text-right min-w-0">
                          <span className="block text-[10px] font-bold truncate" style={{ color: T.ink }}>
                            {r.label}
                          </span>
                          <span className="block text-[8.5px]" style={{ color: T.muted }}>
                            {r.note}
                          </span>
                        </span>
                        <Icon name={r.icon} size={14} style={{ backgroundColor: T.primary }} />
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title={s.ownersTitle}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-right border-collapse">
                <thead>
                  <tr>
                    {[s.ownersCols.approver, s.ownersCols.participants, s.ownersCols.owner, s.ownersCols.activity].map(
                      (c) => (
                        <th key={c} className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                          {c}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {s.owners.map((r) => (
                    <tr key={r.activity} style={{ borderTop: `1px solid ${T.border}` }}>
                      <td className="py-2.5">
                        {r.approverKind === 'badge' ? (
                          <span
                            className="px-2 py-0.5 text-[9px] font-bold"
                            style={{ borderRadius: R.sm, backgroundColor: T.tintGreen, color: T.successStrong }}
                          >
                            {r.approver}
                          </span>
                        ) : (
                          <span className="text-[10px]" style={{ color: T.ink }}>
                            {r.approver}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-[10px]" style={{ color: T.muted }}>
                        {r.people}
                      </td>
                      <td className="py-2.5 text-[10px] font-bold" style={{ color: T.ink }}>
                        {r.owner}
                      </td>
                      <td className="py-2.5 text-[10.5px]" style={{ color: T.ink }}>
                        {r.activity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className="grid gap-4 md:grid-cols-3">
            <Panel title={s.resourcesTitle}>
              <table className="w-full text-right border-collapse">
                <tbody>
                  {s.resources.map((r) => (
                    <tr key={r.resource} style={{ borderTop: `1px solid ${T.border}` }}>
                      <td className="py-2.5">
                        <span
                          className="px-2 py-0.5 text-[9px] font-bold whitespace-nowrap"
                          style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                        >
                          {r.state}
                        </span>
                      </td>
                      <td className="py-2.5 text-[10px]" style={{ color: T.ink }}>
                        {r.assigned}
                      </td>
                      <td className="py-2.5 text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {r.resource}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>

            <Panel title={s.risksTitle}>
              <ul className="space-y-2">
                {s.risks.map((r) => (
                  <li key={r.risk} className="text-right">
                    <span className="flex items-center justify-between gap-2">
                      <span
                        className="px-2 py-0.5 text-[9px] font-bold shrink-0"
                        style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                      >
                        {r.chance}
                      </span>
                      <span className="text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {r.risk}
                      </span>
                    </span>
                    <span className="block mt-0.5 text-[9px]" style={{ color: T.muted }}>
                      {r.fix}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title={s.progressTitle}>
              <ul className="space-y-2">
                {s.progress.map((p) => (
                  <li key={p.label} className="flex items-center gap-2">
                    <span className="w-8 text-[9.5px] font-bold shrink-0" style={{ color: T.ink }}>
                      {p.pct}٪
                    </span>
                    <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                      <span
                        className="block h-full rounded-full"
                        style={{ width: `${p.pct}%`, backgroundColor: T.success }}
                      />
                    </span>
                    <span className="w-16 text-right text-[9.5px] shrink-0" style={{ color: T.muted }}>
                      {p.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>

        <div className="space-y-4">
          <Panel title={s.calendarTitle}>
            <p className="text-center text-[11px] font-bold mb-2" style={{ color: T.primary }}>
              {s.calendarMonth}
            </p>

            <div className="grid grid-cols-7 gap-1 text-center">
              {s.calendarDays.map((d) => (
                <span key={d} className="text-[9px] font-bold" style={{ color: T.muted }}>
                  {d}
                </span>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const mark =
                  day === 5 ? T.tintGreen : day === 12 ? T.tintPurple : day === 19 ? T.tintRed : day === 26 ? T.tintOrange : undefined;
                return (
                  <span
                    key={day}
                    className="py-1.5 text-[9.5px]"
                    style={{ borderRadius: R.sm, backgroundColor: mark, color: T.ink }}
                  >
                    {day}
                  </span>
                );
              })}
            </div>

            <ul className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              {s.calendarLegend.map((l) => (
                <li key={l.label} className="flex items-center gap-1 text-[8.5px]" style={{ color: T.ink }}>
                  {l.label}
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.colour }} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={s.remindersTitle}>
            <ul className="space-y-3">
              {s.reminders.map((r) => (
                <li key={r.label} className="flex items-start gap-2.5">
                  <Toggle on={r.on} />
                  <span className="flex-1 text-right">
                    <span className="block text-[10.5px] font-bold" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {r.note}
                    </span>
                  </span>
                  <Icon name={r.icon} size={14} style={{ backgroundColor: r.fg }} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={s.statusTitle}>
            <ol className="space-y-1.5">
              {s.status.map((r) => (
                <li key={r.label} className="flex items-center gap-2.5">
                  <Icon
                    name={r.on ? 'lucide:circle-check' : r.current ? 'lucide:circle-dot' : 'lucide:circle-minus'}
                    size={14}
                    style={{ backgroundColor: r.on ? T.success : r.current ? T.primary : '#d5d7e3' }}
                  />
                  <span
                    className="flex-1 text-right text-[10.5px]"
                    style={{ color: T.ink, fontWeight: r.current ? 800 : 500 }}
                  >
                    {r.label}
                  </span>
                </li>
              ))}
            </ol>

            <dl className="mt-3 pt-3 space-y-1.5" style={{ borderTop: `1px solid ${T.border}` }}>
              {s.statusMeta.map((m) => (
                <div key={m.k} className="flex items-center justify-between text-[9.5px]">
                  <dd className="font-bold" style={{ color: T.ink }}>
                    {m.v}
                  </dd>
                  <dt style={{ color: T.muted }}>{m.k}</dt>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </div>

      <Nav next={s.next} onNext={onNext} onBack={onBack} />
    </>
  );
}

/* ── Step 5 ───────────────────────────────────────────────────── */

function Publish({ onBack }: { onBack: () => void }) {
  const s = devStepPublish;

  return (
    <>
      <Band rows={s.bandRows} />

      <section className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
        <Head title={s.title} desc={s.desc} />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={s.criteriaTitle}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                {[s.criteriaCols.change, s.criteriaCols.target, s.criteriaCols.current, s.criteriaCols.gap].map((c) => (
                  <th key={c} className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.criteria.map((r) => (
                <tr key={r.gap} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5">
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] font-bold shrink-0" style={{ color: r.colour }}>
                        {r.delta}
                      </span>
                      <span className="w-14 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${r.pct}%`, backgroundColor: r.colour }}
                        />
                      </span>
                    </span>
                  </td>
                  <td className="py-2.5 text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {r.target}
                  </td>
                  <td className="py-2.5 text-[10.5px]" style={{ color: T.muted }}>
                    {r.current}
                  </td>
                  <td className="py-2.5 text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {r.gap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {s.targets.map((t) => (
              <span key={t.label} className="p-2.5 text-center" style={{ borderRadius: R.md, backgroundColor: t.bg }}>
                <Icon name={t.icon} size={15} style={{ backgroundColor: t.fg, margin: '0 auto' }} />
                <span className="block mt-1 text-[8.5px]" style={{ color: T.muted }}>
                  {t.label}
                </span>
                <span className="block text-[11px] font-extrabold" style={{ color: t.fg }}>
                  {t.value}
                </span>
              </span>
            ))}
          </div>
        </Panel>

        <Panel title={s.methodsTitle}>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {s.methods.map((m) => (
              <span
                key={m.id}
                className="p-2.5"
                style={{
                  borderRadius: R.md,
                  border: `1.5px solid ${m.on ? T.primary : T.border}`,
                  backgroundColor: m.on ? '#fbfaff' : '#fff',
                }}
              >
                <span className="flex items-center justify-between">
                  <Check on={m.on} />
                </span>
                <span className="block mt-1.5 text-right text-[10.5px] font-bold" style={{ color: T.ink }}>
                  {m.label}
                </span>
                <span className="block text-right text-[8.5px]" style={{ color: T.muted }}>
                  {m.note}
                </span>
              </span>
            ))}
          </div>

          <label className="block mt-3.5">
            <span className="block text-right text-[10px]" style={{ color: T.muted }}>
              {s.methodTiming.label}
            </span>
            <Select value={s.methodTiming.value} />
          </label>
        </Panel>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={s.forecastTitle}>
          <div className="p-3.5 text-center" style={{ borderRadius: R.md, backgroundColor: T.tintGreen }}>
            <Icon name="lucide:target" size={22} style={{ backgroundColor: T.successStrong, margin: '0 auto' }} />
            <span className="block mt-1.5 text-[9.5px]" style={{ color: T.muted }}>
              {s.forecast.label}
            </span>
            <span className="block text-[22px] font-extrabold" style={{ color: T.successStrong }}>
              {s.forecast.value}
            </span>
            <span className="block text-[8.5px] leading-4" style={{ color: T.muted }}>
              {s.forecast.note}
            </span>
          </div>

          <h3 className="mt-3.5 text-right text-[11px] font-extrabold" style={{ color: T.ink }}>
            {s.risksTitle}
          </h3>
          <ul className="mt-2 space-y-2">
            {s.risks.map((r) => (
              <li key={r.label} className="flex items-start gap-2">
                <span
                  className="px-2 py-0.5 text-[8.5px] font-bold shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: r.bg, color: r.fg }}
                >
                  {r.level}
                </span>
                <span className="flex-1 text-right">
                  <span className="block text-[10px] font-bold" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block text-[8.5px] leading-4" style={{ color: T.muted }}>
                    {r.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <button
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold"
            style={{ borderRadius: R.md, border: `1.5px solid ${T.primary}`, color: T.primary }}
          >
            <Icon name="lucide:sparkles" size={13} style={{ backgroundColor: T.primary }} />
            {s.optimise}
          </button>
        </Panel>

        <Panel title={s.timingTitle}>
          <ol className="flex items-center justify-between mb-3">
            {s.timing.map((t, i) => (
              <li key={t.label} className="flex-1 text-center">
                <span
                  className="w-3 h-3 rounded-full mx-auto block"
                  style={{ backgroundColor: t.on ? T.primary : '#d5d7e3' }}
                />
                <span className="block mt-1 text-[8.5px] font-bold" style={{ color: T.ink }}>
                  {t.label}
                </span>
                <span className="block text-[7.5px]" style={{ color: T.muted }}>
                  {t.sub}
                </span>
                <span className="block text-[7.5px]" style={{ color: T.muted }}>
                  {t.date}
                </span>
              </li>
            ))}
          </ol>

          <ul className="space-y-2">
            {s.timingRows.map((r) => (
              <li
                key={r.label}
                className="flex items-center gap-2.5 p-2.5"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <span className="text-[9px] shrink-0" style={{ color: T.muted }}>
                  {r.note}
                </span>
                <span className="flex-1 text-right text-[10.5px] font-bold" style={{ color: T.ink }}>
                  {r.label}
                </span>
                <Icon name={r.icon} size={14} style={{ backgroundColor: r.fg }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={s.publishTitle}>
          <ul className="space-y-2">
            {s.publishTo.map((p) => (
              <li key={p.id} className="flex items-center gap-2.5">
                <Check on={p.on} />
                <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                  {p.label}
                </span>
                <Icon name={p.icon} size={14} style={{ backgroundColor: T.primary }} />
              </li>
            ))}
          </ul>

          <button className="mt-2 flex items-center gap-1.5 text-[10px] font-bold" style={{ color: T.primary }}>
            <Icon name="lucide:plus" size={12} style={{ backgroundColor: T.primary }} />
            {s.addRecipient}
          </button>

          <div className="mt-3 space-y-2.5">
            {s.accessRows.map((a) => (
              <label key={a.label} className="block">
                <span className="block text-right text-[9px]" style={{ color: T.muted }}>
                  {a.label}
                </span>
                <Select value={a.value} />
              </label>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={s.messageTitle}>
          <label className="block">
            <span className="block text-right text-[9.5px]" style={{ color: T.muted }}>
              {s.message.label}
            </span>
            <input
              defaultValue={s.message.value}
              className="w-full mt-1.5 px-3 py-2.5 text-right text-[11px] outline-none"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            />
          </label>

          <label className="block mt-3">
            <span className="block text-right text-[9.5px]" style={{ color: T.muted }}>
              {s.message.bodyLabel}
            </span>
            <textarea
              rows={3}
              defaultValue={s.message.body}
              className="w-full mt-1.5 px-3 py-2.5 text-right text-[11px] outline-none resize-none"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            />
          </label>

          <h3 className="mt-3 text-right text-[10.5px] font-extrabold" style={{ color: T.ink }}>
            {s.channelsTitle}
          </h3>
          <ul className="mt-2 space-y-2">
            {s.channels.map((c) => (
              <li key={c.id} className="flex items-center gap-2.5">
                <Check on={c.on} />
                <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={s.checklistTitle}>
          <ul className="grid gap-2 sm:grid-cols-2">
            {s.checklist.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[10px]" style={{ color: T.ink }}>
                <span className="flex-1 text-right">{c}</span>
                <Icon name="lucide:circle-check" size={13} style={{ backgroundColor: T.success }} />
              </li>
            ))}
          </ul>

          <div className="mt-3.5 p-3.5 text-center" style={{ borderRadius: R.md, backgroundColor: T.tintGreen }}>
            <Icon name="lucide:circle-check" size={24} style={{ backgroundColor: T.successStrong, margin: '0 auto' }} />
            <span className="block mt-1.5 text-[12.5px] font-extrabold" style={{ color: T.successStrong }}>
              {s.ready.title}
            </span>
            <span className="block text-[9.5px]" style={{ color: T.muted }}>
              {s.ready.note}
            </span>
          </div>
        </Panel>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:arrow-right" size={16} style={{ backgroundColor: T.muted }} />
          {devWizardHead.back}
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:bookmark" size={16} style={{ backgroundColor: T.muted }} />
            {devWizardHead.draft}
          </button>

          <button
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:eye" size={16} style={{ backgroundColor: T.muted }} />
            {s.preview}
          </button>

          <button
            data-ripple
            className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:send" size={16} className="text-white" />
            {s.publish}
          </button>
        </div>
      </div>
    </>
  );
}
