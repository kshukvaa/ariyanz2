import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Test report — /org/reports/tests/[id]

   Screen 19. One instrument (EQ) across one population. The five
   dimension cards, the radar and the team heatmap all describe
   the same five dimensions, so a reader can move between them
   without re-orienting.

   ۱۲۰ completed of ۱۲۵ invited gives the ۹۶٪ completion quoted in
   the KPI row and the funnel.
────────────────────────────────────────────────────────────── */

export const testReportHead = {
  title: 'گزارش آزمون هوش هیجانی (EQ)',
  desc: 'تحلیل نتایج هوش هیجانی مدیران و سرپرستان واحد فروش',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'ارزیابی مدیران فروش', href: '/org/assessments/sales-managers' },
    { label: 'هوش هیجانی' },
  ],
  compare: 'مقایسه با دوره قبل',
};

export const testReportFilters = [
  { id: 'assessment', label: 'ارزیابی', value: 'مدیران فروش' },
  { id: 'period', label: 'دوره', value: 'تابستان ۱۴۰۵' },
  { id: 'unit', label: 'واحد سازمانی', value: 'همه واحدها' },
  { id: 'team', label: 'تیم / منطقه', value: 'همه تیم‌ها' },
  { id: 'compare', label: 'مقایسه با دوره', value: 'بهار ۱۴۰۵' },
];

export const testSpec = {
  title: 'شناسنامه آزمون',
  rows: [
    { k: 'تعداد سوال', v: '۶۰ سوال' },
    { k: 'زمان تقریبی', v: '۲۵ دقیقه' },
    { k: 'تعداد اجرا', v: '۱۱۹ نفر' },
    { k: 'تکمیل شده', v: '۱۱۸ نفر' },
    { k: 'نوع خروجی', v: 'امتیاز + تحلیل ابعاد' },
    { k: 'بنچمارک', v: 'مدیران هم‌سطح' },
  ],
};

