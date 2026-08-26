'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Stars } from '@/components/free/FreeBits';
import { freeTheme, tones, toLatinNumber } from '@/data/free';
import {
  formats,
  toolDetailTabs,
  toolAgent,
  learningPathBanner,
  type RelatedColumn,
  type ToolDetail,
} from '@/data/tools';

/* ──────────────────────────────────────────────────────────────
   A single downloadable form / checklist / procedure.
   Everything is driven by `tool`, so every id in the catalogue
   renders this exact layout.
────────────────────────────────────────────────────────────── */

export default function ToolDetailClient({ tool }: { tool: ToolDetail }) {
  return (
    <div style={{ backgroundColor: freeTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* Preview sits left, so the header column comes first under RTL. */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
          <div className="order-1 space-y-5">
            <Header tool={tool} />
            <Tabs tool={tool} />
          </div>

          <div className="order-2 space-y-5">
            <PreviewCard tool={tool} />
            <AgentCard />
          </div>
        </div>

        <RelatedColumns columns={tool.related} />
        <RelatedArticles tool={tool} />
        <PathBanner />
        <Feedback tool={tool} />
      </div>
    </div>
  );
}

/* ── Header: title, blurb, meta strip ───────────────────────── */

function Header({ tool }: { tool: ToolDetail }) {
  const f = formats[tool.format];
  const meta = [
    { label: 'دسته', value: tool.category, icon: null },
    { label: 'آخرین بروزرسانی', value: tool.updated, icon: 'lucide:calendar-days' },
    { label: 'نسخه', value: tool.version, icon: 'lucide:layers' },
    { label: 'نوع فایل', value: f.label, icon: 'lucide:file-spreadsheet', color: f.color },
    { label: 'حجم فایل', value: tool.size, icon: 'lucide:hard-drive-download' },
  ];

  return (
    <section
      className="bg-white rounded-2xl border p-6"
      style={{ borderColor: freeTheme.border }}
    >
      <h1
        className="flex items-center gap-3 text-[22px] sm:text-[27px] font-black leading-[1.7] mb-4"
        style={{ color: freeTheme.navy }}
      >
        <Icon name="lucide:star" size={26} className="shrink-0" style={{ backgroundColor: freeTheme.orange }} />
        <span>{tool.title}</span>
      </h1>

      {tool.intro.map((line) => (
        <p key={line} className="text-[13px] font-semibold leading-9" style={{ color: freeTheme.navy }}>
          {line}
        </p>
      ))}

      <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mt-6">
        {meta.map((m, i) => (
          <div
            key={m.label}
            className={`px-4 py-2 text-center ${i > 0 ? 'lg:border-l' : ''}`}
            style={{ borderColor: freeTheme.border }}
          >
            <dt className="text-[12px] font-bold mb-2" style={{ color: freeTheme.navy }}>
              {m.label}
            </dt>
            <dd
              className="flex items-center justify-center gap-1.5 text-[13px] font-black"
              style={{ color: freeTheme.navy }}
            >
              {m.icon && (
                <Icon
                  name={m.icon}
                  size={16}
                  style={{ backgroundColor: m.color ?? freeTheme.navy }}
                />
              )}
              <span dir={/^[A-Za-z0-9]/.test(m.value) ? 'ltr' : undefined}>{m.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ── Preview + download ─────────────────────────────────────── */

function PreviewCard({ tool }: { tool: ToolDetail }) {
  const f = formats[tool.format];
  return (
    <section
      className="bg-white rounded-2xl border p-5"
      style={{ borderColor: freeTheme.border }}
    >
      <div className="relative mb-5">
        <span
          className="absolute -top-1 right-0 w-11 h-11 rounded-lg flex items-center justify-center font-black text-white z-10"
          style={{ backgroundColor: f.color, fontSize: f.glyph.length > 1 ? 12 : 20 }}
        >
          {f.glyph}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tool.preview}
          alt={`پیش‌نمایش ${tool.title}`}
          className="w-[78%] mx-auto rounded-lg border"
          style={{ borderColor: freeTheme.border }}
        />
      </div>

      <a
        href={tool.url}
        download
        data-ripple
        className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-200"
        style={{ backgroundColor: freeTheme.orange }}
      >
        <Icon name="lucide:download" size={17} className="text-white" />
        <span>دانلود رایگان فرم</span>
      </a>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-3">
        <Icon name="lucide:info" size={13} />
        <span>برای دانلود روی دکمه بالا کلیک کنید</span>
      </p>
    </section>
  );
}

/* ── Assistant ──────────────────────────────────────────────── */

function AgentCard() {
  const [draft, setDraft] = useState('');
  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: '#E3E2F7', backgroundColor: '#F8F8FD' }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-1 text-right min-w-0">
          <h2 className="text-[17px] font-black mb-2" style={{ color: freeTheme.navy }}>
            {toolAgent.title}
          </h2>
          {toolAgent.lines.map((l) => (
            <p key={l} className="text-[11.5px] text-gray-500 leading-7">
              {l}
            </p>
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={toolAgent.avatar} alt="" className="w-[86px] shrink-0 object-contain" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 mb-3"
        style={{ borderColor: '#DEDCF3' }}
      >
        <button type="submit" aria-label="ارسال دستور" className="shrink-0">
          <Icon name="lucide:send" size={18} style={{ backgroundColor: freeTheme.blue }} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={toolAgent.placeholder}
          aria-label={toolAgent.placeholder}
          className="flex-1 bg-transparent py-1.5 text-[11.5px] focus:outline-none text-right min-w-0"
        />
        <Icon name="lucide:sparkles" size={16} className="text-gray-400 shrink-0" />
      </form>

      <div className="flex flex-wrap gap-2">
        {toolAgent.chips.map((c) => (
          <button
            key={c}
            onClick={() => setDraft(c)}
            className="flex items-center gap-1.5 bg-white border rounded-lg px-2.5 py-1.5 text-[10.5px] font-semibold transition-colors hover:border-orange-300"
            style={{ borderColor: '#DEDCF3', color: freeTheme.navy }}
          >
            <Icon name="lucide:wand-sparkles" size={12} style={{ backgroundColor: freeTheme.blue }} />
            <span>{c}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ── Tabs + panel ───────────────────────────────────────────── */

function Tabs({ tool }: { tool: ToolDetail }) {
  const [tab, setTab] = useState(toolDetailTabs[0].id);
  const fact = tool.facts.find((f) => f.title === toolDetailTabs.find((t) => t.id === tab)?.label);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {toolDetailTabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={on}
              className={`px-6 py-3 rounded-t-xl text-[13px] font-bold transition-all border-b-2 ${
                on ? 'bg-white' : 'bg-white/60 hover:bg-white'
              }`}
              style={{
                color: freeTheme.navy,
                borderColor: on ? freeTheme.blue : 'transparent',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <section
        className="bg-white rounded-2xl border p-6 -mt-4"
        style={{ borderColor: freeTheme.border }}
      >
        {tab === 'about' && (
          <>
            {tool.about.map((p) => (
              <p key={p} className="text-[12.5px] text-gray-600 leading-9 mb-4 text-right">
                {p}
              </p>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {tool.facts.map((f) => (
                <FactColumn key={f.title} fact={f} />
              ))}
            </div>
          </>
        )}

        {fact && <FactColumn fact={fact} standalone />}

        {tab === 'versions' && (
          <ul className="space-y-3">
            {tool.versions.map((v) => (
              <li
                key={v.version}
                className="flex items-center gap-4 rounded-xl border p-4"
                style={{ borderColor: freeTheme.border }}
              >
                <span
                  className="text-[13px] font-black px-3 py-1.5 rounded-lg shrink-0"
                  style={{ color: freeTheme.blue, backgroundColor: '#EAF1FE' }}
                  dir="ltr"
                >
                  {v.version}
                </span>
                <span className="flex-1 text-right">
                  <span className="block text-[12.5px] font-bold" style={{ color: freeTheme.navy }}>
                    {v.note}
                  </span>
                  <span className="block text-[11px] text-gray-400 mt-1" dir="ltr">
                    {v.date}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function FactColumn({
  fact,
  standalone = false,
}: {
  fact: ToolDetail['facts'][number];
  standalone?: boolean;
}) {
  return (
    <div>
      <h3
        className="flex items-center gap-2 text-[13.5px] font-black mb-4"
        style={{ color: freeTheme.navy }}
      >
        <Icon name={fact.icon} size={18} style={{ backgroundColor: freeTheme.blue }} />
        <span>{fact.title}</span>
      </h3>
      <ul className={standalone ? 'grid gap-3 sm:grid-cols-2' : 'space-y-3'}>
        {fact.items.map((it) => (
          <li key={it} className="flex items-start gap-2.5">
            <Icon
              name="lucide:check"
              size={15}
              className="shrink-0 mt-1"
              style={{ backgroundColor: '#16A34A' }}
            />
            <span className="text-[12px] text-gray-600 leading-7 text-right">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Related resource columns ───────────────────────────────── */

function RelatedColumns({ columns }: { columns: RelatedColumn[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {columns.map((c) => {
        const tone = tones[c.tone];
        return (
          <section
            key={c.title}
            className="rounded-2xl border p-4 flex flex-col"
            style={{ backgroundColor: tone.soft, borderColor: tone.ring }}
          >
            <h2 className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[13px] font-black" style={{ color: tone.text }}>
                {c.title}
              </span>
              <Icon name={c.icon} size={17} style={{ backgroundColor: tone.text }} />
            </h2>

            <ul className="space-y-3 mb-4">
              {c.items.map((it) => (
                <li key={it.title} className="flex items-center gap-3">
                  <span className="flex-1 min-w-0 text-right">
                    <span
                      className="block text-[12px] font-bold leading-6"
                      style={{ color: freeTheme.navy }}
                    >
                      {it.title}
                    </span>
                    <span className="block text-[10.5px] text-gray-500 leading-6">{it.desc}</span>
                    {it.meta && (
                      <span className="flex items-center justify-end gap-2 text-[10px] text-gray-400 mt-1">
                        <span dir="ltr">
                          ★ {it.rating} ({it.votes})
                        </span>
                        <span>{it.meta}</span>
                      </span>
                    )}
                  </span>

                  {it.thumb ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={it.thumb}
                      alt=""
                      loading="lazy"
                      className="w-14 h-11 rounded-lg object-cover shrink-0 bg-gray-100"
                    />
                  ) : (
                    <span
                      className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm"
                    >
                      <Icon name={c.icon} size={16} style={{ backgroundColor: tone.text }} />
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <Link
              href={c.href}
              className="mt-auto flex items-center justify-center gap-2 bg-white rounded-xl py-2.5 text-[12px] font-bold border transition-colors hover:border-orange-300"
              style={{ color: tone.text, borderColor: tone.ring }}
            >
              <span>{c.cta}</span>
              <Icon name={c.icon} size={14} />
            </Link>
          </section>
        );
      })}
    </div>
  );
}

/* ── Related articles ───────────────────────────────────────── */

function RelatedArticles({ tool }: { tool: ToolDetail }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
      <h2 className="text-[15px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
        مقالات مرتبط
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {tool.articles.map((a) => (
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
            <span className="p-3 flex flex-col flex-1">
              <span
                className="block text-[11.5px] font-bold leading-6 text-center mb-3 line-clamp-2 transition-colors group-hover:text-orange-500"
                style={{ color: freeTheme.navy }}
              >
                {a.title}
              </span>
              <span className="mt-auto flex items-center justify-between gap-1">
                <span className="flex items-center gap-1 text-[9.5px] text-gray-400">
                  <Icon name="lucide:clock" size={10} />
                  <span dir="ltr">{a.date}</span>
                </span>
                <span
                  className="text-[9.5px] font-bold px-2 py-0.5 rounded-md"
                  style={{ color: '#0F9D58', backgroundColor: '#E7F7EF' }}
                >
                  {a.category}
                </span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── Learning path banner ───────────────────────────────────── */

function PathBanner() {
  return (
    <section
      className="rounded-2xl border p-5 flex flex-col md:flex-row items-center gap-5"
      style={{ borderColor: '#DEDCF3', backgroundColor: '#F8F8FD' }}
    >
      <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
        <Icon name="lucide:graduation-cap" size={26} style={{ backgroundColor: freeTheme.navy }} />
      </span>

      <div className="flex-1 text-center md:text-right">
        <h2 className="text-[16px] font-black mb-1" style={{ color: freeTheme.navy }}>
          {learningPathBanner.title}
        </h2>
        <p className="text-[12px] text-gray-500 leading-7">{learningPathBanner.desc}</p>
      </div>

      <span
        aria-hidden="true"
        className="hidden lg:block flex-1 border-t-2 border-dashed"
        style={{ borderColor: '#C9C6EA' }}
      />

      <Link
        href={learningPathBanner.href}
        data-ripple
        className="group flex items-center gap-2 rounded-xl px-6 py-3.5 text-[13px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#1B3A8F' }}
      >
        <Icon name="lucide:circle-plus" size={16} className="text-white" />
        <span>{learningPathBanner.cta}</span>
        <Icon
          name="lucide:arrow-left"
          size={15}
          className="text-white transition-transform group-hover:-translate-x-1"
        />
      </Link>

      <Icon
        name="lucide:workflow"
        size={34}
        className="hidden lg:block shrink-0"
        style={{ backgroundColor: freeTheme.blue }}
      />
    </section>
  );
}

/* ── Ratings, comment form, latest comments ─────────────────── */

function Feedback({ tool }: { tool: ToolDetail }) {
  const [sent, setSent] = useState(false);
  const { rating } = tool;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Latest comments — right */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
          آخرین نظرات کاربران
        </h2>
        <ul className="space-y-4">
          {tool.comments.map((c) => (
            <li key={c.name} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.avatar}
                alt=""
                className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0"
              />
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[12.5px] font-bold" style={{ color: freeTheme.navy }}>
                  {c.name}
                </p>
                <p className="text-[11.5px] text-gray-600 leading-7 mt-1">{c.text}</p>
              </div>
              <div className="shrink-0 text-left">
                <Stars value={c.stars} size={12} />
                <span className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                  <Icon name="lucide:clock" size={10} />
                  <span dir="ltr">{c.date}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Comment form — middle */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
          نظر خود را درباره این فرم با ما به اشتراک بگذارید
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <textarea
            required
            rows={4}
            placeholder="نظر خود را بنویسید"
            aria-label="نظر شما"
            className="w-full border rounded-xl p-3 text-[12.5px] leading-7 resize-none focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all mb-3"
            style={{ borderColor: freeTheme.border }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <input
              required
              placeholder="نام و نام خانوادگی"
              aria-label="نام و نام خانوادگی"
              className="border rounded-xl px-3 py-2.5 text-[12.5px] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              style={{ borderColor: freeTheme.border }}
            />
            <input
              type="email"
              placeholder="ایمیل اختیاری"
              aria-label="ایمیل"
              className="border rounded-xl px-3 py-2.5 text-[12.5px] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              style={{ borderColor: freeTheme.border }}
            />
          </div>

          <button
            type="submit"
            data-ripple
            className="rounded-xl px-6 py-2.5 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1B3A8F' }}
          >
            ارسال نظر
          </button>

          {sent && (
            <p className="text-[11.5px] text-emerald-600 mt-3">
              نظر شما ثبت شد و پس از بررسی منتشر می‌شود.
            </p>
          )}
        </form>
      </div>

      {/* Score — left */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
        <h2 className="text-[14px] font-black mb-5 text-right" style={{ color: freeTheme.navy }}>
          امتیاز کاربران به این فرم
        </h2>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11.5px] text-gray-400">({rating.count})</span>
          <Stars value={toLatinNumber(rating.score)} size={20} />
          <span className="text-[30px] font-black" style={{ color: freeTheme.navy }}>
            {rating.score}
          </span>
        </div>

        <ul className="space-y-2.5">
          {rating.bars.map((pct, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-[11px] text-gray-400 shrink-0 w-12 text-right">
                {5 - i} ستاره
              </span>
              <span className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: freeTheme.orange }}
                />
              </span>
              <span
                className="text-[11px] font-bold text-gray-500 w-10 tabular-nums shrink-0"
                dir="ltr"
              >
                {pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
