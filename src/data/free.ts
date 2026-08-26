/* ──────────────────────────────────────────────────────────────
   Ariyaz — "رایگان اما کاربردی" content.

   Feeds three pages that share one design language:
     /library      — the free-resources hub
     /videos       — free video listing
     /videos/[id]  — a single free video

   Every video is built from the same template, so any id renders
   the identical layout with its own content.
   Icon names are Iconify ids; artwork lives in /public/images/free.
────────────────────────────────────────────────────────────── */

/* ── Palette ────────────────────────────────────────────────── */

/** Read off the mockups; `navy` matches the site header. */
export const freeTheme = {
  navy: '#16305B',
  blue: '#3B4FD8',
  orange: '#F97316',
  page: '#F7F8FC',
  border: '#E7E9F4',
} as const;

/** Accent families shared by category cards, badges and resource columns. */
export const tones = {
  blue: { text: '#2563EB', bg: '#EAF1FE', soft: '#F6F9FF', ring: '#DCE6FD' },
  green: { text: '#059669', bg: '#E7F7EF', soft: '#F4FBF8', ring: '#D3F0E2' },
  orange: { text: '#EA6E0C', bg: '#FDEEE0', soft: '#FFF9F3', ring: '#FBDFC6' },
  violet: { text: '#7C3AED', bg: '#F1E9FE', soft: '#FBF8FF', ring: '#E7DBFD' },
  rose: { text: '#E11D48', bg: '#FDE8EC', soft: '#FFF6F8', ring: '#FBD5DD' },
  indigo: { text: '#4338CA', bg: '#E8E9FC', soft: '#F7F7FF', ring: '#DADCF9' },
} as const;

export type Tone = keyof typeof tones;

const ART = '/images/free';

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** "۴.۷" → 4.7, "۵.۲K" → 5.2 — copy is authored in Persian digits. */
export function toLatinNumber(value: string): number {
  return parseFloat(value.replace(/[۰-۹]/g, (c) => String(PERSIAN_DIGITS.indexOf(c))));
}

/** "۰۶:۱۲" → 6.2 minutes, good enough to sort by length. */
export function durationToMinutes(value: string): number {
  const [m, s] = value.split(':').map(toLatinNumber);
  return m + (s || 0) / 60;
}

/* ══════════════════════════════════════════════════════════════
   Page 1 — /library  ·  the free-resources hub
══════════════════════════════════════════════════════════════ */

export const hubHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'رایگان اما کاربردی', href: '/library' },
  ],
  /* The headline breaks over two lines; `accent` is the orange word. */
  titleTop: 'یادگیری تخصصی منابع انسانی را',
  accent: 'رایگان',
  titleRest: 'شروع کنید',
  desc:
    'در آریاز به مجموعه‌ای از مقالات تخصصی، ویدئوهای آموزشی، ابزارهای کاربردی و ایجنت‌های هوشمند دسترسی دارید؛ منابع حرفه‌ای که برای یادگیری و توسعه واقعی طراحی شده‌اند را به صورت رایگان استفاده کنید.',
  art: `${ART}/illustrations/hero-free-resources-transparent.png`,
};

export const hubBenefits = [
  {
    icon: 'lucide:book-open',
    title: 'دسترسی آسان به دانش تخصصی',
    desc: 'دانش پایه باید برای همه در دسترس، ساده و کاربردی باشد.',
  },
  {
    icon: 'lucide:trending-up',
    title: 'توسعه مستمر مهارت‌ها',
    desc: 'رشد واقعی با یادگیری و استفاده مستمر از منابع کاربردی اتفاق می‌افتد.',
  },
  {
    icon: 'lucide:graduation-cap',
    title: 'یادگیری قبل از تصمیم‌گیری',
    desc: 'پیش از استفاده از خدمات تخصصی، با کیفیت و رویکرد ما آشنا شوید.',
  },
  {
    icon: 'lucide:users-round',
    title: 'رشد جامعه حرفه‌ای',
    desc: 'با اشتراک دانش و تجربه، جامعه‌ای قوی‌تر از افراد و سازمان‌ها می‌سازیم.',
  },
];

