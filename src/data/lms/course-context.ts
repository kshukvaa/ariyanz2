import { L } from '@/data/lmsTokens';
import type { CourseBand, Chapter, LearnAside } from '@/components/lms/LearnShell';

/* ──────────────────────────────────────────────────────────────
   Shared classroom context.
   Source: «course_single_lesson.png» (the frame is identical
   across lesson, homework, exam, results, forum, project and
   certificate, so it is transcribed once here).

   Curriculum arithmetic reconciles: 4 + 3 + 3 + 2 = 12 sessions
   listed, of which 7 are complete and one is current — which is
   what the aside reports as «۸ از ۱۰ جلسه» once the current
   session counts as started. The band's ۸۰٪ is the mockup's own
   figure and is kept as drawn.
────────────────────────────────────────────────────────────── */

export const courseBand: CourseBand = {
  title: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان',
  instructor: 'دکتر علی محمودی',
  avatar: '/images/aryaz/avatars/staff-ali-ahmadi.png',
  meta: [
    { label: 'سطح آموزشی: پیشرفته', icon: 'lucide:gauge' },
    { label: 'محتوای ویدئویی', icon: 'lucide:video' },
  ],
  progressLabel: 'پیشرفت دوره',
  progressPct: 80,
  progressNote: '۸ از ۱۰ جلسه تکمیل شده',
  back: { label: 'بازگشت به داشبورد', href: '/courses' },
};

export const courseCurriculum: { title: string; chapters: Chapter[]; download: string } = {
  title: 'فهرست دوره',
  download: 'دانلود سرفصل‌ها',
  chapters: [
    {
      id: 'ch1',
      label: 'فصل ۱: مبانی ارزیابی عملکرد',
      count: '۴ جلسه',
      lessons: [
        { n: '۱-۱', title: 'مقدمه ارزیابی عملکرد', meta: 'ویدیو ۳۰ دقیقه', state: 'done' },
        { n: '۱-۲', title: 'مدل‌های ارزیابی عملکرد', meta: 'ویدیو ۳۰ دقیقه', state: 'done' },
        { n: '۱-۳', title: 'فرآیند ارزیابی عملکرد', meta: 'ویدیو ۳۰ دقیقه', state: 'done' },
      ],
    },
    {
      id: 'ch2',
      label: 'فصل ۲: طراحی شاخص‌ها',
      count: '۳ جلسه',
      lessons: [
        { n: '۲-۱', title: 'مفهوم و تعریف KPI', meta: 'ویدیو ۳۵ دقیقه', state: 'done' },
        { n: '۲-۲', title: 'انواع KPI', meta: 'ویدیو ۳۵ دقیقه', state: 'done' },
        { n: '۲-۳', title: 'اصول طراحی KPI', meta: 'ویدیو ۳۰ دقیقه', state: 'done' },
        { n: '۲-۴', title: 'طراحی شاخص‌های عملکردی', meta: 'ویدیو ۳۰ دقیقه', state: 'current' },
      ],
    },
    {
      id: 'ch3',
      label: 'فصل ۳: اجرای سیستم ارزیابی',
      count: '۳ جلسه',
      lessons: [
        { n: '۳-۱', title: 'پیاده‌سازی سیستم', meta: 'ویدیو ۳۰ دقیقه', state: 'locked' },
        { n: '۳-۲', title: 'بازخورد و بهبود عملکرد', meta: 'ویدیو ۳۰ دقیقه', state: 'locked' },
        { n: '۳-۳', title: 'تحلیل نتایج ارزیابی', meta: 'ویدیو ۳۰ دقیقه', state: 'locked' },
      ],
    },
    {
      id: 'ch4',
      label: 'فصل ۴: کارگاه عملی',
      count: '۲ جلسه',
      lessons: [
        { n: '۴-۱', title: 'کارگاه طراحی مدل ارزیابی', meta: 'تمرین ۶۰ دقیقه', state: 'locked' },
        { n: '۴-۲', title: 'پروژه پایانی دوره', meta: 'پروژه ۱۲۰ دقیقه', state: 'locked' },
      ],
    },
  ],
};

export const courseAside: LearnAside = {
  status: {
    title: 'وضعیت یادگیری',
    pct: 80,
    caption: 'از ۱۰ جلسه تکمیل شده',
    rows: [
      { label: 'جلسات تکمیل شده', value: '۸ جلسه', icon: 'lucide:circle-check', fg: L.green },
      { label: 'جلسات باقی‌مانده', value: '۳ جلسه', icon: 'lucide:clipboard-list', fg: L.blue },
      { label: 'زمان باقی‌مانده', value: '۷ ساعت و ۳۰ دقیقه', icon: 'lucide:clock', fg: L.orange },
      { label: 'تاریخ عضویت', value: '۱۰ خرداد ۱۴۰۳', icon: 'lucide:calendar', fg: L.violet },
    ],
  },
  suggestions: {
    title: 'پیشنهادهای هوشمند برای شما',
    items: [
      {
        label: 'ایجنت طراحی KPI',
        desc: 'طراحی هوشمند شاخص‌های عملکرد',
        icon: 'lucide:bot',
        fg: L.violet,
        cta: 'استفاده',
      },
      {
        label: 'فایل داشبورد عملکرد',
        desc: 'داشبورد آماده ارزیابی عملکرد',
        icon: 'lucide:file-spreadsheet',
        fg: L.green,
        cta: 'مشاهده',
      },
      {
        label: 'HR Analytics',
        desc: 'تحلیل داده‌های منابع انسانی',
        icon: 'lucide:book-open',
        fg: L.violet,
        cta: 'مشاهده',
      },
    ],
  },
  agent: {
    title: 'ایجنت آریاز',
    desc: 'سوالی داری؟ خلاصه‌ای لازم داری یا جایی از درس رو متوجه نشدی؟ من اینجام تا کمکت کنم.',
    chips: ['جایی رو نفهمیدم', 'سوال درباره مفاهیم', 'جلسه‌ی این درس'],
    placeholder: 'پیام بنویسید...',
  },
};

/* Tabs across the top of the centre column, shared by the lesson
   family. Each maps to one of the classroom routes. */
export const lessonTabs = [
  { id: 'about', label: 'درباره درس', href: '/courses/performance-management/lesson' },
  { id: 'resources', label: 'منابع', href: '/courses/performance-management/lesson#resources' },
  { id: 'practice', label: 'تمرین', href: '/courses/performance-management/homework' },
  { id: 'exam', label: 'آزمون', href: '/courses/performance-management/exam' },
  { id: 'notes', label: 'یادداشت‌های من', href: '/courses/performance-management/lesson#notes' },
];
