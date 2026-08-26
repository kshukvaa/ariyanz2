import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Reports centre — /org/reports

   Screen 22. The hub: four suggested report shapes, what has been
   generated lately, what is on a schedule, and six one-click
   extracts for people who just want the raw rows.
────────────────────────────────────────────────────────────── */

export const reportsHead = {
  title: 'مرکز گزارش‌ها',
  desc: 'ایجاد، مدیریت، دریافت و اشتراک‌گذاری گزارش‌های تحلیلی سازمان',
  build: { label: 'ساخت گزارش سفارشی', href: '/org/reports/new' },
  schedule: { label: 'زمان‌بندی گزارش', href: '/org/reports?schedule=1' },
  search: 'جستجو در گزارش‌ها...',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'مرکز گزارش‌ها' },
  ],
};

export const reportsFilters = [
  { id: 'period', label: 'دوره', value: 'تابستان ۱۴۰۵' },
  { id: 'unit', label: 'واحد متقاضی', value: 'همه واحدها' },
  { id: 'format', label: 'نوع گزارش', value: 'همه فرمت‌ها' },
];

export const reportsTabs = [
  'همه',
  'سازمانی',
  'واحد و تیم',
  'کارکنان',
  'ارزیابی‌ها',
  'آزمون‌ها',
  'استعداد و جانشینی',
  'توسعه',
];

export interface SuggestedReport {
  id: string;
  title: string;
  icon: string;
  fg: string;
  bg: string;
  items: string[];
  /** The talent card is the only filled button in the mockup. */
  filled?: boolean;
  href: string;
}

export const reportsSuggested: SuggestedReport[] = [
  {
    id: 'talent',
    title: 'گزارش استعدادها و جانشینی',
    icon: 'lucide:star',
    fg: T.primary,
    bg: T.tintPurple,
    items: [
      'High Potential',
      '9-box ماتریس',
      'Succession Readiness',
      'Key Roles',
      'ریسک و خروج استعدادها',
    ],
    filled: true,
    href: '/org/reports/new?type=talent',
  },
  {
    id: 'managers',
    title: 'گزارش مدیران',
    icon: 'lucide:user-round',
    fg: T.infoStrong,
    bg: T.tintBlue,
    items: [
      'عملکرد واحدها',
      'عملکرد مدیران',
      'شایستگی‌های واحد',
      'Gapها',
      'اقدامات واحدی',
    ],
    href: '/org/reports/new?type=managers',
  },
  {
    id: 'board',
    title: 'گزارش هیئت‌مدیره',
    icon: 'lucide:crown',
    fg: T.accent,
    bg: T.tintOrange,
    items: [
      'وضعیت کلیدی سازمان',
      'روندهای مهم',
      'ریسک‌های کلیدی',
      'استعدادهای کلیدی',
      'اقدامات پیشنهادی',
    ],
    href: '/org/reports/new?type=board',
  },
  {
    id: 'org',
    title: 'گزارش جامع سازمان',
    icon: 'lucide:users-round',
    fg: T.successStrong,
    bg: T.tintGreen,
    items: [
      'عملکرد سازمان',
      'شایستگی‌ها',
      'مهارت‌ها و پرسش‌ها',
      'روندها و مقایسه‌ها',
    ],
    href: '/org/reports/new?type=org',
  },
];

export const reportsSuggestedHead = {
  title: 'گزارش‌های پیشنهادی آریاز',
  cta: 'ساخت گزارش',
};

/* ── Recent ──────────────────────────────────────────────────── */

