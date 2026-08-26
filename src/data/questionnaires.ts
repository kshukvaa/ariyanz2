/* ──────────────────────────────────────────────────────────────
   Ariyaz — پرسشنامه‌ها.

   Feeds two screens:
     /exams/questionnaires       — the library
     /exams/questionnaires/[id]  — a single instrument

   A questionnaire is a file people download and administer, so the
   card leads with what a researcher checks first: item count, file
   type, completion time and how many people have taken it away.
────────────────────────────────────────────────────────────── */

import type { Tone } from '@/data/free';

const T = '/images/tests';

export const questHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'کتابخانه پرسشنامه‌ها', href: '/exams/questionnaires' },
  ],
  title: 'کتابخانه پرسشنامه‌های تخصصی آریاز',
  desc: [
    'دسترسی به مجموعه‌ای از پرسشنامه‌های معتبر روانشناسی، منابع انسانی و مدیریتی',
    'برای ارزیابی، پژوهش و تصمیم‌گیری حرفه‌ای',
  ],
  chips: [
    { label: '۱۰۰+ پرسشنامه تخصصی', icon: 'lucide:clipboard-list', color: '#F26A21' },
    { label: 'فایل‌های آماده استفاده', icon: 'lucide:chart-no-axes-combined', color: '#3B4FD8' },
    { label: 'مناسب افراد و سازمان‌ها', icon: 'lucide:users-round', color: '#0E8A4F' },
  ],
  primary: { label: 'مشاهده پرسشنامه‌ها', href: '#results' },
  secondary: { label: 'دانلود نمونه پرسشنامه', href: '#' },
  art: `${T}/quest-archive-hero.png`,
};

export const questUses = {
  title: 'پرسشنامه‌های آریاز چه کمکی می‌کنند؟',
  items: [
    {
      title: 'ارزیابی کارکنان',
      desc: 'شناخت نگرش‌ها، رفتارها و ویژگی‌های کارکنان',
      icon: 'lucide:users-round',
      color: '#5B34D6',
    },
    {
      title: 'پژوهش و تحقیقات',
      desc: 'ابزارهای آماده برای مطالعات دانشگاهی و سازمانی',
      icon: 'lucide:graduation-cap',
      color: '#0E8A4F',
    },
    {
      title: 'تصمیم‌گیری مدیریتی',
      desc: 'دسترسی به داده‌های معتبر برای تصمیم‌های منابع انسانی',
      icon: 'lucide:chart-no-axes-combined',
      color: '#F26A21',
    },
    {
      title: 'توسعه فردی',
      desc: 'شناخت بهتر خود و مسیر رشد',
      icon: 'lucide:user-round',
      color: '#3B4FD8',
    },
  ],
};

export const questTabs = [
  { id: 'all', label: 'همه', icon: 'lucide:grid-2x2' },
  { id: 'premium', label: 'ویژه', icon: 'lucide:tag' },
  { id: 'free', label: 'رایگان', icon: 'lucide:gift' },
] as const;

export type QuestTab = (typeof questTabs)[number]['id'];

export const questSorts = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'downloads', label: 'پردانلودترین' },
  { id: 'rating', label: 'بالاترین امتیاز' },
];

export interface QuestFacet {
  id: string;
  title: string;
  items: { id: string; label: string; children?: { id: string; label: string }[] }[];
}

