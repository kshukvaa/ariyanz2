import React from 'react';
import type { Metadata } from 'next';
import AdvisorDashboard from '@/components/counseling/AdvisorDashboard';

export const metadata: Metadata = {
  title: 'داشبورد مشاور | آریاز',
  description: 'درخواست‌های جدید، پرونده‌های فعال و جلسات امروز مشاور در یک نگاه.',
};

/* The advisor workspace replaces the site chrome on purpose —
   this is the advisor's tooling, not a marketing page. */
export default function AdvisorHomePage() {
  return <AdvisorDashboard />;
}
