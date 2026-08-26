'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Stars } from '@/components/free/FreeBits';
import { freeTheme, tones, toLatinNumber } from '@/data/free';
import {
  agentDetailTabs,
  agentLearningPath,
  agentSignupCta,
  type AgentColumn,
  type AgentDetail,
} from '@/data/agents';

/* ──────────────────────────────────────────────────────────────
   A single agent. Everything is driven by `agent`, so every id
   in the catalogue renders this exact layout.
────────────────────────────────────────────────────────────── */

export default function AgentDetailClient({ agent }: { agent: AgentDetail }) {
  return (
    <div style={{ backgroundColor: freeTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        <Hero agent={agent} />
        <Tabs agent={agent} />
        <Columns columns={agent.columns} />
        <PathBanner />
        <Articles agent={agent} />
        <Feedback agent={agent} />
      </div>
    </div>
  );
}

/* ── Hero: art, title, launch card, spec strip ──────────────── */

function Hero({ agent }: { agent: AgentDetail }) {
  const free = agent.access === 'free';

  return (
    <section
      className="bg-white rounded-2xl border overflow-hidden"
      style={{ borderColor: freeTheme.border }}
    >
      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)_340px]">
        {/* Launch card — first child, so it lands on the right. */}
        <div className="order-1 p-5 flex flex-col">
          <span
            className="self-start text-[10.5px] font-bold px-2.5 py-1 rounded-md text-white mb-3"
            style={{ backgroundColor: free ? '#16A34A' : '#F97316' }}
          >
            {free ? 'رایگان' : 'ویژه'}
          </span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={agent.avatar}
            alt=""
            className="w-[86px] h-[86px] rounded-full object-cover self-center mb-4"
          />

          <Link
            href="#"
            data-ripple
            className="flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#16A34A' }}
          >
            <Icon name="lucide:play" size={15} className="text-white" />
            <span>شروع استفاده از ایجنت</span>
          </Link>

          <p className="text-[10.5px] text-gray-400 text-center mt-2.5">
            بروزرسانی: {agent.updated}
          </p>
        </div>

        {/* Copy + specs */}
        <div className="order-2 px-6 py-6 text-right">
          <h1
            className="text-[22px] sm:text-[27px] font-black leading-[1.6] mb-3"
            style={{ color: freeTheme.navy }}
          >
            {agent.title}
          </h1>
          <p className="text-[13px] text-gray-600 leading-9 mb-6">{agent.tagline}</p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-4">
            {agent.specs.map((s) => (
              <div key={s.label} className="text-center">
                <dt
                  className="flex items-center justify-center gap-1.5 text-[11.5px] font-bold mb-2"
                  style={{ color: freeTheme.navy }}
                >
                  <Icon name={s.icon} size={14} style={{ backgroundColor: freeTheme.blue }} />
                  <span>{s.label}</span>
                </dt>
                <dd className="text-[11.5px] text-gray-500">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-3 min-h-[190px] bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={agent.hero} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ── Tabs ───────────────────────────────────────────────────── */

function Tabs({ agent }: { agent: AgentDetail }) {
  const [tab, setTab] = useState(agentDetailTabs[0].id);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {agentDetailTabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={on}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-t-xl text-[13px] font-bold transition-all border-b-2 ${
                on ? 'bg-white' : 'bg-white/60 hover:bg-white'
              }`}
              style={{ color: freeTheme.navy, borderColor: on ? '#6D28D9' : 'transparent' }}
            >
              <Icon
                name={t.icon}
                size={15}
                style={{ backgroundColor: on ? '#6D28D9' : '#9AA3B8' }}
              />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <section
        className="bg-white rounded-2xl border p-6 -mt-4"
        style={{ borderColor: freeTheme.border }}
      >
        <h2
          className="flex items-center gap-2 text-[15px] font-black mb-5"
          style={{ color: freeTheme.navy }}
        >
          <Icon name="lucide:info" size={17} style={{ backgroundColor: freeTheme.blue }} />
          <span>{agentDetailTabs.find((t) => t.id === tab)?.label}</span>
        </h2>

        {tab === 'about' && (
          <>
            {/* Prose left, the problems it solves right. */}
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8">
              <ul className="order-1 space-y-3">
                {agent.solves.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <Icon
                      name="lucide:circle-check"
                      size={16}
                      className="shrink-0 mt-1"
                      style={{ backgroundColor: '#16A34A' }}
                    />
                    <span className="text-[12px] text-gray-600 leading-7 text-right">{s}</span>
                  </li>
                ))}
              </ul>

              <div className="order-2">
                {agent.about.map((p) => (
                  <p key={p} className="text-[12.5px] text-gray-600 leading-9 mb-4 text-right">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div
              className="flex flex-wrap justify-center gap-3 mt-7 pt-6 border-t"
              style={{ borderColor: freeTheme.border }}
            >
              {agent.audience.map((a) => (
                <span
                  key={a}
                  className="flex items-center gap-2 text-[11.5px] font-semibold px-4 py-2.5 rounded-xl"
                  style={{ color: freeTheme.navy, backgroundColor: '#F4F6FD' }}
                >
                  <Icon name="lucide:users-round" size={14} style={{ backgroundColor: freeTheme.blue }} />
                  <span>{a}</span>
                </span>
              ))}
            </div>
          </>
        )}

        {tab === 'capabilities' && <Bullets items={agent.capabilities} icon="lucide:sparkles" />}
        {tab === 'how' && <Steps items={agent.howItWorks} />}
        {tab === 'sample' && <Bullets items={agent.sampleOutput} icon="lucide:file-output" />}
      </section>
    </>
  );
}

function Bullets({ items, icon }: { items: string[]; icon: string }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5">
          <Icon
            name={icon}
            size={15}
            className="shrink-0 mt-1"
            style={{ backgroundColor: '#6D28D9' }}
          />
          <span className="text-[12px] text-gray-600 leading-7 text-right">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((it, i) => (
        <li key={it} className="flex items-start gap-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-black shrink-0"
            style={{ color: '#6D28D9', backgroundColor: '#F1E9FE' }}
          >
            {toPersian(i + 1)}
          </span>
          <span className="text-[12.5px] text-gray-600 leading-8 text-right pt-0.5">{it}</span>
        </li>
      ))}
    </ol>
  );
}

/* ── Related resource columns ───────────────────────────────── */

function Columns({ columns }: { columns: AgentColumn[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {columns.map((c) => {
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
            <p className="text-[10.5px] text-gray-500 mb-1">{c.subtitle}</p>
            <p className="text-[10.5px] font-bold text-gray-400 mb-4">{c.count}</p>

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
          {agentLearningPath.title}
        </h2>
        <p className="text-[12.5px] text-gray-500 leading-8">{agentLearningPath.desc}</p>
      </div>

      <Link
        href={agentLearningPath.href}
        data-ripple
        className="group order-3 md:order-2 flex items-center gap-2 rounded-xl px-6 py-3.5 text-[13px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#7C3AED' }}
      >
        <Icon name="lucide:route" size={16} className="text-white" />
        <span>{agentLearningPath.cta}</span>
        <Icon
          name="lucide:arrow-left"
          size={15}
          className="text-white transition-transform group-hover:-translate-x-1"
        />
      </Link>

      <div className="order-2 md:order-3 w-[170px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={agentLearningPath.art} alt="" className="w-full" />
      </div>
    </section>
  );
}

/* ── Related articles ───────────────────────────────────────── */

function Articles({ agent }: { agent: AgentDetail }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/articles"
          className="group flex items-center gap-1.5 border rounded-xl px-4 py-2 text-[12px] font-bold transition-colors hover:border-orange-300"
          style={{ borderColor: freeTheme.border, color: freeTheme.navy }}
        >
          <span>مشاهده همه مقالات</span>
          <Icon
            name="lucide:arrow-left"
            size={13}
            className="transition-transform group-hover:-translate-x-1"
          />
        </Link>

        <h2
          className="flex items-center gap-2 text-[15px] font-black"
          style={{ color: freeTheme.navy }}
        >
          <Icon name="lucide:newspaper" size={17} style={{ backgroundColor: freeTheme.blue }} />
          <span>مقالات مرتبط</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {agent.articles.map((a) => (
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
                style={{ backgroundColor: '#7C3AED' }}
              >
                مقاله
              </span>
            </span>

            <span className="p-3 flex flex-col flex-1">
              <span
                className="block text-[11.5px] font-bold leading-6 text-right mb-3 line-clamp-2 transition-colors group-hover:text-orange-500"
                style={{ color: freeTheme.navy }}
              >
                {a.title}
              </span>
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

/* ── Reviews, signup, score distribution, score ─────────────── */

function Feedback({ agent }: { agent: AgentDetail }) {
  const { rating } = agent;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Latest reviews — right */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
          آخرین نظرات کاربران
        </h2>
        <ul className="space-y-4">
          {agent.reviews.map((r) => (
            <li key={r.name} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.avatar}
                alt=""
                className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0"
              />
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

      {/* Sign-up CTA */}
      <div
        className="bg-white rounded-2xl border p-5 flex flex-col text-center"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-3" style={{ color: freeTheme.navy }}>
          {agentSignupCta.title}
        </h2>
        <p className="text-[11.5px] text-gray-500 leading-8 mb-5">{agentSignupCta.desc}</p>
        <Link
          href={agentSignupCta.href}
          className="mt-auto flex items-center justify-center gap-2 border rounded-xl py-3 text-[12.5px] font-bold transition-colors hover:bg-violet-50"
          style={{ color: '#6D28D9', borderColor: '#CDBEF5' }}
        >
          <Icon name="lucide:user-round-plus" size={15} />
          <span>{agentSignupCta.cta}</span>
        </Link>
      </div>

      {/* Distribution */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
        <h2 className="text-[14px] font-black mb-5 text-center" style={{ color: freeTheme.navy }}>
          توزیع امتیازات
        </h2>
        <ul className="space-y-3">
          {rating.bars.map((pct, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-[11px] text-gray-400 shrink-0 w-12 text-right">
                {toPersian(5 - i)} ستاره
              </span>
              <span className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: '#F5A524' }}
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

      {/* Score — left */}
      <div
        className="bg-white rounded-2xl border p-5 flex flex-col items-center justify-center text-center"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4" style={{ color: freeTheme.navy }}>
          امتیاز ایجنت
        </h2>
        <p className="text-[42px] font-black leading-none mb-3" style={{ color: freeTheme.navy }}>
          {rating.score}
        </p>
        <Stars value={toLatinNumber(rating.score)} size={22} />
        <p className="text-[11.5px] text-gray-400 mt-3">از {rating.count} امتیاز کاربران</p>
      </div>
    </section>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
