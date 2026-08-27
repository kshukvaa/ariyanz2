'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  AUTHOR_HERO_FROM,
  AUTHOR_HERO_TO,
  authorCrumbs,
  authorHero,
  authorStats,
  authorTabs,
  authorThemes,
  authorAbout,
  authorAgent,
  authorEducation,
  authorCareer,
  authorPosts,
  authorBooks,
  authorReviews,
  authorArticlesPanel,
  authorBooksPanel,
  authorNotes,
  authorInterviews,
  authorRelatedCourses,
} from '@/data/people/author-detail';

/* ──────────────────────────────────────────────────────────────
   صفحه نویسنده.

   The aside is on the RIGHT in the source, so it is declared
   before <main>. Inside the body the same rule repeats: «حوزه‌های
   فکری» sits right of «درباره نویسنده», «تحصیلات» right of the
   career timeline.
────────────────────────────────────────────────────────────── */

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: T.ink }}>
      {children}
      <span className="w-[3px] h-4 rounded-full" style={{ backgroundColor: T.primary }} />
    </h2>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="lucide:star"
          size={12}
          style={{ backgroundColor: i < n ? '#f5a524' : T.border }}
        />
      ))}
    </span>
  );
}


/* Panels behind the five non-About tabs. */
function AMeta({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
      {children}
      <Icon name={icon} size={12} style={{ backgroundColor: T.muted }} />
    </span>
  );
}

