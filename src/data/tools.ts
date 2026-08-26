/* ──────────────────────────────────────────────────────────────
   Ariyaz — فرم‌ها، چک لیست‌ها و دستورالعمل‌ها.

   Feeds /tools, the downloadable-resources listing. Shares the
   design language of the free resources section.
────────────────────────────────────────────────────────────── */

import type { Tone } from '@/data/free';

const ART = '/images/free';

export const toolsHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'رایگان اما کاربردی', href: '/library' },
    { label: 'فرم‌ها و ابزارها', href: '/tools' },
  ],
  title: 'فرم‌ها، چک لیست‌ها و دستورالعمل‌های حرفه‌ای',
  desc: [
    'به مجموعه‌ای جامع از ابزارهای کاربردی دسترسی داشته باشید.',
    'از فرم‌های آماده و چک لیست‌های اجرایی تا دستورالعمل‌های استاندارد؛',
    'همه آنچه برای مدیریت بهتر، تصمیم‌گیری دقیق‌تر',
    'و اجرای حرفه‌ای فرایندها نیاز دارید.',
  ],
  art: `${ART}/illustrations/hero-forms-tools.png`,
};

/* ── Toolbar ────────────────────────────────────────────────── */

export const toolSorts = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'popular', label: 'پردانلودترین' },
  { id: 'smallest', label: 'کم‌حجم‌ترین' },
];

export const toolTabs = [
  { id: 'all', label: 'همه', icon: 'lucide:layout-grid' },
  { id: 'premium', label: 'ویژه', icon: 'lucide:crown' },
  { id: 'free', label: 'رایگان', icon: 'lucide:gift' },
] as const;

export type ToolTab = (typeof toolTabs)[number]['id'];

/* ── File formats ───────────────────────────────────────────── */

export type Format = 'pdf' | 'word' | 'excel';

/** Brand colours for the file-type badge on each card. */
export const formats: Record<Format, { label: string; ext: string; color: string; glyph: string }> = {
  pdf: { label: 'PDF', ext: 'PDF', color: '#E5252A', glyph: 'PDF' },
  word: { label: 'Word', ext: 'DOCX', color: '#2B579A', glyph: 'W' },
  excel: { label: 'Excel', ext: 'XLSX', color: '#217346', glyph: 'X' },
};

/* ── Resource types ─────────────────────────────────────────── */

export type ToolKind = 'checklist' | 'form' | 'procedure';

export const toolKinds: Record<ToolKind, { label: string; tone: Tone }> = {
  checklist: { label: 'چک لیست', tone: 'green' },
  form: { label: 'فرم کاربردی', tone: 'blue' },
  procedure: { label: 'دستورالعمل اجرایی', tone: 'rose' },
};

/* ── Sidebar facets ─────────────────────────────────────────── */

export interface TopicGroup {
  id: string;
  title: string;
  count?: number;
  items?: { id: string; label: string; count: number }[];
}

export const toolTopics: TopicGroup[] = [
  {
    id: 'hr',
    title: 'مدیریت منابع انسانی',
    items: [
      { id: 'hiring', label: 'جذب و استخدام', count: 86 },
      { id: 'performance', label: 'ارزیابی عملکرد', count: 72 },
      { id: 'training', label: 'آموزش و توسعه', count: 64 },
      { id: 'compensation', label: 'جبران خدمات و مزایا', count: 54 },
      { id: 'relations', label: 'روابط کارکنان', count: 48 },
      { id: 'law', label: 'قوانین و مقررات', count: 32 },
    ],
  },
  {
    id: 'leadership',
    title: 'رهبری و مدیریت',
    count: 57,
    items: [
      { id: 'team', label: 'مدیریت تیم', count: 31 },
      { id: 'meetings', label: 'جلسات و گزارش‌دهی', count: 26 },
    ],
  },
  {
    id: 'personal',
    title: 'توسعه فردی',
    count: 41,
    items: [
      { id: 'planning', label: 'برنامه‌ریزی فردی', count: 23 },
      { id: 'skills', label: 'مهارت‌های نرم', count: 18 },
    ],
  },
];

export const kindFacets: { id: ToolKind; count: number }[] = [
  { id: 'checklist', count: 132 },
  { id: 'form', count: 154 },
  { id: 'procedure', count: 110 },
];

