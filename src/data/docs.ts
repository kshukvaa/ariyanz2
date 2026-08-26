/* ──────────────────────────────────────────────────────────────
   Ariyaz — مرکز اسناد.

   Feeds two pages that share the free-resources design language:
     /laws       — circulars, laws and regulations
     /laws/[id]  — a single document

   Documents are official records, so the listing leads with what
   identifies them: file type, number, issuing authority and date.
────────────────────────────────────────────────────────────── */

import type { Tone } from '@/data/free';

const D = '/images/docs';

/* ══════════════════════════════════════════════════════════════
   Listing — /laws
══════════════════════════════════════════════════════════════ */

export const docsHero = {
  breadcrumb: [
    { label: 'خانه', href: '/' },
    { label: 'مرکز اسناد', href: '/laws' },
  ],
  title: 'بخشنامه‌ها، قوانین و مقررات',
  titleAccent: 'تأمین اجتماعی و قانون کار',
  desc: [
    'جدیدترین بخشنامه‌ها، آیین‌نامه‌ها، دستورالعمل و قوانین رسمی حوزه کار',
    'و تأمین اجتماعی، به‌صورت دسته‌بندی‌شده و قابل دانلود.',
    'این بخش به صورت ماهانه بروزرسانی می‌شود.',
  ],
  art: `${D}/legal-docs-hero.png`,
};

export const docsSearchLabel = 'جستجو بین بخشنامه‌ها، قوانین، آیین‌نامه‌ها ...';

export const docSorts = [
  { id: 'newest', label: 'جدیدترین' },
  { id: 'oldest', label: 'قدیمی‌ترین' },
  { id: 'authority', label: 'مرجع صادرکننده' },
];

export interface DocFacet {
  id: string;
  title: string;
  icon: string;
  open?: boolean;
  /** Some groups collapse to a "نمایش بیشتر" link, as in the mockup. */
  more?: boolean;
  items: { id: string; label: string }[];
}

export const docFacets: DocFacet[] = [
  {
    id: 'kind',
    title: 'نوع سند',
    icon: 'lucide:shield-check',
    open: true,
    items: [
      { id: 'social-circular', label: 'بخشنامه تأمین اجتماعی' },
      { id: 'labor-law', label: 'قانون کار' },
      { id: 'dispute', label: 'رأی هیات حل اختلاف' },
      { id: 'admin-court', label: 'رأی دیوان عدالت اداری' },
      { id: 'regulation', label: 'آیین‌نامه' },
      { id: 'wage-table', label: 'جدول حقوق و دستمزد' },
    ],
  },
  {
    id: 'year',
    title: 'سال انتشار',
    icon: 'lucide:calendar',
    open: true,
    more: true,
    items: [
      { id: '1404', label: '۱۴۰۴' },
      { id: '1403', label: '۱۴۰۳' },
      { id: '1402', label: '۱۴۰۲' },
      { id: '1401', label: '۱۴۰۱' },
    ],
  },
  {
    id: 'authority',
    title: 'مرجع صادرکننده',
    icon: 'lucide:building',
    open: true,
    items: [
      { id: 'labor-office', label: 'اداره کار' },
      { id: 'social-org', label: 'سازمان تأمین اجتماعی' },
      { id: 'ministry', label: 'وزارت کار' },
      { id: 'court', label: 'دیوان عدالت اداری' },
    ],
  },
  {
    id: 'subject',
    title: 'نوع موضوع',
    icon: 'lucide:tag',
    open: true,
    items: [
      { id: 'wage', label: 'حقوق و دستمزد' },
      { id: 'leave', label: 'مرخصی' },
      { id: 'contract', label: 'قرارداد' },
      { id: 'insurance', label: 'بیمه' },
      { id: 'seniority', label: 'سنوات' },
      { id: 'discipline', label: 'انضباط کار' },
      { id: 'grading', label: 'طبقه‌بندی مشاغل' },
    ],
  },
];

