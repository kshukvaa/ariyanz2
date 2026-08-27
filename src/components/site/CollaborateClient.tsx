'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Crumbs, Section, Card, Accordion, NAVY, ORANGE } from './SiteParts';
import { collaborate as c } from '@/data/site/pages';

/* همکاری با آریاز — «6.png». */

export default function CollaborateClient() {
  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5">
        <Crumbs items={[{ label: 'خانه', href: '/' }, { label: c.crumb }]} />
      </div>

      <section className="bg-gradient-to-b from-[#f7f9ff] to-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-10 flex-wrap">
            <img src={c.art} alt="" className="w-[380px] max-w-full object-contain order-2 mx-auto" />
            <div className="flex-1 min-w-[280px] text-right order-1">
              <h1 className="text-[26px] sm:text-[34px] font-black leading-[1.45]" style={{ color: NAVY }}>
                {c.title}
              </h1>
              <p className="mt-4 text-[13px] leading-8 text-gray-500 max-w-[520px]">{c.desc}</p>
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

      <Section title={c.rolesTitle}>
        <ul id="roles" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {c.roles.map((r) => (
            <li key={r.title}>
              <Card className="h-full">
                <span className="h-12 w-12 rounded-2xl bg-[#EEF3FF] flex items-center justify-center">
                  <Icon name={r.icon} size={22} style={{ backgroundColor: NAVY }} />
                </span>
                <h3 className="mt-3.5 text-right text-[13px] font-black" style={{ color: NAVY }}>
                  {r.title}
                </h3>
                <p className="mt-2 text-right text-[10.5px] leading-6 text-gray-500">{r.desc}</p>
                <button className="mt-3.5 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: ORANGE }}>
                  <Icon name="lucide:arrow-left" size={11} style={{ backgroundColor: ORANGE }} />
                  {r.cta}
                </button>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={c.whyTitle}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.why.map((w) => (
            <li key={w.title}>
              <Card className="h-full text-center">
                <Icon name={w.icon} size={30} style={{ backgroundColor: ORANGE }} />
                <h3 className="mt-3 text-[13px] font-black" style={{ color: NAVY }}>
                  {w.title}
                </h3>
                <p className="mt-2 text-[10.5px] leading-6 text-gray-500">{w.desc}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={c.pathTitle}>
        <ol className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {c.path.map((s) => (
            <li key={s.n} className="text-center">
              <span className="relative mx-auto h-14 w-14 rounded-full bg-[#EEF3FF] flex items-center justify-center">
                <Icon name={s.icon} size={22} style={{ backgroundColor: NAVY }} />
                <span
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: ORANGE }}
                >
                  {s.n}
                </span>
              </span>
              <h3 className="mt-3 text-[12px] font-black" style={{ color: NAVY }}>
                {s.title}
              </h3>
              <p className="mt-1.5 text-[10px] leading-6 text-gray-500">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-3 items-start">
          {/* Form declared first → right. */}
          <Card>
            <h2 id="form" className="text-right text-[14px] font-black" style={{ color: NAVY }}>
              {c.form.title}
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {c.form.fields.map((f) => (
                <label
                  key={f.label}
                  className={`flex items-center gap-2 rounded-xl border border-gray-100 px-3 py-2.5 ${f.wide ? 'sm:col-span-2' : ''}`}
                >
                  <input
                    placeholder={f.label}
                    readOnly={f.kind === 'select'}
                    className="flex-1 min-w-0 bg-transparent text-right text-[11px] outline-none placeholder:text-gray-400"
                    style={{ color: NAVY }}
                  />
                  {f.kind === 'select' && (
                    <Icon name="lucide:chevron-down" size={12} className="shrink-0" style={{ backgroundColor: '#9aa3b8' }} />
                  )}
                </label>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-gray-200 px-4 py-4">
              <span className="flex-1 text-right">
                <span className="block text-[11.5px] font-bold" style={{ color: NAVY }}>
                  {c.form.upload.label}
                </span>
                <span className="mt-0.5 block text-[9.5px] text-gray-400">{c.form.upload.note}</span>
              </span>
              <Icon name="lucide:upload" size={18} style={{ backgroundColor: ORANGE }} />
            </div>

            <button
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-black text-white"
              style={{ backgroundColor: ORANGE }}
            >
              <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: '#fff' }} />
              {c.form.cta}
            </button>
          </Card>

          <Card>
            <h2 className="text-right text-[14px] font-black" style={{ color: NAVY }}>
              {c.fields.title}
            </h2>
            <ul className="mt-4 flex items-center gap-2 justify-end flex-wrap">
              {c.fields.items.map((t) => (
                <li key={t}>
                  <span className="inline-block rounded-xl bg-[#F4F6FD] px-3 py-2 text-[10px] font-bold" style={{ color: NAVY }}>
                    {t}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-[#F4F6FD] p-4">
              <h3 className="text-right text-[12.5px] font-black" style={{ color: NAVY }}>
                {c.experts.title}
              </h3>
              <div className="mt-3 flex items-center gap-2 justify-end">
                <span
                  className="h-10 w-10 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  {c.experts.more}
                </span>
                {c.experts.avatars.map((a) => (
                  <img key={a} src={a} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
                ))}
              </div>
              <p className="mt-2.5 text-right text-[10.5px] text-gray-500">{c.experts.desc}</p>
              <Link href="/instructors" className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[10.5px] font-bold" style={{ color: NAVY }}>
                <Icon name="lucide:arrow-left" size={11} style={{ backgroundColor: NAVY }} />
                {c.experts.cta}
              </Link>
            </div>
          </Card>

          <Card>
            <h2 className="text-right text-[14px] font-black" style={{ color: NAVY }}>
              {c.looking.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {c.looking.items.map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex-1 text-right text-[11px] leading-7 text-gray-600">{i}</span>
                  <Icon name="lucide:circle-check" size={14} className="shrink-0 mt-1" style={{ backgroundColor: '#1c8a4e' }} />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section className="pb-14">
        <div className="grid gap-4 lg:grid-cols-2 items-start">
          <Card>
            <h2 className="text-right text-[14px] font-black" style={{ color: NAVY }}>
              {c.faq.title}
            </h2>
            <div className="mt-4">
              <Accordion items={c.faq.items} defaultOpen={-1} />
            </div>
            <button className="mt-4 flex items-center gap-2 text-[11px] font-bold" style={{ color: ORANGE }}>
              <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: ORANGE }} />
              {c.faq.cta}
            </button>
          </Card>

          <div className="rounded-2xl p-6" style={{ backgroundColor: '#FDF1E6' }}>
            <div className="flex items-start gap-4">
              <span className="flex-1 text-right">
                <span className="block text-[15px] font-black" style={{ color: NAVY }}>
                  {c.help.title}
                </span>
                <span className="mt-2 block text-[11.5px] leading-7 text-gray-600">{c.help.desc}</span>
              </span>
              <Icon name="lucide:headphones" size={44} className="shrink-0" style={{ backgroundColor: ORANGE }} />
            </div>

            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[12px] font-bold text-white"
                style={{ backgroundColor: ORANGE }}
              >
                <Icon name="lucide:phone-call" size={13} style={{ backgroundColor: '#fff' }} />
                {c.help.primary}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[12px] font-bold"
                style={{ color: ORANGE }}
              >
                <Icon name="lucide:send" size={13} style={{ backgroundColor: ORANGE }} />
                {c.help.secondary}
              </Link>
            </div>

            <p className="mt-4 flex items-center gap-2 justify-end text-[10.5px] text-gray-500">
              {c.help.note}
              <Icon name="lucide:clock" size={12} style={{ backgroundColor: '#9aa3b8' }} />
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
