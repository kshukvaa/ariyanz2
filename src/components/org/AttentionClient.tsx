'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { Donut, DonutLegend, BarList } from '@/components/org/panel/Charts';
import {
  ReportHead,
  FilterStrip,
  KpiRow,
  AiBand,
  Panel,
  AskBand,
} from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import {
  attentionHead,
  attentionKpis,
  attentionAi,
  attentionFilters,
  attentionTabs,
  attentionTable,
  attentionStatus,
  attentionPriority,
  attentionGaps,
  attentionSpread,
  attentionOpportunities,
  attentionHistory,
  attentionAsk,
} from '@/data/orgAttention';

/* ──────────────────────────────────────────────────────────────
   Employees needing attention.

   A worklist, not a report. Each row ends in a severity and an
   action state because the only question it exists to answer is
   who to deal with next, and whether anyone has started.
────────────────────────────────────────────────────────────── */

export default function AttentionClient() {
  const [tab, setTab] = useState('all');

  return (
    <div className="space-y-5">
      <ReportHead
        crumbs={attentionHead.crumbs}
        title={attentionHead.title}
        desc={attentionHead.desc}
        icon="lucide:users-round"
        actions={
          <>
            <button
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:download" size={16} style={{ backgroundColor: T.muted }} />
              {attentionHead.download}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1.5px solid ${T.primary}`, color: T.primary }}
            >
              <Icon name="lucide:users-round" size={16} style={{ backgroundColor: T.primary }} />
              {attentionHead.group}
            </button>
          </>
        }
      />

      <KpiRow kpis={attentionKpis} cols={5} />

      <AiBand
        title={attentionAi.title}
        body={attentionAi.body}
        chips={attentionAi.chips}
        cta={attentionAi.cta}
      />

      {/* ── Search + filters ──────────────────────────────────── */}
      <div
        className="bg-white p-3 flex items-center gap-2.5 flex-wrap"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <label
          className="flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[200px] self-end"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:search" size={16} style={{ backgroundColor: T.muted }} />
          <input
            type="search"
            placeholder={attentionTable.search}
            className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </label>
      </div>

      <FilterStrip filters={attentionFilters} reset="فیلترها" />

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div
        className="bg-white px-2 overflow-x-auto"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-1 min-w-max">
          {attentionTabs.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={on}
                className="relative flex items-center gap-2 px-5 py-4 text-[12.5px] whitespace-nowrap transition-colors"
                style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
              >
                {t.label}
                <span
                  className="px-1.5 py-0.5 text-[10px] font-bold"
                  style={{
                    borderRadius: R.sm,
                    backgroundColor: on ? T.tintPurple : T.border,
                    color: on ? T.primary : T.muted,
                  }}
                >
                  {t.count}
                </span>
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

      {/* ── Worklist ──────────────────────────────────────────── */}
      <section
        className="bg-white"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] text-right border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#fafafc' }}>
                <Th>{attentionTable.cols.ops}</Th>
                <Th>{attentionTable.cols.state}</Th>
                <Th>{attentionTable.cols.severity}</Th>
                <Th>{attentionTable.cols.reason}</Th>
                <Th>{attentionTable.cols.change}</Th>
                <Th>{attentionTable.cols.score}</Th>
                <Th>{attentionTable.cols.unit}</Th>
                <Th>{attentionTable.cols.role}</Th>
                <Th className="w-full">{attentionTable.cols.person}</Th>
              </tr>
            </thead>
            <tbody>
              {attentionTable.rows.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${T.border}` }}>
                  <Td>
                    <span className="flex items-center gap-1.5">
                      <button
                        aria-label="عملیات"
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ borderRadius: R.sm }}
                      >
                        <Icon name="lucide:ellipsis" size={15} style={{ backgroundColor: T.muted }} />
                      </button>
                      <button
                        className="px-3 py-1.5 text-[11px] font-bold"
                        style={{ borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.primary }}
                      >
                        {attentionTable.view}
                      </button>
                    </span>
                  </Td>
                  <Td>
                    <Chip label={r.state} fg={r.stFg} bg={r.stBg} />
                  </Td>
                  <Td>
                    <Chip label={r.severity} fg={r.sevFg} bg={r.sevBg} />
                  </Td>
                  <Td>
                    <span className="text-[11.5px] whitespace-nowrap" style={{ color: T.ink }}>
                      {r.reason}
                    </span>
                  </Td>
                  <Td>
                    <span
                      className="flex items-center justify-end gap-1 text-[11.5px] font-bold"
                      style={{ color: T.danger }}
                    >
                      {r.change}
                      <Icon name="lucide:trending-down" size={12} style={{ backgroundColor: T.danger }} />
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                      {r.score}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] whitespace-nowrap" style={{ color: T.muted }}>
                      {r.unit}
                    </span>
                  </Td>
                  <Td>
                    <span className="text-[11.5px] whitespace-nowrap" style={{ color: T.ink }}>
                      {r.role}
                    </span>
                  </Td>
                  <Td>
                    <span className="flex items-center justify-end gap-2.5">
                      <span className="text-[12px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                        {r.person}
                      </span>
                      <img
                        src={`/images/aryaz/avatars/${r.avatar}.png`}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="p-3 flex items-center justify-between gap-3 flex-wrap"
          style={{ borderTop: `1px solid ${T.border}` }}
        >
          <span className="text-[11.5px]" style={{ color: T.muted }}>
            {attentionTable.showing}
          </span>

          <div className="flex items-center gap-1.5">
            <PagerBtn icon="lucide:chevron-right" label="قبلی" />
            {attentionTable.pages.map((p, i) => (
              <button
                key={p}
                aria-current={i === 0 ? 'page' : undefined}
                className="w-8 h-8 text-[12px] font-bold"
                style={
                  i === 0
                    ? { borderRadius: R.sm, backgroundColor: T.primaryStrong, color: '#fff' }
                    : { borderRadius: R.sm, border: `1px solid ${T.border}`, color: T.ink }
                }
              >
                {p}
              </button>
            ))}
            <PagerBtn icon="lucide:chevron-left" label="بعدی" />
          </div>

          <span
            className="flex items-center gap-2 px-3 py-2 text-[11.5px]"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
            {attentionTable.perPage}
          </span>
        </div>
      </section>

      {/* ── Four panels ───────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Panel title={attentionStatus.title}>
          <div className="flex items-center gap-3">
            <Donut slices={attentionStatus.slices} size={104} thickness={20} />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={attentionStatus.slices} />
            </div>
          </div>
        </Panel>

        <Panel title={attentionPriority.title}>
          <div className="flex gap-2">
            <span
              className="text-[9px] shrink-0 flex items-center"
              style={{ color: T.muted, writingMode: 'vertical-rl' }}
            >
              {attentionPriority.yAxis}
            </span>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-2">
                {attentionPriority.cells.map((c) => (
                  <span
                    key={c.label}
                    className="p-3 text-center"
                    style={{ borderRadius: R.md, backgroundColor: c.bg }}
                  >
                    <span className="block text-[11px] font-extrabold" style={{ color: c.fg }}>
                      {c.label}
                    </span>
                    <span className="block mt-1 text-[13px] font-extrabold" style={{ color: T.ink }}>
                      {c.value}
                    </span>
                  </span>
                ))}
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[9px]" style={{ color: T.muted }}>
                <span>زیاد</span>
                <span>{attentionPriority.xAxis}</span>
                <span>کم</span>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title={attentionGaps.title}>
          <BarList rows={attentionGaps.rows} />
        </Panel>

        <Panel title={attentionSpread.title}>
          <ul className="space-y-2.5">
            {attentionSpread.rows.map((r) => (
              <li key={r.unit} className="flex items-center gap-2.5">
                <span className="w-8 text-[10px] shrink-0" style={{ color: T.muted }}>
                  {r.pct}
                </span>
                <span className="w-6 text-[11px] font-bold shrink-0" style={{ color: T.ink }}>
                  {r.count}
                </span>
                <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${r.value}%`, backgroundColor: T.primary }}
                  />
                </span>
                <span className="w-20 text-right text-[10.5px] shrink-0 truncate" style={{ color: T.ink }}>
                  {r.unit}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* ── Opportunities + history ───────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1fr_360px]">
        <Panel title={attentionOpportunities.title}>
          <div className="grid gap-3 sm:grid-cols-3">
            {attentionOpportunities.cards.map((c) => (
              <div
                key={c.id}
                className="p-4 text-center"
                style={{ borderRadius: R.md, backgroundColor: c.bg }}
              >
                <Icon name={c.icon} size={22} style={{ backgroundColor: c.fg, margin: '0 auto' }} />
                <span className="block mt-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {c.label}
                </span>
                <span className="block text-[10px]" style={{ color: c.fg }}>
                  {c.sub}
                </span>
                <span className="block mt-1.5 text-[10px]" style={{ color: T.muted }}>
                  {c.note}
                </span>
                <button
                  className="mt-2.5 w-full py-2 text-[11px] font-bold bg-white"
                  style={{ borderRadius: R.sm, color: c.fg }}
                >
                  {c.action}
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={attentionHistory.title} cta={attentionHistory.cta}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {attentionHistory.cols.state}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {attentionHistory.cols.date}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {attentionHistory.cols.action}
                </th>
                <th className="pb-2 text-[9.5px] font-bold" style={{ color: T.muted }}>
                  {attentionHistory.cols.person}
                </th>
              </tr>
            </thead>
            <tbody>
              {attentionHistory.rows.map((r) => (
                <tr key={r.person} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td className="py-2.5">
                    <Chip label={r.state} fg={r.fg} bg={r.bg} />
                  </td>
                  <td className="py-2.5 text-[9.5px] whitespace-nowrap" style={{ color: T.muted }}>
                    {r.date}
                  </td>
                  <td className="py-2.5 text-[10.5px]" style={{ color: T.ink }}>
                    {r.action}
                  </td>
                  <td className="py-2.5 text-[10.5px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                    {r.person}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <AskBand
        title={attentionAsk.title}
        placeholder={attentionAsk.placeholder}
        chips={attentionAsk.chips}
      />
    </div>
  );
}

/* ── Atoms ────────────────────────────────────────────────────── */

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

function Chip({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  return (
    <span
      className="inline-block px-2.5 py-1 text-[10.5px] font-bold whitespace-nowrap"
      style={{ borderRadius: R.pill, backgroundColor: bg, color: fg }}
    >
      {label}
    </span>
  );
}

function PagerBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center bg-white transition-colors hover:bg-gray-50"
      style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
    >
      <Icon name={icon} size={14} style={{ backgroundColor: T.muted }} />
    </button>
  );
}
