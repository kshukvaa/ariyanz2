'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import AdvisorShell, { AdvisorCard, Tone } from './AdvisorShell';
import { AdvisorAgentPanel, Ring } from './AdvisorParts';
import { advisorRequestDetail as d } from '@/data/counseling/advisor';

/* جزئیات درخواست — «page 17». The screen an advisor decides on,
   so the three decisions sit in a bar of their own at the end
   rather than among the content. */

const FILE_FG: Record<string, string> = { pdf: '#d93636', xls: '#1c8a4e' };

export default function AdvisorRequestDetail() {
  const [tab, setTab] = useState(d.tabs[0]);

  return (
    <AdvisorShell active="requests">
      <div className="grid gap-4 lg:grid-cols-[1fr_300px] items-start">
        {/* Main declared first → right. */}
        <div className="min-w-0 space-y-4">
          <Link
            href="/advisor/requests"
            className="flex items-center gap-1.5 justify-end text-[10.5px] font-bold"
            style={{ color: T.primary }}
          >
            {d.back}
            <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: T.primary }} />
          </Link>

          {/* Header. */}
          <AdvisorCard>
            <div className="flex items-start gap-5 flex-wrap">
              <span className="shrink-0 text-center order-1">
                <Ring pct={d.match} color="#1c8a4e" size={86} />
                <span className="mt-1.5 block text-[9.5px] font-bold" style={{ color: '#1c8a4e' }}>
                  {d.matchNote}
                </span>
                <span className="block text-[8.5px]" style={{ color: T.muted }}>
                  {d.matchTitle}
                </span>
              </span>

              <div className="flex-1 min-w-[260px] text-right order-2">
                <p className="text-[10.5px] font-bold" style={{ color: T.primary }} dir="ltr">
                  {d.code}
                </p>
                <h1 className="mt-1.5 text-[20px] font-extrabold leading-8" style={{ color: T.ink }}>
                  {d.title}
                </h1>

                <span className="mt-2 flex items-center gap-2 justify-end flex-wrap">
                  {d.pills.map((p) => (
                    <Tone key={p.label} label={p.label} tone={p.tone} icon={p.icon} />
                  ))}
                </span>

                <ul className="mt-3.5 flex items-center gap-5 justify-end flex-wrap">
                  {d.meta.map((m) => (
                    <li key={m.label} className="text-right">
                      <span className="flex items-center gap-1 justify-end text-[8.5px]" style={{ color: T.muted }}>
                        {m.label}
                        <Icon name={m.icon} size={10} style={{ backgroundColor: T.muted }} />
                      </span>
                      <span className="block text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {m.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0 text-right order-3">
                <span className="block text-[9px]" style={{ color: T.muted }}>
                  {d.orgLabel}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 justify-end text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                  {d.org}
                  <Icon name="lucide:building" size={13} style={{ backgroundColor: T.muted }} />
                </span>
                <span className="mt-2.5 block text-[9px]" style={{ color: T.muted }}>
                  {d.senderLabel}
                </span>
                <span className="mt-0.5 block text-[11px] font-bold" style={{ color: T.ink }}>
                  {d.sender}
                </span>
                <span className="block text-[9px]" style={{ color: T.muted }}>
                  {d.senderRole}
                </span>
              </div>
            </div>

            <p
              className="mt-4 flex items-center gap-2 justify-end p-3 text-[10px]"
              style={{ borderRadius: R.md, backgroundColor: '#f6f4fe', color: T.ink }}
            >
              {d.strip}
              <Icon name="lucide:sparkles" size={13} className="shrink-0" style={{ backgroundColor: T.primary }} />
            </p>
          </AdvisorCard>

          {/* Tabs. */}
          <div className="bg-white px-2 overflow-x-auto" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-1 min-w-max justify-end">
              {d.tabs.map((t) => {
                const on = t === tab;
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    aria-pressed={on}
                    className="relative px-5 py-3.5 text-[11.5px] whitespace-nowrap"
                    style={{ color: on ? T.primary : T.ink, fontWeight: on ? 800 : 600 }}
                  >
                    {t}
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

          <div className="grid gap-4 lg:grid-cols-2 items-start">
            {/* Summary declared first → right. */}
            <AdvisorCard>
              <h2 className="flex items-center gap-2 justify-end text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {d.summary.title}
                <Icon name="lucide:clipboard-list" size={14} style={{ backgroundColor: T.primary }} />
              </h2>
              <p className="mt-3 text-right text-[10.5px] leading-7" style={{ color: T.ink }}>
                {d.summary.body}
              </p>
            </AdvisorCard>

            <AdvisorCard>
              <h2 className="flex items-center gap-2 justify-end text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {d.expect.title}
                <Icon name="lucide:target" size={14} style={{ backgroundColor: T.primary }} />
              </h2>
              <ul className="mt-3.5 space-y-2.5">
                {d.expect.items.map((i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                      {i}
                    </span>
                    <Icon name="lucide:check" size={13} className="shrink-0" style={{ backgroundColor: '#1c8a4e' }} />
                  </li>
                ))}
              </ul>
            </AdvisorCard>

            <AdvisorCard>
              <h2 className="flex items-center gap-2 justify-end text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {d.key.title}
                <Icon name="lucide:info" size={14} style={{ backgroundColor: T.primary }} />
              </h2>
              <ul className="mt-3.5 grid grid-cols-3 gap-2.5">
                {d.key.tiles.map((k) => (
                  <li key={k.label} className="p-2.5 text-right" style={{ borderRadius: R.sm, backgroundColor: '#f8f7fd' }}>
                    <span className="flex items-center gap-1 justify-end text-[8.5px] leading-4" style={{ color: T.muted }}>
                      {k.label}
                      <Icon name={k.icon} size={10} className="shrink-0" style={{ backgroundColor: T.muted }} />
                    </span>
                    <span className="mt-0.5 block text-[10.5px] font-extrabold" style={{ color: T.ink }}>
                      {k.value}
                    </span>
                  </li>
                ))}
              </ul>
            </AdvisorCard>

            <AdvisorCard>
              <h2 className="flex items-center gap-2 justify-end text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {d.analysis.title}
                <Icon name="lucide:sparkles" size={14} style={{ backgroundColor: T.violet }} />
              </h2>
              <ul className="mt-3.5 space-y-2.5">
                {d.analysis.rows.map((r) => (
                  <li key={r.label} className="flex items-center gap-2.5">
                    <span className="text-[10.5px] font-extrabold" style={{ color: r.fg }}>
                      {r.value}
                    </span>
                    <span className="flex-1 text-right text-[10px]" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: r.fg }} />
                  </li>
                ))}
              </ul>

              <h3 className="mt-4 flex items-center gap-2 justify-end text-[11px] font-extrabold" style={{ color: T.ink }}>
                {d.warn.title}
              </h3>
              <ul className="mt-2.5 space-y-2">
                {d.warn.items.map((w) => (
                  <li key={w} className="flex items-start gap-2">
                    <span className="flex-1 text-right text-[9.5px] leading-6" style={{ color: T.ink }}>
                      {w}
                    </span>
                    <Icon
                      name="lucide:triangle-alert"
                      size={12}
                      className="shrink-0 mt-1"
                      style={{ backgroundColor: T.warning }}
                    />
                  </li>
                ))}
              </ul>
            </AdvisorCard>
          </div>

          {/* Attached documents. */}
          <AdvisorCard>
            <div className="flex items-center justify-between gap-3">
              <button className="text-[10px] font-bold" style={{ color: T.primary }}>
                {d.docs.all}
              </button>
              <h2 className="flex items-center gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                {d.docs.title}
                <Icon name="lucide:file-text" size={14} style={{ backgroundColor: T.primary }} />
              </h2>
            </div>

            <ul className="mt-4 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {d.docs.items.map((f) => (
                <li
                  key={f.name}
                  className="p-3 text-center"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <Icon name="lucide:file-text" size={22} style={{ backgroundColor: FILE_FG[f.type] }} />
                  <span className="mt-1.5 block text-[9px] font-bold leading-5" style={{ color: T.ink }}>
                    {f.name}
                  </span>
                  <span className="block text-[8.5px]" style={{ color: T.muted }} dir="ltr">
                    {f.size}
                  </span>
                </li>
              ))}
            </ul>
          </AdvisorCard>

          {/* Decision bar. */}
          <AdvisorCard>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                className="flex items-center gap-2 px-6 py-3 text-[11.5px] font-extrabold"
                style={{ borderRadius: R.md, backgroundColor: '#f4fbf6', border: '1px solid #1c8a4e', color: '#1c8a4e' }}
              >
                <Icon name="lucide:circle-check" size={14} style={{ backgroundColor: '#1c8a4e' }} />
                {d.actions.accept}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 text-[11.5px] font-bold"
                style={{ borderRadius: R.md, backgroundColor: '#fff6ec', border: `1px solid ${T.accent}`, color: T.accent }}
              >
                <Icon name="lucide:circle-alert" size={14} style={{ backgroundColor: T.accent }} />
                {d.actions.more}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 text-[11.5px] font-bold"
                style={{ borderRadius: R.md, backgroundColor: '#fdf0f0', border: `1px solid ${T.danger}`, color: T.danger }}
              >
                <Icon name="lucide:x" size={14} style={{ backgroundColor: T.danger }} />
                {d.actions.reject}
              </button>

              <p className="flex-1 min-w-[200px] text-right text-[9.5px]" style={{ color: T.muted }}>
                {d.actions.note}
              </p>
            </div>
          </AdvisorCard>
        </div>

        <AdvisorAgentPanel
          title={d.agent.title}
          bubble={d.agent.bubble}
          chips={d.agent.chips}
          chipsTitle={d.agent.chipsTitle}
          note={d.agent.note}
          cta=""
        />
      </div>
    </AdvisorShell>
  );
}
