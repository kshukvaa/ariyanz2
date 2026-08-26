'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { AdvisorCard, Tone } from './AdvisorShell';
import {
  advisorAgent,
  advisorSlotCta,
  ADVISOR_TONES,
  type AdvisorRequest,
} from '@/data/counseling/advisor';

/* Pieces shared by more than one advisor screen: the match dial,
   the request card (dashboard shows a compact one, the requests
   list the full one) and the assistant rail. */

export function Ring({
  pct,
  color,
  size = 64,
  label,
}: {
  pct: number;
  color: string;
  size?: number;
  label?: string;
}) {
  const r = 28;
  const c = 2 * Math.PI * r;
  return (
    <span className="shrink-0 text-center" style={{ width: size }}>
      <span className="relative block" style={{ width: size, height: size }}>
        <svg viewBox="0 0 70 70" className="w-full h-full -rotate-90">
          <circle cx="35" cy="35" r={r} fill="none" stroke="#eceaf6" strokeWidth="6" />
          <circle
            cx="35"
            cy="35"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * c} ${c}`}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-extrabold"
          style={{ color, fontSize: size > 58 ? 13 : 11 }}
        >
          {`${pct.toLocaleString('fa-IR')}٪`}
        </span>
      </span>
      {label && (
        <span className="mt-1 block text-[8.5px] leading-4" style={{ color: T.muted }}>
          {label}
        </span>
      )}
    </span>
  );
}

export function RequestCard({ r, compact = false }: { r: AdvisorRequest; compact?: boolean }) {
  const tone = r.urgent ? 'danger' : 'muted';
  return (
    <div
      className="p-4"
      style={{
        borderRadius: R.md,
        border: `1px solid ${r.urgent ? '#f6d9d9' : T.border}`,
        backgroundColor: r.urgent ? '#fffafa' : '#ffffff',
      }}
    >
      <div className="flex items-start gap-3.5 flex-wrap">
        {/* Match dial declared first → right. */}
        <span className="shrink-0 text-center order-1">
          <Ring pct={r.match} color={T.primary} size={compact ? 54 : 64} />
          <span className="mt-1 block text-[8.5px]" style={{ color: T.muted }}>
            {r.matchNote}
          </span>
          {!compact && (
            <button className="mt-1 flex items-center gap-1 mx-auto text-[9px] font-bold" style={{ color: T.primary }}>
              <Icon name="lucide:chevron-down" size={10} style={{ backgroundColor: T.primary }} />
              {r.detail}
            </button>
          )}
        </span>

        <div className="flex-1 min-w-[220px] text-right order-2">
          <span className="flex items-center gap-2 justify-end flex-wrap">
            <Tone label={r.kind} tone="purple" icon={r.kindIcon} />
            <Tone label={r.urgency} tone={tone} icon={r.urgent ? 'lucide:zap' : undefined} />
          </span>

          <h3 className="mt-2 text-[13px] font-extrabold leading-7" style={{ color: T.ink }}>
            {r.title}
          </h3>
          {r.desc && (
            <p className="mt-1 text-[10px] leading-6" style={{ color: T.muted }}>
              {r.desc}
            </p>
          )}
          <p className="mt-1 text-[10px]" style={{ color: T.muted }}>
            {r.org} — {r.field}
          </p>

          <ul className="mt-2.5 flex items-center gap-4 justify-end flex-wrap">
            {r.meta.map((m) => (
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

          {!compact && (
            <p
              className="mt-3 flex items-center gap-2 justify-end p-2.5 text-[9.5px]"
              style={{ borderRadius: R.sm, backgroundColor: '#f6f4fe', color: T.ink }}
            >
              {r.why}
              <Icon name="lucide:sparkles" size={12} className="shrink-0" style={{ backgroundColor: T.primary }} />
            </p>
          )}

          {r.slots && (
            <div className="mt-3 flex items-center gap-2 justify-end flex-wrap">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-[9.5px] font-bold"
                style={{ borderRadius: R.sm, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                <Icon name="lucide:calendar" size={11} style={{ backgroundColor: T.primary }} />
                {advisorSlotCta}
              </button>
              <span className="text-[9px]" style={{ color: T.muted }}>
                یا
              </span>
              {r.slots.map((s) => (
                <button
                  key={s}
                  className="px-3 py-1.5 text-[10px] font-bold"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }}
                  dir="ltr"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3.5 pt-3.5 flex items-center gap-2.5 flex-wrap" style={{ borderTop: `1px solid ${T.border}` }}>
        <Link
          href={`/advisor/requests/${r.id}`}
          className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-extrabold text-white"
          style={{ borderRadius: R.md, backgroundColor: T.primary }}
        >
          <Icon name="lucide:eye" size={12} style={{ backgroundColor: '#ffffff' }} />
          {r.view}
        </Link>
        <button
          className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold"
          style={{ borderRadius: R.md, border: `1px solid #1c8a4e`, color: '#1c8a4e', backgroundColor: '#f4fbf6' }}
        >
          <Icon name="lucide:circle-check" size={12} style={{ backgroundColor: '#1c8a4e' }} />
          {r.accept}
        </button>
        <button
          className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.muted }}
        >
          <Icon name="lucide:x" size={12} style={{ backgroundColor: T.muted }} />
          {r.reject}
        </button>
      </div>
    </div>
  );
}

