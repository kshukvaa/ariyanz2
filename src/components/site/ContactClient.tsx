'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Crumbs, PageHero, Section, Card, Accordion, CtaRow, NAVY, ORANGE } from './SiteParts';
import { contact as c } from '@/data/site/pages';

/* تماس با ما — «2.png». */

export default function ContactClient() {
  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5">
        <Crumbs items={[{ label: 'خانه', href: '/' }, { label: c.crumb }]} />
      </div>

      <PageHero title={c.title} desc={c.desc} art={c.art} />

      {/* Four routes. */}
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.routes.map((r) => (
            <Card key={r.title}>
              <span className="h-12 w-12 rounded-2xl bg-[#F4F6FD] flex items-center justify-center">
                <Icon name={r.icon} size={22} style={{ backgroundColor: r.tone === 'orange' ? ORANGE : NAVY }} />
              </span>
              <h3 className="mt-3.5 text-right text-[13.5px] font-black" style={{ color: NAVY }}>
                {r.title}
              </h3>
              <p className="mt-2 text-right text-[11px] leading-6 text-gray-500">{r.desc}</p>
              <Link
                href={r.href ?? '#form'}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border py-2.5 text-[11.5px] font-bold"
                style={{
                  borderColor: r.tone === 'orange' ? ORANGE : NAVY,
                  color: r.tone === 'orange' ? ORANGE : NAVY,
                }}
              >
                <Icon
                  name="lucide:arrow-left"
                  size={12}
                  style={{ backgroundColor: r.tone === 'orange' ? ORANGE : NAVY }}
                />
                {r.cta}
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Form + ways. */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-[380px_1fr] items-start">
          {/* Navy contact card declared first → right. */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: NAVY }}>
            <h2 className="text-center text-[15px] font-black text-white">{c.ways.title}</h2>

            <ul className="mt-5 space-y-4">
              {c.ways.items.map((w) => (
                <li key={w.label} className="flex items-center gap-3">
                  <span className="flex-1 text-right">
                    <span className="block text-[10px] text-white/50">{w.label}</span>
                    <span
                      className="mt-0.5 block text-[12.5px] font-bold text-white"
                      dir={w.ltr ? 'ltr' : undefined}
                      style={w.ltr ? { textAlign: 'right' } : undefined}
                    >
                      {w.value}
                    </span>
                    {w.sub && <span className="block text-[9.5px] text-white/50">{w.sub}</span>}
                  </span>
                  <span className="h-11 w-11 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Icon name={w.icon} size={18} style={{ backgroundColor: '#ffffff' }} />
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-center text-[11px] text-white/70">{c.ways.social}</p>
            <ul className="mt-3 flex items-center justify-center gap-3">
              {c.ways.socials.map((s) => (
                <li key={s.icon}>
                  <a
                    href="#"
                    aria-label={s.icon}
                    className="h-11 w-11 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: s.bg }}
                  >
                    <Icon name={s.icon} size={20} style={{ backgroundColor: '#ffffff' }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Card>
            <h2 id="form" className="text-right text-[15px] font-black" style={{ color: NAVY }}>
              {c.form.title}
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {c.form.fields.map((f) => (
                <label
                  key={f.label}
                  className={`flex items-center gap-2.5 rounded-xl border border-gray-100 px-3.5 py-3 ${f.wide ? 'sm:col-span-2' : ''}`}
                >
                  <Icon name={f.icon} size={15} className="shrink-0 order-3" style={{ backgroundColor: '#9aa3b8' }} />
                  <input
                    placeholder={f.label}
                    readOnly={f.kind === 'select'}
                    className="flex-1 min-w-0 bg-transparent text-right text-[11.5px] outline-none placeholder:text-gray-400 order-2"
                    style={{ color: NAVY }}
                  />
                  {f.kind === 'select' && (
                    <Icon name="lucide:chevron-down" size={13} className="shrink-0 order-1" style={{ backgroundColor: ORANGE }} />
                  )}
                </label>
              ))}
            </div>

            <label className="mt-3 block rounded-xl border border-gray-100 p-3.5">
              <span className="flex items-center gap-2 justify-end text-[11.5px] font-bold" style={{ color: NAVY }}>
                {c.form.message.label}
                <Icon name={c.form.message.icon} size={14} style={{ backgroundColor: '#9aa3b8' }} />
              </span>
              <textarea
                rows={4}
                className="mt-2 w-full resize-none bg-transparent text-right text-[11.5px] outline-none"
                style={{ color: NAVY }}
              />
              <span className="block text-left text-[9.5px] text-gray-400" dir="ltr">
                {c.form.message.limit}
              </span>
            </label>

            <button
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[13px] font-black text-white"
              style={{ backgroundColor: ORANGE }}
            >
              <Icon name="lucide:send" size={15} style={{ backgroundColor: '#ffffff' }} />
              {c.form.cta}
            </button>

            <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-gray-500">
              {c.form.note}
              <Icon name="lucide:shield-check" size={13} style={{ backgroundColor: '#1c8a4e' }} />
            </p>
          </Card>
        </div>
      </Section>

      {/* Office + map. */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-[340px_1fr] items-stretch">
          <Card>
            <h2 className="flex items-center gap-2 justify-end text-[14px] font-black" style={{ color: NAVY }}>
              {c.office.title}
              <Icon name={c.office.icon} size={17} style={{ backgroundColor: ORANGE }} />
            </h2>
            <div className="mt-3 space-y-1 text-right">
              {c.office.lines.map((l) => (
                <p key={l} className="text-[11.5px] leading-7 text-gray-500">
                  {l}
                </p>
              ))}
            </div>
            <button
              className="mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[11.5px] font-bold"
              style={{ borderColor: ORANGE, color: ORANGE }}
            >
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: ORANGE }} />
              {c.office.cta}
            </button>
          </Card>

          <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-gray-100 bg-[#eef0f5]">
            {/* Static stand-in for the map tile the sheet shows. */}
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'linear-gradient(#dfe3ec 1px, transparent 1px), linear-gradient(90deg, #dfe3ec 1px, transparent 1px)',
                backgroundSize: '46px 46px',
              }}
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full shadow-lg" style={{ backgroundColor: ORANGE }}>
              <Icon name="lucide:map-pin" size={20} style={{ backgroundColor: '#ffffff' }} />
            </span>
          </div>
        </div>
      </Section>

      {/* Agent + FAQ. */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-2 items-start">
          <div className="rounded-2xl bg-[#F4F6FD] p-5">
            <div className="flex items-start gap-3">
              <span className="flex-1 text-right">
                <span className="block text-[12.5px] font-bold" style={{ color: ORANGE }}>
                  {c.agent.title}
                </span>
                <span className="mt-1 block text-[14px] font-black" style={{ color: NAVY }}>
                  {c.agent.sub}
                </span>
              </span>
              <img src="/images/aryaz/illustrations/ai-assistant-avatar.png" alt="" className="h-16 w-16 shrink-0 object-contain" />
            </div>

            <label className="mt-4 flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5">
              <button aria-label="ارسال" className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: ORANGE }}>
                <Icon name="lucide:send" size={14} style={{ backgroundColor: '#ffffff' }} />
              </button>
              <input
                placeholder={c.agent.placeholder}
                className="flex-1 min-w-0 bg-transparent text-right text-[11.5px] outline-none placeholder:text-gray-400"
                style={{ color: NAVY }}
              />
            </label>

            <ul className="mt-3 flex items-center gap-2 justify-end flex-wrap">
              {c.agent.chips.map((ch) => (
                <li key={ch}>
                  <button className="rounded-xl bg-white px-3 py-2 text-[10px] font-bold" style={{ color: NAVY }}>
                    {ch}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Card>
            <h2 className="flex items-center gap-2 justify-end text-[14px] font-black" style={{ color: NAVY }}>
              {c.faq.title}
              <Icon name="lucide:circle-help" size={17} style={{ backgroundColor: ORANGE }} />
            </h2>
            <div className="mt-4">
              <Accordion items={c.faq.items} defaultOpen={-1} />
            </div>
            <Link href="/faq" className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold" style={{ color: ORANGE }}>
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: ORANGE }} />
              {c.faq.cta}
            </Link>
          </Card>
        </div>
      </Section>

      <Section className="pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          <CtaRow items={c.cta} />
        </div>
      </Section>
    </div>
  );
}
