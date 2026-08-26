'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
import ScrollAnimator from '@/components/ScrollAnimator';
import SectionHeading, { NAVY } from '@/components/SectionHeading';
import {
  leaderboardHeading,
  leaderboardStats,
  leaderboardTabs,
  podium,
  leaderboardTable,
  competitiveMetrics,
  growthLevels,
  leaderboardBand,
} from '@/data/landing';

const TONES: Record<string, string> = {
  gold: 'bg-amber-50 text-amber-600',
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  orange: 'bg-orange-50 text-orange-600',
  purple: 'bg-purple-50 text-purple-600',
};

const MEDALS: Record<number, string> = { 1: '#F0B429', 2: '#B9C2CC', 3: '#C88A4B' };

export default function LeaderboardSection() {
  const [tab, setTab] = useState(leaderboardTabs[0].id);

  return (
    <section className="py-20 md:py-28 bg-[#FAFAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker={leaderboardHeading.kicker}
          title={leaderboardHeading.title}
          desc={leaderboardHeading.desc}
        />

        {/* Headline stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {leaderboardStats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl shadow-[0_8px_26px_rgba(22,48,91,0.05)] p-5 flex items-center gap-4"
            >
              <span className="w-14 h-14 shrink-0">
                <ImageSlot
                  id={s.slot}
                  label={s.label}
                  ratio="aspect-square"
                  rounded="rounded-full"
                  icon="lucide:award"
                  className="!bg-transparent !border-0"
                />
              </span>
              <span className="text-center flex-1">
                <span className="block text-[26px] font-black" style={{ color: NAVY }}>
                  {s.value}
                </span>
                <span className="block text-[13px] font-bold" style={{ color: NAVY }}>
                  {s.label}
                </span>
                <span className="block text-[11px] text-gray-400 mt-0.5">{s.sub}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-[0_12px_40px_rgba(22,48,91,0.06)] p-4 md:p-6">
          <div className="grid lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] gap-6">
            {/* Sidebar sits left, so it takes the narrow second track.
                min-w-0 lets the track shrink below the ranking table's
                min-width instead of overflowing. */}
            <div className="space-y-6 min-w-0 lg:order-2">
              <div>
                <h3 className="text-[14px] font-black mb-3 text-right" style={{ color: NAVY }}>
                  {competitiveMetrics.title}
                </h3>
                <div className="bg-[#FAFAFB] rounded-2xl p-2 space-y-1">
                  {competitiveMetrics.items.map((m) => (
                    <button
                      key={m.title}
                      className="w-full flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 text-right hover:shadow-sm transition-all"
                    >
                      <span className="w-9 h-9 shrink-0">
                        <ImageSlot
                          id={m.slot}
                          label={m.title}
                          ratio="aspect-square"
                          rounded="rounded-full"
                          icon="lucide:trophy"
                          className="!bg-transparent !border-0"
                        />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[12.5px] font-bold" style={{ color: NAVY }}>
                          {m.title}
                        </span>
                        <span className="block text-[10.5px] text-gray-400 truncate">{m.sub}</span>
                      </span>
                      <Icon name="lucide:chevron-left" size={15} className="text-orange-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-black mb-3 text-right" style={{ color: NAVY }}>
                  {growthLevels.title}
                </h3>
                <div className="bg-[#FAFAFB] rounded-2xl p-2 space-y-1">
                  {growthLevels.items.map((l) => (
                    <div
                      key={l.label}
                      className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5"
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 ${
                          TONES[l.tone] || TONES.orange
                        }`}
                      >
                        <Icon name={l.icon} size={13} />
                        {l.label}
                      </span>
                      <span className="text-[10.5px] text-gray-400 leading-5">{l.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ranking panel */}
            <div className="min-w-0 lg:order-1">
              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-gray-100 mb-6">
                {leaderboardTabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-2 px-4 md:px-6 py-3 text-[13px] font-bold border-b-2 -mb-px transition-colors ${
                      tab === t.id
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Icon name={t.icon} size={16} />
                    <span className="whitespace-nowrap">{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Podium */}
              <div key={tab} className="grid grid-cols-3 gap-3 md:gap-4 mb-6 animate-fade-in">
                {podium.map((p) => {
                  const first = p.rank === 1;
                  return (
                    <div
                      key={p.name}
                      className={`relative rounded-2xl border p-4 pt-8 text-center ${
                        first
                          ? 'bg-[#FFFBF2] border-amber-200 shadow-[0_10px_30px_rgba(240,180,41,0.15)] md:-mt-3'
                          : 'bg-[#FAFAFB] border-gray-100'
                      }`}
                    >
                      <span
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-black shadow-sm"
                        style={{ background: MEDALS[p.rank] }}
                      >
                        {p.rank}
                      </span>

                      <span
                        className={`block mx-auto rounded-full overflow-hidden mb-3 ${
                          first ? 'w-[86px] h-[86px] ring-4 ring-amber-200' : 'w-[70px] h-[70px]'
                        }`}
                      >
                        <ImageSlot
                          id={p.slot}
                          label={p.name}
                          ratio="aspect-square"
                          rounded="rounded-full"
                          icon="mdi:account-tie-outline"
                          className="!h-full"
                        />
                      </span>

                      <p className="text-[13.5px] font-black mb-2" style={{ color: NAVY }}>
                        {p.name}
                      </p>
                      <span
                        className={`inline-block text-[10.5px] font-bold px-2.5 py-1 rounded-lg mb-3 ${
                          TONES[p.tone] || TONES.blue
                        }`}
                      >
                        {p.level}
                      </span>
                      <p
                        className={`text-lg font-black ${first ? 'text-orange-500' : ''}`}
                        style={first ? undefined : { color: NAVY }}
                      >
                        {p.score}
                      </p>
                      <p className="text-[10.5px] text-gray-400">امتیاز</p>
                    </div>
                  );
                })}
              </div>

              {/* Table */}
              <div className="overflow-x-auto ar-no-scrollbar">
                <table className="w-full min-w-[520px] text-right border-collapse">
                  <thead>
                    <tr className="text-[11.5px] text-gray-400">
                      {leaderboardTable.columns.map((c) => (
                        <th key={c} className="font-medium pb-3 px-2 whitespace-nowrap">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardTable.rows.map((r) => (
                      <tr key={r.name} className="border-t border-gray-50">
                        <td className="py-3 px-2 text-[12.5px] font-bold" style={{ color: NAVY }}>
                          {r.rank}
                        </td>
                        <td className="py-3 px-2">
                          <span className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                              <ImageSlot
                                id={r.slot}
                                label={r.name}
                                ratio="aspect-square"
                                rounded="rounded-full"
                                icon="mdi:account-tie-outline"
                                className="!h-full"
                              />
                            </span>
                            <span className="text-[12.5px] font-bold whitespace-nowrap" style={{ color: NAVY }}>
                              {r.name}
                            </span>
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${
                              TONES[r.tone] || TONES.blue
                            }`}
                          >
                            {r.level}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-[12.5px] font-bold" style={{ color: NAVY }}>
                          {r.score}
                        </td>
                        <td className="py-3 px-2">
                          <span className="flex items-center gap-2.5">
                            <span className="text-[12px] text-gray-500 whitespace-nowrap">
                              {r.paths}
                            </span>
                            <span className="flex-1 min-w-[60px] h-1.5 rounded-full bg-gray-100 overflow-hidden">
                              <span
                                className="block h-full rounded-full bg-orange-500"
                                style={{ width: `${r.progress}%` }}
                              />
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Band */}
        <div className="mt-6 bg-[#FAFAFB] border border-gray-100 rounded-2xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center gap-5">
          <div className="w-[130px] shrink-0">
            <ImageSlot
              id={leaderboardBand.slot}
              label={leaderboardBand.title}
              ratio="aspect-[2/1]"
              rounded="rounded-xl"
              icon="lucide:award"
              className="!bg-transparent !border-0"
            />
          </div>
          <div className="flex-1 text-center md:text-right">
            <p className="text-[16px] font-black mb-1" style={{ color: NAVY }}>
              {leaderboardBand.title}
            </p>
            {leaderboardBand.lines.map((l) => (
              <p key={l} className="text-[12.5px] text-gray-500 leading-7">
                {l}
              </p>
            ))}
          </div>
          <Link
            href={leaderboardBand.cta.href}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl text-[13px] font-bold transition-all shrink-0 btn-press"
            data-ripple
          >
            <span>{leaderboardBand.cta.label}</span>
            <Icon name="lucide:arrow-left" size={15} className="text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
