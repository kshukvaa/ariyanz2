'use client';

import React, { useEffect, useRef } from 'react';

/* Pins a horizontal rail while the page scrolls past it, converting that
   vertical distance into horizontal travel — so the whole carousel goes by
   before the page moves on.

   Deliberately NOT event hijacking: nothing calls preventDefault, and the
   scroll is never driven by a timer. A tall track holds a sticky child, and
   scroll position through the track maps straight onto the rail's scrollLeft.
   Native momentum, flick-back, and scrollbars all keep working, and a viewer
   who wants out just keeps scrolling.

   Mobile only — the desktop layouts are grids that already show every card,
   so there is nothing to travel through. */

const MOBILE_QUERY = '(max-width: 767px)';
/* Matches the fixed header so the pinned rail parks just below it. */
const STICKY_TOP = 78;

export default function ScrollPinnedRail({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const mq = window.matchMedia(MOBILE_QUERY);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let rail: HTMLElement | null = null;
    let max = 0;
    /* Chrome reports RTL scrollLeft as negative, other engines as positive;
       probe once rather than sniffing the engine. */
    let positive = true;

    const findRail = () =>
      (Array.from(pin.querySelectorAll<HTMLElement>('*')).find(
        (el) => el.scrollWidth - el.clientWidth > 8
      ) || null);

    const teardown = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      track.style.height = '';
      pin.style.position = '';
      pin.style.top = '';
      if (rail) {
        rail.style.scrollSnapType = '';
        rail.style.scrollBehavior = '';
      }
      rail = null;
    };

    function measure() {
      if (!track || !pin) return;
      rail = findRail();
      if (!rail) {
        track.style.height = '';
        return;
      }
      max = rail.scrollWidth - rail.clientWidth;
      if (max <= 8) {
        track.style.height = '';
        pin.style.position = '';
        return;
      }
      /* Probe the RTL scroll direction. */
      const before = rail.scrollLeft;
      rail.scrollLeft = max;
      positive = rail.scrollLeft > 0;
      rail.scrollLeft = before;

      /* Snap points fight a programmatic scrollLeft, so drop them while pinned.
         `scroll-behavior: smooth` is inherited from <html>, which would turn
         every frame's assignment into its own easing animation and leave the
         rail lagging the page badly — force instant positioning instead. */
      rail.style.scrollSnapType = 'none';
      rail.style.scrollBehavior = 'auto';

      pin.style.position = 'sticky';
      pin.style.top = `${STICKY_TOP}px`;
      /* 1:1 — a pixel of page scroll is a pixel of rail travel, plus the
         height of the pinned block itself so it can fully pass through. */
      track.style.height = `${pin.offsetHeight + max}px`;
      apply();
    }

    function apply() {
      if (!track || !pin || !rail || max <= 8) return;
      const total = track.offsetHeight - pin.offsetHeight;
      if (total <= 0) return;
      const travelled = STICKY_TOP - track.getBoundingClientRect().top;
      const t = Math.min(Math.max(travelled / total, 0), 1);
      rail.scrollLeft = positive ? t * max : -t * max;
    }

    function onScroll() {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          apply();
        });
      }
    }

    const sync = () => {
      teardown();
      if (!mq.matches || reduced.matches) return;
      measure();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', measure);
    };

    sync();
    mq.addEventListener('change', sync);
    reduced.addEventListener('change', sync);

    /* Card images load late and change the rail's scrollWidth. */
    const ro = new ResizeObserver(() => {
      if (mq.matches && !reduced.matches) measure();
    });
    ro.observe(pin);

    return () => {
      mq.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
      ro.disconnect();
      teardown();
    };
  }, []);

  return (
    <div ref={trackRef}>
      <div ref={pinRef}>{children}</div>
    </div>
  );
}
