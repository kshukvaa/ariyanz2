import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import AssessmentReportClient from '@/components/org/AssessmentReportClient';

export const metadata: Metadata = {
  title: 'گزارش ارزیابی | آریاز',
  description: 'نتایج یک چرخه ارزیابی: مشارکت، آزمون‌ها، شایستگی‌ها و افراد.',
};

export default function AssessmentReportPage() {
  return (
    <PanelChrome active="results" search="جستجو در نتایج و گزارش‌ها...">
      <AssessmentReportClient />
    </PanelChrome>
  );
}
