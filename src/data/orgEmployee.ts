/* ──────────────────────────────────────────────────────────────
   Ariyaz — پرونده کارمند.

   One person's record inside the organisation panel, opened from
   the employees table. Five tabs, each answering a different
   question a manager arrives with: where they stand now, what has
   been assigned, what the numbers say, what to do next, and what
   has already happened.
────────────────────────────────────────────────────────────── */

const P = '/images/panel';

export const employeeTabs = [
  { id: 'overview', label: 'نمای کلی' },
  { id: 'evaluations', label: 'ارزیابی‌ها' },
  { id: 'results', label: 'نتایج و تحلیل' },
  { id: 'development', label: 'توسعه' },
  { id: 'history', label: 'تاریخچه' },
] as const;

export type EmployeeTab = (typeof employeeTabs)[number]['id'];

export const employeeHeadActions = {
  primary: { label: 'اختصاص ارزیابی', icon: 'lucide:plus' },
  secondary: { label: 'افزودن به گروه', icon: 'lucide:users-round' },
  menu: [
    { id: 'edit', label: 'ویرایش اطلاعات', icon: 'lucide:pencil-line' },
    { id: 'invite', label: 'ارسال دعوت', icon: 'lucide:send' },
    { id: 'deactivate', label: 'غیرفعال‌سازی', icon: 'lucide:user-round' },
  ],
};

export const employeeProfile = {
  id: 'ali-ahmadi',
  name: 'علی احمدی',
  title: 'مدیر فروش منطقه',
  status: 'فعال',
  avatar: `${P}/people/emp-ali-ahmadi-large.png`,
  facts: [
    { label: 'کد پرسنلی', value: '۱۰۲۴۵', icon: 'lucide:tag' },
    { label: 'واحد سازمانی', value: 'فروش تهران', icon: 'lucide:building-2' },
    { label: 'مدیر مستقیم', value: 'محمد رضایی', icon: 'lucide:user-round' },
    { label: 'عضو سازمان از', value: '۱۴۰۲', icon: 'lucide:calendar' },
  ],
  stats: [
    { id: 'done', value: '۷', label: 'ارزیابی انجام‌شده', icon: 'lucide:clipboard-check', tint: '#EFEBFE', color: '#5B34D6' },
    { id: 'pending', value: '۱', label: 'ارزیابی در انتظار', icon: 'lucide:hourglass', tint: '#FDEEE0', color: '#F26A21' },
    { id: 'average', value: '۸۱٪', label: 'میانگین نتایج ارزیابی‌ها', icon: 'lucide:chart-pie', tint: '#E7F7EF', color: '#16A34A' },
    { id: 'gaps', value: '۳', label: 'حوزه نیازمند توسعه', icon: 'lucide:target', tint: '#E8F0FE', color: '#3B4FD8' },
  ],
};

/* ── Overview ───────────────────────────────────────────────── */

