import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import WebinarClient from '@/components/lms/WebinarClient';

export const metadata: Metadata = {
  title: 'هوش مصنوعی در منابع انسانی — وبینار آنلاین زنده | آریاز',
  description: 'از اتوماسیون تا ایجنت‌های HR؛ وبینار تخصصی برای مدیران و متخصصان منابع انسانی.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <WebinarClient />
    </SharedPageLayout>
  );
}
