import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Unit report — /org/reports/units/[id]

   Screen 16. One organisational unit — sales — read against the
   rest of the organisation. The unit's ۸۱ and the organisation's
   ۷۴.۲ are the same figures screen 15 reports.
────────────────────────────────────────────────────────────── */

export const unitHead = {
  title: 'گزارش واحد فروش',
  desc: 'تحلیل عملکرد، شایستگی‌ها، استعدادها و نیازهای توسعه‌ای کارکنان واحد فروش',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'گزارش جامع سازمان', href: '/org/reports/organisation' },
    { label: 'واحد فروش' },
  ],
};

export const unitFilters = [
  { id: 'unit', label: 'واحد سازمانی', value: 'فروش' },
  { id: 'team', label: 'زیرگروه / تیم', value: 'همه تیم‌های فروش' },
  { id: 'compare', label: 'مقایسه با', value: 'بهار ۱۴۰۵' },
  { id: 'assessment', label: 'ارزیابی', value: 'بهار ۱۴۰۵' },
];

export const unitBand = {
  name: 'واحد فروش',
  manager: { k: 'مدیر واحد:', v: 'محمد رضایی' },
  facts: [
    { k: 'تعداد کارکنان:', v: '۲۸۰ نفر', icon: 'lucide:users-round' },
    { k: 'ارزیابی‌شده:', v: '۲۴۵ نفر', icon: 'lucide:circle-check' },
  ],
  rate: { label: 'نرخ مشارکت:', value: '۹۶٪', pct: 96 },
  runs: { label: 'تعداد ارزیابی‌های اجراشده:', value: '۵' },
};

