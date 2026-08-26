/* ──────────────────────────────────────────────────────────────
   Ariyaz — کتاب‌های تخصصی (the digital library).

   Feeds three pages that share the free-resources design language:
     /books            — the book catalogue
     /books/[id]       — a single book
     /books/[id]/read  — the reader

   Every book is assembled from the same template, so any id
   renders the identical layout with its own content.
────────────────────────────────────────────────────────────── */

import type { Tone } from '@/data/free';

const B = '/images/books';

/* ══════════════════════════════════════════════════════════════
   Listing — /books
══════════════════════════════════════════════════════════════ */

export const booksHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'کتاب‌های تخصصی', href: '/books' },
  ],
  title: 'کتاب‌های تخصصی',
  titleAccent: 'منابع انسانی',
  titleRest: '، مدیریت و مهارت‌های نرم',
  desc: [
    'مجموعه‌ای متتخب از کتاب‌های کاربردی و تخصصی',
    'برای توسعه دانش. ارتقای مهارت‌های مدیریت و رشد فردی مدیران و متخصصان.',
  ],
  art: `${B}/books-hero.png`,
};

/** The chip row above the grid — sort on the right, access filters after it. */
export const bookChips = [
  { id: 'newest', label: 'جدیدترین', icon: 'lucide:star' },
  { id: 'all', label: 'همه', icon: 'lucide:users-round' },
  { id: 'premium', label: 'ویژه', icon: 'lucide:star' },
  { id: 'free', label: 'رایگان', icon: 'lucide:users-round' },
] as const;

export type BookChip = (typeof bookChips)[number]['id'];

export interface BookFacet {
  id: string;
  title: string;
  icon: string;
  /** Popularity is drawn as star rows rather than plain labels. */
  kind?: 'stars';
  open?: boolean;
  items: { id: string; label: string; count: number; stars?: number }[];
}

export const bookFacets: BookFacet[] = [
  {
    id: 'topic',
    title: 'بر اساس موضوع',
    icon: 'lucide:users-round',
    open: true,
    items: [
      { id: 'hr', label: 'مدیریت منابع انسانی', count: 58 },
      { id: 'management', label: 'مدیریت', count: 45 },
      { id: 'soft', label: 'مهارت نرم', count: 39 },
      { id: 'leadership', label: 'رهبری', count: 28 },
      { id: 'personal', label: 'توسعه فردی', count: 22 },
    ],
  },
  {
    id: 'year',
    title: 'بر اساس سال انتشار',
    icon: 'lucide:calendar',
    items: [
      { id: '1403', label: '۱۴۰۳', count: 38 },
      { id: '1402', label: '۱۴۰۲', count: 32 },
      { id: '1401', label: '۱۴۰۱', count: 30 },
      { id: '1400', label: '۱۴۰۰', count: 22 },
      { id: 'older', label: '۱۳۹۹ و قبل‌تر', count: 20 },
    ],
  },
  {
    id: 'format',
    title: 'بر اساس نوع قالب',
    icon: 'lucide:file-text',
    items: [
      { id: 'pdf', label: 'کتاب دیجیتال (PDF)', count: 72 },
      { id: 'epub', label: 'EPUB', count: 36 },
      { id: 'print', label: 'کتاب چاپی', count: 24 },
      { id: 'audio', label: 'فایل صوتی', count: 10 },
      { id: 'video', label: 'ویدیو آموزشی', count: 8 },
    ],
  },
  {
    id: 'popularity',
    title: 'بر اساس میزان محبوبیت',
    icon: 'lucide:star',
    kind: 'stars',
    items: [
      { id: 'p5', label: 'بسیار محبوب', count: 42, stars: 5 },
      { id: 'p4', label: 'محبوب', count: 38, stars: 4 },
      { id: 'p3', label: 'متوسط', count: 32, stars: 3 },
      { id: 'p2', label: 'کمتر محبوب', count: 18, stars: 2 },
      { id: 'p1', label: 'کم محبوب', count: 12, stars: 1 },
    ],
  },
];