export type DocFile = 'pdf' | 'doc' | 'excel';

export interface Doc {
  id: string;
  title: string;
  file: DocFile;
  /** "بخشنامه: ۱۴۰۴/۲۳" — the label changes with the kind of record. */
  numberLabel: string;
  number: string;
  date: string;
  authority: string;
  kindId: string;
  kindLabel: string;
  kindTone: Tone;
  yearId: string;
  authorityId: string;
  subjectId: string;
}

export const docs: Doc[] = [
  {
    id: 'insurance-share-1404',
    title: 'بخشنامه نحوه محاسبه عیدی بیمه کارگران برای سال ۱۴۰۴',
    file: 'pdf',
    numberLabel: 'بخشنامه',
    number: '۱۴۰۴/۲۳',
    date: '۱۴۰۴/۰۲/۱۵',
    authority: 'سازمان تأمین اجتماعی',
    kindId: 'social-circular',
    kindLabel: 'بخشنامه تأمین اجتماعی',
    kindTone: 'blue',
    yearId: '1404',
    authorityId: 'social-org',
    subjectId: 'insurance',
  },
  {
    id: 'labor-law-1369',
    title: 'قانون کار جمهوری اسلامی ایران (مصوب ۱۳۶۹ با اصلاحات بعدی)',
    file: 'doc',
    numberLabel: 'قانون',
    number: '۱۳۵۹',
    date: '۱۳۶۹/۰۸/۲۹',
    authority: 'مجلس شورای اسلامی',
    kindId: 'labor-law',
    kindLabel: 'قانون کار',
    kindTone: 'blue',
    yearId: '1401',
    authorityId: 'ministry',
    subjectId: 'contract',
  },
  {
    id: 'min-wage-1404',
    title: 'بخشنامه میزان حداقل دستمزد کارگران برای سال ۱۴۰۴',
    file: 'pdf',
    numberLabel: 'شماره',
    number: '۱۴۰۴/۱۲',
    date: '۱۴۰۴/۰۱/۲۸',
    authority: 'وزارت تعاون، کار و رفاه اجتماعی',
    kindId: 'social-circular',
    kindLabel: 'بخشنامه تأمین اجتماعی',
    kindTone: 'blue',
    yearId: '1404',
    authorityId: 'ministry',
    subjectId: 'wage',
  },
  {
    id: 'dispute-insurance-history',
    title: 'رأی هیات حل اختلاف در خصوص تعیین سابقه بیمه',
    file: 'pdf',
    numberLabel: 'رأی',
    number: '۱۴۰۳/۴۵',
    date: '۱۴۰۳/۱۱/۱۰',
    authority: 'هیات اختلاف اداره کار',
    kindId: 'dispute',
    kindLabel: 'رأی هیات حل اختلاف',
    kindTone: 'orange',
    yearId: '1403',
    authorityId: 'labor-office',
    subjectId: 'insurance',
  },
  {
    id: 'wage-table-1404',
    title: 'جدول حقوق و مزایای سال ۱۴۰۴ (کارگران مشمول قانون کار)',
    file: 'excel',
    numberLabel: 'جدول',
    number: '۱۴۰۴',
    date: '۱۴۰۴/۰۱/۰۱',
    authority: 'وزارت تعاون، کار و رفاه اجتماعی',
    kindId: 'wage-table',
    kindLabel: 'جدول حقوق و دستمزد',
    kindTone: 'green',
    yearId: '1404',
    authorityId: 'ministry',
    subjectId: 'wage',
  },
  {
    id: 'discipline-regulation',
    title: 'آیین‌نامه انضباطی کارکنان (مصوب هیات وزیران)',
    file: 'pdf',
    numberLabel: 'آیین‌نامه',
    number: '۱۳۷۴/۷۷۸۷',
    date: '۱۳۷۴/۱۲/۱۹',
    authority: 'هیات وزیران',
    kindId: 'regulation',
    kindLabel: 'آیین‌نامه',
    kindTone: 'orange',
    yearId: '1401',
    authorityId: 'ministry',
    subjectId: 'discipline',
  },
  {
    id: 'leave-circular-1403',
    title: 'بخشنامه مرخصی استحقاقی و استحقاقی',
    file: 'pdf',
    numberLabel: 'بخشنامه',
    number: '۱۴۰۳/۹۸',
    date: '۱۴۰۳/۰۹/۰۵',
    authority: 'سازمان تأمین اجتماعی',
    kindId: 'social-circular',
    kindLabel: 'بخشنامه تأمین اجتماعی',
    kindTone: 'blue',
    yearId: '1403',
    authorityId: 'social-org',
    subjectId: 'leave',
  },
  {
    id: 'court-seniority',
    title: 'رأی دیوان عدالت اداری در خصوص حق سنوات',
    file: 'pdf',
    numberLabel: 'رأی',
    number: '۱۴۰۲/۱۷۳۴',
    date: '۱۴۰۲/۰۸/۱۲',
    authority: 'دیوان عدالت اداری',
    kindId: 'admin-court',
    kindLabel: 'رأی دیوان عدالت اداری',
    kindTone: 'rose',
    yearId: '1402',
    authorityId: 'court',
    subjectId: 'seniority',
  },
];

