import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Employees needing attention — /org/reports/attention

   Screen 20. A worklist rather than a report: every row is a
   person someone has to decide something about, so the columns
   end in a severity and an action state, and the tabs are the
   four reasons a person lands here.

   The four reason-tabs (۱۴ + ۹ + ۸ + ۷ = ۳۸) partition the total
   exactly — each person is filed under one primary cause.
────────────────────────────────────────────────────────────── */

export const attentionHead = {
  title: 'کارکنان نیازمند توجه',
  desc: 'شناسایی و بررسی کارکنانی که بر اساس نتایج ارزیابی، روند تغییرات و شکاف‌های توسعه نیازمند بررسی بیشتر هستند.',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'کارکنان نیازمند توجه' },
  ],
  group: 'ایجاد برنامه توسعه گروهی',
  download: 'دانلود گزارش',
};

export const attentionKpis = [
  { id: 'total', value: '۳۸', label: 'نیازمند توجه', icon: 'lucide:user-round', fg: T.primary, bg: T.tintPurple },
  { id: 'drop', value: '۱۴', label: 'افت معنادار', icon: 'lucide:trending-down', fg: T.danger, bg: T.tintRed },
  { id: 'gap', value: '۹', label: 'Gap چندبعدی', icon: 'lucide:triangle-alert', fg: T.accent, bg: T.tintOrange },
  { id: 'benchmark', value: '۸', label: 'پایین‌تر از Benchmark', icon: 'lucide:target', fg: T.infoStrong, bg: T.tintBlue },
  { id: 'priority', value: '۷', label: 'اولویت توسعه بالا', icon: 'lucide:arrow-up', fg: T.successStrong, bg: T.tintGreen },
];

export const attentionAi = {
  title: 'تحلیل آریاز از موارد نیازمند توجه',
  body: [
    '۳۸ نفر بر اساس افت امتیاز، شکاف‌های چندبعدی یا فاصله از Benchmark نیازمند بررسی بیشتر هستند.',
    '۱۴ نفر نیز نسبت به دوره قبل افت معنادار داشته‌اند که بیشترین تمرکز آن‌ها در واحد فروش منطقه غرب است.',
  ],
  cta: 'تحلیل عمیق با آریاز',
  chips: [
    { label: 'مهم‌ترین تغییر', value: '۱۴ نفر', sub: 'افت معنادار', fg: T.danger, bg: T.tintRed },
    { label: 'واحد با بیشترین موارد', value: 'فروش و منطقه غرب', sub: '۱۲ نفر', fg: T.accent, bg: T.tintOrange },
    { label: 'پرتکرارترین Gap', value: 'مدیریت زمان', sub: '۱۸ نفر', fg: T.infoStrong, bg: T.tintBlue },
  ],
};

export const attentionFilters = [
  { id: 'unit', label: 'واحد سازمانی', value: 'همه واحدها' },
  { id: 'team', label: 'تیم', value: 'همه' },
  { id: 'period', label: 'دوره', value: 'تابستان ۱۴۰۵' },
  { id: 'assessment', label: 'ارزیابی', value: 'همه' },
  { id: 'reason', label: 'نوع نیاز توجه', value: 'همه' },
  { id: 'severity', label: 'شدت', value: 'همه' },
];

export const attentionTabs = [
  { id: 'all', label: 'همه موارد', count: '۳۸' },
  { id: 'drop', label: 'افت معنادار', count: '۱۴' },
  { id: 'gap', label: 'Gap چندبعدی', count: '۹' },
  { id: 'benchmark', label: 'پایین‌تر از Benchmark', count: '۸' },
  { id: 'priority', label: 'اولویت توسعه بالا', count: '۷' },
];

