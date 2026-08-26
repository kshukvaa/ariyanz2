import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   پرونده مشاوره — the client's view of a case already submitted.
   Sources: «request for consulting on case» pages 4, 8, 9, 10,
   12 and 14 — one screen with six tabs, not six screens.

   This is where the case wizard lands once it is paid for, so it
   is read-mostly: everything the client can still DO is either a
   quick action in the rail or the one composer on the گفتگو tab.
────────────────────────────────────────────────────────────── */

const A = '/images/aryaz/avatars';

export const caseBack = { label: 'بازگشت به مشاوره‌های من', href: '/counseling/my-consultations' };

export const caseHead = {
  code: 'پرونده مشاوره #AR-2048',
  title: 'بررسی شرایط خاتمه همکاری مدیر فروش',
  icon: 'lucide:folder',
  expertLabel: 'مشاور:',
  expert: 'دکتر امیر حسینی',
  fieldLabel: 'حوزه:',
  field: 'روابط کار، خاتمه همکاری',
  avatar: `${A}/expert-01-lawyer.png`,
  cta: 'مشاهده پروفایل مشاور',
  meta: [
    { label: 'تاریخ ایجاد', value: '۲۷ مرداد ۱۴۰۵', icon: 'lucide:calendar' },
    { label: 'آخرین فعالیت', value: 'امروز، ۱۰:۴۵', icon: 'lucide:clock' },
    { label: 'سطح فوریت', value: 'عادی', icon: 'lucide:flag' },
  ],
};

export interface CaseRailStep {
  label: string;
  date?: string;
  time?: string;
  state: 'done' | 'current' | 'todo';
}

export const caseRail: { steps: CaseRailStep[]; note: string } = {
  steps: [
    { label: 'پرونده ثبت شد', date: '۲۷ مرداد ۱۴۰۵', time: '۰۹:۳۲', state: 'done' },
    { label: 'پرداخت انجام شد', date: '۲۷ مرداد ۱۴۰۵', time: '۰۹:۴۰', state: 'done' },
    { label: 'تحویل مشاور شد', date: '۲۷ مرداد ۱۴۰۵', time: '۱۰:۱۵', state: 'done' },
    { label: 'در حال بررسی', date: '۲۸ مرداد ۱۴۰۵', time: '۱۰:۴۵', state: 'current' },
    { label: 'اطلاعات تکمیلی', date: 'در صورت نیاز', state: 'todo' },
    { label: 'پاسخ نهایی', date: 'تا ۲ روز کاری آینده', state: 'todo' },
  ],
  note: 'زمان تقریبی پاسخ: تا ۲ روز کاری دیگر',
};

export const caseTabs = [
  { id: 'chat', label: 'گفتگو', icon: 'lucide:message-circle' },
  { id: 'summary', label: 'خلاصه پرونده', icon: 'lucide:layout-grid' },
  { id: 'timeline', label: 'Timeline', icon: 'lucide:git-commit-horizontal' },
  { id: 'docs', label: 'مدارک', icon: 'lucide:file-text' },
  { id: 'outputs', label: 'پاسخ‌ها و خروجی‌ها', icon: 'lucide:file-check' },
  { id: 'sessions', label: 'جلسات مرتبط', icon: 'lucide:calendar' },
];

/* ── Rail ─────────────────────────────────────────────────────── */

export const caseStatus = {
  title: 'وضعیت پرونده',
  icon: 'lucide:clipboard-list',
  chip: 'در حال بررسی توسط مشاور',
  rows: [
    { label: 'آخرین بروزرسانی:', value: 'امروز، ۱۰:۴۵' },
    { label: 'زمان تخمینی پاسخ:', value: 'تا ۲ روز کاری دیگر', warn: true },
  ],
  progress: 40,
  progressLabel: '۴۰٪ پیشرفت پرونده',
};

export const caseExpert = {
  title: 'مشاور پرونده',
  icon: 'lucide:zap',
  name: 'دکتر امیر حسینی',
  role: 'مشاور ارشد روابط کار',
  avatar: `${A}/expert-01-lawyer.png`,
  rating: '۴.۹ از ۵',
  basis: '۵۵ نظر',
  cta: 'مشاهده پروفایل',
};

export const caseActions = {
  title: 'اقدامات سریع',
  icon: 'lucide:zap',
  items: [
    { label: 'ارسال مدرک جدید', icon: 'lucide:upload' },
    { label: 'ارسال پیام به مشاور', icon: 'lucide:message-circle' },
    { label: 'مشاهده جزئیات پرداخت', icon: 'lucide:credit-card' },
    { label: 'درخواست جلسه مرتبط', icon: 'lucide:calendar' },
  ],
};

