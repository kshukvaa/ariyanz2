'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import ClassroomCrumbs from './ClassroomCrumbs';
import { Ring } from './LmsParts';
import {
  projectCrumbs,
  projectHead,
  projectOutputs,
  projectAbout,
  projectFiles,
  projectSubmit,
  projectStatus,
  projectProgress,
  projectFeedback,
  projectSuggest,
} from '@/data/lms/project';

/* ──────────────────────────────────────────────────────────────
   پروژه پایانی.

   Two columns, rail on the right as in the homework screen.
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

export default function ProjectClient() {
  return (
    <div style={{ backgroundColor: L.page }}>
      <ClassroomCrumbs crumbs={projectCrumbs.items} back={projectCrumbs.back} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5">
        <div className="grid gap-4 xl:grid-cols-[300px_1fr] items-start">
          {/* ── Rail (right) ─────────────────────────────────── */}
          <aside className="space-y-4">
            <Card>
              <ol className="space-y-0">
                {projectStatus.steps.map((s, i, all) => (
                  <li key={s.label} className="flex items-start gap-3">
                    <span className="flex flex-col items-center shrink-0">
                      <span
                        className="w-9 h-9 flex items-center justify-center"
                        style={{
                          borderRadius: '999px',
                          backgroundColor: s.state === 'active' ? L.orangeSoft : '#f2f3f8',
                        }}
                      >
                        <Icon
                          name={s.icon}
                          size={16}
                          style={{ backgroundColor: s.state === 'active' ? L.orange : L.muted }}
                        />
                      </span>
                      {i < all.length - 1 && (
                        <span className="w-[2px] h-8" style={{ backgroundColor: L.border }} />
                      )}
                    </span>

                    <span className="flex-1 text-right pb-4">
                      <span
                        className="block text-[12px] font-extrabold"
                        style={{ color: s.state === 'active' ? L.navy : L.muted }}
                      >
                        {s.label}
                      </span>
                      <span className="block text-[9.5px]" style={{ color: L.muted }}>
                        {s.sub}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card>
              <h2 className="text-center text-[13px] font-extrabold" style={{ color: L.navy }}>
                {projectProgress.title}
              </h2>

              <div className="mt-3 flex justify-center">
                <Ring pct={projectProgress.pct} size={104} stroke={12} colour={L.navy} />
              </div>

              <p className="mt-3 text-center text-[10.5px]" style={{ color: L.muted }}>
                {projectProgress.remainingLabel}
              </p>
              <p className="mt-1 text-center text-[15px] font-extrabold" style={{ color: L.navy }}>
                {projectProgress.remaining}
              </p>

              <button
                className="mt-4 w-full py-3 text-[11.5px] font-bold"
                style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
              >
                {projectProgress.cta}
              </button>
            </Card>

            <Card className="!p-0 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-[9.5px] shrink-0" style={{ color: L.muted }}>
                    {projectFeedback.date}
                  </span>
                  <h2 className="flex-1 text-right text-[13px] font-extrabold" style={{ color: L.navy }}>
                    {projectFeedback.title}
                  </h2>
                </div>
              </div>

              <div className="p-4" style={{ backgroundColor: '#f1faf5', borderTop: `1px solid #d8f0e3` }}>
                <div className="flex items-center gap-2.5">
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[12px] font-extrabold" style={{ color: L.navy }}>
                      {projectFeedback.instructor}
                    </span>
                    <span className="block text-[9.5px]" style={{ color: L.muted }}>
                      {projectFeedback.role}
                    </span>
                  </span>
                  <img
                    src={projectFeedback.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                </div>

                <p className="mt-3 flex items-center justify-end gap-2">
                  <span className="text-[11.5px] font-extrabold" style={{ color: L.navy }}>
                    {projectFeedback.score}
                  </span>
                  <span className="text-[10px]" style={{ color: L.muted }}>
                    {projectFeedback.scoreLabel}
                  </span>
                </p>

                <p className="mt-1.5 text-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon
                      key={i}
                      name="lucide:star"
                      size={17}
                      className="inline-block"
                      style={{ backgroundColor: i < projectFeedback.stars ? L.amber : L.border }}
                    />
                  ))}
                </p>
              </div>

              <div className="p-4">
                <span className="block text-right text-[11px] font-extrabold" style={{ color: L.navy }}>
                  {projectFeedback.label}
                </span>
                <p className="mt-2 text-right text-[10.5px] leading-7" style={{ color: L.navy }}>
                  {projectFeedback.body}
                </p>

                <button
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 text-[10.5px] font-bold"
                  style={{ borderRadius: LR.md, border: `1px solid ${L.blueSoft}`, color: L.blue }}
                >
                  {projectFeedback.cta.label}
                  <Icon name={projectFeedback.cta.icon} size={12} style={{ backgroundColor: L.blue }} />
                </button>
              </div>
            </Card>
          </aside>

          {/* ── Main ─────────────────────────────────────────── */}
          <main className="min-w-0 space-y-4">
            <Card>
              <div className="flex items-center gap-5 flex-wrap">
                <ul className="flex-1 min-w-[240px] flex items-start justify-end gap-6 flex-wrap order-1">
                  {projectHead.meta.map((m) => (
                    <li key={m.label} className="text-right">
                      <span className="flex items-center justify-end gap-1.5 text-[10px]" style={{ color: L.muted }}>
                        {m.label}
                        <Icon name={m.icon} size={12} style={{ backgroundColor: L.muted }} />
                      </span>
                      {m.chip ? (
                        <span
                          className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] font-bold"
                          style={{ borderRadius: LR.sm, backgroundColor: L.amberSoft, color: L.orange }}
                        >
                          {m.value}
                          <Icon name="lucide:clock" size={11} style={{ backgroundColor: L.orange }} />
                        </span>
                      ) : (
                        <span className="mt-1 block text-[11.5px] font-bold" style={{ color: L.navy }}>
                          {m.value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <img
                  src={projectHead.art}
                  alt=""
                  className="w-[150px] h-[90px] object-cover shrink-0 order-2"
                  style={{ borderRadius: LR.md }}
                />
              </div>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[1fr_1fr] items-start">
              {/* Outputs declared first → right. */}
              <Card>
                <h2 className="flex items-center justify-end gap-2.5 text-[14px] font-extrabold" style={{ color: L.navy }}>
                  {projectOutputs.title}
                  <span
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ borderRadius: LR.md, backgroundColor: L.greenSoft }}
                  >
                    <Icon name={projectOutputs.icon} size={18} style={{ backgroundColor: L.green }} />
                  </span>
                </h2>

                <ul className="mt-4 space-y-3">
                  {projectOutputs.items.map((o) => (
                    <li key={o} className="flex items-center gap-2.5">
                      <span className="flex-1 text-right text-[11.5px] font-bold" style={{ color: L.navy }}>
                        {o}
                      </span>
                      <Icon name="lucide:circle-check" size={16} className="shrink-0" style={{ backgroundColor: L.green }} />
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: L.navy }}>
                  {projectAbout.title}
                  <Icon name={projectAbout.icon} size={15} style={{ backgroundColor: L.blue }} />
                </h2>
                <p className="mt-4 text-right text-[12px] leading-8" style={{ color: L.navy }}>
                  {projectAbout.body}
                </p>
              </Card>
            </div>

            <Card>
              <header className="flex items-center gap-3">
                <button className="text-[10.5px] font-bold" style={{ color: L.blue }}>
                  {projectFiles.all}
                </button>
                <h2 className="flex-1 text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
                  {projectFiles.title}
                </h2>
              </header>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {projectFiles.items.map((f) => (
                  <li key={f.title} className="p-3.5" style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}>
                    <div className="flex items-start gap-2.5">
                      <span className="flex-1 text-right min-w-0">
                        <span className="block text-[11px] font-extrabold leading-5" style={{ color: L.navy }}>
                          {f.title}
                        </span>
                        <span className="mt-1 block text-[9.5px]" style={{ color: L.muted }}>
                          {f.meta}
                        </span>
                      </span>
                      <span
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                        style={{ borderRadius: LR.sm, backgroundColor: f.bg }}
                      >
                        <Icon name={f.icon} size={18} style={{ backgroundColor: f.fg }} />
                      </span>
                    </div>

                    <button
                      className="mt-3 w-full flex items-center justify-center gap-1.5 text-[10.5px] font-bold"
                      style={{ color: L.blue }}
                    >
                      {projectFiles.download}
                      <Icon name="lucide:download" size={12} style={{ backgroundColor: L.blue }} />
                    </button>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="text-right text-[14px] font-extrabold" style={{ color: L.navy }}>
                {projectSubmit.title}
              </h2>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px] items-start">
                {/* Note field declared first → right. */}
                <div>
                  <span className="block text-right text-[11.5px] font-bold" style={{ color: L.navy }}>
                    {projectSubmit.noteLabel}
                  </span>
                  <div
                    className="mt-2 overflow-hidden"
                    style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
                  >
                    <textarea
                      rows={5}
                      placeholder={projectSubmit.placeholder}
                      className="w-full px-4 py-3.5 text-right text-[11.5px] outline-none resize-none placeholder:text-[#9396b0]"
                      style={{ color: L.ink }}
                    />
                    <span className="block px-4 pb-2.5 text-left text-[9.5px]" style={{ color: L.muted }}>
                      {projectSubmit.counter}
                    </span>
                  </div>

                  <button
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 text-[12.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                    style={{ borderRadius: LR.md, backgroundColor: L.orange }}
                  >
                    {projectSubmit.action.label}
                    <Icon name={projectSubmit.action.icon} size={15} style={{ backgroundColor: '#ffffff' }} />
                  </button>
                </div>

                <label
                  className="flex flex-col items-center justify-center text-center px-4 py-8 cursor-pointer"
                  style={{ borderRadius: LR.md, border: `1.5px dashed ${L.blue}44`, backgroundColor: L.blueTint }}
                >
                  <Icon name="lucide:cloud-upload" size={30} style={{ backgroundColor: L.blue }} />
                  <span className="mt-3 text-[11.5px] font-extrabold" style={{ color: L.blue }}>
                    {projectSubmit.drop.title}
                  </span>
                  <span className="mt-1 text-[10px]" style={{ color: L.blue }}>
                    {projectSubmit.drop.hint}
                  </span>
                  <span className="mt-2.5 text-[9px]" style={{ color: L.muted }}>
                    {projectSubmit.drop.formats}
                  </span>
                  <span className="text-[9px]" style={{ color: L.muted }}>
                    {projectSubmit.drop.limit}
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </Card>

            <Card>
              <h2 className="flex items-center justify-center gap-2 text-[14px] font-extrabold" style={{ color: L.navy }}>
                {projectSuggest.title}
                <Icon name="lucide:sparkles" size={15} style={{ backgroundColor: L.violet }} />
              </h2>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {projectSuggest.items.map((s) => (
                  <li key={s.title} className="p-3.5" style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}>
                    <div className="flex items-start gap-2.5">
                      <span className="flex-1 text-right min-w-0">
                        <span className="block text-[11px] font-extrabold" style={{ color: L.navy }}>
                          {s.title}
                        </span>
                        <span className="mt-1 block text-[9px] leading-4" style={{ color: L.muted }}>
                          {s.desc}
                        </span>
                      </span>
                      <span
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{ borderRadius: LR.sm, backgroundColor: s.bg }}
                      >
                        <Icon name={s.icon} size={17} style={{ backgroundColor: s.fg }} />
                      </span>
                    </div>

                    <button
                      className="mt-3 w-full py-2 text-[10px] font-bold"
                      style={{ borderRadius: LR.sm, border: `1px solid ${s.fg}55`, color: s.fg }}
                    >
                      {s.cta}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
