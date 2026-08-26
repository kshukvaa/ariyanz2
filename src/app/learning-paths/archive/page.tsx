import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import PathsArchiveClient from '@/components/lms/PathsArchiveClient';

export const metadata: Metadata = {
  title: 'همه مسیرهای یادگیری آریاز | آریاز',
  description: 'از یک مهارت مشخص تا آمادگی برای یک نقش شغلی؛ مسیر مناسب هدفت را پیدا کن و قدم‌به‌قدم پیش برو.',
};

export default function Page() {
  return (
    <SharedPageLayout>
      <PathsArchiveClient />
    </SharedPageLayout>
  );
}
