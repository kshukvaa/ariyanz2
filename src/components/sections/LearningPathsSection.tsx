'use client';

import React from 'react';
import ScrollPinnedRail from '@/components/ScrollPinnedRail';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { StaggerContainer } from '@/components/ScrollAnimator';
import SectionHeading, { NAVY } from '@/components/SectionHeading';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  pathsHeading,
  pathFeatures,
  pathsSubheading,
  pathsAllCta,
  pathCardCta,
  learningPaths,
  pathsBand,
  pathStepsLabel,
} from '@/data/landing';

/** Tints for the band's stat medallions. */
const BAND_TONES = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  orange: 'bg-orange-50 text-orange-500',
};

const R = 34;
const C = 2 * Math.PI * R;

function PathCard({ p }: { p: (typeof learningPaths)[number] }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <div ref={ref} className="h-full">
      <Link
        href="/learning-paths"
        className="group h-full bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center hover-lift hover:border-gray-200 shadow-sm"
      >
        <span
          className="text-[11px] font-bold px-3 py-1.5 rounded-lg mb-5 bg-[#EEF2FA]"
          style={{ color: NAVY }}
        >
          {p.category}
        </span>

        <Icon name={p.icon} size={44} className="mb-4" style={{ backgroundColor: NAVY }} />

        <h3 className="text-[15px] font-black leading-7 mb-1" style={{ color: NAVY }}>
          {p.title}
        </h3>
        <p className="text-[12px] text-gray-400 mb-5">
          {p.steps} {pathStepsLabel}
        </p>

        <div className="relative w-[84px] h-[84px] mb-6">
          <svg width="84" height="84" viewBox="0 0 84 84" className="-rotate-90">
            <circle cx="42" cy="42" r={R} fill="none" stroke="#F1F5F9" strokeWidth="7" />
            <circle
              cx="42"
              cy="42"
              r={R}
              fill="none"
              stroke={p.color}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={isVisible ? C - (C * p.progress) / 100 : C}
              style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-[15px] font-black"
            style={{ color: NAVY }}
          >
            {p.progress}%
          </span>
        </div>

        <span
          className={`mt-auto w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-bold transition-all ${
            p.featured
              ? 'bg-orange-500 text-white'
              : 'border border-orange-300 text-orange-500 group-hover:bg-orange-50'
          }`}
        >
          <span>{p.started ? pathCardCta.started : pathCardCta.fresh}</span>
          <Icon
            name="lucide:arrow-left"
            size={14}
            className={p.featured ? 'text-white' : 'text-orange-500'}
          />
        </span>
      </Link>
    </div>
  );
}

export default function LearningPathsSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker={pathsHeading.kicker}
          title={pathsHeading.title}
          desc={pathsHeading.desc}
        />

        {/* Features — separated by hairlines, not cards */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 mb-14">
          {pathFeatures.map((f, i) => (
            <div
              key={f.title}
              className={`h-full px-6 text-center ${
                i < pathFeatures.length - 1 ? 'lg:border-l border-gray-200' : ''
              }`}
            >
              <span className="w-[68px] h-[68px] mx-auto rounded-full bg-[#F2F3F8] flex items-center justify-center mb-4">
                <Icon name={f.icon} size={30} style={{ backgroundColor: NAVY }} />
              </span>
              <h3 className="text-[15px] font-black mb-2" style={{ color: NAVY }}>
                {f.title}
              </h3>
              <p className="text-[12px] text-gray-500 leading-7 whitespace-pre-line">{f.desc}</p>
            </div>
          ))}
        </StaggerContainer>

        {/* Sub-heading row — "all paths" sits on the far left */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href={pathsAllCta.href}
            className="inline-flex items-center gap-2 border border-orange-300 text-orange-500 hover:bg-orange-50 rounded-xl px-4 py-2.5 text-[12.5px] font-bold transition-all shrink-0"
          >
            <span>{pathsAllCta.label}</span>
            <Icon name="lucide:arrow-left" size={14} className="text-orange-500" />
          </Link>
          <h3
            className="flex items-center gap-3 text-lg md:text-xl font-black"
            style={{ color: NAVY }}
          >
            <span className="hidden sm:block h-[3px] w-7 rounded-full bg-orange-400" />
            {pathsSubheading}
            <span className="hidden sm:block h-[3px] w-7 rounded-full bg-orange-400" />
          </h3>
          <span className="hidden md:block w-[150px] shrink-0" />
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {learningPaths.map((p) => (
            <PathCard key={p.title} p={p} />
          ))}
        </div>

        {/* Mobile rail — pinned, so scrolling walks the whole carousel past
            before the page carries on down. */}
        <ScrollPinnedRail>
          <div className="flex md:hidden ar-rail -mx-4 px-4">
            {learningPaths.map((p) => (
              <div key={p.title} className="ar-rail-item w-[62%] shrink-0">
                <PathCard p={p} />
              </div>
            ))}
          </div>
        </ScrollPinnedRail>

        {/* Band */}
        <div className="mt-12 bg-[#F5F6FA] rounded-3xl px-6 py-7">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0">
                <Icon name={pathsBand.icon} size={24} style={{ backgroundColor: NAVY }} />
              </span>
              <span className="text-right">
                <h3 className="text-[17px] font-black mb-1.5" style={{ color: NAVY }}>
                  {pathsBand.title}
                </h3>
                <p className="text-[12.5px] text-gray-500 leading-7 max-w-md">{pathsBand.desc}</p>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-6 md:gap-10">
              {pathsBand.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${BAND_TONES[s.tone]}`}
                  >
                    <Icon name={s.icon} size={21} />
                  </span>
                  <span className="text-right">
                    <p className="text-lg md:text-xl font-black" style={{ color: NAVY }}>
                      {s.value}
                    </p>
                    <p className="text-[11.5px] text-gray-500 mt-0.5">{s.label}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