export const unitKpis = [
  { id: 'total', value: '۸۱', label: 'امتیاز کل واحد', sub: '۵٪', up: true, icon: 'lucide:activity', fg: T.successStrong, bg: T.tintGreen },
  { id: 'completion', value: '۹۶٪', label: 'نرخ تکمیل', sub: '۸٪', up: true, icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
  { id: 'competency', value: '۷۹', label: 'میانگین شایستگی‌ها', sub: '۶٪', up: true, icon: 'lucide:star', fg: T.infoStrong, bg: T.tintBlue },
  { id: 'potential', value: '۸۳', label: 'امتیاز پتانسیل', sub: '۴٪', up: true, icon: 'lucide:trending-up', fg: T.violet, bg: T.tintPurple },
  { id: 'readiness', value: '۷۶', label: 'آمادگی توسعه', sub: '۸٪', up: true, icon: 'lucide:sprout', fg: T.accent, bg: T.tintOrange },
];

export const unitAi = {
  title: 'تحلیل آریاز از واحد فروش',
  body: [
    'واحد فروش با امتیاز ۸۱، اول میان واحدهای سازمان را دارد و نسبت به دوره قبل رشد کرده است.',
    'بیشترین پیشرفت در «مهارت‌های فروش» مشاهده شده اما «مدیریت زمان» همچنان مهم‌ترین شکاف مشترک کارکنان این واحد است.',
  ],
  cta: 'تحلیل عمیق با آریاز',
  chips: [
    { label: 'نقطه قوت اصلی', value: 'مهارت فروش', sub: '۸۸/۱۰۰', fg: T.successStrong, bg: T.tintGreen },
    { label: 'شکاف اصلی', value: 'مدیریت زمان', sub: '۶۷/۱۰۰', fg: T.accent, bg: T.tintOrange },
    { label: 'ریسک قابل توجه', value: 'فروش منطقه غرب', sub: '−۶٪ نسبت به دوره قبل', fg: T.danger, bg: T.tintRed },
  ],
};

export const unitRank = {
  title: 'جایگاه واحد در سازمان',
  note: 'امتیاز واحد فروش ۸۱ بالاتر از میانگین سازمان (۷۴.۲) است.',
  rows: [
    { label: 'فروش', value: 81, colour: T.primaryStrong, note: '۸۱' },
    { label: 'منابع انسانی', value: 78, colour: '#b9a9fb', note: '۷۸' },
    { label: 'مالی', value: 74, colour: '#b9a9fb', note: '۷۴' },
    { label: 'IT', value: 72, colour: '#b9a9fb', note: '۷۲' },
    { label: 'عملیات', value: 68, colour: '#d5d7e3', note: '۶۸' },
    { label: 'منطقه غرب', value: 61, colour: '#d5d7e3', note: '۶۱' },
  ],
};

export const unitTrend = {
  title: 'روند امتیاز واحد فروش',
  points: [69, 72, 74, 81],
  labels: ['پاییز ۱۴۰۴', 'زمستان ۱۴۰۴', 'بهار ۱۴۰۵', 'تابستان ۱۴۰۵'],
  changeLabel: 'تغییر نسبت به دوره قبل',
  change: '۹',
  trendLabel: 'روند:',
  trend: 'رو به رشد',
};

export const unitRadar = {
  title: 'پروفایل شایستگی‌ها (واحد فروش در برابر سازمان)',
  axes: ['حل مسئله', 'شبکه‌سازی', 'همکاری', 'انگیزش', 'برنامه‌ریزی', 'دیگرگری', 'رهبری'],
  unit: [88, 82, 79, 84, 71, 74, 78],
  org: [80, 74, 76, 77, 69, 71, 73],
  legend: [
    { label: 'واحد فروش', colour: T.primary },
    { label: 'میانگین سازمان', colour: T.muted, dashed: true },
  ],
};

export const unitTeamMap = {
  title: 'نقشه شایستگی‌ها در تیم‌ها',
  cols: ['انگیزش زمان', 'همکاری مشتری', 'حل مسئله', 'تیپ قیمتی', 'موقعیت شغلی'],
  legend: [
    { label: 'قوی', colour: T.success },
    { label: 'متوسط', colour: T.warning },
    { label: 'نیازمند توجه', colour: T.danger },
  ],
  rows: [
    { team: 'تهران', cells: [2, 2, 2, 2, 2] },
    { team: 'شرق', cells: [1, 2, 1, 2, 2] },
    { team: 'غرب', cells: [1, 1, 1, 1, 2] },
    { team: 'غرب', cells: [0, 1, 1, 1, 1] },
  ],
};

export const unitTeams = {
  title: 'عملکرد تیم‌های زیرمجموعه',
  cta: 'مشاهده تحلیل تیم‌ها',
  cols: { rank: 'رتبه', team: 'تیم', people: 'تعداد نفرات', change: 'تغییر نسبت به دوره قبل', done: 'تکمیل', state: 'وضعیت' },
  rows: [
    { rank: '۱', team: 'تهران', people: '۷۳', change: '۸٪', up: true, done: '۹۶٪', state: 'عالی', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۲', team: 'شرق', people: '۸۲', change: '۶٪', up: true, done: '۹۶٪', state: 'عالی', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۳', team: 'جنوب', people: '۵۹', change: '۳٪', up: true, done: '۹۴٪', state: 'مطلوب', fg: T.successStrong, bg: T.tintGreen },
    { rank: '۴', team: 'غرب', people: '۶۸', change: '۷٪', up: false, done: '۹۱٪', state: 'توجه', fg: T.accent, bg: T.tintOrange },
  ],
};

export const unitLevels = {
  title: 'توزیع سطح کارکنان',
  slices: [
    { label: 'عالی', value: 24, colour: T.info, pct: '۲۴٪' },
    { label: 'مطلوب', value: 46, colour: T.success, pct: '۴۶٪' },
    { label: 'متوسط', value: 21, colour: T.warning, pct: '۲۱٪' },
    { label: 'نیازمند توسعه', value: 6, colour: T.accent, pct: '۶٪' },
    { label: 'ریسک', value: 3, colour: T.danger, pct: '۳٪' },
  ],
};

export const unitAttention = {
  title: 'نیازمند توجه',
  value: '۲۷ نفر',
  lines: ['۹ نفر عملکرد', '۸ نفر شکاف چند بعدی', '۱۰ نفر ریسک توسعه'],
  cta: 'مشاهده کارکنان',
  href: '/org/reports/attention',
};

export const unitTalent = {
  title: 'ماتریس استعداد واحد (9-Box)',
  cta: 'مشاهده ماتریس کامل',
  cells: [
    { label: 'High Potential', value: '۹ نفر', bg: T.tintGreen },
    { label: 'Key Player', value: '۲۸ نفر', bg: T.tintGreen },
    { label: 'Star', value: '۱۸ نفر', bg: T.tintGreen },
    { label: 'Emerging Talent', value: '۲۵ نفر', bg: T.tintOrange },
    { label: 'Core Talent', value: '۳۶ نفر', bg: T.tintGreen },
    { label: 'High Performer', value: '۲۰ نفر', bg: T.tintGreen },
    { label: 'Development Needed', value: '۱۲ نفر', bg: T.tintOrange },
    { label: 'Solid Performer', value: '۲۲ نفر', bg: T.tintOrange },
    { label: 'At Risk', value: '۷ نفر', bg: T.tintRed },
  ],
};

export const unitPeople = {
  title: 'افراد شاخص',
  cta: 'مشاهده همه',
  groups: [
    { label: 'برترین عملکرد', name: 'محمد رضایی', score: '۹۵ امتیاز', icon: 'lucide:trophy', fg: T.warning, avatar: 'staff-mohammad-rezaei' },
    { label: 'بیشترین رشد', name: 'سارا کریمی', score: '+۸٪', icon: 'lucide:trending-up', fg: T.successStrong, avatar: 'staff-sara-karimi' },
    { label: 'نیازمند توجه', name: '۲۷ نفر', score: '', icon: 'lucide:triangle-alert', fg: T.danger, avatar: '' },
  ],
};

export const unitTests = {
  title: 'نتایج آزمون‌ها',
  cta: 'مشاهده همه گزارش آزمون‌ها',
  rows: [
    { label: 'MBTI', value: '۱۶۸', note: 'اجرا', icon: '/images/aryaz/test-icons-3d/test-mbti.png' },
    { label: 'هوش هیجانی', value: '۱۴۲', note: '۷۶.۳٪ میانگین', icon: '/images/aryaz/test-icons-3d/test-eq.png' },
    { label: 'شایستگی فروش', value: '۲۲۸', note: '۸۵.۶٪ میانگین', icon: '/images/aryaz/test-icons-3d/quest-competency.png' },
    { label: 'سبک رهبری', value: '۴۴۸', note: 'سبک غالب: تحولی', icon: '/images/aryaz/test-icons-3d/test-leadership.png' },
  ],
};

export const unitAsk = {
  title: 'درباره واحد فروش از آریاز بپرسید',
  placeholder: 'سوال خود را بنویسید...',
  chips: [
    'چرا امتیاز منطقه غرب پایین است؟',
    'کدام تیم بیشترین رشد را داشته؟',
    'برنامه توسعه این واحد چه باشد؟',
    'چه کسانی آماده ارتقا هستند؟',
  ],
};
