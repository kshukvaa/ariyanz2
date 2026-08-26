import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   The development module's own three screens: reports (43), the
   AI advisor (44) and module settings (45).

   All three run under `devNav` rather than the main panel rail.
────────────────────────────────────────────────────────────── */

/* ── Screen 43 — گزارش‌های توسعه ──────────────────────────── */

export const devReportsHead = {
  title: 'گزارش‌های توسعه',
  desc: 'تحلیل سرمایه‌گذاری، پیشرفت، اثربخشی و روند توسعه سرمایه انسانی',
  export: 'خروجی گزارش',
  filters: [
    { id: 'level', label: 'سطح سازمانی', value: 'همه سطوح سازمانی' },
    { id: 'unit', label: 'واحد', value: 'همه واحدها' },
    { id: 'year', label: 'سال', value: '۱۴۰۵' },
  ],
};

export const devReportsKpis = [
  { id: 'people', value: '۱,۲۸۶', label: 'افراد توسعه یافته', sub: '۱۸٪ نسبت به سال قبل', up: true, icon: 'lucide:users-round', fg: T.primary, bg: T.tintPurple },
  { id: 'programs', value: '۸۴', label: 'برنامه‌های اجرا شده', sub: '۳۱٪ نسبت به سال قبل', up: true, icon: 'lucide:book-open', fg: T.successStrong, bg: T.tintGreen },
  { id: 'improve', value: '+۹.۴', label: 'میانگین بهبود شایستگی', sub: '۱.۷ نسبت به سال قبل', up: true, icon: 'lucide:trending-up', fg: T.infoStrong, bg: T.tintBlue },
  { id: 'closure', value: '۶۸٪', label: 'Gap Closure', sub: '۹٪ نسبت به سال قبل', up: true, icon: 'lucide:target', fg: T.accent, bg: T.tintOrange },
];

export const devReportsAi = {
  title: 'تحلیل آریاز',
  subtitle: 'وضعیت توسعه سازمان',
  body: [
    'در سال ۱۴۰۵ بیشترین بهبود در شایستگی رهبری و Coaching مشاهده شده است. واحد فروش بیشترین مشارکت را داشته، اما واحد عملیات همچنان بیشترین Gap باقیمانده را دارد.',
  ],
  cta: 'مشاهده تحلیل کامل',
  rows: [
    { label: 'بهترین واحد', value: 'فروش', sub: '۸۲٪ پوشش', icon: 'lucide:trophy', fg: T.successStrong, bg: T.tintGreen },
    { label: 'نیازمند تمرکز', value: 'عملیات', sub: '۵۸٪ Gap Closure', icon: 'lucide:target', fg: T.accent, bg: T.tintOrange },
    { label: 'بیشترین اثرگذاری', value: 'برنامه توسعه مدیران', sub: '+۱۰.۶ امتیاز', icon: 'lucide:star', fg: T.violet, bg: T.tintPurple },
  ],
};

export const devReportsTrend = {
  title: 'روند کلی توسعه سازمان',
  period: 'ماهانه',
  legend: [
    { label: 'تعداد برنامه‌ها', colour: T.violet },
    { label: 'تعداد افراد', colour: T.info },
    { label: 'Gap Closure (%)', colour: T.success },
    { label: 'اثربخشی (%)', colour: T.warning },
  ],
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  series: [
    { name: 'برنامه‌ها', colour: T.violet, values: [18, 34, 42, 30, 55, 62, 48, 70, 66, 82, 88, 96] },
    { name: 'افراد', colour: T.info, values: [82, 62, 76, 58, 88, 74, 92, 68, 84, 78, 96, 88] },
    { name: 'Gap Closure', colour: T.success, values: [30, 76, 62, 78, 68, 90, 72, 84, 78, 92, 86, 84] },
    { name: 'اثربخشی', colour: T.warning, values: [22, 46, 38, 64, 52, 80, 58, 74, 66, 88, 76, 82] },
  ],
};

