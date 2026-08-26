import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Smart analysis — /org/reports/ai

   Screen 29. A conversation with the organisation's own data:
   the question sits at the top, the worked answer fills the
   middle, and the rails hold what came before and what to do
   next.

   The worked example answers why the west sales region dropped —
   ۶۸ to ۶۱, the −۷٪ that screen 15 flags as its biggest risk.
────────────────────────────────────────────────────────────── */

export const aiHead = {
  title: 'تحلیل هوشمند آریاز',
  desc: 'با داده‌های سرمایه انسانی سازمان گفتگو کنید. الگوها را کشف کنید و به بینش قابل اقدام برسید.',
  crumbs: [
    { label: 'نتایج و گزارش‌ها', href: '/org/reports' },
    { label: 'تحلیل هوشمند آریاز' },
  ],
  newChat: 'گفتگوی جدید',
  history: 'تاریخچه تحلیل‌ها',
};

export const aiFilters = [
  { id: 'scope', label: 'دامنه', value: 'کل سازمان', icon: 'lucide:building-2' },
  { id: 'period', label: 'دوره', value: 'تابستان ۱۴۰۵', icon: 'lucide:calendar' },
  { id: 'compare', label: 'مقایسه با', value: 'بهار ۱۴۰۵' },
  { id: 'sources', label: 'منابع داده', value: '۶ منبع فعال' },
];

export const aiSources = {
  label: 'داده‌های مورد استفاده:',
  chips: ['ارزیابی‌ها', 'آزمون‌ها', 'شایستگی‌ها', 'توسعه', 'کارکنان', 'واحدها'],
};

export const aiQuestion = 'چرا امتیاز واحد فروش غرب نسبت به دوره قبل کاهش پیدا کرد؟';

export const aiAnswer = {
  brand: 'آریاز',
  tagline: 'تحلیل آریاز بر اساس داده‌های سازمان',
  lead: 'امتیاز واحد فروش غرب از ۶۸ در بهار ۱۴۰۵ به ۶۱ در تابستان ۱۴۰۵ کاهش یافته است، یعنی افت ۱۰.۳٪.',
  sub: 'داده‌ها نشان می‌دهند بیشترین کاهش در «مدیریت زمان»، «برنامه‌ریزی» و «تفویض اختیار» مشاهده شده است.',
  metricsLabel: 'مشاهده مبنای تحلیل',
  metrics: [
    { label: 'امتیاز کل', from: '۶۸', to: '۶۱', delta: '۱۰.۳٪', icon: 'lucide:activity', fg: T.primary, bg: T.tintPurple },
    { label: 'مدیریت زمان', from: '۶۷', to: '۵۸', delta: '۱۳.۴٪', icon: 'lucide:clock', fg: T.danger, bg: T.tintRed },
    { label: 'برنامه‌ریزی', from: '۷۲', to: '۶۸', delta: '۱۱.۱٪', icon: 'lucide:list-checks', fg: T.accent, bg: T.tintOrange },
    { label: 'تفویض اختیار', from: '۶۹', to: '۶۳', delta: '۸.۷٪', icon: 'lucide:users-round', fg: T.warning, bg: T.tintOrange },
    { label: 'رهبری', from: '۷۱', to: '۶۵', delta: '۸.۵٪', icon: 'lucide:crown', fg: T.violet, bg: T.tintPurple },
  ],
  trendTitle: 'روند امتیاز واحد فروش غرب',
  trendSub: 'در چهار دوره اخیر',
  trendPoints: [74, 71, 68, 61],
  trendLabels: ['پاییز ۱۴۰۴', 'زمستان ۱۴۰۴', 'بهار ۱۴۰۵', 'تابستان ۱۴۰۵'],
  trendRef: 'میانگین سازمان',
  trendRefPoints: [72, 73, 74, 74],
  barTitle: 'مقایسه امتیاز کل واحدهای فروش',
  barSub: 'تابستان ۱۴۰۵',
  barCategories: ['فروش تهران', 'فروش شرق', 'فروش جنوب', 'فروش غرب'],
  barValues: [98, 81, 74, 61],
  findingsTitle: 'یافته‌های مبتنی بر داده',
  findings: [
    'افت ۱۰.۳٪ در امتیاز کل واحد فروش غرب',
    'کاهش ۱۳.۴٪ در مدیریت زمان',
    'کاهش ۱۱.۱٪ در برنامه‌ریزی',
    'کاهش ۸.۷٪ در تفویض اختیار',
  ],
  hypothesesTitle: 'فرضیه‌های قابل بررسی',
  hypothesesBadge: 'نیازمند بررسی',
  hypotheses: [
    'افزایش حجم فعالیت‌های عملیاتی و فشار کاری',
    'کاهش زمان جلسات تیمی و بازخوردها',
    'تغییر ترکیب تیم و خروج نیروهای کلیدی',
  ],
  moreTitle: 'بررسی بیشتر',
  more: [
    { label: 'بررسی به‌تفکیک زمان', icon: 'lucide:clock' },
    { label: 'مقایسه غربان مقایسه‌ای و اثربخشی', icon: 'lucide:chart-column' },
    { label: 'مشاهده فرد بیشترین‌بیشترین Gap', icon: 'lucide:user-round' },
    { label: 'بررسی تیم فروش غربی، فرد‌های فروش', icon: 'lucide:users-round' },
  ],
};

