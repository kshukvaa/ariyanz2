'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  counselingHero,
  counselingAsk,
  counselingToolbar,
  experts,
  expertsFilters,
  counselingHow,
  counselingFaq,
} from '@/data/counseling/experts';

/* ──────────────────────────────────────────────────────────────
   مشاوره تخصصی — the expert directory.

   The page has one job: get someone from "I have a problem" to
   "I have an appointment". So it offers three ways in, ranked by
   how much the visitor already knows — pick a field, describe the
   problem and let Aryaz route it, or go straight to a named
   adviser — and the adviser card leads with the first free slot,
   because availability is what actually decides the booking.
────────────────────────────────────────────────────────────── */

export default function ExpertsClient() {
  const [view, setView] = useState<'list' | 'grid'>('list');

  return (
    <div style={{ backgroundColor: T.page }}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative"
        style={{ background: `linear-gradient(160deg, ${T.tintPurple}, #ffffff 65%)` }}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 grid gap-8 lg:grid-cols-[1fr_38%] items-center">
          <div className="text-center lg:text-right lg:order-1">
            <h1 className="text-[26px] sm:text-[30px] font-extrabold" style={{ color: T.ink }}>
              {counselingHero.title}
            </h1>

            <div className="mt-3 space-y-1">
              {counselingHero.desc.map((d) => (
                <p key={d} className="text-[12.5px] leading-7" style={{ color: T.muted }}>
                  {d}
                </p>
              ))}
            </div>

            <label
              className="mt-5 flex items-center gap-2.5 px-4 py-3.5 bg-white max-w-[520px] mr-auto"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
            >
              <Icon name="lucide:search" size={17} style={{ backgroundColor: T.muted }} />
              <input
                type="search"
                placeholder={counselingHero.search}
                className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
                style={{ color: T.ink }}
              />
            </label>

            <div className="mt-5 grid gap-3 grid-cols-2 xl:grid-cols-4">
              {counselingHero.fields.map((f) => (
                <button
                  key={f.id}
                  className="p-4 text-center bg-white transition-transform hover:-translate-y-0.5"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <span
                    className="w-11 h-11 flex items-center justify-center mx-auto"
                    style={{ borderRadius: R.md, backgroundColor: f.bg }}
                  >
                    <Icon name={f.icon} size={20} style={{ backgroundColor: f.fg }} />
                  </span>
                  <span className="block mt-2.5 text-[12px] font-extrabold" style={{ color: f.fg }}>
                    {f.label}
                  </span>
                  <span className="block mt-1 text-[9.5px] leading-4" style={{ color: T.muted }}>
                    {f.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:order-2">
            <img
              src="/images/aryaz/thumbnails/video-07-manager-communication.png"
              alt=""
              className="w-full h-[280px] object-cover"
              style={{ borderRadius: R.lg }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-10 space-y-6">
        {/* ── Ask-Aryaz band ──────────────────────────────────── */}
        <section
          className="p-4 sm:p-5 flex items-center gap-4 flex-wrap"
          style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}
        >
          <img
            src="/images/aryaz/illustrations/ai-assistant-avatar.png"
            alt=""
            className="w-[76px] h-[76px] object-contain shrink-0"
          />

          <div className="flex-1 min-w-[220px] text-right">
            <h2 className="text-[14px] font-extrabold" style={{ color: T.ink }}>
              {counselingAsk.title}
            </h2>
            <p className="mt-1 text-[11.5px] leading-6" style={{ color: T.muted }}>
              {counselingAsk.desc}
            </p>
          </div>

          <label
            className="flex items-center gap-2.5 px-4 py-3 bg-white flex-1 min-w-[280px]"
            style={{ borderRadius: R.md }}
          >
            <button
              aria-label="ارسال"
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ borderRadius: R.sm, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:send" size={15} className="text-white" />
            </button>
            <input
              placeholder={counselingAsk.placeholder}
              className="flex-1 min-w-0 bg-transparent text-[11.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: T.ink }}
            />
          </label>
        </section>

        {/* ── Directory: rail right, list left ────────────────── */}
        <div className="grid gap-5 xl:grid-cols-[280px_1fr] items-start">
          <aside
            className="bg-white xl:order-1 xl:sticky xl:top-6"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <h2
              className="flex items-center justify-end gap-2 p-4 text-[13px] font-extrabold"
              style={{ color: T.ink, borderBottom: `1px solid ${T.border}` }}
            >
              {expertsFilters.title}
              <Icon name="lucide:funnel" size={16} style={{ backgroundColor: T.primary }} />
            </h2>

            {expertsFilters.groups.map((g) => (
              <div key={g.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <div className="flex items-center gap-2 px-4 py-3">
                  <Icon name="lucide:chevron-up" size={14} style={{ backgroundColor: T.muted }} />
                  <span className="flex-1 text-right text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {g.label}
                  </span>
                  <Icon name="lucide:star" size={14} style={{ backgroundColor: T.primary }} />
                </div>

                <ul className="pb-2">
                  {g.items.map((i) => (
                    <li key={i.label}>
                      <button
                        className="w-full flex items-center gap-2.5 px-4 py-2 transition-colors hover:bg-gray-50"
                        style={
                          i.active
                            ? { backgroundColor: T.tintPurple }
                            : undefined
                        }
                      >
                        <span className="text-[10px] shrink-0" style={{ color: T.muted }}>
                          {i.count}
                        </span>
                        <span
                          className="flex-1 text-right text-[11px]"
                          style={{ color: i.active ? T.primary : T.ink, fontWeight: i.active ? 800 : 500 }}
                        >
                          {i.label}
                        </span>
                        {i.active && (
                          <Icon name="lucide:circle-check" size={13} style={{ backgroundColor: T.primary }} />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <ul>
              {expertsFilters.collapsed.map((c) => (
                <li key={c.label} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <button className="w-full flex items-center gap-2.5 px-4 py-3 transition-colors hover:bg-gray-50">
                    <span className="text-[10px] shrink-0" style={{ color: T.muted }}>
                      {c.count ?? ''}
                    </span>
                    <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
                    <span className="flex-1 text-right text-[11.5px] font-semibold" style={{ color: T.ink }}>
                      {c.label}
                    </span>
                    <Icon name={c.icon} size={14} style={{ backgroundColor: T.primary }} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="p-3">
              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
              >
                <Icon name="lucide:refresh-cw" size={13} style={{ backgroundColor: T.primary }} />
                {expertsFilters.reset}
              </button>
            </div>
          </aside>

          <div className="min-w-0 space-y-4 xl:order-2">
            {/* ── Toolbar ──────────────────────────────────────── */}
            <div
              className="bg-white p-3 flex items-center gap-2.5 flex-wrap"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <span className="flex items-center gap-1 order-1">
                {(['grid', 'list'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    aria-label={v === 'grid' ? 'نمایش شبکه‌ای' : 'نمایش فهرستی'}
                    aria-pressed={view === v}
                    className="w-9 h-9 flex items-center justify-center"
                    style={{
                      borderRadius: R.sm,
                      backgroundColor: view === v ? T.tintPurple : 'transparent',
                      border: `1px solid ${view === v ? T.tintPurple : T.border}`,
                    }}
                  >
                    <Icon
                      name={v === 'grid' ? 'lucide:grid-2x2' : 'lucide:list'}
                      size={15}
                      style={{ backgroundColor: view === v ? T.primary : T.muted }}
                    />
                  </button>
                ))}
              </span>

              <button
                className="flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-bold order-2"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
                {counselingToolbar.sort}
                <Icon name="lucide:star" size={13} style={{ backgroundColor: T.warning }} />
              </button>

              <span className="flex items-center gap-1.5 flex-wrap order-3">
                {counselingToolbar.chips.map((c) => (
                  <button
                    key={c}
                    className="px-3.5 py-2 text-[10.5px] font-semibold"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                  >
                    {c}
                  </button>
                ))}
              </span>

              <label
                className="flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[180px] order-4"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <Icon name="lucide:search" size={15} style={{ backgroundColor: T.muted }} />
                <input
                  type="search"
                  placeholder={counselingToolbar.search}
                  className="flex-1 min-w-0 bg-transparent text-[11.5px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>
            </div>

            {/* ── Expert cards ─────────────────────────────────── */}
            {experts.map((e) => (
              <article
                key={e.id}
                className="bg-white p-4 flex items-start gap-4 flex-wrap"
                style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
              >
                {/* Actions first → right-hand edge in RTL. */}
                <div className="flex flex-col gap-2 w-[150px] shrink-0 order-3 sm:order-1">
                  <button
                    aria-label="افزودن به علاقه‌مندی"
                    className="self-end w-8 h-8 flex items-center justify-center"
                    style={{ borderRadius: R.sm }}
                  >
                    <Icon name="lucide:heart" size={16} style={{ backgroundColor: T.muted }} />
                  </button>

                  <Link
                    href={e.href}
                    className="py-2.5 text-center text-[11.5px] font-bold"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
                  >
                    مشاهده پروفایل
                  </Link>

                  <Link
                    href={`/counseling/reserve?expert=${e.id}`}
                    data-ripple
                    className="py-2.5 text-center text-[11.5px] font-bold text-white transition-opacity hover:opacity-90"
                    style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
                  >
                    رزرو جلسه
                  </Link>
                </div>

                <div className="flex-1 min-w-[220px] text-right order-2">
                  <div className="flex items-center justify-end gap-2">
                    <h3 className="text-[16px] font-extrabold" style={{ color: T.ink }}>
                      {e.name}
                    </h3>
                    <span
                      className="w-8 h-8 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.sm, backgroundColor: e.fieldBg }}
                    >
                      <Icon name={e.fieldIcon} size={15} style={{ backgroundColor: e.fieldFg }} />
                    </span>
                  </div>

                  <p className="mt-1 text-[11.5px]" style={{ color: T.muted }}>
                    {e.title}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2 flex-wrap justify-end">
                    <span className="text-[11px]" style={{ color: T.muted }}>
                      ...
                    </span>
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-[10.5px] font-semibold"
                        style={{ borderRadius: R.pill, backgroundColor: '#f4f4f8', color: T.ink }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-4 flex-wrap justify-end text-[10.5px]" style={{ color: T.muted }}>
                    <span className="flex items-center gap-1.5">
                      {e.price}
                      <Icon name="lucide:wallet" size={12} style={{ backgroundColor: T.muted }} />
                    </span>
                    <span className="flex items-center gap-1.5">
                      ({e.reviews})
                      <span className="font-bold" style={{ color: T.ink }}>
                        {e.rating}
                      </span>
                      <Icon name="lucide:star" size={12} style={{ backgroundColor: T.warning }} />
                    </span>
                    <span className="flex items-center gap-1.5">
                      {e.years}
                      <Icon name="lucide:badge-check" size={12} style={{ backgroundColor: T.successStrong }} />
                    </span>
                  </div>
                </div>

                <div className="w-[110px] shrink-0 text-center order-1 sm:order-3">
                  <img
                    src={e.avatar}
                    alt=""
                    className="w-[86px] h-[86px] rounded-xl object-cover mx-auto"
                  />
                  <span
                    className="mt-2 inline-block px-2.5 py-1 text-[10px] font-bold"
                    style={{ borderRadius: R.pill, backgroundColor: e.availability.bg, color: e.availability.fg }}
                  >
                    {e.availability.label}
                  </span>
                  <span className="block mt-1.5 text-[9.5px]" style={{ color: T.muted }}>
                    {e.firstSlotLabel}
                  </span>
                  <span className="flex items-center justify-center gap-1 text-[10.5px] font-bold" style={{ color: T.primary }}>
                    {e.firstSlot}
                    <Icon name="lucide:calendar" size={11} style={{ backgroundColor: T.primary }} />
                  </span>
                </div>
              </article>
            ))}

            <button
              className="w-full flex items-center justify-center gap-2 py-3 text-[12.5px] font-bold"
              style={{ borderRadius: R.lg, backgroundColor: T.tintPurple, color: T.primary }}
            >
              <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: T.primary }} />
              {counselingToolbar.more}
            </button>
          </div>
        </div>

        {/* ── How + FAQ ───────────────────────────────────────── */}
        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
          <section
            className="bg-white p-5 lg:order-1"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <h2 className="text-center text-[15px] font-extrabold" style={{ color: T.ink }}>
              {counselingHow.title}
            </h2>

            <div className="mt-5 grid gap-3.5 grid-cols-2 xl:grid-cols-4">
              {counselingHow.cards.map((c) => (
                <Link
                  key={c.id}
                  href={c.href}
                  className="p-4 text-center flex flex-col transition-transform hover:-translate-y-0.5"
                  style={{ borderRadius: R.lg, backgroundColor: c.bg }}
                >
                  <span
                    className="w-11 h-11 flex items-center justify-center mx-auto bg-white"
                    style={{ borderRadius: R.md }}
                  >
                    <Icon name={c.icon} size={20} style={{ backgroundColor: c.fg }} />
                  </span>
                  <span className="block mt-2.5 text-[12px] font-extrabold" style={{ color: T.ink }}>
                    {c.label}
                  </span>
                  <span className="block mt-1 text-[9.5px] leading-4 flex-1" style={{ color: T.muted }}>
                    {c.desc}
                  </span>
                  <Icon
                    name="lucide:arrow-left"
                    size={14}
                    style={{ backgroundColor: c.fg, margin: '10px auto 0' }}
                  />
                </Link>
              ))}
            </div>
          </section>

          <section
            className="bg-white p-5 lg:order-2"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <header className="flex items-center gap-3">
              <button className="text-[11px] font-bold" style={{ color: T.primary }}>
                {counselingFaq.cta}
              </button>
              <h2 className="flex-1 text-right text-[14px] font-extrabold" style={{ color: T.ink }}>
                {counselingFaq.title}
              </h2>
            </header>

            <ul className="mt-4 space-y-2.5">
              {counselingFaq.items.map((f) => (
                <li
                  key={f.q}
                  className="flex items-center gap-3 p-3"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <span className="flex-1 text-right text-[11px] leading-5" style={{ color: T.ink }}>
                    {f.q}
                  </span>
                  <Icon name="lucide:file-text" size={16} style={{ backgroundColor: f.fg }} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