export const docsTotal = '۱۲۶';
export const docsPerPage = [12, 24, 48];

export const docFileMeta: Record<DocFile, { label: string; color: string; icon: string }> = {
  pdf: { label: 'PDF', color: '#DC2626', icon: 'lucide:file-text' },
  doc: { label: 'DOC', color: '#2563EB', icon: 'lucide:file-type' },
  excel: { label: 'XLS', color: '#16A34A', icon: 'lucide:file-spreadsheet' },
};

/* ══════════════════════════════════════════════════════════════
   Detail — /laws/[id]
══════════════════════════════════════════════════════════════ */

export const docDetailTabs = [
  { id: 'scan', label: 'اسکن بخشنامه', icon: 'lucide:scan-eye' },
  { id: 'points', label: 'نکات کلیدی بخشنامه', icon: 'lucide:list-checks' },
  { id: 'analysis', label: 'تحلیل و خلاصه کاربردی آریاز', icon: 'lucide:sparkles' },
] as const;

export type DocTab = (typeof docDetailTabs)[number]['id'];

export const docAssistant = {
  title: 'درباره این بخشنامه سوالی دارید؟',
  desc: 'با دستیار هوشمند آریاز، پاسخ درخواست خود را دریافت کنید',
  placeholder: 'سهم بیمه کارفرما در سال ۱۴۰۴ چقدر است؟',
  cta: 'پرسش از دستیار قانون کار',
  art: `${D}/doc-ai-robot.png`,
};

export const docExperts = {
  title: 'نیاز به بررسی تخصصی دارید؟',
  desc: 'با متخصصان حوزه منابع انسانی، قانون کار و تأمین اجتماعی مشاوره بگیرید',
  cta: 'رزرو مشاوره تخصصی',
  allCta: 'مشاهده همه متخصصان',
  people: [
    { name: 'دکتر نعمتی', role: 'وکیل پایه یک دادگستری', avatar: `${D}/people/expert-01-lawyer.png` },
    { name: 'مهندس محمدی', role: 'مشاور منابع انسانی', avatar: `${D}/people/expert-02-hr.png` },
    { name: 'دکتر احمدی', role: 'مشاور پایه یک دادگستری', avatar: `${D}/people/expert-03-attorney.png` },
  ],
};

export const docLearningPath = {
  title: 'مسیر یادگیری مرتبط با قوانین کار و تأمین اجتماعی',
  desc: 'برای تسلط کامل بر قوانین و مقررات کار و تأمین اجتماعی، مسیر یادگیری پیشنهادی آریاز را دنبال کنید.',
  cta: 'مشاهده مسیر یادگیری',
  href: '/learning-paths',
  art: `${D}/doc-learning-path.png`,
};

