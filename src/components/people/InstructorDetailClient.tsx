'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  INSTRUCTOR_HERO_FROM,
  INSTRUCTOR_HERO_TO,
  instructorCrumbs,
  instructorHero,
  instructorStats,
  instructorTabs,
  instructorAbout,
  instructorContact,
  instructorSocial,
  instructorResume,
  instructorCareer,
  instructorCourses,
  instructorArticles,
  instructorProjects,
  instructorReviews,
  instructorCerts,
} from '@/data/people/instructor-detail';

/* ──────────────────────────────────────────────────────────────
   صفحه مدرس.

   RTL rule as everywhere: first declared column lands right. The
   portrait, the spec card and the career timeline's date column
   are all right-anchored in the mockup, so each is declared
   before the thing that sits to its left.
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


/* Small shared bits for the non-About panels. */
function Meta({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
      {children}
      <Icon name={icon} size={12} style={{ backgroundColor: T.muted }} />
    </span>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${n} از ۵`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon
          key={i}
          name="lucide:star"
          size={11}
          style={{ backgroundColor: i < n ? '#f5a524' : '#dcdae8' }}
        />
      ))}
    </span>
  );
}

function CoursesPanel() {
  return (
    <Card>
      <SectionTitle>{instructorCourses.title}</SectionTitle>
      <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
        {instructorCourses.items.map((c) => (
          <li
            key={c.title}
            className="overflow-hidden flex flex-col"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <img src={c.image} alt="" className="w-full h-28 object-cover" />
            <div className="p-3.5 text-right flex-1 flex flex-col">
              <span className="block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {c.title}
              </span>
              <span className="mt-1 block text-[10.5px] leading-6" style={{ color: T.muted }}>
                {c.desc}
              </span>

              <div className="mt-3 flex items-center justify-end gap-3 flex-wrap">
                <Meta icon="lucide:users-round">{c.students}</Meta>
                <Meta icon="lucide:clock">{c.duration}</Meta>
                <Meta icon="lucide:monitor-play">{c.mode}</Meta>
              </div>

              <div
                className="mt-3 pt-3 flex items-center justify-between gap-2"
                style={{ borderTop: `1px solid ${T.border}` }}
              >
                <button
                  className="px-4 py-2 text-[11px] font-extrabold text-white transition-opacity hover:opacity-90"
                  style={{ borderRadius: R.md, backgroundColor: T.primary }}
                >
                  مشاهده دوره
                </button>
                <span className="flex items-center gap-2">
                  <span className="text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                    {c.price}
                  </span>
                  <span className="flex items-center gap-1 text-[10.5px] font-bold" style={{ color: '#f5a524' }}>
                    {c.rating}
                    <Icon name="lucide:star" size={11} style={{ backgroundColor: '#f5a524' }} />
                  </span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ArticlesPanel() {
  return (
    <Card>
      <SectionTitle>{instructorArticles.title}</SectionTitle>
      <ul className="mt-4 space-y-3">
        {instructorArticles.items.map((a) => (
          <li
            key={a.title}
            className="flex items-center gap-3.5 p-3"
            style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}
          >
            <img src={a.image} alt="" className="w-20 h-16 object-cover shrink-0" style={{ borderRadius: R.sm }} />
            <div className="flex-1 min-w-0 text-right">
              <span className="block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {a.title}
              </span>
              <div className="mt-1.5 flex items-center justify-end gap-3">
                <Meta icon="lucide:clock">{a.meta}</Meta>
                <Meta icon="lucide:calendar">{a.date}</Meta>
              </div>
            </div>
            <button
              className="px-3.5 py-2 text-[10.5px] font-bold shrink-0"
              style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
            >
              {instructorArticles.cta}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ProjectsPanel() {
  return (
    <Card>
      <SectionTitle>{instructorProjects.title}</SectionTitle>
      <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
        {instructorProjects.items.map((p) => (
          <li key={p.name} className="p-4 text-right" style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}>
            <div className="flex items-start gap-2.5">
              <span className="flex-1 min-w-0">
                <span className="block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {p.name}
                </span>
                <span className="mt-0.5 block text-[10.5px]" style={{ color: T.muted }}>
                  {p.org} — {p.year}
                </span>
              </span>
              <span
                className="w-9 h-9 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
              >
                <Icon name={p.icon} size={16} style={{ backgroundColor: T.primary }} />
              </span>
            </div>

            <p className="mt-3 text-[10.5px] leading-6" style={{ color: T.ink }}>
              {p.scope}
            </p>
            <p
              className="mt-2 px-3 py-2 text-[10.5px] leading-6"
              style={{ borderRadius: R.sm, backgroundColor: T.tintGreen, color: '#1c7a35' }}
            >
              {p.result}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ReviewsPanel() {
  const r = instructorReviews;
  return (
    <Card>
      <SectionTitle>{r.title}</SectionTitle>

      <div className="mt-4 grid gap-5 sm:grid-cols-[150px_1fr] items-center">
        {/* Score first → right. */}
        <div className="text-center">
          <span className="block text-[34px] font-extrabold leading-none" style={{ color: T.primary }}>
            {r.score}
          </span>
          <span className="mt-1 block text-[10.5px]" style={{ color: T.muted }}>
            {r.outOf}
          </span>
          <span className="mt-2 block text-[10px]" style={{ color: T.muted }}>
            {r.basis.join(' · ')}
          </span>
        </div>

        <ul className="space-y-1.5">
          {r.bars.map((b) => (
            <li key={b.label} className="flex items-center gap-2.5">
              <span className="text-[10px] w-14 text-right shrink-0" style={{ color: T.muted }}>
                {b.label}
              </span>
              <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#eeecf7' }}>
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${b.pct}%`, backgroundColor: '#f5a524' }}
                />
              </span>
              <span className="text-[10px] w-12 shrink-0" style={{ color: T.muted }}>
                {b.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-5 grid gap-3.5 sm:grid-cols-3">
        {r.items.map((i) => (
          <li key={i.name} className="p-3.5 text-right" style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}>
            <p className="text-[10.5px] leading-6" style={{ color: T.ink }}>
              {i.text}
            </p>
            <div className="mt-3 pt-3 flex items-center gap-2.5" style={{ borderTop: `1px solid ${T.border}` }}>
              <img src={i.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
              <span className="flex-1 min-w-0 text-right">
                <span className="block text-[11px] font-extrabold truncate" style={{ color: T.ink }}>
                  {i.name}
                </span>
                <span className="block text-[9.5px]" style={{ color: T.muted }}>
                  {i.role}
                </span>
              </span>
              <Stars n={i.stars} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function CertsPanel() {
  return (
    <Card>
      <SectionTitle>{instructorCerts.title}</SectionTitle>
      <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
        {instructorCerts.items.map((c) => (
          <li
            key={c.name}
            className="flex items-center gap-3 p-3.5"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <span
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.sm, backgroundColor: T.tintOrange }}
            >
              <Icon name="lucide:award" size={18} style={{ backgroundColor: T.accent }} />
            </span>
            <span className="flex-1 min-w-0 text-right">
              <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                {c.name}
              </span>
              <span className="mt-0.5 block text-[10px]" style={{ color: T.muted }}>
                {c.issuer} — {c.year}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function InstructorDetailClient() {
  const [tab, setTab] = useState('about');

  return (
    <div style={{ backgroundColor: T.page }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5">
        <nav className="flex items-center justify-end gap-1.5 flex-wrap text-[10.5px]">
          {instructorCrumbs.map((c, i) => (
            <React.Fragment key={c.label}>
              {i > 0 && <span style={{ color: T.muted }}>›</span>}
              {c.href ? (
                <Link href={c.href} style={{ color: T.muted }}>
                  {c.label}
                </Link>
              ) : (
                <span style={{ color: T.ink }}>{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* ── Hero card ──────────────────────────────────────── */}
        <section
          className="mt-4 relative overflow-hidden"
          style={{
            borderRadius: R.lg,
            backgroundImage: `linear-gradient(to left, ${INSTRUCTOR_HERO_FROM}, ${INSTRUCTOR_HERO_TO})`,
          }}
        >
          <span
            className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-bold text-white"
            style={{ borderRadius: R.pill, backgroundColor: '#1c7f4d' }}
          >
            مدرس فعال آریاز
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>

          <div className="grid gap-6 lg:grid-cols-[240px_1fr_240px] items-center">
            {/* Portrait first → right. */}
            <div className="relative min-h-[220px] self-end">
              <img
                src={instructorHero.avatar}
                alt=""
                className="w-full h-full max-h-[300px] object-cover object-top"
              />
            </div>

            <div className="text-right px-5 py-8 lg:px-0 lg:py-10">
              <h1 className="flex items-center justify-end gap-2.5 text-[28px] font-extrabold text-white">
                {instructorHero.name}
                <Icon name="lucide:badge-check" size={22} style={{ backgroundColor: '#7c5cff' }} />
              </h1>

              <p className="mt-2 text-[15px] font-bold" style={{ color: 'rgba(255,255,255,.88)' }}>
                {instructorHero.title}
              </p>
              <p className="mt-3 text-[11.5px]" style={{ color: 'rgba(255,255,255,.6)' }}>
                {instructorHero.desc}
              </p>

              <p className="mt-4 flex items-center justify-end gap-2">
                <span className="text-[15px] font-extrabold text-white">{instructorHero.rating}</span>
                <Icon name="lucide:star" size={16} style={{ backgroundColor: '#f5a524' }} />
              </p>
              <p className="mt-1 text-[10px]" style={{ color: 'rgba(255,255,255,.55)' }}>
                {instructorHero.basis}
              </p>

              <div className="mt-6 flex items-center justify-end gap-2.5 flex-wrap">
                {instructorHero.actions.map((a) => (
                  <button
                    key={a.label}
                    className="flex items-center gap-2 px-5 py-3 text-[11.5px] font-extrabold"
                    style={
                      a.kind === 'solid'
                        ? { borderRadius: R.md, backgroundColor: '#4a15d5', color: '#ffffff' }
                        : a.kind === 'green'
                          ? { borderRadius: R.md, backgroundColor: '#1c7f4d', color: '#ffffff' }
                          : { borderRadius: R.md, backgroundColor: '#ffffff', color: T.ink }
                    }
                  >
                    {a.label}
                    <Icon
                      name={a.icon}
                      size={14}
                      style={{ backgroundColor: a.kind === 'white' ? T.primary : '#ffffff' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Skills panel declared last → left. */}
            <aside
              className="m-5 p-4 self-stretch"
              style={{ borderRadius: R.lg, backgroundColor: 'rgba(255,255,255,.06)' }}
            >
              <h2 className="text-center text-[12.5px] font-extrabold text-white">
                {instructorHero.skillsTitle}
              </h2>
              <ul className="mt-3.5 grid grid-cols-2 gap-2">
                {instructorHero.skills.map((s) => (
                  <li
                    key={s}
                    className="px-2.5 py-2 text-center text-[9.5px] font-bold"
                    style={{
                      borderRadius: R.sm,
                      backgroundColor: 'rgba(255,255,255,.07)',
                      color: 'rgba(255,255,255,.9)',
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* ── Stat strip ─────────────────────────────────────── */}
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {instructorStats.map((s) => (
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

        {/* ── Tabs ───────────────────────────────────────────── */}
        <div
          className="mt-4 bg-white px-2 overflow-x-auto"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-1 min-w-max justify-end">
            {instructorTabs.map((t) => {
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

        {/* ── Tab panel ──────────────────────────────────────── */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_290px] items-start">
          {/* Main first → right. */}
          <div className="min-w-0 space-y-4">
            {tab === 'courses' && <CoursesPanel />}
            {tab === 'articles' && <ArticlesPanel />}
            {tab === 'projects' && <ProjectsPanel />}
            {tab === 'reviews' && <ReviewsPanel />}
            {tab === 'certs' && <CertsPanel />}

            {tab === 'about' && (
              <>
            <Card>
              <SectionTitle>{instructorAbout.title}</SectionTitle>

              <div className="mt-4 grid gap-5 md:grid-cols-[210px_1fr]">
                {/* Spec card first → right. */}
                <ul
                  className="p-4 space-y-4 self-start"
                  style={{ borderRadius: R.md, backgroundColor: '#faf9ff' }}
                >
                  {instructorAbout.spec.map((s) => (
                    <li key={s.label} className="flex items-start gap-2.5">
                      <span className="flex-1 text-right min-w-0">
                        <span className="block text-[11px] font-extrabold" style={{ color: T.ink }}>
                          {s.label}
                        </span>
                        <span className="block text-[10px]" style={{ color: T.muted }}>
                          {s.value}
                        </span>
                      </span>
                      <span
                        className="w-8 h-8 flex items-center justify-center shrink-0"
                        style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
                      >
                        <Icon name={s.icon} size={15} style={{ backgroundColor: T.primary }} />
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  {instructorAbout.body.map((p) => (
                    <p
                      key={p.slice(0, 20)}
                      className="mb-4 text-right text-[12px] leading-8"
                      style={{ color: T.ink }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle>{instructorCareer.title}</SectionTitle>

              <ol className="mt-4 space-y-3">
                {instructorCareer.items.map((c) => (
                  <li key={c.role} className="grid gap-3 sm:grid-cols-[130px_1fr] items-start">
                    {/* Period first → right. */}
                    <span className="flex items-center gap-2 justify-end sm:justify-start pt-3">
                      <span className="text-[11px] font-extrabold" style={{ color: T.primary }}>
                        {c.period}
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ border: `2px solid ${T.primary}` }}
                      />
                    </span>

                    <div className="p-3.5 text-right" style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}>
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

              <button
                className="mt-4 mx-auto flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold"
                style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.primary }} />
                {instructorCareer.more}
              </button>
            </Card>
              </>
            )}
          </div>

          {/* Aside declared last → left. */}
          <aside className="space-y-4">
            <Card>
              <SectionTitle>{instructorContact.title}</SectionTitle>

              <ul className="mt-4 space-y-1">
                {instructorContact.items.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-2.5 py-3"
                    style={{ borderBottom: `1px solid ${T.border}` }}
                  >
                    <Icon name="lucide:chevron-left" size={12} className="order-3" style={{ backgroundColor: '#d6d1ef' }} />
                    <span className="flex-1 text-left text-[10.5px] order-2 truncate" style={{ color: T.ink }} dir="ltr">
                      {c.label}
                    </span>
                    <Icon name={c.icon} size={16} className="order-1 shrink-0" style={{ backgroundColor: T.primary }} />
                  </li>
                ))}
              </ul>

              <button
                className="mt-4 w-full py-3 text-[12px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: T.primary }}
              >
                {instructorContact.cta}
              </button>
            </Card>

            <Card>
              <SectionTitle>{instructorSocial.title}</SectionTitle>
              <ul className="mt-4 flex items-center justify-center gap-4">
                {instructorSocial.items.map((s) => (
                  <li key={s.icon}>
                    <a
                      href="#"
                      aria-label={s.icon}
                      className="w-12 h-12 flex items-center justify-center"
                      style={{ borderRadius: R.pill, backgroundColor: s.bg }}
                    >
                      <Icon name={s.icon} size={22} style={{ backgroundColor: '#ffffff' }} />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <SectionTitle>{instructorResume.title}</SectionTitle>
              <p className="mt-4 text-center text-[11px]" style={{ color: T.muted }}>
                {instructorResume.desc}
              </p>
              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[11.5px] font-bold"
                style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                {instructorResume.cta}
                <Icon name="lucide:download" size={13} style={{ backgroundColor: T.primary }} />
              </button>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
