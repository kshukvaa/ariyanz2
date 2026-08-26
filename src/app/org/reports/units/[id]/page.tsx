import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import UnitReportClient from '@/components/org/UnitReportClient';

export const metadata: Metadata = {
  title: 'گزارش واحد | آریاز',
  description: 'تحلیل عملکرد، شایستگی‌ها، استعدادها و نیازهای توسعه‌ای کارکنان واحد.',
};

export default function UnitReportPage() {
  return (
    <PanelChrome active="results" search="جستجو در نتایج و گزارش‌ها...">
      <UnitReportClient />
    </PanelChrome>
  );
}
