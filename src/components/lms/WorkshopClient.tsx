'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import EventPage from './EventPage';
import { workshop } from '@/data/lms/events';

/* ──────────────────────────────────────────────────────────────
   ورکشاپ حضوری. A workshop is a place you go, so the media slot
   is a photograph of the room with the credential chips laid over
   its foot — exactly as the mockup frames it.
────────────────────────────────────────────────────────────── */

export default function WorkshopClient() {
  return (
    <EventPage
      crumbs={workshop.crumbs}
      badge={workshop.badge}
      title={workshop.title}
      desc={workshop.desc}
      instructorLabel={workshop.instructorLabel}
      instructor={workshop.instructor}
      avatar={workshop.avatar}
      meta={workshop.meta}
      tabs={workshop.tabs}
      about={workshop.about}
      ticket={workshop.ticket}
      group={workshop.group}
      guarantee={workshop.guarantee}
      media={
        <div className="relative overflow-hidden" style={{ borderRadius: LR.lg }}>
          <img src={workshop.image} alt="" className="w-full aspect-[4/3] object-cover" />

          <ul
            className="absolute inset-x-0 bottom-0 flex items-center gap-3 flex-wrap px-3 py-3"
            style={{ backgroundImage: 'linear-gradient(to top, rgba(9,19,77,.85), transparent)' }}
          >
            {workshop.imageChips.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5 text-[9.5px] font-bold text-white">
                {c.label}
                <Icon
                  name={c.icon}
                  size={12}
                  style={{ backgroundColor: c.amber ? L.amber : '#ffffff' }}
                />
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
