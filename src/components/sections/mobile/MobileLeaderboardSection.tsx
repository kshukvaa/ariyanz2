'use client';

/* ──────────────────────────────────────────────────────────────
   MobileLeaderboardSection — index 09, WARM CREAM (#FDF7F0)
   "Immersive App" mobile variant of LeaderboardSection.
   v11: light theme — GlassCard is white, content uses dark text.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import ImageSlot from '@/components/ImageSlot';
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
import {
  MobileSectionShell,
  MobileHeading,
  GlassCard,
  PillTabs,
  GradientCTA,
  toFa,
  StatBadge,
} from './_kit';

const MEDALS: Record<number, string> = { 1: '#F0B429', 2: '#B9C2CC', 3: '#C88A4B' };

/** Tone chips — light palette (colored bg + dark text). */
const TONES: Record<string, string> = {
  gold: 'bg-amber-100 text-amber-700',
  blue: 'bg-amber-100 text-amber-700',
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  orange: 'bg-orange-100 text-orange-700',
  purple: 'bg-purple-100 text-purple-700',
};

export default function MobileLeaderboardSection() {
  const [tab, setTab] = useState<string>(leaderboardTabs[0].id);
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-leaderboard') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);

  return (
    <MobileSectionShell dark id="mobile-leaderboard">
      <MobileHeading
        index={9}
        pulse={pulse}
        kicker={leaderboardHeading.kicker}
        title={leaderboardHeading.title}
        desc={leaderboardHeading.desc}
        accentIcon="lucide:trophy"
      />

      <PillTabs tabs={leaderboardTabs} active={tab} onChange={setTab} />

      {/* Headline stats — 3-col StatBadge */}
      <div key={`stats-${tab}`} className="grid grid-cols-3 gap-2 mb-5 animate-fade-in">
        {leaderboardStats.map((s, i) => {
          const icon =
            i === 0
              ? 'lucide:users-round'
              : i === 1
                ? 'lucide:award'
                : 'lucide:route';
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.15) }}
            >
              <StatBadge
                icon={icon}
                value={s.value}
                label={s.label}
                sub={s.sub}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Podium — top 3 (rank 1 elevated & centered) */}
      <div key={`pod-${tab}`} className="grid grid-cols-3 gap-2 mb-5 animate-fade-in">
        {podium.map((p) => {
          const first = p.rank === 1;
          return (
            <div
              key={p.name}
              className={`relative bg-white border rounded-2xl p-3 pt-7 text-center ${
                first
                  ? 'border-amber-300 -mt-3 ring-2 ring-amber-100'
                  : 'border-gray-100'
              }`}
            >
              {/* Medal badge */}
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-black"
                style={{ background: MEDALS[p.rank] }}
              >
                {toFa(p.rank)}
              </span>

              {/* Avatar */}
              <span
                className={`block mx-auto rounded-full overflow-hidden mb-2 ${
                  first ? 'w-[68px] h-[68px] ring-2 ring-amber-200' : 'w-[52px] h-[52px]'
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

              <p className="text-[11px] font-black text-[#1C1816] leading-4 mb-1.5 truncate">
                {p.name}
              </p>
              <span
                className={`inline-block text-[8.5px] font-bold px-2 py-0.5 rounded-md mb-2 ${
                  TONES[p.tone] || TONES.blue
                }`}
              >
                {p.level}
              </span>
              <p
                className={`text-[14px] font-black leading-5 ${
                  first ? 'text-amber-600' : 'text-[#1C1816]'
                }`}
              >
                {p.score}
              </p>
              <p className="text-[8.5px] text-gray-500">امتیاز</p>
            </div>
          );
        })}
      </div>

      {/* Remaining rows (rank 4+) — compact vertical list inside one glass card */}
      <GlassCard className="p-0 mb-5" key={`tbl-${tab}`}>
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-[12px] font-black text-[#1C1816] leading-5">
            رتبه‌های {toFa(4)} تا {toFa(7)}
          </p>
          <Icon name="lucide:list-ordered" size={16} className="text-orange-500" />
        </div>
        <ol>
          {leaderboardTable.rows.map((r, i) => (
            <li
              key={r.name}
              className={`flex items-center gap-3 px-4 py-3 ${
                i < leaderboardTable.rows.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="w-7 h-7 rounded-full bg-gray-100 text-[#1C1816] text-[11px] font-black flex items-center justify-center shrink-0">
                {toFa(r.rank)}
              </span>
              <span className="w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-orange-100">
                <ImageSlot
                  id={r.slot}
                  label={r.name}
                  ratio="aspect-square"
                  rounded="rounded-full"
                  icon="mdi:account-tie-outline"
                  className="!h-full"
                />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[12px] font-black text-[#1C1816] truncate leading-5">
                  {r.name}
                </span>
                <span className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`inline-block text-[8.5px] font-bold px-2 py-0.5 rounded-md ${
                      TONES[r.tone] || TONES.blue
                    }`}
                  >
                    {r.level}
                  </span>
                  <span className="flex-1 min-w-[50px] h-1 rounded-full bg-gray-100 overflow-hidden">
                    <span
                      className="block h-full rounded-full bg-orange-400"
                      style={{ width: `${r.progress}%` }}
                    />
                  </span>
                </span>
              </span>
              <span className="text-right shrink-0">
                <span className="block text-[12px] font-black text-orange-500 leading-4">
                  {r.score}
                </span>
                <span className="block text-[9px] text-gray-500 leading-3 mt-0.5">
                  {r.paths}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </GlassCard>

      {/* Competitive metrics — 2-col grid */}
      <h3 className="text-[13px] font-black text-[#1C1816] mb-3 leading-6">
        {competitiveMetrics.title}
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {competitiveMetrics.items.map((m) => (
          <div
            key={m.title}
            className="bg-white border border-gray-100 rounded-2xl p-3 flex items-center gap-2.5"
          >
            <span className="w-9 h-9 shrink-0 rounded-full bg-orange-50 overflow-hidden">
              <ImageSlot
                id={m.slot}
                label={m.title}
                ratio="aspect-square"
                rounded="rounded-full"
                icon="lucide:trophy"
                className="!h-full !bg-transparent !border-0 !p-0"
              />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[11px] font-black text-[#1C1816] leading-4 truncate">
                {m.title}
              </span>
              <span className="block text-[9px] text-gray-500 leading-3 mt-0.5 line-clamp-2">
                {m.sub}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Growth levels — list inside a glass card */}
      <h3 className="text-[13px] font-black text-[#1C1816] mb-3 leading-6">
        {growthLevels.title}
      </h3>
      <GlassCard className="mb-6 p-0">
        <ol className="px-4 py-2">
          {growthLevels.items.map((l, i) => (
            <li
              key={l.label}
              className={`flex items-center gap-3 py-2.5 ${
                i < growthLevels.items.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span
                className={`inline-flex items-center gap-1.5 text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 ${
                  TONES[l.tone] || TONES.orange
                }`}
              >
                <Icon name={l.icon} size={12} />
                {l.label}
              </span>
              <span className="text-[10px] text-gray-500 leading-5 flex-1">{l.sub}</span>
            </li>
          ))}
        </ol>
      </GlassCard>

      {/* Band — glass card with CTA */}
      <GlassCard className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
            <Icon name="lucide:award" size={22} className="text-orange-500" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-black text-[#1C1816] leading-7 mb-1">
              {leaderboardBand.title}
            </p>
            {leaderboardBand.lines.map((l) => (
              <p key={l} className="text-[11.5px] text-gray-500 leading-6">
                {l}
              </p>
            ))}
          </div>
        </div>
        <GradientCTA
          href={leaderboardBand.cta.href}
          label={leaderboardBand.cta.label}
          icon="lucide:arrow-left"
        />
      </GlassCard>
    </MobileSectionShell>
  );
}
