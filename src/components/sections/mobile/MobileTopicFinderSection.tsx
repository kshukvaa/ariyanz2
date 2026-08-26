'use client';

/* ──────────────────────────────────────────────────────────────
   MobileTopicFinderSection — index 01, WARM CREAM (#FDF7F0)
   "Immersive App" mobile variant of TopicFinderSection.
   v11: light theme — GlassCard is white, content uses dark text.
────────────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/Icon';
import { topics, topicsHeading, topicsCtaLabel } from '@/data/landing';
import {
  MobileSectionShell,
  MobileHeading,
  GlassCard,
} from './_kit';

export default function MobileTopicFinderSection() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const onPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail.id === 'mobile-topics') {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
    };
    window.addEventListener('mobile:section-pulse', onPulse);
    return () => window.removeEventListener('mobile:section-pulse', onPulse);
  }, []);

  return (
    <MobileSectionShell bg="bg-white" id="mobile-topics">
      <MobileHeading
        index={1}
        pulse={pulse}
        title={topicsHeading.title}
        desc={topicsHeading.desc}
        accentIcon="lucide:compass"
      />

      <div className="space-y-4">
        {topics.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3) }}
          >
            <GlassCard className="p-5">
              {/* Header: medallion (right in RTL) + title/desc */}
              <div className="flex items-start gap-4">
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: t.bg }}
                >
                  <Icon
                    name={t.icon}
                    size={24}
                    className="shrink-0"
                    style={{ backgroundColor: t.color }}
                  />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-black text-[#1C1816] leading-7 mb-1">
                    {t.title}
                  </h3>
                  <p className="text-[12px] leading-6 text-gray-500">{t.desc}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px my-4 bg-gray-100" />

              {/* 2-col checklist */}
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 mb-4">
                {t.items.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-1.5 text-[12px] leading-6 text-gray-700"
                  >
                    <Icon
                      name="lucide:circle-check-big"
                      size={15}
                      className="text-orange-500 shrink-0 mt-0.5"
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              {/* Inline CTA */}
              <Link
                href={t.href}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-orange-500 active:scale-[0.97] transition-transform"
              >
                <span>{topicsCtaLabel}</span>
                <Icon name="lucide:arrow-left" size={15} className="text-orange-500" />
              </Link>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </MobileSectionShell>
  );
}
