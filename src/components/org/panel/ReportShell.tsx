'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the report screens (14–21).

   Every one of them opens the same way: breadcrumb, title with an
   export pair, a strip of scope filters, a row of headline
   numbers, then a tinted band where Aryaz says what it makes of
   them. Only what comes after differs, so that opening is built
   once here.
────────────────────────────────────────────────────────────── */

export interface Crumb {
  label: string;
  href?: string;
}

export function ReportHead({
  crumbs,
  title,
  desc,
  icon = 'lucide:chart-no-axes-combined',
  actions,
}: {
  crumbs: Crumb[];
  title: string;
  desc?: string;
  icon?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
      <div className="flex items-center gap-2.5 flex-wrap">{actions}</div>

      <div className="text-right">
        <nav className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
          {crumbs.map((c, i) => (
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
          <h1 className="text-[24px] font-extrabold" style={{ color: T.ink }}>
            {title}
          </h1>
          <Icon name={icon} size={23} style={{ backgroundColor: T.primary }} />
        </div>

        {desc && (
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}

/* Export buttons — the pair that sits opposite the title. */
export function ExportPair({
  pdf = 'دانلود PDF',
  excel = 'خروجی Excel',
  extra,
}: {
  pdf?: string;
  excel?: string;
  extra?: { label: string; icon: string };
}) {
  return (
    <>
      {extra && (
        <button
          className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name={extra.icon} size={16} style={{ backgroundColor: T.muted }} />
          {extra.label}
        </button>
      )}

      <button
        className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold transition-colors hover:bg-gray-50"
        style={{ borderRadius: R.md, border: `1.5px solid ${T.successStrong}`, color: T.successStrong }}
      >
        <Icon name="lucide:file-spreadsheet" size={16} style={{ backgroundColor: T.successStrong }} />
        {excel}
      </button>

      <button
        data-ripple
        className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
        style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
      >
        <Icon name="lucide:file-down" size={16} className="text-white" />
        {pdf}
      </button>
    </>
  );
}

/* Scope filters — a row of read-only selects with a label above. */
export function FilterStrip({
  filters,
  reset,
}: {
  filters: { id: string; label: string; value: string; icon?: string }[];
  reset?: string;
}) {
  return (
    <div
      className="bg-white p-3 flex items-center gap-2.5 flex-wrap"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {filters.map((f) => (
        <span key={f.id} className="flex-1 min-w-[150px]">
          <span className="block text-[10px] text-right" style={{ color: T.muted }}>
            {f.label}
          </span>
          <span
            className="flex items-center gap-2 px-3.5 py-2 mt-1"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
            <span className="flex-1 text-right text-[12px] font-semibold truncate" style={{ color: T.ink }}>
              {f.value}
            </span>
            {f.icon && <Icon name={f.icon} size={14} style={{ backgroundColor: T.muted }} />}
          </span>
        </span>
      ))}

      {reset && (
        <button
          className="flex items-center gap-2 px-3.5 py-2.5 text-[12px] font-bold self-end shrink-0"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
        >
          <Icon name="lucide:refresh-cw" size={14} style={{ backgroundColor: T.primary }} />
          {reset}
        </button>
      )}
    </div>
  );
}

/* Headline numbers. */
export interface Kpi {
  id: string;
  value: string;
  label: string;
  sub?: string;
  icon: string;
  fg: string;
  bg: string;
  up?: boolean;
  down?: boolean;
}

/* Tailwind only emits classes it can see as literals, so the column
   counts the reports actually use are spelled out rather than
   interpolated. */
const KPI_COLS: Record<number, string> = {
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
};

export function KpiRow({ kpis, cols = 5 }: { kpis: Kpi[]; cols?: 3 | 4 | 5 | 6 }) {
  return (
    <div className={`grid gap-3.5 grid-cols-1 sm:grid-cols-2 ${KPI_COLS[cols]}`}>
      {kpis.map((k) => (
        <div
          key={k.id}
          className="bg-white p-4 flex items-center gap-3"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <span
            className="w-12 h-12 flex items-center justify-center shrink-0"
            style={{ borderRadius: R.md, backgroundColor: k.bg }}
          >
            <Icon name={k.icon} size={21} style={{ backgroundColor: k.fg }} />
          </span>

          <span className="flex-1 text-right min-w-0">
            <span className="block text-[21px] font-extrabold leading-tight" style={{ color: T.ink }}>
              {k.value}
            </span>
            <span className="block text-[11.5px]" style={{ color: T.muted }}>
              {k.label}
            </span>
            {k.sub && (
              <span
                className="mt-0.5 flex items-center justify-end gap-1 text-[10.5px] font-bold"
                style={{ color: k.up ? T.successStrong : k.down ? T.danger : T.muted }}
              >
                {k.sub}
                {(k.up || k.down) && (
                  <Icon
                    name={k.up ? 'lucide:arrow-up' : 'lucide:trending-down'}
                    size={11}
                    style={{ backgroundColor: k.up ? T.successStrong : T.danger }}
                  />
                )}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

/* The tinted band where Aryaz interprets the numbers. */
export function AiBand({
  title,
  body,
  chips,
  cta,
  tone = T.tintPurple,
}: {
  title: string;
  body: string[];
  chips?: { label: string; value: string; sub?: string; fg: string; bg: string }[];
  cta?: string;
  tone?: string;
}) {
  return (
    <section className="p-5" style={{ borderRadius: R.lg, backgroundColor: tone }}>
      <div className="flex items-start gap-4 flex-wrap">
        {cta && (
          <button
            data-ripple
            className="flex items-center gap-2 px-4 py-3 text-[12px] font-bold text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:sparkles" size={15} className="text-white" />
            {cta}
          </button>
        )}

        <div className="flex-1 min-w-[240px] text-right">
          <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: T.primary }}>
            {title}
            <Icon name="lucide:sparkles" size={17} style={{ backgroundColor: T.primary }} />
          </h2>

          <div className="mt-2 space-y-1">
            {body.map((b) => (
              <p key={b} className="text-[12px] leading-7" style={{ color: T.ink }}>
                {b}
              </p>
            ))}
          </div>
        </div>
      </div>

      {chips && (
        <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-3">
          {chips.map((c) => (
            <div
              key={c.label}
              className="p-3 text-center"
              style={{ borderRadius: R.md, backgroundColor: c.bg }}
            >
              <span className="block text-[10.5px] font-bold" style={{ color: c.fg }}>
                {c.label}
              </span>
              <span className="block mt-1 text-[13px] font-extrabold" style={{ color: T.ink }}>
                {c.value}
              </span>
              {c.sub && (
                <span className="block mt-0.5 text-[10.5px]" style={{ color: c.fg }}>
                  {c.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* A titled white card — the unit every report panel is built from. */
export function Panel({
  title,
  cta,
  action,
  children,
  className = '',
}: {
  title: string;
  cta?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-white p-4 flex flex-col ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <header className="flex items-center gap-2 mb-3.5">
        {action}
        <h2 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
          {title}
        </h2>
      </header>

      <div className="flex-1">{children}</div>

      {cta && (
        <button
          className="mt-3.5 flex items-center justify-center gap-1.5 text-[11.5px] font-bold"
          style={{ color: T.primary }}
        >
          <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: T.primary }} />
          {cta}
        </button>
      )}
    </section>
  );
}

/* The ask-Aryaz strip that closes most report screens. */
export function AskBand({
  title,
  placeholder,
  chips,
}: {
  title: string;
  placeholder: string;
  chips: string[];
}) {
  return (
    <section className="p-5" style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}>
      <h2 className="text-center text-[14px] font-extrabold" style={{ color: T.primary }}>
        {title}
      </h2>

      <label className="mt-3.5 flex items-center gap-2.5 px-4 py-3 bg-white" style={{ borderRadius: R.md }}>
        <button
          aria-label="ارسال"
          className="w-8 h-8 flex items-center justify-center shrink-0"
          style={{ borderRadius: R.sm, backgroundColor: T.primaryStrong }}
        >
          <Icon name="lucide:send" size={15} className="text-white" />
        </button>
        <input
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
          style={{ color: T.ink }}
        />
      </label>

      <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
        {chips.map((c) => (
          <button
            key={c}
            className="px-3.5 py-2 text-[11px] font-semibold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.pill, color: T.ink }}
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  );
}