export const employeeOverview = {
  running: {
    title: 'ارزیابی‌های جاری',
    name: 'ارزیابی مدیران فروش',
    percent: 50,
    tests: [
      { label: 'MBTI', state: 'تکمیل شده', done: true },
      { label: 'هوش هیجانی', state: 'تکمیل شده', done: true },
      { label: 'سبک رهبری', state: 'در انتظار', done: false },
      { label: 'شایستگی مدیریتی', state: 'در انتظار', done: false },
    ],
    cta: 'ارسال یادآوری',
  },
  gaps: {
    title: 'حوزه‌های قابل توسعه',
    cta: 'مشاهده همه حوزه‌های توسعه',
    rows: [
      { label: 'مدیریت تعارض', gap: 23, basis: 'بر اساس ۳ ارزیابی' },
      { label: 'تفویض اختیار', gap: 19, basis: 'بر اساس ۳ ارزیابی' },
      { label: 'بازخورد دادن', gap: 18, basis: 'بر اساس ۲ ارزیابی' },
      { label: 'ارتباطات بین‌فردی', gap: 15, basis: 'بر اساس ۳ ارزیابی' },
    ],
  },
  strengths: {
    title: 'نقاط قوت برجسته',
    rows: [
      { label: 'تفکر تحلیلی', score: 91 },
      { label: 'حل مسئله', score: 88 },
      { label: 'برنامه‌ریزی', score: 85 },
      { label: 'مسئولیت‌پذیری', score: 83 },
      { label: 'تصمیم‌گیری', score: 82 },
    ],
  },
  latest: {
    title: 'خلاصه ارزیابی (آخرین نتایج)',
    cardCta: 'مشاهده گزارش',
    cards: [
      { title: 'MBTI', value: 'INTJ', note: 'تحلیل‌گر', date: 'تاریخ: ۱۴۰۵/۰۵/۱۸', icon: 'lucide:user-round' },
      { title: 'هوش هیجانی', value: '۷۸ / ۱۰۰', note: '', date: 'تاریخ: ۱۴۰۵/۰۵/۱۸', icon: 'lucide:brain' },
      { title: 'سبک رهبری', value: 'رهبری مشارکتی', note: '', date: 'تاریخ: ۱۴۰۵/۰۵/۲۰', icon: 'lucide:users-round' },
      { title: 'شایستگی مدیریتی', value: '۸۱ / ۱۰۰', note: '', date: 'تاریخ: ۱۴۰۵/۰۵/۲۰', icon: 'lucide:award' },
    ],
  },
  radar: {
    title: 'نمودار توانمندی‌ها',
    selectLabel: 'آخرین ارزیابی',
    compareLabel: 'مقایسه با میانگین سازمان',
    legend: { self: 'علی احمدی', org: 'میانگین سازمان' },
    axes: [
      { label: 'رهبری', value: 75, org: 62 },
      { label: 'تحلیل', value: 88, org: 66 },
      { label: 'تصمیم‌گیری', value: 84, org: 70 },
      { label: 'همکاری', value: 73, org: 68 },
      { label: 'ارتباطات', value: 68, org: 72 },
      { label: 'انطباق‌پذیری', value: 71, org: 64 },
    ],
  },
  insights: {
    title: 'تحلیل هوشمند آریاز',
    cta: 'گفتگو با AI درباره این کارمند',
    items: [
      { n: 'Insight 01', text: 'علی در تحلیل مسئله و تصمیم‌گیری ساختاریافته عملکرد بالایی دارد.', icon: 'lucide:compass' },
      { n: 'Insight 02', text: 'در چند ارزیابی، الگوی مشترک نیاز به توسعه در تفویض اختیار دیده می‌شود.', icon: 'lucide:message-circle' },
      { n: 'Insight 03', text: 'برای نقش مدیریتی بعدی، توسعه مهارت بازخورد و مدیریت تعارض پیشنهاد می‌شود.', icon: 'lucide:user-round' },
    ],
  },
  suggestions: {
    title: 'پیشنهادهای آریاز برای توسعه',
    items: [
      { kind: 'دوره پیشنهادی', title: 'مدیریت تعارض برای مدیران', cta: 'مشاهده دوره', icon: 'lucide:graduation-cap', color: '#5B34D6' },
      { kind: 'ایجنت پیشنهادی', title: 'ایجنت مدیریت تعارض', cta: 'گفتگو با ایجنت', icon: 'lucide:bot', color: '#0E9488' },
      { kind: 'مقاله پیشنهادی', title: '۷ راهکار عملی برای تفویض اختیار مؤثر', cta: 'مطالعه مقاله', icon: 'lucide:file-text', color: '#16A34A' },
      { kind: 'ابزار پیشنهادی', title: 'چک‌لیست بازخورد سازنده', cta: 'استفاده از ابزار', icon: 'lucide:wrench', color: '#F26A21' },
      { kind: 'کتاب پیشنهادی', title: 'هنر رهبری مشارکتی', cta: 'مشاهده کتاب', icon: 'lucide:book-open', color: '#E11D48' },
    ],
  },
  timeline: {
    title: 'تاریخچه فعالیت‌ها',
    cta: 'مشاهده تاریخچه کامل',
    items: [
      { date: '۱۴۰۵/۰۵/۲۰', text: 'تکمیل آزمون هوش هیجانی', icon: 'lucide:brain', color: '#5B34D6' },
      { date: '۱۴۰۵/۰۵/۱۵', text: 'تکمیل آزمون MBTI', icon: 'lucide:user-round', color: '#3B4FD8' },
      { date: '۱۴۰۵/۰۴/۱۰', text: 'برنامه توسعه قبلی تکمیل شد', icon: 'lucide:circle-check', color: '#16A34A' },
      { date: '۱۴۰۵/۰۳/۲۵', text: 'ارزیابی دوره قبل انجام شد', icon: 'lucide:clipboard-check', color: '#F26A21' },
    ],
  },
};

