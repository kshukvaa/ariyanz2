'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import {
  CERT_NAVY,
  CERT_GOLD,
  VERIFY_RED,
  VERIFY_GREEN,
  findCertificate,
  type CertificateRecord,
  resultValid,
  holderPanel,
  aboutCourse,
  security,
  resultNotFound,
} from '@/data/verify-result';

/* ──────────────────────────────────────────────────────────────
   نتیجه استعلام.

   The mockup sheet carries both outcomes; the page shows the one
   the code earns. See the header of verify-result.ts for why.
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

/* The certificate artwork itself, drawn rather than imaged so the
   holder's name and the course title stay real text. */
function CertificateArt({ certificate }: { certificate: CertificateRecord['certificate'] }) {
  return (
    <div className="p-3" style={{ borderRadius: R.lg, backgroundColor: CERT_NAVY }}>
      <div
        className="relative px-6 py-8 text-center overflow-hidden"
        style={{
          borderRadius: '10px',
          backgroundColor: '#fdfcf9',
          border: `2px solid ${CERT_GOLD}`,
          outline: `1px solid ${CERT_GOLD}55`,
          outlineOffset: '4px',
        }}
      >
        {/* Watermark. */}
        <span
          className="absolute inset-0 flex items-center justify-center text-[190px] font-black pointer-events-none select-none"
          style={{ color: '#0220480a' }}
          aria-hidden="true"
        >
          A
        </span>

        {/* Gold seal. */}
        <span
          className="absolute top-5 left-6 w-14 h-14 flex items-center justify-center"
          style={{
            borderRadius: '999px',
            background: `radial-gradient(circle at 35% 30%, #f0d79a, ${CERT_GOLD})`,
            boxShadow: `0 0 0 3px #fdfcf9, 0 0 0 5px ${CERT_GOLD}80`,
          }}
        >
          <Icon name="lucide:check" size={22} style={{ backgroundColor: '#fffdf6' }} />
        </span>

        <div className="relative">
          <p className="flex items-center justify-center gap-2">
            <span className="text-[22px] font-extrabold" style={{ color: CERT_NAVY }}>
              {certificate.brand}
            </span>
            <span
              className="w-9 h-9 flex items-center justify-center text-[19px] font-black"
              style={{ color: T.primary }}
            >
              A
            </span>
          </p>
          <p className="text-[11px] font-bold tracking-wide" style={{ color: CERT_NAVY }}>
            {certificate.brandLatin}
          </p>

          <h3 className="mt-6 text-[21px] font-extrabold" style={{ color: CERT_NAVY }}>
            {certificate.title}
          </h3>
          <p className="mt-3 text-[11px]" style={{ color: '#5b6076' }}>
            {certificate.lead}
          </p>

          <p className="mt-4 text-[26px] font-extrabold" style={{ color: CERT_NAVY }}>
            {certificate.holder}
          </p>

          <p className="mt-3 text-[11px]" style={{ color: '#5b6076' }}>
            {certificate.mid}
          </p>
          <p className="mt-2 text-[19px] font-extrabold" style={{ color: CERT_GOLD }}>
            {certificate.course}
          </p>
          <p className="mt-3 text-[11px]" style={{ color: '#5b6076' }}>
            {certificate.tail}
          </p>

          <div className="mt-8 flex items-end justify-between gap-4">
            <span className="text-center">
              <span
                className="block w-[62px] h-[62px]"
                style={{
                  backgroundColor: CERT_NAVY,
                  // A QR stand-in built from a repeating mask so the
                  // artwork reads as a code without shipping a fake one.
                  WebkitMaskImage:
                    'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)',
                  maskImage: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)',
                  WebkitMaskSize: '10px 10px',
                  maskSize: '10px 10px',
                }}
              />
              <span className="mt-1.5 block text-[7.5px]" style={{ color: '#5b6076' }}>
                {certificate.qrCaption}
              </span>
            </span>

            <span className="text-center">
              <span className="block text-[11px] font-bold" style={{ color: CERT_NAVY }}>
                {certificate.signer}
              </span>
              <span className="block text-[9px]" style={{ color: '#5b6076' }}>
                {certificate.signerRole}
              </span>
              <span
                className="mt-1 block text-[17px] italic font-bold"
                style={{ color: T.primary, fontFamily: 'cursive' }}
              >
                امضا
              </span>
            </span>
          </div>

          <span
            className="mt-6 mx-auto block w-24 h-px"
            style={{ backgroundColor: `${CERT_GOLD}99` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function VerifyResultClient({ code }: { code: string }) {
  const record = findCertificate(code);

  return (
    <div style={{ backgroundColor: '#f7f6fd' }}>
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 space-y-5">
        {record ? (
          <>
            {/* ── Verdict ────────────────────────────────────── */}
            <section className="grid gap-4 lg:grid-cols-[240px_1fr_240px] items-center">
              {/* Status badge declared first → right. */}
              <Card className="order-1">
                <div className="flex items-center gap-3">
                  <span
                    className="w-11 h-11 flex items-center justify-center shrink-0 order-2"
                    style={{ borderRadius: R.md, backgroundColor: '#e7f6ee' }}
                  >
                    <Icon name="lucide:shield-check" size={20} style={{ backgroundColor: VERIFY_GREEN }} />
                  </span>
                  <span className="flex-1 text-right order-1">
                    <span className="block text-[10.5px]" style={{ color: T.muted }}>
                      {resultValid.badgeTitle}
                    </span>
                    <span
                      className="mt-1 inline-block px-3 py-1 text-[12px] font-extrabold"
                      style={{ borderRadius: R.sm, backgroundColor: '#e7f6ee', color: VERIFY_GREEN }}
                    >
                      {resultValid.badge}
                    </span>
                  </span>
                </div>
              </Card>

              <div className="order-2 text-center">
                <span
                  className="mx-auto w-[68px] h-[68px] flex items-center justify-center"
                  style={{
                    borderRadius: '999px',
                    backgroundColor: VERIFY_GREEN,
                    boxShadow: `0 0 0 10px ${VERIFY_GREEN}1a`,
                  }}
                >
                  <Icon name="lucide:check" size={32} style={{ backgroundColor: '#ffffff' }} />
                </span>
                <h1 className="mt-5 text-[26px] font-extrabold" style={{ color: VERIFY_GREEN }}>
                  {resultValid.status}
                </h1>
                <p className="mt-2 text-[12.5px]" style={{ color: T.ink }}>
                  {resultValid.desc}
                </p>
              </div>

              <div className="order-3 flex justify-start">
                <Link
                  href="/verify"
                  className="flex items-center gap-2 px-5 py-3.5 text-[12px] font-bold bg-white"
                  style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                >
                  {resultValid.again.label}
                  <Icon name={resultValid.again.icon} size={15} style={{ backgroundColor: T.primary }} />
                </Link>
              </div>
            </section>

            {/* ── Fact strip ─────────────────────────────────── */}
            <Card className="!p-0">
              <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: resultValid.labels.status, value: resultValid.badge, dot: true },
                  { label: resultValid.labels.issuer, value: resultValid.issuer },
                  { label: resultValid.labels.issued, value: record.issued },
                  { label: resultValid.labels.code, value: record.code, copy: true },
                ].map((s, i, arr) => (
                  <li
                    key={s.label}
                    className="px-5 py-6 text-center"
                    style={{ borderInlineEnd: i < arr.length - 1 ? `1px solid ${T.border}` : undefined }}
                  >
                    <span className="block text-[11px]" style={{ color: T.muted }}>
                      {s.label}
                    </span>
                    <span
                      className="mt-2 flex items-center justify-center gap-1.5 text-[13px] font-extrabold"
                      style={{ color: s.dot ? VERIFY_GREEN : T.ink }}
                      dir={s.copy ? 'ltr' : undefined}
                    >
                      {s.copy && (
                        <Icon name="lucide:copy" size={13} style={{ backgroundColor: T.primary }} />
                      )}
                      {s.value}
                      {s.dot && (
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: VERIFY_GREEN }} />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* ── Certificate + holder ───────────────────────── */}
            <div className="grid gap-4 lg:grid-cols-[380px_1fr] items-start">
              {/* Holder panel declared first → right. */}
              <div className="space-y-4">
                <Card>
                  <h2 className="flex items-center justify-end gap-2 text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                    {holderPanel.title}
                    <span
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
                    >
                      <Icon name={holderPanel.icon} size={15} style={{ backgroundColor: T.primary }} />
                    </span>
                  </h2>

                  <ul className="mt-4">
                    {record.holderRows.map((r, i) => (
                      <li
                        key={r.label}
                        className="flex items-center gap-3 px-3 py-3"
                        style={{ borderRadius: R.sm, backgroundColor: i % 2 ? '#ffffff' : '#f8f7fd' }}
                      >
                        <span
                          className="flex-1 text-left text-[11.5px] font-bold"
                          style={{ color: T.ink }}
                          dir={r.ltr ? 'ltr' : undefined}
                        >
                          {r.value}
                        </span>
                        <span className="text-[11px] shrink-0" style={{ color: T.muted }}>
                          {r.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                    style={{ borderRadius: R.md, backgroundColor: T.primary }}
                  >
                    {holderPanel.download.label}
                    <Icon name={holderPanel.download.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
                  </button>

                  <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                    {holderPanel.actions.map((a) => (
                      <button
                        key={a.label}
                        className="flex items-center justify-center gap-1.5 py-3 text-[11px] font-bold"
                        style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.primary }}
                      >
                        {a.label}
                        <Icon name={a.icon} size={13} style={{ backgroundColor: T.primary }} />
                      </button>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h2 className="text-right text-[12px] font-bold" style={{ color: T.ink }}>
                    {holderPanel.linkTitle}
                  </h2>
                  <div
                    className="mt-3 flex items-center gap-2.5 px-3 py-3"
                    style={{ borderRadius: R.md, backgroundColor: '#f8f7fd' }}
                  >
                    <button aria-label="کپی لینک" className="shrink-0">
                      <Icon name="lucide:copy" size={16} style={{ backgroundColor: T.primary }} />
                    </button>
                    <span className="flex-1 min-w-0 text-[10.5px] truncate" style={{ color: T.primary }} dir="ltr">
                      {`https://ariyaz.com/verify/${record.code}`}
                    </span>
                  </div>
                </Card>
              </div>

              <CertificateArt certificate={record.certificate} />
            </div>

            {/* ── About the course ───────────────────────────── */}
            <Card>
              <h2 className="text-center text-[15px] font-extrabold" style={{ color: T.ink }}>
                {aboutCourse.title}
              </h2>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_220px] items-center">
                <div>
                  <ul className="grid sm:grid-cols-3">
                    {record.course.meta.map((m, i) => (
                      <li
                        key={m.label}
                        className="px-4 py-2 text-center"
                        style={{ borderInlineEnd: i < record.course.meta.length - 1 ? `1px solid ${T.border}` : undefined }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-[12px] font-bold" style={{ color: T.ink }}>
                            {m.label}
                          </span>
                          <span
                            className="w-9 h-9 flex items-center justify-center"
                            style={{ borderRadius: R.md, backgroundColor: `${m.fg}14` }}
                          >
                            <Icon name={m.icon} size={17} style={{ backgroundColor: m.fg }} />
                          </span>
                        </span>
                        <span className="mt-1.5 block text-[11px]" style={{ color: T.muted }}>
                          {m.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className="mt-5 pt-5 text-right text-[12px] leading-8"
                    style={{ color: T.ink, borderTop: `1px solid ${T.border}` }}
                  >
                    {record.course.body}
                  </p>
                </div>

                <img src={aboutCourse.art} alt="" className="w-full max-w-[200px] mx-auto object-contain" />
              </div>
            </Card>

            {/* ── Security strip ─────────────────────────────── */}
            <section
              className="p-6"
              style={{ borderRadius: R.lg, backgroundColor: '#f2fbf6', border: `1px solid #d8f0e3` }}
            >
              <h2 className="flex items-center justify-center gap-2.5 text-[15px] font-extrabold" style={{ color: T.ink }}>
                {security.title}
                <span
                  className="w-9 h-9 flex items-center justify-center bg-white"
                  style={{ borderRadius: R.md }}
                >
                  <Icon name={security.icon} size={17} style={{ backgroundColor: VERIFY_GREEN }} />
                </span>
              </h2>

              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {security.items.map((s, i) => (
                  <li
                    key={s.label}
                    className="px-4 text-center"
                    style={{ borderInlineEnd: i < security.items.length - 1 ? `1px solid #d8f0e3` : undefined }}
                  >
                    <span
                      className="mx-auto w-11 h-11 flex items-center justify-center bg-white"
                      style={{ borderRadius: '999px' }}
                    >
                      <Icon name={s.icon} size={19} style={{ backgroundColor: s.fg }} />
                    </span>
                    <span className="mt-3 block text-[12px] font-extrabold" style={{ color: T.ink }}>
                      {s.label}
                    </span>
                    <span className="mt-2 block text-[10.5px] leading-6" style={{ color: T.muted }}>
                      {s.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          /* ── Not-found state ──────────────────────────────── */
          <section
            className="p-6 sm:p-8"
            style={{ borderRadius: R.lg, backgroundColor: '#fdf2f3', border: `1px solid #f8dcdf` }}
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_360px] items-center">
              {/* Message declared first → right. */}
              <div className="flex items-start gap-5 flex-wrap">
                <div className="flex-1 min-w-[240px] text-right order-1">
                  <h1 className="text-[20px] font-extrabold" style={{ color: VERIFY_RED }}>
                    {resultNotFound.title}
                  </h1>
                  <p className="mt-3 text-[12px] font-bold" style={{ color: T.ink }}>
                    {resultNotFound.lead}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {resultNotFound.checks.map((c) => (
                      <li key={c} className="flex items-center gap-2 justify-end text-[11.5px]" style={{ color: T.ink }}>
                        {c}
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: VERIFY_RED }} />
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/verify"
                    className="mt-5 inline-flex items-center gap-2 px-5 py-3 text-[12px] font-bold bg-white"
                    style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
                  >
                    {resultNotFound.again.label}
                    <Icon name={resultNotFound.again.icon} size={14} style={{ backgroundColor: T.primary }} />
                  </Link>
                </div>

                <span
                  className="w-[72px] h-[72px] flex items-center justify-center shrink-0 order-2"
                  style={{
                    borderRadius: '999px',
                    backgroundColor: VERIFY_RED,
                    boxShadow: `0 0 0 10px ${VERIFY_RED}1a`,
                  }}
                >
                  <Icon name="lucide:circle-alert" size={34} style={{ backgroundColor: '#ffffff' }} />
                </span>
              </div>

              <div className="bg-white p-5" style={{ borderRadius: R.lg }}>
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0 text-right">
                    <h2 className="text-[13.5px] font-extrabold" style={{ color: T.ink }}>
                      {resultNotFound.support.title}
                    </h2>
                    <p className="mt-2 text-[11px] leading-6" style={{ color: T.muted }}>
                      {resultNotFound.support.desc}
                    </p>
                  </div>
                  <Icon
                    name={resultNotFound.support.icon}
                    size={40}
                    className="shrink-0"
                    style={{ backgroundColor: T.primary }}
                  />
                </div>

                <button
                  className="mt-4 flex items-center gap-2 px-6 py-3 text-[12px] font-extrabold text-white transition-opacity hover:opacity-90"
                  style={{ borderRadius: R.sm, backgroundColor: VERIFY_RED }}
                >
                  {resultNotFound.support.cta}
                  <Icon name="lucide:phone-call" size={14} style={{ backgroundColor: '#ffffff' }} />
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
