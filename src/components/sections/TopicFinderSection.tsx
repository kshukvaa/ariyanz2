'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { StaggerContainer } from '@/components/ScrollAnimator';
import SectionHeading from '@/components/SectionHeading';
import { topics, topicsHeading, topicsCtaLabel } from '@/data/landing';

/** Card titles and glyphs share the header's navy. */
const TOPIC_NAVY = '#16305B';

export default function TopicFinderSection() {
  const [open, setOpen] = useState<string | null>(topics[0].id);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title={topicsHeading.title} desc={topicsHeading.desc} />

        {/* Desktop / tablet grid */}
        <StaggerContainer className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((t) => (
            <div
              key={t.id}
              className="h-full bg-white border border-gray-100 rounded-2xl p-6 hover-lift hover:border-gray-200 shadow-sm shadow-gray-100/60 flex flex-col"
            >
              {/* Title block on the right, icon medallion on the left */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="text-right">
                  <h3 className="text-[17px] font-black mb-2" style={{ color: TOPIC_NAVY }}>
                    {t.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-7">{t.desc}</p>
                </div>
                <span className="w-[72px] h-[72px] rounded-full bg-[#F2F3F8] flex items-center justify-center shrink-0">
                  <Icon name={t.icon} size={34} style={{ backgroundColor: TOPIC_NAVY }} />
                </span>
              </div>

              <span className="block h-px bg-gray-100 mb-4" />

              <ul className="space-y-2.5 mb-5 flex-1">
                {t.items.map((s) => (
                  /* No justify-end: under RTL that pushes the row to the
                     left. Default start keeps it on the right, dot first. */
                  <li
                    key={s}
                    className="flex items-center gap-2.5 text-[13px] text-gray-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                <Link
                  href={t.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-orange-500 transition-all hover:gap-2.5"
                >
                  <span>{topicsCtaLabel}</span>
                  <Icon name="lucide:arrow-left" size={15} className="text-orange-500" />
                </Link>
              </div>
            </div>
          ))}
        </StaggerContainer>

        {/* Mobile accordion */}
        <div className="md:hidden divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {topics.map((t) => {
            const isOpen = open === t.id;
            return (
              <div key={t.id}>
                <button
                  onClick={() => setOpen(isOpen ? null : t.id)}
                  className="w-full flex items-center gap-3 px-4 py-4 text-right"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: t.bg }}
                  >
                    <Icon name={t.icon} size={20} style={{ backgroundColor: t.color }} />
                  </span>
                  <span className="flex-1 text-sm font-bold text-gray-900">{t.title}</span>
                  <Icon
                    name="lucide:chevron-down"
                    size={17}
                    className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pr-[3.25rem] animate-fade-in">
                    <ul className="space-y-2 mb-3">
                      {t.items.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-[13px] text-gray-600">
                          <Icon name="lucide:circle-check" size={14} style={{ backgroundColor: t.color }} />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={t.href}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold"
                      style={{ color: t.color }}
                    >
                      <span>{topicsCtaLabel}</span>
                      <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: t.color }} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
