import React from 'react';
import type { Metadata } from 'next';
import PanelChrome from '@/components/org/panel/PanelChrome';
import ResultsClient from '@/components/org/ResultsClient';

export const metadata: Metadata = {
  title: 'نتایج و گزارش‌ها | آریاز',
  description:
    'تحلیل نتایج ارزیابی‌ها، مشاهده روندها و دریافت گزارش‌های فردی، تیمی و سازمانی.',
};

export default function ResultsPage() {
  return (
    <PanelChrome active="results" search="جستجو در نتایج و گزارش‌ها...">
      <ResultsClient />
    </PanelChrome>
  );
}