export const questFacets: QuestFacet[] = [
  {
    id: 'topic',
    title: 'موضوع پرسشنامه',
    items: [
      {
        id: 'hr',
        label: 'منابع انسانی',
        children: [
          { id: 'job-satisfaction', label: 'رضایت شغلی' },
          { id: 'commitment', label: 'تعهد سازمانی' },
          { id: 'motivation', label: 'انگیزش کارکنان' },
          { id: 'engagement', label: 'درگیری شغلی' },
          { id: 'burnout', label: 'فرسودگی شغلی' },
        ],
      },
      { id: 'behaviour', label: 'شخصیت و رفتار' },
      { id: 'leadership', label: 'رهبری و مدیریت' },
      { id: 'culture', label: 'سازمان و فرهنگ' },
    ],
  },
  {
    id: 'file',
    title: 'نوع فایل',
    items: [
      { id: 'pdf', label: 'PDF' },
      { id: 'word', label: 'Word' },
      { id: 'excel', label: 'Excel' },
    ],
  },
  {
    id: 'usage',
    title: 'کاربرد',
    items: [
      { id: 'hiring', label: 'استخدام' },
      { id: 'assessment', label: 'ارزیابی کارکنان' },
      { id: 'research', label: 'پژوهش' },
      { id: 'personal', label: 'توسعه فردی' },
      { id: 'org', label: 'سازمانی' },
    ],
  },
];

export interface Questionnaire {
  id: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  categoryTone: Tone;
  questions: number;
  minutes: number;
  formats: string;
  rating: number;
  downloads: string;
  access: 'free' | 'premium';
  topicId: string;
  fileId: string;
  usageId: string;
}

export const questionnaires: Questionnaire[] = [
  {
    id: 'denison-culture',
    title: 'پرسشنامه فرهنگ سازمانی دنیسون',
    desc: 'شناسایی ویژگی‌های فرهنگ سازمانی',
    icon: `${T}/icons/quest-denison-culture.png`,
    category: 'سازمان و فرهنگ',
    categoryTone: 'violet',
    questions: 60,
    minutes: 20,
    formats: 'PDF / Excel',
    rating: 4.5,
    downloads: '۲۹۰۰',
    access: 'free',
    topicId: 'culture',
    fileId: 'excel',
    usageId: 'org',
  },
  {
    id: 'mlq-leadership',
    title: 'پرسشنامه سبک رهبری MLQ',
    desc: 'ارزیابی سبک‌های رهبری تحولی و تعاملی هستند',
    icon: `${T}/icons/quest-leadership-mlq.png`,
    category: 'رهبری و مدیریت',
    categoryTone: 'blue',
    questions: 45,
    minutes: 20,
    formats: 'PDF / Word',
    rating: 4.6,
    downloads: '۱۸۰۰',
    access: 'free',
    topicId: 'leadership',
    fileId: 'word',
    usageId: 'assessment',
  },
  {
    id: 'neo-ffi',
    title: 'پرسشنامه پنج عامل شخصیت NEO-FFI',
    desc: 'ارزیابی ابعاد پنج عامل بزرگ شخصیت',
    icon: `${T}/icons/quest-neo-ffi.png`,
    category: 'شخصیت و رفتار',
    categoryTone: 'orange',
    questions: 60,
    minutes: 25,
    formats: 'PDF / Word',
    rating: 4.7,
    downloads: '۲۵۰۰',
    access: 'premium',
    topicId: 'behaviour',
    fileId: 'pdf',
    usageId: 'hiring',
  },
  {
    id: 'allen-meyer-commitment',
    title: 'پرسشنامه تعهد سازمانی آلن و مِیِر',
    desc: 'اندازه‌گیری تعهد عاطفی، مستمر و هنجاری کارکنان',
    icon: `${T}/icons/quest-commitment.png`,
    category: 'منابع انسانی',
    categoryTone: 'rose',
    questions: 24,
    minutes: 15,
    formats: 'PDF / Word',
    rating: 4.8,
    downloads: '۳۵۰۰',
    access: 'free',
    topicId: 'commitment',
    fileId: 'pdf',
    usageId: 'assessment',
  },
  {
    id: 'litwin-stringer',
    title: 'پرسشنامه جو سازمانی Litwin & Stringer',
    desc: 'ارزیابی ابعاد مختلف جو سازمانی',
    icon: `${T}/icons/quest-litwin-climate.png`,
    category: 'سازمان و فرهنگ',
    categoryTone: 'violet',
    questions: 26,
    minutes: 10,
    formats: 'PDF / Word',
    rating: 4.5,
    downloads: '۲۰۰۰',
    access: 'free',
    topicId: 'culture',
    fileId: 'word',
    usageId: 'org',
  },
  {
    id: 'managerial-competency',
    title: 'پرسشنامه شایستگی مدیریتی',
    desc: 'ارزیابی شایستگی‌های کلیدی مدیران',
    icon: `${T}/icons/quest-competency.png`,
    category: 'رهبری و مدیریت',
    categoryTone: 'blue',
    questions: 40,
    minutes: 20,
    formats: 'PDF / Word',
    rating: 4.4,
    downloads: '۳۸۰۰',
    access: 'free',
    topicId: 'leadership',
    fileId: 'pdf',
    usageId: 'hiring',
  },
  {
    id: 'minnesota-satisfaction',
    title: 'پرسشنامه رضایت شغلی مینه‌سوتا',
    desc: 'ارزیابی میزان رضایت شغلی کارکنان',
    icon: `${T}/icons/quest-minnesota.png`,
    category: 'منابع انسانی',
    categoryTone: 'rose',
    questions: 20,
    minutes: 10,
    formats: 'PDF / Word',
    rating: 4.6,
    downloads: '۲۸۰۰',
    access: 'free',
    topicId: 'job-satisfaction',
    fileId: 'pdf',
    usageId: 'assessment',
  },
  {
    id: 'mbti-type',
    title: 'پرسشنامه تیپ شخصیتی MBTI',
    desc: 'شناخت تیپ‌های شخصیتی و ترجیحات رفتاری',
    icon: `${T}/icons/quest-mbti-type.png`,
    category: 'شخصیت و رفتار',
    categoryTone: 'orange',
    questions: 60,
    minutes: 25,
    formats: 'PDF / Word',
    rating: 4.9,
    downloads: '۵۰۰۰',
    access: 'premium',
    topicId: 'behaviour',
    fileId: 'word',
    usageId: 'personal',
  },
];

