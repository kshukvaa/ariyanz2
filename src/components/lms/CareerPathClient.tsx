'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { PathAgent, PathTabs } from './PathParts';
import { careerPath } from '@/data/lms/paths';

/* ──────────────────────────────────────────────────────────────
   مسیر شغلی — single career path.

   The sibling of the skill path, and deliberately darker: a
   career path is a bigger commitment, so its hero is a navy card
   with the photo bleeding off the edge rather than the skill
   path's pale tint.

   SCOPE: «Career Development path.png» and its nine companion
   sheets draw six tabs. The «نقشه مسیر شغلی» panel is
   transcribed in full here because it is the substantive one —
   the seven-stage roadmap that defines the path. The other five
   tabs are declared and switch, and their panels come from
   sheets not transcribed in this round.
────────────────────────────────────────────────────────────── */

export default function CareerPathClient() {
  const [tab, setTab] = useState('map');

  return (
    <div style={{ backgroundColor: T.page }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden grid gap-6 lg:grid-cols-[1fr_1fr] items-center"
          style={{ borderRadius: R.lg, backgroundColor: '#161a3d' }}
        >
          <div className="relative px-8 py-10 text-right order-1">
            <span
              className="absolute top-6 right-8 px-3.5 py-1.5 text-[10px] font-bold"
              style={{ borderRadius: R.sm, backgroundColor: 'rgba(124,92,255,.25)', color: '#c9bdf7' }}
            >
              {careerPath.badge}
            </span>

            <h1 className="mt-9 text-[34px] sm:text-[42px] font-extrabold text-white">{careerPath.title}</h1>
            <p className="mt-3 text-[12.5px]" style={{ color: 'rgba(255,255,255,.82)' }}>
              {careerPath.desc}
            </p>

            <ul className="mt-7 flex items-start justify-end gap-6 flex-wrap">
              {careerPath.meta.map((m, i) => (
                <li
                  key={m.label}
                  className="px-4 text-center"
                  style={{ borderInlineEnd: i < careerPath.meta.length - 1 ? '1px solid rgba(255,255,255,.14)' : undefined }}
                >
                  <span className="flex items-center justify-center gap-1.5 text-[17px] font-extrabold text-white">
                    {m.value}
                    <Icon name={m.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
                  </span>
                  <span className="mt-1.5 block text-[9.5px]" style={{ color: 'rgba(255,255,255,.6)' }}>
                    {m.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-end gap-3 flex-wrap">
              <button
                className="flex items-center gap-2 px-9 py-3.5 text-[13px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: '#5b2fe0' }}
              >
                {careerPath.primary.label}
                <Icon name={careerPath.primary.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
              </button>
              <button
                className="flex items-center gap-2 px-7 py-3.5 text-[12.5px] font-bold bg-white"
                style={{ borderRadius: R.md, color: T.ink }}
              >
                {careerPath.secondary.label}
                <Icon name={careerPath.secondary.icon} size={14} style={{ backgroundColor: T.primary }} />
              </button>
            </div>
          </div>

          <img src={careerPath.art} alt="" className="w-full h-full object-cover order-2 opacity-90" />
        </section>

        {/* ── Body: reading column right, agent rail LEFT ──── */}
        <div className="grid gap-5 lg:grid-cols-[1fr_290px] items-start">
          <main className="min-w-0 space-y-5 order-1">
            <div className="bg-white px-2" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
              <PathTabs tabs={careerPath.tabs} active={tab} onPick={setTab} />
            </div>

            <section
              className="bg-white p-5"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <h2 className="flex items-center justify-end gap-2.5 text-[17px] font-extrabold" style={{ color: T.ink }}>
                {careerPath.map.title}
                <span
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
                >
                  <Icon name={careerPath.map.icon} size={18} style={{ backgroundColor: T.primary }} />
                </span>
              </h2>

              <p className="mt-4 text-right text-[12.5px] leading-8" style={{ color: T.ink }}>
                {careerPath.map.lead}
              </p>

              {/* Seven stages. Declared 1→7 so ۱ lands rightmost. */}
              <div className="mt-6 overflow-x-auto pb-2">
                <ol className="flex items-stretch gap-3 min-w-max">
                  {careerPath.map.steps.map((s, i) => (
                    <li key={s.n} className="flex items-stretch gap-3">
                      {i > 0 && (
                        <span className="self-start mt-6 w-8 border-t-2 border-dashed" style={{ borderColor: '#ded9f0' }} />
                      )}

                      <div className="w-[150px] flex flex-col">
                        <span className="flex justify-center">
                          <span
                            className="w-12 h-12 flex items-center justify-center text-[15px] font-extrabold text-white"
                            style={{
                              borderRadius: '999px',
                              backgroundColor: s.fg,
                              boxShadow: `0 0 0 4px ${s.fg}22`,
                            }}
                          >
                            {s.n}
                          </span>
                        </span>

                        <span className="mx-auto mt-3 w-2 h-2 rounded-full" style={{ backgroundColor: s.fg }} />

                        <div
                          className="mt-2 flex-1 p-3.5 text-center"
                          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                        >
                          <span className="block text-[12px] font-extrabold leading-6" style={{ color: T.ink }}>
                            {s.title}
                          </span>
                          <span className="mt-2 block text-[9.5px] leading-5" style={{ color: T.muted }}>
                            {s.desc}
                          </span>
                          <span
                            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 text-[9.5px] font-bold"
                            style={{ borderRadius: R.pill, backgroundColor: '#f6f5fb', color: T.ink }}
                          >
                            {s.hours}
                            <Icon name="lucide:clock" size={10} style={{ backgroundColor: T.muted }} />
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </main>

          <div className="order-2 lg:sticky lg:top-4">
            <PathAgent
              title={careerPath.agent.title}
              question={careerPath.agent.question}
              desc={careerPath.agent.desc}
              chips={careerPath.agent.chips}
              placeholder={careerPath.agent.placeholder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
