'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs } from '@/components/free/FreeBits';
import { freeTheme, tones } from '@/data/free';
import {
  docsHero,
  docsSearchLabel,
  docSorts,
  docFacets,
  docs,
  docsTotal,
  docsPerPage,
  docFileMeta,
  type Doc,
} from '@/data/docs';

/* ──────────────────────────────────────────────────────────────
   /laws — مرکز اسناد.

   These are official records, so the card leads with the things
   that identify one: file type, number, date and issuing body.
   The filters are checkboxes because people arrive knowing which
   authority and year they need.
────────────────────────────────────────────────────────────── */

const NAVY = '#123B7A';

export default function DocsPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(docSorts[0].id);
  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [open, setOpen] = useState<string[]>(docFacets.filter((f) => f.open).map((f) => f.id));
  const [perPage, setPerPage] = useState(docsPerPage[0]);

  const results = useMemo(() => {
    const q = query.trim();
    const on = (facet: string, value: string) => {
      const list = picked[facet];
      return !list || list.length === 0 || list.includes(value);
    };

    const list = docs.filter(
      (d) =>
        (!q || d.title.includes(q) || d.authority.includes(q) || d.number.includes(q)) &&
        on('kind', d.kindId) &&
        on('year', d.yearId) &&
        on('authority', d.authorityId) &&
        on('subject', d.subjectId)
    );

    if (sort === 'authority') return [...list].sort((a, b) => a.authority.localeCompare(b.authority, 'fa'));
    if (sort === 'oldest') return [...list].reverse();
    return list;
  }, [query, sort, picked]);

  const toggle = (facet: string, item: string) =>
    setPicked((p) => {
      const list = p[facet] ?? [];
      return { ...p, [facet]: list.includes(item) ? list.filter((x) => x !== item) : [...list, item] };
    });

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={docsHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 overflow-hidden grid lg:grid-cols-2 items-center"
            style={{ background: 'linear-gradient(255deg,#E8F0FE 0%,#F4F8FF 55%,#FFFFFF 100%)' }}
          >
            <div className="order-1 px-6 sm:px-10 py-9 text-right">
              <h1
                className="text-[26px] sm:text-[36px] font-black leading-[1.6] mb-5"
                style={{ color: freeTheme.navy }}
              >
                {docsHero.title}
                <br />
                <span style={{ color: NAVY }}>{docsHero.titleAccent}</span>
              </h1>
              {docsHero.desc.map((line) => (
                <p key={line} className="text-[13.5px] text-gray-600 leading-9">
                  {line}
                </p>
              ))}
            </div>

            <div className="order-2 h-full flex items-center justify-center p-6">
              {/* Capped at the artwork's own resolution so it stays crisp. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={docsHero.art} alt="" className="w-full max-w-[535px] object-contain" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[280px_1fr] gap-6 items-start">
          {/* Results */}
          <div className="order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <span
                className="relative bg-white border rounded-xl flex items-center gap-2 px-4 shrink-0 sm:w-52"
                style={{ borderColor: NAVY }}
              >
                <Icon name="lucide:chevron-down" size={15} className="text-gray-400 shrink-0" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="مرتب‌سازی"
                  className="flex-1 bg-transparent py-3.5 text-[12.5px] font-bold focus:outline-none appearance-none cursor-pointer text-center"
                  style={{ color: NAVY }}
                >
                  {docSorts.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Icon name="lucide:calendar" size={15} className="shrink-0" style={{ backgroundColor: NAVY }} />
              </span>

              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder={docsSearchLabel}
                  aria-label={docsSearchLabel}
                  className="w-full bg-white border rounded-xl py-3.5 pr-5 pl-11 text-[12.5px] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
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
                {results.map((d) => (
                  <DocCard key={d.id} doc={d} />
                ))}
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl border py-20 text-center"
                style={{ borderColor: freeTheme.border }}
              >
                <Icon name="lucide:file-search" size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="font-bold text-gray-600 mb-1">سندی یافت نشد</h3>
                <p className="text-[13px] text-gray-400">فیلترها یا عبارت جستجو را تغییر دهید</p>
              </div>
            )}

            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-8">
              <p className="text-[12.5px] font-bold order-3 lg:order-1" style={{ color: freeTheme.navy }}>
                تعداد نتایج: {docsTotal} مورد
              </p>

              <Pager />

              <label className="flex items-center gap-2 order-2 lg:order-3">
                <span className="text-[12px] text-gray-500">نتایج در هر صفحه:</span>
                <span
                  className="relative bg-white border rounded-xl flex items-center px-3"
                  style={{ borderColor: freeTheme.border }}
                >
                  <select
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="bg-transparent py-2.5 pl-5 text-[12.5px] font-bold focus:outline-none appearance-none cursor-pointer"
                    style={{ color: freeTheme.navy }}
                  >
                    {docsPerPage.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="lucide:chevron-down"
                    size={14}
                    className="text-gray-400 absolute left-2 pointer-events-none"
                  />
                </span>
              </label>
            </div>
          </div>

          {/* Facets */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-28">
            <div
              className="bg-white rounded-2xl border p-4 space-y-5"
              style={{ borderColor: freeTheme.border }}
            >
              {docFacets.map((f) => {
                const isOpen = open.includes(f.id);
                return (
                  <section key={f.id}>
                    <button
                      onClick={() =>
                        setOpen((o) => (o.includes(f.id) ? o.filter((x) => x !== f.id) : [...o, f.id]))
                      }
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-2 pb-3"
                    >
                      <Icon
                        name="lucide:chevron-down"
                        size={14}
                        className={`text-gray-400 shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`}
                      />
                      <span className="flex-1 text-right text-[13px] font-black" style={{ color: NAVY }}>
                        {f.title}
                      </span>
                      <Icon name={f.icon} size={16} style={{ backgroundColor: NAVY }} />
                    </button>

                    {isOpen && (
                      <ul className="space-y-1">
                        {f.items.map((it) => {
                          const on = (picked[f.id] ?? []).includes(it.id);
                          return (
                            <li key={it.id}>
                              <button
                                onClick={() => toggle(f.id, it.id)}
                                aria-pressed={on}
                                className="w-full flex items-center gap-2.5 py-2 px-1 rounded-lg transition-colors hover:bg-gray-50"
                              >
                                <span
                                  className="w-4 h-4 rounded border shrink-0 flex items-center justify-center"
                                  style={{
                                    borderColor: on ? NAVY : '#D5D8E6',
                                    backgroundColor: on ? NAVY : '#fff',
                                  }}
                                >
                                  {on && <Icon name="lucide:check" size={11} className="text-white" />}
                                </span>
                                <span
                                  className="flex-1 text-right text-[12.5px]"
                                  style={{ color: on ? NAVY : '#4B5568' }}
                                >
                                  {it.label}
                                </span>
                              </button>
                            </li>
                          );
                        })}

                        {f.more && (
                          <li>
                            <button className="text-[12px] font-bold py-2 px-1" style={{ color: NAVY }}>
                              نمایش بیشتر
                            </button>
                          </li>
                        )}
                      </ul>
                    )}
                  </section>
                );
              })}

              <button
                data-ripple
                onClick={() => setPicked({})}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                <Icon name="lucide:filter" size={15} className="text-white" />
                <span>اعمال فیلترها</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </SharedPageLayout>
  );
}