export const questTotal = '۱۰۸';
export const questSearchLabel = 'جستجوی کلیدواژه...';

/** The four the landing leads with — each has its own large icon there. */
export const popularQuestionnaires = [
  {
    id: 'minnesota-satisfaction',
    title: 'پرسشنامه رضایت شغلی',
    desc: 'ارزیابی میزان رضایت شغلی و عوامل مؤثر بر آن',
    icon: `${T}/icons/quest-job-satisfaction.png`,
    questions: 36,
    format: 'PDF',
  },
  {
    id: 'allen-meyer-commitment',
    title: 'پرسشنامه تعهد سازمانی',
    desc: 'سنجش تعهد سازمانی کارکنان بر اساس مدل‌های معتبر',
    icon: `${T}/icons/quest-org-commitment.png`,
    questions: 26,
    format: 'PDF',
  },
  {
    id: 'neo-ffi',
    title: 'پرسشنامه هوش هیجانی',
    desc: 'ارزیابی ابعاد مختلف هوش هیجانی در محیط کار',
    icon: `${T}/icons/quest-emotional-intel.png`,
    questions: 24,
    format: 'PDF',
  },
  {
    id: 'denison-culture',
    title: 'پرسشنامه فرهنگ سازمانی',
    desc: 'سنجش فرهنگ سازمانی و ارزش‌های حاکم بر سازمان',
    icon: `${T}/icons/quest-org-culture.png`,
    questions: 42,
    format: 'PDF',
  },
];

export const questAiBand = {
  title: 'نمی‌دانید کدام پرسشنامه مناسب شماست؟',
  desc: 'با کمک هوش مصنوعی آریاز، ابزار مناسب هدف خود را پیدا کنید.',
  robot: `${T}/quest-bottom-robot.png`,
  ask: 'می‌خواهم میزان رضایت شغلی کارکنان شرکت را بررسی کنم',
  answerLead: 'برای این هدف پیشنهاد می‌کنم:',
  answers: [
    'پرسشنامه رضایت شغلی مینه‌سوتا',
    'پرسشنامه تعهد سازمانی آلن و مِیِر',
    'پرسشنامه درگیری شغلی اولدهام',
  ],
  points: [
    { title: 'پیشنهاد ابزارهای مکمل', desc: 'برای تحلیل بهتر نتایج', icon: 'lucide:star', color: '#5B34D6' },
    { title: 'توضیح کاربرد ابزار', desc: 'با راهنمایی هوشمند', icon: 'lucide:star', color: '#F26A21' },
    { title: 'پیشنهاد پرسشنامه مناسب', desc: 'برای تحلیل بهتر نتایج', icon: 'lucide:clipboard-check', color: '#0E8A4F' },
  ],
};

