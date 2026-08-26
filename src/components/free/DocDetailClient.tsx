'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Stars } from '@/components/free/FreeBits';
import { freeTheme, tones, toLatinNumber } from '@/data/free';
import {
  docDetailTabs,
  docAssistant,
  docExperts,
  docLearningPath,
  docFileMeta,
  type DocDetail,
  type DocTab,
} from '@/data/docs';

/* ──────────────────────────────────────────────────────────────
   A single document. The record itself leads: the scan is the
   default tab, because the official text is what people came for
   — the key points and Ariyaz's reading sit beside it, not over it.
────────────────────────────────────────────────────────────── */

const NAVY = '#123B7A';
const BLUE = '#1D4ED8';
const GREEN = '#0E9F6E';

export default function DocDetailClient({ doc }: { doc: DocDetail }) {
  return (
    <div style={{ backgroundColor: freeTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* RTL: the first column is the right-hand one, where the mockup
            puts the assistant and the expert desk. */}
        <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] gap-5 items-start">
          <div className="space-y-5">
            <Assistant />
            <Experts />
          </div>

          <div className="space-y-5">
            <Hero doc={doc} />
            <TabsPanel doc={doc} />
          </div>
        </div>

        <Articles doc={doc} />
        <Columns doc={doc} />
        <PathBanner />
        <Feedback doc={doc} />
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */

function Hero({ doc }: { doc: DocDetail }) {
  const tone = tones[doc.kindTone];
  const file = docFileMeta[doc.file];

  return (
    <section
      className="rounded-2xl border overflow-hidden grid md:grid-cols-[minmax(0,1fr)_260px]"
      style={{ borderColor: '#D7E3F8', background: 'linear-gradient(255deg,#E8F0FE 0%,#F5F9FF 60%,#FFFFFF 100%)' }}
    >
      {/* The record's artwork sits on the left, as drawn. */}
      <div className="order-2 relative p-5 flex items-center justify-center">
        <span
          className="absolute top-4 right-4 text-[10.5px] font-bold px-2.5 py-1 rounded-md"
          style={{ backgroundColor: '#FFF6E5', color: '#8A6A16' }}
        >
          آخرین بروزرسانی: {doc.updated}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={doc.heroArt} alt="" className="w-full max-w-[220px]" />
      </div>

      <div className="order-1 px-6 py-7 text-right">
        <span
          className="inline-block text-[10.5px] font-bold px-2.5 py-1 rounded-md mb-4"
          style={{ color: tone.text, backgroundColor: tone.bg }}
        >
          {doc.kindLabel}
        </span>

        <h1
          className="text-[21px] sm:text-[27px] font-black leading-[1.7] mb-3"
          style={{ color: freeTheme.navy }}
        >
          {doc.title}
        </h1>
        <p className="text-[12.5px] text-gray-600 leading-8 mb-6">{doc.lead}</p>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 mb-7">
          {doc.specs.map((s) => (
            <div key={s.label} className="text-center">
              <dt
                className="flex items-center justify-center gap-1.5 text-[11.5px] font-bold mb-2"
                style={{ color: freeTheme.navy }}
              >
                <Icon name={s.icon} size={14} style={{ backgroundColor: BLUE }} />
                <span>{s.label}</span>
              </dt>
              <dd className="text-[11.5px] text-gray-500">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#"
            data-ripple
            className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: BLUE }}
          >
            <Icon name="lucide:download" size={16} className="text-white" />
            <span>دانلود فایل اصلی</span>
            <span className="text-[10px] font-black opacity-80" dir="ltr">
              {file.label}
            </span>
          </a>

          <a
            href="#scan"
            className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3.5 text-[12.5px] font-bold transition-colors hover:border-blue-300"
            style={{ borderColor: '#C7D6F0', color: NAVY }}
          >
            <Icon name="lucide:eye" size={15} />
            <span>مشاهده آنلاین بخشنامه</span>
          </a>

          <button
            aria-label="ذخیره سند"
            className="w-11 h-11 rounded-xl border bg-white flex items-center justify-center transition-colors hover:border-orange-300"
            style={{ borderColor: '#C7D6F0' }}
          >
            <Icon name="lucide:bookmark" size={16} style={{ backgroundColor: NAVY }} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Tabs: scan / key points / analysis ─────────────────────── */

function TabsPanel({ doc }: { doc: DocDetail }) {
  const [tab, setTab] = useState<DocTab>('scan');
  const [page, setPage] = useState(0);
  const current = doc.scanPages[page];

  return (
    <section id="scan" className="bg-white rounded-2xl border" style={{ borderColor: freeTheme.border }}>
      <div className="flex flex-wrap" style={{ borderBottom: `1px solid ${freeTheme.border}` }}>
        {docDetailTabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={on}
              className="flex items-center gap-2 px-6 py-4 text-[12.5px] font-bold transition-colors border-b-2"
              style={{ color: on ? BLUE : freeTheme.navy, borderColor: on ? BLUE : 'transparent' }}
            >
              <Icon name={t.icon} size={15} style={{ backgroundColor: on ? BLUE : '#9AA3B8' }} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-5">
        {tab === 'scan' && (
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#1B1F27' }}>
            {/* Viewer toolbar — mirrors a PDF reader's controls. */}
            <div
              className="flex items-center gap-3 px-4 py-2.5 flex-wrap"
              style={{ borderBottom: '1px solid #2C3341' }}
            >
              <button aria-label="دانلود" className="p-1.5">
                <Icon name="lucide:download" size={15} className="text-gray-300" />
              </button>
              <button aria-label="چاپ" className="p-1.5">
                <Icon name="lucide:printer" size={15} className="text-gray-300" />
              </button>
              <span className="w-px h-4" style={{ backgroundColor: '#39414F' }} />
              <button
                aria-label="صفحه قبل"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="p-1.5"
              >
                <Icon name="lucide:chevron-right" size={15} className="text-gray-300" />
              </button>
              <span className="text-[11px] text-gray-300 tabular-nums" dir="ltr">
                {current.page} / {doc.scanPages.length}
              </span>
              <button
                aria-label="صفحه بعد"
                onClick={() => setPage((p) => Math.min(doc.scanPages.length - 1, p + 1))}
                className="p-1.5"
              >
                <Icon name="lucide:chevron-left" size={15} className="text-gray-300" />
              </button>
              <span className="flex-1" />
              <button aria-label="جستجو در سند" className="p-1.5">
                <Icon name="lucide:search" size={15} className="text-gray-300" />
              </button>
            </div>

            <div className="flex gap-4 p-4">
              {/* Page thumbnails */}
              <ul className="hidden sm:flex flex-col gap-3 shrink-0">
                {doc.scanPages.map((p, i) => (
                  <li key={p.page}>
                    <button
                      onClick={() => setPage(i)}
                      aria-current={i === page ? 'true' : undefined}
                      className="w-[74px] rounded-sm overflow-hidden block"
                      style={{ outline: i === page ? `2px solid ${BLUE}` : '1px solid #3A4252' }}
                    >
                      <span className="block aspect-[3/4] bg-white p-1.5">
                        <span className="block h-1 w-8 bg-gray-200 mb-1.5 mr-auto" />
                        <span className="block h-1 w-full bg-gray-100 mb-1" />
                        <span className="block h-1 w-full bg-gray-100 mb-1" />
                        <span className="block h-1 w-2/3 bg-gray-100" />
                      </span>
                      <span className="block text-[9.5px] text-gray-300 text-center py-1">
                        {p.page}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* The sheet */}
              <article className="flex-1 bg-white rounded-sm p-6 sm:p-8 min-h-[320px]">
                <header className="text-center mb-6">
                  <Icon name="lucide:hexagon" size={26} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-[11.5px] font-bold" style={{ color: freeTheme.navy }}>
                    {doc.authority}
                  </p>
                </header>

                <p className="text-[12.5px] font-black text-center mb-5" style={{ color: freeTheme.navy }}>
                  {doc.numberLabel}
                </p>

                <dl className="text-[11.5px] space-y-1.5 mb-5" style={{ color: '#4B5568' }}>
                  <div className="flex gap-2">
                    <dt>شماره:</dt>
                    <dd>۳۰۰/۰۳۲۳۳</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>تاریخ:</dt>
                    <dd>{doc.date}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>موضوع:</dt>
                    <dd>{doc.title}</dd>
                  </div>
                </dl>

                {current.lines.map((l) => (
                  <p key={l} className="text-[12px] leading-9 text-justify mb-3" style={{ color: '#4B5568' }}>
                    {l}
                  </p>
                ))}

                <p className="text-[11px] text-gray-400 mt-8 text-center">{current.title}</p>
              </article>
            </div>
          </div>
        )}

        {tab === 'points' && (
          <ul className="space-y-3">
            {doc.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <Icon
                  name="lucide:circle-check"
                  size={16}
                  className="shrink-0 mt-1"
                  style={{ backgroundColor: GREEN }}
                />
                <span className="text-[12.5px] text-gray-600 leading-8 text-right">{p}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'analysis' &&
          doc.analysis.map((p) => (
            <p key={p} className="text-[12.5px] text-gray-600 leading-9 mb-4 text-right">
              {p}
            </p>
          ))}
      </div>
    </section>
  );
}

/* ── Assistant ──────────────────────────────────────────────── */

function Assistant() {
  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: '#D7E3F8', backgroundColor: '#F3F8FF' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-1 text-right">
          <h2 className="text-[14.5px] font-black mb-2" style={{ color: freeTheme.navy }}>
            {docAssistant.title}
          </h2>
          <p className="text-[12px] text-gray-600 leading-7">{docAssistant.desc}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={docAssistant.art} alt="" className="w-[55px] shrink-0" />
      </div>

      <span className="relative block mb-3">
        <input
          type="search"
          placeholder={docAssistant.placeholder}
          aria-label={docAssistant.placeholder}
          className="w-full bg-white border rounded-xl py-3 pr-4 pl-10 text-[11.5px] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          style={{ borderColor: '#CFDDF5' }}
        />
        <Icon
          name="lucide:search"
          size={15}
          className="text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </span>

      <button
        data-ripple
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: BLUE }}
      >
        <Icon name="lucide:message-circle" size={15} className="text-white" />
        <span>{docAssistant.cta}</span>
      </button>
    </section>
  );
}

/* ── Experts ────────────────────────────────────────────────── */

function Experts() {
  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: '#BFE6D3', backgroundColor: '#F1FAF5' }}
    >
      <h2
        className="flex items-center gap-2 text-[14.5px] font-black mb-2"
        style={{ color: freeTheme.navy }}
      >
        <Icon name="lucide:badge-check" size={17} style={{ backgroundColor: GREEN }} />
        <span>{docExperts.title}</span>
      </h2>
      <p className="text-[12px] text-gray-600 leading-8 mb-5 text-right">{docExperts.desc}</p>

      <ul className="grid grid-cols-3 gap-3 mb-5">
        {docExperts.people.map((p) => (
          <li key={p.name} className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.avatar}
              alt=""
              loading="lazy"
              className="w-14 h-14 rounded-full object-cover mx-auto mb-2 bg-white"
            />
            <p className="text-[11.5px] font-bold leading-6" style={{ color: freeTheme.navy }}>
              {p.name}
            </p>
            <p className="text-[9.5px] text-gray-500 leading-5">{p.role}</p>
          </li>
        ))}
      </ul>

      <button
        data-ripple
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90 mb-2.5"
        style={{ backgroundColor: GREEN }}
      >
        <Icon name="lucide:calendar-check" size={15} className="text-white" />
        <span>{docExperts.cta}</span>
      </button>

      <Link
        href="/agents"
        className="group w-full flex items-center justify-center gap-2 rounded-xl border bg-white py-3 text-[12.5px] font-bold transition-colors"
        style={{ borderColor: '#BFE6D3', color: GREEN }}
      >
        <Icon name="lucide:users-round" size={15} />
        <span>{docExperts.allCta}</span>
        <Icon name="lucide:arrow-left" size={14} className="transition-transform group-hover:-translate-x-1" />
      </Link>
    </section>
  );
}

/* ── Related articles ───────────────────────────────────────── */

function Articles({ doc }: { doc: DocDetail }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/articles"
          className="group flex items-center gap-1.5 text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: BLUE }}
        >
          <span>مشاهده همه</span>
          <Icon name="lucide:arrow-left" size={13} className="transition-transform group-hover:-translate-x-1" />
        </Link>

        <h2 className="flex items-center gap-2 text-[15px] font-black" style={{ color: freeTheme.navy }}>
          <Icon name="lucide:newspaper" size={17} style={{ backgroundColor: BLUE }} />
          <span>مقالات مرتبط</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {doc.articles.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="group rounded-xl border overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ borderColor: freeTheme.border }}
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
                style={{ color: freeTheme.navy }}
              >
                {a.title}
              </span>
              <span className="mt-auto flex items-center gap-1 text-[9.5px] text-gray-400">
                <Icon name="lucide:calendar" size={10} />
                <span>آخرین بروزرسانی: {a.updated}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── Resource columns ───────────────────────────────────────── */

function Columns({ doc }: { doc: DocDetail }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {doc.columns.map((c) => {
        const tone = tones[c.tone];
        return (
          <section
            key={c.title}
            className="rounded-2xl border p-4 flex flex-col"
            style={{ backgroundColor: tone.soft, borderColor: tone.ring }}
          >
            <h2 className="flex items-center gap-2 mb-4">
              <Icon name={c.icon} size={18} style={{ backgroundColor: tone.text }} />
              <span className="text-[13px] font-black" style={{ color: tone.text }}>
                {c.title}
              </span>
            </h2>

            <ul className="space-y-2.5 mb-4">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: tone.text }} />
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
      style={{ borderColor: '#D7E3F8', backgroundColor: '#F1F6FE' }}
    >
      <div className="flex-1 text-center md:text-right order-1">
        <h2 className="text-[17px] font-black mb-2" style={{ color: freeTheme.navy }}>
          {docLearningPath.title}
        </h2>
        <p className="text-[12.5px] text-gray-500 leading-8">{docLearningPath.desc}</p>
      </div>

      <Link
        href={docLearningPath.href}
        data-ripple
        className="group order-3 md:order-2 flex items-center gap-2 rounded-xl px-6 py-3.5 text-[13px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
        style={{ backgroundColor: BLUE }}
      >
        <Icon name="lucide:route" size={16} className="text-white" />
        <span>{docLearningPath.cta}</span>
        <Icon
          name="lucide:arrow-left"
          size={15}
          className="text-white transition-transform group-hover:-translate-x-1"
        />
      </Link>

      <div className="order-2 md:order-3 w-[56px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={docLearningPath.art} alt="" className="w-full" />
      </div>
    </section>
  );
}

/* ── Reviews and score ──────────────────────────────────────── */

function Feedback({ doc }: { doc: DocDetail }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
          آخرین نظرات کاربران
        </h2>
        <ul className="space-y-4">
          {doc.reviews.map((r) => (
            <li key={r.name} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0" />
              <div className="flex-1 min-w-0 text-right">
                <p className="flex items-center gap-2 mb-1">
                  <span className="text-[12.5px] font-bold" style={{ color: freeTheme.navy }}>
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
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4" style={{ color: freeTheme.navy }}>
          نظر شما درباره این بخشنامه چیست؟
        </h2>
        <input
          placeholder="تجربه یا نظر خود را ثبت کنید"
          aria-label="نظر شما"
          className="w-full border rounded-xl py-3 px-4 text-[11.5px] mb-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          style={{ borderColor: freeTheme.border }}
        />
        <button
          className="mt-auto flex items-center justify-center gap-2 border rounded-xl py-3 text-[12.5px] font-bold transition-colors hover:bg-blue-50"
          style={{ color: BLUE, borderColor: '#C7D6F0' }}
        >
          <Icon name="lucide:pencil-line" size={15} />
          <span>ثبت نظر</span>
        </button>
      </div>

      <div
        className="bg-white rounded-2xl border p-5 flex flex-col items-center justify-center text-center"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4" style={{ color: freeTheme.navy }}>
          امتیاز این مطلب
        </h2>
        <p className="text-[42px] font-black leading-none mb-3" style={{ color: freeTheme.navy }}>
          {doc.ratingScore}
        </p>
        <Stars value={toLatinNumber(doc.ratingScore)} size={22} />
        <p className="text-[11.5px] text-gray-400 mt-3">از مجموع {doc.ratingCount} نظر</p>
      </div>
    </section>
  );
}
