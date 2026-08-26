import { T } from './panelTokens';
import type { WizardStep } from './orgWizard';

/* ──────────────────────────────────────────────────────────────
   Custom report builder — /org/reports/new

   Screens 24–27. Four steps: what the report covers, what data
   goes in it, how it is laid out, and how it leaves the building.
   Screen 23 draws all four on one page; the stepped version is
   the one built here, since it is what screens 24–27 specify and
   the single-page variant is unusable at this density.
────────────────────────────────────────────────────────────── */

export const builderHead = {
  title: 'ساخت گزارش سفارشی',
  cancel: 'لغو',
  draft: 'ذخیره پیش‌نویس',
  preview: 'پیش‌نمایش گزارش',
  fullPreview: 'پیش‌نمایش تمام صفحه',
  finalPreview: 'پیش‌نمایش نهایی',
  back: 'مرحله قبل',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'مرکز گزارش‌ها', href: '/org/reports' },
    { label: 'ساخت گزارش سفارشی' },
  ],
};

export const builderSteps: WizardStep[] = [
  { n: '۰۱', id: 'scope', label: 'دامنه گزارش', desc: 'نوع، جامعه و دوره' },
  { n: '۰۲', id: 'data', label: 'انتخاب داده‌ها', desc: 'دسته‌ها و شاخص‌ها' },
  { n: '۰۳', id: 'design', label: 'طراحی گزارش', desc: 'چیدمان بخش‌ها' },
  { n: '۰۴', id: 'output', label: 'خروجی و انتشار', desc: 'فرمت و دسترسی' },
];

/* ── Step 1 — دامنه گزارش ─────────────────────────────────── */

export const stepScope = {
  title: 'مرحله ۱: دامنه گزارش',
  desc: 'ابتدا مشخص کنید این گزارش برای چه دامنه‌ای و مربوط به چه جامعه‌ای تهیه می‌شود.',
  typeTitle: '۱. انتخاب نوع گزارش',
  typeDesc: 'نوع گزارش را بر اساس نیاز خود انتخاب کنید.',
  types: [
    { id: 'org', label: 'گزارش سازمان', desc: 'گزارش در سطح کل سازمان', icon: 'lucide:building-2', fg: T.infoStrong, bg: T.tintBlue, on: true },
    { id: 'unit', label: 'گزارش واحد / تیم', desc: 'گزارش برای یک یا چند واحد / تیم', icon: 'lucide:users-round', fg: T.successStrong, bg: T.tintGreen },
    { id: 'people', label: 'گزارش کارکنان', desc: 'گزارشی برای افراد یا گروه‌های مشخص', icon: 'lucide:user-round', fg: T.accent, bg: T.tintOrange },
    { id: 'assessment', label: 'گزارش یک ارزیابی', desc: 'گزارش مربوط به یک چرخه ارزیابی', icon: 'lucide:clipboard-check', fg: T.primary, bg: T.tintPurple },
    { id: 'test', label: 'گزارش آزمون', desc: 'گزارش نتایج آزمون‌ها و پرسشنامه‌ها', icon: 'lucide:file-text', fg: T.danger, bg: T.tintRed },
    { id: 'talent', label: 'گزارش استعداد', desc: 'گزارش 9-Box، جانشینی و High Potential', icon: 'lucide:star', fg: T.violet, bg: T.tintPurple },
    { id: 'development', label: 'گزارش توسعه', desc: 'Gapها و برنامه‌های توسعه فردی و گروهی', icon: 'lucide:rocket', fg: T.warning, bg: T.tintOrange },
  ],
  audienceTitle: '۲. تعیین جامعه گزارش',
  audienceDesc: 'جامعه هدف گزارش خود را مشخص کنید.',
  audience: [
    { id: 'unit', label: 'واحد سازمانی', value: 'همه واحدها' },
    { id: 'team', label: 'تیم', value: 'همه تیم‌ها' },
    { id: 'grade', label: 'رده سازمانی', value: 'همه رده‌ها' },
    { id: 'manager', label: 'مدیر مستقیم', value: 'همه مدیران' },
    { id: 'kind', label: 'نوع کارکنان', value: 'کارکنان فعال' },
    { id: 'state', label: 'وضعیت کارکنان', value: 'همه وضعیت‌ها' },
  ],
  population: { label: 'جامعه گزارش', value: '۲۸۵ نفر', note: 'بر اساس فیلترهای انتخاب شده' },
  periodTitle: '۳. انتخاب دوره',
  periodDesc: 'دوره موردنظر برای گزارش را انتخاب کنید.',
  period: { label: 'دوره گزارش', value: 'تابستان ۱۴۰۵' },
  compare: { label: 'مقایسه با دوره قبل', on: true },
  comparePeriod: { label: 'دوره مقایسه', value: 'بهار ۱۴۰۵' },
  compareNote: 'گزارش شامل مقایسه عملکرد بین دو دوره خواهد بود.',
  next: 'ادامه - انتخاب داده‌ها',
};

