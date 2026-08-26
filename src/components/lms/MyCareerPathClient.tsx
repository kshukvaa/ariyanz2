'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R, fa } from '@/data/panelTokens';
import { PATH_BAR, myCareerPath as M } from '@/data/lms/path-steps';

/* ──────────────────────────────────────────────────────────────
   مسیر شغلی من — the learner's own view of a career path.

   The public /career-paths/[id] page sells the path; this one
   reports on it. So the same seven stages appear, but here each
   carries a percentage and a state, and the page's centrepiece is
   the skills table — the honest gap list between «سطح موردنیاز»
   and «سطح فعلی شما».

   RTL: the challenges rail is on the RIGHT, the coach on the
   LEFT. Same arrangement as the level test.
────────────────────────────────────────────────────────────── */

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
    >
      {children}
    </section>
  );
}

const toneStyle = {
  ready: { fg: '#1c8a4e', bar: '#1c8a4e' },
  progress: { fg: '#e07b18', bar: '#e07b18' },
  gap: { fg: '#e5342c', bar: '#e5342c' },
};

export default function MyCareerPathClient() {
  return (
    <div style={{ backgroundColor: T.page }}>
      {/* Page bar. Mockup's logo/user row dropped on instruction. */}
      <div style={{ backgroundColor: PATH_BAR }}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
          <span className="flex-1" />
          <Link
            href={M.back.href}
            className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-white shrink-0"
            style={{ borderRadius: R.md, border: '1px solid rgba(255,255,255,.25)' }}
          >
            <Icon name="lucide:arrow-left" size={13} style={{ backgroundColor: '#ffffff' }} />
            {M.back.label}
          </Link>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-4 xl:grid-cols-[300px_1fr_290px] items-start">
          {/* ── Challenges + final project (right) ────────── */}
          <aside className="space-y-4 order-1 xl:sticky xl:top-4">
            <Card>
              <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
                {M.challenges.title}
                <Icon name={M.challenges.icon} size={15} style={{ backgroundColor: T.primary }} />
              </h2>

              <ul className="mt-4 space-y-3">
                {M.challenges.items.map((c) => (
                  <li
                    key={c.title}
                    className="p-3.5"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                  >
                    <div className="flex items-start gap-2.5">
                      <h3 className="flex-1 text-right text-[11.5px] font-extrabold leading-6" style={{ color: T.ink }}>
                        {c.title}
                      </h3>
                      <span
                        className="w-7 h-7 flex items-center justify-center shrink-0"
                        style={{ borderRadius: '999px', backgroundColor: `${c.fg}18` }}
                      >
                        <Icon name={c.icon} size={14} style={{ backgroundColor: c.fg }} />
                      </span>
                    </div>

                    <p className="mt-2.5 flex items-center gap-2">
                      <span className="text-[9.5px]" style={{ color: T.muted }}>
                        {c.note}
                      </span>
                      <span className="flex-1 text-right text-[10.5px] font-bold" style={{ color: c.fg }}>
                        {c.stateLabel}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: T.ink }}>
                {M.finalProject.title}
                <Icon name={M.finalProject.icon} size={15} style={{ backgroundColor: T.primary }} />
              </h2>

              <p className="mt-3 text-right text-[12px] font-extrabold" style={{ color: T.ink }}>
                {M.finalProject.name}
              </p>
              <p className="mt-2.5 text-right text-[10.5px]" style={{ color: T.muted }}>
                {M.finalProject.lead}
              </p>

              <ul className="mt-3 space-y-2.5">
                {M.finalProject.conditions.map((c) => (
                  <li key={c.label} className="flex items-center gap-2.5">
                    <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                      {c.label}
                    </span>
                    {c.done ? (
                      <span
                        className="w-[18px] h-[18px] flex items-center justify-center shrink-0"
                        style={{ borderRadius: '999px', backgroundColor: '#1c8a4e' }}
                      >
                        <Icon name="lucide:check" size={10} style={{ backgroundColor: '#ffffff' }} />
                      </span>
                    ) : (
                      <span
                        className="w-[18px] h-[18px] shrink-0"
                        style={{ borderRadius: '999px', border: `2px solid ${T.primary}` }}
                      />
                    )}
                  </li>
                ))}
              </ul>

              <p className="mt-4 flex items-center gap-2">
                <Icon name="lucide:lock" size={13} className="shrink-0" style={{ backgroundColor: T.muted }} />
                <span className="flex-1 text-right text-[10px]" style={{ color: T.muted }}>
                  {M.finalProject.note}
                </span>
              </p>

              <span className="mt-2.5 block h-2 rounded-full" style={{ backgroundColor: T.border }}>
                <span
                  className="block h-2 rounded-full"
                  style={{ width: `${M.finalProject.bar}%`, backgroundColor: T.primary }}
                />
              </span>
            </Card>
          </aside>

          {/* ── Centre ────────────────────────────────────── */}
          <main className="min-w-0 space-y-4 order-2">
            <Card>
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  className="flex items-center gap-2 px-6 py-3 text-[12px] font-extrabold text-white shrink-0 order-3 transition-opacity hover:opacity-90"
                  style={{ borderRadius: R.md, backgroundColor: T.primary }}
                >
                  {M.resume.label}
                  <Icon name={M.resume.icon} size={14} style={{ backgroundColor: '#ffffff' }} />
                </button>

                <div className="flex-1 min-w-[220px] text-center order-2">
                  <h1 className="flex items-center justify-center gap-2.5 text-[21px] font-extrabold" style={{ color: T.ink }}>
                    {M.title}
                    <Icon name={M.icon} size={20} style={{ backgroundColor: T.primary }} />
                  </h1>
                  <p className="mt-2 text-[11.5px]" style={{ color: T.muted }}>
                    {M.desc}
                  </p>
                </div>

                <Link
                  href={M.view.href}
                  className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold shrink-0 order-1"
                  style={{ borderRadius: R.md, border: `1px solid ${T.primary}44`, color: T.primary }}
                >
                  {M.view.label}
                  <Icon name={M.view.icon} size={13} style={{ backgroundColor: T.primary }} />
                </Link>
              </div>
            </Card>

            {/* Stat strip. */}
            <ul className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {M.stats.map((s) => (
                <li
                  key={s.label}
                  className="bg-white p-4 text-center"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {s.ring !== undefined ? (
                      <span className="relative inline-flex items-center justify-center" style={{ width: 46, height: 46 }}>
                        <svg width={46} height={46} className="absolute inset-0 -rotate-90 scale-x-[-1]">
                          <circle cx={23} cy={23} r={19} fill="none" stroke={T.border} strokeWidth={5} />
                          <circle
                            cx={23}
                            cy={23}
                            r={19}
                            fill="none"
                            stroke={s.fg}
                            strokeWidth={5}
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 19}
                            strokeDashoffset={2 * Math.PI * 19 * (1 - s.ring / 100)}
                          />
                        </svg>
                        <span className="relative text-[10px] font-extrabold" style={{ color: T.ink }}>
                          {fa(s.ring)}%
                        </span>
                      </span>
                    ) : (
                      s.icon && <Icon name={s.icon} size={17} style={{ backgroundColor: s.fg }} />
                    )}

                    <span className="text-[17px] font-extrabold" style={{ color: s.fg }}>
                      {s.value}
                    </span>
                  </span>

                  <span className="mt-2 block text-[10.5px] font-bold" style={{ color: T.ink }}>
                    {s.label}
                  </span>
                  <span className="mt-0.5 block text-[9px]" style={{ color: T.muted }}>
                    {s.sub}
                  </span>
                </li>
              ))}
            </ul>

            {/* Readiness map. */}
            <Card>
              <h2 className="text-center text-[15px] font-extrabold" style={{ color: T.ink }}>
                {M.map.title}
              </h2>

              <div className="mt-5 overflow-x-auto pb-2">
                <ol className="flex items-stretch gap-2.5 min-w-max">
                  {M.map.steps.map((s, i) => (
                    <li key={s.n} className="flex items-stretch gap-2.5">
                      {i > 0 && (
                        <span className="self-start mt-6 w-7 border-t-2 border-dashed shrink-0" style={{ borderColor: '#ded9f0' }} />
                      )}

                      <div
                        className="w-[132px] p-3 text-center flex flex-col"
                        style={{
                          borderRadius: R.md,
                          border: `1.5px solid ${s.state === 'current' ? T.primary : T.border}`,
                          backgroundColor: s.state === 'current' ? '#faf9ff' : '#ffffff',
                        }}
                      >
                        <span className="flex justify-center">
                          <span
                            className="w-9 h-9 flex items-center justify-center text-[12px] font-extrabold text-white"
                            style={{ borderRadius: '999px', backgroundColor: s.fg }}
                          >
                            {s.n}
                          </span>
                        </span>

                        <span className="mt-2.5 block text-[11px] font-extrabold leading-5 flex-1" style={{ color: T.ink }}>
                          {s.label}
                        </span>

                        <span className="mt-2 block">
                          <Icon name={s.icon} size={17} style={{ backgroundColor: s.fg }} />
                        </span>

                        {s.pct && (
                          <>
                            <span className="mt-1.5 block text-[13px] font-extrabold" style={{ color: T.ink }}>
                              {s.pct}
                            </span>
                            {s.state === 'current' && (
                              <span className="mt-1.5 block h-1.5 rounded-full" style={{ backgroundColor: T.border }}>
                                <span className="block h-1.5 rounded-full" style={{ width: '62%', backgroundColor: T.primary }} />
                              </span>
                            )}
                          </>
                        )}

                        <span
                          className="mt-2 flex items-center justify-center gap-1 text-[9px] font-bold"
                          style={{ color: s.state === 'done' ? '#1c8a4e' : s.state === 'current' ? T.primary : T.muted }}
                        >
                          {s.note}
                          {s.state === 'done' && (
                            <Icon name="lucide:circle-check" size={10} style={{ backgroundColor: '#1c8a4e' }} />
                          )}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>

            {/* Skills table. */}
            <Card>
              <h2 className="text-center text-[15px] font-extrabold" style={{ color: T.ink }}>
                {M.skills.title}
              </h2>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[620px] text-right border-collapse">
                  <thead>
                    <tr>
                      {M.skills.cols.map((c) => (
                        <th
                          key={c}
                          className="px-3 py-3 text-[10.5px] font-bold"
                          style={{ color: T.muted, borderBottom: `1px solid ${T.border}` }}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {M.skills.rows.map((r) => {
                      const tone = toneStyle[r.tone];
                      return (
                        <tr key={r.skill}>
                          <td className="px-3 py-3.5 text-[11.5px] font-bold" style={{ color: T.ink, borderBottom: `1px solid ${T.border}` }}>
                            {r.skill}
                          </td>
                          <td className="px-3 py-3.5 text-[11px]" style={{ color: T.muted, borderBottom: `1px solid ${T.border}` }}>
                            {r.need}
                          </td>
                          <td className="px-3 py-3.5 text-[11px] font-bold" style={{ color: T.ink, borderBottom: `1px solid ${T.border}` }}>
                            {r.have}
                          </td>
                          <td className="px-3 py-3.5" style={{ borderBottom: `1px solid ${T.border}` }}>
                            <span className="flex items-center gap-2.5">
                              <span className="text-[10.5px] font-bold shrink-0" style={{ color: T.ink }}>
                                {fa(r.pct)}%
                              </span>
                              <span className="flex-1 h-2 rounded-full" style={{ backgroundColor: T.border }}>
                                <span className="block h-2 rounded-full" style={{ width: `${r.pct}%`, backgroundColor: tone.bar }} />
                              </span>
                            </span>
                          </td>
                          <td className="px-3 py-3.5" style={{ borderBottom: `1px solid ${T.border}` }}>
                            <span className="flex items-center gap-1.5 text-[10.5px] font-bold" style={{ color: tone.fg }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tone.fg }} />
                              {r.state}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </main>

          {/* ── Coach (left) ──────────────────────────────── */}
          <aside className="order-3 xl:sticky xl:top-4">
            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: T.ink }}>
                {M.coach.title}
              </h2>
              <p className="mt-1.5 flex items-center justify-end gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
                {M.coach.status}
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#22c55e' }} />
              </p>

              <img
                src="/images/aryaz/illustrations/ai-assistant-avatar.png"
                alt=""
                className="mt-3 mx-auto w-28 h-28 object-contain"
              />

              <p
                className="mt-3 p-3.5 text-center text-[10.5px] leading-7"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
              >
                {M.coach.bubble.map((b) => (
                  <React.Fragment key={b}>
                    {b}
                    <br />
                  </React.Fragment>
                ))}
              </p>

              <h3 className="mt-5 text-center text-[11.5px] font-extrabold" style={{ color: T.primary }}>
                {M.coach.chipsTitle}
              </h3>

              <ul className="mt-3 space-y-2.5">
                {M.coach.chips.map((c) => (
                  <li key={c.label}>
                    <button
                      className="w-full flex items-center gap-2.5 px-3.5 py-3 text-right transition-colors hover:bg-gray-50"
                      style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
                    >
                      <span className="flex-1 text-[10.5px] font-bold" style={{ color: T.ink }}>
                        {c.label}
                      </span>
                      <Icon name={c.icon} size={14} className="shrink-0" style={{ backgroundColor: T.primary }} />
                    </button>
                  </li>
                ))}
              </ul>

              <label
                className="mt-4 flex items-center gap-2.5 px-3 py-2.5"
                style={{ borderRadius: R.pill, border: `1px solid ${T.border}` }}
              >
                <button
                  aria-label="ارسال"
                  className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.sm, backgroundColor: T.primary }}
                >
                  <Icon name="lucide:send" size={14} style={{ backgroundColor: '#ffffff' }} />
                </button>
                <input
                  placeholder={M.coach.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-[11px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
