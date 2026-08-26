'use client';

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import { mobileMenu, useMobileMenuOpen } from '@/lib/mobile-menu';
import {
  brand,
  navItems,
  mobileTabs,
  navTileColors,
  type NavItem,
  type MegaColumn,
} from '@/data/landing';
import { logoSrc } from '@/data/slotImages';

/* ──────────────────────────────────────────────────────────────
   MobileNav — the app bar and its full-screen menu.
   Mobile only (< 768px); the desktop mega-menu is untouched.

   The menu is a grouped inset list in the manner of an iOS
   settings screen: white cards on a cool grey canvas, a coloured
   rounded-square tile leading each row, hairline separators that
   start after the tile, and a chevron on the trailing side.

   It drills three levels over the same `navItems` the desktop
   menu reads — section → heading → links — and the search field
   at the top cuts straight to any link at any depth.

   Two controls open it: the disc in the bottom bar and the button
   in the header. Both read and write the shared store in
   `@/lib/mobile-menu`, so either one closes what the other opened.
────────────────────────────────────────────────────────────── */

type Frame =
  | { kind: 'root' }
  | { kind: 'nav'; navId: string }
  | { kind: 'group'; navId: string; colIdx: number };

interface Leaf {
  label: string;
  href: string;
  trail: string;
  color: string;
}

/** Every link in the menu, flattened once for the search field. */
function buildIndex(): Leaf[] {
  const out: Leaf[] = [];
  for (const nav of navItems) {
    const color = navTileColors[nav.id] ?? '#64748B';
    if (nav.cards) {
      for (const c of nav.cards) out.push({ label: c.title, href: c.href, trail: nav.label, color });
      continue;
    }
    for (const col of nav.columns) {
      const trail = `${nav.label} › ${col.title}`;
      if (col.groups) {
        for (const g of col.groups) {
          for (const s of g.items) out.push({ label: s.label, href: s.href, trail, color });
        }
      } else {
        for (const s of col.items) out.push({ label: s.label, href: s.href, trail, color });
      }
    }
  }
  return out;
}

export default function MobileNav() {
  const pathname = usePathname();
  const open = useMobileMenuOpen();
  const [stack, setStack] = useState<Frame[]>([{ kind: 'root' }]);
  const [motion, setMotion] = useState<'push' | 'pop'>('push');
  const [query, setQuery] = useState('');

  const index = useMemo(buildIndex, []);
  const frame = stack[stack.length - 1];
  const depth = stack.length - 1;
  const q = query.trim();

  const close = useCallback(() => mobileMenu.close(), []);

  const push = useCallback((f: Frame) => {
    setMotion('push');
    setStack((s) => [...s, f]);
  }, []);

  const pop = useCallback(() => {
    setMotion('pop');
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  /* Reset once the screen has finished closing, so reopening always
     starts at the top rather than mid-hierarchy. */
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStack([{ kind: 'root' }]);
      setQuery('');
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => mobileMenu.close(), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (q) setQuery('');
      else if (depth > 0) pop();
      else close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, depth, q, pop, close]);

  const activeNav = frame.kind === 'root' ? null : navItems.find((n) => n.id === frame.navId)!;
  const activeCol = frame.kind === 'group' && activeNav ? activeNav.columns[frame.colIdx] : null;

  const title = q
    ? 'نتایج جستجو'
    : frame.kind === 'root'
      ? 'منو'
      : frame.kind === 'nav'
        ? activeNav!.label
        : activeCol!.title;

  const results = q
    ? index.filter((l) => l.label.includes(q) || l.trail.includes(q)).slice(0, 40)
    : [];

  return (
    <>
      <div id="ar-mobile-menu" className="md:hidden" role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className={`ar-menu${open ? ' is-open' : ''}`}>
          <header className="ar-menu-head">
            {depth > 0 && !q ? (
              <button onClick={pop} aria-label="بازگشت" className="ar-menu-back">
                <Icon name="lucide:chevron-right" size={20} />
                <span>بازگشت</span>
              </button>
            ) : (
              /* At the top level there is nothing to go back to, so the slot
                 that would hold "بازگشت" carries the mark instead. */
              <Link href="/" onClick={close} className="ar-menu-brand" aria-label={brand.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoSrc} alt={brand.name} className="ar-menu-brand-mark" />
              </Link>
            )}

            <h2 key={title} className="ar-menu-title">
              {title}
            </h2>

            <button onClick={close} aria-label="بستن منو" className="ar-menu-close">
              <Icon name="lucide:x" size={18} />
            </button>
          </header>

          <div className="ar-menu-search">
            <Icon name="lucide:search" size={16} className="ar-menu-search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="جستجو در منو"
              aria-label="جستجو در منو"
            />
            {q && (
              <button onClick={() => setQuery('')} aria-label="پاک کردن جستجو">
                <Icon name="lucide:circle-x" size={16} />
              </button>
            )}
          </div>

          <div className="ar-menu-body">
            {q ? (
              <SearchResults results={results} onNavigate={close} />
            ) : (
              <div key={JSON.stringify(frame)} className={`ar-panel ar-panel-${motion}`}>
                {frame.kind === 'root' && (
                  <RootLevel onPick={(id) => push({ kind: 'nav', navId: id })} />
                )}
                {frame.kind === 'nav' && activeNav && (
                  <NavLevel
                    item={activeNav}
                    onPick={(colIdx) => push({ kind: 'group', navId: activeNav.id, colIdx })}
                    onNavigate={close}
                  />
                )}
                {frame.kind === 'group' && activeCol && (
                  <GroupLevel column={activeCol} onNavigate={close} />
                )}
              </div>
            )}
          </div>

          {/* The one thing the menu asks for, kept in view at every level
              rather than left at the end of a scroll. */}
          <div className="ar-menu-foot">
            <Link href={brand.ctaSecondary.href} onClick={close} className="ar-menu-cta">
              <Icon name={brand.ctaSecondary.icon} size={17} className="text-white" />
              <span>{brand.ctaSecondary.label}</span>
            </Link>
          </div>
        </div>
      </div>

      <TabBar open={open} onToggleMenu={() => mobileMenu.toggle()} />
    </>
  );
}

