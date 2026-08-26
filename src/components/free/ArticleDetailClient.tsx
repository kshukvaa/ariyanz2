'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Stars } from '@/components/free/FreeBits';
import { freeTheme, tones } from '@/data/free';
import {
  accessTabs,
  aiAgentPanel,
  type AccessTab,
  type ArticleDetail,
  type ResourceColumn,
} from '@/data/articles';

/* ──────────────────────────────────────────────────────────────
   A single article. Everything is driven by `article`, so every
   id in the catalogue renders this exact layout.
────────────────────────────────────────────────────────────── */

export default function ArticleDetailClient({ article }: { article: ArticleDetail }) {
  /* The access tabs sit above the article body in the mockup; they filter
     the "مقالات مرتبط" rail, the only access-bearing list on the page. */
  const [tab, setTab] = useState<AccessTab>('all');
  const related = article.related.filter((a) => tab === 'all' || a.access === tab);

  return (
    <div style={{ backgroundColor: freeTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        <Hero article={article} />

        <div className="grid lg:grid-cols-[280px_1fr] gap-5 items-start">
          <aside className="order-2 lg:order-1 space-y-5 lg:sticky lg:top-28">
            <AuthorCard article={article} />
            <AgentPanel article={article} />
            <RelatedArticles items={related} />
          </aside>

          <main className="order-1 lg:order-2 space-y-5">
            <div className="grid xl:grid-cols-[1fr_230px] gap-5 items-start">
              <Body article={article} tab={tab} onTab={setTab} />
              <SideRail article={article} />
            </div>

            <RelatedResources columns={article.resources} />
          </main>
        </div>

        <Feedback article={article} />
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */

function Hero({ article }: { article: ArticleDetail }) {
  const tone = tones[article.categoryTone];
  return (
    <section
      className="rounded-3xl overflow-hidden bg-white border grid lg:grid-cols-2"
      style={{ borderColor: freeTheme.border }}
    >
      {/* Copy first so it takes the right-hand column under RTL. */}
      <div className="order-1 px-6 sm:px-8 py-7 text-right">
        <span
          className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-lg mb-4"
          style={{ color: tone.text, backgroundColor: tone.bg }}
        >
          {article.category}
        </span>

        <h1
          className="text-[22px] sm:text-[28px] font-black leading-[1.7] mb-4"
          style={{ color: freeTheme.navy }}
        >
          {article.title}
        </h1>

        <p className="text-[13px] text-gray-500 leading-9 mb-6">{article.excerpt}</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.author.avatar}
              alt=""
              className="w-7 h-7 rounded-full object-cover bg-gray-100"
            />
            <span className="text-[12px] text-gray-600">نویسنده: {article.author.name}</span>
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-gray-500">
            <Icon name="lucide:calendar" size={14} className="text-gray-400" />
            <span dir="ltr">{article.date}</span>
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-gray-500">
            <Icon name="lucide:eye" size={14} className="text-gray-400" />
            <span>
              <span dir="ltr">{article.views}</span> مشاهده
            </span>
          </span>
        </div>
      </div>

      <div className="order-2 min-h-[200px] bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.hero} alt="" className="w-full h-full object-cover" />
      </div>
    </section>
  );
}

/* ── Article body ───────────────────────────────────────────── */

function Body({
  article,
  tab,
  onTab,
}: {
  article: ArticleDetail;
  tab: AccessTab;
  onTab: (t: AccessTab) => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl border p-6"
      style={{ borderColor: freeTheme.border }}
    >
      {/* Access tabs — centred, as in the mockup */}
      <div className="flex items-center justify-center gap-2 mb-5">
        {accessTabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTab(t.id)}
              aria-pressed={on}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[12.5px] font-bold border transition-all"
              style={
                on
                  ? { backgroundColor: freeTheme.navy, borderColor: freeTheme.navy, color: '#fff' }
                  : { backgroundColor: '#fff', borderColor: freeTheme.border, color: freeTheme.navy }
              }
            >
              {'icon' in t && t.icon && (
                <Icon
                  name={t.icon}
                  size={14}
                  style={{ backgroundColor: on ? '#fff' : freeTheme.orange }}
                />
              )}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {article.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] text-gray-500 px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: '#F3F4FB' }}
          >
            {t}
          </span>
        ))}
      </div>

      {article.sections.map((s) => (
        <section key={s.id} id={s.id} className="mb-7 last:mb-0 scroll-mt-32">
          <h2
            className="flex items-center gap-2 text-[16px] font-black mb-3"
            style={{ color: freeTheme.navy }}
          >
            <span className="text-[18px] leading-none" style={{ color: freeTheme.orange }}>
              ❯
            </span>
            <span>{s.title}</span>
          </h2>

          {s.paragraphs.map((p) => (
            <p key={p} className="text-[13px] text-gray-600 leading-9 mb-3 last:mb-0 text-right">
              {p}
            </p>
          ))}

          {s.id === 'steps' && <ProcessDiagram steps={article.steps} />}
        </section>
      ))}
    </div>
  );
}

