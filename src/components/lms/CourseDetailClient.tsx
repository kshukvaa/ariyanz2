'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import { TabBar, LmsPanel, LmsAgentCard, Ring } from './LmsParts';
import {
  courseHero,
  coursePurchase,
  courseProgress,
  courseResources,
  courseTabs,
  courseAbout,
  courseAgent,
  courseRelated,
  coursePath,
  courseReviews,
  courseSticky,
} from '@/data/lms/single-course';

/* ──────────────────────────────────────────────────────────────
   The course page.

   RTL note, because this is where the layout is easy to get
   wrong: the FIRST declared grid column lands on the RIGHT. The
   mockup puts the purchase/progress rail on the right and the
   reading column on the left, so the rail is declared first
   everywhere below — hero included.
────────────────────────────────────────────────────────────── */

function Stars({ n, size = 13, fg = L.amber }: { n: number; size?: number; fg?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="lucide:star"
          size={size}
          style={{ backgroundColor: i < n ? fg : L.border }}
        />
      ))}
    </span>
  );
}

export default function CourseDetailClient() {
  const [tab, setTab] = useState('about');

  return (
    <div style={{ backgroundColor: L.page }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-7">
          <div className="grid gap-6 lg:grid-cols-[300px_1fr] items-start">
            {/* Rail first → lands on the right. */}
            <aside
              className="p-5 bg-white lg:sticky lg:top-4"
              style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
            >
              <h2 className="text-center text-[12.5px] font-bold" style={{ color: L.navy }}>
                {coursePurchase.title}
              </h2>

              <p className="mt-3 flex items-baseline justify-center gap-2">
                <span className="text-[22px] font-extrabold" style={{ color: L.navy }}>
                  {coursePurchase.price}
                </span>
                <span className="text-[11px]" style={{ color: L.muted }}>
                  {coursePurchase.currency}
                </span>
              </p>

              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: LR.md, backgroundColor: L.orange }}
              >
                {coursePurchase.buy.label}
                <Icon name={coursePurchase.buy.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
              </button>

              <button
                className="mt-2.5 w-full flex items-center justify-center gap-2 py-3 text-[12.5px] font-bold transition-colors hover:bg-gray-50"
                style={{ borderRadius: LR.md, border: `1px solid ${L.border}`, color: L.navy }}
              >
                {coursePurchase.wish.label}
                <Icon name={coursePurchase.wish.icon} size={15} style={{ backgroundColor: L.blue }} />
              </button>

              <ul className="mt-5 space-y-3.5">
                {coursePurchase.perks.map((p) => (
                  <li key={p.label} className="flex items-center gap-2.5">
                    <span className="flex-1 text-right text-[11.5px] font-bold" style={{ color: L.navy }}>
                      {p.label}
                    </span>
                    <Icon name={p.icon} size={17} style={{ backgroundColor: p.fg }} />
                  </li>
                ))}
              </ul>
            </aside>

            {/* Reading column. Measured off the mockup: the title
                block sits at x≈110–507 and the player at x≈531–855,
                i.e. the player is to the RIGHT of the copy. In RTL
                that makes the player the first column, so it takes
                `md:order-1`. On mobile the title leads instead. */}
            <div className="grid gap-6 md:grid-cols-[minmax(0,340px)_1fr] items-center">
              <div className="text-right order-1 md:order-2">
                <h1
                  className="text-[22px] sm:text-[26px] font-extrabold leading-[1.55]"
                  style={{ color: L.navy }}
                >
                  {courseHero.title}
                </h1>

                <div className="mt-4 flex items-center justify-end gap-2.5">
                  <span className="text-[12px] font-bold" style={{ color: L.navy }}>
                    {courseHero.instructorLabel} {courseHero.instructor}
                  </span>
                  <img
                    src={courseHero.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                    style={{ border: `2px solid ${L.blueSoft}` }}
                  />
                </div>

                <div className="mt-5 flex items-center justify-end gap-3 flex-wrap">
                  {courseHero.meta.map((m) =>
                    m.pill ? (
                      <span
                        key={m.label}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10.5px] font-bold text-white"
                        style={{ borderRadius: LR.pill, backgroundColor: L.blue }}
                      >
                        {m.label}
                        <Icon name={m.icon} size={12} style={{ backgroundColor: '#ffffff' }} />
                      </span>
                    ) : (
                      <span
                        key={m.label}
                        className="flex items-center gap-1.5 text-[10.5px] font-bold"
                        style={{ color: L.navy }}
                      >
                        {m.label}
                        <Icon name={m.icon} size={13} style={{ backgroundColor: L.navy }} />
                      </span>
                    ),
                  )}

                  <span className="flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: L.navy }}>
                    {courseHero.rating.score}
                    <span style={{ color: L.muted }}>{courseHero.rating.count}</span>
                    <Icon name="lucide:star" size={13} style={{ backgroundColor: L.orange }} />
                    <Icon name="lucide:sparkles" size={13} style={{ backgroundColor: L.orange }} />
                  </span>
                </div>

                <p className="mt-5 text-[12px] leading-7" style={{ color: L.muted }}>
                  {courseHero.desc.map((d) => (
                    <React.Fragment key={d}>
                      {d}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div className="order-2 md:order-1">
                <div
                  className="relative overflow-hidden aspect-video"
                  style={{ borderRadius: LR.lg, backgroundColor: L.navyDeep }}
                >
                  <img
                    src={courseHero.poster}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/85 flex items-center justify-center">
                      <Icon name="lucide:play" size={20} style={{ backgroundColor: L.navy }} />
                    </span>
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent">
                    <Icon name="lucide:play" size={13} style={{ backgroundColor: '#ffffff' }} />
                    <span className="text-[10px] text-white/90">{courseHero.playerTime}</span>
                    <span className="flex-1 h-1 rounded-full bg-white/30" />
                    <Icon name="lucide:maximize" size={13} style={{ backgroundColor: '#ffffff' }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-6 pb-32">
        <div className="grid gap-5 lg:grid-cols-[300px_1fr] items-start">
          {/* Rail first → right. */}
          <aside className="space-y-4">
            <section
              className="bg-white p-5"
              style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
            >
              <h2 className="text-center text-[13px] font-extrabold" style={{ color: L.navy }}>
                {courseProgress.title}
              </h2>

              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="text-[12px] font-bold" style={{ color: L.navy }}>
                  {courseProgress.caption}
                </span>
                <Ring pct={courseProgress.pct} size={86} stroke={11} colour={L.green} />
              </div>

              <p className="mt-4 text-right text-[11px] font-bold" style={{ color: L.navy }}>
                {courseProgress.barLabel}
              </p>
              <span className="mt-2 block h-2 rounded-full" style={{ backgroundColor: L.border }}>
                <span
                  className="block h-2 rounded-full"
                  style={{ width: `${courseProgress.barPct}%`, backgroundColor: L.green }}
                />
              </span>

              <ul className="mt-4 space-y-3">
                {courseProgress.rows.map((r) => (
                  <li key={r.label} className="flex items-center gap-2.5">
                    <span
                      className="flex-1 text-right text-[11px] font-bold"
                      style={{ color: r.muted ? L.muted : L.navy }}
                    >
                      {r.label}
                    </span>
                    <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
                  </li>
                ))}
              </ul>

              <Link
                href={courseProgress.cta.href}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[12px] font-extrabold text-white"
                style={{ borderRadius: LR.md, backgroundColor: L.navy }}
              >
                <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: '#ffffff' }} />
                {courseProgress.cta.label}
              </Link>
            </section>

            <LmsPanel title={courseResources.title} cta={courseResources.cta}>
              <ul className="space-y-3.5">
                {courseResources.items.map((r) => (
                  <li key={r.title} className="flex items-start gap-2.5">
                    <p className="flex-1 text-right min-w-0">
                      <span className="block text-[11.5px] font-extrabold leading-5" style={{ color: L.navy }}>
                        {r.title}
                      </span>
                      <span className="mt-1 block text-[9.5px]" style={{ color: L.blue }}>
                        {r.meta}
                      </span>
                    </p>
                    <img
                      src={r.image}
                      alt=""
                      className="w-14 h-14 object-cover shrink-0"
                      style={{ borderRadius: LR.sm }}
                    />
                  </li>
                ))}
              </ul>
            </LmsPanel>
          </aside>

          {/* Main column. */}
          <main className="min-w-0 space-y-5">
            <TabBar tabs={courseTabs} active={tab} onPick={setTab} />

            <LmsPanel>
              <h2 className="flex items-center justify-end gap-2 text-[15px] font-extrabold" style={{ color: L.navy }}>
                {courseAbout.title}
                <Icon name="lucide:file-text" size={17} style={{ backgroundColor: L.blue }} />
              </h2>

              {courseAbout.body.map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 text-right text-[12px] leading-8" style={{ color: L.muted }}>
                  {p}
                </p>
              ))}

              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                {courseAbout.outcomes.map((o) => (
                  <li
                    key={o.label}
                    className="flex items-center gap-2 px-3 py-3"
                    style={{ borderRadius: LR.md, backgroundColor: L.page }}
                  >
                    <span className="flex-1 text-right text-[10.5px] font-bold leading-5" style={{ color: L.navy }}>
                      {o.label}
                    </span>
                    <Icon name={o.icon} size={16} style={{ backgroundColor: o.fg }} />
                  </li>
                ))}
              </ul>
            </LmsPanel>

            <LmsAgentCard
              title={courseAgent.title}
              desc={courseAgent.desc}
              chips={courseAgent.chips}
              placeholder={courseAgent.placeholder}
            />

            {/* Five related-content columns. */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {courseRelated.map((g) => (
                <section
                  key={g.id}
                  className="bg-white p-4"
                  style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
                >
                  <header className="flex items-center gap-2">
                    <h3 className="flex-1 text-right text-[10.5px] font-extrabold leading-4" style={{ color: L.navy }}>
                      {g.title}
                    </h3>
                    <span
                      className="w-9 h-9 flex items-center justify-center shrink-0"
                      style={{ borderRadius: LR.md, backgroundColor: g.bg }}
                    >
                      <Icon name={g.icon} size={17} style={{ backgroundColor: g.fg }} />
                    </span>
                  </header>

                  <ul className="mt-3.5 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 justify-end">
                        <span className="text-[10.5px] font-bold text-right" style={{ color: L.navy }}>
                          {it}
                        </span>
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ border: `1.5px solid ${L.muted}` }}
                        />
                      </li>
                    ))}
                    <li className="flex items-center gap-2 justify-end">
                      <span className="text-[10.5px]" style={{ color: L.muted }}>
                        {g.cta}
                      </span>
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ border: `1.5px solid ${L.muted}` }}
                      />
                    </li>
                  </ul>
                </section>
              ))}
            </div>

          </main>
        </div>
          {/* Bottom row, measured off the mockup: the learning
              path card sits at x≈40–497 and the reviews block
              fills x≈500–1166, i.e. the row spans the FULL
              container width — it is not inside <main>. RTL
              declares the reviews block first so it lands right. */}
          <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr] mt-5">
            <LmsPanel title={courseReviews.title}>
              {/* The review list sits at x≈836–1166 in the mockup and
                  the score block at x≈500–836, so the list is the
                  RTL-first (right) column here. */}
              <div className="grid gap-5 lg:grid-cols-[1fr_1fr] items-start">
              <div className="lg:order-2 grid gap-5 sm:grid-cols-[1fr_150px] items-center">
                <div className="order-2 sm:order-1 space-y-2">
                  {courseReviews.bars.map((b) => (
                    <div key={b.label} className="flex items-center gap-2.5">
                      <span className="w-9 text-[10.5px] font-bold" style={{ color: L.navy }}>
                        {b.label}
                      </span>
                      <span className="flex-1 h-2.5 rounded-full" style={{ backgroundColor: L.page }}>
                        <span
                          className="block h-2.5 rounded-full"
                          style={{ width: `${b.pct}%`, backgroundColor: L.amber }}
                        />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-1 sm:order-2 text-center">
                  <span className="block text-[10.5px]" style={{ color: L.muted }}>
                    {courseReviews.scoreLabel}
                  </span>
                  <span className="block mt-1 text-[34px] font-extrabold" style={{ color: L.navy }}>
                    {courseReviews.score}
                  </span>
                  <span className="mt-1 block">
                    <Stars n={courseReviews.stars} size={15} />
                  </span>
                  <span className="mt-1 block text-[10px]" style={{ color: L.muted }}>
                    {courseReviews.basis}
                  </span>
                  <button
                    className="mt-3 px-5 py-2.5 text-[11px] font-bold text-white"
                    style={{ borderRadius: LR.md, backgroundColor: L.blue }}
                  >
                    {courseReviews.submit}
                  </button>
                </div>
              </div>

              <div className="lg:order-1">
              <ul className="space-y-3.5">
                {courseReviews.items.map((r) => (
                  <li key={r.name} className="flex items-start gap-2.5">
                    <div className="flex-1 text-right min-w-0">
                      <span className="block text-[11.5px] font-extrabold" style={{ color: L.navy }}>
                        {r.name}
                      </span>
                      <span className="block text-[9.5px]" style={{ color: L.muted }}>
                        {r.role}
                      </span>
                      <span className="mt-1 block">
                        <Stars n={r.stars} size={11} fg={L.violet} />
                      </span>
                      <p className="mt-1 text-[10.5px] leading-5" style={{ color: L.navy }}>
                        {r.text}
                      </p>
                    </div>
                    <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                  </li>
                ))}
              </ul>

              <button className="mt-4 w-full text-[10.5px] font-bold" style={{ color: L.blue }}>
                {courseReviews.all}
              </button>
              </div>
              </div>
            </LmsPanel>

            <LmsPanel title={coursePath.title}>
              <ol className="flex items-start justify-between gap-1 overflow-x-auto pb-1">
                {coursePath.steps.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-1 shrink-0">
                    {i > 0 && (
                      <Icon
                        name="lucide:arrow-left"
                        size={14}
                        className="mt-7"
                        style={{ backgroundColor: L.border }}
                      />
                    )}
                    <span className="w-[92px] text-center">
                      <Icon
                        name="lucide:diamond"
                        size={9}
                        style={{ backgroundColor: s.state === 'current' ? L.navy : L.navy }}
                      />
                      <span className="mt-1.5 block">
                        <Icon
                          name={s.icon}
                          size={22}
                          style={{ backgroundColor: s.state === 'next' ? L.green : L.navy }}
                        />
                      </span>
                      <span className="mt-2 block text-[10px] font-extrabold" style={{ color: L.navy }}>
                        {s.title}
                      </span>
                      <span className="mt-0.5 block text-[8.5px] leading-4" style={{ color: L.muted }}>
                        {s.sub}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <button
                className="mt-5 mx-auto flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blue}`, color: L.blue }}
              >
                {coursePath.cta}
                <Icon name="lucide:eye" size={13} style={{ backgroundColor: L.blue }} />
              </button>
            </LmsPanel>
          </div>
      </div>

      {/* ── Sticky buy bar ───────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40" style={{ backgroundColor: L.navy }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
          <img src={courseSticky.avatar} alt="" className="w-11 h-11 rounded-full object-cover shrink-0" />

          <div className="flex-1 min-w-[220px] text-right">
            <span className="block text-[13px] font-extrabold text-white">{courseSticky.title}</span>
            <span className="mt-1 flex items-center justify-end gap-3 flex-wrap">
              <span className="flex items-center gap-1 text-[10px] text-white/85">
                {courseSticky.rating.count}
                <span className="font-bold">{courseSticky.rating.score}</span>
                <Icon name="lucide:star" size={11} style={{ backgroundColor: L.amber }} />
              </span>
              {courseSticky.meta
                .slice()
                .reverse()
                .map((m) => (
                  <span key={m.label} className="flex items-center gap-1 text-[10px] text-white/85">
                    {m.label}
                    {m.icon && (
                      <Icon name={m.icon} size={11} style={{ backgroundColor: m.fg ?? 'rgba(255,255,255,.7)' }} />
                    )}
                  </span>
                ))}
            </span>
          </div>

          <span className="flex items-baseline gap-1.5 text-white shrink-0">
            <span className="text-[15px] font-extrabold">{courseSticky.price}</span>
            <span className="text-[10.5px] text-white/70">{courseSticky.currency}</span>
          </span>

          <button
            className="flex items-center gap-2 px-7 py-3 text-[12.5px] font-extrabold text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ borderRadius: LR.md, backgroundColor: L.orange }}
          >
            {courseSticky.buy.label}
            <Icon name={courseSticky.buy.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
          </button>

          <button
            aria-label="افزودن به علاقه‌مندی"
            className="w-12 h-12 flex items-center justify-center shrink-0"
            style={{ borderRadius: LR.md, border: '1px solid rgba(255,255,255,.3)' }}
          >
            <Icon name="lucide:heart" size={17} style={{ backgroundColor: '#ffffff' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
