'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import ScrollAnimator, { AnimatedCounter } from '@/components/ScrollAnimator';
import { slotImages } from '@/data/slotImages';
import {
  testimonialsHeading,
  testimonialTabs,
  testimonials,
  testimonialStats,
  testimonialsClosing,
  type Testimonial,
} from '@/data/landing';

const NAVY = '#16305B';
const AUTOPLAY_MS = 7000;
const RESUME_MS = 14000;

function Stars({ size = 22 }: { size?: number }) {
  return (
    <span className="flex items-center gap-1.5" aria-label="۵ از ۵">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="mdi:star" size={size} className="text-orange-500" />
      ))}
    </span>
  );
}

/** Faded neighbour shown either side of the featured quote. */
function SidePeek({ t, onClick }: { t: Testimonial; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden lg:flex flex-col items-center text-center w-full px-2 opacity-70 hover:opacity-100 transition-opacity"
    >
      <span className="w-[104px] h-[104px] rounded-full overflow-hidden ring-4 ring-white shadow-sm mb-3">
        <ImageSlot
          id={t.avatarSlot}
          label={t.name}
          ratio="aspect-square"
          rounded="rounded-full"
          icon="mdi:account-tie-outline"
        />
      </span>
      <span className="mb-3">
        <Stars size={13} />
      </span>
      <span className="block text-[13px] text-gray-500 leading-8 mb-4">{t.short}</span>
      <span className="block text-[14px] font-black" style={{ color: NAVY }}>
        {t.name}
      </span>
      <span className="block text-[12px] text-gray-400 mt-1">{t.role}</span>
    </button>
  );
}