export interface HubCategory {
  icon: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

export const hubCategories: HubCategory[] = [
  {
    icon: 'lucide:square-play',
    title: 'ویدئوهای رایگان',
    desc: 'آموزش‌های کاربردی برای توسعه مهارت‌های مدیریتی و حرفه‌ای',
    cta: 'مشاهده ویدئوها',
    href: '/videos',
  },
  {
    icon: 'lucide:file-text',
    title: 'مقالات تخصصی',
    desc: 'مقاله‌ها و منابع منتخب برای یادگیری عمیق‌تر',
    cta: 'مطالعه مقالات',
    href: '/articles',
  },
  {
    icon: 'lucide:book-open',
    title: 'کتاب‌های تخصصی',
    desc: 'کتاب‌ها و مطالب منتخب هر حوزه برای یادگیری عمیق‌تر',
    cta: 'مشاهده کتاب‌ها',
    href: '/books',
  },
  {
    icon: 'lucide:scale',
    title: 'قوانین کار و تأمین اجتماعی',
    desc: 'قوانین، بخشنامه‌ها و منابع کاربردی حقوقی',
    cta: 'مشاهده قوانین',
    href: '/laws',
  },
  {
    icon: 'lucide:brain-circuit',
    title: 'تست‌ها و پرسشنامه‌ها',
    desc: 'ابزارهای خودشناسی شغلی و سازمانی',
    cta: 'انجام تست',
    href: '/exams',
  },
  {
    icon: 'lucide:briefcase',
    title: 'فرم‌ها و دستورالعمل‌ها',
    desc: 'الگوهای آماده برای اجرای بهتر فرآیندها',
    cta: 'مشاهده فرم‌ها',
    href: '/tools',
  },
  {
    icon: 'lucide:calculator',
    title: 'ابزارها و برنامه‌های رایگان',
    desc: 'ابزارهای کاربردی برای تحلیل و تصمیم‌گیری بهتر',
    cta: 'استفاده از ابزارها',
    href: '/salary-calculator',
  },
  {
    icon: 'lucide:bot',
    title: 'ایجنت‌های رایگان',
    desc: 'دستیارهای هوشمند برای حل مسائل حرفه‌ای',
    cta: 'شروع گفتگو',
    href: '/agents',
  },
];

export interface HubPath {
  icon: string;
  title: string;
  items: string[];
  href: string;
  tone: Tone;
}

export const hubPaths: HubPath[] = [
  {
    icon: 'lucide:trending-up',
    title: 'مسیر توسعه فردی',
    items: ['ارتباط مؤثر', 'مدیریت زمان', 'حل مسئله', 'هوش هیجانی'],
    href: '/learning-paths',
    tone: 'violet',
  },
  {
    icon: 'lucide:users-round',
    title: 'مسیر متخصصان منابع انسانی',
    items: ['جذب و استخدام', 'ارزیابی و عملکرد', 'جبران خدمات', 'توسعه کارکنان'],
    href: '/learning-paths',
    tone: 'blue',
  },
  {
    icon: 'lucide:user-round',
    title: 'مسیر مدیران و رهبران',
    items: ['رهبری و تصمیم‌گیری', 'مدیریت تیم و استراتژی', 'کوچینگ و توسعه فردی', 'تفکر استراتژیک'],
    href: '/learning-paths',
    tone: 'green',
  },
];

export interface HubFeatured {
  badge: string;
  icon: string;
  tone: Tone;
  lines: string[];
  cta: string;
  href: string;
}

export const hubFeatured: HubFeatured[] = [
  {
    badge: 'ایجنت منتخب',
    icon: 'lucide:bot',
    tone: 'violet',
    lines: ['دستیار طراحی KPI', 'با چند سؤال شاخص‌های مناسب را پیشنهاد می‌دهد'],
    cta: 'شروع گفتگو',
    href: '/agents',
  },
  {
    badge: 'ابزار منتخب',
    icon: 'lucide:briefcase-business',
    tone: 'orange',
    lines: ['محاسبه‌گر حقوق و مزایا', 'محاسبه دقیق حقوق، مزایا و کسورات قانونی کارکنان'],
    cta: 'استفاده از ابزار',
    href: '/salary-calculator',
  },
  {
    badge: 'ویدئوی منتخب',
    icon: 'lucide:square-play',
    tone: 'blue',
    lines: ['۵ اشتباه رایج مدیران در مدیریت کارکنان', 'خطاهایی که بیشترین هزینه را به تیم تحمیل می‌کنند'],
    cta: 'مشاهده ویدئو',
    href: '/videos/7',
  },
  {
    badge: 'مقاله منتخب',
    icon: 'lucide:file-text',
    tone: 'green',
    lines: ['چگونه یک سیستم ارزیابی عملکرد اثربخش طراحی کنیم؟', 'از تعریف شاخص تا اجرای بازخورد'],
    cta: 'مطالعه مقاله',
    href: '/articles',
  },
];

export const hubCta = {
  title: 'نمی‌دانید از کجا شروع کنید؟',
  line1: 'کافی است با ایجنت آریاز صحبت کنید.',
  line1Accent: 'ایجنت آریاز',
  line2: 'در کمتر از ۵ دقیقه مسیر متناسب رشد خود را پیدا کنید',
  line2Accent: '۵ دقیقه',
  primary: { label: 'شروع گفتگو با ایجنت آریاز', href: '/agents' },
  secondary: { label: 'انتخاب مسیر رشد', href: '/learning-paths' },
  mascot: `${ART}/illustrations/cta-robot-mascot-transparent.png`,
};

/* ══════════════════════════════════════════════════════════════
   Page 2 — /videos  ·  free video listing
══════════════════════════════════════════════════════════════ */

export const videoHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'رایگان اما کاربردی', href: '/library' },
    { label: 'ویدئوهای رایگان', href: '/videos' },
  ],
  title: 'ویدئوهای آموزشی رایگان آریاز',
  desc: [
    'در این بخش مجموعه‌ای از آموزش‌های کوتاه، کاربردی و رایگان آریاز را مشاهده می‌کنید.',
    'این ویدئوها با هدف ارتقای مهارت‌های منابع انسانی، رهبری و توسعه فردی تهیه شده‌اند.',
  ],
  art: `${ART}/illustrations/hero-video-library-transparent.png`,
  stats: [
    { icon: 'lucide:clock', value: '+۱۰۰', label: 'ساعت آموزش رایگان' },
    { icon: 'lucide:users-round', value: '+۲۵K', label: 'یادگیرنده' },
    { icon: 'lucide:users', value: '+۵۰۰', label: 'ویدئوی آموزشی' },
  ],
};

export const videoSorts = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'popular', label: 'پربازدیدترین' },
  { id: 'shortest', label: 'کوتاه‌ترین' },
  { id: 'longest', label: 'بلندترین' },
];

export interface FacetGroup {
  id: string;
  title: string;
  icon?: string;
  count?: number;
  /** Children render as a bulleted sub-list when the group is open. */
  items: { id: string; label: string; count: number }[];
}

