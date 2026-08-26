import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Assessment result report — /org/reports/assessments/[id]

   Screen 18. One completed assessment cycle: who took it, how it
   went, what the four instruments found, and which people the
   result points at.

   ۱۲۰ completed of ۱۲۵ invited — the same figures the funnel, the
   completion ring and the KPI row all report.
────────────────────────────────────────────────────────────── */

export const assessReportHead = {
  title: 'ارزیابی مدیران فروش — تابستان ۱۴۰۵',
  desc: 'ارزیابی شایستگی‌ها و ویژگی‌های مدیریتی مدیران و سرپرستان فروش',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'ارزیابی‌ها', href: '/org/assessments' },
    { label: 'ارزیابی مدیران فروش' },
  ],
  state: 'تکمیل‌شده',
  period: 'دوره‌ای',
  compare: 'مقایسه با دوره قبل',
};

export const assessReportBand = [
  { k: 'دوره', v: 'تابستان ۱۴۰۵', icon: 'lucide:calendar' },
  { k: 'تاریخ اجرا', v: '۱۴۰۵/۰۴/۰۱ تا ۱۴۰۵/۰۶/۱۵', icon: 'lucide:calendar-check' },
  { k: 'گروه هدف', v: 'مدیران و سرپرستان فروش', icon: 'lucide:users-round' },
  { k: 'تعداد دعوت‌شده', v: '۱۲۵ نفر', icon: 'lucide:send' },
  { k: 'تکمیل‌کنندگان', v: '۱۲۰ نفر', icon: 'lucide:circle-check' },
  { k: 'تعداد آزمون‌ها', v: '۴ آزمون', icon: 'lucide:clipboard-check' },
];