/* ── Bottom bar ─────────────────────────────────────────────── */

function TabBar({ open, onToggleMenu }: { open: boolean; onToggleMenu: () => void }) {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const activeIndex = open
    ? -1
    : mobileTabs.findIndex(
        (t) => t.href && (t.href === '/' ? pathname === '/' : pathname.startsWith(t.href))
      );

  /* Measured rather than computed, so it lands correctly under RTL. */
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => {
      if (activeIndex < 0) return setPill(null);
      const el = bar.querySelectorAll<HTMLElement>('[data-tab]')[activeIndex];
      if (!el) return;
      setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [activeIndex]);

  return (
    <nav
      className="ar-tabbar md:hidden"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
      aria-label="ناوبری اصلی"
    >
      <div ref={barRef} className="ar-tabbar-inner">
        {pill && (
          <span
            aria-hidden="true"
            className="ar-tabbar-pill"
            style={{ left: pill.left, width: pill.width }}
          />
        )}

        {mobileTabs.map((t, i) => {
          /* The menu sits in the middle as a raised disc — it is the one
             control that opens something rather than going somewhere. */
          if (t.action === 'menu') {
            return (
              <button
                key={t.label}
                data-tab
                onClick={onToggleMenu}
                aria-expanded={open}
                aria-label={open ? 'بستن منو' : t.label}
                className={`ar-tabbar-item ar-tabbar-menu${open ? ' is-open' : ''}`}
              >
                <span className="ar-tabbar-disc">
                  <Icon name={open && t.iconActive ? t.iconActive : t.icon} size={22} />
                </span>
                <span className="ar-tabbar-label">{t.label}</span>
              </button>
            );
          }

          const on = i === activeIndex;
          return (
            <Link
              key={t.label}
              data-tab
              href={t.href!}
              aria-current={on ? 'page' : undefined}
              className={`ar-tabbar-item${on ? ' is-on' : ''}`}
            >
              <Icon name={t.icon} size={20} className="ar-tabbar-icon" />
              <span className="ar-tabbar-label">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ── List primitives ────────────────────────────────────────── */

function Group({ header, children }: { header?: string; children: React.ReactNode }) {
  return (
    <section className="ar-ios-group">
      {header && <h3 className="ar-ios-header">{header}</h3>}
      <div className="ar-ios-card">{children}</div>
    </section>
  );
}

function Row({
  icon,
  color,
  label,
  detail,
  href,
  onClick,
  onNavigate,
}: {
  icon?: string;
  color?: string;
  label: string;
  detail?: string;
  href?: string;
  onClick?: () => void;
  onNavigate?: () => void;
}) {
  const inner = (
    <>
      {icon && (
        <span className="ar-ios-tile" style={{ backgroundColor: color }}>
          <Icon name={icon} size={15} className="text-white" />
        </span>
      )}
      <span className="ar-ios-label">{label}</span>
      {detail && <span className="ar-ios-detail">{detail}</span>}
      <Icon name="lucide:chevron-left" size={16} className="ar-ios-chevron" />
    </>
  );

  /* Rows without a tile pull their hairline back to the card edge, the
     way a settings list does when a group has no icons. */
  const cls = `ar-ios-row${icon ? '' : ' is-plain'}`;

  return href ? (
    <Link href={href} onClick={onNavigate} className={cls}>
      {inner}
    </Link>
  ) : (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ── Levels ─────────────────────────────────────────────────── */

function RootLevel({ onPick }: { onPick: (id: string) => void }) {
  return (
    <Group header="بخش‌های آریاز">
      {navItems.map((item) => (
        <Row
          key={item.id}
          icon={item.icon}
          color={navTileColors[item.id] ?? '#64748B'}
          label={item.label}
          detail={String(item.cards ? item.cards.length : item.columns.length)}
          onClick={() => onPick(item.id)}
        />
      ))}
    </Group>
  );
}

function NavLevel({
  item,
  onPick,
  onNavigate,
}: {
  item: NavItem;
  onPick: (colIdx: number) => void;
  onNavigate: () => void;
}) {
  const color = navTileColors[item.id] ?? '#64748B';

  return (
    <>
      <Group header={item.label}>
        {item.cards
          ? item.cards.map((c) => (
              <Row
                key={c.title}
                icon={c.icon}
                color={c.iconColor ?? color}
                label={c.title}
                href={c.href}
                onNavigate={onNavigate}
              />
            ))
          : item.columns.map((col, i) => (
              <Row
                key={col.title}
                icon={col.icon}
                color={color}
                label={col.title}
                detail={String(countOf(col))}
                onClick={() => onPick(i)}
              />
            ))}
      </Group>

      {/* The same promo the desktop mega-menu carries beside its columns,
          restacked: artwork, then the line that explains it, then the way in. */}
      <section className="ar-ios-group">
        <div className="ar-ios-card ar-promo">
          {item.promo.slot ? (
            <div className="ar-promo-media">
              <ImageSlot
                id={item.promo.slot}
                label={item.promo.title}
                ratio="aspect-[16/9]"
                fit="contain"
                rounded="rounded-[0.55rem]"
                icon={item.icon}
              />
            </div>
          ) : (
            <span className="ar-promo-fallback">
              <Icon name={item.icon} size={26} className="text-orange-500" />
            </span>
          )}
          <h4 className="ar-promo-title">{item.promo.title}</h4>
          <p className="ar-promo-desc">{item.promo.desc}</p>
          <Link href={item.href} onClick={onNavigate} className="ar-ios-row is-action">
            <span className="ar-ios-label">{item.promo.cta}</span>
            <Icon name="lucide:arrow-left" size={16} className="ar-ios-chevron" />
          </Link>
        </div>
      </section>
    </>
  );
}

function GroupLevel({ column, onNavigate }: { column: MegaColumn; onNavigate: () => void }) {
  if (column.groups) {
    return (
      <>
        {column.groups.map((g) => (
          <Group key={g.title} header={g.title}>
            {g.items.map((s) => (
              <Row key={s.label} label={s.label} href={s.href} onNavigate={onNavigate} />
            ))}
          </Group>
        ))}
      </>
    );
  }

  return (
    <Group header={column.title}>
      {column.items.map((s) => (
        <Row key={s.label} label={s.label} href={s.href} onNavigate={onNavigate} />
      ))}
    </Group>
  );
}

function SearchResults({ results, onNavigate }: { results: Leaf[]; onNavigate: () => void }) {
  if (!results.length) {
    return (
      <p className="ar-ios-empty">
        چیزی پیدا نشد. عبارت دیگری را امتحان کنید.
      </p>
    );
  }

  return (
    <Group header={`${results.length} نتیجه`}>
      {results.map((l) => (
        <Link
          key={l.trail + l.label}
          href={l.href}
          onClick={onNavigate}
          className="ar-ios-row is-result"
        >
          <span className="ar-ios-tile is-dot" style={{ backgroundColor: l.color }} />
          <span className="min-w-0 flex-1 text-right">
            <span className="ar-ios-label block">{l.label}</span>
            <span className="ar-ios-trail">{l.trail}</span>
          </span>
          <Icon name="lucide:chevron-left" size={16} className="ar-ios-chevron" />
        </Link>
      ))}
    </Group>
  );
}

const countOf = (col: MegaColumn) =>
  col.groups ? col.groups.reduce((n, g) => n + g.items.length, 0) : col.items.length;
