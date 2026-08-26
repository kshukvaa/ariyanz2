import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   Form primitives shared by the assessment and programme wizards.

   Every control here is presentational: the mockups are the spec
   and these screens are a walkthrough, so the inputs carry their
   mockup values as defaults rather than being wired to a store.
────────────────────────────────────────────────────────────── */

export function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="flex items-center justify-end gap-1 text-[12.5px] font-bold" style={{ color: T.ink }}>
      {required && <em className="not-italic" style={{ color: T.danger }}>*</em>}
      {children}
    </span>
  );
}

export function TextField({
  label,
  placeholder,
  counter,
  required,
  rows,
}: {
  label: string;
  placeholder: string;
  counter?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <Label required={required}>{label}</Label>
      <span
        className="relative block bg-white"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
      >
        {rows ? (
          <textarea
            rows={rows}
            placeholder={placeholder}
            className="w-full resize-none bg-transparent px-4 pt-3 pb-7 text-[12.5px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        ) : (
          <input
            placeholder={placeholder}
            className="w-full bg-transparent px-4 py-3.5 text-[12.5px] outline-none placeholder:text-[#9396b0]"
            style={{ color: T.ink }}
          />
        )}
        {counter && (
          <span
            className="absolute bottom-2 left-3 text-[10.5px] tabular-nums"
            style={{ color: T.muted }}
          >
            {counter}
          </span>
        )}
      </span>
    </label>
  );
}

export function SelectField({
  label,
  value,
  required,
  icon,
}: {
  label: string;
  value: string;
  required?: boolean;
  icon?: string;
}) {
  return (
    <label className="block space-y-2">
      <Label required={required}>{label}</Label>
      <span
        className="flex items-center gap-2.5 bg-white px-4 py-3.5"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
      >
        <Icon name="lucide:chevron-down" size={15} style={{ backgroundColor: T.muted }} />
        <span className="flex-1 text-right text-[12.5px] font-semibold" style={{ color: T.ink }}>
          {value}
        </span>
        {icon && <Icon name={icon} size={15} style={{ backgroundColor: T.muted }} />}
      </span>
    </label>
  );
}

/** A bare select used inside filter rows, where the label sits above in grey. */
export function MiniSelect({ label, hint }: { label: string; hint?: string }) {
  return (
    <span
      className="flex items-center gap-2 bg-white px-3.5 py-2.5 min-w-[130px]"
      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
    >
      <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
      <span className="flex-1 text-right leading-tight">
        {hint && (
          <span className="block text-[9.5px]" style={{ color: T.muted }}>
            {hint}
          </span>
        )}
        <span className="block text-[12px] font-semibold" style={{ color: T.ink }}>
          {label}
        </span>
      </span>
    </span>
  );
}

export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <label
      className="flex items-center gap-2.5 bg-white px-3.5 py-2.5 flex-1 min-w-[200px]"
      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
    >
      <Icon name="lucide:search" size={15} style={{ backgroundColor: T.muted }} />
      <input
        type="search"
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent text-[12px] outline-none placeholder:text-[#9396b0]"
        style={{ color: T.ink }}
      />
    </label>
  );
}

export function Check({ on }: { on: boolean }) {
  return (
    <span
      className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
      style={{
        borderRadius: 5,
        backgroundColor: on ? T.primaryStrong : '#fff',
        border: on ? 'none' : `1.5px solid #d7d9e6`,
      }}
    >
      {on && <Icon name="lucide:check" size={12} className="text-white" />}
    </span>
  );
}

export function Radio({ on }: { on: boolean }) {
  return (
    <span
      className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
      style={{ border: `1.5px solid ${on ? T.primaryStrong : '#d7d9e6'}` }}
    >
      {on && (
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: T.primaryStrong }}
        />
      )}
    </span>
  );
}

export function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className="w-[38px] h-[21px] rounded-full flex items-center px-[3px] shrink-0"
      style={{
        backgroundColor: on ? T.primaryStrong : '#d7d9e6',
        justifyContent: on ? 'flex-start' : 'flex-end',
      }}
    >
      <span className="w-[15px] h-[15px] rounded-full bg-white" />
    </span>
  );
}

/** The pale tinted advice box that closes most wizard sidebars. */
export function NoteCard({
  title,
  children,
  icon = 'lucide:circle-alert',
  tint = T.tintPurple,
  fg = T.primary,
}: {
  title: string;
  children: React.ReactNode;
  icon?: string;
  tint?: string;
  fg?: string;
}) {
  return (
    <div className="p-4" style={{ borderRadius: R.lg, backgroundColor: tint }}>
      <div className="flex items-center justify-end gap-2">
        <h3 className="text-[12.5px] font-extrabold" style={{ color: fg }}>
          {title}
        </h3>
        <Icon name={icon} size={16} style={{ backgroundColor: fg }} />
      </div>
      <div className="mt-2 text-right text-[11.5px] leading-6" style={{ color: T.ink }}>
        {children}
      </div>
    </div>
  );
}

export function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-white ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

export function PanelHead({
  title,
  desc,
  icon,
  fg = T.primary,
  bg = T.tintPurple,
}: {
  title: string;
  desc?: string;
  icon?: string;
  fg?: string;
  bg?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-5">
      <div className="flex-1 text-right">
        <h2 className="text-[16px] font-extrabold" style={{ color: fg }}>
          {title}
        </h2>
        {desc && (
          <p className="mt-1 text-[12px] leading-6" style={{ color: T.muted }}>
            {desc}
          </p>
        )}
      </div>
      {icon && (
        <span
          className="w-11 h-11 flex items-center justify-center shrink-0"
          style={{ borderRadius: R.md, backgroundColor: bg }}
        >
          <Icon name={icon} size={21} style={{ backgroundColor: fg }} />
        </span>
      )}
    </div>
  );
}
