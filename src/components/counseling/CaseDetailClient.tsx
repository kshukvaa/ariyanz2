'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  caseBack,
  caseHead,
  caseRail,
  caseTabs,
  caseStatus,
  caseExpert,
  caseActions,
  caseAgent,
} from '@/data/counseling/case-detail';
import {
  PanelCard,
  ChatPanel,
  SummaryPanel,
  TimelinePanel,
  DocsPanel,
  OutputsPanel,
  SessionsPanel,
} from './CaseDetailTabs';

/* ──────────────────────────────────────────────────────────────
   پرونده مشاوره — the case a client has already submitted.

   Six sheets in the source draw the same screen with a different
   tab open, so this is one component with six panels rather than
   six routes. The header, the progress rail and the right-hand
   rail are shared furniture and stay put as the tab changes.
────────────────────────────────────────────────────────────── */

function RailCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <PanelCard>
      <h2 className="flex items-center justify-end gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
        {title}
        <Icon name={icon} size={14} style={{ backgroundColor: T.primary }} />
      </h2>
      {children}
    </PanelCard>
  );
}

export default function CaseDetailClient() {
  const [tab, setTab] = useState('summary');

  return (
    <div style={{ backgroundColor: '#fbfbfe' }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5 space-y-4">
        <Link
          href={caseBack.href}
          className="flex items-center justify-end gap-1.5 text-[10.5px] font-bold"
          style={{ color: T.primary }}
        >
          {caseBack.label}
          <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: T.primary }} />
        </Link>

        <div className="grid gap-4 xl:grid-cols-[290px_1fr] items-start">
          {/* Rail declared first → right, as the mockup places it. */}
          <aside className="space-y-4 xl:sticky xl:top-4">
            <RailCard title={caseStatus.title} icon={caseStatus.icon}>
              <p
                className="mt-3.5 flex items-center justify-center gap-2 py-2.5 text-[10.5px] font-bold"
                style={{ borderRadius: R.md, backgroundColor: '#f3f0fe', color: T.primary }}
              >
                {caseStatus.chip}
                <Icon name="lucide:circle-dot" size={13} style={{ backgroundColor: T.primary }} />
              </p>

              <ul className="mt-3.5 space-y-2.5">
                {caseStatus.rows.map((r) => (
                  <li key={r.label} className="text-right">
                    <span className="block text-[9.5px]" style={{ color: T.muted }}>
                      {r.label}
                    </span>
                    <span
                      className="mt-0.5 block text-[10.5px] font-bold"
                      style={{ color: r.warn ? T.accent : T.ink }}
                    >
                      {r.value}
                    </span>
                  </li>
                ))}
              </ul>

              <span className="mt-3.5 block h-1.5 rounded-full" style={{ backgroundColor: '#eeecf7' }}>
                <span
                  className="block h-1.5 rounded-full"
                  style={{ width: `${caseStatus.progress}%`, backgroundColor: T.primary }}
                />
              </span>
              <span className="mt-1.5 block text-right text-[9.5px] font-bold" style={{ color: T.primary }}>
                {caseStatus.progressLabel}
              </span>
            </RailCard>

            <RailCard title={caseExpert.title} icon={caseExpert.icon}>
              <div className="mt-3.5 flex items-center gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {caseExpert.name}
                  </span>
                  <span className="block text-[9.5px]" style={{ color: T.muted }}>
                    {caseExpert.role}
                  </span>
                  <span
                    className="mt-1 flex items-center justify-end gap-1 text-[9.5px] font-bold"
                    style={{ color: '#f5a524' }}
                  >
                    {caseExpert.rating}
                    <span style={{ color: T.muted }}>| {caseExpert.basis}</span>
                    <Icon name="lucide:star" size={11} style={{ backgroundColor: '#f5a524' }} />
                  </span>
                </span>
                <img src={caseExpert.avatar} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
              </div>

              <button
                className="mt-3.5 w-full py-2.5 text-[10.5px] font-bold"
                style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                {caseExpert.cta}
              </button>
            </RailCard>

            <RailCard title={caseActions.title} icon={caseActions.icon}>
              <ul className="mt-3 space-y-1">
                {caseActions.items.map((a) => (
                  <li key={a.label}>
                    <button
                      className="w-full flex items-center gap-2.5 py-2.5 text-right transition-colors hover:opacity-70"
                      style={{ borderBottom: `1px solid ${T.border}` }}
                    >
                      <span className="flex-1 text-[10.5px]" style={{ color: T.ink }}>
                        {a.label}
                      </span>
                      <Icon name={a.icon} size={14} className="shrink-0" style={{ backgroundColor: T.primary }} />
                    </button>
                  </li>
                ))}
              </ul>
            </RailCard>

            <section className="p-4" style={{ borderRadius: R.lg, backgroundColor: '#f6f4fe' }}>
              <div className="flex items-start gap-2.5">
                <span className="flex-1 text-right">
                  <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {caseAgent.title}
                  </span>
                  <span className="mt-1.5 block text-[10px] leading-6" style={{ color: T.ink }}>
                    {caseAgent.bubble}
                  </span>
                </span>
                <img src={caseAgent.art} alt="" className="w-14 h-14 object-contain shrink-0" />
              </div>

              <ul className="mt-3 space-y-2">
                {caseAgent.chips.map((c) => (
                  <li key={c}>
                    <button
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-right bg-white transition-colors hover:bg-gray-50"
                      style={{ borderRadius: R.md }}
                    >
                      <span className="flex-1 text-[10px] font-bold" style={{ color: T.ink }}>
                        {c}
                      </span>
                      <Icon name="lucide:message-circle" size={12} className="shrink-0" style={{ backgroundColor: T.primary }} />
                    </button>
                  </li>
                ))}
              </ul>

              <label className="mt-3 flex items-center gap-2.5 px-3 py-2.5 bg-white" style={{ borderRadius: R.md }}>
                <button
                  aria-label="ارسال"
                  className="w-8 h-8 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: T.primary }}
                >
                  <Icon name="lucide:send" size={13} style={{ backgroundColor: '#ffffff' }} />
                </button>
                <input
                  placeholder={caseAgent.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-[10.5px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>
            </section>
          </aside>

          {/* ── Main ─────────────────────────────────────────── */}
          <main className="min-w-0 space-y-4">
            {/* ── Header ─────────────────────────────────────── */}
            <PanelCard>
              <div className="flex items-start gap-5 flex-wrap">
                <span
                  className="w-[86px] h-[86px] flex items-center justify-center shrink-0 order-1"
                  style={{ borderRadius: R.pill, backgroundColor: '#f3f0fe' }}
                >
                  <Icon name={caseHead.icon} size={34} style={{ backgroundColor: T.primary }} />
                </span>

                <div className="flex-1 min-w-[260px] text-right order-2">
                  <p className="text-[11px] font-bold" style={{ color: T.primary }} dir="ltr">
                    {caseHead.code}
                  </p>
                  <h1 className="mt-1.5 text-[21px] font-extrabold leading-8" style={{ color: T.ink }}>
                    {caseHead.title}
                  </h1>

                  <div className="mt-2 flex items-center justify-end gap-4 flex-wrap">
                    <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
                      {caseHead.fieldLabel} {caseHead.field}
                      <Icon name="lucide:layers" size={12} style={{ backgroundColor: T.muted }} />
                    </span>
                    <span className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
                      {caseHead.expertLabel} {caseHead.expert}
                      <Icon name="lucide:user-round" size={12} style={{ backgroundColor: T.muted }} />
                    </span>
                  </div>

                  <ul className="mt-3.5 flex items-center justify-end gap-6 flex-wrap">
                    {caseHead.meta.map((m) => (
                      <li key={m.label} className="text-right">
                        <span className="flex items-center gap-1.5 justify-end text-[9px]" style={{ color: T.muted }}>
                          {m.label}
                          <Icon name={m.icon} size={11} style={{ backgroundColor: T.muted }} />
                        </span>
                        <span className="mt-0.5 block text-[10.5px] font-bold" style={{ color: T.ink }}>
                          {m.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 text-center order-3">
                  <img
                    src={caseHead.avatar}
                    alt=""
                    className="w-[104px] h-[112px] object-cover mx-auto"
                    style={{ borderRadius: R.md }}
                  />
                  <button
                    className="mt-2.5 px-3.5 py-2 text-[10px] font-bold whitespace-nowrap"
                    style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
                  >
                    {caseHead.cta}
                  </button>
                </div>
              </div>
            </PanelCard>

            {/* ── Progress rail ──────────────────────────────── */}
            <PanelCard>
              <ol className="flex items-start">
                {caseRail.steps.map((s, i) => {
                  const fg =
                    s.state === 'done' ? '#1c8a4e' : s.state === 'current' ? T.primary : '#c9c3ea';
                  return (
                    <li key={s.label} className="flex-1 text-center relative min-w-0">
                      {i > 0 && (
                        <span
                          className="absolute top-[15px] right-1/2 w-full h-[2px]"
                          style={{
                            backgroundColor:
                              caseRail.steps[i - 1].state === 'done' ? '#1c8a4e' : '#e6e2f5',
                          }}
                        />
                      )}
                      <span
                        className="relative w-8 h-8 mx-auto flex items-center justify-center"
                        style={{
                          borderRadius: R.pill,
                          backgroundColor: s.state === 'todo' ? '#ffffff' : fg,
                          border: `2px solid ${fg}`,
                        }}
                      >
                        <Icon
                          name={
                            s.state === 'done'
                              ? 'lucide:check'
                              : s.state === 'current'
                                ? 'lucide:search'
                                : 'lucide:flag'
                          }
                          size={13}
                          style={{ backgroundColor: s.state === 'todo' ? fg : '#ffffff' }}
                        />
                      </span>
                      <span
                        className="mt-2 block text-[10px] font-extrabold px-1"
                        style={{ color: s.state === 'todo' ? T.muted : fg }}
                      >
                        {s.label}
                      </span>
                      {s.date && (
                        <span className="mt-0.5 block text-[8.5px]" style={{ color: T.muted }}>
                          {s.date}
                        </span>
                      )}
                      {s.time && (
                        <span className="block text-[8.5px]" style={{ color: T.muted }} dir="ltr">
                          {s.time}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>

              <p
                className="mt-4 flex items-center justify-center gap-2 py-2.5 text-[10px]"
                style={{ borderRadius: R.sm, backgroundColor: '#f7f7fc', color: T.ink }}
              >
                {caseRail.note}
                <Icon name="lucide:clock" size={12} style={{ backgroundColor: T.muted }} />
              </p>
            </PanelCard>

            {/* ── Tabs ───────────────────────────────────────── */}
            <div
              className="bg-white px-2 overflow-x-auto"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center gap-1 min-w-max justify-end">
                {caseTabs.map((t) => {
                  const on = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      aria-pressed={on}
                      className="relative flex items-center gap-2 px-5 py-3.5 text-[11.5px] whitespace-nowrap"
                      style={{ color: on ? T.primary : T.ink, fontWeight: on ? 800 : 600 }}
                    >
                      {t.label}
                      <Icon name={t.icon} size={13} style={{ backgroundColor: on ? T.primary : T.ink }} />
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

            {tab === 'chat' && <ChatPanel />}
            {tab === 'summary' && <SummaryPanel />}
            {tab === 'timeline' && <TimelinePanel />}
            {tab === 'docs' && <DocsPanel />}
            {tab === 'outputs' && <OutputsPanel />}
            {tab === 'sessions' && <SessionsPanel />}
          </main>
        </div>
      </div>
    </div>
  );
}
