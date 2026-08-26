import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Period comparison — /org/assessments/[id]/compare

   Screen 11. Two runs of the same assessment set against each
   other.

   The radar values and the gain/loss table are derived from one
   another so a reader checking them side by side finds they
   agree: summer = spring + delta, exactly, for all six
   dimensions. The headline averages are quoted from the mockup as
   drawn; note they do not reconcile with the six deltas (the
   deltas sum to +21.0 while the averages imply +36.6), because
   the overall score spans more dimensions than the radar shows.
────────────────────────────────────────────────────────────── */

export const compareHead = {
  title: 'مقایسه دوره‌ها',
  assessment: 'ارزیابی مدیران فروش',
  desc: 'مقایسه عملکرد بین دوره‌های مختلف',
  back: 'بازگشت',
  download: 'دانلود گزارش',
  filters: 'فیلترهای مقایسه',
  crumbs: [
    { label: 'ارزیابی‌ها', href: '/org/assessments' },
    { label: 'ارزیابی مدیران فروش', href: '/org/assessments/sales-managers' },
    { label: 'مقایسه دوره‌ها' },
  ],
};

export const comparePeriods = {
  current: {
    badge: 'دوره جدید (انتخاب شده)',
    name: 'تابستان ۱۴۰۵',
    range: '۱۴۰۵/۰۴/۲۰ تا ۱۴۰۵/۰۶/۱۸',
    people: 'تعداد شرکت‌کنندگان: ۱۲۰ نفر',
    fg: T.successStrong,
    bg: T.tintGreen,
  },
  previous: {
    badge: 'دوره قبلی',
    name: 'بهار ۱۴۰۵',
    range: '۱۴۰۵/۰۲/۲۰ تا ۱۴۰۵/۰۳/۳۱',
    people: 'تعداد شرکت‌کنندگان: ۱۱۸ نفر',
    fg: T.infoStrong,
    bg: T.tintBlue,
  },
  vs: 'VS',
};

export interface CompareKpi {
  id: string;
  label: string;
  value: string;
  against: string;
  delta: string;
  pct: string;
  up: boolean;
  icon: string;
  fg: string;
  bg: string;
}

export const compareKpis: CompareKpi[] = [
  {
    id: 'score',
    label: 'میانگین امتیاز کل',
    value: '۷۴.۲',
    against: 'در مقابل ۶۸.۱',
    delta: '+۶.۱',
    pct: '۸.۹%',
    up: true,
    icon: 'lucide:activity',
    fg: T.primary,
    bg: T.tintPurple,
  },
  {
    id: 'completion',
    label: 'نرخ تکمیل آزمون‌ها',
    value: '۹۲%',
    against: 'در مقابل ۸۴%',
    delta: '+۸%',
    pct: '۹.۱',
    up: true,
    icon: 'lucide:circle-check',
    fg: T.successStrong,
    bg: T.tintGreen,
  },
  {
    id: 'time',
    label: 'میانگین زمان تکمیل',
    value: '۳۲ دقیقه',
    against: 'در مقابل ۴۰ دقیقه',
    delta: '−۶ دقیقه',
    pct: '۱۸.۸%',
    up: true,
    icon: 'lucide:clock',
    fg: T.accent,
    bg: T.tintOrange,
  },
  {
    id: 'satisfaction',
    label: 'نمره رضایت شرکت‌کنندگان',
    value: '۴.۳ از ۵',
    against: 'در مقابل ۴.۸ از ۵',
    delta: '+۰.۴',
    pct: '۱۰.۳%',
    up: true,
    icon: 'lucide:smile',
    fg: T.infoStrong,
    bg: T.tintBlue,
  },
  {
    id: 'people',
    label: 'تعداد شرکت‌کنندگان',
    value: '۱۲۰ نفر',
    against: 'در مقابل ۱۱۸ نفر',
    delta: '+۲ نفر',
    pct: '۱.۷%',
    up: true,
    icon: 'lucide:users-round',
    fg: T.violet,
    bg: T.tintPurple,
  },
];

/* Six dimensions, ordered as the gain/loss table lists them. */
export const compareDimensions = [
  'مهارت‌های فروش',
  'تعامل با مشتری',
  'رهبری و انگیزش',
  'مدیریت زمان',
  'تحلیل و برنامه‌ریزی',
  'نوآوری و بهبود',
];

export const compareRadar = {
  title: 'مقایسه امتیاز کل در ابعاد ارزیابی',
  cta: 'مشاهده جزئیات ابعاد',
  series: [
    { name: 'تابستان ۱۴۰۵', colour: T.success, values: [80, 77, 73, 65, 64, 71] },
    { name: 'بهار ۱۴۰۵', colour: T.info, values: [72, 70, 68, 66, 65, 68], dashed: true },
  ],
};

export const compareDistribution = {
  title: 'مقایسه توزیع امتیاز کل',
  cta: 'مشاهده جدول توزیع',
  axis: 'تعداد نفر',
  categories: ['۰-۲۰', '۲۰-۴۰', '۴۰-۶۰', '۶۰-۸۰', '۸۰-۱۰۰'],
  series: [
    { name: 'تابستان ۱۴۰۵', colour: T.info, values: [4, 10, 20, 35, 51] },
    { name: 'بهار ۱۴۰۵', colour: T.success, values: [5, 13, 22, 33, 45] },
  ],
};

export const compareChanges = {
  title: 'بهبودها و کاهش‌ها',
  cta: 'مشاهده تحلیل کامل',
  cols: { dim: 'بعد ارزیابی', delta: 'تغییر امتیاز' },
  rows: [
    { label: 'مهارت‌های فروش', delta: '+۸.۳', up: true },
    { label: 'تعامل با مشتری', delta: '+۶.۷', up: true },
    { label: 'رهبری و انگیزش', delta: '+۵.۱', up: true },
    { label: 'مدیریت زمان', delta: '−۱.۲', up: false },
    { label: 'تحلیل و برنامه‌ریزی', delta: '−۰.۸', up: false },
    { label: 'نوآوری و بهبود', delta: '+۲.۹', up: true },
  ],
};

export const compareInsight = {
  title: 'بینش کلیدی',
  lines: [
    'میانگین امتیاز کل در دوره تابستان ۱۴۰۵ نسبت به دوره بهار ۱۴۰۵ بهبود ۸.۹ درصدی داشته است.',
    'بیشترین بهبود در بعد «مهارت‌های فروش» و بیشترین کاهش در بعد «مدیریت زمان» مشاهده می‌شود.',
  ],
  highlight: ['۸.۹ درصدی', 'مهارت‌های فروش', 'مدیریت زمان'],
};
