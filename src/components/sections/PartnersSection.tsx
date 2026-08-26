'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import ScrollAnimator, { StaggerContainer, AnimatedCounter } from '@/components/ScrollAnimator';
import SectionHeading from '@/components/SectionHeading';
import {
  partnersHeading,
  partners,
  defaultPartnerId,
  caseStudyLabels,
  partnerStats,
  partnerStatsHeading,
  expertiseStrip,
  expertiseHeading,
  partnerContact,
  type Partner,
} from '@/data/landing';

/** Headings and stat figures share the header's navy. */
const PARTNER_NAVY = '#16305B';

/** How long a brand stays selected before the carousel moves on. */
const AUTOPLAY_MS = 5000;
/** Autoplay stays off this long after the visitor picks a brand. */
const RESUME_MS = 12000;

function LogoTile({
  p,
  selected,
  onSelect,
  className = '',
}: {
  p: Partner;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`${className} shrink-0 rounded-2xl border p-3 bg-white text-center transition-all ${
        selected
          ? 'border-orange-300 shadow-md shadow-orange-100'
          : 'border-gray-100 opacity-70 hover:opacity-100 hover:border-gray-200'
      }`}
    >
      <ImageSlot
        id={p.slot}
        label={p.label}
        ratio="aspect-[3/2]"
        icon="lucide:building-2"
        rounded="rounded-xl"
        className="border-0 bg-transparent"
      />
      <span
        dir="rtl"
        className={`block text-[11px] font-bold mt-1 ${
          selected ? 'text-orange-500' : 'text-gray-500'
        }`}
      >
        {p.label}
      </span>
    </button>
  );
}