export const devReportsUnits = {
  title: 'وضعیت توسعه واحدها',
  cta: 'مشاهده همه واحدها',
  cols: { unit: 'واحد', inpath: 'افراد در مسیر', progress: 'میانگین پیشرفت', closure: 'Gap Closure', impact: 'اثربخشی' },
  rows: [
    { unit: 'فروش', inpath: '۲۲۰', progress: '۶۵٪', closure: '۷۴٪', impact: '۸۲٪', good: true },
    { unit: 'عملیات', inpath: '۴۱۰', progress: '۵۸٪', closure: '۵۸٪', impact: '۶۵٪', good: false },
    { unit: 'مالی', inpath: '۹۰', progress: '۶۲٪', closure: '۶۴٪', impact: '۷۰٪', good: true },
    { unit: 'منابع انسانی', inpath: '۶۵', progress: '۷۸٪', closure: '۶۹٪', impact: '۷۴٪', good: true },
    { unit: 'فناوری اطلاعات', inpath: '۵۵', progress: '۶۱٪', closure: '۵۴٪', impact: '۶۰٪', good: false },
    { unit: 'خدمات پشتیبانی', inpath: '۳۶', progress: '۶۴٪', closure: '۶۲٪', impact: '۶۴٪', good: true },
  ],
};

export const devReportsCompetencies = {
  title: 'شایستگی‌ها بر اساس میزان بهبود',
  cta: 'مشاهده تحلیل شایستگی‌ها',
  rows: [
    { label: 'رهبری تیم', value: 121, colour: T.primaryStrong, note: '+۱۲.۱' },
    { label: 'Coaching', value: 104, colour: T.primaryStrong, note: '+۱۰.۴' },
    { label: 'تفویض اختیار', value: 92, colour: T.violet, note: '+۹.۲' },
    { label: 'تصمیم‌گیری', value: 56, colour: T.violet, note: '+۵.۶' },
    { label: 'مدیریت زمان', value: 43, colour: '#b9a9fb', note: '+۴.۳' },
    { label: 'ارتباطات', value: 38, colour: '#b9a9fb', note: '+۳.۸' },
    { label: 'تحلیل مسئله', value: 31, colour: '#d8d2fb', note: '+۳.۱' },
    { label: 'برنامه‌ریزی', value: 22, colour: '#d8d2fb', note: '+۲.۲' },
  ],
};

export const devReportsReadiness = {
  title: 'توزیع افراد بر اساس سطح آمادگی رشد',
  cta: 'مشاهده ماتریس استعدادها',
  slices: [
    { label: 'آماده ارتقا', value: 19, colour: T.success, pct: '۲۴۰ نفر (۱۹٪)' },
    { label: 'در مسیر رشد', value: 46, colour: T.info, pct: '۵۹۰ نفر (۴۶٪)' },
    { label: 'نیازمند توسعه بیشتر', value: 26, colour: T.warning, pct: '۳۳۰ نفر (۲۶٪)' },
    { label: 'بدون برنامه', value: 9, colour: T.danger, pct: '۱۲۶ نفر (۹٪)' },
  ],
};

export const devReportsInterventions = {
  title: 'اثربخشی مداخلات توسعه‌ای',
  cta: 'مشاهده همه مداخلات',
  cols: { name: 'مداخله', count: 'تعداد استفاده', improve: 'میانگین بهبود (امتیاز)' },
  rows: [
    { name: 'Coaching', count: '۳۴۸', improve: '+۱۰.۴', level: 'خیلی بالا', fg: T.successStrong, bg: T.tintGreen },
    { name: 'پروژه کششی (Stretch)', count: '۱۸', improve: '+۹.۲', level: 'بالا', fg: T.successStrong, bg: T.tintGreen },
    { name: 'تمرین عملی', count: '۲۸', improve: '+۷.۶', level: 'بالا', fg: T.successStrong, bg: T.tintGreen },
    { name: 'دوره آموزشی', count: '۷۵', improve: '+۶.۵', level: 'متوسط', fg: T.accent, bg: T.tintOrange },
    { name: 'Mentoring', count: '۲۲', improve: '+۵.۹', level: 'متوسط', fg: T.accent, bg: T.tintOrange },
    { name: 'مقاله / محتوای متنی', count: '۱۳۰', improve: '+۴.۸', level: 'پایین', fg: T.danger, bg: T.tintRed },
  ],
};

export const devReportsInvestment = {
  title: 'سرمایه‌گذاری توسعه',
  cta: 'مشاهده جزئیات مالی',
  legend: [
    { label: 'هزینه توسعه (میلیون تومان)', colour: T.violet },
    { label: 'ساعت توسعه سرانه', colour: T.success },
  ],
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  cost: [2600, 4800, 2450, 3900],
  hours: [820, 1180, 640, 1080],
};

