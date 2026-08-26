'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  myHero,
  myAgent,
  myAlerts,
  myTabs,
  myToolbar,
  myItems,
  myPager,
  myEmpty,
} from '@/data/counseling/my-consultations';

/* ──────────────────────────────────────────────────────────────
   مشاوره‌های من.

   The agent rail is on the right in the mockup, so it is declared
   before <main>. The tabs actually filter, because a dashboard
   whose tabs do nothing is worse than no tabs — and the empty
   state below is what a filtered-to-nothing tab shows.
────────────────────────────────────────────────────────────── */

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

export default function MyConsultationsClient() {
  const [tab, setTab] = useState('all');
  const [chip, setChip] = useState(myToolbar.chips[0]);

  const kindOf: Record<string, string> = {
    questions: 'question',
    sessions: 'session',
    cases: 'case',
  };
  const shown = tab === 'all' ? myItems : myItems.filter((i) => i.kind === kindOf[tab]);

  return (
    <div style={{ backgroundColor: T.page }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-7">
        <div className="grid gap-5 xl:grid-cols-[320px_1fr] items-start">
          {/* ── Agent rail (right) ───────────────────────────── */}
          <aside className="space-y-4 xl:sticky xl:top-4">
            <section className="p-5" style={{ borderRadius: R.lg, backgroundColor: '#f4f2fd' }}>
              <div className="flex items-center gap-3">
                <div className="flex-1 text-right min-w-0">
                  <span className="block text-[17px] font-extrabold" style={{ color: T.ink }}>
                    {myAgent.name}
                  </span>
                  <span className="block text-[10.5px]" style={{ color: T.muted }}>
                    {myAgent.role}
                  </span>
                  <span className="mt-1 flex items-center justify-end gap-1.5 text-[9.5px]" style={{ color: T.successStrong }}>
                    {myAgent.status}
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                  </span>
                </div>
                <span
                  className="w-14 h-14 flex items-center justify-center shrink-0"
                  style={{ borderRadius: '999px', backgroundColor: T.primary }}
                >
                  <Icon name="lucide:sparkles" size={24} style={{ backgroundColor: '#ffffff' }} />
                </span>
              </div>

              <p
                className="mt-4 p-3.5 text-right text-[10.5px] leading-6 bg-white"
                style={{ borderRadius: R.md, color: T.ink }}
              >
                {myAgent.bubble}
              </p>

              <label className="mt-3 flex items-center gap-2.5 px-3 py-2.5 bg-white" style={{ borderRadius: R.md }}>
                <button
                  aria-label="ارسال"
                  className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: T.primary }}
                >
                  <Icon name="lucide:send" size={14} style={{ backgroundColor: '#ffffff' }} />
                </button>
                <input
                  placeholder={myAgent.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>

              <p className="mt-2 text-center text-[9px]" style={{ color: T.muted }}>
                {myAgent.note}
              </p>
            </section>

            <div>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
                {myAgent.quickTitle}
              </h2>

              <ul className="mt-3 space-y-2.5">
                {myAgent.quick.map((q) => (
                  <li key={q.label}>
                    <button
                      className="w-full flex items-center gap-3 p-3.5 bg-white text-right transition-colors hover:bg-gray-50"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <span className="flex-1 text-[11px] font-bold" style={{ color: T.ink }}>
                        {q.label}
                      </span>
                      <span
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{ borderRadius: R.md, backgroundColor: q.bg }}
                      >
                        <Icon name={q.icon} size={16} style={{ backgroundColor: q.fg }} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Main ─────────────────────────────────────────── */}
          <main className="min-w-0 space-y-5">
            {/* Hero. */}
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] items-center">
              <div className="text-right">
                <h1 className="text-[26px] font-extrabold" style={{ color: T.ink }}>
                  {myHero.title}
                </h1>
                <p className="mt-2 text-[12px]" style={{ color: T.muted }}>
                  {myHero.desc}
                </p>
                <button
                  className="mt-4 flex items-center gap-2 px-5 py-3 text-[12px] font-bold bg-white"
                  style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
                >
                  <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.primary }} />
                  {myHero.cta.label}
                  <Icon name={myHero.cta.icon} size={13} style={{ backgroundColor: T.primary }} />
                </button>
              </div>

              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {myHero.stats.map((s) => (
                  <li
                    key={s.label}
                    className="bg-white px-5 py-4 text-center"
                    style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                  >
                    <span className="flex items-center justify-center gap-1.5 text-[19px] font-extrabold" style={{ color: s.fg }}>
                      {s.value}
                      {s.icon && <Icon name={s.icon} size={14} style={{ backgroundColor: s.fg }} />}
                    </span>
                    <span className="mt-1.5 block text-[10px]" style={{ color: T.muted }}>
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action-needed band. */}
            <section
              className="p-5"
              style={{ borderRadius: R.lg, backgroundColor: '#fdf6ec', border: '1px solid #f6e2c4' }}
            >
              <h2 className="flex items-center justify-end gap-2.5 text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                {myAlerts.title}
                <span
                  className="w-7 h-7 flex items-center justify-center shrink-0"
                  style={{ borderRadius: '999px', backgroundColor: T.accent }}
                >
                  <Icon name={myAlerts.icon} size={14} style={{ backgroundColor: '#ffffff' }} />
                </span>
              </h2>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {myAlerts.items.map((a) => (
                  <li key={a.id} className="bg-white p-4" style={{ borderRadius: R.md }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1 text-right min-w-0">
                        <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                          {a.badge}
                        </span>
                        <span className="mt-1.5 block text-[10.5px] leading-6" style={{ color: T.muted }}>
                          {a.body}
                        </span>
                      </div>
                      <span
                        className="w-11 h-11 flex items-center justify-center shrink-0"
                        style={{ borderRadius: R.md, backgroundColor: a.bg }}
                      >
                        <Icon name={a.icon} size={19} style={{ backgroundColor: a.fg }} />
                      </span>
                    </div>

                    <button
                      className="mt-3 px-5 py-2 text-[11px] font-bold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                    >
                      {a.cta}
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tabs. */}
            <div
              className="bg-white px-2 overflow-x-auto"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center gap-1 min-w-max justify-end">
                {myTabs.map((t) => {
                  const on = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="relative flex items-center gap-2 px-5 py-4 text-[12px] whitespace-nowrap"
                      style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
                    >
                      {t.label}
                      <Icon name={t.icon} size={14} style={{ backgroundColor: on ? T.primary : T.muted }} />
                      {on && (
                        <span
                          className="absolute bottom-0 inset-x-3 h-[3px] rounded-t-full"
                          style={{ backgroundColor: T.primary }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toolbar. */}
            <Card>
              <div className="flex items-center gap-2.5 flex-wrap">
                <label
                  className="flex items-center gap-2 px-3.5 py-2.5 shrink-0"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                >
                  <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.muted }} />
                  <span className="text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {myToolbar.sort}
                  </span>
                  <Icon name="lucide:sliders-horizontal" size={12} style={{ backgroundColor: T.muted }} />
                </label>

                {myToolbar.chips
                  .slice()
                  .reverse()
                  .map((c) => {
                    const on = c === chip;
                    return (
                      <button
                        key={c}
                        onClick={() => setChip(c)}
                        aria-pressed={on}
                        className="px-3.5 py-2.5 text-[10.5px] font-bold shrink-0"
                        style={{
                          borderRadius: R.pill,
                          backgroundColor: on ? T.tintPurple : '#ffffff',
                          color: on ? T.primary : T.muted,
                          border: `1px solid ${on ? T.primary : T.border}`,
                        }}
                      >
                        {c}
                      </button>
                    );
                  })}

                <label
                  className="flex-1 min-w-[180px] flex items-center gap-2.5 px-3.5 py-2.5"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                >
                  <Icon name="lucide:search" size={14} style={{ backgroundColor: T.muted }} />
                  <input
                    placeholder={myToolbar.search}
                    className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
                    style={{ color: T.ink }}
                  />
                </label>
              </div>

              {/* List. */}
              {shown.length === 0 ? (
                <div className="mt-5 py-12 text-center">
                  <Icon name="lucide:inbox" size={38} style={{ backgroundColor: '#c9c3ea' }} />
                  <p className="mt-3 text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {myEmpty.title}
                  </p>
                  <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
                    {myEmpty.desc}
                  </p>
                  <button
                    className="mt-4 px-6 py-2.5 text-[11.5px] font-bold text-white"
                    style={{ borderRadius: R.md, backgroundColor: T.primary }}
                  >
                    {myEmpty.cta}
                  </button>
                </div>
              ) : (
                <ul className="mt-4 space-y-3">
                  {shown.map((it) => (
                    <li
                      key={it.id}
                      className="p-4"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <div className="flex items-start gap-3 flex-wrap">
                        {/* Type badge first → right. */}
                        <span className="shrink-0 order-1 w-[74px] text-center">
                          <span
                            className="w-11 h-11 mx-auto flex items-center justify-center"
                            style={{ borderRadius: R.md, backgroundColor: it.bg }}
                          >
                            <Icon name={it.icon} size={19} style={{ backgroundColor: it.fg }} />
                          </span>
                          <span className="mt-1.5 block text-[9px]" style={{ color: T.muted }}>
                            {it.kindLabel}
                          </span>
                        </span>

                        <div className="flex-1 min-w-[200px] text-right order-2">
                          <h3 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
                            {it.title}
                          </h3>
                          <span className="mt-1.5 flex items-center justify-end gap-2">
                            <span className="text-right">
                              <span className="block text-[10.5px] font-bold" style={{ color: T.ink }}>
                                {it.expert}
                              </span>
                              <span className="block text-[9px]" style={{ color: T.muted }}>
                                {it.field}
                              </span>
                              <span
                                className="mt-0.5 flex items-center justify-end gap-1 text-[9px] font-bold"
                                style={{ color: '#f5a524' }}
                              >
                                {it.rating}
                                <Icon name="lucide:star" size={10} style={{ backgroundColor: '#f5a524' }} />
                              </span>
                            </span>
                            <img src={it.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                          </span>
                        </div>

                        <div className="order-3 min-w-[190px]">
                          <span
                            className="inline-block px-3 py-1 text-[9.5px] font-bold"
                            style={{ borderRadius: R.pill, backgroundColor: it.status.bg, color: it.status.fg }}
                          >
                            {it.status.label}
                          </span>

                          {typeof it.progress === 'number' && (
                            <span className="mt-2.5 block">
                              <span className="flex items-center gap-2">
                                <span className="text-[9.5px] font-bold shrink-0" style={{ color: T.primary }}>
                                  {it.progress}%
                                </span>
                                <span className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: T.border }}>
                                  <span
                                    className="block h-1.5 rounded-full"
                                    style={{ width: `${it.progress}%`, backgroundColor: T.primary }}
                                  />
                                </span>
                                <span className="text-[9px] shrink-0" style={{ color: T.muted }}>
                                  {it.progressLabel}
                                </span>
                              </span>
                            </span>
                          )}

                          <span className="mt-2 block text-[9px]" style={{ color: T.muted }}>
                            {it.activity}
                          </span>

                          {it.note && (
                            <span className="mt-1 block text-[9.5px]" style={{ color: T.ink }}>
                              {it.note}
                            </span>
                          )}

                          {it.meta && (
                            <span className="mt-1.5 flex items-center justify-end gap-2.5 flex-wrap">
                              {it.meta.map((m) => (
                                <span
                                  key={m.label}
                                  className="flex items-center gap-1 text-[9px]"
                                  style={{ color: m.action ? T.primary : T.muted }}
                                >
                                  {m.label}
                                  <Icon
                                    name={m.icon}
                                    size={10}
                                    style={{ backgroundColor: m.action ? T.primary : T.muted }}
                                  />
                                </span>
                              ))}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress rail + the row's primary action. */}
                      <div
                        className="mt-3.5 pt-3.5 flex items-end gap-4 flex-wrap"
                        style={{ borderTop: `1px solid ${T.border}` }}
                      >
                        <ol className="flex-1 min-w-[260px] flex items-start">
                          {it.steps.map((st, i) => {
                            const fg =
                              st.state === 'done'
                                ? T.successStrong
                                : st.state === 'current'
                                  ? T.accent
                                  : '#c9c3ea';
                            return (
                              <li key={st.label} className="flex-1 text-center relative">
                                {i > 0 && (
                                  <span
                                    className="absolute top-[5px] right-1/2 w-full h-[2px]"
                                    style={{
                                      backgroundColor:
                                        it.steps[i - 1].state === 'done' ? T.successStrong : '#e6e2f5',
                                    }}
                                  />
                                )}
                                <span
                                  className="relative w-3 h-3 mx-auto block rounded-full"
                                  style={{
                                    backgroundColor: st.state === 'todo' ? '#ffffff' : fg,
                                    border: `2px solid ${fg}`,
                                  }}
                                />
                                <span className="mt-1.5 block text-[9px] font-bold" style={{ color: fg }}>
                                  {st.date}
                                </span>
                                <span className="block text-[8.5px] leading-4" style={{ color: T.muted }}>
                                  {st.label}
                                </span>
                              </li>
                            );
                          })}
                        </ol>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            aria-label="گزینه‌های بیشتر"
                            className="w-9 h-9 flex items-center justify-center"
                            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                          >
                            <Icon name="lucide:ellipsis" size={15} style={{ backgroundColor: T.muted }} />
                          </button>
                          <button
                            className="px-5 py-2.5 text-[11px] font-extrabold text-white transition-opacity hover:opacity-90"
                            style={{ borderRadius: R.md, backgroundColor: T.primary }}
                          >
                            {it.cta}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {shown.length > 0 && (
                <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-[10px]" style={{ color: T.muted }}>
                    {myPager.summary}
                  </span>

                  <nav className="flex items-center gap-1.5" aria-label="صفحه‌بندی">
                    <button
                      className="px-3 py-1.5 text-[10px] font-bold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.muted }}
                    >
                      {myPager.prev}
                    </button>
                    {myPager.pages.map((pg, i) =>
                      pg === '…' ? (
                        <span key={`gap-${i}`} className="px-1.5 text-[10px]" style={{ color: T.muted }}>
                          {pg}
                        </span>
                      ) : (
                        <button
                          key={pg}
                          aria-current={pg === myPager.active ? 'page' : undefined}
                          className="w-7 h-7 text-[10px] font-bold"
                          style={{
                            borderRadius: R.sm,
                            backgroundColor: pg === myPager.active ? T.primary : 'transparent',
                            border: `1px solid ${pg === myPager.active ? T.primary : T.border}`,
                            color: pg === myPager.active ? '#ffffff' : T.ink,
                          }}
                        >
                          {pg}
                        </button>
                      ),
                    )}
                    <button
                      className="px-3 py-1.5 text-[10px] font-bold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                    >
                      {myPager.next}
                    </button>
                  </nav>
                </div>
              )}
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
