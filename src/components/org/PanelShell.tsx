'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import {
  panelTheme,
  panelOrg,
  panelUser,
  panelNav,
  panelFootNav,
  panelLogout,
  panelNewEvaluation,
} from '@/data/orgPanel';

/* ──────────────────────────────────────────────────────────────
   The organisation workspace shell.

   Signed-in tooling, so the site's marketing chrome is gone: a
   dark rail holds navigation on the right, the work fills the
   rest, and the only saturated thing in the bar is the one action
   a manager comes here to take.
────────────────────────────────────────────────────────────── */

export default function PanelShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex" style={{ backgroundColor: panelTheme.page }}>
      {/* ── Rail ────────────────────────────────────────────── */}
      <aside
        /* The drawer transform is scoped to max-lg so no translate rule
           exists at desktop, where the rail is a plain flex column. */
        className={`fixed lg:sticky top-0 z-50 h-screen w-[236px] shrink-0 flex flex-col transition-transform ${
          open ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'
        }`}
        style={{ backgroundColor: panelTheme.rail, right: 0 }}
      >
        <div className="px-5 pt-6 pb-5 text-center">
          <img src={panelOrg.logo} alt="آریاز" className="h-9 w-auto mx-auto mb-2" />
          <p className="text-[11px] leading-6" style={{ color: '#9AA2C8' }}>
            {panelOrg.name}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1" aria-label="ناوبری پنل سازمانی">
          {panelNav.map((item) => {
            const on = item.id === active;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={on ? 'page' : undefined}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-bold transition-colors"
                style={
                  on
                    ? { backgroundColor: panelTheme.violet, color: '#fff' }
                    : { color: '#B9C0DF' }
                }
              >
                <Icon
                  name={item.icon}
                  size={18}
                  style={{ backgroundColor: on ? '#fff' : '#8E97C4' }}
                />
                <span className="flex-1 text-right">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-4 pt-3 space-y-1">
          {panelFootNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[12.5px] font-bold transition-colors"
              style={{ color: '#B9C0DF' }}
            >
              <Icon name={item.icon} size={17} style={{ backgroundColor: '#8E97C4' }} />
              <span className="flex-1 text-right">{item.label}</span>
            </Link>
          ))}

          <div
            className="flex items-center gap-3 rounded-xl px-3 py-3"
            style={{ backgroundColor: panelTheme.railDeep }}
          >
            <img src={panelUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
            <span className="flex-1 text-right min-w-0">
              <span className="block text-[12.5px] font-bold text-white truncate">{panelUser.name}</span>
              <span className="block text-[10.5px]" style={{ color: '#8E97C4' }}>
                {panelUser.role}
              </span>
            </span>
            <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: '#8E97C4' }} />
          </div>

          <Link
            href={panelLogout.href}
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[12.5px] font-bold transition-colors"
            style={{ color: '#B9C0DF' }}
          >
            <Icon name={panelLogout.icon} size={17} style={{ backgroundColor: '#8E97C4' }} />
            <span className="flex-1 text-right">{panelLogout.label}</span>
          </Link>
        </div>
      </aside>

      {open && (
        <button
          aria-label="بستن منو"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ── Work area ───────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <header
          className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 py-3 bg-white border-b flex-wrap"
          style={{ borderColor: panelTheme.border }}
        >
          <button
            onClick={() => setOpen(true)}
            aria-label="باز کردن منو"
            className="lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center"
            style={{ borderColor: panelTheme.border }}
          >
            <Icon name="lucide:menu" size={18} style={{ backgroundColor: panelTheme.navy }} />
          </button>

          <span
            className="flex items-center gap-2.5 rounded-xl border px-3 py-2"
            style={{ borderColor: panelTheme.border }}
          >
            <img src={panelUser.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-[12.5px] font-bold" style={{ color: panelTheme.navy }}>
              {panelUser.name}
            </span>
            <Icon name="lucide:chevron-down" size={14} className="text-gray-400" />
          </span>

          <button
            aria-label={`اعلان‌ها (${panelUser.notifications})`}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-50"
          >
            <Icon name="lucide:bell" size={18} style={{ backgroundColor: panelTheme.navy }} />
            <span
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold text-white flex items-center justify-center px-1"
              style={{ backgroundColor: panelTheme.red }}
            >
              {toPersian(panelUser.notifications)}
            </span>
          </button>

          <button
            aria-label="راهنما"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-50"
          >
            <Icon name="lucide:circle-help" size={18} style={{ backgroundColor: panelTheme.navy }} />
          </button>

          <Link
            href={panelNewEvaluation.href}
            data-ripple
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: panelTheme.violet }}
          >
            <Icon name="lucide:plus" size={15} className="text-white" />
            <span>{panelNewEvaluation.label}</span>
          </Link>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
