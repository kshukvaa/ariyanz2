/* ──────────────────────────────────────────────────────────────
   Ariyaz — مقالات content.

   Feeds two pages that share the design language of the free
   resources section:
     /articles       — the article listing
     /articles/[id]  — a single article

   Every article is assembled from the same template, so any id
   renders the identical layout with its own content.
   Artwork lives in /public/images/free.
────────────────────────────────────────────────────────────── */

import type { Tone } from '@/data/free';

const ART = '/images/free';

/* ══════════════════════════════════════════════════════════════
   Listing — /articles
══════════════════════════════════════════════════════════════ */

export const articleHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'رایگان اما کاربردی', href: '/library' },
    { label: 'مقالات تخصصی', href: '/articles' },
  ],
  title: 'مقالات کاربردی منابع انسانی، رهبری و مهارت‌های نرم',
  desc: [
    'جدیدترین و کاربردی‌ترین مقالات تخصصی در حوزه منابع انسانی، رهبری، مدیریت عملکرد، توسعه فردی و قوانین کار',
    'این بخش به صورت منظم به‌روزرسانی می‌شود',
  ],
  art: `${ART}/illustrations/hero-articles.png`,
};

/** Chips in the "موضوعات محبوب" rail above the toolbar. */
export const hotTopics = [
  'مدیریت عملکرد',
  'قوانین کار',
  'رهبری و مدیریت',
  'توسعه فردی',
  'تجربه کارکنان',
  'جذب و استخدام',
];

export const accessTabs = [
  { id: 'all', label: 'همه' },
  { id: 'free', label: 'رایگان' },
  { id: 'premium', label: 'ویژه', icon: 'lucide:star' },
] as const;

export type AccessTab = (typeof accessTabs)[number]['id'];

export const articleSorts = [
  { id: 'popular', label: 'پرمخاطب‌ترین' },
  { id: 'newest', label: 'جدیدترین' },
  { id: 'oldest', label: 'قدیمی‌ترین' },
];

export interface FacetNode {
  id: string;
  title: string;
  items: { id: string; label: string; count: number }[];
}

export const articleTopics: FacetNode[] = [
  {
    id: 'hr',
    title: 'منابع انسانی',
    items: [
      { id: 'hiring', label: 'جذب و استخدام', count: 7 },
      { id: 'performance', label: 'مدیریت عملکرد', count: 6 },
      { id: 'training', label: 'آموزش و توسعه', count: 5 },
      { id: 'digital', label: 'منابع انسانی دیجیتال', count: 4 },
      { id: 'experience', label: 'تجربه کارکنان', count: 4 },
      { id: 'tech', label: 'کاربرد فناوری در HR', count: 2 },
    ],
  },
  {
    id: 'leadership',
    title: 'مدیریت و رهبری',
    items: [
      { id: 'team', label: 'مدیریت تیم', count: 6 },
      { id: 'strategy', label: 'تفکر استراتژیک', count: 4 },
      { id: 'coaching', label: 'کوچینگ و بازخورد', count: 3 },
    ],
  },
  {
    id: 'soft',
    title: 'توسعه مهارت‌های نرم',
    items: [
      { id: 'communication', label: 'ارتباط مؤثر', count: 5 },
      { id: 'time', label: 'مدیریت زمان', count: 4 },
      { id: 'problem', label: 'حل مسئله', count: 3 },
    ],
  },
  {
    id: 'ethics',
    title: 'اخلاق حرفه‌ای',
    items: [
      { id: 'conduct', label: 'منشور رفتار سازمانی', count: 3 },
      { id: 'conflict', label: 'تعارض منافع', count: 2 },
    ],
  },
];

/** "نوع مقاله" — checkbox facets. */
export const articleKinds = [
  { id: 'guide', label: 'راهنمای جامع', count: 32 },
  { id: 'analysis', label: 'تحلیل عمیق', count: 28 },
  { id: 'howto', label: 'اجرایی / How to', count: 24 },
  { id: 'tool', label: 'ابزار محور', count: 18 },
  { id: 'research', label: 'پژوهشی / Evidence Based', count: 16 },
  { id: 'case', label: 'مورد کاوی', count: 14 },
  { id: 'compare', label: 'مقایسه‌ای / تصمیم‌یار', count: 12 },
];

/* ══════════════════════════════════════════════════════════════
   Article model
══════════════════════════════════════════════════════════════ */

export type ArticleTrack = 'performance' | 'leadership' | 'personal' | 'law';

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface ArticleSection {
  /** Anchor id, also used by the table of contents. */
  id: string;
  title: string;
  paragraphs: string[];
}

export interface ProcessStep {
  title: string;
  icon: string;
  tone: Tone;
}

export interface ResourceColumn {
  title: string;
  icon: string;
  tone: Tone;
  href: string;
  items: string[];
  /** Rich variant: cards with a thumbnail and a lesson count. */
  courses?: { title: string; meta: string; thumb: string }[];
}

