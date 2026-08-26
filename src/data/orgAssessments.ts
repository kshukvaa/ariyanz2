import { T, icon3x } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Assessments — /org/assessments

   Content transcribed from the mockups rather than invented, so
   the totals reconcile: each active assessment's three progress
   segments sum to its participant count, and the tab counts sum
   to the eighteen in the first stat card.
────────────────────────────────────────────────────────────── */

export const assessHead = {
  title: 'ارزیابی‌ها',
  desc: 'ایجاد، اجرا و مدیریت ارزیابی‌های کارکنان سازمان',
  create: { label: 'ایجاد ارزیابی جدید', href: '/org/assessments/new' },
  packages: { label: 'پکیج‌های ارزیابی', href: '/org/assessments/packages' },
};

export interface AssessStat {
  id: string;
  value: string;
  label: string;
  link: string;
  href: string;
  icon: string;
  fg: string;
  bg: string;
  /** The active card carries a live dot next to its link. */
  dot?: boolean;
}

const S = (n: string) => icon3x('dashboard-stats', n);

export const assessStats: AssessStat[] = [
  {
    id: 'total',
    value: '۱۸',
    label: 'کل ارزیابی‌ها',
    link: 'مشاهده همه',
    href: '/org/assessments',
    icon: S('stat-active-eval'),
    fg: T.primary,
    bg: T.tintPurple,
  },
  {
    id: 'active',
    value: '۶',
    label: 'ارزیابی فعال',
    link: '۲ ارزیابی نزدیک به پایان',
    href: '/org/assessments?tab=active',
    icon: S('stat-tests-done'),
    fg: T.successStrong,
    bg: T.tintGreen,
    dot: true,
  },
  {
    id: 'draft',
    value: '۲',
    label: 'پیش‌نویس',
    link: 'مشاهده پیش‌نویس‌ها',
    href: '/org/assessments?tab=draft',
    icon: S('stat-employees'),
    fg: T.accent,
    bg: T.tintOrange,
  },
  {
    id: 'planned',
    value: '۲',
    label: 'برنامه‌ریزی‌شده',
    link: 'مشاهده تقویم',
    href: '/org/assessments?tab=planned',
    icon: S('stat-active-eval'),
    fg: T.infoStrong,
    bg: T.tintBlue,
  },
  {
    id: 'rate',
    value: '۸۲%',
    label: 'میانگین نرخ تکمیل',
    link: 'گزارش تفصیلی',
    href: '/org/reports/organisation',
    icon: S('stat-tests-done'),
    fg: T.successStrong,
    bg: T.tintGreen,
  },
];

export const assessTabs = [
  { id: 'all', label: 'همه', count: '۱۸' },
  { id: 'active', label: 'فعال', count: '۶' },
  { id: 'draft', label: 'پیش‌نویس', count: '۲' },
  { id: 'planned', label: 'برنامه‌ریزی‌شده', count: '۲' },
  { id: 'completed', label: 'تکمیل شده', count: '۷' },
  { id: 'expired', label: 'منقضی‌شده', count: '۱' },
];

export const assessFilters = [
  { id: 'period', label: 'بازه زمانی', icon: 'lucide:calendar' },
  { id: 'type', label: 'نوع ارزیابی', icon: 'lucide:chevrons-up-down' },
  { id: 'group', label: 'گروه / واحد', icon: 'lucide:chevrons-up-down' },
  { id: 'sort', label: 'جدیدترین', icon: 'lucide:arrow-down-up' },
];

export const assessAlert = {
  text: 'ارزیابی «مدیران فروش» ۳ نفر هنوز شروع نکرده‌اند و فقط ۲ روز تا پایان ارزیابی باقی مانده است.',
  action: 'ارسال یادآوری',
};

/* The card shows one of three faces depending on state: a ring of
   progress for anything running or finished, or a flat tinted tile
   for work that has not started and therefore has nothing to ring. */
export type CardFace =
  | { kind: 'ring'; pct: number; colour: string }
  | { kind: 'tile'; icon: string; fg: string; bg: string };

export type AssessState =
  | 'active'
  | 'completed'
  | 'planned'
  | 'draft'
  | 'pending'
  | 'expired';

export interface AssessCard {
  id: string;
  title: string;
  desc: string;
  status: AssessState;
  face: CardFace;
  /** Label differs by state — a deadline, a start date, a finish date. */
  dateLabel: string;
  date: string;
  tests: string;
  people: string;
  progress?: { done: number; doing: number; idle: number };
  cta: { label: string; href: string };
}

