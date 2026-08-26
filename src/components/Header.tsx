'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import Logo3D from '@/components/Logo3D';
import { topBar, brand, navItems, type NavItem, type MegaCard } from '@/data/landing';
import { logoSrc } from '@/data/slotImages';
import { mobileMenu, useMobileMenuOpen } from '@/lib/mobile-menu';

/* â”€â”€ Mega-menu panel (desktop) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const MENU_NAVY = '#16305B';

/** One link row â€” items are separated by hairlines, not bullets. */
function MenuLink({ label, href }: { label: string; href: string }) {
  return (
    <li className="border-b border-gray-100 last:border-0">
      <Link
        href={href}
        className="block text-[13.5px] text-gray-600 hover:text-orange-500 transition-colors py-3.5 text-right"
      >
        {label}
      </Link>
    </li>
  );
}

/** Icon card â€” used by panels that list channels rather than links. */
function MenuCard({ card, last }: { card: MegaCard; last: boolean }) {
  return (
    <Link
      href={card.href}
      className={`group flex flex-col items-center text-center px-5 py-2 ${
        last ? '' : 'border-l border-gray-100'
      }`}
    >
      <span className="w-[88px] h-[88px] rounded-full bg-gray-100 group-hover:bg-orange-50 transition-colors flex items-center justify-center mb-6">
        <Icon
          name={card.icon}
          size={38}
          style={{ backgroundColor: card.iconColor ?? MENU_NAVY }}
        />
      </span>
      <h3 className="text-[17px] font-black mb-4" style={{ color: MENU_NAVY }}>
        {card.title}
      </h3>
      <p className="text-[12.5px] text-gray-500 leading-8 whitespace-pre-line mb-6">{card.desc}</p>
      <Icon
        name="lucide:arrow-left"
        size={26}
        className="mt-auto text-orange-500 transition-transform group-hover:-translate-x-1"
      />
    </Link>
  );
}