export interface Comment {
  name: string;
  role: string;
  avatar: string;
  ago: string;
  stars: number;
  text: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  thumb: string;
  hero: string;
  category: string;
  categoryTone: Tone;
  topicId: string;
  kindId: string;
  access: 'free' | 'premium';
  author: Author;
  date: string;
  views: string;
  track: ArticleTrack;
  rating: { stars: number; count: string };
  /** Total comments, of which only the latest three are shown. */
  commentCount: string;
  /** Overrides the track's default body. */
  sections?: ArticleSection[];
}

export interface ArticleDetail extends Article {
  tags: string[];
  sections: ArticleSection[];
  steps: { intro: string; items: ProcessStep[] };
  resources: ResourceColumn[];
  suggestions: string[];
  comments: Comment[];
  related: Article[];
}

const A = (n: number) => `${ART}/avatars/reviewer-0${n}.png`;

const authors: Record<string, Author> = {
  ali: { name: 'علی محمدی', role: 'کارشناس ارزیابی عملکرد', avatar: A(2) },
  sara: { name: 'سارا احمدی', role: 'کارشناس توسعه سازمانی', avatar: A(1) },
  reza: { name: 'رضا عباسی', role: 'مشاور منابع انسانی', avatar: A(3) },
  maryam: { name: 'مریم رضایی', role: 'مدیر منابع انسانی', avatar: A(1) },
  team: { name: 'تیم محتوای آریاز', role: 'تیم تخصصی آریاز', avatar: A(2) },
};

/* ── Body templates, one per track ──────────────────────────── */

const performanceSections: ArticleSection[] = [
  {
    id: 'intro',
    title: 'مقدمه',
    paragraphs: [
      'ارزیابی عملکرد یکی از مهم‌ترین فرآیندهای منابع انسانی است که به بهبود و رشد کارکنان کمک می‌کند؛ اما نگاهی دقیق به مهم‌ترین نتایج سازمان‌ها نشان می‌دهد که در این مقاله به صورت گام‌به‌گام و کاربردی نشان می‌دهیم چگونه یک سیستم ارزیابی عملکرد اثربخش در سازمان طراحی کنید.',
    ],
  },
  {
    id: 'why',
    title: 'چرا ارزیابی عملکرد مهم است؟',
    paragraphs: [
      'یک سیستم ارزیابی خوب نه تنها به شناسایی نقاط قوت و ضعف عملکرد کمک می‌کند، بلکه ابزاری برای توسعه فردی، انگیزش، تصمیم‌گیری‌های انسانی و ایجاد فرهنگ عملکردمحور در سازمان است.',
    ],
  },
  {
    id: 'principles',
    title: 'اصول کلیدی در طراحی سیستم ارزیابی عملکرد',
    paragraphs: [
      'برای طراحی یک سیستم ارزیابی عملکرد باید اصول مختلفی مانند شفافیت، پیوند با اهداف سازمان، ساده‌سازی فرآیندها، بازخورد مستمر و توسعه در نظر گرفته شود.',
    ],
  },
  {
    id: 'steps',
    title: 'مراحل طراحی سیستم ارزیابی عملکرد',
    paragraphs: [],
  },
  {
    id: 'technology',
    title: 'نقش فناوری در ارزیابی عملکرد',
    paragraphs: [
      'استفاده از ابزارهای منابع انسانی و داشبوردهای تحلیلی، سرعت و شفافیت فرآیندهای ارزیابی را افزایش داده و تصمیم‌گیری‌های بهتری را پشتیبانی می‌کند.',
    ],
  },
  {
    id: 'challenges',
    title: 'چالش‌ها و راهکارهای ارزیابی',
    paragraphs: [
      'رایج‌ترین چالش‌ها سوگیری ارزیاب، شاخص‌های مبهم و بازخورد یک‌طرفه است. آموزش ارزیابان، تعریف دقیق شاخص و گفتگوی دوطرفه این سه مشکل را تا حد زیادی برطرف می‌کند.',
    ],
  },
  {
    id: 'mistakes',
    title: 'اشتباهات رایج در ارزیابی عملکرد',
    paragraphs: [
      'تمرکز بر گذشته به جای بهبود آینده، ارزیابی سالانه بدون بازخورد میان‌دوره‌ای و گره زدن همه‌چیز به پاداش، سه اشتباهی است که اثربخشی سیستم را از بین می‌برد.',
    ],
  },
  {
    id: 'improve',
    title: 'راهکارهایی برای بهبود ارزیابی',
    paragraphs: [
      'چرخه بازخورد را کوتاه کنید، شاخص‌ها را به تعداد کم و قابل سنجش نگه دارید و برای هر ارزیابی یک برنامه توسعه فردی مشخص تعریف کنید.',
    ],
  },
  {
    id: 'conclusion',
    title: 'جمع‌بندی و نکات پایانی',
    paragraphs: [
      'سیستم ارزیابی عملکرد زمانی موفق است که کارکنان آن را ابزاری برای رشد بدانند، نه ابزاری برای قضاوت. از یک نسخه ساده شروع کنید و آن را بر پایه بازخورد واقعی سازمان بهبود دهید.',
    ],
  },
];