export interface DocColumn {
  title: string;
  icon: string;
  tone: Tone;
  items: string[];
  cta: string;
  href: string;
}

export interface DocDetail extends Doc {
  updated: string;
  lead: string;
  specs: { label: string; value: string; icon: string }[];
  scanPages: { page: string; title: string; lines: string[] }[];
  points: string[];
  analysis: string[];
  columns: DocColumn[];
  articles: { title: string; thumb: string; updated: string; href: string }[];
  ratingScore: string;
  ratingCount: string;
  reviews: { name: string; avatar: string; stars: number; date: string; text: string }[];
  heroArt: string;
}

const docColumns: DocColumn[] = [
  {
    title: 'فرم‌ها و دستورالعمل‌ها',
    icon: 'lucide:file-text',
    tone: 'violet',
    items: ['فرم قرارداد کار', 'فرم لیست بیمه', 'دستورالعمل اجرای قانون کار'],
    cta: 'مشاهده همه',
    href: '/forms',
  },
  {
    title: 'ابزارهای مرتبط',
    icon: 'lucide:wrench',
    tone: 'green',
    items: ['ماشین حساب حق بیمه', 'نرم‌افزار حقوق و مزایا', 'تقویم محاسبات بیمه'],
    cta: 'مشاهده همه',
    href: '/tools',
  },
  {
    title: 'آزمون‌ها و تست‌های مرتبط',
    icon: 'lucide:clipboard-check',
    tone: 'orange',
    items: ['تست قوانین کار', 'تست تأمین اجتماعی', 'تست حقوق و دستمزد'],
    cta: 'مشاهده همه',
    href: '/exams',
  },
  {
    title: 'دوره‌های مرتبط',
    icon: 'lucide:graduation-cap',
    tone: 'blue',
    items: ['دوره حقوق و دستمزد', 'دوره قوانین کار کاربردی', 'دوره تأمین اجتماعی'],
    cta: 'مشاهده همه',
    href: '/courses',
  },
  {
    title: 'ایجنت‌های مرتبط',
    icon: 'lucide:bot',
    tone: 'indigo',
    items: ['تحلیل قوانین کار', 'دستیار تأمین اجتماعی', 'مشاور منابع انسانی'],
    cta: 'مشاهده همه',
    href: '/agents',
  },
];

const docArticles = [
  {
    title: 'راهنمای جامع محاسبه حق بیمه کارکنان',
    thumb: `${D}/articles/doc-article-01-insurance-calc.png`,
    updated: '۱۴۰۴/۰۳/۲۱',
    href: '/articles',
  },
  {
    title: 'نحوه پرداخت‌های سهم بیمه در سال ۱۴۰۴',
    thumb: `${D}/articles/doc-article-02-payments-1404.png`,
    updated: '۱۴۰۴/۰۳/۱۸',
    href: '/articles',
  },
  {
    title: 'تأثیر تغییرات بیمه بر حقوق و دستمزد',
    thumb: `${D}/articles/doc-article-03-wage-impact.png`,
    updated: '۱۴۰۴/۰۳/۲۵',
    href: '/articles',
  },
  {
    title: 'اطلاعیه‌های جدید قوانین بیمه‌ای',
    thumb: `${D}/articles/doc-article-04-new-regulations.png`,
    updated: '۱۴۰۴/۰۳/۲۵',
    href: '/articles',
  },
];

