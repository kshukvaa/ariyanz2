/* ──────────────────────────────────────────────────────────────
   Ariyaz — آزمون‌ها.

   Feeds five screens that share one design language:
     /exams                        — the tests landing
     /exams/tests                  — the test catalogue
     /exams/tests/[id]             — a single test
     /exams/tests/[id]/start       — the question flow
     /exams/tests/[id]/result      — the report

   The 3D test icons are the strongest thing in the asset set, so
   every card leads with one and the surrounding chrome stays flat.
────────────────────────────────────────────────────────────── */

import type { Tone } from '@/data/free';

const T = '/images/tests';

/** Read off the mockups — violet leads, orange is only ever the CTA. */
export const testTheme = {
  violet: '#5B34D6',
  violetSoft: '#F3F0FF',
  orange: '#F26A21',
  green: '#0E8A4F',
  navy: '#16305B',
  border: '#E7E9F4',
  page: '#F7F8FC',
} as const;

/* ══════════════════════════════════════════════════════════════
   Landing — /exams
══════════════════════════════════════════════════════════════ */

export const testsHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'آزمون‌ها', href: '/exams' },
  ],
  title: 'آزمون‌های تخصصی آریاز',
  desc: [
    'شناخت بهتر خود، توسعه فردی و تصمیم‌های حرفه‌ای',
    'با ابزارهای معتبر روانشناسی و مدیریتی',
  ],
  chips: [
    { label: '۵۰+ آزمون تخصصی', icon: 'lucide:clipboard-list', color: '#F26A21' },
    { label: 'تحلیل هوشمند نتایج', icon: 'lucide:chart-no-axes-combined', color: '#3B4FD8' },
    { label: 'مناسب افراد و سازمان‌ها', icon: 'lucide:users-round', color: '#0E8A4F' },
  ],
  primary: { label: 'شروع آزمون‌ها', href: '/exams/tests' },
  secondary: { label: 'مشاهده نمونه گزارش', href: '/exams/tests/mbti/result' },
  art: `${T}/tests-hero.png`,
};

export interface LandingRoute {
  id: string;
  title: string;
  desc: string;
  icon: string;
  accent: string;
  cta: string;
  href: string;
}

/** Three ways in, in the order the mockup reads them (right to left). */
export const testsRoutes: LandingRoute[] = [
  {
    id: 'individual',
    title: 'آزمون فردی',
    desc: 'برای افرادی که می‌خواهند خودشان را بهتر بشناسند، نقاط قوت خود را کشف کنند و مسیر توسعه فردی خود را طراحی کنند.',
    icon: 'lucide:user-round',
    accent: '#5B34D6',
    cta: 'شروع آزمون‌ها',
    href: '/exams/tests',
  },
  {
    id: 'questionnaires',
    title: 'کتابخانه پرسشنامه‌ها',
    desc: 'مجموعه‌ای از پرسشنامه‌های معتبر روانشناسی، مدیریتی و منابع انسانی برای دانلود و استفاده حرفه‌ای.',
    icon: 'lucide:clipboard-list',
    accent: '#0E8A4F',
    cta: 'مشاهده پرسشنامه‌ها',
    href: '/exams/questionnaires',
  },
  {
    id: 'organisation',
    title: 'راهکار سازمانی',
    desc: 'ارزیابی کارکنان، تحلیل سرمایه انسانی و دریافت گزارش‌های مدیریتی برای تصمیم‌گیری بهتر.',
    icon: 'lucide:building-2',
    accent: '#F26A21',
    cta: 'درخواست نسخه سازمانی',
    href: '/org',
  },
];

export const testsAiBand = {
  title: 'آزمون مناسب خود را',
  titleAccent: 'با کمک هوش مصنوعی پیدا کنید',
  desc: [
    'هوش مصنوعی آریاز با تحلیل نیازها و اهداف شما،',
    'بهترین آزمون‌ها و مسیر توسعه را پیشنهاد می‌دهد.',
  ],
  art: `${T}/tests-brain-ai-chip.png`,
  robot: `${T}/tests-chat-robot.png`,
  ask: 'من مدیر فروش هستم و می‌خواهم مهارت رهبری خودم را توسعه بدهم',
  answerLead: 'بر اساس هدف شما، این آزمون‌ها پیشنهاد می‌شوند:',
  answers: ['تست رهبری و سبک مدیریت', 'هوش هیجانی (EQ)', 'تست شخصیت MBTI'],
  points: [
    { title: 'پیشنهاد آزمون مناسب', desc: 'بر اساس هدف و نقش شما', icon: 'lucide:target', color: '#0E8A4F' },
    { title: 'تحلیل هوشمند نتایج', desc: 'گزارش دقیق و کاربردی', icon: 'lucide:chart-no-axes-combined', color: '#3B4FD8' },
    { title: 'پیشنهاد مسیر توسعه', desc: 'دوره‌ها و منابع متناسب با شما', icon: 'lucide:route', color: '#F26A21' },
  ],
};