/** Corner ribbon on a cover. `print` and `new` sit beside the access badge. */
export type BookBadge = 'free' | 'premium' | 'print' | 'new';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  /** 'digital' books are read in the browser; 'print' ones are bought. */
  medium: 'digital' | 'print';
  pages: number;
  access: 'free' | 'premium';
  badges: BookBadge[];
  topicId: string;
  yearId: string;
  formatId: string;
  popularityId: string;
  rating: number;
}

export const books: Book[] = [
  {
    id: 'strategic-hrm',
    title: 'مدیریت منابع انسانی استراتژیک',
    author: 'دکتر الهیاری',
    cover: `${B}/covers/book-01-strategic-hrm.png`,
    medium: 'digital',
    pages: 446,
    access: 'free',
    badges: ['free'],
    topicId: 'hr',
    yearId: '1403',
    formatId: 'pdf',
    popularityId: 'p5',
    rating: 4.8,
  },
  {
    id: 'seven-habits',
    title: 'هفت عادت مردمان مؤثر',
    author: 'استفن کاوی',
    cover: `${B}/covers/book-02-seven-habits.png`,
    medium: 'print',
    pages: 415,
    access: 'premium',
    badges: ['premium', 'print'],
    topicId: 'personal',
    yearId: '1402',
    formatId: 'print',
    popularityId: 'p5',
    rating: 4.9,
  },
  {
    id: 'org-behaviour',
    title: 'رفتار سازمانی',
    author: 'استیون رابینز',
    cover: `${B}/covers/book-03-org-behaviour.png`,
    medium: 'digital',
    pages: 361,
    access: 'free',
    badges: ['free'],
    topicId: 'management',
    yearId: '1402',
    formatId: 'pdf',
    popularityId: 'p4',
    rating: 4.6,
  },
  {
    id: 'performance-mgmt',
    title: 'مدیریت عملکرد',
    author: 'برایان بیکر',
    cover: `${B}/covers/book-04-performance-mgmt.png`,
    medium: 'print',
    pages: 746,
    access: 'premium',
    badges: ['premium'],
    topicId: 'hr',
    yearId: '1401',
    formatId: 'print',
    popularityId: 'p4',
    rating: 4.5,
  },
  {
    id: 'emotional-intelligence',
    title: 'هوش هیجانی در محیط کار',
    author: 'دانیل گلمن',
    cover: `${B}/covers/book-05-emotional-intel.png`,
    medium: 'digital',
    pages: 312,
    access: 'free',
    badges: ['free'],
    topicId: 'soft',
    yearId: '1403',
    formatId: 'epub',
    popularityId: 'p5',
    rating: 4.7,
  },
  {
    id: 'leadership-change',
    title: 'رهبری تحول آفرین',
    author: 'جان کاتر',
    cover: `${B}/covers/book-06-leadership-change.png`,
    medium: 'print',
    pages: 426,
    access: 'premium',
    badges: ['premium', 'print'],
    topicId: 'leadership',
    yearId: '1401',
    formatId: 'print',
    popularityId: 'p4',
    rating: 4.6,
  },
  {
    id: 'effective-communication',
    title: 'ارتباطات مؤثر',
    author: 'جیمز چوکر',
    cover: `${B}/covers/book-07-effective-comms.png`,
    medium: 'digital',
    pages: 396,
    access: 'free',
    badges: ['new'],
    topicId: 'soft',
    yearId: '1403',
    formatId: 'pdf',
    popularityId: 'p3',
    rating: 4.4,
  },
  {
    id: 'personal-effectiveness',
    title: 'کارآمدی فردی',
    author: 'پیتر درنکل',
    cover: `${B}/covers/book-08-personal-effect.png`,
    medium: 'digital',
    pages: 770,
    access: 'free',
    badges: ['free'],
    topicId: 'personal',
    yearId: '1400',
    formatId: 'pdf',
    popularityId: 'p3',
    rating: 4.3,
  },
];

/** The catalogue is larger than the page; the counter reads from here. */
export const totalBooks = '۱۴۲';
export const booksSearchLabel = 'جستجو در کتاب‌ها...';

/* ══════════════════════════════════════════════════════════════
   Detail — /books/[id]
══════════════════════════════════════════════════════════════ */