export const devReportsCompletion = {
  title: 'نرخ تکمیل برنامه‌ها',
  cta: 'مشاهده جزئیات برنامه‌ها',
  centre: '۸۴',
  centreSub: 'کل برنامه‌ها',
  slices: [
    { label: 'تکمیل شده', value: 52, colour: T.success, pct: '۴۴ برنامه (۵۲٪)' },
    { label: 'در حال اجرا', value: 32, colour: T.info, pct: '۲۷ برنامه (۳۲٪)' },
    { label: 'عقب‌مانده', value: 12, colour: T.warning, pct: '۱۰ برنامه (۱۲٪)' },
    { label: 'لغو شده', value: 4, colour: T.danger, pct: '۳ برنامه (۴٪)' },
  ],
};

export const devReportsQuick = {
  title: 'دسترسی سریع به گزارش‌ها',
  rows: [
    { label: 'گزارش اثربخشی برنامه‌ها', icon: 'lucide:chart-no-axes-combined' },
    { label: 'گزارش Gap و شایستگی‌ها', icon: 'lucide:target' },
    { label: 'گزارش سرمایه‌گذاری توسعه', icon: 'lucide:wallet' },
    { label: 'گزارش مقایسه واحدها', icon: 'lucide:chart-column' },
    { label: 'گزارش روند توسعه فردی', icon: 'lucide:trending-up' },
  ],
};

export const devReportsSuggest = {
  title: 'پیشنهادهای مدیریتی آریاز',
  rows: [
    { n: 'پیشنهاد ۱', label: '۲۲ مدیر فروش آماده جانشینی هستند.', note: 'بر اساس عملکرد، شایستگی و مسیر توسعه', cta: 'مشاهده افراد', icon: 'lucide:users-round', fg: T.violet, bg: T.tintPurple },
    { n: 'پیشنهاد ۲', label: '۵۴ نفر Gap رهبری دارند اما برنامه ندارند.', note: 'پیشنهاد می‌شود سریعاً برنامه‌ای برای آن‌ها ایجاد شود.', cta: 'ساخت برنامه پیشنهادی', icon: 'lucide:target', fg: T.accent, bg: T.tintOrange },
    { n: 'پیشنهاد ۳', label: 'Coaching بیشترین اثر را داشته است.', note: 'پیشنهاد افزایش ظرفیت Coachها', cta: 'افزایش ظرفیت Coaching', icon: 'lucide:trending-up', fg: T.successStrong, bg: T.tintGreen },
  ],
};

/* ── Screen 44 — مشاور توسعه آریاز ────────────────────────── */

export const advisorHead = {
  title: 'مشاور توسعه آریاز',
  desc: 'تحلیل هوشمند سرمایه انسانی و پیشنهاد مسیرهای توسعه',
  levelLabel: 'سطح تحلیل:',
  levels: ['سازمان', 'واحد', 'فرد'],
  filters: [
    { id: 'role', label: 'همه واحد شغلی', value: 'همه واحد شغلی' },
    { id: 'year', label: 'سال', value: '۱۴۰۵' },
  ],
};

export const advisorHero = {
  title: 'آریاز، مشاور توسعه شما',
  desc: 'بر اساس ارزیابی‌ها، عملکرد، شایستگی‌ها، Gapها و مسیرهای توسعه، بهترین اقدامات توسعه را پیشنهاد می‌کنم.',
  placeholder: 'از آریاز درباره توسعه بپرسید...',
  hint: 'مثال: برای مدیران تازه ارتقا یافته چه برنامه‌ای پیشنهاد می‌کنی؟',
};

export const advisorQuestions = {
  title: 'سوالات آماده',
  rows: [
    { label: 'استعدادها', sub: 'چه کسانی آماده ارتقا هستند؟', icon: 'lucide:users-round', fg: T.violet, bg: T.tintPurple },
    { label: 'Gapها', sub: 'بزرگ‌ترین شکاف‌های سازمان چیست؟', icon: 'lucide:target', fg: T.accent, bg: T.tintOrange },
    { label: 'برنامه توسعه', sub: 'برای مدیران جدید چه برنامه‌ای پیشنهاد می‌کنی؟', icon: 'lucide:book-open', fg: T.successStrong, bg: T.tintGreen },
    { label: 'اثربخشی', sub: 'کدام آموزش‌ها بیشترین اثر را داشته‌اند؟', icon: 'lucide:trending-up', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'فرد', sub: 'برای این فرد چه مسیری پیشنهاد می‌کنی؟', icon: 'lucide:user-round', fg: T.danger, bg: T.tintRed },
  ],
};