/** The four steps are a real sequence, so they carry numbers. */
export const testsHowItWorks = [
  { n: 1, title: 'انتخاب آزمون', desc: 'آزمون مناسب خود را انتخاب کنید', icon: 'lucide:clipboard-list' },
  { n: 2, title: 'پاسخ به سوالات', desc: 'به سوالات به صورت آنلاین پاسخ دهید', icon: 'lucide:list-checks' },
  { n: 3, title: 'دریافت تحلیل هوشمند', desc: 'گزارش دقیق و تحلیل شخصی خود را دریافت کنید', icon: 'lucide:sparkles' },
  { n: 4, title: 'شروع مسیر توسعه', desc: 'منابع و راهکارهای پیشنهادی را دنبال کنید', icon: 'lucide:route' },
];

export const testsOrgCta = {
  title: 'برای سازمان خود ارزیابی هوشمند کارکنان را شروع کنید',
  desc: [
    'کارکنان خود را ارزیابی کنید، الگوهای سازمانی را بشناسید',
    'و تصمیم‌های توسعه‌ای دقیق‌تر بگیرید.',
  ],
  cta: 'درخواست نسخه سازمانی',
  href: '/org',
  art: `${T}/quest-cta-illus.png`,
};

/* ══════════════════════════════════════════════════════════════
   Catalogue — /exams/tests
══════════════════════════════════════════════════════════════ */

export const testArchiveHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'آزمون‌های فردی', href: '/exams/tests' },
  ],
  title: 'آزمون‌های فردی آریاز',
  desc: [
    'خودتان را بهتر بشناسید، نقاط قوت و فرصت‌های رشد خود را کشف کنید',
    'و مسیر توسعه فردی خود را با آزمون‌های معتبر شروع کنید.',
  ],
  art: `${T}/test-archive-hero.png`,
  primary: { label: 'شروع اولین آزمون‌ها', href: '#results' },
  secondary: { label: 'مشاهده نمونه گزارش', href: '/exams/tests/mbti/result' },
};

export const testAiBanner = {
  title: 'نمی‌دانید کدام آزمون مناسب شماست؟',
  desc: 'با چند سوال کوتاه، آزمون مناسب خود را پیدا کنید.',
  cta: 'پیشنهاد آزمون با هوش مصنوعی',
  robot: `${T}/tests-chat-robot.png`,
};

export const testTabs = [
  { id: 'all', label: 'همه آزمون‌ها', icon: 'lucide:grid-2x2' },
  { id: 'popular', label: 'محبوب ترین', icon: 'lucide:flame' },
  { id: 'premium', label: 'ویژه', icon: 'lucide:star' },
  { id: 'free', label: 'رایگان', icon: 'lucide:gift' },
] as const;

export type TestTab = (typeof testTabs)[number]['id'];

export const testSorts = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'popular', label: 'محبوب‌ترین' },
  { id: 'rating', label: 'بالاترین امتیاز' },
];

export interface TestFacet {
  id: string;
  title: string;
  items: { id: string; label: string }[];
}

export const testFacets: TestFacet[] = [
  {
    id: 'topic',
    title: 'موضوع آزمون',
    items: [
      { id: 'personality', label: 'شخصیت‌شناسی' },
      { id: 'ability', label: 'هوش و توانمندی' },
      { id: 'career', label: 'شغلی و حرفه‌ای' },
      { id: 'leadership', label: 'رهبری' },
      { id: 'relations', label: 'روابط و تعاملات' },
      { id: 'personal', label: 'توسعه فردی' },
      { id: 'wellbeing', label: 'سلامت روان' },
    ],
  },
  {
    id: 'goal',
    title: 'هدف آزمون',
    items: [
      { id: 'self', label: 'شناخت خود' },
      { id: 'growth', label: 'توسعه فردی' },
      { id: 'job', label: 'انتخاب شغل' },
      { id: 'lead', label: 'توسعه رهبری' },
      { id: 'bond', label: 'بهبود روابط' },
    ],
  },
  {
    id: 'time',
    title: 'زمان آزمون',
    items: [
      { id: 'lt10', label: 'کمتر از ۱۰ دقیقه' },
      { id: '10to20', label: '۱۰ تا ۲۰ دقیقه' },
      { id: 'gt20', label: 'بیشتر از ۲۰ دقیقه' },
    ],
  },
  {
    id: 'audience',
    title: 'مخاطب',
    items: [
      { id: 'individual', label: 'فردی' },
      { id: 'managers', label: 'مدیران' },
      { id: 'staff', label: 'کارکنان' },
    ],
  },
];