export const caseAgent = {
  title: 'آریاز، دستیار پرونده شما',
  bubble: 'می‌توانم کمک کنم اتفاقات پرونده را دنبال کنید و اطلاعات موجود را بهتر بفهمید.',
  art: '/images/aryaz/illustrations/ai-assistant-avatar.png',
  chips: [
    'پرونده تا کجا پیش رفته؟',
    'آخرین درخواست مشاور چیست؟',
    'چه مدارکی هنوز کم است؟',
    'گفتگوها را خلاصه کن',
    'Timeline پرونده را نشان بده',
  ],
  placeholder: 'سوال خود را بنویسید.',
};

/* ── Tab: گفتگو ───────────────────────────────────────────────── */

export const caseChat = {
  title: 'گفتگو درباره پرونده',
  icon: 'lucide:message-circle',
  placeholder: 'پیام خود را بنویسید...',
  send: 'ارسال',
  messages: [
    {
      id: 'm1',
      me: true,
      author: 'شما',
      time: 'امروز ۱۰:۴۰',
      body: 'سلام آقای دکتر، فایل آخرین اخطار کتبی را هم اضافه کردم لطفاً بررسی کنید.',
    },
    {
      id: 'm2',
      me: false,
      author: 'دکتر امیر حسینی',
      avatar: `${A}/expert-01-lawyer.png`,
      time: 'امروز ۱۰:۴۲',
      body: 'سلام، ممنون. قراردادها و اخطارها را بررسی کردم. برای تکمیل بررسی لطفاً صورتجلسه کمیته انضباطی را نیز ارسال کنید.',
    },
  ],
  request: {
    title: 'درخواست مدرک تکمیلی',
    time: 'امروز ۱۰:۴۴',
    note: 'دکتر حسینی یک مدرک تکمیلی درخواست کرده است.',
    docTitle: 'صورتجلسه کمیته انضباطی',
    docBody: 'لطفاً صورتجلسه کمیته انضباطی مربوط به بررسی تخلفات مدیر فروش را ارسال فرمایید.',
    cta: 'بارگذاری مدرک',
  },
};

/* ── Tab: خلاصه پرونده ────────────────────────────────────────── */

export const caseSummary = {
  key: {
    title: 'اطلاعات کلیدی پرونده',
    icon: 'lucide:clipboard-list',
    rows: [
      { label: 'عنوان پرونده', value: 'بررسی شرایط خاتمه همکاری مدیر فروش', icon: 'lucide:file-text' },
      { label: 'حوزه پرونده', value: 'روابط کار، خاتمه همکاری', icon: 'lucide:layers' },
      { label: 'هدف از مشاوره', value: 'بررسی ریسک‌های خاتمه همکاری و ارائه پیشنهاد اقدام کم‌ریسک و قانونی', icon: 'lucide:target' },
      { label: 'وضعیت اولیه پرونده', value: 'اخطار کتبی صادر شده و جلسه داخلی برگزار شده', icon: 'lucide:circle-alert' },
      { label: 'سطح فوریت', value: 'عادی', icon: 'lucide:clock' },
      { label: 'تعداد رویدادها', value: '۳ رویداد', icon: 'lucide:list' },
      { label: 'تعداد مدارک', value: '۴ فایل', icon: 'lucide:file-text' },
    ],
  },
  brief: {
    title: 'خلاصه حرفه‌ای پرونده (Case Brief)',
    icon: 'lucide:clipboard-list',
    body: [
      'کارفرما قصد دارد همکاری با مدیر فروش با سابقه تقریبی ۶ سال و دارای قرارداد مدت‌معین را خاتمه دهد. در دو ماه گذشته افت عملکرد و عدم تحقق تارگت فروش ثبت شده است. دو اخطار کتبی صادر گردیده و جلسه کمیته انضباطی نیز برگزار شده است.',
      'درخواست اصلی بررسی ریسک‌های احتمالی این اقدام، تحلیل مستندات موجود و ارائه راهکار قانونی و کم‌ریسک برای خاتمه همکاری است.',
    ],
    agreedTitle: 'توافق طرفین شده با مشاور',
    agreed: [
      'بررسی کامل مدارک و مستندات',
      'تحلیل ریسک‌های حقوقی و مالی',
      'تعیین مسیر اقدام کم‌ریسک و قانونی',
      'ارائه نظر تخصصی مکتوب و توصیه‌های اجرایی',
    ],
  },
  points: {
    title: 'موارد کلیدی که مشاور باید بداند',
    icon: 'lucide:clipboard-list',
    items: [
      'اختلاف اصلی بر سر افت عملکرد و عدم تحقق اهداف فروش است.',
      'دو اخطار کتبی صادر شده که بندهای قراردادی مربوطه را استناد کرده است.',
      'جلسه کمیته انضباطی برگزار شده ولی صورتجلسه هنوز ارسال نشده است.',
      'کارمند اعلام کرده در صورت خاتمه به اداره کار مراجعه خواهد کرد.',
    ],
    cta: 'مشاهده متن کامل شرح پرونده',
  },
  analysis: {
    title: 'تحلیل اولیه آریاز',
    icon: 'lucide:sparkles',
    tiles: [
      { label: 'پرونده برای ارجاع به مشاور', value: 'آماده است', icon: 'lucide:circle-check', fg: '#1c8a4e' },
      { label: 'ریسک‌های اصلی شناسایی‌شده', value: '۴ مورد', icon: 'lucide:triangle-alert', fg: T.warning },
      { label: 'احتمال موفقیت کارفرما مشروط‌ها', value: '۴۵٪', icon: 'lucide:shield', fg: T.primary },
      { label: 'ریسک کلی پرونده', value: 'متوسط', icon: 'lucide:scale', fg: T.accent },
    ],
    cta: 'مشاهده جزئیات تحلیل',
  },
};

