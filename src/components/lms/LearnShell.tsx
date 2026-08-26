'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR, fa } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   The classroom shell.

   Seven screens run inside this — lesson, homework, exam, exam
   results, forum, final project, certificate — and they differ
   only in what fills the centre column. The frame around them is
   fixed: a navy progress band, the curriculum on the right, your
   own progress and the agent on the left.

   RTL: the first declared grid column is the RIGHTMOST, so the
   curriculum is declared first and the left-hand aside last.
────────────────────────────────────────────────────────────── */

/* ── Course progress band ─────────────────────────────────────── */

export interface CourseBand {
  title: string;
  instructor: string;
  avatar?: string;
  meta: { label: string; icon: string }[];
  progressLabel: string;
  progressPct: number;
  progressNote: string;
  back: { label: string; href: string };
}

export function ProgressBand({ band }: { band: CourseBand }) {
  return (
    <section style={{ backgroundColor: L.navyDeep }}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5 flex items-center gap-5 flex-wrap">
        <Link
          href={band.back.href}
          className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold text-white shrink-0"
          style={{ borderRadius: LR.md, border: '1px solid rgba(255,255,255,.25)' }}
        >
          <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: '#ffffff' }} />
          {band.back.label}
        </Link>

        <div className="flex-1 min-w-[240px] text-center">
          <div className="flex items-center justify-center gap-3">
            {band.avatar && (
              <img src={band.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
            )}
            <h1 className="text-[16px] font-extrabold text-white">{band.title}</h1>
          </div>

          <div className="mt-2 flex items-center justify-center gap-5 flex-wrap">
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,.7)' }}>
              مدرس : {band.instructor}
            </span>
            {band.meta.map((m) => (
              <span
                key={m.label}
                className="flex items-center gap-1.5 text-[10.5px]"
                style={{ color: 'rgba(255,255,255,.6)' }}
              >
                {m.label}
                <Icon name={m.icon} size={12} style={{ backgroundColor: 'rgba(255,255,255,.6)' }} />
              </span>
            ))}
          </div>
        </div>

        <div className="w-[210px] shrink-0 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-extrabold text-white">{fa(band.progressPct)}%</span>
            <span className="text-[10.5px]" style={{ color: 'rgba(255,255,255,.7)' }}>
              {band.progressLabel}
            </span>
          </div>
          <span
            className="mt-2 block h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,.18)' }}
          >
            <span
              className="block h-full rounded-full"
              style={{
                width: `${band.progressPct}%`,
                background: `linear-gradient(90deg, ${L.blue}, ${L.green})`,
              }}
            />
          </span>
          <span className="mt-1.5 block text-[10px]" style={{ color: 'rgba(255,255,255,.6)' }}>
            {band.progressNote}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Curriculum rail ──────────────────────────────────────────── */

export interface Lesson {
  n: string;
  title: string;
  meta: string;
  state: 'done' | 'current' | 'locked';
}

export interface Chapter {
  id: string;
  label: string;
  count: string;
  lessons: Lesson[];
}

