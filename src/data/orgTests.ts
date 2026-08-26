import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Organisational test library — /org/tests

   Screens 12 and 13: the catalogue, and the detail drawer that
   slides in over it. The "استفاده سازمان شما" line on each card
   is what separates this from a public catalogue — every test is
   shown against how much this organisation has actually used it.
────────────────────────────────────────────────────────────── */

const ART = '/images/aryaz/test-icons-3d';

export const testsHead = {
  title: 'آزمون‌های سازمانی',
  desc: 'آزمون‌ها و پرسشنامه‌های معتبر موردنیاز سازمان خود را بررسی و برای ارزیابی کارکنان استفاده کنید.',
  create: { label: 'ایجاد ارزیابی جدید', href: '/org/assessments/new' },
  saved: { label: 'آزمون‌های منتخب من', href: '/org/tests?saved=1' },
  search: 'نام آزمون یا موضوع...',
  more: 'فیلترهای بیشتر',
  seeAll: 'مشاهده همه آزمون‌ها',
};

export const testsStats = [
  {
    id: 'available',
    value: '۳۶',
    label: 'آزمون در دسترس',
    sub: 'در کتابخانه آریاز',
    icon: 'lucide:clipboard-list',
    fg: T.primary,
    bg: T.tintPurple,
  },
  {
    id: 'used',
    value: '۱۲',
    label: 'آزمون استفاده‌شده',
    sub: 'توسط سازمان',
    icon: 'lucide:clipboard-check',
    fg: T.infoStrong,
    bg: T.tintBlue,
  },
  {
    id: 'runs',
    value: '۱,۲۸۴',
    label: 'اجرای آزمون',
    sub: 'در ۳۰ روز گذشته',
    icon: 'lucide:users-round',
    fg: T.accent,
    bg: T.tintOrange,
  },
  {
    id: 'rate',
    value: '۸۶%',
    label: 'میانگین نرخ تکمیل',
    sub: '+۱۳% نسبت به دوره قبل',
    icon: 'lucide:circle-check',
    fg: T.successStrong,
    bg: T.tintGreen,
    up: true,
  },
];

export const testCategories = [
  'همه',
  'شخصیت',
  'شایستگی',
  'رهبری',
  'هوش هیجانی',
  'استعداد',
  'تیم',
  'نگرش و انگیزش',
];

export const testPills = ['همه', 'ویژه', 'رایگان'];

export const testFilters = [
  { id: 'output', label: 'نوع خروجی' },
  { id: 'audience', label: 'گروه مخاطب' },
  { id: 'duration', label: 'مدت زمان' },
];

export interface TestCard {
  id: string;
  title: string;
  cat: string;
  catFg: string;
  catBg: string;
  desc: string;
  questions: string;
  time: string;
  report: string;
  /** Absent on tests this organisation has not run yet. */
  usage?: { assessments: string; runs: string };
  badge: { label: string; fg: string; bg: string };
  art: string;
  iconFg: string;
  iconBg: string;
}

const used = { label: 'استفاده‌شده', fg: T.successStrong, bg: T.tintGreen };
const fresh = { label: 'جدید', fg: T.accent, bg: T.tintOrange };

