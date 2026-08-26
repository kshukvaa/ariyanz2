'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import AdvisorShell, { AdvisorCard, AdvisorHeading, AvailabilityBar, Tone } from './AdvisorShell';
import { AdvisorAgentPanel, Ring, RequestCard } from './AdvisorParts';
import {
  advisorGreeting,
  advisorStats,
  advisorAttention,
  advisorToday,
  advisorActiveCases,
  advisorRequests,
  advisorRequestsHead,
  ADVISOR_TONES,
} from '@/data/counseling/advisor';

/* داشبورد مشاور — «page 15». Triage first: what needs the
   advisor today, then today's calendar, then the work itself. */

export default function AdvisorDashboard() {
  return (
    <AdvisorShell active="dashboard">
      {/* Greeting. */}
      <AdvisorCard>
        <div className="flex items-center gap-5 flex-wrap">
          <AvailabilityBar />
          <div className="flex-1 min-w-[240px] flex items-center gap-4 justify-end">
            <div className="text-right">
              <h1 className="text-[19px] font-extrabold" style={{ color: T.ink }}>
                {advisorGreeting.hello}
              </h1>
              <p className="mt-1.5 text-[11.5px]" style={{ color: T.muted }}>
                {advisorGreeting.sub}
              </p>
            </div>
            <img src={advisorGreeting.avatar} alt="" className="w-[76px] h-[76px] rounded-full object-cover shrink-0" />
          </div>
        </div>
      </AdvisorCard>

      {/* Stat tiles. */}
      <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
        {advisorStats.map((s) => (
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

      <div className="grid gap-4 lg:grid-cols-2 items-start">
        {/* Attention declared first → right. */}
        <AdvisorCard>
          <div className="flex items-center justify-between gap-3">
            <span
              className="w-5 h-5 flex items-center justify-center text-[9px] font-bold text-white"
              style={{ borderRadius: R.pill, backgroundColor: T.danger }}
            >
              {advisorAttention.count}
            </span>
            <h2 className="flex items-center gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {advisorAttention.title}
              <Icon name="lucide:circle-alert" size={14} style={{ backgroundColor: T.danger }} />
            </h2>
          </div>

          <ul className="mt-4 space-y-3">
            {advisorAttention.items.map((a) => {
              const t = ADVISOR_TONES[a.tone];
              return (
                <li
                  key={a.title}
                  className="flex items-center gap-3 p-3.5"
                  style={{ borderRadius: R.md, backgroundColor: t.bg }}
                >
                  <Icon name="lucide:chevron-left" size={13} className="shrink-0" style={{ backgroundColor: T.muted }} />
                  <span className="flex-1 min-w-0 text-right">
                    <span className="block text-[9.5px]" style={{ color: t.fg }}>
                      {a.kind}
                    </span>
                    <span className="mt-0.5 block text-[12px] font-extrabold" style={{ color: T.ink }}>
                      {a.title}
                    </span>
                    {a.org && (
                      <span className="block text-[9.5px]" style={{ color: T.muted }}>
                        {a.org}
                      </span>
                    )}
                    {a.meta && (
                      <span className="block text-[9px]" style={{ color: T.muted }}>
                        {a.meta}
                      </span>
                    )}
                    <button
                      className="mt-2 px-3 py-1.5 text-[9.5px] font-bold bg-white"
                      style={{ borderRadius: R.sm, border: `1px solid ${t.fg}`, color: t.fg }}
                    >
                      {a.cta}
                    </button>
                  </span>
                  <span
                    className="w-11 h-11 flex items-center justify-center shrink-0 bg-white"
                    style={{ borderRadius: R.md }}
                  >
                    <Icon name={a.icon} size={19} style={{ backgroundColor: t.fg }} />
                  </span>
                </li>
              );
            })}
          </ul>
        </AdvisorCard>

        {/* Today's sessions. */}
        <AdvisorCard>
          <AdvisorHeading title={advisorToday.title} icon="lucide:calendar" />

          <ul className="mt-4 space-y-3">
            {advisorToday.items.map((s) => (
              <li key={s.title} className="flex items-start gap-3">
                <span className="text-left shrink-0 w-[52px]">
                  <span className="block text-[12px] font-extrabold" style={{ color: T.ink }} dir="ltr">
                    {s.from}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }} dir="ltr">
                    {s.to}
                  </span>
                </span>
                <span className="flex flex-col items-center pt-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.dot }} />
                  <span className="w-[2px] flex-1 min-h-[40px]" style={{ backgroundColor: T.border }} />
                </span>
                <span
                  className="flex-1 min-w-0 p-3.5 text-right"
                  style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}
                >
                  <span className="block text-[9.5px]" style={{ color: T.muted }}>
                    {s.kind}
                  </span>
                  <span className="mt-0.5 block text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {s.title}
                  </span>
                  <span className="block text-[9.5px]" style={{ color: T.muted }}>
                    {s.org}
                  </span>
                  {s.place && (
                    <span className="mt-1 flex items-center gap-1 justify-end text-[9px]" style={{ color: T.muted }}>
                      {s.place}
                      <Icon name="lucide:map-pin" size={10} style={{ backgroundColor: T.muted }} />
                    </span>
                  )}
                  <button
                    className="mt-2.5 px-4 py-2 text-[10px] font-extrabold text-white"
                    style={{ borderRadius: R.md, backgroundColor: T.primary }}
                  >
                    {s.cta}
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <button
            className="mt-3 mx-auto flex items-center gap-2 px-5 py-2.5 text-[10.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
          >
            <Icon name="lucide:calendar" size={12} style={{ backgroundColor: T.primary }} />
            {advisorToday.all}
          </button>
        </AdvisorCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_300px] items-start">
        {/* Active cases declared first → right. */}
        <AdvisorCard>
          <AdvisorHeading title={advisorActiveCases.title} icon="lucide:folder" all={advisorActiveCases.all} />

          <ul className="mt-4 space-y-3">
            {advisorActiveCases.items.map((c) => {
              const t = ADVISOR_TONES[c.tone];
              return (
                <li key={c.title} className="flex items-center gap-3">
                  <button aria-label={`گزینه‌های ${c.title}`} className="shrink-0">
                    <Icon name="lucide:ellipsis" size={14} style={{ backgroundColor: T.muted }} />
                  </button>
                  <span className="flex-1 min-w-0 text-right">
                    <span className="block text-[11.5px] font-extrabold leading-6" style={{ color: T.ink }}>
                      {c.title}
                    </span>
                    <span className="block text-[9.5px]" style={{ color: T.muted }}>
                      {c.org}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {c.meta}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2 justify-end flex-wrap">
                      {c.deadline && (
                        <span className="text-[9px] font-bold" style={{ color: T.accent }}>
                          {c.deadline}
                        </span>
                      )}
                      <span className="text-[9px] font-bold" style={{ color: t.fg }}>
                        {c.status}
                      </span>
                    </span>
                    <button
                      className="mt-2 px-3.5 py-1.5 text-[9.5px] font-bold"
                      style={{ borderRadius: R.sm, border: `1px solid ${T.primary}`, color: T.primary }}
                    >
                      {c.cta}
                    </button>
                  </span>
                  <Ring pct={c.pct} color={t.fg} size={54} />
                </li>
              );
            })}
          </ul>

          <button
            className="mt-3 mx-auto flex items-center gap-1.5 text-[10px] font-bold"
            style={{ color: T.primary }}
          >
            <Icon name="lucide:chevron-left" size={11} style={{ backgroundColor: T.primary }} />
            {advisorActiveCases.more}
          </button>
        </AdvisorCard>

        {/* New requests. */}
        <AdvisorCard>
          <AdvisorHeading title={advisorRequestsHead.title} icon="lucide:inbox" all={advisorRequestsHead.all} />
          <ul className="mt-4 space-y-3.5">
            {advisorRequests.slice(0, 2).map((r) => (
              <li key={r.id}>
                <RequestCard r={r} compact />
              </li>
            ))}
          </ul>
        </AdvisorCard>

        <AdvisorAgentPanel />
      </div>
    </AdvisorShell>
  );
}
