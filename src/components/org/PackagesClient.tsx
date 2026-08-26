'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { packagesHead, packages, packageDetail } from '@/data/orgPackages';

/* ──────────────────────────────────────────────────────────────
   Assessment packages — a dialog laid over the assessments list.

   It opens as a route rather than local state so the picker can be
   linked to from the wizard's shortcut strip and from the list
   header, and dismissing it simply returns to the list underneath.
────────────────────────────────────────────────────────────── */

export default function PackagesClient() {
  const router = useRouter();
  const [detail, setDetail] = useState<string | null>(null);
  const close = () => router.push('/org/assessments');

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <button
        aria-label="بستن"
        onClick={close}
        className="fixed inset-0 bg-black/45"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={detail ? packageDetail.title : packagesHead.title}
        className="relative w-full max-w-[1040px] bg-white my-auto"
        style={{ borderRadius: R.lg }}
      >
        {detail ? (
          <Detail onBack={() => setDetail(null)} onClose={close} />
        ) : (
          <Picker onOpen={setDetail} onClose={close} />
        )}
      </div>
    </div>
  );
}

/* ── Screen 9 ─────────────────────────────────────────────────── */

function Picker({
  onOpen,
  onClose,
}: {
  onOpen: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      <header className="flex items-start gap-4 p-6">
        <button
          aria-label="بستن"
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center shrink-0 transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:x" size={17} style={{ backgroundColor: T.ink }} />
        </button>

        <div className="flex-1 text-right">
          <div className="flex items-center justify-end gap-2.5">
            <h2 className="text-[19px] font-extrabold" style={{ color: T.ink }}>
              {packagesHead.title}
            </h2>
            <Icon name="lucide:package-open" size={22} style={{ backgroundColor: T.primary }} />
          </div>
          <p className="mt-1 text-[12px]" style={{ color: T.muted }}>
            {packagesHead.desc}
          </p>
        </div>
      </header>

      <div className="px-6" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-6 justify-center">
          {packagesHead.tabs.map((t, i) => (
            <button
              key={t.id}
              className="relative pb-3 text-[13px]"
              style={{ color: i === 0 ? T.primary : T.muted, fontWeight: i === 0 ? 800 : 600 }}
            >
              {t.label}
              {i === 0 && (
                <span
                  className="absolute -bottom-px inset-x-0 h-[2.5px] rounded-full"
                  style={{ backgroundColor: T.primary }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <label
            className="flex items-center gap-2.5 px-3.5 py-2.5 min-w-[220px]"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
          >
            <Icon name="lucide:search" size={16} style={{ backgroundColor: T.muted }} />
            <input
              type="search"
              placeholder={packagesHead.search}
              className="flex-1 min-w-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#9396b0]"
              style={{ color: T.ink }}
            />
          </label>

          <div className="flex-1" />

          <button
            className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] font-semibold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: T.muted }} />
            {packagesHead.filter}
            <Icon name="lucide:funnel" size={15} style={{ backgroundColor: T.muted }} />
          </button>
        </div>

        {packages.map((p) => (
          <article
            key={p.id}
            className="flex items-stretch gap-4 p-4 flex-wrap"
            style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
          >
            <div className="flex flex-col gap-2.5 w-[215px] shrink-0 max-lg:order-3 max-lg:w-full">
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderRadius: R.md, backgroundColor: p.artBg }}
              >
                <span className="flex-1 text-right">
                  <span className="block text-[14px] font-extrabold" style={{ color: T.ink }}>
                    {p.tests}
                  </span>
                  <span className="block text-[10.5px]" style={{ color: T.muted }}>
                    {packagesHead.countLabel}
                  </span>
                </span>
                <Icon name="lucide:clipboard-check" size={20} style={{ backgroundColor: p.artFg }} />
              </div>

              <button
                data-ripple
                className="flex items-center justify-center gap-2 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: p.cta }}
              >
                <Icon name="lucide:arrow-left" size={15} className="text-white" />
                {packagesHead.use}
              </button>
            </div>

            <div className="flex-1 min-w-[220px] text-right max-lg:order-2">
              <h3 className="text-[16px] font-extrabold" style={{ color: T.ink }}>
                {p.title}
              </h3>
              <p className="mt-1.5 text-[12px] leading-6" style={{ color: T.muted }}>
                {p.desc}
              </p>

              <div className="mt-3 flex items-center justify-end gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-[11px] font-semibold"
                    style={{ borderRadius: R.pill, backgroundColor: '#f4f4f8', color: T.ink }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onOpen(p.id)}
                className="mt-3 flex items-center gap-1.5 text-[12px] font-bold transition-opacity hover:opacity-70"
                style={{ color: T.primary }}
              >
                <Icon name="lucide:chevron-left" size={14} style={{ backgroundColor: T.primary }} />
                {packagesHead.detail}
              </button>
            </div>

            <span
              className="w-[190px] shrink-0 flex items-center justify-center max-lg:order-1 max-lg:w-full max-lg:py-6"
              style={{ borderRadius: R.md, backgroundColor: p.artBg }}
            >
              <img src={p.art} alt="" className="w-[86px] h-[86px] object-contain" />
            </span>
          </article>
        ))}

        <button
          className="w-full flex flex-col items-center gap-1.5 py-7 transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.lg, border: `1.5px dashed #cdd0e0` }}
        >
          <span className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ border: `1.5px solid ${T.primary}` }}
            >
              <Icon name="lucide:plus" size={16} style={{ backgroundColor: T.primary }} />
            </span>
            <span className="text-[14px] font-extrabold" style={{ color: T.primary }}>
              {packagesHead.build.title}
            </span>
          </span>
          <span className="text-[11.5px]" style={{ color: T.muted }}>
            {packagesHead.build.desc}
          </span>
        </button>
      </div>
    </>
  );
}

