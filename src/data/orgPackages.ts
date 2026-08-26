import { T, icon3x } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Assessment packages — /org/assessments/packages

   Screens 9 and 10: the picker, and the detail view behind its
   «مشاهده جزئیات» link.

   Asset note — the mockups draw each package with a bespoke 3D
   illustration (an office chair, a gem, a shopping trolley). The
   shipped library contains none of them, so each package borrows
   the eval-groups glyph closest to its subject. Swap `art` here
   if those illustrations turn up later; nothing else depends on
   the choice.
────────────────────────────────────────────────────────────── */

export const packagesHead = {
  title: 'پکیج‌های ارزیابی',
  desc: 'از پکیج‌های آماده آریاز استفاده کنید یا پکیج اختصاصی خود را بسازید.',
  tabs: [
    { id: 'ready', label: 'پکیج‌های آماده آریاز' },
    { id: 'mine', label: 'پکیج‌های من' },
  ],
  search: 'جستجو در پکیج‌ها...',
  filter: 'همه دسته‌بندی‌ها',
  build: {
    title: 'ساخت پکیج اختصاصی',
    desc: 'پکیج اختصاصی خود را با انتخاب آزمون‌های دلخواه بسازید.',
  },
  countLabel: 'تعداد آزمون‌ها',
  use: 'استفاده از پکیج',
  detail: 'مشاهده جزئیات',
};

export interface PackageItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  tests: string;
  art: string;
  artBg: string;
  artFg: string;
  /** The three cards carry three different button fills in the mockup. */
  cta: string;
}

export const packages: PackageItem[] = [
  {
    id: 'managers',
    title: 'ارزیابی مدیران',
    desc: 'پکیج جامع ارزیابی شایستگی‌های مدیریتی، سبک رهبری و هوش هیجانی',
    tags: ['شایستگی مدیریتی', 'سبک رهبری', 'هوش هیجانی', 'MBTI'],
    tests: '۴ آزمون',
    art: icon3x('eval-groups', 'group-branch-managers'),
    artBg: T.tintPurple,
    artFg: T.primary,
    cta: T.primaryStrong,
  },
  {
    id: 'talent',
    title: 'استعدادهای مدیریتی',
    desc: 'شناسایی و ارزیابی استعدادهای بالقوه برای نقش‌های مدیریتی',
    tags: ['استعداد مدیریتی', 'حل مسئله', 'تفکر تحلیلی'],
    tests: '۳ آزمون',
    art: icon3x('eval-groups', 'group-management-talent'),
    artBg: T.tintGreen,
    artFg: T.successStrong,
    cta: T.successStrong,
  },
  {
    id: 'sales',
    title: 'ارزیابی تیم فروش',
    desc: 'ارزیابی مهارت‌ها و ویژگی‌های کلیدی تیم‌های فروش و بازاریابی',
    tags: ['تیپ‌شناسی فروش', 'مهارت‌های ارتباطی', 'مذاکره', 'هوش هیجانی'],
    tests: '۴ آزمون',
    art: icon3x('eval-groups', 'group-sales-supervisor'),
    artBg: T.tintBlue,
    artFg: T.infoStrong,
    cta: T.infoStrong,
  },
];

/* ── Screen 10 — جزئیات پکیج ──────────────────────────────── */

export const packageDetail = {
  title: 'جزئیات پکیج',
  desc: 'مشاهده اطلاعات کامل این پکیج ارزیابی آماده',
  badge: 'پکیج آماده آریاز',
  testsLabel: 'آزمون‌های این پکیج',
  aboutTitle: 'درباره این پکیج',
  about:
    'این پکیج به شما کمک می‌کند تا ابعاد کلیدی شایستگی‌های مدیریتی، سبک رهبری و هوش هیجانی مدیران را به صورت علمی و استاندارد ارزیابی کنید و نقاط قوت و فرصت‌های توسعه آن‌ها را شناسایی نمایید.',
  listTitle: 'آزمون‌های موجود در پکیج',
  spec: [
    { icon: 'lucide:clipboard-check', k: 'تعداد آزمون‌ها', v: '۴ آزمون' },
    { icon: 'lucide:users-round', k: 'مناسب برای', v: 'مدیران و سرپرستان' },
    { icon: 'lucide:clock', k: 'مدت زمان تقریبی', v: '۹۰ تا ۱۲۰ دقیقه' },
    { icon: 'lucide:activity', k: 'سطح دشواری', v: 'متوسط' },
    { icon: 'lucide:history', k: 'آخرین بروزرسانی', v: '۱۴۰۳/۰۲/۲۰' },
    { icon: 'lucide:layers', k: 'تعداد استفاده', v: '۲۳۶ بار' },
  ],
  note: 'این پکیج توسط تیم متخصص آریاز طراحی شده و بر اساس مدل شایستگی‌های مدیریتی به‌روز است.',
  tests: [
    {
      id: 'mbti',
      title: 'پرسشنامه شخصیت شناسی MBTI',
      desc: 'شناخت تیپ شخصیتی و ترجیحات رفتاری',
      questions: '۹۳ سوال',
      time: '۲۰ دقیقه',
      icon: '/images/aryaz/test-icons-3d/test-mbti.png',
    },
    {
      id: 'eq',
      title: 'پرسشنامه هوش هیجانی بار-آن',
      desc: 'ارزیابی ابعاد مختلف هوش هیجانی فرد',
      questions: '۶۰ سوال',
      time: '۲۵ دقیقه',
      icon: '/images/aryaz/test-icons-3d/test-eq.png',
    },
    {
      id: 'leadership',
      title: 'پرسشنامه سبک رهبری',
      desc: 'بررسی سبک‌های رهبری و نحوه تاثیرگذاری',
      questions: '۲۸ سوال',
      time: '۲۰ دقیقه',
      icon: '/images/aryaz/test-icons-3d/test-leadership.png',
    },
    {
      id: 'competency',
      title: 'ارزیابی شایستگی‌های مدیریتی',
      desc: 'سنجش شایستگی‌های کلیدی مدیریتی بر اساس مدل آریاز',
      questions: '۷۵ سوال',
      time: '۳۰ دقیقه',
      icon: '/images/aryaz/test-icons-3d/quest-competency.png',
    },
  ],
  actions: {
    download: 'دانلود معرفی پکیج',
    edit: 'ویرایش پکیج',
    close: 'بستن',
    use: 'استفاده از این پکیج',
  },
  meta: { questions: 'تعداد سوالات', time: 'مدت زمان' },
};
