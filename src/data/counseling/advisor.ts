import { T } from '@/data/panelTokens';

/* ──────────────────────────────────────────────────────────────
   پنل مشاور — the advisor's own workspace.
   Sources: «request for consulting on case» pages 15, 16, 17, 18.

   This is the other side of the counselling section: everything
   else in /counseling is what the client sees. Signed-in tooling,
   so it replaces the site chrome with its own bar and rail — but
   unlike the organisation panel the rail is light, which is what
   the sheets draw.
────────────────────────────────────────────────────────────── */

const A = '/images/aryaz/avatars';

export const advisorUser = {
  name: 'دکتر امیر حسینی',
  role: 'مشاور ارشد روابط کار',
  avatar: `${A}/expert-01-lawyer.png`,
};

export const advisorNav = [
  { id: 'dashboard', label: 'داشبورد', icon: 'lucide:layout-grid', href: '/advisor' },
  { id: 'requests', label: 'درخواست‌های جدید', icon: 'lucide:inbox', href: '/advisor/requests', badge: '۳' },
  { id: 'cases', label: 'پرونده‌های من', icon: 'lucide:folder', href: '/advisor/cases' },
  { id: 'questions', label: 'سؤال‌های تخصصی', icon: 'lucide:message-circle', href: '/advisor/questions' },
  { id: 'calendar', label: 'جلسات و تقویم', icon: 'lucide:calendar', href: '/advisor/calendar' },
  { id: 'messages', label: 'پیام‌ها', icon: 'lucide:message-square-text', href: '/advisor/messages', badge: '۷' },
  { id: 'outputs', label: 'خروجی‌ها', icon: 'lucide:file-check-2', href: '/advisor/outputs' },
  { id: 'income', label: 'درآمد و تسویه', icon: 'lucide:credit-card', href: '/advisor/income' },
  { id: 'profile', label: 'پروفایل و خدمات', icon: 'lucide:user-round', href: '/advisor/profile' },
  { id: 'settings', label: 'تنظیمات دسترسی و ظرفیت', icon: 'lucide:settings', href: '/advisor/settings' },
];

export const advisorLogout = { label: 'خروج', icon: 'lucide:log-out', href: '/' };

export const advisorBar = {
  icons: [
    { id: 'calendar', icon: 'lucide:calendar' },
    { id: 'messages', icon: 'lucide:message-square-text', badge: '۳' },
    { id: 'bell', icon: 'lucide:bell', badge: '۵' },
  ],
};

/* The availability switch repeats on three of the four screens. */
export const advisorAvailability = {
  on: 'پذیرش درخواست فعال',
  label: 'پذیرش درخواست‌های جدید',
  manage: 'مدیریت ظرفیت و زمان‌های مشاوره',
};

/* ── Dashboard (page 15) ──────────────────────────────────────── */

export const advisorGreeting = {
  hello: 'سلام دکتر امیر حسینی، روز بخیر',
  sub: 'امروز ۲ درخواست نیازمند بررسی و ۲ جلسه پیش رو دارید.',
  avatar: `${A}/expert-01-lawyer.png`,
};

export const advisorStats = [
  { value: '۳', label: 'درخواست جدید', cta: 'مشاهده همه', icon: 'lucide:message-circle', fg: T.primary, bg: T.tintPurple },
  { value: '۵', label: 'پرونده فعال', cta: 'مشاهده همه', icon: 'lucide:folder', fg: T.infoStrong, bg: T.tintBlue },
  { value: '۲', label: 'اقدام فوری', cta: 'مشاهده', icon: 'lucide:circle-alert', fg: T.accent, bg: T.tintOrange },
  { value: '۲', label: 'جلسه امروز', cta: 'مشاهده برنامه', icon: 'lucide:calendar', fg: '#1c8a4e', bg: T.tintGreen },
  { value: '۴', label: 'پاسخ در انتظار ارسال', cta: 'مشاهده', icon: 'lucide:file-text', fg: T.primary, bg: T.tintPurple },
];

