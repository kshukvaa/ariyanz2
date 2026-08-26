'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { programHead } from '@/data/orgProgram';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the programme detail tabs (screens 35–41).

   The header facts stay put while the tab beneath changes, so the
   programme's size and shape never leave the screen — you can
   read any tab without losing track of how many people it is
   about.
────────────────────────────────────────────────────────────── */

export function ProgramHeader({
  tab,
  onTab,
}: {
  tab: string;
  onTab: (id: string) => void;
}) {
  return (
    <>
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/org/development"
            className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:arrow-right" size={16} style={{ backgroundColor: T.muted }} />
            {programHead.actions.back}
          </Link>

          <button
            className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:pencil" size={16} style={{ backgroundColor: T.muted }} />
            {programHead.actions.edit}
          </button>

          <button
            data-ripple
            className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:plus" size={16} className="text-white" />
            {programHead.actions.add}
          </button>
        </div>

        <div className="text-right">
          <nav className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            {programHead.crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <Icon name="lucide:chevron-left" size={12} style={{ backgroundColor: T.muted }} />}
                {c.href ? (
                  <Link href={c.href} className="hover:opacity-70">
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: T.ink }}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="mt-1.5 flex items-center justify-end gap-2.5">
            <span
              className="px-3 py-1 text-[11px] font-bold"
              style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
            >
              {programHead.state}
            </span>
            <h1 className="text-[24px] font-extrabold" style={{ color: T.ink }}>
              {programHead.title}
            </h1>
          </div>

          <p className="mt-1 flex items-center justify-end gap-2 text-[11.5px]" style={{ color: T.muted }}>
            {programHead.facts.map((f, i) => (
              <span key={f} className="flex items-center gap-2">
                {i > 0 && <span style={{ color: T.border }}>|</span>}
                {f}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="bg-white px-2 overflow-x-auto"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-1 min-w-max">
          {programHead.tabs.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => onTab(t.id)}
                aria-pressed={on}
                className="relative flex items-center gap-2 px-5 py-4 text-[12.5px] whitespace-nowrap transition-colors"
                style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
              >
                <Icon
                  name={t.icon}
                  size={15}
                  style={{ backgroundColor: on ? T.primary : T.muted }}
                />
                {t.label}
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
    </>
  );
}

/* A Baseline → Current → Target bar, used on three of the tabs. */
export function GapBar({
  label,
  baseline,
  current,
  target,
  delta,
  pct,
  colour,
  warn,
  legend,
}: {
  label: string;
  baseline: string | number;
  current: string | number;
  target: string | number;
  delta: string;
  pct: number;
  colour: string;
  warn?: boolean;
  legend: { baseline: string; current: string; target: string; improve: string };
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span
          className="flex items-center gap-1 px-2.5 py-1 text-[10.5px] font-bold"
          style={{ borderRadius: R.sm, backgroundColor: warn ? T.tintOrange : T.tintGreen, color: colour }}
        >
          {delta}
          {warn && <Icon name="lucide:triangle-alert" size={11} style={{ backgroundColor: colour }} />}
        </span>
        <span className="flex items-center gap-1.5 text-[11.5px] font-bold" style={{ color: T.ink }}>
          {label}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-[9.5px]" style={{ color: T.muted }}>
        <span>{legend.target}</span>
        <span className="flex-1" />
        <span>{legend.current}</span>
        <span className="flex-1" />
        <span>{legend.baseline}</span>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-[11px] font-extrabold shrink-0" style={{ color: T.muted }}>
          {target}
        </span>
        <span className="flex-1 h-2.5 rounded-full overflow-hidden relative" style={{ backgroundColor: T.border }}>
          <span
            className="block h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: colour }}
          />
        </span>
        <span className="text-[11px] font-extrabold shrink-0" style={{ color: T.ink }}>
          {current}
        </span>
        <span className="text-[11px] font-extrabold shrink-0" style={{ color: T.muted }}>
          {baseline}
        </span>
      </div>
    </div>
  );
}

/* The quadrant scatter shared by the activities and impact tabs. */
export function Quadrant({
  points,
  labels,
  axes,
  height = 220,
}: {
  points: { label: string; x: number; y: number; colour: string }[];
  labels: { label: string; pos: 'tl' | 'tr' | 'bl' | 'br' }[];
  axes: { x: string; y: string };
  height?: number;
}) {
  const corner = {
    tl: 'top-2 left-2 text-left',
    tr: 'top-2 right-2 text-right',
    bl: 'bottom-2 left-2 text-left',
    br: 'bottom-2 right-2 text-right',
  };

  return (
    <div>
      <div className="flex gap-2">
        <span
          className="text-[9px] shrink-0 flex items-center justify-center"
          style={{ color: T.muted, writingMode: 'vertical-rl' }}
        >
          {axes.y}
        </span>

        <div
          className="flex-1 relative"
          style={{ height, borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <span className="absolute inset-x-0 top-1/2 border-t" style={{ borderColor: T.border }} />
          <span className="absolute inset-y-0 left-1/2 border-l" style={{ borderColor: T.border }} />

          {labels.map((l) => (
            <span
              key={l.pos}
              className={`absolute text-[8.5px] max-w-[46%] leading-3 ${corner[l.pos]}`}
              style={{ color: T.muted }}
            >
              {l.label}
            </span>
          ))}

          {points.map((p) => (
            <span
              key={p.label}
              className="absolute flex items-center gap-1"
              style={{ left: `${p.x}%`, bottom: `${p.y}%`, transform: 'translate(-50%, 50%)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.colour }} />
              <span className="text-[8.5px] whitespace-nowrap" style={{ color: T.ink }}>
                {p.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <p className="mt-1 text-center text-[9px]" style={{ color: T.muted }}>
        {axes.x}
      </p>
    </div>
  );
}

/* A row of tinted mini-cards; used for quick actions on most tabs. */
export function QuickGrid({
  rows,
  cols = 2,
}: {
  rows: { label: string; icon: string; fg?: string; bg?: string }[];
  cols?: 2 | 3;
}) {
  return (
    <div className={`grid gap-2.5 ${cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {rows.map((r) => (
        <button
          key={r.label}
          className="flex flex-col items-center gap-1.5 p-3 text-center transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name={r.icon} size={17} style={{ backgroundColor: r.fg ?? T.primary }} />
          <span className="text-[10px] font-semibold leading-3" style={{ color: T.ink }}>
            {r.label}
          </span>
        </button>
      ))}
    </div>
  );
}