export const questBottomCta = {
  title: 'با داده بهتر، تصمیم بهتر بگیرید',
  desc: 'از مجموعه پرسشنامه‌های معتبر آریاز برای ارزیابی دقیق‌تر و اقدام مؤثر استفاده کنید.',
  cta: 'شروع جستجوی پرسشنامه‌ها',
  href: '#results',
  art: `${T}/quest-cta-illus.png`,
};

/* ══════════════════════════════════════════════════════════════
   Detail — /exams/questionnaires/[id]
══════════════════════════════════════════════════════════════ */

export const questDetailTabs = [
  { id: 'intro', label: 'معرفی' },
  { id: 'audience', label: 'کاربرد و مخاطبان' },
  { id: 'scoring', label: 'نحوه امتیازدهی' },
  { id: 'sample', label: 'نمونه سوالات' },
  { id: 'sources', label: 'منابع و اعتبار' },
  { id: 'reviews', label: 'نظرات کاربران' },
] as const;

export type QuestDetailTab = (typeof questDetailTabs)[number]['id'];

export const questChat = {
  title: 'ایجنت آریاز',
  status: 'آنلاین',
  greeting: 'سلام! من ایجنت آریاز هستم. هر سوالی درباره این پرسشنامه دارید بپرسید.',
  suggestions: [
    'این پرسشنامه برای چه کسانی مناسب است؟',
    'نحوه نمره‌گذاری چگونه است؟',
    'تفاوت تعهد عاطفی و مستمر چیست؟',
    'آیا این ابزار معتبر است؟',
  ],
  placeholder: 'پیام خود را بنویسید...',
  note: 'پاسخ‌ها توسط هوش مصنوعی آریاز ارائه می‌شود',
};

export interface QuestDetail extends Questionnaire {
  tagline: string;
  heroArt: string;
  introArt: string;
  intro: string[];
  dimensions: { title: string; desc: string; icon: string; color: string }[];
  specs: { label: string; value: string; icon: string }[];
  audience: string[];
  scoring: string[];
  sampleItems: string[];
  sources: string[];
  related: { title: string; desc: string; icon: string; color: string; cta: string; href: string }[];
  articles: { title: string; thumb: string; tag: string; minutes: string; href: string }[];
  path: { n: number; title: string; desc: string }[];
  ratingScore: string;
  ratingCount: string;
  reviews: { name: string; role: string; avatar: string; stars: number; date: string; text: string }[];
}

const related = [
  {
    title: 'کتاب‌های مرتبط',
    desc: 'کتاب‌های معتبر در زمینه تعهد سازمانی و رفتار سازمانی',
    icon: 'lucide:book-open',
    color: '#7C3AED',
    cta: 'مشاهده کتاب‌ها',
    href: '/books',
  },
  {
    title: 'فرم‌های مرتبط',
    desc: 'فرم‌ها و چک‌لیست‌های مرتبط با ارزیابی کارکنان',
    icon: 'lucide:file-text',
    color: '#2563EB',
    cta: 'مشاهده فرم‌ها',
    href: '/forms',
  },
  {
    title: 'ابزارهای مرتبط',
    desc: 'ابزارهای تحلیل و ارزیابی مرتبط با سنجش تعهد سازمانی',
    icon: 'lucide:briefcase',
    color: '#EA6E0C',
    cta: 'مشاهده ابزارها',
    href: '/tools',
  },
  {
    title: 'دوره‌های مرتبط',
    desc: 'دوره‌های آموزشی مرتبط با تعهد سازمانی و رفتار کارکنان',
    icon: 'lucide:graduation-cap',
    color: '#5B34D6',
    cta: 'مشاهده دوره‌ها',
    href: '/courses',
  },
  {
    title: 'ایجنت‌های مرتبط',
    desc: 'مشاوره و تحلیل هوشمند در زمینه تعهد سازمانی',
    icon: 'lucide:bot',
    color: '#0E8A4F',
    cta: 'مشاهده ایجنت‌ها',
    href: '/agents',
  },
];

