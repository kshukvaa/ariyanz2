'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import SectionHeading, { NAVY } from '@/components/SectionHeading';
import {
  instructorsHeading,
  instructorTabs,
  instructors,
  instructorLabels,
  instructorsBand,
} from '@/data/landing';

const BADGE_TONES: Record<string, string> = {
  orange: 'bg-orange-400 text-white',
  blue: 'bg-blue-500 text-white',
  purple: 'bg-purple-500 text-white',
  green: 'bg-emerald-500 text-white',
};

function InstructorCard({ p }: { p: (typeof instructors)[number] }) {
  return (
    <div className="relative h-full bg-white rounded-2xl shadow-[0_10px_30px_rgba(22,48,91,0.06)] p-6 pt-8 flex flex-col items-center text-center hover-lift transition-all">
      <span
        className={`absolute top-4 left-4 text-[10.5px] font-bold px-2.5 py-1 rounded-lg ${
          BADGE_TONES[p.tone] || BADGE_TONES.orange
        }`}
      >
        {p.badge}
      </span>

      <span className="w-[130px] h-[130px] rounded-full overflow-hidden mb-4">
        <ImageSlot
          id={p.slot}
          label={p.name}
          ratio="aspect-square"
          rounded="rounded-full"
          icon="mdi:account-tie-outline"
          className="!h-full"
        />
      </span>

      <h3 className="text-[16px] font-black mb-2" style={{ color: NAVY }}>
        {p.name}
      </h3>
      <p className="text-[12px] text-gray-500 leading-7 mb-4">{p.role}</p>

      <span className="inline-flex items-center gap-2 bg-[#FAFAFB] rounded-full px-4 py-2 mb-4">
        <Icon name="mdi:star" size={15} className="text-amber-400" />
        <span className="text-[13px] font-black" style={{ color: NAVY }}>
          {p.rating}
        </span>
        <span className="text-[10.5px] text-gray-400">{p.reviews}</span>
      </span>

      <div className="grid grid-cols-2 gap-2 w-full border-t border-gray-100 pt-4 mb-4">
        <span className="flex flex-col items-center gap-1 border-l border-gray-100">
          <Icon name="lucide:graduation-cap" size={17} className="text-orange-400" />
          <span className="text-[13px] font-black" style={{ color: NAVY }}>
            {p.courses}
          </span>
          <span className="text-[10px] text-gray-400">{instructorLabels.courses}</span>
        </span>
        <span className="flex flex-col items-center gap-1">
          <Icon name="lucide:users-round" size={17} className="text-blue-400" />
          <span className="text-[13px] font-black" style={{ color: NAVY }}>
            {p.students}
          </span>
          <span className="text-[10px] text-gray-400">{instructorLabels.students}</span>
        </span>
      </div>

      <Link
        href="/agents"
        className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
      >
        <span>{instructorLabels.profile}</span>
        <Icon name="lucide:arrow-left" size={14} />
      </Link>
    </div>
  );
}

export default function InstructorsSection() {
  const [tab, setTab] = useState('all');
  const list = tab === 'all' ? instructors : instructors.filter((i) => i.tab === tab);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker={instructorsHeading.kicker}
          title={instructorsHeading.title}
          desc={instructorsHeading.desc}
        />

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-[0_8px_26px_rgba(22,48,91,0.05)] mb-8 overflow-x-auto ar-no-scrollbar">
          <div className="flex items-center min-w-max justify-center px-2">
            {instructorTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 md:px-7 py-4 text-[13px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon name={t.icon} size={17} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        {list.length === 0 ? (
          <div className="bg-[#FAFAFB] rounded-2xl border border-dashed border-gray-200 py-16 text-center text-[13px] text-gray-500">
            در این دسته فعلاً مدرسی ثبت نشده است.
          </div>
        ) : (
          <>
            <div key={tab} className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in">
              {list.map((p) => (
                <InstructorCard key={p.name} p={p} />
              ))}
            </div>
            <div key={`${tab}-m`} className="flex md:hidden ar-rail -mx-4 px-4 animate-fade-in">
              {list.map((p) => (
                <div key={p.name} className="ar-rail-item w-[78%] shrink-0">
                  <InstructorCard p={p} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Band */}
        <div className="mt-8 bg-[#FDF3EA] rounded-2xl px-5 md:px-8 py-6 flex flex-col lg:flex-row items-center gap-6">
          <div className="w-[150px] shrink-0">
            <ImageSlot
              id={instructorsBand.slot}
              label={instructorsBand.title}
              ratio="aspect-[3/2]"
              rounded="rounded-xl"
              icon="lucide:graduation-cap"
              className="!bg-transparent !border-0"
            />
          </div>

          <div className="flex-1 text-center lg:text-right">
            <p className="text-[16px] font-black mb-1.5" style={{ color: NAVY }}>
              {instructorsBand.title}
            </p>
            <p className="text-[12.5px] text-gray-500 leading-7">{instructorsBand.text}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {instructorsBand.stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="w-11 h-11 mx-auto mb-2 rounded-full bg-white flex items-center justify-center">
                  <Icon name={s.icon} size={20} className="text-orange-500" />
                </span>
                <p className="text-[15px] font-black" style={{ color: NAVY }}>
                  {s.value}
                </p>
                <p className="text-[10.5px] text-gray-500 whitespace-nowrap">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href={instructorsBand.cta.href}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all btn-press"
            data-ripple
          >
            <span>{instructorsBand.cta.label}</span>
            <Icon name="lucide:arrow-left" size={16} className="text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
