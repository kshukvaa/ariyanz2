import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import PersonReportClient from '@/components/org/PersonReportClient';

export const metadata: Metadata = {
  title: 'گزارش فردی | آریاز',
  description: 'نمایی یکپارچه از عملکرد، شایستگی‌ها، نتایج آزمون‌ها و مسیر توسعه فردی.',
};

export default function PersonReportPage() {
  return (
    <PanelChrome active="results" search="جستجو در نتایج و گزارش‌ها...">
      <PersonReportClient />
    </PanelChrome>
  );
}
