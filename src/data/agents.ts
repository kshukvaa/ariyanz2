/* ──────────────────────────────────────────────────────────────
   Ariyaz — ایجنت‌های هوشمند.

   Feeds two pages that share the free-resources design language:
     /agents       — the agent catalogue
     /agents/[id]  — a single agent

   Every agent is assembled from the same template, so any id
   renders the identical layout with its own content.
────────────────────────────────────────────────────────────── */

import type { Tone } from '@/data/free';

const A = '/images/agents';

/* ══════════════════════════════════════════════════════════════
   Listing — /agents
══════════════════════════════════════════════════════════════ */

export const agentsHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'ایجنت‌ها', href: '/agents' },
  ],
  title: 'ایجنت‌های هوشمند منابع انسانی',
  desc: [
    'ایجنت‌های هوشمند آریاز، دستیارهای تخصصی مبتنی بر',
    'هوش مصنوعی هستند که به کارشناسان و مدیران منابع انسانی کمک',
    'می‌کنند فرآیندهای خود را سریع‌تر، دقیق‌تر و هوشمندانه‌تر انجام دهند.',
  ],
  art: `${A}/agents-hero.png`,
};

export const agentSorts = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'popular', label: 'پرکاربردترین' },
  { id: 'rating', label: 'بالاترین امتیاز' },
];

export const agentTopicFilter = [
  { id: 'all', label: 'همه' },
  { id: 'hr', label: 'منابع انسانی' },
  { id: 'leadership', label: 'مدیریت و رهبری' },
  { id: 'general', label: 'عمومی و سازمانی' },
];

export const agentAccessTabs = [
  { id: 'premium', label: 'ویژه', icon: 'lucide:star', color: '#F97316' },
  { id: 'free', label: 'رایگان', icon: 'lucide:star', color: '#16A34A' },
] as const;

export type AgentAccess = 'free' | 'premium';

export interface AgentFacet {
  id: string;
  title: string;
  count: number;
  items?: { id: string; label: string; count: number }[];
}

export const agentTopics: AgentFacet[] = [
  {
    id: 'hr',
    title: 'مدیریت منابع انسانی',
    count: 83,
    items: [
      { id: 'hiring', label: 'جذب و استخدام', count: 18 },
      { id: 'performance', label: 'مدیریت عملکرد', count: 15 },
      { id: 'compensation', label: 'جبران خدمات', count: 14 },
      { id: 'training', label: 'آموزش و توسعه', count: 16 },
      { id: 'analytics', label: 'تحلیل منابع انسانی', count: 19 },
    ],
  },
  {
    id: 'leadership',
    title: 'مدیریت و رهبری',
    count: 83,
    items: [
      { id: 'succession', label: 'جانشین‌پروری', count: 21 },
      { id: 'coaching', label: 'کوچینگ و توسعه فردی', count: 34 },
      { id: 'strategy', label: 'تفکر استراتژیک', count: 28 },
    ],
  },
  {
    id: 'general',
    title: 'عمومی و سازمانی',
    count: 23,
    items: [
      { id: 'law', label: 'قوانین و مقررات', count: 12 },
      { id: 'support', label: 'پشتیبانی کارکنان', count: 11 },
    ],
  },
];

/** Total agents in the catalogue, shown under the pager. */
export const totalAgents = '۲۸';

/* ══════════════════════════════════════════════════════════════
   Agent model
══════════════════════════════════════════════════════════════ */

export interface Agent {
  id: string;
  title: string;
  desc: string;
  avatar: string;
  category: string;
  categoryTone: Tone;
  topicId: string;
  groupId: string;
  access: AgentAccess;
  uses: number;
}

export interface AgentSpec {
  label: string;
  value: string;
  icon: string;
}

export interface AgentColumn {
  title: string;
  subtitle: string;
  count: string;
  icon: string;
  tone: Tone;
  href: string;
  cta: string;
  items: string[];
}

export interface AgentArticle {
  title: string;
  date: string;
  minutes: string;
  thumb: string;
  href: string;
}