export interface Test {
  id: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  categoryTone: Tone;
  minutes: number;
  questions: number;
  rating: number;
  takers: string;
  access: 'free' | 'premium';
  topicId: string;
  goalId: string;
  timeId: string;
  audienceId: string;
}

export const tests: Test[] = [
  {
    id: 'mbti',
    title: 'تست شخصیت شناسی MBTI',
    desc: 'شناخت تیپ شخصیتی و سبک تصمیم‌گیری بر اساس مدل ۱۶ تیپ شخصیتی',
    icon: `${T}/icons/test-mbti-alt.png`,
    category: 'شخصیت‌شناسی',
    categoryTone: 'orange',
    minutes: 15,
    questions: 60,
    rating: 4.8,
    takers: '+۲۸۰۰',
    access: 'premium',
    topicId: 'personality',
    goalId: 'self',
    timeId: '10to20',
    audienceId: 'individual',
  },
  {
    id: 'eq',
    title: 'تست هوش هیجانی EQ',
    desc: 'ارزیابی سطح هوش هیجانی و مهارت‌های مدیریت احساسات و روابط',
    icon: `${T}/icons/test-eq-alt.png`,
    category: 'هوش هیجانی',
    categoryTone: 'violet',
    minutes: 20,
    questions: 20,
    rating: 4.7,
    takers: '+۱۸۰۰',
    access: 'free',
    topicId: 'ability',
    goalId: 'growth',
    timeId: '10to20',
    audienceId: 'individual',
  },
  {
    id: 'leadership',
    title: 'تست سبک رهبری',
    desc: 'شناخت سبک رهبری و توانایی‌های مدیریتی شما',
    icon: `${T}/icons/test-leadership-alt.png`,
    category: 'رهبری',
    categoryTone: 'violet',
    minutes: 20,
    questions: 20,
    rating: 4.7,
    takers: '+۱۵۰۰',
    access: 'free',
    topicId: 'leadership',
    goalId: 'lead',
    timeId: '10to20',
    audienceId: 'managers',
  },
  {
    id: 'career-aptitude',
    title: 'تست استعداد شغلی',
    desc: 'کشف استعدادها و علایق شغلی برای انتخاب مسیر مناسب',
    icon: `${T}/icons/test-career-alt.png`,
    category: 'شغلی و حرفه‌ای',
    categoryTone: 'violet',
    minutes: 40,
    questions: 60,
    rating: 4.5,
    takers: '۹۵۰۰',
    access: 'free',
    topicId: 'career',
    goalId: 'job',
    timeId: 'gt20',
    audienceId: 'individual',
  },
  {
    id: 'motivation',
    title: 'تست انگیزش',
    desc: 'ارزیابی سطح انگیزش و عوامل مؤثر بر عملکرد شما',
    icon: `${T}/icons/test-motivation.png`,
    category: 'توسعه فردی',
    categoryTone: 'violet',
    minutes: 20,
    questions: 20,
    rating: 4.6,
    takers: '۷۱۰۰',
    access: 'free',
    topicId: 'personal',
    goalId: 'growth',
    timeId: '10to20',
    audienceId: 'individual',
  },
  {
    id: 'communication',
    title: 'تست مهارت‌های ارتباطی',
    desc: 'ارزیابی مهارت‌های ارتباطی و توانایی تعامل مؤثر با دیگران',
    icon: `${T}/icons/test-communication.png`,
    category: 'روابط و تعاملات',
    categoryTone: 'violet',
    minutes: 40,
    questions: 40,
    rating: 4.6,
    takers: '۶۹۰۰',
    access: 'free',
    topicId: 'relations',
    goalId: 'bond',
    timeId: 'gt20',
    audienceId: 'individual',
  },
  {
    id: 'stress',
    title: 'تست استرس و اضطراب',
    desc: 'ارزیابی میزان استرس، اضطراب و سلامت روان شما',
    icon: `${T}/icons/test-stress-anxiety.png`,
    category: 'سلامت روان',
    categoryTone: 'violet',
    minutes: 25,
    questions: 20,
    rating: 4.3,
    takers: '+۵۶۰۰',
    access: 'free',
    topicId: 'wellbeing',
    goalId: 'self',
    timeId: 'gt20',
    audienceId: 'individual',
  },
  {
    id: 'cognitive',
    title: 'تست هوش شناختی',
    desc: 'سنجش توانایی‌های شناختی و سطح هوش عمومی شما',
    icon: `${T}/icons/test-cognitive.png`,
    category: 'هوش و توانمندی',
    categoryTone: 'violet',
    minutes: 40,
    questions: 50,
    rating: 4.6,
    takers: '۱۱۱۰۰',
    access: 'free',
    topicId: 'ability',
    goalId: 'self',
    timeId: 'gt20',
    audienceId: 'individual',
  },
];