/* ── Tab: Timeline ────────────────────────────────────────────── */

export const caseTimeline = {
  title: 'Timeline پرونده',
  icon: 'lucide:git-commit-horizontal',
  all: 'مشاهده همه رویدادها',
  items: [
    {
      date: '۱۴۰۵/۰۵/۲۷',
      time: '۰۹:۳۲',
      day: 'دوشنبه',
      title: 'پرونده ایجاد شد',
      body: 'پرونده مشاوره با عنوان «بررسی شرایط خاتمه همکاری مدیر فروش» ایجاد شد.',
      icon: 'lucide:folder-plus',
      state: 'done' as const,
    },
    {
      date: '۱۴۰۵/۰۵/۲۷',
      time: '۰۹:۴۰',
      day: 'دوشنبه',
      title: 'پرداخت انجام شد',
      body: 'پرداخت هزینه مشاوره با موفقیت انجام شد و پرونده ثبت نهایی گردید.',
      icon: 'lucide:credit-card',
      state: 'done' as const,
    },
    {
      date: '۱۴۰۵/۰۵/۲۷',
      time: '۱۰:۱۵',
      day: 'دوشنبه',
      title: 'پرونده به مشاور تحویل شد',
      body: 'پرونده توسط سیستم به دکتر امیر حسینی ارجاع و در اختیار ایشان قرار گرفت.',
      icon: 'lucide:user-round',
      state: 'done' as const,
    },
    {
      date: '۱۴۰۵/۰۵/۲۸',
      time: '۱۰:۴۵',
      day: 'سه‌شنبه',
      title: 'بررسی مدارک توسط مشاور آغاز شد',
      body: 'دکتر امیر حسینی بررسی اولیه مدارک و اطلاعات پرونده را آغاز کرده است.',
      icon: 'lucide:search',
      state: 'current' as const,
    },
    {
      date: '۱۴۰۵/۰۵/۲۸',
      time: '۱۱:۳۰',
      day: 'سه‌شنبه',
      title: 'درخواست تکمیل اطلاعات',
      body: 'مشاور درخواست تکمیل یک مدرک (صورتجلسه کمیته انضباطی) را ثبت کرده است.',
      icon: 'lucide:file-text',
      state: 'pending' as const,
    },
    {
      title: 'اطلاعات تکمیلی توسط شما',
      body: 'پس از ارسال مدارک موردنیاز، بررسی ادامه خواهد یافت.',
      icon: 'lucide:upload',
      state: 'todo' as const,
    },
    {
      title: 'پاسخ نهایی',
      body: 'پس از اتمام بررسی، نظر نهایی و خروجی‌های مشاوره در این بخش قرار خواهد گرفت.',
      icon: 'lucide:flag',
      state: 'todo' as const,
    },
  ],
};

/* ── Tab: مدارک ───────────────────────────────────────────────── */