const trackSections: Record<ArticleTrack, ArticleSection[]> = {
  performance: performanceSections,
  leadership: [
    {
      id: 'intro',
      title: 'مقدمه',
      paragraphs: [
        'رهبری اثربخش یک سبک ثابت نیست؛ مجموعه‌ای از تصمیم‌هاست که متناسب با بلوغ تیم و شرایط کار تنظیم می‌شود. در این مقاله چارچوبی عملی برای انتخاب سبک درست ارائه می‌شود.',
      ],
    },
    {
      id: 'why',
      title: 'چرا سبک رهبری اهمیت دارد؟',
      paragraphs: [
        'سبک رهبری مستقیماً بر انگیزش، سرعت تصمیم‌گیری و ماندگاری افراد اثر می‌گذارد. یک سبک نامتناسب می‌تواند تیمی توانمند را کند و بی‌انگیزه کند.',
      ],
    },
    {
      id: 'principles',
      title: 'اصول کلیدی رهبری تیم',
      paragraphs: [
        'شفافیت در انتظارات، تفویض اختیار متناسب با آمادگی افراد، بازخورد به‌موقع و پیگیری منظم، چهار ستون رهبری روزمره‌اند.',
      ],
    },
    { id: 'steps', title: 'مراحل ساخت یک تیم اثربخش', paragraphs: [] },
    {
      id: 'technology',
      title: 'نقش ابزارها در هماهنگی تیم',
      paragraphs: [
        'ابزارهای هدف‌گذاری و پیگیری، جلسات را کوتاه‌تر و تصمیم‌ها را قابل ردیابی می‌کنند؛ اما جایگزین گفتگوی مستقیم نمی‌شوند.',
      ],
    },
    {
      id: 'challenges',
      title: 'چالش‌های رایج مدیران',
      paragraphs: [
        'مدیریت ذره‌بینی، اجتناب از گفتگوهای دشوار و نبود معیار روشن برای موفقیت، سه چالشی است که بیشترین هزینه را به تیم تحمیل می‌کند.',
      ],
    },
    {
      id: 'mistakes',
      title: 'اشتباهات رایج در رهبری',
      paragraphs: [
        'یکسان رفتار کردن با همه اعضا، پاداش دادن به شلوغ‌کاری به جای نتیجه، و به تعویق انداختن بازخورد منفی تا جلسه ارزیابی سالانه.',
      ],
    },
    {
      id: 'improve',
      title: 'راهکارهایی برای رشد به‌عنوان رهبر',
      paragraphs: [
        'جلسات یک‌به‌یک منظم برگزار کنید، از تیم بازخورد بگیرید و هر فصل یک مهارت رهبری مشخص را برای تمرین انتخاب کنید.',
      ],
    },
    {
      id: 'conclusion',
      title: 'جمع‌بندی و نکات پایانی',
      paragraphs: [
        'رهبری مهارتی آموختنی است. با یک تغییر کوچک و پایدار در رفتار روزمره شروع کنید و اثر آن را بر تیم بسنجید.',
      ],
    },
  ],
  personal: [
    {
      id: 'intro',
      title: 'مقدمه',
      paragraphs: [
        'رشد فردی نتیجه تصمیم‌های کوچک و تکرارشونده است، نه جهش‌های ناگهانی. این مقاله نشان می‌دهد چگونه یک سیستم شخصی بسازید که به انگیزه لحظه‌ای وابسته نباشد.',
      ],
    },
    {
      id: 'why',
      title: 'چرا سیستم بر انگیزه اولویت دارد؟',
      paragraphs: [
        'انگیزه نوسان دارد؛ سیستم نه. وقتی رفتار مطلوب را به یک روتین مشخص گره بزنید، اجرای آن دیگر به حال‌وهوای روزانه وابسته نیست.',
      ],
    },
    {
      id: 'principles',
      title: 'اصول کلیدی عادت‌سازی',
      paragraphs: [
        'کوچک شروع کنید، عادت جدید را به یک عادت موجود بچسبانید، پیشرفت را ثبت کنید و برای روزهای شکست از قبل برنامه داشته باشید.',
      ],
    },
    { id: 'steps', title: 'مراحل ساخت یک روتین پایدار', paragraphs: [] },
    {
      id: 'technology',
      title: 'نقش ابزارها در پیگیری پیشرفت',
      paragraphs: [
        'ردیاب عادت و تقویم زمان‌بندی‌شده، بازخورد بصری می‌دهند و همین بازخورد ساده احتمال ادامه دادن را بالا می‌برد.',
      ],
    },
    {
      id: 'challenges',
      title: 'چالش‌های مسیر رشد فردی',
      paragraphs: [
        'اهداف بیش از حد بزرگ، مقایسه با دیگران و نبود زمان محافظت‌شده برای کارهای مهم، سه مانع اصلی هستند.',
      ],
    },
    {
      id: 'mistakes',
      title: 'اشتباهات رایج',
      paragraphs: [
        'شروع همزمان چند عادت، اندازه‌گیری نکردن پیشرفت و رها کردن کل برنامه بعد از یک روز شکست.',
      ],
    },
    {
      id: 'improve',
      title: 'راهکارهایی برای پایداری بیشتر',
      paragraphs: [
        'هفته‌ای یک بار مرور کنید، اهداف را به کوچک‌ترین گام قابل اجرا بشکنید و قاعده «هرگز دو بار پشت‌سرهم جا نینداز» را رعایت کنید.',
      ],
    },
    {
      id: 'conclusion',
      title: 'جمع‌بندی و نکات پایانی',
      paragraphs: [
        'یک عادت کوچک که هر روز اجرا شود، از یک برنامه بلندبالا که هفته‌ای یک بار انجام می‌شود اثر بیشتری دارد.',
      ],
    },
  ],
  law: [
    {
      id: 'intro',
      title: 'مقدمه',
      paragraphs: [
        'آگاهی از قوانین کار و تأمین اجتماعی هم از کارفرما و هم از کارکنان محافظت می‌کند. این مقاله مهم‌ترین نکات کاربردی را بدون پیچیدگی حقوقی مرور می‌کند.',
      ],
    },
    {
      id: 'why',
      title: 'چرا شناخت قوانین اهمیت دارد؟',
      paragraphs: [
        'بیشتر اختلافات کاری نه از بدنیتی، که از برداشت متفاوت طرفین از قرارداد و مقررات ناشی می‌شود. شفافیت حقوقی از همان روز اول هزینه‌های بعدی را حذف می‌کند.',
      ],
    },
    {
      id: 'principles',
      title: 'اصول کلیدی قرارداد کار',
      paragraphs: [
        'نوع قرارداد، مدت، شرح وظایف، مزد و مزایا، ساعت کار و شرایط خاتمه، شش موردی است که باید صریح و مکتوب باشد.',
      ],
    },
    { id: 'steps', title: 'مراحل تنظیم و ثبت قرارداد', paragraphs: [] },
    {
      id: 'technology',
      title: 'نقش سامانه‌ها و مستندسازی',
      paragraphs: [
        'نگهداری منظم سوابق، احکام و مکاتبات در یک سامانه، در زمان بازرسی یا اختلاف مهم‌ترین پشتوانه سازمان است.',
      ],
    },
    {
      id: 'challenges',
      title: 'چالش‌های رایج حقوقی',
      paragraphs: [
        'محاسبه اشتباه سنوات و مرخصی، ابهام در ساعت کار مؤثر و نبود مستندات برای عملکرد ضعیف، پرتکرارترین موارد اختلاف‌اند.',
      ],
    },
    {
      id: 'mistakes',
      title: 'اشتباهات رایج کارفرمایان',
      paragraphs: [
        'استفاده از قرارداد نمونه بدون تطبیق با شرایط واقعی، توافق شفاهی درباره مزایا و به‌روز نکردن قراردادها پس از تغییر قوانین.',
      ],
    },
    {
      id: 'improve',
      title: 'راهکارهایی برای انطباق بهتر',
      paragraphs: [
        'یک چک‌لیست انطباق سالانه تهیه کنید، بخشنامه‌های جدید را پیگیری کنید و پیش از هر تغییر ساختاری مشورت حقوقی بگیرید.',
      ],
    },
    {
      id: 'conclusion',
      title: 'جمع‌بندی و نکات پایانی',
      paragraphs: [
        'قرارداد روشن و مستندسازی منظم، ارزان‌ترین بیمه‌ای است که یک سازمان می‌تواند برای خود بخرد.',
      ],
    },
  ],
};