/* ── Screen 10 ────────────────────────────────────────────────── */

function Detail({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  const p = packages[0];

  return (
    <>
      <header className="flex items-start gap-4 p-6">
        <button
          aria-label="بازگشت"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center shrink-0 transition-colors hover:bg-gray-50"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
        >
          <Icon name="lucide:x" size={17} style={{ backgroundColor: T.ink }} />
        </button>

        <div className="flex-1 text-right">
          <div className="flex items-center justify-end gap-2.5">
            <h2 className="text-[19px] font-extrabold" style={{ color: T.ink }}>
              {packageDetail.title}
            </h2>
            <Icon name="lucide:package-open" size={22} style={{ backgroundColor: T.primary }} />
          </div>
          <p className="mt-1 text-[12px]" style={{ color: T.muted }}>
            {packageDetail.desc}
          </p>
        </div>
      </header>

      <div className="px-6 pb-6 grid gap-4 lg:grid-cols-[1fr_255px] items-start">
        {/* Right column in RTL: the package's own summary and its tests. */}
        <div className="space-y-4 min-w-0">
          <div className="p-5" style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            <div className="flex items-start gap-4 flex-wrap">
              <span
                className="flex items-center gap-3 px-4 py-3 shrink-0"
                style={{ borderRadius: R.md, backgroundColor: T.tintPurple }}
              >
                <span className="text-right">
                  <span className="block text-[14px] font-extrabold" style={{ color: T.primary }}>
                    {p.tests}
                  </span>
                  <span className="block text-[10.5px]" style={{ color: T.muted }}>
                    {packageDetail.testsLabel}
                  </span>
                </span>
                <Icon name="lucide:clipboard-check" size={20} style={{ backgroundColor: T.primary }} />
              </span>

              <div className="flex-1 min-w-[200px] text-right">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold"
                  style={{ borderRadius: R.pill, backgroundColor: T.tintGreen, color: T.successStrong }}
                >
                  <Icon name="lucide:badge-check" size={13} style={{ backgroundColor: T.successStrong }} />
                  {packageDetail.badge}
                </span>
                <h3 className="mt-2.5 text-[20px] font-extrabold" style={{ color: T.ink }}>
                  {p.title}
                </h3>
                <div className="mt-2.5 flex items-center justify-end gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-[11px] font-semibold"
                      style={{ borderRadius: R.pill, backgroundColor: '#f4f4f8', color: T.ink }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${T.border}` }}>
              <div className="flex items-center justify-end gap-2">
                <h4 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
                  {packageDetail.aboutTitle}
                </h4>
                <Icon name="lucide:circle-alert" size={16} style={{ backgroundColor: T.primary }} />
              </div>
              <p className="mt-2 text-right text-[12px] leading-7" style={{ color: T.muted }}>
                {packageDetail.about}
              </p>
            </div>
          </div>

          <div style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-between p-4">
              <span className="text-[13px] font-extrabold" style={{ color: T.primary }}>
                {p.tests}
              </span>
              <h4 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
                {packageDetail.listTitle}
              </h4>
            </div>

            {packageDetail.tests.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 p-4 flex-wrap"
                style={{ borderTop: `1px solid ${T.border}` }}
              >
                <dl className="flex items-center gap-5 shrink-0 max-sm:order-3">
                  <div className="text-right">
                    <dt className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
                      <Icon name="lucide:list" size={12} style={{ backgroundColor: T.muted }} />
                      {packageDetail.meta.questions}
                    </dt>
                    <dd className="mt-0.5 text-[12px] font-bold" style={{ color: T.ink }}>
                      {t.questions}
                    </dd>
                  </div>
                  <div className="text-right">
                    <dt className="flex items-center gap-1.5 text-[10.5px]" style={{ color: T.muted }}>
                      <Icon name="lucide:clock" size={12} style={{ backgroundColor: T.muted }} />
                      {packageDetail.meta.time}
                    </dt>
                    <dd className="mt-0.5 text-[12px] font-bold" style={{ color: T.ink }}>
                      {t.time}
                    </dd>
                  </div>
                </dl>

                <Icon name="lucide:chevron-left" size={15} style={{ backgroundColor: T.muted }} />

                <div className="flex-1 min-w-[180px] text-right max-sm:order-2">
                  <h5 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {t.title}
                  </h5>
                  <p className="mt-0.5 text-[11px]" style={{ color: T.muted }}>
                    {t.desc}
                  </p>
                </div>

                <img src={t.icon} alt="" className="w-12 h-12 object-contain shrink-0 max-sm:order-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Left column: the fixed spec sheet. */}
        <aside
          className="p-4 space-y-3"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <span
            className="flex items-center justify-center py-7"
            style={{ borderRadius: R.md, backgroundColor: p.artBg }}
          >
            <img src={p.art} alt="" className="w-[92px] h-[92px] object-contain" />
          </span>

          <div className="text-center">
            <h3 className="text-[15px] font-extrabold" style={{ color: T.ink }}>
              {p.title}
            </h3>
            <p className="mt-1.5 text-[11px] leading-6" style={{ color: T.muted }}>
              {p.desc}
            </p>
          </div>

          <dl className="space-y-0">
            {packageDetail.spec.map((s, i) => (
              <div
                key={s.k}
                className="flex items-start gap-2.5 py-2.5"
                style={{ borderTop: i === 0 ? undefined : `1px solid ${T.border}` }}
              >
                <span className="flex-1 text-right">
                  <dt className="text-[11px]" style={{ color: T.muted }}>
                    {s.k}
                  </dt>
                  <dd className="mt-0.5 text-[12px] font-bold" style={{ color: T.ink }}>
                    {s.v}
                  </dd>
                </span>
                <Icon name={s.icon} size={16} style={{ backgroundColor: T.primary }} />
              </div>
            ))}
          </dl>

          <p
            className="flex items-start gap-2 p-3 text-right text-[11px] leading-6"
            style={{ borderRadius: R.md, backgroundColor: T.tintPurple, color: T.ink }}
          >
            {packageDetail.note}
            <Icon name="lucide:lightbulb" size={15} style={{ backgroundColor: T.primary }} />
          </p>
        </aside>
      </div>

      <footer
        className="flex items-center gap-2.5 p-5 flex-wrap justify-between"
        style={{ borderTop: `1px solid ${T.border}` }}
      >
        <button
          className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold"
          style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
        >
          <Icon name="lucide:download" size={16} style={{ backgroundColor: T.muted }} />
          {packageDetail.actions.download}
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            data-ripple
            className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: T.primaryStrong }}
          >
            <Icon name="lucide:circle-check" size={16} className="text-white" />
            {packageDetail.actions.use}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 text-[12.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            {packageDetail.actions.close}
          </button>

          <button
            className="flex items-center gap-2 px-4 py-3 text-[12.5px] font-bold"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            <Icon name="lucide:pencil" size={15} style={{ backgroundColor: T.muted }} />
            {packageDetail.actions.edit}
          </button>
        </div>
      </footer>
    </>
  );
}