export const attentionTable = {
  search: 'جستجوی کارمند...',
  cols: {
    person: 'کارمند',
    role: 'سمت',
    unit: 'واحد / تیم',
    score: 'امتیاز کل',
    change: 'تغییر نسبت به دوره قبل',
    reason: 'علت اصلی نیاز به توجه',
    severity: 'شدت',
    state: 'وضعیت اقدام',
    ops: 'عملیات',
  },
  view: 'مشاهده',
  rows: [
    {
      id: 'reza',
      person: 'رضا حسینی',
      avatar: 'card-author-01',
      role: 'کارشناس فروش',
      unit: 'فروش / غرب',
      score: '۶۷',
      change: '۱۲٪',
      reason: 'Gap چندبعدی',
      severity: 'بالا',
      sevFg: T.danger,
      sevBg: T.tintRed,
      state: 'بررسی نشده',
      stFg: T.muted,
      stBg: '#f4f4f8',
    },
    {
      id: 'maryam',
      person: 'مریم کاظمی',
      avatar: 'staff-zahra-nouri',
      role: 'کارشناس برنامه‌ریزی',
      unit: 'عملیات / برنامه‌ریزی',
      score: '۶۷',
      change: '۸٪',
      reason: 'افت معنادار',
      severity: 'بالا',
      sevFg: T.danger,
      sevBg: T.tintRed,
      state: 'در حال بررسی',
      stFg: T.accent,
      stBg: T.tintOrange,
    },
    {
      id: 'ali',
      person: 'علی رضایی',
      avatar: 'staff-ali-ahmadi',
      role: 'سرپرست فروش',
      unit: 'فروش / غرب',
      score: '۶۹',
      change: '۴٪',
      reason: 'مدیریت زمان',
      severity: 'متوسط',
      sevFg: T.accent,
      sevBg: T.tintOrange,
      state: 'برنامه توسعه',
      stFg: T.successStrong,
      stBg: T.tintGreen,
    },
    {
      id: 'sara',
      person: 'سارا کریمی',
      avatar: 'staff-sara-karimi',
      role: 'کارشناس ارشد فروش',
      unit: 'فروش / جنوب',
      score: '۷۱',
      change: '۳٪',
      reason: 'برنامه‌ریزی',
      severity: 'متوسط',
      sevFg: T.accent,
      sevBg: T.tintOrange,
      state: 'بررسی نشده',
      stFg: T.muted,
      stBg: '#f4f4f8',
    },
    {
      id: 'mohammad',
      person: 'محمد احمدی',
      avatar: 'staff-mohammad-rezaei',
      role: 'سرپرست منطقه',
      unit: 'فروش / غرب',
      score: '۷۲',
      change: '۱۰٪',
      reason: 'Gap چندبعدی',
      severity: 'بالا',
      sevFg: T.danger,
      sevBg: T.tintRed,
      state: 'برنامه توسعه',
      stFg: T.successStrong,
      stBg: T.tintGreen,
    },
    {
      id: 'elham',
      person: 'الهام نادری',
      avatar: 'card-author-04',
      role: 'کارشناس مالی',
      unit: 'مالی / حسابداری',
      score: '۷۶',
      change: '۵٪',
      reason: 'مدیریت زمان',
      severity: 'متوسط',
      sevFg: T.accent,
      sevBg: T.tintOrange,
      state: 'در حال بررسی',
      stFg: T.accent,
      stBg: T.tintOrange,
    },
  ],
  showing: 'نمایش ۱ تا ۱۰ از ۳۸ مورد',
  perPage: '۱۰ مورد در صفحه',
  pages: ['۱', '۲', '۳', '۴'],
};

export const attentionStatus = {
  title: 'وضعیت رسیدگی',
  slices: [
    { label: 'بررسی نشده', value: 28, colour: T.muted, pct: '۲۸ نفر' },
    { label: 'در حال بررسی', value: 26, colour: T.warning, pct: '۲۶ نفر' },
    { label: 'برنامه توسعه', value: 25, colour: T.success, pct: '۲۵ نفر' },
    { label: 'پیگیری مجدد', value: 24, colour: T.info, pct: '۲۴ نفر' },
    { label: 'بسته شده', value: 22, colour: T.violet, pct: '۲۲ نفر' },
  ],
};