/* ── Evaluations ────────────────────────────────────────────── */

export interface EmployeeEvaluationRow {
  id: string;
  title: string;
  kind: string;
  icon: string;
  color: string;
  tint: string;
  assigned: string;
  deadline: string;
  deadlineNote: string;
  deadlineWarn: boolean;
  tests: string;
  percent: number;
  state: string;
  stateTone: 'doing' | 'done' | 'waiting';
}

export const employeeEvaluations: EmployeeEvaluationRow[] = [
  {
    id: 'sales-managers',
    title: 'ارزیابی مدیران فروش',
    kind: 'ارزیابی ادواری',
    icon: 'lucide:clipboard-check',
    color: '#5B34D6',
    tint: '#EFEBFE',
    assigned: '۱۴۰۵/۰۶/۱۵',
    deadline: '۱۴۰۵/۰۶/۳۰',
    deadlineNote: '۱۵ روز باقی‌مانده',
    deadlineWarn: true,
    tests: '۴ آزمون',
    percent: 50,
    state: 'در حال انجام',
    stateTone: 'doing',
  },
  {
    id: 'managerial-competency',
    title: 'ارزیابی شایستگی‌های مدیریتی',
    kind: 'ارزیابی شایستگی',
    icon: 'lucide:shield-check',
    color: '#3B4FD8',
    tint: '#E8F0FE',
    assigned: '۱۴۰۵/۰۳/۱۰',
    deadline: '۱۴۰۵/۰۳/۳۰',
    deadlineNote: '',
    deadlineWarn: false,
    tests: '۳ آزمون',
    percent: 100,
    state: 'تکمیل شده',
    stateTone: 'done',
  },
  {
    id: 'emotional',
    title: 'ارزیابی هوش هیجانی',
    kind: 'ارزیابی روانشناختی',
    icon: 'lucide:heart',
    color: '#E11D48',
    tint: '#FDE8EC',
    assigned: '۱۴۰۵/۰۲/۲۰',
    deadline: '۱۴۰۵/۰۲/۳۰',
    deadlineNote: '',
    deadlineWarn: false,
    tests: '۱ آزمون',
    percent: 100,
    state: 'تکمیل شده',
    stateTone: 'done',
  },
  {
    id: 'multi-source',
    title: 'ارزیابی ۳۶۰ درجه',
    kind: 'ارزیابی چندمنبعی',
    icon: 'lucide:radar',
    color: '#0E9488',
    tint: '#E4F6F4',
    assigned: '۱۴۰۴/۱۲/۱۰',
    deadline: '۱۴۰۴/۱۲/۳۰',
    deadlineNote: '',
    deadlineWarn: false,
    tests: '۵ آزمون',
    percent: 100,
    state: 'تکمیل شده',
    stateTone: 'done',
  },
  {
    id: 'talent',
    title: 'ارزیابی استعداد مدیریتی',
    kind: 'ارزیابی استعداد',
    icon: 'lucide:star',
    color: '#F5A524',
    tint: '#FEF6E4',
    assigned: '۱۴۰۴/۰۹/۰۵',
    deadline: '۱۴۰۴/۰۹/۳۰',
    deadlineNote: '',
    deadlineWarn: false,
    tests: '۲ آزمون',
    percent: 100,
    state: 'تکمیل شده',
    stateTone: 'done',
  },
  {
    id: 'leadership-readiness',
    title: 'ارزیابی آمادگی رهبری',
    kind: 'ارزیابی توسعه',
    icon: 'lucide:flag',
    color: '#16A34A',
    tint: '#E7F7EF',
    assigned: '۱۴۰۴/۰۶/۱۰',
    deadline: '۱۴۰۴/۰۶/۳۰',
    deadlineNote: 'تأخیر داشته',
    deadlineWarn: true,
    tests: '۳ آزمون',
    percent: 25,
    state: 'در انتظار',
    stateTone: 'waiting',
  },
];