export interface AgentReview {
  name: string;
  avatar: string;
  date: string;
  stars: number;
  text: string;
}

export interface AgentDetail extends Agent {
  hero: string;
  tagline: string;
  updated: string;
  specs: AgentSpec[];
  about: string[];
  solves: string[];
  audience: string[];
  capabilities: string[];
  howItWorks: string[];
  sampleOutput: string[];
  columns: AgentColumn[];
  articles: AgentArticle[];
  rating: { score: string; count: string; bars: number[] };
  reviews: AgentReview[];
}

export const agentDetailTabs = [
  { id: 'about', label: 'درباره ایجنت', icon: 'lucide:info' },
  { id: 'capabilities', label: 'قابلیت‌های ایجنت', icon: 'lucide:sparkles' },
  { id: 'how', label: 'نحوه کار با ایجنت', icon: 'lucide:workflow' },
  { id: 'sample', label: 'نمونه خروجی ایجنت', icon: 'lucide:file-output' },
];

/* ── The catalogue ──────────────────────────────────────────── */

interface Seed extends Omit<Agent, 'avatar'> {
  avatarFile: string;
}

const seeds: Seed[] = [
  {
    id: 'resume-analysis',
    title: 'ایجنت تحلیل رزومه',
    desc: 'تحلیل هوشمند رزومه‌ها و رتبه‌بندی نامزدها بر اساس معیارهای شغلی',
    avatarFile: 'agent-01-resume-analysis',
    category: 'جذب و استخدام',
    categoryTone: 'blue',
    topicId: 'hiring',
    groupId: 'hr',
    access: 'free',
    uses: 4820,
  },
  {
    id: 'interview-design',
    title: 'ایجنت طراحی مصاحبه',
    desc: 'طراحی سؤالات هدفمند بر اساس سناریوهای مصاحبه تخصصی',
    avatarFile: 'agent-02-interview-design',
    category: 'جذب و استخدام',
    categoryTone: 'blue',
    topicId: 'hiring',
    groupId: 'hr',
    access: 'premium',
    uses: 3610,
  },
  {
    id: 'kpi-design',
    title: 'ایجنت طراحی KPI',
    desc: 'طراحی، اصلاح و ارزیابی شاخص‌های کلیدی عملکرد',
    avatarFile: 'agent-03-kpi-design',
    category: 'مدیریت عملکرد',
    categoryTone: 'green',
    topicId: 'performance',
    groupId: 'hr',
    access: 'free',
    uses: 6240,
  },
  {
    id: 'smart-feedback',
    title: 'ایجنت بازخورد هوشمند',
    desc: 'تحلیل عملکرد و ارائه بازخوردهای سازنده و کاربردی',
    avatarFile: 'agent-04-smart-feedback',
    category: 'مدیریت عملکرد',
    categoryTone: 'green',
    topicId: 'performance',
    groupId: 'hr',
    access: 'premium',
    uses: 2980,
  },
  {
    id: 'personal-coach',
    title: 'ایجنت مربی توسعه فردی',
    desc: 'برنامه‌ریزی مسیر توسعه و پیشنهاد راهکارهای بهبود فردی',
    avatarFile: 'agent-05-personal-coach',
    category: 'توسعه و آموزش',
    categoryTone: 'violet',
    topicId: 'training',
    groupId: 'hr',
    access: 'free',
    uses: 5170,
  },
  {
    id: 'compensation',
    title: 'ایجنت تحلیل جبران خدمات',
    desc: 'تحلیل ساختار حقوق و مزایا و ارائه پیشنهادهای بهبود',
    avatarFile: 'agent-06-compensation',
    category: 'جبران خدمات',
    categoryTone: 'rose',
    topicId: 'compensation',
    groupId: 'hr',
    access: 'premium',
    uses: 2140,
  },
  {
    id: 'hr-data-analysis',
    title: 'ایجنت تحلیل داده‌های HR',
    desc: 'تحلیل داده‌های منابع انسانی و ارائه بینش‌های کاربردی',
    avatarFile: 'agent-07-hr-data-analysis',
    category: 'تحلیل منابع انسانی',
    categoryTone: 'blue',
    topicId: 'analytics',
    groupId: 'hr',
    access: 'free',
    uses: 3890,
  },
  {
    id: 'succession-plan',
    title: 'ایجنت برنامه جانشین‌پروری',
    desc: 'طراحی برنامه جانشین‌پروری و شناسایی افراد با پتانسیل بالا',
    avatarFile: 'agent-08-succession-plan',
    category: 'رهبری و توسعه فردی',
    categoryTone: 'violet',
    topicId: 'succession',
    groupId: 'leadership',
    access: 'premium',
    uses: 1760,
  },
  {
    id: 'labor-law',
    title: 'ایجنت قوانین کار',
    desc: 'پاسخ به سؤالات رایج قوانین کار و مقررات منابع انسانی',
    avatarFile: 'agent-09-labor-law',
    category: 'منابع انسانی عمومی',
    categoryTone: 'green',
    topicId: 'law',
    groupId: 'general',
    access: 'free',
    uses: 7310,
  },
  {
    id: 'hr-chatbot',
    title: 'ایجنت چت‌بات منابع انسانی',
    desc: 'دستیار گفتگو برای پاسخگویی به سؤالات کارکنان به صورت ۲۴/۷',
    avatarFile: 'agent-10-hr-search',
    category: 'منابع انسانی عمومی',
    categoryTone: 'violet',
    topicId: 'support',
    groupId: 'general',
    access: 'premium',
    uses: 4450,
  },
];