/* ── Step 2 — انتخاب داده‌ها ──────────────────────────────── */

export const stepData = {
  title: 'مرحله ۲: انتخاب داده‌ها',
  desc: 'داده‌ها و شاخص‌های موردنیاز گزارش خود را انتخاب کنید.',
  summaryTitle: 'خلاصه گزارش',
  summary: [
    { icon: 'lucide:building-2', k: 'نوع گزارش', v: 'گزارش سازمان' },
    { icon: 'lucide:users-round', k: 'جامعه گزارش', v: 'کل سازمان' },
    { icon: 'lucide:calendar', k: 'دوره گزارش', v: 'تابستان ۱۴۰۵' },
    { icon: 'lucide:user-round', k: 'تعداد افراد', v: '۲۸۵ نفر' },
  ],
  editScope: 'ویرایش دامنه',
  pickTitle: '۱. انتخاب دسته‌های داده',
  pickDesc: 'دسته‌های داده موردنیاز گزارش خود را انتخاب کنید.',
  groups: [
    {
      id: 'base',
      label: 'اطلاعات پایه',
      count: '۵',
      icon: 'lucide:building-2',
      fg: T.successStrong,
      items: ['تعداد کارکنان', 'تعداد واحدها', 'ساختار سازمانی', 'نرخ تکمیل ارزیابی', 'وضعیت مشارکت'],
    },
    {
      id: 'performance',
      label: 'عملکرد و امتیازات',
      count: '۶',
      icon: 'lucide:chart-no-axes-combined',
      fg: T.accent,
      items: ['امتیاز کل', 'روند عملکرد', 'مقایسه با Benchmark'],
    },
    {
      id: 'competency',
      label: 'شایستگی‌ها',
      count: '۶',
      icon: 'lucide:star',
      fg: T.violet,
      items: ['نقاط قوت و رشد', 'Gapهای شایستگی', 'نمودار رادار', 'Heatmap شایستگی‌ها'],
    },
    {
      id: 'tests',
      label: 'آزمون‌ها',
      count: '۵',
      icon: 'lucide:brain',
      fg: T.infoStrong,
      items: ['EQ', 'MBTI', 'سبک رهبری'],
    },
    {
      id: 'talent',
      label: 'استعداد و جانشینی',
      count: '۶',
      icon: 'lucide:rocket',
      fg: T.primary,
      items: ['ماتریس 9-Box', 'High Potential', 'Succession Readiness'],
    },
    {
      id: 'development',
      label: 'توسعه',
      count: '۴',
      icon: 'lucide:graduation-cap',
      fg: T.warning,
      items: ['اولویت‌های توسعه', 'برنامه‌های توسعه', 'وضعیت پیشرفت'],
    },
    {
      id: 'people',
      label: 'کارکنان',
      count: '۴',
      icon: 'lucide:user-round',
      fg: T.danger,
      items: ['افراد برتر', 'نیازمند توجه', 'بیشترین رشد و افت'],
    },
  ],
  actions: { all: 'انتخاب همه', none: 'حذف شده همه', only: 'نمایش انتخابی‌ها' },
  aiTitle: 'پیشنهاد هوشمند آریاز',
  aiDesc: 'براساس نوع گزارش انتخابی شما، موارد زیر پیشنهاد می‌شوند.',
  aiItems: [
    'خلاصه مدیریتی هوشمند (AI)',
    'مقایسه با دوره قبل',
    'Heatmap واحدها',
    'تحلیل شکاف‌های توسعه',
  ],
  aiCta: 'افزودن پیشنهادها',
  previewTitle: '۲. پیش‌نمایش گزارش',
  previewDesc: 'پیش‌نمایش زنده گزارش بر اساس داده‌های انتخابی شما',
  detailTitle: '۳. سطح جزئیات گزارش',
  detailDesc: 'سطح مناسب گزارش خود را انتخاب کنید.',
  details: [
    { id: 'exec', label: 'خلاصه مدیریتی', desc: 'گزارش خلاصه و مناسب برای مدیران و هیئت مدیره', icon: 'lucide:megaphone', fg: T.accent },
    { id: 'standard', label: 'استاندارد', desc: 'گزارش کامل با تحلیل‌های کلیدی، مناسب مدیران و سرپرستان', icon: 'lucide:clipboard-list', fg: T.primary, on: true },
    { id: 'analytic', label: 'تحلیلی', desc: 'گزارش جامع و جزء به جزء با تحلیل عمیق، مناسب HR و تحلیل‌گران', icon: 'lucide:brain', fg: T.successStrong },
  ],
  next: 'ادامه طراحی گزارش',
};

