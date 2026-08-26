'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { tones } from '@/data/free';
import { testTheme, testResult, type TestDetail } from '@/data/tests';

/* ──────────────────────────────────────────────────────────────
   The report. Two drawn figures carry it — a score ring and a
   five-axis radar — both plain SVG, both showing the reader's own
   shape against the average rather than a decorative gradient.
────────────────────────────────────────────────────────────── */

const GREEN = '#16A34A';

export default function TestResultClient({ test }: { test: TestDetail }) {
  return (
    <div style={{ backgroundColor: testTheme.page }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* RTL: score column first, so it lands on the right. */}
        <section className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-5 items-start">
          <div className="space-y-5">
            <ScoreCard />
            <AnalysisChat />
          </div>

          <Verdict />
        </section>

        <Breakdown />
        <Suggestions />
        <CtaBand test={test} />
        <Assurances />
      </div>
    </div>
  );
}

/* ── The verdict ────────────────────────────────────────────── */

function Verdict() {
  return (
    <section
      className="rounded-2xl border overflow-hidden grid md:grid-cols-[minmax(0,1fr)_260px]"
      style={{ borderColor: '#C9E9D5', background: 'linear-gradient(255deg,#E9F7EF 0%,#F4FBF7 60%,#FFFFFF 100%)' }}
    >
      <div className="order-1 px-6 py-8 text-right">
        <p className="flex items-center gap-2 text-[14px] font-bold mb-5" style={{ color: testTheme.navy }}>
          <Icon name="lucide:circle-check-big" size={20} style={{ backgroundColor: GREEN }} />
          <span>{testResult.title}</span>
        </p>

        <p className="text-[13px] text-gray-600 mb-2">{testResult.typeLabel}</p>
        <h1 className="text-[30px] sm:text-[38px] font-black mb-4" style={{ color: testTheme.violet }}>
          {testResult.type}
        </h1>
        <p className="text-[13px] text-gray-600 leading-9 mb-7">{testResult.summary}</p>

        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {testResult.facts.map((f) => (
            <div
              key={f.label}
              className="bg-white/80 rounded-xl border px-4 py-3 text-center"
              style={{ borderColor: '#D9EDE2' }}
            >
              <dt className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 mb-1.5">
                <Icon name={f.icon} size={13} style={{ backgroundColor: GREEN }} />
                <span>{f.label}</span>
              </dt>
              <dd className="text-[12.5px] font-bold" style={{ color: testTheme.navy }}>
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="order-2 flex items-center justify-center p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={testResult.art} alt="" className="w-full max-w-[240px]" />
      </div>
    </section>
  );
}

/* ── Score ring ─────────────────────────────────────────────── */

function ScoreCard() {
  const { value, of, level } = testResult.score;
  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <div className="bg-white rounded-2xl border p-5 text-center" style={{ borderColor: testTheme.border }}>
      <h2 className="text-[13.5px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
        امتیاز کل شما
      </h2>

      <svg viewBox="0 0 130 130" className="w-[142px] h-[142px] mx-auto mb-4" role="img" aria-label={`امتیاز ${value} از ${of}`}>
        <circle cx="65" cy="65" r={r} fill="none" stroke="#EDEFF6" strokeWidth="11" />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke={GREEN}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={`${(value / of) * c} ${c}`}
          transform="rotate(-90 65 65)"
        />
        <text x="65" y="62" textAnchor="middle" fontSize="30" fontWeight="900" fill={testTheme.navy}>
          {toPersian(value)}
        </text>
        <text x="65" y="82" textAnchor="middle" fontSize="12" fill="#8B93A8">
          از {toPersian(of)}
        </text>
      </svg>

      <span
        className="inline-block text-[11.5px] font-bold px-4 py-1.5 rounded-lg mb-4"
        style={{ backgroundColor: '#E7F7EF', color: '#0E8A4F' }}
      >
        {level}
      </span>

      <p className="text-[11.5px] text-gray-500 leading-7 mb-5 text-right">{testResult.scoreNote}</p>

      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <button
          className="flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[11.5px] font-bold transition-colors hover:border-violet-300"
          style={{ borderColor: testTheme.border, color: testTheme.navy }}
        >
          <Icon name="lucide:download" size={14} />
          <span>{testResult.downloadCta}</span>
        </button>
        <button
          className="flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[11.5px] font-bold transition-colors hover:border-violet-300"
          style={{ borderColor: testTheme.border, color: testTheme.navy }}
        >
          <Icon name="lucide:bookmark" size={14} />
          <span>{testResult.saveCta}</span>
        </button>
      </div>

      <p className="text-[11px] text-gray-500 mb-3 text-right">{testResult.shareLabel}</p>
      <ul className="flex items-center justify-center gap-2.5">
        {[
          { icon: 'lucide:link', label: 'کپی پیوند' },
          { icon: 'lucide:mail', label: 'ایمیل' },
          { icon: 'lucide:message-circle', label: 'واتساپ' },
          { icon: 'lucide:send', label: 'تلگرام' },
          { icon: 'mdi:linkedin', label: 'لینکدین' },
        ].map((s) => (
          <li key={s.label}>
            <button
              aria-label={s.label}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-violet-50"
              style={{ backgroundColor: '#F4F5FA' }}
            >
              <Icon name={s.icon} size={15} style={{ backgroundColor: '#5D6480' }} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Assistant reading of the result ────────────────────────── */

function AnalysisChat() {
  const chat = testResult.chat;

  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: '#E2DCF9', backgroundColor: '#F7F5FE' }}>
      <h2 className="flex items-center gap-2 text-[13.5px] font-black mb-2" style={{ color: testTheme.navy }}>
        <Icon name="lucide:sparkles" size={16} style={{ backgroundColor: testTheme.violet }} />
        <span>{chat.title}</span>
      </h2>
      <p className="text-[11.5px] text-gray-600 leading-7 mb-4 text-right">{chat.lead}</p>

      <ul className="space-y-2.5 mb-3">
        {chat.messages.map((m, i) => (
          <li
            key={i}
            className={`rounded-xl px-3.5 py-2.5 text-[11px] leading-7 whitespace-pre-line ${
              m.from === 'user' ? 'text-white ml-8' : 'mr-8 bg-white'
            }`}
            style={m.from === 'user' ? { backgroundColor: testTheme.violet } : { color: '#4B5568' }}
          >
            {m.text}
            <span className={`block text-[9px] mt-1 ${m.from === 'user' ? 'text-white/70' : 'text-gray-400'}`} dir="ltr">
              {m.time}
            </span>
          </li>
        ))}
      </ul>

      <span className="relative block">
        <input
          placeholder={chat.placeholder}
          aria-label={chat.placeholder}
          className="w-full bg-white border rounded-xl py-2.5 pr-3.5 pl-10 text-[11.5px] focus:outline-none focus:border-violet-400"
          style={{ borderColor: '#E2DCF9' }}
        />
        <Icon
          name="lucide:send"
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ backgroundColor: testTheme.violet }}
        />
      </span>
    </div>
  );
}

/* ── Strengths, growth areas, radar ─────────────────────────── */

function Breakdown() {
  return (
    <section>
      <h2 className="text-[16px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
        تحلیل اولیه رفتار و مهارت‌ها
      </h2>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
          <h3 className="flex items-center gap-2 text-[13.5px] font-black mb-4" style={{ color: GREEN }}>
            <Icon name="lucide:star" size={16} style={{ backgroundColor: GREEN }} />
            <span>نقاط قوت شما</span>
          </h3>
          <ul className="space-y-3">
            {testResult.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2.5">
                <Icon name="lucide:circle-check" size={15} className="shrink-0 mt-0.5" style={{ backgroundColor: GREEN }} />
                <span className="text-[12px] text-gray-600 leading-7 text-right">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
          <h3 className="flex items-center gap-2 text-[13.5px] font-black mb-4" style={{ color: '#EA6E0C' }}>
            <Icon name="lucide:trending-up" size={16} style={{ backgroundColor: '#EA6E0C' }} />
            <span>حوزه‌های قابل توسعه</span>
          </h3>
          <ul className="space-y-3">
            {testResult.growth.map((g) => (
              <li key={g} className="flex items-start gap-2.5">
                <Icon
                  name="lucide:triangle-alert"
                  size={15}
                  className="shrink-0 mt-0.5"
                  style={{ backgroundColor: '#F5A524' }}
                />
                <span className="text-[12px] text-gray-600 leading-7 text-right">{g}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: testTheme.border }}>
          <h3 className="text-[13.5px] font-black mb-2 text-right" style={{ color: testTheme.navy }}>
            نمودار توانمندی‌ها
          </h3>
          <Radar />
          <p className="flex items-center justify-center gap-5 text-[10.5px] text-gray-500 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 border-t-2 border-dashed" style={{ borderColor: '#B9BFD1' }} />
              <span>میانگین افراد</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-5 border-t-2" style={{ borderColor: testTheme.violet }} />
              <span>شما</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/** Five axes, the reader's shape over the average. */
function Radar() {
  const data = testResult.radar;
  const size = 230;
  const cx = size / 2;
  const cy = size / 2 + 6;
  const rMax = 74;

  const point = (i: number, value: number) => {
    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
    const r = (value / 100) * rMax;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };

  const path = (key: 'value' | 'avg') =>
    data.map((d, i) => point(i, d[key]).join(',')).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[250px] mx-auto" role="img" aria-label="نمودار توانمندی‌ها">
      {[0.25, 0.5, 0.75, 1].map((step) => (
        <polygon
          key={step}
          points={data.map((_, i) => point(i, step * 100).join(',')).join(' ')}
          fill="none"
          stroke="#E8EAF3"
        />
      ))}

      {data.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#EEF0F7" />;
      })}

      <polygon points={path('avg')} fill="none" stroke="#B9BFD1" strokeDasharray="4 4" />
      <polygon points={path('value')} fill="rgba(91,52,214,0.12)" stroke={testTheme.violet} strokeWidth="2" />

      {data.map((d, i) => {
        const [x, y] = point(i, d.value);
        return <circle key={d.label} cx={x} cy={y} r="3.2" fill={testTheme.violet} />;
      })}

      {data.map((d, i) => {
        const [x, y] = point(i, 128);
        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9.5"
            fontWeight="700"
            fill="#5D6480"
          >
            {d.label} {toPersian(d.value)}%
          </text>
        );
      })}
    </svg>
  );
}

/* ── What to do next ────────────────────────────────────────── */

function Suggestions() {
  return (
    <section>
      <h2 className="text-[16px] font-black mb-4 text-right" style={{ color: testTheme.navy }}>
        پیشنهادهای هوشمند آریاز بر اساس نتیجه شما
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {testResult.suggestions.map((c) => {
          const tone = tones[c.tone];
          return (
            <article
              key={c.title}
              className="rounded-2xl border p-4 flex flex-col"
              style={{ backgroundColor: tone.soft, borderColor: tone.ring }}
            >
              <h3 className="flex items-center gap-2 mb-4">
                <Icon name={c.icon} size={17} style={{ backgroundColor: tone.text }} />
                <span className="text-[12.5px] font-black" style={{ color: tone.text }}>
                  {c.title}
                </span>
              </h3>

              <ul className="space-y-3 mb-4">
                {c.items.map((it) => (
                  <li key={it.title} className="flex items-start gap-2.5">
                    {it.avatar ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={it.avatar}
                        alt=""
                        loading="lazy"
                        className="w-8 h-8 rounded-lg object-cover bg-white shrink-0"
                      />
                    ) : (
                      <span
                        className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0"
                        style={{ border: `1px solid ${tone.ring}` }}
                      >
                        <Icon name={c.icon} size={14} style={{ backgroundColor: tone.text }} />
                      </span>
                    )}

                    <span className="flex-1 text-right">
                      <span className="block text-[11px] font-bold leading-6" style={{ color: testTheme.navy }}>
                        {it.title}
                      </span>
                      {it.meta && <span className="block text-[9.5px] text-gray-500 mt-0.5">{it.meta}</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={c.href}
                className="group mt-auto flex items-center justify-center gap-1.5 text-[11.5px] font-bold py-2 transition-colors"
                style={{ color: tone.text }}
              >
                <span>{c.cta}</span>
                <Icon
                  name="lucide:arrow-left"
                  size={13}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ── Next step ──────────────────────────────────────────────── */

function CtaBand({ test }: { test: TestDetail }) {
  const cta = testResult.cta;

  return (
    <section
      className="rounded-2xl border px-6 py-7 flex flex-col lg:flex-row items-center gap-6"
      style={{ borderColor: '#E2DCF9', backgroundColor: '#F1EEFE' }}
    >
      <div className="flex-1 text-center lg:text-right order-1">
        <h2 className="text-[19px] font-black mb-3" style={{ color: testTheme.navy }}>
          {cta.title}
        </h2>
        <p className="text-[12.5px] text-gray-600 leading-8">{cta.desc}</p>
      </div>

      <div className="order-3 flex flex-col gap-3 shrink-0 w-full sm:w-auto">
        <Link
          href={cta.primary.href}
          data-ripple
          className="group flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: testTheme.violet }}
        >
          <Icon name="lucide:route" size={16} className="text-white" />
          <span>{cta.primary.label}</span>
          <Icon
            name="lucide:chevron-left"
            size={15}
            className="text-white transition-transform group-hover:-translate-x-1"
          />
        </Link>

        <Link
          href={`/exams/tests/${test.id}/start`}
          className="flex items-center justify-center gap-2 rounded-xl border bg-white px-6 py-3.5 text-[12.5px] font-bold transition-colors hover:border-violet-300"
          style={{ borderColor: '#CDBEF5', color: testTheme.violet }}
        >
          <Icon name="lucide:undo-2" size={15} />
          <span>{cta.secondary.label}</span>
        </Link>
      </div>

      {/* The figure closes the band on the left, as drawn. */}
      <div className="order-3 w-[137px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cta.art} alt="" className="w-full" />
      </div>
    </section>
  );
}

function Assurances() {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {testResult.assurances.map((a) => (
        <li
          key={a.text}
          className="flex items-center justify-center gap-2 rounded-xl py-3 text-[11.5px] text-gray-500"
        >
          <Icon name={a.icon} size={15} style={{ backgroundColor: testTheme.violet }} />
          <span>{a.text}</span>
        </li>
      ))}
    </ul>
  );
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