/** Total free downloads in the catalogue, shown under the pager. */
export const totalFree = '۶۸';

/* ── The catalogue ──────────────────────────────────────────── */

export interface ToolResource {
  id: string;
  title: string;
  desc: string;
  kind: ToolKind;
  format: Format;
  size: string;
  topicId: string;
  access: 'free' | 'premium';
  downloads: number;
  /** Wire these to real files before launch; they 404 until then. */
  url: string;
}

const D = '/downloads';

export const toolResources: ToolResource[] = [
  {
    id: 'salary-benefits-form',
    title: 'فرم محاسبه حقوق و مزایا',
    desc: 'فرم ثبت محاسبات کامل حقوق و کسورات کارکنان',
    kind: 'form',
    format: 'excel',
    size: '۲۴۵ KB',
    topicId: 'compensation',
    access: 'free',
    downloads: 4560,
    url: `${D}/salary-benefits-form.xlsx`,
  },
  {
    id: 'performance-review-form',
    title: 'فرم ارزیابی عملکرد کارکنان',
    desc: 'فرم استاندارد ارزیابی عملکرد کارکنان',
    kind: 'form',
    format: 'excel',
    size: '۲۱۵ KB',
    topicId: 'performance',
    access: 'free',
    downloads: 3980,
    url: `${D}/performance-review-form.xlsx`,
  },
  {
    id: 'job-application-form',
    title: 'فرم درخواست استخدام',
    desc: 'فرم استاندارد درخواست استخدام نیروی جدید',
    kind: 'form',
    format: 'word',
    size: '۱۸۰ KB',
    topicId: 'hiring',
    access: 'free',
    downloads: 5210,
    url: `${D}/job-application-form.docx`,
  },
  {
    id: 'competency-interview-checklist',
    title: 'چک لیست مصاحبه شایستگی‌محور',
    desc: 'چک لیست کامل مصاحبه‌های شایستگی‌محور و مصاحبه‌های شغلی',
    kind: 'checklist',
    format: 'pdf',
    size: '۳۲۰ KB',
    topicId: 'hiring',
    access: 'free',
    downloads: 6120,
    url: `${D}/competency-interview-checklist.pdf`,
  },
  {
    id: 'misconduct-procedure',
    title: 'دستورالعمل رسیدگی به تخلفات اداری',
    desc: 'راهنمای کامل رسیدگی به تخلفات انضباطی کارکنان',
    kind: 'procedure',
    format: 'pdf',
    size: '۲۹۰ KB',
    topicId: 'relations',
    access: 'premium',
    downloads: 2140,
    url: `${D}/misconduct-procedure.pdf`,
  },
  {
    id: 'written-warning-form',
    title: 'فرم تذکر کتبی',
    desc: 'فرم رسمی تذکر کتبی به پرسنل سازمان',
    kind: 'form',
    format: 'word',
    size: '۱۰۰ KB',
    topicId: 'relations',
    access: 'free',
    downloads: 3310,
    url: `${D}/written-warning-form.docx`,
  },
  {
    id: 'training-evaluation-procedure',
    title: 'دستورالعمل ارزیابی آموزشی',
    desc: 'راهنمای اجرای سیستم ارزیابی اثربخشی دوره‌های آموزشی',
    kind: 'procedure',
    format: 'pdf',
    size: '۲۸۰ KB',
    topicId: 'training',
    access: 'premium',
    downloads: 1870,
    url: `${D}/training-evaluation-procedure.pdf`,
  },
  {
    id: 'training-request-form',
    title: 'فرم برنامه درخواست آموزشی',
    desc: 'فرم ثبت درخواست دوره‌های آموزشی کارکنان',
    kind: 'form',
    format: 'word',
    size: '۱۷۰ KB',
    topicId: 'training',
    access: 'free',
    downloads: 2760,
    url: `${D}/training-request-form.docx`,
  },
  {
    id: 'review-360-form',
    title: 'فرم ارزیابی ۳۶۰ درجه',
    desc: 'فرم ارزیابی عملکرد ۳۶۰ درجه کارکنان',
    kind: 'form',
    format: 'word',
    size: '۱۹۰ KB',
    topicId: 'performance',
    access: 'free',
    downloads: 4420,
    url: `${D}/review-360-form.docx`,
  },
  {
    id: 'workplace-safety-checklist',
    title: 'چک لیست ایمنی محیط کار',
    desc: 'چک لیست ارزیابی و بازرسی ایمنی محیط کار',
    kind: 'checklist',
    format: 'excel',
    size: '۱۵۰ KB',
    topicId: 'law',
    access: 'free',
    downloads: 2530,
    url: `${D}/workplace-safety-checklist.xlsx`,
  },
  {
    id: 'labour-law-summary',
    title: 'خلاصه قانون کار',
    desc: 'راهنمایی از مهم‌ترین مواد قانون کار ایران',
    kind: 'procedure',
    format: 'pdf',
    size: '۵۰۰ KB',
    topicId: 'law',
    access: 'free',
    downloads: 7840,
    url: `${D}/labour-law-summary.pdf`,
  },
  {
    id: 'employee-record-form',
    title: 'فرم اطلاعات کارکنان',
    desc: 'فرم ثبت و به‌روزرسانی اطلاعات فردی کارکنان',
    kind: 'form',
    format: 'word',
    size: '۱۰۰ KB',
    topicId: 'relations',
    access: 'free',
    downloads: 3050,
    url: `${D}/employee-record-form.docx`,
  },
];

