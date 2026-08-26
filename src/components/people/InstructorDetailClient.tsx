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

        {/* ── About ──────────────────────────────────────────── */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_290px] items-start">
          {/* Main first → right. */}
          <div className="min-w-0 space-y-4">
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
