import { T, icon3x } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Create assessment — /org/assessments/new

   Five steps, transcribed from mockups 4–8. The step list is the
   spine of the screen: it drives the horizontal rail at the top,
   the vertical summary beside the work, and the wording of the
   forward button on every step, so it is declared once here.
────────────────────────────────────────────────────────────── */

export const wizardHead = {
  crumb: [
    { label: 'ارزیابی‌ها', href: '/org/assessments' },
    { label: 'ایجاد ارزیابی جدید', href: '/org/assessments/new' },
  ],
  title: 'ایجاد ارزیابی جدید',
  desc: 'ارزیابی خود را در ۵ مرحله راه‌اندازی کنید',
  exit: 'خروج از ساخت ارزیابی',
  draft: 'ذخیره پیش‌نویس',
  back: 'قبلی',
};

export interface WizardStep {
  n: string;
  id: string;
  label: string;
  hint: string;
  /** Wording of the button that advances into this step. */
  next: string;
}

export const wizardSteps: WizardStep[] = [
  { n: '۰۱', id: 'info', label: 'اطلاعات ارزیابی', hint: 'تعریف مشخصات اصلی', next: 'ادامه: اطلاعات ارزیابی' },
  { n: '۰۲', id: 'people', label: 'انتخاب کارکنان', hint: 'انتخاب گروه یا افراد', next: 'ادامه: انتخاب کارکنان' },
  { n: '۰۳', id: 'tests', label: 'انتخاب آزمون‌ها', hint: 'انتخاب ابزارهای ارزیابی', next: 'ادامه: انتخاب آزمون‌ها' },
  { n: '۰۴', id: 'run', label: 'تنظیم اجرا', hint: 'زمان‌بندی و قوانین اجرا', next: 'ادامه: تنظیم اجرا' },
  { n: '۰۵', id: 'publish', label: 'مرور و انتشار', hint: 'بررسی و انتشار ارزیابی', next: 'ادامه: مرور و انتشار' },
];

/* ── Step 1 — اطلاعات ارزیابی ─────────────────────────────── */

export const step1 = {
  title: 'اطلاعات ارزیابی',
  desc: 'ابتدا اطلاعات کلی ارزیابی را وارد کنید',
  name: {
    label: 'نام ارزیابی',
    placeholder: 'مثال: ارزیابی استعدادهای مدیریتی - پاییز ۱۴۰۵',
    counter: '۰ / ۸۰',
  },
  about: {
    label: 'توضیحات',
    placeholder: 'توضیح کوتاهی درباره هدف و دامنه این ارزیابی بنویسید...',
    counter: '۰ / ۵۰۰',
  },
  type: { label: 'نوع ارزیابی', value: 'ارزیابی شایستگی و استعداد' },
  goal: { label: 'هدف ارزیابی', value: 'انتخاب و توسعه مدیران' },
  period: { label: 'دوره / برچسب', value: 'پاییز ۱۴۰۵' },
  state: {
    label: 'وضعیت',
    options: [
      { id: 'draft', label: 'پیش‌نویس', icon: 'lucide:circle-dot' },
      { id: 'planned', label: 'برنامه‌ریزی‌شده', icon: 'lucide:calendar-check' },
    ],
  },
  hint: {
    text: 'نکته: می‌توانید از پکیج‌های آماده آریاز برای ایجاد سریع‌تر ارزیابی استفاده کنید.',
    action: 'مشاهده پکیج‌های ارزیابی',
  },
  owner: {
    label: 'مسئول ارزیابی',
    name: 'مهدی احمدی (شما)',
    role: 'مدیر سیستم',
    avatar: '/images/aryaz/avatars/emp-mehdi-ahmadi-nav.png',
  },
  advanced: 'تنظیمات پیشرفته',
  saveDraft: 'ذخیره به پیش‌نویس',
};

/* The guide rail beside step 1. Four notes, each naming a decision
   the step actually asks for rather than generic encouragement. */
