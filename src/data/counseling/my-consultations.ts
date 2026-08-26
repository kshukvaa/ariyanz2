import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   مشاوره‌های من — the learner's consultation dashboard
   Sources: «my specialized counseling page.png» + «page 2.png»

   The one screen in this section that is not a wizard: it is
   where the three request types — written questions, sessions and
   case files — land together once they exist. So its job is
   triage, and the mockup says so: the amber «۲ درخواست نیازمند
   اقدام شماست» band sits above the list, before any filtering.
────────────────────────────────────────────────────────────── */

const A = '/images/aryaz/avatars';

export const myHero = {
  title: 'مشاوره‌های من',
  desc: 'همه سؤال‌ها، جلسات و پرونده‌های تخصصی شما در یک‌جا',
  cta: { label: 'درخواست مشاوره جدید', icon: 'lucide:plus' },
  stats: [
    { value: '۱۲', label: 'کل درخواست‌ها', fg: T.ink },
    { value: '۳', label: 'در حال پیگیری', fg: T.danger },
    { value: '۲', label: 'اقدام موردنیاز', fg: T.accent, icon: 'lucide:circle-alert' },
    { value: '۷', label: 'تکمیل‌شده', fg: T.successStrong, icon: 'lucide:circle-check' },
  ],
};

export const myAgent = {
  name: 'آریاز',
  role: 'دستیار هوشمند مشاوره‌های شما',
  status: 'آنلاین',
  art: '/images/aryaz/illustrations/ai-assistant-avatar.png',
  bubble: 'سلام، من آریاز هستم. می‌توانم بین همه درخواست‌ها، جلسات و پرونده‌ها بگردم و بگویم چه چیزی نیاز به توجه دارد.',
  quickTitle: 'کارهای سریع',
  quick: [
    { label: 'کدام درخواست نیاز به اقدام من دارد؟', icon: 'lucide:circle-alert', fg: T.accent, bg: T.tintOrange },
    { label: 'آخرین پیام مشاور چیست؟', icon: 'lucide:message-circle', fg: T.primary, bg: T.tintPurple },
    { label: 'جلسه بعدی من چه زمانی است؟', icon: 'lucide:calendar', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'کدام پرونده‌ها هنوز باز هستند؟', icon: 'lucide:folder', fg: T.primary, bg: T.tintPurple },
    { label: 'پاسخ‌های جدیدم را نشان بده', icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
    { label: 'این هفته چه کارهایی دارم؟', icon: 'lucide:list', fg: T.ink, bg: T.border },
  ],
  placeholder: 'سوال خود را بنویسید.',
  note: 'پاسخ‌ها توسط هوش مصنوعی ارائه می‌شود.',
};

export const myAlerts = {
  title: '۲ درخواست نیازمند اقدام شماست',
  icon: 'lucide:circle-alert',
  items: [
    {
      id: 'case',
      badge: 'پرونده #AR-204R',
      body: 'مشاور درخواست صورت‌جلسه کمیته انضباطی کرده است.',
      cta: 'مشاهده و اقدام',
      icon: 'lucide:folder',
      fg: T.accent,
      bg: T.tintOrange,
    },
    {
      id: 'session',
      badge: 'جلسه فردا ساعت ۱۴:۳۰',
      body: 'جلسه بررسی ساختار جبران خدمات',
      cta: 'مشاهده جلسه',
      icon: 'lucide:calendar',
      fg: T.danger,
      bg: T.tintRed,
    },
  ],
};

export const myTabs = [
  { id: 'all', label: 'همه', icon: 'lucide:layout-grid' },
  { id: 'questions', label: 'سؤال‌های تخصصی', icon: 'lucide:message-circle' },
  { id: 'sessions', label: 'جلسات', icon: 'lucide:calendar' },
  { id: 'cases', label: 'پرونده‌های تخصصی', icon: 'lucide:folder' },
];

export const myToolbar = {
  search: 'جستجو در مشاوره‌های من...',
  chips: ['همه وضعیت‌ها', 'نیازمند اقدام من', 'در انتظار مشاور', 'تکمیل شده'],
  sort: 'آخرین فعالیت',
};

export interface ConsultStep {
  date: string;
  label: string;
  state: 'done' | 'current' | 'todo';
}

export interface ConsultMeta {
  icon: string;
  label: string;
  /* Rendered as a link-coloured action rather than plain meta. */
  action?: boolean;
}

export interface ConsultItem {
  id: string;
  kind: 'case' | 'session' | 'question';
  /* The label printed under the type icon — «جلسه آنلاین» and
     «جلسه حضوری» are both kind: 'session', so this cannot be
     derived from kind alone. */
  kindLabel: string;
  title: string;
  expert: string;
  field: string;
  rating: string;
  avatar: string;
  status: { label: string; fg: string; bg: string };
  progress?: number;
  progressLabel?: string;
  activity: string;
  note?: string;
  meta?: ConsultMeta[];
  steps: ConsultStep[];
  cta: string;
  /* Only the case row has a detail page so far. */
  href?: string;
  icon: string;
  fg: string;
  bg: string;
}

export const myItems: ConsultItem[] = [
  {
    id: 'ar-204r',
    kind: 'case',
    kindLabel: 'پرونده تخصصی',
    title: 'بررسی شرایط خاتمه همکاری مدیر فروش',
    expert: 'دکتر امیر حسینی',
    field: 'روابط کار و قانون کار',
    rating: '۴.۹',
    avatar: `${A}/expert-01-lawyer.png`,
    status: { label: 'در حال بررسی', fg: T.infoStrong, bg: T.tintBlue },
    progress: 65,
    progressLabel: 'پیشرفت پرونده',
    activity: 'آخرین فعالیت: امروز ۱۵:۴۰',
    note: 'مشاور در حال بررسی مدارک پرونده است.',
    steps: [
      { date: '۲۴ مرداد', label: 'ثبت درخواست', state: 'done' },
      { date: '۲۴ مرداد', label: 'پرداخت تأیید شد', state: 'done' },
      { date: '۲۵ مرداد', label: 'پرونده به مشاور ارجاع شد', state: 'done' },
      { date: '۲۷ مرداد', label: 'در حال بررسی مدارک', state: 'current' },
    ],
    cta: 'ورود به پرونده',
    href: '/counseling/case/AR-2048',
    icon: 'lucide:folder',
    fg: T.primary,
    bg: T.tintPurple,
  },
  {
    id: 'q-441',
    kind: 'question',
    kindLabel: 'سؤال تخصصی',
    title: 'شرایط فسخ قرارداد مدت‌معین چیست؟',
    expert: 'دکتر امیر حسینی',
    field: 'روابط کار و قانون کار',
    rating: '۴.۹',
    avatar: `${A}/expert-01-lawyer.png`,
    status: { label: 'پاسخ آماده است', fg: T.successStrong, bg: T.tintGreen },
    activity: 'پاسخ دریافت‌شده: امروز ۰۶:۴۰',
    note: 'مشاور پاسخ نهایی را ارسال کرده است.',
    steps: [
      { date: '۲۴ مرداد', label: 'ثبت درخواست', state: 'done' },
      { date: '۲۴ مرداد', label: 'پرداخت تأیید شد', state: 'done' },
      { date: '۲۵ مرداد', label: 'پاسخ‌دهی توسط مشاور', state: 'done' },
      { date: '۲۶ مرداد', label: 'پاسخ تحویل داده شد', state: 'done' },
    ],
    cta: 'مشاهده پاسخ',
    icon: 'lucide:message-circle',
    fg: T.successStrong,
    bg: T.tintGreen,
  },
  {
    id: 'ses-118',
    kind: 'session',
    kindLabel: 'جلسه آنلاین',
    title: 'جلسه بررسی ساختار جبران خدمات',
    expert: 'دکتر امیر حسینی',
    field: 'روابط کار و قانون کار',
    rating: '۴.۹',
    avatar: `${A}/expert-01-lawyer.png`,
    status: { label: 'جلسه برنامه‌ریزی شده', fg: T.accent, bg: T.tintOrange },
    activity: 'فردا ۱۴:۳۰',
    meta: [
      { icon: 'lucide:calendar', label: '۲۹ مرداد' },
      { icon: 'lucide:clock', label: '۱۴:۳۰ - ۱۵:۳۰' },
      { icon: 'lucide:calendar-plus', label: 'افزودن به تقویم', action: true },
    ],
    steps: [
      { date: '۲۴ مرداد', label: 'ثبت درخواست', state: 'done' },
      { date: '۲۴ مرداد', label: 'پرداخت تأیید شد', state: 'done' },
      { date: '۲۵ مرداد', label: 'تأیید و زمان‌بندی شد', state: 'done' },
      { date: '۲۹ مرداد', label: 'برگزاری جلسه', state: 'current' },
    ],
    cta: 'مشاهده جلسه',
    icon: 'lucide:video',
    fg: T.infoStrong,
    bg: T.tintBlue,
  },
  {
    id: 'ses-102',
    kind: 'session',
    kindLabel: 'جلسه حضوری',
    title: 'جلسه حضوری بررسی پرونده اداره کار',
    expert: 'دکتر سارا محمدی',
    field: 'مناطق آزاد و قوانین کار',
    rating: '۴.۸',
    avatar: `${A}/mbti-reviewer-01.png`,
    status: { label: 'تأیید شده', fg: T.infoStrong, bg: T.tintBlue },
    activity: '۳ شهریور | ساعت ۱۴:۰۰',
    meta: [
      { icon: 'lucide:map-pin', label: 'دفتر آریاز — تهران، سعادت‌آباد' },
      { icon: 'lucide:navigation', label: 'مشاهده مسیر', action: true },
    ],
    steps: [
      { date: '۲۱ مرداد', label: 'ثبت درخواست', state: 'done' },
      { date: '۲۲ مرداد', label: 'پرداخت تأیید شد', state: 'done' },
      { date: '۲۴ مرداد', label: 'تأیید و زمان‌بندی شد', state: 'done' },
      { date: '۳ شهریور', label: 'برگزاری جلسه حضوری', state: 'todo' },
    ],
    cta: 'مشاهده جزئیات',
    icon: 'lucide:map-pin',
    fg: T.primary,
    bg: T.tintPurple,
  },
];

/* The mockup's footer reads «نمایش ۱ تا ۴ از ۱۳ مورد» — the list
   is a page of a longer history, so the pager is part of the
   design rather than an afterthought. */
export const myPager = {
  summary: 'نمایش ۱ تا ۴ از ۱۳ مورد',
  prev: 'قبلی',
  next: 'بعدی',
  pages: ['۱', '۲', '۳', '…', '۹'],
  active: '۱',
};

export const myEmpty = {
  title: 'در این دسته درخواستی ندارید',
  desc: 'وقتی سؤال بپرسید، جلسه رزرو کنید یا پرونده‌ای بفرستید، اینجا نمایش داده می‌شود.',
  cta: 'درخواست مشاوره جدید',
};
