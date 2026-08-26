import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Comprehensive organisation report — /org/reports/organisation

   Screen 15. The flagship read: one page covering scores, the
   competency shape, unit standings, talent distribution and what
   moved since last period.

   Figures are consistent across panels on purpose — the gauge
   (74.2), the trend line's last point, and the "میانگین امتیاز
   کل" KPI are the same number; 68.1 is last period everywhere;
   and the ۳۸ needing attention matches the worklist on screen 20.
────────────────────────────────────────────────────────────── */

export const overviewHead = {
  title: 'گزارش جامع سرمایه انسانی سازمان',
  desc: 'نمای یکپارچه نتایج ارزیابی‌ها، نقاط قوت، شکاف‌های توسعه‌ای و روند تغییرات سازمان',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'گزارش جامع سازمان' },
  ],
  refresh: 'به‌روزرسانی گزارش',
};

export const overviewFilters = [
  { id: 'period', label: 'دوره', value: 'تابستان ۱۴۰۵', icon: 'lucide:calendar' },
  { id: 'report', label: 'دوره گزارش', value: '۱۴۰۵' },
  { id: 'compare', label: 'مقایسه با', value: 'بهار ۱۴۰۵' },
  { id: 'unit', label: 'واحد سازمانی', value: 'کل سازمان' },
  { id: 'kind', label: 'نوع ارزیابی', value: 'همه' },
];

export const overviewKpis = [
  {
    id: 'assessed',
    value: '۱,۲۸۴',
    label: 'کارمند ارزیابی‌شده',
    sub: '+۷٪ نسبت به دوره قبل',
    up: true,
    icon: 'lucide:users-round',
    fg: T.primary,
    bg: T.tintPurple,
  },
  {
    id: 'completion',
    value: '۹۲ ٪',
    label: 'نرخ تکمیل',
    sub: '+۸٪',
    up: true,
    icon: 'lucide:circle-check',
    fg: T.successStrong,
    bg: T.tintGreen,
  },
  {
    id: 'score',
    value: '۷۴.۲',
    label: 'امتیاز کل سازمان',
    sub: '+۶.۱',
    up: true,
    icon: 'lucide:trending-up',
    fg: T.infoStrong,
    bg: T.tintBlue,
  },
  {
    id: 'potential',
    value: '۷۸',
    label: 'امتیاز پتانسیل',
    sub: '+۳.۲',
    up: true,
    icon: 'lucide:trophy',
    fg: T.warning,
    bg: T.tintOrange,
  },
  {
    id: 'readiness',
    value: '۷۱',
    label: 'شاخص آمادگی توسعه',
    sub: '+۴.۸',
    up: true,
    icon: 'lucide:sprout',
    fg: T.successStrong,
    bg: T.tintGreen,
  },
];

export const overviewAi = {
  title: 'خلاصه مدیریتی آریاز',
  body: [
    'نتایج تابستان ۱۴۰۵ نشان می‌دهد وضعیت کلی سرمایه انسانی سازمان نسبت به دوره قبل بهبود یافته است. بیشترین رشد در «مهارت‌های فروش» و «حل مسئله» مشاهده می‌شود.',
    'با این حال، «مدیریت زمان» همچنان مهم‌ترین شکاف مشترک میان مدیران و سرپرستان است.',
  ],
  cta: 'تحلیل عمیق با آریاز',
  chips: [
    { label: 'مهم‌ترین نقطه قوت', value: 'حل مسئله', sub: '۸۲/۱۰۰', fg: T.successStrong, bg: T.tintGreen },
    { label: 'مهم‌ترین شکاف', value: 'مدیریت زمان', sub: '۶۴/۱۰۰', fg: T.muted, bg: '#f4f4f8' },
    { label: 'مهم‌ترین ریسک', value: 'افت نتایج منطقه غرب', sub: '−۷٪', fg: T.danger, bg: T.tintRed },
  ],
};

export const overviewScore = {
  title: 'امتیاز کل سازمان',
  value: 74.2,
  max: 100,
  level: 'سطح مطلوب',
  delta: '۸.۹٪',
  periods: [
    { label: 'بهار ۱۴۰۵', value: '۶۸.۱', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'تابستان ۱۴۰۵', value: '۷۴.۲', fg: T.primary, bg: T.tintPurple },
  ],
};

export const overviewTrend = {
  title: 'روند عملکرد سازمان',
  badge: 'رشد نسبت به دوره قبل',
  points: [65, 67, 68.1, 74.2],
  labels: ['پاییز ۱۴۰۴', 'زمستان ۱۴۰۴', 'بهار ۱۴۰۵', 'تابستان ۱۴۰۵'],
};