/** The five-circle diagram that sits inside the «مراحل» section. */
const trackSteps: Record<ArticleTrack, { intro: string; items: ProcessStep[] }> = {
  performance: {
    intro: 'فرآیند طراحی سیستم ارزیابی عملکرد شامل ۵ مرحله اصلی است:',
    items: [
      { title: 'تحلیل اهداف سازمانی', icon: 'lucide:target', tone: 'violet' },
      { title: 'طراحی مدل ارزیابی و شاخص‌ها', icon: 'lucide:clipboard-list', tone: 'blue' },
      { title: 'اجرای پایلوت و بازبینی', icon: 'lucide:users-round', tone: 'green' },
      { title: 'اجرای کامل و آموزش', icon: 'lucide:message-square-text', tone: 'orange' },
      { title: 'پایش و بهبود مستمر', icon: 'lucide:chart-column', tone: 'rose' },
    ],
  },
  leadership: {
    intro: 'ساخت یک تیم اثربخش معمولاً ۵ مرحله دارد:',
    items: [
      { title: 'شناخت وضعیت تیم', icon: 'lucide:target', tone: 'violet' },
      { title: 'تعریف اهداف مشترک', icon: 'lucide:clipboard-list', tone: 'blue' },
      { title: 'تفویض و توانمندسازی', icon: 'lucide:users-round', tone: 'green' },
      { title: 'بازخورد و جلسات یک‌به‌یک', icon: 'lucide:message-square-text', tone: 'orange' },
      { title: 'سنجش و بهبود مستمر', icon: 'lucide:chart-column', tone: 'rose' },
    ],
  },
  personal: {
    intro: 'ساخت یک روتین پایدار در ۵ گام انجام می‌شود:',
    items: [
      { title: 'شناخت نقطه شروع', icon: 'lucide:target', tone: 'violet' },
      { title: 'تعریف کوچک‌ترین گام', icon: 'lucide:clipboard-list', tone: 'blue' },
      { title: 'اتصال به عادت موجود', icon: 'lucide:users-round', tone: 'green' },
      { title: 'ثبت و پیگیری روزانه', icon: 'lucide:message-square-text', tone: 'orange' },
      { title: 'مرور و بهبود هفتگی', icon: 'lucide:chart-column', tone: 'rose' },
    ],
  },
  law: {
    intro: 'تنظیم و ثبت یک قرارداد کار استاندارد ۵ مرحله دارد:',
    items: [
      { title: 'تعیین نوع همکاری', icon: 'lucide:target', tone: 'violet' },
      { title: 'تدوین شرح وظایف', icon: 'lucide:clipboard-list', tone: 'blue' },
      { title: 'توافق بر مزد و مزایا', icon: 'lucide:users-round', tone: 'green' },
      { title: 'امضا و ابلاغ رسمی', icon: 'lucide:message-square-text', tone: 'orange' },
      { title: 'بایگانی و بازنگری دوره‌ای', icon: 'lucide:chart-column', tone: 'rose' },
    ],
  },
};