export const testReportKpis = [
  { id: 'participants', value: '۱۲۰', label: 'شرکت‌کننده تکمیل‌شده', icon: 'lucide:users-round', fg: T.primary, bg: T.tintPurple },
  { id: 'rate', value: '۹۶٪', label: 'نرخ تکمیل', sub: '۶٪ نسبت به دوره قبل', up: true, icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
  { id: 'avg', value: '۷۶', label: 'میانگین امتیاز', sub: '۴.۳٪ نسبت به دوره قبل', up: true, icon: 'lucide:trending-up', fg: T.infoStrong, bg: T.tintBlue },
  { id: 'high', value: '۸۹', label: 'بالاترین امتیاز', icon: 'lucide:arrow-up', fg: T.accent, bg: T.tintOrange },
  { id: 'low', value: '۵۸', label: 'پایین‌ترین امتیاز', icon: 'lucide:trending-down', fg: T.danger, bg: T.tintRed },
  { id: 'need', value: '۲۱ نفر', label: 'نیازمند توسعه', sub: '۱۸٪ از کل', icon: 'lucide:triangle-alert', fg: T.violet, bg: T.tintPurple },
];

export const testReportAi = {
  title: 'تحلیل آریاز از نتایج هوش هیجانی',
  body: [
    'میانگین هوش هیجانی جامعه مورد بررسی ۷۶ از ۱۰۰ است و نسبت به دوره قبل ۴.۳٪ افزایش یافته است.',
    'قوی‌ترین بُعد «همدلی» و ضعیف‌ترین «خودتنظیمی» است. این شکاف در مدیران منطقه غرب محسوس‌تر از سایر گروه‌هاست.',
  ],
  cta: 'تحلیل عمیق با آریاز',
  chips: [
    { label: 'قوی‌ترین بُعد', value: 'همدلی', sub: '۸۴/۱۰۰', fg: T.successStrong, bg: T.tintGreen },
    { label: 'شکاف اصلی', value: 'خودتنظیمی', sub: '۶۷/۱۰۰', fg: T.danger, bg: T.tintRed },
    { label: 'گروه نیازمند توجه', value: 'مدیران منطقه غرب', sub: '۶۳/۱۰۰', fg: T.infoStrong, bg: T.tintBlue },
  ],
};

export const testParticipation = {
  title: 'وضعیت مشارکت در آزمون',
  centre: '۱۲۰',
  centreSub: 'تکمیل‌شده',
  slices: [
    { label: 'تکمیل‌شده', value: 120, colour: T.success, pct: '۱۲۰' },
    { label: 'در حال انجام', value: 3, colour: T.warning, pct: '۳' },
    { label: 'تکمیل‌نشده', value: 2, colour: T.danger, pct: '۲' },
  ],
};

export const testFunnel = {
  title: 'فرآیند اجرای آزمون',
  rows: [
    { label: 'دعوت', value: '۱۲۵', width: 100 },
    { label: 'شروع کرده', value: '۱۲۳', width: 84 },
    { label: 'تکمیل کرده', value: '۱۲۰', width: 68 },
  ],
  note: '۹۶٪ Completion Rate',
};

export const testDistribution = {
  title: 'توزیع امتیازات',
  benchmark: 'Benchmark (۷۲)',
  categories: ['۰-۵۰', '۵۰-۶۰', '۶۰-۷۰', '۷۰-۸۰', '۸۰-۹۰', '۹۰-۱۰۰'],
  series: [{ name: 'شرکت‌کنندگان', colour: T.primaryStrong, values: [2, 6, 18, 29, 15, 10] }],
};

export const testAverage = {
  title: 'میانگین امتیاز',
  value: 76,
  max: 100,
  level: 'سطح مطلوب',
  refs: [
    { label: 'میانگین سازمان', value: '۷۲/۱۰۰' },
    { label: 'میانگین مدیران', value: '۷۸/۱۰۰' },
  ],
};

export const testDimensions = {
  radarTitle: 'تحلیل ابعاد هوش هیجانی',
  axes: ['خودآگاهی', 'خودتنظیمی', 'انگیزش', 'همدلی', 'مهارت اجتماعی'],
  current: [81, 67, 78, 84, 74],
  previous: [76, 69, 72, 78, 73],
  legend: [
    { label: 'دوره جاری', colour: T.primary },
    { label: 'دوره قبل', colour: T.muted, dashed: true },
  ],
  cardsTitle: 'نتیجه هر بُعد',
  cta: 'مشاهده جزئیات',
  cards: [
    { id: 'aware', label: 'خودآگاهی', value: '۸۱', delta: '+۵٪', up: true, level: 'بالا', fg: T.successStrong, bg: T.tintGreen, icon: 'lucide:user-round' },
    { id: 'regulate', label: 'خودتنظیمی', value: '۶۷', delta: '−۲٪', up: false, level: 'نیازمند توسعه', fg: T.danger, bg: T.tintRed, icon: 'lucide:sliders-horizontal' },
    { id: 'motivate', label: 'انگیزش', value: '۷۸', delta: '+۶٪', up: true, level: 'مطلوب', fg: T.successStrong, bg: T.tintGreen, icon: 'lucide:flame' },
    { id: 'empathy', label: 'همدلی', value: '۸۴', delta: '+۸٪', up: true, level: 'بالا', fg: T.successStrong, bg: T.tintGreen, icon: 'lucide:handshake' },
    { id: 'social', label: 'مهارت اجتماعی', value: '۷۴', delta: '+۱٪', up: true, level: 'مطلوب', fg: T.successStrong, bg: T.tintGreen, icon: 'lucide:users-round' },
  ],
  scale: '/ ۱۰۰',
  deltaNote: 'تغییر نسبت به دوره قبل',
};

export const testTeams = {
  title: 'میانگین EQ در تیم‌ها',
  rows: [
    { label: 'تهران', value: 82, colour: T.primaryStrong, note: '+۶٪', up: true },
    { label: 'شرق', value: 79, colour: T.primaryStrong, note: '+۹٪', up: true },
    { label: 'جنوب', value: 76, colour: T.violet, note: '+۳٪', up: true },
    { label: 'غرب', value: 63, colour: '#d5d7e3', note: '−۷٪', up: false },
    { label: 'میانگین سازمانی', value: 72, colour: '#b9a9fb', note: '+۴٪', up: true },
  ],
};

export const testHeatmap = {
  title: 'نقشه حرارتی ابعاد در تیم‌ها',
  cols: ['خودآگاهی', 'خودتنظیمی', 'انگیزش', 'همدلی', 'مهارت اجتماعی'],
  legend: [
    { label: 'قوی (۸۰+)', colour: T.success },
    { label: 'متوسط (۶۰-۷۹)', colour: T.warning },
    { label: 'نیازمند توجه (<۶۰)', colour: T.danger },
  ],
  rows: [
    { team: 'تهران', cells: [2, 2, 2, 2, 2] },
    { team: 'شرق', cells: [1, 1, 2, 2, 1] },
    { team: 'جنوب', cells: [1, 1, 1, 1, 1] },
    { team: 'غرب', cells: [0, 0, 0, 0, 0] },
  ],
};

export const testLevels = {
  title: 'توزیع سطوح نتایج',
  slices: [
    { label: 'بسیار بالا (۹۰-۱۰۰)', value: 19, colour: T.info, pct: '۱۹٪' },
    { label: 'بالا (۸۰-۸۹)', value: 24, colour: T.success, pct: '۲۴٪' },
    { label: 'مطلوب (۷۰-۷۹)', value: 45, colour: T.warning, pct: '۴۵٪' },
    { label: 'نیازمند توسعه (۶۰-۶۹)', value: 15, colour: T.accent, pct: '۱۵٪' },
    { label: 'پایین (<۶۰)', value: 3, colour: T.danger, pct: '۳٪' },
  ],
  note: '۲۱ نفر نیازمند توسعه فوری',
  cta: 'مشاهده افراد',
};

export const testTop = {
  title: 'برترین نتایج',
  cta: 'مشاهده همه',
  rows: [
    { n: '۱', name: 'سارا کریمی (تهران)', value: '۸۹' },
    { n: '۲', name: 'محمد احمدی (شرق)', value: '۸۷' },
    { n: '۳', name: 'علی رضایی (تهران)', value: '۸۶' },
    { n: '۴', name: 'مریم کاظمی (شرق)', value: '۸۵' },
    { n: '۵', name: 'رضا بهرامی (تهران)', value: '۸۴' },
  ],
};

export const testNeeds = {
  title: 'نیازمند توجه',
  cta: 'مشاهده لیست کامل',
  rows: [
    '۲۱ نفر سطح مطلوب (کمتر از ۷۰)',
    '۹ نفر دارای شکاف در بیش از ۳ بُعد',
    '۶ نفر افت معنادار نسبت به دوره قبل',
  ],
};

export const testTrend = {
  title: 'روند ابعاد EQ در دوره‌های گذشته',
  points: [68, 70, 73, 76],
  labels: ['پاییز ۱۴۰۴', 'زمستان ۱۴۰۴', 'بهار ۱۴۰۵', 'تابستان ۱۴۰۵'],
  note: 'رشد طی ۴ دوره',
  delta: '+۱۱.۳٪',
};

export const testExports = {
  title: 'تغییرات نسبت به دوره قبل (بهار ۱۴۰۵)',
  cards: [
    { id: 'mgr', label: 'گزارش مدیریتی', icon: 'lucide:file-text', fg: T.successStrong, bg: T.tintGreen },
    { id: 'dims', label: 'گزارش ابعاد', icon: 'lucide:chart-column', fg: T.infoStrong, bg: T.tintBlue },
    { id: 'gap', label: 'بیشترین شکاف', icon: 'lucide:triangle-alert', fg: T.danger, bg: T.tintRed },
    { id: 'excel', label: 'داده خام Excel', icon: 'lucide:file-spreadsheet', fg: T.successStrong, bg: T.tintGreen },
  ],
};

export const testCorrelation = {
  title: 'ارتباط با سایر نتایج',
  note: '* همبستگی به معنای رابطه علت و معلولی نیست.',
  rows: [
    { label: 'شایستگی رهبری × EQ', r: 'r = ۰.۵۲', strength: 'مثبت قوی', fg: T.successStrong, bg: T.tintGreen },
    { label: 'عملکرد مدیریتی × EQ', r: 'r = ۰.۴۸', strength: 'مثبت متوسط', fg: T.accent, bg: T.tintOrange },
    { label: 'رضایت تیم × EQ', r: 'r = ۰.۵۵', strength: 'مثبت متوسط', fg: T.accent, bg: T.tintOrange },
  ],
};

export const testSuggestions = {
  title: 'پیشنهادهای توسعه‌ای آریاز',
  cta: 'ساخت برنامه توسعه',
  detail: 'جزئیات',
  cards: [
    { n: '۰۱', label: 'توسعه خودتنظیمی', sub: '۲۱ نفر', note: 'مناسب: تمرین ذهن‌آگاهی و خودمدیریتی', fg: T.danger, bg: T.tintRed },
    { n: '۰۲', label: 'توسعه مهارت اجتماعی', sub: '۱۴ نفر', note: 'مناسب: کارگاه ارتباطات', fg: T.accent, bg: T.tintOrange },
    { n: '۰۳', label: 'مداخله فوری غرب', sub: 'Gap بالا در تمام ابعاد', note: 'مناسب: برنامه توسعه منطقه‌ای', fg: T.infoStrong, bg: T.tintBlue },
  ],
};

export const testReportAsk = {
  title: 'درباره نتایج این آزمون از آریاز بپرسید',
  placeholder: 'سوال خود را بنویسید...',
  chips: [
    'چرا خودتنظیمی پایین است؟',
    'کدام تیم بیشترین Gap را دارد؟',
    'افراد نیازمند توسعه چه کسانی هستند؟',
    'چه برنامه توسعه‌ای پیشنهاد می‌کنی؟',
    'با دوره قبل مقایسه کن',
  ],
};