export const advisorAttention = {
  title: 'نیازمند توجه شما',
  count: '۳',
  items: [
    {
      kind: 'درخواست جدید پرونده تخصصی',
      title: 'بررسی تعدیل ۲۲ نفر از کارکنان',
      org: 'شرکت توسعه پارس',
      meta: 'ارسال‌شده ۲ ساعت قبل',
      cta: 'مشاهده و تصمیم‌گیری',
      icon: 'lucide:folder',
      tone: 'danger' as const,
    },
    {
      kind: 'پاسخ شما نزدیک به Deadline است',
      title: '#AR-2048',
      org: '',
      meta: '۸ ساعت تا موعد پاسخ',
      cta: 'ادامه بررسی',
      icon: 'lucide:clock',
      tone: 'warn' as const,
    },
    {
      kind: 'مدرک جدید دریافت شد',
      title: 'صورتجلسه کمیته انضباطی',
      org: 'پرونده «خاتمه همکاری مدیر فروش»',
      meta: '',
      cta: 'مشاهده مدرک',
      icon: 'lucide:file-text',
      tone: 'info' as const,
    },
  ],
};

export const advisorToday = {
  title: 'جلسات امروز',
  all: 'مشاهده تقویم کامل',
  items: [
    {
      from: '۰۹:۰۰',
      to: '۱۰:۰۰',
      kind: 'جلسه آنلاین',
      title: 'بررسی قرارداد مدیرعامل',
      org: 'شرکت بهینه سازان صنعت',
      cta: 'ورود به جلسه',
      dot: '#1c8a4e',
    },
    {
      from: '۱۴:۳۰',
      to: '۱۵:۳۰',
      kind: 'جلسه حضوری',
      title: 'مشاوره ساختار جبران خدمات',
      org: 'شرکت توسعه پارس',
      place: 'دفتر آریاز — سالن جلسات ۲',
      cta: 'مشاهده جزئیات',
      dot: T.accent,
    },
  ],
};

export const advisorActiveCases = {
  title: 'پرونده‌های فعال',
  all: 'مشاهده همه',
  more: 'مشاهده همه پرونده‌ها',
  items: [
    {
      title: 'بررسی شرایط خاتمه همکاری مدیر فروش',
      org: 'شرکت پخش سراسری بارکانا',
      meta: 'آخرین فعالیت: امروز ۱۰:۴۵',
      pct: 65,
      status: 'در حال بررسی',
      tone: 'info' as const,
      cta: 'ورود به پرونده',
    },
    {
      title: 'اختلاف محاسبه سنوات',
      org: 'شرکت تولیدی سپهر',
      meta: 'آخرین فعالیت: دیروز ۱۴:۲۰',
      pct: 40,
      status: 'منتظر اطلاعات مشتری',
      tone: 'warn' as const,
      deadline: 'Deadline ۵ روز دیگر',
      cta: 'ورود به پرونده',
    },
    {
      title: 'بررسی قرارداد مشاور پروژه',
      org: 'مهندسین مشاور آرمان',
      meta: 'آخرین فعالیت: ۲ روز پیش',
      pct: 80,
      status: 'در حال بررسی',
      tone: 'info' as const,
      deadline: 'Deadline ۴ روز',
      cta: 'ورود به پرونده',
    },
  ],
};

/* ── New requests (pages 15 + 16) ─────────────────────────────── */

export const advisorRequestsHead = {
  title: 'درخواست‌های جدید',
  desc: 'درخواست‌هایی که برای بررسی و تصمیم‌گیری به شما ارجاع شده‌اند.',
  stats: [
    { value: '۳', label: 'درخواست جدید' },
    { value: '۱', label: 'فوری', fg: T.danger },
    { value: '۲', label: 'در انتظار پاسخ' },
  ],
  tabs: ['همه', 'سؤال تخصصی', 'جلسه تخصصی', 'جلسه حضوری'],
  filters: ['همه حوزه‌ها', 'بیشترین تطابق', 'جدیدترین'],
  search: 'جستجو در درخواست‌ها...',
  all: 'مشاهده همه',
};

export interface AdvisorRequest {
  id: string;
  kind: string;
  kindIcon: string;
  urgency: string;
  urgent?: boolean;
  match: number;
  matchNote: string;
  title: string;
  desc?: string;
  field: string;
  org: string;
  meta: { label: string; value: string; icon: string }[];
  why: string;
  slots?: string[];
  accept: string;
  reject: string;
  view: string;
  detail: string;
}

