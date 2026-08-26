import { L } from '@/data/lmsTokens';

/* ──────────────────────────────────────────────────────────────
   صفحه دوره — course detail
   Source: «single_course.png»

   Three things in the source are worth naming rather than
   quietly smoothing:

   1. HOURS DISAGREE. The hero chip reads «۳۴ ساعت»; the sticky
      buy bar at the foot of the same screen reads «۳۶ ساعت».
      Both are kept exactly as drawn — see `hero.meta` and
      `stickyBar.meta`. Neither is "the" number until the design
      settles it.

   2. THE CATALOGUE CALLS THIS COURSE SOMETHING ELSE. «courses.png»
      lists the card that links here as «مدیریت عملکرد کارکنان»
      taught by «دکتر سارا مرادی». This screen titles it «طراحی و
      استقرار نظام ارزیابی عملکرد کارکنان» taught by «دکتر علی
      محمودی» — which is what the classroom screens use too (see
      course-context.ts). The detail page follows the detail
      mockup; the catalogue card is left as its own mockup drew it.

   3. THE PAGE IS BOTH SHOP AND CLASSROOM. It carries a buy card
      (price, «ثبت‌نام و خرید دوره») *and* a progress card showing
      ۸۰٪ complete. That is what the mockup draws, so both render.

   Body copy marked AUTHORED below is written here: the mockup's
   own paragraph and its learning-path step labels are rendered as
   non-text filler by the mockup generator and cannot be read.
   Everything else is transcribed.
────────────────────────────────────────────────────────────── */

const A = '/images/aryaz/avatars';
const TH = '/images/aryaz/thumbnails';

export const courseHero = {
  crumbTitle: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان',
  title: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان',
  instructorLabel: 'مدرس:',
  instructor: 'دکتر علی محمودی',
  avatar: `${A}/staff-ali-ahmadi.png`,
  /* «مناسب: پیشرفته» is the source's own phrasing for the level chip. */
  meta: [
    { label: 'ویدئویی', icon: 'lucide:circle-play', pill: true },
    { label: 'فارسی', icon: 'lucide:captions' },
    { label: '۳۴ ساعت', icon: 'lucide:clock' },
    { label: 'مناسب: پیشرفته', icon: 'lucide:chart-column-big' },
  ],
  rating: { score: '۴.۸', count: '(۱۲۸ نفر)' },
  desc: [
    'این دوره به شما کمک می‌کند یک سیستم ارزیابی عملکرد، علمی، منصفانه و قابل اجرا طراحی',
    'کنید و آن را در سازمان خود پیاده‌سازی کنید.',
  ],
  poster: `${TH}/kpi-article-01-design-guide.png`,
  playerTime: '۰۴:۴۶ / ۱:۰۲',
};

export const coursePurchase = {
  title: 'قیمت دوره',
  price: '۳٬۹۰۰٬۰۰۰',
  currency: 'تومان',
  buy: { label: 'ثبت‌نام و خرید دوره', icon: 'lucide:shopping-cart' },
  wish: { label: 'افزودن به علاقه‌مندی', icon: 'lucide:heart' },
  /* The fourth line reads «تضمین بازگشت محتوای دوره» in the
     source. It is odd Persian, and it is transcribed as drawn. */
  perks: [
    { label: 'دسترسی دائمی به محتوای دوره', icon: 'lucide:infinity', fg: L.blue },
    { label: 'گواهینامه معتبر پایان دوره', icon: 'lucide:award', fg: L.blue },
    { label: 'پشتیبانی آنلاین و در طول دوره', icon: 'ic:baseline-whatsapp', fg: L.green },
    { label: 'تضمین بازگشت محتوای دوره', icon: 'lucide:badge-check', fg: L.blue },
  ],
};

export const courseProgress = {
  title: 'پیشرفت یادگیری شما',
  pct: 80,
  caption: 'پیشرفت دوره',
  barLabel: '۸ جلسه از ۱۰ جلسه را تکمیل کرده‌اید',
  barPct: 80,
  rows: [
    { label: 'آخرین جلسه مشاهده شده', icon: 'lucide:target', fg: L.red },
    { label: 'تست‌های ارزیابی شما', icon: 'lucide:target', fg: L.red, muted: true },
    { label: 'آزمون پایان دوره', icon: 'lucide:target', fg: L.red },
    { label: 'پروژه پایانی', icon: 'lucide:award', fg: L.red },
  ],
  cta: { label: 'ادامه یادگیری دوره', href: '/courses/performance-management/lesson' },
};

