'use client';

import React, { useState } from 'react';
import ScrollPinnedRail from '@/components/ScrollPinnedRail';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import SectionHeading, { NAVY } from '@/components/SectionHeading';
import {
  productTabs,
  productsHeading,
  productsDefaultTab,
  productsBand,
  productCtaLabel,
  type Product,
} from '@/data/landing';

function ProductCard({ p, slotId }: { p: Product; slotId: string }) {
  return (
    <div className="h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover-lift hover:border-gray-200 shadow-sm flex flex-col">
      <div className="relative">
        <ImageSlot id={slotId} label={p.title} ratio="aspect-[16/10]" icon="lucide:layers" rounded="rounded-none" />
        {p.badge && (
          <span
            className={`absolute top-3 right-3 text-[10.5px] font-bold px-2.5 py-1 rounded-lg ${
              p.badgeClass ?? 'bg-orange-100 text-orange-600'
            }`}
          >
            {p.badge}
          </span>
        )}
        {/* Medallion straddles the artwork's lower edge */}
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
          <Icon name={p.icon ?? 'lucide:layers'} size={24} className="text-orange-500" />
        </span>
      </div>
      <div className="p-4 pt-9 flex flex-col flex-1 text-center">
        <h3 className="text-[15px] font-black leading-7 mb-3" style={{ color: NAVY }}>
          {p.title}
        </h3>
        <span
          className={`inline-flex items-center text-[11px] font-bold px-3 py-1.5 rounded-lg w-fit mx-auto mb-4 ${
            p.categoryClass ?? 'bg-orange-50 text-orange-600'
          }`}
        >
          {p.category}
        </span>
        <p className="text-[12px] text-gray-500 leading-7 mb-5 flex-1">{p.desc}</p>

        <div className="flex items-center justify-between text-[11.5px] text-gray-500 pb-3.5 mb-3.5 border-b border-gray-100">
          <span className="flex items-center gap-1">
            <Icon name="mdi:star" size={14} className="text-amber-400" />
            <span className="font-bold text-gray-700">{p.rating}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span>{p.students}</span>
            <Icon name="lucide:users" size={14} className="text-gray-400" />
          </span>
        </div>

        <Link
          href={p.href}
          className="flex items-center justify-center gap-1.5 text-orange-500 text-[12.5px] font-bold transition-all hover:gap-2.5"
        >
          <span>{productCtaLabel}</span>
          <Icon name="lucide:arrow-left" size={14} className="text-orange-500" />
        </Link>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const [tab, setTab] = useState(productsDefaultTab);
  const active = productTabs.find((t) => t.id === tab)!;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker={productsHeading.kicker}
          title={productsHeading.title}
          desc={productsHeading.desc}
        />

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {productTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 md:px-7 py-3 rounded-xl text-[13px] font-bold transition-all ${
                tab === t.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
              }`}
            >
              <Icon name={t.icon} size={16} className={tab === t.id ? 'text-white' : ''} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Desktop grid */}
        <div key={tab} className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in">
          {active.items.map((p) => (
            <ProductCard key={p.title} p={p} slotId={p.slot} />
          ))}
        </div>

        {/* Mobile swipe rail — pinned, so scrolling walks the whole carousel
            past before the page carries on down. */}
        <ScrollPinnedRail key={`${tab}-pin`}>
          <div key={`${tab}-m`} className="flex md:hidden ar-rail -mx-4 px-4 animate-fade-in">
            {active.items.map((p) => (
              <div key={p.title} className="ar-rail-item w-[76%] shrink-0">
                <ProductCard p={p} slotId={p.mobileSlot ?? p.slot} />
              </div>
            ))}
          </div>
        </ScrollPinnedRail>

        {/* Band */}
        <div className="mt-10 bg-[#F7F8FA] border border-gray-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-[13px] text-gray-700 leading-7 text-center sm:text-right">
            <Icon
              name={productsBand.icon}
              size={26}
              className="shrink-0"
              style={{ backgroundColor: NAVY }}
            />
            <span>{productsBand.text}</span>
          </p>
          <Link
            href={productsBand.cta.href}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-[13px] font-bold shrink-0 transition-all btn-press"
            data-ripple
          >
            <span>{productsBand.cta.label}</span>
            <Icon name="lucide:arrow-left" size={15} className="text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