export const assessCards: AssessCard[] = [
  {
    id: 'sales-managers',
    title: 'ارزیابی مدیران فروش',
    desc: 'ارزیابی شایستگی و آمادگی توسعه مدیران فروش',
    status: 'active',
    face: { kind: 'ring', pct: 82, colour: T.success },
    dateLabel: 'مهلت:',
    date: '۳۰ شهریور ۱۴۰۵',
    tests: 'آزمون',
    people: '۴۲ نفر',
    progress: { done: 34, doing: 5, idle: 3 },
    cta: { label: 'مشاهده ارزیابی', href: '/org/assessments/sales-managers' },
  },
  {
    id: 'management-talent',
    title: 'ارزیابی استعدادهای مدیریتی',
    desc: 'شناسایی و توسعه استعدادهای مدیران آینده',
    status: 'planned',
    face: {
      kind: 'tile',
      icon: icon3x('evaluation-types', 'type-periodic'),
      fg: T.primary,
      bg: T.tintPurple,
    },
    dateLabel: 'شروع:',
    date: '۱ مهر ۱۴۰۵',
    tests: 'آزمون',
    people: '۲۸ نفر',
    cta: { label: 'مشاهده ارزیابی', href: '/org/assessments/management-talent' },
  },
  {
    id: 'hr-team',
    title: 'ارزیابی تیم منابع انسانی',
    desc: 'ارزیابی اثربخشی و مهارت‌های تیمی',
    status: 'completed',
    face: { kind: 'ring', pct: 100, colour: T.info },
    dateLabel: 'تکمیل:',
    date: '۱۵ مرداد ۱۴۰۵',
    tests: 'آزمون',
    people: '۱۶ نفر',
    cta: { label: 'مشاهده نتایج', href: '/org/reports/hr-team' },
  },
  {
    id: 'employee-experience',
    title: 'ارزیابی تجربه کارکنان',
    desc: 'سنجش رضایت و تجربه کارکنان',
    status: 'active',
    face: { kind: 'ring', pct: 67, colour: T.success },
    dateLabel: 'مهلت:',
    date: '۵ شهریور ۱۴۰۵',
    tests: 'آزمون',
    people: '۸۵ نفر',
    progress: { done: 57, doing: 22, idle: 6 },
    cta: { label: 'مشاهده ارزیابی', href: '/org/assessments/employee-experience' },
  },
  {
    id: 'specialist-competency',
    title: 'ارزیابی شایستگی کارشناسان',
    desc: 'ارزیابی شایستگی‌های تخصصی کارشناسان',
    status: 'pending',
    face: {
      kind: 'tile',
      icon: 'lucide:hourglass',
      fg: T.accent,
      bg: T.tintOrange,
    },
    dateLabel: 'شروع:',
    date: '۲۰ شهریور ۱۴۰۵',
    tests: 'آزمون',
    people: '۴۰ نفر',
    cta: { label: 'مشاهده ارزیابی', href: '/org/assessments/specialist-competency' },
  },
  {
    id: 'spring-performance',
    title: 'ارزیابی عملکرد دوره بهار ۱۴۰۵',
    desc: 'ارزیابی عملکرد فصلی کارکنان',
    status: 'completed',
    face: { kind: 'ring', pct: 100, colour: T.success },
    dateLabel: 'تکمیل:',
    date: '۳۱ خرداد ۱۴۰۵',
    tests: 'آزمون',
    people: '۱۲۰ نفر',
    cta: { label: 'مشاهده نتایج', href: '/org/reports/spring-performance' },
  },
];

/* The row menu from screen 3. Closing an assessment is the only
   destructive entry, so it sits last behind a rule and in red. */
export const assessRowMenu = [
  { id: 'view', label: 'مشاهده ارزیابی', icon: 'lucide:eye' },
  { id: 'edit', label: 'ویرایش تنظیمات', icon: 'lucide:pencil' },
  { id: 'add', label: 'افزودن کارکنان', icon: 'lucide:user-round-plus' },
  { id: 'remind', label: 'ارسال یادآوری', icon: 'lucide:send' },
  { id: 'extend', label: 'تمدید مهلت', icon: 'lucide:calendar-check' },
  { id: 'duplicate', label: 'تکثیر ارزیابی', icon: 'lucide:copy' },
  { id: 'close', label: 'بستن ارزیابی', icon: 'lucide:lock-keyhole', danger: true },
];

export const assessFooter = {
  showing: 'نمایش ۱ تا ۹ از ۱۸ ارزیابی',
  perPage: '۹ در صفحه',
  pages: ['۱', '۲'],
};