export function AdvisorAgentPanel({
  title,
  bubble,
  chips,
  chipsTitle,
  note,
  cta,
}: {
  title?: string;
  bubble?: string;
  chips?: string[];
  chipsTitle?: string;
  note?: string;
  cta?: string;
} = {}) {
  const a = advisorAgent;
  return (
    <section className="p-4" style={{ borderRadius: R.lg, backgroundColor: '#ffffff', border: `1px solid ${T.border}` }}>
      <div className="flex items-start gap-2.5">
        <span className="flex-1 text-right">
          <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
            {title ?? a.title}
          </span>
          <span className="block text-[9.5px]" style={{ color: T.muted }}>
            {a.role}
          </span>
        </span>
        <img src={a.art} alt="" className="w-14 h-14 object-contain shrink-0" />
      </div>

      <p className="mt-2.5 text-right text-[10px] leading-6" style={{ color: T.ink }}>
        {bubble ?? a.bubble}
      </p>

      {chipsTitle && (
        <h3 className="mt-3.5 text-right text-[11.5px] font-extrabold" style={{ color: T.ink }}>
          {chipsTitle}
        </h3>
      )}

      <ul className="mt-3 space-y-2">
        {(chips ?? a.chips).map((c) => (
          <li key={c}>
            <button
              className="w-full flex items-center gap-2 px-3 py-2.5 text-right transition-colors hover:opacity-75"
              style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}
            >
              <Icon name="lucide:chevron-left" size={11} className="shrink-0 order-3" style={{ backgroundColor: T.muted }} />
              <span className="flex-1 text-[10px] font-bold order-2" style={{ color: T.ink }}>
                {c}
              </span>
              <Icon name="lucide:sparkles" size={12} className="shrink-0 order-1" style={{ backgroundColor: T.primary }} />
            </button>
          </li>
        ))}
      </ul>

      {(cta ?? a.cta) && (
        <button
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-[10.5px] font-extrabold text-white"
          style={{ borderRadius: R.md, backgroundColor: T.primary }}
        >
          <Icon name="lucide:calendar" size={12} style={{ backgroundColor: '#ffffff' }} />
          {cta ?? a.cta}
        </button>
      )}

      <label className="mt-3 flex items-center gap-2.5 px-3 py-2.5" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
        <button
          aria-label="ارسال"
          className="w-8 h-8 flex items-center justify-center shrink-0"
          style={{ borderRadius: R.sm, backgroundColor: T.primary }}
        >
          <Icon name="lucide:send" size={13} style={{ backgroundColor: '#ffffff' }} />
        </button>
        <input
          placeholder={a.placeholder}
          className="flex-1 min-w-0 bg-transparent text-right text-[10.5px] outline-none placeholder:text-[#9396b0]"
          style={{ color: T.ink }}
        />
      </label>

      {note && (
        <p className="mt-2 text-center text-[9px] leading-5" style={{ color: T.muted }}>
          {note}
        </p>
      )}
    </section>
  );
}
