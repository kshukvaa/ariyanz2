import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import WorkshopClient from '@/components/lms/WorkshopClient';

export const metadata: Metadata = {
  title: 'طراحی و استقرار سیستم ارزیابی عملکرد کارکنان — ورکشاپ حضوری | آریاز',
  description: 'یک ورکشاپ کاملاً عملی برای مدیران منابع انسانی، مدیران ارشد و کارشناسان HR.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <WorkshopClient />
    </SharedPageLayout>
  );
}
