'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { verifyHero, verifyForm, verifyTrust, verifyFaq } from '@/data/verify';

/* ──────────────────────────────────────────────────────────────
   استعلام گواهینامه.

   One job: turn a code into a yes or a no. Everything else on the
   page — the trust strip, the FAQ — exists to answer the two
   questions someone asks before they trust the answer: «where do
   I find the code?» and «why should I believe this?»
────────────────────────────────────────────────────────────── */

export default function VerifyClient() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ backgroundColor: T.page }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#f6f4fd' }}>
        <Icon
          name="lucide:shield-check"
          size={280}
          className="absolute -top-10 right-[-40px] opacity-[0.05] pointer-events-none"
          style={{ backgroundColor: T.primary }}
        />

        <div className="relative max-w-[1120px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px] items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-[30px] sm:text-[36px] font-extrabold" style={{ color: T.ink }}>
                {verifyHero.title}
              </h1>
              <p className="mt-4 text-[13px]" style={{ color: T.ink }}>
                {verifyHero.desc}
              </p>

              <ul className="mt-8 flex items-start justify-center lg:justify-end gap-8 flex-wrap">
                {verifyHero.features.map((f, i) => (
                  <li
                    key={f.label}
                    className="flex items-center gap-2.5 pl-8"
                    style={{ borderInlineStart: i < verifyHero.features.length - 1 ? `1px solid #e2ddf5` : undefined }}
                  >
                    <span className="text-right">
                      <span className="block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                        {f.label}
                      </span>
                      <span className="mt-0.5 block text-[10px]" style={{ color: T.muted }}>
                        {f.sub}
                      </span>
                    </span>
                    <span
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ borderRadius: R.md, backgroundColor: '#ffffff' }}
                    >
                      <Icon name={f.icon} size={18} style={{ backgroundColor: T.primary }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <img src={verifyHero.art} alt="" className="w-full max-w-[280px] mx-auto object-contain" />
          </div>
        </div>
      </section>

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* ── The form ───────────────────────────────────────── */}
        <section
          className="bg-white p-6 sm:p-10"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <div className="text-center">
            <span
              className="mx-auto w-11 h-11 flex items-center justify-center"
              style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
            >
              <Icon name={verifyForm.icon} size={20} style={{ backgroundColor: T.primary }} />
            </span>
            <h2 className="mt-4 text-[19px] font-extrabold" style={{ color: T.ink }}>
              {verifyForm.title}
            </h2>
            <p className="mt-2 text-[12px]" style={{ color: T.muted }}>
              {verifyForm.desc}
            </p>
          </div>

          <div className="mt-8 relative grid gap-5 md:grid-cols-2">
            {/* QR panel declared first → right. */}
            <div className="p-6 text-center" style={{ borderRadius: R.md, backgroundColor: '#f8f6ff' }}>
              <h3 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
                {verifyForm.qr.title}
              </h3>

              <span className="mt-5 mx-auto flex items-center justify-center">
                <Icon name="lucide:scan-qr-code" size={92} style={{ backgroundColor: T.primary }} />
              </span>

              <button
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-[12px] font-bold bg-white"
                style={{ borderRadius: R.md, border: `1px solid #ddd6f5`, color: T.ink }}
              >
                {verifyForm.qr.cta}
                <Icon name={verifyForm.qr.icon} size={15} style={{ backgroundColor: T.primary }} />
              </button>
            </div>

            {/* «یا» divider — absolutely centred so it sits on the seam. */}
            <span
              className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center text-[11px] font-bold bg-white"
              style={{ borderRadius: R.pill, border: `1px solid ${T.border}`, color: T.muted }}
            >
              {verifyForm.divider}
            </span>

            <div className="p-6 text-center" style={{ borderRadius: R.md, backgroundColor: '#fafafd' }}>
              <h3 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
                {verifyForm.code.title}
              </h3>

              <label
                className="mt-5 flex items-center gap-3 px-3 py-3.5 bg-white"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ borderRadius: R.sm, borderInlineEnd: `1px solid ${T.border}` }}
                >
                  <Icon name={verifyForm.code.icon} size={16} style={{ backgroundColor: T.muted }} />
                </span>
                <input
                  placeholder={verifyForm.code.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-center text-[12px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>

              <p className="mt-4 text-[10px]" style={{ color: T.muted }}>
                {verifyForm.code.hint}
              </p>
            </div>
          </div>

          <button
            className="mt-8 mx-auto flex items-center justify-center gap-2.5 px-14 py-4 text-[14px] font-extrabold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: '#3a12c4' }}
          >
            {verifyForm.submit.label}
            <Icon name={verifyForm.submit.icon} size={17} style={{ backgroundColor: '#ffffff' }} />
          </button>
        </section>

        {/* ── Trust strip ────────────────────────────────────── */}
        <section
          className="bg-white p-6 sm:p-8"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <h2 className="flex items-center justify-center gap-3 text-[14px] font-extrabold" style={{ color: T.ink }}>
            <span className="w-6 h-px" style={{ backgroundColor: T.muted }} />
            {verifyTrust.title}
            <span className="w-6 h-px" style={{ backgroundColor: T.muted }} />
          </h2>

          <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {verifyTrust.items.map((t) => (
              <li key={t.label} className="text-center">
                <span
                  className="mx-auto w-12 h-12 flex items-center justify-center"
                  style={{ borderRadius: R.pill, backgroundColor: '#f4f2fd' }}
                >
                  <Icon name={t.icon} size={22} style={{ backgroundColor: T.primary }} />
                </span>
                <span className="mt-3 block text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                  {t.label}
                </span>
                <span className="mt-2 block text-[10.5px] leading-6" style={{ color: T.muted }}>
                  {t.desc}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ ────────────────────────────────────────────── */}
        <section>
          <h2 className="flex items-center justify-center gap-4 text-[15px] font-extrabold" style={{ color: T.ink }}>
            <span className="flex-1 h-px" style={{ backgroundColor: '#e7e5f3' }} />
            {verifyFaq.title}
            <span className="flex-1 h-px" style={{ backgroundColor: '#e7e5f3' }} />
          </h2>

          <ul className="mt-5 grid gap-3 lg:grid-cols-3">
            {verifyFaq.items.map((f, i) => {
              const on = open === i;
              return (
                <li
                  key={f.q}
                  className="bg-white p-4"
                  style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
                >
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    className="w-full flex items-center gap-2.5"
                  >
                    <Icon
                      name={on ? 'lucide:chevron-up' : 'lucide:chevron-down'}
                      size={14}
                      className="shrink-0"
                      style={{ backgroundColor: T.muted }}
                    />
                    <span className="flex-1 text-right text-[12px] font-extrabold" style={{ color: T.ink }}>
                      {f.q}
                    </span>
                    <span className="w-[3px] h-4 rounded-full shrink-0" style={{ backgroundColor: T.primary }} />
                  </button>

                  {on && (
                    <p
                      className="mt-3 p-3 text-right text-[10.5px] leading-7"
                      style={{ borderRadius: R.md, backgroundColor: '#faf9ff', color: T.muted }}
                    >
                      {f.a}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
