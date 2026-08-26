'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  caseChat,
  caseSummary,
  caseTimeline,
  caseDocs,
  caseOutputs,
  caseSessions,
  TONES,
} from '@/data/counseling/case-detail';

/* ──────────────────────────────────────────────────────────────
   The six panels behind the case tabs. Three of them are tables
   with the same shape (name + meta, a status pill, row actions),
   so Pill and TableShell carry that once.
────────────────────────────────────────────────────────────── */

export function PanelCard({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="bg-white p-4 sm:p-5"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

export function PanelTitle({ title, icon }: { title: string; icon: string }) {
  return (
    <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
      {title}
      <Icon name={icon} size={15} style={{ backgroundColor: T.primary }} />
    </h2>
  );
}

function Pill({ label, tone }: { label: string; tone: string }) {
  const t = TONES[tone] ?? TONES.idle;
  return (
    <span
      className="inline-block px-2.5 py-1 text-[9px] font-bold whitespace-nowrap"
      style={{ borderRadius: R.pill, backgroundColor: t.bg, color: t.fg }}
    >
      {label}
    </span>
  );
}

function TableShell({ columns, children }: { columns: string[]; children: React.ReactNode }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[820px] text-right border-collapse">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                className="px-3 py-2.5 text-[10px] font-bold whitespace-nowrap"
                style={{ color: T.muted, borderBottom: `1px solid ${T.border}` }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const CELL = { borderBottom: `1px solid ${T.border}` };

function RowActions({ name, extra }: { name: string; extra?: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <button aria-label={`گزینه‌های ${name}`}>
        <Icon name="lucide:ellipsis-vertical" size={13} style={{ backgroundColor: T.muted }} />
      </button>
      <button aria-label={`دانلود ${name}`}>
        <Icon name="lucide:download" size={13} style={{ backgroundColor: T.primary }} />
      </button>
      {extra}
    </span>
  );
}

/* ── گفتگو ────────────────────────────────────────────────────── */

export function ChatPanel() {
  const c = caseChat;
  return (
    <PanelCard>
      <PanelTitle title={c.title} icon={c.icon} />

      <ul className="mt-4 space-y-4">
        {c.messages.map((m) => (
          <li key={m.id} className={`flex items-start gap-2.5 ${m.me ? 'flex-row-reverse' : ''}`}>
            {m.me ? (
              <span
                className="w-8 h-8 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.pill, backgroundColor: T.tintPurple }}
              >
                <Icon name="lucide:user-round" size={15} style={{ backgroundColor: T.primary }} />
              </span>
            ) : (
              <img src={m.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
            )}

            <span className="max-w-[78%]">
              <span className="flex items-center gap-2 justify-end">
                <span className="text-[9px]" style={{ color: T.muted }}>
                  {m.time}
                </span>
                <span className="text-[10.5px] font-extrabold" style={{ color: m.me ? T.primary : T.ink }}>
                  {m.author}
                </span>
              </span>
              <span
                className="mt-1.5 block p-3 text-right text-[10.5px] leading-7"
                style={{
                  borderRadius: R.md,
                  backgroundColor: m.me ? '#f3f0fe' : '#f7f7fb',
                  color: T.ink,
                }}
              >
                {m.body}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* The advisor's outstanding ask — the one thing on this tab
          the client is expected to act on. */}
      <div className="mt-4 p-4" style={{ borderRadius: R.md, backgroundColor: '#fff8f1' }}>
        <div className="flex items-center gap-2 justify-end">
          <span className="text-[9px]" style={{ color: T.muted }}>
            {c.request.time}
          </span>
          <span className="text-[11px] font-extrabold" style={{ color: T.accent }}>
            {c.request.title}
          </span>
          <Icon name="lucide:triangle-alert" size={13} style={{ backgroundColor: T.warning }} />
        </div>

        <p className="mt-1.5 text-right text-[10px]" style={{ color: T.muted }}>
          {c.request.note}
        </p>

        <div className="mt-3 p-3.5 bg-white" style={{ borderRadius: R.md }}>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-[11.5px] font-extrabold" style={{ color: T.ink }}>
              {c.request.docTitle}
            </span>
            <Icon name="lucide:file-text" size={14} style={{ backgroundColor: T.primary }} />
          </div>
          <p className="mt-1.5 text-right text-[10px] leading-6" style={{ color: T.ink }}>
            {c.request.docBody}
          </p>
          <button
            className="mt-3 px-4 py-2 text-[10.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
          >
            {c.request.cta}
          </button>
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2.5 px-3 py-2.5" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
        <button
          className="flex items-center gap-1.5 px-4 py-2 text-[10.5px] font-extrabold text-white shrink-0"
          style={{ borderRadius: R.md, backgroundColor: T.primary }}
        >
          <Icon name="lucide:send" size={13} style={{ backgroundColor: '#ffffff' }} />
          {c.send}
        </button>
        <input
          placeholder={c.placeholder}
          className="flex-1 min-w-0 bg-transparent text-right text-[11px] outline-none placeholder:text-[#9396b0]"
          style={{ color: T.ink }}
        />
        <button aria-label="پیوست فایل" className="shrink-0">
          <Icon name="lucide:paperclip" size={15} style={{ backgroundColor: T.muted }} />
        </button>
      </label>
    </PanelCard>
  );
}

/* ── خلاصه پرونده ─────────────────────────────────────────────── */

export function SummaryPanel() {
  const s = caseSummary;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3 items-start">
        {/* Key info declared first → right. */}
        <PanelCard>
          <PanelTitle title={s.key.title} icon={s.key.icon} />
          <ul className="mt-4 space-y-3.5">
            {s.key.rows.map((r) => (
              <li key={r.label} className="flex items-start gap-2.5">
                <span className="flex-1 text-right">
                  <span className="block text-[9px]" style={{ color: T.muted }}>
                    {r.label}
                  </span>
                  <span className="mt-0.5 block text-[10.5px] font-bold leading-6" style={{ color: T.ink }}>
                    {r.value}
                  </span>
                </span>
                <Icon name={r.icon} size={14} className="shrink-0 mt-1" style={{ backgroundColor: T.primary }} />
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard>
          <PanelTitle title={s.brief.title} icon={s.brief.icon} />
          {s.brief.body.map((p) => (
            <p key={p.slice(0, 24)} className="mt-3 text-right text-[10.5px] leading-7" style={{ color: T.ink }}>
              {p}
            </p>
          ))}

          <div className="mt-4 p-3.5" style={{ borderRadius: R.md, backgroundColor: '#f7f7fc' }}>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-[11px] font-extrabold" style={{ color: T.ink }}>
                {s.brief.agreedTitle}
              </span>
              <Icon name="lucide:clipboard-check" size={13} style={{ backgroundColor: T.primary }} />
            </div>
            <ul className="mt-3 space-y-2.5">
              {s.brief.agreed.map((a) => (
                <li key={a} className="flex items-center gap-2.5">
                  <span className="flex-1 text-right text-[10px]" style={{ color: T.ink }}>
                    {a}
                  </span>
                  <Icon name="lucide:circle-check" size={13} className="shrink-0" style={{ backgroundColor: '#1c8a4e' }} />
                </li>
              ))}
            </ul>
          </div>
        </PanelCard>

        <PanelCard>
          <PanelTitle title={s.points.title} icon={s.points.icon} />
          <ul className="mt-4 space-y-3.5">
            {s.points.items.map((i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-1 text-right text-[10.5px] leading-7" style={{ color: T.ink }}>
                  {i}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
                  style={{ backgroundColor: T.primary }}
                />
              </li>
            ))}
          </ul>

          <button
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-[10.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
          >
            <Icon name="lucide:eye" size={12} style={{ backgroundColor: T.primary }} />
            {s.points.cta}
          </button>
        </PanelCard>
      </div>

      <PanelCard>
        <PanelTitle title={s.analysis.title} icon={s.analysis.icon} />
        <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {s.analysis.tiles.map((t) => (
            <li
              key={t.label}
              className="flex items-center gap-3 p-3.5"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <span className="flex-1 text-right">
                <span className="block text-[9px] leading-5" style={{ color: T.muted }}>
                  {t.label}
                </span>
                <span className="mt-0.5 block text-[12px] font-extrabold" style={{ color: t.fg }}>
                  {t.value}
                </span>
              </span>
              <Icon name={t.icon} size={18} className="shrink-0" style={{ backgroundColor: t.fg }} />
            </li>
          ))}
        </ul>

        <button
          className="mt-4 mx-auto flex items-center gap-2 px-6 py-2.5 text-[10.5px] font-bold"
          style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
        >
          {s.analysis.cta}
        </button>
      </PanelCard>
    </div>
  );
}

/* ── Timeline ─────────────────────────────────────────────────── */

export function TimelinePanel() {
  const t = caseTimeline;
  return (
    <PanelCard>
      <PanelTitle title={t.title} icon={t.icon} />

      <ol className="mt-4">
        {t.items.map((i, idx) => {
          const fg =
            i.state === 'done'
              ? '#1c8a4e'
              : i.state === 'current'
                ? T.primary
                : i.state === 'pending'
                  ? T.warning
                  : '#c9c3ea';
          return (
            <li key={i.title} className="grid gap-3 grid-cols-[86px_28px_1fr] items-start">
              {/* Date column first → right. */}
              <span className="text-right pt-2.5">
                {i.date ? (
                  <>
                    <span className="block text-[9.5px] font-bold" style={{ color: T.ink }} dir="ltr">
                      {i.date}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }} dir="ltr">
                      {i.time}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {i.day}
                    </span>
                  </>
                ) : (
                  <span className="block text-[9.5px]" style={{ color: T.muted }}>
                    —
                  </span>
                )}
              </span>

              <span className="flex flex-col items-center pt-3">
                <span
                  className="w-6 h-6 flex items-center justify-center shrink-0"
                  style={{
                    borderRadius: R.pill,
                    backgroundColor: i.state === 'todo' ? '#ffffff' : fg,
                    border: `2px solid ${fg}`,
                  }}
                >
                  <Icon
                    name={i.state === 'done' ? 'lucide:check' : i.icon}
                    size={11}
                    style={{ backgroundColor: i.state === 'todo' ? fg : '#ffffff' }}
                  />
                </span>
                {idx < t.items.length - 1 && (
                  <span className="w-[2px] flex-1 min-h-[26px]" style={{ backgroundColor: '#e6e2f5' }} />
                )}
              </span>

              <div className="pb-4 pt-2 text-right">
                <span className="block text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                  {i.title}
                </span>
                <span className="mt-1 block text-[10px] leading-6" style={{ color: T.muted }}>
                  {i.body}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <button
        className="mt-2 mx-auto flex items-center gap-2 px-6 py-2.5 text-[10.5px] font-bold"
        style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
      >
        <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.primary }} />
        {t.all}
      </button>
    </PanelCard>
  );
}

/* ── مدارک ────────────────────────────────────────────────────── */

export function DocsPanel() {
  const d = caseDocs;
  const [cat, setCat] = useState(d.tabs[0]);
  const rows = d.rows.filter((r) => cat === d.tabs[0] || r.cat === cat);

  return (
    <PanelCard>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          className="flex items-center gap-2 px-4 py-2.5 text-[10.5px] font-extrabold text-white"
          style={{ borderRadius: R.md, backgroundColor: T.primary }}
        >
          <Icon name="lucide:upload" size={13} style={{ backgroundColor: '#ffffff' }} />
          {d.cta}
        </button>
        <PanelTitle title={d.title} icon={d.icon} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        <ul className="flex items-center gap-1.5 flex-wrap">
          {d.tabs.map((t) => {
            const on = t === cat;
            return (
              <li key={t}>
                <button
                  onClick={() => setCat(t)}
                  aria-pressed={on}
                  className="px-3 py-1.5 text-[10px] font-bold"
                  style={{
                    borderRadius: R.pill,
                    backgroundColor: on ? T.primary : '#f5f4fb',
                    color: on ? '#ffffff' : T.ink,
                  }}
                >
                  {t}
                </button>
              </li>
            );
          })}
        </ul>

        <label
          className="flex items-center gap-2 px-3 py-2 min-w-[190px]"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:search" size={13} style={{ backgroundColor: T.muted }} />
          <input
            placeholder={d.search}
            className="flex-1 min-w-0 bg-transparent text-right text-[10.5px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </label>
      </div>

      <TableShell columns={d.columns}>
        {rows.map((r) => (
          <tr key={r.name}>
            <td className="px-3 py-3" style={CELL}>
              <span className="flex items-center gap-2.5">
                <span className="text-right">
                  <span className="block text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {r.name}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }} dir="ltr">
                    {r.size}
                  </span>
                </span>
                <Icon name="lucide:file-text" size={15} className="shrink-0" style={{ backgroundColor: T.danger }} />
              </span>
            </td>
            <td className="px-3 py-3 text-[10px] whitespace-nowrap" style={{ ...CELL, color: T.muted }}>
              {r.cat}
            </td>
            <td className="px-3 py-3 text-[10px]" style={{ ...CELL, color: T.ink }}>
              {r.by}
            </td>
            <td className="px-3 py-3 whitespace-nowrap" style={CELL}>
              <span className="block text-[10px]" style={{ color: T.ink }}>
                {r.date}
              </span>
              <span className="block text-[9px]" style={{ color: T.muted }} dir="ltr">
                {r.time}
              </span>
            </td>
            <td className="px-3 py-3 text-[10px]" style={{ ...CELL, color: T.muted }} dir="ltr">
              {r.v}
            </td>
            <td className="px-3 py-3" style={CELL}>
              <Pill label={r.status} tone={r.tone} />
            </td>
            <td className="px-3 py-3" style={CELL}>
              <RowActions
                name={r.name}
                extra={
                  <button aria-label={`مشاهده ${r.name}`}>
                    <Icon name="lucide:eye" size={13} style={{ backgroundColor: T.muted }} />
                  </button>
                }
              />
            </td>
          </tr>
        ))}
      </TableShell>

      <p className="mt-4 text-[10px]" style={{ color: T.muted }}>
        {d.pager}
      </p>
    </PanelCard>
  );
}

/* ── پاسخ‌ها و خروجی‌ها ───────────────────────────────────────── */

const FILE_FG: Record<string, string> = { PDF: '#d93636', Word: '#2b579a', Excel: '#1c8a4e' };

export function OutputsPanel() {
  const o = caseOutputs;
  return (
    <PanelCard>
      <PanelTitle title={o.title} icon={o.icon} />
      <p className="mt-2 text-right text-[10.5px]" style={{ color: T.muted }}>
        {o.desc}
      </p>
      <p
        className="mt-3 flex items-center justify-end gap-2 p-2.5 text-[9.5px]"
        style={{ borderRadius: R.sm, backgroundColor: '#f6f4fe', color: T.ink }}
      >
        {o.note}
        <Icon name="lucide:circle-alert" size={12} className="shrink-0" style={{ backgroundColor: T.primary }} />
      </p>

      <TableShell columns={o.columns}>
        {o.rows.map((r) => (
          <tr key={r.name}>
            <td className="px-3 py-3 text-right" style={CELL}>
              <span className="block text-[10.5px] font-bold" style={{ color: T.ink }}>
                {r.name}
              </span>
              <span className="block text-[9px] leading-5" style={{ color: T.muted }}>
                {r.desc}
              </span>
            </td>
            <td className="px-3 py-3" style={CELL}>
              <span className="flex items-center gap-1.5 text-[9.5px] font-bold" style={{ color: FILE_FG[r.type] }}>
                {r.type}
                <Icon name="lucide:file-text" size={14} style={{ backgroundColor: FILE_FG[r.type] }} />
              </span>
            </td>
            <td className="px-3 py-3 text-[10px] whitespace-nowrap" style={{ ...CELL, color: T.ink }}>
              {r.by}
            </td>
            <td className="px-3 py-3 whitespace-nowrap" style={CELL}>
              {r.date ? (
                <>
                  <span className="block text-[10px]" style={{ color: T.ink }}>
                    {r.date}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }} dir="ltr">
                    {r.time}
                  </span>
                </>
              ) : (
                <span className="text-[10px]" style={{ color: T.muted }}>
                  —
                </span>
              )}
            </td>
            <td className="px-3 py-3 text-[10px]" style={{ ...CELL, color: T.muted }} dir="ltr">
              {r.v}
            </td>
            <td className="px-3 py-3" style={CELL}>
              <Pill label={r.status} tone={r.tone} />
            </td>
            <td className="px-3 py-3" style={CELL}>
              <RowActions
                name={r.name}
                extra={
                  <button aria-label={`مشاهده ${r.name}`}>
                    <Icon name="lucide:eye" size={13} style={{ backgroundColor: T.muted }} />
                  </button>
                }
              />
            </td>
          </tr>
        ))}
      </TableShell>

      <p
        className="mt-4 flex items-center justify-center gap-2 text-[9.5px]"
        style={{ color: T.muted }}
      >
        {o.footer}
        <Icon name="lucide:lock" size={12} style={{ backgroundColor: T.muted }} />
      </p>
    </PanelCard>
  );
}

/* ── جلسات مرتبط ──────────────────────────────────────────────── */

export function SessionsPanel() {
  const s = caseSessions;
  return (
    <PanelCard>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          className="flex items-center gap-2 px-4 py-2.5 text-[10.5px] font-extrabold text-white"
          style={{ borderRadius: R.md, backgroundColor: T.primary }}
        >
          <Icon name="lucide:calendar-plus" size={13} style={{ backgroundColor: '#ffffff' }} />
          {s.cta}
        </button>
        <div className="text-right">
          <PanelTitle title={s.title} icon={s.icon} />
          <p className="mt-1.5 text-[10px]" style={{ color: T.muted }}>
            {s.desc}
          </p>
        </div>
      </div>

      <TableShell columns={s.columns}>
        {s.rows.map((r) => (
          <tr key={r.name}>
            <td className="px-3 py-3.5 text-right" style={CELL}>
              <span className="flex items-center gap-2 justify-end">
                {r.tag && (
                  <span
                    className="px-2 py-0.5 text-[8.5px] font-bold"
                    style={{ borderRadius: R.pill, backgroundColor: T.tintPurple, color: T.primary }}
                  >
                    {r.tag}
                  </span>
                )}
                <span className="text-[10.5px] font-bold" style={{ color: T.ink }}>
                  {r.name}
                </span>
              </span>
              <span className="mt-0.5 block text-[9px]" style={{ color: T.muted }}>
                {r.desc}
              </span>
            </td>
            <td className="px-3 py-3.5" style={CELL}>
              <span className="flex items-center gap-1.5 text-[10px]" style={{ color: T.ink }}>
                {r.kind}
                <Icon name={r.kindIcon} size={13} style={{ backgroundColor: T.successStrong }} />
              </span>
            </td>
            <td className="px-3 py-3.5" style={CELL}>
              <span className="flex items-center gap-2 justify-end">
                <span className="text-right">
                  <span className="block text-[10px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                    {r.expert}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }}>
                    {r.role}
                  </span>
                </span>
                <img src={r.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
              </span>
            </td>
            <td className="px-3 py-3.5 whitespace-nowrap" style={CELL}>
              {r.date ? (
                <>
                  <span className="block text-[10px]" style={{ color: T.ink }}>
                    {r.date}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }} dir="ltr">
                    {r.time}
                  </span>
                </>
              ) : (
                <span className="text-[10px]" style={{ color: T.muted }}>
                  —
                </span>
              )}
            </td>
            <td className="px-3 py-3.5 text-[10px] whitespace-nowrap" style={{ ...CELL, color: T.muted }}>
              {r.len}
            </td>
            <td className="px-3 py-3.5" style={CELL}>
              <Pill label={r.status} tone={r.tone} />
            </td>
            <td className="px-3 py-3.5" style={CELL}>
              <button
                className="px-3 py-1.5 text-[9.5px] font-bold whitespace-nowrap"
                style={{ borderRadius: R.sm, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                {r.cta}
              </button>
            </td>
          </tr>
        ))}
      </TableShell>

      <p className="mt-4 flex items-center justify-center gap-2 text-[9.5px]" style={{ color: T.muted }}>
        {s.footer}
        <Icon name="lucide:lock" size={12} style={{ backgroundColor: T.muted }} />
      </p>
    </PanelCard>
  );
}