export const testCards: TestCard[] = [
  {
    id: 'mbti',
    title: 'MBTI',
    cat: 'شخصیت',
    catFg: T.primary,
    catBg: T.tintPurple,
    desc: 'شناخت ترجیحات شخصیتی و سبک تعامل',
    questions: '۶۰ سوال',
    time: '۱۵ دقیقه',
    report: 'گزارش تحلیلی',
    usage: { assessments: '۵ ارزیابی', runs: '۱۸۲ اجرا' },
    badge: used,
    art: `${ART}/test-mbti.png`,
    iconFg: T.primary,
    iconBg: T.tintPurple,
  },
  {
    id: 'eq',
    title: 'هوش هیجانی EQ',
    cat: 'هوش هیجانی',
    catFg: T.danger,
    catBg: T.tintRed,
    desc: 'سنجش و توسعه هوش هیجانی در کار و زندگی',
    questions: '۹۰ سوال',
    time: '۲۰ دقیقه',
    report: 'گزارش تحلیلی',
    usage: { assessments: '۳ ارزیابی', runs: '۱۲۴ اجرا' },
    badge: used,
    art: `${ART}/test-eq.png`,
    iconFg: T.danger,
    iconBg: T.tintRed,
  },
  {
    id: 'competency',
    title: 'شایستگی مدیریتی',
    cat: 'شایستگی',
    catFg: T.infoStrong,
    catBg: T.tintBlue,
    desc: 'ارزیابی شایستگی‌های کلیدی مدیریتی',
    questions: '۷۵ سوال',
    time: '۳۰ دقیقه',
    report: 'گزارش تفصیلی',
    usage: { assessments: '۲ ارزیابی', runs: '۹۸ اجرا' },
    badge: used,
    art: `${ART}/quest-competency.png`,
    iconFg: T.infoStrong,
    iconBg: T.tintBlue,
  },
  {
    id: 'leadership',
    title: 'سبک رهبری',
    cat: 'رهبری',
    catFg: T.accent,
    catBg: T.tintOrange,
    desc: 'شناخت سبک رهبری و اثربخشی در تیم',
    questions: '۷۲ سوال',
    time: '۱۸ دقیقه',
    report: 'گزارش تحلیلی',
    badge: fresh,
    art: `${ART}/test-leadership.png`,
    iconFg: T.accent,
    iconBg: T.tintOrange,
  },
  {
    id: 'problem',
    title: 'حل مسئله',
    cat: 'شایستگی',
    catFg: T.infoStrong,
    catBg: T.tintBlue,
    desc: 'سنجش توانایی تحلیل و حل مسئله',
    questions: '۴۵ سوال',
    time: '۱۵ دقیقه',
    report: 'گزارش تفصیلی',
    usage: { assessments: '۴ ارزیابی', runs: '۶۷ اجرا' },
    badge: used,
    art: `${ART}/test-cognitive.png`,
    iconFg: T.warning,
    iconBg: T.tintOrange,
  },
  {
    id: 'motivation',
    title: 'انگیزش و نگرش شغلی',
    cat: 'نگرش و انگیزش',
    catFg: T.successStrong,
    catBg: T.tintGreen,
    desc: 'بررسی عوامل انگیزش و نگرش به کار',
    questions: '۵۰ سوال',
    time: '۱۵ دقیقه',
    report: 'گزارش تحلیلی',
    badge: fresh,
    art: `${ART}/test-motivation.png`,
    iconFg: T.successStrong,
    iconBg: T.tintGreen,
  },
];

export const testCardLabels = {
  usage: 'استفاده سازمان شما:',
  detail: 'مشاهده جزئیات',
  add: 'افزودن به ارزیابی',
};

/* ── Bottom panels ───────────────────────────────────────────── */

export const testsUsage = {
  title: 'خلاصه استفاده از آزمون‌ها',
  slices: [
    { label: 'شخصیت', value: 33, colour: T.primary, pct: '۳۳%' },
    { label: 'شایستگی', value: 24, colour: T.info, pct: '۲۴%' },
    { label: 'رهبری', value: 18, colour: T.warning, pct: '۱۸%' },
    { label: 'هوش هیجانی', value: 16, colour: T.danger, pct: '۱۶%' },
    { label: 'سایر', value: 7, colour: T.violet, pct: '۷%' },
  ],
  rows: [
    { k: 'نرخ استفاده در ۳۰ روز گذشته', v: '۸۶%', bar: 86 },
    { k: 'تعداد', v: '۱,۲۸۴' },
    { k: 'نرخ تکمیل', v: '۸۶%' },
    { k: 'میانگین زمان', v: '۲۲ دقیقه' },
  ],
};

