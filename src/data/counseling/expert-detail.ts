import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   صفحه مشاور — single expert
   Source: «specialized counseling - Single Expert.png»

   Palette: the hero band is its own thing — a near-black navy
   measured off the mockup at #0c1130, darker than the panel's
   sidebar. Everything below the hero returns to the shared violet
   `T` tokens that the expert list already uses.

   Two source facts worth naming:

   1. THE LIST AND THE DETAIL DISAGREE ABOUT THIS PERSON. The
      directory card in «Expert list.png» gives دکتر امیر حسینی
      ۴.۸ / ۱۲۸ نظر / ۱۶ سال سابقه. This screen gives ۴.۹ /
      ۱۳۶ نظر / ۱۸ سال سابقه. The detail page follows the detail
      mockup; experts.ts keeps the list mockup's figures.

   2. NUMERALS. A few numerals in the source render Latin («96%»,
      «4.9») while every sibling numeral on the same row is
      Persian. Those are treated as artefacts of the mockup
      renderer and normalised to Persian here, because the design
      is otherwise unambiguous about using Persian digits.

   One token is at the resolution floor of the source: the small
   tag beside the stars in each review row. «کارشناسی کار» below
   is the best reading of those glyphs, not a confident one.
────────────────────────────────────────────────────────────── */

/* Measured off the hero band. */
export const EXPERT_HERO_BG = '#0c1130';

const A = '/images/aryaz/avatars';

export const expertCrumbs = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'مشاوره تخصصی', href: '/counseling' },
  { label: 'مشاوران', href: '/counseling' },
  { label: 'دکتر امیر حسینی' },
];

export const expertHero = {
  verified: { label: 'مشاور تأییدشده آریاز', icon: 'lucide:shield-check' },
  name: 'دکتر امیر حسینی',
  title: 'مشاور ارشد روابط کار و قانون کار',
  avatar: `${A}/expert-01-lawyer.png`,
  tags: ['قرارداد کار', 'دعاوی کار', 'خاتمه همکاری', 'آیین‌نامه انضباطی', '...'],
  stats: [
    { value: '۹۶٪', label: 'رضایت مراجعان', icon: 'lucide:gauge' },
    { value: '۳۴۸', label: 'مشاوره انجام‌شده', icon: 'lucide:folder' },
    { value: '۴.۹', label: 'امتیاز کاربران', icon: 'lucide:star' },
    { value: '۱۸', label: 'سال سابقه', icon: 'lucide:briefcase' },
  ],
  availability: 'در دسترس برای پذیرش درخواست جدید',
};

export const expertBooking = {
  title: 'اولین وقت آزاد',
  icon: 'lucide:calendar',
  date: 'امروز - سه‌شنبه ۲۳ خرداد',
  time: '۱۶:۳۰',
  mode: 'آنلاین',
  primary: { label: 'رزرو جلسه', icon: 'lucide:calendar' },
  secondary: { label: 'ارسال سؤال', icon: 'lucide:send' },
};

export const expertTabs = [
  { id: 'about', label: 'درباره مشاور', icon: 'lucide:user-round' },
  { id: 'career', label: 'سوابق حرفه‌ای', icon: 'lucide:briefcase' },
  { id: 'services', label: 'خدمات و تعرفه‌ها', icon: 'lucide:tag' },
  { id: 'content', label: 'محتواهای مشاور', icon: 'lucide:circle-play' },
  { id: 'reviews', label: 'نظرات کاربران', icon: 'lucide:message-circle' },
];

export const expertAbout = {
  title: 'درباره دکتر امیر حسینی',
  icon: 'lucide:user-round',
  body: [
    'دکتر امیر حسینی با بیش از ۱۸ سال تجربه تخصصی در حوزه روابط کار و قانون کار، به عنوان وکیل پایه یک دادگستری در پرونده‌های کارگری و کارفرمایی فعالیت می‌کند. تجربه همکاری با سازمان‌ها و شرکت‌های تولیدی، خدماتی و هلدینگ‌های بزرگ، به او دیدی عمیق و عملی نسبت به چالش‌های منابع انسانی و روابط کار بخش‌های مختلف داده است.',
    'تمرکز اصلی ایشان بر پیشگیری از اختلافات، تنظیم مستندات حقوقی، حل و فصل اختلافات و دفاع حرفه‌ای در مراجع حل اختلاف وزارت کار و دیوان عدالت اداری است.',
  ],
};

export const expertTopics = {
  title: 'بیشتر در چه مسائلی می‌تواند کمک کند؟',
  /* Three columns of three in the source, read right-to-left. */
  items: [
    'تنظیم و بازنگری قراردادهای کار',
    'خاتمه همکاری و اخراج',
    'دعاوی اداره کار',
    'آیین‌نامه‌های انضباطی',
    'اختلافات کارگر و کارفرما',
    'مشاوره در بازرسی کار',
    'طبقه‌بندی مشاغل',
    'مزایا و جبران خدمات',
    'مناطق آزاد و ویژه اقتصادی',
  ],
};

export const expertAgent = {
  title: 'ایجنت آریاز',
  desc: 'مسئله‌تان را توضیح دهید تا بررسی کنم آیا این مشاور برای شما مناسب است یا خیر و چه نوع خدمتی انتخاب کنید.',
  placeholder: 'مسئله خود را بنویسید.',
  chips: [
    'مسئله‌ام را بررسی کن',
    'این مشاور مناسب من است؟',
    'چه خدمتی انتخاب کنم؟',
    'جلسه بگیرم یا سؤال ارسال کنم؟',
  ],
};