/* ── Related-resource columns, right-to-left as on screen ───── */

const courseThumb = (n: string) => `${ART}/articles/${n}.png`;

const trackResources: Record<ArticleTrack, ResourceColumn[]> = {
  performance: [
    {
      title: 'ایجنت‌های مرتبط',
      icon: 'lucide:bot',
      tone: 'violet',
      href: '/agents',
      items: ['ایجنت تحلیل عملکرد', 'ایجنت مشاور KPI', 'ایجنت بازخوردساز'],
    },
    {
      title: 'دوره‌های مرتبط',
      icon: 'lucide:graduation-cap',
      tone: 'green',
      href: '/courses',
      items: [],
      courses: [
        { title: 'مدیریت عملکرد پیشرفته', meta: '۱۲ جلسه', thumb: courseThumb('kpi-guide') },
        { title: 'ارزیابی عملکرد کارکنان', meta: '۸ جلسه', thumb: courseThumb('kpi-indicators') },
        { title: 'طراحی KPI کاربردی', meta: '۶ جلسه', thumb: courseThumb('data-driven-decisions') },
      ],
    },
    {
      title: 'مسیرهای یادگیری مرتبط',
      icon: 'lucide:route',
      tone: 'orange',
      href: '/learning-paths',
      items: ['اصول مدیریت عملکرد', 'توسعه مهارت‌های رهبری', 'مدیریت بازخورد مؤثر'],
    },
    {
      title: 'ابزارهای مرتبط',
      icon: 'lucide:calculator',
      tone: 'indigo',
      href: '/tools',
      items: ['محاسبه‌گر امتیاز عملکرد', 'داشبورد KPI پیشرفته', 'چک‌لیست ارزیابی عملکرد'],
    },
    {
      title: 'فرم‌ها و دستورالعمل‌های مرتبط',
      icon: 'lucide:file-text',
      tone: 'rose',
      href: '/tools',
      items: ['فرم ارزیابی دوره‌ای', 'فرم بازخورد ۳۶۰ درجه', 'چک‌لیست جلسه ارزیابی'],
    },
  ],
  leadership: [
    {
      title: 'ایجنت‌های مرتبط',
      icon: 'lucide:bot',
      tone: 'violet',
      href: '/agents',
      items: ['ایجنت کوچ مدیریتی', 'ایجنت طراحی جلسه', 'ایجنت تصمیم‌گیری'],
    },
    {
      title: 'دوره‌های مرتبط',
      icon: 'lucide:graduation-cap',
      tone: 'green',
      href: '/courses',
      items: [],
      courses: [
        { title: 'مدیران تازه‌وارد', meta: '۱۰ جلسه', thumb: courseThumb('leadership-strategies') },
        { title: 'رهبری تحول‌آفرین', meta: '۹ جلسه', thumb: courseThumb('strong-culture') },
        { title: 'مدیریت تیم‌های چندنسلی', meta: '۶ جلسه', thumb: courseThumb('competency-interview') },
      ],
    },
    {
      title: 'مسیرهای یادگیری مرتبط',
      icon: 'lucide:route',
      tone: 'orange',
      href: '/learning-paths',
      items: ['مسیر مدیران و رهبران', 'تفکر استراتژیک', 'کوچینگ تیمی'],
    },
    {
      title: 'ابزارهای مرتبط',
      icon: 'lucide:calculator',
      tone: 'indigo',
      href: '/tools',
      items: ['ماتریس اولویت‌بندی', 'داشبورد اهداف تیم', 'الگوی برنامه ۹۰ روزه'],
    },
    {
      title: 'فرم‌ها و دستورالعمل‌های مرتبط',
      icon: 'lucide:file-text',
      tone: 'rose',
      href: '/tools',
      items: ['دستورالعمل جلسات تیمی', 'فرم تفویض اختیار', 'راهنمای جلسه یک‌به‌یک'],
    },
  ],
  personal: [
    {
      title: 'ایجنت‌های مرتبط',
      icon: 'lucide:bot',
      tone: 'violet',
      href: '/agents',
      items: ['ایجنت برنامه‌ریزی هفتگی', 'ایجنت عادت‌سازی', 'ایجنت توسعه فردی'],
    },
    {
      title: 'دوره‌های مرتبط',
      icon: 'lucide:graduation-cap',
      tone: 'green',
      href: '/courses',
      items: [],
      courses: [
        { title: 'مدیریت بر خود', meta: '۸ جلسه', thumb: courseThumb('daily-habits') },
        { title: 'تفکر خلاق و حل مسئله', meta: '۶ جلسه', thumb: courseThumb('future-skills-2035') },
        { title: 'ارتباطات بین‌فردی', meta: '۷ جلسه', thumb: courseThumb('strong-culture') },
      ],
    },
    {
      title: 'مسیرهای یادگیری مرتبط',
      icon: 'lucide:route',
      tone: 'orange',
      href: '/learning-paths',
      items: ['مسیر توسعه فردی', 'مدیریت زمان', 'هوش هیجانی'],
    },
    {
      title: 'ابزارهای مرتبط',
      icon: 'lucide:calculator',
      tone: 'indigo',
      href: '/tools',
      items: ['ماتریس آیزنهاور', 'ردیاب عادت‌ها', 'تایمر تمرکز'],
    },
    {
      title: 'فرم‌ها و دستورالعمل‌های مرتبط',
      icon: 'lucide:file-text',
      tone: 'rose',
      href: '/tools',
      items: ['الگوی برنامه هفتگی', 'فرم اهداف شخصی', 'چک‌لیست تمرکز روزانه'],
    },
  ],
  law: [
    {
      title: 'ایجنت‌های مرتبط',
      icon: 'lucide:bot',
      tone: 'violet',
      href: '/agents',
      items: ['ایجنت قانون کار', 'ایجنت محاسبه سنوات', 'ایجنت بررسی قرارداد'],
    },
    {
      title: 'دوره‌های مرتبط',
      icon: 'lucide:graduation-cap',
      tone: 'green',
      href: '/courses',
      items: [],
      courses: [
        { title: 'قانون کار کاربردی', meta: '۱۰ جلسه', thumb: courseThumb('labour-law-1406') },
        { title: 'قراردادهای کار', meta: '۷ جلسه', thumb: courseThumb('contracts-legal') },
        { title: 'حقوق و دستمزد', meta: '۹ جلسه', thumb: courseThumb('turnover-analysis') },
      ],
    },
    {
      title: 'مسیرهای یادگیری مرتبط',
      icon: 'lucide:route',
      tone: 'orange',
      href: '/learning-paths',
      items: ['مسیر اداری و کارگزینی', 'تأمین اجتماعی', 'روابط کار'],
    },
    {
      title: 'ابزارهای مرتبط',
      icon: 'lucide:calculator',
      tone: 'indigo',
      href: '/tools',
      items: ['محاسبه‌گر حقوق و مزایا', 'محاسبه‌گر سنوات', 'چک‌لیست انطباق قانونی'],
    },
    {
      title: 'فرم‌ها و دستورالعمل‌های مرتبط',
      icon: 'lucide:file-text',
      tone: 'rose',
      href: '/tools',
      items: ['نمونه قرارداد کار', 'فرم تسویه حساب', 'چک‌لیست بازرسی'],
    },
  ],
};

