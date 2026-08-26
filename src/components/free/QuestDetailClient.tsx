'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Stars } from '@/components/free/FreeBits';
import { toLatinNumber } from '@/data/free';
import { testTheme } from '@/data/tests';
import {
  questDetailTabs,
  questChat,
  type QuestDetail,
  type QuestDetailTab,
} from '@/data/questionnaires';

/* ──────────────────────────────────────────────────────────────
   A single questionnaire. The instrument's three dimensions are
   the heart of it, so they get their own row of cards; everything
   else is the paperwork a researcher checks before downloading.
────────────────────────────────────────────────────────────── */

export default function QuestDetailClient({ quest }: { quest: QuestDetail }) {
  return (
    <div style={{ backgroundColor: testTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        <Hero quest={quest} />

        {/* RTL: the tabs column is first (right), the agent sits left. */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-5 items-start">
          <TabsPanel quest={quest} />
          <ChatPanel />
        </div>

        <Related quest={quest} />
        <Articles quest={quest} />
        <PathRow quest={quest} />
        <Reviews quest={quest} />
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */

function Hero({ quest }: { quest: QuestDetail }) {
  const facts = [
    { label: 'تعداد سوالات', value: `${toPersian(quest.questions)} سوال`, icon: 'lucide:clipboard-list' },
    { label: 'نوع فایل', value: quest.formats, icon: 'lucide:file-text' },
    { label: 'زمان تکمیل', value: `${toPersian(quest.minutes)} دقیقه`, icon: 'lucide:clock' },
    { label: 'تعداد دانلود', value: `+${quest.downloads}`, icon: 'lucide:download' },
  ];

  return (
    <section
      className="rounded-2xl border overflow-hidden grid md:grid-cols-[minmax(0,1fr)_300px]"
      style={{ borderColor: '#E2DCF9', background: 'linear-gradient(255deg,#EFEBFE 0%,#F8F6FF 60%,#FFFFFF 100%)' }}
    >
      <div className="order-1 px-6 py-8 text-right">
        <span
          className="inline-flex items-center gap-1.5 text-[10.5px] font-bold px-2.5 py-1 rounded-md mb-4"
          style={{ backgroundColor: '#FFF1E6', color: '#B4530C' }}
        >
          <Icon name="lucide:tag" size={12} style={{ backgroundColor: '#B4530C' }} />
          <span>{quest.category}</span>
        </span>

        <h1
          className="text-[24px] sm:text-[31px] font-black leading-[1.5] mb-4"
          style={{ color: testTheme.navy }}
        >
          {quest.title}
        </h1>
        <p className="text-[13px] text-gray-600 leading-9 mb-7">{quest.tagline}</p>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {facts.map((f) => (
            <div
              key={f.label}
              className="bg-white/80 rounded-xl border px-3 py-3 text-center"
              style={{ borderColor: '#E6E1F8' }}
            >
              <dt className="flex items-center justify-center gap-1.5 text-[12px] font-bold mb-1" style={{ color: testTheme.navy }}>
                <Icon name={f.icon} size={13} style={{ backgroundColor: testTheme.violet }} />
                <span>{f.value}</span>
              </dt>
              <dd className="text-[10.5px] text-gray-500">{f.label}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-3">
          <a
            href="#"
            data-ripple
            className="group flex items-center gap-2 rounded-xl px-9 py-3.5 text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: testTheme.orange }}
          >
            <Icon name="lucide:download" size={16} className="text-white" />
            <span>دانلود پرسشنامه</span>
          </a>

          <a
            href="#sample"
            className="flex items-center gap-2 rounded-xl border bg-white px-6 py-3.5 text-[13px] font-bold transition-colors hover:border-violet-300"
            style={{ borderColor: testTheme.border, color: testTheme.navy }}
          >
            <Icon name="lucide:eye" size={15} />
            <span>مشاهده نمونه پرسشنامه</span>
          </a>
        </div>
      </div>

      <div className="order-2 flex items-center justify-center p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={quest.heroArt} alt="" className="w-full max-w-[280px]" />
      </div>
    </section>
  );
}

/* ── Tabs ───────────────────────────────────────────────────── */

function TabsPanel({ quest }: { quest: QuestDetail }) {
  const [tab, setTab] = useState<QuestDetailTab>('intro');

  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-[-2px]">
        {questDetailTabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={on}
              className={`px-5 py-3.5 rounded-t-xl text-[12.5px] font-bold transition-all border-b-2 ${
                on ? 'bg-white' : 'bg-white/60 hover:bg-white'
              }`}
              style={{ color: on ? testTheme.violet : testTheme.navy, borderColor: on ? testTheme.violet : 'transparent' }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-5">
        {tab === 'intro' && (
          <>
            <section className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
              <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
                معرفی پرسشنامه
              </h2>
              <div className="flex items-start gap-5">
                <div className="flex-1 min-w-0">
                  {quest.intro.map((p) => (
                    <p key={p} className="text-[12.5px] text-gray-600 leading-9 text-justify">
                      {p}
                    </p>
                  ))}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={quest.introArt} alt="" className="w-[72px] shrink-0 hidden sm:block" />
              </div>
            </section>

            <section>
              <h2 className="text-[14px] font-black mb-3 text-right" style={{ color: testTheme.navy }}>
                ابعاد پرسشنامه
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {quest.dimensions.map((d) => (
                  <article
                    key={d.title}
                    className="bg-white rounded-2xl border p-4 text-right"
                    style={{ borderColor: testTheme.border }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-[13px] font-black" style={{ color: testTheme.navy }}>
                        {d.title}
                      </h3>
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${d.color}14` }}
                      >
                        <Icon name={d.icon} size={18} style={{ backgroundColor: d.color }} />
                      </span>
                    </div>
                    <p className="text-[11.5px] text-gray-500 leading-7">{d.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
              <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
                مشخصات فنی پرسشنامه
              </h2>
              <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {quest.specs.map((s) => (
                  <div key={s.label} className="text-center">
                    <dt
                      className="flex items-center justify-center gap-1.5 text-[11.5px] font-bold mb-2"
                      style={{ color: testTheme.navy }}
                    >
                      <Icon name={s.icon} size={14} style={{ backgroundColor: testTheme.violet }} />
                      <span>{s.label}</span>
                    </dt>
                    <dd className="text-[11px] text-gray-500 leading-6">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </>
        )}

        {tab === 'audience' && <Bullets items={quest.audience} icon="lucide:users-round" />}
        {tab === 'scoring' && <Bullets items={quest.scoring} icon="lucide:calculator" />}
        {tab === 'sample' && (
          <section id="sample" className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
            <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
              نمونه سوالات
            </h2>
            <ol className="space-y-3">
              {quest.sampleItems.map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[11.5px] font-black shrink-0"
                    style={{ backgroundColor: '#F1EEFE', color: testTheme.violet }}
                  >
                    {toPersian(i + 1)}
                  </span>
                  <span className="text-[12.5px] text-gray-600 leading-8 text-right pt-1">{s}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
        {tab === 'sources' && <Bullets items={quest.sources} icon="lucide:book-open" />}
        {tab === 'reviews' && (
          <section className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
            <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
              نظرات کاربران
            </h2>
            <ul className="space-y-4">
              {quest.reviews.map((r) => (
                <li key={r.name} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0" />
                  <div className="flex-1 min-w-0 text-right">
                    <p className="flex items-center gap-2 mb-0.5">
                      <span className="text-[12.5px] font-bold" style={{ color: testTheme.navy }}>
                        {r.name}
                      </span>
                      <Stars value={r.stars} size={11} />
                    </p>
                    <p className="text-[10px] text-gray-400 mb-1">{r.role}</p>
                    <p className="text-[11px] text-gray-600 leading-7">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function Bullets({ items, icon }: { items: string[]; icon: string }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5">
            <Icon name={icon} size={15} className="shrink-0 mt-1" style={{ backgroundColor: testTheme.violet }} />
            <span className="text-[12.5px] text-gray-600 leading-8 text-right">{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── The agent, with the questions people actually ask ──────── */

function ChatPanel() {
  return (
    <section className="bg-white rounded-2xl border p-4 flex flex-col" style={{ borderColor: testTheme.border }}>
      <h2 className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#16A34A' }} />
        <span className="flex-1 text-right">
          <span className="block text-[13.5px] font-black" style={{ color: testTheme.navy }}>
            {questChat.title}
          </span>
          <span className="block text-[10px] text-gray-400">{questChat.status}</span>
        </span>
      </h2>

      <p
        className="rounded-xl px-3.5 py-3 text-[11.5px] leading-7 mb-4"
        style={{ backgroundColor: '#F4F5FA', color: '#4B5568' }}
      >
        {questChat.greeting}
      </p>

      <ul className="space-y-2.5 mb-4">
        {questChat.suggestions.map((s) => (
          <li key={s}>
            <button
              className="w-full text-right rounded-xl px-3.5 py-2.5 text-[11.5px] leading-6 transition-colors hover:bg-violet-50"
              style={{ backgroundColor: '#F7F6FD', color: testTheme.navy }}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      <span className="relative block mt-auto">
        <input
          placeholder={questChat.placeholder}
          aria-label={questChat.placeholder}
          className="w-full border rounded-xl py-2.5 pr-3.5 pl-10 text-[11.5px] focus:outline-none focus:border-violet-400"
          style={{ borderColor: testTheme.border }}
        />
        <Icon
          name="lucide:send"
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: testTheme.violet }}
        />
      </span>

      <p className="text-[9.5px] text-gray-400 text-center mt-2.5">{questChat.note}</p>
    </section>
  );
}

/* ── Related sections ───────────────────────────────────────── */

function Related({ quest }: { quest: QuestDetail }) {
  return (
    <section>
      <h2 className="text-[15px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
        بخش‌های مرتبط با این پرسشنامه
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {quest.related.map((r) => (
          <article
            key={r.title}
            className="bg-white rounded-2xl border p-4 text-center flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{ borderColor: testTheme.border }}
          >
            <span
              className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: `${r.color}14` }}
            >
              <Icon name={r.icon} size={22} style={{ backgroundColor: r.color }} />
            </span>
            <h3 className="text-[12.5px] font-black mb-2" style={{ color: testTheme.navy }}>
              {r.title}
            </h3>
            <p className="text-[10.5px] text-gray-500 leading-6 mb-4">{r.desc}</p>

            <Link
              href={r.href}
              className="group mt-auto flex items-center justify-center gap-1.5 text-[11.5px] font-bold"
              style={{ color: r.color }}
            >
              <span>{r.cta}</span>
              <Icon name="lucide:arrow-left" size={13} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Articles({ quest }: { quest: QuestDetail }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/articles"
          className="group flex items-center gap-1.5 text-[12px] font-bold transition-colors hover:text-orange-500"
          style={{ color: testTheme.violet }}
        >
          <span>مشاهده همه مقالات</span>
          <Icon name="lucide:arrow-left" size={13} className="transition-transform group-hover:-translate-x-1" />
        </Link>

        <h2 className="text-[15px] font-black" style={{ color: testTheme.navy }}>
          مقالات مرتبط
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {quest.articles.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="group bg-white rounded-xl border overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ borderColor: testTheme.border }}
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
                style={{ backgroundColor: testTheme.violet }}
              >
                {a.tag}
              </span>
            </span>

            <span className="p-3 flex flex-col flex-1 text-right">
              <span
                className="block text-[12px] font-bold leading-7 mb-2 line-clamp-2 transition-colors group-hover:text-orange-500"
                style={{ color: testTheme.navy }}
              >
                {a.title}
              </span>
              <span className="mt-auto flex items-center gap-1 text-[9.5px] text-gray-400">
                <Icon name="lucide:clock" size={10} />
                <span>{a.minutes}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── The path — a real sequence, so it is numbered ──────────── */

function PathRow({ quest }: { quest: QuestDetail }) {
  return (
    <section>
      <h2 className="text-[15px] font-black mb-6 text-right" style={{ color: testTheme.navy }}>
        مسیر یادگیری مرتبط
      </h2>

      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {quest.path.map((p) => (
          <li key={p.n} className="text-center">
            <span
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-[16px] font-black border-2 bg-white"
              style={{ borderColor: '#DCD4F8', color: testTheme.violet }}
            >
              {toPersian(p.n)}
            </span>
            <h3 className="text-[12.5px] font-black mb-1.5" style={{ color: testTheme.navy }}>
              {p.title}
            </h3>
            <p className="text-[10.5px] text-gray-500 leading-6">{p.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── Reviews summary ────────────────────────────────────────── */

/* RTL: the notes read first on the right, the score closes it on the left. */
function Reviews({ quest }: { quest: QuestDetail }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] items-start">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {quest.reviews.map((r) => (
          <article
            key={r.name}
            className="bg-white rounded-2xl border p-4 text-right"
            style={{ borderColor: testTheme.border }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1">
                <p className="text-[12.5px] font-bold" style={{ color: testTheme.navy }}>
                  {r.name}
                </p>
                <p className="text-[10px] text-gray-400">{r.role}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0" />
            </div>

            <Stars value={r.stars} size={12} />
            <p className="text-[11px] text-gray-600 leading-7 mt-2">{r.text}</p>
            <p className="text-[10px] text-gray-400 mt-2">{r.date}</p>
          </article>
        ))}
      </div>

      <div
        className="bg-white rounded-2xl border p-5 text-center"
        style={{ borderColor: testTheme.border }}
      >
        <p className="text-[34px] font-black leading-none mb-3" style={{ color: testTheme.navy }}>
          {quest.ratingScore}
          <span className="text-[14px] text-gray-400 font-bold"> از ۵</span>
        </p>
        <span className="flex justify-center mb-3">
          <Stars value={toLatinNumber(quest.ratingScore)} size={20} />
        </span>
        <p className="text-[11.5px] text-gray-400">بر اساس {quest.ratingCount} نظر</p>
      </div>
    </section>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