export const advisorRecent = {
  title: 'گفتگوهای اخیر',
  cta: 'مشاهده همه گفتگوها',
  rows: [
    { label: 'برنامه مدیران فروش', date: 'امروز ۱۰:۳۰', on: true },
    { label: 'تحلیل استعدادها', date: 'دیروز ۱۴:۴۵' },
    { label: 'Gap واحد عملیات', date: '۳ روز پیش' },
    { label: 'پیشنهاد جانشینان', date: '۴ روز پیش' },
    { label: 'برنامه مدیران جدید', date: '۱ هفته پیش' },
  ],
};

export const advisorAccess = {
  title: 'دسترسی تحلیل',
  cta: 'تغییر سطح دسترسی',
  rows: [
    { label: 'HR Admin', note: 'دسترسی به کل سازمان', icon: 'lucide:shield-check', fg: T.successStrong },
    { label: 'مدیر', note: 'دسترسی به تیم خود', icon: 'lucide:user-round', fg: T.infoStrong },
    { label: 'کارمند', note: 'دسترسی به مسیر خود', icon: 'lucide:user-round', fg: T.accent },
    { label: 'Coach / Mentor', note: 'دسترسی به افراد محول‌شده', icon: 'lucide:handshake', fg: T.violet },
  ],
};

export const advisorAnswer = {
  question: 'برای مدیران تازه ارتقا یافته برنامه توسعه پیشنهاد بده',
  brand: 'آریاز',
  lead: 'تحلیل داده‌ها انجام شد. نتیجه و پیشنهاد مسیر توسعه برای مدیران تازه ارتقا یافته:',
  targetTitle: 'تحلیل جامعه هدف',
  target: [
    { label: 'تعداد افراد', value: '۲۸ نفر' },
    { label: 'میانگین سابقه مدیریتی', value: '۱.۸ سال' },
  ],
  gaps: [
    { label: 'Gap Coaching', pct: 63 },
    { label: 'Gap تفویض اختیار', pct: 59 },
    { label: 'Gap رهبری تیم', pct: 46 },
    { label: 'Gap مدیریت زمان', pct: 36 },
  ],
  pathTitle: 'پیشنهاد مسیر توسعه (۴ فاز)',
  path: [
    { n: 'ماه ۱', label: 'مبانی مدیریت', icon: 'lucide:users-round', rows: ['دوره مبانی مدیریت', 'مطالعه راهنمای مدیر تازه‌کار'] },
    { n: 'ماه ۲', label: 'تمرین و یادگیری', icon: 'lucide:graduation-cap', rows: ['تمرین Coaching', 'Shadowing با مدیر ارشد'] },
    { n: 'ماه ۳', label: 'تجربه واقعی', icon: 'lucide:briefcase', rows: ['هدایت یک پروژه کوچک', 'تمرین تفویض اختیار'] },
    { n: 'ماه ۴', label: 'سنجش و تثبیت', icon: 'lucide:trending-up', rows: ['بازخورد ۳۶۰ درجه', 'جلسه بازبینی مسیر'] },
  ],
  cta: 'ایجاد برنامه توسعه از این پیشنهاد',
};

export const advisorDecisions = {
  title: 'پیشنهادهای نیازمند تصمیم',
  cta: 'مشاهده همه پیشنهادها',
  rows: [
    {
      label: '۲۸ نفر High Potential بدون برنامه توسعه',
      lines: ['عملکرد بالا در ارزیابی اخیر', 'پتانسیل بالا بر اساس مدل شایستگی', 'بدون مسیر توسعه فعال'],
      cta: 'ایجاد مسیر جانشینی',
      icon: 'lucide:users-round',
      fg: T.successStrong,
      bg: T.tintGreen,
    },
    {
      label: '۴۶ مدیر دارای Coaching Gap',
      lines: ['نتایج ارزیابی اخیر', 'بازخورد مدیران و تیم‌ها', 'نیاز به توسعه مهارت Coaching'],
      cta: 'ایجاد مسیر Coaching گروهی',
      icon: 'lucide:handshake',
      fg: T.accent,
      bg: T.tintOrange,
    },
    {
      label: '۱۲ نفر آماده بررسی ارتقا',
      lines: ['تکمیل مسیر توسعه', 'بهبود عملکرد مستمر', 'شکاف‌های اصلی کاهش یافته'],
      cta: 'شروع Promotion Review',
      icon: 'lucide:trending-up',
      fg: T.violet,
      bg: T.tintPurple,
    },
  ],
};