export const advisorRequests: AdvisorRequest[] = [
  {
    id: 'RQ-5884',
    kind: 'پرونده تخصصی',
    kindIcon: 'lucide:folder',
    urgency: 'فوری',
    urgent: true,
    match: 94,
    matchNote: 'تطابق با تخصص شما',
    title: 'بررسی تعدیل ۲۳ نفر از کارکنان',
    field: 'روابط کار ← خاتمه همکاری گروهی',
    org: 'شرکت توسعه پارس',
    meta: [
      { label: 'ارسال شده', value: 'امروز ۰۹:۴۰', icon: 'lucide:clock' },
      { label: 'مدارک پیوست', value: '۶ فایل', icon: 'lucide:file-text' },
      { label: 'زمان مورد انتظار مشتری', value: '۲ روز کاری', icon: 'lucide:hourglass' },
    ],
    why: 'این درخواست به حوزه‌های روابط کار، خاتمه همکاری و دعاوی اداره کار شما تطابق بالایی دارد.',
    accept: 'پذیرش',
    reject: 'عدم پذیرش',
    view: 'مشاهده درخواست',
    detail: 'جزئیات تطابق',
  },
  {
    id: 'RQ-5871',
    kind: 'سؤال تخصصی',
    kindIcon: 'lucide:message-circle',
    urgency: 'عادی',
    match: 89,
    matchNote: 'تطابق با تخصص شما',
    title: 'آیا امکان تغییر یک‌طرفه محل کار وجود دارد؟',
    desc: 'کارفرما قصد دارد محل انجام کار را از تهران به کرج تغییر دهد. آیا این تغییر بدون رضایت کارمند امکان‌پذیر است؟',
    field: 'قرارداد و روابط کار',
    org: 'شرکت نوین تجارت',
    meta: [
      { label: 'مبلغ خدمت', value: '۹۹۰,۰۰۰ تومان', icon: 'lucide:credit-card' },
      { label: 'پاسخ مورد انتظار', value: 'حداکثر ۲۴ ساعت', icon: 'lucide:clock' },
    ],
    why: 'موضوع در حوزه قرارداد و روابط کار قرار می‌گیرد که از تخصص‌های اصلی شماست.',
    accept: 'پذیرش',
    reject: 'عدم پذیرش',
    view: 'مشاهده درخواست',
    detail: 'جزئیات تطابق',
  },
  {
    id: 'RQ-5862',
    kind: 'جلسه آنلاین',
    kindIcon: 'lucide:video',
    urgency: 'عادی',
    match: 88,
    matchNote: 'تطابق با تخصص شما',
    title: 'مشاوره درباره ساختار قرارداد مدیران',
    desc: 'درخواست مشتری برای مشاوره درباره ساختار قراردادهای مدیران ارشد شرکت.',
    field: 'قراردادها',
    org: 'شرکت بهینه سازان صنعت',
    meta: [
      { label: 'مدت جلسه', value: '۶۰ دقیقه', icon: 'lucide:clock' },
      { label: 'زمان پیشنهادی مشتری', value: 'پنجشنبه ۲۵ مرداد', icon: 'lucide:calendar' },
    ],
    why: 'موضوع جلسه با تخصص قراردادهای کار شما هم‌راستاست.',
    slots: ['۱۰:۰۰', '۱۴:۰۰', '۱۸:۰۰'],
    accept: 'تأیید یکی از زمان‌ها',
    reject: 'عدم پذیرش',
    view: 'مشاهده درخواست',
    detail: 'جزئیات تطابق',
  },
];

export const advisorSlotCta = 'پیشنهاد زمان دیگر';

/* ── Request detail (page 17) ─────────────────────────────────── */