/* The live preview panel repeated across steps 2 and 4. */
export const reportPreview = {
  brand: 'آریاز',
  tagline: 'تحلیل و توسعه سرمایه انسانی',
  title: 'گزارش جامع سرمایه انسانی',
  period: 'دوره: تابستان ۱۴۰۵',
  audience: 'جامعه: کل سازمان',
  count: 'تعداد افراد: ۲۸۵ نفر',
  confidential: 'محرمانه',
  execTitle: 'خلاصه مدیریتی',
  execBody: 'این بخش توسط هوش مصنوعی آریاز بر اساس داده‌های سازمانی تولید شده است.',
  kpiTitle: 'شاخص‌های کلیدی',
  kpis: [
    { k: 'تعداد کارکنان', v: '۲۸۵' },
    { k: 'نرخ تکمیل', v: '۸۷٪' },
    { k: 'میانگین امتیاز کل', v: '۷۴/۱۰۰' },
    { k: 'High Potential', v: '۲۱ نفر' },
  ],
  chartsTitle: 'نمودارهای کلیدی',
  charts: ['روند میانگین امتیاز کل', 'توزیع امتیازات', 'رادار شایستگی‌ها'],
  talentTitle: 'استعداد و جانشینی',
  talentSub: 'ماتریس ۴-Box بر اساس عملکرد و پتانسیل',
  notesTitle: 'نکات برجسته',
  notes: [
    'نرخ تکمیل ارزیابی‌ها نسبت به دوره قبل ۹٪ افزایش یافته است.',
    'میانگین امتیاز کل سازمان نسبت به دوره قبل ۳ امتیاز بهبود داشته است.',
    '۲۱ نفر در دسته High Potential قرار دارند.',
    'شایستگی «رهبری» پرتکرارترین گپ توسعه را دارد.',
  ],
  views: ['وب', 'PDF', 'تمام صفحه'],
};

/* ── Step 3 — طراحی گزارش ─────────────────────────────────── */