const questArticles = [
  {
    title: 'بهترین ابزارهای سنجش تعهد سازمانی',
    thumb: `${T}/articles/mbti-article-01-insurance.png`,
    tag: 'پژوهشی',
    minutes: '۹ دقیقه مطالعه',
    href: '/articles',
  },
  {
    title: 'تفاوت تعهد عاطفی، مستمر و هنجاری',
    thumb: `${T}/articles/mbti-article-02-payments.png`,
    tag: 'منابع انسانی',
    minutes: '۷ دقیقه مطالعه',
    href: '/articles',
  },
  {
    title: 'نقش رهبران در تقویت تعهد سازمانی',
    thumb: `${T}/articles/mbti-article-03-wage.png`,
    tag: 'مدیریت',
    minutes: '۱۵ دقیقه مطالعه',
    href: '/articles',
  },
  {
    title: '۷ راهکار عملی برای افزایش تعهد کارکنان',
    thumb: `${T}/articles/mbti-article-04-regulations.png`,
    tag: 'رفتار سازمانی',
    minutes: '۵ دقیقه مطالعه',
    href: '/articles',
  },
];

export function getQuestionnaire(id: string): QuestDetail | undefined {
  const quest = questionnaires.find((q) => q.id === id);
  if (!quest) return undefined;

  return {
    ...quest,
    tagline:
      'یکی از معتبرترین ابزارهای سنجش تعهد سازمانی که تعهد عاطفی، مستمر و هنجاری را به‌صورت دقیق و تفکیک‌شده اندازه‌گیری می‌کند',
    heroArt: `${T}/quest-detail-hero.png`,
    introArt: `${T}/quest-intro-illus.png`,
    intro: [
      'پرسشنامه تعهد سازمانی آلن و مِیِر (Allen & Meyer Organizational Commitment) توسط جان مِیِر و ناتالی آلن در سال ۱۹۹۱ توسعه یافته است. این ابزار با هدف سنجش سه بُعد اصلی تعهد کارکنان به سازمان طراحی شده و در تحقیقات و سازمان‌های بسیاری در سراسر جهان مورد استفاده قرار می‌گیرد.',
    ],
    dimensions: [
      {
        title: 'تعهد عاطفی',
        desc: 'احساس تعلق و وابستگی عاطفی فرد به سازمان و تمایل به ماندن در آن',
        icon: 'lucide:heart',
        color: '#0E8A4F',
      },
      {
        title: 'تعهد مستمر',
        desc: 'ارزیابی هزینه‌های ترک سازمان و ملاحظات مادی مرتبط با ماندن',
        icon: 'lucide:briefcase',
        color: '#EA6E0C',
      },
      {
        title: 'تعهد هنجاری',
        desc: 'احساس وظیفه و الزام اخلاقی برای ماندن در سازمان',
        icon: 'lucide:users-round',
        color: '#5B34D6',
      },
    ],
    specs: [
      { label: 'تعداد سوالات', value: `${toPersian(quest.questions)} سوال`, icon: 'lucide:clipboard-list' },
      { label: 'زمان اجرا', value: `حدود ${toPersian(quest.minutes)} دقیقه`, icon: 'lucide:clock' },
      { label: 'مقیاس', value: 'لیکرت ۵ درجه‌ای (کاملاً مخالفم تا کاملاً موافقم)', icon: 'lucide:gauge' },
      { label: 'جامعه هدف', value: 'کارکنان و اعضای سازمان‌ها', icon: 'lucide:users-round' },
      { label: 'نحوه تحلیل', value: 'تحلیل کمی و نرم‌افزارهای آماری (مثلاً SPSS)', icon: 'lucide:chart-no-axes-combined' },
    ],
    audience: [
      'واحدهای منابع انسانی برای سنجش وضعیت تعهد کارکنان',
      'پژوهشگران و دانشجویان رشته‌های مدیریت و روانشناسی صنعتی',
      'مشاوران سازمانی در پروژه‌های تحول و فرهنگ',
      'مدیران تیم برای شناخت ریشه‌های ترک خدمت',
    ],
    scoring: [
      'هر گویه در مقیاس لیکرت پنج‌درجه‌ای نمره‌گذاری می‌شود.',
      'گویه‌های معکوس پیش از جمع‌بندی باید بازکدگذاری شوند.',
      'نمره هر بُعد از میانگین گویه‌های همان بُعد به دست می‌آید.',
      'نمره کل تعهد، میانگین سه بُعد عاطفی، مستمر و هنجاری است.',
    ],
    sampleItems: [
      'احساس می‌کنم مشکلات این سازمان، مشکلات خودم است.',
      'ماندن در این سازمان برای من یک ضرورت است، نه فقط یک انتخاب.',
      'احساس می‌کنم به افراد این سازمان مدیون هستم.',
      'خوشحال می‌شوم بقیه دوران کاری‌ام را در این سازمان بگذرانم.',
    ],
    sources: [
      'Meyer, J. P., & Allen, N. J. (1991). A three-component conceptualization of organizational commitment.',
      'روایی و پایایی نسخه فارسی در پژوهش‌های متعدد داخلی تأیید شده است.',
      'ضریب آلفای کرونباخ گزارش‌شده برای ابعاد بین ۰٫۷۹ تا ۰٫۸۸.',
    ],
    related,
    articles: questArticles,
    path: [
      { n: 1, title: 'مفاهیم پایه تعهد سازمانی', desc: 'آشنایی با تعاریف و مدل‌ها' },
      { n: 2, title: 'روش‌های سنجش تعهد', desc: 'ابزارها و پرسشنامه‌های معتبر' },
      { n: 3, title: 'تحلیل نتایج', desc: 'روش‌های تحلیل کمی و کیفی' },
      { n: 4, title: 'راهکارهای افزایش تعهد', desc: 'استراتژی‌ها و برنامه‌های عملی' },
      { n: 5, title: 'ارزیابی و بهبود مستمر', desc: 'پایش و ارتقای برنامه‌های تعهد' },
    ],
    ratingScore: '۴.۸',
    ratingCount: '۱۶۷',
    reviews: [
      {
        name: 'علی رضایی',
        role: 'مشاور سازمانی',
        avatar: `${T}/people/mbti-reviewer-01.png`,
        stars: 4,
        date: '۱۴۰۳/۰۵/۱۲',
        text: 'از معتبرترین ابزارهای موجود در زمینه منابع انسانی است؛ استفاده و تحلیل نتایج قابل‌اتکاست.',
      },
      {
        name: 'سارا کریمی',
        role: 'پژوهشگر دانشگاه',
        avatar: `${T}/people/mbti-reviewer-02.png`,
        stars: 3,
        date: '۱۴۰۳/۰۴/۲۵',
        text: 'برای پژوهش پایان‌نامه از این پرسشنامه استفاده کردم؛ اعتبار علمی و روایی آن بسیار خوب بود.',
      },
      {
        name: 'محمد احمدی',
        role: 'مدیر منابع انسانی',
        avatar: `${T}/people/result-agent-01.png`,
        stars: 4,
        date: '۱۴۰۳/۰۴/۲۹',
        text: 'نتیجه آن به ما در تصمیم‌گیری‌های مدیریتی کمک زیادی کرد.',
      },
    ],
  };
}

export const questIds = questionnaires.map((q) => q.id);

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