export const aiRecent = {
  title: 'تحلیل‌های اخیر',
  cta: 'مشاهده گفتگوها',
  rows: [
    { label: 'چرا امتیاز فروش غرب کاهش یافته؟', date: 'امروز', on: true, icon: 'lucide:trending-down', fg: T.danger },
    { label: 'استعدادهای آماده ارتقا', date: '۲۵ مرداد ۱۴۰۵', icon: 'lucide:star', fg: T.violet },
    { label: 'شکاف شایستگی مدیران', date: '۱۵ مرداد ۱۴۰۵', icon: 'lucide:target', fg: T.accent },
    { label: 'مقایسه مناطق فروش', date: '۱۲ مرداد ۱۴۰۵', icon: 'lucide:chart-column', fg: T.infoStrong },
    { label: 'تحلیل خروج کارکنان', date: '۱۰ مرداد ۱۴۰۵', icon: 'lucide:users-round', fg: T.primary },
  ],
};

export const aiSaved = {
  title: 'Insightهای ذخیره شده',
  cta: 'مشاهده همه Insightها',
  rows: [
    { label: 'مدیریت زمان مهم‌ترین Gap مدیران فروش است', date: 'امروز' },
    { label: 'واحد IT بیشترین نرخ تکمیل ارزیابی را دارد', date: 'امروز' },
    { label: 'پتانسیل ارتقای سازمان نسبت به بهار ۱۴۰۵ به ۸.۵ رسیده است', date: '۱۵ مرداد ۱۴۰۵' },
  ],
};

export const aiSuggestions = {
  title: 'پیشنهادهای آریاز',
  rows: [
    { label: 'ایجاد برنامه توسعه برای تیم', icon: 'lucide:rocket', fg: T.primary },
    { label: 'افزودن افراد به برنامه توسعه', icon: 'lucide:user-round-plus', fg: T.successStrong },
    { label: 'تعریف ارزیابی مجدد در پاییز', icon: 'lucide:calendar-check', fg: T.accent },
    { label: 'ایجاد لیست پیگیری مدیریتی', icon: 'lucide:list-checks', fg: T.infoStrong },
  ],
};

export const aiExports = {
  title: 'تبدیل این تحلیل به خروجی',
  rows: [
    { label: 'ساخت گزارش از این تحلیل', icon: 'lucide:file-text', fg: T.danger },
    { label: 'ایجاد داشبورد اختصاصی', icon: 'lucide:layout-grid', fg: T.violet },
    { label: 'خروجی PDF همین تحلیل', icon: 'lucide:file-down', fg: T.infoStrong },
    { label: 'خروجی Excel همین تحلیل', icon: 'lucide:file-spreadsheet', fg: T.successStrong },
  ],
};

export const aiNext = {
  title: 'سوالات پیشنهادی بعدی',
  rows: [
    'آیا این افت فقط در مدیران اتفاق افتاده؟',
    'این افراد چه Gap مشترکی دارند؟',
    'با دوره مشابه سال قبل مقایسه کن',
    'چه اقدام توسعه‌ای بیشترین اولویت را دارد؟',
  ],
};

export const aiAccess = {
  title: 'وضعیت دسترسی',
  level: 'سطح دسترسی شما: مدیر سیستم',
  note: 'شما مجاز به مشاهده تمام داده‌های سازمانی هستید.',
};

export const aiComposer = {
  placeholder: 'از داده‌های سازمان بپرسید...',
  context: 'افزودن Context',
};