export const assessReportKpis = [
  { id: 'people', value: '۱۲۰', label: 'شرکت‌کننده', sub: 'تکمیل کامل ارزیابی', icon: 'lucide:users-round', fg: T.primary, bg: T.tintPurple },
  { id: 'rate', value: '۹۶ ٪', label: 'نرخ تکمیل', sub: '۶٪ نسبت به دوره قبل', up: true, icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
  { id: 'score', value: '۷۸.۴', label: 'میانگین امتیاز', sub: '۴٪ نسبت به دوره قبل', up: true, icon: 'lucide:star', fg: T.violet, bg: T.tintPurple },
  { id: 'time', value: '۳۸ دقیقه', label: 'میانگین زمان تکمیل', sub: '۵٪ نسبت به دوره قبل', up: true, icon: 'lucide:clock', fg: T.infoStrong, bg: T.tintBlue },
  { id: 'satisfaction', value: '۴.۶ / ۵', label: 'رضایت از تجربه ارزیابی', sub: '۰.۲ نسبت به دوره قبل', up: true, icon: 'lucide:smile', fg: T.accent, bg: T.tintOrange },
];

export const assessReportAi = {
  title: 'تحلیل آریاز از این ارزیابی',
  body: [
    'نتایج ارزیابی مدیران فروش نشان می‌دهد وضعیت کلی گروه نسبت به دوره قبل بهبود یافته است.',
    'بیشترین نقطه قوت مشترک «ارتباط با مشتری» و مهم‌ترین شکاف مشترک «تفویض اختیار» است. همچنین ۲۸ نفر از شرکت‌کنندگان نیازمند برنامه توسعه هدفمند هستند.',
  ],
  cta: 'تحلیل عمیق با آریاز',
};

export const assessReportCompletion = {
  title: 'وضعیت اجرای ارزیابی',
  centre: '۱۲۰',
  centreSub: 'تکمیل‌شده',
  slices: [
    { label: 'تکمیل شده', value: 120, colour: T.success, pct: '۱۲۰' },
    { label: 'در حال انجام', value: 3, colour: T.info, pct: '۳' },
    { label: 'تکمیل‌نشده', value: 2, colour: '#d5d7e3', pct: '۲' },
  ],
  funnel: [
    { label: 'دعوت‌شده', value: '۱۲۵', width: 100 },
    { label: 'شروع کرده', value: '۱۲۳', width: 82 },
    { label: 'تکمیل کرده', value: '۱۲۰', width: 64 },
  ],
};

export const assessReportTests = {
  title: 'آزمون‌های این ارزیابی',
  cta: 'مشاهده گزارش',
  cards: [
    { id: 'mbti', label: 'MBTI', runs: '۱۲۰ تکمیل', note: 'تیپ غالب: ENTJ', icon: '/images/aryaz/test-icons-3d/test-mbti.png' },
    { id: 'eq', label: 'هوش هیجانی (EQ)', runs: '۱۱۸ تکمیل', note: 'میانگین کل: ۸۴/۱۰۰', icon: '/images/aryaz/test-icons-3d/test-eq.png' },
    { id: 'leadership', label: 'سبک رهبری', runs: '۱۱۸ تکمیل', note: 'سبک غالب: تحولی', icon: '/images/aryaz/test-icons-3d/test-leadership.png' },
    { id: 'competency', label: 'شایستگی مدیریتی', runs: '۱۲۰ تکمیل', note: 'میانگین کل: ۸۱/۱۰۰', icon: '/images/aryaz/test-icons-3d/quest-competency.png' },
  ],
};

export const assessReportScore = {
  title: 'امتیاز کل این ارزیابی',
  value: 78.4,
  max: 100,
  level: 'مطلوب',
  previous: { label: 'دوره قبل', value: '۷۴.۸' },
  delta: '+۴.۶',
};

export const assessReportHistogram = {
  title: 'توزیع امتیازات',
  categories: ['۵۰-۶۰', '۶۰-۷۰', '۷۰-۸۰', '۸۰-۹۰', '۹۰-۱۰۰'],
  series: [{ name: 'شرکت‌کنندگان', colour: T.primaryStrong, values: [4, 18, 42, 38, 18] }],
};

export const assessReportRadar = {
  title: 'پروفایل شایستگی گروه (مقایسه با دوره قبل)',
  axes: ['رهبری', 'حل مسئله', 'ارتباطات', 'تفویض اختیار', 'شفافیت', 'برنامه‌ریزی', 'Coaching'],
  current: [81, 83, 86, 64, 78, 74, 69],
  previous: [76, 78, 82, 62, 75, 72, 66],
  legend: [
    { label: 'دوره جاری', colour: T.primary },
    { label: 'دوره قبل', colour: T.muted, dashed: true },
  ],
};

export const assessReportStrengths = {
  title: 'نقاط قوت اصلی',
  rows: [
    { n: '۱', label: 'ارتباط با مشتری', value: '۸۶' },
    { n: '۲', label: 'حل مسئله', value: '۸۳' },
    { n: '۳', label: 'انگیزش', value: '۸۱' },
    { n: '۴', label: 'رهبری', value: '۷۹' },
  ],
};

export const assessReportGaps = {
  title: 'شکاف‌های اصلی',
  rows: [
    { n: '۱', label: 'تفویض اختیار', value: '۶۴', note: 'مؤثر بر ۳۸ نفر' },
    { n: '۲', label: 'مدیریت زمان', value: '۶۶', note: 'مؤثر بر ۳۶ نفر' },
    { n: '۳', label: 'برنامه‌ریزی', value: '۶۹', note: 'مؤثر بر ۳۱ نفر' },
    { n: '۴', label: 'Coaching', value: '۶۹', note: 'مؤثر بر ۳۵ نفر' },
  ],
};

export const assessReportPeopleMap = {
  title: 'نقشه نتایج افراد (نمونه ۱۰ نفر)',
  cta: 'مشاهده Heatmap کامل',
  cols: ['رهبری', 'ارتباطات', 'حل مسئله', 'تفویض اختیار', 'مدیریت زمان', 'انگیزش'],
  legend: [
    { label: 'قوی', colour: T.success },
    { label: 'متوسط', colour: T.warning },
    { label: 'نیازمند توجه', colour: T.danger },
  ],
  rows: [
    { name: 'سارا کریمی', cells: [2, 2, 2, 1, 1, 2] },
    { name: 'محمد احمدی', cells: [2, 2, 2, 1, 2, 2] },
    { name: 'علی رضایی', cells: [1, 2, 2, 1, 1, 2] },
    { name: 'مریم کاظمی', cells: [1, 1, 2, 0, 1, 1] },
    { name: 'رضا حسینی', cells: [1, 1, 1, 0, 0, 1] },
  ],
};

export const assessReportTeams = {
  title: 'عملکرد تیم‌ها / مناطق شرکت‌کننده',
  cta: 'مشاهده تحلیل هر تیم',
  cols: { rank: 'رتبه', team: 'تیم / منطقه', score: 'امتیاز متوسط', change: 'نسبت به دوره قبل', state: 'وضعیت' },
  rows: [
    { rank: '۱', team: 'تهران', score: '۸۴', change: '۸٪', up: true, state: 'عالی', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۲', team: 'شرق', score: '۸۱', change: '۶٪', up: true, state: 'عالی', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۳', team: 'جنوب', score: '۷۶', change: '۳٪', up: true, state: 'مطلوب', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۴', team: 'غرب', score: '۶۸', change: '۶٪', up: false, state: 'توجه', fg: T.accent, bg: T.tintOrange },
  ],
};

export const assessReportTalent = {
  title: 'شناسایی استعدادها (9-Box)',
  cta: 'مشاهده ماتریس کامل',
  cells: [
    { label: 'High Potential', value: '۹ نفر', bg: T.tintGreen },
    { label: 'Key Player', value: '۲۶ نفر', bg: T.tintGreen },
    { label: 'Star', value: '۱۶ نفر', bg: T.tintGreen },
    { label: 'Emerging Talent', value: '۲۵ نفر', bg: T.tintOrange },
    { label: 'Core Talent', value: '۳۴ نفر', bg: T.tintGreen },
    { label: 'High Performer', value: '۲۲ نفر', bg: T.tintGreen },
    { label: 'Development Needed', value: '۱۲ نفر', bg: T.tintOrange },
    { label: 'Solid Performer', value: '۱۷ نفر', bg: T.tintOrange },
    { label: 'At Risk', value: '۷ نفر', bg: T.tintRed },
  ],
};

export const assessReportTop = {
  title: 'بهترین نتایج',
  cta: 'مشاهده همه',
  rows: [
    { n: '۱', name: 'سارا کریمی', value: '۹۰' },
    { n: '۲', name: 'محمد احمدی', value: '۸۸' },
    { n: '۳', name: 'علی رضایی', value: '۸۶' },
    { n: '۴', name: 'مریم کاظمی', value: '۸۲' },
  ],
};

export const assessReportAttention = {
  title: 'نیازمند توجه',
  cta: 'مشاهده همه',
  rows: [
    { n: '۱', name: 'سارا کریمی', note: '۹ نفر' },
    { n: '۲', name: 'محمد احمدی', note: '۷ نفر' },
    { n: '۳', name: 'علی رضایی', note: '۸ نفر' },
    { n: '۴', name: 'مریم کاظمی', note: '۸۲' },
  ],
};

export const assessReportChanges = {
  title: 'تغییرات نسبت به دوره قبل',
  cta: 'مشاهده مقایسه کامل دوره‌ها',
  groups: [
    { id: 'up', label: 'بیشترین بهبود', fg: T.successStrong, bg: T.tintGreen, rows: [{ label: 'همکاری', value: '+۸٪' }, { label: 'انگیزش', value: '+۶٪' }] },
    { id: 'down', label: 'بیشترین افت', fg: T.danger, bg: T.tintRed, rows: [{ label: 'مدیریت زمان', value: '−۴٪' }, { label: 'تفویض اختیار', value: '−۲٪' }] },
    { id: 'flat', label: 'بدون تغییر معنادار', fg: T.muted, bg: '#f4f4f8', rows: [{ label: 'برنامه‌ریزی', value: '+۰.۴٪' }] },
  ],
};

export const assessReportActions = {
  title: 'اقدامات پیشنهادی آریاز بر اساس نتایج این ارزیابی',
  cta: 'ساخت برنامه توسعه از نتایج این ارزیابی',
  cards: [
    { id: 'delegation', label: 'تفویض اختیار مدیران', value: '۳۸ نفر', note: 'پیشنهاد: دوره + تمرین عملی', fg: T.infoStrong, bg: T.tintBlue },
    { id: 'time', label: 'مدیریت زمان', value: '۳۶ نفر', note: 'پیشنهاد: برنامه توسعه گروهی', fg: T.accent, bg: T.tintOrange },
    { id: 'hipo', label: 'High Potentials', value: '۲۸ نفر', note: 'پیشنهاد: مسیر آمادگی مدیریت ارشد', fg: T.successStrong, bg: T.tintGreen },
  ],
};

export const assessReportTable = {
  title: 'جدول افراد شرکت‌کننده',
  search: 'جستجوی کارمند...',
  cta: 'مشاهده',
  cols: { person: 'کارمند', team: 'تیم', score: 'امتیاز کل', change: 'تغییر', done: 'تکمیل', state: 'وضعیت', ops: 'عملیات' },
  rows: [
    { name: 'سارا کریمی', avatar: 'staff-sara-karimi', team: 'تهران', score: '۹۰', change: '۸٪', up: true, done: '۱۰۰٪', state: 'عالی', fg: T.successStrong, bg: T.tintGreen },
    { name: 'محمد احمدی', avatar: 'staff-mohammad-rezaei', team: 'شرق', score: '۸۸', change: '۶٪', up: true, done: '۱۰۰٪', state: 'عالی', fg: T.successStrong, bg: T.tintGreen },
    { name: 'علی رضایی', avatar: 'staff-ali-ahmadi', team: 'شرق', score: '۸۶', change: '۵٪', up: true, done: '۱۰۰٪', state: 'عالی', fg: T.successStrong, bg: T.tintGreen },
    { name: 'مریم کاظمی', avatar: 'staff-zahra-nouri', team: 'تهران', score: '۸۲', change: '۴٪', up: true, done: '۹۷٪', state: 'مطلوب', fg: T.successStrong, bg: T.tintGreen },
    { name: 'رضا حسینی', avatar: 'card-author-01', team: 'غرب', score: '۶۷', change: '۱۲٪', up: false, done: '۹۱٪', state: 'توجه', fg: T.accent, bg: T.tintOrange },
  ],
  showing: 'نمایش ۱ تا ۵ از ۱۲۰ مورد',
  pages: ['۱', '۲', '۳', '…', '۲۴'],
};

export const assessReportAsk = {
  title: 'درباره این ارزیابی از آریاز بپرسید',
  placeholder: 'سوال خود را بنویسید...',
  chips: [
    'مهم‌ترین یافته این ارزیابی چیست؟',
    'چه کسانی آماده ارتقا هستند؟',
    'کدام تیم بیشترین رشد را داشته؟',
    'برای شکاف تفویض اختیار چه پیشنهادی داری؟',
    'چه برنامه توسعه‌ای پیشنهاد می‌کنی؟',
  ],
};
