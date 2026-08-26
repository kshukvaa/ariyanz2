'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  EXPERT_HERO_BG,
  expertCrumbs,
  expertHero,
  expertBooking,
  expertTabs,
  expertAbout,
  expertTopics,
  expertAgent,
  expertExperience,
  expertServices,
  expertReviews,
  expertCta,
} from '@/data/counseling/expert-detail';

/* ──────────────────────────────────────────────────────────────
   A single counsellor.

   The page answers two questions in two columns: «who is this
   person?» on the left and «what can I buy from them?» on the
   right. RTL puts the first declared column on the right, so the
   service rail is declared first — same rule as everywhere else
   in this codebase, and the same rule that is easy to invert by
   eye on a downscaled screenshot.
────────────────────────────────────────────────────────────── */

function Stars({ n, size = 13, fg = T.violet }: { n: number; size?: number; fg?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="lucide:star" size={size} style={{ backgroundColor: i < n ? fg : T.border }} />
      ))}
    </span>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

export default function ExpertDetailClient() {
  const [tab, setTab] = useState('about');

  return (
    <div style={{ backgroundColor: T.page }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: EXPERT_HERO_BG }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 pt-4 pb-8">
          <nav className="flex items-center justify-end gap-1.5 flex-wrap text-[10.5px]">
            {expertCrumbs.map((c, i) => (
              <React.Fragment key={c.label}>
                {i > 0 && <span style={{ color: 'rgba(255,255,255,.35)' }}>›</span>}
                {c.href ? (
                  <Link href={c.href} style={{ color: 'rgba(255,255,255,.6)' }}>
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,.9)' }}>{c.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="mt-5 grid gap-6 lg:grid-cols-[190px_1fr_260px] items-start">
            {/* Portrait declared first → lands on the right. */}
            <div
              className="mx-auto lg:mx-0 w-[170px] h-[190px] overflow-hidden shrink-0"
              style={{ borderRadius: R.lg, border: '3px solid rgba(255,255,255,.9)' }}
            >
              <img src={expertHero.avatar} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="text-right min-w-0">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold"
                style={{ borderRadius: R.pill, backgroundColor: 'rgba(36,171,67,.16)', color: '#4ade80' }}
              >
                {expertHero.verified.label}
                <Icon name={expertHero.verified.icon} size={12} style={{ backgroundColor: '#4ade80' }} />
              </span>

              <h1 className="mt-3 flex items-center justify-end gap-2 text-[26px] font-extrabold text-white">
                {expertHero.name}
                <Icon name="lucide:badge-check" size={20} style={{ backgroundColor: T.violet }} />
              </h1>

              <p className="mt-1.5 text-[14px]" style={{ color: 'rgba(255,255,255,.8)' }}>
                {expertHero.title}
              </p>

              <ul className="mt-4 flex items-center justify-end gap-2 flex-wrap">
                {expertHero.tags.map((t) => (
                  <li
                    key={t}
                    className="px-3.5 py-1.5 text-[10.5px]"
                    style={{
                      borderRadius: R.pill,
                      border: '1px solid rgba(255,255,255,.18)',
                      color: 'rgba(255,255,255,.85)',
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex items-start justify-end gap-7 flex-wrap">
                {expertHero.stats.map((s) => (
                  <li key={s.label} className="text-center">
                    <span className="flex items-center justify-center gap-1.5">
                      <Icon name={s.icon} size={14} style={{ backgroundColor: T.violet }} />
                      <span className="text-[17px] font-extrabold text-white">{s.value}</span>
                    </span>
                    <span className="mt-1 block text-[10px]" style={{ color: 'rgba(255,255,255,.6)' }}>
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 flex items-center justify-end gap-2 text-[11px]" style={{ color: 'rgba(255,255,255,.8)' }}>
                {expertHero.availability}
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1"
                  style={{ borderRadius: R.pill, backgroundColor: 'rgba(36,171,67,.16)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4ade80' }} />
                </span>
              </p>
            </div>

            {/* Booking card declared last → lands on the left. */}
            <aside className="bg-white p-4" style={{ borderRadius: R.lg }}>
              <h2 className="flex items-center justify-center gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {expertBooking.title}
                <Icon name={expertBooking.icon} size={15} style={{ backgroundColor: T.violet }} />
              </h2>

              <p className="mt-3 text-center text-[10.5px]" style={{ color: T.muted }}>
                {expertBooking.date}
              </p>
              <p className="mt-1 text-center text-[24px] font-extrabold" style={{ color: T.violet }}>
                {expertBooking.time}
              </p>

              <p className="mt-2 text-center">
                <span
                  className="inline-block px-3.5 py-1 text-[10px] font-bold"
                  style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
                >
                  {expertBooking.mode}
                </span>
              </p>

              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-[12px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: T.primary }}
              >
                {expertBooking.primary.label}
                <Icon name={expertBooking.primary.icon} size={14} style={{ backgroundColor: '#ffffff' }} />
              </button>

              <button
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 text-[12px] font-bold transition-colors hover:bg-gray-50"
                style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                {expertBooking.secondary.label}
                <Icon name={expertBooking.secondary.icon} size={14} style={{ backgroundColor: T.primary }} />
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid gap-5 lg:grid-cols-[300px_1fr] items-start">
          {/* Service rail declared first → right. */}
          <aside className="space-y-4 lg:sticky lg:top-4">
            <Card>
              <h2 className="text-right text-[13.5px] font-extrabold leading-6" style={{ color: T.ink }}>
                {expertServices.title}
              </h2>

              <ul className="mt-4 space-y-3">
                {expertServices.items.map((s) => (
                  <li key={s.id} className="p-3.5" style={{ borderRadius: R.md, backgroundColor: `${s.fg}0d` }}>
                    <div className="flex items-start gap-2.5">
                      <h3 className="flex-1 text-right text-[12.5px] font-extrabold" style={{ color: s.fg }}>
                        {s.title}
                      </h3>
                      <span
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{ borderRadius: R.md, backgroundColor: s.bg }}
                      >
                        <Icon name={s.icon} size={16} style={{ backgroundColor: s.fg }} />
                      </span>
                    </div>

                    <p className="mt-2 text-right text-[10px] leading-5" style={{ color: T.muted }}>
                      {s.desc.map((d) => (
                        <React.Fragment key={d}>
                          {d}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>

                    <p className="mt-2 text-right text-[11px] font-bold" style={{ color: T.ink }}>
                      {s.price}
                    </p>

                    <button
                      className="mt-2.5 px-4 py-1.5 text-[10.5px] font-bold bg-white"
                      style={{ borderRadius: R.sm, border: `1px solid ${s.fg}`, color: s.fg }}
                    >
                      {s.cta}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>

            <button
              className="w-full flex items-center justify-center gap-2 py-4 text-[12.5px] font-extrabold"
              style={{ borderRadius: R.lg, backgroundColor: T.tintPurple, color: T.primary }}
            >
              {expertServices.compare.label}
              <Icon name={expertServices.compare.icon} size={16} style={{ backgroundColor: T.primary }} />
            </button>
          </aside>

          {/* Main column. */}
          <main className="min-w-0 space-y-4">
            <div
              className="bg-white px-2 overflow-x-auto"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center gap-1 min-w-max justify-end">
                {expertTabs.map((t) => {
                  const on = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="relative flex items-center gap-2 px-5 py-3.5 text-[12px] whitespace-nowrap transition-colors"
                      style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
                    >
                      {t.label}
                      <Icon
                        name={t.icon}
                        size={14}
                        style={{ backgroundColor: on ? T.primary : T.muted }}
                      />
                      {on && (
                        <span
                          className="absolute bottom-0 inset-x-3 h-[3px] rounded-t-full"
                          style={{ backgroundColor: T.primary }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Card>
              <h2 className="flex items-center justify-end gap-2 text-[15px] font-extrabold" style={{ color: T.ink }}>
                {expertAbout.title}
                <Icon name={expertAbout.icon} size={17} style={{ backgroundColor: T.violet }} />
              </h2>

              {expertAbout.body.map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 text-right text-[12px] leading-8" style={{ color: T.muted }}>
                  {p}
                </p>
              ))}
            </Card>

            <Card>
              <h2 className="text-right text-[14px] font-extrabold" style={{ color: T.ink }}>
                {expertTopics.title}
              </h2>

              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {expertTopics.items.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex-1 text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
                      {t}
                    </span>
                    <Icon name="lucide:circle-check" size={16} style={{ backgroundColor: T.successStrong }} />
                  </li>
                ))}
              </ul>
            </Card>

            <section className="p-5" style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}>
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-[220px] text-right order-2 sm:order-1">
                  <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: T.primary }}>
                    {expertAgent.title}
                    <span
                      className="w-8 h-8 flex items-center justify-center bg-white"
                      style={{ borderRadius: R.md }}
                    >
                      <Icon name="lucide:bot" size={16} style={{ backgroundColor: T.violet }} />
                    </span>
                  </h2>
                  <p className="mt-2 text-[11.5px] leading-6" style={{ color: T.muted }}>
                    {expertAgent.desc}
                  </p>

                  <label className="mt-3 flex items-center gap-2.5 px-4 py-2.5 bg-white" style={{ borderRadius: R.md }}>
                    <button
                      aria-label="ارسال"
                      className="w-8 h-8 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.sm, backgroundColor: T.primary }}
                    >
                      <Icon name="lucide:send" size={14} className="text-white" />
                    </button>
                    <input
                      placeholder={expertAgent.placeholder}
                      className="flex-1 min-w-0 bg-transparent text-[11.5px] outline-none placeholder:text-[#9396b0]"
                      style={{ color: T.ink }}
                    />
                  </label>

                  <div className="mt-3 flex items-center gap-2 flex-wrap justify-end">
                    {expertAgent.chips.map((c) => (
                      <button
                        key={c}
                        className="px-3.5 py-2 text-[10.5px] font-semibold bg-white transition-colors hover:bg-gray-50"
                        style={{ borderRadius: R.md, color: T.ink }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <img
                  src="/images/aryaz/illustrations/ai-assistant-avatar.png"
                  alt=""
                  className="w-[96px] h-[96px] object-contain shrink-0 order-1 sm:order-2"
                />
              </div>
            </section>

            <Card>
              <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: T.ink }}>
                {expertExperience.title}
                <Icon name={expertExperience.icon} size={16} style={{ backgroundColor: T.violet }} />
              </h2>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {expertExperience.items.map((e) => (
                  <li
                    key={e.label}
                    className="p-4 text-center"
                    style={{ borderRadius: R.md, backgroundColor: `${e.fg}0d` }}
                  >
                    <span
                      className="mx-auto w-9 h-9 flex items-center justify-center"
                      style={{ borderRadius: R.md, backgroundColor: e.bg }}
                    >
                      <Icon name={e.icon} size={16} style={{ backgroundColor: e.fg }} />
                    </span>
                    <span className="mt-3 block text-[20px] font-extrabold" style={{ color: T.ink }}>
                      {e.value}
                    </span>
                    <span className="mt-1 block text-[11px] font-bold" style={{ color: T.ink }}>
                      {e.label}
                    </span>
                    <span className="mt-0.5 block text-[9.5px]" style={{ color: T.muted }}>
                      {e.sub}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </main>
        </div>

        {/* ── Reviews ────────────────────────────────────────── */}
        <div className="mt-5 grid gap-4 xl:grid-cols-[380px_1fr] items-start">
          {/* Score summary declared first → right. */}
          <Card>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <button className="text-[10.5px] font-bold" style={{ color: T.primary }}>
                {expertReviews.all}
              </button>
            </div>

            <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_130px] items-center">
              <ul className="order-2 sm:order-1 space-y-2">
                {expertReviews.criteria.map((c) => (
                  <li key={c.label} className="flex items-center gap-2.5">
                    <span className="w-8 text-[10px] font-bold" style={{ color: T.muted }}>
                      {c.value}
                    </span>
                    <span className="flex-1 h-2 rounded-full" style={{ backgroundColor: T.border }}>
                      <span
                        className="block h-2 rounded-full"
                        style={{ width: `${c.pct}%`, backgroundColor: T.violet }}
                      />
                    </span>
                    <span className="text-[10.5px] font-bold text-right shrink-0" style={{ color: T.ink }}>
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="order-1 sm:order-2 text-center">
                <span className="block text-[24px] font-extrabold" style={{ color: T.ink }}>
                  {expertReviews.score}
                </span>
                <span className="mt-1.5 block">
                  <Stars n={expertReviews.stars} size={16} />
                </span>
                <span className="mt-1 block text-[9.5px]" style={{ color: T.muted }}>
                  {expertReviews.basis}
                </span>
              </div>
            </div>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {expertReviews.items.map((r) => (
              <Card key={r.name}>
                <div className="flex items-start gap-2.5">
                  <div className="flex-1 text-right min-w-0">
                    <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                      {r.name}
                    </span>
                    <span className="block text-[9.5px]" style={{ color: T.muted }}>
                      {r.role}
                    </span>
                  </div>
                  <img src={r.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                </div>

                <p className="mt-2.5 flex items-center justify-end gap-2 flex-wrap">
                  <span className="text-[9.5px]" style={{ color: T.muted }}>
                    {r.tag}
                  </span>
                  <span className="text-[9.5px] font-bold" style={{ color: T.muted }}>
                    {r.score}
                  </span>
                  <Stars n={r.stars} size={12} />
                </p>

                <p className="mt-2 text-right text-[11px] leading-6" style={{ color: T.ink }}>
                  {r.text}
                </p>

                <p className="mt-2.5 text-right text-[9.5px]" style={{ color: T.muted }}>
                  {r.when}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Closing CTA ────────────────────────────────────── */}
        <section
          className="mt-5 p-6 flex items-center gap-5 flex-wrap"
          style={{ borderRadius: R.lg, backgroundColor: '#f3effd' }}
        >
          <div className="flex-1 min-w-[240px] text-right">
            <h2 className="text-[15px] font-extrabold" style={{ color: T.ink }}>
              {expertCta.title}
            </h2>
            <p className="mt-1.5 text-[11.5px]" style={{ color: T.muted }}>
              {expertCta.desc}
            </p>
          </div>

          <button
            className="flex items-center gap-2 px-8 py-3 text-[12.5px] font-extrabold text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primary }}
          >
            {expertCta.primary.label}
            <Icon name={expertCta.primary.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
          </button>

          <button
            className="flex items-center gap-2 px-8 py-3 text-[12.5px] font-bold bg-white shrink-0 transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
          >
            {expertCta.secondary.label}
            <Icon name={expertCta.secondary.icon} size={15} style={{ backgroundColor: T.primary }} />
          </button>
        </section>
      </div>
    </div>
  );
}
