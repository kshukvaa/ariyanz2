'use client';

import React from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs } from '@/components/free/FreeBits';
import {
  testTheme,
  testsHero,
  testsRoutes,
  testsAiBand,
  testsHowItWorks,
  testsOrgCta,
  popularTests,
} from '@/data/tests';
import { popularQuestionnaires } from '@/data/questionnaires';

/* ──────────────────────────────────────────────────────────────
   /exams — the tests landing.

   The 3D instruments are the strongest thing in this world, so
   they carry the page: every card opens with one on a pale lilac
   ground, and the surrounding chrome stays flat and quiet.
────────────────────────────────────────────────────────────── */

export default function TestsLandingPage() {
  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: testTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={testsHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 overflow-hidden grid lg:grid-cols-2 items-center"
            style={{ background: 'linear-gradient(255deg,#EFEBFE 0%,#F7F5FF 55%,#FFFFFF 100%)' }}
          >
            <div className="order-1 px-6 sm:px-10 py-10 text-right">
              <h1
                className="text-[27px] sm:text-[38px] font-black leading-[1.5] mb-5"
                style={{ color: testTheme.navy }}
              >
                {testsHero.title}
              </h1>
              {testsHero.desc.map((line) => (
                <p key={line} className="text-[13.5px] text-gray-600 leading-9">
                  {line}
                </p>
              ))}

              <ul className="flex flex-wrap gap-2.5 mt-6 mb-7">
                {testsHero.chips.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-2 bg-white/80 border rounded-xl px-3.5 py-2.5 text-[11.5px] font-bold"
                    style={{ borderColor: testTheme.border, color: testTheme.navy }}
                  >
                    <Icon name={c.icon} size={15} style={{ backgroundColor: c.color }} />
                    <span>{c.label}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={testsHero.primary.href}
                  data-ripple
                  className="group flex items-center gap-2 rounded-xl px-7 py-3.5 text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: testTheme.orange }}
                >
                  <span>{testsHero.primary.label}</span>
                  <Icon
                    name="lucide:arrow-left"
                    size={15}
                    className="text-white transition-transform group-hover:-translate-x-1"
                  />
                </Link>

                <Link
                  href={testsHero.secondary.href}
                  className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3.5 text-[13px] font-bold transition-colors hover:border-violet-300"
                  style={{ borderColor: testTheme.border, color: testTheme.navy }}
                >
                  <Icon name="lucide:file-spreadsheet" size={15} />
                  <span>{testsHero.secondary.label}</span>
                </Link>
              </div>
            </div>

            <div className="order-2 h-full flex items-center justify-center p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={testsHero.art} alt="" className="w-full max-w-[360px] object-contain" />
            </div>
          </div>
        </section>

        {/* ── Three ways in ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid gap-5 md:grid-cols-3">
          {testsRoutes.map((r) => (
            <article
              key={r.id}
              className="bg-white rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
              style={{ borderColor: testTheme.border, borderTop: `3px solid ${r.accent}` }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-[17px] font-black" style={{ color: testTheme.navy }}>
                  {r.title}
                </h2>
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${r.accent}14` }}
                >
                  <Icon name={r.icon} size={22} style={{ backgroundColor: r.accent }} />
                </span>
              </div>

              <p className="text-[12.5px] text-gray-500 leading-8 mb-6 text-right">{r.desc}</p>

              <Link
                href={r.href}
                className="group mt-auto flex items-center justify-center gap-2 rounded-xl border py-3 text-[12.5px] font-bold transition-colors"
                style={{ color: r.accent, borderColor: `${r.accent}44` }}
              >
                <span>{r.cta}</span>
                <Icon
                  name="lucide:arrow-left"
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </Link>
            </article>
          ))}
        </section>

        {/* ── Find your test with the assistant ────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="rounded-3xl border p-6 grid lg:grid-cols-[280px_minmax(0,1fr)_260px] gap-6 items-center"
            style={{ borderColor: '#E2DCF9', backgroundColor: '#F6F4FE' }}
          >
            {/* Copy + art, first so it lands on the right */}
            <div className="order-1 text-right">
              <h2 className="text-[19px] font-black leading-9 mb-3" style={{ color: testTheme.navy }}>
                {testsAiBand.title}
                <br />
                <span style={{ color: testTheme.violet }}>{testsAiBand.titleAccent}</span>
              </h2>
              {testsAiBand.desc.map((l) => (
                <p key={l} className="text-[12px] text-gray-600 leading-8">
                  {l}
                </p>
              ))}
              {/* Capped at the artwork's own resolution so it stays crisp. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={testsAiBand.art} alt="" className="w-[105px] mt-4 mr-auto" />
            </div>

            {/* The exchange itself — the one piece of motion-free proof */}
            <div className="order-2 flex items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={testsAiBand.robot} alt="" className="w-[41px] shrink-0 hidden sm:block" />

              <div className="flex-1 min-w-0 space-y-3">
                <p
                  className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 text-[11.5px] leading-7"
                  style={{ color: testTheme.navy }}
                >
                  <Icon name="lucide:user-round" size={14} className="shrink-0 text-gray-400" />
                  <span>{testsAiBand.ask}</span>
                </p>

                <div className="bg-white rounded-xl px-4 py-3.5 border" style={{ borderColor: '#E7E2FB' }}>
                  <p className="text-[11.5px] text-gray-500 mb-2.5">{testsAiBand.answerLead}</p>
                  <ul className="space-y-2">
                    {testsAiBand.answers.map((a) => (
                      <li key={a} className="flex items-center gap-2">
                        <Icon
                          name="lucide:circle-check"
                          size={14}
                          className="shrink-0"
                          style={{ backgroundColor: testTheme.violet }}
                        />
                        <span className="text-[11.5px]" style={{ color: testTheme.navy }}>
                          {a}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ul className="order-3 space-y-3">
              {testsAiBand.points.map((p) => (
                <li key={p.title} className="flex items-center gap-3 bg-white rounded-xl px-3.5 py-3">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${p.color}14` }}
                  >
                    <Icon name={p.icon} size={17} style={{ backgroundColor: p.color }} />
                  </span>
                  <span className="flex-1 text-right">
                    <span className="block text-[12px] font-bold" style={{ color: testTheme.navy }}>
                      {p.title}
                    </span>
                    <span className="block text-[10.5px] text-gray-500 mt-0.5">{p.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Popular tests ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/exams/tests"
              className="group flex items-center gap-1.5 text-[12.5px] font-bold transition-colors hover:text-orange-500"
              style={{ color: testTheme.violet }}
            >
              <span>مشاهده همه آزمون‌ها</span>
              <Icon name="lucide:arrow-left" size={14} className="transition-transform group-hover:-translate-x-1" />
            </Link>

            <h2 className="text-[17px] font-black" style={{ color: testTheme.navy }}>
              محبوب ترین آزمون‌های آریاز
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {popularTests.map((t) => (
              <article
                key={t.id}
                data-tilt
                className="bg-white rounded-2xl border p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
                style={{ borderColor: testTheme.border }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1 text-right">
                    <h3 className="text-[14px] font-black mb-1.5" style={{ color: testTheme.navy }}>
                      {t.title}
                    </h3>
                    <p className="text-[11.5px] text-gray-500 leading-7">{t.desc}</p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.icon} alt="" loading="lazy" className="w-[64px] shrink-0" />
                </div>

                <dl className="space-y-2 mb-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Icon name="lucide:clock" size={13} className="text-gray-400" />
                    <dt>مدت زمان:</dt>
                    <dd>{toPersian(t.minutes)} دقیقه</dd>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Icon name="lucide:circle-help" size={13} className="text-gray-400" />
                    <dt>تعداد سوال:</dt>
                    <dd>{toPersian(t.questions)} سوال</dd>
                  </div>
                </dl>

                <Link
                  href={`/exams/tests/${t.id}`}
                  className="group mt-auto flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-bold transition-colors"
                  style={{ color: testTheme.violet, borderColor: '#CDBEF5' }}
                >
                  <span>شروع آزمون</span>
                  <Icon name="lucide:arrow-left" size={13} className="transition-transform group-hover:-translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ── Popular questionnaires ───────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/exams/questionnaires"
              className="group flex items-center gap-1.5 text-[12.5px] font-bold transition-colors hover:text-orange-500"
              style={{ color: testTheme.violet }}
            >
              <span>مشاهده همه پرسشنامه‌ها</span>
              <Icon name="lucide:arrow-left" size={14} className="transition-transform group-hover:-translate-x-1" />
            </Link>

            <h2 className="text-[17px] font-black" style={{ color: testTheme.navy }}>
              محبوب ترین پرسشنامه‌ها
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {popularQuestionnaires.map((q) => (
              <article
                key={q.id}
                data-tilt
                className="bg-white rounded-2xl border p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
                style={{ borderColor: testTheme.border }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1 text-right">
                    <h3 className="text-[14px] font-black mb-1.5" style={{ color: testTheme.navy }}>
                      {q.title}
                    </h3>
                    <p className="text-[11.5px] text-gray-500 leading-7">{q.desc}</p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.icon} alt="" loading="lazy" className="w-[64px] shrink-0" />
                </div>

                <dl className="space-y-2 mb-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Icon name="lucide:circle-help" size={13} className="text-gray-400" />
                    <dt>تعداد سوال:</dt>
                    <dd>{toPersian(q.questions)} سوال</dd>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Icon name="lucide:file-text" size={13} className="text-gray-400" />
                    <dt>فرمت:</dt>
                    <dd>{q.format}</dd>
                  </div>
                </dl>

                <Link
                  href={`/exams/questionnaires/${q.id}`}
                  className="group mt-auto flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-bold transition-colors"
                  style={{ color: testTheme.violet, borderColor: '#CDBEF5' }}
                >
                  <Icon name="lucide:download" size={13} />
                  <span>دانلود پرسشنامه</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ── How it works — a real sequence, so it is numbered ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
          <h2 className="text-[17px] font-black text-right mb-8" style={{ color: testTheme.navy }}>
            چطور کار می‌کند؟
          </h2>

          <ol className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 relative">
            {testsHowItWorks.map((s, i) => (
              <li key={s.n} className="relative text-center">
                {/* The dashed run continues to the next step, RTL leftwards */}
                {i < testsHowItWorks.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden xl:block absolute top-[34px] left-0 -translate-x-1/2 w-[calc(100%-70px)] border-t border-dashed"
                    style={{ borderColor: '#D9D3F4' }}
                  />
                )}

                <span
                  className="relative z-10 w-[68px] h-[68px] rounded-full mx-auto mb-4 flex items-center justify-center text-[24px] font-black"
                  style={{ backgroundColor: '#EDE8FD', color: testTheme.violet }}
                >
                  {toPersian(s.n)}
                  <span
                    className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-white border flex items-center justify-center"
                    style={{ borderColor: '#E2DCF9' }}
                  >
                    <Icon name={s.icon} size={13} style={{ backgroundColor: testTheme.violet }} />
                  </span>
                </span>

                <h3 className="text-[13.5px] font-black mb-1.5" style={{ color: testTheme.navy }}>
                  {s.title}
                </h3>
                <p className="text-[11.5px] text-gray-500 leading-7">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Organisation CTA ─────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div
            className="rounded-3xl border px-6 py-7 flex flex-col lg:flex-row items-center gap-6"
            style={{ borderColor: '#E2DCF9', backgroundColor: '#F1EEFE' }}
          >
            <div className="flex-1 text-center lg:text-right order-1">
              <h2 className="text-[20px] font-black mb-3" style={{ color: testTheme.navy }}>
                {testsOrgCta.title}
              </h2>
              {testsOrgCta.desc.map((l) => (
                <p key={l} className="text-[12.5px] text-gray-600 leading-8">
                  {l}
                </p>
              ))}
            </div>

            <Link
              href={testsOrgCta.href}
              data-ripple
              className="group order-3 lg:order-2 flex items-center gap-2 rounded-xl px-7 py-3.5 text-[13.5px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
              style={{ backgroundColor: testTheme.orange }}
            >
              <span>{testsOrgCta.cta}</span>
              <Icon
                name="lucide:arrow-left"
                size={15}
                className="text-white transition-transform group-hover:-translate-x-1"
              />
            </Link>

            <div className="order-2 lg:order-3 w-[97px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={testsOrgCta.art} alt="" className="w-full" />
            </div>
          </div>
        </section>
      </div>
    </SharedPageLayout>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
