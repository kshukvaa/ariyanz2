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
    { label: 'کدام جلسه نزدیک است؟', icon: 'lucide:calendar', fg: T.infoStrong, bg: T.tintBlue },
  ],
  placeholder: 'سوال خود را بنویسید.',
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

export interface ConsultItem {
  id: string;
  kind: 'case' | 'session' | 'question';
  title: string;
  expert: string;
  field: string;
  avatar: string;
  status: { label: string; fg: string; bg: string };
  progress?: number;
  progressLabel?: string;
  activity: string;
  icon: string;
  fg: string;
  bg: string;
}

export const myItems: ConsultItem[] = [
  {
    id: 'ar-204r',
    kind: 'case',
    title: 'بررسی شرایط خاتمه همکاری مدیر فروش',
    expert: 'دکتر امیر حسینی',
    field: 'روابط کار و قانون کار',
    avatar: `${A}/expert-01-lawyer.png`,
    status: { label: 'در حال بررسی', fg: T.infoStrong, bg: T.tintBlue },
    progress: 65,
    progressLabel: 'پیشرفت پرونده',
    activity: 'آخرین فعالیت: امروز ۱۵:۴۰',
    icon: 'lucide:folder',
    fg: T.primary,
    bg: T.tintPurple,
  },
  {
    id: 'ses-118',
    kind: 'session',
    title: 'جلسه بررسی ساختار جبران خدمات',
    expert: 'دکتر نرگس کریمی',
    field: 'منابع انسانی و توسعه سازمانی',
    avatar: `${A}/expert-02-hr.png`,
    status: { label: 'نیازمند اقدام من', fg: T.accent, bg: T.tintOrange },
    activity: 'فردا ۱۴:۳۰',
    icon: 'lucide:calendar',
    fg: T.danger,
    bg: T.tintRed,
  },
  {
    id: 'q-441',
    kind: 'question',
    title: 'محاسبه سنوات کارکنان با قرارداد موقت',
    expert: 'مهندس علی رشایی',
    field: 'تأمین اجتماعی',
    avatar: `${A}/expert-03-attorney.png`,
    status: { label: 'در انتظار مشاور', fg: T.warning, bg: T.tintOrange },
    activity: 'آخرین فعالیت: دیروز ۱۰:۱۲',
    icon: 'lucide:message-circle',
    fg: T.successStrong,
    bg: T.tintGreen,
  },
  {
    id: 'q-437',
    kind: 'question',
    title: 'الزامات قانونی آیین‌نامه انضباطی',
    expert: 'دکتر امیر حسینی',
    field: 'روابط کار و قانون کار',
    avatar: `${A}/expert-01-lawyer.png`,
    status: { label: 'تکمیل شده', fg: T.successStrong, bg: T.tintGreen },
    activity: 'آخرین فعالیت: ۳ روز پیش',
    icon: 'lucide:message-circle',
    fg: T.successStrong,
    bg: T.tintGreen,
  },
  {
    id: 'ses-102',
    kind: 'session',
    title: 'مشاوره طراحی مسیر شغلی کارکنان کلیدی',
    expert: 'دکتر سارا محمدی',
    field: 'مناطق آزاد و قوانین کار',
    avatar: `${A}/mbti-reviewer-01.png`,
    status: { label: 'تکمیل شده', fg: T.successStrong, bg: T.tintGreen },
    activity: 'آخرین فعالیت: ۱ هفته پیش',
    icon: 'lucide:calendar',
    fg: T.infoStrong,
    bg: T.tintBlue,
  },
];

export const myEmpty = {
  title: 'در این دسته درخواستی ندارید',
  desc: 'وقتی سؤال بپرسید، جلسه رزرو کنید یا پرونده‌ای بفرستید، اینجا نمایش داده می‌شود.',
  cta: 'درخواست مشاوره جدید',
};
