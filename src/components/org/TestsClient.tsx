'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Donut, DonutLegend } from '@/components/org/panel/Charts';
import { T, R } from '@/data/panelTokens';
import {
  testsHead,
  testsStats,
  testCategories,
  testPills,
  testFilters,
  testCards,
  testCardLabels,
  testsUsage,
  testsTop,
  testsPackages,
  testsAi,
  testsFooter,
  testDetail,
  type TestCard,
} from '@/data/orgTests';

/* ──────────────────────────────────────────────────────────────
   Organisational test catalogue.

   Every card carries this organisation's own usage under the
   spec line — how many assessments have used the test and how
   many people have sat it — because that, not the spec, is what
   decides whether it goes into the next assessment.
────────────────────────────────────────────────────────────── */

export default function TestsClient() {
  const [cat, setCat] = useState('همه');
  const [pill, setPill] = useState('همه');
  const [drawer, setDrawer] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {/* ── Title row ─────────────────────────────────────────── */}
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <div className="flex items-center gap-2.5">
          <Link
            href={testsHead.saved.href}
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:star" size={16} style={{ backgroundColor: T.muted }} />
            {testsHead.saved.label}
          </Link>

          <Link
            href={testsHead.create.href}
            data-ripple
            className="flex items-center gap-2 px-5 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:plus" size={16} className="text-white" />
            {testsHead.create.label}
          </Link>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2.5">
            <h1 className="text-[26px] font-extrabold" style={{ color: T.ink }}>
              {testsHead.title}
            </h1>
            <Icon name="lucide:clipboard-list" size={24} style={{ backgroundColor: T.primary }} />
          </div>
          <p className="mt-1 text-[12.5px] max-w-[640px]" style={{ color: T.muted }}>
            {testsHead.desc}
          </p>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {testsStats.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 flex items-center gap-3.5"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <span
              className="w-12 h-12 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.md, backgroundColor: s.bg }}
            >
              <Icon name={s.icon} size={22} style={{ backgroundColor: s.fg }} />
            </span>
            <span className="flex-1 text-right min-w-0">
              <span className="block text-[22px] font-extrabold leading-tight" style={{ color: T.ink }}>
                {s.value}
              </span>
              <span className="block text-[11.5px]" style={{ color: T.muted }}>
                {s.label}
              </span>
              <span
                className="block text-[10.5px] mt-0.5"
                style={{ color: s.up ? T.successStrong : T.muted }}
              >
                {s.sub}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* ── Category tabs ─────────────────────────────────────── */}
      <div
        className="bg-white px-2 overflow-x-auto"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-1 min-w-max">
          {testCategories.map((c) => {
            const on = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={on}
                className="relative px-5 py-4 text-[12.5px] transition-colors whitespace-nowrap"
                style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
              >
                {c}
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
          className="flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[200px]"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:search" size={16} style={{ backgroundColor: T.muted }} />
          <input
            type="search"
            placeholder={testsHead.search}
            className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </label>

        <div className="flex items-center gap-1.5">
          {testPills.map((p) => {
            const on = p === pill;
            return (
              <button
                key={p}
                onClick={() => setPill(p)}
                aria-pressed={on}
                className="px-4 py-2.5 text-[12px] font-bold transition-colors"
                style={
                  on
                    ? { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                    : { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }
                }
              >
                {p}
              </button>
            );
          })}
        </div>

        {testFilters.map((f) => (
          <button
            key={f.id}
            className="flex items-center gap-2 px-3.5 py-2.5 text-[12.5px] font-semibold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
            {f.label}
          </button>
        ))}

        <button
          className="flex items-center gap-2 px-3.5 py-2.5 text-[12.5px] font-bold"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
        >
          <Icon name="lucide:sliders-horizontal" size={15} style={{ backgroundColor: T.primary }} />
          {testsHead.more}
        </button>
      </div>

      {/* ── Cards ─────────────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {testCards.map((c) => (
          <Card key={c.id} card={c} onOpen={() => setDrawer(c.id)} />
        ))}
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 py-3.5 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
      >
        <Icon name="lucide:chevron-down" size={15} style={{ backgroundColor: T.muted }} />
        {testsHead.seeAll}
      </button>

      {/* ── Bottom panels ─────────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Panel title={testsUsage.title}>
          <div className="flex items-center gap-4">
            <Donut slices={testsUsage.slices} size={112} thickness={22} />
            <div className="flex-1 min-w-0">
              <DonutLegend slices={testsUsage.slices} />
            </div>
          </div>

          <dl className="mt-4 space-y-2">
            {testsUsage.rows.map((r) => (
              <div key={r.k}>
                <div className="flex items-center justify-between gap-2">
                  <dd className="text-[11.5px] font-bold" style={{ color: T.ink }}>
                    {r.v}
                  </dd>
                  <dt className="text-[10.5px]" style={{ color: T.muted }}>
                    {r.k}
                  </dt>
                </div>
                {r.bar && (
                  <span
                    className="mt-1 block h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: T.border }}
                  >
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${r.bar}%`, backgroundColor: T.success }}
                    />
                  </span>
                )}
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title={testsTop.title}>
          <ul className="space-y-3">
            {testsTop.rows.map((r) => (
              <li key={r.label} className="flex items-center gap-2.5">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9.5px] font-extrabold shrink-0 text-white"
                  style={{ backgroundColor: T.primaryStrong }}
                >
                  {r.rank}
                </span>
                <span className="flex-1 min-w-0">
                  <span
                    className="block h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: T.border }}
                  >
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${r.value}%`, backgroundColor: r.colour }}
                    />
                  </span>
                </span>
                <span className="text-right shrink-0 w-[92px]">
                  <span className="block text-[11px] font-bold truncate" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <span className="block text-[9.5px]" style={{ color: T.muted }}>
                    {r.runs}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={testsPackages.title} action={testsPackages.seeAll}>
          <ul className="space-y-2.5">
            {testsPackages.rows.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 p-2.5"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: p.bg }}
                >
                  <Icon name="lucide:users-round" size={17} style={{ backgroundColor: p.fg }} />
                </span>
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[11.5px] font-bold truncate" style={{ color: T.ink }}>
                    {p.label}
                  </span>
                  <span className="block text-[10px]" style={{ color: T.muted }}>
                    {p.sub}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/org/assessments/packages"
            className="mt-3 flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:package-open" size={15} style={{ backgroundColor: T.primary }} />
            {testsPackages.cta}
          </Link>
        </Panel>

        <Panel title={testsAi.title} icon="lucide:sparkles" tone={T.primary}>
          <p className="text-right text-[11px] leading-6" style={{ color: T.muted }}>
            {testsAi.desc}
          </p>

          <p
            className="mt-3 p-3 text-right text-[11px] leading-6"
            style={{ borderRadius: R.md, backgroundColor: T.tintPurple, color: T.ink }}
          >
            {testsAi.sample}
          </p>

          <button
            data-ripple
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            {testsAi.cta}
          </button>
        </Panel>
      </div>

      {/* ── Pager ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
        <span className="text-[12px]" style={{ color: T.muted }}>
          {testsFooter.showing}
        </span>

        <div className="flex items-center gap-1.5">
          <PagerBtn icon="lucide:chevron-right" label="قبلی" />
          {testsFooter.pages.map((p, i) => (
            <button
              key={p}
              aria-current={i === 0 ? 'page' : undefined}
              className="w-9 h-9 text-[12.5px] font-bold"
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
          {testsFooter.perPage}
        </button>
      </div>

      {drawer && <Drawer onClose={() => setDrawer(null)} />}
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

function Panel({
  title,
  action,
  icon,
  tone,
  children,
}: {
  title: string;
  action?: string;
  icon?: string;
  tone?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="bg-white p-4"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <header className="flex items-center gap-2 mb-3.5">
        {action && (
          <button className="text-[10.5px] font-bold" style={{ color: T.primary }}>
            {action}
          </button>
        )}
        <h2 className="flex-1 text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
          {title}
        </h2>
        {icon && <Icon name={icon} size={17} style={{ backgroundColor: tone ?? T.primary }} />}
      </header>
      {children}
    </section>
  );
}

function Card({ card, onOpen }: { card: TestCard; onOpen: () => void }) {
  return (
    <article
      className="bg-white p-4 flex flex-col"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <header className="flex items-start gap-3">
        <span
          className="px-2.5 py-1 text-[10.5px] font-bold shrink-0"
          style={{ borderRadius: R.pill, backgroundColor: card.badge.bg, color: card.badge.fg }}
        >
          {card.badge.label}
        </span>

        <div className="flex-1 text-right min-w-0">
          <h2 className="text-[15px] font-extrabold truncate" style={{ color: T.ink }}>
            {card.title}
          </h2>
          <span
            className="inline-block mt-1.5 px-2.5 py-1 text-[10px] font-semibold"
            style={{ borderRadius: R.pill, backgroundColor: card.catBg, color: card.catFg }}
          >
            {card.cat}
          </span>
        </div>

        <span
          className="w-11 h-11 flex items-center justify-center shrink-0"
          style={{ borderRadius: R.md, backgroundColor: card.iconBg }}
        >
          <img src={card.art} alt="" className="w-7 h-7 object-contain" />
        </span>
      </header>

      <p className="mt-3 text-right text-[11.5px] leading-6" style={{ color: T.muted }}>
        {card.desc}
      </p>

      <dl
        className="mt-3 pt-3 flex items-center justify-between gap-2"
        style={{ borderTop: `1px solid ${T.border}` }}
      >
        <Spec icon="lucide:file-text" v={card.report} />
        <Spec icon="lucide:clock" v={card.time} />
        <Spec icon="lucide:list" v={card.questions} />
      </dl>

      {card.usage && (
        <p
          className="mt-3 pt-3 flex items-center justify-end gap-2 text-[10.5px] flex-wrap"
          style={{ borderTop: `1px solid ${T.border}`, color: T.muted }}
        >
          <span style={{ color: T.ink }}>{card.usage.runs}</span>
          <span>|</span>
          <span style={{ color: T.ink }}>{card.usage.assessments}</span>
          <span>{testCardLabels.usage}</span>
        </p>
      )}

      <div className="mt-3.5 flex items-center gap-2.5">
        <button
          data-ripple
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
        >
          <Icon name="lucide:plus" size={15} className="text-white" />
          {testCardLabels.add}
        </button>

        <button
          onClick={onOpen}
          className="px-4 py-2.5 text-[12px] font-bold transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          {testCardLabels.detail}
        </button>
      </div>
    </article>
  );
}

function Spec({ icon, v }: { icon: string; v: string }) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <span className="text-[10.5px] font-semibold truncate" style={{ color: T.ink }}>
        {v}
      </span>
      <Icon name={icon} size={13} style={{ backgroundColor: T.muted }} />
    </div>
  );
}

/* ── Screen 13 — detail drawer ────────────────────────────────── */

function Drawer({ onClose }: { onClose: () => void }) {
  const d = testDetail;

  return (
    /* RTL: the first flex child sits at the right, so the panel is
       declared before the backdrop to slide in from that edge — over
       the nav rail, exactly as screen 13 shows it. */
    <div className="fixed inset-0 z-[60] flex">
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={d.title}
        className="w-full max-w-[430px] bg-white h-full overflow-y-auto flex flex-col"
      >
        <header className="p-5" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-start gap-3">
            <button
              aria-label="بستن"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <Icon name="lucide:x" size={16} style={{ backgroundColor: T.ink }} />
            </button>

            <div className="flex-1 text-right">
              <h2 className="text-[17px] font-extrabold" style={{ color: T.ink }}>
                {d.title}
              </h2>
              <span
                className="inline-block mt-1.5 px-3 py-1 text-[10.5px] font-semibold"
                style={{ borderRadius: R.pill, backgroundColor: T.tintRed, color: T.danger }}
              >
                {d.cat}
              </span>
            </div>

            <span
              className="w-12 h-12 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.md, backgroundColor: T.tintRed }}
            >
              <img
                src="/images/aryaz/test-icons-3d/test-eq.png"
                alt=""
                className="w-8 h-8 object-contain"
              />
            </span>
          </div>

          <p className="mt-3 text-right text-[11.5px] leading-6" style={{ color: T.muted }}>
            {d.desc}
          </p>
        </header>

        <div className="p-5 space-y-4 flex-1">
          <section style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }} className="p-4">
            <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {d.keyTitle}
            </h3>
            <dl className="mt-3 grid grid-cols-3 gap-3">
              {d.key.map((k) => (
                <div key={k.k} className="text-center">
                  <Icon
                    name={k.icon}
                    size={17}
                    style={{ backgroundColor: T.primary, margin: '0 auto' }}
                  />
                  <dt className="mt-1.5 text-[9.5px]" style={{ color: T.muted }}>
                    {k.k}
                  </dt>
                  <dd className="mt-0.5 text-[11px] font-bold" style={{ color: T.ink }}>
                    {k.v}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }} className="p-4">
            <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {d.measuresTitle}
            </h3>
            <div className="mt-3 flex items-center justify-end gap-2 flex-wrap">
              {d.measures.map((m) => (
                <span
                  key={m.label}
                  className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold"
                  style={{ borderRadius: R.md, backgroundColor: m.bg, color: m.fg }}
                >
                  {m.label}
                  <Icon name="lucide:circle-dot" size={13} style={{ backgroundColor: m.fg }} />
                </span>
              ))}
            </div>
          </section>

          <section style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }} className="p-4">
            <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {d.useTitle}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {d.uses.map((u) => (
                <span
                  key={u.label}
                  className="flex items-center gap-2 px-3 py-2.5 text-[11px] font-semibold"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                >
                  <Icon name={u.icon} size={15} style={{ backgroundColor: T.primary }} />
                  <span className="flex-1 text-right">{u.label}</span>
                </span>
              ))}
            </div>
          </section>

          <section style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }} className="p-4">
            <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
              {d.sampleTitle}
            </h3>

            <div
              className="mt-3 p-3 flex items-center gap-2 overflow-x-auto"
              style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}
            >
              {[T.primary, T.success, T.info, T.warning].map((c, i) => (
                <span
                  key={i}
                  className="w-[104px] h-[74px] shrink-0 bg-white flex items-center justify-center"
                  style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                >
                  <Icon name="lucide:chart-no-axes-combined" size={26} style={{ backgroundColor: c }} />
                </span>
              ))}
            </div>

            <div className="mt-2.5 flex items-center justify-center gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full"
                  style={{
                    width: i === 0 ? 16 : 6,
                    backgroundColor: i === 0 ? T.primary : T.border,
                  }}
                />
              ))}
            </div>
          </section>
        </div>

        <footer
          className="sticky bottom-0 bg-white p-4 flex items-center gap-2.5"
          style={{ borderTop: `1px solid ${T.border}` }}
        >
          <button
            aria-label="ذخیره"
            className="w-11 h-11 flex items-center justify-center shrink-0"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name="lucide:bookmark" size={17} style={{ backgroundColor: T.muted }} />
          </button>

          <button
            data-ripple
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:plus" size={16} className="text-white" />
            {d.add}
          </button>
        </footer>
      </aside>

      <button aria-label="بستن" onClick={onClose} className="flex-1 bg-black/40" />
    </div>
  );
}
