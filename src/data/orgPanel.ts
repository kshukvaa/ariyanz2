/* ──────────────────────────────────────────────────────────────
   Ariyaz — پنل سازمانی.

   The organisation's own workspace, entered from
   «خدمات سازمانی → داشبورد سازمانی». It is a signed-in tool, not
   a marketing page: dark rail on the right, work in the middle,
   and every figure on screen is something a manager can act on.
────────────────────────────────────────────────────────────── */

const P = '/images/panel';

export const panelTheme = {
  rail: '#171A3A',
  railDeep: '#12142F',
  violet: '#5B34D6',
  violetSoft: '#EFEBFE',
  navy: '#1B2559',
  ink: '#2B3350',
  muted: '#7A819A',
  border: '#E9EBF4',
  page: '#F6F7FB',
  green: '#16A34A',
  orange: '#F26A21',
  amber: '#F5A524',
  red: '#E1342C',
  blue: '#3B4FD8',
} as const;

export const panelOrg = {
  name: 'شرکت پخش سراسری باراکا',
  logo: `${P}/aryaz-logo-dark.png`,
  mark: `${P}/aryaz-mark.png`,
};

export const panelUser = {
  name: 'مدیر سازمان',
  role: 'مدیر کل',
  avatar: `${P}/people/emp-mehdi-ahmadi-nav.png`,
  notifications: 3,
};

export interface PanelNavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export const panelNav: PanelNavItem[] = [
  { id: 'dashboard', label: 'داشبورد', icon: 'lucide:layout-dashboard', href: '/org/dashboard' },
  { id: 'employees', label: 'کارکنان', icon: 'lucide:users-round', href: '/org/employees' },
  { id: 'evaluations', label: 'ارزیابی‌ها', icon: 'lucide:clipboard-check', href: '/org/dashboard#evaluations' },
  { id: 'tests', label: 'آزمون‌ها', icon: 'lucide:file-text', href: '/exams/tests' },
  { id: 'results', label: 'نتایج و گزارش‌ها', icon: 'lucide:chart-no-axes-combined', href: '/org/dashboard#results' },
  { id: 'development', label: 'توسعه', icon: 'lucide:graduation-cap', href: '/learning-paths' },
  { id: 'ai', label: 'AI آریاز', icon: 'lucide:sparkles', href: '/agents' },
  { id: 'settings', label: 'تنظیمات', icon: 'lucide:settings', href: '/org/dashboard#settings' },
];

export const panelFootNav = [
  { id: 'help', label: 'راهنما و پشتیبانی', icon: 'lucide:circle-help', href: '/support' },
];

export const panelLogout = { label: 'خروج', icon: 'lucide:log-out', href: '/' };

export const panelNewEvaluation = { label: 'ایجاد ارزیابی جدید', href: '/org/dashboard#new' };

/* ══════════════════════════════════════════════════════════════
   Dashboard — /org/dashboard
══════════════════════════════════════════════════════════════ */

export const dashHead = {
  greeting: 'سلام، خوش آمدید',
  title: 'داشبورد ارزیابی سازمان',
  desc: 'وضعیت ارزیابی‌ها، کارکنان و مهم‌ترین بینش‌های سازمان را در یک نگاه مشاهده کنید.',
};

export interface DashStat {
  id: string;
  value: string;
  label: string;
  note: string;
  icon: string;
  tint: string;
  color: string;
  /** The completion tile draws a ring instead of an icon. */
  ring?: number;
}

export const dashStats: DashStat[] = [
  {
    id: 'staff',
    value: '۲۴۸',
    label: 'کارکنان',
    note: '۲۳۱ نفر فعال',
    icon: 'lucide:users-round',
    tint: '#EFEBFE',
    color: '#5B34D6',
  },
  {
    id: 'active',
    value: '۶',
    label: 'ارزیابی فعال',
    note: '۲ مورد نزدیک به پایان',
    icon: 'lucide:clipboard-check',
    tint: '#E7F7EF',
    color: '#16A34A',
  },
  {
    id: 'tests',
    value: '۱,۲۸۴',
    label: 'آزمون انجام‌شده',
    note: '+۱۲٪ نسبت به دوره قبل',
    icon: 'lucide:chart-no-axes-combined',
    tint: '#E8F0FE',
    color: '#3B4FD8',
  },
  {
    id: 'completion',
    value: '۸۲٪',
    label: 'نرخ تکمیل ارزیابی‌ها',
    note: 'میانگین سازمان',
    icon: 'lucide:target',
    tint: '#EFEBFE',
    color: '#5B34D6',
    ring: 82,
  },
];

