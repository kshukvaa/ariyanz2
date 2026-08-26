import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import TestReportClient from '@/components/org/TestReportClient';

export const metadata: Metadata = {
  title: 'گزارش آزمون | آریاز',
  description: 'تحلیل نتایج آزمون در سطح سازمان، واحد و تیم.',
};

export default function TestReportPage() {
  return (
    <PanelChrome active="results" search="جستجو در نتایج و گزارش‌ها...">
      <TestReportClient />
    </PanelChrome>
  );
}