export const testsTop = {
  title: 'پرکاربردترین آزمون‌های سازمان',
  rows: [
    { rank: '۱', label: 'MBTI', runs: '۱۸۲ اجرا', value: 100, colour: T.primary },
    { rank: '۲', label: 'هوش هیجانی EQ', runs: '۱۲۴ اجرا', value: 68, colour: T.violet },
    { rank: '۳', label: 'شایستگی مدیریتی', runs: '۹۸ اجرا', value: 54, colour: T.info },
    { rank: '۴', label: 'سبک رهبری', runs: '۸۵ اجرا', value: 47, colour: T.warning },
    { rank: '۵', label: 'حل مسئله', runs: '۶۷ اجرا', value: 37, colour: T.accent },
  ],
};

export const testsPackages = {
  title: 'پکیج‌های پیشنهادی',
  seeAll: 'مشاهده همه',
  rows: [
    { id: 'managers', label: 'ارزیابی مدیران', sub: '۴ آزمون', fg: T.primary, bg: T.tintPurple },
    { id: 'talent', label: 'استعدادهای مدیریتی', sub: '۳ آزمون', fg: T.successStrong, bg: T.tintGreen },
    { id: 'sales', label: 'تیم فروش', sub: '۴ آزمون', fg: T.accent, bg: T.tintOrange },
  ],
  cta: 'مشاهده همه پکیج‌ها',
};

export const testsAi = {
  title: 'پیشنهاد هوشمند آریاز',
  desc: 'هدف خود را بنویسید تا آریاز بهترین آزمون‌ها را پیشنهاد دهد.',
  sample: 'می‌خواهم آمادگی سرپرستان فروش برای ارتقا به مدیر را بررسی کنم.',
  cta: 'دریافت پیشنهاد',
};

export const testsFooter = {
  showing: 'نمایش ۱ تا ۱۲ از ۳۶ آزمون',
  perPage: '۱۲ در صفحه',
  pages: ['۱', '۲', '۳'],
};

/* ── Screen 13 — the detail drawer ───────────────────────────── */

export const testDetail = {
  id: 'eq',
  title: 'آزمون هوش هیجانی EQ',
  cat: 'هوش هیجانی',
  desc: 'سنجش و توسعه هوش هیجانی در کار و زندگی',
  keyTitle: 'اطلاعات کلیدی',
  key: [
    { icon: 'lucide:list', k: 'تعداد سوال', v: '۹۰' },
    { icon: 'lucide:clock', k: 'زمان اجرا', v: '۲۰ دقیقه' },
    { icon: 'lucide:users-round', k: 'جامعه هدف', v: 'عمومی / مدیران' },
    { icon: 'lucide:link', k: 'زبان', v: 'فارسی' },
    { icon: 'lucide:graduation-cap', k: 'سطح علمی', v: 'استاندارد و معتبر' },
    { icon: 'lucide:file-text', k: 'نوع گزارش', v: 'تحلیلی و تفصیلی' },
  ],
  measuresTitle: 'چه چیزی اندازه‌گیری می‌کند؟',
  measures: [
    { label: 'خودآگاهی', fg: T.primary, bg: T.tintPurple },
    { label: 'خودتنظیمی', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'همدلی', fg: T.successStrong, bg: T.tintGreen },
    { label: 'مهارت اجتماعی', fg: T.accent, bg: T.tintOrange },
    { label: 'انگیزش', fg: T.danger, bg: T.tintRed },
  ],
  useTitle: 'کاربرد سازمانی',
  uses: [
    { icon: 'lucide:user-round-cog', label: 'توسعه مدیران' },
    { icon: 'lucide:trending-up', label: 'انتخاب و ارتقا' },
    { icon: 'lucide:users', label: 'تحلیل تیم و گروه‌ها' },
    { icon: 'lucide:route', label: 'برنامه توسعه فردی' },
  ],
  sampleTitle: 'نمونه خروجی',
  add: 'افزودن به ارزیابی',
};