export interface DashAction {
  id: string;
  text: string;
  cta: string;
  href: string;
  icon: string;
  tint: string;
  color: string;
}

/** The three things waiting on a decision, newest pressure first. */
export const dashActions: DashAction[] = [
  {
    id: 'not-started',
    text: '۳۲ کارمند هنوز ارزیابی را شروع نکرده‌اند.',
    cta: 'ارسال یادآوری',
    href: '#',
    icon: 'lucide:users-round',
    tint: '#FDE8EC',
    color: '#E11D48',
  },
  {
    id: 'closing',
    text: 'ارزیابی مدیران فروش ۲ روز دیگر پایان می‌یابد.',
    cta: 'مشاهده ارزیابی',
    href: '#evaluations',
    icon: 'lucide:calendar-clock',
    tint: '#FDEEE0',
    color: '#EA6E0C',
  },
  {
    id: 'report',
    text: 'گزارش ارزیابی مدیران آماده شده است.',
    cta: 'مشاهده گزارش',
    href: '#results',
    icon: 'lucide:file-spreadsheet',
    tint: '#EFEBFE',
    color: '#5B34D6',
  },
];

export interface ActiveEvaluation {
  id: string;
  title: string;
  people: string;
  deadline: string;
  percent: number;
  color: string;
  tint: string;
  done: number;
  doing: number;
  notStarted: number;
}

export const dashActiveEvaluations: ActiveEvaluation[] = [
  {
    id: 'sales-managers',
    title: 'ارزیابی مدیران فروش',
    people: '۴۲ نفر',
    deadline: 'مهلت: ۲۸ شهریور ۱۴۰۳',
    percent: 82,
    color: '#16A34A',
    tint: '#E7F7EF',
    done: 34,
    doing: 3,
    notStarted: 5,
  },
  {
    id: 'management-talent',
    title: 'ارزیابی استعدادهای مدیریتی',
    people: '۲۸ نفر',
    deadline: 'مهلت: ۵ مهر ۱۴۰۳',
    percent: 61,
    color: '#F26A21',
    tint: '#FDEEE0',
    done: 17,
    doing: 6,
    notStarted: 5,
  },
  {
    id: 'hr-team',
    title: 'ارزیابی تیم منابع انسانی',
    people: '۱۶ نفر',
    deadline: 'مهلت: ۱۵ شهریور ۱۴۰۳',
    percent: 94,
    color: '#3B4FD8',
    tint: '#E8F0FE',
    done: 15,
    doing: 1,
    notStarted: 0,
  },
];

export const dashTestStatus = {
  title: 'وضعیت اجرای آزمون‌ها',
  centre: { value: '۸۲٪', label: 'تکمیل شده' },
  total: 'کل آزمون‌ها: ۱,۲۸۴ مورد',
  slices: [
    { label: 'تکمیل شده', percent: 82, color: '#16A34A' },
    { label: 'در حال انجام', percent: 10, color: '#3B4FD8' },
    { label: 'شروع نشده', percent: 6, color: '#D7DAE6' },
    { label: 'منقضی شده', percent: 2, color: '#E1342C' },
  ],
};

export const dashUnits = {
  title: 'وضعیت تکمیل ارزیابی بر اساس واحد',
  selectLabel: 'واحد سازمانی',
  cta: 'مشاهده جزئیات واحدها',
  bars: [
    { label: 'فروش', percent: 91 },
    { label: 'منابع انسانی', percent: 88 },
    { label: 'مالی', percent: 79 },
    { label: 'فناوری اطلاعات', percent: 76 },
    { label: 'عملیات', percent: 68 },
  ],
};

