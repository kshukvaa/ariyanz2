'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import SectionHeading, { NAVY } from '@/components/SectionHeading';
import {
  newsHeading,
  newsTabs,
  newsTimeline,
  newsTimelineTitle,
  newsTimelineCta,
  newsCards,
  newsBand,
} from '@/data/landing';

export default function NewsSection() {
  const [tab, setTab] = useState('all');
  const [openCard, setOpenCard] = useState<string | null>(newsCards[0].title);

  const visible = tab === 'all' ? newsCards : newsCards.filter((c) => c.tab === tab);

  return (
    <section className="py-20 md:py-28 bg-gray-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title={newsHeading.title} desc={newsHeading.desc} />

        {/* Tabs — one rail, active tab underlined */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-1 bg-white border border-gray-100 rounded-2xl p-2 overflow-x-auto ar-no-scrollbar max-w-full">
            {newsTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[12.5px] font-bold whitespace-nowrap transition-all border-b-2 ${
                  tab === t.id
                    ? 'text-orange-500 border-orange-500'
                    : 'text-gray-500 border-transparent hover:text-orange-500'
                }`}
              >
                {t.icon && <Icon name={t.icon} size={16} />}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Timeline — sits left, so it takes the last column. */}
          <div className="p-1 lg:order-2">
            <h3 className="text-[15px] font-black mb-6" style={{ color: NAVY }}>
              {newsTimelineTitle}
            </h3>
            <ol className="relative">
              {newsTimeline.map((t, i) => (
                <li key={`${t.kind}-${t.date}`} className="relative pr-7 pb-7 last:pb-5">
                  {i < newsTimeline.length - 1 && (
                    <span className="absolute right-[5px] top-4 bottom-0 w-px bg-orange-200" />
                  )}
                  <span className="absolute right-0 top-1.5 w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <p className="text-[13px] font-black" style={{ color: NAVY }}>
                    {t.kind}
                  </p>
                  <p className="text-[12px] text-gray-500 mt-1.5 leading-6">{t.title}</p>
                  <p className="text-[11.5px] text-gray-400 mt-1">{t.date}</p>
                </li>
              ))}
            </ol>
            <Link
              href={newsTimelineCta.href}
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-orange-300 hover:text-orange-500 text-gray-600 rounded-xl px-4 py-2.5 text-[12.5px] font-bold transition-all"
            >
              <span>{newsTimelineCta.label}</span>
              <Icon name="lucide:arrow-left" size={14} />
            </Link>
          </div>

          {/* Cards — desktop */}
          <div className="lg:col-span-4 lg:order-1">
            {visible.length === 0 ? (
              <div className="h-full bg-white border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-14 text-center">
                <Icon name="lucide:file-text" size={26} className="text-gray-300 mb-3" />
                <p className="text-[13px] text-gray-500 mb-4">
                  در این دسته فعلاً به‌روزرسانی تازه‌ای ثبت نشده است.
                </p>
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-orange-500"
                >
                  <span>مشاهده همه مقالات</span>
                  <Icon name="lucide:arrow-left" size={14} className="text-orange-500" />
                </Link>
              </div>
            ) : (
              <>
                <div
                  key={tab}
                  className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in"
                >
                  {visible.map((c) => (
                    <Link
                      key={c.title}
                      href={c.href}
                      className="bg-white border border-gray-100 rounded-2xl p-5 hover-lift hover:border-gray-200 shadow-sm flex flex-col text-center"
                    >
                      <span className="self-start text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg bg-orange-100 text-orange-600 mb-5">
                        {c.badge}
                      </span>
                      <span className="w-[76px] h-[76px] mx-auto rounded-full bg-orange-50/70 flex items-center justify-center mb-5">
                        <Icon name={c.icon} size={34} className="text-orange-500" />
                      </span>
                      <h3 className="text-[15px] font-black leading-7 mb-3" style={{ color: NAVY }}>
                        {c.title}
                      </h3>
                      <p className="text-[12px] text-gray-500 leading-7 flex-1">{c.desc}</p>
                      <span className="flex items-center justify-center gap-2 text-[11.5px] text-gray-400 border-t border-gray-100 mt-5 pt-4 mb-4">
                        <span>{c.date}</span>
                        <Icon name="lucide:calendar-days" size={14} className="text-gray-400" />
                      </span>
                      <span className="flex items-center justify-center gap-2 border border-orange-300 text-orange-500 rounded-xl py-2.5 text-[12.5px] font-bold transition-all">
                        <span>{c.cta}</span>
                        <Icon name="lucide:arrow-left" size={13} className="text-orange-500" />
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Cards — mobile tap-through list */}
                <div className="md:hidden bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50 overflow-hidden">
                  {visible.map((c) => {
                    const isOpen = openCard === c.title;
                    return (
                      <div key={c.title}>
                        <button
                          onClick={() => setOpenCard(isOpen ? null : c.title)}
                          className="w-full flex items-center gap-3 px-4 py-3.5 text-right"
                        >
                          <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${c.color}14` }}
                          >
                            <Icon name={c.icon} size={17} style={{ backgroundColor: c.color }} />
                          </span>
                          <span className="flex-1">
                            <span className="block text-[13px] font-bold text-gray-900 leading-6">
                              {c.title}
                            </span>
                            <span className="block text-[10.5px] text-gray-400 mt-0.5">{c.date}</span>
                          </span>
                          <Icon
                            name="lucide:chevron-down"
                            size={16}
                            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pr-[3.25rem] animate-fade-in">
                            <p className="text-[12px] text-gray-500 leading-6 mb-2">{c.desc}</p>
                            <Link
                              href={c.href}
                              className="inline-flex items-center gap-1.5 text-[12px] font-bold text-orange-500"
                            >
                              <span>مشاهده</span>
                              <Icon name="lucide:arrow-left" size={13} className="text-orange-500" />
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Band */}
        <div className="mt-10 bg-orange-50/60 border border-orange-100 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-start gap-4 text-center sm:text-right">
            <Icon name="lucide:bell-ring" size={34} className="text-orange-500 shrink-0" />
            <span>
              <p className="text-[15px] font-black mb-1.5" style={{ color: NAVY }}>
                {newsBand.title}
              </p>
              <p className="text-[12.5px] text-gray-500 leading-7 max-w-lg">{newsBand.desc}</p>
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={newsBand.cta.href}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl text-[13px] font-bold transition-all btn-press"
              data-ripple
            >
              <span>{newsBand.cta.label}</span>
              <Icon name="lucide:arrow-left" size={15} className="text-white" />
            </Link>
            <span className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
              <Icon name="lucide:mail" size={22} className="text-orange-500" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
