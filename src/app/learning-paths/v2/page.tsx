import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import PathsLandingClient from '@/components/lms/PathsLandingClient';

export const metadata: Metadata = {
  title: 'مسیرهای یادگیری آریاز | آریاز',
  description: 'برای یک نقش شغلی آماده شوید یا یک مهارت را قدم‌به‌قدم حرفه‌ای یاد بگیرید؛ همه منابع در یک مسیر مرحله‌به‌مرحله.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <PathsLandingClient />
    </SharedPageLayout>
  );
}
