'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import { orgNav, orgNavFoot, orgLogout, orgBrand, orgUser, type NavItem } from '@/data/orgNav';

/* ──────────────────────────────────────────────────────────────
   The organisation workspace shell.

   A signed-in tool, so none of the marketing chrome survives: a
   near-black rail pinned to the right (this is an RTL product —
   the rail belongs on the side the eye starts from), a thin white
   bar carrying search and the one action worth a saturated fill,
   and everything else left quiet so the data can be the loud part.

   Two rail entries expand instead of navigating. They open on the
   active section rather than on click alone, so arriving at a
   report already shows you its siblings.
────────────────────────────────────────────────────────────── */

export default function PanelChrome({
  active,
  activeChild,
  search = 'جستجو در آریاز...',
  nav = orgNav,
  children,
}: {
  active: string;
  activeChild?: string;
  /** The development module supplies its own rail (screens 43–45). */
  nav?: NavItem[];
  /** Placeholder differs per section in the mockups. */
  search?: string;
  children: React.ReactNode;
}) {
  const [drawer, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(active);

  return (
    <div className="min-h-screen lg:flex" style={{ backgroundColor: T.page }}>
      {/* ── Rail ─────────────────────────────────────────────── */}
      <aside
        /* The drawer transform is scoped to max-lg, so at desktop no
           translate rule exists at all and the rail is a plain column. */
        className={`fixed lg:sticky top-0 z-50 h-screen w-[248px] shrink-0 flex flex-col transition-transform duration-300 ${
          drawer ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'
        }`}
        style={{ backgroundColor: T.sidebar, right: 0 }}
      >
        <div className="px-6 pt-7 pb-6">
          <div className="flex items-center justify-end gap-2.5">
            <span className="text-[26px] font-extrabold text-white leading-none">
              {orgBrand.name}
            </span>
            <img src={orgBrand.mark} alt="" className="h-8 w-auto" />
          </div>
          <p className="mt-2 text-[10.5px] text-left" style={{ color: '#8f96bd' }}>
            {orgBrand.tagline}
          </p>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-3.5 space-y-1"
          aria-label="ناوبری پنل سازمانی"
        >
          {nav.map((item) => {
            const on = item.id === active;
            const open = expanded === item.id && !!item.children;

            return (
              <div key={item.id}>
                <Link
                  href={item.href}
                  aria-current={on ? 'page' : undefined}
                  onClick={
                    item.children
                      ? (e) => {
                          /* Let the section's own page load, but if we are
                             already inside it the click is only a toggle. */
                          if (on) {
                            e.preventDefault();
                            setExpanded(open ? null : item.id);
                          }
                        }
                      : undefined
                  }
                  className="flex items-center gap-3 px-4 py-3 text-[13.5px] font-bold transition-colors"
                  style={{
                    borderRadius: R.md,
                    backgroundColor: on ? T.primary : 'transparent',
                    color: on ? '#fff' : '#b6bcd8',
                  }}
                >
                  <Icon
                    name={item.icon}
                    size={19}
                    style={{ backgroundColor: on ? '#fff' : '#8f96bd' }}
                  />
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.children && (
                    <Icon
                      name="lucide:chevron-down"
                      size={14}
                      style={{
                        backgroundColor: on ? '#fff' : '#8f96bd',
                        transform: open ? 'rotate(180deg)' : undefined,
                        transition: 'transform .2s',
                      }}
                    />
                  )}
                </Link>

                {open && (
                  <div className="mt-1 mb-1.5 space-y-0.5">
                    {item.children!.map((c) => {
                      const cOn = c.id === activeChild;
                      return (
                        <Link
                          key={c.id}
                          href={c.href}
                          aria-current={cOn ? 'page' : undefined}
                          className="flex items-center gap-2.5 py-2.5 pr-9 pl-4 text-[12.5px] transition-colors"
                          style={{
                            borderRadius: R.sm,
                            color: cOn ? '#fff' : '#9aa1c4',
                            fontWeight: cOn ? 700 : 500,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: cOn ? T.accent : 'transparent',
                              border: cOn ? undefined : '1px solid #4a5288',
                            }}
                          />
                          <span className="flex-1 text-right">{c.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-3.5 pb-5 pt-3 space-y-1">
          {orgNavFoot.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-[12.5px] font-bold"
              style={{ borderRadius: R.md, color: '#b6bcd8' }}
            >
              <Icon name={item.icon} size={18} style={{ backgroundColor: '#8f96bd' }} />
              <span className="flex-1 text-right">{item.label}</span>
            </Link>
          ))}

          <div className="flex items-center gap-3 px-3 py-3">
            <img
              src={orgUser.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <span className="flex-1 text-right min-w-0">
              <span className="block text-[13px] font-bold text-white truncate">
                {orgUser.name}
              </span>
              <span className="block text-[10.5px]" style={{ color: '#8f96bd' }}>
                {orgUser.role}
              </span>
            </span>
            <Icon
              name="lucide:chevron-down"
              size={14}
              style={{ backgroundColor: '#8f96bd' }}
            />
          </div>

          <Link
            href={orgLogout.href}
            className="flex items-center gap-3 px-4 py-3 text-[12.5px] font-bold"
            style={{ borderRadius: R.md, color: '#b6bcd8' }}
          >
            <Icon name={orgLogout.icon} size={18} style={{ backgroundColor: '#8f96bd' }} />
            <span className="flex-1 text-right">{orgLogout.label}</span>
          </Link>
        </div>
      </aside>

      {drawer && (
        <button
          aria-label="بستن منو"
          onClick={() => setDrawer(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ── Work area ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <header
          className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-7 py-3.5 bg-white"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <button
            onClick={() => setDrawer(true)}
            aria-label="باز کردن منو"
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name="lucide:menu" size={18} style={{ backgroundColor: T.ink }} />
          </button>

          {/* RTL: the first flex child lands on the right, so search sits
              against the rail and the account cluster on the far edge —
              the arrangement every mockup from screen 11 onward uses. */}
          <label
            className="flex items-center gap-2.5 px-4 py-2.5 w-full max-w-[330px] max-md:hidden"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <input
              type="search"
              placeholder={search}
              className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: T.ink }}
            />
            <Icon name="lucide:search" size={17} style={{ backgroundColor: T.muted }} />
          </label>

          <div className="flex-1" />

          <button
            aria-label="راهنما"
            className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md }}
          >
            <Icon
              name="lucide:circle-help"
              size={19}
              style={{ backgroundColor: T.ink }}
            />
          </button>

          <button
            aria-label={`اعلان‌ها (${orgUser.notifications})`}
            className="relative w-10 h-10 flex items-center justify-center transition-colors hover:bg-gray-50"
            style={{ borderRadius: R.md }}
          >
            <Icon name="lucide:bell" size={19} style={{ backgroundColor: T.ink }} />
            <span
              className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] rounded-full text-[9.5px] font-bold text-white flex items-center justify-center px-1"
              style={{ backgroundColor: T.danger }}
            >
              {fa(orgUser.notifications)}
            </span>
          </button>

          <span
            className="flex items-center gap-2.5 px-3.5 py-2.5 max-sm:hidden"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <img
              src={orgUser.avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-right leading-tight">
              <span className="block text-[12.5px] font-bold" style={{ color: T.ink }}>
                {orgUser.name}
              </span>
              <span className="block text-[10.5px]" style={{ color: T.muted }}>
                {orgUser.role}
              </span>
            </span>
            <Icon
              name="lucide:chevron-down"
              size={14}
              style={{ backgroundColor: T.muted }}
            />
          </span>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
