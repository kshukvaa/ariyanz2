'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Crumbs, PageHero, Card, Accordion, NAVY, ORANGE } from './SiteParts';
import type { LegalDoc } from '@/data/site/legal';

/* One component for «قوانین و مقررات» and «حریم خصوصی» — the two
   sheets draw the same page and differ only in content. */

export default function LegalPage({ doc, extras }: { doc: LegalDoc; extras?: React.ReactNode }) {
  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5">
        <Crumbs items={[{ label: 'خانه', href: '/' }, { label: doc.crumb }]} />
      </div>

      <PageHero title={doc.title} desc={doc.desc} art={doc.art} updated={doc.updated} search={doc.search} />

      {doc.tabs && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-100 bg-white px-2 overflow-x-auto">
            <ul className="flex items-center gap-1 min-w-max justify-end">
              {doc.tabs.map((t, i) => (
                <li key={t.label}>
                  <button
                    className="relative flex flex-col items-center gap-1.5 px-5 py-4 text-[11px] whitespace-nowrap"
                    style={{ color: i === 0 ? NAVY : '#8b93a7', fontWeight: i === 0 ? 800 : 600 }}
                  >
                    <Icon name={t.icon} size={17} style={{ backgroundColor: i === 0 ? NAVY : '#b7bdcc' }} />
                    {t.label}
                    {i === 0 && (
                      <span className="absolute bottom-0 inset-x-3 h-[3px] rounded-t-full" style={{ backgroundColor: NAVY }} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid gap-5 lg:grid-cols-[280px_1fr] items-start">
          {/* Table of contents declared first → right. */}
          <aside className="space-y-4 lg:sticky lg:top-4">
            <Card>
              <h2 className="text-right text-[13px] font-black" style={{ color: NAVY }}>
                فهرست مطالب
              </h2>
              <ol className="mt-4 space-y-0">
                {doc.toc.map((t, i) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex flex-col items-center shrink-0">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: i === 0 ? ORANGE : '#e3e6ef' }}
                      />
                      {i < doc.toc.length - 1 && <span className="w-px h-6 bg-gray-100" />}
                    </span>
                    <span
                      className="flex-1 text-right text-[11px] -mt-1"
                      style={{ color: i === 0 ? NAVY : '#8b93a7', fontWeight: i === 0 ? 800 : 500 }}
                    >
                      {`${(i + 1).toLocaleString('fa-IR')}. ${t}`}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>

            <div className="rounded-2xl p-5" style={{ backgroundColor: '#FDF1E6' }}>
              <h3 className="text-right text-[12.5px] font-black" style={{ color: NAVY }}>
                {doc.help.title}
              </h3>
              <p className="mt-2 text-right text-[11px] leading-6 text-gray-500">{doc.help.desc}</p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[11.5px] font-bold text-white"
                style={{ backgroundColor: ORANGE }}
              >
                <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: '#ffffff' }} />
                {doc.help.cta}
              </Link>
            </div>
          </aside>

          <main className="min-w-0 space-y-5">
            <Accordion
              items={doc.sections.map((s, i) => ({
                title: `${(i + 1).toLocaleString('fa-IR')}. ${s.title}`,
                body: s.body,
                bullets: s.bullets,
                icon: s.icon,
              }))}
            />

            {/* Supporting cards. */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {doc.cards.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: c.tone === 'orange' ? '#FDF1E6' : '#F4F6FD' }}
                >
                  <h3 className="flex items-center gap-2 justify-end text-[12.5px] font-black" style={{ color: NAVY }}>
                    {c.title}
                    <Icon name={c.icon} size={16} style={{ backgroundColor: ORANGE }} />
                  </h3>

                  {c.body && <p className="mt-3 text-right text-[11px] leading-7 text-gray-500">{c.body}</p>}

                  {c.items && (
                    <ul className="mt-3 space-y-2.5">
                      {c.items.map((it) => (
                        <li key={it} className="flex items-start gap-2.5">
                          <span className="flex-1 text-right text-[11px] leading-6 text-gray-600">{it}</span>
                          <Icon
                            name="lucide:circle-check"
                            size={13}
                            className="shrink-0 mt-1"
                            style={{ backgroundColor: '#1c8a4e' }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  {c.cta && (
                    <button
                      className="mt-4 w-full rounded-xl bg-white py-2.5 text-[11px] font-bold"
                      style={{ color: ORANGE }}
                    >
                      {c.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {extras}

            {/* Version history. */}
            <Card>
              <h2 className="flex items-center gap-2 justify-end text-[13px] font-black" style={{ color: NAVY }}>
                {doc.historyTitle}
                <Icon name="lucide:file-text" size={15} style={{ backgroundColor: ORANGE }} />
              </h2>

              <ol className="mt-4 space-y-0">
                {doc.history.map((h, i) => (
                  <li key={h.version} className="grid grid-cols-[16px_1fr] gap-3">
                    <span className="flex flex-col items-center">
                      <span
                        className="h-3 w-3 rounded-full border-2"
                        style={{ borderColor: h.latest ? ORANGE : '#d8dced', backgroundColor: '#fff' }}
                      />
                      {i < doc.history.length - 1 && <span className="w-px flex-1 bg-gray-100" />}
                    </span>
                    <div className="pb-5 text-right -mt-1">
                      <span className="flex items-center gap-2 justify-end flex-wrap">
                        {h.latest && (
                          <span
                            className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
                            style={{ backgroundColor: ORANGE }}
                          >
                            جدیدترین
                          </span>
                        )}
                        <span className="text-[9.5px] text-gray-400">{h.date}</span>
                        <span className="text-[12px] font-black" style={{ color: NAVY }}>
                          {h.version}
                        </span>
                      </span>
                      <p className="mt-1 text-[11px] leading-6 text-gray-500">{h.note}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <button
                className="mt-1 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-[11px] font-bold"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                <Icon name="lucide:arrow-left" size={12} style={{ backgroundColor: NAVY }} />
                {doc.historyCta}
              </button>
            </Card>

            {/* Footer links. */}
            <div className="grid gap-4 md:grid-cols-2">
              {doc.foot.map((f) => (
                <Link key={f.title} href={f.href} className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-4">
                  <span className="flex-1 text-right">
                    <span className="block text-[12.5px] font-black" style={{ color: NAVY }}>
                      {f.title}
                    </span>
                    <span className="mt-1 block text-[11px] text-gray-500">{f.desc}</span>
                  </span>
                  <span className="h-12 w-12 shrink-0 rounded-2xl bg-[#F4F6FD] flex items-center justify-center">
                    <Icon name={f.icon} size={20} style={{ backgroundColor: NAVY }} />
                  </span>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
