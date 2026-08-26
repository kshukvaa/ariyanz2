'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import ScrollAnimator, { StaggerContainer } from '@/components/ScrollAnimator';
import { slotImages } from '@/data/slotImages';
import {
  offersHeading,
  offersIntro,
  mainOffer,
  miniOffers,
  offersBand,
} from '@/data/landing';

const NAVY = '#16305B';
const ORANGE = '#F26A21';

/* ── Gift illustration ──
   Inline SVG stand-in for the 3D artwork: a ribboned box with the
   discount, ticket and gem badges floating around it. Swap in the
   real render by dropping a file for the `ar-offer-illo` slot. */
function GiftArt() {
  return (
    <svg viewBox="0 0 340 300" className="w-full h-full" role="presentation">
      <ellipse cx="185" cy="240" rx="120" ry="26" fill="#F7E2CE" opacity="0.55" />
      <circle cx="196" cy="150" r="86" fill="#FBEAD8" opacity="0.7" />

      {/* box body */}
      <rect x="118" y="150" width="150" height="104" rx="12" fill="#FDFBF7" />
      <rect x="118" y="150" width="150" height="104" rx="12" fill="#000" opacity="0.03" />
      <rect x="176" y="150" width="34" height="104" fill={ORANGE} />

      {/* lid */}
      <rect x="106" y="122" width="174" height="38" rx="10" fill="#FFFFFF" />
      <rect x="176" y="122" width="34" height="38" fill={ORANGE} />

      {/* bow */}
      <path
        d="M193 122c-16-4-38-16-42-30-3-11 6-20 17-16 12 4 22 26 25 46z"
        fill={ORANGE}
      />
      <path
        d="M193 122c16-4 38-16 42-30 3-11-6-20-17-16-12 4-22 26-25 46z"
        fill="#E85D16"
      />
      <circle cx="193" cy="120" r="11" fill={ORANGE} />

      {/* floating badges */}
      <g>
        <path
          d="M52 96l7-8 10 3 7-8 6 9 11 1-2 11 8 8-9 7 1 11-11-2-6 9-8-7-10 4-2-11-10-4z"
          fill={ORANGE}
        />
        <text x="70" y="107" textAnchor="middle" fontSize="19" fontWeight="700" fill="#fff">
          %
        </text>
      </g>

      <g transform="translate(232 34)">
        <path
          d="M6 0h62a6 6 0 016 6v14a9 9 0 000 18v14a6 6 0 01-6 6H6a6 6 0 01-6-6V38a9 9 0 000-18V6a6 6 0 016-6z"
          fill={NAVY}
        />
        <path
          d="M37 12l5 10 11 1-8 8 2 11-10-5-10 5 2-11-8-8 11-1z"
          fill="#fff"
        />
      </g>

      <g transform="translate(258 132)">
        <rect width="62" height="62" rx="14" fill="#FBEBD7" />
        <path d="M31 14l16 12-16 22-16-22z" fill="none" stroke="#E85D16" strokeWidth="3" />
      </g>

      <circle cx="46" cy="176" r="7" fill="#F7DCC2" />
      <circle cx="300" cy="228" r="6" fill="#F7DCC2" />
      <circle cx="120" cy="70" r="5" fill="#F7DCC2" />
    </svg>
  );
}

/* Corner ribbon: flat orange banner with a stitched inset border and
   a notched tail — drawn rather than bitmapped so it stays crisp. */