export default function TestimonialsSection() {
  const [tab, setTab] = useState(testimonialTabs[0].id);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const list = testimonials.filter((t) => t.kind === tab);
  const N = list.length;

  const go = useCallback(
    (next: number, fromUser: boolean) => {
      setIndex(((next % N) + N) % N);
      if (fromUser) {
        setPaused(true);
        if (resumeRef.current) clearTimeout(resumeRef.current);
        resumeRef.current = setTimeout(() => setPaused(false), RESUME_MS);
      }
    },
    [N]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % N), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, N]);

  useEffect(
    () => () => {
      if (resumeRef.current) clearTimeout(resumeRef.current);
    },
    []
  );

  const active = list[index];
  const prev = list[(index - 1 + N) % N];
  const next = list[(index + 1) % N];
  const hasLogo = active.logoSlot ? Boolean(slotImages[active.logoSlot]) : false;

  return (
    <section
      className="py-20 md:py-28 bg-[#FDF4EE]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollAnimator className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: NAVY }}>
            {testimonialsHeading.title}
          </h2>
          <p className="text-sm text-gray-500 leading-7">{testimonialsHeading.desc}</p>
        </ScrollAnimator>

        {/* Audience tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-1 bg-white rounded-2xl p-2 shadow-[0_10px_30px_rgba(22,48,91,0.06)]">
            {testimonialTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  setIndex(0);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all border-b-2 ${
                  tab === t.id
                    ? 'text-orange-500 border-orange-500'
                    : 'text-gray-500 border-transparent hover:text-orange-500'
                }`}
              >
                <Icon name={t.icon} size={17} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Carousel: peek · featured · peek */}
        <div className="relative grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,3.6fr)_minmax(0,0.9fr)] gap-4 items-center">
          {/* In RTL the first column renders on the right */}
          <SidePeek t={next} onClick={() => go(index + 1, true)} />

          <div key={active.name} className="relative animate-fade-in">
            <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(22,48,91,0.07)] p-6 md:p-10">
              <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-6 md:gap-10 items-center">
                {/* Portrait (left in RTL) */}
                <div className="order-2 md:order-1 mx-auto md:mx-0 w-[190px] h-[190px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden bg-[#FBEEE4]">
                  <ImageSlot
                    id={active.avatarSlot}
                    label={active.name}
                    ratio="aspect-square"
                    rounded="rounded-full"
                    icon="mdi:account-tie-outline"
                    className="!h-full"
                  />
                </div>

                {/* Quote (right in RTL) */}
                <div className="order-1 md:order-2">
                  <div className="flex items-start justify-between mb-5">
                    <Icon
                      name="mdi:format-quote-close"
                      size={44}
                      className="text-orange-200 order-2 md:order-1"
                    />
                    <span className="order-1 md:order-2">
                      <Stars />
                    </span>
                  </div>

                  <blockquote
                    className="text-lg md:text-[22px] font-bold leading-[2.1] mb-7"
                    style={{ color: NAVY }}
                  >
                    {active.quote}
                  </blockquote>

                  <div className="border-t border-gray-100 pt-6 flex items-center justify-between gap-4">
                    <figcaption className="order-2">
                      <p className="text-lg md:text-xl font-black" style={{ color: NAVY }}>
                        {active.name}
                      </p>
                      <p className="text-[13px] text-gray-500 mt-1.5">{active.role}</p>
                      {active.org && (
                        <p className="text-[13px] text-gray-500 mt-0.5">{active.org}</p>
                      )}
                    </figcaption>

                    {hasLogo && (
                      <div className="order-1 w-[150px] md:w-[180px] shrink-0 bg-white rounded-2xl shadow-[0_8px_24px_rgba(22,48,91,0.08)] p-4">
                        <ImageSlot
                          id={active.logoSlot!}
                          label={active.org || active.name}
                          ratio="aspect-[16/7]"
                          rounded="rounded-lg"
                          fit="contain"
                          icon="lucide:building-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrows straddle the card edges */}
            <button
              type="button"
              onClick={() => go(index + 1, true)}
              aria-label="نظر بعدی"
              className="absolute top-1/2 -translate-y-1/2 -right-5 lg:-right-7 w-12 h-12 rounded-full bg-white shadow-[0_8px_24px_rgba(22,48,91,0.12)] flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
            >
              <Icon name="lucide:chevron-right" size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(index - 1, true)}
              aria-label="نظر قبلی"
              className="absolute top-1/2 -translate-y-1/2 -left-5 lg:-left-7 w-12 h-12 rounded-full bg-white shadow-[0_8px_24px_rgba(22,48,91,0.12)] flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
            >
              <Icon name="lucide:chevron-left" size={22} />
            </button>
          </div>

          <SidePeek t={prev} onClick={() => go(index - 1, true)} />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-7">
          {list.map((t, i) => (
            <button
              key={t.name}
              onClick={() => go(i, true)}
              aria-label={`نظر ${i + 1}`}
              className={`rounded-full transition-all ${
                i === index ? 'w-3 h-3 bg-orange-500' : 'w-2.5 h-2.5 bg-orange-200 hover:bg-orange-300'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-10 bg-white rounded-[28px] shadow-[0_16px_50px_rgba(22,48,91,0.06)] px-6 py-8">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {testimonialStats.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-center gap-4 px-4 py-5 md:py-0"
              >
                <span className="w-16 h-16 rounded-full bg-[#FDF0E4] flex items-center justify-center shrink-0">
                  <Icon name={s.icon} size={30} className="text-orange-500" />
                </span>
                <span className="text-right" style={{ color: NAVY }}>
                  {/* AnimatedCounter only forwards className — colour is inherited */}
                  <AnimatedCounter
                    value={s.value}
                    className="block text-2xl md:text-[28px] font-black"
                  />
                  <span className="block text-sm font-bold mt-0.5">{s.label}</span>
                  <span className="block text-[11.5px] text-gray-400 mt-1">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <p className="flex items-center justify-center gap-2 text-center text-[13.5px] text-gray-600 mt-8">
          <Icon name="mdi:format-quote-close" size={20} className="text-orange-400" />
          <span>{testimonialsClosing}</span>
          <Icon name="mdi:format-quote-open" size={20} className="text-orange-400" />
        </p>
      </div>
    </section>
  );
}
