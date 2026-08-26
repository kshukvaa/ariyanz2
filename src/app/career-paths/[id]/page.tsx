import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CareerPathClient from '@/components/lms/CareerPathClient';

export const metadata: Metadata = {
  title: 'HRBP حرفه‌ای — مسیر شغلی | آریاز',
  description: 'از مهارت‌های پایه منابع انسانی تا آمادگی برای ایفای نقش شریک تجاری منابع انسانی؛ ۷ مرحله مهارتی.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <CareerPathClient />
    </SharedPageLayout>
  );
}
