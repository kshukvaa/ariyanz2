'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { Crumbs, PageHero, Section, Card, NAVY, ORANGE } from './SiteParts';
import { news as n } from '@/data/site/pages';

/* اخبار و اطلاعیه‌ها — «9.png». */

const TAG_TONE: Record<string, { bg: string; fg: string }> = {
  purple: { bg: '#efe9fe', fg: '#5b3ed6' },
  blue: { bg: '#e6f0ff', fg: '#2f6df6' },
  orange: { bg: '#fdeee0', fg: '#d9700f' },
  green: { bg: '#e6f7ec', fg: '#1c8a4e' },
};

export default function NewsClient() {
  const [tab, setTab] = useState(n.tabs[0]);
  const [pop, setPop] = useState(n.popular.tabs[0]);

  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5">
        <Crumbs items={[{ label: 'خانه', href: '/' }, { label: n.crumb }]} />
      </div>

      <PageHero title={n.title} desc={n.desc} art={n.art} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-14">
        <div className="grid gap-5 lg:grid-cols-[340px_1fr] items-start">
          {/* Rail declared first → right, as the sheet places it. */}
          <aside className="space-y-4 lg:sticky lg:top-4">
            <Card>
              <div className="flex items-center justify-between gap-3">
                <Icon name="lucide:bell-ring" size={15} style={{ backgroundColor: ORANGE }} />
                <h2 className="text-[13px] font-black" style={{ color: NAVY }}>
                  {n.latest.title}
                </h2>
              </div>
              <ul className="mt-3.5 space-y-1">
                {n.latest.items.map((i) => (
                  <li key={i.title} className="flex items-center gap-2.5 border-b border-gray-50 py-2.5 last:border-0">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ORANGE }} />
                    <span className="flex-1 text-right">
                      <span className="block text-[11px] font-bold leading-6" style={{ color: NAVY }}>
                        {i.title}
                      </span>
                      <span className="block text-[9px] text-gray-400">{i.date}</span>
                    </span>
                    <Icon name={i.icon} size={15} className="shrink-0" style={{ backgroundColor: '#b7bdcc' }} />
                  </li>
                ))}
              </ul>
              <button className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: ORANGE }}>
                <Icon name="lucide:arrow-left" size={11} style={{ backgroundColor: ORANGE }} />
                {n.latest.cta}
              </button>
            </Card>

            <Card>
              <div className="flex items-center justify-between gap-3">
                <Icon name="lucide:flame" size={15} style={{ backgroundColor: ORANGE }} />
                <h2 className="text-[13px] font-black" style={{ color: NAVY }}>
                  {n.popular.title}
                </h2>
              </div>

              <ul className="mt-3 flex items-center gap-1.5 justify-end">
                {n.popular.tabs.map((t) => {
                  const on = t === pop;
                  return (
                    <li key={t}>
                      <button
                        onClick={() => setPop(t)}
                        aria-pressed={on}
                        className="rounded-lg px-3 py-1.5 text-[9.5px] font-bold"
                        style={{ backgroundColor: on ? NAVY : '#F4F6FD', color: on ? '#fff' : NAVY }}
                      >
                        {t}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-3 space-y-1">
                {n.popular.items.map((i) => (
                  <li key={i.title} className="flex items-center gap-2.5 border-b border-gray-50 py-2.5 last:border-0">
                    <span
                      className="h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-[9px] font-bold"
                      style={{ backgroundColor: '#F4F6FD', color: NAVY }}
                    >
                      {i.n}
                    </span>
                    <span className="flex-1 text-right">
                      <span className="block text-[11px] font-bold leading-6" style={{ color: NAVY }}>
                        {i.title}
                      </span>
                      <span className="block text-[9px] text-gray-400">{i.date}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <button className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: ORANGE }}>
                <Icon name="lucide:arrow-left" size={11} style={{ backgroundColor: ORANGE }} />
                {n.popular.cta}
              </button>
            </Card>

            <Card>
              <div className="flex items-center justify-between gap-3">
                <Icon name="lucide:mail" size={15} style={{ backgroundColor: ORANGE }} />
                <h2 className="text-[13px] font-black" style={{ color: NAVY }}>
                  {n.newsletter.title}
                </h2>
              </div>
              <p className="mt-2 text-right text-[10.5px] leading-6 text-gray-500">{n.newsletter.desc}</p>
              <input
                placeholder={n.newsletter.placeholder}
                className="mt-3 w-full rounded-xl border border-gray-100 px-3.5 py-3 text-right text-[11px] outline-none placeholder:text-gray-400"
                style={{ color: NAVY }}
              />
              <button
                className="mt-2.5 w-full rounded-xl py-3 text-[12px] font-black text-white"
                style={{ backgroundColor: ORANGE }}
              >
                {n.newsletter.cta}
              </button>
              <p className="mt-2 text-center text-[9px] text-gray-400">{n.newsletter.note}</p>
            </Card>
          </aside>

          <main className="min-w-0 space-y-4">
            {/* Featured. */}
            <div className="relative overflow-hidden rounded-2xl" style={{ backgroundColor: NAVY }}>
              <div className="flex items-center gap-5 flex-wrap">
                <img src={n.featured.art} alt="" className="h-[210px] w-[300px] max-w-full object-cover order-1" />
                <div className="flex-1 min-w-[240px] p-6 text-right order-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: ORANGE }}
                  >
                    {n.featured.tag}
                    <Icon name="lucide:star" size={11} style={{ backgroundColor: '#fff' }} />
                  </span>
                  <h2 className="mt-3 text-[20px] font-black leading-9 text-white">{n.featured.title}</h2>
                  <p className="mt-2.5 text-[11px] leading-7 text-white/70">{n.featured.desc}</p>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-[11.5px] font-bold" style={{ color: NAVY }}>
                    <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: NAVY }} />
                    {n.featured.cta}
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs. */}
            <ul className="flex items-center gap-2 justify-end flex-wrap">
              {n.tabs.map((t) => {
                const on = t === tab;
                return (
                  <li key={t}>
                    <button
                      onClick={() => setTab(t)}
                      aria-pressed={on}
                      className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[11px] font-bold"
                      style={{ backgroundColor: on ? NAVY : '#F4F6FD', color: on ? '#fff' : NAVY }}
                    >
                      {t}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Feed. */}
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {n.items.map((i) => {
                const tone = TAG_TONE[i.tone];
                return (
                  <li key={i.title} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                    <div className="relative">
                      <img src={i.img} alt="" className="h-32 w-full object-cover" />
                      <span
                        className="absolute top-3 right-3 rounded-lg px-2.5 py-1 text-[9px] font-bold"
                        style={{ backgroundColor: tone.bg, color: tone.fg }}
                      >
                        {i.tag}
                      </span>
                    </div>
                    <div className="p-4 text-right">
                      <h3 className="text-[12.5px] font-black leading-7" style={{ color: NAVY }}>
                        {i.title}
                      </h3>
                      <div className="mt-2.5 flex items-center gap-3 justify-end text-[9px] text-gray-400">
                        <span className="flex items-center gap-1">
                          {i.read}
                          <Icon name="lucide:clock" size={10} style={{ backgroundColor: '#b7bdcc' }} />
                        </span>
                        <span className="flex items-center gap-1">
                          {i.date}
                          <Icon name="lucide:calendar" size={10} style={{ backgroundColor: '#b7bdcc' }} />
                        </span>
                      </div>
                      <button className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: ORANGE }}>
                        <Icon name="lucide:arrow-left" size={11} style={{ backgroundColor: ORANGE }} />
                        مطالعه بیشتر
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button className="mx-auto flex items-center gap-2 rounded-xl border border-gray-100 px-6 py-3 text-[11.5px] font-bold" style={{ color: NAVY }}>
              <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: NAVY }} />
              {n.more}
            </button>

            {/* Ask Aryaz. */}
            <Card>
              <div className="grid gap-4 lg:grid-cols-3 items-center">
                <div className="text-right">
                  <h3 className="flex items-center gap-2 justify-end text-[13px] font-black" style={{ color: NAVY }}>
                    {n.ask.title}
                    <Icon name="lucide:message-circle" size={15} style={{ backgroundColor: ORANGE }} />
                  </h3>
                  <p className="mt-2 text-[10.5px] leading-6 text-gray-500">{n.ask.desc}</p>
                  <button className="mt-3 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[11px] font-bold" style={{ borderColor: NAVY, color: NAVY }}>
                    <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: NAVY }} />
                    {n.ask.cta}
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-[11px] font-bold" style={{ color: NAVY }}>
                    {n.ask.sampleTitle}
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {n.ask.samples.map((s) => (
                      <li key={s}>
                        <button className="w-full rounded-xl bg-[#F4F6FD] px-3 py-2 text-right text-[10px] font-bold" style={{ color: NAVY }}>
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <img src="/images/aryaz/illustrations/ai-assistant-avatar.png" alt="" className="mx-auto h-20 w-20 object-contain" />
                  <p className="mt-2 text-[11px] font-black" style={{ color: NAVY }}>
                    {n.quick.title}
                  </p>
                  <ul className="mt-2.5 flex items-center justify-center gap-3">
                    {n.quick.items.map((q, i) => (
                      <li key={`${q.label}-${i}`} className="text-center">
                        <span className="mx-auto h-10 w-10 rounded-2xl bg-[#F4F6FD] flex items-center justify-center">
                          <Icon name={q.icon} size={17} style={{ backgroundColor: NAVY }} />
                        </span>
                        <span className="mt-1 block text-[8.5px] text-gray-500">{q.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