export interface DashActivity {
  id: string;
  text: string;
  when: string;
  icon: string;
  color: string;
}

export const dashActivity: DashActivity[] = [
  {
    id: 'a1',
    text: 'علی احمدی آزمون هوش هیجانی را تکمیل کرد.',
    when: '۱۰:۲۵',
    icon: 'lucide:circle-check',
    color: '#16A34A',
  },
  {
    id: 'a2',
    text: 'ارزیابی مدیران فروش به ۸۲٪ رسید.',
    when: 'امروز',
    icon: 'lucide:trending-up',
    color: '#5B34D6',
  },
  {
    id: 'a3',
    text: 'گزارش ارزیابی تیم منابع انسانی آماده شد.',
    when: 'دیروز',
    icon: 'lucide:file-spreadsheet',
    color: '#3B4FD8',
  },
  {
    id: 'a4',
    text: '۱۲ کارمند به ارزیابی جدید اضافه شدند.',
    when: '۲ روز پیش',
    icon: 'lucide:user-round-plus',
    color: '#F26A21',
  },
  {
    id: 'a5',
    text: 'سارا کریمی آزمون رهبری را تکمیل کرد.',
    when: '۲ روز پیش',
    icon: 'lucide:circle-check',
    color: '#16A34A',
  },
];

export const dashTrend = {
  title: 'روند ارزیابی سازمان',
  rangeLabel: '۶ ماه اخیر',
  months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  series: [
    { id: 'completion', label: 'نرخ تکمیل', color: '#5B34D6', values: [88, 90, 84, 82, 86, 87] },
    { id: 'score', label: 'میانگین امتیاز', color: '#16A34A', values: [58, 63, 66, 61, 70, 72] },
  ],
};

export const dashInsights = {
  title: 'بینش‌های هوشمند آریاز',
  cta: 'گفتگو با تحلیلگر هوشمند آریاز',
  href: '/agents',
  items: [
    {
      text: 'مدیران فروش در شاخص تصمیم‌گیری امتیاز بالایی دارند، اما در تفویض اختیار نسبت به میانگین سازمان پایین‌تر هستند.',
      icon: 'lucide:award',
      color: '#16A34A',
    },
    {
      text: 'بیشترین شکاف توسعه‌ای مشترک بین مدیران شعب، مدیریت تعارض است.',
      icon: 'lucide:users-round',
      color: '#5B34D6',
    },
    {
      text: 'نرخ تکمیل ارزیابی شعب غربی ۱۸٪ کمتر از میانگین سازمان است.',
      icon: 'lucide:chart-no-axes-combined',
      color: '#3B4FD8',
    },
  ],
};

export const dashResults = {
  title: 'نمای کلی نتایج',
  cta: 'مشاهده مرکز نتایج',
  href: '#results',
  columns: [
    {
      title: 'قوت برجسته',
      icon: 'lucide:award',
      color: '#16A34A',
      items: ['تحلیل مسئله', 'مسئولیت‌پذیری', 'همکاری تیمی'],
    },
    {
      title: 'حوزه‌های قابل توسعه',
      icon: 'lucide:target',
      color: '#F26A21',
      items: ['تفویض اختیار', 'مدیریت تعارض', 'ارتباطات مؤثر'],
    },
  ],
  gap: {
    title: 'بالاترین شکاف',
    skill: 'مهارت بازخورد',
    value: '۲۳٪',
    note: 'میزان شکاف',
    icon: 'lucide:trending-up',
    color: '#E11D48',
  },
};

export interface QuickAction {
  id: string;
  title: string;
  desc: string;
  icon: string;
  tint: string;
  color: string;
  href: string;
}

