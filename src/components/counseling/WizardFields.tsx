'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   Form primitives shared by the counselling wizards: the labelled
   text field, the select stub, the rich-text box with its toolbar
   and the upload dropzone. All four wizards draw the same three,
   so they live here once.
────────────────────────────────────────────────────────────── */

const TOOLBAR = [
  'lucide:bold',
  'lucide:italic',
  'lucide:underline',
  'lucide:list-ordered',
  'lucide:list',
  'lucide:align-right',
  'lucide:align-center',
  'lucide:link-2',
  'lucide:image',
];

export interface FieldSpec {
  label: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  kind?: 'text' | 'select' | 'rich';
}

export function Field({ spec }: { spec: FieldSpec }) {
  const label = (
    <span className="block text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
      {spec.label}
      {spec.required && <span style={{ color: T.danger }}> *</span>}
    </span>
  );

  if (spec.kind === 'select') {
    return (
      <label className="block">
        {label}
        <span
          className="mt-2 flex items-center gap-2 px-3.5 py-3"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
          <span className="flex-1 text-right text-[11.5px]" style={{ color: T.muted }}>
            {spec.placeholder}
          </span>
        </span>
      </label>
    );
  }

  if (spec.kind === 'rich') {
    return (
      <label className="block">
        {label}
        <span
          className="mt-2 block overflow-hidden"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <span
            className="flex items-center gap-1 px-2 py-2 flex-wrap"
            style={{ backgroundColor: '#fafafd', borderBottom: `1px solid ${T.border}` }}
          >
            {TOOLBAR.map((ic) => (
              <span key={ic} className="w-7 h-7 flex items-center justify-center">
                <Icon name={ic} size={13} style={{ backgroundColor: T.muted }} />
              </span>
            ))}
          </span>
          <textarea
            rows={5}
            defaultValue={spec.value}
            placeholder={spec.placeholder}
            className="w-full px-4 py-3.5 text-right text-[11.5px] outline-none resize-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        </span>
      </label>
    );
  }

  return (
    <label className="block">
      {label}
      <input
        defaultValue={spec.value}
        placeholder={spec.placeholder}
        className="mt-2 w-full px-4 py-3 text-right text-[11.5px] outline-none placeholder:text-[#9396b0]"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
      />
    </label>
  );
}

export function Dropzone({
  title,
  hint,
  formats,
  limit,
}: {
  title: string;
  hint: string;
  formats?: string;
  limit?: string;
}) {
  return (
    <label
      className="flex flex-col items-center justify-center text-center px-4 py-9 cursor-pointer"
      style={{ borderRadius: R.md, border: `1.5px dashed ${T.primary}44`, backgroundColor: '#faf9ff' }}
    >
      <Icon name="lucide:cloud-upload" size={30} style={{ backgroundColor: T.primary }} />
      <span className="mt-3 text-[11.5px] font-extrabold" style={{ color: T.primary }}>
        {title}
      </span>
      <span className="mt-1 text-[10px]" style={{ color: T.primary }}>
        {hint}
      </span>
      {formats && (
        <span className="mt-2.5 text-[9px]" style={{ color: T.muted }}>
          {formats}
        </span>
      )}
      {limit && (
        <span className="text-[9px]" style={{ color: T.muted }}>
          {limit}
        </span>
      )}
      <input type="file" className="hidden" />
    </label>
  );
}

export function SummaryRows({
  rows,
}: {
  rows: { label: string; value: string; icon: string }[];
}) {
  return (
    <ul className="space-y-0">
      {rows.map((r, i) => (
        <li
          key={r.label}
          className="flex items-center gap-3 px-3 py-3.5"
          style={{ borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : undefined }}
        >
          <span className="flex-1 text-left text-[11.5px] font-bold" style={{ color: T.ink }}>
            {r.value}
          </span>
          <span className="flex items-center gap-2 shrink-0">
            <span className="text-[11px]" style={{ color: T.muted }}>
              {r.label}
            </span>
            <Icon name={r.icon} size={14} style={{ backgroundColor: T.primary }} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PayPanel({
  title,
  rows,
  total,
  action,
}: {
  title: string;
  rows: { label: string; value: string }[];
  total: { label: string; value: string };
  action: { label: string; icon: string };
}) {
  return (
    <div className="p-4" style={{ borderRadius: R.md, backgroundColor: '#faf9ff' }}>
      <h3 className="text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
        {title}
      </h3>

      <ul className="mt-3 space-y-2.5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2">
            <span className="flex-1 text-left text-[11px]" style={{ color: T.ink }}>
              {r.value}
            </span>
            <span className="text-[11px]" style={{ color: T.muted }}>
              {r.label}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="mt-3 pt-3 flex items-center gap-2"
        style={{ borderTop: `1px solid ${T.border}` }}
      >
        <span className="flex-1 text-left text-[14px] font-extrabold" style={{ color: T.primary }}>
          {total.value}
        </span>
        <span className="text-[12px] font-bold" style={{ color: T.ink }}>
          {total.label}
        </span>
      </div>

      <button
        className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
        style={{ borderRadius: R.md, backgroundColor: '#1c8a4e' }}
      >
        {action.label}
        <Icon name={action.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
      </button>
    </div>
  );
}
