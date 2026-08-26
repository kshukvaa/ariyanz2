'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { T, R } from '@/data/panelTokens';
import { PeopleHero, PeopleToolbar, PeopleFilters, PersonCard } from './PeopleParts';
import {
  instructorsHero,
  instructorsToolbar,
  instructorsFilters,
  instructorsFilterHead,
  instructorCardActions,
  instructors,
  instructorsSuggest,
} from '@/data/people/instructors';

/* ──────────────────────────────────────────────────────────────
   مدرسین آریاز.

   RTL: the filter rail is declared before <main> so it lands on
   the right, which is where the mockup puts it.
────────────────────────────────────────────────────────────── */

export default function InstructorsClient() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div style={{ backgroundColor: T.page }}>
      <PeopleHero
        title={instructorsHero.title}
        desc={instructorsHero.desc}
        stats={instructorsHero.stats}
        art={instructorsHero.art}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-7">
        <div className="grid gap-5 lg:grid-cols-[270px_1fr] items-start">
          {/* Rail first → right. */}
          <div className="space-y-4 lg:sticky lg:top-4">
            <PeopleFilters
              title={instructorsFilterHead.title}
              clear={instructorsFilterHead.clear}
              sections={instructorsFilters}
              action={instructorsFilterHead.action}
            />

            <button
              className="w-full py-3 text-[12px] font-bold bg-white transition-colors hover:bg-gray-50"
              style={{ borderRadius: R.md, border: `1px solid ${T.primary}`, color: T.primary }}
            >
              {instructorsFilterHead.seeAll}
            </button>
          </div>

          <main className="min-w-0">
            <PeopleToolbar
              search={instructorsToolbar.search}
              sortLabel={instructorsToolbar.sortLabel}
              sortValue={instructorsToolbar.sortValue}
              view={view}
              onView={setView}
            />

            <div
              className={`mt-4 grid gap-3.5 ${
                view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1'
              }`}
            >
              {instructors.map((p) => (
                <PersonCard key={p.id} person={p} save="heart" actions={instructorCardActions} />
              ))}
            </div>

            {/* Suggested carousel. */}
            <section
              className="mt-5 p-5"
              style={{ borderRadius: R.lg, backgroundColor: '#f7f6fe' }}
            >
              <header className="flex items-center gap-3 flex-wrap">
                <div className="flex-1 min-w-[200px] text-right">
                  <h2 className="flex items-center justify-end gap-2 text-[15px] font-extrabold" style={{ color: T.ink }}>
                    {instructorsSuggest.title}
                    <Icon name="lucide:star" size={16} style={{ backgroundColor: '#f5a524' }} />
                  </h2>
                  <p className="mt-1 text-[10.5px]" style={{ color: T.muted }}>
                    {instructorsSuggest.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    aria-label="بعدی"
                    className="w-8 h-8 flex items-center justify-center bg-white"
                    style={{ borderRadius: R.pill, border: `1px solid ${T.border}` }}
                  >
                    <Icon name="lucide:chevron-right" size={14} style={{ backgroundColor: T.ink }} />
                  </button>
                  <button
                    aria-label="قبلی"
                    className="w-8 h-8 flex items-center justify-center bg-white"
                    style={{ borderRadius: R.pill, border: `1px solid ${T.border}` }}
                  >
                    <Icon name="lucide:chevron-left" size={14} style={{ backgroundColor: T.ink }} />
                  </button>
                </div>
              </header>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {instructorsSuggest.items.map((s) => (
                  <li
                    key={s.name}
                    className="bg-white p-3 flex items-center gap-2.5"
                    style={{ borderRadius: R.md }}
                  >
                    <button aria-label="افزودن به علاقه‌مندی" className="shrink-0 order-3">
                      <Icon name="lucide:heart" size={15} style={{ backgroundColor: '#d6d1ef' }} />
                    </button>

                    <div className="flex-1 min-w-0 text-right order-2">
                      <span className="block text-[11.5px] font-extrabold" style={{ color: T.ink }}>
                        {s.name}
                      </span>
                      <span className="mt-0.5 flex items-center justify-end gap-1.5 text-[9.5px]" style={{ color: T.muted }}>
                        {s.title}
                        <span className="flex items-center gap-0.5" style={{ color: T.ink }}>
                          {s.rating}
                          <Icon name="lucide:star" size={9} style={{ backgroundColor: '#f5a524' }} />
                        </span>
                      </span>
                    </div>

                    <img
                      src={s.avatar}
                      alt=""
                      className="w-11 h-11 rounded-full object-cover shrink-0 order-1"
                    />
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