export const stepDesign = {
  title: 'مرحله ۳: طراحی گزارش',
  desc: 'چیدمان بخش‌ها، نمودارها و اجزای گزارش خود را طراحی کنید.',
  libraryTitle: 'کتابخانه اجزای گزارش',
  libraryDesc: 'برای افزودن به گزارش بکشید و رها کنید.',
  library: [
    { id: 'kpi', label: 'KPI', desc: 'شاخص کلیدی عملکرد', icon: 'lucide:gauge', fg: T.danger },
    { id: 'text', label: 'متن', desc: 'متون و توضیحات', icon: 'lucide:file-text', fg: T.primary },
    { id: 'exec', label: 'خلاصه مدیریتی', desc: 'خلاصه هوشمند گزارش', icon: 'lucide:sparkles', fg: T.violet },
    { id: 'line', label: 'نمودار خطی', desc: 'نمایش روند تغییرات', icon: 'lucide:trending-up', fg: T.successStrong },
    { id: 'bar', label: 'نمودار میله‌ای', desc: 'مقایسه مقادیر', icon: 'lucide:chart-column', fg: T.infoStrong },
    { id: 'donut', label: 'نمودار دونات', desc: 'توزیع جزئیات', icon: 'lucide:circle-dot', fg: T.accent },
    { id: 'radar', label: 'نمودار Radar', desc: 'پروفایل شایستگی‌ها', icon: 'lucide:radar', fg: T.warning },
    { id: 'heatmap', label: 'نمودار Heatmap', desc: 'نمایش شدت و تراکم', icon: 'lucide:grid-2x2', fg: T.danger },
    { id: 'table', label: 'جدول', desc: 'نمایش داده‌ها به صورت جدول', icon: 'lucide:table', fg: T.successStrong },
    { id: 'ninebox', label: 'ماتریس 9-Box', desc: 'توزیع استعدادها', icon: 'lucide:layout-grid', fg: T.primary },
    { id: 'people', label: 'لیست کارکنان', desc: 'جدول یا لیست افراد', icon: 'lucide:users-round', fg: T.accent },
    { id: 'ai', label: 'پیشنهادهای AI', desc: 'اقدامات و توصیه‌ها', icon: 'lucide:bot', fg: T.violet },
  ],
  canvasTitle: 'پیش‌نمایش و طراحی گزارش',
  autoLayout: 'چیدمان پیشنهادی گزارش',
  blocks: [
    { n: '۱', label: 'خلاصه مدیریتی آریاز', desc: 'خلاصه‌ای از وضعیت کلیدی و بخش‌های اصلی', icon: 'lucide:sparkles' },
    { n: '۲', label: 'KPIهای کلیدی', desc: 'نمای کلی شاخص‌های کلیدی عملکرد', icon: 'lucide:gauge' },
    { n: '۳', label: 'روند عملکرد', desc: 'روند تغییرات امتیاز کل در دوره‌های مختلف', icon: 'lucide:trending-up' },
    { n: '۴', label: 'مقایسه واحدها', desc: 'مقایسه واحدهای سازمان بر اساس امتیاز کل', icon: 'lucide:chart-column', selected: true },
    { n: '۵', label: 'شایستگی‌ها (Radar)', desc: 'پروفایل شایستگی‌های کلیدی سازمان', icon: 'lucide:radar' },
    { n: '۶', label: 'ماتریس استعداد (9-Box)', desc: 'توزیع استعدادها در ماتریس ۹ خانه‌ای', icon: 'lucide:layout-grid' },
    { n: '۷', label: 'نکات برجسته', desc: 'مهم‌ترین نکات و یافته‌های گزارش', icon: 'lucide:list-checks' },
    { n: '۸', label: 'پیشنهادهای آریاز', desc: 'پیشنهادها و اقدامات کلیدی مبتنی بر داده‌ها', icon: 'lucide:bot' },
  ],
  settingsTitle: 'تنظیمات بخش انتخاب‌شده',
  settings: {
    name: { label: 'عنوان بخش', value: 'مقایسه واحدها بر اساس امتیاز کل' },
    chart: { label: 'نوع نمودار', value: 'نمودار میله‌ای افقی' },
    metric: { label: 'شاخص', value: 'امتیاز کل' },
    dimension: { label: 'بعد (Dimension)', value: 'واحد سازمانی' },
    sort: { label: 'مرتب‌سازی', value: 'بیشترین به کمترین' },
    limit: { label: 'تعداد موارد', value: '۱۰ مورد' },
    benchmark: { label: 'نمایش Benchmark', on: true },
    values: { label: 'نمایش مقادیر روی نمودار', on: true },
    palette: { label: 'رنگ‌بندی', value: 'پیش‌فرض آریاز' },
    remove: 'حذف این بخش',
  },
  colours: [T.primaryStrong, T.info, T.success, T.accent, T.danger, '#9396b0'],
  next: 'ادامه خروجی و انتشار',
};

/* ── Step 4 — خروجی و انتشار ──────────────────────────────── */

