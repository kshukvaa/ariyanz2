'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { Stepper, Label, Select, Toggle, Check, Radio } from './WizardParts';
import {
  builderHead,
  builderSteps,
  stepScope,
  stepData,
  stepDesign,
  stepOutput,
  reportPreview,
} from '@/data/orgReportBuilder';

/* ──────────────────────────────────────────────────────────────
   Custom report builder.

   Four steps, and a live preview that appears from step two
   onward — once the data is chosen there is something real to
   show, and seeing it is what stops people building a report they
   did not want.
────────────────────────────────────────────────────────────── */

export default function ReportBuilderClient() {
  const [step, setStep] = useState(0);
  const go = (n: number) => setStep(Math.max(0, Math.min(builderSteps.length - 1, n)));

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <div className="flex items-center gap-2.5">
          <button
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:bookmark" size={16} style={{ backgroundColor: T.muted }} />
            {builderHead.draft}
          </button>

          <button
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1.5px solid ${T.primary}`, color: T.primary }}
          >
            <Icon name="lucide:eye" size={16} style={{ backgroundColor: T.primary }} />
            {builderHead.preview}
          </button>
        </div>

        <div className="text-right">
          <nav className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            {builderHead.crumbs.map((c, i) => (
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
              {builderHead.title}
            </h1>
            <Icon name="lucide:file-cog" size={23} style={{ backgroundColor: T.primary }} />
          </div>
        </div>
      </div>

      <Stepper current={step} steps={builderSteps} />

      {step === 0 && <StepScope onNext={() => go(1)} />}
      {step === 1 && <StepData onNext={() => go(2)} onBack={() => go(0)} />}
      {step === 2 && <StepDesign onNext={() => go(3)} onBack={() => go(1)} />}
      {step === 3 && <StepOutput onBack={() => go(2)} />}
    </div>
  );
}

/* ── Shared ───────────────────────────────────────────────────── */

function Head({ title, desc, icon = 'lucide:crosshair' }: { title: string; desc: string; icon?: string }) {
  return (
    <header className="flex items-start gap-3">
      <div className="flex-1 text-right">
        <h2 className="text-[17px] font-extrabold" style={{ color: T.ink }}>
          {title}
        </h2>
        <p className="mt-1 text-[12px]" style={{ color: T.muted }}>
          {desc}
        </p>
      </div>
      <Icon name={icon} size={22} style={{ backgroundColor: T.primary }} />
    </header>
  );
}

function Block({
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
      className="bg-white p-5"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <h3 className="text-right text-[14px] font-extrabold" style={{ color: T.ink }}>
        {title}
      </h3>
      {desc && (
        <p className="mt-1 text-right text-[11.5px]" style={{ color: T.muted }}>
          {desc}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Footer({
  next,
  onNext,
  onBack,
  first,
  tone = T.primaryStrong,
  icon = 'lucide:arrow-left',
}: {
  next: string;
  onNext?: () => void;
  onBack?: () => void;
  first?: boolean;
  tone?: string;
  icon?: string;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap justify-between">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
      >
        {!first && <Icon name="lucide:arrow-right" size={16} style={{ backgroundColor: T.muted }} />}
        {first ? builderHead.cancel : builderHead.back}
      </button>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:bookmark" size={16} style={{ backgroundColor: T.muted }} />
          {builderHead.draft}
        </button>

        <button
          onClick={onNext}
          data-ripple
          className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: tone }}
        >
          {next}
          <Icon name={icon} size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}

/* The scope strip that heads steps 2–4. */
function ScopeStrip({ extra }: { extra?: { icon: string; k: string; v: string } }) {
  const rows = extra ? [extra, ...stepData.summary] : stepData.summary;

  return (
    <section
      className="bg-white p-4 flex items-center gap-4 flex-wrap"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <button
        className="flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-bold shrink-0"
        style={{ borderRadius: R.md, border: `1.5px solid ${T.primary}`, color: T.primary }}
      >
        <Icon name="lucide:pencil" size={14} style={{ backgroundColor: T.primary }} />
        {stepData.editScope}
      </button>

      <div className="flex-1 flex items-center gap-5 flex-wrap justify-end">
        {rows.map((s) => (
          <span key={s.k} className="flex items-center gap-2.5">
            <span className="text-right">
              <span className="block text-[10.5px]" style={{ color: T.muted }}>
                {s.k}
              </span>
              <span className="block text-[12.5px] font-bold" style={{ color: T.ink }}>
                {s.v}
              </span>
            </span>
            <span
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
            >
              <Icon name={s.icon} size={16} style={{ backgroundColor: T.primary }} />
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ── Step 1 ───────────────────────────────────────────────────── */

function StepScope({ onNext }: { onNext: () => void }) {
  const s = stepScope;
  const [type, setType] = useState('org');
  const [compare, setCompare] = useState(true);

  return (
    <>
      <section
        className="bg-white p-5"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <Head title={s.title} desc={s.desc} />
      </section>

      <Block title={s.typeTitle} desc={s.typeDesc}>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {s.types.map((t) => {
            const on = t.id === type;
            return (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                aria-pressed={on}
                className="p-4 text-right transition-colors"
                style={{
                  borderRadius: R.md,
                  border: `1.5px solid ${on ? T.primary : T.border}`,
                  backgroundColor: on ? '#fbfaff' : '#fff',
                }}
              >
                <span className="flex items-start gap-2.5">
                  <span
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ borderRadius: R.sm, backgroundColor: t.bg }}
                  >
                    <Icon name={t.icon} size={19} style={{ backgroundColor: t.fg }} />
                  </span>
                  <span className="flex-1" />
                  <span
                    className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                    style={{ border: `1.5px solid ${on ? T.primary : '#cdd0e0'}` }}
                  >
                    {on && (
                      <Icon name="lucide:check" size={11} style={{ backgroundColor: T.primary }} />
                    )}
                  </span>
                </span>

                <span className="block mt-3 text-[13px] font-extrabold" style={{ color: T.ink }}>
                  {t.label}
                </span>
                <span className="block mt-1 text-[10.5px] leading-5" style={{ color: T.muted }}>
                  {t.desc}
                </span>
              </button>
            );
          })}
        </div>
      </Block>

      <Block title={s.audienceTitle} desc={s.audienceDesc}>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {s.audience.map((a) => (
            <label key={a.id} className="block">
              <span className="block text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
                {a.label}
              </span>
              <Select value={a.value} />
            </label>
          ))}
        </div>

        <div
          className="mt-4 flex items-center gap-3 p-4"
          style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
        >
          <span
            className="w-11 h-11 flex items-center justify-center shrink-0 bg-white"
            style={{ borderRadius: R.sm }}
          >
            <Icon name="lucide:users-round" size={20} style={{ backgroundColor: T.primary }} />
          </span>
          <span className="flex-1 text-right">
            <span className="block text-[11.5px]" style={{ color: T.muted }}>
              {s.population.label}
            </span>
            <span className="block text-[19px] font-extrabold" style={{ color: T.ink }}>
              {s.population.value}
            </span>
            <span className="block text-[10px]" style={{ color: T.muted }}>
              {s.population.note}
            </span>
          </span>
        </div>
      </Block>

      <Block title={s.periodTitle} desc={s.periodDesc}>
        <div className="grid gap-4 lg:grid-cols-3 items-end">
          <label className="block">
            <span className="block text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
              {s.period.label}
            </span>
            <Select value={s.period.value} />
          </label>

          <div
            className="flex items-center gap-2.5 p-4 text-center"
            style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
          >
            <Icon name="lucide:refresh-cw" size={17} style={{ backgroundColor: T.primary }} />
            <span className="flex-1 text-[11px]" style={{ color: T.muted }}>
              {s.compareNote}
            </span>
          </div>

          <label className="block">
            <span className="block text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
              {s.comparePeriod.label}
            </span>
            <Select value={s.comparePeriod.value} />
          </label>
        </div>

        <button
          onClick={() => setCompare(!compare)}
          className="mt-4 flex items-center gap-2.5"
          aria-pressed={compare}
        >
          <Check on={compare} />
          <span className="text-[12.5px] font-semibold" style={{ color: T.ink }}>
            {s.compare.label}
          </span>
        </button>
      </Block>

      <Footer next={s.next} onNext={onNext} first />
    </>
  );
}

/* ── Step 2 ───────────────────────────────────────────────────── */

function StepData({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const s = stepData;
  const [open, setOpen] = useState<string | null>('base');
  const [detail, setDetail] = useState('standard');

  return (
    <>
      <ScopeStrip />

      {/* Screen 25 reverses the usual arrangement: the picker sits on
          the left and the preview takes the right, because here the
          preview is the object being worked on rather than a summary
          of it. RTL puts the first column on the right, so the preview
          is declared first. */}
      <div className="grid gap-5 xl:grid-cols-[1fr_360px] items-start">
        {/* The picker takes the 360px track, which RTL places on the left. */}
        <div className="space-y-4 xl:order-2">
          <section
            className="bg-white p-4"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <h3 className="text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
              {s.pickTitle}
            </h3>
            <p className="mt-1 text-right text-[11px]" style={{ color: T.muted }}>
              {s.pickDesc}
            </p>

            <ul className="mt-3.5 space-y-2">
              {s.groups.map((g) => {
                const isOpen = open === g.id;
                return (
                  <li key={g.id} style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
                    <button
                      onClick={() => setOpen(isOpen ? null : g.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-2.5 p-3"
                    >
                      <Check on />
                      <span
                        className="px-2 py-0.5 text-[10px] font-bold shrink-0"
                        style={{ borderRadius: R.sm, backgroundColor: '#f4f4f8', color: T.muted }}
                      >
                        {g.count}
                      </span>
                      <Icon
                        name="lucide:chevron-down"
                        size={14}
                        style={{
                          backgroundColor: T.muted,
                          transform: isOpen ? 'rotate(180deg)' : undefined,
                          transition: 'transform .2s',
                        }}
                      />
                      <span className="flex-1 text-right text-[12.5px] font-bold" style={{ color: T.ink }}>
                        {g.label}
                      </span>
                      <Icon name={g.icon} size={17} style={{ backgroundColor: g.fg }} />
                    </button>

                    {isOpen && (
                      <ul className="pb-2.5 px-3 space-y-1.5">
                        {g.items.map((i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <Check on />
                            <span className="flex-1 text-right text-[11px]" style={{ color: T.muted }}>
                              {i}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 flex items-center justify-between gap-2 flex-wrap text-[10.5px] font-bold">
              <button style={{ color: T.muted }}>{s.actions.only}</button>
              <button style={{ color: T.danger }}>{s.actions.none}</button>
              <button style={{ color: T.primary }}>{s.actions.all}</button>
            </div>
          </section>

          <section className="p-4" style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}>
            <h3 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.primary }}>
              {s.aiTitle}
              <Icon name="lucide:sparkles" size={16} style={{ backgroundColor: T.primary }} />
            </h3>
            <p className="mt-1 text-right text-[10.5px]" style={{ color: T.muted }}>
              {s.aiDesc}
            </p>

            <ul className="mt-3 space-y-2">
              {s.aiItems.map((i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-white"
                  style={{ borderRadius: R.md }}
                >
                  <Icon name="lucide:plus" size={14} style={{ backgroundColor: T.primary }} />
                  <span className="flex-1 text-right text-[11px]" style={{ color: T.ink }}>
                    {i}
                  </span>
                </li>
              ))}
            </ul>

            <button
              data-ripple
              className="mt-3 w-full py-2.5 text-[12px] font-bold text-white"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              {s.aiCta}
            </button>
          </section>
        </div>

        <div className="space-y-4 min-w-0 xl:order-1">
          <section
            className="bg-white p-5"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <h3 className="text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
              {s.previewTitle}
            </h3>
            <p className="mt-1 text-right text-[11px]" style={{ color: T.muted }}>
              {s.previewDesc}
            </p>

            <div className="mt-4">
              <ReportPreview />
            </div>
          </section>

          <section
            className="bg-white p-5"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <h3 className="text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
              {s.detailTitle}
            </h3>
            <p className="mt-1 text-right text-[11px]" style={{ color: T.muted }}>
              {s.detailDesc}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {s.details.map((d) => {
                const on = d.id === detail;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDetail(d.id)}
                    aria-pressed={on}
                    className="p-4 text-center transition-colors"
                    style={{
                      borderRadius: R.md,
                      border: `1.5px solid ${on ? T.primary : T.border}`,
                      backgroundColor: on ? '#fbfaff' : '#fff',
                    }}
                  >
                    <span className="flex items-center justify-between">
                      <Icon name={d.icon} size={19} style={{ backgroundColor: d.fg }} />
                      {on && (
                        <Icon name="lucide:circle-check" size={17} style={{ backgroundColor: T.primary }} />
                      )}
                    </span>
                    <span className="block mt-2.5 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                      {d.label}
                    </span>
                    <span className="block mt-1 text-[10px] leading-5" style={{ color: T.muted }}>
                      {d.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <Footer next={s.next} onNext={onNext} onBack={onBack} />
    </>
  );
}

/* ── Step 3 ───────────────────────────────────────────────────── */

function StepDesign({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const s = stepDesign;
  const [selected, setSelected] = useState('۴');

  return (
    <>
      <ScopeStrip />

      <div className="grid gap-4 xl:grid-cols-[250px_1fr_270px] items-start">
        {/* RTL order: library right, canvas centre, settings left. */}
        <section
          className="bg-white p-4"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {s.libraryTitle}
          </h3>
          <p className="mt-1 text-right text-[10px]" style={{ color: T.muted }}>
            {s.libraryDesc}
          </p>

          <ul className="mt-3 space-y-2">
            {s.library.map((l) => (
              <li
                key={l.id}
                className="flex items-center gap-2.5 p-2.5 cursor-grab transition-colors hover:bg-gray-50"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[11.5px] font-bold truncate" style={{ color: T.ink }}>
                    {l.label}
                  </span>
                  <span className="block text-[9.5px] truncate" style={{ color: T.muted }}>
                    {l.desc}
                  </span>
                </span>
                <Icon name={l.icon} size={17} style={{ backgroundColor: l.fg }} />
              </li>
            ))}
          </ul>
        </section>

        <section
          className="bg-white p-4 min-w-0"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <header className="flex items-center gap-2.5 flex-wrap">
            <button
              className="flex items-center gap-2 px-3.5 py-2 text-[11px] font-bold"
              style={{ borderRadius: R.md, border: `1.5px solid ${T.primary}`, color: T.primary }}
            >
              <Icon name="lucide:wand-sparkles" size={14} style={{ backgroundColor: T.primary }} />
              {s.autoLayout}
            </button>

            <div className="flex items-center gap-1">
              {reportPreview.views.map((v, i) => (
                <button
                  key={v}
                  className="px-3 py-2 text-[10.5px] font-bold"
                  style={
                    i === 0
                      ? { borderRadius: R.sm, backgroundColor: T.primaryStrong, color: '#fff' }
                      : { borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }
                  }
                >
                  {v}
                </button>
              ))}
            </div>

            <h3 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
              {s.canvasTitle}
            </h3>
          </header>

          <ul className="mt-4 space-y-2.5">
            {s.blocks.map((b) => {
              const on = b.n === selected;
              return (
                <li
                  key={b.n}
                  onClick={() => setSelected(b.n)}
                  className="flex items-center gap-3 p-3 cursor-pointer transition-colors"
                  style={{
                    borderRadius: R.md,
                    border: `1.5px solid ${on ? T.primary : T.border}`,
                    backgroundColor: on ? '#fbfaff' : '#fff',
                  }}
                >
                  <span className="flex items-center gap-1 shrink-0">
                    <BlockBtn icon="lucide:trash-2" label="حذف" />
                    <BlockBtn icon="lucide:pencil" label="ویرایش" />
                    <BlockBtn icon="lucide:eye" label="نمایش" />
                    <BlockBtn icon="lucide:ellipsis" label="بیشتر" />
                  </span>

                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 text-white"
                    style={{ backgroundColor: on ? T.primaryStrong : T.muted }}
                  >
                    {b.n}
                  </span>

                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[12.5px] font-extrabold truncate" style={{ color: T.ink }}>
                      {b.label}
                    </span>
                    <span className="block text-[10px] truncate" style={{ color: T.muted }}>
                      {b.desc}
                    </span>
                  </span>

                  <span
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
                  >
                    <Icon name={b.icon} size={16} style={{ backgroundColor: T.primary }} />
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className="bg-white p-4"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {s.settingsTitle}
          </h3>

          <div className="mt-3.5 space-y-3.5">
            <label className="block">
              <span className="block text-right text-[11px]" style={{ color: T.muted }}>
                {s.settings.name.label}
              </span>
              <input
                defaultValue={s.settings.name.value}
                className="w-full mt-1.5 px-3 py-2.5 text-right text-[11.5px] outline-none"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
              />
            </label>

            {[s.settings.chart, s.settings.metric, s.settings.dimension, s.settings.sort, s.settings.limit].map(
              (f) => (
                <label key={f.label} className="block">
                  <span className="block text-right text-[11px]" style={{ color: T.muted }}>
                    {f.label}
                  </span>
                  <Select value={f.value} />
                </label>
              )
            )}

            {[s.settings.benchmark, s.settings.values].map((t) => (
              <div key={t.label} className="flex items-center gap-2.5">
                <Toggle on={t.on} />
                <span className="flex-1 text-right text-[11.5px] font-semibold" style={{ color: T.ink }}>
                  {t.label}
                </span>
              </div>
            ))}

            <label className="block">
              <span className="block text-right text-[11px]" style={{ color: T.muted }}>
                {s.settings.palette.label}
              </span>
              <Select value={s.settings.palette.value} />
              <span className="mt-2.5 flex items-center gap-1.5 justify-end">
                {s.colours.map((c) => (
                  <span
                    key={c}
                    className="w-7 h-7"
                    style={{ borderRadius: R.sm, backgroundColor: c }}
                  />
                ))}
              </span>
            </label>

            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold"
              style={{ borderRadius: R.md, backgroundColor: T.tintRed, color: T.danger }}
            >
              <Icon name="lucide:trash-2" size={14} style={{ backgroundColor: T.danger }} />
              {s.settings.remove}
            </button>
          </div>
        </section>
      </div>

      <Footer next={s.next} onNext={onNext} onBack={onBack} />
    </>
  );
}

function BlockBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
      className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-gray-100"
      style={{ borderRadius: R.sm }}
    >
      <Icon name={icon} size={13} style={{ backgroundColor: T.muted }} />
    </button>
  );
}

/* ── Step 4 ───────────────────────────────────────────────────── */

function StepOutput({ onBack }: { onBack: () => void }) {
  const s = stepOutput;
  const [format, setFormat] = useState('pdf');
  const [visibility, setVisibility] = useState('partial');
  const [access, setAccess] = useState('people');
  const [publish, setPublish] = useState('scheduled');

  return (
    <>
      <ScopeStrip extra={s.summaryExtra} />

      {/* As on step 2, the preview holds the right-hand track and the
          controls run down the left. RTL fills the first track first,
          so the 400px preview column is declared as order-1. */}
      <div className="grid gap-5 xl:grid-cols-[400px_1fr] items-start">
        <div className="space-y-4 min-w-0 xl:order-2">
          <Block title={s.metaTitle}>
            <div className="space-y-4">
              <label className="block">
                <Label required={s.meta.name.required}>{s.meta.name.label}</Label>
                <input
                  defaultValue={s.meta.name.value}
                  className="w-full mt-2 px-4 py-3 text-right text-[12.5px] outline-none"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                />
              </label>

              <label className="block">
                <Label>{s.meta.desc.label}</Label>
                <textarea
                  rows={2}
                  defaultValue={s.meta.desc.value}
                  className="w-full mt-2 px-4 py-3 text-right text-[12.5px] outline-none resize-none"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                />
              </label>

              <div>
                <Label>{s.meta.tags.label}</Label>
                <div className="mt-2 flex items-center gap-2 flex-wrap justify-end">
                  {s.meta.tags.values.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold"
                      style={{ borderRadius: R.pill, backgroundColor: T.tintPurple, color: T.primary }}
                    >
                      <Icon name="lucide:x" size={11} style={{ backgroundColor: T.primary }} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Block>

          <Block title={s.formatTitle} desc={s.formatDesc}>
            <div className="grid gap-3 sm:grid-cols-3">
              {s.formats.map((f) => {
                const on = f.id === format;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    aria-pressed={on}
                    className="p-4 text-center transition-colors relative"
                    style={{
                      borderRadius: R.md,
                      border: `1.5px solid ${on ? T.primary : T.border}`,
                      backgroundColor: on ? '#fbfaff' : '#fff',
                    }}
                  >
                    {on && (
                      <Icon
                        name="lucide:circle-check"
                        size={16}
                        style={{ backgroundColor: T.primary, position: 'absolute', top: 10, left: 10 }}
                      />
                    )}
                    <Icon name={f.icon} size={24} style={{ backgroundColor: f.fg, margin: '0 auto' }} />
                    <span className="block mt-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
                      {f.label}
                    </span>
                    <span className="block text-[10px]" style={{ color: T.muted }}>
                      {f.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <h4 className="text-right text-[12px] font-extrabold" style={{ color: T.ink }}>
                {s.pdfTitle}
              </h4>
              <ul className="mt-2.5 space-y-2.5">
                {s.pdfOptions.map((o) => (
                  <li key={o.id} className="flex items-center gap-2.5">
                    {o.extra && (
                      <span
                        className="flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] shrink-0"
                        style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                      >
                        {o.extra}
                        <Icon name="lucide:calendar" size={12} style={{ backgroundColor: T.muted }} />
                      </span>
                    )}
                    <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
                      {o.label}
                    </span>
                    <Check on={o.on} />
                  </li>
                ))}
              </ul>
            </div>
          </Block>

          <Block title={s.accessTitle}>
            <span className="block text-right text-[12px] font-bold" style={{ color: T.ink }}>
              {s.visibility.label}
            </span>

            <div className="mt-2.5 grid gap-3 sm:grid-cols-3">
              {s.visibility.options.map((o) => {
                const on = o.id === visibility;
                return (
                  <button
                    key={o.id}
                    onClick={() => setVisibility(o.id)}
                    aria-pressed={on}
                    className="p-3.5 text-center transition-colors"
                    style={{
                      borderRadius: R.md,
                      border: `1.5px solid ${on ? T.primary : T.border}`,
                      backgroundColor: on ? o.bg : '#fff',
                    }}
                  >
                    <Icon name={o.icon} size={20} style={{ backgroundColor: o.fg, margin: '0 auto' }} />
                    <span className="block mt-2 text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                      {o.label}
                    </span>
                    <span className="block mt-0.5 text-[9.5px] leading-4" style={{ color: T.muted }}>
                      {o.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            <p
              className="mt-3 p-3 text-right text-[10.5px]"
              style={{ borderRadius: R.sm, backgroundColor: '#fafafc', color: T.muted }}
            >
              {s.visibility.note}
            </p>

            <span className="block mt-4 text-right text-[12px] font-bold" style={{ color: T.ink }}>
              {s.access.label}
            </span>
            <ul className="mt-2.5 space-y-2.5">
              {s.access.options.map((o) => (
                <li key={o.id}>
                  <button
                    onClick={() => setAccess(o.id)}
                    className="w-full flex items-center gap-2.5"
                    aria-pressed={o.id === access}
                  >
                    <Radio on={o.id === access} />
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
                  </button>
                </li>
              ))}
            </ul>
          </Block>

          <Block title={s.publishTitle}>
            <ul className="space-y-2.5">
              {s.publish.options.map((o) => (
                <li key={o.id}>
                  <button
                    onClick={() => setPublish(o.id)}
                    className="w-full flex items-center gap-2.5"
                    aria-pressed={o.id === publish}
                  >
                    <Radio on={o.id === publish} />
                    <span className="flex-1 text-right text-[11.5px] font-semibold" style={{ color: T.ink }}>
                      {o.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
              {[s.publish.template, s.publish.cadence, s.publish.time, s.publish.start, s.publish.end].map(
                (f) => (
                  <label key={f.label} className="block">
                    <span className="block text-right text-[11px]" style={{ color: T.muted }}>
                      {f.label}
                    </span>
                    <Select value={f.value} />
                  </label>
                )
              )}

              <div>
                <span className="block text-right text-[11px]" style={{ color: T.muted }}>
                  {s.publish.to.label}
                </span>
                <span
                  className="flex items-center gap-2 px-4 py-2.5 mt-2"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <span className="flex items-center -space-x-2">
                    {['org-manager-header', 'emp-mehdi-ahmadi-nav', 'staff-sara-karimi'].map((a) => (
                       
                      <img
                        key={a}
                        src={`/images/aryaz/avatars/${a}.png`}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover border-2 border-white"
                      />
                    ))}
                  </span>
                  <span className="text-[10.5px] font-bold" style={{ color: T.primary }}>
                    {s.publish.to.extra}
                  </span>
                  <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
                    {s.publish.to.value}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              <Toggle on={s.publish.keepTemplate.on} />
              <span className="flex-1 text-right">
                <span className="block text-[11.5px] font-semibold" style={{ color: T.ink }}>
                  {s.publish.keepTemplate.label}
                </span>
                <span className="block text-[10px]" style={{ color: T.muted }}>
                  {s.publish.note}
                </span>
              </span>
            </div>
          </Block>
        </div>

        <aside className="space-y-4 xl:order-1 xl:sticky xl:top-24">
          <section
            className="bg-white p-4"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <h3 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
              {builderHead.finalPreview}
              <Icon name="lucide:sparkles" size={16} style={{ backgroundColor: T.primary }} />
            </h3>

            <div className="mt-3">
              <ReportPreview cover />
            </div>
          </section>

          <section
            className="bg-white p-4"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {s.checklist.title}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {s.checklist.items.map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <span className="flex-1 text-right text-[11px]" style={{ color: T.ink }}>
                    {c}
                  </span>
                  <Icon name="lucide:circle-check" size={15} style={{ backgroundColor: T.success }} />
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <Footer
        next={s.publishCta}
        onBack={onBack}
        icon="lucide:rocket"
      />
    </>
  );
}

/* ── The live report preview ──────────────────────────────────── */

function ReportPreview({ cover }: { cover?: boolean }) {
  const p = reportPreview;

  return (
    <div style={{ borderRadius: R.md, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
      <div className="flex items-center gap-1 p-2.5" style={{ borderBottom: `1px solid ${T.border}` }}>
        {p.views.map((v, i) => (
          <button
            key={v}
            className="px-3 py-1.5 text-[10px] font-bold"
            style={
              i === 0
                ? { borderRadius: R.sm, backgroundColor: T.primaryStrong, color: '#fff' }
                : { borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }
            }
          >
            {v}
          </button>
        ))}
      </div>

      <div className="p-4">
        <header className="flex items-start justify-between gap-3">
          <span
            className="px-2.5 py-1 text-[9.5px] font-bold flex items-center gap-1.5"
            style={{ borderRadius: R.sm, backgroundColor: T.sidebar, color: '#fff' }}
          >
            <Icon name="lucide:lock-keyhole" size={10} style={{ backgroundColor: '#fff' }} />
            {p.confidential}
          </span>

          <span className="text-left">
            <span className="flex items-center gap-1.5 justify-end">
              <span className="text-[13px] font-extrabold" style={{ color: T.ink }}>
                {p.brand}
              </span>
              <img src="/images/aryaz/brand/aryaz-mark.png" alt="" className="h-5 w-auto" />
            </span>
            <span className="block text-[8px]" style={{ color: T.muted }}>
              {p.tagline}
            </span>
          </span>
        </header>

        <div className="mt-4 text-center">
          <h4 className="text-[15px] font-extrabold" style={{ color: T.ink }}>
            {p.title}
          </h4>
          <p className="mt-1 text-[10px]" style={{ color: T.muted }}>
            {p.period}
          </p>
          <p className="text-[10px]" style={{ color: T.muted }}>
            {p.audience} — {p.count}
          </p>
        </div>

        {cover && (
          <div
            className="mt-3 h-16"
            style={{
              borderRadius: R.sm,
              background: `linear-gradient(115deg, ${T.primaryStrong}, ${T.violet})`,
            }}
          />
        )}

        <section className="mt-4">
          <h5 className="flex items-center justify-end gap-1.5 text-[11px] font-extrabold" style={{ color: T.primary }}>
            {p.execTitle}
            <Icon name="lucide:sparkles" size={12} style={{ backgroundColor: T.primary }} />
          </h5>
          <p className="mt-1.5 text-right text-[9.5px] leading-5" style={{ color: T.muted }}>
            {p.execBody}
          </p>
        </section>

        <section className="mt-3.5">
          <h5 className="text-right text-[11px] font-extrabold" style={{ color: T.ink }}>
            {p.kpiTitle}
          </h5>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {p.kpis.map((k) => (
              <span
                key={k.k}
                className="p-2 text-center"
                style={{ borderRadius: R.sm, backgroundColor: '#fafafc' }}
              >
                <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                  {k.v}
                </span>
                <span className="block text-[8px]" style={{ color: T.muted }}>
                  {k.k}
                </span>
              </span>
            ))}
          </div>
        </section>

        <section className="mt-3.5">
          <h5 className="text-right text-[11px] font-extrabold" style={{ color: T.ink }}>
            {p.chartsTitle}
          </h5>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { icon: 'lucide:trending-up', fg: T.primary },
              { icon: 'lucide:circle-dot', fg: T.accent },
              { icon: 'lucide:radar', fg: T.infoStrong },
            ].map((c, i) => (
              <span
                key={c.icon}
                className="h-16 flex flex-col items-center justify-center gap-1"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
              >
                <Icon name={c.icon} size={20} style={{ backgroundColor: c.fg }} />
                <span className="text-[7.5px] text-center px-1" style={{ color: T.muted }}>
                  {p.charts[i]}
                </span>
              </span>
            ))}
          </div>
        </section>

        <section className="mt-3.5">
          <h5 className="text-right text-[11px] font-extrabold" style={{ color: T.ink }}>
            {p.talentTitle}
          </h5>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {[T.tintGreen, T.tintGreen, T.tintBlue, T.tintGreen, T.tintBlue, T.tintOrange, T.tintBlue, T.tintOrange, T.tintRed].map(
              (c, i) => (
                <span
                  key={i}
                  className="h-7"
                  style={{ borderRadius: 4, backgroundColor: c }}
                />
              )
            )}
          </div>
          <p className="mt-1.5 text-right text-[8.5px]" style={{ color: T.muted }}>
            {p.talentSub}
          </p>
        </section>

        <section className="mt-3.5">
          <h5 className="text-right text-[11px] font-extrabold" style={{ color: T.ink }}>
            {p.notesTitle}
          </h5>
          <ul className="mt-2 space-y-1.5">
            {p.notes.map((n) => (
              <li key={n} className="flex items-start gap-1.5">
                <span className="flex-1 text-right text-[9px] leading-4" style={{ color: T.muted }}>
                  {n}
                </span>
                <Icon name="lucide:circle-check" size={11} style={{ backgroundColor: T.success }} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