function ProcessDiagram({ steps }: { steps: ArticleDetail['steps'] }) {
  return (
    <>
      <p className="text-[13px] text-gray-600 leading-9 mb-5 text-right">{steps.intro}</p>

      {/* Fixed-width tiles with short connectors, so five steps still fit
          the article column without wrapping. */}
      <ol className="flex flex-wrap justify-center gap-y-6">
        {steps.items.map((s, i) => {
          const tone = tones[s.tone];
          return (
            <li key={s.title} className="flex items-start shrink-0">
              <div className="w-[88px] sm:w-[96px] px-1 text-center">
                <span
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center border-2 bg-white"
                  style={{ borderColor: tone.ring }}
                >
                  <Icon name={s.icon} size={20} style={{ backgroundColor: tone.text }} />
                </span>
                <span className="block text-[10.5px] text-gray-600 leading-5">{s.title}</span>
              </div>
              {i < steps.items.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden sm:block w-3 mt-6 border-t-2 border-dotted shrink-0"
                  style={{ borderColor: '#D8DDF0' }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}

/* ── Left rail: contents, PDF, share ────────────────────────── */

function SideRail({ article }: { article: ArticleDetail }) {
  const shares = [
    { icon: 'lucide:printer', label: 'چاپ', color: '#6B7280' },
    { icon: 'mdi:whatsapp', label: 'واتساپ', color: '#25D366' },
    { icon: 'mdi:telegram', label: 'تلگرام', color: '#2AABEE' },
    { icon: 'mdi:linkedin', label: 'لینکدین', color: '#0A66C2' },
    { icon: 'lucide:link-2', label: 'کپی لینک', color: '#4F46E5' },
  ];

  return (
    <div className="space-y-4 xl:sticky xl:top-28">
      <nav
        className="bg-white rounded-2xl border p-4"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-3 text-right" style={{ color: freeTheme.navy }}>
          فهرست مطالب
        </h2>
        <ul>
          {article.sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`flex items-center gap-2 py-2.5 text-right transition-colors ${
                  i === 0 ? 'font-bold' : 'text-gray-600 hover:text-orange-500'
                }`}
                style={i === 0 ? { color: freeTheme.orange } : undefined}
              >
                {i === 0 ? (
                  <span
                    className="w-[7px] h-[7px] rotate-45 shrink-0"
                    style={{ backgroundColor: freeTheme.orange }}
                  />
                ) : (
                  <span className="w-[7px] shrink-0" />
                )}
                <span className="flex-1 text-[12px] leading-6">{s.title}</span>
                {i > 0 && <span className="text-[11px] text-gray-400 shrink-0">{i}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="w-full flex items-center gap-3 rounded-2xl border p-4 text-right transition-colors hover:border-orange-300"
        style={{ borderColor: '#DDD9F7', backgroundColor: '#F7F6FE' }}
      >
        <Icon name="lucide:file-down" size={22} style={{ backgroundColor: '#4F46E5' }} />
        <span className="flex-1">
          <span className="block text-[13px] font-black" style={{ color: freeTheme.navy }}>
            دانلود نسخه PDF
          </span>
          <span className="block text-[11px] text-gray-500">دریافت این مقاله</span>
        </span>
        <Icon name="lucide:download" size={20} style={{ backgroundColor: '#4F46E5' }} />
      </button>

      <div className="bg-white rounded-2xl border p-4" style={{ borderColor: freeTheme.border }}>
        <h2
          className="flex items-center gap-2 text-[13px] font-black mb-4"
          style={{ color: freeTheme.navy }}
        >
          <span className="flex-1 text-right">اشتراک‌گذاری این مقاله</span>
          <Icon name="lucide:chevron-left" size={14} className="text-gray-400" />
        </h2>
        <div className="flex items-center justify-between">
          {shares.map((s) => (
            <button
              key={s.label}
              aria-label={s.label}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#F5F6FB' }}
            >
              <Icon name={s.icon} size={17} style={{ backgroundColor: s.color }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Right rail ─────────────────────────────────────────────── */

function AuthorCard({ article }: { article: ArticleDetail }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
      <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
        درباره نویسنده
      </h2>

      {/* Text right, portrait left — first child wins the right side. */}
      <div className="flex items-start gap-4">
        <div className="flex-1 text-right min-w-0">
          <p className="text-[13.5px] font-black mb-2" style={{ color: freeTheme.navy }}>
            {article.author.name}
          </p>
          <p className="text-[11.5px] text-gray-500 leading-7">{article.author.role}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.author.avatar}
          alt=""
          className="w-16 h-16 rounded-full object-cover bg-gray-100 shrink-0"
        />
      </div>

      <Link
        href="/articles"
        className="block text-[12px] font-bold mt-4"
        style={{ color: freeTheme.blue }}
      >
        + مشاهده سایر نوشته‌ها
      </Link>
    </section>
  );
}

function AgentPanel({ article }: { article: ArticleDetail }) {
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState('');

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-white rounded-2xl border p-4 text-[13px] font-bold transition-colors hover:border-orange-300"
        style={{ borderColor: freeTheme.border, color: freeTheme.navy }}
      >
        <Icon name="lucide:bot" size={17} style={{ backgroundColor: '#4F46E5' }} />
        <span>{aiAgentPanel.title}</span>
      </button>
    );
  }

  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
      {/* Close sits right, badge and title left — matching the mockup. */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <button
          onClick={() => setOpen(false)}
          aria-label="بستن دستیار"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="lucide:x" size={16} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-[13px] font-black" style={{ color: '#4F46E5' }}>
              {aiAgentPanel.title}
            </p>
            <p className="flex items-center gap-1.5 text-[11px] text-emerald-600">
              <span>{aiAgentPanel.status}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </p>
          </div>
          <Icon name="lucide:bot" size={30} style={{ backgroundColor: '#4F46E5' }} />
        </div>
      </div>

      <p className="bg-gray-100 rounded-2xl px-4 py-3 text-[12px] leading-7 text-right ml-6 mb-4 text-gray-700">
        {aiAgentPanel.greeting}
      </p>

      <div className="space-y-2.5 mb-4">
        {article.suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setDraft(s)}
            className="w-full rounded-xl border py-3 text-[12.5px] font-bold transition-colors hover:bg-indigo-50"
            style={{ borderColor: '#DDD9F7', color: '#4F46E5' }}
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2"
      >
        <button
          type="submit"
          aria-label="ارسال پرسش"
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#4F46E5' }}
        >
          <Icon name="lucide:send" size={17} className="text-white" />
        </button>
        <span
          className="flex-1 flex items-center gap-2 border rounded-xl px-3"
          style={{ borderColor: freeTheme.border }}
        >
          <Icon name="lucide:user-round" size={16} className="text-gray-400 shrink-0" />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={aiAgentPanel.placeholder}
            aria-label={aiAgentPanel.placeholder}
            className="flex-1 bg-transparent py-2.5 text-[12px] focus:outline-none text-right min-w-0"
          />
        </span>
      </form>

      <p className="text-[10.5px] text-gray-400 text-center mt-3" dir="ltr">
        {aiAgentPanel.footer}
      </p>
    </section>
  );
}

function RelatedArticles({ items }: { items: ArticleDetail['related'] }) {
  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
      <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
        مقالات مرتبط
      </h2>

      {items.length === 0 ? (
        <p className="text-[12px] text-gray-400 text-center py-4">
          مقاله‌ای با این فیلتر یافت نشد
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((a) => (
            <li key={a.id}>
              {/* Thumbnail right, text left. */}
              <Link href={`/articles/${a.id}`} className="group flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.thumb}
                  alt=""
                  loading="lazy"
                  className="w-[72px] h-12 rounded-lg object-cover bg-gray-100 shrink-0 order-2"
                />
                <span className="flex-1 min-w-0 text-right order-1">
                  <span
                    className="block text-[12px] font-bold leading-6 line-clamp-2 transition-colors group-hover:text-orange-500"
                    style={{ color: freeTheme.navy }}
                  >
                    {a.title}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10.5px] text-gray-400 mt-1">
                    <Icon name="lucide:clock" size={11} />
                    <span dir="ltr">{a.date}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/articles"
        className="block text-[12px] font-bold mt-4 text-center"
        style={{ color: freeTheme.blue }}
      >
        + مشاهده همه مقالات
      </Link>
    </section>
  );
}

/* ── Related resources ──────────────────────────────────────── */

function RelatedResources({ columns }: { columns: ResourceColumn[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {columns.map((c) => {
        const tone = tones[c.tone];
        return (
          <section
            key={c.title}
            className="rounded-2xl border p-4 flex flex-col"
            style={{ backgroundColor: tone.soft, borderColor: tone.ring }}
          >
            <h3
              className="text-[12.5px] font-black text-center mb-4 leading-6"
              style={{ color: tone.text }}
            >
              {c.title}
            </h3>

            {c.courses ? (
              <ul className="space-y-3 mb-4">
                {c.courses.map((course) => (
                  <li key={course.title} className="flex items-center gap-2.5">
                    <span className="flex-1 min-w-0 text-right">
                      <span
                        className="block text-[11px] font-bold leading-5"
                        style={{ color: freeTheme.navy }}
                      >
                        {course.title}
                      </span>
                      <span className="flex items-center justify-end gap-1 text-[10px] text-gray-500 mt-0.5">
                        <span>{course.meta}</span>
                        <Icon name="lucide:play" size={9} style={{ backgroundColor: tone.text }} />
                      </span>
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.thumb}
                      alt=""
                      loading="lazy"
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3.5 mb-4">
                {c.items.map((it) => (
                  /* Text right, glyph left. */
                  <li key={it} className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-gray-600 leading-6 text-right">{it}</span>
                    <Icon
                      name="lucide:shapes"
                      size={15}
                      className="shrink-0"
                      style={{ backgroundColor: tone.text }}
                    />
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={c.href}
              className="mt-auto flex items-center justify-center gap-1.5 text-[11.5px] font-bold pt-3 border-t"
              style={{ color: tone.text, borderColor: tone.ring }}
            >
              <span>مشاهده همه</span>
              <Icon name="lucide:users-round" size={13} />
            </Link>
          </section>
        );
      })}
    </div>
  );
}

/* ── Ratings and comments ───────────────────────────────────── */

function Feedback({ article }: { article: ArticleDetail }) {
  const [sent, setSent] = useState(false);
  const [score, setScore] = useState(article.rating.stars);

  return (
    <section className="bg-white rounded-2xl border p-5" style={{ borderColor: freeTheme.border }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest comments — right */}
        <ul className="space-y-5">
          {article.comments.map((c) => (
            <li key={c.name} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.avatar}
                alt=""
                className="w-9 h-9 rounded-full object-cover bg-gray-100 shrink-0"
              />
              <div className="shrink-0 text-right w-[92px]">
                <p className="text-[12px] font-bold" style={{ color: freeTheme.navy }}>
                  {c.name}
                </p>
                <p className="text-[10px] text-gray-400 leading-5">{c.role}</p>
                <p className="text-[10px] text-gray-400">{c.ago}</p>
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[11.5px] text-gray-600 leading-7 mb-1">{c.text}</p>
                <Stars value={c.stars} size={12} />
              </div>
            </li>
          ))}
        </ul>

        {/* Comment form — middle */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <button className="text-[11.5px] font-bold" style={{ color: freeTheme.blue }}>
              + مشاهده نظرات
            </button>
            <h2 className="text-[14px] font-black" style={{ color: freeTheme.navy }}>
              نظرات کاربران ({article.commentCount})
            </h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div
              className="flex items-start gap-2 rounded-xl px-3 py-3 mb-3"
              style={{ backgroundColor: '#F5F6FB' }}
            >
              <Icon name="lucide:user-round" size={16} className="text-gray-400 shrink-0 mt-1" />
              <textarea
                required
                rows={2}
                placeholder="نظر خود را بنویسید."
                aria-label="نظر شما"
                className="flex-1 bg-transparent text-[12px] leading-7 resize-none focus:outline-none text-right min-w-0"
              />
            </div>

            <button
              type="submit"
              data-ripple
              className="rounded-xl px-6 py-2.5 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: freeTheme.navy }}
            >
              ارسال نظر
            </button>

            {sent && (
              <p className="text-[11.5px] text-emerald-600 mt-3">
                نظر شما ثبت شد و پس از بررسی منتشر می‌شود.
              </p>
            )}
          </form>
        </div>

        {/* Your rating — left */}
        <div
          className="rounded-2xl border p-5 text-center"
          style={{ borderColor: freeTheme.border }}
        >
          <h2 className="text-[13.5px] font-black mb-5" style={{ color: freeTheme.navy }}>
            امتیاز شما به این مقاله
          </h2>

          <div className="flex items-center justify-center gap-1.5 mb-4" dir="ltr">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setScore(n)}
                aria-label={`${n} ستاره`}
                className="transition-transform hover:scale-110"
              >
                <Icon
                  name="lucide:star"
                  size={30}
                  style={{ backgroundColor: n <= score ? freeTheme.orange : '#D6DAE6' }}
                />
              </button>
            ))}
          </div>

          <p className="text-[11.5px] text-gray-500">
            امتیاز شما {toPersian(score)} از ۵
            <span className="text-gray-400"> ({article.rating.count} رأی)</span>
          </p>
        </div>
      </div>

      <button
        className="flex items-center justify-center gap-1.5 text-[12px] font-bold mx-auto mt-6 pt-4"
        style={{ color: freeTheme.navy }}
      >
        <span>مشاهده همه نظرات</span>
        <Icon name="lucide:chevron-down" size={14} />
      </button>
    </section>
  );
}

const toPersian = (n: number) => '۰۱۲۳۴۵۶۷۸۹'[n] ?? String(n);
