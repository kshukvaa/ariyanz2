import { T } from './panelTokens';
import type { WizardStep } from './orgWizard';

/* ──────────────────────────────────────────────────────────────
   Create development programme — /org/development/new

   Screens 31–34 cover steps 2–5. Step 1 (تعریف برنامه) is screen
   28, which is absent from the delivered archive — its fields are
   reconstructed from the summary rail that screens 31–34 all
   show, so nothing is invented that the mockups do not evidence.
────────────────────────────────────────────────────────────── */

export const devWizardHead = {
  title: 'ایجاد برنامه توسعه',
  desc: 'با ۵ مرحله ساده، یک برنامه توسعه مؤثر برای کارکنان طراحی کنید',
  crumbs: [
    { label: 'توسعه', href: '/org/development' },
    { label: 'ایجاد برنامه توسعه' },
  ],
  back: 'مرحله قبل',
  draft: 'ذخیره پیش‌نویس',
};

export const devWizardSteps: WizardStep[] = [
  { n: '۰۱', id: 'define', label: 'تعریف برنامه', desc: 'اطلاعات اصلی برنامه' },
  { n: '۰۲', id: 'people', label: 'افراد و نیازها', desc: 'انتخاب جامعه هدف و Gap' },
  { n: '۰۳', id: 'design', label: 'طراحی برنامه توسعه', desc: 'طراحی مداخلات توسعه‌ای' },
  { n: '۰۴', id: 'schedule', label: 'زمان‌بندی و مسئولیت', desc: 'تعیین زمان و مسئول اجرا' },
  { n: '۰۵', id: 'publish', label: 'اثربخشی و انتشار', desc: 'سنجش اثر و انتشار برنامه' },
];

/* The rail that repeats on every step. */
export const devWizardSummary = {
  title: 'خلاصه برنامه',
  rows: [
    { k: 'نام برنامه', v: 'توسعه مدیران فروش', icon: 'lucide:clipboard-list' },
    { k: 'نوع برنامه', v: 'گروهی', icon: 'lucide:users-round' },
    { k: 'منبع ایجاد برنامه', v: 'از نتایج Gap های ارزیابی', icon: 'lucide:clipboard-check' },
    { k: 'هدف اصلی', v: 'تفویض اختیار و Coaching، مدیریت زمان', icon: 'lucide:target' },
    { k: 'مالک برنامه', v: 'واحد منابع انسانی (HR)', icon: 'lucide:user-round' },
    { k: 'دوره برنامه', v: 'تابستان ۱۴۰۵', icon: 'lucide:calendar' },
  ],
  stagesTitle: 'وضعیت مراحل',
  note: 'در این مرحله جامعه هدف و نیازهای توسعه‌ای (Gap) انتخاب می‌شوند.',
};

/* ── Step 1 — تعریف برنامه (reconstructed) ────────────────── */

export const devStepDefine = {
  title: 'تعریف برنامه',
  desc: 'اطلاعات اصلی برنامه توسعه را وارد کنید.',
  name: { label: 'نام برنامه', required: true, placeholder: 'مثال: توسعه مدیران فروش' },
  kind: { label: 'نوع برنامه', value: 'گروهی', options: ['گروهی', 'فردی'] },
  source: {
    label: 'منبع ایجاد برنامه',
    options: [
      { id: 'gaps', label: 'از نتایج Gap های ارزیابی', desc: 'برنامه بر اساس شکاف‌های شناسایی‌شده', icon: 'lucide:clipboard-check', fg: T.primary, bg: T.tintPurple, on: true },
      { id: 'template', label: 'از Template', desc: 'استفاده از برنامه‌های آماده', icon: 'lucide:copy', fg: T.infoStrong, bg: T.tintBlue },
      { id: 'manual', label: 'ساخت دستی', desc: 'ایجاد برنامه از صفر', icon: 'lucide:pen-line', fg: T.accent, bg: T.tintOrange },
    ],
  },
  goal: { label: 'هدف اصلی', value: 'تفویض اختیار، Coaching، مدیریت زمان' },
  owner: { label: 'مالک برنامه', value: 'واحد منابع انسانی (HR)' },
  period: { label: 'دوره برنامه', value: 'تابستان ۱۴۰۵' },
  next: 'ادامه: افراد و نیازها',
};

/* ── Step 2 — افراد و نیازها (screen 31) ──────────────────── */