export const caseDocs = {
  title: 'مدارک پرونده',
  icon: 'lucide:file-text',
  cta: 'بارگذاری مدرک جدید',
  search: 'جستجوی فایل...',
  tabs: ['همه', 'قراردادها', 'مکاتبات', 'احکام و آراء', 'مالی و محاسبات', 'مدارک پرسنلی', 'سایر'],
  columns: ['نام فایل', 'دسته', 'ارسال‌کننده', 'تاریخ ارسال', 'نسخه', 'وضعیت بررسی', 'عملیات'],
  pager: 'نمایش ۱ تا ۸ از ۱۲ فایل',
  rows: [
    { name: 'قرارداد مدیر فروش.pdf', size: '۱.۷ MB', cat: 'قراردادها', by: 'شما', date: '۲۷ مرداد ۱۴۰۵', time: '۰۹:۵۵', v: 'v1', status: 'بررسی شده', tone: 'ok' },
    { name: 'اخطار کتبی اول.pdf', size: '۸۵۶ KB', cat: 'مکاتبات', by: 'شما', date: '۲۷ مرداد ۱۴۰۵', time: '۰۹:۵۷', v: 'v1', status: 'بررسی شده', tone: 'ok' },
    { name: 'اخطار کتبی دوم.pdf', size: '۹۹۰ KB', cat: 'مکاتبات', by: 'شما', date: '۲۷ مرداد ۱۴۰۵', time: '۱۰:۰۵', v: 'v1', status: 'در حال بررسی', tone: 'warn' },
    { name: 'صورتجلسه کمیته انضباطی.pdf', size: '۱.۱ MB', cat: 'مکاتبات', by: 'شما', date: '۲۶ مرداد ۱۴۰۵', time: '۱۴:۲۰', v: 'v1', status: 'در انتظار بررسی', tone: 'info' },
    { name: 'فیش حقوقی فروردین ۱۴۰۵.pdf', size: '۵۴۶ KB', cat: 'مالی و محاسبات', by: 'شما', date: '۲۷ مرداد ۱۴۰۵', time: '۱۰:۱۲', v: 'v1', status: 'بررسی نشده', tone: 'idle' },
    { name: 'رأی هیأت تشخیص — شماره ۱۴۰۲/۷۵۶.pdf', size: '۱.۵ MB', cat: 'احکام و آراء', by: 'شما', date: '۲۷ مرداد ۱۴۰۵', time: '۱۰:۲۰', v: 'v1', status: 'بررسی نشده', tone: 'idle' },
    { name: 'اطلاعات سوابق و سابقه همکاری.pdf', size: '۷۲۰ KB', cat: 'مدارک پرسنلی', by: 'شما', date: '۲۷ مرداد ۱۴۰۵', time: '۱۰:۲۵', v: 'v1', status: 'بررسی شده', tone: 'ok' },
    { name: 'مکاتبات تلفنی و پیام‌ها.zip', size: '۲.۶ MB', cat: 'سایر', by: 'شما', date: '۲۶ مرداد ۱۴۰۵', time: '۱۶:۴۰', v: 'v1', status: 'در حال بررسی', tone: 'warn' },
  ],
};

/* ── Tab: پاسخ‌ها و خروجی‌ها ──────────────────────────────────── */

