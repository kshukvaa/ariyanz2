import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ExamClient from '@/components/lms/ExamClient';

export const metadata: Metadata = {
  title: 'آزمون فصل دوم: طراحی شاخص‌های عملکرد (KPI) | آریاز',
  description: 'آزمون بیست سوالی فصل دوم دوره ارزیابی عملکرد؛ یک سوال در هر صفحه، با نقشه سوالات و زمان‌سنج.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <ExamClient />
    </SharedPageLayout>
  );
}
