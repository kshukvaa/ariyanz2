'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import ScrollAnimator from '@/components/ScrollAnimator';
import SectionHeading, { NAVY } from '@/components/SectionHeading';
import {
  articlesHeading,
  articleTabs,
  featuredArticle,
  articleList,
  articlesBand,
} from '@/data/landing';

export default function ArticlesSection() {
  const [tab, setTab] = useState('all');
  const list = tab === 'all' ? articleList : articleList.filter((a) => a.tab === tab);
  const showFeatured = tab === 'all' || featuredArticle.tab === tab;

  return (
    <section className="py-20 md:py-28 bg-[#FAFAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title={articlesHeading.title} desc={articlesHeading.desc} />

        {/* Category pills */}
        <div className="bg-white rounded-full shadow-[0_10px_30px_rgba(22,48,91,0.05)] p-2 mb-8 overflow-x-auto ar-no-scrollbar">
          <div className="flex items-center gap-1 min-w-max justify-center">
            {articleTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${
                  tab === t.id
                    ? 'border-2 border-orange-400 text-orange-500'
                    : 'text-gray-500 hover:text-orange-500'
                }`}
              >
                <Icon name={t.icon} size={16} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Compact list — sits left; order-1 takes the right-hand column.
              flex-col + flex-1 children make the stack match the feature
              card's height instead of ending short. */}
          <div className="order-2 flex flex-col gap-4">
            {list.length === 0 && (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center text-[13px] text-gray-500">
                در این دسته فعلاً مقاله‌ای منتشر نشده است.
              </div>
            )}
            {list.map((a) => (
              <Link
                key={a.title}
                href={a.href}
                className="flex-1 flex items-stretch gap-4 bg-white rounded-2xl shadow-[0_8px_26px_rgba(22,48,91,0.05)] p-3 hover-lift transition-all"
              >
                <div className="flex-1 min-w-0 p-2 flex flex-col">
                  <span className="inline-flex w-fit text-[10.5px] font-bold px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 mb-3">
                    {a.badge}
                  </span>
                  <h3
                    className="text-[15px] font-black leading-8 mb-auto"
                    style={{ color: NAVY }}
                  >
                    {a.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-4">
                    <span className="flex items-center gap-1.5">
                      <Icon name="lucide:calendar-days" size={13} />
                      {a.date}
                    </span>
                    <span className="w-px h-3 bg-gray-200" />
                    <span className="flex items-center gap-1.5">
                      <Icon name="lucide:clock" size={13} />
                      {a.readTime}
                    </span>
                  </div>
                </div>
                <div className="w-[128px] shrink-0">
                  <ImageSlot
                    id={a.slot}
                    label={a.title}
                    ratio="aspect-square"
                    rounded="rounded-xl"
                    icon="lucide:file-text"
                    className="!h-full"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Featured (left in RTL) */}
          {showFeatured && (
            <ScrollAnimator animation="fade-right" className="order-1">
              <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(22,48,91,0.07)] flex flex-col">
                <div className="relative">
                  <ImageSlot
                    id={featuredArticle.slot}
                    label={featuredArticle.title}
                    ratio="aspect-[16/10]"
                    rounded="rounded-none"
                    icon="lucide:file-text"
                  />
                  <span className="absolute bottom-0 left-0 bg-[#FDF1E6] text-orange-600 text-[12px] font-bold px-5 py-2.5 rounded-tl-2xl">
                    {featuredArticle.badge}
                  </span>
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3
                    className="text-xl md:text-2xl font-black leading-10 mb-4"
                    style={{ color: NAVY }}
                  >
                    {featuredArticle.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-8 mb-6 flex-1">
                    {featuredArticle.desc}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href={featuredArticle.cta.href}
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl text-[13px] font-bold transition-all btn-press"
                      data-ripple
                    >
                      <span>{featuredArticle.cta.label}</span>
                      <Icon name="lucide:arrow-left" size={16} className="text-white" />
                    </Link>

                    <div className="flex items-center gap-3 text-[11.5px] text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Icon name="lucide:calendar-days" size={14} />
                        {featuredArticle.date}
                      </span>
                      <span className="w-px h-3 bg-gray-200" />
                      <span className="flex items-center gap-1.5">
                        <Icon name="lucide:clock" size={14} />
                        {featuredArticle.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          )}
        </div>

        {/* Band */}
        <div className="mt-6 bg-[#FDF3EA] rounded-2xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center gap-5">
          <div className="w-[120px] shrink-0">
            <ImageSlot
              id={articlesBand.slot}
              label={articlesBand.title}
              ratio="aspect-[2/1]"
              rounded="rounded-xl"
              icon="lucide:file-text"
              className="!bg-transparent !border-0"
            />
          </div>
          <div className="flex-1 text-center md:text-right">
            <p className="text-[15px] font-black mb-1" style={{ color: NAVY }}>
              {articlesBand.title}
            </p>
            <p className="text-[12.5px] text-gray-500 leading-7">{articlesBand.text}</p>
          </div>
          <Link
            href={articlesBand.cta.href}
            className="inline-flex items-center gap-2 border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-xl text-[13px] font-bold transition-all shrink-0"
          >
            <span>{articlesBand.cta.label}</span>
            <Icon name="lucide:arrow-left" size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