export const courseResources = {
  title: 'منابع مرتبط',
  cta: 'مشاهده همه',
  items: [
    {
      title: 'چگونه شاخص‌های کلیدی عملکرد (KPI) را به درستی طراحی کنیم؟',
      meta: 'مقاله مطالعه شده',
      image: `${TH}/kpi-article-03-strategic-kpi.png`,
    },
    {
      title: 'تجربه پیاده‌سازی موفق سیستم ارزیابی عملکرد در یک شرکت تولیدی',
      meta: 'ویدئو مطالعه شده',
      image: `${TH}/video-09-org-culture.png`,
    },
  ],
};

export const courseTabs = [
  { id: 'about', label: 'توضیحات' },
  { id: 'syllabus', label: 'سرفصل‌ها' },
  { id: 'instructor', label: 'مدرس' },
  { id: 'benefits', label: 'مزایا' },
  { id: 'projects', label: 'پروژه‌ها و تمرین‌ها' },
  { id: 'files', label: 'فایل‌ها' },
  { id: 'reviews', label: 'نظرات (۱۲۸)' },
];

export const courseAbout = {
  title: 'درباره این دوره',
  /* AUTHORED — the mockup's paragraph is rendered as unreadable
     filler glyphs. Written to the length and register the layout
     expects; replace when real copy exists. */
  body: [
    'این دوره جامع و عملی، نگاهی کاربردی به طراحی و استقرار نظام ارزیابی عملکرد دارد. از تعریف شاخص تا جلسه بازخورد، هر گام با نمونه واقعی، قالب آماده و تمرین همراه است تا آنچه می‌آموزید همان روز در سازمان خودتان قابل استفاده باشد.',
    'اگر مسئولیت طراحی یا بازنگری نظام ارزیابی عملکرد بر عهده شماست، این دوره ترتیب کارها را روشن می‌کند: چه چیزی را اول بسنجید، چه چیزی را کنار بگذارید و چطور نتیجه ارزیابی را به تصمیم تبدیل کنید.',
  ],
  outcomes: [
    { label: 'طراحی شاخص‌های کلیدی عملکرد', icon: 'lucide:target', fg: L.green },
    { label: 'انتخاب روش و فرایندهای ارزیابی', icon: 'lucide:workflow', fg: L.green },
    { label: 'پیاده‌سازی فرایندهای مؤثر', icon: 'lucide:rocket', fg: L.violet },
    { label: 'افزایش انگیزش و رضایت کارکنان', icon: 'lucide:users-round', fg: L.green },
  ],
};

export const courseAgent = {
  title: 'ایجنت آریاز',
  desc: 'اگر سوالی درباره این درس دارید، بپرسید تا کمکتون کنم',
  chips: [
    'پیشرفت یادگیری شما',
    'سوال درباره مفاهیم درس',
    'توضیح بیشتر',
    'کمک در حل تمرین‌ها',
  ],
  placeholder: 'سوال خود را از اینجا بنویسید..',
};

export interface RelatedGroup {
  id: string;
  title: string;
  icon: string;
  fg: string;
  bg: string;
  items: string[];
  cta: string;
}

export const courseRelated: RelatedGroup[] = [
  {
    id: 'forms',
    title: 'فرم‌ها و دستورالعمل‌های مرتبط',
    icon: 'lucide:file-text',
    fg: L.violet,
    bg: L.violetSoft,
    items: ['فرم ارزیابی عملکرد', 'استانداردهای ارزیابی', 'چک‌لیست مصاحبه عملکرد'],
    cta: 'مشاهده همه',
  },
  {
    id: 'tools',
    title: 'ابزارهای مرتبط',
    icon: 'lucide:wrench',
    fg: '#0ea5a5',
    bg: '#e6f6f6',
    items: ['فایل طراحی KPI', 'داشبورد عملکرد', 'ابزار تحلیل داده‌ها'],
    cta: 'مشاهده همه',
  },
  {
    id: 'exams',
    title: 'تمرین‌ها و امتحانات مرتبط',
    icon: 'lucide:clipboard-list',
    fg: '#e5507a',
    bg: '#fdecf1',
    items: ['تست شایستگی مدیریتی', 'تست هوش هیجانی (EQ)', 'تست سبک رهبری'],
    cta: 'مشاهده همه',
  },
  {
    id: 'courses',
    title: 'دوره‌های مرتبط',
    icon: 'lucide:book-open',
    fg: L.green,
    bg: L.greenSoft,
    items: ['مدیریت عملکرد پیشرفته', 'طراحی OKR و KPI', 'HR Analytics'],
    cta: 'مشاهده همه',
  },
  {
    id: 'agents',
    title: 'ایجنت‌های مرتبط',
    icon: 'lucide:bot',
    fg: L.blue,
    bg: L.blueSoft,
    items: ['ایجنت طراحی KPI', 'ایجنت تحلیل عملکرد', 'ایجنت طراحی اهداف'],
    cta: 'مشاهده همه',
  },
];