/* ── Card ───────────────────────────────────────────────────── */

function DocCard({ doc }: { doc: Doc }) {
  const file = docFileMeta[doc.file];
  const tone = tones[doc.kindTone];

  return (
    <article
      className="group bg-white rounded-2xl border p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
      style={{ borderColor: freeTheme.border }}
    >
      {/* RTL: the title reads first on the right, the file type sits left. */}
      <div className="flex items-start gap-3 mb-5">
        <h3 className="flex-1 text-[12.5px] font-black leading-7 text-right">
          <Link
            href={`/laws/${doc.id}`}
            className="transition-colors group-hover:text-orange-500"
            style={{ color: freeTheme.navy }}
          >
            {doc.title}
          </Link>
        </h3>

        <span
          className="w-11 h-12 rounded-lg border flex flex-col items-center justify-center shrink-0"
          style={{ borderColor: `${file.color}33`, backgroundColor: `${file.color}0F` }}
        >
          <Icon name={file.icon} size={16} style={{ backgroundColor: file.color }} />
          <span className="text-[8.5px] font-black mt-0.5" style={{ color: file.color }} dir="ltr">
            {file.label}
          </span>
        </span>
      </div>

      <dl className="space-y-2 text-[11px] mb-4">
        <div className="flex items-center gap-1.5">
          <dt className="text-gray-400">{doc.numberLabel}:</dt>
          <dd style={{ color: freeTheme.navy }} dir="rtl">
            {doc.number}
          </dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="text-gray-400">تاریخ انتشار:</dt>
          <dd style={{ color: freeTheme.navy }}>{doc.date}</dd>
        </div>
        <div className="flex items-start gap-1.5">
          <dt className="text-gray-400 shrink-0">مرجع:</dt>
          <dd className="text-gray-500 leading-6">{doc.authority}</dd>
        </div>
      </dl>

      <span
        className="self-start text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg mb-4"
        style={{ color: tone.text, backgroundColor: tone.bg }}
      >
        {doc.kindLabel}
      </span>

      <div className="mt-auto flex items-center gap-2">
        <Link
          href={`/laws/${doc.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: NAVY }}
        >
          <Icon name="lucide:download" size={14} className="text-white" />
          <span>دانلود</span>
        </Link>

        <Link
          href={`/laws/${doc.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[11.5px] font-bold transition-colors hover:border-blue-300"
          style={{ borderColor: '#C7D6F0', color: NAVY }}
        >
          <span>مشاهده مفاد</span>
        </Link>
      </div>
    </article>
  );
}

/** The mockups draw pagination left-to-right, so the nav opts out of RTL. */
function Pager() {
  const cell =
    'w-9 h-9 flex items-center justify-center rounded-lg border text-[12.5px] font-bold transition-colors';
  return (
    <nav
      dir="ltr"
      className="flex items-center justify-center gap-1.5 order-1 lg:order-2 flex-wrap"
      aria-label="صفحه‌بندی"
    >
      <button aria-label="اولین صفحه" className={`${cell} bg-white`} style={{ borderColor: freeTheme.border }}>
        <Icon name="lucide:chevron-left" size={15} style={{ backgroundColor: NAVY }} />
      </button>

      {['1', '2', '3', '4', '5', '…', '13'].map((n, i) =>
        n === '…' ? (
          <span key="gap" className="w-7 text-center text-gray-400">
            …
          </span>
        ) : (
          <button
            key={n}
            aria-current={i === 0 ? 'page' : undefined}
            className={cell}
            style={
              i === 0
                ? { backgroundColor: NAVY, borderColor: NAVY, color: '#fff' }
                : { backgroundColor: '#fff', borderColor: freeTheme.border, color: freeTheme.navy }
            }
          >
            {n}
          </button>
        )
      )}

      <button aria-label="آخرین صفحه" className={`${cell} bg-white`} style={{ borderColor: freeTheme.border }}>
        <Icon name="lucide:chevron-right" size={15} style={{ backgroundColor: NAVY }} />
      </button>
    </nav>
  );
}
