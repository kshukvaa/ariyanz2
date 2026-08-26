import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Talent matrix — /org/reports/talent-matrix

   Screen 21. The nine-box read on the management population:
   performance across, potential up.

   The nine cells sum to 202, which is the figure the distribution
   donut reports as «کل مدیران». The five headline counts at the
   top are a different cut of the same people (a manager can be
   both Key Player and succession-ready), so those deliberately do
   not sum to 202.
────────────────────────────────────────────────────────────── */

export const talentHead = {
  title: 'ماتریس استعداد سازمان',
  desc: 'تحلیل توزیع استعدادها براساس عملکرد، پتانسیل و آمادگی رشد',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'استعدادها', href: '/org/reports/talent-matrix' },
    { label: 'ماتریس استعداد' },
  ],
  model: 'تنظیم مدل ماتریس',
  tabs: ['کل سازمان', 'واحدها', 'تیم‌ها'],
};

export const talentFilters = [
  { id: 'period', label: 'دوره ارزیابی', value: 'تابستان ۱۴۰۵', icon: 'lucide:calendar' },
  { id: 'group', label: 'گروه سازمانی', value: 'همه واحدها' },
  { id: 'role', label: 'واحد شغلی', value: 'مدیران و سرپرستان' },
  { id: 'level', label: 'سطح سازمانی', value: 'همه سطوح' },
  { id: 'manager', label: 'مدیر مستقیم', value: 'همه مدیران' },
];

export const talentKpis = [
  {
    id: 'hipo',
    value: '۲۸ نفر',
    label: 'High Potential',
    sub: '۲۱٪ از کل مدیران',
    icon: 'lucide:star',
    fg: T.primary,
    bg: T.tintPurple,
  },
  {
    id: 'key',
    value: '۴۲ نفر',
    label: 'Key Player',
    sub: '۳۱٪ از کل مدیران',
    icon: 'lucide:crown',
    fg: T.warning,
    bg: T.tintOrange,
  },
  {
    id: 'core',
    value: '۸۶ نفر',
    label: 'Core Talent',
    sub: '۳۱٪ از کل مدیران',
    icon: 'lucide:badge-check',
    fg: T.successStrong,
    bg: T.tintGreen,
  },
  {
    id: 'develop',
    value: '۳۴ نفر',
    label: 'نیازمند توسعه',
    sub: '۱۴٪ از کل مدیران',
    icon: 'lucide:target',
    fg: T.accent,
    bg: T.tintOrange,
  },
  {
    id: 'review',
    value: '۱۲ نفر',
    label: 'نیازمند بررسی',
    sub: '۹٪ از کل مدیران',
    icon: 'lucide:triangle-alert',
    fg: T.danger,
    bg: T.tintRed,
  },
];

export const talentAi = {
  title: 'تحلیل هوشمند آریاز',
  body: [
    'بر اساس نتایج ارزیابی‌های انجام‌شده، ۲۸ نفر در ناحیه استعدادهای با پتانسیل بالا قرار گرفته‌اند. بیشترین تمرکز این افراد در واحد فروش و عملیات است.',
    '۱۲ نفر نیز با وجود عملکرد مناسب، برای رشد به برنامه توسعه هدفمند نیاز دارند.',
  ],
  cta: 'تحلیل عمیق استعدادها',
  chips: [
    { label: 'بیشترین استعداد', value: 'فروش', sub: '۱۲ نفر', fg: T.successStrong, bg: T.tintGreen },
    { label: 'مهم‌ترین فرصت', value: 'توسعه مدیران آینده', sub: '۲۸ نفر', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'ریسک استعداد', value: 'خروج افراد کلیدی', sub: '۷ نفر', fg: T.danger, bg: T.tintRed },
  ],
};

/* ── The nine boxes ──────────────────────────────────────────── */

export interface TalentCell {
  label: string;
  count: string;
  pct: string;
  avg: string;
  fg: string;
  bg: string;
}

/* Declared top row first, and within each row right-to-left, so the
   array order matches the reading order of an RTL grid. */
