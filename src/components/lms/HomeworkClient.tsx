'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import { Ring } from './LmsParts';
import {
  homeworkCrumbs,
  homeworkHead,
  homeworkBrief,
  homeworkFiles,
  homeworkSubmit,
  homeworkFeedback,
  homeworkSuggestions,
  homeworkFooter,
  homeworkAside,
} from '@/data/lms/homework';

/* ──────────────────────────────────────────────────────────────
   The homework screen.

   Two columns: the exercise on the left, your standing with it on
   the right. RTL declares the right column first, so the aside
   comes before <main> in the source below.
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

function Heading({ title, icon }: { title: string; icon: string }) {
  return (
    <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: L.navy }}>
      {title}
      <Icon name={icon} size={16} style={{ backgroundColor: L.blue }} />
    </h2>
  );
}

export default function HomeworkClient() {
  const [tab, setTab] = useState(homeworkSubmit.tabs[0].id);

  return (
    <div style={{ backgroundColor: L.page }}>
      {/* ── Breadcrumb strip ─────────────────────────────────── */}
      <section style={{ backgroundColor: L.navyDeep }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-4 flex-wrap">
          <nav className="flex-1 min-w-[200px] flex items-center justify-center gap-1.5 flex-wrap text-[10.5px]">
            {homeworkCrumbs.items.map((c, i) => (
              <React.Fragment key={c.label}>
                {i > 0 && <span style={{ color: 'rgba(255,255,255,.35)' }}>›</span>}
                {c.href ? (
                  <Link href={c.href} style={{ color: 'rgba(255,255,255,.6)' }}>
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,.9)' }}>{c.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <Link
            href={homeworkCrumbs.back.href}
            className="flex items-center gap-2 px-4 py-2 text-[11.5px] font-bold text-white shrink-0"
            style={{ borderRadius: LR.md, border: '1px solid rgba(255,255,255,.25)' }}
          >
            <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: '#ffffff' }} />
            {homeworkCrumbs.back.label}
          </Link>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-4 xl:grid-cols-[300px_1fr] items-start">
          {/* Aside declared first → right. */}
          <aside className="space-y-4">
            <Card>
              <h2 className="text-center text-[13px] font-extrabold" style={{ color: L.navy }}>
                {homeworkAside.progress.title}
              </h2>

              <div className="mt-3 flex justify-center">
                <Ring pct={homeworkAside.progress.pct} size={104} stroke={12} colour={L.blue} />
              </div>

              <p className="mt-2 text-center text-[11.5px] font-bold" style={{ color: L.navy }}>
                {homeworkAside.progress.caption}
              </p>

              <p className="mt-4 text-right text-[10.5px] font-bold" style={{ color: L.navy }}>
                {homeworkAside.progress.barLabel}
              </p>
              <span className="mt-1.5 block h-2 rounded-full" style={{ backgroundColor: L.border }}>
                <span
                  className="block h-2 rounded-full"
                  style={{ width: `${homeworkAside.progress.barPct}%`, backgroundColor: L.blue }}
                />
              </span>

              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
              >
                {homeworkAside.progress.cta}
                <Icon name="lucide:eye" size={13} style={{ backgroundColor: L.blue }} />
              </button>
            </Card>

            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {homeworkAside.status.title}
              </h2>

              <ol className="mt-4 space-y-0">
                {homeworkAside.status.steps.map((s, i, all) => {
                  const fg =
                    s.state === 'done' ? L.green : s.state === 'active' ? L.orange : L.border;
                  return (
                    <li key={s.label} className="flex items-start gap-3">
                      <span className="flex flex-col items-center shrink-0">
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: s.state === 'todo' ? L.page : fg,
                            border: `2px solid ${s.state === 'todo' ? L.border : fg}`,
                          }}
                        >
                          {s.state === 'done' && (
                            <Icon name="lucide:check" size={9} style={{ backgroundColor: '#ffffff' }} />
                          )}
                          {s.state === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        {i < all.length - 1 && (
                          <span className="w-[2px] h-9" style={{ backgroundColor: L.border }} />
                        )}
                      </span>

                      <span className="flex-1 text-right -mt-0.5 pb-3">
                        <span
                          className="block text-[11.5px] font-extrabold"
                          style={{ color: s.state === 'todo' ? L.muted : L.navy }}
                        >
                          {s.label}
                        </span>
                        {s.sub && (
                          <span className="block text-[9.5px]" style={{ color: L.muted }}>
                            {s.sub}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </Card>

            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {homeworkAside.info.title}
              </h2>

              <ul className="mt-3.5 space-y-3">
                {homeworkAside.info.rows.map((r) => (
                  <li key={r.label} className="flex items-center gap-2">
                    <span
                      className="flex-1 flex items-center gap-1.5 text-[11px] font-bold"
                      style={{ color: r.muted ? L.muted : L.navy }}
                    >
                      {r.ok && (
                        <Icon name="lucide:circle-check" size={13} style={{ backgroundColor: L.green }} />
                      )}
                      {r.value}
                    </span>
                    <span className="text-[11px] text-right" style={{ color: L.navy }}>
                      {r.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>

          {/* Main column. */}
          <main className="min-w-0 space-y-4">
            <Card>
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="flex-1 min-w-[220px] text-right text-[18px] font-extrabold" style={{ color: L.navy }}>
                  {homeworkHead.title}
                </h1>
                <span
                  className="w-16 h-16 flex items-center justify-center shrink-0"
                  style={{ borderRadius: LR.pill, backgroundColor: L.violetSoft }}
                >
                  <Icon name={homeworkHead.icon} size={26} style={{ backgroundColor: L.violet }} />
                </span>
              </div>

              <ul className="mt-4 flex items-center justify-end gap-6 flex-wrap">
                {homeworkHead.meta.map((m) => (
                  <li key={m.label} className="text-right">
                    <span className="block text-[10px]" style={{ color: L.muted }}>
                      {m.label}
                    </span>
                    <span
                      className="mt-1 flex items-center justify-end gap-1.5 text-[11px] font-bold"
                      style={{ color: L.navy }}
                    >
                      {m.value}
                      <Icon name={m.icon} size={13} style={{ backgroundColor: L.amber }} />
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <Heading title={homeworkBrief.title} icon={homeworkBrief.icon} />

              <p className="mt-3 text-right text-[12.5px] leading-8" style={{ color: L.navy }}>
                {homeworkBrief.body}
              </p>

              <div className="mt-4 p-4" style={{ borderRadius: LR.md, backgroundColor: L.page }}>
                <h3 className="text-right text-[11.5px] font-extrabold" style={{ color: L.navy }}>
                  {homeworkBrief.outputTitle}
                </h3>

                <ol className="mt-3 flex items-center justify-end gap-2 flex-wrap">
                  {homeworkBrief.outputs.map((o, i) => (
                    <li
                      key={o}
                      className="flex items-center gap-2 px-3 py-2 bg-white"
                      style={{ borderRadius: LR.sm, border: `1px solid ${L.border}` }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: L.navy }}>
                        {o}
                      </span>
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                        style={{ backgroundColor: L.muted }}
                      >
                        {'۱۲۳۴۵'[i]}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>

            <Card>
              <Heading title={homeworkFiles.title} icon={homeworkFiles.icon} />

              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {homeworkFiles.items.map((f) => (
                  <li
                    key={f.title}
                    className="p-3.5"
                    style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex-1 text-right min-w-0">
                        <span className="block text-[11px] font-extrabold" style={{ color: L.navy }}>
                          {f.title}
                        </span>
                        <span className="mt-1 block text-[9.5px]" style={{ color: L.muted }}>
                          {f.meta}
                        </span>
                      </span>
                      <span
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{ borderRadius: LR.sm, backgroundColor: f.bg }}
                      >
                        <Icon name={f.icon} size={18} style={{ backgroundColor: f.fg }} />
                      </span>
                    </div>

                    <button
                      className="mt-3 w-full flex items-center justify-center gap-1.5 text-[10.5px] font-bold"
                      style={{ color: L.blue }}
                    >
                      {f.cta}
                      <Icon name="lucide:download" size={12} style={{ backgroundColor: L.blue }} />
                    </button>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <Heading title={homeworkSubmit.title} icon={homeworkSubmit.icon} />

              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px] items-start">
                {/* Editor is left of the dropzone in the mockup, so it
                    is declared last. */}
                <div className="order-2 lg:order-1">
                  <div className="flex items-center justify-end gap-1 border-b" style={{ borderColor: L.border }}>
                    {homeworkSubmit.tabs.map((t) => {
                      const on = t.id === tab;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setTab(t.id)}
                          aria-pressed={on}
                          className="relative px-4 py-2.5 text-[11.5px]"
                          style={{ color: on ? L.blue : L.muted, fontWeight: on ? 800 : 600 }}
                        >
                          {t.label}
                          {on && (
                            <span
                              className="absolute -bottom-px inset-x-2 h-[2.5px] rounded-t-full"
                              style={{ backgroundColor: L.blue }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div
                    className="mt-3 overflow-hidden"
                    style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
                  >
                    <div
                      className="flex items-center gap-1 px-2 py-2 flex-wrap"
                      style={{ backgroundColor: L.page, borderBottom: `1px solid ${L.border}` }}
                    >
                      {homeworkSubmit.toolbar.map((ic) => (
                        <span key={ic} className="w-7 h-7 flex items-center justify-center">
                          <Icon name={ic} size={13} style={{ backgroundColor: L.muted }} />
                        </span>
                      ))}
                    </div>

                    <textarea
                      rows={5}
                      placeholder={homeworkSubmit.placeholder}
                      className="w-full px-4 py-3.5 text-right text-[11.5px] outline-none resize-none placeholder:text-[#9396b0]"
                      style={{ color: L.ink }}
                    />
                  </div>
                </div>

                <label
                  className="order-1 lg:order-2 flex flex-col items-center justify-center text-center px-4 py-10 cursor-pointer"
                  style={{
                    borderRadius: LR.md,
                    border: `1.5px dashed ${L.blue}55`,
                    backgroundColor: L.blueTint,
                  }}
                >
                  <Icon name={homeworkSubmit.drop.icon} size={30} style={{ backgroundColor: L.blue }} />
                  <span className="mt-3 text-[11.5px] font-extrabold" style={{ color: L.blue }}>
                    {homeworkSubmit.drop.title}
                  </span>
                  <span className="mt-1.5 text-[9px] leading-4" style={{ color: L.muted }}>
                    {homeworkSubmit.drop.hint}
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="mt-4 flex items-center gap-4 flex-wrap">
                <button
                  className="flex items-center gap-2 px-8 py-3 text-[12.5px] font-extrabold text-white shrink-0 transition-opacity hover:opacity-90"
                  style={{ borderRadius: LR.md, backgroundColor: L.green }}
                >
                  {homeworkSubmit.action.label}
                  <Icon name={homeworkSubmit.action.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
                </button>

                <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: L.muted }}>
                  {homeworkSubmit.note}
                  <Icon name="lucide:circle-alert" size={13} style={{ backgroundColor: L.muted }} />
                </span>
              </div>
            </Card>

            <Card>
              <div className="grid gap-5 sm:grid-cols-[1fr_190px] items-start">
                <div className="order-2 sm:order-1">
                  <div className="flex items-start gap-2.5">
                    <div className="flex-1 text-right min-w-0">
                      <span className="block text-[13px] font-extrabold" style={{ color: L.navy }}>
                        {homeworkFeedback.instructor}
                      </span>
                      <span className="block text-[10px]" style={{ color: L.muted }}>
                        {homeworkFeedback.role}
                      </span>
                    </div>
                    <img
                      src={homeworkFeedback.avatar}
                      alt=""
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                  </div>

                  <p className="mt-3 text-right text-[10px]" style={{ color: L.muted }}>
                    {homeworkFeedback.label}
                  </p>
                  <p className="mt-1.5 text-right text-[12px] leading-8" style={{ color: L.navy }}>
                    {homeworkFeedback.text}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 text-[10.5px] font-bold"
                      style={{ borderRadius: LR.sm, border: `1px solid ${L.border}`, color: L.navy }}
                    >
                      {homeworkFeedback.file.label}
                      <Icon name={homeworkFeedback.file.icon} size={12} style={{ backgroundColor: L.navy }} />
                    </button>

                    <span className="text-[10px]" style={{ color: L.muted }}>
                      {homeworkFeedback.date}
                    </span>
                  </div>
                </div>

                <div
                  className="order-1 sm:order-2 p-4 text-center"
                  style={{ borderRadius: LR.md, backgroundColor: L.amberSoft }}
                >
                  <span className="block text-[11px] font-bold" style={{ color: L.navy }}>
                    {homeworkFeedback.score.title}
                  </span>
                  <span className="mt-2 block">
                    <span className="text-[28px] font-extrabold" style={{ color: L.navy }}>
                      {homeworkFeedback.score.value}
                    </span>
                    <span className="text-[15px] font-bold" style={{ color: L.muted }}>
                      {' / '}
                      {homeworkFeedback.score.outOf}
                    </span>
                  </span>

                  <span className="mt-1.5 inline-flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Icon
                        key={i}
                        name="lucide:star"
                        size={15}
                        style={{
                          backgroundColor: i < homeworkFeedback.score.stars ? L.amber : L.border,
                        }}
                      />
                    ))}
                  </span>

                  <button
                    className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold bg-white"
                    style={{ borderRadius: LR.sm, border: `1px solid ${L.blueSoft}`, color: L.blue }}
                  >
                    {homeworkFeedback.score.cta}
                    <Icon name="lucide:eye" size={12} style={{ backgroundColor: L.blue }} />
                  </button>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
                {homeworkSuggestions.title}
              </h2>

              <div className="mt-4 flex items-stretch gap-2">
                <button
                  aria-label="بعدی"
                  className="w-8 h-8 self-center shrink-0 flex items-center justify-center bg-white"
                  style={{ borderRadius: LR.pill, border: `1px solid ${L.border}` }}
                >
                  <Icon name="lucide:chevron-right" size={14} style={{ backgroundColor: L.navy }} />
                </button>

                <ul className="flex-1 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  {homeworkSuggestions.items.map((s) => (
                    <li
                      key={s.title}
                      className="p-3.5"
                      style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="flex-1 text-right min-w-0">
                          <span className="block text-[11px] font-extrabold" style={{ color: L.navy }}>
                            {s.title}
                          </span>
                          <span className="mt-1 block text-[9px] leading-4" style={{ color: L.muted }}>
                            {s.desc}
                          </span>
                        </span>
                        <span
                          className="w-9 h-9 flex items-center justify-center shrink-0"
                          style={{ borderRadius: LR.sm, backgroundColor: s.bg }}
                        >
                          <Icon name={s.icon} size={17} style={{ backgroundColor: s.fg }} />
                        </span>
                      </div>

                      <button
                        className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold"
                        style={{ borderRadius: LR.sm, border: `1px solid ${s.fg}55`, color: s.fg }}
                      >
                        {s.cta}
                        <Icon name="lucide:eye" size={11} style={{ backgroundColor: s.fg }} />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  aria-label="قبلی"
                  className="w-8 h-8 self-center shrink-0 flex items-center justify-center bg-white"
                  style={{ borderRadius: LR.pill, border: `1px solid ${L.border}` }}
                >
                  <Icon name="lucide:chevron-left" size={14} style={{ backgroundColor: L.navy }} />
                </button>
              </div>
            </Card>

            <Card className="flex items-center justify-between gap-3 flex-wrap">
              {/* Declared right-to-left: the chapter exam is the
                  primary action and sits at the RTL start. */}
              <button
                className="flex items-center gap-2 px-10 py-3 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: LR.md, backgroundColor: '#1638d4' }}
              >
                {homeworkFooter.next.label}
                <Icon name={homeworkFooter.next.icon} size={14} style={{ backgroundColor: '#ffffff' }} />
              </button>

              <button
                className="flex items-center gap-2 px-6 py-3 text-[12px] font-bold"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
              >
                {homeworkFooter.list.label}
                <Icon name={homeworkFooter.list.icon} size={14} style={{ backgroundColor: L.blue }} />
              </button>

              <button
                className="flex items-center gap-2 px-6 py-3 text-[12px] font-bold"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
              >
                {homeworkFooter.prev.label}
                <Icon name={homeworkFooter.prev.icon} size={14} style={{ backgroundColor: L.blue }} />
              </button>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
