'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import AdvisorShell, { AdvisorCard, AvailabilityBar, Tone } from './AdvisorShell';
import { AdvisorAgentPanel, Ring } from './AdvisorParts';
import {
  advisorCasesHead,
  advisorCasesAttention,
  advisorCases,
  ADVISOR_TONES,
} from '@/data/counseling/advisor';

/* پرونده‌های من — «page 18». */

const CTA_STYLE: Record<string, { bg: string; fg: string; border: string }> = {
  solid: { bg: '#4b30ce', fg: '#ffffff', border: '#4b30ce' },
  warn: { bg: '#fff6ec', fg: '#fe7601', border: '#fe7601' },
  danger: { bg: '#dc2326', fg: '#ffffff', border: '#dc2326' },
  ok: { bg: '#f4fbf6', fg: '#1c8a4e', border: '#1c8a4e' },
};

export default function AdvisorCases() {
  const [tab, setTab] = useState(advisorCasesHead.tabs[0]);

  return (
    <AdvisorShell active="cases">
      <AdvisorCard>
        <div className="flex items-start gap-5 flex-wrap">
          <AvailabilityBar />
          <div className="flex-1 min-w-[240px] text-right">
            <h1 className="text-[18px] font-extrabold" style={{ color: T.ink }}>
              {advisorCasesHead.title}
            </h1>
            <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
              {advisorCasesHead.desc}
            </p>
          </div>
        </div>
      </AdvisorCard>

      <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
        {advisorCasesHead.stats.map((s) => (
          <li key={s.label}>
            <AdvisorCard>
              <div className="flex items-center gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[20px] font-extrabold" style={{ color: T.ink }}>
                    {s.value}
                  </span>
                  <span className="mt-0.5 block text-[10px]" style={{ color: T.muted }}>
                    {s.label}
                  </span>
                </span>
                <span
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.md, backgroundColor: s.bg }}
                >
                  <Icon name={s.icon} size={19} style={{ backgroundColor: s.fg }} />
                </span>
              </div>
              <button className="mt-2.5 flex items-center gap-1 text-[9.5px] font-bold" style={{ color: T.primary }}>
                <Icon name="lucide:chevron-left" size={10} style={{ backgroundColor: T.primary }} />
                {s.cta}
              </button>
            </AdvisorCard>
          </li>
        ))}
      </ul>

      {/* Attention band. */}
      <AdvisorCard>
        <h2 className="flex items-center gap-2 justify-end text-[12.5px] font-extrabold" style={{ color: T.ink }}>
          {advisorCasesAttention.title}
          <Icon name="lucide:circle-alert" size={14} style={{ backgroundColor: T.danger }} />
        </h2>

        <ul className="mt-3.5 grid gap-3.5 md:grid-cols-2">
          {advisorCasesAttention.items.map((a) => {
            const t = ADVISOR_TONES[a.tone];
            return (
              <li
                key={a.title}
                className="flex items-center gap-3 p-3.5"
                style={{ borderRadius: R.md, backgroundColor: t.bg }}
              >
                <span className="flex-1 min-w-0 text-right">
                  <span className="block text-[9.5px] font-bold" style={{ color: t.fg }}>
                    {a.head}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-extrabold leading-6" style={{ color: T.ink }}>
                    {a.title}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }}>
                    {a.note}
                  </span>
                  <button
                    className="mt-2 px-3 py-1.5 text-[9.5px] font-bold bg-white"
                    style={{ borderRadius: R.sm, border: `1px solid ${t.fg}`, color: t.fg }}
                  >
                    {a.cta}
                  </button>
                </span>
                <span className="w-11 h-11 flex items-center justify-center shrink-0 bg-white" style={{ borderRadius: R.md }}>
                  <Icon name={a.icon} size={19} style={{ backgroundColor: t.fg }} />
                </span>
              </li>
            );
          })}
        </ul>
      </AdvisorCard>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px] items-start">
        {/* Case list declared first → right. */}
        <AdvisorCard>
          <div className="overflow-x-auto" style={{ borderBottom: `1px solid ${T.border}` }}>
            <ul className="flex items-center gap-1 min-w-max justify-end">
              {advisorCasesHead.tabs.map((t) => {
                const on = t === tab;
                return (
                  <li key={t}>
                    <button
                      onClick={() => setTab(t)}
                      aria-pressed={on}
                      className="relative px-5 py-3 text-[11.5px] whitespace-nowrap"
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
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <ul className="flex items-center gap-2 flex-wrap">
              {advisorCasesHead.filters.map((f) => (
                <li key={f}>
                  <button
                    className="flex items-center gap-1.5 px-3.5 py-2 text-[10px] font-bold"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                  >
                    <Icon name="lucide:chevron-down" size={11} style={{ backgroundColor: T.muted }} />
                    {f}
                  </button>
                </li>
              ))}
            </ul>

            <label
              className="flex items-center gap-2 px-3 py-2 min-w-[200px]"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <Icon name="lucide:search" size={13} style={{ backgroundColor: T.muted }} />
              <input
                placeholder={advisorCasesHead.search}
                className="flex-1 min-w-0 bg-transparent text-right text-[10.5px] outline-none placeholder:text-[#9396b0]"
                style={{ color: T.ink }}
              />
            </label>
          </div>

          <ul className="mt-4 space-y-3.5">
            {advisorCases.map((c) => {
              const t = ADVISOR_TONES[c.tone];
              const cta = CTA_STYLE[c.ctaTone];
              return (
                <li
                  key={c.code}
                  className="p-4"
                  style={{
                    borderRadius: R.md,
                    border: `1px solid ${c.urgent ? '#f6d9d9' : T.border}`,
                  }}
                >
                  <div className="flex items-start gap-3.5 flex-wrap">
                    <Ring pct={c.pct} color={c.ring} size={58} label="پیشرفت پرونده" />

                    <div className="flex-1 min-w-[220px] text-right">
                      <span className="flex items-center gap-2 justify-end flex-wrap">
                        <Tone label={c.urgency} tone={c.urgent ? 'danger' : 'muted'} icon={c.urgent ? 'lucide:zap' : 'lucide:star'} />
                        <span className="text-[10px] font-bold" style={{ color: T.muted }} dir="ltr">
                          {c.code}
                        </span>
                      </span>

                      <h3 className="mt-1.5 text-[12.5px] font-extrabold leading-7" style={{ color: T.ink }}>
                        {c.title}
                      </h3>
                      <p className="text-[9.5px]" style={{ color: T.muted }}>
                        مشتری: {c.client} — {c.field}
                      </p>

                      <ul className="mt-2.5 flex items-center gap-4 justify-end flex-wrap">
                        {c.meta.map((m) => (
                          <li key={m.label} className="text-right">
                            <span className="flex items-center gap-1 justify-end text-[8.5px]" style={{ color: T.muted }}>
                              {m.label}
                              <Icon name={m.icon} size={10} style={{ backgroundColor: T.muted }} />
                            </span>
                            <span className="block text-[10px] font-bold" style={{ color: T.ink }}>
                              {m.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="shrink-0 text-left order-3">
                      <span className="block text-[9.5px] font-bold mb-2" style={{ color: t.fg }}>
                        {c.status}
                      </span>
                      <span className="flex items-center gap-2">
                        <button aria-label={`گزینه‌های ${c.code}`}>
                          <Icon name="lucide:ellipsis" size={14} style={{ backgroundColor: T.muted }} />
                        </button>
                        <button
                          className="px-4 py-2 text-[10px] font-extrabold whitespace-nowrap"
                          style={{
                            borderRadius: R.md,
                            backgroundColor: cta.bg,
                            color: cta.fg,
                            border: `1px solid ${cta.border}`,
                          }}
                        >
                          {c.cta}
                        </button>
                      </span>
                      {c.secondary && (
                        <button className="mt-2 block text-[9.5px] font-bold" style={{ color: T.primary }}>
                          {c.secondary}
                        </button>
                      )}
                    </div>
                  </div>

                  {c.last && (
                    <p
                      className="mt-3 pt-3 text-right text-[9.5px]"
                      style={{ borderTop: `1px solid ${T.border}`, color: T.muted }}
                    >
                      {c.last}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </AdvisorCard>

        <AdvisorAgentPanel />
      </div>
    </AdvisorShell>
  );
}