export const dashQuickActions: QuickAction[] = [
  {
    id: 'staff',
    title: 'افزودن کارکنان',
    desc: 'ورود تکی یا از طریق فایل اکسل',
    icon: 'lucide:user-round-plus',
    tint: '#FDEEE0',
    color: '#F26A21',
    href: '/org/employees',
  },
  {
    id: 'evaluation',
    title: 'ایجاد ارزیابی',
    desc: 'ساخت پکیج ارزیابی جدید',
    icon: 'lucide:clipboard-check',
    tint: '#E7F7EF',
    color: '#16A34A',
    href: '#new',
  },
  {
    id: 'reports',
    title: 'مشاهده گزارش‌ها',
    desc: 'گزارش‌های فردی، تیمی و سازمانی',
    icon: 'lucide:chart-no-axes-combined',
    tint: '#E8F0FE',
    color: '#3B4FD8',
    href: '#results',
  },
  {
    id: 'ai',
    title: 'تحلیل با AI آریاز',
    desc: 'پرسش از داده‌های سازمان شما',
    icon: 'lucide:sparkles',
    tint: '#EFEBFE',
    color: '#5B34D6',
    href: '/agents',
  },
];

/* ══════════════════════════════════════════════════════════════
   Employees — /org/employees
══════════════════════════════════════════════════════════════ */

export const employeesHead = {
  title: 'کارکنان',
  desc: 'مدیریت کارکنان، ساختار سازمانی و گروه‌های مورد استفاده در ارزیابی‌ها',
  primary: { label: 'افزودن کارمند', icon: 'lucide:plus' },
  secondary: { label: 'ورود گروهی با Excel', icon: 'lucide:upload' },
};

export const employeesStats = [
  { id: 'total', value: '۲۴۸', label: 'کل کارکنان', icon: 'lucide:users-round', tint: '#EFEBFE', color: '#5B34D6' },
  { id: 'active', value: '۲۳۱', label: 'کارکنان فعال', note: '۹۳٪ از کل', icon: 'lucide:circle-check', tint: '#E7F7EF', color: '#16A34A' },
  { id: 'units', value: '۱۲', label: 'واحد / شعبه', icon: 'lucide:building-2', tint: '#E8F0FE', color: '#3B4FD8' },
  { id: 'groups', value: '۸', label: 'گروه ارزیابی', icon: 'lucide:users', tint: '#FDEEE0', color: '#F26A21' },
];

export const employeesTabs = [
  { id: 'staff', label: 'کارکنان' },
  { id: 'structure', label: 'ساختار سازمانی' },
  { id: 'groups', label: 'گروه‌های ارزیابی' },
] as const;

export type EmployeesTab = (typeof employeesTabs)[number]['id'];

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  code: string;
  unit: string;
  title: string;
  evaluations: { done: number; pending: number };
  lastActivity: { day: string; time: string };
  active: boolean;
}

export const employees: Employee[] = [
  {
    id: 'ali-ahmadi',
    name: 'علی احمدی',
    role: 'مدیر فروش',
    avatar: `${P}/people/staff-ali-ahmadi.png`,
    code: '۱۰۲۴۵',
    unit: 'فروش تهران',
    title: 'مدیر منطقه',
    evaluations: { done: 3, pending: 1 },
    lastActivity: { day: 'امروز', time: '۱۰:۴۵' },
    active: true,
  },
  {
    id: 'sara-karimi',
    name: 'سارا کریمی',
    role: 'کارشناس HR',
    avatar: `${P}/people/staff-sara-karimi.png`,
    code: '۱۰۳۱۱',
    unit: 'منابع انسانی',
    title: 'کارشناس منابع انسانی',
    evaluations: { done: 2, pending: 0 },
    lastActivity: { day: 'دیروز', time: '۱۴:۲۰' },
    active: true,
  },
  {
    id: 'mohammad-rezaei',
    name: 'محمد رضایی',
    role: 'کارشناس مالی',
    avatar: `${P}/people/staff-mohammad-rezaei.png`,
    code: '۱۰۳۵۶',
    unit: 'مالی',
    title: 'کارشناس مالی',
    evaluations: { done: 1, pending: 1 },
    lastActivity: { day: '۲ روز پیش', time: '۰۹:۱۵' },
    active: true,
  },
  {
    id: 'hamed-mousavi',
    name: 'حامد موسوی',
    role: 'کارشناس IT',
    avatar: `${P}/people/staff-hamed-mousavi.png`,
    code: '۱۰۴۲۲',
    unit: 'فناوری اطلاعات',
    title: 'کارشناس شبکه',
    evaluations: { done: 0, pending: 0 },
    lastActivity: { day: '—', time: '' },
    active: false,
  },
  {
    id: 'zahra-nouri',
    name: 'زهرا نوری',
    role: 'سرپرست عملیات',
    avatar: `${P}/people/staff-zahra-nouri.png`,
    code: '۱۰۵۰۱',
    unit: 'عملیات',
    title: 'سرپرست عملیات',
    evaluations: { done: 4, pending: 0 },
    lastActivity: { day: 'دیروز', time: '۱۲:۳۰' },
    active: true,
  },
];