export const advisorRequestDetail = {
  back: 'بازگشت به درخواست‌های جدید',
  code: 'درخواست پرونده تخصصی #RQ-5884',
  title: 'بررسی تعدیل ۲۳ نفر از کارکنان',
  pills: [
    { label: 'فوری', tone: 'danger' as const, icon: 'lucide:zap' },
    { label: 'پرونده تخصصی', tone: 'purple' as const, icon: 'lucide:folder' },
    { label: 'ارجاع‌شده توسط آریاز', tone: 'muted' as const, icon: 'lucide:sparkles' },
  ],
  match: 94,
  matchTitle: 'تطابق با تخصص شما',
  matchNote: 'تطابق بسیار بالا',
  meta: [
    { label: 'حوزه', value: 'روابط کار', icon: 'lucide:layers' },
    { label: 'زمان ارسال', value: 'امروز ۰۹:۴۰', icon: 'lucide:clock' },
    { label: 'زمان مورد انتظار', value: '۲ روز کاری', icon: 'lucide:hourglass' },
    { label: 'مدارک', value: '۶ فایل', icon: 'lucide:file-text' },
  ],
  orgLabel: 'سازمان درخواست‌دهنده',
  org: 'شرکت توسعه پارس',
  senderLabel: 'ارسال‌کننده',
  sender: 'مهدی رضایی',
  senderRole: 'مدیر منابع انسانی',
  strip: 'این درخواست با تخصص‌های روابط کار، خاتمه همکاری و دعاوی اداره کار شما تطابق بالایی دارد.',
  tabs: ['خلاصه درخواست', 'شرح کامل', 'Timeline', 'مدارک (۶)'],
  summary: {
    title: 'خلاصه درخواست',
    body: 'سازمان درخواست بررسی و ارائه راهکار قانونی برای تعدیل ۲۳ نفر از کارکنان خود را دارد. بخشی از کارکنان دارای قرارداد مدت معین و بخشی دارای قرارداد دائم هستند. نگرانی اصلی کارفرما ریسک شکایت و نحوه اجرای قانونی فرآیند تعدیل است.',
  },
  expect: {
    title: 'انتظار مشتری از شما',
    items: [
      'بررسی وضعیت حقوقی و قانونی تعدیل',
      'بررسی مدارک و قراردادهای مرتبط',
      'شناسایی ریسک‌ها و تبعات احتمالی',
      'پیشنهاد مسیر قانونی و اجرایی مناسب',
      'ارائه نظر مکتوب و قابل استناد',
    ],
  },
  key: {
    title: 'اطلاعات کلیدی',
    tiles: [
      { label: 'تعداد کل افراد', value: '۲۳ نفر', icon: 'lucide:users-round' },
      { label: 'قرارداد دائم', value: '۱۵ نفر', icon: 'lucide:file-text' },
      { label: 'قرارداد مدت معین', value: '۸ نفر', icon: 'lucide:file-text' },
      { label: 'اطلاع به کارکنان', value: 'خیر', icon: 'lucide:bell' },
      { label: 'اقدام انجام شده', value: 'خیر', icon: 'lucide:circle-alert' },
      { label: 'مرحله فعلی', value: 'تصمیم‌گیری اولیه', icon: 'lucide:workflow' },
      { label: 'حوزه فعالیت', value: 'تولیدی', icon: 'lucide:building-2' },
      { label: 'محل فعالیت', value: 'تهران', icon: 'lucide:map-pin' },
      { label: 'سابقه شرکت', value: '۱۲ سال', icon: 'lucide:building' },
    ],
  },
  analysis: {
    title: 'تحلیل اولیه آریاز',
    rows: [
      { label: 'پیچیدگی پرونده', value: 'بالا', fg: T.danger },
      { label: 'حجم مدارک', value: 'متوسط', fg: T.accent },
      { label: 'ریسک حقوقی اولیه', value: 'بالا', fg: T.danger },
      { label: 'زمان تخمینی کاربرد تخصصی', value: '۴ تا ۶ ساعت', fg: T.ink },
    ],
  },
  warn: {
    title: 'مواردی که قبل از پذیرش باید بدانید',
    items: [
      'ترکیب قراردادهای دائم و مدت معین وجود دارد.',
      'بخشی از کارکنان سابقه بالای ۱۰ سال دارند.',
      'تصمیم سازمان هنوز به کارکنان ابلاغ نشده است.',
    ],
  },
  docs: {
    title: 'مدارک همراه درخواست (۶)',
    all: 'مشاهده همه مدارک',
    items: [
      { name: 'لیست کارکنان.xlsx', size: '۲۴۵ KB', type: 'xls' },
      { name: 'نمونه قرارداد دائم.pdf', size: '۱.۲ MB', type: 'pdf' },
      { name: 'نمونه قرارداد مدت معین.pdf', size: '۹۸۰ KB', type: 'pdf' },
      { name: 'ساختار سازمانی.pdf', size: '۷۵۰ KB', type: 'pdf' },
      { name: 'محاسبات سنوات.xlsx', size: '۲۱۰ KB', type: 'xls' },
      { name: 'مصوبه هیئت مدیره.pdf', size: '۴۲۰ KB', type: 'pdf' },
    ],
  },
  actions: {
    accept: 'پذیرش درخواست',
    more: 'درخواست اطلاعات بیشتر',
    reject: 'عدم پذیرش',
    note: 'پس از پذیرش، پرونده در لیست پرونده‌های شما ایجاد خواهد شد.',
  },
  agent: {
    title: 'آریاز، دستیار بررسی درخواست‌ها',
    bubble: 'درخواست و مدارک اولیه را بررسی کرده‌ام. قبل از پذیرش می‌توانید نکات مهم را از من بپرسید.',
    chipsTitle: 'کارهای پیشنهادی',
    chips: [
      'این درخواست را در ۳۰ ثانیه خلاصه کن',
      'ریسک‌های اولیه چیست؟',
      'چه مدارکی کم است؟',
      'چقدر زمان می‌برد؟',
      'چه چیزی قبل از پذیرش باید از مشتری بپرسم؟',
      'چرا این درخواست به من ارجاع شد؟',
    ],
    placeholder: 'سؤال خود را بپرسید.',
    note: 'پاسخ‌ها جنبه راهنمایی دارند و جایگزین نظر حقوقی نهایی نیستند.',
  },
};

