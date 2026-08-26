import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import LessonClient from '@/components/lms/LessonClient';

export const metadata: Metadata = {
  title: 'طراحی شاخص‌های کلیدی عملکرد (KPI) | آریاز',
  description: 'درس ویدئویی طراحی شاخص‌های کلیدی عملکرد از دوره ارزیابی عملکرد کارکنان.',
};

export default function LessonPage() {
  return (
    <SharedPageLayout>
      <LessonClient />
    </SharedPageLayout>
  );
}