export const step1Guide = {
  title: 'راهنما',
  lead: 'چگونه یک ارزیابی موثر ایجاد کنیم؟',
  art: '/images/aryaz/illustrations/quest-intro-illus.png',
  notes: [
    { icon: 'lucide:target', title: 'هدف ارزیابی را مشخص کنید', desc: 'هدف واضح، مسیر اجرای ارزیابی را روشن می‌کند.' },
    { icon: 'lucide:users-round', title: 'گروه مناسب را انتخاب کنید', desc: 'مخاطبان دقیق را انتخاب کنید تا نتایج معتبرتر باشد.' },
    { icon: 'lucide:puzzle', title: 'آزمون‌های متناسب را انتخاب کنید', desc: 'ترکیب هوشمند آزمون‌ها، تصویر کامل‌تری ایجاد می‌کند.' },
    { icon: 'lucide:calendar-check', title: 'تنظیمات اجرا را دقیق مشخص کنید', desc: 'زمان‌بندی مناسب، نرخ تکمیل را افزایش می‌دهد.' },
  ],
  support: {
    title: 'نیاز به راهنمایی دارید؟',
    desc: 'تیم پشتیبانی آریاز آماده کمک به شماست.',
    action: 'ارسال درخواست',
  },
};

/* ── Step 2 — انتخاب کارکنان ──────────────────────────────── */

export const step2 = {
  title: 'انتخاب کارکنان',
  desc: 'کارکنان، گروه‌ها یا واحدهایی که این ارزیابی برای آن‌ها اجرا خواهد شد را انتخاب کنید.',
  modes: [
    { id: 'group', label: 'انتخاب گروه/واحد', icon: 'lucide:users-round' },
    { id: 'people', label: 'انتخاب افراد', icon: 'lucide:user-round' },
  ],
  filters: [
    { id: 'q', label: 'جستجو در گروه‌ها و واحدها...', kind: 'search' as const },
    { id: 'role', label: 'موقعیت شغلی', kind: 'select' as const },
    { id: 'unit', label: 'همه واحدها', kind: 'select' as const, hint: 'واحد سازمانی' },
    { id: 'state', label: 'همه', kind: 'select' as const, hint: 'وضعیت' },
  ],
  columns: ['گروه / واحد', 'تعداد کارکنان', 'عملیات'],
  rows: [
    { id: 'sales', label: 'واحد فروش', icon: 'lucide:users-round', count: '۴۲ نفر', on: true },
    { id: 'hr', label: 'واحد منابع انسانی', icon: 'lucide:users-round', count: '۱۸ نفر', on: true },
    { id: 'finance', label: 'واحد مالی و حسابداری', icon: 'lucide:building-2', count: '۲۵ نفر', on: false },
    { id: 'marketing', label: 'واحد بازاریابی', icon: 'lucide:users-round', count: '۱۵ نفر', on: false },
    { id: 'projects', label: 'مدیریت پروژه‌ها', icon: 'lucide:users-round', count: '۱۲ نفر', on: false },
  ],
  total: { label: 'مجموع انتخاب شده:', value: '۶۰ نفر' },
  note: 'می‌توانید چندین گروه یا واحد را انتخاب کنید. در مرحله بعد، آزمون‌های مناسب برای این گروه‌ها پیشنهاد خواهد شد.',
};

/* ── Step 3 — انتخاب آزمون‌ها ─────────────────────────────── */

