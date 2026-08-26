import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CourseCertificateClient from '@/components/lms/CourseCertificateClient';

export const metadata: Metadata = {
  title: 'گواهینامه دوره | آریاز',
  description: 'گواهینامه پایان دوره طراحی و استقرار نظام ارزیابی عملکرد کارکنان؛ دانلود، اشتراک‌گذاری و کد اعتبارسنجی.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <CourseCertificateClient />
    </SharedPageLayout>
  );
}
