import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   People in development — /org/development/people

   Screen 42. Every person currently on a development path, read
   by how far along they are and how ready they are to move.
────────────────────────────────────────────────────────────── */

export const devPeopleHead = {
  title: 'کارکنان در حال توسعه',
  desc: 'پایش مسیر رشد هر فرد: Gapها، برنامه‌های توسعه و آمادگی کارکنان',
  crumbs: [
    { label: 'توسعه', href: '/org/development' },
    { label: 'کارکنان در حال توسعه' },
  ],
  suggest: 'پیشنهاد افراد توسط آریاز',
  add: 'افزودن فرد به برنامه توسعه',
  search: 'جستجو نام، سمت، واحد...',
};

export const devPeopleKpis = [
  { id: 'inpath', value: '۱۸۶', label: 'کارمند در مسیر توسعه', sub: 'مشاهده افراد', icon: 'lucide:users-round', fg: T.primary, bg: T.tintPurple },
  { id: 'progress', value: '۷۴٪', label: 'میانگین پیشرفت', sub: '۶٪ نسبت به قبل', up: true, icon: 'lucide:trending-up', fg: T.violet, bg: T.tintPurple },
  { id: 'done', value: '۴۸', label: 'تکمیل‌کننده برنامه', sub: 'مشاهده گزارش', icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
  { id: 'follow', value: '۲۳', label: 'نیازمند پیگیری', sub: 'نیاز به اقدام', icon: 'lucide:triangle-alert', fg: T.accent, bg: T.tintOrange },
  { id: 'ready', value: '۱۲', label: 'آماده ارتقا', sub: 'مشاهده استعدادها', icon: 'lucide:star', fg: T.infoStrong, bg: T.tintBlue },
];

export const devPeopleAi = {
  title: 'تحلیل هوشمند آریاز',
  body: [
    'از ۱۸۶ نفر حاضر در مسیر توسعه، ۱۲ نفر به سطح آمادگی ارتقا رسیده‌اند. بیشترین پیشرفت مربوط به افرادی است که بیش از ۷۰ روز فعالیت مستمر داشته‌اند.',
  ],
  cta: 'مشاهده تحلیل کامل',
  chips: [
    { label: 'نیازمند اقدام', value: '۲۳ نفر', fg: T.danger, bg: T.tintRed },
    { label: 'بیشترین Gap', value: 'رهبری', sub: '۴۶ نفر', fg: T.successStrong, bg: T.tintGreen },
    { label: 'آماده ارتقا', value: '۱۲ نفر', fg: T.infoStrong, bg: T.tintBlue },
  ],
};

export const devPeopleFilters = [
  { id: 'readiness', label: 'سطح آمادگی', value: 'همه' },
  { id: 'gap', label: 'Gap اصلی', value: 'همه' },
  { id: 'unit', label: 'واحد', value: 'همه' },
  { id: 'level', label: 'سطح سازمانی', value: 'همه' },
  { id: 'state', label: 'وضعیت توسعه', value: 'همه' },
];

export const devPeopleCards = [
  {
    id: 'ali',
    name: 'علی رشابی',
    role: 'مدیر فروش منطقه ۱',
    avatar: 'staff-ali-ahmadi',
    state: 'فعال',
    stateFg: T.successStrong,
    stateBg: T.tintGreen,
    pct: 82,
    gaps: ['Coaching', 'تفویض اختیار'],
    from: '۶۸',
    to: '۷۸',
    delta: '+۱۰',
    cta: 'مشاهده مسیر توسعه',
  },
  {
    id: 'sara',
    name: 'سارا کریمی',
    role: 'سرپرست فروش',
    avatar: 'staff-sara-karimi',
    state: 'آماده ارتقا',
    stateFg: T.infoStrong,
    stateBg: T.tintBlue,
    pct: 77,
    gaps: ['رهبری', 'مدیریت زمان'],
    from: '۶۵',
    to: '۸۲',
    delta: '+۱۷',
    cta: 'مشاهده پرونده توسعه',
  },
  {
    id: 'mehdi',
    name: 'مهدی مرادی',
    role: 'کارشناس ارشد فروش',
    avatar: 'card-author-03',
    state: 'فعال',
    stateFg: T.successStrong,
    stateBg: T.tintGreen,
    pct: 64,
    gaps: ['Coaching', 'مدیریت زمان'],
    from: '۷۲',
    to: '۷۸',
    delta: '+۶',
    cta: 'مشاهده مسیر توسعه',
  },
  {
    id: 'reza',
    name: 'رضا حسینی',
    role: 'کارشناس فروش',
    avatar: 'card-author-01',
    state: 'عقب از برنامه',
    stateFg: T.danger,
    stateBg: T.tintRed,
    pct: 22,
    gaps: ['رهبری', 'تفویض اختیار'],
    from: '۶۵',
    to: '۶۸',
    delta: '+۳',
    cta: 'مشاهده مسیر توسعه',
  },
];

export const devPeopleMatrix = {
  title: 'ماتریس توسعه × آمادگی',
  cta: 'مشاهده افراد در ماتریس',
  axes: { x: 'سطح آمادگی (پتانسیل)', y: 'پیشرفت توسعه' },
  quadrants: [
    { label: 'در مسیر رشد', pos: 'tl' as const },
    { label: 'ستاره‌ها', pos: 'tr' as const },
    { label: 'نیازمند بازنگری', pos: 'bl' as const },
    { label: 'نیازمند حمایت', pos: 'br' as const },
  ],
  legend: [
    { label: 'ستاره‌ها', colour: T.success },
    { label: 'در مسیر رشد', colour: T.info },
    { label: 'نیازمند حمایت', colour: T.warning },
    { label: 'نیازمند بازنگری', colour: T.danger },
  ],
  points: [
    { label: '', x: 78, y: 82, colour: T.success },
    { label: '', x: 84, y: 76, colour: T.success },
    { label: '', x: 72, y: 88, colour: T.success },
    { label: '', x: 66, y: 71, colour: T.info },
    { label: '', x: 42, y: 64, colour: T.info },
    { label: '', x: 38, y: 58, colour: T.info },
    { label: '', x: 28, y: 32, colour: T.danger },
    { label: '', x: 34, y: 24, colour: T.danger },
    { label: '', x: 70, y: 28, colour: T.warning },
    { label: '', x: 62, y: 34, colour: T.warning },
  ],
};

export const devPeopleAttention = {
  title: 'نیازمند توجه (۲۳ نفر)',
  cta: 'مشاهده همه (۲۳ نفر)',
  action: 'اقدام',
  rows: [
    { name: 'رضا حسینی', role: 'کارشناس فروش', avatar: 'card-author-01', notes: ['۱۲ روز بدون فعالیت', 'Coaching ناقص'] },
    { name: 'مهدی مرادی', role: 'کارشناس فروش', avatar: 'card-author-03', notes: ['Completion ۴۴٪', 'Deadline نزدیک'] },
    { name: 'پریسا محمدی', role: 'کارشناس بازاریابی', avatar: 'card-author-04', notes: ['۷ روز بدون فعالیت', '۲ Evidence ناقص'] },
  ],
};

export const devPeopleReady = {
  title: 'افراد آماده حرکت بعدی (۱۲ نفر)',
  cta: 'مشاهده همه (۱۲ نفر)',
  rows: [
    { name: 'سارا کریمی', role: 'سرپرست فروش', avatar: 'staff-sara-karimi', note: '۸۲٪ آمادگی', fg: T.successStrong },
    { name: 'حسین یوسفی', role: 'کارشناس ارشد فروش', avatar: 'card-author-02', note: 'آماده جانشینی', fg: T.infoStrong },
    { name: 'علی رشابی', role: 'مدیر فروش منطقه ۱', avatar: 'staff-ali-ahmadi', note: 'آماده رهبری تیمی', fg: T.violet },
  ],
};

export const devPeopleCoverage = {
  title: 'پوشش توسعه بر اساس واحد',
  cta: 'مشاهده گزارش کامل واحدها',
  rows: [
    { unit: 'فروش', pct: 82, without: '۸ نفر', colour: T.success },
    { unit: 'عملیات', pct: 76, without: '۱۲ نفر', colour: T.success },
    { unit: 'مالی', pct: 68, without: '۶ نفر', colour: T.warning },
    { unit: 'منابع انسانی', pct: 66, without: '۷ نفر', colour: T.warning },
    { unit: 'IT', pct: 61, without: '۹ نفر', colour: T.accent },
  ],
};

export const devPeopleSuggest = {
  title: 'پیشنهادهای آریاز',
  cta: 'مشاهده همه پیشنهادها',
  rows: [
    { label: '۲۸ نفر High Potential برنامه توسعه ندارند', note: 'پیشنهاد می‌شود مسیر توسعه برای این افراد ایجاد شود.', action: 'ساخت برنامه', icon: 'lucide:star', fg: T.violet },
    { label: '۱۵ نفر Gap مشترک رهبری دارند', note: 'ایجاد یک برنامه گروهی Coaching توصیه می‌شود.', action: 'ایجاد گروه', icon: 'lucide:users-round', fg: T.infoStrong },
    { label: '۱۲ نفر آماده ارزیابی مجدد هستند', note: 'پیشنهاد می‌شود فرآیند ارزیابی مجدد آغاز شود.', action: 'شروع فرآیند', icon: 'lucide:refresh-cw', fg: T.accent },
  ],
};

export const devPeopleAsk = {
  title: 'از آریاز بپرسید',
  placeholder: 'سوال خود را بنویسید...',
  chips: [
    'چه کسانی آماده ارتقا هستند؟',
    'کدام مدیران بیشترین Gap رهبری دارند؟',
    'برای این افراد چه برنامه‌ای پیشنهاد می‌کنی؟',
    'چه کسانی از برنامه عقب هستند؟',
  ],
};