/* ── My cases (page 18) ───────────────────────────────────────── */

export const advisorCasesHead = {
  title: 'پرونده‌های من',
  desc: 'مدیریت و پیگیری پرونده‌های تخصصی پذیرفته‌شده توسط شما',
  stats: [
    { value: '۱۲', label: 'پرونده فعال', cta: 'مشاهده همه', icon: 'lucide:folder', fg: T.primary, bg: T.tintPurple },
    { value: '۲', label: 'نیازمند اقدام من', cta: 'مشاهده', icon: 'lucide:circle-alert', fg: T.danger, bg: T.tintRed },
    { value: '۱', label: 'منتظر مشتری', cta: 'مشاهده', icon: 'lucide:hourglass', fg: T.accent, bg: T.tintOrange },
    { value: '۳', label: 'نزدیک Deadline', cta: 'مشاهده', icon: 'lucide:clock', fg: T.warning, bg: T.tintOrange },
    { value: '۲۸', label: 'تکمیل‌شده', cta: 'مشاهده آرشیو', icon: 'lucide:circle-check', fg: '#1c8a4e', bg: T.tintGreen },
  ],
  tabs: ['همه (۱۲)', 'تکمیل‌شده (۲۸)', 'نزدیک Deadline (۳)', 'منتظر مشتری (۱)'],
  filters: ['همه حوزه‌ها', 'همه فوریت‌ها', 'آخرین فعالیت'],
  search: 'جستجو در پرونده‌ها...',
};

export const advisorCasesAttention = {
  title: 'نیازمند توجه شما',
  items: [
    {
      head: '۸ ساعت تا Deadline شد',
      title: 'پرونده #AR-2048 — بررسی شرایط خاتمه همکاری مدیر فروش',
      note: 'مشتری ۲/۱ پاسخ‌ها را دریافت کرده است',
      cta: 'ادامه رسیدگی',
      tone: 'danger' as const,
      icon: 'lucide:clock',
    },
    {
      head: 'مدرک جدید دریافت شد',
      title: 'پرونده #AR-2071 — اختلاف محاسبه سنوات',
      note: 'مشتری ۳ فایل جدید ارسال کرده است',
      cta: 'مشاهده مدارک',
      tone: 'info' as const,
      icon: 'lucide:file-text',
    },
  ],
};