/* The heatmap header reads right-to-left in the mockup. Kept in the
   same order here so the array index matches the visual column. */
export const overviewHeatmap = {
  title: 'نقشه حرارتی شایستگی‌ها × واحد',
  cols: ['رهبری', 'ارتباطات', 'حل مسئله', 'همکاری', 'انگیزش', 'برنامه‌ریزی', 'مدیریت زمان'],
  legend: [
    { label: 'قوی', colour: '#9ee2b0' },
    { label: 'متوسط', colour: '#fbe6a2' },
    { label: 'نیازمند توجه', colour: '#f7b0b0' },
  ],
  /* 0 = needs attention, 1 = middling, 2 = strong. */
  rows: [
    { unit: 'فروش', cells: [2, 2, 2, 1, 2, 1, 0] },
    { unit: 'منابع انسانی', cells: [1, 2, 2, 2, 1, 1, 1] },
    { unit: 'مالی', cells: [1, 1, 2, 2, 1, 2, 1] },
    { unit: 'عملیات', cells: [1, 1, 1, 1, 1, 0, 0] },
    { unit: 'IT', cells: [1, 1, 2, 2, 1, 1, 1] },
    { unit: 'بازاریابی', cells: [2, 1, 1, 1, 2, 1, 0] },
  ],
};

export const overviewRadar = {
  title: 'نقشه شایستگی سازمان',
  axes: ['رهبری', 'مدیریت', 'ارتباطات', 'مدیریت زمان', 'برنامه‌ریزی', 'نوآوری'],
  values: [78, 82, 71, 64, 69, 73],
  strengthsTitle: 'نقاط قوت برتر',
  strengths: [
    { n: '۱.', label: 'حل مسئله', value: '۸۲' },
    { n: '۲.', label: 'انگیزش', value: '۸۰' },
    { n: '۳.', label: 'رهبری', value: '۷۸' },
  ],
  gapsTitle: 'اولویت توسعه',
  gaps: [
    { label: 'مدیریت زمان', value: '۶۴' },
    { label: 'برنامه‌ریزی', value: '۶۹' },
    { label: 'ارتباطات', value: '۷۱' },
  ],
};

export const overviewTalent = {
  title: 'ماتریس استعداد سازمان',
  yAxis: 'پتانسیل',
  xAxis: 'عملکرد',
  yLabels: ['بالا', 'متوسط', 'پایین'],
  xLabels: ['پایین', 'متوسط', 'بالا'],
  /* Two columns per row, as drawn on screen 15. */
  rows: [
    [
      { value: '۲۸ نفر', bg: T.tintGreen },
      { value: '۴۲ نفر', bg: T.tintGreen },
    ],
    [
      { value: '۳۶ نفر', bg: T.tintGreen },
      { value: '۷۶', bg: T.tintGreen },
    ],
    [
      { value: '۱۴ نفر', bg: T.tintOrange },
      { value: '۵۲ نفر', bg: T.tintOrange },
    ],
  ],
};

export const overviewDistribution = {
  title: 'توزیع امتیازات کارکنان',
  slices: [
    { label: 'عالی', value: 18, colour: T.info, pct: '۱۸٪' },
    { label: 'مطلوب', value: 42, colour: T.success, pct: '۴۲٪' },
    { label: 'متوسط', value: 27, colour: T.warning, pct: '۲۷٪' },
    { label: 'نیازمند توسعه', value: 10, colour: T.accent, pct: '۱۰٪' },
    { label: 'ریسک', value: 3, colour: T.danger, pct: '۳٪' },
  ],
  alert: {
    title: '۳۸ کارمند نیازمند توجه',
    lines: [
      '۱۴ نفر افت شدید نسبت به دوره قبل',
      '۹ نفر امتیاز پایین در چند بعد',
      '۱۵ نفر شکاف توسعه‌ای جدی',
    ],
    cta: 'مشاهده کارکنان نیازمند توجه',
    href: '/org/reports/attention',
  },
};