export const devStepPeople = {
  title: 'انتخاب افراد و نیازهای توسعه‌ای',
  desc: 'جامعه هدف برنامه را انتخاب کنید و مشخص کنید این برنامه قرار است کدام شکاف‌های توسعه‌ای را پوشش دهد.',
  modes: [
    { id: 'smart', label: 'انتخاب هوشمند از نتایج', desc: 'براساس Gapهای شناسایی‌شده', icon: 'lucide:sparkles', on: true },
    { id: 'group', label: 'انتخاب گروه / واحد', desc: 'انتخاب بر اساس واحد، سمت و ...', icon: 'lucide:users-round' },
    { id: 'manual', label: 'انتخاب دستی افراد', desc: 'انتخاب تک‌تک افراد', icon: 'lucide:user-round' },
  ],
  groups: [
    { id: 'time', label: '۴۶ نفر', sub: 'دارای Gap مدیریت زمان', cta: 'مشاهده افراد', on: true },
    { id: 'delegation', label: '۳۸ نفر', sub: 'دارای Gap تفویض اختیار', cta: 'مشاهده افراد' },
    { id: 'coaching', label: '۳۱ نفر', sub: 'دارای Coaching Gap', cta: 'مشاهده افراد' },
    { id: 'hipo', label: '۲۸ نفر', sub: 'High Potential بدون برنامه توسعه', cta: 'مشاهده افراد' },
    { id: 'multi', label: '۱۴ نفر', sub: 'دارای چند Gap مدیریتی همزمان', cta: 'مشاهده افراد' },
  ],
  selectedTitle: 'افراد انتخاب‌شده (۶۲ نفر)',
  clear: 'حذف همه',
  cols: { person: 'کارمند', role: 'سمت', unit: 'واحد', gaps: 'Gap های شناسایی‌شده', score: 'امتیاز فعلی', state: 'وضعیت' },
  rows: [
    { name: 'رضا حسینی', role: 'مدیر فروش منطقه ۲', unit: 'فروش', avatar: 'card-author-01', gaps: ['Coaching', 'تفویض اختیار'], score: '۶۶', state: 'Gap بالا', fg: T.danger, bg: T.tintRed },
    { name: 'سارا کریمی', role: 'کارشناس ارشد فروش', unit: 'فروش', avatar: 'staff-sara-karimi', gaps: ['Coaching', 'مدیریت زمان'], score: '۶۶', state: 'Gap متوسط', fg: T.accent, bg: T.tintOrange },
    { name: 'حمید مرادی', role: 'سرپرست فروش', unit: 'فروش', avatar: 'card-author-03', gaps: ['مدیریت زمان', 'تفویض اختیار'], score: '۵۹', state: 'Gap بالا', fg: T.danger, bg: T.tintRed },
    { name: 'مبنا رضایی', role: 'کارشناس فروش', unit: 'فروش', avatar: 'card-author-04', gaps: ['مدیریت زمان'], score: '۶۴', state: 'Gap متوسط', fg: T.accent, bg: T.tintOrange },
  ],
  needsTitle: 'نیازهای توسعه‌ای این برنامه',
  needs: [
    { label: 'تفویض اختیار', people: '۳۹ نفر', current: '۶۴', benchmark: '۷۶', gap: 78, colour: T.danger, icon: 'lucide:users-round' },
    { label: 'Coaching', people: '۳۹ نفر', current: '۶۶', benchmark: '۷۶', gap: 62, colour: T.accent, icon: 'lucide:handshake' },
    { label: 'مدیریت زمان', people: '۳۴ نفر', current: '۶۴', benchmark: '۷۴', gap: 55, colour: T.warning, icon: 'lucide:clock' },
  ],
  needsCols: { name: 'شایستگی', people: 'تعداد افراد', current: 'امتیاز فعلی', benchmark: 'Benchmark', gap: 'Gap' },
  mapTitle: 'نقشه نیازها (افراد × Gapها)',
  mapLegend: [
    { label: 'Gap بالا', colour: T.danger },
    { label: 'متوسط', colour: T.warning },
    { label: 'Gap کم', colour: T.success },
  ],
  mapCols: ['مدیریت زمان', 'Coaching', 'تفویض اختیار'],
  mapRows: [
    { name: 'رضا حسینی', avatar: 'card-author-01', cells: [1, 0, 1] },
    { name: 'سارا کریمی', avatar: 'staff-sara-karimi', cells: [1, 1, 2] },
    { name: 'حمید مرادی', avatar: 'card-author-03', cells: [0, 1, 1] },
    { name: 'مبنا رضایی', avatar: 'card-author-04', cells: [2, 2, 2] },
  ],
  next: 'ادامه: مداخلات توسعه‌ای',
};

