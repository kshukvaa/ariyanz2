import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import OverviewReportClient from '@/components/org/OverviewReportClient';

export const metadata: Metadata = {
  title: 'گزارش جامع سرمایه انسانی سازمان | آریاز',
  description:
    'نمای یکپارچه نتایج ارزیابی‌ها، نقاط قوت، شکاف‌های توسعه‌ای و روند تغییرات سازمان.',
};

export default function OrganisationReportPage() {
  return (
    <PanelChrome active="results" activeChild="reports-overview" search="جستجو در آریاز...">
      <OverviewReportClient />
    </PanelChrome>
  );
}