export const caseOutputs = {
  title: 'پاسخ‌ها و خروجی‌های مشاور',
  icon: 'lucide:file-check',
  desc: 'تمامی خروجی‌ها، تحلیل‌ها و پاسخ‌های بررسی مشاور شما در این بخش قرار می‌گیرند.',
  note: 'پس از تکمیل بررسی، پاسخ نهایی پرونده در این قسمت قرار خواهند گرفت.',
  columns: ['عنوان خروجی', 'نوع فایل', 'ارسال‌کننده', 'تاریخ ارسال', 'نسخه', 'وضعیت', 'عملیات'],
  footer: 'تمامی خروجی‌ها محرمانه هستند و صرفاً برای استفاده شما در دسترس می‌باشند.',
  rows: [
    { name: 'نظر تخصصی اولیه', desc: 'تحلیل اولیه و بررسی ریسک‌های خاتمه همکاری', type: 'PDF', by: 'دکتر امیر حسینی', date: '۲۸ مرداد ۱۴۰۵', time: '۱۱:۳۰', v: 'v1', status: 'در حال بررسی', tone: 'warn' },
    { name: 'تحلیل ریسک پرونده', desc: 'بررسی ریسک‌های قانونی و مالی خاتمه همکاری', type: 'PDF', by: 'دکتر امیر حسینی', date: '۲۷ مرداد ۱۴۰۵', time: '۰۹:۱۵', v: 'v1', status: 'تکمیل شده', tone: 'ok' },
    { name: 'پیش‌نویس نامه خاتمه همکاری', desc: 'پیش‌نویس حرفه‌ای نامه خاتمه همکاری', type: 'Word', by: 'دکتر امیر حسینی', date: '۲۸ مرداد ۱۴۰۵', time: '۱۲:۳۰', v: 'v1', status: 'تکمیل شده', tone: 'ok' },
    { name: 'محاسبات مطالبات احتمالی', desc: 'محاسبه حقوق و مزایا و مطالبات احتمالی', type: 'Excel', by: 'دکتر امیر حسینی', date: '۲۷ مرداد ۱۴۰۵', time: '۱۲:۴۵', v: 'v1', status: 'تکمیل شده', tone: 'ok' },
    { name: 'خلاصه جلسه مشاوره آنلاین', desc: 'خلاصه نکات و تصمیمات جلسه آنلاین', type: 'PDF', by: 'دکتر امیر حسینی', date: '۳۰ مرداد ۱۴۰۵', time: '۱۰:۰۰', v: 'v1', status: 'در انتظار تأیید شما', tone: 'info' },
    { name: 'نظر نهایی و پیشنهاد اقدام', desc: 'نتیجه نهایی بررسی و پیشنهاد اقدام کم‌ریسک', type: 'PDF', by: 'دکتر امیر حسینی', v: 'v1', status: 'در انتظار تکمیل بررسی', tone: 'idle' },
  ],
};

/* ── Tab: جلسات مرتبط ─────────────────────────────────────────── */

export const caseSessions = {
  title: 'جلسات مرتبط با این پرونده',
  icon: 'lucide:calendar',
  desc: 'تمامی جلسات حضوری یا آنلاین مرتبط با این پرونده در این بخش نمایش داده می‌شوند.',
  cta: 'درخواست جلسه جدید',
  columns: ['عنوان جلسه', 'نوع جلسه', 'مشاور', 'تاریخ و زمان', 'مدت', 'وضعیت', 'عملیات'],
  footer: 'تمام جلسات به این پرونده متصل هستند و در پرونده شما آرشیو می‌شوند.',
  rows: [
    {
      name: 'جلسه آنلاین اول',
      desc: 'بررسی اولیه مدارک و شرایط پرونده',
      tag: 'جلسه اصلی',
      kind: 'آنلاین',
      kindIcon: 'lucide:video',
      expert: 'دکتر امیر حسینی',
      role: 'مشاور روابط کار',
      avatar: `${A}/expert-01-lawyer.png`,
      date: '۲۹ مرداد ۱۴۰۵',
      time: '۱۴:۰۰',
      len: '۶۰ دقیقه',
      status: 'برگزار شده',
      tone: 'ok',
      cta: 'مشاهده خلاصه جلسه',
    },
    {
      name: 'جلسه تکمیلی',
      desc: 'بررسی صورتجلسه کمیته انضباطی',
      kind: 'آنلاین',
      kindIcon: 'lucide:video',
      expert: 'دکتر امیر حسینی',
      role: 'مشاور روابط کار',
      avatar: `${A}/expert-01-lawyer.png`,
      date: '۳۱ مرداد ۱۴۰۵',
      time: '۱۰:۰۰',
      len: '۴۵ دقیقه',
      status: 'برنامه‌ریزی‌شده',
      tone: 'info',
      cta: 'جزئیات جلسه',
    },
    {
      name: 'جلسه حضوری (در صورت نیاز)',
      desc: 'بررسی نهایی و تصمیم‌گیری',
      kind: 'حضوری',
      kindIcon: 'lucide:map-pin',
      expert: 'دکتر امیر حسینی',
      role: 'مشاور روابط کار',
      avatar: `${A}/expert-01-lawyer.png`,
      len: '—',
      status: 'در انتظار',
      tone: 'idle',
      cta: 'برنامه‌ریزی',
    },
  ],
};

/* Status pill colours, shared by the three tables. */
export const TONES: Record<string, { fg: string; bg: string }> = {
  ok: { fg: '#1c8a4e', bg: T.tintGreen },
  warn: { fg: T.accent, bg: T.tintOrange },
  info: { fg: T.infoStrong, bg: T.tintBlue },
  idle: { fg: T.muted, bg: '#f3f3f8' },
};