function MegaMenu({ item }: { item: NavItem }) {
  return (
    <div className="p-6 grid gap-6" style={{ gridTemplateColumns: '1fr 300px' }}>
      {/* Cards variant â€” channel tiles divided by vertical rules */}
      {item.cards ? (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${item.cards.length}, 1fr)` }}>
          {item.cards.map((card, i) => (
            <MenuCard key={card.title} card={card} last={i === item.cards!.length - 1} />
          ))}
        </div>
      ) : (
      /* Link columns â€” divided by vertical rules */
      <div className="grid grid-cols-3">
        {item.columns.map((col, i) => (
          <div key={col.title} className={`px-6 ${i > 0 ? 'border-l border-gray-100' : ''}`}>
            {/* Title sits right, icon to its left, orange rule beneath */}
            <h3
              className="flex items-center justify-end gap-2.5 text-[15px] font-black mb-1"
              style={{ color: MENU_NAVY }}
            >
              <span>{col.title}</span>
              <Icon name={col.icon} size={20} style={{ backgroundColor: MENU_NAVY }} />
            </h3>
            <span className="block w-7 h-[3px] rounded-full bg-orange-400 mb-2 mr-auto" />

            {col.groups ? (
              <div className="space-y-4">
                {col.groups.map((g) => (
                  <div key={g.title}>
                    <p
                      className="text-[13px] font-black text-right py-2"
                      style={{ color: MENU_NAVY }}
                    >
                      {g.title}
                    </p>
                    <ul className="space-y-0.5">
                      {g.items.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            className="flex items-center justify-end gap-2 text-[13px] text-gray-600 hover:text-orange-500 transition-colors py-1.5"
                          >
                            <span>{sub.label}</span>
                            <span className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul>
                {col.items.map((sub) => (
                  <MenuLink key={sub.label} label={sub.label} href={sub.href} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      )}

      {/* Promo card */}
      <div className="rounded-2xl p-6 text-center bg-[#FDF3EA] flex flex-col">
        {item.promo.slot ? (
          <ImageSlot
            id={item.promo.slot}
            label={item.promo.title}
            ratio="aspect-[4/3]"
            fit="contain"
            className="mb-4 !bg-transparent !border-0"
            icon={item.icon}
          />
        ) : (
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <Icon name={item.icon} size={30} className="text-orange-500" />
          </div>
        )}

        <h4
          className="text-[19px] font-black leading-9 mb-3 whitespace-pre-line"
          style={{ color: MENU_NAVY }}
        >
          {item.promo.title}
        </h4>
        <p className="text-[12.5px] text-gray-500 leading-7 mb-5">{item.promo.desc}</p>

        <Link
          href={item.href}
          className="mt-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-[13.5px] font-bold px-4 py-3.5 rounded-xl transition-all"
        >
          <span>{item.promo.cta}</span>
          <Icon name="lucide:arrow-left" size={16} className="text-white" />
        </Link>
      </div>
    </div>
  );
}


/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* The bar is fixed, so it no longer occupies space in the flow. A spacer
     of the measured height keeps the page from sliding up underneath it â€”
     measured rather than hard-coded, because the header is two rows taller
     on desktop and grows again if a row ever wraps. */
  const barRef = useRef<HTMLElement>(null);
  const [barH, setBarH] = useState<number | null>(null);
  /* Same state the bottom bar's disc drives, so the two toggles agree. */
  const menuOpen = useMobileMenuOpen();

  const open = useCallback((id: string) => {
    if (timeout.current) clearTimeout(timeout.current);
    setActive(id);
  }, []);

  const close = useCallback(() => {
    timeout.current = setTimeout(() => setActive(null), 150);
  }, []);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    /* Measure the bar itself, not the open mega-menu panel hanging below it. */
    const measure = () => setBarH(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const activeItem = active ? navItems.find((n) => n.id === active) : null;

  return (
    <>
      {/* Reserves the fixed bar's height. The class heights are the server-side
          default so the first paint is already correct; the measured value
          takes over on hydration and tracks any later change. */}
      <div
        aria-hidden="true"
        className="h-[78px] md:h-[185px]"
        style={barH === null ? undefined : { height: barH }}
      />
    <header
      ref={barRef}
      className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-sm"
    >
      {/* Top bar â€” desktop only */}
      <div className="hidden md:block border-b border-gray-100 bg-white">
        {/* RTL + justify-between: the first child sits on the right,
            the last on the left. */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-10"
          style={{ fontSize: '0.6rem' }}
        >
          <Link
            href={topBar.auth.href}
            className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 transition-colors font-medium"
          >
            <Icon name={topBar.auth.icon} size={14} />
            <span>{topBar.auth.label}</span>
          </Link>

          {/* Reads right-to-left as: Ø¢Ù†Ù„Ø§ÛŒÙ† Ù‡Ø³ØªÛŒÙ… | ÙˆØ§ØªØ³Ø§Ù¾ | Ø´Ù…Ø§Ø±Ù‡ ØªÙ…Ø§Ø³ */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{topBar.online.label}</span>
            </span>
            <span className="text-gray-200">|</span>
            <a href={topBar.chat.href} className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <Icon name={topBar.chat.icon} size={14} className="text-emerald-600" />
              <span>{topBar.chat.label}</span>
            </a>
            <span className="text-gray-200">|</span>
            <a href={topBar.phone.href} className="flex items-center gap-1.5 text-blue-800 font-semibold">
              <Icon name={topBar.phone.icon} size={13} className="text-blue-800" />
              <span dir="ltr">{topBar.phone.label}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Brand row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* The 3D mark needs an explicit box â€” its canvas is absolute.
              2.1:1 matches the flat logo, so the footprint is unchanged. */}
          {/* Mobile only. The wrapper takes the same share of the row as the
              action group opposite it, which is what lands the mark dead
              centre without absolute positioning collapsing the row height. */}
          <div className="flex md:hidden flex-1 basis-0">
            <button
              type="button"
              onClick={() => mobileMenu.toggle()}
              aria-expanded={menuOpen}
              aria-controls="ar-mobile-menu"
              aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
              className={`ar-hdr-menu${menuOpen ? ' is-open' : ''}`}
            >
              <span className="ar-hdr-menu-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
          </div>

          <Link href="/" className="flex flex-col items-center md:items-start shrink-0">
            <Logo3D
              fallbackSrc={logoSrc}
              alt={brand.name}
              intervalSec={15}
              className="h-9 w-[76px] md:h-11 md:w-[92px]"
            />
            <span className="text-[10px] md:text-[11px] text-gray-500 mt-0.5">{brand.tagline}</span>
          </Link>

          <div className="flex-1 max-w-md mx-4 relative hidden lg:block">
            <input
              type="search"
              placeholder={brand.searchPlaceholder}
              className="w-full border border-gray-200 rounded-xl py-2.5 pr-11 pl-4 text-sm bg-gray-50/60 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <Icon
              name="lucide:search"
              size={18}
              className="text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 shrink-0 flex-1 basis-0 md:flex-none">
            <Link
              href={brand.ctaPrimary.href}
              className="hidden lg:flex items-center gap-2 border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 text-gray-800 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all btn-press"
              data-magnetic
            >
              <Icon name={brand.ctaPrimary.icon} size={16} />
              <span>{brand.ctaPrimary.label}</span>
            </Link>
            <Link
              href={brand.ctaSecondary.href}
              className="hidden sm:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all hover:shadow-lg hover:shadow-orange-200 btn-press"
              data-magnetic
              data-ripple
            >
              <Icon name={brand.ctaSecondary.icon} size={16} className="text-white" />
              <span>{brand.ctaSecondary.label}</span>
            </Link>
            <a
              href={topBar.phone.href}
              className="md:hidden p-2 text-gray-600"
              aria-label={topBar.phone.label}
            >
              <Icon name={topBar.phone.icon} size={21} />
            </a>
            {/* The mobile hamburger sits at the start of the row, opposite
                this group; it opens the same menu as the bottom bar. */}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className="border-t border-gray-100 bg-white hidden md:block relative"
        onMouseLeave={close}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center justify-between gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} onMouseEnter={() => open(item.id)}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 py-3.5 px-1.5 text-[12.5px] font-semibold whitespace-nowrap transition-colors border-b-2 ${
                      isActive
                        ? 'text-orange-500 border-orange-500'
                        : 'text-gray-600 border-transparent hover:text-orange-500 hover:border-orange-300'
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                    <Icon
                      name="lucide:chevron-down"
                      size={13}
                      className={`transition-transform ${isActive ? 'rotate-180' : ''}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {activeItem && (
          <div
            className="absolute top-full right-0 left-0 bg-white border-t border-gray-100 shadow-xl shadow-gray-200/50 submenu-enter z-50"
            onMouseEnter={() => open(activeItem.id)}
          >
            <div className="max-w-7xl mx-auto">
              <MegaMenu item={activeItem} />
              {/* Reassurance strip */}
              <div className="px-6 pb-6">
                <div className="bg-[#FAFAFB] rounded-2xl px-4 py-4 grid grid-cols-4">
                  {activeItem.features.map((f, i) => (
                    <span
                      key={f.text}
                      className={`flex items-center justify-center gap-2.5 text-[12.5px] px-3 ${
                        i > 0 ? 'border-l border-gray-200' : ''
                      }`}
                      style={{ color: MENU_NAVY }}
                    >
                      <span className="text-center leading-6 whitespace-pre-line">{f.text}</span>
                      <Icon
                        name={f.icon}
                        size={22}
                        className="shrink-0"
                        style={{ backgroundColor: MENU_NAVY }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

    </header>
    </>
  );
}
