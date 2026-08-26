'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { PathCardView } from './PathParts';
import {
  archiveHero,
  archiveAgent,
  archiveToolbar,
  archiveFilters,
  archivePaths,
} from '@/data/lms/paths';

/* ──────────────────────────────────────────────────────────────
   آرشیو مسیرهای یادگیری.

   RTL: the filter rail is on the right here (unlike the two path
   detail pages, where the agent sits left), so the rail is
   declared before <main>.

   The pills actually filter — «رایگان»/«ویژه» have no data field
   to filter on yet, so they only mark selection; the kind filter
   in the rail is the one that changes the grid.
────────────────────────────────────────────────────────────── */

export default function PathsArchiveClient() {
  const [pill, setPill] = useState(archiveToolbar.pills[0].label);
  const [kind, setKind] = useState<'all' | 'skill' | 'career'>('all');

  const shown = kind === 'all' ? archivePaths : archivePaths.filter((p) => p.kind === kind);

  return (
    <div style={{ backgroundColor: T.page }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* ── Hero banner ──────────────────────────────────── */}
        <section
          className="relative overflow-hidden grid gap-6 lg:grid-cols-[1fr_1fr] items-center"
          style={{ borderRadius: R.lg, backgroundColor: '#f3f6fb' }}
        >
          <div className="px-8 py-10 text-right order-1">
            <h1 className="text-[28px] sm:text-[32px] font-extrabold" style={{ color: T.ink }}>
              {archiveHero.title}
            </h1>
            <p className="mt-4 text-[12.5px] leading-8" style={{ color: T.ink }}>
              {archiveHero.desc.map((d) => (
                <React.Fragment key={d}>
                  {d}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>

          <img src={archiveHero.art} alt="" className="w-full h-full object-cover order-2" />
        </section>

        <div className="grid gap-5 lg:grid-cols-[270px_1fr] items-start">
          {/* ── Filter rail (right) ────────────────────────── */}
          <aside className="space-y-4 lg:sticky lg:top-4">
            {archiveFilters.map((f) => (
              <section
                key={f.id}
                className="bg-white p-4"
                style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
              >
                <div className="flex items-center gap-2">
                  <Icon name="lucide:chevron-up" size={13} style={{ backgroundColor: T.muted }} />
                  <h2 className="flex-1 text-right text-[12.5px] font-extrabold" style={{ color: T.ink }}>
                    {f.label}
                  </h2>
                </div>

                {'items' in f && f.items && (
                  <ul className="mt-3 space-y-2.5">
                    {f.items.map((it) => (
                      <li key={it.label}>
                        <button
                          onClick={() =>
                            f.id === 'kind'
                              ? setKind(
                                  it.label === 'مسیر شغلی'
                                    ? kind === 'career'
                                      ? 'all'
                                      : 'career'
                                    : kind === 'skill'
                                      ? 'all'
                                      : 'skill',
                                )
                              : undefined
                          }
                          className="w-full flex items-center gap-2.5"
                        >
                          {'count' in it && it.count && (
                            <span
                              className="px-2 py-0.5 text-[9.5px] font-bold"
                              style={{ borderRadius: R.sm, backgroundColor: '#f2f2f8', color: T.primary }}
                            >
                              {it.count}
                            </span>
                          )}
                          <span className="flex-1 text-right text-[11.5px] font-bold" style={{ color: T.ink }}>
                            {it.label}
                          </span>
                          <span
                            className="w-[17px] h-[17px] flex items-center justify-center shrink-0"
                            style={{
                              borderRadius: '5px',
                              backgroundColor:
                                (f.id === 'kind' && it.label === 'مسیر شغلی' && kind === 'career') ||
                                (f.id === 'kind' && it.label === 'مسیر مهارتی' && kind === 'skill')
                                  ? T.primary
                                  : '#ffffff',
                              border: `1.5px solid ${
                                (f.id === 'kind' && it.label === 'مسیر شغلی' && kind === 'career') ||
                                (f.id === 'kind' && it.label === 'مسیر مهارتی' && kind === 'skill')
                                  ? T.primary
                                  : '#d9d9e6'
                              }`,
                            }}
                          >
                            {((f.id === 'kind' && it.label === 'مسیر شغلی' && kind === 'career') ||
                              (f.id === 'kind' && it.label === 'مسیر مهارتی' && kind === 'skill')) && (
                              <Icon name="lucide:check" size={11} style={{ backgroundColor: '#ffffff' }} />
                            )}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {'groups' in f && f.groups && (
                  <ul className="mt-3 space-y-2">
                    {f.groups.map((g) => (
                      <li key={g.label}>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="px-2 py-0.5 text-[9.5px] font-bold"
                            style={{ borderRadius: R.sm, backgroundColor: g.open ? T.tintPurple : '#f2f2f8', color: T.primary }}
                          >
                            {g.count}
                          </span>
                          <span
                            className="flex-1 text-right text-[11.5px] font-bold"
                            style={{ color: g.open ? T.primary : T.ink }}
                          >
                            {g.label}
                          </span>
                          <Icon
                            name={g.open ? 'lucide:chevron-up' : 'lucide:chevron-down'}
                            size={12}
                            style={{ backgroundColor: T.muted }}
                          />
                        </div>

                        {g.open && g.items.length > 0 && (
                          <ul className="mt-2 pr-4 space-y-2">
                            {g.items.map((s) => (
                              <li key={s.label} className="flex items-center gap-2">
                                <span className="text-[10px]" style={{ color: T.muted }}>
                                  {s.count}
                                </span>
                                <span className="flex-1 text-right text-[10.5px]" style={{ color: T.ink }}>
                                  {s.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </aside>

          {/* ── Main ───────────────────────────────────────── */}
          <main className="min-w-0 space-y-4">
            {/* Agent. */}
            <section
              className="bg-white p-5"
              style={{ borderRadius: R.lg, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-[220px] text-right order-1">
                  <h2 className="flex items-center justify-end gap-2 text-[14px] font-extrabold" style={{ color: T.ink }}>
                    {archiveAgent.title}
                    <Icon name="lucide:sparkles" size={16} style={{ backgroundColor: T.violet }} />
                  </h2>
                  <p className="mt-2.5 text-[11.5px] leading-7" style={{ color: T.muted }}>
                    {archiveAgent.desc}
                  </p>

                  <ul className="mt-3.5 flex items-center gap-2 flex-wrap justify-end">
                    {archiveAgent.chips.map((c) => (
                      <li key={c}>
                        <button
                          className="px-3.5 py-2 text-[10.5px] font-bold"
                          style={{ borderRadius: R.md, border: `1px solid ${T.primary}44`, color: T.primary }}
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <img
                  src="/images/aryaz/illustrations/ai-assistant-avatar.png"
                  alt=""
                  className="w-20 h-20 object-contain shrink-0 order-2"
                />
              </div>

              <label
                className="mt-4 flex items-center gap-2.5 px-3 py-2.5"
                style={{ borderRadius: R.pill, border: `1px solid ${T.border}` }}
              >
                <button
                  aria-label="ارسال"
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ borderRadius: '999px', backgroundColor: T.primary }}
                >
                  <Icon name="lucide:send" size={15} style={{ backgroundColor: '#ffffff' }} />
                </button>
                <input
                  placeholder={archiveAgent.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-[11.5px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>
            </section>

            {/* Toolbar. */}
            <div className="flex items-center gap-3 flex-wrap">
              <label
                className="flex items-center gap-2 px-4 py-2.5 bg-white shrink-0"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.muted }} />
                <span className="text-[11.5px] font-bold" style={{ color: T.ink }}>
                  {archiveToolbar.sort}
                </span>
              </label>

              <ul className="flex items-center gap-2 shrink-0">
                {archiveToolbar.pills.map((p) => {
                  const on = p.label === pill;
                  return (
                    <li key={p.label}>
                      <button
                        onClick={() => setPill(p.label)}
                        aria-pressed={on}
                        className="px-5 py-2.5 text-[11.5px] font-bold bg-white"
                        style={{
                          borderRadius: R.md,
                          border: `1px solid ${on ? p.fg : T.border}`,
                          color: on ? p.fg : T.muted,
                        }}
                      >
                        {p.label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <label
                className="flex-1 min-w-[200px] flex items-center gap-2.5 px-4 py-2.5 bg-white"
                style={{ borderRadius: R.md, border: `1px solid ${T.border}` }}
              >
                <Icon name="lucide:search" size={15} style={{ backgroundColor: T.muted }} />
                <input
                  placeholder={archiveToolbar.search}
                  className="flex-1 min-w-0 bg-transparent text-[11.5px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: T.ink }}
                />
              </label>
            </div>

            {/* Grid. */}
            <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
              {shown.map((p) => (
                <PathCardView key={p.id} path={p} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