export const agents: Agent[] = seeds.map(({ avatarFile, ...a }) => ({
  ...a,
  avatar: `${A}/avatars/${avatarFile}.png`,
}));

export const agentIds = agents.map((a) => a.id);

/* ══════════════════════════════════════════════════════════════
   Detail — /agents/[id]
══════════════════════════════════════════════════════════════ */

const kpiColumns: AgentColumn[] = [
  {
    title: 'دوره‌های مرتبط',
    subtitle: 'آموزش‌های کاربردی و تخصصی',
    count: '۶۹ دوره',
    icon: 'lucide:graduation-cap',
    tone: 'green',
    href: '/courses',
    cta: 'مشاهده همه دوره‌ها',
    items: [
      'طراحی و پیاده‌سازی KPI',
      'مدیریت عملکرد کارکنان',
      'پیشرفته با BSC و OKR',
      'HR Analytics',
      'مصاحبه شایستگی‌محور',
      'راهبری و انگیزش تیم‌ها',
    ],
  },
  {
    title: 'پرسشنامه‌ها و تست‌ها',
    subtitle: 'ابزارهای آماده و قابل استفاده',
    count: '۱۲۶ پرسشنامه',
    icon: 'lucide:clipboard-list',
    tone: 'violet',
    href: '/exams',
    cta: 'مشاهده همه تست‌ها',
    items: [
      'تست تعهد سازمانی',
      'تست رضایت شغلی',
      'تست فرهنگ سازمانی',
      'تست سبک رهبری',
      'تست سنجش شایستگی‌ها',
    ],
  },
  {
    title: 'ابزارها و محاسبه‌گرها',
    subtitle: 'محاسبه‌گرها و ابزارهای کاربردی',
    count: '۴۹ ابزار',
    icon: 'lucide:wrench',
    tone: 'blue',
    href: '/tools',
    cta: 'مشاهده همه ابزارها',
    items: [
      'محاسبه‌گر وزن شاخص‌ها',
      'محاسبه‌گر دامنه پذیرش',
      'محاسبه‌گر آنالیز عملکرد',
      'محاسبه‌گر بهره‌وری کارکنان',
      'ابزار ماتریس اولویت‌بندی',
      'ابزار تحلیل شکاف عملکرد',
    ],
  },
  {
    title: 'فرم‌ها و دستورالعمل‌ها',
    subtitle: 'ابزارهای آماده و قابل استفاده',
    count: '۱۲۴ مورد',
    icon: 'lucide:file-text',
    tone: 'orange',
    href: '/tools',
    cta: 'مشاهده همه فرم‌ها',
    items: [
      'فرم تعریف KPI',
      'فرم ارزیابی عملکرد',
      'فرم بازخورد ۳۶۰ درجه',
      'فرم مصاحبه شایستگی',
      'دستورالعمل طراحی شاخص',
      'دستورالعمل گزارش‌دهی',
    ],
  },
  {
    title: 'ایجنت‌های مرتبط',
    subtitle: 'دستیارهای هوشمند تخصصی',
    count: '۶۹ ایجنت',
    icon: 'lucide:bot',
    tone: 'green',
    href: '/agents',
    cta: 'مشاهده همه ایجنت‌ها',
    items: [
      'تحلیل استراتژی سازمانی',
      'تحلیل داده‌های HR',
      'تحلیل شایستگی و دانش',
      'جذب و استخدام هوشمند',
      'تحلیل رضایت و انگیزش',
      'مدیریت عملکرد پیشرفته',
    ],
  },
];