export const testsTotal = '۵۲';
export const testSearchLabel = 'جستجوی آزمون...';

/** The landing shows the four best-known tests with their large icons. */
export const popularTests = [
  { id: 'mbti', icon: `${T}/icons/test-mbti.png` },
  { id: 'eq', icon: `${T}/icons/test-eq.png` },
  { id: 'leadership', icon: `${T}/icons/test-leadership.png` },
  { id: 'career-aptitude', icon: `${T}/icons/test-career-aptitude.png` },
].map((p) => ({ ...tests.find((t) => t.id === p.id)!, icon: p.icon }));

/* ══════════════════════════════════════════════════════════════
   Detail — /exams/tests/[id]
══════════════════════════════════════════════════════════════ */

export const testDetailTabs = [
  { id: 'about', label: 'درباره این تست', icon: 'lucide:info' },
  { id: 'goal', label: 'هدف تست', icon: 'lucide:target' },
  { id: 'structure', label: 'ساختار سوالات', icon: 'lucide:list-checks' },
  { id: 'notes', label: 'نکات کلیدی', icon: 'lucide:lightbulb' },
  { id: 'sample', label: 'نمونه گزارش', icon: 'lucide:file-spreadsheet' },
] as const;

export type TestDetailTab = (typeof testDetailTabs)[number]['id'];

export interface TestDetail extends Test {
  tagline: string;
  heroArt: string;
  specs: { label: string; value: string; icon: string }[];
  about: string[];
  goal: string[];
  structure: string[];
  notes: string[];
  sample: string[];
  columns: {
    title: string;
    icon: string;
    tone: Tone;
    items: string[];
    cta: string;
    href: string;
  }[];
  articles: { title: string; thumb: string; date: string; href: string }[];
  ratingScore: string;
  ratingCount: string;
  reviews: { name: string; avatar: string; stars: number; date: string; text: string }[];
}

export const testAskPanel = {
  title: 'درباره این تست سوال دارید؟',
  desc: 'با دستیار هوشمند آریاز، درباره این تست سوال خود را بپرسید و پاسخ دقیق دریافت کنید',
  placeholder: 'سوال خود را درباره این تست بنویسید',
  cta: 'پرسش از دستیار آریاز',
  art: `${T}/mbti-ai-robot.png`,
};

export const testLearningPath = {
  title: 'مسیر یادگیری مرتبط با تست‌های شخصیت‌شناسی',
  desc: 'برای شناخت بهتر خود و بهبود روابط فردی و حرفه‌ای، مسیر یادگیری پیشنهادی آریاز را دنبال کنید.',
  cta: 'مشاهده مسیر یادگیری',
  href: '/learning-paths',
  art: `${T}/mbti-learning-path-art.png`,
};

const testColumns: TestDetail['columns'] = [
  {
    title: 'فرم‌ها و دستورالعمل‌ها',
    icon: 'lucide:file-text',
    tone: 'rose',
    items: ['فرم برنامه توسعه فردی', 'فرم بازخورد ۳۶۰ درجه', 'دستورالعمل تفسیر نتایج'],
    cta: 'مشاهده همه',
    href: '/forms',
  },
  {
    title: 'ابزارهای مرتبط',
    icon: 'lucide:wrench',
    tone: 'green',
    items: ['ابزار تحلیل SWOT شخصی', 'چک‌لیست برنامه‌ریزی استراتژیک', 'ماشین حساب مسیر شغلی'],
    cta: 'مشاهده همه',
    href: '/tools',
  },
  {
    title: 'آزمون‌ها و تست‌های مرتبط',
    icon: 'lucide:clipboard-check',
    tone: 'orange',
    items: ['تست هوش هیجانی EQ', 'تست سبک رهبری', 'تست استعداد شغلی'],
    cta: 'مشاهده همه',
    href: '/exams/tests',
  },
  {
    title: 'دوره‌های مرتبط',
    icon: 'lucide:graduation-cap',
    tone: 'blue',
    items: ['خودشناسی و توسعه فردی', 'مهارت‌های ارتباطی مؤثر', 'رهبری و نفوذ در دیگران'],
    cta: 'مشاهده همه',
    href: '/courses',
  },
  {
    title: 'ایجنت‌های مرتبط',
    icon: 'lucide:bot',
    tone: 'violet',
    items: ['ایجنت توسعه فردی', 'ایجنت تحلیل شغلی', 'ایجنت هدف‌گذاری'],
    cta: 'مشاهده همه',
    href: '/agents',
  },
];

