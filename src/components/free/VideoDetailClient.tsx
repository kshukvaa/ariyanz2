'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { Stars, VideoCard } from '@/components/free/FreeBits';
import {
  freeTheme,
  tones,
  aiPanel,
  aiTools,
  toLatinNumber,
  type FreeVideoDetail,
} from '@/data/free';

/* ──────────────────────────────────────────────────────────────
   The single free-video page. Everything is driven by `video`,
   so every id in the catalogue renders this exact layout.
────────────────────────────────────────────────────────────── */

export default function VideoDetailClient({ video }: { video: FreeVideoDetail }) {
  return (
    <div style={{ backgroundColor: freeTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <Header video={video} />
        <About video={video} />
        <Assistant video={video} />
        <RelatedResources video={video} />
        <PathStepper video={video} />
        <RelatedVideos video={video} />
        <Feedback video={video} />
      </div>
    </div>
  );
}

/* ── 1 · Player + headline ──────────────────────────────────── */

function Header({ video }: { video: FreeVideoDetail }) {
  /* No media source is wired yet — the control bar mirrors the mockup
     and the button only toggles its own icon. */
  const [playing, setPlaying] = useState(false);

  const meta = [
    { icon: 'lucide:clock', label: video.date },
    { icon: 'lucide:calendar', label: `${video.views} بازدید` },
    { icon: 'lucide:clock', label: video.minutes },
  ];

  return (
    <section className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
      {/* Copy — first child sits right under RTL */}
      <div className="order-2 lg:order-1 text-right">
        <div className="flex flex-wrap gap-2 mb-5">
          {video.tags.map((t) => (
            <span
              key={t}
              className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg"
              style={{ color: freeTheme.navy, backgroundColor: '#EDEFF9' }}
            >
              # {t}
            </span>
          ))}
        </div>

        <h1
          className="text-[22px] sm:text-[28px] font-black leading-[1.6] mb-4"
          style={{ color: freeTheme.navy }}
        >
          {video.title}
        </h1>

        <p className="text-[13px] text-gray-500 leading-9 mb-6">{video.summary}</p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          {meta.map((m) => (
            <span
              key={m.label}
              className="flex items-center gap-1.5 text-[12.5px] text-gray-500"
            >
              <Icon name={m.icon} size={15} className="text-gray-400" />
              <span dir="auto">{m.label}</span>
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/organization"
            className="flex items-center justify-center gap-2 border rounded-xl px-5 py-3 text-[13px] font-bold bg-white transition-colors hover:border-orange-300"
            style={{ borderColor: freeTheme.border, color: freeTheme.navy }}
          >
            <Icon name="lucide:briefcase" size={16} />
            <span>درخواست مشاوره سازمانی</span>
          </Link>
          <Link
            href="/videos"
            data-ripple
            className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13px] font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-200"
            style={{ backgroundColor: freeTheme.orange }}
          >
            <Icon name="lucide:layers" size={16} className="text-white" />
            <span>مشاهده مرتبط با این موضوع</span>
          </Link>
        </div>
      </div>

      {/* Player */}
      <div className="order-1 lg:order-2">
        <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl shadow-gray-300/40">
          <div className="relative aspect-[16/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* contain, not cover: posters are wider than 16:9 and carry
                artwork at the edges that a crop would cut off. */}
            <img
              src={video.poster}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'توقف' : 'پخش ویدئو'}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <span
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                style={{ backgroundColor: freeTheme.orange }}
              >
                <Icon
                  name={playing ? 'lucide:pause' : 'lucide:play'}
                  size={26}
                  className="text-white"
                />
              </span>
            </button>
          </div>

          {/* Control bar */}
          <div className="bg-[#101010] px-3 pt-2 pb-2.5">
            <div className="h-1 rounded-full bg-white/20 mb-2.5 overflow-hidden" dir="ltr">
              <span
                className="block h-full rounded-full"
                style={{ width: '4%', backgroundColor: freeTheme.orange }}
              />
            </div>
            <div className="flex items-center gap-3 text-white/70" dir="ltr">
              <button onClick={() => setPlaying((p) => !p)} aria-label="پخش">
                <Icon name={playing ? 'lucide:pause' : 'lucide:play'} size={15} />
              </button>
              <Icon name="lucide:skip-forward" size={15} />
              <Icon name="lucide:volume-2" size={15} />
              <Icon name="lucide:volume-2" size={15} />
              <span className="text-[11px] tabular-nums">00:00 / {video.duration}</span>
              <span className="flex-1" />
              <Icon name="lucide:settings" size={15} />
              <Icon name="lucide:maximize" size={15} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2 · About ──────────────────────────────────────────────── */

function About({ video }: { video: FreeVideoDetail }) {
  return (
    <section
      className="bg-white rounded-2xl border p-6"
      style={{ borderColor: freeTheme.border }}
    >
      <h2
        className="flex items-center gap-2 text-[15px] font-black mb-4"
        style={{ color: freeTheme.navy }}
      >
        <Icon name="lucide:info" size={17} style={{ backgroundColor: freeTheme.blue }} />
        <span>درباره این ویدئو</span>
      </h2>
      {video.about.map((p) => (
        <p key={p} className="text-[13px] text-gray-500 leading-9 mb-3 last:mb-0">
          {p}
        </p>
      ))}
    </section>
  );
}

/* ── 3 · AI assistant ───────────────────────────────────────── */

function Assistant({ video }: { video: FreeVideoDetail }) {
  const [draft, setDraft] = useState('');

  return (
    <section className="grid lg:grid-cols-[1fr_340px] gap-5">
      {/* Chat panel — right under RTL */}
      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: freeTheme.border, backgroundColor: '#FAFAFE' }}
      >
        <h2
          className="flex items-center gap-2 text-[15px] font-black mb-4"
          style={{ color: freeTheme.navy }}
        >
          <Icon name="lucide:sparkles" size={17} style={{ backgroundColor: freeTheme.blue }} />
          <span>{aiPanel.title}</span>
        </h2>

        <div className="flex items-start gap-3 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aiPanel.avatar}
            alt=""
            className="w-14 h-14 rounded-full bg-white object-contain shrink-0 border"
            style={{ borderColor: freeTheme.border }}
          />
          <div
            className="flex-1 bg-white rounded-2xl rounded-tr-sm border px-4 py-3"
            style={{ borderColor: freeTheme.border }}
          >
            {aiPanel.greeting.map((g) => (
              <p
                key={g}
                className="text-[13px] font-semibold leading-8"
                style={{ color: freeTheme.navy }}
              >
                {g}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {video.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setDraft(s)}
              className="bg-white border rounded-xl px-3.5 py-2 text-[11.5px] text-gray-600 transition-colors hover:border-orange-300 hover:text-orange-600"
              style={{ borderColor: freeTheme.border }}
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2 bg-white border rounded-2xl p-2"
          style={{ borderColor: freeTheme.border }}
        >
          <button
            type="submit"
            aria-label="ارسال پرسش"
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
            style={{ backgroundColor: freeTheme.blue }}
          >
            <Icon name="lucide:send" size={18} className="text-white" />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={aiPanel.placeholder}
            aria-label={aiPanel.placeholder}
            className="flex-1 bg-transparent text-[13px] px-2 focus:outline-none text-right"
          />
          <span
            className="flex items-center gap-1.5 border rounded-xl px-3 py-2.5 shrink-0"
            style={{ borderColor: freeTheme.border }}
          >
            <Icon name="lucide:paperclip" size={15} className="text-gray-400" />
            <Icon name="lucide:mic" size={15} className="text-gray-400" />
          </span>
        </form>

        <p className="text-[11px] text-gray-400 text-center mt-3">{aiPanel.disclaimer}</p>
      </div>

      {/* Capability cards */}
      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: freeTheme.border, backgroundColor: '#fff' }}
      >
        <h2
          className="flex items-center gap-2 text-[14px] font-black mb-4"
          style={{ color: freeTheme.navy }}
        >
          <Icon name="lucide:wand-sparkles" size={16} style={{ backgroundColor: freeTheme.blue }} />
          <span>{aiPanel.toolsTitle}</span>
        </h2>

        <div className="space-y-3">
          {aiTools.map((t) => {
            const tone = tones[t.tone];
            return (
              <button
                key={t.title}
                className="w-full flex items-center gap-3 border rounded-2xl p-3 text-right transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-200/60"
                style={{ borderColor: freeTheme.border, backgroundColor: '#fff' }}
              >
                <Icon name="lucide:chevron-left" size={16} className="text-gray-300 shrink-0" />
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-black mb-1" style={{ color: tone.text }}>
                    {t.title}
                  </span>
                  <span className="block text-[11.5px] text-gray-500 leading-6">{t.desc}</span>
                </span>
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: tone.text }}
                >
                  <Icon name={t.icon} size={20} className="text-white" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 4 · Related resources ──────────────────────────────────── */

function RelatedResources({ video }: { video: FreeVideoDetail }) {
  return (
    <section
      className="bg-white rounded-2xl border p-5"
      style={{ borderColor: freeTheme.border }}
    >
      <h2
        className="flex items-center gap-2 text-[15px] font-black mb-5"
        style={{ color: freeTheme.navy }}
      >
        <Icon name="lucide:layers" size={17} style={{ backgroundColor: freeTheme.blue }} />
        <span>منابع مرتبط با این ویدئو</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {video.resources.map((g) => {
          const tone = tones[g.tone];
          return (
            <div
              key={g.title}
              className="rounded-2xl border p-4 flex flex-col"
              style={{ backgroundColor: tone.soft, borderColor: tone.ring }}
            >
              <h3 className="flex items-center gap-2.5 mb-4">
                <span className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name={g.icon} size={17} style={{ backgroundColor: tone.text }} />
                </span>
                <span className="text-[13px] font-black" style={{ color: tone.text }}>
                  {g.title}
                </span>
              </h3>

              <ul className="space-y-2.5 mb-4">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <Icon
                      name="lucide:bookmark"
                      size={13}
                      className="shrink-0 mt-1"
                      style={{ backgroundColor: tone.text }}
                    />
                    <span className="text-[11.5px] text-gray-600 leading-6 text-right">{it}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={g.href}
                className="group mt-auto flex items-center justify-center gap-1.5 text-[12px] font-bold pt-3 border-t"
                style={{ color: tone.text, borderColor: tone.ring }}
              >
                <span>مشاهده همه</span>
                <Icon
                  name="lucide:chevron-left"
                  size={14}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── 5 · Learning path ──────────────────────────────────────── */

function PathStepper({ video }: { video: FreeVideoDetail }) {
  const { path } = video;
  return (
    <section
      className="rounded-2xl border p-6"
      style={{ borderColor: freeTheme.border, backgroundColor: '#fff' }}
    >
      <h2
        className="text-[15px] font-black mb-6 text-right"
        style={{ color: freeTheme.navy }}
      >
        {path.title}
      </h2>

      {/* RTL row: steps on the right, summary card on the left. */}
      <div className="flex flex-col xl:flex-row gap-6 items-center">
        {/* Steps — rendered right-to-left with arrows between */}
        <ol className="flex-1 flex flex-wrap justify-center xl:justify-start items-start gap-y-6 w-full">
          {path.steps.map((s, i) => (
            <li key={s.step} className="flex items-start shrink-0">
              <div className="w-[104px] sm:w-[124px] text-center px-1">
                <span
                  className="w-14 h-14 mx-auto mb-3 rounded-full bg-white border-2 flex items-center justify-center shadow-sm"
                  style={{ borderColor: '#DEE3F6' }}
                >
                  <Icon name={s.icon} size={22} style={{ backgroundColor: freeTheme.blue }} />
                </span>
                <span
                  className="block text-[11.5px] font-bold mb-1"
                  style={{ color: freeTheme.navy }}
                >
                  {s.step}
                </span>
                <span className="block text-[11px] text-gray-500 leading-6">{s.title}</span>
              </div>
              {i < path.steps.length - 1 && (
                <Icon
                  name="lucide:arrow-left"
                  size={16}
                  className="text-gray-300 mt-5 shrink-0 hidden sm:block"
                />
              )}
            </li>
          ))}
        </ol>

        {/* Summary card */}
        <div
          className="w-full xl:w-[230px] shrink-0 rounded-2xl border p-4"
          style={{ borderColor: freeTheme.border, backgroundColor: '#FAFAFE' }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span
              className="flex items-center gap-1.5 text-[11.5px] font-bold"
              style={{ color: freeTheme.navy }}
            >
              <Icon name="lucide:list-checks" size={14} />
              <span>تعداد مراحل</span>
            </span>
            <span className="text-[11.5px] text-gray-500">{path.steps.length} مرحله</span>
          </div>
          <div
            className="flex items-center justify-between mb-4 pb-4 border-b"
            style={{ borderColor: freeTheme.border }}
          >
            <span
              className="flex items-center gap-1.5 text-[11.5px] font-bold"
              style={{ color: freeTheme.navy }}
            >
              <Icon name="lucide:clock" size={14} />
              <span>مدت مسیر</span>
            </span>
            <span className="text-[11.5px] text-gray-500">{path.duration}</span>
          </div>

          <Link
            href={path.href}
            data-ripple
            className="group flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#4338CA' }}
          >
            <Icon name="lucide:circle-play" size={16} className="text-white" />
            <span>شروع مسیر یادگیری</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 6 · Related videos ─────────────────────────────────────── */

function RelatedVideos({ video }: { video: FreeVideoDetail }) {
  const rail = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: 'smooth' });

  const arrow =
    'absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border shadow-md flex items-center justify-center transition-colors hover:border-orange-300';

  return (
    <section>
      <h2
        className="flex items-center gap-2 text-[15px] font-black mb-4"
        style={{ color: freeTheme.navy }}
      >
        <Icon name="lucide:square-play" size={17} style={{ backgroundColor: freeTheme.blue }} />
        <span>ویدئوهای مرتبط</span>
      </h2>

      <div className="relative">
        {/* Arrows hug the rail edges, as in the mockup. */}
        <button
          onClick={() => scroll(-1)}
          aria-label="قبلی"
          className={`${arrow} -right-2`}
          style={{ borderColor: freeTheme.border }}
        >
          <Icon name="lucide:chevron-right" size={16} style={{ backgroundColor: freeTheme.navy }} />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="بعدی"
          className={`${arrow} -left-2`}
          style={{ borderColor: freeTheme.border }}
        >
          <Icon name="lucide:chevron-left" size={16} style={{ backgroundColor: freeTheme.navy }} />
        </button>

        <div ref={rail} className="ar-rail flex">
          {video.related.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              className="ar-rail-item w-[230px] sm:w-[240px] shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7 · Ratings, review form, latest reviews ───────────────── */

function Feedback({ video }: { video: FreeVideoDetail }) {
  const [sent, setSent] = useState(false);
  const { rating } = video;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Latest reviews — right */}
      <div
        className="bg-white rounded-2xl border p-5 flex flex-col"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
          آخرین نظرات کاربران
        </h2>

        <ul className="space-y-4 flex-1">
          {video.reviews.map((r) => (
            <li key={r.name} className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.avatar}
                alt=""
                className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-100"
              />
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[12.5px] font-bold" style={{ color: freeTheme.navy }}>
                  {r.name}
                </p>
                <p className="text-[10.5px] text-gray-400 mb-1.5">{r.role}</p>
                <p className="text-[11.5px] text-gray-600 leading-7">{r.text}</p>
              </div>
              <div className="shrink-0 text-left">
                <Stars value={r.stars} size={12} />
                <span className="block text-[10px] text-gray-400 mt-1" dir="ltr">
                  {r.date}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <button
          className="flex items-center justify-center gap-1.5 text-[12px] font-bold mt-4 pt-3 border-t"
          style={{ color: freeTheme.navy, borderColor: freeTheme.border }}
        >
          <span>مشاهده همه نظرات</span>
          <Icon name="lucide:chevron-down" size={14} />
        </button>
      </div>

      {/* Review form — middle */}
      <div
        className="bg-white rounded-2xl border p-5"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
          ثبت نظر و بازخورد
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <textarea
            required
            rows={4}
            placeholder="دیدگاه خود را درباره ویدئو بنویسید."
            aria-label="دیدگاه شما"
            className="w-full border rounded-xl p-3 text-[12.5px] leading-7 resize-none focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all mb-3"
            style={{ borderColor: freeTheme.border }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <input
              required
              placeholder="نام و نام خانوادگی"
              aria-label="نام و نام خانوادگی"
              className="border rounded-xl px-3 py-2.5 text-[12.5px] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              style={{ borderColor: freeTheme.border }}
            />
            <input
              type="email"
              placeholder="ایمیل (اختیاری)"
              aria-label="ایمیل"
              className="border rounded-xl px-3 py-2.5 text-[12.5px] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              style={{ borderColor: freeTheme.border }}
            />
          </div>

          <button
            type="submit"
            data-ripple
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-bold text-white transition-opacity hover:opacity-90 ms-auto"
            style={{ backgroundColor: '#4338CA' }}
          >
            <Icon name="lucide:send" size={15} className="text-white" />
            <span>ارسال نظر</span>
          </button>

          {sent && (
            <p className="text-[12px] text-emerald-600 mt-3">
              نظر شما ثبت شد و پس از بررسی منتشر می‌شود.
            </p>
          )}
        </form>
      </div>

      {/* Score breakdown — left */}
      <div
        className="bg-white rounded-2xl border p-5"
        style={{ borderColor: freeTheme.border }}
      >
        <h2 className="text-[14px] font-black mb-4 text-right" style={{ color: freeTheme.navy }}>
          امتیاز کاربران
        </h2>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11.5px] text-gray-400">({rating.count} نظر)</span>
          <Stars value={toLatinNumber(rating.score)} size={20} />
          <span className="text-[30px] font-black" style={{ color: freeTheme.navy }}>
            {rating.score}
          </span>
        </div>

        <ul className="space-y-2.5">
          {rating.bars.map((pct, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-[11.5px] text-gray-400 shrink-0">{5 - i} ستاره</span>
              <span className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden" dir="ltr">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: freeTheme.orange }}
                />
              </span>
              <span className="text-[11.5px] font-bold text-gray-500 w-9 tabular-nums shrink-0" dir="ltr">
                {pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
