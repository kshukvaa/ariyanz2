import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import ReportsClient from '@/components/org/ReportsClient';

export const metadata: Metadata = {
  title: 'مرکز گزارش‌ها | آریاز',
  description: 'ایجاد، مدیریت، دریافت و اشتراک‌گذاری گزارش‌های تحلیلی سازمان.',
};

export default function ReportsPage() {
  return (
    <PanelChrome active="results" activeChild="reports-centre" search="جستجو در گزارش‌ها...">
      <ReportsClient />
    </PanelChrome>
  );
}
