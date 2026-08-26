'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import PathStepShell, { StepCard } from './PathStepShell';
import { pathLesson } from '@/data/lms/path-steps';

/* ──────────────────────────────────────────────────────────────
   مرحله مسیر — a reading step.

   The step does not contain the article; it points at it and then
   asks you to come back and mark the step done. That round-trip
   is the whole interaction, so the note about returning sits
   directly above the three-button footer rather than buried.
────────────────────────────────────────────────────────────── */

export default function PathLessonClient() {
  return (
    <PathStepShell currentStep="طراحی آگهی استخدام" guide="lesson">
      <StepCard>
        <p className="text-center">
          <span
            className="inline-block px-3.5 py-1.5 text-[10.5px] font-bold"
            style={{ borderRadius: R.md, backgroundColor: T.tintPurple, color: T.primary }}
          >
            {pathLesson.badge}
          </span>
        </p>

        <h2 className="mt-4 text-center text-[23px] font-extrabold" style={{ color: T.ink }}>
          {pathLesson.title}
        </h2>

        <ul className="mt-4 flex items-center justify-center gap-3 flex-wrap">
          {pathLesson.meta.map((m) => (
            <li
              key={m.label}
              className="flex items-center gap-1.5 px-3.5 py-2 text-[10.5px] font-bold"
              style={{ borderRadius: R.md, backgroundColor: '#f7f7fb', color: T.ink }}
            >
              {m.label}
              <Icon name={m.icon} size={12} style={{ backgroundColor: T.muted }} />
            </li>
          ))}
        </ul>

        <p className="mt-4 text-center text-[12px] leading-7" style={{ color: T.muted }}>
          {pathLesson.desc}
        </p>

        {/* Resource card. Copy right, art left. */}
        <div
          className="mt-6 grid gap-5 sm:grid-cols-[1fr_minmax(0,230px)] items-center p-5"
          style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
        >
          <div className="text-right order-1">
            <p className="text-[11.5px] font-bold" style={{ color: T.ink }}>
              {pathLesson.resource.lead}
            </p>
            <h3 className="mt-3 text-[19px] font-extrabold" style={{ color: T.ink }}>
              {pathLesson.resource.title}
            </h3>
            <p className="mt-2.5 text-[11.5px] leading-7" style={{ color: T.muted }}>
              {pathLesson.resource.desc}
            </p>

            <ul className="mt-4 flex items-center justify-end gap-4 flex-wrap">
              <li className="flex items-center gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
                {pathLesson.resource.author}
                <Icon name="lucide:user-round" size={11} style={{ backgroundColor: T.muted }} />
              </li>
              <li className="flex items-center gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
                {pathLesson.resource.updated}
                <Icon name="lucide:shield-check" size={11} style={{ backgroundColor: T.muted }} />
              </li>
            </ul>

            <p className="mt-3 flex items-center justify-end gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
              {pathLesson.resource.category}
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: T.primary }} />
            </p>

            <button
              className="mt-4 w-full flex items-center justify-center gap-2.5 py-3 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: R.md, backgroundColor: T.primary }}
            >
              <Icon name="lucide:external-link" size={14} style={{ backgroundColor: '#ffffff' }} />
              {pathLesson.resource.cta}
              <Icon name="lucide:book-open" size={14} style={{ backgroundColor: '#ffffff' }} />
            </button>
          </div>

          <img
            src={pathLesson.resource.image}
            alt=""
            className="w-full aspect-square object-cover order-2"
            style={{ borderRadius: R.md }}
          />
        </div>

        <p
          className="mt-4 flex items-center justify-center gap-2 p-3.5 text-[11px]"
          style={{ borderRadius: R.md, backgroundColor: '#faf9ff', color: T.ink }}
        >
          {pathLesson.note}
          <Icon name="lucide:circle-alert" size={14} className="shrink-0" style={{ backgroundColor: T.primary }} />
        </p>

        {/* Footer nav. Next right, complete centre, previous left. */}
        <div
          className="mt-5 pt-5 flex items-center justify-between gap-3 flex-wrap"
          style={{ borderTop: `1px solid ${T.border}` }}
        >
          <button
            className="flex items-center gap-2 px-6 py-3 text-[12px] font-bold bg-white"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            {pathLesson.nav.next.label}
            <Icon name={pathLesson.nav.next.icon} size={14} style={{ backgroundColor: T.ink }} />
          </button>

          <button
            className="flex items-center gap-2.5 px-9 py-3 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
            style={{ borderRadius: R.md, backgroundColor: '#1c8a4e' }}
          >
            {pathLesson.nav.complete.label}
            <Icon name={pathLesson.nav.complete.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 text-[12px] font-bold bg-white"
            style={{ borderRadius: R.md, border: `1px solid ${T.border}`, color: T.ink }}
          >
            {pathLesson.nav.prev.label}
            <Icon name={pathLesson.nav.prev.icon} size={14} style={{ backgroundColor: T.ink }} />
          </button>
        </div>
      </StepCard>
    </PathStepShell>
  );
}
