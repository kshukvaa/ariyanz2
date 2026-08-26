'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ScrollAnimator, { StaggerContainer, AnimatedCounter } from '@/components/ScrollAnimator';
import SectionHeading, { NAVY } from '@/components/SectionHeading';
import { logoSrc } from '@/data/slotImages';
import { whyHeading, whyReasons, whyTrust, whyStats, whyBand, brand } from '@/data/landing';

function ReasonCard({ r }: { r: (typeof whyReasons)[number] }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(22,48,91,0.06)] p-5 max-w-[340px]">
      <h3 className="flex items-center gap-2.5 text-[15px] font-black mb-2" style={{ color: NAVY }}>
        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[11px] font-black flex items-center justify-center shrink-0">
          {r.n}
        </span>
        {r.title}
      </h3>
      <p className="text-[12.5px] text-gray-500 leading-7">{r.desc}</p>
    </div>
  );
}

export default function WhyAriyazSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading title={whyHeading.title} desc={whyHeading.desc} />

        {/* Orbit diagram — the ring is decorative, so it only shows on
            wide screens; below that the reasons stack as plain cards. */}
        <div className="relative">
          <div className="hidden xl:block relative h-[720px]">
            {/* Ring */}
            <svg
              viewBox="0 0 600 600"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px]"
              aria-hidden="true"
            >
              <circle
                cx="300"
                cy="300"
                r="230"
                fill="none"
                stroke="#F6C9A8"
                strokeWidth="1.5"
                strokeDasharray="3 8"
              />
            </svg>

            {/* Centre badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-white shadow-[0_20px_60px_rgba(22,48,91,0.08)] flex flex-col items-center justify-center text-center px-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt={brand.name} className="w-[190px] mb-3" />
              <p className="text-[13.5px] font-bold leading-8" style={{ color: NAVY }}>
                رشد انسان‌ها
                <br />
                توانمندسازی سازمان‌ها
              </p>
            </div>

            {/* Orbiting icons */}
            {whyReasons.map((r, i) => {
              const angle = -90 + i * 72;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 24;
              const y = 50 + Math.sin(rad) * 36;
              return (
                <span
                  key={r.title}
                  className="absolute w-14 h-14 rounded-full bg-white shadow-[0_8px_20px_rgba(22,48,91,0.1)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <Icon name={r.icon} size={26} style={{ backgroundColor: NAVY }} />
                </span>
              );
            })}

            {/* Reason cards placed around the ring */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <ReasonCard r={whyReasons[0]} />
            </div>
            <div className="absolute top-[150px] left-0">
              <ReasonCard r={whyReasons[1]} />
            </div>
            <div className="absolute top-[400px] left-0">
              <ReasonCard r={whyReasons[2]} />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <ReasonCard r={whyReasons[3]} />
            </div>
            <div className="absolute top-[330px] right-0">
              <ReasonCard r={whyReasons[4]} />
            </div>

            {/* Trust box */}
            <div className="absolute top-[70px] right-0 w-[300px] bg-[#FDF3EA] rounded-2xl p-5">
              <h3 className="text-[14px] font-black mb-3" style={{ color: NAVY }}>
                {whyTrust.title}
              </h3>
              <ul className="space-y-2.5">
                {whyTrust.items.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[12.5px] text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                      <Icon name="lucide:circle-check" size={13} className="text-white" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Icon name="mdi:format-quote-close" size={30} className="text-orange-200 mt-2" />
            </div>
          </div>

          {/* Stacked fallback */}
          <div className="xl:hidden grid md:grid-cols-2 gap-4">
            <StaggerContainer className="contents">
              {whyReasons.map((r) => (
                <div key={r.title} className="bg-white rounded-2xl shadow-sm p-5">
                  <h3
                    className="flex items-center gap-2.5 text-[15px] font-black mb-2"
                    style={{ color: NAVY }}
                  >
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                      {r.n}
                    </span>
                    {r.title}
                  </h3>
                  <p className="text-[12.5px] text-gray-500 leading-7">{r.desc}</p>
                </div>
              ))}
            </StaggerContainer>

            <div className="bg-[#FDF3EA] rounded-2xl p-5 md:col-span-2">
              <h3 className="text-[14px] font-black mb-3" style={{ color: NAVY }}>
                {whyTrust.title}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {whyTrust.items.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[12.5px] text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                      <Icon name="lucide:circle-check" size={13} className="text-white" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(22,48,91,0.05)] px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {whyStats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 justify-center">
                <span className="w-12 h-12 rounded-full bg-[#FDF0E4] flex items-center justify-center shrink-0">
                  <Icon name={s.icon} size={22} className="text-orange-500" />
                </span>
                <span className="text-right">
                  {/* counts up and lands on Persian digits, matching the
                      identical figures in the testimonial and partner bands */}
                  <AnimatedCounter
                    value={s.value}
                    className="block text-[19px] font-black"
                    style={{ color: NAVY }}
                  />
                  <span className="block text-[11.5px] font-bold" style={{ color: NAVY }}>
                    {s.label}
                  </span>
                  <span className="block text-[10px] text-gray-400">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing band */}
        <ScrollAnimator
          animation="fade-up"
          className="mt-5"
        >
          <div className="bg-[#0F2650] rounded-2xl px-6 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-right">
              <p className="text-lg md:text-xl font-black text-white mb-1">{whyBand.title}</p>
              <p className="text-[13px] text-white/70">{whyBand.text}</p>
            </div>
            <Link
              href={whyBand.cta.href}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all shrink-0 btn-press"
              data-ripple
            >
              <span>{whyBand.cta.label}</span>
              <Icon name="lucide:arrow-left" size={16} className="text-white" />
            </Link>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
