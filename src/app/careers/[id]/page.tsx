import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import JobClient from '@/components/site/JobClient';

export const metadata: Metadata = {
  title: 'موقعیت شغلی | آریاز',
  description: 'شرح موقعیت شغلی، مهارت‌های موردنیاز، فرآیند استخدام و ارسال رزومه.',
};

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  return (
    <SharedPageLayout>
      <JobClient />
    </SharedPageLayout>
  );
}
