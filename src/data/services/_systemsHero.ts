/* ──────────────────────────────────────────────────────────────
   The hero shared by every «طراحی و استقرار سیستم‌های منابع
   انسانی» page.

   Worth noting because it is easy to misread the mockups: the
   hero band on each detail page is FAMILY-level, not page-level.
   «طراحی ساختار سازمانی.png» opens with the systems hero and only
   names its own service in the intro block below the fold. So the
   hero lives here once and every systems page spreads it, which
   is also what stops the twelve siblings drifting apart.
────────────────────────────────────────────────────────────── */

import type { ServiceDetailData } from '@/components/org/services/ServiceDetailPage';

/* Typed as the hero slot rather than `as const`: the readonly
   tuple a const assertion produces will not assign to string[]. */
export const systemsHero: Omit<ServiceDetailData['hero'], 'crumbs'> = {
  title: [
    'سیستم‌های منابع انسانی متناسب',
    'با رشد و استراتژی سازمان شما',
    'طراحی و استقرار می‌کنیم',
  ],
  accentFrom: 1,
  desc: 'از طراحی ساختار و فرآیندها تا نظام‌های انگیزشی و برند کارفرمایی، زیرساخت‌های منابع انسانی را اصولی طراحی و در سازمان شما مستقر می‌کنیم',
  primary: { label: 'درخواست ارزیابی سیستم‌های HR', icon: 'lucide:clipboard-check' },
  secondary: { label: 'مشاوره با متخصص', icon: 'lucide:users-round' },
};

export const systemsCrumbs = (label: string) => [
  { label: 'خدمات سازمانی', href: '/org' },
  { label: 'طراحی و استقرار سیستم‌ها', href: '/org/systems' },
  { label },
];