/* ── Step 3 — طراحی برنامه (screen 32) ────────────────────── */

export const devStepDesign = {
  title: 'طراحی برنامه توسعه',
  desc: 'برنامه و مداخلات توسعه‌ای را برای پوشش نیازهای شناسایی‌شده طراحی کنید.',
  bandRows: [
    { k: 'نام برنامه', v: 'توسعه مدیران فروش', icon: 'lucide:clipboard-list' },
    { k: 'تعداد افراد', v: '۴۲ نفر', icon: 'lucide:users-round' },
    { k: 'Gapهای هدف', v: 'تفویض اختیار، Coaching، مدیریت زمان', icon: 'lucide:target' },
    { k: 'مدت پیشنهادی', v: '۸ هفته', icon: 'lucide:calendar' },
  ],
  libraryTitle: 'کتابخانه منابع و اقدامات',
  libraryTabs: ['همه آریاز', 'منبع سازمان', 'منبع خارجی', 'اقدام سفارشی'],
  librarySearch: 'جستجو در منابع آریاز...',
  libraryFilters: ['همه', '۵۰', 'دوره‌بندی', 'مقالات', 'ابزارها', 'کتاب‌ها'],
  libraryAdd: 'افزودن',
  libraryAll: 'مشاهده همه منابع آریاز',
  library: [
    { id: 'path', kind: 'مسیر یادگیری', label: 'رهبری برای مدیران', note: '۴ هفته | ۸ محتوای آموزشی', icon: 'lucide:route', fg: T.violet, bg: T.tintPurple },
    { id: 'course', kind: 'دوره', label: 'تفویض اختیار اثربخش', note: '۲ ساعت', icon: 'lucide:circle-play', fg: T.accent, bg: T.tintOrange },
    { id: 'article', kind: 'مقاله', label: '۵ اشتباه مدیران در تفویض اختیار', note: '۱۲ دقیقه مطالعه', icon: 'lucide:book-open', fg: T.successStrong, bg: T.tintGreen },
    { id: 'tool', kind: 'ابزار', label: 'ماتریس تفویض اختیار', note: 'فایل کاربردی', icon: 'lucide:grid-2x2', fg: T.infoStrong, bg: T.tintBlue },
    { id: 'agent', kind: 'ایجنت', label: 'مربی رهبری آریاز', note: 'تمرین تعاملی با بازخورد هوشمند', icon: 'lucide:bot', fg: T.danger, bg: T.tintRed },
  ],
  planTitle: 'برنامه توسعه',
  planAdd: 'افزودن فاز جدید',
  planTable: 'نمایش به صورت جدول',
  addAction: 'افزودن اقدام',
  phases: [
    {
      n: '۱',
      label: 'فاز ۱: آگاهی',
      week: 'هفته ۱-۲',
      rows: [
        { kind: 'مقاله (آریاز)', label: 'اصول تفویض اختیار', note: '۱۲ دقیقه مطالعه', icon: 'lucide:book-open', fg: T.successStrong, bg: T.tintGreen },
        { kind: 'دوره (آریاز)', label: 'تفویض اختیار اثربخشی', note: '۲ ساعت', icon: 'lucide:circle-play', fg: T.accent, bg: T.tintOrange },
      ],
    },
    {
      n: '۲',
      label: 'فاز ۲: تمرین',
      week: 'هفته ۳-۴',
      rows: [
        { kind: 'ابزار (آریاز)', label: 'ماتریس تفویض اختیار', note: 'فایل کاربردی', icon: 'lucide:grid-2x2', fg: T.infoStrong, bg: T.tintBlue },
        { kind: 'اقدام سفارشی', label: 'تفویض ۲ مسئولیت واقعی', note: 'تمرین عملی در محیط کار', icon: 'lucide:pen-line', fg: T.warning, bg: T.tintOrange },
      ],
    },
    {
      n: '۳',
      label: 'فاز ۳: تجربه',
      week: 'هفته ۵-۶',
      rows: [
        { kind: 'Shadowing (سازمانی)', label: 'همراهی با مدیر منطقه', note: 'در شرکت فروش', icon: 'lucide:users-round', fg: T.primary, bg: T.tintPurple },
        { kind: 'Mentoring (سازمانی)', label: '۲ جلسه منتورینگ', note: 'با مدیر ارشد فروش', icon: 'lucide:handshake', fg: T.danger, bg: T.tintRed },
      ],
    },
    {
      n: '۴',
      label: 'فاز ۴: تثبیت',
      week: 'هفته ۷',
      rows: [
        { kind: 'ایجنت (آریاز)', label: 'مربی رهبری آریاز', note: 'تمرین تعاملی', icon: 'lucide:bot', fg: T.violet, bg: T.tintPurple },
        { kind: 'اقدام سفارشی', label: 'برنامه ۳۰ روزه تفویض اختیار', note: 'Action Plan', icon: 'lucide:target', fg: T.accent, bg: T.tintOrange },
      ],
    },
    {
      n: '۵',
      label: 'فاز ۵: سنجش',
      week: 'هفته ۸',
      rows: [
        { kind: 'ارزیابی (آریاز)', label: 'ارزیابی مجدد شایستگی', note: 'تفویض اختیار', icon: 'lucide:clipboard-check', fg: T.successStrong, bg: T.tintGreen },
      ],
    },
  ],
  aiCta: 'پیشنهاد هوشمند آریاز برای این برنامه',
  resourcesTitle: 'منابع برنامه',
  resources: [
    { label: 'منابع آریاز', value: '۴ مورد', colour: T.violet },
    { label: 'منابع سازمان', value: '۳ مورد', colour: T.success },
    { label: 'منابع خارجی', value: '۴ مورد', colour: T.accent },
    { label: 'اقدامات سفارشی', value: '۳ مورد', colour: T.info },
  ],
  durationTitle: 'مدت پیشنهادی',
  duration: '۸ هفته',
  coverageTitle: 'پوشش نیازهای توسعه‌ای',
  coverage: [
    { label: 'تفویض اختیار', pct: 70, colour: T.success },
    { label: 'Coaching', pct: 61, colour: T.info },
    { label: 'مدیریت زمان', pct: 39, colour: T.accent },
  ],
  coverageNote: 'مدیریت زمان هنوز پوشش کافی ندارد. پیشنهاد می‌شود یک اقدام عملی اضافه شود.',
  coverageRing: 62,
  next: 'ادامه: زمان‌بندی و مسئولیت',
};