/* ══════════════════════════════════════════════════════════════
   Detail — /tools/[id]

   Every resource is assembled from the same template, so any id
   renders the identical layout with its own content.
══════════════════════════════════════════════════════════════ */

const T = '/images/tools';

export interface DetailTab {
  id: string;
  label: string;
}

export const toolDetailTabs: DetailTab[] = [
  { id: 'about', label: 'توضیحات' },
  { id: 'usage', label: 'کاربرد فرم' },
  { id: 'audience', label: 'مخاطبین فرم' },
  { id: 'benefits', label: 'مزایا' },
  { id: 'versions', label: 'نسخه و ورژن‌ها' },
];

export interface FactList {
  title: string;
  icon: string;
  items: string[];
}

export interface RelatedItem {
  title: string;
  desc: string;
  /** Rich variant used by the courses column. */
  thumb?: string;
  meta?: string;
  rating?: string;
  votes?: string;
}

export interface RelatedColumn {
  title: string;
  icon: string;
  tone: Tone;
  href: string;
  cta: string;
  items: RelatedItem[];
}

export interface RelatedArticle {
  title: string;
  category: string;
  date: string;
  thumb: string;
  href: string;
}

export interface ToolComment {
  name: string;
  avatar: string;
  date: string;
  stars: number;
  text: string;
}

export interface ToolVersion {
  version: string;
  date: string;
  note: string;
}

export interface ToolDetail extends ToolResource {
  preview: string;
  category: string;
  updated: string;
  version: string;
  intro: string[];
  about: string[];
  facts: FactList[];
  versions: ToolVersion[];
  related: RelatedColumn[];
  articles: RelatedArticle[];
  rating: { score: string; count: string; bars: number[] };
  comments: ToolComment[];
}

/** Prompt chips under the assistant box. */
export const toolAgent = {
  title: 'ایجنت آریاز',
  avatar: `${T}/agent-robot.png`,
  lines: [
    'می‌توانید به ایجنت دستور دهید تا این فرم را',
    'بر اساس نیاز شما تغییر دهد و سفارشی‌سازی کند.',
    'همچنین اگر سؤالی در مورد فرم دارید بپرسید.',
  ],
  placeholder: 'دستور خود را بنویسید یا سؤالی بپرسید...',
  chips: ['تغییر ساختار فرم', 'افزودن شاخص‌های بیشتر', 'اصلاح عنوان‌ها و مقیاس‌ها'],
};

export const learningPathBanner = {
  title: 'مسیر یادگیری مرتبط با این فرم',
  desc: 'از مقالات تا اجرای حرفه‌ای ارزیابی عملکرد را مرحله به مرحله یاد بگیرید',
  cta: 'کلیک کنید و مسیر یادگیری مرتبط را ببینید',
  href: '/learning-paths',
};