export const videoTopics: FacetGroup[] = [
  {
    id: 'hr',
    title: 'منابع انسانی',
    icon: 'lucide:users-round',
    count: 256,
    items: [
      { id: 'hiring', label: 'جذب و استخدام', count: 42 },
      { id: 'performance', label: 'مدیریت عملکرد', count: 56 },
      { id: 'development', label: 'توسعه کارکنان', count: 62 },
      { id: 'culture', label: 'فرهنگ سازمانی', count: 48 },
      { id: 'law', label: 'قوانین و مقررات', count: 48 },
    ],
  },
  {
    id: 'leadership',
    title: 'مدیریت و رهبری',
    icon: 'lucide:trending-up',
    count: 198,
    items: [
      { id: 'team', label: 'مدیریت تیم', count: 64 },
      { id: 'decision', label: 'تصمیم‌گیری', count: 52 },
      { id: 'strategy', label: 'تفکر استراتژیک', count: 46 },
      { id: 'coaching', label: 'کوچینگ', count: 36 },
    ],
  },
  {
    id: 'personal',
    title: 'توسعه فردی',
    icon: 'lucide:trending-up',
    count: 142,
    items: [
      { id: 'time', label: 'مدیریت زمان', count: 48 },
      { id: 'habits', label: 'عادت‌سازی', count: 38 },
      { id: 'problem', label: 'حل مسئله', count: 32 },
      { id: 'emotion', label: 'هوش هیجانی', count: 24 },
    ],
  },
  {
    id: 'soft',
    title: 'مهارت‌های نرم',
    icon: 'lucide:smile',
    count: 156,
    items: [
      { id: 'communication', label: 'ارتباط مؤثر', count: 58 },
      { id: 'negotiation', label: 'مذاکره', count: 44 },
      { id: 'presentation', label: 'فن بیان و ارائه', count: 54 },
    ],
  },
];

export const videoLevels = [
  { id: 'beginner', label: 'مبتدی', count: 198, dot: '#059669' },
  { id: 'intermediate', label: 'متوسط', count: 256, dot: '#2563EB' },
  { id: 'advanced', label: 'پیشرفته', count: 138, dot: '#7C3AED' },
];

export const videoDurations = [
  { id: 'lt10', label: 'کمتر از ۱۰ دقیقه', count: 312 },
  { id: '10-15', label: '۱۰ تا ۱۵ دقیقه', count: 256 },
  { id: '15-30', label: '۱۵ تا ۳۰ دقیقه', count: 156 },
  { id: 'gt30', label: 'بیشتر از ۳۰ دقیقه', count: 98 },
];

export const videoTypes = [
  { id: 'all', label: 'همه ویدئوها', count: 752, icon: 'lucide:video' },
];

export const perPageOptions = [12, 24, 48];

/* ══════════════════════════════════════════════════════════════
   Page 3 — /videos/[id]  ·  a single free video

   `track` picks the related-resources block and the learning path,
   so a new video only has to declare its own headline content.
══════════════════════════════════════════════════════════════ */

export interface ResourceGroup {
  title: string;
  icon: string;
  tone: Tone;
  href: string;
  items: string[];
}

export interface PathStep {
  step: string;
  title: string;
  icon: string;
}

export interface LearningPath {
  title: string;
  steps: PathStep[];
  duration: string;
  href: string;
}

export interface Review {
  name: string;
  role: string;
  avatar: string;
  date: string;
  stars: number;
  text: string;
}

export type Track = 'hr' | 'leadership' | 'personal' | 'ai';