/* ── Step 4 — زمان‌بندی و مسئولیت (screen 33) ─────────────── */

export const devStepSchedule = {
  title: 'زمان‌بندی و مسئولیت',
  desc: 'به مرحله چهارم رسیده‌اید. زمان‌بندی و مسئولیت اجرای برنامه را تعیین کنید.',
  bandRows: [
    { k: 'نام برنامه', v: 'توسعه مدیران فروش', icon: 'lucide:clipboard-list' },
    { k: 'تعداد افراد', v: '۴۲ نفر', icon: 'lucide:users-round' },
    { k: 'Gapهای هدف', v: '۳ مورد', icon: 'lucide:target' },
    { k: 'تعداد فعالیت‌ها', v: '۱۲ فعالیت', icon: 'lucide:list-checks' },
    { k: 'پوشش نیازها', v: '۸ فعالیت', icon: 'lucide:shield-check' },
  ],
  ringPct: 87,
  mapTitle: 'نقشه اجرای برنامه (Timeline)',
  mapAdd: 'افزودن فعالیت',
  weeks: [
    { label: 'هفته ۱', range: '۱ تا ۷ شهریور', on: true, rows: [{ label: 'مقاله: اصول تفویض اختیار', note: '۱۵ دقیقه مطالعه', icon: 'lucide:book-open' }, { label: 'دوره: تفویض اختیار اثربخشی', note: '۲ ساعت', icon: 'lucide:circle-play' }] },
    { label: 'هفته ۳ - ۲', range: '۸ تا ۲۱ شهریور', on: true, rows: [{ label: 'ابزار: ماتریس تفویض اختیار', note: 'کاربردی', icon: 'lucide:grid-2x2' }, { label: 'تمرین: تفویض عملی', note: 'عملی', icon: 'lucide:pen-line' }] },
    { label: 'هفته ۵ - ۴', range: '۲۲ شهریور تا ۵ مهر', on: true, rows: [{ label: 'Coaching', note: '۲ جلسه کوچینگ فردی', icon: 'lucide:handshake' }, { label: 'Mentoring', note: 'منتورینگ با مدیر ارشد، هر جلسه ۶۰ دقیقه', icon: 'lucide:users-round' }] },
    { label: 'هفته ۶', range: '۶ تا ۱۲ مهر', rows: [{ label: 'پروژه واقعی تیمی', note: '۴ هفته', icon: 'lucide:briefcase' }] },
    { label: 'هفته ۸', range: '۲۰ تا ۲۶ مهر', rows: [{ label: 'ارزیابی مجدد شایستگی‌ها', note: 'تست و فرم', icon: 'lucide:clipboard-check' }] },
  ],
  ownersTitle: 'تخصیص مسئولیت‌ها',
  ownersCols: { activity: 'فعالیت', owner: 'مسئول اجرا', participants: 'شرکت‌کنندگان', approver: 'تأییدکننده' },
  owners: [
    { activity: 'دوره تفویض اختیار', owner: 'واحد آموزش', people: '۴۲ نفر', approver: 'HR', approverKind: 'badge' },
    { activity: 'مقاله و مطالعه', owner: 'فرد شرکت‌کننده', people: '۴۲ نفر', approver: '—' },
    { activity: 'تمرین عملی', owner: 'مدیر مستقیم', people: '۴۲ نفر', approver: 'مدیر فروش' },
    { activity: 'Coaching', owner: 'مدیر منطقه', people: '۴۲ نفر (۴ گروه)', approver: 'HRBP', approverKind: 'badge' },
    { activity: 'Mentoring', owner: 'مدیر ارشد فروش', people: '۱۰ نفر', approver: 'توسعه' },
    { activity: 'پروژه واقعی', owner: 'مدیر مستقیم', people: '۴۲ نفر', approver: 'مدیر فروش' },
    { activity: 'ارزیابی مجدد', owner: 'واحد HR', people: '۴۲ نفر', approver: 'توسعه' },
  ],
  calendarTitle: 'تقویم برنامه',
  calendarMonth: 'شهریور ۱۴۰۵',
  calendarDays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  calendarLegend: [
    { label: 'دوره‌ها', colour: T.violet },
    { label: 'Coaching', colour: T.success },
    { label: 'تمرین‌ها', colour: T.accent },
    { label: 'ارزیابی‌ها', colour: T.info },
  ],
  remindersTitle: 'یادآوری‌ها و پیگیری‌ها',
  reminders: [
    { label: 'یادآوری شروع فعالیت', note: '۳ روز قبل از تاریخ شروع', on: true, icon: 'lucide:bell', fg: T.accent },
    { label: 'یادآوری نزدیک به Deadline', note: '۲ روز قبل از پایان مهلت', on: true, icon: 'lucide:calendar-check', fg: T.successStrong },
    { label: 'عدم انجام فعالیت', note: '۷ روز پس از تاریخ سررسید', on: true, icon: 'lucide:triangle-alert', fg: T.danger },
    { label: 'Escalation به مدیر', note: 'ارسال ایمیل و اعلان سیستمی', on: true, icon: 'lucide:shield-check', fg: T.infoStrong },
  ],
  statusTitle: 'وضعیت برنامه',
  status: [
    { label: 'تعریف برنامه', on: true },
    { label: 'افراد و نیازها', on: true },
    { label: 'طراحی برنامه', on: true },
    { label: 'زمان‌بندی و مسئولیت', current: true },
    { label: 'اثربخشی و انتشار' },
  ],
  statusMeta: [
    { k: 'زمان تخمینی', v: '۸۷٪' },
    { k: 'زمان کل', v: '۸ هفته' },
    { k: 'Reminder', v: 'فعال' },
    { k: 'Deadline نهایی', v: '۱۴۰۵/۰۷/۳۰' },
  ],
  resourcesTitle: 'منابع مورد نیاز',
  resourcesCols: { resource: 'منبع', assigned: 'تخصیص یافته', state: 'وضعیت' },
  resources: [
    { resource: 'Coach', assigned: '۴ نفر', state: 'کمبود ظرفیت', fg: T.danger, bg: T.tintRed },
    { resource: 'مدرس', assigned: '۲ نفر', state: 'تکمیل', fg: T.successStrong, bg: T.tintGreen },
    { resource: 'ساعت کاری کارکنان', assigned: '—', state: 'تخمین زده شده', fg: T.accent, bg: T.tintOrange },
  ],
  risksTitle: 'ریسک‌های اجرایی و راهکارها',
  risksCols: { risk: 'ریسک', chance: 'احتمال', fix: 'راهکار پیشنهادی' },
  risks: [
    { risk: 'مشارکت پایین مدیران', chance: 'متوسط', fg: T.accent, bg: T.tintOrange, fix: 'ارسال یادآوری و جلسات توجیهی' },
    { risk: 'ظرفیت محدود Coach', chance: 'بالا', fg: T.danger, bg: T.tintRed, fix: 'افزودن Coach داخلی و گروه‌بندی' },
    { risk: 'تأخیر در انجام تمرین‌ها', chance: 'متوسط', fg: T.accent, bg: T.tintOrange, fix: 'پیگیری منظم و گزارش هفتگی' },
  ],
  progressTitle: 'پیش‌نمایش پایش پیشرفت',
  progress: [
    { label: 'شروع', pct: 5 },
    { label: 'هفته ۲', pct: 25 },
    { label: 'هفته ۴', pct: 50 },
    { label: 'هفته ۶', pct: 75 },
    { label: 'هفته ۸ (پایان)', pct: 100 },
  ],
  next: 'ادامه: اثربخشی و انتشار',
};