export interface BookSpec {
  label: string;
  value: string;
  icon: string;
}

export interface BookVersion {
  id: string;
  label: string;
  price: string;
  icon: string;
  tone: Tone;
}

export interface BookColumn {
  title: string;
  subtitle: string;
  icon: string;
  tone: Tone;
  items: string[];
  cta: string;
  href: string;
}

export interface BookArticle {
  title: string;
  thumb: string;
  author: string;
  date: string;
  minutes: string;
  href: string;
}

export interface BookReview {
  name: string;
  role: string;
  avatar: string;
  stars: number;
  date: string;
  text: string;
}

export const bookDetailTabs = [
  { id: 'about', label: 'درباره کتاب', icon: 'lucide:book-open' },
  { id: 'learn', label: 'آنچه یاد می‌گیرید', icon: 'lucide:lightbulb' },
  { id: 'features', label: 'ویژگی‌های کتاب', icon: 'lucide:sparkles' },
  { id: 'specs', label: 'مشخصات کتاب', icon: 'lucide:list' },
] as const;

export type BookTab = (typeof bookDetailTabs)[number]['id'];

export const bookAiPanel = {
  title: 'ایجنت آریاز',
  lead: 'درباره این کتاب با ایجنت آریاز مشورت کن',
  lines: [
    'می‌خواهی بدونی این کتاب بدقیقاً به چه دردی می‌خوره؟',
    'مناسب شغل و سازمان تو هست یا نه؟',
    'اگر سوالی داری، از ایجنت آریاز بپرس.',
  ],
  cta: 'شروع گفتگو',
  art: `${B}/book-ai-robot.png`,
};

export const bookLearningPath = {
  title: 'مسیر یادگیری مرتبط با این کتاب',
  desc: 'با دنبال کردن مسیر پیشنهادی آریاز، مفاهیم این کتاب را در عمل به مهارت‌های کاربردی تبدیل کنید و یادگیری را هوشمندانه‌تر کنید.',
  cta: 'مشاهده مسیر یادگیری',
  href: '/learning-paths',
  art: `${B}/book-learning-path.png`,
};

export interface BookDetail extends Book {
  subtitle: string;
  translator: string;
  heroArt: string;
  detailCover: string;
  ribbons: string[];
  specs: BookSpec[];
  versions: BookVersion[];
  readCta: { label: string; href: string };
  sampleCta: { label: string; href: string };
  about: string[];
  learn: string[];
  features: string[];
  sheet: { label: string; value: string }[];
  columns: BookColumn[];
  articles: BookArticle[];
  rating: number;
  ratingScore: string;
  ratingCount: string;
  bars: { stars: number; pct: number }[];
  reviews: BookReview[];
}

const columns: BookColumn[] = [
  {
    title: 'فرم‌ها و دستورالعمل‌ها',
    subtitle: 'قالب‌های آماده برای اجرای فصل‌های کتاب',
    icon: 'lucide:file-text',
    tone: 'green',
    items: ['فرم ارزیابی عملکرد', 'فرم شرح شغل', 'دستورالعمل جذب و استخدام'],
    cta: 'مشاهده همه',
    href: '/forms',
  },
  {
    title: 'ابزارهای مرتبط',
    subtitle: 'ابزارهایی که مفاهیم کتاب را عملیاتی می‌کنند',
    icon: 'lucide:wrench',
    tone: 'blue',
    items: ['نرم‌افزار طراحی حقوق و مزایا', 'نرم افزار KPI', 'داشبورد تحلیل منابع انسانی'],
    cta: 'مشاهده همه',
    href: '/tools',
  },
  {
    title: 'آزمون‌ها و تست‌های مرتبط',
    subtitle: 'دانسته‌های خود را بسنجید',
    icon: 'lucide:clipboard-check',
    tone: 'orange',
    items: ['تست شایستگی مدیریت منابع', 'تست سبک رهبری', 'تست هوش هیجانی'],
    cta: 'مشاهده همه',
    href: '/exams',
  },
  {
    title: 'دوره‌های مرتبط',
    subtitle: 'یادگیری ساختاریافته با مدرس',
    icon: 'lucide:graduation-cap',
    tone: 'violet',
    items: [
      'مدیریت استراتژیک منابع انسانی',
      'مدل بکارگیری منابع انسانی (HRBP)',
      'مدیریت عملکرد پیشرفته',
    ],
    cta: 'مشاهده همه',
    href: '/courses',
  },
  {
    title: 'ایجنت‌های مرتبط',
    subtitle: 'دستیارهای هوشمند این حوزه',
    icon: 'lucide:bot',
    tone: 'indigo',
    items: ['بسته طراحی سیستم HR', 'تحلیل و بهبود فرآیندهای HR', 'تحلیل فرهنگ سازمانی'],
    cta: 'مشاهده همه',
    href: '/agents',
  },
];