const performanceRelated: RelatedColumn[] = [
  {
    title: 'ابزارهای مرتبط',
    icon: 'lucide:calculator',
    tone: 'blue',
    href: '/tools',
    cta: 'مشاهده همه ابزارها',
    items: [
      { title: 'ماشین حساب حقوق و مزایا', desc: 'محاسبات حقوق و مزایا' },
      { title: 'تقویم KPI', desc: 'تحلیل زمانی شاخص‌های کلیدی' },
      { title: 'چک‌لیست ارزیابی عملکرد', desc: 'راهنمای گام‌به‌گام ارزیابی' },
    ],
  },
  {
    title: 'آزمون‌ها و تست‌های مرتبط',
    icon: 'lucide:clipboard-list',
    tone: 'orange',
    href: '/exams',
    cta: 'مشاهده همه آزمون‌ها',
    items: [
      { title: 'آزمون دانش مدیریت عملکرد', desc: 'سنجش دانش تخصصی' },
      { title: 'تست بلوغ سیستم ارزیابی', desc: 'ارزیابی بلوغ سیستم سازمان' },
      { title: 'پرسشنامه شایستگی ارزیابان', desc: 'ارزیابی مهارت‌های ارزیابان' },
    ],
  },
  {
    title: 'دوره‌های مرتبط',
    icon: 'lucide:graduation-cap',
    tone: 'green',
    href: '/courses',
    cta: 'مشاهده همه دوره‌ها',
    items: [
      {
        title: 'دوره جامع مدیریت عملکرد',
        desc: 'سطح: متوسط',
        thumb: `${T}/course-1.png`,
        meta: '۵ ساعت',
        rating: '۴.۸',
        votes: '۶۵۱',
      },
      {
        title: 'ارزیابی عملکرد',
        desc: 'تکنیک‌های کاربردی ارزیابی',
        thumb: `${T}/course-2.png`,
        meta: '۱۰ ساعت',
        rating: '۴.۷',
        votes: '۶۱۱',
      },
    ],
  },
  {
    title: 'ایجنت‌های مرتبط',
    icon: 'lucide:bot',
    tone: 'violet',
    href: '/agents',
    cta: 'مشاهده همه ایجنت‌ها',
    items: [
      { title: 'ایجنت تحلیل عملکرد', desc: 'تحلیل هوشمند عملکرد کارکنان' },
      { title: 'ایجنت طراحی KPI', desc: 'طراحی شاخص‌های کلیدی' },
      { title: 'ایجنت گزارش‌ساز عملکرد', desc: 'تولید گزارش‌های تحلیلی' },
    ],
  },
];

const performanceArticles: RelatedArticle[] = [
  { title: 'بهبود مستمر فرآیند مدیریت عملکرد', category: 'مدیریت عملکرد', date: '۱۴۰۵/۰۴/۰۸', thumb: `${T}/article-4.png`, href: '/articles/1' },
  { title: 'ارتباط ارزیابی عملکرد با انگیزش کارکنان', category: 'مدیریت منابع انسانی', date: '۱۴۰۵/۰۴/۱۰', thumb: `${T}/article-5.png`, href: '/articles/12' },
  { title: 'چگونه بازخورد مؤثر به کارکنان بدهیم؟', category: 'مدیریت عملکرد', date: '۱۴۰۵/۰۴/۱۲', thumb: `${T}/article-1.png`, href: '/articles/3' },
  { title: 'مدل‌های ارزیابی عملکرد؛ کدام مدل مناسب شماست؟', category: 'مدیریت عملکرد', date: '۱۴۰۵/۰۴/۱۵', thumb: `${T}/article-2.png`, href: '/articles/13' },
  { title: 'اشتباهات رایج در ارزیابی عملکرد کارکنان', category: 'مدیریت عملکرد', date: '۱۴۰۵/۰۴/۱۸', thumb: `${T}/course-3.png`, href: '/articles/7' },
  { title: 'راهنمای تعیین KPI مؤثر در ارزیابی عملکرد', category: 'مدیریت عملکرد', date: '۱۴۰۵/۰۴/۲۰', thumb: `${T}/article-3.png`, href: '/articles/3' },
];

