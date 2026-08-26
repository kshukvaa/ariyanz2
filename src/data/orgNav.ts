import { icon3x } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   Navigation for the organisation panel.

   Two of the seven rail entries open a sub-list rather than a page
   — «نتایج و گزارش‌ها» and «توسعه» — which is why `children` is
   optional rather than a separate structure. The rail glyphs are
   the library's own PNG crops, used as CSS masks so the active
   pill can recolour them to white.
────────────────────────────────────────────────────────────── */

export interface NavChild {
  id: string;
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  children?: NavChild[];
}

const nav = (n: string) => icon3x('dashboard-nav', `nav-${n}`);

export const orgNav: NavItem[] = [
  { id: 'dashboard', label: 'داشبورد', icon: nav('dashboard'), href: '/org/dashboard' },
  { id: 'employees', label: 'کارکنان', icon: nav('employees'), href: '/org/employees' },
  { id: 'assessments', label: 'ارزیابی‌ها', icon: nav('evaluations'), href: '/org/assessments' },
  { id: 'tests', label: 'آزمون‌ها', icon: nav('tests'), href: '/org/tests' },
  {
    id: 'results',
    label: 'نتایج و گزارش‌ها',
    icon: nav('results'),
    href: '/org/results',
    children: [
      { id: 'results-home', label: 'نمای کلی نتایج', href: '/org/results' },
      { id: 'reports-overview', label: 'گزارش جامع سازمان', href: '/org/reports/organisation' },
      { id: 'reports-centre', label: 'مرکز گزارش‌ها', href: '/org/reports' },
      { id: 'reports-talent', label: 'ماتریس استعداد', href: '/org/reports/talent-matrix' },
      { id: 'reports-attention', label: 'کارکنان نیازمند توجه', href: '/org/reports/attention' },
      { id: 'reports-ai', label: 'تحلیل هوشمند آریاز', href: '/org/reports/ai' },
    ],
  },
  {
    id: 'development',
    label: 'توسعه',
    icon: nav('development'),
    href: '/org/development',
    children: [
      { id: 'dev-programs', label: 'برنامه‌های توسعه', href: '/org/development' },
      { id: 'dev-create', label: 'ایجاد برنامه توسعه', href: '/org/development/new' },
      { id: 'dev-people', label: 'کارکنان در حال توسعه', href: '/org/development/people' },
      { id: 'dev-gaps', label: 'نیازها و Gap ها', href: '/org/development/gaps' },
      { id: 'dev-library', label: 'کتابخانه توسعه', href: '/org/development/library' },
      { id: 'dev-coaching', label: 'کوچینگ و منتورینگ', href: '/org/development/coaching' },
    ],
  },
  { id: 'settings', label: 'تنظیمات', icon: nav('settings'), href: '/org/settings' },
];

export const orgNavFoot: NavItem[] = [
  { id: 'help', label: 'راهنما و پشتیبانی', icon: nav('help'), href: '/org/support' },
];

export const orgLogout: NavItem = {
  id: 'logout',
  label: 'خروج',
  icon: nav('logout'),
  href: '/',
};

export const orgBrand = {
  name: 'آریاز',
  tagline: 'تحلیل و توسعه سرمایه انسانی',
  logo: '/images/aryaz/brand/aryaz-logo-dark.png',
  mark: '/images/aryaz/brand/aryaz-mark.png',
};

export const orgUser = {
  name: 'علی احمدی',
  role: 'مدیر سیستم',
  avatar: '/images/aryaz/avatars/org-manager-header.png',
  notifications: 3,
};

/* ──────────────────────────────────────────────────────────────
   The development module swaps the rail for its own eight
   entries (screens 43–45). Same component, different list — so
   PanelChrome takes this as a `nav` prop rather than branching.
────────────────────────────────────────────────────────────── */

export const devNav: NavItem[] = [
  { id: 'dev-dashboard', label: 'داشبورد توسعه', icon: nav('dashboard'), href: '/org/development/dashboard' },
  { id: 'dev-programs', label: 'برنامه‌های توسعه', icon: nav('development'), href: '/org/development' },
  { id: 'dev-people', label: 'کارکنان در حال توسعه', icon: nav('employees'), href: '/org/development/people' },
  { id: 'dev-library', label: 'کتابخانه توسعه', icon: nav('tests'), href: '/org/development/library' },
  { id: 'dev-coach', label: 'Coach / Mentor', icon: nav('employees'), href: '/org/development/coaching' },
  { id: 'dev-reports', label: 'گزارش‌های توسعه', icon: nav('results'), href: '/org/development/reports' },
  { id: 'dev-advisor', label: 'مشاور توسعه آریاز', icon: nav('ai'), href: '/org/development/advisor' },
  { id: 'dev-settings', label: 'تنظیمات توسعه', icon: nav('settings'), href: '/org/development/settings' },
];