export const overviewUnits = {
  title: 'عملکرد واحدهای سازمان',
  cta: 'مشاهده تحلیل واحدها',
  cols: { rank: 'رتبه', unit: 'واحد', score: 'امتیاز', change: 'تغییر', done: 'تکمیل', state: 'وضعیت' },
  rows: [
    { rank: '۱', unit: 'فروش', score: '۹۶٪', change: '۹٪', up: true, done: '۹۶٪', state: 'عالی', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۲', unit: 'منابع انسانی', score: '۱۰٪', change: '۴٪', up: true, done: '۱۰۰٪', state: 'مطلوب', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۳', unit: 'مالی', score: '۹۴٪', change: '۲٪', up: true, done: '۹۴٪', state: 'مطلوب', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۴', unit: 'IT', score: '۹۱٪', change: '۱٪', up: true, done: '۹۲٪', state: 'مطلوب', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۵', unit: 'عملیات', score: '۸۹٪', change: '۳٪', up: false, done: '۶۸٪', state: 'توجه', fg: T.accent, bg: T.tintOrange },
    { rank: '۶', unit: 'منطقه غرب', score: '۸۱٪', change: '۷٪', up: false, done: '۶۱٪', state: 'ریسک', fg: T.danger, bg: T.tintRed },
  ],
};

export const overviewCapital = {
  title: 'سرمایه‌های کلیدی سازمان',
  rows: [
    { label: 'مدیران برتر', value: '۱۲ نفر', note: 'میانگین: ۸۶/۱۰۰', cta: 'مشاهده افراد', icon: 'lucide:trophy', fg: T.warning, bg: T.tintOrange },
    { label: 'استعدادهای آماده ارتقا', value: '۳۸ نفر', note: 'Readiness: High', cta: 'مشاهده استعدادها', icon: 'lucide:users-round', fg: T.primary, bg: T.tintPurple },
    { label: 'افراد با بیشترین رشد', value: '۳۴ نفر', note: 'رشد متوسط: +۱۴٪', cta: 'مشاهده افراد', icon: 'lucide:trending-up', fg: T.successStrong, bg: T.tintGreen },
  ],
};

export const overviewChanges = {
  title: 'چه چیزی تغییر کرده است؟',
  cta: 'مشاهده مقایسه کامل دوره‌ها',
  groups: [
    {
      id: 'up',
      label: 'بیشترین بهبود',
      icon: 'lucide:arrow-up',
      fg: T.successStrong,
      bg: T.tintGreen,
      rows: [
        { label: 'مهارت فروش', value: '+۱۲.۴٪' },
        { label: 'حل مسئله', value: '+۹.۸٪' },
        { label: 'رهبری', value: '+۷.۲٪' },
      ],
    },
    {
      id: 'down',
      label: 'بیشترین افت',
      icon: 'lucide:trending-down',
      fg: T.danger,
      bg: T.tintRed,
      rows: [
        { label: 'مدیریت زمان', value: '−۶.۲٪' },
        { label: 'برنامه‌ریزی', value: '−۳.۸٪' },
      ],
    },
    {
      id: 'flat',
      label: 'بدون تغییر معنادار',
      icon: 'lucide:equal',
      fg: T.muted,
      bg: '#f4f4f8',
      rows: [{ label: 'همکاری', value: '+۰.۴٪' }],
    },
  ],
};

export const overviewTests = {
  title: 'نتایج آزمون‌ها',
  cta: 'مشاهده گزارش',
  cards: [
    { id: 'leadership', label: 'سبک رهبری', runs: '۲۴۵ اجرا', note: 'غالب: تحولی', icon: '/images/aryaz/test-icons-3d/test-leadership.png' },
    { id: 'competency', label: 'شایستگی مدیریتی', runs: '۲۸۹ اجرا', note: 'میانگین: ۷۲/۱۰۰', icon: '/images/aryaz/test-icons-3d/quest-competency.png' },
    { id: 'eq', label: 'EQ', runs: '۳۲۲ اجرا', note: 'میانگین: ۷۶/۱۰۰', extra: '↑ ۴.۲٪', icon: '/images/aryaz/test-icons-3d/test-eq.png' },
    { id: 'mbti', label: 'MBTI', runs: '۴۳۲ اجرا', note: 'تیپ غالب: ESTJ ۲۴٪', icon: '/images/aryaz/test-icons-3d/test-mbti.png' },
  ],
};

export const overviewAsk = {
  title: 'درباره این گزارش از آریاز بپرسید',
  placeholder: 'مثلاً چرا امتیاز منطقه غرب کاهش پیدا کرده است؟',
  chips: [
    'برای شکاف مدیریت زمان چه اقدامی؟',
    '۳ شکاف بالای زمانی رفع اقداماتی',
    'کدام واحد بیشترین رشد را داشته؟',
    'چه کسانی آماده ارتقا هستند؟',
  ],
};
