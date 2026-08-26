'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   Shared furniture for the learning-path pages — the archive, the
   single skill path and the single career path.

   The one device all three share is the LEVEL BAR: a four-stop
   gradient rail reading مقدماتی → کاربردی → پیشرفته → حرفه‌ای.
   In RTL «مقدماتی» is the rightmost stop, so the stops are
   declared in that order and the gradient runs `to left`.

   RTL note that differs from the rest of the site: on the path
   pages the Aryaz agent rail is on the LEFT, not the right. So
   the reading column is declared FIRST here. Measured off
   «learning-paths single.png» and «Career Development path».
────────────────────────────────────────────────────────────── */

export const PATH_LEVELS = ['مقدماتی', 'کاربردی', 'پیشرفته', 'حرفه‌ای'];

export interface LevelTone {
  from: string;
  to: string;
  stops: string[];
}

export const levelTones: Record<string, LevelTone> = {
  violet: { from: '#7c5cff', to: '#c9bdf7', stops: ['#4b30ce', '#6d5efc', '#9b8bfa', '#c9bdf7'] },
  blue: { from: '#1b56d3', to: '#bcd2f7', stops: ['#1b56d3', '#3b82f6', '#7aa9f5', '#bcd2f7'] },
  orange: { from: '#f26a21', to: '#f7c99a', stops: ['#f26a21', '#f59e42', '#f7b76b', '#f7c99a'] },
  green: { from: '#1c8a4e', to: '#a9dcc0', stops: ['#1c8a4e', '#34a76a', '#6cc596', '#a9dcc0'] },
};

