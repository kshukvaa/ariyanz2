'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  serviceRail,
  railHead,
  serviceCopy,
  FAMILY,
  type Family,
} from '@/data/orgServiceNav';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the خدمات سازمانی pages.

   Every service detail page is the same six moves: a full-bleed
   hero, a titled intro beside an illustration, the problems it
   solves, the approach as a numbered sequence, what you receive,
   and a way to start. Only the content differs, so the moves are
   built once here and each page supplies data.

   Colour is keyed to the service family rather than chosen per
   page — that is what makes a rail of twelve siblings read as one
   product instead of twelve microsites.
────────────────────────────────────────────────────────────── */

/* ── Hero ─────────────────────────────────────────────────────── */

export interface HeroProps {
  /** Rendered as separate lines. */
  title: string[];
  /** Tint every line from this index on. */
  accentFrom?: number;
  /** Tint exactly these line indices. Wins over `accentFrom` — some
      heroes colour only their first line, which a "from" cannot say. */
  accentLines?: number[];
  desc: string;
  primary: { label: string; icon?: string };
  secondary?: { label: string; icon?: string };
  image?: string;
  family: Family;
  /** Small breadcrumb above the title on sub-pages. */
  crumbs?: { label: string; href?: string }[];
}

export function ServiceHero({
  title,
  accentFrom = 1,
  accentLines,
  desc,
  primary,
  secondary,
  image,
  family,
  crumbs,
}: HeroProps) {
  const c = FAMILY[family];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${c.soft}, #ffffff)` }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 grid gap-8 lg:grid-cols-2 items-center">
        {/* RTL: declared first → lands right. The copy leads. */}
        <div className="text-right lg:order-1">
          {crumbs && (
            <nav className="flex items-center justify-end gap-1.5 text-[11px] mb-3" style={{ color: T.muted }}>
              {crumbs.map((b, i) => (
                <span key={b.label} className="flex items-center gap-1.5">
                  {i > 0 && <Icon name="lucide:chevron-left" size={11} style={{ backgroundColor: T.muted }} />}
                  {b.href ? (
                    <Link href={b.href} className="hover:opacity-70">
                      {b.label}
                    </Link>
                  ) : (
                    <span style={{ color: c.fg }}>{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <h1 className="text-[28px] sm:text-[33px] font-extrabold leading-[1.5]" style={{ color: T.ink }}>
            {title.map((line, i) => {
              const tinted = accentLines ? accentLines.includes(i) : i >= accentFrom;
              return (
                <span key={line} className="block" style={tinted ? { color: c.fg } : undefined}>
                  {line}
                </span>
              );
            })}
          </h1>

          <p className="mt-4 text-[13px] leading-8 max-w-[560px] mr-auto" style={{ color: T.muted }}>
            {desc}
          </p>

          <div className="mt-6 flex items-center gap-3 flex-wrap justify-end">
            {secondary && (
              <button
                className="flex items-center gap-2 px-5 py-3.5 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                {secondary.label}
                <Icon
                  name={secondary.icon ?? 'lucide:users-round'}
                  size={16}
                  style={{ backgroundColor: T.muted }}
                />
              </button>
            )}

            <button
              data-ripple
              className="flex items-center gap-2 px-5 py-3.5 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: c.fg }}
            >
              {primary.label}
              <Icon name={primary.icon ?? 'lucide:clipboard-check'} size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div className="lg:order-2 min-h-[220px] flex items-center justify-center">
          {image ? (
             
            <img src={image} alt="" className="w-full h-[250px] object-cover" style={{ borderRadius: R.lg }} />
          ) : (
            <HeroFallback family={family} />
          )}
        </div>
      </div>
    </section>
  );
}

/* Several heroes use bespoke 3D scenes the asset library does not
   ship. Rather than borrow an unrelated photo, those pages get a
   composed mark-on-gradient panel that reads as deliberate. */
function HeroFallback({ family }: { family: Family }) {
  const c = FAMILY[family];
  return (
    <span
      className="w-full h-[230px] flex items-center justify-center"
      style={{ borderRadius: R.lg, background: `linear-gradient(135deg, ${c.bg}, #ffffff)` }}
    >
      <span
        className="w-[112px] h-[112px] rounded-full flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${c.fg}, ${T.violet})` }}
      >
        <img src="/images/aryaz/brand/aryaz-mark.png" alt="" className="w-14 h-14 object-contain" />
      </span>
    </span>
  );
}

/* ── Two-column body: content left, service rail right ────────── */

export function ServiceBody({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8">
      {/* RTL: the rail is declared first so it takes the right track. */}
      <div className="grid gap-6 xl:grid-cols-[300px_1fr] items-start">
        <ServiceRail active={active} />
        <div className="min-w-0 space-y-8 xl:order-2">{children}</div>
      </div>
    </div>
  );
}

export function ServiceRail({ active }: { active: string }) {
  const activeGroup = serviceRail.find((g) => g.items.some((i) => i.id === active))?.id;
  const [open, setOpen] = useState<string[]>(
    activeGroup ? [activeGroup] : [serviceRail[0].id]
  );

  const toggle = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <aside className="space-y-3 xl:order-1 xl:sticky xl:top-6">
      {serviceRail.map((g) => {
        const c = FAMILY[g.family];
        const isOpen = open.includes(g.id);

        return (
          <nav
            key={g.id}
            className="bg-white overflow-hidden"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <button
              onClick={() => toggle(g.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-2.5 px-4 py-3.5"
              style={{ backgroundColor: c.soft }}
            >
              <Icon
                name="lucide:chevron-down"
                size={15}
                style={{
                  backgroundColor: c.fg,
                  transform: isOpen ? 'rotate(180deg)' : undefined,
                  transition: 'transform .2s',
                }}
              />
              <span className="flex-1 text-right text-[13px] font-extrabold leading-5" style={{ color: c.fg }}>
                {g.label}
              </span>
              <Icon name={g.icon} size={19} style={{ backgroundColor: c.fg }} />
            </button>

            {isOpen && (
              <ul>
                {g.items.map((i) => {
                  const on = i.id === active;
                  return (
                    <li key={i.id} style={{ borderTop: `1px solid ${T.border}` }}>
                      <Link
                        href={i.href}
                        aria-current={on ? 'page' : undefined}
                        className="relative flex items-center gap-2.5 px-4 py-3.5 transition-colors hover:bg-gray-50"
                        style={on ? { backgroundColor: c.soft } : undefined}
                      >
                        {on && (
                          <span
                            className="absolute inset-y-0 right-0 w-[3px]"
                            style={{ backgroundColor: c.fg }}
                          />
                        )}
                        <span
                          className="flex-1 text-right text-[12px] leading-5"
                          style={{ color: on ? c.fg : T.ink, fontWeight: on ? 800 : 500 }}
                        >
                          {i.label}
                        </span>
                        <Icon
                          name={i.icon}
                          size={17}
                          style={{ backgroundColor: on ? c.fg : T.muted }}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        );
      })}
    </aside>
  );
}

/* ── Intro: title, rule, illustration ─────────────────────────── */

export function ServiceIntro({
  label,
  title,
  desc,
  image,
  family,
}: {
  label?: string;
  title: string;
  desc: string;
  image?: string;
  family: Family;
}) {
  const c = FAMILY[family];

  return (
    <section
      className="bg-white p-5 sm:p-6 grid gap-6 lg:grid-cols-[1fr_300px] items-center"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <div className="text-right lg:order-1">
        {label && (
          <p className="text-[11px] mb-2" style={{ color: T.muted }}>
            {railHead.youAreHere}{' '}
            <span className="font-bold" style={{ color: c.fg }}>
              {label}
            </span>
          </p>
        )}

        <h2 className="text-[24px] font-extrabold" style={{ color: T.ink }}>
          {title}
        </h2>
        <span className="mt-2 block h-[3px] w-14 mr-auto rounded-full" style={{ backgroundColor: c.fg }} />

        <p className="mt-4 text-[12.5px] leading-8" style={{ color: T.muted }}>
          {desc}
        </p>
      </div>

      <div className="lg:order-2">
        {image ? (
           
          <img src={image} alt="" className="w-full h-[160px] object-cover" style={{ borderRadius: R.md }} />
        ) : (
          <span
            className="block w-full h-[160px]"
            style={{ borderRadius: R.md, background: `linear-gradient(135deg, ${c.bg}, #ffffff)` }}
          />
        )}
      </div>
    </section>
  );
}

/* ── Section heading ──────────────────────────────────────────── */

export function SectionHeading({
  children,
  family,
  center = true,
}: {
  children: React.ReactNode;
  family: Family;
  center?: boolean;
}) {
  const c = FAMILY[family];
  return (
    <h3
      className={`text-[16px] font-extrabold ${center ? 'text-center' : 'text-right'}`}
      style={{ color: T.ink }}
    >
      {children}
      <span
        className={`mt-2 block h-[3px] w-12 rounded-full ${center ? 'mx-auto' : 'mr-auto'}`}
        style={{ backgroundColor: c.fg }}
      />
    </h3>
  );
}

/* ── Problem cards ────────────────────────────────────────────── */

export interface ProblemCard {
  title: string;
  desc: string;
  icon: string;
  /** Each card carries its own tint in the mockups. */
  fg?: string;
}

export function ProblemGrid({
  title,
  cards,
  family,
  cols = 4,
}: {
  title: string;
  cards: ProblemCard[];
  family: Family;
  cols?: 3 | 4;
}) {
  const c = FAMILY[family];

  return (
    <section>
      <SectionHeading family={family}>{title}</SectionHeading>

      <div className={`mt-5 grid gap-4 sm:grid-cols-2 ${cols === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}`}>
        {cards.map((p) => (
          <article
            key={p.title}
            className="bg-white p-4 text-center"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <span
              className="w-12 h-12 flex items-center justify-center mx-auto"
              style={{ borderRadius: R.md, backgroundColor: `${p.fg ?? c.fg}14` }}
            >
              <Icon name={p.icon} size={22} style={{ backgroundColor: p.fg ?? c.fg }} />
            </span>

            <h4 className="mt-3 text-[12.5px] font-extrabold leading-5" style={{ color: T.ink }}>
              {p.title}
            </h4>
            <p className="mt-1.5 text-[10.5px] leading-5" style={{ color: T.muted }}>
              {p.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Numbered approach timeline ───────────────────────────────── */

export interface Step {
  n: string;
  title: string;
  lines: string[];
  icon: string;
  fg?: string;
}

export function StepTimeline({
  title,
  steps,
  family,
}: {
  title: string;
  steps: Step[];
  family: Family;
}) {
  const c = FAMILY[family];

  return (
    <section>
      <SectionHeading family={family}>{title}</SectionHeading>

      <div
        className="mt-5 bg-white p-5"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        {/* Numbered because the approach genuinely is a sequence —
            each step consumes what the one before it produced. */}
        <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 relative">
          {steps.map((s, i) => {
            const fg = s.fg ?? c.fg;
            return (
              <li key={s.n} className="relative text-center">
                {i < steps.length - 1 && (
                  <span
                    className="hidden xl:block absolute top-7 left-0 w-full border-t-2 border-dashed"
                    style={{ borderColor: T.border }}
                  />
                )}

                <span
                  className="relative w-14 h-14 rounded-full flex items-center justify-center mx-auto bg-white"
                  style={{ border: `2px solid ${fg}33` }}
                >
                  <Icon name={s.icon} size={21} style={{ backgroundColor: fg }} />
                  <span
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
                    style={{ backgroundColor: fg }}
                  >
                    {s.n}
                  </span>
                </span>

                <h4 className="mt-3 text-[12px] font-extrabold" style={{ color: T.ink }}>
                  {s.title}
                </h4>
                <ul className="mt-1.5 space-y-0.5">
                  {s.lines.map((l) => (
                    <li key={l} className="text-[9.5px] leading-4" style={{ color: T.muted }}>
                      {l}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ── Outputs grid ─────────────────────────────────────────────── */

export function OutputsGrid({
  title,
  items,
  family,
}: {
  title: string;
  items: { label: string; icon: string }[];
  family: Family;
}) {
  const c = FAMILY[family];

  return (
    <section>
      <SectionHeading family={family} center={false}>
        {title}
      </SectionHeading>

      <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
        {items.map((o) => (
          <span
            key={o.label}
            className="bg-white p-3.5 flex flex-col items-center gap-2 text-center"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name={o.icon} size={20} style={{ backgroundColor: c.fg }} />
            <span className="text-[10px] font-semibold leading-4" style={{ color: T.ink }}>
              {o.label}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ── The AI agent card ────────────────────────────────────────── */

export function AgentCard({
  title,
  desc,
  questions,
  cta,
  family,
}: {
  title: string;
  desc: string;
  questions: string[];
  cta?: string;
  family: Family;
}) {
  const c = FAMILY[family];

  return (
    <section
      className="p-4 flex items-center gap-4 flex-wrap"
      style={{ borderRadius: R.lg, backgroundColor: c.soft, border: `1px solid ${c.bg}` }}
    >
      <img
        src="/images/aryaz/illustrations/ai-assistant-avatar.png"
        alt=""
        className="w-[86px] h-[86px] object-contain shrink-0"
      />

      <div className="flex-1 min-w-[220px] text-right">
        <h4 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
          {title}
        </h4>
        <p className="mt-1 text-[10.5px] leading-5" style={{ color: T.muted }}>
          {desc}
        </p>

        <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
          {questions.map((q) => (
            <li key={q} className="flex items-center gap-1.5 text-[10px]" style={{ color: T.ink }}>
              <span className="flex-1 text-right">{q}</span>
              <Icon name="lucide:check" size={11} style={{ backgroundColor: c.fg }} />
            </li>
          ))}
        </ul>

        <button
          data-ripple
          className="mt-3 flex items-center gap-2 px-5 py-2.5 text-[11.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: c.fg }}
        >
          {cta ?? serviceCopy.agentCta}
          <Icon name="lucide:send" size={13} className="text-white" />
        </button>
      </div>
    </section>
  );
}

/* ── Lead form ────────────────────────────────────────────────── */

export function LeadForm({
  title,
  desc,
  assurances,
  fields,
  submit,
  family,
}: {
  title: string;
  desc: string;
  assurances: string[];
  fields: { label: string; kind?: 'text' | 'select' }[];
  submit: string;
  family: Family;
}) {
  const c = FAMILY[family];

  return (
    <section
      className="p-5 grid gap-6 lg:grid-cols-2 items-center"
      style={{ borderRadius: R.lg, backgroundColor: c.soft, border: `1px solid ${c.bg}` }}
    >
      {/* Form takes the right track in RTL — it is the point of the block. */}
      <div className="lg:order-1">
        <h4 className="text-right text-[13.5px] font-extrabold mb-3" style={{ color: T.ink }}>
          {title}
        </h4>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.label} className="block">
              {f.kind === 'select' ? (
                <span
                  className="flex items-center gap-2 px-3.5 py-3 bg-white"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: c.fg }} />
                  <span className="flex-1 text-right text-[11.5px]" style={{ color: T.muted }}>
                    {f.label}
                  </span>
                </span>
              ) : (
                <input
                  placeholder={f.label}
                  className="w-full px-3.5 py-3 bg-white text-right text-[11.5px] outline-none placeholder:text-[#9396b0]"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                />
              )}
            </label>
          ))}
        </div>

        <button
          data-ripple
          className="mt-3 w-full flex items-center justify-center gap-2 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: c.fg }}
        >
          {submit}
          <Icon name="lucide:send" size={15} className="text-white" />
        </button>
      </div>

      <div className="lg:order-2 text-right">
        <h4 className="text-[15px] font-extrabold leading-7" style={{ color: T.ink }}>
          {title}
        </h4>
        <p className="mt-2 text-[11.5px] leading-7" style={{ color: T.muted }}>
          {desc}
        </p>

        <ul className="mt-3 flex items-center gap-4 flex-wrap justify-end">
          {assurances.map((a) => (
            <li key={a} className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
              {a}
              <Icon name="lucide:circle-check" size={13} style={{ backgroundColor: c.fg }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
