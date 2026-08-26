import type { Person, FilterSection } from '@/components/people/PeopleParts';

/* ──────────────────────────────────────────────────────────────
   نویسندگان آریاز — author directory
   Source: «ariaz writers.png»

   Same shell as the instructor directory, different nouns: cards
   save with a bookmark rather than a heart, count «امتیاز /
   مقاله / کتاب / بازدید», and carry a single tinted "lead" tag
   whose colour varies per author in the source (orange, green,
   red) — that variation is transcribed rather than normalised,
   because it is doing work: it marks the author's headline field.

   HONEST NOTE: the four figures in the hero stat strip sit below
   the source's legibility floor — the PNG renders them at roughly
   8px and they do not resolve at any zoom. The labels are
   readable; the numbers below are the closest reading of the
   glyph shapes, not confident transcription. Re-check them
   against a higher-resolution export before this ships.
────────────────────────────────────────────────────────────── */

const A = '/images/aryaz/avatars';
const TH = '/images/aryaz/thumbnails';

export const authorsHero = {
  title: 'نویسندگان آریاز',
  desc: [
    'با متخصصان و صاحب‌نظرانی آشنا شوید که دانش و تجربه',
    'خود را با جامعه حرفه‌ای به اشتراک می‌گذارند.',
  ],
  art: '/images/aryaz/illustrations/books-hero.png',
  stats: [
    { value: '۴۵', label: 'نویسنده', icon: 'lucide:user-round' },
    { value: '۴۲۰', label: 'عنوان تخصصی', icon: 'lucide:file-text' },
    { value: '۷۸', label: 'کتاب منتشرشده', icon: 'lucide:book-open' },
    { value: '۱۵', label: 'حوزه تخصصی', icon: 'lucide:layers' },
  ],
};

export const authorsToolbar = {
  search: 'جستجو در نویسندگان (نام، موضوع، حوزه تخصصی...)',
  sortLabel: 'مرتب‌سازی:',
  sortValue: 'محبوب ترین',
};

export const authorsFilters: FilterSection[] = [
  {
    id: 'field',
    label: 'حوزه تخصصی',
    kind: 'check',
    more: 'مشاهده بیشتر',
    items: [
      { label: 'منابع انسانی', on: true },
      { label: 'مدیریت و رهبری', on: true },
      { label: 'توسعه فردی', on: true },
      { label: 'کسب‌وکار', on: true },
      { label: 'هوش مصنوعی' },
      { label: 'فروش و بازاریابی' },
    ],
  },
  {
    id: 'kind',
    label: 'نوع محتوا',
    kind: 'check',
    items: [
      { label: 'مقاله', on: true },
      { label: 'کتاب', on: true },
      { label: 'یادداشت', on: true },
      { label: 'پژوهش' },
      { label: 'مصاحبه' },
    ],
  },
  {
    id: 'sort',
    label: 'مرتب‌سازی',
    kind: 'radio',
    items: [
      { label: 'محبوب‌ترین', on: true },
      { label: 'بیشترین محتوا' },
      { label: 'جدیدترین نویسندگان' },
      { label: 'بیشترین بازدید' },
    ],
  },
];

export const authorsFilterHead = {
  title: 'فیلترها',
  action: { label: 'پاک کردن همه فیلترها', icon: 'lucide:eraser' },
};

export const authorCardActions = [{ label: 'مشاهده پروفایل', kind: 'outline' as const }];

const stat = (rating: string, articles: string, books: string, views: string) => [
  { value: rating, label: 'امتیاز', fg: '#f5a524' },
  { value: articles, label: 'مقاله' },
  { value: books, label: 'کتاب' },
  { value: views, label: 'بازدید' },
];