const kpiArticles: AgentArticle[] = [
  { title: 'راهنمای جامع طراحی KPI در منابع انسانی', date: '۱۲ اردیبهشت ۱۴۰۳', minutes: '۱۲ دقیقه مطالعه', thumb: `${A}/articles/kpi-article-01-design-guide.png`, href: '/articles/3' },
  { title: 'اندازه‌گیری، پایش و تحلیل شاخص‌های عملکرد', date: '۱۲ اردیبهشت ۱۴۰۳', minutes: '۱۰ دقیقه مطالعه', thumb: `${A}/articles/kpi-article-02-measure-analyse.png`, href: '/articles/13' },
  { title: 'چگونه KPIهای سازمانی را استراتژیک کنیم؟', date: '۱۰ اردیبهشت ۱۴۰۳', minutes: '۱۵ دقیقه مطالعه', thumb: `${A}/articles/kpi-article-03-strategic-kpi.png`, href: '/articles/1' },
  { title: 'معیارهای SMART در طراحی شاخص‌های کلیدی عملکرد', date: '۷ اردیبهشت ۱۴۰۳', minutes: '۹ دقیقه مطالعه', thumb: `${A}/articles/kpi-article-04-smart-criteria.png`, href: '/articles/7' },
  { title: 'ارتباط KPI با اهداف استراتژیک و رشد سازمان', date: '۵ اردیبهشت ۱۴۰۳', minutes: '۸ دقیقه مطالعه', thumb: `${A}/articles/kpi-article-05-strategic-link.png`, href: '/articles/12' },
];

const defaultReviews: AgentReview[] = [
  {
    name: 'علی محمدی',
    avatar: `${A}/avatars/agent-reviewer-01.png`,
    date: '۱۶ اردیبهشت ۱۴۰۳',
    stars: 5,
    text: 'ایجنت طراحی KPI بسیار کاربردی و حرفه‌ای است. در زمان و کیفیت کارها صرفه‌جویی زیادی کرده.',
  },
  {
    name: 'سمیرا حسینی',
    avatar: `${A}/avatars/agent-reviewer-02.png`,
    date: '۱۴ اردیبهشت ۱۴۰۳',
    stars: 4,
    text: 'پیشنهادهای دقیقی ارائه می‌دهد و خروجی‌های قابل اتکایی دارد.',
  },
];

export const agentLearningPath = {
  title: 'مسیر یادگیری مرتبط',
  desc: 'یک مسیر یادگیری گام‌به‌گام و هدفمند برای تسلط بر طراحی و مدیریت KPI منابع انسانی',
  cta: 'مشاهده مسیر یادگیری مرتبط',
  href: '/learning-paths',
  art: `${A}/learning-path-illus.png`,
};

export const agentSignupCta = {
  title: 'ثبت نام شما',
  desc: 'برای ثبت نام و دسترسی به تمامی قابلیت‌های ایجنت و ذخیره نتایج خود وارد شوید',
  cta: 'ثبت نام / ورود',
  href: '/support',
};

