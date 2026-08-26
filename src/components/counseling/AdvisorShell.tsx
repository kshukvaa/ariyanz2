'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  advisorUser,
  advisorNav,
  advisorLogout,
  advisorBar,
  advisorAvailability,
  ADVISOR_TONES,
} from '@/data/counseling/advisor';

/* ──────────────────────────────────────────────────────────────
   The advisor workspace shell.

   Signed-in tooling like the organisation panel, so the site's
   marketing chrome is gone — but the sheets draw a LIGHT rail
   here, not the org panel's navy one, so this is its own shell
   rather than a variant of PanelShell.

   RTL: the rail is declared before the content so it lands on
   the right, which is where pages 15, 16 and 18 put it. (Page 17
   mirrors it; the other three agree, so they win.)
────────────────────────────────────────────────────────────── */

export function Tone({ label, tone, icon }: { label: string; tone: string; icon?: string }) {
  const t = ADVISOR_TONES[tone] ?? ADVISOR_TONES.muted;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9.5px] font-bold whitespace-nowrap"
      style={{ borderRadius: R.pill, backgroundColor: t.bg, color: t.fg }}
    >
      {label}
      {icon && <Icon name={icon} size={11} style={{ backgroundColor: t.fg }} />}
    </span>
  );
}

export function AdvisorCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

export function AdvisorHeading({ title, icon, all }: { title: string; icon: string; all?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      {all && (
        <button className="text-[10px] font-bold" style={{ color: T.primary }}>
          {all}
        </button>
      )}
      <h2 className="flex items-center gap-2 text-[12.5px] font-extrabold" style={{ color: T.ink }}>
        {title}
        <Icon name={icon} size={14} style={{ backgroundColor: T.primary }} />
      </h2>
    </div>
  );
}

/* The availability switch that heads three of the four screens. */
export function AvailabilityBar() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button
        onClick={() => setOn((v) => !v)}
        role="switch"
        aria-checked={on}
        className="flex items-center gap-2.5 px-3.5 py-2.5"
        style={{ borderRadius: R.md, backgroundColor: on ? '#eaf7ee' : '#f3f3f8' }}
      >
        <span
          className="w-9 h-5 flex items-center px-0.5 transition-colors"
          style={{ borderRadius: R.pill, backgroundColor: on ? '#1c8a4e' : '#c9c9d4' }}
        >
          <span
            className="w-4 h-4 bg-white rounded-full transition-transform"
            style={{ transform: on ? 'translateX(-14px)' : 'none' }}
          />
        </span>
        <span className="text-[10.5px] font-bold" style={{ color: on ? '#1c8a4e' : T.muted }}>
          {advisorAvailability.on}
        </span>
      </button>

      <span className="text-right">
        <span className="block text-[10px]" style={{ color: T.muted }}>
          {advisorAvailability.label}
        </span>
        <button className="mt-0.5 flex items-center gap-1.5 text-[10px] font-bold" style={{ color: T.primary }}>
          <Icon name="lucide:sliders-horizontal" size={11} style={{ backgroundColor: T.primary }} />
          {advisorAvailability.manage}
        </button>
      </span>
    </div>
  );
}

export default function AdvisorShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f7fb' }}>
      {/* ── Top bar ──────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 bg-white"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-[66px] flex items-center gap-4">
          {/* Logo declared first → right. */}
          <Link href="/" className="flex items-center gap-2 shrink-0 order-1">
            <img src="/images/slots/ariyaz-logo.png" alt="آریاز" className="h-8 w-auto object-contain" />
          </Link>

          <div className="flex-1 order-2" />

          <ul className="flex items-center gap-2 order-3">
            {advisorBar.icons.map((b) => (
              <li key={b.id} className="relative">
                <button
                  aria-label={b.id}
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ borderRadius: R.md, backgroundColor: '#f5f4fb' }}
                >
                  <Icon name={b.icon} size={17} style={{ backgroundColor: T.primary }} />
                </button>
                {b.badge && (
                  <span
                    className="absolute -top-1 -left-1 w-4 h-4 flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ borderRadius: R.pill, backgroundColor: T.danger }}
                  >
                    {b.badge}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <button className="flex items-center gap-2.5 shrink-0 order-4">
            <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
            <span className="text-right hidden sm:block">
              <span className="block text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                {advisorUser.name}
              </span>
              <span className="block text-[9px]" style={{ color: T.muted }}>
                {advisorUser.role}
              </span>
            </span>
            <img src={advisorUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="منو"
            className="lg:hidden w-10 h-10 flex items-center justify-center order-5"
            style={{ borderRadius: R.md, backgroundColor: '#f5f4fb' }}
          >
            <Icon name="lucide:menu" size={18} style={{ backgroundColor: T.ink }} />
          </button>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-5 lg:grid-cols-[236px_1fr] items-start">
          {/* Rail declared first → right. */}
          <aside
            className={`${open ? 'block' : 'hidden'} lg:block lg:sticky lg:top-[82px]`}
          >
            <nav className="bg-white p-2.5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
              <ul className="space-y-1">
                {advisorNav.map((n) => {
                  const on = n.id === active;
                  return (
                    <li key={n.id}>
                      <Link
                        href={n.href}
                        aria-current={on ? 'page' : undefined}
                        className="flex items-center gap-2.5 px-3 py-2.5 transition-colors"
                        style={{
                          borderRadius: R.md,
                          backgroundColor: on ? T.primary : 'transparent',
                          color: on ? '#ffffff' : T.ink,
                        }}
                      >
                        <Icon
                          name={n.icon}
                          size={16}
                          className="shrink-0 order-3"
                          style={{ backgroundColor: on ? '#ffffff' : T.ink }}
                        />
                        <span className="flex-1 text-right text-[11.5px] font-bold order-2">{n.label}</span>
                        {n.badge && (
                          <span
                            className="w-4 h-4 flex items-center justify-center text-[8px] font-bold order-1 shrink-0"
                            style={{
                              borderRadius: R.pill,
                              backgroundColor: on ? '#ffffff' : T.primary,
                              color: on ? T.primary : '#ffffff',
                            }}
                          >
                            {n.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${T.border}` }}>
                <Link
                  href={advisorLogout.href}
                  className="flex items-center gap-2.5 px-3 py-2.5"
                  style={{ borderRadius: R.md, color: T.muted }}
                >
                  <Icon name={advisorLogout.icon} size={16} className="shrink-0 order-2" style={{ backgroundColor: T.muted }} />
                  <span className="flex-1 text-right text-[11.5px] font-bold order-1">{advisorLogout.label}</span>
                </Link>
              </div>
            </nav>
          </aside>

          <main className="min-w-0 space-y-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