const testArticles = [
  {
    title: 'راهنمای جامع شناخت تیپ‌های شخصیتی',
    thumb: `${T}/articles/mbti-article-01-insurance.png`,
    date: '۱۴۰۳/۰۳/۲۱',
    href: '/articles',
  },
  {
    title: 'چگونه از نتیجه آزمون در مسیر شغلی استفاده کنیم؟',
    thumb: `${T}/articles/mbti-article-02-payments.png`,
    date: '۱۴۰۳/۰۳/۲۶',
    href: '/articles',
  },
  {
    title: 'تأثیر خودشناسی بر تصمیم‌های حرفه‌ای',
    thumb: `${T}/articles/mbti-article-03-wage.png`,
    date: '۱۴۰۳/۰۳/۱۵',
    href: '/articles',
  },
  {
    title: 'اشتباه‌های رایج در تفسیر تست‌های شخصیت',
    thumb: `${T}/articles/mbti-article-04-regulations.png`,
    date: '۱۴۰۳/۰۳/۲۹',
    href: '/articles',
  },
];

export function getTest(id: string): TestDetail | undefined {
  const test = tests.find((t) => t.id === id);
  if (!test) return undefined;

  return {
    ...test,
    tagline:
      'با شناخت ترجیحات شخصیتی خود، الگوهای رفتاری، شیوه تصمیم‌گیری و سبک تعامل خود را بهتر بشناسید و در مسیر توسعه فردی و حرفه‌ای گام بردارید',
    heroArt: `${T}/mbti-detail-hero.png`,
    specs: [
      { label: 'نوع تست', value: 'شخصیتی', icon: 'lucide:user-round' },
      { label: 'زمان انجام', value: `${toPersian(test.minutes)} دقیقه`, icon: 'lucide:clock' },
      { label: 'تعداد سوال', value: `${toPersian(test.questions)} سوال`, icon: 'lucide:circle-help' },
      { label: 'مناسب برای', value: 'جذب و توسعه کارکنان', icon: 'lucide:users-round' },
    ],
    about: [
      'تست MBTI یکی از معتبرترین ابزارهای شخصیتی در جهان است که بر اساس نظریه‌های کارل یونگ و توسعه کاترین بریگز و ایزابل بریگز مایرز طراحی شده است.',
      'این تست به شما کمک می‌کند تا ترجیحات ذاتی خود را در چهار بُعد اصلی بهتر بشناسید و درک عمیق‌تری از رفتارها و سبک ارتباطی خود به دست آورید.',
      'MBTI با ارائه ۱۶ تیپ شخصیتی مختلف، تصویری روشن از نقاط قوت و چالش‌ها و فرصت‌های شما ارائه می‌دهد.',
      'شناخت تیپ شخصیتی می‌تواند در بهبود روابط فردی، انتخاب شغل مناسب، افزایش بهره‌وری و مدیریت تیم‌ها بسیار مؤثر باشد.',
      'این آزمون به صورت استاندارد طراحی شده و در سازمان‌ها و شرکت‌های معتبر جهانی برای جذب، ارزیابی و توسعه کارکنان استفاده می‌شود.',
      'گزارش نهایی شامل تحلیل جامع تیپ شخصیتی شما، نقاط قوت، نقاط قابل بهبود و پیشنهادهای کاربردی برای رشد فردی و حرفه‌ای است.',
      'با انجام این تست، گامی مهم در مسیر خودشناسی و رشد آگاهانه برمی‌دارید.',
    ],
    goal: [
      'شناخت ترجیحات ذاتی در چهار بُعد اصلی شخصیت',
      'درک بهتر سبک تصمیم‌گیری و حل مسئله',
      'انتخاب مسیر شغلی متناسب با تیپ شخصیتی',
      'بهبود کیفیت ارتباط با همکاران و مدیران',
    ],
    structure: [
      `${toPersian(test.questions)} سوال دوگزینه‌ای و طیفی`,
      'هر سوال یک پاسخ دارد و پاسخ درست یا غلط وجود ندارد',
      'زمان پیشنهادی هر سوال حدود ۱۵ ثانیه است',
      'امکان بازگشت به سوال قبل تا پیش از پایان آزمون',
    ],
    notes: [
      'اولین پاسخی که به ذهنتان می‌رسد معمولاً دقیق‌ترین است',
      'به رفتار واقعی خود پاسخ دهید، نه رفتار آرمانی',
      'آزمون را در محیطی آرام و بدون وقفه انجام دهید',
      'نتیجه، تصویری از ترجیحات است نه محدودیت توانایی‌ها',
    ],
    sample: [
      'تیپ شخصیتی و شرح کوتاه آن',
      'نمودار توانمندی‌ها در پنج محور',
      'نقاط قوت و حوزه‌های قابل توسعه',
      'پیشنهاد دوره، مقاله، ابزار و ایجنت متناسب با نتیجه',
    ],
    columns: testColumns,
    articles: testArticles,
    ratingScore: '۴.۷',
    ratingCount: '۹۴۶',
    reviews: [
      {
        name: 'علی رضایی',
        avatar: `${T}/people/mbti-reviewer-01.png`,
        stars: 5,
        date: '۱۴۰۴/۰۶/۱۵',
        text: 'تجربه‌ای خوب و کاربردی بود؛ تحلیل نتیجه دقیقاً همان چیزی بود که دنبالش بودم.',
      },
      {
        name: 'پریسا موسوی',
        avatar: `${T}/people/mbti-reviewer-02.png`,
        stars: 5,
        date: '۱۴۰۴/۰۶/۱۵',
        text: 'سوال‌ها روشن و بدون ابهام بودند و گزارش پایانی خیلی خوب نوشته شده بود.',
      },
    ],
  };
}

