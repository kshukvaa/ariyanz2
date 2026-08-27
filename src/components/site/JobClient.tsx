'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Crumbs, Section, Card, NAVY, ORANGE } from './SiteParts';
import { job as j } from '@/data/site/pages';

/* جزئیات موقعیت شغلی — «8.png». */

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="flex-1 text-right text-[11px] leading-7 text-gray-600">{children}</span>
      <Icon name="lucide:circle-check" size={13} className="shrink-0 mt-1.5" style={{ backgroundColor: '#2f6df6' }} />
    </li>
  );
}

export default function JobClient() {
  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5">
        <Crumbs items={[{ label: 'خانه', href: '/' }, { label: 'فرصت‌های شغلی', href: '/careers' }, { label: j.crumb }]} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-4 lg:grid-cols-[340px_1fr] items-start">
          {/* Apply rail declared first → right. */}
          <aside className="space-y-4 lg:sticky lg:top-4">
            <Card>
              <h2 className="text-right text-[14px] font-black" style={{ color: NAVY }}>
                {j.form.title}
              </h2>
              <p className="mt-1.5 text-right text-[10.5px] leading-6 text-gray-500">{j.form.desc}</p>

              <div className="mt-4 space-y-2.5">
                {j.form.fields.map((f) => (
                  <label key={f.label} className="flex items-center gap-2.5 rounded-xl border border-gray-100 px-3.5 py-2.5">
                    <Icon name={f.icon} size={14} className="shrink-0 order-2" style={{ backgroundColor: '#9aa3b8' }} />
                    <input
                      placeholder={f.label}
                      className="flex-1 min-w-0 bg-transparent text-right text-[11px] outline-none placeholder:text-gray-400 order-1"
                      style={{ color: NAVY }}
                    />
                  </label>
                ))}
              </div>

              <p className="mt-3.5 flex items-center gap-1.5 justify-end text-[10.5px] font-bold" style={{ color: NAVY }}>
                {j.form.upload.label}
                <Icon name="lucide:upload" size={12} style={{ backgroundColor: '#9aa3b8' }} />
              </p>
              <div className="mt-2 rounded-xl border border-dashed border-gray-200 bg-[#fbfcff] px-4 py-5 text-center">
                <Icon name="lucide:cloud-upload" size={26} style={{ backgroundColor: '#2f6df6' }} />
                <p className="mt-2 text-[10.5px] font-bold" style={{ color: '#2f6df6' }}>
                  {j.form.upload.cta}
                </p>
                <p className="mt-1 text-[9px] text-gray-400" dir="ltr">
                  {j.form.upload.note}
                </p>
              </div>

              <label className="mt-3 block">
                <span className="flex items-center gap-1.5 justify-end text-[10.5px] font-bold" style={{ color: NAVY }}>
                  {j.form.note.label}
                  <Icon name="lucide:pencil-line" size={12} style={{ backgroundColor: '#9aa3b8' }} />
                </span>
                <textarea
                  rows={3}
                  placeholder={j.form.note.placeholder}
                  className="mt-2 w-full resize-none rounded-xl border border-gray-100 px-3.5 py-3 text-right text-[10.5px] outline-none placeholder:text-gray-400"
                  style={{ color: NAVY }}
                />
              </label>

              <button
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-black text-white"
                style={{ backgroundColor: ORANGE }}
              >
                <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: '#fff' }} />
                {j.form.cta}
              </button>

              <p className="mt-2.5 flex items-center gap-1.5 justify-center text-[9.5px] text-gray-400">
                {j.form.privacy}
                <Icon name="lucide:lock" size={11} style={{ backgroundColor: '#9aa3b8' }} />
              </p>
            </Card>

            {/* Agent. */}
            <Card>
              <div className="flex items-start gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[13px] font-black" style={{ color: NAVY }}>
                    {j.agent.title}
                  </span>
                  <span className="mt-1 block text-[10.5px]" style={{ color: ORANGE }}>
                    {j.agent.sub}
                  </span>
                </span>
                <img src="/images/aryaz/illustrations/ai-assistant-avatar.png" alt="" className="h-14 w-14 shrink-0 object-contain" />
              </div>

              <p className="mt-3 rounded-xl bg-[#F4F6FD] p-3 text-right text-[10.5px] leading-6 text-gray-600">
                {j.agent.bubble}
              </p>

              <ul className="mt-3 space-y-2">
                {j.agent.chips.map((c) => (
                  <li key={c}>
                    <button className="w-full flex items-center gap-2 rounded-xl border border-gray-100 px-3 py-2.5 text-right">
                      <Icon name="lucide:chevron-left" size={11} className="shrink-0 order-3" style={{ backgroundColor: '#9aa3b8' }} />
                      <span className="flex-1 text-[10px] font-bold order-2" style={{ color: NAVY }}>
                        {c}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <label className="mt-3 flex items-center gap-2.5 rounded-xl border border-gray-100 px-3 py-2.5">
                <button aria-label="ارسال" className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: NAVY }}>
                  <Icon name="lucide:send" size={13} style={{ backgroundColor: '#fff' }} />
                </button>
                <input
                  placeholder={j.agent.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-right text-[10.5px] outline-none placeholder:text-gray-400"
                  style={{ color: NAVY }}
                />
              </label>
            </Card>

            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FDF1E6' }}>
              <div className="flex items-start gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[13px] font-black" style={{ color: NAVY }}>
                    موقعیت مناسب پیدا نکردید؟
                  </span>
                  <span className="mt-1.5 block text-[10.5px] leading-6 text-gray-500">
                    استعداد خوب همیشه برای ما ارزشمند است. رزومه خود را برای فرصت‌های آینده ثبت کنید
                  </span>
                </span>
                <Icon name="lucide:clipboard-list" size={30} className="shrink-0" style={{ backgroundColor: ORANGE }} />
              </div>
              <button
                className="mt-3.5 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-[11.5px] font-bold text-white"
                style={{ backgroundColor: ORANGE }}
              >
                <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: '#fff' }} />
                ارسال رزومه عمومی
              </button>
            </div>
          </aside>

          <main className="min-w-0 space-y-4">
            {/* Header. */}
            <Card>
              <div className="flex items-start gap-6 flex-wrap">
                <img src={j.art} alt="" className="w-[210px] max-w-full object-contain order-1 mx-auto" />

                <div className="flex-1 min-w-[260px] order-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf7ee] px-3 py-1 text-[10px] font-bold" style={{ color: '#1c8a4e' }}>
                      {j.status}
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#1c8a4e' }} />
                    </span>
                    <h1 className="text-[26px] font-black" style={{ color: NAVY }} dir="ltr">
                      {j.title}
                    </h1>
                  </div>

                  <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {j.meta.map((m) => (
                      <li key={m.label} className="flex items-center gap-2 justify-end">
                        <span className="text-right">
                          <span className="block text-[9.5px] text-gray-400">{m.label}</span>
                          <span className="block text-[11px] font-bold" style={{ color: NAVY }}>
                            {m.value}
                          </span>
                        </span>
                        <Icon name={m.icon} size={15} style={{ backgroundColor: '#9aa3b8' }} />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center gap-3 flex-wrap">
                    <button
                      className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[12.5px] font-black text-white"
                      style={{ backgroundColor: ORANGE }}
                    >
                      <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: '#fff' }} />
                      {j.apply}
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-[12.5px] font-bold"
                      style={{ borderColor: NAVY, color: NAVY }}
                    >
                      <Icon name="lucide:bookmark" size={13} style={{ backgroundColor: NAVY }} />
                      {j.save}
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 items-start">
              <Card>
                <h2 className="flex items-center gap-2 justify-end text-[14px] font-black" style={{ color: NAVY }}>
                  {j.about.title}
                  <Icon name="lucide:info" size={16} style={{ backgroundColor: ORANGE }} />
                </h2>
                <p className="mt-3 text-right text-[11.5px] leading-8 text-gray-500">{j.about.body}</p>
              </Card>

              <Card>
                <h2 className="flex items-center gap-2 justify-end text-[14px] font-black" style={{ color: NAVY }}>
                  {j.why.title}
                  <Icon name="lucide:diamond" size={16} style={{ backgroundColor: ORANGE }} />
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {j.why.items.map((i) => (
                    <Check key={i}>{i}</Check>
                  ))}
                </ul>
              </Card>

              <Card>
                <h2 className="flex items-center gap-2 justify-end text-[14px] font-black" style={{ color: NAVY }}>
                  {j.duties.title}
                  <Icon name="lucide:clipboard-pen" size={16} style={{ backgroundColor: ORANGE }} />
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {j.duties.items.map((i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-1 text-right text-[11px] leading-7 text-gray-600">{i}</span>
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ORANGE }} />
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h2 className="flex items-center gap-2 justify-end text-[14px] font-black" style={{ color: NAVY }}>
                  {j.skills.title}
                  <Icon name="lucide:user-round-check" size={16} style={{ backgroundColor: ORANGE }} />
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#F8F9FE] p-3.5">
                    <p className="text-right text-[11px] font-black" style={{ color: ORANGE }}>
                      {j.skills.mustTitle}
                    </p>
                    <ul className="mt-2.5 space-y-2">
                      {j.skills.must.map((i) => (
                        <Check key={i}>{i}</Check>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-[#F8F9FE] p-3.5">
                    <p className="text-right text-[11px] font-black" style={{ color: NAVY }}>
                      {j.skills.plusTitle}
                    </p>
                    <ul className="mt-2.5 space-y-2">
                      {j.skills.plus.map((i) => (
                        <Check key={i}>{i}</Check>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <h2 className="flex items-center gap-2 justify-end text-[14px] font-black" style={{ color: NAVY }}>
                {j.stack.title}
                <Icon name="lucide:cog" size={16} style={{ backgroundColor: ORANGE }} />
              </h2>
              <ul className="mt-3.5 flex items-center gap-2 justify-end flex-wrap">
                {j.stack.items.map((t) => (
                  <li key={t}>
                    <span className="rounded-xl bg-[#F4F6FD] px-3.5 py-2 text-[10.5px] font-bold" style={{ color: NAVY }} dir="ltr">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="grid gap-4 md:grid-cols-3 items-start">
              <Card>
                <h2 className="flex items-center gap-2 justify-end text-[13px] font-black" style={{ color: NAVY }}>
                  {j.process.title}
                  <Icon name="lucide:briefcase" size={15} style={{ backgroundColor: ORANGE }} />
                </h2>
                <ol className="mt-3.5 space-y-2.5">
                  {j.process.items.map((p, i) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <span className="flex-1 text-right text-[11px] text-gray-600">{p}</span>
                      <span
                        className="h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ backgroundColor: NAVY }}
                      >
                        {(i + 1).toLocaleString('fa-IR')}
                      </span>
                    </li>
                  ))}
                </ol>
              </Card>

              <Card>
                <h2 className="flex items-center gap-2 justify-end text-[13px] font-black" style={{ color: NAVY }}>
                  {j.culture.title}
                  <Icon name="lucide:heart" size={15} style={{ backgroundColor: ORANGE }} />
                </h2>
                <p className="mt-2.5 text-right text-[10.5px] leading-6 text-gray-500">{j.culture.lead}</p>
                <ul className="mt-2.5 space-y-2">
                  {j.culture.items.map((i) => (
                    <Check key={i}>{i}</Check>
                  ))}
                </ul>
              </Card>

              <Card>
                <h2 className="flex items-center gap-2 justify-end text-[13px] font-black" style={{ color: NAVY }}>
                  {j.team.title}
                  <Icon name="lucide:users-round" size={15} style={{ backgroundColor: ORANGE }} />
                </h2>
                <p className="mt-2.5 text-right text-[10.5px] leading-6 text-gray-500">{j.team.desc}</p>
                <ul className="mt-3.5 grid grid-cols-5 gap-2">
                  {j.team.members.map((m) => (
                    <li key={m.role} className="text-center">
                      <span className="mx-auto h-9 w-9 rounded-full bg-[#F4F6FD] flex items-center justify-center">
                        <Icon name={m.icon} size={15} style={{ backgroundColor: NAVY }} />
                      </span>
                      <span className="mt-1 block text-[7.5px] leading-3 text-gray-500" dir="ltr">
                        {m.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Similar roles. */}
            <Card>
              <div className="flex items-center justify-between gap-3">
                <Link href="/careers" className="text-[10.5px] font-bold" style={{ color: ORANGE }}>
                  {j.similar.cta}
                </Link>
                <h2 className="text-[14px] font-black" style={{ color: NAVY }}>
                  {j.similar.title}
                </h2>
              </div>

              <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {j.similar.items.map((s) => (
                  <li key={s.title} className="rounded-2xl border border-gray-100 p-4 text-center">
                    <Icon name={s.icon} size={22} style={{ backgroundColor: NAVY }} />
                    <p className="mt-2 text-[12px] font-black" style={{ color: NAVY }} dir="ltr">
                      {s.title}
                    </p>
                    <p className="mt-1 text-[9.5px] text-gray-500">{s.team}</p>
                    <p className="mt-0.5 text-[9px] text-gray-400" dir="ltr">
                      {s.city} {s.mode}
                    </p>
                    <button className="mt-3 w-full rounded-xl border border-gray-100 py-2 text-[10px] font-bold" style={{ color: NAVY }}>
                      {j.similar.jobCta}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
