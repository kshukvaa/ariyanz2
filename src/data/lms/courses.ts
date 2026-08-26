import { L } from '@/data/lmsTokens';
import type { Course, FilterGroup } from '@/components/lms/LmsParts';

/* ──────────────────────────────────────────────────────────────
   دوره‌های آریاز — course catalogue
   Source: «courses.png»

   Note on the two «رایگان» cards: their CTA reads «انتخاب مسیر»
   rather than «مشاهده دوره», because a free course routes into a
   learning path instead of a purchase. That is drawn in the
   mockup and kept here rather than normalised away.
────────────────────────────────────────────────────────────── */

export const coursesHero = {
  title: 'دوره‌های آریاز',
  desc: [
    'آموزش‌های تخصصی تا پیشرفته، عملی، پروژه عملی',
    'و گواهینامه معتبر، مناسب کارشناسان، سرپرست، مدیر',
    'و متخصصان منابع انسانی',
  ],
  features: [
    { label: 'گواهینامه معتبر', sub: 'قابل استعلام', icon: 'lucide:award' },
    { label: 'تمرین و پروژه عملی', sub: 'یادگیری کاربردی', icon: 'lucide:target' },
    { label: 'آزمون و ارزیابی', sub: 'سنجش پیشرفت', icon: 'lucide:clipboard-check' },
    { label: 'مدرسین متخصص', sub: 'از صنعت و دانشگاه', icon: 'lucide:user-round' },
  ],
};

export const coursesToolbar = {
  sort: 'جدیدترین دوره‌ها',
  search: 'جستجو در دوره‌ها..',
  pills: ['همه', 'رایگان', 'ویژه'],
  more: 'مشاهده بیشتر دوره‌ها',
};

const A = '/images/aryaz/avatars';
const TH = '/images/aryaz/thumbnails';

export const courses: Course[] = [
  {
    id: 'employee-relations',
    title: 'روابط کارکنان در عمل',
    instructor: 'دکتر الهام کریمی',
    avatar: `${A}/staff-sara-karimi.png`,
    image: `${TH}/video-09-org-culture.png`,
    level: 'متوسط',
    hours: '۲۸ ساعت',
    badge: 'enrolling',
    wasPrice: 6000000,
    price: 3900000,
    discount: '۳۰٪',
    cta: 'مشاهده دوره',
    href: '/courses/employee-relations',
  },
  {
    id: 'service-systems',
    title: 'طراحی سیستم‌های خدمات',
    instructor: 'مهندس رضا یوسفی',
    avatar: `${A}/staff-mohammad-rezaei.png`,
    image: `${TH}/video-05-smart-goals.png`,
    level: 'متوسط',
    hours: '۲۸ ساعت',
    badge: 'top',
    free: true,
    cta: 'انتخاب مسیر',
    href: '/courses/service-systems',
  },
  {
    id: 'performance-management',
    title: 'مدیریت عملکرد کارکنان',
    instructor: 'دکتر سارا مرادی',
    avatar: `${A}/staff-zahra-nouri.png`,
    image: `${TH}/kpi-article-01-design-guide.png`,
    level: 'متوسط',
    hours: '۱۲ ساعت',
    badge: 'added',
    price: 4900000,
    cta: 'مشاهده دوره',
    href: '/courses/performance-management',
  },
  {
    id: 'professional-hiring',
    title: 'جذب و استخدام حرفه‌ای',
    instructor: 'دکتر امیر احمدی',
    avatar: `${A}/staff-ali-ahmadi.png`,
    image: `${TH}/video-03-effective-hiring.png`,
    level: 'مقدماتی',
    hours: '۱۸ ساعت',
    badge: 'enrolling',
    wasPrice: 6000000,
    price: 2920000,
    discount: '۳۰٪',
    cta: 'مشاهده دوره',
    href: '/courses/professional-hiring',
  },
  {
    id: 'payroll-practical',
    title: 'حقوق و دستمزد کاربردی',
    instructor: 'دکتر فرهاد رضایی',
    avatar: `${A}/staff-hamed-mousavi.png`,
    image: `${TH}/doc-article-01-insurance-calc.png`,
    level: 'متوسط',
    hours: '۲۸ ساعت',
    badge: 'enrolling',
    wasPrice: 6000000,
    price: 3900000,
    discount: '۳۰٪',
    cta: 'مشاهده دوره',
    href: '/courses/payroll-practical',
  },
  {
    id: 'advanced-leadership',
    title: 'مهارت‌های رهبری پیشرفته',
    instructor: 'دکتر مسعود مرادی',
    avatar: `${A}/staff-mohammad-rezaei.png`,
    image: `${TH}/video-10-leadership-practice.png`,
    level: 'پیشرفته',
    hours: '۲۶ ساعت',
    badge: 'top',
    free: true,
    cta: 'انتخاب مسیر',
    href: '/courses/advanced-leadership',
  },
  {
    id: 'learning-development',
    title: 'آموزش و توسعه منابع انسانی',
    instructor: 'مهندس صریم موسوی',
    avatar: `${A}/staff-hamed-mousavi.png`,
    image: `${TH}/video-06-employee-empowerment.png`,
    level: 'متوسط',
    hours: '۲۸ ساعت',
    badge: 'enrolling',
    price: 7690000,
    cta: 'مشاهده دوره',
    href: '/courses/learning-development',
  },
  {
    id: 'hr-analytics',
    title: 'تحلیل داده‌های منابع انسانی',
    instructor: 'دکتر علی محمدی',
    avatar: `${A}/staff-ali-ahmadi.png`,
    image: `${TH}/article-07-data-decisions.png`,
    level: 'مناسب',
    hours: '۱۸ ساعت',
    badge: 'added',
    price: 4195000,
    cta: 'مشاهده دوره',
    href: '/courses/hr-analytics',
  },
];