export function LevelBar({ tone = 'violet' }: { tone?: keyof typeof levelTones }) {
  const t = levelTones[tone] ?? levelTones.violet;
  return (
    <div>
      <ul className="flex items-center justify-between">
        {PATH_LEVELS.map((l) => (
          <li key={l} className="flex-1 text-center text-[10px] font-bold" style={{ color: T.ink }}>
            {l}
          </li>
        ))}
      </ul>

      <div className="relative mt-2 h-[3px]" style={{ backgroundImage: `linear-gradient(to left, ${t.from}, ${t.to})` }}>
        <ul className="absolute inset-0 flex items-center justify-between">
          {t.stops.map((c, i) => (
            <li
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: c, transform: i === 0 ? 'translateX(-40%)' : i === 3 ? 'translateX(40%)' : undefined }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Path card (archive grid) ─────────────────────────────────── */

export interface PathCard {
  id: string;
  kind: 'skill' | 'career';
  kindLabel: string;
  title: string;
  desc: string;
  icon: string;
  tone: keyof typeof levelTones;
  fg: string;
  bg: string;
  stats: { value: string; label: string }[];
  contentIcons: string[];
  cta: string;
  href: string;
}

export function PathCardView({ path }: { path: PathCard }) {
  const tone = levelTones[path.tone] ?? levelTones.violet;
  return (
    <article
      className="bg-white p-4 flex flex-col h-full"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <span
        className="self-start px-3 py-1 text-[9.5px] font-bold"
        style={{ borderRadius: R.pill, backgroundColor: path.bg, color: path.fg }}
      >
        {path.kindLabel}
      </span>

      <h3 className="mt-3 text-center text-[15px] font-extrabold" style={{ color: T.ink }}>
        {path.title}
      </h3>

      <span className="mt-3 mx-auto w-14 h-14 flex items-center justify-center" style={{ borderRadius: '999px', backgroundColor: path.bg }}>
        <Icon name={path.icon} size={26} style={{ backgroundColor: path.fg }} />
      </span>

      <p className="mt-3 text-center text-[10px] leading-6" style={{ color: T.muted }}>
        {path.desc}
      </p>

      <div className="mt-4">
        <LevelBar tone={path.tone} />
      </div>

      <ul className="mt-4 flex items-start justify-around">
        {path.stats.map((s) => (
          <li key={s.label} className="text-center">
            <span className="block text-[13px] font-extrabold" style={{ color: T.ink }}>
              {s.value}
            </span>
            <span className="block text-[9px]" style={{ color: T.muted }}>
              {s.label}
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-3.5 flex items-center justify-center gap-2.5">
        {path.contentIcons.map((ic, i) => (
          <li key={i}>
            <Icon name={ic} size={15} style={{ backgroundColor: path.fg }} />
          </li>
        ))}
      </ul>

      <a
        href={path.href}
        className="mt-4 py-2.5 text-center text-[11.5px] font-bold"
        style={{ borderRadius: R.md, border: `1px solid ${path.fg}`, color: path.fg }}
      >
        {path.cta}
      </a>
    </article>
  );
}

/* ── Agent rail (LEFT on these pages) ─────────────────────────── */

export function PathAgent({
  title,
  question,
  desc,
  chips,
  placeholder,
}: {
  title: string;
  question?: string;
  desc: string;
  chips: { label: string; icon: string }[];
  placeholder: string;
}) {
  return (
    <section
      className="bg-white p-4"
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
        {title}
        <Icon name="lucide:sparkles" size={15} style={{ backgroundColor: T.violet }} />
      </h2>

      <img
        src="/images/aryaz/illustrations/ai-assistant-avatar.png"
        alt=""
        className="mt-3 mx-auto w-24 h-24 object-contain"
      />

      {question && (
        <p className="mt-2 text-center text-[12px] font-extrabold leading-7" style={{ color: T.ink }}>
          {question}
        </p>
      )}

      <p className="mt-2 text-center text-[10.5px] leading-7" style={{ color: T.muted }}>
        {desc}
      </p>

      <ul className="mt-4 space-y-2.5">
        {chips.map((c) => (
          <li key={c.label}>
            <button
              className="w-full flex items-center gap-2.5 px-3.5 py-3 text-right transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <span className="flex-1 text-[10.5px] font-bold" style={{ color: T.primary }}>
                {c.label}
              </span>
              <Icon name={c.icon} size={14} className="shrink-0" style={{ backgroundColor: T.primary }} />
            </button>
          </li>
        ))}
      </ul>

      <label className="mt-3 flex items-center gap-2.5 px-3 py-2.5" style={{ borderRadius: R.pill, border: `1px solid ${T.border}` }}>
        <button
          aria-label="ارسال"
          className="w-9 h-9 flex items-center justify-center shrink-0"
          style={{ borderRadius: '999px', backgroundColor: T.primary }}
        >
          <Icon name="lucide:send" size={14} style={{ backgroundColor: '#ffffff' }} />
        </button>
        <input
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
          style={{ color: T.ink }}
        />
      </label>
    </section>
  );
}

/* ── Tab bar ──────────────────────────────────────────────────── */

export function PathTabs({
  tabs,
  active,
  onPick,
}: {
  tabs: { id: string; label: string }[];
  active: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto" style={{ borderBottom: `1px solid ${T.border}` }}>
      <div className="flex items-center gap-1 min-w-max justify-end">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => onPick(t.id)}
              aria-pressed={on}
              className="relative px-5 py-3.5 text-[12px] whitespace-nowrap"
              style={{ color: on ? T.primary : T.muted, fontWeight: on ? 800 : 600 }}
            >
              {t.label}
              {on && (
                <span
                  className="absolute -bottom-px inset-x-3 h-[3px] rounded-t-full"
                  style={{ backgroundColor: T.primary }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Related-resources column set ─────────────────────────────── */

export interface ResourceGroup {
  id: string;
  title: string;
  fg: string;
  bg: string;
  items: { label: string; image: string }[];
  cta: string;
}

export function ResourceColumns({ title, groups }: { title: string; groups: ResourceGroup[] }) {
  return (
    <section>
      <h2 className="flex items-center justify-end gap-2.5 text-[16px] font-extrabold" style={{ color: T.ink }}>
        {title}
        <span
          className="w-9 h-9 flex items-center justify-center"
          style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
        >
          <Icon name="lucide:sparkles" size={17} style={{ backgroundColor: T.violet }} />
        </span>
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {groups.map((g) => (
          <section
            key={g.id}
            className="p-3.5 flex flex-col"
            style={{ borderRadius: R.lg, backgroundColor: g.bg, border: `1px solid ${g.fg}22` }}
          >
            <h3 className="text-center text-[12px] font-extrabold" style={{ color: g.fg }}>
              {g.title}
            </h3>

            <ul className="mt-3.5 space-y-2.5 flex-1">
              {g.items.map((it) => (
                <li
                  key={it.label}
                  className="flex items-center gap-2.5 p-2 bg-white"
                  style={{ borderRadius: R.sm }}
                >
                  <span className="flex-1 text-right text-[10px] font-bold leading-5" style={{ color: T.ink }}>
                    {it.label}
                  </span>
                  <img src={it.image} alt="" className="w-9 h-9 object-cover shrink-0" style={{ borderRadius: '6px' }} />
                </li>
              ))}
            </ul>

            <button
              className="mt-3.5 py-2.5 text-[10.5px] font-bold bg-white"
              style={{ borderRadius: R.md, border: `1px solid ${g.fg}55`, color: g.fg }}
            >
              {g.cta}
            </button>
          </section>
        ))}
      </div>
    </section>
  );
}

/* ── Ratings block ────────────────────────────────────────────── */

export function PathRatings({
  title,
  score,
  count,
  submit,
  bars,
  reviews,
}: {
  title: string;
  score: string;
  count: string;
  submit: string;
  bars: { label: string; pct: number; fg: string }[];
  reviews: { name: string; role: string; avatar: string; stars: number; text: string; when: string }[];
}) {
  return (
    <section className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
      <h2 className="text-right text-[16px] font-extrabold" style={{ color: T.ink }}>
        {title}
      </h2>

      <div className="mt-4 grid gap-5 xl:grid-cols-[1fr_260px_190px] items-start">
        {/* Reviews declared first → right. */}
        <ul className="grid gap-3 sm:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.name} className="p-3.5" style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}>
              <div className="flex items-start gap-2.5">
                <span className="flex-1 text-right min-w-0">
                  <span className="block text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                    {r.name}
                  </span>
                  <span className="block text-[9px]" style={{ color: T.muted }}>
                    {r.role}
                  </span>
                </span>
                <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
              </div>

              <span className="mt-2 flex items-center gap-0.5 justify-end">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon
                    key={i}
                    name="lucide:star"
                    size={11}
                    style={{ backgroundColor: i < r.stars ? '#f5a524' : T.border }}
                  />
                ))}
              </span>

              <p className="mt-2 text-right text-[10.5px] leading-6" style={{ color: T.ink }}>
                {r.text}
              </p>
              <p className="mt-2 text-right text-[9px]" style={{ color: T.muted }}>
                {r.when}
              </p>
            </li>
          ))}
        </ul>

        <ul className="space-y-2">
          {bars.map((b) => (
            <li key={b.label} className="flex items-center gap-2.5">
              <span className="w-9 text-left text-[10px]" style={{ color: T.muted }}>
                {b.pct}٪
              </span>
              <span className="flex-1 h-2 rounded-full" style={{ backgroundColor: T.border }}>
                <span className="block h-2 rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.fg }} />
              </span>
              <span className="text-[10px] shrink-0" style={{ color: T.muted }}>
                {b.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-center p-4" style={{ borderRadius: R.md, backgroundColor: '#fafafd' }}>
          <span className="block text-[34px] font-extrabold" style={{ color: T.ink }}>
            {score}
          </span>
          <span className="mt-1 flex items-center justify-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="lucide:star" size={16} style={{ backgroundColor: '#f5a524' }} />
            ))}
          </span>
          <span className="mt-1.5 block text-[10px]" style={{ color: T.muted }}>
            {count}
          </span>
          <button
            className="mt-3 w-full py-2.5 text-[11px] font-bold bg-white"
            style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
          >
            {submit}
          </button>
        </div>
      </div>
    </section>
  );
}