export const talentMatrix: TalentCell[] = [
  // پتانسیل بالا
  { label: 'در حال رشد', count: '۹ نفر', pct: '۷٪', avg: 'میانگین: ۷۱', fg: T.warning, bg: T.tintOrange },
  { label: 'ستاره‌های آینده', count: '۲۷ نفر', pct: '۲۸٪', avg: 'میانگین: ۸۸', fg: T.successStrong, bg: T.tintGreen },
  { label: 'استعدادهای استراتژیک', count: '۱۴ نفر', pct: '۱۱٪', avg: 'میانگین: ۹۰', fg: T.successStrong, bg: T.tintGreen },
  // پتانسیل متوسط
  { label: 'نیازمند بهبود', count: '۱۱ نفر', pct: '۱۵٪', avg: 'میانگین: ۶۴', fg: T.accent, bg: T.tintOrange },
  { label: 'کارکنان کلیدی', count: '۳۲ نفر', pct: '۴۲٪', avg: 'میانگین: ۸۲', fg: T.successStrong, bg: T.tintGreen },
  { label: 'عملکرد بالا / پتانسیل متوسط', count: '۲۵ نفر', pct: '۱۵٪', avg: 'میانگین: ۸۰', fg: T.successStrong, bg: T.tintGreen },
  // پتانسیل پایین
  { label: 'ریسک بالا', count: '۷ نفر', pct: '۵٪', avg: 'میانگین: ۴۸', fg: T.danger, bg: T.tintRed },
  { label: 'نیازمند توسعه', count: '۲۴ نفر', pct: '۳۸٪', avg: 'میانگین: ۶۰', fg: T.accent, bg: T.tintOrange },
  { label: 'عملکرد خوب / پتانسیل پایین', count: '۱۲ نفر', pct: '۵٪', avg: 'میانگین: ۷۶', fg: T.warning, bg: T.tintOrange },
];

export const talentMatrixMeta = {
  title: 'ماتریس استعداد (۹ خانه)',
  yAxis: 'پتانسیل',
  xAxis: 'عملکرد',
  yLabels: ['بالا', 'متوسط', 'پایین'],
  xLabels: ['کم', 'متوسط', 'زیاد'],
  note: 'درصد از کل مدیران',
};

/* ── Side panels ─────────────────────────────────────────────── */

export const talentByUnit = {
  title: 'استعدادها براساس واحد سازمانی',
  legend: [
    { label: 'High Potential', colour: T.success },
    { label: 'Key Player', colour: T.info },
    { label: 'Core Talent', colour: T.violet },
    { label: 'سایر', colour: '#d5d7e3' },
  ],
  countLabel: 'تعداد افراد',
  rows: [
    { unit: 'فروش', total: '۶۴', parts: [12, 18, 26, 8] },
    { unit: 'عملیات', total: '۴۵', parts: [6, 14, 18, 7] },
    { unit: 'مالی', total: '۲۷', parts: [4, 6, 12, 5] },
    { unit: 'منابع انسانی', total: '۱۷', parts: [2, 4, 8, 3] },
    { unit: 'IT', total: '۱۵', parts: [2, 3, 6, 4] },
  ],
};

export const talentSuccession = {
  title: 'آمادگی جانشینی (Succession Readiness)',
  rows: [
    { label: 'آماده جانشینی فوری', value: '۱۵ نفر', pct: '۱۳٪', fg: T.successStrong, bg: T.tintGreen },
    { label: 'آماده طی ۱۲ تا ۱۶ ماه', value: '۳۲ نفر', pct: '۲۲٪', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'نیازمند توسعه قبل از جانشینی', value: '۴۶ نفر', pct: '۴۰٪', fg: T.accent, bg: T.tintOrange },
  ],
};

export const talentShift = {
  title: 'تغییر کلی ماتریس نسبت به دوره قبل',
  cta: 'مشاهده جزئیات تغییرات',
  before: { label: 'بهار ۱۴۰۵', cells: ['۹', '۱۲', '۲۱', '۱۶', '۲۸', '۱۸', '۱۰', '۲۹', '۸'] },
  after: { label: 'تابستان ۱۴۰۵', cells: ['۱۴', '۱۴', '۲۸', '۲۰', '۴۲', '۱۵', '۱۲', '۲۴', '۷'] },
};

export const talentDistribution = {
  title: 'توزیع کلی استعدادها',
  centre: '۲۰۲',
  centreSub: 'کل مدیران',
  slices: [
    { label: 'High Potential', value: 28, colour: T.success, pct: '۲۸ نفر (۲۱٪)' },
    { label: 'Key Player', value: 42, colour: T.info, pct: '۴۲ نفر (۳۱٪)' },
    { label: 'Core Talent', value: 86, colour: T.violet, pct: '۸۶ نفر (۳۲٪)' },
    { label: 'نیازمند توسعه', value: 34, colour: T.warning, pct: '۳۴ نفر (۱۴٪)' },
    { label: 'نیازمند بررسی', value: 12, colour: T.danger, pct: '۱۲ نفر (۹٪)' },
  ],
};

