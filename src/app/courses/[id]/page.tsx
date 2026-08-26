import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CourseDetailClient from '@/components/lms/CourseDetailClient';

export const metadata: Metadata = {
  title: 'طراحی و استقرار نظام ارزیابی عملکرد کارکنان | آریاز',
  description:
    'دوره جامع طراحی و استقرار نظام ارزیابی عملکرد کارکنان؛ از تعریف شاخص کلیدی عملکرد تا جلسه بازخورد، با تمرین، قالب آماده و گواهینامه معتبر.',
};

export default function CourseDetailPage() {
  return (
    <SharedPageLayout>
      <CourseDetailClient />
    </SharedPageLayout>
  );
}
