import { L } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   گواهینامه دوره — the certificate, seen from inside the classroom
   Source: «Course_Certificate.png»

   Not the same page as /verify/[code]. That one is the public
   check — a stranger pasting a code to see whether it is real.
   This one is the learner's own copy: the artwork, the download,
   the share links, and what to learn next. They share the
   certificate artwork and nothing else.

   THE TWO MOCKUPS USE DIFFERENT CERTIFICATES. This screen issues
   ARY-1405-45872 to مهدی احمدی; «view certificate verificated.png»
   verifies ARY-HRBP-85214 for دکتر امیر حسینی. Rather than pick a
   winner, verify-result.ts now holds both records keyed by code —
   so the «بررسی اعتبار گواهینامه» button below actually resolves
   instead of landing on a not-found page.
────────────────────────────────────────────────────────────── */

export const CERT_CODE = 'ARY-1405-45872';

export const certCrumbs = {
  back: { label: 'بازگشت به دوره', href: '/courses/performance-management' },
  items: [
    { label: 'داشبورد', href: '/courses' },
    { label: 'دوره‌های من', href: '/courses' },
    { label: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', href: '/courses/performance-management' },
    { label: 'گواهینامه' },
  ],
};

export const certHero = {
  emoji: '🎉',
  title: 'تبریک! شما با موفقیت این دوره را تکمیل کردید.',
  course: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان',
  meta: [
    { label: 'نام شرکت‌کننده', value: 'مهدی احمدی', icon: 'lucide:user-round', fg: L.blue },
    { label: 'مدرس دوره', value: 'دکتر علی محمودی', icon: 'lucide:award', fg: '#cfa855' },
    { label: 'تاریخ تکمیل', value: '۳۰ مرداد ۱۴۰۵', icon: 'lucide:calendar', fg: L.violet },
    { label: 'امتیاز نهایی', value: '۹۴٪', icon: 'lucide:award', fg: L.red },
  ],
};

export const certArtwork = {
  brandLatin: 'Ariyaz',
  brandTag: 'سامانه جامع آموزش و توانمندسازی سرمایه انسانی',
  title: 'گواهینامه پایان دوره',
  lead: 'بدین وسیله گواهی می‌شود',
  holder: 'مهدی احمدی',
  mid: 'با موفقیت دوره',
  course: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان',
  tail: [
    'را به مدت ۲۰ ساعت آموزش حرفه‌ای به پایان رسانده و',
    'تمامی ارزیابی‌های مرتبط با این دوره را با موفقیت گذرانده است',
  ],
  signer: 'دکتر علی محمودی',
  signerRole: 'مدرس دوره',
  issuedLabel: 'تاریخ صدور',
  issued: '۱۴۰۵/۰۵/۳۰',
  codeLabel: 'کد اعتبارسنجی',
  code: CERT_CODE,
};

export const certValidate = {
  title: 'اعتبارسنجی گواهینامه',
  icon: 'lucide:shield-check',
  codeLabel: 'کد اعتبارسنجی',
  code: CERT_CODE,
  hint: 'برای بررسی اصالت گواهینامه، کد بالا را در سامانه اعتبارسنجی آریاز وارد کنید',
  cta: { label: 'بررسی اعتبار گواهینامه', icon: 'lucide:search', href: `/verify/${CERT_CODE}` },
};

export const certActions = {
  download: { label: 'دانلود PDF گواهینامه', icon: 'lucide:download' },
  share: [
    { label: 'اشتراک در لینکدین', icon: 'mdi:linkedin', fg: '#0a66c2' },
    { label: 'اشتراک بر اساس لینک', icon: 'lucide:link-2', fg: L.violet },
  ],
  note: {
    title: 'گواهینامه معتبر و قابل استناد',
    desc: 'این گواهینامه دارای کد یکتای اعتبارسنجی بوده و قابلیت استعلام آنلاین دارد.',
    icon: 'lucide:shield-check',
  },
};

export const certAchievements = {
  title: 'دستاوردهای شما در این دوره',
  icon: 'lucide:award',
  items: [
    'طراحی شاخص‌های کلیدی عملکرد (KPI)',
    'تحلیل و اندازه‌گیری عملکرد',
    'طراحی سیستم ارزیابی عملکرد',
    'اجرای فرآیند مدیریت عملکرد',
    'ارائه بازخورد اثربخش',
  ],
};

export const certPath = {
  title: 'مسیر رشد پیشنهادی شما',
  icon: 'lucide:chart-column-big',
  /* Right-to-left in the source: the career goal is the rightmost
     node and the next course the leftmost. */
  steps: [
    { badge: 'هدف حرفه‌ای', label: 'مشاور ارشد منابع انسانی', icon: 'lucide:user-round', fg: '#f0a92b', bg: '#fdf3e2' },
    { badge: 'دوره مکمل', label: 'HR Analytics', icon: 'lucide:chart-column-big', fg: L.orange, bg: L.orangeSoft },
    { badge: 'ایجنت پیشنهادی', label: 'ایجنت تحلیل KPI', icon: 'lucide:bot', fg: L.blue, bg: L.blueSoft },
    { badge: 'ابزار پیشنهادی', label: 'داشبورد عملکرد منابع انسانی', icon: 'lucide:clipboard-list', fg: L.green, bg: L.greenSoft },
    { badge: 'دوره پیشنهادی بعدی', label: 'مدیریت عملکرد پیشرفته', icon: 'lucide:graduation-cap', fg: L.violet, bg: L.violetSoft },
  ],
};

export const certQuick = {
  title: 'دسترسی سریع',
  items: [
    {
      title: 'فرم‌ها و دستورالعمل‌ها',
      desc: 'فرم‌ها، چک‌لیست‌ها و دستورالعمل‌های مرتبط با این دوره',
      icon: 'lucide:clipboard-list',
      fg: '#e5507a',
      bg: '#fdecf1',
    },
    {
      title: 'ابزارهای مرتبط',
      desc: 'ابزارها و داشبوردهای تخصصی ارزیابی عملکرد',
      icon: 'lucide:calculator',
      fg: L.blue,
      bg: L.blueSoft,
    },
    {
      title: 'آزمون‌های مرتبط',
      desc: 'آزمون‌ها و ارزیابی‌های مکمل این حوزه',
      icon: 'lucide:pencil-line',
      fg: L.orange,
      bg: L.orangeSoft,
    },
    {
      title: 'دوره‌های مرتبط',
      desc: 'دوره‌های پیشرفته و تکمیلی این مسیر',
      icon: 'lucide:book-open',
      fg: L.green,
      bg: L.greenSoft,
    },
    {
      title: 'ایجنت‌های مرتبط',
      desc: 'استفاده از ایجنت‌ها برای طراحی و تحلیل شاخص‌ها',
      icon: 'lucide:bot',
      fg: L.violet,
      bg: L.violetSoft,
    },
  ],
};