/* ── Step 5 — اثربخشی و انتشار (screen 34) ────────────────── */

export const devStepPublish = {
  title: 'اثربخشی و انتشار',
  desc: 'به مرحله پایانی رسیده‌اید. اثربخشی برنامه را تعریف کنید و آن را برای افراد مرتبط منتشر کنید.',
  bandRows: [
    { k: 'تاریخ شروع', v: '۱۴۰۵/۰۶/۰۵', icon: 'lucide:circle-play' },
    { k: 'تاریخ پایان', v: '۱۴۰۵/۰۷/۳۰', icon: 'lucide:flag' },
    { k: 'مدت برنامه', v: '۸ هفته', icon: 'lucide:calendar' },
    { k: 'تعداد فعالیت‌ها', v: '۱۲ فعالیت', icon: 'lucide:list-checks' },
    { k: 'تعداد افراد', v: '۴۲ نفر', icon: 'lucide:users-round' },
  ],
  criteriaTitle: 'معیارهای موفقیت برنامه',
  criteriaCols: { gap: 'Gap', current: 'امتیاز فعلی', target: 'هدف', change: 'تغییر مورد انتظار' },
  criteria: [
    { gap: 'تفویض اختیار', current: '۶۳', target: '۷۵', delta: '+۱۲', pct: 80, colour: T.success },
    { gap: 'Coaching', current: '۶۶', target: '۷۶', delta: '+۱۰', pct: 66, colour: T.info },
    { gap: 'مدیریت زمان', current: '۶۴', target: '۷۲', delta: '+۸', pct: 53, colour: T.accent },
  ],
  targets: [
    { label: 'نرخ تکمیل هدف', value: '≥ ۸۵٪', icon: 'lucide:circle-check', fg: T.successStrong, bg: T.tintGreen },
    { label: 'نرخ مشارکت هدف', value: '≥ ۹۰٪', icon: 'lucide:users-round', fg: T.infoStrong, bg: T.tintBlue },
    { label: 'رضایت شرکت‌کنندگان', value: '≥ ۴ از ۵', icon: 'lucide:star', fg: T.warning, bg: T.tintOrange },
  ],
  methodsTitle: 'روش‌های سنجش اثربخشی',
  methods: [
    { id: 'reassess', label: 'Reassessment', note: 'ارزیابی مجدد شایستگی‌ها', on: true },
    { id: 'manager', label: 'ارزیابی مدیر مستقیم', note: 'ارزیابی توسط مدیر', on: true },
    { id: 'self', label: 'خودارزیابی', note: 'Self Assessment', on: false },
    { id: 'kpi', label: 'KPI', note: 'شاخص‌های عملکرد', on: false },
    { id: 'observation', label: 'Observation', note: 'مشاهده رفتاری', on: false },
    { id: 'feedback', label: 'Feedback 360', note: 'بازخورد ۳۶۰ درجه', on: false },
  ],
  methodTiming: { label: 'سنجش زمان سنجش نهایی', value: '۶۰ روز بعد از پایان برنامه' },
  forecastTitle: 'پیش‌بینی و تحلیل آریاز',
  forecast: {
    label: 'احتمال موفقیت برنامه',
    value: '۷۸٪',
    note: 'براساس تحلیل برنامه‌های مشابه و ساختار فعلی برنامه',
  },
  risksTitle: 'ریسک‌های اصلی',
  risks: [
    { label: 'ظرفیت محدود Coachها', note: 'تعداد Coach تخصصی یافته کمتر از نیاز است.', level: 'احتمال بالا', fg: T.danger, bg: T.tintRed },
    { label: 'مشارکت پایین در هفته‌های میانی', note: 'افت مشارکت معمولاً در هفته‌های ۴ تا ۶ رخ می‌دهد.', level: 'احتمال متوسط', fg: T.accent, bg: T.tintOrange },
    { label: 'Reassessment زود', note: 'برای مشاهده تغییر واقعی، حداقل ۶۰ روز فاصله لازم است.', level: 'احتمال متوسط', fg: T.accent, bg: T.tintOrange },
  ],
  optimise: 'بهینه‌سازی برنامه با آریاز',
  timingTitle: 'زمان‌بندی سنجش‌ها',
  timing: [
    { label: 'قبل از برنامه', sub: 'Baseline', date: '۱۴۰۵/۰۵/۲۸', on: true },
    { label: 'میان‌دوره', sub: 'Checkpoint', date: '۱۴۰۵/۰۷/۰۲', on: true },
    { label: 'پایان برنامه', sub: 'End', date: '۱۴۰۵/۰۷/۳۰', on: true },
    { label: 'پیگیری', sub: 'Follow-up', date: '۱۴۰۵/۰۹/۲۹' },
  ],
  timingRows: [
    { label: 'Reassessment نهایی', note: '۶۰ روز بعد از پایان برنامه', icon: 'lucide:refresh-cw', fg: T.successStrong },
    { label: 'ارزیابی مدیر مستقیم', note: '۳۰ روز بعد از پایان برنامه', icon: 'lucide:user-round', fg: T.infoStrong },
    { label: 'KPI', note: 'پایان دوره گزارش‌گیری عملکرد', icon: 'lucide:chart-column', fg: T.accent },
  ],
  publishTitle: 'انتشار برنامه',
  publishTo: [
    { id: 'participants', label: 'شرکت‌کنندگان برنامه', on: true, icon: 'lucide:users-round' },
    { id: 'managers', label: 'مدیران مستقیم', on: true, icon: 'lucide:user-round' },
    { id: 'hrbp', label: 'HRBP', on: true, icon: 'lucide:briefcase' },
    { id: 'coach', label: 'Coach / Mentor', on: true, icon: 'lucide:handshake' },
    { id: 'owner', label: 'مالک برنامه', on: true, icon: 'lucide:star' },
  ],
  addRecipient: 'افزودن گیرنده',
  accessRows: [
    { label: 'سطح دسترسی شرکت‌کننده', value: 'فقط برنامه و فعالیت‌های خود' },
    { label: 'سطح دسترسی مدیر', value: 'برنامه و وضعیت اعضای تیم' },
    { label: 'سطح دسترسی HR', value: 'دسترسی کامل به برنامه و گزارش‌ها' },
  ],
  messageTitle: 'سطح پیام انتشار',
  message: {
    label: 'عنوان',
    value: 'برنامه توسعه جدید برای شما ایجاد شد.',
    bodyLabel: 'متن',
    body: 'برنامه توسعه «توسعه مدیران فروش» برای شما فعال شد. لطفاً برنامه خود را مشاهده نموده و فعالیت‌ها را در زمان‌بندی تعیین شده انجام دهید.',
  },
  channelsTitle: 'کانال‌های ارسال پیام',
  channels: [
    { id: 'inapp', label: 'اعلان داخل آریاز', on: true },
    { id: 'email', label: 'ایمیل', on: true },
    { id: 'sms', label: 'پیامک', on: true },
  ],
  checklistTitle: 'چک‌لیست نهایی آمادگی انتشار',
  checklist: [
    'معیارهای موفقیت تعریف شده‌اند',
    'فعالیت‌ها طراحی شده‌اند',
    'مسئولیت‌ها مشخص شده‌اند',
    'زمان‌بندی کامل تعیین شده',
    'گیرندگان انتخاب شده‌اند',
    'روش‌های سنجش تعیین شده‌اند',
  ],
  ready: { title: 'آماده انتشار', note: 'برنامه شما برای انتشار آماده است.' },
  preview: 'پیش‌نمایش برنامه',
  publish: 'انتشار برنامه توسعه',
};
