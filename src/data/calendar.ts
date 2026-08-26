import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   تقویم آریاز — events calendar

   MOCKUP INCONSISTENCY, and the one judgement call on this page:
   the month grid in the source does not count. Reading it
   right-to-left the first row runs ۳۰, ۳۱, ۱, ۴, ۳, ۲ — the dates
   neither ascend nor wrap. Reproducing that verbatim would ship a
   calendar showing wrong dates, which is worse than useless for
   the one thing a calendar is for.

   So the grid is generated correctly from `monthDays` and
   `startWeekday` below, and the events are pinned to the days the
   mockup actually marks (۵, ۱۲, ۲۰). Change `startWeekday` when
   the real Shahrivar 1405 offset is confirmed — nothing else
   depends on it.
────────────────────────────────────────────────────────────── */

export const calendarHero = {
  title: 'تقویم آریاز',
  desc: ['همه دوره‌ها، کارگاه‌ها، وبینارها و رویدادهای', 'تخصصی آریاز در یک نگاه'],
  stats: [
    { value: '۳', label: 'رویداد در این ماه', icon: 'lucide:calendar', fg: T.primary },
    { value: '۵', label: 'حوزه تخصصی', icon: 'lucide:layers', fg: T.violet },
    { value: '۸', label: 'مدرس', icon: 'lucide:user-round', fg: T.primary },
    { value: '۲۴', label: 'رویداد فعال', icon: 'lucide:users-round', fg: T.violet },
  ],
};

export const calendarToolbar = {
  viewLabel: 'نمایش به صورت:',
  views: [
    { id: 'calendar', label: 'تقویم', icon: 'lucide:calendar' },
    { id: 'list', label: 'لیست', icon: 'lucide:list' },
  ],
  month: 'شهریور ۱۴۰۵',
  today: 'امروز',
};

/* Persian months 1–6 have 31 days; Shahrivar is month 6.
   `startWeekday` is 0 = شنبه … 6 = جمعه. */
export const monthDays = 31;
export const startWeekday = 2;

export const weekdays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

export interface DayEvent {
  day: number;
  label: string;
  kind: 'course' | 'workshop' | 'webinar' | 'seminar';
}

export const monthEvents: DayEvent[] = [
  { day: 5, label: 'دوره جامع HRBP', kind: 'course' },
  { day: 12, label: 'کارگاه طراحی KPI', kind: 'workshop' },
  { day: 20, label: 'وبینار در HR', kind: 'webinar' },
];

export const eventKinds = {
  course: { label: 'دوره', fg: T.primary, bg: T.tintPurple },
  workshop: { label: 'کارگاه', fg: T.successStrong, bg: T.tintGreen },
  webinar: { label: 'وبینار', fg: T.accent, bg: T.tintOrange },
  seminar: { label: 'سمینار', fg: T.infoStrong, bg: T.tintBlue },
  conference: { label: 'کنفرانس', fg: T.danger, bg: T.tintRed },
} as const;

export const calendarFilters = {
  title: 'فیلترها',
  cta: 'مشاهده کردن فیلترها',
  kinds: {
    label: 'نوع رویداد',
    items: [
      { label: 'دوره', fg: T.primary, on: true },
      { label: 'کارگاه', fg: T.successStrong, on: true },
      { label: 'وبینار', fg: T.accent, on: true },
      { label: 'سمینار', fg: T.infoStrong, on: true },
      { label: 'کنفرانس', fg: T.danger, on: false },
    ],
  },
  field: { label: 'حوزه تخصصی', value: 'همه حوزه‌ها' },
  mode: {
    label: 'شیوه برگزاری',
    items: [
      { label: 'آنلاین', on: true },
      { label: 'حضوری', on: true },
      { label: 'ترکیبی', on: true },
    ],
  },
  status: {
    label: 'وضعیت',
    items: [
      { label: 'ثبت‌نام', on: true },
      { label: 'به‌زودی', on: true },
      { label: 'تکمیل ظرفیت', on: false },
    ],
  },
  range: { label: 'بازه زمانی', value: 'سه ماه آینده' },
};

export interface CalendarEvent {
  id: string;
  kind: keyof typeof eventKinds;
  title: string;
  instructor: string;
  avatar: string;
  image: string;
  date: string;
  time?: string;
  duration: string;
  price?: string;
  free?: boolean;
  cta: string;
}

