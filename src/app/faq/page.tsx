import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import FaqClient from '@/components/site/FaqClient';

export const metadata: Metadata = {
  title: 'سؤالات متداول | آریاز',
  description: 'پاسخ سؤالات متداول درباره خدمات و امکانات آریاز را پیدا کنید.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <FaqClient />
    </SharedPageLayout>
  );
}
