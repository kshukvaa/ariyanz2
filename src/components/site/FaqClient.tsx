'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Crumbs, PageHero, Section, Card, NAVY, ORANGE } from './SiteParts';
import { faq as f } from '@/data/site/pages';

/* سؤالات متداول — «5.png». */

export default function FaqClient() {
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5">
        <Crumbs items={[{ label: 'خانه', href: '/' }, { label: f.crumb }]} />
      </div>

      <PageHero title={f.title} desc={f.desc} art={f.art} search={f.search} />

      {/* Category grid. */}
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {f.categories.map((c) => (
            <li key={c.title}>
              <Card className="h-full">
                <div className="flex items-start gap-3">
                  <span className="flex-1 text-right">
                    <span className="block text-[13px] font-black" style={{ color: NAVY }}>
                      {c.title}
                    </span>
                    <span className="mt-1.5 block text-[10.5px] leading-6 text-gray-500">{c.desc}</span>
                  </span>
                  <span className="h-11 w-11 shrink-0 rounded-2xl bg-[#F4F6FD] flex items-center justify-center">
                    <Icon name={c.icon} size={20} style={{ backgroundColor: NAVY }} />
                  </span>
                </div>
                <Icon name="lucide:arrow-left" size={13} className="mt-3" style={{ backgroundColor: ORANGE }} />
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Top questions + rails. */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-[1fr_340px] items-start">
          {/* Questions declared first → right. */}
          <Card>
            <div className="flex items-center gap-3 justify-end">
              <h2 className="text-[15px] font-black" style={{ color: NAVY }}>
                {f.topTitle}
              </h2>
              <span className="h-[3px] w-8 rounded-full bg-orange-400" />
            </div>

            <ul className="mt-4 space-y-2.5">
              {f.top.map((q, i) => {
                const on = i === open;
                return (
                  <li key={q.title} className="rounded-2xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpen(on ? -1 : i)}
                      aria-expanded={on}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-right"
                    >
                      <Icon name={q.icon} size={17} className="shrink-0 order-3" style={{ backgroundColor: ORANGE }} />
                      <span className="flex-1 text-[12.5px] font-bold order-2" style={{ color: NAVY }}>
                        {q.title}
                      </span>
                      <Icon
                        name={on ? 'lucide:chevron-up' : 'lucide:chevron-down'}
                        size={14}
                        className="shrink-0 order-1"
                        style={{ backgroundColor: '#9aa3b8' }}
                      />
                    </button>

                    {on && q.body && (
                      <div className="px-4 pb-4 text-right">
                        <p className="text-[11.5px] leading-8 text-gray-500">{q.body}</p>
                        {q.link && (
                          <button className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold" style={{ color: ORANGE }}>
                            <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: ORANGE }} />
                            {q.link}
                          </button>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <button className="mt-4 mx-auto flex items-center gap-2 text-[11.5px] font-bold" style={{ color: NAVY }}>
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: NAVY }} />
              {f.topCta}
            </button>
          </Card>

          <div className="space-y-4">
            {/* Agent. */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#EEF3FF' }}>
              <div className="flex items-start gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[13.5px] font-black" style={{ color: NAVY }}>
                    {f.agent.title}
                  </span>
                  <span className="mt-1.5 block text-[10.5px] leading-6 text-gray-500">{f.agent.desc}</span>
                </span>
                <img src="/images/aryaz/illustrations/ai-assistant-avatar.png" alt="" className="h-16 w-16 shrink-0 object-contain" />
              </div>

              <label className="mt-4 flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5">
                <button aria-label="ارسال" className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: NAVY }}>
                  <Icon name="lucide:send" size={13} style={{ backgroundColor: '#ffffff' }} />
                </button>
                <input
                  placeholder={f.agent.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-right text-[10.5px] outline-none placeholder:text-gray-400"
                  style={{ color: NAVY }}
                />
              </label>

              <p className="mt-3 text-right text-[10px] text-gray-400">{f.agent.chipsTitle}</p>
              <ul className="mt-2 flex items-center gap-2 justify-end flex-wrap">
                {f.agent.chips.map((ch) => (
                  <li key={ch}>
                    <button className="rounded-xl bg-white px-3 py-2 text-[10px] font-bold" style={{ color: NAVY }}>
                      {ch}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags. */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FDF1E6' }}>
              <div className="flex items-start gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[13px] font-black" style={{ color: ORANGE }}>
                    {f.tags.title}
                  </span>
                  <span className="mt-1.5 block text-[10.5px] leading-6 text-gray-500">{f.tags.desc}</span>
                </span>
                <span className="h-12 w-12 shrink-0 rounded-full bg-white flex items-center justify-center">
                  <Icon name="lucide:search" size={20} style={{ backgroundColor: ORANGE }} />
                </span>
              </div>

              <ul className="mt-3.5 flex items-center gap-2 justify-end flex-wrap">
                {f.tags.items.map((t) => (
                  <li key={t}>
                    <button className="rounded-xl bg-white px-3.5 py-2 text-[10.5px] font-bold" style={{ color: NAVY }}>
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Still stuck. */}
      <Section className="pb-14">
        <Card>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr] items-center">
            {f.foot.items.map((i) => (
              <Link key={i.title} href={i.href} className="rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[12.5px] font-black" style={{ color: NAVY }}>
                    {i.title}
                  </span>
                  <span className="mt-1 block text-[10.5px] leading-6 text-gray-500">{i.desc}</span>
                  <Icon name="lucide:arrow-left" size={12} className="mt-1.5" style={{ backgroundColor: ORANGE }} />
                </span>
                <span className="h-11 w-11 shrink-0 rounded-2xl bg-[#F4F6FD] flex items-center justify-center">
                  <Icon name={i.icon} size={19} style={{ backgroundColor: NAVY }} />
                </span>
              </Link>
            ))}

            <div className="flex items-center gap-4">
              <span className="flex-1 text-right">
                <span className="block text-[15px] font-black" style={{ color: NAVY }}>
                  {f.foot.title}
                </span>
                <span className="mt-1.5 block text-[11px] leading-7 text-gray-500">{f.foot.desc}</span>
              </span>
              <Icon name="lucide:headphones" size={40} className="shrink-0" style={{ backgroundColor: ORANGE }} />
            </div>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-[11px] text-gray-500">
            {f.foot.note}
            <Icon name="lucide:clock" size={13} style={{ backgroundColor: '#9aa3b8' }} />
          </p>
        </Card>
      </Section>
    </div>
  );
}