export const reportsRecent = {
  title: 'گزارش‌های اخیر',
  cta: 'مشاهده همه گزارش‌ها',
  cols: {
    name: 'نام گزارش',
    scope: 'دامنه',
    period: 'دوره',
    author: 'ایجادکننده',
    date: 'تاریخ ایجاد',
    format: 'فرمت',
    state: 'وضعیت',
    ops: 'عملیات',
  },
  ready: 'آماده',
  rows: [
    {
      id: 'org-full',
      name: 'گزارش جامع سازمان',
      scope: 'سازمان',
      period: 'تابستان ۱۴۰۵',
      author: 'علی احمدی',
      date: '۱۴۰۵/۰۵/۲۶',
      format: 'PDF',
      formatFg: T.danger,
      formatBg: T.tintRed,
    },
    {
      id: 'sales-managers',
      name: 'گزارش مدیران فروش',
      scope: 'فروش',
      period: 'تابستان ۱۴۰۵',
      author: 'علی احمدی',
      date: '۱۴۰۵/۰۵/۲۴',
      format: 'PDF',
      formatFg: T.danger,
      formatBg: T.tintRed,
    },
    {
      id: 'mgmt-talent',
      name: 'گزارش استعدادهای مدیریتی',
      scope: 'سازمان',
      period: 'بهار ۱۴۰۵',
      author: 'واحد منابع انسانی',
      date: '۱۴۰۵/۰۵/۲۰',
      format: 'Excel',
      formatFg: T.successStrong,
      formatBg: T.tintGreen,
    },
    {
      id: 'period-compare',
      name: 'گزارش مقایسه دوره‌ای',
      scope: 'سازمان',
      period: 'تابستان ۱۴۰۵',
      author: 'علی احمدی',
      date: '۱۴۰۵/۰۵/۱۵',
      format: 'PDF',
      formatFg: T.danger,
      formatBg: T.tintRed,
    },
    {
      id: 'ops-unit',
      name: 'گزارش عملکرد واحد عملیات',
      scope: 'عملیات',
      period: 'تابستان ۱۴۰۵',
      author: 'مدیر عملیات',
      date: '۱۴۰۵/۰۵/۱۲',
      format: 'Excel',
      formatFg: T.successStrong,
      formatBg: T.tintGreen,
    },
  ],
  menu: [
    { id: 'view', label: 'مشاهده گزارش', icon: 'lucide:eye' },
    { id: 'pdf', label: 'دانلود PDF', icon: 'lucide:file-down' },
    { id: 'excel', label: 'دانلود Excel', icon: 'lucide:file-spreadsheet' },
    { id: 'new', label: 'ساخت نسخه جدید', icon: 'lucide:refresh-cw' },
    { id: 'share', label: 'اشتراک‌گذاری', icon: 'lucide:share-2' },
    { id: 'schedule', label: 'زمان‌بندی ارسال', icon: 'lucide:calendar-check' },
    { id: 'duplicate', label: 'تکثیر گزارش', icon: 'lucide:copy' },
    { id: 'delete', label: 'حذف گزارش', icon: 'lucide:trash-2', danger: true },
  ],
};

/* ── Scheduled ───────────────────────────────────────────────── */

export const reportsScheduled = {
  title: 'گزارش‌های زمان‌بندی‌شده',
  cta: 'زمان‌بندی جدید',
  active: 'فعال',
  cols: {
    name: 'نام گزارش',
    cadence: 'تناوب',
    when: 'زمان ارسال',
    to: 'گیرندگان',
    format: 'فرمت',
    state: 'وضعیت',
    ops: 'عملیات',
  },
  rows: [
    {
      id: 'monthly-hc',
      name: 'گزارش ماهانه سرمایه انسانی',
      cadence: 'ماهانه',
      when: 'روز اول هر ماه — ۰۸:۰۰',
      to: 'HR Director',
      format: 'PDF',
      formatFg: T.danger,
      formatBg: T.tintRed,
    },
    {
      id: 'quarterly-mgr',
      name: 'گزارش فصلی مدیران',
      cadence: 'فصلی',
      when: 'آخرین روز فصل — ۱۵:۰۰',
      to: 'مدیرعامل، مدیران ارشد',
      format: 'PDF',
      formatFg: T.danger,
      formatBg: T.tintRed,
    },
    {
      id: 'attrition-risk',
      name: 'گزارش ریسک خروج استعدادها',
      cadence: 'ماهانه',
      when: 'روز ۱۵ هر ماه — ۰۹:۰۰',
      to: 'HR Director',
      format: 'Excel',
      formatFg: T.successStrong,
      formatBg: T.tintGreen,
    },
  ],
};

/* ── Three side panels ───────────────────────────────────────── */

