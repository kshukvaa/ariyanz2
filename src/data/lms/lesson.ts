import { L } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   Single lesson — centre-column content.
   Source: «course_single_lesson.png»

   UNCERTAIN — the mockup shows two lesson counters at the top of
   the card («درس ۲ از ۳» beside a chip reading «درس ۱۶ از ۳…»),
   and the second is clipped in the source. Both are kept as read;
   the chip's denominator is the part that could not be resolved.
────────────────────────────────────────────────────────────── */

export const lesson = {
  chip: 'درس ۱۶ از ۳۰', // UNCERTAIN: denominator clipped in the mockup
  eyebrow: 'درس ۲ از ۳',
  title: 'طراحی شاخص‌های کلیدی عملکرد (KPI)',
  duration: 'مدت زمان ویدیو: ۳۶ دقیقه',
  playhead: '۱۲:۴۵ / ۲۵:۳۰',

  slideBullets: [
    { label: 'زمانی تدوین‌شده (زمان‌بندی‌شده)', icon: 'lucide:calendar' },
    { label: 'قابل حسابرسی سنجیدنی', icon: 'lucide:clipboard-check' },
    { label: 'مرتبط با هدف', icon: 'lucide:target' },
    { label: 'قابل اندازه‌گیری کمّی', icon: 'lucide:chart-column' },
  ],

  goal: {
    title: 'هدف این درس',
    body: 'در این درس یاد می‌گیرید که چگونه شاخص‌های کلیدی عملکرد (KPI) را طراحی کنید، آن‌ها را با اهداف سازمان مرتبط کنید و مطمئن شوید که قابل اندازه‌گیری، مرتبط و قابل اتکا باشند.',
  },

  outline: {
    title: 'سرفصل‌های این درس',
    items: [
      'تعریف KPI و ویژگی‌های آن',
      'اصول طراحی KPI مؤثر',
      'مقایسه کاربردی KPI',
      'اشتباهات رایج در طراحی KPI',
    ],
  },

  keyPoints: {
    title: 'نکات کلیدی',
    items: [
      'KPI باید قابل اندازه‌گیری باشد',
      'KPI باید با استراتژی سازمان مرتبط باشد',
      'KPI باید دستیابی و واقع‌بینانه باشد',
      'KPI باید زمان‌بندی مشخصی داشته باشد',
    ],
  },

  resources: {
    title: 'منابع این درس',
    files: [
      {
        label: 'اسلایدهای ارائه',
        sub: 'پاورپوینت توضیحات',
        size: 'حجم: ۵.۴ MB',
        icon: 'lucide:file-text',
        fg: L.red,
      },
      {
        label: 'نمونه فایل KPI',
        sub: 'فایل Excel نمونه',
        size: 'حجم: ۲.۱ MB',
        icon: 'lucide:file-spreadsheet',
        fg: L.green,
      },
      {
        label: 'فایل PDF درس',
        sub: 'KPI-درس.pdf',
        size: 'حجم: ۵.۲ MB',
        icon: 'lucide:file-down',
        fg: L.red,
      },
    ],
  },

  nav: {
    prev: { label: 'درس قبلی', href: '/courses/performance-management/lesson' },
    complete: 'علامت‌گذاری به عنوان تکمیل شده',
    next: { label: 'درس بعدی', href: '/courses/performance-management/lesson' },
  },

  talk: {
    title: 'تعامل و گفتگو',
    tabs: [
      { id: 'qa', label: 'پرسش و پاسخ درسی' },
      { id: 'peers', label: 'گفتگو با دانشجویان' },
      { id: 'teacher', label: 'ارتباط با مدرس' },
    ],
    placeholder: 'سوال خود را درباره این درس بنویسید...',
    send: 'ارسال',
  },

  questions: {
    title: 'آخرین سوالات',
    cta: 'مشاهده همه سوالات',
    items: [
      { q: 'فرق KPI و معیارسنجی چیست؟', by: '۳ ساعت پیش' },
      { q: 'چگونه KPI مناسب برای واحد فروش طراحی کنیم؟', by: '۵ ساعت پیش' },
      { q: 'آیا می‌توان برای هر هدف فرعی هم KPI تعریف کرد؟', by: 'دیروز' },
    ],
  },

  quick: {
    title: 'دسترسی سریع',
    items: [
      { label: 'یادداشت‌های من', icon: 'lucide:notebook-pen', fg: L.blue },
      { label: 'اختبارات و گواهینامه', icon: 'lucide:award', fg: L.violet },
      { label: 'پشتیبانی دوره', icon: 'lucide:headphones', fg: L.green },
    ],
  },
};