export function Curriculum({
  title,
  chapters,
  download,
}: {
  title: string;
  chapters: Chapter[];
  download?: string;
}) {
  const currentChapter =
    chapters.find((c) => c.lessons.some((l) => l.state === 'current'))?.id ?? chapters[0]?.id;
  const [open, setOpen] = useState<string[]>(chapters.map((c) => c.id));

  const toggle = (id: string) =>
    setOpen((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <aside className="xl:order-1 xl:sticky xl:top-4">
      <div className="bg-white" style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}>
        <h2
          className="p-4 text-right text-[14px] font-extrabold"
          style={{ color: L.navy, borderBottom: `1px solid ${L.border}` }}
        >
          {title}
        </h2>

        <div className="max-h-[620px] overflow-y-auto">
          {chapters.map((ch) => {
            const isOpen = open.includes(ch.id);
            const isCurrent = ch.id === currentChapter;

            return (
              <div key={ch.id} style={{ borderBottom: `1px solid ${L.border}` }}>
                <button
                  onClick={() => toggle(ch.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-2 px-4 py-3"
                  style={{ backgroundColor: isCurrent ? L.blueSoft : '#fafbfe' }}
                >
                  <span className="text-[10px] shrink-0" style={{ color: L.muted }}>
                    {ch.count}
                  </span>
                  <span
                    className="flex-1 text-right text-[12px] font-extrabold"
                    style={{ color: isCurrent ? L.blue : L.navy }}
                  >
                    {ch.label}
                  </span>
                  <Icon
                    name="lucide:chevron-left"
                    size={13}
                    style={{
                      backgroundColor: L.muted,
                      transform: isOpen ? 'rotate(-90deg)' : undefined,
                      transition: 'transform .2s',
                    }}
                  />
                </button>

                {isOpen && (
                  <ul>
                    {ch.lessons.map((l) => (
                      <li
                        key={l.n + l.title}
                        className="flex items-center gap-2.5 px-4 py-2.5"
                        style={{
                          backgroundColor: l.state === 'current' ? L.blueTint : undefined,
                          borderTop: `1px solid ${L.border}`,
                        }}
                      >
                        <span className="text-[9.5px] shrink-0" style={{ color: L.muted }}>
                          {l.n}
                        </span>

                        <span className="flex-1 text-right min-w-0">
                          <span
                            className="block text-[11.5px] truncate"
                            style={{
                              color: l.state === 'locked' ? L.muted : L.ink,
                              fontWeight: l.state === 'current' ? 800 : 500,
                            }}
                          >
                            {l.title}
                          </span>
                          <span className="block text-[9.5px]" style={{ color: L.muted }}>
                            {l.meta}
                          </span>
                        </span>

                        <span className="shrink-0">
                          {l.state === 'done' && (
                            <Icon name="lucide:circle-check" size={17} style={{ backgroundColor: L.green }} />
                          )}
                          {l.state === 'current' && (
                            <Icon name="lucide:circle-dot" size={17} style={{ backgroundColor: L.blue }} />
                          )}
                          {l.state === 'locked' && (
                            <Icon name="lucide:lock" size={15} style={{ backgroundColor: L.muted }} />
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {download && (
          <div className="p-3">
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold"
              style={{ borderRadius: LR.md, border: `1px solid ${L.blue}`, color: L.blue }}
            >
              <Icon name="lucide:download" size={14} style={{ backgroundColor: L.blue }} />
              {download}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

/* ── Learner-status aside (left column) ───────────────────────── */

export interface LearnAside {
  status: {
    title: string;
    pct: number;
    caption: string;
    rows: { label: string; value: string; icon: string; fg?: string }[];
  };
  suggestions?: {
    title: string;
    items: { label: string; desc: string; icon: string; fg: string; cta: string }[];
  };
  agent?: {
    title: string;
    desc: string;
    chips: string[];
    placeholder: string;
  };
}

export function LearnerAside({ aside }: { aside: LearnAside }) {
  return (
    <aside className="xl:order-3 space-y-4">
      <div className="bg-white p-4" style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}>
        <h2 className="text-center text-[13px] font-extrabold" style={{ color: L.navy }}>
          {aside.status.title}
        </h2>

        <div className="mt-3 flex justify-center">
          <RingLarge pct={aside.status.pct} caption={aside.status.caption} />
        </div>

        <ul className="mt-4 space-y-2.5">
          {aside.status.rows.map((r) => (
            <li key={r.label} className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold shrink-0" style={{ color: L.ink }}>
                {r.value}
              </span>
              <span className="flex-1 text-right text-[11px]" style={{ color: L.muted }}>
                {r.label}
              </span>
              <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg ?? L.blue }} />
            </li>
          ))}
        </ul>
      </div>

      {aside.suggestions && (
        <div className="bg-white p-4" style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}>
          <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
            {aside.suggestions.title}
          </h2>

          <ul className="mt-3 space-y-3">
            {aside.suggestions.items.map((s) => (
              <li key={s.label}>
                <div className="flex items-start gap-2.5">
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[11.5px] font-extrabold" style={{ color: L.navy }}>
                      {s.label}
                    </span>
                    <span className="block text-[9.5px] leading-4" style={{ color: L.muted }}>
                      {s.desc}
                    </span>
                  </span>
                  <span
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ borderRadius: LR.md, backgroundColor: `${s.fg}14` }}
                  >
                    <Icon name={s.icon} size={17} style={{ backgroundColor: s.fg }} />
                  </span>
                </div>
                <button
                  className="mt-2 w-full py-1.5 text-[10.5px] font-bold"
                  style={{ borderRadius: LR.sm, border: `1px solid ${L.border}`, color: s.fg }}
                >
                  {s.cta}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {aside.agent && (
        <div className="p-4" style={{ borderRadius: LR.lg, backgroundColor: L.violetSoft }}>
          <div className="flex items-center gap-2.5">
            <img
              src="/images/aryaz/illustrations/ai-assistant-avatar.png"
              alt=""
              className="w-12 h-12 object-contain shrink-0"
            />
            <h2 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: L.violet }}>
              {aside.agent.title}
            </h2>
          </div>

          <p className="mt-2 text-right text-[10.5px] leading-5" style={{ color: L.muted }}>
            {aside.agent.desc}
          </p>

          <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-end">
            {aside.agent.chips.map((c) => (
              <button
                key={c}
                className="px-2.5 py-1.5 text-[9.5px] font-semibold bg-white"
                style={{ borderRadius: LR.sm, color: L.ink }}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="mt-3 flex items-center gap-2 px-3 py-2.5 bg-white" style={{ borderRadius: LR.md }}>
            <Icon name="lucide:send" size={13} style={{ backgroundColor: L.violet }} />
            <input
              placeholder={aside.agent.placeholder}
              className="flex-1 min-w-0 bg-transparent text-[10.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: L.ink }}
            />
          </label>
        </div>
      )}
    </aside>
  );
}

function RingLarge({ pct, caption }: { pct: number; caption: string }) {
  const size = 116;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <span
      className="relative inline-flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="absolute inset-0 -rotate-90 scale-x-[-1]">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={L.border} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={L.blue}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
        />
      </svg>
      <span className="relative text-[22px] font-extrabold" style={{ color: L.navy }}>
        {fa(pct)}%
      </span>
      <span className="relative mt-0.5 text-[9px] text-center px-4" style={{ color: L.muted }}>
        {caption}
      </span>
    </span>
  );
}

/* ── The shell itself ─────────────────────────────────────────── */

export default function LearnShell({
  band,
  curriculum,
  aside,
  children,
}: {
  band: CourseBand;
  curriculum: { title: string; chapters: Chapter[]; download?: string };
  aside: LearnAside;
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: L.page }}>
      <ProgressBand band={band} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-4 xl:grid-cols-[300px_1fr_270px] items-start">
          <Curriculum
            title={curriculum.title}
            chapters={curriculum.chapters}
            download={curriculum.download}
          />

          <main className="min-w-0 space-y-4 xl:order-2">{children}</main>

          <LearnerAside aside={aside} />
        </div>
      </div>
    </div>
  );
}
