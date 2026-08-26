'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs } from '@/components/free/FreeBits';
import { tones } from '@/data/free';
import {
  testTheme,
  testArchiveHero,
  testAiBanner,
  testTabs,
  testSorts,
  testFacets,
  tests,
  testsTotal,
  testSearchLabel,
  type Test,
  type TestTab,
} from '@/data/tests';

/* ──────────────────────────────────────────────────────────────
   /exams/tests — the catalogue.

   Filters are single-choice radios, because people arrive with one
   question ("which test fits my goal?"), not a shopping list.
────────────────────────────────────────────────────────────── */

export default function TestArchivePage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<TestTab>('all');
  const [sort, setSort] = useState(testSorts[0].id);
  const [picked, setPicked] = useState<Record<string, string | null>>({});
  const [open, setOpen] = useState<string[]>(testFacets.map((f) => f.id));

  const results = useMemo(() => {
    const q = query.trim();
    const list = tests.filter((t) => {
      const byQuery = !q || t.title.includes(q) || t.desc.includes(q) || t.category.includes(q);
      const byTab =
        tab === 'all' || tab === 'popular' ? true : tab === 'free' ? t.access === 'free' : t.access === 'premium';
      const byTopic = !picked.topic || t.topicId === picked.topic;
      const byGoal = !picked.goal || t.goalId === picked.goal;
      const byTime = !picked.time || t.timeId === picked.time;
      const byAudience = !picked.audience || t.audienceId === picked.audience;
      return byQuery && byTab && byTopic && byGoal && byTime && byAudience;
    });

    const sorted = [...list];
    if (sort === 'rating' || tab === 'popular') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [query, tab, sort, picked]);

  const pick = (facet: string, item: string) =>
    setPicked((p) => ({ ...p, [facet]: p[facet] === item ? null : item }));

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: testTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={testArchiveHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 overflow-hidden grid lg:grid-cols-2 items-center"
            style={{ background: 'linear-gradient(255deg,#EFEBFE 0%,#F7F5FF 55%,#FFFFFF 100%)' }}
          >
            <div className="order-1 px-6 sm:px-10 py-10 text-right">
              <h1
                className="text-[27px] sm:text-[38px] font-black leading-[1.5] mb-5"
                style={{ color: testTheme.navy }}
              >
                {testArchiveHero.title}
              </h1>
              {testArchiveHero.desc.map((line) => (
                <p key={line} className="text-[13.5px] text-gray-600 leading-9">
                  {line}
                </p>
              ))}

              <ul className="flex flex-wrap gap-2.5 mt-6 mb-7">
                {[
                  { label: '۵۰+ آزمون تخصصی', icon: 'lucide:clipboard-list', color: testTheme.orange },
                  { label: 'تحلیل هوشمند نتایج', icon: 'lucide:chart-no-axes-combined', color: '#3B4FD8' },
                  { label: 'مناسب فردی', icon: 'lucide:user-round', color: testTheme.green },
                ].map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-2 bg-white border rounded-xl px-3.5 py-2.5 text-[11.5px] font-bold"
                    style={{ borderColor: testTheme.border, color: testTheme.navy }}
                  >
                    <Icon name={c.icon} size={15} style={{ backgroundColor: c.color }} />
                    <span>{c.label}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <a
                  href={testArchiveHero.primary.href}
                  data-ripple
                  className="group flex items-center gap-2 rounded-xl px-7 py-3.5 text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: testTheme.orange }}
                >
                  <span>{testArchiveHero.primary.label}</span>
                  <Icon
                    name="lucide:arrow-left"
                    size={15}
                    className="text-white transition-transform group-hover:-translate-x-1"
                  />
                </a>

                <Link
                  href={testArchiveHero.secondary.href}
                  className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3.5 text-[13px] font-bold transition-colors hover:border-violet-300"
                  style={{ borderColor: testTheme.border, color: testTheme.navy }}
                >
                  <Icon name="lucide:file-spreadsheet" size={15} />
                  <span>{testArchiveHero.secondary.label}</span>
                </Link>
              </div>
            </div>

            <div className="order-2 h-full flex items-center justify-center p-6">
              {/* Capped at the artwork's own resolution so it stays crisp. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={testArchiveHero.art} alt="" className="w-full max-w-[413px] object-contain" />
            </div>
          </div>
        </section>

        <div
          id="results"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-6 items-start"
        >
          {/* Results column */}
          <div className="order-1 lg:order-2">
            {/* Assistant nudge */}
            <div
              className="rounded-2xl border p-4 mb-6 flex flex-col sm:flex-row items-center gap-4"
              style={{ borderColor: '#E2DCF9', backgroundColor: '#F6F4FE' }}
            >
              <div className="flex-1 text-center sm:text-right order-2 sm:order-1">
                <h2 className="text-[14.5px] font-black mb-1" style={{ color: testTheme.navy }}>
                  {testAiBanner.title}
                </h2>
                <p className="text-[12px] text-gray-600 leading-7">{testAiBanner.desc}</p>
              </div>

              <button
                data-ripple
                className="group order-3 sm:order-2 flex items-center gap-2 rounded-xl px-5 py-3 text-[12.5px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
                style={{ backgroundColor: testTheme.violet }}
              >
                <Icon name="lucide:sparkles" size={15} className="text-white" />
                <span>{testAiBanner.cta}</span>
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={testAiBanner.robot} alt="" className="order-1 sm:order-3 w-[41px] shrink-0" />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                {testTabs.map((t) => {
                  const on = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-[12.5px] font-bold border transition-all"
                      style={
                        on
                          ? { backgroundColor: '#F3F0FF', borderColor: testTheme.violet, color: testTheme.violet }
                          : { backgroundColor: '#fff', borderColor: testTheme.border, color: testTheme.navy }
                      }
                    >
                      <Icon
                        name={t.icon}
                        size={14}
                        style={{ backgroundColor: on ? testTheme.violet : t.id === 'free' ? testTheme.green : '#9AA3B8' }}
                      />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder={testSearchLabel}
                  aria-label={testSearchLabel}
                  className="w-full bg-white border rounded-xl py-3 pr-5 pl-11 text-[12.5px] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  style={{ borderColor: testTheme.border }}
                />
                <Icon
                  name="lucide:search"
                  size={17}
                  className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>

            {/* RTL: the count reads first on the right, the sort control sits left. */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <p className="text-[12px] text-gray-500">
                نمایش ۱ تا {toPersian(results.length)} از {testsTotal} آزمون
              </p>

              <span
                className="relative bg-white border rounded-xl flex items-center gap-2 px-3.5"
                style={{ borderColor: testTheme.border }}
              >
                <Icon name="lucide:chevron-down" size={14} className="text-gray-400 shrink-0" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="مرتب‌سازی"
                  className="bg-transparent py-2.5 text-[11.5px] font-bold focus:outline-none appearance-none cursor-pointer"
                  style={{ color: testTheme.navy }}
                >
                  {testSorts.map((s) => (
                    <option key={s.id} value={s.id}>
                      مرتب‌سازی: {s.label}
                    </option>
                  ))}
                </select>
                <Icon name="lucide:arrow-down-up" size={14} className="shrink-0" style={{ backgroundColor: testTheme.violet }} />
              </span>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {results.map((t) => (
                  <TestCard key={t.id} test={t} />
                ))}
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl border py-20 text-center"
                style={{ borderColor: testTheme.border }}
              >
                <Icon name="lucide:clipboard-list" size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="font-bold text-gray-600 mb-1">آزمونی یافت نشد</h3>
                <p className="text-[13px] text-gray-400">فیلترها یا عبارت جستجو را تغییر دهید</p>
              </div>
            )}

            <Pager />
          </div>

          {/* Filters */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-28">
            <div
              className="bg-white rounded-2xl border p-4"
              style={{ borderColor: testTheme.border }}
            >
              <h2 className="flex items-center gap-2 pb-4 mb-2 border-b" style={{ borderColor: testTheme.border }}>
                <Icon name="lucide:chevron-down" size={14} className="text-gray-400" />
                <span className="flex-1 text-right text-[13.5px] font-black" style={{ color: testTheme.navy }}>
                  فیلترها
                </span>
                <Icon name="lucide:sliders-horizontal" size={16} style={{ backgroundColor: testTheme.violet }} />
              </h2>

              <div className="space-y-4">
                {testFacets.map((f) => {
                  const isOpen = open.includes(f.id);
                  return (
                    <section key={f.id}>
                      <button
                        onClick={() =>
                          setOpen((o) => (o.includes(f.id) ? o.filter((x) => x !== f.id) : [...o, f.id]))
                        }
                        aria-expanded={isOpen}
                        className="w-full flex items-center gap-2 py-2"
                      >
                        <Icon
                          name="lucide:chevron-down"
                          size={14}
                          className={`text-gray-400 shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`}
                        />
                        <span className="flex-1 text-right text-[13px] font-black" style={{ color: testTheme.navy }}>
                          {f.title}
                        </span>
                      </button>

                      {isOpen && (
                        <ul>
                          {f.items.map((it) => {
                            const on = picked[f.id] === it.id;
                            return (
                              <li key={it.id}>
                                <button
                                  onClick={() => pick(f.id, it.id)}
                                  aria-pressed={on}
                                  className="w-full flex items-center gap-2.5 py-2.5 px-1 rounded-lg transition-colors hover:bg-gray-50"
                                >
                                  <span
                                    className="w-[15px] h-[15px] rounded-full border shrink-0 flex items-center justify-center"
                                    style={{ borderColor: on ? testTheme.violet : '#D5D8E6' }}
                                  >
                                    {on && (
                                      <span
                                        className="w-[7px] h-[7px] rounded-full"
                                        style={{ backgroundColor: testTheme.violet }}
                                      />
                                    )}
                                  </span>
                                  <span
                                    className="flex-1 text-right text-[12.5px]"
                                    style={{ color: on ? testTheme.violet : '#4B5568' }}
                                  >
                                    {it.label}
                                  </span>
                                  <Icon name="lucide:chevron-left" size={13} className="text-gray-300 shrink-0" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </section>
                  );
                })}
              </div>

              <button
                onClick={() => setPicked({})}
                className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl border py-3 text-[12.5px] font-bold transition-colors hover:bg-gray-50"
                style={{ borderColor: testTheme.border, color: testTheme.navy }}
              >
                <Icon name="lucide:undo-2" size={14} />
                <span>پاک کردن فیلترها</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </SharedPageLayout>
  );
}

/* ── Card ───────────────────────────────────────────────────── */

function TestCard({ test }: { test: Test }) {
  const tone = tones[test.categoryTone];

  return (
    <article
      data-tilt
      className="group bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
      style={{ borderColor: testTheme.border }}
    >
      <div className="relative p-4" style={{ backgroundColor: '#F5F2FE' }}>
        {test.access === 'premium' && (
          <span
            className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md text-white"
            style={{ backgroundColor: testTheme.orange }}
          >
            <Icon name="lucide:star" size={10} className="text-white" />
            <span>ویژه</span>
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={test.icon}
          alt=""
          loading="lazy"
          className="w-[104px] h-[104px] object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span
          className="self-start text-[10.5px] font-bold px-2.5 py-1 rounded-md mb-3"
          style={{ color: tone.text, backgroundColor: tone.bg }}
        >
          {test.category}
        </span>

        <h3 className="text-[13.5px] font-black leading-7 mb-2 text-right">
          <Link
            href={`/exams/tests/${test.id}`}
            className="transition-colors group-hover:text-orange-500"
            style={{ color: testTheme.navy }}
          >
            {test.title}
          </Link>
        </h3>

        <p className="text-[11px] text-gray-500 leading-7 mb-4 text-right">{test.desc}</p>

        <div className="flex items-center justify-between text-[10.5px] text-gray-500 mb-2.5">
          <span className="flex items-center gap-1">
            <Icon name="lucide:circle-help" size={12} className="text-gray-400" />
            <span>{toPersian(test.questions)} سوال</span>
          </span>
          <span className="flex items-center gap-1">
            <Icon name="lucide:clock" size={12} className="text-gray-400" />
            <span>{toPersian(test.minutes)} دقیقه</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-[10.5px] text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Icon name="lucide:users-round" size={12} className="text-gray-400" />
            <span>{test.takers} نفر</span>
          </span>
          <span className="flex items-center gap-1 font-bold" style={{ color: testTheme.navy }}>
            <Icon name="lucide:star" size={12} style={{ backgroundColor: '#F5A524' }} />
            <span dir="ltr">{test.rating}</span>
          </span>
        </div>

        <Link
          href={`/exams/tests/${test.id}`}
          className="group/cta mt-auto flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-bold transition-colors"
          style={{ color: testTheme.violet, borderColor: '#CDBEF5' }}
        >
          <span>شروع آزمون</span>
          <Icon
            name="lucide:arrow-left"
            size={13}
            className="transition-transform group-hover/cta:-translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

/** The mockups draw pagination left-to-right, so the nav opts out of RTL. */
function Pager() {
  const cell =
    'w-10 h-10 flex items-center justify-center rounded-xl border text-[13px] font-bold transition-colors';
  return (
    <nav dir="ltr" className="flex items-center justify-center gap-2 mt-8 flex-wrap" aria-label="صفحه‌بندی">
      <button
        aria-label="صفحه قبل"
        className={`${cell} bg-white hover:border-violet-300`}
        style={{ borderColor: testTheme.border }}
      >
        <Icon name="lucide:chevron-left" size={16} style={{ backgroundColor: testTheme.navy }} />
      </button>

      {['1', '2', '3', '4', '5', '…', '10'].map((n, i) =>
        n === '…' ? (
          <span key="gap" className="w-8 text-center text-gray-400">
            …
          </span>
        ) : (
          <button
            key={n}
            aria-current={i === 0 ? 'page' : undefined}
            className={cell}
            style={
              i === 0
                ? { backgroundColor: testTheme.violet, borderColor: testTheme.violet, color: '#fff' }
                : { backgroundColor: '#fff', borderColor: testTheme.border, color: testTheme.navy }
            }
          >
            {n}
          </button>
        )
      )}

      <button
        aria-label="صفحه بعد"
        className={`${cell} bg-white hover:border-violet-300`}
        style={{ borderColor: testTheme.border }}
      >
        <Icon name="lucide:chevron-right" size={16} style={{ backgroundColor: testTheme.navy }} />
      </button>
    </nav>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
