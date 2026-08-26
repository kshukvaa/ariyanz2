'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import ClassroomCrumbs from './ClassroomCrumbs';
import {
  forumCrumbs,
  forumHero,
  forumCategories,
  forumTabs,
  forumToolbar,
  forumThreads,
  forumCompose,
  forumAgent,
  forumLeaders,
  forumOpen,
} from '@/data/lms/forum';

/* ──────────────────────────────────────────────────────────────
   تالار گفتگو.

   Categories right, threads centre, compose left — declared in
   that order because RTL puts the first column on the right.
────────────────────────────────────────────────────────────── */

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
    >
      {children}
    </section>
  );
}

export default function ForumClient() {
  const [tab, setTab] = useState('instructor');
  const [cat, setCat] = useState(forumCategories.items[0].label);

  return (
    <div style={{ backgroundColor: L.page }}>
      <ClassroomCrumbs crumbs={forumCrumbs.items} back={forumCrumbs.back} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#eef3fd' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-7">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr_260px] items-center">
            {/* Course card declared first → right. */}
            <div className="bg-white p-4 order-1" style={{ borderRadius: LR.lg }}>
              <div className="flex items-start gap-3">
                <div className="flex-1 text-right min-w-0">
                  <span className="block text-[11px] font-bold" style={{ color: L.navy }}>
                    {forumHero.course.label}
                  </span>
                  <span className="mt-1.5 block text-[12px] font-extrabold leading-6" style={{ color: L.navy }}>
                    {forumHero.course.title}
                  </span>
                </div>
                <span
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{ borderRadius: LR.md, backgroundColor: L.blue }}
                >
                  <Icon name={forumHero.course.icon} size={20} style={{ backgroundColor: '#ffffff' }} />
                </span>
              </div>

              <button className="mt-3 flex items-center gap-1.5 text-[11px] font-bold" style={{ color: L.blue }}>
                <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: L.blue }} />
                {forumHero.course.cta}
              </button>
            </div>

            <div className="text-center order-2">
              <h1 className="text-[24px] font-extrabold" style={{ color: L.navy }}>
                {forumHero.title}
              </h1>
              <p className="mt-3 text-[12px] leading-7" style={{ color: L.navy }}>
                {forumHero.desc.map((d) => (
                  <React.Fragment key={d}>
                    {d}
                    <br />
                  </React.Fragment>
                ))}
              </p>

              <ul className="mt-5 flex items-center justify-center gap-7 flex-wrap">
                {forumHero.stats.map((s, i) => (
                  <li key={`${s.label}-${i}`} className="flex items-center gap-1.5">
                    <span className="text-[13px] font-extrabold" style={{ color: L.navy }}>
                      {s.value}
                    </span>
                    <span className="text-[10.5px]" style={{ color: L.muted }}>
                      {s.label}
                    </span>
                    <Icon name={s.icon} size={13} style={{ backgroundColor: L.blue }} />
                  </li>
                ))}
              </ul>
            </div>

            <img
              src={forumHero.art}
              alt=""
              className="order-3 w-full max-w-[230px] mx-auto object-contain"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-4 xl:grid-cols-[240px_1fr_290px] items-start">
          {/* ── Categories (right) ───────────────────────────── */}
          <div className="space-y-4">
            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {forumCategories.title}
              </h2>

              <ul className="mt-3.5 space-y-1.5">
                {forumCategories.items.map((c) => {
                  const on = c.label === cat;
                  return (
                    <li key={c.label}>
                      <button
                        onClick={() => setCat(c.label)}
                        aria-pressed={on}
                        className="w-full flex items-center gap-2 px-3 py-2.5"
                        style={{ borderRadius: LR.sm, backgroundColor: on ? L.blueSoft : 'transparent' }}
                      >
                        <span
                          className="px-2 py-0.5 text-[9.5px] font-bold shrink-0"
                          style={{
                            borderRadius: LR.pill,
                            backgroundColor: on ? L.blue : '#eef0f6',
                            color: on ? '#ffffff' : L.muted,
                          }}
                        >
                          {c.count}
                        </span>
                        <span
                          className="flex-1 text-right text-[11.5px] font-bold"
                          style={{ color: on ? L.blue : L.navy }}
                        >
                          {c.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <Card>
              <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: L.navy }}>
                {forumAgent.title}
                <span
                  className="w-8 h-8 flex items-center justify-center shrink-0"
                  style={{ borderRadius: LR.sm, backgroundColor: L.blueSoft }}
                >
                  <Icon name="lucide:bot" size={15} style={{ backgroundColor: L.blue }} />
                </span>
              </h2>

              <p className="mt-3 text-center text-[10.5px] font-bold leading-6" style={{ color: L.navy }}>
                {forumAgent.desc.map((d) => (
                  <React.Fragment key={d}>
                    {d}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <p className="mt-2 text-center text-[10px]" style={{ color: L.muted }}>
                {forumAgent.lead}
              </p>

              <div className="mt-3 space-y-2">
                {forumAgent.actions.map((a) => (
                  <button
                    key={a.label}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-[10.5px] font-bold"
                    style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
                  >
                    {a.label}
                    <Icon name={a.icon} size={13} style={{ backgroundColor: L.blue }} />
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {forumLeaders.title}
              </h2>

              <ul className="mt-3.5 space-y-3">
                {forumLeaders.items.map((p) => (
                  <li key={p.name} className="flex items-center gap-2.5">
                    <Icon name="lucide:medal" size={18} className="shrink-0 order-3" style={{ backgroundColor: p.fg }} />
                    <span className="flex-1 text-right min-w-0 order-2">
                      <span className="block text-[11.5px] font-extrabold" style={{ color: L.navy }}>
                        {p.name}
                      </span>
                      <span className="block text-[9.5px]" style={{ color: L.muted }}>
                        {p.note}
                      </span>
                    </span>
                    <img src={p.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0 order-1" />
                  </li>
                ))}
              </ul>

              <button className="mt-4 w-full text-[10.5px] font-bold" style={{ color: L.blue }}>
                {forumLeaders.cta}
              </button>
            </Card>
          </div>

          {/* ── Threads (centre) ─────────────────────────────── */}
          <main className="min-w-0 space-y-4">
            <div
              className="bg-white px-2 overflow-x-auto"
              style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
            >
              <div className="flex items-center gap-1 min-w-max justify-end">
                {forumTabs.map((t) => {
                  const on = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="relative flex items-center gap-2 px-5 py-4 text-[12px] whitespace-nowrap"
                      style={{ color: on ? L.navy : L.muted, fontWeight: on ? 800 : 600 }}
                    >
                      {t.label}
                      <Icon name={t.icon} size={14} style={{ backgroundColor: on ? L.orange : L.muted }} />
                      {on && (
                        <span
                          className="absolute bottom-0 inset-x-3 h-[3px] rounded-t-full"
                          style={{ backgroundColor: L.orange }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Card>
              <header className="flex items-center gap-3 flex-wrap">
                <button
                  className="flex items-center gap-1.5 px-3.5 py-2 text-[10.5px] font-bold"
                  style={{ borderRadius: LR.sm, border: `1px solid ${L.border}`, color: L.navy }}
                >
                  {forumToolbar.filters}
                  <Icon name="lucide:sliders-horizontal" size={12} style={{ backgroundColor: L.navy }} />
                </button>

                <label
                  className="flex items-center gap-2 px-3.5 py-2"
                  style={{ borderRadius: LR.sm, border: `1px solid ${L.border}` }}
                >
                  <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: L.muted }} />
                  <span className="text-[10.5px] font-bold" style={{ color: L.navy }}>
                    {forumToolbar.sortValue}
                  </span>
                </label>

                <span className="flex-1 text-right text-[10.5px]" style={{ color: L.muted }}>
                  {forumToolbar.sortLabel}
                </span>
              </header>

              <ul className="mt-4 space-y-2.5">
                {forumThreads.map((t) => (
                  <li
                    key={t.id}
                    className="p-4"
                    style={{
                      borderRadius: LR.md,
                      border: `1px solid ${L.border}`,
                      borderInlineStart: t.instructorAnswered ? `3px solid ${L.orange}` : undefined,
                      backgroundColor: t.instructorAnswered ? '#fffdf8' : '#ffffff',
                    }}
                  >
                    <div className="flex items-start gap-3 flex-wrap">
                      <img src={t.avatar} alt="" className="w-11 h-11 rounded-full object-cover shrink-0 order-1" />

                      <span className="text-right shrink-0 order-2">
                        <span className="block text-[11.5px] font-extrabold" style={{ color: L.navy }}>
                          {t.author}
                        </span>
                        <span className="block text-[9px]" style={{ color: L.muted }}>
                          {t.role}
                        </span>
                        <span className="block text-[9px]" style={{ color: L.muted }}>
                          {t.when}
                        </span>
                      </span>

                      <div className="flex-1 min-w-[180px] text-right order-3">
                        <h3 className="text-[13px] font-extrabold" style={{ color: L.navy }}>
                          {t.title}
                        </h3>
                        <ul className="mt-2 flex items-center justify-end gap-2 flex-wrap">
                          {t.tags.map((tag) => (
                            <li
                              key={tag}
                              className="px-2.5 py-1 text-[9px]"
                              style={{ borderRadius: LR.sm, backgroundColor: '#f2f3f8', color: L.muted }}
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <span className="flex items-center gap-3 shrink-0 order-4">
                        {t.instructorAnswered && (
                          <span className="text-center">
                            <Icon name="lucide:star" size={18} style={{ backgroundColor: L.blue }} />
                            <span
                              className="mt-1 block px-2 py-0.5 text-[8.5px] font-bold"
                              style={{ borderRadius: LR.sm, backgroundColor: L.orangeSoft, color: L.orange }}
                            >
                              پاسخ مدرس
                            </span>
                          </span>
                        )}
                        <span className="text-center">
                          <span className="block text-[13px] font-extrabold" style={{ color: L.blue }}>
                            {t.replies}
                          </span>
                          <span className="block text-[9px]" style={{ color: L.muted }}>
                            پاسخ
                          </span>
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[11.5px] font-bold"
                style={{ borderRadius: LR.md, backgroundColor: L.blueTint, color: L.blue }}
              >
                <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: L.blue }} />
                {forumToolbar.more}
              </button>
            </Card>

            {/* Opened thread. */}
            <Card>
              <header className="flex items-center gap-3 flex-wrap">
                <span
                  className="px-2.5 py-1 text-[9.5px] shrink-0"
                  style={{ borderRadius: LR.sm, backgroundColor: '#f2f3f8', color: L.muted }}
                >
                  {forumOpen.tag}
                </span>
                <h2 className="flex-1 text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
                  {forumOpen.title}
                </h2>
              </header>

              <div className="mt-4 grid gap-4 lg:grid-cols-2 items-start">
                {/* Original post declared first → right. */}
                <div className="p-4" style={{ borderRadius: LR.md, backgroundColor: '#fafbfe' }}>
                  <div className="flex items-start gap-2.5">
                    <span className="flex-1 text-right min-w-0">
                      <span className="block text-[12px] font-extrabold" style={{ color: L.navy }}>
                        {forumOpen.original.author}
                      </span>
                      <span className="block text-[9px]" style={{ color: L.muted }}>
                        {forumOpen.original.when}
                      </span>
                    </span>
                    <img
                      src={forumOpen.original.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                  </div>

                  <p className="mt-3 text-right text-[11px] leading-7" style={{ color: L.navy }}>
                    {forumOpen.original.body}
                  </p>

                  <div
                    className="mt-3 flex items-center gap-2.5 px-3 py-2.5"
                    style={{ borderRadius: LR.sm, backgroundColor: '#ffffff', border: `1px solid ${L.border}` }}
                  >
                    <span className="text-[9px]" style={{ color: L.muted }}>
                      {forumOpen.original.attachment.size}
                    </span>
                    <span className="flex-1 text-right text-[10.5px] font-bold truncate" style={{ color: L.navy }}>
                      {forumOpen.original.attachment.name}
                    </span>
                    <Icon name="lucide:file-text" size={15} className="shrink-0" style={{ backgroundColor: L.blue }} />
                  </div>
                </div>

                <ul className="space-y-3">
                  {forumOpen.replies.map((r) => (
                    <li
                      key={r.author}
                      className="p-4"
                      style={{
                        borderRadius: LR.md,
                        backgroundColor: r.approved ? '#f1faf5' : '#fafbfe',
                        border: r.approved ? '1px solid #bfe6d0' : `1px solid ${L.border}`,
                      }}
                    >
                      {r.approved && (
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold"
                          style={{ borderRadius: LR.pill, backgroundColor: '#dff3e8', color: L.green }}
                        >
                          {r.approved}
                          <Icon name="lucide:circle-check" size={10} style={{ backgroundColor: L.green }} />
                        </span>
                      )}

                      <div className="mt-2 flex items-start gap-2.5 flex-wrap">
                        <span className="flex-1 min-w-0 text-right">
                          <span className="flex items-center justify-end gap-2 flex-wrap">
                            {r.badges?.map((b) => (
                              <span
                                key={b}
                                className="px-2 py-0.5 text-[8.5px] font-bold"
                                style={{ borderRadius: LR.sm, backgroundColor: L.blueSoft, color: L.blue }}
                              >
                                {b}
                              </span>
                            ))}
                            <span className="text-[12px] font-extrabold" style={{ color: L.navy }}>
                              {r.author}
                            </span>
                          </span>
                          <span className="block text-[9px]" style={{ color: L.muted }}>
                            {r.when}
                          </span>
                        </span>
                        <img src={r.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                      </div>

                      <p className="mt-2.5 text-right text-[11px] leading-7" style={{ color: L.navy }}>
                        {r.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </main>

          {/* ── Compose (left) ───────────────────────────────── */}
          <Card>
            <h2 className="flex items-center justify-end gap-2.5 text-[14px] font-extrabold" style={{ color: L.navy }}>
              {forumCompose.title}
              <span
                className="w-9 h-9 flex items-center justify-center shrink-0"
                style={{ borderRadius: '999px', backgroundColor: L.orange }}
              >
                <Icon name="lucide:plus" size={18} style={{ backgroundColor: '#ffffff' }} />
              </span>
            </h2>

            <div className="mt-4 space-y-3.5">
              {forumCompose.fields.map((f) => (
                <label key={f.id} className="block">
                  <span className="block text-right text-[11px] font-bold" style={{ color: L.navy }}>
                    {f.label}
                  </span>

                  {f.kind === 'textarea' ? (
                    <textarea
                      rows={4}
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full px-3 py-2.5 text-right text-[11px] outline-none resize-none placeholder:text-[#9396b0]"
                      style={{ borderRadius: LR.md, border: `1px solid ${L.border}`, color: L.ink }}
                    />
                  ) : f.kind === 'select' ? (
                    <span
                      className="mt-1.5 flex items-center gap-2 px-3 py-2.5"
                      style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
                    >
                      <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: L.muted }} />
                      <span className="flex-1 text-right text-[11px]" style={{ color: L.muted }}>
                        {f.placeholder}
                      </span>
                    </span>
                  ) : (
                    <input
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full px-3 py-2.5 text-right text-[11px] outline-none placeholder:text-[#9396b0]"
                      style={{ borderRadius: LR.md, border: `1px solid ${L.border}`, color: L.ink }}
                    />
                  )}
                </label>
              ))}

              <div>
                <span className="block text-right text-[11px] font-bold" style={{ color: L.navy }}>
                  {forumCompose.attach.label}
                </span>
                <label
                  className="mt-1.5 flex flex-col items-center justify-center text-center px-4 py-6 cursor-pointer"
                  style={{ borderRadius: LR.md, border: `1.5px dashed ${L.blue}44`, backgroundColor: L.blueTint }}
                >
                  <Icon name="lucide:cloud-upload" size={24} style={{ backgroundColor: L.blue }} />
                  <span className="mt-2 text-[10.5px] font-bold" style={{ color: L.blue }}>
                    {forumCompose.attach.title}
                  </span>
                  <span className="mt-1 text-[9.5px]" style={{ color: L.muted }}>
                    {forumCompose.attach.hint}
                  </span>
                  <span className="mt-0.5 text-[8.5px]" style={{ color: L.muted }}>
                    {forumCompose.attach.limit}
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <button
                className="w-full py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: LR.md, backgroundColor: L.orange }}
              >
                {forumCompose.submit}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
