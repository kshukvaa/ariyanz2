'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs } from '@/components/free/FreeBits';
import { tones } from '@/data/free';
import { testTheme } from '@/data/tests';
import {
  questHero,
  questUses,
  questTabs,
  questSorts,
  questFacets,
  questionnaires,
  questTotal,
  questSearchLabel,
  questAiBand,
  questBottomCta,
  type Questionnaire,
  type QuestTab,
} from '@/data/questionnaires';

/* ──────────────────────────────────────────────────────────────
   /exams/questionnaires — the library.

   A questionnaire is a file you take away and administer, so each
   card answers a researcher's first four questions: how many items,
   which file, how long it takes, how many people already use it.
────────────────────────────────────────────────────────────── */

export default function QuestionnaireArchivePage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<QuestTab>('all');
  const [sort, setSort] = useState(questSorts[0].id);
  const [picked, setPicked] = useState<Record<string, string | null>>({});
  const [open, setOpen] = useState<string[]>(['topic', 'file', 'usage']);
  const [openGroup, setOpenGroup] = useState<string | null>('hr');

  const results = useMemo(() => {
    const q = query.trim();
    const list = questionnaires.filter((item) => {
      const byQuery = !q || item.title.includes(q) || item.desc.includes(q) || item.category.includes(q);
      const byTab = tab === 'all' ? true : tab === 'free' ? item.access === 'free' : item.access === 'premium';
      const byTopic = !picked.topic || item.topicId === picked.topic;
      const byFile = !picked.file || item.fileId === picked.file;
      const byUsage = !picked.usage || item.usageId === picked.usage;
      return byQuery && byTab && byTopic && byFile && byUsage;
    });

    const sorted = [...list];
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [query, tab, sort, picked]);

  const pick = (facet: string, item: string) =>
    setPicked((p) => ({ ...p, [facet]: p[facet] === item ? null : item }));

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: testTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={questHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 overflow-hidden grid lg:grid-cols-2 items-center"
            style={{ background: 'linear-gradient(255deg,#EFEBFE 0%,#F7F5FF 55%,#FFFFFF 100%)' }}
          >
            <div className="order-1 px-6 sm:px-10 py-10 text-right">
              <h1
                className="text-[25px] sm:text-[34px] font-black leading-[1.5] mb-5"
                style={{ color: testTheme.navy }}
              >
                {questHero.title}
              </h1>
              {questHero.desc.map((line) => (
                <p key={line} className="text-[13.5px] text-gray-600 leading-9">
                  {line}
                </p>
              ))}

              <ul className="flex flex-wrap gap-2.5 mt-6 mb-7">
                {questHero.chips.map((c) => (
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
                  href={questHero.primary.href}
                  data-ripple
                  className="group flex items-center gap-2 rounded-xl px-7 py-3.5 text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: testTheme.orange }}
                >
                  <span>{questHero.primary.label}</span>
                  <Icon
                    name="lucide:arrow-left"
                    size={15}
                    className="text-white transition-transform group-hover:-translate-x-1"
                  />
                </a>

                <a
                  href={questHero.secondary.href}
                  className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3.5 text-[13px] font-bold transition-colors hover:border-violet-300"
                  style={{ borderColor: testTheme.border, color: testTheme.navy }}
                >
                  <Icon name="lucide:download" size={15} />
                  <span>{questHero.secondary.label}</span>
                </a>
              </div>
            </div>

            <div className="order-2 h-full flex items-center justify-center p-6">
              {/* Capped at the artwork's own resolution so it stays crisp. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={questHero.art} alt="" className="w-full max-w-[395px] object-contain" />
            </div>
          </div>
        </section>

        <div
          id="results"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-6 items-start"
        >
          <div className="order-1 lg:order-2">
            {/* What they are for */}
            <section
              className="rounded-2xl border p-5 mb-6"
              style={{ borderColor: '#E2DCF9', backgroundColor: '#F7F5FE' }}
            >
              <h2 className="text-[15px] font-black text-center mb-5" style={{ color: testTheme.navy }}>
                {questUses.title}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {questUses.items.map((u) => (
                  <article key={u.title} className="bg-white rounded-xl px-4 py-4 text-center">
                    <span
                      className="w-11 h-11 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: `${u.color}14` }}
                    >
                      <Icon name={u.icon} size={20} style={{ backgroundColor: u.color }} />
                    </span>
                    <h3 className="text-[12.5px] font-black mb-1.5" style={{ color: testTheme.navy }}>
                      {u.title}
                    </h3>
                    <p className="text-[10.5px] text-gray-500 leading-6">{u.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                {questTabs.map((t) => {
                  const on = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-[12.5px] font-bold border transition-all"
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
                  placeholder={questSearchLabel}
                  aria-label={questSearchLabel}
                  className="w-full bg-white border rounded-xl py-3 pr-5 pl-11 text-[12.5px] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  style={{ borderColor: testTheme.border }}
                />
                <Icon
                  name="lucide:search"
                  size={17}
                  className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>

              <span
                className="relative bg-white border rounded-xl flex items-center gap-2 px-3.5 shrink-0"
                style={{ borderColor: testTheme.border }}
              >
                <Icon name="lucide:chevron-down" size={14} className="text-gray-400 shrink-0" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="مرتب‌سازی"
                  className="bg-transparent py-3 text-[11.5px] font-bold focus:outline-none appearance-none cursor-pointer"
                  style={{ color: testTheme.navy }}
                >
                  {questSorts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <Icon name="lucide:arrow-down-up" size={14} className="shrink-0" style={{ backgroundColor: testTheme.violet }} />
              </span>
            </div>

            <p className="text-[12px] text-gray-500 mb-5">
              نمایش ۱ تا {toPersian(results.length)} از {questTotal} پرسشنامه
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {results.map((q) => (
                  <QuestCard key={q.id} quest={q} />
                ))}
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl border py-20 text-center"
                style={{ borderColor: testTheme.border }}
              >
                <Icon name="lucide:clipboard-list" size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="font-bold text-gray-600 mb-1">پرسشنامه‌ای یافت نشد</h3>
                <p className="text-[13px] text-gray-400">فیلترها یا عبارت جستجو را تغییر دهید</p>
              </div>
            )}

            <Pager />
          </div>

          {/* Filters */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border p-4" style={{ borderColor: testTheme.border }}>
              <h2 className="flex items-center gap-2 pb-4 mb-2 border-b" style={{ borderColor: testTheme.border }}>
                <Icon name="lucide:chevron-down" size={14} className="text-gray-400" />
                <span className="flex-1 text-right text-[13.5px] font-black" style={{ color: testTheme.navy }}>
                  فیلترها
                </span>
                <Icon name="lucide:sliders-horizontal" size={16} style={{ backgroundColor: testTheme.violet }} />
              </h2>

              <div className="space-y-4">
                {questFacets.map((f) => {
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
                            const groupOpen = openGroup === it.id;
                            return (
                              <li key={it.id}>
                                <button
                                  onClick={() =>
                                    it.children
                                      ? setOpenGroup(groupOpen ? null : it.id)
                                      : pick(f.id, it.id)
                                  }
                                  aria-pressed={it.children ? undefined : on}
                                  aria-expanded={it.children ? groupOpen : undefined}
                                  className="w-full flex items-center gap-2.5 py-2.5 px-1 rounded-lg transition-colors hover:bg-gray-50"
                                >
                                  <span
                                    className="w-[15px] h-[15px] rounded-full border shrink-0 flex items-center justify-center"
                                    style={{ borderColor: on || groupOpen ? testTheme.violet : '#D5D8E6' }}
                                  >
                                    {(on || groupOpen) && (
                                      <span
                                        className="w-[7px] h-[7px] rounded-full"
                                        style={{ backgroundColor: testTheme.violet }}
                                      />
                                    )}
                                  </span>
                                  <span
                                    className="flex-1 text-right text-[12.5px] font-bold"
                                    style={{ color: on || groupOpen ? testTheme.violet : '#4B5568' }}
                                  >
                                    {it.label}
                                  </span>
                                  {it.children && (
                                    <Icon
                                      name="lucide:chevron-down"
                                      size={13}
                                      className={`text-gray-400 shrink-0 transition-transform ${
                                        groupOpen ? '' : '-rotate-90'
                                      }`}
                                    />
                                  )}
                                </button>

                                {it.children && groupOpen && (
                                  <ul className="pr-5">
                                    {it.children.map((c) => {
                                      const childOn = picked[f.id] === c.id;
                                      return (
                                        <li key={c.id}>
                                          <button
                                            onClick={() => pick(f.id, c.id)}
                                            aria-pressed={childOn}
                                            className="w-full flex items-center gap-2.5 py-2 px-1 rounded-lg transition-colors hover:bg-gray-50"
                                          >
                                            <span
                                              className="w-[14px] h-[14px] rounded border shrink-0 flex items-center justify-center"
                                              style={{
                                                borderColor: childOn ? testTheme.violet : '#D5D8E6',
                                                backgroundColor: childOn ? testTheme.violet : '#fff',
                                              }}
                                            >
                                              {childOn && <Icon name="lucide:check" size={10} className="text-white" />}
                                            </span>
                                            <span
                                              className="flex-1 text-right text-[12px]"
                                              style={{ color: childOn ? testTheme.violet : '#6B7280' }}
                                            >
                                              {c.label}
                                            </span>
                                          </button>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
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

        {/* ── Assistant band ───────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
          <div
            className="rounded-3xl border p-6 grid lg:grid-cols-[280px_minmax(0,1fr)_260px] gap-6 items-center"
            style={{ borderColor: '#E2DCF9', backgroundColor: '#F6F4FE' }}
          >
            <div className="order-1 text-right">
              <h2 className="text-[18px] font-black leading-9 mb-3" style={{ color: testTheme.navy }}>
                {questAiBand.title}
              </h2>
              <p className="text-[12px] text-gray-600 leading-8">{questAiBand.desc}</p>
            </div>

            <div className="order-2 flex items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={questAiBand.robot} alt="" className="w-[76px] shrink-0 hidden sm:block" />

              <div className="flex-1 min-w-0 space-y-3">
                <p
                  className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 text-[11.5px] leading-7"
                  style={{ color: testTheme.navy }}
                >
                  <Icon name="lucide:user-round" size={14} className="shrink-0 text-gray-400" />
                  <span>{questAiBand.ask}</span>
                </p>

                <div className="bg-white rounded-xl px-4 py-3.5 border" style={{ borderColor: '#E7E2FB' }}>
                  <p className="text-[11.5px] text-gray-500 mb-2.5">{questAiBand.answerLead}</p>
                  <ul className="space-y-2">
                    {questAiBand.answers.map((a) => (
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
              {questAiBand.points.map((p) => (
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

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div
            className="rounded-3xl border px-6 py-7 flex flex-col lg:flex-row items-center gap-6"
            style={{ borderColor: '#E2DCF9', backgroundColor: '#F1EEFE' }}
          >
            <div className="flex-1 text-center lg:text-right order-1">
              <h2 className="text-[20px] font-black mb-3" style={{ color: testTheme.navy }}>
                {questBottomCta.title}
              </h2>
              <p className="text-[12.5px] text-gray-600 leading-8">{questBottomCta.desc}</p>
            </div>

            <a
              href={questBottomCta.href}
              data-ripple
              className="group order-2 flex items-center gap-2 rounded-xl px-7 py-3.5 text-[13.5px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
              style={{ backgroundColor: testTheme.orange }}
            >
              <span>{questBottomCta.cta}</span>
              <Icon
                name="lucide:arrow-left"
                size={15}
                className="text-white transition-transform group-hover:-translate-x-1"
              />
            </a>

            {/* The artwork closes the band on the left, as drawn. */}
            <div className="order-3 w-[97px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={questBottomCta.art} alt="" className="w-full" />
            </div>
          </div>
        </section>
      </div>
    </SharedPageLayout>
  );
}

/* ── Card ───────────────────────────────────────────────────── */

function QuestCard({ quest }: { quest: Questionnaire }) {
  const tone = tones[quest.categoryTone];

  return (
    <article
      data-tilt
      className="group bg-white rounded-2xl border p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
      style={{ borderColor: testTheme.border }}
    >
      {/* RTL: the category reads first on the right, the instrument sits left. */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-md"
          style={{ color: tone.text, backgroundColor: tone.bg }}
        >
          {quest.category}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={quest.icon} alt="" loading="lazy" className="w-[64px] shrink-0" />
      </div>

      <h3 className="text-[13px] font-black leading-7 mb-2 text-right">
        <Link
          href={`/exams/questionnaires/${quest.id}`}
          className="transition-colors group-hover:text-orange-500"
          style={{ color: testTheme.navy }}
        >
          {quest.title}
        </Link>
      </h3>

      <p className="text-[11px] text-gray-500 leading-7 mb-4 text-right">{quest.desc}</p>

      <div className="flex items-center justify-between text-[10.5px] text-gray-500 mb-2.5">
        <span className="flex items-center gap-1">
          <Icon name="lucide:file-text" size={12} className="text-gray-400" />
          <span>{quest.formats}</span>
        </span>
        <span className="flex items-center gap-1">
          <Icon name="lucide:circle-help" size={12} className="text-gray-400" />
          <span>{toPersian(quest.questions)} سوال</span>
        </span>
      </div>

      <div className="flex items-center justify-between text-[10.5px] text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <Icon name="lucide:download" size={12} className="text-gray-400" />
          <span>{quest.downloads} دانلود</span>
        </span>
        <span className="flex items-center gap-1 font-bold" style={{ color: testTheme.navy }}>
          <Icon name="lucide:star" size={12} style={{ backgroundColor: '#F5A524' }} />
          <span dir="ltr">{quest.rating}</span>
        </span>
      </div>

      <Link
        href={`/exams/questionnaires/${quest.id}`}
        className="group/cta mt-auto flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-bold transition-colors"
        style={{ color: testTheme.violet, borderColor: '#CDBEF5' }}
      >
        <Icon name="lucide:download" size={13} />
        <span>دانلود پرسشنامه</span>
      </Link>
    </article>
  );
}

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

      {['1', '2', '3', '4', '5', '…', '9', '10'].map((n, i) =>
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