export const step3 = {
  title: 'انتخاب آزمون‌ها',
  desc: 'آزمون‌ها و پرسشنامه‌های مورد نظر برای این ارزیابی را انتخاب کنید.',
  filters: [
    { id: 'q', label: 'جستجو در آزمون‌ها...', kind: 'search' as const },
    { id: 'lang', label: 'فارسی', kind: 'select' as const, hint: 'زبان' },
    { id: 'kind', label: 'همه انواع', kind: 'select' as const, hint: 'نوع ابزار' },
    { id: 'cat', label: 'همه دسته‌ها', kind: 'select' as const, hint: 'دسته‌بندی' },
  ],
  tabs: [
    { id: 'all', label: 'همه آزمون‌ها' },
    { id: 'picked', label: 'آزمون‌های انتخاب شده (۳)' },
  ],
  columns: ['آزمون / پرسشنامه', 'دسته‌بندی', 'نوع', 'مدت زمان', 'عملیات'],
  rows: [
    {
      id: 'general-competency',
      title: 'پرسشنامه شایستگی‌های عمومی',
      desc: 'ارزیابی شایستگی‌های کلیدی عمومی کارکنان',
      cat: 'شایستگی‌های عمومی',
      catFg: T.primary,
      catBg: T.tintPurple,
      kind: 'پرسشنامه',
      time: '۱۵ دقیقه',
      icon: '/images/aryaz/test-icons-3d/test-competency.png',
      on: true,
    },
    {
      id: 'cognitive',
      title: 'آزمون توانمندی‌های شناختی',
      desc: 'سنجش توانایی‌های ذهنی و تحلیلی',
      cat: 'توانمندی‌های شناختی',
      catFg: T.infoStrong,
      catBg: T.tintBlue,
      kind: 'آزمون',
      time: '۲۰ دقیقه',
      icon: '/images/aryaz/test-icons-3d/test-cognitive.png',
      on: true,
    },
    {
      id: 'disc',
      title: 'پرسشنامه سبک‌های رفتاری DISC',
      desc: 'شناخت سبک رفتاری و الگوی تعامل',
      cat: 'سبک‌های رفتاری',
      catFg: T.successStrong,
      catBg: T.tintGreen,
      kind: 'پرسشنامه',
      time: '۱۲ دقیقه',
      icon: '/images/aryaz/test-icons-3d/test-career-aptitude.png',
      on: true,
    },
    {
      id: 'eq',
      title: 'آزمون هوش هیجانی',
      desc: 'ارزیابی مهارت‌های هیجانی و اجتماعی',
      cat: 'هوش هیجانی',
      catFg: T.accent,
      catBg: T.tintOrange,
      kind: 'آزمون',
      time: '۱۰ دقیقه',
      icon: '/images/aryaz/test-icons-3d/test-eq.png',
      on: false,
    },
    {
      id: 'motivation',
      title: 'پرسشنامه انگیزش شغلی',
      desc: 'سنجش سطح انگیزش و رضایت شغلی',
      cat: 'انگیزش و رضایت شغلی',
      catFg: T.danger,
      catBg: T.tintRed,
      kind: 'پرسشنامه',
      time: '۱۸ دقیقه',
      icon: '/images/aryaz/test-icons-3d/test-motivation.png',
      on: false,
    },
  ],
  picked: { count: '۳', label: 'ابزار انتخاب شده', time: 'مدت زمان تقریبی کل: ۴۷ دقیقه' },
  yourPick: {
    title: 'اطلاعات انتخاب شما',
    rows: [
      { k: 'تعداد آزمون‌ها', v: '۳ ابزار' },
      { k: 'مدت زمان تقریبی', v: '۴۷ دقیقه' },
      { k: 'نوع ابزارها', v: '۲ پرسشنامه، ۱ آزمون' },
    ],
  },
  note: 'می‌توانید در مرحله بعد، زمان‌بندی و قوانین اجرا را برای این ارزیابی تنظیم کنید.',
};

/* ── Step 4 — تنظیم اجرا ──────────────────────────────────── */

