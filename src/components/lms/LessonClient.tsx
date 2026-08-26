'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import LearnShell from './LearnShell';
import { courseBand, courseCurriculum, courseAside, lessonTabs } from '@/data/lms/course-context';
import { lesson } from '@/data/lms/lesson';

/* ──────────────────────────────────────────────────────────────
   A single lesson.

   The centre column is the lesson itself: player, what it is for,
   what it covers, the files it hands you, and the three controls
   that move you through the course. Discussion sits below the
   fold because it is a second visit, not a first one.
────────────────────────────────────────────────────────────── */

export default function LessonClient() {
  const [tab, setTab] = useState('about');
  const [talkTab, setTalkTab] = useState(lesson.talk.tabs[0].id);

  return (
    <LearnShell band={courseBand} curriculum={courseCurriculum} aside={courseAside}>
      {/* ── Lesson header + player ─────────────────────────────── */}
      <section className="bg-white p-4 sm:p-5" style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}>
        <div className="flex items-start gap-3 flex-wrap">
          <span
            className="px-3 py-1.5 text-[10.5px] font-bold shrink-0"
            style={{ borderRadius: LR.sm, backgroundColor: L.blueSoft, color: L.blue }}
          >
            {lesson.chip}
          </span>

          <div className="flex-1 min-w-[220px] text-right">
            <span className="block text-[10.5px]" style={{ color: L.muted }}>
              {lesson.eyebrow}
            </span>
            <h2 className="mt-1 text-[18px] font-extrabold" style={{ color: L.navy }}>
              {lesson.title}
            </h2>
            <span className="mt-1 flex items-center justify-end gap-1.5 text-[10.5px]" style={{ color: L.muted }}>
              {lesson.duration}
              <Icon name="lucide:clock" size={12} style={{ backgroundColor: L.muted }} />
            </span>
          </div>

          <button
            aria-label="ذخیره درس"
            className="w-9 h-9 flex items-center justify-center shrink-0"
            style={{ borderRadius: LR.sm, border: `1px solid ${L.border}` }}
          >
            <Icon name="lucide:bookmark" size={15} style={{ backgroundColor: L.navy }} />
          </button>
        </div>

        {/* Player. Static poster — the mockup shows a paused frame. */}
        <div
          className="mt-4 relative overflow-hidden"
          style={{ borderRadius: LR.md, background: `linear-gradient(120deg, ${L.navyDeep}, ${L.navy})` }}
        >
          <div className="h-[260px] sm:h-[300px] flex items-center justify-center">
            <div className="text-center">
              <span className="block text-[34px] font-extrabold text-white">KPI</span>
              <span className="block mt-1 text-[13px]" style={{ color: 'rgba(255,255,255,.7)' }}>
                Key Performance Indicator
              </span>

              <ul className="mt-6 flex items-start gap-6 flex-wrap justify-center px-4">
                {lesson.slideBullets.map((b) => (
                  <li key={b.label} className="w-[92px] text-center">
                    <Icon name={b.icon} size={20} style={{ backgroundColor: '#ffffff', margin: '0 auto' }} />
                    <span className="block mt-2 text-[9px] leading-3" style={{ color: 'rgba(255,255,255,.8)' }}>
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="flex items-center gap-3 px-4 py-2.5"
            style={{ backgroundColor: 'rgba(0,0,0,.35)' }}
          >
            <Icon name="lucide:maximize" size={14} style={{ backgroundColor: '#ffffff' }} />
            <Icon name="lucide:settings" size={14} style={{ backgroundColor: '#ffffff' }} />
            <Icon name="lucide:volume-2" size={14} style={{ backgroundColor: '#ffffff' }} />
            <span className="flex-1" />
            <span className="text-[10.5px]" style={{ color: 'rgba(255,255,255,.8)' }}>
              {lesson.playhead}
            </span>
            <Icon name="lucide:skip-forward" size={14} style={{ backgroundColor: '#ffffff' }} />
            <Icon name="lucide:play" size={14} style={{ backgroundColor: '#ffffff' }} />
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────── */}
        <div className="mt-4 flex items-center gap-1 justify-end flex-wrap" style={{ borderBottom: `1px solid ${L.border}` }}>
          {lessonTabs.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={on}
                className="relative px-4 py-2.5 text-[12px] whitespace-nowrap"
                style={{ color: on ? L.blue : L.muted, fontWeight: on ? 800 : 600 }}
              >
                {t.label}
                {on && (
                  <span
                    className="absolute -bottom-px inset-x-2 h-[2.5px] rounded-t-full"
                    style={{ backgroundColor: L.blue }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Goal ───────────────────────────────────────────────── */}
      <section className="bg-white p-4 sm:p-5" style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}>
        <h3 className="text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
          {lesson.goal.title}
        </h3>
        <p className="mt-2 text-right text-[12px] leading-8" style={{ color: L.muted }}>
          {lesson.goal.body}
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* RTL: outline first → lands right. */}
          <div>
            <h4 className="text-right text-[12.5px] font-extrabold" style={{ color: L.navy }}>
              {lesson.outline.title}
            </h4>
            <ul className="mt-2.5 space-y-2">
              {lesson.outline.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-[11.5px]" style={{ color: L.ink }}>
                  <span className="flex-1 text-right leading-6">{i}</span>
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                    style={{ backgroundColor: L.blue }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div
            className="p-4"
            style={{ borderRadius: LR.md, backgroundColor: L.greenSoft }}
          >
            <h4 className="text-right text-[12.5px] font-extrabold" style={{ color: L.navy }}>
              {lesson.keyPoints.title}
            </h4>
            <ul className="mt-2.5 space-y-2">
              {lesson.keyPoints.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-[11.5px]" style={{ color: L.ink }}>
                  <span className="flex-1 text-right leading-6">{i}</span>
                  <Icon
                    name="lucide:circle-check"
                    size={14}
                    style={{ backgroundColor: L.green, marginTop: 4 }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Resources ──────────────────────────────────────────── */}
      <section
        id="resources"
        className="bg-white p-4 sm:p-5"
        style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
      >
        <h3 className="text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
          {lesson.resources.title}
        </h3>

        <div className="mt-3.5 grid gap-3 sm:grid-cols-3">
          {lesson.resources.files.map((f) => (
            <a
              key={f.label}
              href="#"
              className="flex items-center gap-3 p-3 transition-colors hover:bg-gray-50"
              style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
            >
              <span
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ borderRadius: LR.sm, backgroundColor: `${f.fg}14` }}
              >
                <Icon name={f.icon} size={19} style={{ backgroundColor: f.fg }} />
              </span>
              <span className="flex-1 text-right min-w-0">
                <span className="block text-[11.5px] font-extrabold truncate" style={{ color: L.navy }}>
                  {f.label}
                </span>
                <span className="block text-[9.5px]" style={{ color: L.muted }}>
                  {f.sub}
                </span>
                <span className="block text-[9.5px]" style={{ color: L.muted }}>
                  {f.size}
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* ── Lesson controls ──────────────────────────────────── */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Link
            href={lesson.nav.prev.href}
            className="flex items-center justify-center gap-2 py-3 text-[12px] font-bold"
            style={{ borderRadius: LR.md, border: `1px solid ${L.border}`, color: L.navy }}
          >
            <Icon name="lucide:arrow-right" size={14} style={{ backgroundColor: L.muted }} />
            {lesson.nav.prev.label}
          </Link>

          <button
            className="flex items-center justify-center gap-2 py-3 text-[12px] font-bold text-white"
            style={{ borderRadius: LR.md, backgroundColor: L.green }}
          >
            <Icon name="lucide:check-check" size={15} className="text-white" />
            {lesson.nav.complete}
          </button>

          <Link
            href={lesson.nav.next.href}
            className="flex items-center justify-center gap-2 py-3 text-[12px] font-bold text-white"
            style={{ borderRadius: LR.md, backgroundColor: L.blue }}
          >
            {lesson.nav.next.label}
            <Icon name="lucide:arrow-left" size={14} className="text-white" />
          </Link>
        </div>
      </section>

      {/* ── Discussion + questions + quick links ───────────────── */}
      <div className="grid gap-4 lg:grid-cols-[1fr_260px_220px]">
        <section
          className="bg-white p-4 sm:p-5 lg:order-1"
          style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
        >
          <h3 className="text-right text-[13.5px] font-extrabold" style={{ color: L.navy }}>
            {lesson.talk.title}
          </h3>

          <div className="mt-3 flex items-center gap-1 justify-end" style={{ borderBottom: `1px solid ${L.border}` }}>
            {lesson.talk.tabs.map((t) => {
              const on = t.id === talkTab;
              return (
                <button
                  key={t.id}
                  onClick={() => setTalkTab(t.id)}
                  aria-pressed={on}
                  className="relative px-3.5 py-2.5 text-[11.5px]"
                  style={{ color: on ? L.blue : L.muted, fontWeight: on ? 800 : 600 }}
                >
                  {t.label}
                  {on && (
                    <span
                      className="absolute -bottom-px inset-x-2 h-[2.5px] rounded-t-full"
                      style={{ backgroundColor: L.blue }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <label
            className="mt-4 flex items-center gap-2.5 px-3.5 py-3"
            style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
          >
            <input
              placeholder={lesson.talk.placeholder}
              className="flex-1 min-w-0 bg-transparent text-[11.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: L.ink }}
            />
            <Icon name="lucide:paperclip" size={15} style={{ backgroundColor: L.muted }} />
          </label>

          <button
            className="mt-3 px-6 py-2.5 text-[12px] font-bold text-white"
            style={{ borderRadius: LR.md, backgroundColor: L.blue }}
          >
            {lesson.talk.send}
          </button>
        </section>

        <section
          className="bg-white p-4 lg:order-2"
          style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
        >
          <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: L.navy }}>
            {lesson.questions.title}
          </h3>
          <ul className="mt-3 space-y-3">
            {lesson.questions.items.map((q) => (
              <li key={q.q}>
                <p className="text-right text-[10.5px] font-semibold leading-5" style={{ color: L.ink }}>
                  {q.q}
                </p>
                <p className="mt-0.5 text-right text-[9px]" style={{ color: L.muted }}>
                  {q.by}
                </p>
              </li>
            ))}
          </ul>
          <button className="mt-3 text-[10.5px] font-bold" style={{ color: L.blue }}>
            {lesson.questions.cta}
          </button>
        </section>

        <section
          className="bg-white p-4 lg:order-3"
          style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
        >
          <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: L.navy }}>
            {lesson.quick.title}
          </h3>
          <ul className="mt-3 space-y-2.5">
            {lesson.quick.items.map((i) => (
              <li key={i.label} className="flex items-center gap-2.5">
                <span className="flex-1 text-right text-[10.5px]" style={{ color: L.ink }}>
                  {i.label}
                </span>
                <Icon name={i.icon} size={15} style={{ backgroundColor: i.fg }} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </LearnShell>
  );
}