const articles: BookArticle[] = [
  {
    title: 'نقش منابع انسانی در استراتژی سازمان',
    thumb: `${B}/articles/book-article-01-hr-strategy.png`,
    author: 'تیم پژوهش آریاز',
    date: '۱۴۰۳/۰۶/۲۶',
    minutes: '۵ دقیقه مطالعه',
    href: '/articles',
  },
  {
    title: 'مدل همکاری بین انسانی و کسب‌وکار',
    thumb: `${B}/articles/book-article-02-chess-business.png`,
    author: 'گروه مطالعات مدیریتی',
    date: '۱۴۰۳/۰۷/۲۶',
    minutes: '۷ دقیقه مطالعه',
    href: '/articles',
  },
  {
    title: 'چشمه‌های کلیدی مدیریت منابع انسانی',
    thumb: `${B}/articles/book-article-03-hr-sources.png`,
    author: 'واحد تحلیل منابع انسانی',
    date: '۱۴۰۳/۰۴/۲۵',
    minutes: '۶ دقیقه مطالعه',
    href: '/articles',
  },
  {
    title: 'راهبردهای نوین جذب و حفظ استعدادها',
    thumb: `${B}/articles/book-article-04-talent-attract.png`,
    author: 'کارآمدی منابع انسانی',
    date: '۱۴۰۲/۰۵/۲۸',
    minutes: '۵ دقیقه مطالعه',
    href: '/articles',
  },
];

const reviews: BookReview[] = [
  {
    name: 'مهدی رضایی',
    role: 'مدیر منابع انسانی',
    avatar: '/images/docs/people/doc-reviewer-01.png',
    stars: 5,
    date: '۱۴۰۳/۰۶/۱۶',
    text: 'یکی از بهترین کتاب‌هایی است که در حوزه منابع انسانی خواندم؛ فصل مدل‌ها واقعاً کاربردی بود.',
  },
  {
    name: 'سمیرا حسینی',
    role: 'کارشناس منابع انسانی',
    avatar: '/images/docs/people/doc-reviewer-02.png',
    stars: 4,
    date: '۱۴۰۳/۰۶/۱۰',
    text: 'مفاهیم کتاب روشن و منسجم است و مثال‌ها به فضای سازمان‌های ایرانی نزدیک‌اند.',
  },
];

