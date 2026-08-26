'use client';

/* ──────────────────────────────────────────────────────────────
   MobileProductsSection — index 03, WARM CREAM (#FDF7F0)
   "Immersive App" mobile variant of ProductsSection.
   v11: light theme — GlassCard is white, content uses dark text.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import {
  productTabs,
  productsHeading,
  productsDefaultTab,
  productsBand,
  productCtaLabel,
  type Product,
} from '@/data/landing';
import {
  MobileSectionShell,
  MobileHeading,
  SnapItem,
  GlassCard,
  PillTabs,
  GradientCTA,
  SnapProgress,
  useSnapActive,
  useAutoplay,
  useDragScroll,
  useDelayedReady,
  SkeletonCard,
} from './_kit';

function MobileProductCard({ p }: { p: Product }) {
  return (
    <GlassCard className="p-0 overflow-hidden">
      {/* Artwork */}
      <div className="relative">
        <ImageSlot
          id={p.mobileSlot ?? p.slot}
          label={p.title}
          ratio="aspect-[16/10]"
          icon="lucide:layers"
          rounded="rounded-none"
          className="rounded-t-3xl"
        />
        {p.badge && (
          <span
            className={`absolute top-3 right-3 text-[10.5px] font-bold px-2.5 py-1 rounded-lg ${
              p.badgeClass ?? 'bg-orange-100 text-orange-600'
            }`}
          >
            {p.badge}
          </span>
        )}
        {/* Medallion straddling the artwork's lower edge */}
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-11 h-11 rounded-full bg-white flex items-center justify-center ring-2 ring-orange-100">
          <Icon name={p.icon ?? 'lucide:layers'} size={22} className="text-orange-500" />
        </span>
      </div>

      {/* Body */}
      <div className="p-5 pt-8">
        <h3 className="text-[14.5px] font-black text-[#1C1816] leading-7 mb-1.5 text-center">
          {p.title}
        </h3>
        <span
          className={`inline-flex items-center text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit mx-auto mb-3 ${
            p.categoryClass ?? 'bg-orange-100 text-orange-600'
          }`}
        >
          {p.category}
        </span>
        <p className="text-[12px] leading-7 text-gray-500 mb-4 text-center">
          {p.desc}
        </p>

        {/* Rating + students */}
        <div className="flex items-center justify-between text-[11.5px] pt-3 mt-3 border-t border-gray-100 mb-3.5">
          <span className="flex items-center gap-1">
            <Icon name="mdi:star" size={14} className="text-amber-400 shrink-0" />
            <span className="font-bold text-[#1C1816] leading-5">{p.rating}</span>
          </span>
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="leading-5">{p.students}</span>
            <Icon name="lucide:users" size={14} className="text-gray-400 shrink-0" />
          </span>
        </div>

        <Link
          href={p.href}
          className="flex items-center justify-center gap-1.5 text-orange-500 text-[12.5px] font-bold active:scale-[0.97] transition-transform"
        >
          <span>{productCtaLabel}</span>
          <Icon name="lucide:arrow-left" size={14} className="text-orange-500" />
        </Link>
      </div>
    </GlassCard>
  );
}

export default function MobileProductsSection() {
  const ready = useDelayedReady(500);
  const [tab, setTab] = useState<string>(productsDefaultTab);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-products') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);
  const active = productTabs.find((t) => t.id === tab) ?? productTabs[0];
  const { ref, active: railActive, scrollTo } = useSnapActive(active.items.length);
  const autoplay = useAutoplay(ref, 3000);
  useDragScroll(ref);

  return (
    <MobileSectionShell dark id="mobile-products">
      <MobileHeading
        index={3}
        pulse={pulse}
        kicker={productsHeading.kicker}
        title={productsHeading.title}
        desc={productsHeading.desc}
        accentIcon="lucide:layers"
      />

      <PillTabs tabs={productTabs} active={tab} onChange={setTab} />

      <div
        key={tab}
        ref={ref}
        onMouseEnter={autoplay.onPause}
        onMouseLeave={autoplay.onResume}
        onTouchStart={autoplay.onPause}
        onTouchEnd={autoplay.onResume}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory ar-no-scrollbar -mx-4 px-4 pb-2 animate-fade-in"
      >
        {!ready
          ? Array.from({ length: 2 }).map((_, i) => (
              <SnapItem key={`sk-${i}`} width="w-[78%]">
                <SkeletonCard />
              </SnapItem>
            ))
          : active.items.map((p, i) => (
              <SnapItem key={p.title} width="w-[78%]">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
                >
                  <MobileProductCard p={p} />
                </motion.div>
              </SnapItem>
            ))}
      </div>
      <SnapProgress
        count={active.items.length}
        active={railActive}
        onDot={scrollTo}
      />

      {/* Band */}
      <GlassCard className="mt-6 flex flex-col items-start gap-4">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <Icon name={productsBand.icon} size={22} className="text-orange-500" />
          </span>
          <p className="flex-1 text-[12.5px] leading-7 text-gray-600">
            {productsBand.text}
          </p>
        </div>
        <GradientCTA
          href={productsBand.cta.href}
          label={productsBand.cta.label}
          icon="lucide:arrow-left"
        />
      </GlassCard>
    </MobileSectionShell>
  );
}