export const stepOutput = {
  title: 'مرحله ۴: خروجی و انتشار',
  desc: 'مشخصات خروجی و نحوه انتشار گزارش را تعیین کنید.',
  summaryExtra: { icon: 'lucide:list', k: 'تعداد بخش‌های گزارش', v: '۸ بخش' },
  metaTitle: '۱. مشخصات گزارش',
  meta: {
    name: { label: 'نام گزارش', required: true, value: 'گزارش جامع سرمایه انسانی — تابستان ۱۴۰۵' },
    desc: { label: 'توضیح (اختیاری)', value: 'گزارش جامع وضعیت سرمایه انسانی سازمان شامل عملکرد، شایستگی‌ها، استعداد و توسعه.' },
    tags: { label: 'برچسب‌ها', values: ['عملکرد', 'شایستگی', 'استعداد', 'توسعه', 'تحلیل جامع'] },
  },
  formatTitle: '۲. فرمت خروجی',
  formatDesc: 'فرمت موردنظر برای تولید گزارش را انتخاب کنید.',
  formats: [
    { id: 'pdf', label: 'PDF', desc: 'گزارش', icon: 'lucide:file-down', fg: T.danger, on: true },
    { id: 'excel', label: 'Excel', desc: 'فایل خام', icon: 'lucide:file-spreadsheet', fg: T.successStrong },
    { id: 'both', label: 'PDF + Excel', desc: 'هر دو فرمت', icon: 'lucide:file-stack', fg: T.accent },
  ],
  pdfTitle: 'تنظیمات PDF',
  pdfOptions: [
    { id: 'org-logo', label: 'نمایش لوگوی سازمان', on: true },
    { id: 'aryaz-logo', label: 'نمایش لوگوی آریاز', on: true },
    { id: 'date', label: 'نمایش تاریخ تولید گزارش', on: true, extra: '۱۴۰۵/۰۵/۲۰' },
    { id: 'pages', label: 'شماره‌گذاری صفحات', on: true },
    { id: 'confidential', label: 'نمایش نشان محرمانه', on: true },
    { id: 'header', label: 'نمایش نام جامعه/واحد در سربرگ', on: true },
  ],
  accessTitle: '۳. سطح دسترسی و محرمانگی',
  visibility: {
    label: 'سطح نمایش اطلاعات',
    options: [
      { id: 'full', label: 'اطلاعات کامل', desc: 'نمایش نام و تمام جزئیات', icon: 'lucide:scan-eye', fg: T.successStrong, bg: T.tintGreen },
      { id: 'partial', label: 'محدودسازی اطلاعات', desc: 'حذف نام افراد و نمایش گروهی', icon: 'lucide:user-round-cog', fg: T.accent, bg: T.tintOrange, on: true },
      { id: 'aggregate', label: 'فقط داده‌های تجمیعی', desc: 'نمایش داده‌ها و شاخص‌های کلی', icon: 'lucide:users', fg: T.infoStrong, bg: T.tintBlue },
    ],
    note: 'با انتخاب این سطح، نام افراد در جداول و نمودارها نمایش داده نخواهد شد.',
  },
  access: {
    label: 'سطح دسترسی به گزارش',
    options: [
      { id: 'me', label: 'فقط من', desc: '' },
      { id: 'people', label: 'افراد مشخص', desc: 'انتخاب افراد مجاز', on: true },
      { id: 'roles', label: 'نقش‌های سازمانی', desc: 'بر اساس نقش کاری' },
    ],
  },
  publishTitle: '۴. انتشار و ارسال گزارش',
  publish: {
    options: [
      { id: 'store', label: 'فقط ذخیره در مرکز گزارش‌ها', desc: '' },
      { id: 'share', label: 'اشتراک‌گذاری اکنون', desc: '' },
      { id: 'scheduled', label: 'ارسال زمان‌بندی‌شده', desc: '', on: true },
    ],
    template: { label: 'نام Template', value: 'گزارش سرپرستان مدیران' },
    cadence: { label: 'تناوب ارسال', value: 'فصلی' },
    time: { label: 'زمان ارسال', value: 'روز ۵ هر ماه — ساعت ۸:۰۰' },
    start: { label: 'تاریخ شروع', value: '۱۴۰۵/۰۵/۲۰' },
    end: { label: 'تاریخ پایان (اختیاری)', value: '۱۴۰۵/۰۵/۲۰' },
    to: { label: 'گیرندگان', value: 'انتخاب شده', extra: '+۷' },
    keepTemplate: { label: 'این ساختار به‌عنوان Template ذخیره شود', on: true },
    note: 'این تنظیمات برای انتشارهای بعدی نیز ذخیره خواهد شد.',
  },
  checklist: {
    title: 'وضعیت آمادگی انتشار',
    items: [
      'دامنه گزارش مشخص شد',
      'داده‌های انتخابی تعیین شد',
      'طراحی گزارش تکمیل شد',
      'سطح دسترسی تعیین شد',
      'آماده برای تولید و انتشار',
    ],
  },
  publishCta: 'تولید و انتشار گزارش',
};
