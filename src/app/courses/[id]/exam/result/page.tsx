import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ExamResultClient from '@/components/lms/ExamResultClient';

export const metadata: Metadata = {
  title: 'نتیجه آزمون فصل دوم | آریاز',
  description: 'کارنامه آزمون: نمره، عملکرد به تفکیک موضوع، مرور سوالات و تحلیل هوشمند نقاط قوت و حوزه‌های قابل توسعه.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <ExamResultClient />
    </SharedPageLayout>
  );
}