export const expertExperience = {
  title: 'تجربه مرتبط این مشاور',
  icon: 'lucide:briefcase',
  items: [
    {
      value: '+۱۳۰',
      label: 'پرونده روابط کار',
      sub: 'با موفقیت حل‌وفصل شده',
      icon: 'lucide:folder-check',
      fg: T.successStrong,
      bg: T.tintGreen,
    },
    {
      value: '+۸۰',
      label: 'پرونده خاتمه همکاری',
      sub: 'مشاوره و دفاع موفق',
      icon: 'lucide:users-round',
      fg: T.violet,
      bg: T.tintPurple,
    },
    {
      value: '+۴۵',
      label: 'پروژه آیین‌نامه انضباطی',
      sub: 'طراحی و بازنگری',
      icon: 'lucide:file-search',
      fg: T.infoStrong,
      bg: T.tintBlue,
    },
    {
      value: '+۳۰',
      label: 'پروژه طبقه‌بندی مشاغل',
      sub: 'تحلیل و اجرای ساختار',
      icon: 'lucide:folder',
      fg: T.accent,
      bg: T.tintOrange,
    },
  ],
};

export interface ExpertService {
  id: string;
  title: string;
  desc: string[];
  price: string;
  cta: string;
  icon: string;
  fg: string;
  bg: string;
}

export const expertServices = {
  title: 'از این مشاور چه خدمتی می‌خواهید؟',
  compare: { label: 'مقایسه خدمات این مشاور', icon: 'lucide:scale' },
  items: [
    {
      id: 'question',
      title: 'پاسخ تخصصی به سؤال',
      desc: ['ارسال سؤال و مدارک و دریافت پاسخ', 'کتبی و مستند'],
      price: 'از ۹۵۰ هزار تومان',
      cta: 'انتخاب این خدمت',
      icon: 'lucide:message-circle',
      fg: T.successStrong,
      bg: T.tintGreen,
    },
    {
      id: 'online',
      title: 'جلسه آنلاین',
      desc: ['مشاوره آنلاین تصویری در زمان دلخواه', '۳۰، ۴۵، ۶۰ دقیقه'],
      price: 'از ۱٬۸۰۰٬۰۰۰ تومان',
      cta: 'انتخاب این خدمت',
      icon: 'lucide:video',
      fg: T.violet,
      bg: T.tintPurple,
    },
    {
      id: 'in-person',
      title: 'جلسه حضوری',
      desc: ['جلسه حضوری در دفتر مشاور', 'براساس محل و زمان'],
      price: 'از ۲٬۵۰۰٬۰۰۰ تومان',
      cta: 'انتخاب این خدمت',
      icon: 'lucide:map-pin',
      fg: T.accent,
      bg: T.tintOrange,
    },
    {
      id: 'case',
      title: 'بررسی پرونده',
      desc: ['بررسی کامل پرونده و مدارک و ارائه', 'نظر تخصصی مکتوب'],
      price: 'از ۴٬۵۰۰٬۰۰۰ تومان',
      cta: 'انتخاب این خدمت',
      icon: 'lucide:folder',
      fg: T.infoStrong,
      bg: T.tintBlue,
    },
  ] as ExpertService[],
};

export const expertReviews = {
  score: '۴.۹ از ۵',
  stars: 5,
  basis: '(براساس ۱۳۶ نظر)',
  all: 'مشاهده همه نظرات (۱۳۶)',
  criteria: [
    { label: 'دانش تخصصی', value: '۴.۹', pct: 98 },
    { label: 'شفافیت پاسخ', value: '۴.۸', pct: 96 },
    { label: 'کاربردی بودن راهکار', value: '۴.۹', pct: 98 },
    { label: 'رفتار حرفه‌ای', value: '۴.۹', pct: 98 },
    { label: 'ارزش نسبت به هزینه', value: '۴.۷', pct: 94 },
  ],
  items: [
    {
      name: 'مریم نظری',
      role: 'کارشناس حقوقی',
      avatar: `${A}/mbti-reviewer-01.png`,
      stars: 5,
      score: '۵ از ۵',
      tag: 'کارشناسی کار',
      text: 'تسلط ایشان بر قانون کار و رویه‌های اداره کار بسیار بالا است، مشاوره جلسه آنلاین بسیار مفید و ارزشمند بود.',
      when: '۴ هفته پیش',
    },
    {
      name: 'علی رحمانی',
      role: 'مدیر عامل',
      avatar: `${A}/staff-ali-ahmadi.png`,
      stars: 5,
      score: '۵ از ۵',
      tag: 'خوش‌قول',
      text: 'در پرونده دعوای کارگری از راهنمایی‌ها و دفاع حرفه‌ای ایشان بسیار راضی بودیم. نتیجه دقیقاً همان چیزی شد که انتظار داشتیم.',
      when: '۱ هفته پیش',
    },
    {
      name: 'سارا محمدی',
      role: 'مدیر منابع انسانی',
      avatar: `${A}/mbti-reviewer-02.png`,
      stars: 5,
      score: '۵ از ۵',
      tag: 'توضیحات',
      text: 'پاسخ بسیار دقیق و کاربردی بود. با توضیحات ایشان توانستیم تصمیم درستی در خصوص خاتمه همکاری بگیریم.',
      when: '۳ روز پیش',
    },
  ],
};

export const expertCta = {
  title: 'آماده‌اید مسئله‌تان را با دکتر امیر حسینی مطرح کنید؟',
  desc: 'سریع‌ترین راه ارتباط با این مشاور را انتخاب کنید.',
  primary: { label: 'رزرو جلسه', icon: 'lucide:calendar' },
  secondary: { label: 'ارسال سؤال', icon: 'lucide:send' },
};