export const testIds = tests.map((t) => t.id);

/* ══════════════════════════════════════════════════════════════
   The question flow — /exams/tests/[id]/start
══════════════════════════════════════════════════════════════ */

export const quizMeta = {
  logo: `${T}/aryaz-logo-tagline.png`,
  robot: `${T}/quiz-chat-robot.png`,
  subtitle: 'ارزیابی ترجیحات شخصیتی و الگوهای رفتاری',
  totalQuestions: 60,
  startAt: 15,
  minutes: 12,
  seconds: 45,
  privacy: 'اطلاعات شما نزد ما محفوظ است و فقط برای ارائه نتیجه آزمون استفاده می‌شود.',
  finish: 'پایان آزمون',
  exit: 'خروج از آزمون',
};

export interface QuizQuestion {
  n: number;
  text: string;
  options: string[];
}

/** Four questions cycle through the flow; the numbering runs to sixty. */
export const quizQuestions: QuizQuestion[] = [
  {
    n: 15,
    text: 'وقتی در یک محیط کاری جدید قرار می‌گیرید، معمولاً ترجیح می‌دهید؟',
    options: [
      'ابتدا با افراد آشنا شوم و ارتباط برقرار کنم',
      'ابتدا محیط را بررسی کنم و سپس وارد تعامل شوم',
      'سریع وارد فعالیت شده و تجربه کسب کنم',
      'ترجیح می‌دهم مستقل کار کنم',
    ],
  },
  {
    n: 16,
    text: 'هنگام تصمیم‌گیری درباره یک موضوع مهم، بیشتر به چه چیزی تکیه می‌کنید؟',
    options: [
      'تحلیل داده‌ها و منطق موضوع',
      'تأثیر تصمیم بر افراد درگیر',
      'تجربه‌های مشابه قبلی',
      'مشورت با افراد باتجربه‌تر',
    ],
  },
  {
    n: 17,
    text: 'برنامه کاری هفته خود را چگونه می‌چینید؟',
    options: [
      'با برنامه دقیق و زمان‌بندی مشخص',
      'با فهرست کلی و انعطاف در اجرا',
      'بر اساس اولویت‌های همان روز',
      'بسته به شرایط تیم تغییر می‌دهم',
    ],
  },
  {
    n: 18,
    text: 'پس از یک روز کاری پرفشار، انرژی خود را چطور بازیابی می‌کنید؟',
    options: [
      'وقت گذراندن با دوستان و همکاران',
      'زمان تنهایی و آرامش',
      'ورزش و فعالیت بدنی',
      'مطالعه یا یادگیری چیزی تازه',
    ],
  },
];

export const quizGuide = [
  { text: 'به زمان باقی‌مانده توجه داشته باشید.', icon: 'lucide:clock' },
  { text: 'هر سوال فقط یک پاسخ دارد.', icon: 'lucide:list-checks' },
  { text: 'پاسخ‌ها به صورت کاملاً محرمانه بررسی می‌شوند.', icon: 'lucide:shield-check' },
];

