import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import VerifyClient from '@/components/VerifyClient';

export const metadata: Metadata = {
  title: 'استعلام گواهینامه آریاز | آریاز',
  description:
    'اعتبار گواهینامه‌های صادرشده توسط آریاز را به‌صورت آنلاین بررسی کنید؛ با کد گواهینامه یا اسکن QR Code روی گواهینامه.',
};

export default function VerifyPage() {
  return (
    <SharedPageLayout>
      <VerifyClient />
    </SharedPageLayout>
  );
}
