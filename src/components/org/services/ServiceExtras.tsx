'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { FAMILY, type Family } from '@/data/orgServiceNav';
import { SectionHeading } from './ServiceParts';

/* ──────────────────────────────────────────────────────────────
   Renderers for the page-specific sections.

   Most service pages carry one or two blocks that do not fit the
   shared six-move shape — a radial hub, a salary table, a hiring
   funnel, a 2×2 of internal-equity against market-competitiveness.
   Rather than let each page invent its own markup, the data files
   classify those blocks into a small closed vocabulary and this
   module draws them. New shapes get added here, once.
────────────────────────────────────────────────────────────── */

export type Extra =
  | { kind: 'cards'; id: string; title?: string; items: CardItem[] }
  | { kind: 'list'; id: string; title?: string; items: { label: string; desc?: string }[] }
  | { kind: 'table'; id: string; title?: string; cols: string[]; rows: string[][] }
  | { kind: 'stats'; id: string; title?: string; items: StatItem[] }
  | { kind: 'radial'; id: string; title?: string; centre: string; items: { label: string; icon?: string }[] }
  | { kind: 'funnel'; id: string; title?: string; items: { label: string; value: string; fg?: string }[] }
  | { kind: 'matrix'; id: string; title?: string; xAxis?: string; yAxis?: string; cells: MatrixCell[] }
  | { kind: 'steps'; id: string; title?: string; items: { n: string; title: string; lines?: string[] }[] }
  | { kind: 'split'; id: string; title?: string; left?: SplitSide; right?: SplitSide };

interface CardItem {
  label: string;
  desc?: string;
  icon?: string;
  fg?: string;
  bullets?: string[];
}

interface StatItem {
  value: string;
  label: string;
  sub?: string;
  fg?: string;
}

interface MatrixCell {
  label: string;
  value?: string;
  fg?: string;
}

interface SplitSide {
  title?: string;
  items?: { label: string; desc?: string }[];
}

