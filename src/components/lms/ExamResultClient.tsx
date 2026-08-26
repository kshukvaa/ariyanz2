'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import ClassroomCrumbs from './ClassroomCrumbs';
import { Ring } from './LmsParts';
import {
  resultCrumbs,
  resultHero,
  resultFacts,
  resultBreakdown,
  resultAnalysis,
  resultReview,
  resultDetails,
  resultCertificate,
  resultRating,
  resultSuggest,
  resultPath,
} from '@/data/lms/exam-result';

/* ──────────────────────────────────────────────────────────────
   نتیجه آزمون.

   The page answers three questions in order: did I pass, where
   did I lose marks, and what should I do next. RTL declares the
   right column first throughout.
────────────────────────────────────────────────────────────── */

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-4 sm:p-5 ${className}`}
      style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
    >
      {children}
    </section>
  );
}

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="lucide:star"
          size={size}
          style={{ backgroundColor: i < n ? L.amber : L.border }}
        />
      ))}
    </span>
  );
}

export default function ExamResultClient() {
  return (
    <div style={{ backgroundColor: L.page }}>
      <ClassroomCrumbs crumbs={resultCrumbs.items} back={resultCrumbs.back} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5 space-y-4">
        {/* ── Verdict ────────────────────────────────────────── */}
        <Card>
          <div className="grid gap-6 lg:grid-cols-[180px_1fr_180px] items-center">
            {/* Ring first → right. */}
            <div className="flex justify-center">
              <Ring pct={resultHero.pct} size={124} stroke={13} colour={L.green} />
            </div>

            <div className="text-center">
              <h1 className="text-[22px] font-extrabold" style={{ color: L.navy }}>
                {resultHero.emoji} {resultHero.title}
              </h1>
              <p className="mt-2 text-[13px] font-bold" style={{ color: L.navy }}>
                {resultHero.subtitle}
              </p>
            </div>

            <div className="text-center">
              <span className="block">
                <Stars n={resultHero.stars} size={18} />
              </span>
              <span
                className="mt-2 mx-auto w-[62px] h-[62px] flex items-center justify-center"
                style={{ borderRadius: '999px', backgroundColor: L.blue }}
              >
                <Icon name="lucide:check" size={28} style={{ backgroundColor: '#ffffff' }} />
              </span>
            </div>
          </div>

          <ul className="mt-6 pt-5 grid sm:grid-cols-3 lg:grid-cols-5" style={{ borderTop: `1px solid ${L.border}` }}>
            {resultFacts.map((f, i) => (
              <li
                key={f.label}
                className="px-4 py-2 text-center"
                style={{ borderInlineEnd: i < resultFacts.length - 1 ? `1px solid ${L.border}` : undefined }}
              >
                <span className="flex items-center justify-center gap-1.5 text-[11px]" style={{ color: L.muted }}>
                  {f.label}
                  {f.icon && <Icon name={f.icon} size={13} style={{ backgroundColor: f.fg }} />}
                </span>
                <span
                  className={`mt-1.5 flex items-center justify-center gap-1.5 font-extrabold ${f.big ? 'text-[22px]' : 'text-[12.5px]'}`}
                  style={{ color: f.big || f.ok ? f.fg : L.navy }}
                >
                  {f.value}
                  {f.ok && <Icon name="lucide:circle-check" size={13} style={{ backgroundColor: L.green }} />}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* ── Breakdown (right) + analysis (left) ────────────── */}
        <div className="grid gap-4 xl:grid-cols-[420px_1fr] items-start">
          <Card>
            <h2 className="text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
              {resultBreakdown.title}
            </h2>

            <ul className="mt-4 space-y-3">
              {resultBreakdown.rows.map((r) => (
                <li key={r.topic} className="flex items-center gap-3">
                  <span className="w-16 text-left text-[10px]" style={{ color: L.muted }}>
                    {r.topic}
                  </span>
                  <span className="w-12 text-[10.5px] font-bold shrink-0" style={{ color: r.fg }}>
                    {r.verdict}
                  </span>
                  <span className="flex-1 h-2 rounded-full" style={{ backgroundColor: L.border }}>
                    <span
                      className="block h-2 rounded-full"
                      style={{ width: `${r.pct}%`, backgroundColor: r.fg }}
                    />
                  </span>
                  <span className="w-9 text-[10px] font-bold shrink-0" style={{ color: r.fg }}>
                    {r.pct}٪
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-start gap-3">
              <div className="flex-1 text-right min-w-0">
                <h2 className="text-[14px] font-extrabold" style={{ color: L.navy }}>
                  {resultAnalysis.title}
                </h2>
                <p className="mt-2 text-[11.5px] leading-7" style={{ color: L.navy }}>
                  {resultAnalysis.body.map((b) => (
                    <React.Fragment key={b}>
                      {b}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
              <span
                className="w-11 h-11 flex items-center justify-center shrink-0"
                style={{ borderRadius: LR.md, backgroundColor: L.violetSoft }}
              >
                <Icon name="lucide:bot" size={20} style={{ backgroundColor: L.violet }} />
              </span>
            </div>

            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {resultAnalysis.cards.map((c) => (
                <li key={c.id} className="p-4" style={{ borderRadius: LR.md, backgroundColor: c.bg }}>
                  <h3 className="flex items-center justify-end gap-2 text-[12px] font-extrabold" style={{ color: c.fg }}>
                    {c.title}
                    <Icon name={c.icon} size={15} style={{ backgroundColor: c.fg }} />
                  </h3>

                  {c.level ? (
                    <div className="mt-3 text-center">
                      <span className="block text-[15px] font-extrabold" style={{ color: L.navy }}>
                        {c.level}
                      </span>
                      <span className="mt-1.5 block">
                        <Stars n={c.stars ?? 0} />
                      </span>
                      <span className="mt-1.5 block text-[10px]" style={{ color: c.fg }}>
                        {c.note}
                      </span>
                    </div>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {c.items?.map((it) => (
                        <li key={it} className="flex items-center gap-2">
                          <span className="flex-1 text-right text-[10.5px] font-bold" style={{ color: L.navy }}>
                            {it}
                          </span>
                          <Icon name="lucide:circle-check" size={13} className="shrink-0" style={{ backgroundColor: c.fg }} />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* ── Details rail (right) + review (left) ───────────── */}
        <div className="grid gap-4 xl:grid-cols-[300px_1fr] items-start">
          <div className="space-y-4">
            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {resultDetails.title}
              </h2>
              <ul className="mt-3.5 space-y-3">
                {resultDetails.rows.map((r) => (
                  <li key={r.label} className="flex items-center gap-2">
                    <span className="flex-1 text-left text-[11px] font-bold" style={{ color: L.navy }}>
                      {r.value}
                    </span>
                    <span className="text-[11px]" style={{ color: L.muted }}>
                      {r.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: L.navy }}>
                {resultCertificate.title}
                <Icon name={resultCertificate.icon} size={15} style={{ backgroundColor: L.blue }} />
              </h2>

              <div className="mt-3.5 flex items-start gap-3">
                <div className="flex-1 text-right min-w-0">
                  <p className="text-[10.5px]" style={{ color: L.muted }}>
                    {resultCertificate.progress}
                  </p>
                  <p className="mt-2 text-[10.5px] leading-6" style={{ color: L.navy }}>
                    {resultCertificate.note}
                  </p>
                </div>
                <span
                  className="w-16 h-20 shrink-0 flex items-center justify-center"
                  style={{ borderRadius: LR.sm, backgroundColor: '#faf6ea', border: '1px solid #e8dcc0' }}
                >
                  <Icon name="lucide:award" size={26} style={{ backgroundColor: '#cfa855' }} />
                </span>
              </div>

              <Link
                href={resultCertificate.cta.href}
                className="mt-3.5 w-full flex items-center justify-center gap-2 py-2.5 text-[11.5px] font-bold"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
              >
                {resultCertificate.cta.label}
                <Icon name={resultCertificate.cta.icon} size={13} style={{ backgroundColor: L.blue }} />
              </Link>
            </Card>

            <Card>
              <h2 className="text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                {resultRating.title}
              </h2>
              <p className="mt-3 text-center">
                <Stars n={resultRating.stars} size={22} />
              </p>
              <textarea
                rows={3}
                placeholder={resultRating.placeholder}
                className="mt-3 w-full px-3 py-2.5 text-right text-[11px] outline-none resize-none placeholder:text-[#9396b0]"
                style={{ borderRadius: LR.md, border: `1px solid ${L.border}`, color: L.ink }}
              />
              <button
                className="mt-2.5 w-full py-3 text-[12px] font-extrabold text-white"
                style={{ borderRadius: LR.md, backgroundColor: L.blue }}
              >
                {resultRating.submit}
              </button>
            </Card>
          </div>

          <Card>
            <header className="flex items-center gap-3 flex-wrap">
              <button
                className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
              >
                {resultReview.all.label}
                <Icon name={resultReview.all.icon} size={13} style={{ backgroundColor: L.blue }} />
              </button>
              <h2 className="flex-1 text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
                {resultReview.title}
              </h2>
            </header>

            <div className="mt-4 grid gap-4 lg:grid-cols-2 items-start">
              {/* Wrong-answer card declared first → right. */}
              <div className="p-4" style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}>
                <h3 className="text-right text-[12px] font-extrabold leading-6" style={{ color: L.navy }}>
                  {resultReview.wrong.question}
                </h3>

                <p className="mt-3 flex items-center justify-end gap-2">
                  <span
                    className="px-3 py-1 text-[10.5px] font-bold"
                    style={{ borderRadius: LR.sm, backgroundColor: L.redSoft, color: L.red }}
                  >
                    {resultReview.wrong.yours.value}
                  </span>
                  <span className="text-[10.5px]" style={{ color: L.muted }}>
                    {resultReview.wrong.yours.label}
                  </span>
                  <Icon name="lucide:circle-alert" size={14} style={{ backgroundColor: L.red }} />
                </p>

                <p className="mt-2 flex items-center justify-end gap-2">
                  <span
                    className="px-3 py-1 text-[10.5px] font-bold"
                    style={{ borderRadius: LR.sm, backgroundColor: L.greenSoft, color: L.green }}
                  >
                    {resultReview.wrong.correct.value}
                  </span>
                  <span className="text-[10.5px]" style={{ color: L.muted }}>
                    {resultReview.wrong.correct.label}
                  </span>
                  <Icon name="lucide:circle-check" size={14} style={{ backgroundColor: L.green }} />
                </p>

                <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${L.border}` }}>
                  <span className="block text-right text-[10.5px] font-bold" style={{ color: L.navy }}>
                    {resultReview.wrong.explainLabel}
                  </span>
                  <p className="mt-1.5 text-right text-[10.5px] leading-6" style={{ color: L.muted }}>
                    {resultReview.wrong.explain}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {resultReview.table.cols.map((c) => (
                        <th
                          key={c}
                          className="px-2 py-3 text-[10.5px] font-bold"
                          style={{ color: L.navy, borderBottom: `1px solid ${L.border}` }}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resultReview.table.rows.map((r) => (
                      <tr key={r.n}>
                        <td
                          className="px-2 py-3 text-[11px] font-bold"
                          style={{ color: r.ok ? L.green : L.red, borderBottom: `1px solid ${L.border}` }}
                        >
                          {r.score}
                        </td>
                        <td
                          className="px-2 py-3 text-[11px] font-bold"
                          style={{ color: L.navy, borderBottom: `1px solid ${L.border}` }}
                        >
                          {r.correct}
                        </td>
                        <td
                          className="px-2 py-3 text-[11px] font-bold"
                          style={{ color: r.ok ? L.navy : L.red, borderBottom: `1px solid ${L.border}` }}
                        >
                          {r.yours}
                        </td>
                        <td className="px-2 py-3" style={{ borderBottom: `1px solid ${L.border}` }}>
                          <span className="flex items-center justify-center gap-1.5 text-[11px]" style={{ color: L.muted }}>
                            {r.n}
                            <Icon
                              name={r.ok ? 'lucide:circle-check' : 'lucide:circle-alert'}
                              size={14}
                              style={{ backgroundColor: r.ok ? L.green : L.red }}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Suggestions ────────────────────────────────────── */}
        <Card>
          <h2 className="text-center text-[15px] font-extrabold" style={{ color: L.navy }}>
            {resultSuggest.title}
          </h2>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {resultSuggest.items.map((s) => (
              <li key={s.title} className="p-4" style={{ borderRadius: LR.md, backgroundColor: `${s.fg}0a` }}>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[11px] font-extrabold" style={{ color: s.fg }}>
                    {s.badge}
                  </span>
                  <Icon name={s.icon} size={16} style={{ backgroundColor: s.fg }} />
                </div>

                <h3 className="mt-2.5 text-center text-[12px] font-extrabold" style={{ color: L.navy }}>
                  {s.title}
                </h3>
                <p className="mt-1.5 text-center text-[9.5px] leading-5" style={{ color: L.muted }}>
                  {s.desc}
                </p>

                <button
                  className="mt-3 w-full py-2.5 text-[10.5px] font-bold bg-white"
                  style={{ borderRadius: LR.sm, border: `1px solid ${s.fg}66`, color: s.fg }}
                >
                  {s.cta}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* ── Learning path ──────────────────────────────────── */}
        <Card>
          <div className="grid gap-4 lg:grid-cols-[1fr_360px] items-center">
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex-1 min-w-[200px] text-right">
                <h2 className="text-[14px] font-extrabold" style={{ color: L.navy }}>
                  {resultPath.title}
                </h2>
                <p className="mt-2 text-[13px] font-extrabold" style={{ color: L.navy }}>
                  {resultPath.next}
                </p>
                <p className="mt-2 flex items-center justify-end gap-1.5 text-[10.5px]" style={{ color: L.muted }}>
                  {resultPath.duration}
                  <Icon name="lucide:clock" size={12} style={{ backgroundColor: L.muted }} />
                </p>
                <button
                  className="mt-3 px-7 py-3 text-[12px] font-extrabold text-white"
                  style={{ borderRadius: LR.md, backgroundColor: L.blue }}
                >
                  {resultPath.cta}
                </button>
              </div>

              <img
                src={resultPath.art}
                alt=""
                className="w-[180px] h-[120px] object-cover shrink-0"
                style={{ borderRadius: LR.md }}
              />
            </div>

            <div className="p-4 text-center" style={{ borderRadius: LR.md, backgroundColor: L.violetSoft }}>
              <h3 className="text-[12.5px] font-extrabold" style={{ color: L.navy }}>
                {resultPath.agent.title}
              </h3>
              <p className="mt-2 text-[10.5px] leading-6" style={{ color: L.muted }}>
                {resultPath.agent.desc}
              </p>
              <button
                className="mt-3 mx-auto flex items-center gap-1.5 px-5 py-2.5 text-[11px] font-bold bg-white"
                style={{ borderRadius: LR.md, color: L.violet }}
              >
                {resultPath.agent.cta.label}
                <Icon name={resultPath.agent.cta.icon} size={13} style={{ backgroundColor: L.violet }} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