/** Chips under the access tabs; the article's own category leads. */
const trackTags: Record<ArticleTrack, string[]> = {
  performance: ['منابع انسانی', 'KPI', 'ارزیابی عملکرد', 'سیستم عملکرد'],
  leadership: ['منابع انسانی', 'رهبری', 'مدیریت تیم', 'فرهنگ سازمانی'],
  personal: ['توسعه فردی', 'عادت‌سازی', 'مدیریت زمان', 'بهره‌وری'],
  law: ['قانون کار', 'تأمین اجتماعی', 'قرارداد', 'روابط کار'],
};

const trackSuggestions: Record<ArticleTrack, string[]> = {
  performance: ['خلاصه این مقاله', 'نکات کلیدی مقاله چیست؟', 'مثال واقعی بزن', 'سوال دارم'],
  leadership: ['خلاصه این مقاله', 'نکات کلیدی مقاله چیست؟', 'چطور در تیمم اجرا کنم؟', 'سوال دارم'],
  personal: ['خلاصه این مقاله', 'نکات کلیدی مقاله چیست؟', 'یک برنامه ۷ روزه بده', 'سوال دارم'],
  law: ['خلاصه این مقاله', 'نکات کلیدی مقاله چیست؟', 'یک مثال قراردادی بزن', 'سوال دارم'],
};

export const aiAgentPanel = {
  title: 'ایجنت هوشمند آریاز',
  status: 'آنلاین',
  greeting: 'سلام! من ایجنت آریاز هستم، چطور می‌تونم کمکتون کنم؟',
  placeholder: 'سوال خود را بنویسید',
  footer: 'Powered by Ariyaz AI',
};