export const employeeFilters = [
  { id: 'unit', label: 'واحد / شعبه', icon: 'lucide:building-2' },
  { id: 'title', label: 'سمت', icon: 'lucide:briefcase' },
  { id: 'status', label: 'وضعیت', icon: 'lucide:circle-check' },
  { id: 'evalStatus', label: 'وضعیت ارزیابی', icon: 'lucide:chart-no-axes-combined' },
];

export const employeeSearchLabel = 'نام، کد پرسنلی، موبایل یا ایمیل...';

export const employeeBulkActions = [
  { id: 'assign', label: 'اختصاص ارزیابی', icon: 'lucide:clipboard-check', color: '#5B34D6' },
  { id: 'group', label: 'افزودن به گروه', icon: 'lucide:users-round', color: '#3B4FD8' },
  { id: 'invite', label: 'ارسال دعوت', icon: 'lucide:send', color: '#16A34A' },
  { id: 'deactivate', label: 'غیرفعال‌سازی', icon: 'lucide:user-round', color: '#E11D48' },
];

export const employeeRowMenu = [
  { id: 'profile', label: 'مشاهده پروفایل', icon: 'lucide:user-round' },
  { id: 'assign', label: 'اختصاص ارزیابی', icon: 'lucide:clipboard-check' },
  { id: 'group', label: 'افزودن به گروه', icon: 'lucide:users-round' },
  { id: 'edit', label: 'ویرایش اطلاعات', icon: 'lucide:pencil-line' },
  { id: 'invite', label: 'ارسال دعوت', icon: 'lucide:send' },
  { id: 'deactivate', label: 'غیرفعال‌سازی', icon: 'lucide:user-round', danger: true },
];

/* ── Structure tab ──────────────────────────────────────────── */

export interface OrgNode {
  id: string;
  label: string;
  people: string;
  icon: string;
  color: string;
  children?: OrgNode[];
}

export const orgTree: OrgNode = {
  id: 'root',
  label: panelOrg.name,
  people: '۲۴۸ نفر',
  icon: 'lucide:building-2',
  color: '#5B34D6',
  children: [
    {
      id: 'sales',
      label: 'مدیریت فروش',
      people: '۹۲ نفر',
      icon: 'lucide:shopping-cart',
      color: '#16A34A',
      children: [
        {
          id: 'sales-tehran',
          label: 'فروش تهران',
          people: '۴۲ نفر',
          icon: 'lucide:user-round',
          color: '#16A34A',
          children: [
            { id: 'north', label: 'منطقه شمال', people: '۱۴ نفر', icon: 'lucide:user-round', color: '#16A34A' },
            { id: 'centre', label: 'منطقه مرکز', people: '۱۲ نفر', icon: 'lucide:user-round', color: '#16A34A' },
            { id: 'south', label: 'منطقه جنوب', people: '۱۶ نفر', icon: 'lucide:file-text', color: '#16A34A' },
          ],
        },
        { id: 'sales-cities', label: 'فروش شهرستان', people: '۵۰ نفر', icon: 'lucide:user-round', color: '#16A34A' },
      ],
    },
    { id: 'hr', label: 'منابع انسانی', people: '۱۸ نفر', icon: 'lucide:users-round', color: '#5B34D6' },
    { id: 'finance', label: 'مالی', people: '۳۲ نفر', icon: 'lucide:chart-column', color: '#F26A21' },
    { id: 'it', label: 'فناوری اطلاعات', people: '۲۱ نفر', icon: 'lucide:brain-circuit', color: '#3B4FD8' },
    { id: 'ops', label: 'عملیات', people: '۸۵ نفر', icon: 'lucide:users', color: '#7A819A' },
  ],
};

