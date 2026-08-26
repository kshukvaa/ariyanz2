'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { LevelBar } from './PathParts';
import { pathsLanding } from '@/data/lms/path-steps';

/* ──────────────────────────────────────────────────────────────
   مسیرهای یادگیری — the landing.

   The page's job is one fork: are you here for a ROLE or for a
   SKILL? So the two choice cards are the hero's payload, and
   everything below is evidence for whichever you pick.

   RTL: the copy column is declared before the artwork, and each
   card grid is declared in reading order so item ۱ lands right.
────────────────────────────────────────────────────────────── */

const L = pathsLanding;

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

export default function PathsLandingClient() {
  const [pill, setPill] = useState(L.popular.pills[0]);

  return (
    <div style={{ backgroundColor: T.page }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden grid gap-6 lg:grid-cols-[1fr_1fr] items-center"
          style={{ borderRadius: R.lg, backgroundColor: '#f7f9fb' }}
        >
          <div className="px-8 py-10 text-right order-1">
            <h1 className="text-[30px] sm:text-[36px] font-extrabold" style={{ color: T.ink }}>
              {L.hero.titleLead}{' '}
              <span style={{ color: '#1c8a4e' }}>{L.hero.titleAccent}</span>{' '}
              {L.hero.titleTail}
            </h1>

            <p className="mt-4 text-[12.5px] leading-8" style={{ color: T.muted }}>
              {L.hero.desc.map((d) => (
                <React.Fragment key={d}>
                  {d}
                  <br />
                </React.Fragment>
              ))}
            </p>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {L.hero.choices.map((c) => (
                <li key={c.id}>
                  <div className="p-5 h-full" style={{ borderRadius: R.lg, backgroundColor: c.bg, border: `1px solid ${c.fg}22` }}>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 text-right min-w-0">
                        <h2 className="text-[15px] font-extrabold" style={{ color: T.ink }}>
                          {c.title}
                        </h2>
                        <p className="mt-1.5 text-[11px] font-bold" style={{ color: T.ink }}>
                          {c.sub}
                        </p>
                      </div>
                      <span
                        className="w-14 h-14 flex items-center justify-center shrink-0 bg-white"
                        style={{ borderRadius: '999px' }}
                      >
                        <Icon name={c.icon} size={26} style={{ backgroundColor: c.fg }} />
                      </span>
                    </div>

                    <p className="mt-3 text-right text-[10px] leading-6" style={{ color: T.muted }}>
                      {c.example}
                    </p>

                    <Link
                      href={c.id === 'career' ? '/learning-paths/archive' : '/learning-paths/archive'}
                      className="mt-4 block py-2.5 text-center text-[11.5px] font-bold bg-white"
                      style={{ borderRadius: R.md, color: c.fg }}
                    >
                      {c.cta}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/learning-paths/archive"
              className="mt-5 flex items-center justify-center gap-2 text-[11.5px] font-bold"
              style={{ color: '#1b56d3' }}
            >
              <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: '#1b56d3' }} />
              {L.hero.all}
            </Link>
          </div>

          <img src={L.hero.art} alt="" className="w-full h-full object-cover order-2" />
        </section>

        {/* ── Agent ────────────────────────────────────────── */}
        <Card>
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[220px] text-center order-1">
              <h2 className="flex items-center justify-center gap-2 text-[15px] font-extrabold" style={{ color: T.ink }}>
                {L.agent.title}
                <Icon name="lucide:sparkles" size={16} style={{ backgroundColor: T.violet }} />
              </h2>
              <p className="mt-2 text-[11.5px]" style={{ color: T.muted }}>
                {L.agent.desc}
              </p>

              <ul className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                {L.agent.chips.map((c) => (
                  <li key={c}>
                    <button
                      className="px-4 py-2.5 text-[10.5px] font-bold"
                      style={{ borderRadius: R.md, border: `1px solid ${T.primary}33`, color: T.primary }}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <img
              src="/images/aryaz/illustrations/ai-assistant-avatar.png"
              alt=""
              className="w-20 h-20 object-contain shrink-0 order-2"
            />
          </div>

          <label
            className="mt-4 flex items-center gap-2.5 px-3 py-2.5"
            style={{ borderRadius: R.pill, border: `1px solid ${T.border}` }}
          >
            <button
              aria-label="ارسال"
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{ borderRadius: '999px', backgroundColor: T.primary }}
            >
              <Icon name="lucide:send" size={15} style={{ backgroundColor: '#ffffff' }} />
            </button>
            <input
              placeholder={L.agent.placeholder}
              className="flex-1 min-w-0 bg-transparent text-[11.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: T.ink }}
            />
          </label>
        </Card>

        {/* ── Career paths ─────────────────────────────────── */}
        <section>
          <header className="flex items-center gap-3 flex-wrap">
            <Link
              href="/learning-paths/archive"
              className="flex items-center gap-1.5 text-[11px] font-bold shrink-0 order-2"
              style={{ color: '#1b56d3' }}
            >
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: '#1b56d3' }} />
              {L.careerSection.all}
            </Link>

            <div className="flex-1 min-w-[240px] text-right order-1">
              <h2 className="flex items-center justify-end gap-2.5 text-[17px] font-extrabold" style={{ color: T.ink }}>
                {L.careerSection.title}
                <span
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
                >
                  <Icon name={L.careerSection.icon} size={17} style={{ backgroundColor: T.primary }} />
                </span>
              </h2>
              <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
                {L.careerSection.desc}
              </p>
            </div>
          </header>

          <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {L.careerSection.items.map((c) => (
              <li key={c.id}>
                <article
                  className="bg-white p-4 h-full flex flex-col"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="flex-1 text-right text-[14px] font-extrabold" style={{ color: T.ink }}>
                      {c.title}
                    </h3>
                    <span
                      className="w-11 h-11 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.md, backgroundColor: c.bg }}
                    >
                      <Icon name={c.icon} size={20} style={{ backgroundColor: c.fg }} />
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 flex-1">
                    {c.rows.map((r) => (
                      <li key={r.label} className="flex items-center gap-2 text-[10.5px]">
                        <span className="font-bold" style={{ color: T.ink }}>
                          {r.value}
                        </span>
                        <span className="flex-1 text-right" style={{ color: T.muted }}>
                          {r.label} :
                        </span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-[10.5px]">
                      <span className="font-bold" style={{ color: T.ink }}>
                        {c.hours}
                      </span>
                      <span className="flex-1 text-right" style={{ color: T.muted }}>
                        <Icon name="lucide:clock" size={11} className="inline-block align-middle ml-1" style={{ backgroundColor: T.muted }} />
                      </span>
                    </li>
                  </ul>

                  <Link
                    href={c.href}
                    className="mt-4 py-2.5 text-center text-[11.5px] font-bold"
                    style={{ borderRadius: R.md, border: `1px solid ${c.fg}44`, color: c.fg }}
                  >
                    {c.cta}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Skill paths ──────────────────────────────────── */}
        <section>
          <header className="flex items-center gap-3 flex-wrap">
            <Link
              href="/learning-paths/archive"
              className="flex items-center gap-1.5 text-[11px] font-bold shrink-0 order-2"
              style={{ color: '#1b56d3' }}
            >
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: '#1b56d3' }} />
              {L.skillSection.all}
            </Link>

            <h2 className="flex-1 min-w-[240px] flex items-center justify-end gap-2.5 text-[17px] font-extrabold order-1" style={{ color: T.ink }}>
              {L.skillSection.title}
              <span
                className="w-9 h-9 flex items-center justify-center"
                style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
              >
                <Icon name={L.skillSection.icon} size={17} style={{ backgroundColor: T.primary }} />
              </span>
            </h2>
          </header>

          <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-5">
            {L.skillSection.items.map((s) => (
              <li key={s.id}>
                <article
                  className="bg-white p-4 h-full flex flex-col"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <h3 className="text-center text-[14px] font-extrabold" style={{ color: T.ink }}>
                    {s.title}
                  </h3>

                  <div className="mt-4">
                    <LevelBar tone={s.tone} />
                  </div>

                  <p className="mt-4 text-center text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {s.steps}
                  </p>
                  <p className="mt-1 text-center text-[10.5px]" style={{ color: T.muted }}>
                    {s.hours}
                  </p>

                  <ul className="mt-3.5 flex items-center justify-center gap-1.5 flex-wrap flex-1">
                    {L.skillSection.contentIcons.map((ic) => (
                      <li key={ic}>
                        <Icon name={ic} size={14} style={{ backgroundColor: s.fg }} />
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={s.href}
                    className="mt-4 py-2.5 text-center text-[11.5px] font-bold text-white"
                    style={{ borderRadius: R.md, backgroundColor: s.fg }}
                  >
                    {L.skillSection.cta}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Resume ───────────────────────────────────────── */}
        <section>
          <header className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-1.5 text-[11px] font-bold shrink-0 order-2" style={{ color: '#1b56d3' }}>
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: '#1b56d3' }} />
              {L.resume.all}
            </button>

            <h2 className="flex-1 min-w-[240px] flex items-center justify-end gap-2.5 text-[17px] font-extrabold order-1" style={{ color: T.ink }}>
              {L.resume.title}
              <span
                className="w-9 h-9 flex items-center justify-center"
                style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
              >
                <Icon name={L.resume.icon} size={17} style={{ backgroundColor: T.primary }} />
              </span>
            </h2>
          </header>

          <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {L.resume.items.map((r) => (
              <li key={r.id}>
                <article
                  className="bg-white p-4 h-full flex flex-col"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <div className="flex items-center gap-2.5">
                    <h3 className="flex-1 text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                      {r.title}
                    </h3>
                    <span
                      className="w-9 h-9 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.sm, backgroundColor: `${r.fg}14` }}
                    >
                      <Icon name={r.icon} size={16} style={{ backgroundColor: r.fg }} />
                    </span>
                  </div>

                  <div className="mt-3.5 flex items-center gap-2.5">
                    <span className="text-[11px] font-bold shrink-0" style={{ color: T.ink }}>
                      {r.pct}%
                    </span>
                    <span className="flex-1 h-2 rounded-full" style={{ backgroundColor: T.border }}>
                      <span className="block h-2 rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.fg }} />
                    </span>
                  </div>

                  <p className="mt-3 text-right text-[11px] font-bold" style={{ color: T.ink }}>
                    {r.step}
                  </p>
                  <p className="mt-2 text-right text-[9.5px] leading-5 flex-1" style={{ color: T.muted }}>
                    {r.last}
                  </p>

                  <button
                    className="mt-3.5 py-2.5 text-[11.5px] font-bold"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: r.fg }}
                  >
                    {r.cta}
                  </button>
                </article>
              </li>
            ))}

            <li>
              <article
                className="h-full p-5 flex flex-col items-center justify-center text-center"
                style={{ borderRadius: R.lg, border: `1.5px dashed ${T.primary}44` }}
              >
                <span
                  className="w-11 h-11 flex items-center justify-center"
                  style={{ borderRadius: '999px', backgroundColor: T.tintPurple }}
                >
                  <Icon name="lucide:plus" size={20} style={{ backgroundColor: T.primary }} />
                </span>
                <h3 className="mt-3 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {L.resume.empty.title}
                </h3>
                <p className="mt-2 text-[9.5px] leading-5" style={{ color: T.muted }}>
                  {L.resume.empty.desc}
                </p>
                <Link
                  href="/learning-paths/archive"
                  className="mt-3.5 px-6 py-2 text-[11px] font-bold"
                  style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
                >
                  {L.resume.empty.cta}
                </Link>
              </article>
            </li>
          </ul>
        </section>

        {/* ── How a path works ─────────────────────────────── */}
        <Card>
          <h2 className="text-center text-[17px] font-extrabold" style={{ color: T.ink }}>
            {L.how.title}
          </h2>
          <p className="mt-2 text-center text-[11px]" style={{ color: T.muted }}>
            {L.how.desc}
          </p>

          <ol className="mt-6 flex items-start gap-2 overflow-x-auto pb-2">
            {L.how.nodes.map((n, i) => (
              <li key={n.label} className="flex items-start gap-2 shrink-0">
                {i > 0 && (
                  <span className="mt-6 w-8 border-t-2 border-dashed shrink-0" style={{ borderColor: '#ded9f0' }} />
                )}
                <span className="w-[104px] text-center">
                  <span
                    className="mx-auto w-12 h-12 flex items-center justify-center"
                    style={{ borderRadius: R.md, backgroundColor: '#f4f2fd' }}
                  >
                    <Icon name={n.icon} size={20} style={{ backgroundColor: T.primary }} />
                  </span>
                  <span className="mt-2.5 block text-[11px] font-extrabold" style={{ color: T.ink }}>
                    {n.label}
                  </span>
                  <span className="mt-1 block text-[8.5px] leading-4" style={{ color: T.muted }}>
                    {n.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Card>

        {/* ── Popular ──────────────────────────────────────── */}
        <section>
          <header className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-1.5 text-[11px] font-bold shrink-0 order-3" style={{ color: '#1b56d3' }}>
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: '#1b56d3' }} />
              {L.popular.all}
            </button>

            <h2 className="flex-1 min-w-[200px] text-right text-[17px] font-extrabold order-1" style={{ color: T.ink }}>
              {L.popular.title}
            </h2>

            <ul className="flex items-center gap-1.5 shrink-0 order-2">
              {L.popular.pills.map((p) => {
                const on = p === pill;
                return (
                  <li key={p}>
                    <button
                      onClick={() => setPill(p)}
                      aria-pressed={on}
                      className="px-3.5 py-1.5 text-[10px] font-bold"
                      style={{
                        borderRadius: R.pill,
                        backgroundColor: on ? T.primary : '#ffffff',
                        color: on ? '#ffffff' : T.muted,
                        border: `1px solid ${on ? T.primary : T.border}`,
                      }}
                    >
                      {p}
                    </button>
                  </li>
                );
              })}
            </ul>
          </header>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            {L.popular.items.map((p) => (
              <li key={p.rank}>
                <article
                  className="bg-white p-3.5 h-full"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <div className="flex items-start gap-2">
                    <h3 className="flex-1 text-right text-[11.5px] font-extrabold leading-5" style={{ color: T.ink }}>
                      {p.title}
                    </h3>
                    <span
                      className="w-6 h-6 flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ borderRadius: '999px', backgroundColor: p.fg }}
                    >
                      {p.rank}
                    </span>
                  </div>

                  <p className="mt-2.5 text-right text-[9.5px]" style={{ color: T.muted }}>
                    نوع : {p.kind}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="flex -space-x-2 shrink-0">
                      {L.popular.avatars.map((a) => (
                        <img key={a} src={a} alt="" className="w-6 h-6 rounded-full object-cover border-2 border-white" />
                      ))}
                    </span>
                    <span className="flex-1 text-right text-[9.5px]" style={{ color: T.muted }}>
                      {p.hours}
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Closing CTA ──────────────────────────────────── */}
        <section
          className="p-7 text-center"
          style={{
            borderRadius: R.lg,
            backgroundImage: 'linear-gradient(to left, #dbeafe, #ede9fe, #d1fae5)',
          }}
        >
          <h2 className="text-[19px] sm:text-[22px] font-extrabold" style={{ color: T.ink }}>
            {L.cta.title}
          </h2>
          <p className="mt-2.5 text-[12px]" style={{ color: T.ink }}>
            {L.cta.desc}
          </p>

          <button
            className="mt-5 mx-auto flex items-center gap-2 px-8 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: '#1c8a4e' }}
          >
            {L.cta.button}
            <Icon name={L.cta.icon} size={14} style={{ backgroundColor: '#ffffff' }} />
          </button>
        </section>
      </div>
    </div>
  );
}