function RibbonBg() {
  return (
    <svg viewBox="0 0 76 104" className="absolute inset-0 w-full h-full" role="presentation">
      <path d="M5 0h66a5 5 0 015 5v99L38 86 0 104V5a5 5 0 015-5z" fill={ORANGE} />
      <path
        d="M9 7h58a2 2 0 012 2v87L38 80 7 96V9a2 2 0 012-2z"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeDasharray="4 4.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Paper plane with its dotted trail, for the closing band. */
function PlaneArt() {
  return (
    <svg viewBox="0 0 120 70" className="w-[104px] h-[62px] shrink-0" role="presentation">
      <path
        d="M6 62c2-16 12-28 26-32 12-3 22 2 28-6"
        fill="none"
        stroke={ORANGE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <path d="M112 6L74 30l-18-6z" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M112 6L84 52l-10-22z" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M74 30l10 22 6-16z" fill={ORANGE} opacity="0.25" />
    </svg>
  );
}

export default function SpecialOffersSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FDF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <ScrollAnimator className="text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="hidden sm:block h-px w-10 bg-orange-300" />
            <span className="hidden sm:block h-px w-4 bg-orange-300" />
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: NAVY }}>
              پیشنهاد ویژه
            </h2>
            <Icon name="lucide:sparkles" size={22} className="text-orange-500" />
            <span className="hidden sm:block h-px w-4 bg-orange-300" />
            <span className="hidden sm:block h-px w-10 bg-orange-300" />
          </div>
          <p className="text-[15px] font-bold text-orange-500 mb-3" dir="ltr">
            {offersHeading.latin}
          </p>
          <p className="text-sm text-gray-500 leading-7">{offersHeading.desc}</p>
        </ScrollAnimator>

        {/* Intro copy + featured card */}
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-10 items-center mb-8">
          {/* Intro (renders right in RTL) */}
          <ScrollAnimator animation="fade-left" className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-black mb-4" style={{ color: NAVY }}>
              {offersIntro.title}
            </h3>
            {offersIntro.lines.map((l) => (
              <p key={l} className="text-[13.5px] text-gray-500 leading-8">
                {l}
              </p>
            ))}
            {/* Real artwork once a file is registered for the slot,
                otherwise the inline stand-in. */}
            <div className="mt-4 h-[230px] md:h-[270px]">
              {slotImages[offersIntro.slot] ? (
                <ImageSlot
                  id={offersIntro.slot}
                  label={offersIntro.slotLabel}
                  ratio=""
                  rounded="rounded-3xl"
                  fit="contain"
                  className="!h-full"
                />
              ) : (
                <GiftArt />
              )}
            </div>
          </ScrollAnimator>

          {/* Featured offer card */}
          <ScrollAnimator animation="fade-right" className="order-1 lg:order-2">
            <div className="relative bg-white rounded-3xl shadow-[0_18px_50px_rgba(22,48,91,0.08)] p-6 md:p-8 pt-10">
              {/* Corner ribbon */}
              <div className="absolute -top-3 left-6 md:left-8 w-[76px] h-[104px] text-center text-white drop-shadow-[0_6px_12px_rgba(242,106,33,0.35)]">
                <RibbonBg />
                <div className="relative pt-5 leading-none">
                  <span className="block text-[20px] font-black">{mainOffer.ribbonValue}</span>
                  <span className="block text-[10px] font-bold mt-1.5 opacity-95">
                    {mainOffer.ribbonLabel}
                  </span>
                </div>
              </div>

              <div className="text-right mb-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-500">
                  <Icon name="lucide:star" size={13} className="text-orange-400" />
                  {mainOffer.badge}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-black mb-2" style={{ color: NAVY }}>
                {mainOffer.title}
              </h3>
              <p className="text-[13px] text-gray-500 leading-7 mb-7">{mainOffer.subtitle}</p>

              {/* Includes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 mb-7">
                {mainOffer.includes.map((it, i) => (
                  <div
                    key={it.title}
                    className={`text-center px-2 ${
                      i > 0 ? 'sm:border-l sm:border-gray-100' : ''
                    }`}
                  >
                    <Icon
                      name={it.icon}
                      size={26}
                      className="mx-auto mb-2.5"
                      style={{ backgroundColor: NAVY }}
                    />
                    <p className="text-[12px] font-bold leading-5" style={{ color: NAVY }}>
                      {it.title}
                    </p>
                    <p className="text-[10.5px] text-gray-400 mt-0.5">{it.sub}</p>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center justify-center gap-5 mb-6">
                <span className="text-[13px] text-gray-300 line-through">{mainOffer.oldPrice}</span>
                <span className="h-6 w-px bg-gray-200" />
                <span className="text-xl md:text-2xl font-black text-orange-500">
                  {mainOffer.price}
                </span>
              </div>

              <Link
                href={mainOffer.cta.href}
                className="flex items-center justify-center gap-2 w-full text-white rounded-xl py-3.5 text-sm font-bold transition-all hover:brightness-95 btn-press"
                style={{ background: ORANGE }}
                data-ripple
              >
                <span>{mainOffer.cta.label}</span>
                <Icon name="lucide:arrow-left" size={16} className="text-white" />
              </Link>
            </div>
          </ScrollAnimator>
        </div>

        {/* Mini offers */}
        <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-6">
          {miniOffers.map((o) => {
            const green = o.tone === 'green';
            return (
              <Link
                key={o.title}
                href={o.href}
                className="h-full bg-[#FDF1E6] border border-[#F6E0CB] rounded-2xl p-6 flex flex-col items-center text-center hover-lift hover:border-orange-200 transition-all"
              >
                <span
                  className={`inline-flex items-center gap-1.5 text-[10.5px] font-bold px-3 py-1.5 rounded-full mb-5 ${
                    green ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-100/70 text-orange-600'
                  }`}
                >
                  <Icon
                    name={o.badgeIcon}
                    size={12}
                    className={green ? 'text-emerald-500' : 'text-orange-500'}
                  />
                  {o.badge}
                </span>

                <span
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: NAVY }}
                >
                  <Icon name={o.icon} size={30} className="text-white" />
                </span>

                <h4 className="text-[15px] font-black mb-2" style={{ color: NAVY }}>
                  {o.title}
                </h4>
                <p className="text-[12px] text-gray-500 leading-6 mb-5 flex-1">{o.desc}</p>

                <span
                  className={`inline-flex items-center gap-1 text-[12.5px] font-bold ${
                    green ? 'text-emerald-600' : 'text-orange-500'
                  }`}
                >
                  <Icon name="lucide:chevron-left" size={14} />
                  <span>{o.discount}</span>
                </span>
              </Link>
            );
          })}
        </StaggerContainer>

        {/* Closing band */}
        <div className="bg-[#FDF1E6] border border-[#F6E0CB] rounded-2xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center gap-5">
          <PlaneArt />

          <div className="flex items-center gap-3 flex-1 text-center md:text-right">
            <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
              <Icon name="lucide:tag" size={20} className="text-orange-500" />
            </span>
            <span>
              <span className="block text-[15px] font-black" style={{ color: NAVY }}>
                {offersBand.title}
              </span>
              <span className="block text-[12.5px] text-gray-500 mt-0.5">{offersBand.text}</span>
            </span>
          </div>

          <Link
            href={offersBand.cta.href}
            className="inline-flex items-center justify-center gap-2 border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-xl text-[13px] font-bold transition-all shrink-0"
          >
            <span>{offersBand.cta.label}</span>
            <Icon name="lucide:arrow-left" size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
