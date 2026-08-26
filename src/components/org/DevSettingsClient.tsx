'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { Panel } from '@/components/org/panel/ReportShell';
import { Toggle, Check, Radio, Select } from '@/components/org/wizard/WizardParts';
import { T, R } from '@/data/panelTokens';
import {
  devSettingsHead,
  devSettingsNav,
  devSettingsGeneral,
  devSettingsStates,
  devSettingsInterventions,
  devSettingsSuccess,
  devSettingsWorkflow,
  devSettingsNotifications,
  devSettingsAccess,
  devSettingsSources,
  devSettingsAi,
  devSettingsAudit,
  devSettingsExport,
} from '@/data/orgDevAdmin';

/* ──────────────────────────────────────────────────────────────
   Development module settings.

   A single scrolling page with a section index rather than nested
   routes — every group is short, and an administrator changing
   one rule usually wants to see the neighbouring ones.
────────────────────────────────────────────────────────────── */

export default function DevSettingsClient() {
  const [section, setSection] = useState('general');

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <button
          className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:refresh-cw" size={16} style={{ backgroundColor: T.muted }} />
          {devSettingsHead.reset}
        </button>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2.5">
            <h1 className="text-[24px] font-extrabold" style={{ color: T.ink }}>
              {devSettingsHead.title}
            </h1>
            <Icon name="lucide:settings" size={22} style={{ backgroundColor: T.primary }} />
          </div>
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {devSettingsHead.desc}
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[260px_1fr] items-start">
        {/* Section index — RTL puts the first column on the right. */}
        <nav
          className="bg-white p-2 xl:sticky xl:top-24"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <ul className="space-y-0.5">
            {devSettingsNav.map((n) => {
              const on = n.id === section;
              return (
                <li key={n.id}>
                  <button
                    onClick={() => setSection(n.id)}
                    aria-current={on ? 'true' : undefined}
                    className="w-full flex items-center gap-2.5 px-3.5 py-3 text-[12px] transition-colors"
                    style={{
                      borderRadius: R.md,
                      backgroundColor: on ? T.tintPurple : 'transparent',
                      color: on ? T.primary : T.ink,
                      fontWeight: on ? 800 : 500,
                    }}
                  >
                    <Icon name={n.icon} size={16} style={{ backgroundColor: on ? T.primary : T.muted }} />
                    <span className="flex-1 text-right">{n.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0 space-y-4">
          {/* General + lifecycle states */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Panel title={devSettingsGeneral.title}>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {devSettingsGeneral.fields.map((f) => (
                  <label key={f.label} className="block">
                    <span className="block text-right text-[10px]" style={{ color: T.muted }}>
                      {f.label}
                    </span>
                    <Select value={f.value} />
                  </label>
                ))}
              </div>
            </Panel>

            <Panel title={devSettingsStates.title} cta={devSettingsStates.cta}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsStates.desc}
              </p>
              <ul className="space-y-2">
                {devSettingsStates.rows.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center gap-2.5 p-2.5"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                  >
                    <Icon name="lucide:grid-2x2" size={13} style={{ backgroundColor: T.muted }} />
                    <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: r.colour }} />
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          {/* Intervention types */}
          <Panel title={devSettingsInterventions.title} cta={devSettingsInterventions.all}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-white"
                style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
              >
                <Icon name="lucide:plus" size={13} className="text-white" />
                {devSettingsInterventions.cta}
              </button>
              <p className="text-right text-[9.5px]" style={{ color: T.muted }}>
                {devSettingsInterventions.desc}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-right border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#fafafc' }}>
                    {[
                      devSettingsInterventions.cols.ops,
                      devSettingsInterventions.cols.usable,
                      devSettingsInterventions.cols.evidence,
                      devSettingsInterventions.cols.approval,
                      devSettingsInterventions.cols.active,
                      devSettingsInterventions.cols.kind,
                    ].map((c) => (
                      <th key={c} className="px-3 py-2.5 text-[10px] font-bold whitespace-nowrap" style={{ color: T.muted }}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {devSettingsInterventions.rows.map((r) => (
                    <tr key={r.kind} style={{ borderTop: `1px solid ${T.border}` }}>
                      <td className="px-3 py-2.5">
                        <span className="flex items-center gap-1.5">
                          <Icon name="lucide:ellipsis" size={14} style={{ backgroundColor: T.muted }} />
                          <Icon name="lucide:pencil" size={13} style={{ backgroundColor: T.muted }} />
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[10px]" style={{ color: T.ink }}>
                        {r.usable}
                      </td>
                      <td className="px-3 py-2.5 text-[9.5px]" style={{ color: T.muted }}>
                        {r.evidence}
                      </td>
                      <td className="px-3 py-2.5 text-[10px]" style={{ color: T.ink }}>
                        {r.approval}
                      </td>
                      <td className="px-3 py-2.5">
                        <Toggle on={r.active} />
                      </td>
                      <td className="px-3 py-2.5 text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {r.kind}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          {/* Success model + workflow + notifications */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Panel title={devSettingsSuccess.title} cta={devSettingsSuccess.cta}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsSuccess.desc}
              </p>
              <ul className="space-y-2.5">
                {devSettingsSuccess.rows.map((r) => (
                  <li key={r.label} className="flex items-center gap-2">
                    {r.check ? (
                      <Check on />
                    ) : (
                      <span
                        className="flex items-center gap-1 px-2 py-1 shrink-0"
                        style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                      >
                        <span className="text-[9px]" style={{ color: T.muted }}>
                          {r.unit}
                        </span>
                        <span className="text-[10.5px] font-bold" style={{ color: T.ink }}>
                          {r.value}
                        </span>
                      </span>
                    )}
                    <span className="text-[9px] shrink-0" style={{ color: T.muted }}>
                      {r.op}
                    </span>
                    <span className="flex-1 text-right text-[10px]" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <Icon name={r.icon} size={14} style={{ backgroundColor: T.primary }} />
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title={devSettingsWorkflow.title} cta={devSettingsWorkflow.cta}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsWorkflow.desc}
              </p>
              <ul className="space-y-3">
                {devSettingsWorkflow.rows.map((r) => (
                  <li key={r.label}>
                    <span className="block text-right text-[10.5px] font-bold mb-1.5" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <span className="flex items-center gap-1 justify-end flex-wrap">
                      {r.steps.map((s, i) => (
                        <React.Fragment key={s}>
                          {i > 0 && (
                            <Icon name="lucide:chevron-left" size={11} style={{ backgroundColor: T.muted }} />
                          )}
                          <span
                            className="px-2 py-1 text-[9px] font-semibold"
                            style={{ borderRadius: R.sm, backgroundColor: '#fafafc', color: T.ink }}
                          >
                            {s}
                          </span>
                        </React.Fragment>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title={devSettingsNotifications.title} cta={devSettingsNotifications.cta}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsNotifications.desc}
              </p>
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr>
                    {[devSettingsNotifications.cols.state, devSettingsNotifications.cols.via, devSettingsNotifications.cols.event].map(
                      (c) => (
                        <th key={c} className="pb-2 text-[9px] font-bold" style={{ color: T.muted }}>
                          {c}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {devSettingsNotifications.rows.map((r) => (
                    <tr key={r.event} style={{ borderTop: `1px solid ${T.border}` }}>
                      <td className="py-2 text-[9.5px] font-bold" style={{ color: T.successStrong }}>
                        {r.state}
                      </td>
                      <td className="py-2">
                        <span className="flex items-center gap-1.5 justify-end">
                          <Icon name="lucide:mail" size={12} style={{ backgroundColor: T.muted }} />
                          <Icon name="lucide:bell" size={12} style={{ backgroundColor: T.accent }} />
                        </span>
                      </td>
                      <td className="py-2 text-[10px]" style={{ color: T.ink }}>
                        {r.event}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
          </div>

          {/* Access + sources + AI */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Panel title={devSettingsAccess.title} cta={devSettingsAccess.cta}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsAccess.desc}
              </p>
              <ul className="space-y-2">
                {devSettingsAccess.rows.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center gap-2.5 p-2.5"
                    style={{
                      borderRadius: R.md,
                      backgroundColor: r.on ? T.tintPurple : 'transparent',
                      border: `1px solid ${r.on ? '#d8d2fb' : T.border}`,
                    }}
                  >
                    <span className="flex-1 text-right min-w-0">
                      <span className="block text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {r.label}
                      </span>
                      <span className="block text-[9px]" style={{ color: T.muted }}>
                        {r.note}
                      </span>
                    </span>
                    <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title={devSettingsSources.title} cta={devSettingsSources.cta}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsSources.desc}
              </p>
              {devSettingsSources.groups.map((g) => (
                <div key={g.label} className="mb-3">
                  <span className="block text-right text-[10px] font-extrabold mb-1.5" style={{ color: T.ink }}>
                    {g.label}
                  </span>
                  <ul className="space-y-1.5">
                    {g.rows.map((r) => (
                      <li key={r.label} className="flex items-center gap-2 text-[10px]">
                        <span
                          className="flex items-center gap-1 shrink-0"
                          style={{ color: r.on ? T.successStrong : T.muted }}
                        >
                          {r.state}
                          <Icon
                            name={r.on ? 'lucide:check' : 'lucide:minus'}
                            size={11}
                            style={{ backgroundColor: r.on ? T.successStrong : T.muted }}
                          />
                        </span>
                        <span className="flex-1 text-right" style={{ color: T.ink }}>
                          {r.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Panel>

            <Panel title={devSettingsAi.title}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsAi.desc}
              </p>

              <div className="flex items-center gap-2.5">
                <Toggle on={devSettingsAi.toggle.on} />
                <span className="flex-1 text-right text-[10.5px] font-bold" style={{ color: T.ink }}>
                  {devSettingsAi.toggle.label}
                </span>
              </div>

              <span className="block mt-3 text-right text-[10px] font-extrabold" style={{ color: T.ink }}>
                {devSettingsAi.levelLabel}
              </span>
              <ul className="mt-1.5 space-y-2">
                {devSettingsAi.levels.map((l) => (
                  <li key={l.id} className="flex items-start gap-2.5">
                    <Radio on={l.on} />
                    <span className="flex-1 text-right">
                      <span className="block text-[10px] font-bold" style={{ color: T.ink }}>
                        {l.label}
                      </span>
                      <span className="block text-[8.5px]" style={{ color: T.muted }}>
                        {l.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <span className="block mt-3 text-right text-[10px] font-extrabold" style={{ color: T.ink }}>
                {devSettingsAi.scopeLabel}
              </span>
              <ul className="mt-1.5 space-y-1.5">
                {devSettingsAi.scopes.map((s) => (
                  <li key={s} className="flex items-center gap-2.5">
                    <Check on />
                    <span className="flex-1 text-right text-[10px]" style={{ color: T.ink }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          {/* Export + audit */}
          <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <Panel title={devSettingsExport.title}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsExport.desc}
              </p>

              <span className="block text-right text-[10px] font-bold mb-1.5" style={{ color: T.ink }}>
                {devSettingsExport.exportLabel}
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {devSettingsExport.formats.map((f) => (
                  <button
                    key={f.label}
                    className="flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: f.fg }}
                  >
                    <Icon name={f.icon} size={14} style={{ backgroundColor: f.fg }} />
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
                <span className="flex items-center justify-between text-[9.5px]">
                  <span className="font-bold" style={{ color: T.ink }}>
                    {devSettingsExport.last}
                  </span>
                  <span style={{ color: T.muted }}>{devSettingsExport.lastLabel}</span>
                </span>
                <button
                  className="mt-2 w-full flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-bold"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
                >
                  <Icon name="lucide:hard-drive-download" size={13} style={{ backgroundColor: T.primary }} />
                  {devSettingsExport.cta}
                </button>
              </div>
            </Panel>

            <Panel title={devSettingsAudit.title} cta={devSettingsAudit.cta}>
              <p className="text-right text-[9.5px] mb-2.5" style={{ color: T.muted }}>
                {devSettingsAudit.desc}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[440px] text-right border-collapse">
                  <thead>
                    <tr>
                      {[devSettingsAudit.cols.where, devSettingsAudit.cols.when, devSettingsAudit.cols.what, devSettingsAudit.cols.who].map(
                        (c) => (
                          <th key={c} className="pb-2 text-[9px] font-bold whitespace-nowrap" style={{ color: T.muted }}>
                            {c}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {devSettingsAudit.rows.map((r) => (
                      <tr key={r.what} style={{ borderTop: `1px solid ${T.border}` }}>
                        <td className="py-2.5 text-[9.5px] whitespace-nowrap" style={{ color: T.muted }}>
                          {r.where}
                        </td>
                        <td className="py-2.5 text-[9.5px] whitespace-nowrap" style={{ color: T.muted }}>
                          {r.when}
                        </td>
                        <td className="py-2.5 text-[10px]" style={{ color: T.ink }}>
                          {r.what}
                        </td>
                        <td className="py-2.5 text-[10px] font-bold whitespace-nowrap" style={{ color: T.ink }}>
                          {r.who}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          {/* Save bar */}
          <div className="flex items-center gap-3 justify-start">
            <button
              data-ripple
              className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:save" size={16} className="text-white" />
              {devSettingsHead.save}
            </button>

            <button
              className="px-6 py-3 text-[12.5px] font-bold bg-white"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              {devSettingsHead.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