export const coursePath = {
  title: 'مسیر یادگیری مرتبط با این دوره',
  cta: 'مشاهده مسیر یادگیری کامل',
  /* AUTHORED — the five step captions in the mockup are filler
     glyphs. The shape (five nodes, this course highlighted at the
     RTL start, arrows running leftwards) is transcribed; the words
     are written to describe a real progression. */
  steps: [
    { title: 'این دوره', sub: 'نظام ارزیابی عملکرد', icon: 'lucide:book-open', state: 'current' },
    { title: 'بازخورد و گفت‌وگو', sub: 'جلسه ارزیابی مؤثر', icon: 'lucide:message-circle', state: 'next' },
    { title: 'هدف‌گذاری و OKR', sub: 'پیوند شاخص با استراتژی', icon: 'lucide:target', state: 'later' },
    { title: 'تحلیل داده عملکرد', sub: 'گزارش و تصمیم', icon: 'lucide:chart-column-big', state: 'later' },
    { title: 'مدیریت عملکرد پیشرفته', sub: 'استقرار در مقیاس سازمان', icon: 'lucide:award', state: 'later' },
  ],
};

export const courseReviews = {
  title: 'نظرات و امتیاز کاربران',
  scoreLabel: 'امتیاز دوره',
  score: '۴,۸',
  stars: 5,
  basis: '(۱۲۸ نظر)',
  submit: 'ثبت نظر جدید',
  bars: [
    { pct: 78, label: '78%' },
    { pct: 15, label: '15%' },
    { pct: 3, label: '3%' },
    { pct: 2, label: '2%' },
    { pct: 1, label: '1%' },
  ],
  all: 'مشاهده همه نظرات',
  items: [
    {
      name: 'امیر حیدری',
      role: 'کارشناس ارزیابی عملکرد',
      avatar: `${A}/staff-ali-ahmadi.png`,
      stars: 5,
      text: 'محتوای این دوره به طور دقیق و کامل در سازمان ما پیاده شد.',
    },
    {
      name: 'نرگس کاظمی',
      role: 'مدیر آموزش',
      avatar: `${A}/staff-zahra-nouri.png`,
      stars: 5,
      text: 'اگر می‌خواهید حتماً این دوره را تهیه کنید.',
    },
    {
      name: 'سارا محمدی',
      role: 'مدیر منابع انسانی',
      avatar: `${A}/mbti-reviewer-01.png`,
      stars: 4,
      text: 'دوره بسیار کاربردی و جامع؛ مدرس مسلط و هر قسمت با مثال داشت.',
    },
  ],
};

export const courseSticky = {
  title: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان',
  avatar: `${A}/staff-ali-ahmadi.png`,
  /* «۳۶ ساعت» here versus «۳۴ ساعت» in the hero — the source's
     own disagreement, kept. */
  meta: [
    { label: 'مدرس : دکتر علی محمودی', icon: '' },
    { label: '۳۶ ساعت', icon: 'lucide:clock' },
    { label: 'فارسی', icon: 'lucide:circle-play' },
    { label: 'پیشرفته', icon: 'lucide:star', fg: L.green },
  ],
  rating: { score: '۴.۸', count: '(۱۲۸) نفر' },
  price: '۳٬۹۰۰٬۰۰۰',
  currency: 'تومان',
  buy: { label: 'ثبت‌نام و خرید دوره', icon: 'lucide:shopping-cart' },
};
