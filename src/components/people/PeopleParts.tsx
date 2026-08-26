'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the two people directories — مدرسین آریاز
   and نویسندگان آریاز.

   The two mockups draw the same page twice with different nouns:
   same tinted hero with a stat strip, same filter rail on the
   right, same 4-up card grid, same "suggested for you" carousel
   at the foot. Only the card's innards differ — an instructor
   card counts courses and students and saves with a heart, an
   author card counts articles and books and saves with a
   bookmark. So the shell lives here once and the card is driven
   by data rather than forked.

   RTL: the first declared grid column lands on the RIGHT. The
   filter rail is on the right in both mockups, so it is declared
   first.
────────────────────────────────────────────────────────────── */

/* Measured off «ariaz teachers.png» / «ariaz writers.png». */
export const PEOPLE_TINT = '#f4f2fd';

export const tagTone: Record<string, { fg: string; bg: string }> = {
  violet: { fg: T.primary, bg: T.tintPurple },
  orange: { fg: '#c2600a', bg: T.tintOrange },
  green: { fg: T.successStrong, bg: T.tintGreen },
  red: { fg: T.danger, bg: T.tintRed },
  blue: { fg: T.infoStrong, bg: T.tintBlue },
  grey: { fg: T.muted, bg: '#f4f4f8' },
};

export interface PersonTag {
  label: string;
  tone?: keyof typeof tagTone;
}

export interface PersonStat {
  value: string;
  label: string;
  fg?: string;
}

export interface Person {
  id: string;
  name: string;
  title: string;
  avatar: string;
  online?: boolean;
  rating?: string;
  meta?: string;
  tags: PersonTag[];
  stats: PersonStat[];
  lastLabel: string;
  last: string;
  href: string;
}

/* ── Hero band ────────────────────────────────────────────────── */

