'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   The navy strip that tops every classroom screen except the
   lesson.

   The lesson uses LearnShell's ProgressBand — course title,
   instructor, progress ring. Homework, exam, results, forum,
   project and certificate replace it with this: a plain
   breadcrumb trail and a way back to the course. Extracted here
   once the second screen needed it rather than copied a sixth
   time.
────────────────────────────────────────────────────────────── */

export interface Crumb {
  label: string;
  href?: string;
}

export default function ClassroomCrumbs({
  crumbs,
  back,
}: {
  crumbs: Crumb[];
  back: { label: string; href: string };
}) {
  return (
    <section style={{ backgroundColor: L.navyDeep }}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-4 flex-wrap">
        <nav className="flex-1 min-w-[200px] flex items-center justify-center gap-1.5 flex-wrap text-[10.5px]">
          {crumbs.map((c, i) => (
            <React.Fragment key={c.label}>
              {i > 0 && <span style={{ color: 'rgba(255,255,255,.35)' }}>›</span>}
              {c.href ? (
                <Link href={c.href} style={{ color: 'rgba(255,255,255,.6)' }}>
                  {c.label}
                </Link>
              ) : (
                <span style={{ color: 'rgba(255,255,255,.9)' }}>{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <Link
          href={back.href}
          className="flex items-center gap-2 px-4 py-2 text-[11.5px] font-bold text-white shrink-0"
          style={{ borderRadius: LR.md, border: '1px solid rgba(255,255,255,.25)' }}
        >
          <Icon name="lucide:arrow-left" size={14} style={{ backgroundColor: '#ffffff' }} />
          {back.label}
        </Link>
      </div>
    </section>
  );
}
