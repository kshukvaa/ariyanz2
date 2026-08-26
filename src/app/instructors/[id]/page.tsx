import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import InstructorDetailClient from '@/components/people/InstructorDetailClient';

export const metadata: Metadata = {
  title: 'دکتر امیر حسینی — مشاور و مدرس ارشد منابع انسانی | آریاز',
  description:
    'پروفایل مدرس آریاز؛ تخصص‌ها، سوابق حرفه‌ای، دوره‌های برگزارشده و امتیاز فراگیران. رزرو مشاوره یا مشاهده دوره‌های این مدرس.',
};

export default function InstructorDetailPage() {
  return (
    <SharedPageLayout>
      <InstructorDetailClient />
    </SharedPageLayout>
  );
}
