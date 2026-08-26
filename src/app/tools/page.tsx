'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs } from '@/components/free/FreeBits';
import { freeTheme, tones } from '@/data/free';
import {
  toolsHero,
  toolSorts,
  toolTabs,
  toolTopics,
  toolKinds,
  kindFacets,
  formats,
  toolResources,
  totalFree,
  sizeToKb,
  type Format,
  type ToolKind,
  type ToolResource,
  type ToolTab,
} from '@/data/tools';

const SEARCH_LABEL = 'جستجو در فرم‌ها، چک لیست‌ها و دستورالعمل‌ها ...';

export default function ToolsPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(toolSorts[0].id);
  const [tab, setTab] = useState<ToolTab>('all');
  const [openTopic, setOpenTopic] = useState<string | null>(toolTopics[0].id);
  const [topic, setTopic] = useState<string | null>(null);
  const [format, setFormat] = useState<Format | null>(null);
  const [kind, setKind] = useState<ToolKind | null>(null);

  const results = useMemo(() => {
    const q = query.trim();
    const list = toolResources.filter((r) => {
      const byQuery = !q || r.title.includes(q) || r.desc.includes(q);
      const byTab = tab === 'all' || r.access === tab;
      const byTopic = !topic || r.topicId === topic;
      const byFormat = !format || r.format === format;
      const byKind = !kind || r.kind === kind;
      return byQuery && byTab && byTopic && byFormat && byKind;
    });

    /* Seed order is newest-first; the others derive from the data. */
    const sorted = [...list];
    if (sort === 'popular') sorted.sort((a, b) => b.downloads - a.downloads);
    if (sort === 'smallest') sorted.sort((a, b) => sizeToKb(a.size) - sizeToKb(b.size));
    return sorted;
  }, [query, sort, tab, topic, format, kind]);

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={toolsHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 px-6 sm:px-10 py-6 grid lg:grid-cols-2 gap-8 items-center"
            style={{ background: 'linear-gradient(255deg,#EEF1FE 0%,#F7F9FF 60%,#FFFFFF 100%)' }}
          >
            <div className="order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={toolsHero.art} alt="" className="w-full max-w-[500px] mx-auto" />
            </div>

            <div className="order-1 text-right">
              <h1
                className="text-[24px] sm:text-[32px] font-black leading-[1.6] mb-6"
                style={{ color: freeTheme.navy }}
              >
                {toolsHero.title}
              </h1>
              {toolsHero.desc.map((line) => (
                <p key={line} className="text-[13px] text-gray-500 leading-9">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[270px_1fr] gap-6 items-start">
          {/* Results column */}
          <div className="order-1 lg:order-2">
            {/* Toolbar — sort right, then the access tabs, search left */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-6">
              <div
                className="relative rounded-xl flex items-center gap-2 px-4 shrink-0 lg:w-44"
                style={{ backgroundColor: freeTheme.navy }}
              >
                <Icon name="lucide:zap" size={15} className="text-white shrink-0" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="مرتب‌سازی"
                  className="flex-1 bg-transparent py-3 text-[12.5px] font-bold text-white focus:outline-none appearance-none cursor-pointer"
                >
                  {toolSorts.map((s) => (
                    <option key={s.id} value={s.id} className="text-gray-900">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {toolTabs.map((t) => {
                  const on = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-[12.5px] font-bold border transition-all"
                      style={{
                        backgroundColor: on ? '#EEF1FB' : '#fff',
                        borderColor: on ? '#C9D2EE' : freeTheme.border,
                        color: freeTheme.navy,
                      }}
                    >
                      <Icon
                        name={t.icon}
                        size={15}
                        style={{
                          backgroundColor:
                            t.id === 'premium' ? '#F0A020' : t.id === 'free' ? '#2FB6A8' : freeTheme.blue,
                        }}
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
                {results.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl border py-20 text-center"
                style={{ borderColor: freeTheme.border }}
              >
                <Icon name="lucide:file-search" size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="font-bold text-gray-600 mb-1">موردی یافت نشد</h3>
                <p className="text-[13px] text-gray-400">فیلترها یا عبارت جستجو را تغییر دهید</p>
              </div>
            )}

            <Pager />

            <p className="text-center text-[12.5px] font-bold mt-4" style={{ color: freeTheme.navy }}>
              نمایش ۱ تا {toPersian(results.length)} از {totalFree} رایگان
            </p>
          </div>

          {/* Facets */}
          <aside className="order-2 lg:order-1 space-y-4 lg:sticky lg:top-28">
            <FacetCard title="برحسب موضوع" icon="lucide:folder">
              <div className="space-y-1">
                {toolTopics.map((g) => {
                  const open = openTopic === g.id;
                  return (
                    <div key={g.id}>
                      <button
                        onClick={() => setOpenTopic(open ? null : g.id)}
                        aria-expanded={open}
                        className="w-full flex items-center gap-2 py-3 text-right"
                      >
                        <Icon
                          name="lucide:chevron-down"
                          size={15}
                          className={`text-gray-400 shrink-0 transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                        {g.count !== undefined && <Count value={g.count} />}
                        <span
                          className="flex-1 text-[13px] font-bold text-right"
                          style={{ color: freeTheme.navy }}
                        >
                          {g.title}
                        </span>
                      </button>

                      {open && g.items && (
                        <ul className="rounded-xl p-2 space-y-1" style={{ backgroundColor: '#F7F8FD' }}>
                          {g.items.map((it) => {
                            const on = topic === it.id;
                            return (
                              <li key={it.id}>
                                <button
                                  onClick={() => setTopic(on ? null : it.id)}
                                  aria-pressed={on}
                                  className="w-full flex items-center justify-between gap-2 py-2 px-2 rounded-lg text-right transition-colors hover:bg-white"
                                  style={on ? { backgroundColor: '#fff' } : undefined}
                                >
                                  <span
                                    className={`text-[12.5px] font-semibold ${
                                      on ? 'text-orange-600' : ''
                                    }`}
                                    style={on ? undefined : { color: freeTheme.navy }}
                                  >
                                    {it.label}
                                  </span>
                                  <Count value={it.count} pill />
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

            <FacetCard title="برحسب قالب" icon="lucide:file-stack">
              <ul className="space-y-1">
                {(Object.keys(formats) as Format[]).map((f) => {
                  const on = format === f;
                  return (
                    <li key={f}>
                      {/* Latin labels read left-to-right, glyph first. */}
                      <button
                        onClick={() => setFormat(on ? null : f)}
                        aria-pressed={on}
                        className="w-full flex items-center justify-end gap-3 py-2 px-2 rounded-lg transition-colors hover:bg-gray-50"
                        style={on ? { backgroundColor: '#FFF3E8' } : undefined}
                      >
                        <span
                          className="text-[12.5px] font-bold"
                          style={{ color: freeTheme.navy }}
                          dir="ltr"
                        >
                          {formats[f].label}
                        </span>
                        <FileGlyph format={f} size={26} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </FacetCard>

            <FacetCard title="برحسب نوع" icon="lucide:clipboard-list">
              <ul className="space-y-1">
                {kindFacets.map((k) => {
                  const on = kind === k.id;
                  return (
                    <li key={k.id}>
                      <button
                        onClick={() => setKind(on ? null : k.id)}
                        aria-pressed={on}
                        className="w-full flex items-center justify-between gap-2 py-2.5 px-2 rounded-lg transition-colors hover:bg-gray-50"
                        style={on ? { backgroundColor: '#FFF3E8' } : undefined}
                      >
                        <span
                          className={`text-[12.5px] font-semibold ${on ? 'text-orange-600' : ''}`}
                          style={on ? undefined : { color: freeTheme.navy }}
                        >
                          {toolKinds[k.id].label}
                        </span>
                        <Count value={k.count} pill />
                      </button>
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

/** Office-style file badge: rounded square, brand colour, letter mark. */
function FileGlyph({ format, size = 40 }: { format: Format; size?: number }) {
  const f = formats[format];
  return (
    <span
      aria-hidden="true"
      className="rounded-lg flex items-center justify-center font-black text-white shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: f.color,
        fontSize: f.glyph.length > 1 ? size * 0.3 : size * 0.5,
      }}
    >
      {f.glyph}
    </span>
  );
}

function ResourceCard({ resource }: { resource: ToolResource }) {
  const kind = toolKinds[resource.kind];
  const tone = tones[kind.tone];
  const f = formats[resource.format];

  return (
    <article
      data-tilt
      className="group bg-white rounded-2xl border p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
      style={{ borderColor: freeTheme.border }}
    >
      {/* Glyph sits top-left, so it is last in RTL flow. */}
      <div className="flex items-start gap-3 mb-3">
        <h3 className="flex-1 text-[13.5px] font-black leading-7 text-right">
          <Link
            href={`/tools/${resource.id}`}
            className="transition-colors group-hover:text-orange-500"
            style={{ color: freeTheme.navy }}
          >
            {resource.title}
          </Link>
        </h3>
        <FileGlyph format={resource.format} />
      </div>

      <span
        className="self-end text-[11px] font-bold px-2.5 py-1 rounded-lg mb-3"
        style={{ color: tone.text, backgroundColor: tone.bg }}
      >
        {kind.label}
      </span>

      <p className="text-[11.5px] text-gray-500 leading-7 text-right mb-5">{resource.desc}</p>

      <div className="mt-auto flex items-center justify-between gap-2">
        <a
          href={resource.url}
          download
          className="flex items-center gap-1.5 border rounded-lg px-3 py-2 text-[11.5px] font-bold transition-colors hover:bg-emerald-50"
          style={{ color: '#0F9D58', borderColor: '#9FDBBF' }}
        >
          <span>دانلود رایگان</span>
          <Icon name="lucide:download" size={13} />
        </a>

        <span className="flex items-center gap-2.5 shrink-0">
          <span className="text-[11px] font-bold text-gray-500 tabular-nums">{resource.size}</span>
          <span className="text-[11px] font-black" style={{ color: freeTheme.navy }} dir="ltr">
            {f.ext}
          </span>
        </span>
      </div>
    </article>
  );
}

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
      {/* Collapse chevron sits right, icon and title to the left. */}
      <h2 className="flex items-center justify-between gap-2 mb-3">
        <Icon name="lucide:chevron-up" size={15} className="text-gray-400" />
        <span className="flex items-center gap-2">
          <span className="text-[13.5px] font-black" style={{ color: freeTheme.navy }}>
            {title}
          </span>
          <Icon name={icon} size={17} style={{ backgroundColor: freeTheme.navy }} />
        </span>
      </h2>
      {children}
    </section>
  );
}

function Count({ value, pill = false }: { value: number; pill?: boolean }) {
  return (
    <span
      className={`text-[11px] font-bold tabular-nums shrink-0 px-2.5 py-1 ${
        pill ? 'rounded-full' : 'rounded-md'
      }`}
      style={{ color: '#3B4FD8', backgroundColor: '#E5E9FB' }}
    >
      {value}
    </span>
  );
}

/** The mockups draw pagination left-to-right, so the nav opts out of RTL. */
function Pager() {
  const cell =
    'w-10 h-10 flex items-center justify-center rounded-xl border text-[13px] font-bold transition-colors';
  return (
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

const toPersian = (n: number) =>
  String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