/** Every book renders from this template with its own cover and figures. */
export function getBook(id: string): BookDetail | undefined {
  const book = books.find((b) => b.id === id);
  if (!book) return undefined;

  const digital = book.medium === 'digital';

  return {
    ...book,
    subtitle: 'رویکردها، مدل‌ها و ابزارهای عملی',
    translator: 'دکتر سید رضا غاوی',
    heroArt: `${B}/book-detail-hero.png`,
    detailCover: book.cover,
    ribbons: digital ? ['نسخه دیجیتال', 'پرفروش'] : ['نسخه چاپی', 'پرفروش'],
    specs: [
      { label: 'نشر', value: 'فرهنگ کتاب', icon: 'lucide:building-2' },
      { label: 'تعداد صفحات', value: `${toPersian(book.pages)} صفحه`, icon: 'lucide:file-text' },
      { label: 'زمان مطالعه', value: '۶ ساعت', icon: 'lucide:clock' },
      { label: 'دسته‌بندی', value: 'کتاب', icon: 'lucide:layout-grid' },
    ],
    versions: [
      {
        id: 'digital',
        label: 'کتاب دیجیتال',
        price: book.access === 'free' ? 'رایگان' : '۱۹۸,۰۰۰ تومان',
        icon: 'lucide:file-text',
        tone: 'blue',
      },
      { id: 'print', label: 'کتاب چاپی', price: '۳۹۸,۰۰۰ تومان', icon: 'lucide:book-open', tone: 'orange' },
    ],
    readCta: digital
      ? { label: 'مطالعه کتاب', href: `/books/${book.id}/read` }
      : { label: 'مشاهده و خرید کتاب', href: '/shop' },
    sampleCta: { label: 'دانلود نمونه رایگان', href: '#' },
    about: [
      'این کتاب یکی از جامع‌ترین منابع در حوزه مدیریت منابع انسانی است که با تکیه بر تجربه و پژوهش‌های بین‌المللی، چارچوبی روشن برای تحلیل و طراحی نظام‌های منابع انسانی در سازمان‌ها ارائه می‌دهد.',
      'هدف این کتاب کمک به مدیران و متخصصان منابع انسانی برای طراحی و اجرای استراتژی‌هایی است که به رشد فردی و سازمانی منجر می‌شود.',
    ],
    learn: [
      'طراحی نظام جذب و استخدام مبتنی بر شایستگی',
      'تدوین مدل ارزیابی عملکرد متناسب با اهداف سازمان',
      'همسوسازی برنامه‌های منابع انسانی با استراتژی کسب‌وکار',
      'اندازه‌گیری اثربخشی اقدامات منابع انسانی با شاخص‌های روشن',
      'طراحی مسیر رشد و جانشین‌پروری برای نقش‌های کلیدی',
      'مدیریت تغییر در پروژه‌های تحول منابع انسانی',
    ],
    features: [
      'مطالعه آنلاین صفحه‌به‌صفحه با امکان یادداشت و هایلایت',
      'خلاصه فصل‌ها و پرسش‌های کلیدی در پایان هر بخش',
      'ابزارها و فرم‌های قابل دانلود متناظر با هر فصل',
      'همراهی ایجنت هوشمند آریاز برای پرسش و پاسخ درباره متن',
    ],
    sheet: [
      { label: 'عنوان', value: book.title },
      { label: 'نویسنده', value: book.author },
      { label: 'مترجم', value: 'دکتر سید رضا غاوی' },
      { label: 'ناشر', value: 'فرهنگ کتاب' },
      { label: 'سال انتشار', value: '۱۴۰۳' },
      { label: 'تعداد صفحات', value: `${toPersian(book.pages)} صفحه` },
      { label: 'قالب', value: digital ? 'PDF / EPUB' : 'چاپی' },
      { label: 'زبان', value: 'فارسی' },
    ],
    columns,
    articles,
    ratingScore: '۴.۸',
    ratingCount: '۳۴۶',
    bars: [
      { stars: 5, pct: 67 },
      { stars: 4, pct: 19 },
      { stars: 3, pct: 9 },
      { stars: 2, pct: 4 },
      { stars: 1, pct: 1 },
    ],
    reviews,
  };
}

export const bookIds = books.map((b) => b.id);

/* ══════════════════════════════════════════════════════════════
   Reader — /books/[id]/read
══════════════════════════════════════════════════════════════ */

export interface ReaderTool {
  id: string;
  label: string;
  icon: string;
  /** Only the agent carries a badge; the rest are plain tools. */
  badge?: string;
}

export const readerRail: ReaderTool[] = [
  { id: 'agent', label: 'ایجنت آریاز', icon: 'lucide:bot', badge: 'ممتاز' },
  { id: 'contents', label: 'فهرست', icon: 'lucide:list' },
  { id: 'note', label: 'یادداشت', icon: 'lucide:pencil-line' },
  { id: 'bookmark', label: 'نشان‌ها', icon: 'lucide:bookmark' },
  { id: 'highlight', label: 'هایلایت', icon: 'lucide:highlighter' },
  { id: 'search', label: 'جستجو', icon: 'lucide:search' },
  { id: 'settings', label: 'تنظیمات', icon: 'lucide:settings' },
  { id: 'night', label: 'حالت شب', icon: 'lucide:moon' },
  { id: 'help', label: 'راهنما', icon: 'lucide:circle-help' },
];