export const employeeEvalMeta = {
  headers: ['نام ارزیابی', 'آزمون‌ها', 'تاریخ تخصیص', 'مهلت نهایی', 'پیشرفت', 'وضعیت', 'عملیات'],
  search: 'جستجو در ارزیابی‌ها...',
  filters: [
    { id: 'state', label: 'وضعیت: همه' },
    { id: 'kind', label: 'نوع ارزیابی: همه' },
  ],
  moreFilters: 'فیلترها',
  total: '۷ مورد',
  perPage: '۱۰',
  perPageLabel: 'نمایش',
};

/* ── Results ────────────────────────────────────────────────── */

export const employeeResults = {
  trend: {
    title: 'روند نتایج در طول زمان',
    selectLabel: 'میانگین کل',
    selectPrefix: 'نمایش بر اساس:',
    months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
    series: [
      { id: 'previous', label: 'دوره قبل', color: '#5B34D6', dashed: false, values: [68, 72, 75, 75, 79, 81] },
      { id: 'current', label: 'دوره فعلی', color: '#B9BFD1', dashed: true, values: [59, 63, 66, 68, 70, 72] },
    ],
  },
  filters: [
    { id: 'category', label: 'همه دسته‌ها' },
    { id: 'more', label: 'فیلترها' },
  ],
  cardCta: 'مشاهده گزارش',
  cards: [
    { title: 'MBTI', value: 'INTJ', level: 'تحلیل‌گر', date: 'آخرین ارزیابی: ۱۴۰۵/۰۵/۱۸', icon: 'lucide:user-round', color: '#3B4FD8', bar: 0 },
    { title: 'شایستگی مدیریتی', value: '۸۱ / ۱۰۰', level: 'سطح: خوب', date: 'آخرین ارزیابی: ۱۴۰۵/۰۵/۲۲', icon: 'lucide:shield-check', color: '#16A34A', bar: 81 },
    { title: 'سبک رهبری', value: 'مشارکتی', level: 'سبک غالب', date: 'آخرین ارزیابی: ۱۴۰۵/۰۵/۲۰', icon: 'lucide:users-round', color: '#5B34D6', bar: 0 },
    { title: 'هوش هیجانی', value: '۷۸ / ۱۰۰', level: 'سطح: بالا', date: 'آخرین ارزیابی: ۱۴۰۵/۰۵/۱۸', icon: 'lucide:brain', color: '#5B34D6', bar: 78 },
    { title: 'انعطاف‌پذیری', value: '۶۸ / ۱۰۰', level: 'سطح: متوسط', date: 'آخرین ارزیابی: ۱۴۰۵/۰۴/۱۰', icon: 'lucide:refresh-cw', color: '#E11D48', bar: 68 },
    { title: 'حل مسئله', value: '۸۸ / ۱۰۰', level: 'سطح: عالی', date: 'آخرین ارزیابی: ۱۴۰۵/۰۴/۲۰', icon: 'lucide:puzzle', color: '#5B34D6', bar: 88 },
    { title: 'تفکر سیستمی', value: '۷۶ / ۱۰۰', level: 'سطح: بالا', date: 'آخرین ارزیابی: ۱۴۰۵/۰۴/۲۰', icon: 'lucide:workflow', color: '#16A34A', bar: 76 },
    { title: 'توانمندی‌های ارتباطی', value: '۷۲ / ۱۰۰', level: 'سطح: متوسط', date: 'آخرین ارزیابی: ۱۴۰۵/۰۴/۲۵', icon: 'lucide:message-circle', color: '#F26A21', bar: 72 },
  ],
  table: {
    title: 'جزئیات نتایج',
    headers: ['توانمندی', 'نمره (از ۱۰۰)', 'تغییر نسبت به دوره قبل', 'سطح'],
    cta: 'مشاهده همه توانمندی‌ها',
    rows: [
      { skill: 'تحلیل و تفکر', score: '۸۸', delta: '۶', up: true, level: 'عالی' },
      { skill: 'تصمیم‌گیری', score: '۸۴', delta: '۴', up: true, level: 'خوب' },
      { skill: 'رهبری', score: '۷۵', delta: '۵', up: true, level: 'خوب' },
      { skill: 'همکاری', score: '۷۳', delta: '۳', up: true, level: 'خوب' },
      { skill: 'انطباق‌پذیری', score: '۷۱', delta: '۱', up: false, level: 'متوسط' },
      { skill: 'ارتباطات', score: '۶۸', delta: '۲', up: false, level: 'متوسط' },
    ],
  },
  insights: {
    title: 'بینش‌های هوشمند آریاز',
    cta: 'گفتگو با AI درباره این کارمند',
    items: [
      { n: '۰۱', title: 'تحلیل قوی', text: 'علی در تحلیل مسئله و تصمیم‌گیری ساختاریافته عملکرد بالایی دارد.' },
      { n: '۰۲', title: 'الگوی مشترک', text: 'در چند ارزیابی، الگوی مشترک نیاز به توسعه در تفویض اختیار دیده می‌شود.' },
      { n: '۰۳', title: 'پیشنهاد توسعه', text: 'برای نقش مدیریتی بعدی، توسعه مهارت بازخورد و مدیریت تعارض پیشنهاد می‌شود.' },
    ],
  },
  radarTitle: 'نمودار توانمندی‌ها',
  radarCta: 'مشاهده جزئیات',
  radarLegend: { current: 'دوره قبل', previous: 'دوره قبل' },
  headActions: [
    { id: 'download', label: 'دانلود گزارش کامل PDF', icon: 'lucide:download', kind: 'primary' as const },
    { id: 'share', label: 'اشتراک‌گذاری گزارش', icon: 'lucide:share-2', kind: 'outline' as const },
    { id: 'compare', label: 'مقایسه با دوره قبل', icon: 'lucide:arrow-down-up', kind: 'outline' as const },
  ],
};

