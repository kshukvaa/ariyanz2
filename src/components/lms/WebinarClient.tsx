'use client';

import React from 'react';
import Icon from '@/components/Icon';
import { L, LR } from '@/data/lmsTokens';
import EventPage from './EventPage';
import { webinar } from '@/data/lms/events';

/* ──────────────────────────────────────────────────────────────
   وبینار آنلاین زنده. A webinar is a stream you join, so the
   media slot is a dark player carrying the LIVE badge, the
   viewer count and the running chat — the one real structural
   difference from the workshop page.
────────────────────────────────────────────────────────────── */

export default function WebinarClient() {
  return (
    <EventPage
      crumbs={webinar.crumbs}
      badge={webinar.badge}
      title={webinar.title}
      subtitle={webinar.subtitle}
      desc={webinar.desc}
      instructorLabel={webinar.instructorLabel}
      instructor={webinar.instructor}
      avatar={webinar.avatar}
      meta={webinar.meta}
      tabs={webinar.tabs}
      about={webinar.about}
      ticket={webinar.ticket}
      group={webinar.group}
      guarantee={webinar.guarantee}
      media={
        <div
          className="overflow-hidden grid sm:grid-cols-[1fr_180px]"
          style={{ borderRadius: LR.lg, backgroundColor: L.navyDeep }}
        >
          {/* Player declared first → right of the chat. */}
          <div className="relative order-1">
            <img src={webinar.poster} alt="" className="w-full h-full min-h-[240px] object-cover opacity-85" />

            <span className="absolute top-3 right-3 flex items-center gap-2">
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-extrabold text-white"
                style={{ borderRadius: LR.sm, backgroundColor: L.red }}
              >
                {webinar.live.label}
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
              <span className="flex items-center gap-1 text-[9.5px] font-bold text-white">
                {webinar.live.viewers}
                <Icon name="lucide:eye" size={12} style={{ backgroundColor: '#ffffff' }} />
              </span>
            </span>
          </div>

          <div className="order-2 p-3 flex flex-col" style={{ borderInlineEnd: '1px solid rgba(255,255,255,.08)' }}>
            <h3 className="text-right text-[11px] font-extrabold text-white">{webinar.chat.title}</h3>

            <ul className="mt-3 flex-1 space-y-3">
              {webinar.chat.messages.map((m) => (
                <li key={m.name} className="flex items-start gap-2">
                  <span className="flex-1 text-right min-w-0">
                    <span className="block text-[9.5px] font-bold text-white">{m.name}</span>
                    <span className="block text-[8.5px] leading-4" style={{ color: 'rgba(255,255,255,.6)' }}>
                      {m.text}
                    </span>
                  </span>
                  <img src={m.avatar} alt="" className="w-5 h-5 rounded-full object-cover shrink-0" />
                </li>
              ))}
            </ul>

            <label
              className="mt-3 flex items-center gap-2 px-2.5 py-2"
              style={{ borderRadius: LR.sm, backgroundColor: 'rgba(255,255,255,.07)' }}
            >
              <Icon name="lucide:send" size={11} style={{ backgroundColor: 'rgba(255,255,255,.6)' }} />
              <input
                placeholder={webinar.chat.placeholder}
                className="flex-1 min-w-0 bg-transparent text-[8.5px] outline-none text-white placeholder:text-white/40"
              />
            </label>
          </div>
        </div>
      }
    />
  );
}
