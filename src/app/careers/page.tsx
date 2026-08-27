import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CareersClient from '@/components/site/CareersClient';

export const metadata: Metadata = {
  title: 'فرصت‌های شغلی | آریاز',
  description: 'موقعیت‌های شغلی باز آریاز، فرآیند استخدام، مزایا و فرهنگ کاری.',
};

export default function CareersPage() {
  return (
    <SharedPageLayout>
      <CareersClient />
    </SharedPageLayout>
  );
}
