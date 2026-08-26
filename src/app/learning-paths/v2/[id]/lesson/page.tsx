import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import PathLessonClient from '@/components/lms/PathLessonClient';

export const metadata: Metadata = {
  title: 'طراحی آگهی استخدام حرفه‌ای — مرحله مسیر | آریاز',
  description: 'مرحله ۱۵ از ۳۲ مسیر جذب و استخدام حرفه‌ای؛ اصول و تکنیک‌های طراحی آگهی استخدام جذاب و مؤثر.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <PathLessonClient />
    </SharedPageLayout>
  );
}
