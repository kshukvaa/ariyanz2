'use client';

import { useSyncExternalStore } from 'react';

/* ──────────────────────────────────────────────────────────────
   Shared open/closed state for the mobile menu.

   Two controls open the same screen — the disc in the bottom bar
   and the button in the header — and they sit in different parts
   of the tree (the bar is mounted in the root layout, the header
   inside each page), so the state lives outside React rather than
   in a provider that would have to wrap both.
────────────────────────────────────────────────────────────── */

let isOpen = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => isOpen;
/* The menu is always closed on the server, so the first paint matches. */
const getServerSnapshot = () => false;

export const mobileMenu = {
  set(next: boolean) {
    if (isOpen === next) return;
    isOpen = next;
    emit();
  },
  open() {
    mobileMenu.set(true);
  },
  close() {
    mobileMenu.set(false);
  },
  toggle() {
    mobileMenu.set(!isOpen);
  },
};

/** Subscribes a component to the menu's open state. */
export function useMobileMenuOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
