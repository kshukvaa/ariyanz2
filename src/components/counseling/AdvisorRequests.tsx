'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import AdvisorShell, { AdvisorCard, AvailabilityBar } from './AdvisorShell';
import { RequestCard } from './AdvisorParts';
import { advisorRequestsHead, advisorRequests } from '@/data/counseling/advisor';

/* درخواست‌های جدید — «page 16». */

export default function AdvisorRequests() {
  const [tab, setTab] = useState(advisorRequestsHead.tabs[0]);

  const shown = advisorRequests.filter((r) => {
    if (tab === advisorRequestsHead.tabs[0]) return true;
    if (tab === 'سؤال تخصصی') return r.kind === 'سؤال تخصصی';
    if (tab === 'جلسه تخصصی') return r.kind === 'جلسه آنلاین';
    if (tab === 'جلسه حضوری') return r.kind === 'جلسه حضوری';
    return true;
  });

  return (
    <AdvisorShell active="requests">
      <AdvisorCard>
        <div className="flex items-start gap-5 flex-wrap">
          <AvailabilityBar />

          <div className="flex-1 min-w-[240px] text-right">
            <h1 className="text-[18px] font-extrabold" style={{ color: T.ink }}>
              {advisorRequestsHead.title}
            </h1>
            <p className="mt-1.5 text-[11px]" style={{ color: T.muted }}>
              {advisorRequestsHead.desc}
            </p>
          </div>

          <ul className="flex items-center gap-2.5 flex-wrap">
            {advisorRequestsHead.stats.map((s) => (
              <li
                key={s.label}
                className="px-4 py-2.5 text-center"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <span className="block text-[15px] font-extrabold" style={{ color: s.fg ?? T.ink }}>
                  {s.value}
                </span>
                <span className="block text-[9px]" style={{ color: T.muted }}>
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </AdvisorCard>

      <AdvisorCard>
        {/* Tabs. */}
        <div className="overflow-x-auto" style={{ borderBottom: `1px solid ${T.border}` }}>
          <ul className="flex items-center gap-1 min-w-max justify-end">
            {advisorRequestsHead.tabs.map((t) => {
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

        {/* Filters. */}
        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <ul className="flex items-center gap-2 flex-wrap">
            {advisorRequestsHead.filters.map((f) => (
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
            className="flex items-center gap-2 px-3 py-2 min-w-[210px]"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name="lucide:search" size={13} style={{ backgroundColor: T.muted }} />
            <input
              placeholder={advisorRequestsHead.search}
              className="flex-1 min-w-0 bg-transparent text-right text-[10.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: T.ink }}
            />
          </label>
        </div>

        <ul className="mt-4 space-y-3.5">
          {shown.map((r) => (
            <li key={r.id}>
              <RequestCard r={r} />
            </li>
          ))}
        </ul>

        {shown.length === 0 && (
          <p className="mt-6 text-center text-[11px]" style={{ color: T.muted }}>
            در این دسته درخواستی وجود ندارد.
          </p>
        )}
      </AdvisorCard>
    </AdvisorShell>
  );
}