/** Column order is right-to-left on screen, matching the mockup. */
const resourceSets: Record<Track, ResourceGroup[]> = {
  hr: [
    {
      title: 'تست‌ها و پرسشنامه‌ها',
      icon: 'lucide:clipboard-list',
      tone: 'rose',
      href: '/exams',
      items: ['پرسشنامه سبک رهبری', 'تست انگیزش شغلی', 'تست خودارزیابی عملکرد'],
    },
    {
      title: 'فرم‌ها و دستورالعمل‌ها',
      icon: 'lucide:file-text',
      tone: 'blue',
      href: '/tools',
      items: ['دستورالعمل ارزیابی عملکرد', 'فرم هدف‌گذاری SMART', 'راهنمای مصاحبه بازخورد'],
    },
    {
      title: 'ابزارهای مرتبط',
      icon: 'lucide:file-cog',
      tone: 'orange',
      href: '/tools',
      items: ['فرم ارزیابی عملکرد', 'محاسبه‌گر شاخص‌ها', 'داشبورد ارزیابی'],
    },
    {
      title: 'دوره‌های مرتبط',
      icon: 'lucide:graduation-cap',
      tone: 'green',
      href: '/courses',
      items: ['مدیریت عملکرد حرفه‌ای', 'KPI و شاخص‌های کلیدی', 'بازخورد مؤثر و کوچینگ'],
    },
    {
      title: 'ایجنت‌های مرتبط',
      icon: 'lucide:bot',
      tone: 'indigo',
      href: '/agents',
      items: ['ایجنت ارزیابی عملکرد', 'ایجنت بازخورد ۳۶۰ درجه', 'ایجنت توسعه فردی'],
    },
  ],
  leadership: [
    {
      title: 'تست‌ها و پرسشنامه‌ها',
      icon: 'lucide:clipboard-list',
      tone: 'rose',
      href: '/exams',
      items: ['پرسشنامه سبک رهبری', 'تست بلوغ تیمی', 'تست تفکر استراتژیک'],
    },
    {
      title: 'فرم‌ها و دستورالعمل‌ها',
      icon: 'lucide:file-text',
      tone: 'blue',
      href: '/tools',
      items: ['دستورالعمل جلسات تیمی', 'فرم تفویض اختیار', 'راهنمای جلسه یک‌به‌یک'],
    },
    {
      title: 'ابزارهای مرتبط',
      icon: 'lucide:file-cog',
      tone: 'orange',
      href: '/tools',
      items: ['ماتریس اولویت‌بندی', 'داشبورد اهداف تیم', 'الگوی برنامه ۹۰ روزه'],
    },
    {
      title: 'دوره‌های مرتبط',
      icon: 'lucide:graduation-cap',
      tone: 'green',
      href: '/courses',
      items: ['مدیران تازه‌وارد', 'رهبری تحول‌آفرین', 'مدیریت تیم‌های چندنسلی'],
    },
    {
      title: 'ایجنت‌های مرتبط',
      icon: 'lucide:bot',
      tone: 'indigo',
      href: '/agents',
      items: ['ایجنت کوچ مدیریتی', 'ایجنت طراحی جلسه', 'ایجنت تصمیم‌گیری'],
    },
  ],
  personal: [
    {
      title: 'تست‌ها و پرسشنامه‌ها',
      icon: 'lucide:clipboard-list',
      tone: 'rose',
      href: '/exams',
      items: ['تست هوش هیجانی', 'تست سبک یادگیری', 'پرسشنامه مدیریت زمان'],
    },
    {
      title: 'فرم‌ها و دستورالعمل‌ها',
      icon: 'lucide:file-text',
      tone: 'blue',
      href: '/tools',
      items: ['الگوی برنامه هفتگی', 'فرم اهداف شخصی', 'چک‌لیست تمرکز روزانه'],
    },
    {
      title: 'ابزارهای مرتبط',
      icon: 'lucide:file-cog',
      tone: 'orange',
      href: '/tools',
      items: ['ماتریس آیزنهاور', 'ردیاب عادت‌ها', 'تایمر تمرکز'],
    },
    {
      title: 'دوره‌های مرتبط',
      icon: 'lucide:graduation-cap',
      tone: 'green',
      href: '/courses',
      items: ['مدیریت بر خود', 'ارتباطات بین‌فردی', 'تفکر خلاق و حل مسئله'],
    },
    {
      title: 'ایجنت‌های مرتبط',
      icon: 'lucide:bot',
      tone: 'indigo',
      href: '/agents',
      items: ['ایجنت برنامه‌ریزی هفتگی', 'ایجنت عادت‌سازی', 'ایجنت توسعه فردی'],
    },
  ],
  ai: [
    {
      title: 'تست‌ها و پرسشنامه‌ها',
      icon: 'lucide:clipboard-list',
      tone: 'rose',
      href: '/exams',
      items: ['سنجش آمادگی دیجیتال', 'تست سواد داده', 'پرسشنامه بلوغ فناوری'],
    },
    {
      title: 'فرم‌ها و دستورالعمل‌ها',
      icon: 'lucide:file-text',
      tone: 'blue',
      href: '/tools',
      items: ['دستورالعمل استفاده از AI', 'فرم ارزیابی ابزارها', 'راهنمای نوشتن پرامپت'],
    },
    {
      title: 'ابزارهای مرتبط',
      icon: 'lucide:file-cog',
      tone: 'orange',
      href: '/tools',
      items: ['کتابخانه پرامپت HR', 'محاسبه‌گر صرفه‌جویی زمان', 'داشبورد اتوماسیون'],
    },
    {
      title: 'دوره‌های مرتبط',
      icon: 'lucide:graduation-cap',
      tone: 'green',
      href: '/courses',
      items: ['هوش مصنوعی برای منابع انسانی', 'تحلیل داده‌های کارکنان', 'اتوماسیون فرآیندهای HR'],
    },
    {
      title: 'ایجنت‌های مرتبط',
      icon: 'lucide:bot',
      tone: 'indigo',
      href: '/agents',
      items: ['ایجنت غربالگری رزومه', 'ایجنت تحلیل نظرسنجی', 'ایجنت شرح شغل'],
    },
  ],
};

