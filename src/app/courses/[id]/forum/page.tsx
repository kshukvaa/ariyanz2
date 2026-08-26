import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import ForumClient from '@/components/lms/ForumClient';

export const metadata: Metadata = {
  title: 'تالار گفتگو و یادگیری آریاز | آریاز',
  description: 'سوالات دوره را مطرح کنید، تجربه‌ها را به اشتراک بگذارید و از پاسخ‌های مدرس و سایر متخصصان استفاده کنید.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <ForumClient />
    </SharedPageLayout>
  );
}
