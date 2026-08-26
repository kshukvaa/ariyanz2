'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Crumbs, Section, Card, CtaRow, NAVY, ORANGE } from './SiteParts';
import { about as a } from '@/data/site/pages';

/* درباره ما — «1.png». */

export default function AboutClient() {
  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5">
        <Crumbs items={[{ label: 'خانه', href: '/' }, { label: a.crumb }]} />
      </div>

      {/* Hero. */}
      <section className="bg-gradient-to-b from-[#f7f9ff] to-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-10 flex-wrap">
            <img src={a.art} alt="" className="w-[430px] max-w-full object-contain order-2 mx-auto" />

            <div className="flex-1 min-w-[280px] text-right order-1">
              <span className="text-[26px] font-black" style={{ color: ORANGE }}>
                {a.kicker}
              </span>
              <h1 className="mt-1 text-[28px] sm:text-[36px] font-black leading-[1.4]" style={{ color: NAVY }}>
                {a.title}
              </h1>
              <p className="mt-4 text-[13px] leading-8 text-gray-500 max-w-[520px]">{a.desc}</p>

              <div className="mt-6 flex items-center gap-3 flex-wrap">
                {a.ctas.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[12.5px] font-bold"
                    style={
                      c.tone === 'navy'
                        ? { backgroundColor: NAVY, color: '#fff' }
                        : { border: `1px solid ${ORANGE}`, color: ORANGE }
                    }
                  >
                    <Icon name={c.icon} size={13} style={{ backgroundColor: c.tone === 'navy' ? '#fff' : ORANGE }} />
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* آریاز چیست؟ */}
      <Section title={a.whatTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {a.what.map((w) => (
            <Card key={w.title}>
              <span
                className="h-14 w-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: w.tone === 'orange' ? '#FDF1E6' : '#EEF3FF' }}
              >
                <Icon name={w.icon} size={26} style={{ backgroundColor: w.tone === 'orange' ? ORANGE : NAVY }} />
              </span>
              <h3 className="mt-4 text-right text-[15px] font-black" style={{ color: w.tone === 'orange' ? ORANGE : NAVY }}>
                {w.title}
              </h3>
              <p className="mt-2 text-right text-[11.5px] leading-7 text-gray-500">{w.desc}</p>
              <Link
                href={w.href}
                className="mt-4 inline-flex items-center gap-2 text-[11.5px] font-bold"
                style={{ color: w.tone === 'orange' ? ORANGE : NAVY }}
              >
                <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: w.tone === 'orange' ? ORANGE : NAVY }} />
                {w.cta}
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* داستان شکل‌گیری */}
      <Section title={a.storyTitle}>
        <ol id="story" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {a.story.map((s, i) => (
            <li key={s.title} className="relative text-center">
              {i < a.story.length - 1 && (
                <span className="hidden lg:block absolute top-7 left-0 -translate-x-1/2 w-full h-px border-t border-dashed border-gray-200" />
              )}
              <span className="relative mx-auto h-14 w-14 rounded-full bg-[#EEF3FF] flex items-center justify-center">
                <Icon name={s.icon} size={24} style={{ backgroundColor: ORANGE }} />
              </span>
              <h3 className="mt-3 text-[13px] font-black" style={{ color: NAVY }}>
                {s.title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-7 text-gray-500">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* چشم‌انداز + مأموریت */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {[a.mission, a.vision].map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl p-5 flex items-center gap-4 overflow-hidden"
              style={{ backgroundColor: i === 0 ? '#FDF1E6' : '#EEF3FF' }}
            >
              <span className="flex-1 text-right">
                <span className="flex items-center gap-2 justify-end">
                  <span className="text-[15px] font-black" style={{ color: i === 0 ? ORANGE : NAVY }}>
                    {v.title}
                  </span>
                  <Icon name={v.icon} size={18} style={{ backgroundColor: i === 0 ? ORANGE : NAVY }} />
                </span>
                <span className="mt-2 block text-[11.5px] leading-7 text-gray-600">{v.desc}</span>
              </span>
              <img src={v.art} alt="" className="w-[110px] shrink-0 object-contain" />
            </div>
          ))}
        </div>
      </Section>

      {/* باورها */}
      <Section title={a.beliefTitle}>
        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {a.beliefs.map((b) => (
            <li key={b.title} className="text-center">
              <Icon name={b.icon} size={26} style={{ backgroundColor: NAVY }} />
              <p className="mt-2.5 text-[12px] font-black leading-6" style={{ color: NAVY }}>
                {b.title}
              </p>
              <p className="text-[11px] text-gray-500">{b.sub}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* اکوسیستم + تیم */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-[340px_1fr] items-start">
          <Card>
            <h2 className="text-center text-[15px] font-black" style={{ color: NAVY }}>
              {a.ecoTitle}
            </h2>
            <ul className="mt-5 grid grid-cols-3 gap-3">
              {a.eco.map((e) => (
                <li key={e.label} className="text-center">
                  <span className="mx-auto h-11 w-11 rounded-full bg-[#F4F6FD] flex items-center justify-center">
                    <Icon name={e.icon} size={18} style={{ backgroundColor: NAVY }} />
                  </span>
                  <span className="mt-1.5 block text-[9px] leading-4 text-gray-500">{e.label}</span>
                </li>
              ))}
            </ul>
            <button className="mt-5 mx-auto flex items-center gap-2 text-[11px] font-bold" style={{ color: ORANGE }}>
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: ORANGE }} />
              {a.ecoCta}
            </button>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-black" style={{ color: NAVY }}>
                {a.teamBadge}
              </span>
              <span className="text-[11.5px] font-bold" style={{ color: ORANGE }}>
                {a.teamTitle}
              </span>
            </div>

            <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {a.team.map((m) => (
                <li key={m.name} className="rounded-2xl border border-gray-100 p-4 text-center">
                  <img src={m.avatar} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" />
                  <p className="mt-2.5 text-[12px] font-black" style={{ color: NAVY }}>
                    {m.name}
                  </p>
                  <p className="text-[10px]" style={{ color: ORANGE }}>
                    {m.role}
                  </p>
                  <p className="mt-1.5 text-[9.5px] leading-5 text-gray-500">{m.desc}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* آمار */}
      <Section>
        <ul className="rounded-2xl bg-[#F4F6FD] px-5 py-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {a.stats.map((s) => (
            <li key={s.label} className="flex items-center gap-3 justify-center">
              <span className="text-right">
                <span className="block text-[20px] font-black" style={{ color: NAVY }}>
                  {s.value}
                </span>
                <span className="block text-[10px] text-gray-500">{s.label}</span>
              </span>
              <Icon name={s.icon} size={24} style={{ backgroundColor: ORANGE }} />
            </li>
          ))}
        </ul>
      </Section>

      {/* اعتماد */}
      <Section>
        <div className="flex items-center justify-between gap-3 mb-4">
          <button className="text-[11px] font-bold" style={{ color: ORANGE }}>
            {a.trustCta}
          </button>
          <h2 className="text-[15px] font-black" style={{ color: NAVY }}>
            {a.trustTitle}
          </h2>
        </div>
        <ul className="rounded-2xl border border-gray-100 bg-white px-4 py-5 flex items-center justify-between gap-6 flex-wrap">
          {a.logos.map((l) => (
            <li key={l}>
              <img src={l} alt="" className="h-9 w-auto object-contain opacity-70 grayscale" />
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pb-14">
        <CtaRow items={a.cta} />
      </Section>
    </div>
  );
}
