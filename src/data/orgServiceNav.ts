import { T } from './panelTokens';

/* ──────────────────────────────────────────────────────────────
   خدمات سازمانی — the public B2B service tree.

   Three families sit under the services landing, and the detail
   pages carry a right-hand rail listing all of them so a visitor
   can cross to a sibling service without going back up.

   Rail composition note — the mockups disagree slightly. The
   structure pages draw three groups; the process pages draw four,
   adding «فرآیندهای عمومی منابع انسانی». The superset is used
   here, since a rail that changes shape between siblings would
   read as a bug rather than a design.

   Naming note — «طراحی نظام جذب و استخدام» appears under BOTH
   «فرآیندهای عمومی» and (as «طراحی و استقرار نظام جذب و استخدام»)
   under «فرآیندهای تخصصی» in the source. Both are kept as drawn;
   they point at the same page. Worth confirming which is intended.
────────────────────────────────────────────────────────────── */

/* Each family owns an accent that runs through its pages: heading
   rules, step markers, icon tints and the active rail pill. */
export type Family = 'structure' | 'specialist' | 'general' | 'brand' | 'outsourcing';

export const FAMILY: Record<Family, { fg: string; bg: string; soft: string }> = {
  structure: { fg: '#24934b', bg: '#e8f7eb', soft: '#f1fbf3' },
  specialist: { fg: '#fe7601', bg: '#fef1e6', soft: '#fff8f2' },
  general: { fg: '#0547fe', bg: '#ebf3fe', soft: '#f5f9ff' },
  brand: { fg: '#5d35fc', bg: '#efe9fe', soft: '#f7f4ff' },
  outsourcing: { fg: '#fe7601', bg: '#fef1e6', soft: '#fff8f2' },
};

export interface ServiceLink {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface ServiceGroup {
  id: string;
  label: string;
  icon: string;
  family: Family;
  items: ServiceLink[];
}

export const serviceRail: ServiceGroup[] = [
  {
    id: 'structure',
    label: 'ساختار و تشکیلات سازمانی',
    icon: 'lucide:layout-grid',
    family: 'structure',
    items: [
      { id: 'org-structure', label: 'طراحی ساختار سازمانی', href: '/org/systems/org-structure', icon: 'lucide:workflow' },
      { id: 'job-analysis', label: 'تجزیه و تحلیل مشاغل', href: '/org/systems/job-analysis', icon: 'lucide:briefcase' },
      { id: 'job-grading', label: 'طبقه‌بندی مشاغل', href: '/org/systems/job-grading', icon: 'lucide:layers' },
      { id: 'workforce', label: 'تحلیل کفایت نیروی انسانی', href: '/org/systems/workforce-adequacy', icon: 'lucide:users-round' },
    ],
  },
  {
    id: 'specialist',
    label: 'فرآیندهای تخصصی منابع انسانی',
    icon: 'lucide:settings',
    family: 'specialist',
    items: [
      { id: 'compensation', label: 'طراحی نظام جبران خدمت', href: '/org/systems/compensation', icon: 'lucide:wallet' },
      { id: 'performance', label: 'طراحی و استقرار نظام مدیریت عملکرد', href: '/org/systems/performance', icon: 'lucide:target' },
      { id: 'learning', label: 'طراحی و استقرار نظام آموزش و یادگیری', href: '/org/systems/learning', icon: 'lucide:graduation-cap' },
      { id: 'hiring-system', label: 'طراحی و استقرار نظام جذب و استخدام', href: '/org/systems/hiring-system', icon: 'lucide:user-round-plus' },
    ],
  },
  {
    id: 'general',
    label: 'فرآیندهای عمومی منابع انسانی',
    icon: 'lucide:settings',
    family: 'general',
    items: [
      { id: 'hiring-general', label: 'طراحی نظام جذب و استخدام', href: '/org/systems/hiring-system', icon: 'lucide:user-round-plus' },
      { id: 'personnel', label: 'مدیریت خدمات پرسنلی', href: '/org/systems/personnel', icon: 'lucide:file-text' },
      { id: 'hr-systems', label: 'طراحی سیستم‌های منابع انسانی', href: '/org/systems', icon: 'lucide:layers' },
    ],
  },
  {
    id: 'brand',
    label: 'برند کارفرمایی و انگیزش',
    icon: 'lucide:star',
    family: 'brand',
    items: [
      { id: 'employer-brand', label: 'طراحی برند کارفرمایی', href: '/org/systems/employer-brand', icon: 'lucide:star' },
      { id: 'motivation', label: 'طراحی نظام انگیزشی و تشویقی', href: '/org/systems/motivation', icon: 'lucide:gift' },
    ],
  },
];

/* The three families as the landing page presents them. */
export const serviceFamilies = [
  {
    id: 'consulting',
    label: 'مشاوره‌های سازمانی',
    href: '/org/consulting',
    family: 'specialist' as Family,
  },
  {
    id: 'systems',
    label: 'طراحی و استقرار سیستم‌ها',
    href: '/org/systems',
    family: 'structure' as Family,
  },
  {
    id: 'outsourcing',
    label: 'برون‌سپاری فرآیندهای منابع انسانی',
    href: '/org/outsourcing',
    family: 'general' as Family,
  },
];

export const railHead = {
  youAreHere: 'شما اینجا هستید:',
};

/* Shared vocabulary — these headings repeat verbatim across the
   detail pages, so they live here rather than in each data file. */
export const serviceCopy = {
  problems: 'این خدمت چه مسئله‌ای را حل می‌کند؟',
  outputs: 'خروجی‌های پروژه',
  expert: 'مشاوره با متخصص',
  submit: 'ارسال درخواست',
  agentCta: 'شروع ارزیابی هوشمند',
} as const;

export { T };