export const reportsBuilding = {
  title: 'در حال تولید',
  cta: 'مشاهده صف تولید',
  rows: [
    { label: 'گزارش جامع ارزیابی تابستان ۱۴۰۵', pct: 22, note: 'در حال جمع‌آوری داده‌ها...', colour: T.primary },
    { label: 'گزارش استعدادها و جانشینی', pct: 44, note: 'در حال تحلیل ماتریس ۹ خانه...', colour: T.primary },
    { label: 'گزارش ریسک خروج استعدادها', pct: 73, note: 'آماده تا لحظاتی دیگر', colour: T.success },
  ],
};

export const reportsPopular = {
  title: 'گزارش‌های محبوب',
  cta: 'مشاهده همه',
  countLabel: 'تعداد دانلود',
  rows: [
    { label: 'گزارش جامع سازمان', count: '۱۲' },
    { label: 'گزارش مدیران', count: '۹' },
    { label: 'گزارش استعدادها و جانشینی', count: '۸' },
    { label: 'گزارش مقایسه دوره‌ای', count: '۷' },
    { label: 'گزارش ریسک خروج استعدادها', count: '۶' },
  ],
};

export const reportsShared = {
  title: 'اشتراک‌گذاری‌های فعال',
  cta: 'مدیریت اشتراک‌گذاری‌ها',
  cols: { report: 'گزارش', to: 'اشتراک با', access: 'دسترسی', until: 'انقضا' },
  rows: [
    {
      report: 'گزارش استعدادها',
      to: 'مدیرعامل',
      access: 'فقط مشاهده',
      until: '۱۴۰۵/۰۶/۲۰',
      fg: T.infoStrong,
      bg: T.tintBlue,
    },
    {
      report: 'گزارش عملکرد فروش',
      to: 'مدیر فروش',
      access: 'مشاهده و دانلود',
      until: '۱۴۰۵/۰۶/۱۵',
      fg: T.successStrong,
      bg: T.tintGreen,
    },
    {
      report: 'گزارش هیئت‌مدیره',
      to: 'هیئت مدیره',
      access: 'فقط مشاهده',
      until: '۱۴۰۵/۰۶/۱۰',
      fg: T.infoStrong,
      bg: T.tintBlue,
    },
  ],
};

/* ── Quick extracts ──────────────────────────────────────────── */

export const reportsQuick = {
  title: 'خروجی سریع (دریافت فوری داده‌ها)',
  format: 'Excel',
  cards: [
    { id: 'dev', label: 'اقدامات توسعه‌ای', sub: 'برنامه‌ها و پیگیری‌ها', icon: 'lucide:rocket', fg: T.primary, bg: T.tintPurple },
    { id: 'talent', label: 'گزارش استعداد', sub: '۹ پتانسیل و شناسایی', icon: 'lucide:star', fg: T.violet, bg: T.tintPurple },
    { id: 'competency', label: 'وضعیت‌های شایستگی', sub: 'شکاف‌ها و اولویت‌ها', icon: 'lucide:target', fg: T.accent, bg: T.tintOrange },
    { id: 'tests', label: 'نتایج آزمون‌ها', sub: 'امتیازات و شایستگی', icon: 'lucide:clipboard-check', fg: T.infoStrong, bg: T.tintBlue },
    { id: 'assessments', label: 'نتایج ارزیابی‌ها', sub: 'امتیازات و شایستگی', icon: 'lucide:chart-no-axes-combined', fg: T.successStrong, bg: T.tintGreen },
    { id: 'staff', label: 'لیست کارکنان', sub: 'اطلاعات و سازماندهی', icon: 'lucide:users-round', fg: T.danger, bg: T.tintRed },
  ],
};

export const reportsAsk = {
  title: 'درباره گزارش‌ها از آریاز بپرسید',
  placeholder: 'سوال خود را بنویسید...',
  chips: [
    'گزارش تسک‌ها را چطور بسازم؟',
    'گزارش انتشار را با چه بسنجیم؟',
    'آخرین گزارش مدیران فروش چه زمانی آماده است؟',
    'فرمت مناسب برای هیئت مدیره کدام است؟',
  ],
};
