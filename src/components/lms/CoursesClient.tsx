'use client';

import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import { LmsHero, CourseCard, FilterRail } from './LmsParts';
import {
  coursesHero,
  coursesToolbar,
  courses,
  coursesFilters,
  coursesFilterHead,
  coursesWhy,
} from '@/data/lms/courses';

/* ──────────────────────────────────────────────────────────────
   Course catalogue.

   The filter rail holds the right-hand track and the grid runs
   down the left — in RTL the first declared column is the
   rightmost, so the rail is declared first.
────────────────────────────────────────────────────────────── */

export default function CoursesClient() {
  const [pill, setPill] = useState(coursesToolbar.pills[0]);

  return (
    <div style={{ backgroundColor: L.page }}>
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <LmsHero
          title={coursesHero.title}
          desc={coursesHero.desc}
          features={coursesHero.features}
        />

        <div className="grid gap-5 xl:grid-cols-[280px_1fr] items-start">
          <FilterRail
            title={coursesFilterHead.title}
            groups={coursesFilters}
            search={coursesFilterHead.search}
          />

          <div className="min-w-0 space-y-5 xl:order-2">
            {/* ── Toolbar ─────────────────────────────────────── */}
            <div
              className="bg-white p-3 flex items-center gap-3 flex-wrap"
              style={{ borderRadius: LR.lg, border: `1px solid ${L.border}` }}
            >
              <div className="flex items-center gap-1.5 order-3 sm:order-1">
                {coursesToolbar.pills.map((p) => {
                  const on = p === pill;
                  return (
                    <button
                      key={p}
                      onClick={() => setPill(p)}
                      aria-pressed={on}
                      className="px-5 py-2.5 text-[12px] font-bold transition-colors"
                      style={
                        on
                          ? { borderRadius: LR.pill, backgroundColor: L.blue, color: '#fff' }
                          : { borderRadius: LR.pill, border: `1px solid ${L.border}`, color: L.ink }
                      }
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <label
                className="flex items-center gap-2.5 px-3.5 py-2.5 flex-1 min-w-[200px] order-2"
                style={{ borderRadius: LR.md, border: `1px solid ${L.border}` }}
              >
                <Icon name="lucide:search" size={15} style={{ backgroundColor: L.muted }} />
                <input
                  type="search"
                  placeholder={coursesToolbar.search}
                  className="flex-1 min-w-0 bg-transparent text-[12px] outline-none placeholder:text-[#9396b0]"
                  style={{ color: L.ink }}
                />
              </label>

              <span
                className="flex items-center gap-2 text-[12.5px] font-extrabold order-1 sm:order-3"
                style={{ color: L.navy }}
              >
                {coursesToolbar.sort}
                <Icon name="lucide:star" size={16} style={{ backgroundColor: L.amber }} />
              </span>
            </div>

            {/* ── Grid ────────────────────────────────────────── */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>

            <div className="flex justify-center">
              <button
                className="flex items-center gap-2 px-6 py-3 text-[12.5px] font-bold bg-white transition-colors hover:bg-gray-50"
                style={{ borderRadius: LR.md, border: `1px solid ${L.border}`, color: L.navy }}
              >
                <Icon name="lucide:chevron-down" size={14} style={{ backgroundColor: L.muted }} />
                {coursesToolbar.more}
                <Icon name="lucide:users-round" size={15} style={{ backgroundColor: L.blue }} />
              </button>
            </div>

            {/* ── Why band ────────────────────────────────────── */}
            <section
              className="p-5"
              style={{ borderRadius: LR.lg, backgroundColor: L.blueTint, border: `1px solid ${L.border}` }}
            >
              <h2 className="text-center text-[15px] font-extrabold" style={{ color: L.navy }}>
                {coursesWhy.title}
              </h2>

              <ul className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-3 xl:grid-cols-5">
                {coursesWhy.items.map((w) => (
                  <li key={w.label} className="flex items-start gap-2.5 text-right">
                    <span className="flex-1">
                      <span className="block text-[12px] font-extrabold" style={{ color: L.navy }}>
                        {w.label}
                      </span>
                      <span className="block mt-1 text-[10px] leading-5" style={{ color: L.muted }}>
                        {w.desc}
                      </span>
                    </span>
                    <Icon name={w.icon} size={22} style={{ backgroundColor: L.navy }} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
