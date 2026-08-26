import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   ماشین‌حساب هوشمند حقوق آریاز — salary assistant
   Source: «calculator.png»

   OVERLAP, handled per the standing instruction to leave both
   versions competing: /salary-calculator already exists and is a
   working form-and-brackets calculator. This is a different
   product wearing the same name — a chat assistant that answers
   in prose and returns a comparison across family situations —
   so it lands at /salary-calculator/v2 rather than replacing it.

   The numbers below are the mockup's own worked example: an
   ۸۰٬۰۰۰٬۰۰۰ gross resolving to ۷۱٬۴۰۰٬۰۰۰ net for «متأهل با ۱
   فرزند». They are consistent across the five family cards —
   more dependants, higher net — so they are transcribed as drawn
   rather than recomputed. NOTE they are static display values,
   not a live calculation; the working calculator lives at
   /salary-calculator.

   The mockup dates its rules to سال ۱۴۰۳ in two places while the
   rest of the site is on ۱۴۰۵. Kept as drawn.
────────────────────────────────────────────────────────────── */

export const CALC_TINT = '#f5f4fd';

export const calcHero = {
  title: 'ماشین‌حساب هوشمند حقوق آریاز',
  icon: 'lucide:sparkles',
  desc: 'به سادگی بپرسید: ناخالصم چقدر خالص می‌شود؟ یا برای دریافت مبلغی مشخص، ناخالص چقدر باید باشد؟',
  art: '/images/aryaz/illustrations/tests-chat-robot.png',
};

export const calcModes = [
  {
    id: 'gross-to-net',
    eyebrow: 'می‌خواهم',
    title: 'ناخالص ← خالص',
    desc: ['می‌خواهم بدانم از حقوق ناخالص من', 'چقدر دریافت خواهم کرد؟'],
    icon: 'lucide:wallet',
    fg: T.primary,
    bg: T.tintPurple,
  },
  {
    id: 'net-to-gross',
    eyebrow: 'می‌خواهم',
    title: 'خالص ← ناخالص',
    desc: ['برای دریافت مبلغ مشخص،', 'ناخالص چقدر باید باشد؟'],
    icon: 'lucide:wallet',
    fg: '#1c8a4e',
    bg: '#e7f6ee',
  },
];

export const calcChat = {
  name: 'آریاز | دستیار حقوق',
  status: 'آنلاین',
  art: '/images/aryaz/illustrations/tests-chat-robot.png',
  tools: [
    { label: 'تاریخچه', icon: 'lucide:history' },
    { label: 'پاک کردن گفتگو', icon: 'lucide:trash-2' },
  ],
  messages: [
    {
      from: 'bot' as const,
      text: 'سلام! من آریاز، دستیار محاسبه حقوق و دستمزد شما هستم. هر مبلغی را بگویید تا به شما کمک کنم.',
    },
    {
      from: 'user' as const,
      text: 'حقوق ناخالص من ۸۰ میلیون تومان است. خالص دریافتی‌ام چقدر می‌شود؟',
      time: '۱۰:۳۲',
    },
    {
      from: 'bot' as const,
      text: 'حتماً! در ادامه، خالص دریافتی شما را در شرایط مختلف خانوادگی محاسبه کرده‌ام.',
      time: '۱۰:۳۳',
    },
  ],
  placeholder: 'سؤال دیگری دارید؟ درباره حقوق، مالیات، بیمه یا هر موضوع مرتبط بپرسید...',
};

export const calcResult = {
  icon: 'lucide:calculator',
  gross: { label: 'ناخالص شما', value: '۸۰,۰۰۰,۰۰۰', unit: 'تومان' },
  net: { label: 'خالص تقریبی (محاسبه شده)', value: '۷۱,۴۰۰,۰۰۰', unit: 'تومان' },
  breakdownTitle: 'خالص دریافتی بر اساس وضعیت خانوادگی',
  youBadge: 'حالت شما',
  /* Right-to-left in the source: مجرد first. */
  cases: [
    { label: 'مجرد', value: '۷۰,۸۰۰,۰۰۰' },
    { label: 'متأهل', sub: 'بدون فرزند', value: '۷۱,۱۰۰,۰۰۰' },
    { label: 'متأهل', sub: 'با ۱ فرزند', value: '۷۱,۴۰۰,۰۰۰', you: true },
    { label: 'متأهل', sub: 'با ۲ فرزند', value: '۷۱,۷۰۰,۰۰۰' },
    { label: 'متأهل', sub: 'با ۳ فرزند یا بیشتر', value: '۷۲,۰۰۰,۰۰۰' },
  ],
  unit: 'تومان',
  footnote: '* مقادیر فوق تقریبی بوده و بر اساس قوانین سال ۱۴۰۳ محاسبه شده‌اند.',
};

export const calcSuggest = {
  title: 'در ادامه می‌توانید از آریاز بپرسید',
  icon: 'lucide:sparkles',
  items: [
    {
      title: 'هزینه واقعی استخدام این نیرو',
      desc: 'برای کارفرما چقدر است؟',
      icon: 'lucide:user-round-plus',
      fg: '#1c8a4e',
      bg: '#e7f6ee',
    },
    {
      title: 'اگر ۲۰٪ افزایش حقوق بگیرم،',
      desc: 'خالص دریافتی چقدر می‌شود؟',
      icon: 'lucide:chart-column-big',
      fg: T.violet,
      bg: T.tintPurple,
    },
    {
      title: 'مالیات این حقوق',
      desc: 'چقدر محاسبه شده است؟',
      icon: 'lucide:file-text',
      fg: T.infoStrong,
      bg: T.tintBlue,
    },
    {
      title: 'تفاوت خالص دریافتی',
      desc: 'بین مجرد و متأهل چقدر است؟',
      icon: 'lucide:users-round',
      fg: T.primary,
      bg: T.tintPurple,
    },
    {
      title: 'قوانین بیمه و مالیات حقوق',
      desc: 'در سال ۱۴۰۳ چگونه است؟',
      icon: 'lucide:scale',
      fg: T.accent,
      bg: T.tintOrange,
    },
  ],
  note: {
    text: 'تمام محاسبات بر اساس قوانین جمهوری اسلامی ایران و به‌روزترین نرخ‌ها انجام می‌شود.',
    icon: 'lucide:shield-check',
  },
};

export const calcFeatures = [
  { label: 'کاملاً محرمانه', sub: 'اطلاعات شما محفوظ است', icon: 'lucide:lock' },
  { label: 'توضیحات شفاف', sub: 'جزئیات کامل محاسبات', icon: 'lucide:chart-pie' },
  { label: 'به‌روز و قابل اعتماد', sub: 'بر اساس آخرین قوانین', icon: 'lucide:shield-check' },
  { label: 'سریع و دقیق', sub: 'محاسبات لحظه‌ای', icon: 'lucide:sliders-horizontal' },
];