export const advisorWhy = {
  title: 'چرا این پیشنهاد داده شد؟',
  desc: 'بر اساس تحلیل داده‌ها و معیارهای زیر:',
  rows: [
    'عملکرد (Performance)',
    'نتایج ارزیابی شایستگی',
    'پتانسیل (Potential)',
    'مسیر توسعه قبلی',
    'مقایسه با نقش‌های مشابه',
    'الگوهای موفق سازمان',
  ],
};

export const advisorDesigner = {
  title: 'طراحی خودکار برنامه (AI)',
  fields: [
    { label: 'نقش شغلی', value: 'مدیر فروش' },
    { label: 'هدف', value: 'آمادگی مدیر ارشد' },
    { label: 'مدت', value: '۶ ماه' },
    { label: 'تعداد افراد', value: '۳۵ نفر' },
  ],
  cta: 'ساخت Draft برنامه با آریاز',
};

export const advisorScenario = {
  title: 'تحلیل سناریو (What-if)',
  question: 'اگر ۶۰ نفر را وارد مسیر Coaching کنیم چه اثری دارد؟',
  rows: [
    { label: 'کاهش Gap رهبری', value: '۱۴٪', icon: 'lucide:users-round', fg: T.successStrong },
    { label: 'افزایش میانگین شایستگی', value: '+۳ امتیاز', icon: 'lucide:trending-up', fg: T.infoStrong },
    { label: 'نیاز به Coach', value: '۸ نفر', icon: 'lucide:handshake', fg: T.accent },
    { label: 'مدت زمان موردنیاز', value: '۳ ماه', icon: 'lucide:clock', fg: T.violet },
  ],
  cta: 'مشاهده تحلیل کامل',
};

export const advisorResources = {
  title: 'منابع پیشنهادی آریاز',
  sub: 'برای Gap تفویض اختیار',
  cta: 'افزودن همه به برنامه',
  rows: [
    { label: '۵ اشتباه مدیران در تفویض اختیار', icon: 'lucide:book-open', fg: T.violet },
    { label: 'تفویض اختیار حرفه‌ای', icon: 'lucide:graduation-cap', fg: T.danger },
    { label: 'ماتریس تفویض اختیار', icon: 'lucide:wrench', fg: T.accent },
    { label: 'مربی رهبری (کوچ دیجیتال)', icon: 'lucide:bot', fg: T.infoStrong },
  ],
};

/* ── Screen 45 — تنظیمات توسعه ────────────────────────────── */

export const devSettingsHead = {
  title: 'تنظیمات توسعه',
  desc: 'مدیریت قواعد، فرآیندها، دسترسی‌ها و تنظیمات ماژول توسعه',
  reset: 'بازگردانی تنظیمات پیش‌فرض',
  save: 'ذخیره تمامی تغییرات',
  cancel: 'لغو',
};

export const devSettingsNav = [
  { id: 'general', label: 'عمومی', icon: 'lucide:settings', on: true },
  { id: 'interventions', label: 'انواع مداخلات توسعه', icon: 'lucide:layers' },
  { id: 'success', label: 'مدل موفقیت برنامه', icon: 'lucide:target' },
  { id: 'workflow', label: 'واحد تأیید و Workflow', icon: 'lucide:workflow' },
  { id: 'notifications', label: 'اعلان‌ها', icon: 'lucide:bell' },
  { id: 'access', label: 'سطح دسترسی', icon: 'lucide:users-round' },
  { id: 'sources', label: 'اتصال منابع', icon: 'lucide:link' },
  { id: 'ai', label: 'هوش مصنوعی', icon: 'lucide:sparkles' },
  { id: 'audit', label: 'Audit Log', icon: 'lucide:history' },
];

export const devSettingsGeneral = {
  title: 'تنظیمات عمومی',
  fields: [
    { label: 'نام ماژول', value: 'توسعه' },
    { label: 'تقویم', value: 'شمسی' },
    { label: 'واحد پیش‌فرض', value: 'روز' },
    { label: 'منطقه زمانی', value: 'تهران (UTC+3:30)' },
    { label: 'زبان', value: 'فارسی' },
    { label: 'واحد پول', value: 'تومان' },
  ],
};