export function ServiceExtra({ extra, family }: { extra: Extra; family: Family }) {
  const c = FAMILY[family];

  const body = (() => {
    switch (extra.kind) {
      /* ── Cards, optionally with their own bullet lists ──────── */
      case 'cards':
        return (
          <div
            className={`grid gap-4 ${
              extra.items.length >= 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3'
            }`}
          >
            {extra.items.map((i) => (
              <article
                key={i.label}
                className="bg-white p-4 flex flex-col"
                style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
              >
                <header className="flex items-start gap-2.5">
                  <h4 className="flex-1 text-right text-[12.5px] font-extrabold leading-5" style={{ color: T.ink }}>
                    {i.label}
                  </h4>
                  {i.icon && (
                    <span
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.md, backgroundColor: `${i.fg ?? c.fg}14` }}
                    >
                      <Icon name={i.icon} size={19} style={{ backgroundColor: i.fg ?? c.fg }} />
                    </span>
                  )}
                </header>

                {i.desc && (
                  <p className="mt-2 text-right text-[10.5px] leading-5" style={{ color: T.muted }}>
                    {i.desc}
                  </p>
                )}

                {i.bullets && (
                  <ul className="mt-3 space-y-1.5 flex-1">
                    {i.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-1.5 text-[10px]" style={{ color: T.ink }}>
                        <span className="flex-1 text-right leading-4">{b}</span>
                        <Icon
                          name="lucide:check"
                          size={11}
                          style={{ backgroundColor: i.fg ?? c.fg, marginTop: 2 }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        );

      /* ── Plain list ─────────────────────────────────────────── */
      case 'list':
        return (
          <ul className="bg-white divide-y" style={{ borderRadius: R.lg, border: `1px solid ${T.border}`, borderColor: T.border }}>
            {extra.items.map((i) => (
              <li key={i.label} className="flex items-start gap-2.5 p-3.5">
                <span className="flex-1 text-right">
                  <span className="block text-[12px] font-bold" style={{ color: T.ink }}>
                    {i.label}
                  </span>
                  {i.desc && (
                    <span className="block mt-0.5 text-[10px] leading-5" style={{ color: T.muted }}>
                      {i.desc}
                    </span>
                  )}
                </span>
                <Icon name="lucide:circle-check" size={15} style={{ backgroundColor: c.fg, marginTop: 1 }} />
              </li>
            ))}
          </ul>
        );

      /* ── Table ──────────────────────────────────────────────── */
      case 'table':
        return (
          <div
            className="bg-white overflow-x-auto"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <table className="w-full min-w-[460px] text-right border-collapse">
              <thead>
                <tr style={{ backgroundColor: c.soft }}>
                  {extra.cols.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-[10.5px] font-bold whitespace-nowrap"
                      style={{ color: c.fg }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {extra.rows.map((row, ri) => (
                  <tr key={ri} style={{ borderTop: `1px solid ${T.border}` }}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-3 text-[11px]"
                        style={{ color: ci === row.length - 1 ? T.ink : T.muted, fontWeight: ci === row.length - 1 ? 700 : 400 }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      /* ── Stat tiles ─────────────────────────────────────────── */
      case 'stats':
        return (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
            {extra.items.map((s) => (
              <div
                key={s.label}
                className="bg-white p-4 text-center"
                style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
              >
                <span className="block text-[22px] font-extrabold" style={{ color: s.fg ?? c.fg }}>
                  {s.value}
                </span>
                <span className="block mt-1 text-[11px] font-semibold" style={{ color: T.ink }}>
                  {s.label}
                </span>
                {s.sub && (
                  <span className="block mt-0.5 text-[9.5px]" style={{ color: T.muted }}>
                    {s.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        );

      /* ── Radial hub: a centre with spokes around it ─────────── */
      case 'radial':
        return <Radial centre={extra.centre} items={extra.items} family={family} />;

      /* ── Funnel ─────────────────────────────────────────────── */
      case 'funnel':
        return (
          <div className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            <ul className="space-y-1.5">
              {extra.items.map((f, i) => {
                /* Each stage narrows — the taper is the whole point. */
                const width = 100 - (i * 55) / Math.max(extra.items.length - 1, 1);
                return (
                  <li key={f.label} className="flex justify-center">
                    <span
                      className="flex items-center justify-between gap-3 px-4 py-2.5 text-white"
                      style={{
                        width: `${width}%`,
                        borderRadius: R.sm,
                        backgroundColor: f.fg ?? c.fg,
                      }}
                    >
                      <span className="text-[12px] font-extrabold">{f.value}</span>
                      <span className="text-[10.5px] font-semibold">{f.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );

      /* ── 2×2 (or n×n) matrix ────────────────────────────────── */
      case 'matrix': {
        const side = Math.round(Math.sqrt(extra.cells.length)) || 2;
        return (
          <div className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            <div className="flex gap-3">
              {extra.yAxis && (
                <span
                  className="text-[9.5px] shrink-0 flex items-center"
                  style={{ color: T.muted, writingMode: 'vertical-rl' }}
                >
                  {extra.yAxis}
                </span>
              )}

              <div className="flex-1">
                <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${side}, minmax(0,1fr))` }}>
                  {extra.cells.map((cell, i) => (
                    <span
                      key={i}
                      className="p-3.5 text-center flex flex-col justify-center min-h-[76px]"
                      style={{ borderRadius: R.md, backgroundColor: `${cell.fg ?? c.fg}14` }}
                    >
                      <span className="text-[11px] font-extrabold leading-4" style={{ color: cell.fg ?? c.fg }}>
                        {cell.label}
                      </span>
                      {cell.value && (
                        <span className="mt-1 text-[12px] font-extrabold" style={{ color: T.ink }}>
                          {cell.value}
                        </span>
                      )}
                    </span>
                  ))}
                </div>

                {extra.xAxis && (
                  <p className="mt-2 text-center text-[9.5px]" style={{ color: T.muted }}>
                    {extra.xAxis}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      }

      /* ── Vertical numbered steps ────────────────────────────── */
      case 'steps':
        return (
          <ol className="bg-white p-5 space-y-3" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            {extra.items.map((s) => (
              <li key={s.n} className="flex items-start gap-3">
                <span className="flex-1 text-right">
                  <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {s.title}
                  </span>
                  {s.lines?.map((l) => (
                    <span key={l} className="block mt-0.5 text-[10px] leading-5" style={{ color: T.muted }}>
                      {l}
                    </span>
                  ))}
                </span>

                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shrink-0"
                  style={{ backgroundColor: c.fg }}
                >
                  {s.n}
                </span>
              </li>
            ))}
          </ol>
        );

      /* ── Two labelled columns ───────────────────────────────── */
      case 'split':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {[extra.right, extra.left].filter(Boolean).map((side, i) => (
              <div
                key={i}
                className="bg-white p-4"
                style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
              >
                {side!.title && (
                  <h4 className="text-right text-[12.5px] font-extrabold mb-2.5" style={{ color: c.fg }}>
                    {side!.title}
                  </h4>
                )}
                <ul className="space-y-1.5">
                  {side!.items?.map((it) => (
                    <li key={it.label} className="flex items-start gap-1.5 text-[10.5px]" style={{ color: T.ink }}>
                      <span className="flex-1 text-right leading-5">{it.label}</span>
                      <Icon name="lucide:check" size={11} style={{ backgroundColor: c.fg, marginTop: 2 }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
    }
  })();

  return (
    <section>
      {extra.title && <SectionHeading family={family}>{extra.title}</SectionHeading>}
      <div className={extra.title ? 'mt-5' : undefined}>{body}</div>
    </section>
  );
}

/* A centre label ringed by evenly spaced spokes. Laid out with
   trigonometry rather than a background image so the labels stay
   selectable and the whole thing survives a font change. */
function Radial({
  centre,
  items,
  family,
}: {
  centre: string;
  items: { label: string; icon?: string }[];
  family: Family;
}) {
  const c = FAMILY[family];
  const n = items.length;

  return (
    <div
      className="bg-white p-5 flex items-center justify-center"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {/* Below xl the ring collapses to a plain grid — a wheel of
          eight Persian labels is unreadable on a phone. */}
      <div className="hidden xl:block relative w-[430px] h-[430px]">
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[124px] h-[124px] rounded-full flex items-center justify-center text-center px-3"
          style={{ backgroundColor: c.bg }}
        >
          <span className="text-[13px] font-extrabold leading-5" style={{ color: c.fg }}>
            {centre}
          </span>
        </span>

        {items.map((it, i) => {
          /* Start at twelve o'clock, step anticlockwise. */
          const a = -Math.PI / 2 - (i * 2 * Math.PI) / n;
          const x = 50 + 38 * Math.cos(a);
          const y = 50 + 38 * Math.sin(a);

          return (
            <span
              key={it.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 w-[104px] text-center"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {it.icon && (
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${c.fg}14` }}
                >
                  <Icon name={it.icon} size={17} style={{ backgroundColor: c.fg }} />
                </span>
              )}
              <span className="text-[10px] font-semibold leading-4" style={{ color: T.ink }}>
                {it.label}
              </span>
            </span>
          );
        })}
      </div>

      <div className="xl:hidden w-full">
        <p className="text-center text-[13px] font-extrabold mb-3" style={{ color: c.fg }}>
          {centre}
        </p>
        <div className="grid gap-2.5 grid-cols-2">
          {items.map((it) => (
            <span
              key={it.label}
              className="flex items-center gap-2 p-2.5"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              {it.icon && <Icon name={it.icon} size={16} style={{ backgroundColor: c.fg }} />}
              <span className="flex-1 text-right text-[10px] font-semibold" style={{ color: T.ink }}>
                {it.label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