export function PeopleHero({
  title,
  desc,
  stats,
  art,
  artAlt = '',
}: {
  title: string;
  desc: string[];
  stats: { value: string; label: string; icon: string }[];
  art: string;
  artAlt?: string;
}) {
  return (
    <section style={{ backgroundColor: PEOPLE_TINT }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-center">
          {/* Copy is declared first → lands on the right. */}
          <div className="text-right">
            <h1 className="text-[28px] sm:text-[34px] font-extrabold" style={{ color: T.ink }}>
              {title}
            </h1>
            <p className="mt-3 text-[13px] leading-8" style={{ color: T.ink }}>
              {desc.map((d) => (
                <React.Fragment key={d}>
                  {d}
                  <br />
                </React.Fragment>
              ))}
            </p>

            <ul
              className="mt-6 bg-white grid grid-cols-2 sm:grid-cols-4"
              style={{ borderRadius: R.lg }}
            >
              {stats.map((s, i) => (
                <li
                  key={s.label}
                  className="px-4 py-5 text-center"
                  style={{ borderInlineEnd: i < stats.length - 1 ? `1px solid ${T.border}` : undefined }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span
                      className="w-7 h-7 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.sm, backgroundColor: T.tintPurple }}
                    >
                      <Icon name={s.icon} size={14} style={{ backgroundColor: T.primary }} />
                    </span>
                    <span className="text-[18px] font-extrabold" style={{ color: T.ink }}>
                      {s.value}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[10.5px]" style={{ color: T.muted }}>
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <img src={art} alt={artAlt} className="w-full max-w-[340px] mx-auto object-contain" />
        </div>
      </div>
    </section>
  );
}

/* ── Toolbar ──────────────────────────────────────────────────── */

export function PeopleToolbar({
  search,
  sortLabel,
  sortValue,
  view,
  onView,
}: {
  search: string;
  sortLabel: string;
  sortValue: string;
  view: 'grid' | 'list';
  onView: (v: 'grid' | 'list') => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <label
        className="flex-1 min-w-[220px] flex items-center gap-2.5 px-4 py-3 bg-white"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
      >
        <Icon name="lucide:search" size={15} style={{ backgroundColor: T.muted }} />
        <input
          placeholder={search}
          className="flex-1 min-w-0 bg-transparent text-[11.5px] outline-none placeholder:text-[#9396b0]"
          style={{ color: T.ink }}
        />
      </label>

      <label
        className="flex items-center gap-2 px-4 py-3 bg-white shrink-0"
        style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
      >
        <span className="text-[10.5px]" style={{ color: T.muted }}>
          {sortLabel}
        </span>
        <span className="text-[11.5px] font-bold" style={{ color: T.ink }}>
          {sortValue}
        </span>
        <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
      </label>

      <div className="flex items-center gap-1.5 shrink-0">
        {(['grid', 'list'] as const).map((v) => {
          const on = v === view;
          return (
            <button
              key={v}
              onClick={() => onView(v)}
              aria-pressed={on}
              aria-label={v === 'grid' ? 'نمایش شبکه‌ای' : 'نمایش لیستی'}
              className="w-11 h-11 flex items-center justify-center"
              style={{
                borderRadius: R.md,
                backgroundColor: on ? T.primary : '#ffffff',
                border: `1px solid ${on ? T.primary : T.border}`,
              }}
            >
              <Icon
                name={v === 'grid' ? 'lucide:layout-grid' : 'lucide:list'}
                size={16}
                style={{ backgroundColor: on ? '#ffffff' : T.ink }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Filter rail ──────────────────────────────────────────────── */

export interface FilterSection {
  id: string;
  label: string;
  kind: 'check' | 'radio' | 'select';
  more?: string;
  value?: string;
  items?: { label: string; on?: boolean }[];
}

export function PeopleFilters({
  title,
  clear,
  sections,
  action,
}: {
  title: string;
  clear?: string;
  sections: FilterSection[];
  action: { label: string; icon?: string };
}) {
  return (
    <aside className="space-y-4">
      <section
        className="bg-white p-4"
        style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
      >
        <header className="flex items-center gap-2">
          {clear && (
            <button className="text-[10.5px] font-bold" style={{ color: T.primary }}>
              {clear}
            </button>
          )}
          <h2 className="flex-1 flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
            {title}
            <Icon name="lucide:sliders-horizontal" size={15} style={{ backgroundColor: T.primary }} />
          </h2>
        </header>

        {sections.map((s) => (
          <div key={s.id} className="mt-5 pt-5 first:mt-4 first:pt-0" style={{ borderTop: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-2">
              <Icon name="lucide:chevron-up" size={13} style={{ backgroundColor: T.muted }} />
              <h3 className="flex-1 text-right text-[12px] font-extrabold" style={{ color: T.ink }}>
                {s.label}
              </h3>
            </div>

            {s.kind === 'select' ? (
              <label
                className="mt-3 flex items-center gap-2 px-3 py-2.5"
                style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
              >
                <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
                <span className="flex-1 text-right text-[11px]" style={{ color: T.muted }}>
                  {s.value}
                </span>
              </label>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {s.items?.map((it) => (
                  <li key={it.label}>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <span className="flex-1 text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
                        {it.label}
                      </span>
                      <span
                        className="w-[17px] h-[17px] flex items-center justify-center shrink-0"
                        style={{
                          borderRadius: s.kind === 'radio' ? '999px' : '5px',
                          backgroundColor: it.on ? T.primary : '#ffffff',
                          border: `1.5px solid ${it.on ? T.primary : '#d9d9e6'}`,
                        }}
                      >
                        {it.on &&
                          (s.kind === 'radio' ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          ) : (
                            <Icon name="lucide:check" size={11} style={{ backgroundColor: '#ffffff' }} />
                          ))}
                      </span>
                      <input type={s.kind === 'radio' ? 'radio' : 'checkbox'} defaultChecked={it.on} className="sr-only" />
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {s.more && (
              <button className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
                <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.primary }} />
                {s.more}
              </button>
            )}
          </div>
        ))}

        <button
          className="mt-5 w-full flex items-center justify-center gap-2 py-3 text-[12px] font-extrabold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: R.md, backgroundColor: T.primary }}
        >
          {action.label}
          {action.icon && <Icon name={action.icon} size={14} style={{ backgroundColor: '#ffffff' }} />}
        </button>
      </section>
    </aside>
  );
}

/* ── Person card ──────────────────────────────────────────────── */

export function PersonCard({
  person,
  save,
  actions,
}: {
  person: Person;
  save: 'heart' | 'bookmark';
  actions: { label: string; kind: 'solid' | 'outline' }[];
}) {
  return (
    <article
      className="bg-white p-4 flex flex-col"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <div className="flex items-start">
        <button
          aria-label={save === 'heart' ? 'افزودن به علاقه‌مندی' : 'ذخیره'}
          className="shrink-0"
        >
          <Icon
            name={save === 'heart' ? 'lucide:heart' : 'lucide:bookmark'}
            size={17}
            style={{ backgroundColor: '#c9c3ea' }}
          />
        </button>
        <span className="flex-1" />
      </div>

      <div className="-mt-3 flex justify-center">
        <span className="relative">
          <img
            src={person.avatar}
            alt=""
            className="w-[84px] h-[84px] rounded-full object-cover"
            style={{ border: `2px solid ${T.border}` }}
          />
          {person.online && (
            <span
              className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: '#22c55e', border: '2px solid #ffffff' }}
            />
          )}
        </span>
      </div>

      <h3 className="mt-3 text-center text-[14px] font-extrabold" style={{ color: T.ink }}>
        {person.name}
      </h3>
      <p className="mt-1 text-center text-[10.5px] leading-5" style={{ color: T.muted }}>
        {person.title}
      </p>

      {(person.rating || person.meta) && (
        <p className="mt-2.5 flex items-center justify-center gap-4">
          {person.meta && (
            <span className="text-[10px]" style={{ color: T.muted }}>
              {person.meta}
            </span>
          )}
          {person.rating && (
            <span className="flex items-center gap-1 text-[10.5px] font-bold" style={{ color: T.ink }}>
              {person.rating}
              <Icon name="lucide:star" size={12} style={{ backgroundColor: '#f5a524' }} />
            </span>
          )}
        </p>
      )}

      <ul className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
        {person.tags.map((t) => {
          const tone = tagTone[t.tone ?? 'violet'];
          return (
            <li
              key={t.label}
              className="px-2.5 py-1 text-[9.5px] font-bold"
              style={{ borderRadius: R.pill, color: tone.fg, backgroundColor: tone.bg }}
            >
              {t.label}
            </li>
          );
        })}
      </ul>

      <ul className="mt-4 flex items-start justify-around">
        {person.stats.map((s) => (
          <li key={s.label} className="text-center">
            <span className="block text-[13px] font-extrabold" style={{ color: s.fg ?? T.ink }}>
              {s.value}
            </span>
            <span className="mt-0.5 block text-[9px]" style={{ color: T.muted }}>
              {s.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-3.5 text-center" style={{ borderTop: `1px solid ${T.border}` }}>
        <span className="block text-[9.5px]" style={{ color: T.muted }}>
          {person.lastLabel}
        </span>
        <span className="mt-1 flex items-center justify-center gap-1.5 text-[10.5px] font-bold" style={{ color: T.primary }}>
          {person.last}
          <Icon name="lucide:circle-play" size={12} style={{ backgroundColor: T.primary }} />
        </span>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        {actions.map((a) =>
          a.kind === 'solid' ? (
            <Link
              key={a.label}
              href={person.href}
              className="flex-1 py-2.5 text-center text-[11px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primary }}
            >
              {a.label}
            </Link>
          ) : (
            <button
              key={a.label}
              className="flex-1 py-2.5 text-[11px] font-bold transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
            >
              {a.label}
            </button>
          ),
        )}
      </div>
    </article>
  );
}
