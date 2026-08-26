import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Results landing — /org/results

   Screen 14. The section's front door. It reports the same
   organisation-level figures as the comprehensive report (screen
   15) — ۷۴.۲, ۹۲٪, ۱,۲۸۴, ۳۸ needing attention — so the shared
   panels import from ./orgOverview rather than restating them,
   and the two can never disagree. Only what is unique to this
   screen lives here.
────────────────────────────────────────────────────────────── */

export const resultsHead = {
  title: 'نتایج و گزارش‌ها',
  desc: 'تحلیل نتایج ارزیابی‌ها، مشاهده روندها و دریافت گزارش‌های فردی، تیمی و سازمانی',
  crumbs: [{ label: 'نتایج و گزارش‌ها' }],
  build: { label: 'ساخت گزارش سفارشی', href: '/org/reports/new' },
  download: 'دانلود گزارش جامع',
};

export const resultsFilters = [
  { id: 'period', label: 'دوره', value: 'تابستان ۱۴۰۵', icon: 'lucide:calendar' },
  { id: 'assessment', label: 'ارزیابی', value: 'همه ارزیابی‌ها' },
  { id: 'unit', label: 'واحد سازمانی', value: 'کل سازمان' },
  { id: 'group', label: 'گروه شغلی', value: 'همه گروه‌ها' },
  { id: 'compare', label: 'مقایسه با', value: 'بهار ۱۴۰۵' },
];

export const resultsKpis = [
  { id: 'assessments', value: '۱۲', label: 'ارزیابی احرازشده', sub: '۴ نسبت به دوره قبل', up: true, icon: 'lucide:clipboard-check', fg: T.primary, bg: T.tintPurple },
  { id: 'satisfaction', value: '۴.۲ از ۵', label: 'رضایت از تجربه ارزیابی', sub: '۰.۴', up: true, icon: 'lucide:smile', fg: T.accent, bg: T.tintOrange },
  { id: 'score', value: '۷۴.۲', label: 'میانگین امتیاز کل', sub: '۸.۹٪ نسبت به دوره قبل', up: true, icon: 'lucide:trending-up', fg: T.infoStrong, bg: T.tintBlue },
  { id: 'completion', value: '۹۲ ٪', label: 'نرخ تکمیل', sub: '۸٪ نسبت به دوره قبل', up: true, icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
  { id: 'participants', value: '۱,۲۸۴', label: 'شرکت‌کننده', sub: '۶۹٪ نسبت به دوره قبل', up: true, icon: 'lucide:users-round', fg: T.violet, bg: T.tintPurple },
];

/* The strip of one-line findings that sits under the KPIs. */
export const resultsInsights = {
  cta: 'مشاهده تحلیل کامل AI',
  chips: [
    { label: 'عملکرد کلی نسبت به دوره قبل', value: '۸.۹٪ بهبود داشته است.', fg: T.successStrong, bg: T.tintGreen, icon: 'lucide:arrow-up' },
    { label: 'بیشترین رشد در', value: 'مهارت‌های فروش', fg: T.successStrong, bg: T.tintGreen, icon: 'lucide:trending-up' },
    { label: 'بیشترین کاهش در', value: 'مدیریت زمان', fg: T.danger, bg: T.tintRed, icon: 'lucide:trending-down' },
    { label: 'واحد نیازمند توجه', value: 'فروش منطقه غرب', fg: T.accent, bg: T.tintOrange, icon: 'lucide:triangle-alert' },
  ],
};

export const resultsTestBreakdown = {
  title: 'نتایج بر اساس آزمون',
  cta: 'مشاهده همه آزمون‌ها',
  view: 'مشاهده تحلیل',
  rows: [
    { id: 'mbti', label: 'MBTI', people: '۳۴ نفر', note: 'تیپ غالب: ESTJ ۲۴٪', icon: '/images/aryaz/test-icons-3d/test-mbti.png' },
    { id: 'eq', label: 'هوش هیجانی', people: '۱۳۴ نفر', note: 'میانگین: ۷۶/۱۰۰', delta: '+۴.۲٪', icon: '/images/aryaz/test-icons-3d/test-eq.png' },
    { id: 'competency', label: 'شایستگی مدیریتی', people: '۳۴ نفر', note: 'میانگین: ۷۲/۱۰۰', icon: '/images/aryaz/test-icons-3d/quest-competency.png' },
    { id: 'leadership', label: 'سبک رهبری', people: '۳۵ نفر', note: 'سبک غالب: تحولی', icon: '/images/aryaz/test-icons-3d/test-leadership.png' },
  ],
};

export const resultsMyReports = {
  title: 'گزارش‌های شما',
  all: { label: 'مشاهده همه گزارش‌ها', href: '/org/reports' },
  cards: [
    { id: 'period', label: 'گزارش جامع دوره‌ای', format: 'PDF / Excel', note: 'ماهانه', href: '/org/reports/organisation' },
    { id: 'managers', label: 'گزارش مدیران', format: 'PDF / Excel', note: 'فصلی', href: '/org/reports/organisation' },
    { id: 'units', label: 'گزارش واحدها', format: 'PDF / Excel', note: 'فصلی', href: '/org/reports/units/sales' },
    { id: 'talent', label: 'گزارش استعدادها', format: 'PDF / Excel', note: 'فصلی', href: '/org/reports/talent-matrix' },
  ],
};

export const resultsRecent = {
  title: 'گزارش‌های اخیر',
  cta: 'مشاهده همه گزارش‌های اخیر',
  cols: { name: 'گزارش', author: 'ایجادکننده', date: 'تاریخ ایجاد', type: 'نوع', ops: 'عملیات' },
  rows: [
    { name: 'ارزیابی مدیران فروش', author: 'علی احمدی', date: '۱۴۰۵/۰۵/۲۵', type: 'PDF', fg: T.danger, bg: T.tintRed },
    { name: 'گزارش شایستگی‌های سازمان', author: 'سارا محمدی', date: '۱۴۰۵/۰۵/۲۴', type: 'Excel', fg: T.successStrong, bg: T.tintGreen },
    { name: 'تحلیل هوش هیجانی کارکنان', author: 'مهدی رضایی', date: '۱۴۰۵/۰۵/۲۶', type: 'PDF', fg: T.danger, bg: T.tintRed },
  ],
};

export const resultsAsk = {
  title: 'از داده‌های سازمانتان سوال کنید',
  desc: 'با استفاده از هوش مصنوعی آریاز، از نتایج سازمان خود تحلیل‌های عمیق دریافت کنید.',
  placeholder: 'درباره نتایج ارزیابی‌های سازمان سوال کنید...',
  chips: [
    'کدام واحد بیشترین رشد را داشته است؟',
    'چه کسانی آماده ارتقا هستند؟',
    'مهم‌ترین شکاف شایستگی سازمان چیست؟',
    'نتایج امسال را با پارسال مقایسه کن',
  ],
};
