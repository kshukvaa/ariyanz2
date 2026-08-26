import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import MyCareerPathClient from '@/components/lms/MyCareerPathClient';

export const metadata: Metadata = {
  title: 'مسیر شغلی من: HRBP حرفه‌ای | آریاز',
  description: 'پیشرفت شما در مسیر شغلی HRBP؛ نقشه آمادگی، وضعیت مهارت‌های موردنیاز، چالش‌های شغلی و پروژه نهایی.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <MyCareerPathClient />
    </SharedPageLayout>
  );
}