/** Every document renders from this template with its own record fields. */
export function getDoc(id: string): DocDetail | undefined {
  const doc = docs.find((d) => d.id === id);
  if (!doc) return undefined;

  return {
    ...doc,
    updated: 'خرداد ۱۴۰۵',
    lead: 'آخرین دستورالعمل سازمان تأمین اجتماعی درباره نحوه محاسبه و اعمال حق بیمه سهم کارفرما و کارکنان در سال ۱۴۰۴.',
    heroArt: `${D}/doc-detail-hero.png`,
    specs: [
      { label: `شماره ${doc.numberLabel}`, value: '۹۹۹/۷۳۳', icon: 'lucide:tag' },
      { label: 'مرجع صادرکننده', value: doc.authority, icon: 'lucide:building' },
      { label: 'تاریخ انتشار', value: doc.date, icon: 'lucide:calendar' },
      { label: 'موضوع', value: 'حقوق و دستمزد / بیمه', icon: 'lucide:tag' },
    ],
    scanPages: [
      {
        page: '۱',
        title: 'صفحه ۱ از ۳ — شرح کلی بیمه',
        lines: [
          'با توجه به دستورالعمل ابلاغی و مفاد تبصره‌های مربوط، نحوه محاسبه حق بیمه سهم کارفرما و کارکنان مطابق ضوابط مندرج در این بخشنامه تعیین می‌گردد.',
          'مأخذ کسر حق بیمه، مجموع مزد و مزایای مشمول کسر حق بیمه در هر ماه است.',
        ],
      },
      {
        page: '۲',
        title: 'صفحه ۲ از ۳ — نرخ‌ها و جدول‌ها',
        lines: [
          'نرخ حق بیمه سهم کارفرما، سهم کارکنان و سهم دولت به تفکیک در جدول پیوست آمده است.',
          'کارگاه‌های مشمول معافیت، بر اساس فهرست پیوست شماره دو تعیین می‌شوند.',
        ],
      },
      {
        page: '۳',
        title: 'صفحه ۳ از ۳ — مهلت‌ها و جرائم',
        lines: [
          'مهلت ارسال لیست و پرداخت حق بیمه، آخرین روز ماه بعد است.',
          'تأخیر در ارسال لیست مشمول جریمه مقرر در قانون خواهد بود.',
        ],
      },
    ],
    points: [
      'مأخذ کسر حق بیمه، مجموع مزد و مزایای مشمول در هر ماه است.',
      'سهم کارفرما و سهم کارکنان به تفکیک در جدول پیوست تعیین شده است.',
      'مهلت ارسال لیست و پرداخت حق بیمه، آخرین روز ماه بعد است.',
      'کارگاه‌های مشمول معافیت در فهرست پیوست شماره دو آمده‌اند.',
      'تأخیر در ارسال لیست، مشمول جریمه قانونی می‌شود.',
    ],
    analysis: [
      'این بخشنامه تکلیف کارفرمایان را در محاسبه حق بیمه روشن می‌کند و مبنای محاسبه را به مزد و مزایای مشمول کسر حق بیمه گره می‌زند؛ بنابراین اقلام غیرمشمول باید در فهرست حقوق و دستمزد تفکیک شوند.',
      'برای واحدهای منابع انسانی، مهم‌ترین اثر عملی، بازبینی ساختار حکم حقوقی و به‌روزرسانی فرمول‌های سیستم حقوق و دستمزد پیش از ارسال لیست ماه بعد است.',
    ],
    columns: docColumns,
    articles: docArticles,
    ratingScore: '۴.۸',
    ratingCount: '۳۴۴',
    reviews: [
      {
        name: 'علی طاهری',
        avatar: `${D}/people/doc-reviewer-01.png`,
        stars: 4,
        date: '۱۴۰۴/۰۵/۱۵',
        text: 'تغییرات به‌خوبی و به‌موقع پوشش داده شده. ممنون از تحلیل کاربردی آریاز.',
      },
      {
        name: 'پریسا کریمی',
        avatar: `${D}/people/doc-reviewer-02.png`,
        stars: 5,
        date: '۱۴۰۴/۰۵/۱۵',
        text: 'بخشنامه خیلی جامع و دقیق است؛ خلاصه کاربردی وقت ما را کم کرد.',
      },
    ],
  };
}

export const docIds = docs.map((d) => d.id);