export const attentionPriority = {
  title: 'اولویت‌بندی موارد',
  yAxis: 'اولویت‌بندی',
  xAxis: 'شدت Gap',
  cells: [
    { label: 'بررسی', value: '۱۲ نفر', fg: T.warning, bg: T.tintOrange },
    { label: 'اولویت فوری', value: '۸ نفر', fg: T.danger, bg: T.tintRed },
    { label: 'پایش', value: '۵ نفر', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'توسعه', value: '۱۳ نفر', fg: T.successStrong, bg: T.tintGreen },
  ],
};

export const attentionGaps = {
  title: 'Gapهای پرتکرار',
  rows: [
    { label: 'مدیریت زمان', value: 18, colour: T.primaryStrong },
    { label: 'برنامه‌ریزی', value: 16, colour: T.primary },
    { label: 'تفویض اختیار', value: 14, colour: T.violet },
    { label: 'تیم Coaching', value: 11, colour: T.info },
    { label: 'ارتباطات', value: 9, colour: T.infoStrong },
  ],
};

export const attentionSpread = {
  title: 'پراکندگی سازمانی',
  cols: { unit: 'کارمند', count: 'تعداد', pct: 'درصد از کل' },
  rows: [
    { unit: 'فروش / غرب', count: '۱۲', pct: '۳۱٪', value: 100 },
    { unit: 'عملیات', count: '۸', pct: '۲۱٪', value: 67 },
    { unit: 'فروش / جنوب', count: '۷', pct: '۱۸٪', value: 58 },
    { unit: 'مالی', count: '۵', pct: '۱۳٪', value: 42 },
    { unit: 'IT', count: '۴', pct: '۱۰٪', value: 33 },
    { unit: 'HR', count: '۲', pct: '۵٪', value: 17 },
  ],
};

export const attentionOpportunities = {
  title: 'فرصت‌های مداخله گروهی (پیشنهادی آریاز)',
  cards: [
    {
      id: 'time',
      label: 'مدیریت زمان',
      sub: '۱۸ نفر با شکاف مشترک',
      note: 'پیشنهاد: برنامه آموزشی مشترک',
      action: 'ایجاد برنامه',
      icon: 'lucide:clock',
      fg: T.danger,
      bg: T.tintRed,
    },
    {
      id: 'delegation',
      label: 'تفویض اختیار',
      sub: 'ویژه سرپرستان',
      note: 'پیشنهاد: مسیر توسعه مدیران',
      action: 'ایجاد مسیر',
      icon: 'lucide:users-round',
      fg: T.accent,
      bg: T.tintOrange,
    },
    {
      id: 'coaching',
      label: 'Coaching',
      sub: 'ویژه مدیران',
      note: 'پیشنهاد: دوره Coaching تیمی',
      action: 'ایجاد برنامه',
      icon: 'lucide:target',
      fg: T.successStrong,
      bg: T.tintGreen,
    },
  ],
};

export const attentionHistory = {
  title: 'تاریخچه اقدامات',
  cta: 'مشاهده همه اقدامات',
  cols: { person: 'کارمند', action: 'اقدام', date: 'تاریخ', state: 'وضعیت' },
  rows: [
    { person: 'رضا حسینی', action: 'جلسه توسعه‌ای', date: '۱۴۰۵/۰۵/۲۰', state: 'دریافت پیگیری', fg: T.infoStrong, bg: T.tintBlue },
    { person: 'مریم کاظمی', action: 'برنامه PDP', date: '۱۴۰۵/۰۵/۱۸', state: 'در اجرا', fg: T.accent, bg: T.tintOrange },
    { person: 'علی رضایی', action: 'دوره مدیریت زمان', date: '۱۴۰۵/۰۵/۱۵', state: 'تکمیل', fg: T.successStrong, bg: T.tintGreen },
  ],
};

export const attentionAsk = {
  title: 'درباره کارکنان نیازمند توجه از آریاز بپرسید',
  placeholder: 'سوال خود را بنویسید...',
  chips: [
    'چرا این ۳۸ نفر انتخاب شده‌اند؟',
    'کدام موارد اولویت بیشتری دارند؟',
    'Gap مشترک این افراد چیست؟',
    'کدام مسیر توسعه را پیشنهاد می‌کنی؟',
    'چه برنامه توسعه گروهی پیشنهاد می‌کنی؟',
  ],
};
