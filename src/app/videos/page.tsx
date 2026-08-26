'use client';

import React, { useMemo, useState } from 'react';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs, VideoCard } from '@/components/free/FreeBits';
import {
  freeTheme,
  videoHero,
  videoSorts,
  videoTopics,
  videoLevels,
  videoDurations,
  videoTypes,
  perPageOptions,
  freeVideos,
  toLatinNumber,
  durationToMinutes,
} from '@/data/free';

/* ── Sidebar furniture ──────────────────────────────────────── */

function FacetCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="bg-white rounded-2xl border p-4"
      style={{ borderColor: freeTheme.border }}
    >
      <h3 className="text-[14px] font-black mb-3" style={{ color: freeTheme.navy }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

/** Grey pill carrying the result count for a facet row. */
function Count({ value }: { value: number }) {
  return (
    <span className="text-[11px] text-gray-500 bg-gray-100 rounded-md px-2 py-0.5 tabular-nums shrink-0">
      {value}
    </span>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

const PLACEHOLDER = 'جستجو در ویدئوها، موضوع‌ها ...';

export default function FreeVideosPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(videoSorts[0].id);
  const [perPage, setPerPage] = useState(perPageOptions[0]);
  const [openTopic, setOpenTopic] = useState<string | null>(videoTopics[0].id);
  const [topic, setTopic] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);

  const results = useMemo(() => {
    const list = freeVideos.filter((v) => {
      const byQuery =
        !query.trim() ||
        v.title.includes(query.trim()) ||
        v.topic.includes(query.trim()) ||
        v.tags.some((t) => t.includes(query.trim()));
      const byTopic = !topic || v.topicId === topic;
      const byLevel = !level || v.level === level;
      return byQuery && byTopic && byLevel;
    });

    /* Seed order is already newest-first; the other sorts parse the
       Persian-digit copy back into numbers. */
    const sorted = [...list];
    if (sort === 'popular')
      sorted.sort((a, b) => toLatinNumber(b.views) - toLatinNumber(a.views));
    if (sort === 'shortest')
      sorted.sort((a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration));
    if (sort === 'longest')
      sorted.sort((a, b) => durationToMinutes(b.duration) - durationToMinutes(a.duration));
    return sorted;
  }, [query, sort, topic, level]);

  const visible = results.slice(0, perPage);

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={videoHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 px-6 sm:px-10 py-8 grid lg:grid-cols-2 gap-8 items-center"
            style={{ background: 'linear-gradient(255deg,#EEF2FE 0%,#F7F9FF 60%,#FFFFFF 100%)' }}
          >
            {/* RTL grid: order-1 lands in the right-hand column. */}
            <div className="order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={videoHero.art} alt="" className="w-full max-w-[520px] mx-auto" />
            </div>

            <div className="order-1 text-right">
              <h1
                className="text-[26px] sm:text-[34px] font-black leading-[1.5] mb-4"
                style={{ color: freeTheme.navy }}
              >
                ویدئوهای آموزشی{' '}
                <span style={{ color: freeTheme.orange }}>رایگان</span> آریاز
              </h1>
              {videoHero.desc.map((line) => (
                <p key={line} className="text-[13px] text-gray-500 leading-8">
                  {line}
                </p>
              ))}

              <div className="grid grid-cols-3 gap-3 mt-6">
                {videoHero.stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl py-4 px-2 text-center border"
                    style={{ borderColor: freeTheme.border }}
                  >
                    <span className="flex items-center justify-center gap-2 mb-2">
                      <Icon name={s.icon} size={18} style={{ backgroundColor: freeTheme.navy }} />
                      <span
                        className="text-[17px] font-black"
                        style={{ color: freeTheme.navy }}
                      >
                        {s.value}
                      </span>
                    </span>
                    <span className="text-[11.5px] text-gray-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Toolbar + grid + facets ──────────────────────── */}
        {/* Facets take the right-hand column, results the wide left one. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[270px_1fr] gap-6 items-start">
          {/* Results column */}
          <div className="order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row-reverse gap-3 mb-6">
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder={PLACEHOLDER}
                  aria-label={PLACEHOLDER}
                  className="w-full bg-white border rounded-2xl py-3.5 pr-5 pl-12 text-[13px] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  style={{ borderColor: freeTheme.border }}
                />
                <Icon
                  name="lucide:search"
                  size={18}
                  className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>

              <div
                className="relative bg-white border rounded-2xl flex items-center gap-2 px-4 sm:w-52"
                style={{ borderColor: freeTheme.border }}
              >
                <Icon name="lucide:layout-grid" size={16} className="text-gray-400 shrink-0" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="مرتب‌سازی"
                  className="flex-1 bg-transparent py-3.5 text-[13px] font-semibold focus:outline-none appearance-none cursor-pointer"
                  style={{ color: freeTheme.navy }}
                >
                  {videoSorts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <Icon
                  name="lucide:chevron-down"
                  size={15}
                  className="text-gray-400 shrink-0 pointer-events-none"
                />
              </div>
            </div>

            {visible.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {visible.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl border py-20 text-center"
                style={{ borderColor: freeTheme.border }}
              >
                <Icon
                  name="lucide:video-off"
                  size={40}
                  className="mx-auto mb-4 text-gray-300"
                />
                <h3 className="font-bold text-gray-600 mb-1">ویدئویی یافت نشد</h3>
                <p className="text-[13px] text-gray-400">فیلترها یا عبارت جستجو را تغییر دهید</p>
              </div>
            )}

            {/* Pagination — mirrors the mockup; page 1 is the live page. */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <PageNav />

              <label
                className="flex items-center gap-2 text-[12.5px] text-gray-500"
                style={{ color: freeTheme.navy }}
              >
                <span>نمایش در هر صفحه:</span>
                <span
                  className="relative bg-white border rounded-xl flex items-center pl-2"
                  style={{ borderColor: freeTheme.border }}
                >
                  <select
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="bg-transparent py-2 pr-3 pl-1 text-[12.5px] font-bold focus:outline-none appearance-none cursor-pointer"
                  >
                    {perPageOptions.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="lucide:chevron-down"
                    size={14}
                    className="text-gray-400 pointer-events-none"
                  />
                </span>
              </label>
            </div>
          </div>

          {/* Facets */}
          <aside className="order-2 lg:order-1 space-y-4 lg:sticky lg:top-28">
            <FacetCard title="موضوعات">
              <div className="space-y-1">
                {videoTopics.map((g) => {
                  const open = openTopic === g.id;
                  return (
                    <div key={g.id}>
                      <button
                        onClick={() => setOpenTopic(open ? null : g.id)}
                        aria-expanded={open}
                        className="w-full flex items-center gap-2 py-2.5 text-right"
                      >
                        <Icon
                          name={g.icon!}
                          size={17}
                          className="shrink-0"
                          style={{ backgroundColor: freeTheme.blue }}
                        />
                        <span
                          className="flex-1 text-[13px] font-bold"
                          style={{ color: freeTheme.navy }}
                        >
                          {g.title}
                        </span>
                        <Count value={g.count!} />
                        <Icon
                          name="lucide:chevron-down"
                          size={15}
                          className={`text-gray-400 shrink-0 transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {open && (
                        <ul className="pb-2">
                          {g.items.map((it) => (
                            <li key={it.id}>
                              <button
                                onClick={() => setTopic(topic === g.id ? null : g.id)}
                                className="w-full flex items-center gap-2 py-1.5 text-right group"
                              >
                                <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                                <span className="flex-1 text-[12.5px] text-gray-600 group-hover:text-orange-500 transition-colors">
                                  {it.label}
                                </span>
                                <Count value={it.count} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </FacetCard>

            <FacetCard title="سطوح">
              <ul className="space-y-1">
                {videoLevels.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => setLevel(level === l.label ? null : l.label)}
                      aria-pressed={level === l.label}
                      className={`w-full flex items-center gap-2 py-2 px-2 -mx-2 rounded-lg text-right transition-colors ${
                        level === l.label ? 'bg-orange-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border-2 shrink-0"
                        style={{ borderColor: l.dot }}
                      />
                      <span
                        className="flex-1 text-[12.5px] font-semibold"
                        style={{ color: freeTheme.navy }}
                      >
                        {l.label}
                      </span>
                      <Count value={l.count} />
                    </button>
                  </li>
                ))}
              </ul>
            </FacetCard>

            <FacetCard title="مدت زمان">
              <ul className="space-y-1">
                {videoDurations.map((d) => (
                  <li key={d.id} className="flex items-center gap-2 py-2">
                    <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                    <span
                      className="flex-1 text-[12.5px] font-semibold"
                      style={{ color: freeTheme.navy }}
                    >
                      {d.label}
                    </span>
                    <Count value={d.count} />
                  </li>
                ))}
              </ul>
            </FacetCard>

            <FacetCard title="نوع ویدئو">
              <ul className="space-y-1">
                {videoTypes.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center gap-2 py-2.5 px-3 rounded-xl"
                    style={{ backgroundColor: '#F4F6FD' }}
                  >
                    <Icon
                      name={t.icon}
                      size={16}
                      className="shrink-0"
                      style={{ backgroundColor: freeTheme.navy }}
                    />
                    <span
                      className="flex-1 text-[12.5px] font-bold"
                      style={{ color: freeTheme.navy }}
                    >
                      {t.label}
                    </span>
                    <Count value={t.count} />
                  </li>
                ))}
              </ul>
            </FacetCard>
          </aside>
        </div>
      </div>
    </SharedPageLayout>
  );
}

/** Numbered pager. Static for now — the catalogue is a single page of seeds. */
function PageNav() {
  const cell =
    'w-10 h-10 flex items-center justify-center rounded-xl border text-[13px] font-bold transition-colors';
  return (
    /* The mockup draws pagination left-to-right, so the nav opts out of RTL. */
    <nav dir="ltr" className="flex items-center gap-2 flex-wrap justify-center" aria-label="صفحه‌بندی">
      <button
        className={`${cell} w-auto px-4 gap-2 bg-white hover:border-orange-300`}
        style={{ borderColor: freeTheme.border, color: freeTheme.navy }}
      >
        <Icon name="lucide:arrow-left" size={14} />
        <span>قبلی</span>
      </button>

      {['1', '2', '3', '…', '8', '9', '10'].map((n, i) =>
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
                ? { backgroundColor: freeTheme.navy, borderColor: freeTheme.navy, color: '#fff' }
                : { backgroundColor: '#fff', borderColor: freeTheme.border, color: freeTheme.navy }
            }
          >
            {n}
          </button>
        )
      )}

      <button
        className={`${cell} w-auto px-4 gap-2 bg-white hover:border-orange-300`}
        style={{ borderColor: freeTheme.border, color: freeTheme.navy }}
      >
        <span>بعدی</span>
        <Icon name="lucide:arrow-right" size={14} />
      </button>
    </nav>
  );
}
