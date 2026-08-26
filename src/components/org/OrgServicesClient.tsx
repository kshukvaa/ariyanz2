'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  servicesHero,
  servicesNeeds,
  servicesWhy,
  servicesTop,
  servicesPath,
  servicesDomains,
  servicesCase,
  servicesHelp,
  servicesCta,
} from '@/data/orgServices';

/* ──────────────────────────────────────────────────────────────
   Organisational services — the public B2B landing.

   Unlike everything else under /org this sits in front of the
   sign-in wall, so it keeps the site's marketing chrome and none
   of the panel's. The three service families are the spine: the
   hero names them, the needs section opens them, and the "most
   requested" grid pulls the four specific engagements buyers
   actually arrive asking for.
────────────────────────────────────────────────────────────── */

const TONES = {
  blue: { fg: T.infoStrong, bg: T.tintBlue },
  green: { fg: T.successStrong, bg: T.tintGreen },
  orange: { fg: T.accent, bg: T.tintOrange },
  purple: { fg: T.primary, bg: T.tintPurple },
} as const;

export default function OrgServicesClient() {
  return (
    <div style={{ backgroundColor: T.page }}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 pt-10 pb-14 max-w-[1240px] mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* The composed scene stands in for the mockup's bespoke
              3D illustration, which the asset library does not ship. */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            <span
              className="absolute w-[240px] h-[240px] rounded-full"
              style={{ background: `radial-gradient(circle, ${T.tintPurple}, transparent 70%)` }}
            />

            <span
              className="relative w-[132px] h-[132px] rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${T.primaryStrong}, ${T.violet})` }}
            >
              <img src="/images/aryaz/brand/aryaz-mark.png" alt="" className="w-16 h-16 object-contain" />
            </span>

            {servicesHero.cards.map((c, i) => {
              const tone = TONES[c.tone];
              const place = [
                'top-2 right-2',
                'bottom-6 right-10',
                'top-10 left-2',
              ][i];
              return (
                <span
                  key={c.label}
                  className={`absolute ${place} flex items-center gap-2 px-3.5 py-2.5 bg-white shadow-lg`}
                  style={{ borderRadius: R.md }}
                >
                  <span className="text-[11px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                    {c.label}
                  </span>
                  <span
                    className="w-8 h-8 flex items-center justify-center shrink-0"
                    style={{ borderRadius: R.sm, backgroundColor: tone.bg }}
                  >
                    <Icon name={c.icon} size={16} style={{ backgroundColor: tone.fg }} />
                  </span>
                </span>
              );
            })}
          </div>

          <div className="text-right">
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11.5px] font-bold"
              style={{ borderRadius: R.pill, backgroundColor: T.tintPurple, color: T.primary }}
            >
              {servicesHero.badge}
              <Icon name="lucide:sparkles" size={13} style={{ backgroundColor: T.primary }} />
            </span>

            <h1 className="mt-4 text-[34px] sm:text-[40px] font-extrabold leading-[1.35]" style={{ color: T.ink }}>
              {servicesHero.title[0]}
              <br />
              <span style={{ color: T.primary }}>{servicesHero.title[1]}</span>
            </h1>

            <p className="mt-4 text-[13.5px] leading-8 max-w-[520px] mr-auto" style={{ color: T.muted }}>
              {servicesHero.desc}
            </p>

            <div className="mt-6 flex items-center gap-3 flex-wrap justify-end">
              <button
                className="flex items-center gap-2 px-6 py-3.5 text-[13px] font-bold bg-white transition-colors hover:bg-gray-50"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                <Icon name="lucide:arrow-left" size={16} style={{ backgroundColor: T.muted }} />
                {servicesHero.secondary}
              </button>

              <button
                data-ripple
                className="flex items-center gap-2 px-6 py-3.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
              >
                <Icon name="lucide:arrow-left" size={16} className="text-white" />
                {servicesHero.primary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── What do you need ──────────────────────────────────── */}
      <section
        className="px-4 sm:px-8 py-12 bg-white"
        style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-[1240px] mx-auto">
          <SectionTitle>{servicesNeeds.title}</SectionTitle>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {servicesNeeds.groups.map((g) => {
              const tone = TONES[g.tone];
              return (
                <article
                  key={g.id}
                  className="p-5 flex flex-col"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <header className="flex items-start gap-3">
                    <span className="flex-1 text-right">
                      <h3 className="text-[16px] font-extrabold" style={{ color: tone.fg }}>
                        {g.title}
                      </h3>
                      <p className="mt-1.5 text-[11.5px] leading-6" style={{ color: T.muted }}>
                        {g.desc}
                      </p>
                    </span>
                    <span
                      className="w-12 h-12 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.md, backgroundColor: tone.bg }}
                    >
                      <Icon name={g.icon} size={22} style={{ backgroundColor: tone.fg }} />
                    </span>
                  </header>

                  <ul className="mt-4 grid gap-2.5 grid-cols-2 flex-1">
                    {g.items.map((i) => (
                      <li
                        key={i.label}
                        className="p-3 text-center"
                        style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
                      >
                        <Icon name={i.icon} size={17} style={{ backgroundColor: tone.fg, margin: '0 auto' }} />
                        <span className="block mt-1.5 text-[10px] font-semibold leading-4" style={{ color: T.ink }}>
                          {i.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="mt-4 flex items-center justify-center gap-1.5 text-[12px] font-bold"
                    style={{ color: tone.fg }}
                  >
                    <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: tone.fg }} />
                    {g.cta}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Aryaz ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-12">
        <div className="max-w-[1240px] mx-auto">
          <SectionTitle>{servicesWhy.title}</SectionTitle>

          <div className="mt-8 grid gap-5 lg:grid-cols-[300px_1fr] items-center">
            <img
              src={servicesWhy.image}
              alt=""
              className="w-full h-[190px] object-cover"
              style={{ borderRadius: R.lg }}
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {servicesWhy.cards.map((c) => (
                <div
                  key={c.label}
                  className="bg-white p-4 text-center"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <span
                    className="w-11 h-11 flex items-center justify-center mx-auto"
                    style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
                  >
                    <Icon name={c.icon} size={19} style={{ backgroundColor: T.primary }} />
                  </span>
                  <h3 className="mt-2.5 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                    {c.label}
                  </h3>
                  <p className="mt-1 text-[10px] leading-5" style={{ color: T.muted }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Most requested ────────────────────────────────────── */}
      <section
        className="px-4 sm:px-8 py-12 bg-white"
        style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-[1240px] mx-auto">
          <SectionTitle>{servicesTop.title}</SectionTitle>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {servicesTop.cards.map((c) => {
              const tone = TONES[c.tone];
              return (
                <article
                  key={c.id}
                  className="p-4 flex flex-col"
                  style={{ borderRadius: R.lg, backgroundColor: tone.bg }}
                >
                  <header className="flex items-start gap-2.5">
                    <h3 className="flex-1 text-right text-[13px] font-extrabold leading-5" style={{ color: tone.fg }}>
                      {c.label}
                    </h3>
                    <span
                      className="w-10 h-10 flex items-center justify-center shrink-0 bg-white"
                      style={{ borderRadius: R.md }}
                    >
                      <Icon name={c.icon} size={18} style={{ backgroundColor: tone.fg }} />
                    </span>
                  </header>

                  <ul className="mt-3.5 space-y-2 flex-1">
                    {c.items.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-[10.5px]" style={{ color: T.ink }}>
                        <span className="flex-1 text-right">{i}</span>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tone.fg }} />
                      </li>
                    ))}
                  </ul>

                  <button
                    className="mt-4 flex items-center justify-center gap-1.5 py-2.5 text-[11.5px] font-bold bg-white"
                    style={{ borderRadius: R.md, color: tone.fg }}
                  >
                    <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: tone.fg }} />
                    {servicesTop.cta}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How we work ───────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-12">
        <div className="max-w-[1240px] mx-auto">
          <SectionTitle>{servicesPath.title}</SectionTitle>

          {/* Numbered because this genuinely is a sequence — each
              step depends on the one before it. */}
          <ol className="mt-8 grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {servicesPath.steps.map((s, i) => (
              <li key={s.n} className="relative text-center">
                {i < servicesPath.steps.length - 1 && (
                  <span
                    className="hidden xl:block absolute top-7 left-0 w-full h-px"
                    style={{ backgroundColor: T.border }}
                  />
                )}

                <span
                  className="relative w-14 h-14 rounded-full flex items-center justify-center mx-auto bg-white"
                  style={{ border: `1.5px solid ${T.border}` }}
                >
                  <Icon name={s.icon} size={21} style={{ backgroundColor: T.primary }} />
                  <span
                    className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white"
                    style={{ backgroundColor: T.primaryStrong }}
                  >
                    {s.n}
                  </span>
                </span>

                <h3 className="mt-3 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {s.label}
                </h3>
                <p className="mt-1 text-[10px] leading-5" style={{ color: T.muted }}>
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Domains / case / help ─────────────────────────────── */}
      <section
        className="px-4 sm:px-8 py-12 bg-white"
        style={{ borderTop: `1px solid ${T.border}` }}
      >
        <div className="max-w-[1240px] mx-auto grid gap-5 lg:grid-cols-3">
          <div>
            <h2 className="flex items-center justify-end gap-2 text-[15px] font-extrabold" style={{ color: T.ink }}>
              {servicesDomains.title}
              <Icon name="lucide:sparkles" size={17} style={{ backgroundColor: T.primary }} />
            </h2>

            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {servicesDomains.items.map((d) => (
                <li
                  key={d.label}
                  className="flex flex-col items-center gap-1.5 p-3 text-center"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <Icon name={d.icon} size={17} style={{ backgroundColor: T.primary }} />
                  <span className="text-[10px] font-semibold leading-3" style={{ color: T.ink }}>
                    {d.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="flex items-center justify-end gap-2 text-[15px] font-extrabold" style={{ color: T.ink }}>
              {servicesCase.title}
              <Icon name="lucide:sparkles" size={17} style={{ backgroundColor: T.primary }} />
            </h2>

            <div className="mt-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
              <img src={servicesCase.image} alt="" className="w-full h-[130px] object-cover" />

              <div className="p-4">
                <h3 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
                  {servicesCase.company}
                </h3>
                <p className="mt-0.5 text-right text-[10.5px]" style={{ color: T.muted }}>
                  {servicesCase.desc}
                </p>

                <ul className="mt-3 space-y-1.5">
                  {servicesCase.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[10px]" style={{ color: T.ink }}>
                      <span className="flex-1 text-right leading-4">{i}</span>
                      <Icon name="lucide:circle-check" size={12} style={{ backgroundColor: T.success }} />
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-3 flex items-center gap-1.5 text-[11px] font-bold"
                  style={{ color: T.primary }}
                >
                  <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: T.primary }} />
                  {servicesCase.cta}
                </button>
              </div>
            </div>
          </div>

          <div
            className="p-5 flex flex-col justify-center"
            style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}
          >
            <img src={servicesHelp.art} alt="" className="w-[92px] h-[92px] object-contain mx-auto" />

            <h3 className="mt-3 text-center text-[14px] font-extrabold" style={{ color: T.ink }}>
              {servicesHelp.title}
            </h3>
            <p className="mt-2 text-center text-[11px] leading-6" style={{ color: T.muted }}>
              {servicesHelp.desc}
            </p>

            <button
              data-ripple
              className="mt-4 flex items-center justify-center gap-2 py-3 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:arrow-left" size={14} className="text-white" />
              {servicesHelp.cta}
            </button>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────── */}
      <section className="px-4 sm:px-8 py-10">
        <div
          className="max-w-[1240px] mx-auto p-6 sm:p-8 flex items-center gap-6 flex-wrap"
          style={{
            borderRadius: R.lg,
            background: `linear-gradient(115deg, ${T.primaryStrong}, ${T.violet})`,
          }}
        >
          <img src={servicesCta.art} alt="" className="w-[104px] h-[104px] object-contain shrink-0" />

          <div className="flex-1 min-w-[240px] text-right">
            <h2 className="text-[20px] font-extrabold text-white leading-8">{servicesCta.title}</h2>
            <p className="mt-2 text-[12px] leading-6" style={{ color: 'rgba(255,255,255,.82)' }}>
              {servicesCta.desc}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap shrink-0">
            <button
              className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold"
              style={{ borderRadius: R.md, border: '1.5px solid rgba(255,255,255,.5)', color: '#fff' }}
            >
              <Icon name="lucide:phone" size={15} style={{ backgroundColor: '#fff' }} />
              {servicesCta.secondary}
            </button>

            <button
              data-ripple
              className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white"
              style={{ borderRadius: R.md, color: T.primary }}
            >
              <Icon name="lucide:file-text" size={15} style={{ backgroundColor: T.primary }} />
              {servicesCta.primary}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center justify-center gap-2.5 text-[21px] font-extrabold" style={{ color: T.ink }}>
      {children}
      <Icon name="lucide:sparkles" size={20} style={{ backgroundColor: T.primary }} />
    </h2>
  );
}
