import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs, SectionTitle, GoLink } from '@/components/free/FreeBits';
import {
  freeTheme,
  tones,
  hubHero,
  hubBenefits,
  hubCategories,
  hubPaths,
  hubFeatured,
  hubCta,
} from '@/data/free';

export const metadata: Metadata = {
  title: 'رایگان اما کاربردی | آریاز',
  description:
    'مقالات تخصصی، ویدئوهای آموزشی، کتاب‌ها، فرم‌ها، ابزارها و ایجنت‌های هوشمند منابع انسانی — رایگان و آماده استفاده.',
};

export default function FreeResourcesHubPage() {
  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-10">
          <Crumbs trail={hubHero.breadcrumb} />

          {/* RTL grid: the first item takes the right-hand column. */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center mt-4">
            <div className="order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hubHero.art}
                alt=""
                className="w-full max-w-[560px] mx-auto"
              />
            </div>

            <div className="order-1 text-right">
              <h1
                className="text-[28px] sm:text-[38px] lg:text-[44px] font-black leading-[1.35] mb-6"
                style={{ color: freeTheme.navy }}
              >
                {hubHero.titleTop}
                <br />
                <span style={{ color: freeTheme.orange }}>{hubHero.accent}</span>{' '}
                {hubHero.titleRest}
              </h1>
              <p className="text-[14px] sm:text-[15px] text-gray-500 leading-9 max-w-xl mr-0 ml-auto">
                {hubHero.desc}
              </p>
            </div>
          </div>
        </section>

        {/* ── Why free ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <SectionTitle>چرا آریاز منابع رایگان ارائه می‌دهد؟</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {hubBenefits.map((b, i) => (
              <div
                key={b.title}
                className={`px-6 py-4 text-center ${i > 0 ? 'lg:border-l' : ''}`}
                style={{ borderColor: freeTheme.border }}
              >
                <Icon
                  name={b.icon}
                  size={34}
                  className="mx-auto mb-4"
                  style={{ backgroundColor: freeTheme.blue }}
                />
                <h3 className="text-[14.5px] font-black mb-3" style={{ color: freeTheme.navy }}>
                  {b.title}
                </h3>
                <p className="text-[12.5px] text-gray-500 leading-8">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Resource categories ──────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <SectionTitle>منابع رایگان آریاز</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hubCategories.map((c) => (
              <article
                key={c.title}
                data-tilt
                className="group bg-white rounded-2xl border p-5 flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
                style={{ borderColor: freeTheme.border }}
              >
                {/* Text sits right, glyph left — first child wins the right side. */}
                <div className="flex-1 text-right min-w-0">
                  <h3
                    className="text-[14px] font-black leading-7 mb-2"
                    style={{ color: freeTheme.navy }}
                  >
                    {c.title}
                  </h3>
                  <p className="text-[12px] text-gray-500 leading-7 mb-4">{c.desc}</p>
                  <GoLink
                    label={c.cta}
                    href={c.href}
                    className="border rounded-xl px-3 py-2 hover:bg-blue-50/60"
                  />
                </div>

                <span
                  className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center self-start"
                  style={{ backgroundColor: '#EEF1FB' }}
                >
                  <Icon name={c.icon} size={26} style={{ backgroundColor: freeTheme.navy }} />
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* ── Suggested learning paths ─────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <SectionTitle>مسیرهای یادگیری پیشنهادی</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {hubPaths.map((p) => {
              const t = tones[p.tone];
              return (
                <article
                  key={p.title}
                  data-tilt
                  className="rounded-2xl border p-6 flex gap-5 transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: t.soft, borderColor: t.ring }}
                >
                  <div className="flex-1 text-right min-w-0">
                    <h3 className="text-[15px] font-black mb-4" style={{ color: t.text }}>
                      {p.title}
                    </h3>
                    <ul className="space-y-2.5 mb-5">
                      {p.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-center gap-2 text-[12.5px] text-gray-600"
                        >
                          <span
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: t.text }}
                          />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <GoLink
                      label="مشاهده مسیر"
                      href={p.href}
                      className="bg-white rounded-xl px-4 py-2.5 shadow-sm"
                    />
                  </div>

                  <Icon
                    name={p.icon}
                    size={44}
                    className="shrink-0 self-center"
                    style={{ backgroundColor: t.text }}
                  />
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Editor's picks ───────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <SectionTitle>پیشنهادهای ویژه آریاز</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hubFeatured.map((f) => {
              const t = tones[f.tone];
              return (
                <article
                  key={f.badge}
                  data-tilt
                  className="group bg-white rounded-2xl border p-5 flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
                  style={{ borderColor: freeTheme.border }}
                >
                  <div className="flex-1 text-right min-w-0">
                    <span
                      className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-lg mb-3"
                      style={{ color: t.text, backgroundColor: t.bg }}
                    >
                      {f.badge}
                    </span>

                    <ul className="space-y-2 mb-4">
                      {f.lines.map((line, i) => (
                        <li
                          key={line}
                          className={`flex items-start gap-2 leading-7 ${
                            i === 0
                              ? 'text-[13px] font-black'
                              : 'text-[11.5px] text-gray-500'
                          }`}
                          style={i === 0 ? { color: freeTheme.navy } : undefined}
                        >
                          <span
                            className="w-1 h-1 rounded-full shrink-0 mt-3"
                            style={{ backgroundColor: t.text }}
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={f.href}
                      className="group/cta inline-flex items-center gap-2 text-[12px] font-bold transition-colors"
                      style={{ color: t.text }}
                    >
                      <Icon name="lucide:circle-plus" size={14} />
                      <span>{f.cta}</span>
                      <Icon
                        name="lucide:arrow-left"
                        size={13}
                        className="transition-transform group-hover/cta:-translate-x-1"
                      />
                    </Link>
                  </div>

                  <span
                    className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center self-start"
                    style={{ backgroundColor: t.bg }}
                  >
                    <Icon name={f.icon} size={26} style={{ backgroundColor: t.text }} />
                  </span>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Assistant CTA ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-14">
          <div
            className="relative rounded-3xl overflow-hidden px-6 sm:px-10 pt-8 pb-8 lg:pt-6 lg:pb-0"
            style={{ backgroundColor: '#1740B8' }}
          >
            {/* RTL row: copy on the right, buttons centre, mascot far left. */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Copy — first in RTL flow, so it sits on the right */}
              <div className="flex-1 text-center lg:text-right lg:pr-4">
                <h2 className="text-[22px] sm:text-[28px] font-black text-white mb-4">
                  {hubCta.title}
                </h2>
                <p className="text-[13.5px] text-blue-100 leading-8">
                  کافی است با{' '}
                  <span className="font-bold" style={{ color: '#FFB067' }}>
                    {hubCta.line1Accent}
                  </span>{' '}
                  صحبت کنید.
                </p>
                <p className="text-[13.5px] text-blue-100 leading-8">
                  در کمتر از{' '}
                  <span className="font-bold" style={{ color: '#FFB067' }}>
                    {hubCta.line2Accent}
                  </span>{' '}
                  مسیر متناسب رشد خود را پیدا کنید
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <Link
                  href={hubCta.primary.href}
                  data-ripple
                  className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-[13.5px] font-bold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-900/30 whitespace-nowrap"
                >
                  <span>{hubCta.primary.label}</span>
                  <Icon
                    name="lucide:arrow-left"
                    size={15}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </Link>
                <Link
                  href={hubCta.secondary.href}
                  data-ripple
                  className="group flex items-center gap-2 bg-white text-[13.5px] font-bold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg whitespace-nowrap"
                  style={{ color: freeTheme.navy }}
                >
                  <span>{hubCta.secondary.label}</span>
                  <Icon
                    name="lucide:arrow-left"
                    size={15}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </Link>
              </div>

              {/* Mascot — bottom-aligned inside the banner on desktop */}
              <div className="hidden lg:block w-[150px] shrink-0 self-end">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hubCta.mascot} alt="" className="w-full block" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </SharedPageLayout>
  );
}