export const step4 = {
  title: 'تنظیم اجرا',
  desc: 'زمان‌بندی، قوانین و گزینه‌های اجرای ارزیابی را مشخص کنید.',
  window: {
    label: 'بازه زمانی اجرا',
    start: { label: 'تاریخ شروع', date: '۱۴۰۵/۰۴/۰۱', time: '۰۹:۰۰' },
    end: { label: 'تاریخ پایان', date: '۱۴۰۵/۰۷/۱۵', time: '۰۹:۰۰' },
    note: 'کارکنان می‌توانند در بازه تعیین شده در آزمون‌ها شرکت کنند.',
  },
  rules: {
    title: 'قوانین و محدودیت‌ها',
    items: [
      { id: 'show-result', label: 'نمایش نتیجه به شرکت‌کننده', desc: 'پس از اتمام آزمون، نتیجه به فرد نمایش داده شود.', on: true },
      { id: 'force-all', label: 'اجبار پاسخ به همه سوالات', desc: 'شرکت‌کننده باید به تمام سوالات پاسخ دهد.', on: true },
      { id: 'attempts', label: 'محدودیت تعداد تلاش', desc: 'هر فرد فقط یک بار قابل انجام است.', on: false },
      { id: 'show-correct', label: 'نمایش پاسخ صحیح', desc: 'پس از اتمام آزمون، پاسخ صحیح نمایش داده شود.', on: true },
    ],
  },
  options: {
    title: 'گزینه‌های اجرا',
    orderTitle: 'ترتیب آزمون‌ها',
    order: [
      { id: 'free', label: 'به ترتیب دلخواه', on: true },
      { id: 'fixed', label: 'ترتیب نمایش آزمون‌ها برای همه یکسان باشد.', desc: 'هر فرد ترتیب متفاوتی دریافت کند.', on: false },
    ],
    accessTitle: 'نحوه دسترسی',
    access: [
      { id: 'link', label: 'لینک اختصاصی', desc: 'هر فرد لینک منحصر به فرد دریافت می‌کند.', on: true },
      { id: 'panel', label: 'ورود به پنل کاربری', desc: 'افراد از طریق پنل خود به آزمون‌ها دسترسی دارند.', on: false },
    ],
    remindTitle: 'یادآوری و اطلاع‌رسانی',
    remind: [
      { id: 'auto', label: 'ارسال یادآوری خودکار برای شرکت‌کنندگان', on: true },
      { id: 'announce', label: 'ارسال اعلان شروع و پایان ارزیابی', on: true },
    ],
  },
  privacy: {
    title: 'تنظیمات نمایش و حریم خصوصی',
    nameLabel: 'نمایش نام کارکنان به مدیران',
    nameValue: 'نام و نام خانوادگی',
    resultLabel: 'نمایش نتایج به مدیران',
    resultValue: 'پس از اتمام ارزیابی',
    confidential: {
      title: 'اطلاعات محرمانه',
      desc: 'نتایج این ارزیابی محرمانه بوده و تنها افراد مجاز به آن دسترسی دارند.',
    },
    note: 'می‌توانید پس از انتشار، تنظیمات زمان‌بندی و قوانین اجرا را ویرایش کنید.',
  },
  key: {
    title: 'جزئیات کلیدی',
    rows: [
      { icon: 'lucide:users-round', k: 'تعداد کارکنان', v: '۶۰ نفر' },
      { icon: 'lucide:clipboard-check', k: 'تعداد آزمون‌ها', v: '۳ آزمون' },
      { icon: 'lucide:calendar', k: 'بازه زمانی اجرا', v: '۱ تا ۱۵ مهر ۱۴۰۵' },
      { icon: 'lucide:link', k: 'نوع اجرا', v: 'لینک اختصاصی' },
    ],
  },
};

/* ── Step 5 — مرور و انتشار ───────────────────────────────── */