export const authors: Person[] = [
  {
    id: 'amir-hosseini',
    name: 'دکتر امیر حسینی',
    title: 'متخصص منابع انسانی و توسعه سازمانی',
    avatar: `${A}/expert-01-lawyer.png`,
    tags: [
      { label: 'مدیریت عملکرد', tone: 'orange' },
      { label: 'رهبری' },
      { label: 'منابع انسانی' },
    ],
    stats: stat('۴.۸', '۲۸', '۲', '۴هزار'),
    lastLabel: 'آخرین نوشته:',
    last: 'چرا HRBP در سازمان‌ها شکست می‌خورد؟',
    href: '/authors/amir-hosseini',
  },
  {
    id: 'sara-moradi',
    name: 'دکتر سارا مرادی',
    title: 'نویسنده و پژوهشگر حوزه رهبری',
    avatar: `${A}/mbti-reviewer-01.png`,
    tags: [
      { label: 'رهبری', tone: 'orange' },
      { label: 'توسعه فردی' },
      { label: 'رفتار سازمانی' },
    ],
    stats: stat('۴.۹', '۲۸', '۲', '۴هزار'),
    lastLabel: 'آخرین نوشته:',
    last: 'رهبری اصیل در دنیای پیچیده امروز',
    href: '/authors/sara-moradi',
  },
  {
    id: 'ali-nouri',
    name: 'مهندس علی نوری',
    title: 'متخصص تحول دیجیتال و کسب‌وکار',
    avatar: `${A}/staff-ali-ahmadi.png`,
    tags: [
      { label: 'تحول دیجیتال', tone: 'orange' },
      { label: 'کسب‌وکار' },
      { label: 'استراتژی' },
    ],
    stats: stat('۴.۷', '۲۹', '۲', '۴هزار'),
    lastLabel: 'آخرین نوشته:',
    last: 'چگونه دهه کسب‌وکار خود را بازطراحی کنیم؟',
    href: '/authors/ali-nouri',
  },
  {
    id: 'nazanin-yousefi',
    name: 'دکتر نازنین یوسفی',
    title: 'نویسنده و مدرس توسعه فردی',
    avatar: `${A}/expert-02-hr.png`,
    tags: [
      { label: 'توسعه فردی', tone: 'orange' },
      { label: 'خودشناسی' },
      { label: 'روانشناسی' },
    ],
    stats: stat('۴.۵', '۲۸', '۲', '۳هزار'),
    lastLabel: 'آخرین نوشته:',
    last: 'عادت‌های کوچک، تغییرات بزرگ',
    href: '/authors/nazanin-yousefi',
  },
  {
    id: 'kamran-abbasi',
    name: 'مهندس کامران عباسی',
    title: 'نویسنده حوزه فناوری و داده',
    avatar: `${A}/expert-03-attorney.png`,
    tags: [
      { label: 'هوش مصنوعی', tone: 'green' },
      { label: 'تحلیل داده' },
      { label: 'فناوری' },
    ],
    stats: stat('۴.۷', '۲۵', '۱', '۴هزار'),
    lastLabel: 'آخرین نوشته:',
    last: 'کاربرد هوش مصنوعی در منابع انسانی',
    href: '/authors/kamran-abbasi',
  },
  {
    id: 'mehdi-rezaei',
    name: 'دکتر مهدی رضایی',
    title: 'نویسنده و پژوهشگر مدیریت',
    avatar: `${A}/staff-mohammad-rezaei.png`,
    tags: [{ label: 'مدیریت' }, { label: 'استراتژی' }, { label: 'تصمیم‌گیری' }],
    stats: stat('۴.۶', '۲۴', '۲', '۴هزار'),
    lastLabel: 'آخرین نوشته:',
    last: 'مدیریت استراتژیک در شرایط عدم قطعیت',
    href: '/authors/mehdi-rezaei',
  },
  {
    id: 'elham-ahmadi',
    name: 'دکتر الهام احمدی',
    title: 'نویسنده حوزه منابع انسانی',
    avatar: `${A}/staff-zahra-nouri.png`,
    tags: [
      { label: 'جبران خدمات', tone: 'red' },
      { label: 'توسعه سازمانی' },
      { label: 'تحلیل شغل' },
    ],
    stats: stat('۴.۵', '۲۵', '۱', '۳هزار'),
    lastLabel: 'آخرین نوشته:',
    last: 'سوپرمارکت جبران خدمات مبتنی بر عملکرد',
    href: '/authors/elham-ahmadi',
  },
  {
    id: 'reza-kazemi',
    name: 'مهندس رضا کاظمی',
    title: 'نویسنده حوزه بازاریابی و فروش',
    avatar: `${A}/staff-hamed-mousavi.png`,
    tags: [
      { label: 'بازاریابی', tone: 'green' },
      { label: 'فروش' },
      { label: 'برندینگ' },
    ],
    stats: stat('۴.۳', '۲۴', '۱', '۴هزار'),
    lastLabel: 'آخرین نوشته:',
    last: 'استراتژی‌های فروش در بازارهای رقابتی',
    href: '/authors/reza-kazemi',
  },
];

export const authorsMore = 'مشاهده بیشتر نویسندگان';

export const authorsAgent = {
  title: 'مشاوره با آریاز',
  desc: [
    'نمی‌دانید کدام نویسنده برای نیاز شما مناسب است؟',
    'با آریاز صحبت کنید تا پیشنهاد تخصصی دریافت کنید.',
  ],
  cta: 'گفتگو با آریاز',
  art: '/images/aryaz/illustrations/book-ai-robot.png',
};

export const authorsFeatured = {
  title: 'نویسندگان منتخب آریاز',
  items: [
    {
      badge: 'نویسنده پر تأثیر',
      name: 'دکتر مهدی رضایی',
      note: 'بیشترین تعامل و بازخورد',
      avatar: `${A}/staff-mohammad-rezaei.png`,
      icon: 'lucide:medal',
      fg: '#7c5cff',
    },
    {
      badge: 'نویسنده پرمحتوا',
      name: 'دکتر سارا مرادی',
      note: 'بیشترین مقاله در سال ۱۴۰۵',
      avatar: `${A}/mbti-reviewer-01.png`,
      icon: 'lucide:file-text',
      fg: '#f0932b',
    },
    {
      badge: 'نویسنده آینده‌نگر',
      name: 'مهندس کامران عباسی',
      note: 'معرفی شده در حوزه هوش مصنوعی',
      avatar: `${A}/expert-03-attorney.png`,
      icon: 'lucide:sprout',
      fg: '#22a559',
    },
    {
      badge: 'نویسنده پرمطالعه این ماه',
      name: 'دکتر امیر حسینی',
      note: 'بیش از ۸۹۰۰ مطالعه',
      avatar: `${A}/expert-01-lawyer.png`,
      icon: 'lucide:trophy',
      fg: '#f5a524',
    },
  ],
  thumbs: [`${TH}/book-article-01-hr-strategy.png`],
};
