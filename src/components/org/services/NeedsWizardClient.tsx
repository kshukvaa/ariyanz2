'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  needsHero,
  needsSteps,
  needsFooter,
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  type Aside,
} from '@/data/orgNeedsWizard';

/* ──────────────────────────────────────────────────────────────
   نیازسنجی سازمان — the public six-step intake.

   Steps 1–4 ask, step 5 recommends, step 6 books a specialist.
   The recommendation is shown with its reasoning attached («چرا
   این پیشنهاد؟») and with three ways to overrule it, because a
   funnel that only moves forward is a sales form, not an
   assessment.

   Mockup note — step 1 draws its explanatory aside on the left
   while steps 2–4 draw theirs on the right. Normalised to the
   right here: an aside that jumps sides between consecutive steps
   of one flow reads as a bug. Flagged for confirmation.
────────────────────────────────────────────────────────────── */

const ORANGE = '#fe7601';
const GREEN = '#24934b';

export default function NeedsWizardClient() {
  const [step, setStep] = useState(0);
  const go = (n: number) => {
    setStep(Math.max(0, Math.min(needsSteps.length - 1, n)));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: T.page }}>
      {step === 0 && <Hero onStart={() => go(0)} />}

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pb-10">
        <div
          className="bg-white p-4 sm:p-6"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <StepRail current={step} />

          <div className="mt-6">
            {step === 0 && <Gather s={step1} />}
            {step === 1 && <Gather s={step2} />}
            {step === 2 && <Gather s={step3} />}
            {step === 3 && <Gather s={step4} />}
            {step === 4 && <Solution />}
            {step === 5 && <Expert />}
          </div>

          <Footer step={step} onNext={() => go(step + 1)} onBack={() => go(step - 1)} />
        </div>
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 grid gap-8 lg:grid-cols-2 items-center">
      <div className="text-right lg:order-1">
        <h1 className="text-[30px] sm:text-[36px] font-extrabold leading-[1.5]" style={{ color: T.ink }}>
          {needsHero.title.map((l, i) => (
            <span key={l} className="block" style={i >= needsHero.accentFrom ? { color: ORANGE } : undefined}>
              {l}
            </span>
          ))}
        </h1>

        <div className="mt-4 space-y-2 max-w-[560px] mr-auto">
          {needsHero.desc.map((d) => (
            <p key={d} className="text-[12.5px] leading-8" style={{ color: T.muted }}>
              {d}
            </p>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2.5 flex-wrap justify-end">
          {needsHero.badges.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-2 px-3.5 py-2 text-[11.5px] font-semibold"
              style={{ borderRadius: R.md, backgroundColor: '#f4f6f5', color: T.ink }}
            >
              {b.label}
              <Icon name={b.icon} size={14} style={{ backgroundColor: GREEN }} />
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 flex-wrap justify-end">
          <button
            className="px-6 py-3.5 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            {needsHero.secondary}
          </button>

          <button
            onClick={onStart}
            data-ripple
            className="flex items-center gap-2 px-6 py-3.5 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: ORANGE }}
          >
            {needsHero.primary}
            <Icon name="lucide:arrow-left" size={16} className="text-white" />
          </button>
        </div>
      </div>

      <div className="lg:order-2 flex items-center justify-center">
        <img
          src="/images/aryaz/illustrations/ai-assistant-avatar.png"
          alt=""
          className="w-[200px] h-[200px] object-contain"
        />
      </div>
    </section>
  );
}

/* ── Step rail ────────────────────────────────────────────────── */

function StepRail({ current }: { current: number }) {
  return (
    <ol className="flex items-start overflow-x-auto pb-1">
      {needsSteps.map((s, i) => {
        const done = i < current;
        const on = i === current;

        return (
          <li key={s.id} className="flex items-start shrink-0">
            <div className="flex flex-col items-center gap-2 w-[104px] sm:w-[130px]">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-extrabold"
                style={
                  done
                    ? { backgroundColor: '#fff', color: GREEN, border: `2px solid ${GREEN}` }
                    : on
                      ? { backgroundColor: ORANGE, color: '#fff' }
                      : { backgroundColor: '#f2f2f8', color: T.muted }
                }
              >
                {done ? <Icon name="lucide:check" size={16} style={{ backgroundColor: GREEN }} /> : s.n}
              </span>

              <span
                className="text-[10.5px] text-center leading-4"
                style={{ color: on ? ORANGE : done ? T.ink : T.muted, fontWeight: on ? 800 : 500 }}
              >
                {s.label}
              </span>
            </div>

            {i < needsSteps.length - 1 && (
              <span
                className="h-[2px] w-6 sm:w-10 mt-4 shrink-0"
                style={{ backgroundColor: done ? GREEN : on ? ORANGE : T.border }}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ── Gathering steps 1–4 ──────────────────────────────────────── */

 
function Gather({ s }: { s: { title: string; desc?: string; questions: any[]; aside: Aside } }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[300px_1fr] items-start">
      {/* RTL: the aside takes the first (right) track. */}
      <AsidePanel aside={s.aside} />

      <div className="min-w-0 xl:order-2">
        <h2 className="text-right text-[19px] font-extrabold" style={{ color: T.ink }}>
          {s.title}
        </h2>
        {s.desc && (
          <p className="mt-1 text-right text-[12px]" style={{ color: T.muted }}>
            {s.desc}
          </p>
        )}

        <div className="mt-5 space-y-6">
          {s.questions.map((q) => (
            <Question key={q.n} q={q} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AsidePanel({ aside }: { aside: Aside }) {
  return (
    <aside
      className="p-4 xl:order-1"
      style={{ borderRadius: R.lg, backgroundColor: '#f4f8f5', border: '1px solid #e2eee7' }}
    >
      <h3 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
        {aside.title}
        <Icon name="lucide:chart-no-axes-combined" size={16} style={{ backgroundColor: GREEN }} />
      </h3>

      {aside.desc && (
        <p className="mt-2 text-right text-[10.5px] leading-6" style={{ color: T.muted }}>
          {aside.desc}
        </p>
      )}

      <ul className="mt-3 space-y-2">
        {aside.rows.map((r) => (
          <li
            key={r.label}
            className="flex items-center gap-2.5 p-2.5 bg-white"
            style={{ borderRadius: R.md }}
          >
            <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
              {r.label}
            </span>
            <Icon name={r.icon} size={15} style={{ backgroundColor: GREEN }} />
          </li>
        ))}
      </ul>

      <p
        className="mt-3 flex items-center justify-end gap-2 p-2.5 text-[10px]"
        style={{ borderRadius: R.md, backgroundColor: '#e8f7eb', color: T.ink }}
      >
        {aside.note}
        <Icon name="lucide:lock-keyhole" size={13} style={{ backgroundColor: GREEN }} />
      </p>
    </aside>
  );
}

function Question({ q }: { q: any }) {
  return (
    <div>
      <div className="flex items-start gap-2.5 justify-end">
        <span className="flex-1 text-right">
          <span className="text-[13px] font-extrabold" style={{ color: T.ink }}>
            {q.label}
          </span>
          {q.hint && (
            <span className="mr-1.5 text-[10.5px]" style={{ color: T.muted }}>
              {q.hint}
            </span>
          )}
        </span>

        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10.5px] font-extrabold shrink-0"
          style={{ border: `1.5px solid ${ORANGE}`, color: ORANGE }}
        >
          {q.n}
        </span>
      </div>

      <div className="mt-3">
        {q.kind === 'text' && <TextField placeholder={q.placeholder} />}

        {q.kind === 'select' && <SelectField placeholder={q.placeholder} />}

        {q.kind === 'duo' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {q.placeholders.map((p: string) => (
              <SelectField key={p} placeholder={p} />
            ))}
          </div>
        )}

        {q.kind === 'textarea' && (
          <span className="relative block">
            <textarea
              rows={4}
              placeholder={q.placeholder}
              className="w-full px-4 py-3 text-right text-[12px] outline-none resize-none placeholder:text-[#9396b0]"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            />
            {q.max && (
              <span className="absolute left-4 bottom-3 text-[10px]" style={{ color: T.muted }}>
                {q.max}
              </span>
            )}
          </span>
        )}

        {q.kind === 'cards' && <OptionCards options={q.options} multi={q.multi} />}

        {q.kind === 'rich' && <RichCards options={q.options} />}

        {q.kind === 'levels' && <LevelCards options={q.options} />}
      </div>
    </div>
  );
}

function TextField({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="w-full px-4 py-3 text-right text-[12px] outline-none placeholder:text-[#9396b0]"
      style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
    />
  );
}

function SelectField({ placeholder }: { placeholder: string }) {
  return (
    <span
      className="flex items-center gap-2 px-4 py-3 cursor-pointer"
      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
    >
      <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
      <span className="flex-1 text-right text-[12px]" style={{ color: T.muted }}>
        {placeholder}
      </span>
    </span>
  );
}

function OptionCards({ options, multi }: { options: any[]; multi?: boolean }) {
  const [picked, setPicked] = useState<string[]>(
    options.filter((o) => o.on).map((o) => o.label)
  );

  const toggle = (label: string) =>
    setPicked((prev) =>
      multi
        ? prev.includes(label)
          ? prev.filter((x) => x !== label)
          : [...prev, label]
        : [label]
    );

  return (
    <div
      className={`grid gap-3 ${
        options.length >= 5 ? 'grid-cols-2 xl:grid-cols-5' : options.length === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-3'
      }`}
    >
      {options.map((o) => {
        const on = picked.includes(o.label);
        return (
          <button
            key={o.label}
            onClick={() => toggle(o.label)}
            aria-pressed={on}
            className="p-3.5 text-center transition-colors"
            style={{
              borderRadius: R.md,
              border: `1.5px solid ${on ? ORANGE : T.border}`,
              backgroundColor: on ? '#fff8f2' : '#fff',
            }}
          >
            {o.icon && (
              <Icon name={o.icon} size={20} style={{ backgroundColor: o.fg ?? T.muted, margin: '0 auto' }} />
            )}
            <span className="block mt-2 text-[11.5px] font-extrabold leading-4" style={{ color: T.ink }}>
              {o.label}
            </span>
            {o.desc && (
              <span className="block mt-1 text-[9.5px] leading-4" style={{ color: T.muted }}>
                {o.desc}
              </span>
            )}

            <span className="mt-2 flex justify-center">
              {multi ? (
                <span
                  className="w-[15px] h-[15px]"
                  style={{
                    borderRadius: 4,
                    backgroundColor: on ? ORANGE : '#fff',
                    border: on ? undefined : `1.5px solid #cdd0e0`,
                  }}
                />
              ) : (
                <span
                  className="w-[15px] h-[15px] rounded-full flex items-center justify-center"
                  style={{ border: `1.5px solid ${on ? ORANGE : '#cdd0e0'}` }}
                >
                  {on && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ORANGE }} />}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function RichCards({ options }: { options: any[] }) {
  const [picked, setPicked] = useState<string>(
    options.find((o) => o.on)?.label ?? ''
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {options.map((o) => {
        const on = o.label === picked;
        return (
          <button
            key={o.label}
            onClick={() => setPicked(o.label)}
            aria-pressed={on}
            className="relative p-4 text-right transition-colors"
            style={{
              borderRadius: R.md,
              border: `1.5px solid ${on ? ORANGE : T.border}`,
              backgroundColor: '#fff',
            }}
          >
            <Icon name={o.icon} size={21} style={{ backgroundColor: o.fg, marginRight: 'auto' }} />

            <span className="block mt-2.5 text-[12.5px] font-extrabold leading-5" style={{ color: T.ink }}>
              {o.label}
            </span>

            <ul className="mt-2.5 space-y-1">
              {o.bullets.map((b: string) => (
                <li key={b} className="flex items-center gap-1.5 text-[10px]" style={{ color: T.muted }}>
                  <span className="flex-1 text-right">{b}</span>
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: T.muted }} />
                </li>
              ))}
            </ul>

            {on && (
              <span
                className="absolute bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: ORANGE }}
              >
                <Icon name="lucide:check" size={12} className="text-white" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function LevelCards({ options }: { options: any[] }) {
  const [picked, setPicked] = useState('');

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {options.map((o) => {
        const on = o.label === picked;
        return (
          <button
            key={o.label}
            onClick={() => setPicked(o.label)}
            aria-pressed={on}
            className="p-3.5 text-center transition-colors"
            style={{
              borderRadius: R.md,
              border: `1.5px solid ${on ? ORANGE : T.border}`,
              backgroundColor: '#fff',
            }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center mx-auto text-[12px] font-extrabold text-white"
              style={{ backgroundColor: o.fg }}
            >
              {o.n}
            </span>
            <span className="block mt-2 text-[11.5px] font-extrabold leading-4" style={{ color: o.fg }}>
              {o.label}
            </span>
            <span className="block mt-1 text-[9.5px] leading-4" style={{ color: T.muted }}>
              {o.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Step 5 — the recommendation ──────────────────────────────── */

function Solution() {
  const s = step5;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[360px_1fr] items-start">
        {/* Preliminary analysis takes the right track. */}
        <div
          className="p-4 xl:order-1"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <span
            className="inline-block px-3 py-1 text-[10.5px] font-bold"
            style={{ borderRadius: R.pill, backgroundColor: '#e8f7eb', color: GREEN }}
          >
            {s.analysisTitle}
          </span>

          <p className="mt-3 text-right text-[11px] leading-7" style={{ color: T.muted }}>
            {s.analysis}
          </p>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {s.analysisStats.map((a) => (
              <span
                key={a.label}
                className="p-2.5 text-center"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <Icon name={a.icon} size={17} style={{ backgroundColor: a.fg, margin: '0 auto' }} />
                <span className="block mt-1.5 text-[10.5px] font-extrabold leading-4" style={{ color: T.ink }}>
                  {a.value}
                </span>
                <span className="block text-[9px]" style={{ color: T.muted }}>
                  {a.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* The recommendation itself. */}
        <section
          className="p-5 xl:order-2"
          style={{ borderRadius: R.lg, backgroundColor: '#f4faf6', border: `1.5px solid ${GREEN}33` }}
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10.5px] font-bold text-white"
            style={{ borderRadius: R.sm, backgroundColor: GREEN }}
          >
            {s.badge}
            <Icon name="lucide:star" size={12} style={{ backgroundColor: '#fff' }} />
          </span>

          <h2 className="mt-3 text-right text-[21px] font-extrabold" style={{ color: T.ink }}>
            {s.title}
          </h2>
          <p className="mt-1.5 text-right text-[11.5px] leading-6" style={{ color: T.muted }}>
            {s.desc}
          </p>

          <h3 className="mt-4 text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
            {s.whyTitle}
          </h3>
          <ul className="mt-2 space-y-1.5">
            {s.why.map((w) => (
              <li key={w} className="flex items-center gap-2 text-[11.5px]" style={{ color: T.ink }}>
                <span className="flex-1 text-right">{w}</span>
                <Icon name="lucide:circle-check" size={15} style={{ backgroundColor: GREEN }} />
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
            {s.servicesTitle}
          </h3>
          <div className="mt-2.5 grid gap-2.5 grid-cols-3 xl:grid-cols-5">
            {s.services.map((v) => (
              <span key={v.label} className="text-center">
                <Icon name={v.icon} size={21} style={{ backgroundColor: GREEN, margin: '0 auto' }} />
                <span className="block mt-1.5 text-[9.5px] leading-4" style={{ color: T.ink }}>
                  {v.label}
                </span>
              </span>
            ))}
          </div>

          <button
            data-ripple
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: ORANGE }}
          >
            {s.cta}
            <Icon name="lucide:arrow-left" size={15} className="text-white" />
          </button>
        </section>
      </div>

      {/* Alternatives */}
      <section>
        <h3 className="text-right text-[13.5px] font-extrabold mb-3" style={{ color: T.ink }}>
          {s.altTitle}
        </h3>

        <div className="grid gap-3 md:grid-cols-3">
          {s.alts.map((a) => (
            <article
              key={a.rank}
              className="p-4"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, backgroundColor: `${a.fg}0a` }}
            >
              <span className="flex items-center justify-end gap-1.5 text-[10px] font-bold" style={{ color: a.fg }}>
                {a.rank}
                <Icon name={a.icon} size={14} style={{ backgroundColor: a.fg }} />
              </span>

              <h4 className="mt-2 text-right text-[12.5px] font-extrabold leading-5" style={{ color: T.ink }}>
                {a.label}
              </h4>
              <p className="mt-1.5 text-right text-[10px] leading-5" style={{ color: T.muted }}>
                {a.desc}
              </p>

              <button
                className="mt-3 w-full py-2 text-[10.5px] font-bold bg-white"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
              >
                {s.altCta}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Mode / outcomes / timeline */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title={s.modeTitle}>
          <div className="grid gap-2.5 grid-cols-3">
            {s.modes.map((m) => (
              <span
                key={m.label}
                className="relative p-3 text-center"
                style={{
                  borderRadius: R.md,
                  border: `1.5px solid ${m.on ? GREEN : T.border}`,
                  backgroundColor: m.on ? '#f4faf6' : '#fff',
                }}
              >
                {m.on && (
                  <Icon
                    name="lucide:circle-check"
                    size={14}
                    style={{ backgroundColor: GREEN, position: 'absolute', top: 6, left: 6 }}
                  />
                )}
                <Icon name={m.icon} size={19} style={{ backgroundColor: m.fg, margin: '0 auto' }} />
                <span className="block mt-1.5 text-[10.5px] font-extrabold" style={{ color: T.ink }}>
                  {m.label}
                </span>
                <span className="block mt-0.5 text-[8.5px] leading-3" style={{ color: T.muted }}>
                  {m.desc}
                </span>
              </span>
            ))}
          </div>
        </Panel>

        <Panel title={s.outcomeTitle}>
          <ul className="grid gap-2 grid-cols-2">
            {s.outcomes.map((o) => (
              <li key={o} className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
                <span className="flex-1 text-right leading-4">{o}</span>
                <Icon name="lucide:circle-check" size={13} style={{ backgroundColor: GREEN }} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={s.timelineTitle}>
          <ol className="space-y-3">
            {s.timeline.map((t) => (
              <li key={t.n} className="flex items-start gap-2.5">
                <span className="flex-1 text-right">
                  <span className="block text-[11px] font-extrabold" style={{ color: T.ink }}>
                    {t.n}
                  </span>
                  {t.lines.map((l) => (
                    <span key={l} className="block text-[9.5px] leading-4" style={{ color: T.muted }}>
                      {l}
                    </span>
                  ))}
                </span>
                <Icon name={t.icon} size={17} style={{ backgroundColor: t.fg }} />
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      {/* Overrides — the recommendation is arguable */}
      <section className="text-center">
        <p className="text-[11.5px] mb-2.5" style={{ color: T.muted }}>
          {s.changeTitle}
        </p>
        <div className="flex items-center gap-2.5 justify-center flex-wrap">
          {s.changes.map((c) => (
            <button
              key={c.label}
              className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold bg-white transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              {c.label}
              <Icon name={c.icon} size={14} style={{ backgroundColor: T.muted }} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── Step 6 — specialist hand-off ─────────────────────────────── */

function Expert() {
  const s = step6;

  return (
    <div className="grid gap-5 xl:grid-cols-2 items-start">
      {/* Contact form takes the right track — it is the action. */}
      <div className="space-y-4 xl:order-1">
        <section className="p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
          <h3 className="flex items-center justify-end gap-2 text-[13.5px] font-extrabold" style={{ color: T.ink }}>
            {s.formTitle}
            <Icon name="lucide:user-round" size={16} style={{ backgroundColor: ORANGE }} />
          </h3>
          <p className="mt-1 text-right text-[10.5px]" style={{ color: T.muted }}>
            {s.formDesc}
          </p>

          <div className="mt-4 space-y-3">
            {s.fields.map((f) => (
              <label key={f.label} className="block">
                <span className="flex items-center justify-end gap-1 text-[11px] font-bold mb-1.5" style={{ color: T.ink }}>
                  {f.required && <span style={{ color: '#dc2326' }}>*</span>}
                  {f.label}
                </span>
                <span
                  className="flex items-center gap-2.5 px-3.5 py-3"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <input
                    placeholder={f.placeholder}
                    className="flex-1 min-w-0 bg-transparent text-right text-[11.5px] outline-none placeholder:text-[#9396b0]"
                    style={{ color: T.ink }}
                  />
                  <Icon name={f.icon} size={15} style={{ backgroundColor: T.muted }} />
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
          <h3 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
            {s.timeTitle}
            <Icon name="lucide:calendar-check" size={16} style={{ backgroundColor: ORANGE }} />
          </h3>
          <p className="mt-1 text-right text-[10.5px]" style={{ color: T.muted }}>
            {s.timeDesc}
          </p>

          <ul className="mt-3 space-y-2">
            {s.times.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span
                  className="w-[15px] h-[15px] rounded-full shrink-0"
                  style={{ border: `1.5px solid #cdd0e0` }}
                />
                <span className="flex-1 text-right text-[11.5px]" style={{ color: T.ink }}>
                  {t}
                </span>
              </li>
            ))}
          </ul>

          <span
            className="mt-3 flex items-center gap-2 px-3.5 py-3"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <span className="flex-1 text-right text-[11px]" style={{ color: T.muted }}>
              {s.timePicker}
            </span>
            <Icon name="lucide:calendar" size={15} style={{ backgroundColor: T.muted }} />
          </span>
        </section>
      </div>

      {/* Summary, specialist, path */}
      <div className="space-y-4 xl:order-2">
        <section className="p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
          <h3 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
            {s.summaryTitle}
            <Icon name="lucide:file-text" size={16} style={{ backgroundColor: ORANGE }} />
          </h3>

          <div className="mt-3 grid gap-2.5 grid-cols-2 xl:grid-cols-4">
            {s.summary.map((r) => (
              <span
                key={r.label}
                className="p-2.5 text-center"
                style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
              >
                <Icon name={r.icon} size={18} style={{ backgroundColor: r.fg, margin: '0 auto' }} />
                <span className="block mt-1.5 text-[9px]" style={{ color: T.muted }}>
                  {r.label}
                </span>
                <span className="block text-[10px] font-extrabold leading-4" style={{ color: T.ink }}>
                  {r.value}
                </span>
              </span>
            ))}
          </div>
        </section>

        <section className="p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
          <h3 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
            {s.expertTitle}
            <Icon name="lucide:user-round" size={16} style={{ backgroundColor: ORANGE }} />
          </h3>

          <div className="mt-3 flex items-start gap-4 flex-wrap">
            <img
              src={s.expert.avatar}
              alt=""
              className="w-[92px] h-[92px] rounded-full object-cover shrink-0"
            />

            <div className="flex-1 min-w-[200px] text-right">
              <h4 className="text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {s.expert.name}
              </h4>
              <ul className="mt-2 space-y-1">
                {s.expert.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-1.5 text-[10px]" style={{ color: T.muted }}>
                    <span className="flex-1 text-right leading-4">{b}</span>
                    <Icon name="lucide:check" size={11} style={{ backgroundColor: GREEN, marginTop: 2 }} />
                  </li>
                ))}
              </ul>

              <button
                className="mt-2.5 flex items-center gap-1.5 px-3.5 py-2 text-[10.5px] font-bold"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                {s.expert.cta}
                <Icon name="lucide:user-round" size={13} style={{ backgroundColor: T.muted }} />
              </button>
            </div>
          </div>
        </section>

        <section className="p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
          <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
            {s.pathTitle}
          </h3>
          <p className="mt-1 text-right text-[10.5px]" style={{ color: T.muted }}>
            {s.pathDesc}
          </p>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {s.paths.map((p) => (
              <span
                key={p.label}
                className="p-3 text-center"
                style={{
                  borderRadius: R.md,
                  border: `1.5px solid ${p.on ? ORANGE : T.border}`,
                  backgroundColor: p.on ? '#fff8f2' : '#fff',
                }}
              >
                <Icon name={p.icon} size={19} style={{ backgroundColor: p.fg, margin: '0 auto' }} />
                <span className="block mt-1.5 text-[10.5px] font-extrabold" style={{ color: T.ink }}>
                  {p.label}
                </span>
                <span className="block mt-0.5 text-[8.5px] leading-3" style={{ color: T.muted }}>
                  {p.desc}
                </span>
              </span>
            ))}
          </div>
        </section>

        <section
          className="p-4"
          style={{ borderRadius: R.lg, backgroundColor: '#f4f8f5', border: '1px solid #e2eee7' }}
        >
          <h3 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
            {s.privacyTitle}
            <Icon name="lucide:shield-check" size={15} style={{ backgroundColor: GREEN }} />
          </h3>

          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
            {s.privacy.map((p) => (
              <span key={p.label} className="text-center">
                <Icon name={p.icon} size={17} style={{ backgroundColor: GREEN, margin: '0 auto' }} />
                <span className="block mt-1 text-[10px] font-bold" style={{ color: T.ink }}>
                  {p.label}
                </span>
                <span className="block text-[8.5px] leading-3" style={{ color: T.muted }}>
                  {p.desc}
                </span>
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="p-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
      <h4 className="text-right text-[12.5px] font-extrabold mb-3" style={{ color: T.ink }}>
        {title}
      </h4>
      {children}
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────────── */

function Footer({
  step,
  onNext,
  onBack,
}: {
  step: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const last = step === needsSteps.length - 1;
  const pct = needsFooter.percents[step];
  const mins = needsFooter.minutes[step];

  return (
    <div
      className="mt-6 pt-4 flex items-center gap-4 flex-wrap justify-between"
      style={{ borderTop: `1px solid ${T.border}` }}
    >
      {step > 0 ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 text-[12px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:arrow-right" size={15} style={{ backgroundColor: T.muted }} />
          {needsFooter.back}
        </button>
      ) : (
        <span />
      )}

      <div className="flex-1 min-w-[200px] flex items-center gap-3">
        <span className="text-[11.5px] font-bold shrink-0" style={{ color: GREEN }}>
          {pct}
        </span>
        <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
          <span
            className="block h-full rounded-full"
            style={{ width: pct, backgroundColor: GREEN }}
          />
        </span>
        <span className="text-right shrink-0">
          <span className="block text-[11px] font-bold" style={{ color: T.ink }}>
            {needsFooter.of.replace('{n}', needsSteps[step].n)}
          </span>
          <span className="block text-[9.5px]" style={{ color: GREEN }}>
            {needsFooter.remaining.replace('{m}', mins)}
          </span>
        </span>
      </div>

      <button
        onClick={last ? undefined : onNext}
        data-ripple
        className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
        style={{ borderRadius: R.md, backgroundColor: ORANGE }}
      >
        {last ? needsFooter.submit : step === 4 ? needsFooter.finish : needsFooter.next}
        <Icon name="lucide:arrow-left" size={15} className="text-white" />
      </button>
    </div>
  );
}