function AuthorArticlesPanel() {
  return (
    <Card>
      <SectionTitle>{authorArticlesPanel.title}</SectionTitle>
      <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
        {authorArticlesPanel.items.map((a) => (
          <li
            key={a.title}
            className="flex items-center gap-3 p-3"
            style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}
          >
            <img src={a.image} alt="" className="w-16 h-14 object-cover shrink-0" style={{ borderRadius: R.sm }} />
            <span className="flex-1 min-w-0 text-right">
              <span className="block text-[11.5px] font-extrabold leading-6" style={{ color: T.ink }}>
                {a.title}
              </span>
              <span className="mt-1 flex items-center justify-end gap-3">
                <AMeta icon="lucide:clock">{a.meta}</AMeta>
                <AMeta icon="lucide:calendar">{a.date}</AMeta>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AuthorBooksPanel() {
  return (
    <Card>
      <SectionTitle>{authorBooksPanel.title}</SectionTitle>
      <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
        {authorBooksPanel.items.map((b) => (
          <li
            key={b.title}
            className="flex items-start gap-3.5 p-3.5"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <img src={b.cover} alt="" className="w-16 h-24 object-cover shrink-0" style={{ borderRadius: R.sm }} />
            <span className="flex-1 min-w-0 text-right">
              <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                {b.title}
              </span>
              <span className="mt-0.5 block text-[10px]" style={{ color: T.muted }}>
                {b.meta}
              </span>
              <span className="mt-2 block text-[10.5px] leading-6" style={{ color: T.ink }}>
                {b.desc}
              </span>
              <button
                className="mt-2.5 px-3.5 py-1.5 text-[10.5px] font-bold"
                style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                {authorBooksPanel.cta}
              </button>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AuthorNotesPanel() {
  return (
    <Card>
      <SectionTitle>{authorNotes.title}</SectionTitle>
      <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
        {authorNotes.items.map((n) => (
          <li
            key={n.title}
            className="p-4 text-right"
            style={{ borderRadius: R.md, backgroundColor: '#f8f7fd', borderRight: `3px solid ${T.primary}` }}
          >
            <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
              {n.title}
            </span>
            <span className="mt-1 block text-[9.5px]" style={{ color: T.muted }}>
              {n.date}
            </span>
            <p className="mt-2.5 text-[10.5px] leading-7" style={{ color: T.ink }}>
              {n.body}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AuthorInterviewsPanel() {
  return (
    <Card>
      <SectionTitle>{authorInterviews.title}</SectionTitle>
      <ul className="mt-4 space-y-3">
        {authorInterviews.items.map((i) => (
          <li
            key={i.title}
            className="flex items-center gap-3.5 p-3.5"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <span
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
            >
              <Icon name={i.icon} size={17} style={{ backgroundColor: T.primary }} />
            </span>
            <span className="flex-1 min-w-0 text-right">
              <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                {i.title}
              </span>
              <span className="mt-1 flex items-center justify-end gap-3 flex-wrap">
                <AMeta icon="lucide:clock">{i.length}</AMeta>
                <AMeta icon="lucide:calendar">{i.date}</AMeta>
                <AMeta icon="lucide:megaphone">{i.outlet}</AMeta>
              </span>
            </span>
            <span
              className="px-2.5 py-1 text-[9.5px] font-bold shrink-0"
              style={{ borderRadius: R.pill, backgroundColor: T.tintOrange, color: T.accent }}
            >
              {i.kind}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AuthorCoursesPanel() {
  return (
    <Card>
      <SectionTitle>{authorRelatedCourses.title}</SectionTitle>
      <ul className="mt-4 grid gap-3.5 sm:grid-cols-3">
        {authorRelatedCourses.items.map((c) => (
          <li
            key={c.title}
            className="overflow-hidden"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <img src={c.image} alt="" className="w-full h-24 object-cover" />
            <div className="p-3 text-right">
              <span className="block text-[11.5px] font-extrabold leading-6" style={{ color: T.ink }}>
                {c.title}
              </span>
              <span className="mt-1 block text-[10px]" style={{ color: T.muted }}>
                {c.meta}
              </span>
              <button
                className="mt-2.5 w-full py-2 text-[10.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: T.primary }}
              >
                {authorRelatedCourses.cta}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function AuthorDetailClient() {
  const [tab, setTab] = useState('about');

  return (
    <div style={{ backgroundColor: T.page }}>
      {/* ── Hero band ────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: `linear-gradient(to left, ${AUTHOR_HERO_FROM}, ${AUTHOR_HERO_TO})` }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-4">
          <nav className="flex items-center justify-end gap-1.5 flex-wrap text-[10.5px]">
            {authorCrumbs.map((c, i) => (
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

          <div className="mt-3 grid gap-6 lg:grid-cols-[230px_1fr_150px] items-end">
            {/* Portrait first → right. */}
            <div className="relative self-end order-1">
              <span
                className="absolute -top-2 right-0 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 text-[9.5px] font-bold text-white whitespace-nowrap"
                style={{ borderRadius: R.pill, backgroundColor: 'rgba(255,255,255,.12)' }}
              >
                {authorHero.badge}
                <Icon name="lucide:badge-check" size={12} style={{ backgroundColor: '#a78bfa' }} />
              </span>
              <img
                src={authorHero.avatar}
                alt=""
                className="mt-8 w-full max-h-[290px] object-cover object-top"
              />
            </div>

            <div className="text-right py-8 order-2">
              <h1 className="text-[30px] font-extrabold text-white">{authorHero.name}</h1>
              <p className="mt-2 text-[14px] font-bold" style={{ color: 'rgba(255,255,255,.85)' }}>
                {authorHero.title}
              </p>

              <p className="mt-5 flex items-center justify-end gap-3">
                <span className="text-[13px] font-bold" style={{ color: 'rgba(255,255,255,.85)' }}>
                  {authorHero.scoreLabel}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5"
                  style={{ borderRadius: R.md, backgroundColor: 'rgba(255,255,255,.1)' }}
                >
                  <span className="text-[15px] font-extrabold text-white">{authorHero.score}</span>
                  <Icon name="lucide:star" size={15} style={{ backgroundColor: '#f5a524' }} />
                </span>
              </p>
              <p className="mt-1.5 text-[10px]" style={{ color: 'rgba(255,255,255,.55)' }}>
                {authorHero.basis}
              </p>

              <ul className="mt-5 flex items-center justify-end gap-2 flex-wrap">
                {authorHero.tags.map((t) => (
                  <li
                    key={t}
                    className="px-3.5 py-1.5 text-[10px]"
                    style={{
                      borderRadius: R.pill,
                      backgroundColor: 'rgba(255,255,255,.09)',
                      color: 'rgba(255,255,255,.88)',
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-end gap-2.5 flex-wrap">
                {authorHero.actions.map((a) => (
                  <button
                    key={a.label}
                    className="flex items-center gap-2 px-6 py-3 text-[11.5px] font-extrabold"
                    style={
                      a.kind === 'solid'
                        ? { borderRadius: R.md, backgroundColor: '#4a15d5', color: '#ffffff' }
                        : { borderRadius: R.md, backgroundColor: '#ffffff', color: T.ink }
                    }
                  >
                    {a.label}
                    <Icon
                      name={a.icon}
                      size={14}
                      style={{ backgroundColor: a.kind === 'solid' ? '#ffffff' : T.primary }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Save/share cluster declared last → left. */}
            <div className="flex items-start justify-end gap-2 py-8 order-3">
              <button
                aria-label="اشتراک‌گذاری"
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.pill, backgroundColor: 'rgba(255,255,255,.12)' }}
              >
                <Icon name="lucide:share-2" size={16} style={{ backgroundColor: '#ffffff' }} />
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold bg-white shrink-0"
                style={{ borderRadius: R.md, color: T.ink }}
              >
                {authorHero.save}
                <Icon name="lucide:bookmark" size={13} style={{ backgroundColor: T.primary }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid gap-4 lg:grid-cols-[300px_1fr] items-start">
          {/* Aside declared first → right. */}
          <aside className="space-y-4">
            <section className="p-4" style={{ borderRadius: R.lg, backgroundColor: '#f3f0fe' }}>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0 text-right">
                  <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                    {authorAgent.title}
                    <span className="w-[3px] h-4 rounded-full" style={{ backgroundColor: T.primary }} />
                  </h2>
                  <p className="mt-2 text-[10px] leading-5" style={{ color: T.muted }}>
                    {authorAgent.desc.map((d) => (
                      <React.Fragment key={d}>
                        {d}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                <img src={authorAgent.art} alt="" className="w-16 h-16 object-contain shrink-0" />
              </div>
            </section>

            <ul className="space-y-2">
              {authorAgent.chips.map((c) => (
                <li key={c}>
                  <button
                    className="w-full flex items-center gap-2 px-3.5 py-3 text-right"
                    style={{ borderRadius: R.md, backgroundColor: '#f6f5fc' }}
                  >
                    <span className="flex-1 text-[10.5px] font-bold" style={{ color: T.primary }}>
                      {c}
                    </span>
                    <Icon name="lucide:chevron-left" size={12} style={{ backgroundColor: '#c9c3ea' }} />
                  </button>
                </li>
              ))}
            </ul>

            <label
              className="flex items-center gap-2.5 px-3 py-2.5 bg-white"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <button
                aria-label="ارسال"
                className="w-9 h-9 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.sm, backgroundColor: T.primary }}
              >
                <Icon name="lucide:send" size={14} style={{ backgroundColor: '#ffffff' }} />
              </button>
              <input
                placeholder={authorAgent.placeholder}
                className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
                style={{ color: T.ink }}
              />
            </label>

            <Card>
              <header className="flex items-center gap-2">
                <button className="text-[10.5px] font-bold" style={{ color: T.primary }}>
                  {authorPosts.cta}
                </button>
                <div className="flex-1">
                  <SectionTitle>{authorPosts.title}</SectionTitle>
                </div>
              </header>

              <ul className="mt-4 space-y-3.5">
                {authorPosts.items.map((p) => (
                  <li key={p.title} className="flex items-start gap-2.5">
                    <span className="flex-1 text-right min-w-0">
                      <span className="block text-[11px] font-extrabold leading-5" style={{ color: T.ink }}>
                        {p.title}
                      </span>
                      <span className="mt-1 block text-[9px]" style={{ color: T.muted }}>
                        {p.meta}
                      </span>
                    </span>
                    <img
                      src={p.image}
                      alt=""
                      className="w-14 h-14 object-cover shrink-0"
                      style={{ borderRadius: R.sm }}
                    />
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <header className="flex items-center gap-2">
                <button className="text-[10.5px] font-bold" style={{ color: T.primary }}>
                  {authorBooks.cta}
                </button>
                <div className="flex-1">
                  <SectionTitle>{authorBooks.title}</SectionTitle>
                </div>
              </header>

              <ul className="mt-4 grid grid-cols-3 gap-2.5">
                {authorBooks.items.map((b) => (
                  <li key={b.title} className="text-center">
                    <img
                      src={b.cover}
                      alt=""
                      className="w-full aspect-[3/4] object-cover"
                      style={{ borderRadius: R.sm }}
                    />
                    <span className="mt-2 block text-[9.5px] font-extrabold leading-4" style={{ color: T.ink }}>
                      {b.title}
                    </span>
                    <span className="mt-1 block text-[8px]" style={{ color: T.muted }}>
                      {b.meta}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>

          {/* Main column. */}
          <main className="min-w-0 space-y-4">
            {/* Stat strip. */}
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {authorStats.map((s) => (
                <li
                  key={s.label}
                  className="bg-white p-4 flex items-center gap-3"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <span
                    className="w-11 h-11 flex items-center justify-center shrink-0 order-2"
                    style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
                  >
                    <Icon name={s.icon} size={19} style={{ backgroundColor: T.primary }} />
                  </span>
                  <span className="flex-1 text-right order-1">
                    <span className="block text-[19px] font-extrabold" style={{ color: T.ink }}>
                      {s.value}
                    </span>
                    <span className="block text-[10.5px] font-bold" style={{ color: T.ink }}>
                      {s.label}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {s.sub}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Tabs. */}
            <div
              className="bg-white px-2 overflow-x-auto"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center gap-1 min-w-max justify-end">
                {authorTabs.map((t) => {
                  const on = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="relative flex items-center gap-2 px-5 py-4 text-[12px] whitespace-nowrap"
                      style={{ color: on ? T.primary : T.ink, fontWeight: on ? 800 : 600 }}
                    >
                      {t.label}
                      <Icon name={t.icon} size={14} style={{ backgroundColor: on ? T.primary : T.ink }} />
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

            {tab === 'articles' && <AuthorArticlesPanel />}
            {tab === 'books' && <AuthorBooksPanel />}
            {tab === 'notes' && <AuthorNotesPanel />}
            {tab === 'interviews' && <AuthorInterviewsPanel />}
            {tab === 'courses' && <AuthorCoursesPanel />}

            {tab === 'about' && (
              <>
            {/* Themes (right) + about (left). */}
            <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
              <Card>
                <SectionTitle>{authorThemes.title}</SectionTitle>
                <ul className="mt-4 grid grid-cols-2 gap-2.5">
                  {authorThemes.items.map((t) => (
                    <li
                      key={t.label}
                      className="px-3 py-4 text-center"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <Icon name={t.icon} size={22} style={{ backgroundColor: T.primary }} />
                      <span className="mt-2 block text-[10px] font-bold" style={{ color: T.ink }}>
                        {t.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <SectionTitle>{authorAbout.title}</SectionTitle>
                {authorAbout.body.map((p) => (
                  <p
                    key={p.slice(0, 20)}
                    className="mt-3 text-right text-[12px] leading-8"
                    style={{ color: T.ink }}
                  >
                    {p}
                  </p>
                ))}

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
                  {authorAbout.credentials.map((c) => (
                    <li
                      key={c.label}
                      className="flex items-start gap-2.5 p-3"
                      style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}
                    >
                      <span className="flex-1 text-right min-w-0">
                        <span className="block text-[10px] font-extrabold leading-4" style={{ color: T.ink }}>
                          {c.label}
                        </span>
                        <span className="mt-1 block text-[9px]" style={{ color: T.muted }}>
                          {c.sub}
                        </span>
                      </span>
                      <Icon name={c.icon} size={16} className="shrink-0" style={{ backgroundColor: T.primary }} />
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Education (right) + career (left). */}
            <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
              <Card>
                <SectionTitle>{authorEducation.title}</SectionTitle>
                <ul className="mt-4 space-y-3">
                  {authorEducation.items.map((e) => (
                    <li key={e.degree} className="flex items-start gap-2.5">
                      <span className="flex-1 text-right min-w-0">
                        <span className="block text-[11px] font-extrabold" style={{ color: T.ink }}>
                          {e.degree}
                        </span>
                        <span className="block text-[10px]" style={{ color: T.muted }}>
                          {e.school}
                        </span>
                      </span>
                      <span
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
                      >
                        <Icon name="lucide:graduation-cap" size={16} style={{ backgroundColor: T.primary }} />
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <SectionTitle>{authorCareer.title}</SectionTitle>
                <ol className="mt-4 space-y-3">
                  {authorCareer.items.map((c) => (
                    <li key={c.role} className="grid gap-3 sm:grid-cols-[130px_1fr] items-start">
                      <span className="flex items-center gap-2 justify-end sm:justify-start pt-1">
                        <span className="text-[11px] font-extrabold" style={{ color: T.primary }}>
                          {c.period}
                        </span>
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: T.primary }}
                        />
                      </span>

                      <div className="text-right">
                        <span className="block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                          {c.role}
                        </span>
                        <span className="mt-0.5 block text-[10.5px]" style={{ color: T.muted }}>
                          {c.org}
                        </span>
                        <span className="mt-1.5 block text-[10.5px] leading-6" style={{ color: T.ink }}>
                          {c.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>

            {/* Reviews. */}
            <Card>
              <header className="flex items-center gap-2">
                <button className="text-[10.5px] font-bold" style={{ color: T.primary }}>
                  {authorReviews.all}
                </button>
                <div className="flex-1">
                  <SectionTitle>{authorReviews.title}</SectionTitle>
                </div>
              </header>

              <div className="mt-4 grid gap-4 lg:grid-cols-[300px_1fr] items-start">
                {/* Score summary first → right. */}
                <div className="grid grid-cols-[1fr_90px] gap-3 items-center">
                  <ul className="space-y-1.5">
                    {authorReviews.bars.map((b) => (
                      <li key={b.label} className="flex items-center gap-2">
                        <span className="w-11 text-[9px] text-left" style={{ color: T.muted }}>
                          {b.count}
                        </span>
                        <span className="flex-1 h-2 rounded-full" style={{ backgroundColor: T.border }}>
                          <span
                            className="block h-2 rounded-full"
                            style={{ width: `${b.pct}%`, backgroundColor: '#f5a524' }}
                          />
                        </span>
                        <span className="text-[9px] shrink-0" style={{ color: T.muted }}>
                          {b.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    <span className="block text-[30px] font-extrabold" style={{ color: T.ink }}>
                      {authorReviews.score}
                    </span>
                    <span className="block text-[10px]" style={{ color: T.muted }}>
                      {authorReviews.outOf}
                    </span>
                    <span className="mt-2 block text-[8.5px] leading-4" style={{ color: T.muted }}>
                      {authorReviews.basis.map((b) => (
                        <React.Fragment key={b}>
                          {b}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </div>
                </div>

                <ul className="grid gap-3 sm:grid-cols-3">
                  {authorReviews.items.map((r) => (
                    <li
                      key={r.name}
                      className="p-3.5"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <p className="text-right text-[10.5px] leading-6" style={{ color: T.ink }}>
                        {r.text}
                      </p>

                      <div className="mt-3 flex items-center gap-2.5">
                        <span className="flex-1 text-right min-w-0">
                          <span className="block text-[11px] font-extrabold" style={{ color: T.ink }}>
                            {r.name}
                          </span>
                          <span className="block text-[9px]" style={{ color: T.muted }}>
                            {r.role}
                          </span>
                        </span>
                        <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                      </div>

                      <p className="mt-2 text-right">
                        <Stars n={r.stars} />
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