/* ── Development ────────────────────────────────────────────── */

export const employeeDevelopment = {
  headActions: [
    { id: 'add', label: 'افزودن هدف توسعه', icon: 'lucide:plus', kind: 'primary' as const },
    { id: 'template', label: 'الگوی برنامه توسعه', icon: 'lucide:clipboard-list', kind: 'outline' as const },
    { id: 'report', label: 'گزارش برنامه', icon: 'lucide:download', kind: 'outline' as const },
  ],
  summary: {
    title: 'خلاصه برنامه توسعه',
    cells: [
      { value: '۵', label: 'کل اهداف توسعه', icon: 'lucide:target', color: '#5B34D6' },
      { value: '۲', label: 'شروع نشده', icon: 'lucide:clock', color: '#7A819A' },
      { value: '۱', label: 'در حال توسعه', icon: 'lucide:user-round', color: '#F26A21' },
      { value: '۲', label: 'تکمیل شده', icon: 'lucide:circle-check', color: '#16A34A' },
    ],
  },
  plan: {
    title: 'برنامه توسعه فردی',
    headers: ['هدف توسعه', 'اولویت', 'منابع و اقدامات', 'پیشرفت', 'مهلت', 'ارزیابی مجدد', 'عملیات'],
    cta: 'مشاهده برنامه توسعه کامل',
    rows: [
      {
        goal: 'مدیریت تعارض',
        desc: 'کاهش تعارض و مدیریت اختلافات تیمی',
        priority: 'بالا',
        priorityColor: '#E11D48',
        resources: ['دوره مدیریت تعارض برای مدیران', 'Role Play Agent', 'تمرین تعارض‌های واقعی'],
        percent: 65,
        deadline: '۱۴۰۵/۰۷/۱۵',
        recheck: '۱۴۰۵/۰۸/۱۵',
      },
      {
        goal: 'تفویض اختیار',
        desc: 'توسعه مهارت تفویض و مأموریت‌دهی',
        priority: 'بالا',
        priorityColor: '#E11D48',
        resources: ['دوره تفویض اختیار مؤثر', 'مطالعه مقاله‌های مرتبط', 'تمرین با تیم'],
        percent: 30,
        deadline: '۱۴۰۵/۰۸/۱۰',
        recheck: '۱۴۰۵/۰۹/۱۵',
      },
      {
        goal: 'بازخورد مؤثر',
        desc: 'توانایی ارائه بازخورد سازنده و مؤثر',
        priority: 'متوسط',
        priorityColor: '#F5A524',
        resources: ['دوره بازخورد مؤثر', 'تمرین و اجرای بازخورد', 'کوچینگ فردی'],
        percent: 100,
        deadline: '۱۴۰۵/۰۵/۳۱',
        recheck: '۱۴۰۵/۰۶/۳۱',
      },
      {
        goal: 'ارتباطات بین‌فردی',
        desc: 'بهبود ارتباط مؤثر و همدلی با دیگران',
        priority: 'متوسط',
        priorityColor: '#F5A524',
        resources: ['دوره ارتباطات بین‌فردی', 'مطالعه منابع پیشنهادی'],
        percent: 0,
        deadline: '۱۴۰۵/۰۹/۲۰',
        recheck: '—',
      },
      {
        goal: 'برنامه‌ریزی و اولویت‌بندی',
        desc: 'بهبود برنامه‌ریزی و مدیریت زمان',
        priority: 'پایین',
        priorityColor: '#16A34A',
        resources: ['دوره مدیریت زمان', 'استفاده از ابزارهای مدیریت زمان'],
        percent: 0,
        deadline: '۱۴۰۵/۱۰/۱۰',
        recheck: '—',
      },
    ],
  },
  suggestions: {
    title: 'پیشنهادهای آریاز برای توسعه شما',
    items: [
      { kind: 'دوره پیشنهادی', title: 'مدیریت تعارض برای مدیران', cta: 'مشاهده دوره', icon: 'lucide:graduation-cap', color: '#5B34D6' },
      { kind: 'ایجنت پیشنهادی', title: 'ایجنت Role Play تعارض', cta: 'شروع گفتگو', icon: 'lucide:bot', color: '#0E9488' },
      { kind: 'مقاله پیشنهادی', title: 'چگونه تعارض‌های تیمی را سازنده مدیریت کنیم؟', cta: 'مطالعه مقاله', icon: 'lucide:file-text', color: '#16A34A' },
      { kind: 'ابزار پیشنهادی', title: 'الگوی مدیریت تعارض', cta: 'مشاهده ابزار', icon: 'lucide:wrench', color: '#F26A21' },
      { kind: 'کتاب پیشنهادی', title: 'هوش هیجانی در مدیریت', cta: 'مشاهده کتاب', icon: 'lucide:book-open', color: '#E11D48' },
    ],
  },
  coaching: {
    title: 'جلسات کوچینگ',
    nextLabel: 'جلسه بعدی',
    next: '۱۴۰۵/۰۶/۲۰ - ۱۰:۰۰',
    cta: 'مشاهده جلسات',
  },
};

