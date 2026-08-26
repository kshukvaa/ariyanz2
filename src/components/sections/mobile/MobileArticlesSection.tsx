'use client';

/* ──────────────────────────────────────────────────────────────
   MobileArticlesSection — index 08, LIGHT (#FAFAFB)
   "Immersive App" mobile variant of ArticlesSection.
   Same data, different design: a big featured SolidCard at the
   top (image + badge + title + desc + date/readTime + GradientCTA),
   a vertical feed of compact SolidCards (one row per article with
   a square thumbnail on the side), and a band SolidCard.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import {
  articlesHeading,
  articleTabs,
  featuredArticle,
  articleList,
  articlesBand,
} from '@/data/landing';
import {
  MobileSectionShell,
  MobileHeading,
  SolidCard,
  PillTabs,
  GradientCTA,
  OutlineCTA,
  Reveal,
  MORANGE,
} from './_kit';

function FeaturedCard() {
  return (
    <SolidCard accent={MORANGE} className="p-0 mb-6 overflow-hidden">
      <div className="relative">
        <ImageSlot
          id={featuredArticle.slot}
          label={featuredArticle.title}
          ratio="aspect-[16/10]"
          icon="lucide:file-text"
          rounded="rounded-none"
          className="rounded-t-3xl"
        />
        <span className="absolute bottom-0 right-0 bg-[#FDF1E6] text-orange-600 text-[11px] font-bold px-4 py-2 rounded-tl-2xl">
          {featuredArticle.badge}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-[17px] font-black text-[#1C1816] leading-8 mb-2">
          {featuredArticle.title}
        </h3>
        <p className="text-[12px] text-gray-500 leading-7 mb-4">
          {featuredArticle.desc}
        </p>
        <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-5">
          <span className="flex items-center gap-1.5">
            <Icon name="lucide:calendar-days" size={13} className="shrink-0" />
            <span className="leading-5">{featuredArticle.date}</span>
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <Icon name="lucide:clock" size={13} className="shrink-0" />
            <span className="leading-5">{featuredArticle.readTime}</span>
          </span>
        </div>
        <GradientCTA
          href={featuredArticle.cta.href}
          label={featuredArticle.cta.label}
          icon="lucide:arrow-left"
        />
      </div>
    </SolidCard>
  );
}

function ArticleRow({ a }: { a: (typeof articleList)[number] }) {
  return (
    <Link
      href={a.href}
      className="block active:scale-[0.98] transition-transform"
    >
      <SolidCard accent={MORANGE} className="p-3">
        <div className="flex items-stretch gap-3">
          {/* Body */}
          <div className="flex-1 min-w-0 flex flex-col">
            <span className="inline-flex w-fit text-[10px] font-bold px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 mb-2">
              {a.badge}
            </span>
            <h3 className="text-[13px] font-black text-[#1C1816] leading-6 mb-auto">
              {a.title}
            </h3>
            <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-3">
              <span className="flex items-center gap-1">
                <Icon name="lucide:calendar-days" size={12} className="shrink-0" />
                <span className="leading-5">{a.date}</span>
              </span>
              <span className="w-px h-3 bg-gray-200" />
              <span className="flex items-center gap-1">
                <Icon name="lucide:clock" size={12} className="shrink-0" />
                <span className="leading-5">{a.readTime}</span>
              </span>
            </div>
          </div>
          {/* Square thumbnail */}
          <div className="w-20 shrink-0">
            <ImageSlot
              id={a.slot}
              label={a.title}
              ratio="aspect-square"
              rounded="rounded-xl"
              icon="lucide:file-text"
              className="!h-full"
            />
          </div>
        </div>
      </SolidCard>
    </Link>
  );
}

export default function MobileArticlesSection() {
  const [tab, setTab] = useState<string>('all');
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-articles') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  const list = tab === 'all' ? articleList : articleList.filter((a) => a.tab === tab);
  const showFeatured = tab === 'all' || featuredArticle.tab === tab;

  return (
    <MobileSectionShell bg="bg-[#FAFAFB]" id="mobile-articles">
      <MobileHeading
        index={8}
        pulse={pulse}
        title={articlesHeading.title}
        desc={articlesHeading.desc}
        accentIcon="lucide:file-text"
      />

      {/* Featured — only when it matches the active tab (or 'all') */}
      {showFeatured && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <FeaturedCard />
        </motion.div>
      )}

      <PillTabs tabs={articleTabs} active={tab} onChange={setTab} />

      {/* Vertical feed of compact cards */}
      {list.length === 0 ? (
        <SolidCard accent="#E5E7EB" className="text-center py-12">
          <Icon
            name="lucide:file-text"
            size={28}
            className="text-gray-300 mx-auto mb-3"
          />
          <p className="text-[12.5px] text-gray-500 leading-7">
            در این دسته فعلاً مقاله‌ای منتشر نشده است.
          </p>
        </SolidCard>
      ) : (
        <div key={tab} className="flex flex-col gap-3 mb-6 animate-fade-in">
          {list.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.25) }}
            >
              <ArticleRow a={a} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Band */}
      <Reveal>
        <SolidCard accent={MORANGE}>
          <div className="flex items-start gap-3">
            <div className="w-24 shrink-0">
              <ImageSlot
                id={articlesBand.slot}
                label={articlesBand.title}
                ratio="aspect-[2/1]"
                rounded="rounded-xl"
                icon="lucide:file-text"
                className="!bg-transparent !border-0"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-black text-[#1C1816] leading-7 mb-1">
                {articlesBand.title}
              </p>
              <p className="text-[11.5px] text-gray-500 leading-6">
                {articlesBand.text}
              </p>
            </div>
          </div>
          <OutlineCTA
            href={articlesBand.cta.href}
            label={articlesBand.cta.label}
            icon="lucide:arrow-left"
            className="mt-4"
          />
        </SolidCard>
      </Reveal>
    </MobileSectionShell>
  );
}