const pathSets: Record<Track, LearningPath> = {
  hr: {
    title: 'مسیر یادگیری مرتبط با این ویدئو',
    duration: '۲ ساعت و ۴۰ دقیقه',
    href: '/learning-paths',
    steps: [
      { step: 'مرحله ۱', title: 'تعریف اهداف و شاخص‌ها', icon: 'lucide:target' },
      { step: 'مرحله ۲', title: 'طراحی فرم ارزیابی', icon: 'lucide:file-pen-line' },
      { step: 'مرحله ۳', title: 'اجرای فرآیند ارزیابی', icon: 'lucide:users-round' },
      { step: 'مرحله ۴', title: 'بازخورد مؤثر', icon: 'lucide:messages-square' },
      { step: 'مرحله ۵', title: 'تحلیل نتایج', icon: 'lucide:chart-column' },
      { step: 'مرحله ۶', title: 'اقدام و بهبود', icon: 'lucide:send' },
    ],
  },
  leadership: {
    title: 'مسیر یادگیری مرتبط با این ویدئو',
    duration: '۳ ساعت و ۱۰ دقیقه',
    href: '/learning-paths',
    steps: [
      { step: 'مرحله ۱', title: 'شناخت سبک رهبری', icon: 'lucide:target' },
      { step: 'مرحله ۲', title: 'هدف‌گذاری تیمی', icon: 'lucide:file-pen-line' },
      { step: 'مرحله ۳', title: 'تفویض اختیار', icon: 'lucide:users-round' },
      { step: 'مرحله ۴', title: 'جلسات یک‌به‌یک', icon: 'lucide:messages-square' },
      { step: 'مرحله ۵', title: 'سنجش اثربخشی', icon: 'lucide:chart-column' },
      { step: 'مرحله ۶', title: 'رهبری در تغییر', icon: 'lucide:send' },
    ],
  },
  personal: {
    title: 'مسیر یادگیری مرتبط با این ویدئو',
    duration: '۲ ساعت و ۱۵ دقیقه',
    href: '/learning-paths',
    steps: [
      { step: 'مرحله ۱', title: 'شناخت نقطه شروع', icon: 'lucide:target' },
      { step: 'مرحله ۲', title: 'تعیین اهداف شخصی', icon: 'lucide:file-pen-line' },
      { step: 'مرحله ۳', title: 'طراحی روتین روزانه', icon: 'lucide:users-round' },
      { step: 'مرحله ۴', title: 'مدیریت انرژی و تمرکز', icon: 'lucide:messages-square' },
      { step: 'مرحله ۵', title: 'مرور و بازنگری', icon: 'lucide:chart-column' },
      { step: 'مرحله ۶', title: 'تثبیت عادت', icon: 'lucide:send' },
    ],
  },
  ai: {
    title: 'مسیر یادگیری مرتبط با این ویدئو',
    duration: '۲ ساعت و ۵۰ دقیقه',
    href: '/learning-paths',
    steps: [
      { step: 'مرحله ۱', title: 'مفاهیم پایه', icon: 'lucide:target' },
      { step: 'مرحله ۲', title: 'کاربردها در HR', icon: 'lucide:file-pen-line' },
      { step: 'مرحله ۳', title: 'کار با ابزارها', icon: 'lucide:users-round' },
      { step: 'مرحله ۴', title: 'نوشتن پرامپت مؤثر', icon: 'lucide:messages-square' },
      { step: 'مرحله ۵', title: 'ارزیابی نتایج', icon: 'lucide:chart-column' },
      { step: 'مرحله ۶', title: 'استقرار در سازمان', icon: 'lucide:send' },
    ],
  },
};

/** Shown as chips above the assistant input; `{t}` is the video topic. */
const suggestionSets: Record<Track, string[]> = {
  hr: [
    'خلاصه ویدئو را ارائه بده',
    'نکات کلیدی این ویدئو چیست؟',
    'تفاوت KPI و KRI چیست؟',
    'شاخص‌ها و مفاهیم عملی چیست؟',
    'نمونه و مثال عملی بده',
    'پیشنهاد مطالعه بده',
  ],
  leadership: [
    'خلاصه ویدئو را ارائه بده',
    'نکات کلیدی این ویدئو چیست؟',
    'چطور این را در تیمم اجرا کنم؟',
    'رایج‌ترین اشتباه‌ها کدام‌اند؟',
    'نمونه و مثال عملی بده',
    'پیشنهاد مطالعه بده',
  ],
  personal: [
    'خلاصه ویدئو را ارائه بده',
    'نکات کلیدی این ویدئو چیست؟',
    'یک برنامه ۷ روزه پیشنهاد بده',
    'چطور شروع کنم؟',
    'نمونه و مثال عملی بده',
    'پیشنهاد مطالعه بده',
  ],
  ai: [
    'خلاصه ویدئو را ارائه بده',
    'نکات کلیدی این ویدئو چیست؟',
    'کاربرد آن در منابع انسانی چیست؟',
    'از کجا شروع کنم؟',
    'نمونه و مثال عملی بده',
    'پیشنهاد مطالعه بده',
  ],
};

/** The three AI capability cards beside the assistant. */
export const aiTools = [
  {
    icon: 'lucide:file-text',
    title: 'خلاصه ویدئو',
    desc: 'خلاصه‌ای از نکات کلیدی و مهم‌ترین مفاهیم ویدئو',
    tone: 'indigo' as Tone,
  },
  {
    icon: 'lucide:circle-question-mark',
    title: 'پرسش از ویدئو',
    desc: 'هر سؤالی درباره محتوای ویدئو بپرسید و پاسخ بگیرید',
    tone: 'green' as Tone,
  },
  {
    icon: 'lucide:star',
    title: 'نکات کلیدی',
    desc: 'مهم‌ترین نکات و ایده‌های اصلی ویدئو را استخراج کنید',
    tone: 'orange' as Tone,
  },
];

export const aiPanel = {
  title: 'AI آریاز',
  avatar: `${ART}/illustrations/ai-assistant-avatar-transparent.png`,
  greeting: ['سلام! من آریاز هستم 👋', 'هر کمکی درباره این ویدئو لازم داشتید در خدمتم'],
  placeholder: 'سؤال خود را اینجا بنویسید...',
  disclaimer: 'اطلاعات ارائه‌شده توسط AI است و جایگزین مشاوره تخصصی نیست',
  toolsTitle: 'قابلیت‌های ابزار هوشمند آریاز',
};

const defaultReviews: Review[] = [
  {
    name: 'سارا محمدی',
    role: 'کارشناس منابع انسانی',
    avatar: `${ART}/avatars/reviewer-01.png`,
    date: '۱۴۰۳/۰۵/۱۶',
    stars: 4,
    text: 'محتوای بسیار کاربردی و جامع بود. مطالب روان و ساده و مثال‌های عملی عالی بود.',
  },
  {
    name: 'علی رضایی',
    role: 'مدیر منابع انسانی',
    avatar: `${ART}/avatars/reviewer-02.png`,
    date: '۱۴۰۳/۰۵/۱۴',
    stars: 4,
    text: 'توضیحات جامع و مفید بود و نگاه من نسبت به طراحی سیستم ارزیابی کاملاً تغییر کرد.',
  },
  {
    name: 'مریم حسینی',
    role: 'کارشناس جذب',
    avatar: `${ART}/avatars/reviewer-03.png`,
    date: '۱۴۰۳/۰۵/۱۲',
    stars: 3,
    text: 'مستند و کاربردی بود؛ بخش آخر درباره تحلیل نتایج را می‌شد مفصل‌تر توضیح داد.',
  },
];