export const devSettingsStates = {
  title: 'وضعیت‌های برنامه توسعه',
  desc: 'وضعیت‌های قابل استفاده در چرخه حیات برنامه توسعه',
  cta: 'افزودن وضعیت جدید',
  rows: [
    { label: 'Draft (پیش‌نویس)', colour: '#d5d7e3' },
    { label: 'Pending Approval (در انتظار تأیید)', colour: T.warning },
    { label: 'Active (فعال)', colour: T.success },
    { label: 'Completed (تکمیل شده)', colour: T.info },
    { label: 'Archived (آرشیو شده)', colour: T.violet },
  ],
};

export const devSettingsInterventions = {
  title: 'مدیریت انواع مداخلات توسعه',
  desc: 'نوع فعالیت‌ها و مداخلات قابل استفاده در برنامه‌های توسعه',
  cta: 'افزودن نوع جدید',
  all: 'مشاهده همه انواع مداخلات',
  cols: { kind: 'نوع اقدام', active: 'فعال', approval: 'نیاز به تأیید', evidence: 'نیاز به Evidence', usable: 'قابل استفاده برای', ops: 'عملیات' },
  rows: [
    { kind: 'دوره آموزشی', active: true, approval: 'خیر', evidence: 'گواهی دوره', usable: 'همه' },
    { kind: 'مقاله', active: true, approval: 'خیر', evidence: 'مطالعه و خلاصه', usable: 'همه' },
    { kind: 'کتاب', active: true, approval: 'خیر', evidence: 'خلاصه مطالعه', usable: 'همه' },
    { kind: 'Coaching', active: true, approval: 'بله', evidence: 'ثبت جلسه، Feedback، تأیید Coach', usable: 'مدیران' },
    { kind: 'Mentoring', active: true, approval: 'بله', evidence: 'ثبت جلسه، تأیید Mentor', usable: 'مدیران ارشد' },
    { kind: 'پروژه واقعی', active: true, approval: 'بله', evidence: 'گزارش پروژه، نتیجه، تأیید مدیر', usable: 'همه' },
    { kind: 'اقدام سفارشی', active: true, approval: 'بله', evidence: 'طبق تعریف', usable: 'همه' },
  ],
};

export const devSettingsSuccess = {
  title: 'مدل موفقیت برنامه',
  desc: 'قوانین و معیارهای موفقیت یک برنامه توسعه',
  cta: 'افزودن قانون موفقیت جدید',
  rows: [
    { label: 'Completion (نرخ تکمیل)', op: 'حداقل', value: '۸۰', unit: '٪', icon: 'lucide:circle-check' },
    { label: 'Improvement (بهبود شایستگی)', op: 'حداقل', value: '۴', unit: '', icon: 'lucide:trending-up' },
    { label: 'Gap Closure (بستن شکاف)', op: 'حداقل', value: '۷۰', unit: '٪', icon: 'lucide:target' },
    { label: 'Reassessment (بازارزیابی)', op: 'الزامی', value: '', unit: '', icon: 'lucide:refresh-cw', check: true },
    { label: 'Manager Approval (تأیید مدیر)', op: 'الزامی', value: '', unit: '', icon: 'lucide:user-round', check: true },
  ],
};

export const devSettingsWorkflow = {
  title: 'Workflowها و تأییدها',
  desc: 'فرآیندهای تأیید و گردش کار در توسعه',
  cta: 'ویرایش Workflowها',
  rows: [
    { label: 'ساخت برنامه', steps: ['مالک', 'سرپرست', 'مدیریت'] },
    { label: 'افزودن فعالیت', steps: ['مالک', 'کارشناس'] },
    { label: 'پایان برنامه', steps: ['مالک', 'مدیر', 'ارزیابی'] },
  ],
};

export const devSettingsNotifications = {
  title: 'اعلان‌ها',
  desc: 'تنظیم اعلان‌ها و یادآوری‌ها در توسعه',
  cta: 'مدیریت همه اعلان‌ها',
  cols: { event: 'رویداد', via: 'ارسال از طریق', state: 'وضعیت' },
  rows: [
    { event: 'شروع برنامه', state: 'فعال' },
    { event: 'نزدیک Deadline', state: 'فعال' },
    { event: 'فعالیت عقب افتاده', state: 'فعال' },
    { event: 'Reassessment', state: 'فعال' },
    { event: 'گزارش ماهانه', state: 'فعال' },
  ],
};

