'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import {
  testTheme,
  quizMeta,
  quizQuestions,
  quizGuide,
  quizChat,
  resultGate,
  type TestDetail,
} from '@/data/tests';

/* ──────────────────────────────────────────────────────────────
   The question flow. A room of its own — no site chrome competes
   with the question being answered.

   The signature here is the sixty-step rail across the top: it is
   the only place that shows, at a glance, how much of yourself you
   have already described and how much is left.
────────────────────────────────────────────────────────────── */

export default function TestQuizClient({ test }: { test: TestDetail }) {
  const router = useRouter();
  const total = quizMeta.totalQuestions;

  const [index, setIndex] = useState(quizMeta.startAt);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [left, setLeft] = useState(quizMeta.minutes * 60 + quizMeta.seconds);
  const [gateOpen, setGateOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);

  /* The clock is the one thing on this screen that moves on its own. */
  useEffect(() => {
    if (gateOpen || left <= 0) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [gateOpen, left]);

  useEffect(() => {
    if (!gateOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGateOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [gateOpen]);

  const question = useMemo(
    () => quizQuestions[(index - quizMeta.startAt + quizQuestions.length * 10) % quizQuestions.length],
    [index]
  );

  const answered = Object.keys(answers).length;
  const done = index - 1;
  const percent = Math.round((done / total) * 100);
  const clock = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;

  const go = (delta: number) => setIndex((i) => Math.min(total, Math.max(1, i + delta)));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F6F5FB' }}>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <header className="bg-white border-b" style={{ borderColor: testTheme.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
          <span
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#EDE8FD' }}
          >
            <Icon name="lucide:brain" size={24} style={{ backgroundColor: testTheme.violet }} />
          </span>

          <div className="text-right">
            <h1 className="text-[16px] font-black" style={{ color: testTheme.navy }}>
              {test.title}
            </h1>
            <p className="text-[11.5px] text-gray-500 mt-0.5">{quizMeta.subtitle}</p>
          </div>

          <div
            className="mx-auto rounded-xl border px-7 py-2.5 text-center shrink-0"
            style={{ borderColor: testTheme.border }}
          >
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 mb-0.5">
              <Icon name="lucide:clock" size={13} className="text-gray-400" />
              <span>زمان باقی‌مانده</span>
            </p>
            <p className="text-[24px] font-black leading-none tabular-nums" style={{ color: testTheme.navy }} dir="ltr">
              {clock}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="flex items-center justify-end gap-1.5 text-[11.5px] font-bold mb-2" style={{ color: testTheme.navy }}>
              <span>
                سوال {toPersian(index)} از {toPersian(total)}
              </span>
              <Icon name="lucide:list-checks" size={14} style={{ backgroundColor: testTheme.violet }} />
            </p>
            <span className="block w-[150px] h-2 rounded-full overflow-hidden bg-gray-100" dir="ltr">
              <span
                className="block h-full rounded-full transition-[width] duration-500"
                style={{ width: `${percent}%`, backgroundColor: testTheme.violet }}
              />
            </span>
          </div>

          <Link href={`/exams/tests/${test.id}`} className="shrink-0 pr-2 border-r" style={{ borderColor: testTheme.border }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={quizMeta.logo} alt="آریاز" className="h-11 w-auto mr-4" />
          </Link>
        </div>
      </header>

      {/* ── The sixty-step rail ─────────────────────────────── */}
      <nav
        aria-label="پیشرفت سوالات"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-5 overflow-x-auto ar-no-scrollbar"
      >
        <ol className="flex items-center gap-1.5 min-w-max" dir="ltr">
          {railSteps(index, total).map((s, i) =>
            s === null ? (
              <li key={`gap-${i}`} className="px-2 text-gray-400 text-[13px]">
                …
              </li>
            ) : (
              <li key={s} className="flex items-center gap-1.5">
                {i > 0 && <span className="w-4 h-px" style={{ backgroundColor: s <= index ? '#16A34A' : '#DDE1EC' }} />}
                <span
                  aria-current={s === index ? 'step' : undefined}
                  className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                  style={
                    s < index
                      ? { backgroundColor: '#16A34A', color: '#fff' }
                      : s === index
                        ? { backgroundColor: testTheme.violet, color: '#fff' }
                        : { backgroundColor: '#fff', color: '#8B93A8', border: '1px solid #DDE1EC' }
                  }
                >
                  {s < index ? <Icon name="lucide:check" size={13} className="text-white" /> : toPersian(s)}
                </span>
              </li>
            )
          )}
        </ol>
      </nav>

      {/* ── Question + guide ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 grid lg:grid-cols-[300px_minmax(0,1fr)] gap-5 items-start">
        {/* Guide column first, so it lands on the right */}
        <aside className="bg-white rounded-2xl border p-4 flex flex-col" style={{ borderColor: testTheme.border }}>
          <h2 className="flex items-center gap-2 text-[13px] font-black mb-4" style={{ color: testTheme.violet }}>
            <Icon name="lucide:info" size={15} style={{ backgroundColor: testTheme.violet }} />
            <span>راهنما</span>
          </h2>

          <ul className="space-y-3 mb-5">
            {quizGuide.map((g) => (
              <li key={g.text} className="flex items-start gap-2.5">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#F1EEFE' }}
                >
                  <Icon name={g.icon} size={14} style={{ backgroundColor: testTheme.violet }} />
                </span>
                <span className="text-[11.5px] text-gray-600 leading-7 text-right">{g.text}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border p-3 mb-3" style={{ borderColor: testTheme.border }}>
            <div className="flex items-center gap-2 mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={quizMeta.robot} alt="" className="w-9 shrink-0" />
              <div className="text-right">
                <p className="text-[12px] font-black" style={{ color: testTheme.navy }}>
                  {quizChat.title}
                </p>
                <p className="text-[10px] text-gray-500">{quizChat.lead}</p>
              </div>
            </div>

            <ul className="space-y-2.5 max-h-[260px] overflow-y-auto">
              {quizChat.messages.map((m, i) => (
                <li
                  key={i}
                  className={`rounded-xl px-3 py-2.5 text-[11px] leading-7 whitespace-pre-line ${
                    m.from === 'user' ? 'text-white ml-6' : 'mr-6'
                  }`}
                  style={
                    m.from === 'user'
                      ? { backgroundColor: testTheme.violet }
                      : { backgroundColor: '#F4F5FA', color: '#4B5568' }
                  }
                >
                  {m.text}
                  <span className={`block text-[9px] mt-1 ${m.from === 'user' ? 'text-white/70' : 'text-gray-400'}`} dir="ltr">
                    {m.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <span className="relative block mt-auto">
            <input
              placeholder={quizChat.placeholder}
              aria-label={quizChat.placeholder}
              className="w-full border rounded-xl py-2.5 pr-3.5 pl-10 text-[11.5px] focus:outline-none focus:border-violet-400"
              style={{ borderColor: testTheme.border }}
            />
            <Icon
              name="lucide:send"
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ backgroundColor: testTheme.violet }}
            />
          </span>
        </aside>

        {/* The question itself */}
        <section className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: testTheme.border }}>
          <p className="text-[13px] font-bold text-center mb-3" style={{ color: testTheme.violet }}>
            سوال {toPersian(index)}:
          </p>
          <h2
            className="text-[19px] sm:text-[22px] font-black text-center leading-[1.8] mb-8"
            style={{ color: testTheme.navy }}
          >
            {question.text}
          </h2>

          <ul className="space-y-3 mb-8">
            {question.options.map((opt, i) => {
              const on = answers[index] === i;
              return (
                <li key={opt}>
                  <button
                    onClick={() => setAnswers((a) => ({ ...a, [index]: i }))}
                    aria-pressed={on}
                    className="w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-right transition-all"
                    style={{
                      borderColor: on ? testTheme.violet : testTheme.border,
                      backgroundColor: on ? '#F3F0FF' : '#fff',
                    }}
                  >
                    <span
                      className="w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center"
                      style={{ borderColor: on ? testTheme.violet : '#CFD4E3' }}
                    >
                      {on && <span className="w-[9px] h-[9px] rounded-full" style={{ backgroundColor: testTheme.violet }} />}
                    </span>
                    <span className="flex-1 text-[13px] leading-8" style={{ color: testTheme.navy }}>
                      {opt}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between gap-3 mb-7 flex-wrap">
            <button
              onClick={() => go(1)}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-[12.5px] font-bold transition-colors"
              style={{ backgroundColor: '#EFEBFE', color: testTheme.violet }}
            >
              <Icon name="lucide:chevron-left" size={15} style={{ backgroundColor: testTheme.violet }} />
              <span>سوال بعد</span>
            </button>

            <p className="text-[12px] font-bold" style={{ color: testTheme.navy }}>
              سوال {toPersian(index)} از {toPersian(total)}
            </p>

            <button
              onClick={() => go(-1)}
              className="flex items-center gap-2 rounded-xl border px-6 py-3 text-[12.5px] font-bold transition-colors hover:border-violet-300"
              style={{ borderColor: testTheme.border, color: testTheme.navy }}
            >
              <span>سوال قبل</span>
              <Icon name="lucide:chevron-right" size={15} className="text-gray-400" />
            </button>
          </div>

          <div className="mb-7">
            <p className="text-[12px] font-bold text-center mb-2" style={{ color: testTheme.navy }}>
              {toPersian(percent)}% تکمیل شده
            </p>
            <span className="block h-2.5 rounded-full overflow-hidden bg-gray-100" dir="ltr">
              <span
                className="block h-full rounded-full transition-[width] duration-500"
                style={{ width: `${percent}%`, backgroundColor: testTheme.violet }}
              />
            </span>
          </div>

          {/* RTL: finishing sits in the middle, leaving is the far-left escape. */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
            <button
              onClick={() => setGateOpen(true)}
              data-ripple
              className="flex items-center gap-2 rounded-xl px-10 py-4 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#E1342C' }}
            >
              <Icon name="lucide:flag" size={16} className="text-white" />
              <span>{quizMeta.finish}</span>
            </button>

            <Link
              href={`/exams/tests/${test.id}`}
              className="flex items-center gap-2 rounded-xl border px-5 py-3.5 text-[12.5px] font-bold transition-colors hover:border-rose-300"
              style={{ borderColor: testTheme.border, color: testTheme.navy }}
            >
              <Icon name="lucide:log-out" size={15} />
              <span>{quizMeta.exit}</span>
            </Link>
          </div>

          <p
            className="flex items-center justify-center gap-2 rounded-xl py-3 text-[11.5px]"
            style={{ backgroundColor: '#F4F2FE', color: '#5D6480' }}
          >
            <Icon name="lucide:shield-check" size={15} style={{ backgroundColor: testTheme.violet }} />
            <span>{quizMeta.privacy}</span>
          </p>

          <p className="sr-only" aria-live="polite">
            {toPersian(answered)} پاسخ ثبت شده است
          </p>
        </section>
      </div>

      {/* ── Result gate ─────────────────────────────────────── */}
      {gateOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(24,18,54,0.55)' }}
          onClick={() => setGateOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gate-title"
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl w-full max-w-[430px] p-7 text-center shadow-2xl"
          >
            <button
              ref={closeRef}
              onClick={() => setGateOpen(false)}
              aria-label="بستن"
              className="absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
            >
              <Icon name="lucide:x" size={18} className="text-gray-500" />
            </button>

            <span
              className="w-[74px] h-[74px] rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ backgroundColor: '#F1EEFE' }}
            >
              <Icon name="lucide:clipboard-check" size={32} style={{ backgroundColor: testTheme.violet }} />
            </span>

            <h2 id="gate-title" className="text-[19px] font-black mb-3" style={{ color: testTheme.navy }}>
              {resultGate.title}
              <span className="mr-1.5">✨</span>
            </h2>
            <p className="text-[12px] text-gray-600 leading-8 mb-6">{resultGate.desc}</p>

            <label className="block text-right mb-4">
              <span className="block text-[12px] font-bold mb-2" style={{ color: testTheme.navy }}>
                {resultGate.nameLabel}
              </span>
              <span className="relative block">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={resultGate.namePlaceholder}
                  className="w-full border rounded-xl py-3 pr-11 pl-4 text-[12px] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                  style={{ borderColor: testTheme.border }}
                />
                <Icon
                  name="lucide:user-round"
                  size={15}
                  className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </span>
            </label>

            <label className="block text-right mb-3">
              <span className="block text-[12px] font-bold mb-2" style={{ color: testTheme.navy }}>
                {resultGate.phoneLabel}
              </span>
              <span className="relative block">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  placeholder={resultGate.phonePlaceholder}
                  className="w-full border rounded-xl py-3 pr-11 pl-4 text-[12px] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                  style={{ borderColor: testTheme.border }}
                />
                <Icon
                  name="lucide:phone"
                  size={15}
                  className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </span>
            </label>

            <p className="flex items-start gap-2 text-[10.5px] text-gray-500 leading-6 mb-5 text-right">
              <Icon name="lucide:shield-check" size={14} className="shrink-0 mt-0.5" style={{ backgroundColor: '#16A34A' }} />
              <span>{resultGate.privacy}</span>
            </p>

            <button
              onClick={() => router.push(`/exams/tests/${test.id}/result`)}
              data-ripple
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: testTheme.violet }}
            >
              <Icon name="lucide:chart-no-axes-combined" size={16} className="text-white" />
              <span>{resultGate.cta}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** A window of steps around the current one, then the last step. */
function railSteps(current: number, total: number): (number | null)[] {
  const start = Math.max(1, current - 9);
  const window: (number | null)[] = [];
  for (let n = start; n <= Math.min(total - 1, current + 10); n += 1) window.push(n);
  return [...window, null, total];
}

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
