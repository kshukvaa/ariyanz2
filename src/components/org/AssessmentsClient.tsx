'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Ring from '@/components/org/panel/Ring';
import { T, R, fa, evalStatus } from '@/data/panelTokens';
import {
  assessHead,
  assessStats,
  assessTabs,
  assessFilters,
  assessAlert,
  assessCards,
  assessRowMenu,
  assessFooter,
  type AssessCard,
} from '@/data/orgAssessments';

/* ──────────────────────────────────────────────────────────────
   Assessments index.

   The page is a funnel: what exists, what state it is in, what
   needs attention today, then the work itself. The amber strip is
   the only warm thing above the fold on purpose — it is the one
   row carrying a deadline a manager can still act on.
────────────────────────────────────────────────────────────── */

export default function AssessmentsClient() {
  const [tab, setTab] = useState('all');
  const [menu, setMenu] = useState<string | null>(null);

  return (
    <div className="space-y-5" onClick={() => menu && setMenu(null)}>
      {/* ── Title row ─────────────────────────────────────────── */}
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <div className="flex items-center gap-2.5">
          <Link
            href={assessHead.packages.href}
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:package-open" size={17} style={{ backgroundColor: T.primary }} />
            {assessHead.packages.label}
          </Link>

          <Link
            href={assessHead.create.href}
            data-ripple
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:plus" size={16} className="text-white" />
            {assessHead.create.label}
          </Link>
        </div>

        <div className="text-right">
          <h1 className="text-[26px] font-extrabold" style={{ color: T.ink }}>
            {assessHead.title}
          </h1>
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {assessHead.desc}
          </p>
        </div>
      </div>

      {/* ── Stat rail ─────────────────────────────────────────── */}
      <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
        {assessStats.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <div className="flex items-start gap-3">
              <span
                className="w-12 h-12 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.md, backgroundColor: s.bg }}
              >
                <Icon name={s.icon} size={22} style={{ backgroundColor: s.fg }} />
              </span>
              <span className="flex-1 text-right min-w-0">
                <span className="block text-[24px] font-extrabold leading-tight" style={{ color: T.ink }}>
                  {s.value}
                </span>
                <span className="block text-[12px]" style={{ color: T.muted }}>
                  {s.label}
                </span>
              </span>
            </div>

            <Link
              href={s.href}
              className="mt-3 flex items-center justify-end gap-1.5 text-[11.5px] font-bold transition-opacity hover:opacity-70"
              style={{ color: s.dot ? T.accent : T.primary }}
            >
              {s.link}
              {s.dot && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: T.accent }}
                />
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div
        className="bg-white px-2 overflow-x-auto"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-1 min-w-max">
          {assessTabs.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-pressed={on}
                className="relative flex items-center gap-2 px-5 py-4 text-[13px] transition-colors"
                style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
              >
                {t.label}
                <span
                  className="px-1.5 py-0.5 text-[10.5px] font-bold"
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
            placeholder="جستجو در ارزیابی‌ها..."
            className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </label>

        {assessFilters.map((f) => (
          <button
            key={f.id}
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] font-semibold transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name={f.icon} size={15} style={{ backgroundColor: T.muted }} />
            {f.label}
          </button>
        ))}

        <button
          className="flex items-center gap-2 px-3.5 py-2.5 text-[12.5px] font-bold transition-opacity hover:opacity-70"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
        >
          <Icon name="lucide:funnel" size={15} style={{ backgroundColor: T.primary }} />
          پاک کردن فیلترها
        </button>
      </div>

      {/* ── Attention strip ───────────────────────────────────── */}
      <div
        className="flex items-center gap-3.5 p-3.5 flex-wrap"
        style={{
          borderRadius: R.lg,
          backgroundColor: T.tintOrange,
          border: `1px solid #f8ddc0`,
        }}
      >
        <span
          className="w-10 h-10 flex items-center justify-center shrink-0 bg-white"
          style={{ borderRadius: R.md }}
        >
          <Icon name="lucide:bell" size={18} style={{ backgroundColor: T.accent }} />
        </span>
        <p className="flex-1 text-right text-[12.5px] font-semibold min-w-[240px]" style={{ color: T.ink }}>
          {assessAlert.text}
        </p>
        <button
          className="flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-bold bg-white transition-colors hover:bg-orange-50"
          style={{ borderRadius: R.md, border: `1px solid #f6cda2`, color: T.accent }}
        >
          <Icon name="lucide:send" size={15} style={{ backgroundColor: T.accent }} />
          {assessAlert.action}
        </button>
      </div>

      {/* ── Cards ─────────────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {assessCards.map((c) => (
          <Card
            key={c.id}
            card={c}
            open={menu === c.id}
            onMenu={(e) => {
              e.stopPropagation();
              setMenu(menu === c.id ? null : c.id);
            }}
          />
        ))}
      </div>

      {/* ── Pager ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
        <span className="text-[12px]" style={{ color: T.muted }}>
          {assessFooter.showing}
        </span>

        <div className="flex items-center gap-1.5">
          <PagerBtn icon="lucide:chevron-right" label="قبلی" />
          {assessFooter.pages.map((p, i) => (
            <button
              key={p}
              aria-current={i === 0 ? 'page' : undefined}
              className="w-9 h-9 text-[12.5px] font-bold transition-colors"
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

        <button
          className="flex items-center gap-2 px-3.5 py-2.5 text-[12px] font-semibold bg-white"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
          {assessFooter.perPage}
        </button>
      </div>
    </div>
  );
}

/* ── Pieces ───────────────────────────────────────────────────── */

function PagerBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center bg-white transition-colors hover:bg-gray-50"
      style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
    >
      <Icon name={icon} size={15} style={{ backgroundColor: T.muted }} />
    </button>
  );
}

function Card({
  card,
  open,
  onMenu,
}: {
  card: AssessCard;
  open: boolean;
  onMenu: (e: React.MouseEvent) => void;
}) {
  const st = evalStatus[card.status];
  const p = card.progress;
  const total = p ? p.done + p.doing + p.idle : 0;

  return (
    <article
      className="bg-white p-5 flex flex-col relative"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold shrink-0"
          style={{ borderRadius: R.pill, backgroundColor: st.bg, color: st.fg }}
        >
          {st.dot && (
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: st.dot }}
            />
          )}
          {st.label}
        </span>

        <div className="flex-1 text-right min-w-0">
          <h2 className="text-[15px] font-extrabold truncate" style={{ color: T.ink }}>
            {card.title}
          </h2>
          <p className="mt-1 text-[11.5px] leading-5" style={{ color: T.muted }}>
            {card.desc}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {card.face.kind === 'ring' ? (
          <Ring pct={card.face.pct} colour={card.face.colour} />
        ) : (
          <span
            className="w-[62px] h-[62px] flex items-center justify-center shrink-0"
            style={{ borderRadius: R.md, backgroundColor: card.face.bg }}
          >
            <Icon name={card.face.icon} size={26} style={{ backgroundColor: card.face.fg }} />
          </span>
        )}

        <dl className="flex-1 space-y-1.5 text-right min-w-0">
          <Meta icon="lucide:calendar" label={card.dateLabel} value={card.date} />
          <div className="flex items-center justify-end gap-4">
            <Meta icon="lucide:clipboard-check" label="" value={card.tests} />
            <Meta icon="lucide:users-round" label="" value={card.people} />
          </div>
        </dl>
      </div>

      {p && (
        <div className="mt-4">
          {/* One bar, three segments — the split is the point, so the
              legend names each colour instead of relying on a tooltip. */}
          <div
            className="flex h-2 overflow-hidden"
            style={{ borderRadius: R.pill, backgroundColor: T.border }}
          >
            <span style={{ width: `${(p.done / total) * 100}%`, backgroundColor: T.success }} />
            <span style={{ width: `${(p.doing / total) * 100}%`, backgroundColor: T.primary }} />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px]">
            <Legend colour={T.border} text={`${fa(p.idle)} شروع نکرده`} />
            <Legend colour={T.primary} text={`${fa(p.doing)} در حال انجام`} />
            <Legend colour={T.success} text={`${fa(p.done)} تکمیل`} />
          </div>
        </div>
      )}

      <div
        className="mt-4 pt-3.5 flex items-center justify-between"
        style={{ borderTop: `1px solid ${T.border}` }}
      >
        <button
          aria-label="عملیات بیشتر"
          aria-expanded={open}
          onClick={onMenu}
          className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.sm }}
        >
          <Icon name="lucide:ellipsis" size={17} style={{ backgroundColor: T.muted }} />
        </button>

        <Link
          href={card.cta.href}
          className="flex items-center gap-1.5 text-[12.5px] font-bold transition-opacity hover:opacity-70"
          style={{ color: T.primary }}
        >
          {card.cta.label}
          <Icon name="lucide:chevron-left" size={15} style={{ backgroundColor: T.primary }} />
        </Link>
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-14 left-4 z-20 w-[190px] bg-white py-1.5 shadow-xl"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          {assessRowMenu.map((m) => (
            <button
              key={m.id}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] font-semibold transition-colors hover:bg-gray-50"
              style={{
                color: m.danger ? T.danger : T.ink,
                borderTop: m.danger ? `1px solid ${T.border}` : undefined,
                marginTop: m.danger ? 4 : undefined,
              }}
            >
              <span className="flex-1 text-right">{m.label}</span>
              <Icon
                name={m.icon}
                size={15}
                style={{ backgroundColor: m.danger ? T.danger : T.muted }}
              />
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

function Meta({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-end gap-1.5 text-[11.5px]" style={{ color: T.ink }}>
      <span className="font-bold">{value}</span>
      {label && <span style={{ color: T.muted }}>{label}</span>}
      <Icon name={icon} size={14} style={{ backgroundColor: T.muted }} />
    </div>
  );
}

function Legend({ colour, text }: { colour: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5" style={{ color: T.muted }}>
      {text}
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colour }} />
    </span>
  );
}