export function getAgent(id: string): AgentDetail | undefined {
  const agent = agents.find((a) => a.id === id);
  if (!agent) return undefined;

  return {
    ...agent,
    hero: `${A}/agent-detail-hero.png`,
    tagline: `یک دستیار هوشمند برای ${agent.desc.replace(/^تحلیل هوشمند /, 'تحلیل ')}`,
    updated: '۲۶ اردیبهشت ۱۴۰۳',
    specs: [
      { label: 'نوع هوش', value: agent.category, icon: 'lucide:brain-circuit' },
      { label: 'نوع ایجنت', value: 'تحلیلی و تخصصی', icon: 'lucide:bot' },
      { label: 'نوع کاربرد', value: 'کارشناسی منابع انسانی', icon: 'lucide:briefcase' },
      { label: 'فارسی', value: 'کاملاً بومی', icon: 'lucide:languages' },
    ],
    about: [
      `${agent.title} به شما کمک می‌کند تا بر پایه دانش تخصصی منابع انسانی و یادگیری ماشین، خروجی‌هایی دقیق و قابل اتکا تولید کنید؛ متناسب با استراتژی، اهداف و ساختار سازمانی خود.`,
      'این ایجنت با تحلیل داده‌های ورودی، اهداف و ساختار سازمانی شما، پیشنهادهای عملی و قابل اجرا ارائه می‌دهد و با استفاده از چارچوب‌های استاندارد، کیفیت و قابلیت اتکای نتایج را تضمین می‌کند.',
    ],
    solves: [
      'عدم انسجام و استانداردسازی در شاخص‌های کلیدی',
      'عدم اطمینان از کیفیت و قابلیت استناد شاخص‌ها',
      'زمان‌بر بودن فرآیند طراحی KPI',
      'دشواری در سنجش دقیق شاخص‌ها به مرور زمان',
    ],
    audience: [
      'مدیریت منابع انسانی سازمان‌ها',
      'کارشناسان توسعه سازمانی',
      'مدیران عملکرد و ارزیابی',
      'مشاوران منابع انسانی',
      'استارتاپ‌ها و کسب‌وکارهای در حال رشد',
    ],
    capabilities: [
      'طراحی شاخص‌های کلیدی متناسب با اهداف سازمان',
      'بازبینی و اصلاح شاخص‌های موجود',
      'پیشنهاد وزن و دامنه پذیرش برای هر شاخص',
      'تولید گزارش قابل ارائه به مدیریت',
      'انطباق خروجی با چارچوب‌های BSC و OKR',
    ],
    howItWorks: [
      'اهداف و حوزه کاری خود را برای ایجنت شرح دهید.',
      'داده‌ها یا شاخص‌های فعلی را در اختیار آن بگذارید.',
      'ایجنت پیش‌نویس شاخص‌ها را همراه با وزن و دامنه پیشنهاد می‌دهد.',
      'با گفتگو خروجی را اصلاح کنید تا به نسخه نهایی برسید.',
      'گزارش نهایی را دریافت و در سازمان به اشتراک بگذارید.',
    ],
    sampleOutput: [
      'شاخص: نرخ ماندگاری کارکنان کلیدی — وزن ۲۵٪ — هدف ۹۰٪',
      'شاخص: میانگین زمان استخدام — وزن ۱۵٪ — هدف کمتر از ۳۰ روز',
      'شاخص: نمره رضایت شغلی — وزن ۲۰٪ — هدف ۴ از ۵',
      'شاخص: نرخ تکمیل دوره‌های آموزشی — وزن ۲۰٪ — هدف ۸۵٪',
      'شاخص: بهره‌وری تیم — وزن ۲۰٪ — هدف رشد ۱۰٪ سالانه',
    ],
    columns: kpiColumns,
    articles: kpiArticles,
    rating: { score: '۴.۸', count: '۶۶۶', bars: [79, 16, 4, 1, 0] },
    reviews: defaultReviews,
  };
}