export interface FreeVideo {
  id: string;
  title: string;
  /** One-line summary shown beside the player. */
  summary: string;
  about: string[];
  tags: string[];
  thumb: string;
  poster: string;
  duration: string;
  minutes: string;
  views: string;
  date: string;
  topic: string;
  topicId: string;
  tone: Tone;
  level: string;
  track: Track;
  rating: { score: string; count: string; bars: number[] };
}

/** Everything a detail page needs, assembled from the video's track. */
export interface FreeVideoDetail extends FreeVideo {
  suggestions: string[];
  resources: ResourceGroup[];
  path: LearningPath;
  reviews: Review[];
  related: FreeVideo[];
}

interface VideoSeed extends Omit<FreeVideo, 'thumb' | 'poster' | 'rating'> {
  thumbFile: string;
  posterFile?: string;
  rating?: FreeVideo['rating'];
}

const seeds: VideoSeed[] = [
  {
    id: '1',
    title: 'چگونه یک سیستم ارزیابی عملکرد موفق طراحی کنیم؟',
    summary:
      'در این ویدئو با اصول و مراحل طراحی یک سیستم ارزیابی عملکرد آشنا می‌شوید و نکات کلیدی برای اجرای موفق آن را یاد می‌گیرید.',
    about: [
      'در این ویدئو با مفهوم طراحی یک سیستم ارزیابی عملکرد اثربخش آشنا می‌شوید. توضیح داده می‌شود چگونه می‌توان از یک فرآیند سنتی و فرمالیته، به سیستمی مدیریتی برای بهبود عملکرد کارکنان و تحقق اهداف سازمانی رسید.',
      'در ادامه با مفاهیم کلیدی مانند تعریف شاخص، هدف‌گذاری، طراحی فرم، اجرای فرآیند ارزیابی، ارائه بازخورد و استفاده از نتایج ارزیابی برای توسعه کارکنان آشنا خواهید شد.',
    ],
    tags: ['منابع انسانی', 'ارزیابی عملکرد', 'طراحی سیستم', 'KPI'],
    thumbFile: 'video-01-conflict-management.png',
    posterFile: 'video-poster.png',
    duration: '۰۸:۲۳',
    minutes: '۸ دقیقه',
    views: '۵.۲K',
    date: '۱۴۰۳/۱۲/۲۴',
    topic: 'منابع انسانی',
    topicId: 'hr',
    tone: 'blue',
    level: 'متوسط',
    track: 'hr',
    rating: { score: '۴.۷', count: '۱۲۳۴', bars: [76, 16, 5, 2, 1] },
  },
  {
    id: '2',
    title: 'مدیریت تعارض در تیم‌ها',
    summary: 'ریشه‌های تعارض در تیم را بشناسید و یاد بگیرید چطور آن را به فرصت بهبود تبدیل کنید.',
    about: [
      'تعارض در تیم اجتناب‌ناپذیر است؛ آنچه نتیجه را تعیین می‌کند نحوه مواجهه مدیر با آن است. در این ویدئو انواع تعارض و ریشه‌های رایج آن بررسی می‌شود.',
      'سپس گام‌به‌گام یک چارچوب گفتگو معرفی می‌شود که با آن می‌توانید تعارض را از سطح شخصی به سطح مسئله منتقل کنید و به توافق قابل اجرا برسید.',
    ],
    tags: ['منابع انسانی', 'کار تیمی', 'مدیریت تعارض'],
    thumbFile: 'video-01-conflict-management.png',
    duration: '۰۶:۱۲',
    minutes: '۶ دقیقه',
    views: '۲.۴K',
    date: '۱۴۰۳/۱۲/۱۸',
    topic: 'منابع انسانی',
    topicId: 'hr',
    tone: 'blue',
    level: 'متوسط',
    track: 'hr',
  },
  {
    id: '3',
    title: 'تفکر خلاق در حل مسئله',
    summary: 'تکنیک‌های عملی برای دیدن مسئله از زاویه‌ای تازه و رسیدن به راه‌حل‌های بهتر.',
    about: [
      'خلاقیت یک استعداد ذاتی نیست، یک مهارت تمرین‌شدنی است. این ویدئو نشان می‌دهد چگونه با تغییر صورت‌مسئله به راه‌حل‌های تازه برسید.',
      'چند تکنیک کاربردی مانند بازتعریف مسئله، وارونه‌سازی فرض‌ها و ترکیب ایده‌ها با مثال معرفی می‌شود.',
    ],
    tags: ['توسعه فردی', 'حل مسئله', 'خلاقیت'],
    thumbFile: 'video-02-creative-thinking.png',
    duration: '۰۵:۴۸',
    minutes: '۶ دقیقه',
    views: '۳.۳K',
    date: '۱۴۰۳/۱۲/۱۵',
    topic: 'توسعه فردی',
    topicId: 'personal',
    tone: 'green',
    level: 'مبتدی',
    track: 'personal',
  },
  {
    id: '4',
    title: 'جذب و استخدام مؤثر',
    summary: 'از تدوین شرح شغل تا مصاحبه ساختاریافته؛ فرآیندی که انتخاب درست را محتمل‌تر می‌کند.',
    about: [
      'بیشترین هزینه استخدام، هزینه انتخاب اشتباه است. در این ویدئو یک فرآیند جذب ساختاریافته از تعریف نیاز تا تصمیم نهایی مرور می‌شود.',
      'روی مصاحبه رفتاری، معیارهای امتیازدهی و کاهش خطاهای شناختی در ارزیابی داوطلبان تمرکز می‌کنیم.',
    ],
    tags: ['منابع انسانی', 'جذب و استخدام', 'مصاحبه'],
    thumbFile: 'video-03-effective-hiring.png',
    duration: '۰۷:۱۵',
    minutes: '۷ دقیقه',
    views: '۴.۲K',
    date: '۱۴۰۳/۱۲/۱۰',
    topic: 'منابع انسانی',
    topicId: 'hr',
    tone: 'blue',
    level: 'متوسط',
    track: 'hr',
  },
  {
    id: '5',
    title: 'مقدمه‌ای بر هوش مصنوعی',
    summary: 'هوش مصنوعی چیست، چه کاری انجام می‌دهد و کجای کار منابع انسانی به آن نیاز است.',
    about: [
      'این ویدئو بدون اصطلاحات فنی توضیح می‌دهد مدل‌های زبانی چگونه کار می‌کنند و چه محدودیت‌هایی دارند.',
      'سپس چند کاربرد واقعی در منابع انسانی — از غربالگری رزومه تا تحلیل نظرسنجی کارکنان — بررسی می‌شود.',
    ],
    tags: ['هوش مصنوعی', 'فناوری', 'منابع انسانی'],
    thumbFile: 'video-04-ai-introduction.png',
    duration: '۰۸:۳۰',
    minutes: '۸ دقیقه',
    views: '۵.۷K',
    date: '۱۴۰۳/۱۲/۰۸',
    topic: 'هوش مصنوعی',
    topicId: 'ai',
    tone: 'violet',
    level: 'مبتدی',
    track: 'ai',
  },
  {
    id: '6',
    title: 'تعیین اهداف SMART',
    summary: 'هدفی بنویسید که قابل سنجش، واقع‌بینانه و زمان‌دار باشد — نه یک آرزوی مبهم.',
    about: [
      'بیشتر اهداف سازمانی شکست می‌خورند چون از ابتدا قابل سنجش نبوده‌اند. این ویدئو چارچوب SMART را با مثال‌های واقعی مرور می‌کند.',
      'در پایان یاد می‌گیرید چطور یک هدف مبهم را به یک هدف قابل پیگیری تبدیل کنید.',
    ],
    tags: ['مدیریت و رهبری', 'هدف‌گذاری', 'SMART'],
    thumbFile: 'video-05-smart-goals.png',
    duration: '۰۶:۰۵',
    minutes: '۶ دقیقه',
    views: '۲.۰K',
    date: '۱۴۰۳/۱۲/۰۴',
    topic: 'مدیریت و رهبری',
    topicId: 'leadership',
    tone: 'orange',
    level: 'مبتدی',
    track: 'leadership',
  },
  {
    id: '7',
    title: 'توانمندسازی کارکنان',
    summary: 'چطور اختیار و مسئولیت را طوری واگذار کنید که هم تیم رشد کند و هم نتیجه حفظ شود.',
    about: [
      'توانمندسازی یعنی ساختن شرایطی که کارکنان بتوانند تصمیم بگیرند. این ویدئو تفاوت آن را با رهاسازی روشن می‌کند.',
      'سطوح تفویض اختیار و نشانه‌های آمادگی هر فرد برای گرفتن مسئولیت بیشتر بررسی می‌شود.',
    ],
    tags: ['منابع انسانی', 'توسعه کارکنان', 'تفویض اختیار'],
    thumbFile: 'video-06-employee-empowerment.png',
    duration: '۰۶:۳۰',
    minutes: '۷ دقیقه',
    views: '۱.۸K',
    date: '۱۴۰۳/۱۱/۲۸',
    topic: 'منابع انسانی',
    topicId: 'hr',
    tone: 'blue',
    level: 'متوسط',
    track: 'hr',
  },
  {
    id: '8',
    title: 'مهارت‌های ارتباطی مدیران',
    summary: 'گوش دادن فعال، پیام روشن و بازخورد بدون تدافع — سه ستون ارتباط مدیریتی.',
    about: [
      'بخش بزرگی از مشکلات تیمی ریشه ارتباطی دارد. این ویدئو الگوهای رایج ارتباط ناکارآمد را نشان می‌دهد.',
      'سپس تکنیک‌های گوش دادن فعال و ساختاردهی به پیام برای جلسات و گفتگوهای دشوار معرفی می‌شود.',
    ],
    tags: ['مدیریت و رهبری', 'ارتباط مؤثر', 'بازخورد'],
    thumbFile: 'video-07-manager-communication.png',
    duration: '۰۷:۲۰',
    minutes: '۷ دقیقه',
    views: '۳.۳K',
    date: '۱۴۰۳/۱۱/۲۴',
    topic: 'مدیریت و رهبری',
    topicId: 'leadership',
    tone: 'orange',
    level: 'متوسط',
    track: 'leadership',
  },
  {
    id: '9',
    title: 'مدیریت زمان برای بهره‌وری',
    summary: 'اولویت‌بندی واقعی، نه فهرست کارهای بلندبالا؛ روشی که به تمرکز ختم می‌شود.',
    about: [
      'مدیریت زمان در عمل مدیریت تصمیم است. این ویدئو نشان می‌دهد چطور کارهای مهم را از کارهای فوری جدا کنید.',
      'ماتریس اولویت‌بندی، بلوک‌بندی زمان و مدیریت وقفه‌ها با مثال‌های روزمره توضیح داده می‌شود.',
    ],
    tags: ['توسعه فردی', 'مدیریت زمان', 'بهره‌وری'],
    thumbFile: 'video-08-time-management.png',
    duration: '۰۴:۵۵',
    minutes: '۵ دقیقه',
    views: '۲.۶K',
    date: '۱۴۰۳/۱۱/۲۰',
    topic: 'توسعه فردی',
    topicId: 'personal',
    tone: 'green',
    level: 'مبتدی',
    track: 'personal',
  },
  {
    id: '10',
    title: 'فرهنگ سازمانی چیست؟',
    summary: 'فرهنگ چیزی است که وقتی مدیر در اتاق نیست اتفاق می‌افتد — و می‌شود آن را طراحی کرد.',
    about: [
      'فرهنگ سازمانی مجموعه رفتارهایی است که در عمل پاداش می‌گیرند. این ویدئو تعریف کاربردی فرهنگ را ارائه می‌دهد.',
      'لایه‌های فرهنگ، نشانه‌های فرهنگ ناسالم و اهرم‌های عملی تغییر آن بررسی می‌شود.',
    ],
    tags: ['منابع انسانی', 'فرهنگ سازمانی'],
    thumbFile: 'video-09-org-culture.png',
    duration: '۰۶:۴۰',
    minutes: '۷ دقیقه',
    views: '۲.۲K',
    date: '۱۴۰۳/۱۱/۱۶',
    topic: 'منابع انسانی',
    topicId: 'hr',
    tone: 'blue',
    level: 'متوسط',
    track: 'hr',
  },
  {
    id: '11',
    title: 'اصول رهبری در عمل',
    summary: 'از سبک‌های رهبری تا انتخاب سبک متناسب با بلوغ تیم و شرایط کار.',
    about: [
      'رهبری اثربخش یک سبک ثابت ندارد. این ویدئو سبک‌های رایج رهبری و موقعیت مناسب هرکدام را مرور می‌کند.',
      'با چند سناریو نشان داده می‌شود چطور سبک خود را متناسب با بلوغ تیم تنظیم کنید.',
    ],
    tags: ['مدیریت و رهبری', 'سبک رهبری'],
    thumbFile: 'video-10-leadership-practice.png',
    duration: '۰۶:۵۵',
    minutes: '۷ دقیقه',
    views: '۳.۶K',
    date: '۱۴۰۳/۱۱/۱۲',
    topic: 'مدیریت و رهبری',
    topicId: 'leadership',
    tone: 'orange',
    level: 'پیشرفته',
    track: 'leadership',
  },
  {
    id: '12',
    title: 'انگیزش و نگهداشت کارکنان',
    summary: 'چرا افراد می‌مانند و چرا می‌روند؛ و کدام اهرم‌ها واقعاً اثر دارند.',
    about: [
      'نگهداشت کارکنان فقط مسئله حقوق نیست. این ویدئو عوامل انگیزشی درونی و بیرونی را از هم جدا می‌کند.',
      'شاخص‌های هشدار زودهنگام ترک خدمت و اقدام‌های پیشگیرانه معرفی می‌شود.',
    ],
    tags: ['منابع انسانی', 'انگیزش', 'نگهداشت'],
    thumbFile: 'video-11-employee-motivation.png',
    duration: '۰۵:۱۸',
    minutes: '۵ دقیقه',
    views: '۳.۹K',
    date: '۱۴۰۳/۱۱/۰۸',
    topic: 'منابع انسانی',
    topicId: 'hr',
    tone: 'blue',
    level: 'متوسط',
    track: 'hr',
  },
  {
    id: '13',
    title: 'عادت‌های افراد موفق',
    summary: 'عادت‌ها را کوچک شروع کنید؛ سیستم بسازید، نه انگیزه لحظه‌ای.',
    about: [
      'انگیزه نوسان دارد، سیستم نه. این ویدئو چرخه نشانه–رفتار–پاداش را ساده توضیح می‌دهد.',
      'یاد می‌گیرید چطور یک عادت کوچک را به روتین پایدار تبدیل کنید و از شکست‌های موقت عبور کنید.',
    ],
    tags: ['توسعه فردی', 'عادت‌سازی'],
    thumbFile: 'video-12-successful-habits.png',
    duration: '۰۴:۴۷',
    minutes: '۵ دقیقه',
    views: '۳.۰K',
    date: '۱۴۰۳/۱۱/۰۴',
    topic: 'توسعه فردی',
    topicId: 'personal',
    tone: 'green',
    level: 'مبتدی',
    track: 'personal',
  },
];

const defaultRating: FreeVideo['rating'] = {
  score: '۴.۶',
  count: '۸۴۲',
  bars: [72, 19, 6, 2, 1],
};

export const freeVideos: FreeVideo[] = seeds.map(({ thumbFile, posterFile, rating, ...v }) => ({
  ...v,
  thumb: `${ART}/thumbnails/${thumbFile}`,
  poster: `${ART}/${posterFile ? `illustrations/${posterFile}` : `thumbnails/${thumbFile}`}`,
  rating: rating ?? defaultRating,
}));

export function getFreeVideo(id: string): FreeVideoDetail | undefined {
  const video = freeVideos.find((v) => v.id === id);
  if (!video) return undefined;

  /* Same-track videos first, then anything else, so the rail is never short. */
  const related = [
    ...freeVideos.filter((v) => v.id !== id && v.track === video.track),
    ...freeVideos.filter((v) => v.id !== id && v.track !== video.track),
  ].slice(0, 6);

  return {
    ...video,
    suggestions: suggestionSets[video.track],
    resources: resourceSets[video.track],
    path: pathSets[video.track],
    reviews: defaultReviews,
    related,
  };
}

export const videoIds = freeVideos.map((v) => v.id);
