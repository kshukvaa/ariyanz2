'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import {
  panelTheme,
  employeesHead,
  employeesStats,
  employeesTabs,
  employees,
  employeeFilters,
  employeeSearchLabel,
  employeeBulkActions,
  employeeRowMenu,
  orgTree,
  orgSummary,
  unitPanel,
  evalGroups,
  groupBuilder,
  excelImport,
  addEmployee,
  type EmployeesTab,
  type OrgNode,
} from '@/data/orgPanel';

/* ──────────────────────────────────────────────────────────────
   کارکنان — the roster, the org chart and the evaluation groups.

   Three tabs over one population: the list is for acting on people,
   the chart is for understanding where they sit, and the groups are
   the saved selections evaluations get assigned to.
────────────────────────────────────────────────────────────── */

type Drawer = 'add' | 'excel' | 'group' | null;

export default function EmployeesClient() {
  const [tab, setTab] = useState<EmployeesTab>('staff');
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [picked, setPicked] = useState<string[]>(['ali-ahmadi', 'mohammad-rezaei', 'zahra-nouri']);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [unit, setUnit] = useState<string | null>('sales-tehran');

  return (
    <div className="space-y-5">
      <Head onAdd={() => setDrawer('add')} onExcel={() => setDrawer('excel')} />
      <Stats />

      {/* Tabs sit centred, as drawn, with the active one underlined. */}
      <nav className="flex items-center justify-center gap-8 border-b" style={{ borderColor: panelTheme.border }}>
        {employeesTabs.map((t) => {
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

      <div className="grid gap-5" style={{ gridTemplateColumns: drawer ? undefined : undefined }}>
        <div className={drawer ? 'grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]' : ''}>
          <div className="min-w-0">
            {tab === 'staff' && (
              <StaffTable
                picked={picked}
                setPicked={setPicked}
                menuFor={menuFor}
                setMenuFor={setMenuFor}
              />
            )}
            {tab === 'structure' && <Structure unit={unit} setUnit={setUnit} />}
            {tab === 'groups' && <Groups onCreate={() => setDrawer('group')} />}
          </div>

          {drawer && (
            <aside className="min-w-0">
              {drawer === 'add' && <AddEmployeeDrawer onClose={() => setDrawer(null)} />}
              {drawer === 'excel' && <ExcelDrawer onClose={() => setDrawer(null)} />}
              {drawer === 'group' && <GroupDrawer onClose={() => setDrawer(null)} />}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Head ───────────────────────────────────────────────────── */

function Head({ onAdd, onExcel }: { onAdd: () => void; onExcel: () => void }) {
  return (
    <section className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3 order-1">
        <div className="text-right">
          <h1 className="flex items-center gap-2 text-[22px] font-black mb-2" style={{ color: panelTheme.navy }}>
            <span>{employeesHead.title}</span>
            <Icon name="lucide:users-round" size={22} style={{ backgroundColor: panelTheme.violet }} />
          </h1>
          <p className="text-[12px] text-gray-500 leading-7">{employeesHead.desc}</p>
        </div>
      </div>

      {/* RTL: the primary action reads first on the right, Excel to its left. */}
      <div className="flex items-center gap-3 order-2">
        <button
          onClick={onAdd}
          data-ripple
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: panelTheme.violet }}
        >
          <Icon name={employeesHead.primary.icon} size={15} className="text-white" />
          <span>{employeesHead.primary.label}</span>
        </button>

        <button
          onClick={onExcel}
          className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-[12.5px] font-bold transition-colors hover:border-violet-300"
          style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
        >
          <Icon name={employeesHead.secondary.icon} size={15} />
          <span>{employeesHead.secondary.label}</span>
        </button>

      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {employeesStats.map((s) => (
        <article
          key={s.id}
          className="bg-white rounded-2xl border p-5 flex items-center gap-4"
          style={{ borderColor: panelTheme.border }}
        >
          <span
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: s.tint }}
          >
            <Icon name={s.icon} size={24} style={{ backgroundColor: s.color }} />
          </span>
          <span className="flex-1 text-right">
            <span className="block text-[26px] font-black leading-none mb-1.5" style={{ color: panelTheme.navy }}>
              {s.value}
            </span>
            <span className="block text-[12.5px] font-bold" style={{ color: panelTheme.navy }}>
              {s.label}
            </span>
            {s.note && <span className="block text-[10.5px] text-gray-400 mt-1">{s.note}</span>}
          </span>
        </article>
      ))}
    </section>
  );
}

/* ── Staff table ────────────────────────────────────────────── */

function StaffTable({
  picked,
  setPicked,
  menuFor,
  setMenuFor,
}: {
  picked: string[];
  setPicked: (v: string[]) => void;
  menuFor: string | null;
  setMenuFor: (v: string | null) => void;
}) {
  const toggle = (id: string) =>
    setPicked(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id]);

  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      {/* Filters — search first on the right, then the four selects. */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="search"
            placeholder={employeeSearchLabel}
            aria-label={employeeSearchLabel}
            className="w-full border rounded-xl py-2.5 pr-10 pl-4 text-[12px] focus:outline-none focus:border-violet-400"
            style={{ borderColor: panelTheme.border }}
          />
          <Icon
            name="lucide:search"
            size={16}
            className="text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        {employeeFilters.map((f) => (
          <span
            key={f.id}
            className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold shrink-0"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            <Icon name="lucide:chevron-down" size={13} className="text-gray-400" />
            <span>{f.label}</span>
            <Icon name={f.icon} size={14} style={{ backgroundColor: panelTheme.muted }} />
          </span>
        ))}

        <button
          onClick={() => setPicked([])}
          className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold shrink-0 transition-colors hover:bg-gray-50"
          style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
        >
          <Icon name="lucide:funnel" size={14} style={{ backgroundColor: panelTheme.muted }} />
          <span>پاک کردن فیلترها</span>
        </button>
      </div>

      {/* Bulk bar appears only when a selection exists. */}
      {picked.length > 0 && (
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4 flex-wrap"
          style={{ backgroundColor: '#F4F2FE' }}
        >
          <button
            onClick={() => setPicked([])}
            aria-label="پاک کردن انتخاب"
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center"
          >
            <Icon name="lucide:x" size={15} style={{ backgroundColor: panelTheme.muted }} />
          </button>

          <span className="flex-1 text-[12px] font-bold text-right" style={{ color: panelTheme.navy }}>
            {toPersian(picked.length)} کارمند انتخاب شده
          </span>

          {employeeBulkActions.map((a) => (
            <button
              key={a.id}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[11.5px] font-bold transition-opacity hover:opacity-80"
              style={{ color: a.color }}
            >
              <Icon name={a.icon} size={14} style={{ backgroundColor: a.color }} />
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b" style={{ borderColor: panelTheme.border }}>
              <th className="py-3 pl-3 w-10">
                <input
                  type="checkbox"
                  aria-label="انتخاب همه"
                  checked={picked.length === employees.length}
                  onChange={() => setPicked(picked.length === employees.length ? [] : employees.map((e) => e.id))}
                  className="w-4 h-4 accent-violet-700"
                />
              </th>
              {['کارمند', 'کد پرسنلی', 'سمت', 'واحد / شعبه', 'ارزیابی‌ها', 'آخرین فعالیت', 'وضعیت', 'عملیات'].map((h) => (
                <th key={h} className="py-3 px-3 text-[11.5px] font-bold whitespace-nowrap" style={{ color: panelTheme.muted }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => {
              const on = picked.includes(e.id);
              return (
                <tr key={e.id} className="border-b last:border-0" style={{ borderColor: panelTheme.border }}>
                  <td className="py-3 pl-3">
                    <input
                      type="checkbox"
                      aria-label={`انتخاب ${e.name}`}
                      checked={on}
                      onChange={() => toggle(e.id)}
                      className="w-4 h-4 accent-violet-700"
                    />
                  </td>

                  <td className="py-3 px-3">
                    <Link href={`/org/employees/${e.id}`} className="flex items-center gap-3 group">
                      <img src={e.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <span className="min-w-0">
                        <span
                          className="block text-[12.5px] font-bold transition-colors group-hover:text-violet-700"
                          style={{ color: panelTheme.navy }}
                        >
                          {e.name}
                        </span>
                        <span className="block text-[10px] text-gray-400">{e.role}</span>
                      </span>
                    </Link>
                  </td>

                  <td className="py-3 px-3 text-[12px] tabular-nums" style={{ color: panelTheme.ink }}>
                    {e.code}
                  </td>
                  <td className="py-3 px-3 text-[12px]" style={{ color: panelTheme.ink }}>
                    {e.title}
                  </td>
                  <td className="py-3 px-3 text-[12px]" style={{ color: panelTheme.ink }}>
                    {e.unit}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    {e.evaluations.done > 0 || e.evaluations.pending > 0 ? (
                      <>
                        <span className="block text-[11px] font-bold" style={{ color: panelTheme.green }}>
                          {toPersian(e.evaluations.done)} تکمیل
                        </span>
                        {e.evaluations.pending > 0 && (
                          <span className="block text-[11px] font-bold" style={{ color: panelTheme.orange }}>
                            {toPersian(e.evaluations.pending)} در انتظار
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-[12px] text-gray-300">—</span>
                    )}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="block text-[11.5px]" style={{ color: panelTheme.ink }}>
                      {e.lastActivity.day}
                    </span>
                    {e.lastActivity.time && (
                      <span className="block text-[10px] text-gray-400 tabular-nums" dir="ltr">
                        {e.lastActivity.time}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10.5px] font-bold"
                      style={
                        e.active
                          ? { backgroundColor: '#E7F7EF', color: '#16A34A' }
                          : { backgroundColor: '#FDE8EC', color: '#E11D48' }
                      }
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: e.active ? '#16A34A' : '#E11D48' }}
                      />
                      <span>{e.active ? 'فعال' : 'غیرفعال'}</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 relative">
                    <button
                      onClick={() => setMenuFor(menuFor === e.id ? null : e.id)}
                      aria-label={`عملیات ${e.name}`}
                      aria-expanded={menuFor === e.id}
                      className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors hover:bg-gray-50"
                      style={{ borderColor: panelTheme.border }}
                    >
                      <Icon name="lucide:ellipsis" size={16} style={{ backgroundColor: panelTheme.muted }} />
                    </button>

                    {menuFor === e.id && (
                      <ul
                        className="absolute z-20 left-0 top-full mt-1 w-[190px] rounded-xl border bg-white py-1.5 shadow-lg"
                        style={{ borderColor: panelTheme.border }}
                      >
                        {employeeRowMenu.map((m) => (
                          <li key={m.id}>
                            <button
                              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[11.5px] font-bold transition-colors hover:bg-gray-50"
                              style={{ color: m.danger ? panelTheme.red : panelTheme.navy }}
                            >
                              <Icon
                                name={m.icon}
                                size={14}
                                style={{ backgroundColor: m.danger ? panelTheme.red : panelTheme.muted }}
                              />
                              <span className="flex-1 text-right">{m.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 flex-wrap">
        <span
          className="flex items-center gap-2 rounded-xl border px-3 py-2 text-[11.5px] font-bold shrink-0 whitespace-nowrap"
          style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
        >
          <Icon name="lucide:chevron-down" size={13} className="text-gray-400" />
          <span>۲۵ نفر در هر صفحه</span>
        </span>

        <Pager />

        <span className="text-[11.5px] shrink-0 whitespace-nowrap" style={{ color: panelTheme.ink }}>
          نمایش ۱ تا ۲۵ از ۲۴۸ کارمند
        </span>
      </div>
    </section>
  );
}

function Pager() {
  const cell =
    'w-9 h-9 flex items-center justify-center rounded-lg border text-[12px] font-bold transition-colors';
  return (
    <nav dir="ltr" className="flex items-center gap-1.5 flex-wrap" aria-label="صفحه‌بندی">
      <button aria-label="صفحه قبل" className={`${cell} bg-white`} style={{ borderColor: panelTheme.border }}>
        <Icon name="lucide:chevron-left" size={15} style={{ backgroundColor: panelTheme.navy }} />
      </button>
      {['1', '2', '3', '4', '…', '10'].map((n, i) =>
        n === '…' ? (
          <span key="gap" className="w-7 text-center text-gray-400">
            …
          </span>
        ) : (
          <button
            key={n}
            aria-current={i === 0 ? 'page' : undefined}
            className={cell}
            style={
              i === 0
                ? { backgroundColor: panelTheme.violet, borderColor: panelTheme.violet, color: '#fff' }
                : { backgroundColor: '#fff', borderColor: panelTheme.border, color: panelTheme.navy }
            }
          >
            {n}
          </button>
        )
      )}
      <button aria-label="صفحه بعد" className={`${cell} bg-white`} style={{ borderColor: panelTheme.border }}>
        <Icon name="lucide:chevron-right" size={15} style={{ backgroundColor: panelTheme.navy }} />
      </button>
    </nav>
  );
}

/* ── Structure ──────────────────────────────────────────────── */

function Structure({ unit, setUnit }: { unit: string | null; setUnit: (v: string | null) => void }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px] items-start">
      <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <span
            className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold"
            style={{ borderColor: panelTheme.violet, color: panelTheme.violet }}
          >
            <Icon name="lucide:workflow" size={14} style={{ backgroundColor: panelTheme.violet }} />
            <span>نمای درختی</span>
          </span>
          <span
            className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[11.5px] font-bold"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            <Icon name="lucide:list" size={14} style={{ backgroundColor: panelTheme.muted }} />
            <span>نمای لیستی</span>
          </span>

          <div className="relative flex-1 min-w-[180px]">
            <input
              type="search"
              placeholder="جستجو در واحدها و کارکنان..."
              aria-label="جستجو در واحدها و کارکنان"
              className="w-full border rounded-xl py-2.5 pr-10 pl-4 text-[12px] focus:outline-none focus:border-violet-400"
              style={{ borderColor: panelTheme.border }}
            />
            <Icon
              name="lucide:search"
              size={16}
              className="text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>

          {['lucide:maximize', 'lucide:sliders-horizontal'].map((i) => (
            <button
              key={i}
              aria-label="ابزار نمودار"
              className="w-10 h-10 rounded-xl border flex items-center justify-center"
              style={{ borderColor: panelTheme.border }}
            >
              <Icon name={i} size={16} style={{ backgroundColor: panelTheme.muted }} />
            </button>
          ))}
        </div>

        <Tree node={orgTree} active={unit} onPick={setUnit} root />

        <div
          className="mt-8 rounded-xl border p-4 max-w-[280px]"
          style={{ borderColor: panelTheme.border }}
        >
          <h3 className="text-[12.5px] font-black mb-3 text-right" style={{ color: panelTheme.navy }}>
            {orgSummary.title}
          </h3>
          <ul className="space-y-2.5">
            {orgSummary.rows.map((r) => (
              <li key={r.label} className="flex items-center gap-2">
                <Icon name={r.icon} size={14} style={{ backgroundColor: panelTheme.muted }} />
                <span className="flex-1 text-[11px] text-right" style={{ color: panelTheme.ink }}>
                  {r.label}
                </span>
                <span className="text-[12px] font-black" style={{ color: panelTheme.navy }}>
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <UnitPanel onClose={() => setUnit(null)} visible={unit !== null} />
    </div>
  );
}

/** The chart draws top-down; each level is centred under its parent. */
function Tree({
  node,
  active,
  onPick,
  root = false,
}: {
  node: OrgNode;
  active: string | null;
  onPick: (id: string) => void;
  root?: boolean;
}) {
  const on = active === node.id;

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onPick(node.id)}
        className="flex items-center gap-2.5 rounded-xl border bg-white px-4 py-3 transition-colors"
        style={{
          borderColor: on ? panelTheme.violet : panelTheme.border,
          boxShadow: on ? `0 0 0 1px ${panelTheme.violet}` : undefined,
        }}
      >
        <span className="text-right">
          <span className="block text-[12px] font-bold" style={{ color: panelTheme.navy }}>
            {node.label}
          </span>
          <span className="block text-[10px] text-gray-400">{node.people}</span>
        </span>
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${node.color}14` }}
        >
          <Icon name={node.icon} size={16} style={{ backgroundColor: node.color }} />
        </span>
      </button>

      {root && (
        <span
          className="inline-block text-[9.5px] font-bold px-2 py-0.5 rounded-md mt-1.5"
          style={{ backgroundColor: panelTheme.violetSoft, color: panelTheme.violet }}
        >
          سازمان اصلی
        </span>
      )}

      {node.children && (
        <>
          <span className="w-px h-6" style={{ backgroundColor: '#D9DCEA' }} />
          <div className="flex items-start gap-4 flex-wrap justify-center">
            {node.children.map((c) => (
              <div key={c.id} className="flex flex-col items-center">
                <span className="w-px h-4" style={{ backgroundColor: '#D9DCEA' }} />
                <Tree node={c} active={active} onPick={onPick} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function UnitPanel({ onClose, visible }: { onClose: () => void; visible: boolean }) {
  if (!visible) return null;

  return (
    <section
      /* DOM order is the layout: chart right, unit panel left. */
      className="bg-white rounded-2xl border p-5"
      style={{ borderColor: panelTheme.border }}
    >
      <div className="flex items-center justify-between mb-5">
        <button aria-label="بستن" onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center">
          <Icon name="lucide:x" size={16} style={{ backgroundColor: panelTheme.muted }} />
        </button>
        <h2 className="text-[14px] font-black" style={{ color: panelTheme.navy }}>
          فروش تهران
        </h2>
      </div>

      <div className="text-center mb-5">
        <span
          className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
          style={{ backgroundColor: '#E7F7EF' }}
        >
          <Icon name="lucide:shopping-cart" size={24} style={{ backgroundColor: panelTheme.green }} />
        </span>
        <p className="text-[12.5px] font-bold" style={{ color: panelTheme.navy }}>
          {unitPanel.unitLabel}
        </p>
        <p className="text-[11px] text-gray-400 mt-1">{unitPanel.staff}</p>
      </div>

      <div className="flex items-center gap-3 pb-4 mb-4 border-b" style={{ borderColor: panelTheme.border }}>
        <img src={unitPanel.manager.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
        <span className="flex-1 text-right">
          <span className="block text-[10.5px] text-gray-400">{unitPanel.manager.label}</span>
          <span className="block text-[12px] font-bold" style={{ color: panelTheme.navy }}>
            {unitPanel.manager.name}
          </span>
        </span>
      </div>

      <ul className="space-y-3 mb-4">
        {unitPanel.rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: panelTheme.violetSoft }}
            >
              <Icon name={r.icon} size={15} style={{ backgroundColor: panelTheme.violet }} />
            </span>
            <span className="flex-1 text-right">
              <span className="block text-[10.5px] text-gray-400">{r.label}</span>
              <span className="block text-[12px] font-bold" style={{ color: panelTheme.navy }}>
                {r.value}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mb-5">
        <p className="flex items-center justify-between text-[10.5px] mb-2">
          <span className="font-black" style={{ color: panelTheme.green }}>
            {toPersian(unitPanel.completion.percent)}٪
          </span>
          <span className="text-gray-400">{unitPanel.completion.label}</span>
        </p>
        <span className="block h-2 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
          <span
            className="block h-full rounded-full"
            style={{ width: `${unitPanel.completion.percent}%`, backgroundColor: panelTheme.green }}
          />
        </span>
      </div>

      <div className="space-y-2.5">
        {unitPanel.actions.map((a) => (
          <button
            key={a.id}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12px] font-bold transition-colors"
            style={
              a.kind === 'soft'
                ? { backgroundColor: panelTheme.violetSoft, color: panelTheme.violet }
                : a.kind === 'danger'
                  ? { backgroundColor: '#FDF2F4', color: panelTheme.red }
                  : { border: `1px solid ${panelTheme.border}`, color: panelTheme.navy }
            }
          >
            <Icon
              name={a.icon}
              size={15}
              style={{ backgroundColor: a.kind === 'danger' ? panelTheme.red : a.kind === 'soft' ? panelTheme.violet : panelTheme.muted }}
            />
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ── Groups ─────────────────────────────────────────────────── */

function Groups({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-[280px]">
          <input
            type="search"
            placeholder="جستجو در گروه‌ها..."
            aria-label="جستجو در گروه‌ها"
            className="w-full border rounded-xl py-2.5 pr-10 pl-4 text-[12px] focus:outline-none focus:border-violet-400"
            style={{ borderColor: panelTheme.border }}
          />
          <Icon
            name="lucide:search"
            size={16}
            className="text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <button
          onClick={onCreate}
          data-ripple
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: panelTheme.violet }}
        >
          <Icon name="lucide:plus" size={15} className="text-white" />
          <span>ایجاد گروه ارزیابی</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {evalGroups.map((g) => (
          <article
            key={g.id}
            className="rounded-xl border p-4 flex flex-col"
            style={{ borderColor: panelTheme.border }}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <span className="text-right">
                <span className="block text-[13px] font-black mb-1" style={{ color: panelTheme.navy }}>
                  {g.title}
                </span>
                <span className="block text-[16px] font-black" style={{ color: panelTheme.navy }}>
                  {g.people}
                </span>
              </span>
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: g.tint }}
              >
                <Icon name={g.icon} size={20} style={{ backgroundColor: g.color }} />
              </span>
            </div>

            <p className="text-[11px] text-gray-500 mb-2 text-right">{g.activeEvaluations}</p>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-black shrink-0" style={{ color: panelTheme.navy }}>
                {toPersian(g.percent)}٪
              </span>
              <span className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${g.percent}%`, backgroundColor: g.color }}
                />
              </span>
            </div>

            <p className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-4">
              <Icon name="lucide:calendar" size={11} />
              <span>{g.updated}</span>
            </p>

            <div className="mt-auto flex items-center gap-2">
              <button
                className="flex-1 rounded-xl border py-2.5 text-[11.5px] font-bold transition-colors hover:border-violet-300"
                style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
              >
                مشاهده گروه
              </button>
              <button
                aria-label="عملیات گروه"
                className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                style={{ borderColor: panelTheme.border }}
              >
                <Icon name="lucide:ellipsis" size={15} style={{ backgroundColor: panelTheme.muted }} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Drawers ────────────────────────────────────────────────── */

function DrawerFrame({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border p-5 xl:sticky xl:top-24" style={{ borderColor: panelTheme.border }}>
      <div className="flex items-center justify-between mb-5">
        <button aria-label="بستن" onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center">
          <Icon name="lucide:x" size={16} style={{ backgroundColor: panelTheme.muted }} />
        </button>
        <h2 className="text-[14.5px] font-black" style={{ color: panelTheme.navy }}>
          {title}
        </h2>
      </div>

      {children}

      {footer && <div className="flex items-center gap-3 mt-5">{footer}</div>}
    </section>
  );
}

function AddEmployeeDrawer({ onClose }: { onClose: () => void }) {
  return (
    <DrawerFrame
      title={addEmployee.title}
      onClose={onClose}
      footer={
        <>
          <button
            data-ripple
            className="flex-1 rounded-xl py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: panelTheme.violet }}
          >
            {addEmployee.submit}
          </button>
          <button
            onClick={onClose}
            className="w-24 rounded-xl border py-3 text-[12.5px] font-bold"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            {addEmployee.cancel}
          </button>
        </>
      }
    >
      {addEmployee.sections.map((s) => (
        <div key={s.title} className="mb-5">
          <h3 className="text-[12.5px] font-black mb-3 text-right" style={{ color: panelTheme.navy }}>
            {s.title}
          </h3>

          <div className="space-y-3">
            {s.fields.map((f) => (
              <label key={f.id} className="block text-right">
                <span className="block text-[11.5px] font-bold mb-1.5" style={{ color: panelTheme.ink }}>
                  {f.label}
                  {f.required && <span style={{ color: panelTheme.red }}> *</span>}
                </span>

                <span className="relative block">
                  <input
                    placeholder={f.placeholder}
                    aria-label={f.label}
                    className="w-full border rounded-xl py-2.5 px-3.5 text-[11.5px] focus:outline-none focus:border-violet-400"
                    style={{ borderColor: panelTheme.border }}
                  />
                  {(f.select || f.date) && (
                    <Icon
                      name={f.date ? 'lucide:calendar' : 'lucide:chevron-down'}
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ backgroundColor: panelTheme.muted }}
                    />
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <label className="flex items-center gap-2.5 text-right">
        <input type="checkbox" defaultChecked className="w-4 h-4 accent-violet-700" />
        <span className="text-[11.5px]" style={{ color: panelTheme.ink }}>
          {addEmployee.inviteLabel}
        </span>
      </label>
    </DrawerFrame>
  );
}

function ExcelDrawer({ onClose }: { onClose: () => void }) {
  return (
    <DrawerFrame
      title={excelImport.title}
      onClose={onClose}
      footer={
        <button
          data-ripple
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: panelTheme.violet }}
        >
          <Icon name="lucide:user-round-plus" size={15} className="text-white" />
          <span>{excelImport.submit}</span>
        </button>
      }
    >
      <ol className="space-y-5">
        {excelImport.steps.map((s, i) => (
          <li key={s.n} className="flex items-start gap-3">
            <span className="flex flex-col items-center shrink-0">
              <span
                className="w-8 h-8 rounded-full border-2 bg-white flex items-center justify-center text-[10.5px] font-black"
                style={{ borderColor: panelTheme.violet, color: panelTheme.violet }}
              >
                {s.n}
              </span>
              {i < excelImport.steps.length - 1 && (
                <span className="w-px flex-1 min-h-[26px] mt-1" style={{ backgroundColor: '#DCD8F6' }} />
              )}
            </span>

            <span className="flex-1 text-right min-w-0">
              <span className="block text-[12.5px] font-black mb-1" style={{ color: panelTheme.navy }}>
                {s.title}
              </span>
              <span className="block text-[11px] text-gray-500 leading-6 mb-2">{s.desc}</span>

              {s.cta && (
                <button
                  className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[11.5px] font-bold"
                  style={{ borderColor: '#CDBEF5', color: panelTheme.violet }}
                >
                  <Icon name="lucide:download" size={14} style={{ backgroundColor: panelTheme.violet }} />
                  <span>{s.cta}</span>
                </button>
              )}

              {i === 1 && (
                <span
                  className="flex items-center gap-2.5 rounded-xl border p-3"
                  style={{ borderColor: panelTheme.border }}
                >
                  <Icon name="lucide:circle-check" size={16} style={{ backgroundColor: panelTheme.green }} />
                  <span className="flex-1 text-[11px] text-right" style={{ color: panelTheme.ink }}>
                    {excelImport.file.name} ({excelImport.file.size})
                  </span>
                  <Icon name="lucide:file-spreadsheet" size={18} style={{ backgroundColor: panelTheme.green }} />
                </span>
              )}

              {i === 2 && (
                <span className="block">
                  <span
                    className="grid grid-cols-3 rounded-xl border overflow-hidden mb-2"
                    style={{ borderColor: panelTheme.border }}
                  >
                    {excelImport.tally.map((t) => (
                      <span key={t.label} className="p-3 text-center border-l last:border-l-0" style={{ borderColor: panelTheme.border }}>
                        <span className="block text-[16px] font-black" style={{ color: t.color }}>
                          {t.value}
                        </span>
                        <span className="flex items-center justify-center gap-1 text-[10px] text-gray-500 mt-1">
                          <Icon name={t.icon} size={11} style={{ backgroundColor: t.color }} />
                          <span>{t.label}</span>
                        </span>
                      </span>
                    ))}
                  </span>

                  <button className="flex items-center gap-1.5 text-[11.5px] font-bold mx-auto" style={{ color: panelTheme.violet }}>
                    <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: panelTheme.violet }} />
                    <span>{excelImport.errorsCta}</span>
                  </button>
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </DrawerFrame>
  );
}

function GroupDrawer({ onClose }: { onClose: () => void }) {
  const [method, setMethod] = useState('rules');

  return (
    <DrawerFrame
      title={groupBuilder.title}
      onClose={onClose}
      footer={
        <>
          <button
            data-ripple
            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: panelTheme.violet }}
          >
            <Icon name="lucide:users-round" size={15} className="text-white" />
            <span>{groupBuilder.submit}</span>
          </button>
          <button
            onClick={onClose}
            className="w-24 rounded-xl border py-3 text-[12.5px] font-bold"
            style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
          >
            {groupBuilder.cancel}
          </button>
        </>
      }
    >
      <h3 className="text-[12.5px] font-black mb-3 text-right" style={{ color: panelTheme.navy }}>
        اطلاعات گروه
      </h3>

      <label className="block text-right mb-3">
        <span className="block text-[11.5px] font-bold mb-1.5" style={{ color: panelTheme.ink }}>
          {groupBuilder.nameLabel}
          <span style={{ color: panelTheme.red }}> *</span>
        </span>
        <input
          defaultValue={groupBuilder.namePlaceholder}
          aria-label={groupBuilder.nameLabel}
          className="w-full border rounded-xl py-2.5 px-3.5 text-[11.5px] focus:outline-none focus:border-violet-400"
          style={{ borderColor: panelTheme.border }}
        />
      </label>

      <label className="block text-right mb-4">
        <span className="block text-[11.5px] font-bold mb-1.5" style={{ color: panelTheme.ink }}>
          {groupBuilder.descLabel}
        </span>
        <textarea
          defaultValue={groupBuilder.descPlaceholder}
          aria-label={groupBuilder.descLabel}
          rows={2}
          className="w-full border rounded-xl py-2.5 px-3.5 text-[11.5px] leading-7 focus:outline-none focus:border-violet-400 resize-none"
          style={{ borderColor: panelTheme.border }}
        />
      </label>

      <h3 className="text-[12.5px] font-black mb-3 text-right" style={{ color: panelTheme.navy }}>
        {groupBuilder.methodLabel}
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {groupBuilder.methods.map((m) => {
          const on = method === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              aria-pressed={on}
              className="rounded-xl border p-3 text-right transition-colors"
              style={{ borderColor: on ? panelTheme.violet : panelTheme.border }}
            >
              <span className="flex items-center gap-2 mb-1">
                <span
                  className="w-[15px] h-[15px] rounded-full border shrink-0 flex items-center justify-center"
                  style={{ borderColor: on ? panelTheme.violet : '#D5D8E6' }}
                >
                  {on && <span className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: panelTheme.violet }} />}
                </span>
                <span className="text-[12px] font-bold" style={{ color: panelTheme.navy }}>
                  {m.label}
                </span>
              </span>
              <span className="block text-[10px] text-gray-500 leading-5">{m.desc}</span>
            </button>
          );
        })}
      </div>

      {method === 'rules' && (
        <>
          <ul className="space-y-2.5 mb-3">
            {groupBuilder.rules.map((r, i) => (
              <li key={r.field} className="flex items-center gap-2">
                <button aria-label="حذف شرط" className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <Icon name="lucide:trash-2" size={14} style={{ backgroundColor: panelTheme.muted }} />
                </button>

                <span
                  className="flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[11px] font-bold flex-1"
                  style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
                >
                  <Icon name="lucide:chevron-down" size={12} className="text-gray-400" />
                  <span className="flex-1 text-right">{r.value}</span>
                </span>

                <span className="text-[11px] text-gray-400 shrink-0">{r.op}</span>

                <span
                  className="rounded-lg border px-2.5 py-2 text-[11px] font-bold flex-1 text-right"
                  style={{ borderColor: panelTheme.border, color: panelTheme.navy }}
                >
                  {r.field}
                </span>

                {i < groupBuilder.rules.length - 1 && (
                  <span className="text-[10px] text-gray-400 shrink-0">و</span>
                )}
              </li>
            ))}
          </ul>

          <button
            className="w-full rounded-xl border border-dashed py-2.5 text-[11.5px] font-bold mb-4"
            style={{ borderColor: '#CDBEF5', color: panelTheme.violet }}
          >
            + {groupBuilder.addRule}
          </button>

          <p
            className="flex items-center gap-3 rounded-xl p-3.5 mb-1"
            style={{ backgroundColor: '#E7F7EF' }}
          >
            <Icon name="lucide:users-round" size={20} style={{ backgroundColor: panelTheme.green }} />
            <span className="flex-1 text-right">
              <span className="block text-[10.5px] text-gray-600">{groupBuilder.matchNote}</span>
              <span className="block text-[18px] font-black" style={{ color: panelTheme.green }}>
                {groupBuilder.matchCount}
              </span>
              <span className="block text-[10.5px] text-gray-600">{groupBuilder.matchNoteTail}</span>
            </span>
          </p>
        </>
      )}
    </DrawerFrame>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