export const quizChat = {
  title: 'ایجنت آریاز',
  lead: 'در مورد این تست سوال دارید؟',
  sub: 'اگر منظور سوال را متوجه نشدید، من اینجا هستم تا راهنمایی‌تان کنم.',
  messages: [
    {
      from: 'agent' as const,
      time: '۱۰:۳۰',
      text: 'سلام! من ایجنت آریاز هستم. اگر سوالی درباره منظور این سوال یا نحوه پاسخ‌دادن دارید، بپرسید تا برایتان توضیح بدهم.',
    },
    { from: 'user' as const, time: '۱۰:۳۱', text: 'من منظور این سوال رو متوجه نشدم' },
    {
      from: 'agent' as const,
      time: '۱۰:۳۱',
      text: 'منظور سوال این است که وقتی وارد یک محیط کاری جدید می‌شوید، کدام رفتار بیشتر به شما طبیعی و راحت‌تر است.\n\nبه این فکر کنید که معمولاً در چنین موقعیتی چه کاری انجام می‌دهید و انجام دادنش برای شما خوشایندتر است.',
    },
  ],
  placeholder: 'پیام خود را بنویسید...',
};

/** The gate that stands between the last answer and the report. */
export const resultGate = {
  title: 'نتایج آزمون شما آماده است!',
  desc: 'برای مشاهده گزارش کامل نتایج و تحلیل شخصیتی خود، لطفاً اطلاعات زیر را وارد کنید.',
  nameLabel: 'نام و نام خانوادگی',
  namePlaceholder: 'نام و نام خانوادگی خود را وارد کنید',
  phoneLabel: 'شماره موبایل',
  phonePlaceholder: 'مثال: ۰۹۱۲ ۱۲۳ ۴۵۶۷',
  privacy: 'شماره موبایل شما نزد ما محفوظ است و برای ارسال نتیجه و پیشنهادهای اختصاصی استفاده می‌شود.',
  cta: 'مشاهده نتایج',
};

/* ══════════════════════════════════════════════════════════════
   Report — /exams/tests/[id]/result
══════════════════════════════════════════════════════════════ */

