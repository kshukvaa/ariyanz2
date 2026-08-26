'use client';

import React, { useMemo, useRef, useState } from 'react';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs } from '@/components/free/FreeBits';
import ArticleCard from '@/components/free/ArticleCard';
import { freeTheme, toLatinNumber } from '@/data/free';
import {
  articleHero,
  hotTopics,
  accessTabs,
  articleSorts,
  articleTopics,
  articleKinds,
  articles,
  type AccessTab,
} from '@/data/articles';

const SEARCH_LABEL = 'جستجو در مقالات..';

export default function ArticlesPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(articleSorts[0].id);
  const [tab, setTab] = useState<AccessTab>('all');
  const [openTopic, setOpenTopic] = useState<string | null>(articleTopics[0].id);
  const [topic, setTopic] = useState<string | null>(null);
  const [kinds, setKinds] = useState<string[]>([]);
  const [hot, setHot] = useState<string | null>(null);

  const toggleKind = (id: string) =>
    setKinds((k) => (k.includes(id) ? k.filter((x) => x !== id) : [...k, id]));

  const results = useMemo(() => {
    const q = query.trim();
    const list = articles.filter((a) => {
      const byQuery =
        !q || a.title.includes(q) || a.excerpt.includes(q) || a.category.includes(q);
      const byTab = tab === 'all' || a.access === tab;
      const byTopic = !topic || a.topicId === topic;
      const byKind = kinds.length === 0 || kinds.includes(a.kindId);
      const byHot = !hot || a.category === hot;
      return byQuery && byTab && byTopic && byKind && byHot;
    });

    /* Seed order is newest-first; the other sorts derive from the copy. */
    const sorted = [...list];
    if (sort === 'popular')
      sorted.sort((a, b) => toLatinNumber(b.views) - toLatinNumber(a.views));
    if (sort === 'oldest') sorted.reverse();
    return sorted;
  }, [query, sort, tab, topic, kinds, hot]);

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={articleHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 px-6 sm:px-10 py-8 grid lg:grid-cols-2 gap-8 items-center"
            style={{ background: 'linear-gradient(255deg,#EDF1FE 0%,#F6F8FF 60%,#FFFFFF 100%)' }}
          >
            <div className="order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={articleHero.art} alt="" className="w-full max-w-[540px] mx-auto" />
            </div>

            <div className="order-1 text-right">
              <h1
                className="text-[24px] sm:text-[32px] font-black leading-[1.6] mb-5"
                style={{ color: freeTheme.navy }}
              >
                {articleHero.title}
              </h1>
              {articleHero.desc.map((line) => (
                <p key={line} className="text-[13px] text-gray-500 leading-8">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[270px_1fr] gap-6 items-start">
          {/* Results column */}
          <div className="order-1 lg:order-2">
            <HotTopics active={hot} onPick={(t) => setHot(hot === t ? null : t)} />

            {/* Toolbar — tabs right, sort centre, search left */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-6">
              <div className="flex items-center gap-2 shrink-0">
                {accessTabs.map((t) => {
                  const on = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-[12.5px] font-bold transition-all border"
                      style={
                        on
                          ? {
                              backgroundColor: freeTheme.navy,
                              borderColor: freeTheme.navy,
                              color: '#fff',
                            }
                          : { backgroundColor: '#fff', borderColor: freeTheme.border, color: freeTheme.navy }
                      }
                    >
                      {'icon' in t && t.icon && (
                        <Icon
                          name={t.icon}
                          size={14}
                          style={{ backgroundColor: on ? '#fff' : freeTheme.orange }}
                        />
                      )}
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <div
                className="relative bg-white border rounded-xl flex items-center gap-2 px-4 shrink-0 lg:w-48"
                style={{ borderColor: '#C7D2FE' }}
              >
                <Icon name="lucide:arrow-down-wide-narrow" size={15} className="text-gray-400 shrink-0" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="مرتب‌سازی"
                  className="flex-1 bg-transparent py-3 text-[12.5px] font-semibold focus:outline-none appearance-none cursor-pointer"
                  style={{ color: freeTheme.navy }}
                >
                  {articleSorts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <Icon name="lucide:chevron-down" size={14} className="text-gray-400 shrink-0" />
              </div>

              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder={SEARCH_LABEL}
                  aria-label={SEARCH_LABEL}
                  className="w-full bg-white border rounded-xl py-3 pr-5 pl-11 text-[12.5px] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  style={{ borderColor: freeTheme.border }}
                />
                <Icon
                  name="lucide:search"
                  size={17}
                  className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {results.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl border py-20 text-center"
                style={{ borderColor: freeTheme.border }}
              >
                <Icon name="lucide:file-search" size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="font-bold text-gray-600 mb-1">مقاله‌ای یافت نشد</h3>
                <p className="text-[13px] text-gray-400">فیلترها یا عبارت جستجو را تغییر دهید</p>
              </div>
            )}

            <Pager />
          </div>

          {/* Facets */}
          <aside className="order-2 lg:order-1 space-y-4 lg:sticky lg:top-28">
            <FacetCard title="موضوعات" icon="lucide:layout-grid">
              <div className="space-y-1">
                {articleTopics.map((g) => {
                  const open = openTopic === g.id;
                  return (
                    <div key={g.id}>
                      <button
                        onClick={() => setOpenTopic(open ? null : g.id)}
                        aria-expanded={open}
                        className="w-full flex items-center gap-2 py-3 px-3 rounded-xl text-right transition-colors"
                        style={open ? { backgroundColor: '#F1F4FE' } : undefined}
                      >
                        <Icon
                          name="lucide:layout-grid"
                          size={16}
                          className="shrink-0"
                          style={{ backgroundColor: freeTheme.blue }}
                        />
                        <span
                          className="flex-1 text-[13px] font-bold"
                          style={{ color: freeTheme.navy }}
                        >
                          {g.title}
                        </span>
                        <Icon
                          name="lucide:chevron-down"
                          size={15}
                          className={`text-gray-400 shrink-0 transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {open && (
                        <ul className="py-1">
                          {g.items.map((it) => {
                            const on = topic === it.id;
                            return (
                              <li key={it.id}>
                                <button
                                  onClick={() => setTopic(on ? null : it.id)}
                                  aria-pressed={on}
                                  className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-right group hover:bg-gray-50 transition-colors"
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: on ? freeTheme.orange : '#C7CEDE' }}
                                  />
                                  <span
                                    className={`flex-1 text-[12.5px] transition-colors ${
                                      on ? 'font-bold text-orange-600' : 'text-gray-600 group-hover:text-orange-500'
                                    }`}
                                  >
                                    {it.label}
                                  </span>
                                  <Count value={it.count} />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </FacetCard>

            <FacetCard title="نوع مقاله" icon="lucide:layout-grid">
              <ul className="space-y-0.5">
                {articleKinds.map((k) => {
                  const on = kinds.includes(k.id);
                  return (
                    <li key={k.id}>
                      <label className="flex items-center gap-2 py-2.5 px-2 -mx-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleKind(k.id)}
                          className="w-4 h-4 shrink-0 accent-orange-500 cursor-pointer"
                        />
                        <span
                          className="flex-1 text-[12.5px] font-semibold"
                          style={{ color: freeTheme.navy }}
                        >
                          {k.label}
                        </span>
                        <Count value={k.count} />
                      </label>
                    </li>
                  );
                })}
              </ul>
            </FacetCard>
          </aside>
        </div>
      </div>
    </SharedPageLayout>
  );
}

/* ── Pieces ─────────────────────────────────────────────────── */

function FacetCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border p-4" style={{ borderColor: freeTheme.border }}>
      <h2
        className="flex items-center gap-2 text-[14px] font-black mb-3"
        style={{ color: freeTheme.navy }}
      >
        <Icon name={icon} size={17} style={{ backgroundColor: freeTheme.blue }} />
        <span className="flex-1">{title}</span>
        <Icon name="lucide:chevron-down" size={15} className="text-gray-400" />
      </h2>
      {children}
    </section>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="text-[11px] font-bold text-gray-500 bg-gray-100 rounded-md px-2 py-0.5 tabular-nums shrink-0">
      {value}
    </span>
  );
}

/** Horizontally scrollable "موضوعات محبوب" chips. */
function HotTopics({ active, onPick }: { active: string | null; onPick: (t: string) => void }) {
  const rail = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-5">
      <h2
        className="flex items-center gap-1.5 text-[13px] font-black mb-3"
        style={{ color: freeTheme.navy }}
      >
        <Icon name="lucide:flame" size={16} style={{ backgroundColor: freeTheme.orange }} />
        <span>موضوعات محبوب</span>
      </h2>

      <div className="flex items-center gap-2">
        <div ref={rail} className="ar-rail flex flex-1">
          {hotTopics.map((t) => {
            const on = active === t;
            return (
              <button
                key={t}
                onClick={() => onPick(t)}
                aria-pressed={on}
                className="ar-rail-item flex items-center gap-2 px-5 py-3 rounded-xl text-[12.5px] font-bold whitespace-nowrap border transition-all shrink-0"
                style={{
                  backgroundColor: on ? '#FFF3E8' : '#fff',
                  borderColor: on ? '#FBD5B0' : freeTheme.border,
                  color: freeTheme.navy,
                }}
              >
                <Icon name="lucide:flame" size={14} style={{ backgroundColor: freeTheme.orange }} />
                <span>{t}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => rail.current?.scrollBy({ left: 240, behavior: 'smooth' })}
          aria-label="موضوعات بیشتر"
          className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center shrink-0 transition-colors hover:border-orange-300"
          style={{ borderColor: freeTheme.border }}
        >
          <Icon name="lucide:chevron-left" size={16} style={{ backgroundColor: freeTheme.navy }} />
        </button>
      </div>
    </div>
  );
}

/** Chevron-only pager, matching the mockup. */
function Pager() {
  const cell =
    'w-10 h-10 flex items-center justify-center rounded-xl border text-[13px] font-bold transition-colors';
  return (
    /* The mockup draws pagination left-to-right, so the nav opts out of RTL. */
    <nav
      dir="ltr"
      className="flex items-center justify-center gap-2 mt-8 flex-wrap"
      aria-label="صفحه‌بندی"
    >
      <button
        aria-label="صفحه قبل"
        className={`${cell} bg-white hover:border-orange-300`}
        style={{ borderColor: freeTheme.border }}
      >
        <Icon name="lucide:chevron-left" size={16} style={{ backgroundColor: freeTheme.navy }} />
      </button>

      {['1', '2', '3', '4', '…', '10'].map((n, i) =>
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
        aria-label="صفحه بعد"
        className={`${cell} bg-white hover:border-orange-300`}
        style={{ borderColor: freeTheme.border }}
      >
        <Icon name="lucide:chevron-right" size={16} style={{ backgroundColor: freeTheme.navy }} />
      </button>
    </nav>
  );
}
