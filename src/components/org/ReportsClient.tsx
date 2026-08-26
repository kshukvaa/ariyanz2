'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  reportsHead,
  reportsFilters,
  reportsTabs,
  reportsSuggested,
  reportsSuggestedHead,
  reportsRecent,
  reportsScheduled,
  reportsBuilding,
  reportsPopular,
  reportsShared,
  reportsQuick,
  reportsAsk,
} from '@/data/orgReports';

/* ──────────────────────────────────────────────────────────────
   Reports centre.

   Ordered by how far a request is from being answered: shapes you
   could start from, reports already made, reports that arrive on
   their own, and finally the raw extracts for anyone who would
   rather skip the report and take the rows.
────────────────────────────────────────────────────────────── */

export default function ReportsClient() {
  const [tab, setTab] = useState('همه');
  const [menu, setMenu] = useState<string | null>(null);

  return (
    <div className="space-y-5" onClick={() => menu && setMenu(null)}>
      {/* ── Title ─────────────────────────────────────────────── */}
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <div className="flex items-center gap-2.5">
          <Link
            href={reportsHead.schedule.href}
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:calendar-check" size={16} style={{ backgroundColor: T.muted }} />
            {reportsHead.schedule.label}
          </Link>

          <Link
            href={reportsHead.build.href}
            data-ripple
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:plus" size={16} className="text-white" />
            {reportsHead.build.label}
          </Link>
        </div>

        <div className="text-right">
          <nav className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.muted }}>
            {reportsHead.crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <Icon name="lucide:chevron-left" size={12} style={{ backgroundColor: T.muted }} />}
                {c.href && i === 0 ? (
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
            <h1 className="text-[25px] font-extrabold" style={{ color: T.ink }}>
              {reportsHead.title}
            </h1>
            <Icon name="lucide:file-text" size={23} style={{ backgroundColor: T.primary }} />
          </div>
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {reportsHead.desc}
          </p>
        </div>
      </div>

      {/* ── Filters ───────────────────────────────────────────── */}
      <div
        className="bg-white p-3 flex items-center gap-2.5 flex-wrap"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <label
          className="flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[220px]"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:search" size={16} style={{ backgroundColor: T.muted }} />
          <input
            type="search"
            placeholder={reportsHead.search}
            className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </label>

        {reportsFilters.map((f) => (
          <span key={f.id} className="min-w-[150px]">
            <span className="block text-[10px] text-right" style={{ color: T.muted }}>
              {f.label}
            </span>
            <span
              className="flex items-center gap-2 px-3.5 py-2 mt-1"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
              <span className="flex-1 text-right text-[12px] font-semibold" style={{ color: T.ink }}>
                {f.value}
              </span>
            </span>
          </span>
        ))}
      </div>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div
        className="bg-white px-2 overflow-x-auto"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-1 min-w-max">
          {reportsTabs.map((t) => {
            const on = t === tab;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                aria-pressed={on}
                className="relative px-5 py-4 text-[12.5px] whitespace-nowrap transition-colors"
                style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
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

      {/* ── Suggested ─────────────────────────────────────────── */}
      <section>
        <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold mb-3" style={{ color: T.primary }}>
          {reportsSuggestedHead.title}
          <Icon name="lucide:sparkles" size={18} style={{ backgroundColor: T.primary }} />
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {reportsSuggested.map((s) => (
            <article
              key={s.id}
              className="bg-white p-4 flex flex-col"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <header className="flex items-center gap-3">
                <h3 className="flex-1 text-right text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                  {s.title}
                </h3>
                <span
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.md, backgroundColor: s.bg }}
                >
                  <Icon name={s.icon} size={20} style={{ backgroundColor: s.fg }} />
                </span>
              </header>

              <ul className="mt-3.5 space-y-2 flex-1">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center justify-end gap-2 text-[11.5px]" style={{ color: T.muted }}>
                    {i}
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.fg }} />
                  </li>
                ))}
              </ul>

              <Link
                href={s.href}
                data-ripple
                className="mt-4 flex items-center justify-center gap-2 py-2.5 text-[12px] font-bold transition-opacity hover:opacity-90"
                style={
                  s.filled
                    ? { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                    : { borderRadius: R.md, border: `1.5px solid ${s.fg}`, color: s.fg }
                }
              >
                {reportsSuggestedHead.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── Recent ────────────────────────────────────────────── */}
      <Section title={reportsRecent.title} cta={reportsRecent.cta}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-right border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#fafafc' }}>
                <Th>{reportsRecent.cols.ops}</Th>
                <Th>{reportsRecent.cols.state}</Th>
                <Th>{reportsRecent.cols.format}</Th>
                <Th>{reportsRecent.cols.date}</Th>
                <Th>{reportsRecent.cols.author}</Th>
                <Th>{reportsRecent.cols.period}</Th>
                <Th>{reportsRecent.cols.scope}</Th>
                <Th className="w-full">{reportsRecent.cols.name}</Th>
              </tr>
            </thead>
            <tbody>
              {reportsRecent.rows.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${T.border}` }}>
                  <Td>
                    <span className="flex items-center gap-1.5 relative">
                      <button
                        aria-label="عملیات"
                        aria-expanded={menu === r.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenu(menu === r.id ? null : r.id);
                        }}
                        className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-gray-50"
                        style={{ borderRadius: R.sm }}
                      >
                        <Icon name="lucide:ellipsis" size={16} style={{ backgroundColor: T.muted }} />
                      </button>

                      <button
                        aria-label="دانلود"
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                      >
                        <Icon name="lucide:download" size={15} style={{ backgroundColor: T.primary }} />
                      </button>

                      {menu === r.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-9 left-0 z-30 w-[178px] bg-white py-1.5 shadow-xl"
                          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                        >
                          {reportsRecent.menu.map((m) => (
                            <button
                              key={m.id}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] font-semibold transition-colors hover:bg-gray-50"
                              style={{
                                color: m.danger ? T.danger : T.ink,
                                borderTop: m.danger ? `1px solid ${T.border}` : undefined,
                                marginTop: m.danger ? 4 : undefined,
                              }}
                            >
                              <span className="flex-1 text-right">{m.label}</span>
                              <Icon
                                name={m.icon}
                                size={14}
                                style={{ backgroundColor: m.danger ? T.danger : T.muted }}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </span>
                  </Td>
                  <Td>
                    <Chip label={reportsRecent.ready} fg={T.successStrong} bg={T.tintGreen} />
                  </Td>
                  <Td>
                    <Chip label={r.format} fg={r.formatFg} bg={r.formatBg} icon="lucide:file-text" />
                  </Td>
                  <Td>
                    <span className="text-[11.5px] whitespace-nowrap" style={{ color: T.muted }}>
                      {r.date}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] whitespace-nowrap" style={{ color: T.ink }}>
                      {r.author}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] whitespace-nowrap" style={{ color: T.ink }}>
                      {r.period}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] whitespace-nowrap" style={{ color: T.ink }}>
                      {r.scope}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[12.5px] font-bold" style={{ color: T.ink }}>
                      {r.name}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Scheduled ─────────────────────────────────────────── */}
      <Section title={reportsScheduled.title} cta={reportsScheduled.cta}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-right border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#fafafc' }}>
                <Th>{reportsScheduled.cols.ops}</Th>
                <Th>{reportsScheduled.cols.state}</Th>
                <Th>{reportsScheduled.cols.format}</Th>
                <Th>{reportsScheduled.cols.to}</Th>
                <Th>{reportsScheduled.cols.when}</Th>
                <Th>{reportsScheduled.cols.cadence}</Th>
                <Th className="w-full">{reportsScheduled.cols.name}</Th>
              </tr>
            </thead>
            <tbody>
              {reportsScheduled.rows.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${T.border}` }}>
                  <Td>
                    <span className="flex items-center gap-1">
                      <IconBtn icon="lucide:ellipsis" label="عملیات" />
                      <IconBtn icon="lucide:pause" label="توقف" />
                      <IconBtn icon="lucide:pencil" label="ویرایش" />
                    </span>
                  </Td>
                  <Td>
                    <Chip label={reportsScheduled.active} fg={T.successStrong} bg={T.tintGreen} dot />
                  </Td>
                  <Td>
                    <Chip label={r.format} fg={r.formatFg} bg={r.formatBg} icon="lucide:file-text" />
                  </Td>
                  <Td>
                    <span className="text-[11.5px]" style={{ color: T.ink }}>
                      {r.to}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] whitespace-nowrap" style={{ color: T.muted }}>
                      {r.when}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[11.5px]" style={{ color: T.ink }}>
                      {r.cadence}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[12.5px] font-bold" style={{ color: T.ink }}>
                      {r.name}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Three panels ──────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Panel title={reportsBuilding.title} cta={reportsBuilding.cta}>
          <ul className="space-y-3.5">
            {reportsBuilding.rows.map((r) => (
              <li key={r.label}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11.5px] font-bold" style={{ color: r.colour }}>
                    {r.pct}%
                  </span>
                  <span className="flex-1 text-right text-[11.5px] font-semibold truncate" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                </div>
                <span
                  className="mt-1.5 block h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: T.border }}
                >
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${r.pct}%`, backgroundColor: r.colour }}
                  />
                </span>
                <p className="mt-1 text-right text-[10px]" style={{ color: T.muted }}>
                  {r.note}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={reportsPopular.title} cta={reportsPopular.cta}>
          <ul className="space-y-2.5">
            {reportsPopular.rows.map((r, i) => (
              <li
                key={r.label}
                className="flex items-center gap-2.5 pb-2.5"
                style={{ borderBottom: i === reportsPopular.rows.length - 1 ? undefined : `1px solid ${T.border}` }}
              >
                <span className="text-[12px] font-extrabold shrink-0" style={{ color: T.primary }}>
                  {r.count}
                </span>
                <span className="flex-1 text-right text-[11.5px] truncate" style={{ color: T.ink }}>
                  {r.label}
                </span>
                <Icon name="lucide:download" size={14} style={{ backgroundColor: T.muted }} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-right text-[10px]" style={{ color: T.muted }}>
            {reportsPopular.countLabel}
          </p>
        </Panel>

        <Panel title={reportsShared.title} cta={reportsShared.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th className="pb-2 text-[10px] font-bold" style={{ color: T.muted }}>
                  {reportsShared.cols.until}
                </th>
                <th className="pb-2 text-[10px] font-bold" style={{ color: T.muted }}>
                  {reportsShared.cols.access}
                </th>
                <th className="pb-2 text-[10px] font-bold" style={{ color: T.muted }}>
                  {reportsShared.cols.to}
                </th>
                <th className="pb-2 text-[10px] font-bold" style={{ color: T.muted }}>
                  {reportsShared.cols.report}
                </th>
              </tr>
            </thead>
            <tbody>
              {reportsShared.rows.map((r) => (
                <tr key={r.report} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5 text-[10.5px] whitespace-nowrap" style={{ color: T.muted }}>
                    {r.until}
                  </td>
                  <td className="py-2.5">
                    <Chip label={r.access} fg={r.fg} bg={r.bg} />
                  </td>
                  <td className="py-2.5 text-[11px]" style={{ color: T.ink }}>
                    {r.to}
                  </td>
                  <td className="py-2.5 text-[11px] font-bold" style={{ color: T.ink }}>
                    {r.report}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      {/* ── Quick extracts ────────────────────────────────────── */}
      <section>
        <h2 className="text-right text-[14px] font-extrabold mb-3" style={{ color: T.ink }}>
          {reportsQuick.title}
        </h2>

        <div className="grid gap-3.5 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {reportsQuick.cards.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 text-center flex flex-col items-center"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <span
                className="w-11 h-11 flex items-center justify-center"
                style={{ borderRadius: R.md, backgroundColor: c.bg }}
              >
                <Icon name={c.icon} size={20} style={{ backgroundColor: c.fg }} />
              </span>

              <h3 className="mt-2.5 text-[12px] font-extrabold" style={{ color: T.ink }}>
                {c.label}
              </h3>
              <p className="mt-0.5 text-[10px] flex-1" style={{ color: T.muted }}>
                {c.sub}
              </p>

              <button
                className="mt-3 w-full py-2 text-[11px] font-bold"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.successStrong }}
              >
                {reportsQuick.format}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ask ───────────────────────────────────────────────── */}
      <section className="p-5" style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}>
        <h2 className="text-center text-[14px] font-extrabold" style={{ color: T.primary }}>
          {reportsAsk.title}
        </h2>

        <label
          className="mt-3.5 flex items-center gap-2.5 px-4 py-3 bg-white"
          style={{ borderRadius: R.md }}
        >
          <button
            aria-label="ارسال"
            className="w-8 h-8 flex items-center justify-center shrink-0"
            style={{ borderRadius: R.sm, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:send" size={15} className="text-white" />
          </button>
          <input
            placeholder={reportsAsk.placeholder}
            className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </label>

        <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
          {reportsAsk.chips.map((c) => (
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
    </div>
  );
}

/* ── Pieces ───────────────────────────────────────────────────── */

function Section({
  title,
  cta,
  children,
}: {
  title: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="bg-white"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <h2 className="p-4 text-right text-[14px] font-extrabold" style={{ color: T.ink }}>
        {title}
      </h2>

      {children}

      <div className="p-3 text-center" style={{ borderTop: `1px solid ${T.border}` }}>
        <button className="inline-flex items-center gap-1.5 text-[12px] font-bold" style={{ color: T.primary }}>
          <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: T.primary }} />
          {cta}
        </button>
      </div>
    </section>
  );
}

function Panel({
  title,
  cta,
  children,
}: {
  title: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="bg-white p-4 flex flex-col"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <h2 className="text-right text-[13px] font-extrabold mb-3.5" style={{ color: T.ink }}>
        {title}
      </h2>

      <div className="flex-1">{children}</div>

      <button
        className="mt-3.5 flex items-center justify-center gap-1.5 text-[11.5px] font-bold"
        style={{ color: T.primary }}
      >
        <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: T.primary }} />
        {cta}
      </button>
    </section>
  );
}

function Th({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-4 py-3 text-[11px] font-bold whitespace-nowrap ${className}`}
      style={{ color: T.muted }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3.5 align-middle">{children}</td>;
}

function Chip({
  label,
  fg,
  bg,
  icon,
  dot,
}: {
  label: string;
  fg: string;
  bg: string;
  icon?: string;
  dot?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] font-bold whitespace-nowrap"
      style={{ borderRadius: R.pill, backgroundColor: bg, color: fg }}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: fg }} />}
      {label}
      {icon && <Icon name={icon} size={12} style={{ backgroundColor: fg }} />}
    </span>
  );
}

function IconBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-gray-50"
      style={{ borderRadius: R.sm }}
    >
      <Icon name={icon} size={15} style={{ backgroundColor: T.muted }} />
    </button>
  );
}