const defaultComments: Comment[] = [
  {
    name: 'مریم رضایی',
    role: 'مدیر منابع انسانی',
    avatar: A(1),
    ago: '۲ روز پیش',
    stars: 4,
    text: 'مقاله بسیار کاربردی و کامل بود، مراحل طراحی سیستم ارزیابی عملکرد خیلی خوب توضیح داده شده.',
  },
  {
    name: 'علی حسینی',
    role: 'مدیر توسعه سازمانی',
    avatar: A(2),
    ago: '۳ روز پیش',
    stars: 4,
    text: 'محتوای ارزشمندی بود و راهکارهای عملی داشت.',
  },
  {
    name: 'ترکی محمدی',
    role: 'کارشناس ارزیابی عملکرد',
    avatar: A(3),
    ago: '۶ روز پیش',
    stars: 4,
    text: 'از فرم‌ها و ابزارهای معرفی‌شده خیلی استفاده کردیم، ممنون از تیم خوب آریاز.',
  },
];

/* ── The catalogue ──────────────────────────────────────────── */

interface Seed extends Omit<Article, 'thumb' | 'hero' | 'rating' | 'commentCount'> {
  thumbFile: string;
  heroFile?: string;
  rating?: Article['rating'];
  commentCount?: string;
}

const seeds: Seed[] = [
  {
    id: '1',
    title: 'چگونه یک سیستم ارزیابی عملکرد اثربخش طراحی کنیم؟',
    excerpt:
      'راهنمای کامل طراحی یک سیستم ارزیابی عملکرد مدرن و اثربخش که به رشد فردی کارکنان و نتایج بهتر منجر می‌شود',
    thumbFile: 'kpi-guide',
    heroFile: 'article-hero-performance',
    category: 'مدیریت عملکرد',
    categoryTone: 'orange',
    topicId: 'performance',
    kindId: 'guide',
    access: 'free',
    author: authors.team,
    date: '۱۴۰۳/۱۲/۲۴',
    views: '۸.۲K',
    track: 'performance',
    rating: { stars: 4, count: '۱۱۲۴' },
    commentCount: '۲۱',
    sections: performanceSections,
  },
  {
    id: '2',
    title: 'جدیدترین تغییرات قوانین کار در سال ۱۴۰۶ که باید بدانید',
    excerpt: 'مروری بر مهم‌ترین تغییرات قانونی و اثر آن بر کارفرمایان و کارکنان',
    thumbFile: 'labour-law-1406',
    category: 'قوانین و روابط کار',
    categoryTone: 'green',
    topicId: 'law',
    kindId: 'guide',
    access: 'free',
    author: authors.ali,
    date: '۱۴۰۳/۱۲/۱۸',
    views: '۲.۹K',
    track: 'law',
  },
  {
    id: '3',
    title: 'راهنمای تعیین KPI مؤثر در ارزیابی عملکرد',
    excerpt: 'با این راهنما چند گام تا تعریف و ارزیابی درست شاخص‌های کلیدی عملکرد فاصله دارید',
    thumbFile: 'kpi-guide',
    category: 'مدیریت عملکرد',
    categoryTone: 'orange',
    topicId: 'performance',
    kindId: 'howto',
    access: 'free',
    author: authors.ali,
    date: '۱۴۰۳/۱۲/۲۰',
    views: '۳.۲K',
    track: 'performance',
  },
  {
    id: '4',
    title: 'استراتژی‌های رهبری موفق در سازمان‌های امروزی',
    excerpt: 'راهکارهای عملی برای تبدیل شدن به رهبری تأثیرگذار و الهام‌بخش',
    thumbFile: 'leadership-strategies',
    category: 'رهبری و مدیریت',
    categoryTone: 'blue',
    topicId: 'leadership',
    kindId: 'analysis',
    access: 'premium',
    author: authors.sara,
    date: '۱۴۰۳/۱۲/۲۲',
    views: '۳.۶K',
    track: 'leadership',
  },
  {
    id: '5',
    title: 'چگونه AI آینده منابع انسانی را متحول می‌کند؟',
    excerpt: 'بررسی کاربردهای هوش مصنوعی در جذب، توسعه و نگهداشت کارکنان',
    thumbFile: 'ai-future-hr',
    category: 'منابع انسانی',
    categoryTone: 'violet',
    topicId: 'digital',
    kindId: 'analysis',
    access: 'free',
    author: authors.reza,
    date: '۱۴۰۳/۱۲/۲۴',
    views: '۴.۸K',
    track: 'leadership',
  },
  {
    id: '6',
    title: 'چگونه فرهنگ سازمانی مثبت و پویا ایجاد کنیم؟',
    excerpt: 'راهکارهای عملی برای ساخت فرهنگی که تعهد و همدلی کارکنان را تقویت می‌کند',
    thumbFile: 'strong-culture',
    category: 'رهبری و مدیریت',
    categoryTone: 'blue',
    topicId: 'leadership',
    kindId: 'guide',
    access: 'free',
    author: authors.maryam,
    date: '۱۴۰۳/۱۲/۱۰',
    views: '۱.۹K',
    track: 'leadership',
  },
  {
    id: '7',
    title: 'نقش داده و تحلیل در تصمیم‌گیری‌های منابع انسانی',
    excerpt: 'چگونه با تحلیل داده‌های منابع انسانی، سازمان هوشمندتر و چابک‌تری بسازیم؟',
    thumbFile: 'data-driven-decisions',
    category: 'منابع انسانی',
    categoryTone: 'violet',
    topicId: 'digital',
    kindId: 'research',
    access: 'premium',
    author: authors.reza,
    date: '۱۴۰۳/۱۲/۱۲',
    views: '۲.۰K',
    track: 'performance',
  },
  {
    id: '8',
    title: 'چگونه عادت‌های روزانه خود را برای موفقیت تغییر دهیم؟',
    excerpt: 'راهکارهای عملی برای ساخت عادت‌های مثبت و پایدار که شما را به اهداف بزرگ نزدیک می‌کند',
    thumbFile: 'daily-habits',
    category: 'توسعه فردی',
    categoryTone: 'green',
    topicId: 'time',
    kindId: 'howto',
    access: 'free',
    author: authors.sara,
    date: '۱۴۰۳/۱۲/۱۴',
    views: '۲.۱K',
    track: 'personal',
  },
  {
    id: '9',
    title: 'مصاحبه شایستگی‌محور چیست و چگونه انجام می‌شود؟',
    excerpt: 'با رویکردی جامع، ساختارمند و مبتنی بر شواهد، شایسته‌ترین افراد را جذب کنید',
    thumbFile: 'competency-interview',
    category: 'جذب و استخدام',
    categoryTone: 'rose',
    topicId: 'hiring',
    kindId: 'howto',
    access: 'free',
    author: authors.maryam,
    date: '۱۴۰۳/۱۲/۱۶',
    views: '۲.۷K',
    track: 'leadership',
  },
  {
    id: '10',
    title: 'تحلیل روند ترک خدمت کارکنان و راهکارهای کاهش آن',
    excerpt: 'تحلیل عوامل مؤثر بر ترک خدمت و راهکارهای مؤثر برای کاهش آن در تیم‌ها و سازمان‌ها',
    thumbFile: 'turnover-analysis',
    category: 'تحلیل سازمانی',
    categoryTone: 'rose',
    topicId: 'experience',
    kindId: 'case',
    access: 'premium',
    author: authors.maryam,
    date: '۱۴۰۳/۱۲/۲۲',
    views: '۱.۸K',
    track: 'performance',
  },
  {
    id: '11',
    title: 'آشنایی با قراردادهای کاری و نکات حقوقی مهم',
    excerpt: 'راهنمای کامل بندها، تعهدات و نکات کلیدی برای کارفرمایان و کارکنان',
    thumbFile: 'contracts-legal',
    category: 'قوانین و روابط کار',
    categoryTone: 'green',
    topicId: 'law',
    kindId: 'guide',
    access: 'free',
    author: authors.reza,
    date: '۱۴۰۳/۱۲/۰۴',
    views: '۱.۷K',
    track: 'law',
  },
  {
    id: '12',
    title: 'آینده کار و مهارت‌های موردنیاز در سال ۲۰۳۵',
    excerpt: 'نگاهی به مهارت‌هایی که بیش از هر چیز موردنیاز خواهد بود',
    thumbFile: 'future-skills-2035',
    category: 'منابع انسانی',
    categoryTone: 'violet',
    topicId: 'training',
    kindId: 'analysis',
    access: 'free',
    author: authors.sara,
    date: '۱۴۰۳/۱۲/۰۶',
    views: '۲.۲K',
    track: 'personal',
  },
  {
    id: '13',
    title: 'شاخص‌های کلیدی عملکرد (KPI) در منابع انسانی',
    excerpt: 'راهنمای جامع انتخاب و پیاده‌سازی مهم‌ترین KPIهای منابع انسانی',
    thumbFile: 'kpi-indicators',
    category: 'مدیریت عملکرد',
    categoryTone: 'orange',
    topicId: 'performance',
    kindId: 'tool',
    access: 'free',
    author: authors.ali,
    date: '۱۴۰۳/۱۲/۰۸',
    views: '۲.۴K',
    track: 'performance',
  },
];

const defaultRating: Article['rating'] = { stars: 4, count: '۸۳۶' };

export const articles: Article[] = seeds.map(
  ({ thumbFile, heroFile, rating, commentCount, ...a }) => ({
    ...a,
    thumb: `${ART}/articles/${thumbFile}.png`,
    hero: heroFile ? `${ART}/illustrations/${heroFile}.png` : `${ART}/articles/${thumbFile}.png`,
    rating: rating ?? defaultRating,
    commentCount: commentCount ?? '۱۲',
  })
);

export const articleIds = articles.map((a) => a.id);

export function getArticle(id: string): ArticleDetail | undefined {
  const article = articles.find((a) => a.id === id);
  if (!article) return undefined;

  const related = [
    ...articles.filter((a) => a.id !== id && a.track === article.track),
    ...articles.filter((a) => a.id !== id && a.track !== article.track),
  ].slice(0, 4);

  return {
    ...article,
    tags: [article.category, ...trackTags[article.track]],
    sections: article.sections ?? trackSections[article.track],
    steps: trackSteps[article.track],
    resources: trackResources[article.track],
    suggestions: trackSuggestions[article.track],
    comments: defaultComments,
    related,
  };
}