export const coursesFilters: FilterGroup[] = [
  {
    id: 'topic',
    label: 'موضوع',
    items: [
      { label: 'رهبری و مدیریت', count: '۴۲', icon: 'lucide:users-round' },
      { label: 'منابع انسانی', count: '۳۱', icon: 'lucide:user-round' },
      { label: 'توسعه فردی', count: '۲۷', icon: 'lucide:sprout' },
    ],
  },
  {
    id: 'kind',
    label: 'نوع دوره',
    items: [
      { label: 'دوره عمومی', count: '۱۶۵', icon: 'lucide:monitor-play' },
      { label: 'دوره آنلاین (لایو)', icon: 'lucide:video' },
      { label: 'دوره ترکیبی (آنلاین + پروژه)', icon: 'lucide:users' },
      { label: 'دوره حضوری', count: '۱۸', icon: 'lucide:users-round' },
      { label: 'دوره فشرده (Bootcamp)', count: '۱۲', icon: 'lucide:zap' },
    ],
  },
  {
    id: 'level',
    label: 'سطح دوره',
    items: [
      { label: 'مبتدی', dot: L.green },
      { label: 'متوسط', count: '۷۸', dot: L.blue },
      { label: 'پیشرفته', count: '۵۵', dot: L.violet },
      { label: 'مدیران', count: '۴۰', dot: L.orange },
    ],
  },
  {
    id: 'special',
    label: 'ویژگی‌های ویژه',
    items: [
      { label: 'جدیدترین‌ها', icon: 'lucide:sparkles' },
      { label: 'برفروش‌ترین‌ها', icon: 'lucide:flame' },
      { label: 'در حال ثبت‌نام', icon: 'lucide:circle-play' },
      { label: 'پر بازدید', icon: 'lucide:eye' },
      { label: 'دوره‌های دارای مدرک ویژه', icon: 'lucide:award' },
    ],
  },
];

export const coursesFilterHead = {
  title: 'فیلتر دوره‌ها',
  search: { title: 'جستجوی سریع', placeholder: 'جستجو در دوره‌ها، مدرس و موضوعات..' },
};

export const coursesWhy = {
  title: 'چرا دوره‌های آریاز؟',
  items: [
    {
      label: 'پشتیبانی آموزشی',
      desc: 'پشتیبانی و راهنمایی در طول دوره',
      icon: 'lucide:headphones',
    },
    {
      label: 'محتوای به روز',
      desc: 'مطابق با استانداردها و نیازهای سازمان‌ها',
      icon: 'lucide:book-open',
    },
    {
      label: 'تمرین و پروژه عملی',
      desc: 'یادگیری کاربردی در بستر به همراه پروژه‌های واقعی',
      icon: 'lucide:target',
    },
    {
      label: 'مدرسین متخصص',
      desc: 'استادان وقت و فناوران با تجربه آموزشی',
      icon: 'lucide:users-round',
    },
    {
      label: 'گواهینامه معتبر',
      desc: 'ارائه گواهینامه معتبر قابل استعلام',
      icon: 'lucide:award',
    },
  ],
};
