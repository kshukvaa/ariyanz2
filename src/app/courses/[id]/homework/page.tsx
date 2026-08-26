import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import HomeworkClient from '@/components/lms/HomeworkClient';

export const metadata: Metadata = {
  title: 'تمرین درس: طراحی KPI برای یک شغل واقعی | آریاز',
  description:
    'تمرین عملی درس طراحی شاخص‌های کلیدی عملکرد: یک شغل انتخاب کنید، پنج KPI برای آن طراحی کنید و پاسخ خود را برای بررسی مدرس ارسال کنید.',
};

export default function HomeworkPage() {
  return (
    <SharedPageLayout>
      <HomeworkClient />
    </SharedPageLayout>
  );
}
