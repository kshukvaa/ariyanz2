import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import ReportBuilderClient from '@/components/org/wizard/ReportBuilderClient';

export const metadata: Metadata = {
  title: 'ساخت گزارش سفارشی | آریاز',
  description: 'گزارش موردنظر خود را مرحله به مرحله بسازید و خروجی بگیرید.',
};

export default function ReportBuilderPage() {
  return (
    <PanelChrome active="results" activeChild="reports-centre" search="جستجو در گزارش‌ها...">
      <ReportBuilderClient />
    </PanelChrome>
  );
}