export const advisorCases = [
  {
    code: '#AR-2048',
    title: 'بررسی شرایط خاتمه همکاری مدیر فروش',
    client: 'شرکت توسعه پارس',
    field: 'روابط کار ← خاتمه همکاری',
    pct: 66,
    ring: T.primary,
    status: 'در حال بررسی',
    tone: 'info' as const,
    urgency: 'عادی',
    meta: [
      { label: 'آخرین فعالیت', value: 'امروز ۱۰:۴۵', icon: 'lucide:clock' },
      { label: 'Deadline', value: '۲ روز دیگر', icon: 'lucide:calendar' },
      { label: 'مدارک', value: '۸', icon: 'lucide:file-text' },
      { label: 'پیام خوانده‌نشده', value: '۰', icon: 'lucide:mail' },
    ],
    last: 'آخرین اتفاق: صورتجلسه کمیته انضباطی توسط مشتری ارسال شد.',
    cta: 'ورود به پرونده',
    ctaTone: 'solid' as const,
  },
  {
    code: '#AR-2056',
    title: 'اختلاف محاسبه سنوات',
    client: 'صنعت خودرو پارس',
    field: 'روابط کار ← مماسات و مطالبات',
    pct: 50,
    ring: T.accent,
    status: 'منتظر مشتری',
    tone: 'warn' as const,
    urgency: 'عادی',
    meta: [
      { label: 'آخرین فعالیت', value: 'دیروز ۱۴:۲۰', icon: 'lucide:clock' },
      { label: 'مدت انتظار', value: '۱ روز و ۴ ساعت', icon: 'lucide:hourglass' },
      { label: 'مدارک', value: '۵', icon: 'lucide:file-text' },
      { label: 'پیام خوانده‌نشده', value: '۰', icon: 'lucide:mail' },
    ],
    last: 'آخرین درخواست شما: آخرین فیش حقوقی به من ارسال کنید.',
    cta: 'یادآوری به مشتری',
    ctaTone: 'warn' as const,
    secondary: 'مشاهده پرونده',
  },
  {
    code: '#AR-2053',
    title: 'بررسی قرارداد پیمانکاری پروژه الماس',
    client: 'مهندسی سازه ایرانیان',
    field: 'قراردادها ← پیمانکاری',
    pct: 80,
    ring: T.danger,
    status: 'نزدیک Deadline',
    tone: 'danger' as const,
    urgency: 'فوری',
    urgent: true,
    meta: [
      { label: 'آخرین فعالیت', value: 'امروز ۱۴:۳۰', icon: 'lucide:clock' },
      { label: 'باقی‌مانده', value: '۸ ساعت', icon: 'lucide:alarm-clock' },
      { label: 'مدارک', value: '۸', icon: 'lucide:file-text' },
      { label: 'پیام خوانده‌نشده', value: '۰', icon: 'lucide:mail' },
    ],
    last: 'آخرین اتفاق: نظر تخصصی پیش‌نویس شده اما هنوز ارسال نشده است.',
    cta: 'ادامه و تکمیل پاسخ',
    ctaTone: 'danger' as const,
  },
  {
    code: '#AR-2018',
    title: 'بررسی بخشنامه جدید اضافه‌کاری',
    client: 'بازرگانی آذرین',
    field: 'روابط کار ← بخشنامه‌ها',
    pct: 100,
    ring: '#1c8a4e',
    status: 'تکمیل‌شده',
    tone: 'ok' as const,
    urgency: 'عادی',
    meta: [
      { label: 'تاریخ بسته‌شدن', value: '۲۴ مرداد ۱۴۰۲', icon: 'lucide:calendar' },
      { label: 'امتیاز مشتری', value: '۴.۹', icon: 'lucide:star' },
      { label: 'مدارک', value: '۶', icon: 'lucide:file-text' },
      { label: 'پیام خوانده‌نشده', value: '۰', icon: 'lucide:mail' },
    ],
    last: '',
    cta: 'مشاهده آرشیو پرونده',
    ctaTone: 'ok' as const,
  },
];

export const advisorAgent = {
  title: 'آریاز',
  role: 'دستیار حرفه‌ای شما',
  art: '/images/aryaz/illustrations/ai-assistant-avatar.png',
  bubble: 'می‌توانم درخواست‌ها، پرونده‌ها، مدارک و برنامه امروزتان را با هم بررسی کنم.',
  chips: [
    'امروز از کجا شروع کنم؟',
    'پرونده‌های نزدیک Deadline را نشان بده',
    'درخواست‌های جدید را خلاصه کن',
    'مدارک جدید چه هستند؟',
    'جلسات امروز را آماده کن',
    'کدام مشتری منتظر پاسخ من است؟',
  ],
  cta: 'روز کاری من را برنامه‌ریزی کن',
  placeholder: 'از من بپرسید...',
};

export const ADVISOR_TONES: Record<string, { fg: string; bg: string }> = {
  ok: { fg: '#1c8a4e', bg: T.tintGreen },
  info: { fg: T.infoStrong, bg: T.tintBlue },
  warn: { fg: T.accent, bg: T.tintOrange },
  danger: { fg: T.danger, bg: T.tintRed },
  purple: { fg: T.primary, bg: T.tintPurple },
  muted: { fg: T.muted, bg: '#f3f3f8' },
};
