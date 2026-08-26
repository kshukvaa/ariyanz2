import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Development programmes — /org/development

   Screen 30. The section's index: what is running, what needs
   attention today, and the three ways to start a new one.

   The status donut totals ۳۷ programmes — ۱۲ active + ۱۸ complete
   + ۵ not yet started + ۲ stalled — while the KPI row reports the
   ۱۲ active and ۲۳ completed-to-date separately.
────────────────────────────────────────────────────────────── */

export const devHead = {
  title: 'برنامه‌های توسعه',
  desc: 'مدیریت، اجرا و پایش برنامه‌های توسعه کارکنان و مدیران',
  crumbs: [
    { label: 'توسعه', href: '/org/development' },
    { label: 'برنامه‌های توسعه' },
  ],
  create: { label: 'ایجاد برنامه توسعه', href: '/org/development/new' },
  withAi: 'ساخت برنامه با آریاز',
  search: 'جستجوی برنامه...',
  more: 'فیلترهای بیشتر',
};

export const devKpis = [
  { id: 'active', value: '۱۲', label: 'برنامه فعال', sub: '۴ نسبت به قبل', up: true, icon: 'lucide:book-open', fg: T.successStrong, bg: T.tintGreen },
  { id: 'people', value: '۱۸۶', label: 'شرکت‌کننده', sub: '۴ نسبت به قبل', up: true, icon: 'lucide:users-round', fg: T.accent, bg: T.tintOrange },
  { id: 'progress', value: '۷۴٪', label: 'میانگین پیشرفت', sub: '۸٪ نسبت به قبل', up: true, icon: 'lucide:trending-up', fg: T.violet, bg: T.tintPurple },
  { id: 'impact', value: '۶۸٪', label: 'اثربخشی برنامه‌ها', sub: '۹٪ نسبت به قبل', up: true, icon: 'lucide:target', fg: T.infoStrong, bg: T.tintBlue },
  { id: 'done', value: '۲۳', label: 'برنامه تکمیل‌شده', sub: '۴ نسبت به قبل', up: true, icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
];

export const devTabs = [
  { id: 'all', label: 'همه', count: '۲۳' },
  { id: 'active', label: 'فعال', count: '۱۲' },
  { id: 'attention', label: 'نیازمند توجه', count: '۳' },
  { id: 'pending', label: 'در انتظار شروع', count: '۵' },
  { id: 'done', label: 'تکمیل‌شده', count: '۱۸' },
];

export const devFilters = [
  { id: 'state', label: 'وضعیت', value: 'همه وضعیت‌ها' },
  { id: 'owner', label: 'مالک برنامه', value: 'همه مالکان' },
  { id: 'unit', label: 'واحد', value: 'همه واحدها' },
  { id: 'goal', label: 'هدف توسعه', value: 'همه اهداف' },
  { id: 'kind', label: 'نوع برنامه', value: 'همه انواع' },
];

export const devAi = {
  title: 'تحلیل هوشمند آریاز',
  body: [
    'در حال حاضر ۱۲ برنامه توسعه فعال است. بیشترین پوشش مربوط به «تفویض اختیار» و کمترین به «مدیریت زمان» است.',
    'سه برنامه از زمان‌بندی عقب هستند و نیازمند بررسی مدیریتی‌اند.',
  ],
  cta: 'تحلیل کامل توسعه',
  chips: [
    { label: 'نیاز اصلی جدید', value: 'انگیزش', sub: 'درباره ۵۶ نفر', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'کمترین پیشرفت', value: 'مدیریت سرپرستان', sub: '۶۱٪', fg: T.accent, bg: T.tintOrange },
    { label: 'بیشترین اثربخشی', value: 'رهبری مدیران', sub: '+۱۶٪', fg: T.successStrong, bg: T.tintGreen },
  ],
};

export const devAttention = {
  title: 'برنامه‌های نیازمند توجه',
  cta: 'مشاهده همه',
  rows: [
    { id: 'coaching', label: 'Coaching مالی مدیران', people: '۲۸ نفر', pct: 47, note: '۱۴ روز مانده', colour: T.danger },
    { id: 'supervisors', label: 'توسعه سرپرستان فروش', people: '۲۹ نفر', pct: 62, note: '۸ روز مانده', colour: T.accent },
  ],
};

export const devCalendar = {
  title: 'تقویم توسعه',
  cta: 'مشاهده تقویم کامل',
  rows: [
    { day: '۲۲', month: 'مرداد', label: 'کارگاه رهبری مدیران', icon: 'lucide:users-round', fg: T.primary },
    { day: '۲۶', month: 'مرداد', label: 'جلسه Coaching', icon: 'lucide:handshake', fg: T.successStrong },
    { day: '۲۵', month: 'مرداد', label: 'ارزیابی میان‌دوره‌ای', icon: 'lucide:clipboard-check', fg: T.infoStrong },
    { day: '۰۵', month: 'شهریور', label: 'Deadline مدیریت زمان', icon: 'lucide:flag', fg: T.danger },
  ],
};

export interface DevProgram {
  id: string;
  title: string;
  desc: string;
  state: string;
  stateFg: string;
  stateBg: string;
  pct: number;
  people: string;
  start: string;
  end: string;
  delta: string;
  doneLabel: string;
  done: { label: string; on: boolean }[];
  cta: string;
}

export const devPrograms: DevProgram[] = [
  {
    id: 'management-talent',
    title: 'استعدادهای مدیریتی',
    desc: 'آماده‌سازی برای نقش‌های مدیریتی آینده',
    state: 'در حال اجرا',
    stateFg: T.successStrong,
    stateBg: T.tintGreen,
    pct: 82,
    people: '۲۴ نفر',
    start: '۱۴۰۵/۰۴/۱۵',
    end: '۱۴۰۵/۰۹/۱۵',
    delta: '+۹.۱٪',
    doneLabel: 'اقدامات انجام‌شده',
    done: [
      { label: '۲ کارگاه آموزشی تکمیل شد', on: true },
      { label: '۲ جلسه Mentoring برگزار شد', on: true },
      { label: 'پروژه عملی در حال انجام', on: false },
    ],
    cta: 'مشاهده برنامه',
  },
  {
    id: 'time-management',
    title: 'مدیریت زمان مدیران',
    desc: 'بهبود بهره‌وری و مدیریت زمان',
    state: 'در حال اجرا',
    stateFg: T.successStrong,
    stateBg: T.tintGreen,
    pct: 68,
    people: '۲۱ نفر',
    start: '۱۴۰۵/۰۴/۲۰',
    end: '۱۴۰۵/۰۸/۲۰',
    delta: '+۹.۱٪',
    doneLabel: 'اقدامات انجام‌شده',
    done: [
      { label: '۲ کارگاه آموزشی تکمیل شد', on: true },
      { label: '۱ جلسه Coaching برگزار شد', on: true },
      { label: 'تمرین‌های عملی در حال انجام', on: false },
    ],
    cta: 'مشاهده برنامه',
  },
  {
    id: 'sales-managers',
    title: 'توسعه مدیران فروش',
    desc: 'تقویت رهبری، Coaching و تفویض اختیار',
    state: 'در حال اجرا',
    stateFg: T.successStrong,
    stateBg: T.tintGreen,
    pct: 78,
    people: '۴۲ نفر',
    start: '۱۴۰۵/۰۶/۰۵',
    end: '۱۴۰۵/۰۷/۳۰',
    delta: '+۹.۹٪',
    doneLabel: 'اقدامات انجام‌شده',
    done: [
      { label: '۴ کارگاه آموزشی تکمیل شد', on: true },
      { label: '۲ جلسه Coaching برگزار شد', on: true },
      { label: 'ارزیابی در انتظار تکمیل', on: false },
    ],
    cta: 'مشاهده برنامه',
  },
];

export const devViewToggle = { label: 'نمایش:', all: 'مشاهده همه' };

export const devStatus = {
  title: 'وضعیت برنامه‌ها',
  centre: '۳۷',
  centreSub: 'کل برنامه‌ها',
  slices: [
    { label: 'فعال', value: 12, colour: T.success, pct: '۱۲ (۳۲٪)' },
    { label: 'تکمیل‌شده', value: 18, colour: T.violet, pct: '۱۸ (۴۹٪)' },
    { label: 'در انتظار شروع', value: 5, colour: T.warning, pct: '۵ (۱۴٪)' },
    { label: 'متوقف شده', value: 2, colour: T.danger, pct: '۲ (۵٪)' },
  ],
};

export const devCoverage = {
  title: 'پوشش توسعه به تفکیک واحد',
  cta: 'مشاهده همه',
  rows: [
    { label: 'فروش', value: 82, colour: T.violet, note: '۸۲٪' },
    { label: 'عملیات', value: 76, colour: T.violet, note: '۷۶٪' },
    { label: 'منابع انسانی', value: 71, colour: T.success, note: '۷۱٪' },
    { label: 'مالی', value: 68, colour: T.warning, note: '۶۸٪' },
    { label: 'IT', value: 61, colour: T.warning, note: '۶۱٪' },
  ],
};

export const devGapCoverage = {
  title: 'پوشش شکاف‌های توسعه‌ای',
  cta: 'مشاهده جزئیات',
  rows: [
    { label: 'مدیریت زمان', people: '۲۶ نفر در برنامه', total: '۴۲ نفر', pct: 62, colour: T.success },
    { label: 'تفویض اختیار', people: '۳۸ نفر در برنامه', total: '۵۶ نفر', pct: 68, colour: T.success },
    { label: 'Coaching', people: '۲۲ نفر در برنامه', total: '۳۵ نفر', pct: 54, colour: T.warning },
  ],
};

export const devNewProgram = {
  title: 'ساخت برنامه جدید',
  options: [
    { id: 'from-results', label: 'از نتایج ارزیابی', desc: 'برنامه پیشنهادی بر اساس Gapهای شناسایی‌شده', icon: 'lucide:clipboard-check', fg: T.primary, bg: T.tintPurple },
    { id: 'from-template', label: 'از Template', desc: 'استفاده از برنامه‌های آماده و قابل شخصی‌سازی', icon: 'lucide:copy', fg: T.infoStrong, bg: T.tintBlue },
    { id: 'manual', label: 'ساخت دستی', desc: 'ایجاد برنامه توسعه از صفر', icon: 'lucide:pen-line', fg: T.accent, bg: T.tintOrange },
  ],
};

export const devSuggestions = {
  title: 'پیشنهادهای هوشمند آریاز',
  cta: 'مشاهده همه',
  rows: [
    { label: '۲۸ نفر High Potential هنوز برنامه توسعه اختصاصی ندارند.', icon: 'lucide:star', fg: T.violet },
    { label: '۱۵ نفر با Gap مشترک مشترک‌اند — ایجاد یک برنامه گروهی Coaching.', icon: 'lucide:users-round', fg: T.infoStrong },
    { label: '۳ برنامه با مشارکت پایین دارند.', icon: 'lucide:triangle-alert', fg: T.danger },
    { label: 'زمان ارزیابی مجدد ۳۱ نفر فرارسیده است.', icon: 'lucide:calendar-check', fg: T.accent },
  ],
};

export const devAsk = {
  title: 'درباره توسعه از آریاز بپرسید',
  placeholder: 'سوال خود را بنویسید...',
  chips: [
    'کدام برنامه بیشترین اثر را داشته؟',
    'چه Gapهایی هنوز بدون برنامه هستند؟',
    'برای مدیران فروش چه برنامه‌ای پیشنهاد می‌کنی؟',
    'کدام افراد در برنامه عقب هستند؟',
  ],
};
