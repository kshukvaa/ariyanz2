'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  CALC_TINT,
  calcHero,
  calcModes,
  calcChat,
  calcResult,
  calcSuggest,
  calcFeatures,
} from '@/data/salary-assistant';

/* ──────────────────────────────────────────────────────────────
   ماشین‌حساب هوشمند حقوق.

   Not a form — a conversation. The centre column is a transcript
   with a result card embedded in it; the rail is the list of
   follow-up questions the assistant can already answer.

   RTL: the suggestion rail is on the right in the mockup, so it
   is declared before the transcript.
────────────────────────────────────────────────────────────── */

export default function SalaryAssistantClient() {
  const [mode, setMode] = useState(calcModes[0].id);

  return (
    <div style={{ backgroundColor: '#fbfbfe' }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: CALC_TINT }}>
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 pb-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px] items-center">
            <div className="text-center lg:text-right order-2 lg:order-1">
              <h1 className="flex items-center justify-center lg:justify-end gap-2.5 text-[26px] sm:text-[32px] font-extrabold" style={{ color: T.ink }}>
                {calcHero.title}
                <Icon name={calcHero.icon} size={22} style={{ backgroundColor: T.violet }} />
              </h1>
              <p className="mt-3 text-[12.5px]" style={{ color: T.ink }}>
                {calcHero.desc}
              </p>

              {/* Mode cards. First declared → right. */}
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {calcModes.map((m) => {
                  const on = m.id === mode;
                  return (
                    <li key={m.id}>
                      <button
                        onClick={() => setMode(m.id)}
                        aria-pressed={on}
                        className="w-full bg-white p-5 text-center transition-shadow"
                        style={{
                          borderRadius: R.lg,
                          border: `1.5px solid ${on ? m.fg : T.border}`,
                          boxShadow: on ? `0 0 0 3px ${m.fg}14` : undefined,
                        }}
                      >
                        <span className="block text-[10px]" style={{ color: T.muted }}>
                          {m.eyebrow}
                        </span>

                        <span className="mt-2 flex items-center justify-center gap-3">
                          <span className="text-[17px] font-extrabold" style={{ color: m.fg }}>
                            {m.title}
                          </span>
                          <span
                            className="w-11 h-11 flex items-center justify-center shrink-0"
                            style={{ borderRadius: '999px', backgroundColor: m.bg }}
                          >
                            <Icon name={m.icon} size={20} style={{ backgroundColor: m.fg }} />
                          </span>
                        </span>

                        <span className="mt-2.5 block text-[10.5px] leading-6" style={{ color: T.muted }}>
                          {m.desc.map((d) => (
                            <React.Fragment key={d}>
                              {d}
                              <br />
                            </React.Fragment>
                          ))}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <img
              src={calcHero.art}
              alt=""
              className="order-1 lg:order-2 w-full max-w-[260px] mx-auto object-contain"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid gap-4 lg:grid-cols-[300px_1fr] items-start">
          {/* ── Suggestion rail (right) ──────────────────────── */}
          <aside className="space-y-3 lg:sticky lg:top-4">
            <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
              {calcSuggest.title}
              <Icon name={calcSuggest.icon} size={15} style={{ backgroundColor: T.violet }} />
            </h2>

            <ul className="space-y-2.5">
              {calcSuggest.items.map((s) => (
                <li key={s.title}>
                  <button
                    className="w-full bg-white p-3.5 flex items-center gap-3 text-right transition-colors hover:bg-gray-50"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                  >
                    <span className="flex-1 min-w-0 order-1">
                      <span className="block text-[11px] font-extrabold leading-5" style={{ color: T.ink }}>
                        {s.title}
                      </span>
                      <span className="mt-0.5 block text-[10px]" style={{ color: T.muted }}>
                        {s.desc}
                      </span>
                    </span>
                    <span
                      className="w-9 h-9 flex items-center justify-center shrink-0 order-2"
                      style={{ borderRadius: R.md, backgroundColor: s.bg }}
                    >
                      <Icon name={s.icon} size={17} style={{ backgroundColor: s.fg }} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div
              className="p-4 flex items-start gap-2.5"
              style={{ borderRadius: R.md, backgroundColor: '#f4f2fd' }}
            >
              <p className="flex-1 text-right text-[10px] leading-6" style={{ color: T.muted }}>
                {calcSuggest.note.text}
              </p>
              <Icon name={calcSuggest.note.icon} size={17} className="shrink-0" style={{ backgroundColor: T.primary }} />
            </div>
          </aside>

          {/* ── Transcript ───────────────────────────────────── */}
          <main
            className="min-w-0 bg-white p-4 sm:p-5"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <header className="flex items-center gap-3 pb-4" style={{ borderBottom: `1px solid ${T.border}` }}>
              <img src={calcChat.art} alt="" className="w-12 h-12 object-contain shrink-0" />

              <div className="flex-1 min-w-0 text-right">
                <span className="block text-[14px] font-extrabold" style={{ color: T.ink }}>
                  {calcChat.name}
                </span>
                <span className="mt-0.5 flex items-center justify-end gap-1.5 text-[10px]" style={{ color: T.muted }}>
                  {calcChat.status}
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {calcChat.tools.map((t) => (
                  <button
                    key={t.label}
                    aria-label={t.label}
                    className="w-9 h-9 flex items-center justify-center"
                    style={{ borderRadius: R.sm, border: `1px solid ${T.border}` }}
                  >
                    <Icon name={t.icon} size={15} style={{ backgroundColor: T.ink }} />
                  </button>
                ))}
              </div>
            </header>

            <ol className="mt-4 space-y-4">
              {calcChat.messages.map((m, i) => (
                <li key={i} className={`flex items-start gap-2.5 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.from === 'bot' ? (
                    <img src={calcChat.art} alt="" className="w-10 h-10 object-contain shrink-0" />
                  ) : (
                    <span
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ borderRadius: '999px', backgroundColor: T.tintPurple }}
                    >
                      <Icon name="lucide:user-round" size={17} style={{ backgroundColor: T.primary }} />
                    </span>
                  )}

                  <span
                    className="max-w-[80%] px-4 py-3"
                    style={{
                      borderRadius: R.md,
                      backgroundColor: m.from === 'bot' ? '#f6f6fa' : T.tintPurple,
                    }}
                  >
                    <span className="block text-right text-[12px] leading-7" style={{ color: T.ink }}>
                      {m.text}
                    </span>
                    {m.time && (
                      <span className="mt-1 block text-left text-[9px]" style={{ color: T.muted }}>
                        {m.time}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>

            {/* Result card, embedded in the transcript. */}
            <section className="mt-4" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
              <div
                className="p-5 flex items-center gap-5 flex-wrap"
                style={{ borderRadius: `${R.lg} ${R.lg} 0 0`, backgroundColor: '#f4f2fd' }}
              >
                <span
                  className="w-12 h-12 flex items-center justify-center shrink-0 order-3 bg-white"
                  style={{ borderRadius: R.md }}
                >
                  <Icon name={calcResult.icon} size={21} style={{ backgroundColor: T.primary }} />
                </span>

                <div className="flex-1 min-w-[160px] text-center order-1">
                  <span className="block text-[11px]" style={{ color: T.muted }}>
                    {calcResult.gross.label}
                  </span>
                  <span className="mt-1.5 block text-[17px] font-extrabold" style={{ color: T.ink }}>
                    {calcResult.gross.value} <span className="text-[11px] font-bold">{calcResult.gross.unit}</span>
                  </span>
                </div>

                <span className="w-px h-10 order-2" style={{ backgroundColor: '#d9d4f0' }} />

                <div className="flex-1 min-w-[160px] text-center order-1">
                  <span className="block text-[11px]" style={{ color: T.muted }}>
                    {calcResult.net.label}
                  </span>
                  <span className="mt-1.5 block text-[19px] font-extrabold" style={{ color: '#1c8a4e' }}>
                    {calcResult.net.value} <span className="text-[11px] font-bold">{calcResult.net.unit}</span>
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-center text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {calcResult.breakdownTitle}
                </h3>

                <ul className="mt-4 grid gap-2.5 grid-cols-2 sm:grid-cols-3 xl:grid-cols-5">
                  {calcResult.cases.map((c) => (
                    <li
                      key={c.label + (c.sub ?? '')}
                      className="relative px-3 pt-6 pb-4 text-center"
                      style={{
                        borderRadius: R.md,
                        backgroundColor: c.you ? '#f1faf5' : '#fbfbfe',
                        border: `1px solid ${c.you ? '#bfe6d0' : T.border}`,
                      }}
                    >
                      {c.you && (
                        <span
                          className="absolute top-1.5 inset-x-0 mx-auto w-max flex items-center gap-1 px-2 py-0.5 text-[8px] font-bold"
                          style={{ borderRadius: R.pill, backgroundColor: '#dff3e8', color: '#1c8a4e' }}
                        >
                          {calcResult.youBadge}
                          <Icon name="lucide:check" size={8} style={{ backgroundColor: '#1c8a4e' }} />
                        </span>
                      )}

                      <span className="flex items-center justify-center gap-1.5">
                        <span className="text-[11px] font-extrabold" style={{ color: T.ink }}>
                          {c.label}
                        </span>
                        <Icon
                          name="lucide:users-round"
                          size={13}
                          style={{ backgroundColor: c.you ? '#1c8a4e' : T.primary }}
                        />
                      </span>
                      {c.sub && (
                        <span className="mt-0.5 block text-[9px]" style={{ color: T.muted }}>
                          {c.sub}
                        </span>
                      )}

                      <span
                        className="mt-3 block text-[13px] font-extrabold"
                        style={{ color: c.you ? '#1c8a4e' : T.ink }}
                      >
                        {c.value}
                      </span>
                      <span className="block text-[9px]" style={{ color: T.muted }}>
                        {calcResult.unit}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-center text-[9.5px]" style={{ color: T.muted }}>
                  {calcResult.footnote}
                </p>
              </div>
            </section>

            {/* Composer. */}
            <label className="mt-4 flex items-center gap-3">
              <button
                aria-label="ارسال"
                className="w-12 h-12 flex items-center justify-center shrink-0 order-2"
                style={{ borderRadius: R.md, backgroundColor: T.primary }}
              >
                <Icon name="lucide:send" size={17} style={{ backgroundColor: '#ffffff' }} />
              </button>
              <input
                placeholder={calcChat.placeholder}
                className="flex-1 min-w-0 order-1 px-4 py-3.5 text-[11.5px] outline-none placeholder:text-[#9396b0]"
                style={{ borderRadius: R.md, border: `1px solid #d9d4f0`, color: T.ink }}
              />
            </label>
          </main>
        </div>

        {/* ── Feature strip ──────────────────────────────────── */}
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {calcFeatures.map((f) => (
            <li key={f.label} className="flex items-center gap-3 justify-center">
              <span className="text-right">
                <span className="block text-[12px] font-extrabold" style={{ color: T.ink }}>
                  {f.label}
                </span>
                <span className="mt-0.5 block text-[10px]" style={{ color: T.muted }}>
                  {f.sub}
                </span>
              </span>
              <span
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
              >
                <Icon name={f.icon} size={18} style={{ backgroundColor: T.primary }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