export const devSettingsAccess = {
  title: 'سطح دسترسی',
  desc: 'مدیریت نقش‌ها و دسترسی کاربران',
  cta: 'مدیریت نقش‌ها',
  rows: [
    { label: 'HR Admin', note: 'دسترسی کامل به کل ماژول', icon: 'lucide:shield-check', fg: T.successStrong },
    { label: 'مدیر', note: 'دسترسی به تیم و اعضای خود', icon: 'lucide:user-round', fg: T.infoStrong },
    { label: 'کارمند', note: 'دسترسی به مسیر توسعه خود', icon: 'lucide:user-round', fg: T.accent },
    { label: 'Coach / Mentor', note: 'دسترسی به افراد محول‌شده', icon: 'lucide:handshake', fg: T.violet, on: true },
    { label: 'مدیرعامل', note: 'دسترسی به داشبورد و گزارش‌ها', icon: 'lucide:star', fg: T.warning },
  ],
};

export const devSettingsSources = {
  title: 'اتصال منابع',
  desc: 'اتصال به منابع داخلی و خارجی',
  cta: 'مدیریت اتصال‌ها',
  groups: [
    {
      label: 'منابع آریاز',
      rows: [
        { label: 'دوره‌ها', state: 'متصل', on: true },
        { label: 'کتابخانه', state: 'متصل', on: true },
        { label: 'ارزیابی‌ها', state: 'متصل', on: true },
      ],
    },
    {
      label: 'منابع سازمان',
      rows: [
        { label: 'شبکه سازمانی', state: 'متصل', on: true },
        { label: 'Google Drive', state: 'غیرفعال', on: false },
        { label: 'منابع آموزشی خارجی', state: 'غیرفعال', on: false },
      ],
    },
  ],
};

export const devSettingsAi = {
  title: 'تنظیمات هوش مصنوعی',
  desc: 'تنظیمات مربوط به دستیار توسعه آریاز',
  toggle: { label: 'فعال بودن مشاور آریاز', on: true },
  levelLabel: 'سطح پیشنهادها',
  levels: [
    { id: 'assist', label: 'کمک‌کننده', note: '(ارائه تحلیل و شناسایی)', on: true },
    { id: 'auto', label: 'تصمیم‌یار', note: '(پیشنهاد تصمیم نهایی، منوط به تأیید)', on: false },
  ],
  scopeLabel: 'منابع قابل استفاده',
  scopes: ['Assessment', 'Performance', 'History Development', 'Competency Model', 'Learning Library'],
};

export const devSettingsAudit = {
  title: 'Audit Log',
  desc: 'ثبت تغییرات و پیگیری‌های سیستم',
  cta: 'مشاهده کامل Audit Log',
  cols: { who: 'ثبت‌کننده', what: 'شرح تغییر', when: 'تاریخ', where: 'بخش' },
  rows: [
    { who: 'علی احمدی', what: 'تغییر حداقل Completion از ۷۵٪ به ۸۵٪', when: '۱۴۰۵/۰۶/۲۰', where: 'مدل موفقیت' },
    { who: 'سارا محمدی', what: 'افزودن نوع اقدام: Job Rotation', when: '۱۴۰۵/۰۶/۱۸', where: 'انواع مداخلات' },
    { who: 'حسین رضایی', what: 'تغییر پیش‌فرض یادآوری Deadline', when: '۱۴۰۵/۰۶/۱۵', where: 'اعلان‌ها' },
    { who: 'الهام کریمی', what: 'ویرایش دسترسی Coach / Mentor', when: '۱۴۰۵/۰۶/۱۰', where: 'سطح دسترسی' },
  ],
};

export const devSettingsExport = {
  title: 'خروجی و پشتیبان',
  desc: 'خروجی تنظیمات و تهیه نسخه پشتیبان',
  exportLabel: 'خروجی تنظیمات',
  formats: [
    { label: 'JSON', icon: 'lucide:file-text', fg: T.infoStrong },
    { label: 'Excel', icon: 'lucide:file-spreadsheet', fg: T.successStrong },
  ],
  lastLabel: 'آخرین پشتیبان',
  last: '۱۴۰۵/۰۶/۲۰ — ۱۱:۳۰',
  cta: 'ایجاد پشتیبان جدید',
};
