'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs, Stars } from '@/components/free/FreeBits';
import { freeTheme } from '@/data/free';
import {
  booksHero,
  bookChips,
  bookFacets,
  books,
  booksSearchLabel,
  totalBooks,
  type Book,
  type BookChip,
} from '@/data/books';

/* ──────────────────────────────────────────────────────────────
   /books — the catalogue.

   Covers carry the page: the grid is a shelf, so each card leads
   with its jacket and everything else stays quiet beneath it.
────────────────────────────────────────────────────────────── */

const VIOLET = '#6D28D9';

export default function BooksPage() {
  const [query, setQuery] = useState('');
  const [chip, setChip] = useState<BookChip>('newest');
  const [open, setOpen] = useState<string[]>(['topic']);
  const [picked, setPicked] = useState<Record<string, string | null>>({});

  const results = useMemo(() => {
    const q = query.trim();
    return books.filter((b) => {
      const byQuery = !q || b.title.includes(q) || b.author.includes(q);
      const byChip =
        chip === 'all' || chip === 'newest' ? true : chip === 'free' ? b.access === 'free' : b.access === 'premium';
      const byTopic = !picked.topic || b.topicId === picked.topic;
      const byYear = !picked.year || b.yearId === picked.year;
      const byFormat = !picked.format || b.formatId === picked.format;
      const byPopularity = !picked.popularity || b.popularityId === picked.popularity;
      return byQuery && byChip && byTopic && byYear && byFormat && byPopularity;
    });
  }, [query, chip, picked]);

  const toggleFacet = (id: string) =>
    setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  const pick = (facet: string, item: string) =>
    setPicked((p) => ({ ...p, [facet]: p[facet] === item ? null : item }));

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={booksHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 overflow-hidden grid lg:grid-cols-2 items-center"
            style={{ background: 'linear-gradient(255deg,#EFEBFE 0%,#F6F4FF 55%,#FFFFFF 100%)' }}
          >
            <div className="order-1 px-6 sm:px-10 py-9 text-right">
              <h1
                className="text-[26px] sm:text-[36px] font-black leading-[1.6] mb-5"
                style={{ color: freeTheme.navy }}
              >
                {booksHero.title}
                <br />
                <span style={{ color: VIOLET }}>{booksHero.titleAccent}</span>
                {booksHero.titleRest}
              </h1>
              {booksHero.desc.map((line) => (
                <p key={line} className="text-[13.5px] text-gray-600 leading-9">
                  {line}
                </p>
              ))}
            </div>

            <div className="order-2 h-full flex items-center justify-center p-6">
              {/* Capped at the artwork's own resolution so it stays crisp. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={booksHero.art} alt="" className="w-full max-w-[358px] object-contain" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[290px_1fr] gap-6 items-start">
          {/* Results column */}
          <div className="order-1 lg:order-2">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-6">
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                {bookChips.map((c) => {
                  const on = chip === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setChip(c.id)}
                      aria-pressed={on}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-[12.5px] font-bold border transition-all"
                      style={
                        on
                          ? {
                              background: `linear-gradient(120deg,#8B5CF6,${VIOLET})`,
                              borderColor: 'transparent',
                              color: '#fff',
                            }
                          : { backgroundColor: '#fff', borderColor: freeTheme.border, color: freeTheme.navy }
                      }
                    >
                      <Icon
                        name={c.icon}
                        size={15}
                        style={{ backgroundColor: on ? '#fff' : c.id === 'free' ? '#16A34A' : freeTheme.orange }}
                      />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder={booksSearchLabel}
                  aria-label={booksSearchLabel}
                  className="w-full bg-white border rounded-xl py-3 pr-5 pl-11 text-[12.5px] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
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
                {results.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl border py-20 text-center"
                style={{ borderColor: freeTheme.border }}
              >
                <Icon name="lucide:book-open" size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="font-bold text-gray-600 mb-1">کتابی یافت نشد</h3>
                <p className="text-[13px] text-gray-400">فیلترها یا عبارت جستجو را تغییر دهید</p>
              </div>
            )}

            <Pager />

            <p className="text-center text-[12.5px] font-bold mt-4" style={{ color: freeTheme.navy }}>
              نمایش ۱ تا {toPersian(results.length)} از {totalBooks} کتاب
            </p>
          </div>

          {/* Facets */}
          <aside className="order-2 lg:order-1 space-y-4 lg:sticky lg:top-28">
            {bookFacets.map((f) => {
              const isOpen = open.includes(f.id);
              return (
                <section
                  key={f.id}
                  className="bg-white rounded-2xl border overflow-hidden"
                  style={{ borderColor: freeTheme.border }}
                >
                  <button
                    onClick={() => toggleFacet(f.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-2 px-4 py-4"
                  >
                    <Icon
                      name="lucide:chevron-down"
                      size={15}
                      className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                    <span className="flex-1 text-right text-[13.5px] font-black" style={{ color: freeTheme.navy }}>
                      {f.title}
                    </span>
                    <Icon name={f.icon} size={17} style={{ backgroundColor: VIOLET }} />
                  </button>

                  {isOpen && (
                    <ul className="px-3 pb-3 space-y-1">
                      {f.items.map((it) => {
                        const on = picked[f.id] === it.id;
                        return (
                          <li key={it.id}>
                            <button
                              onClick={() => pick(f.id, it.id)}
                              aria-pressed={on}
                              className="w-full flex items-center gap-3 py-2.5 px-2 rounded-lg transition-colors hover:bg-gray-50"
                              style={on ? { backgroundColor: '#F5F1FE' } : undefined}
                            >
                              <span
                                className="w-4 h-4 rounded border shrink-0 flex items-center justify-center"
                                style={{
                                  borderColor: on ? VIOLET : '#D5D8E6',
                                  backgroundColor: on ? VIOLET : '#fff',
                                }}
                              >
                                {on && <Icon name="lucide:check" size={11} className="text-white" />}
                              </span>

                              <span className="flex-1 text-right">
                                {f.kind === 'stars' ? (
                                  <span className="flex items-center justify-end gap-2">
                                    <span className="text-[12px]" style={{ color: freeTheme.navy }}>
                                      {it.label}
                                    </span>
                                    <Stars value={it.stars ?? 0} size={12} />
                                  </span>
                                ) : (
                                  <span className="text-[12.5px]" style={{ color: freeTheme.navy }}>
                                    {it.label}
                                  </span>
                                )}
                              </span>

                              <span
                                className="text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-md"
                                style={{ color: '#7A819A', backgroundColor: '#F2F3F9' }}
                              >
                                {toPersian(it.count)}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </aside>
        </div>
      </div>
    </SharedPageLayout>
  );
}

/* ── Card ───────────────────────────────────────────────────── */

const badgeStyle: Record<string, { label: string; bg: string; color: string }> = {
  free: { label: 'رایگان', bg: '#16A34A', color: '#fff' },
  premium: { label: 'ویژه', bg: '#F97316', color: '#fff' },
  print: { label: 'چاپی', bg: '#F4E7D4', color: '#8A6A3A' },
  new: { label: 'جدید', bg: '#FACC15', color: '#553D00' },
};

function BookCard({ book }: { book: Book }) {
  const digital = book.medium === 'digital';
  const green = book.access === 'free';

  return (
    <article
      data-tilt
      className="group bg-white rounded-2xl border p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
      style={{ borderColor: freeTheme.border }}
    >
      <div className="relative mb-4">
        <Link href={`/books/${book.id}`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.cover}
            alt={book.title}
            loading="lazy"
            className="w-full aspect-[3/4] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <span className="absolute top-0 right-0 flex flex-col items-start gap-1.5">
          {book.badges.map((b) => (
            <span
              key={b}
              className="text-[10.5px] font-bold px-2.5 py-1 rounded-md"
              style={{ backgroundColor: badgeStyle[b].bg, color: badgeStyle[b].color }}
            >
              {badgeStyle[b].label}
            </span>
          ))}
        </span>
      </div>

      <h3 className="text-[13.5px] font-black leading-7 text-center mb-3">
        <Link
          href={`/books/${book.id}`}
          className="transition-colors group-hover:text-orange-500"
          style={{ color: freeTheme.navy }}
        >
          {book.title}
        </Link>
      </h3>

      <p className="text-[11.5px] text-center mb-3" style={{ color: green ? '#16A34A' : VIOLET }}>
        نویسنده: {book.author}
      </p>

      <p className="flex items-center justify-center gap-2 text-[11px] text-gray-500 mb-4">
        <span>{toPersian(book.pages)} صفحه</span>
        <span className="text-gray-300">·</span>
        <span className="font-bold" style={{ color: freeTheme.navy }}>
          {digital ? 'کتاب دیجیتال' : 'کتاب چاپی'}
        </span>
      </p>

      <div className="mt-auto flex items-center gap-2">
        <Link
          href={digital ? `/books/${book.id}/read` : `/books/${book.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 border rounded-xl py-2.5 text-[11.5px] font-bold transition-colors"
          style={
            green
              ? { color: '#16A34A', borderColor: '#A6DFC0' }
              : { color: VIOLET, borderColor: '#CDBEF5' }
          }
        >
          <span>{digital ? 'مطالعه کتاب' : 'مشاهده و خرید کتاب'}</span>
        </Link>

        <button
          aria-label="ذخیره در علاقه‌مندی‌ها"
          className="w-10 h-10 rounded-xl border flex items-center justify-center transition-colors hover:border-orange-300 shrink-0"
          style={{ borderColor: freeTheme.border }}
        >
          <Icon name="lucide:bookmark" size={16} className="text-gray-400" />
        </button>
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
        style={{ borderColor: freeTheme.border }}
      >
        <Icon name="lucide:chevron-left" size={16} style={{ backgroundColor: freeTheme.navy }} />
      </button>

      {['1', '2', '3', '4', '5', '…', '12'].map((n, i) =>
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
                ? { backgroundColor: VIOLET, borderColor: VIOLET, color: '#fff' }
                : { backgroundColor: '#fff', borderColor: freeTheme.border, color: freeTheme.navy }
            }
          >
            {n}
          </button>
        )
      )}

      <button
        aria-label="صفحه بعد"
        className={`${cell} bg-white hover:border-violet-300`}
        style={{ borderColor: freeTheme.border }}
      >
        <Icon name="lucide:chevron-right" size={16} style={{ backgroundColor: freeTheme.navy }} />
      </button>
    </nav>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
