'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import {
  readerContents,
  readerRail,
  readerSpread,
  readerMeta,
  type BookDetail,
} from '@/data/books';

/* ──────────────────────────────────────────────────────────────
   The reader. A room of its own: no site chrome, three columns —
   tools on the right, the spread in the middle, contents on the
   left — and one page-turn control at the foot.

   Night mode recolours the whole room rather than tinting the
   page, so the sheet stays the brightest thing in view either way.
────────────────────────────────────────────────────────────── */

const BLUE = '#1D4ED8';

export default function BookReaderClient({ book }: { book: BookDetail }) {
  const [night, setNight] = useState(false);
  const [twoUp, setTwoUp] = useState(true);
  const [zoom, setZoom] = useState(readerMeta.zoom);
  const [page, setPage] = useState(readerMeta.currentPage);
  const [panel, setPanel] = useState<'contents' | 'notes'>('contents');
  const [query, setQuery] = useState('');
  const [openSection, setOpenSection] = useState<string[]>(['ch1']);
  const [active, setActive] = useState('ch1-1');

  const total = readerMeta.totalPages;
  const progress = Math.round((page / total) * 100);

  const skin = night
    ? { room: '#0F1522', panel: '#161E2F', border: '#26304A', text: '#E6EAF5' }
    : { room: '#EEF1F8', panel: '#FFFFFF', border: '#E3E7F2', text: '#16305B' };

  const muted = night ? '#93A0BC' : '#7A819A';

  const sections = useMemo(() => {
    const q = query.trim();
    if (!q) return readerContents;
    return readerContents
      .map((s) => {
        const kids = s.children?.filter((c) => c.title.includes(q));
        if (s.title.includes(q)) return s;
        return kids && kids.length ? { ...s, children: kids } : null;
      })
      .filter(Boolean) as typeof readerContents;
  }, [query]);

  const step = (delta: number) => setPage((p) => Math.min(total, Math.max(1, p + delta)));

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: skin.room, color: skin.text }}>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <header
        className="flex items-center gap-3 px-4 py-3 border-b flex-wrap"
        style={{ backgroundColor: skin.panel, borderColor: skin.border }}
      >
        <button
          onClick={() => setTwoUp((v) => !v)}
          aria-pressed={twoUp}
          className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[12px] font-bold transition-colors"
          style={{
            borderColor: twoUp ? BLUE : skin.border,
            color: twoUp ? BLUE : skin.text,
            backgroundColor: twoUp ? (night ? '#132043' : '#EFF4FF') : 'transparent',
          }}
        >
          <Icon name="lucide:book-open" size={15} />
          <span>مطالعه دو صفحه‌ای</span>
        </button>

        <span
          className="flex items-center gap-3 rounded-xl border px-3 py-2"
          style={{ borderColor: skin.border }}
        >
          <button onClick={() => setZoom((z) => Math.max(60, z - 10))} aria-label="کوچک‌نمایی">
            <Icon name="lucide:minus" size={15} style={{ backgroundColor: muted }} />
          </button>
          <span className="text-[12px] font-bold tabular-nums w-12 text-center" dir="ltr">
            {zoom}%
          </span>
          <button onClick={() => setZoom((z) => Math.min(160, z + 10))} aria-label="بزرگ‌نمایی">
            <Icon name="lucide:plus" size={15} style={{ backgroundColor: muted }} />
          </button>
        </span>

        <button
          onClick={() => setNight((v) => !v)}
          aria-pressed={night}
          className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[12px] font-bold transition-colors"
          style={{ borderColor: skin.border, color: skin.text }}
        >
          <Icon name={night ? 'lucide:sun' : 'lucide:moon'} size={15} />
          <span>نمایش</span>
        </button>

        <span className="flex-1" />

        <button
          className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[12px] font-bold"
          style={{ borderColor: skin.border, color: skin.text }}
        >
          <Icon name="lucide:share-2" size={15} />
          <span>اشتراک گذاری</span>
        </button>

        <Link
          href={`/books/${book.id}`}
          aria-label="بازگشت به صفحه کتاب"
          className="w-10 h-10 rounded-xl border flex items-center justify-center"
          style={{ borderColor: skin.border }}
        >
          <Icon name="lucide:ellipsis" size={16} style={{ backgroundColor: muted }} />
        </Link>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* ── Tool rail — right under RTL ───────────────────── */}
        <nav
          aria-label="ابزارهای مطالعه"
          className="order-1 flex lg:flex-col gap-2 p-3 overflow-x-auto lg:overflow-visible border-b lg:border-b-0 lg:border-l shrink-0"
          style={{ backgroundColor: skin.panel, borderColor: skin.border }}
        >
          {readerRail.map((r) => {
            const isNight = r.id === 'night';
            const on = isNight && night;
            return (
              <button
                key={r.id}
                onClick={isNight ? () => setNight((v) => !v) : undefined}
                aria-pressed={isNight ? night : undefined}
                className="relative w-[64px] shrink-0 flex flex-col items-center gap-1 rounded-xl py-2.5 transition-colors"
                style={{
                  backgroundColor: r.id === 'agent' ? (night ? '#2A1B54' : '#F3EDFF') : on ? (night ? '#132043' : '#EFF4FF') : 'transparent',
                }}
              >
                {r.badge && (
                  <span
                    className="absolute -top-1 right-1 text-[8.5px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{ backgroundColor: '#F5A524', color: '#3A2600' }}
                  >
                    {r.badge}
                  </span>
                )}
                <Icon
                  name={r.icon}
                  size={19}
                  style={{ backgroundColor: r.id === 'agent' ? '#7C3AED' : on ? BLUE : muted }}
                />
                <span
                  className="text-[9.5px] font-bold"
                  style={{ color: r.id === 'agent' ? '#7C3AED' : on ? BLUE : muted }}
                >
                  {r.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ── The spread ────────────────────────────────────── */}
        <main className="order-2 flex-1 min-w-0 p-4 sm:p-8">
          <div
            className={`mx-auto grid gap-5 ${twoUp ? 'lg:grid-cols-2' : 'max-w-[680px]'}`}
            style={{ maxWidth: twoUp ? `${(1180 * zoom) / 100}px` : `${(680 * zoom) / 100}px` }}
          >
            {/* Chapter opener — right-hand sheet */}
            <article
              className="rounded-2xl border p-8 flex flex-col"
              style={{ backgroundColor: skin.panel, borderColor: skin.border }}
            >
              <p className="text-[12.5px] text-center mb-4" style={{ color: muted }}>
                {readerSpread.right.kicker}
              </p>
              <h1
                className="text-[24px] font-black text-center leading-[1.9] whitespace-pre-line mb-6"
                style={{ color: night ? '#DCE4F7' : '#16305B' }}
              >
                {readerSpread.right.title}
              </h1>
              <span className="w-16 h-[3px] rounded-full mx-auto mb-8" style={{ backgroundColor: BLUE }} />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={readerSpread.right.art} alt="" className="w-[72%] mx-auto mb-8" />

              <blockquote
                className="relative text-[12.5px] font-bold leading-9 text-center whitespace-pre-line px-6 mt-auto"
                style={{ color: BLUE }}
              >
                <span className="absolute right-0 top-0 text-[22px] opacity-40">”</span>
                {readerSpread.right.quote}
                <span className="absolute left-0 bottom-0 text-[22px] opacity-40">“</span>
              </blockquote>

              <p className="text-[11px] mt-8 text-center tabular-nums" style={{ color: muted }}>
                {toPersian(readerSpread.right.number)}
              </p>
            </article>

            {/* Running text — left-hand sheet */}
            {twoUp && (
              <article
                className="rounded-2xl border p-8 flex flex-col"
                style={{ backgroundColor: skin.panel, borderColor: skin.border }}
              >
                <p className="text-[20px] font-black text-center mb-2" dir="ltr" style={{ color: night ? '#DCE4F7' : '#16305B' }}>
                  {readerSpread.left.heading}
                </p>
                <h2
                  className="text-[17px] font-black text-center leading-9 mb-7"
                  style={{ color: night ? '#DCE4F7' : '#16305B' }}
                >
                  {readerSpread.left.title}
                </h2>

                {readerSpread.left.paragraphs.map((p) => (
                  <p key={p} className="text-[12.5px] leading-9 text-justify mb-5" style={{ color: night ? '#B9C4DC' : '#4B5568' }}>
                    {p}
                  </p>
                ))}

                <div
                  className="rounded-xl p-4 mb-7"
                  style={{ backgroundColor: night ? '#132043' : '#EFF4FF' }}
                >
                  <p className="flex items-center gap-2 text-[12px] font-black mb-2" style={{ color: BLUE }}>
                    <Icon name="lucide:lightbulb" size={15} style={{ backgroundColor: BLUE }} />
                    <span>{readerSpread.left.note.title}</span>
                  </p>
                  <p className="text-[11.5px] leading-8" style={{ color: night ? '#A8B6D6' : '#41527A' }}>
                    {readerSpread.left.note.body}
                  </p>
                </div>

                <div className="mt-auto">
                  <p className="flex items-center gap-2 text-[12.5px] font-black mb-3" style={{ color: night ? '#DCE4F7' : '#16305B' }}>
                    <Icon name="lucide:circle-help" size={15} style={{ backgroundColor: BLUE }} />
                    <span>{readerSpread.left.questions.title}</span>
                  </p>
                  <ul className="space-y-2.5">
                    {readerSpread.left.questions.items.map((q) => (
                      <li key={q} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: BLUE }} />
                        <span className="text-[11.5px] leading-7" style={{ color: night ? '#B9C4DC' : '#4B5568' }}>
                          {q}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[11px] mt-8 text-center tabular-nums" style={{ color: muted }}>
                  {toPersian(readerSpread.left.number)}
                </p>
              </article>
            )}
          </div>
        </main>

        {/* ── Contents panel — left under RTL ───────────────── */}
        <aside
          className="order-3 w-full lg:w-[300px] shrink-0 border-t lg:border-t-0 lg:border-r flex flex-col"
          style={{ backgroundColor: skin.panel, borderColor: skin.border }}
        >
          {/* Book identity */}
          <div className="flex items-start gap-3 p-4 border-b" style={{ borderColor: skin.border }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={readerMeta.thumb} alt="" className="w-[54px] rounded-md shrink-0" />
            <div className="flex-1 min-w-0 text-right">
              <p className="text-[12.5px] font-black leading-7 line-clamp-2" style={{ color: night ? '#DCE4F7' : '#16305B' }}>
                {book.title}
              </p>
              <p className="text-[11px] mt-1" style={{ color: muted }}>
                {book.author}
              </p>
            </div>
          </div>

          <div className="px-4 py-3 border-b" style={{ borderColor: skin.border }}>
            <p className="flex items-center justify-between text-[11px] mb-2" style={{ color: muted }}>
              <span className="tabular-nums" dir="ltr">
                {progress}%
              </span>
              <span>پیشرفت مطالعه</span>
            </p>
            <span className="block h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: night ? '#26304A' : '#E7EBF5' }} dir="ltr">
              <span className="block h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: BLUE }} />
            </span>
          </div>

          {/* Panel tabs */}
          <div className="flex" style={{ borderBottom: `1px solid ${skin.border}` }}>
            {(['contents', 'notes'] as const).map((t) => {
              const on = panel === t;
              return (
                <button
                  key={t}
                  onClick={() => setPanel(t)}
                  aria-pressed={on}
                  className="flex-1 py-3 text-[12.5px] font-bold transition-colors border-b-2"
                  style={{ color: on ? BLUE : muted, borderColor: on ? BLUE : 'transparent' }}
                >
                  {t === 'contents' ? 'فهرست مطالب' : 'یادداشت‌ها'}
                </button>
              );
            })}
          </div>

          {panel === 'contents' ? (
            <>
              <div className="p-3">
                <span className="relative block">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    placeholder="جستجو در فهرست مطالب"
                    aria-label="جستجو در فهرست مطالب"
                    className="w-full rounded-xl border py-2.5 pr-4 pl-9 text-[12px] focus:outline-none"
                    style={{ borderColor: skin.border, backgroundColor: night ? '#0F1522' : '#F7F8FC', color: skin.text }}
                  />
                  <Icon
                    name="lucide:search"
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ backgroundColor: muted }}
                  />
                </span>
              </div>

              <ul className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5">
                {sections.map((s) => {
                  const open = openSection.includes(s.id);
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => {
                          setActive(s.id);
                          setPage(s.page);
                          if (s.children)
                            setOpenSection((o) =>
                              o.includes(s.id) ? o.filter((x) => x !== s.id) : [...o, s.id]
                            );
                        }}
                        className="w-full flex items-start gap-2 rounded-lg px-2.5 py-2.5 text-right transition-colors"
                        style={{ backgroundColor: active === s.id ? (night ? '#132043' : '#EFF4FF') : 'transparent' }}
                      >
                        {s.children && (
                          <Icon
                            name="lucide:chevron-down"
                            size={14}
                            className={`shrink-0 mt-0.5 transition-transform ${open ? '' : '-rotate-90'}`}
                            style={{ backgroundColor: muted }}
                          />
                        )}
                        <span className="flex-1">
                          <span className="block text-[12px] font-bold leading-7" style={{ color: night ? '#DCE4F7' : '#16305B' }}>
                            {s.title}
                          </span>
                          <span className="block text-[10.5px] mt-0.5" style={{ color: muted }}>
                            {toPersian(s.page)} صفحه
                          </span>
                        </span>
                      </button>

                      {s.children && open && (
                        <ul className="pr-4 space-y-0.5">
                          {s.children.map((c) => (
                            <li key={c.id}>
                              <button
                                onClick={() => {
                                  setActive(c.id);
                                  setPage(c.page);
                                }}
                                className="w-full rounded-lg px-2.5 py-2 text-right transition-colors"
                                style={{
                                  backgroundColor: active === c.id ? (night ? '#132043' : '#EFF4FF') : 'transparent',
                                  borderRight: active === c.id ? `2px solid ${BLUE}` : '2px solid transparent',
                                }}
                              >
                                <span
                                  className="block text-[11.5px] leading-7"
                                  style={{ color: active === c.id ? BLUE : night ? '#B9C4DC' : '#4B5568' }}
                                >
                                  {c.title}
                                </span>
                                <span className="block text-[10.5px] mt-0.5" style={{ color: muted }}>
                                  {toPersian(c.page)} صفحه
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
              <Icon name="lucide:pencil-line" size={26} style={{ backgroundColor: muted }} />
              <p className="text-[12.5px] font-bold mt-3 mb-1" style={{ color: night ? '#DCE4F7' : '#16305B' }}>
                هنوز یادداشتی ندارید
              </p>
              <p className="text-[11.5px] leading-7" style={{ color: muted }}>
                متنی را انتخاب کنید و یادداشت بگذارید تا اینجا جمع شود.
              </p>
            </div>
          )}

          <div className="p-3 border-t" style={{ borderColor: skin.border }}>
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-bold"
              style={{ backgroundColor: night ? '#132043' : '#F1F4FB', color: night ? '#DCE4F7' : '#16305B' }}
            >
              <Icon name="lucide:download" size={15} />
              <span>{readerMeta.downloadCta}</span>
            </button>
          </div>
        </aside>
      </div>

      {/* ── Foot: the page-turn ─────────────────────────────── */}
      <footer
        className="border-t px-4 py-3 flex items-center gap-4 flex-wrap"
        style={{ backgroundColor: skin.panel, borderColor: skin.border }}
      >
        <button
          aria-label="صفحه بعد"
          onClick={() => step(twoUp ? 2 : 1)}
          className="w-10 h-10 rounded-xl border flex items-center justify-center"
          style={{ borderColor: skin.border }}
        >
          <Icon name="lucide:chevrons-right" size={16} style={{ backgroundColor: muted }} />
        </button>

        <span
          className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[12px] font-bold"
          style={{ borderColor: skin.border }}
        >
          <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: muted }} />
          <span>{readerMeta.chapterLabel}</span>
        </span>

        <button
          aria-label="صفحه قبل"
          onClick={() => step(twoUp ? -2 : -1)}
          className="w-10 h-10 rounded-xl border flex items-center justify-center"
          style={{ borderColor: skin.border }}
        >
          <Icon name="lucide:chevrons-left" size={16} style={{ backgroundColor: muted }} />
        </button>

        <span className="text-[12px] tabular-nums" style={{ color: muted }}>
          صفحه {toPersian(page)} از {toPersian(total)}
        </span>

        <label className="flex-1 min-w-[160px] flex items-center gap-3">
          <span className="sr-only">پیمایش صفحات</span>
          <input
            type="range"
            min={1}
            max={total}
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            className="flex-1 accent-blue-700"
            dir="ltr"
          />
        </label>

        <span className="flex items-center gap-2 text-[12px] font-bold" style={{ color: night ? '#DCE4F7' : '#16305B' }}>
          <Icon name="lucide:trending-up" size={15} style={{ backgroundColor: BLUE }} />
          <span className="tabular-nums" dir="ltr">
            {progress}%
          </span>
          <span>پیشرفت مطالعه</span>
        </span>
      </footer>
    </div>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
