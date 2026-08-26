'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import Icon from '@/components/Icon';
import { Crumbs } from '@/components/free/FreeBits';
import { freeTheme, tones } from '@/data/free';
import {
  agentsHero,
  agentSorts,
  agentTopicFilter,
  agentAccessTabs,
  agentTopics,
  agents,
  totalAgents,
  type Agent,
  type AgentAccess,
} from '@/data/agents';

const SEARCH_LABEL = 'جستجو در ایجنت‌ها..';

export default function AgentsPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(agentSorts[0].id);
  const [group, setGroup] = useState('all');
  const [access, setAccess] = useState<AgentAccess | null>(null);
  const [openTopic, setOpenTopic] = useState<string | null>(agentTopics[0].id);
  const [topic, setTopic] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim();
    const list = agents.filter((a) => {
      const byQuery = !q || a.title.includes(q) || a.desc.includes(q) || a.category.includes(q);
      const byGroup = group === 'all' || a.groupId === group;
      const byAccess = !access || a.access === access;
      const byTopic = !topic || a.topicId === topic;
      return byQuery && byGroup && byAccess && byTopic;
    });

    const sorted = [...list];
    if (sort === 'popular') sorted.sort((a, b) => b.uses - a.uses);
    if (sort === 'rating') sorted.sort((a, b) => b.uses - a.uses);
    return sorted;
  }, [query, sort, group, access, topic]);

  return (
    <SharedPageLayout>
      <div style={{ backgroundColor: freeTheme.page }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <Crumbs trail={agentsHero.breadcrumb} />

          <div
            className="rounded-3xl mt-4 overflow-hidden grid lg:grid-cols-2 items-center"
            style={{ background: 'linear-gradient(255deg,#EEF1FE 0%,#F7F9FF 55%,#FFFFFF 100%)' }}
          >
            {/* Copy first so it takes the right-hand column under RTL. */}
            <div className="order-1 px-6 sm:px-10 py-8 text-right">
              <h1
                className="text-[26px] sm:text-[36px] font-black leading-[1.5] mb-5"
                style={{ color: freeTheme.navy }}
              >
                {agentsHero.title}
              </h1>
              {agentsHero.desc.map((line) => (
                <p key={line} className="text-[13.5px] text-gray-600 leading-9">
                  {line}
                </p>
              ))}
            </div>

            <div className="order-2 h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={agentsHero.art} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[270px_1fr] gap-6 items-start">
          {/* Results column */}
          <div className="order-1 lg:order-2">
            {/* Toolbar — sort and group selects right, tabs, search left */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-6">
              <Select value={sort} onChange={setSort} options={agentSorts} label="مرتب‌سازی" />
              <Select
                value={group}
                onChange={setGroup}
                options={agentTopicFilter}
                label="دسته‌بندی"
              />

              <div className="flex items-center gap-2 shrink-0">
                {agentAccessTabs.map((t) => {
                  const on = access === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setAccess(on ? null : t.id)}
                      aria-pressed={on}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-[12.5px] font-bold border transition-all"
                      style={{
                        backgroundColor: on ? '#FFF6EE' : '#fff',
                        borderColor: on ? '#F8C79B' : freeTheme.border,
                        color: freeTheme.navy,
                      }}
                    >
                      <Icon name={t.icon} size={15} style={{ backgroundColor: t.color }} />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="search"
                  placeholder={SEARCH_LABEL}
                  aria-label={SEARCH_LABEL}
                  className="w-full bg-white border rounded-xl py-3 pr-5 pl-11 text-[12.5px] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  style={{ borderColor: freeTheme.border }}
                />
                <Icon
                  name="lucide:search"
                  size={17}
                  className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
                {results.map((a) => (
                  <AgentCard key={a.id} agent={a} />
                ))}
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl border py-20 text-center"
                style={{ borderColor: freeTheme.border }}
              >
                <Icon name="lucide:bot-off" size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="font-bold text-gray-600 mb-1">ایجنتی یافت نشد</h3>
                <p className="text-[13px] text-gray-400">فیلترها یا عبارت جستجو را تغییر دهید</p>
              </div>
            )}

            <Pager />

            <p className="text-center text-[12.5px] font-bold mt-4" style={{ color: freeTheme.navy }}>
              نمایش ۱ تا {toPersian(results.length)} از {totalAgents} ایجنت
            </p>
          </div>

          {/* Facets */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-28">
            <section
              className="bg-white rounded-2xl border p-4"
              style={{ borderColor: freeTheme.border }}
            >
              <h2 className="flex items-center justify-between gap-2 mb-3">
                <Icon name="lucide:list-filter" size={17} style={{ backgroundColor: freeTheme.blue }} />
                <span className="text-[14px] font-black" style={{ color: freeTheme.navy }}>
                  موضوعات
                </span>
              </h2>

              <div className="space-y-1">
                {agentTopics.map((g) => {
                  const open = openTopic === g.id;
                  return (
                    <div key={g.id}>
                      <button
                        onClick={() => setOpenTopic(open ? null : g.id)}
                        aria-expanded={open}
                        className="w-full flex items-center gap-2 py-3 px-3 rounded-xl text-right transition-colors"
                        style={open ? { backgroundColor: '#F4F6FD' } : undefined}
                      >
                        <span
                          className="flex-1 text-[13px] font-bold"
                          style={{ color: freeTheme.navy }}
                        >
                          {g.title}
                        </span>
                        <span className="text-[11.5px] font-bold text-gray-400 tabular-nums">
                          {toPersian(g.count)}
                        </span>
                        <Icon
                          name="lucide:chevron-down"
                          size={15}
                          className={`text-gray-400 shrink-0 transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {open && g.items && (
                        <ul className="py-1">
                          {g.items.map((it) => {
                            const on = topic === it.id;
                            return (
                              <li key={it.id}>
                                <button
                                  onClick={() => setTopic(on ? null : it.id)}
                                  aria-pressed={on}
                                  className="w-full flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg text-right transition-colors hover:bg-gray-50"
                                  style={on ? { backgroundColor: '#FFF3E8' } : undefined}
                                >
                                  <span
                                    className={`text-[12.5px] ${on ? 'font-bold text-orange-600' : ''}`}
                                    style={on ? undefined : { color: freeTheme.navy }}
                                  >
                                    {it.label}
                                  </span>
                                  <span className="text-[11.5px] text-gray-400 tabular-nums">
                                    {toPersian(it.count)}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </SharedPageLayout>
  );
}

/* ── Pieces ─────────────────────────────────────────────────── */

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  label: string;
}) {
  return (
    <span
      className="relative bg-white border rounded-xl flex items-center gap-2 px-4 shrink-0 lg:w-44"
      style={{ borderColor: freeTheme.border }}
    >
      <Icon name="lucide:chevron-down" size={15} className="text-gray-400 shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="flex-1 bg-transparent py-3 text-[12.5px] font-semibold focus:outline-none appearance-none cursor-pointer text-center"
        style={{ color: freeTheme.navy }}
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon name="lucide:chevron-down" size={15} className="text-gray-400 shrink-0 opacity-0" />
    </span>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  const tone = tones[agent.categoryTone];
  const free = agent.access === 'free';

  return (
    <article
      data-tilt
      className="group bg-white rounded-2xl border p-4 pt-9 flex flex-col text-center relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60"
      style={{ borderColor: freeTheme.border }}
    >
      <span
        className="absolute top-3 left-3 text-[10.5px] font-bold px-2.5 py-1 rounded-md text-white"
        style={{ backgroundColor: free ? '#16A34A' : '#F97316' }}
      >
        {free ? 'رایگان' : 'ویژه'}
      </span>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={agent.avatar}
        alt=""
        loading="lazy"
        className="w-[74px] h-[74px] mx-auto mb-4 rounded-full object-cover transition-transform group-hover:scale-105"
      />

      <h3 className="text-[13.5px] font-black leading-7 mb-2">
        <Link
          href={`/agents/${agent.id}`}
          className="transition-colors group-hover:text-orange-500"
          style={{ color: freeTheme.navy }}
        >
          {agent.title}
        </Link>
      </h3>

      <p className="text-[11.5px] text-gray-500 leading-7 mb-4">{agent.desc}</p>

      <span
        className="self-center text-[10.5px] font-bold px-3 py-1.5 rounded-lg mb-4"
        style={{ color: tone.text, backgroundColor: tone.bg }}
      >
        {agent.category}
      </span>

      <Link
        href={`/agents/${agent.id}`}
        className="mt-auto flex items-center justify-center gap-1.5 border rounded-xl py-2.5 text-[11.5px] font-bold transition-colors"
        style={
          free
            ? { color: '#16A34A', borderColor: '#A6DFC0' }
            : { color: '#6D28D9', borderColor: '#CDBEF5' }
        }
      >
        <span>{free ? 'استفاده از ایجنت' : 'مشاهده جزئیات'}</span>
        <Icon name="lucide:external-link" size={13} />
      </Link>
    </article>
  );
}

/** The mockups draw pagination left-to-right, so the nav opts out of RTL. */
function Pager() {
  const cell =
    'w-10 h-10 flex items-center justify-center rounded-xl border text-[13px] font-bold transition-colors';
  return (
    <nav
      dir="ltr"
      className="flex items-center justify-center gap-2 mt-8 flex-wrap"
      aria-label="صفحه‌بندی"
    >
      <button
        aria-label="صفحه قبل"
        className={`${cell} bg-white hover:border-orange-300`}
        style={{ borderColor: freeTheme.border }}
      >
        <Icon name="lucide:chevron-left" size={16} style={{ backgroundColor: freeTheme.navy }} />
      </button>

      {['1', '2', '3', '4', '…', '10'].map((n, i) =>
        n === '…' ? (
          <span key="gap" className="w-8 text-center text-gray-400">
            …
          </span>
        ) : (
          <button
            key={n}
            aria-current={i === 0 ? 'page' : undefined}
            className={cell}
            style={
              i === 0
                ? { backgroundColor: freeTheme.navy, borderColor: freeTheme.navy, color: '#fff' }
                : { backgroundColor: '#fff', borderColor: freeTheme.border, color: freeTheme.navy }
            }
          >
            {n}
          </button>
        )
      )}

      <button
        aria-label="صفحه بعد"
        className={`${cell} bg-white hover:border-orange-300`}
        style={{ borderColor: freeTheme.border }}
      >
        <Icon name="lucide:chevron-right" size={16} style={{ backgroundColor: freeTheme.navy }} />
      </button>
    </nav>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
