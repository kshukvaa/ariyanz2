'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Crumbs, Section, Card, Accordion, NAVY, ORANGE } from './SiteParts';
import { careers as c } from '@/data/site/pages';

/* فرصت‌های شغلی — «7.png». */

export default function CareersClient() {
  const [tab, setTab] = useState(c.tabs[0]);

  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5">
        <Crumbs items={[{ label: 'خانه', href: '/' }, { label: c.crumb }]} />
      </div>

      <section className="bg-gradient-to-b from-[#f7f9ff] to-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-10 flex-wrap">
            <img src={c.art} alt="" className="w-[420px] max-w-full rounded-2xl object-cover order-2 mx-auto" />
            <div className="flex-1 min-w-[280px] text-right order-1">
              <h1 className="text-[26px] sm:text-[34px] font-black leading-[1.45]" style={{ color: NAVY }}>
                {c.title}
              </h1>
              <p className="mt-4 text-[12.5px] leading-8 text-gray-500 max-w-[520px]">{c.desc}</p>
              <div className="mt-6 flex items-center gap-3 flex-wrap">
                {c.ctas.map((x) => (
                  <Link
                    key={x.label}
                    href={x.href}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[12.5px] font-bold"
                    style={
                      x.tone === 'orange'
                        ? { backgroundColor: ORANGE, color: '#fff' }
                        : { border: `1px solid ${NAVY}`, color: NAVY }
                    }
                  >
                    <Icon name={x.icon} size={13} style={{ backgroundColor: x.tone === 'orange' ? '#fff' : NAVY }} />
                    {x.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.values.map((v) => (
            <li key={v.title}>
              <Card className="h-full">
                <div className="flex items-start gap-3">
                  <span className="flex-1 text-right">
                    <span className="block text-[13px] font-black" style={{ color: NAVY }}>
                      {v.title}
                    </span>
                    <span className="mt-1.5 block text-[10.5px] leading-6 text-gray-500">{v.desc}</span>
                  </span>
                  <span className="h-11 w-11 shrink-0 rounded-2xl bg-[#EEF3FF] flex items-center justify-center">
                    <Icon name={v.icon} size={20} style={{ backgroundColor: NAVY }} />
                  </span>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={c.findTitle}>
        {/* Filters. */}
        <Card>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button className="flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: ORANGE }}>
              <Icon name="lucide:refresh-cw" size={12} style={{ backgroundColor: ORANGE }} />
              {c.clear}
            </button>

            <div className="flex items-center gap-2 flex-wrap">
              {c.filters.map((f) => (
                <button
                  key={f}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-100 px-3.5 py-2 text-[10.5px] font-bold"
                  style={{ color: NAVY }}
                >
                  <Icon name="lucide:chevron-down" size={11} style={{ backgroundColor: '#9aa3b8' }} />
                  {f}
                </button>
              ))}
              <label className="flex items-center gap-2 rounded-xl border border-gray-100 px-3 py-2 min-w-[190px]">
                <Icon name="lucide:search" size={13} style={{ backgroundColor: '#9aa3b8' }} />
                <input
                  placeholder={c.search}
                  className="flex-1 min-w-0 bg-transparent text-right text-[10.5px] outline-none placeholder:text-gray-400"
                  style={{ color: NAVY }}
                />
              </label>
            </div>
          </div>

          <ul className="mt-4 flex items-center gap-2 justify-end flex-wrap">
            {c.tabs.map((t) => {
              const on = t === tab;
              return (
                <li key={t}>
                  <button
                    onClick={() => setTab(t)}
                    aria-pressed={on}
                    className="rounded-xl px-3.5 py-2 text-[10.5px] font-bold"
                    style={{ backgroundColor: on ? NAVY : '#F4F6FD', color: on ? '#fff' : NAVY }}
                  >
                    {t}
                  </button>
                </li>
              );
            })}
          </ul>

          <div id="roles" className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1.15fr]">
            {c.jobs.map((j) => (
              <div key={j.id} className="rounded-2xl border border-gray-100 p-4 flex flex-col">
                <h3 className="text-center text-[14px] font-black" style={{ color: NAVY }} dir="ltr">
                  {j.title}
                </h3>
                <p className="mt-1.5 text-center text-[10.5px] text-gray-500">{j.team}</p>

                <div className="mt-3 flex items-center justify-center gap-3 flex-wrap text-[9.5px] text-gray-500">
                  <span className="flex items-center gap-1">
                    {j.city}
                    <Icon name="lucide:map-pin" size={10} style={{ backgroundColor: '#9aa3b8' }} />
                  </span>
                  <span className="flex items-center gap-1">
                    {j.mode}
                    <Icon name="lucide:building" size={10} style={{ backgroundColor: '#9aa3b8' }} />
                  </span>
                  <span>{j.type}</span>
                </div>

                <ul className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
                  {j.tags.map((t) => (
                    <li key={t}>
                      <span className="rounded-lg bg-[#F4F6FD] px-2.5 py-1 text-[9px] font-bold" style={{ color: NAVY }} dir="ltr">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/careers/${j.id}`}
                  className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-3 text-[10.5px] font-bold"
                  style={{ color: ORANGE }}
                >
                  <Icon name="lucide:arrow-left" size={11} style={{ backgroundColor: ORANGE }} />
                  {c.jobCta}
                </Link>
              </div>
            ))}

            {/* Featured role. */}
            <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: NAVY }}>
              <span
                className="absolute top-4 left-4 rounded-xl px-3 py-1.5 text-[9.5px] font-bold text-white"
                style={{ backgroundColor: ORANGE }}
              >
                {c.featured.tag}
              </span>
              <h3 className="text-right text-[17px] font-black text-white" dir="ltr" style={{ textAlign: 'right' }}>
                {c.featured.title}
              </h3>
              <p className="mt-2 text-right text-[10.5px] leading-6 text-white/70">{c.featured.desc}</p>

              <ul className="mt-3 space-y-1.5">
                {c.featured.meta.map((m) => (
                  <li key={m} className="flex items-center gap-2 justify-end text-[10px] text-white/80">
                    {m}
                    <Icon name="lucide:circle-check" size={11} style={{ backgroundColor: ORANGE }} />
                  </li>
                ))}
              </ul>

              <Link
                href="/careers/ai-agent-developer"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[11px] font-bold text-white"
                style={{ backgroundColor: ORANGE }}
              >
                <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: '#fff' }} />
                {c.featured.cta}
              </Link>

              <img src={c.featured.art} alt="" className="pointer-events-none absolute -bottom-4 -right-6 h-28 w-28 object-contain opacity-90" />
            </div>
          </div>
        </Card>
      </Section>

      {/* Life + hiring. */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-2 items-start">
          <Card>
            <h2 className="text-right text-[15px] font-black" style={{ color: NAVY }}>
              {c.lifeTitle}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ul className="space-y-3">
                {c.life.map((l) => (
                  <li key={l.title} className="flex items-start gap-2.5">
                    <span className="flex-1 text-right">
                      <span className="block text-[11.5px] font-black" style={{ color: NAVY }}>
                        {l.title}
                      </span>
                      <span className="block text-[9.5px] leading-5 text-gray-500">{l.desc}</span>
                    </span>
                    <Icon name="lucide:sparkles" size={13} className="shrink-0 mt-1" style={{ backgroundColor: ORANGE }} />
                  </li>
                ))}
              </ul>
              <ul className="grid grid-cols-2 gap-2.5 self-start">
                {c.lifePhotos.map((p) => (
                  <li key={p}>
                    <img src={p} alt="" className="h-24 w-full rounded-xl object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <div className="space-y-4">
            <Card>
              <h2 className="text-right text-[14px] font-black" style={{ color: NAVY }}>
                {c.hiringTitle}
              </h2>
              <ol className="mt-4 flex items-start justify-between gap-1">
                {c.hiring.map((h) => (
                  <li key={h.n} className="flex-1 text-center">
                    <span className="relative mx-auto h-11 w-11 rounded-full bg-[#EEF3FF] flex items-center justify-center">
                      <Icon name={h.icon} size={17} style={{ backgroundColor: NAVY }} />
                      <span
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ backgroundColor: ORANGE }}
                      >
                        {h.n}
                      </span>
                    </span>
                    <span className="mt-2 block text-[9px] leading-4" style={{ color: NAVY }}>
                      {h.title}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card>
              <h2 className="text-right text-[14px] font-black" style={{ color: NAVY }}>
                {c.perksTitle}
              </h2>
              <ul className="mt-4 grid grid-cols-3 gap-3">
                {c.perks.map((p) => (
                  <li key={p.title} className="text-center">
                    <span className="mx-auto h-11 w-11 rounded-2xl bg-[#F4F6FD] flex items-center justify-center">
                      <Icon name={p.icon} size={18} style={{ backgroundColor: NAVY }} />
                    </span>
                    <span className="mt-1.5 block text-[9.5px] leading-4 text-gray-600">{p.title}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="pb-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_360px] items-start">
          <Card>
            <h2 className="text-right text-[14px] font-black" style={{ color: NAVY }}>
              {c.faq.title}
            </h2>
            <div className="mt-4">
              <Accordion items={c.faq.items} defaultOpen={-1} />
            </div>
            <button className="mt-4 mx-auto flex items-center gap-2 text-[11px] font-bold" style={{ color: NAVY }}>
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: NAVY }} />
              {c.faq.cta}
            </button>
          </Card>

          <div className="rounded-2xl p-6" style={{ backgroundColor: '#FDF1E6' }}>
            <div className="flex items-start gap-4">
              <span className="flex-1 text-right">
                <span className="block text-[15px] font-black" style={{ color: NAVY }}>
                  {c.noMatch.title}
                </span>
                <span className="mt-2 block text-[11px] leading-7 text-gray-600">{c.noMatch.desc}</span>
              </span>
              <Icon name="lucide:mail" size={40} className="shrink-0" style={{ backgroundColor: ORANGE }} />
            </div>
            <button
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12px] font-bold text-white"
              style={{ backgroundColor: ORANGE }}
            >
              <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: '#fff' }} />
              {c.noMatch.cta}
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
