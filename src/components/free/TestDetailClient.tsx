'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Stars } from '@/components/free/FreeBits';
import { tones, toLatinNumber } from '@/data/free';
import {
  testTheme,
  testDetailTabs,
  testAskPanel,
  testLearningPath,
  type TestDetail,
  type TestDetailTab,
} from '@/data/tests';

/* ──────────────────────────────────────────────────────────────
   A single test. The page has one job — get a decision on whether
   to take it — so the green start button is the only saturated
   thing above the fold and everything else stays flat.
────────────────────────────────────────────────────────────── */

export default function TestDetailClient({ test }: { test: TestDetail }) {
  return (
    <div style={{ backgroundColor: testTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        <Hero test={test} />

        {/* RTL: the assistant column is first, so it lands on the right. */}
        <div className="grid lg:grid-cols-[340px_minmax(0,1fr)] gap-5 items-start">
          <AskPanel />
          <TabsPanel test={test} />
        </div>

        <Columns test={test} />
        <Articles test={test} />
        <PathBanner />
        <Feedback test={test} />
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */

function Hero({ test }: { test: TestDetail }) {
  const free = test.access === 'free';

  return (
    <section
      className="rounded-2xl border overflow-hidden grid md:grid-cols-[minmax(0,1fr)_300px]"
      style={{ borderColor: '#E2DCF9', background: 'linear-gradient(255deg,#EFEBFE 0%,#F8F6FF 60%,#FFFFFF 100%)' }}
    >
      <div className="order-1 px-6 py-8 text-right">
        <span
          className="inline-block text-[10.5px] font-bold px-2.5 py-1 rounded-md mb-4 text-white"
          style={{ backgroundColor: free ? '#16A34A' : testTheme.orange }}
        >
          {free ? 'رایگان' : 'ویژه'}
        </span>

        <h1
          className="text-[24px] sm:text-[31px] font-black leading-[1.5] mb-4"
          style={{ color: testTheme.navy }}
        >
          {test.title}
        </h1>
        <p className="text-[13px] text-gray-600 leading-9 mb-7">{test.tagline}</p>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 mb-7">
          {test.specs.map((s) => (
            <div key={s.label} className="text-center">
              <dt
                className="flex items-center justify-center gap-1.5 text-[11.5px] font-bold mb-2"
                style={{ color: testTheme.navy }}
              >
                <Icon name={s.icon} size={14} style={{ backgroundColor: testTheme.violet }} />
                <span>{s.label}</span>
              </dt>
              <dd className="text-[11.5px] text-gray-500">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/exams/tests/${test.id}/start`}
            data-ripple
            className="group flex items-center gap-2 rounded-xl px-9 py-3.5 text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: testTheme.green }}
          >
            <span>شروع تست</span>
            <Icon
              name="lucide:arrow-left"
              size={15}
              className="text-white transition-transform group-hover:-translate-x-1"
            />
          </Link>

          <Link
            href={`/exams/tests/${test.id}/result`}
            className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3.5 text-[13px] font-bold transition-colors hover:border-violet-300"
            style={{ borderColor: testTheme.border, color: testTheme.navy }}
          >
            <Icon name="lucide:file-chart-column" size={15} />
            <span>مشاهده نمونه گزارش</span>
          </Link>
        </div>
      </div>

      <div className="order-2 flex items-center justify-center p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={test.heroArt} alt="" className="w-full max-w-[280px]" />
      </div>
    </section>
  );
}

/* ── Tabs ───────────────────────────────────────────────────── */

function TabsPanel({ test }: { test: TestDetail }) {
  const [tab, setTab] = useState<TestDetailTab>('about');

  const lists: Record<Exclude<TestDetailTab, 'about'>, string[]> = {
    goal: test.goal,
    structure: test.structure,
    notes: test.notes,
    sample: test.sample,
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {testDetailTabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={on}
              className={`px-5 py-3.5 rounded-t-xl text-[12.5px] font-bold transition-all border-b-2 ${
                on ? 'bg-white' : 'bg-white/60 hover:bg-white'
              }`}
              style={{ color: on ? testTheme.violet : testTheme.navy, borderColor: on ? testTheme.violet : 'transparent' }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <section
        className="bg-white rounded-2xl border p-6 -mt-[2px]"
        style={{ borderColor: testTheme.border }}
      >
        {tab === 'about' ? (
          /* Numbered because the paragraphs are cumulative — each one
             builds on the last, and readers return to a specific point. */
          <ol className="space-y-4">
            {test.about.map((p, i) => (
              <li key={p} className="flex items-start gap-3">
                <span
                  className="text-[12px] font-black shrink-0 pt-1 tabular-nums"
                  style={{ color: testTheme.violet }}
                  dir="ltr"
                >
                  {i + 1}.
                </span>
                <p className="text-[12.5px] text-gray-600 leading-9 text-justify">{p}</p>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="space-y-3">
            {lists[tab].map((it) => (
              <li key={it} className="flex items-start gap-2.5">
                <Icon
                  name="lucide:circle-check"
                  size={15}
                  className="shrink-0 mt-1"
                  style={{ backgroundColor: testTheme.green }}
                />
                <span className="text-[12.5px] text-gray-600 leading-8 text-right">{it}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* ── Ask the assistant ──────────────────────────────────────── */

function AskPanel() {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-1 text-right">
          <h2 className="text-[14.5px] font-black mb-2" style={{ color: testTheme.navy }}>
            {testAskPanel.title}
          </h2>
          <p className="text-[11.5px] text-gray-600 leading-7">{testAskPanel.desc}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={testAskPanel.art} alt="" className="w-[53px] shrink-0" />
      </div>

      <span className="relative block mb-3">
        <input
          type="search"
          placeholder={testAskPanel.placeholder}
          aria-label={testAskPanel.placeholder}
          className="w-full border rounded-xl py-3 pr-4 pl-10 text-[11.5px] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          style={{ borderColor: testTheme.border }}
        />
        <Icon
          name="lucide:message-circle"
          size={15}
          className="text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </span>

      <button
        data-ripple
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#1D4ED8' }}
      >
        <Icon name="lucide:sparkles" size={15} className="text-white" />
        <span>{testAskPanel.cta}</span>
      </button>
    </section>
  );
}

/* ── Related resource columns ───────────────────────────────── */

function Columns({ test }: { test: TestDetail }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {test.columns.map((c) => {
        const tone = tones[c.tone];
        return (
          <section
            key={c.title}
            className="rounded-2xl border p-4 flex flex-col"
            style={{ backgroundColor: tone.soft, borderColor: tone.ring }}
          >
            <h2 className="flex items-center gap-2 mb-4">
              <Icon name={c.icon} size={17} style={{ backgroundColor: tone.text }} />
              <span className="text-[12.5px] font-black" style={{ color: tone.text }}>
                {c.title}
              </span>
            </h2>

            <ul className="space-y-2.5 mb-4">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <Icon name="lucide:user-round" size={13} className="shrink-0" style={{ backgroundColor: tone.text }} />
                  <span className="text-[11px] text-gray-600 leading-6 text-right">{it}</span>
                </li>
              ))}
            </ul>

            <Link
              href={c.href}
              className="mt-auto text-center text-[11.5px] font-bold py-2 transition-colors hover:opacity-80"
              style={{ color: tone.text }}
            >
              {c.cta}
            </Link>
          </section>
        );
      })}
    </div>
  );
}

/* ── Related articles ───────────────────────────────────────── */

function Articles({ test }: { test: TestDetail }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
      <h2 className="text-[15px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
        مقالات مرتبط
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {test.articles.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="group rounded-xl border overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ borderColor: testTheme.border }}
          >
            <span className="block aspect-[16/9] bg-gray-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.thumb}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </span>

            <span className="p-3 flex flex-col flex-1 text-right">
              <span
                className="block text-[12px] font-bold leading-7 mb-2 line-clamp-2 transition-colors group-hover:text-orange-500"
                style={{ color: testTheme.navy }}
              >
                {a.title}
              </span>
              <span className="mt-auto flex items-center gap-1 text-[9.5px] text-gray-400">
                <Icon name="lucide:calendar" size={10} />
                <span>تاریخ بروزرسانی: {a.date}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── Learning path ──────────────────────────────────────────── */

function PathBanner() {
  return (
    <section
      className="rounded-2xl border p-5 flex flex-col md:flex-row items-center gap-6"
      style={{ borderColor: '#DEDCF3', backgroundColor: '#F1EEFE' }}
    >
      <div className="flex-1 text-center md:text-right order-1">
        <h2 className="text-[17px] font-black mb-2" style={{ color: testTheme.violet }}>
          {testLearningPath.title}
        </h2>
        <p className="text-[12.5px] text-gray-500 leading-8">{testLearningPath.desc}</p>
      </div>

      <Link
        href={testLearningPath.href}
        data-ripple
        className="group order-3 md:order-2 flex items-center gap-2 rounded-xl px-6 py-3.5 text-[13px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#1D4ED8' }}
      >
        <Icon name="lucide:route" size={16} className="text-white" />
        <span>{testLearningPath.cta}</span>
        <Icon
          name="lucide:arrow-left"
          size={15}
          className="text-white transition-transform group-hover:-translate-x-1"
        />
      </Link>

      <div className="order-2 md:order-3 w-[80px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={testLearningPath.art} alt="" className="w-full" />
      </div>
    </section>
  );
}

/* ── Reviews and score ──────────────────────────────────────── */

function Feedback({ test }: { test: TestDetail }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
          آخرین نظرات کاربران
        </h2>
        <ul className="space-y-4">
          {test.reviews.map((r) => (
            <li key={r.name} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0" />
              <div className="flex-1 min-w-0 text-right">
                <p className="flex items-center gap-2 mb-1">
                  <span className="text-[12.5px] font-bold" style={{ color: testTheme.navy }}>
                    {r.name}
                  </span>
                  <Stars value={r.stars} size={11} />
                </p>
                <p className="text-[11px] text-gray-600 leading-7">{r.text}</p>
                <p className="text-[10px] text-gray-400 mt-1">{r.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="bg-white rounded-2xl border p-5 flex flex-col text-center"
        style={{ borderColor: testTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4" style={{ color: testTheme.navy }}>
          نظر شما درباره این آزمون چیست؟
        </h2>
        <input
          placeholder="تجربه یا نظر خود را ثبت کنید"
          aria-label="نظر شما"
          className="w-full border rounded-xl py-3 px-4 text-[11.5px] mb-4 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          style={{ borderColor: testTheme.border }}
        />
        <button
          className="mt-auto flex items-center justify-center gap-2 border rounded-xl py-3 text-[12.5px] font-bold transition-colors hover:bg-violet-50"
          style={{ color: testTheme.violet, borderColor: '#CDBEF5' }}
        >
          <Icon name="lucide:pencil-line" size={15} />
          <span>ثبت نظر</span>
        </button>
      </div>

      <div
        className="bg-white rounded-2xl border p-5 flex flex-col items-center justify-center text-center"
        style={{ borderColor: testTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4" style={{ color: testTheme.navy }}>
          امتیاز این آزمون
        </h2>
        <p className="text-[42px] font-black leading-none mb-3" style={{ color: testTheme.navy }}>
          {test.ratingScore}
        </p>
        <Stars value={toLatinNumber(test.ratingScore)} size={22} />
        <p className="text-[11.5px] text-gray-400 mt-3">از {test.ratingCount} رای نظر</p>
      </div>
    </section>
  );
}
