import React from 'react';
import type { Metadata } from 'next';
import SharedPageLayout from '@/components/pages/SharedPageLayout';
import CalendarClient from '@/components/CalendarClient';

export const metadata: Metadata = {
  title: 'تقویم آریاز | آریاز',
  description: 'همه دوره‌ها، کارگاه‌ها، وبینارها و رویدادهای تخصصی آریاز در یک نگاه.',
};

export default function CalendarPage() {
  return (
    <SharedPageLayout>
      <CalendarClient />
    </SharedPageLayout>
  );
}
