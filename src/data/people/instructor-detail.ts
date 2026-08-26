/* ──────────────────────────────────────────────────────────────
   صفحه مدرس — instructor profile
   Source: «single teacher page.png»

   The hero is a rounded dark card rather than a full-bleed band —
   measured from the mockup at #0e0b29 on the right shading to
   #34305a on the left, with the portrait bleeding off the right
   edge. Below it the page is three columns: a spec card and the
   bio in the middle, contact details on the left, professional
   history running as a right-anchored timeline.
────────────────────────────────────────────────────────────── */

/* Measured off the hero card. */
export const INSTRUCTOR_HERO_FROM = '#0e0b29';
export const INSTRUCTOR_HERO_TO = '#34305a';

const A = '/images/aryaz/avatars';

export const instructorCrumbs = [
  { label: 'خانه', href: '/' },
  { label: 'مدرسین', href: '/instructors' },
  { label: 'دکتر امیر حسینی' },
];

export const instructorHero = {
  badge: 'مدرس فعال آریاز',
  name: 'دکتر امیر حسینی',
  title: 'مشاور و مدرس ارشد منابع انسانی',
  desc: 'متخصص در طراحی سیستم‌های منابع انسانی و توسعه سازمانی',
  avatar: `${A}/expert-01-lawyer.png`,
  rating: '۴.۹ از ۵',
  basis: 'بر اساس ۱۳۸۰ ارزیابی فراگیران',
  skillsTitle: 'تخصص‌ها',
  skills: ['HRBP', 'مدیریت عملکرد', 'توسعه سازمانی', 'جبران خدمات', 'طراحی ساختار', 'توسعه مدیران'],
  actions: [
    { label: 'مشاهده دوره‌ها', icon: 'lucide:calendar', kind: 'solid' as const },
    { label: 'رزرو مشاوره', icon: 'lucide:calendar', kind: 'green' as const },
    { label: 'دنبال کردن مدرس', icon: 'lucide:heart', kind: 'white' as const },
  ],
};

export const instructorStats = [
  { value: '۴۷', label: 'پروژه سازمانی', sub: 'اجرا شده با موفقیت', icon: 'lucide:briefcase' },
  { value: '۹۶٪', label: 'رضایت فراگیران', sub: 'از کیفیت دوره‌ها', icon: 'lucide:star' },
  { value: '۱۲۸۰+', label: 'دانشجو و فراگیر', sub: 'در دوره‌های آموزشی', icon: 'lucide:users-round' },
  { value: '۳۲', label: 'دوره برگزارشده', sub: 'آنلاین و حضوری', icon: 'lucide:book-open' },
  { value: '۱۵', label: 'سال تجربه', sub: 'در حوزه منابع انسانی', icon: 'lucide:user-round' },
];

export const instructorTabs = [
  { id: 'about', label: 'درباره مدرس', icon: 'lucide:user-round' },
  { id: 'courses', label: 'دوره‌ها', icon: 'lucide:book-open' },
  { id: 'articles', label: 'مقالات', icon: 'lucide:file-text' },
  { id: 'projects', label: 'پروژه‌ها و تجربیات', icon: 'lucide:briefcase' },
  { id: 'reviews', label: 'نظرات فراگیران', icon: 'lucide:star' },
  { id: 'certs', label: 'گواهینامه‌ها', icon: 'lucide:award' },
];

export const instructorAbout = {
  title: 'معرفی مدرس',
  spec: [
    { label: 'مدرک تحصیلی', value: 'دکتری مدیریت منابع انسانی', icon: 'lucide:award' },
    { label: 'دانشگاه', value: 'دانشگاه تهران', icon: 'lucide:graduation-cap' },
    { label: 'زبان‌های تدریس', value: 'فارسی', icon: 'lucide:message-circle' },
    { label: 'شیوه تدریس', value: 'آنلاین، حضوری، ترکیبی', icon: 'lucide:monitor-play' },
  ],
  body: [
    'دکتر امیر حسینی متخصص حوزه منابع انسانی و توسعه سازمانی است که بیش از ۱۵ سال تجربه اجرایی و مشاوره‌ای در طراحی و پیاده‌سازی سیستم‌های منابع انسانی، توسعه مدیران، مدیریت عملکرد، جبران خدمات و تحول سازمانی دارد.',
    'ایشان با ترکیب دانش آکادمیک و تجربه عملی در سازمان‌های بزرگ، داخلی، رویکردی کاربردی و نتیجه‌محور در آموزش و مشاوره ارائه می‌دهد.',
  ],
};

export const instructorContact = {
  title: 'راه‌های ارتباطی',
  items: [
    { label: 'www.amirhosseini.com', icon: 'lucide:globe' },
    { label: 'info@amirhosseini.com', icon: 'lucide:mail' },
    { label: '۰۲۱-۸۸۸۸۷۷۶۶', icon: 'lucide:phone' },
    { label: 'linkedin.com/in/amirhosseini', icon: 'mdi:linkedin' },
  ],
  cta: 'ارسال پیام',
};

export const instructorSocial = {
  title: 'شبکه‌های اجتماعی',
  items: [
    { icon: 'mdi:linkedin', bg: '#0a66c2' },
    { icon: 'mdi:telegram', bg: '#8b5cf6' },
    { icon: 'mdi:instagram', bg: '#e1306c' },
  ],
};

export const instructorResume = {
  title: 'دانلود رزومه',
  desc: 'رزومه کامل دکتر امیر حسینی',
  cta: 'دانلود PDF',
};

export const instructorCareer = {
  title: 'سوابق حرفه‌ای',
  more: 'مشاهده سوابق بیشتر',
  items: [
    {
      period: '۱۴۰۰ - تاکنون',
      role: 'مدیر منابع انسانی ارشد',
      org: 'شرکت توسعه تجارت بهین',
      desc: 'مسئول طراحی و اجرای استراتژی منابع انسانی، سیستم ارزیابی عملکرد و توسعه مدیران',
    },
    {
      period: '۱۳۹۵ - ۱۴۰۰',
      role: 'مشاور منابع انسانی',
      org: 'مشاور مستقل',
      desc: 'مشاوره در حوزه طراحی ساختار، نظام جبران خدمات و تحول منابع انسانی در شرکت‌های مختلف',
    },
    {
      period: '۱۳۹۰ - ۱۳۹۵',
      role: 'کارشناس ارشد منابع انسانی',
      org: 'شرکت صنایع غذایی پارس',
      desc: 'مدیر پروژه‌های توسعه سازمانی، استقرار سیستم‌های منابع انسانی و بهبود فرآیندها',
    },
  ],
};
