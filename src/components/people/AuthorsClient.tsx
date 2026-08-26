'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { PeopleHero, PeopleToolbar, PeopleFilters, PersonCard } from './PeopleParts';
import {
  authorsHero,
  authorsToolbar,
  authorsFilters,
  authorsFilterHead,
  authorCardActions,
  authors,
  authorsMore,
  authorsAgent,
  authorsFeatured,
} from '@/data/people/authors';

/* ──────────────────────────────────────────────────────────────
   نویسندگان آریاز.

   Structurally the instructor directory with the agent card added
   under the filter rail — the source puts «مشاوره با آریاز»
   there, not in the content column.
────────────────────────────────────────────────────────────── */

export default function AuthorsClient() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div style={{ backgroundColor: T.page }}>
      <PeopleHero
        title={authorsHero.title}
        desc={authorsHero.desc}
        stats={authorsHero.stats}
        art={authorsHero.art}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-7">
        <div className="grid gap-5 lg:grid-cols-[270px_1fr] items-start">
          {/* Rail first → right. */}
          <div className="space-y-4 lg:sticky lg:top-4">
            <PeopleFilters
              title={authorsFilterHead.title}
              sections={authorsFilters}
              action={authorsFilterHead.action}
            />

            <section className="p-4" style={{ borderRadius: R.lg, backgroundColor: '#f3f0fe' }}>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0 text-right">
                  <h2 className="text-[13px] font-extrabold" style={{ color: T.ink }}>
                    {authorsAgent.title}
                  </h2>
                  <p className="mt-2 text-[10px] leading-5" style={{ color: T.muted }}>
                    {authorsAgent.desc.map((d) => (
                      <React.Fragment key={d}>
                        {d}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                <img src={authorsAgent.art} alt="" className="w-16 h-16 object-contain shrink-0" />
              </div>

              <button
                className="mt-3 w-full py-2.5 text-[11.5px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ borderRadius: R.md, backgroundColor: T.primary }}
              >
                {authorsAgent.cta}
              </button>
            </section>
          </div>

          <main className="min-w-0">
            <PeopleToolbar
              search={authorsToolbar.search}
              sortLabel={authorsToolbar.sortLabel}
              sortValue={authorsToolbar.sortValue}
              view={view}
              onView={setView}
            />

            <div
              className={`mt-4 grid gap-3.5 ${
                view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1'
              }`}
            >
              {authors.map((p) => (
                <PersonCard key={p.id} person={p} save="bookmark" actions={authorCardActions} />
              ))}
            </div>

            <div className="mt-5 flex justify-center">
              <button
                className="flex items-center gap-2 px-7 py-3 text-[12px] font-bold bg-white transition-colors hover:bg-gray-50"
                style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
              >
                <Icon name="lucide:chevron-down" size={13} style={{ backgroundColor: T.primary }} />
                {authorsMore}
              </button>
            </div>

            <section
              className="mt-5 p-5"
              style={{ borderRadius: R.lg, backgroundColor: '#f7f6fe' }}
            >
              <h2 className="flex items-center justify-end gap-2 text-[15px] font-extrabold" style={{ color: T.ink }}>
                {authorsFeatured.title}
                <Icon name="lucide:star" size={16} style={{ backgroundColor: T.violet }} />
              </h2>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {authorsFeatured.items.map((f) => (
                  <li key={f.name} className="bg-white p-3.5" style={{ borderRadius: R.md }}>
                    <div className="flex items-start gap-2.5">
                      <Icon name={f.icon} size={16} className="order-3 shrink-0" style={{ backgroundColor: f.fg }} />

                      <div className="flex-1 min-w-0 text-right order-2">
                        <span className="block text-[9.5px]" style={{ color: T.muted }}>
                          {f.badge}
                        </span>
                        <span className="mt-1 block text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                          {f.name}
                        </span>
                        <span className="mt-1 block text-[9.5px]" style={{ color: T.primary }}>
                          {f.note}
                        </span>
                      </div>

                      <img
                        src={f.avatar}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover shrink-0 order-1"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
