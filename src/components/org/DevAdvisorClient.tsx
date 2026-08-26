'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { Panel } from '@/components/org/panel/ReportShell';
import { T, R } from '@/data/panelTokens';
import {
  advisorHead,
  advisorHero,
  advisorQuestions,
  advisorRecent,
  advisorAccess,
  advisorAnswer,
  advisorDecisions,
  advisorWhy,
  advisorDesigner,
  advisorScenario,
  advisorResources,
} from '@/data/orgDevAdmin';

/* ──────────────────────────────────────────────────────────────
   Development advisor.

   The advisor answers with a worked proposal — target population,
   measured gaps, a four-phase path — and then shows the criteria
   it used. "Why this suggestion" is a panel rather than a
   footnote, because a recommendation about people's careers
   should be arguable.
────────────────────────────────────────────────────────────── */

export default function DevAdvisorClient() {
  const [level, setLevel] = useState(advisorHead.levels[0]);

  return (
    <div className="space-y-5">
      {/* ── Title + scope ─────────────────────────────────────── */}
      <div className="flex items-start gap-4 flex-wrap-reverse justify-between">
        <div className="flex items-center gap-2.5 flex-wrap">
          {advisorHead.filters.map((f) => (
            <span
              key={f.id}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-white text-[11.5px] font-semibold"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
            >
              <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
              {f.value}
            </span>
          ))}

          <span className="flex items-center gap-1">
            {advisorHead.levels.map((l) => {
              const on = l === level;
              return (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  aria-pressed={on}
                  className="px-4 py-2.5 text-[11.5px] font-bold transition-colors"
                  style={
                    on
                      ? { borderRadius: R.md, backgroundColor: T.primaryStrong, color: '#fff' }
                      : { borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }
                  }
                >
                  {l}
                </button>
              );
            })}
          </span>

          <span className="text-[11.5px] font-bold" style={{ color: T.ink }}>
            {advisorHead.levelLabel}
          </span>
        </div>

        <div className="text-right">
          <h1 className="text-[24px] font-extrabold" style={{ color: T.ink }}>
            {advisorHead.title}
          </h1>
          <p className="mt-1 text-[12.5px]" style={{ color: T.muted }}>
            {advisorHead.desc}
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[260px_1fr_300px] items-start">
        {/* RTL: first column is rightmost — recent chats and access. */}
        <div className="space-y-4 xl:order-1">
          <Panel title={advisorRecent.title} cta={advisorRecent.cta}>
            <ul className="space-y-2">
              {advisorRecent.rows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-2.5 p-2.5"
                  style={{
                    borderRadius: R.md,
                    backgroundColor: r.on ? T.tintPurple : 'transparent',
                    border: `1px solid ${r.on ? '#d8d2fb' : T.border}`,
                  }}
                >
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[10.5px] font-bold truncate" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {r.date}
                    </span>
                  </span>
                  <Icon name="lucide:message-circle" size={15} style={{ backgroundColor: T.primary }} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={advisorAccess.title} cta={advisorAccess.cta}>
            <ul className="space-y-2.5">
              {advisorAccess.rows.map((r) => (
                <li key={r.label} className="flex items-center gap-2.5">
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[10.5px] font-bold" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <span className="block text-[9px]" style={{ color: T.muted }}>
                      {r.note}
                    </span>
                  </span>
                  <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Centre: hero, prompts, worked answer */}
        <div className="space-y-4 min-w-0 xl:order-2">
          <section className="p-5" style={{ borderRadius: R.lg, backgroundColor: T.tintPurple }}>
            <h2 className="flex items-center justify-center gap-2 text-[17px] font-extrabold" style={{ color: T.primary }}>
              {advisorHero.title}
              <Icon name="lucide:sparkles" size={19} style={{ backgroundColor: T.primary }} />
            </h2>
            <p className="mt-2 text-center text-[11.5px] leading-6" style={{ color: T.muted }}>
              {advisorHero.desc}
            </p>

            <label className="mt-4 flex items-center gap-2.5 px-4 py-3 bg-white" style={{ borderRadius: R.md }}>
              <button
                aria-label="ارسال"
                className="w-9 h-9 flex items-center justify-center shrink-0"
                style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
              >
                <Icon name="lucide:send" size={16} className="text-white" />
              </button>
              <input
                placeholder={advisorHero.placeholder}
                className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
                style={{ color: T.ink }}
              />
            </label>

            <p className="mt-2 flex items-center justify-center gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
              {advisorHero.hint}
              <Icon name="lucide:lightbulb" size={12} style={{ backgroundColor: T.accent }} />
            </p>
          </section>

          <div>
            <h3 className="text-right text-[12.5px] font-extrabold mb-2.5" style={{ color: T.ink }}>
              {advisorQuestions.title}
            </h3>
            <div className="grid gap-2.5 grid-cols-2 xl:grid-cols-5">
              {advisorQuestions.rows.map((q) => (
                <button
                  key={q.label}
                  className="bg-white p-3.5 text-center transition-colors hover:bg-gray-50"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <span
                    className="w-10 h-10 flex items-center justify-center mx-auto"
                    style={{ borderRadius: R.md, backgroundColor: q.bg }}
                  >
                    <Icon name={q.icon} size={18} style={{ backgroundColor: q.fg }} />
                  </span>
                  <span className="block mt-2 text-[11px] font-extrabold" style={{ color: T.ink }}>
                    {q.label}
                  </span>
                  <span className="block mt-0.5 text-[8.5px] leading-3" style={{ color: T.muted }}>
                    {q.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* The worked answer */}
          <div className="flex items-start gap-3 justify-end">
            <span
              className="px-4 py-3 text-right text-[12px] font-semibold text-white max-w-[520px]"
              style={{ borderRadius: R.lg, backgroundColor: T.primaryStrong }}
            >
              {advisorAnswer.question}
            </span>
            <img
              src="/images/aryaz/avatars/org-manager-header.png"
              alt=""
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
          </div>

          <section className="bg-white p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            <header className="flex items-center gap-2.5 justify-end">
              <span className="text-[13px] font-extrabold" style={{ color: T.primary }}>
                {advisorAnswer.brand}
              </span>
              <Icon name="lucide:bot" size={19} style={{ backgroundColor: T.primary }} />
            </header>

            <p className="mt-2.5 text-right text-[12px] leading-6" style={{ color: T.ink }}>
              {advisorAnswer.lead}
            </p>

            <div className="mt-4 grid gap-4 lg:grid-cols-[240px_1fr]">
              <div className="p-3.5" style={{ borderRadius: R.md, backgroundColor: '#fafafc' }}>
                <h4 className="text-right text-[11px] font-extrabold" style={{ color: T.ink }}>
                  {advisorAnswer.targetTitle}
                </h4>

                <ul className="mt-2 space-y-1.5">
                  {advisorAnswer.target.map((t) => (
                    <li key={t.label} className="flex items-center justify-between text-[10px]">
                      <span className="font-bold" style={{ color: T.ink }}>
                        {t.value}
                      </span>
                      <span style={{ color: T.muted }}>{t.label}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-3 space-y-2">
                  {advisorAnswer.gaps.map((g) => (
                    <li key={g.label}>
                      <div className="flex items-center justify-between text-[9.5px]">
                        <span className="font-bold" style={{ color: T.primary }}>
                          {g.pct}٪
                        </span>
                        <span style={{ color: T.ink }}>{g.label}</span>
                      </div>
                      <span className="mt-1 block h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${g.pct}%`, backgroundColor: T.primary }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-right text-[11px] font-extrabold mb-2.5" style={{ color: T.ink }}>
                  {advisorAnswer.pathTitle}
                </h4>

                <div className="grid gap-2.5 grid-cols-2 xl:grid-cols-4">
                  {advisorAnswer.path.map((p) => (
                    <div
                      key={p.n}
                      className="p-3 text-center"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <span className="block text-[9px] font-bold" style={{ color: T.muted }}>
                        {p.n}
                      </span>
                      <Icon
                        name={p.icon}
                        size={19}
                        style={{ backgroundColor: T.primary, margin: '6px auto' }}
                      />
                      <span className="block text-[10.5px] font-extrabold" style={{ color: T.ink }}>
                        {p.label}
                      </span>
                      <ul className="mt-1.5 space-y-1">
                        {p.rows.map((r) => (
                          <li key={r} className="text-[8.5px] leading-3" style={{ color: T.muted }}>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              data-ripple
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[12px] font-bold text-white"
              style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
            >
              <Icon name="lucide:plus" size={15} className="text-white" />
              {advisorAnswer.cta}
            </button>
          </section>

          {/* Why + designer + scenario */}
          <div className="grid gap-4 md:grid-cols-3">
            <Panel title={advisorWhy.title}>
              <p className="text-right text-[9.5px] mb-2" style={{ color: T.muted }}>
                {advisorWhy.desc}
              </p>
              <ul className="space-y-1.5">
                {advisorWhy.rows.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-[10px]" style={{ color: T.ink }}>
                    <span className="flex-1 text-right">{r}</span>
                    <Icon name="lucide:check" size={12} style={{ backgroundColor: T.success }} />
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title={advisorDesigner.title}>
              <div className="space-y-2.5">
                {advisorDesigner.fields.map((f) => (
                  <span
                    key={f.value}
                    className="flex items-center gap-2 px-3 py-2.5"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                  >
                    <Icon name="lucide:chevron-down" size={12} style={{ backgroundColor: T.muted }} />
                    <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                      {f.value}
                    </span>
                  </span>
                ))}
              </div>

              <button
                data-ripple
                className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-[11px] font-bold text-white"
                style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
              >
                <Icon name="lucide:sparkles" size={13} className="text-white" />
                {advisorDesigner.cta}
              </button>
            </Panel>

            <Panel title={advisorScenario.title} cta={advisorScenario.cta}>
              <p className="text-right text-[10px] font-bold mb-2.5" style={{ color: T.ink }}>
                {advisorScenario.question}
              </p>
              <ul className="space-y-2">
                {advisorScenario.rows.map((r) => (
                  <li key={r.label} className="flex items-center gap-2.5">
                    <span className="text-[11px] font-extrabold shrink-0" style={{ color: r.fg }}>
                      {r.value}
                    </span>
                    <span className="flex-1 text-right text-[10px]" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <Icon name={r.icon} size={14} style={{ backgroundColor: r.fg }} />
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>

        {/* Decisions + resources */}
        <div className="space-y-4 xl:order-3">
          <Panel title={advisorDecisions.title} cta={advisorDecisions.cta}>
            <ul className="space-y-2.5">
              {advisorDecisions.rows.map((r) => (
                <li key={r.label} className="p-3" style={{ borderRadius: R.md, backgroundColor: r.bg }}>
                  <span className="flex items-start gap-2">
                    <span className="flex-1 text-right text-[10.5px] font-bold leading-4" style={{ color: T.ink }}>
                      {r.label}
                    </span>
                    <Icon name={r.icon} size={16} style={{ backgroundColor: r.fg }} />
                  </span>

                  <ul className="mt-1.5 space-y-0.5">
                    {r.lines.map((l) => (
                      <li key={l} className="flex items-center gap-1.5 text-[8.5px]" style={{ color: T.muted }}>
                        <span className="flex-1 text-right">{l}</span>
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: r.fg }} />
                      </li>
                    ))}
                  </ul>

                  <button
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold bg-white"
                    style={{ borderRadius: R.sm, color: r.fg }}
                  >
                    <Icon name="lucide:sparkles" size={11} style={{ backgroundColor: r.fg }} />
                    {r.cta}
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={advisorResources.title}>
            <p className="text-right text-[9.5px] mb-2" style={{ color: T.muted }}>
              {advisorResources.sub}
            </p>
            <ul className="space-y-2">
              {advisorResources.rows.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-2.5 p-2.5"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                >
                  <span className="flex-1 text-right text-[10px] leading-4" style={{ color: T.ink }}>
                    {r.label}
                  </span>
                  <Icon name={r.icon} size={15} style={{ backgroundColor: r.fg }} />
                </li>
              ))}
            </ul>

            <button
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-bold"
              style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
            >
              <Icon name="lucide:plus" size={13} style={{ backgroundColor: T.primary }} />
              {advisorResources.cta}
            </button>
          </Panel>
        </div>
      </div>
    </div>
  );
}
