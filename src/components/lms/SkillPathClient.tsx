'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { LevelBar, PathAgent, PathTabs, ResourceColumns, PathRatings } from './PathParts';
import { skillPath } from '@/data/lms/paths';

/* ──────────────────────────────────────────────────────────────
   مسیر مهارتی — single skill path.

   RTL exception worth stating: on this page the Aryaz agent rail
   is on the LEFT, not the right. So the reading column is
   declared FIRST and the rail second — the inverse of the
   counselling and course pages.
────────────────────────────────────────────────────────────── */

export default function SkillPathClient() {
  const [tab, setTab] = useState('about');

  return (
    <div style={{ backgroundColor: T.page }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden grid gap-6 lg:grid-cols-[1fr_1fr] items-center"
          style={{ borderRadius: R.lg, backgroundColor: '#faf9ff' }}
        >
          <div className="px-8 py-9 text-right order-1">
            <span
              className="inline-block px-3.5 py-1.5 text-[10px] font-bold"
              style={{ borderRadius: R.sm, backgroundColor: T.tintPurple, color: T.primary }}
            >
              {skillPath.badge}
            </span>

            <h1 className="mt-4 text-[30px] sm:text-[36px] font-extrabold" style={{ color: T.ink }}>
              {skillPath.title}
            </h1>
            <p className="mt-3 text-[13px]" style={{ color: T.ink }}>
              {skillPath.desc}
            </p>

            <ul className="mt-6 flex items-center justify-end gap-6 flex-wrap">
              {skillPath.meta.map((m) => (
                <li key={m.value} className="flex items-center gap-1.5 text-[11.5px] font-bold" style={{ color: T.ink }}>
                  {m.value}
                  <Icon name={m.icon} size={14} style={{ backgroundColor: T.primary }} />
                </li>
              ))}
            </ul>

            <div className="mt-6 max-w-[420px] mr-auto">
              <LevelBar tone="violet" />
            </div>

            <div className="mt-7 flex items-center justify-end gap-3 flex-wrap">
              <button
                className="flex items-center gap-2 px-9 py-3.5 text-[13px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: T.primary }}
              >
                {skillPath.primary.label}
                <Icon name={skillPath.primary.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
              </button>
              <button
                className="flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold bg-white"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                {skillPath.secondary.label}
                <Icon name={skillPath.secondary.icon} size={14} style={{ backgroundColor: T.primary }} />
              </button>
            </div>
          </div>

          <img src={skillPath.art} alt="" className="w-full h-full object-cover order-2" />
        </section>

        {/* ── Body: reading column right, agent rail LEFT ──── */}
        <div className="grid gap-5 lg:grid-cols-[1fr_290px] items-start">
          <main className="min-w-0 space-y-5 order-1">
            <PathTabs tabs={skillPath.tabs} active={tab} onPick={setTab} />

            <section
              className="bg-white p-5"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <h2 className="flex items-center justify-end gap-2.5 text-[17px] font-extrabold" style={{ color: T.ink }}>
                {skillPath.about.title}
                <span
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
                >
                  <Icon name={skillPath.about.icon} size={18} style={{ backgroundColor: T.primary }} />
                </span>
              </h2>

              {skillPath.about.body.map((p) => (
                <p key={p.slice(0, 20)} className="mt-4 text-right text-[12.5px] leading-9" style={{ color: T.ink }}>
                  {p}
                </p>
              ))}

              <ul className="mt-6 grid gap-3 sm:grid-cols-4" style={{ borderRadius: R.md }}>
                {skillPath.about.stats.map((s) => (
                  <li
                    key={s.value}
                    className="py-5 text-center"
                    style={{ borderRadius: R.md, backgroundColor: '#fafafd' }}
                  >
                    <span
                      className="mx-auto w-11 h-11 flex items-center justify-center"
                      style={{ borderRadius: '999px', backgroundColor: `${s.fg}14` }}
                    >
                      <Icon name={s.icon} size={19} style={{ backgroundColor: s.fg }} />
                    </span>
                    <span className="mt-2.5 block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <ResourceColumns title={skillPath.resourcesTitle} groups={skillPath.resources} />

            <PathRatings
              title={skillPath.ratings.title}
              score={skillPath.ratings.score}
              count={skillPath.ratings.count}
              submit={skillPath.ratings.submit}
              bars={skillPath.ratings.bars}
              reviews={skillPath.ratings.reviews}
            />
          </main>

          <div className="order-2 lg:sticky lg:top-4">
            <PathAgent
              title={skillPath.agent.title}
              desc={skillPath.agent.desc}
              chips={skillPath.agent.chips}
              placeholder={skillPath.agent.placeholder}
            />
          </div>
        </div>

        {/* ── Closing CTA ──────────────────────────────────── */}
        <section
          className="p-8 text-center"
          style={{
            borderRadius: R.lg,
            backgroundImage: 'linear-gradient(to left, #6d5efc, #3b82f6, #2dd4bf)',
          }}
        >
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-white">{skillPath.cta.title}</h2>
          <p className="mt-3 text-[13px]" style={{ color: 'rgba(255,255,255,.9)' }}>
            {skillPath.cta.desc}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 px-8 py-3.5 text-[12.5px] font-extrabold bg-white"
              style={{ borderRadius: R.md, color: T.ink }}
            >
              {skillPath.cta.primary.label}
              <Icon name={skillPath.cta.primary.icon} size={15} style={{ backgroundColor: T.primary }} />
            </button>
            <button
              className="flex items-center gap-2 px-8 py-3.5 text-[12.5px] font-extrabold bg-white"
              style={{ borderRadius: R.md, color: T.ink }}
            >
              {skillPath.cta.secondary.label}
              <Icon name={skillPath.cta.secondary.icon} size={15} style={{ backgroundColor: T.primary }} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