export default function PartnersSection() {
  const [activeId, setActiveId] = useState(defaultPartnerId);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = partners.find((p) => p.id === activeId) ?? partners[0];
  const activeIndex = partners.findIndex((p) => p.id === active.id);

  /* The track runs LTR with the list reversed, so the visual
     right-to-left order survives without fighting RTL's inverted
     scrollLeft. Index 0 is therefore the LAST tile of a copy.

     Three identical copies are rendered so the rail never runs out
     of tiles at either edge. We normally sit in the middle copy;
     wrapping scrolls into a neighbouring copy and then snaps back
     to the middle one — invisible, because the copies are identical. */
  const N = partners.length;
  const COPIES = 3;
  const MIDDLE = 1;
  const reversed = [...partners].reverse();

  const scrollToTile = useCallback(
    (copy: number, i: number, smooth: boolean) => {
      const el = trackRef.current;
      if (!el) return;
      const child = el.children[copy * N + (N - 1 - i)] as HTMLElement | undefined;
      if (!child) return;
      const left = child.offsetLeft - (el.clientWidth - child.clientWidth) / 2;
      el.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' });
    },
    [N]
  );

  const select = useCallback(
    (raw: number, fromUser: boolean) => {
      const cur = partners.findIndex((p) => p.id === activeId);
      const next = ((raw % N) + N) % N;
      const delta = raw - cur;

      /* Stepping off either end: ride into the neighbouring copy so the
         motion continues in the same direction, then snap back. The
         list is reversed, so advancing moves LEFT — forward wraps into
         the copy before the middle one, not the one after. */
      if (delta === 1 && next === 0) {
        scrollToTile(MIDDLE - 1, 0, true);
        setTimeout(() => scrollToTile(MIDDLE, 0, false), 600);
      } else if (delta === -1 && next === N - 1) {
        scrollToTile(MIDDLE + 1, N - 1, true);
        setTimeout(() => scrollToTile(MIDDLE, N - 1, false), 600);
      } else {
        scrollToTile(MIDDLE, next, true);
      }

      setActiveId(partners[next].id);
      if (fromUser) {
        setPaused(true);
        if (resumeRef.current) clearTimeout(resumeRef.current);
        resumeRef.current = setTimeout(() => setPaused(false), RESUME_MS);
      }
    },
    [activeId, N, scrollToTile]
  );

  /* Start centred on the default brand, in the middle copy. */
  useEffect(() => {
    scrollToTile(MIDDLE, partners.findIndex((p) => p.id === defaultPartnerId), false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => select(activeIndex + 1, false), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, activeIndex, select]);

  useEffect(
    () => () => {
      if (resumeRef.current) clearTimeout(resumeRef.current);
    },
    []
  );

  const meta = [
    { ...caseStudyLabels.field, value: active.case.field },
    { ...caseStudyLabels.service, value: active.case.service },
    { ...caseStudyLabels.duration, value: active.case.duration },
    { ...caseStudyLabels.year, value: active.case.year },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title={partnersHeading.title} desc={partnersHeading.desc} />

        {/* Logo carousel — desktop */}
        <div
          className="hidden md:block relative mb-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            dir="ltr"
            className="flex gap-3 overflow-x-auto ar-no-scrollbar scroll-smooth px-1 py-1"
          >
            {Array.from({ length: COPIES }).flatMap((_, copy) =>
              reversed.map((p) => (
                <LogoTile
                  key={`${copy}-${p.id}`}
                  p={p}
                  selected={p.id === active.id}
                  onSelect={() => select(partners.findIndex((x) => x.id === p.id), true)}
                  className="basis-[calc((100%-3rem)/5)] lg:basis-[calc((100%-4.5rem)/7)]"
                />
              ))
            )}
          </div>

          <button
            type="button"
            onClick={() => select(activeIndex + 1, true)}
            aria-label="نشان بعدی"
            className="absolute top-1/2 -translate-y-1/2 -left-3 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-300 transition-colors"
          >
            <Icon name="lucide:chevron-left" size={18} />
          </button>
          <button
            type="button"
            onClick={() => select(activeIndex - 1, true)}
            aria-label="نشان قبلی"
            className="absolute top-1/2 -translate-y-1/2 -right-3 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-300 transition-colors"
          >
            <Icon name="lucide:chevron-right" size={18} />
          </button>
        </div>

        {/* Logo rail — mobile swipe */}
        <div className="flex md:hidden ar-rail mb-8 -mx-4 px-4">
          {partners.map((p) => (
            <LogoTile
              key={p.id}
              p={p}
              selected={p.id === active.id}
              onSelect={() => select(partners.findIndex((x) => x.id === p.id), true)}
              className="ar-rail-item w-28 p-2.5"
            />
          ))}
        </div>

        {/* Case study — follows the selected brand */}
        <ScrollAnimator animation="fade-up" className="mb-10">
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            {/* RTL: meta column right, copy in the middle, photo left */}
            <div
              key={active.id}
              className="grid lg:grid-cols-[0.8fr_1.1fr_1fr] animate-fade-in"
            >
              <div className="p-6 md:p-8 lg:border-l border-gray-100 flex flex-col justify-center gap-6">
                {meta.map((m) => (
                  <div key={m.label} className="flex items-start gap-3">
                    <Icon name={m.icon} size={22} className="text-orange-500 shrink-0 mt-0.5" />
                    <span>
                      <span className="block text-[13px] font-bold" style={{ color: PARTNER_NAVY }}>
                        {m.label}
                      </span>
                      <span className="block text-[12.5px] text-gray-500 leading-6 mt-1">
                        {m.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[11px] font-bold px-3 py-1.5 rounded-full w-fit mb-4">
                  {caseStudyLabels.badge}
                </span>
                <h3 className="text-2xl font-black mb-2" style={{ color: PARTNER_NAVY }}>
                  {active.label}
                </h3>
                <p className="text-[15px] font-bold text-orange-500 mb-4">{active.case.title}</p>
                <p className="text-[13px] text-gray-500 leading-8 mb-7">{active.case.summary}</p>

                <Link
                  href={caseStudyLabels.cta.href}
                  className="inline-flex items-center gap-2 border border-orange-300 text-orange-500 hover:bg-orange-50 px-5 py-3 rounded-xl text-[13px] font-bold w-fit transition-all btn-press"
                  data-ripple
                >
                  <span>{caseStudyLabels.cta.label}</span>
                  <Icon name="lucide:arrow-left" size={15} className="text-orange-500" />
                </Link>
              </div>

              <div className="p-4 md:p-5">
                <ImageSlot
                  id={active.case.slot}
                  label={active.case.slotLabel}
                  ratio="aspect-[16/10]"
                  icon="lucide:building-2"
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </ScrollAnimator>

        {/* Stats */}
        <ScrollAnimator className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-black" style={{ color: PARTNER_NAVY }}>
            {partnerStatsHeading}
          </h3>
        </ScrollAnimator>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {partnerStats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover-lift"
            >
              <Icon name={s.icon} size={30} className="mx-auto mb-3 text-orange-500" />
              <AnimatedCounter
                value={s.value}
                className="block text-2xl font-black"
                style={{ color: PARTNER_NAVY }}
              />
              <p className="text-[12px] font-bold mt-2 leading-5" style={{ color: PARTNER_NAVY }}>
                {s.label}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 leading-5">{s.desc}</p>
            </div>
          ))}
        </StaggerContainer>

        {/* Expertise strip */}
        <ScrollAnimator className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-black" style={{ color: PARTNER_NAVY }}>
            {expertiseHeading}
          </h3>
        </ScrollAnimator>
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-6 mb-8">
          <div className="grid md:grid-cols-5 gap-y-6">
            {expertiseStrip.map((e, i) => (
              <span
                key={e.text}
                className={`flex items-center justify-center gap-3 px-4 ${
                  i < expertiseStrip.length - 1 ? 'md:border-l border-gray-100' : ''
                }`}
              >
                <Icon name={e.icon} size={26} className="text-orange-500 shrink-0" />
                <span className="text-right">
                  <span className="block text-[13px] font-bold" style={{ color: PARTNER_NAVY }}>
                    {e.text}
                  </span>
                  <span className="block text-[11.5px] text-gray-400 leading-6 mt-0.5">
                    {e.desc}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Contact row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-900 rounded-2xl px-6 py-5">
          <Link
            href={partnerContact.meeting.href}
            className="flex items-center gap-2.5 text-white/80 hover:text-white text-[13px] font-medium transition-colors"
          >
            <Icon name={partnerContact.meeting.icon} size={18} className="text-orange-400" />
            <span>{partnerContact.meeting.label}</span>
          </Link>

          <Link
            href={partnerContact.cta.href}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all btn-press"
            data-ripple
          >
            <span>{partnerContact.cta.label}</span>
            <Icon name="lucide:arrow-left" size={16} className="text-white" />
          </Link>

          <a
            href="tel:02191017134"
            className="flex items-center gap-2.5 text-white/80 hover:text-white text-[13px] transition-colors"
          >
            <Icon name={partnerContact.phone.icon} size={18} className="text-emerald-400" />
            <span>{partnerContact.phone.label}</span>
            <span dir="ltr" className="font-bold">
              {partnerContact.phone.value}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