export const orgSummary = {
  title: 'خلاصه ساختار سازمانی',
  rows: [
    { label: 'کل واحدها و شعب:', value: '۱۲', icon: 'lucide:users-round' },
    { label: 'کل کارکنان فعال:', value: '۲۳۱', icon: 'lucide:clipboard-check' },
    { label: 'میانگین تکمیل ارزیابی:', value: '۸۲٪', icon: 'lucide:clipboard-check' },
  ],
};

export const unitPanel = {
  unitLabel: 'واحد فروش',
  staff: '۴۲ کارمند فعال',
  manager: { label: 'مدیر واحد:', name: 'علی احمدی', avatar: `${P}/people/emp-unit-manager.png` },
  rows: [
    { label: 'مجموع ارزیابی‌های فعال:', value: '۲ مورد', icon: 'lucide:clipboard-check' },
    { label: 'آخرین به‌روزرسانی:', value: 'امروز، ۱۰:۲۵', icon: 'lucide:calendar' },
  ],
  completion: { label: 'نرخ تکمیل ارزیابی:', percent: 87 },
  actions: [
    { id: 'staff', label: 'مشاهده کارکنان این واحد', icon: 'lucide:users-round', kind: 'soft' as const },
    { id: 'new', label: 'ایجاد ارزیابی برای این واحد', icon: 'lucide:plus', kind: 'outline' as const },
    { id: 'delete', label: 'حذف واحد', icon: 'lucide:trash-2', kind: 'danger' as const },
  ],
};

/* ── Groups tab ─────────────────────────────────────────────── */

export interface EvalGroup {
  id: string;
  title: string;
  people: string;
  activeEvaluations: string;
  percent: number;
  color: string;
  icon: string;
  tint: string;
  updated: string;
}

export const evalGroups: EvalGroup[] = [
  {
    id: 'sales-supervisors',
    title: 'سرپرستان فروش',
    people: '۲۶ نفر',
    activeEvaluations: '۱ ارزیابی فعال',
    percent: 89,
    color: '#16A34A',
    icon: 'lucide:shopping-cart',
    tint: '#E7F7EF',
    updated: 'آخرین بروزرسانی: امروز',
  },
  {
    id: 'management-talents',
    title: 'استعدادهای مدیریتی',
    people: '۱۸ نفر',
    activeEvaluations: '۱ ارزیابی فعال',
    percent: 67,
    color: '#3B4FD8',
    icon: 'lucide:shield-check',
    tint: '#E8F0FE',
    updated: 'آخرین بروزرسانی: ۳ روز پیش',
  },
  {
    id: 'branch-managers',
    title: 'مدیران شعب',
    people: '۳۲ نفر',
    activeEvaluations: '۲ ارزیابی فعال',
    percent: 84,
    color: '#5B34D6',
    icon: 'lucide:users-round',
    tint: '#EFEBFE',
    updated: 'آخرین بروزرسانی: دیروز',
  },
  {
    id: 'hr-team',
    title: 'تیم منابع انسانی',
    people: '۱۶ نفر',
    activeEvaluations: '۲ ارزیابی فعال',
    percent: 92,
    color: '#0E9488',
    icon: 'lucide:users-round',
    tint: '#E4F6F4',
    updated: 'آخرین بروزرسانی: امروز',
  },
  {
    id: 'succession',
    title: 'جانشینان مدیریت',
    people: '۱۲ نفر',
    activeEvaluations: '۱ ارزیابی فعال',
    percent: 75,
    color: '#F26A21',
    icon: 'lucide:award',
    tint: '#FDEEE0',
    updated: 'آخرین بروزرسانی: دیروز',
  },
  {
    id: 'new-staff',
    title: 'کارکنان جدید',
    people: '۲۴ نفر',
    activeEvaluations: '۰ ارزیابی فعال',
    percent: 88,
    color: '#E11D48',
    icon: 'lucide:user-round-plus',
    tint: '#FDE8EC',
    updated: 'آخرین بروزرسانی: ۵ روز پیش',
  },
];