const defaultComments: ToolComment[] = [
  { name: 'محمد محمدی', avatar: `${T}/reviewer-2.png`, date: '۱۴۰۵/۰۵/۱۶', stars: 5, text: 'فرم بسیار کاربردی و کامل، خیلی به ما در ارزیابی کمک کرد.' },
  { name: 'علی رضایی', avatar: `${T}/reviewer-3.png`, date: '۱۴۰۵/۰۵/۱۴', stars: 4, text: 'طراحی خوبی دارد، پیشنهاد می‌کنم.' },
  { name: 'مریم حسینی', avatar: `${T}/reviewer-1.png`, date: '۱۴۰۵/۰۵/۱۲', stars: 4, text: 'مستندسازی نتایج ارزیابی را راحت‌تر کرد؛ ممنون.' },
];

/** Topic id → the human label shown in the breadcrumb and «دسته». */
const topicLabels: Record<string, string> = {
  hiring: 'جذب و استخدام',
  performance: 'مدیریت عملکرد',
  training: 'آموزش و توسعه',
  compensation: 'جبران خدمات و مزایا',
  relations: 'روابط کارکنان',
  law: 'قوانین و مقررات',
};

export function getToolDetail(id: string): ToolDetail | undefined {
  const resource = toolResources.find((r) => r.id === id);
  if (!resource) return undefined;

  const kind = toolKinds[resource.kind].label;

  return {
    ...resource,
    preview: `${T}/form-preview.png`,
    category: topicLabels[resource.topicId] ?? 'منابع انسانی',
    updated: '۱۴۰۵/۰۵/۱۵',
    version: 'V2',
    intro: [
      `این ${kind} برای ثبت و ارزیابی عملکرد کارکنان بر اساس شاخص‌های مشخص طراحی شده است`,
      'و به شما کمک می‌کند تا فرآیند ارزیابی را استاندارد، مستند و هدفمند مدیریت کنید',
    ],
    about: [
      `این ${kind} به مدیران کمک می‌کند تا عملکرد کارکنان را با معیارهای شفاف و قابل اندازه‌گیری بسنجند. این تحلیل ارزیابی را دقیق‌تر و منصفانه‌تر می‌کند و شفافیت و عدالت را در سازمان تقویت می‌کند.`,
      'توسعه منابع انسانی و ایجاد هم‌افزایی درون‌سازمانی از نتایج مستقیم به‌کارگیری منظم آن است و به بهبود مستمر مدیریت عملکرد فردی می‌انجامد.',
    ],
    facts: [
      {
        title: 'کاربرد فرم',
        icon: 'lucide:file-check-2',
        items: ['ارزیابی دوره‌ای عملکرد کارکنان', 'تعیین نقاط قوت و نیازهای بهبود', 'مستندسازی نتایج ارزیابی'],
      },
      {
        title: 'مخاطبین فرم',
        icon: 'lucide:users-round',
        items: ['مدیران منابع انسانی', 'مدیران و سرپرستان', 'کارشناسان ارزیابی عملکرد'],
      },
      {
        title: 'مزایا',
        icon: 'lucide:trophy',
        items: [
          'یکپارچگی و استانداردسازی ارزیابی',
          'شفافیت در معیارها و زمینه‌های بهبود',
          'قابلیت مستندسازی نتایج ارزیابی',
          'اتخاذ تصمیمات منابع انسانی',
        ],
      },
    ],
    versions: [
      { version: 'V2', date: '۱۴۰۵/۰۵/۱۵', note: 'افزودن بخش اهداف فردی و بازبینی مقیاس امتیازدهی' },
      { version: 'V1', date: '۱۴۰۴/۱۱/۰۲', note: 'انتشار اولیه فرم استاندارد ارزیابی' },
    ],
    related: performanceRelated,
    articles: performanceArticles,
    rating: { score: '۴.۷', count: '۱۲۳۸', bars: [78, 16, 9, 1, 0] },
    comments: defaultComments,
  };
}

export const toolIds = toolResources.map((r) => r.id);

/** "۲۴۵ KB" → 245, so the size sort works on the Persian copy. */
export function sizeToKb(size: string): number {
  const n = parseFloat(size.replace(/[۰-۹]/g, (c) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))));
  return /MB/i.test(size) ? n * 1024 : n;
}
