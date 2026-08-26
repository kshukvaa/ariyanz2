import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CoursesClient from '@/components/lms/CoursesClient';

export const metadata: Metadata = {
  title: 'دوره‌های آریاز | آریاز',
  description:
    'آموزش‌های تخصصی تا پیشرفته با تمرین و پروژه عملی و گواهینامه معتبر، مناسب کارشناسان، سرپرستان، مدیران و متخصصان منابع انسانی.',
};

export default function CoursesPage() {
  return (
    <SharedPageLayout>
      <CoursesClient />
    </SharedPageLayout>
  );
}
