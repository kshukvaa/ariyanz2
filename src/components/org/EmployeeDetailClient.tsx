'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { panelTheme } from '@/data/orgPanel';
import {
  employeeTabs,
  employeeHeadActions,
  employeeProfile,
  employeeOverview,
  employeeEvaluations,
  employeeEvalMeta,
  employeeResults,
  employeeDevelopment,
  employeeHistory,
  type EmployeeTab,
} from '@/data/orgEmployee';

/* ──────────────────────────────────────────────────────────────
   پرونده کارمند.

   One record, five readings of it. The header never changes, so a
   manager always knows whose file is open; the tabs below answer
   a different question each — standing, assigned, measured,
   planned, past.
────────────────────────────────────────────────────────────── */

export default function EmployeeDetailClient({ tab: initial = 'overview' }: { tab?: EmployeeTab }) {
  const [tab, setTab] = useState<EmployeeTab>(initial);
  const [menu, setMenu] = useState(false);

  return (
    <div className="space-y-5">
      <Crumbs tab={tab} />
      <ProfileHead menu={menu} setMenu={setMenu} />

      {tab === 'evaluations' && <Stats />}

      <nav className="flex items-center justify-center gap-8 border-b" style={{ borderColor: panelTheme.border }}>
        {employeeTabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-current={on ? 'page' : undefined}
              className="pb-3 text-[13px] font-bold transition-colors border-b-2 -mb-px"
              style={{ color: on ? panelTheme.violet : panelTheme.muted, borderColor: on ? panelTheme.violet : 'transparent' }}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      {tab === 'overview' && <Overview />}
      {tab === 'evaluations' && <Evaluations />}
      {tab === 'results' && <Results />}
      {tab === 'development' && <Development />}
      {tab === 'history' && <History />}
    </div>
  );
}

/* ── Head ───────────────────────────────────────────────────── */

function Crumbs({ tab }: { tab: EmployeeTab }) {
  const label = employeeTabs.find((t) => t.id === tab)?.label;
  return (
    <nav className="flex items-center gap-2 text-[12px]" aria-label="مسیر">
      <Link href="/org/employees" className="font-bold transition-colors hover:text-violet-700" style={{ color: panelTheme.navy }}>
        کارکنان
      </Link>
      <Icon name="lucide:chevron-left" size={13} className="text-gray-300" />
      <span style={{ color: panelTheme.navy }}>{employeeProfile.name}</span>
      {tab !== 'overview' && (
        <>
          <Icon name="lucide:chevron-left" size={13} className="text-gray-300" />
          <span className="text-gray-400">{label}</span>
        </>
      )}
    </nav>
  );
}

function ProfileHead({ menu, setMenu }: { menu: boolean; setMenu: (v: boolean) => void }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Identity reads first on the right. */}
        {/* RTL: the portrait anchors the far right, the name reads to its left. */}
        <div className="flex items-start gap-4 order-1">
          <img
            src={employeeProfile.avatar}
            alt=""
            className="w-[76px] h-[76px] rounded-full object-cover shrink-0 order-1"
          />

          <div className="text-right order-2">
            <h1 className="text-[22px] font-black mb-1.5" style={{ color: panelTheme.navy }}>
              {employeeProfile.name}
            </h1>
            <p className="text-[12.5px] text-gray-500 mb-2">{employeeProfile.title}</p>
            <span
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10.5px] font-bold"
              style={{ backgroundColor: '#E7F7EF', color: '#16A34A' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#16A34A' }} />
              <span>{employeeProfile.status}</span>
            </span>
          </div>

        </div>

        <div className="flex items-center gap-3 order-2 relative">
          <button
            onClick={() => setMenu(!menu)}
            aria-label="عملیات بیشتر"
            aria-expanded={menu}
            className="w-11 h-11 rounded-xl border flex items-center justify-center"
            style={{ borderColor: panelTheme.border }}
          >
            <Icon name="lucide:ellipsis" size={17} style={{ backgroundColor: panelTheme.muted }} />
          </button>

          {menu && (
            <ul
              className="absolute z-20 left-0 top-full mt-2 w-[180px] rounded-xl border bg-white py-1.5 shadow-lg"
              style={{ borderColor: panelTheme.border }}
            >
              {employeeHeadActions.menu.map((m) => (
                <li key={m.id}>
                  <button
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[11.5px] font-bold transition-colors hover:bg-gray-50"
                    style={{ color: m.id === 'deactivate' ? panelTheme.red : panelTheme.navy }}
                  >
                    <Icon
                      name={m.icon}
                      size={14}
                      style={{ backgroundColor: m.id === 'deactivate' ? panelTheme.red : panelTheme.muted }}
                    />
                    <span className="flex-1 text-right">{m.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            className="flex items-center gap-2 rounded-xl border px-4 py-3 text-[12.5px] font-bold transition-colors hover:border-violet-300"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            <Icon name={employeeHeadActions.secondary.icon} size={15} style={{ backgroundColor: panelTheme.muted }} />
            <span>{employeeHeadActions.secondary.label}</span>
          </button>

          <button
            data-ripple
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: panelTheme.violet }}
          >
            <Icon name={employeeHeadActions.primary.icon} size={15} className="text-white" />
            <span>{employeeHeadActions.primary.label}</span>
          </button>
        </div>
      </div>

      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t" style={{ borderColor: panelTheme.border }}>
        {employeeProfile.facts.map((f) => (
          <div key={f.label} className="text-center">
            <dt className="text-[11px] text-gray-400 mb-1.5">{f.label}</dt>
            <dd className="text-[12.5px] font-bold" style={{ color: panelTheme.navy }}>
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Stats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {employeeProfile.stats.map((s) => (
        <article
          key={s.id}
          className="bg-white rounded-2xl border p-5 flex items-center gap-4"
          style={{ borderColor: panelTheme.border }}
        >
          <span className="flex-1 text-right">
            <span className="block text-[24px] font-black leading-none mb-1.5" style={{ color: panelTheme.navy }}>
              {s.value}
            </span>
            <span className="block text-[11.5px] text-gray-500 leading-6">{s.label}</span>
          </span>
          <span
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: s.tint }}
          >
            <Icon name={s.icon} size={22} style={{ backgroundColor: s.color }} />
          </span>
        </article>
      ))}
    </section>
  );
}

/* ── Overview ───────────────────────────────────────────────── */

function Overview() {
  const o = employeeOverview;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        <Card title={o.gaps.title} icon="lucide:users-round" footer={{ label: o.gaps.cta, href: '#' }}>
          <ul className="space-y-3">
            {o.gaps.rows.map((r) => (
              <li key={r.label}>
                <span className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-black" style={{ color: panelTheme.red }}>
                    Gap {toPersian(r.gap)}٪
                  </span>
                  <span className="text-[11.5px] font-bold" style={{ color: panelTheme.navy }}>
                    {r.label}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[9.5px] text-gray-400 shrink-0">{r.basis}</span>
                  <span className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${r.gap * 3}%`, backgroundColor: '#F26A6A' }}
                    />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={o.strengths.title} icon="lucide:award">
          <ul className="space-y-3">
            {o.strengths.rows.map((r) => (
              <li key={r.label} className="flex items-center gap-3">
                <span className="text-[11px] tabular-nums shrink-0" style={{ color: panelTheme.ink }}>
                  {toPersian(r.score)} / ۱۰۰
                </span>
                <span className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${r.score}%`, backgroundColor: panelTheme.green }}
                  />
                </span>
                <span className="text-[11.5px] font-bold shrink-0 w-[86px] text-left" style={{ color: panelTheme.navy }}>
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={o.running.title} icon="lucide:clipboard-check">
          <p className="flex items-center gap-2 mb-3">
            <span className="text-[12px] font-black shrink-0" style={{ color: panelTheme.navy }}>
              {toPersian(o.running.percent)}٪
            </span>
            <span className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
              <span
                className="block h-full rounded-full"
                style={{ width: `${o.running.percent}%`, backgroundColor: panelTheme.violet }}
              />
            </span>
            <span className="text-[12px] font-bold shrink-0" style={{ color: panelTheme.navy }}>
              {o.running.name}
            </span>
          </p>

          <ul className="space-y-2.5 mb-4">
            {o.running.tests.map((t) => (
              <li key={t.label} className="flex items-center gap-2">
                <Icon
                  name={t.done ? 'lucide:circle-check' : 'lucide:clock'}
                  size={15}
                  style={{ backgroundColor: t.done ? panelTheme.green : panelTheme.amber }}
                />
                <span
                  className="text-[11px] font-bold"
                  style={{ color: t.done ? panelTheme.green : panelTheme.amber }}
                >
                  {t.state}
                </span>
                <span className="flex-1 text-[11.5px] text-left" style={{ color: panelTheme.navy }}>
                  {t.label}
                </span>
              </li>
            ))}
          </ul>

          <button
            className="w-full flex items-center justify-center gap-2 rounded-xl border py-2.5 text-[11.5px] font-bold"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            <Icon name="lucide:bell" size={14} style={{ backgroundColor: panelTheme.muted }} />
            <span>{o.running.cta}</span>
          </button>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <Card title={o.insights.title} icon="lucide:sparkles">
          <ul className="space-y-3 mb-4">
            {o.insights.items.map((i) => (
              <li key={i.n} className="rounded-xl p-3" style={{ backgroundColor: '#FAF9FF' }}>
                <p className="flex items-center gap-2 mb-1.5">
                  <Icon name={i.icon} size={14} style={{ backgroundColor: panelTheme.violet }} />
                  <span className="text-[11px] font-black" style={{ color: panelTheme.violet }} dir="ltr">
                    {i.n}
                  </span>
                </p>
                <p className="text-[11px] leading-7 text-right" style={{ color: panelTheme.ink }}>
                  {i.text}
                </p>
              </li>
            ))}
          </ul>

          <button
            data-ripple
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: panelTheme.violet }}
          >
            <Icon name="lucide:message-circle" size={15} className="text-white" />
            <span>{o.insights.cta}</span>
          </button>
        </Card>

        <Card title={o.radar.title} icon="lucide:radar">
          <Radar axes={o.radar.axes} legend={o.radar.legend} />
          <label className="flex items-center justify-center gap-2 mt-3">
            <input type="checkbox" defaultChecked className="w-8 h-4 accent-violet-700" />
            <span className="text-[10.5px] text-gray-500">{o.radar.compareLabel}</span>
          </label>
        </Card>

        <Card title={o.latest.title} icon="lucide:clipboard-list">
          <div className="grid grid-cols-2 gap-3">
            {o.latest.cards.map((c) => (
              <article
                key={c.title}
                className="rounded-xl border p-3 text-center"
                style={{ borderColor: panelTheme.border }}
              >
                <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold mb-2" style={{ color: panelTheme.navy }}>
                  <Icon name={c.icon} size={13} style={{ backgroundColor: panelTheme.violet }} />
                  <span>{c.title}</span>
                </p>
                <p className="text-[14px] font-black mb-0.5" style={{ color: panelTheme.violet }}>
                  {c.value}
                </p>
                {c.note && <p className="text-[10px] text-gray-400">{c.note}</p>}
                <p className="text-[9.5px] text-gray-400 mt-2">{c.date}</p>
                <button className="text-[10.5px] font-bold mt-2" style={{ color: panelTheme.violet }}>
                  {o.latest.cardCta}
                </button>
              </article>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card title={o.timeline.title} icon="lucide:history" footer={{ label: o.timeline.cta, href: '#' }}>
          <ul className="flex items-start justify-between gap-2">
            {o.timeline.items.map((t) => (
              <li key={t.date} className="flex-1 text-center">
                <span
                  className="w-9 h-9 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${t.color}14` }}
                >
                  <Icon name={t.icon} size={16} style={{ backgroundColor: t.color }} />
                </span>
                <span className="block text-[10px] leading-5" style={{ color: panelTheme.ink }}>
                  {t.text}
                </span>
                <span className="block text-[9px] text-gray-400 mt-1">{t.date}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={o.suggestions.title} icon="lucide:clipboard-check">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {o.suggestions.items.map((s) => (
              <article
                key={s.title}
                className="rounded-xl border p-3 text-center flex flex-col"
                style={{ borderColor: panelTheme.border }}
              >
                <span
                  className="w-9 h-9 rounded-lg mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${s.color}14` }}
                >
                  <Icon name={s.icon} size={16} style={{ backgroundColor: s.color }} />
                </span>
                <span className="block text-[10px] font-bold mb-1" style={{ color: s.color }}>
                  {s.kind}
                </span>
                <span className="block text-[10.5px] leading-5 mb-3" style={{ color: panelTheme.navy }}>
                  {s.title}
                </span>
                <button
                  className="mt-auto rounded-lg py-1.5 text-[10px] font-bold"
                  style={{ backgroundColor: `${s.color}12`, color: s.color }}
                >
                  {s.cta}
                </button>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ── Evaluations ────────────────────────────────────────────── */

function Evaluations() {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-center gap-3 flex-wrap mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="search"
            placeholder={employeeEvalMeta.search}
            aria-label={employeeEvalMeta.search}
            className="w-full border rounded-xl py-2.5 pr-10 pl-4 text-[12px] focus:outline-none focus:border-violet-400"
            style={{ borderColor: panelTheme.border }}
          />
          <Icon
            name="lucide:search"
            size={16}
            className="text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        {employeeEvalMeta.filters.map((f) => (
          <span
            key={f.id}
            className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold shrink-0"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            <Icon name="lucide:chevron-down" size={13} className="text-gray-400" />
            <span>{f.label}</span>
          </span>
        ))}

        <button
          className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold shrink-0"
          style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
        >
          <Icon name="lucide:filter" size={14} style={{ backgroundColor: panelTheme.muted }} />
          <span>{employeeEvalMeta.moreFilters}</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b" style={{ borderColor: panelTheme.border }}>
              {employeeEvalMeta.headers.map((h) => (
                <th key={h} className="py-3 px-3 text-[11.5px] font-bold whitespace-nowrap" style={{ color: panelTheme.muted }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employeeEvaluations.map((e) => (
              <tr key={e.id} className="border-b last:border-0" style={{ borderColor: panelTheme.border }}>
                <td className="py-3.5 px-3">
                  <span className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: e.tint }}
                    >
                      <Icon name={e.icon} size={16} style={{ backgroundColor: e.color }} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-bold" style={{ color: panelTheme.navy }}>
                        {e.title}
                      </span>
                      <span className="block text-[10px] text-gray-400">{e.kind}</span>
                    </span>
                  </span>
                </td>

                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className="block text-[11.5px]" style={{ color: panelTheme.ink }}>
                    {e.tests}
                  </span>
                  <span className="flex items-center gap-1 mt-1">
                    {['lucide:user-round', 'lucide:heart', 'lucide:chart-no-axes-combined', 'lucide:star'].map((i) => (
                      <Icon key={i} name={i} size={11} style={{ backgroundColor: '#B9BFD1' }} />
                    ))}
                  </span>
                </td>

                <td className="py-3.5 px-3 text-[11.5px] tabular-nums" style={{ color: panelTheme.ink }}>
                  {e.assigned}
                </td>

                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className="block text-[11.5px] tabular-nums" style={{ color: panelTheme.ink }}>
                    {e.deadline}
                  </span>
                  {e.deadlineNote && (
                    <span
                      className="block text-[10px] mt-0.5"
                      style={{ color: e.deadlineWarn ? panelTheme.orange : panelTheme.muted }}
                    >
                      {e.deadlineNote}
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-3 min-w-[120px]">
                  <span className="block text-[11px] font-bold mb-1" style={{ color: panelTheme.navy }}>
                    {toPersian(e.percent)}٪
                  </span>
                  <span className="block h-1.5 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${e.percent}%`,
                        backgroundColor: e.percent === 100 ? panelTheme.green : panelTheme.violet,
                      }}
                    />
                  </span>
                </td>

                <td className="py-3.5 px-3">
                  <span
                    className="inline-block rounded-lg px-3 py-1.5 text-[10.5px] font-bold whitespace-nowrap"
                    style={
                      e.stateTone === 'done'
                        ? { backgroundColor: '#E7F7EF', color: '#16A34A' }
                        : e.stateTone === 'doing'
                          ? { backgroundColor: '#FEF6E4', color: '#B4790C' }
                          : { backgroundColor: '#FDE8EC', color: '#E11D48' }
                    }
                  >
                    {e.state}
                  </span>
                </td>

                <td className="py-3.5 px-3">
                  <span className="flex items-center gap-1.5">
                    <button aria-label="مشاهده" className="w-8 h-8 rounded-lg border flex items-center justify-center" style={{ borderColor: panelTheme.border }}>
                      <Icon name="lucide:eye" size={14} style={{ backgroundColor: panelTheme.muted }} />
                    </button>
                    <button
                      aria-label={e.percent === 100 ? 'گزارش' : 'ارسال یادآوری'}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center"
                      style={{ borderColor: panelTheme.border }}
                    >
                      <Icon
                        name={e.percent === 100 ? 'lucide:file-text' : 'lucide:send'}
                        size={14}
                        style={{ backgroundColor: panelTheme.muted }}
                      />
                    </button>
                    <button aria-label="عملیات بیشتر" className="w-8 h-8 rounded-lg border flex items-center justify-center" style={{ borderColor: panelTheme.border }}>
                      <Icon name="lucide:ellipsis" size={14} style={{ backgroundColor: panelTheme.muted }} />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 flex-wrap">
        <span className="text-[11.5px]" style={{ color: panelTheme.ink }}>
          {employeeEvalMeta.total}
        </span>

        <nav dir="ltr" className="flex items-center gap-1.5" aria-label="صفحه‌بندی">
          <button aria-label="صفحه قبل" className="w-9 h-9 rounded-lg border flex items-center justify-center bg-white" style={{ borderColor: panelTheme.border }}>
            <Icon name="lucide:chevron-left" size={15} style={{ backgroundColor: panelTheme.navy }} />
          </button>
          {['1', '2'].map((n, i) => (
            <button
              key={n}
              aria-current={i === 0 ? 'page' : undefined}
              className="w-9 h-9 rounded-lg border text-[12px] font-bold"
              style={
                i === 0
                  ? { backgroundColor: panelTheme.violet, borderColor: panelTheme.violet, color: '#fff' }
                  : { backgroundColor: '#fff', borderColor: panelTheme.border, color: panelTheme.navy }
              }
            >
              {n}
            </button>
          ))}
          <button aria-label="صفحه بعد" className="w-9 h-9 rounded-lg border flex items-center justify-center bg-white" style={{ borderColor: panelTheme.border }}>
            <Icon name="lucide:chevron-right" size={15} style={{ backgroundColor: panelTheme.navy }} />
          </button>
        </nav>

        <span
          className="flex items-center gap-2 rounded-xl border px-3 py-2 text-[11.5px] font-bold"
          style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
        >
          <Icon name="lucide:chevron-down" size={13} className="text-gray-400" />
          <span>{employeeEvalMeta.perPage}</span>
          <span className="text-gray-400">{employeeEvalMeta.perPageLabel}</span>
        </span>
      </div>
    </section>
  );
}

/* ── Results ────────────────────────────────────────────────── */

function Results() {
  const r = employeeResults;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        {r.filters.map((f) => (
          <span
            key={f.id}
            className="flex items-center gap-2 rounded-xl border bg-white px-3.5 py-2.5 text-[11.5px] font-bold"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            <Icon name={f.id === 'more' ? 'lucide:filter' : 'lucide:chevron-down'} size={13} className="text-gray-400" />
            <span>{f.label}</span>
          </span>
        ))}

        <span className="flex-1" />

        {r.headActions.map((a) => (
          <button
            key={a.id}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-bold transition-opacity hover:opacity-90"
            style={
              a.kind === 'primary'
                ? { backgroundColor: panelTheme.violet, color: '#fff' }
                : { border: `1px solid ${panelTheme.border}`, color: panelTheme.navy, backgroundColor: '#fff' }
            }
          >
            <Icon name={a.icon} size={14} style={{ backgroundColor: a.kind === 'primary' ? '#fff' : panelTheme.muted }} />
            <span>{a.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card title="نتایج آخرین ارزیابی‌ها" icon="lucide:clipboard-list">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {r.cards.map((c) => (
              <article key={c.title} className="rounded-xl border p-3" style={{ borderColor: panelTheme.border }}>
                <p className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-right" style={{ color: panelTheme.navy }}>
                    {c.title}
                  </span>
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${c.color}14` }}
                  >
                    <Icon name={c.icon} size={15} style={{ backgroundColor: c.color }} />
                  </span>
                </p>
                <p className="text-[9.5px] text-gray-400 mb-2">{c.date}</p>
                <p className="text-[15px] font-black mb-1" style={{ color: c.color }}>
                  {c.value}
                </p>
                <p className="text-[10px] text-gray-500 mb-2">{c.level}</p>
                {c.bar > 0 && (
                  <span className="block h-1.5 rounded-full bg-gray-100 overflow-hidden mb-2" dir="ltr">
                    <span className="block h-full rounded-full" style={{ width: `${c.bar}%`, backgroundColor: panelTheme.green }} />
                  </span>
                )}
                <button className="flex items-center gap-1 text-[10.5px] font-bold" style={{ color: panelTheme.violet }}>
                  <Icon name="lucide:user-round" size={11} style={{ backgroundColor: panelTheme.violet }} />
                  <span>{r.cardCta}</span>
                </button>
              </article>
            ))}
          </div>
        </Card>

        <Card title={r.trend.title} icon="lucide:trending-up">
          <Trend months={r.trend.months} series={r.trend.series} />
          <span
            className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold w-fit mt-3"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            <Icon name="lucide:chevron-down" size={13} className="text-gray-400" />
            <span>{r.trend.selectLabel}</span>
            <span className="text-gray-400">{r.trend.selectPrefix}</span>
          </span>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        <Card title={r.insights.title} icon="lucide:sparkles">
          <ul className="space-y-3 mb-4">
            {r.insights.items.map((i) => (
              <li key={i.n} className="flex items-start gap-3 rounded-xl p-3" style={{ backgroundColor: '#FAF9FF' }}>
                <span className="flex-1 text-right">
                  <span className="block text-[11.5px] font-black mb-1" style={{ color: panelTheme.violet }}>
                    {i.title}
                  </span>
                  <span className="block text-[10.5px] leading-6" style={{ color: panelTheme.ink }}>
                    {i.text}
                  </span>
                </span>
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-black"
                  style={{ backgroundColor: panelTheme.violet, color: '#fff' }}
                  dir="ltr"
                >
                  {i.n}
                </span>
              </li>
            ))}
          </ul>

          <button
            className="w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-[12px] font-bold"
            style={{ borderColor: '#CDBEF5', color: panelTheme.violet }}
          >
            <Icon name="lucide:message-circle" size={15} style={{ backgroundColor: panelTheme.violet }} />
            <span>{r.insights.cta}</span>
          </button>
        </Card>

        <Card title={r.table.title} icon="lucide:table" footer={{ label: r.table.cta, href: '#' }}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor: panelTheme.border }}>
                {r.table.headers.map((h) => (
                  <th key={h} className="py-2 px-2 text-[10.5px] font-bold" style={{ color: panelTheme.muted }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {r.table.rows.map((row) => (
                <tr key={row.skill} className="border-b last:border-0" style={{ borderColor: panelTheme.border }}>
                  <td className="py-2.5 px-2 text-[11px]" style={{ color: panelTheme.navy }}>
                    {row.skill}
                  </td>
                  <td className="py-2.5 px-2 text-[11px] font-bold tabular-nums" style={{ color: panelTheme.navy }}>
                    {row.score}
                  </td>
                  <td className="py-2.5 px-2">
                    <span
                      className="flex items-center gap-1 text-[10.5px] font-bold"
                      style={{ color: row.up ? panelTheme.green : panelTheme.red }}
                    >
                      <Icon
                        name={row.up ? 'lucide:triangle' : 'lucide:triangle'}
                        size={9}
                        className={row.up ? '' : 'rotate-180'}
                        style={{ backgroundColor: row.up ? panelTheme.green : panelTheme.red }}
                      />
                      <span>{row.delta}</span>
                    </span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span
                      className="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold"
                      style={
                        row.level === 'متوسط'
                          ? { backgroundColor: '#FEF6E4', color: '#B4790C' }
                          : { backgroundColor: '#E7F7EF', color: '#16A34A' }
                      }
                    >
                      {row.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title={r.radarTitle} icon="lucide:radar" footer={{ label: r.radarCta, href: '#' }}>
          <Radar
            axes={employeeOverview.radar.axes}
            legend={{ self: r.radarLegend.current, org: r.radarLegend.previous }}
          />
        </Card>
      </div>
    </div>
  );
}

/* ── Development ────────────────────────────────────────────── */

function Development() {
  const d = employeeDevelopment;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap justify-end">
        {d.headActions.map((a) => (
          <button
            key={a.id}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-bold transition-opacity hover:opacity-90"
            style={
              a.kind === 'primary'
                ? { backgroundColor: panelTheme.violet, color: '#fff' }
                : { border: `1px solid ${panelTheme.border}`, color: panelTheme.navy, backgroundColor: '#fff' }
            }
          >
            <Icon name={a.icon} size={14} style={{ backgroundColor: a.kind === 'primary' ? '#fff' : panelTheme.muted }} />
            <span>{a.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] items-start">
        <div className="space-y-5">
          <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
            <h2 className="text-[13.5px] font-black mb-4 text-right" style={{ color: panelTheme.navy }}>
              {d.summary.title}
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-x-reverse" style={{ borderColor: panelTheme.border }}>
              {d.summary.cells.map((c) => (
                <li key={c.label} className="flex items-center justify-center gap-3 py-2">
                  <span className="text-center">
                    <span className="block text-[20px] font-black leading-none mb-1" style={{ color: panelTheme.navy }}>
                      {c.value}
                    </span>
                    <span className="block text-[10.5px] text-gray-500">{c.label}</span>
                  </span>
                  <Icon name={c.icon} size={20} style={{ backgroundColor: c.color }} />
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
            <h2 className="text-[13.5px] font-black mb-4 text-right" style={{ color: panelTheme.navy }}>
              {d.plan.title}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b" style={{ borderColor: panelTheme.border }}>
                    {d.plan.headers.map((h) => (
                      <th key={h} className="py-2.5 px-2 text-[10.5px] font-bold whitespace-nowrap" style={{ color: panelTheme.muted }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {d.plan.rows.map((row) => (
                    <tr key={row.goal} className="border-b last:border-0" style={{ borderColor: panelTheme.border }}>
                      <td className="py-3 px-2 min-w-[130px]">
                        <span className="block text-[11.5px] font-bold" style={{ color: panelTheme.navy }}>
                          {row.goal}
                        </span>
                        <span className="block text-[10px] text-gray-400 leading-5 mt-0.5">{row.desc}</span>
                      </td>

                      <td className="py-3 px-2">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: panelTheme.navy }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: row.priorityColor }} />
                          <span>{row.priority}</span>
                        </span>
                      </td>

                      <td className="py-3 px-2 min-w-[170px]">
                        <ul className="space-y-1">
                          {row.resources.map((res) => (
                            <li key={res} className="flex items-center gap-1.5">
                              <Icon name="lucide:book-open" size={11} style={{ backgroundColor: '#B9BFD1' }} />
                              <span className="text-[10.5px]" style={{ color: panelTheme.ink }}>
                                {res}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="py-3 px-2 min-w-[90px]">
                        <span className="block text-[11px] font-bold mb-1" style={{ color: panelTheme.navy }}>
                          {toPersian(row.percent)}٪
                        </span>
                        <span className="block h-1.5 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${row.percent}%`, backgroundColor: panelTheme.violet }}
                          />
                        </span>
                      </td>

                      <td className="py-3 px-2 text-[11px] tabular-nums" style={{ color: panelTheme.ink }}>
                        {row.deadline}
                      </td>
                      <td className="py-3 px-2 text-[11px] tabular-nums" style={{ color: panelTheme.ink }}>
                        {row.recheck}
                      </td>

                      <td className="py-3 px-2">
                        <button
                          aria-label={`عملیات ${row.goal}`}
                          className="w-8 h-8 rounded-lg border flex items-center justify-center"
                          style={{ borderColor: panelTheme.border }}
                        >
                          <Icon name="lucide:ellipsis" size={14} style={{ backgroundColor: panelTheme.muted }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-4">
              <button
                className="rounded-xl border px-5 py-2.5 text-[11.5px] font-bold"
                style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
              >
                {d.plan.cta}
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <Card title={d.suggestions.title} icon="lucide:sparkles">
            <ul className="space-y-3">
              {d.suggestions.items.map((s) => (
                <li key={s.title} className="rounded-xl border p-3" style={{ borderColor: panelTheme.border }}>
                  <p className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-right">
                      <span className="block text-[11px] font-bold mb-1" style={{ color: s.color }}>
                        {s.kind}
                      </span>
                      <span className="block text-[10.5px] leading-5" style={{ color: panelTheme.navy }}>
                        {s.title}
                      </span>
                    </span>
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${s.color}14` }}
                    >
                      <Icon name={s.icon} size={16} style={{ backgroundColor: s.color }} />
                    </span>
                  </p>
                  <button
                    className="rounded-lg px-3 py-1.5 text-[10px] font-bold"
                    style={{ backgroundColor: `${s.color}12`, color: s.color }}
                  >
                    {s.cta}
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card title={d.coaching.title} icon="lucide:calendar-check">
            <p className="text-[11px] text-gray-400 mb-1 text-right">{d.coaching.nextLabel}</p>
            <p className="text-[12.5px] font-bold mb-4 text-right" style={{ color: panelTheme.navy }}>
              {d.coaching.next}
            </p>
            <button
              className="w-full rounded-xl border py-2.5 text-[11.5px] font-bold"
              style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
            >
              {d.coaching.cta}
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ── History ────────────────────────────────────────────────── */

function History() {
  const h = employeeHistory;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] items-start">
      <section className="bg-white rounded-2xl border p-5 order-2 xl:order-1" style={{ borderColor: panelTheme.border }}>
        <h2 className="flex items-center gap-2 text-[13.5px] font-black mb-5" style={{ color: panelTheme.navy }}>
          <Icon name="lucide:clipboard-list" size={17} style={{ backgroundColor: panelTheme.violet }} />
          <span>{h.title}</span>
        </h2>

        {/* One rail down the middle, each event hanging off its own node. */}
        <ol className="relative space-y-4">
          {h.events.map((e, i) => (
            <li key={e.title} className="flex items-start gap-4">
              <span className="flex flex-col items-center shrink-0">
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: e.tint }}
                >
                  <Icon name={e.icon} size={18} style={{ backgroundColor: e.color }} />
                </span>
                {i < h.events.length - 1 && (
                  <span className="w-px flex-1 min-h-[36px] mt-1" style={{ backgroundColor: '#E3E6F1' }} />
                )}
              </span>

              <span
                className="flex-1 rounded-xl border p-4 flex items-start justify-between gap-4"
                style={{ borderColor: panelTheme.border }}
              >
                <span className="text-left shrink-0">
                  <span className="block text-[11px] tabular-nums" style={{ color: panelTheme.ink }}>
                    {e.date}
                  </span>
                  <span className="block text-[10.5px] text-gray-400 tabular-nums mt-0.5">{e.time}</span>
                </span>

                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[12.5px] font-bold mb-1" style={{ color: panelTheme.navy }}>
                    {e.title}
                  </span>
                  <span className="block text-[11px] text-gray-500 leading-6">{e.desc}</span>
                </span>
              </span>
            </li>
          ))}
        </ol>

        <div className="text-center pt-5">
          <button
            className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-[11.5px] font-bold mx-auto"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            <Icon name="lucide:chevron-left" size={14} style={{ backgroundColor: panelTheme.muted }} />
            <span>{h.cta}</span>
          </button>
        </div>
      </section>

      <div className="space-y-5 order-1 xl:order-2">
        <Card title={h.summary.title} icon="lucide:chart-pie">
          <ul className="grid grid-cols-2 gap-3">
            {h.summary.cells.map((c) => (
              <li
                key={c.label}
                className="rounded-xl border p-3 flex items-center gap-3"
                style={{ borderColor: panelTheme.border }}
              >
                <span className="flex-1 text-right">
                  <span className="block text-[18px] font-black leading-none mb-1" style={{ color: panelTheme.navy }}>
                    {c.value}
                  </span>
                  <span className="block text-[10px] text-gray-500 leading-5">{c.label}</span>
                </span>
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${c.color}14` }}
                >
                  <Icon name={c.icon} size={16} style={{ backgroundColor: c.color }} />
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={h.filters.title} icon="lucide:filter">
          <label className="block text-right mb-3">
            <span className="block text-[11px] text-gray-500 mb-1.5">{h.filters.kindLabel}</span>
            <span
              className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold"
              style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
            >
              <Icon name="lucide:chevron-down" size={13} className="text-gray-400" />
              <span className="flex-1 text-right">{h.filters.kindValue}</span>
            </span>
          </label>

          <label className="block text-right mb-3">
            <span className="block text-[11px] text-gray-500 mb-1.5">{h.filters.rangeLabel}</span>
            <span
              className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold"
              style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
            >
              <Icon name="lucide:chevron-down" size={13} className="text-gray-400" />
              <span className="flex-1 text-right">{h.filters.rangeValue}</span>
            </span>
          </label>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: h.filters.toLabel, value: h.filters.toValue },
              { label: h.filters.fromLabel, value: h.filters.fromValue },
            ].map((f) => (
              <label key={f.label} className="block text-right">
                <span className="block text-[11px] text-gray-500 mb-1.5">{f.label}</span>
                <span
                  className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[11px] font-bold tabular-nums"
                  style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
                >
                  <Icon name="lucide:calendar" size={13} style={{ backgroundColor: panelTheme.muted }} />
                  <span className="flex-1 text-right">{f.value}</span>
                </span>
              </label>
            ))}
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-[12px] font-bold"
            style={{ borderColor: '#CDBEF5', color: panelTheme.violet }}
          >
            <Icon name="lucide:filter" size={14} style={{ backgroundColor: panelTheme.violet }} />
            <span>{h.filters.cta}</span>
          </button>
        </Card>
      </div>
    </div>
  );
}

/* ── Shared pieces ──────────────────────────────────────────── */

function Card({
  title,
  icon,
  footer,
  children,
}: {
  title: string;
  icon: string;
  footer?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border p-5 flex flex-col" style={{ borderColor: panelTheme.border }}>
      <h2 className="flex items-center gap-2 text-[13.5px] font-black mb-4" style={{ color: panelTheme.navy }}>
        <span className="flex-1 text-right">{title}</span>
        <Icon name={icon} size={16} style={{ backgroundColor: panelTheme.violet }} />
      </h2>

      <div className="flex-1">{children}</div>

      {footer && (
        <div className="text-center pt-4">
          <Link href={footer.href} className="text-[11.5px] font-bold" style={{ color: panelTheme.violet }}>
            {footer.label}
          </Link>
        </div>
      )}
    </section>
  );
}

/** Six axes, the person's shape over the organisation's average. */
function Radar({
  axes,
  legend,
}: {
  axes: { label: string; value: number; org: number }[];
  legend: { self: string; org: string };
}) {
  const size = 230;
  const cx = size / 2;
  const cy = size / 2;
  const rMax = 68;

  const point = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
    const r = (v / 100) * rMax;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  };

  const path = (key: 'value' | 'org') => axes.map((d, i) => point(i, d[key]).join(',')).join(' ');

  return (
    <>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[240px] mx-auto" role="img" aria-label="نمودار توانمندی‌ها">
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon
            key={s}
            points={axes.map((_, i) => point(i, s * 100).join(',')).join(' ')}
            fill="none"
            stroke="#EAECF5"
          />
        ))}
        {axes.map((_, i) => {
          const [x, y] = point(i, 100);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#F0F1F8" />;
        })}

        <polygon points={path('org')} fill="none" stroke="#B9BFD1" strokeDasharray="4 4" />
        <polygon points={path('value')} fill="rgba(91,52,214,0.14)" stroke={panelTheme.violet} strokeWidth="2" />

        {axes.map((d, i) => {
          const [x, y] = point(i, d.value);
          return <circle key={d.label} cx={x} cy={y} r="3" fill={panelTheme.violet} />;
        })}

        {axes.map((d, i) => {
          const [x, y] = point(i, 128);
          return (
            <text key={d.label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fill="#5D6480">
              {d.label} {toPersian(d.value)}
            </text>
          );
        })}
      </svg>

      <ul className="flex items-center justify-center gap-4 mt-1">
        <li className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <span className="w-4 h-[2px] rounded-full" style={{ backgroundColor: panelTheme.violet }} />
          <span>{legend.self}</span>
        </li>
        <li className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <span className="w-4 border-t-2 border-dashed" style={{ borderColor: '#B9BFD1' }} />
          <span>{legend.org}</span>
        </li>
      </ul>
    </>
  );
}

function Trend({
  months,
  series,
}: {
  months: string[];
  series: { id: string; label: string; color: string; dashed: boolean; values: number[] }[];
}) {
  const w = 340;
  const h = 180;
  const padX = 30;
  const padY = 20;
  const px = (i: number) => padX + (i * (w - padX * 2)) / (months.length - 1);
  const py = (v: number) => padY + ((100 - v) / 100) * (h - padY * 2);

  return (
    <>
      <ul className="flex items-center justify-center gap-4 mb-2">
        {series.map((s) => (
          <li key={s.id} className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span
              className={`w-4 ${s.dashed ? 'border-t-2 border-dashed' : 'h-[2px] rounded-full'}`}
              style={s.dashed ? { borderColor: s.color } : { backgroundColor: s.color }}
            />
            <span>{s.label}</span>
          </li>
        ))}
      </ul>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="روند نتایج">
        {[0, 25, 50, 75, 100].map((g) => (
          <g key={g}>
            <line x1={padX} y1={py(g)} x2={w - padX} y2={py(g)} stroke="#EEF0F7" />
            <text x={padX - 6} y={py(g) + 3} textAnchor="end" fontSize="8" fill="#9AA3B8">
              {toPersian(g)}
            </text>
          </g>
        ))}

        {series.map((s) => (
          <g key={s.id}>
            <polyline
              points={s.values.map((v, i) => `${px(i)},${py(v)}`).join(' ')}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeDasharray={s.dashed ? '5 4' : undefined}
            />
            {s.values.map((v, i) => (
              <g key={i}>
                <circle cx={px(i)} cy={py(v)} r="2.6" fill={s.color} />
                <text x={px(i)} y={py(v) - 7} textAnchor="middle" fontSize="8" fill="#5D6480">
                  {toPersian(v)}
                </text>
              </g>
            ))}
          </g>
        ))}

        {months.map((m, i) => (
          <text key={m} x={px(i)} y={h - 4} textAnchor="middle" fontSize="8" fill="#8B93A8">
            {m}
          </text>
        ))}
      </svg>
    </>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