export const testResult = {
  title: 'نتیجه آزمون شما آماده است',
  typeLabel: 'تیپ شخصیتی شما:',
  type: 'تحلیل‌گر (INTJ)',
  summary: 'شما فردی تحلیل‌محور، مستقل، هدف‌گرا و علاقه‌مند به حل مسائل پیچیده هستید',
  art: `${T}/result-hero.png`,
  facts: [
    { label: 'تاریخ انجام آزمون', value: '۱۴۰۳/۰۳/۱۸', icon: 'lucide:calendar' },
    { label: 'تعداد سوالات', value: '۶۰ سوال', icon: 'lucide:list-checks' },
    { label: 'زمان پاسخ‌گویی', value: '۱۸ دقیقه', icon: 'lucide:clock' },
  ],
  score: { value: 78, of: 100, level: 'سطح بالا' },
  scoreNote: 'شما در این آزمون عملکرد بسیار خوبی داشته‌اید و نقاط قوت چشمگیری در چند محور نشان دادید',
  saveCta: 'ذخیره نتیجه',
  downloadCta: 'دانلود گزارش',
  shareLabel: 'اشتراک‌گذاری نتیجه',
  strengths: [
    'تفکر تحلیلی و استراتژیک',
    'برنامه‌ریزی و سازماندهی',
    'حل مسئله و تصمیم‌گیری',
    'تمرکز و پشتکار بالا',
    'استقلال و خودکفایی',
  ],
  growth: [
    'ارتباطات بین‌فردی',
    'انعطاف‌پذیری در تصمیم‌گیری',
    'ابراز احساسات',
    'کار تیمی و همکاری',
    'توجه به جزئیات در اجرا',
  ],
  radar: [
    { label: 'تحلیل‌گری', value: 85, avg: 62 },
    { label: 'رهبری', value: 75, avg: 60 },
    { label: 'خلاقیت', value: 80, avg: 65 },
    { label: 'ارتباطات', value: 65, avg: 70 },
    { label: 'برنامه‌ریزی', value: 90, avg: 64 },
  ],
  chat: {
    title: 'تحلیل نتایج شما',
    lead: 'من ایجنت آریاز هستم. نتایج آزمون شما را تحلیل کرده‌ام. سوالی دارید؟ خوشحال می‌شوم کمکتان کنم.',
    messages: [
      {
        from: 'agent' as const,
        time: '۱۰:۳۲',
        text: 'سلام! بر اساس نتایج شما تیپ شخصیتی «تحلیل‌گر (INTJ)» است. اگر مایل باشید درباره نقاط قوت، حوزه‌های قابل توسعه یا مسیرهای شغلی مناسب این تیپ بیشتر توضیح می‌دهم.',
      },
      { from: 'user' as const, time: '۱۰:۳۳', text: 'نقاط قوت اصلی من چیست؟' },
      {
        from: 'agent' as const,
        time: '۱۰:۳۳',
        text: 'بر اساس نتایج شما، مهم‌ترین نقاط قوت‌تان:\n• تفکر استراتژیک و بلندمدت\n• حل مسئله پیچیده\n• استقلال در تصمیم‌گیری\n• دقت و تمرکز بالا',
      },
    ],
    placeholder: 'پیام خود را بنویسید...',
  },
  suggestions: [
    {
      title: 'فرم‌ها و دستورالعمل‌ها',
      icon: 'lucide:file-text',
      tone: 'rose' as Tone,
      cta: 'مشاهده همه فرم‌ها',
      href: '/forms',
      items: [
        { title: 'فرم بازخورد ۳۶۰ درجه', meta: '', avatar: '' },
        { title: 'فرم ارزیابی عملکرد فردی', meta: '', avatar: '' },
        { title: 'فرم برنامه‌ریزی سالانه', meta: '', avatar: '' },
      ],
    },
    {
      title: 'ابزارهای پیشنهادی',
      icon: 'lucide:wrench',
      tone: 'orange' as Tone,
      cta: 'مشاهده همه ابزارها',
      href: '/tools',
      items: [
        { title: 'فرم برنامه توسعه فردی (PDP)', meta: '', avatar: '' },
        { title: 'چک‌لیست برنامه‌ریزی استراتژیک', meta: '', avatar: '' },
        { title: 'ابزار تحلیل SWOT شخصی', meta: '', avatar: '' },
      ],
    },
    {
      title: 'مقالات پیشنهادی',
      icon: 'lucide:newspaper',
      tone: 'green' as Tone,
      cta: 'مشاهده همه مقالات',
      href: '/articles',
      items: [
        { title: 'چگونه مهارت ارتباطی خود را تقویت کنیم؟', meta: '', avatar: `${T}/people/result-course-01.png` },
        { title: 'شناخت تیپ‌های شخصیتی در محیط کار', meta: '', avatar: `${T}/people/result-course-02.png` },
        { title: 'راهکارهایی برای افزایش تمرکز و بهره‌وری', meta: '', avatar: `${T}/people/result-course-03.png` },
      ],
    },
    {
      title: 'دوره‌های پیشنهادی',
      icon: 'lucide:graduation-cap',
      tone: 'blue' as Tone,
      cta: 'مشاهده همه دوره‌ها',
      href: '/courses',
      items: [
        { title: 'مهارت‌های ارتباطی مؤثر', meta: 'سطح متوسط · ۸ ساعت', avatar: `${T}/people/result-course-01.png` },
        { title: 'تفکر استراتژیک و حل مسئله', meta: 'سطح پیشرفته · ۱۲ ساعت', avatar: `${T}/people/result-course-02.png` },
        { title: 'رهبری و نفوذ در دیگران', meta: 'سطح متوسط · ۱۰ ساعت', avatar: `${T}/people/result-course-03.png` },
      ],
    },
    {
      title: 'ایجنت‌های پیشنهادی',
      icon: 'lucide:bot',
      tone: 'violet' as Tone,
      cta: 'مشاهده همه ایجنت‌ها',
      href: '/agents',
      items: [
        { title: 'ایجنت توسعه فردی', meta: 'برنامه رشد شخصی شما', avatar: `${T}/people/result-agent-01.png` },
        { title: 'ایجنت تحلیل شغلی', meta: 'پیشنهاد مسیر شغلی مناسب', avatar: `${T}/people/result-agent-02.png` },
        { title: 'ایجنت هدف گذاری', meta: 'کمک به تعیین اهداف SMART', avatar: `${T}/people/result-agent-03.png` },
      ],
    },
  ],
  cta: {
    title: 'آماده‌اید مسیر توسعه خود را شروع کنید؟',
    desc: 'بر اساس نتیجه این آزمون، یک مسیر یادگیری شخصی‌سازی شده ویژه شما طراحی کرده‌ایم تا بهترین نسخه خودتان شوید.',
    primary: { label: 'مشاهده مسیر یادگیری پیشنهادی من', href: '/learning-paths' },
    secondary: { label: 'تست دیگری انجام دهم', href: '/exams/tests' },
    art: `${T}/result-cta-person.png`,
  },
  assurances: [
    { text: 'اطلاعات شما امن و محرمانه است', icon: 'lucide:shield-check' },
    { text: 'نتایج فقط برای شما مشاهده است', icon: 'lucide:scan-eye' },
    { text: 'توسط متخصصان منابع انسانی طراحی شده', icon: 'lucide:badge-check' },
  ],
};

const toPersian = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