export interface ReaderSection {
  id: string;
  title: string;
  page: number;
  children?: { id: string; title: string; page: number }[];
}

export const readerContents: ReaderSection[] = [
  { id: 'preface', title: 'پیشگفتار', page: 1 },
  { id: 'intro', title: 'مقدمه: نقش استراتژیک منابع انسانی', page: 1 },
  {
    id: 'ch1',
    title: 'فصل ۱: بنیادهای مدیریت منابع انسانی استراتژیک',
    page: 15,
    children: [
      { id: 'ch1-1', title: '۱.۱ تحول نگرش به منابع انسانی', page: 16 },
      { id: 'ch1-2', title: '۱.۲ مدل استراتژیک منابع انسانی', page: 22 },
      { id: 'ch1-3', title: '۱.۳ شایستگی‌های کلیدی HR آینده', page: 35 },
    ],
  },
  { id: 'ch2', title: 'فصل ۲: همسوسازی منابع انسانی و استراتژی', page: 53 },
  { id: 'ch3', title: 'فصل ۳: طراحی سیستم‌های منابع انسانی', page: 87 },
  { id: 'ch4', title: 'فصل ۴: مدیریت عملکرد و فرهنگ سازمانی', page: 124 },
  { id: 'ch5', title: 'فصل ۵: رهبری و تحول در منابع انسانی', page: 158 },
  { id: 'sources', title: 'منابع', page: 142 },
];

export interface ReaderSpread {
  /** Right-hand page under RTL — the section opener. */
  right: {
    number: number;
    kicker: string;
    title: string;
    art: string;
    quote: string;
  };
  /** Left-hand page — the running text. */
  left: {
    number: number;
    heading: string;
    title: string;
    paragraphs: string[];
    note: { title: string; body: string };
    questions: { title: string; items: string[] };
  };
}

export const readerSpread: ReaderSpread = {
  right: {
    number: 15,
    kicker: 'فصل ۱',
    title: 'بنیادهای مدیریت\nمنابع انسانی استراتژیک',
    art: `${B}/reader-chapter-art.png`,
    quote: 'منابع انسانی اگر به درستی مدیریت شود،\nمی‌تواند مزیت رقابتی پایدار برای سازمان ایجاد کند.',
  },
  left: {
    number: 16,
    heading: '۱.۱',
    title: 'تحول نگرش به منابع انسانی',
    paragraphs: [
      'در دهه‌های گذشته، نقش منابع انسانی از یک وظیفه اداری و پشتیبانی به یک نقش استراتژیک و تأثیرگذار در موفقیت سازمان‌ها تبدیل شده است. سازمان‌هایی که توانسته‌اند منابع انسانی خود را به عنوان شریک استراتژیک مدیران در نظر بگیرند، نتایج بهتری در عملکرد، نوآوری و رضایت کارکنان به دست آورده‌اند.',
      'مدیریت منابع انسانی استراتژیک به معنای تدوین و اجرای سیاست‌ها و رویه‌هایی است که با اهداف کلان سازمان همسو بوده و به تحقق مزیت رقابتی پایدار کمک می‌کند.',
    ],
    note: {
      title: 'نکته کلیدی',
      body: 'منابع انسانی استراتژیک یعنی انتخاب درست افراد، توسعه توانمندی‌ها و ایجاد فضایی که عملکرد عالی را ممکن سازد.',
    },
    questions: {
      title: 'سوالات کلیدی این فصل',
      items: [
        'تغییر نقش HR در سازمان‌های مدرن',
        'چرا همسوسازی استراتژیک اهمیت دارد؟',
        'چالش‌های پیش روی مدیران منابع انسانی',
        'مهارت‌های مورد نیاز مدیران HR آینده',
      ],
    },
  },
};

export const readerMeta = {
  thumb: `${B}/covers/reader-book-thumb.png`,
  progress: 24,
  totalPages: 142,
  currentPage: 16,
  chapterLabel: 'تحول نگرش به منابع انسانی',
  zoom: 100,
  downloadCta: 'دانلود کتاب',
};

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