export const groupBuilder = {
  title: 'ایجاد گروه ارزیابی',
  nameLabel: 'نام گروه',
  namePlaceholder: 'مدیران منطقه',
  descLabel: 'توضیحات',
  descPlaceholder: 'گروه مدیران تمامی مناطق جهت ارزیابی سالانه',
  methodLabel: 'روش انتخاب اعضا',
  methods: [
    { id: 'rules', label: 'بر اساس قواعد', desc: 'انتخاب بر اساس شرایط' },
    { id: 'manual', label: 'انتخاب دستی', desc: 'انتخاب افراد به صورت دستی' },
  ],
  rules: [
    { field: 'سمت', op: '=', value: 'مدیر' },
    { field: 'واحد', op: '=', value: 'فروش' },
    { field: 'وضعیت', op: '=', value: 'فعال' },
  ],
  addRule: 'افزودن شرط',
  matchNote: 'بر اساس قوانین فوق:',
  matchCount: '۳۷',
  matchNoteTail: 'مطابق این شرایط پیدا شدند.',
  submit: 'ایجاد گروه',
  cancel: 'لغو',
};

/* ── Excel import ───────────────────────────────────────────── */

export const excelImport = {
  title: 'ورود گروهی کارکنان با Excel',
  steps: [
    {
      n: '۰۱',
      title: 'دریافت فایل نمونه',
      desc: 'فایل نمونه آریاز را دانلود و بر اساس راهنما اطلاعات را تکمیل کنید.',
      cta: 'دانلود فایل Excel',
    },
    { n: '۰۲', title: 'بارگذاری فایل', desc: 'فایل تکمیل شده را در این بخش بارگذاری کنید.' },
    { n: '۰۳', title: 'بررسی اطلاعات', desc: 'خلاصه بررسی اطلاعات فایل شما در جدول زیر آورده شده است.' },
    { n: '۰۴', title: 'ثبت کارکنان', desc: 'پس از تأیید، کارکنان به سیستم اضافه خواهند شد.' },
  ],
  file: { name: 'کارکنان_نمونه.xlsx', size: '۲۴۸ KB' },
  tally: [
    { label: 'صحیح', value: '۱۴۳', icon: 'lucide:circle-check', color: '#16A34A' },
    { label: 'نیازمند اصلاح', value: '۳', icon: 'lucide:triangle-alert', color: '#F5A524' },
    { label: 'تکراری', value: '۱', icon: 'lucide:circle-x', color: '#E11D48' },
  ],
  errorsCta: 'مشاهده جزئیات خطاها',
  submit: 'تأیید و افزودن ۱۴۳ کارمند',
};

/* ── Add employee ───────────────────────────────────────────── */

export const addEmployee = {
  title: 'افزودن کارمند جدید',
  sections: [
    {
      title: 'اطلاعات فردی',
      fields: [
        { id: 'first', label: 'نام', placeholder: 'نام را وارد کنید', required: true },
        { id: 'last', label: 'نام خانوادگی', placeholder: 'نام خانوادگی را وارد کنید', required: true },
        { id: 'code', label: 'کد پرسنلی', placeholder: 'کد پرسنلی را وارد کنید', required: true },
        { id: 'mobile', label: 'موبایل', placeholder: '۰۹۱۲ ۱۲۳ ۴۵۶۷', required: true },
        { id: 'email', label: 'ایمیل', placeholder: 'example@gmail.com' },
      ],
    },
    {
      title: 'اطلاعات سازمانی',
      fields: [
        { id: 'title', label: 'سمت', placeholder: 'سمت را انتخاب کنید', required: true, select: true },
        { id: 'unit', label: 'واحد / شعبه', placeholder: 'واحد / شعبه را انتخاب کنید', required: true, select: true },
        { id: 'manager', label: 'مدیر مستقیم', placeholder: 'مدیر مستقیم را انتخاب کنید', select: true },
        { id: 'joined', label: 'تاریخ ورود', placeholder: 'انتخاب تاریخ', date: true },
      ],
    },
  ],
  inviteLabel: 'ارسال دعوت‌نامه برای کارمند',
  submit: 'افزودن کارمند',
  cancel: 'لغو',
};