/* ── History ────────────────────────────────────────────────── */

export const employeeHistory = {
  title: 'تاریخچه فعالیت‌ها',
  cta: 'مشاهده تاریخچه کامل',
  summary: {
    title: 'خلاصه فعالیت‌ها',
    cells: [
      { value: '۷', label: 'ارزیابی انجام شده', icon: 'lucide:clipboard-check', color: '#5B34D6' },
      { value: '۱', label: 'ارزیابی در حال انجام', icon: 'lucide:hourglass', color: '#F5A524' },
      { value: '۳', label: 'برنامه توسعه', icon: 'lucide:book-open', color: '#3B4FD8' },
      { value: '۲', label: 'جلسات برگزار شده', icon: 'lucide:shield-check', color: '#16A34A' },
      { value: '۲', label: 'تغییر گروه', icon: 'lucide:users-round', color: '#0E9488' },
      { value: '۱', label: 'تغییر سمت', icon: 'lucide:briefcase', color: '#F26A21' },
    ],
  },
  filters: {
    title: 'فیلتر فعالیت‌ها',
    kindLabel: 'نوع فعالیت',
    kindValue: 'همه',
    rangeLabel: 'بازه زمانی',
    rangeValue: '۳ ماه اخیر',
    fromLabel: 'از تاریخ',
    fromValue: '۱۴۰۵/۰۲/۱۵',
    toLabel: 'تا تاریخ',
    toValue: '۱۴۰۵/۰۵/۱۵',
    cta: 'اعمال فیلتر',
  },
  events: [
    {
      title: 'آزمون هوش هیجانی تکمیل شد',
      desc: 'آزمون با موفقیت تکمیل و گزارش نتیجه در دسترس است.',
      date: '۱۴۰۵/۰۵/۲۰',
      time: '۱۰:۲۴',
      icon: 'lucide:clipboard-check',
      color: '#5B34D6',
      tint: '#EFEBFE',
    },
    {
      title: 'آزمون MBTI تکمیل شد',
      desc: 'نتیجه آزمون MBTI: INTJ - تحلیل‌گر',
      date: '۱۴۰۵/۰۵/۱۸',
      time: '۱۴:۴۵',
      icon: 'lucide:user-round',
      color: '#3B4FD8',
      tint: '#E8F0FE',
    },
    {
      title: 'به ارزیابی مدیران فروش اضافه شد',
      desc: 'توسط محمد رضایی به ارزیابی «مدیران فروش» اضافه شد.',
      date: '۱۴۰۵/۰۵/۱۵',
      time: '۰۹:۱۰',
      icon: 'lucide:user-round-plus',
      color: '#F26A21',
      tint: '#FDEEE0',
    },
    {
      title: 'برنامه توسعه قبلی تکمیل شد',
      desc: 'برنامه توسعه «مهارت‌های ارتباطی» با موفقیت تکمیل شد.',
      date: '۱۴۰۵/۰۴/۱۰',
      time: '۱۴:۳۰',
      icon: 'lucide:circle-check',
      color: '#16A34A',
      tint: '#E7F7EF',
    },
    {
      title: 'انتقال به گروه مدیریت فروش',
      desc: 'از گروه «کارشناسان فروش» به گروه «مدیریت فروش» منتقل شد.',
      date: '۱۴۰۵/۰۳/۲۸',
      time: '۱۱:۰۵',
      icon: 'lucide:users-round',
      color: '#5B34D6',
      tint: '#EFEBFE',
    },
    {
      title: 'ارزیابی دوره قبل انجام شد',
      desc: 'دوره ارزیابی بهار ۱۴۰۵ با موفقیت انجام و نتایج ثبت شد.',
      date: '۱۴۰۵/۰۳/۲۵',
      time: '۱۳:۲۰',
      icon: 'lucide:trending-up',
      color: '#3B4FD8',
      tint: '#E8F0FE',
    },
    {
      title: 'ارتقای سمت به مدیر فروش منطقه',
      desc: 'با حکم شماره ۵۳۳۱ ارتقا به سمت «مدیر فروش منطقه».',
      date: '۱۴۰۵/۰۳/۰۱',
      time: '۰۸:۳۰',
      icon: 'lucide:briefcase',
      color: '#0E9488',
      tint: '#E4F6F4',
    },
  ],
};