const A = '/images/aryaz/avatars';
const TH = '/images/aryaz/thumbnails';

export const upcomingEvents = {
  title: 'رویدادهای پیش‌رو',
  cta: 'مشاهده همه',
  items: [
    {
      id: 'ai-hr',
      kind: 'webinar' as const,
      title: 'هوش مصنوعی در منابع انسانی',
      instructor: 'دکتر نگار اسدی',
      avatar: `${A}/staff-sara-karimi.png`,
      image: `${TH}/video-04-ai-introduction.png`,
      date: 'شهریور ۱۴۰۵',
      time: 'ساعت ۱۸:۰۰',
      duration: 'مدت: ۲ ساعت',
      free: true,
      cta: 'ثبت‌نام',
    },
    {
      id: 'kpi-workshop',
      kind: 'workshop' as const,
      title: 'کارگاه عملی طراحی KPI',
      instructor: 'مهندس پیمان معتمدی',
      avatar: `${A}/staff-mohammad-rezaei.png`,
      image: `${TH}/kpi-article-01-design-guide.png`,
      date: 'شهریور ۱۴۰۵',
      time: 'ساعت ۹:۰۰',
      duration: 'مدت: ۸ ساعت',
      price: '۸۵۰٬۰۰۰ تومان',
      cta: 'ثبت‌نام',
    },
    {
      id: 'hrbp',
      kind: 'course' as const,
      title: 'دوره جامع HRBP حرفه‌ای',
      instructor: 'دکتر امیر حسینی',
      avatar: `${A}/expert-01-lawyer.png`,
      image: `${TH}/video-06-employee-empowerment.png`,
      date: 'شهریور ۱۴۰۵',
      duration: 'مدت: ۴۰ ساعت',
      price: '۸٬۹۰۰٬۰۰۰ تومان',
      cta: 'ثبت‌نام',
    },
    {
      id: 'digital-hr',
      kind: 'seminar' as const,
      title: 'سمینار تحول دیجیتال در HR',
      instructor: 'دکتر سارا مرادی',
      avatar: `${A}/staff-zahra-nouri.png`,
      image: `${TH}/video-09-org-culture.png`,
      date: 'شهریور ۱۴۰۵',
      time: 'ساعت ۱۴:۰۰',
      duration: 'مدت: ۴ ساعت',
      price: '۱٬۹۰۰٬۰۰۰ تومان',
      cta: 'ثبت‌نام',
    },
  ] as CalendarEvent[],
};

export const popularEvents = {
  title: 'محبوب‌ترین رویدادها',
  cta: 'مشاهده همه',
  items: [
    { title: 'دوره جامع HRBP حرفه‌ای', date: '۱۵ شهریور ۱۴۰۵', image: `${TH}/video-06-employee-empowerment.png` },
    { title: 'کارگاه طراحی KPI', date: '۱۲ شهریور ۱۴۰۵', image: `${TH}/kpi-article-01-design-guide.png` },
    { title: 'سمینار تحول دیجیتال در HR', date: '۲۸ شهریور ۱۴۰۵', image: `${TH}/video-09-org-culture.png` },
  ],
};

export const calendarSuggest = {
  title: 'آریاز پیشنهاد می‌دهد',
  desc: 'بر اساس علایق و تاریخچه یادگیری شما.',
  items: [
    {
      title: 'سمینار جذب و نگهداشت استعدادها',
      instructor: 'دکتر مهدی حیدری',
      avatar: `${A}/staff-ali-ahmadi.png`,
      date: '۲۵ شهریور ۱۴۰۵',
      cta: 'مشاهده',
      fg: T.primary,
    },
    {
      title: 'کارگاه کوچینگ مدیران',
      instructor: 'مهندس لیلا رضایی',
      avatar: `${A}/staff-zahra-nouri.png`,
      date: '۱۸ مهر ۱۴۰۵',
      cta: 'مشاهده',
      fg: T.accent,
    },
    {
      title: 'دوره جامع مدیریت عملکرد',
      instructor: 'دکتر علی محمدی',
      avatar: `${A}/staff-mohammad-rezaei.png`,
      date: '۵ مهر ۱۴۰۵',
      cta: 'مشاهده',
      fg: T.successStrong,
    },
  ],
};
