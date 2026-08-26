'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import { CERT_NAVY, CERT_GOLD } from '@/data/verify-result';
import ClassroomCrumbs from './ClassroomCrumbs';
import {
  certCrumbs,
  certHero,
  certArtwork,
  certValidate,
  certActions,
  certAchievements,
  certPath,
  certQuick,
} from '@/data/lms/course-certificate';

/* ──────────────────────────────────────────────────────────────
   گواهینامه دوره — the learner's own copy.

   Three columns: the validation code on the right, the artwork in
   the middle, download and share on the left. Below it, what the
   course actually taught and where to go next.
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

function Artwork() {
  return (
    <div className="p-3" style={{ borderRadius: LR.lg, backgroundColor: CERT_NAVY }}>
      <div
        className="relative px-6 py-8 text-center overflow-hidden"
        style={{
          borderRadius: '10px',
          backgroundColor: '#fdfbf6',
          border: `2px solid ${CERT_GOLD}`,
          outline: `1px solid ${CERT_GOLD}55`,
          outlineOffset: '4px',
        }}
      >
        {/* Corner flourishes, as drawn. */}
        <span
          className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
          style={{ background: `linear-gradient(225deg, ${CERT_GOLD}44, transparent 60%)` }}
          aria-hidden="true"
        />
        <span
          className="absolute bottom-0 left-0 w-28 h-28 pointer-events-none"
          style={{ background: `linear-gradient(45deg, ${CERT_NAVY}, transparent 62%)` }}
          aria-hidden="true"
        />

        <div className="relative">
          <p className="text-[26px] font-black tracking-tight" style={{ color: L.blue }}>
            {certArtwork.brandLatin}
          </p>
          <p className="mt-1 text-[8.5px]" style={{ color: L.violet }}>
            {certArtwork.brandTag}
          </p>

          <h3 className="mt-6 text-[19px] font-extrabold" style={{ color: CERT_NAVY }}>
            {certArtwork.title}
          </h3>
          <p className="mt-2.5 text-[11px]" style={{ color: '#5b6076' }}>
            {certArtwork.lead}
          </p>

          <p className="mt-4 text-[27px] font-extrabold" style={{ color: CERT_NAVY }}>
            {certArtwork.holder}
          </p>

          <p className="mt-3 text-[11px]" style={{ color: '#5b6076' }}>
            {certArtwork.mid}
          </p>
          <p className="mt-2 text-[16px] font-extrabold" style={{ color: CERT_NAVY }}>
            {certArtwork.course}
          </p>
          <p className="mt-3 text-[10.5px] leading-6" style={{ color: '#5b6076' }}>
            {certArtwork.tail.map((t) => (
              <React.Fragment key={t}>
                {t}
                <br />
              </React.Fragment>
            ))}
          </p>

          <div className="mt-8 flex items-end justify-between gap-4 flex-wrap">
            <span className="text-center">
              <span className="block text-[10px] font-bold" style={{ color: CERT_NAVY }}>
                {certArtwork.code}
              </span>
              <span className="block text-[8px]" style={{ color: '#5b6076' }}>
                {certArtwork.codeLabel}
              </span>
            </span>

            <span className="text-center">
              <Icon name="lucide:award" size={26} style={{ backgroundColor: CERT_GOLD }} />
              <span className="mt-1 block text-[8px]" style={{ color: '#5b6076' }}>
                {certArtwork.issuedLabel}
              </span>
              <span className="block text-[9.5px] font-bold" style={{ color: CERT_NAVY }}>
                {certArtwork.issued}
              </span>
            </span>

            <span className="text-center">
              <span
                className="block text-[16px] italic font-bold"
                style={{ color: L.blue, fontFamily: 'cursive' }}
              >
                امضا
              </span>
              <span className="mt-1 block w-24 h-px mx-auto" style={{ backgroundColor: '#c9ccda' }} />
              <span className="mt-1 block text-[10px] font-bold" style={{ color: CERT_NAVY }}>
                {certArtwork.signer}
              </span>
              <span className="block text-[8.5px]" style={{ color: '#5b6076' }}>
                {certArtwork.signerRole}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseCertificateClient() {
  return (
    <div style={{ backgroundColor: L.page }}>
      <ClassroomCrumbs crumbs={certCrumbs.items} back={certCrumbs.back} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5 space-y-4">
        {/* ── Congratulation strip ───────────────────────────── */}
        <section
          className="p-6"
          style={{ borderRadius: LR.lg, backgroundColor: '#f1faf5', border: '1px solid #d8f0e3' }}
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_150px] items-center">
            <div className="text-center lg:text-right order-2 lg:order-1">
              <h1 className="text-[20px] font-extrabold" style={{ color: L.navy }}>
                {certHero.emoji} {certHero.title}
              </h1>
              <p className="mt-2 text-[17px] font-extrabold" style={{ color: L.navy }}>
                {certHero.course}
              </p>

              <ul className="mt-5 flex items-start justify-center lg:justify-end gap-8 flex-wrap">
                {certHero.meta.map((m) => (
                  <li key={m.label} className="text-center">
                    <span className="flex items-center justify-center gap-1.5 text-[10px]" style={{ color: L.muted }}>
                      {m.label}
                      <Icon name={m.icon} size={12} style={{ backgroundColor: m.fg }} />
                    </span>
                    <span className="mt-1 block text-[12px] font-extrabold" style={{ color: L.navy }}>
                      {m.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <span className="order-1 lg:order-2 flex items-center justify-center">
              <Icon name="lucide:trophy" size={96} style={{ backgroundColor: '#f0b429' }} />
            </span>
          </div>
        </section>

        {/* ── Code (right) · artwork (centre) · actions (left) ─ */}
        <div className="grid gap-4 xl:grid-cols-[280px_1fr_280px] items-start">
          <div className="space-y-4">
            <Card>
              <h2 className="flex items-center justify-end gap-2 text-[13px] font-extrabold" style={{ color: L.navy }}>
                {certValidate.title}
                <Icon name={certValidate.icon} size={16} style={{ backgroundColor: L.blue }} />
              </h2>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px]" style={{ color: L.muted }}>
                {certValidate.codeLabel}
                <Icon name="lucide:badge-check" size={12} style={{ backgroundColor: L.blue }} />
              </p>
              <p className="mt-1.5 flex items-center justify-center gap-2">
                <button aria-label="کپی کد" className="shrink-0">
                  <Icon name="lucide:copy" size={14} style={{ backgroundColor: L.blue }} />
                </button>
                <span className="text-[15px] font-extrabold" style={{ color: L.navy }} dir="ltr">
                  {certValidate.code}
                </span>
              </p>

              <span
                className="mt-4 mx-auto block w-[120px] h-[120px]"
                style={{
                  backgroundColor: CERT_NAVY,
                  WebkitMaskImage: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)',
                  maskImage: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)',
                  WebkitMaskSize: '12px 12px',
                  maskSize: '12px 12px',
                }}
              />

              <p className="mt-4 text-center text-[10px] leading-6" style={{ color: L.muted }}>
                {certValidate.hint}
              </p>

              <Link
                href={certValidate.cta.href}
                className="mt-3.5 w-full flex items-center justify-center gap-2 py-3 text-[11.5px] font-bold"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
              >
                {certValidate.cta.label}
                <Icon name={certValidate.cta.icon} size={13} style={{ backgroundColor: L.blue }} />
              </Link>
            </Card>

            <Card>
              <h2 className="flex items-center justify-end gap-2.5 text-[13px] font-extrabold" style={{ color: L.navy }}>
                {certAchievements.title}
                <Icon name={certAchievements.icon} size={16} style={{ backgroundColor: L.blue }} />
              </h2>

              <ul className="mt-3.5 space-y-3">
                {certAchievements.items.map((a) => (
                  <li key={a} className="flex items-center gap-2.5">
                    <span className="flex-1 text-right text-[11px] font-bold" style={{ color: L.navy }}>
                      {a}
                    </span>
                    <Icon name="lucide:circle-check" size={15} className="shrink-0" style={{ backgroundColor: L.green }} />
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Artwork />

          <div className="space-y-3">
            <button
              className="w-full flex items-center justify-center gap-2 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: LR.md, backgroundColor: L.orange }}
            >
              {certActions.download.label}
              <Icon name={certActions.download.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
            </button>

            {certActions.share.map((sh) => (
              <button
                key={sh.label}
                className="w-full flex items-center justify-center gap-2 py-3 text-[11.5px] font-bold bg-white"
                style={{ borderRadius: LR.md, border: `1px solid ${L.border}`, color: L.blue }}
              >
                {sh.label}
                <Icon name={sh.icon} size={15} style={{ backgroundColor: sh.fg }} />
              </button>
            ))}

            <div className="p-4 text-center" style={{ borderRadius: LR.md, backgroundColor: L.violetSoft }}>
              <Icon name={certActions.note.icon} size={22} style={{ backgroundColor: L.violet }} />
              <span className="mt-2 block text-[12px] font-extrabold" style={{ color: L.navy }}>
                {certActions.note.title}
              </span>
              <span className="mt-2 block text-[10px] leading-6" style={{ color: L.muted }}>
                {certActions.note.desc}
              </span>
            </div>
          </div>
        </div>

        {/* ── Growth path ────────────────────────────────────── */}
        <Card>
          <h2 className="flex items-center justify-end gap-2.5 text-[14px] font-extrabold" style={{ color: L.navy }}>
            {certPath.title}
            <span
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{ borderRadius: LR.sm, backgroundColor: L.violetSoft }}
            >
              <Icon name={certPath.icon} size={16} style={{ backgroundColor: L.violet }} />
            </span>
          </h2>

          <ol className="mt-6 flex items-start justify-between gap-2 overflow-x-auto pb-2">
            {certPath.steps.map((s, i) => (
              <li key={s.label} className="flex items-start gap-2 shrink-0">
                {i > 0 && (
                  <Icon
                    name="lucide:arrow-left"
                    size={14}
                    className="mt-8"
                    style={{ backgroundColor: L.border }}
                  />
                )}
                <span className="w-[150px] text-center">
                  <span
                    className="mx-auto w-[62px] h-[62px] flex items-center justify-center"
                    style={{ borderRadius: '999px', backgroundColor: s.bg }}
                  >
                    <Icon name={s.icon} size={26} style={{ backgroundColor: s.fg }} />
                  </span>
                  <span className="mt-3 block text-[11px] font-extrabold" style={{ color: L.navy }}>
                    {s.badge}
                  </span>
                  <span className="mt-1 block text-[10px] leading-5" style={{ color: L.muted }}>
                    {s.label}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Card>

        {/* ── Quick access ───────────────────────────────────── */}
        <Card>
          <h2 className="text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
            {certQuick.title}
          </h2>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {certQuick.items.map((q) => (
              <li key={q.title} className="p-4" style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}>
                <div className="flex items-start gap-2.5">
                  <h3 className="flex-1 text-right text-[11.5px] font-extrabold leading-5" style={{ color: L.navy }}>
                    {q.title}
                  </h3>
                  <span
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ borderRadius: LR.md, backgroundColor: q.bg }}
                  >
                    <Icon name={q.icon} size={18} style={{ backgroundColor: q.fg }} />
                  </span>
                </div>

                <p className="mt-2.5 text-right text-[9.5px] leading-5" style={{ color: L.muted }}>
                  {q.desc}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
