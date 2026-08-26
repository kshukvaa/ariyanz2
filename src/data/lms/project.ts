import { L } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   پروژه پایانی — culminating project
   Source: «course_Culminating Project.png»

   Structurally the homework screen's bigger sibling: same
   two-column shape, same submit-then-feedback rhythm, but the
   deliverable is a whole model rather than an exercise, so the
   brief carries six expected outputs and the rail carries a
   countdown rather than a simple status.

   Drawn mid-flight: the status is «در حال انجام» and the
   instructor review is «در انتظار بررسی», yet a graded feedback
   card with four stars is already visible below. Both are kept,
   as in the homework screen.
────────────────────────────────────────────────────────────── */

export const projectCrumbs = {
  back: { label: 'بازگشت به دوره', href: '/courses/performance-management' },
  items: [
    { label: 'داشبورد', href: '/courses' },
    { label: 'دوره‌های من', href: '/courses' },
    { label: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', href: '/courses/performance-management' },
    { label: 'پروژه پایانی' },
  ],
};

export const projectHead = {
  title: 'پروژه پایانی دوره',
  art: '/images/aryaz/illustrations/learning-path-illus.png',
  meta: [
    { label: 'وضعیت', value: 'در حال انجام', icon: 'lucide:clock', chip: true },
    { label: 'امتیاز پروژه', value: '۵۰ امتیاز', icon: 'lucide:star' },
    { label: 'زمان پیشنهادی', value: '۲ هفته', icon: 'lucide:calendar' },
    { label: 'دوره', value: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان', icon: 'lucide:book-open' },
  ],
};

export const projectOutputs = {
  title: 'خروجی‌های مورد انتظار',
  icon: 'lucide:clipboard-list',
  items: [
    'معرفی سازمان و مسئله کسب‌وکار',
    'انتخاب مشاغل هدف',
    'طراحی شاخص‌های کلیدی عملکرد (KPI)',
    'تعیین روش اندازه‌گیری و هدف‌گذاری',
    'طراحی فرم ارزیابی عملکرد',
    'ارائه پیشنهاد اجرایی و نقشه پیاده‌سازی',
  ],
};

export const projectAbout = {
  title: 'درباره پروژه',
  icon: 'lucide:circle-alert',
  body: 'در این پروژه شما باید یک مدل کامل ارزیابی عملکرد برای یک سازمان طراحی کنید: از تحلیل شغل، تا طراحی شاخص‌ها (KPI) و روش ارزیابی و ارائه پیشنهاد اجرایی.',
};

export const projectFiles = {
  title: 'فایل‌ها و منابع راهنما',
  all: 'مشاهده همه',
  items: [
    {
      title: 'چک‌لیست ارزیابی پروژه',
      meta: 'PDF • ۶۴۰ KB',
      icon: 'lucide:clipboard-list',
      fg: L.orange,
      bg: L.orangeSoft,
    },
    {
      title: 'راهنمای انجام پروژه',
      meta: 'Word • ۱.۱ MB',
      icon: 'lucide:file-type',
      fg: L.blue,
      bg: L.blueSoft,
    },
    {
      title: 'نمونه پروژه تأیید شده',
      meta: 'PDF • ۳.۴ MB',
      icon: 'lucide:file-text',
      fg: L.red,
      bg: L.redSoft,
    },
    {
      title: 'قالب پروژه نهایی',
      meta: 'Excel • ۱.۴ MB',
      icon: 'lucide:file-spreadsheet',
      fg: '#1d7044',
      bg: L.greenSoft,
    },
  ],
  download: 'دانلود',
};

export const projectSubmit = {
  title: 'ارسال پروژه شما',
  noteLabel: 'توضیحات تکمیلی پروژه (اختیاری)',
  placeholder: 'توضیحات تکمیلی پروژه خود را بنویسید...',
  counter: '۰ / ۱۰۰۰',
  drop: {
    title: 'فایل خود را اینجا بکشید و رها کنید',
    hint: 'یا برای انتخاب فایل کلیک کنید',
    formats: 'فرمت‌های PDF، Word، Excel، PowerPoint',
    limit: 'حداکثر حجم ۲۰۰ مگابایت',
  },
  action: { label: 'ارسال پروژه برای بررسی', icon: 'lucide:send' },
};

export const projectStatus = {
  steps: [
    { label: 'بررسی توسط مدرس', sub: 'در انتظار بررسی', icon: 'lucide:search', state: 'active' as const },
    { label: 'دریافت بازخورد', sub: '-', icon: 'lucide:message-circle', state: 'todo' as const },
    { label: 'تأیید نهایی', sub: '-', icon: 'lucide:circle-check', state: 'todo' as const },
  ],
};

export const projectProgress = {
  title: 'پیشرفت شما',
  pct: 50,
  remainingLabel: 'زمان باقی‌مانده',
  remaining: '۲ روز و ۴ ساعت',
  cta: 'مشاهده جزئیات پروژه',
};

export const projectFeedback = {
  title: 'آخرین بازخورد مدرس',
  instructor: 'دکتر علی محمودی',
  role: 'مدرس دوره',
  avatar: '/images/aryaz/avatars/staff-mohammad-rezaei.png',
  date: 'تاریخ ۲۰ خرداد',
  scoreLabel: 'امتیاز پروژه',
  score: '۴۴/۵۰',
  stars: 4,
  label: 'بازخورد',
  body: 'مدل KPI ها بسیار خوب طراحی شده است و با اهداف سازمان همسو است. پیشنهاد می‌شود ارتباط شاخص‌ها با اهداف استراتژیک شفاف‌تر شود و نقشه پیاده‌سازی با جزئیات بیشتری ارائه گردد.',
  cta: { label: 'مشاهده فایل بازخورد کامل', icon: 'lucide:eye' },
};

export const projectSuggest = {
  title: 'پیشنهادهای هوشمند برای شما',
  items: [
    {
      title: 'فرم ارزیابی عملکرد',
      desc: 'فرم استاندارد ارزیابی کارکنان',
      cta: 'مشاهده فرم',
      icon: 'lucide:clipboard-list',
      fg: L.red,
      bg: L.redSoft,
    },
    {
      title: 'داشبورد عملکرد',
      desc: 'پایش شاخص‌ها در یک نگاه',
      cta: 'مشاهده ابزار',
      icon: 'lucide:chart-column-big',
      fg: L.orange,
      bg: L.orangeSoft,
    },
    {
      title: 'تست شایستگی',
      desc: 'سنجش شایستگی‌های مدیریتی',
      cta: 'شروع تست',
      icon: 'lucide:clipboard-check',
      fg: L.green,
      bg: L.greenSoft,
    },
    {
      title: 'دوره تکمیلی',
      desc: 'مدیریت عملکرد پیشرفته',
      cta: 'مشاهده دوره',
      icon: 'lucide:book-open',
      fg: L.blue,
      bg: L.blueSoft,
    },
    {
      title: 'ایجنت طراحی KPI',
      desc: 'طراحی شاخص با کمک ایجنت',
      cta: 'استفاده از ایجنت',
      icon: 'lucide:bot',
      fg: L.violet,
      bg: L.violetSoft,
    },
  ],
};
