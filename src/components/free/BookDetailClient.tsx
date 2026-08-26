'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Stars } from '@/components/free/FreeBits';
import { freeTheme, tones, toLatinNumber } from '@/data/free';
import {
  bookDetailTabs,
  bookAiPanel,
  bookLearningPath,
  type BookDetail,
  type BookTab,
} from '@/data/books';

/* ──────────────────────────────────────────────────────────────
   A single book. Everything is driven by `book`, so every id in
   the catalogue renders this exact layout.
────────────────────────────────────────────────────────────── */

const VIOLET = '#6D28D9';
const GREEN = '#16A34A';

export default function BookDetailClient({ book }: { book: BookDetail }) {
  return (
    <div style={{ backgroundColor: freeTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        <Hero book={book} />

        {/* RTL: the first column is the right-hand one, and the agent card
            belongs beside the tabs on the right, as in the mockup. */}
        <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-5 items-start">
          <AiPanel />
          <TabsPanel book={book} />
        </div>

        <Articles book={book} />
        <Columns book={book} />
        <PathBanner />
        <Feedback book={book} />
      </div>
    </div>
  );
}

/* ── Hero: cover, title, specs, actions, versions ───────────── */

function Hero({ book }: { book: BookDetail }) {
  return (
    <section className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-5 items-start">
      {/* Score + versions — first child, so the column lands on the right. */}
      <div className="order-1 space-y-5">
        <div
          className="bg-white rounded-2xl border p-6 text-center"
          style={{ borderColor: freeTheme.border }}
        >
          <p className="text-[40px] font-black leading-none mb-3" style={{ color: freeTheme.navy }}>
            {book.ratingScore}
          </p>
          <span className="flex justify-center mb-2">
            <Stars value={toLatinNumber(book.ratingScore)} size={20} />
          </span>
          <p className="text-[11.5px] text-gray-400">({book.ratingCount} نظر)</p>
        </div>

        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
          <h2 className="text-[14px] font-black text-center mb-4" style={{ color: freeTheme.navy }}>
            نسخه‌ها
          </h2>
          <ul className="space-y-3">
            {book.versions.map((v) => {
              const tone = tones[v.tone];
              return (
                <li
                  key={v.id}
                  className="flex items-center gap-3 rounded-xl border p-3.5"
                  style={{ borderColor: freeTheme.border }}
                >
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: tone.bg }}
                  >
                    <Icon name={v.icon} size={17} style={{ backgroundColor: tone.text }} />
                  </span>
                  <span className="flex-1 text-right">
                    <span className="block text-[12.5px] font-bold" style={{ color: freeTheme.navy }}>
                      {v.label}
                    </span>
                    <span
                      className="block text-[11.5px] font-bold mt-0.5"
                      style={{ color: v.price === 'رایگان' ? GREEN : tone.text }}
                    >
                      {v.price}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className="order-2 bg-white rounded-2xl border overflow-hidden grid md:grid-cols-[minmax(0,1fr)_300px]"
        style={{ borderColor: freeTheme.border }}
      >
        {/* Copy first, cover second: the jacket sits on the left, as drawn. */}
        <div className="order-2 relative p-5 flex items-center justify-center bg-gradient-to-b from-[#F3F5FD] to-white">
          <span className="absolute top-4 right-4 flex flex-col items-start gap-2 z-10">
            {book.ribbons.map((r, i) => (
              <span
                key={r}
                className="flex items-center gap-1.5 text-[10.5px] font-bold px-2.5 py-1 rounded-md border"
                style={
                  i === 0
                    ? { color: GREEN, backgroundColor: '#E7F7EF', borderColor: '#BFE8D2' }
                    : { color: VIOLET, backgroundColor: '#F1E9FE', borderColor: '#DCCDFA' }
                }
              >
                <Icon name={i === 0 ? 'lucide:file-text' : 'lucide:flame'} size={12} />
                <span>{r}</span>
              </span>
            ))}
          </span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.detailCover} alt={book.title} className="w-[190px] max-w-full drop-shadow-xl" />
        </div>

        <div className="order-1 px-6 py-7 text-right">
          <h1
            className="text-[22px] sm:text-[28px] font-black leading-[1.6] mb-2"
            style={{ color: freeTheme.navy }}
          >
            {book.title}
          </h1>
          <p className="text-[14px] text-gray-600 leading-8 mb-5">{book.subtitle}</p>

          <p className="text-[12.5px] text-gray-500 mb-1.5">
            نویسنده: <span style={{ color: freeTheme.navy }}>{book.author}</span>
          </p>
          <p className="text-[12.5px] text-gray-500 mb-6">
            مترجم: <span style={{ color: freeTheme.navy }}>{book.translator}</span>
          </p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 mb-7">
            {book.specs.map((s) => (
              <div key={s.label} className="text-center">
                <dt
                  className="flex items-center justify-center gap-1.5 text-[11.5px] font-bold mb-2"
                  style={{ color: freeTheme.navy }}
                >
                  <Icon name={s.icon} size={14} style={{ backgroundColor: GREEN }} />
                  <span>{s.label}</span>
                </dt>
                <dd className="text-[11.5px] text-gray-500">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={book.readCta.href}
              data-ripple
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              <Icon name="lucide:book-open" size={16} className="text-white" />
              <span>{book.readCta.label}</span>
            </Link>

            <Link
              href={book.sampleCta.href}
              className="flex items-center gap-2 rounded-xl border px-5 py-3.5 text-[12.5px] font-bold transition-colors hover:border-orange-300"
              style={{ borderColor: freeTheme.border, color: freeTheme.navy }}
            >
              <Icon name="lucide:download" size={15} />
              <span>{book.sampleCta.label}</span>
            </Link>

            <button
              className="flex items-center gap-2 rounded-xl border px-5 py-3.5 text-[12.5px] font-bold transition-colors hover:border-rose-300"
              style={{ borderColor: freeTheme.border, color: freeTheme.navy }}
            >
              <Icon name="lucide:heart" size={15} />
              <span>افزودن به علاقه‌مندی</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

/* ── Tabs ───────────────────────────────────────────────────── */

function TabsPanel({ book }: { book: BookDetail }) {
  const [tab, setTab] = useState<BookTab>('about');

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {bookDetailTabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={on}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-t-xl text-[12.5px] font-bold transition-all border-b-2 ${
                on ? 'bg-white' : 'bg-white/60 hover:bg-white'
              }`}
              style={{ color: freeTheme.navy, borderColor: on ? GREEN : 'transparent' }}
            >
              <Icon name={t.icon} size={15} style={{ backgroundColor: on ? GREEN : '#9AA3B8' }} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <section
        className="bg-white rounded-2xl border p-6 -mt-[2px]"
        style={{ borderColor: freeTheme.border }}
      >
        <h2
          className="flex items-center gap-2 text-[15px] font-black mb-5"
          style={{ color: freeTheme.navy }}
        >
          <Icon name="lucide:info" size={17} style={{ backgroundColor: freeTheme.blue }} />
          <span>{bookDetailTabs.find((t) => t.id === tab)?.label}</span>
        </h2>

        {tab === 'about' &&
          book.about.map((p) => (
            <p key={p} className="text-[12.5px] text-gray-600 leading-9 mb-4 text-right">
              {p}
            </p>
          ))}

        {tab === 'learn' && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {book.learn.map((it) => (
              <li key={it} className="flex items-start gap-2.5">
                <Icon
                  name="lucide:circle-check"
                  size={16}
                  className="shrink-0 mt-1"
                  style={{ backgroundColor: GREEN }}
                />
                <span className="text-[12px] text-gray-600 leading-7 text-right">{it}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'features' && (
          <ul className="space-y-3">
            {book.features.map((it) => (
              <li key={it} className="flex items-start gap-2.5">
                <Icon
                  name="lucide:sparkles"
                  size={15}
                  className="shrink-0 mt-1"
                  style={{ backgroundColor: VIOLET }}
                />
                <span className="text-[12.5px] text-gray-600 leading-8 text-right">{it}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'specs' && (
          <dl className="grid sm:grid-cols-2 gap-x-8">
            {book.sheet.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-3 border-b"
                style={{ borderColor: freeTheme.border }}
              >
                <dt className="text-[12px] text-gray-400">{row.label}</dt>
                <dd className="text-[12.5px] font-bold" style={{ color: freeTheme.navy }}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </div>
  );
}

/* ── Ask-the-agent panel ────────────────────────────────────── */

function AiPanel() {
  return (
    <section
      className="rounded-2xl border p-5 h-full"
      style={{ borderColor: '#DEDCF3', backgroundColor: '#F6F5FE' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-1 text-right">
          <h2 className="text-[15px] font-black mb-2" style={{ color: freeTheme.navy }}>
            {bookAiPanel.title}
          </h2>
          <p className="text-[12px] text-gray-600 leading-7">{bookAiPanel.lead}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bookAiPanel.art} alt="" className="w-[79px] shrink-0" />
      </div>

      {bookAiPanel.lines.map((l) => (
        <p key={l} className="text-[12px] text-gray-600 leading-8 text-right">
          {l}
        </p>
      ))}

      <button
        data-ripple
        className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
        style={{ background: `linear-gradient(120deg,#A78BFA,${VIOLET})` }}
      >
        <Icon name="lucide:message-circle" size={15} className="text-white" />
        <span>{bookAiPanel.cta}</span>
      </button>
    </section>
  );
}

/* ── Related articles ───────────────────────────────────────── */

function Articles({ book }: { book: BookDetail }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/articles"
          className="group flex items-center gap-1.5 text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: freeTheme.blue }}
        >
          <span>مشاهده همه</span>
          <Icon name="lucide:arrow-left" size={13} className="transition-transform group-hover:-translate-x-1" />
        </Link>

        <h2 className="flex items-center gap-2 text-[15px] font-black" style={{ color: freeTheme.navy }}>
          <Icon name="lucide:newspaper" size={17} style={{ backgroundColor: freeTheme.blue }} />
          <span>مقالات مرتبط</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {book.articles.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="group rounded-xl border overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ borderColor: freeTheme.border }}
          >
            <span className="relative block aspect-[16/9] bg-gray-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.thumb}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className="absolute bottom-2 right-2 text-[9.5px] font-bold px-2 py-0.5 rounded-md text-white"
                style={{ backgroundColor: VIOLET }}
              >
                مقاله
              </span>
            </span>

            <span className="p-3 flex flex-col flex-1 text-right">
              <span
                className="block text-[12px] font-bold leading-7 mb-2 line-clamp-2 transition-colors group-hover:text-orange-500"
                style={{ color: freeTheme.navy }}
              >
                {a.title}
              </span>
              <span className="block text-[10px] text-gray-400 mb-3">نویسنده: {a.author}</span>
              <span className="mt-auto flex items-center justify-between gap-1 text-[9.5px] text-gray-400">
                <span className="flex items-center gap-1">
                  <Icon name="lucide:clock" size={10} />
                  <span>{a.minutes}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="lucide:calendar" size={10} />
                  <span>{a.date}</span>
                </span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── Related resource columns ───────────────────────────────── */

function Columns({ book }: { book: BookDetail }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {book.columns.map((c) => {
        const tone = tones[c.tone];
        return (
          <section
            key={c.title}
            className="rounded-2xl border p-4 flex flex-col"
            style={{ backgroundColor: tone.soft, borderColor: tone.ring }}
          >
            <h2 className="flex items-center gap-2 mb-1">
              <Icon name={c.icon} size={18} style={{ backgroundColor: tone.text }} />
              <span className="text-[13px] font-black" style={{ color: tone.text }}>
                {c.title}
              </span>
            </h2>
            <p className="text-[10.5px] text-gray-500 mb-4">{c.subtitle}</p>

            <ul className="space-y-2.5 mb-4">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: tone.text }}
                  />
                  <span className="text-[11.5px] text-gray-600 leading-6 text-right">{it}</span>
                </li>
              ))}
            </ul>

            <Link
              href={c.href}
              className="group mt-auto flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11.5px] font-bold transition-colors"
              style={{ color: tone.text, backgroundColor: tone.bg }}
            >
              <span>{c.cta}</span>
              <Icon
                name="lucide:arrow-left"
                size={13}
                className="transition-transform group-hover:-translate-x-1"
              />
            </Link>
          </section>
        );
      })}
    </div>
  );
}

/* ── Learning path ──────────────────────────────────────────── */

function PathBanner() {
  return (
    <section
      className="rounded-2xl border p-5 flex flex-col md:flex-row items-center gap-6"
      style={{ borderColor: '#DEDCF3', backgroundColor: '#F6F5FE' }}
    >
      <div className="flex-1 text-center md:text-right order-1">
        <h2 className="text-[17px] font-black mb-2" style={{ color: freeTheme.navy }}>
          {bookLearningPath.title}
        </h2>
        <p className="text-[12.5px] text-gray-500 leading-8">{bookLearningPath.desc}</p>
      </div>

      <Link
        href={bookLearningPath.href}
        data-ripple
        className="group order-3 md:order-2 flex items-center gap-2 rounded-xl px-6 py-3.5 text-[13px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#7C3AED' }}
      >
        <Icon name="lucide:route" size={16} className="text-white" />
        <span>{bookLearningPath.cta}</span>
        <Icon
          name="lucide:arrow-left"
          size={15}
          className="text-white transition-transform group-hover:-translate-x-1"
        />
      </Link>

      <div className="order-2 md:order-3 w-[114px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bookLearningPath.art} alt="" className="w-full" />
      </div>
    </section>
  );
}

/* ── Reviews, rating form, distribution, score ──────────────── */

function Feedback({ book }: { book: BookDetail }) {
  const [given, setGiven] = useState(0);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
          آخرین نظرات کاربران
        </h2>
        <ul className="space-y-4">
          {book.reviews.map((r) => (
            <li key={r.name} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0" />
              <div className="flex-1 min-w-0 text-right">
                <p className="flex items-center gap-2 mb-0.5">
                  <span className="text-[12.5px] font-bold" style={{ color: freeTheme.navy }}>
                    {r.name}
                  </span>
                  <Stars value={r.stars} size={11} />
                </p>
                <p className="text-[10px] text-orange-500 mb-1">{r.role}</p>
                <p className="text-[11px] text-gray-600 leading-7">{r.text}</p>
                <p className="text-[10px] text-gray-400 mt-1">{r.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Rate it — the one place on the page that takes input. */}
      <div
        className="bg-white rounded-2xl border p-5 flex flex-col text-center"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-2" style={{ color: freeTheme.navy }}>
          ثبت نظر شما
        </h2>
        <p className="text-[11.5px] text-gray-500 leading-8 mb-4">
          تجربه شما از این کتاب می‌تواند به دیگران کمک کند
        </p>

        <div className="flex items-center justify-center gap-1.5 mb-5" dir="ltr">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setGiven(n)}
              aria-label={`${n} ستاره`}
              aria-pressed={given === n}
              className="transition-transform hover:scale-110"
            >
              <Icon
                name="lucide:star"
                size={26}
                style={{ backgroundColor: n <= given ? '#F5A524' : '#E2E5EF' }}
              />
            </button>
          ))}
        </div>

        <button
          className="mt-auto flex items-center justify-center gap-2 border rounded-xl py-3 text-[12.5px] font-bold transition-colors hover:bg-violet-50"
          style={{ color: VIOLET, borderColor: '#CDBEF5' }}
        >
          <Icon name="lucide:pencil-line" size={15} />
          <span>ثبت نظر</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
        <h2 className="text-[14px] font-black mb-5 text-center" style={{ color: freeTheme.navy }}>
          توزیع امتیازات
        </h2>
        <ul className="space-y-3">
          {book.bars.map((b) => (
            <li key={b.stars} className="flex items-center gap-3">
              <span className="text-[11px] text-gray-400 shrink-0 w-12 text-right">
                {toPersian(b.stars)} ستاره
              </span>
              <span className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${b.pct}%`, backgroundColor: '#F5A524' }}
                />
              </span>
              <span className="text-[11px] font-bold text-gray-500 w-10 tabular-nums shrink-0" dir="ltr">
                {b.pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="bg-white rounded-2xl border p-5 flex flex-col items-center justify-center text-center"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4" style={{ color: freeTheme.navy }}>
          امتیاز کاربران
        </h2>
        <p className="text-[42px] font-black leading-none mb-3" style={{ color: freeTheme.navy }}>
          {book.ratingScore}
        </p>
        <Stars value={toLatinNumber(book.ratingScore)} size={22} />
        <p className="text-[11.5px] text-gray-400 mt-3">از مجموع {book.ratingCount} نظر</p>
      </div>
    </section>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