export const step5 = {
  title: 'مرور و انتشار',
  lead: 'آخرین مرحله: مرور و انتشار ارزیابی',
  banner:
    'لطفاً قبل از انتشار اطلاعات را مرور کنید. پس از انتشار ارزیابی برای افراد انتخاب‌شده در زمان برنامه‌ریزی‌شده فعال خواهد شد.',
  edit: 'ویرایش',
  panels: [
    {
      id: 'info',
      title: 'اطلاعات ارزیابی',
      icon: 'lucide:clipboard-check',
      fg: T.primary,
      bg: T.tintPurple,
      rows: [
        { k: 'نام ارزیابی:', v: 'ارزیابی مهارت‌های رهبری' },
        { k: 'توضیحات:', v: 'ارزیابی سطح شایستگی‌های رهبری در شرکت بارکا' },
        { k: 'نوع / هدف:', v: 'ارزیابی شایستگی' },
        { k: 'گروه / واحد مرتبط:', v: 'مدیریت و سرپرستان' },
        { k: 'دوره / بازه:', v: 'تابستان ۱۴۰۵' },
      ],
    },
    {
      id: 'people',
      title: 'کارکنان انتخاب‌شده',
      icon: 'lucide:users-round',
      fg: T.successStrong,
      bg: T.tintGreen,
      rows: [
        { k: 'تعداد کل:', v: '۶۰ نفر' },
        { k: 'واحدها:', v: 'فروش، بازاریابی، برنامه‌ریزی، مالی و منابع انسانی' },
        { k: 'نقش‌ها:', v: 'مدیر، سرپرست، کارشناس ارشد' },
        { k: 'شامل افراد:', v: '۶۰ نفر' },
        { k: 'محدودیت‌ها:', v: 'فعال' },
      ],
    },
    {
      id: 'tests',
      title: 'آزمون‌های انتخاب‌شده',
      icon: 'lucide:file-text',
      fg: T.infoStrong,
      bg: T.tintBlue,
      tests: [
        { label: 'پرسشنامه شایستگی‌های عمومی', time: '۱۵ دقیقه' },
        { label: 'آزمون توانمندی‌های شناختی', time: '۲۰ دقیقه' },
        { label: 'پرسشنامه DISC رفتاری', time: '۱۲ دقیقه' },
      ],
      total: { k: 'جمع کل آزمون‌ها:', v: '۳ آزمون' },
    },
    {
      id: 'run',
      title: 'تنظیمات اجرا',
      icon: 'lucide:clock',
      fg: T.accent,
      bg: T.tintOrange,
      rows: [
        { k: 'تاریخ شروع:', v: '۱۴۰۵/۰۶/۰۱' },
        { k: 'ساعت شروع:', v: '۰۹:۰۰' },
        { k: 'تاریخ پایان:', v: '۱۴۰۵/۰۷/۱۵' },
        { k: 'مدت در دسترس بودن:', v: '۴۵ روز' },
        { k: 'نمایش نتایج به افراد:', v: 'پس از اتمام ارزیابی' },
        { k: 'گزارشگاه نمایش:', v: 'مدیران HR' },
      ],
    },
  ],
  preview: {
    title: 'پیش‌نمایش اطلاع‌رسانی به کارکنان',
    body: [
      'سلام و احترام',
      'شما برای شرکت در ارزیابی «ارزیابی مهارت‌های رهبری» دعوت شده‌اید.',
      'این ارزیابی شامل ۳ آزمون است و حدود ۴۷ دقیقه زمان نیاز دارد.',
      'لطفاً در بازه ۱۴۰۵/۰۶/۰۱ تا ۱۴۰۵/۰۷/۱۵ نسبت به تکمیل آزمون‌ها اقدام نمایید.',
    ],
    sign: ['با آرزوی موفقیت', 'تیم منابع انسانی بارکا'],
  },
  checks: {
    title: 'نکات مهم قبل از انتشار',
    items: [
      'اطلاعات واردشده به‌صورت کامل و صحیح است.',
      'کارکنان و آزمون‌ها به درستی انتخاب شده‌اند.',
      'زمان‌بندی با تقویم سازمانی هماهنگ است.',
    ],
  },
  after: {
    title: 'اقدامات پس از انتشار',
    items: [
      { icon: 'lucide:send', label: 'ارسال اطلاع‌رسانی برای کارکنان' },
      { icon: 'lucide:calendar-check', label: 'دسترسی کارکنان بر اساس زمان‌بندی' },
      { icon: 'lucide:chart-no-axes-combined', label: 'مشاهده نتایج در داشبورد اختصاصی' },
      { icon: 'lucide:file-text', label: 'گزارش‌گیری و تحلیل نتایج' },
    ],
  },
  publish: 'انتشار ارزیابی',
  saveDraft: 'ذخیره به‌عنوان پیش‌نویس',
  foot: 'پس از انتشار قابل ویرایش نیست (به‌جز زمان‌بندی)',
  summaryTitle: 'خلاصه نهایی ارزیابی',
};

export const wizardSummaryTitle = 'خلاصه ارزیابی';
export const wizardNoteTitle = 'نکته';

export const stepStateLabel = {
  done: 'تکمیل شده',
  doing: 'در حال انجام',
  wait: 'در انتظار',
  tuning: 'در حال تنظیم',
  final: 'در حال نهایی‌سازی',
};

export const evalTypeIcon = icon3x('evaluation-types', 'type-competency');