export const talentKeyRoles = {
  title: 'نقش‌های کلیدی و جانشین‌ها',
  cta: 'مشاهده همه نقش‌های کلیدی',
  cols: { role: 'نقش کلیدی', now: 'فرد فعلی', next: 'جانشین پیشنهادی', ready: 'آمادگی' },
  rows: [
    { role: 'مدیر فروش', now: 'محمد رضایی', next: 'سارا کریمی', ready: 'بالا', fg: T.successStrong, bg: T.tintGreen, nowAvatar: 'staff-mohammad-rezaei', nextAvatar: 'staff-sara-karimi' },
    { role: 'مدیر منطقه شرق', now: 'علی احمدی', next: 'رضا حسینی', ready: 'متوسط', fg: T.accent, bg: T.tintOrange, nowAvatar: 'staff-ali-ahmadi', nextAvatar: 'card-author-01' },
    { role: 'مدیر عملیات', now: 'مریم کاظمی', next: 'حسین بابایی', ready: 'بالا', fg: T.successStrong, bg: T.tintGreen, nowAvatar: 'staff-zahra-nouri', nextAvatar: 'card-author-02' },
    { role: 'مدیر مالی', now: 'مهدی نوروزی', next: 'احمد شریفی', ready: 'متوسط', fg: T.accent, bg: T.tintOrange, nowAvatar: 'staff-hamed-mousavi', nextAvatar: 'card-author-03' },
    { role: 'مدیر منابع انسانی', now: 'الهام نادری', next: 'فرشید قربانی', ready: 'بالا', fg: T.successStrong, bg: T.tintGreen, nowAvatar: 'staff-sara-karimi', nextAvatar: 'card-author-04' },
  ],
};

export const talentSuggestions = {
  title: 'پیشنهادهای توسعه‌ای آریاز',
  cta: 'ایجاد برنامه توسعه گروهی',
  cards: [
    { id: 'path', label: 'مسیر آمادگی مدیریت', sub: 'ویژه High Potential', value: '۲۶ نفر', action: 'ایجاد مسیر توسعه', fg: T.successStrong, bg: T.tintGreen },
    { id: 'coach', label: 'توسعه تخصصی مدیران', sub: 'ویژه کارکنان کلیدی', value: '۴۲ نفر', action: 'ایجاد برنامه', fg: T.infoStrong, bg: T.tintBlue },
    { id: 'improve', label: 'برنامه بهبود عملکرد', sub: 'ویژه نیازمند توسعه', value: '۳۶ نفر', action: 'ایجاد برنامه', fg: T.accent, bg: T.tintOrange },
  ],
};

export const talentActions = {
  title: 'تاریخچه اقدامات مربوط به استعدادها',
  cta: 'مشاهده همه اقدامات',
  cols: { person: 'کارمند', action: 'اقدام', owner: 'مسئول', date: 'تاریخ', state: 'وضعیت' },
  rows: [
    { person: 'سارا کریمی', action: 'برنامه فردی', owner: 'HR', date: '۱۴۰۵/۰۵/۱۸', state: 'در حال اجرا', fg: T.infoStrong, bg: T.tintBlue },
    { person: 'رضا حسینی', action: 'جلسه توسعه', owner: 'مدیر مستقیم', date: '۱۴۰۵/۰۵/۱۹', state: 'برنامه‌ریزی شده', fg: T.primary, bg: T.tintPurple },
    { person: 'مریم کاظمی', action: 'ارزیابی مجدد', owner: 'HR', date: '۱۴۰۵/۰۵/۱۲', state: 'تکمیل شده', fg: T.successStrong, bg: T.tintGreen },
    { person: 'علی رضایی', action: 'انتقال نقش', owner: 'مدیر فروش', date: '۱۴۰۵/۰۴/۳۰', state: 'در حال اجرا', fg: T.infoStrong, bg: T.tintBlue },
  ],
};

export const talentRisk = {
  title: 'ریسک خروج استعدادها',
  cta: 'مشاهده همه موارد ریسک',
  note: 'افراد کلیدی با ریسک ازدست‌رفتن بالا',
  cols: { unit: 'واحد', role: 'نقش', level: 'سطح ریسک' },
  rows: [
    { unit: 'عملیات', role: 'سرپرست تولید', level: 'بالا', fg: T.danger, bg: T.tintRed },
    { unit: 'منابع انسانی', role: 'کارشناس ارشد', level: 'بالا', fg: T.danger, bg: T.tintRed },
    { unit: 'فروش', role: 'مدیر حساب‌های کلیدی', level: 'متوسط', fg: T.accent, bg: T.tintOrange },
    { unit: 'IT', role: 'تحلیلگر ارشد', level: 'متوسط', fg: T.accent, bg: T.tintOrange },
    { unit: 'مالی', role: 'کارشناس ارشد مالی', level: 'متوسط', fg: T.accent, bg: T.tintOrange },
  ],
};

export const talentAsk = {
  title: 'درباره استعدادهای سازمان از آریاز بپرسید',
  placeholder: 'سوال خود را بنویسید...',
  chips: [
    'چه کسانی آماده ارتقا هستند؟',
    'کدام جانشین مناسبی برای مدیران است؟',
    'ریسک خروج چه کسانی بیشتر است؟',
    'برای High Potential ها چه برنامه‌ای پیشنهاد می‌کنی؟',
    'توزیع استعدادها را در دوره‌های مختلف مقایسه کن',
  ],
};
